# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run lint` - Run ESLint checks
- `npm run start` - Start production server

## Architecture Overview

This is a **Next.js 15+ App Router application** with Supabase authentication and shadcn/ui components.

### Key Technologies
- **Next.js App Router** (not Pages Router)
- **Supabase Auth** with cookie-based sessions
- **shadcn/ui** components with Tailwind CSS
- **TypeScript** with strict configuration
- **Radix UI** primitives for accessibility

### Authentication System

The app uses Supabase for authentication with three client configurations:
- `/lib/supabase/client.ts` - Browser client
- `/lib/supabase/server.ts` - Server client with cookies  
- `/lib/supabase/middleware.ts` - Session management in middleware

**Protected routes** are handled by middleware that redirects unauthenticated users to `/auth/login`. The `/protected/*` routes require authentication.

### Route Structure

- **`/(main)`** - Main application with sidebar layout (dashboard)
- **`/auth/*`** - Authentication pages (login, signup, password reset)
- **`/protected/*`** - Protected area requiring authentication

### UI Component System

Uses shadcn/ui with "new-york" style variant. Components are configured in `components.json` with:
- CSS variables for theming
- React Server Components enabled
- Lucide React for icons

**Path alias**: `@/*` maps to project root.

### Current Development Focus

The codebase shows active development of a dashboard interface with:
- Collapsible sidebar navigation (`components/app-sidebar.tsx`)
- Breadcrumb navigation system
- Mobile-responsive design patterns

### Environment Requirements

Requires Supabase environment variables for authentication to function properly.