var express = require('express');
var axios = require("axios");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect("/signup");
});

router.get('/signin', function(req, res, next) {
  res.render("signin");
});

router.get('/signup', function(req, res, next) {
  res.render("signup");
});

module.exports = router;
