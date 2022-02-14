import { User, UserStore } from "../Models/users";
import { Product, ProductStore } from "../Models/products";
import { Order, OrderStore } from "../Models/orders";

const StoreU = new UserStore();
const StoreP = new ProductStore();
const StoreO = new OrderStore();


describe('User Model Testing', ()=>{

    it('it should have an index method', ()=>{
        expect(StoreU.index()).toBeDefined();
    });

    it('it should have a show method', ()=>{
        expect(StoreU.show(1)).toBeDefined();
    });
    
    it('it should have a create method', ()=>{
        const user : User = {firstName: 'm', lastName : 'z', userPassword : '111'};
        expect(StoreU.create(user)).toBeDefined();
    });
    
});
describe('Product Model Testing', ()=>{

    it('it should have an index method', ()=>{
        expect(StoreP.index()).toBeDefined();
    });

    it('it should have a show method', ()=>{
        expect(StoreP.show(1)).toBeDefined();
    });
    
    it('it should have a create method', ()=>{
        const user : User = {firstName: 'm', lastName : 'z', userPassword : '111'};
        expect(StoreP.create(user)).toBeDefined();
    });
    
});
describe('Order Model Testing', ()=>{

    it('it should have an index method', ()=>{
        expect(StoreO.create(1)).toBeDefined();
    });

    it('it should have a show method', ()=>{
        
        expect(StoreO.addProduct(1, 5)).toBeDefined();
    });
    
    it('it should have a create method', ()=>{
        expect(StoreO.end()).toBeDefined();
    });
    
});


