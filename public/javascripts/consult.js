/**
 * Created by lipeiyi on 2018/4/22.
 */

$(function () {

  var UserAgent = navigator.userAgent.toLowerCase();//将获得的设备数据转换为小写字母
  var username = navigator.appName;
  var timer = new Date().toLocaleTimeString();

  iosocket = io.connect('http://localhost:3003/');
  //
  // iosocket.emit('setName',function (data) {
  //   console.log(data);
  //
  // });
  iosocket.emit('openChatView',"hello")

  iosocket.emit('consultSocket');
  // kfsocket.emit('disconnect')


  iosocket.on('message',function (data) {
    console.log(data);
  });


  //客户开始输入
  $('#t').on('keyup',function () {
    var sendStr = $('#t').val();
    // var timer = new Date().toLocaleTimeString();
    // var sendObj = {"name": name, "timer":timer,"content":sendStr};
    iosocket.emit('msging', sendStr);
  })

  $('#b').on('click',function () {
    //添加新的完成输入的li
    var value  = $('#t').val();
    $("#chatUl").append("<li class=\"chat\">" + value +"</li>");
    $('#t').val('');

    // iosocket.emit('msgsend',)
  })
})