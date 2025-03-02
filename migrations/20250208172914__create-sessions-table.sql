-- Create sessions table
create table if not exists sessions
(
  id         text    not null primary key,
  user_id    integer not null references users (id),
  expires_at integer not null
)
