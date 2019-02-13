var express = require("express");
var router = express.Router();
var db = require("../models");
const bcrypt = require("bcryptjs");

// handle login route
router.post("/", (req, res) => {
    // check DB to see if user exists
    db.Staff.findOne({ where: { email: req.body.email } }).then(user => {
        if (user) {
            // user is there -go ahead-
            // 1- compare passwords
            bcrypt.compare(req.body.password, user.password).then(cb => {
                if (cb) {
                    // sucecces login - go ahead and save to session
                    req.session.user = {
                        name: user.name,
                        email: user.email,
                        id: user.id,
                        role: user.role
                    };
                    res.status(200).end();
                } else {
                    // failed
                    res.status(404).end();
                }
            });
        }
        // User not found (wrong cridentials)
        else {
            res.status(404).end();
        }
    });
});

module.exports = router;