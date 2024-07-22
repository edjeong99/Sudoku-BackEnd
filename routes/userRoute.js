const express = require('express');
const { saveSudokuTime } = require('../controllers/userController');
const authMiddleware = require('../util/auth');                                  
const router = express.Router();

router.post('/saveSudokuTime', authMiddleware, saveSudokuTime);

module.exports = router;
