./psql --version

./psql -U postgres

create database todolist;

\connect todolist

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

create TABLE users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    login VARCHAR(16),
    email VARCHAR(32),
    password VARCHAR(255)
);

create TABLE todos (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    value VARCHAR(255),
    "isFinished" BOOLEAN,
    created TIMESTAMP DEFAULT current_timestamp,
    modified TIMESTAMP DEFAULT current_timestamp,
    user_id UUID REFERENCES users(id)
);