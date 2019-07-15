--  CREATE TABLE region (
--     region_id SERIAL PRIMARY KEY,
--     region_name VARCHAR(255) UNIQUE
--  );


--  CREATE TABLE users (
--     user_id    SERIAL      PRIMARY KEY,
--     first_name VARCHAR(80)  NOT NULL,
--     last_name  VARCHAR(80)  NOT NULL,
--     email      VARCHAR(250) NOT NULL UNIQUE,
--     username   VARCHAR(250) NOT NULL UNIQUE,
--     hash_pass  VARCHAR(250) NOT NULL,
--     region_one     INTEGER REFERENCES region(region_id),
--     region_two     INTEGER REFERENCES region(region_id),
--     region_three     INTEGER REFERENCES region(region_id)
--  );

--  CREATE TABLE topic (
--     topic_id    SERIAL PRIMARY KEY,
--     creator_id  INTEGER REFERENCES users(user_id),
--     topic_name  TEXT NOT NULL,
--     description TEXT NOT NULL,
--     region      INTEGER REFERENCES region(region_id)
--  );

--  CREATE TABLE comment (
--     comment_id SERIAL PRIMARY KEY,
--     creator_id INTEGER REFERENCES users(user_id),
--     topic_id   INTEGER REFERENCES topic(topic_id),
--     content    TEXT NOT NULL
--  );

--  CREATE TABLE reply (
--     reply_id SERIAL PRIMARY KEY,
--     creator_id INTEGER REFERENCES users(user_id),
--     reply_to_id INTEGER REFERENCES users(user_id),
--     content    TEXT NOT NULL
--  );
