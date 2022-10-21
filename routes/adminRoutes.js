const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const Helper = require("../helper/data");
const {ensureAuthenticated} = require("../../../config/auth.js")
const adminController = require('../controllers/adminController');

//login form
router.get('/login',adminController.adminLoginPage);

//login post
router.post('/login',adminController.adminLoginPost);

//logout post
router.get('/logout',adminController.adminLogout);

//dashboard page
router.get('/dashboard/:key',adminController.adminDashboardPage);

module.exports  = router;
