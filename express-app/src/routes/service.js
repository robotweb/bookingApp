const express = require('express');
const { getServices, getService, postService, patchService, getServiceTypes, getServiceType } = require('../controllers/serviceController');

const router = express.Router();

router.get('/', getServices);
router.get('/type', getServiceTypes);
router.get('/type/:id', getServiceType);
router.post('/', postService);
router.get('/:id', getService);
router.patch('/:id', patchService);

module.exports = router; 