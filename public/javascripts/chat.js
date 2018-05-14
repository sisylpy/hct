/**
 * Created by lipeiyi on 2018/4/17.
 */

$(function () {

  // iosocket = io.connect('http://localhost:3003/');
  // iosocket = editServer.connect('http://localhost:3003/');

  var chat = io.connect('http://localhost:3003/admin/login')
    , news = io.connect('http://localhost:3003/news');

  chat.on('connect', function () {
    chat.emit('hi!');
    console.log("chat....");
  });

  news.on('news', function () {
    news.emit('woot');
  });


console.log("chhadhfkajflas;lfj");



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


  })
})
