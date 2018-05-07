var connPool = require("./ConnPool");
var LoginBean = require("../jsbean/LoginBean");
var async = require('async');


module.exports = {
    zhuce: function (req, res) {
        pool = connPool();
        //从pool中获取连接(异步,取到后回调)
        pool.getConnection(function (err, conn) {
            if (err) {
                res.send("数据库链接错误。" + err.message);
                return;
            }
            var userAddSql = 'insert into user (email,pwd,nicheng,createtime) values(?,?,?,current_timestamp)';
            var param = [req.body['email'], req.body['pwd'], req.body['nicheng']];
            conn.query(userAddSql, param, function (err, rs) {
                if (err) {
                    errStr = err.message;
                    sendStr = "<script> ";

                    if (errStr.indexOf('emailuniq') > -1) {
                        sendStr += "alert('email重复');";
                    } else if (errStr.indexOf('nichenguiq') > -1) {
                        sendStr += "alert('昵称重复');";
                    } else {
                        sendStr += "alert('其他异常');";
                    }
                    sendStr += " history.back();</script>";
                    res.send(sendStr);
                    return;
                }
                res.redirect(307,'./login');
                // res.send("<script>alert('SUCCESS!'); location.href='/'; </script>");
            });
            conn.release();
        });
    },



    login: function (req, res) {
        pool = connPool();
        // 从pool中获取连接(异步,取到后回调)
        pool.getConnection(function (err, conn) {
            if (err) {
                res.send("获取连接错误,错误原因:" + err.message);
                return;
            }

            var userSql = 'select uid,nicheng from user where email=? and pwd=?';
            var param = [req.body['email'], req.body['pwd']];
            conn.query(userSql, param, function (err, rs) {
                if (err) {
                    res.send("数据库错误,错误原因:" + err.message);
                    return;
                }
                console.log(rs);
                if (rs.length > 0) {
                    loginbean = new LoginBean();
                    loginbean.id = rs[0].uid;
                    loginbean.nicheng = rs[0].nicheng;
                    req.session.loginbean = loginbean;
                    res.render('admin');
                } else {
                    res.send("email/密码错误");
                }
            });
            conn.release();
        });

    },


    adminlogin: function (req,res) {


      pool = connPool();
      // 从pool中获取连接(异步,取到后回调)
      pool.getConnection(function (err, conn) {
        if (err) {
          res.send("获取连接错误,错误原因:" + err.message);
          return;
        }

        var userSql = 'select uid,nicheng from user where email=? and pwd=?';
        var param = [req.body['email'], req.body['pwd']];
        var consultSql = 'SELECT * FROM consultUser WHERE status = 1';
        async.series({
            one: function (callback) {
              conn.query(userSql, param, function (err, rs) {
                if (err) {
                  res.send("数据库错误,错误原因:" + err.message);
                  return;
                }
                console.log(rs);
                if (rs.length > 0) {
                  loginbean = new LoginBean();
                  loginbean.id = rs[0].uid;
                  loginbean.nicheng = rs[0].nicheng;
                  req.session.loginbean = loginbean;
                  var statusSql = 'update user set status = 1 where uid = ?';
                  var statsParam = loginbean.id;

                  conn.query(statusSql,statsParam,function (err, rs) {
                    if (err) {
                      res.send("status ,错误原因:" + err.message);
                      return;
                    }
                    callback(null, rs);
                  })
                } else {
                  res.send("email/密码错误");
                }
              });

            },
            two: function (callback) {
              conn.query(consultSql,function (err, rs) {
                if(err) {
                  res.send("数据库查询错误。" + err.message);
                  return;
                }
                callback(null, rs);
              })

            }
          },function (err, results) {
            rsConsult = results['two'];
          res.render('adminLogin',{rsConsult:rsConsult});
          }
        );

        conn.release();
      });
    }
};