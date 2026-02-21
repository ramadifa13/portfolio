# Deployment & Setup Notes

## Prerequisites

- [Supabase](https://supabase.com) project
- [Vercel](https://vercel.com) account

## Supabase Setup

1. **Database Schema**: Run the SQL provided in `supabase/schema.sql` in your Supabase SQL Editor.
2. **Storage**: Create a public bucket named `images` in Supabase Storage. Set appropriate bucket policies for public read and authenticated write.
3. **Authentication**: Enable Email/Password auth in Supabase dashboard.

## Environment Variables

Add the following to your `.env.local` and Vercel project settings:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Deployment

1. Push your code to a GitHub repository.
2. Connect the repository to Vercel.
3. Vercel will automatically detect Next.js and deploy.

## Admin User Creation

Since there is no public sign-up, you should create the first admin user manually in the Supabase Auth dashboard or via a script.
Make sure to also create a corresponding entry in the `profiles` table with the same UUID.
