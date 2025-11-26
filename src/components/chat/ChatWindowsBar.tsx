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
    <div className="fixed bottom-4 left-3 right-3 z-30 flex w-auto justify-start gap-3 sm:left-4 sm:right-4 md:right-[22rem]">
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
