$(document).ready(function(){
    $("#trancetype").combobox("setValue",$.cookie("trancetype"));
    $("#datatype").combobox("select",$.cookie("datatype"));
    if($.cookie("trancetype") == 3)
            document.getElementById("tcpbool").style.display ="block";
    else
            document.getElementById("tcpbool").style.display ="none";
    getinter();
    getip();
});

function btnsave(){

    var check=document.getElementById("clientcheck");
    var clientbool = check.checked ? 1 : 0;
    var port= check.checked ? $("#serverport").val() : $("#port").val();
    var ip = $("#serverip").val();
    var datatime= new Array(10);
    var tran=$("#trancetype").combobox("getText");
    var ttype;
    if(tran == "TCP/IP")
        ttype = 3;
    if(tran == "串口/com1")
        ttype = 1;
    if(tran == "串口/com2")
        ttype = 2;

   
    if(ttype== 0) return;
    if(!clientbool && port==null){
        alert("端口号不能为空!");
        return;
    }
    for(var i=0;i < 10;i++) datatime[i] = 0.0;
    var epoch=$("#epoch").combobox("getValue");
    var gps  =$("#gps").combobox("getValue");
    var bds  =$("#bds").combobox("getValue");
    var glo  =$("#glo").combobox("getValue");

    datatime[0]=epoch;
    datatime[1]=gps;
    datatime[2]=bds;
    datatime[3]=glo;
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
            "config"     : "ioset",
            "clientbool" : clientbool,
            "datatype"   : "0",
            "datatime"   : datatime,
            "ip"         : ip,
            "port"       : port,
            "com"        : ttype
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
    alert("设置成功");
}
function btncancel(){

}
$(function(){
$("#datatype").combobox({
    onSelect:function(record){
        switch(record.value){
            case "row": 
                        var tran=$("#trancetype").combobox("getText");
                        if(tran == "TCP/IP")
                            $.cookie("trancetype",3,{ path:"/"});
                        if(tran == "串口/com1")
                            $.cookie("trancetype",1,{ path:"/"});
                        if(tran == "串口/com2")
                            $.cookie("trancetype",2,{ path:"/"});
                        if(tran == "串口/com3")
                            $.cookie("trancetype",4,{ path:"/"});
                        if(tran == "usb")
                            $.cookie("trancetype",0,{ path:"/"});
                        $.cookie("datatype","row",{ path:"/"});
                        window.location.href="row.html";
                        break;
            case "rtcm3": 
                        var tran=$("#trancetype").combobox("getText");
                        if(tran == "TCP/IP")
                            $.cookie("trancetype",3,{ path:"/"});
                        if(tran == "串口/com1")
                            $.cookie("trancetype",1,{ path:"/"});
                        if(tran == "串口/com2")
                            $.cookie("trancetype",2,{ path:"/"});
                        if(tran == "串口/com3")
                            $.cookie("trancetype",4,{ path:"/"});
                        if(tran == "usb")
                            $.cookie("trancetype",0,{ path:"/"});

                        $.cookie("datatype","rtcm3",{ path:"/"});
                          window.location.href="diff.html";
                          break;
            case "rtcm32":
                        var tran=$("#trancetype").combobox("getText");
                        if(tran == "TCP/IP")
                            $.cookie("trancetype",3,{ path:"/"});
                        if(tran == "串口/com1")
                            $.cookie("trancetype",1,{ path:"/"});
                        if(tran == "串口/com2")
                            $.cookie("trancetype",2,{ path:"/"});
                        if(tran == "串口/com3")
                            $.cookie("trancetype",4,{ path:"/"});
                        if(tran == "usb")
                            $.cookie("trancetype",0,{ path:"/"});

                          $.cookie("datatype","rtcm32",{ path:"/"});
                          window.location.href="diff.html";
                          break;
            case "rtcm24":
                        var tran=$("#trancetype").combobox("getText");
                        if(tran == "TCP/IP")
                            $.cookie("trancetype",3,{ path:"/"});
                        if(tran == "串口/com1")
                            $.cookie("trancetype",1,{ path:"/"});
                        if(tran == "串口/com2")
                            $.cookie("trancetype",2,{ path:"/"});
                        if(tran == "串口/com3")
                            $.cookie("trancetype",4,{ path:"/"});
                        if(tran == "usb")
                            $.cookie("trancetype",0,{ path:"/"});

                          $.cookie("datatype","rtcm24",{ path:"/"});
                          window.location.href="diff.html";
                          break;
            case "nmea":
                        var tran=$("#trancetype").combobox("getText");
                        if(tran == "TCP/IP")
                            $.cookie("trancetype",3,{ path:"/"});
                        if(tran == "串口/com1")
                            $.cookie("trancetype",1,{ path:"/"});
                        if(tran == "串口/com2")
                            $.cookie("trancetype",2,{ path:"/"});
                        if(tran == "串口/com3")
                            $.cookie("trancetype",4,{ path:"/"});
                        if(tran == "usb")
                            $.cookie("trancetype",0,{ path:"/"});

                          $.cookie("datatype","nmea",{ path:"/"});
                          window.location.href="nmea.html";
                          break;
        }
    }
});
})

$(function(){
$("#trancetype").combobox({
    onSelect:function(record){
        if(record.value == 3)
            document.getElementById("tcpbool").style.display ="block";
        else
            document.getElementById("tcpbool").style.display ="none";


getinter();
    }
});
})

function clientbool(check){

    if(check.checked)
        document.getElementById("checkdisplay").style.display='block';
    else
        document.getElementById("checkdisplay").style.display='none';
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
            $("#server").html(data.ip);
            $("#serverip").val(data.serverip);
            if(data.serclient== 0){
               $("#serverport").val(data.port);
              clientcheck.checked = true;
              document.getElementById("checkdisplay").style.display="";
            }
            else{
               $("#port").val(data.port);
              clientcheck.checked = false;
              document.getElementById("checkdisplay").style.display="none";

            }
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
            "guide"      : "getinter"
        },
        sync:false,
        traditional:true,
        dataType: "json",
        beforeSend: function (x) { x.setRequestHeader("Content-Type", "application/json; charset=utf-8"); },
        error: function (result, status) {
            return;
        },
        success: function (data) {
            var msgids = new Array(4);
            msgids[0] = "RANGE";
            msgids[1] = "GPSEPHEM";
            msgids[2] = "BDSEPHEM";
            msgids[3] = "GLNEPHEM";
            var tran=$("#trancetype").combobox("getText");
            var ttype;
            if(tran == "TCP/IP")
                ttype = 3;
            if(tran == "串口/com1")
                ttype = 1;
            if(tran == "串口/com2")
                ttype = 2;

            var freq = new Array(4);
            for(var i = 0;i < 4;i++)
                freq[i] = 0;
            if(data == null || data.num == 0)
                return;
            for(i = 0;i < data.num;i++){
                if(data.interfaces[i].flag == 1)
                    continue;
                for(var j = 0;j < msgids.length;j++){
                    if(parseInt(data.interfaces[i].comid) == ttype ){
                        if(data.interfaces[i].msgid == msgids[j]){
                            freq[j] = data.interfaces[i].period==0 ? -1 : data.interfaces[i].period/100;
                        }
                    }
                }
            }
            $("#epoch").combobox("setValue",freq[0]);
            $("#gps").combobox("setValue",freq[1]);
            $("#bds").combobox("setValue",freq[2]);
            $("#glo").combobox("setValue",freq[3]);
        }
    });function getserclient(){

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
            "guide"     : "getserclient",
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
            var clientcheck = document.getElementById("clientcheck");
            if(data.serclient == 0){
              clientcheck.checked = true;
              document.getElementById("checkdisplay").style.display="";
            }
            else{
              clientcheck.checked = false;
              document.getElementById("checkdisplay").style.display="none";
            }
        }
    });

}

}


