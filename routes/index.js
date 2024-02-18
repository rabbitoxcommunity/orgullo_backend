var express = require('express');
var router = express.Router();

const adminRouter = require('./admin');
const viewRouter = require('./api');
const auth = require('../controllers/admin/auth');


const { authValidation, authValidationLogin } = require('../middlewares/auth');

router.get('/login', authValidationLogin, auth.getForm);
router.post('/login', auth.submitLogin);
router.get('/logout', auth.logout);

router.use('/admin',authValidation, adminRouter);
router.use('/', viewRouter);

module.exports = router;
