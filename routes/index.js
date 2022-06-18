var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("");
  res.send({msg:"Welcome to Ron and Almog's project, in this project you will be able to perform a number of actions in accordance with the requirements of the exercise."});
});

module.exports = router;
