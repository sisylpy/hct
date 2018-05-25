/**
 * Created by lipeiyi on 2018/5/24.
 */





/**
 * xheditor 部分
 */
$(pageInit);

function pageInit() {
  $.extend(XHEDITOR.settings, {shortcuts: {'ctrl+enter': submitForm}});
  $('#content').xheditor({
    html5Upload: false,
    upMultiple: '1',
    upLinkUrl: "/uploadFile",
    upLinkExt: "zip,rar,txt",
    upImgUrl: "/admin/uploadImg",
    upImgExt: "jpg,jpeg,gif,png",
    upFlashUrl: "/uploadFlash",
    upFlashExt: "swf",
    upMediaUrl: "upload.php",
    upMediaExt: "wmv,avi,wma,mp3,mid"
  });
}

function insertUpload(arrMsg) {
  console.log(arrMsg)
  var i, msg;
  for (i = 0; i < arrMsg.length; i++) {
    msg = arrMsg[i];
    $("#uploadList").append('<option value="' + msg.id + '">' + msg.localname + '</option>');
  }
}

function submitForm() {
  $('#frmDemo').submit();
}




/**
 * 界面功能
 */
$(function () {

   $('#common').on('click', function () {
     $(this).addClass('selected').siblings().removeClass('selected');
    $('#selectStatus').html($(this).html());
    $('#stauts').val('0');
     $('#exampleFormControlTextarea1').html('');
     $('#suggestWord').hide(500);




   });
  $('#suggest').on('click', function () {
    $(this).addClass('selected').siblings().removeClass('selected');
    $('#selectStatus').html($(this).html());
    $('#stauts').val('1');
    $('#suggestWord').show(500);

  })






})
