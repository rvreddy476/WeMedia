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
    <main className="mx-auto flex max-w-screen-2xl gap-4 px-3 pb-10 pt-6 sm:px-6">
      <LeftSidebar user={user} />
      <FeedColumn user={user} posts={posts} />
      <RightSidebar friends={friends} onSelectFriend={(friend) => onFriendSelect?.(friend.id)} />
    </main>
  );
};

export default MainLayout;
