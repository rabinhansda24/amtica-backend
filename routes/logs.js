const express = require('express');
const router = express.Router();
const logs = require('../app/api/controllers/user_logs');

router.get('/login', logs.getUserLogs);


module.exports = router;