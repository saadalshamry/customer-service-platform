var express = require("express");
var router = express.Router();
var db = require("../models");

// ROUTES

// get Company info
router.get("/:id", function (req, res) {
    db.Company.findOne({
        where: { id: req.params.id }
    }).then(function (result) {
        res.json(result);
    });
});

// create Company
router.post("/", (req, res) => {
    db.Company.create({
        name: req.body.name,
        contact: req.body.contact,
        email: req.body.email,
        phone: req.body.phone,
        address1: req.body.address1,
        address2: req.body.address2,
        city: req.body.city,
        province: req.body.province,
        postal: req.body.postal,
        country: req.body.country,
    }).then(result => {
        res.status(200).end();
    }).catch(err => {
        console.log(err);
        return res.status(404).end();
    });
});

// edit Company info
router.put("/:id", (req, res) => {
    db.Company.update({
        name: req.body.name,
        contact: req.body.contact,
        email: req.body.email,
        phone: req.body.phone,
        address1: req.body.address1,
        address2: req.body.address2,
        city: req.body.city,
        province: req.body.province,
        postal: req.body.postal,
        country: req.body.country,
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

// delete Company
router.delete("/:id", (req, res) => {
    db.Company.destroy({ where: { id: req.params.id } }).then(result => {
        res.status(200).end();
    }).catch(err => {
        console.log(err);
        return res.status(404).end();
    });
});

module.exports = router;
