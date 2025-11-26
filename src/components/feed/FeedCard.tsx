import { CommentIcon, HeartIcon, ShareIcon, DotsIcon } from '../common/Icons';
import Avatar from '../common/Avatar';
import { Post } from '../../data/types';

type FeedCardProps = {
  post: Post;
};

const FeedCard = ({ post }: FeedCardProps) => {
  return (
    <article className="card overflow-hidden">
      <div className="flex items-start gap-3 p-4">
        <Avatar user={post.author} size="md" showBadge />
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-semibold text-slate-900">{post.author.name}</p>
              <p className="text-xs text-slate-500">{post.author.title}</p>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-500">
              <span>{post.createdAt}</span>
              <button className="rounded-full p-1 hover:bg-muted">
                <DotsIcon className="h-5 w-5 text-slate-500" />
              </button>
            </div>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-slate-800">{post.content}</p>
        </div>
      </div>
      {post.imageUrl && (
        <div className="px-4 pb-4">
          <div className="overflow-hidden rounded-2xl">
            <img
              src={post.imageUrl}
              alt="post visual"
              className="h-72 w-full object-cover transition duration-500 hover:scale-[1.02]"
            />
          </div>
        </div>
      )}
      <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3 text-sm text-slate-600">
        <button className="flex items-center gap-2 rounded-full px-3 py-2 transition hover:bg-muted">
          <HeartIcon className="h-5 w-5" /> {post.likes}
        </button>
        <button className="flex items-center gap-2 rounded-full px-3 py-2 transition hover:bg-muted">
          <CommentIcon className="h-5 w-5" /> {post.commentsCount}
        </button>
        <button className="flex items-center gap-2 rounded-full px-3 py-2 transition hover:bg-muted">
          <ShareIcon className="h-5 w-5" /> {post.sharesCount}
        </button>
      </div>
    </article>
  );
};

export default FeedCard;
