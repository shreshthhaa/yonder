// Yonder settings.
// Leave both values empty to run in "demo on this device" mode (no login server, no live AI).
// Fill them in from Supabase → Project Settings → API to switch on real accounts, shared groups and live AI.
// The anon key is meant to be public: the database rules (RLS) are what protect the data.
window.YONDER_CONFIG = {
  supabaseUrl: 'https://ricxyozuvfaqepnkjdzh.supabase.co',
  supabaseAnonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpY3h5b3p1dmZhcWVwbmtqZHpoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTUxOTc0NDgsImV4cCI6MjExMDc3MzQ0OH0.7ny8bcSrXfIR_4hdg30pVIuDAqMN1FaJOUEtOxqgQ94',
  aiFunction: 'super-worker',   // name of the AI server function in Supabase
};
