import { BellIcon, ChatIcon, PostIcon, ReelsIcon, SearchIcon, TvIcon } from '../common/Icons';
import Avatar from '../common/Avatar';
import { User } from '../../data/types';

type HeaderProps = {
  user: User;
};

const Header = ({ user }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-screen-2xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-soft">
            <span className="text-lg font-semibold">WM</span>
          </div>
          <div>
            <p className="text-lg font-semibold text-slate-900">WeMedia</p>
            <p className="text-sm text-slate-500">Create. Connect. Discover.</p>
          </div>
        </div>

        <div className="hidden flex-1 items-center justify-center px-6 lg:flex">
          <div className="flex w-full max-w-xl items-center gap-3">
            <div className="flex flex-1 items-center gap-3 rounded-full border border-slate-200 bg-white px-3 py-2 shadow-soft">
              <SearchIcon className="h-5 w-5 text-slate-400" />
              <input
                className="w-full border-none bg-transparent text-sm outline-none placeholder:text-slate-400"
                placeholder="Search creators, posts, or topics"
              />
            </div>
            <div className="flex items-center gap-2">
              <button className="rounded-full border border-slate-200 bg-white p-2 shadow-soft transition hover:-translate-y-0.5">
                <PostIcon className="h-5 w-5 text-slate-700" />
              </button>
              <button className="rounded-full border border-slate-200 bg-white p-2 shadow-soft transition hover:-translate-y-0.5">
                <ReelsIcon className="h-5 w-5 text-slate-700" />
              </button>
              <button className="rounded-full border border-slate-200 bg-white p-2 shadow-soft transition hover:-translate-y-0.5">
                <TvIcon className="h-5 w-5 text-slate-700" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="relative rounded-full border border-slate-200 bg-white p-2 shadow-soft transition hover:-translate-y-0.5">
            <BellIcon className="h-5 w-5 text-slate-700" />
            <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
          </button>
          <button className="rounded-full border border-slate-200 bg-white p-2 shadow-soft transition hover:-translate-y-0.5">
            <ChatIcon className="h-5 w-5 text-slate-700" />
          </button>
          <div className="hidden sm:block">
            <Avatar user={user} size="md" showBadge />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
