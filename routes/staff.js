var express = require("express");
var router = express.Router();
var db = require("../models");
const bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);

// ROUTES

// get Staff info
router.get("/:id", function (req, res) {
    db.Staff.findOne({
        where: { id: req.params.id }
    }).then(function (result) {
        res.json(result);
    });
});

// create Staff
router.post("/", (req, res) => {
    console.log(JSON.stringify(req.body, null, 5))
    db.Staff.create({
        name: req.body.name,
        role: req.body.role,
        email: req.body.email,
        phone: req.body.phone,
        password: bcrypt.hashSync(req.body.password, salt),
    }).then(result => {
        res.status(200).end();
    }).catch(err => {
        console.log(err);
        return res.status(404).end();
    });
});

// edit Staff info
router.put("/:id", (req, res) => {
    db.Staff.update({
        name: req.body.name,
        role: req.body.role,
        email: req.body.email,
        phone: req.body.phone,
        password: bcrypt.hashSync(req.body.password, salt),
    }, {
            where: {
                id: req.params.id
            }
        }).then(result => {
            res.status(200).end();
        }).catch(err => {
            console.log(err);
            return res.status(404).end();
        });
});

// delete Staff
router.delete("/:id", (req, res) => {
    db.Staff.destroy({ where: { id: req.params.id } }).then(result => {
        res.status(200).end();
    }).catch(err => {
        console.log(err);
        return res.status(404).end();
    });
});

module.exports = router;
