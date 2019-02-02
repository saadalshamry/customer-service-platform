// APP CONFIG
var express = require('express');
var server = express();
var ejs = require('ejs');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var flash = require('connect-flash');
// MIDDLEWARE 
// view engine setup
server.set('view engine', 'ejs')
// express setup
server.use(express.json())
server.use(express.urlencoded({
    extended: true
}))
// cookie-parser setup (needed for flash messages)
server.use(cookieParser('keyboard cat'));
// session setup (needed for Auth process)
server.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: true
    }
}));
// flash (used for error messages and success)
server.use(flash());

// ROUTES SETUP WILL GO HERE
server.use('/admin', require('./routes/admin'))
server.use('/csr', require('./routes/csr'))
server.use('/tech', require('./routes/tech'))

// TEST ROUTE
server.get('/', function (req, res) {
    var names = ["Saad", "Taras", "Ibrahim"];
    // ejs bydefault lookup inside the views dir
    // in this case it is looking for file called index
    // and after the path you can an opject of all the values you want to pass to that file
    // please note that the key is the name of the var inside that file -in this case it is name and  list -
    res.render('index', {
        name: "Saad",
        list: names
    })
});





// SERVER SETUP
var PORT = process.env.PORT || 3000;

server.listen(PORT, function () {
    console.log(`Server is listening on PORT: ${PORT}`)
});