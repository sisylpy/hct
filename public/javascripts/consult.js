/**
 * Created by lipeiyi on 2018/4/22.
 */

$(function () {

    var client_id = $("#clientId").val();
    var server_socketId = $("#server_socketId").val();
    var server_uid = $("#server_uid").val();
    var nicheng = $("#nicheng").val();
    var sendTime = new Date().toLocaleTimeString();



  iosocket = io.connect('/client/consult');

    iosocket.emit('client_join', {
        client_id: client_id,
        server_socketId: server_socketId
    });

    iosocket.on('message', function (obj) {
        var li = '<li class="chatli msg left">' +
          '<i class="connectName" id="userName"> 业务咨询代表:'+nicheng+' '+sendTime+' </i>' +
            '<p class="sendMsg">'+obj.msg+'</p>' +
            '</li>';

        $("#chatUl").append(li);
    });


    //客户开始输入
    $('#t').on('keyup', function () {
        var sendStr = $('#t').val();
        iosocket.emit('msging', {
            server_uid: server_uid,
            server_socketId: server_socketId,
            client_id: client_id,
            msg: sendStr
        });
    });

    $('#b').on('click', function () {
        // 添加新的完成输入的li
      var value = $('#t').val();
        if(value.length > 0) {
          var li = '<li class="chatli msg right">' +
            '<i class="connectName"> 我：'+sendTime+'</i>' +
            '<p class="sendMsg">'+value+'</p>' +
            '</li>'
          $("#chatUl").append(li);
          $('#t').val('');

          iosocket.emit('message', {
            server_uid: server_uid,
            server_socketId: server_socketId,
            client_id: client_id,
            msg: value
          })
        }

    });


  // var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
  // $(window).on('resize', function () {
  //   var nowClientHeight = document.documentElement.clientHeight || document.body.clientHeight;
  //   if (clientHeight > nowClientHeight) {
  //     //键盘弹出的事件处理
  //     alert('out');
  //   }
  //   else {
  //     alert('close');
  //     //键盘收起的事件处理
  //   }
  // });




})