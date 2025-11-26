import Header from './components/layout/Header';
import MainLayout from './components/layout/MainLayout';
import ChatWindowsBar from './components/chat/ChatWindowsBar';
import { chatMessages, currentUser, friends, posts, stories } from './data/mockData';
import { useMemo, useState } from 'react';
import { Friend } from './data/types';
import PostComposerModal from './components/feed/PostComposerModal';

function App() {
  const [openChatIds, setOpenChatIds] = useState<string[]>([]);
  const [minimizedChatIds, setMinimizedChatIds] = useState<string[]>([]);
  const [isPostComposerOpen, setIsPostComposerOpen] = useState<boolean>(false);

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

  return (
    <div className="min-h-screen bg-background text-slate-900">
      <Header user={currentUser} onOpenComposer={() => setIsPostComposerOpen(true)} />
      <MainLayout
        user={currentUser}
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
      <PostComposerModal user={currentUser} isOpen={isPostComposerOpen} onClose={() => setIsPostComposerOpen(false)} />
    </div>
  );
}

export default App;
