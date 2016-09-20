$(document).ready(function () {
    var type = $.cookie("rtksettype");
    if(type == null)type = "serial";
    $("#type").combobox("setValue",type);
    $.cookie("rtkout",1,{ path:"/" });
    $.cookie("outmode",0,{ path:"/" });
    $.cookie("setuptype",1,{ path:"/" });
});

function config(){

    var type = $("#type").combobox("getValue");
    $.cookie("rtksettype",$("#type").combobox("getValue"),{ path:"/" });
    $.cookie("step",1,{ path:"/" });
    window.location.href = type == "serial" ? "sconfig.html" : "nconfig.html" ;
}

function next(){
    $.cookie("step",1,{ path:"/" });
    $.cookie("rtksettype",$("#type").combobox("getValue"),{ path:"/" });
    window.location.href = "guide2.html";
}
