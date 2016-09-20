$(document).ready(function () {
    getinter();
});

function btnSave(){

    var radios = document.getElementsByName("radioAutoCon");
    var check = -1;
    for(var i = 0;i < radios.length;i++){
        if(radios[i].checked)
            check = i;
    }

    if (window.location.protocol == "https:") {
        var  urlForGnssDataGet= "https://" + window.location.host + "/get_receiver_config.cmd";
    } else {
        var urlForGnssDataGet= "http://" + window.location.host + "/get_receiver_config.cmd";
    }

    $.ajax({
        type: "GET",
        contentType: "application/json;charset=utf-8",
        url: urlForGnssDataGet,
        data: {
            "urlStringId" : getUrlIdString(),
            "config"      : "dirsyset",
            "type"        : check,
        },
        sync:false,
        dataType: "json",
        beforeSend: function (x) { x.setRequestHeader("Content-Type", "application/json; charset=utf-8"); },
        error: function (result, status) {
            return;
        },
        success: function (data) {
            return;
        }
    });

    alert("设置成功");
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
            var radios = document.getElementsByName("radioAutoCon");
            if(data.sytype == 1)
                radios[0].checked = true;
            else
                radios[1].checked = true;

        }
    });

}
