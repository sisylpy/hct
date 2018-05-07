/**
 * Created by lipeiyi on 2018/4/26.
 */

var express = require('express');
var router = express.Router();
var checkSession = require('../jsbean/CheckSession');


router.get('/login',function (req, res,next) {

console.log(req.query['uid']);
  console.log("aaa");

})













module.exports = router;
