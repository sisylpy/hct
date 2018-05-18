/**
 * Created by lipeiyi on 2018/4/22.
 */

$(function () {


    var client_id = $("#clientId").val();
    var server_socketId = $("#server_socketId").val();
    var server_uid = $("#server_uid").val();

    iosocket = io.connect('/client/consult');

    iosocket.emit('client_join', {
        client_id: client_id,
        server_socketId: server_socketId
    });

    iosocket.on('message', function (obj) {
        var li = '<li class="chatli msg left">' +
            '<p class="sendMsg">'+obj.msg+'</p>' +
            '</li>'
        $("#chatUl").append(li);
    });


    //客户开始输入
    $('#t').on('keyup', function () {
        var sendStr = $('#t').val();
        // var timer = new Date().toLocaleTimeString();
        // var sendObj = {"name": name, "timer":timer,"content":sendStr};
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
        var sendTime = new Date().toLocaleTimeString();
        var li = '<li class="chatli msg right">' +
          '<p class="sendMsg"> 我：'+sendTime+'</p>' +
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
    })
})