var express = require('express');
var router = express.Router();
var consult = require('../models/ConsultModel');
var userModel = require('../models/UserModel');
var articleModel = require('../models/ArticleModel');
var checkSession = require('../jsBean/CheckSession');


//首页
router.get('/', function (req, res, next) {
  // res.render('index');
  articleModel.statusArtcles(req, res);
});


//公司注销
router.get('/logoutFlow', function (req, res, next) {
  res.render('logoutFlow');
});

//外资注册
router.get('/foreign', function (req, res, next) {
  res.render('foreign');
});

//资质审批
router.get('/orgLog', function (req, res, next) {
  res.render('organisationLogout');
});

//关于公司
router.get('/about', function (req, res, next) {
  res.render('aboutLtd');
});
//对话
router.get('/consult', function (req, res, next) {
  consult.consultReq(req, res);
});

//后台登陆
router.get('/admin', function (req, res, next) {
  res.render('adminLogin');
});


//文章
router.get('/article-page', function (req, res, next) {
  // res.render('article-page');
  articleModel.artclePage(req,res);

});

//ceshi
router.get('/chat/a', function (req, res, next) {

  res.render('chat');

});


//
//
// router.get('/qualifications', function(req, res, next) {
//
//   res.render('index');
//
// });
//
// router.get('/articles', function(req, res, next) {
//
//
// });


module.exports = router;
