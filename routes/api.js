var express = require('express');
var router = express.Router();

const media = require('../controllers/api/media');
const branding = require('../controllers/api/branding');
const backstage = require('../controllers/api/backstage');
const enquiries = require('../controllers/api/enquiries');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', baseLink: process.env.BASE_URL  });
});

router.get('/media-showcase', media.getMedias)
router.post('/submit-enquiry', enquiries.addEnquiry)
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'Express about', baseLink: process.env.BASE_URL  });
})
router.get('/backstage', backstage.getBackstage);

router.get('/branding', branding.getBrandings);

router.get('/services', function(req, res, next) {
  res.render('services', { title: 'Express media', baseLink: process.env.BASE_URL  });
})

router.get('/contact', function(req, res, next) {
  res.render('contact', { 
    title: 'Express media', 
    baseLink: process.env.BASE_URL
  });
})

router.get('/bts', function(req, res, next) {
  res.render('bts', { title: 'Express media' });
})

router.get('/media-details/:id', media.getMediaById)
router.get('/branding-details/:id', branding.getBrandingById)
router.get('/backstage-details/:id', backstage.getBackstageById)

module.exports = router;
