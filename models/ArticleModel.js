var connPool = require("./ConnPool");
var async = require('async');
var LoginBean = require("../jsbean/LoginBean");

module.exports = {


  /**
   * 前台首页推荐文章
   * status = 3 是推荐文章
   */
  statusArtcles: function (req, res) {
    console.log("0000000");
    pool = connPool();
    pool.getConnection(function (err, conn) {
      if (err) {
        res.send("获取连接错误,错误原因:" + err.message);
        return;
      }
      var statusSql = 'select aid,title, titleLabel from articleList  where status = 3';

      console.log("11111111");
      conn.query(statusSql,function (err, rs) {
        if(err) {
          res.send("数据库查询错误" + err.message);
        }
        console.log(rs[0]['titleLabel']);
        // res.send(rs);
        res.render('index', {rs: rs});

      });
      conn.release();

    })

  },




  /**
   * 首页面默认显示第一个菜单
   */
  articleList: function (req, res,loginbean) {
    /**
     * typeId 从nav.ejs 传过来，默认是"1"
     */
    typeId = req.query['typeId'];
    pool = connPool();
    pool.getConnection(function (err, conn) {
      if (err) {
        res.send("获取连接错误,错误原因:" + err.message);
        return;
      }
      if (typeId == undefined) {
        var listSql = 'select aid,title,looknum, updatetime from articleList  where typeid = 1';
      } else {
        var param = [typeId];
        var listSql = 'select aid,title,looknum, updatetime from articleList  where typeid = ?';
      }
      conn.query(listSql, param, function (err, rs) {
        if (err) {
          res.send("数据库错误,错误原因:" + err.message);
          return;
        }
        // loginbean = new LoginBean();
        // loginbean.id = rs[0].uid;
        // loginbean.nicheng = rs[0].nicheng;
        // req.session.loginbean = loginbean;
        res.render('adminArticles', {rs: rs, typeId: typeId,loginbean:loginbean});
      });
      conn.release();
    });
  },



  editArticle: function (req, res) {

    aid = req.query['aid'];
    // var editSaveSql = 'UPDATE articleList SET title =' + title + ',subTitle = '+ subTitle +', content = ' + content + ' WHERE aid = ' + req.body['aid'] +'';
    // var userAddSql = 'insert into articleList (typeid,title,content,uid) values(?,?,?,?)';
    // var param = [req.body['typeId'], req.body['title'], req.body['content'],loginbean.id];

    editSql = 'select aid,typeid, title,content, subTitle from articleList where aid=?';
      param = [aid];
      pool = connPool();
      pool.getConnection(function (err, conn) {
        if (err) {
          res.send("获取连接错误,错误原因:" + err.message);
          return;
        }
        conn.query(editSql, param, function (err, rs) {
          if (err) {
            res.send("数据库错误,错误原因:" + err.message);
            return;
          }
          res.render('detail', {rs: rs});
        });

        conn.release();
      });
  },

  editSave: function (req, res) {

    loginbean = req.session.loginbean;
    aid = req.body['aid'];
    if (aid != undefined) {


      typeid = req.body['typeid'];
      title = req.body['title'];
      subTitle = req.body['subTitle'];
      content = req.body['content'];
      editSaveSql = 'UPDATE articleList SET title = "tttt" , subTitle = "sss", content = "ccc" WHERE aid = ' + req.body['aid'] + '';

      pool = connPool();
      pool.getConnection(function (err, conn) {
        conn.query(editSaveSql, function (err, rs) {
          if (err) {
            res.send("数据库错误,错误原因:" + err.message);
            return;
          }

          // console.log(rs);
          // res.send("<script> alert('save success'); location.href = '../'</script>");
          // res.redirect('../'); //不能同时和上面的同时用；
          res.send('ok');
        });
        conn.release();
      });


    } else {
      res.send('meiyou id')
    }

  },


  // ???????????????
  saveArticle: function (req, res) {
    loginbean = req.session.loginbean;
    pool = connPool();
    //从pool中获取连接(异步,取到后回调)
    pool.getConnection(function (err, conn) {

      var userAddSql = 'insert into articleList (typeid,title,content,uid) values(?,?,?,?)';
      var param = [req.body['typeId'], req.body['title'], req.body['content'],loginbean.uid];

      // var param = [req.body['email'], req.body['pwd']];

      console.log('000');
      console.log(param);
      conn.query(userAddSql, param, function (err, rs) {
        if (err) {
          // console.log('insert err:',err.message);
          res.send("数据库错误,错误原因:" + err.message);
          return;
        }

        // res.send(rs);
        res.send("<script> alert('ask success'); location.href = '/admin/articles'</script>");
        // res.redirect('../'); //不能同时和上面的同时用；
      });
      conn.release();
    });

  },


  searchArticle: function (req, res) {
    loginbean = req.session.loginbean;
    pool = connPool();
    //从pool中获取连接(异步,取到后回调)
    pool.getConnection(function (err, conn) {

      var searchAllSql = 'SELECT * FROM articleList';
      var searchPutSql = 'SELECT * FROM articleList WHERE status = 3';
      var param = [req.query['customRadio']];
      console.log('00000');
console.log(param);
      
      if(param == 'all') {
        // console.log(param);
        conn.query(searchAllSql, function (err, rs) {
          if (err) {
            res.send("数据库错误,错误原因:" + err.message);
            return;
          }
          res.render('adminArticles',{rs:rs});
        });

      }else if (param == 'put') {
        // console.log(param);
        conn.query(searchPutSql, function (err, rs) {
          if (err) {
            res.send("数据库错误,错误原因:" + err.message);
            return;
          }

          // res.send('aa');
          // console.log(rs);
          res.render('adminArticles',{rs:rs})
          // res.render('admin',{rs:rs});
        });

      }
      conn.release();
    });

  },


  searchType: function (req,res) {

    typeId = req.query['typeId'];
    pool = connPool();
    pool.getConnection(function (err, conn) {
      if (err) {
        res.send("获取连接错误,错误原因:" + err.message);
        return;
      }
      if (typeId == undefined) {
        var listSql = 'select aid,title,looknum, updatetime from articleList  where typeid = 1';
      } else {
        var param = [typeId];
        var listSql = 'select aid,title,looknum, updatetime from articleList  where typeid = ?';
      }
      conn.query(listSql, param, function (err, rs) {
        if (err) {
          res.send("数据库错误,错误原因:" + err.message);
          return;
        }

        // res.send('a');
        // console.log(rs);
        // console.log('===========');
        // loginbean = new LoginBean();
        // loginbean.id = rs[0].uid;
        // loginbean.nicheng = rs[0].nicheng;
        // req.session.loginbean = loginbean;
        res.render('adminArticles', {rs: rs,loginbean:loginbean});
      });
      conn.release();
    });



  }



};
