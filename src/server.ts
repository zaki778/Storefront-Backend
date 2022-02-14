import express, { Request, Response } from 'express'
import ordersRoutes from './Handlers/orders'
import usersRoutes from './Handlers/users'
import bodyParser from 'body-parser'
import cors from 'cors'
import productsRoutes from './Handlers/products'


const app: express.Application = express();
const address: string = "0.0.0.0:3000";


app.use(bodyParser.json())
app.use(cors());



app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})

ordersRoutes(app);
usersRoutes(app);
productsRoutes(app);

export default app;




