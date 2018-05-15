/**
 * Created by lipeiyi on 2018/3/29.
 */

var http = require('http');
var io = require('socket.io')(http);
var _ = require('underscore');
var moment = require('moment');
var connPool = require("./models/ConnPool");
var pool = connPool();
var news = io
  .of('/news')
  .on('connection', (socket) => {
    socket.emit('item', {news: 'item'});
  });

// 客户端
var client_chat = io.of('/client/consult');

client_chat.on('connection', (socket) => {
  var client_ip = socket.handshake.headers['x-forwarded-for'] || socket.handshake.address;   // 获取客户端ip


  socket.on('disconnect', () => {
    console.log("client_tuichule ");
    //todo:---1，退出后修改客户状态为下线状态
  });

  // 监听客户端输入事件
  socket.on('msging', (obj) => {
    // 推送给相应的客服 在客服端进行显示
    server_chat.to(obj.server_socketId).emit('msging', {
      client_id: obj.client_id,
      client_ip: client_ip,
      msg: obj.msg
    });
  });

  // 客户端完成输入事件
  socket.on('message', (obj) => {
    // 将聊天加入数据库
    pool.getConnection((err, conn) => {
      var messageAddSql = 'insert into message (userid,client_ip,message,client_id,whosaid,chattime) values(?,?,?,?,?,current_timestamp)';
      var param = [obj.server_uid, client_ip, obj.msg, obj.client_id, 'C'];
      conn.query(messageAddSql, param, (err, rs) => {
        if (err) {
          console.log(err.message);
        }
        conn.release();
      });
    });

    // 推送给客服
    server_chat.to(obj.server_socketId).emit('message', {
      client_id: obj.client_id,
      client_ip: client_ip,
      msg: obj.msg,
      chattime: moment().format('YYYY-MM-DD HH:mm:ss')
    })
  });

  // 客户端打开聊天页面
  socket.on('client_join', (obj) => {
    socket.join(obj.client_id);
  });
});

// 客服
var server_chat = io.of('/admin/login');

server_chat.on('connection', (socket) => {
  console.log("server_consult....");
  socket.on('disconnect', () => {
    console.log("server_tuichule ");
  });

  /**
   * 监听客服上线
   */
  socket.on('server_join', (obj) => {
    console.log(obj);
    socket.join(obj.server_socketId);
  });

  // 监听客服端完成输入事件
  socket.on('message', (obj) => {
    console.log(obj);
    // 将聊天加入数据库
    pool.getConnection((err, conn) => {
      var messageAddSql = 'insert into message (userid,client_ip,message,client_id,whosaid,chattime) values(?,?,?,?,?,current_timestamp)';
      var param = [obj.server_uid, obj.client_ip, obj.msg, obj.client_id, 'S'];
      conn.query(messageAddSql, param, (err, rs) => {
        if (err) {
          console.log(err.message);
        }
        conn.release();
      });
    });

    // 推送给客户端
    client_chat.to(obj.client_id).emit('message', {
      client_id: obj.client_id,
      client_ip: obj.client_ip,
      msg: obj.msg,
    })
  });

});


module.exports = io;
