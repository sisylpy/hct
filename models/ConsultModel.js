/**
 * Created by lipeiyi on 2018/3/29.
 */

var connPool = require("./ConnPool");
var async = require('async');
var randomString =require("randomstring"); //产生随机字符串模块


module.exports = {

   // kefuSocket: function (req, res, kefuSocket) {
   //
   //   pool = connPool();
   //   pool.getConnection(function (err, conn) {
   //     if(err) {
   //       res.send("数据库链接错误。" + err.message);
   //       return;
   //     }
   //
   //
   //     function aa() {
   //       console.log('000000');
   //       kefuSocket();
   //
   //       console.log(kefuSocket);
   //
   //     }
   //
   //     aa();
   //     console.log('1111');
   //
   //     console.log(kefuSocket);
   //
   //
   //     var kefuName = kefuSocket['username'];
   //     var kefusoketId = kefuSocket['sockedId'];
   //     var kefuSocketSql = 'UPDATE  user SET socketId = ?  WHERE nicheng = ?';
   //     var param = [kefuName,kefusoketId];
   //     conn.query(kefuSocketSql,param,function (err, rs) {
   //       if(err) {
   //         res.send("数据库查询错误。" + err.message);
   //         return;
   //       }
   //       // res.render('index', {rs: rs});
   //       console.log('chg');
   //
   //     })
   //     conn.release();
   //
   //   })
   //
   // },


  //先不用
  //   personNo: function (req, res) {
  //     pool = connPool();
  //
  //     pool.getConnection(function (err, conn) {
  //       if(err) {
  //         res.send("数据库链接错误。" + err.message);
  //         return;
  //       }
  //
  //       var addConsultUser  = 'INSERT INTO consultUser (consultTime, socketId) values (current_timestamp,1)'
  //       var personNoSql = 'SELECT * FROM consult ORDER BY consultId DESC LIMIT 1 '
  //
  //       async.series({
  //         one: function (callback) {
  //           conn.query(addConsultUser,function (err, rs) {
  //             if(err) {
  //               res.send("数据库查询错误" + err.message);
  //               return;
  //             }
  //             callback(null, rs);
  //
  //             console.log('charu chenggong ');
  //           })
  //         },
  //         two: function (callback) {
  //           console.log('000000000');
  //
  //           conn.query(personNoSql,function (err, rs) {
  //             if(err) {
  //               res.send("数据库查询错误。" + err.message);
  //               return;
  //             }
  //             callback(null, rs);
  //             })
  //
  //         }
  //       },function (err, results) {
  //         rs = results['two'];
  //         console.log(rs);
  //
  //         console.log("=======================");
  //         console.log(rs[0]['persnoNo']);
  //           res.render('consult',{rs:rs});
  //         }
  //       )
  //       conn.release();
  //
  //     })
  //   },

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
        var maxtime = now - (new Date(rs[0].chattime)).getTime();
        var currentServer = rs[0];  // 当前客服
        for(var i = 0; i < rs.length; i++){
            if((now - (new Date(rs[i].chattime)).getTime()) > maxtime ){
                maxtime = now - (new Date(rs[i].chattime)).getTime();
                currentServer = rs[i];
            }
        }
        res.render('consult', {rs:currentServer,clientId:clientId});
      });
      conn.release();
    })
  },


  consultList: function (req, res) {
    pool = connPool();

    pool.getConnection (function (err, conn) {
      if (err) {
        res.send("数据库链接错误"+ err.message);
        return;
      }

      var consultSql = 'SELECT * FROM consultUser WHERE status = 1';

      conn.query(consultSql,function (err, rs) {
        if (err) {
          res.send("数据库查询错误。" + err.message);
          return;
        }
        rsConsult = rs;
        req.session.loginbean = loginbean;
        res.render('admin', {rsConsult: rsConsult, loginbean: loginbean});
      })
      conn.release();
    })



  }





}