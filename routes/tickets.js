var express = require("express");
var router = express.Router();
var db = require("../models");

// ROUTES

// 1- add ticket

router.post("/add", (req, res) => {
  db.Ticket.create({
    ticketOwner: req.body.ticketname,
    ticketCompany: req.body.ticketcompany,
    ticketPhone: req.body.ticketphone,
    ticketEmail: req.body.ticketemail,
    ticketDescription: req.body.ticketdescription,
    ticketResolution: req.body.ticketresolution,
    ticketTech: req.body.tickettech
  })
    .then(ticket => {
      res.redirect("back");
    })
    .catch(err => {
      console.log(err);
      res.send("something went wrong");
    });
});

// 2- delete ticket
router.get("/delete-ticket/:id", (req, res) => {
  db.Ticket.findOne({ where: { id: req.params.id } }).then(ticket => {
    ticket.destroy();
    res.redirect("/dashboard");
  });
});

// 3- edit ticket page
router.get("/edit-ticket/:id", (req, res) => {
  db.Staff.findAll({ where: { employeeRole: "technician" } }).then(
    technicians => {
      db.Ticket.findOne({ where: { id: req.params.id } }).then(ticket => {
        res.render("edit-ticket", { technicians, ticket });
      });
    }
  );
});

// edit ticket
router.post("/edit-ticket/:id", (req, res) => {
  db.Ticket.findOne({ where: { id: req.params.id } }).then(ticket => {
    ticket.update({
      ticketOwner: req.body.name,
      ticketCompany: req.body.company,
      ticketPhone: req.body.phone,
      ticketEmail: req.body.email,
      ticketDescription: req.body.description,
      ticketResolution: req.body.resolution,
      ticketTech: req.body.tech
    });
    res.redirect("/dashboard");
  });
});

// close tticket
router.get("/close-ticket/:id", (req, res) => {
  db.Ticket.findOne({ where: { id: req.params.id } }).then(ticket => {
    ticket.update({ ticketStatus: "Closed" });
    res.json({ updated: "true" });
  });
});
module.exports = router;
