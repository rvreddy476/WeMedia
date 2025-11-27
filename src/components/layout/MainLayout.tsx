import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';
import FeedColumn from '../feed/FeedColumn';
import { Friend, Post, Story, User } from '../../data/types';

interface MainLayoutProps {
  user: User;
  friends: Friend[];
  posts: Post[];
  stories: Story[];
  onFriendSelect?: (friendId: string) => void;
}

const MainLayout = ({ user, friends, posts, stories, onFriendSelect }: MainLayoutProps) => {
  return (
    <main className="mx-auto flex h-[calc(100vh-76px)] max-w-screen-2xl gap-2 overflow-hidden px-3 pb-4 pt-2 sm:px-4">
      <LeftSidebar user={user} />
      <FeedColumn user={user} posts={posts} stories={stories} />
      <RightSidebar friends={friends} onSelectFriend={(friend) => onFriendSelect?.(friend.id)} />
    </main>
  );
};

export default MainLayout;
