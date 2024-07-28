const express = require('express');
const { updateStats } = require('../controllers/userController');
// const authMiddleware = require('../util/auth');                                  
const router = express.Router();

router.post('/updateStats', updateStats);
// router.post('/updateStats', authMiddleware, updateStats);

module.exports = router;
