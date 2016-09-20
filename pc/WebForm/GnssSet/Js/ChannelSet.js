var webConfigXmlObj = parent.webConfigXmlObj;
$(document).ready(function () {
    getchansta();
});

function btnSaveInfo(){

    var gpsl1= document.getElementsByName("gpsl1");
    var gpsl2= document.getElementsByName("gpsl2");
    var gpsl5= document.getElementsByName("gpsl5");
    var bdsb1= document.getElementsByName("bdsb1");
    var bdsb2= document.getElementsByName("bdsb2");
    var bdsb3= document.getElementsByName("bdsb3");
    var gl1= document.getElementsByName("gl1");
    var gl2= document.getElementsByName("gl2");
    var chanradio= document.getElementsByName("chanradio");
    var check = -1;
    var channel= $("#channel").val();
    var closefre = new Array(8);
    var channelbool= chanradio[0].checked || chanradio[1].checked;

    if(!channel && channelbool){
        alert("通道号不能为空");
        return;
    }

    closefre[0] = gpsl1[0].checked ? 2 :(gpsl1[1].checked ? 1 : 0);
    closefre[1] = gpsl2[0].checked ? 2 :(gpsl2[1].checked ? 1 : 0);
    closefre[2] = gpsl5[0].checked ? 2 :(gpsl5[1].checked ? 1 : 0);
    closefre[3] = bdsb1[0].checked ? 2 :(bdsb1[1].checked ? 1 : 0);
    closefre[4] = bdsb2[0].checked ? 2 :(bdsb2[1].checked ? 1 : 0);
    closefre[5] = bdsb3[0].checked ? 2 :(bdsb3[1].checked ? 1 : 0);
    closefre[6] = gl1[0].checked ? 2 :(gl1[1].checked ? 1 : 0);
    closefre[7] = gl2[0].checked ? 2 :(gl2[1].checked ? 1 : 0);
    var chsta= chanradio[0].checked ? 2 :(chanradio[1].checked ? 1 : 0);

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
                "config"     : "channelset",
                "closefre"   : closefre,
                "channel"    : channel,
                "chsta"      : chsta
            },
            traditional:true,
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

function getchansta(){

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
                "guide"     : "getchansta",
            },
            traditional:true,
            sync:false,
            dataType: "json",
            beforeSend: function (x) { x.setRequestHeader("Content-Type", "application/json; charset=utf-8"); },
            error: function (result, status) {
                return;
            },
            success: function (data) {
                if(data == null)
                   return;
                var gpsl1 = document.getElementsByName("gpsl1");
                if(data.L1 == 1)
                    gpsl1[0].checked = true;
                else
                    gpsl1[1].checked = true;
                var gpsl2 = document.getElementsByName("gpsl2");
                if(data.L2 == 1)
                    gpsl2[0].checked = true;
                else
                    gpsl2[1].checked = true;
                var  gpsl5= document.getElementsByName("gpsl5");
                if(data.L5 == 1)
                    gpsl5[0].checked = true;
                else
                    gpsl5[1].checked = true;
                var bdsb1= document.getElementsByName("bdsb1");
                if(data.B1== 1)
                    bdsb1[0].checked = true;
                else
                    bdsb1[1].checked = true;

                var bdsb2= document.getElementsByName("bdsb2");
                if(data.B2== 1)
                    bdsb2[0].checked = true;
                else
                    bdsb2[1].checked = true;

                var bdsb3= document.getElementsByName("bdsb3");
                if(data.B3== 1)
                    bdsb3[0].checked = true;
                else
                    bdsb3[1].checked = true;
                var gl1= document.getElementsByName("gl1");
                if(data.GL1== 1)
                    gl1[0].checked = true;
                else
                    gl1[1].checked = true;
                var gl2= document.getElementsByName("gl2");
                if(data.GL2== 1)
                    gl2[0].checked = true;
                else
                    gl2[1].checked = true;

            }
        });

}
