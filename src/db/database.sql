./psql --version

./psql -U postgres

create database todolist;

\connect todolist

create TABLE todos (
    id SERIAL PRIMARY KEY,
    value VARCHAR(255),
    "isFinished" BOOLEAN
);