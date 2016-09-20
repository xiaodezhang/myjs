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
    var gga=$("#gga").combobox("getValue");
    var gsv=$("#gsv").combobox("getValue");
    var rmc=$("#rmc").combobox("getValue");
    var grs=$("#grs").combobox("getValue");
    var gsa=$("#gsa").combobox("getValue");
    var uta=$("#uta").combobox("getValue");
    var gll=$("#gll").combobox("getValue");
    var zda=$("#zda").combobox("getValue");
    var vtg=$("#vtg").combobox("getValue");
    var gst=$("#gst").combobox("getValue");

    datatime[0]=gga;
    datatime[1]=gsv;
    datatime[2]=rmc;
    datatime[3]=grs;
    datatime[4]=gsa;
    datatime[5]=uta;
    datatime[6]=gll;
    datatime[7]=zda;
    datatime[8]=vtg;
    datatime[9]=gst;
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
            "port"     : port,
            "datatype"   : "3",
            "datatime"   : datatime,
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
            var msgids = new Array(10);
            msgids[0] = "GPGGA";
            msgids[1] = "GPGSV";
            msgids[2] = "GPRMC";
            msgids[3] = "GPGRS";
            msgids[4] = "GPGSA";
            msgids[5] = "GPUTA";
            msgids[6] = "GPGLL";
            msgids[7] = "GPZDA";
            msgids[8] = "GPVTG";
            msgids[9] = "GPGST";
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
                        if(data.interfaces[i].msgid == msgids[j]){
                            freq[j] = data.interfaces[i].period==0 ? -1 : data.interfaces[i].period/100;
                        }
                    }
                }
            }
            $("#gga").combobox("setValue",freq[0]);
            $("#gsv").combobox("setValue",freq[1]);
            $("#rmc").combobox("setValue",freq[2]);
            $("#grs").combobox("setValue",freq[3]);
            $("#gsa").combobox("setValue",freq[4]);
            $("#uta").combobox("setValue",freq[5]);
            $("#gll").combobox("setValue",freq[6]);
            $("#zda").combobox("setValue",freq[7]);
            $("#vtg").combobox("setValue",freq[8]);
            $("#gst").combobox("setValue",freq[9]);
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


