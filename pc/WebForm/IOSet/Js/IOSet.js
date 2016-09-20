$(document).ready(function(){
    createdatagrid();
    binddata();
    setInterval("binddata()",5000);
});

function createdatagrid(){

    var bodyWidth = document.body.clientWidth * 0.95;
    $("#dgrid").datagrid({
        width:bodyWidth,
        nowrap:false,
        columns:[[
        { field:"type", title:"类型",width:bodyWidth*0.1, align:"center" },
        { field:"port", title:"端口", width:bodyWidth*0.1,align:"center" },
        { field:"input", title:"输入", width:bodyWidth*0.2,align:"center" },
        { field:"output", title:"输出", width:bodyWidth*0.4,align:"center" },
        { field: 'gpsc', width: bodyWidth * 0.18, align: 'center',editor:"gpsc;checkbox",
         formatter:function(value,rec,roaIndex){
                 return "<input type=\"checkbox\" onclick=\"checkclick(this)\"  name=\"checkbox\" >";
         } }
        ]]
    });
}

function binddata(){

    var dg = [];
    var tcpport = "";
    var tcpoutput = "";
    var com1output = "";
    var com2output = "";
    var com3output = "";
    var com6output = "";
    var tcpinput = "";
    var com1input = "";
    var com2input = "";
    var com3input = "";
    var com6input = "";

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
            if(data == null)
                return;
            for(var i = 0;i < data.num;i++){
                switch(data.interfaces[i].comid){
                    case 1: if(data.interfaces[i].flag == 1){
                                   com1input +=  data.interfaces[i].msgid+",";
                            }
                            else{
                                   com1output +=  data.interfaces[i].msgid+
                                       "("+data.interfaces[i].period/100+"s"+")"+",";
                            }
                            break;
                    case 2: if(data.interfaces[i].flag == 1){
                                   com2input +=  data.interfaces[i].msgid+",";
                            }
                            else{
                                   com2output +=  data.interfaces[i].msgid+
                                       "("+data.interfaces[i].period/100+"s"+")"+",";
                            }
                            break;
                    case 3: if(data.interfaces[i].flag == 1){
                                   com3input +=  data.interfaces[i].msgid+",";
                            }
                            else{
                                   com3output +=  data.interfaces[i].msgid+
                                       "("+data.interfaces[i].period/100+"s"+")"+",";
                            }
                            break;
                }
            }
            if(com1output[com1output.length-1] == ',')
                com1output = com1output.substring(0,com1output.length-1);
            if(com1input[com1input.length-1] == ',')
                com1input = com1input.substring(0,com1input.length-1);
            if(com2output[com2output.length-1] == ',')
                com2output = com2output.substring(0,com2output.length-1);
            if(com2input[com2input.length-1] == ',')
                com2input = com2input.substring(0,com2input.length-1);
            if(com3output[com3output.length-1] == ',')
                com3output = com3output.substring(0,com3output.length-1);
            if(com3input[com3input.length-1] == ',')
                com3input = com3input.substring(0,com3input.length-1);

            dg.push({
                type:"USB",
                port:"",
                input:com6input,
                output:com6output
            });

            dg.push({
                type:"串口",
                port: "com1",
                input:com1input,
                output:com1output
            });

            dg.push({
                type:"串口",
                port: "com2",
                input:com2input,
                output:com2output
            });
            dg.push({
                type:"Tcp/ip",
                port:tcpport,
                input:com3input,
                output:com3output
            });
            dg.push({
                type:"串口",
                port: "com3",
                input:"",
                output:""
            });


            $("#dgrid").datagrid("loadData",dg);

        }
    });

}


function checkclick(checkbox){

    var checkb=document.getElementsByName("checkbox");
    for(var i = 0;i < checkb.length;i++){
        if(checkb[i].checked){
            $.cookie("trancetype",i,{ path:"/" });
            $.cookie("datatype","row",{ path:"/" });
          window.location.href="./row.html";
        }
    }
}
