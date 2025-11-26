import {
  CloseIcon,
  EventIcon,
  LocationIcon,
  PhotoIcon,
  PollIcon,
  PostIcon,
  ReelsIcon,
  SparklesIcon,
  SmileIcon,
  TvIcon,
} from '../common/Icons';
import Avatar from '../common/Avatar';
import { User } from '../../data/types';
import { useMemo, useRef, useState } from 'react';
import { emotionEmojis } from '../../data/emotionEmojis';

const feelings = [
  { label: 'Happy', emoji: '😊' },
  { label: 'Excited', emoji: '🤩' },
  { label: 'Blessed', emoji: '😇' },
  { label: 'Loved', emoji: '🥰' },
  { label: 'Thankful', emoji: '🙏' },
  { label: 'Curious', emoji: '🤔' },
  { label: 'Celebrating', emoji: '🥳' },
  { label: 'Relaxed', emoji: '😌' },
  { label: 'Confident', emoji: '😎' },
  { label: 'Motivated', emoji: '🔥' },
];

const activities = [
  { label: 'Reading a book', emoji: '📚' },
  { label: 'Watching a movie', emoji: '🎬' },
  { label: 'Cooking', emoji: '🍳' },
  { label: 'Traveling', emoji: '✈️' },
  { label: 'Working out', emoji: '💪' },
  { label: 'Listening to music', emoji: '🎧' },
  { label: 'Gaming', emoji: '🎮' },
  { label: 'At a concert', emoji: '🎤' },
  { label: 'Studying', emoji: '📝' },
  { label: 'Taking a break', emoji: '☕️' },
];

type PostComposerModalProps = {
  user: User;
  isOpen: boolean;
  onClose: () => void;
};

const colorOptions = ['#FDE68A', '#C7D2FE', '#FBCFE8', '#BBF7D0', '#E0F2FE', '#F5F5F5'];

const PostComposerModal = ({ user, isOpen, onClose }: PostComposerModalProps) => {
  const [activeMode, setActiveMode] = useState<'text' | 'media' | 'poll' | 'event' | 'feeling'>('text');
  const [textValue, setTextValue] = useState('');
  const [backgroundColor, setBackgroundColor] = useState<string>(colorOptions[0]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [pollOptions, setPollOptions] = useState<string[]>(['', '']);
  const [pollQuestion, setPollQuestion] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [selectedFeeling, setSelectedFeeling] = useState<{ label: string; emoji: string } | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<{ label: string; emoji: string } | null>(null);
  const [feelingTab, setFeelingTab] = useState<'feeling' | 'activity'>('feeling');
  const [mediaCaption, setMediaCaption] = useState('');
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const modeConfig = useMemo(
    () => [
      { key: 'text' as const, label: 'Text', icon: SparklesIcon },
      { key: 'media' as const, label: 'Photo/Video', icon: PhotoIcon },
      { key: 'poll' as const, label: 'Poll', icon: PollIcon },
      { key: 'event' as const, label: 'Event', icon: EventIcon },
      { key: 'feeling' as const, label: 'Feeling/Activity', icon: SmileIcon },
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
                  <div className="relative">
                    <textarea
                      ref={textAreaRef}
                      className="w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 pr-12 text-sm text-slate-800 shadow-inner placeholder:text-slate-400 focus:border-slate-300 focus:outline-none"
                      rows={4}
                      placeholder="What's on your mind?"
                      value={textValue}
                      onChange={(e) => setTextValue(e.target.value)}
                      style={{ backgroundColor }}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-3 rounded-full border border-slate-200 bg-white p-2 text-slate-600 shadow-soft transition hover:-translate-y-0.5"
                      onClick={() => setShowEmojiPicker((prev) => !prev)}
                      title="Add emoji"
                      aria-label="Add emoji"
                    >
                      <SmileIcon className="h-4 w-4" />
                    </button>
                    {showEmojiPicker && (
                      <div className="absolute right-0 top-14 z-10 w-52 rounded-2xl border border-slate-200 bg-white p-2 text-left shadow-xl">
                        <div className="mb-2 text-xs font-semibold text-slate-500">Emotions</div>
                        <div className="grid max-h-48 grid-cols-6 gap-1 overflow-y-auto pr-1">
                          {emotionEmojis.map((emoji) => (
                            <button
                              key={emoji}
                              className="flex h-9 w-9 items-center justify-center rounded-lg text-xl transition hover:bg-muted"
                              onClick={() => {
                                setTextValue((prev) => `${prev}${emoji}`);
                                setShowEmojiPicker(false);
                                textAreaRef.current?.focus();
                              }}
                              aria-label={`Insert ${emoji}`}
                            >
                              {emoji}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
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

              {activeMode === 'media' && (
                <div className="space-y-4 rounded-2xl border border-dashed border-slate-200 bg-muted px-4 py-6 text-sm text-slate-600">
                  <div className="flex items-center justify-center gap-3 text-slate-700">
                    <PhotoIcon className="h-7 w-7 text-slate-500" />
                    <p className="font-semibold text-slate-800">Add photos or videos</p>
                  </div>
                  <p className="text-xs text-slate-500">Drag and drop your media or pick files from your device.</p>
                  <div className="flex flex-wrap gap-3">
                    <button className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-soft transition hover:-translate-y-0.5">
                      Upload files
                    </button>
                    <div className="flex flex-1 items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-left shadow-soft">
                      <ReelsIcon className="h-4 w-4 text-slate-400" />
                      <input
                        className="w-full border-none bg-transparent text-xs text-slate-700 outline-none placeholder:text-slate-400"
                        placeholder="Or paste a video link"
                      />
                    </div>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-inner">
                    <label className="text-xs font-semibold text-slate-600">Caption</label>
                    <textarea
                      className="mt-2 w-full resize-none rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-slate-300 focus:outline-none"
                      rows={3}
                      value={mediaCaption}
                      onChange={(e) => setMediaCaption(e.target.value)}
                      placeholder="Add a caption for your media"
                    />
                  </div>
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
                    value={pollQuestion}
                    onChange={(e) => setPollQuestion(e.target.value)}
                  />
                  <div className="max-h-48 space-y-2 overflow-y-auto pr-1">
                    {pollOptions.map((value, index) => (
                      <input
                        key={index}
                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 shadow-soft placeholder:text-slate-400 focus:border-slate-300 focus:outline-none"
                        placeholder={`Option ${index + 1}`}
                        value={value}
                        onChange={(e) => {
                          const next = [...pollOptions];
                          next[index] = e.target.value;
                          setPollOptions(next);
                        }}
                      />
                    ))}
                  </div>
                  <button
                    type="button"
                    className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-soft transition hover:-translate-y-0.5"
                    onClick={() => setPollOptions((opts) => [...opts, ''])}
                  >
                    Add option
                  </button>
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
                    placeholder="Share details"
                  />
                  <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 shadow-soft">
                    <LocationIcon className="h-5 w-5 text-slate-400" />
                    <input
                      className="w-full border-none bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
                      placeholder="Add a location"
                      value={eventLocation}
                      onChange={(e) => setEventLocation(e.target.value)}
                    />
                  </div>
                </div>
              )}

              {activeMode === 'feeling' && (
                <div className="space-y-4 rounded-2xl border border-slate-200 bg-muted/60 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <SmileIcon className="h-5 w-5 text-slate-600" />
                      <p className="text-sm font-semibold text-slate-800">Feeling/Activity</p>
                    </div>
                    {(selectedFeeling || selectedActivity) && (
                      <div className="flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700 shadow-soft">
                        {selectedFeeling?.emoji || selectedActivity?.emoji} {selectedFeeling?.label || selectedActivity?.label}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      className={`flex-1 rounded-full px-4 py-2 text-xs font-semibold transition hover:-translate-y-0.5 ${
                        feelingTab === 'feeling'
                          ? 'bg-slate-900 text-white shadow-soft'
                          : 'border border-slate-200 bg-white text-slate-700 shadow-soft'
                      }`}
                      onClick={() => setFeelingTab('feeling')}
                    >
                      Feelings
                    </button>
                    <button
                      className={`flex-1 rounded-full px-4 py-2 text-xs font-semibold transition hover:-translate-y-0.5 ${
                        feelingTab === 'activity'
                          ? 'bg-slate-900 text-white shadow-soft'
                          : 'border border-slate-200 bg-white text-slate-700 shadow-soft'
                      }`}
                      onClick={() => setFeelingTab('activity')}
                    >
                      Activities
                    </button>
                  </div>
                  <div className="grid max-h-52 grid-cols-2 gap-2 overflow-y-auto pr-1">
                    {(feelingTab === 'feeling' ? feelings : activities).map((item) => (
                      <button
                        key={item.label}
                        className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-soft transition hover:-translate-y-0.5"
                        onClick={() => {
                          if (feelingTab === 'feeling') {
                            setSelectedFeeling(item);
                            setSelectedActivity(null);
                          } else {
                            setSelectedActivity(item);
                            setSelectedFeeling(null);
                          }
                        }}
                        title={item.label}
                      >
                        <span>{item.label}</span>
                        <span className="text-lg">{item.emoji}</span>
                      </button>
                    ))}
                  </div>
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
