var connPool = require("./ConnPool");


var pool = connPool();
module.exports = {

    //查询自己的咨询客户
  getMessageByClientId: function (req, res) {
    var client_id = req.params.client_id;
    // 从pool中获取连接(异步,取到后回调)
    pool.getConnection(function (err, conn) {
      if (err) {
        res.send("获取连接错误,错误原因:" + err.message);
        return;
      }

      var consultSql = 'SELECT userid,client_id,message,client_ip,whosaid,chattime FROM message WHERE client_id="' + client_id + '"';
      conn.query(consultSql, function (err, rs) {
        if (err) {
          res.send("数据库查询错误。" + err.message);
          return;
        }
        console.log("查询聊天记录数据：");
        res.json(rs);
      })
    });
  },




}