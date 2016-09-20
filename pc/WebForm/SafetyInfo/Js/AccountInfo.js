$(document).ready(function () {
    showaccount();

});

function showaccount(){

    var urlaccount = (window.location.protocol == "https:" ? "https://" :"http://")
                    + window.location.host+"/get_receiver_guide.cmd";

    $.ajax({
        type:"GET",
        contentType:"application/json;charset=utf-8",
        url:urlaccount,
        data:{
                "urlStringId" :getUrlIdString(),
                "guide"       : "getpassword"
                },
        sync:true,
        dataType:"json",
        beforeSend:function(x){
            x.setRequestHeader("Content-Type","application/json; charset=utf-8");
        },
        error:function(result,status){

        },
        success:function(data){
            var pass= "";
            $("#account").html(data.account);
            for(var i = 0;i < data.password.length;i++)
                pass += "*";
            $("#password").html(pass);
        }
    });
}
