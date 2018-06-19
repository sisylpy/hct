/**
 * Created by lipeiyi on 2018/5/28.
 */


(function ($) {

  //回到顶部按钮的显示
  window.onscroll = function () {
    if ($(window).scrollTop() > 600) {
      //事件绑定
      console.log($(window).scrollTop());
      $(".tool-toTop").animate({"right": "40px"}, 500);
    } else {
      // $(".tool-toTop").animate({"right":"-50px"},1000);
    }
  };

  //回到顶部按钮
  $(".tool-toTop").click(function () {
    $("html,body").animate({scrollTop: 0}, 200);
  })


  //pc页面，"联系我们"3秒后出现
  // $(".esjy-contact-btn-pc").animate({"right":"0px"},500);
  //pc页面，点击"联系我们"事件
  $('.esjy-contact-btn-pc').click(function () {
    $('.esjy-contact-widget').animate({"right": "0"}, 500);

  });


  //pc页面，点击"关闭"事件
  $('.pc-close').click(function () {
    $('.esjy-contact-widget').animate({"right": "-380px"}, 500);
  })


  //mob页面，点击"联系我们"事件
  $('.esjy-contact-btn-mob').click(function () {
    $('.esjy-contact-widget').animate({"bottom": "0"}, 500);
  })


  //mob页面，点击"关闭"事件
  $('.mob-close').click(function () {
    $('.esjy-contact-widget').animate({"bottom": "-380px"}, 500);
  })




  $('#noservice').modal.show;
  
  
  //页面跳转


  // $(".href-item").on("click", function () {
  //
  //
  //     var p = $(this).attr('data-linkid');
  //     url = "articlePage.ejs?p="+p;//此处拼接内容
  //     window.location.href = url;
  //
  //
  //
  //
  //
  // });
  // function jump1() {
  // alert(this);
  // url = "b.html?name="+name+"&age="+age;//此处拼接内容
  // window.location.href = url;




  // }





})(jQuery);
