import express, {application, Application, Request, Response} from 'express'; 
import { User, UserStore } from '../Models/users';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const Store = new UserStore();

const verifyAuthToken =  (req: Request, res: Response, next : Function) => {
    try {
        const authorizationHeader : string = (req.headers.authorization) as string
        const token = authorizationHeader.split(' ')[1]
        const decoded =  jwt.verify(token, process.env.TOKEN_SECRET as string)
  
        next()
       
    } catch (error) {
        res.json('cant verify')
    }
}



//Token Req
const index = async(_req : Request, res : Response)=>{
    try {
        const allUsers = await Store.index();

        if(allUsers.length == 1 && allUsers[0].user_password== 'No') res.json('No Users!')
        else res.json(allUsers);
           
    } catch (error) {
        throw new Error (`in the catch and the error is : ${error}`);   
    }
     
}

//Token Req
const show = async(req : Request, res : Response)=>{
    try {
        const id = Number(req.params.id);
    const user = await Store.show(id);

    if(user.user_password == 'No') res.json('No Such a user!')
    else res.json(user);
        
    } catch (error) {
        throw new Error (`in the catch and the error is : ${error}`);
    }
    
}

//Token Req
const create = async(req : Request, res : Response)=>{
    try {
        const u : User = {
            first_name : req.body.firstName,
            last_name : req.body.lastName,
            user_password : req.body.password,
        }
    
        const newUser = await Store.create(u);
        const token = jwt.sign({ user : newUser }, process.env.TOKEN_SECRET as string);
    
        res.json(newUser);
            
    } catch (error) {
        throw new Error (`in the catch and the error is : ${error}`);
    }
    
}





const usersRoutes = (app : express.Application)=>{
    app.get('/users/getAllUsers', verifyAuthToken, index);
    app.get('/users/getOne/:id', verifyAuthToken, show);
    app.post('/users/createUser',  create);
}
export default usersRoutes;
