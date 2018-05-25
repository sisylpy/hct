
(function ($) {


  var navHeight = $('.Header').height();
  var bannerHeight = $('.article-page-banner').height();
  var topHeight = navHeight + bannerHeight - 55;

  var url = location.href;


  window.onscroll = function () {

    //顶部固定菜单栏
    if ($(window).scrollTop() > topHeight) {
      $('.mune-col').addClass('fixed');
      $('.article-detail').css("marginTop",55);
    }else  {
      $('.mune-col').removeClass('fixed');
      $('.article-detail').css("marginTop",0);
    }
  };


  //来自别的页面href的 hash传值，跳转
  function articleLinkScrool () {

    // 首先要获取当前的href值
    var url = window.location.href.split('#');
    var item_id = url[1];

    $('.article').each(function () {

      if ($(this).attr("id") === item_id) {

        // 获取id对应的顶部的距离
        var id_offSetTop =  $(this).offset().top;

        //获取id的高度
        var id_Height = $(this).height();
        //   计算应该滚动出去的scrollTop
        var id_scroolTop = id_offSetTop - id_Height ;
        //    设置滚动
        $("html,body").animate({scrollTop: id_offSetTop - 80}, 200);
      }
    })
  }


  //本页面点击菜单栏文章的滚动
  //todo:页面
  $('.item').on("click","a",function () {

    //设置菜单的active状态
    $(this).addClass("active").siblings().removeClass('active');
    // $(this).parent().siblings().children().removeClass("active");

    //    获取data_linkid
    var data_linkid = $(this).attr("data-linkid");

    // $('.article-col').each(function () {

      // if ($(this).attr("id") === data_linkid) {
      //
      //   // 获取id对应的顶部的距离
      //   var id_offSetTop =  $(this).offset().top;
      //
      //   //获取id的高度
      //   var id_Height = $(this).height();
      //   //   计算应该滚动出去的scrollTop
      //   var id_scroolTop = id_offSetTop - id_Height ;
      //   //    设置滚动
      //   $("html,body").animate({scrollTop: id_offSetTop - 80}, 200);
      //
      // }

    // })


  })


  //打开文章内容
  $('.radio').on("click", function () {

    $(this).parent().siblings().children('.article-list').hide(200);
    $(this).siblings().toggle(200);



  })



  articleLinkScrool();

})(jQuery);
