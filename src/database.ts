import dotenv from 'dotenv'
import { Pool } from 'pg' 
dotenv.config();


const {
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_DB_TEST,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    ENV
} = process.env

const db = (ENV === "dev")? POSTGRES_DB: POSTGRES_DB_TEST; 
console.log(db);
//pool used for making the connection to the DB
const client = new Pool ({
    host: POSTGRES_HOST,
    database : db,
    user : POSTGRES_USER,
    password : POSTGRES_PASSWORD
})

export default client