//Connecting to Supabase db via import, supabase link and password
import {createClient} from '@supabase/supabase-js'

const supabaseUrl = 'https://pdyptqjydvluouqcrfts.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBkeXB0cWp5ZHZsdW91cWNyZnRzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU4NjExODgsImV4cCI6MjAzMTQzNzE4OH0.a-68Th6SdWa3agTjuWRil1pp3pjKp70htVEn7_5yc9g';

//Forming an object Supabase for whole project usage
const supabase = createClient(supabaseUrl, supabaseKey)
export default supabase;