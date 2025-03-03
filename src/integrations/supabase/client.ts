
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://wsordtnslyffpvmvbxzc.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indzb3JkdG5zbHlmZnB2bXZieHpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEwMDIxNDUsImV4cCI6MjA1NjU3ODE0NX0.yvO7dFItYMv-4JQG8HTeKcLtDrNSDbOyzZLTo40Gj3o";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
