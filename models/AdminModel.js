var connPool = require("./ConnPool");
var LoginBean = require("../jsBean/LoginBean");
var async = require('async');


module.exports = {

    //管理员登陆功能：
    //1，把自己的状态改为在线；
    //2，查询Consult在线客户；
    adminlogin: function (req, res) {

        pool = connPool();
        // 从pool中获取连接(异步,取到后回调)
        pool.getConnection(function (err, conn) {
            if (err) {
                res.send("获取连接错误,错误原因:" + err.message);
                return;
            }

            var userSql = 'select uid,nicheng,socketId from user where email=? and pwd=?';
            var param = [req.body['email'], req.body['pwd']];
            var socket_id = '';
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
                            loginbean.uid = rs[0].uid;
                            loginbean.nicheng = rs[0].nicheng;
                            loginbean.socketId = rs[0].socketId;
                            req.session.loginbean = loginbean;
                            var statusSql = 'update user set status = 1 where uid = ?';
                            var statsParam = loginbean.uid;

                            conn.query(statusSql, statsParam, function (err, rs) {
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
                    var consultSql = 'SELECT userid,client_id,message,client_ip,max(chattime) lastchattime FROM message WHERE userid = '+loginbean.uid+' GROUP BY client_id';
                    conn.query(consultSql, function (err, rs) {
                        if (err) {
                            res.send("数据库查询错误。" + err.message);
                            return;
                        }
                        callback(null, rs);
                    })

                }
            }, function (err, results) {
                rsConsult = results['two'];
                res.render('admin', {rsConsult: rsConsult, loginbean: loginbean});
            });
            conn.release();
        });
    },


//管理员退出
//1，修改自己的下线状态；
    adminLogout: function (req, res) {

        pool = connPool();
        pool.getConnection(function (err, conn) {
            if (err) {
                res.send("获取数据库错误，错误原因：" + err.message)
                return;
            }

            var logoutSql = 'update user set status = 0 where uid = ?';
            var userIdParam = req.session.loginbean['uid'];

            console.log(req.session.loginbean['uid']);
            conn.query(logoutSql, userIdParam, function (err, rs) {
                if (err) {
                    res.send("退出修改状态错误" + err.message);
                    return;
                }
                req.session.destroy(function (err) {
                    res.redirect('login');

                });
                // res.redirect('login');

            })
            conn.release();

        });

    },


//无用！
    adminloginbean: function (req, res, logenbean) {

        pool = connPool();
        // 从pool中获取连接(异步,取到后回调)
        pool.getConnection(function (err, conn) {
            if (err) {
                res.send("获取连接错误,错误原因:" + err.message);
                return;
            }

            var userSql = 'select uid,nicheng,socketId from user where email=? and pwd=?';
            var param = [req.body['email'], req.body['pwd']];
            async.series({
                one: function (callback) {
                    conn.query(userSql, param, function (err, rs) {
                        if (err) {
                            res.send("数据库错误,错误原因:" + err.message);
                            return;
                        }
                        console.log(rs);
                        console.log(11111);
                        if (rs.length > 0) {
                            loginbean = new LoginBean();
                            loginbean.uid = rs[0].uid;
                            loginbean.nicheng = rs[0].nicheng;
                            loginbean.socketId = rs[0].socketId;
                            req.session.loginbean = loginbean;
                            var statusSql = 'update user set status = 1 where uid = ?';
                            var statsParam = loginbean.uid;

                            conn.query(statusSql, statsParam, function (err, rs) {
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

                    var consultSql = 'SELECT * FROM consultUser WHERE status = 1';
                    conn.query(consultSql, function (err, rs) {
                        if (err) {
                            res.send("数据库查询错误。" + err.message);
                            return;
                        }
                        callback(null, rs);
                    })

                }
            }, function (err, results) {
                rsConsult = results['two'];
                res.render('adminLogin', {rsConsult: rsConsult, loginbean: loginbean});
            });

            conn.release();
        });
    }


};