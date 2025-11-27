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
    <div className="pointer-events-none fixed bottom-5 left-0 right-0 z-30 flex justify-center px-3 sm:px-4 md:px-6 md:pr-[22rem]">
      <div className="hidden items-end gap-3 md:flex md:pointer-events-auto">
        {friends.map((friend, index) => (
          <ChatWindow
            key={friend.id}
            friend={friend}
            messages={messages}
            isMinimized={minimizedChatIds.includes(friend.id)}
            order={index}
            onClose={() => onCloseChat(friend.id)}
            onToggleMinimize={() => onToggleMinimize(friend.id)}
          />
        ))}
      </div>
      {friends.length === 0 ? (
        <button
          className="pointer-events-auto md:hidden rounded-full bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-soft"
          onClick={onOpenDefaultChat}
        >
          Open chats
        </button>
      ) : null}
    </div>
  );
};

export default ChatWindowsBar;
