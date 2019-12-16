const db = require ('../data/dbConfig.js');
//const authRouter = require('../auth/auth-router.js');

const Users = require('./users-model.js');

describe('users model', () => {
    describe('add()', () => {
        beforeEach(async () => {
            await db('users').truncate();
        })
        it('should add 2 users', async () => {
            await Users.add({ username: 'Brandy', password: "Testing" });
            await Users.add({ username: 'Stupid', password: "Test" });

            const users = await db('users');
            expect(users).toHaveLength(2);
        })
    })

    describe('find()', () => {
        it('should return a list of users', async () => {
            const users = await Users.find();
            expect(users).toHaveLength(2);
        })
    })

    describe('findBy()', () => {
        it('should return a user', async () => {
            const user = await Users.findBy({ username: 'Brandy'});
            expect(user).toHaveLenth(1);
        })
    })
    describe('findById()', () => {
        it('should return a user with a specific id', async () => {
            const user = await Users.findById(2);
            expect(user).toEqual({ id:2, username: 'Stupid', password: "iTest"});
        })
    })
})