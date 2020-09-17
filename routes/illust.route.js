var express = require('express');
var router = express.Router();
var IllustController = require('../controllers/illust.controller');

router.get('/getIllust', IllustController.getIllust);

module.exports = router;
