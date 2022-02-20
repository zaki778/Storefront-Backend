"use strict";
// import supertest from 'supertest';
// import app from '../server';
// import { UserStore } from '../Models/users';
// import { OrderStore } from '../Models/orders';
// import { ProductStore } from '../Models/products';
// const StoreU = new UserStore();
// const StoreO = new OrderStore();
// const StoreP = new ProductStore();
// const request = supertest(app);
// describe('End point testing for users routes', () => {
//     let originalTimeout : number;
//         beforeEach(function() {
//             originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
//             jasmine.DEFAULT_TIMEOUT_INTERVAL = 2500;
//         });
//         afterEach(async function() {
//           jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
//          await  StoreU.deleteAll();
//         })
//     it('Index testing', async () => {
//         const response = await request.get('/users/getAllUsers');
//         expect(response.status).toBe(200);
//     });
//     it('Show testing', async () => {
//         const response = await request.get('/users/getOne/1');
//         expect(response.status).toBe(200);
//     });
//     it('Create testing', async () => {
//         const response = await request.post('/users/createUser');
//         expect(response.status).toBe(200);
//     });
//     describe('End point testing for products routes', ()=>{
//         let originalTimeout : number;
//         beforeEach(function() {
//             originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
//             jasmine.DEFAULT_TIMEOUT_INTERVAL = 2500;
//         });
//         afterEach(async function() {
//           jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
//          await StoreP.deleteAll();
//         })
//         it('Index testing', async()=>{
//             const response = await request.get('/products/getAll');
//             expect(response.status).toBe(200);
//         });
//         it('Show testing', async()=>{
//             const response = await request.get('/products/getOne/1');
//             expect(response.status).toBe(200);
//         });
//         it('Create testing', async()=>{
//             const response = await request.post('/products/createProduct');
//             expect(response.status).toBe(200);
//         });
//     });
//     describe('End point testing for orders routes', ()=>{
//         afterEach(async function() {
//            await StoreO.deleteAll();
//           })
//         it('Initiates an order testing', async()=>{
//             const response = await request.post('/orders/createOrder');
//             expect(response.status).toBe(200);
//         });
//         it('Adding to cart testing', async()=>{
//             const response = await request.post('/orders/addToCart');
//             expect(response.status).toBe(200);
//         });
//         it('End order testing', async()=>{
//             const response = await request.get('/orders/finishedOrders');
//             expect(response.status).toBe(200);
//         });
//     });
// });
