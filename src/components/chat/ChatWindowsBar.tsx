import ChatWindow from './ChatWindow';
import { ChatMessage, Friend } from '../../data/types';

type ChatWindowsBarProps = {
  friends: Friend[];
  messages: ChatMessage[];
};

const ChatWindowsBar = ({ friends, messages }: ChatWindowsBarProps) => {
  return (
    <div className="fixed bottom-4 left-1/2 z-30 flex w-full max-w-screen-2xl -translate-x-1/2 justify-end gap-3 px-3 sm:px-6">
      <div className="hidden md:flex items-end gap-3">
        {friends.map((friend) => (
          <ChatWindow key={friend.id} friend={friend} messages={messages} />
        ))}
      </div>
      <button className="md:hidden rounded-full bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-soft">
        Open chats
      </button>
    </div>
  );
};

export default ChatWindowsBar;
