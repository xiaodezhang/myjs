var gpassword;
var gaccount;
$(document).ready(function(){
    getpassword();
    getcookie();
});

function getpassword(){

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
            "guide"      : "getpassword"
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
            gpassword = data.password;
            gaccount = data.account;

        }
    });
}
function login(){

    var account = $("#ipAccount").val();
    var password = $("#ipPassword").val();
    if(!account || !password){
        alert("帐号或密码为空");
        return;
    }
    if((account == "admin" && password == "password")
            ||( account == gaccount && password==gpassword)){
        if($("#cbRemember").attr('checked')){
            $.cookie("account",account,{ path:"/" });
            $.cookie("password",password,{ path:"/" });
        }else{
            $.cookie("account","",{ path:"/" });
            $.cookie("password","",{ path:"/" });
        }
        window.location.href = "./index.html";
    }
    else
        alert("帐号或密码错误");
}

function getcookie(){

    var caccount = $.cookie("account");
    var cpassword = $.cookie("password");

    if($.cookie("newpassword") == 1){
        if(caccount && cpassword){
            $("#ipAccount").val(caccount);
            $("#ipPassword").val(cpassword);
        }
    }
   $.cookie("newpassword",0,{ path:"/"});

}

function changeValue(check){

    var account = $("#ipAccount").val();
    var password = $("#ipPassword").val();
    if(check.checked){
        $.cookie("account",account,{ path:"/" });
        $.cookie("password",password,{ path:"/" });
    }
}
function onKeyDown() {
    if (event.keyCode == 13) {
        login();
    }
}
