# Overview

This is a modern full-stack web application built with React, Express, and TypeScript. The project uses a monorepo structure with separate client and server directories, featuring a clean, minimal design system based on shadcn/ui components and Tailwind CSS. The application is currently a starter template with a simple homepage and routing setup, designed to be extended with custom features.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

**Framework & Build System**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server for fast HMR and optimized production builds
- Client-side routing using Wouter (lightweight alternative to React Router)

**UI Component System**
- shadcn/ui component library built on Radix UI primitives
- Tailwind CSS for utility-first styling with custom design tokens
- Design philosophy: "New York" style variant with neutral color scheme
- Components are copied into the project (not imported from npm) for full customization

**State Management**
- TanStack Query (React Query) for server state management and data fetching
- Custom query client configuration with disabled auto-refetch for predictable behavior
- Toast notifications for user feedback via Radix UI Toast primitives

**Styling System**
- CSS variables for theming (light/dark mode support built-in)
- Custom utility classes for elevation effects (hover-elevate, active-elevate)
- Typography: Inter font family from Google Fonts
- Responsive design with mobile-first breakpoints

## Backend Architecture

**Server Framework**
- Express.js with TypeScript for type-safe API development
- ESM module system throughout the project
- Development mode uses tsx for hot reloading

**Request Handling**
- JSON body parsing with raw body preservation (useful for webhook verification)
- URL-encoded form data support
- Middleware for request logging with timing and response capture
- API routes prefixed with `/api` for clear separation from frontend routes

**Development Setup**
- Vite middleware integration in development for seamless HMR
- Separate build process for client (Vite) and server (esbuild)
- Production server serves static files from dist/public

**Storage Layer**
- Abstract IStorage interface defined for future implementation
- MemStorage class as placeholder for in-memory storage
- Architecture prepared for easy migration to persistent storage

## Data Layer

**ORM & Database**
- Drizzle ORM for type-safe database queries
- PostgreSQL dialect configured (via @neondatabase/serverless driver)
- Schema definitions in shared/schema.ts for use across client and server
- Drizzle Kit for migrations and schema management

**Database Connection**
- Neon serverless PostgreSQL driver for edge-compatible database access
- Environment variable based configuration (DATABASE_URL)
- Migration files stored in ./migrations directory

**Validation**
- Zod integration via drizzle-zod for runtime schema validation
- React Hook Form with @hookform/resolvers for form validation

## External Dependencies

**Third-Party UI Libraries**
- Radix UI: Comprehensive set of unstyled, accessible component primitives (accordion, dialog, dropdown, popover, tabs, toast, etc.)
- Lucide React: Icon library for consistent iconography
- cmdk: Command palette component
- embla-carousel-react: Carousel/slider functionality
- recharts: Charting library for data visualization
- react-day-picker: Calendar and date picker components
- vaul: Drawer component for mobile interfaces
- input-otp: OTP input component

**Styling & Utilities**
- Tailwind CSS: Utility-first CSS framework
- tailwindcss-animate: Animation utilities for Tailwind
- class-variance-authority: Type-safe component variants
- clsx & tailwind-merge: Utility for conditional className composition

**Database & Backend**
- @neondatabase/serverless: Serverless PostgreSQL client
- drizzle-orm: TypeScript ORM
- drizzle-kit: Schema management and migrations
- connect-pg-simple: PostgreSQL session store for Express

**Development Tools**
- Vite: Frontend build tool and dev server
- esbuild: Fast JavaScript/TypeScript bundler for server code
- tsx: TypeScript execution for development
- @replit/vite-plugin-*: Replit-specific development tools (runtime error overlay, cartographer, dev banner)

**Utility Libraries**
- date-fns: Date manipulation and formatting
- nanoid: Unique ID generation

**Type Safety**
- TypeScript configured with strict mode
- Path aliases for clean imports (@/, @shared/, @assets/)
- Shared types between client and server via shared directory