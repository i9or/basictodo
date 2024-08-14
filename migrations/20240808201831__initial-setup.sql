-- Create users table
create table if not exists users
(
  id         integer primary key,
  username   text not null unique,
  email      text not null unique,
  password   text not null,
  first_name text not null,
  last_name  text not null
);
