$(document).ready(function () {
    var type = $.cookie("outputtype");
    if(type == null)type = "serial";
    $("#type").combobox("setValue",type);
    $.cookie("outmode",1,{ path:"/" });
    $.cookie("rtkout",2,{ path:"/" });
});

function config(){

    var type = $("#type").combobox("getValue");
    $.cookie("outputtype",$("#type").combobox("getValue"),{ path:"/" });
    window.location.href = type == "serial" ? "sconfig.html" : "nconfig.html" ;
    $.cookie("step",3,{ path:"/" });
}

function finish(){

    $.cookie("outputtype",$("#type").combobox("getValue"),{ path:"/" });
    var rtkout = $.cookie("rtkout");
    var com = $.cookie("outputcom");
    if(rtkout == ""){
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
            "config"      : "output",
            "rtkout"      : rtkout,
                "com"     : com
        },
        sync:false,
        traditional:true,
        dataType: "json",
        beforeSend: function (x) { x.setRequestHeader("Content-Type", "application/json; charset=utf-8"); },
        error: function (result, status) {
            return;
        },
        success: function (data) {

        }
    });

    alert("设置成功!");
}

