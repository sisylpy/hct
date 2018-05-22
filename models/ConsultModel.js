/**
 * Created by lipeiyi on 2018/3/29.
 */

var connPool = require("./ConnPool");
var async = require('async');
var randomString =require("randomstring"); //产生随机字符串模块


module.exports = {

  //客户打开聊天页面，查询是否有在线客服
  consultReq: function (req, res) {
    pool = connPool();

    pool.getConnection (function (err, conn) {
      if (err) {
        res.send("数据库链接错误"+ err.message);
        return;
      }

      var consultSql = 'SELECT u.*,max(m.chattime) chattime FROM user u  LEFT JOIN message m on u.uid=m.userid WHERE status = 1 GROUP BY uid ';
      conn.query(consultSql,function (err, rs) {
        if (err) {
          res.send("数据库查询错误。" + err.message);
          return;
        }
        var clientId = randomString.generate(30)+(new Date().getTime());  // 随机产生客户端id
        var server = '';
        var now = (new Date()).getTime();
        var consultTime = (new Date()).toLocaleTimeString();

        if (rs.length > 0){
          var maxtime = now - (new Date(rs[0].chattime)).getTime();
          var currentServer = rs[0];  // 当前客服
          for(var i = 0; i < rs.length; i++){
            if((now - (new Date(rs[i].chattime)).getTime()) > maxtime ){
              maxtime = now - (new Date(rs[i].chattime)).getTime();
              currentServer = rs[i];
            }
          }
          res.render('consult', {rs:currentServer,clientId:clientId, consultTime:consultTime});
        }else {
          res.redirect('/orgLog')
          // res.send('aa');
          // res.render('contactBtn');
        }
      });
      conn.release();
    })
  },











}