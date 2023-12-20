./psql --version

./psql -U postgres

create database todolist;

\connect todolist

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

create TABLE todos (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    value VARCHAR(255),
    "isFinished" BOOLEAN
);