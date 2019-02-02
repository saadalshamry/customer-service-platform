var express = require('express');
var router = express.Router();

// ROUTES 

// DASHBOARD
router.get('/dashboard', function (req, res) {

});

// VIEW TECHNICIANS 
router.get('/technicians/view', function (req, res) {

});

// ADD TECHNICIAN
router.post('/technicians/add', function (req, res) {

});

// DELETE TECHNICAN
router.get('/technicians/delete/:id', function (req, res) {

});

// VIEW CSRS
router.get('/csrs/view', function (req, res) {

});

// ADD CSR
router.post('/csrs/add', function (req, res) {

});

// DELETE CSR
router.get('/csrs/delete/:id', function (Req, res) {

});



module.exports = router;