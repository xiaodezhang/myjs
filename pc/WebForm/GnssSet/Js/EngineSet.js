var webConfigXmlObj = parent.webConfigXmlObj;
$(document).ready(function () {
    getengine();
});

function btnSaveInfo(){

    var radios = document.getElementsByName("sex");
    var check = -1;
    for(var i = 0;i < radios.length;i++){
        if(radios[i].checked)
            check = i;
    }
    if(check == -1){
        alert("check one");
        return;
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
            "urlStringId": getUrlIdString(),
            "config"     : "engineset",
            "eng"        :check
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
function getengine(){


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
            "guide"     : "getengine"
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
             var radios = document.getElementsByName("sex");
             radios[parseInt(data.engine)].checked = true;
        }
    });

}
