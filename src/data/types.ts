export type User = {
  id: string;
  name: string;
  handle: string;
  avatarUrl: string;
  title?: string;
};

export type Post = {
  id: string;
  author: User;
  content: string;
  createdAt: string;
  likes: number;
  commentsCount: number;
  sharesCount: number;
  imageUrl?: string;
};

export type Friend = User & {
  isOnline: boolean;
  recentMessage?: string;
};

export type ChatMessage = {
  id: string;
  from: User | Friend;
  content: string;
  time: string;
};
