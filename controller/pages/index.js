const router = require('express').Router();
const apiRoutes = require('./api');
const signupRoutes = require('../pages/signupRoutes');
const loginRoutes = require('../pages/loginRoutes');
const homeRoutes = require('../pages/homeRoutes');

router.use('/api', apiRoutes);
router.use('/signup', signupRoutes);
router.use('/login', loginRoutes);
router.use('/', homeRoutes);

module.exports = router;
