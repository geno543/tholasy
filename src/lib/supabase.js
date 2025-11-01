import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://cgpnddvqsoonpnqkquhe.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNncG5kZHZxc29vbnBucWtxdWhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIwMTk0NDMsImV4cCI6MjA3NzU5NTQ0M30.qyvDw-YB_Zc4U4V4sOoNDHejISWYdPSUn2-zO6X-L24'

export const supabase = createClient(supabaseUrl, supabaseKey)
