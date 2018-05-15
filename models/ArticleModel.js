var connPool = require("./ConnPool");
var async = require('async');
var LoginBean = require("../jsBean/LoginBean");

module.exports = {


  /**
   * 前台首页推荐文章
   * status = 1 是推荐文章
   */
  statusArtcles: function (req, res) {
    console.log("0000000");
    pool = connPool();
    pool.getConnection(function (err, conn) {
      if (err) {
        res.send("获取连接错误,错误原因:" + err.message);
        return;
      }
      var statusSql = 'select aid,title, titleLabel,typeid from articleList  where status =1 order by typeid asc';

      conn.query(statusSql,function (err, rs) {
        if(err) {
          res.send("数据库查询错误" + err.message);
        }
        res.render('index', {rs: rs});
      });
      conn.release();

    })

  },


  artclePage: function (req, res) {
    console.log('session is here');
    console.log();
    pool = connPool();
    pool.getConnection(function (err, conn) {
      if (err) {
        res.send("获取连接错误,错误原因:" + err.message);
        return;
      }
      var typeid = req.query.typeid == undefined ? 0 : req.query.typeid;
      if(typeid == 0){
        var statusSql = 'select aid,title, titleLabel,typeid from articleList where status=1';
      }else {
        var statusSql = 'select aid,title, titleLabel,typeid from articleList where status=1 and typeid=' + typeid;
      }

      conn.query(statusSql,function (err, rs) {
        if(err) {
          res.send("数据库查询错误" + err.message);
        }
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
        typeId = 1;
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
        console.log('000000');
        console.log(rs);
        res.render('adminArticles', {rs: rs, typeId: typeId,loginbean:loginbean,type:'all'});
      });
      conn.release();
    });
  },



  editArticle: function (req, res) {

    aid = req.query['aid'];
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
      editSaveSql = 'UPDATE articleList SET typeid = ?,title = ?, subTitle = ?, content = ? WHERE aid = ' + req.body['aid'] + '';

      pool = connPool();
      var parm = [typeid,title,subTitle,content];
      pool.getConnection(function (err, conn) {
        conn.query(editSaveSql, parm,function (err, rs) {
          if (err) {
            res.send("数据库错误,错误原因:" + err.message);
            return;
          }
          res.send("<script> alert('save success'); location.href = '../admin/articles'</script>");
        });
        conn.release();
      });
    } else {
      res.send('文章的参数aid不正确')
    }

  },


  // ???????????????
  saveArticle: function (req, res) {
    loginbean = req.session.loginbean;
    pool = connPool();
    //从pool中获取连接(异步,取到后回调)
    pool.getConnection(function (err, conn) {

      var userAddSql = 'insert into articleList (typeid,title,content,uid) values(?,?,?,?)';
      var param = [req.body['typeId'], req.body['aid'], req.body['title'], req.body['content'],loginbean.uid];

      // var param = [req.body['email'], req.body['pwd']];

      console.log('000');
      console.log(param);
      conn.query(userAddSql, param, function (err, rs) {
        if (err) {
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

      var param = [req.query['customRadio']];
      var typeId = req.query['typeid'];
      console.log(typeId);
      param = param!=null?param:'all';
      if (param == 'all'){
        var searchSql = 'SELECT * FROM articleList where typeid='+typeId;
        var type = 'all';
      }else {
        var searchSql = 'SELECT * FROM articleList WHERE status = 1 and typeid='+typeId;
        var type='put';
      }
        conn.query(searchSql, function (err, rs) {
          if (err) {
            res.send("数据库错误,错误原因:" + err.message);
            return;
          }
          res.render('adminArticles',{rs:rs,type:type});
        });
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
        res.render('adminArticles', {rs: rs,loginbean:loginbean,type:'all',typeId:typeId});
      });
      conn.release();
    });



  }



};
