import Client from "../database";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();


const {saltRounds, pepper} = process.env;

export type Product = {
    id? : number,
    product_name? : string,
    price? : number
}

export class ProductStore {


    async index() : Promise<Product[]>{
        try {
            const dbConnection = await Client.connect();
            const sqlQuery = 'SELECT * FROM products';
            const queryResult = await dbConnection.query(sqlQuery);
            dbConnection.release;
    
            return queryResult.rows;
        } catch (error) {
            throw new Error(`in the catch and the error is : ${error}`);
        }
    }

    async show(id : number) : Promise<Product>{
        try {
            const dbConnection = await Client.connect();
            const sqlQuery = 'SELECT * FROM products WHERE id = ($1)';
            const queryResult = await dbConnection.query(sqlQuery, [id]);
            dbConnection.release;
    
            return queryResult.rows[0];
        } catch (error) {
            throw new Error(`in the catch and the error is : ${error}`);
        }
    }

    async create (product : Product) : Promise<Product>{
        try {
            const dbConnection = await Client.connect();

            const sqlQueryI = "SELECT * FROM products WHERE product_name = ($1) AND price = ($2)"
            const queryResultI = await dbConnection.query(sqlQueryI, [product.product_name, product.price]);

            
            if(queryResultI.rowCount == 0){
                const sqlQuery = "INSERT INTO products (product_name, price) VALUES ($1, $2) RETURNING *";
                const queryResult = await dbConnection.query(sqlQuery, [product.product_name, product.price]);
              return queryResult.rows[0];
                
            }
            return {price : -1}
            
        } catch (error) {
            throw new Error (`in the catch and the error is : ${error}`);
        }
    }
    
    
    
}