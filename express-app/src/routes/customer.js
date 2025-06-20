const express = require('express');
const { getCustomers, getCustomer, postCustomer, patchCustomer } = require('../controllers/customerController');

const router = express.Router();

router.get('/', getCustomers);
router.post('/', postCustomer);
router.get('/:id', getCustomer);
router.patch('/:id', patchCustomer);

module.exports = router; 