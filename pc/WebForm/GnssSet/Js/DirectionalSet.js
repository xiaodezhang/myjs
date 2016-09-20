var webConfigXmlObj = parent.webConfigXmlObj;
$(document).ready(function () {
    getinter();
});

function btnSave(){

    var radios = document.getElementsByName("radioAutoCon");
    var check = -1;
    var baseline = $("#spanPort").val();
    var basebool = document.getElementById("basebool");
    if(baseline == 0 && basebool.checked == true ){
        alert("基线长度不能为空");
        return;
    }
    if(basebool.checked == false)
        baseline = 0;
    if(radios[0].checked)
        check = 0;
    else
        check = 2;

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
            "config"      : "dirset",
            "type"        : check,
            "baseline"    : baseline
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
            if(data.sidotype == 1)
                radios[0].checked = true;
            else
                radios[1].checked = true;
            var basebool = document.getElementById("basebool");
            if(data.dirtype == 1){
              $("#spanPort").val(data.dirlen);
               basebool.checked = true;
            }else{
                basebool.checked = false;
            }

        }
    });

}
