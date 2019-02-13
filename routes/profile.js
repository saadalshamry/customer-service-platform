var express = require("express");
var router = express.Router();
var db = require("../models");
// ROUTES

// get Profile info
router.get("/", function (req, res) {
    db.Staff.findOne({
        where: { id: req.session.user.id }
    }).then(function (result) {
        res.json({
            name: result.name,
            role: result.role,
            email: result.email,
            phone: result.phone,
        });
    });
});

// edit Profile info
router.put("/", (req, res) => {
    db.Staff.update({
        name: req.body.name,
        role: req.body.role,
        email: req.body.email,
        phone: req.body.phone,
    }, {
            where: {
                id: req.session.user.id
            }
        }).then(result => {
            req.session.user = {
                name: req.body.name,
                role: req.body.role,
                email: req.body.email,
            };
            res.status(200).end();
        }).catch(err => {
            console.log(err);
            return res.status(404).end();
        });
});


module.exports = router;
