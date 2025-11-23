# Overview

This is a high-converting landing page and lead management system for **Rute Reach AK**, an Anchorage, Alaska direct mail marketing service. The application is built with React, Express, and TypeScript, featuring a clean, professional design system based on shadcn/ui components and Tailwind CSS.

## Business Information

**Business Name:** Rute Reach AK  
**Location:** Anchorage, Alaska  
**Services:** Direct mail marketing, shared mail campaigns, landing page design, print services  
**Logo:** Mail and Map Connection Logo (mailbox + location pin with circuit lines)

## Campaign Details

- **Shared Mailer Campaign:** Reach 5,000+ customers for $600 (vs. $4,000 solo)
- **Mail Date:** January 5, 2026
- **Design Finalization Deadline:** December 26, 2025
- **Payment Terms:** 50% deposit to start, 50% due before launch (for landing pages)

## Website Structure

5-page website with full backend:
1. **Home** - Hero with countdown timer to Dec 26 deadline
2. **Services** - One active service (Shared Direct Mail Campaign) + Four waitlist services (Solo Mailer, Landing Pages, Email Marketing, Print Materials)
3. **About** - Company information and mission
4. **Blog** - Marketing insights and tips
5. **Contact** - Lead capture form

## Admin System

- Secure admin dashboard at `/admin`
- Session-based authentication with PostgreSQL storage
- Six management tabs: Leads, Newsletter Subscribers, Quotes, Consultations, Solo Mailer Waitlist, Landing Pages Waitlist
- Additional waitlist tabs: Email Marketing Waitlist, Print Materials Waitlist (previously implemented)
- Email notifications via Resend integration for all form submissions

## Recent Changes (November 2025)

**Service Strategy Pivot**: Converted Solo Direct Mail and Landing Pages from active services to waitlist services to test market demand before investing in full development.

**Implementation**:
- Created `solo_mailer_waitlist` and `landing_pages_waitlist` database tables
- Built waitlist card components with checkbox interest selection (6 options each)
- Updated Services page: Removed Solo/Landing from hero grid and detailed sections, moved to "Coming Soon" section
- Expanded admin dashboard to 6 tabs with responsive layout (grid-cols-2 md:grid-cols-3 lg:grid-cols-6)
- Email notifications configured for new waitlist types
- Services page now features only Shared Direct Mail Campaign as active service
- Added semi-transparent logo watermark (6% opacity) to Shared Mailer Section background for visual depth

**FAQ Integration** (November 23, 2025):

*Clean FAQ Consolidation - Version 3* (November 23, 2025):
- **Removed embedded FAQs**: Eliminated redundant "Common Questions" section from Shared Direct Mail section to prevent visual clutter
- **Dual Pricing Cards**: Added side-by-side pricing display for transparency
  - Single Campaign: $600 one-time
  - 3-Month Package: $1,500 ($500/month) with "Save $300" badge
- **Main Services Page FAQ**: Single "Frequently Asked Questions" section with 10 questions and progressive disclosure
  - Shows 4 questions initially, "Show More Questions" button reveals 4 more at a time
  - Questions: What is a shared mailer campaign?, What's included in $600?, How does the shared mailer process work?, What do I need to provide?, Why do the 3-month package?, How do you guarantee no competitors?, What kind of results should I expect?, How do I track results?, When is the next campaign?, What neighborhoods do you target?
  - Includes "Have more questions? Contact us" link to /contact at the bottom
- **Contact Page FAQ**: 7 trust-building and objection-handling questions
  - Why should I trust you?
  - What if I don't get results?
  - How do I get started?
  - What if I don't like my design?
  - Can I cancel after 3 months?
  - What if my industry is already booked?
  - How long until I see results?
- **Page Flow**: Services page now follows: Shared Mailer Section → FAQ Section (progressive disclosure) → Coming Soon Services
- Contact page includes prominent phone number display: (907) 947-4624 with business hours
- All FAQ elements include proper data-testid attributes for testing compliance

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