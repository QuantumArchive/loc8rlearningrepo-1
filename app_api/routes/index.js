var express = require('express');
var router = express.Router();
var ctrlLocations = require('../controllers/locations');
var ctrlReviews = require('../controllers/reviews');

//locations

router.get('/locations', ctrlLocations.locationsListByDistance);
router.post('/locations', ctrlLocations.locationsCreate);
router.get('/locations/:locationid', ctrlLocations.locationsReadOne);
router.get('/locations/name/:locationname', ctrlLocations.locationsFindName);
//router.put('/locations/:locationid', ctrlLocations.locationUpdateOne);
//router.delete('/locations/:locationid', ctrlLocations.locationDeleteOne);

//reviews
router.put('/locations/:locationid/reviews', ctrlReviews.reviewCreate);
router.get('/locations/:locationid/reviews/:reviewid', ctrlReviews.reviewReadOne);
//router.put('/locations/:locationid/reviews/:reviewid', ctrlReviews.reviewUpdateOne);
//router.delete('/locations/:locationid/reviews/:reviewid', ctrlReviews.reviewDeleteOne);

module.exports = router;
