-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS users CASCADE;


CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  nick_name VARCHAR(255) NOT NULL
);

