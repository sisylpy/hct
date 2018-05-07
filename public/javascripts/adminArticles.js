/**
 * Created by lipeiyi on 2018/4/11.
 */


$(function () {

//TODO:文章推荐筛选出status=3 的文章
  $('input[type=radio][name=customRadio]').change(function () {
    if (this.checked) {
      alert("Allot Thai ");
      this.checked = false;
    }
    else {
      alert("Transfer put");
      this.checked = true;

    }
  });


//TODO：筛选typeid = 1，2，3 的三类文章
  $('#logoutFlow').on('click', function () {
    alert('数据库 typeid=1')


  });
  $('#foreign').on('click', function () {
    alert('数据库 typeid = 2')
  });
  $('#orgnaize').on('click', function () {
    alert('数据库 typeid = 3')

  })

})