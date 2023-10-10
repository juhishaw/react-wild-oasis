import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://iagzgcaeskknbnbfrajk.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlhZ3pnY2Flc2trbmJuYmZyYWprIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY5MjUyODUsImV4cCI6MjAxMjUwMTI4NX0.xs1UuyxkaCSd9R8sX-eD9zS5igY-frPO6hkZiZBqSL0";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
