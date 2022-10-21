const Helper = require("../helper/data");
const passport = require('passport');
const bcrypt = require('bcrypt');
const session = require('express-session');


/**
* admin  Dashboard
*/
module.exports.adminDashboardPage = (req,res)=>{
    var secretKey = Helper.adminUrlSecretKey();
    res.render(Helper.findView('dashboard'),{
        title: 'Dashboard',
        layout: 'dashboard_layout',
        admin: Helper.getAdminSession(req),
        secret_key: secretKey
    });
};


/**
* Login form
*/
module.exports.adminLoginPage = (req,res)=>{
    var isLoggedIn = Helper.isAdminLoggedIn(req);
    if (isLoggedIn){
        var secretKey = Helper.adminUrlSecretKey();
        return res.redirect('/adminpanel/dashboard/'+secretKey);
    }
    res.render(Helper.findView('login'), { title: 'Please Login'});
};

/**
* admin login post
*/
module.exports.adminLoginPost = (req,res,next) => {
    var username = req.body.username;
    var password = req.body.password;
    var isAuth =  Helper.adminAuthebticate(username,password).then(data => {
        if(!data.flag){
            req.flash('error_msg',data.msg);
            res.redirect('/adminpanel/login');
            next();
        }else{
            var secretKey = Helper.adminUrlSecretKey();
            Helper.setAdminSession(req,data.admin);
            req.flash('success_msg','welcome');
            res.redirect('/adminpanel/dashboard/'+secretKey);
            next();
        }
    });
};


/**
* admin logout
*/
module.exports.adminLogout = (req,res)=>{
    Helper.destroyAdminSession(req);
    res.redirect('/adminpanel/login');
};
