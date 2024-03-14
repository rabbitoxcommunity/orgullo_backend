var express = require('express');
var router = express.Router();

const dashboard = require('../controllers/admin/dashboard');
const media = require('../controllers/admin/media');
const branding = require('../controllers/admin/branding');
const backstage = require('../controllers/admin/backstage');
const enquiries = require('../controllers/admin/enquiries');

router.get('/', dashboard.dashboard);

router.get('/add-media', media.mediaForm);
router.get('/edit-media/:id', media.mediaForm);
router.post('/media', media.addMedia);
router.put('/media', media.editMedia);
router.delete('/media', media.deleteMedia);
router.get('/manage-media', media.listMedias);
router.get('/delete-media/:id', media.deleteMedia);

router.post('/update-media', media.updateMedia);
router.post('/delete-video-media', media.deleteVideoMedia);

router.get('/add-backstage', backstage.backstageForm);
router.get('/edit-backstage/:id', backstage.backstageForm);
router.post('/backstage', backstage.addBackstage);
router.put('/backstage', backstage.editBackstage);
router.get('/manage-backstage', backstage.listBackstages);
router.get('/delete-backstage/:id', backstage.deleteBackstage);

router.get('/add-branding', branding.brandingForm);
router.get('/edit-branding/:id', branding.brandingForm);
router.post('/branding', branding.addBranding);
router.put('/branding', branding.editBranding);
router.get('/manage-branding', branding.listBrandings);
router.get('/delete-branding/:id', branding.deleteBranding);

router.get('/enquiries', enquiries.viewEquiries);

module.exports = router;