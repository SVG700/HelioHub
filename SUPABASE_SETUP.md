# Supabase Integration Setup Guide for Helios AI

## Overview
This guide explains how to integrate Supabase with your Helios AI chat system for database-driven responses and user feedback tracking.

## Step 1: Create a Supabase Project

1. Go to https://app.supabase.com
2. Click "New Project"
3. Enter a project name (e.g., "helios-ai")
4. Choose a strong password
5. Select your region
6. Click "Create new project" and wait for initialization

## Step 2: Get Your Credentials

1. Go to **Settings → API**
2. Copy `Project URL` → This is your `NEXT_PUBLIC_SUPABASE_URL`
3. Copy `anon public key` → This is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. ⚠️ DO NOT use the `service_role key` (it's private!)

## Step 3: Set Environment Variables

1. Open `.env.local` in your project root
2. Replace the placeholders:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_public_anon_key_here
   ```
3. Save the file

## Step 4: Create Database Tables

1. In Supabase, go to **SQL Editor**
2. Click "New Query"
3. Copy the entire SQL from `supabase_schema.sql`
4. Paste it into the SQL editor
5. Click "Run"
6. Wait for confirmation ✓

Tables created:
- `helios_knowledge` - AI knowledge base (question/answer pairs)
- `ai_feedback` - User feedback (👍/👎)
- `ai_logs` - Query logs (optional)

## Step 5: Test the Integration

1. Run your dev server:
   ```bash
   npm run dev
   ```
2. Open http://localhost:3000
3. Go to the AI Assistant page
4. Try asking a question from the knowledge base:
   - "What is solar feasibility?"
   - "How many panels do I need?"
   - "What about battery storage?"
5. The AI should respond with database answers
6. Hover over bot messages and click 👍 or 👎 to provide feedback

## Database Schema

### helios_knowledge
```
- id: UUID (primary key)
- question: TEXT (user's query keywords)
- answer: TEXT (AI's response)
- confidence: TEXT ('High', 'Medium', 'Low')
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

### ai_feedback
```
- id: UUID (primary key)
- question: TEXT (user's query)
- answer: TEXT (AI's response)
- feedback: TEXT ('good' or 'bad')
- timestamp: TIMESTAMP
```

### ai_logs (optional)
```
- id: UUID (primary key)
- user_query: TEXT
- ai_response: TEXT
- timestamp: TIMESTAMP
```

## How It Works

### AI Response Flow
1. User sends a message
2. `generateHeliosReplyWithDB()` fetches from `helios_knowledge` table
3. If keyword match found → return database answer
4. If no match → use local fallback logic
5. Auto-logs query to `ai_logs` table

### Feedback System
1. User sees 👍 👎 buttons on bot messages
2. Clicking button calls `saveFeedback()`
3. Feedback stored in `ai_feedback` table
4. Button changes to show feedback was recorded

### Error Handling
- If Supabase unreachable → shows "Server error, try again later"
- Falls back to local logic if database fails
- All errors logged to browser console

## Troubleshooting

### "Missing Supabase environment variables"
- Check `.env.local` file
- Restart dev server after adding env vars
- Ensure keys are correct (no extra spaces)

### "Error fetching AI response"
- Check Supabase project status
- Verify credentials in Settings → API
- Ensure RLS policies allow public access

### No database responses showing
- Verify `helios_knowledge` table has data
- Check browser console for error logs
- Try sample questions in schema file

### Feedback not saving
- Ensure `ai_feedback` table exists
- Check RLS policy allows INSERT
- See browser console for error details

## Next Steps

1. **Add more knowledge**: Insert more Q&A pairs into `helios_knowledge`
2. **Analyze feedback**: Query `ai_feedback` table to find low-rated responses
3. **Monitor usage**: Check `ai_logs` for popular queries
4. **Improve responses**: Update answers based on feedback patterns

## Security Best Practices

✅ DO:
- Use public `anon key` only (read/insert queries)
- Enable RLS policies
- Keep `.env.local` in `.gitignore`

❌ DON'T:
- Use `service_role key` in frontend code
- Commit env vars to Git
- Allow unlimited database access

## Files Created/Modified

- `src/lib/supabaseClient.ts` - Supabase client initialization
- `src/lib/chat.ts` - AI logic with database integration
- `src/components/helios-chat.tsx` - Chat UI with feedback buttons
- `.env.local` - Environment variables (create manually)
- `supabase_schema.sql` - Database schema (run in Supabase SQL editor)

---

**Support**: Check Supabase docs at https://supabase.com/docs for advanced features like real-time subscriptions and authentication.
