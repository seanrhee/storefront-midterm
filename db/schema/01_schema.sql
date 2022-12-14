DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS items CASCADE;
DROP TABLE IF EXISTS transactions CASCADE;
DROP TABLE IF EXISTS saved_items CASCADE;
DROP TABLE IF EXISTS ratings CASCADE;
DROP TABLE IF EXISTS messages CASCADE;
DROP TABLE IF EXISTS message_recipients CASCADE;

-- Example:
-- INSERT INTO users (name, email)
-- VALUES ('Eva Stanley', 'sebastianguerra@ymail.com'),
-- ** Skip id and password for seeds
CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  password VARCHAR(255) DEFAULT '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u',
  phone_number VARCHAR(50) NOT NULL,
  street VARCHAR(50) NOT NULL,
  city VARCHAR(50) NOT NULL,
  province VARCHAR(50) NOT NULL,
  country VARCHAR(50) NOT NULL,
  postal_code VARCHAR(6) NOT NULL
);

CREATE TABLE items (
  id SERIAL PRIMARY KEY NOT NULL,
  owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  price_per_item INTEGER NOT NULL DEFAULT 0,
  description TEXT,
  photo_url VARCHAR(255) NOT NULL,
  sold BOOLEAN NOT NULL DEFAULT FALSE,
  condition VARCHAR(50) NOT NULL,
  category TEXT NOT NULL
);

CREATE TABLE transactions (
  id SERIAL PRIMARY KEY NOT NULL,
  seller_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  buyer_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  item_id INTEGER REFERENCES items(id) ON DELETE CASCADE,
  purchase_date DATE NOT NULL
);

CREATE TABLE saved_items (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  item_id INTEGER REFERENCES items(id) ON DELETE CASCADE
);

CREATE TABLE ratings (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  transaction_id INTEGER REFERENCES transactions(id) ON DELETE CASCADE,
  rating SMALLINT
);

CREATE TABLE messages (
  id SERIAL PRIMARY KEY NOT NULL,
  creator_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  recipient_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  created_at TEXT
);
