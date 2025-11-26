import { useMemo, useState } from 'react';
import { SparklesIcon, SearchIcon } from '../common/Icons';
import { Friend } from '../../data/types';
import Avatar from '../common/Avatar';

type RightSidebarProps = {
  friends: Friend[];
  onSelectFriend?: (friend: Friend) => void;
};

const RightSidebar = ({ friends, onSelectFriend }: RightSidebarProps) => {
  const [showAll, setShowAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFriends = useMemo(
    () =>
      friends.filter(
        (friend) =>
          friend.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          friend.handle.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    [friends, searchTerm],
  );

  const visibleFriends = useMemo(
    () => (showAll ? filteredFriends : filteredFriends.slice(0, 10)),
    [filteredFriends, showAll],
  );

  return (
    <aside className="hidden h-[calc(100vh-76px)] w-80 flex-shrink-0 flex-col gap-2 overflow-hidden px-2 pb-4 pt-0 xl:sticky xl:top-[76px] xl:flex">
      <div className="card p-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-900">Promoted</p>
            <p className="text-xs text-slate-500">Fresh drops curated for you</p>
          </div>
          <SparklesIcon className="h-4 w-4 text-amber-500" />
        </div>
        <div className="mt-3">
          <div className="rounded-lg bg-gradient-to-br from-slate-900 to-slate-700 p-3 text-white shadow-soft">
            <p className="text-[10px] uppercase tracking-wide text-slate-200">Sponsored</p>
            <p className="mt-1 text-base font-semibold leading-tight">Minimalist gear for creators</p>
            <p className="mt-1 text-xs text-slate-200 leading-snug">
              Build your desk setup with neutral accessories and smart lighting.
            </p>
            <button className="mt-3 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur transition hover:bg-white/20">
              Shop the edit
            </button>
          </div>
        </div>
      </div>

      <div className="card flex min-h-[460px] flex-1 flex-col p-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <p className="text-sm font-semibold text-slate-900">Contacts</p>
            <button
              className="text-xs font-medium text-slate-500 transition hover:text-slate-800 disabled:opacity-50"
              onClick={() => setShowAll((prev) => !prev)}
              disabled={filteredFriends.length <= 10}
            >
              {showAll ? 'Show less' : 'See all'}
            </button>
          </div>
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search contacts"
              className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm text-slate-900 outline-none transition focus:border-slate-300 focus:bg-white focus:ring-2 focus:ring-slate-200"
            />
          </div>
        </div>
        <div className="mt-3 flex-1 overflow-y-auto pr-1">
          <ul className="space-y-2">
            {visibleFriends.map((friend) => (
              <li key={friend.id}>
                <button
                  className="flex w-full items-center justify-between rounded-xl px-2 py-2 text-left transition hover:bg-muted"
                  onClick={() => onSelectFriend?.(friend)}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar user={friend} size="sm" showBadge={friend.isOnline} />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-900">{friend.name}</p>
                      <p className="truncate text-xs text-slate-500">{friend.recentMessage}</p>
                    </div>
                  </div>
                  <span className={`h-2 w-2 flex-shrink-0 rounded-full ${friend.isOnline ? 'bg-emerald-500' : 'bg-slate-300'}`}></span>
                </button>
              </li>
            ))}
          </ul>
          {!visibleFriends.length && (
            <p className="pt-4 text-center text-xs text-slate-500">No contacts found</p>
          )}
        </div>
      </div>
    </aside>
  );
};

export default RightSidebar;
