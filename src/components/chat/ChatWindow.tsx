import { CloseIcon, SendIcon } from '../common/Icons';
import { ChatMessage, Friend } from '../../data/types';
import Avatar from '../common/Avatar';

type ChatWindowProps = {
  friend: Friend;
  messages: ChatMessage[];
};

const ChatWindow = ({ friend, messages }: ChatWindowProps) => {
  return (
    <div className="card flex w-80 flex-col overflow-hidden">
      <div className="flex items-center justify-between bg-white px-3 py-2 shadow-sm">
        <div className="flex items-center gap-2">
          <Avatar user={friend} size="sm" showBadge />
          <div>
            <p className="text-sm font-semibold text-slate-900">{friend.name}</p>
            <p className="text-[11px] text-emerald-600">Online</p>
          </div>
        </div>
        <button className="rounded-full p-1 hover:bg-muted">
          <CloseIcon className="h-5 w-5 text-slate-500" />
        </button>
      </div>
      <div className="flex-1 space-y-3 bg-muted px-3 py-3">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.from.id === friend.id ? 'justify-start' : 'justify-end'}`}>
            <div
              className={`max-w-[70%] rounded-2xl px-3 py-2 text-sm shadow-soft ${
                message.from.id === friend.id ? 'bg-white text-slate-800' : 'bg-slate-900 text-white'
              }`}
            >
              <p>{message.content}</p>
              <p className="mt-1 text-[10px] uppercase tracking-wide text-slate-400">{message.time}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 border-t border-slate-200 bg-white px-3 py-2">
        <input
          className="flex-1 rounded-full bg-muted px-3 py-2 text-sm outline-none"
          placeholder="Write a message"
        />
        <button className="flex items-center gap-1 rounded-full bg-slate-900 px-3 py-2 text-xs font-semibold text-white shadow-soft transition hover:-translate-y-0.5">
          <SendIcon className="h-4 w-4" />
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
