var express = require('express');
var router = express.Router();

const adminRouter = require('./admin');
const viewRouter = require('./api');

router.use('/admin', adminRouter);
router.use('/', viewRouter);

module.exports = router;
