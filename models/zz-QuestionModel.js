var connPool = require("./ConnPool");
var async = require('async');

module.exports = {
    // ask: function (req, res) {
    //     loginbean = req.session.loginbean;
    //     pool = connPool();
    //     //从pool中获取连接(异步,取到后回调)
    //     pool.getConnection(function (err, conn) {
    //         var userAddSql = 'insert into articleList (typeid,title,content,uid) values(?,?,?,?)';
    //         var param = [req.body['typeid'], req.body['title'], req.body['content'], loginbean.id];
    //         conn.query(userAddSql, param, function (err, rs) {
    //             if (err) {
    //                 // console.log('insert err:',err.message);
    //                 res.send("数据库错误,错误原因:" + err.message);
    //                 return;
    //             }
    //             res.send("<script> alert('ask success'); location.href = '../'</script>");
    //             // res.redirect('../'); //不能同时和上面的同时用；
    //         });
    //         conn.release();
    //     });
    // },
    queList: function (req, res, loginbean) {
        pool = connPool();
        //从pool中获取连接(异步,取到后回调)
        pool.getConnection(function (err, conn) {
            if (err) {
                res.send("获取连接错误,错误原因:" + err.message);
                return;
            }
            page = 1; //当前第几页
            if (req.query['page'] != undefined) {
                page = parseInt(req.query['page']);
                if (page < 1) {
                    page = 1;
                }
            }
            pageSize = 2; //页面显示数据多少条
            pointStart = (page - 1) * pageSize; //从第几条开始显示
            count = 0;
            countPage = 0;


            var countSql = 'select count(*) from articleList'; //查询分页
            var listSql = 'select aid,title,looknum,renum, finished, updatetime,createtime from articleList order by aid desc limit ?,?'; //查询文章
            var param = [pointStart, pageSize]; //查询参数


            async.series({  //异步流程
                    one: function (callback) {
                        conn.query(countSql, [], function (err, rs) {
                            count = rs[0]['count(*)']; //问题总条数
                            countPage = Math.ceil(count / pageSize); //Math.ceil 向上取整

                            if (page > countPage) {
                                page = countPage;
                                pointStart = (page - 1) * pageSize;
                                param = [pointStart, pageSize];

                            }
                            callback(null, rs);
                        })
                    },
                    two: function (callback) {
                        conn.query(listSql, param, function (err, rs) {
                            callback(null, rs);

                        });
                    }
                }, function (err, results) {

                rs = results['two'];
                    res.render('index', {loginbean: loginbean, rs: rs, page: page, count: count, countPage: countPage});

                }
            );
            conn.release();
        });
    },
    // detail: function (req,res) {
    //
    //     aid = req.query['aid'];
    //
    //     if(aid != undefined) {
    //
    //         updateSql = 'update articleList set looknum = looknum +1 where aid = ?';
    //         detailSql = 'select aid,title,content,uid,looknum,renum,finished,updatetime,createtime from articleList where aid=?';
    //         param = [aid];
    //         pool = connPool();
    //         pool.getConnection(function (err, conn) {
    //             async.series ({
    //                 one: function (callback) {
    //                     conn.query(updateSql, param, function (err, rs) {
    //                         if (err) {
    //                             res.send("数据库错误,错误原因:" + err.message);
    //                             return;
    //                         }
    //                         callback(null, rs);
    //                     });
    //                 },
    //                 two: function (callback) {
    //                     conn.query(detailSql, param, function (err, rs) {
    //                         if (err) {
    //                             res.send("数据库错误,错误原因:" + err.message);
    //                             return;
    //                         }
    //                         callback(null, rs);
    //                     });
    //                 }
    //                 },function (err,results) {
    //                 console.log(results);
    //                     rs = results['two'];
    //
    //                     res.send('aaaa');
    //                     // res.render('detail',{rs:rs});
    //                 }
    //             );
    //
    //             conn.release();
    //         });
    //
    //     }
    //     else {
    //         res.send('没传入id');
    //     }
    //
    // }
};