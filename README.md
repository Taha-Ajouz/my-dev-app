# DevCommunity - Full Stack Developer Platform

A modern full-stack community platform built with Next.js 16, where developers can share knowledge, connect, and grow together.

## Features

✅ **Authentication**
- GitHub OAuth integration with Auth.js
- Protected routes and server actions
- Session management

✅ **User Profiles**
- Customizable developer profiles
- Skills showcase
- GitHub and website links
- Server-rendered profile pages

✅ **Community Posts**
- Create, edit, and delete posts
- Rich content with tags
- Author attribution
- Server-side rendering for SEO

✅ **API Routes**
- Full CRUD operations for posts
- RESTful endpoints (GET, POST, PUT, DELETE)
- Protected endpoints with authentication

✅ **Modern Architecture**
- Next.js 16 App Router
- Route groups for organized structure
- Server Actions for mutations
- Client-side data fetching with useState/useEffect
- MongoDB with Mongoose

✅ **Custom UI/UX**
- Custom 404 page
- Custom error handling
- Loading states
- Tailwind CSS styling
- Google Fonts (Inter)
- Custom favicon

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Authentication:** Auth.js (NextAuth v5)
- **Database:** MongoDB with Mongoose
- **Styling:** Tailwind CSS
- **TypeScript:** Full type safety
- **Font:** Google Fonts (Inter)

## Project Structure

```
dev-community-platform/
├── app/
│   ├── (auth)/              # Auth route group
│   │   └── signin/          # Sign-in page
│   ├── (main)/              # Main app route group with navbar
│   │   ├── page.tsx         # Home page
│   │   ├── posts/           # Posts section
│   │   │   ├── page.tsx     # Posts list (client-side fetch)
│   │   │   ├── new/         # Create post
│   │   │   └── [id]/        # Post detail & edit
│   │   ├── profile/         # User profile edit
│   │   └── developers/      # Developers directory
│   │       ├── page.tsx     # List all developers
│   │       └── [id]/        # Developer profile page
│   ├── api/
│   │   ├── auth/            # Auth.js handlers
│   │   └── posts/           # Posts API endpoints
│   ├── layout.tsx           # Root layout
│   ├── error.tsx            # Custom error page
│   ├── not-found.tsx        # Custom 404 page
│   └── loading.tsx          # Custom loading state
├── components/              # Reusable components
├── lib/
│   ├── mongodb.ts           # Database connection
│   └── actions/             # Server Actions
├── models/                  # Mongoose models
│   ├── User.ts
│   └── Post.ts
└── public/                  # Static assets
```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB installed locally or MongoDB Atlas account
- GitHub OAuth App credentials

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd dev-community-platform
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory:

```env
MONGODB_URI=mongodb://localhost:27017/dev-community
AUTH_SECRET=your-random-secret-here
AUTH_GITHUB_ID=your-github-oauth-app-id
AUTH_GITHUB_SECRET=your-github-oauth-app-secret
NEXTAUTH_URL=http://localhost:3000
```

#### Getting GitHub OAuth Credentials:

1. Go to GitHub Settings → Developer settings → OAuth Apps
2. Click "New OAuth App"
3. Fill in:
   - Application name: DevCommunity
   - Homepage URL: http://localhost:3000
   - Authorization callback URL: http://localhost:3000/api/auth/callback/github
4. Copy the Client ID and generate a Client Secret
5. Add them to your `.env` file

#### Generating AUTH_SECRET:

```bash
openssl rand -base64 32
```

### 4. Start MongoDB

If using local MongoDB:

```bash
mongod
```

If using MongoDB Atlas, use your connection string in `MONGODB_URI`.

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Key Features Explained

### Route Groups

- `(auth)` - Authentication pages without navbar
- `(main)` - Main application pages with shared navbar

### Server vs Client Components

- **Server Components:** Default for all pages, profile pages, post details
- **Client Components:** Forms, PostsList (uses fetch API with useState/useEffect)

### Authentication Flow

1. User clicks "Sign In"
2. Redirected to GitHub OAuth
3. After approval, user data stored in MongoDB
4. Session created and user redirected to posts page

### Data Fetching

- **Server-side:** Post details, developer profiles, developers list
- **Client-side:** Posts list page (demonstrates useState + useEffect)
- **API Routes:** Full CRUD for posts (`/api/posts`)

### Server Actions

Used for mutations:
- Creating posts (`createPost`)
- Updating posts (`updatePost`)
- Deleting posts (`deletePost`)
- Updating profile (`updateProfile`)

## API Endpoints

### Posts

- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create new post (auth required)
- `GET /api/posts/[id]` - Get single post
- `PUT /api/posts/[id]` - Update post (auth + ownership required)
- `DELETE /api/posts/[id]` - Delete post (auth + ownership required)

## Metadata & SEO

Each page includes custom metadata:
- Title tags
- Description tags
- Dynamic metadata for posts and profiles

## Styling

- Tailwind CSS for all styling
- Custom color scheme (blue primary)
- Responsive design
- Dark mode ready gradient backgrounds

## Custom Pages

- **404 Page:** `/app/not-found.tsx`
- **Error Page:** `/app/error.tsx`
- **Loading Page:** `/app/loading.tsx`

## Deployment

### Build for Production

```bash
npm run build
npm start
```

### Deploy to Vercel

1. Push to GitHub
2. Import repository in Vercel
3. Add environment variables
4. Deploy

## Assignment Requirements Checklist

✅ Next.js 16 App Router
✅ Route groups (auth) and (main)
✅ Shared navbar in main layout
✅ Auth.js with GitHub provider
✅ MongoDB with Mongoose
✅ User and Post models
✅ Profile creation and editing (Server Actions)
✅ Server-rendered profile pages
✅ Posts CRUD with Server Actions
✅ API Route Handlers (GET, POST, PUT, DELETE)
✅ Client-side data fetching (useState + useEffect)
✅ Custom error and 404 pages
✅ Custom loading states
✅ Metadata for all routes
✅ Custom favicon ready
✅ Google Font (Inter)
✅ Tailwind CSS styling
✅ Clean commit history ready
✅ Comprehensive README

## Future Enhancements

- Comments on posts
- Like/reaction system
- Search functionality
- User follow system
- Notifications
- Rich text editor
- Image uploads
