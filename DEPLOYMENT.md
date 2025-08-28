# Deployment Instructions

## Prerequisites
1. **Supabase Project**: Create a project at https://supabase.com
2. **Stripe Account**: Create account at https://stripe.com

## Environment Setup

### 1. Update Environment Variables
Replace the placeholder values in `.env` with your actual keys:

```bash
# Get from your Supabase project settings > API
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-from-supabase

# Get from your Stripe dashboard > Developers > API keys
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_your-live-key-or-pk_test_your-test-key
```

### 2. Supabase Database Setup
Run these SQL commands in your Supabase SQL editor:

```sql
-- Enable RLS
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- Create profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create posts table
CREATE TABLE posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create ads table
CREATE TABLE ads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  budget DECIMAL NOT NULL,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 3. Deploy to Vercel
1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

## Production Checklist
- [ ] Real Supabase URL/keys configured
- [ ] Real Stripe keys configured  
- [ ] Database tables created
- [ ] RLS policies set up
- [ ] Environment variables added to Vercel
- [ ] Domain configured (optional)

Your app is now ready for production!