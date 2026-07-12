const express = require('express');
const router = express.Router();

const {processAllocation} = require('../controllers/allocationController');

router.post("/recalculate", processAllocation);

module.exports = router;