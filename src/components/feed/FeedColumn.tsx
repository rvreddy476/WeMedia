import { Post, User } from '../../data/types';
import PostComposer from './PostComposer';
import FeedCard from './FeedCard';

type FeedColumnProps = {
  user: User;
  posts: Post[];
};

const FeedColumn = ({ user, posts }: FeedColumnProps) => {
  return (
    <section className="flex-1 space-y-3 overflow-y-auto pr-2">
      <PostComposer user={user} />
      {posts.map((post) => (
        <FeedCard key={post.id} post={post} />
      ))}
    </section>
  );
};

export default FeedColumn;
