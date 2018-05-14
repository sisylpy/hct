/**
 * Created by lipeiyi on 2018/4/11.
 */

var express = require('express');
var router = express.Router();
var articleModel = require('../models/ArticleModel');
var checkSession = require('../jsBean/CheckSession');

var adminModel = require('../models/AdminModel');
var consultModel = require('../models/ConsultModel');
var MessageModel = require('../models/MessageModel');



// 富文本xheditor 的上传文件功能，因为上传按钮没有显示，所以没用。
// var multiparty = require('multiparty');
// var util = require('util');
// var fs = require('fs');

//后台登陆
router.all('/login', function (req, res, next) {
  subflag = req.body['subflag'];
  if(subflag==undefined){
    res.redirect('/adminLogin');
  }else{
    adminModel.adminlogin(req,res);
  }
})

router.get('/message/:client_id', (req, res, next) => {
  MessageModel.getMessageByClientId(req,res);
    // var client_id = req.header['client_id'];
});

//后台退出
router.get('/logout', function (req, res, next) {
  adminModel.adminLogout(req,res);
});


//TODO:客服功能
//后台客服
router.get('/kefu', function (req, res, next) {
  loginbean = checkSession.check(req, res);
  if (!loginbean) { return;}
  else {
    consultModel.consultList(req, res);
  }

});

//后台文章管理
router.get('/articles', function (req, res, next) {

  loginbean = checkSession.check(req, res);
  if (!loginbean) { return;}
  else {
    articleModel.articleList(req, res, loginbean);
  }

});


//后台文章二级菜单导航
router.get('/search', function (req, res, next) {

  loginbean = checkSession.check(req, res);
  if (!loginbean) {return;}
  else {
    articleModel.searchArticle(req, res);
  }
});

//后台文章类型索引
router.get('/searchType', function (req, res, next) {

  loginbean = checkSession.check(req, res);
  if (!loginbean) {return;}
  else {
    articleModel.searchType(req, res);
  }
});


router.get('/editArticle', function (req, res) {

  loginbean = checkSession.check(req, res);
  if (!loginbean) {return;}
  else {
    articleModel.editArticle(req, res);
  }
});


router.get('/addArticle', function (req, res) {

  loginbean = checkSession.check(req, res);
  if (!loginbean) { return;}
  else {
    res.render('add', {loginbean: loginbean});
  }
});


router.post('/saveArticle', function (req, res) {
  loginbean = checkSession.check(req, res);
  if (!loginbean) {return;}
  else {
    articleModel.saveArticle(req, res);
  }
});

//
router.post('/editSave', function (req, res) {
  loginbean = checkSession.check(req, res);
  if (!loginbean) {return;}
  else {
    articleModel.editSave(req, res);
  }
});


//上传图片
// router.post('/uploadImg', function (req, res) {
//   loginbean = checkSession.check(req, res);
//   if (!loginbean) {return;}
//   else {
//
//     var form = new multiparty.Form();
//     //设置编码
//     form.encoding = 'utf-8';
//     //设置文件存储路径
//     form.uploadDir = "./uploadtemp/";
//     //设置单文件大小限制
//     form.maxFilesSize = 2 * 1024 * 1024;
//     //form.maxFields = 1000;  设置所以文件的大小总和
//
//     form.parse(req, function(err, fields, files) {
//       uploadurl='/images/upload/'
//       file1 = files['filedata'];
//       paraname = file1[0].fieldName;  //参数名filedata
//       originalFilename = file1[0].originalFilename; //原始文件名
//       tmpPath = file1[0].path;//uploads\mrecQCv2cGlZbj-UMjNyw_Bz.txt
//       fileSize = file1[0].size; //文件大小
//
//       var timestamp=new Date().getTime(); //获取当前时间戳
//       uploadurl += timestamp+originalFilename
//       newPath= './public'+uploadurl;
//
//       var fileReadStream = fs.createReadStream(tmpPath);
//       var fileWriteStream = fs.createWriteStream(newPath);
//       fileReadStream.pipe(fileWriteStream); //管道流
//       fileWriteStream.on('close',function(){
//         fs.unlinkSync(tmpPath);    //删除临时文件夹中的图片
//         console.log('copy over');
//         res.send('{"err":"","msg":"'+uploadurl+'"}')
//       });
//     });
//     //-----------------------------------------
//     //res.send('上传')
//   }
//
//
//
// });






module.exports = router;
