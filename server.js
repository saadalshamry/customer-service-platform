// APP CONFIG
var express = require("express");
var server = express();
var ejs = require("ejs");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var flash = require("connect-flash");
var db = require("./models/");
var mw = require("./routes/mw.js");
require("dotenv").config();
// MIDDLEWARE
// view engine setup
server.set("view engine", "ejs");
// express setup
server.use(express.json());
server.use(
  express.urlencoded({
    extended: true
  })
);
// serve static files
server.use(express.static("public"));
// cookie-parser setup (needed for flash messages)
server.use(cookieParser("keyboard cat"));
// session setup (needed for Auth process)
server.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
);
// flash (used for error messages and success)
server.use(flash());

// ROUTES SETUP WILL GO HERE
server.use("/tickets", require("./routes/tickets"));
server.use("/csr", require("./routes/csr"));
server.use("/companies", require("./routes/company"));
server.use("/auth", require("./routes/auth"));

//
// DASHBOARD
server.get("/dashboard", mw.isLoggedIn, function(req, res) {
  // 1- find companies
  db.Company.findAll({}).then(companies => {
    // 2- find tickets
    db.Ticket.findAll({}).then(tickets => {
      // 3- find staff
      db.Staff.findAll({}).then(staff => {
        if (req.session.user.role === "manager") {
          res.render("manager-dashboard", { companies, staff, tickets });
        } else if (req.session.user.role === "csr") {
          res.render("csr-dashboard", { companies, staff, tickets });
        } else {
          res.render("tech-dashboard", { companies, staff, tickets });
        }
      });
    });
  });
});

// SERVER SETUP
var PORT = process.env.PORT || 3000;
db.sequelize.sync();
server.listen(PORT, function() {
  console.log(`Server is listening on PORT: ${PORT}`);
});
