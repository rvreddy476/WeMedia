import { FormEvent, useMemo, useState } from 'react';
import { ArrowRightIcon, ChatIcon, ExploreIcon, LockIcon, MailIcon, UserIcon, VideoIcon } from '../common/Icons';
import { AuthSession, loginUser, registerUser } from '../../api/auth';

type AuthPageProps = {
  onAuthSuccess: (session: AuthSession) => void;
  isRestoring?: boolean;
};

const AuthPage = ({ onAuthSuccess, isRestoring = false }: AuthPageProps) => {
  const [mode, setMode] = useState<'login' | 'register'>('register');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<{ loading: boolean; error: string | null; success: string | null }>({
    loading: false,
    error: null,
    success: null,
  });
  const ctaLabel = useMemo(() => (mode === 'login' ? 'Log in' : 'Create account'), [mode]);
  const canSubmit = useMemo(() => {
    if (status.loading) return false;
    if (!contact || !password) return false;
    if (mode === 'register' && (!firstName || !lastName || !gender || !dateOfBirth)) return false;
    return true;
  }, [contact, password, mode, firstName, lastName, gender, dateOfBirth, status.loading]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setStatus({ loading: true, error: null, success: null });

    try {
      const session =
        mode === 'login'
          ? await loginUser({ identifier: contact.trim(), password })
          : await registerUser({
              firstName: firstName.trim(),
              lastName: lastName.trim(),
              gender,
              dateOfBirth,
              contact: contact.trim(),
              password,
            });

      setStatus({ loading: false, error: null, success: mode === 'login' ? 'Welcome back!' : 'Account created' });
      onAuthSuccess(session);
    } catch (error) {
      setStatus({ loading: false, error: (error as Error)?.message || 'Unable to complete request', success: null });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-6 px-4 py-6 lg:flex-row lg:items-center lg:py-8">
        <div className="relative w-full max-w-xl overflow-hidden rounded-3xl bg-slate-900 text-white shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/25 via-slate-900 to-slate-900" />
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-indigo-400/10 blur-3xl" />
          <div className="absolute -bottom-14 -left-8 h-36 w-36 rounded-full bg-sky-300/10 blur-3xl" />
          <div className="relative space-y-6 p-8 sm:p-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/90">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-base">WM</span>
              <span>WeMedia</span>
            </div>
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.3em] text-white/60">Create · Connect · Discover</p>
              <h1 className="text-3xl font-semibold leading-tight sm:text-4xl">A calmer way to share what matters.</h1>
              <p className="max-w-xl text-sm text-white/75">
                Build your space in seconds—drop a post, jump into a chat, or follow new stories with an uncluttered flow that keeps you close to the people you care about.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/5 p-4 shadow-lg shadow-black/10 backdrop-blur">
                <div className="flex items-center gap-2 text-sm font-semibold text-emerald-50">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-400/20 ring-1 ring-emerald-300/50">
                    <VideoIcon className="h-5 w-5" />
                  </span>
                  Create
                </div>
                <p className="text-xs text-white/70">Go live, post highlights, and add reels without the noise.</p>
              </div>
              <div className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/5 p-4 shadow-lg shadow-black/10 backdrop-blur">
                <div className="flex items-center gap-2 text-sm font-semibold text-sky-50">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-400/20 ring-1 ring-sky-300/50">
                    <ChatIcon className="h-5 w-5" />
                  </span>
                  Connect
                </div>
                <p className="text-xs text-white/70">Pop open floating chats, share reactions, and keep replies close.</p>
              </div>
              <div className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/5 p-4 shadow-lg shadow-black/10 backdrop-blur">
                <div className="flex items-center gap-2 text-sm font-semibold text-fuchsia-50">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-fuchsia-400/20 ring-1 ring-fuchsia-300/50">
                    <ExploreIcon className="h-5 w-5" />
                  </span>
                  Discover
                </div>
                <p className="text-xs text-white/70">Swipe through stories, reels, and topics tailored to you.</p>
              </div>
            </div>
          </div>
        </div>

        <form
          className="w-full max-w-xl space-y-6 rounded-3xl border border-slate-100 bg-white p-6 shadow-soft sm:p-8"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center rounded-full bg-slate-100 p-1 text-sm font-semibold text-slate-500">
              <button
                type="button"
                className={`rounded-full px-4 py-2 transition ${
                  mode === 'login' ? 'bg-white text-slate-900 shadow-soft' : 'hover:text-slate-900'
                }`}
                onClick={() => {
                  setMode('login');
                  setStatus({ loading: false, error: null, success: null });
                }}
              >
                Login
              </button>
              <button
                type="button"
                className={`rounded-full px-4 py-2 transition ${
                  mode === 'register' ? 'bg-white text-slate-900 shadow-soft' : 'hover:text-slate-900'
                }`}
                onClick={() => {
                  setMode('register');
                  setStatus({ loading: false, error: null, success: null });
                }}
              >
                Register
              </button>
            </div>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">WeMedia Access</span>
          </div>

          {isRestoring && (
            <div className="rounded-xl border border-amber-100 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-800">
              Restoring your session...
            </div>
          )}

          <div className="space-y-4">
            {mode === 'register' && (
              <div className="space-y-3">
                <label className="text-sm font-semibold text-slate-700">Name</label>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 focus-within:border-slate-400">
                    <UserIcon className="h-5 w-5 text-slate-400" />
                    <input
                      value={firstName}
                      onChange={(event) => setFirstName(event.target.value)}
                      className="w-full border-none bg-transparent text-sm outline-none"
                      placeholder="First name"
                      aria-label="First name"
                    />
                  </div>
                  <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 focus-within:border-slate-400">
                    <UserIcon className="h-5 w-5 text-slate-400" />
                    <input
                      value={lastName}
                      onChange={(event) => setLastName(event.target.value)}
                      className="w-full border-none bg-transparent text-sm outline-none"
                      placeholder="Last name"
                      aria-label="Last name"
                    />
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Gender</label>
                    <select
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 outline-none focus:border-slate-400"
                      value={gender}
                      onChange={(event) => setGender(event.target.value)}
                      aria-label="Gender"
                    >
                      <option value="" disabled>
                        Select gender
                      </option>
                      <option value="female">Female</option>
                      <option value="male">Male</option>
                      <option value="nonbinary">Non-binary</option>
                      <option value="prefer-not">Prefer not to say</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Date of birth</label>
                    <input
                      type="date"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 outline-none focus:border-slate-400"
                      value={dateOfBirth}
                      onChange={(event) => setDateOfBirth(event.target.value)}
                      aria-label="Date of birth"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-3">
              <label className="text-sm font-semibold text-slate-700">Email or phone number</label>
              <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 focus-within:border-slate-400">
                <MailIcon className="h-5 w-5 text-slate-400" />
                <input
                  value={contact}
                  onChange={(event) => setContact(event.target.value)}
                  className="w-full border-none bg-transparent text-sm outline-none"
                  placeholder="you@example.com or +1 (555) 123-4567"
                  aria-label="Email or phone number"
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm font-semibold text-slate-700">
                <label>Password</label>
                {mode === 'login' && (
                  <button type="button" className="text-indigo-600 hover:underline">
                    Forgot?
                  </button>
                )}
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 focus-within:border-slate-400">
                <LockIcon className="h-5 w-5 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full border-none bg-transparent text-sm outline-none"
                  placeholder="••••••••"
                  aria-label="Password"
                />
              </div>
            </div>

            {status.error && (
              <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                {status.error}
              </div>
            )}
            {status.success && (
              <div className="rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
                {status.success}
              </div>
            )}

            <button
              type="submit"
              disabled={!canSubmit || isRestoring}
              className={`flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 ${
                canSubmit && !isRestoring ? 'bg-slate-900 hover:bg-slate-800' : 'cursor-not-allowed bg-slate-300 text-slate-600'
              }`}
            >
              {status.loading ? 'Processing...' : ctaLabel}
              <ArrowRightIcon className="h-4 w-4" />
            </button>

            <p className="text-center text-xs text-slate-500">By continuing you agree to our Terms of Service and acknowledge the Privacy Policy.</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
