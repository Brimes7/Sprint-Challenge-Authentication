const server = require('./server.js');
const request = require('supertest');

describe('server.js', () => {


    test('should be the testing environment', () => {
        expect(process.env.DB_ENV).toBe('testing');
    });


    describe('GET /', () => {

        it('should return 200 OK', async () => {
            const res = await request(server).get('/');
            expect(res.status).toBe(200);
        });

        // does it return the right data type?
        it('should be json', async () => {
            const res = await request(server).get('/');
            expect(res.type).toBe('application/json');
        })

        // does it return the right data?
        it('should return the right object', async () => {
            const res = await request(server).get('/');
            expect(res.body).toEqual({ api: 'up' });
        })
    });
});