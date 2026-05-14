-- Grant access to cookbook schema for Supabase roles
grant usage on schema cookbook to anon, authenticated, service_role;
grant all on cookbook.run_logs to anon, authenticated, service_role;
grant all on all sequences in schema cookbook to anon, authenticated, service_role;
