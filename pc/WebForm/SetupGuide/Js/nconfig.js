$(document).ready(function () {
    var clientserver,ip,port;
    if($.cookie("setuptype") == 0){
        if($.cookie("outmode") == 0){
            clientserver = $.cookie("rtkinclientserver");
            ip= $.cookie("rtkinip");
            port= $.cookie("rtkinport");
        }else{
            clientserver = $.cookie("rtkoutclientserver");
            ip= $.cookie("rtkoutip");
            port= $.cookie("rtkoutport");
        }
    }else if($.cookie("setuptype") == 1){
        if($.cookie("outmode") == 0){
            clientserver = $.cookie("singinclientserver");
            ip= $.cookie("singinip");
            port= $.cookie("singinport");
        }else{
            clientserver = $.cookie("singoutclientserver");
            ip= $.cookie("singoutip");
            port= $.cookie("singoutport");
        }
    }else{
            clientserver = $.cookie("doubleoutclientserver");
            ip= $.cookie("doubleoutip");
            port= $.cookie("doubleoutport");
    }

    if(clientserver == null)
        clientserver = 1;
    $("#clientserver").combobox("setValue",clientserver);
    $("#ip").val(ip);
    $("#port").val(port);
});

function btnsave(){
    var ip = $("#ip").val();
    var port = $("#port").val();
    var clientbool = $("#clientserver").combobox("getValue");
    if(clientbool == 1 && (ip == "" || port == "")){
        alert("ip或端口号不能为空！");
        return;
    }
    if(clientbool == 0 && port == ""){
        alert("端口号不能为空!");
        return;
    }
    var outmode = $.cookie("outmode");
    if(outmode){
      $.cookie("outputcom",3,{ path:"/" });
    }

    var urlaccount = (window.location.protocol == "https:" ? "https://" :"http://")
                    + window.location.host+"/get_receiver_config.cmd";

    $.ajax({
        type:"GET",
        contentType:"application/json;charset=utf-8",
        url:urlaccount,
        data:{
                "urlStringId" :getUrlIdString(),
                "config"       : "guidenet",
                    "ip"       : ip,
                 "clientbool"  : clientbool,
                "port"         : port
                },
        sync:false,
        dataType:"json",
        beforeSend:function(x){
            x.setRequestHeader("Content-Type","application/json; charset=utf-8");
        },
        error:function(result,status){

        },
        success:function(data){

        }
    });
    if($.cookie("setuptype") == 0){
        if($.cookie("outmode") == 0){
            $.cookie("rtkinclientserver",clientbool,{ path:"/" });
            $.cookie("rtkinip",ip,{ path:"/" });
            $.cookie("rtkinport",port,{ path:"/" });
        }else{
            $.cookie("rtkoutclientserver",clientbool,{ path:"/" });
            $.cookie("rtkoutip",ip,{ path:"/" });
            $.cookie("rtkoutport",port,{ path:"/" });
        }
    }else if($.cookie("setuptype") == 1){
        if($.cookie("outmode") == 0){
            $.cookie("singinclientserver",clientbool,{ path:"/" });
            $.cookie("singinip",ip,{ path:"/" });
            $.cookie("singinport",port,{ path:"/" });
        }else{
            $.cookie("singoutclientserver",clientbool,{ path:"/" });
            $.cookie("singoutip",ip,{ path:"/" });
            $.cookie("singoutport",port,{ path:"/" });
        }
    }else{
            $.cookie("doubleoutclientserver",clientbool,{ path:"/" });
            $.cookie("doubleoutip",ip,{ path:"/" });
            $.cookie("doubleoutport",port,{ path:"/" });
    }
    alert("设置成功");
    if($.cookie("step") == 3)
       window.location.href = "./output.html";
    else if($.cookie("rtkout") == 0){
       window.location.href = "./RtkSet.html";
    }else if($.cookie("rtkout") == 1){
        window.location.href = "./single.html";
    }else{
        window.location.href = "./double.html";
    }
}

$(function(){
$("#clientserver").combobox({
    onSelect:function(record){
        if(record.value == 0){
            document.getElementById("clientbool").style.display="none";
        }else{
            document.getElementById("clientbool").style.display="";
        }

    }
});
})


