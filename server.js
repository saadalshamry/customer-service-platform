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
server.use("/admin", require("./routes/admin"));
server.use("/csr", require("./routes/csr"));
server.use("/tech", require("./routes/tech"));
server.use("/auth", require("./routes/auth"));

// SERVER SETUP
var PORT = process.env.PORT || 3000;
db.sequelize.sync();
server.listen(PORT, function() {
  console.log(`Server is listening on PORT: ${PORT}`);
});
