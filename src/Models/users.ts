import Client from "../database";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();


const {saltRounds, pepper} = process.env;

export type User = {
    id? :number,
  first_name? : string,
  last_name? : string,  
  user_password : string
};

export class UserStore{

    
    

    async index() : Promise<User[]>{
        try {
            const dbConnection = await Client.connect();
            const sqlQuery = 'SELECT * FROM users';
            const queryResult = await dbConnection.query(sqlQuery);
            dbConnection.release;

           if(queryResult.rowCount>0)
            return queryResult.rows;
            else return [{user_password : 'No'}];
        } catch (error) {
            throw new Error(`in the catch and the error is : ${error}`);
        }
    }
    

    async show(id : number) : Promise<User>{
        try {
            const dbConnection = await Client.connect();
            const sqlQuery = 'SELECT * FROM users WHERE id = ($1)';
            const queryResult = await dbConnection.query(sqlQuery, [id]);
            dbConnection.release;
    
            if(queryResult.rowCount == 0) return {user_password : 'No'};
            return queryResult.rows[0];
        } catch (error) {
            throw new Error(`in the catch and the error is : ${error}`);
        }
    }
    


    async create (user : User) : Promise<User>{
        try {
            const dbConnection = await Client.connect();
            const sqlQuery = "INSERT INTO users (first_name, last_name, user_password) VALUES ($1, $2, $3) RETURNING *";
            const hash = bcrypt.hashSync(
                user.user_password + pepper, 
                Number(saltRounds)
             );
            const queryResult = await dbConnection.query(sqlQuery, [user.first_name, user.last_name, hash]);

            return queryResult.rows[0];
        } catch (error) {
            throw new Error (`in the catch and the error is : ${error}`);
        }
    }

      async deleteAll() : Promise<void>{
        try {
            const dbConnection = await Client.connect();
            const sqlQuery = 'TRUNCATE users CASCADE';
             await dbConnection.query(sqlQuery);
            dbConnection.release;
            
        } catch (error) {
            throw new Error (`in the catch and the error is : ${error}`);
        }
    
    }
    
    
    

}

