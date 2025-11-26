import { ChatMessage, Friend, Post, User } from './types';

export const currentUser: User = {
  id: 'u1',
  name: 'Maya Thompson',
  handle: '@maya.designs',
  avatarUrl: 'https://i.pravatar.cc/150?img=5',
  title: 'Product Designer',
};

export const friends: Friend[] = [
  {
    id: 'f1',
    name: 'Ethan Wells',
    handle: '@ethan.wells',
    avatarUrl: 'https://i.pravatar.cc/150?img=12',
    isOnline: true,
    recentMessage: 'Let’s sync tomorrow?'
  },
  {
    id: 'f2',
    name: 'Lena Ortiz',
    handle: '@lena.ortiz',
    avatarUrl: 'https://i.pravatar.cc/150?img=48',
    isOnline: true,
    recentMessage: 'Loved your latest post!'
  },
  {
    id: 'f3',
    name: 'Noah Carter',
    handle: '@noah.carter',
    avatarUrl: 'https://i.pravatar.cc/150?img=18',
    isOnline: false,
    recentMessage: 'Sent over the files.'
  },
  {
    id: 'f4',
    name: 'Priya Singh',
    handle: '@priya.singh',
    avatarUrl: 'https://i.pravatar.cc/150?img=33',
    isOnline: true,
    recentMessage: 'Up for coffee?'
  },
  {
    id: 'f5',
    name: 'Camila Chen',
    handle: '@camila.chen',
    avatarUrl: 'https://i.pravatar.cc/150?img=15',
    isOnline: true,
    recentMessage: 'Can you review the deck?'
  },
  {
    id: 'f6',
    name: 'Julian Park',
    handle: '@julian.park',
    avatarUrl: 'https://i.pravatar.cc/150?img=22',
    isOnline: false,
    recentMessage: 'Booking travel now.'
  },
  {
    id: 'f7',
    name: 'Amina Rahman',
    handle: '@amina.rahman',
    avatarUrl: 'https://i.pravatar.cc/150?img=40',
    isOnline: true,
    recentMessage: 'Let’s pair after lunch.'
  },
  {
    id: 'f8',
    name: 'Mateo Rossi',
    handle: '@mateo.rossi',
    avatarUrl: 'https://i.pravatar.cc/150?img=50',
    isOnline: true,
    recentMessage: 'Draft sent over.'
  },
  {
    id: 'f9',
    name: 'Isabella Moretti',
    handle: '@isabella.moretti',
    avatarUrl: 'https://i.pravatar.cc/150?img=24',
    isOnline: false,
    recentMessage: 'Are we still on for 3pm?'
  },
  {
    id: 'f10',
    name: 'Kai Nakamura',
    handle: '@kai.nakamura',
    avatarUrl: 'https://i.pravatar.cc/150?img=28',
    isOnline: true,
    recentMessage: 'Shared the assets.'
  },
  {
    id: 'f11',
    name: 'Nora Becker',
    handle: '@nora.becker',
    avatarUrl: 'https://i.pravatar.cc/150?img=44',
    isOnline: false,
    recentMessage: 'This color palette works!'
  },
  {
    id: 'f12',
    name: 'Diego Alvarez',
    handle: '@diego.alvarez',
    avatarUrl: 'https://i.pravatar.cc/150?img=7',
    isOnline: true,
    recentMessage: 'Ship it today?'
  },
  {
    id: 'f13',
    name: 'Sara Müller',
    handle: '@sara.muller',
    avatarUrl: 'https://i.pravatar.cc/150?img=14',
    isOnline: true,
    recentMessage: 'Sent you the recordings.'
  },
  {
    id: 'f14',
    name: 'Omar Faris',
    handle: '@omar.faris',
    avatarUrl: 'https://i.pravatar.cc/150?img=30',
    isOnline: false,
    recentMessage: 'Need a quick approval.'
  },
  {
    id: 'f15',
    name: 'Yara Ibrahim',
    handle: '@yara.ibrahim',
    avatarUrl: 'https://i.pravatar.cc/150?img=36',
    isOnline: true,
    recentMessage: 'Call me when free.'
  },
  {
    id: 'f16',
    name: 'Leo Martins',
    handle: '@leo.martins',
    avatarUrl: 'https://i.pravatar.cc/150?img=52',
    isOnline: true,
    recentMessage: 'New mockups ready.'
  }
];

export const posts: Post[] = [
  {
    id: 'p1',
    author: {
      id: 'u2',
      name: 'Alex Kim',
      handle: '@alex.codes',
      avatarUrl: 'https://i.pravatar.cc/150?img=10',
      title: 'Front-end Engineer',
    },
    content: 'Prototyped a new onboarding flow with micro-interactions. Feedback welcome ✨',
    createdAt: '2h ago',
    likes: 184,
    commentsCount: 32,
    sharesCount: 9,
    imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'p2',
    author: {
      id: 'u3',
      name: 'Sofia Laurent',
      handle: '@sofia.studio',
      avatarUrl: 'https://i.pravatar.cc/150?img=20',
      title: 'Brand Strategist',
    },
    content: 'Working on a minimalist rebrand for a wellness startup. Loving the neutral palette and typography so far.',
    createdAt: '5h ago',
    likes: 96,
    commentsCount: 18,
    sharesCount: 4,
  },
  {
    id: 'p3',
    author: {
      id: 'u4',
      name: 'Harper Lee',
      handle: '@harper.creates',
      avatarUrl: 'https://i.pravatar.cc/150?img=27',
      title: '3D Artist',
    },
    content: 'Experimenting with lighting in Blender today. Render times are worth it when the mood hits right.',
    createdAt: '1d ago',
    likes: 210,
    commentsCount: 41,
    sharesCount: 15,
    imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1000&q=80',
  },
];

export const chatMessages: ChatMessage[] = [
  {
    id: 'm1',
    from: friends[0],
    content: 'How’s the dashboard redesign going?',
    time: '09:21',
  },
  {
    id: 'm2',
    from: currentUser,
    content: 'Making good progress — shipping a build tonight.',
    time: '09:22',
  },
  {
    id: 'm3',
    from: friends[0],
    content: 'Awesome, ping me if you need QA.',
    time: '09:23',
  },
];
