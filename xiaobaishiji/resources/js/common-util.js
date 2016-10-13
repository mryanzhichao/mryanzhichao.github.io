/*******************通用js验证****************************/

//01.验证字符串是否为空      isEmptyString(str)

/*******************通用js验证****************************/

/**
 * 验证字符串是否为空
 * @param str
 * @returns {Boolean}
 */
function isEmptyString(str){
	if ($.trim(str)== ""){
		return true;
	} else {
		return false;
	}
}
Date.prototype.pattern=function(fmt) {
    var o = {
    "M+" : this.getMonth()+1, //月份
    "d+" : this.getDate(), //日
    "h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时
    "H+" : this.getHours(), //小时
    "m+" : this.getMinutes(), //分
    "s+" : this.getSeconds(), //秒
    "q+" : Math.floor((this.getMonth()+3)/3), //季度
    "S" : this.getMilliseconds() //毫秒
    };
    var week = {
    "0" : "/u65e5",
    "1" : "/u4e00",
    "2" : "/u4e8c",
    "3" : "/u4e09",
    "4" : "/u56db",
    "5" : "/u4e94",
    "6" : "/u516d"
    };
    if(/(y+)/.test(fmt)){
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    if(/(E+)/.test(fmt)){
        fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "/u661f/u671f" : "/u5468") : "")+week[this.getDay()+""]);
    }
    for(var k in o){
        if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
    return fmt;
};
$.fn.setForm = function(data){
    return this.each(function(){
        var input, name;
        if(data == null){this.reset(); return; }
        for(var i = 0; i < this.length; i++){
            input = this.elements[i];
            //checkbox的name可能是name[]数组形式
            name = (input.type == "checkbox")? input.name.replace(/(.+)\[\]$/, "$1") : input.name;
            if(data[name] == undefined) continue;
            switch(input.type){
            	case "password":
                	continue;
                case "checkbox":
                    if(data[name] == ""){
                        input.checked = false;
                    }else{
                        //数组查找元素
                        if(data[name].indexOf(input.value) > -1){
                            input.checked = true;
                        }else{
                            input.checked = false;
                        }
                    }
                break;
                case "radio":
                    if(data[name] == ""){
                        option.select = false;
                    }else if(input.value == data[name]){
                        option.select = true;
                    }
                break;
                case "select-one"://单选下拉框
                	input.value = data[name];
                break;
                case "select-multiple"://多选下拉框
                	if(data[name] == ""){
                        input.checked = false;
                    }else if(input.value == data[name]){
                        input.checked = true;
                    }
                break;
                case "button": break;
                default: input.value = data[name];
            }
        }
    });
};

/**
*  * 和PHP一样的时间戳格式化函数  *
*Y	4位数字年，y为2位数字，如99即1999年
*m	数字月份，前面有前导0，如01。n 为无前导0数字月份
*F	月份，完整的文本格式，例如 January 或者 March
*M	三个字母缩写表示的月份，例如 Jan 或者 Mar
*d	月份中的第几天，前面有前导0，如03。j 为无前导0的天数
*w	星期中的第几天，以数字表示，0表示星期天
*z	年份中的第几天，范围0-366
*W	年份中的第几周，如第32周
*H	24小时格式，有前导0，h为12小时格式
*G	24小时格式，无前导0，g为对应12小时格式
*i	分钟格式，有前导0
*s	秒格式，有前导0
*A	大写上下午，如AM，a为小写
* @param  {string} format    格式  *
* @param  {int}    timestamp 要格式化的时间 默认为当前时间  *
* @return {string}           格式化的时间字符串  
*/
function _parseDate(format,timestamp){var a,jsdate=((timestamp)?new Date(timestamp):new Date());var pad=function(n,c){if((n=n+"").length<c){return new Array(++c-n.length).join("0")+n}else{return n}};var txt_weekdays=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];var txt_ordin={1:"st",2:"nd",3:"rd",21:"st",22:"nd",23:"rd",31:"st"};var txt_months=["","January","February","March","April","May","June","July","August","September","October","November","December"];var f={d:function(){return pad(f.j(),2)},D:function(){return f.l().substr(0,3)},j:function(){return jsdate.getDate()},l:function(){return txt_weekdays[f.w()]},N:function(){return f.w()+1},S:function(){return txt_ordin[f.j()]?txt_ordin[f.j()]:'th'},w:function(){return jsdate.getDay()},z:function(){return(jsdate-new Date(jsdate.getFullYear()+"/1/1"))/864e5>>0},W:function(){var a=f.z(),b=364+f.L()-a;var nd2,nd=(new Date(jsdate.getFullYear()+"/1/1").getDay()||7)-1;if(b<=2&&((jsdate.getDay()||7)-1)<=2-b){return 1}else{if(a<=2&&nd>=4&&a>=(6-nd)){nd2=new Date(jsdate.getFullYear()-1+"/12/31");return date("W",Math.round(nd2.getTime()/1000))}else{return(1+(nd<=3?((a+nd)/7):(a-(7-nd))/7)>>0)}}},F:function(){return txt_months[f.n()]},m:function(){return pad(f.n(),2)},M:function(){return f.F().substr(0,3)},n:function(){return jsdate.getMonth()+1},t:function(){var n;if((n=jsdate.getMonth()+1)==2){return 28+f.L()}else{if(n&1&&n<8||!(n&1)&&n>7){return 31}else{return 30}}},L:function(){var y=f.Y();return(!(y&3)&&(y%1e2||!(y%4e2)))?1:0},Y:function(){return jsdate.getFullYear()},y:function(){return(jsdate.getFullYear()+"").slice(2)},a:function(){return jsdate.getHours()>11?"pm":"am"},A:function(){return f.a().toUpperCase()},B:function(){var off=(jsdate.getTimezoneOffset()+60)*60;var theSeconds=(jsdate.getHours()*3600)+(jsdate.getMinutes()*60)+jsdate.getSeconds()+off;var beat=Math.floor(theSeconds/86.4);if(beat>1000)beat-=1000;if(beat<0)beat+=1000;if((String(beat)).length==1)beat="00"+beat;if((String(beat)).length==2)beat="0"+beat;return beat},g:function(){return jsdate.getHours()%12||12},G:function(){return jsdate.getHours()},h:function(){return pad(f.g(),2)},H:function(){return pad(jsdate.getHours(),2)},i:function(){return pad(jsdate.getMinutes(),2)},s:function(){return pad(jsdate.getSeconds(),2)},O:function(){var t=pad(Math.abs(jsdate.getTimezoneOffset()/60*100),4);if(jsdate.getTimezoneOffset()>0)t="-"+t;else t="+"+t;return t},P:function(){var O=f.O();return(O.substr(0,3)+":"+O.substr(3,2))},c:function(){return f.Y()+"-"+f.m()+"-"+f.d()+"T"+f.h()+":"+f.i()+":"+f.s()+f.P()},U:function(){return Math.round(jsdate.getTime()/1000)}};return format.replace(/[\\]?([a-zA-Z])/g,function(t,s){if(t!=s){ret=s}else if(f[s]){ret=f[s]()}else{ret=s}return ret})}


