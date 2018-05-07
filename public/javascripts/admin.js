/**
 * Created by lipeiyi on 2018/4/12.
 */
// var connPool = require('./ConnPool');


$(function () {


  var uid = $('#uid');


  var consult = io.connect('http://localhost:3003/admin/login');

  consult.on('connect', function () {



  });

  $.ajax({
    url: '/consult/login',
    type: 'get',
    data: {uid:uid},
    success: function (res) {

    }
  })


})