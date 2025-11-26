import Header from './components/layout/Header';
import MainLayout from './components/layout/MainLayout';
import ChatWindowsBar from './components/chat/ChatWindowsBar';
import { chatMessages, currentUser, friends, posts } from './data/mockData';

function App() {
  return (
    <div className="min-h-screen bg-background text-slate-900">
      <Header user={currentUser} />
      <MainLayout user={currentUser} friends={friends} posts={posts} />
      <ChatWindowsBar friends={friends.slice(0, 2)} messages={chatMessages} />
    </div>
  );
}

export default App;
