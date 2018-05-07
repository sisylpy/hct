// 百度地图API功能
var map = new BMap.Map("allmap");
var point = new BMap.Point(116.465143,39.911027);
var marker = new BMap.Marker(point);  // 创建标注
map.addOverlay(marker);              // 将标注添加到地图中
map.centerAndZoom(point, 15);
var opts = {
    width : 200,     // 信息窗口宽度
    height: 100,     // 信息窗口高度
    title : "晖昌通企业咨询公司" , // 信息窗口标题
    enableMessage:true,//设置允许信息窗发送短息
    message:"欢迎咨询"
}
var infoWindow = new BMap.InfoWindow("地址：北京市朝阳区建外soho8号楼1111号", opts);  // 创建信息窗口对象
marker.addEventListener("click", function(){
    map.openInfoWindow(infoWindow,point); //开启信息窗口
});