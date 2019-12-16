/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
//const users = require('../users/users-model.js');
const jokesRouter = require('../jokes/jokes-router.js');
const bcrypt = require('bcryptjs');

module.exports = (req, res, next) => {

  //should this be req.body?
  const {username, password} = req.headers

  if(!(username && password)){
      res.status(401).json({ message: 'you shall not pass!' });
  } else {
    jokesRouter.findBy({ username })
      .first()
      .then(_user => {
        if(_user && bcrypt.compareSync(password, _user.password)) {
          next()
        } else {
          res.status(401).json({message: "Invalid Username or Password"})
        }
      })
      .catch((err) => {res.status(500).json({message: ERROR})})
  }
};
