const express = require('express');
const { addMsg, getAllMsg } = require('../controllers/messageController');
const router = express();

router.post('/addmsg', addMsg);
router.post('/getmsg', getAllMsg);


module.exports = router;