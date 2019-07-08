/* CREATED TABLES
CREATE TABLE region (
   region_id SERIAL PRIMARY KEY,
   region_name VARCHAR(255)
);


CREATE TABLE users (
   user_id    SERIAL      PRIMARY KEY,
   first_name VARCHAR(80)  NOT NULL,
   last_name  VARCHAR(80)  NOT NULL,
   email      VARCHAR(250) NOT NULL,
   hash_pass  VARCHAR(250) NOT NULL,
   region  VARCHAR(100) NOT NULL 
);

CREATE TABLE topic (
   topic_id    SERIAL PRIMARY KEY,
   creator_id  INTEGER REFERENCES users(user_id),
   topic_name  TEXT NOT NULL,
   description TEXT NOT NULL,
   region      VARCHAR(100) NOT NULL
);

CREATE TABLE comment (
   comment_id SERIAL PRIMARY KEY,
   creator_id INTEGER REFERENCES users(user_id),
   topic_id   INTEGER REFERENCES topic(topic_id),
   content    TEXT NOT NULL
);

CREATE TABLE reply (
   reply_id SERIAL PRIMARY KEY,
   creator_id INTEGER REFERENCES users(user_id),
   reply_to_id INTEGER REFERENCES users(user_id),
   content    TEXT NOT NULL
);
*/
