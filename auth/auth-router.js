const router = require('express').Router();

router.post('/register', (req, res) => {
  // implement registration
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 12);

  user.password = hash;

  Users.add(user)
    .then(saved => {
      const token = genToken(saved)
      res.status(201).json({created_user: saved, token:token}); //returns token when registered
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post('/login', (req, res) => {
  // implement login
  let { username, password } = req.body;
  Users.findBy({username})
  .first()
  .then(user => {
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = genToken(user)
    res.status(200).json({
      message: `Welcome ${user.username}!`,
      token:token
    });
    } else {
      res.status(401).json({message: 'Access Denied, Try Again'});
    }
  })
  .catch(error => {
    res.status(500).json(error);
  });
});

function genToken(user) {
  const payload = {
    userid: user.id,
    username: user.username,
  };
  const options = { expiresIn: '1h' };
      const token = jwt.sign(payload, secrets.jwtSecret, options);
      return token;
  }



module.exports = router;
