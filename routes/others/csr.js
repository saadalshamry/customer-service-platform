var express = require('express');
var router = express.Router();

// ROUTES 

// DASHBOARD
router.get('/dashboard', function (req, res) {

});

// ADD NEW TICKET (page)
router.get('/ticket/add', function (req, res) {

});

// ADD NEW TICKET
router.post('/ticket/add', function (req, res) {

});


// EDIT TICKET (page)
router.get('/ticket/edit/:id', function (req, res) {

});

// EDIT TICKET 
router.post('/ticket/edit/:id', function (req, res) {

});

// DELETE TICKET
router.get('/ticket/delete/:id', function (req, res) {

});


module.exports = router;