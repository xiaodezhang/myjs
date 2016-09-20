var webConfigXmlObj = parent.webConfigXmlObj;
var password;
$(document).ready(function () {
    getpassword();

});

function receiveoldpass(){

    return oldpass;
}
function getpassword(){

    var urlaccount = (window.location.protocol == "https:" ? "https://" :"http://")
                    + window.location.host+"/get_receiver_guide.cmd";

    var oldpass;
    $.ajax({
        type:"GET",
        contentType:"application/json;charset=utf-8",
        url:urlaccount,
        data:{
                "urlStringId" :getUrlIdString(),
                "guide"       : "getpassword"
                },
        sync:false,
        dataType:"json",
        beforeSend:function(x){
            x.setRequestHeader("Content-Type","application/json; charset=utf-8");
        },
        error:function(result,status){

        },
        success:function(data){
            password = data.password;
        }
    });
}

function btnSave(){
    var oldpass =  $("#oldpass").val();
    var newpass = $("#newpass").val();
    var snewpass = $("#snewpass").val();
    if(!oldpass || !newpass || 
            !snewpass){
        alert("不能为空!");
        return;
    }

    if(newpass != snewpass){
        alert("确认新密码错误!");
        return;
    }

    if(oldpass != password){
        alert("当前密码错误");
        return;
    }
    var urlpassword = (window.location.protocol == "https:" ? "https://" :"http://")
                    + window.location.host+"/get_receiver_config.cmd";

    $.ajax({
        type:"GET",
        contentType:"application/json;charset=utf-8",
        url:urlpassword,
        data:{
                "urlStringId" :getUrlIdString(),
                "config"      : "setpassword",
                "password"    : newpass,
                "account"     : "admin"
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

    $.cookie("newpassword",1,{ path:"/"});
    alert("设置成功!");
    parent.tologin();
}

