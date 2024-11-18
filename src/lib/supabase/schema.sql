-- Enable Row Level Security
alter table public.admin_users enable row level security;

-- Create admin_users table
create table public.admin_users (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  email text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id),
  unique(email)
);

-- Create policies
create policy "Admin users can view admin_users"
  on admin_users for select
  using (auth.uid() in (
    select user_id from admin_users
  ));

create policy "Only super admins can insert admin_users"
  on admin_users for insert
  with check (auth.uid() in (
    select user_id from admin_users where is_super_admin = true
  ));