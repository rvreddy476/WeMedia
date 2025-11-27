import { Post, Story, User } from '../../data/types';
import PostComposer from './PostComposer';
import FeedCard from './FeedCard';
import StoriesRow from './StoriesRow';

type FeedColumnProps = {
  user: User;
  posts: Post[];
  stories: Story[];
};

const FeedColumn = ({ user, posts, stories }: FeedColumnProps) => {
  return (
    <section className="flex-1 space-y-3 overflow-y-auto pr-2">
      <StoriesRow user={user} stories={stories} />
      <PostComposer user={user} />
      {posts.map((post) => (
        <FeedCard key={post.id} post={post} />
      ))}
    </section>
  );
};

export default FeedColumn;
