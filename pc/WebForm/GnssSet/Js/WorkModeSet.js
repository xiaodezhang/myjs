$(document).ready(function () {
    getinter();
});

function btnSaveInfo(){

    if (window.location.protocol == "https:") {
        var  urlForGnssDataGet= "https://" + window.location.host + "/get_receiver_config.cmd";
    } else {
        var urlForGnssDataGet= "http://" + window.location.host + "/get_receiver_config.cmd";
    }
    var comvalue = $("#seBaseSiteMode").combobox('getValue');
    if(comvalue == 0){
        $.ajax({
            type: "GET",
            contentType: "application/json;charset=utf-8",
            url: urlForGnssDataGet,
            data: {
                "urlStringId": getUrlIdString(),
                "config": "setrov"
            },
            sync:false,
            dataType: "json",
            beforeSend: function (x) { x.setRequestHeader("Content-Type", "application/json; charset=utf-8"); },
            error: function (result, status) {
                return;
            },
            success: function (data) {
                alert("设置成功");
                return;
            }
        });

    }
    else{
        var hgt = $("#ipBaseHeight").val();
        var latde = $("#ipBaseLatCoordinateDu").val();
        var latmin = $("#ipBaseLatCoordinateMin").val();
        var latsec = $("#ipBaseLatCoordinateSec").val();
        var londe = $("#ipBaseLonCoordinateDu").val();
        var lonmin = $("#ipBaseLonCoordinateMin").val();
        var lonsec = $("#ipBaseLonCoordinateSec").val();
        var lat = parseFloat(latde)+parseFloat(latmin)/60+parseFloat(latsec)/3600;
        var lon = parseFloat(londe)+parseFloat(lonmin)/60+parseFloat(lonsec)/3600;
        if(!lat  || !lon || !hgt)  {
            alert("不能为空");
            return;
        }

        $.ajax({
            type: "GET",
            contentType: "application/json;charset=utf-8",
            url: urlForGnssDataGet,
            data: {
                "urlStringId": getUrlIdString(),
                "config"     : "setbasepos",
                    "lat"    : lat,
                    "lon"    : lon,
                    "hgt"    : hgt
            },
            sync:false,
            dataType: "json",
            beforeSend: function (x) { x.setRequestHeader("Content-Type", "application/json; charset=utf-8"); },
            error: function (result, status) {
                return;
            },
            success: function (data) {
                alert("设置成功");
                return;
            }
        });


    }
    
}

function getCurrentPosition(){

    if (window.location.protocol == "https:") {
        var  urlForGnssDataGet= "https://" + window.location.host + "/get_receiver_guide.cmd";
    } else {
        var urlForGnssDataGet= "http://" + window.location.host + "/get_receiver_guide.cmd";
    }

    $.ajax({
        type: "GET",
        contentType: "application/json;charset=utf-8",
        url: urlForGnssDataGet,
        data: {
            "urlStringId": getUrlIdString(),
            "guide": "getpos"
        },
        sync:false,
        dataType: "json",
        beforeSend: function (x) { x.setRequestHeader("Content-Type", "application/json; charset=utf-8"); },
        error: function (result, status) {
            return;
        },
        success: function (data) {
            if(data == null)
               return;

            $("#ipBaseHeight").val(data.hgt);
            $("#ipBaseLatCoordinateDu").val(data.latdeg);
            $("#ipBaseLatCoordinateMin").val(data.latmin);
            $("#ipBaseLatCoordinateSec").val(data.latsec);
            $("#ipBaseLonCoordinateDu").val(data.londeg);
            $("#ipBaseLonCoordinateMin").val(data.lonmin);
            $("#ipBaseLonCoordinateSec").val(data.lonsec);
        }
    });
}
function getinter(){

    if (window.location.protocol == "https:") {
        var  urlForGnssDataGet= "https://" + window.location.host + "/get_receiver_guide.cmd";
    } else {
        var urlForGnssDataGet= "http://" + window.location.host + "/get_receiver_guide.cmd";
    }

    $.ajax({
        type: "GET",
        contentType: "application/json;charset=utf-8",
        url: urlForGnssDataGet,
        data: {
            "urlStringId": getUrlIdString(),
            "guide": "getinter"
        },
        sync:false,
        dataType: "json",
        beforeSend: function (x) { x.setRequestHeader("Content-Type", "application/json; charset=utf-8"); },
        error: function (result, status) {
            return;
        },
        success: function (data) {
            if(data == null)
               return;
            $("#seBaseSiteMode").combobox("setValue",data.retype);
        }
    });

}
