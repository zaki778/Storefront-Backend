import express, {application, Application, Request, Response} from 'express'; 
import { Order, OrderStore } from '../Models/orders';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import {Product} from '../Models/products';



dotenv.config();

const Store = new OrderStore();

const verifyAuthToken =  (req: Request, res: Response, next : Function) => {
     try {
            const authorizationHeader : string =   (req.headers.authorization) as string
            const token = authorizationHeader.split(' ')[1]
            const decoded =  jwt.verify(token, process.env.TOKEN_SECRET as string)
  
        next()
       
    } catch (error) {
        res.json('cant verify')
    }
}


const create = async (req : Request, res : Response)=>{
    try {
            const userId = Number(req.body.id);
            const createdOrder = await Store.create(userId);
                
            if(createdOrder.user_id == -1) res.json('No Such A user!');
            else if(createdOrder.user_id == -2) res.json('You have an already existing order!')
            else res.json(createdOrder);
            
    } catch (error) {
        throw new Error (`in the catch and the error is : ${error}`);
    }

 

}

const addProduct = async(req : Request, res : Response)=>{
    try {
        const productId = req.body.id ;
    
        const quantity = req.body.quantity;
    
        const addedProduct = await Store.addProduct(productId, quantity);
        if(addedProduct.quantity == 0) res.json('Start Order First!')
        else if(addedProduct.quantity == -1) res.json('No Such a Product!');
    
        else {res.json('Product added : ' + JSON.stringify(addedProduct))};
          
    } catch (error) {
        throw new Error (`in the catch and the error is : ${error}`);

    }
    
}

const finishOrder = async (_req : Request, res : Response)=>{
    try {
        const finishedOrder = Store.end();
        res.json(finishedOrder);
      
    } catch (error) {
        throw new Error (`in the catch and the error is : ${error}`);
        
    }
    
}


const ordersRoutes =(app : express.Application)=>{
    app.post('/orders/createOrder', verifyAuthToken, create);
    app.post('/orders/addToCart', verifyAuthToken, addProduct);
    app.get('/orders/finishedOrders', verifyAuthToken, finishOrder);
}

export default ordersRoutes;