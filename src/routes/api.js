const express = require('express');
const { errorHandler } = require('../middleware');
const { login } = require('../controllers/users/login');

const router = express();
// register api points
router.use('/c', require('./common'));
router.use('/login', login);

// catch api all errors
router.use(errorHandler);

module.exports = router;