$(document).ready(function () {
    getinter();
});

function btnSave(){

    var radios = document.getElementsByName("radioAutoCon");
    var com1 = document.getElementsByName("com1");
    var com2 = document.getElementsByName("com2");
    var com3 = document.getElementsByName("com3");
    var check = -1;
    var comc = new Array(3);
    comc[0] = com1[0].checked ? 1 : 0;
    comc[1] = com2[0].checked ? 1 : 0;
    comc[2] = com3[0].checked ? 1 : 0;
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
            "config"     : "antnset",
            "com"        : comc
        },
        sync:false,
        traditional:true,
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
            var com1 = document.getElementsByName("com1");
            var com2 = document.getElementsByName("com2");
            var com3 = document.getElementsByName("com3");
            if(data.com1 == 0)
                com1[0].checked = true;
            else
                com1[1].checked = true;
            if(data.com2 == 0)
                com2[0].checked = true;
            else
                com2[1].checked = true;

            if(data.com3 == 0)
                com3[0].checked = true;
            else
                com3[1].checked = true;
        }
    });

}
