const express = require('express');
const { getBookings, getBooking, postBooking, patchBooking } = require('../controllers/bookingController'); 

const router = express.Router();

router.get('/', getBookings);
router.post('/',postBooking);
router.get('/:id', getBooking);
router.patch('/:id',patchBooking);

module.exports = router;