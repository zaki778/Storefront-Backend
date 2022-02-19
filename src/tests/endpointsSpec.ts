// import supertest from 'supertest';
// import app from '../server';

// const request = supertest(app);

// describe('End point testing for users routes', () => {

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