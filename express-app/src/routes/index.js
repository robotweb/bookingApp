const express = require('express');
const { home, checkdb } = require('../controllers/homeController.js');
const { getBooking } = require('../controllers/bookingController.js');

const router = express.Router();

router.get('/', home);
router.get('/db', checkdb);

module.exports = router;