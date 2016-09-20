$(document).ready(function () {
    var port,baud,databit,
        check,stop;
    if($.cookie("setuptype") == 0){
        if($.cookie("outmode") == 0){
            port = $.cookie('rtkincom');
            baud = $.cookie('rtkinbaud');
            databbit =$.cookie('rtkindatabit');
            check = $.cookie('rtkincheck');
            stop = $.cookie('rtkinstop');
        }else{
            port = $.cookie('rtkoutcom');
            baud = $.cookie('rtkoutbaud');
            databit = $.cookie('rtkoutdatabit');
            check = $.cookie('rtkoutcheck');
            stop = $.cookie('rtkoutstop');
        }
    }else if($.cookie("setuptype") == 1){
        if($.cookie("outmode") == 0){
            port = $.cookie('singincom');
            baud = $.cookie('singinbaud');
            databit = $.cookie('singindatabit');
            check = $.cookie('singincheck');
            stop = $.cookie('singinstop');
        }else{
            port = $.cookie('singoutcom');
            baud = $.cookie('singoutbaud');
            databit = $.cookie('singoutdatabit');
            check = $.cookie('singoutcheck');
            stop = $.cookie('singoutstop');
        }
    }else{
            port = $.cookie('doubleoutcom');
            baud = $.cookie('doubleoutbaud');
            databit = $.cookie('doubleoutdatabit');
            check = $.cookie('doubleoutcheck');
            stop = $.cookie('doubleoutstop');
    }
    if(port == null)
        port = 1;
    if(baud == null)
        baud = 2;
    if(databit == null)
        databit = 8;
    if(check == null)
        check = 78;
    if(stop == null)
        stop = 1;
    $("#port").combobox("setValue",port);
    $("#baud").combobox("setValue",baud);
    $("#databit").combobox("setValue",databit);
    $("#check").combobox("setValue",check);
    $("#stop").combobox("setValue",stop);
});

function btnsave(){
    var port= $("#port").combobox("getValue");
    var baud= $("#baud").combobox("getValue")
    var databit= $("#databit").combobox("getValue");
    var check= $("#check").combobox("getValue");
    var stop= $("#stop").combobox("getValue");
    var outmode = $.cookie("outmode");
    if(outmode){
      $.cookie("outputcom",port,{ path:"/" });
    }

    var urlaccount = (window.location.protocol == "https:" ? "https://" :"http://")
                    + window.location.host+"/get_receiver_config.cmd";

    $.ajax({
        type:"GET",
        contentType:"application/json;charset=utf-8",
        url:urlaccount,
        data:{
                "urlStringId" :getUrlIdString(),
                "config"       : "guideserial",
                "port"         : port,
                "baud"         : baud,
                "databit"      : databit,
                "check"        : check,
                "stop"         : stop 
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
    if ($.cookie("setuptype") == 0){
        if ($.cookie("outmode") == 0){
            $.cookie("rtkincom",port,{ path:"/" });
            $.cookie("rtkinbaud",baud,{ path:"/" });
            $.cookie("rtkindatabit",databit,{ path:"/" });
            $.cookie("rtkincheck",check,{ path:"/" });
            $.cookie("rtkinstop",stop,{ path:"/" });
        } else {
            $.cookie("rtkoutcom",port,{ path:"/" });
            $.cookie("rtkoutbaud",baud,{ path:"/" });
            $.cookie("rtkoutdatabit",databit,{ path:"/" });
            $.cookie("rtkoutcheck",check,{ path:"/" });
            $.cookie("rtkoutstop",stop,{ path:"/" });
        }
    } else if ($.cookie("setuptype") == 1){
        if($.cookie("outmode") == 1){
            $.cookie("singincom",port,{ path:"/" });
            $.cookie("singinbaud",baud,{ path:"/" });
            $.cookie("singindatabit",databit,{ path:"/" });
            $.cookie("singincheck",check,{ path:"/" });
            $.cookie("singnstop",stop,{ path:"/" });
        } else {
            $.cookie("singoutcom",port,{ path:"/" });
            $.cookie("singoutbaud",baud,{ path:"/" });
            $.cookie("singoutdatabit",databit,{ path:"/" });
            $.cookie("singoutcheck",check,{ path:"/" });
            $.cookie("singutstop",stop,{ path:"/" });
        }
    } else {
            $.cookie("doubleoutcom",port,{ path:"/" });
            $.cookie("doubleoutbaud",baud,{ path:"/" });
            $.cookie("doubleoutdatabit",databit,{ path:"/" });
            $.cookie("doubleoutcheck",check,{ path:"/" });
            $.cookie("doubleoutstop",stop,{ path:"/" });
    }
    alert("设置成功");
    if($.cookie("step") == 3){
       window.location.href = "./output.html";
    }
    else if($.cookie("rtkout") == 0){
       window.location.href = "./RtkSet.html";
    }else if($.cookie("rtkout") == 1){
        window.location.href = "./single.html";
    }else{
        window.location.href = "./double.html";
    }
}

