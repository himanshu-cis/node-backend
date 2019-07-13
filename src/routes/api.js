const express = require('express');
const { errorHandler } = require('../middleware');

const router = express();
// register api points
router.use('/common', require('./common'));

// catch api all errors
router.use(errorHandler);


module.exports = router;