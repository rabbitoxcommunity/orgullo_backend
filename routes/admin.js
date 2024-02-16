var express = require('express');
var router = express.Router();

const dashboard = require('../controllers/admin/dashboard');
const media = require('../controllers/admin/media');
const branding = require('../controllers/admin/branding');
const backstage = require('../controllers/admin/backstage');
const enquiries = require('../controllers/admin/enquiries');

router.get('/', dashboard.dashboard);

router.get('/add-media', function(req, res, next) {
    res.render('admin/add-media', { title: 'Express', baseLink: process.env.BASE_URL });
});
router.post('/add-media', media.addMedia);
router.get('/manage-media', media.listMedias);

router.get('/add-backstage', function(req, res, next) {
    res.render('admin/add-backstage', { title: 'Express', baseLink: process.env.BASE_URL });
});
router.post('/add-backstage', backstage.addBackstage);
router.get('/manage-backstage', backstage.listBackstages);

router.get('/add-branding', function(req, res, next) {
    res.render('admin/add-branding', { title: 'Express', baseLink: process.env.BASE_URL });
});
router.post('/add-branding', branding.addBranding);
router.get('/manage-branding', branding.listBrandings);

router.get('/enquiries', enquiries.viewEquiries);

module.exports = router;