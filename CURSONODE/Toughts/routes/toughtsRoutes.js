const express = require('express');
const ToughtsController = require('../controllers/ToughtController');
const router = express.Router();

router.get('/', ToughtsController.showToughts);

module.exports = router;