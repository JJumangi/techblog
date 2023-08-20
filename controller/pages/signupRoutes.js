const router = require('express').Router();
const session = require ('express-session');
const {User, Comment, Blog} = require('../../models');
const withAuth = require('../../utils/auth');

//create account
router.post('/', (req, res) => {
  User.create({
    username: req.body.username,
    password: req.body.password
  })
  .then(dbUser => {
    req.session.save(() => {
      req.session.user_id = dbUser.id;
      req.session.username = dbUser.username;
      reqw.session.loggedIn = true;
      req.json(dbUser);
    })
  })
  .catch(err)
  console.log(err)
  res.status(500).json(err)
});

router.post('/', async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { username: req.body.username}
    });
    if (!userData) {
      res.status(400).json({message: 'this username and/or password are not associate with an account, try again!'});
      return;
    }
    const correctPW = await userData.checkPassword(req.body.password);
    if (!correctPW) {
      res.status(400).json({message: 'this username and/or password are not associate with an account, try again!'});
      return;
    }
    req.session.save(() => {
      req.session.user_id=userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: 'Success!'});
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;