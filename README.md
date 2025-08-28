# Social Media Advertising Platform

A modern Facebook-style social media platform with integrated advertising capabilities, built with React, TypeScript, and Supabase.

## Features

🚀 **Core Social Features**
- User authentication and profiles
- News feed with infinite scroll
- Post creation with media support
- Real-time messaging system
- Groups and communities

💰 **Advanced Advertising System**
- Campaign creation and management
- Real-time analytics dashboard
- Payment processing with Stripe
- 50% off first ad (up to $500 discount)
- Performance tracking and reporting

🎨 **Modern UI/UX**
- Responsive design with Tailwind CSS
- Dark/light theme support
- Smooth animations and transitions
- Mobile-first approach

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Payments**: Stripe integration
- **UI Components**: Radix UI, shadcn/ui
- **State Management**: React Context + Hooks
- **Deployment**: Vercel

## Quick Start

1. **Clone and install**
   ```bash
   git clone <your-repo>
   cd social-media-platform
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Update .env with your actual Supabase and Stripe keys
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete deployment instructions.

## Environment Variables

```bash
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

## Project Structure

```
src/
├── components/          # React components
├── contexts/           # React contexts (Auth, App state)
├── hooks/             # Custom React hooks
├── lib/               # Utilities (Supabase, Stripe config)
├── pages/             # Page components
└── main.tsx           # App entry point
```

## Key Components

- **AppLayout**: Main application layout
- **EnhancedAdManager**: Advanced advertising campaign management
- **AdvertisingAnalytics**: Real-time performance metrics
- **StripePayment**: Secure payment processing
- **VirtualizedNewsFeed**: Optimized infinite scroll feed

## License

MIT License - feel free to use this project for learning or commercial purposes.