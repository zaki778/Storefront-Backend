# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index : GET '/products/getAll'
- Show : GET '/products/getOne/:id' where id is the id of the product
- Create [token required] POST '/products/createProduct' you need to pass a json object {name : product_name, price : product_price}


#### Users
- Index [token required] GET '/users/getAllUsers'
- Show [token required] GET '/users/getOne/:id' Where id is the id of the user
- Create N[token required] POST '/users/createUser' you need to pass a json object {firstName : , lastName : , password : }

#### Orders
- Current Order by user (args: user id)[token required] 
Goes through cycle of steps where:
1 - order should be started first : POST '/orders/createOrder' JSON OBJECT{ id : user_id} //this create a new order in which new products can be assigned to //makes the status of the order active
2 - start adding products : POST '/orders/addToCart' JSON OBJECT {id : product_id, quantity : }
3- finish the order : GET '/orders/finishedOrders' //Simply make the status of the order finished


## Data Shapes
#### Product
-  id :  INTEGER PK
- product_name : VARCHAR(20)
- price : FLOAT


#### User
- id : INTEGER PK
- first_name : VARCHAR(20)
- last_name : VARCHAR(20)
- user_password : VARCHAR

#### Orders
- id : INTEGER PK
- user_id : INTEGER FK References users
- status of order : STATUS(ENUM)

#### order_product
- id :INTEGER PK
- order_id : INTEGER FK References orders
- product_id : INTEGER FK References products
- quantity : INTEGER
