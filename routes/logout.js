var express = require("express");
var router = express.Router();
var db = require("../models");


// handle logout route
router.post("/", function (req, res) {
    req.session.destroy();
    res.redirect("/"); //redirect to the index location
});

module.exports = router;
