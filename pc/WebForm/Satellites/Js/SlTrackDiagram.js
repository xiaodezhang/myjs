var webConfigXmlObj = parent.webConfigXmlObj;
$(document).ready(function () {
    initTrackDiagram(0); //初始化跟踪图
    initViewSatelliteType(); //初始化卫星类型复选框
    initViewSnrType(); //初始化信噪比类型
    init(); //初始化
    initInteral(); //定时更新
});
//初始化跟踪图
var init_left = 40;
var text_num_left = 20;
var horizontalLines_left = 35;
var init_top = 30;
var init_height = 420;
var init_width = 840;
var textNum = ["60", "50", "40", "30", "20", "10", "0"];
var horizontalLinesNum = 13;
var horizontalLinesWidthInit = 840;
var starTrackDiagram_line_strokeStyle = '#ddd';
var starTrackDiagram_line_strokeWidth = 2;
var standard_x_distance = 40;
var canvasInitWidth = 840;
var timerFresh;
function initTrackDiagram(satelliteNum) {
    var canvasWidth = satelliteNum * 40 + 80;
    if (canvasWidth > canvasInitWidth) {
        canvasInitWidth = canvasWidth;
        init_width = canvasInitWidth;
        horizontalLinesWidthInit = canvasInitWidth;
    }
    $("#canvasId").attr("width", canvasInitWidth);
    var line_x1 = init_left;
    var line_y1 = init_top;
    var line_x2 = init_left;
    var line_y2 = init_top + init_height;
    //画线
    drawLine(line_x1, line_y1, line_x2, line_y2);
    //画文字
    var num_distance = init_height / (textNum.length - 1);
    for (var k = 0; k < textNum.length; k++) {
        var text_x = text_num_left;
        var text_y = init_top + num_distance * k;
        var text_info = textNum[k];
        drawText(text_x, text_y, text_info, text_num_size);
    }
    drawLines(horizontalLinesWidthInit);
}
//初始化卫星类型复选框
function initViewSatelliteType() {
    var urlForGetSatEnableTypes = getServiceUrl(webConfigXmlObj, webConfigXmlObj.find("interfaceNames").find("getSatEnabledTypes").text());
    if (urlForGetSatEnableTypes == "") {
        return;
    }
    $.ajax({
        type: "GET",
        contentType: "application/json;charset=utf-8",
        url: urlForGetSatEnableTypes,
        data: {
            "urlStringId": getUrlIdString()
        },
        dataType: "json",
        async: false,
        beforeSend: function (x) { x.setRequestHeader("Content-Type", "application/json; charset=utf-8"); },
        error: function (result, status) {
            return;
        },
        success: function (data) {
            //获取失败
            if (data == null) {
                return;
            }
            if (data.awk == "rsps") {
                if (data.gps) {
                    $("#raSatelliteGps").attr("checked", true);
                } else {
                    $("#raSatelliteGps").removeAttr("checked");
                }
                if (data.sbas) {
                    $("#raSatelliteSbas").attr("checked", true);
                } else {
                    $("#raSatelliteSbas").removeAttr("checked");
                }
                if (data.glonass) {
                    $("#raSatelliteGln").attr("checked", true);
                } else {
                    $("#raSatelliteGln").removeAttr("checked");
                }
                if (data.bds) {
                    $("#raSatelliteBds").attr("checked", true);
                } else {
                    $("#raSatelliteBds").removeAttr("checked");
                }
                if (data.galileo) {
                    $("#raSatelliteGalileo").attr("checked", true);
                } else {
                    $("#raSatelliteGalileo").removeAttr("checked");
                }
            }
        }
    });
}
//初始化信噪比类型
function initViewSnrType() {
    var urlForGnssDataGet = getServiceUrl(webConfigXmlObj, webConfigXmlObj.find("interfaceNames").find("getSnrEnables").text());
    if (urlForGnssDataGet == "") {
        return;
    }
    $.ajax({
        type: "GET",
        contentType: "application/json;charset=utf-8",
        url: urlForGnssDataGet,
        data: {
            "urlStringId": getUrlIdString()
        },
        dataType: "json",
        async: false,
        beforeSend: function (x) { x.setRequestHeader("Content-Type", "application/json; charset=utf-8"); },
        error: function (result, status) {
            return;
        },
        success: function (data) {
            //获取失败
            if (data == null) {
                return;
            }
            if (data.awk == "rsps") {
                if (data.L1) {
                    $("#cbTypeL1").attr("checked", true);
                } else {
                    $("#cbTypeL1").removeAttr("checked");
                }
                if (data.L2) {
                    $("#cbTypeL2").attr("checked", true);
                } else {
                    $("#cbTypeL2").removeAttr("checked");
                }
                if (data.L5) {
                    $("#cbTypeL5").attr("checked", true);
                } else {
                    $("#cbTypeL5").removeAttr("checked");
                }
            }
        }
    });
}
//复选框选中事件
function checkBoxClick() {
    setSatelliteTypeEnables(); //设置卫星类型信息
    setSnrEnables(); //设置信噪比类型
    init();
    initInteral();
}
//设置卫星类型信息
var gpsFlag = false;
var sbasFlag = false;
var glonassFlag = false;
var galileoFlag = false;
var bdsFlag = false;
function setSatelliteTypeEnables() {
    
    var urlForGetSatEnableTypes = getServiceUrl(webConfigXmlObj, webConfigXmlObj.find("interfaceNames").find("setSatEnabledTypes").text());
    if (urlForGetSatEnableTypes == "") {
        return;
    }
    gpsFlag = $("#raSatelliteGps").attr("checked") == "checked";
    sbasFlag = $("#raSatelliteSbas").attr("checked") == "checked";
    glonassFlag = $("#raSatelliteGln").attr("checked") == "checked";
    galileoFlag = $("#raSatelliteGalileo").attr("checked") == "checked";
    bdsFlag = $("#raSatelliteBds").attr("checked") == "checked";

    $.ajax({
        type: "GET",
        contentType: "application/json;charset=utf-8",
        async: false,
        url: urlForGetSatEnableTypes,
        data: {
            "urlStringId": getUrlIdString(),
            "gps": gpsFlag,
            "sbas": sbasFlag,
            "glonass": glonassFlag,
            "galileo": galileoFlag,
            "bds": bdsFlag
        },
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
            //console.log( "data : " + data );
            if (data.awk == "rsps") {
            }
        }
    });
}
//设置信噪比类型
var snrL1Flag = false;
var snrL2Flag = false;
var snrL5Flag = false;
function setSnrEnables() {
    var urlForGnssDataGet = getServiceUrl(webConfigXmlObj, webConfigXmlObj.find("interfaceNames").find("setSnrEnables").text());
    if (urlForGnssDataGet == "") {
        return;
    }
    snrL1Flag = $("#cbTypeL1").attr("checked") == "checked";
    snrL2Flag = $("#cbTypeL2").attr("checked") == "checked";
    snrL5Flag = $("#cbTypeL5").attr("checked") == "checked";
    $.ajax({
        type: "GET",
        contentType: "application/json;charset=utf-8",
        async: false,
        url: urlForGnssDataGet,
        data: {
            "urlStringId": getUrlIdString(),
            "L1": snrL1Flag,
            "L2": snrL2Flag,
            "L5": snrL5Flag
        },
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
            //console.log( "data : " + data );
            if (data.awk == "rsps") {
            }
        }
    });
}
//定时刷新
function initInteral() {
    if (timerFresh != undefined) {
        clearInterval(timerFresh);
    }
    timerFresh = setInterval("init()", 5000);
}
var cbSatelliteType = [];
var cbTypeL = [];
function init() {
    cbSatelliteType = [];
    cbTypeL = [];
    $('input[name="cbSatelliteType"]:checked').each(function () {
        cbSatelliteType.push($(this).val());
    });
    $('input[name="cbTypeL"]:checked').each(function () {
        cbTypeL.push($(this).val());
    });
    if (cbSatelliteType.length > 0 && cbTypeL.length > 0) {
        startDrawDiagram(cbSatelliteType, cbTypeL); //开始动态加载图形   
    } else {
        $('canvas').clearCanvas();
        initTrackDiagram(0);
    }

}
var gpsnum = 0;
var sbasnum = 0;
var glonnum = 0;
var bdsnum = 0;
//开始动态加载图形
function startDrawDiagram(cbSatelliteType, cbTypeL) {
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
            $('canvas').clearCanvas();
            if (cbSatelliteType.length > 0 && cbTypeL.length > 0) {
                //var satNum = parseInt(data.gps_num) + parseInt(data.sbas_num) + parseInt(data.glo_num) + parseInt(data.bds_num) + parseInt(data.gali_num);
                //initTrackDiagram(satNum);
                bindData(cbSatelliteType, cbTypeL, data);
            }
        }
    });
}

function bindData(cbSatelliteType, cbTypeL, data) {
    var sateNumHash = new HashMap();
    sateNumHash.put("gps", parseInt(data.gps_num));
    sateNumHash.put("sbas", parseInt(data.sbas_num));
    sateNumHash.put("glonass", parseInt(data.glo_num));
    sateNumHash.put("bds", parseInt(data.bd_num));
    sateNumHash.put("galileo", parseInt(data.gali_num));
    var totalSelectedSates = 0;
    for (var k = 0; k < cbSatelliteType.length; k++) {
        totalSelectedSates += sateNumHash.get(cbSatelliteType[k]);
    }
    initTrackDiagram(totalSelectedSates);
    var horizontalLinesWidth = (totalSelectedSates + 1) * standard_x_distance;
    drawLines(horizontalLinesWidth);
    var drawedSatNumArray = [];
    for (var k = 0; k < cbSatelliteType.length; k++) {
        var start_x = 0;
        var textType = "";
        if (cbSatelliteType[k] == "gps") {
            start_x = getStartX(drawedSatNumArray);
            textType = "G";
            drawDiagram(data.gps_num, data.gps_sat, cbTypeL, start_x, textType);
            drawedSatNumArray.push(parseInt(data.gps_num));
        }
        if (cbSatelliteType[k] == "sbas") {
            start_x = getStartX(drawedSatNumArray);
            textType = "S";
            drawDiagram(data.sbas_num, data.sbas_sat, cbTypeL, start_x, textType);
            drawedSatNumArray.push(parseInt(data.sbas_num));
        }
        if (cbSatelliteType[k] == "glonass") {
            start_x = getStartX(drawedSatNumArray);
            textType = "R";
            drawDiagram(data.glo_num, data.glo_sat, cbTypeL, start_x, textType);
            drawedSatNumArray.push(parseInt(data.glo_num));
        }
        if (cbSatelliteType[k] == "bds") {
            start_x = getStartX(drawedSatNumArray);
            textType = "C";
            drawDiagram(data.bd_num, data.bd_sat, cbTypeL, start_x, textType);
            drawedSatNumArray.push(parseInt(data.bd_num));
        }
        if (cbSatelliteType[k] == "galileo") {
            start_x = getStartX(drawedSatNumArray);
            textType = "E";
            drawDiagram(data.gali_num, data.gali_sat, cbTypeL, start_x, textType);
            drawedSatNumArray.push(parseInt(data.gali_num));
        }
    }
}
function getStartX(drawedSatNumArray) {
    var sum = 0;
    for (var k = 0; k < drawedSatNumArray.length; k++) {
        sum += drawedSatNumArray[k];
    }
    return sum * standard_x_distance;
}

var rectangle_width1 = 30;
var rectangle_width2 = 15;
var rectangle_width3 = 10;
var rectangles_color_l1 = "rgb(224,72,49)";
var rectangles_color_l2 = "rgb(59,137,245)";
var rectangles_color_l5 = "rgb(249,192,0)";
var verticalLines_height = 10;
var text_bottom1 = 15;
var text_bottom2 = 30;
var text_num_size2 = 10;
//画图表
function drawDiagram(satellitesNum, dataSatellite, cbTypeL, start_x, textType) {
    var rectangles_height;
    var rectangles_width;
    var rectangles_x;
    var rectangles_y;
    var rectangles_color;
    var flag;
    for (var k = 0; k < satellitesNum; k++) {
        flag = 0;
        //画线
        var line_x1 = init_left + start_x + standard_x_distance * (k + 1);
        var line_y1 = init_top;
        var line_x2 = init_left + start_x + standard_x_distance * (k + 1);
        var line_y2 = init_top + init_height + verticalLines_height;
        drawLine(line_x1, line_y1, line_x2, line_y2);
        //画文字
        var text_x = init_left + start_x + standard_x_distance * (k + 1);
        var text_y = init_top + init_height + text_bottom1;
        var text_info = textType + dataSatellite[k].prn;
        drawText(text_x, text_y, text_info, text_num_size2);
        text_x = init_left + start_x + standard_x_distance * (k + 1);
        text_y = init_top + init_height + text_bottom2;
        text_info = dataSatellite[k].elevation + "°";
        /*
        drawText(text_x, text_y, text_info, text_num_size2);
        */
        var differ_x = 0;

        var lcount = getLCount(cbTypeL, dataSatellite[k]);
        if (lcount == 1) {
            rectangles_width = rectangle_width1;
            differ_x = 0;
        } else if (lcount == 2) {
            rectangles_width = rectangle_width2;
            differ_x = rectangles_width / 2;
        } else if (lcount == 3) {
            rectangles_width = rectangle_width3;
            differ_x = rectangles_width;
        }
        $(cbTypeL).each(function (index, value) {
            if (value == "l1") {
                if(dataSatellite[k].L1 == 0)
                    flag++;
                rectangles_height = dataSatellite[k].L1 * init_height / textNum[0];
                rectangles_x = init_left + start_x + index * rectangles_width + standard_x_distance * (k + 1) - differ_x;
                rectangles_color = rectangles_color_l1;
            } else if (value == "l2") {
                if(dataSatellite[k].L2 == 0)
                    flag++;
                rectangles_height = dataSatellite[k].L2 * init_height / textNum[0];
                rectangles_x = init_left + start_x +(index-flag)* rectangles_width + standard_x_distance * (k + 1) - differ_x;
                rectangles_color = rectangles_color_l2;
            } else if (value == "l5") {
                rectangles_height = dataSatellite[k].L5 * init_height / textNum[0];
                rectangles_x = init_left + start_x + (index-flag) * rectangles_width + standard_x_distance * (k + 1) - differ_x;
                rectangles_color = rectangles_color_l5;
            }
            rectangles_y = init_top + init_height - rectangles_height / 2;
            drawRectangle(rectangles_x, rectangles_y, rectangles_width, rectangles_height, rectangles_color);
        });
    }
}
function getLCount(cbTypeL, dataSatelliteType) {
    var lCount = 0;
    $(cbTypeL).each(function (index, value) {
        if (value == "l1" && dataSatelliteType.L1 != 0) {
            lCount++;
        }
        if (value == "l2" && dataSatelliteType.L2 != 0) {
            lCount++;
        }
        if (value == "l5" && dataSatelliteType.L5 != 0) {
            lCount++;
        }
    });
    return lCount;
}


//画线standard_x_distance
function drawLines(horizontalLinesWidth) {
    var horizontalLines_distance = init_height / (horizontalLinesNum - 1);
    for (var k = 0; k < horizontalLinesNum; k++) {
        var line_x1 = horizontalLines_left;
        var line_y1 = init_top + horizontalLines_distance * k;
        var line_x2 = init_left + horizontalLinesWidth;
        var line_y2 = init_top + horizontalLines_distance * k;
        //画线
        drawLine(line_x1, line_y1, line_x2, line_y2);
    }
    //画竖线
    var verticalLines_distance = horizontalLinesWidth / standard_x_distance;
    for (var index = 1; index <= verticalLines_distance; index++) {
        var line_x1 = init_left + index * standard_x_distance;
        var line_y1 = init_top;
        var line_x2 = init_left + index * standard_x_distance;
        var line_y2 = init_top + init_height;
        //画线
        drawLine(line_x1, line_y1, line_x2, line_y2);
    }
}
//画矩形
function drawRectangle(rectangles_x, rectangles_y, rectangles_width, rectangles_height, rectangles_color) {
    $('canvas').drawRect({
        fillStyle: rectangles_color,
        x: rectangles_x, y: rectangles_y,
        width: rectangles_width,
        height: rectangles_height
    });
}
//画文字
var text_num_fillStyle = "rgb(0, 0, 0)";
var text_num_size = 10;
var text_num_fontFamily = 'Verdana, sans-serif';
function drawText(x, y, textString, text_num_size) {
    var text_x = x;
    var text_y = y;
    $('canvas').drawText({
        x: text_x, y: text_y,
        fillStyle: text_num_fillStyle,
        fontSize: text_num_size,
        fontFamily: text_num_fontFamily,
        text: textString
    });
}
//画线
function drawLine(line_x1, line_y1, line_x2, line_y2) {
    $('canvas').drawLine({
        strokeStyle: starTrackDiagram_line_strokeStyle,
        strokeWidth: starTrackDiagram_line_strokeWidth,
        x1: line_x1, y1: line_y1,
        x2: line_x2, y2: line_y2
    });
}
//HashMap类
function HashMap() {
    //定义长度   
    var length = 0;
    //创建一个对象   
    var obj = new Object();
    /** 
    * 判断Map是否为空 
    */
    this.isEmpty = function () {
        return length == 0;
    };
    /** 
    * 判断对象中是否包含给定Key 
    */
    this.containsKey = function (key) {
        return (key in obj);
    };
    /** 
    * 判断对象中是否包含给定的Value 
    */
    this.containsValue = function (value) {
        for (var key in obj) {
            if (obj[key] == value) {
                return true;
            }
        }
        return false;
    };
    /** 
    *向map中添加数据 
    */
    this.put = function (key, value) {
        if (!this.containsKey(key)) {
            length++;
        }
        obj[key] = value;
    };
    /** 
    * 根据给定的Key获得Value 
    */
    this.get = function (key) {
        return this.containsKey(key) ? obj[key] : null;
    };
    /** 
    * 根据给定的Key删除一个值 
    */
    this.remove = function (key) {
        if (this.containsKey(key) && (delete obj[key])) {
            length--;
        }
    };
    /** 
    * 获得Map中的所有Value 
    */
    this.values = function () {
        var _values = new Array();
        for (var key in obj) {
            _values.push(obj[key]);
        }
        return _values;
    };
    /** 
    * 获得Map中的所有Key 
    */
    this.keySet = function () {
        var _keys = new Array();
        for (var key in obj) {
            _keys.push(key);
        }
        return _keys;
    };
    /** 
    * 获得Map的长度 
    */
    this.size = function () {
        return length;
    };
    /** 
    * 清空Map 
    */
    this.clear = function () {
        length = 0;
        obj = new Object();
    };
}  
