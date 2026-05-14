-- Shared run log: all cookbook apps write here
create schema if not exists cookbook;

create table cookbook.run_logs (
  id          uuid primary key default gen_random_uuid(),
  app         text not null,
  input       jsonb,
  output      jsonb,
  created_at  timestamptz default now()
);

-- Index for querying by app
create index run_logs_app_idx on cookbook.run_logs (app);
create index run_logs_created_at_idx on cookbook.run_logs (created_at desc);

comment on table cookbook.run_logs is 'Audit log of all agent runs across cookbook apps.';
