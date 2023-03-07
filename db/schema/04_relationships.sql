DROP TABLE IF EXISTS relationships;

CREATE TABLE relationships(
  id SERIAL PRIMARY KEY NOT NULL,
  current_pet INTEGER REFERENCES pets(id) ON DELETE CASCADE,
  other_pet INTEGER REFERENCES pets(id) ON DELETE CASCADE,
  interact BOOLEAN DEFAULT TRUE
);
