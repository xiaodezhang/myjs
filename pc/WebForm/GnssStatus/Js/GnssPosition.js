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
            "guide": "position"
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
    var spanString = "";
    var gpsUsedNum = data.gps_num;
    for (var kgps = 0; kgps < gpsUsedNum; kgps++) {
        if(kgps== gpsUsedNum-1)
            spanString += data.gps_prn[kgps];
        else
            spanString += data.gps_prn[kgps]+",";
    }
    $("#spanUsedGpsNum").html(gpsUsedNum);
    $("#spanUsedGpsString").html(spanString);
    spanString = "";
    var sbasUsedNum =data.sbas_num;
    for (var ksbas = 0; ksbas < sbasUsedNum; ksbas++) {
        if(ksbas== sbasUsedNum-1)
            spanString += data.sbas_prn[ksbas];
        else
            spanString += data.sbas_prn[ksbas]+",";
    }
    $("#spanUsedSbasNum").html(sbasUsedNum);
    $("#spanUsedSbasString").html(spanString);
    spanString = "";
    var gloUsedNum =data.glo_num;
    for (var kglo = 0; kglo < gloUsedNum; kglo++) {
        if(kglo== gloUsedNum-1)
            spanString += data.glo_prn[kglo];
        else
            spanString += data.glo_prn[kglo]+",";
    }
    $("#spanUsedGlonNum").html(gloUsedNum);
    $("#spanUsedGlonString").html(spanString);
    spanString = "";
    var bdsUsedNum = data.bd_num;
    for (var kbds = 0; kbds < bdsUsedNum; kbds++) {
        if(kbds == bdsUsedNum-1)
            spanString += data.bd_prn[kbds];
        else
            spanString += data.bd_prn[kbds]+",";
    }
    $("#spanUsedBdsNum").html(bdsUsedNum);
    $("#spanUsedBdsString").html(spanString);
    spanString = "";
    var galileoUsedNum = data.gali_num;
    for (var kgalileo = 0; kgalileo < galileoUsedNum; kgalileo++) {
        if(kgalileo == galileoUsedNum-1)
            spanString += data.gali_prn[kgalileo];
        else
            spanString += data.gali_prn[kgalileo]+",";
    }
    $("#spanUsedGalileoNum").html(galileoUsedNum);
    $("#spanUsedGalileoString").html(spanString);


    var usedSum = gpsUsedNum + sbasUsedNum + gloUsedNum + bdsUsedNum + galileoUsedNum;
    $("#spanUsedNum").html(usedSum);

    $("#spanLatitude").html(data.lat);
    $("#spanLongitude").html(data.lon);
    $("#spanHeight").html(data.high);
    $("#spanClass").html(data.postype);
    $("#spanPdop").html(data.pdop);
    $("#spanHdop").html(data.hdop);
    $("#spanVdop").html(data.vdop);
    $("#spanTdop").html(data.tdop);
    $("#spanGpsWeek").html(data.gpsweek);
    $("#spanGpsSecond").html(data.gpssec);
    $("#abhgt").html(data.undulation);

}
