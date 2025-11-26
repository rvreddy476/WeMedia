import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';
import FeedColumn from '../feed/FeedColumn';
import { Friend, Post, User } from '../../data/types';

interface MainLayoutProps {
  user: User;
  friends: Friend[];
  posts: Post[];
  onFriendSelect?: (friendId: string) => void;
}

const MainLayout = ({ user, friends, posts, onFriendSelect }: MainLayoutProps) => {
  return (
    <main className="mx-auto flex h-[calc(100vh-76px)] max-w-screen-2xl gap-3 overflow-hidden px-3 pb-6 pt-4 sm:px-5">
      <LeftSidebar user={user} />
      <FeedColumn user={user} posts={posts} />
      <RightSidebar friends={friends} onSelectFriend={(friend) => onFriendSelect?.(friend.id)} />
    </main>
  );
};

export default MainLayout;
