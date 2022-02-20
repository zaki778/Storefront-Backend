import { User, UserStore } from "../Models/users";
import { Product, ProductStore } from "../Models/products";
import { Order, OrderStore, OrderProduct } from "../Models/orders";
import bcrypt, { hash } from 'bcrypt';
import dotenv from 'dotenv';
import supertest from 'supertest';
import app from '../server';



dotenv.config();

const {pepper, saltRounds} = process.env;

const StoreU = new UserStore();
const StoreP = new ProductStore();
const StoreO = new OrderStore();



describe('User Model Testing', ()=>{
    
    let hashedPass1 : string  , hashedPass2 : string ;
    let firstName : string, lastName : string ;
    
    beforeAll(async ()=>{
        
        const user1 : User = {first_name: 'Moh', last_name : 'Zaki', user_password : '101010'};
        const user1Created = await StoreU.create(user1);
        const user2 : User = {first_name: 'Ahmed', last_name : 'Sameh', user_password : '111'};
         const user2Created = await StoreU.create(user2);
        
        hashedPass1 = user1Created.user_password;
        hashedPass2 = user2Created.user_password;
        firstName = user1Created.first_name as string;
        lastName = user1Created.last_name as string;

     
    })
    
    it('create method should add a user', async()=>{
        
      expect({first_name : firstName, last_name : lastName}).toEqual({first_name : 'Moh', last_name : 'Zaki'});

    });

    it('check the bcrypted password', async()=>{
        const resPass : string = '101010';
        
        expect(bcrypt.compareSync(resPass + pepper, hashedPass1)).toBeTrue()
    });
    
   it('checks that show returns one user correctly', async()=>{
       const user : User = await StoreU.show(1);
       
     
       expect(user).toEqual({id : 1, first_name : 'Moh', last_name : 'Zaki', user_password : hashedPass1});
   })

   it('checks that index return all existing users', async()=>{
       const users : User[] = await StoreU.index();
       
       const existingUsers : User[]= [{id : 1, first_name : 'Moh', last_name : 'Zaki', user_password : hashedPass1},
       {id : 2, first_name : 'Ahmed', last_name : 'Sameh', user_password : hashedPass2}]; 
       expect(users).toEqual(existingUsers);
   })
    
    
    
});


    describe('Product Model Testing', ()=>{

        let p1C : Product, p2C : Product;
        let oC : Order;
    
        beforeAll(async()=>{
            
          const p1 = {product_name : 'Milk', price : 10};
          const p2 = {product_name : 'Meat', price : 200};
    
           p1C = await StoreP.create(p1);
           p2C  = await StoreP.create(p2);
    
           
            
          
          
        });
    
        it('create method should add product', ()=>{
            expect(p1C).toEqual({id : 1, product_name : 'Milk', price : 10});
        });
    
        it('show method show the wanted result', async()=>{
            const p : Product = await StoreP.show(2);
            expect(p).toEqual({id : 2, product_name : 'Meat', price : 200})
         });
    
         it('index method get all products', async()=>{
             const products : Product[] = await StoreP.index();
             expect(products).toEqual([{id : 1, product_name : 'Milk', price : 10}, {id : 2, product_name : 'Meat', price : 200}]);
         });
    
         
          
        
    });
    





describe('Order Model Testing', ()=>{

    let oC : Order;
    let originalTimeout : number;

    beforeAll(async()=>{
        oC = await StoreO.create(1);
        console.log(oC);

    });
    
    

    it('check if order created sucessfully', ()=>{
        expect(oC.id).toEqual(1);
    })

    it('check if add to cart happens successfully', async()=>{
      const op : OrderProduct =  await StoreO.addProduct(1, 2);
        expect(op).toEqual({id : 1, order_id : 1, product_id : 1, quantity : 2});
        
    });

    
});












    

    



    











