const express = require('express');
const router = express.Router();
const User = require('./models/users_model');
const mongoose = require("mongoose");

// connection to users collection

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});



module.exports = router;
