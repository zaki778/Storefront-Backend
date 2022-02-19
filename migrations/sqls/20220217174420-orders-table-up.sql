/* Replace with your SQL commands */
CREATE TYPE status AS ENUM ('active', 'finished');
CREATE TABLE IF NOT EXISTS orders(id SERIAL PRIMARY KEY, current_status STATUS, user_id INTEGER);
ALTER TABLE orders ADD FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE;
