import { PhotoIcon, VideoIcon, SmileIcon } from '../common/Icons';
import Avatar from '../common/Avatar';
import { User } from '../../data/types';

type PostComposerProps = {
  user: User;
};

const PostComposer = ({ user }: PostComposerProps) => {
  return (
    <div className="card p-4">
      <div className="flex items-start gap-3">
        <Avatar user={user} size="md" showBadge />
        <div className="flex-1">
          <textarea
            className="w-full resize-none rounded-2xl border border-slate-200 bg-muted px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-slate-300 focus:outline-none"
            rows={3}
            placeholder="Share something with your community..."
          />
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <button className="flex items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-soft transition hover:-translate-y-0.5">
              <PhotoIcon className="h-4 w-4" /> Photo
            </button>
            <button className="flex items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-soft transition hover:-translate-y-0.5">
              <VideoIcon className="h-4 w-4" /> Video
            </button>
            <button className="flex items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-soft transition hover:-translate-y-0.5">
              <SmileIcon className="h-4 w-4" /> Feeling
            </button>
            <div className="ml-auto">
              <button className="rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-slate-800">
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostComposer;
