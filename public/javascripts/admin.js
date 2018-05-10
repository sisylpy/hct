/**
 * Created by lipeiyi on 2018/4/12.
 */
// var connPool = require('./ConnPool');
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

    var uid = $('#uid').val();
    var socketId = $("#socketId").val();
    var nicheng = $("#user-btn").html();

    var current_clientId = $('.personNO').length > 0 ? $('.personNO:first').data('clientid') : '';
    var current_clientIp = $('.personNO').length > 0 ? $('.personNO:first').data('clientip') : '';

    var all_message = {};
    var current_message = [];

    /**
     *  获取第一个client的聊天信息
     */
    $.ajax({
        url: '/admin/message/' + current_clientId,
        type: 'get',
        success: function (res) {
            current_message = res;
            // 将获取到的聊天信息缓存起来  并且将当前消息显示在界面上
            if (all_message[current_clientId] == undefined) {
                all_message[current_clientId] = [];
            }
            res.map(function(mes){
                // 将消息显示到页面上
                var styleclass = '';
                if(mes.whosaid == 'C'){
                    styleclass = 'chat1';
                }else if(mes.whosaid == 'S'){
                    styleclass = 'chat0';
                }
                li = '<li class="'+styleclass+'">'+
                    '<i class="name">'+nicheng+'</i>'+
                    '<i class="timer">'+new Date(mes.chattime).Format('hh:mm:ss')+'</i>'+
                    '<p class="content">'+mes.message+'</p> '+
                    '</li>';
                $("#chatUl").append(li);

                // 将消息缓存
                all_message[current_clientId].push(mes);
            });
        }
    });

    // 获取该客服当前所有的client
    var clientIds = [];
    $(".personNO").each(function(event){
        clientIds.push($(this).data('clientid'));
    });

    var server_users = io.connect('/admin/login');

    $(document).on('click','.personNO',function(event){
        $("#chatUl").html('');
        current_clientId = $(this).data('clientid');
        current_clientIp = $(this).data('clientip');

        if(all_message[current_clientId] == undefined) {
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
                        if(mes.whosaid == 'C'){
                            styleclass = 'chat1';
                        }else if(mes.whosaid == 'S'){
                            styleclass = 'chat0';
                        }
                        li = '<li class="'+styleclass+'">'+
                            '<i class="name">'+nicheng+'</i>'+
                            '<i class="timer">'+new Date(mes.chattime).Format('hh:mm:ss')+'</i>'+
                            '<p class="content">'+mes.message+'</p> '+
                            '</li>';
                        $("#chatUl").append(li);
                        all_message[current_clientId].push(mes);
                    });
                }
            });
        }else{
            current_message = all_message[current_clientId];
            current_message.map(function(mes){
                // 将消息显示到页面上
                var styleclass = '';
                if(mes.whosaid == 'C'){
                    styleclass = 'chat1';
                }else if(mes.whosaid == 'S'){
                    styleclass = 'chat0';
                }
                li = '<li class="'+styleclass+'">'+
                    '<i class="name">'+nicheng+'</i>'+
                    '<i class="timer">'+new Date(mes.chattime).Format('hh:mm:ss')+'</i>'+
                    '<p class="content">'+mes.message+'</p> '+
                    '</li>';
                $("#chatUl").append(li);
            })
        }
    });

    // 通知服务端 客服上线
    server_users.emit('server_join', {
        server_socketId: socketId
    });

    // 监听客户端输入
    server_users.on('msging', (obj) => {
        // todo 目前只是在控制台输出，最后显示在页面上
        console.log(obj.msg);
    });

    // 监听客户端完成输入
    server_users.on('message', (obj) => {

        if(current_clientId == '') current_clientId = obj.client_id;
        if(current_clientIp == '') current_clientId = obj.client_ip;

        // 判断收到的消息的发送者的clientid是否当前正在聊天的client
        if(obj.client_id == current_clientId){
            // 将消息显示到页面上
            li = '<li class="chat1">'+
                '<i class="name">'+obj.client_id+'</i>'+
                '<i class="timer">'+new Date(obj.chattime).Format('hh:mm:ss')+'</i>'+
                '<p class="content">'+obj.msg+'</p> '+
                '</li>';
            $("#chatUl").append(li);
        }else{
            // 不是当前用户 则判断是否是老客户端
            if(clientIds.indexOf(obj.client_id) > -1){
                // 老客户端 则更新其时间和最后一条聊天内容
                $("#"+obj.client_id+" .consultTime").html(new Date(obj.chattime).Format('hh:mm:ss'));
                $("#"+obj.client_id+" .lastChat").html(obj.msg);

            }else{
                // 新客户端 则提示有新客户端接入
                var li = '<li class="personNO" id="'+obj.client_id+'" data-clientid = "'+obj.client_id+'" data-clientip="'+obj.client_ip+'">' +
                    '<div class="face">'+uid+'</div>' +
                    '<div class="personInfo">' +
                    '<p class="consultTime">'+new Date(obj.chattime).Format('hh:mm:ss')+'</p>' +
                    '<p class="lastChat">'+obj.msg+'</p>' +
                    '</div>' +
                    '</li>';
                $(".personList").append(li);
            }
        }

        // 缓存客户端发送过来的消息
        var mes = {
            userid: uid,
            client_id: obj.client_id,
            message: obj.msg,
            client_ip:obj.client_ip,
            whosaid: 'C',
            chattime: obj.chattime
        };
        if(all_message[obj.client_id] != undefined){
            all_message[obj.client_id].push(mes);
        }
    });

    /*$.ajax({
      url: '/consult/login',
      type: 'post',
      data: {uid:uid},
      success: function (res) {
          console.log(res);
      }
    })*/
    $('#b').on('click', function () {
        var chattime = new Date().Format("yyyy-MM-dd hh:mm:ss");
        var showChattime = new Date().Format("hh:mm:ss");
        // 添加新的完成输入的li
        var value = $('#t').val();
        var li = '<li class="chat0">'+
            '<i class="name">'+nicheng+'</i>'+
            '<i class="timer">'+showChattime+'</i>'+
            '<p class="content">'+value+'</p> '+
            '</li>';
        $("#chatUl").append(li);
        $('#t').val('');

        // 通知服务端 客服输入完成 将信息推送给相应的客户端
        server_users.emit('message',{
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
            client_ip:current_clientIp,
            whosaid: 'S',
            chattime: chattime
        };
        all_message[current_clientId].push(mes);
    })
})