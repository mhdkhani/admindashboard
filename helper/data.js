const path = require('path');
const session = require('express-session');
const http = require("http");
const https = require("https");
const Admin = require("../models/admins");
const SecretKeyModel = require("../models/secrets");
const bcrypt = require('bcrypt');

module.exports.findView = function (fileName) {
    var views = path.join(__dirname, '../views');
    var filepath = path.join(views, fileName + '.ejs');
    return filepath;
};


/**
 * check admin is logged in or not
 */
module.exports.isAdminLoggedIn = function (req) {
    var flag = false;
    if (req.session && req.session.current_admin) {
        flag = true;
    }
    return flag;
};


/**
 * set admin session
 */
module.exports.setAdminSession = function (req, admin) {
    var sess = req.session;
    sess.current_admin = admin;
};


/**
 * get admin session
 */
module.exports.getAdminSession = function (req) {
    var sess = req.session;
    return sess.current_admin ;
};


/**
 * Admin Logout
 */
module.exports.destroyAdminSession = function (req){
    req.session.destroy();
};

/**
 * Admin LoginPost
 */
const adminAuthebticate = async (email, password) => {
    var flag = false;
    var msg = '';
    var response = [];
    return Admin.findOne({email:email},function (err, admin){
    }).then(admin => {
        if (admin){
            var flag = true;
        }else{
            var flag = false;
            msg = 'Email not found.'
        }
        response['flag'] = flag;
        response['msg'] = msg;
        response['admin'] = admin;
         return response;
    }).catch(err => {
        response['flag'] = false;
        response['msg'] = err.message;
         return response;
    });
};
module.exports.comparePassword = function (pass){

};


/**
 * New Admin Admin
 */
module.exports.newAdmin = function () {
    var password  = 123456;
    const newAdmin = new Admin({
        firstname: 'omid',
        lastname: 'khani',
        email: 'mahdikhani60@yahoo.com',
        password: password
    });
    bcrypt.genSalt(10, (err, salt) =>
        bcrypt.hash(newAdmin.password, salt,
            (err, hash) => {
                if (err) throw err;
                //save pass to hash
                newAdmin.password = hash;
                //save user
                newAdmin.save()
                    .then((value) => {
                    })
                    .catch(value => console.log(value));
            }));
};


/**
 * generate admin secret key
 */
const adminUrlSecretKey = function (){
    var secret = makeSecretKey(20);
    const newSecret = new SecretKeyModel({key: secret});
    newSecret.save()
    return secret;
};

function makeSecretKey(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

module.exports.adminAuthebticate = adminAuthebticate;
module.exports.adminUrlSecretKey = adminUrlSecretKey;
