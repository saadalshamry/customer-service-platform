var express = require("express");
var router = express.Router();
var db = require("../models");
const bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);
// add staff page
router.get("/register", (req, res) => {
  res.render("auth/add-staff");
});

// add staff logic
router.post("/register", (req, res) => {
  // check if user in DB
  db.Staff.findOne({ where: { employeeEmail: req.body.email } }).then(user => {
    if (user) {
      // user already there
      return res.send("this email already exists");
    } else {
      // user not found -go ahead-
      // 1-hash password
      var hashed = bcrypt.hashSync(req.body.password, salt);
      // 2- save user
      db.Staff.create({
        employeeName: req.body.name,
        employeeRole: req.body.role,
        employeePassword: hashed,
        employeeEmail: req.body.email,
        employeePhone: req.body.number
      })
        .then(() => {
          // staff created
          res.redirect("back");
        })
        .catch(err => {
          // something went wrong
          res.redirect("back");
        });
    }
  });
});

// login page
router.get("/login", (req, res) => {
  res.render("auth/login");
});
// handle login
router.post("/login", (req, res) => {
  var email = req.body.email,
    password = req.body.password;

  // check DB to see if user exists
  db.Staff.findOne({ where: { employeeEmail: email } }).then(user => {
    if (user) {
      // user is there -go ahead-
      // 1- compare passwords
      bcrypt.compare(password, user.employeePassword).then(cb => {
        if (cb) {
          // sucecces login - go ahead and save to session
          req.session.user = {
            name: user.employeeName,
            email: user.employeeEmail,
            id: user.id
          };
          res.redirect("/auth/login");
        } else {
          // failed - go ahead and redirct back
          res.redirect("/login");
        }
      });
    }
    // User not found (wrong cridentials)
    else {
      return res.redirect("back");
    }
  });
});

// test route to see session
router.get("/session", (req, res) => {
  res.send(req.session);
});
module.exports = router;
