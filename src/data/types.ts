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

export type Friend = {
  id: string;
  name: string;
  avatarUrl: string;
  isOnline: boolean;
  recentMessage?: string;
};

export type ChatMessage = {
  id: string;
  from: User | Friend;
  content: string;
  time: string;
};
