$(document).ready(function () {
    getip();
});

function btnSave(){

    var ip = $("#spanStaticIp").val();
    var netmask = $("#spanSubnetMask").val();
    var gateway = $("#spanGateway").val();
    var dns = $("#spanDns").val();

    if(!ip || !netmask ||
            !gateway ||
            !dns) 
    {
        alert("不能为空");
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
            "config": "netset",
                "ip": ip,
                "gateway" : gateway,
                "netmask" : netmask,
                "dns"     : dns
        },
        sync:false,
        dataType: "json",
        beforeSend: function (x) { x.setRequestHeader("Content-Type", "application/json; charset=utf-8"); },
        error: function (result, status) {
            return;
        },
        success: function (data) {

            var ip2 = $("#spanStaticIp").val();
            parent.tologin(ip2);
               return;
        }
    });
    alert("设置成功");
}
function sleep(time){
    return new Promise((resolve) => setTimeout(resolve,time));
}
function getip(){

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
            "guide"      : "getip"
        },
        sync:false,
        traditional:true,
        dataType: "json",
        beforeSend: function (x) { x.setRequestHeader("Content-Type", "application/json; charset=utf-8"); },
        error: function (result, status) {
            return;
        },
        success: function (data) {
            if(data == null)
                return;
    var ip = $("#spanStaticIp").val(data.ip);
    var netmask = $("#spanSubnetMask").val(data.netmask);
    var gateway = $("#spanGateway").val(data.gateway);
    var dns = $("#spanDns").val(data.dns);
        }
    });


}
