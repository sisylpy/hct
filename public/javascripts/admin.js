/**
 * Created by lipeiyi on 2018/4/12.
 */

Date.prototype.Format = function (fmt) { //author: meizz
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
};


$(function () {

  var uid = $('#uid').val(); //客服id
  var socketId = $("#socketId").val();   //客服user表的固定id
  var nicheng = $("#user-btn").html();  //客服姓名

  //第一位的客户id
  var current_clientId = $('.personNO').length > 0 ? $('.personNO:first').data('clientid') : '';
  //第一位的客户ip
  var current_clientIp = $('.personNO').length > 0 ? $('.personNO:first').data('clientip') : '';
  var all_message = {};  //第一位客户所有消息

  var current_message = []; //当前消息

  /**
   *  获取第一个client的聊天信息
   */

  if( current_clientId.length > 0) {
    $.ajax({
      url: '/admin/message/' + current_clientId,
      type: 'get',
      success: function (res) {
        current_message = res;
        // 将获取到的聊天信息缓存起来  并且将当前消息显示在界面上
        if (all_message[current_clientId] == undefined) {
          all_message[current_clientId] = [];
        }
        res.map(function (mes) {
          // 将消息显示到页面上
          //左侧第一客户状态
          // $(this).addClass('active')
          $('.personNO:first').addClass('active');
          //聊天内容
          var styleclass = '';
          var showname = '';
          if (mes.whosaid == 'C') {
            styleclass = 'chat1';
            showname = "客户咨询：" + new Date(mes.chattime).Format('hh:mm:ss');
          } else if (mes.whosaid == 'S') {
            styleclass = 'chat0';
            showtime = new Date(mes.chattime).Format('hh:mm:ss');
            showname = "业务咨询代表：" + nicheng + showtime;
          }

          li = '<li class="' + styleclass + '">' +
            '<i class="name">' + showname + '</i>' +
            '<p class="content">' + mes.message + '</p>' +
            '</li>';
          $("#chatUl").append(li);

          // 将消息缓存
          all_message[current_clientId].push(mes);
        });
      }
    });

  }


  /**
   * 获取客服的在线客户
   */
  var clientIds = [];
  $(".personNO").each(function (event) {
    if($(this).attr('data-status') == 1) {
      clientIds.push($(this).data('clientid'));
    }
  });


  /**
   * 客服socket 命名空间
   */
  var server_users = io.connect('/admin/login');

  /**
   * 点击客户，右侧显示该客户的聊天
   */
  $(document).on('click', '.personNO', function (event) {

    //添加选中样式
    $(this).addClass('active').siblings().removeClass('active');

    if ($(this).attr('data-status') == 1) {
      $(this).children('.face').css("background","url('/images/hct/Huichangtong-assets/hct_logo.jpg')").html('');
    } else if ($(this).attr('data-status') == 0 ){
      $(this).children('.face').css("background","url('/images/hct/Huichangtong-assets/icon_01.png')").html('');
    }


    $("#chatUl").html('');

    current_clientId = $(this).data('clientid');
    current_clientIp = $(this).data('clientip');

    if (all_message[current_clientId] == undefined) {
      all_message[current_clientId] = [];
      /**
       *  获取当前client的聊天信息
       */
      $.ajax({
        url: '/admin/message/' + current_clientId,
        type: 'get',
        success: function (res) {
          current_message = res;
          // 将获取到的聊天信息缓存起来
          res.map(function (mes) {
            // 将消息显示到页面上
            var styleclass = '';
            var showname = '';
            if (mes.whosaid == 'C') {
              styleclass = 'chat1';
              showname = "客户咨询：" + new Date(mes.chattime).Format('hh:mm:ss');
            } else if (mes.whosaid == 'S') {
              styleclass = 'chat0';
              showtime = new Date(mes.chattime).Format('hh:mm:ss');
              showname = "业务咨询代表：" + nicheng + showtime;
            }
            li = '<li class="' + styleclass + '">' +
              '<i class="name">' + showname + ' </i>' +
              '<p class="content">' + mes.message + '</p>' +
              '</li>';
            $("#chatUl").append(li);
            all_message[current_clientId].push(mes);
          });
        }
      });
    } else {

      current_message = all_message[current_clientId];
      current_message.map(function (mes) {
        // 将消息显示到页面上
        var styleclass = '';
        var showname = '';
        if (mes.whosaid == 'C') {
          styleclass = 'chat1';
          showname = "客户咨询：" + new Date(mes.chattime).Format('hh:mm:ss');
        } else if (mes.whosaid == 'S') {
          styleclass = 'chat0';
          showtime = new Date(mes.chattime).Format('hh:mm:ss');
          showname = "业务咨询代表：" + nicheng + showtime;        }
        li = '<li class="' + styleclass + '">' +
          '<i class="name">' + showname + '</i>' +
          '<p class="content">' + mes.message + '</p>' +
          '</li>';
        $("#chatUl").append(li);

        /**
         * todo:清空正在聊天的内容，
         */
        $(".chat2").html('');

      })
    }
  });


  /**
   * 客服发送
   */
  $('#b').on('click', function () {

    // 添加新的完成输入的li
  sendli();
  });
  $(window).keydown (function(event){
    if(event.keyCode ==13){
      sendli();
    }
  });


  /**
   * 发送输入内容
   */
  function sendli() {

    var chattime = new Date().Format("yyyy-MM-dd hh:mm:ss");
    var showChattime = new Date().Format("hh:mm:ss");
    var value = $('#t').val();

    if(value.length > 0) {
      showname = "业务咨询代表：" + nicheng + showChattime;
      var li = '<li class="chat0 chatli">' +
        '<i class="name">' + showname + '</i>' +
        '<p class="content">' + value + '</p> ' +
        '</li>';
      $("#chatUl").append(li);
      $('#t').val('');

      // 通知服务端 客服输入完成 将信息推送给相应的客户端
      server_users.emit('message', {
        server_uid: uid,
        server_socketId: socketId,
        client_id: current_clientId,
        client_ip: current_clientIp,
        msg: value
      });

      // 缓存客服发送的消息
      var mes = {
        userid: uid,
        client_id: current_clientId,
        message: value,
        client_ip: current_clientIp,
        whosaid: 'S',
        chattime: chattime
      };

      //
      all_message[current_clientId].push(mes);

    }
  }


  /**
   * 通知服务端 客服上线
   */
  server_users.emit('server_join', {
    //todo: notifier!!!
    server_socketId: socketId
  });


  /**
   * 监听客户端输入
   */
  server_users.on('msging', (obj) => {

    if (current_clientId == '') current_clientId = obj.client_id;
    if (current_clientIp == '') current_clientId = obj.client_ip;

    // 判断收到的消息的发送者的clientid是否当前正在聊天的client
    if (obj.client_id == current_clientId) {
      // 将消息显示到页面上
      msgingli = '<li class="chat2">客户正在输入：' + obj.msg + '</li>';

      $('.chat-col').append(msgingli);
    }

  });

  /**
   * 客户关闭网页
   */
  server_users.on('offline', (obj)=>{

    if (current_clientId == '') current_clientId = obj.client_id;
    if (current_clientIp == '') current_clientId = obj.client_ip;

    if (obj.client_id == current_clientId) {
       alert('aaa');
    }


      // $('.personNO').each(function (event) {
      //
      //   if( $(this).attr('id') == obj.client_id ) {
      //     alert(this.attr('id'));
      //     $(this).css("background","url('/images/hct/Huichangtong-assets/icon_01.png')")
      //   }
      // })



  });


  /**
   * 监听客户端完成输入
   */
  server_users.on('message', (obj) => {

    if (current_clientId == '') current_clientId = obj.client_id;
    if (current_clientIp == '') current_clientId = obj.client_ip;

    // 判断收到的消息的发送者clientid三种情况：
   //1，如果是当前用户，
    if (obj.client_id == current_clientId) {
      // 1）右侧添加
      var timer = new Date(obj.chattime).Format('hh:mm:ss');
      li = '<li class="chat1 chatli"> ' +
        '<i class="name">客户咨询： ' + timer+ '</i>' +
        '<p class="content ">' + obj.msg + '</p>' +
        '</li>';
      $("#chatUl").append(li);
      $(".chat2").html('');

      //2）更新左侧
      $('#'+ obj.client_id ).children().children('.consultTime').html(timer);
      $('#'+ obj.client_id ).children().children('.lastChat').html(obj.msg);

    } else {
      // 2， 如果是其它在线客户
      if (clientIds.indexOf(obj.client_id) > -1) {

        // 其它客户端 则更新其时间和最后一条聊天内容
        $("#" + obj.client_id + " .consultTime").html(new Date(obj.chattime).Format('hh:mm:ss'));
        $("#" + obj.client_id + " .lastChat").html(obj.msg);
        alert(obj.client_id);
        $("#" + obj.client_id + " .smallface").css("display","block");

      } else {
        // 新客户端 则提示有新客户端接入
        alert('you xinkehu le ');
        var li = '<li class="personNO" id="' + obj.client_id + '" data-clientid = "' + obj.client_id + '" data-status="1" data-clientip="' + obj.client_ip + '">' +
          '<div class="face" style="background: palegreen;color: #000; font-size: 1em"> 新客户' +
          '<div class="smallface"></div>'+
          '</div>' +
          '<div class="personInfo">' +
          '<p class="consultTime">' + new Date(obj.chattime).Format('hh:mm:ss') + '</p>' +
          '<p class="lastChat">' + obj.msg + '</p>' +
          '</div>' +
          '</li>';

        //讲新用户添加的第一位
        $(".personList").prepend(li).fadeIn(800);

        clientIds.push(obj.client_id); // 将新客户端id加入列表
      }
    }

    // 缓存客户端发送过来的消息
    var mes = {
      userid: uid,
      client_id: obj.client_id,
      message: obj.msg,
      client_ip: obj.client_ip,
      whosaid: 'C',
      chattime: obj.chattime
    };
    if (all_message[obj.client_id] != undefined) {
      all_message[obj.client_id].push(mes);
    }
  });





});

