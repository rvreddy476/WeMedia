import { useMemo, useState } from 'react';
import {
  ArrowRightIcon,
  ChatIcon,
  ExploreIcon,
  LockIcon,
  MailIcon,
  SparklesIcon,
  UserIcon,
} from '../common/Icons';

const features = [
  {
    title: 'Create',
    description: 'Share stories, reels, and live drops with vibrant backgrounds and quick media tools.',
    icon: SparklesIcon,
  },
  {
    title: 'Connect',
    description: 'Keep conversations flowing with floating chat windows, calls, and reactions.',
    icon: ChatIcon,
  },
  {
    title: 'Discover',
    description: 'Follow the people and topics you love with a curated feed and story reel.',
    icon: ExploreIcon,
  },
];

type AuthPageProps = {
  onEnterApp: () => void;
};

const AuthPage = ({ onEnterApp }: AuthPageProps) => {
  const [mode, setMode] = useState<'login' | 'register'>('register');
  const [interest, setInterest] = useState('creator');

  const ctaLabel = useMemo(() => (mode === 'login' ? 'Log in' : 'Create account'), [mode]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 text-slate-900">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 lg:flex-row lg:items-center lg:py-14">
        <div className="relative w-full overflow-hidden rounded-3xl bg-slate-900 text-white shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/40 via-slate-900 to-slate-900" />
          <div className="relative space-y-8 p-8 sm:p-10 lg:p-12">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white/90">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-base">WM</span>
              <span>Welcome to WeMedia</span>
            </div>
            <div className="space-y-3">
              <p className="text-lg uppercase tracking-[0.25em] text-white/60">Create · Connect · Discover</p>
              <h1 className="text-3xl font-semibold leading-tight sm:text-4xl">
                Share your world with the people who matter.
              </h1>
              <p className="max-w-xl text-base text-white/75">
                Craft stories, spark conversations, and explore new voices in a calm, modern workspace designed for
                creators and communities.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.title}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-soft backdrop-blur transition hover:-translate-y-0.5"
                  >
                    <div className="flex items-start gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                        <Icon className="h-5 w-5 text-white" />
                      </span>
                      <div className="space-y-1">
                        <p className="font-semibold text-white">{feature.title}</p>
                        <p className="text-sm text-white/75">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <button
              type="button"
              onClick={onEnterApp}
              className="group inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-soft transition hover:-translate-y-0.5"
            >
              <span>Preview the feed</span>
              <ArrowRightIcon className="h-4 w-4 transition group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        <div className="w-full space-y-6 rounded-3xl border border-slate-100 bg-white p-6 shadow-soft sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center rounded-full bg-slate-100 p-1 text-sm font-semibold text-slate-500">
              <button
                className={`rounded-full px-4 py-2 transition ${
                  mode === 'login' ? 'bg-white text-slate-900 shadow-soft' : 'hover:text-slate-900'
                }`}
                onClick={() => setMode('login')}
              >
                Login
              </button>
              <button
                className={`rounded-full px-4 py-2 transition ${
                  mode === 'register' ? 'bg-white text-slate-900 shadow-soft' : 'hover:text-slate-900'
                }`}
                onClick={() => setMode('register')}
              >
                Register
              </button>
            </div>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">WeMedia Access</span>
          </div>

          <div className="space-y-4">
            {mode === 'register' && (
              <div className="space-y-3">
                <label className="text-sm font-semibold text-slate-700">Full name</label>
                <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 focus-within:border-slate-400">
                  <UserIcon className="h-5 w-5 text-slate-400" />
                  <input
                    className="w-full border-none bg-transparent text-sm outline-none"
                    placeholder="Alex Morgan"
                    aria-label="Full name"
                  />
                </div>
                <label className="text-sm font-semibold text-slate-700">Choose your handle</label>
                <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 focus-within:border-slate-400">
                  <SparklesIcon className="h-5 w-5 text-slate-400" />
                  <input
                    className="w-full border-none bg-transparent text-sm outline-none"
                    placeholder="@wecreator"
                    aria-label="Handle"
                  />
                </div>
              </div>
            )}

            <div className="space-y-3">
              <label className="text-sm font-semibold text-slate-700">Email</label>
              <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 focus-within:border-slate-400">
                <MailIcon className="h-5 w-5 text-slate-400" />
                <input
                  type="email"
                  className="w-full border-none bg-transparent text-sm outline-none"
                  placeholder="you@example.com"
                  aria-label="Email"
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm font-semibold text-slate-700">
                <label>Password</label>
                {mode === 'login' && <button className="text-indigo-600 hover:underline">Forgot?</button>}
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 focus-within:border-slate-400">
                <LockIcon className="h-5 w-5 text-slate-400" />
                <input
                  type="password"
                  className="w-full border-none bg-transparent text-sm outline-none"
                  placeholder="••••••••"
                  aria-label="Password"
                />
              </div>
            </div>

            {mode === 'register' && (
              <div className="space-y-3">
                <label className="text-sm font-semibold text-slate-700">What brings you here?</label>
                <div className="grid gap-2 sm:grid-cols-3">
                  {[
                    { id: 'creator', label: 'Create' },
                    { id: 'connect', label: 'Connect' },
                    { id: 'discover', label: 'Discover' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setInterest(item.id)}
                      className={`flex items-center justify-center rounded-xl border px-3 py-3 text-sm font-semibold transition ${
                        interest === item.id
                          ? 'border-indigo-500 bg-indigo-50 text-indigo-700 shadow-soft'
                          : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-slate-800"
            >
              {ctaLabel}
              <ArrowRightIcon className="h-4 w-4" />
            </button>

            <p className="text-center text-xs text-slate-500">
              By continuing you agree to our Terms of Service and acknowledge the Privacy Policy.
            </p>

            <div className="flex items-center gap-3 text-sm text-slate-600">
              <div className="h-px flex-1 bg-slate-200" />
              <span>or</span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <button className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-soft transition hover:-translate-y-0.5">
                Continue with Google
              </button>
              <button className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-soft transition hover:-translate-y-0.5">
                Continue with Apple
              </button>
            </div>

            <button
              type="button"
              onClick={onEnterApp}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 shadow-soft transition hover:-translate-y-0.5"
            >
              Browse as guest
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
