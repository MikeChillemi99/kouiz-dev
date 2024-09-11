import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
    "https://kxqerpgsynplhhhbtscs.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt4cWVycGdzeW5wbGhoaGJ0c2NzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYwNDE4NjYsImV4cCI6MjA0MTYxNzg2Nn0.6L3ru-hD84x0xMnm_kYhgSDOM7ecHPMcbKHhyknY8Kw"
)