var connPool = require("./ConnPool");
var async = require('async');
var LoginBean = require("../jsBean/LoginBean");

module.exports = {

  /**
   * 前台首页推荐文章
   * status = 1 是推荐文章
   * todo: ajax todo!
   */
  statusArtcles: function (req, res) {
    pool = connPool();
    pool.getConnection(function (err, conn) {
      if (err) {
        res.send("获取连接错误,错误原因:" + err.message);
        return;
      }
      var statusSql = 'select aid,title, titleLabel,typeid from articleList  where status =1 order by typeid asc';

      conn.query(statusSql, function (err, rs) {
        if (err) {
          res.send("数据库查询错误" + err.message);
        }
        res.render('index', {rs: rs});
      });
      conn.release();
    })
  },


  /**
   * 前台---打开"国家规定"页面和点击"typeid"
   * todo:ajax todo!
   */
  artclePage: function (req, res) {
    var typeid = req.query.typeid == undefined ? 0 : req.query.typeid;
    pool = connPool();
    pool.getConnection(function (err, conn) {
      if (err) {
        res.send("获取连接错误,错误原因:" + err.message);
        return;
      }
      if (typeid == 0) {
        var statusSql = 'select aid,title, titleLabel,content,typeid from articleList order by typeid ,status desc';
      } else {
        var statusSql = 'select aid,title, titleLabel,typeid, content from articleList  where typeid=' + typeid;
      }
      conn.query(statusSql, function (err, rs) {
        if (err) {
          res.send("数据库查询错误" + err.message);
        }
        if (typeid == 0) {
          res.render('articlePage', {rs: rs});
        } else {
          res.render('articlePage', {rs: rs});
        }
      });
      conn.release();
    })
  },


  /**
   * search
   */
  search: function (req, res) {
    words = req.params['words'];
    searchSql = 'SELECT  title FROM articleList ';
    pool = connPool();
    pool.getConnection(function (err, conn) {
      if (err) {
        res.send("获取连接错误,错误原因:" + err.message);
        return;
      }
      conn.query(searchSql, function (err, rs) {
        if (err) {
          res.send("数据库错误,错误原因:" + err.message);
          return;
        }

        for(var i = 0; i < rs.length; i++) {
          console.log(rs[i]);
          // if(rs[i].indexOf("注销")>-1){
          //   console.log(rs[i]);
          // }
        }
      });

      conn.release();
    });


  },


  /**
   * 后台---首页面默认显示第一个菜单 默认是"1"
   */
  articleList: function (req, res, loginbean) {
    typeId = req.query['typeId'];
    pool = connPool();
    pool.getConnection(function (err, conn) {
      if (err) {
        res.send("获取连接错误,错误原因:" + err.message);
        return;
      }
      if (typeId == undefined) {
        typeId = 1;
        var listSql = 'select aid,title,looknum, updatetime,status from articleList  where typeid = 1';
      } else {
        var param = [typeId];
        var listSql = 'select aid,title,looknum, updatetime,status from articleList  where typeid = ?';
      }
      conn.query(listSql, param, function (err, rs) {
        if (err) {
          res.send("数据库错误,错误原因:" + err.message);
          return;
        }
        res.render('adminArticles', {rs: rs, typeId: typeId, loginbean: loginbean, type: 'all'});
      });
      conn.release();
    });
  },


  /**
   * 后台---修改文章
   */
  editArticle: function (req, res) {

    aid = req.query['aid'];
    editSql = 'select aid,typeid, title,content, subTitle,titleLabel, status from articleList where aid=?';
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
        console.log(rs);
        res.render('detail', {rs: rs});
      });

      conn.release();
    });
  },


  /**
   * 后台---保存新文章和修改文章
   */
  articleSave: function (req, res) {

    loginbean = req.session.loginbean;
    aid = req.body['aid'];
    uid = req.body['uid'];

    typeid = req.body['typeid'];
    title = req.body['title'];
    subTitle = req.body['subTitle'];
    content = req.body['content'];
    status = req.body['status'];
    titleLabel = req.body['titleLabel'];


    pool = connPool();
    pool.getConnection(function (err, conn) {
      if (err) {
        res.send("获取连接错误,错误原因:" + err.message);
        return;
      }

      if (aid !== '-1') {
        saveSql = 'UPDATE articleList SET typeid = ?,title = ?, subTitle = ?, content = ? , status = ? ,uid = ? , titleLabel = ?,updatetime = current_timestamp WHERE aid = ' + req.body['aid'] + '';

      } else {
        saveSql = 'INSERT INTO articleList (typeid,title, subTitle, content,status,uid,titleLabel,updatetime) values(?,?,?,?,?,?,?,current_timestamp)';
      }

      var parm = [typeid, title, subTitle, content, status, uid, titleLabel];
      conn.query(saveSql, parm, function (err, rs) {
        if (err) {
          res.send("数据库错误,错误原因:" + err.message);
          return;
        }

        res.send("<script> alert('save success'); location.href = '../admin/articles'</script>");
      });

      conn.release();
    });
  },


  /**
   * 后台---首页推荐 和 全部查询
   */
  searchStatus: function (req, res) {
    loginbean = req.session.loginbean;
    pool = connPool();
    //从pool中获取连接(异步,取到后回调)
    pool.getConnection(function (err, conn) {

      var param = [req.query['customRadio']];
      var typeId = req.query['typeid'];
      console.log(typeId);
      param = param != null ? param : 'all';
      if (param == 'all') {
        var searchSql = 'SELECT * FROM articleList where typeid=' + typeId;
        var type = 'all';
      } else {
        var searchSql = 'SELECT * FROM articleList WHERE status = 1 and typeid=' + typeId;
        var type = 'put';
      }
      conn.query(searchSql, function (err, rs) {
        if (err) {
          res.send("数据库错误,错误原因:" + err.message);
          return;
        }
        res.render('adminArticles', {rs: rs, type: type});
      });
      conn.release();
    });

  },


};


