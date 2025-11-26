import ChatWindow from './ChatWindow';
import { ChatMessage, Friend } from '../../data/types';

type ChatWindowsBarProps = {
  friends: Friend[];
  minimizedChatIds: string[];
  messages: ChatMessage[];
  onCloseChat: (friendId: string) => void;
  onToggleMinimize: (friendId: string) => void;
  onOpenDefaultChat?: () => void;
};

const ChatWindowsBar = ({
  friends,
  minimizedChatIds,
  messages,
  onCloseChat,
  onToggleMinimize,
  onOpenDefaultChat,
}: ChatWindowsBarProps) => {
  return (
    <div className="fixed bottom-4 left-1/2 z-30 flex w-full max-w-screen-2xl -translate-x-1/2 justify-end gap-3 px-3 sm:px-6">
      <div className="hidden items-end gap-3 md:flex">
        {friends.map((friend) => (
          <ChatWindow
            key={friend.id}
            friend={friend}
            messages={messages}
            isMinimized={minimizedChatIds.includes(friend.id)}
            onClose={() => onCloseChat(friend.id)}
            onToggleMinimize={() => onToggleMinimize(friend.id)}
          />
        ))}
      </div>
      {friends.length === 0 ? (
        <button
          className="md:hidden rounded-full bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-soft"
          onClick={onOpenDefaultChat}
        >
          Open chats
        </button>
      ) : null}
    </div>
  );
};

export default ChatWindowsBar;
