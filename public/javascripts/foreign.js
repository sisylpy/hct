/**
 * Created by lipeiyi on 2018/4/4.
 */


$(function () {

  var $country_span = $("#country_span");
  var $company_span = $('#company_span');
  var $customer_span = $('#customer_span');
  var $business_span = $('#business_span');
  var isScroll = true; //设置页面滚动开关

  //自定义动画
  countAnimation = function () {
    var countDownTime_Coun = parseInt(1);
    var countDownTime_Com = parseInt(1);
    var countDownTime_Cunst = parseInt(1);
    var countDownTime_Bus = parseInt(1);

    function countDown_Coun(countDownTime_Coun) {
      var timer = setInterval(function () {
        if (countDownTime_Coun <= 6) {
          $country_span.text(countDownTime_Coun);
          countDownTime_Coun++;
        } else {
          clearInterval(timer);
        }
      }, 100);
    }

    function countDown_Com(countDown_Com) {
      var timer = setInterval(function () {
        if (countDown_Com <= 147) {
          $company_span.text(countDown_Com);
          countDown_Com++;
        } else {
          clearInterval(timer);
        }
      }, 10);
    }

    function countDown_Cunst(countDownTime_Cunst) {
      var timer = setInterval(function () {
        if (countDownTime_Cunst <= 560) {
          $customer_span.text(countDownTime_Cunst);
          countDownTime_Cunst++;
        } else {
          clearInterval(timer);
        }
      }, 2);
    }

    function countDown_Bus(countDownTime_Bus) {
      var timer = setInterval(function () {
        if (countDownTime_Bus <= 6) {
          $business_span.text(countDownTime_Bus);
          countDownTime_Bus++;
        } else {
          clearInterval(timer);
        }
      }, 100);
    }

    countDown_Coun(countDownTime_Coun);
    countDown_Com(countDownTime_Com);
    countDown_Cunst(countDownTime_Cunst);
    countDown_Bus(countDownTime_Bus);

  }


//定义页面滚动距离
  var businessTop = $(".foreignFlow").offset().top;
  var businessHeight = $(".foreignFlow").outerHeight();
  var windowHeight = $(window).height();

  //台式机页面滚动监听动画
  window.onscroll = function () {
      if (isScroll && ( $(window).scrollTop()- businessHeight)>= businessTop ) {
        //事件绑定
          countAnimation();
          isScroll = false;
        }
  };


})