$(document).ready(function () {
    $.cookie("step",3,{ path:"/" });
    var type = $.cookie("outputtype");
    if(type == null)type = "serial";
    $("#type").combobox("setValue",type);
    $.cookie("outmode",1,{ path:"/" });
    if($.cookie("rtkout") == 0){
        $("#txt").html("请求RTK结果,配置输出端口");
    }else{
        $("#txt").html("请求定向结果,配置输出端口");
    }
});

function config(){

    var type = $("#type").combobox("getValue");
    $.cookie("outputtype",$("#type").combobox("getValue"),{ path:"/" });
    window.location.href = type == "serial" ? "sconfig.html" : "nconfig.html" ;
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

