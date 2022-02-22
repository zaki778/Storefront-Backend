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

#### NOTE THAT:
#### Admin Token : 

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo0LCJmaXJzdF9uYW1lIjoiYWRtaW4iLCJsYXN0X25hbWUiOiJhZG1pbiIsInVzZXJfcGFzc3dvcmQiOiIkMmIkMTAkLjZpNnFqaUNTNTByTHJOVjRlUzNhdWlvZlA1WG5JcnlHM2dxOEU0b3p0cnNCV0kxQ3dxWDYifSwiaWF0IjoxNjQ0ODY5MTA0fQ.B-TlOwi1uU8nTgCMpk3ew8Rnh7_wakNuS63lwP05FD4

#### The user who created the order himself is the only one possible to add to the cart.

For orders Authentication : 
- Only the user able to acess orders end points is the user that its token sent with the link.
- Only admin user should deal with users end point (show, index) and only the admin should able to create new product.
- Any user can access (index, show) for products endpoints.



