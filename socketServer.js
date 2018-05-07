/**
 * Created by lipeiyi on 2018/3/29.
 */

var http = require('http');
var Consult = require('./models/ConsultModel');
var io = require('socket.io')(http);

// var consultIo = io.of('/consult');
var _ = require('underscore');

var connPool = require("./models/ConnPool");


// var io = require('socket.io')(80);

var chat = io.of('/admin/login');

chat.on('connection', function (socket) {
  console.log("consult....");
  socket.emit('a message', {
    that: 'only'
    , '/consult': 'will get'
  });

  socket.emit('a messag', {
    everyone: 'in'
    , '/consult': 'will get'
  });
  socket.on('disconnect',function () {
    console.log("tuichule ");
  })
  
});



var news = io
  .of('/news')
  .on('connection', function (socket) {
    socket.emit('item', {news: 'item'});
  });


//


// io.on('connection',function (socket) {
//
//   // //有客户打开对话界面，提示查询数据库第几位顾客
//   // Consult.personNo(function (perno) {
//   //   socket.emit('personNo',perno);
//   //   console.log(perno);
//   // });
//   console.log('connection is established!');
//
//   socket.on('openChatView',function () {
//
//     //查询在线客服
//     // Consult.checkOnlineKefu (function (isonline) {
//     //   if(isonline){
//     //     Consult.checkFreeKefu (function (hasFree) {
//     //       if(hasFree) {
//     //         socket.emit("kefuServer",dataKefu)
//     //       }else {
//     //         socket.emit('waitKefu',"客服目前忙，请稍等。。。")
//     //       }
//     //     })
//     //   } else  {
//     //     socket.emit("getoffwork","抱歉，没有在线客服，请用其它方式联系。")
//     //   }
//     //
//     // })
//
//     //查询不在输入中的客服
//
//     //发送chat界面客服的名字和手机号码
//
//
//   })
//
//
//   //管理员登陆
//   socket.on('adminSocket',function (data) {
//     var kefuSocket = {};
//
//     kefuSocket['username'] = data;
//     kefuSocket['sockedId'] = socket.id;
//
//     socket.role = 1;
//
//     pool = connPool();
//     pool.getConnection(function (err, conn) {
//       if(err) {
//         res.send("数据库链接错误。" + err.message);
//         return;
//       }
//
//       var kefuName = kefuSocket['username'];
//       var kefusoketId = kefuSocket['sockedId'];
//       var kefuSocketSql = 'UPDATE  user SET socketId = ?  WHERE nicheng = ?';
//       var param = [kefusoketId,kefuName];
//       conn.query(kefuSocketSql,param,function (err, rs) {
//         if(err) {
//           res.send("数据库查询错误。" + err.message);
//           return;
//         }
//         console.log('chg');
//
//       })
//       conn.release();
//     })
//   });
//
//
// //咨询用户登陆
//   socket.on('consultSocket',function () {
//     socket.role = 2;
//     pool = connPool();
//     pool.getConnection(function (err, conn) {
//       if(err) {
//         res.send("数据库链接错误。" + err.message);
//         return;
//       }
//
//       var userSocketSql = 'INSERT  INTO consultUser  (socketId,consultTime,status) values (?,current_timestamp,1)';
//       var param = [socket.id];
//       conn.query(userSocketSql,param,function (err, rs) {
//         if(err) {
//           res.send("数据库查询错误。" + err.message);
//           return;
//         }
//         console.log('zixunyonghu saved!');
//
//       })
//       conn.release();
//     })
//   });
//
//
//
//
//
//   socket.on('sayTo',function (data) {
//     var toName = data.to;
//     var toId;
//     if(toId = hashName[toName]){
//       var toSocket = _.findWhere(io.sockets.sockets,{id:toId});
//       toSocket.emit('message',data.msg);
//     }
//   });
//
//
//
//
//   //退出
//   socket.on('disconnect', function(){
//
//     console.log('connection is disconnect!');
//
//     pool = connPool();
//     pool.getConnection(function (err, conn) {
//       if(err) {
//         res.send("数据库链接错误。" + err.message);
//         return;
//       }
//       var kefusoketId = socket.id;
//       var quitSql = 'UPDATE  user SET status = 0  WHERE socketId = ?';
//       var param = [kefusoketId];
//       var consultQuitSql = 'UPDATE  consultUser SET status = 0  WHERE socketId = ?';
//
//       if (socket.role == 1) {
//
//         conn.query(quitSql,param,function (err, rs) {
//           if(err) {
//             res.send("数据库查询错误。" + err.message);
//             return;
//           }
//           console.log('yes');
//
//         })
//       } else if (socket.role == 2) {
//         conn.query(consultQuitSql,param,function (err, rs) {
//           if(err) {
//             res.send("数据库查询错误。" + err.message);
//             return;
//           }
//           console.log('yes consult');
//
//         })
//
//       }
//
//       conn.release();
//     })
//
//
//   });
//
//
//
//
//
//
//
//
//
//
//   // socket.emit('personNo','ddd');
//
//
//
//   //显示正在输入内容
//   socket.on('msging', function(receivedMsg){
//     socket.broadcast.emit('msging',receivedMsg);
//     socket.emit('msging',receivedMsg);
//   });
//
//
//
//   socket.on('msgsend', function(receivedMsg){
//     // for (var i = 0; i < sockArr.length; i++) {
//     //   var thissocket = sockArr[i];
//     //   thissocket.emit('msg', msg);
//     // }
//     // console.log(receivedMsg);
//
//     socket.broadcast.emit('msg',{"socket": receivedMsg.name, "timer": receivedMsg.timer,"msg": receivedMsg.content});
//     socket.emit('msg',{"socket": receivedMsg.name, "timer": receivedMsg.timer,"msg": receivedMsg.content});
//
//
//   });
//
//
//   // socket.sockets.socket(socketid).emit(‘String’, data);//给指定的客户端发送消息
//
//
//
//   // socket.on ('disconnect',function () {
//   //   console.log('sonme on exit');
//   //   sockArr.splice(sockArr.indexOf(socket),1,1);
//   //
//   // })
//
//
// })

module.exports = io;
