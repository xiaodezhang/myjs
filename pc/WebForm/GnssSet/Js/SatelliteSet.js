var sattypewhole = "all";
var gpsc_array;
var bdsc_array;
var gloc_array;
var sbasc_array;
var gpsprnlist;
var bdsprnlist;
var gloprnlist;
var sbasprnlist;
$(document).ready(function () {
    gpsc_array = new Array(32);
    bdsc_array = new Array(32);
    gloc_array = new Array(32);
    sbasc_array = new Array(32);
    gpsprnlist = new Array(32);
    bdsprnlist = new Array(32);
    gloprnlist = new Array(32);
    sbasprnlist = new Array(32);
    for(var i = 0;i < 32;i++)
        gpsc_array[i] = 1;
    for(i = 0;i < 32;i++)
        bdsc_array[i] = 1;
    for(i = 0;i < 32;i++)
        gloc_array[i] = 1;
    for(i = 0;i < 32;i++)
        sbasc_array[i] = 1;
    createDatagrid(); //创建gridview
    bindData(); //初始化绑定数据
});

//创建gridview
function createDatagrid() {
    var bodyWidth = document.body.clientWidth * 0.95;
    $('#dgrid').datagrid({
        selectOnCheck:false,
        checkOnSelect:false,
        columns: [[
                        { field: 'gps', title: 'GPS', width: bodyWidth * 0.12, align: 'center' },
                        { field: 'gpsc', width: bodyWidth * 0.12, align: 'center',editor:"gpsc;checkbox",
                             formatter:function(value,rec,roaIndex){
                                 if(rec.gps != ""){
                                     if(gpsc_array[gpsprnlist[roaIndex]] == 0)
                                        return "<input type=\"checkbox\"  name=\"gpsc\" checked=\"checked\" >";
                                     else
                                        return "<input type=\"checkbox\"  name=\"gpsc\" >";
                                 }
                                 else
                                     return "";
                             } },
                        { field: 'bds', title: 'BDS', width: bodyWidth * 0.12, align: 'center' },
                        { field: 'bdsc', width: bodyWidth * 0.12, align: 'center',
                             formatter:function(value,rec,roaIndex){
                                 if(rec.bds != ""){
                                     if(bdsc_array[bdsprnlist[roaIndex]] == 0)
                                       return "<input type=\"checkbox\"  name=\"bdsc\" checked=\"checked\" >";
                                     else
                                       return "<input type=\"checkbox\"  name=\"bdsc\">";
                                 }
                                 else
                                     return "";
                             } },

                        { field: 'glo', title: 'GLONASS', width: bodyWidth * 0.12, align: 'center' },
                        { field: 'gloc', width: bodyWidth * 0.12, align: 'center',
                             formatter:function(value,rec,roaIndex){
                                 if(rec.glo != ""){
                                     if(gloc_array[gloprnlist[roaIndex]] == 0)
                                       return "<input type=\"checkbox\"  name=\"gloc\" checked=\"checked\" >";
                                     else
                                       return "<input type=\"checkbox\"  name=\"gloc\" >";
                                 }
                                 else
                                     return "";
                             } },

                        { field: 'sbas', title: 'SBAS', width: bodyWidth * 0.12, align: 'center' },
                        { field: 'sbasc', width: bodyWidth * 0.12, align: 'center',
                             formatter:function(value,rec,roaIndex){
                                 if(rec.sbas != ""){
                                     if(sbasc_array[sbasprnlist[roaIndex]] == 0)
                                       return "<input type=\"checkbox\"  name=\"sbasc\" checked=\"checked\" >";
                                     else
                                       return "<input type=\"checkbox\"  name=\"sbasc\" >";
                                 }
                                 else
                                     return "";
                             } },

				    ]],
        rownumbers: false,
        onClickRow:function(rowIndex,rowData){
            $(this).datagrid("unselectRow",rowIndex);
        }
    });
}
//为表格绑定数据
function bindData() {
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
            "guide": "tracetable"
        },
        sync:false,
        dataType: "json",
        beforeSend: function (x) { x.setRequestHeader("Content-Type", "application/json; charset=utf-8"); },
        error: function (result, status) {
            return;
        },
        success: function (data) {
            //获取失败
            if (data == null) {
                return;
            }
            var dg = [];
            var len = new Array(4);
            len[0] = data.gps_sat.length;
            len[1] = data.glo_sat.length;
            len[2] = data.bd_sat.length;
            len[3] = data.sbas_sat.length;
            
            var lenmax=Math.max.apply(null,len);
            for(var i = 0;i < lenmax;i++){
                var gpsprn;
                var gloprn;
                var bdsprn;
                var sbaprn;
                if(i > data.gps_sat.length-1)
                    gpsprn="";
                else
                    gpsprn=data.gps_sat[i].prn;

                if(i > data.glo_sat.length-1)
                    gloprn="";
                else
                    gloprn=data.glo_sat[i].prn;

                if(i > data.bd_sat.length-1)
                    bdsprn="";
                else
                    bdsprn=data.bd_sat[i].prn;

                if(i > data.sbas_sat.length-1)
                    sbasprn="";
                else
                    sbasprn=data.sbas_sat[i].prn;

                dg.push({
                    gps:gpsprn,
                    glo:gloprn,
                    bds:bdsprn,
                    sbas:sbasprn
                });
            }

            for(i = 0;i < data.gps_sat.length;i++){
                gpsc_array[data.gps_sat[i].prn] = data.gps_sat[i].satstatus;
                gpsprnlist[i] = data.gps_sat[i].prn;
            }
            for(i = 0;i < data.glo_sat.length;i++){
                gloc_array[data.glo_sat[i].prn] = data.glo_sat[i].satstatus;
                gloprnlist[i] = data.glo_sat[i].prn;
            }
            for(i = 0;i < data.bd_sat.length;i++){
                bdsc_array[data.bd_sat[i].prn] = data.bd_sat[i].satstatus;
                bdsprnlist[i] = data.bd_sat[i].prn;
            }
            for(i = 0;i < data.sbas_sat.length;i++){
                sbasc_array[data.sbas_sat[i].prn] = data.sbas_sat[i].satstatus;
                sbasprnlist[i] = data.sbas_sat[i].prn;
            }
            $("#dgrid").datagrid("loadData",dg);
        }
    });
}

function searchInfo(sattype) {
    sattypewhole = sattype;
    bindData();
}

function btnSave(){
    /*
    var checkeditems = $("#dgrid").datagrid("getChecked");
    var names = [];
    $.each(checkeditems,function(index,item){
        names.push(item.gps);
    });
    alert(names);
    */

    var gpsc = document.getElementsByName("gpsc");
    var gloc = document.getElementsByName("gloc");
    var bdsc = document.getElementsByName("bdsc");
    var sbasc = document.getElementsByName("sbasc");
    var raw = $("#dgrid").datagrid("getRows");
    var gps= document.getElementsByName("gps");
    var bds= document.getElementsByName("bds");
    var glo= document.getElementsByName("glo");
    var sbas= document.getElementsByName("sbas");

    var gpsprn= new Array(30);
    var gloprn= new Array(30);
    var bdsprn= new Array(30);
    var sbasprn= new Array(30);
    var sysbool = new Array(5);
    var i;

    for(i = 0;i < 5;i++)
        sysbool[i] = 0;
    for(i = 0;i < 30;i++){
        gpsprn[i] = 0;
        gloprn[i] = 0;
        bdsprn[i] = 0;
        sbasprn[i] = 0;
    }
    for(i = 0;i < gpsc.length;i++){
        if(gpsc[i].checked){
            gpsprn[raw[i].gps] = 2;
        }else
            gpsprn[raw[i].gps] = 1;
    }
    for(i = 0;i < gloc.length;i++){
        if(gloc[i].checked){
            gloprn[raw[i].glo] = 2;
        }else
            gloprn[raw[i].glo] = 1;
    }
    for(i = 0;i < bdsc.length;i++){
        if(bdsc[i].checked){
            bdsprn[raw[i].bds] = 2;
        }else
            bdsprn[raw[i].bds] = 1;
    }

    for(i = 0;i < sbasc.length;i++){
        if(sbasc[i].checked){
            sbasprn[raw[i].sbas] = 2;
        }else
            sbasprn[raw[i].sbas] = 1;
    }

    sysbool[0] = gps[0].checked ? 2 : (gps[1].checked ? 1 : 0);
    sysbool[3] = bds[0].checked ? 2 : (bds[1].checked ? 1 : 0);
    sysbool[1] = glo[0].checked ? 2 : (glo[1].checked ? 1 : 0);
    sysbool[4] = sbas[0].checked ? 2 : (sbas[1].checked ? 1 : 0);
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
                "config"     : "satset",
                "gpsprn"     : gpsprn,
                "gloprn"     : gloprn,
                "bdsprn"     : bdsprn,
                "sbasprn"    : sbasprn,
                "sys"        : sysbool
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
        sleep(2000).then(() => {
            bindData();
        })
        alert("设置成功");
}

function sleep(time){
    return new Promise((resolve) => setTimeout(resolve,time));
}
