import { useEffect, useMemo, useState } from 'react';
import Header from './components/layout/Header';
import MainLayout from './components/layout/MainLayout';
import ChatWindowsBar from './components/chat/ChatWindowsBar';
import { chatMessages, currentUser, friends, posts, stories } from './data/mockData';
import { Friend, User } from './data/types';
import PostComposerModal from './components/feed/PostComposerModal';
import AuthPage from './components/auth/AuthPage';
import { AuthSession, AuthUser, fetchProfile } from './api/auth';

const getStoredSession = (): AuthSession | null => {
    const stored = localStorage.getItem('wemedia_auth_session');
    if (!stored) return null;
    try {
      return JSON.parse(stored) as AuthSession;
    } catch (error) {
      console.error('Failed to parse session', error);
      return null;
    }
  }

function App() {
  const [session, setSession] = useState<AuthSession | null>(getStoredSession);
  const [openChatIds, setOpenChatIds] = useState<string[]>([]);
  const [minimizedChatIds, setMinimizedChatIds] = useState<string[]>([]);
  const [isPostComposerOpen, setIsPostComposerOpen] = useState<boolean>(false);
  const [view, setView] = useState<'auth' | 'home'>(() => (session ? 'home' : 'auth'));
  const [activeUser, setActiveUser] = useState<User>(currentUser);
  const [isRestoringSession, setIsRestoringSession] = useState<boolean>(false);

  useEffect(() => {
    if (view === 'auth') {
      setOpenChatIds([]);
      setMinimizedChatIds([]);
      setIsPostComposerOpen(false);
    }
  }, [view]);

  useEffect(() => {
    if (session) {
      localStorage.setItem('wemedia_auth_session', JSON.stringify(session));
    } else {
      localStorage.removeItem('wemedia_auth_session');
    }
  }, [session]);

  useEffect(() => {
    const normalizeUser = (user: AuthUser): User => {
      const name = `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim() || 'WeMedia Member';
      const handle = user.handle || `@${(user.firstName || 'member').toLowerCase()}.${(user.lastName || 'community').toLowerCase()}`;
      return {
        id: user.id,
        name,
        handle,
        avatarUrl:
          user.avatarUrl ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0f172a&color=ffffff`,
        title: 'Member',
      };
    };

    if (session) {
      setActiveUser(normalizeUser(session.user));
      setView('home');
      return;
    }

    setActiveUser(currentUser);
    setView('auth');
  }, [session]);

  useEffect(() => {
    if (!session?.tokens?.accessToken) return;
    let isMounted = true;
    setIsRestoringSession(true);

    fetchProfile(session.tokens.accessToken)
      .then((profile) => {
        if (!isMounted) return;
        setSession((prev) => (prev ? { ...prev, user: profile } : prev));
      })
      .catch(() => {
        if (!isMounted) return;
        setSession(null);
      })
      .finally(() => {
        if (isMounted) setIsRestoringSession(false);
      });

    return () => {
      isMounted = false;
    };
  }, [session?.tokens?.accessToken]);

  const openChatFriends: Friend[] = useMemo(
    () =>
      openChatIds
        .map((id) => friends.find((friend) => friend.id === id))
        .filter(Boolean) as Friend[],
    [openChatIds],
  );

  const handleOpenChat = (friendId: string) => {
    setOpenChatIds((prev) => {
      const withoutExisting = prev.filter((id) => id !== friendId);
      const updated = [...withoutExisting, friendId];
      const limited = updated.slice(-2);
      setMinimizedChatIds((minimized) => minimized.filter((id) => limited.includes(id)));
      return limited;
    });
  };

  const handleCloseChat = (friendId: string) => {
    setOpenChatIds((prev) => prev.filter((id) => id !== friendId));
    setMinimizedChatIds((prev) => prev.filter((id) => id !== friendId));
  };

  const handleToggleMinimize = (friendId: string) => {
    setMinimizedChatIds((prev) =>
      prev.includes(friendId) ? prev.filter((id) => id !== friendId) : [...prev, friendId],
    );
  };

  const handleAuthSuccess = (authSession: AuthSession) => {
    setSession(authSession);
  };

  if (view === 'auth') {
    return <AuthPage onAuthSuccess={handleAuthSuccess} isRestoring={isRestoringSession} />;
  }

  return (
    <div className="min-h-screen bg-background text-slate-900">
      <Header
        user={activeUser}
        onOpenComposer={() => setIsPostComposerOpen(true)}
        onOpenAuth={() => {
          setSession(null);
          setView('auth');
        }}
      />
      <MainLayout
        user={activeUser}
        friends={friends}
        posts={posts}
        stories={stories}
        onFriendSelect={handleOpenChat}
      />
      <ChatWindowsBar
        friends={openChatFriends}
        minimizedChatIds={minimizedChatIds}
        messages={chatMessages}
        onCloseChat={handleCloseChat}
        onToggleMinimize={handleToggleMinimize}
        onOpenDefaultChat={() => (friends[0] ? handleOpenChat(friends[0].id) : null)}
      />
      <PostComposerModal user={activeUser} isOpen={isPostComposerOpen} onClose={() => setIsPostComposerOpen(false)} />
    </div>
  );
}

export default App;
