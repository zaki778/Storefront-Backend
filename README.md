"# Storefront-Backend" 

#### how to setup and connect to the database:

1 - Build on your local Machine a database called shop
using : CREATE DATABASE shop;

2 - Build on your local Machine a database called shop_test
using : CREATE DATABASE shop_test;

3 - Run migrate-up

Now you should have all the tables within the shop database.



#### what ports the backend and database are running on:
Server.js( enty point ) : 3000
Postgres DB : 5432


#### package installation instructions: run npm install

#### Environment Variables
POSTGRES_HOST = localhost
POSTGRES_DB = shop
POSTGRES_DB_TEST = shop_test
POSTGRES_USER = postgres
POSTGRES_PASSWORD = 0000
ENV = dev
SALT_ROUNDS = 10
pepper = 1111
TOKEN_SECRET='3322840A!'




