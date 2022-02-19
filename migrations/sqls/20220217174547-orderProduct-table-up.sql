/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS order_product(id SERIAL PRIMARY KEY, order_id INTEGER, product_id INTEGER, quantity INTEGER);
ALTER TABLE order_product ADD FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE order_product ADD FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE ON UPDATE CASCADE;
