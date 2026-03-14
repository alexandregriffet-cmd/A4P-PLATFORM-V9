
create table clubs (
  id text primary key,
  name text not null,
  sport text,
  subscription_plan text not null default 'starter',
  created_at timestamptz not null default now()
);

create table coaches (
  id text primary key,
  club_id text not null references clubs(id) on delete cascade,
  name text not null,
  email text not null unique,
  password_hash text,
  role text not null default 'coach',
  created_at timestamptz not null default now()
);

create table teams (
  id text primary key,
  club_id text not null references clubs(id) on delete cascade,
  name text not null,
  category text,
  players_count integer default 0,
  created_at timestamptz not null default now()
);

create table players (
  id text primary key,
  team_id text not null references teams(id) on delete cascade,
  first_name text not null,
  last_name text not null,
  position text,
  created_at timestamptz not null default now()
);

create table tests (
  id text primary key,
  player_id text not null references players(id) on delete cascade,
  team_id text not null references teams(id) on delete cascade,
  module text not null,
  score_global integer not null,
  dimensions jsonb not null,
  profile_code text,
  tested_at date not null default current_date
);

create table subscriptions (
  id text primary key,
  club_id text not null references clubs(id) on delete cascade,
  stripe_customer_id text,
  stripe_subscription_id text,
  status text not null default 'trialing',
  current_period_end timestamptz
);
