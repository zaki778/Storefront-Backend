import Client from "../database";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import {Product} from './products'


dotenv.config();

export type Order = {
    id? : number,
    user_id? : number,
    current_status? : string
}
export type OrderProduct = {
    id? : number,
    order_id? : number,
    product_id? : number,
    quantity?: number
}

export class OrderStore{

    async create (userId : number) : Promise<Order>{
        try {
            const dbConnection = await Client.connect();

            const sqlQueryI = "SELECT * FROM users WHERE id =($1)";
            const queryResultI = await dbConnection.query(sqlQueryI, [userId]);

            const sqlQueryII = 'SELECT * FROM orders WHERE user_id = ($1) AND current_status = ($2)'
            const queryResultII= await dbConnection.query(sqlQueryII, [userId, 'active']);
            console.log("queryII: " + queryResultII.rows[0]);
            if(queryResultII.rows[0]) return {user_id : -2};
            if(queryResultI.rows[0] ){    
            const sqlQuery = "INSERT INTO orders (user_id, current_status) VALUES ($1, $2) RETURNING *";
            
            const queryResult = await dbConnection.query(sqlQuery, [userId, 'active']);

            return queryResult.rows[0];
            }
            

            return {user_id : -1};

        } catch (error) {
            throw new Error (`in the catch and the error is : ${error}`);
        }
    }

    async addProduct (pid : number, quantity : number) : Promise<OrderProduct> {
        try {
            const dbConnection = await Client.connect();

            const sqlQueryI = "SELECT id FROM orders WHERE current_status = 'active'";
            const queryResultI = await dbConnection.query(sqlQueryI);

            const sqlQueryIII = "SELECT * FROM products WHERE id = ($1)";
            const queryResultIII = await dbConnection.query(sqlQueryIII, [pid]);

            
            
            if(queryResultI.rows[0] && queryResultIII.rows[0]){
                
            
            const activeOrderId = queryResultI.rows[0].id;
            const sqlQueryII = "INSERT INTO order_product (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *";
            const queryResultII = await dbConnection.query(sqlQueryII, [activeOrderId, pid, quantity]);

            return queryResultII.rows[0];
          
            }
            if(!queryResultIII.rows[0]) return {quantity : -1};

           
                return {quantity : 0};
             
          
            
                
        } catch (error) {
            throw new Error (`in the catch and the error is : ${error}`);
        }
        

    }
    

    async end () : Promise<Order> {
        try {
            const dbConnection = await Client.connect();
            const sqlQuery = "UPDATE orders SET current_status = 'finished' WHERE id IN (SELECT id FROM orders WHERE current_status = 'active') RETURNING *";

            // const sqlQueryI = "SELECT id FROM orders WHERE current_status = 'active'";
            // const queryResultI = await dbConnection.query(sqlQueryI);
            // const activeOrderId = queryResultI.rows[0].id;

            // const queryResult = await dbConnection.query(sqlQuery, [activeOrderId]);

            const queryResult = await dbConnection.query(sqlQuery);
                
            return queryResult.rows[0];
                
        } catch (error) {
            throw new Error (`in the catch and the error is : ${error}`);
        }
        

    }

    
    

    
}