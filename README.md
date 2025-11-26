You are a senior front-end engineer.



💻 Tech stack \& general rules

\- Use \*\*React + TypeScript\*\*.

\- Use \*\*Tailwind CSS\*\* for all styling.

\- Build a \*\*single-page Home screen\*\* for a social media app.

\- Focus on \*\*clean, modern, minimal UI\*\*. No heavy colors.

\- Use only \*\*static mock data\*\* (no backend, no API calls).

\- Code should be well-structured into reusable components.



🎯 Page Concept

This is the \*\*Home page\*\* of a social media app that combines:

\- \*\*Feed\*\* (center)

\- \*\*Navigation menu\*\* (left)

\- \*\*Chat + Friends list + Ads space\*\* (right)

\- \*\*Chat pop-up windows at the bottom\*\*, like Facebook / LinkedIn.



The layout should look like a 3-column app on desktop:

\- \*\*Left column\*\*: Main menu (approx. 2 grid columns or fixed width).

\- \*\*Middle column\*\*: Feed, large area.

\- \*\*Right column\*\*: Chat section (friends list) + small Ads area.



On smaller screens, degrade gracefully:

\- Left menu can collapse to an icon-only bar or a top/bottom menu.

\- Right chat section can collapse into a small \*\*“Chat”\*\* button or drawer.

\- Feed remains the primary focus.



---



\## Layout Structure



Implement a root layout something like:



\- \*\*Top Header (full width)\*\*

&nbsp; - Left: App logo / name (e.g., “MySocial”)

&nbsp; - Center: Search bar

&nbsp; - Right: Icons/buttons for Notifications, Messages, Profile avatar



\- \*\*Main content (below header): 3-column layout\*\*

&nbsp; - Left column: \*\*Menu\*\*

&nbsp;   - Occupies around "2 columns" visual space (e.g., fixed width like `w-64` on desktop)

&nbsp;   - Contains:

&nbsp;     - User mini profile overview (avatar, name, username).

&nbsp;     - Main navigation items:

&nbsp;       - Home

&nbsp;       - Explore

&nbsp;       - Reels/Shorts

&nbsp;       - Messages

&nbsp;       - Notifications

&nbsp;       - Bookmarks

&nbsp;       - Settings

&nbsp;     - Use icons + labels, nice spacing, hover states.

&nbsp;   - Stick to the viewport (`sticky top-\[header-height]`) on desktop so it doesn’t scroll out.



&nbsp; - Middle column: \*\*Feed\*\*

&nbsp;   - Takes majority of width on desktop.

&nbsp;   - Vertically scrollable feed with cards.

&nbsp;   - Add a “Create Post” composer at the top of the feed (simple textarea, buttons like Add Photo/Video).

&nbsp;   - Below composer, show multiple \*\*Post Cards\*\*.



&nbsp; - Right column: \*\*Chat \& Ads\*\*

&nbsp;   - Top area (under header): \*\*Ads space\*\*

&nbsp;     - Simple static banner/card: “Sponsored / Ad space”

&nbsp;     - Can include a sample image placeholder and short description.

&nbsp;   - Below ads: \*\*Friends / Chat List\*\*

&nbsp;     - A section titled “Chats” or “Friends Online”.

&nbsp;     - Search input: “Search friends…”

&nbsp;     - List of friends with:

&nbsp;       - Avatar

&nbsp;       - Name

&nbsp;       - Online status indicator (green dot for online).

&nbsp;     - At least 8–10 sample friends.

&nbsp;     - Clicking an \*\*online friend\*\* opens a \*\*chat pop-up window\*\* at the bottom of the page.



---



\## Feed Card Design \& Behavior



Create a reusable `FeedCard` component with:



\- Header row:

&nbsp; - Avatar

&nbsp; - Display name

&nbsp; - Username or handle (e.g., `@raghu`)

&nbsp; - Timestamp (e.g., “2h ago”)

&nbsp; - Optional menu icon (`...`) on the right.



\- Body:

&nbsp; - Post text content (multi-line).

&nbsp; - Optional media:

&nbsp;   - Image or video placeholder with rounded corners.



\- Footer actions (aligned horizontally):

&nbsp; - \*\*Like\*\* button with count.

&nbsp; - \*\*Comment\*\* button with count.

&nbsp; - \*\*Share\*\* button.

&nbsp; - Optional: \*\*Save\*\* / \*\*Bookmark\*\* icon.

&nbsp; - Provide simple interaction using React state:

&nbsp;   - Clicking Like toggles liked/unliked and updates like count.

&nbsp;   - Comment and Share can just log to console or show a small toast placeholder.



Use Tailwind to make the card:

\- Rounded corners

\- Light border

\- Soft shadow

\- Good padding and spacing.



---



\## Chat Section \& Pop-Up Chat Windows



\### Friends / Chat List (Right Column)

\- List shows:

&nbsp; - Friend avatar

&nbsp; - Name

&nbsp; - Status (online/offline). For simplicity, include a boolean `isOnline`.

&nbsp; - Online friends have a \*\*small green dot\*\* near avatar.

\- Friends should be clickable.

\- Only \*\*online friends\*\* should open chat windows.



\### Chat Pop-Up Windows (Bottom of Page)

\- At the bottom of the viewport, implement \*\*floating chat windows\*\*, similar to Facebook / LinkedIn chat:

&nbsp; - Position: fixed bottom-0, aligned right, with multiple windows next to each other.

&nbsp; - Each window includes:

&nbsp;   - Header:

&nbsp;     - Friend name

&nbsp;     - Online indicator

&nbsp;     - Close (X) button.

&nbsp;     - Minimize button (icon).

&nbsp;   - Body:

&nbsp;     - Scrollable message history area with few sample messages.

&nbsp;     - Different background for “me” vs “friend” messages.

&nbsp;   - Footer:

&nbsp;     - Input box to type a new message.

&nbsp;     - Send button (icon is enough).



\- Behavior:

&nbsp; - Clicking an online friend in the list:

&nbsp;   - If chat window not open: open one.

&nbsp;   - If already open: bring that window to front or highlight it.

&nbsp; - Close button removes the chat window from the bottom bar.

&nbsp; - Minimize button collapses the window so only the header remains visible.

&nbsp; - Support multiple open chat windows (e.g., up to 3–4) aligned horizontally from right to left.



Implement all chat state purely on the client with React:

\- Use a simple `useState` or `useReducer` structure to track:

&nbsp; - Which friends have open chat windows.

&nbsp; - Minimized state.

&nbsp; - Local message arrays (static, no actual sending required).



---



\## Styling Guidelines



\- Use a modern, light base theme:

&nbsp; - Background: neutral / slate tones (e.g., `bg-slate-50` or `bg-neutral-100` for page).

&nbsp; - Cards / columns: white or slightly tinted surfaces (`bg-white`, `bg-slate-100`).

&nbsp; - Text: `text-slate-800` for normal text, `text-slate-500` for secondary.

\- Add enough spacing:

&nbsp; - `p-4`, `gap-4` or `gap-6` between sections.

\- Use `max-w-6xl` or `max-w-7xl` centered container for the main layout on large screens.

\- Add subtle shadows (`shadow-sm`, `shadow-md`) and rounded corners (`rounded-xl`) to cards and chat windows.



Optional: also support a \*\*dark mode\*\* variant using Tailwind’s `dark:` classes, but this is not mandatory.



---



\## Component Structure Suggestion



Break the page into clean components, for example:



\- `HomePageLayout`

&nbsp; - `Header`

&nbsp; - `MainLayout` (the 3-column grid)

&nbsp;   - `LeftSidebar`

&nbsp;     - `UserMiniProfile`

&nbsp;     - `MainMenu`

&nbsp;   - `FeedColumn`

&nbsp;     - `PostComposer`

&nbsp;     - `FeedCard\[]`

&nbsp;   - `RightSidebar`

&nbsp;     - `AdBanner`

&nbsp;     - `ChatSidebar` (friends list)

&nbsp; - `ChatWindowsBar`

&nbsp;   - `ChatWindow` (reusable, one per open chat)



Keep components in a structure like:

\- `src/components/layout/...`

\- `src/components/feed/...`

\- `src/components/chat/...`



---



\## Data \& Types



Create simple TypeScript types:



```ts

type User = {

&nbsp; id: string;

&nbsp; name: string;

&nbsp; handle: string;

&nbsp; avatarUrl: string;

};



type Post = {

&nbsp; id: string;

&nbsp; author: User;

&nbsp; content: string;

&nbsp; createdAt: string;

&nbsp; likes: number;

&nbsp; commentsCount: number;

&nbsp; sharesCount: number;

&nbsp; imageUrl?: string;

};



type Friend = {

&nbsp; id: string;

&nbsp; name: string;

&nbsp; avatarUrl: string;

&nbsp; isOnline: boolean;

};



