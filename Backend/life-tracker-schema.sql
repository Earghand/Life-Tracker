CREATE TABLE users (
    id          SERIAL PRIMARY KEY,
    password    TEXT NOT NULL,
    email       TEXT NOT NULL UNIQUE CHECK (POSITION('@' in email) > 1),
    rsvp_status BOOLEAN NOT NULL,
    created_at  TIMESTAMP NOT NULL DEFAULT NOW()
);