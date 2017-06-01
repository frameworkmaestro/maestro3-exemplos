//>>built
require({cache:{"manager/Currency":function(){
define("manager/Currency",["dojo/_base/declare"],function(_1){
return _1("Manager.Currency",[],{constructor:function(){
},format:function(_2){
var _3=_2.value;
var v="";
for(var i=0;i<_3.length;i++){
var c=_3.charAt(i);
if((c>="0")&&(c<="9")){
v+=c;
}
}
var l=v.length;
if(l==0){
return true;
}
if(l<3){
alert("DÃgitos insuficientes para valor monetÃ¡rio!");
_2.focus();
return true;
}
v=v.slice(0,l-2)+","+v.slice(l-2,l);
v=this.add(v);
_2.value=v;
},remove:function(_4){
var _5=/\(/;
var _6="";
if(_5.test(_4)){
_6="-";
}
_5=/\)|\(|[\.]/g;
_4=_4.replace(_5,"");
if(_4.indexOf("$")>=0){
_4=_4.substring(1,_4.length);
}
return _6+_4;
},add:function(_7){
var _8=/-?[0-9]+\,[0-9]{2}$/;
if(_8.test(_7)){
_8.compile("^-");
_7=addDecimalPoints(_7);
if(_8.test(_7)){
_7="("+_7.replace(_8,"")+")";
}
}
return _7;
}});
});
},"dojo/cldr/nls/pt/number":function(){
define({"group":".","percentSign":"%","exponential":"E","scientificFormat":"#E0","percentFormat":"#,##0%","list":";","infinity":"∞","minusSign":"-","decimal":",","nan":"NaN","perMille":"‰","decimalFormat":"#,##0.###","currencyFormat":"¤#,##0.00;(¤#,##0.00)","plusSign":"+","decimalFormat-long":"000 trilhões","decimalFormat-short":"000 tri"});
},"dojo/store/JsonRest":function(){
define(["../_base/xhr","../_base/lang","../json","../_base/declare","./util/QueryResults"],function(_9,_a,_b,_c,_d){
var _e=null;
return _c("dojo.store.JsonRest",_e,{constructor:function(_f){
this.headers={};
_c.safeMixin(this,_f);
},headers:{},target:"",idProperty:"id",ascendingPrefix:"+",descendingPrefix:"-",get:function(id,_10){
_10=_10||{};
var _11=_a.mixin({Accept:this.accepts},this.headers,_10.headers||_10);
return _9("GET",{url:this.target+id,handleAs:"json",headers:_11});
},accepts:"application/javascript, application/json",getIdentity:function(_12){
return _12[this.idProperty];
},put:function(_13,_14){
_14=_14||{};
var id=("id" in _14)?_14.id:this.getIdentity(_13);
var _15=typeof id!="undefined";
return _9(_15&&!_14.incremental?"PUT":"POST",{url:_15?this.target+id:this.target,postData:_b.stringify(_13),handleAs:"json",headers:_a.mixin({"Content-Type":"application/json",Accept:this.accepts,"If-Match":_14.overwrite===true?"*":null,"If-None-Match":_14.overwrite===false?"*":null},this.headers,_14.headers)});
},add:function(_16,_17){
_17=_17||{};
_17.overwrite=false;
return this.put(_16,_17);
},remove:function(id,_18){
_18=_18||{};
return _9("DELETE",{url:this.target+id,headers:_a.mixin({},this.headers,_18.headers)});
},query:function(_19,_1a){
_1a=_1a||{};
var _1b=_a.mixin({Accept:this.accepts},this.headers,_1a.headers);
if(_1a.start>=0||_1a.count>=0){
_1b.Range=_1b["X-Range"]="items="+(_1a.start||"0")+"-"+(("count" in _1a&&_1a.count!=Infinity)?(_1a.count+(_1a.start||0)-1):"");
}
var _1c=this.target.indexOf("?")>-1;
if(_19&&typeof _19=="object"){
_19=_9.objectToQuery(_19);
_19=_19?(_1c?"&":"?")+_19:"";
}
if(_1a&&_1a.sort){
var _1d=this.sortParam;
_19+=(_19||_1c?"&":"?")+(_1d?_1d+"=":"sort(");
for(var i=0;i<_1a.sort.length;i++){
var _1e=_1a.sort[i];
_19+=(i>0?",":"")+(_1e.descending?this.descendingPrefix:this.ascendingPrefix)+encodeURIComponent(_1e.attribute);
}
if(!_1d){
_19+=")";
}
}
var _1f=_9("GET",{url:this.target+(_19||""),handleAs:"json",headers:_1b});
_1f.total=_1f.then(function(){
var _20=_1f.ioArgs.xhr.getResponseHeader("Content-Range");
return _20&&(_20=_20.match(/\/(.*)/))&&+_20[1];
});
return _d(_1f);
}});
});
},"manager/Patches":function(){
define("manager/Patches",["dojo/_base/declare","dojo/cldr/supplemental"],function(_21,_22){
return _21("Manager.Patches",[],{constructor:function(){
_22.getFirstDayOfWeek=function(_23){
var _24={mv:5,br:0,ae:6,af:6,bh:6,dj:6,dz:6,eg:6,er:6,et:6,iq:6,ir:6,jo:6,ke:6,kw:6,ly:6,ma:6,om:6,qa:6,sa:6,sd:6,so:6,sy:6,tn:6,ye:6,ar:0,as:0,az:0,bw:0,ca:0,cn:0,fo:0,ge:0,gl:0,gu:0,hk:0,il:0,"in":0,jm:0,jp:0,kg:0,kr:0,la:0,mh:0,mn:0,mo:0,mp:0,mt:0,nz:0,ph:0,pk:0,sg:0,th:0,tt:0,tw:0,um:0,us:0,uz:0,vi:0,zw:0};
var _25=_22._region(_23);
var dow=_24[_25];
return (dow===undefined)?1:dow;
};
}});
});
},"manager/Ajax":function(){
define("manager/Ajax",["dojo/_base/declare","dojo/_base/lang","dojo/request","dojo/request/iframe"],function(_26,_27,_28,_29){
return _26("Manager.Ajax",[],{loading:"<img src=\"images/loading.gif\" border=\"0\" alt=\"\">",url:null,form:null,response_type:"JSON",updateElement:null,parameters:null,content:null,remote_method:"",load:null,sync:false,constructor:function(obj){
if(obj.url){
this.url=obj.url;
}
if(obj.form){
this.form=obj.form;
}
if(obj.content){
this.content=obj.content;
}
if(obj.response_type){
this.response_type=obj.response_type;
}
if(obj.updateElement){
this.updateElement=obj.updateElement;
}
if(obj.parameters){
this.parameters=obj.parameters;
}
if(obj.remote_method){
this.remote_method=obj.remote_method;
}
if(obj.callback_function){
this.callback_function=obj.callback_function;
}
if(obj.load){
this.load=obj.load;
}
if(obj.sync){
this.sync=obj.sync;
}
},update:function(_2a,_2b){
manager.getElementById(this.updateElement).innerHTML=_2a;
},error:function(_2c,_2d){
if(errDiv=manager.getElementById("stdout")){
errDiv.innerHTML=_2d.xhr.responseText;
}
},ioerror:function(_2e,_2f){
},getParameters:function(){
var _30={};
if(this.parameters!=null){
if(_27.isFunction(this.parameters)){
_30=this.parameters();
if(!_27.isObject(_30)){
_30={__EVENTARGUMENT:_30};
}
}else{
_30=this.parameters;
}
}
_30.__ISAJAXCALL="yes";
_30.__EVENTTARGETVALUE=this.remote_method;
_30.ajaxResponseType=response_type;
return _30;
},get:function(){
var _31=this.callback_function?this.callback_function:this.update;
var _32=this.response_type.toLowerCase();
var _33=this.url?this.url:manager.getCurrentURL();
var _34={};
_34.args={query:this.getParameters(),handleAs:_32,sync:this.sync};
_28.get(_33,_34.args).then(function(_35){
_31(_35,_34);
});
},call:function(){
var _36=this.response_type.toLowerCase();
if(this.updateElement){
this.update(this.loading);
}
var _37=this.url?this.url:manager.getAction();
var _38=this.callback_function?this.callback_function:this.update;
var _39={};
if(this.form!=null){
this.content.ajaxResponseType=_36;
_39.args={form:this.form,data:this.content,content:this.content,handleAs:_36};
if(manager.page.fileUpload=="yes"){
_29.post(_37,_39.args).then(function(_3a){
_38(_3a,_39);
});
}else{
_28.post(_37,_39.args).then(function(_3b){
_38(_3b,_39);
});
}
}else{
_39.args={updateElement:this.updateElement,data:this.content,content:this.content,handleAs:_36};
_28.post(_37,_39.args).then(function(_3c){
_38(_3c,_39);
});
}
}});
});
},"manager/Utils":function(){
define(["dijit","dojo","dojox"],function(_3d,_3e,_3f){
function _40(_41){
var _42=/^([\w\W]*)(\b\s*)$/;
if(_42.test(_41)){
_41=_41.replace(_42,"$1");
}
return _41;
};
function _43(_44){
var _45=/^(\s*)(\b[\w\W]*)$/;
if(_45.test(_44)){
_44=_44.replace(_45,"$2");
}
return _44;
};
function _46(_47){
var _48=/^(\s*)$/;
if(_48.test(_47)){
_47=_47.replace(_48,"");
if(_47.length==0){
return _47;
}
}
_48=/^(\s*)([\W\w]*)(\b\s*$)/;
if(_48.test(_47)){
_47=_47.replace(_48,"$2");
}
return _47;
};
function _49(_4a){
var _4b=/,/g;
return _4a.replace(_4b,"");
};
function _4c(_4d){
var _4e=new RegExp("(-?[0-9]+)([0-9]{3})");
while(_4e.test(_4d)){
_4d=_4d.replace(_4e,"$1,$2");
}
return _4d;
};
function _4f(_50){
var _51=new RegExp("(-?[0-9]+)([0-9]{3})");
while(_51.test(_50)){
_50=_50.replace(_51,"$1.$2");
}
return _50;
};
function _52(_53,_54){
var _55=new RegExp(_54,"gi");
return _53.replace(_55,"");
};
function _56(_57){
_57=_57.replace(/\u2013/g,"-");
_57=_57.replace(/\u201A/g,"'");
_57=_57.replace(/\u201E/g,"\"");
_57=_57.replace(/\u02C6/g,"^");
_57=_57.replace(/\u2018/g,"'");
_57=_57.replace(/\u2019/g,"'");
_57=_57.replace(/\u201D/g,"\"");
_57=_57.replace(/\u201C/g,"\"");
_57=_57.replace(/\u2022/g,".");
_57=_57.replace(/\u2014/g,"-");
_57=_57.replace(/\u02DC/g,"~");
return _57;
};
function _58(id){
manager.getElementById(id).value=_56(manager.getElementById(id).value);
};
function _59(_5a,_5b,_5c,_5d){
var _5e="",_5f;
var _60=function(s,len){
var _61="",i;
while(_61.length<len){
_61+=s;
}
_61=_61.substr(0,len);
return _61;
};
_5a+="";
_5c=_5c!==undefined?_5c:" ";
if(_5d!="STR_PAD_LEFT"&&_5d!="STR_PAD_RIGHT"&&_5d!="STR_PAD_BOTH"){
_5d="STR_PAD_RIGHT";
}
if((_5f=_5b-_5a.length)>0){
if(_5d=="STR_PAD_LEFT"){
_5a=_60(_5c,_5f)+_5a;
}else{
if(_5d=="STR_PAD_RIGHT"){
_5a=_5a+_60(_5c,_5f);
}else{
if(_5d=="STR_PAD_BOTH"){
_5e=_60(_5c,Math.ceil(_5f/2));
_5a=_5e+_5a+_5e;
_5a=_5a.substr(0,_5b);
}
}
}
}
return _5a;
};
});
},"manager/Base64":function(){
define("manager/Base64",["dojo/_base/declare"],function(_62){
return _62("Manager.Base64",[],{constructor:function(){
},_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(_63){
var _64="";
var _65,_66,_67,_68,_69,_6a,_6b;
var i=0;
_63=this._utf8_encode(_63);
while(i<_63.length){
_65=_63.charCodeAt(i++);
_66=_63.charCodeAt(i++);
_67=_63.charCodeAt(i++);
_68=_65>>2;
_69=((_65&3)<<4)|(_66>>4);
_6a=((_66&15)<<2)|(_67>>6);
_6b=_67&63;
if(isNaN(_66)){
_6a=_6b=64;
}else{
if(isNaN(_67)){
_6b=64;
}
}
_64=_64+this._keyStr.charAt(_68)+this._keyStr.charAt(_69)+this._keyStr.charAt(_6a)+this._keyStr.charAt(_6b);
}
return _64;
},decode:function(_6c){
var _6d="";
var _6e,_6f,_70;
var _71,_72,_73,_74;
var i=0;
_6c=_6c.replace(/[^A-Za-z0-9\+\/\=]/g,"");
while(i<_6c.length){
_71=this._keyStr.indexOf(_6c.charAt(i++));
_72=this._keyStr.indexOf(_6c.charAt(i++));
_73=this._keyStr.indexOf(_6c.charAt(i++));
_74=this._keyStr.indexOf(_6c.charAt(i++));
_6e=(_71<<2)|(_72>>4);
_6f=((_72&15)<<4)|(_73>>2);
_70=((_73&3)<<6)|_74;
_6d=_6d+String.fromCharCode(_6e);
if(_73!=64){
_6d=_6d+String.fromCharCode(_6f);
}
if(_74!=64){
_6d=_6d+String.fromCharCode(_70);
}
}
_6d=this._utf8_decode(_6d);
return _6d;
},_utf8_encode:function(_75){
_75=_75.replace(/\r\n/g,"\n");
var _76="";
for(var n=0;n<_75.length;n++){
var c=_75.charCodeAt(n);
if(c<128){
_76+=String.fromCharCode(c);
}else{
if((c>127)&&(c<2048)){
_76+=String.fromCharCode((c>>6)|192);
_76+=String.fromCharCode((c&63)|128);
}else{
_76+=String.fromCharCode((c>>12)|224);
_76+=String.fromCharCode(((c>>6)&63)|128);
_76+=String.fromCharCode((c&63)|128);
}
}
}
return _76;
},_utf8_decode:function(_77){
var _78="";
var i=0;
var c=c1=c2=0;
while(i<_77.length){
c=_77.charCodeAt(i);
if(c<128){
_78+=String.fromCharCode(c);
i++;
}else{
if((c>191)&&(c<224)){
c2=_77.charCodeAt(i+1);
_78+=String.fromCharCode(((c&31)<<6)|(c2&63));
i+=2;
}else{
c2=_77.charCodeAt(i+1);
c3=_77.charCodeAt(i+2);
_78+=String.fromCharCode(((c&15)<<12)|((c2&63)<<6)|(c3&63));
i+=3;
}
}
}
return _78;
}});
});
},"dojox/grid/_View":function(){
define(["dojo","dijit/registry","../main","dojo/_base/declare","dojo/_base/array","dojo/_base/lang","dojo/_base/connect","dojo/_base/sniff","dojo/query","dojo/_base/window","dojo/text!./resources/View.html","dojo/dnd/Source","dijit/_Widget","dijit/_TemplatedMixin","dojox/html/metrics","./util","dojo/_base/html","./_Builder","dojo/dnd/Avatar","dojo/dnd/Manager"],function(_79,_7a,_7b,_7c,_7d,_7e,_7f,has,_80,win,_81,_82,_83,_84,_85,_86,_87,_88,_89,_8a){
var _8b=function(_8c,_8d){
return _8c.style.cssText==undefined?_8c.getAttribute("style"):_8c.style.cssText;
};
var _8e=_7c("dojox.grid._View",[_83,_84],{defaultWidth:"18em",viewWidth:"",templateString:_81,classTag:"dojoxGrid",marginBottom:0,rowPad:2,_togglingColumn:-1,_headerBuilderClass:_88._HeaderBuilder,_contentBuilderClass:_88._ContentBuilder,postMixInProperties:function(){
this.rowNodes={};
},postCreate:function(){
this.connect(this.scrollboxNode,"onscroll","doscroll");
_86.funnelEvents(this.contentNode,this,"doContentEvent",["mouseover","mouseout","click","dblclick","contextmenu","mousedown"]);
_86.funnelEvents(this.headerNode,this,"doHeaderEvent",["dblclick","mouseover","mouseout","mousemove","mousedown","click","contextmenu"]);
this.content=new this._contentBuilderClass(this);
this.header=new this._headerBuilderClass(this);
if(!this.grid.isLeftToRight()){
this.headerNodeContainer.style.width="";
}
},destroy:function(){
_87.destroy(this.headerNode);
delete this.headerNode;
for(var i in this.rowNodes){
this._cleanupRowWidgets(this.rowNodes[i]);
_87.destroy(this.rowNodes[i]);
}
this.rowNodes={};
if(this.source){
this.source.destroy();
}
this.inherited(arguments);
},focus:function(){
if(has("ie")||has("webkit")||has("opera")){
this.hiddenFocusNode.focus();
}else{
this.scrollboxNode.focus();
}
},setStructure:function(_8f){
var vs=(this.structure=_8f);
if(vs.width&&!isNaN(vs.width)){
this.viewWidth=vs.width+"em";
}else{
this.viewWidth=vs.width||(vs.noscroll?"auto":this.viewWidth);
}
this._onBeforeRow=vs.onBeforeRow||function(){
};
this._onAfterRow=vs.onAfterRow||function(){
};
this.noscroll=vs.noscroll;
if(this.noscroll){
this.scrollboxNode.style.overflow="hidden";
}
this.simpleStructure=Boolean(vs.cells.length==1);
this.testFlexCells();
this.updateStructure();
},_cleanupRowWidgets:function(_90){
if(_90){
_7d.forEach(_80("[widgetId]",_90).map(_7a.byNode),function(w){
if(w._destroyOnRemove){
w.destroy();
delete w;
}else{
if(w.domNode&&w.domNode.parentNode){
w.domNode.parentNode.removeChild(w.domNode);
}
}
});
}
},onBeforeRow:function(_91,_92){
this._onBeforeRow(_91,_92);
if(_91>=0){
this._cleanupRowWidgets(this.getRowNode(_91));
}
},onAfterRow:function(_93,_94,_95){
this._onAfterRow(_93,_94,_95);
var g=this.grid;
_7d.forEach(_80(".dojoxGridStubNode",_95),function(n){
if(n&&n.parentNode){
var lw=n.getAttribute("linkWidget");
var _96=window.parseInt(_87.attr(n,"cellIdx"),10);
var _97=g.getCell(_96);
var w=_7a.byId(lw);
if(w){
n.parentNode.replaceChild(w.domNode,n);
if(!w._started){
w.startup();
}
_79.destroy(n);
}else{
n.innerHTML="";
}
}
},this);
},testFlexCells:function(){
this.flexCells=false;
for(var j=0,row;(row=this.structure.cells[j]);j++){
for(var i=0,_98;(_98=row[i]);i++){
_98.view=this;
this.flexCells=this.flexCells||_98.isFlex();
}
}
return this.flexCells;
},updateStructure:function(){
this.header.update();
this.content.update();
},getScrollbarWidth:function(){
var _99=this.hasVScrollbar();
var _9a=_87.style(this.scrollboxNode,"overflow");
if(this.noscroll||!_9a||_9a=="hidden"){
_99=false;
}else{
if(_9a=="scroll"){
_99=true;
}
}
return (_99?_85.getScrollbar().w:0);
},getColumnsWidth:function(){
var h=this.headerContentNode;
return h&&h.firstChild?(h.firstChild.offsetWidth||_87.style(h.firstChild,"width")):0;
},setColumnsWidth:function(_9b){
this.headerContentNode.firstChild.style.width=_9b+"px";
if(this.viewWidth){
this.viewWidth=_9b+"px";
}
},getWidth:function(){
return this.viewWidth||(this.getColumnsWidth()+this.getScrollbarWidth())+"px";
},getContentWidth:function(){
return Math.max(0,_87._getContentBox(this.domNode).w-this.getScrollbarWidth())+"px";
},render:function(){
this.scrollboxNode.style.height="";
this.renderHeader();
if(this._togglingColumn>=0){
this.setColumnsWidth(this.getColumnsWidth()-this._togglingColumn);
this._togglingColumn=-1;
}
var _9c=this.grid.layout.cells;
var _9d=_7e.hitch(this,function(_9e,_9f){
!this.grid.isLeftToRight()&&(_9f=!_9f);
var inc=_9f?-1:1;
var idx=this.header.getCellNodeIndex(_9e)+inc;
var _a0=_9c[idx];
while(_a0&&_a0.getHeaderNode()&&_a0.getHeaderNode().style.display=="none"){
idx+=inc;
_a0=_9c[idx];
}
if(_a0){
return _a0.getHeaderNode();
}
return null;
});
if(this.grid.columnReordering&&this.simpleStructure){
if(this.source){
this.source.destroy();
}
var _a1="dojoxGrid_bottomMarker";
var _a2="dojoxGrid_topMarker";
if(this.bottomMarker){
_87.destroy(this.bottomMarker);
}
this.bottomMarker=_87.byId(_a1);
if(this.topMarker){
_87.destroy(this.topMarker);
}
this.topMarker=_87.byId(_a2);
if(!this.bottomMarker){
this.bottomMarker=_87.create("div",{"id":_a1,"class":"dojoxGridColPlaceBottom"},win.body());
this._hide(this.bottomMarker);
this.topMarker=_87.create("div",{"id":_a2,"class":"dojoxGridColPlaceTop"},win.body());
this._hide(this.topMarker);
}
this.arrowDim=_87.contentBox(this.bottomMarker);
var _a3=_87.contentBox(this.headerContentNode.firstChild.rows[0]).h;
this.source=new _82(this.headerContentNode.firstChild.rows[0],{horizontal:true,accept:["gridColumn_"+this.grid.id],viewIndex:this.index,generateText:false,onMouseDown:_7e.hitch(this,function(e){
this.header.decorateEvent(e);
if((this.header.overRightResizeArea(e)||this.header.overLeftResizeArea(e))&&this.header.canResize(e)&&!this.header.moveable){
this.header.beginColumnResize(e);
}else{
if(this.grid.headerMenu){
this.grid.headerMenu.onCancel(true);
}
if(e.button===(has("ie")<9?1:0)){
_82.prototype.onMouseDown.call(this.source,e);
}
}
}),onMouseOver:_7e.hitch(this,function(e){
var src=this.source;
if(src._getChildByEvent(e)){
_82.prototype.onMouseOver.apply(src,arguments);
}
}),_markTargetAnchor:_7e.hitch(this,function(_a4){
var src=this.source;
if(src.current==src.targetAnchor&&src.before==_a4){
return;
}
if(src.targetAnchor&&_9d(src.targetAnchor,src.before)){
src._removeItemClass(_9d(src.targetAnchor,src.before),src.before?"After":"Before");
}
_82.prototype._markTargetAnchor.call(src,_a4);
var _a5=_a4?src.targetAnchor:_9d(src.targetAnchor,src.before);
var _a6=0;
if(!_a5){
_a5=src.targetAnchor;
_a6=_87.contentBox(_a5).w+this.arrowDim.w/2+2;
}
var pos=_87.position(_a5,true);
var _a7=Math.floor(pos.x-this.arrowDim.w/2+_a6);
_87.style(this.bottomMarker,"visibility","visible");
_87.style(this.topMarker,"visibility","visible");
_87.style(this.bottomMarker,{"left":_a7+"px","top":(_a3+pos.y)+"px"});
_87.style(this.topMarker,{"left":_a7+"px","top":(pos.y-this.arrowDim.h)+"px"});
if(src.targetAnchor&&_9d(src.targetAnchor,src.before)){
src._addItemClass(_9d(src.targetAnchor,src.before),src.before?"After":"Before");
}
}),_unmarkTargetAnchor:_7e.hitch(this,function(){
var src=this.source;
if(!src.targetAnchor){
return;
}
if(src.targetAnchor&&_9d(src.targetAnchor,src.before)){
src._removeItemClass(_9d(src.targetAnchor,src.before),src.before?"After":"Before");
}
this._hide(this.bottomMarker);
this._hide(this.topMarker);
_82.prototype._unmarkTargetAnchor.call(src);
}),destroy:_7e.hitch(this,function(){
_7f.disconnect(this._source_conn);
_7f.unsubscribe(this._source_sub);
_82.prototype.destroy.call(this.source);
if(this.bottomMarker){
_87.destroy(this.bottomMarker);
delete this.bottomMarker;
}
if(this.topMarker){
_87.destroy(this.topMarker);
delete this.topMarker;
}
}),onDndCancel:_7e.hitch(this,function(){
_82.prototype.onDndCancel.call(this.source);
this._hide(this.bottomMarker);
this._hide(this.topMarker);
})});
this._source_conn=_7f.connect(this.source,"onDndDrop",this,"_onDndDrop");
this._source_sub=_7f.subscribe("/dnd/drop/before",this,"_onDndDropBefore");
this.source.startup();
}
},_hide:function(_a8){
_87.style(_a8,{top:"-10000px","visibility":"hidden"});
},_onDndDropBefore:function(_a9,_aa,_ab){
if(_8a.manager().target!==this.source){
return;
}
this.source._targetNode=this.source.targetAnchor;
this.source._beforeTarget=this.source.before;
var _ac=this.grid.views.views;
var _ad=_ac[_a9.viewIndex];
var _ae=_ac[this.index];
if(_ae!=_ad){
_ad.convertColPctToFixed();
_ae.convertColPctToFixed();
}
},_onDndDrop:function(_af,_b0,_b1){
if(_8a.manager().target!==this.source){
if(_8a.manager().source===this.source){
this._removingColumn=true;
}
return;
}
this._hide(this.bottomMarker);
this._hide(this.topMarker);
var _b2=function(n){
return n?_87.attr(n,"idx"):null;
};
var w=_87.marginBox(_b0[0]).w;
if(_af.viewIndex!==this.index){
var _b3=this.grid.views.views;
var _b4=_b3[_af.viewIndex];
var _b5=_b3[this.index];
if(_b4.viewWidth&&_b4.viewWidth!="auto"){
_b4.setColumnsWidth(_b4.getColumnsWidth()-w);
}
if(_b5.viewWidth&&_b5.viewWidth!="auto"){
_b5.setColumnsWidth(_b5.getColumnsWidth());
}
}
var stn=this.source._targetNode;
var stb=this.source._beforeTarget;
!this.grid.isLeftToRight()&&(stb=!stb);
var _b6=this.grid.layout;
var idx=this.index;
delete this.source._targetNode;
delete this.source._beforeTarget;
_b6.moveColumn(_af.viewIndex,idx,_b2(_b0[0]),_b2(stn),stb);
},renderHeader:function(){
this.headerContentNode.innerHTML=this.header.generateHtml(this._getHeaderContent);
if(this.flexCells){
this.contentWidth=this.getContentWidth();
this.headerContentNode.firstChild.style.width=this.contentWidth;
}
_86.fire(this,"onAfterRow",[-1,this.structure.cells,this.headerContentNode]);
},_getHeaderContent:function(_b7){
var n=_b7.name||_b7.grid.getCellName(_b7);
if(/^\s+$/.test(n)){
n="&nbsp;";
}
var ret=["<div class=\"dojoxGridSortNode"];
if(_b7.index!=_b7.grid.getSortIndex()){
ret.push("\">");
}else{
ret=ret.concat([" ",_b7.grid.sortInfo>0?"dojoxGridSortUp":"dojoxGridSortDown","\"><div class=\"dojoxGridArrowButtonChar\">",_b7.grid.sortInfo>0?"&#9650;":"&#9660;","</div><div class=\"dojoxGridArrowButtonNode\" role=\"presentation\"></div>","<div class=\"dojoxGridColCaption\">"]);
}
ret=ret.concat([n,"</div></div>"]);
return ret.join("");
},resize:function(){
this.adaptHeight();
this.adaptWidth();
},hasHScrollbar:function(_b8){
var _b9=this._hasHScroll||false;
if(this._hasHScroll==undefined||_b8){
if(this.noscroll){
this._hasHScroll=false;
}else{
var _ba=_87.style(this.scrollboxNode,"overflow");
if(_ba=="hidden"){
this._hasHScroll=false;
}else{
if(_ba=="scroll"){
this._hasHScroll=true;
}else{
this._hasHScroll=(this.scrollboxNode.offsetWidth-this.getScrollbarWidth()<this.contentNode.offsetWidth);
}
}
}
}
if(_b9!==this._hasHScroll){
this.grid.update();
}
return this._hasHScroll;
},hasVScrollbar:function(_bb){
var _bc=this._hasVScroll||false;
if(this._hasVScroll==undefined||_bb){
if(this.noscroll){
this._hasVScroll=false;
}else{
var _bd=_87.style(this.scrollboxNode,"overflow");
if(_bd=="hidden"){
this._hasVScroll=false;
}else{
if(_bd=="scroll"){
this._hasVScroll=true;
}else{
this._hasVScroll=(this.scrollboxNode.scrollHeight>this.scrollboxNode.clientHeight);
}
}
}
}
if(_bc!==this._hasVScroll){
this.grid.update();
}
return this._hasVScroll;
},convertColPctToFixed:function(){
var _be=false;
this.grid.initialWidth="";
var _bf=_80("th",this.headerContentNode);
var _c0=_7d.map(_bf,function(c,_c1){
var w=c.style.width;
_87.attr(c,"vIdx",_c1);
if(w&&w.slice(-1)=="%"){
_be=true;
}else{
if(w&&w.slice(-2)=="px"){
return window.parseInt(w,10);
}
}
return _87.contentBox(c).w;
});
if(_be){
_7d.forEach(this.grid.layout.cells,function(_c2,idx){
if(_c2.view==this){
var _c3=_c2.view.getHeaderCellNode(_c2.index);
if(_c3&&_87.hasAttr(_c3,"vIdx")){
var _c4=window.parseInt(_87.attr(_c3,"vIdx"));
this.setColWidth(idx,_c0[_c4]);
_87.removeAttr(_c3,"vIdx");
}
}
},this);
return true;
}
return false;
},adaptHeight:function(_c5){
if(!this.grid._autoHeight){
var h=(this.domNode.style.height&&parseInt(this.domNode.style.height.replace(/px/,""),10))||this.domNode.clientHeight;
var _c6=this;
var _c7=function(){
var v;
for(var i in _c6.grid.views.views){
v=_c6.grid.views.views[i];
if(v!==_c6&&v.hasHScrollbar()){
return true;
}
}
return false;
};
if(_c5||(this.noscroll&&_c7())){
h-=_85.getScrollbar().h;
}
_86.setStyleHeightPx(this.scrollboxNode,h);
}
this.hasVScrollbar(true);
},adaptWidth:function(){
if(this.flexCells){
this.contentWidth=this.getContentWidth();
this.headerContentNode.firstChild.style.width=this.contentWidth;
}
var w=this.scrollboxNode.offsetWidth-this.getScrollbarWidth();
if(!this._removingColumn){
w=Math.max(w,this.getColumnsWidth())+"px";
}else{
w=Math.min(w,this.getColumnsWidth())+"px";
this._removingColumn=false;
}
var cn=this.contentNode;
cn.style.width=w;
this.hasHScrollbar(true);
},setSize:function(w,h){
var ds=this.domNode.style;
var hs=this.headerNode.style;
if(w){
ds.width=w;
hs.width=w;
}
ds.height=(h>=0?h+"px":"");
},renderRow:function(_c8){
var _c9=this.createRowNode(_c8);
this.buildRow(_c8,_c9);
return _c9;
},createRowNode:function(_ca){
var _cb=document.createElement("div");
_cb.className=this.classTag+"Row";
if(this instanceof _7b.grid._RowSelector){
_87.attr(_cb,"role","presentation");
}else{
_87.attr(_cb,"role","row");
if(this.grid.selectionMode!="none"){
_cb.setAttribute("aria-selected","false");
}
}
_cb[_86.gridViewTag]=this.id;
_cb[_86.rowIndexTag]=_ca;
this.rowNodes[_ca]=_cb;
return _cb;
},buildRow:function(_cc,_cd){
this.buildRowContent(_cc,_cd);
this.styleRow(_cc,_cd);
},buildRowContent:function(_ce,_cf){
_cf.innerHTML=this.content.generateHtml(_ce,_ce);
if(this.flexCells&&this.contentWidth){
_cf.firstChild.style.width=this.contentWidth;
}
_86.fire(this,"onAfterRow",[_ce,this.structure.cells,_cf]);
},rowRemoved:function(_d0){
if(_d0>=0){
this._cleanupRowWidgets(this.getRowNode(_d0));
}
this.grid.edit.save(this,_d0);
delete this.rowNodes[_d0];
},getRowNode:function(_d1){
return this.rowNodes[_d1];
},getCellNode:function(_d2,_d3){
var row=this.getRowNode(_d2);
if(row){
return this.content.getCellNode(row,_d3);
}
},getHeaderCellNode:function(_d4){
if(this.headerContentNode){
return this.header.getCellNode(this.headerContentNode,_d4);
}
},styleRow:function(_d5,_d6){
_d6._style=_8b(_d6);
this.styleRowNode(_d5,_d6);
},styleRowNode:function(_d7,_d8){
if(_d8){
this.doStyleRowNode(_d7,_d8);
}
},doStyleRowNode:function(_d9,_da){
this.grid.styleRowNode(_d9,_da);
},updateRow:function(_db){
var _dc=this.getRowNode(_db);
if(_dc){
_dc.style.height="";
this.buildRow(_db,_dc);
}
return _dc;
},updateRowStyles:function(_dd){
this.styleRowNode(_dd,this.getRowNode(_dd));
},lastTop:0,firstScroll:0,_nativeScroll:false,doscroll:function(_de){
if(has("ff")>=13||has("chrome")){
this._nativeScroll=true;
}
var _df=this.grid.isLeftToRight();
if(this.firstScroll<2){
if((!_df&&this.firstScroll==1)||(_df&&this.firstScroll===0)){
var s=_87.marginBox(this.headerNodeContainer);
if(has("ie")){
this.headerNodeContainer.style.width=s.w+this.getScrollbarWidth()+"px";
}else{
if(has("mozilla")){
this.headerNodeContainer.style.width=s.w-this.getScrollbarWidth()+"px";
this.scrollboxNode.scrollLeft=_df?this.scrollboxNode.clientWidth-this.scrollboxNode.scrollWidth:this.scrollboxNode.scrollWidth-this.scrollboxNode.clientWidth;
}
}
}
this.firstScroll++;
}
this.headerNode.scrollLeft=this.scrollboxNode.scrollLeft;
var top=this.scrollboxNode.scrollTop;
if(top!==this.lastTop){
this.grid.scrollTo(top);
}
this._nativeScroll=false;
},setScrollTop:function(_e0){
this.lastTop=_e0;
if(!this._nativeScroll){
this.scrollboxNode.scrollTop=_e0;
}
return this.scrollboxNode.scrollTop;
},doContentEvent:function(e){
if(this.content.decorateEvent(e)){
this.grid.onContentEvent(e);
}
},doHeaderEvent:function(e){
if(this.header.decorateEvent(e)){
this.grid.onHeaderEvent(e);
}
},dispatchContentEvent:function(e){
return this.content.dispatchEvent(e);
},dispatchHeaderEvent:function(e){
return this.header.dispatchEvent(e);
},setColWidth:function(_e1,_e2){
this.grid.setCellWidth(_e1,_e2+"px");
},update:function(){
if(!this.domNode){
return;
}
this.content.update();
this.grid.update();
var _e3=this.scrollboxNode.scrollLeft;
this.scrollboxNode.scrollLeft=_e3;
this.headerNode.scrollLeft=_e3;
}});
var _e4=_7c("dojox.grid._GridAvatar",_89,{construct:function(){
var dd=win.doc;
var a=dd.createElement("table");
a.cellPadding=a.cellSpacing="0";
a.className="dojoxGridDndAvatar";
a.style.position="absolute";
a.style.zIndex=1999;
a.style.margin="0px";
var b=dd.createElement("tbody");
var tr=dd.createElement("tr");
var td=dd.createElement("td");
var img=dd.createElement("td");
tr.className="dojoxGridDndAvatarItem";
img.className="dojoxGridDndAvatarItemImage";
img.style.width="16px";
var _e5=this.manager.source,_e6;
if(_e5.creator){
_e6=_e5._normalizedCreator(_e5.getItem(this.manager.nodes[0].id).data,"avatar").node;
}else{
_e6=this.manager.nodes[0].cloneNode(true);
var _e7,_e8;
if(_e6.tagName.toLowerCase()=="tr"){
_e7=dd.createElement("table");
_e8=dd.createElement("tbody");
_e8.appendChild(_e6);
_e7.appendChild(_e8);
_e6=_e7;
}else{
if(_e6.tagName.toLowerCase()=="th"){
_e7=dd.createElement("table");
_e8=dd.createElement("tbody");
var r=dd.createElement("tr");
_e7.cellPadding=_e7.cellSpacing="0";
r.appendChild(_e6);
_e8.appendChild(r);
_e7.appendChild(_e8);
_e6=_e7;
}
}
}
_e6.id="";
td.appendChild(_e6);
tr.appendChild(img);
tr.appendChild(td);
_87.style(tr,"opacity",0.9);
b.appendChild(tr);
a.appendChild(b);
this.node=a;
var m=_8a.manager();
this.oldOffsetY=m.OFFSET_Y;
m.OFFSET_Y=1;
},destroy:function(){
_8a.manager().OFFSET_Y=this.oldOffsetY;
this.inherited(arguments);
}});
var _e9=_8a.manager().makeAvatar;
_8a.manager().makeAvatar=function(){
var src=this.source;
if(src.viewIndex!==undefined&&!_87.hasClass(win.body(),"dijit_a11y")){
return new _e4(this);
}
return _e9.call(_8a.manager());
};
return _8e;
});
},"manager/Validate":function(){
require(["dojox/validate/_base","dojo/_base/lang","dijit/registry"],function(_ea,_eb,_ec){
Manager.Validate={isValidCpf:function(_ed,_ee){
var _ef=_ec.byId(_ee);
if(_ef){
if(!_ef.required&&(_ef._isEmpty(_ed)||(_ed=="___.___.___-__"))){
return true;
}
}
if(!_eb.isString(_ed)){
if(!_ed){
return false;
}
_ed=_ed+"";
while(_ed.length<11){
_ed="0"+_ed;
}
}
var _f0={format:["###.###.###-##","#########-##","###########"]};
if(_ea.isNumberFormat(_ed,_f0)){
_ed=_ed.replace("-","").replace(/\./g,"");
var cpf=[];
var dv=[];
var i,j,tmp;
for(i=0;i<10;i++){
tmp="";
for(j=0;j<_ed.length;j++){
tmp+=""+i;
}
if(_ed===tmp){
return false;
}
}
for(i=0;i<9;i++){
cpf.push(parseInt(_ed.charAt(i),10));
}
for(i=9;i<12;i++){
dv.push(parseInt(_ed.charAt(i),10));
}
var _f1=[10,9,8,7,6,5,4,3,2];
var sum=0;
for(i=0;i<cpf.length;i++){
sum+=cpf[i]*_f1[i];
}
var dv0=(sum%11)<2?0:11-(sum%11);
if(dv0==dv[0]){
sum=0;
_f1=[11,10,9,8,7,6,5,4,3,2];
cpf.push(dv0);
for(i=0;i<cpf.length;i++){
sum+=cpf[i]*_f1[i];
}
var dv1=(sum%11)<2?0:11-(sum%11);
if(dv1===dv[1]){
return true;
}
}
}
return false;
},isValidCnpj:function(_f2,_f3){
var _f4=_ec.byId(_f3);
if(_f4){
if(!_f4.required&&(_f4._isEmpty(_f2)||(_f2=="__.___.___/____-__"))){
return true;
}
}
if(!_eb.isString(_f2)){
if(!_f2){
return false;
}
_f2=_f2+"";
while(_f2.length<14){
_f2="0"+_f2;
}
}
var _f5={format:["##.###.###/####-##","########/####-##","############-##","##############"]};
if(_ea.isNumberFormat(_f2,_f5)){
_f2=_f2.replace("/","").replace(/\./g,"").replace("-","");
var cgc=[];
var dv=[];
var i,j,tmp;
for(i=0;i<10;i++){
tmp="";
for(j=0;j<_f2.length;j++){
tmp+=""+i;
}
if(_f2===tmp){
return false;
}
}
for(i=0;i<12;i++){
cgc.push(parseInt(_f2.charAt(i),10));
}
for(i=12;i<14;i++){
dv.push(parseInt(_f2.charAt(i),10));
}
var _f6=[5,4,3,2,9,8,7,6,5,4,3,2];
var sum=0;
for(i=0;i<cgc.length;i++){
sum+=cgc[i]*_f6[i];
}
var dv0=(sum%11)<2?0:11-(sum%11);
if(dv0==dv[0]){
sum=0;
_f6=[6,5,4,3,2,9,8,7,6,5,4,3,2];
cgc.push(dv0);
for(i=0;i<cgc.length;i++){
sum+=cgc[i]*_f6[i];
}
var dv1=(sum%11)<2?0:11-(sum%11);
if(dv1===dv[1]){
return true;
}
}
}
},isValidNIT:function(_f7,_f8){
var _f9=_ec.byId(_f8);
if(_f9){
if(!_f9.required&&(_f9._isEmpty(_f7)||(_f7=="___._____.__-_"))){
return true;
}
}
if(!_eb.isString(_f7)){
if(!_f7){
return false;
}
_f7=_f7+"";
while(_f7.length<14){
_f7="0"+_f7;
}
}
var _fa={format:["###.#####.##-#","###########"]};
if(_ea.isNumberFormat(_f7,_fa)){
_f7=_f7.replace(/\./g,"").replace("-","");
var nit=[];
var dv=[];
var i,j,tmp;
for(i=0;i<11;i++){
tmp="";
for(j=0;j<_f7.length;j++){
tmp+=""+i;
}
if(_f7===tmp){
return false;
}
}
for(i=0;i<10;i++){
nit.push(parseInt(_f7.charAt(i),10));
}
for(i=10;i<11;i++){
dv.push(parseInt(_f7.charAt(i),10));
}
var _fb=[3,2,9,8,7,6,5,4,3,2];
var sum=0;
for(i=0;i<nit.length;i++){
sum+=nit[i]*_fb[i];
}
var dv0=11-(sum%11);
if((dv0==10)||(dv0==11)){
dv0=0;
}
if(dv0==dv[0]){
return true;
}
}
return false;
}};
});
},"manager/ElementPane":function(){
define("manager/ElementPane",["dojo/_base/declare","dojo/query","dojox/layout/ContentPane"],function(_fc,_fd,_fe){
return _fc("Manager.ElementPane",[_fe],{executeScripts:true,baseClass:"mElement",onLoad:function(){
var _ff=_fd("#"+this.id+" div.mScripts");
if(_ff.length){
manager.onLoad[_ff[0].id].apply();
manager.onLoad[_ff[0].id]=null;
}
},cleanContent:true});
});
},"manager/Lookup":function(){
define("manager/Lookup",["dojo/_base/declare"],function(_100){
return _100("Manager.Lookup",[],{context:null,url:"",handle:null,constructor:function(){
this.obj=this;
},setContext:function(_101){
this.context=_101;
},start:function(){
this.url=this.context.action+"?__lookupName="+this.context.name;
if(this.context.filter!=""){
var _102=this.context.filter.split(",");
for(var i=0;i<_102.length;i++){
var id=_102[i];
if(id!="none"){
if(field=dijit.byId(id)){
var _103=field.get("value");
}else{
field=manager.getElementById(id);
var _103=escape(field.value);
}
var _104=id;
this.url=this.url+"&"+_104+"="+_103;
}
}
}
this.handle=dojo.subscribe(this.context.name,this,this.deliver);
if(this.context.autocomplete){
this.autocomplete();
}else{
this.open();
}
},open:function(){
var _105=this.context.name;
var _106=manager.getWindow(_105);
if(!_106){
manager.addWindow(_105);
}
manager.getWindow(_105).setHref(this.url);
manager.getWindow(_105).open();
},autocomplete:function(){
var _107=new manager.Ajax({url:this.url,response_type:"TEXT",parameters:{name:this.context.name,__ISAJAXCALL:"yes"},callback_function:function(_108,_109){
var args=_108;
var name=_109.args.content.name;
var _10a=eval(name);
_10a.deliver(name,0,args);
}});
_107.call();
},deliver:function(_10b){
related=this.obj.context.related;
var _10c=/(.*):([^:]*)/;
var _10d=related.split(",");
for(var i=0;i<_10d.length;i++){
var aId=_10c.exec(_10d[i])||Array(_10d[i],_10d[i]);
var _10e=(aId[2]?aId[2]:aId[1]);
var _10f=_10b[_10e];
if(aId[1]!="none"){
var _110=dijit.byId(aId[1]);
if(_110!=null){
if(_110.declaredClass==="Manager.DateTextBox"){
var _111=_10f.split("/");
_110.set("value",_111[2]+"-"+_111[1]+"-"+_111[0]);
}else{
_110.set("value",_10f);
}
}else{
_110=manager.getElementById(aId[1]);
if(_110!=null){
_110.value=_10f;
_110=manager.getElementById(_110.name+"_sel");
if(_110!=null){
_110.value=_10f;
}
}
}
}
}
dojo.unsubscribe(this.handle);
manager.getWindow(this.obj.context.name).close();
}});
});
},"dojo/dnd/Selector":function(){
define(["../_base/array","../_base/declare","../_base/kernel","../_base/lang","../dom","../dom-construct","../mouse","../_base/NodeList","../on","../touch","./common","./Container"],function(_112,_113,_114,lang,dom,_115,_116,_117,on,_118,dnd,_119){
var _11a=_113("dojo.dnd.Selector",_119,{constructor:function(node,_11b){
if(!_11b){
_11b={};
}
this.singular=_11b.singular;
this.autoSync=_11b.autoSync;
this.selection={};
this.anchor=null;
this.simpleSelection=false;
this.events.push(on(this.node,_118.press,lang.hitch(this,"onMouseDown")),on(this.node,_118.release,lang.hitch(this,"onMouseUp")));
},singular:false,getSelectedNodes:function(){
var t=new _117();
var e=dnd._empty;
for(var i in this.selection){
if(i in e){
continue;
}
t.push(dom.byId(i));
}
return t;
},selectNone:function(){
return this._removeSelection()._removeAnchor();
},selectAll:function(){
this.forInItems(function(data,id){
this._addItemClass(dom.byId(id),"Selected");
this.selection[id]=1;
},this);
return this._removeAnchor();
},deleteSelectedNodes:function(){
var e=dnd._empty;
for(var i in this.selection){
if(i in e){
continue;
}
var n=dom.byId(i);
this.delItem(i);
_115.destroy(n);
}
this.anchor=null;
this.selection={};
return this;
},forInSelectedItems:function(f,o){
o=o||_114.global;
var s=this.selection,e=dnd._empty;
for(var i in s){
if(i in e){
continue;
}
f.call(o,this.getItem(i),i,this);
}
},sync:function(){
_11a.superclass.sync.call(this);
if(this.anchor){
if(!this.getItem(this.anchor.id)){
this.anchor=null;
}
}
var t=[],e=dnd._empty;
for(var i in this.selection){
if(i in e){
continue;
}
if(!this.getItem(i)){
t.push(i);
}
}
_112.forEach(t,function(i){
delete this.selection[i];
},this);
return this;
},insertNodes:function(_11c,data,_11d,_11e){
var _11f=this._normalizedCreator;
this._normalizedCreator=function(item,hint){
var t=_11f.call(this,item,hint);
if(_11c){
if(!this.anchor){
this.anchor=t.node;
this._removeItemClass(t.node,"Selected");
this._addItemClass(this.anchor,"Anchor");
}else{
if(this.anchor!=t.node){
this._removeItemClass(t.node,"Anchor");
this._addItemClass(t.node,"Selected");
}
}
this.selection[t.node.id]=1;
}else{
this._removeItemClass(t.node,"Selected");
this._removeItemClass(t.node,"Anchor");
}
return t;
};
_11a.superclass.insertNodes.call(this,data,_11d,_11e);
this._normalizedCreator=_11f;
return this;
},destroy:function(){
_11a.superclass.destroy.call(this);
this.selection=this.anchor=null;
},onMouseDown:function(e){
if(this.autoSync){
this.sync();
}
if(!this.current){
return;
}
if(!this.singular&&!dnd.getCopyKeyState(e)&&!e.shiftKey&&(this.current.id in this.selection)){
this.simpleSelection=true;
if(_116.isLeft(e)){
e.stopPropagation();
e.preventDefault();
}
return;
}
if(!this.singular&&e.shiftKey){
if(!dnd.getCopyKeyState(e)){
this._removeSelection();
}
var c=this.getAllNodes();
if(c.length){
if(!this.anchor){
this.anchor=c[0];
this._addItemClass(this.anchor,"Anchor");
}
this.selection[this.anchor.id]=1;
if(this.anchor!=this.current){
var i=0,node;
for(;i<c.length;++i){
node=c[i];
if(node==this.anchor||node==this.current){
break;
}
}
for(++i;i<c.length;++i){
node=c[i];
if(node==this.anchor||node==this.current){
break;
}
this._addItemClass(node,"Selected");
this.selection[node.id]=1;
}
this._addItemClass(this.current,"Selected");
this.selection[this.current.id]=1;
}
}
}else{
if(this.singular){
if(this.anchor==this.current){
if(dnd.getCopyKeyState(e)){
this.selectNone();
}
}else{
this.selectNone();
this.anchor=this.current;
this._addItemClass(this.anchor,"Anchor");
this.selection[this.current.id]=1;
}
}else{
if(dnd.getCopyKeyState(e)){
if(this.anchor==this.current){
delete this.selection[this.anchor.id];
this._removeAnchor();
}else{
if(this.current.id in this.selection){
this._removeItemClass(this.current,"Selected");
delete this.selection[this.current.id];
}else{
if(this.anchor){
this._removeItemClass(this.anchor,"Anchor");
this._addItemClass(this.anchor,"Selected");
}
this.anchor=this.current;
this._addItemClass(this.current,"Anchor");
this.selection[this.current.id]=1;
}
}
}else{
if(!(this.current.id in this.selection)){
this.selectNone();
this.anchor=this.current;
this._addItemClass(this.current,"Anchor");
this.selection[this.current.id]=1;
}
}
}
}
e.stopPropagation();
e.preventDefault();
},onMouseUp:function(){
if(!this.simpleSelection){
return;
}
this.simpleSelection=false;
this.selectNone();
if(this.current){
this.anchor=this.current;
this._addItemClass(this.anchor,"Anchor");
this.selection[this.current.id]=1;
}
},onMouseMove:function(){
this.simpleSelection=false;
},onOverEvent:function(){
this.onmousemoveEvent=on(this.node,_118.move,lang.hitch(this,"onMouseMove"));
},onOutEvent:function(){
if(this.onmousemoveEvent){
this.onmousemoveEvent.remove();
delete this.onmousemoveEvent;
}
},_removeSelection:function(){
var e=dnd._empty;
for(var i in this.selection){
if(i in e){
continue;
}
var node=dom.byId(i);
if(node){
this._removeItemClass(node,"Selected");
}
}
this.selection={};
return this;
},_removeAnchor:function(){
if(this.anchor){
this._removeItemClass(this.anchor,"Anchor");
this.anchor=null;
}
return this;
}});
return _11a;
});
},"manager/Window":function(){
define("manager/Window",["dojo/_base/declare","dojo/_base/lang","dojo/on","dojo/topic","manager/Dialog","manager/DialogSimple"],function(_120,lang,on,_121,_122,_123){
return _120("Manager.Window",null,{id:"",title:"",href:"",parent:null,form:"",template:"",element:"",dialog:null,scripts:null,constructor:function(id){
this.obj=this;
this.id=id;
this.dialog=new _122({id:id});
on(this.dialog,"load",lang.hitch(this.dialog,function(){
this.enableDrag();
this._position();
}));
},setTitle:function(_124){
this.title=_124;
},setHref:function(href){
this.href=href;
},push:function(){
this.obj.template=manager.page.template;
this.obj.element=manager.page.element;
manager.pushWindow(this.obj);
},open:function(){
this.obj.push();
manager.page.get(this.obj.href,this.obj.id);
this.dialog.show();
_121.publish("windowActionOpen",this.obj.id);
},show:function(){
this.dialog.show();
},hide:function(){
this.dialog.hide();
},setContent:function(_125){
this.dialog.set("content",_125);
},showContent:function(_126){
this.obj.push();
this.dialog.set("content",_126);
this.dialog.show();
},close:function(){
this.dialog.hide();
_121.publish("windowActionClose",this.obj.id);
this.dialog.destroyDescendants();
this.obj.pop();
},pop:function(){
manager.page.template=this.obj.template;
manager.page.element=this.obj.element;
manager.popWindow();
}});
});
},"manager/UTF8":function(){
define("manager/UTF8",["dojo/_base/declare"],function(_127){
return _127("Manager.UTF8",[],{constructor:function(id){
},encode:function(_128){
_128=_128.replace(/\r\n/g,"\n");
var _129="";
for(var n=0;n<_128.length;n++){
var c=_128.charCodeAt(n);
if(c<128){
_129+=String.fromCharCode(c);
}else{
if((c>127)&&(c<2048)){
_129+=String.fromCharCode((c>>6)|192);
_129+=String.fromCharCode((c&63)|128);
}else{
_129+=String.fromCharCode((c>>12)|224);
_129+=String.fromCharCode(((c>>6)&63)|128);
_129+=String.fromCharCode((c&63)|128);
}
}
}
return _129;
},decode:function(_12a){
var _12b="";
var i=0;
var c=c1=c2=0;
while(i<_12a.length){
c=_12a.charCodeAt(i);
if(c<128){
_12b+=String.fromCharCode(c);
i++;
}else{
if((c>191)&&(c<224)){
c2=_12a.charCodeAt(i+1);
_12b+=String.fromCharCode(((c&31)<<6)|(c2&63));
i+=2;
}else{
c2=_12a.charCodeAt(i+1);
c3=_12a.charCodeAt(i+2);
_12b+=String.fromCharCode(((c&15)<<12)|((c2&63)<<6)|(c3&63));
i+=3;
}
}
}
return _12b;
}});
});
},"manager/DnD":function(){
define("manager/DnD",["dojo/_base/declare"],function(_12c){
return _12c("Manager.Dnd",[],{id:"",dropped:null,constructor:function(id){
this.id=id;
this.dropped=new Array();
},onDrop:function(_12d,s,n,c){
var sid=s.node.id;
var obj=this;
dojo.forEach(n,function(e,i,a){
obj.dropped.push(e.id+"="+_12d);
});
},onSubmit:function(){
var s="";
dojo.forEach(this.dropped,function(e,i,a){
s=s+((s=="")?"":"&")+e;
});
dojo.byId(this.id).value=s;
return true;
}});
});
},"dojox/grid/DataSelection":function(){
define(["dojo/_base/declare","./_SelectionPreserver","./Selection"],function(_12e,_12f,_130){
return _12e("dojox.grid.DataSelection",_130,{constructor:function(grid){
if(grid.keepSelection){
this.preserver=new _12f(this);
}
},destroy:function(){
if(this.preserver){
this.preserver.destroy();
}
},getFirstSelected:function(){
var idx=_130.prototype.getFirstSelected.call(this);
if(idx==-1){
return null;
}
return this.grid.getItem(idx);
},getNextSelected:function(_131){
var _132=this.grid.getItemIndex(_131);
var idx=_130.prototype.getNextSelected.call(this,_132);
if(idx==-1){
return null;
}
return this.grid.getItem(idx);
},getSelected:function(){
var _133=[];
for(var i=0,l=this.selected.length;i<l;i++){
if(this.selected[i]){
_133.push(this.grid.getItem(i));
}
}
return _133;
},addToSelection:function(_134){
if(this.mode=="none"){
return;
}
var idx=null;
if(typeof _134=="number"||typeof _134=="string"){
idx=_134;
}else{
idx=this.grid.getItemIndex(_134);
}
_130.prototype.addToSelection.call(this,idx);
},deselect:function(_135){
if(this.mode=="none"){
return;
}
var idx=null;
if(typeof _135=="number"||typeof _135=="string"){
idx=_135;
}else{
idx=this.grid.getItemIndex(_135);
}
_130.prototype.deselect.call(this,idx);
},deselectAll:function(_136){
var idx=null;
if(_136||typeof _136=="number"){
if(typeof _136=="number"||typeof _136=="string"){
idx=_136;
}else{
idx=this.grid.getItemIndex(_136);
}
_130.prototype.deselectAll.call(this,idx);
}else{
this.inherited(arguments);
}
}});
});
},"dojo/dnd/Manager":function(){
define(["../_base/array","../_base/declare","../_base/lang","../_base/window","../dom-class","../Evented","../has","../keys","../on","../topic","../touch","./common","./autoscroll","./Avatar"],function(_137,_138,lang,win,_139,_13a,has,keys,on,_13b,_13c,dnd,_13d,_13e){
var _13f=_138("dojo.dnd.Manager",[_13a],{constructor:function(){
this.avatar=null;
this.source=null;
this.nodes=[];
this.copy=true;
this.target=null;
this.canDropFlag=false;
this.events=[];
},OFFSET_X:has("touch")?0:16,OFFSET_Y:has("touch")?-64:16,overSource:function(_140){
if(this.avatar){
this.target=(_140&&_140.targetState!="Disabled")?_140:null;
this.canDropFlag=Boolean(this.target);
this.avatar.update();
}
_13b.publish("/dnd/source/over",_140);
},outSource:function(_141){
if(this.avatar){
if(this.target==_141){
this.target=null;
this.canDropFlag=false;
this.avatar.update();
_13b.publish("/dnd/source/over",null);
}
}else{
_13b.publish("/dnd/source/over",null);
}
},startDrag:function(_142,_143,copy){
_13d.autoScrollStart(win.doc);
this.source=_142;
this.nodes=_143;
this.copy=Boolean(copy);
this.avatar=this.makeAvatar();
win.body().appendChild(this.avatar.node);
_13b.publish("/dnd/start",_142,_143,this.copy);
function _144(e){
e.preventDefault();
e.stopPropagation();
};
this.events=[on(win.doc,_13c.move,lang.hitch(this,"onMouseMove")),on(win.doc,_13c.release,lang.hitch(this,"onMouseUp")),on(win.doc,"keydown",lang.hitch(this,"onKeyDown")),on(win.doc,"keyup",lang.hitch(this,"onKeyUp")),on(win.doc,"dragstart",_144),on(win.body(),"selectstart",_144)];
var c="dojoDnd"+(copy?"Copy":"Move");
_139.add(win.body(),c);
},canDrop:function(flag){
var _145=Boolean(this.target&&flag);
if(this.canDropFlag!=_145){
this.canDropFlag=_145;
this.avatar.update();
}
},stopDrag:function(){
_139.remove(win.body(),["dojoDndCopy","dojoDndMove"]);
_137.forEach(this.events,function(_146){
_146.remove();
});
this.events=[];
this.avatar.destroy();
this.avatar=null;
this.source=this.target=null;
this.nodes=[];
},makeAvatar:function(){
return new _13e(this);
},updateAvatar:function(){
this.avatar.update();
},onMouseMove:function(e){
var a=this.avatar;
if(a){
_13d.autoScrollNodes(e);
var s=a.node.style;
s.left=(e.pageX+this.OFFSET_X)+"px";
s.top=(e.pageY+this.OFFSET_Y)+"px";
var copy=Boolean(this.source.copyState(dnd.getCopyKeyState(e)));
if(this.copy!=copy){
this._setCopyStatus(copy);
}
}
if(has("touch")){
e.preventDefault();
}
},onMouseUp:function(e){
if(this.avatar){
if(this.target&&this.canDropFlag){
var copy=Boolean(this.source.copyState(dnd.getCopyKeyState(e)));
_13b.publish("/dnd/drop/before",this.source,this.nodes,copy,this.target,e);
_13b.publish("/dnd/drop",this.source,this.nodes,copy,this.target,e);
}else{
_13b.publish("/dnd/cancel");
}
this.stopDrag();
}
},onKeyDown:function(e){
if(this.avatar){
switch(e.keyCode){
case keys.CTRL:
var copy=Boolean(this.source.copyState(true));
if(this.copy!=copy){
this._setCopyStatus(copy);
}
break;
case keys.ESCAPE:
_13b.publish("/dnd/cancel");
this.stopDrag();
break;
}
}
},onKeyUp:function(e){
if(this.avatar&&e.keyCode==keys.CTRL){
var copy=Boolean(this.source.copyState(false));
if(this.copy!=copy){
this._setCopyStatus(copy);
}
}
},_setCopyStatus:function(copy){
this.copy=copy;
this.source._markDndStatus(this.copy);
this.updateAvatar();
_139.replace(win.body(),"dojoDnd"+(this.copy?"Copy":"Move"),"dojoDnd"+(this.copy?"Move":"Copy"));
}});
dnd._manager=null;
_13f.manager=dnd.manager=function(){
if(!dnd._manager){
dnd._manager=new _13f();
}
return dnd._manager;
};
return _13f;
});
},"manager/GridInput":function(){
define("manager/GridInput",["dojo/_base/declare","dojo/store/Memory","dojo/store/Observable","dojo/json"],function(_147,_148,_149,JSON){
return _147("Manager.GridInput",[],{constructor:function(id,_14a,_14b){
this.idGridInput=id;
this.fields=_14a;
this.idField=manager.getElementById(id+"_id");
this.actionGrid=_14b;
this.table=manager.getElementById(id+"_gridInput");
this.rowCount=0;
this.gridInputStore=new _148();
this.gridInputStore=_149(this.gridInputStore);
this.gridInputQuery=this.gridInputStore.query();
this.gridInputQuery.observe(function(row,_14c,_14d){
if(_14d>-1){
}
});
},setData:function(){
var data=manager.getElementById(this.idGridInput+"_data");
data.value=JSON.stringify(this.gridInputStore.data);
},loadData:function(data){
for(var _14e in data){
data[_14e].id=++this.rowCount;
this.gridInputStore.add(data[_14e]);
}
this.setData();
manager.doAjaxText(this.actionGrid,this.idGridInput+"_divGrid",this.idGridInput+"_divGrid");
},getInput:function(){
var _14f=this.fields;
var _150=_14f.split(",");
var _151={};
for(var i=0;i<_150.length;i++){
var id=_150[i];
var _152=dijit.byId(id);
if(_152!=null){
_151[id]=_152.get("value");
if(_152.get("displayedValue")!=_152.get("value")){
_151[id+"_text"]=_152.get("displayedValue");
}
}else{
var _152=manager.getElementById(_150[i]);
_151[id]=_152.value;
}
}
return _151;
},select:function(data){
},edit:function(id){
var _153=this.fields;
var _154=_153.split(",");
var _155={};
var data=this.gridInputStore.get(id);
this.idField.value=id;
for(var i=0;i<_154.length;i++){
var id=_154[i];
var _156=dijit.byId(id);
var _157=data[id];
if(_156!=null){
_156.set("value",_157);
}else{
var _156=manager.getElementById(_154[i]);
_156.value=_157;
}
}
},clearInput:function(){
var _158=this.fields;
var _159=_158.split(",");
var _15a={};
var _15b="";
this.idField.value="";
for(var i=0;i<_159.length;i++){
var id=_159[i];
var _15c=dijit.byId(id);
if(_15c!=null){
_15c.set("value",_15b);
if(_15c.get("displayedValue")!=_15c.get("value")){
_15c.set("displayedValue",_15b);
}
}else{
var _15c=manager.getElementById(_159[i]);
_15c.value=_15b;
}
}
},add:function(){
var row=this.getInput();
if(this.gridInputStore.get(this.idField.value)){
row.id=this.idField.value;
this.gridInputStore.put(row);
}else{
row.id=++this.rowCount;
this.gridInputStore.add(row);
}
this.setData();
this.clearInput();
manager.doAjaxText(this.actionGrid,this.idGridInput+"_divGrid",this.idGridInput+"_divGrid");
},remove:function(id){
if(id){
this.gridInputStore.remove(id);
}else{
var div=manager.getElementById(this.idGridInput+"_divGrid");
var _15d=manager.getElementsByTagName("TBODY",div).item(0);
var rows=manager.getElementsByTagName("TR",_15d);
for(var i=0;i<rows.length;i++){
var _15e=manager.getElementsByTagName("INPUT",rows[i]);
if(_15e[0].type=="checkbox"){
if(_15e[0].checked){
var id=_15e[0].value;
this.gridInputStore.remove(id);
}
}
}
}
this.setData();
manager.doAjaxText(this.actionGrid,this.idGridInput+"_divGrid",this.idGridInput+"_divGrid");
}});
});
},"manager/DataGrid":function(){
define("manager/DataGrid",["dojo/_base/declare","dojox/grid/DataGrid"],function(_15f,_160){
return _15f("Manager.DataGrid",[_160],{constructor:function(name,page){
this.obj=this;
this.name=name;
this.page=page;
this.widget=null;
},canSort:function(i){
return (i!=3);
},get:function(_161){
return [this.index,_161].join(", ");
},removeEscape:function(_162){
return _162?_162.replace("&lt","<"):"";
},goPage:function(_163){
manager.setElementValueById("_PAGING","yes");
manager.setElementValueById(this.name+"_PAGE",this.page);
manager.setElementValueById(this.name+"_GOPAGE",_163);
manager.setElementValueById("_GRIDNAME",this.name);
manager.doPostBack(this.name);
}});
});
},"dojox/grid/_RowSelector":function(){
define(["dojo/_base/declare","./_View"],function(_164,_165){
return _164("dojox.grid._RowSelector",_165,{defaultWidth:"2em",noscroll:true,padBorderWidth:2,buildRendering:function(){
this.inherited("buildRendering",arguments);
this.scrollboxNode.style.overflow="hidden";
this.headerNode.style.visibility="hidden";
},getWidth:function(){
return this.viewWidth||this.defaultWidth;
},buildRowContent:function(_166,_167){
var w=this.contentWidth||0;
_167.innerHTML="<table class=\"dojoxGridRowbarTable\" style=\"width:"+w+"px;height:1px;\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" role=\"presentation\"><tr><td class=\"dojoxGridRowbarInner\">&nbsp;</td></tr></table>";
},renderHeader:function(){
},updateRow:function(){
},resize:function(){
this.adaptHeight();
},adaptWidth:function(){
if(!("contentWidth" in this)&&this.contentNode&&this.contentNode.offsetWidth>0){
this.contentWidth=this.contentNode.offsetWidth-this.padBorderWidth;
}
},doStyleRowNode:function(_168,_169){
var n=["dojoxGridRowbar dojoxGridNonNormalizedCell"];
if(this.grid.rows.isOver(_168)){
n.push("dojoxGridRowbarOver");
}
if(this.grid.selection.isSelected(_168)){
n.push("dojoxGridRowbarSelected");
}
_169.className=n.join(" ");
},domouseover:function(e){
this.grid.onMouseOverRow(e);
},domouseout:function(e){
if(!this.isIntraRowEvent(e)){
this.grid.onMouseOutRow(e);
}
}});
});
},"dojox/grid/_Layout":function(){
define(["dojo/_base/kernel","../main","dojo/_base/declare","dojo/_base/array","dojo/_base/lang","dojo/dom-geometry","./cells","./_RowSelector"],function(dojo,_16a,_16b,_16c,lang,_16d){
return _16b("dojox.grid._Layout",null,{constructor:function(_16e){
this.grid=_16e;
},cells:[],structure:null,defaultWidth:"6em",moveColumn:function(_16f,_170,_171,_172,_173){
var _174=this.structure[_16f].cells[0];
var _175=this.structure[_170].cells[0];
var cell=null;
var _176=0;
var _177=0;
for(var i=0,c;c=_174[i];i++){
if(c.index==_171){
_176=i;
break;
}
}
cell=_174.splice(_176,1)[0];
cell.view=this.grid.views.views[_170];
for(i=0,c=null;c=_175[i];i++){
if(c.index==_172){
_177=i;
break;
}
}
if(!_173){
_177+=1;
}
_175.splice(_177,0,cell);
var _178=this.grid.getCell(this.grid.getSortIndex());
if(_178){
_178._currentlySorted=this.grid.getSortAsc();
}
this.cells=[];
_171=0;
var v;
for(i=0;v=this.structure[i];i++){
for(var j=0,cs;cs=v.cells[j];j++){
for(var k=0;c=cs[k];k++){
c.index=_171;
this.cells.push(c);
if("_currentlySorted" in c){
var si=_171+1;
si*=c._currentlySorted?1:-1;
this.grid.sortInfo=si;
delete c._currentlySorted;
}
_171++;
}
}
}
_16c.forEach(this.cells,function(c){
var _179=c.markup[2].split(" ");
var _17a=parseInt(_179[1].substring(5));
if(_17a!=c.index){
_179[1]="idx=\""+c.index+"\"";
c.markup[2]=_179.join(" ");
}
});
this.grid.setupHeaderMenu();
},setColumnVisibility:function(_17b,_17c){
var cell=this.cells[_17b];
if(cell.hidden==_17c){
cell.hidden=!_17c;
var v=cell.view,w=v.viewWidth;
if(w&&w!="auto"){
v._togglingColumn=_16d.getMarginBox(cell.getHeaderNode()).w||0;
}
v.update();
return true;
}else{
return false;
}
},addCellDef:function(_17d,_17e,_17f){
var self=this;
var _180=function(_181){
var w=0;
if(_181.colSpan>1){
w=0;
}else{
w=_181.width||self._defaultCellProps.width||self.defaultWidth;
if(!isNaN(w)){
w=w+"em";
}
}
return w;
};
var _182={grid:this.grid,subrow:_17d,layoutIndex:_17e,index:this.cells.length};
if(_17f&&_17f instanceof _16a.grid.cells._Base){
var _183=lang.clone(_17f);
_182.unitWidth=_180(_183._props);
_183=lang.mixin(_183,this._defaultCellProps,_17f._props,_182);
return _183;
}
var _184=_17f.type||_17f.cellType||this._defaultCellProps.type||this._defaultCellProps.cellType||_16a.grid.cells.Cell;
if(lang.isString(_184)){
_184=lang.getObject(_184);
}
_182.unitWidth=_180(_17f);
return new _184(lang.mixin({},this._defaultCellProps,_17f,_182));
},addRowDef:function(_185,_186){
var _187=[];
var _188=0,_189=0,_18a=true;
for(var i=0,def,cell;(def=_186[i]);i++){
cell=this.addCellDef(_185,i,def);
_187.push(cell);
this.cells.push(cell);
if(_18a&&cell.relWidth){
_188+=cell.relWidth;
}else{
if(cell.width){
var w=cell.width;
if(typeof w=="string"&&w.slice(-1)=="%"){
_189+=window.parseInt(w,10);
}else{
if(w=="auto"){
_18a=false;
}
}
}
}
}
if(_188&&_18a){
_16c.forEach(_187,function(cell){
if(cell.relWidth){
cell.width=cell.unitWidth=((cell.relWidth/_188)*(100-_189))+"%";
}
});
}
return _187;
},addRowsDef:function(_18b){
var _18c=[];
if(lang.isArray(_18b)){
if(lang.isArray(_18b[0])){
for(var i=0,row;_18b&&(row=_18b[i]);i++){
_18c.push(this.addRowDef(i,row));
}
}else{
_18c.push(this.addRowDef(0,_18b));
}
}
return _18c;
},addViewDef:function(_18d){
this._defaultCellProps=_18d.defaultCell||{};
if(_18d.width&&_18d.width=="auto"){
delete _18d.width;
}
return lang.mixin({},_18d,{cells:this.addRowsDef(_18d.rows||_18d.cells)});
},setStructure:function(_18e){
this.fieldIndex=0;
this.cells=[];
var s=this.structure=[];
if(this.grid.rowSelector){
var sel={type:_16a._scopeName+".grid._RowSelector"};
if(lang.isString(this.grid.rowSelector)){
var _18f=this.grid.rowSelector;
if(_18f=="false"){
sel=null;
}else{
if(_18f!="true"){
sel["width"]=_18f;
}
}
}else{
if(!this.grid.rowSelector){
sel=null;
}
}
if(sel){
s.push(this.addViewDef(sel));
}
}
var _190=function(def){
return ("name" in def||"field" in def||"get" in def);
};
var _191=function(def){
if(lang.isArray(def)){
if(lang.isArray(def[0])||_190(def[0])){
return true;
}
}
return false;
};
var _192=function(def){
return (def!==null&&lang.isObject(def)&&("cells" in def||"rows" in def||("type" in def&&!_190(def))));
};
if(lang.isArray(_18e)){
var _193=false;
for(var i=0,st;(st=_18e[i]);i++){
if(_192(st)){
_193=true;
break;
}
}
if(!_193){
s.push(this.addViewDef({cells:_18e}));
}else{
for(i=0;(st=_18e[i]);i++){
if(_191(st)){
s.push(this.addViewDef({cells:st}));
}else{
if(_192(st)){
s.push(this.addViewDef(st));
}
}
}
}
}else{
if(_192(_18e)){
s.push(this.addViewDef(_18e));
}
}
this.cellCount=this.cells.length;
this.grid.setupHeaderMenu();
}});
});
},"manager/DialogSimple":function(){
define("manager/DialogSimple",["dojo/_base/declare","manager/Dialog"],function(_194,_195){
return _194("Manager.DialogSimple",[_195],{});
});
},"manager/Page":function(){
define("manager/Page",["dojo/_base/declare","dojo/_base/lang","dojo/_base/window","dojo/_base/array","dijit/registry","dojo/dom-construct","dojo/dom-form","dojo/i18n!./nls/messages","manager/Base64","dojox/widget/Standby"],function(_196,lang,_197,_198,_199,_19a,_19b,i18n,_19c,_19d){
return _196("Manager.Page",[],{version:"1.1",ajaxEvent:"no",fileUpload:"no",layout:"default",element:"",mainElement:"centerPane",template:"base",eventTarget:"",i18n:i18n,standby:"",callbackFunction:"",constructor:function(){
this.obj=this;
},getContent:function(_19e){
var _19f={__LAYOUT:manager.page.layout,__ELEMENT:manager.page.element,__TEMPLATE:manager.page.template,__ISFILEUPLOAD:manager.page.fileUpload,__ISAJAXEVENT:manager.page.ajaxEvent,__EVENTTARGET:manager.page.eventTarget};
var _1a0={};
if(_19e){
_1a0=_19b.toObject(_19e);
}
return lang.mixin(_19f,_1a0);
},get:function(url,_1a1){
if(_1a1==""){
_1a1=this.mainElement;
}
_199.byId(_1a1).set("href",url);
},page:function(url){
manager.disconnect();
_197.location=url;
},ajax:function(url,_1a2,_1a3){
var _1a4=this.fileUpload;
this.setBusy(_1a3);
this.ajaxEvent="yes";
this.template="ajax";
this.fileUpload="no";
this.callbackFunction=_1a2;
var _1a5=new Manager.Ajax({url:url,form:_1a3,content:manager.page.getContent(_1a3),response_type:"JSON",callback_function:manager.page.callbackFunction});
_1a5.call();
this.fileUpload=_1a4;
},ajaxText:function(url,_1a6,_1a7){
var _1a8=this.fileUpload;
this.setBusy(_1a7);
this.ajaxEvent="yes";
this.template="ajax";
this.fileUpload="no";
var _1a9=this.element;
this.element=_1a6;
var _1aa=new Manager.Ajax({url:url,form:_1a7,content:manager.page.getContent(_1a7),response_type:"JSON",callback_function:manager.page.callback});
_1aa.call();
this.element=_1a9;
this.fileUpload=_1a8;
},postback:function(_1ab){
if(_1ab){
this.setBusy(_1ab);
this.element=manager.getLayoutElement(_1ab);
var _1ac=manager.getElementById("__ISFILEUPLOADPOST");
this.fileUpload=(_1ac!=null)?_1ac.value:this.fileUpload;
}
var url=_199.byId(_1ab).get("action");
var _1ad=new Manager.Ajax({url:url,form:_1ab,content:manager.page.getContent(_1ab),response_type:"JSON",callback_function:manager.page.callback});
_1ad.call();
},callback:function(_1ae,_1af){
var _1b0=_1af.args.content.__ELEMENT;
manager.page.updateElement(_1b0,_1ae);
manager.page.clearBusy();
},updateElement:function(_1b1,_1b2){
if(_1b2.base64){
var _1b3=new _19c();
var _1b4=_1b3.decode(_1b2.base64);
_1b2=eval("("+_1b4+")");
}
if(_1b2.data){
var html=_1b2.data;
var id=_1b2.id;
if(_1b2.type=="page"){
if(_1b1==""){
_1b1="__updateElement";
}
var _1b5=_199.byId(_1b1);
if(!_1b5){
var div=_19a.create("div");
div.id=_1b1;
_19a.place(div,_197.body(),"last");
_1b5=new Manager.ElementPane({content:html},_1b1);
}
try{
_198.forEach(_1b5.getDescendants(),function(_1b6){
if(_199.byId(_1b6.id)){
_1b6.destroyRecursive();
}
});
_1b5.setContent(html);
}
catch(err){
}
}
if(_1b2.type=="prompt"){
manager.doPrompt(id,html);
}
if(_1b2.type=="window"){
manager.doWindow(_1b2.data);
}
if(_1b2.type=="file"){
manager.doFile(_1b2.data,id);
}
if(manager.onLoad[id]){
manager.onLoad[id].apply();
}
}
},setBusy:function(id){
var use=manager.getElementById("useSetBusy");
if(use&&(use.value=="no")){
return;
}
if(_199.byId("page_standby")){
this.clearBusy(id);
}
this.standby=new _19d({target:id,id:"page_standby",image:require.toUrl("manager/resources/images/loading.gif").toString(),text:this.i18n.PLEASE_WAIT});
document.body.appendChild(this.standby.domNode);
this.standby.startup();
this.standby.show();
},clearBusy:function(){
if(_199.byId("page_standby")){
_199.byId("page_standby").hide();
_199.byId("page_standby").destroy();
}
}});
});
},"manager/MultiTextField2":function(){
define("manager/MultiTextField2",["dojo/_base/declare"],function(_1b7){
return _1b7("Manager.MultiTextField2",[],{mtfName:"",constructor:function(_1b8){
this.mtfName=_1b8;
this.leftSeparator="[";
this.rightSeparator="]";
this.separator=this.rightSeparator+" "+this.leftSeparator;
this.emptyField=this.leftSeparator+this.rightSeparator;
},onSubmit:function(_1b9,name){
var list=manager.getElementById(this.mtfName+this.emptyField);
if(list!=null&&list.options!=null){
for(var i=0;i<list.length;i++){
list.options[i].value=list.options[i].text;
list.options[i].selected=true;
}
}
return true;
},split:function(_1ba){
return _1ba.substring(1,_1ba.length-1).split(this.separator);
},join:function(_1bb){
var _1bc=this.leftSeparator;
for(var i=0;i<_1bb.length;i++){
if(i>0){
_1bc+=this.separator;
}
_1bc+=_1bb[i];
}
_1bc+=this.rightSeparator;
return _1bc;
},onKeyDown:function(_1bd,_1be,_1bf,_1c0,_1c1){
var key=(document.all!=null)?_1c0.keyCode:_1c0.which;
var name=_1bf+"_text";
var len=name.length;
if(_1bd.name.substring(0,len)==name){
if(key==13){
this.add(_1be,_1bf,_1c1);
return false;
}
}else{
if(_1bd.name==_1bf+this.emptyField){
if(key==46){
this.remove(_1be,_1bf,_1c1);
return false;
}
}
}
},onSelect:function(_1c2){
var list=manager.getElementById(this.mtfName+this.emptyField);
var i=list.selectedIndex;
if(i!=-1){
var a=this.split(list.options[i].text);
for(var j=1;j<=_1c2;j++){
var tf=manager.getElementById(this.mtfName+"_text"+j);
if(tf!=null){
tf.value=a[j-1];
}else{
var op=manager.getElementById(this.mtfName+"_options"+j);
if(op!=null){
for(var n=0;n<op.options.length;n++){
if(op.options[n].text==a[j-1]){
op.selectedIndex=n;
break;
}
}
}
}
}
}else{
for(var j=1;j<=_1c2;j++){
var tf=manager.getElementById(this.mtfName+"_text"+j);
if(tf!=null){
tf.value="";
}else{
var op=manager.getElementById(this.mtfName+"_options"+j);
if(op!=null){
op.selectedIndex=-1;
}
}
}
}
},getInput:function(_1c3){
var list=manager.getElementById(this.mtfName+this.emptyField);
var _1c4=new Array(_1c3);
var _1c5="";
for(var i=1;i<=_1c3;i++){
var tf=manager.getElementById(this.mtfName+"_text"+i);
_1c4[i-1]="";
if(tf!=null){
_1c4[i-1]=tf.value;
}else{
var list=manager.getElementById(this.mtfName+"_options"+i);
if(list!=null){
_1c4[i-1]=list.options[list.selectedIndex].text;
}
}
}
return this.join(_1c4);
},add:function(_1c6){
var list=manager.getElementById(this.mtfName+this.emptyField);
var i=list.length;
list.options[i]=new Option(this.getInput(_1c6));
list.selectedIndex=i;
},remove:function(_1c7){
var list=manager.getElementById(this.mtfName+this.emptyField);
for(var i=0;i<list.length;i++){
if(list.options[i].selected){
list.options[i]=null;
if(i>=list.length){
i=list.length-1;
}
if(i>=0){
list.options[i].selected=true;
}
break;
}
}
},modify:function(_1c8){
var list=manager.getElementById(this.mtfName+this.emptyField);
var i=list.selectedIndex;
if(i!=-1){
list.options[i].text=this.getInput(_1c8);
}else{
alert("É preciso selecionar o item a ser modificado!");
}
},moveUp:function(_1c9){
var list=manager.getElementById(this.mtfName+this.emptyField);
var i=list.selectedIndex;
if(i!=-1){
if(i>0){
var u=list.options[i-1].text;
list.options[i-1].text=list.options[i].text;
list.options[i-1].selected=true;
list.options[i].text=u;
list.options[i].selected=false;
list.selectedIndex=i-1;
}
}else{
alert("É preciso selecionar o item a ser modificado!");
}
},moveDown:function(_1ca){
var list=manager.getElementById(this.mtfName+this.emptyField);
var i=list.selectedIndex;
if(i!=-1){
if(i<list.options.length-1){
var u=list.options[i+1].text;
list.options[i+1].text=list.options[i].text;
list.options[i+1].selected=true;
list.options[i].text=u;
list.options[i].selected=false;
list.selectedIndex=i+1;
}
}else{
alert("É preciso selecionar o item a ser modificado!");
}
}});
});
},"dojox/grid/_Grid":function(){
define(["dojo/_base/kernel","../main","dojo/_base/declare","./_Events","./_Scroller","./_Layout","./_View","./_ViewManager","./_RowManager","./_FocusManager","./_EditManager","./Selection","./_RowSelector","./util","dijit/_Widget","dijit/_TemplatedMixin","dijit/CheckedMenuItem","dojo/text!./resources/_Grid.html","dojo/string","dojo/_base/array","dojo/_base/lang","dojo/_base/sniff","dojox/html/metrics","dojo/_base/html","dojo/query","dojo/dnd/common","dojo/i18n!dijit/nls/loading"],function(dojo,_1cb,_1cc,_1cd,_1ce,_1cf,_1d0,_1d1,_1d2,_1d3,_1d4,_1d5,_1d6,util,_1d7,_1d8,_1d9,_1da,_1db,_1dc,lang,has,_1dd,html,_1de){
if(!dojo.isCopyKey){
dojo.isCopyKey=dojo.dnd.getCopyKeyState;
}
var _1df=_1cc("dojox.grid._Grid",[_1d7,_1d8,_1cd],{templateString:_1da,classTag:"dojoxGrid",rowCount:5,keepRows:75,rowsPerPage:25,autoWidth:false,initialWidth:"",autoHeight:"",rowHeight:0,autoRender:true,defaultHeight:"15em",height:"",structure:null,elasticView:-1,singleClickEdit:false,selectionMode:"extended",rowSelector:"",columnReordering:false,headerMenu:null,placeholderLabel:"GridColumns",selectable:false,_click:null,loadingMessage:"<span class='dojoxGridLoading'>${loadingState}</span>",errorMessage:"<span class='dojoxGridError'>${errorState}</span>",noDataMessage:"",escapeHTMLInData:true,formatterScope:null,editable:false,summary:"",_setSummaryAttr:"domNode",sortInfo:0,_placeholders:null,_layoutClass:_1cf,buildRendering:function(){
this.inherited(arguments);
if(!this.domNode.getAttribute("tabIndex")){
this.domNode.tabIndex="0";
}
this.createScroller();
this.createLayout();
this.createViews();
this.createManagers();
this.createSelection();
this.connect(this.selection,"onSelected","onSelected");
this.connect(this.selection,"onDeselected","onDeselected");
this.connect(this.selection,"onChanged","onSelectionChanged");
_1dd.initOnFontResize();
this.connect(_1dd,"onFontResize","textSizeChanged");
util.funnelEvents(this.domNode,this,"doKeyEvent",util.keyEvents);
if(this.selectionMode!="none"){
this.domNode.setAttribute("aria-multiselectable",this.selectionMode=="single"?"false":"true");
}
html.addClass(this.domNode,this.classTag);
if(!this.isLeftToRight()){
html.addClass(this.domNode,this.classTag+"Rtl");
}
if(this.rowHeight>0){
html.addClass(this.viewsNode,this.classTag+"FixedRowHeight");
}
},postMixInProperties:function(){
this.inherited(arguments);
var _1e0=dojo.i18n.getLocalization("dijit","loading",this.lang);
this.loadingMessage=_1db.substitute(this.loadingMessage,_1e0);
this.errorMessage=_1db.substitute(this.errorMessage,_1e0);
if(this.srcNodeRef&&this.srcNodeRef.style.height){
this.height=this.srcNodeRef.style.height;
}
this._setAutoHeightAttr(this.autoHeight,true);
this.lastScrollTop=this.scrollTop=0;
},postCreate:function(){
this._placeholders=[];
this._setHeaderMenuAttr(this.headerMenu);
this._setStructureAttr(this.structure);
this._click=[];
this.inherited(arguments);
if(this.domNode&&this.autoWidth&&this.initialWidth){
this.domNode.style.width=this.initialWidth;
}
if(this.domNode&&!this.editable){
html.attr(this.domNode,"aria-readonly","true");
}
},destroy:function(){
this.domNode.onReveal=null;
this.domNode.onSizeChange=null;
delete this._click;
if(this.scroller){
this.scroller.destroy();
delete this.scroller;
}
this.edit.destroy();
delete this.edit;
this.views.destroyViews();
if(this.focus){
this.focus.destroy();
delete this.focus;
}
if(this.headerMenu&&this._placeholders.length){
_1dc.forEach(this._placeholders,function(p){
p.unReplace(true);
});
this.headerMenu.unBindDomNode(this.viewsHeaderNode);
}
this.inherited(arguments);
},_setAutoHeightAttr:function(ah,_1e1){
if(typeof ah=="string"){
if(!ah||ah=="false"){
ah=false;
}else{
if(ah=="true"){
ah=true;
}else{
ah=window.parseInt(ah,10);
}
}
}
if(typeof ah=="number"){
if(isNaN(ah)){
ah=false;
}
if(ah<0){
ah=true;
}else{
if(ah===0){
ah=false;
}
}
}
this.autoHeight=ah;
if(typeof ah=="boolean"){
this._autoHeight=ah;
}else{
if(typeof ah=="number"){
this._autoHeight=(ah>=this.get("rowCount"));
}else{
this._autoHeight=false;
}
}
if(this._started&&!_1e1){
this.render();
}
},_getRowCountAttr:function(){
return this.updating&&this.invalidated&&this.invalidated.rowCount!=undefined?this.invalidated.rowCount:this.rowCount;
},textSizeChanged:function(){
this.render();
},sizeChange:function(){
this.update();
},createManagers:function(){
this.rows=new _1d2(this);
this.focus=new _1d3(this);
this.edit=new _1d4(this);
},createSelection:function(){
this.selection=new _1d5(this);
},createScroller:function(){
this.scroller=new _1ce();
this.scroller.grid=this;
this.scroller.renderRow=lang.hitch(this,"renderRow");
this.scroller.removeRow=lang.hitch(this,"rowRemoved");
},createLayout:function(){
this.layout=new this._layoutClass(this);
this.connect(this.layout,"moveColumn","onMoveColumn");
},onMoveColumn:function(){
this.update();
},onResizeColumn:function(_1e2){
},createViews:function(){
this.views=new _1d1(this);
this.views.createView=lang.hitch(this,"createView");
},createView:function(_1e3,idx){
var c=lang.getObject(_1e3);
var view=new c({grid:this,index:idx});
this.viewsNode.appendChild(view.domNode);
this.viewsHeaderNode.appendChild(view.headerNode);
this.views.addView(view);
html.attr(this.domNode,"align",this.isLeftToRight()?"left":"right");
return view;
},buildViews:function(){
for(var i=0,vs;(vs=this.layout.structure[i]);i++){
this.createView(vs.type||_1cb._scopeName+".grid._View",i).setStructure(vs);
}
this.scroller.setContentNodes(this.views.getContentNodes());
},_setStructureAttr:function(_1e4){
var s=_1e4;
if(s&&lang.isString(s)){
dojo.deprecated("dojox.grid._Grid.set('structure', 'objVar')","use dojox.grid._Grid.set('structure', objVar) instead","2.0");
s=lang.getObject(s);
}
this.structure=s;
if(!s){
if(this.layout.structure){
s=this.layout.structure;
}else{
return;
}
}
this.views.destroyViews();
this.focus.focusView=null;
if(s!==this.layout.structure){
this.layout.setStructure(s);
}
this._structureChanged();
},setStructure:function(_1e5){
dojo.deprecated("dojox.grid._Grid.setStructure(obj)","use dojox.grid._Grid.set('structure', obj) instead.","2.0");
this._setStructureAttr(_1e5);
},getColumnTogglingItems:function(){
var _1e6,_1e7=[];
_1e6=_1dc.map(this.layout.cells,function(cell){
if(!cell.menuItems){
cell.menuItems=[];
}
var self=this;
var item=new _1d9({label:cell.name,checked:!cell.hidden,_gridCell:cell,onChange:function(_1e8){
if(self.layout.setColumnVisibility(this._gridCell.index,_1e8)){
var _1e9=this._gridCell.menuItems;
if(_1e9.length>1){
_1dc.forEach(_1e9,function(item){
if(item!==this){
item.setAttribute("checked",_1e8);
}
},this);
}
_1e8=_1dc.filter(self.layout.cells,function(c){
if(c.menuItems.length>1){
_1dc.forEach(c.menuItems,"item.set('disabled', false);");
}else{
c.menuItems[0].set("disabled",false);
}
return !c.hidden;
});
if(_1e8.length==1){
_1dc.forEach(_1e8[0].menuItems,"item.set('disabled', true);");
}
}
},destroy:function(){
var _1ea=_1dc.indexOf(this._gridCell.menuItems,this);
this._gridCell.menuItems.splice(_1ea,1);
delete this._gridCell;
_1d9.prototype.destroy.apply(this,arguments);
}});
cell.menuItems.push(item);
if(!cell.hidden){
_1e7.push(item);
}
return item;
},this);
if(_1e7.length==1){
_1e7[0].set("disabled",true);
}
return _1e6;
},_setHeaderMenuAttr:function(menu){
if(this._placeholders&&this._placeholders.length){
_1dc.forEach(this._placeholders,function(p){
p.unReplace(true);
});
this._placeholders=[];
}
if(this.headerMenu){
this.headerMenu.unBindDomNode(this.viewsHeaderNode);
}
this.headerMenu=menu;
if(!menu){
return;
}
this.headerMenu.bindDomNode(this.viewsHeaderNode);
if(this.headerMenu.getPlaceholders){
this._placeholders=this.headerMenu.getPlaceholders(this.placeholderLabel);
}
},setHeaderMenu:function(menu){
dojo.deprecated("dojox.grid._Grid.setHeaderMenu(obj)","use dojox.grid._Grid.set('headerMenu', obj) instead.","2.0");
this._setHeaderMenuAttr(menu);
},setupHeaderMenu:function(){
if(this._placeholders&&this._placeholders.length){
_1dc.forEach(this._placeholders,function(p){
if(p._replaced){
p.unReplace(true);
}
p.replace(this.getColumnTogglingItems());
},this);
}
},_fetch:function(_1eb){
this.setScrollTop(0);
},getItem:function(_1ec){
return null;
},showMessage:function(_1ed){
if(_1ed){
this.messagesNode.innerHTML=_1ed;
this.messagesNode.style.display="";
}else{
this.messagesNode.innerHTML="";
this.messagesNode.style.display="none";
}
},_structureChanged:function(){
this.buildViews();
if(this.autoRender&&this._started){
this.render();
}
},hasLayout:function(){
return this.layout.cells.length;
},resize:function(_1ee,_1ef){
this._pendingChangeSize=_1ee;
this._pendingResultSize=_1ef;
this.sizeChange();
},_getPadBorder:function(){
this._padBorder=this._padBorder||html._getPadBorderExtents(this.domNode);
return this._padBorder;
},_getHeaderHeight:function(){
var vns=this.viewsHeaderNode.style,t=vns.display=="none"?0:this.views.measureHeader();
vns.height=t+"px";
this.views.normalizeHeaderNodeHeight();
return t;
},_resize:function(_1f0,_1f1){
_1f0=_1f0||this._pendingChangeSize;
_1f1=_1f1||this._pendingResultSize;
delete this._pendingChangeSize;
delete this._pendingResultSize;
if(!this.domNode){
return;
}
var pn=this.domNode.parentNode;
if(!pn||pn.nodeType!=1||!this.hasLayout()||pn.style.visibility=="hidden"||pn.style.display=="none"){
return;
}
var _1f2=this._getPadBorder();
var hh=undefined;
var h;
if(this._autoHeight){
this.domNode.style.height="auto";
}else{
if(typeof this.autoHeight=="number"){
h=hh=this._getHeaderHeight();
h+=(this.scroller.averageRowHeight*this.autoHeight);
this.domNode.style.height=h+"px";
}else{
if(this.domNode.clientHeight<=_1f2.h){
if(pn==document.body){
this.domNode.style.height=this.defaultHeight;
}else{
if(this.height){
this.domNode.style.height=this.height;
}else{
this.fitTo="parent";
}
}
}
}
}
if(_1f1){
_1f0=_1f1;
}
if(!this._autoHeight&&_1f0){
html.marginBox(this.domNode,_1f0);
this.height=this.domNode.style.height;
delete this.fitTo;
}else{
if(this.fitTo=="parent"){
h=this._parentContentBoxHeight=(this._parentContentBoxHeight>0?this._parentContentBoxHeight:html._getContentBox(pn).h);
this.domNode.style.height=Math.max(0,h)+"px";
}
}
var _1f3=_1dc.some(this.views.views,function(v){
return v.flexCells;
});
if(!this._autoHeight&&(h||html._getContentBox(this.domNode).h)===0){
this.viewsHeaderNode.style.display="none";
}else{
this.viewsHeaderNode.style.display="block";
if(!_1f3&&hh===undefined){
hh=this._getHeaderHeight();
}
}
if(_1f3){
hh=undefined;
}
this.adaptWidth();
this.adaptHeight(hh);
this.postresize();
},adaptWidth:function(){
var _1f4=(!this.initialWidth&&this.autoWidth);
var w=_1f4?0:this.domNode.clientWidth||(this.domNode.offsetWidth-this._getPadBorder().w),vw=this.views.arrange(1,w);
this.views.onEach("adaptWidth");
if(_1f4){
this.domNode.style.width=vw+"px";
}
},adaptHeight:function(_1f5){
var t=_1f5===undefined?this._getHeaderHeight():_1f5;
var h=(this._autoHeight?-1:Math.max(this.domNode.clientHeight-t,0)||0);
this.views.onEach("setSize",[0,h]);
this.views.onEach("adaptHeight");
if(!this._autoHeight){
var _1f6=0,_1f7=0;
var _1f8=_1dc.filter(this.views.views,function(v){
var has=v.hasHScrollbar();
if(has){
_1f6++;
}else{
_1f7++;
}
return (!has);
});
if(_1f6>0&&_1f7>0){
_1dc.forEach(_1f8,function(v){
v.adaptHeight(true);
});
}
}
if(this.autoHeight===true||h!=-1||(typeof this.autoHeight=="number"&&this.autoHeight>=this.get("rowCount"))){
this.scroller.windowHeight=h;
}else{
this.scroller.windowHeight=Math.max(this.domNode.clientHeight-t,0);
}
},startup:function(){
if(this._started){
return;
}
this.inherited(arguments);
if(this.autoRender){
this.render();
}
},render:function(){
if(!this.domNode){
return;
}
if(!this._started){
return;
}
if(!this.hasLayout()){
this.scroller.init(0,this.keepRows,this.rowsPerPage);
return;
}
this.update=this.defaultUpdate;
this._render();
},_render:function(){
this.scroller.init(this.get("rowCount"),this.keepRows,this.rowsPerPage);
this.prerender();
this.setScrollTop(0);
this.postrender();
},prerender:function(){
this.keepRows=this._autoHeight?0:this.keepRows;
this.scroller.setKeepInfo(this.keepRows);
this.views.render();
this._resize();
},postrender:function(){
this.postresize();
this.focus.initFocusView();
html.setSelectable(this.domNode,this.selectable);
},postresize:function(){
if(this._autoHeight){
var size=Math.max(this.views.measureContent())+"px";
this.viewsNode.style.height=size;
}
},renderRow:function(_1f9,_1fa){
this.views.renderRow(_1f9,_1fa,this._skipRowRenormalize);
},rowRemoved:function(_1fb){
this.views.rowRemoved(_1fb);
},invalidated:null,updating:false,beginUpdate:function(){
this.invalidated=[];
this.updating=true;
},endUpdate:function(){
this.updating=false;
var i=this.invalidated,r;
if(i.all){
this.update();
}else{
if(i.rowCount!=undefined){
this.updateRowCount(i.rowCount);
}else{
for(r in i){
this.updateRow(Number(r));
}
}
}
this.invalidated=[];
},defaultUpdate:function(){
if(!this.domNode){
return;
}
if(this.updating){
this.invalidated.all=true;
return;
}
this.lastScrollTop=this.scrollTop;
this.prerender();
this.scroller.invalidateNodes();
this.setScrollTop(this.lastScrollTop);
this.postrender();
},update:function(){
this.render();
},updateRow:function(_1fc){
_1fc=Number(_1fc);
if(this.updating){
this.invalidated[_1fc]=true;
}else{
this.views.updateRow(_1fc);
this.scroller.rowHeightChanged(_1fc);
}
},updateRows:function(_1fd,_1fe){
_1fd=Number(_1fd);
_1fe=Number(_1fe);
var i;
if(this.updating){
for(i=0;i<_1fe;i++){
this.invalidated[i+_1fd]=true;
}
}else{
for(i=0;i<_1fe;i++){
this.views.updateRow(i+_1fd,this._skipRowRenormalize);
}
this.scroller.rowHeightChanged(_1fd);
}
},updateRowCount:function(_1ff){
if(this.updating){
this.invalidated.rowCount=_1ff;
}else{
this.rowCount=_1ff;
this._setAutoHeightAttr(this.autoHeight,true);
if(this.layout.cells.length){
this.scroller.updateRowCount(_1ff);
}
this._resize();
if(this.layout.cells.length){
this.setScrollTop(this.scrollTop);
}
}
},updateRowStyles:function(_200){
this.views.updateRowStyles(_200);
},getRowNode:function(_201){
if(this.focus.focusView&&!(this.focus.focusView instanceof _1d6)){
return this.focus.focusView.rowNodes[_201];
}else{
for(var i=0,_202;(_202=this.views.views[i]);i++){
if(!(_202 instanceof _1d6)){
return _202.rowNodes[_201];
}
}
}
return null;
},rowHeightChanged:function(_203){
this.views.renormalizeRow(_203);
this.scroller.rowHeightChanged(_203);
},fastScroll:true,delayScroll:false,scrollRedrawThreshold:(has("ie")?100:50),scrollTo:function(_204){
if(!this.fastScroll){
this.setScrollTop(_204);
return;
}
var _205=Math.abs(this.lastScrollTop-_204);
this.lastScrollTop=_204;
if(_205>this.scrollRedrawThreshold||this.delayScroll){
this.delayScroll=true;
this.scrollTop=_204;
this.views.setScrollTop(_204);
if(this._pendingScroll){
window.clearTimeout(this._pendingScroll);
}
var _206=this;
this._pendingScroll=window.setTimeout(function(){
delete _206._pendingScroll;
_206.finishScrollJob();
},200);
}else{
this.setScrollTop(_204);
}
},finishScrollJob:function(){
this.delayScroll=false;
this.setScrollTop(this.scrollTop);
},setScrollTop:function(_207){
this.scroller.scroll(this.views.setScrollTop(_207));
},scrollToRow:function(_208){
this.setScrollTop(this.scroller.findScrollTop(_208)+1);
},styleRowNode:function(_209,_20a){
if(_20a){
this.rows.styleRowNode(_209,_20a);
}
},_mouseOut:function(e){
this.rows.setOverRow(-2);
},getCell:function(_20b){
return this.layout.cells[_20b];
},setCellWidth:function(_20c,_20d){
this.getCell(_20c).unitWidth=_20d;
},getCellName:function(_20e){
return "Cell "+_20e.index;
},canSort:function(_20f){
},sort:function(){
},getSortAsc:function(_210){
_210=_210==undefined?this.sortInfo:_210;
return Boolean(_210>0);
},getSortIndex:function(_211){
_211=_211==undefined?this.sortInfo:_211;
return Math.abs(_211)-1;
},setSortIndex:function(_212,_213){
var si=_212+1;
if(_213!=undefined){
si*=(_213?1:-1);
}else{
if(this.getSortIndex()==_212){
si=-this.sortInfo;
}
}
this.setSortInfo(si);
},setSortInfo:function(_214){
if(this.canSort(_214)){
this.sortInfo=_214;
this.sort();
this.update();
}
},doKeyEvent:function(e){
e.dispatch="do"+e.type;
this.onKeyEvent(e);
},_dispatch:function(m,e){
if(m in this){
return this[m](e);
}
return false;
},dispatchKeyEvent:function(e){
this._dispatch(e.dispatch,e);
},dispatchContentEvent:function(e){
this.edit.dispatchEvent(e)||e.sourceView.dispatchContentEvent(e)||this._dispatch(e.dispatch,e);
},dispatchHeaderEvent:function(e){
e.sourceView.dispatchHeaderEvent(e)||this._dispatch("doheader"+e.type,e);
},dokeydown:function(e){
this.onKeyDown(e);
},doclick:function(e){
if(e.cellNode){
this.onCellClick(e);
}else{
this.onRowClick(e);
}
},dodblclick:function(e){
if(e.cellNode){
this.onCellDblClick(e);
}else{
this.onRowDblClick(e);
}
},docontextmenu:function(e){
if(e.cellNode){
this.onCellContextMenu(e);
}else{
this.onRowContextMenu(e);
}
},doheaderclick:function(e){
if(e.cellNode){
this.onHeaderCellClick(e);
}else{
this.onHeaderClick(e);
}
},doheaderdblclick:function(e){
if(e.cellNode){
this.onHeaderCellDblClick(e);
}else{
this.onHeaderDblClick(e);
}
},doheadercontextmenu:function(e){
if(e.cellNode){
this.onHeaderCellContextMenu(e);
}else{
this.onHeaderContextMenu(e);
}
},doStartEdit:function(_215,_216){
this.onStartEdit(_215,_216);
},doApplyCellEdit:function(_217,_218,_219){
this.onApplyCellEdit(_217,_218,_219);
},doCancelEdit:function(_21a){
this.onCancelEdit(_21a);
},doApplyEdit:function(_21b){
this.onApplyEdit(_21b);
},addRow:function(){
this.updateRowCount(this.get("rowCount")+1);
},removeSelectedRows:function(){
if(this.allItemsSelected){
this.updateRowCount(0);
}else{
this.updateRowCount(Math.max(0,this.get("rowCount")-this.selection.getSelected().length));
}
this.selection.clear();
}});
_1df.markupFactory=function(_21c,node,ctor,_21d){
var _21e=function(n){
var w=html.attr(n,"width")||"auto";
if((w!="auto")&&(w.slice(-2)!="em")&&(w.slice(-1)!="%")){
w=parseInt(w,10)+"px";
}
return w;
};
if(!_21c.structure&&node.nodeName.toLowerCase()=="table"){
_21c.structure=_1de("> colgroup",node).map(function(cg){
var sv=html.attr(cg,"span");
var v={noscroll:(html.attr(cg,"noscroll")=="true")?true:false,__span:(!!sv?parseInt(sv,10):1),cells:[]};
if(html.hasAttr(cg,"width")){
v.width=_21e(cg);
}
return v;
});
if(!_21c.structure.length){
_21c.structure.push({__span:Infinity,cells:[]});
}
_1de("thead > tr",node).forEach(function(tr,_21f){
var _220=0;
var _221=0;
var _222;
var _223=null;
_1de("> th",tr).map(function(th){
if(!_223){
_222=0;
_223=_21c.structure[0];
}else{
if(_220>=(_222+_223.__span)){
_221++;
_222+=_223.__span;
var _224=_223;
_223=_21c.structure[_221];
}
}
var cell={name:lang.trim(html.attr(th,"name")||th.innerHTML),colSpan:parseInt(html.attr(th,"colspan")||1,10),type:lang.trim(html.attr(th,"cellType")||""),id:lang.trim(html.attr(th,"id")||"")};
_220+=cell.colSpan;
var _225=html.attr(th,"rowspan");
if(_225){
cell.rowSpan=_225;
}
if(html.hasAttr(th,"width")){
cell.width=_21e(th);
}
if(html.hasAttr(th,"relWidth")){
cell.relWidth=window.parseInt(html.attr(th,"relWidth"),10);
}
if(html.hasAttr(th,"hidden")){
cell.hidden=(html.attr(th,"hidden")=="true"||html.attr(th,"hidden")===true);
}
if(_21d){
_21d(th,cell);
}
cell.type=cell.type?lang.getObject(cell.type):_1cb.grid.cells.Cell;
if(cell.type&&cell.type.markupFactory){
cell.type.markupFactory(th,cell);
}
if(!_223.cells[_21f]){
_223.cells[_21f]=[];
}
_223.cells[_21f].push(cell);
});
});
}
return new ctor(_21c,node);
};
return _1df;
});
},"manager/Grid":function(){
define("manager/Grid",["dojo/_base/declare","dojo/store/Memory"],function(_226,_227){
return _226("Manager.Grid",[],{constructor:function(name,page){
this.name=name;
this.page=page;
this.idSelect=this.name+"_SELECT_CHECKED";
this.firstIndex=0;
this.data=null;
this.goPageStore=new _227();
this.hover();
},hover:function(){
var arg="table#"+this.name+" tbody tr";
dojo.query(arg).forEach(function(node,_228,arr){
manager.hover(node.id,function(_229){
_229.currentTarget.originalClassName="row"+(_228%2);
_229.currentTarget.className=_229.currentTarget.className.replace(_229.currentTarget.originalClassName,"rowenter");
},function(_22a){
_22a.currentTarget.className=_22a.currentTarget.className.replace("rowenter",_22a.currentTarget.originalClassName);
});
});
},selectRow:function(_22b){
var arg="table#"+this.name+" tbody tr";
dojo.query(arg).forEach(function(node,_22c,arr){
node.index=_22c;
dojo.connect(node,"ondblclick",function(_22d){
_22b(_22d.currentTarget.index);
});
});
},setData:function(data){
this.data=data;
},addGoPage:function(data){
for(var i=0;i<data.length;i++){
this.goPageStore.add(data[i]);
}
},getGoPage:function(){
return this.goPageStore;
},changeRow:function(_22e){
var div=manager.byId(this.name+"-row-"+_22e);
if(!div){
div=manager.byId(this.name+"DGrid-row-"+_22e);
}
var _22f=dijit.byId(this.name+"_SELECT"+"["+_22e+"]");
var _230=div.originalClassName?div.originalClassName:div.className;
if(_22f.get("checked")){
div.className=_230+"Checked";
}else{
div.className=_230.replace("Checked","");
}
},check:function(_231,_232){
var _233=dijit.byId(this.name+"_SELECT"+"["+_231+"]");
var _234=manager.getElementById(this.idSelect);
if(_233.get("checked")){
_234.value=(_234.value!=""?_234.value+":":"")+_232;
}else{
var _235=new RegExp("^"+_232+":?|"+_232+":?|:?"+_232+"$");
_234.value=_234.value.replace(_235,"");
}
this.changeRow(_231);
},checkAll:function(n){
var _236=dijit.byId(this.name+"chkAll");
for(var i=0;i<n;i++){
var _237=this.firstIndex+i;
var _238=dijit.byId(this.name+"_SELECT"+"["+_237+"]");
if(_236.checked!=_238.checked){
if(_238.checked){
value=_238.get("value");
_238.set("checked",false);
}else{
_238.set("checked",true);
value=_238.get("value");
}
this.check(_237,value);
}
}
},checkEachRow:function(n){
for(var i=0;i<n;i++){
var _239=this.firstIndex+i;
this.changeRow(_239);
}
},goPage:function(_23a){
manager.setElementValueById(this.name+"_PAGING","yes");
manager.setElementValueById(this.name+"_PAGE",this.page);
manager.setElementValueById(this.name+"_GOPAGE",_23a);
manager.doPostBack(this.name);
}});
});
},"manager/MultiSelection":function(){
define("manager/MultiSelection",["dojo/_base/declare","manager/MultiTextField2"],function(_23b,_23c){
return _23b("Manager.MultiSelection",[],{add:function(n){
var list=manager.getElementById(this.mtfName+this.emptyField);
var _23d=manager.getElementById(this.mtfName+"_options"+n);
var n=list.length;
var i=0;
var _23e=false;
var _23f=_23d.options[_23d.selectedIndex].text;
for(i=0;i<n;i++){
if(list.options[i].text==_23f){
_23e=true;
}
}
if(_23e){
alert("Item jÃ¡ estÃ¡ na lista!");
}else{
list.options[n]=new Option(_23f);
list.selectedIndex=n;
}
}});
});
},"manager/Tree":function(){
define("manager/Tree",["dojo/_base/declare","dojo/_base/window","dojo/store/Memory","dijit/tree/ObjectStoreModel","dijit/Tree"],function(_240,_241,_242,_243,Tree){
return _240("Manager.Tree",[Tree],{constructor:function(obj){
this.root=(obj.root?obj.root:"root");
this.store=new _242({data:obj.data,getChildren:function(_244){
return this.query({parent:_244.id});
}});
this.model=new _243({store:this.store,mayHaveChildren:function(item){
return (item.type=="folder");
},query:{id:this.root}});
this.layout=obj.layout;
this.onClick=obj.selectEvent;
this.iconFolderOpened=(obj.iconFolderOpened?obj.iconFolderOpened:"iconFolderOpened");
this.iconFolderClosed=(obj.iconFolderClosed?obj.iconFolderClosed:"iconFolderClosed");
this.iconLeaf=(obj.iconLeaf?obj.iconLeaf:"iconLeaf");
},store:null,model:null,getIconClass:function(item,_245){
var cls=(!item||(item.type=="folder"))?_245?this.iconFolderOpened:this.iconFolderClosed:this.iconLeaf;
return cls+this.layout;
},showRoot:false});
});
},"dojo/cldr/nls/pt/currency":function(){
define({"HKD_displayName":"Dólar de Hong Kong","CHF_displayName":"Franco suíço","JPY_symbol":"JP¥","CAD_displayName":"Dólar canadense","HKD_symbol":"HK$","CNY_displayName":"Yuan chinês","USD_symbol":"US$","AUD_displayName":"Dólar australiano","JPY_displayName":"Iene japonês","CAD_symbol":"CA$","USD_displayName":"Dólar norte-americano","EUR_symbol":"€","CNY_symbol":"CN¥","GBP_displayName":"Libra esterlina britânica","GBP_symbol":"£","AUD_symbol":"AU$","EUR_displayName":"Euro"});
},"manager/DateTextBox":function(){
define("manager/DateTextBox",["dojo/_base/declare","dijit/form/DateTextBox"],function(_246,_247){
return _246("Manager.DateTextBox",[_247],{managerFormat:{selector:"date",datePattern:"dd/MM/yyyy"},value:"",postMixInProperties:function(){
this.inherited(arguments);
this.value=dojo.date.locale.parse(this.value,this.managerFormat);
},serialize:function(_248,_249){
return dojo.date.locale.format(_248,this.managerFormat).toUpperCase();
}});
});
},"dojox/grid/Selection":function(){
define(["dojo/_base/declare","dojo/_base/array","dojo/_base/lang","dojo/dom-attr"],function(_24a,_24b,lang,_24c){
return _24a("dojox.grid.Selection",null,{constructor:function(_24d){
this.grid=_24d;
this.selected=[];
this.setMode(_24d.selectionMode);
},mode:"extended",selected:null,updating:0,selectedIndex:-1,rangeStartIndex:-1,setMode:function(mode){
if(this.selected.length){
this.deselectAll();
}
if(mode!="extended"&&mode!="multiple"&&mode!="single"&&mode!="none"){
this.mode="extended";
}else{
this.mode=mode;
}
},onCanSelect:function(_24e){
return this.grid.onCanSelect(_24e);
},onCanDeselect:function(_24f){
return this.grid.onCanDeselect(_24f);
},onSelected:function(_250){
},onDeselected:function(_251){
},onChanging:function(){
},onChanged:function(){
},isSelected:function(_252){
if(this.mode=="none"){
return false;
}
return this.selected[_252];
},getFirstSelected:function(){
if(!this.selected.length||this.mode=="none"){
return -1;
}
for(var i=0,l=this.selected.length;i<l;i++){
if(this.selected[i]){
return i;
}
}
return -1;
},getNextSelected:function(_253){
if(this.mode=="none"){
return -1;
}
for(var i=_253+1,l=this.selected.length;i<l;i++){
if(this.selected[i]){
return i;
}
}
return -1;
},getSelected:function(){
var _254=[];
for(var i=0,l=this.selected.length;i<l;i++){
if(this.selected[i]){
_254.push(i);
}
}
return _254;
},getSelectedCount:function(){
var c=0;
for(var i=0;i<this.selected.length;i++){
if(this.selected[i]){
c++;
}
}
return c;
},_beginUpdate:function(){
if(this.updating===0){
this.onChanging();
}
this.updating++;
},_endUpdate:function(){
this.updating--;
if(this.updating===0){
this.onChanged();
}
},select:function(_255){
if(this.mode=="none"){
return;
}
if(this.mode!="multiple"){
this.deselectAll(_255);
this.addToSelection(_255);
}else{
this.toggleSelect(_255);
}
},addToSelection:function(_256){
if(this.mode=="none"){
return;
}
if(lang.isArray(_256)){
_24b.forEach(_256,this.addToSelection,this);
return;
}
_256=Number(_256);
if(this.selected[_256]){
this.selectedIndex=_256;
}else{
if(this.onCanSelect(_256)!==false){
this.selectedIndex=_256;
var _257=this.grid.getRowNode(_256);
if(_257){
_24c.set(_257,"aria-selected","true");
}
this._beginUpdate();
this.selected[_256]=true;
this.onSelected(_256);
this._endUpdate();
}
}
},deselect:function(_258){
if(this.mode=="none"){
return;
}
if(lang.isArray(_258)){
_24b.forEach(_258,this.deselect,this);
return;
}
_258=Number(_258);
if(this.selectedIndex==_258){
this.selectedIndex=-1;
}
if(this.selected[_258]){
if(this.onCanDeselect(_258)===false){
return;
}
var _259=this.grid.getRowNode(_258);
if(_259){
_24c.set(_259,"aria-selected","false");
}
this._beginUpdate();
delete this.selected[_258];
this.onDeselected(_258);
this._endUpdate();
}
},setSelected:function(_25a,_25b){
this[(_25b?"addToSelection":"deselect")](_25a);
},toggleSelect:function(_25c){
if(lang.isArray(_25c)){
_24b.forEach(_25c,this.toggleSelect,this);
return;
}
this.setSelected(_25c,!this.selected[_25c]);
},_range:function(_25d,inTo,func){
var s=(_25d>=0?_25d:inTo),e=inTo;
if(s>e){
e=s;
s=inTo;
}
for(var i=s;i<=e;i++){
func(i);
}
},selectRange:function(_25e,inTo){
this._range(_25e,inTo,lang.hitch(this,"addToSelection"));
},deselectRange:function(_25f,inTo){
this._range(_25f,inTo,lang.hitch(this,"deselect"));
},insert:function(_260){
this.selected.splice(_260,0,false);
if(this.selectedIndex>=_260){
this.selectedIndex++;
}
},remove:function(_261){
this.selected.splice(_261,1);
if(this.selectedIndex>=_261){
this.selectedIndex--;
}
},deselectAll:function(_262){
for(var i in this.selected){
if((i!=_262)&&(this.selected[i]===true)){
this.deselect(i);
}
}
},clickSelect:function(_263,_264,_265){
if(this.mode=="none"){
return;
}
this._beginUpdate();
if(this.mode!="extended"){
this.select(_263);
}else{
if(!_265||this.rangeStartIndex<0){
this.rangeStartIndex=_263;
}
if(!_264){
this.deselectAll(_263);
}
if(_265){
this.selectRange(this.rangeStartIndex,_263);
}else{
if(_264){
this.toggleSelect(_263);
}else{
this.addToSelection(_263);
}
}
}
this._endUpdate();
},clickSelectEvent:function(e){
this.clickSelect(e.rowIndex,dojo.isCopyKey(e),e.shiftKey);
},clear:function(){
this._beginUpdate();
this.deselectAll();
this._endUpdate();
}});
});
},"dojox/grid/_RowManager":function(){
define(["dojo/_base/declare","dojo/_base/lang","dojo/dom-class"],function(_266,lang,_267){
var _268=function(_269,_26a){
if(_269.style.cssText==undefined){
_269.setAttribute("style",_26a);
}else{
_269.style.cssText=_26a;
}
};
return _266("dojox.grid._RowManager",null,{constructor:function(_26b){
this.grid=_26b;
},linesToEms:2,overRow:-2,prepareStylingRow:function(_26c,_26d){
return {index:_26c,node:_26d,odd:Boolean(_26c&1),selected:!!this.grid.selection.isSelected(_26c),over:this.isOver(_26c),customStyles:"",customClasses:"dojoxGridRow"};
},styleRowNode:function(_26e,_26f){
var row=this.prepareStylingRow(_26e,_26f);
this.grid.onStyleRow(row);
this.applyStyles(row);
},applyStyles:function(_270){
var i=_270;
i.node.className=i.customClasses;
var h=i.node.style.height;
_268(i.node,i.customStyles+";"+(i.node._style||""));
i.node.style.height=h;
},updateStyles:function(_271){
this.grid.updateRowStyles(_271);
},setOverRow:function(_272){
var last=this.overRow;
this.overRow=_272;
if((last!=this.overRow)&&(lang.isString(last)||last>=0)){
this.updateStyles(last);
}
this.updateStyles(this.overRow);
},isOver:function(_273){
return (this.overRow==_273&&!_267.contains(this.grid.domNode,"dojoxGridColumnResizing"));
}});
});
},"manager/Hash":function(){
define("manager/Hash",["dojo/_base/declare"],function(_274){
return _274("Manager.Hash",[],{length:0,items:new Array(),constructor:function(){
this.length=0;
},remove:function(_275){
var _276;
if(typeof (this.items[_275])!="undefined"){
this.length--;
var _276=this.items[_275];
delete this.items[_275];
}
return _276;
},get:function(_277){
return this.items[_277];
},set:function(_278,_279){
if(typeof (_279)!="undefined"){
if(typeof (this.items[_278])=="undefined"){
this.length++;
}
this.items[_278]=_279;
}
return _279;
},has:function(_27a){
return typeof (this.items[_27a])!="undefined";
}});
});
},"dojo/dnd/Avatar":function(){
define(["../_base/declare","../_base/window","../dom","../dom-attr","../dom-class","../dom-construct","../hccss","../query"],function(_27b,win,dom,_27c,_27d,_27e,has,_27f){
return _27b("dojo.dnd.Avatar",null,{constructor:function(_280){
this.manager=_280;
this.construct();
},construct:function(){
var a=_27e.create("table",{"class":"dojoDndAvatar",style:{position:"absolute",zIndex:"1999",margin:"0px"}}),_281=this.manager.source,node,b=_27e.create("tbody",null,a),tr=_27e.create("tr",null,b),td=_27e.create("td",null,tr),k=Math.min(5,this.manager.nodes.length),i=0;
if(has("highcontrast")){
_27e.create("span",{id:"a11yIcon",innerHTML:this.manager.copy?"+":"<"},td);
}
_27e.create("span",{innerHTML:_281.generateText?this._generateText():""},td);
_27c.set(tr,{"class":"dojoDndAvatarHeader",style:{opacity:0.9}});
for(;i<k;++i){
if(_281.creator){
node=_281._normalizedCreator(_281.getItem(this.manager.nodes[i].id).data,"avatar").node;
}else{
node=this.manager.nodes[i].cloneNode(true);
if(node.tagName.toLowerCase()=="tr"){
var _282=_27e.create("table"),_283=_27e.create("tbody",null,_282);
_283.appendChild(node);
node=_282;
}
}
node.id="";
tr=_27e.create("tr",null,b);
td=_27e.create("td",null,tr);
td.appendChild(node);
_27c.set(tr,{"class":"dojoDndAvatarItem",style:{opacity:(9-i)/10}});
}
this.node=a;
},destroy:function(){
_27e.destroy(this.node);
this.node=false;
},update:function(){
_27d.toggle(this.node,"dojoDndAvatarCanDrop",this.manager.canDropFlag);
if(has("highcontrast")){
var icon=dom.byId("a11yIcon");
var text="+";
if(this.manager.canDropFlag&&!this.manager.copy){
text="< ";
}else{
if(!this.manager.canDropFlag&&!this.manager.copy){
text="o";
}else{
if(!this.manager.canDropFlag){
text="x";
}
}
}
icon.innerHTML=text;
}
_27f(("tr.dojoDndAvatarHeader td span"+(has("highcontrast")?" span":"")),this.node).forEach(function(node){
node.innerHTML=this.manager.source.generateText?this._generateText():"";
},this);
},_generateText:function(){
return this.manager.nodes.length.toString();
}});
});
},"dojox/grid/_Scroller":function(){
define(["dijit/registry","dojo/_base/declare","dojo/_base/lang","./util","dojo/_base/html"],function(_284,_285,lang,util,html){
var _286=function(_287){
var i=0,n,p=_287.parentNode;
while((n=p.childNodes[i++])){
if(n==_287){
return i-1;
}
}
return -1;
};
var _288=function(_289){
if(!_289){
return;
}
dojo.forEach(_284.toArray(),function(w){
if(w.domNode&&html.isDescendant(w.domNode,_289,true)){
w.destroy();
}
});
};
var _28a=function(_28b){
var node=html.byId(_28b);
return (node&&node.tagName?node.tagName.toLowerCase():"");
};
var _28c=function(_28d,_28e){
var _28f=[];
var i=0,n;
while((n=_28d.childNodes[i])){
i++;
if(_28a(n)==_28e){
_28f.push(n);
}
}
return _28f;
};
var _290=function(_291){
return _28c(_291,"div");
};
return _285("dojox.grid._Scroller",null,{constructor:function(_292){
this.setContentNodes(_292);
this.pageHeights=[];
this.pageNodes=[];
this.stack=[];
},rowCount:0,defaultRowHeight:32,keepRows:100,contentNode:null,scrollboxNode:null,defaultPageHeight:0,keepPages:10,pageCount:0,windowHeight:0,firstVisibleRow:0,lastVisibleRow:0,averageRowHeight:0,page:0,pageTop:0,init:function(_293,_294,_295){
switch(arguments.length){
case 3:
this.rowsPerPage=_295;
case 2:
this.keepRows=_294;
case 1:
this.rowCount=_293;
default:
break;
}
this.defaultPageHeight=(this.grid.rowHeight>0?this.grid.rowHeight:this.defaultRowHeight)*this.rowsPerPage;
this.pageCount=this._getPageCount(this.rowCount,this.rowsPerPage);
this.setKeepInfo(this.keepRows);
this.invalidate();
if(this.scrollboxNode){
this.scrollboxNode.scrollTop=0;
this.scroll(0);
this.scrollboxNode.onscroll=lang.hitch(this,"onscroll");
}
},_getPageCount:function(_296,_297){
return _296?(Math.ceil(_296/_297)||1):0;
},destroy:function(){
this.invalidateNodes();
delete this.contentNodes;
delete this.contentNode;
delete this.scrollboxNode;
},setKeepInfo:function(_298){
this.keepRows=_298;
this.keepPages=!this.keepRows?this.keepPages:Math.max(Math.ceil(this.keepRows/this.rowsPerPage),2);
},setContentNodes:function(_299){
this.contentNodes=_299;
this.colCount=(this.contentNodes?this.contentNodes.length:0);
this.pageNodes=[];
for(var i=0;i<this.colCount;i++){
this.pageNodes[i]=[];
}
},getDefaultNodes:function(){
return this.pageNodes[0]||[];
},invalidate:function(){
this._invalidating=true;
this.invalidateNodes();
this.pageHeights=[];
this.height=(this.pageCount?(this.pageCount-1)*this.defaultPageHeight+this.calcLastPageHeight():0);
this.resize();
this._invalidating=false;
},updateRowCount:function(_29a){
this.invalidateNodes();
this.rowCount=_29a;
var _29b=this.pageCount;
if(_29b===0){
this.height=1;
}
this.pageCount=this._getPageCount(this.rowCount,this.rowsPerPage);
if(this.pageCount<_29b){
for(var i=_29b-1;i>=this.pageCount;i--){
this.height-=this.getPageHeight(i);
delete this.pageHeights[i];
}
}else{
if(this.pageCount>_29b){
this.height+=this.defaultPageHeight*(this.pageCount-_29b-1)+this.calcLastPageHeight();
}
}
this.resize();
},pageExists:function(_29c){
return Boolean(this.getDefaultPageNode(_29c));
},measurePage:function(_29d){
if(this.grid.rowHeight){
return ((_29d+1)*this.rowsPerPage>this.rowCount?this.rowCount-_29d*this.rowsPerPage:this.rowsPerPage)*this.grid.rowHeight;
}
var n=this.getDefaultPageNode(_29d);
return (n&&n.innerHTML)?n.offsetHeight:undefined;
},positionPage:function(_29e,_29f){
for(var i=0;i<this.colCount;i++){
this.pageNodes[i][_29e].style.top=_29f+"px";
}
},repositionPages:function(_2a0){
var _2a1=this.getDefaultNodes();
var last=0;
for(var i=0;i<this.stack.length;i++){
last=Math.max(this.stack[i],last);
}
var n=_2a1[_2a0];
var y=(n?this.getPageNodePosition(n)+this.getPageHeight(_2a0):0);
for(var p=_2a0+1;p<=last;p++){
n=_2a1[p];
if(n){
if(this.getPageNodePosition(n)==y){
return;
}
this.positionPage(p,y);
}
y+=this.getPageHeight(p);
}
},installPage:function(_2a2){
for(var i=0;i<this.colCount;i++){
this.contentNodes[i].appendChild(this.pageNodes[i][_2a2]);
}
},preparePage:function(_2a3,_2a4){
var p=(_2a4?this.popPage():null);
for(var i=0;i<this.colCount;i++){
var _2a5=this.pageNodes[i];
var _2a6=(p===null?this.createPageNode():this.invalidatePageNode(p,_2a5));
_2a6.pageIndex=_2a3;
_2a5[_2a3]=_2a6;
}
},renderPage:function(_2a7){
var _2a8=[];
var i,j;
for(i=0;i<this.colCount;i++){
_2a8[i]=this.pageNodes[i][_2a7];
}
for(i=0,j=_2a7*this.rowsPerPage;(i<this.rowsPerPage)&&(j<this.rowCount);i++,j++){
this.renderRow(j,_2a8);
}
},removePage:function(_2a9){
for(var i=0,j=_2a9*this.rowsPerPage;i<this.rowsPerPage;i++,j++){
this.removeRow(j);
}
},destroyPage:function(_2aa){
for(var i=0;i<this.colCount;i++){
var n=this.invalidatePageNode(_2aa,this.pageNodes[i]);
if(n){
html.destroy(n);
}
}
},pacify:function(_2ab){
},pacifying:false,pacifyTicks:200,setPacifying:function(_2ac){
if(this.pacifying!=_2ac){
this.pacifying=_2ac;
this.pacify(this.pacifying);
}
},startPacify:function(){
this.startPacifyTicks=new Date().getTime();
},doPacify:function(){
var _2ad=(new Date().getTime()-this.startPacifyTicks)>this.pacifyTicks;
this.setPacifying(true);
this.startPacify();
return _2ad;
},endPacify:function(){
this.setPacifying(false);
},resize:function(){
if(this.scrollboxNode){
this.windowHeight=this.scrollboxNode.clientHeight;
}
for(var i=0;i<this.colCount;i++){
util.setStyleHeightPx(this.contentNodes[i],Math.max(1,this.height));
}
var _2ae=(!this._invalidating);
if(!_2ae){
var ah=this.grid.get("autoHeight");
if(typeof ah=="number"&&ah<=Math.min(this.rowsPerPage,this.rowCount)){
_2ae=true;
}
}
if(_2ae){
this.needPage(this.page,this.pageTop);
}
var _2af=(this.page<this.pageCount-1)?this.rowsPerPage:((this.rowCount%this.rowsPerPage)||this.rowsPerPage);
var _2b0=this.getPageHeight(this.page);
this.averageRowHeight=(_2b0>0&&_2af>0)?(_2b0/_2af):0;
},calcLastPageHeight:function(){
if(!this.pageCount){
return 0;
}
var _2b1=this.pageCount-1;
var _2b2=((this.rowCount%this.rowsPerPage)||(this.rowsPerPage))*this.defaultRowHeight;
this.pageHeights[_2b1]=_2b2;
return _2b2;
},updateContentHeight:function(inDh){
this.height+=inDh;
this.resize();
},updatePageHeight:function(_2b3,_2b4,_2b5){
if(this.pageExists(_2b3)){
var oh=this.getPageHeight(_2b3);
var h=(this.measurePage(_2b3));
if(h===undefined){
h=oh;
}
this.pageHeights[_2b3]=h;
if(oh!=h){
this.updateContentHeight(h-oh);
var ah=this.grid.get("autoHeight");
if((typeof ah=="number"&&ah>this.rowCount)||(ah===true&&!_2b4)){
if(!_2b5){
this.grid.sizeChange();
}else{
var ns=this.grid.viewsNode.style;
ns.height=parseInt(ns.height)+h-oh+"px";
this.repositionPages(_2b3);
}
}else{
this.repositionPages(_2b3);
}
}
return h;
}
return 0;
},rowHeightChanged:function(_2b6,_2b7){
this.updatePageHeight(Math.floor(_2b6/this.rowsPerPage),false,_2b7);
},invalidateNodes:function(){
while(this.stack.length){
this.destroyPage(this.popPage());
}
},createPageNode:function(){
var p=document.createElement("div");
html.attr(p,"role","presentation");
p.style.position="absolute";
p.style[this.grid.isLeftToRight()?"left":"right"]="0";
return p;
},getPageHeight:function(_2b8){
var ph=this.pageHeights[_2b8];
return (ph!==undefined?ph:this.defaultPageHeight);
},pushPage:function(_2b9){
return this.stack.push(_2b9);
},popPage:function(){
return this.stack.shift();
},findPage:function(_2ba){
var i=0,h=0;
for(var ph=0;i<this.pageCount;i++,h+=ph){
ph=this.getPageHeight(i);
if(h+ph>=_2ba){
break;
}
}
this.page=i;
this.pageTop=h;
},buildPage:function(_2bb,_2bc,_2bd){
this.preparePage(_2bb,_2bc);
this.positionPage(_2bb,_2bd);
this.installPage(_2bb);
this.renderPage(_2bb);
this.pushPage(_2bb);
},needPage:function(_2be,_2bf){
var h=this.getPageHeight(_2be),oh=h;
if(!this.pageExists(_2be)){
this.buildPage(_2be,(!this.grid._autoHeight&&this.keepPages&&(this.stack.length>=this.keepPages)),_2bf);
h=this.updatePageHeight(_2be,true);
}else{
this.positionPage(_2be,_2bf);
}
return h;
},onscroll:function(){
this.scroll(this.scrollboxNode.scrollTop);
},scroll:function(_2c0){
this.grid.scrollTop=_2c0;
if(this.colCount){
this.startPacify();
this.findPage(_2c0);
var h=this.height;
var b=this.getScrollBottom(_2c0);
for(var p=this.page,y=this.pageTop;(p<this.pageCount)&&((b<0)||(y<b));p++){
y+=this.needPage(p,y);
}
this.firstVisibleRow=this.getFirstVisibleRow(this.page,this.pageTop,_2c0);
this.lastVisibleRow=this.getLastVisibleRow(p-1,y,b);
if(h!=this.height){
this.repositionPages(p-1);
}
this.endPacify();
}
},getScrollBottom:function(_2c1){
return (this.windowHeight>=0?_2c1+this.windowHeight:-1);
},processNodeEvent:function(e,_2c2){
var t=e.target;
while(t&&(t!=_2c2)&&t.parentNode&&(t.parentNode.parentNode!=_2c2)){
t=t.parentNode;
}
if(!t||!t.parentNode||(t.parentNode.parentNode!=_2c2)){
return false;
}
var page=t.parentNode;
e.topRowIndex=page.pageIndex*this.rowsPerPage;
e.rowIndex=e.topRowIndex+_286(t);
e.rowTarget=t;
return true;
},processEvent:function(e){
return this.processNodeEvent(e,this.contentNode);
},renderRow:function(_2c3,_2c4){
},removeRow:function(_2c5){
},getDefaultPageNode:function(_2c6){
return this.getDefaultNodes()[_2c6];
},positionPageNode:function(_2c7,_2c8){
},getPageNodePosition:function(_2c9){
return _2c9.offsetTop;
},invalidatePageNode:function(_2ca,_2cb){
var p=_2cb[_2ca];
if(p){
delete _2cb[_2ca];
this.removePage(_2ca,p);
_288(p);
p.innerHTML="";
}
return p;
},getPageRow:function(_2cc){
return _2cc*this.rowsPerPage;
},getLastPageRow:function(_2cd){
return Math.min(this.rowCount,this.getPageRow(_2cd+1))-1;
},getFirstVisibleRow:function(_2ce,_2cf,_2d0){
if(!this.pageExists(_2ce)){
return 0;
}
var row=this.getPageRow(_2ce);
var _2d1=this.getDefaultNodes();
var rows=_290(_2d1[_2ce]);
for(var i=0,l=rows.length;i<l&&_2cf<_2d0;i++,row++){
_2cf+=rows[i].offsetHeight;
}
return (row?row-1:row);
},getLastVisibleRow:function(_2d2,_2d3,_2d4){
if(!this.pageExists(_2d2)){
return 0;
}
var _2d5=this.getDefaultNodes();
var row=this.getLastPageRow(_2d2);
var rows=_290(_2d5[_2d2]);
for(var i=rows.length-1;i>=0&&_2d3>_2d4;i--,row--){
_2d3-=rows[i].offsetHeight;
}
return row+1;
},findTopRow:function(_2d6){
var _2d7=this.getDefaultNodes();
var rows=_290(_2d7[this.page]);
for(var i=0,l=rows.length,t=this.pageTop,h;i<l;i++){
h=rows[i].offsetHeight;
t+=h;
if(t>=_2d6){
this.offset=h-(t-_2d6);
return i+this.page*this.rowsPerPage;
}
}
return -1;
},findScrollTop:function(_2d8){
var _2d9=Math.floor(_2d8/this.rowsPerPage);
var t=0;
var i,l;
for(i=0;i<_2d9;i++){
t+=this.getPageHeight(i);
}
this.pageTop=t;
this.page=_2d9;
this.needPage(_2d9,this.pageTop);
var _2da=this.getDefaultNodes();
var rows=_290(_2da[_2d9]);
var r=_2d8-this.rowsPerPage*_2d9;
for(i=0,l=rows.length;i<l&&i<r;i++){
t+=rows[i].offsetHeight;
}
return t;
},dummy:0});
});
},"dojox/grid/_Events":function(){
define(["dojo/keys","dojo/dom-class","dojo/_base/declare","dojo/_base/event","dojo/_base/sniff"],function(keys,_2db,_2dc,_2dd,has){
return _2dc("dojox.grid._Events",null,{cellOverClass:"dojoxGridCellOver",onKeyEvent:function(e){
this.dispatchKeyEvent(e);
},onContentEvent:function(e){
this.dispatchContentEvent(e);
},onHeaderEvent:function(e){
this.dispatchHeaderEvent(e);
},onStyleRow:function(_2de){
var i=_2de;
i.customClasses+=(i.odd?" dojoxGridRowOdd":"")+(i.selected?" dojoxGridRowSelected":"")+(i.over?" dojoxGridRowOver":"");
this.focus.styleRow(_2de);
this.edit.styleRow(_2de);
},onKeyDown:function(e){
if(e.altKey||e.metaKey){
return;
}
var _2df;
switch(e.keyCode){
case keys.ESCAPE:
this.edit.cancel();
break;
case keys.ENTER:
if(!this.edit.isEditing()){
_2df=this.focus.getHeaderIndex();
if(_2df>=0){
this.setSortIndex(_2df);
break;
}else{
this.selection.clickSelect(this.focus.rowIndex,dojo.isCopyKey(e),e.shiftKey);
}
_2dd.stop(e);
}
if(!e.shiftKey){
var _2e0=this.edit.isEditing();
this.edit.apply();
if(!_2e0){
this.edit.setEditCell(this.focus.cell,this.focus.rowIndex);
}
}
if(!this.edit.isEditing()){
var _2e1=this.focus.focusView||this.views.views[0];
_2e1.content.decorateEvent(e);
this.onRowClick(e);
_2dd.stop(e);
}
break;
case keys.SPACE:
if(!this.edit.isEditing()){
_2df=this.focus.getHeaderIndex();
if(_2df>=0){
this.setSortIndex(_2df);
break;
}else{
this.selection.clickSelect(this.focus.rowIndex,dojo.isCopyKey(e),e.shiftKey);
}
_2dd.stop(e);
}
break;
case keys.TAB:
this.focus[e.shiftKey?"previousKey":"nextKey"](e);
break;
case keys.LEFT_ARROW:
case keys.RIGHT_ARROW:
if(!this.edit.isEditing()){
var _2e2=e.keyCode;
_2dd.stop(e);
_2df=this.focus.getHeaderIndex();
if(_2df>=0&&(e.shiftKey&&e.ctrlKey)){
this.focus.colSizeAdjust(e,_2df,(_2e2==keys.LEFT_ARROW?-1:1)*5);
}else{
var _2e3=(_2e2==keys.LEFT_ARROW)?1:-1;
if(this.isLeftToRight()){
_2e3*=-1;
}
this.focus.move(0,_2e3);
}
}
break;
case keys.UP_ARROW:
if(!this.edit.isEditing()&&this.focus.rowIndex!==0){
_2dd.stop(e);
this.focus.move(-1,0);
}
break;
case keys.DOWN_ARROW:
if(!this.edit.isEditing()&&this.focus.rowIndex+1!=this.rowCount){
_2dd.stop(e);
this.focus.move(1,0);
}
break;
case keys.PAGE_UP:
if(!this.edit.isEditing()&&this.focus.rowIndex!==0){
_2dd.stop(e);
if(this.focus.rowIndex!=this.scroller.firstVisibleRow+1){
this.focus.move(this.scroller.firstVisibleRow-this.focus.rowIndex,0);
}else{
this.setScrollTop(this.scroller.findScrollTop(this.focus.rowIndex-1));
this.focus.move(this.scroller.firstVisibleRow-this.scroller.lastVisibleRow+1,0);
}
}
break;
case keys.PAGE_DOWN:
if(!this.edit.isEditing()&&this.focus.rowIndex+1!=this.rowCount){
_2dd.stop(e);
if(this.focus.rowIndex!=this.scroller.lastVisibleRow-1){
this.focus.move(this.scroller.lastVisibleRow-this.focus.rowIndex-1,0);
}else{
this.setScrollTop(this.scroller.findScrollTop(this.focus.rowIndex+1));
this.focus.move(this.scroller.lastVisibleRow-this.scroller.firstVisibleRow-1,0);
}
}
break;
default:
break;
}
},onMouseOver:function(e){
e.rowIndex==-1?this.onHeaderCellMouseOver(e):this.onCellMouseOver(e);
},onMouseOut:function(e){
e.rowIndex==-1?this.onHeaderCellMouseOut(e):this.onCellMouseOut(e);
},onMouseDown:function(e){
e.rowIndex==-1?this.onHeaderCellMouseDown(e):this.onCellMouseDown(e);
},onMouseOverRow:function(e){
if(!this.rows.isOver(e.rowIndex)){
this.rows.setOverRow(e.rowIndex);
e.rowIndex==-1?this.onHeaderMouseOver(e):this.onRowMouseOver(e);
}
},onMouseOutRow:function(e){
if(this.rows.isOver(-1)){
this.onHeaderMouseOut(e);
}else{
if(!this.rows.isOver(-2)){
this.rows.setOverRow(-2);
this.onRowMouseOut(e);
}
}
},onMouseDownRow:function(e){
if(e.rowIndex!=-1){
this.onRowMouseDown(e);
}
},onCellMouseOver:function(e){
if(e.cellNode){
_2db.add(e.cellNode,this.cellOverClass);
}
},onCellMouseOut:function(e){
if(e.cellNode){
_2db.remove(e.cellNode,this.cellOverClass);
}
},onCellMouseDown:function(e){
},onCellClick:function(e){
this._click[0]=this._click[1];
this._click[1]=e;
if(!this.edit.isEditCell(e.rowIndex,e.cellIndex)){
this.focus.setFocusCell(e.cell,e.rowIndex);
}
if(this._click.length>1&&this._click[0]==null){
this._click.shift();
}
this.onRowClick(e);
},onCellDblClick:function(e){
var _2e4;
if(this._click.length>1&&has("ie")){
_2e4=this._click[1];
}else{
if(this._click.length>1&&this._click[0].rowIndex!=this._click[1].rowIndex){
_2e4=this._click[0];
}else{
_2e4=e;
}
}
this.focus.setFocusCell(_2e4.cell,_2e4.rowIndex);
this.edit.setEditCell(_2e4.cell,_2e4.rowIndex);
this.onRowDblClick(e);
},onCellContextMenu:function(e){
this.onRowContextMenu(e);
},onCellFocus:function(_2e5,_2e6){
this.edit.cellFocus(_2e5,_2e6);
},onRowClick:function(e){
this.edit.rowClick(e);
this.selection.clickSelectEvent(e);
},onRowDblClick:function(e){
},onRowMouseOver:function(e){
},onRowMouseOut:function(e){
},onRowMouseDown:function(e){
},onRowContextMenu:function(e){
_2dd.stop(e);
},onHeaderMouseOver:function(e){
},onHeaderMouseOut:function(e){
},onHeaderCellMouseOver:function(e){
if(e.cellNode){
_2db.add(e.cellNode,this.cellOverClass);
}
},onHeaderCellMouseOut:function(e){
if(e.cellNode){
_2db.remove(e.cellNode,this.cellOverClass);
}
},onHeaderCellMouseDown:function(e){
},onHeaderClick:function(e){
},onHeaderCellClick:function(e){
this.setSortIndex(e.cell.index);
this.onHeaderClick(e);
},onHeaderDblClick:function(e){
},onHeaderCellDblClick:function(e){
this.onHeaderDblClick(e);
},onHeaderCellContextMenu:function(e){
this.onHeaderContextMenu(e);
},onHeaderContextMenu:function(e){
if(!this.headerMenu){
_2dd.stop(e);
}
},onStartEdit:function(_2e7,_2e8){
},onApplyCellEdit:function(_2e9,_2ea,_2eb){
},onCancelEdit:function(_2ec){
},onApplyEdit:function(_2ed){
},onCanSelect:function(_2ee){
return true;
},onCanDeselect:function(_2ef){
return true;
},onSelected:function(_2f0){
this.updateRowStyles(_2f0);
},onDeselected:function(_2f1){
this.updateRowStyles(_2f1);
},onSelectionChanged:function(){
}});
});
},"manager/Dialog":function(){
require({cache:{"url:manager/templates/Dialog.html":"<div class=\"mBoxPaneDialog mElement\" role=\"dialog\" aria-labelledby=\"${id}_title\"  cleanContent=\"true\">\n    <div >\n\t<span></span>\n\t<span dojoAttachPoint=\"closeButtonNode\"></span>\n    </div>  \n<div  id=\"${id}_container\" dojoAttachPoint=\"containerNode\"></div>\n</div>\n"}});
define("manager/Dialog",["dojo/_base/declare","dojo/_base/window","dojo/_base/lang","dojo/aspect","dojo/dom-geometry","dojo/query","dojo/has","dojo/topic","dojo/dom-class","dojo/dom-style","dijit/Dialog","dojo/dnd/Moveable","manager/ElementPane","dojo/text!./templates/Dialog.html"],function(_2f2,_2f3,lang,_2f4,_2f5,_2f6,has,_2f7,_2f8,_2f9,_2fa,_2fb,_2fc,_2fd){
return _2f2("Manager.Dialog",[_2fa,_2fc],{widgetsInTemplate:true,templateString:_2fd,enableDrag:function(){
var node=this.domNode;
var _2fe=_2f6(" > form div div *",this.containerNode.id);
var _2ff=_2fe.shift();
if(_2ff&&this.draggable){
this._moveable=new ((has("ie")==6)?TimedMoveable:_2fb)(node,{handle:_2ff});
_2f4.after(this._moveable,"onMoveStop",lang.hitch(this,"_endDrag"),true);
}else{
_2f8.add(node,"dijitDialogFixed");
}
}});
});
},"dojox/html/metrics":function(){
define(["dojo/_base/kernel","dojo/_base/lang","dojo/_base/sniff","dojo/ready","dojo/_base/unload","dojo/_base/window","dojo/dom-geometry"],function(_300,lang,has,_301,_302,_303,_304){
var dhm=lang.getObject("dojox.html.metrics",true);
var _305=lang.getObject("dojox");
dhm.getFontMeasurements=function(){
var _306={"1em":0,"1ex":0,"100%":0,"12pt":0,"16px":0,"xx-small":0,"x-small":0,"small":0,"medium":0,"large":0,"x-large":0,"xx-large":0};
if(has("ie")){
_303.doc.documentElement.style.fontSize="100%";
}
var div=_303.doc.createElement("div");
var ds=div.style;
ds.position="absolute";
ds.left="-100px";
ds.top="0";
ds.width="30px";
ds.height="1000em";
ds.borderWidth="0";
ds.margin="0";
ds.padding="0";
ds.outline="0";
ds.lineHeight="1";
ds.overflow="hidden";
_303.body().appendChild(div);
for(var p in _306){
ds.fontSize=p;
_306[p]=Math.round(div.offsetHeight*12/16)*16/12/1000;
}
_303.body().removeChild(div);
div=null;
return _306;
};
var _307=null;
dhm.getCachedFontMeasurements=function(_308){
if(_308||!_307){
_307=dhm.getFontMeasurements();
}
return _307;
};
var _309=null,_30a={};
dhm.getTextBox=function(text,_30b,_30c){
var m,s;
if(!_309){
m=_309=_303.doc.createElement("div");
var c=_303.doc.createElement("div");
c.appendChild(m);
s=c.style;
s.overflow="scroll";
s.position="absolute";
s.left="0px";
s.top="-10000px";
s.width="1px";
s.height="1px";
s.visibility="hidden";
s.borderWidth="0";
s.margin="0";
s.padding="0";
s.outline="0";
_303.body().appendChild(c);
}else{
m=_309;
}
m.className="";
s=m.style;
s.borderWidth="0";
s.margin="0";
s.padding="0";
s.outline="0";
if(arguments.length>1&&_30b){
for(var i in _30b){
if(i in _30a){
continue;
}
s[i]=_30b[i];
}
}
if(arguments.length>2&&_30c){
m.className=_30c;
}
m.innerHTML=text;
var box=_304.position(m);
box.w=m.parentNode.scrollWidth;
return box;
};
var _30d={w:16,h:16};
dhm.getScrollbar=function(){
return {w:_30d.w,h:_30d.h};
};
dhm._fontResizeNode=null;
dhm.initOnFontResize=function(_30e){
var f=dhm._fontResizeNode=_303.doc.createElement("iframe");
var fs=f.style;
fs.position="absolute";
fs.width="5em";
fs.height="10em";
fs.top="-10000px";
fs.display="none";
if(has("ie")){
f.onreadystatechange=function(){
if(f.contentWindow.document.readyState=="complete"){
f.onresize=f.contentWindow.parent[_305._scopeName].html.metrics._fontresize;
}
};
}else{
f.onload=function(){
f.contentWindow.onresize=f.contentWindow.parent[_305._scopeName].html.metrics._fontresize;
};
}
f.setAttribute("src","javascript:'<html><head><script>if(\"loadFirebugConsole\" in window){window.loadFirebugConsole();}</script></head><body></body></html>'");
_303.body().appendChild(f);
dhm.initOnFontResize=function(){
};
};
dhm.onFontResize=function(){
};
dhm._fontresize=function(){
dhm.onFontResize();
};
_302.addOnUnload(function(){
var f=dhm._fontResizeNode;
if(f){
if(has("ie")&&f.onresize){
f.onresize=null;
}else{
if(f.contentWindow&&f.contentWindow.onresize){
f.contentWindow.onresize=null;
}
}
dhm._fontResizeNode=null;
}
});
_301(function(){
try{
var n=_303.doc.createElement("div");
n.style.cssText="top:0;left:0;width:100px;height:100px;overflow:scroll;position:absolute;visibility:hidden;";
_303.body().appendChild(n);
_30d.w=n.offsetWidth-n.clientWidth;
_30d.h=n.offsetHeight-n.clientHeight;
_303.body().removeChild(n);
delete n;
}
catch(e){
}
if("fontSizeWatch" in _300.config&&!!_300.config.fontSizeWatch){
dhm.initOnFontResize();
}
});
return dhm;
});
},"dojox/grid/_EditManager":function(){
define(["dojo/_base/lang","dojo/_base/array","dojo/_base/declare","dojo/_base/connect","dojo/_base/sniff","./util"],function(lang,_30f,_310,_311,has,util){
return _310("dojox.grid._EditManager",null,{constructor:function(_312){
this.grid=_312;
this.connections=!has("ie")?[]:[_311.connect(document.body,"onfocus",lang.hitch(this,"_boomerangFocus"))];
this.connections.push(_311.connect(this.grid,"onBlur",this,"apply"));
this.connections.push(_311.connect(this.grid,"prerender",this,"_onPreRender"));
},info:{},destroy:function(){
_30f.forEach(this.connections,_311.disconnect);
},cellFocus:function(_313,_314){
if(this.grid.singleClickEdit||this.isEditRow(_314)){
this.setEditCell(_313,_314);
}else{
this.apply();
}
if(this.isEditing()||(_313&&_313.editable&&_313.alwaysEditing)){
this._focusEditor(_313,_314);
}
},rowClick:function(e){
if(this.isEditing()&&!this.isEditRow(e.rowIndex)){
this.apply();
}
},styleRow:function(_315){
if(_315.index==this.info.rowIndex){
_315.customClasses+=" dojoxGridRowEditing";
}
},dispatchEvent:function(e){
var c=e.cell,ed=(c&&c["editable"])?c:0;
return ed&&ed.dispatchEvent(e.dispatch,e);
},isEditing:function(){
return this.info.rowIndex!==undefined;
},isEditCell:function(_316,_317){
return (this.info.rowIndex===_316)&&(this.info.cell.index==_317);
},isEditRow:function(_318){
return this.info.rowIndex===_318;
},setEditCell:function(_319,_31a){
if(!this.isEditCell(_31a,_319.index)&&this.grid.canEdit&&this.grid.canEdit(_319,_31a)){
this.start(_319,_31a,this.isEditRow(_31a)||_319.editable);
}
},_focusEditor:function(_31b,_31c){
util.fire(_31b,"focus",[_31c]);
},focusEditor:function(){
if(this.isEditing()){
this._focusEditor(this.info.cell,this.info.rowIndex);
}
},_boomerangWindow:500,_shouldCatchBoomerang:function(){
return this._catchBoomerang>new Date().getTime();
},_boomerangFocus:function(){
if(this._shouldCatchBoomerang()){
this.grid.focus.focusGrid();
this.focusEditor();
this._catchBoomerang=0;
}
},_doCatchBoomerang:function(){
if(has("ie")){
this._catchBoomerang=new Date().getTime()+this._boomerangWindow;
}
},start:function(_31d,_31e,_31f){
if(!this._isValidInput()){
return;
}
this.grid.beginUpdate();
this.editorApply();
if(this.isEditing()&&!this.isEditRow(_31e)){
this.applyRowEdit();
this.grid.updateRow(_31e);
}
if(_31f){
this.info={cell:_31d,rowIndex:_31e};
this.grid.doStartEdit(_31d,_31e);
this.grid.updateRow(_31e);
}else{
this.info={};
}
this.grid.endUpdate();
this.grid.focus.focusGrid();
this._focusEditor(_31d,_31e);
this._doCatchBoomerang();
},_editorDo:function(_320){
var c=this.info.cell;
if(c&&c.editable){
c[_320](this.info.rowIndex);
}
},editorApply:function(){
this._editorDo("apply");
},editorCancel:function(){
this._editorDo("cancel");
},applyCellEdit:function(_321,_322,_323){
if(this.grid.canEdit(_322,_323)){
this.grid.doApplyCellEdit(_321,_323,_322.field);
}
},applyRowEdit:function(){
this.grid.doApplyEdit(this.info.rowIndex,this.info.cell.field);
},apply:function(){
if(this.isEditing()&&this._isValidInput()){
this.grid.beginUpdate();
this.editorApply();
this.applyRowEdit();
this.info={};
this.grid.endUpdate();
this.grid.focus.focusGrid();
this._doCatchBoomerang();
}
},cancel:function(){
if(this.isEditing()){
this.grid.beginUpdate();
this.editorCancel();
this.info={};
this.grid.endUpdate();
this.grid.focus.focusGrid();
this._doCatchBoomerang();
}
},save:function(_324,_325){
var c=this.info.cell;
if(this.isEditRow(_324)&&(!_325||c.view==_325)&&c.editable){
c.save(c,this.info.rowIndex);
}
},restore:function(_326,_327){
var c=this.info.cell;
if(this.isEditRow(_327)&&c.view==_326&&c.editable){
c.restore(this.info.rowIndex);
}
},_isValidInput:function(){
var w=(this.info.cell||{}).widget;
if(!w||!w.isValid){
return true;
}
w.focused=true;
return w.isValid(true);
},_onPreRender:function(){
if(this.isEditing()){
this.info.value=this.info.cell.getValue();
}
}});
});
},"manager/EditMask":function(){
define("manager/EditMask",["dojo/_base/declare"],function(_328){
return _328("Manager.EditMask",[],{version:"0.1",h1:null,h2:null,h3:null,h4:null,constructor:function(_329,mask,_32a,_32b){
this.element=manager.getElementById(_329);
if(this.element!=null){
this.mask=mask;
this.errMsg=_32b!=""?_32b:"Caracter inválido!";
this.optional=_32a;
var _32c=this.element.value?this.filterStrip(this.element.value):"";
this.element.value=this.fillMask(_32c);
this.fcolor=this.element.style.color==""?"black":_329.style.color;
this.first=true;
this.element.editMask=this;
this.h1=dojo.connect(this.element,"keypress",this,this.process);
this.h2=dojo.connect(this.element,"focus",this,this.onEnter);
this.h3=dojo.connect(this.element,"submit",this,this.onSubmit);
}
},onEnter:function(_32d){
element=_32d.target;
element.editMask.color=element.style.color;
element.editMask.first=true;
var _32e=element.value?element.editMask.filterStrip(element.value):"";
element.value=element.editMask.fillMask(_32e);
},onExit:function(_32f){
element=_32f.target;
var ok=element.editMask.canBlur(element);
if(ok){
dojo.disconnect(element.editMask.h4);
element.editMask.first=true;
}else{
element.focus();
}
return ok;
},canBlur:function(_330){
var _331=_330.editMask.filterExit(_330.value);
var ok=true;
if(!_330.editMask.optional){
ok=(_331.length==_330.editMask.mask.length);
}
if(ok){
_330.value=_331;
_330.style.color=_330.editMask.fcolor;
}else{
_330.style.color="red";
_330.focus();
}
return ok;
},onError:function(_332){
alert(_332);
},onSubmit:function(){
this.element.value=this.filterExit(this.element.value);
return true;
},process:function(_333){
element=_333.target;
keyCode=_333.charCode!=0?_333.charCode:_333.keyCode;
editMask=element.editMask;
if(element.editMask.first){
element.editMask.h4=dojo.connect(element,"blur",element.editMask,element.editMask.onExit);
element.editMask.first=false;
}
filter=editMask.filterStrip(element.value);
var _334="";
if(keyCode==9){
return true;
}else{
if(keyCode==8&&filter.length!=0){
filter=filter.substring(0,filter.length-1);
}else{
if(((keyCode>47&&keyCode<122))&&filter.length<editMask.filterMax()){
_334=filter+String.fromCharCode(keyCode);
}else{
_334=filter;
}
}
}
var _335="";
var _336=editMask.validateMask(_334);
if(_336){
_335=editMask.fillMask(_336);
}else{
_335=editMask.fillMask(filter);
}
element.value=_335;
_333.preventDefault();
return false;
},filterStrip:function(_337){
mask=this.mask;
for(var _338=0;_338<mask.length++;_338++){
var c=mask.charAt(_338);
if(this.isEditChar(c)){
mask=this.filterReplace(mask,mask.substring(_338,_338+1),"");
}
}
filterMask=mask+"_";
for(var _338=0;_338<filterMask.length++;_338++){
_337=this.filterReplace(_337,filterMask.substring(_338,_338+1),"");
}
return _337;
},filterMask:function(_339){
filterMask="_";
for(var _33a=0;_33a<filterMask.length++;_33a++){
_339=this.filterReplace(_339,filterMask.substring(_33a,_33a+1),"");
}
return _339;
},filterMax:function(){
filterTemp=this.mask;
for(var _33b=0;_33b<(this.mask.length+1);_33b++){
var c=this.mask.charAt(_33b);
if(!this.isEditChar(c)){
filterTemp=this.filterReplace(filterTemp,c,"");
}
}
return filterTemp.length;
},filterExit:function(_33c){
mask=this.mask+"_";
var _33d=true;
for(var i=0;i<_33c.length;i++){
_33d=_33d&&(_33c.charAt(i)!="_");
}
if(!_33d){
while((_33c.length>0)&&(mask.indexOf(_33c.charAt(0))>-1)){
_33c=_33c.substr(1);
}
}
return _33c;
},filterReplace:function(_33e,text,by){
var _33f=_33e.length,_340=text.length;
if((_33f==0)||(_340==0)){
return _33e;
}
var i=_33e.indexOf(text);
if((!i)&&(text!=_33e.substring(0,_340))){
return _33e;
}
if(i==-1){
return _33e;
}
var _341=_33e.substring(0,i)+by;
if(i+_340<_33f){
_341+=this.filterReplace(_33e.substring(i+_340,_33f),text,by);
}
return _341;
},isEditChar:function(c){
switch(c){
case "_":
case "#":
case "a":
case "A":
case "l":
case "L":
return true;
default:
return false;
}
return false;
},displayMaskChar:function(c){
if(this.isEditChar(c)){
return "_";
}else{
return c;
}
},displayMask:function(mask){
var d="";
for(var i=0;i<mask.length;i++){
d+=this.displayMaskChar(mask.substr(i,1));
}
return d;
},validateMask:function(_342){
var ok=true;
var _343=this.mask.length-1;
var pos=posmask=0;
var n=_342.length-1;
var _344="";
while((pos<=n)&&(posmask<=_343)){
var m=this.mask.charAt(posmask);
var c=_342.charCodeAt(pos);
if(this.isEditChar(m)){
var code=this.isInsertOK(c,m);
if(ok=ok&&(code!=null)){
_344=_344+String.fromCharCode(code);
}else{
this.onError(this.errMsg);
}
pos+=1;
}
posmask+=1;
}
return ok?_344:null;
},fillMask:function(_345){
var _346="";
var n=_345.length-1;
var _347=this.mask.length-1;
var pos=n;
var _348=_347;
while(_348>=0){
var m=this.mask.charAt(_348);
if(pos>=0){
var c=_345.charAt(pos);
if(this.isEditChar(m)){
_346=c+_346;
pos-=1;
}else{
_346=m+_346;
}
}else{
if(this.isEditChar(m)){
_346="_"+_346;
}else{
_346=m+_346;
}
}
_348-=1;
}
return _346;
},isInsertOK:function(code,_349){
switch(_349){
case "_":
return true;
break;
case "#":
return this.checkDigit(code);
break;
case "a":
return this.checkAlphaNumeric(code);
break;
case "A":
return this.checkUpCaseAlphaNumeric(code);
break;
case "l":
return this.checkAlpha(code);
break;
case "L":
return this.checkUpCaseAlpha(code);
break;
}
return false;
},checkDigit:function(code){
if((code>=48)&&(code<=57)){
return code;
}else{
return null;
}
},checkAlpha:function(code){
if(((code>=65)&&(code<=90))||((code>=97)&&(code<=122))){
return code;
}else{
return null;
}
},checkUpCaseAlpha:function(code){
if((code>=65)&&(code<=90)){
return code;
}else{
if((code>=97)&&(code<=122)){
return code-32;
}else{
return null;
}
}
},checkAlphaNumeric:function(code){
if(((code>=65)&&(code<=90))||((code>=97)&&(code<=122))||((code>=48)&&(code<=57))){
return code;
}else{
return null;
}
},checkUpCaseAlphaNumeric:function(code){
if((code>=65)&&(code<=90)){
return code;
}else{
if((code>=97)&&(code<=122)){
return code-32;
}else{
if((code>=48)&&(code<=57)){
return code;
}else{
return null;
}
}
}
}});
});
},"manager/MD5":function(){
function _34a(n){
for(i=0;i<n;i++){
this[i]=0;
}
this.length=n;
};
define("manager/MD5",["dojo/_base/declare"],function(_34b){
return _34b("Manager.MD5",[],{constructor:function(){
},array:function(n){
var a;
for(i=0;i<n;i++){
a[i]=0;
}
a.length=n;
return a;
},integer:function(n){
return n%(4294967295+1);
},shr:function(a,b){
a=this.integer(a);
b=this.integer(b);
if(a-2147483648>=0){
a=a%2147483648;
a>>=b;
a+=1073741824>>(b-1);
}else{
a>>=b;
}
return a;
},shl1:function(a){
a=a%2147483648;
if(a&1073741824==1073741824){
a-=1073741824;
a*=2;
a+=2147483648;
}else{
a*=2;
}
return a;
},shl:function(a,b){
a=this.integer(a);
b=this.integer(b);
for(var i=0;i<b;i++){
a=this.shl1(a);
}
return a;
},and:function(a,b){
a=this.integer(a);
b=this.integer(b);
var t1=(a-2147483648);
var t2=(b-2147483648);
if(t1>=0){
if(t2>=0){
return ((t1&t2)+2147483648);
}else{
return (t1&b);
}
}else{
if(t2>=0){
return (a&t2);
}else{
return (a&b);
}
}
},or:function(a,b){
a=this.integer(a);
b=this.integer(b);
var t1=(a-2147483648);
var t2=(b-2147483648);
if(t1>=0){
if(t2>=0){
return ((t1|t2)+2147483648);
}else{
return ((t1|b)+2147483648);
}
}else{
if(t2>=0){
return ((a|t2)+2147483648);
}else{
return (a|b);
}
}
},xor:function(a,b){
a=this.integer(a);
b=this.integer(b);
var t1=(a-2147483648);
var t2=(b-2147483648);
if(t1>=0){
if(t2>=0){
return (t1^t2);
}else{
return ((t1^b)+2147483648);
}
}else{
if(t2>=0){
return ((a^t2)+2147483648);
}else{
return (a^b);
}
}
},not:function(a){
a=this.integer(a);
return (4294967295-a);
},state:new _34a(4),count:new _34a(2),buffer:new _34a(64),transformBuffer:new _34a(16),digestBits:new _34a(16),S11:7,S12:12,S13:17,S14:22,S21:5,S22:9,S23:14,S24:20,S31:4,S32:11,S33:16,S34:23,S41:6,S42:10,S43:15,S44:21,F:function(x,y,z){
return this.or(this.and(x,y),this.and(this.not(x),z));
},G:function(x,y,z){
return this.or(this.and(x,z),this.and(y,this.not(z)));
},H:function(x,y,z){
return this.xor(this.xor(x,y),z);
},I:function(x,y,z){
return this.xor(y,this.or(x,this.not(z)));
},rotateLeft:function(a,n){
return this.or(this.shl(a,n),(this.shr(a,(32-n))));
},FF:function(a,b,c,d,x,s,ac){
a=a+this.F(b,c,d)+x+ac;
a=this.rotateLeft(a,s);
a=a+b;
return a;
},GG:function(a,b,c,d,x,s,ac){
a=a+this.G(b,c,d)+x+ac;
a=this.rotateLeft(a,s);
a=a+b;
return a;
},HH:function(a,b,c,d,x,s,ac){
a=a+this.H(b,c,d)+x+ac;
a=this.rotateLeft(a,s);
a=a+b;
return a;
},II:function(a,b,c,d,x,s,ac){
a=a+this.I(b,c,d)+x+ac;
a=this.rotateLeft(a,s);
a=a+b;
return a;
},transform:function(buf,_34c){
var a=0,b=0,c=0,d=0;
var x=this.transformBuffer;
a=this.state[0];
b=this.state[1];
c=this.state[2];
d=this.state[3];
for(i=0;i<16;i++){
x[i]=this.and(buf[i*4+_34c],255);
for(j=1;j<4;j++){
x[i]+=this.shl(this.and(buf[i*4+j+_34c],255),j*8);
}
}
a=this.FF(a,b,c,d,x[0],this.S11,3614090360);
d=this.FF(d,a,b,c,x[1],this.S12,3905402710);
c=this.FF(c,d,a,b,x[2],this.S13,606105819);
b=this.FF(b,c,d,a,x[3],this.S14,3250441966);
a=this.FF(a,b,c,d,x[4],this.S11,4118548399);
d=this.FF(d,a,b,c,x[5],this.S12,1200080426);
c=this.FF(c,d,a,b,x[6],this.S13,2821735955);
b=this.FF(b,c,d,a,x[7],this.S14,4249261313);
a=this.FF(a,b,c,d,x[8],this.S11,1770035416);
d=this.FF(d,a,b,c,x[9],this.S12,2336552879);
c=this.FF(c,d,a,b,x[10],this.S13,4294925233);
b=this.FF(b,c,d,a,x[11],this.S14,2304563134);
a=this.FF(a,b,c,d,x[12],this.S11,1804603682);
d=this.FF(d,a,b,c,x[13],this.S12,4254626195);
c=this.FF(c,d,a,b,x[14],this.S13,2792965006);
b=this.FF(b,c,d,a,x[15],this.S14,1236535329);
a=this.GG(a,b,c,d,x[1],this.S21,4129170786);
d=this.GG(d,a,b,c,x[6],this.S22,3225465664);
c=this.GG(c,d,a,b,x[11],this.S23,643717713);
b=this.GG(b,c,d,a,x[0],this.S24,3921069994);
a=this.GG(a,b,c,d,x[5],this.S21,3593408605);
d=this.GG(d,a,b,c,x[10],this.S22,38016083);
c=this.GG(c,d,a,b,x[15],this.S23,3634488961);
b=this.GG(b,c,d,a,x[4],this.S24,3889429448);
a=this.GG(a,b,c,d,x[9],this.S21,568446438);
d=this.GG(d,a,b,c,x[14],this.S22,3275163606);
c=this.GG(c,d,a,b,x[3],this.S23,4107603335);
b=this.GG(b,c,d,a,x[8],this.S24,1163531501);
a=this.GG(a,b,c,d,x[13],this.S21,2850285829);
d=this.GG(d,a,b,c,x[2],this.S22,4243563512);
c=this.GG(c,d,a,b,x[7],this.S23,1735328473);
b=this.GG(b,c,d,a,x[12],this.S24,2368359562);
a=this.HH(a,b,c,d,x[5],this.S31,4294588738);
d=this.HH(d,a,b,c,x[8],this.S32,2272392833);
c=this.HH(c,d,a,b,x[11],this.S33,1839030562);
b=this.HH(b,c,d,a,x[14],this.S34,4259657740);
a=this.HH(a,b,c,d,x[1],this.S31,2763975236);
d=this.HH(d,a,b,c,x[4],this.S32,1272893353);
c=this.HH(c,d,a,b,x[7],this.S33,4139469664);
b=this.HH(b,c,d,a,x[10],this.S34,3200236656);
a=this.HH(a,b,c,d,x[13],this.S31,681279174);
d=this.HH(d,a,b,c,x[0],this.S32,3936430074);
c=this.HH(c,d,a,b,x[3],this.S33,3572445317);
b=this.HH(b,c,d,a,x[6],this.S34,76029189);
a=this.HH(a,b,c,d,x[9],this.S31,3654602809);
d=this.HH(d,a,b,c,x[12],this.S32,3873151461);
c=this.HH(c,d,a,b,x[15],this.S33,530742520);
b=this.HH(b,c,d,a,x[2],this.S34,3299628645);
a=this.II(a,b,c,d,x[0],this.S41,4096336452);
d=this.II(d,a,b,c,x[7],this.S42,1126891415);
c=this.II(c,d,a,b,x[14],this.S43,2878612391);
b=this.II(b,c,d,a,x[5],this.S44,4237533241);
a=this.II(a,b,c,d,x[12],this.S41,1700485571);
d=this.II(d,a,b,c,x[3],this.S42,2399980690);
c=this.II(c,d,a,b,x[10],this.S43,4293915773);
b=this.II(b,c,d,a,x[1],this.S44,2240044497);
a=this.II(a,b,c,d,x[8],this.S41,1873313359);
d=this.II(d,a,b,c,x[15],this.S42,4264355552);
c=this.II(c,d,a,b,x[6],this.S43,2734768916);
b=this.II(b,c,d,a,x[13],this.S44,1309151649);
a=this.II(a,b,c,d,x[4],this.S41,4149444226);
d=this.II(d,a,b,c,x[11],this.S42,3174756917);
c=this.II(c,d,a,b,x[2],this.S43,718787259);
b=this.II(b,c,d,a,x[9],this.S44,3951481745);
this.state[0]+=a;
this.state[1]+=b;
this.state[2]+=c;
this.state[3]+=d;
},init:function(){
this.count[0]=this.count[1]=0;
this.state[0]=1732584193;
this.state[1]=4023233417;
this.state[2]=2562383102;
this.state[3]=271733878;
for(i=0;i<this.digestBits.length;i++){
this.digestBits[i]=0;
}
},update:function(b){
var _34d,i;
_34d=this.and(this.shr(this.count[0],3),63);
if(this.count[0]<4294967295-7){
this.count[0]+=8;
}else{
this.count[1]++;
this.count[0]-=4294967295+1;
this.count[0]+=8;
}
this.buffer[_34d]=this.and(b,255);
if(_34d>=63){
this.transform(this.buffer,0);
}
},finish:function(){
var bits=new _34a(8);
var _34e;
var i=0,_34f=0,_350=0;
for(i=0;i<4;i++){
bits[i]=this.and(this.shr(this.count[0],(i*8)),255);
}
for(i=0;i<4;i++){
bits[i+4]=this.and(this.shr(this.count[1],(i*8)),255);
}
_34f=this.and(this.shr(this.count[0],3),63);
_350=(_34f<56)?(56-_34f):(120-_34f);
_34e=new _34a(64);
_34e[0]=128;
for(i=0;i<_350;i++){
this.update(_34e[i]);
}
for(i=0;i<8;i++){
this.update(bits[i]);
}
for(i=0;i<4;i++){
for(j=0;j<4;j++){
this.digestBits[i*4+j]=this.and(this.shr(this.state[i],(j*8)),255);
}
}
},hexa:function(n){
var _351="0123456789abcdef";
var _352="";
var _353=n;
for(hexa_i=0;hexa_i<8;hexa_i++){
_352=_351.charAt(Math.abs(_353)%16)+_352;
_353=Math.floor(_353/16);
}
return _352;
},ascii:"01234567890123456789012345678901"+" !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ"+"[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~",MD5:function(_354){
var l,s,k,ka,kb,kc,kd;
this.init();
for(k=0;k<_354.length;k++){
l=_354.charAt(k);
this.update(this.ascii.lastIndexOf(l));
}
this.finish();
ka=kb=kc=kd=0;
for(i=0;i<4;i++){
ka+=this.shl(this.digestBits[15-i],(i*8));
}
for(i=4;i<8;i++){
kb+=this.shl(this.digestBits[15-i],((i-4)*8));
}
for(i=8;i<12;i++){
kc+=this.shl(this.digestBits[15-i],((i-8)*8));
}
for(i=12;i<16;i++){
kd+=this.shl(this.digestBits[15-i],((i-12)*8));
}
s=this.hexa(kd)+this.hexa(kc)+this.hexa(kb)+this.hexa(ka);
return s;
}});
});
},"manager/nls/messages":function(){
define("manager/nls/messages",{root:{PRINT_FILE:"Aguarde a geração do relatório.\nO resultado será exibido em uma nova janela.",INVALID_CHAR:"Invalid character."},"pt-br.utf8":1,"pt":1,"pt-br":1,"en-us":1});
},"manager/nls/pt/messages":function(){
define("manager/nls/pt/messages",{});
},"manager/nls/pt-br/messages":function(){
define("manager/nls/pt-br/messages",{PRINT_FILE:"Aguarde a geração do relatório.\nO resultado será exibido em uma nova janela.",SHOW_PDF:"Aguarde a geração do arquivo PDF.\nO resultado será exibido em uma nova janela.",PLEASE_WAIT:"Aguarde...",INVALID_CHAR:"Caracter inválido."});
},"manager/nls/pt/messages":function(){
define("manager/nls/pt/messages",{});
},"dojo/dnd/Container":function(){
define(["../_base/array","../_base/declare","../_base/kernel","../_base/lang","../_base/window","../dom","../dom-class","../dom-construct","../Evented","../has","../on","../query","../touch","./common"],function(_355,_356,_357,lang,win,dom,_358,_359,_35a,has,on,_35b,_35c,dnd){
var _35d=_356("dojo.dnd.Container",_35a,{skipForm:false,allowNested:false,constructor:function(node,_35e){
this.node=dom.byId(node);
if(!_35e){
_35e={};
}
this.creator=_35e.creator||null;
this.skipForm=_35e.skipForm;
this.parent=_35e.dropParent&&dom.byId(_35e.dropParent);
this.map={};
this.current=null;
this.containerState="";
_358.add(this.node,"dojoDndContainer");
if(!(_35e&&_35e._skipStartup)){
this.startup();
}
this.events=[on(this.node,_35c.over,lang.hitch(this,"onMouseOver")),on(this.node,_35c.out,lang.hitch(this,"onMouseOut")),on(this.node,"dragstart",lang.hitch(this,"onSelectStart")),on(this.node,"selectstart",lang.hitch(this,"onSelectStart"))];
},creator:function(){
},getItem:function(key){
return this.map[key];
},setItem:function(key,data){
this.map[key]=data;
},delItem:function(key){
delete this.map[key];
},forInItems:function(f,o){
o=o||_357.global;
var m=this.map,e=dnd._empty;
for(var i in m){
if(i in e){
continue;
}
f.call(o,m[i],i,this);
}
return o;
},clearItems:function(){
this.map={};
},getAllNodes:function(){
return _35b((this.allowNested?"":"> ")+".dojoDndItem",this.parent);
},sync:function(){
var map={};
this.getAllNodes().forEach(function(node){
if(node.id){
var item=this.getItem(node.id);
if(item){
map[node.id]=item;
return;
}
}else{
node.id=dnd.getUniqueId();
}
var type=node.getAttribute("dndType"),data=node.getAttribute("dndData");
map[node.id]={data:data||node.innerHTML,type:type?type.split(/\s*,\s*/):["text"]};
},this);
this.map=map;
return this;
},insertNodes:function(data,_35f,_360){
if(!this.parent.firstChild){
_360=null;
}else{
if(_35f){
if(!_360){
_360=this.parent.firstChild;
}
}else{
if(_360){
_360=_360.nextSibling;
}
}
}
var i,t;
if(_360){
for(i=0;i<data.length;++i){
t=this._normalizedCreator(data[i]);
this.setItem(t.node.id,{data:t.data,type:t.type});
_360.parentNode.insertBefore(t.node,_360);
}
}else{
for(i=0;i<data.length;++i){
t=this._normalizedCreator(data[i]);
this.setItem(t.node.id,{data:t.data,type:t.type});
this.parent.appendChild(t.node);
}
}
return this;
},destroy:function(){
_355.forEach(this.events,function(_361){
_361.remove();
});
this.clearItems();
this.node=this.parent=this.current=null;
},markupFactory:function(_362,node,Ctor){
_362._skipStartup=true;
return new Ctor(node,_362);
},startup:function(){
if(!this.parent){
this.parent=this.node;
if(this.parent.tagName.toLowerCase()=="table"){
var c=this.parent.getElementsByTagName("tbody");
if(c&&c.length){
this.parent=c[0];
}
}
}
this.defaultCreator=dnd._defaultCreator(this.parent);
this.sync();
},onMouseOver:function(e){
var n=e.relatedTarget;
while(n){
if(n==this.node){
break;
}
try{
n=n.parentNode;
}
catch(x){
n=null;
}
}
if(!n){
this._changeState("Container","Over");
this.onOverEvent();
}
n=this._getChildByEvent(e);
if(this.current==n){
return;
}
if(this.current){
this._removeItemClass(this.current,"Over");
}
if(n){
this._addItemClass(n,"Over");
}
this.current=n;
},onMouseOut:function(e){
for(var n=e.relatedTarget;n;){
if(n==this.node){
return;
}
try{
n=n.parentNode;
}
catch(x){
n=null;
}
}
if(this.current){
this._removeItemClass(this.current,"Over");
this.current=null;
}
this._changeState("Container","");
this.onOutEvent();
},onSelectStart:function(e){
if(!this.skipForm||!dnd.isFormElement(e)){
e.stopPropagation();
e.preventDefault();
}
},onOverEvent:function(){
},onOutEvent:function(){
},_changeState:function(type,_363){
var _364="dojoDnd"+type;
var _365=type.toLowerCase()+"State";
_358.replace(this.node,_364+_363,_364+this[_365]);
this[_365]=_363;
},_addItemClass:function(node,type){
_358.add(node,"dojoDndItem"+type);
},_removeItemClass:function(node,type){
_358.remove(node,"dojoDndItem"+type);
},_getChildByEvent:function(e){
var node=e.target;
if(node){
for(var _366=node.parentNode;_366;node=_366,_366=node.parentNode){
if((_366==this.parent||this.allowNested)&&_358.contains(node,"dojoDndItem")){
return node;
}
}
}
return null;
},_normalizedCreator:function(item,hint){
var t=(this.creator||this.defaultCreator).call(this,item,hint);
if(!lang.isArray(t.type)){
t.type=["text"];
}
if(!t.node.id){
t.node.id=dnd.getUniqueId();
}
_358.add(t.node,"dojoDndItem");
return t;
}});
dnd._createNode=function(tag){
if(!tag){
return dnd._createSpan;
}
return function(text){
return _359.create(tag,{innerHTML:text});
};
};
dnd._createTrTd=function(text){
var tr=_359.create("tr");
_359.create("td",{innerHTML:text},tr);
return tr;
};
dnd._createSpan=function(text){
return _359.create("span",{innerHTML:text});
};
dnd._defaultCreatorNodes={ul:"li",ol:"li",div:"div",p:"div"};
dnd._defaultCreator=function(node){
var tag=node.tagName.toLowerCase();
var c=tag=="tbody"||tag=="thead"?dnd._createTrTd:dnd._createNode(dnd._defaultCreatorNodes[tag]);
return function(item,hint){
var _367=item&&lang.isObject(item),data,type,n;
if(_367&&item.tagName&&item.nodeType&&item.getAttribute){
data=item.getAttribute("dndData")||item.innerHTML;
type=item.getAttribute("dndType");
type=type?type.split(/\s*,\s*/):["text"];
n=item;
}else{
data=(_367&&item.data)?item.data:item;
type=(_367&&item.type)?item.type:["text"];
n=(hint=="avatar"?dnd._createSpan:c)(String(data));
}
if(!n.id){
n.id=dnd.getUniqueId();
}
return {node:n,data:data,type:type};
};
};
return _35d;
});
},"manager/FormPopup":function(){
define("manager/FormPopup",["dojo/_base/declare"],function(_368){
return _368("Manager.FormPopup",[],{context:null,url:"",constructor:function(){
this.obj=this;
},setContext:function(_369){
this.context=_369;
},start:function(){
this.url=this.context.action+"?__popupName="+this.context.name;
if(this.context.filter!=""){
var _36a=this.context.filter.split(",");
for(var i=0;i<_36a.length;i++){
var id=_36a[i];
if(field=dijit.byId(id)){
var _36b=field.get("value");
}else{
field=manager.getElementById(id);
var _36b=escape(field.value);
}
var _36c="filter"+i;
this.url=this.url+"&"+_36c+"="+_36b;
}
}
dojo.subscribe("windowActionClose",this,this.close);
this.open();
},open:function(){
var _36d=manager.getWindow(this.context.name);
if(!_36d){
manager.addWindow(this.context.name);
}
manager.getWindow(this.context.name).setHref(this.url);
manager.getWindow(this.context.name).open();
},close:function(id){
if(id==this.context.name){
var form=dojo.query("#"+id+" form");
var _36e=dijit.byId(form[0].id).getValues();
this.deliver(form[0].id);
}
},deliver:function(_36f){
related=this.obj.context.related;
var _370=/(.*):([^:]*)/;
var _371=related.split(",");
for(var i=0;i<_371.length;i++){
_371[i]=_371[i].replace(/::/g,"!");
var aId=_370.exec(_371[i])||Array(_371[i],_371[i]);
var _372=(aId[2]?aId[2]:aId[1]);
_372=_372.replace(/\!/g,"::");
var node=manager.getElementById(_372);
var _373=node.value;
aId[1]=aId[1].replace("!","::");
var _374=dijit.byId(aId[1]);
if(_374){
_374.set("value",_373);
}else{
_374=manager.getElementById(aId[1]);
if(_374!=null){
_374.value=_373;
_374=manager.getElementById(_374.name+"_sel");
if(_374!=null){
_374.value=_373;
}
}
}
}
}});
});
},"dojox/grid/_ViewManager":function(){
define(["dojo/_base/declare","dojo/_base/sniff","dojo/dom-class"],function(_375,has,_376){
return _375("dojox.grid._ViewManager",null,{constructor:function(_377){
this.grid=_377;
},defaultWidth:200,views:[],resize:function(){
this.onEach("resize");
},render:function(){
this.onEach("render");
},addView:function(_378){
_378.idx=this.views.length;
this.views.push(_378);
},destroyViews:function(){
for(var i=0,v;v=this.views[i];i++){
v.destroy();
}
this.views=[];
},getContentNodes:function(){
var _379=[];
for(var i=0,v;v=this.views[i];i++){
_379.push(v.contentNode);
}
return _379;
},forEach:function(_37a){
for(var i=0,v;v=this.views[i];i++){
_37a(v,i);
}
},onEach:function(_37b,_37c){
_37c=_37c||[];
for(var i=0,v;v=this.views[i];i++){
if(_37b in v){
v[_37b].apply(v,_37c);
}
}
},normalizeHeaderNodeHeight:function(){
var _37d=[];
for(var i=0,v;(v=this.views[i]);i++){
if(v.headerContentNode.firstChild){
_37d.push(v.headerContentNode);
}
}
this.normalizeRowNodeHeights(_37d);
},normalizeRowNodeHeights:function(_37e){
var h=0;
var _37f=[];
if(this.grid.rowHeight){
h=this.grid.rowHeight;
}else{
if(_37e.length<=1){
return;
}
for(var i=0,n;(n=_37e[i]);i++){
if(!_376.contains(n,"dojoxGridNonNormalizedCell")){
_37f[i]=n.firstChild.offsetHeight;
h=Math.max(h,_37f[i]);
}
}
h=(h>=0?h:0);
if((has("mozilla")||has("ie")>8)&&h){
h++;
}
}
for(i=0;(n=_37e[i]);i++){
if(_37f[i]!=h){
n.firstChild.style.height=h+"px";
}
}
},resetHeaderNodeHeight:function(){
for(var i=0,v,n;(v=this.views[i]);i++){
n=v.headerContentNode.firstChild;
if(n){
n.style.height="";
}
}
},renormalizeRow:function(_380){
var _381=[];
for(var i=0,v,n;(v=this.views[i])&&(n=v.getRowNode(_380));i++){
n.firstChild.style.height="";
_381.push(n);
}
this.normalizeRowNodeHeights(_381);
},getViewWidth:function(_382){
return this.views[_382].getWidth()||this.defaultWidth;
},measureHeader:function(){
this.resetHeaderNodeHeight();
this.forEach(function(_383){
_383.headerContentNode.style.height="";
});
var h=0;
this.forEach(function(_384){
h=Math.max(_384.headerNode.offsetHeight,h);
});
return h;
},measureContent:function(){
var h=0;
this.forEach(function(_385){
h=Math.max(_385.domNode.offsetHeight,h);
});
return h;
},findClient:function(_386){
var c=this.grid.elasticView||-1;
if(c<0){
for(var i=1,v;(v=this.views[i]);i++){
if(v.viewWidth){
for(i=1;(v=this.views[i]);i++){
if(!v.viewWidth){
c=i;
break;
}
}
break;
}
}
}
if(c<0){
c=Math.floor(this.views.length/2);
}
return c;
},arrange:function(l,w){
var i,v,vw,len=this.views.length,self=this;
var c=(w<=0?len:this.findClient());
var _387=function(v,l){
var ds=v.domNode.style;
var hs=v.headerNode.style;
if(!self.grid.isLeftToRight()){
ds.right=l+"px";
if(has("ff")<4){
hs.right=l+v.getScrollbarWidth()+"px";
}else{
hs.right=l+"px";
}
if(!has("webkit")&&hs.width!="auto"){
hs.width=parseInt(hs.width,10)-v.getScrollbarWidth()+"px";
}
}else{
ds.left=l+"px";
hs.left=l+"px";
}
ds.top=0+"px";
hs.top=0;
};
for(i=0;(v=this.views[i])&&(i<c);i++){
vw=this.getViewWidth(i);
v.setSize(vw,0);
_387(v,l);
if(v.headerContentNode&&v.headerContentNode.firstChild){
vw=v.getColumnsWidth()+v.getScrollbarWidth();
}else{
vw=v.domNode.offsetWidth;
}
l+=vw;
}
i++;
var r=w;
for(var j=len-1;(v=this.views[j])&&(i<=j);j--){
vw=this.getViewWidth(j);
v.setSize(vw,0);
vw=v.domNode.offsetWidth;
r-=vw;
_387(v,r);
}
if(c<len){
v=this.views[c];
vw=Math.max(1,r-l);
v.setSize(vw+"px",0);
_387(v,l);
}
return l;
},renderRow:function(_388,_389,_38a){
var _38b=[];
for(var i=0,v,n,_38c;(v=this.views[i])&&(n=_389[i]);i++){
_38c=v.renderRow(_388);
n.appendChild(_38c);
_38b.push(_38c);
}
if(!_38a){
this.normalizeRowNodeHeights(_38b);
}
},rowRemoved:function(_38d){
this.onEach("rowRemoved",[_38d]);
},updateRow:function(_38e,_38f){
for(var i=0,v;v=this.views[i];i++){
v.updateRow(_38e);
}
if(!_38f){
this.renormalizeRow(_38e);
}
},updateRowStyles:function(_390){
this.onEach("updateRowStyles",[_390]);
},setScrollTop:function(_391){
var top=_391;
for(var i=0,v;v=this.views[i];i++){
top=v.setScrollTop(_391);
if(has("ie")&&v.headerNode&&v.scrollboxNode){
v.headerNode.scrollLeft=v.scrollboxNode.scrollLeft;
}
}
return top;
},getFirstScrollingView:function(){
for(var i=0,v;(v=this.views[i]);i++){
if(v.hasHScrollbar()||v.hasVScrollbar()){
return v;
}
}
return null;
}});
});
},"manager/TransferBox":function(){
define("manager/TransferBox",["dojo/_base/declare","dijit/_Widget","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin","dgrid/OnDemandList","dgrid/Selection","dgrid/Keyboard","dojo/dom-construct","dojo/text!./templates/TransferBox.html","dijit/form/Button"],function(_392,_393,_394,_395,List,_396,_397,_398,_399){
var _39a=_392([List,_396,_397]);
function _39b(list,_39c){
var _39d=0;
list.on("dgrid-select",function(e){
_39d+=e.rows.length;
_39c.set("disabled",!_39d);
});
list.on("dgrid-deselect",function(e){
_39d-=e.rows.length;
_39c.set("disabled",!_39d);
});
};
return _392("Manager.TransferBox",[_393,_394,_395],{templateString:_399,baseClass:"TransferBox",sortProperty:"id",selectionMode:"extended",postCreate:function(){
this.inherited(arguments);
this.addButton.set("disabled",true);
this.removeButton.set("disabled",true);
var from=this.from=new _39a({store:this.store,selectionMode:this.selectionMode,query:function(item){
return !item.__selected;
},sort:this.sortProperty,renderRow:this.renderItem},this.fromNode);
_39b(from,this.addButton);
var to=this.to=new _39a({store:this.store,selectionMode:this.selectionMode,query:function(item){
return item.__selected;
},sort:this.sortProperty,renderRow:this.renderItem},this.toNode);
_39b(to,this.removeButton);
},_setValueAttr:function(_39e){
var _39f=!this.from||!this.from._started;
for(var i=0;i<_39e.length;i++){
var item=this.store.get(_39e[i]);
if(!item){
continue;
}
item.__selected=true;
_39f&&this.store.put(item);
this.input(item.id,"add");
}
},_getValueAttr:function(){
var _3a0=this.store;
return _3a0.query(function(item){
return item.__selected;
}).map(function(item){
return _3a0.getIdentity(item);
});
},add:function(){
for(var id in this.from.selection){
var row=this.from.row(id);
row.data.__selected=true;
this.store.put(row.data);
this.input(id,"add");
}
},remove:function(){
for(var id in this.to.selection){
var row=this.to.row(id);
row.data.__selected=false;
this.store.put(row.data);
this.input(id,"del");
}
},input:function(id,op){
var _3a1=this.idHidden+"["+id+"]";
if(op=="add"){
var _3a2=_398.create("input",{type:"hidden",id:_3a1,name:_3a1,value:id},manager.getParentForm(this.id));
}else{
if(op=="del"){
_398.destroy(_3a1);
}
}
},renderItem:function(item){
return _398.create("div",{innerHTML:item.name});
}});
});
},"dojo/store/Observable":function(){
define(["../_base/kernel","../_base/lang","../when","../_base/array"],function(_3a3,lang,when,_3a4){
var _3a5=function(_3a6){
var _3a7,_3a8=[],_3a9=0;
_3a6=lang.delegate(_3a6);
_3a6.notify=function(_3aa,_3ab){
_3a9++;
var _3ac=_3a8.slice();
for(var i=0,l=_3ac.length;i<l;i++){
_3ac[i](_3aa,_3ab);
}
};
var _3ad=_3a6.query;
_3a6.query=function(_3ae,_3af){
_3af=_3af||{};
var _3b0=_3ad.apply(this,arguments);
if(_3b0&&_3b0.forEach){
var _3b1=lang.mixin({},_3af);
delete _3b1.start;
delete _3b1.count;
var _3b2=_3a6.queryEngine&&_3a6.queryEngine(_3ae,_3b1);
var _3b3=_3a9;
var _3b4=[],_3b5;
_3b0.observe=function(_3b6,_3b7){
if(_3b4.push(_3b6)==1){
_3a8.push(_3b5=function(_3b8,_3b9){
when(_3b0,function(_3ba){
var _3bb=_3ba.length!=_3af.count;
var i,l,_3b6;
if(++_3b3!=_3a9){
throw new Error("Query is out of date, you must observe() the query prior to any data modifications");
}
var _3bc,_3bd=-1,_3be=-1;
if(_3b9!==_3a7){
for(i=0,l=_3ba.length;i<l;i++){
var _3bf=_3ba[i];
if(_3a6.getIdentity(_3bf)==_3b9){
_3bc=_3bf;
_3bd=i;
if(_3b2||!_3b8){
_3ba.splice(i,1);
}
break;
}
}
}
if(_3b2){
if(_3b8&&(_3b2.matches?_3b2.matches(_3b8):_3b2([_3b8]).length)){
var _3c0=_3bd>-1?_3bd:_3ba.length;
_3ba.splice(_3c0,0,_3b8);
_3be=_3a4.indexOf(_3b2(_3ba),_3b8);
_3ba.splice(_3c0,1);
if((_3af.start&&_3be==0)||(!_3bb&&_3be==_3ba.length)){
_3be=-1;
}else{
_3ba.splice(_3be,0,_3b8);
}
}
}else{
if(_3b8){
if(_3b9!==_3a7){
_3be=_3bd;
}else{
if(!_3af.start){
_3be=_3a6.defaultIndex||0;
_3ba.splice(_3be,0,_3b8);
}
}
}
}
if((_3bd>-1||_3be>-1)&&(_3b7||!_3b2||(_3bd!=_3be))){
var _3c1=_3b4.slice();
for(i=0;_3b6=_3c1[i];i++){
_3b6(_3b8||_3bc,_3bd,_3be);
}
}
});
});
}
var _3c2={};
_3c2.remove=_3c2.cancel=function(){
var _3c3=_3a4.indexOf(_3b4,_3b6);
if(_3c3>-1){
_3b4.splice(_3c3,1);
if(!_3b4.length){
_3a8.splice(_3a4.indexOf(_3a8,_3b5),1);
}
}
};
return _3c2;
};
}
return _3b0;
};
var _3c4;
function _3c5(_3c6,_3c7){
var _3c8=_3a6[_3c6];
if(_3c8){
_3a6[_3c6]=function(_3c9){
if(_3c4){
return _3c8.apply(this,arguments);
}
_3c4=true;
try{
var _3ca=_3c8.apply(this,arguments);
when(_3ca,function(_3cb){
_3c7((typeof _3cb=="object"&&_3cb)||_3c9);
});
return _3ca;
}
finally{
_3c4=false;
}
};
}
};
_3c5("put",function(_3cc){
_3a6.notify(_3cc,_3a6.getIdentity(_3cc));
});
_3c5("add",function(_3cd){
_3a6.notify(_3cd);
});
_3c5("remove",function(id){
_3a6.notify(undefined,id);
});
return _3a6;
};
lang.setObject("dojo.store.Observable",_3a5);
return _3a5;
});
},"dojox/grid/cells":function(){
define(["../main","./cells/_base"],function(_3ce){
return _3ce.grid.cells;
});
},"dojo/cldr/nls/pt/gregorian":function(){
define({"days-standAlone-short":["dom","seg","ter","qua","qui","sex","sáb"],"months-format-narrow":["J","F","M","A","M","J","J","A","S","O","N","D"],"quarters-standAlone-narrow":["1","2","3","4"],"field-weekday":"Dia da semana","dateFormatItem-yQQQ":"y QQQ","dateFormatItem-yMEd":"E, dd/MM/y","dateFormatItem-GyMMMEd":"E, d 'de' MMM 'de' y G","dateFormatItem-MMMEd":"E, d 'de' MMM","eraNarrow":["a.C.","d.C."],"dateFormatItem-yMM":"MM/y","dayPeriods-format-wide-morning":"manhã","days-format-short":["dom","seg","ter","qua","qui","sex","sáb"],"dateFormat-long":"d 'de' MMMM 'de' y","months-format-wide":["janeiro","fevereiro","março","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro"],"dateTimeFormat-medium":"{1} {0}","dayPeriods-format-wide-pm":"PM","dateFormat-full":"EEEE, d 'de' MMMM 'de' y","dateFormatItem-Md":"d/M","dayPeriods-format-abbr-am":"AM","dayPeriods-format-wide-noon":"meio-dia","dateFormatItem-yMd":"dd/MM/y","field-era":"Era","dateFormatItem-yM":"MM/y","months-standAlone-wide":["janeiro","fevereiro","março","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro"],"timeFormat-short":"HH:mm","quarters-format-wide":["1º trimestre","2º trimestre","3º trimestre","4º trimestre"],"dateFormatItem-yQQQQ":"y QQQQ","timeFormat-long":"HH:mm:ss z","field-year":"Ano","dateFormatItem-yMMM":"MMM 'de' y","field-hour":"Hora","dateFormatItem-MMdd":"dd/MM","months-format-abbr":["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"],"timeFormat-full":"HH:mm:ss zzzz","field-day-relative+0":"Hoje","field-day-relative+1":"Amanhã","dateFormatItem-GyMMMd":"d 'de' MMM 'de' y G","field-day-relative+2":"Depois de amanhã","dateFormatItem-H":"HH","months-standAlone-abbr":["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"],"quarters-format-abbr":["T1","T2","T3","T4"],"quarters-standAlone-wide":["1º trimestre","2º trimestre","3º trimestre","4º trimestre"],"dateFormatItem-Gy":"y G","dateFormatItem-HHmmss":"HH:mm:ss","dateFormatItem-M":"L","days-standAlone-wide":["domingo","segunda-feira","terça-feira","quarta-feira","quinta-feira","sexta-feira","sábado"],"timeFormat-medium":"HH:mm:ss","dateFormatItem-Hm":"HH:mm","quarters-standAlone-abbr":["T1","T2","T3","T4"],"eraAbbr":["a.C.","d.C."],"field-minute":"Minuto","field-dayperiod":"Período do dia","days-standAlone-abbr":["dom","seg","ter","qua","qui","sex","sáb"],"dayPeriods-format-wide-night":"noite","dateFormatItem-d":"d","dateFormatItem-ms":"mm:ss","quarters-format-narrow":["1","2","3","4"],"field-day-relative+-1":"Ontem","dateFormatItem-h":"h a","dateTimeFormat-long":"{1} {0}","dayPeriods-format-narrow-am":"a","field-day-relative+-2":"Anteontem","dateFormatItem-MMMd":"d 'de' MMM","dateFormatItem-MEd":"E, dd/MM","dateTimeFormat-full":"{1} {0}","field-day":"Dia","days-format-wide":["domingo","segunda-feira","terça-feira","quarta-feira","quinta-feira","sexta-feira","sábado"],"field-zone":"Fuso","dateFormatItem-y":"y","months-standAlone-narrow":["J","F","M","A","M","J","J","A","S","O","N","D"],"field-year-relative+-1":"Ano passado","field-month-relative+-1":"Mês passado","dateFormatItem-hm":"h:mm a","dayPeriods-format-abbr-pm":"PM","days-format-abbr":["dom","seg","ter","qua","qui","sex","sáb"],"eraNames":["Antes de Cristo","Ano do Senhor"],"dateFormatItem-yMMMd":"d 'de' MMM 'de' y","days-format-narrow":["D","S","T","Q","Q","S","S"],"days-standAlone-narrow":["D","S","T","Q","Q","S","S"],"dateFormatItem-MMM":"LLL","field-month":"Mês","dateFormatItem-HHmm":"HH:mm","dayPeriods-format-wide-am":"AM","dateFormat-short":"dd/MM/yy","dayPeriods-format-wide-afternoon":"tarde","field-second":"Segundo","dateFormatItem-yMMMEd":"E, d 'de' MMM 'de' y","field-month-relative+0":"Este mês","field-month-relative+1":"Próximo mês","dateFormatItem-Ed":"E, d","field-week":"Semana","dateFormat-medium":"dd/MM/y","field-year-relative+0":"Este ano","field-week-relative+-1":"Semana passada","field-year-relative+1":"Próximo ano","dayPeriods-format-narrow-pm":"p","dateTimeFormat-short":"{1} {0}","dateFormatItem-Hms":"HH:mm:ss","dateFormatItem-hms":"h:mm:ss a","dateFormatItem-GyMMM":"MMM 'de' y G","field-week-relative+0":"Esta semana","field-week-relative+1":"Próxima semana"});
},"dgrid/extensions/Pagination":function(){
define(["../_StoreMixin","dojo/_base/declare","dojo/_base/lang","dojo/_base/Deferred","dojo/on","dojo/query","dojo/string","dojo/has","put-selector/put","dojo/i18n!./nls/pagination","dojo/_base/sniff","xstyle/css!../css/extensions/Pagination.css"],function(_3cf,_3d0,lang,_3d1,on,_3d2,_3d3,has,put,i18n){
function _3d4(grid){
if(grid.noDataNode){
put(grid.noDataNode,"!");
delete grid.noDataNode;
}else{
grid.cleanup();
}
grid.contentNode.innerHTML="";
};
function _3d5(grid){
if(grid.loadingNode){
put(grid.loadingNode,"!");
delete grid.loadingNode;
}else{
if(grid._oldPageNodes){
for(var id in grid._oldPageNodes){
grid.removeRow(grid._oldPageNodes[id]);
}
delete grid._oldPageNodes;
if(grid._oldPageObserver){
grid._oldPageObserver.cancel();
delete grid._oldPageObserver;
}
}
}
delete grid._isLoading;
};
return _3d0(_3cf,{rowsPerPage:10,pagingTextBox:false,previousNextArrows:true,firstLastArrows:false,pagingLinks:2,pageSizeOptions:[],showLoadingMessage:true,i18nPagination:i18n,showFooter:true,_currentPage:1,_total:0,buildRendering:function(){
this.inherited(arguments);
var grid=this,_3d6=this.paginationNode=put(this.footerNode,"div.dgrid-pagination"),_3d7=this.paginationStatusNode=put(_3d6,"div.dgrid-status"),_3d8=this.pageSizeOptions,i18n=this.i18nPagination,_3d9,node;
_3d7.tabIndex=0;
if(_3d8.length){
var _3da=put(_3d6,"select.dgrid-page-size"),i;
for(i=0;i<_3d8.length;i++){
put(_3da,"option",_3d8[i],{value:_3d8[i],selected:this.rowsPerPage===_3d8[i]});
}
this._listeners.push(on(_3da,"change",function(){
grid.rowsPerPage=+_3da.value;
grid.gotoPage(1);
}));
}
_3d7.innerHTML=_3d3.substitute(i18n.status,{start:1,end:1,total:0});
_3d9=this.paginationNavigationNode=put(_3d6,"div.dgrid-navigation");
if(this.firstLastArrows){
node=this.paginationFirstNode=put(_3d9,"span.dgrid-first.dgrid-page-link","«");
node.setAttribute("aria-label",i18n.gotoFirst);
node.tabIndex=0;
}
if(this.previousNextArrows){
node=this.paginationPreviousNode=put(_3d9,"span.dgrid-previous.dgrid-page-link","‹");
node.setAttribute("aria-label",i18n.gotoPrev);
node.tabIndex=0;
}
this.paginationLinksNode=put(_3d9,"span.dgrid-pagination-links");
if(this.previousNextArrows){
node=this.paginationNextNode=put(_3d9,"span.dgrid-next.dgrid-page-link","›");
node.setAttribute("aria-label",i18n.gotoNext);
node.tabIndex=0;
}
if(this.firstLastArrows){
node=this.paginationLastNode=put(_3d9,"span.dgrid-last.dgrid-page-link","»");
node.setAttribute("aria-label",i18n.gotoLast);
node.tabIndex=0;
}
this._listeners.push(on(_3d9,".dgrid-page-link:click,.dgrid-page-link:keydown",function(_3db){
if(_3db.type==="keydown"&&_3db.keyCode!==13){
return;
}
var cls=this.className,curr,max;
if(grid._isLoading||cls.indexOf("dgrid-page-disabled")>-1){
return;
}
curr=grid._currentPage;
max=Math.ceil(grid._total/grid.rowsPerPage);
if(this===grid.paginationPreviousNode){
grid.gotoPage(curr-1);
}else{
if(this===grid.paginationNextNode){
grid.gotoPage(curr+1);
}else{
if(this===grid.paginationFirstNode){
grid.gotoPage(1);
}else{
if(this===grid.paginationLastNode){
grid.gotoPage(max);
}else{
if(cls==="dgrid-page-link"){
grid.gotoPage(+this.innerHTML,true);
}
}
}
}
}
}));
},destroy:function(){
this.inherited(arguments);
if(this._pagingTextBoxHandle){
this._pagingTextBoxHandle.remove();
}
},_updateNavigation:function(_3dc){
var grid=this,i18n=this.i18nPagination,_3dd=this.paginationLinksNode,_3de=this._currentPage,_3df=this.pagingLinks,_3e0=this.paginationNavigationNode,end=Math.ceil(this._total/this.rowsPerPage),_3e1=this._pagingTextBoxHandle;
function _3e2(page){
var link;
if(grid.pagingTextBox&&page==_3de&&end>1){
link=put(_3dd,"input.dgrid-page-input[type=text][value=$]",_3de);
link.setAttribute("aria-label",i18n.jumpPage);
grid._pagingTextBoxHandle=on(link,"change",function(){
var _3e3=+this.value;
if(!isNaN(_3e3)&&_3e3>0&&_3e3<=end){
grid.gotoPage(+this.value,true);
}
});
}else{
link=put(_3dd,"span"+(page==_3de?".dgrid-page-disabled":"")+".dgrid-page-link",page);
link.setAttribute("aria-label",i18n.gotoPage);
link.tabIndex=0;
}
if(page==_3de&&_3dc){
link.focus();
}
};
if(_3e1){
_3e1.remove();
}
_3dd.innerHTML="";
_3d2(".dgrid-first, .dgrid-previous",_3e0).forEach(function(link){
put(link,(_3de==1?".":"!")+"dgrid-page-disabled");
});
_3d2(".dgrid-last, .dgrid-next",_3e0).forEach(function(link){
put(link,(_3de>=end?".":"!")+"dgrid-page-disabled");
});
if(_3df&&end>0){
_3e2(1);
var _3e4=_3de-_3df;
if(_3e4>2){
put(_3dd,"span.dgrid-page-skip","...");
}else{
_3e4=2;
}
for(var i=_3e4;i<Math.min(_3de+_3df+1,end);i++){
_3e2(i);
}
if(_3de+_3df+1<end){
put(_3dd,"span.dgrid-page-skip","...");
}
if(end>1){
_3e2(end);
}
}else{
if(grid.pagingTextBox){
_3e2(_3de);
}
}
},refresh:function(){
var self=this;
this.inherited(arguments);
if(!this.store){
console.warn("Pagination requires a store to operate.");
return;
}
return this.gotoPage(1).then(function(_3e5){
setTimeout(function(){
on.emit(self.domNode,"dgrid-refresh-complete",{bubbles:true,cancelable:false,grid:self,results:_3e5});
},0);
return _3e5;
});
},_onNotification:function(rows){
if(rows.length!==this._rowsOnPage){
this.gotoPage(this._currentPage);
}
},renderArray:function(){
var rows=this.inherited(arguments);
this._lastCollection=null;
return rows;
},insertRow:function(){
var _3e6=this._oldPageNodes,row=this.inherited(arguments);
if(_3e6&&row===_3e6[row.id]){
delete _3e6[row.id];
}
return row;
},gotoPage:function(page,_3e7){
var grid=this,dfd=new _3d1();
var _3e8=this._trackError(function(){
var _3e9=grid.rowsPerPage,_3ea=(page-1)*_3e9,_3eb=lang.mixin(grid.get("queryOptions"),{start:_3ea,count:_3e9}),_3ec,_3ed=grid.contentNode,_3ee,_3ef,_3f0,i,len;
if(grid.showLoadingMessage){
_3d4(grid);
_3ee=grid.loadingNode=put(_3ed,"div.dgrid-loading");
_3ee.innerHTML=grid.loadingMessage;
}else{
grid._oldPageNodes=_3ef={};
_3f0=_3ed.children;
for(i=0,len=_3f0.length;i<len;i++){
_3ef[_3f0[i].id]=_3f0[i];
}
grid._oldPageObserver=grid.observers.pop();
}
grid._isLoading=true;
_3ec=grid.store.query(grid.query,_3eb);
_3d1.when(grid.renderArray(_3ec,null,_3eb),function(rows){
_3d5(grid);
grid.scrollTo({y:0});
_3d1.when(_3ec.total,function(_3f1){
if(!_3f1){
if(grid.noDataNode){
put(grid.noDataNode,"!");
delete grid.noDataNode;
}
grid.noDataNode=put(grid.contentNode,"div.dgrid-no-data");
grid.noDataNode.innerHTML=grid.noDataMessage;
}
grid.paginationStatusNode.innerHTML=_3d3.substitute(grid.i18nPagination.status,{start:Math.min(_3ea+1,_3f1),end:Math.min(_3f1,_3ea+_3e9),total:_3f1});
grid._total=_3f1;
grid._currentPage=page;
grid._rowsOnPage=rows.length;
grid._updateNavigation(_3e7);
});
if(has("ie")<7||(has("ie")&&has("quirks"))){
grid.resize();
}
dfd.resolve(_3ec);
},function(_3f2){
_3d5(grid);
dfd.reject(_3f2);
});
return dfd.promise;
});
if(!_3e8){
dfd.reject();
}
return dfd.promise;
}});
});
},"dojox/grid/util":function(){
define(["../main","dojo/_base/lang","dojo/dom"],function(_3f3,lang,dom){
var dgu=lang.getObject("grid.util",true,_3f3);
dgu.na="...";
dgu.rowIndexTag="gridRowIndex";
dgu.gridViewTag="gridView";
dgu.fire=function(ob,ev,args){
var fn=ob&&ev&&ob[ev];
return fn&&(args?fn.apply(ob,args):ob[ev]());
};
dgu.setStyleHeightPx=function(_3f4,_3f5){
if(_3f5>=0){
var s=_3f4.style;
var v=_3f5+"px";
if(_3f4&&s["height"]!=v){
s["height"]=v;
}
}
};
dgu.mouseEvents=["mouseover","mouseout","mousedown","mouseup","click","dblclick","contextmenu"];
dgu.keyEvents=["keyup","keydown","keypress"];
dgu.funnelEvents=function(_3f6,_3f7,_3f8,_3f9){
var evts=(_3f9?_3f9:dgu.mouseEvents.concat(dgu.keyEvents));
for(var i=0,l=evts.length;i<l;i++){
_3f7.connect(_3f6,"on"+evts[i],_3f8);
}
};
dgu.removeNode=function(_3fa){
_3fa=dom.byId(_3fa);
_3fa&&_3fa.parentNode&&_3fa.parentNode.removeChild(_3fa);
return _3fa;
};
dgu.arrayCompare=function(inA,inB){
for(var i=0,l=inA.length;i<l;i++){
if(inA[i]!=inB[i]){
return false;
}
}
return (inA.length==inB.length);
};
dgu.arrayInsert=function(_3fb,_3fc,_3fd){
if(_3fb.length<=_3fc){
_3fb[_3fc]=_3fd;
}else{
_3fb.splice(_3fc,0,_3fd);
}
};
dgu.arrayRemove=function(_3fe,_3ff){
_3fe.splice(_3ff,1);
};
dgu.arraySwap=function(_400,inI,inJ){
var _401=_400[inI];
_400[inI]=_400[inJ];
_400[inJ]=_401;
};
return dgu;
});
},"dojox/grid/DataGrid":function(){
define(["../main","dojo/_base/array","dojo/_base/lang","dojo/_base/json","dojo/_base/sniff","dojo/_base/declare","./_Grid","./DataSelection","dojo/_base/html","dojo/has","dojo/has!dojo-bidi?./bidi/_BidiMixin"],function(_402,_403,lang,json,has,_404,_405,_406,html){
var _407=_404("dojox.grid.DataGrid",_405,{store:null,query:null,queryOptions:null,fetchText:"...",sortFields:null,updateDelay:1,items:null,_store_connects:null,_by_idty:null,_by_idx:null,_cache:null,_pages:null,_pending_requests:null,_bop:-1,_eop:-1,_requests:0,rowCount:0,_isLoaded:false,_isLoading:false,keepSelection:false,postCreate:function(){
this._pages=[];
this._store_connects=[];
this._by_idty={};
this._by_idx=[];
this._cache=[];
this._pending_requests={};
this._setStore(this.store);
this.inherited(arguments);
},destroy:function(){
this.selection.destroy();
this.inherited(arguments);
},createSelection:function(){
this.selection=new _406(this);
},get:function(_408,_409){
if(_409&&this.field=="_item"&&!this.fields){
return _409;
}else{
if(_409&&this.fields){
var ret=[];
var s=this.grid.store;
_403.forEach(this.fields,function(f){
ret=ret.concat(s.getValues(_409,f));
});
return ret;
}else{
if(!_409&&typeof _408==="string"){
return this.inherited(arguments);
}
}
}
return (!_409?this.defaultValue:(!this.field?this.value:(this.field=="_item"?_409:this.grid.store.getValue(_409,this.field))));
},_checkUpdateStatus:function(){
if(this.updateDelay>0){
var _40a=false;
if(this._endUpdateDelay){
clearTimeout(this._endUpdateDelay);
delete this._endUpdateDelay;
_40a=true;
}
if(!this.updating){
this.beginUpdate();
_40a=true;
}
if(_40a){
var _40b=this;
this._endUpdateDelay=setTimeout(function(){
delete _40b._endUpdateDelay;
_40b.endUpdate();
},this.updateDelay);
}
}
},_onSet:function(item,_40c,_40d,_40e){
this._checkUpdateStatus();
var idx=this.getItemIndex(item);
if(idx>-1){
this.updateRow(idx);
}
},_createItem:function(item,_40f){
var idty=this._hasIdentity?this.store.getIdentity(item):json.toJson(this.query)+":idx:"+_40f+":sort:"+json.toJson(this.getSortProps());
var o=this._by_idty[idty]={idty:idty,item:item};
return o;
},_addItem:function(item,_410,_411){
this._by_idx[_410]=this._createItem(item,_410);
if(!_411){
this.updateRow(_410);
}
},_onNew:function(item,_412){
this._checkUpdateStatus();
var _413=this.get("rowCount");
this._addingItem=true;
this.updateRowCount(_413+1);
this._addingItem=false;
this._addItem(item,_413);
this.showMessage();
},_onDelete:function(item){
this._checkUpdateStatus();
var idx=this._getItemIndex(item,true);
if(idx>=0){
this._pages=[];
this._bop=-1;
this._eop=-1;
var o=this._by_idx[idx];
this._by_idx.splice(idx,1);
delete this._by_idty[o.idty];
this.updateRowCount(this.get("rowCount")-1);
if(this.get("rowCount")===0){
this.showMessage(this.noDataMessage);
}
}
if(this.selection.isSelected(idx)){
this.selection.deselect(idx);
this.selection.selected.splice(idx,1);
}
},_onRevert:function(){
this._refresh();
},setStore:function(_414,_415,_416){
if(this._requestsPending(0)){
return;
}
this._setQuery(_415,_416);
this._setStore(_414);
this._refresh(true);
},setQuery:function(_417,_418){
if(this._requestsPending(0)){
return;
}
this._setQuery(_417,_418);
this._refresh(true);
},setItems:function(_419){
this.items=_419;
this._setStore(this.store);
this._refresh(true);
},_setQuery:function(_41a,_41b){
this.query=_41a;
this.queryOptions=_41b||this.queryOptions;
},_setStore:function(_41c){
if(this.store&&this._store_connects){
_403.forEach(this._store_connects,this.disconnect,this);
}
this.store=_41c;
if(this.store){
var f=this.store.getFeatures();
var h=[];
this._canEdit=!!f["dojo.data.api.Write"]&&!!f["dojo.data.api.Identity"];
this._hasIdentity=!!f["dojo.data.api.Identity"];
if(!!f["dojo.data.api.Notification"]&&!this.items){
h.push(this.connect(this.store,"onSet","_onSet"));
h.push(this.connect(this.store,"onNew","_onNew"));
h.push(this.connect(this.store,"onDelete","_onDelete"));
}
if(this._canEdit){
h.push(this.connect(this.store,"revert","_onRevert"));
}
this._store_connects=h;
}
},_onFetchBegin:function(size,req){
if(!this.scroller){
return;
}
if(this.rowCount!=size){
if(req.isRender){
this.scroller.init(size,this.keepRows,this.rowsPerPage);
this.rowCount=size;
this._setAutoHeightAttr(this.autoHeight,true);
this._skipRowRenormalize=true;
this.prerender();
this._skipRowRenormalize=false;
}else{
this.updateRowCount(size);
}
}
if(!size){
this.views.render();
this._resize();
this.showMessage(this.noDataMessage);
this.focus.initFocusView();
}else{
this.showMessage();
}
},_onFetchComplete:function(_41d,req){
if(!this.scroller){
return;
}
if(_41d&&_41d.length>0){
_403.forEach(_41d,function(item,idx){
this._addItem(item,req.start+idx,true);
},this);
this.updateRows(req.start,_41d.length);
if(req.isRender){
this.setScrollTop(0);
this.postrender();
}else{
if(this._lastScrollTop){
this.setScrollTop(this._lastScrollTop);
}
}
if(has("ie")){
html.setSelectable(this.domNode,this.selectable);
}
}
delete this._lastScrollTop;
if(!this._isLoaded){
this._isLoading=false;
this._isLoaded=true;
}
this._pending_requests[req.start]=false;
},_onFetchError:function(err,req){
delete this._lastScrollTop;
if(!this._isLoaded){
this._isLoading=false;
this._isLoaded=true;
this.showMessage(this.errorMessage);
}
this._pending_requests[req.start]=false;
this.onFetchError(err,req);
},onFetchError:function(err,req){
},_fetch:function(_41e,_41f){
_41e=_41e||0;
if(this.store&&!this._pending_requests[_41e]){
if(!this._isLoaded&&!this._isLoading){
this._isLoading=true;
this.showMessage(this.loadingMessage);
}
this._pending_requests[_41e]=true;
try{
if(this.items){
var _420=this.items;
var _421=this.store;
this.rowsPerPage=_420.length;
var req={start:_41e,count:this.rowsPerPage,isRender:_41f};
this._onFetchBegin(_420.length,req);
var _422=0;
_403.forEach(_420,function(i){
if(!_421.isItemLoaded(i)){
_422++;
}
});
if(_422===0){
this._onFetchComplete(_420,req);
}else{
var _423=function(item){
_422--;
if(_422===0){
this._onFetchComplete(_420,req);
}
};
_403.forEach(_420,function(i){
if(!_421.isItemLoaded(i)){
_421.loadItem({item:i,onItem:_423,scope:this});
}
},this);
}
}else{
this.store.fetch({start:_41e,count:this.rowsPerPage,query:this.query,sort:this.getSortProps(),queryOptions:this.queryOptions,isRender:_41f,onBegin:lang.hitch(this,"_onFetchBegin"),onComplete:lang.hitch(this,"_onFetchComplete"),onError:lang.hitch(this,"_onFetchError")});
}
}
catch(e){
this._onFetchError(e,{start:_41e,count:this.rowsPerPage});
}
}
},_clearData:function(){
this.updateRowCount(0);
this._by_idty={};
this._by_idx=[];
this._pages=[];
this._bop=this._eop=-1;
this._isLoaded=false;
this._isLoading=false;
},getItem:function(idx){
var data=this._by_idx[idx];
if(!data||(data&&!data.item)){
this._preparePage(idx);
return null;
}
return data.item;
},getItemIndex:function(item){
return this._getItemIndex(item,false);
},_getItemIndex:function(item,_424){
if(!_424&&!this.store.isItem(item)){
return -1;
}
var idty=this._hasIdentity?this.store.getIdentity(item):null;
for(var i=0,l=this._by_idx.length;i<l;i++){
var d=this._by_idx[i];
if(d&&((idty&&d.idty==idty)||(d.item===item))){
return i;
}
}
return -1;
},filter:function(_425,_426){
this.query=_425;
if(_426){
this._clearData();
}
this._fetch();
},_getItemAttr:function(idx,attr){
var item=this.getItem(idx);
return (!item?this.fetchText:this.store.getValue(item,attr));
},_render:function(){
if(this.domNode.parentNode){
this.scroller.init(this.get("rowCount"),this.keepRows,this.rowsPerPage);
this.prerender();
this._fetch(0,true);
}
},_requestsPending:function(_427){
return this._pending_requests[_427];
},_rowToPage:function(_428){
return (this.rowsPerPage?Math.floor(_428/this.rowsPerPage):_428);
},_pageToRow:function(_429){
return (this.rowsPerPage?this.rowsPerPage*_429:_429);
},_preparePage:function(_42a){
if((_42a<this._bop||_42a>=this._eop)&&!this._addingItem){
var _42b=this._rowToPage(_42a);
this._needPage(_42b);
this._bop=_42b*this.rowsPerPage;
this._eop=this._bop+(this.rowsPerPage||this.get("rowCount"));
}
},_needPage:function(_42c){
if(!this._pages[_42c]){
this._pages[_42c]=true;
this._requestPage(_42c);
}
},_requestPage:function(_42d){
var row=this._pageToRow(_42d);
var _42e=Math.min(this.rowsPerPage,this.get("rowCount")-row);
if(_42e>0){
this._requests++;
if(!this._requestsPending(row)){
setTimeout(lang.hitch(this,"_fetch",row,false),1);
}
}
},getCellName:function(_42f){
return _42f.field;
},_refresh:function(_430){
this._clearData();
this._fetch(0,_430);
},sort:function(){
this.edit.apply();
this._lastScrollTop=this.scrollTop;
this._refresh();
},canSort:function(){
return (!this._isLoading);
},getSortProps:function(){
var c=this.getCell(this.getSortIndex());
if(!c){
if(this.sortFields){
return this.sortFields;
}
return null;
}else{
var desc=c["sortDesc"];
var si=!(this.sortInfo>0);
if(typeof desc=="undefined"){
desc=si;
}else{
desc=si?!desc:desc;
}
return [{attribute:c.field,descending:desc}];
}
},styleRowState:function(_431){
if(this.store&&this.store.getState){
var _432=this.store.getState(_431.index),c="";
for(var i=0,ss=["inflight","error","inserting"],s;s=ss[i];i++){
if(_432[s]){
c=" dojoxGridRow-"+s;
break;
}
}
_431.customClasses+=c;
}
},onStyleRow:function(_433){
this.styleRowState(_433);
this.inherited(arguments);
},canEdit:function(_434,_435){
return this._canEdit;
},_copyAttr:function(idx,attr){
var row={};
var _436={};
var src=this.getItem(idx);
return this.store.getValue(src,attr);
},doStartEdit:function(_437,_438){
if(!this._cache[_438]){
this._cache[_438]=this._copyAttr(_438,_437.field);
}
this.onStartEdit(_437,_438);
},doApplyCellEdit:function(_439,_43a,_43b){
this.store.fetchItemByIdentity({identity:this._by_idx[_43a].idty,onItem:lang.hitch(this,function(item){
var _43c=this.store.getValue(item,_43b);
if(typeof _43c=="number"){
_439=isNaN(_439)?_439:parseFloat(_439);
}else{
if(typeof _43c=="boolean"){
_439=_439=="true"?true:_439=="false"?false:_439;
}else{
if(_43c instanceof Date){
var _43d=new Date(_439);
_439=isNaN(_43d.getTime())?_439:_43d;
}
}
}
this.store.setValue(item,_43b,_439);
this.onApplyCellEdit(_439,_43a,_43b);
})});
},doCancelEdit:function(_43e){
var _43f=this._cache[_43e];
if(_43f){
this.updateRow(_43e);
delete this._cache[_43e];
}
this.onCancelEdit.apply(this,arguments);
},doApplyEdit:function(_440,_441){
var _442=this._cache[_440];
this.onApplyEdit(_440);
},removeSelectedRows:function(){
if(this._canEdit){
this.edit.apply();
var fx=lang.hitch(this,function(_443){
if(_443.length){
_403.forEach(_443,this.store.deleteItem,this.store);
this.selection.clear();
}
});
if(this.allItemsSelected){
this.store.fetch({query:this.query,queryOptions:this.queryOptions,onComplete:fx});
}else{
fx(this.selection.getSelected());
}
}
}});
_407.cell_markupFactory=function(_444,node,_445){
var _446=lang.trim(html.attr(node,"field")||"");
if(_446){
_445.field=_446;
}
_445.field=_445.field||_445.name;
var _447=lang.trim(html.attr(node,"fields")||"");
if(_447){
_445.fields=_447.split(",");
}
if(_444){
_444(node,_445);
}
};
_407.markupFactory=function(_448,node,ctor,_449){
return _405.markupFactory(_448,node,ctor,lang.partial(_407.cell_markupFactory,_449));
};
return _407;
});
},"manager/DGrid":function(){
define("manager/DGrid",["dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/_base/json","dojo/_base/Deferred","dojo/parser","dojo/aspect","dojo/dom-construct","dojo/dom-class","dojo/store/Memory","dojo/store/JsonRest","dijit/registry","dojo/store/util/QueryResults","dojo/store/Observable","dojo/store/Cache","dgrid/Grid","dgrid/OnDemandGrid","dgrid/extensions/Pagination"],function(_44a,lang,_44b,json,_44c,_44d,_44e,_44f,_450,_451,_452,_453,_454,_455,_456,Grid,_457,_458){
return _44a("Manager.DGrid",[],{constructor:function(name,_459,_45a){
this.name=name;
this.firstIndex=_459;
this.data=null;
this.columns=null;
this.widgets=[];
this.dgrid=null;
this.dgridType=_45a;
this.store=null;
this.arrayData=[];
this.arrayColumns=[];
this.actionData="";
},startup:function(){
_44b.forEach(this.data,lang.hitch(this,function(row,i){
var o={};
var id=i+this.firstIndex;
var arr=_44b.map(row,function(item,_45b){
o["id"]=id;
o["widgets"]=[];
o["field"+_45b]=item;
});
this.arrayData[i++]=o;
}));
this.store=_455(_456(_452({baseTarget:this.actionData,idProperty:"idPessoa",query:function(_45c,_45d){
var _45e,def,_45f;
this.target=this.baseTarget+"?start="+_45d.start+"&count="+_45d.count;
var r=_452.prototype.query.call(this,_45c,_45d);
return r;
}}),_451()));
this.store.getChildren=function(_460,_461){
return this.store.query({parent:_460.id},_461);
};
var arr=_44b.map(this.columns,lang.hitch(this,function(item,i){
var _462=_44f.toDom(item.label);
this.arrayColumns[i]={label:item.label,field:item.field,className:item.className,sortable:item.sortable,renderHeaderCell:function(node){
if(item.label.charAt(0)=="<"){
var _463=_44f.toDom(item.label);
_44f.place(_463,node);
_44d.parse(node);
}else{
node.appendChild(document.createTextNode(item.label));
}
},renderCell:function(_464,_465,node){
node.appendChild(document.createTextNode(_465));
}};
}));
if(this.dgridType=="demand"){
this.dgridOnDemand();
}else{
this.dgridPagination();
}
},dgridOnDemand:function(){
this.dgrid=new _457({},this.name);
this.dgrid.set("minRowsPerPage",16);
this.dgrid.set("store",this.store);
this.dgrid.set("columns",this.arrayColumns);
this.dgrid.startup();
},dgridPagination:function(){
var _466=_44a([Grid,_458]);
this.dgrid=new _466({pagingLinks:1,pagingTextBox:true,firstLastArrows:true,pageSizeOptions:[10,15,25]},this.name);
_44e.after(this.dgrid,"renderArray",function(_467){
for(var i=0;i<_467.length;i++){
_44d.parse(_467[i].id);
}
return _467;
});
_44e.before(this.dgrid,"renderRow",function(_468){
for(var i=0;i<_468.widgets.length;i++){
var _469=_453.byId(_468.widgets[i]);
if(_469){
_469.destroyRecursive();
}
}
},true);
this.dgrid.set("store",this.store);
this.dgrid.set("columns",this.arrayColumns);
this.dgrid.startup();
}});
});
},"manager/Form":function(){
define("manager/Form",["dojo/_base/declare"],function(_46a){
return _46a("Manager.Form",[],{id:null,onLoad:new Function(),onSubmit:new Function(),validators:null,connections:null,constructor:function(id){
this.id=id;
this.connections=[];
},setFocus:function(_46b){
if(_46b==""){
var _46c=null;
var f=manager.getElementById(this.id);
var _46d=f.getElementsByTagName("input");
if(_46d.length==0){
var _46d=f.getElementsByTagName("select");
if(_46d.length>0){
_46c=_46d[0];
}
}else{
_46c=_46d[0];
}
}else{
var _46c=manager.getElementById(_46b);
}
if(_46c!=null){
_46c.focus();
}
},getInputs:function(){
var _46e=new Object();
var f=manager.getElementById(this.id);
var _46f=f.getElementsByTagName("input");
for(var i=0,_470=_46f.length;i<_470;i++){
var _471=_46f[i];
if((_471.type=="text")||(_471.type=="hidden")){
if(_46e[_471.name]){
_46e[_471.name]+="&"+_471.value;
}else{
_46e[_471.name]=_471.value;
}
}
if(_471.type=="checkbox"){
if(_471.checked){
_46e[_471.name]=(_471.value==""?"on":_471.value);
}
}
if(_471.type=="radio"){
if(_471.checked){
_46e[_471.name]=_471.value;
}
}
}
var _46f=f.getElementsByTagName("select");
for(var i=0,_470=_46f.length;i<_470;i++){
var _471=_46f[i];
_46e[_471.name]=_471.options[_471.selectedIndex].value;
}
return _46e;
},getForm:function(){
return manager.getElementById("frm_"+this.id);
},setAction:function(url){
manager.getElementById("frm_"+this.id).action=url;
},getAction:function(){
return manager.getElementById("frm_"+this.id).action;
},init:function(){
this.validators=null;
},submit:function(){
return manager.getElementById("frm_"+this.id).submit();
},connect:function(_472,_473,_474){
var node=dojo.byId(_472);
if(!node){
return;
}
this.connections.push(dojo.connect(node,_473,_474));
},disconnect:function(){
dojo.forEach(this.connections,dojo.disconnect);
this.connections.length=0;
}});
});
},"manager/TextTable":function(){
define("manager/TextTable",["dojo/_base/declare"],function(_475){
return _475("Manager.TextTable",[],{constructor:function(id,_476,cols){
this.id=id;
this.table=manager.getElementById(id);
this.rowSelected="";
this.lastRow=manager.getElementsByTagName("TR",this.table).length;
this.onmouse=true;
this.zebra=true;
this.data=new Array();
this.textTable=this;
this.cols=cols;
this.iterate(this.init);
this.reorder();
},setRowClass:function(obj,_477,r){
obj.className=this.zebra?"row"+(r%2):"row0";
obj.baseClassName=this.oldClassName=obj.className;
},setRowId:function(obj,r){
var tbl=obj.parentNode.parentNode;
obj.id=tbl.id+"row"+r;
},init:function(obj,_478,r,c,data,tbl,_479){
if(_478){
obj.textTable=_479;
_479.setRowId(obj,r);
_479.setRowClass(obj,_478,r);
obj.onclick=function(){
var tbl=this.textTable;
tbl.select(this.id);
};
if(_479.onmouse){
obj.onmouseover=function(){
this.oldClassName=this.className;
this.className="hover";
};
obj.onmouseout=function(){
this.className=this.oldClassName;
};
}
}
},iterate:function(_47a,data){
var r,c;
if(!_47a){
return;
}
for(r=0;r<this.table.rows.length;++r){
if(false==_47a(this.table.rows[r],true,r,c,data,this.table,this)){
return;
}
for(c=0;c<this.table.rows[r].cells.length;++c){
if(false==_47a(this.table.rows[r].cells[c],false,r,c,data,this.table,this)){
return;
}
}
}
},add:function(_47b){
var _47c=manager.getElementsByTagName("TBODY",this.table).item(0);
var rows=manager.getElementsByTagName("TR",_47c);
if(_47b.length>0){
var r=document.createElement("TR");
_47c.insertBefore(r,_47c.firstChild);
for(var i=0;i<_47b.length;i++){
var c=document.createElement("TD");
r.appendChild(c);
var t=document.createTextNode(_47b[i]);
c.appendChild(t);
}
var _47d=this.lastRow++;
this.init(r,true,_47d,null,null,null,this);
}
},drop:function(_47e){
var _47f=manager.getElementsByTagName("TBODY",this.table).item(0);
var row=manager.getElementById(_47e);
if(row){
_47f.removeChild(row);
this.reorder();
this.lastRow--;
this.rowSelected="";
}
},modify:function(_480,_481){
var row=manager.getElementById(_480);
if(_481.length>0){
var cols=manager.getElementsByTagName("TD",row);
if(cols.length>0){
for(var i=0;i<cols.length;i++){
cols[i].innerHTML=_481[i];
}
}
}
},select:function(_482){
var row=manager.getElementById(_482);
if(_482==this.rowSelected){
row.className=row.baseClassName;
row.oldClassName=row.baseClassName;
this.rowSelected="";
}else{
row.oldClassName=row.className;
row.className="hover";
if(this.rowSelected!=""){
row=manager.getElementById(this.rowSelected);
row.className=row.baseClassName;
}
this.rowSelected=_482;
this.customSelect();
}
},get:function(_483){
var row=manager.getElementById(_483);
var cols=manager.getElementsByTagName("TD",row);
var text=new Array(cols.length);
if(cols.length>0){
for(var i=0;i<cols.length;i++){
text[i]=cols[i].firstChild?cols[i].innerHTML:"";
}
}
return text;
},setdata:function(){
var r,c;
for(r=0;r<this.table.rows.length;++r){
this.data[r]=new Array();
for(c=0;c<this.table.rows[r].cells.length;++c){
this.data[r][c]=this.table.rows[r].cells[c].innerHTML;
}
}
},getdata:function(){
this.setdata();
return this.data;
},customSelect:function(){
},reorder:function(){
var _484=this.table.rows.length;
var _485=_484;
for(row=0;row<_484;++row){
_485--;
this.setRowClass(this.table.rows[row],true,_485);
this.setRowId(this.table.rows[row],_485);
}
},unload:function(){
this.iterate(function(o){
o.onmouseover=o.onmouseout=null;
});
}});
});
},"manager/MultiTextField":function(){
define("manager/MultiTextField",["dojo/_base/declare"],function(_486){
return _486("Manager.MultiTextField",[],{mtfName:"",constructor:function(_487){
this.mtfName=_487;
this.leftSeparator="[";
this.rightSeparator="]";
this.separator=this.rightSeparator+" "+this.leftSeparator;
this.emptyField=this.leftSeparator+this.rightSeparator;
},getTable:function(){
return eval(this.mtfName+"_table");
},split:function(_488){
return _488.substring(1,_488.length-1).split(this.separator);
},join:function(_489){
var _48a=this.leftSeparator;
for(var i=0;i<_489.length;i++){
if(i>0){
_48a+=this.separator;
}
_48a+=_489[i];
}
_48a+=this.rightSeparator;
return _48a;
},onSubmit:function(_48b){
var name=this.mtfName;
var form=dojo.byId(manager.getParentForm(name));
while(manager.getElementById(name+"[]")){
dojo._destroyElement(name+"[]");
}
var tbl=this.getTable();
data=tbl.getdata();
var _48c="";
var _48d=_48b.split(",");
for(var i=0;i<data.length;i++){
for(var j=0;j<data[i].length;j++){
var list=document.createElement("INPUT");
list.id=name+"["+i+"]"+"["+j+"]";
list.name=name+"["+i+"]"+"["+j+"]";
list.type="hidden";
var _48e=dijit.byId(_48d[j]);
if(_48e.store){
_48e.store.query({name:data[i][j]}).forEach(function(_48f){
_48c=_48f.id;
});
}else{
_48c=data[i][j];
}
list.value=_48c;
form.appendChild(list);
}
}
return true;
},onSelect:function(_490){
var tbl=this.getTable();
tbl.onmouse=false;
tbl.customSelect=function(){
var _491=_490.split(",");
var _492=new Array(_491.length);
var text=this.get(tbl.rowSelected);
for(var i=0;i<text.length;i++){
var _493=dijit.byId(_491[i]);
if(_493.store){
_493.store.query({name:text[i]}).forEach(function(_494){
_493.setValue(_494.id);
});
}else{
if(_493.options!=null){
for(var n=0;n<_493.options.length;n++){
if(_493.options[n].text==text[i]){
_493.selectedIndex=n;
break;
}
}
}else{
if(text[i]!==""){
_493.textbox.value=text[i];
}
}
}
}
};
},getInput:function(_495){
var _496=_495.split(",");
var _497=new Array(_496.length);
for(var i=0;i<_496.length;i++){
var _498=manager.getElementById(_496[i]);
if(_498.options!=null){
_497[i]=_498.options[_498.selectedIndex].text;
}else{
_497[i]=_498.value;
}
}
return _497;
},add:function(_499){
var tbl=this.getTable();
tbl.add(this.getInput(_499));
},remove:function(_49a){
var tbl=this.getTable();
if(this.isSelected()){
tbl.drop(tbl.rowSelected);
}
},modify:function(_49b){
var tbl=this.getTable();
if(this.isSelected()){
tbl.modify(tbl.rowSelected,this.getInput(_49b));
}
},isSelected:function(){
var tbl=this.getTable();
if(tbl.rowSelected==""){
alert("Nenhum item selecionado!");
return false;
}else{
return true;
}
}});
});
},"dojox/grid/_FocusManager":function(){
define(["dojo/_base/array","dojo/_base/lang","dojo/_base/declare","dojo/_base/connect","dojo/_base/event","dojo/_base/sniff","dojo/query","./util","dojo/_base/html"],function(_49c,lang,_49d,_49e,_49f,has,_4a0,util,html){
return _49d("dojox.grid._FocusManager",null,{constructor:function(_4a1){
this.grid=_4a1;
this.cell=null;
this.rowIndex=-1;
this._connects=[];
this._headerConnects=[];
this.headerMenu=this.grid.headerMenu;
this._connects.push(_49e.connect(this.grid.domNode,"onfocus",this,"doFocus"));
this._connects.push(_49e.connect(this.grid.domNode,"onblur",this,"doBlur"));
this._connects.push(_49e.connect(this.grid.domNode,"mousedown",this,"_mouseDown"));
this._connects.push(_49e.connect(this.grid.domNode,"mouseup",this,"_mouseUp"));
this._connects.push(_49e.connect(this.grid.domNode,"oncontextmenu",this,"doContextMenu"));
this._connects.push(_49e.connect(this.grid.lastFocusNode,"onfocus",this,"doLastNodeFocus"));
this._connects.push(_49e.connect(this.grid.lastFocusNode,"onblur",this,"doLastNodeBlur"));
this._connects.push(_49e.connect(this.grid,"_onFetchComplete",this,"_delayedCellFocus"));
this._connects.push(_49e.connect(this.grid,"postrender",this,"_delayedHeaderFocus"));
},destroy:function(){
_49c.forEach(this._connects,_49e.disconnect);
_49c.forEach(this._headerConnects,_49e.disconnect);
delete this.grid;
delete this.cell;
},_colHeadNode:null,_colHeadFocusIdx:null,_contextMenuBindNode:null,tabbingOut:false,focusClass:"dojoxGridCellFocus",focusView:null,initFocusView:function(){
this.focusView=this.grid.views.getFirstScrollingView()||this.focusView||this.grid.views.views[0];
this._initColumnHeaders();
},isFocusCell:function(_4a2,_4a3){
return (this.cell==_4a2)&&(this.rowIndex==_4a3);
},isLastFocusCell:function(){
if(this.cell){
return (this.rowIndex==this.grid.rowCount-1)&&(this.cell.index==this.grid.layout.cellCount-1);
}
return false;
},isFirstFocusCell:function(){
if(this.cell){
return (this.rowIndex===0)&&(this.cell.index===0);
}
return false;
},isNoFocusCell:function(){
return (this.rowIndex<0)||!this.cell;
},isNavHeader:function(){
return (!!this._colHeadNode);
},getHeaderIndex:function(){
if(this._colHeadNode){
return _49c.indexOf(this._findHeaderCells(),this._colHeadNode);
}else{
return -1;
}
},_focusifyCellNode:function(_4a4){
var n=this.cell&&this.cell.getNode(this.rowIndex);
if(n){
html.toggleClass(n,this.focusClass,_4a4);
if(_4a4){
var sl=this.scrollIntoView();
try{
if(has("webkit")||!this.grid.edit.isEditing()){
util.fire(n,"focus");
if(sl){
this.cell.view.scrollboxNode.scrollLeft=sl;
}
}
}
catch(e){
}
}
}
},_delayedCellFocus:function(){
if(this.isNavHeader()||!this.grid.focused){
return;
}
var n=this.cell&&this.cell.getNode(this.rowIndex);
if(n){
try{
if(!this.grid.edit.isEditing()){
html.toggleClass(n,this.focusClass,true);
if(this._colHeadNode){
this.blurHeader();
}
util.fire(n,"focus");
}
}
catch(e){
}
}
},_delayedHeaderFocus:function(){
if(this.isNavHeader()){
this.focusHeader();
}
},_initColumnHeaders:function(){
_49c.forEach(this._headerConnects,_49e.disconnect);
this._headerConnects=[];
var _4a5=this._findHeaderCells();
for(var i=0;i<_4a5.length;i++){
this._headerConnects.push(_49e.connect(_4a5[i],"onfocus",this,"doColHeaderFocus"));
this._headerConnects.push(_49e.connect(_4a5[i],"onblur",this,"doColHeaderBlur"));
}
},_findHeaderCells:function(){
var _4a6=_4a0("th",this.grid.viewsHeaderNode);
var _4a7=[];
for(var i=0;i<_4a6.length;i++){
var _4a8=_4a6[i];
var _4a9=html.hasAttr(_4a8,"tabIndex");
var _4aa=html.attr(_4a8,"tabIndex");
if(_4a9&&_4aa<0){
_4a7.push(_4a8);
}
}
return _4a7;
},_setActiveColHeader:function(_4ab,_4ac,_4ad){
this.grid.domNode.setAttribute("aria-activedescendant",_4ab.id);
if(_4ad!=null&&_4ad>=0&&_4ad!=_4ac){
html.toggleClass(this._findHeaderCells()[_4ad],this.focusClass,false);
}
html.toggleClass(_4ab,this.focusClass,true);
this._colHeadNode=_4ab;
this._colHeadFocusIdx=_4ac;
this._scrollHeader(this._colHeadFocusIdx);
},scrollIntoView:function(){
var info=(this.cell?this._scrollInfo(this.cell):null);
if(!info||!info.s){
return null;
}
var rt=this.grid.scroller.findScrollTop(this.rowIndex);
if(info.n&&info.sr){
if(info.n.offsetLeft+info.n.offsetWidth>info.sr.l+info.sr.w){
info.s.scrollLeft=info.n.offsetLeft+info.n.offsetWidth-info.sr.w;
}else{
if(info.n.offsetLeft<info.sr.l){
info.s.scrollLeft=info.n.offsetLeft;
}
}
}
if(info.r&&info.sr){
if(rt+info.r.offsetHeight>info.sr.t+info.sr.h){
this.grid.setScrollTop(rt+info.r.offsetHeight-info.sr.h);
}else{
if(rt<info.sr.t){
this.grid.setScrollTop(rt);
}
}
}
return info.s.scrollLeft;
},_scrollInfo:function(cell,_4ae){
if(cell){
var cl=cell,sbn=cl.view.scrollboxNode,sbnr={w:sbn.clientWidth,l:sbn.scrollLeft,t:sbn.scrollTop,h:sbn.clientHeight},rn=cl.view.getRowNode(this.rowIndex);
return {c:cl,s:sbn,sr:sbnr,n:(_4ae?_4ae:cell.getNode(this.rowIndex)),r:rn};
}
return null;
},_scrollHeader:function(_4af){
var info=null;
if(this._colHeadNode){
var cell=this.grid.getCell(_4af);
if(!cell){
return;
}
info=this._scrollInfo(cell,cell.getNode(0));
}
if(info&&info.s&&info.sr&&info.n){
var _4b0=info.sr.l+info.sr.w;
if(info.n.offsetLeft+info.n.offsetWidth>_4b0){
info.s.scrollLeft=info.n.offsetLeft+info.n.offsetWidth-info.sr.w;
}else{
if(info.n.offsetLeft<info.sr.l){
info.s.scrollLeft=info.n.offsetLeft;
}else{
if(has("ie")<=7&&cell&&cell.view.headerNode){
cell.view.headerNode.scrollLeft=info.s.scrollLeft;
}
}
}
}
},_isHeaderHidden:function(){
var _4b1=this.focusView;
if(!_4b1){
for(var i=0,_4b2;(_4b2=this.grid.views.views[i]);i++){
if(_4b2.headerNode){
_4b1=_4b2;
break;
}
}
}
return (_4b1&&html.getComputedStyle(_4b1.headerNode).display=="none");
},colSizeAdjust:function(e,_4b3,_4b4){
var _4b5=this._findHeaderCells();
var view=this.focusView;
if(!view||!view.header.tableMap.map){
for(var i=0,_4b6;(_4b6=this.grid.views.views[i]);i++){
if(_4b6.header.tableMap.map){
view=_4b6;
break;
}
}
}
var _4b7=_4b5[_4b3];
if(!view||(_4b3==_4b5.length-1&&_4b3===0)){
return;
}
view.content.baseDecorateEvent(e);
e.cellNode=_4b7;
e.cellIndex=view.content.getCellNodeIndex(e.cellNode);
e.cell=(e.cellIndex>=0?this.grid.getCell(e.cellIndex):null);
if(view.header.canResize(e)){
var _4b8={l:_4b4};
var drag=view.header.colResizeSetup(e,false);
view.header.doResizeColumn(drag,null,_4b8);
view.update();
}
},styleRow:function(_4b9){
return;
},setFocusIndex:function(_4ba,_4bb){
this.setFocusCell(this.grid.getCell(_4bb),_4ba);
},setFocusCell:function(_4bc,_4bd){
if(_4bc&&!this.isFocusCell(_4bc,_4bd)){
this.tabbingOut=false;
if(this._colHeadNode){
this.blurHeader();
}
this._colHeadNode=this._colHeadFocusIdx=null;
this.focusGridView();
this._focusifyCellNode(false);
this.cell=_4bc;
this.rowIndex=_4bd;
this._focusifyCellNode(true);
}
if(has("opera")){
setTimeout(lang.hitch(this.grid,"onCellFocus",this.cell,this.rowIndex),1);
}else{
this.grid.onCellFocus(this.cell,this.rowIndex);
}
},next:function(){
if(this.cell){
var row=this.rowIndex,col=this.cell.index+1,cc=this.grid.layout.cellCount-1,rc=this.grid.rowCount-1;
if(col>cc){
col=0;
row++;
}
if(row>rc){
col=cc;
row=rc;
}
if(this.grid.edit.isEditing()){
var _4be=this.grid.getCell(col);
if(!this.isLastFocusCell()&&(!_4be.editable||this.grid.canEdit&&!this.grid.canEdit(_4be,row))){
this.cell=_4be;
this.rowIndex=row;
this.next();
return;
}
}
this.setFocusIndex(row,col);
}
},previous:function(){
if(this.cell){
var row=(this.rowIndex||0),col=(this.cell.index||0)-1;
if(col<0){
col=this.grid.layout.cellCount-1;
row--;
}
if(row<0){
row=0;
col=0;
}
if(this.grid.edit.isEditing()){
var _4bf=this.grid.getCell(col);
if(!this.isFirstFocusCell()&&!_4bf.editable){
this.cell=_4bf;
this.rowIndex=row;
this.previous();
return;
}
}
this.setFocusIndex(row,col);
}
},move:function(_4c0,_4c1){
var _4c2=_4c1<0?-1:1;
if(this.isNavHeader()){
var _4c3=this._findHeaderCells();
var _4c4=currentIdx=_49c.indexOf(_4c3,this._colHeadNode);
currentIdx+=_4c1;
while(currentIdx>=0&&currentIdx<_4c3.length&&_4c3[currentIdx].style.display=="none"){
currentIdx+=_4c2;
}
if((currentIdx>=0)&&(currentIdx<_4c3.length)){
this._setActiveColHeader(_4c3[currentIdx],currentIdx,_4c4);
}
}else{
if(this.cell){
var sc=this.grid.scroller,r=this.rowIndex,rc=this.grid.rowCount-1,row=Math.min(rc,Math.max(0,r+_4c0));
if(_4c0){
if(_4c0>0){
if(row>sc.getLastPageRow(sc.page)){
this.grid.setScrollTop(this.grid.scrollTop+sc.findScrollTop(row)-sc.findScrollTop(r));
}
}else{
if(_4c0<0){
if(row<=sc.getPageRow(sc.page)){
this.grid.setScrollTop(this.grid.scrollTop-sc.findScrollTop(r)-sc.findScrollTop(row));
}
}
}
}
var cc=this.grid.layout.cellCount-1,i=this.cell.index,col=Math.min(cc,Math.max(0,i+_4c1));
var cell=this.grid.getCell(col);
while(col>=0&&col<cc&&cell&&cell.hidden===true){
col+=_4c2;
cell=this.grid.getCell(col);
}
if(!cell||cell.hidden===true){
col=i;
}
var n=cell.getNode(row);
if(!n&&_4c0){
if((row+_4c0)>=0&&(row+_4c0)<=rc){
this.move(_4c0>0?++_4c0:--_4c0,_4c1);
}
return;
}else{
if((!n||html.style(n,"display")==="none")&&_4c1){
if((col+_4c1)>=0&&(col+_4c1)<=cc){
this.move(_4c0,_4c1>0?++_4c1:--_4c1);
}
return;
}
}
this.setFocusIndex(row,col);
if(_4c0){
this.grid.updateRow(r);
}
}
}
},previousKey:function(e){
if(this.grid.edit.isEditing()){
_49f.stop(e);
this.previous();
}else{
if(!this.isNavHeader()&&!this._isHeaderHidden()){
this.grid.domNode.focus();
_49f.stop(e);
}else{
this.tabOut(this.grid.domNode);
if(this._colHeadFocusIdx!=null){
html.toggleClass(this._findHeaderCells()[this._colHeadFocusIdx],this.focusClass,false);
this._colHeadFocusIdx=null;
}
this._focusifyCellNode(false);
}
}
},nextKey:function(e){
var _4c5=(this.grid.rowCount===0);
if(e.target===this.grid.domNode&&this._colHeadFocusIdx==null){
this.focusHeader();
_49f.stop(e);
}else{
if(this.isNavHeader()){
this.blurHeader();
if(!this.findAndFocusGridCell()){
this.tabOut(this.grid.lastFocusNode);
}
this._colHeadNode=this._colHeadFocusIdx=null;
}else{
if(this.grid.edit.isEditing()){
_49f.stop(e);
this.next();
}else{
this.tabOut(this.grid.lastFocusNode);
}
}
}
},tabOut:function(_4c6){
this.tabbingOut=true;
_4c6.focus();
},focusGridView:function(){
util.fire(this.focusView,"focus");
},focusGrid:function(_4c7){
this.focusGridView();
this._focusifyCellNode(true);
},findAndFocusGridCell:function(){
var _4c8=true;
var _4c9=(this.grid.rowCount===0);
if(this.isNoFocusCell()&&!_4c9){
var _4ca=0;
var cell=this.grid.getCell(_4ca);
if(cell.hidden){
_4ca=this.isNavHeader()?this._colHeadFocusIdx:0;
}
this.setFocusIndex(0,_4ca);
}else{
if(this.cell&&!_4c9){
if(this.focusView&&!this.focusView.rowNodes[this.rowIndex]){
this.grid.scrollToRow(this.rowIndex);
}
this.focusGrid();
}else{
_4c8=false;
}
}
this._colHeadNode=this._colHeadFocusIdx=null;
return _4c8;
},focusHeader:function(){
var _4cb=this._findHeaderCells();
var _4cc=this._colHeadFocusIdx;
if(this._isHeaderHidden()){
this.findAndFocusGridCell();
}else{
if(!this._colHeadFocusIdx){
if(this.isNoFocusCell()){
this._colHeadFocusIdx=0;
}else{
this._colHeadFocusIdx=this.cell.index;
}
}
}
this._colHeadNode=_4cb[this._colHeadFocusIdx];
while(this._colHeadNode&&this._colHeadFocusIdx>=0&&this._colHeadFocusIdx<_4cb.length&&this._colHeadNode.style.display=="none"){
this._colHeadFocusIdx++;
this._colHeadNode=_4cb[this._colHeadFocusIdx];
}
if(this._colHeadNode&&this._colHeadNode.style.display!="none"){
if(this.headerMenu&&this._contextMenuBindNode!=this.grid.domNode){
this.headerMenu.unBindDomNode(this.grid.viewsHeaderNode);
this.headerMenu.bindDomNode(this.grid.domNode);
this._contextMenuBindNode=this.grid.domNode;
}
this._setActiveColHeader(this._colHeadNode,this._colHeadFocusIdx,_4cc);
this._scrollHeader(this._colHeadFocusIdx);
this._focusifyCellNode(false);
}else{
this.findAndFocusGridCell();
}
},blurHeader:function(){
html.removeClass(this._colHeadNode,this.focusClass);
html.removeAttr(this.grid.domNode,"aria-activedescendant");
if(this.headerMenu&&this._contextMenuBindNode==this.grid.domNode){
var _4cd=this.grid.viewsHeaderNode;
this.headerMenu.unBindDomNode(this.grid.domNode);
this.headerMenu.bindDomNode(_4cd);
this._contextMenuBindNode=_4cd;
}
},doFocus:function(e){
if(e&&e.target!=e.currentTarget){
_49f.stop(e);
return;
}
if(this._clickFocus){
return;
}
if(!this.tabbingOut){
this.focusHeader();
}
this.tabbingOut=false;
_49f.stop(e);
},doBlur:function(e){
_49f.stop(e);
},doContextMenu:function(e){
if(!this.headerMenu){
_49f.stop(e);
}
},doLastNodeFocus:function(e){
if(this.tabbingOut){
this._focusifyCellNode(false);
}else{
if(this.grid.rowCount>0){
if(this.isNoFocusCell()){
this.setFocusIndex(0,0);
}
this._focusifyCellNode(true);
}else{
this.focusHeader();
}
}
this.tabbingOut=false;
_49f.stop(e);
},doLastNodeBlur:function(e){
_49f.stop(e);
},doColHeaderFocus:function(e){
this._setActiveColHeader(e.target,html.attr(e.target,"idx"),this._colHeadFocusIdx);
this._scrollHeader(this.getHeaderIndex());
_49f.stop(e);
},doColHeaderBlur:function(e){
html.toggleClass(e.target,this.focusClass,false);
},_mouseDown:function(e){
this._clickFocus=dojo.some(this.grid.views.views,function(v){
return v.scrollboxNode===e.target;
});
},_mouseUp:function(e){
this._clickFocus=false;
}});
});
},"dgrid/extensions/nls/pagination":function(){
define({root:{status:"${start} - ${end} of ${total} results",gotoFirst:"Go to first page",gotoNext:"Go to next page",gotoPrev:"Go to previous page",gotoLast:"Go to last page",gotoPage:"Go to page",jumpPage:"Jump to page"},es:true,fr:true,pt:true,ja:true,sk:true});
},"dgrid/extensions/nls/pt/pagination":function(){
define({status:"${start} - ${end} de ${total} resultados",gotoFirst:"Primeira página",gotoNext:"Próxima página",gotoPrev:"Página anterior",gotoLast:"Última página",gotoPage:"Ir para página",jumpPage:"Pular para página"});
},"dgrid/extensions/nls/pt/pagination":function(){
define({status:"${start} - ${end} de ${total} resultados",gotoFirst:"Primeira página",gotoNext:"Próxima página",gotoPrev:"Página anterior",gotoLast:"Última página",gotoPage:"Ir para página",jumpPage:"Pular para página"});
},"manager/Core":function(){
define("manager/Core",["dojo/_base/declare","dojo/_base/array","dojo/dom","dojo/dom-class","dojo/dom-style","dojo/on","dojo/parser","dijit/registry","dojo/i18n!./nls/messages","manager/MD5","manager/Window","manager/Form","manager/DialogSimple","manager/Page","manager/Ajax"],function(_4ce,_4cf,dom,_4d0,_4d1,on,_4d2,_4d3,i18n,MD5,Win,Form,_4d4,Page,Ajax){
return {version:"Manager 1.1",md5:new MD5(),grid:null,webForm:null,connections:[],onSubmit:[],onLoad:[],i18n:i18n,action:"",page:new Page(),windows:{handle:[],sufix:0,base:window},type:function(o){
return !!o&&Object.prototype.toString.call(o).match(/(\w+)\]/)[1];
},getAction:function(){
return this.action;
},setAction:function(_4d5,_4d6){
this.action=_4d6;
if(_4d5){
_4d3.byId(_4d5).set("action",_4d6);
}
return _4d6;
},getWindow:function(_4d7){
return this.windows.handle[(_4d7!=""?_4d7:"current")];
},addWindow:function(_4d8){
var _4d9=_4d3.byId(_4d8);
if(!_4d9){
this.windows.handle[_4d8]=new Win(_4d8);
}
return this.windows.handle[_4d8];
},setWindow:function(_4da){
this.windows.handle["current"]=_4da;
},pushWindow:function(_4db){
var win=this.windows.handle["current"];
_4db.parent=win;
this.windows.handle["current"]=_4db;
},popWindow:function(){
var win=this.windows.handle["current"];
this.windows.handle["current"]=win.parent;
},forms:{handle:[]},getForm:function(_4dc){
return this.forms.handle[_4dc];
},addForm:function(_4dd){
this.forms.handle[_4dd]=new Form(_4dd);
return this.forms.handle[_4dd];
},setForm:function(_4de){
var form=this.getForm(_4de);
this.webForm=(form?form:this.addForm(_4de));
},getElementById:function(e){
if(typeof (e)!="string"){
return e;
}
if(document.getElementById){
e=dom.byId(e);
}else{
if(document.all){
e=document.all[e];
}else{
e=null;
}
}
return e;
},byId:function(id){
var _4df=_4d3.byId(id);
if(_4df){
var node=_4df;
}else{
var node=dom.byId(id);
}
return node;
},getElementsByTagName:function(_4e0,p){
var list=null;
_4e0=_4e0||"*";
p=p||document;
if(p.getElementsByTagName){
list=p.getElementsByTagName(_4e0);
}
return list||new Array();
},setElementValueById:function(e,_4e1){
var node=this.getElementById(e);
if(node!=null){
node.value=_4e1;
}
},getElementValueById:function(e){
var node=this.getElementById(e);
if(node!=null){
return node.value;
}
return null;
},getParentForm:function(_4e2){
var node=dom.byId(_4e2);
root=dojo.doc;
while(node&&node!==root){
if(node.action!==undefined){
return node.id;
}
node=node.parentNode;
}
return null;
},getLayoutElement:function(_4e3){
var node=dom.byId(_4e3);
root=dojo.doc;
while(node&&node!==root){
if(_4d0.contains(node,"mElement")){
return node.id;
}
node=node.parentNode;
}
return null;
},parse:function(id){
try{
var byId=dom.byId(id);
if(byId){
_4d2.parse(byId);
}
}
catch(e){
}
},isHandler:function(url){
return (url.indexOf("index.php")>-1);
},registerEvents:function(_4e4){
_4cf.forEach(_4e4,function(_4e5){
manager.registerEvent(_4e5[0],_4e5[1],_4e5[2],_4e5[3],_4e5[4]);
});
},registerEvent:function(id,_4e6,_4e7,_4e8,_4e9){
try{
if(this.type(_4e7)=="Function"){
var _4ea=_4e7;
}else{
var _4ea=new Function("event",_4e7+(_4e8?" event.preventDefault();":""));
}
node=this.byId(id);
if(!node){
console.error("registerEvent "+id+":"+_4e6+". Error: node not found!");
return null;
}
var _4eb=this.getLayoutElement(id);
this.connectionPush(_4eb,on(node,_4e6,_4ea));
}
catch(e){
console.error("registerEvent "+id+":"+_4e6+". Error: "+e);
}
},connectionPush:function(_4ec,_4ed){
if(!this.connections[_4ec]){
this.connections[_4ec]=[];
}
this.connections[_4ec].push(_4ed);
},connect:function(arg1,arg2,arg3,arg4,arg5,arg6){
var _4ee=this.getLayoutElement(arg1);
this.connectionPush(_4ee,on(arg1,arg2,arg3,arg4,arg5,arg6));
},disconnect:function(_4ef){
if(_4ef!=""){
_4cf.forEach(this.connections[_4ef],function(_4f0){
_4f0.remove;
});
this.connections[_4ef].length=0;
}
},submit:function(_4f1){
if(_4f1){
if(this.onSubmit[_4f1]()){
this.page.postback(_4f1);
}
}else{
this.page.postback();
}
},doPost:function(_4f2){
this.submit(_4f2);
},doPostBack:function(_4f3){
var _4f4=this.getParentForm(_4f3);
this.page.eventTarget=_4f3;
this.submit(_4f4);
},doLinkButton:function(url,_4f5){
var _4f6=this.getParentForm(_4f5);
this.setAction(_4f6,url);
this.page.eventTarget=_4f5;
this.submit(_4f6);
},doAjax:function(url,_4f7,_4f8){
var _4f9=this.getParentForm(_4f8);
this.page.ajax(url,_4f7,_4f9);
},doAjaxText:function(url,_4fa,_4fb){
var _4fc=this.getParentForm(_4fb);
this.page.ajaxText(url,_4fa,_4fc);
},doRedirect:function(url){
window.location=url;
},doGet:function(url,_4fd){
this.disconnect(_4fd);
this.page.get(url,_4fd);
},doDialog:function(_4fe,url){
var _4ff=this.getWindow(_4fe);
if(!_4ff){
this.addWindow(_4fe);
}
this.getWindow(_4fe).setHref(url);
this.getWindow(_4fe).open();
},doPrintForm:function(url){
var w=screen.width*0.75;
var h=screen.height*0.6;
var _500=window.open(url,"print","toolbar=no,width="+w+",height="+h+",scrollbars=yes,"+"top=0,left=0,statusbar=yes,resizeable=yes");
},doPrintFile:function(id){
var ok=confirm(this.i18n.PRINT_FILE);
if(ok){
this.doPostBack(id);
}
},doShowPDF:function(id){
var ok=confirm(this.i18n.SHOW_PDF);
if(ok){
this.doPostBack(id);
}
},doWindow:function(url,_501){
if((_501==null)||(_501=="")){
_501="managerWindow";
}
var w=screen.width*0.95;
var h=screen.height*0.8;
var wnd=window.open(url,_501,"toolbar=no,width="+w+",height="+h+",scrollbars=yes,"+"top=0,left=0,statusbar=yes,resizeable=yes");
},doFile:function(url,_502){
url=url+"?filename="+(_502?_502:"download");
window.location.replace(url);
},doPrintURL:function(url){
var ok=confirm(this.i18n.PRINT_URL);
if(ok){
var tg=window.name;
var form=document.forms[0];
var w=screen.width*0.95;
var h=screen.height*0.8;
var _503=window.open(url,"print","toolbar=no,width="+w+",height="+h+",scrollbars=yes,"+"top=0,left=0,statusbar=yes,resizeable=yes");
_503.focus();
window.print();
form.target=tg;
}
},doPrompt:function(_504,html){
var _505=_4d3.byId(_504);
if(!_505){
_505=new _4d4({id:_504});
}
if(html){
_505.set("content",html);
}
_505.show();
},hover:function(id,over,out){
var _506=this.byId(id);
on(_506,"onmouseenter",over);
on(_506,"onmouseleave",out);
},hide:function(id){
if(_4d1.get(this.byId(id),"display")!="none"){
_4d1.set(this.byId(id),"display","none");
}
},show:function(id){
if(_4d1.get(this.byId(id),"display")=="none"){
_4d1.set(this.byId(id),"display","block");
}
},toggle:function(id){
if(_4d1.get(this.byId(id),"display")=="none"){
_4d1.set(this.byId(id),"display","block");
}else{
_4d1.set(this.byId(id),"display","none");
}
}};
});
},"manager/BoxPane":function(){
require({cache:{"url:manager/templates/BoxPane.html":"<div class=\"mBoxPane\" role=\"dialog\" aria-labelledby=\"${id}_title\">\n\t<div data-dojo-attach-point=\"titleBar\" class=\"mBoxPaneTitleBar ${classTitle}\" id=\"${id}_titleBar\">\n\t<span data-dojo-attach-point=\"titleNode\" class=\"mBoxPaneTitle\" id=\"${id}_title\"></span>\n\t<div data-dojo-attach-point=\"toolBarNode\" class=\"mBoxPaneToolBar\"></div>\n\t</div>\n\t\t<div data-dojo-attach-point=\"containerNode\" class=\"mBoxPaneContent\"></div>\n</div>\n"}});
define("manager/BoxPane",["dojo/_base/declare","dojox/layout/ContentPane","dijit/_WidgetBase","dijit/_TemplatedMixin","dijit/_CssStateMixin","dijit/form/_FormMixin","dojo/text!./templates/BoxPane.html"],function(_507,_508,_509,_50a,_50b,_50c,_50d){
return _507("Manager.BoxPane",[_508,_509,_50a,_50c,_50b],{templateString:_50d,baseClass:"mBoxPane",classTitle:"",toolBar:"",cssStateNodes:{toolBarNode:"toolIcon"},focus:function(){
},attributeMap:dojo.delegate(dijit._Widget.prototype.attributeMap,{title:[{node:"titleNode",type:"innerHTML"},{node:"titleBar",type:"attribute"}],"aria-describedby":""}),onCancel:function(){
},startup:function(){
if(this.toolBar!=""){
this.toolBarNode.appendChild(dojo.byId(this.toolBar));
}
this.inherited(arguments);
}});
});
},"dojo/store/Cache":function(){
define(["../_base/lang","../when"],function(lang,when){
var _50e=function(_50f,_510,_511){
_511=_511||{};
return lang.delegate(_50f,{query:function(_512,_513){
var _514=_50f.query(_512,_513);
_514.forEach(function(_515){
if(!_511.isLoaded||_511.isLoaded(_515)){
_510.put(_515);
}
});
return _514;
},queryEngine:_50f.queryEngine||_510.queryEngine,get:function(id,_516){
return when(_510.get(id),function(_517){
return _517||when(_50f.get(id,_516),function(_518){
if(_518){
_510.put(_518,{id:id});
}
return _518;
});
});
},add:function(_519,_51a){
return when(_50f.add(_519,_51a),function(_51b){
_510.add(_519&&typeof _51b=="object"?_51b:_519,_51a);
return _51b;
});
},put:function(_51c,_51d){
_510.remove((_51d&&_51d.id)||this.getIdentity(_51c));
return when(_50f.put(_51c,_51d),function(_51e){
_510.put(_51c&&typeof _51e=="object"?_51e:_51c,_51d);
return _51e;
});
},remove:function(id,_51f){
return when(_50f.remove(id,_51f),function(_520){
return _510.remove(id,_51f);
});
},evict:function(id){
return _510.remove(id);
}});
};
lang.setObject("dojo.store.Cache",_50e);
return _50e;
});
},"dojox/grid/_SelectionPreserver":function(){
define(["dojo/_base/declare","dojo/_base/connect","dojo/_base/lang","dojo/_base/array"],function(_521,_522,lang,_523){
return _521("dojox.grid._SelectionPreserver",null,{constructor:function(_524){
this.selection=_524;
var grid=this.grid=_524.grid;
this.reset();
this._connects=[_522.connect(grid,"_setStore",this,"reset"),_522.connect(grid,"_addItem",this,"_reSelectById"),_522.connect(_524,"onSelected",lang.hitch(this,"_selectById",true)),_522.connect(_524,"onDeselected",lang.hitch(this,"_selectById",false)),_522.connect(_524,"deselectAll",this,"reset")];
},destroy:function(){
this.reset();
_523.forEach(this._connects,_522.disconnect);
delete this._connects;
},reset:function(){
this._selectedById={};
},_reSelectById:function(item,_525){
if(item&&this.grid._hasIdentity){
this.selection.selected[_525]=this._selectedById[this.grid.store.getIdentity(item)];
}
},_selectById:function(_526,_527){
if(this.selection.mode=="none"||!this.grid._hasIdentity){
return;
}
var item=_527,g=this.grid;
if(typeof _527=="number"||typeof _527=="string"){
var _528=g._by_idx[_527];
item=_528&&_528.item;
}
if(item){
this._selectedById[g.store.getIdentity(item)]=!!_526;
}
return item;
}});
});
},"manager/ValidationTextarea":function(){
require(["dojo/_base/declare","dojo/parser","dijit/form/Form","dijit/form/SimpleTextarea","dijit/form/ValidationTextBox"],function(_529,_52a,form,_52b,_52c){
return _529("Manager.ValidationTextarea",[_52c,_52b],{regExp:"(.|\\s)*",onBlur:function(){
if(!this.isValid()){
this.displayMessage(this.getErrorMessage());
}
}});
});
},"manager/GridPages":function(){
define("manager/GridPages",["dojo/_base/declare"],function(_52d){
return _52d("Manager.GridPages",[],{templateString:dojo.cache("../../manager","templates/GridPages.html"),baseClass:"mGridPages",from:0,to:0,selected:0,grid:"",postCreate:function(){
var page=[];
page[0]=document.createElement("span");
page[0].appendChild(document.createTextNode("Páginas:"));
page[0].className="text";
this.containerNode.appendChild(page[0]);
for(var i=this.from;i<=this.to;i++){
page[i]=document.createElement("span");
page[i].appendChild(document.createTextNode(i));
page[i].className=(i==this.selected)?"selected":"link";
this.containerNode.appendChild(page[i]);
}
},onClick:function(_52e){
}});
});
},"dojox/grid/_Builder":function(){
define(["../main","dojo/_base/array","dojo/_base/lang","dojo/_base/window","dojo/_base/event","dojo/_base/sniff","dojo/_base/connect","dojo/dnd/Moveable","dojox/html/metrics","./util","dojo/_base/html","dojo/dom-geometry"],function(_52f,_530,lang,win,_531,has,_532,_533,_534,util,html,_535){
var dg=_52f.grid;
var _536=function(td){
return td.cellIndex>=0?td.cellIndex:_530.indexOf(td.parentNode.cells,td);
};
var _537=function(tr){
return tr.rowIndex>=0?tr.rowIndex:_530.indexOf(tr.parentNode.childNodes,tr);
};
var _538=function(_539,_53a){
return _539&&((_539.rows||0)[_53a]||_539.childNodes[_53a]);
};
var _53b=function(node){
for(var n=node;n&&n.tagName!="TABLE";n=n.parentNode){
}
return n;
};
var _53c=function(_53d,_53e){
for(var n=_53d;n&&_53e(n);n=n.parentNode){
}
return n;
};
var _53f=function(_540){
var name=_540.toUpperCase();
return function(node){
return node.tagName!=name;
};
};
var _541=util.rowIndexTag;
var _542=util.gridViewTag;
var _543=dg._Builder=lang.extend(function(view){
if(view){
this.view=view;
this.grid=view.grid;
}
},{view:null,_table:"<table class=\"dojoxGridRowTable\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" role=\"presentation\"",getTableArray:function(){
var html=[this._table];
if(this.view.viewWidth){
html.push([" style=\"width:",this.view.viewWidth,";\""].join(""));
}
html.push(">");
return html;
},generateCellMarkup:function(_544,_545,_546,_547){
var _548=[],html;
if(_547){
var _549=_544.index!=_544.grid.getSortIndex()?"":_544.grid.sortInfo>0?"aria-sort=\"ascending\"":"aria-sort=\"descending\"";
if(!_544.id){
_544.id=this.grid.id+"Hdr"+_544.index;
}
html=["<th tabIndex=\"-1\" aria-readonly=\"true\" role=\"columnheader\"",_549," id=\"",_544.id,"\""];
}else{
var _54a=this.grid.editable&&!_544.editable?"aria-readonly=\"true\"":"";
html=["<td tabIndex=\"-1\" role=\"gridcell\"",_54a];
}
if(_544.colSpan){
html.push(" colspan=\"",_544.colSpan,"\"");
}
if(_544.rowSpan){
html.push(" rowspan=\"",_544.rowSpan,"\"");
}
html.push(" class=\"dojoxGridCell ");
if(_544.classes){
html.push(_544.classes," ");
}
if(_546){
html.push(_546," ");
}
_548.push(html.join(""));
_548.push("");
html=["\" idx=\"",_544.index,"\" style=\""];
if(_545&&_545[_545.length-1]!=";"){
_545+=";";
}
html.push(_544.styles,_545||"",_544.hidden?"display:none;":"");
if(_544.unitWidth){
html.push("width:",_544.unitWidth,";");
}
_548.push(html.join(""));
_548.push("");
html=["\""];
if(_544.attrs){
html.push(" ",_544.attrs);
}
html.push(">");
_548.push(html.join(""));
_548.push("");
_548.push(_547?"</th>":"</td>");
return _548;
},isCellNode:function(_54b){
return Boolean(_54b&&_54b!=win.doc&&html.attr(_54b,"idx"));
},getCellNodeIndex:function(_54c){
return _54c?Number(html.attr(_54c,"idx")):-1;
},getCellNode:function(_54d,_54e){
for(var i=0,row;((row=_538(_54d.firstChild,i))&&row.cells);i++){
for(var j=0,cell;(cell=row.cells[j]);j++){
if(this.getCellNodeIndex(cell)==_54e){
return cell;
}
}
}
return null;
},findCellTarget:function(_54f,_550){
var n=_54f;
while(n&&(!this.isCellNode(n)||(n.offsetParent&&_542 in n.offsetParent.parentNode&&n.offsetParent.parentNode[_542]!=this.view.id))&&(n!=_550)){
n=n.parentNode;
}
return n!=_550?n:null;
},baseDecorateEvent:function(e){
e.dispatch="do"+e.type;
e.grid=this.grid;
e.sourceView=this.view;
e.cellNode=this.findCellTarget(e.target,e.rowNode);
e.cellIndex=this.getCellNodeIndex(e.cellNode);
e.cell=(e.cellIndex>=0?this.grid.getCell(e.cellIndex):null);
},findTarget:function(_551,_552){
var n=_551;
while(n&&(n!=this.domNode)&&(!(_552 in n)||(_542 in n&&n[_542]!=this.view.id))){
n=n.parentNode;
}
return (n!=this.domNode)?n:null;
},findRowTarget:function(_553){
return this.findTarget(_553,_541);
},isIntraNodeEvent:function(e){
try{
return (e.cellNode&&e.relatedTarget&&html.isDescendant(e.relatedTarget,e.cellNode));
}
catch(x){
return false;
}
},isIntraRowEvent:function(e){
try{
var row=e.relatedTarget&&this.findRowTarget(e.relatedTarget);
return !row&&(e.rowIndex==-1)||row&&(e.rowIndex==row.gridRowIndex);
}
catch(x){
return false;
}
},dispatchEvent:function(e){
if(e.dispatch in this){
return this[e.dispatch](e);
}
return false;
},domouseover:function(e){
if(e.cellNode&&(e.cellNode!=this.lastOverCellNode)){
this.lastOverCellNode=e.cellNode;
this.grid.onMouseOver(e);
}
this.grid.onMouseOverRow(e);
},domouseout:function(e){
if(e.cellNode&&(e.cellNode==this.lastOverCellNode)&&!this.isIntraNodeEvent(e,this.lastOverCellNode)){
this.lastOverCellNode=null;
this.grid.onMouseOut(e);
if(!this.isIntraRowEvent(e)){
this.grid.onMouseOutRow(e);
}
}
},domousedown:function(e){
if(e.cellNode){
this.grid.onMouseDown(e);
}
this.grid.onMouseDownRow(e);
},_getTextDirStyle:function(_554,_555,_556){
return "";
}});
var _557=dg._ContentBuilder=lang.extend(function(view){
_543.call(this,view);
},_543.prototype,{update:function(){
this.prepareHtml();
},prepareHtml:function(){
var _558=this.grid.get,_559=this.view.structure.cells;
for(var j=0,row;(row=_559[j]);j++){
for(var i=0,cell;(cell=row[i]);i++){
cell.get=cell.get||(cell.value==undefined)&&_558;
cell.markup=this.generateCellMarkup(cell,cell.cellStyles,cell.cellClasses,false);
if(!this.grid.editable&&cell.editable){
this.grid.editable=true;
}
}
}
},generateHtml:function(_55a,_55b){
var html=this.getTableArray(),v=this.view,dir,_55c=v.structure.cells,item=this.grid.getItem(_55b);
util.fire(this.view,"onBeforeRow",[_55b,_55c]);
for(var j=0,row;(row=_55c[j]);j++){
if(row.hidden||row.header){
continue;
}
html.push(!row.invisible?"<tr>":"<tr class=\"dojoxGridInvisible\">");
for(var i=0,cell,m,cc,cs;(cell=row[i]);i++){
m=cell.markup;
cc=cell.customClasses=[];
cs=cell.customStyles=[];
m[5]=cell.format(_55b,item);
m[1]=cc.join(" ");
m[3]=cs.join(";");
dir=cell.textDir||this.grid.textDir;
if(dir){
m[3]+=this._getTextDirStyle(dir,cell,_55b);
}
html.push.apply(html,m);
}
html.push("</tr>");
}
html.push("</table>");
return html.join("");
},decorateEvent:function(e){
e.rowNode=this.findRowTarget(e.target);
if(!e.rowNode){
return false;
}
e.rowIndex=e.rowNode[_541];
this.baseDecorateEvent(e);
e.cell=this.grid.getCell(e.cellIndex);
return true;
}});
var _55d=dg._HeaderBuilder=lang.extend(function(view){
this.moveable=null;
_543.call(this,view);
},_543.prototype,{_skipBogusClicks:false,overResizeWidth:4,minColWidth:1,update:function(){
if(this.tableMap){
this.tableMap.mapRows(this.view.structure.cells);
}else{
this.tableMap=new dg._TableMap(this.view.structure.cells);
}
},generateHtml:function(_55e,_55f){
var dir,html=this.getTableArray(),_560=this.view.structure.cells;
util.fire(this.view,"onBeforeRow",[-1,_560]);
for(var j=0,row;(row=_560[j]);j++){
if(row.hidden){
continue;
}
html.push(!row.invisible?"<tr>":"<tr class=\"dojoxGridInvisible\">");
for(var i=0,cell,_561;(cell=row[i]);i++){
cell.customClasses=[];
cell.customStyles=[];
if(this.view.simpleStructure){
if(cell.draggable){
if(cell.headerClasses){
if(cell.headerClasses.indexOf("dojoDndItem")==-1){
cell.headerClasses+=" dojoDndItem";
}
}else{
cell.headerClasses="dojoDndItem";
}
}
if(cell.attrs){
if(cell.attrs.indexOf("dndType='gridColumn_")==-1){
cell.attrs+=" dndType='gridColumn_"+this.grid.id+"'";
}
}else{
cell.attrs="dndType='gridColumn_"+this.grid.id+"'";
}
}
_561=this.generateCellMarkup(cell,cell.headerStyles,cell.headerClasses,true);
_561[5]=(_55f!=undefined?_55f:_55e(cell));
_561[3]=cell.customStyles.join(";");
dir=cell.textDir||this.grid.textDir;
if(dir){
_561[3]+=this._getTextDirStyle(dir,cell,_55f);
}
_561[1]=cell.customClasses.join(" ");
html.push(_561.join(""));
}
html.push("</tr>");
}
html.push("</table>");
return html.join("");
},getCellX:function(e){
var n,x,pos;
n=_53c(e.target,_53f("th"));
if(n){
pos=_535.position(n);
x=e.clientX-pos.x;
}else{
x=e.layerX;
}
return x;
},decorateEvent:function(e){
this.baseDecorateEvent(e);
e.rowIndex=-1;
e.cellX=this.getCellX(e);
return true;
},prepareResize:function(e,mod){
do{
var i=e.cellIndex;
e.cellNode=(i?e.cellNode.parentNode.cells[i+mod]:null);
e.cellIndex=(e.cellNode?this.getCellNodeIndex(e.cellNode):-1);
}while(e.cellNode&&e.cellNode.style.display=="none");
return Boolean(e.cellNode);
},canResize:function(e){
if(!e.cellNode||e.cellNode.colSpan>1){
return false;
}
var cell=this.grid.getCell(e.cellIndex);
return !cell.noresize&&cell.canResize();
},overLeftResizeArea:function(e){
if(html.hasClass(win.body(),"dojoDndMove")){
return false;
}
if(has("ie")){
var tN=e.target;
if(html.hasClass(tN,"dojoxGridArrowButtonNode")||html.hasClass(tN,"dojoxGridArrowButtonChar")||html.hasClass(tN,"dojoxGridColCaption")){
return false;
}
}
if(this.grid.isLeftToRight()){
return (e.cellIndex>0)&&(e.cellX>0&&e.cellX<this.overResizeWidth)&&this.prepareResize(e,-1);
}
var t=e.cellNode&&(e.cellX>0&&e.cellX<this.overResizeWidth);
return t;
},overRightResizeArea:function(e){
if(html.hasClass(win.body(),"dojoDndMove")){
return false;
}
if(has("ie")){
var tN=e.target;
if(html.hasClass(tN,"dojoxGridArrowButtonNode")||html.hasClass(tN,"dojoxGridArrowButtonChar")||html.hasClass(tN,"dojoxGridColCaption")){
return false;
}
}
if(this.grid.isLeftToRight()){
return e.cellNode&&(e.cellX>=e.cellNode.offsetWidth-this.overResizeWidth);
}
return (e.cellIndex>0)&&(e.cellX>=e.cellNode.offsetWidth-this.overResizeWidth)&&this.prepareResize(e,-1);
},domousemove:function(e){
if(!this.moveable){
var c=(this.overRightResizeArea(e)?"dojoxGridColResize":(this.overLeftResizeArea(e)?"dojoxGridColResize":""));
if(c&&!this.canResize(e)){
c="dojoxGridColNoResize";
}
html.toggleClass(e.sourceView.headerNode,"dojoxGridColNoResize",(c=="dojoxGridColNoResize"));
html.toggleClass(e.sourceView.headerNode,"dojoxGridColResize",(c=="dojoxGridColResize"));
if(c){
_531.stop(e);
}
}
},domousedown:function(e){
if(!this.moveable){
if((this.overRightResizeArea(e)||this.overLeftResizeArea(e))&&this.canResize(e)){
this.beginColumnResize(e);
}else{
this.grid.onMouseDown(e);
this.grid.onMouseOverRow(e);
}
}
},doclick:function(e){
if(this._skipBogusClicks){
_531.stop(e);
return true;
}
return false;
},colResizeSetup:function(e,_562){
var _563=html.contentBox(e.sourceView.headerNode);
if(_562){
this.lineDiv=document.createElement("div");
var vw=html.position(e.sourceView.headerNode,true);
var _564=html.contentBox(e.sourceView.domNode);
var l=e.pageX;
if(!this.grid.isLeftToRight()&&has("ie")<8){
l-=_534.getScrollbar().w;
}
html.style(this.lineDiv,{top:vw.y+"px",left:l+"px",height:(_564.h+_563.h)+"px"});
html.addClass(this.lineDiv,"dojoxGridResizeColLine");
this.lineDiv._origLeft=l;
win.body().appendChild(this.lineDiv);
}
var _565=[],_566=this.tableMap.findOverlappingNodes(e.cellNode);
for(var i=0,cell;(cell=_566[i]);i++){
_565.push({node:cell,index:this.getCellNodeIndex(cell),width:cell.offsetWidth});
}
var view=e.sourceView;
var adj=this.grid.isLeftToRight()?1:-1;
var _567=e.grid.views.views;
var _568=[];
for(var j=view.idx+adj,_569;(_569=_567[j]);j=j+adj){
_568.push({node:_569.headerNode,left:window.parseInt(_569.headerNode.style.left)});
}
var _56a=view.headerContentNode.firstChild;
var drag={scrollLeft:e.sourceView.headerNode.scrollLeft,view:view,node:e.cellNode,index:e.cellIndex,w:html.contentBox(e.cellNode).w,vw:_563.w,table:_56a,tw:html.contentBox(_56a).w,spanners:_565,followers:_568};
return drag;
},beginColumnResize:function(e){
this.moverDiv=document.createElement("div");
html.style(this.moverDiv,{position:"absolute",left:0});
win.body().appendChild(this.moverDiv);
html.addClass(this.grid.domNode,"dojoxGridColumnResizing");
var m=(this.moveable=new _533(this.moverDiv));
var drag=this.colResizeSetup(e,true);
m.onMove=lang.hitch(this,"doResizeColumn",drag);
_532.connect(m,"onMoveStop",lang.hitch(this,function(){
this.endResizeColumn(drag);
if(drag.node.releaseCapture){
drag.node.releaseCapture();
}
this.moveable.destroy();
delete this.moveable;
this.moveable=null;
html.removeClass(this.grid.domNode,"dojoxGridColumnResizing");
}));
if(e.cellNode.setCapture){
e.cellNode.setCapture();
}
m.onMouseDown(e);
},doResizeColumn:function(_56b,_56c,_56d){
var _56e=_56d.l;
var data={deltaX:_56e,w:_56b.w+(this.grid.isLeftToRight()?_56e:-_56e),vw:_56b.vw+_56e,tw:_56b.tw+_56e};
this.dragRecord={inDrag:_56b,mover:_56c,leftTop:_56d};
if(data.w>=this.minColWidth){
if(!_56c){
this.doResizeNow(_56b,data);
}else{
html.style(this.lineDiv,"left",(this.lineDiv._origLeft+data.deltaX)+"px");
}
}
},endResizeColumn:function(_56f){
if(this.dragRecord){
var _570=this.dragRecord.leftTop;
var _571=this.grid.isLeftToRight()?_570.l:-_570.l;
_571+=Math.max(_56f.w+_571,this.minColWidth)-(_56f.w+_571);
if(has("webkit")&&_56f.spanners.length){
_571+=html._getPadBorderExtents(_56f.spanners[0].node).w;
}
var data={deltaX:_571,w:_56f.w+_571,vw:_56f.vw+_571,tw:_56f.tw+_571};
this.doResizeNow(_56f,data);
delete this.dragRecord;
}
html.destroy(this.lineDiv);
html.destroy(this.moverDiv);
html.destroy(this.moverDiv);
delete this.moverDiv;
this._skipBogusClicks=true;
_56f.view.update();
this._skipBogusClicks=false;
this.grid.onResizeColumn(_56f.index);
},doResizeNow:function(_572,data){
_572.view.convertColPctToFixed();
if(_572.view.flexCells&&!_572.view.testFlexCells()){
var t=_53b(_572.node);
if(t){
(t.style.width="");
}
}
var i,s,sw,f,fl;
for(i=0;(s=_572.spanners[i]);i++){
sw=s.width+data.deltaX;
if(sw>0){
s.node.style.width=sw+"px";
_572.view.setColWidth(s.index,sw);
}
}
if(this.grid.isLeftToRight()||!has("ie")){
for(i=0;(f=_572.followers[i]);i++){
fl=f.left+data.deltaX;
f.node.style.left=fl+"px";
}
}
_572.node.style.width=data.w+"px";
_572.view.setColWidth(_572.index,data.w);
_572.view.headerNode.style.width=data.vw+"px";
_572.view.setColumnsWidth(data.tw);
if(!this.grid.isLeftToRight()){
_572.view.headerNode.scrollLeft=_572.scrollLeft+data.deltaX;
}
}});
dg._TableMap=lang.extend(function(rows){
this.mapRows(rows);
},{map:null,mapRows:function(_573){
var _574=_573.length;
if(!_574){
return;
}
this.map=[];
var row;
for(var k=0;(row=_573[k]);k++){
this.map[k]=[];
}
for(var j=0;(row=_573[j]);j++){
for(var i=0,x=0,cell,_575,_576;(cell=row[i]);i++){
while(this.map[j][x]){
x++;
}
this.map[j][x]={c:i,r:j};
_576=cell.rowSpan||1;
_575=cell.colSpan||1;
for(var y=0;y<_576;y++){
for(var s=0;s<_575;s++){
this.map[j+y][x+s]=this.map[j][x];
}
}
x+=_575;
}
}
},dumpMap:function(){
for(var j=0,row,h="";(row=this.map[j]);j++,h=""){
for(var i=0,cell;(cell=row[i]);i++){
h+=cell.r+","+cell.c+"   ";
}
}
},getMapCoords:function(_577,_578){
for(var j=0,row;(row=this.map[j]);j++){
for(var i=0,cell;(cell=row[i]);i++){
if(cell.c==_578&&cell.r==_577){
return {j:j,i:i};
}
}
}
return {j:-1,i:-1};
},getNode:function(_579,_57a,_57b){
var row=_579&&_579.rows[_57a];
return row&&row.cells[_57b];
},_findOverlappingNodes:function(_57c,_57d,_57e){
var _57f=[];
var m=this.getMapCoords(_57d,_57e);
for(var j=0,row;(row=this.map[j]);j++){
if(j==m.j){
continue;
}
var rw=row[m.i];
var n=(rw?this.getNode(_57c,rw.r,rw.c):null);
if(n){
_57f.push(n);
}
}
return _57f;
},findOverlappingNodes:function(_580){
return this._findOverlappingNodes(_53b(_580),_537(_580.parentNode),_536(_580));
}});
return {_Builder:_543,_HeaderBuilder:_55d,_ContentBuilder:_557};
});
},"dojo/dnd/Source":function(){
define(["../_base/array","../_base/declare","../_base/kernel","../_base/lang","../dom-class","../dom-geometry","../mouse","../ready","../topic","./common","./Selector","./Manager"],function(_581,_582,_583,lang,_584,_585,_586,_587,_588,dnd,_589,_58a){
if(!_583.isAsync){
_587(0,function(){
var _58b=["dojo/dnd/AutoSource","dojo/dnd/Target"];
require(_58b);
});
}
var _58c=_582("dojo.dnd.Source",_589,{isSource:true,horizontal:false,copyOnly:false,selfCopy:false,selfAccept:true,skipForm:false,withHandles:false,autoSync:false,delay:0,accept:["text"],generateText:true,constructor:function(node,_58d){
lang.mixin(this,lang.mixin({},_58d));
var type=this.accept;
if(type.length){
this.accept={};
for(var i=0;i<type.length;++i){
this.accept[type[i]]=1;
}
}
this.isDragging=false;
this.mouseDown=false;
this.targetAnchor=null;
this.targetBox=null;
this.before=true;
this._lastX=0;
this._lastY=0;
this.sourceState="";
if(this.isSource){
_584.add(this.node,"dojoDndSource");
}
this.targetState="";
if(this.accept){
_584.add(this.node,"dojoDndTarget");
}
if(this.horizontal){
_584.add(this.node,"dojoDndHorizontal");
}
this.topics=[_588.subscribe("/dnd/source/over",lang.hitch(this,"onDndSourceOver")),_588.subscribe("/dnd/start",lang.hitch(this,"onDndStart")),_588.subscribe("/dnd/drop",lang.hitch(this,"onDndDrop")),_588.subscribe("/dnd/cancel",lang.hitch(this,"onDndCancel"))];
},checkAcceptance:function(_58e,_58f){
if(this==_58e){
return !this.copyOnly||this.selfAccept;
}
for(var i=0;i<_58f.length;++i){
var type=_58e.getItem(_58f[i].id).type;
var flag=false;
for(var j=0;j<type.length;++j){
if(type[j] in this.accept){
flag=true;
break;
}
}
if(!flag){
return false;
}
}
return true;
},copyState:function(_590,self){
if(_590){
return true;
}
if(arguments.length<2){
self=this==_58a.manager().target;
}
if(self){
if(this.copyOnly){
return this.selfCopy;
}
}else{
return this.copyOnly;
}
return false;
},destroy:function(){
_58c.superclass.destroy.call(this);
_581.forEach(this.topics,function(t){
t.remove();
});
this.targetAnchor=null;
},onMouseMove:function(e){
if(this.isDragging&&this.targetState=="Disabled"){
return;
}
_58c.superclass.onMouseMove.call(this,e);
var m=_58a.manager();
if(!this.isDragging){
if(this.mouseDown&&this.isSource&&(Math.abs(e.pageX-this._lastX)>this.delay||Math.abs(e.pageY-this._lastY)>this.delay)){
var _591=this.getSelectedNodes();
if(_591.length){
m.startDrag(this,_591,this.copyState(dnd.getCopyKeyState(e),true));
}
}
}
if(this.isDragging){
var _592=false;
if(this.current){
if(!this.targetBox||this.targetAnchor!=this.current){
this.targetBox=_585.position(this.current,true);
}
if(this.horizontal){
_592=(e.pageX-this.targetBox.x<this.targetBox.w/2)==_585.isBodyLtr(this.current.ownerDocument);
}else{
_592=(e.pageY-this.targetBox.y)<(this.targetBox.h/2);
}
}
if(this.current!=this.targetAnchor||_592!=this.before){
this._markTargetAnchor(_592);
m.canDrop(!this.current||m.source!=this||!(this.current.id in this.selection));
}
}
},onMouseDown:function(e){
if(!this.mouseDown&&this._legalMouseDown(e)&&(!this.skipForm||!dnd.isFormElement(e))){
this.mouseDown=true;
this._lastX=e.pageX;
this._lastY=e.pageY;
_58c.superclass.onMouseDown.call(this,e);
}
},onMouseUp:function(e){
if(this.mouseDown){
this.mouseDown=false;
_58c.superclass.onMouseUp.call(this,e);
}
},onDndSourceOver:function(_593){
if(this!==_593){
this.mouseDown=false;
if(this.targetAnchor){
this._unmarkTargetAnchor();
}
}else{
if(this.isDragging){
var m=_58a.manager();
m.canDrop(this.targetState!="Disabled"&&(!this.current||m.source!=this||!(this.current.id in this.selection)));
}
}
},onDndStart:function(_594,_595,copy){
if(this.autoSync){
this.sync();
}
if(this.isSource){
this._changeState("Source",this==_594?(copy?"Copied":"Moved"):"");
}
var _596=this.accept&&this.checkAcceptance(_594,_595);
this._changeState("Target",_596?"":"Disabled");
if(this==_594){
_58a.manager().overSource(this);
}
this.isDragging=true;
},onDndDrop:function(_597,_598,copy,_599){
if(this==_599){
this.onDrop(_597,_598,copy);
}
this.onDndCancel();
},onDndCancel:function(){
if(this.targetAnchor){
this._unmarkTargetAnchor();
this.targetAnchor=null;
}
this.before=true;
this.isDragging=false;
this.mouseDown=false;
this._changeState("Source","");
this._changeState("Target","");
},onDrop:function(_59a,_59b,copy){
if(this!=_59a){
this.onDropExternal(_59a,_59b,copy);
}else{
this.onDropInternal(_59b,copy);
}
},onDropExternal:function(_59c,_59d,copy){
var _59e=this._normalizedCreator;
if(this.creator){
this._normalizedCreator=function(node,hint){
return _59e.call(this,_59c.getItem(node.id).data,hint);
};
}else{
if(copy){
this._normalizedCreator=function(node){
var t=_59c.getItem(node.id);
var n=node.cloneNode(true);
n.id=dnd.getUniqueId();
return {node:n,data:t.data,type:t.type};
};
}else{
this._normalizedCreator=function(node){
var t=_59c.getItem(node.id);
_59c.delItem(node.id);
return {node:node,data:t.data,type:t.type};
};
}
}
this.selectNone();
if(!copy&&!this.creator){
_59c.selectNone();
}
this.insertNodes(true,_59d,this.before,this.current);
if(!copy&&this.creator){
_59c.deleteSelectedNodes();
}
this._normalizedCreator=_59e;
},onDropInternal:function(_59f,copy){
var _5a0=this._normalizedCreator;
if(this.current&&this.current.id in this.selection){
return;
}
if(copy){
if(this.creator){
this._normalizedCreator=function(node,hint){
return _5a0.call(this,this.getItem(node.id).data,hint);
};
}else{
this._normalizedCreator=function(node){
var t=this.getItem(node.id);
var n=node.cloneNode(true);
n.id=dnd.getUniqueId();
return {node:n,data:t.data,type:t.type};
};
}
}else{
if(!this.current){
return;
}
this._normalizedCreator=function(node){
var t=this.getItem(node.id);
return {node:node,data:t.data,type:t.type};
};
}
this._removeSelection();
this.insertNodes(true,_59f,this.before,this.current);
this._normalizedCreator=_5a0;
},onDraggingOver:function(){
},onDraggingOut:function(){
},onOverEvent:function(){
_58c.superclass.onOverEvent.call(this);
_58a.manager().overSource(this);
if(this.isDragging&&this.targetState!="Disabled"){
this.onDraggingOver();
}
},onOutEvent:function(){
_58c.superclass.onOutEvent.call(this);
_58a.manager().outSource(this);
if(this.isDragging&&this.targetState!="Disabled"){
this.onDraggingOut();
}
},_markTargetAnchor:function(_5a1){
if(this.current==this.targetAnchor&&this.before==_5a1){
return;
}
if(this.targetAnchor){
this._removeItemClass(this.targetAnchor,this.before?"Before":"After");
}
this.targetAnchor=this.current;
this.targetBox=null;
this.before=_5a1;
if(this.targetAnchor){
this._addItemClass(this.targetAnchor,this.before?"Before":"After");
}
},_unmarkTargetAnchor:function(){
if(!this.targetAnchor){
return;
}
this._removeItemClass(this.targetAnchor,this.before?"Before":"After");
this.targetAnchor=null;
this.targetBox=null;
this.before=true;
},_markDndStatus:function(copy){
this._changeState("Source",copy?"Copied":"Moved");
},_legalMouseDown:function(e){
if(e.type!="touchstart"&&!_586.isLeft(e)){
return false;
}
if(!this.withHandles){
return true;
}
for(var node=e.target;node&&node!==this.node;node=node.parentNode){
if(_584.contains(node,"dojoDndHandle")){
return true;
}
if(_584.contains(node,"dojoDndItem")||_584.contains(node,"dojoDndIgnore")){
break;
}
}
return false;
}});
return _58c;
});
},"manager/ComboBox":function(){
define("manager/ComboBox",["dojo/_base/declare"],function(_5a2){
return _5a2("Manager.ComboBox",[],{constructor:function(name){
this.name=name;
},onTextChange:function(_5a3,_5a4,_5a5){
var tf=dijit.byId(_5a4);
var sl=dijit.byId(_5a5);
var text=tf.value;
sl.valueNode.value=text;
if(sl.textbox.value==""){
alert("!!! ATENÇÃO!!!\n\não existe uma opção correspondente ao valor '"+text+"'\ndo campo '"+_5a3+"'!");
tf.value="";
tf.focus();
}
},onSelectionChange:function(_5a6,_5a7,_5a8){
var tf=dijit.byId(_5a8);
var sl=dijit.byId(_5a7);
var _5a9=sl.selectedIndex;
if(_5a9!=-1){
tf.value=String(sl.options[_5a9].value);
}
}});
});
},"dojox/grid/cells/_base":function(){
define(["dojo/_base/kernel","dojo/_base/declare","dojo/_base/lang","dojo/_base/event","dojo/_base/connect","dojo/_base/array","dojo/_base/sniff","dojo/dom","dojo/dom-attr","dojo/dom-construct","dijit/_Widget","../util"],function(dojo,_5aa,lang,_5ab,_5ac,_5ad,has,dom,_5ae,_5af,_5b0,util){
var _5b1=_5aa("dojox.grid._DeferredTextWidget",_5b0,{deferred:null,_destroyOnRemove:true,postCreate:function(){
if(this.deferred){
this.deferred.addBoth(lang.hitch(this,function(text){
if(this.domNode){
this.domNode.innerHTML=text;
}
}));
}
}});
var _5b2=function(_5b3){
try{
util.fire(_5b3,"focus");
util.fire(_5b3,"select");
}
catch(e){
}
};
var _5b4=function(){
setTimeout(lang.hitch.apply(dojo,arguments),0);
};
var _5b5=_5aa("dojox.grid.cells._Base",null,{styles:"",classes:"",editable:false,alwaysEditing:false,formatter:null,defaultValue:"...",value:null,hidden:false,noresize:false,draggable:true,_valueProp:"value",_formatPending:false,constructor:function(_5b6){
this._props=_5b6||{};
lang.mixin(this,_5b6);
if(this.draggable===undefined){
this.draggable=true;
}
},_defaultFormat:function(_5b7,_5b8){
var s=this.grid.formatterScope||this;
var f=this.formatter;
if(f&&s&&typeof f=="string"){
f=this.formatter=s[f];
}
var v=(_5b7!=this.defaultValue&&f)?f.apply(s,_5b8):_5b7;
if(typeof v=="undefined"){
return this.defaultValue;
}
if(v&&v.addBoth){
v=new _5b1({deferred:v},_5af.create("span",{innerHTML:this.defaultValue}));
}
if(v&&v.declaredClass&&v.startup){
return "<div class='dojoxGridStubNode' linkWidget='"+v.id+"' cellIdx='"+this.index+"'>"+this.defaultValue+"</div>";
}
return v;
},format:function(_5b9,_5ba){
var f,i=this.grid.edit.info,d=this.get?this.get(_5b9,_5ba):(this.value||this.defaultValue);
d=(d&&d.replace&&this.grid.escapeHTMLInData)?d.replace(/&/g,"&amp;").replace(/</g,"&lt;"):d;
if(this.editable&&(this.alwaysEditing||(i.rowIndex==_5b9&&i.cell==this))){
return this.formatEditing(i.value?i.value:d,_5b9);
}else{
return this._defaultFormat(d,[d,_5b9,this]);
}
},formatEditing:function(_5bb,_5bc){
},getNode:function(_5bd){
return this.view.getCellNode(_5bd,this.index);
},getHeaderNode:function(){
return this.view.getHeaderCellNode(this.index);
},getEditNode:function(_5be){
return (this.getNode(_5be)||0).firstChild||0;
},canResize:function(){
var uw=this.unitWidth;
return uw&&(uw!=="auto");
},isFlex:function(){
var uw=this.unitWidth;
return uw&&lang.isString(uw)&&(uw=="auto"||uw.slice(-1)=="%");
},applyEdit:function(_5bf,_5c0){
if(this.getNode(_5c0)){
this.grid.edit.applyCellEdit(_5bf,this,_5c0);
}
},cancelEdit:function(_5c1){
this.grid.doCancelEdit(_5c1);
},_onEditBlur:function(_5c2){
if(this.grid.edit.isEditCell(_5c2,this.index)){
this.grid.edit.apply();
}
},registerOnBlur:function(_5c3,_5c4){
if(this.commitOnBlur){
_5ac.connect(_5c3,"onblur",function(e){
setTimeout(lang.hitch(this,"_onEditBlur",_5c4),250);
});
}
},needFormatNode:function(_5c5,_5c6){
this._formatPending=true;
_5b4(this,"_formatNode",_5c5,_5c6);
},cancelFormatNode:function(){
this._formatPending=false;
},_formatNode:function(_5c7,_5c8){
if(this._formatPending){
this._formatPending=false;
if(!has("ie")){
dom.setSelectable(this.grid.domNode,true);
}
this.formatNode(this.getEditNode(_5c8),_5c7,_5c8);
}
},formatNode:function(_5c9,_5ca,_5cb){
if(has("ie")){
_5b4(this,"focus",_5cb,_5c9);
}else{
this.focus(_5cb,_5c9);
}
},dispatchEvent:function(m,e){
if(m in this){
return this[m](e);
}
},getValue:function(_5cc){
return this.getEditNode(_5cc)[this._valueProp];
},setValue:function(_5cd,_5ce){
var n=this.getEditNode(_5cd);
if(n){
n[this._valueProp]=_5ce;
}
},focus:function(_5cf,_5d0){
_5b2(_5d0||this.getEditNode(_5cf));
},save:function(_5d1){
this.value=this.value||this.getValue(_5d1);
},restore:function(_5d2){
this.setValue(_5d2,this.value);
},_finish:function(_5d3){
dom.setSelectable(this.grid.domNode,false);
this.cancelFormatNode();
},apply:function(_5d4){
this.applyEdit(this.getValue(_5d4),_5d4);
this._finish(_5d4);
},cancel:function(_5d5){
this.cancelEdit(_5d5);
this._finish(_5d5);
}});
_5b5.markupFactory=function(node,_5d6){
var _5d7=lang.trim(_5ae.get(node,"formatter")||"");
if(_5d7){
_5d6.formatter=lang.getObject(_5d7)||_5d7;
}
var get=lang.trim(_5ae.get(node,"get")||"");
if(get){
_5d6.get=lang.getObject(get);
}
var _5d8=function(attr,cell,_5d9){
var _5da=lang.trim(_5ae.get(node,attr)||"");
if(_5da){
cell[_5d9||attr]=!(_5da.toLowerCase()=="false");
}
};
_5d8("sortDesc",_5d6);
_5d8("editable",_5d6);
_5d8("alwaysEditing",_5d6);
_5d8("noresize",_5d6);
_5d8("draggable",_5d6);
var _5db=lang.trim(_5ae.get(node,"loadingText")||_5ae.get(node,"defaultValue")||"");
if(_5db){
_5d6.defaultValue=_5db;
}
var _5dc=function(attr,cell,_5dd){
var _5de=lang.trim(_5ae.get(node,attr)||"")||undefined;
if(_5de){
cell[_5dd||attr]=_5de;
}
};
_5dc("styles",_5d6);
_5dc("headerStyles",_5d6);
_5dc("cellStyles",_5d6);
_5dc("classes",_5d6);
_5dc("headerClasses",_5d6);
_5dc("cellClasses",_5d6);
};
var Cell=_5b5.Cell=_5aa("dojox.grid.cells.Cell",_5b5,{constructor:function(){
this.keyFilter=this.keyFilter;
},keyFilter:null,formatEditing:function(_5df,_5e0){
this.needFormatNode(_5df,_5e0);
return "<input class=\"dojoxGridInput\" type=\"text\" value=\""+_5df+"\">";
},formatNode:function(_5e1,_5e2,_5e3){
this.inherited(arguments);
this.registerOnBlur(_5e1,_5e3);
},doKey:function(e){
if(this.keyFilter){
var key=String.fromCharCode(e.charCode);
if(key.search(this.keyFilter)==-1){
_5ab.stop(e);
}
}
},_finish:function(_5e4){
this.inherited(arguments);
var n=this.getEditNode(_5e4);
try{
util.fire(n,"blur");
}
catch(e){
}
}});
Cell.markupFactory=function(node,_5e5){
_5b5.markupFactory(node,_5e5);
var _5e6=lang.trim(_5ae.get(node,"keyFilter")||"");
if(_5e6){
_5e5.keyFilter=new RegExp(_5e6);
}
};
var _5e7=_5b5.RowIndex=_5aa("dojox.grid.cells.RowIndex",Cell,{name:"Row",postscript:function(){
this.editable=false;
},get:function(_5e8){
return _5e8+1;
}});
_5e7.markupFactory=function(node,_5e9){
Cell.markupFactory(node,_5e9);
};
var _5ea=_5b5.Select=_5aa("dojox.grid.cells.Select",Cell,{options:null,values:null,returnIndex:-1,constructor:function(_5eb){
this.values=this.values||this.options;
},formatEditing:function(_5ec,_5ed){
this.needFormatNode(_5ec,_5ed);
var h=["<select class=\"dojoxGridSelect\">"];
for(var i=0,o,v;((o=this.options[i])!==undefined)&&((v=this.values[i])!==undefined);i++){
v=v.replace?v.replace(/&/g,"&amp;").replace(/</g,"&lt;"):v;
o=o.replace?o.replace(/&/g,"&amp;").replace(/</g,"&lt;"):o;
h.push("<option",(_5ec==v?" selected":"")," value=\""+v+"\"",">",o,"</option>");
}
h.push("</select>");
return h.join("");
},_defaultFormat:function(_5ee,_5ef){
var v=this.inherited(arguments);
if(!this.formatter&&this.values&&this.options){
var i=_5ad.indexOf(this.values,v);
if(i>=0){
v=this.options[i];
}
}
return v;
},getValue:function(_5f0){
var n=this.getEditNode(_5f0);
if(n){
var i=n.selectedIndex,o=n.options[i];
return this.returnIndex>-1?i:o.value||o.innerHTML;
}
}});
_5ea.markupFactory=function(node,cell){
Cell.markupFactory(node,cell);
var _5f1=lang.trim(_5ae.get(node,"options")||"");
if(_5f1){
var o=_5f1.split(",");
if(o[0]!=_5f1){
cell.options=o;
}
}
var _5f2=lang.trim(_5ae.get(node,"values")||"");
if(_5f2){
var v=_5f2.split(",");
if(v[0]!=_5f2){
cell.values=v;
}
}
};
var _5f3=_5b5.AlwaysEdit=_5aa("dojox.grid.cells.AlwaysEdit",Cell,{alwaysEditing:true,_formatNode:function(_5f4,_5f5){
this.formatNode(this.getEditNode(_5f5),_5f4,_5f5);
},applyStaticValue:function(_5f6){
var e=this.grid.edit;
e.applyCellEdit(this.getValue(_5f6),this,_5f6);
e.start(this,_5f6,true);
}});
_5f3.markupFactory=function(node,cell){
Cell.markupFactory(node,cell);
};
var Bool=_5b5.Bool=_5aa("dojox.grid.cells.Bool",_5f3,{_valueProp:"checked",formatEditing:function(_5f7,_5f8){
return "<input class=\"dojoxGridInput\" type=\"checkbox\""+(_5f7?" checked=\"checked\"":"")+" style=\"width: auto\" />";
},doclick:function(e){
if(e.target.tagName=="INPUT"){
this.applyStaticValue(e.rowIndex);
}
}});
Bool.markupFactory=function(node,cell){
_5f3.markupFactory(node,cell);
};
return _5b5;
});
},"url:dojox/grid/resources/View.html":"<div class=\"dojoxGridView\" role=\"presentation\">\n\t<div class=\"dojoxGridHeader\" dojoAttachPoint=\"headerNode\" role=\"presentation\">\n\t\t<div dojoAttachPoint=\"headerNodeContainer\" style=\"width:9000em\" role=\"presentation\">\n\t\t\t<div dojoAttachPoint=\"headerContentNode\" role=\"row\"></div>\n\t\t</div>\n\t</div>\n\t<input type=\"checkbox\" class=\"dojoxGridHiddenFocus\" dojoAttachPoint=\"hiddenFocusNode\" role=\"presentation\" />\n\t<input type=\"checkbox\" class=\"dojoxGridHiddenFocus\" role=\"presentation\" />\n\t<div class=\"dojoxGridScrollbox\" dojoAttachPoint=\"scrollboxNode\" role=\"presentation\">\n\t\t<div class=\"dojoxGridContent\" dojoAttachPoint=\"contentNode\" hidefocus=\"hidefocus\" role=\"presentation\"></div>\n\t</div>\n</div>\n","url:manager/templates/Dialog.html":"<div class=\"mBoxPaneDialog mElement\" role=\"dialog\" aria-labelledby=\"${id}_title\"  cleanContent=\"true\">\n    <div >\n\t<span></span>\n\t<span dojoAttachPoint=\"closeButtonNode\"></span>\n    </div>  \n<div  id=\"${id}_container\" dojoAttachPoint=\"containerNode\"></div>\n</div>\n","url:dojox/grid/resources/_Grid.html":"<div hidefocus=\"hidefocus\" role=\"grid\" dojoAttachEvent=\"onmouseout:_mouseOut\">\n\t<div class=\"dojoxGridMasterHeader\" dojoAttachPoint=\"viewsHeaderNode\" role=\"presentation\"></div>\n\t<div class=\"dojoxGridMasterView\" dojoAttachPoint=\"viewsNode\" role=\"presentation\"></div>\n\t<div class=\"dojoxGridMasterMessages\" style=\"display: none;\" dojoAttachPoint=\"messagesNode\"></div>\n\t<span dojoAttachPoint=\"lastFocusNode\" tabindex=\"0\"></span>\n</div>\n","url:manager/templates/TransferBox.html":"<div>\r\n\t<div data-dojo-attach-point=\"fromNode\"></div>\r\n\t<div class=\"dijitReset dijitInline buttons\">\r\n\t\t<button type=\"button\" data-dojo-type=\"dijit.form.Button\" \r\n\t\t\tdata-dojo-attach-event=\"onClick:add\" \r\n\t\t\tdata-dojo-attach-point=\"addButton\">&gt;</button>\r\n\t\t<button type=\"button\" data-dojo-type=\"dijit.form.Button\" \r\n\t\t\tdata-dojo-attach-event=\"onClick:remove\" \r\n\t\t\tdata-dojo-attach-point=\"removeButton\">&lt;</button>\r\n\t</div>\r\n\t<div data-dojo-attach-point=\"toNode\"></div>\r\n</div>","url:manager/templates/BoxPane.html":"<div class=\"mBoxPane\" role=\"dialog\" aria-labelledby=\"${id}_title\">\n\t<div data-dojo-attach-point=\"titleBar\" class=\"mBoxPaneTitleBar ${classTitle}\" id=\"${id}_titleBar\">\n\t<span data-dojo-attach-point=\"titleNode\" class=\"mBoxPaneTitle\" id=\"${id}_title\"></span>\n\t<div data-dojo-attach-point=\"toolBarNode\" class=\"mBoxPaneToolBar\"></div>\n\t</div>\n\t\t<div data-dojo-attach-point=\"containerNode\" class=\"mBoxPaneContent\"></div>\n</div>\n","*now":function(r){
r(["dojo/i18n!*preload*manager/nls/main*[]"]);
}}});
require(["dojo/_base/kernel","dojo/_base/loader"],function(dojo){
dojo.registerModulePath("manager","../manager");
});
require(["dojo/i18n!dojo/cldr/nls/pt/currency","dojo/i18n!dojo/cldr/nls/pt/number","dojo/i18n!dojo/cldr/nls/pt/gregorian"]);
require(["manager/dijit","manager/dojox"]);
require(["manager/Core"],function(Core){
window.manager=Core;
});
require(["manager/BoxPane"]);
require(["manager/Grid"]);
require(["manager/Lookup"]);
require(["manager/FormPopup"]);
