import { SparklesIcon } from '../common/Icons';
import { Friend } from '../../data/types';
import Avatar from '../common/Avatar';

type RightSidebarProps = {
  friends: Friend[];
  onSelectFriend?: (friend: Friend) => void;
};

const RightSidebar = ({ friends, onSelectFriend }: RightSidebarProps) => {
  return (
    <aside className="hidden h-[calc(100vh-76px)] w-80 flex-shrink-0 flex-col gap-4 overflow-hidden px-2 pb-6 pt-0 xl:flex">
      <div className="card p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-900">Promoted</p>
            <p className="text-sm text-slate-500">Fresh drops curated for you</p>
          </div>
          <SparklesIcon className="h-5 w-5 text-amber-500" />
        </div>
        <div className="mt-4 space-y-3">
          <div className="rounded-xl bg-gradient-to-br from-slate-900 to-slate-700 p-4 text-white shadow-soft">
            <p className="text-xs uppercase tracking-wide text-slate-200">Sponsored</p>
            <p className="mt-2 text-lg font-semibold">Minimalist gear for creators</p>
            <p className="mt-1 text-sm text-slate-200">
              Build your desk setup with neutral accessories and smart lighting.
            </p>
            <button className="mt-3 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20">
              Shop the edit
            </button>
          </div>
        </div>
      </div>

      <div className="card flex h-full min-h-[360px] flex-col p-4">
        <div className="flex items-center justify-between px-1">
          <p className="text-sm font-semibold text-slate-900">Chats</p>
          <button className="text-xs font-medium text-slate-500 hover:text-slate-800">See all</button>
        </div>
        <div className="mt-3 flex-1 overflow-y-auto pr-1">
          <ul className="space-y-2">
            {friends.map((friend) => (
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
        </div>
      </div>
    </aside>
  );
};

export default RightSidebar;
