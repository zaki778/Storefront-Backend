import express, {application, Application, Request, Response} from 'express'; 
import { User, UserStore } from '../Models/users';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const Store = new UserStore();

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


//Token Req
const index = async(_req : Request, res : Response)=>{
     const allUsers = await Store.index();

     if(allUsers.length == 1 && allUsers[0].userPassword== 'No') res.json('No Users!')
     else res.json(allUsers);
}

//Token Req
const show = async(req : Request, res : Response)=>{
    const id = Number(req.params.id);
    const user = await Store.show(id);

    if(user.userPassword == 'No') res.json('No Such a user!')
    else res.json(user);
}

//Token Req
const create = async(req : Request, res : Response)=>{
    const u : User = {
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        userPassword : req.body.password,
    }

    const newUser = await Store.create(u);
    const token = jwt.sign({ user : newUser }, process.env.TOKEN_SECRET as string);

    res.json(token);
    
}





const usersRoutes = (app : express.Application)=>{
    app.get('/users/getAllUsers', verifyAuthToken, index);
    app.get('/users/getOne/:id', verifyAuthToken, show);
    app.post('/users/createUser', verifyAuthToken,  create);
}
export default usersRoutes;
