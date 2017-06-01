//>>built
require({cache:{"dojox/embed/Flash":function(){
define(["dojo"],function(_1){
var _2,_3;
var _4=9;
var _5="dojox-embed-flash-",_6=0;
var _7={expressInstall:false,width:320,height:240,swLiveConnect:"true",allowScriptAccess:"sameDomain",allowNetworking:"all",style:null,redirect:null};
function _8(_9){
_9=_1.delegate(_7,_9);
if(!("path" in _9)){
console.error("dojox.embed.Flash(ctor):: no path reference to a Flash movie was provided.");
return null;
}
if(!("id" in _9)){
_9.id=(_5+_6++);
}
return _9;
};
if(_1.isIE){
_2=function(_a){
_a=_8(_a);
if(!_a){
return null;
}
var p;
var _b=_a.path;
if(_a.vars){
var a=[];
for(p in _a.vars){
a.push(p+"="+_a.vars[p]);
}
_a.params.FlashVars=a.join("&");
delete _a.vars;
}
var s="<object id=\""+_a.id+"\" "+"classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" "+"width=\""+_a.width+"\" "+"height=\""+_a.height+"\""+((_a.style)?" style=\""+_a.style+"\"":"")+">"+"<param name=\"movie\" value=\""+_b+"\" />";
if(_a.params){
for(p in _a.params){
s+="<param name=\""+p+"\" value=\""+_a.params[p]+"\" />";
}
}
s+="</object>";
return {id:_a.id,markup:s};
};
_3=(function(){
var _c=10,_d=null;
while(!_d&&_c>7){
try{
_d=new ActiveXObject("ShockwaveFlash.ShockwaveFlash."+_c--);
}
catch(e){
}
}
if(_d){
var v=_d.GetVariable("$version").split(" ")[1].split(",");
return {major:(v[0]!=null)?parseInt(v[0]):0,minor:(v[1]!=null)?parseInt(v[1]):0,rev:(v[2]!=null)?parseInt(v[2]):0};
}
return {major:0,minor:0,rev:0};
})();
_1.addOnWindowUnload(function(){
console.warn("***************UNLOAD");
var _e=function(){
};
var _f=_1.query("object").reverse().style("display","none").forEach(function(i){
for(var p in i){
if((p!="FlashVars")&&_1.isFunction(i[p])){
try{
i[p]=_e;
}
catch(e){
}
}
}
});
});
}else{
_2=function(_10){
_10=_8(_10);
if(!_10){
return null;
}
var p;
var _11=_10.path;
if(_10.vars){
var a=[];
for(p in _10.vars){
a.push(p+"="+_10.vars[p]);
}
_10.params.flashVars=a.join("&");
delete _10.vars;
}
var s="<embed type=\"application/x-shockwave-flash\" "+"src=\""+_11+"\" "+"id=\""+_10.id+"\" "+"width=\""+_10.width+"\" "+"height=\""+_10.height+"\""+((_10.style)?" style=\""+_10.style+"\" ":"")+"pluginspage=\""+window.location.protocol+"//www.adobe.com/go/getflashplayer\" ";
if(_10.params){
for(p in _10.params){
s+=" "+p+"=\""+_10.params[p]+"\"";
}
}
s+=" />";
return {id:_10.id,markup:s};
};
_3=(function(){
var _12=navigator.plugins["Shockwave Flash"];
if(_12&&_12.description){
var v=_12.description.replace(/([a-zA-Z]|\s)+/,"").replace(/(\s+r|\s+b[0-9]+)/,".").split(".");
return {major:(v[0]!=null)?parseInt(v[0]):0,minor:(v[1]!=null)?parseInt(v[1]):0,rev:(v[2]!=null)?parseInt(v[2]):0};
}
return {major:0,minor:0,rev:0};
})();
}
var _13=function(_14,_15){
if(location.href.toLowerCase().indexOf("file://")>-1){
throw new Error("dojox.embed.Flash can't be run directly from a file. To instatiate the required SWF correctly it must be run from a server, like localHost.");
}
this.available=dojox.embed.Flash.available;
this.minimumVersion=_14.minimumVersion||_4;
this.id=null;
this.movie=null;
this.domNode=null;
if(_15){
_15=_1.byId(_15);
}
setTimeout(_1.hitch(this,function(){
if(_14.expressInstall||this.available&&this.available>=this.minimumVersion){
if(_14&&_15){
this.init(_14,_15);
}else{
this.onError("embed.Flash was not provided with the proper arguments.");
}
}else{
if(!this.available){
this.onError("Flash is not installed.");
}else{
this.onError("Flash version detected: "+this.available+" is out of date. Minimum required: "+this.minimumVersion);
}
}
}),100);
};
_1.extend(_13,{onReady:function(_16){
},onLoad:function(_17){
},onError:function(msg){
},_onload:function(){
clearInterval(this._poller);
delete this._poller;
delete this._pollCount;
delete this._pollMax;
this.onLoad(this.movie);
},init:function(_18,_19){
this.destroy();
_19=_1.byId(_19||this.domNode);
if(!_19){
throw new Error("dojox.embed.Flash: no domNode reference has been passed.");
}
var p=0,_1a=false;
this._poller=null;
this._pollCount=0;
this._pollMax=15;
this.pollTime=100;
if(dojox.embed.Flash.initialized){
this.id=dojox.embed.Flash.place(_18,_19);
this.domNode=_19;
setTimeout(_1.hitch(this,function(){
this.movie=this.byId(this.id,_18.doc);
this.onReady(this.movie);
this._poller=setInterval(_1.hitch(this,function(){
try{
p=this.movie.PercentLoaded();
}
catch(e){
console.warn("this.movie.PercentLoaded() failed",e,this.movie);
}
if(p==100){
this._onload();
}else{
if(p==0&&this._pollCount++>this._pollMax){
clearInterval(this._poller);
throw new Error("Building SWF failed.");
}
}
}),this.pollTime);
}),1);
}
},_destroy:function(){
try{
this.domNode.removeChild(this.movie);
}
catch(e){
}
this.id=this.movie=this.domNode=null;
},destroy:function(){
if(!this.movie){
return;
}
var _1b=_1.delegate({id:true,movie:true,domNode:true,onReady:true,onLoad:true});
for(var p in this){
if(!_1b[p]){
delete this[p];
}
}
if(this._poller){
_1.connect(this,"onLoad",this,"_destroy");
}else{
this._destroy();
}
},byId:function(_1c,doc){
doc=doc||document;
if(doc.embeds[_1c]){
return doc.embeds[_1c];
}
if(doc[_1c]){
return doc[_1c];
}
if(window[_1c]){
return window[_1c];
}
if(document[_1c]){
return document[_1c];
}
return null;
}});
_1.mixin(_13,{minSupported:8,available:_3.major,supported:(_3.major>=_3.required),minimumRequired:_3.required,version:_3,initialized:false,onInitialize:function(){
_13.initialized=true;
},__ie_markup__:function(_1d){
return _2(_1d);
},proxy:function(obj,_1e){
_1.forEach((_1.isArray(_1e)?_1e:[_1e]),function(_1f){
this[_1f]=_1.hitch(this,function(){
return (function(){
return eval(this.movie.CallFunction("<invoke name=\""+_1f+"\" returntype=\"javascript\">"+"<arguments>"+_1.map(arguments,function(_20){
return __flash__toXML(_20);
}).join("")+"</arguments>"+"</invoke>"));
}).apply(this,arguments||[]);
});
},obj);
}});
_13.place=function(_21,_22){
var o=_2(_21);
_22=_1.byId(_22);
if(!_22){
_22=_1.doc.createElement("div");
_22.id=o.id+"-container";
_1.body().appendChild(_22);
}
if(o){
_22.innerHTML=o.markup;
return o.id;
}
return null;
};
_13.onInitialize();
_1.setObject("dojox.embed.Flash",_13);
return _13;
});
},"dojox/widget/ColorPicker":function(){
define(["dojo/_base/kernel","dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/_base/html","dojo/_base/connect","dojo/_base/sniff","dojo/_base/window","dojo/_base/event","dojo/dom","dojo/dom-class","dojo/keys","dojo/fx","dojo/dnd/move","dijit/registry","dijit/_base/focus","dijit/form/_FormWidget","dijit/typematic","dojox/color","dojo/i18n","dojo/i18n!./nls/ColorPicker","dojo/i18n!dojo/cldr/nls/number","dojo/text!./ColorPicker/ColorPicker.html"],function(_23,_24,_25,_26,_27,Hub,has,win,_28,DOM,_29,_2a,fx,_2b,_2c,_2d,_2e,_2f,_30,_31,_32,_33,_34){
_23.experimental("dojox.widget.ColorPicker");
var _35=function(hex){
return hex;
};
return _24("dojox.widget.ColorPicker",_2e,{showRgb:true,showHsv:true,showHex:true,webSafe:true,animatePoint:true,slideDuration:250,liveUpdate:false,PICKER_HUE_H:150,PICKER_SAT_VAL_H:150,PICKER_SAT_VAL_W:150,PICKER_HUE_SELECTOR_H:8,PICKER_SAT_SELECTOR_H:10,PICKER_SAT_SELECTOR_W:10,value:"#ffffff",_underlay:_23.moduleUrl("dojox.widget","ColorPicker/images/underlay.png"),_hueUnderlay:_23.moduleUrl("dojox.widget","ColorPicker/images/hue.png"),_pickerPointer:_23.moduleUrl("dojox.widget","ColorPicker/images/pickerPointer.png"),_huePickerPointer:_23.moduleUrl("dojox.widget","ColorPicker/images/hueHandle.png"),_huePickerPointerAlly:_23.moduleUrl("dojox.widget","ColorPicker/images/hueHandleA11y.png"),templateString:_34,postMixInProperties:function(){
if(_29.contains(win.body(),"dijit_a11y")){
this._huePickerPointer=this._huePickerPointerAlly;
}
this._uId=_2c.getUniqueId(this.id);
_25.mixin(this,_31.getLocalization("dojox.widget","ColorPicker"));
_25.mixin(this,_31.getLocalization("dojo.cldr","number"));
this.inherited(arguments);
},postCreate:function(){
this.inherited(arguments);
if(has("ie")<7){
this.colorUnderlay.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+this._underlay+"', sizingMethod='scale')";
this.colorUnderlay.src=this._blankGif.toString();
}
if(!this.showRgb){
this.rgbNode.style.visibility="hidden";
}
if(!this.showHsv){
this.hsvNode.style.visibility="hidden";
}
if(!this.showHex){
this.hexNode.style.visibility="hidden";
}
if(!this.webSafe){
this.safePreviewNode.style.visibility="hidden";
}
},startup:function(){
if(this._started){
return;
}
this._started=true;
this.set("value",this.value);
this._mover=new _2b.boxConstrainedMoveable(this.cursorNode,{box:{t:-(this.PICKER_SAT_SELECTOR_H/2),l:-(this.PICKER_SAT_SELECTOR_W/2),w:this.PICKER_SAT_VAL_W,h:this.PICKER_SAT_VAL_H}});
this._hueMover=new _2b.boxConstrainedMoveable(this.hueCursorNode,{box:{t:-(this.PICKER_HUE_SELECTOR_H/2),l:0,w:0,h:this.PICKER_HUE_H}});
this._subs=[];
this._subs.push(Hub.subscribe("/dnd/move/stop",_25.hitch(this,"_clearTimer")));
this._subs.push(Hub.subscribe("/dnd/move/start",_25.hitch(this,"_setTimer")));
this._keyListeners=[];
this._connects.push(_2f.addKeyListener(this.hueCursorNode,{charOrCode:_2a.UP_ARROW,shiftKey:false,metaKey:false,ctrlKey:false,altKey:false},this,_25.hitch(this,this._updateHueCursorNode),25,25));
this._connects.push(_2f.addKeyListener(this.hueCursorNode,{charOrCode:_2a.DOWN_ARROW,shiftKey:false,metaKey:false,ctrlKey:false,altKey:false},this,_25.hitch(this,this._updateHueCursorNode),25,25));
this._connects.push(_2f.addKeyListener(this.cursorNode,{charOrCode:_2a.UP_ARROW,shiftKey:false,metaKey:false,ctrlKey:false,altKey:false},this,_25.hitch(this,this._updateCursorNode),25,25));
this._connects.push(_2f.addKeyListener(this.cursorNode,{charOrCode:_2a.DOWN_ARROW,shiftKey:false,metaKey:false,ctrlKey:false,altKey:false},this,_25.hitch(this,this._updateCursorNode),25,25));
this._connects.push(_2f.addKeyListener(this.cursorNode,{charOrCode:_2a.LEFT_ARROW,shiftKey:false,metaKey:false,ctrlKey:false,altKey:false},this,_25.hitch(this,this._updateCursorNode),25,25));
this._connects.push(_2f.addKeyListener(this.cursorNode,{charOrCode:_2a.RIGHT_ARROW,shiftKey:false,metaKey:false,ctrlKey:false,altKey:false},this,_25.hitch(this,this._updateCursorNode),25,25));
},_setValueAttr:function(_36){
if(!this._started){
return;
}
this.setColor(_36,true);
},setColor:function(col,_37){
col=_30.fromString(col);
this._updatePickerLocations(col);
this._updateColorInputs(col);
this._updateValue(col,_37);
},_setTimer:function(_38){
if(_38.node!=this.cursorNode){
return;
}
_2d.focus(_38.node);
DOM.setSelectable(this.domNode,false);
this._timer=setInterval(_25.hitch(this,"_updateColor"),45);
},_clearTimer:function(_39){
if(!this._timer){
return;
}
clearInterval(this._timer);
this._timer=null;
this.onChange(this.value);
DOM.setSelectable(this.domNode,true);
},_setHue:function(h){
_27.style(this.colorUnderlay,"backgroundColor",_30.fromHsv(h,100,100).toHex());
},_updateHueCursorNode:function(_3a,_3b,e){
if(_3a!==-1){
var y=_27.style(this.hueCursorNode,"top");
var _3c=this.PICKER_HUE_SELECTOR_H/2;
y+=_3c;
var _3d=false;
if(e.charOrCode==_2a.UP_ARROW){
if(y>0){
y-=1;
_3d=true;
}
}else{
if(e.charOrCode==_2a.DOWN_ARROW){
if(y<this.PICKER_HUE_H){
y+=1;
_3d=true;
}
}
}
y-=_3c;
if(_3d){
_27.style(this.hueCursorNode,"top",y+"px");
}
}else{
this._updateColor(true);
}
},_updateCursorNode:function(_3e,_3f,e){
var _40=this.PICKER_SAT_SELECTOR_H/2;
var _41=this.PICKER_SAT_SELECTOR_W/2;
if(_3e!==-1){
var y=_27.style(this.cursorNode,"top");
var x=_27.style(this.cursorNode,"left");
y+=_40;
x+=_41;
var _42=false;
if(e.charOrCode==_2a.UP_ARROW){
if(y>0){
y-=1;
_42=true;
}
}else{
if(e.charOrCode==_2a.DOWN_ARROW){
if(y<this.PICKER_SAT_VAL_H){
y+=1;
_42=true;
}
}else{
if(e.charOrCode==_2a.LEFT_ARROW){
if(x>0){
x-=1;
_42=true;
}
}else{
if(e.charOrCode==_2a.RIGHT_ARROW){
if(x<this.PICKER_SAT_VAL_W){
x+=1;
_42=true;
}
}
}
}
}
if(_42){
y-=_40;
x-=_41;
_27.style(this.cursorNode,"top",y+"px");
_27.style(this.cursorNode,"left",x+"px");
}
}else{
this._updateColor(true);
}
},_updateColor:function(_43){
var _44=this.PICKER_HUE_SELECTOR_H/2,_45=this.PICKER_SAT_SELECTOR_H/2,_46=this.PICKER_SAT_SELECTOR_W/2;
var _47=_27.style(this.hueCursorNode,"top")+_44,_48=_27.style(this.cursorNode,"top")+_45,_49=_27.style(this.cursorNode,"left")+_46,h=Math.round(360-(_47/this.PICKER_HUE_H*360)),col=_30.fromHsv(h,_49/this.PICKER_SAT_VAL_W*100,100-(_48/this.PICKER_SAT_VAL_H*100));
this._updateColorInputs(col);
this._updateValue(col,_43);
if(h!=this._hue){
this._setHue(h);
}
},_colorInputChange:function(e){
var col,_4a=false;
switch(e.target){
case this.hexCode:
col=_30.fromString(e.target.value);
_4a=true;
break;
case this.Rval:
case this.Gval:
case this.Bval:
col=_30.fromArray([this.Rval.value,this.Gval.value,this.Bval.value]);
_4a=true;
break;
case this.Hval:
case this.Sval:
case this.Vval:
col=_30.fromHsv(this.Hval.value,this.Sval.value,this.Vval.value);
_4a=true;
break;
}
if(_4a){
this._updatePickerLocations(col);
this._updateColorInputs(col);
this._updateValue(col,true);
}
},_updateValue:function(col,_4b){
var hex=col.toHex();
this.value=this.valueNode.value=hex;
if(_4b&&(!this._timer||this.liveUpdate)){
this.onChange(hex);
}
},_updatePickerLocations:function(col){
var _4c=this.PICKER_HUE_SELECTOR_H/2,_4d=this.PICKER_SAT_SELECTOR_H/2,_4e=this.PICKER_SAT_SELECTOR_W/2;
var hsv=col.toHsv(),_4f=Math.round(this.PICKER_HUE_H-hsv.h/360*this.PICKER_HUE_H)-_4c,_50=Math.round(hsv.s/100*this.PICKER_SAT_VAL_W)-_4e,_51=Math.round(this.PICKER_SAT_VAL_H-hsv.v/100*this.PICKER_SAT_VAL_H)-_4d;
if(this.animatePoint){
fx.slideTo({node:this.hueCursorNode,duration:this.slideDuration,top:_4f,left:0}).play();
fx.slideTo({node:this.cursorNode,duration:this.slideDuration,top:_51,left:_50}).play();
}else{
_27.style(this.hueCursorNode,"top",_4f+"px");
_27.style(this.cursorNode,{left:_50+"px",top:_51+"px"});
}
if(hsv.h!=this._hue){
this._setHue(hsv.h);
}
},_updateColorInputs:function(col){
var hex=col.toHex();
if(this.showRgb){
this.Rval.value=col.r;
this.Gval.value=col.g;
this.Bval.value=col.b;
}
if(this.showHsv){
var hsv=col.toHsv();
this.Hval.value=Math.round((hsv.h));
this.Sval.value=Math.round(hsv.s);
this.Vval.value=Math.round(hsv.v);
}
if(this.showHex){
this.hexCode.value=hex;
}
this.previewNode.style.backgroundColor=hex;
if(this.webSafe){
this.safePreviewNode.style.backgroundColor=_35(hex);
}
},_setHuePoint:function(evt){
var _52=this.PICKER_HUE_SELECTOR_H/2;
var _53=evt.layerY-_52;
if(this.animatePoint){
fx.slideTo({node:this.hueCursorNode,duration:this.slideDuration,top:_53,left:0,onEnd:_25.hitch(this,function(){
this._updateColor(false);
_2d.focus(this.hueCursorNode);
})}).play();
}else{
_27.style(this.hueCursorNode,"top",_53+"px");
this._updateColor(false);
}
},_setPoint:function(evt){
var _54=this.PICKER_SAT_SELECTOR_H/2;
var _55=this.PICKER_SAT_SELECTOR_W/2;
var _56=evt.layerY-_54;
var _57=evt.layerX-_55;
if(evt){
_2d.focus(evt.target);
}
if(this.animatePoint){
fx.slideTo({node:this.cursorNode,duration:this.slideDuration,top:_56,left:_57,onEnd:_25.hitch(this,function(){
this._updateColor(true);
_2d.focus(this.cursorNode);
})}).play();
}else{
_27.style(this.cursorNode,{left:_57+"px",top:_56+"px"});
this._updateColor(false);
}
},_handleKey:function(e){
},focus:function(){
if(!this.focused){
_2d.focus(this.focusNode);
}
},_stopDrag:function(e){
_28.stop(e);
},destroy:function(){
this.inherited(arguments);
_26.forEach(this._subs,function(sub){
Hub.unsubscribe(sub);
});
delete this._subs;
}});
});
},"dojox/form/uploader/FileList":function(){
define(["dojo/_base/fx","dojo/dom-style","dojo/dom-class","dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dijit/_base/manager","dojox/form/uploader/_Base","dojo/text!../resources/UploaderFileList.html"],function(fx,_58,_59,_5a,_5b,_5c,_5d,_5e,_5f){
return _5a("dojox.form.uploader.FileList",_5e,{uploaderId:"",uploader:null,headerIndex:"#",headerType:"Type",headerFilename:"File Name",headerFilesize:"Size",_upCheckCnt:0,rowAmt:0,templateString:_5f,postCreate:function(){
this.setUploader();
this.hideProgress();
},reset:function(){
for(var i=0;i<this.rowAmt;i++){
this.listNode.deleteRow(0);
}
this.rowAmt=0;
},setUploader:function(){
if(!this.uploaderId&&!this.uploader){
console.warn("uploaderId not passed to UploaderFileList");
}else{
if(this.uploaderId&&!this.uploader){
this.uploader=_5d.byId(this.uploaderId);
}else{
if(this._upCheckCnt>4){
console.warn("uploader not found for ID ",this.uploaderId);
return;
}
}
}
if(this.uploader){
this.connect(this.uploader,"onChange","_onUploaderChange");
this.connect(this.uploader,"reset","reset");
this.connect(this.uploader,"onBegin",function(){
this.showProgress(true);
});
this.connect(this.uploader,"onProgress","_progress");
this.connect(this.uploader,"onComplete",function(){
setTimeout(_5b.hitch(this,function(){
this.hideProgress(true);
}),1250);
});
if(!(this._fileSizeAvail={"html5":1,"flash":1}[this.uploader.uploadType])){
this.sizeHeader.style.display="none";
}
}else{
this._upCheckCnt++;
setTimeout(_5b.hitch(this,"setUploader"),250);
}
},hideProgress:function(_60){
var o=_60?{ani:true,endDisp:"none",beg:15,end:0}:{endDisp:"none",ani:false};
this._hideShowProgress(o);
},showProgress:function(_61){
var o=_61?{ani:true,endDisp:"block",beg:0,end:15}:{endDisp:"block",ani:false};
this._hideShowProgress(o);
},_progress:function(_62){
this.percentTextNode.innerHTML=_62.percent;
_58.set(this.percentBarNode,"width",_62.percent);
},_hideShowProgress:function(o){
var _63=this.progressNode;
var _64=function(){
_58.set(_63,"display",o.endDisp);
};
if(o.ani){
_58.set(_63,"display","block");
fx.animateProperty({node:_63,properties:{height:{start:o.beg,end:o.end,units:"px"}},onEnd:_64}).play();
}else{
_64();
}
},_onUploaderChange:function(_65){
this.reset();
_5c.forEach(_65,function(f,i){
this._addRow(i+1,this.getFileType(f.name),f.name,f.size);
},this);
},_addRow:function(_66,_67,_68,_69){
var c,r=this.listNode.insertRow(-1);
c=r.insertCell(-1);
_59.add(c,"dojoxUploaderIndex");
c.innerHTML=_66;
c=r.insertCell(-1);
_59.add(c,"dojoxUploaderIcon");
c.innerHTML=_67;
c=r.insertCell(-1);
_59.add(c,"dojoxUploaderFileName");
c.innerHTML=_68;
if(this._fileSizeAvail){
c=r.insertCell(-1);
_59.add(c,"dojoxUploaderSize");
c.innerHTML=this.convertBytes(_69).value;
}
this.rowAmt++;
}});
});
},"dojox/form/uploader/_Base":function(){
define(["dojo/dom-form","dojo/dom-style","dojo/dom-construct","dojo/dom-attr","dojo/has","dojo/_base/declare","dojo/_base/event","dijit/_Widget","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin"],function(_6a,_6b,_6c,_6d,has,_6e,_6f,_70,_71,_72){
has.add("FormData",function(){
return !!window.FormData;
});
has.add("xhr-sendAsBinary",function(){
var xhr=window.XMLHttpRequest&&new window.XMLHttpRequest();
return xhr&&!!xhr.sendAsBinary;
});
has.add("file-multiple",function(){
return !!({"true":1,"false":1}[_6d.get(document.createElement("input",{type:"file"}),"multiple")]);
});
return _6e("dojox.form.uploader._Base",[_70,_71,_72],{getForm:function(){
if(!this.form){
var n=this.domNode;
while(n&&n.tagName&&n!==document.body){
if(n.tagName.toLowerCase()=="form"){
this.form=n;
break;
}
n=n.parentNode;
}
}
return this.form;
},getUrl:function(){
if(this.uploadUrl){
this.url=this.uploadUrl;
}
if(this.url){
return this.url;
}
if(this.getForm()){
this.url=this.form.action;
}
return this.url;
},connectForm:function(){
this.url=this.getUrl();
if(!this._fcon&&!!this.getForm()){
this._fcon=true;
this.connect(this.form,"onsubmit",function(evt){
_6f.stop(evt);
this.submit(this.form);
});
}
},supports:function(_73){
switch(_73){
case "multiple":
if(this.force=="flash"||this.force=="iframe"){
return false;
}
return has("file-multiple");
case "FormData":
return has(_73);
case "sendAsBinary":
return has("xhr-sendAsBinary");
}
return false;
},getMimeType:function(){
return "application/octet-stream";
},getFileType:function(_74){
return _74.substring(_74.lastIndexOf(".")+1).toUpperCase();
},convertBytes:function(_75){
var kb=Math.round(_75/1024*100000)/100000;
var mb=Math.round(_75/1048576*100000)/100000;
var gb=Math.round(_75/1073741824*100000)/100000;
var _76=_75;
if(kb>1){
_76=kb.toFixed(1)+" kb";
}
if(mb>1){
_76=mb.toFixed(1)+" mb";
}
if(gb>1){
_76=gb.toFixed(1)+" gb";
}
return {kb:kb,mb:mb,gb:gb,bytes:_75,value:_76};
}});
});
},"dojox/html/styles":function(){
define(["dojo/_base/lang","dojo/_base/array","dojo/_base/window","dojo/_base/sniff"],function(_77,_78,_79,has){
var dh=_77.getObject("dojox.html",true);
var _7a={};
var _7b={};
var _7c=[];
dh.insertCssRule=function(_7d,_7e,_7f){
var ss=dh.getDynamicStyleSheet(_7f);
var _80=_7d+" {"+_7e+"}";
if(has("ie")){
ss.cssText+=_80;
}else{
if(ss.sheet){
ss.sheet.insertRule(_80,ss._indicies.length);
}else{
ss.appendChild(_79.doc.createTextNode(_80));
}
}
ss._indicies.push(_7d+" "+_7e);
return _7d;
};
dh.removeCssRule=function(_81,_82,_83){
var ss;
var _84=-1;
var nm;
var i;
for(nm in _7a){
if(_83&&_83!==nm){
continue;
}
ss=_7a[nm];
for(i=0;i<ss._indicies.length;i++){
if(_81+" "+_82===ss._indicies[i]){
_84=i;
break;
}
}
if(_84>-1){
break;
}
}
if(!ss){
console.warn("No dynamic style sheet has been created from which to remove a rule.");
return false;
}
if(_84===-1){
console.warn("The css rule was not found and could not be removed.");
return false;
}
ss._indicies.splice(_84,1);
if(has("ie")){
ss.removeRule(_84);
}else{
if(ss.sheet){
ss.sheet.deleteRule(_84);
}
}
return true;
};
dh.modifyCssRule=function(_85,_86,_87){
};
dh.getStyleSheet=function(_88){
if(_7a[_88||"default"]){
return _7a[_88||"default"];
}
if(!_88){
return false;
}
var _89=dh.getStyleSheets();
if(_89[_88]){
return dh.getStyleSheets()[_88];
}
var nm;
for(nm in _89){
if(_89[nm].href&&_89[nm].href.indexOf(_88)>-1){
return _89[nm];
}
}
return false;
};
dh.getDynamicStyleSheet=function(_8a){
if(!_8a){
_8a="default";
}
if(!_7a[_8a]){
if(_79.doc.createStyleSheet){
_7a[_8a]=_79.doc.createStyleSheet();
if(has("ie")<9){
_7a[_8a].title=_8a;
}
}else{
_7a[_8a]=_79.doc.createElement("style");
_7a[_8a].setAttribute("type","text/css");
_79.doc.getElementsByTagName("head")[0].appendChild(_7a[_8a]);
}
_7a[_8a]._indicies=[];
}
return _7a[_8a];
};
dh.enableStyleSheet=function(_8b){
var ss=dh.getStyleSheet(_8b);
if(ss){
if(ss.sheet){
ss.sheet.disabled=false;
}else{
ss.disabled=false;
}
}
};
dh.disableStyleSheet=function(_8c){
var ss=dh.getStyleSheet(_8c);
if(ss){
if(ss.sheet){
ss.sheet.disabled=true;
}else{
ss.disabled=true;
}
}
};
dh.activeStyleSheet=function(_8d){
var _8e=dh.getToggledStyleSheets();
var i;
if(arguments.length===1){
_78.forEach(_8e,function(s){
s.disabled=(s.title===_8d)?false:true;
});
}else{
for(i=0;i<_8e.length;i++){
if(_8e[i].disabled===false){
return _8e[i];
}
}
}
return true;
};
dh.getPreferredStyleSheet=function(){
};
dh.getToggledStyleSheets=function(){
var nm;
if(!_7c.length){
var _8f=dh.getStyleSheets();
for(nm in _8f){
if(_8f[nm].title){
_7c.push(_8f[nm]);
}
}
}
return _7c;
};
dh.getStyleSheets=function(){
if(_7b.collected){
return _7b;
}
var _90=_79.doc.styleSheets;
_78.forEach(_90,function(n){
var s=(n.sheet)?n.sheet:n;
var _91=s.title||s.href;
if(has("ie")){
if(s.cssText.indexOf("#default#VML")===-1){
if(s.href){
_7b[_91]=s;
}else{
if(s.imports.length){
_78.forEach(s.imports,function(si){
_7b[si.title||si.href]=si;
});
}else{
_7b[_91]=s;
}
}
}
}else{
_7b[_91]=s;
_7b[_91].id=s.ownerNode.id;
_78.forEach(s.cssRules,function(r){
if(r.href){
_7b[r.href]=r.styleSheet;
_7b[r.href].id=s.ownerNode.id;
}
});
}
});
_7b.collected=true;
return _7b;
};
return dh;
});
},"dojox/html/format":function(){
define(["dojo/_base/kernel","./entities","dojo/_base/array","dojo/_base/window","dojo/_base/sniff"],function(_92,_93,_94,_95,has){
var dhf=_92.getObject("dojox.html.format",true);
dhf.prettyPrint=function(_96,_97,_98,map,_99){
var _9a=[];
var _9b=0;
var _9c=[];
var _9d="\t";
var _9e="";
var _9f=[];
var i;
var _a0=/[=]([^"']+?)(\s|>)/g;
var _a1=/style=("[^"]*"|'[^']*'|\S*)/gi;
var _a2=/[\w-]+=("[^"]*"|'[^']*'|\S*)/gi;
if(_97&&_97>0&&_97<10){
_9d="";
for(i=0;i<_97;i++){
_9d+=" ";
}
}
var _a3=_95.doc.createElement("div");
_a3.innerHTML=_96;
var _a4=_93.encode;
var _a5=_93.decode;
var _a6=function(tag){
switch(tag){
case "a":
case "b":
case "strong":
case "s":
case "strike":
case "i":
case "u":
case "em":
case "sup":
case "sub":
case "span":
case "font":
case "big":
case "cite":
case "q":
case "small":
return true;
default:
return false;
}
};
var div=_a3.ownerDocument.createElement("div");
var _a7=function(_a8){
var _a9=_a8.cloneNode(false);
div.appendChild(_a9);
var _aa=div.innerHTML;
div.innerHTML="";
return _aa;
};
var _ab=function(){
var i,txt="";
for(i=0;i<_9b;i++){
txt+=_9d;
}
return txt.length;
};
var _ac=function(){
var i;
for(i=0;i<_9b;i++){
_9a.push(_9d);
}
};
var _ad=function(){
_9a.push("\n");
};
var _ae=function(n){
_9e+=_a4(n.nodeValue,map);
};
var _af=function(txt){
var i;
var _b0;
var _b1=txt.split("\n");
for(i=0;i<_b1.length;i++){
_b1[i]=_92.trim(_b1[i]);
}
txt=_b1.join(" ");
txt=_92.trim(txt);
if(txt!==""){
var _b2=[];
if(_98&&_98>0){
var _b3=_ab();
var _b4=_98;
if(_98>_b3){
_b4-=_b3;
}
while(txt){
if(txt.length>_98){
for(i=_b4;(i>0&&txt.charAt(i)!==" ");i--){
}
if(!i){
for(i=_b4;(i<txt.length&&txt.charAt(i)!==" ");i++){
}
}
var _b5=txt.substring(0,i);
_b5=_92.trim(_b5);
txt=_92.trim(txt.substring((i==txt.length)?txt.length:i+1,txt.length));
if(_b5){
_b0="";
for(i=0;i<_9b;i++){
_b0+=_9d;
}
_b5=_b0+_b5+"\n";
}
_b2.push(_b5);
}else{
_b0="";
for(i=0;i<_9b;i++){
_b0+=_9d;
}
txt=_b0+txt+"\n";
_b2.push(txt);
txt=null;
}
}
return _b2.join("");
}else{
_b0="";
for(i=0;i<_9b;i++){
_b0+=_9d;
}
txt=_b0+txt+"\n";
return txt;
}
}else{
return "";
}
};
var _b6=function(txt){
if(txt){
txt=txt.replace(/&quot;/gi,"\"");
txt=txt.replace(/&gt;/gi,">");
txt=txt.replace(/&lt;/gi,"<");
txt=txt.replace(/&amp;/gi,"&");
}
return txt;
};
var _b7=function(txt){
if(txt){
txt=_b6(txt);
var i,t,c,_b8;
var _b9=0;
var _ba=txt.split("\n");
var _bb=[];
for(i=0;i<_ba.length;i++){
var _bc=_ba[i];
var _bd=(_bc.indexOf("\n")>-1);
_bc=_92.trim(_bc);
if(_bc){
var _be=_b9;
for(c=0;c<_bc.length;c++){
var ch=_bc.charAt(c);
if(ch==="{"){
_b9++;
}else{
if(ch==="}"){
_b9--;
_be=_b9;
}
}
}
_b8="";
for(t=0;t<_9b+_be;t++){
_b8+=_9d;
}
_bb.push(_b8+_bc+"\n");
}else{
if(_bd&&i===0){
_bb.push("\n");
}
}
}
txt=_bb.join("");
}
return txt;
};
var _bf=function(_c0){
var _c1=_c0.nodeName.toLowerCase();
var _c2=_92.trim(_a7(_c0));
var tag=_c2.substring(0,_c2.indexOf(">")+1);
tag=tag.replace(_a0,"=\"$1\"$2");
tag=tag.replace(_a1,function(_c3){
var sL=_c3.substring(0,6);
var _c4=_c3.substring(6,_c3.length);
var _c5=_c4.charAt(0);
_c4=_92.trim(_c4.substring(1,_c4.length-1));
_c4=_c4.split(";");
var _c6=[];
_94.forEach(_c4,function(s){
s=_92.trim(s);
if(s){
s=s.substring(0,s.indexOf(":")).toLowerCase()+s.substring(s.indexOf(":"),s.length);
_c6.push(s);
}
});
_c6=_c6.sort();
_c4=_c6.join("; ");
var ts=_92.trim(_c4);
if(!ts||ts===";"){
return "";
}else{
_c4+=";";
return sL+_c5+_c4+_c5;
}
});
var _c7=[];
tag=tag.replace(_a2,function(_c8){
_c7.push(_92.trim(_c8));
return "";
});
_c7=_c7.sort();
tag="<"+_c1;
if(_c7.length){
tag+=" "+_c7.join(" ");
}
if(_c2.indexOf("</")!=-1){
_9c.push(_c1);
tag+=">";
}else{
if(_99){
tag+=" />";
}else{
tag+=">";
}
_9c.push(false);
}
var _c9=_a6(_c1);
_9f.push(_c9);
if(_9e&&!_c9){
_9a.push(_af(_9e));
_9e="";
}
if(!_c9){
_ac();
_9a.push(tag);
_ad();
_9b++;
}else{
_9e+=tag;
}
};
var _ca=function(){
var _cb=_9f.pop();
if(_9e&&!_cb){
_9a.push(_af(_9e));
_9e="";
}
var ct=_9c.pop();
if(ct){
ct="</"+ct+">";
if(!_cb){
_9b--;
_ac();
_9a.push(ct);
_ad();
}else{
_9e+=ct;
}
}else{
_9b--;
}
};
var _cc=function(n){
var _cd=_a5(n.nodeValue,map);
_ac();
_9a.push("<!--");
_ad();
_9b++;
_9a.push(_af(_cd));
_9b--;
_ac();
_9a.push("-->");
_ad();
};
var _ce=function(_cf){
var _d0=_cf.childNodes;
if(_d0){
var i;
for(i=0;i<_d0.length;i++){
var n=_d0[i];
if(n.nodeType===1){
var tg=_92.trim(n.tagName.toLowerCase());
if(has("ie")&&n.parentNode!=_cf){
continue;
}
if(tg&&tg.charAt(0)==="/"){
continue;
}else{
_bf(n);
if(tg==="script"){
_9a.push(_b7(n.innerHTML));
}else{
if(tg==="pre"){
var _d1=n.innerHTML;
if(has("mozilla")){
_d1=_d1.replace("<br>","\n");
_d1=_d1.replace("<pre>","");
_d1=_d1.replace("</pre>","");
}
if(_d1.charAt(_d1.length-1)!=="\n"){
_d1+="\n";
}
_9a.push(_d1);
}else{
_ce(n);
}
}
_ca();
}
}else{
if(n.nodeType===3||n.nodeType===4){
_ae(n);
}else{
if(n.nodeType===8){
_cc(n);
}
}
}
}
}
};
_ce(_a3);
if(_9e){
_9a.push(_af(_9e));
_9e="";
}
return _9a.join("");
};
return dhf;
});
},"dojox/layout/ContentPane":function(){
define(["dojo/_base/lang","dojo/_base/xhr","dijit/layout/ContentPane","dojox/html/_base","dojo/_base/declare"],function(_d2,_d3,_d4,_d5,_d6){
return _d6("dojox.layout.ContentPane",_d4,{adjustPaths:false,cleanContent:false,renderStyles:false,executeScripts:true,scriptHasHooks:false,ioMethod:_d3.get,ioArgs:{},onExecError:function(e){
},_setContent:function(_d7){
var _d8=this._contentSetter;
if(!(_d8&&_d8 instanceof _d5._ContentSetter)){
_d8=this._contentSetter=new _d5._ContentSetter({node:this.containerNode,_onError:_d2.hitch(this,this._onError),onContentError:_d2.hitch(this,function(e){
var _d9=this.onContentError(e);
try{
this.containerNode.innerHTML=_d9;
}
catch(e){
console.error("Fatal "+this.id+" could not change content due to "+e.message,e);
}
})});
}
this._contentSetterParams={adjustPaths:Boolean(this.adjustPaths&&(this.href||this.referencePath)),referencePath:this.href||this.referencePath,renderStyles:this.renderStyles,executeScripts:this.executeScripts,scriptHasHooks:this.scriptHasHooks,scriptHookReplacement:"dijit.byId('"+this.id+"')"};
this.inherited("_setContent",arguments);
}});
});
},"dojox/main":function(){
define(["dojo/_base/kernel"],function(_da){
return _da.dojox;
});
},"dojox/html/_base":function(){
define(["dojo/_base/declare","dojo/Deferred","dojo/dom-construct","dojo/html","dojo/_base/kernel","dojo/_base/lang","dojo/ready","dojo/_base/sniff","dojo/_base/url","dojo/_base/xhr","dojo/when","dojo/_base/window"],function(_db,_dc,_dd,_de,_df,_e0,_e1,has,_e2,_e3,_e4,_e5){
var _e6=_df.getObject("dojox.html",true);
if(has("ie")){
var _e7=/(AlphaImageLoader\([^)]*?src=(['"]))(?![a-z]+:|\/)([^\r\n;}]+?)(\2[^)]*\)\s*[;}]?)/g;
}
var _e8=/(?:(?:@import\s*(['"])(?![a-z]+:|\/)([^\r\n;{]+?)\1)|url\(\s*(['"]?)(?![a-z]+:|\/)([^\r\n;]+?)\3\s*\))([a-z, \s]*[;}]?)/g;
var _e9=_e6._adjustCssPaths=function(_ea,_eb){
if(!_eb||!_ea){
return;
}
if(_e7){
_eb=_eb.replace(_e7,function(_ec,pre,_ed,url,_ee){
return pre+(new _e2(_ea,"./"+url).toString())+_ee;
});
}
return _eb.replace(_e8,function(_ef,_f0,_f1,_f2,_f3,_f4){
if(_f1){
return "@import \""+(new _e2(_ea,"./"+_f1).toString())+"\""+_f4;
}else{
return "url("+(new _e2(_ea,"./"+_f3).toString())+")"+_f4;
}
});
};
var _f5=/(<[a-z][a-z0-9]*\s[^>]*)(?:(href|src)=(['"]?)([^>]*?)\3|style=(['"]?)([^>]*?)\5)([^>]*>)/gi;
var _f6=_e6._adjustHtmlPaths=function(_f7,_f8){
var url=_f7||"./";
return _f8.replace(_f5,function(tag,_f9,_fa,_fb,_fc,_fd,_fe,end){
return _f9+(_fa?(_fa+"="+_fb+(new _e2(url,_fc).toString())+_fb):("style="+_fd+_e9(url,_fe)+_fd))+end;
});
};
var _ff=_e6._snarfStyles=function(_100,cont,_101){
_101.attributes=[];
cont=cont.replace(/<[!][-][-](.|\s)*?[-][-]>/g,function(_102){
return _102.replace(/<(\/?)style\b/ig,"&lt;$1Style").replace(/<(\/?)link\b/ig,"&lt;$1Link").replace(/@import "/ig,"@ import \"");
});
return cont.replace(/(?:<style([^>]*)>([\s\S]*?)<\/style>|<link\s+(?=[^>]*rel=['"]?stylesheet)([^>]*?href=(['"])([^>]*?)\4[^>\/]*)\/?>)/gi,function(_103,_104,_105,_106,_107,href){
var i,attr=(_104||_106||"").replace(/^\s*([\s\S]*?)\s*$/i,"$1");
if(_105){
i=_101.push(_100?_e9(_100,_105):_105);
}else{
i=_101.push("@import \""+href+"\";");
attr=attr.replace(/\s*(?:rel|href)=(['"])?[^\s]*\1\s*/gi,"");
}
if(attr){
attr=attr.split(/\s+/);
var _108={},tmp;
for(var j=0,e=attr.length;j<e;j++){
tmp=attr[j].split("=");
_108[tmp[0]]=tmp[1].replace(/^\s*['"]?([\s\S]*?)['"]?\s*$/,"$1");
}
_101.attributes[i-1]=_108;
}
return "";
});
};
var _109=_e6._snarfScripts=function(cont,_10a){
_10a.code="";
cont=cont.replace(/<[!][-][-](.|\s)*?[-][-]>/g,function(_10b){
return _10b.replace(/<(\/?)script\b/ig,"&lt;$1Script");
});
function _10c(src){
if(_10a.downloadRemote){
src=src.replace(/&([a-z0-9#]+);/g,function(m,name){
switch(name){
case "amp":
return "&";
case "gt":
return ">";
case "lt":
return "<";
default:
return name.charAt(0)=="#"?String.fromCharCode(name.substring(1)):"&"+name+";";
}
});
_e3.get({url:src,sync:true,load:function(code){
_10a.code+=code+";";
},error:_10a.errBack});
}
};
return cont.replace(/<script\s*(?![^>]*type=['"]?(?:dojo\/|text\/html\b))[^>]*?(?:src=(['"]?)([^>]*?)\1[^>]*)?>([\s\S]*?)<\/script>/gi,function(_10d,_10e,src,code){
if(src){
_10c(src);
}else{
_10a.code+=code;
}
return "";
});
};
var _10f=_e6.evalInGlobal=function(code,_110){
_110=_110||_e5.doc.body;
var n=_110.ownerDocument.createElement("script");
n.type="text/javascript";
_110.appendChild(n);
n.text=code;
};
_e6._ContentSetter=_db(_de._ContentSetter,{adjustPaths:false,referencePath:".",renderStyles:false,executeScripts:false,scriptHasHooks:false,scriptHookReplacement:null,_renderStyles:function(_111){
this._styleNodes=[];
var st,att,_112,doc=this.node.ownerDocument;
var head=doc.getElementsByTagName("head")[0];
for(var i=0,e=_111.length;i<e;i++){
_112=_111[i];
att=_111.attributes[i];
st=doc.createElement("style");
st.setAttribute("type","text/css");
for(var x in att){
st.setAttribute(x,att[x]);
}
this._styleNodes.push(st);
head.appendChild(st);
if(st.styleSheet){
st.styleSheet.cssText=_112;
}else{
st.appendChild(doc.createTextNode(_112));
}
}
},empty:function(){
this.inherited("empty",arguments);
this._styles=[];
},onBegin:function(){
this.inherited("onBegin",arguments);
var cont=this.content,node=this.node;
var _113=this._styles;
if(_e0.isString(cont)){
if(this.adjustPaths&&this.referencePath){
cont=_f6(this.referencePath,cont);
}
if(this.renderStyles||this.cleanContent){
cont=_ff(this.referencePath,cont,_113);
}
if(this.executeScripts){
var _114=this;
var _115={downloadRemote:true,errBack:function(e){
_114._onError.call(_114,"Exec","Error downloading remote script in \""+_114.id+"\"",e);
}};
cont=_109(cont,_115);
this._code=_115.code;
}
}
this.content=cont;
},onEnd:function(){
var code=this._code,_116=this._styles;
if(this._styleNodes&&this._styleNodes.length){
while(this._styleNodes.length){
_dd.destroy(this._styleNodes.pop());
}
}
if(this.renderStyles&&_116&&_116.length){
this._renderStyles(_116);
}
var d=new _dc();
var _117=this.getInherited(arguments),args=arguments,_118=_e0.hitch(this,function(){
_117.apply(this,args);
_e4(this.parseDeferred,function(){
d.resolve();
});
});
if(this.executeScripts&&code){
if(this.cleanContent){
code=code.replace(/(<!--|(?:\/\/)?-->|<!\[CDATA\[|\]\]>)/g,"");
}
if(this.scriptHasHooks){
code=code.replace(/_container_(?!\s*=[^=])/g,this.scriptHookReplacement);
}
try{
_10f(code,this.node);
}
catch(e){
this._onError("Exec","Error eval script in "+this.id+", "+e.message,e);
}
_e1(_118);
}else{
_118();
}
return d.promise;
},tearDown:function(){
this.inherited(arguments);
delete this._styles;
if(this._styleNodes&&this._styleNodes.length){
while(this._styleNodes.length){
_dd.destroy(this._styleNodes.pop());
}
}
delete this._styleNodes;
_e0.mixin(this,_e6._ContentSetter.prototype);
}});
_e6.set=function(node,cont,_119){
if(!_119){
return _de._setNodeContent(node,cont,true);
}else{
var op=new _e6._ContentSetter(_e0.mixin(_119,{content:cont,node:node}));
return op.set();
}
};
return _e6;
});
},"dojox/form/nls/Uploader":function(){
define({root:({label:"Select Files..."}),"zh":true,"zh-tw":true,"uk":true,"tr":true,"th":true,"sv":true,"sl":true,"sk":true,"ru":true,"ro":true,"pt":true,"pl":true,"nl":true,"nb":true,"ko":true,"kk":true,"ja":true,"it":true,"hu":true,"hr":true,"he":true,"fr":true,"fi":true,"es":true,"el":true,"de":true,"da":true,"cs":true,"ca":true,"bg":true});
},"dojox/form/nls/pt/Uploader":function(){
define(({label:"Selecione Arquivos..."}));
},"dojox/form/nls/pt/Uploader":function(){
define(({label:"Selecione Arquivos..."}));
},"dojox/color":function(){
define(["./color/_base"],function(_11a){
return _11a;
});
},"dojox/form/uploader/_IFrame":function(){
define(["dojo/query","dojo/dom-construct","dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/dom-form","dojo/request/iframe"],function(_11b,_11c,_11d,lang,_11e,_11f,_120){
return _11d("dojox.form.uploader._IFrame",[],{postMixInProperties:function(){
this.inherited(arguments);
if(this.uploadType==="iframe"){
this.uploadType="iframe";
this.upload=this.uploadIFrame;
}
},uploadIFrame:function(data){
var _121={},_122,form=this.getForm(),url=this.getUrl(),self=this;
data=data||{};
data.uploadType=this.uploadType;
_122=_11c.place("<form enctype=\"multipart/form-data\" method=\"post\"></form>",this.domNode);
_11e.forEach(this._inputs,function(n,i){
if(n.value!==""){
_122.appendChild(n);
_121[n.name]=n.value;
}
},this);
if(data){
for(nm in data){
if(_121[nm]===undefined){
_11c.create("input",{name:nm,value:data[nm],type:"hidden"},_122);
}
}
}
_120.post(url,{form:_122,handleAs:"json",content:data}).then(function(_123){
_11c.destroy(_122);
if(data["ERROR"]||data["error"]){
self.onError(_123);
}else{
self.onComplete(_123);
}
},function(err){
console.error("error parsing server result",err);
_11c.destroy(_122);
self.onError(err);
});
}});
});
},"dojox/color/_base":function(){
define(["../main","dojo/_base/lang","dojo/_base/Color","dojo/colors"],function(_124,lang,_125,_126){
var cx=lang.getObject("color",true,_124);
cx.Color=_125;
cx.blend=_125.blendColors;
cx.fromRgb=_125.fromRgb;
cx.fromHex=_125.fromHex;
cx.fromArray=_125.fromArray;
cx.fromString=_125.fromString;
cx.greyscale=_126.makeGrey;
lang.mixin(cx,{fromCmy:function(cyan,_127,_128){
if(lang.isArray(cyan)){
_127=cyan[1],_128=cyan[2],cyan=cyan[0];
}else{
if(lang.isObject(cyan)){
_127=cyan.m,_128=cyan.y,cyan=cyan.c;
}
}
cyan/=100,_127/=100,_128/=100;
var r=1-cyan,g=1-_127,b=1-_128;
return new _125({r:Math.round(r*255),g:Math.round(g*255),b:Math.round(b*255)});
},fromCmyk:function(cyan,_129,_12a,_12b){
if(lang.isArray(cyan)){
_129=cyan[1],_12a=cyan[2],_12b=cyan[3],cyan=cyan[0];
}else{
if(lang.isObject(cyan)){
_129=cyan.m,_12a=cyan.y,_12b=cyan.b,cyan=cyan.c;
}
}
cyan/=100,_129/=100,_12a/=100,_12b/=100;
var r,g,b;
r=1-Math.min(1,cyan*(1-_12b)+_12b);
g=1-Math.min(1,_129*(1-_12b)+_12b);
b=1-Math.min(1,_12a*(1-_12b)+_12b);
return new _125({r:Math.round(r*255),g:Math.round(g*255),b:Math.round(b*255)});
},fromHsl:function(hue,_12c,_12d){
if(lang.isArray(hue)){
_12c=hue[1],_12d=hue[2],hue=hue[0];
}else{
if(lang.isObject(hue)){
_12c=hue.s,_12d=hue.l,hue=hue.h;
}
}
_12c/=100;
_12d/=100;
while(hue<0){
hue+=360;
}
while(hue>=360){
hue-=360;
}
var r,g,b;
if(hue<120){
r=(120-hue)/60,g=hue/60,b=0;
}else{
if(hue<240){
r=0,g=(240-hue)/60,b=(hue-120)/60;
}else{
r=(hue-240)/60,g=0,b=(360-hue)/60;
}
}
r=2*_12c*Math.min(r,1)+(1-_12c);
g=2*_12c*Math.min(g,1)+(1-_12c);
b=2*_12c*Math.min(b,1)+(1-_12c);
if(_12d<0.5){
r*=_12d,g*=_12d,b*=_12d;
}else{
r=(1-_12d)*r+2*_12d-1;
g=(1-_12d)*g+2*_12d-1;
b=(1-_12d)*b+2*_12d-1;
}
return new _125({r:Math.round(r*255),g:Math.round(g*255),b:Math.round(b*255)});
}});
cx.fromHsv=function(hue,_12e,_12f){
if(lang.isArray(hue)){
_12e=hue[1],_12f=hue[2],hue=hue[0];
}else{
if(lang.isObject(hue)){
_12e=hue.s,_12f=hue.v,hue=hue.h;
}
}
if(hue==360){
hue=0;
}
_12e/=100;
_12f/=100;
var r,g,b;
if(_12e==0){
r=_12f,b=_12f,g=_12f;
}else{
var _130=hue/60,i=Math.floor(_130),f=_130-i;
var p=_12f*(1-_12e);
var q=_12f*(1-(_12e*f));
var t=_12f*(1-(_12e*(1-f)));
switch(i){
case 0:
r=_12f,g=t,b=p;
break;
case 1:
r=q,g=_12f,b=p;
break;
case 2:
r=p,g=_12f,b=t;
break;
case 3:
r=p,g=q,b=_12f;
break;
case 4:
r=t,g=p,b=_12f;
break;
case 5:
r=_12f,g=p,b=q;
break;
}
}
return new _125({r:Math.round(r*255),g:Math.round(g*255),b:Math.round(b*255)});
};
lang.extend(_125,{toCmy:function(){
var cyan=1-(this.r/255),_131=1-(this.g/255),_132=1-(this.b/255);
return {c:Math.round(cyan*100),m:Math.round(_131*100),y:Math.round(_132*100)};
},toCmyk:function(){
var cyan,_133,_134,_135;
var r=this.r/255,g=this.g/255,b=this.b/255;
_135=Math.min(1-r,1-g,1-b);
cyan=(1-r-_135)/(1-_135);
_133=(1-g-_135)/(1-_135);
_134=(1-b-_135)/(1-_135);
return {c:Math.round(cyan*100),m:Math.round(_133*100),y:Math.round(_134*100),b:Math.round(_135*100)};
},toHsl:function(){
var r=this.r/255,g=this.g/255,b=this.b/255;
var min=Math.min(r,b,g),max=Math.max(r,g,b);
var _136=max-min;
var h=0,s=0,l=(min+max)/2;
if(l>0&&l<1){
s=_136/((l<0.5)?(2*l):(2-2*l));
}
if(_136>0){
if(max==r&&max!=g){
h+=(g-b)/_136;
}
if(max==g&&max!=b){
h+=(2+(b-r)/_136);
}
if(max==b&&max!=r){
h+=(4+(r-g)/_136);
}
h*=60;
}
return {h:h,s:Math.round(s*100),l:Math.round(l*100)};
},toHsv:function(){
var r=this.r/255,g=this.g/255,b=this.b/255;
var min=Math.min(r,b,g),max=Math.max(r,g,b);
var _137=max-min;
var h=null,s=(max==0)?0:(_137/max);
if(s==0){
h=0;
}else{
if(r==max){
h=60*(g-b)/_137;
}else{
if(g==max){
h=120+60*(b-r)/_137;
}else{
h=240+60*(r-g)/_137;
}
}
if(h<0){
h+=360;
}
}
return {h:h,s:Math.round(s*100),v:Math.round(max*100)};
}});
return cx;
});
},"dojox/validate":function(){
define(["./validate/_base"],function(_138){
return _138;
});
},"dojo/request/iframe":function(){
define(["module","require","./watch","./util","./handlers","../_base/lang","../io-query","../query","../has","../dom","../dom-construct","../_base/window","../NodeList-dom"],function(_139,_13a,_13b,util,_13c,lang,_13d,_13e,has,dom,_13f,win){
var mid=_139.id.replace(/[\/\.\-]/g,"_"),_140=mid+"_onload";
if(!win.global[_140]){
win.global[_140]=function(){
var dfd=_141._currentDfd;
if(!dfd){
_141._fireNextRequest();
return;
}
var _142=dfd.response,_143=_142.options,_144=dom.byId(_143.form)||dfd._tmpForm;
if(_144){
var _145=dfd._contentToClean;
for(var i=0;i<_145.length;i++){
var key=_145[i];
for(var j=0;j<_144.childNodes.length;j++){
var _146=_144.childNodes[j];
if(_146.name===key){
_13f.destroy(_146);
break;
}
}
}
dfd._originalAction&&_144.setAttribute("action",dfd._originalAction);
if(dfd._originalMethod){
_144.setAttribute("method",dfd._originalMethod);
_144.method=dfd._originalMethod;
}
if(dfd._originalTarget){
_144.setAttribute("target",dfd._originalTarget);
_144.target=dfd._originalTarget;
}
}
if(dfd._tmpForm){
_13f.destroy(dfd._tmpForm);
delete dfd._tmpForm;
}
dfd._finished=true;
};
}
function _147(name,_148,uri){
if(win.global[name]){
return win.global[name];
}
if(win.global.frames[name]){
return win.global.frames[name];
}
if(!uri){
if(has("config-useXDomain")&&!has("config-dojoBlankHtmlUrl")){
console.warn("dojo/request/iframe: When using cross-domain Dojo builds,"+" please save dojo/resources/blank.html to your domain and set dojoConfig.dojoBlankHtmlUrl"+" to the path on your domain to blank.html");
}
uri=(has("config-dojoBlankHtmlUrl")||_13a.toUrl("dojo/resources/blank.html"));
}
var _149=_13f.place("<iframe id=\""+name+"\" name=\""+name+"\" src=\""+uri+"\" onload=\""+_148+"\" style=\"position: absolute; left: 1px; top: 1px; height: 1px; width: 1px; visibility: hidden\">",win.body());
win.global[name]=_149;
return _149;
};
function _14a(_14b,src,_14c){
var _14d=win.global.frames[_14b.name];
if(_14d.contentWindow){
_14d=_14d.contentWindow;
}
try{
if(!_14c){
_14d.location=src;
}else{
_14d.location.replace(src);
}
}
catch(e){
}
};
function doc(_14e){
if(_14e.contentDocument){
return _14e.contentDocument;
}
var name=_14e.name;
if(name){
var _14f=win.doc.getElementsByTagName("iframe");
if(_14e.document&&_14f[name].contentWindow&&_14f[name].contentWindow.document){
return _14f[name].contentWindow.document;
}else{
if(win.doc.frames[name]&&win.doc.frames[name].document){
return win.doc.frames[name].document;
}
}
}
return null;
};
function _150(){
return _13f.create("form",{name:mid+"_form",style:{position:"absolute",top:"-1000px",left:"-1000px"}},win.body());
};
function _151(){
var dfd;
try{
if(_141._currentDfd||!_141._dfdQueue.length){
return;
}
do{
dfd=_141._currentDfd=_141._dfdQueue.shift();
}while(dfd&&(dfd.canceled||(dfd.isCanceled&&dfd.isCanceled()))&&_141._dfdQueue.length);
if(!dfd||dfd.canceled||(dfd.isCanceled&&dfd.isCanceled())){
_141._currentDfd=null;
return;
}
var _152=dfd.response,_153=_152.options,c2c=dfd._contentToClean=[],_154=dom.byId(_153.form),_155=util.notify,data=_153.data||null,_156;
if(!dfd._legacy&&_153.method==="POST"&&!_154){
_154=dfd._tmpForm=_150();
}else{
if(_153.method==="GET"&&_154&&_152.url.indexOf("?")>-1){
_156=_152.url.slice(_152.url.indexOf("?")+1);
data=lang.mixin(_13d.queryToObject(_156),data);
}
}
if(_154){
if(!dfd._legacy){
var _157=_154;
do{
_157=_157.parentNode;
}while(_157!==win.doc.documentElement);
if(!_157){
_154.style.position="absolute";
_154.style.left="-1000px";
_154.style.top="-1000px";
win.body().appendChild(_154);
}
if(!_154.name){
_154.name=mid+"_form";
}
}
if(data){
var _158=function(name,_159){
_13f.create("input",{type:"hidden",name:name,value:_159},_154);
c2c.push(name);
};
for(var x in data){
var val=data[x];
if(lang.isArray(val)&&val.length>1){
for(var i=0;i<val.length;i++){
_158(x,val[i]);
}
}else{
if(!_154[x]){
_158(x,val);
}else{
_154[x].value=val;
}
}
}
}
var _15a=_154.getAttributeNode("action"),_15b=_154.getAttributeNode("method"),_15c=_154.getAttributeNode("target");
if(_152.url){
dfd._originalAction=_15a?_15a.value:null;
if(_15a){
_15a.value=_152.url;
}else{
_154.setAttribute("action",_152.url);
}
}
if(!dfd._legacy){
dfd._originalMethod=_15b?_15b.value:null;
if(_15b){
_15b.value=_153.method;
}else{
_154.setAttribute("method",_153.method);
}
}else{
if(!_15b||!_15b.value){
if(_15b){
_15b.value=_153.method;
}else{
_154.setAttribute("method",_153.method);
}
}
}
dfd._originalTarget=_15c?_15c.value:null;
if(_15c){
_15c.value=_141._iframeName;
}else{
_154.setAttribute("target",_141._iframeName);
}
_154.target=_141._iframeName;
_155&&_155.emit("send",_152,dfd.promise.cancel);
_141._notifyStart(_152);
_154.submit();
}else{
var _15d="";
if(_152.options.data){
_15d=_152.options.data;
if(typeof _15d!=="string"){
_15d=_13d.objectToQuery(_15d);
}
}
var _15e=_152.url+(_152.url.indexOf("?")>-1?"&":"?")+_15d;
_155&&_155.emit("send",_152,dfd.promise.cancel);
_141._notifyStart(_152);
_141.setSrc(_141._frame,_15e,true);
}
}
catch(e){
dfd.reject(e);
}
};
function _15f(_160){
return !this.isFulfilled();
};
function _161(_162){
return !!this._finished;
};
function _163(_164,_165){
if(!_165){
try{
var _166=_164.options,doc=_141.doc(_141._frame),_167=_166.handleAs;
if(_167!=="html"){
if(_167==="xml"){
if(doc.documentElement.tagName.toLowerCase()==="html"){
_13e("a",doc.documentElement).orphan();
var _168=doc.documentElement.innerText;
_168=_168.replace(/>\s+</g,"><");
_164.text=lang.trim(_168);
}else{
_164.data=doc;
}
}else{
_164.text=doc.getElementsByTagName("textarea")[0].value;
}
_13c(_164);
}else{
_164.data=doc;
}
}
catch(e){
_165=e;
}
}
if(_165){
this.reject(_165);
}else{
if(this._finished){
this.resolve(_164);
}else{
this.reject(new Error("Invalid dojo/request/iframe request state"));
}
}
};
function last(_169){
this._callNext();
};
var _16a={method:"POST"};
function _141(url,_16b,_16c){
var _16d=util.parseArgs(url,util.deepCreate(_16a,_16b),true);
url=_16d.url;
_16b=_16d.options;
if(_16b.method!=="GET"&&_16b.method!=="POST"){
throw new Error(_16b.method+" not supported by dojo/request/iframe");
}
if(!_141._frame){
_141._frame=_141.create(_141._iframeName,_140+"();");
}
var dfd=util.deferred(_16d,null,_15f,_161,_163,last);
dfd._callNext=function(){
if(!this._calledNext){
this._calledNext=true;
_141._currentDfd=null;
_141._fireNextRequest();
}
};
dfd._legacy=_16c;
_141._dfdQueue.push(dfd);
_141._fireNextRequest();
_13b(dfd);
return _16c?dfd:dfd.promise;
};
_141.create=_147;
_141.doc=doc;
_141.setSrc=_14a;
_141._iframeName=mid+"_IoIframe";
_141._notifyStart=function(){
};
_141._dfdQueue=[];
_141._currentDfd=null;
_141._fireNextRequest=_151;
util.addCommonMethods(_141,["GET","POST"]);
return _141;
});
},"dojox/form/uploader/_HTML5":function(){
define(["dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo"],function(_16e,lang,_16f,dojo){
return _16e("dojox.form.uploader._HTML5",[],{errMsg:"Error uploading files. Try checking permissions",uploadType:"html5",postMixInProperties:function(){
this.inherited(arguments);
if(this.uploadType==="html5"){
}
},postCreate:function(){
this.connectForm();
this.inherited(arguments);
if(this.uploadOnSelect){
this.connect(this,"onChange",function(data){
this.upload(data[0]);
});
}
},_drop:function(e){
dojo.stopEvent(e);
var dt=e.dataTransfer;
this._files=dt.files;
this.onChange(this.getFileList());
},upload:function(_170){
this.onBegin(this.getFileList());
this.uploadWithFormData(_170);
},addDropTarget:function(node,_171){
if(!_171){
this.connect(node,"dragenter",dojo.stopEvent);
this.connect(node,"dragover",dojo.stopEvent);
this.connect(node,"dragleave",dojo.stopEvent);
}
this.connect(node,"drop","_drop");
},uploadWithFormData:function(data){
if(!this.getUrl()){
console.error("No upload url found.",this);
return;
}
var fd=new FormData(),_172=this._getFileFieldName();
_16f.forEach(this._files,function(f,i){
fd.append(_172,f);
},this);
if(data){
data.uploadType=this.uploadType;
for(var nm in data){
fd.append(nm,data[nm]);
}
}
var xhr=this.createXhr();
xhr.send(fd);
},_xhrProgress:function(evt){
if(evt.lengthComputable){
var o={bytesLoaded:evt.loaded,bytesTotal:evt.total,type:evt.type,timeStamp:evt.timeStamp};
if(evt.type=="load"){
o.percent="100%";
o.decimal=1;
}else{
o.decimal=evt.loaded/evt.total;
o.percent=Math.ceil((evt.loaded/evt.total)*100)+"%";
}
this.onProgress(o);
}
},createXhr:function(){
var xhr=new XMLHttpRequest();
var _173;
xhr.upload.addEventListener("progress",lang.hitch(this,"_xhrProgress"),false);
xhr.addEventListener("load",lang.hitch(this,"_xhrProgress"),false);
xhr.addEventListener("error",lang.hitch(this,function(evt){
this.onError(evt);
clearInterval(_173);
}),false);
xhr.addEventListener("abort",lang.hitch(this,function(evt){
this.onAbort(evt);
clearInterval(_173);
}),false);
xhr.onreadystatechange=lang.hitch(this,function(){
if(xhr.readyState===4){
clearInterval(_173);
try{
this.onComplete(JSON.parse(xhr.responseText.replace(/^\{\}&&/,"")));
}
catch(e){
var msg="Error parsing server result:";
console.error(msg,e);
console.error(xhr.responseText);
this.onError(msg,e);
}
}
});
xhr.open("POST",this.getUrl());
xhr.setRequestHeader("Accept","application/json");
_173=setInterval(lang.hitch(this,function(){
try{
if(typeof (xhr.statusText)){
}
}
catch(e){
clearInterval(_173);
}
}),250);
return xhr;
}});
});
},"dojox/validate/web":function(){
define(["./_base","./regexp"],function(_174,_175){
_174.isIpAddress=function(_176,_177){
var re=new RegExp("^"+_175.ipAddress(_177)+"$","i");
return re.test(_176);
};
_174.isUrl=function(_178,_179){
var re=new RegExp("^"+_175.url(_179)+"$","i");
return re.test(_178);
};
_174.isEmailAddress=function(_17a,_17b){
var re=new RegExp("^"+_175.emailAddress(_17b)+"$","i");
return re.test(_17a);
};
_174.isEmailAddressList=function(_17c,_17d){
var re=new RegExp("^"+_175.emailAddressList(_17d)+"$","i");
return re.test(_17c);
};
_174.getEmailAddressList=function(_17e,_17f){
if(!_17f){
_17f={};
}
if(!_17f.listSeparator){
_17f.listSeparator="\\s;,";
}
if(_174.isEmailAddressList(_17e,_17f)){
return _17e.split(new RegExp("\\s*["+_17f.listSeparator+"]\\s*"));
}
return [];
};
return _174;
});
},"dojox/editor/plugins/nls/PasteFromWord":function(){
define({root:({"pasteFromWord":"Paste From Word","instructions":"Paste the content from Word into the text box below.  Once you are satisfied with the content to insert, press the paste button.  To abort inserting text, press the cancel button."}),"zh":true,"zh-tw":true,"uk":true,"tr":true,"th":true,"sv":true,"sl":true,"sk":true,"ru":true,"ro":true,"pt":true,"pt-pt":true,"pl":true,"nl":true,"nb":true,"ko":true,"kk":true,"ja":true,"it":true,"hu":true,"hr":true,"he":true,"fr":true,"fi":true,"es":true,"el":true,"de":true,"da":true,"cs":true,"ca":true,"bg":true,"ar":true});
},"dojox/editor/plugins/nls/pt/PasteFromWord":function(){
define(({"pasteFromWord":"Colar do Word","instructions":"Cole o conteúdo do Word na caixa de texto a seguir. Quando estiver satisfeito com o conteúdo a ser inserido, pressione o botão para colar. Para interromper a inserção de texto, pressione o botão para cancelar."}));
},"dojox/editor/plugins/nls/pt/PasteFromWord":function(){
define(({"pasteFromWord":"Colar do Word","instructions":"Cole o conteúdo do Word na caixa de texto a seguir. Quando estiver satisfeito com o conteúdo a ser inserido, pressione o botão para colar. Para interromper a inserção de texto, pressione o botão para cancelar."}));
},"dojo/dnd/move":function(){
define(["../_base/declare","../dom-geometry","../dom-style","./common","./Mover","./Moveable"],function(_180,_181,_182,dnd,_183,_184){
var _185=_180("dojo.dnd.move.constrainedMoveable",_184,{constraints:function(){
},within:false,constructor:function(node,_186){
if(!_186){
_186={};
}
this.constraints=_186.constraints;
this.within=_186.within;
},onFirstMove:function(_187){
var c=this.constraintBox=this.constraints.call(this,_187);
c.r=c.l+c.w;
c.b=c.t+c.h;
if(this.within){
var mb=_181.getMarginSize(_187.node);
c.r-=mb.w;
c.b-=mb.h;
}
},onMove:function(_188,_189){
var c=this.constraintBox,s=_188.node.style;
this.onMoving(_188,_189);
_189.l=_189.l<c.l?c.l:c.r<_189.l?c.r:_189.l;
_189.t=_189.t<c.t?c.t:c.b<_189.t?c.b:_189.t;
s.left=_189.l+"px";
s.top=_189.t+"px";
this.onMoved(_188,_189);
}});
var _18a=_180("dojo.dnd.move.boxConstrainedMoveable",_185,{box:{},constructor:function(node,_18b){
var box=_18b&&_18b.box;
this.constraints=function(){
return box;
};
}});
var _18c=_180("dojo.dnd.move.parentConstrainedMoveable",_185,{area:"content",constructor:function(node,_18d){
var area=_18d&&_18d.area;
this.constraints=function(){
var n=this.node.parentNode,s=_182.getComputedStyle(n),mb=_181.getMarginBox(n,s);
if(area=="margin"){
return mb;
}
var t=_181.getMarginExtents(n,s);
mb.l+=t.l,mb.t+=t.t,mb.w-=t.w,mb.h-=t.h;
if(area=="border"){
return mb;
}
t=_181.getBorderExtents(n,s);
mb.l+=t.l,mb.t+=t.t,mb.w-=t.w,mb.h-=t.h;
if(area=="padding"){
return mb;
}
t=_181.getPadExtents(n,s);
mb.l+=t.l,mb.t+=t.t,mb.w-=t.w,mb.h-=t.h;
return mb;
};
}});
return {constrainedMoveable:_185,boxConstrainedMoveable:_18a,parentConstrainedMoveable:_18c};
});
},"dojox/form/uploader/_Flash":function(){
define(["dojo/dom-form","dojo/dom-style","dojo/dom-construct","dojo/dom-attr","dojo/_base/declare","dojo/_base/config","dojo/_base/connect","dojo/_base/lang","dojo/_base/array","dojox/embed/Flash"],function(_18e,_18f,_190,_191,_192,_193,_194,lang,_195,_196){
return _192("dojox.form.uploader._Flash",[],{swfPath:_193.uploaderPath||require.toUrl("dojox/form/resources/uploader.swf"),preventCache:true,skipServerCheck:true,serverTimeout:2000,isDebug:false,devMode:false,deferredUploading:0,postMixInProperties:function(){
if(this.uploadType==="flash"){
this._files=[];
this._fileMap={};
this._createInput=this._createFlashUploader;
this.getFileList=this.getFlashFileList;
this.reset=this.flashReset;
this.upload=this.uploadFlash;
this.fieldname="flashUploadFiles";
}
this.inherited(arguments);
},onReady:function(_197){
},onLoad:function(_198){
},onFileChange:function(_199){
},onFileProgress:function(_19a){
},getFlashFileList:function(){
return this._files;
},flashReset:function(){
this.flashMovie.reset();
this._files=[];
this._fileMap={};
},uploadFlash:function(_19b){
this.onBegin(this.getFileList());
_19b=_19b||{};
_19b.returnType="F";
_19b.uploadType=this.uploadType;
this.flashMovie.doUpload(_19b);
},_change:function(_19c){
this._files=this._files.concat(_19c);
_195.forEach(_19c,function(f){
f.bytesLoaded=0;
f.bytesTotal=f.size;
this._fileMap[f.name+"_"+f.size]=f;
},this);
this.onChange(this._files);
this.onFileChange(_19c);
},_complete:function(_19d){
var o=this._getCustomEvent();
o.type="load";
this.onComplete(_19d);
},_progress:function(f){
this._fileMap[f.name+"_"+f.bytesTotal].bytesLoaded=f.bytesLoaded;
var o=this._getCustomEvent();
this.onFileProgress(f);
this.onProgress(o);
},_error:function(err){
this.onError(err);
},_onFlashBlur:function(_19e){
},_getCustomEvent:function(){
var o={bytesLoaded:0,bytesTotal:0,type:"progress",timeStamp:new Date().getTime()};
for(var nm in this._fileMap){
o.bytesTotal+=this._fileMap[nm].bytesTotal;
o.bytesLoaded+=this._fileMap[nm].bytesLoaded;
}
o.decimal=o.bytesLoaded/o.bytesTotal;
o.percent=Math.ceil((o.bytesLoaded/o.bytesTotal)*100)+"%";
return o;
},_connectFlash:function(){
this._subs=[];
this._cons=[];
var _19f=lang.hitch(this,function(s,_1a0){
this._subs.push(_194.subscribe(this.id+s,this,_1a0));
});
_19f("/filesSelected","_change");
_19f("/filesUploaded","_complete");
_19f("/filesProgress","_progress");
_19f("/filesError","_error");
_19f("/filesCanceled","onCancel");
_19f("/stageBlur","_onFlashBlur");
this.connect(this.domNode,"focus",function(){
this.flashMovie.focus();
this.flashMovie.doFocus();
});
if(this.tabIndex>=0){
_191.set(this.domNode,"tabIndex",this.tabIndex);
}
},_createFlashUploader:function(){
var w=this.btnSize.w;
var h=this.btnSize.h;
if(!w){
setTimeout(dojo.hitch(this,function(){
this._getButtonStyle(this.domNode);
this._createFlashUploader();
}),200);
return;
}
var url=this.getUrl();
if(url){
if(url.toLowerCase().indexOf("http")<0&&url.indexOf("/")!=0){
var loc=window.location.href.split("/");
loc.pop();
loc=loc.join("/")+"/";
url=loc+url;
}
}else{
console.warn("Warning: no uploadUrl provided.");
}
this.inputNode=_190.create("div",{className:"dojoxFlashNode"},this.domNode,"first");
_18f.set(this.inputNode,{position:"absolute",top:"-2px",width:w+"px",height:h+"px",opacity:0});
var args={expressInstall:true,path:(this.swfPath.uri||this.swfPath)+((this.preventCache)?("?cb_"+(new Date().getTime())):""),width:w,height:h,allowScriptAccess:"always",allowNetworking:"all",vars:{uploadDataFieldName:this.flashFieldName||this.name+"Flash",uploadUrl:url,uploadOnSelect:this.uploadOnSelect,deferredUploading:this.deferredUploading||0,selectMultipleFiles:this.multiple,id:this.id,isDebug:this.isDebug,noReturnCheck:this.skipServerCheck,serverTimeout:this.serverTimeout},params:{scale:"noscale",wmode:"opaque",allowScriptAccess:"always",allowNetworking:"all"}};
this.flashObject=new _196(args,this.inputNode);
this.flashObject.onError=lang.hitch(function(msg){
console.error("Flash Error: "+msg);
});
this.flashObject.onReady=lang.hitch(this,function(){
this.onReady(this);
});
this.flashObject.onLoad=lang.hitch(this,function(mov){
this.flashMovie=mov;
this.flashReady=true;
this.onLoad(this);
});
this._connectFlash();
}});
});
},"dojox/editor/plugins/nls/TableDialog":function(){
define({root:({insertTableTitle:"Insert Table",modifyTableTitle:"Modify Table",rows:"Rows:",columns:"Columns:",align:"Align:",cellPadding:"Cell Padding:",cellSpacing:"Cell Spacing:",tableWidth:"Table Width:",backgroundColor:"Background Color:",borderColor:"Border Color:",borderThickness:"Border Thickness:",percent:"percent",pixels:"pixels","default":"default",left:"left",center:"center",right:"right",buttonSet:"Set",buttonInsert:"Insert",buttonCancel:"Cancel",selectTableLabel:"Select Table",insertTableRowBeforeLabel:"Add Row Before",insertTableRowAfterLabel:"Add Row After",insertTableColumnBeforeLabel:"Add Column Before",insertTableColumnAfterLabel:"Add Column After",deleteTableRowLabel:"Delete Row",deleteTableColumnLabel:"Delete Column",colorTableCellTitle:"Background Color Table Cell",tableContextMenuTitle:"Table Context Menu"}),"zh":true,"zh-tw":true,"uk":true,"tr":true,"th":true,"sv":true,"sl":true,"sk":true,"ru":true,"ro":true,"pt":true,"pt-pt":true,"pl":true,"nl":true,"nb":true,"ko":true,"kk":true,"ja":true,"it":true,"hu":true,"hr":true,"he":true,"fr":true,"fi":true,"es":true,"el":true,"de":true,"da":true,"cs":true,"ca":true,"bg":true,"az":true,"ar":true});
},"dojox/editor/plugins/nls/pt/TableDialog":function(){
define(({insertTableTitle:"Inserir Tabela",modifyTableTitle:"Modificar Tabela",rows:"Linhas:",columns:"Colunas:",align:"Alinhar:",cellPadding:"Preenchimento de Célula:",cellSpacing:"Espaçamento de Célula:",tableWidth:"Largura da Tabela:",backgroundColor:"Cor do Plano de Fundo:",borderColor:"Cor da Borda:",borderThickness:"Espessura da Borda:",percent:"percentual",pixels:"pixels","default":"default",left:"esquerda",center:"centro",right:"direita",buttonSet:"Configurar",buttonInsert:"Inserir",buttonCancel:"Cancelar",selectTableLabel:"Selecionar Tabela",insertTableRowBeforeLabel:"Incluir Linha Antes",insertTableRowAfterLabel:"Incluir Linha Depois",insertTableColumnBeforeLabel:"Incluir Coluna Antes",insertTableColumnAfterLabel:"Incluir Coluna Depois",deleteTableRowLabel:"Excluir Linha",deleteTableColumnLabel:"Excluir Coluna",colorTableCellTitle:"Célula de Tabela de Cor do Segundo Plano",tableContextMenuTitle:"Menu de Contexto da Tabela"}));
},"dojox/editor/plugins/nls/pt/TableDialog":function(){
define(({insertTableTitle:"Inserir Tabela",modifyTableTitle:"Modificar Tabela",rows:"Linhas:",columns:"Colunas:",align:"Alinhar:",cellPadding:"Preenchimento de Célula:",cellSpacing:"Espaçamento de Célula:",tableWidth:"Largura da Tabela:",backgroundColor:"Cor do Plano de Fundo:",borderColor:"Cor da Borda:",borderThickness:"Espessura da Borda:",percent:"percentual",pixels:"pixels","default":"default",left:"esquerda",center:"centro",right:"direita",buttonSet:"Configurar",buttonInsert:"Inserir",buttonCancel:"Cancelar",selectTableLabel:"Selecionar Tabela",insertTableRowBeforeLabel:"Incluir Linha Antes",insertTableRowAfterLabel:"Incluir Linha Depois",insertTableColumnBeforeLabel:"Incluir Coluna Antes",insertTableColumnAfterLabel:"Incluir Coluna Depois",deleteTableRowLabel:"Excluir Linha",deleteTableColumnLabel:"Excluir Coluna",colorTableCellTitle:"Célula de Tabela de Cor do Segundo Plano",tableContextMenuTitle:"Menu de Contexto da Tabela"}));
},"dojox/form/uploader/plugins/IFrame":function(){
define([],function(){
console.warn("dojox.form.uploader.plugins.IFrame has been removed. You can use Uploader directly and it will contain all necessary functionality.");
return {};
});
},"dojox/form/Uploader":function(){
define(["dojo/_base/kernel","dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/_base/connect","dojo/_base/window","dojo/dom-style","dojo/dom-class","dojo/dom-geometry","dojo/dom-attr","dojo/dom-construct","dojo/dom-form","dijit","dijit/form/Button","./uploader/_Base","./uploader/_HTML5","./uploader/_IFrame","./uploader/_Flash","dojo/i18n!./nls/Uploader","dojo/text!./resources/Uploader.html"],function(_1a1,_1a2,lang,_1a3,_1a4,win,_1a5,_1a6,_1a7,_1a8,_1a9,_1aa,_1ab,_1ac,Base,_1ad,_1ae,_1af,res,_1b0){
return _1a2("dojox.form.Uploader",[Base,_1ac,_1ad,_1ae,_1af],{uploadOnSelect:false,tabIndex:0,multiple:false,label:res.label,url:"",name:"uploadedfile",flashFieldName:"",force:"",uploadType:"",showInput:"",focusedClass:"dijitButtonHover",_nameIndex:0,templateString:_1b0,baseClass:"dijitUploader "+_1ac.prototype.baseClass,postMixInProperties:function(){
this._inputs=[];
this._cons=[];
this.force=this.force.toLowerCase();
if(this.supports("multiple")){
this.uploadType=this.force==="form"?"form":"html5";
}else{
this.uploadType=this.force==="flash"?"flash":"iframe";
}
this.inherited(arguments);
},buildRendering:function(){
this.inherited(arguments);
_1a5.set(this.domNode,{overflow:"hidden",position:"relative"});
this._buildDisplay();
_1a8.set(this.titleNode,"tabIndex",-1);
},_buildDisplay:function(){
if(this.showInput){
this.displayInput=_1a9.create("input",{"class":"dijitUploadDisplayInput","tabIndex":-1,"autocomplete":"off","role":"presentation"},this.containerNode,this.showInput);
this._attachPoints.push("displayInput");
this.connect(this,"onChange",function(_1b1){
var i=0,l=_1b1.length,f,r=[];
while((f=_1b1[i++])){
if(f&&f.name){
r.push(f.name);
}
}
this.displayInput.value=r.join(", ");
});
this.connect(this,"reset",function(){
this.displayInput.value="";
});
}
},startup:function(){
if(this._buildInitialized){
return;
}
this._buildInitialized=true;
this._getButtonStyle(this.domNode);
this._setButtonStyle();
this.inherited(arguments);
},onChange:function(_1b2){
},onBegin:function(_1b3){
},onProgress:function(_1b4){
},onComplete:function(_1b5){
this.reset();
},onCancel:function(){
},onAbort:function(){
},onError:function(_1b6){
},upload:function(_1b7){
_1b7=_1b7||{};
_1b7.uploadType=this.uploadType;
this.inherited(arguments);
},submit:function(form){
form=!!form?form.tagName?form:this.getForm():this.getForm();
var data=_1aa.toObject(form);
data.uploadType=this.uploadType;
this.upload(data);
},reset:function(){
delete this._files;
this._disconnectButton();
_1a3.forEach(this._inputs,_1a9.destroy,dojo);
this._inputs=[];
this._nameIndex=0;
this._createInput();
},getFileList:function(){
var _1b8=[];
if(this.supports("multiple")){
_1a3.forEach(this._files,function(f,i){
_1b8.push({index:i,name:f.name,size:f.size,type:f.type});
},this);
}else{
_1a3.forEach(this._inputs,function(n,i){
if(n.value){
_1b8.push({index:i,name:n.value.substring(n.value.lastIndexOf("\\")+1),size:0,type:n.value.substring(n.value.lastIndexOf(".")+1)});
}
},this);
}
return _1b8;
},_getValueAttr:function(){
return this.getFileList();
},_setValueAttr:function(_1b9){
console.error("Uploader value is read only");
},_setDisabledAttr:function(_1ba){
if(this.disabled==_1ba||!this.inputNode){
return;
}
this.inherited(arguments);
_1a5.set(this.inputNode,"display",_1ba?"none":"");
},_getButtonStyle:function(node){
this.btnSize={w:_1a5.get(node,"width"),h:_1a5.get(node,"height")};
},_setButtonStyle:function(){
this.inputNodeFontSize=Math.max(2,Math.max(Math.ceil(this.btnSize.w/60),Math.ceil(this.btnSize.h/15)));
this._createInput();
},_getFileFieldName:function(){
var name;
if(this.supports("multiple")&&this.multiple){
name=this.name+"s[]";
}else{
name=this.name+(this.multiple?this._nameIndex:"");
}
return name;
},_createInput:function(){
if(this._inputs.length){
_1a5.set(this.inputNode,{top:"500px"});
this._disconnectButton();
this._nameIndex++;
}
var name=this._getFileFieldName();
this.focusNode=this.inputNode=_1a9.create("input",{type:"file",name:name,"aria-labelledby":this.id+"_label"},this.domNode,"first");
if(this.supports("multiple")&&this.multiple){
_1a8.set(this.inputNode,"multiple",true);
}
this._inputs.push(this.inputNode);
_1a5.set(this.inputNode,{position:"absolute",fontSize:this.inputNodeFontSize+"em",top:"-3px",right:"-3px",opacity:0});
this._connectButton();
},_connectButton:function(){
this._cons.push(_1a4.connect(this.inputNode,"change",this,function(evt){
this._files=this.inputNode.files;
this.onChange(this.getFileList(evt));
if(!this.supports("multiple")&&this.multiple){
this._createInput();
}
}));
if(this.tabIndex>-1){
this.inputNode.tabIndex=this.tabIndex;
this._cons.push(_1a4.connect(this.inputNode,"focus",this,function(){
_1a6.add(this.domNode,this.focusedClass);
}));
this._cons.push(_1a4.connect(this.inputNode,"blur",this,function(){
_1a6.remove(this.domNode,this.focusedClass);
}));
}
},_disconnectButton:function(){
_1a3.forEach(this._cons,_1a4.disconnect);
this._cons.splice(0,this._cons.length);
}});
});
},"dojox/widget/nls/ColorPicker":function(){
define({root:({redLabel:"r",greenLabel:"g",blueLabel:"b",hueLabel:"h",saturationLabel:"s",valueLabel:"v",degLabel:"°",hexLabel:"hex",huePickerTitle:"Hue Selector",saturationPickerTitle:"Saturation Selector"}),"zh":true,"zh-tw":true,"uk":true,"tr":true,"th":true,"sv":true,"sl":true,"sk":true,"ru":true,"ro":true,"pt":true,"pt-pt":true,"pl":true,"nl":true,"nb":true,"ko":true,"kk":true,"ja":true,"it":true,"hu":true,"hr":true,"he":true,"fr":true,"fi":true,"es":true,"el":true,"de":true,"da":true,"cs":true,"ca":true,"bg":true,"az":true,"ar":true});
},"dojox/widget/nls/pt/ColorPicker":function(){
define(({redLabel:"r",greenLabel:"g",blueLabel:"b",hueLabel:"h",saturationLabel:"s",valueLabel:"v",degLabel:"°",hexLabel:"hex",huePickerTitle:"Seletor de Matiz",saturationPickerTitle:"Seletor de Saturação"}));
},"dojox/widget/nls/pt/ColorPicker":function(){
define(({redLabel:"r",greenLabel:"g",blueLabel:"b",hueLabel:"h",saturationLabel:"s",valueLabel:"v",degLabel:"°",hexLabel:"hex",huePickerTitle:"Seletor de Matiz",saturationPickerTitle:"Seletor de Saturação"}));
},"dojox/editor/plugins/PasteFromWord":function(){
define(["dojo","dijit","dojox","dijit/_editor/_Plugin","dijit/_base/manager","dijit/_editor/RichText","dijit/form/Button","dijit/Dialog","dojox/html/format","dojo/_base/connect","dojo/_base/declare","dojo/i18n","dojo/string","dojo/i18n!dojox/editor/plugins/nls/PasteFromWord","dojo/i18n!dijit/nls/common","dojo/i18n!dijit/_editor/nls/commands"],function(dojo,_1bb,_1bc,_1bd){
var _1be=dojo.declare("dojox.editor.plugins.PasteFromWord",_1bd,{iconClassPrefix:"dijitAdditionalEditorIcon",width:"400px",height:"300px",_template:["<div class='dijitPasteFromWordEmbeddedRTE'>","<div style='width: ${width}; padding-top: 5px; padding-bottom: 5px;'>${instructions}</div>","<div id='${uId}_rte' style='width: ${width}; height: ${height}'></div>","<table style='width: ${width}' tabindex='-1'>","<tbody>","<tr>","<td align='center'>","<button type='button' dojoType='dijit.form.Button' id='${uId}_paste'>${paste}</button>","&nbsp;","<button type='button' dojoType='dijit.form.Button' id='${uId}_cancel'>${buttonCancel}</button>","</td>","</tr>","</tbody>","</table>","</div>"].join(""),_filters:[{regexp:/(<meta\s*[^>]*\s*>)|(<\s*link\s* href="file:[^>]*\s*>)|(<\/?\s*\w+:[^>]*\s*>)/gi,handler:""},{regexp:/(?:<style([^>]*)>([\s\S]*?)<\/style>|<link\s+(?=[^>]*rel=['"]?stylesheet)([^>]*?href=(['"])([^>]*?)\4[^>\/]*)\/?>)/gi,handler:""},{regexp:/(class="Mso[^"]*")|(<!--(.|\s){1,}?-->)/gi,handler:""},{regexp:/(<p[^>]*>\s*(\&nbsp;|\u00A0)*\s*<\/p[^>]*>)|(<p[^>]*>\s*<font[^>]*>\s*(\&nbsp;|\u00A0)*\s*<\/\s*font\s*>\s<\/p[^>]*>)/ig,handler:""},{regexp:/(style="[^"]*mso-[^;][^"]*")|(style="margin:\s*[^;"]*;")/gi,handler:""},{regexp:/(<\s*script[^>]*>((.|\s)*?)<\\?\/\s*script\s*>)|(<\s*script\b([^<>]|\s)*>?)|(<[^>]*=(\s|)*[("|')]javascript:[^$1][(\s|.)]*[$1][^>]*>)/ig,handler:""},{regexp:/<(\/?)o\:p[^>]*>/gi,handler:""}],_initButton:function(){
this._filters=this._filters.slice(0);
var _1bf=dojo.i18n.getLocalization("dojox.editor.plugins","PasteFromWord");
dojo.mixin(_1bf,dojo.i18n.getLocalization("dijit","common"));
dojo.mixin(_1bf,dojo.i18n.getLocalization("dijit._editor","commands"));
this.button=new _1bb.form.Button({label:_1bf["pasteFromWord"],showLabel:false,iconClass:this.iconClassPrefix+" "+this.iconClassPrefix+"PasteFromWord",tabIndex:"-1",onClick:dojo.hitch(this,"_openDialog")});
this._uId=_1bb.getUniqueId(this.editor.id);
_1bf.uId=this._uId;
_1bf.width=this.width||"400px";
_1bf.height=this.height||"300px";
this._dialog=new _1bb.Dialog({title:_1bf["pasteFromWord"]}).placeAt(dojo.body());
this._dialog.set("content",dojo.string.substitute(this._template,_1bf));
dojo.style(dojo.byId(this._uId+"_rte"),"opacity",0.001);
this.connect(_1bb.byId(this._uId+"_paste"),"onClick","_paste");
this.connect(_1bb.byId(this._uId+"_cancel"),"onClick","_cancel");
this.connect(this._dialog,"onHide","_clearDialog");
},updateState:function(){
this.button.set("disabled",this.get("disabled"));
},setEditor:function(_1c0){
this.editor=_1c0;
this._initButton();
},_openDialog:function(){
this._dialog.show();
if(!this._rte){
setTimeout(dojo.hitch(this,function(){
this._rte=new _1bb._editor.RichText({height:this.height||"300px"},this._uId+"_rte");
this._rte.startup();
this._rte.onLoadDeferred.addCallback(dojo.hitch(this,function(){
dojo.animateProperty({node:this._rte.domNode,properties:{opacity:{start:0.001,end:1}}}).play();
}));
}),100);
}
},_paste:function(){
var _1c1=_1bc.html.format.prettyPrint(this._rte.get("value"));
this._dialog.hide();
var i;
for(i=0;i<this._filters.length;i++){
var _1c2=this._filters[i];
_1c1=_1c1.replace(_1c2.regexp,_1c2.handler);
}
_1c1=_1bc.html.format.prettyPrint(_1c1);
this.editor.focus();
this.editor.execCommand("inserthtml",_1c1);
},_cancel:function(){
this._dialog.hide();
},_clearDialog:function(){
this._rte.set("value","");
},destroy:function(){
if(this._rte){
this._rte.destroy();
}
if(this._dialog){
this._dialog.destroyRecursive();
}
delete this._dialog;
delete this._rte;
this.inherited(arguments);
}});
dojo.subscribe(_1bb._scopeName+".Editor.getPlugin",null,function(o){
if(o.plugin){
return;
}
var name=o.args.name.toLowerCase();
if(name==="pastefromword"){
o.plugin=new _1be({width:("width" in o.args)?o.args.width:"400px",height:("height" in o.args)?o.args.width:"300px"});
}
});
return _1be;
});
},"dojox/html/entities":function(){
define(["dojo/_base/lang"],function(lang){
var dhe=lang.getObject("dojox.html.entities",true);
var _1c3=function(str,map){
var _1c4,_1c5;
if(map._encCache&&map._encCache.regexp&&map._encCache.mapper&&map.length==map._encCache.length){
_1c4=map._encCache.mapper;
_1c5=map._encCache.regexp;
}else{
_1c4={};
_1c5=["["];
var i;
for(i=0;i<map.length;i++){
_1c4[map[i][0]]="&"+map[i][1]+";";
_1c5.push(map[i][0]);
}
_1c5.push("]");
_1c5=new RegExp(_1c5.join(""),"g");
map._encCache={mapper:_1c4,regexp:_1c5,length:map.length};
}
str=str.replace(_1c5,function(c){
return _1c4[c];
});
return str;
};
var _1c6=function(str,map){
var _1c7,_1c8;
if(map._decCache&&map._decCache.regexp&&map._decCache.mapper&&map.length==map._decCache.length){
_1c7=map._decCache.mapper;
_1c8=map._decCache.regexp;
}else{
_1c7={};
_1c8=["("];
var i;
for(i=0;i<map.length;i++){
var e="&"+map[i][1]+";";
if(i){
_1c8.push("|");
}
_1c7[e]=map[i][0];
_1c8.push(e);
}
_1c8.push(")");
_1c8=new RegExp(_1c8.join(""),"g");
map._decCache={mapper:_1c7,regexp:_1c8,length:map.length};
}
str=str.replace(_1c8,function(c){
return _1c7[c];
});
return str;
};
dhe.html=[["&","amp"],["\"","quot"],["<","lt"],[">","gt"],[" ","nbsp"]];
dhe.latin=[["¡","iexcl"],["¢","cent"],["£","pound"],["€","euro"],["¤","curren"],["¥","yen"],["¦","brvbar"],["§","sect"],["¨","uml"],["©","copy"],["ª","ordf"],["«","laquo"],["¬","not"],["­","shy"],["®","reg"],["¯","macr"],["°","deg"],["±","plusmn"],["²","sup2"],["³","sup3"],["´","acute"],["µ","micro"],["¶","para"],["·","middot"],["¸","cedil"],["¹","sup1"],["º","ordm"],["»","raquo"],["¼","frac14"],["½","frac12"],["¾","frac34"],["¿","iquest"],["À","Agrave"],["Á","Aacute"],["Â","Acirc"],["Ã","Atilde"],["Ä","Auml"],["Å","Aring"],["Æ","AElig"],["Ç","Ccedil"],["È","Egrave"],["É","Eacute"],["Ê","Ecirc"],["Ë","Euml"],["Ì","Igrave"],["Í","Iacute"],["Î","Icirc"],["Ï","Iuml"],["Ð","ETH"],["Ñ","Ntilde"],["Ò","Ograve"],["Ó","Oacute"],["Ô","Ocirc"],["Õ","Otilde"],["Ö","Ouml"],["×","times"],["Ø","Oslash"],["Ù","Ugrave"],["Ú","Uacute"],["Û","Ucirc"],["Ü","Uuml"],["Ý","Yacute"],["Þ","THORN"],["ß","szlig"],["à","agrave"],["á","aacute"],["â","acirc"],["ã","atilde"],["ä","auml"],["å","aring"],["æ","aelig"],["ç","ccedil"],["è","egrave"],["é","eacute"],["ê","ecirc"],["ë","euml"],["ì","igrave"],["í","iacute"],["î","icirc"],["ï","iuml"],["ð","eth"],["ñ","ntilde"],["ò","ograve"],["ó","oacute"],["ô","ocirc"],["õ","otilde"],["ö","ouml"],["÷","divide"],["ø","oslash"],["ù","ugrave"],["ú","uacute"],["û","ucirc"],["ü","uuml"],["ý","yacute"],["þ","thorn"],["ÿ","yuml"],["ƒ","fnof"],["Α","Alpha"],["Β","Beta"],["Γ","Gamma"],["Δ","Delta"],["Ε","Epsilon"],["Ζ","Zeta"],["Η","Eta"],["Θ","Theta"],["Ι","Iota"],["Κ","Kappa"],["Λ","Lambda"],["Μ","Mu"],["Ν","Nu"],["Ξ","Xi"],["Ο","Omicron"],["Π","Pi"],["Ρ","Rho"],["Σ","Sigma"],["Τ","Tau"],["Υ","Upsilon"],["Φ","Phi"],["Χ","Chi"],["Ψ","Psi"],["Ω","Omega"],["α","alpha"],["β","beta"],["γ","gamma"],["δ","delta"],["ε","epsilon"],["ζ","zeta"],["η","eta"],["θ","theta"],["ι","iota"],["κ","kappa"],["λ","lambda"],["μ","mu"],["ν","nu"],["ξ","xi"],["ο","omicron"],["π","pi"],["ρ","rho"],["ς","sigmaf"],["σ","sigma"],["τ","tau"],["υ","upsilon"],["φ","phi"],["χ","chi"],["ψ","psi"],["ω","omega"],["ϑ","thetasym"],["ϒ","upsih"],["ϖ","piv"],["•","bull"],["…","hellip"],["′","prime"],["″","Prime"],["‾","oline"],["⁄","frasl"],["℘","weierp"],["ℑ","image"],["ℜ","real"],["™","trade"],["ℵ","alefsym"],["←","larr"],["↑","uarr"],["→","rarr"],["↓","darr"],["↔","harr"],["↵","crarr"],["⇐","lArr"],["⇑","uArr"],["⇒","rArr"],["⇓","dArr"],["⇔","hArr"],["∀","forall"],["∂","part"],["∃","exist"],["∅","empty"],["∇","nabla"],["∈","isin"],["∉","notin"],["∋","ni"],["∏","prod"],["∑","sum"],["−","minus"],["∗","lowast"],["√","radic"],["∝","prop"],["∞","infin"],["∠","ang"],["∧","and"],["∨","or"],["∩","cap"],["∪","cup"],["∫","int"],["∴","there4"],["∼","sim"],["≅","cong"],["≈","asymp"],["≠","ne"],["≡","equiv"],["≤","le"],["≥","ge"],["⊂","sub"],["⊃","sup"],["⊄","nsub"],["⊆","sube"],["⊇","supe"],["⊕","oplus"],["⊗","otimes"],["⊥","perp"],["⋅","sdot"],["⌈","lceil"],["⌉","rceil"],["⌊","lfloor"],["⌋","rfloor"],["〈","lang"],["〉","rang"],["◊","loz"],["♠","spades"],["♣","clubs"],["♥","hearts"],["♦","diams"],["Œ","OElig"],["œ","oelig"],["Š","Scaron"],["š","scaron"],["Ÿ","Yuml"],["ˆ","circ"],["˜","tilde"],[" ","ensp"],[" ","emsp"],[" ","thinsp"],["‌","zwnj"],["‍","zwj"],["‎","lrm"],["‏","rlm"],["–","ndash"],["—","mdash"],["‘","lsquo"],["’","rsquo"],["‚","sbquo"],["“","ldquo"],["”","rdquo"],["„","bdquo"],["†","dagger"],["‡","Dagger"],["‰","permil"],["‹","lsaquo"],["›","rsaquo"]];
dhe.encode=function(str,m){
if(str){
if(!m){
str=_1c3(str,dhe.html);
str=_1c3(str,dhe.latin);
}else{
str=_1c3(str,m);
}
}
return str;
};
dhe.decode=function(str,m){
if(str){
if(!m){
str=_1c6(str,dhe.html);
str=_1c6(str,dhe.latin);
}else{
str=_1c6(str,m);
}
}
return str;
};
return dhe;
});
},"dojox/validate/regexp":function(){
define(["dojo/_base/lang","dojo/regexp","dojox/main"],function(lang,_1c9,_1ca){
var _1cb=lang.getObject("validate.regexp",true,_1ca);
_1cb=_1ca.validate.regexp={ipAddress:function(_1cc){
_1cc=(typeof _1cc=="object")?_1cc:{};
if(typeof _1cc.allowDottedDecimal!="boolean"){
_1cc.allowDottedDecimal=true;
}
if(typeof _1cc.allowDottedHex!="boolean"){
_1cc.allowDottedHex=true;
}
if(typeof _1cc.allowDottedOctal!="boolean"){
_1cc.allowDottedOctal=true;
}
if(typeof _1cc.allowDecimal!="boolean"){
_1cc.allowDecimal=true;
}
if(typeof _1cc.allowHex!="boolean"){
_1cc.allowHex=true;
}
if(typeof _1cc.allowIPv6!="boolean"){
_1cc.allowIPv6=true;
}
if(typeof _1cc.allowHybrid!="boolean"){
_1cc.allowHybrid=true;
}
var _1cd="((\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.){3}(\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])";
var _1ce="(0[xX]0*[\\da-fA-F]?[\\da-fA-F]\\.){3}0[xX]0*[\\da-fA-F]?[\\da-fA-F]";
var _1cf="(0+[0-3][0-7][0-7]\\.){3}0+[0-3][0-7][0-7]";
var _1d0="(0|[1-9]\\d{0,8}|[1-3]\\d{9}|4[01]\\d{8}|42[0-8]\\d{7}|429[0-3]\\d{6}|"+"4294[0-8]\\d{5}|42949[0-5]\\d{4}|429496[0-6]\\d{3}|4294967[01]\\d{2}|42949672[0-8]\\d|429496729[0-5])";
var _1d1="0[xX]0*[\\da-fA-F]{1,8}";
var _1d2="([\\da-fA-F]{1,4}\\:){7}[\\da-fA-F]{1,4}";
var _1d3="([\\da-fA-F]{1,4}\\:){6}"+"((\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.){3}(\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])";
var a=[];
if(_1cc.allowDottedDecimal){
a.push(_1cd);
}
if(_1cc.allowDottedHex){
a.push(_1ce);
}
if(_1cc.allowDottedOctal){
a.push(_1cf);
}
if(_1cc.allowDecimal){
a.push(_1d0);
}
if(_1cc.allowHex){
a.push(_1d1);
}
if(_1cc.allowIPv6){
a.push(_1d2);
}
if(_1cc.allowHybrid){
a.push(_1d3);
}
var _1d4="";
if(a.length>0){
_1d4="("+a.join("|")+")";
}
return _1d4;
},host:function(_1d5){
_1d5=(typeof _1d5=="object")?_1d5:{};
if(typeof _1d5.allowIP!="boolean"){
_1d5.allowIP=true;
}
if(typeof _1d5.allowLocal!="boolean"){
_1d5.allowLocal=false;
}
if(typeof _1d5.allowPort!="boolean"){
_1d5.allowPort=true;
}
if(typeof _1d5.allowNamed!="boolean"){
_1d5.allowNamed=false;
}
var _1d6="(?:[\\da-zA-Z](?:[-\\da-zA-Z]{0,61}[\\da-zA-Z])?)";
var _1d7="(?:[a-zA-Z](?:[-\\da-zA-Z]{0,6}[\\da-zA-Z])?)";
var _1d8=_1d5.allowPort?"(\\:\\d+)?":"";
var _1d9="((?:"+_1d6+"\\.)+"+_1d7+"\\.?)";
if(_1d5.allowIP){
_1d9+="|"+_1cb.ipAddress(_1d5);
}
if(_1d5.allowLocal){
_1d9+="|localhost";
}
if(_1d5.allowNamed){
_1d9+="|^[^-][a-zA-Z0-9_-]*";
}
return "("+_1d9+")"+_1d8;
},url:function(_1da){
_1da=(typeof _1da=="object")?_1da:{};
if(!("scheme" in _1da)){
_1da.scheme=[true,false];
}
var _1db=_1c9.buildGroupRE(_1da.scheme,function(q){
if(q){
return "(https?|ftps?)\\://";
}
return "";
});
var _1dc="(/(?:[^?#\\s/]+/)*(?:[^?#\\s/]+(?:\\?[^?#\\s/]*)?(?:#[A-Za-z][\\w.:-]*)?)?)?";
return _1db+_1cb.host(_1da)+_1dc;
},emailAddress:function(_1dd){
_1dd=(typeof _1dd=="object")?_1dd:{};
if(typeof _1dd.allowCruft!="boolean"){
_1dd.allowCruft=false;
}
_1dd.allowPort=false;
var _1de="([!#-'*+\\-\\/-9=?A-Z^-~]+[.])*[!#-'*+\\-\\/-9=?A-Z^-~]+";
var _1df=_1de+"@"+_1cb.host(_1dd);
if(_1dd.allowCruft){
_1df="<?(mailto\\:)?"+_1df+">?";
}
return _1df;
},emailAddressList:function(_1e0){
_1e0=(typeof _1e0=="object")?_1e0:{};
if(typeof _1e0.listSeparator!="string"){
_1e0.listSeparator="\\s;,";
}
var _1e1=_1cb.emailAddress(_1e0);
var _1e2="("+_1e1+"\\s*["+_1e0.listSeparator+"]\\s*)*"+_1e1+"\\s*["+_1e0.listSeparator+"]?\\s*";
return _1e2;
},numberFormat:function(_1e3){
_1e3=(typeof _1e3=="object")?_1e3:{};
if(typeof _1e3.format=="undefined"){
_1e3.format="###-###-####";
}
var _1e4=function(_1e5){
return _1c9.escapeString(_1e5,"?").replace(/\?/g,"\\d?").replace(/#/g,"\\d");
};
return _1c9.buildGroupRE(_1e3.format,_1e4);
},ca:{postalCode:function(){
return "([A-Z][0-9][A-Z] [0-9][A-Z][0-9])";
},province:function(){
return "(AB|BC|MB|NB|NL|NS|NT|NU|ON|PE|QC|SK|YT)";
}},us:{state:function(_1e6){
_1e6=(typeof _1e6=="object")?_1e6:{};
if(typeof _1e6.allowTerritories!="boolean"){
_1e6.allowTerritories=true;
}
if(typeof _1e6.allowMilitary!="boolean"){
_1e6.allowMilitary=true;
}
var _1e7="AL|AK|AZ|AR|CA|CO|CT|DE|DC|FL|GA|HI|ID|IL|IN|IA|KS|KY|LA|ME|MD|MA|MI|MN|MS|MO|MT|"+"NE|NV|NH|NJ|NM|NY|NC|ND|OH|OK|OR|PA|RI|SC|SD|TN|TX|UT|VT|VA|WA|WV|WI|WY";
var _1e8="AS|FM|GU|MH|MP|PW|PR|VI";
var _1e9="AA|AE|AP";
if(_1e6.allowTerritories){
_1e7+="|"+_1e8;
}
if(_1e6.allowMilitary){
_1e7+="|"+_1e9;
}
return "("+_1e7+")";
}}};
return _1cb;
});
},"dojox/widget/Standby":function(){
define(["dojo/_base/kernel","dojo/_base/declare","dojo/_base/array","dojo/_base/event","dojo/_base/sniff","dojo/dom","dojo/dom-attr","dojo/dom-construct","dojo/dom-geometry","dojo/dom-style","dojo/window","dojo/_base/window","dojo/_base/fx","dojo/fx","dijit/_Widget","dijit/_TemplatedMixin","dijit/registry"],function(_1ea,_1eb,_1ec,_1ed,has,dom,attr,_1ee,_1ef,_1f0,_1f1,_1f2,_1f3,fx,_1f4,_1f5,_1f6){
_1ea.experimental("dojox.widget.Standby");
return _1eb("dojox.widget.Standby",[_1f4,_1f5],{image:require.toUrl("dojox/widget/Standby/images/loading.gif").toString(),imageText:"Please Wait...",text:"Please wait...",centerIndicator:"image",target:"",color:"#C0C0C0",duration:500,zIndex:"auto",opacity:0.75,templateString:"<div>"+"<div style=\"display: none; opacity: 0; z-index: 9999; "+"position: absolute; cursor:wait;\" dojoAttachPoint=\"_underlayNode\"></div>"+"<img src=\"${image}\" style=\"opacity: 0; display: none; z-index: -10000; "+"position: absolute; top: 0px; left: 0px; cursor:wait;\" "+"dojoAttachPoint=\"_imageNode\">"+"<div style=\"opacity: 0; display: none; z-index: -10000; position: absolute; "+"top: 0px;\" dojoAttachPoint=\"_textNode\"></div>"+"</div>",_underlayNode:null,_imageNode:null,_textNode:null,_centerNode:null,_displayed:false,_resizeCheck:null,_started:false,_parent:null,startup:function(args){
if(!this._started){
if(typeof this.target==="string"){
var w=_1f6.byId(this.target);
this.target=w?w.domNode:dom.byId(this.target);
}
if(this.text){
this._textNode.innerHTML=this.text;
}
if(this.centerIndicator==="image"){
this._centerNode=this._imageNode;
attr.set(this._imageNode,"src",this.image);
attr.set(this._imageNode,"alt",this.imageText);
}else{
this._centerNode=this._textNode;
}
_1f0.set(this._underlayNode,{display:"none",backgroundColor:this.color});
_1f0.set(this._centerNode,"display","none");
this.connect(this._underlayNode,"onclick","_ignore");
if(this.domNode.parentNode&&this.domNode.parentNode!=_1f2.body()){
_1f2.body().appendChild(this.domNode);
}
if(has("ie")==7){
this._ieFixNode=_1ee.create("div");
_1f0.set(this._ieFixNode,{opacity:"0",zIndex:"-1000",position:"absolute",top:"-1000px"});
_1f2.body().appendChild(this._ieFixNode);
}
this.inherited(arguments);
}
},show:function(){
if(!this._displayed){
if(this._anim){
this._anim.stop();
delete this._anim;
}
this._displayed=true;
this._size();
this._disableOverflow();
this._fadeIn();
}
},hide:function(){
if(this._displayed){
if(this._anim){
this._anim.stop();
delete this._anim;
}
this._size();
this._fadeOut();
this._displayed=false;
if(this._resizeCheck!==null){
clearInterval(this._resizeCheck);
this._resizeCheck=null;
}
}
},isVisible:function(){
return this._displayed;
},onShow:function(){
},onHide:function(){
},uninitialize:function(){
this._displayed=false;
if(this._resizeCheck){
clearInterval(this._resizeCheck);
}
_1f0.set(this._centerNode,"display","none");
_1f0.set(this._underlayNode,"display","none");
if(has("ie")==7&&this._ieFixNode){
_1f2.body().removeChild(this._ieFixNode);
delete this._ieFixNode;
}
if(this._anim){
this._anim.stop();
delete this._anim;
}
this.target=null;
this._imageNode=null;
this._textNode=null;
this._centerNode=null;
this.inherited(arguments);
},_size:function(){
if(this._displayed){
var dir=attr.get(_1f2.body(),"dir");
if(dir){
dir=dir.toLowerCase();
}
var _1f7;
var _1f8=this._scrollerWidths();
var _1f9=this.target;
var _1fa=_1f0.get(this._centerNode,"display");
_1f0.set(this._centerNode,"display","block");
var box=_1ef.position(_1f9,true);
if(_1f9===_1f2.body()||_1f9===_1f2.doc){
box=_1f1.getBox();
box.x=box.l;
box.y=box.t;
}
var _1fb=_1ef.getMarginBox(this._centerNode);
_1f0.set(this._centerNode,"display",_1fa);
if(this._ieFixNode){
_1f7=-this._ieFixNode.offsetTop/1000;
box.x=Math.floor((box.x+0.9)/_1f7);
box.y=Math.floor((box.y+0.9)/_1f7);
box.w=Math.floor((box.w+0.9)/_1f7);
box.h=Math.floor((box.h+0.9)/_1f7);
}
var zi=_1f0.get(_1f9,"zIndex");
var ziUl=zi;
var ziIn=zi;
if(this.zIndex==="auto"){
if(zi!="auto"){
ziUl=parseInt(ziUl,10)+1;
ziIn=parseInt(ziIn,10)+2;
}else{
var _1fc=_1f9.parentNode;
var _1fd=-100000;
while(_1fc&&_1fc!==_1f2.body()){
zi=_1f0.get(_1fc,"zIndex");
if(!zi||zi==="auto"){
_1fc=_1fc.parentNode;
}else{
var _1fe=parseInt(zi,10);
if(_1fd<_1fe){
_1fd=_1fe;
ziUl=_1fe+1;
ziIn=_1fe+2;
}
_1fc=_1fc.parentNode;
}
}
}
}else{
ziUl=parseInt(this.zIndex,10)+1;
ziIn=parseInt(this.zIndex,10)+2;
}
_1f0.set(this._centerNode,"zIndex",ziIn);
_1f0.set(this._underlayNode,"zIndex",ziUl);
var pn=_1f9.parentNode;
if(pn&&pn!==_1f2.body()&&_1f9!==_1f2.body()&&_1f9!==_1f2.doc){
var obh=box.h;
var obw=box.w;
var _1ff=_1ef.position(pn,true);
if(this._ieFixNode){
_1f7=-this._ieFixNode.offsetTop/1000;
_1ff.x=Math.floor((_1ff.x+0.9)/_1f7);
_1ff.y=Math.floor((_1ff.y+0.9)/_1f7);
_1ff.w=Math.floor((_1ff.w+0.9)/_1f7);
_1ff.h=Math.floor((_1ff.h+0.9)/_1f7);
}
_1ff.w-=pn.scrollHeight>pn.clientHeight&&pn.clientHeight>0?_1f8.v:0;
_1ff.h-=pn.scrollWidth>pn.clientWidth&&pn.clientWidth>0?_1f8.h:0;
if(dir==="rtl"){
if(has("opera")){
box.x+=pn.scrollHeight>pn.clientHeight&&pn.clientHeight>0?_1f8.v:0;
_1ff.x+=pn.scrollHeight>pn.clientHeight&&pn.clientHeight>0?_1f8.v:0;
}else{
if(has("ie")){
_1ff.x+=pn.scrollHeight>pn.clientHeight&&pn.clientHeight>0?_1f8.v:0;
}else{
if(has("webkit")){
}
}
}
}
if(_1ff.w<box.w){
box.w=box.w-_1ff.w;
}
if(_1ff.h<box.h){
box.h=box.h-_1ff.h;
}
var _200=_1ff.y;
var _201=_1ff.y+_1ff.h;
var bTop=box.y;
var _202=box.y+obh;
var _203=_1ff.x;
var _204=_1ff.x+_1ff.w;
var _205=box.x;
var _206=box.x+obw;
var _207;
if(_202>_200&&bTop<_200){
box.y=_1ff.y;
_207=_200-bTop;
var _208=obh-_207;
if(_208<_1ff.h){
box.h=_208;
}else{
box.h-=2*(pn.scrollWidth>pn.clientWidth&&pn.clientWidth>0?_1f8.h:0);
}
}else{
if(bTop<_201&&_202>_201){
box.h=_201-bTop;
}else{
if(_202<=_200||bTop>=_201){
box.h=0;
}
}
}
if(_206>_203&&_205<_203){
box.x=_1ff.x;
_207=_203-_205;
var _209=obw-_207;
if(_209<_1ff.w){
box.w=_209;
}else{
box.w-=2*(pn.scrollHeight>pn.clientHeight&&pn.clientHeight>0?_1f8.w:0);
}
}else{
if(_205<_204&&_206>_204){
box.w=_204-_205;
}else{
if(_206<=_203||_205>=_204){
box.w=0;
}
}
}
}
if(box.h>0&&box.w>0){
_1f0.set(this._underlayNode,{display:"block",width:box.w+"px",height:box.h+"px",top:box.y+"px",left:box.x+"px"});
var _20a=["borderRadius","borderTopLeftRadius","borderTopRightRadius","borderBottomLeftRadius","borderBottomRightRadius"];
this._cloneStyles(_20a);
if(!has("ie")){
_20a=["MozBorderRadius","MozBorderRadiusTopleft","MozBorderRadiusTopright","MozBorderRadiusBottomleft","MozBorderRadiusBottomright","WebkitBorderRadius","WebkitBorderTopLeftRadius","WebkitBorderTopRightRadius","WebkitBorderBottomLeftRadius","WebkitBorderBottomRightRadius"];
this._cloneStyles(_20a,this);
}
var _20b=(box.h/2)-(_1fb.h/2);
var _20c=(box.w/2)-(_1fb.w/2);
if(box.h>=_1fb.h&&box.w>=_1fb.w){
_1f0.set(this._centerNode,{top:(_20b+box.y)+"px",left:(_20c+box.x)+"px",display:"block"});
}else{
_1f0.set(this._centerNode,"display","none");
}
}else{
_1f0.set(this._underlayNode,"display","none");
_1f0.set(this._centerNode,"display","none");
}
if(this._resizeCheck===null){
var self=this;
this._resizeCheck=setInterval(function(){
self._size();
},100);
}
}
},_cloneStyles:function(list){
_1ec.forEach(list,function(s){
_1f0.set(this._underlayNode,s,_1f0.get(this.target,s));
},this);
},_fadeIn:function(){
var self=this;
var _20d=_1f3.animateProperty({duration:self.duration,node:self._underlayNode,properties:{opacity:{start:0,end:self.opacity}}});
var _20e=_1f3.animateProperty({duration:self.duration,node:self._centerNode,properties:{opacity:{start:0,end:1}},onEnd:function(){
self.onShow();
delete self._anim;
}});
this._anim=fx.combine([_20d,_20e]);
this._anim.play();
},_fadeOut:function(){
var self=this;
var _20f=_1f3.animateProperty({duration:self.duration,node:self._underlayNode,properties:{opacity:{start:self.opacity,end:0}},onEnd:function(){
_1f0.set(this.node,{"display":"none","zIndex":"-1000"});
}});
var _210=_1f3.animateProperty({duration:self.duration,node:self._centerNode,properties:{opacity:{start:1,end:0}},onEnd:function(){
_1f0.set(this.node,{"display":"none","zIndex":"-1000"});
self.onHide();
self._enableOverflow();
delete self._anim;
}});
this._anim=fx.combine([_20f,_210]);
this._anim.play();
},_ignore:function(e){
if(e){
_1ed.stop(e);
}
},_scrollerWidths:function(){
var div=_1ee.create("div");
_1f0.set(div,{position:"absolute",opacity:0,overflow:"hidden",width:"50px",height:"50px",zIndex:"-100",top:"-200px",padding:"0px",margin:"0px"});
var iDiv=_1ee.create("div");
_1f0.set(iDiv,{width:"200px",height:"10px"});
div.appendChild(iDiv);
_1f2.body().appendChild(div);
var b=_1ef.getContentBox(div);
_1f0.set(div,"overflow","scroll");
var a=_1ef.getContentBox(div);
_1f2.body().removeChild(div);
return {v:b.w-a.w,h:b.h-a.h};
},_setTextAttr:function(text){
this._textNode.innerHTML=text;
this.text=text;
},_setColorAttr:function(c){
_1f0.set(this._underlayNode,"backgroundColor",c);
this.color=c;
},_setImageTextAttr:function(text){
attr.set(this._imageNode,"alt",text);
this.imageText=text;
},_setImageAttr:function(url){
attr.set(this._imageNode,"src",url);
this.image=url;
},_setCenterIndicatorAttr:function(_211){
this.centerIndicator=_211;
if(_211==="image"){
this._centerNode=this._imageNode;
_1f0.set(this._textNode,"display","none");
}else{
this._centerNode=this._textNode;
_1f0.set(this._imageNode,"display","none");
}
},_disableOverflow:function(){
if(this.target===_1f2.body()||this.target===_1f2.doc){
this._overflowDisabled=true;
var body=_1f2.body();
if(body.style&&body.style.overflow){
this._oldOverflow=_1f0.get(body,"overflow");
}else{
this._oldOverflow="";
}
if(has("ie")&&!has("quirks")){
if(body.parentNode&&body.parentNode.style&&body.parentNode.style.overflow){
this._oldBodyParentOverflow=body.parentNode.style.overflow;
}else{
try{
this._oldBodyParentOverflow=_1f0.get(body.parentNode,"overflow");
}
catch(e){
this._oldBodyParentOverflow="scroll";
}
}
_1f0.set(body.parentNode,"overflow","hidden");
}
_1f0.set(body,"overflow","hidden");
}
},_enableOverflow:function(){
if(this._overflowDisabled){
delete this._overflowDisabled;
var body=_1f2.body();
if(has("ie")&&!has("quirks")){
body.parentNode.style.overflow=this._oldBodyParentOverflow;
delete this._oldBodyParentOverflow;
}
_1f0.set(body,"overflow",this._oldOverflow);
if(has("webkit")){
var div=_1ee.create("div",{style:{height:"2px"}});
body.appendChild(div);
setTimeout(function(){
body.removeChild(div);
},0);
}
delete this._oldOverflow;
}
}});
});
},"dojox/validate/_base":function(){
define(["dojo/_base/lang","dojo/regexp","dojo/number","./regexp"],function(lang,_212,_213,_214){
var _215=lang.getObject("dojox.validate",true);
_215.isText=function(_216,_217){
_217=(typeof _217=="object")?_217:{};
if(/^\s*$/.test(_216)){
return false;
}
if(typeof _217.length=="number"&&_217.length!=_216.length){
return false;
}
if(typeof _217.minlength=="number"&&_217.minlength>_216.length){
return false;
}
if(typeof _217.maxlength=="number"&&_217.maxlength<_216.length){
return false;
}
return true;
};
_215._isInRangeCache={};
_215.isInRange=function(_218,_219){
_218=_213.parse(_218,_219);
if(isNaN(_218)){
return false;
}
_219=(typeof _219=="object")?_219:{};
var max=(typeof _219.max=="number")?_219.max:Infinity,min=(typeof _219.min=="number")?_219.min:-Infinity,dec=(typeof _219.decimal=="string")?_219.decimal:".",_21a=_215._isInRangeCache,_21b=_218+"max"+max+"min"+min+"dec"+dec;
if(typeof _21a[_21b]!="undefined"){
return _21a[_21b];
}
_21a[_21b]=!(_218<min||_218>max);
return _21a[_21b];
};
_215.isNumberFormat=function(_21c,_21d){
var re=new RegExp("^"+_214.numberFormat(_21d)+"$","i");
return re.test(_21c);
};
_215.isValidLuhn=function(_21e){
var sum=0,_21f,_220;
if(!lang.isString(_21e)){
_21e=String(_21e);
}
_21e=_21e.replace(/[- ]/g,"");
_21f=_21e.length%2;
for(var i=0;i<_21e.length;i++){
_220=parseInt(_21e.charAt(i));
if(i%2==_21f){
_220*=2;
}
if(_220>9){
_220-=9;
}
sum+=_220;
}
return !(sum%10);
};
return _215;
});
},"dojox/editor/plugins/TablePlugins":function(){
define(["dojo/_base/declare","dojo/_base/array","dojo/_base/Color","dojo/aspect","dojo/dom-attr","dojo/dom-style","dijit/_editor/_Plugin","dijit/_WidgetBase","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin","dijit/Dialog","dijit/Menu","dijit/MenuItem","dijit/MenuSeparator","dijit/ColorPalette","dojox/widget/ColorPicker","dojo/text!./resources/insertTable.html","dojo/text!./resources/modifyTable.html","dojo/i18n!./nls/TableDialog","dijit/_base/popup","dijit/popup","dojo/_base/connect","dijit/TooltipDialog","dijit/form/Button","dijit/form/DropDownButton","dijit/form/TextBox","dijit/form/FilteringSelect"],function(_221,_222,_223,_224,_225,_226,_227,_228,_229,_22a,_22b,Menu,_22c,_22d,_22e,_22f,_230,_231,_232){
dojo.experimental("dojox.editor.plugins.TablePlugins");
var _233=_221(_227,{tablesConnected:false,currentlyAvailable:false,alwaysAvailable:false,availableCurrentlySet:false,initialized:false,tableData:null,shiftKeyDown:false,editorDomNode:null,undoEnabled:true,refCount:0,doMixins:function(){
dojo.mixin(this.editor,{getAncestorElement:function(_234){
return this._sCall("getAncestorElement",[_234]);
},hasAncestorElement:function(_235){
return this._sCall("hasAncestorElement",[_235]);
},selectElement:function(elem){
this._sCall("selectElement",[elem]);
},byId:function(id){
return dojo.byId(id,this.document);
},query:function(arg,_236,_237){
var ar=dojo.query(arg,_236||this.document);
return (_237)?ar[0]:ar;
}});
},initialize:function(_238){
this.refCount++;
_238.customUndo=true;
if(this.initialized){
return;
}
this.initialized=true;
this.editor=_238;
this.editor._tablePluginHandler=this;
_238.onLoadDeferred.addCallback(dojo.hitch(this,function(){
this.editorDomNode=this.editor.editNode||this.editor.iframe.document.body.firstChild;
this._myListeners=[dojo.connect(this.editorDomNode,"mouseup",this.editor,"onClick"),dojo.connect(this.editor,"onDisplayChanged",this,"checkAvailable"),dojo.connect(this.editor,"onBlur",this,"checkAvailable"),dojo.connect(this.editor,"_saveSelection",this,function(){
this._savedTableInfo=this.getTableInfo();
}),dojo.connect(this.editor,"_restoreSelection",this,function(){
delete this._savedTableInfo;
})];
this.doMixins();
this.connectDraggable();
}));
},getTableInfo:function(_239){
if(this._savedTableInfo){
return this._savedTableInfo;
}
if(_239){
this._tempStoreTableData(false);
}
if(this.tableData){
return this.tableData;
}
var tr,trs,td,tds,tbl,cols,_23a,_23b,o;
td=this.editor.getAncestorElement("td");
if(td){
tr=td.parentNode;
}
tbl=this.editor.getAncestorElement("table");
if(tbl){
tds=dojo.query("td",tbl);
tds.forEach(function(d,i){
if(td==d){
_23a=i;
}
});
trs=dojo.query("tr",tbl);
trs.forEach(function(r,i){
if(tr==r){
_23b=i;
}
});
cols=tds.length/trs.length;
o={tbl:tbl,td:td,tr:tr,trs:trs,tds:tds,rows:trs.length,cols:cols,tdIndex:_23a,trIndex:_23b,colIndex:_23a%cols};
}else{
o={};
}
this.tableData=o;
this._tempStoreTableData(500);
return this.tableData;
},connectDraggable:function(){
if(!dojo.isIE){
return;
}
this.editorDomNode.ondragstart=dojo.hitch(this,"onDragStart");
this.editorDomNode.ondragend=dojo.hitch(this,"onDragEnd");
},onDragStart:function(){
var e=window.event;
if(!e.srcElement.id){
e.srcElement.id="tbl_"+(new Date().getTime());
}
},onDragEnd:function(){
var e=window.event;
var node=e.srcElement;
var id=node.id;
var doc=this.editor.document;
if(node.tagName.toLowerCase()=="table"){
setTimeout(function(){
var node=dojo.byId(id,doc);
dojo.removeAttr(node,"align");
},100);
}
},checkAvailable:function(){
if(this.availableCurrentlySet){
return this.currentlyAvailable;
}
if(!this.editor){
return false;
}
if(this.alwaysAvailable){
return true;
}
this.currentlyAvailable=this.editor.focused&&(this._savedTableInfo?this._savedTableInfo.tbl:this.editor.hasAncestorElement("table"));
if(this.currentlyAvailable){
this.connectTableKeys();
}else{
this.disconnectTableKeys();
}
this._tempAvailability(500);
dojo.publish(this.editor.id+"_tablePlugins",[this.currentlyAvailable]);
return this.currentlyAvailable;
},_prepareTable:function(tbl){
var tds=this.editor.query("td",tbl);
if(!tds[0].id){
tds.forEach(function(td,i){
if(!td.id){
td.id="tdid"+i+this.getTimeStamp();
}
},this);
}
return tds;
},getTimeStamp:function(){
return new Date().getTime();
},_tempStoreTableData:function(type){
if(type===true){
}else{
if(type===false){
this.tableData=null;
}else{
if(type===undefined){
console.warn("_tempStoreTableData must be passed an argument");
}else{
setTimeout(dojo.hitch(this,function(){
this.tableData=null;
}),type);
}
}
}
},_tempAvailability:function(type){
if(type===true){
this.availableCurrentlySet=true;
}else{
if(type===false){
this.availableCurrentlySet=false;
}else{
if(type===undefined){
console.warn("_tempAvailability must be passed an argument");
}else{
this.availableCurrentlySet=true;
setTimeout(dojo.hitch(this,function(){
this.availableCurrentlySet=false;
}),type);
}
}
}
},connectTableKeys:function(){
if(this.tablesConnected){
return;
}
this.tablesConnected=true;
var node=(this.editor.iframe)?this.editor.document:this.editor.editNode;
this.cnKeyDn=dojo.connect(node,"onkeydown",this,"onKeyDown");
this.cnKeyUp=dojo.connect(node,"onkeyup",this,"onKeyUp");
this._myListeners.push(dojo.connect(node,"onkeypress",this,"onKeyUp"));
},disconnectTableKeys:function(){
dojo.disconnect(this.cnKeyDn);
dojo.disconnect(this.cnKeyUp);
this.tablesConnected=false;
},onKeyDown:function(evt){
var key=evt.keyCode;
if(key==16){
this.shiftKeyDown=true;
}
if(key==9){
var o=this.getTableInfo();
o.tdIndex=(this.shiftKeyDown)?o.tdIndex-1:tabTo=o.tdIndex+1;
if(o.tdIndex>=0&&o.tdIndex<o.tds.length){
this.editor.selectElement(o.tds[o.tdIndex]);
this.currentlyAvailable=true;
this._tempAvailability(true);
this._tempStoreTableData(true);
this.stopEvent=true;
}else{
this.stopEvent=false;
this.onDisplayChanged();
}
if(this.stopEvent){
dojo.stopEvent(evt);
}
}
},onKeyUp:function(evt){
var key=evt.keyCode;
if(key==16){
this.shiftKeyDown=false;
}
if(key==37||key==38||key==39||key==40){
this.onDisplayChanged();
}
if(key==9&&this.stopEvent){
dojo.stopEvent(evt);
}
},onDisplayChanged:function(){
this.currentlyAvailable=false;
this._tempStoreTableData(false);
this._tempAvailability(false);
this.checkAvailable();
},uninitialize:function(_23c){
if(this.editor==_23c){
this.refCount--;
if(!this.refCount&&this.initialized){
if(this.tablesConnected){
this.disconnectTableKeys();
}
this.initialized=false;
dojo.forEach(this._myListeners,function(l){
dojo.disconnect(l);
});
delete this._myListeners;
delete this.editor._tablePluginHandler;
delete this.editor;
}
this.inherited(arguments);
}
}});
var _23d=_221("dojox.editor.plugins.TablePlugins",_227,{iconClassPrefix:"editorIcon",useDefaultCommand:false,buttonClass:dijit.form.Button,commandName:"",label:"",alwaysAvailable:false,undoEnabled:true,onDisplayChanged:function(_23e){
if(!this.alwaysAvailable){
this.available=_23e;
this.button.set("disabled",!this.available);
}
},setEditor:function(_23f){
this.editor=_23f;
this.editor.customUndo=true;
this.inherited(arguments);
this._availableTopic=dojo.subscribe(this.editor.id+"_tablePlugins",this,"onDisplayChanged");
this.onEditorLoaded();
},onEditorLoaded:function(){
if(!this.editor._tablePluginHandler){
var _240=new _233();
_240.initialize(this.editor);
}else{
this.editor._tablePluginHandler.initialize(this.editor);
}
},selectTable:function(){
var o=this.getTableInfo();
if(o&&o.tbl){
this.editor._sCall("selectElement",[o.tbl]);
}
},_initButton:function(){
this.command=this.name;
this.label=this.editor.commands[this.command]=this._makeTitle(this.command);
this.inherited(arguments);
delete this.command;
this.connect(this.button,"onClick","modTable");
this.onDisplayChanged(false);
},modTable:function(cmd,args){
if(dojo.isIE){
this.editor.focus();
}
this.begEdit();
var o=this.getTableInfo();
var sw=(dojo.isString(cmd))?cmd:this.name;
var r,c,i;
var _241=false;
switch(sw){
case "insertTableRowBefore":
r=o.tbl.insertRow(o.trIndex);
for(i=0;i<o.cols;i++){
c=r.insertCell(-1);
c.innerHTML="&nbsp;";
}
break;
case "insertTableRowAfter":
r=o.tbl.insertRow(o.trIndex+1);
for(i=0;i<o.cols;i++){
c=r.insertCell(-1);
c.innerHTML="&nbsp;";
}
break;
case "insertTableColumnBefore":
o.trs.forEach(function(r){
c=r.insertCell(o.colIndex);
c.innerHTML="&nbsp;";
});
_241=true;
break;
case "insertTableColumnAfter":
o.trs.forEach(function(r){
c=r.insertCell(o.colIndex+1);
c.innerHTML="&nbsp;";
});
_241=true;
break;
case "deleteTableRow":
o.tbl.deleteRow(o.trIndex);
break;
case "deleteTableColumn":
o.trs.forEach(function(tr){
tr.deleteCell(o.colIndex);
});
_241=true;
break;
case "modifyTable":
break;
case "insertTable":
break;
}
if(_241){
this.makeColumnsEven();
}
this.endEdit();
},begEdit:function(){
if(this.editor._tablePluginHandler.undoEnabled){
if(this.editor.customUndo){
this.editor.beginEditing();
}else{
this.valBeforeUndo=this.editor.getValue();
}
}
},endEdit:function(){
if(this.editor._tablePluginHandler.undoEnabled){
if(this.editor.customUndo){
this.editor.endEditing();
}else{
var _242=this.editor.getValue();
this.editor.setValue(this.valBeforeUndo);
this.editor.replaceValue(_242);
}
this.editor.onDisplayChanged();
}
},makeColumnsEven:function(){
setTimeout(dojo.hitch(this,function(){
var o=this.getTableInfo(true);
var w=Math.floor(100/o.cols);
o.tds.forEach(function(d){
dojo.attr(d,"width",w+"%");
});
}),10);
},getTableInfo:function(_243){
return this.editor._tablePluginHandler.getTableInfo(_243);
},_makeTitle:function(str){
this._strings=dojo.i18n.getLocalization("dojox.editor.plugins","TableDialog");
var _244=this._strings[str+"Title"]||this._strings[str+"Label"]||str;
return _244;
},getSelectedCells:function(){
var _245=[];
var tbl=this.getTableInfo().tbl;
this.editor._tablePluginHandler._prepareTable(tbl);
var e=this.editor;
var text=e._sCall("getSelectedHtml",[null]);
var str=text.match(/id="*\w*"*/g);
dojo.forEach(str,function(a){
var id=a.substring(3,a.length);
if(id.charAt(0)=="\""&&id.charAt(id.length-1)=="\""){
id=id.substring(1,id.length-1);
}
var node=e.byId(id);
if(node&&node.tagName.toLowerCase()=="td"){
_245.push(node);
}
},this);
if(!_245.length){
var sel=dijit.range.getSelection(e.window);
if(sel.rangeCount){
var r=sel.getRangeAt(0);
var node=r.startContainer;
while(node&&node!=e.editNode&&node!=e.document){
if(node.nodeType===1){
var tg=node.tagName?node.tagName.toLowerCase():"";
if(tg==="td"){
return [node];
}
}
node=node.parentNode;
}
}
}
return _245;
},updateState:function(){
if(this.button){
if((this.available||this.alwaysAvailable)&&!this.get("disabled")){
this.button.set("disabled",false);
}else{
this.button.set("disabled",true);
}
}
},destroy:function(){
this.inherited(arguments);
dojo.unsubscribe(this._availableTopic);
this.editor._tablePluginHandler.uninitialize(this.editor);
}});
var _246=_221(_23d,{constructor:function(){
this.connect(this,"setEditor",function(_247){
_247.onLoadDeferred.addCallback(dojo.hitch(this,function(){
this._createContextMenu();
}));
this.button.domNode.style.display="none";
});
},destroy:function(){
if(this.menu){
this.menu.destroyRecursive();
delete this.menu;
}
this.inherited(arguments);
},_initButton:function(){
this.inherited(arguments);
if(this.name==="tableContextMenu"){
this.button.domNode.display="none";
}
},_createContextMenu:function(){
var _248=new Menu({targetNodeIds:[this.editor.iframe]});
var _249=_232;
_248.addChild(new _22c({label:_249.selectTableLabel,onClick:dojo.hitch(this,"selectTable")}));
_248.addChild(new _22d());
_248.addChild(new _22c({label:_249.insertTableRowBeforeLabel,onClick:dojo.hitch(this,"modTable","insertTableRowBefore")}));
_248.addChild(new _22c({label:_249.insertTableRowAfterLabel,onClick:dojo.hitch(this,"modTable","insertTableRowAfter")}));
_248.addChild(new _22c({label:_249.insertTableColumnBeforeLabel,onClick:dojo.hitch(this,"modTable","insertTableColumnBefore")}));
_248.addChild(new _22c({label:_249.insertTableColumnAfterLabel,onClick:dojo.hitch(this,"modTable","insertTableColumnAfter")}));
_248.addChild(new _22d());
_248.addChild(new _22c({label:_249.deleteTableRowLabel,onClick:dojo.hitch(this,"modTable","deleteTableRow")}));
_248.addChild(new _22c({label:_249.deleteTableColumnLabel,onClick:dojo.hitch(this,"modTable","deleteTableColumn")}));
this.menu=_248;
}});
var _24a=_221("dojox.editor.plugins.EditorTableDialog",[_22b,_229,_22a],{baseClass:"EditorTableDialog",templateString:_230,postMixInProperties:function(){
dojo.mixin(this,_232);
this.inherited(arguments);
},postCreate:function(){
dojo.addClass(this.domNode,this.baseClass);
this.inherited(arguments);
},onInsert:function(){
var rows=this.selectRow.get("value")||1,cols=this.selectCol.get("value")||1,_24b=this.selectWidth.get("value"),_24c=this.selectWidthType.get("value"),_24d=this.selectBorder.get("value"),pad=this.selectPad.get("value"),_24e=this.selectSpace.get("value"),_24f="tbl_"+(new Date().getTime()),t="<table id=\""+_24f+"\"width=\""+_24b+((_24c=="percent")?"%":"")+"\" border=\""+_24d+"\" cellspacing=\""+_24e+"\" cellpadding=\""+pad+"\">\n";
for(var r=0;r<rows;r++){
t+="\t<tr>\n";
for(var c=0;c<cols;c++){
t+="\t\t<td width=\""+(Math.floor(100/cols))+"%\">&nbsp;</td>\n";
}
t+="\t</tr>\n";
}
t+="</table><br />";
var cl=dojo.connect(this,"onHide",function(){
dojo.disconnect(cl);
var self=this;
setTimeout(function(){
self.destroyRecursive();
},10);
});
this.hide();
this.onBuildTable({htmlText:t,id:_24f});
},onCancel:function(){
var c=dojo.connect(this,"onHide",function(){
dojo.disconnect(c);
var self=this;
setTimeout(function(){
self.destroyRecursive();
},10);
});
},onBuildTable:function(_250){
}});
var _251=_221("dojox.editor.plugins.InsertTable",_23d,{alwaysAvailable:true,modTable:function(){
var w=new _24a({});
w.show();
var c=dojo.connect(w,"onBuildTable",this,function(obj){
dojo.disconnect(c);
this.editor.focus();
var res=this.editor.execCommand("inserthtml",obj.htmlText);
});
}});
var _252=_221([_22b,_229,_22a],{baseClass:"EditorTableDialog",table:null,tableAtts:{},templateString:_231,postMixInProperties:function(){
dojo.mixin(this,_232);
this.inherited(arguments);
},postCreate:function(){
dojo.addClass(this.domNode,this.baseClass);
this.inherited(arguments);
var w1=new this.colorPicker({params:this.params});
this.connect(w1,"onChange",function(_253){
if(!this._started){
return;
}
dijit.popup.close(w1);
this.setBrdColor(_253);
});
this.connect(w1,"onBlur",function(){
dijit.popup.close(w1);
});
this.connect(this.borderCol,"click",function(){
w1.set("value",this.brdColor,false);
dijit.popup.open({popup:w1,around:this.borderCol});
w1.focus();
});
var w2=new this.colorPicker({params:this.params});
this.connect(w2,"onChange",function(_254){
if(!this._started){
return;
}
dijit.popup.close(w2);
this.setBkColor(_254);
});
this.connect(w2,"onBlur",function(){
dijit.popup.close(w2);
});
this.connect(this.backgroundCol,"click",function(){
w2.set("value",this.bkColor,false);
dijit.popup.open({popup:w2,around:this.backgroundCol});
w2.focus();
});
this.own(w1,w2);
this.pickers=[w1,w2];
this.setBrdColor(_226.get(this.table,"borderColor"));
this.setBkColor(_226.get(this.table,"backgroundColor"));
var w=_225.get(this.table,"width");
if(!w){
w=this.table.style.width;
}
var p="pixels";
if(dojo.isString(w)&&w.indexOf("%")>-1){
p="percent";
w=w.replace(/%/,"");
}
if(w){
this.selectWidth.set("value",w);
this.selectWidthType.set("value",p);
}else{
this.selectWidth.set("value","");
this.selectWidthType.set("value","percent");
}
this.selectBorder.set("value",_225.get(this.table,"border"));
this.selectPad.set("value",_225.get(this.table,"cellPadding"));
this.selectSpace.set("value",_225.get(this.table,"cellSpacing"));
this.selectAlign.set("value",_225.get(this.table,"align"));
},startup:function(){
_222.forEach(this.pickers,function(_255){
_255.startup();
});
this.inherited(arguments);
},setBrdColor:function(_256){
this.brdColor=_256;
_226.set(this.borderCol,"backgroundColor",_256);
},setBkColor:function(_257){
this.bkColor=_257;
_226.set(this.backgroundCol,"backgroundColor",_257);
},onSet:function(){
_226.set(this.table,"borderColor",this.brdColor);
_226.set(this.table,"backgroundColor",this.bkColor);
if(this.selectWidth.get("value")){
_226.set(this.table,"width","");
_225.set(this.table,"width",(this.selectWidth.get("value")+((this.selectWidthType.get("value")=="pixels")?"":"%")));
}
_225.set(this.table,"border",this.selectBorder.get("value"));
_225.set(this.table,"cellPadding",this.selectPad.get("value"));
_225.set(this.table,"cellSpacing",this.selectSpace.get("value"));
_225.set(this.table,"align",this.selectAlign.get("value"));
var c=dojo.connect(this,"onHide",function(){
dojo.disconnect(c);
var self=this;
setTimeout(function(){
self.destroyRecursive();
},10);
});
this.hide();
},onCancel:function(){
var c=dojo.connect(this,"onHide",function(){
dojo.disconnect(c);
var self=this;
setTimeout(function(){
self.destroyRecursive();
},10);
});
},onSetTable:function(_258){
}});
var _259=_221("dojox.editor.plugins.ModifyTable",_23d,{colorPicker:_22e,modTable:function(){
if(!this.editor._tablePluginHandler.checkAvailable()){
return;
}
var o=this.getTableInfo();
var w=new _252({table:o.tbl,colorPicker:typeof this.colorPicker==="string"?require(this.colorPicker):this.colorPicker,params:this.params});
w.show();
this.connect(w,"onSetTable",function(_25a){
var o=this.getTableInfo();
_226.set(o.td,"backgroundColor",_25a);
});
}});
var _25b=_221([_228,_229,_22a],{colorPicker:_22f,templateString:"<div style='display: none; position: absolute; top: -10000; z-index: -10000'>"+"<div dojoType='dijit.TooltipDialog' dojoAttachPoint='dialog' class='dojoxEditorColorPicker'>"+"<div dojoAttachPoint='_colorPicker'></div>"+"<div style='margin: 0.5em 0em 0em 0em'>"+"<button dojoType='dijit.form.Button' type='submit' dojoAttachPoint='_setButton'>${buttonSet}</button>"+"&nbsp;"+"<button dojoType='dijit.form.Button' type='button' dojoAttachPoint='_cancelButton'>${buttonCancel}</button>"+"</div>"+"</div>"+"</div>",widgetsInTemplate:true,constructor:function(){
dojo.mixin(this,_232);
},postCreate:function(){
var _25c=typeof this.colorPicker=="string"?require(this.colorPicker):this.colorPicker;
this._colorPicker=new _25c({params:this.params},this._colorPicker);
},startup:function(){
if(!this._started){
this.inherited(arguments);
this.connect(this.dialog,"execute",function(){
this.onChange(this.get("value"));
});
this.connect(this._cancelButton,"onClick",function(){
dijit.popup.close(this.dialog);
});
this.connect(this.dialog,"onCancel","onCancel");
dojo.style(this.domNode,"display","block");
}
},_setValueAttr:function(_25d,_25e){
this._colorPicker.set("value",_25d,_25e);
},_getValueAttr:function(){
return this._colorPicker.get("value");
},onChange:function(_25f){
},onCancel:function(){
}});
var _260=_221("dojox.editor.plugins.ColorTableCell",_23d,{colorPicker:_22f,constructor:function(){
this.closable=true;
this.buttonClass=dijit.form.DropDownButton;
var self=this,_261,_262={colorPicker:this.colorPicker,params:this.params};
if(!this.dropDown){
_261=new _25b(_262);
_261.startup();
this.dropDown=_261.dialog;
}else{
_261=this.dropDown;
_261.set(_262);
}
this.connect(_261,"onChange",function(_263){
this.editor.focus();
this.modTable(null,_263);
});
this.connect(_261,"onCancel",function(){
this.editor.focus();
});
_224.before(this.dropDown,"onOpen",function(){
var o=self.getTableInfo(),tds=self.getSelectedCells(o.tbl);
if(tds&&tds.length>0){
var t=tds[0]===self.lastObject?tds[0]:tds[tds.length-1],_264;
while(t&&t!==self.editor.document&&((_264=dojo.style(t,"backgroundColor"))==="transparent"||_264.indexOf("rgba")===0)){
t=t.parentNode;
}
if(_264!=="transparent"&&_264.indexOf("rgba")!==0){
_261.set("value",_223.fromString(_264).toHex());
}
}
});
this.connect(this,"setEditor",function(_265){
_265.onLoadDeferred.addCallback(dojo.hitch(this,function(){
this.connect(this.editor.editNode,"onmouseup",function(evt){
this.lastObject=evt.target;
});
}));
});
},_initButton:function(){
this.command=this.name;
this.label=this.editor.commands[this.command]=this._makeTitle(this.command);
this.inherited(arguments);
delete this.command;
this.onDisplayChanged(false);
},modTable:function(cmd,args){
this.begEdit();
var o=this.getTableInfo();
var tds=this.getSelectedCells(o.tbl);
dojo.forEach(tds,function(td){
dojo.style(td,"backgroundColor",args);
});
this.endEdit();
}});
function _266(args){
return new _23d(args);
};
_227.registry["insertTableRowBefore"]=_266;
_227.registry["insertTableRowAfter"]=_266;
_227.registry["insertTableColumnBefore"]=_266;
_227.registry["insertTableColumnAfter"]=_266;
_227.registry["deleteTableRow"]=_266;
_227.registry["deleteTableColumn"]=_266;
_227.registry["colorTableCell"]=function(args){
return new _260(args);
};
_227.registry["modifyTable"]=function(args){
return new _259(args);
};
_227.registry["insertTable"]=function(args){
return new _251(args);
};
_227.registry["tableContextMenu"]=function(args){
return new _246(args);
};
return _23d;
});
},"dojox/validate/br":function(){
define(["dojo/_base/lang","./_base"],function(lang,_267){
var br=lang.getObject("br",true,_267);
br.isValidCnpj=function(_268){
if(!lang.isString(_268)){
if(!_268){
return false;
}
_268=_268+"";
while(_268.length<14){
_268="0"+_268;
}
}
var _269={format:["##.###.###/####-##","########/####-##","############-##","##############"]};
if(_267.isNumberFormat(_268,_269)){
_268=_268.replace("/","").replace(/\./g,"").replace("-","");
var cgc=[];
var dv=[];
var i,j,tmp;
for(i=0;i<10;i++){
tmp="";
for(j=0;j<_268.length;j++){
tmp+=""+i;
}
if(_268===tmp){
return false;
}
}
for(i=0;i<12;i++){
cgc.push(parseInt(_268.charAt(i),10));
}
for(i=12;i<14;i++){
dv.push(parseInt(_268.charAt(i),10));
}
var base=[9,8,7,6,5,4,3,2,9,8,7,6].reverse();
var sum=0;
for(i=0;i<cgc.length;i++){
sum+=cgc[i]*base[i];
}
var dv0=sum%11;
if(dv0==dv[0]){
sum=0;
base=[9,8,7,6,5,4,3,2,9,8,7,6,5].reverse();
cgc.push(dv0);
for(i=0;i<cgc.length;i++){
sum+=cgc[i]*base[i];
}
var dv1=sum%11;
if(dv1===dv[1]){
return true;
}
}
}
return false;
};
br.computeCnpjDv=function(_26a){
if(!lang.isString(_26a)){
if(!_26a){
return "";
}
_26a=_26a+"";
while(_26a.length<12){
_26a="0"+_26a;
}
}
var _26b={format:["##.###.###/####","########/####","############"]};
if(_267.isNumberFormat(_26a,_26b)){
_26a=_26a.replace("/","").replace(/\./g,"");
var cgc=[];
var i,j,tmp;
for(i=0;i<10;i++){
tmp="";
for(j=0;j<_26a.length;j++){
tmp+=""+i;
}
if(_26a===tmp){
return "";
}
}
for(i=0;i<_26a.length;i++){
cgc.push(parseInt(_26a.charAt(i),10));
}
var base=[9,8,7,6,5,4,3,2,9,8,7,6].reverse();
var sum=0;
for(i=0;i<cgc.length;i++){
sum+=cgc[i]*base[i];
}
var dv0=sum%11;
sum=0;
base=[9,8,7,6,5,4,3,2,9,8,7,6,5].reverse();
cgc.push(dv0);
for(i=0;i<cgc.length;i++){
sum+=cgc[i]*base[i];
}
var dv1=sum%11;
return (""+dv0)+dv1;
}
return "";
};
br.isValidCpf=function(_26c){
if(!lang.isString(_26c)){
if(!_26c){
return false;
}
_26c=_26c+"";
while(_26c.length<11){
_26c="0"+_26c;
}
}
var _26d={format:["###.###.###-##","#########-##","###########"]};
if(_267.isNumberFormat(_26c,_26d)){
_26c=_26c.replace("-","").replace(/\./g,"");
var cpf=[];
var dv=[];
var i,j,tmp;
for(i=0;i<10;i++){
tmp="";
for(j=0;j<_26c.length;j++){
tmp+=""+i;
}
if(_26c===tmp){
return false;
}
}
for(i=0;i<9;i++){
cpf.push(parseInt(_26c.charAt(i),10));
}
for(i=9;i<12;i++){
dv.push(parseInt(_26c.charAt(i),10));
}
var base=[9,8,7,6,5,4,3,2,1].reverse();
var sum=0;
for(i=0;i<cpf.length;i++){
sum+=cpf[i]*base[i];
}
var dv0=sum%11;
if(dv0==dv[0]){
sum=0;
base=[9,8,7,6,5,4,3,2,1,0].reverse();
cpf.push(dv0);
for(i=0;i<cpf.length;i++){
sum+=cpf[i]*base[i];
}
var dv1=sum%11;
if(dv1===dv[1]){
return true;
}
}
}
return false;
};
br.computeCpfDv=function(_26e){
if(!lang.isString(_26e)){
if(!_26e){
return "";
}
_26e=_26e+"";
while(_26e.length<9){
_26e="0"+_26e;
}
}
var _26f={format:["###.###.###","#########"]};
if(_267.isNumberFormat(_26e,_26f)){
_26e=_26e.replace(/\./g,"");
var cpf=[];
for(i=0;i<10;i++){
tmp="";
for(j=0;j<_26e.length;j++){
tmp+=""+i;
}
if(_26e===tmp){
return "";
}
}
for(i=0;i<_26e.length;i++){
cpf.push(parseInt(_26e.charAt(i),10));
}
var base=[9,8,7,6,5,4,3,2,1].reverse();
var sum=0;
for(i=0;i<cpf.length;i++){
sum+=cpf[i]*base[i];
}
var dv0=sum%11;
sum=0;
base=[9,8,7,6,5,4,3,2,1,0].reverse();
cpf.push(dv0);
for(i=0;i<cpf.length;i++){
sum+=cpf[i]*base[i];
}
var dv1=sum%11;
return (""+dv0)+dv1;
}
return "";
};
return br;
});
},"url:dojox/editor/plugins/resources/insertTable.html":"<div class=\"dijitDialog\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"${id}_title\">\n\t<div dojoAttachPoint=\"titleBar\" class=\"dijitDialogTitleBar\">\n\t<span dojoAttachPoint=\"titleNode\" class=\"dijitDialogTitle\" id=\"${id}_title\">${insertTableTitle}</span>\n\t<span dojoAttachPoint=\"closeButtonNode\" class=\"dijitDialogCloseIcon\" dojoAttachEvent=\"onclick: onCancel\" title=\"${buttonCancel}\">\n\t\t<span dojoAttachPoint=\"closeText\" class=\"closeText\" title=\"${buttonCancel}\">x</span>\n\t</span>\n\t</div>\n    <div dojoAttachPoint=\"containerNode\" class=\"dijitDialogPaneContent\">\n        <table class=\"etdTable\"><tr>\n            <td>\n                <label>${rows}</label>\n\t\t\t</td><td>\n                <span dojoAttachPoint=\"selectRow\" dojoType=\"dijit.form.TextBox\" value=\"2\"></span>\n            </td><td><table><tr><td class=\"inner\">\n                <label>${columns}</label>\n\t\t\t</td><td class=\"inner\">\n                <span dojoAttachPoint=\"selectCol\" dojoType=\"dijit.form.TextBox\" value=\"2\"></span>\n            </td></tr></table></td></tr>\t\t\n\t\t\t<tr><td>\n                <label>${tableWidth}</label>\n            </td><td>\n                <span dojoAttachPoint=\"selectWidth\" dojoType=\"dijit.form.TextBox\" value=\"100\"></span>\n\t\t\t</td><td>\n                <select dojoAttachPoint=\"selectWidthType\" hasDownArrow=\"true\" dojoType=\"dijit.form.FilteringSelect\">\n                  <option value=\"percent\">${percent}</option>\n                  <option value=\"pixels\">${pixels}</option>\n                </select></td></tr>\t\n            <tr><td>\n                <label>${borderThickness}</label>\n            </td><td>\n                <span dojoAttachPoint=\"selectBorder\" dojoType=\"dijit.form.TextBox\" value=\"1\"></span>\n            </td><td>\n                ${pixels}\n            </td></tr><tr><td>\n                <label>${cellPadding}</label>\n            </td><td>\n                <span dojoAttachPoint=\"selectPad\" dojoType=\"dijit.form.TextBox\" value=\"0\"></span>\n            </td><td class=\"cellpad\"></td></tr><tr><td>\n                <label>${cellSpacing}</label>\n            </td><td>\n                <span dojoAttachPoint=\"selectSpace\" dojoType=\"dijit.form.TextBox\" value=\"0\"></span>\n            </td><td class=\"cellspace\"></td></tr></table>\n        <div class=\"dialogButtonContainer\">\n            <div dojoType=\"dijit.form.Button\" dojoAttachEvent=\"onClick: onInsert\">${buttonInsert}</div>\n            <div dojoType=\"dijit.form.Button\" dojoAttachEvent=\"onClick: onCancel\">${buttonCancel}</div>\n        </div>\n\t</div>\n</div>\n","url:dojox/form/resources/Uploader.html":"<span class=\"dijit dijitReset dijitInline\"\n\t><span class=\"dijitReset dijitInline dijitButtonNode\"\n\t\tdata-dojo-attach-event=\"ondijitclick:_onClick\"\n\t\t><span class=\"dijitReset dijitStretch dijitButtonContents\"\n\t\t\tdata-dojo-attach-point=\"titleNode,focusNode\"\n\t\t\trole=\"button\" aria-labelledby=\"${id}_label\"\n\t\t\t><span class=\"dijitReset dijitInline dijitIcon\" data-dojo-attach-point=\"iconNode\"></span\n\t\t\t><span class=\"dijitReset dijitToggleButtonIconChar\">&#x25CF;</span\n\t\t\t><span class=\"dijitReset dijitInline dijitButtonText\"\n\t\t\t\tid=\"${id}_label\"\n\t\t\t\tdata-dojo-attach-point=\"containerNode\"\n\t\t\t></span\n\t\t></span\n\t></span\n\t> \n\t<input ${!nameAttrSetting} type=\"${type}\" value=\"${value}\" class=\"dijitOffScreen\" tabIndex=\"-1\" data-dojo-attach-point=\"valueNode\" />\n</span>\n","url:dojox/form/resources/UploaderFileList.html":"<div class=\"dojoxUploaderFileList\">\n\t<div data-dojo-attach-point=\"progressNode\" class=\"dojoxUploaderFileListProgress\">\n\t\t<div data-dojo-attach-point=\"percentBarNode\" class=\"dojoxUploaderFileListProgressBar\"></div>\n\t\t<div data-dojo-attach-point=\"percentTextNode\" class=\"dojoxUploaderFileListPercentText\">0%</div>\n\t</div>\n\t<table class=\"dojoxUploaderFileListTable\">\n\t\t<thead>\n\t\t\t<tr class=\"dojoxUploaderFileListHeader\">\n\t\t\t\t<th class=\"dojoxUploaderIndex\">${headerIndex}</th>\n\t\t\t\t<th class=\"dojoxUploaderIcon\">${headerType}</th>\n\t\t\t\t<th class=\"dojoxUploaderFileName\">${headerFilename}</th>\n\t\t\t\t<th class=\"dojoxUploaderFileSize\" data-dojo-attach-point=\"sizeHeader\">${headerFilesize}</th>\n\t\t\t</tr>\n\t\t</thead>\n\t\t<tbody class=\"dojoxUploaderFileListContent\" data-dojo-attach-point=\"listNode\"></tbody>\n\t</table>\n<div>","url:dojox/editor/plugins/resources/modifyTable.html":"<div class=\"dijitDialog\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"${id}_title\">\n\t<div dojoAttachPoint=\"titleBar\" class=\"dijitDialogTitleBar\">\n\t<span dojoAttachPoint=\"titleNode\" class=\"dijitDialogTitle\" id=\"${id}_title\">${modifyTableTitle}</span>\n\t<span dojoAttachPoint=\"closeButtonNode\" class=\"dijitDialogCloseIcon\" dojoAttachEvent=\"onclick: onCancel\" title=\"${buttonCancel}\">\n\t\t<span dojoAttachPoint=\"closeText\" class=\"closeText\" title=\"${buttonCancel}\">x</span>\n\t</span>\n\t</div>\n    <div dojoAttachPoint=\"containerNode\" class=\"dijitDialogPaneContent\">\n        <table class=\"etdTable\">\n          <tr><td>\n                <label>${backgroundColor}</label>\n            </td><td colspan=\"2\">\n                <span class=\"colorSwatchBtn\" dojoAttachPoint=\"backgroundCol\"></span>\n            </td></tr><tr><td>\n                <label>${borderColor}</label>\n            </td><td colspan=\"2\">\n                <span class=\"colorSwatchBtn\" dojoAttachPoint=\"borderCol\"></span>\n            </td></tr><tr><td>\n                <label>${align}</label>\n            </td><td colspan=\"2\">\t\n                <select dojoAttachPoint=\"selectAlign\" dojoType=\"dijit.form.FilteringSelect\">\n                  <option value=\"default\">${default}</option>\n                  <option value=\"left\">${left}</option>\n                  <option value=\"center\">${center}</option>\n                  <option value=\"right\">${right}</option>\n                </select>\n            </td></tr>\n            <tr><td>\n                <label>${tableWidth}</label>\n            </td><td>\n                <span dojoAttachPoint=\"selectWidth\" dojoType=\"dijit.form.TextBox\" value=\"100\"></span>\n            </td><td>\n                <select dojoAttachPoint=\"selectWidthType\" hasDownArrow=\"true\" dojoType=\"dijit.form.FilteringSelect\">\n                  <option value=\"percent\">${percent}</option>\n                  <option value=\"pixels\">${pixels}</option>\n                </select></td></tr>\t\n            <tr><td>\n                <label>${borderThickness}</label>\n            </td><td>\n                <span dojoAttachPoint=\"selectBorder\" dojoType=\"dijit.form.TextBox\" value=\"1\"></span>\n            </td><td>\n                ${pixels}\n            </td></tr><tr><td>\n                <label>${cellPadding}</label>\n            </td><td>\n                <span dojoAttachPoint=\"selectPad\" dojoType=\"dijit.form.TextBox\" value=\"0\"></span>\n            </td><td class=\"cellpad\"></td></tr><tr><td>\n                <label>${cellSpacing}</label>\n            </td><td>\n                <span dojoAttachPoint=\"selectSpace\" dojoType=\"dijit.form.TextBox\" value=\"0\"></span>\n            </td><td class=\"cellspace\"></td></tr>\n        </table>\n        <div class=\"dialogButtonContainer\">\n            <div dojoType=\"dijit.form.Button\" dojoAttachEvent=\"onClick: onSet\">${buttonSet}</div>\n            <div dojoType=\"dijit.form.Button\" dojoAttachEvent=\"onClick: onCancel\">${buttonCancel}</div>\n        </div>\n\t</div>\n</div>\n","url:dojox/widget/ColorPicker/ColorPicker.html":"<table class=\"dojoxColorPicker\" dojoAttachEvent=\"onkeypress: _handleKey\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\">\n\t<tr>\n\t\t<td valign=\"top\" class=\"dojoxColorPickerRightPad\">\n\t\t\t<div class=\"dojoxColorPickerBox\">\n\t\t\t\t<!-- Forcing ABS in style attr due to dojo DND issue with not picking it up form the class. -->\n\t\t\t\t<img title=\"${saturationPickerTitle}\" alt=\"${saturationPickerTitle}\" class=\"dojoxColorPickerPoint\" src=\"${_pickerPointer}\" tabIndex=\"0\" dojoAttachPoint=\"cursorNode\" style=\"position: absolute; top: 0px; left: 0px;\">\n\t\t\t\t<img role=\"presentation\" alt=\"\" dojoAttachPoint=\"colorUnderlay\" dojoAttachEvent=\"onclick: _setPoint, onmousedown: _stopDrag\" class=\"dojoxColorPickerUnderlay\" src=\"${_underlay}\" ondragstart=\"return false\">\n\t\t\t</div>\n\t\t</td>\n\t\t<td valign=\"top\" class=\"dojoxColorPickerRightPad\">\n\t\t\t<div class=\"dojoxHuePicker\">\n\t\t\t\t<!-- Forcing ABS in style attr due to dojo DND issue with not picking it up form the class. -->\n\t\t\t\t<img dojoAttachPoint=\"hueCursorNode\" tabIndex=\"0\" class=\"dojoxHuePickerPoint\" title=\"${huePickerTitle}\" alt=\"${huePickerTitle}\" src=\"${_huePickerPointer}\" style=\"position: absolute; top: 0px; left: 0px;\">\n\t\t\t\t<div class=\"dojoxHuePickerUnderlay\" dojoAttachPoint=\"hueNode\">\n\t\t\t\t    <img role=\"presentation\" alt=\"\" dojoAttachEvent=\"onclick: _setHuePoint, onmousedown: _stopDrag\" src=\"${_hueUnderlay}\">\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</td>\n\t\t<td valign=\"top\">\n\t\t\t<table cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\">\n\t\t\t\t<tr>\n\t\t\t\t\t<td valign=\"top\" class=\"dojoxColorPickerPreviewContainer\">\n\t\t\t\t\t\t<table cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\">\n\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t<td valign=\"top\" class=\"dojoxColorPickerRightPad\">\n\t\t\t\t\t\t\t\t\t<div dojoAttachPoint=\"previewNode\" class=\"dojoxColorPickerPreview\"></div>\n\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t\t<td valign=\"top\">\n\t\t\t\t\t\t\t\t\t<div dojoAttachPoint=\"safePreviewNode\" class=\"dojoxColorPickerWebSafePreview\"></div>\n\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t</table>\n\t\t\t\t\t</td>\n\t\t\t\t</tr>\n\t\t\t\t<tr>\n\t\t\t\t\t<td valign=\"bottom\">\n\t\t\t\t\t\t<table class=\"dojoxColorPickerOptional\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\">\n\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t\t\t<div class=\"dijitInline dojoxColorPickerRgb\" dojoAttachPoint=\"rgbNode\">\n\t\t\t\t\t\t\t\t\t\t<table cellpadding=\"1\" cellspacing=\"1\" role=\"presentation\">\n\t\t\t\t\t\t\t\t\t\t<tr><td><label for=\"${_uId}_r\">${redLabel}</label></td><td><input id=\"${_uId}_r\" dojoAttachPoint=\"Rval\" size=\"1\" dojoAttachEvent=\"onchange: _colorInputChange\"></td></tr>\n\t\t\t\t\t\t\t\t\t\t<tr><td><label for=\"${_uId}_g\">${greenLabel}</label></td><td><input id=\"${_uId}_g\" dojoAttachPoint=\"Gval\" size=\"1\" dojoAttachEvent=\"onchange: _colorInputChange\"></td></tr>\n\t\t\t\t\t\t\t\t\t\t<tr><td><label for=\"${_uId}_b\">${blueLabel}</label></td><td><input id=\"${_uId}_b\" dojoAttachPoint=\"Bval\" size=\"1\" dojoAttachEvent=\"onchange: _colorInputChange\"></td></tr>\n\t\t\t\t\t\t\t\t\t\t</table>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t\t\t<div class=\"dijitInline dojoxColorPickerHsv\" dojoAttachPoint=\"hsvNode\">\n\t\t\t\t\t\t\t\t\t\t<table cellpadding=\"1\" cellspacing=\"1\" role=\"presentation\">\n\t\t\t\t\t\t\t\t\t\t<tr><td><label for=\"${_uId}_h\">${hueLabel}</label></td><td><input id=\"${_uId}_h\" dojoAttachPoint=\"Hval\"size=\"1\" dojoAttachEvent=\"onchange: _colorInputChange\"> ${degLabel}</td></tr>\n\t\t\t\t\t\t\t\t\t\t<tr><td><label for=\"${_uId}_s\">${saturationLabel}</label></td><td><input id=\"${_uId}_s\" dojoAttachPoint=\"Sval\" size=\"1\" dojoAttachEvent=\"onchange: _colorInputChange\"> ${percentSign}</td></tr>\n\t\t\t\t\t\t\t\t\t\t<tr><td><label for=\"${_uId}_v\">${valueLabel}</label></td><td><input id=\"${_uId}_v\" dojoAttachPoint=\"Vval\" size=\"1\" dojoAttachEvent=\"onchange: _colorInputChange\"> ${percentSign}</td></tr>\n\t\t\t\t\t\t\t\t\t\t</table>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t<td colspan=\"2\">\n\t\t\t\t\t\t\t\t\t<div class=\"dojoxColorPickerHex\" dojoAttachPoint=\"hexNode\" aria-live=\"polite\">\t\n\t\t\t\t\t\t\t\t\t\t<label for=\"${_uId}_hex\">&nbsp;${hexLabel}&nbsp;</label><input id=\"${_uId}_hex\" dojoAttachPoint=\"hexCode, focusNode, valueNode\" size=\"6\" class=\"dojoxColorPickerHexCode\" dojoAttachEvent=\"onchange: _colorInputChange\">\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t</table>\n\t\t\t\t\t</td>\n\t\t\t\t</tr>\n\t\t\t</table>\n\t\t</td>\n\t</tr>\n</table>\n\n","*now":function(r){
r(["dojo/i18n!*preload*manager/nls/dojox*[]"]);
}}});
define("manager/dojox",[],1);
