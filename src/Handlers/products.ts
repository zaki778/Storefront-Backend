import express, {application, Application, Request, Response} from 'express'; 
import { Product, ProductStore } from '../Models/products';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const Store = new ProductStore();


const verifyAuthToken =  (req: Request, res: Response, next : Function) => {
    try {
        const authorizationHeader : string = (req.headers.authorization) as string
        const token = authorizationHeader.split(' ')[1]
        const decoded =  jwt.verify(token, process.env.TOKEN_SECRET as string)
        const {user} = JSON.parse(atob(token.split('.')[1]));
        if(user.first_name === 'admin' && user.last_name === 'admin')
        throw new Error('Admin is the only one to create new Product')
  
        next()
       
    } catch (error) {
        res.json('cant verify')
    }
}



const index = async(req : Request, res : Response)=>{
    try {
        const allProducts = await Store.index();
        res.json(allProducts);
            
    } catch (error) {
        throw new Error (`in the catch and the error is : ${error}`);
    }
    
}

const show = async(req : Request, res : Response)=>{
    try {
        const id = Number(req.params.id);
   const product = await Store.show(id);

   res.json(product);
   
        
    } catch (error) {
        throw new Error (`in the catch and the error is : ${error}`);
    }
   
}

//token required
const create = async(req : Request, res : Response)=>{
    try {
        const p : Product = {
            product_name : req.body.name,
            price : req.body.price
        }
    
        const newProduct = await Store.create(p);
    
        
        if(newProduct.price == -1) res.json('Already Exists!')
        
        else res.json("Product Added! : " + JSON.stringify(newProduct));
        
        
    } catch (error) {
        throw new Error (`in the catch and the error is : ${error}`);
    }
    
    
}

const productsRoutes = (app : express.Application)=>{
    app.get('/products/getAll', index);
    app.get('/products/getOne/:id', show);
    app.post('/products/createProduct', verifyAuthToken, create);
}

export default productsRoutes;
