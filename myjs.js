function $Id(id){
    return document.getElementById(id);
}
function getStyle(obj,attr){
    return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj)[attr]; 
}
function doMove(obj,step,end,attr,endF){
    step = parseFloat(getStyle(obj,attr))>end ? -step : step;
    clearInterval(obj.timer);
    obj.timer = setInterval(function (){
        var next = parseFloat(getStyle(obj,attr))+step;
        next = step>0 ? Math.min(next,end) : Math.max(next,end);
        obj.style[attr] = attr=="opacity" ? next : next+"px";
        if(parseFloat(getStyle(obj,attr))==end){
            clearInterval(obj.timer);
            endF && endF();
        }
    },30);
}
function add0(num){
    return num<10 ? "0"+num : ""+num;
}
function fTime(date){  //无参数的时候返回当前时间对象，字符串"all"返回年/月/日 星期 时:分:秒，字符串"time"返回 时:分:秒，字符串"date"返回年/月/日，数字返回把数字当成毫秒数的时间格式
    var oTime = new Date();
    var iY = oTime.getFullYear();
    var iM = oTime.getMonth();
    var iD = oTime.getDate();
    var iDay = oTime.getDay();
    var sW = "";
    switch(iDay){
        case 0:sW = "星期日"; break;
        case 1:sW = "星期一"; break;
        case 2:sW = "星期二"; break;
        case 3:sW = "星期三"; break;
        case 4:sW = "星期四"; break;
        case 5:sW = "星期五"; break;
        case 6:sW = "星期六"; break;
    }
    var iH = oTime.getHours();
    var iMi = oTime.getMinutes();
    var iS = oTime.getSeconds();
    switch(typeof(date)){
        case "undefined" : return oTime;
        case "string" : 
        switch(date){
            case "all" : return add0(iY)+"/"+add0(iM+1)+"/"+add0(iD)+" "+sW+" "+add0(iH)+":"+add0(iMi)+":"+add0(iS); 
            case "date": return add0(iY)+"/"+add0(iM+1)+"/"+add0(iD);
            case "time": return add0(iH)+":"+add0(iMi)+":"+add0(iS);
        };
        case "number" :
        var iSs = Math.round(date/1000);
        var iDH = Math.floor(iSs/3600);
        var iDM = Math.floor(iSs%3600/60);
        var iDS = iSs%60;
        return add0(iDH)+":"+add0(iDM)+":"+add0(iDS);
    }   
}