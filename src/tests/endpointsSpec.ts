import supertest from 'supertest';
import app from '../server';

const request = supertest(app);

describe('End point testing for users routes', () => {

    it('Index testing', async () => {
        const response = await request.get('/users/getAllUsers');
        expect(response.status).toBe(200);
        
    });

    it('Show testing', async () => {
        const response = await request.get('/users/getOne/1');
        expect(response.status).toBe(200);
        
    });

    // it('Create testing', async () => {
    //     const response = await request.get('/users/createUser');
    //     expect(response.status).toBe(200);
        
    // });

    



});