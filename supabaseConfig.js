import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

// Asegúrate de reemplazar estos valores con tus credenciales reales de Supabase
const supabaseUrl = "https://uonkcjrokwtgvimjxawm.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvbmtjanJva3d0Z3ZpbWp4YXdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg2ODIyNTgsImV4cCI6MjA1NDI1ODI1OH0.fTH7cyyYYQFi5HQc8y-JXAKSY0PL3P1FKy6LymfeTvU"
export const supabase = createClient(supabaseUrl, supabaseKey)

