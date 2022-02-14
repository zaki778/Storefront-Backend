/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS users(id SERIAL PRIMARY KEY, first_name VARCHAR(20), last_name VARCHAR(20), user_password VARCHAR) ;

CREATE TABLE IF NOT EXISTS products(id SERIAL PRIMARY KEY, product_name VARCHAR(20), price FLOAT);

CREATE TYPE status AS ENUM ('active', 'finished');
CREATE TABLE IF NOT EXISTS orders(id SERIAL PRIMARY KEY, current_status STATUS, user_id INTEGER);
ALTER TABLE orders ADD FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE IF NOT EXISTS order_product(id SERIAL PRIMARY KEY, order_id INTEGER, product_id INTEGER, quantity INTEGER);
ALTER TABLE order_product ADD FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE order_product ADD FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE ON UPDATE CASCADE;


