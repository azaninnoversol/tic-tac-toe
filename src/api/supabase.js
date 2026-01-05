import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://qbcklsbwirnjdyvgenkr.supabase.co';
const SUPABASE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFiY2tsc2J3aXJuamR5dmdlbmtyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc2Mjc4MzAsImV4cCI6MjA4MzIwMzgzMH0.57xen6CozKTmt8S_UPwsA8Pbg5BJHbErYTw4T0qNQto';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  realtime: { enabled: false },
});
