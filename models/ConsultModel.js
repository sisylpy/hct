/**
 * Created by lipeiyi on 2018/3/29.
 */

var connPool = require("./ConnPool");
var async = require('async');


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

      var consultSql = 'SELECT * FROM user WHERE status = 1';
      conn.query(consultSql,function (err, rs) {
        if (err) {
          res.send("数据库查询错误。" + err.message);
          return;
        }
        console.log(rs.length);
        res.render('consult', {rs:rs});
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