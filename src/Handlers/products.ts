import express, {application, Application, Request, Response} from 'express'; 
import { Product, ProductStore } from '../Models/products';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const Store = new ProductStore();


const verifyAuthToken = (req: Request, res: Response, next : Function) => {
    try {
        const authorizationHeader : string = (req.headers.authorization) as string
        const token = authorizationHeader.split(' ')[1]
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string)
  
        next()
       
    } catch (error) {
        res.json('cant verify')
    }
}



const index = async(req : Request, res : Response)=>{
    const allProducts = await Store.index();
    res.json(allProducts);
}

const show = async(req : Request, res : Response)=>{
   const id = Number(req.params.id);
   const product = await Store.show(id);

   res.json(product);
}

//token required
const create = async(req : Request, res : Response)=>{
    const p : Product = {
        name : req.body.name,
        price : req.body.price
    }

    const newProduct = await Store.create(p);

    console.log(newProduct);
    if(newProduct.price == -1) res.json('Already Exists!')
    
    else res.json("Product Added! : " + JSON.stringify(newProduct));
    
}

const productsRoutes = (app : express.Application)=>{
    app.get('/products/getAll', index);
    app.get('/products/getOne/:id', show);
    app.post('/products/createProduct', verifyAuthToken, create);
}

export default productsRoutes;
