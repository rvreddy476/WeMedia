import { useRef } from 'react';
import { Story, User } from '../../data/types';
import Avatar from '../common/Avatar';
import { ChevronLeftIcon, ChevronRightIcon, PlusIcon } from '../common/Icons';

interface StoriesRowProps {
  user: User;
  stories: Story[];
}

const StoriesRow = ({ user, stories }: StoriesRowProps) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    const container = scrollRef.current;
    if (!container) return;
    const offset = direction === 'left' ? -160 : 160;
    container.scrollBy({ left: offset, behavior: 'smooth' });
  };

  return (
    <div className="card relative overflow-hidden p-3 sm:p-4">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-800">Stories</h3>
        <div className="hidden gap-2 sm:flex">
          <button
            type="button"
            aria-label="Scroll stories left"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-slate-300 hover:text-slate-900"
            onClick={() => handleScroll('left')}
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Scroll stories right"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-slate-300 hover:text-slate-900"
            onClick={() => handleScroll('right')}
          >
            <ChevronRightIcon className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="relative">
        <div
          ref={scrollRef}
          className="no-scrollbar flex gap-3 overflow-x-auto scroll-smooth pr-1"
        >
          <div className="relative h-48 w-28 shrink-0 overflow-hidden rounded-2xl border border-slate-100 bg-gradient-to-b from-slate-100 to-white shadow-sm sm:w-32 md:w-36">
            <div className="relative h-4/5 overflow-hidden">
              <div className="absolute inset-0 bg-slate-200" />
              <div className="absolute inset-0 flex items-center justify-center">
                <PlusIcon className="h-8 w-8 rounded-full bg-white p-1.5 text-sky-600 shadow" />
              </div>
            </div>
            <div className="absolute left-3 top-3">
              <Avatar user={user} size="sm" />
            </div>
            <div className="flex h-1/5 flex-col justify-center px-3 pb-2 pt-1 text-sm font-semibold text-slate-800">
              Create story
            </div>
          </div>

          {stories.map((story) => (
            <article
              key={story.id}
              className="group relative h-48 w-28 shrink-0 overflow-hidden rounded-2xl border border-slate-100 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:w-32 md:w-36"
            >
              <img src={story.imageUrl} alt={story.name} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-b from-slate-900/10 via-slate-900/20 to-slate-900/60" />
              {story.badge && (
                <span className="absolute left-2 top-2 rounded-full bg-white/90 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-slate-700 shadow">
                  {story.badge}
                </span>
              )}
              <div className="absolute left-2 top-2">
                <div className="rounded-full border-2 border-white p-0.5 shadow-sm ring-2 ring-sky-500">
                  <img
                    src={story.avatarUrl}
                    alt={`${story.name} avatar`}
                    className="h-9 w-9 rounded-full object-cover"
                  />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-3 text-sm font-semibold text-white drop-shadow">
                <p className="max-h-10 overflow-hidden text-ellipsis break-words leading-tight">{story.name}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-6 bg-gradient-to-r from-white to-transparent sm:block" />
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-6 bg-gradient-to-l from-white to-transparent sm:block" />
      </div>
    </div>
  );
};

export default StoriesRow;
