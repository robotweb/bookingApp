const express = require('express');
const { getTeams, getTeam, postTeam, patchTeam } = require('../controllers/teamController');

const router = express.Router();

router.get('/', getTeams);
router.post('/', postTeam);
router.get('/:id', getTeam);
router.patch('/:id', patchTeam);

module.exports = router; 