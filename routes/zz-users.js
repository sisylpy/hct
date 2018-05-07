var express = require('express');
var router = express.Router();
var userModel = require('../models/UserModel');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
//
// router.all('/login', function(req, res, next) {
//
//   subflag = req.body['subflag'];
//   if(subflag==undefined){
//     res.render('login');
//   }else{
//     userModel.login(req,res);
//   }
//
// });
//
//
//
//
// router.get('/articles', function(req, res, next) {
//   loginbean = checkSession.check(req, res);
//   if (!loginbean) {
//     res.render('login');
//   }
//   else {
//     articleModel.articleList(req, res, loginbean);
//   }
//
// });
//
//
//
//
//
// router.get('/kefu', function(req, res, next) {
//
//   // loginbean = req.session.loginbean;
//   // consult.personNo(req,res);
//   res.render('kefu');
//
// });
//
// router.get('/chat', function(req, res, next) {
//
//   // loginbean = req.session.loginbean;
//   // questionModel.queList(req,res,loginbean);
//   res.render('chat');
//
// });
//
//
// router.get('/editArticle', function (req, res) {
//
//   loginbean = checkSession.check(req, res);
//   if (!loginbean) {
//     res.render('login');
//   }
//   else {
//     articleModel.editArticle(req, res);
//   }
// });
//
//
// router.get('/addArticle', function (req, res) {
//   loginbean = checkSession.check(req, res);
//   if (!loginbean) {
//     res.render('login');
//   }
//   else {
//     res.render('add');
//   }
// });
//
//
// router.post('/saveArticle', function (req, res) {
//   loginbean = checkSession.check(req, res);
//   if (!loginbean) {
//     res.render('login');
//   }
//   else {
//     articleModel.saveArticle(req, res);
//   }
// });
//
//




module.exports = router;
