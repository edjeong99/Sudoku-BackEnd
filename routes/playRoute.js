const express = require('express');
const { getNewSudoku, getHint } = require('../controllers/playController');

const router = express.Router();

router.get('/generate', getNewSudoku);
router.post('/hint', getHint);



module.exports = router;