import {
  CloseIcon,
  EventIcon,
  PhotoIcon,
  PollIcon,
  PostIcon,
  ReelsIcon,
  SparklesIcon,
  TvIcon,
  VideoIcon,
} from '../common/Icons';
import Avatar from '../common/Avatar';
import { User } from '../../data/types';
import { useMemo, useState } from 'react';

type PostComposerModalProps = {
  user: User;
  isOpen: boolean;
  onClose: () => void;
};

const colorOptions = ['#FDE68A', '#C7D2FE', '#FBCFE8', '#BBF7D0', '#E0F2FE', '#F5F5F5'];

const PostComposerModal = ({ user, isOpen, onClose }: PostComposerModalProps) => {
  const [activeMode, setActiveMode] = useState<'text' | 'image' | 'video' | 'poll' | 'event'>('text');
  const [backgroundColor, setBackgroundColor] = useState<string>(colorOptions[0]);

  const modeConfig = useMemo(
    () => [
      { key: 'text' as const, label: 'Text', icon: SparklesIcon },
      { key: 'image' as const, label: 'Image', icon: PhotoIcon },
      { key: 'video' as const, label: 'Video', icon: VideoIcon },
      { key: 'poll' as const, label: 'Poll', icon: PollIcon },
      { key: 'event' as const, label: 'Event', icon: EventIcon },
    ],
    [],
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 backdrop-blur-sm">
      <div className="w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-soft">
              <PostIcon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-base font-semibold text-slate-900">Create a post</p>
              <p className="text-xs text-slate-500">Share updates with your audience</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-full border border-slate-200 bg-white p-2 text-slate-600 shadow-soft transition hover:-translate-y-0.5 hover:text-slate-900"
            title="Close composer"
            aria-label="Close composer"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="max-h-[75vh] overflow-y-auto px-6 pb-6 pt-4">
          <div className="flex flex-wrap gap-2">
            {modeConfig.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveMode(key)}
                className={`flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold transition hover:-translate-y-0.5 ${
                  activeMode === key
                    ? 'border-slate-900 bg-slate-900 text-white shadow-soft'
                    : 'border-slate-200 bg-white text-slate-700 shadow-soft'
                }`}
                title={label}
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            ))}
          </div>

          <div className="mt-6 flex items-start gap-4">
            <Avatar user={user} size="md" showBadge />
            <div className="flex-1 space-y-4">
              {activeMode === 'text' && (
                <div className="space-y-3">
                  <textarea
                    className="w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-800 shadow-inner placeholder:text-slate-400 focus:border-slate-300 focus:outline-none"
                    rows={4}
                    placeholder="What's on your mind?"
                    style={{ backgroundColor }}
                  />
                  <div className="flex flex-wrap items-center gap-2">
                    {colorOptions.map((color) => (
                      <button
                        key={color}
                        onClick={() => setBackgroundColor(color)}
                        className={`h-9 w-9 rounded-full border transition hover:-translate-y-0.5 ${
                          backgroundColor === color ? 'border-slate-900 ring-2 ring-slate-900/20' : 'border-slate-200'
                        }`}
                        style={{ backgroundColor: color }}
                        title={`Background ${color}`}
                        aria-label={`Background ${color}`}
                      />
                    ))}
                  </div>
                </div>
              )}

              {activeMode === 'image' && (
                <div className="space-y-3 rounded-2xl border border-dashed border-slate-200 bg-muted px-4 py-6 text-center text-sm text-slate-600">
                  <PhotoIcon className="mx-auto h-8 w-8 text-slate-500" />
                  <p className="font-semibold text-slate-800">Add images</p>
                  <p className="text-xs text-slate-500">Drag and drop your photos or select from your device.</p>
                  <button className="mt-2 rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-slate-800">
                    Upload photos
                  </button>
                </div>
              )}

              {activeMode === 'video' && (
                <div className="space-y-3 rounded-2xl border border-dashed border-slate-200 bg-muted px-4 py-6 text-center text-sm text-slate-600">
                  <VideoIcon className="mx-auto h-8 w-8 text-slate-500" />
                  <p className="font-semibold text-slate-800">Share a video</p>
                  <p className="text-xs text-slate-500">Upload a clip or paste a link to embed.</p>
                  <div className="mx-auto flex max-w-md items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-left shadow-soft">
                    <input
                      className="w-full border-none bg-transparent text-xs text-slate-700 outline-none placeholder:text-slate-400"
                      placeholder="Paste video URL"
                    />
                    <ReelsIcon className="h-4 w-4 text-slate-400" />
                  </div>
                  <button className="rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-slate-800">
                    Upload video
                  </button>
                </div>
              )}

              {activeMode === 'poll' && (
                <div className="space-y-3 rounded-2xl border border-slate-200 bg-muted/60 p-4">
                  <div className="flex items-center gap-2">
                    <PollIcon className="h-5 w-5 text-slate-600" />
                    <p className="text-sm font-semibold text-slate-800">Create a poll</p>
                  </div>
                  <input
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 shadow-soft placeholder:text-slate-400 focus:border-slate-300 focus:outline-none"
                    placeholder="Ask a question"
                  />
                  <div className="space-y-2">
                    {[1, 2, 3].map((option) => (
                      <input
                        key={option}
                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 shadow-soft placeholder:text-slate-400 focus:border-slate-300 focus:outline-none"
                        placeholder={`Option ${option}`}
                      />
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs text-slate-500">
                    <span>Poll length:</span>
                    <button className="rounded-full border border-slate-200 bg-white px-3 py-1 font-semibold text-slate-700 shadow-soft transition hover:-translate-y-0.5">
                      1 day
                    </button>
                    <button className="rounded-full border border-slate-200 bg-white px-3 py-1 font-semibold text-slate-700 shadow-soft transition hover:-translate-y-0.5">
                      3 days
                    </button>
                    <button className="rounded-full border border-slate-200 bg-white px-3 py-1 font-semibold text-slate-700 shadow-soft transition hover:-translate-y-0.5">
                      1 week
                    </button>
                  </div>
                </div>
              )}

              {activeMode === 'event' && (
                <div className="space-y-3 rounded-2xl border border-slate-200 bg-muted/60 p-4">
                  <div className="flex items-center gap-2">
                    <EventIcon className="h-5 w-5 text-slate-600" />
                    <p className="text-sm font-semibold text-slate-800">Plan an event</p>
                  </div>
                  <input
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 shadow-soft placeholder:text-slate-400 focus:border-slate-300 focus:outline-none"
                    placeholder="Event title"
                  />
                  <div className="grid gap-3 sm:grid-cols-2">
                    <input
                      type="date"
                      className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 shadow-soft focus:border-slate-300 focus:outline-none"
                    />
                    <input
                      type="time"
                      className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 shadow-soft focus:border-slate-300 focus:outline-none"
                    />
                  </div>
                  <textarea
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 shadow-inner placeholder:text-slate-400 focus:border-slate-300 focus:outline-none"
                    rows={3}
                    placeholder="Share details or add a location"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-slate-200 px-6 py-4">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <TvIcon className="h-4 w-4 text-slate-400" />
            Cross-post to your channels
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-soft transition hover:-translate-y-0.5"
            >
              Cancel
            </button>
            <button className="rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-slate-800">
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostComposerModal;
