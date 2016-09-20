$(document).ready(function () {
    getGnssTrackInfo(); //获取卫星跟踪信息
    initInterval(); //定时刷新页面
});
//定时刷新页面
function initInterval() {
    setInterval("getGnssTrackInfo()", 10000); //获取卫星跟踪信息
}
//获取卫星跟踪信息
function getGnssTrackInfo() {

    var urlForGnssDataGet = (window.location.protocol == "https:" ? "https://" : "http://")+
                             window.location.host+"/get_receiver_guide.cmd";
    $.ajax({
        type: "GET",
        contentType: "application/json;charset=utf-8",
        url: urlForGnssDataGet,
        sync:false,
        data: {
            "urlStringId": getUrlIdString(),
            "guide": "getdir"
        },
        dataType: "json",
        beforeSend: function (x) { x.setRequestHeader("Content-Type", "application/json; charset=utf-8"); },
        error: function (result, status) {
            return;
        },
        success: function (data) {
            //获取失败
            if (data == null) {
                return;
            }
            
                bindTrackedInfo(data);
        }
    });
}
function bindTrackedInfo(data) {
    //使用中的卫星
    var qf;
    switch(parseInt(data.qf)){
        case 0:qf = "模糊度解算失败"; break;
        case 1:qf = "解算成功"; break;
        case 2:qf = "没有数据或观测卫星少于5颗"; break;
        case 3:qf = "星历数据不足"; break;
        case 4:qf = "定位坐标出错"; break;
        case 5:qf = "其他状态"; break;
    }
    $("#spanLatitude").html(data.alat);
    $("#spanLongitude").html(data.alon);
    $("#spanHeight").html(data.ahgt);
    $("#lat").html(data.mlat);
    $("#lon").html(data.mlon);
    $("#hgt").html(data.mhgt);
    $("#pitch").html(data.pitch);
    $("#heading").html(data.heading);
    $("#roll").html(data.roll);
    $("#qf").html(qf);
    $("#hdop").html(data.hdop);
    $("#satnum").html(data.satnum);
}
