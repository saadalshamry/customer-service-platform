var express = require("express");
var router = express.Router();
var db = require("../models");

// ROUTES

// get ticket info
router.get("/:id", function (req, res) {
    db.Ticket.findOne({ where: { id: req.params.id } }).then(function (result) {
        res.json(result);
    });
});

// create ticket
router.post("/", (req, res) => {
    db.Ticket.create({
        name: req.body.name,
        company: req.body.company,
        technician: req.body.technician,
        email: req.body.email,
        phone: req.body.phone,
        description: req.body.description,
        resolution: req.body.resolution,
        isFinished: req.body.isFinished
    }).then(result => {
        res.status(200).end();
    }).catch(err => {
        console.log(err);
        return res.status(404).end();
    });
});

// edit ticket info
router.put("/:id", (req, res) => {
    db.Ticket.update({
        name: req.body.name,
        company: req.body.company,
        technician: req.body.technician,
        email: req.body.email,
        phone: req.body.phone,
        description: req.body.description,
        resolution: req.body.resolution,
        isFinished: req.body.isFinished,
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

// delete ticket
router.delete("/:id", (req, res) => {
    db.Ticket.destroy({ where: { id: req.params.id } }).then(result => {
        res.status(200).end();
    }).catch(err => {
        console.log(err);
        return res.status(404).end();
    });
});

module.exports = router;
