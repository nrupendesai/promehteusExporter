
var express = require('express');
var router = express.Router();
const { logger } = require('../logger');
const { register } = require('../controllers/prometheusController')

const { validateRequest } = require("../controllers/authController")

/* GET home page. */
router.get('/', validateRequest, function(req, res, next) {
  res.status(200).json({
    type: "success",
    worker: process.pid
  })
}); 

router.get('/metrics', validateRequest, async function(req, res, next) {
  try {
		res.set('Content-Type', register.contentType);
    res.end(await register.metrics())
	} catch (ex) {
		res.status(500).end(ex);
	}
}); 



module.exports = router;
