// APP CONFIG
var express = require("express");
var server = express();
var ejs = require("ejs");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var flash = require("connect-flash");
var db = require("./models/");
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
//Routes for GET PUT POST DELETE of tickets, companies, and staff
server.use("/ticket", require("./routes/ticket"));
server.use("/company", require("./routes/company"));
server.use("/staff", require("./routes/staff"));

//Routes for profile, logout, login
server.use("/profile", require("./routes/profile"));
server.use("/logout", require("./routes/logout"));
server.use("/login", require("./routes/login"));

// Main Route which direct user either to login or dashboard
server.get("/", (req, res) => {
  if (req.session.user) {
    // 1- find companies
    db.Company.findAll({}).then(companies => {
      // 2- find tickets
      db.Ticket.findAll({}).then(tickets => {
        // 3- find staff
        db.Staff.findAll({}).then(staff => {
          switch (req.session.user.role) {
            case "manager":
              var icon = '<button class="btn btn-outline-warning text-capitalize"><i class="fas fa-user-tie"></i> Manager</button>'
              break;
            case "csr":
              var icon = '<button class="btn btn-outline-warning text-capitalize"><i class="fas fa-user"></i> CSR</button>';
              break;
            case "technician":
              var icon = '<button class="btn btn-outline-warning text-capitalize"><i class="fas fa-headset"></i> Technician</button>';
              break;
          }
          res.render("dashboard", {
            companies,
            staff,
            tickets,
            icon
          });
        });
      });
    });
  } else {
    res.render("login");
  }
});


// SERVER SETUP
var PORT = process.env.PORT || 3000;
db.sequelize.sync({
  force: true
});
server.listen(PORT, function () {
  console.log(`Server is listening on PORT: ${PORT}`);
});