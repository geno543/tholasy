# Supabase Setup Guide for THOLASY

## Prerequisites
✅ Supabase client library installed (`@supabase/supabase-js`)
✅ Environment variables configured in `.env`
✅ Code updated to use Supabase

## Step 1: Create Database Table

1. Go to your Supabase Dashboard: https://cgpnddvqsoonpnqkquhe.supabase.co
2. Navigate to **Table Editor** in the left sidebar
3. Click **New Table**
4. Create a table named `enrollments` with the following columns:

### Table Schema: `enrollments`

| Column Name     | Type        | Default Value       | Nullable | Notes                    |
|-----------------|-------------|---------------------|----------|--------------------------|
| `id`            | uuid        | gen_random_uuid()   | No       | Primary Key              |
| `first_name`    | text        | -                   | No       | Student's first name     |
| `last_name`     | text        | -                   | No       | Student's last name      |
| `email`         | text        | -                   | No       | Student's email          |
| `phone`         | text        | -                   | No       | Student's phone number   |
| `course`        | text        | -                   | No       | Course ID (blender/solidworks/bundle) |
| `course_name`   | text        | -                   | No       | Full course name         |
| `payment_method`| text        | -                   | No       | Payment method chosen    |
| `wallet_number` | text        | -                   | Yes      | Wallet number if applicable |
| `promo_code`    | text        | -                   | Yes      | Promo code used          |
| `price`         | numeric     | -                   | No       | Course price (0 if free) |
| `status`        | text        | 'pending'           | No       | pending/approved/rejected|
| `submitted_at`  | timestamptz | now()               | No       | Submission timestamp     |
| `created_at`    | timestamptz | now()               | No       | Record creation time     |

### SQL Query (Copy & Paste)

You can also create the table by running this SQL in the **SQL Editor**:

```sql
CREATE TABLE enrollments (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  course text NOT NULL,
  course_name text NOT NULL,
  payment_method text NOT NULL,
  wallet_number text,
  promo_code text,
  price numeric NOT NULL,
  status text DEFAULT 'pending' NOT NULL,
  submitted_at timestamptz DEFAULT now() NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL
);
```

## Step 2: Enable Row Level Security (RLS)

For security, you should enable Row Level Security:

1. Go to **Authentication** → **Policies**
2. Select the `enrollments` table
3. Enable RLS
4. Add the following policies:

### Policy 1: Allow Anonymous Insert (for enrollment form)
```sql
CREATE POLICY "Allow anonymous insert" ON enrollments
FOR INSERT
TO anon
WITH CHECK (true);
```

### Policy 2: Allow Public Read (for checking enrollment status)
```sql
CREATE POLICY "Allow public read" ON enrollments
FOR SELECT
TO anon
USING (true);
```

### Policy 3: Allow Public Update (for admin approval)
```sql
CREATE POLICY "Allow public update" ON enrollments
FOR UPDATE
TO anon
USING (true)
WITH CHECK (true);
```

### Policy 4: Allow Public Delete (for admin)
```sql
CREATE POLICY "Allow public delete" ON enrollments
FOR DELETE
TO anon
USING (true);
```

**Note:** These policies are permissive for quick setup. In production, you should implement proper authentication and restrict policies based on user roles.

## Step 3: Test the Integration

1. **Start your development server:**
   ```bash
   npm run dev
   ```

2. **Test enrollment submission:**
   - Go to the Enrollment page
   - Fill out the form
   - Submit it
   - Check the browser console for success messages

3. **Verify in Supabase:**
   - Go to Table Editor → `enrollments`
   - You should see your test enrollment

4. **Test Admin Dashboard:**
   - Go to `/admin`
   - Login with password: `elkamarin`
   - You should see enrollments from Supabase
   - Test approve/reject/delete functions

5. **Test Course Access:**
   - Go to a course viewer page
   - Enter the email you used for enrollment
   - If status is "approved", you should have access
   - If "pending" or "rejected", access should be restricted

## Step 4: Environment Variables

Make sure your `.env` file contains:

```env
VITE_SUPABASE_URL=https://cgpnddvqsoonpnqkquhe.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNncG5kZHZxc29vbnBucWtxdWhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc5MjM2NjksImV4cCI6MjA1MzQ5OTY2OX0.7Uqh4p2P8R-3xaBKlbJiVICXBXq3L3iZo8v-e4YG_8M
```

**Important:** Add `.env` to your `.gitignore` to avoid committing sensitive credentials!

## Step 5: Add .env to .gitignore

Create or update `.gitignore`:

```
# dependencies
node_modules

# production
dist

# environment variables
.env
.env.local
.env.production

# logs
*.log
```

## Migration Status

✅ **Completed:**
- Supabase client configuration
- Enrollment form submission to Supabase
- Admin dashboard loading from Supabase
- Admin approve/reject/delete operations
- Course viewer enrollment check from Supabase
- Backward compatibility with localStorage as fallback

✅ **Features:**
- All new enrollments saved to Supabase
- Admin dashboard fetches real-time data from database
- Course access validated against Supabase records
- localStorage kept as backup for offline functionality

## Troubleshooting

### Issue: "relation 'enrollments' does not exist"
**Solution:** Make sure you created the `enrollments` table in Supabase (Step 1)

### Issue: "new row violates row-level security policy"
**Solution:** Enable RLS and add policies (Step 2)

### Issue: Enrollments not appearing in admin panel
**Solution:** 
1. Check browser console for errors
2. Verify the table exists in Supabase
3. Confirm RLS policies allow SELECT for anon users

### Issue: "Invalid API key"
**Solution:** 
1. Verify your `.env` file has the correct credentials
2. Restart the dev server after changing `.env`
3. Check that variables start with `VITE_` prefix

## Next Steps

1. **Create the table** in Supabase Dashboard
2. **Enable RLS** with the provided policies
3. **Test enrollment flow** end-to-end
4. **Deploy** your changes

Once the table is created and RLS is configured, everything should work seamlessly! 🚀
