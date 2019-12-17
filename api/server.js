const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const jokesRouter = require('../jokes/jokes-router.js');
const usersRouter = require('../users/users-router.js');
const usersModel = require('../users/users-model,js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);

//these are tied together for a reason connect authenticate to jokes.
server.use('/api/jokes', authenticate, jokesRouter);
server.use('/api/users', usersRouter, usersModel);

server.get('/', (req, res) => {
    res.send("It's alive!");
})

module.exports = server;
