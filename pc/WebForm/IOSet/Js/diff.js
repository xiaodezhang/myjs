$(document).ready(function(){
    $("#trancetype").combobox("setValue",$.cookie("trancetype"));
    $("#datatype").combobox("select",$.cookie("datatype"));
    if($.cookie("trancetype") == 3)
            document.getElementById("tcpbool").style.display ="block";
    else
            document.getElementById("tcpbool").style.display ="none";

    getip();
    getinter();

});

function btnsave(){


    var check=document.getElementById("clientcheck");
    var clientbool = check.checked ? 1 : 0;
    var ip= $("#serverip").val();
    var port= check.checked ? $("#serverport").val() : $("#port").val();
    var datatime= new Array(10);
    var tran=$("#trancetype").combobox("getText");
    var datatypes=$("#datatype").combobox("getText");
    if(datatypes=="rtcm3.0")
        var datatype=1;
    else if(datatypes=="rtcm3.2")
        var datatype=2;
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
    var r1033=$("#r1033").combobox("getValue");
    var r1005=$("#r1005").combobox("getValue");
    var r1006=$("#r1006").combobox("getValue");
    var gps  =$("#gps").combobox("getValue");
    var bds  =$("#bds").combobox("getValue");
    var glo  =$("#glo").combobox("getValue");
    var gpseph  =$("#gpseph").combobox("getValue");
    var bdseph  =$("#bdseph").combobox("getValue");
    var gloeph  =$("#gloeph").combobox("getValue");

    datatime[0]=r1033;
    datatime[1]=r1005;
    datatime[2]=r1006;
    datatime[3]=gps;
    datatime[4]=bds;
    datatime[5]=glo;
    datatime[6]=gpseph;
    datatime[7]=bdseph;
    datatime[8]=gloeph;

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
            "ip"         : ip,
            "port"       : port,
            "datatype"   : datatype,
            "datatime"   :datatime,
                "com"    :ttype
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
            var msgids = new Array(9);
            var msgids2 = new Array(9);
            msgids[0] = "RTCM1033";
            msgids[1] = "RTCM1005";
            msgids[2] = "RTCM1006";
            msgids[3] = "RTCM1004";
            msgids[4] = "RTCM1104";
            msgids[5] = "RTCM1012";
            msgids[6] = "RTCM1019";
            msgids[7] = "RTCM1020";
            msgids[8] = "RTCM4011";

            msgids2[0] = "RTCM1033";
            msgids2[1] = "RTCM1005";
            msgids2[2] = "RTCM1006";
            msgids2[3] = "RTCM1074";
            msgids2[4] = "RTCM1124";
            msgids2[5] = "RTCM1084";
            msgids2[6] = "RTCM1019";
            msgids2[7] = "RTCM1020";
            msgids2[8] = "RTCM4011";
            var tran=$("#trancetype").combobox("getText");
            var ttype;
            if(tran == "TCP/IP")
                ttype = 3;
            if(tran == "串口/com1")
                ttype = 1;
            if(tran == "串口/com2")
                ttype = 2;

            var freq = new Array(10);
            for(var i = 0;i <10;i++)
                freq[i] = 0;
            if(data == null || data.num == 0)
                return;
            for(i = 0;i < data.num;i++){
                if(data.interfaces[i].flag == 1)
                    continue;
                for(var j = 0;j < msgids.length;j++){
                    if(parseInt(data.interfaces[i].comid) == ttype ){
                        var datatype=$("#datatype").combobox("getText");
                        if( datatype== "rtcm3.0"){
                            if(data.interfaces[i].msgid == msgids[j]){
                                freq[j] = data.interfaces[i].period==0 ? -1 : data.interfaces[i].period/100;
                            }
                        }else if(datatype=="rtcm3.2"){
                            if(data.interfaces[i].msgid == msgids2[j]){
                                freq[j] = data.interfaces[i].period==0 ? -1 : data.interfaces[i].period/100;
                            }
                        }
                    }
                }
            }
            $("#r1033").combobox("setValue",freq[0]);
            $("#r1005").combobox("setValue",freq[1]);
            $("#r1006").combobox("setValue",freq[2]);
            $("#gps").combobox("setValue",freq[3]);
            $("#bds").combobox("setValue",freq[4]);
            $("#glo").combobox("setValue",freq[5]);
            $("#gpseph").combobox("setValue",freq[6]);
            $("#bdseph").combobox("setValue",freq[7]);
            $("#gloeph").combobox("setValue",freq[8]);
        }
    });
}
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


