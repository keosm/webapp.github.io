var express = require('express');
var router = express.Router();
const { getCollection } = require('../models/db');
const crypto = require("crypto");

router.post("/signup/submit", async (req, res) => {
  try {
    let coll = getCollection("users");
    console.log(req.body); 

    let password = req.body.password;
    
    const salt = crypto.randomBytes(12).toString("hex"); 
    const keyLength = 12; 
    let cryptoPassword = crypto.scryptSync(password, salt, keyLength).toString("hex");

    let newUser = req.body;
    newUser.password = cryptoPassword;
    newUser.salt = salt;

    await coll.insertOne(newUser);
    res.redirect("/signin");
  } 
  catch(e) {
    console.error(e);
    res.redirect("/signup");
  }
});

router.post("/signin/submit", async (req, res) => {
  try {
    let coll = getCollection("users");
    let email = req.body.email;
    let password = req.body.password;
    
    let dbuser = await conn.findOne({email: email});
    console.log(dbuser);
    if(!dbuser) {  
      res.redirect("/signin");
      return;
    } 

    const keyLength = 12;
    const salt = dbuser.salt; 
    let cryptoPassword = crypto.scryptSync(password, salt, keyLength);
    console.log(cryptoPassword.toString("hex"));
    if(cryptoPassword.toString("hex") === dbuser.password) {

      res.render("index", {name: dbuser.name});
    } else {
      res.redirect("/signin");
    }
  } catch(e) {
    console.error(e);
  }
});

router.get('/spending', (req, res) => {
  
});

module.exports = router;
