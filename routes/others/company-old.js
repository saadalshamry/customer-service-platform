var express = require("express");
var router = express.Router();
var db = require("../models");

// ROUTES
// add new company
router.post("/add", (req, res) => {
  db.Company.create({
    companyName: req.body.companyname,
    companyContact: req.body.contactname,
    companyEmail: req.body.companyemail,
    companyPhone: req.body.companyphone,
    companyAddress1: req.body.companyaddress1,
    companyAddress2: req.body.companyaddress2,
    companyCity: req.body.companycity,
    companyPostalCode: req.body.companypostal,
    companyProv: req.body.companyprovince,
    companyCountry: req.body.companycountry
  }).then(done => {
    return res.redirect("/dashboard");
  });
});

// delete company
router.get("/delete-company/:id", (req, res) => {
  db.Company.findOne({ where: { id: req.params.id } }).then(c => {
    c.destroy();
    return res.redirect("/dashboard");
  });
});

// edit company page
router.get("/edit-company/:id", (req, res) => {
  db.Company.findOne({ where: { id: req.params.id } }).then(company => {
    res.render("edit-company", { company });
  });
});

// edit company
router.post("/edit-company/:id", (req, res) => {
  db.Company.findOne({ where: { id: req.params.id } }).then(company => {
    company.update({
      companyName: req.body.companyname,
      companyContact: req.body.contactname,
      companyEmail: req.body.companyemail,
      companyPhone: req.body.companyphone,
      companyAddress1: req.body.companyaddress1,
      companyCity: req.body.companycity,
      companyPostalCode: req.body.companypostal,
      companyProv: req.body.companyprovince,
      companyCountry: req.body.companycountry
    });
    res.redirect("/dashboard");
  });
});
module.exports = router;
