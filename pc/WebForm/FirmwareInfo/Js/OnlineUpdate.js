var datastrings = new Array();
var sendnu = 0;
$(document).ready(function () {
});

function readupdateflag() {

    var urlForGnssDataGet = (window.location.protocol == "https:" ? "https://" : "http://")+
                             window.location.host+"/update.cmd";
    $.ajax({
        type: "GET",
        contentType: "application/json;charset=utf-8",
        url: urlForGnssDataGet,
        sync:false,
        data: {
            "urlStringId": getUrlIdString(),
            "update": "2"
        },
        dataType: "json",
        beforeSend: function (x) { x.setRequestHeader("Content-Type", "application/json; charset=utf-8"); },
        error: function (result, status) {
            return;
        },
        success: function (data) {
            //获取失败
            if (data == null) {
                alert("data==null");
                return;
            }
            alert(data.upsendflag);
            if(parseInt(data.upsendflag) == 0){
                alert("senddata\n");
                senddata(datastrings[sendnu++]);
            }
        }
    });
}

function senddata(supdata){

    var urlForGnssDataGet = (window.location.protocol == "https:" ? "https://" : "http://")+
                             window.location.host+"/update.cmd";
    $.ajax({
        type: "GET",
        contentType: "application/json;charset=utf-8",
        url: urlForGnssDataGet,
        sync:false,
        data: {
            "urlStringId": getUrlIdString(),
            "update":     "0",
            "datalen":    supdata.length,
            "updata":     supdata
        },
        dataType: "json",
        beforeSend: function (x) { x.setRequestHeader("Content-Type", "application/json; charset=utf-8"); },
        error: function (result, status) {
            return;
        },
        success: function (data) {
        }
    });

}

function upstart(){

    var urlForGnssDataGet = (window.location.protocol == "https:" ? "https://" : "http://")+
                             window.location.host+"/update.cmd";
    alert("update");
    $.ajax({
        type: "GET",
        contentType: "application/json;charset=utf-8",
        url: urlForGnssDataGet,
        sync:true,
        data: {
            "urlStringId": getUrlIdString(),
            "update":     "1"
        },
        dataType: "json",
        beforeSend: function (x) { x.setRequestHeader("Content-Type", "application/json; charset=ascii"); },
        error: function (result, status) {
            return;
        },
        success: function (data) {
        }
    });

}
function save(){

    upstart();
}

function upsend(){

      readupdateflag();
//    setInterval("readupdateflag()",50);
}
function changeValue(files){

    var updata;
    if(!files.length){
        alert("选择一个文件");
        return;
    }
    var file = files[0];
    var reader = new FileReader();
    reader.onload=function(f){
        updata = reader.result;
        var len = updata.length;
        var nu = len/1024+1;
        for(var i = 0;i < nu;i++){
            datastrings[i] = i != nu-1 ? updata.substring(i*1024,(i+1)*1024)
                                 : updata.substring(i*1024,len-1);
        }
    }
    reader.readAsText(file,"ascii");
}
