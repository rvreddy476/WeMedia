import Header from './components/layout/Header';
import MainLayout from './components/layout/MainLayout';
import ChatWindowsBar from './components/chat/ChatWindowsBar';
import { chatMessages, currentUser, friends, posts } from './data/mockData';
import { useMemo, useState } from 'react';
import { Friend } from './data/types';

function App() {
  const [openChatIds, setOpenChatIds] = useState<string[]>([]);
  const [minimizedChatIds, setMinimizedChatIds] = useState<string[]>([]);

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
      <Header user={currentUser} />
      <MainLayout user={currentUser} friends={friends} posts={posts} onFriendSelect={handleOpenChat} />
      <ChatWindowsBar
        friends={openChatFriends}
        minimizedChatIds={minimizedChatIds}
        messages={chatMessages}
        onCloseChat={handleCloseChat}
        onToggleMinimize={handleToggleMinimize}
        onOpenDefaultChat={() => (friends[0] ? handleOpenChat(friends[0].id) : null)}
      />
    </div>
  );
}

export default App;
