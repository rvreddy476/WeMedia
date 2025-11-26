import {
  HomeIcon,
  BookmarkIcon,
  SettingsIcon,
  NotificationsIcon,
  ReelsIcon,
  MessagesIcon,
  ExploreIcon,
} from '../common/Icons';
import Avatar from '../common/Avatar';
import { User } from '../../data/types';

const menuItems = [
  { label: 'Home', icon: HomeIcon },
  { label: 'Explore', icon: ExploreIcon },
  { label: 'Reels', icon: ReelsIcon },
  { label: 'Messages', icon: MessagesIcon },
  { label: 'Notifications', icon: NotificationsIcon },
  { label: 'Bookmarks', icon: BookmarkIcon },
  { label: 'Settings', icon: SettingsIcon },
];

type LeftSidebarProps = {
  user: User;
};

const LeftSidebar = ({ user }: LeftSidebarProps) => {
  return (
    <aside className="hidden h-[calc(100vh-76px)] w-72 flex-shrink-0 flex-col gap-6 overflow-y-auto px-2 pb-6 pt-4 lg:flex">
      <div className="card p-4">
        <div className="flex items-center gap-3">
          <Avatar user={user} size="lg" showBadge />
          <div>
            <p className="font-semibold text-slate-900">{user.name}</p>
            <p className="text-sm text-slate-500">{user.handle}</p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-3">
          <div className="rounded-xl bg-muted p-3 text-center">
            <p className="text-lg font-semibold text-slate-900">1.2k</p>
            <p className="text-xs text-slate-500">Followers</p>
          </div>
          <div className="rounded-xl bg-muted p-3 text-center">
            <p className="text-lg font-semibold text-slate-900">480</p>
            <p className="text-xs text-slate-500">Following</p>
          </div>
          <div className="rounded-xl bg-muted p-3 text-center">
            <p className="text-lg font-semibold text-slate-900">92</p>
            <p className="text-xs text-slate-500">Posts</p>
          </div>
        </div>
      </div>

      <nav className="card p-3">
        <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Menu</p>
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.label}>
              <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium text-slate-700 transition hover:bg-muted">
                <item.icon className="h-5 w-5 text-slate-500" />
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default LeftSidebar;
