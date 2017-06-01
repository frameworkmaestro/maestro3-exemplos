//>>built
require({cache:{"dijit/_editor/plugins/FontChoice":function(){
define(["require","dojo/_base/array","dojo/_base/declare","dojo/dom-construct","dojo/i18n","dojo/_base/lang","dojo/store/Memory","../../registry","../../_Widget","../../_TemplatedMixin","../../_WidgetsInTemplateMixin","../../form/FilteringSelect","../_Plugin","../range","dojo/i18n!../nls/FontChoice"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c,_d,_e){
var _f=_3("dijit._editor.plugins._FontDropDown",[_9,_a,_b],{label:"",plainText:false,templateString:"<span style='white-space: nowrap' class='dijit dijitReset dijitInline'>"+"<label class='dijitLeft dijitInline' for='${selectId}'>${label}</label>"+"<input data-dojo-type='../../form/FilteringSelect' required='false' "+"data-dojo-props='labelType:\"html\", labelAttr:\"label\", searchAttr:\"name\"' "+"class='${comboClass}' "+"tabIndex='-1' id='${selectId}' data-dojo-attach-point='select' value=''/>"+"</span>",contextRequire:_1,postMixInProperties:function(){
this.inherited(arguments);
this.strings=_5.getLocalization("dijit._editor","FontChoice");
this.label=this.strings[this.command];
this.id=_8.getUniqueId(this.declaredClass.replace(/\./g,"_"));
this.selectId=this.id+"_select";
this.inherited(arguments);
},postCreate:function(){
this.select.set("store",new _7({idProperty:"value",data:_2.map(this.values,function(_10){
var _11=this.strings[_10]||_10;
return {label:this.getLabel(_10,_11),name:_11,value:_10};
},this)}));
this.select.set("value","",false);
this.disabled=this.select.get("disabled");
},_setValueAttr:function(_12,_13){
_13=_13!==false;
this.select.set("value",_2.indexOf(this.values,_12)<0?"":_12,_13);
if(!_13){
this.select._lastValueReported=null;
}
},_getValueAttr:function(){
return this.select.get("value");
},focus:function(){
this.select.focus();
},_setDisabledAttr:function(_14){
this._set("disabled",_14);
this.select.set("disabled",_14);
}});
var _15=_3("dijit._editor.plugins._FontNameDropDown",_f,{generic:false,command:"fontName",comboClass:"dijitFontNameCombo",postMixInProperties:function(){
if(!this.values){
this.values=this.generic?["serif","sans-serif","monospace","cursive","fantasy"]:["Arial","Times New Roman","Comic Sans MS","Courier New"];
}
this.inherited(arguments);
},getLabel:function(_16,_17){
if(this.plainText){
return _17;
}else{
return "<div style='font-family: "+_16+"'>"+_17+"</div>";
}
},_setValueAttr:function(_18,_19){
_19=_19!==false;
if(this.generic){
var map={"Arial":"sans-serif","Helvetica":"sans-serif","Myriad":"sans-serif","Times":"serif","Times New Roman":"serif","Comic Sans MS":"cursive","Apple Chancery":"cursive","Courier":"monospace","Courier New":"monospace","Papyrus":"fantasy","Estrangelo Edessa":"cursive","Gabriola":"fantasy"};
_18=map[_18]||_18;
}
this.inherited(arguments,[_18,_19]);
}});
var _1a=_3("dijit._editor.plugins._FontSizeDropDown",_f,{command:"fontSize",comboClass:"dijitFontSizeCombo",values:[1,2,3,4,5,6,7],getLabel:function(_1b,_1c){
if(this.plainText){
return _1c;
}else{
return "<font size="+_1b+"'>"+_1c+"</font>";
}
},_setValueAttr:function(_1d,_1e){
_1e=_1e!==false;
if(_1d.indexOf&&_1d.indexOf("px")!=-1){
var _1f=parseInt(_1d,10);
_1d={10:1,13:2,16:3,18:4,24:5,32:6,48:7}[_1f]||_1d;
}
this.inherited(arguments,[_1d,_1e]);
}});
var _20=_3("dijit._editor.plugins._FormatBlockDropDown",_f,{command:"formatBlock",comboClass:"dijitFormatBlockCombo",values:["noFormat","p","h1","h2","h3","pre"],postCreate:function(){
this.inherited(arguments);
this.set("value","noFormat",false);
},getLabel:function(_21,_22){
if(this.plainText||_21=="noFormat"){
return _22;
}else{
return "<"+_21+">"+_22+"</"+_21+">";
}
},_execCommand:function(_23,_24,_25){
if(_25==="noFormat"){
var _26;
var end;
var sel=_e.getSelection(_23.window);
if(sel&&sel.rangeCount>0){
var _27=sel.getRangeAt(0);
var _28,tag;
if(_27){
_26=_27.startContainer;
end=_27.endContainer;
while(_26&&_26!==_23.editNode&&_26!==_23.document.body&&_26.nodeType!==1){
_26=_26.parentNode;
}
while(end&&end!==_23.editNode&&end!==_23.document.body&&end.nodeType!==1){
end=end.parentNode;
}
var _29=_6.hitch(this,function(_2a,ary){
if(_2a.childNodes&&_2a.childNodes.length){
var i;
for(i=0;i<_2a.childNodes.length;i++){
var c=_2a.childNodes[i];
if(c.nodeType==1){
if(_23.selection.inSelection(c)){
var tag=c.tagName?c.tagName.toLowerCase():"";
if(_2.indexOf(this.values,tag)!==-1){
ary.push(c);
}
_29(c,ary);
}
}
}
}
});
var _2b=_6.hitch(this,function(_2c){
if(_2c&&_2c.length){
_23.beginEditing();
while(_2c.length){
this._removeFormat(_23,_2c.pop());
}
_23.endEditing();
}
});
var _2d=[];
if(_26==end){
var _2e;
_28=_26;
while(_28&&_28!==_23.editNode&&_28!==_23.document.body){
if(_28.nodeType==1){
tag=_28.tagName?_28.tagName.toLowerCase():"";
if(_2.indexOf(this.values,tag)!==-1){
_2e=_28;
break;
}
}
_28=_28.parentNode;
}
_29(_26,_2d);
if(_2e){
_2d=[_2e].concat(_2d);
}
_2b(_2d);
}else{
_28=_26;
while(_23.selection.inSelection(_28)){
if(_28.nodeType==1){
tag=_28.tagName?_28.tagName.toLowerCase():"";
if(_2.indexOf(this.values,tag)!==-1){
_2d.push(_28);
}
_29(_28,_2d);
}
_28=_28.nextSibling;
}
_2b(_2d);
}
_23.onDisplayChanged();
}
}
}else{
_23.execCommand(_24,_25);
}
},_removeFormat:function(_2f,_30){
if(_2f.customUndo){
while(_30.firstChild){
_4.place(_30.firstChild,_30,"before");
}
_30.parentNode.removeChild(_30);
}else{
_2f.selection.selectElementChildren(_30);
var _31=_2f.selection.getSelectedHtml();
_2f.selection.selectElement(_30);
_2f.execCommand("inserthtml",_31||"");
}
}});
var _32=_3("dijit._editor.plugins.FontChoice",_d,{useDefaultCommand:false,_initButton:function(){
var _33={fontName:_15,fontSize:_1a,formatBlock:_20}[this.command],_34=this.params;
if(this.params.custom){
_34.values=this.params.custom;
}
var _35=this.editor;
this.button=new _33(_6.delegate({dir:_35.dir,lang:_35.lang},_34));
this.own(this.button.select.on("change",_6.hitch(this,function(_36){
if(this.editor.focused){
this.editor.focus();
}
if(this.command=="fontName"&&_36.indexOf(" ")!=-1){
_36="'"+_36+"'";
}
if(this.button._execCommand){
this.button._execCommand(this.editor,this.command,_36);
}else{
this.editor.execCommand(this.command,_36);
}
})));
},updateState:function(){
var _37=this.editor;
var _38=this.command;
if(!_37||!_37.isLoaded||!_38.length){
return;
}
if(this.button){
var _39=this.get("disabled");
this.button.set("disabled",_39);
if(_39){
return;
}
var _3a;
try{
_3a=_37.queryCommandValue(_38)||"";
}
catch(e){
_3a="";
}
var _3b=_6.isString(_3a)&&_3a.match(/'([^']*)'/);
if(_3b){
_3a=_3b[1];
}
if(_38==="formatBlock"){
if(!_3a||_3a=="p"){
_3a=null;
var _3c;
var sel=_e.getSelection(this.editor.window);
if(sel&&sel.rangeCount>0){
var _3d=sel.getRangeAt(0);
if(_3d){
_3c=_3d.endContainer;
}
}
while(_3c&&_3c!==_37.editNode&&_3c!==_37.document){
var tg=_3c.tagName?_3c.tagName.toLowerCase():"";
if(tg&&_2.indexOf(this.button.values,tg)>-1){
_3a=tg;
break;
}
_3c=_3c.parentNode;
}
if(!_3a){
_3a="noFormat";
}
}else{
if(_2.indexOf(this.button.values,_3a)<0){
_3a="noFormat";
}
}
}
if(_3a!==this.button.get("value")){
this.button.set("value",_3a,false);
}
}
}});
_2.forEach(["fontName","fontSize","formatBlock"],function(_3e){
_d.registry[_3e]=function(_3f){
return new _32({command:_3e,plainText:_3f.plainText});
};
});
_32._FontDropDown=_f;
_32._FontNameDropDown=_15;
_32._FontSizeDropDown=_1a;
_32._FormatBlockDropDown=_20;
return _32;
});
},"dijit/form/nls/validate":function(){
define({root:({invalidMessage:"The value entered is not valid.",missingMessage:"This value is required.",rangeMessage:"This value is out of range."}),"zh":true,"zh-tw":true,"uk":true,"tr":true,"th":true,"sv":true,"sl":true,"sk":true,"ru":true,"ro":true,"pt":true,"pt-pt":true,"pl":true,"nl":true,"nb":true,"ko":true,"kk":true,"ja":true,"it":true,"hu":true,"hr":true,"he":true,"fr":true,"fi":true,"es":true,"el":true,"de":true,"da":true,"cs":true,"ca":true,"bg":true,"az":true,"ar":true});
},"dijit/form/nls/pt/validate":function(){
define(({invalidMessage:"O valor inserido não é válido.",missingMessage:"Este valor é necessário.",rangeMessage:"Este valor está fora do intervalo. "}));
},"dijit/form/nls/pt/validate":function(){
define(({invalidMessage:"O valor inserido não é válido.",missingMessage:"Este valor é necessário.",rangeMessage:"Este valor está fora do intervalo. "}));
},"dijit/form/TextBox":function(){
define(["dojo/_base/declare","dojo/dom-construct","dojo/dom-style","dojo/_base/kernel","dojo/_base/lang","dojo/on","dojo/sniff","./_FormValueWidget","./_TextBoxMixin","dojo/text!./templates/TextBox.html","../main"],function(_40,_41,_42,_43,_44,on,has,_45,_46,_47,_48){
var _49=_40("dijit.form.TextBox"+(has("dojo-bidi")?"_NoBidi":""),[_45,_46],{templateString:_47,_singleNodeTemplate:"<input class=\"dijit dijitReset dijitLeft dijitInputField\" data-dojo-attach-point=\"textbox,focusNode\" autocomplete=\"off\" type=\"${type}\" ${!nameAttrSetting} />",_buttonInputDisabled:has("ie")?"disabled":"",baseClass:"dijitTextBox",postMixInProperties:function(){
var _4a=this.type.toLowerCase();
if(this.templateString&&this.templateString.toLowerCase()=="input"||((_4a=="hidden"||_4a=="file")&&this.templateString==this.constructor.prototype.templateString)){
this.templateString=this._singleNodeTemplate;
}
this.inherited(arguments);
},postCreate:function(){
this.inherited(arguments);
if(has("ie")<9){
this.defer(function(){
try{
var s=_42.getComputedStyle(this.domNode);
if(s){
var ff=s.fontFamily;
if(ff){
var _4b=this.domNode.getElementsByTagName("INPUT");
if(_4b){
for(var i=0;i<_4b.length;i++){
_4b[i].style.fontFamily=ff;
}
}
}
}
}
catch(e){
}
});
}
},_setPlaceHolderAttr:function(v){
this._set("placeHolder",v);
if(!this._phspan){
this._attachPoints.push("_phspan");
this._phspan=_41.create("span",{onmousedown:function(e){
e.preventDefault();
},className:"dijitPlaceHolder dijitInputField"},this.textbox,"after");
this.own(on(this._phspan,"touchend, pointerup, MSPointerUp",_44.hitch(this,function(){
this.focus();
})));
}
this._phspan.innerHTML="";
this._phspan.appendChild(this._phspan.ownerDocument.createTextNode(v));
this._updatePlaceHolder();
},_onInput:function(evt){
this.inherited(arguments);
this._updatePlaceHolder();
},_updatePlaceHolder:function(){
if(this._phspan){
this._phspan.style.display=(this.placeHolder&&!this.textbox.value)?"":"none";
}
},_setValueAttr:function(_4c,_4d,_4e){
this.inherited(arguments);
this._updatePlaceHolder();
},getDisplayedValue:function(){
_43.deprecated(this.declaredClass+"::getDisplayedValue() is deprecated. Use get('displayedValue') instead.","","2.0");
return this.get("displayedValue");
},setDisplayedValue:function(_4f){
_43.deprecated(this.declaredClass+"::setDisplayedValue() is deprecated. Use set('displayedValue', ...) instead.","","2.0");
this.set("displayedValue",_4f);
},_onBlur:function(e){
if(this.disabled){
return;
}
this.inherited(arguments);
this._updatePlaceHolder();
if(has("mozilla")){
if(this.selectOnClick){
this.textbox.selectionStart=this.textbox.selectionEnd=undefined;
}
}
},_onFocus:function(by){
if(this.disabled||this.readOnly){
return;
}
this.inherited(arguments);
this._updatePlaceHolder();
}});
if(has("ie")<9){
_49.prototype._isTextSelected=function(){
var _50=this.ownerDocument.selection.createRange();
var _51=_50.parentElement();
return _51==this.textbox&&_50.text.length>0;
};
_48._setSelectionRange=_46._setSelectionRange=function(_52,_53,_54){
if(_52.createTextRange){
var r=_52.createTextRange();
r.collapse(true);
r.moveStart("character",-99999);
r.moveStart("character",_53);
r.moveEnd("character",_54-_53);
r.select();
}
};
}
if(has("dojo-bidi")){
_49=_40("dijit.form.TextBox",_49,{_setPlaceHolderAttr:function(v){
this.inherited(arguments);
this.applyTextDir(this._phspan);
}});
}
return _49;
});
},"dijit/_base/scroll":function(){
define(["dojo/window","../main"],function(_55,_56){
_56.scrollIntoView=function(_57,pos){
_55.scrollIntoView(_57,pos);
};
});
},"dijit/_TemplatedMixin":function(){
define(["dojo/cache","dojo/_base/declare","dojo/dom-construct","dojo/_base/lang","dojo/on","dojo/sniff","dojo/string","./_AttachMixin"],function(_58,_59,_5a,_5b,on,has,_5c,_5d){
var _5e=_59("dijit._TemplatedMixin",_5d,{templateString:null,templatePath:null,_skipNodeCache:false,searchContainerNode:true,_stringRepl:function(_5f){
var _60=this.declaredClass,_61=this;
return _5c.substitute(_5f,this,function(_62,key){
if(key.charAt(0)=="!"){
_62=_5b.getObject(key.substr(1),false,_61);
}
if(typeof _62=="undefined"){
throw new Error(_60+" template:"+key);
}
if(_62==null){
return "";
}
return key.charAt(0)=="!"?_62:_62.toString().replace(/"/g,"&quot;");
},this);
},buildRendering:function(){
if(!this._rendered){
if(!this.templateString){
this.templateString=_58(this.templatePath,{sanitize:true});
}
var _63=_5e.getCachedTemplate(this.templateString,this._skipNodeCache,this.ownerDocument);
var _64;
if(_5b.isString(_63)){
_64=_5a.toDom(this._stringRepl(_63),this.ownerDocument);
if(_64.nodeType!=1){
throw new Error("Invalid template: "+_63);
}
}else{
_64=_63.cloneNode(true);
}
this.domNode=_64;
}
this.inherited(arguments);
if(!this._rendered){
this._fillContent(this.srcNodeRef);
}
this._rendered=true;
},_fillContent:function(_65){
var _66=this.containerNode;
if(_65&&_66){
while(_65.hasChildNodes()){
_66.appendChild(_65.firstChild);
}
}
}});
_5e._templateCache={};
_5e.getCachedTemplate=function(_67,_68,doc){
var _69=_5e._templateCache;
var key=_67;
var _6a=_69[key];
if(_6a){
try{
if(!_6a.ownerDocument||_6a.ownerDocument==(doc||document)){
return _6a;
}
}
catch(e){
}
_5a.destroy(_6a);
}
_67=_5c.trim(_67);
if(_68||_67.match(/\$\{([^\}]+)\}/g)){
return (_69[key]=_67);
}else{
var _6b=_5a.toDom(_67,doc);
if(_6b.nodeType!=1){
throw new Error("Invalid template: "+_67);
}
return (_69[key]=_6b);
}
};
if(has("ie")){
on(window,"unload",function(){
var _6c=_5e._templateCache;
for(var key in _6c){
var _6d=_6c[key];
if(typeof _6d=="object"){
_5a.destroy(_6d);
}
delete _6c[key];
}
});
}
return _5e;
});
},"dijit/_Templated":function(){
define(["./_WidgetBase","./_TemplatedMixin","./_WidgetsInTemplateMixin","dojo/_base/array","dojo/_base/declare","dojo/_base/lang","dojo/_base/kernel"],function(_6e,_6f,_70,_71,_72,_73,_74){
_73.extend(_6e,{waiRole:"",waiState:""});
return _72("dijit._Templated",[_6f,_70],{widgetsInTemplate:false,constructor:function(){
_74.deprecated(this.declaredClass+": dijit._Templated deprecated, use dijit._TemplatedMixin and if necessary dijit._WidgetsInTemplateMixin","","2.0");
},_processNode:function(_75,_76){
var ret=this.inherited(arguments);
var _77=_76(_75,"waiRole");
if(_77){
_75.setAttribute("role",_77);
}
var _78=_76(_75,"waiState");
if(_78){
_71.forEach(_78.split(/\s*,\s*/),function(_79){
if(_79.indexOf("-")!=-1){
var _7a=_79.split("-");
_75.setAttribute("aria-"+_7a[0],_7a[1]);
}
});
}
return ret;
}});
});
},"dijit/_CssStateMixin":function(){
define(["dojo/_base/array","dojo/_base/declare","dojo/dom","dojo/dom-class","dojo/has","dojo/_base/lang","dojo/on","dojo/domReady","dojo/touch","dojo/_base/window","./a11yclick","./registry"],function(_7b,_7c,dom,_7d,has,_7e,on,_7f,_80,win,_81,_82){
var _83=_7c("dijit._CssStateMixin",[],{hovering:false,active:false,_applyAttributes:function(){
this.inherited(arguments);
_7b.forEach(["disabled","readOnly","checked","selected","focused","state","hovering","active","_opened"],function(_84){
this.watch(_84,_7e.hitch(this,"_setStateClass"));
},this);
for(var ap in this.cssStateNodes||{}){
this._trackMouseState(this[ap],this.cssStateNodes[ap]);
}
this._trackMouseState(this.domNode,this.baseClass);
this._setStateClass();
},_cssMouseEvent:function(_85){
if(!this.disabled){
switch(_85.type){
case "mouseover":
case "MSPointerOver":
case "pointerover":
this._set("hovering",true);
this._set("active",this._mouseDown);
break;
case "mouseout":
case "MSPointerOut":
case "pointerout":
this._set("hovering",false);
this._set("active",false);
break;
case "mousedown":
case "touchstart":
case "MSPointerDown":
case "pointerdown":
case "keydown":
this._set("active",true);
break;
case "mouseup":
case "dojotouchend":
case "MSPointerUp":
case "pointerup":
case "keyup":
this._set("active",false);
break;
}
}
},_setStateClass:function(){
var _86=this.baseClass.split(" ");
function _87(_88){
_86=_86.concat(_7b.map(_86,function(c){
return c+_88;
}),"dijit"+_88);
};
if(!this.isLeftToRight()){
_87("Rtl");
}
var _89=this.checked=="mixed"?"Mixed":(this.checked?"Checked":"");
if(this.checked){
_87(_89);
}
if(this.state){
_87(this.state);
}
if(this.selected){
_87("Selected");
}
if(this._opened){
_87("Opened");
}
if(this.disabled){
_87("Disabled");
}else{
if(this.readOnly){
_87("ReadOnly");
}else{
if(this.active){
_87("Active");
}else{
if(this.hovering){
_87("Hover");
}
}
}
}
if(this.focused){
_87("Focused");
}
var tn=this.stateNode||this.domNode,_8a={};
_7b.forEach(tn.className.split(" "),function(c){
_8a[c]=true;
});
if("_stateClasses" in this){
_7b.forEach(this._stateClasses,function(c){
delete _8a[c];
});
}
_7b.forEach(_86,function(c){
_8a[c]=true;
});
var _8b=[];
for(var c in _8a){
_8b.push(c);
}
tn.className=_8b.join(" ");
this._stateClasses=_86;
},_subnodeCssMouseEvent:function(_8c,_8d,evt){
if(this.disabled||this.readOnly){
return;
}
function _8e(_8f){
_7d.toggle(_8c,_8d+"Hover",_8f);
};
function _90(_91){
_7d.toggle(_8c,_8d+"Active",_91);
};
function _92(_93){
_7d.toggle(_8c,_8d+"Focused",_93);
};
switch(evt.type){
case "mouseover":
case "MSPointerOver":
case "pointerover":
_8e(true);
break;
case "mouseout":
case "MSPointerOut":
case "pointerout":
_8e(false);
_90(false);
break;
case "mousedown":
case "touchstart":
case "MSPointerDown":
case "pointerdown":
case "keydown":
_90(true);
break;
case "mouseup":
case "MSPointerUp":
case "pointerup":
case "dojotouchend":
case "keyup":
_90(false);
break;
case "focus":
case "focusin":
_92(true);
break;
case "blur":
case "focusout":
_92(false);
break;
}
},_trackMouseState:function(_94,_95){
_94._cssState=_95;
}});
_7f(function(){
function _96(evt,_97,_98){
if(_98&&dom.isDescendant(_98,_97)){
return;
}
for(var _99=_97;_99&&_99!=_98;_99=_99.parentNode){
if(_99._cssState){
var _9a=_82.getEnclosingWidget(_99);
if(_9a){
if(_99==_9a.domNode){
_9a._cssMouseEvent(evt);
}else{
_9a._subnodeCssMouseEvent(_99,_99._cssState,evt);
}
}
}
}
};
var _9b=win.body(),_9c;
on(_9b,_80.over,function(evt){
_96(evt,evt.target,evt.relatedTarget);
});
on(_9b,_80.out,function(evt){
_96(evt,evt.target,evt.relatedTarget);
});
on(_9b,_81.press,function(evt){
_9c=evt.target;
_96(evt,_9c);
});
on(_9b,_81.release,function(evt){
_96(evt,_9c);
_9c=null;
});
on(_9b,"focusin, focusout",function(evt){
var _9d=evt.target;
if(_9d._cssState&&!_9d.getAttribute("widgetId")){
var _9e=_82.getEnclosingWidget(_9d);
if(_9e){
_9e._subnodeCssMouseEvent(_9d,_9d._cssState,evt);
}
}
});
});
return _83;
});
},"dojo/currency":function(){
define(["./_base/array","./_base/lang","./number","./i18n","./i18n!./cldr/nls/currency","./cldr/monetary"],function(_9f,_a0,_a1,_a2,_a3,_a4){
var _a5={};
_a0.setObject("dojo.currency",_a5);
_a5._mixInDefaults=function(_a6){
_a6=_a6||{};
_a6.type="currency";
var _a7=_a2.getLocalization("dojo.cldr","currency",_a6.locale)||{};
var iso=_a6.currency;
var _a8=_a4.getData(iso);
_9f.forEach(["displayName","symbol","group","decimal"],function(_a9){
_a8[_a9]=_a7[iso+"_"+_a9];
});
_a8.fractional=[true,false];
return _a0.mixin(_a8,_a6);
};
_a5.format=function(_aa,_ab){
return _a1.format(_aa,_a5._mixInDefaults(_ab));
};
_a5.regexp=function(_ac){
return _a1.regexp(_a5._mixInDefaults(_ac));
};
_a5.parse=function(_ad,_ae){
return _a1.parse(_ad,_a5._mixInDefaults(_ae));
};
return _a5;
});
},"dijit/layout/ScrollingTabController":function(){
define(["dojo/_base/array","dojo/_base/declare","dojo/dom-class","dojo/dom-geometry","dojo/dom-style","dojo/_base/fx","dojo/_base/lang","dojo/on","dojo/query","dojo/sniff","../registry","dojo/text!./templates/ScrollingTabController.html","dojo/text!./templates/_ScrollingTabControllerButton.html","./TabController","./utils","../_WidgetsInTemplateMixin","../Menu","../MenuItem","../form/Button","../_HasDropDown","dojo/NodeList-dom","../a11yclick"],function(_af,_b0,_b1,_b2,_b3,fx,_b4,on,_b5,has,_b6,_b7,_b8,_b9,_ba,_bb,_bc,_bd,_be,_bf){
var _c0=_b0("dijit.layout.ScrollingTabController",[_b9,_bb],{baseClass:"dijitTabController dijitScrollingTabController",templateString:_b7,useMenu:true,useSlider:true,tabStripClass:"",_minScroll:5,_setClassAttr:{node:"containerNode",type:"class"},buildRendering:function(){
this.inherited(arguments);
var n=this.domNode;
this.scrollNode=this.tablistWrapper;
this._initButtons();
if(!this.tabStripClass){
this.tabStripClass="dijitTabContainer"+this.tabPosition.charAt(0).toUpperCase()+this.tabPosition.substr(1).replace(/-.*/,"")+"None";
_b1.add(n,"tabStrip-disabled");
}
_b1.add(this.tablistWrapper,this.tabStripClass);
},onStartup:function(){
this.inherited(arguments);
_b3.set(this.domNode,"visibility","");
this._postStartup=true;
this.own(on(this.containerNode,"attrmodified-label, attrmodified-iconclass",_b4.hitch(this,function(evt){
if(this._dim){
this.resize(this._dim);
}
})));
},onAddChild:function(_c1,_c2){
this.inherited(arguments);
_b3.set(this.containerNode,"width",(_b3.get(this.containerNode,"width")+200)+"px");
},onRemoveChild:function(_c3,_c4){
var _c5=this.pane2button(_c3.id);
if(this._selectedTab===_c5.domNode){
this._selectedTab=null;
}
this.inherited(arguments);
},_initButtons:function(){
this._btnWidth=0;
this._buttons=_b5("> .tabStripButton",this.domNode).filter(function(btn){
if((this.useMenu&&btn==this._menuBtn.domNode)||(this.useSlider&&(btn==this._rightBtn.domNode||btn==this._leftBtn.domNode))){
this._btnWidth+=_b2.getMarginSize(btn).w;
return true;
}else{
_b3.set(btn,"display","none");
return false;
}
},this);
},_getTabsWidth:function(){
var _c6=this.getChildren();
if(_c6.length){
var _c7=_c6[this.isLeftToRight()?0:_c6.length-1].domNode,_c8=_c6[this.isLeftToRight()?_c6.length-1:0].domNode;
return _c8.offsetLeft+_c8.offsetWidth-_c7.offsetLeft;
}else{
return 0;
}
},_enableBtn:function(_c9){
var _ca=this._getTabsWidth();
_c9=_c9||_b3.get(this.scrollNode,"width");
return _ca>0&&_c9<_ca;
},resize:function(dim){
this._dim=dim;
this.scrollNode.style.height="auto";
var cb=this._contentBox=_ba.marginBox2contentBox(this.domNode,{h:0,w:dim.w});
cb.h=this.scrollNode.offsetHeight;
_b2.setContentSize(this.domNode,cb);
var _cb=this._enableBtn(this._contentBox.w);
this._buttons.style("display",_cb?"":"none");
this._leftBtn.region="left";
this._rightBtn.region="right";
this._menuBtn.region=this.isLeftToRight()?"right":"left";
_ba.layoutChildren(this.domNode,this._contentBox,[this._menuBtn,this._leftBtn,this._rightBtn,{domNode:this.scrollNode,region:"center"}]);
if(this._selectedTab){
if(this._anim&&this._anim.status()=="playing"){
this._anim.stop();
}
this.scrollNode.scrollLeft=this._convertToScrollLeft(this._getScrollForSelectedTab());
}
this._setButtonClass(this._getScroll());
this._postResize=true;
return {h:this._contentBox.h,w:dim.w};
},_getScroll:function(){
return (this.isLeftToRight()||has("ie")<8||(has("ie")&&has("quirks"))||has("webkit"))?this.scrollNode.scrollLeft:_b3.get(this.containerNode,"width")-_b3.get(this.scrollNode,"width")+(has("ie")>=8?-1:1)*this.scrollNode.scrollLeft;
},_convertToScrollLeft:function(val){
if(this.isLeftToRight()||has("ie")<8||(has("ie")&&has("quirks"))||has("webkit")){
return val;
}else{
var _cc=_b3.get(this.containerNode,"width")-_b3.get(this.scrollNode,"width");
return (has("ie")>=8?-1:1)*(val-_cc);
}
},onSelectChild:function(_cd){
var tab=this.pane2button(_cd.id);
if(!tab){
return;
}
var _ce=tab.domNode;
if(_ce!=this._selectedTab){
this._selectedTab=_ce;
if(this._postResize){
var sl=this._getScroll();
if(sl>_ce.offsetLeft||sl+_b3.get(this.scrollNode,"width")<_ce.offsetLeft+_b3.get(_ce,"width")){
this.createSmoothScroll().play();
}
}
}
this.inherited(arguments);
},_getScrollBounds:function(){
var _cf=this.getChildren(),_d0=_b3.get(this.scrollNode,"width"),_d1=_b3.get(this.containerNode,"width"),_d2=_d1-_d0,_d3=this._getTabsWidth();
if(_cf.length&&_d3>_d0){
return {min:this.isLeftToRight()?0:_cf[_cf.length-1].domNode.offsetLeft,max:this.isLeftToRight()?(_cf[_cf.length-1].domNode.offsetLeft+_cf[_cf.length-1].domNode.offsetWidth)-_d0:_d2};
}else{
var _d4=this.isLeftToRight()?0:_d2;
return {min:_d4,max:_d4};
}
},_getScrollForSelectedTab:function(){
var w=this.scrollNode,n=this._selectedTab,_d5=_b3.get(this.scrollNode,"width"),_d6=this._getScrollBounds();
var pos=(n.offsetLeft+_b3.get(n,"width")/2)-_d5/2;
pos=Math.min(Math.max(pos,_d6.min),_d6.max);
return pos;
},createSmoothScroll:function(x){
if(arguments.length>0){
var _d7=this._getScrollBounds();
x=Math.min(Math.max(x,_d7.min),_d7.max);
}else{
x=this._getScrollForSelectedTab();
}
if(this._anim&&this._anim.status()=="playing"){
this._anim.stop();
}
var _d8=this,w=this.scrollNode,_d9=new fx.Animation({beforeBegin:function(){
if(this.curve){
delete this.curve;
}
var _da=w.scrollLeft,_db=_d8._convertToScrollLeft(x);
_d9.curve=new fx._Line(_da,_db);
},onAnimate:function(val){
w.scrollLeft=val;
}});
this._anim=_d9;
this._setButtonClass(x);
return _d9;
},_getBtnNode:function(e){
var n=e.target;
while(n&&!_b1.contains(n,"tabStripButton")){
n=n.parentNode;
}
return n;
},doSlideRight:function(e){
this.doSlide(1,this._getBtnNode(e));
},doSlideLeft:function(e){
this.doSlide(-1,this._getBtnNode(e));
},doSlide:function(_dc,_dd){
if(_dd&&_b1.contains(_dd,"dijitTabDisabled")){
return;
}
var _de=_b3.get(this.scrollNode,"width");
var d=(_de*0.75)*_dc;
var to=this._getScroll()+d;
this._setButtonClass(to);
this.createSmoothScroll(to).play();
},_setButtonClass:function(_df){
var _e0=this._getScrollBounds();
this._leftBtn.set("disabled",_df<=_e0.min);
this._rightBtn.set("disabled",_df>=_e0.max);
}});
var _e1=_b0("dijit.layout._ScrollingTabControllerButtonMixin",null,{baseClass:"dijitTab tabStripButton",templateString:_b8,tabIndex:"",isFocusable:function(){
return false;
}});
_b0("dijit.layout._ScrollingTabControllerButton",[_be,_e1]);
_b0("dijit.layout._ScrollingTabControllerMenuButton",[_be,_bf,_e1],{containerId:"",tabIndex:"-1",isLoaded:function(){
return false;
},loadDropDown:function(_e2){
this.dropDown=new _bc({id:this.containerId+"_menu",ownerDocument:this.ownerDocument,dir:this.dir,lang:this.lang,textDir:this.textDir});
var _e3=_b6.byId(this.containerId);
_af.forEach(_e3.getChildren(),function(_e4){
var _e5=new _bd({id:_e4.id+"_stcMi",label:_e4.title,iconClass:_e4.iconClass,disabled:_e4.disabled,ownerDocument:this.ownerDocument,dir:_e4.dir,lang:_e4.lang,textDir:_e4.textDir||_e3.textDir,onClick:function(){
_e3.selectChild(_e4);
}});
this.dropDown.addChild(_e5);
},this);
_e2();
},closeDropDown:function(_e6){
this.inherited(arguments);
if(this.dropDown){
this._popupStateNode.removeAttribute("aria-owns");
this.dropDown.destroyRecursive();
delete this.dropDown;
}
}});
return _c0;
});
},"dijit/DialogUnderlay":function(){
define(["dojo/_base/declare","dojo/_base/lang","dojo/aspect","dojo/dom-attr","dojo/dom-style","dojo/on","dojo/window","./_Widget","./_TemplatedMixin","./BackgroundIframe","./Viewport","./main"],function(_e7,_e8,_e9,_ea,_eb,on,_ec,_ed,_ee,_ef,_f0,_f1){
var _f2=_e7("dijit.DialogUnderlay",[_ed,_ee],{templateString:"<div class='dijitDialogUnderlayWrapper'><div class='dijitDialogUnderlay' tabIndex='-1' data-dojo-attach-point='node'></div></div>",dialogId:"","class":"",_modalConnects:[],_setDialogIdAttr:function(id){
_ea.set(this.node,"id",id+"_underlay");
this._set("dialogId",id);
},_setClassAttr:function(_f3){
this.node.className="dijitDialogUnderlay "+_f3;
this._set("class",_f3);
},postCreate:function(){
this.ownerDocumentBody.appendChild(this.domNode);
this.own(on(this.domNode,"keydown",_e8.hitch(this,"_onKeyDown")));
this.inherited(arguments);
},layout:function(){
var is=this.node.style,os=this.domNode.style;
os.display="none";
var _f4=_ec.getBox(this.ownerDocument);
os.top=_f4.t+"px";
os.left=_f4.l+"px";
is.width=_f4.w+"px";
is.height=_f4.h+"px";
os.display="block";
},show:function(){
this.domNode.style.display="block";
this.open=true;
this.layout();
this.bgIframe=new _ef(this.domNode);
var win=_ec.get(this.ownerDocument);
this._modalConnects=[_f0.on("resize",_e8.hitch(this,"layout")),on(win,"scroll",_e8.hitch(this,"layout"))];
},hide:function(){
this.bgIframe.destroy();
delete this.bgIframe;
this.domNode.style.display="none";
while(this._modalConnects.length){
(this._modalConnects.pop()).remove();
}
this.open=false;
},destroy:function(){
while(this._modalConnects.length){
(this._modalConnects.pop()).remove();
}
this.inherited(arguments);
},_onKeyDown:function(){
}});
_f2.show=function(_f5,_f6){
var _f7=_f2._singleton;
if(!_f7||_f7._destroyed){
_f7=_f1._underlay=_f2._singleton=new _f2(_f5);
}else{
if(_f5){
_f7.set(_f5);
}
}
_eb.set(_f7.domNode,"zIndex",_f6);
if(!_f7.open){
_f7.show();
}
};
_f2.hide=function(){
var _f8=_f2._singleton;
if(_f8&&!_f8._destroyed){
_f8.hide();
}
};
return _f2;
});
},"dijit/_editor/html":function(){
define(["dojo/_base/array","dojo/_base/lang","dojo/sniff"],function(_f9,_fa,has){
var _fb={};
_fa.setObject("dijit._editor.html",_fb);
var _fc=_fb.escapeXml=function(str,_fd){
str=str.replace(/&/gm,"&amp;").replace(/</gm,"&lt;").replace(/>/gm,"&gt;").replace(/"/gm,"&quot;");
if(!_fd){
str=str.replace(/'/gm,"&#39;");
}
return str;
};
_fb.getNodeHtml=function(_fe){
var _ff=[];
_fb.getNodeHtmlHelper(_fe,_ff);
return _ff.join("");
};
_fb.getNodeHtmlHelper=function(node,_100){
switch(node.nodeType){
case 1:
var _101=node.nodeName.toLowerCase();
if(!_101||_101.charAt(0)=="/"){
return "";
}
_100.push("<",_101);
var _102=[],_103={};
var attr;
if(has("dom-attributes-explicit")||has("dom-attributes-specified-flag")){
var i=0;
while((attr=node.attributes[i++])){
var n=attr.name;
if(n.substr(0,3)!=="_dj"&&(!has("dom-attributes-specified-flag")||attr.specified)&&!(n in _103)){
var v=attr.value;
if(n=="src"||n=="href"){
if(node.getAttribute("_djrealurl")){
v=node.getAttribute("_djrealurl");
}
}
if(has("ie")===8&&n==="style"){
v=v.replace("HEIGHT:","height:").replace("WIDTH:","width:");
}
_102.push([n,v]);
_103[n]=v;
}
}
}else{
var _104=/^input$|^img$/i.test(node.nodeName)?node:node.cloneNode(false);
var s=_104.outerHTML;
var _105=/[\w-]+=("[^"]*"|'[^']*'|\S*)/gi;
var _106=s.match(_105);
s=s.substr(0,s.indexOf(">"));
_f9.forEach(_106,function(attr){
if(attr){
var idx=attr.indexOf("=");
if(idx>0){
var key=attr.substring(0,idx);
if(key.substr(0,3)!="_dj"){
if(key=="src"||key=="href"){
if(node.getAttribute("_djrealurl")){
_102.push([key,node.getAttribute("_djrealurl")]);
return;
}
}
var val,_107;
switch(key){
case "style":
val=node.style.cssText.toLowerCase();
break;
case "class":
val=node.className;
break;
case "width":
if(_101==="img"){
_107=/width=(\S+)/i.exec(s);
if(_107){
val=_107[1];
}
break;
}
case "height":
if(_101==="img"){
_107=/height=(\S+)/i.exec(s);
if(_107){
val=_107[1];
}
break;
}
default:
val=node.getAttribute(key);
}
if(val!=null){
_102.push([key,val.toString()]);
}
}
}
}
},this);
}
_102.sort(function(a,b){
return a[0]<b[0]?-1:(a[0]==b[0]?0:1);
});
var j=0;
while((attr=_102[j++])){
_100.push(" ",attr[0],"=\"",(typeof attr[1]==="string"?_fc(attr[1],true):attr[1]),"\"");
}
switch(_101){
case "br":
case "hr":
case "img":
case "input":
case "base":
case "meta":
case "area":
case "basefont":
_100.push(" />");
break;
case "script":
_100.push(">",node.innerHTML,"</",_101,">");
break;
default:
_100.push(">");
if(node.hasChildNodes()){
_fb.getChildrenHtmlHelper(node,_100);
}
_100.push("</",_101,">");
}
break;
case 4:
case 3:
_100.push(_fc(node.nodeValue,true));
break;
case 8:
_100.push("<!--",_fc(node.nodeValue,true),"-->");
break;
default:
_100.push("<!-- Element not recognized - Type: ",node.nodeType," Name: ",node.nodeName,"-->");
}
};
_fb.getChildrenHtml=function(node){
var _108=[];
_fb.getChildrenHtmlHelper(node,_108);
return _108.join("");
};
_fb.getChildrenHtmlHelper=function(dom,_109){
if(!dom){
return;
}
var _10a=dom["childNodes"]||dom;
var _10b=!has("ie")||_10a!==dom;
var node,i=0;
while((node=_10a[i++])){
if(!_10b||node.parentNode==dom){
_fb.getNodeHtmlHelper(node,_109);
}
}
};
return _fb;
});
},"put-selector/put":function(){
(function(_10c){
var _10d,_10e=/[-+,> ]/;
_10c([],_10d=function(doc,_10f){
"use strict";
_10e=_10f||_10e;
var _110=/(?:\s*([-+ ,<>]))?\s*(\.|!\.?|#)?([-\w%$]+)?(?:\[([^\]=]+)=?['"]?([^\]'"]*)['"]?\])?/g,_111,doc=doc||document,_112=typeof doc.createElement=="object";
function _113(_114,text){
_114.appendChild(doc.createTextNode(text));
};
function put(_115){
var _116,_117,_118,_119,_11a,args=arguments,_11b=args[0];
function _11c(){
if(_11a&&_119&&_11a!=_119){
(_119==_115&&(_116||(_116=_10e.test(_11d)&&doc.createDocumentFragment()))||_119).insertBefore(_11a,_118||null);
}
};
for(var i=0;i<args.length;i++){
var _11d=args[i];
if(typeof _11d=="object"){
_117=false;
if(_11d instanceof Array){
_11a=doc.createDocumentFragment();
for(var key=0;key<_11d.length;key++){
_11a.appendChild(put(_11d[key]));
}
_11d=_11a;
}
if(_11d.nodeType){
_11a=_11d;
_11c();
_119=_11d;
_118=0;
}else{
for(var key in _11d){
_11a[key]=_11d[key];
}
}
}else{
if(_117){
_117=false;
_113(_11a,_11d);
}else{
if(i<1){
_115=null;
}
_117=true;
var _11e=_11d.replace(_110,function(t,_11f,_120,_121,_122,_123){
if(_11f){
_11c();
if(_11f=="-"||_11f=="+"){
_119=(_118=(_11a||_119)).parentNode;
_11a=null;
if(_11f=="+"){
_118=_118.nextSibling;
}
}else{
if(_11f=="<"){
_119=_11a=(_11a||_119).parentNode;
}else{
if(_11f==","){
_119=_115;
}else{
if(_11a){
_119=_11a;
}
}
_11a=null;
}
_118=0;
}
if(_11a){
_119=_11a;
}
}
var tag=!_120&&_121;
if(tag||(!_11a&&(_120||_122))){
if(tag=="$"){
_113(_119,args[++i]);
}else{
tag=tag||put.defaultTag;
var _124=_112&&args[i+1]&&args[i+1].name;
if(_124){
tag="<"+tag+" name=\""+_124+"\">";
}
_11a=doc.createElement(tag);
}
}
if(_120){
if(_121=="$"){
_121=args[++i];
}
if(_120=="#"){
_11a.id=_121;
}else{
var _125=_11a.className;
var _126=_125&&(" "+_125+" ").replace(" "+_121+" "," ");
if(_120=="."){
_11a.className=_125?(_126+_121).substring(1):_121;
}else{
if(_11d=="!"){
put("div",_11a,"<").innerHTML="";
}else{
_126=_126.substring(1,_126.length-1);
if(_126!=_125){
_11a.className=_126;
}
}
}
}
}
if(_122){
if(_123=="$"){
_123=args[++i];
}
if(_122=="style"){
_11a.style.cssText=_123;
}else{
_11a[_122.charAt(0)=="!"?(_122=_122.substring(1))&&"removeAttribute":"setAttribute"](_122,_123===""?_122:_123);
}
}
return "";
});
if(_11e){
throw new SyntaxError("Unexpected char "+_11e+" in "+_11d);
}
_11c();
_119=_11b=_11a||_119;
}
}
}
if(_115&&_116){
_115.appendChild(_116);
}
return _11b;
};
put.defaultTag="div";
put.forDocument=_10d;
return put;
});
})(typeof define=="undefined"?function(deps,_127){
if(typeof window=="undefined"){
require("./node-html")(module,_127);
}else{
put=_127();
}
}:define);
},"dijit/_editor/nls/commands":function(){
define({root:({"bold":"Bold","copy":"Copy","cut":"Cut","delete":"Delete","indent":"Indent","insertHorizontalRule":"Horizontal Rule","insertOrderedList":"Numbered List","insertUnorderedList":"Bullet List","italic":"Italic","justifyCenter":"Align Center","justifyFull":"Justify","justifyLeft":"Align Left","justifyRight":"Align Right","outdent":"Outdent","paste":"Paste","redo":"Redo","removeFormat":"Remove Format","selectAll":"Select All","strikethrough":"Strikethrough","subscript":"Subscript","superscript":"Superscript","underline":"Underline","undo":"Undo","unlink":"Remove Link","createLink":"Create Link","toggleDir":"Toggle Direction","insertImage":"Insert Image","insertTable":"Insert/Edit Table","toggleTableBorder":"Toggle Table Border","deleteTable":"Delete Table","tableProp":"Table Property","htmlToggle":"HTML Source","foreColor":"Foreground Color","hiliteColor":"Background Color","plainFormatBlock":"Paragraph Style","formatBlock":"Paragraph Style","fontSize":"Font Size","fontName":"Font Name","tabIndent":"Tab Indent","fullScreen":"Toggle Full Screen","viewSource":"View HTML Source","print":"Print","newPage":"New Page","systemShortcut":"The \"${0}\" action is only available in your browser using a keyboard shortcut. Use ${1}.","ctrlKey":"ctrl+${0}","appleKey":"⌘${0}"}),"zh":true,"zh-tw":true,"uk":true,"tr":true,"th":true,"sv":true,"sl":true,"sk":true,"ru":true,"ro":true,"pt":true,"pt-pt":true,"pl":true,"nl":true,"nb":true,"ko":true,"kk":true,"ja":true,"it":true,"hu":true,"hr":true,"he":true,"fr":true,"fi":true,"es":true,"el":true,"de":true,"da":true,"cs":true,"ca":true,"bg":true,"az":true,"ar":true});
},"dijit/_editor/nls/pt/commands":function(){
define(({"bold":"Negrito","copy":"Copiar","cut":"Recortar","delete":"Excluir","indent":"Recuar","insertHorizontalRule":"Régua Horizontal","insertOrderedList":"Lista Numerada","insertUnorderedList":"Lista com Marcadores","italic":"Itálico","justifyCenter":"Alinhar pelo Centro","justifyFull":"Justificar","justifyLeft":"Alinhar pela Esquerda","justifyRight":"Alinhar pela Direita","outdent":"Não-chanfrado","paste":"Colar","redo":"Refazer","removeFormat":"Remover Formato","selectAll":"Selecionar Todos","strikethrough":"Tachado","subscript":"Subscrito","superscript":"Sobrescrito","underline":"Sublinhado","undo":"Desfazer","unlink":"Remover Link","createLink":"Criar Link","toggleDir":"Comutar Direção","insertImage":"Inserir Imagem","insertTable":"Inserir/Editar Tabela","toggleTableBorder":"Alternar Moldura da Tabela","deleteTable":"Excluir Tabela","tableProp":"Propriedade da Tabela","htmlToggle":"Origem HTML","foreColor":"Cor do Primeiro Plano","hiliteColor":"Cor de segundo plano","plainFormatBlock":"Estilo de Parágrafo","formatBlock":"Estilo de Parágrafo","fontSize":"Tamanho da Fonte","fontName":"Nome da Fonte","tabIndent":"Recuo de Guia","fullScreen":"Comutar Tela Cheia","viewSource":"Visualizar Origem HTML","print":"Impressão","newPage":"Nova Página","systemShortcut":"A ação \"${0}\" está disponível em seu navegador apenas usando um atalho do teclado. Use ${1}.","ctrlKey":"ctrl+${0}","appleKey":"⌘${0}"}));
},"dijit/_editor/nls/pt/commands":function(){
define(({"bold":"Negrito","copy":"Copiar","cut":"Recortar","delete":"Excluir","indent":"Recuar","insertHorizontalRule":"Régua Horizontal","insertOrderedList":"Lista Numerada","insertUnorderedList":"Lista com Marcadores","italic":"Itálico","justifyCenter":"Alinhar pelo Centro","justifyFull":"Justificar","justifyLeft":"Alinhar pela Esquerda","justifyRight":"Alinhar pela Direita","outdent":"Não-chanfrado","paste":"Colar","redo":"Refazer","removeFormat":"Remover Formato","selectAll":"Selecionar Todos","strikethrough":"Tachado","subscript":"Subscrito","superscript":"Sobrescrito","underline":"Sublinhado","undo":"Desfazer","unlink":"Remover Link","createLink":"Criar Link","toggleDir":"Comutar Direção","insertImage":"Inserir Imagem","insertTable":"Inserir/Editar Tabela","toggleTableBorder":"Alternar Moldura da Tabela","deleteTable":"Excluir Tabela","tableProp":"Propriedade da Tabela","htmlToggle":"Origem HTML","foreColor":"Cor do Primeiro Plano","hiliteColor":"Cor de segundo plano","plainFormatBlock":"Estilo de Parágrafo","formatBlock":"Estilo de Parágrafo","fontSize":"Tamanho da Fonte","fontName":"Nome da Fonte","tabIndent":"Recuo de Guia","fullScreen":"Comutar Tela Cheia","viewSource":"Visualizar Origem HTML","print":"Impressão","newPage":"Nova Página","systemShortcut":"A ação \"${0}\" está disponível em seu navegador apenas usando um atalho do teclado. Use ${1}.","ctrlKey":"ctrl+${0}","appleKey":"⌘${0}"}));
},"dijit/place":function(){
define(["dojo/_base/array","dojo/dom-geometry","dojo/dom-style","dojo/_base/kernel","dojo/_base/window","./Viewport","./main"],function(_128,_129,_12a,_12b,win,_12c,_12d){
function _12e(node,_12f,_130,_131){
var view=_12c.getEffectiveBox(node.ownerDocument);
if(!node.parentNode||String(node.parentNode.tagName).toLowerCase()!="body"){
win.body(node.ownerDocument).appendChild(node);
}
var best=null;
_128.some(_12f,function(_132){
var _133=_132.corner;
var pos=_132.pos;
var _134=0;
var _135={w:{"L":view.l+view.w-pos.x,"R":pos.x-view.l,"M":view.w}[_133.charAt(1)],h:{"T":view.t+view.h-pos.y,"B":pos.y-view.t,"M":view.h}[_133.charAt(0)]};
var s=node.style;
s.left=s.right="auto";
if(_130){
var res=_130(node,_132.aroundCorner,_133,_135,_131);
_134=typeof res=="undefined"?0:res;
}
var _136=node.style;
var _137=_136.display;
var _138=_136.visibility;
if(_136.display=="none"){
_136.visibility="hidden";
_136.display="";
}
var bb=_129.position(node);
_136.display=_137;
_136.visibility=_138;
var _139={"L":pos.x,"R":pos.x-bb.w,"M":Math.max(view.l,Math.min(view.l+view.w,pos.x+(bb.w>>1))-bb.w)}[_133.charAt(1)],_13a={"T":pos.y,"B":pos.y-bb.h,"M":Math.max(view.t,Math.min(view.t+view.h,pos.y+(bb.h>>1))-bb.h)}[_133.charAt(0)],_13b=Math.max(view.l,_139),_13c=Math.max(view.t,_13a),endX=Math.min(view.l+view.w,_139+bb.w),endY=Math.min(view.t+view.h,_13a+bb.h),_13d=endX-_13b,_13e=endY-_13c;
_134+=(bb.w-_13d)+(bb.h-_13e);
if(best==null||_134<best.overflow){
best={corner:_133,aroundCorner:_132.aroundCorner,x:_13b,y:_13c,w:_13d,h:_13e,overflow:_134,spaceAvailable:_135};
}
return !_134;
});
if(best.overflow&&_130){
_130(node,best.aroundCorner,best.corner,best.spaceAvailable,_131);
}
var l=_129.isBodyLtr(node.ownerDocument),top=best.y,side=l?best.x:view.w-best.x-best.w;
if(/relative|absolute/.test(_12a.get(win.body(node.ownerDocument),"position"))){
top-=_12a.get(win.body(node.ownerDocument),"marginTop");
side-=(l?1:-1)*_12a.get(win.body(node.ownerDocument),l?"marginLeft":"marginRight");
}
var s=node.style;
s.top=top+"px";
s[l?"left":"right"]=side+"px";
s[l?"right":"left"]="auto";
return best;
};
var _13f={"TL":"BR","TR":"BL","BL":"TR","BR":"TL"};
var _140={at:function(node,pos,_141,_142,_143){
var _144=_128.map(_141,function(_145){
var c={corner:_145,aroundCorner:_13f[_145],pos:{x:pos.x,y:pos.y}};
if(_142){
c.pos.x+=_145.charAt(1)=="L"?_142.x:-_142.x;
c.pos.y+=_145.charAt(0)=="T"?_142.y:-_142.y;
}
return c;
});
return _12e(node,_144,_143);
},around:function(node,_146,_147,_148,_149){
var _14a;
if(typeof _146=="string"||"offsetWidth" in _146){
_14a=_129.position(_146,true);
if(/^(above|below)/.test(_147[0])){
var _14b=_129.getBorderExtents(_146),_14c=_146.firstChild?_129.getBorderExtents(_146.firstChild):{t:0,l:0,b:0,r:0},_14d=_129.getBorderExtents(node),_14e=node.firstChild?_129.getBorderExtents(node.firstChild):{t:0,l:0,b:0,r:0};
_14a.y+=Math.min(_14b.t+_14c.t,_14d.t+_14e.t);
_14a.h-=Math.min(_14b.t+_14c.t,_14d.t+_14e.t)+Math.min(_14b.b+_14c.b,_14d.b+_14e.b);
}
}else{
_14a=_146;
}
if(_146.parentNode){
var _14f=_12a.getComputedStyle(_146).position=="absolute";
var _150=_146.parentNode;
while(_150&&_150.nodeType==1&&_150.nodeName!="BODY"){
var _151=_129.position(_150,true),pcs=_12a.getComputedStyle(_150);
if(/relative|absolute/.test(pcs.position)){
_14f=false;
}
if(!_14f&&/hidden|auto|scroll/.test(pcs.overflow)){
var _152=Math.min(_14a.y+_14a.h,_151.y+_151.h);
var _153=Math.min(_14a.x+_14a.w,_151.x+_151.w);
_14a.x=Math.max(_14a.x,_151.x);
_14a.y=Math.max(_14a.y,_151.y);
_14a.h=_152-_14a.y;
_14a.w=_153-_14a.x;
}
if(pcs.position=="absolute"){
_14f=true;
}
_150=_150.parentNode;
}
}
var x=_14a.x,y=_14a.y,_154="w" in _14a?_14a.w:(_14a.w=_14a.width),_155="h" in _14a?_14a.h:(_12b.deprecated("place.around: dijit/place.__Rectangle: { x:"+x+", y:"+y+", height:"+_14a.height+", width:"+_154+" } has been deprecated.  Please use { x:"+x+", y:"+y+", h:"+_14a.height+", w:"+_154+" }","","2.0"),_14a.h=_14a.height);
var _156=[];
function push(_157,_158){
_156.push({aroundCorner:_157,corner:_158,pos:{x:{"L":x,"R":x+_154,"M":x+(_154>>1)}[_157.charAt(1)],y:{"T":y,"B":y+_155,"M":y+(_155>>1)}[_157.charAt(0)]}});
};
_128.forEach(_147,function(pos){
var ltr=_148;
switch(pos){
case "above-centered":
push("TM","BM");
break;
case "below-centered":
push("BM","TM");
break;
case "after-centered":
ltr=!ltr;
case "before-centered":
push(ltr?"ML":"MR",ltr?"MR":"ML");
break;
case "after":
ltr=!ltr;
case "before":
push(ltr?"TL":"TR",ltr?"TR":"TL");
push(ltr?"BL":"BR",ltr?"BR":"BL");
break;
case "below-alt":
ltr=!ltr;
case "below":
push(ltr?"BL":"BR",ltr?"TL":"TR");
push(ltr?"BR":"BL",ltr?"TR":"TL");
break;
case "above-alt":
ltr=!ltr;
case "above":
push(ltr?"TL":"TR",ltr?"BL":"BR");
push(ltr?"TR":"TL",ltr?"BR":"BL");
break;
default:
push(pos.aroundCorner,pos.corner);
}
});
var _159=_12e(node,_156,_149,{w:_154,h:_155});
_159.aroundNodePos=_14a;
return _159;
}};
return _12d.place=_140;
});
},"dijit/_HasDropDown":function(){
define(["dojo/_base/declare","dojo/_base/Deferred","dojo/dom","dojo/dom-attr","dojo/dom-class","dojo/dom-geometry","dojo/dom-style","dojo/has","dojo/keys","dojo/_base/lang","dojo/on","dojo/touch","./registry","./focus","./popup","./_FocusMixin"],function(_15a,_15b,dom,_15c,_15d,_15e,_15f,has,keys,lang,on,_160,_161,_162,_163,_164){
return _15a("dijit._HasDropDown",_164,{_buttonNode:null,_arrowWrapperNode:null,_popupStateNode:null,_aroundNode:null,dropDown:null,autoWidth:true,forceWidth:false,maxHeight:-1,dropDownPosition:["below","above"],_stopClickEvents:true,_onDropDownMouseDown:function(e){
if(this.disabled||this.readOnly){
return;
}
if(e.type!="MSPointerDown"&&e.type!="pointerdown"){
e.preventDefault();
}
this._docHandler=this.own(on(this.ownerDocument,_160.release,lang.hitch(this,"_onDropDownMouseUp")))[0];
this.toggleDropDown();
},_onDropDownMouseUp:function(e){
if(e&&this._docHandler){
this._docHandler.remove();
this._docHandler=null;
}
var _165=this.dropDown,_166=false;
if(e&&this._opened){
var c=_15e.position(this._buttonNode,true);
if(!(e.pageX>=c.x&&e.pageX<=c.x+c.w)||!(e.pageY>=c.y&&e.pageY<=c.y+c.h)){
var t=e.target;
while(t&&!_166){
if(_15d.contains(t,"dijitPopup")){
_166=true;
}else{
t=t.parentNode;
}
}
if(_166){
t=e.target;
if(_165.onItemClick){
var _167;
while(t&&!(_167=_161.byNode(t))){
t=t.parentNode;
}
if(_167&&_167.onClick&&_167.getParent){
_167.getParent().onItemClick(_167,e);
}
}
return;
}
}
}
if(this._opened){
if(_165.focus&&(_165.autoFocus!==false||(e.type=="mouseup"&&!this.hovering))){
this._focusDropDownTimer=this.defer(function(){
_165.focus();
delete this._focusDropDownTimer;
});
}
}else{
if(this.focus){
this.defer("focus");
}
}
},_onDropDownClick:function(e){
if(this._stopClickEvents){
e.stopPropagation();
e.preventDefault();
}
},buildRendering:function(){
this.inherited(arguments);
this._buttonNode=this._buttonNode||this.focusNode||this.domNode;
this._popupStateNode=this._popupStateNode||this.focusNode||this._buttonNode;
var _168={"after":this.isLeftToRight()?"Right":"Left","before":this.isLeftToRight()?"Left":"Right","above":"Up","below":"Down","left":"Left","right":"Right"}[this.dropDownPosition[0]]||this.dropDownPosition[0]||"Down";
_15d.add(this._arrowWrapperNode||this._buttonNode,"dijit"+_168+"ArrowButton");
},postCreate:function(){
this.inherited(arguments);
var _169=this.focusNode||this.domNode;
this.own(on(this._buttonNode,_160.press,lang.hitch(this,"_onDropDownMouseDown")),on(this._buttonNode,"click",lang.hitch(this,"_onDropDownClick")),on(_169,"keydown",lang.hitch(this,"_onKey")),on(_169,"keyup",lang.hitch(this,"_onKeyUp")));
},destroy:function(){
if(this.dropDown){
if(!this.dropDown._destroyed){
this.dropDown.destroyRecursive();
}
delete this.dropDown;
}
this.inherited(arguments);
},_onKey:function(e){
if(this.disabled||this.readOnly){
return;
}
var d=this.dropDown,_16a=e.target;
if(d&&this._opened&&d.handleKey){
if(d.handleKey(e)===false){
e.stopPropagation();
e.preventDefault();
return;
}
}
if(d&&this._opened&&e.keyCode==keys.ESCAPE){
this.closeDropDown();
e.stopPropagation();
e.preventDefault();
}else{
if(!this._opened&&(e.keyCode==keys.DOWN_ARROW||((e.keyCode==keys.ENTER||(e.keyCode==keys.SPACE&&(!this._searchTimer||(e.ctrlKey||e.altKey||e.metaKey))))&&((_16a.tagName||"").toLowerCase()!=="input"||(_16a.type&&_16a.type.toLowerCase()!=="text"))))){
this._toggleOnKeyUp=true;
e.stopPropagation();
e.preventDefault();
}
}
},_onKeyUp:function(){
if(this._toggleOnKeyUp){
delete this._toggleOnKeyUp;
this.toggleDropDown();
var d=this.dropDown;
if(d&&d.focus){
this.defer(lang.hitch(d,"focus"),1);
}
}
},_onBlur:function(){
this.closeDropDown(false);
this.inherited(arguments);
},isLoaded:function(){
return true;
},loadDropDown:function(_16b){
_16b();
},loadAndOpenDropDown:function(){
var d=new _15b(),_16c=lang.hitch(this,function(){
this.openDropDown();
d.resolve(this.dropDown);
});
if(!this.isLoaded()){
this.loadDropDown(_16c);
}else{
_16c();
}
return d;
},toggleDropDown:function(){
if(this.disabled||this.readOnly){
return;
}
if(!this._opened){
this.loadAndOpenDropDown();
}else{
this.closeDropDown(true);
}
},openDropDown:function(){
var _16d=this.dropDown,_16e=_16d.domNode,_16f=this._aroundNode||this.domNode,self=this;
var _170=_163.open({parent:this,popup:_16d,around:_16f,orient:this.dropDownPosition,maxHeight:this.maxHeight,onExecute:function(){
self.closeDropDown(true);
},onCancel:function(){
self.closeDropDown(true);
},onClose:function(){
_15c.set(self._popupStateNode,"popupActive",false);
_15d.remove(self._popupStateNode,"dijitHasDropDownOpen");
self._set("_opened",false);
}});
if(this.forceWidth||(this.autoWidth&&_16f.offsetWidth>_16d._popupWrapper.offsetWidth)){
var _171={w:_16f.offsetWidth-(_16d._popupWrapper.offsetWidth-_16d.domNode.offsetWidth)};
if(lang.isFunction(_16d.resize)){
_16d.resize(_171);
}else{
_15e.setMarginBox(_16e,_171);
}
}
_15c.set(this._popupStateNode,"popupActive","true");
_15d.add(this._popupStateNode,"dijitHasDropDownOpen");
this._set("_opened",true);
this._popupStateNode.setAttribute("aria-expanded","true");
this._popupStateNode.setAttribute("aria-owns",_16d.id);
if(_16e.getAttribute("role")!=="presentation"&&!_16e.getAttribute("aria-labelledby")){
_16e.setAttribute("aria-labelledby",this.id);
}
return _170;
},closeDropDown:function(_172){
if(this._focusDropDownTimer){
this._focusDropDownTimer.remove();
delete this._focusDropDownTimer;
}
if(this._opened){
this._popupStateNode.setAttribute("aria-expanded","false");
if(_172){
this.focus();
}
_163.close(this.dropDown);
this._opened=false;
}
}});
});
},"dijit/tree/TreeStoreModel":function(){
define(["dojo/_base/array","dojo/aspect","dojo/_base/declare","dojo/_base/lang"],function(_173,_174,_175,lang){
return _175("dijit.tree.TreeStoreModel",null,{store:null,childrenAttrs:["children"],newItemIdAttr:"id",labelAttr:"",root:null,query:null,deferItemLoadingUntilExpand:false,constructor:function(args){
lang.mixin(this,args);
this.connects=[];
var _176=this.store;
if(!_176.getFeatures()["dojo.data.api.Identity"]){
throw new Error("dijit.tree.TreeStoreModel: store must support dojo.data.Identity");
}
if(_176.getFeatures()["dojo.data.api.Notification"]){
this.connects=this.connects.concat([_174.after(_176,"onNew",lang.hitch(this,"onNewItem"),true),_174.after(_176,"onDelete",lang.hitch(this,"onDeleteItem"),true),_174.after(_176,"onSet",lang.hitch(this,"onSetItem"),true)]);
}
},destroy:function(){
var h;
while(h=this.connects.pop()){
h.remove();
}
},getRoot:function(_177,_178){
if(this.root){
_177(this.root);
}else{
this.store.fetch({query:this.query,onComplete:lang.hitch(this,function(_179){
if(_179.length!=1){
throw new Error("dijit.tree.TreeStoreModel: root query returned "+_179.length+" items, but must return exactly one");
}
this.root=_179[0];
_177(this.root);
}),onError:_178});
}
},mayHaveChildren:function(item){
return _173.some(this.childrenAttrs,function(attr){
return this.store.hasAttribute(item,attr);
},this);
},getChildren:function(_17a,_17b,_17c){
var _17d=this.store;
if(!_17d.isItemLoaded(_17a)){
var _17e=lang.hitch(this,arguments.callee);
_17d.loadItem({item:_17a,onItem:function(_17f){
_17e(_17f,_17b,_17c);
},onError:_17c});
return;
}
var _180=[];
for(var i=0;i<this.childrenAttrs.length;i++){
var vals=_17d.getValues(_17a,this.childrenAttrs[i]);
_180=_180.concat(vals);
}
var _181=0;
if(!this.deferItemLoadingUntilExpand){
_173.forEach(_180,function(item){
if(!_17d.isItemLoaded(item)){
_181++;
}
});
}
if(_181==0){
_17b(_180);
}else{
_173.forEach(_180,function(item,idx){
if(!_17d.isItemLoaded(item)){
_17d.loadItem({item:item,onItem:function(item){
_180[idx]=item;
if(--_181==0){
_17b(_180);
}
},onError:_17c});
}
});
}
},isItem:function(_182){
return this.store.isItem(_182);
},fetchItemByIdentity:function(_183){
this.store.fetchItemByIdentity(_183);
},getIdentity:function(item){
return this.store.getIdentity(item);
},getLabel:function(item){
if(this.labelAttr){
return this.store.getValue(item,this.labelAttr);
}else{
return this.store.getLabel(item);
}
},newItem:function(args,_184,_185){
var _186={parent:_184,attribute:this.childrenAttrs[0]},_187;
if(this.newItemIdAttr&&args[this.newItemIdAttr]){
this.fetchItemByIdentity({identity:args[this.newItemIdAttr],scope:this,onItem:function(item){
if(item){
this.pasteItem(item,null,_184,true,_185);
}else{
_187=this.store.newItem(args,_186);
if(_187&&(_185!=undefined)){
this.pasteItem(_187,_184,_184,false,_185);
}
}
}});
}else{
_187=this.store.newItem(args,_186);
if(_187&&(_185!=undefined)){
this.pasteItem(_187,_184,_184,false,_185);
}
}
},pasteItem:function(_188,_189,_18a,_18b,_18c){
var _18d=this.store,_18e=this.childrenAttrs[0];
if(_189){
_173.forEach(this.childrenAttrs,function(attr){
if(_18d.containsValue(_189,attr,_188)){
if(!_18b){
var _18f=_173.filter(_18d.getValues(_189,attr),function(x){
return x!=_188;
});
_18d.setValues(_189,attr,_18f);
}
_18e=attr;
}
});
}
if(_18a){
if(typeof _18c=="number"){
var _190=_18d.getValues(_18a,_18e).slice();
_190.splice(_18c,0,_188);
_18d.setValues(_18a,_18e,_190);
}else{
_18d.setValues(_18a,_18e,_18d.getValues(_18a,_18e).concat(_188));
}
}
},onChange:function(){
},onChildrenChange:function(){
},onDelete:function(){
},onNewItem:function(item,_191){
if(!_191){
return;
}
this.getChildren(_191.item,lang.hitch(this,function(_192){
this.onChildrenChange(_191.item,_192);
}));
},onDeleteItem:function(item){
this.onDelete(item);
},onSetItem:function(item,_193){
if(_173.indexOf(this.childrenAttrs,_193)!=-1){
this.getChildren(item,lang.hitch(this,function(_194){
this.onChildrenChange(item,_194);
}));
}else{
this.onChange(item);
}
}});
});
},"dijit/_editor/plugins/EnterKeyHandling":function(){
define(["dojo/_base/declare","dojo/dom-construct","dojo/keys","dojo/_base/lang","dojo/on","dojo/sniff","dojo/_base/window","dojo/window","../_Plugin","../RichText","../range","../../_base/focus"],function(_195,_196,keys,lang,on,has,win,_197,_198,_199,_19a,_19b){
return _195("dijit._editor.plugins.EnterKeyHandling",_198,{blockNodeForEnter:"BR",constructor:function(args){
if(args){
if("blockNodeForEnter" in args){
args.blockNodeForEnter=args.blockNodeForEnter.toUpperCase();
}
lang.mixin(this,args);
}
},setEditor:function(_19c){
if(this.editor===_19c){
return;
}
this.editor=_19c;
if(this.blockNodeForEnter=="BR"){
this.editor.customUndo=true;
_19c.onLoadDeferred.then(lang.hitch(this,function(d){
this.own(on(_19c.document,"keydown",lang.hitch(this,function(e){
if(e.keyCode==keys.ENTER){
var ne=lang.mixin({},e);
ne.shiftKey=true;
if(!this.handleEnterKey(ne)){
e.stopPropagation();
e.preventDefault();
}
}
})));
if(has("ie")>=9&&has("ie")<=10){
this.own(on(_19c.document,"paste",lang.hitch(this,function(e){
setTimeout(lang.hitch(this,function(){
var r=this.editor.document.selection.createRange();
r.move("character",-1);
r.select();
r.move("character",1);
r.select();
}),0);
})));
}
return d;
}));
}else{
if(this.blockNodeForEnter){
var h=lang.hitch(this,"handleEnterKey");
_19c.addKeyHandler(13,0,0,h);
_19c.addKeyHandler(13,0,1,h);
this.own(this.editor.on("KeyPressed",lang.hitch(this,"onKeyPressed")));
}
}
},onKeyPressed:function(){
if(this._checkListLater){
if(win.withGlobal(this.editor.window,"isCollapsed",_19b)){
var _19d=this.editor.selection.getAncestorElement("LI");
if(!_19d){
_199.prototype.execCommand.call(this.editor,"formatblock",this.blockNodeForEnter);
var _19e=this.editor.selection.getAncestorElement(this.blockNodeForEnter);
if(_19e){
_19e.innerHTML=this.bogusHtmlContent;
if(has("ie")<=9){
var r=this.editor.document.selection.createRange();
r.move("character",-1);
r.select();
}
}else{
console.error("onKeyPressed: Cannot find the new block node");
}
}else{
if(has("mozilla")){
if(_19d.parentNode.parentNode.nodeName=="LI"){
_19d=_19d.parentNode.parentNode;
}
}
var fc=_19d.firstChild;
if(fc&&fc.nodeType==1&&(fc.nodeName=="UL"||fc.nodeName=="OL")){
_19d.insertBefore(fc.ownerDocument.createTextNode(" "),fc);
var _19f=_19a.create(this.editor.window);
_19f.setStart(_19d.firstChild,0);
var _1a0=_19a.getSelection(this.editor.window,true);
_1a0.removeAllRanges();
_1a0.addRange(_19f);
}
}
}
this._checkListLater=false;
}
if(this._pressedEnterInBlock){
if(this._pressedEnterInBlock.previousSibling){
this.removeTrailingBr(this._pressedEnterInBlock.previousSibling);
}
delete this._pressedEnterInBlock;
}
},bogusHtmlContent:"&#160;",blockNodes:/^(?:P|H1|H2|H3|H4|H5|H6|LI)$/,handleEnterKey:function(e){
var _1a1,_1a2,_1a3,_1a4,_1a5,_1a6,doc=this.editor.document,br,rs,txt;
if(e.shiftKey){
var _1a7=this.editor.selection.getParentElement();
var _1a8=_19a.getAncestor(_1a7,this.blockNodes);
if(_1a8){
if(_1a8.tagName=="LI"){
return true;
}
_1a1=_19a.getSelection(this.editor.window);
_1a2=_1a1.getRangeAt(0);
if(!_1a2.collapsed){
_1a2.deleteContents();
_1a1=_19a.getSelection(this.editor.window);
_1a2=_1a1.getRangeAt(0);
}
if(_19a.atBeginningOfContainer(_1a8,_1a2.startContainer,_1a2.startOffset)){
br=doc.createElement("br");
_1a3=_19a.create(this.editor.window);
_1a8.insertBefore(br,_1a8.firstChild);
_1a3.setStartAfter(br);
_1a1.removeAllRanges();
_1a1.addRange(_1a3);
}else{
if(_19a.atEndOfContainer(_1a8,_1a2.startContainer,_1a2.startOffset)){
_1a3=_19a.create(this.editor.window);
br=doc.createElement("br");
_1a8.appendChild(br);
_1a8.appendChild(doc.createTextNode(" "));
_1a3.setStart(_1a8.lastChild,0);
_1a1.removeAllRanges();
_1a1.addRange(_1a3);
}else{
rs=_1a2.startContainer;
if(rs&&rs.nodeType==3){
txt=rs.nodeValue;
_1a4=doc.createTextNode(txt.substring(0,_1a2.startOffset));
_1a5=doc.createTextNode(txt.substring(_1a2.startOffset));
_1a6=doc.createElement("br");
if(_1a5.nodeValue==""&&has("webkit")){
_1a5=doc.createTextNode(" ");
}
_196.place(_1a4,rs,"after");
_196.place(_1a6,_1a4,"after");
_196.place(_1a5,_1a6,"after");
_196.destroy(rs);
_1a3=_19a.create(this.editor.window);
_1a3.setStart(_1a5,0);
_1a1.removeAllRanges();
_1a1.addRange(_1a3);
return false;
}
return true;
}
}
}else{
_1a1=_19a.getSelection(this.editor.window);
if(_1a1.rangeCount){
_1a2=_1a1.getRangeAt(0);
if(_1a2&&_1a2.startContainer){
if(!_1a2.collapsed){
_1a2.deleteContents();
_1a1=_19a.getSelection(this.editor.window);
_1a2=_1a1.getRangeAt(0);
}
rs=_1a2.startContainer;
if(rs&&rs.nodeType==3){
var _1a9=false;
var _1aa=_1a2.startOffset;
if(rs.length<_1aa){
ret=this._adjustNodeAndOffset(rs,_1aa);
rs=ret.node;
_1aa=ret.offset;
}
txt=rs.nodeValue;
_1a4=doc.createTextNode(txt.substring(0,_1aa));
_1a5=doc.createTextNode(txt.substring(_1aa));
_1a6=doc.createElement("br");
if(!_1a5.length){
_1a5=doc.createTextNode(" ");
_1a9=true;
}
if(_1a4.length){
_196.place(_1a4,rs,"after");
}else{
_1a4=rs;
}
_196.place(_1a6,_1a4,"after");
_196.place(_1a5,_1a6,"after");
_196.destroy(rs);
_1a3=_19a.create(this.editor.window);
_1a3.setStart(_1a5,0);
_1a3.setEnd(_1a5,_1a5.length);
_1a1.removeAllRanges();
_1a1.addRange(_1a3);
if(_1a9&&!has("webkit")){
this.editor.selection.remove();
}else{
this.editor.selection.collapse(true);
}
}else{
var _1ab;
if(_1a2.startOffset>=0){
_1ab=rs.childNodes[_1a2.startOffset];
}
var _1a6=doc.createElement("br");
var _1a5=doc.createTextNode(" ");
if(!_1ab){
rs.appendChild(_1a6);
rs.appendChild(_1a5);
}else{
_196.place(_1a6,_1ab,"before");
_196.place(_1a5,_1a6,"after");
}
_1a3=_19a.create(this.editor.window);
_1a3.setStart(_1a5,0);
_1a3.setEnd(_1a5,_1a5.length);
_1a1.removeAllRanges();
_1a1.addRange(_1a3);
this.editor.selection.collapse(true);
}
}
}else{
_199.prototype.execCommand.call(this.editor,"inserthtml","<br>");
}
}
return false;
}
var _1ac=true;
_1a1=_19a.getSelection(this.editor.window);
_1a2=_1a1.getRangeAt(0);
if(!_1a2.collapsed){
_1a2.deleteContents();
_1a1=_19a.getSelection(this.editor.window);
_1a2=_1a1.getRangeAt(0);
}
var _1ad=_19a.getBlockAncestor(_1a2.endContainer,null,this.editor.editNode);
var _1ae=_1ad.blockNode;
if((this._checkListLater=(_1ae&&(_1ae.nodeName=="LI"||_1ae.parentNode.nodeName=="LI")))){
if(has("mozilla")){
this._pressedEnterInBlock=_1ae;
}
if(/^(\s|&nbsp;|&#160;|\xA0|<span\b[^>]*\bclass=['"]Apple-style-span['"][^>]*>(\s|&nbsp;|&#160;|\xA0)<\/span>)?(<br>)?$/.test(_1ae.innerHTML)){
_1ae.innerHTML="";
if(has("webkit")){
_1a3=_19a.create(this.editor.window);
_1a3.setStart(_1ae,0);
_1a1.removeAllRanges();
_1a1.addRange(_1a3);
}
this._checkListLater=false;
}
return true;
}
if(!_1ad.blockNode||_1ad.blockNode===this.editor.editNode){
try{
_199.prototype.execCommand.call(this.editor,"formatblock",this.blockNodeForEnter);
}
catch(e2){
}
_1ad={blockNode:this.editor.selection.getAncestorElement(this.blockNodeForEnter),blockContainer:this.editor.editNode};
if(_1ad.blockNode){
if(_1ad.blockNode!=this.editor.editNode&&(!(_1ad.blockNode.textContent||_1ad.blockNode.innerHTML).replace(/^\s+|\s+$/g,"").length)){
this.removeTrailingBr(_1ad.blockNode);
return false;
}
}else{
_1ad.blockNode=this.editor.editNode;
}
_1a1=_19a.getSelection(this.editor.window);
_1a2=_1a1.getRangeAt(0);
}
var _1af=doc.createElement(this.blockNodeForEnter);
_1af.innerHTML=this.bogusHtmlContent;
this.removeTrailingBr(_1ad.blockNode);
var _1b0=_1a2.endOffset;
var node=_1a2.endContainer;
if(node.length<_1b0){
var ret=this._adjustNodeAndOffset(node,_1b0);
node=ret.node;
_1b0=ret.offset;
}
if(_19a.atEndOfContainer(_1ad.blockNode,node,_1b0)){
if(_1ad.blockNode===_1ad.blockContainer){
_1ad.blockNode.appendChild(_1af);
}else{
_196.place(_1af,_1ad.blockNode,"after");
}
_1ac=false;
_1a3=_19a.create(this.editor.window);
_1a3.setStart(_1af,0);
_1a1.removeAllRanges();
_1a1.addRange(_1a3);
if(this.editor.height){
_197.scrollIntoView(_1af);
}
}else{
if(_19a.atBeginningOfContainer(_1ad.blockNode,_1a2.startContainer,_1a2.startOffset)){
_196.place(_1af,_1ad.blockNode,_1ad.blockNode===_1ad.blockContainer?"first":"before");
if(_1af.nextSibling&&this.editor.height){
_1a3=_19a.create(this.editor.window);
_1a3.setStart(_1af.nextSibling,0);
_1a1.removeAllRanges();
_1a1.addRange(_1a3);
_197.scrollIntoView(_1af.nextSibling);
}
_1ac=false;
}else{
if(_1ad.blockNode===_1ad.blockContainer){
_1ad.blockNode.appendChild(_1af);
}else{
_196.place(_1af,_1ad.blockNode,"after");
}
_1ac=false;
if(_1ad.blockNode.style){
if(_1af.style){
if(_1ad.blockNode.style.cssText){
_1af.style.cssText=_1ad.blockNode.style.cssText;
}
}
}
rs=_1a2.startContainer;
var _1b1;
if(rs&&rs.nodeType==3){
var _1b2,_1b3;
_1b0=_1a2.endOffset;
if(rs.length<_1b0){
ret=this._adjustNodeAndOffset(rs,_1b0);
rs=ret.node;
_1b0=ret.offset;
}
txt=rs.nodeValue;
_1a4=doc.createTextNode(txt.substring(0,_1b0));
_1a5=doc.createTextNode(txt.substring(_1b0,txt.length));
_196.place(_1a4,rs,"before");
_196.place(_1a5,rs,"after");
_196.destroy(rs);
var _1b4=_1a4.parentNode;
while(_1b4!==_1ad.blockNode){
var tg=_1b4.tagName;
var _1b5=doc.createElement(tg);
if(_1b4.style){
if(_1b5.style){
if(_1b4.style.cssText){
_1b5.style.cssText=_1b4.style.cssText;
}
}
}
if(_1b4.tagName==="FONT"){
if(_1b4.color){
_1b5.color=_1b4.color;
}
if(_1b4.face){
_1b5.face=_1b4.face;
}
if(_1b4.size){
_1b5.size=_1b4.size;
}
}
_1b2=_1a5;
while(_1b2){
_1b3=_1b2.nextSibling;
_1b5.appendChild(_1b2);
_1b2=_1b3;
}
_196.place(_1b5,_1b4,"after");
_1a4=_1b4;
_1a5=_1b5;
_1b4=_1b4.parentNode;
}
_1b2=_1a5;
if(_1b2.nodeType==1||(_1b2.nodeType==3&&_1b2.nodeValue)){
_1af.innerHTML="";
}
_1b1=_1b2;
while(_1b2){
_1b3=_1b2.nextSibling;
_1af.appendChild(_1b2);
_1b2=_1b3;
}
}
_1a3=_19a.create(this.editor.window);
var _1b6;
var _1b7=_1b1;
if(this.blockNodeForEnter!=="BR"){
while(_1b7){
_1b6=_1b7;
_1b3=_1b7.firstChild;
_1b7=_1b3;
}
if(_1b6&&_1b6.parentNode){
_1af=_1b6.parentNode;
_1a3.setStart(_1af,0);
_1a1.removeAllRanges();
_1a1.addRange(_1a3);
if(this.editor.height){
_197.scrollIntoView(_1af);
}
if(has("mozilla")){
this._pressedEnterInBlock=_1ad.blockNode;
}
}else{
_1ac=true;
}
}else{
_1a3.setStart(_1af,0);
_1a1.removeAllRanges();
_1a1.addRange(_1a3);
if(this.editor.height){
_197.scrollIntoView(_1af);
}
if(has("mozilla")){
this._pressedEnterInBlock=_1ad.blockNode;
}
}
}
}
return _1ac;
},_adjustNodeAndOffset:function(node,_1b8){
while(node.length<_1b8&&node.nextSibling&&node.nextSibling.nodeType==3){
_1b8=_1b8-node.length;
node=node.nextSibling;
}
return {"node":node,"offset":_1b8};
},removeTrailingBr:function(_1b9){
var para=/P|DIV|LI/i.test(_1b9.tagName)?_1b9:this.editor.selection.getParentOfType(_1b9,["P","DIV","LI"]);
if(!para){
return;
}
if(para.lastChild){
if((para.childNodes.length>1&&para.lastChild.nodeType==3&&/^[\s\xAD]*$/.test(para.lastChild.nodeValue))||para.lastChild.tagName=="BR"){
_196.destroy(para.lastChild);
}
}
if(!para.childNodes.length){
para.innerHTML=this.bogusHtmlContent;
}
}});
});
},"dijit/_MenuBase":function(){
define(["dojo/_base/array","dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-class","dojo/_base/lang","dojo/mouse","dojo/on","dojo/window","./a11yclick","./registry","./_Widget","./_CssStateMixin","./_KeyNavContainer","./_TemplatedMixin"],function(_1ba,_1bb,dom,_1bc,_1bd,lang,_1be,on,_1bf,_1c0,_1c1,_1c2,_1c3,_1c4,_1c5){
return _1bb("dijit._MenuBase",[_1c2,_1c5,_1c4,_1c3],{selected:null,_setSelectedAttr:function(item){
if(this.selected!=item){
if(this.selected){
this.selected._setSelected(false);
this._onChildDeselect(this.selected);
}
if(item){
item._setSelected(true);
}
this._set("selected",item);
}
},activated:false,_setActivatedAttr:function(val){
_1bd.toggle(this.domNode,"dijitMenuActive",val);
_1bd.toggle(this.domNode,"dijitMenuPassive",!val);
this._set("activated",val);
},parentMenu:null,popupDelay:500,passivePopupDelay:Infinity,autoFocus:false,childSelector:function(node){
var _1c6=_1c1.byNode(node);
return node.parentNode==this.containerNode&&_1c6&&_1c6.focus;
},postCreate:function(){
var self=this,_1c7=typeof this.childSelector=="string"?this.childSelector:lang.hitch(this,"childSelector");
this.own(on(this.containerNode,on.selector(_1c7,_1be.enter),function(){
self.onItemHover(_1c1.byNode(this));
}),on(this.containerNode,on.selector(_1c7,_1be.leave),function(){
self.onItemUnhover(_1c1.byNode(this));
}),on(this.containerNode,on.selector(_1c7,_1c0),function(evt){
self.onItemClick(_1c1.byNode(this),evt);
evt.stopPropagation();
evt.preventDefault();
}));
this.inherited(arguments);
},onKeyboardSearch:function(item,evt,_1c8,_1c9){
this.inherited(arguments);
if(!!item&&(_1c9==-1||(!!item.popup&&_1c9==1))){
this.onItemClick(item,evt);
}
},_keyboardSearchCompare:function(item,_1ca){
if(!!item.shortcutKey){
return _1ca==item.shortcutKey.toLowerCase()?-1:0;
}
return this.inherited(arguments)?1:0;
},onExecute:function(){
},onCancel:function(){
},_moveToPopup:function(evt){
if(this.focusedChild&&this.focusedChild.popup&&!this.focusedChild.disabled){
this.onItemClick(this.focusedChild,evt);
}else{
var _1cb=this._getTopMenu();
if(_1cb&&_1cb._isMenuBar){
_1cb.focusNext();
}
}
},_onPopupHover:function(){
this.set("selected",this.currentPopupItem);
this._stopPendingCloseTimer();
},onItemHover:function(item){
if(this.activated){
this.set("selected",item);
if(item.popup&&!item.disabled&&!this.hover_timer){
this.hover_timer=this.defer(function(){
this._openItemPopup(item);
},this.popupDelay);
}
}else{
if(this.passivePopupDelay<Infinity){
if(this.passive_hover_timer){
this.passive_hover_timer.remove();
}
this.passive_hover_timer=this.defer(function(){
this.onItemClick(item,{type:"click"});
},this.passivePopupDelay);
}
}
this._hoveredChild=item;
item._set("hovering",true);
},_onChildDeselect:function(item){
this._stopPopupTimer();
if(this.currentPopupItem==item){
this._stopPendingCloseTimer();
this._pendingClose_timer=this.defer(function(){
this._pendingClose_timer=null;
this.currentPopupItem=null;
item._closePopup();
},this.popupDelay);
}
},onItemUnhover:function(item){
if(this._hoveredChild==item){
this._hoveredChild=null;
}
if(this.passive_hover_timer){
this.passive_hover_timer.remove();
this.passive_hover_timer=null;
}
item._set("hovering",false);
},_stopPopupTimer:function(){
if(this.hover_timer){
this.hover_timer=this.hover_timer.remove();
}
},_stopPendingCloseTimer:function(){
if(this._pendingClose_timer){
this._pendingClose_timer=this._pendingClose_timer.remove();
}
},_getTopMenu:function(){
for(var top=this;top.parentMenu;top=top.parentMenu){
}
return top;
},onItemClick:function(item,evt){
if(this.passive_hover_timer){
this.passive_hover_timer.remove();
}
this.focusChild(item);
if(item.disabled){
return false;
}
if(item.popup){
this.set("selected",item);
this.set("activated",true);
var _1cc=/^key/.test(evt._origType||evt.type)||(evt.clientX==0&&evt.clientY==0);
this._openItemPopup(item,_1cc);
}else{
this.onExecute();
item._onClick?item._onClick(evt):item.onClick(evt);
}
},_openItemPopup:function(_1cd,_1ce){
if(_1cd==this.currentPopupItem){
return;
}
if(this.currentPopupItem){
this._stopPendingCloseTimer();
this.currentPopupItem._closePopup();
}
this._stopPopupTimer();
var _1cf=_1cd.popup;
_1cf.parentMenu=this;
this.own(this._mouseoverHandle=on.once(_1cf.domNode,"mouseover",lang.hitch(this,"_onPopupHover")));
var self=this;
_1cd._openPopup({parent:this,orient:this._orient||["after","before"],onCancel:function(){
if(_1ce){
self.focusChild(_1cd);
}
self._cleanUp();
},onExecute:lang.hitch(this,"_cleanUp",true),onClose:function(){
if(self._mouseoverHandle){
self._mouseoverHandle.remove();
delete self._mouseoverHandle;
}
}},_1ce);
this.currentPopupItem=_1cd;
},onOpen:function(){
this.isShowingNow=true;
this.set("activated",true);
},onClose:function(){
this.set("activated",false);
this.set("selected",null);
this.isShowingNow=false;
this.parentMenu=null;
},_closeChild:function(){
this._stopPopupTimer();
if(this.currentPopupItem){
if(this.focused){
_1bc.set(this.selected.focusNode,"tabIndex",this.tabIndex);
this.selected.focusNode.focus();
}
this.currentPopupItem._closePopup();
this.currentPopupItem=null;
}
},_onItemFocus:function(item){
if(this._hoveredChild&&this._hoveredChild!=item){
this.onItemUnhover(this._hoveredChild);
}
this.set("selected",item);
},_onBlur:function(){
this._cleanUp(true);
this.inherited(arguments);
},_cleanUp:function(_1d0){
this._closeChild();
if(typeof this.isShowingNow=="undefined"){
this.set("activated",false);
}
if(_1d0){
this.set("selected",null);
}
}});
});
},"dijit/focus":function(){
define(["dojo/aspect","dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-class","dojo/dom-construct","dojo/Evented","dojo/_base/lang","dojo/on","dojo/domReady","dojo/sniff","dojo/Stateful","dojo/_base/window","dojo/window","./a11y","./registry","./main"],function(_1d1,_1d2,dom,_1d3,_1d4,_1d5,_1d6,lang,on,_1d7,has,_1d8,win,_1d9,a11y,_1da,_1db){
var _1dc;
var _1dd=_1d2([_1d8,_1d6],{curNode:null,activeStack:[],constructor:function(){
var _1de=lang.hitch(this,function(node){
if(dom.isDescendant(this.curNode,node)){
this.set("curNode",null);
}
if(dom.isDescendant(this.prevNode,node)){
this.set("prevNode",null);
}
});
_1d1.before(_1d5,"empty",_1de);
_1d1.before(_1d5,"destroy",_1de);
},registerIframe:function(_1df){
return this.registerWin(_1df.contentWindow,_1df);
},registerWin:function(_1e0,_1e1){
var _1e2=this,body=_1e0.document&&_1e0.document.body;
if(body){
var mdh=on(_1e0.document,"mousedown, touchstart",function(evt){
_1e2._justMouseDowned=true;
setTimeout(function(){
_1e2._justMouseDowned=false;
},0);
if(evt&&evt.target&&evt.target.parentNode==null){
return;
}
_1e2._onTouchNode(_1e1||evt.target,"mouse");
});
var fih=on(body,"focusin",function(evt){
_1dc=(new Date()).getTime();
if(!evt.target.tagName){
return;
}
var tag=evt.target.tagName.toLowerCase();
if(tag=="#document"||tag=="body"){
return;
}
if(a11y.isFocusable(evt.target)){
_1e2._onFocusNode(_1e1||evt.target);
}else{
_1e2._onTouchNode(_1e1||evt.target);
}
});
var foh=on(body,"focusout",function(evt){
if((new Date()).getTime()<_1dc+100){
return;
}
_1e2._onBlurNode(_1e1||evt.target);
});
return {remove:function(){
mdh.remove();
fih.remove();
foh.remove();
mdh=fih=foh=null;
body=null;
}};
}
},_onBlurNode:function(node){
if(this._clearFocusTimer){
clearTimeout(this._clearFocusTimer);
}
this._clearFocusTimer=setTimeout(lang.hitch(this,function(){
this.set("prevNode",this.curNode);
this.set("curNode",null);
}),0);
if(this._justMouseDowned){
return;
}
if(this._clearActiveWidgetsTimer){
clearTimeout(this._clearActiveWidgetsTimer);
}
this._clearActiveWidgetsTimer=setTimeout(lang.hitch(this,function(){
delete this._clearActiveWidgetsTimer;
this._setStack([]);
}),0);
},_onTouchNode:function(node,by){
if(this._clearActiveWidgetsTimer){
clearTimeout(this._clearActiveWidgetsTimer);
delete this._clearActiveWidgetsTimer;
}
if(_1d4.contains(node,"dijitPopup")){
node=node.firstChild;
}
var _1e3=[];
try{
while(node){
var _1e4=_1d3.get(node,"dijitPopupParent");
if(_1e4){
node=_1da.byId(_1e4).domNode;
}else{
if(node.tagName&&node.tagName.toLowerCase()=="body"){
if(node===win.body()){
break;
}
node=_1d9.get(node.ownerDocument).frameElement;
}else{
var id=node.getAttribute&&node.getAttribute("widgetId"),_1e5=id&&_1da.byId(id);
if(_1e5&&!(by=="mouse"&&_1e5.get("disabled"))){
_1e3.unshift(id);
}
node=node.parentNode;
}
}
}
}
catch(e){
}
this._setStack(_1e3,by);
},_onFocusNode:function(node){
if(!node){
return;
}
if(node.nodeType==9){
return;
}
if(this._clearFocusTimer){
clearTimeout(this._clearFocusTimer);
delete this._clearFocusTimer;
}
this._onTouchNode(node);
if(node==this.curNode){
return;
}
this.set("prevNode",this.curNode);
this.set("curNode",node);
},_setStack:function(_1e6,by){
var _1e7=this.activeStack,_1e8=_1e7.length-1,_1e9=_1e6.length-1;
if(_1e6[_1e9]==_1e7[_1e8]){
return;
}
this.set("activeStack",_1e6);
var _1ea,i;
for(i=_1e8;i>=0&&_1e7[i]!=_1e6[i];i--){
_1ea=_1da.byId(_1e7[i]);
if(_1ea){
_1ea._hasBeenBlurred=true;
_1ea.set("focused",false);
if(_1ea._focusManager==this){
_1ea._onBlur(by);
}
this.emit("widget-blur",_1ea,by);
}
}
for(i++;i<=_1e9;i++){
_1ea=_1da.byId(_1e6[i]);
if(_1ea){
_1ea.set("focused",true);
if(_1ea._focusManager==this){
_1ea._onFocus(by);
}
this.emit("widget-focus",_1ea,by);
}
}
},focus:function(node){
if(node){
try{
node.focus();
}
catch(e){
}
}
}});
var _1eb=new _1dd();
_1d7(function(){
var _1ec=_1eb.registerWin(_1d9.get(document));
if(has("ie")){
on(window,"unload",function(){
if(_1ec){
_1ec.remove();
_1ec=null;
}
});
}
});
_1db.focus=function(node){
_1eb.focus(node);
};
for(var attr in _1eb){
if(!/^_/.test(attr)){
_1db.focus[attr]=typeof _1eb[attr]=="function"?lang.hitch(_1eb,attr):_1eb[attr];
}
}
_1eb.watch(function(attr,_1ed,_1ee){
_1db.focus[attr]=_1ee;
});
return _1eb;
});
},"dgrid/util/touch":function(){
define(["dojo/on","dojo/query"],function(on,_1ef){
var util={tapRadius:10,dbltapTime:250,selector:function(_1f0,_1f1,_1f2){
return function(_1f3,_1f4){
var _1f5=_1f1.bubble;
if(_1f5){
_1f1=_1f5;
}else{
if(_1f2!==false){
_1f2=true;
}
}
return on(_1f3,_1f1,function(_1f6){
var _1f7=_1f6.target;
if(_1f7.nodeType==3){
_1f7=_1f7.parentNode;
}
while(!_1ef.matches(_1f7,_1f0,_1f3)){
if(_1f7==_1f3||!_1f2||!(_1f7=_1f7.parentNode)){
return;
}
}
return _1f4.call(_1f7,_1f6);
});
};
},countCurrentTouches:function(evt,node){
var i,_1f8,_1f9;
for(i=0,_1f8=0;(_1f9=evt.touches[i]);++i){
if(node.contains(_1f9.target)){
++_1f8;
}
}
return _1f8;
}};
function _1fa(_1fb,_1fc,evt,_1fd){
if(evt.targetTouches.length>1){
return;
}
var _1fe=evt.changedTouches[0],_1ff=_1fe.screenX,_200=_1fe.screenY;
_1fd&&evt.preventDefault();
var _201=on(_1fb,"touchend",function(evt){
var end=evt.changedTouches[0];
if(!evt.targetTouches.length){
if(Math.abs(end.screenX-_1ff)<util.tapRadius&&Math.abs(end.screenY-_200)<util.tapRadius){
_1fd&&evt.preventDefault();
_1fc.call(this,evt);
}
_201.remove();
}
});
};
function tap(_202,_203){
return on(_202,"touchstart",function(evt){
_1fa(_202,_203,evt);
});
};
function _204(_205,_206){
var _207,_208;
return on(_205,"touchstart",function(evt){
if(!_207){
_1fa(_205,function(evt){
_207=evt.changedTouches[0];
_208=setTimeout(function(){
_207=_208=null;
},util.dbltapTime);
},evt);
}else{
_1fa(_205,function(evt){
if(!_207){
return;
}
var _209=evt.changedTouches[0];
if(Math.abs(_209.screenX-_207.screenX)<util.tapRadius&&Math.abs(_209.screenY-_207.screenY)<util.tapRadius){
_208&&clearTimeout(_208);
_207=_208=null;
_206.call(this,evt);
}
},evt,true);
}
});
};
util.tap=tap;
util.dbltap=_204;
return util;
});
},"dijit/hccss":function(){
define(["dojo/dom-class","dojo/hccss","dojo/domReady","dojo/_base/window"],function(_20a,has,_20b,win){
_20b(function(){
if(has("highcontrast")){
_20a.add(win.body(),"dijit_a11y");
}
});
return has;
});
},"dijit/tree/ForestStoreModel":function(){
define(["dojo/_base/array","dojo/_base/declare","dojo/_base/kernel","dojo/_base/lang","./TreeStoreModel"],function(_20c,_20d,_20e,lang,_20f){
return _20d("dijit.tree.ForestStoreModel",_20f,{rootId:"$root$",rootLabel:"ROOT",query:null,constructor:function(_210){
this.root={store:this,root:true,id:_210.rootId,label:_210.rootLabel,children:_210.rootChildren};
},mayHaveChildren:function(item){
return item===this.root||this.inherited(arguments);
},getChildren:function(_211,_212,_213){
if(_211===this.root){
if(this.root.children){
_212(this.root.children);
}else{
this.store.fetch({query:this.query,onComplete:lang.hitch(this,function(_214){
this.root.children=_214;
_212(_214);
}),onError:_213});
}
}else{
this.inherited(arguments);
}
},isItem:function(_215){
return (_215===this.root)?true:this.inherited(arguments);
},fetchItemByIdentity:function(_216){
if(_216.identity==this.root.id){
var _217=_216.scope||_20e.global;
if(_216.onItem){
_216.onItem.call(_217,this.root);
}
}else{
this.inherited(arguments);
}
},getIdentity:function(item){
return (item===this.root)?this.root.id:this.inherited(arguments);
},getLabel:function(item){
return (item===this.root)?this.root.label:this.inherited(arguments);
},newItem:function(args,_218,_219){
if(_218===this.root){
this.onNewRootItem(args);
return this.store.newItem(args);
}else{
return this.inherited(arguments);
}
},onNewRootItem:function(){
},pasteItem:function(_21a,_21b,_21c,_21d,_21e){
if(_21b===this.root){
if(!_21d){
this.onLeaveRoot(_21a);
}
}
this.inherited(arguments,[_21a,_21b===this.root?null:_21b,_21c===this.root?null:_21c,_21d,_21e]);
if(_21c===this.root){
this.onAddToRoot(_21a);
}
},onAddToRoot:function(item){
},onLeaveRoot:function(item){
},_requeryTop:function(){
var _21f=this.root.children||[];
this.store.fetch({query:this.query,onComplete:lang.hitch(this,function(_220){
this.root.children=_220;
if(_21f.length!=_220.length||_20c.some(_21f,function(item,idx){
return _220[idx]!=item;
})){
this.onChildrenChange(this.root,_220);
}
})});
},onNewItem:function(item,_221){
this._requeryTop();
this.inherited(arguments);
},onDeleteItem:function(item){
if(_20c.indexOf(this.root.children,item)!=-1){
this._requeryTop();
}
this.inherited(arguments);
},onSetItem:function(item,_222,_223,_224){
this._requeryTop();
this.inherited(arguments);
}});
});
},"dijit/PopupMenuBarItem":function(){
define(["dojo/_base/declare","./PopupMenuItem","./MenuBarItem"],function(_225,_226,_227){
var _228=_227._MenuBarItemMixin;
return _225("dijit.PopupMenuBarItem",[_226,_228],{});
});
},"dijit/form/_ComboBoxMenuMixin":function(){
define(["dojo/_base/array","dojo/_base/declare","dojo/dom-attr","dojo/has","dojo/i18n","dojo/i18n!./nls/ComboBox"],function(_229,_22a,_22b,has,i18n){
var _22c=_22a("dijit.form._ComboBoxMenuMixin"+(has("dojo-bidi")?"_NoBidi":""),null,{_messages:null,postMixInProperties:function(){
this.inherited(arguments);
this._messages=i18n.getLocalization("dijit.form","ComboBox",this.lang);
},buildRendering:function(){
this.inherited(arguments);
this.previousButton.innerHTML=this._messages["previousMessage"];
this.nextButton.innerHTML=this._messages["nextMessage"];
},_setValueAttr:function(_22d){
this._set("value",_22d);
this.onChange(_22d);
},onClick:function(node){
if(node==this.previousButton){
this._setSelectedAttr(null);
this.onPage(-1);
}else{
if(node==this.nextButton){
this._setSelectedAttr(null);
this.onPage(1);
}else{
this.onChange(node);
}
}
},onChange:function(){
},onPage:function(){
},onClose:function(){
this._setSelectedAttr(null);
},_createOption:function(item,_22e){
var _22f=this._createMenuItem();
var _230=_22e(item);
if(_230.html){
_22f.innerHTML=_230.label;
}else{
_22f.appendChild(_22f.ownerDocument.createTextNode(_230.label));
}
if(_22f.innerHTML==""){
_22f.innerHTML="&#160;";
}
return _22f;
},createOptions:function(_231,_232,_233){
this.items=_231;
this.previousButton.style.display=(_232.start==0)?"none":"";
_22b.set(this.previousButton,"id",this.id+"_prev");
_229.forEach(_231,function(item,i){
var _234=this._createOption(item,_233);
_234.setAttribute("item",i);
_22b.set(_234,"id",this.id+i);
this.nextButton.parentNode.insertBefore(_234,this.nextButton);
},this);
var _235=false;
if(_231.total&&!_231.total.then&&_231.total!=-1){
if((_232.start+_232.count)<_231.total){
_235=true;
}else{
if((_232.start+_232.count)>_231.total&&_232.count==_231.length){
_235=true;
}
}
}else{
if(_232.count==_231.length){
_235=true;
}
}
this.nextButton.style.display=_235?"":"none";
_22b.set(this.nextButton,"id",this.id+"_next");
},clearResultList:function(){
var _236=this.containerNode;
while(_236.childNodes.length>2){
_236.removeChild(_236.childNodes[_236.childNodes.length-2]);
}
this._setSelectedAttr(null);
},highlightFirstOption:function(){
this.selectFirstNode();
},highlightLastOption:function(){
this.selectLastNode();
},selectFirstNode:function(){
this.inherited(arguments);
if(this.getHighlightedOption()==this.previousButton){
this.selectNextNode();
}
},selectLastNode:function(){
this.inherited(arguments);
if(this.getHighlightedOption()==this.nextButton){
this.selectPreviousNode();
}
},getHighlightedOption:function(){
return this.selected;
}});
if(has("dojo-bidi")){
_22c=_22a("dijit.form._ComboBoxMenuMixin",_22c,{_createOption:function(){
var _237=this.inherited(arguments);
this.applyTextDir(_237);
return _237;
}});
}
return _22c;
});
},"dijit/form/_SearchMixin":function(){
define(["dojo/_base/declare","dojo/keys","dojo/_base/lang","dojo/query","dojo/string","dojo/when","../registry"],function(_238,keys,lang,_239,_23a,when,_23b){
return _238("dijit.form._SearchMixin",null,{pageSize:Infinity,store:null,fetchProperties:{},query:{},searchDelay:200,searchAttr:"name",queryExpr:"${0}*",ignoreCase:true,_patternToRegExp:function(_23c){
return new RegExp("^"+_23c.replace(/(\\.)|(\*)|(\?)|\W/g,function(str,_23d,star,_23e){
return star?".*":_23e?".":_23d?_23d:"\\"+str;
})+"$",this.ignoreCase?"mi":"m");
},_abortQuery:function(){
if(this.searchTimer){
this.searchTimer=this.searchTimer.remove();
}
if(this._queryDeferHandle){
this._queryDeferHandle=this._queryDeferHandle.remove();
}
if(this._fetchHandle){
if(this._fetchHandle.abort){
this._cancelingQuery=true;
this._fetchHandle.abort();
this._cancelingQuery=false;
}
if(this._fetchHandle.cancel){
this._cancelingQuery=true;
this._fetchHandle.cancel();
this._cancelingQuery=false;
}
this._fetchHandle=null;
}
},_processInput:function(evt){
if(this.disabled||this.readOnly){
return;
}
var key=evt.charOrCode;
if("type" in evt&&evt.type.substring(0,3)=="key"&&(evt.altKey||((evt.ctrlKey||evt.metaKey)&&(key!="x"&&key!="v"))||key==keys.SHIFT)){
return;
}
var _23f=false;
this._prev_key_backspace=false;
switch(key){
case keys.DELETE:
case keys.BACKSPACE:
this._prev_key_backspace=true;
this._maskValidSubsetError=true;
_23f=true;
break;
default:
_23f=typeof key=="string"||key==229;
}
if(_23f){
if(!this.store){
this.onSearch();
}else{
this.searchTimer=this.defer("_startSearchFromInput",1);
}
}
},onSearch:function(){
},_startSearchFromInput:function(){
this._startSearch(this.focusNode.value);
},_startSearch:function(text){
this._abortQuery();
var _240=this,_239=lang.clone(this.query),_241={start:0,count:this.pageSize,queryOptions:{ignoreCase:this.ignoreCase,deep:true}},qs=_23a.substitute(this.queryExpr,[text.replace(/([\\\*\?])/g,"\\$1")]),q,_242=function(){
var _243=_240._fetchHandle=_240.store.query(_239,_241);
if(_240.disabled||_240.readOnly||(q!==_240._lastQuery)){
return;
}
when(_243,function(res){
_240._fetchHandle=null;
if(!_240.disabled&&!_240.readOnly&&(q===_240._lastQuery)){
when(_243.total,function(_244){
res.total=_244;
var _245=_240.pageSize;
if(isNaN(_245)||_245>res.total){
_245=res.total;
}
res.nextPage=function(_246){
_241.direction=_246=_246!==false;
_241.count=_245;
if(_246){
_241.start+=res.length;
if(_241.start>=res.total){
_241.count=0;
}
}else{
_241.start-=_245;
if(_241.start<0){
_241.count=Math.max(_245+_241.start,0);
_241.start=0;
}
}
if(_241.count<=0){
res.length=0;
_240.onSearch(res,_239,_241);
}else{
_242();
}
};
_240.onSearch(res,_239,_241);
});
}
},function(err){
_240._fetchHandle=null;
if(!_240._cancelingQuery){
console.error(_240.declaredClass+" "+err.toString());
}
});
};
lang.mixin(_241,this.fetchProperties);
if(this.store._oldAPI){
q=qs;
}else{
q=this._patternToRegExp(qs);
q.toString=function(){
return qs;
};
}
this._lastQuery=_239[this.searchAttr]=q;
this._queryDeferHandle=this.defer(_242,this.searchDelay);
},constructor:function(){
this.query={};
this.fetchProperties={};
},postMixInProperties:function(){
if(!this.store){
var list=this.list;
if(list){
this.store=_23b.byId(list);
}
}
this.inherited(arguments);
}});
});
},"dojo/parser":function(){
define(["require","./_base/kernel","./_base/lang","./_base/array","./_base/config","./dom","./_base/window","./_base/url","./aspect","./promise/all","./date/stamp","./Deferred","./has","./query","./on","./ready"],function(_247,dojo,_248,_249,_24a,dom,_24b,_24c,_24d,all,_24e,_24f,has,_250,don,_251){
new Date("X");
function _252(text){
return eval("("+text+")");
};
var _253=0;
_24d.after(_248,"extend",function(){
_253++;
},true);
function _254(ctor){
var map=ctor._nameCaseMap,_255=ctor.prototype;
if(!map||map._extendCnt<_253){
map=ctor._nameCaseMap={};
for(var name in _255){
if(name.charAt(0)==="_"){
continue;
}
map[name.toLowerCase()]=name;
}
map._extendCnt=_253;
}
return map;
};
var _256={};
function _257(_258,_259){
var ts=_258.join();
if(!_256[ts]){
var _25a=[];
for(var i=0,l=_258.length;i<l;i++){
var t=_258[i];
_25a[_25a.length]=(_256[t]=_256[t]||(_248.getObject(t)||(~t.indexOf("/")&&(_259?_259(t):_247(t)))));
}
var ctor=_25a.shift();
_256[ts]=_25a.length?(ctor.createSubclass?ctor.createSubclass(_25a):ctor.extend.apply(ctor,_25a)):ctor;
}
return _256[ts];
};
var _25b={_clearCache:function(){
_253++;
_256={};
},_functionFromScript:function(_25c,_25d){
var _25e="",_25f="",_260=(_25c.getAttribute(_25d+"args")||_25c.getAttribute("args")),_261=_25c.getAttribute("with");
var _262=(_260||"").split(/\s*,\s*/);
if(_261&&_261.length){
_249.forEach(_261.split(/\s*,\s*/),function(part){
_25e+="with("+part+"){";
_25f+="}";
});
}
return new Function(_262,_25e+_25c.innerHTML+_25f);
},instantiate:function(_263,_264,_265){
_264=_264||{};
_265=_265||{};
var _266=(_265.scope||dojo._scopeName)+"Type",_267="data-"+(_265.scope||dojo._scopeName)+"-",_268=_267+"type",_269=_267+"mixins";
var list=[];
_249.forEach(_263,function(node){
var type=_266 in _264?_264[_266]:node.getAttribute(_268)||node.getAttribute(_266);
if(type){
var _26a=node.getAttribute(_269),_26b=_26a?[type].concat(_26a.split(/\s*,\s*/)):[type];
list.push({node:node,types:_26b});
}
});
return this._instantiate(list,_264,_265);
},_instantiate:function(_26c,_26d,_26e,_26f){
var _270=_249.map(_26c,function(obj){
var ctor=obj.ctor||_257(obj.types,_26e.contextRequire);
if(!ctor){
throw new Error("Unable to resolve constructor for: '"+obj.types.join()+"'");
}
return this.construct(ctor,obj.node,_26d,_26e,obj.scripts,obj.inherited);
},this);
function _271(_272){
if(!_26d._started&&!_26e.noStart){
_249.forEach(_272,function(_273){
if(typeof _273.startup==="function"&&!_273._started){
_273.startup();
}
});
}
return _272;
};
if(_26f){
return all(_270).then(_271);
}else{
return _271(_270);
}
},construct:function(ctor,node,_274,_275,_276,_277){
var _278=ctor&&ctor.prototype;
_275=_275||{};
var _279={};
if(_275.defaults){
_248.mixin(_279,_275.defaults);
}
if(_277){
_248.mixin(_279,_277);
}
var _27a;
if(has("dom-attributes-explicit")){
_27a=node.attributes;
}else{
if(has("dom-attributes-specified-flag")){
_27a=_249.filter(node.attributes,function(a){
return a.specified;
});
}else{
var _27b=/^input$|^img$/i.test(node.nodeName)?node:node.cloneNode(false),_27c=_27b.outerHTML.replace(/=[^\s"']+|="[^"]*"|='[^']*'/g,"").replace(/^\s*<[a-zA-Z0-9]*\s*/,"").replace(/\s*>.*$/,"");
_27a=_249.map(_27c.split(/\s+/),function(name){
var _27d=name.toLowerCase();
return {name:name,value:(node.nodeName=="LI"&&name=="value")||_27d=="enctype"?node.getAttribute(_27d):node.getAttributeNode(_27d).value};
});
}
}
var _27e=_275.scope||dojo._scopeName,_27f="data-"+_27e+"-",hash={};
if(_27e!=="dojo"){
hash[_27f+"props"]="data-dojo-props";
hash[_27f+"type"]="data-dojo-type";
hash[_27f+"mixins"]="data-dojo-mixins";
hash[_27e+"type"]="dojoType";
hash[_27f+"id"]="data-dojo-id";
}
var i=0,item,_280=[],_281,_282;
while(item=_27a[i++]){
var name=item.name,_283=name.toLowerCase(),_284=item.value;
switch(hash[_283]||_283){
case "data-dojo-type":
case "dojotype":
case "data-dojo-mixins":
break;
case "data-dojo-props":
_282=_284;
break;
case "data-dojo-id":
case "jsid":
_281=_284;
break;
case "data-dojo-attach-point":
case "dojoattachpoint":
_279.dojoAttachPoint=_284;
break;
case "data-dojo-attach-event":
case "dojoattachevent":
_279.dojoAttachEvent=_284;
break;
case "class":
_279["class"]=node.className;
break;
case "style":
_279["style"]=node.style&&node.style.cssText;
break;
default:
if(!(name in _278)){
var map=_254(ctor);
name=map[_283]||name;
}
if(name in _278){
switch(typeof _278[name]){
case "string":
_279[name]=_284;
break;
case "number":
_279[name]=_284.length?Number(_284):NaN;
break;
case "boolean":
_279[name]=_284.toLowerCase()!="false";
break;
case "function":
if(_284===""||_284.search(/[^\w\.]+/i)!=-1){
_279[name]=new Function(_284);
}else{
_279[name]=_248.getObject(_284,false)||new Function(_284);
}
_280.push(name);
break;
default:
var pVal=_278[name];
_279[name]=(pVal&&"length" in pVal)?(_284?_284.split(/\s*,\s*/):[]):(pVal instanceof Date)?(_284==""?new Date(""):_284=="now"?new Date():_24e.fromISOString(_284)):(pVal instanceof _24c)?(dojo.baseUrl+_284):_252(_284);
}
}else{
_279[name]=_284;
}
}
}
for(var j=0;j<_280.length;j++){
var _285=_280[j].toLowerCase();
node.removeAttribute(_285);
node[_285]=null;
}
if(_282){
try{
_282=_252.call(_275.propsThis,"{"+_282+"}");
_248.mixin(_279,_282);
}
catch(e){
throw new Error(e.toString()+" in data-dojo-props='"+_282+"'");
}
}
_248.mixin(_279,_274);
if(!_276){
_276=(ctor&&(ctor._noScript||_278._noScript)?[]:_250("> script[type^='dojo/']",node));
}
var _286=[],_287=[],_288=[],ons=[];
if(_276){
for(i=0;i<_276.length;i++){
var _289=_276[i];
node.removeChild(_289);
var _28a=(_289.getAttribute(_27f+"event")||_289.getAttribute("event")),prop=_289.getAttribute(_27f+"prop"),_28b=_289.getAttribute(_27f+"method"),_28c=_289.getAttribute(_27f+"advice"),_28d=_289.getAttribute("type"),nf=this._functionFromScript(_289,_27f);
if(_28a){
if(_28d=="dojo/connect"){
_286.push({method:_28a,func:nf});
}else{
if(_28d=="dojo/on"){
ons.push({event:_28a,func:nf});
}else{
_279[_28a]=nf;
}
}
}else{
if(_28d=="dojo/aspect"){
_286.push({method:_28b,advice:_28c,func:nf});
}else{
if(_28d=="dojo/watch"){
_288.push({prop:prop,func:nf});
}else{
_287.push(nf);
}
}
}
}
}
var _28e=ctor.markupFactory||_278.markupFactory;
var _28f=_28e?_28e(_279,node,ctor):new ctor(_279,node);
function _290(_291){
if(_281){
_248.setObject(_281,_291);
}
for(i=0;i<_286.length;i++){
_24d[_286[i].advice||"after"](_291,_286[i].method,_248.hitch(_291,_286[i].func),true);
}
for(i=0;i<_287.length;i++){
_287[i].call(_291);
}
for(i=0;i<_288.length;i++){
_291.watch(_288[i].prop,_288[i].func);
}
for(i=0;i<ons.length;i++){
don(_291,ons[i].event,ons[i].func);
}
return _291;
};
if(_28f.then){
return _28f.then(_290);
}else{
return _290(_28f);
}
},scan:function(root,_292){
var list=[],mids=[],_293={};
var _294=(_292.scope||dojo._scopeName)+"Type",_295="data-"+(_292.scope||dojo._scopeName)+"-",_296=_295+"type",_297=_295+"textdir",_298=_295+"mixins";
var node=root.firstChild;
var _299=_292.inherited;
if(!_299){
function _29a(node,attr){
return (node.getAttribute&&node.getAttribute(attr))||(node.parentNode&&_29a(node.parentNode,attr));
};
_299={dir:_29a(root,"dir"),lang:_29a(root,"lang"),textDir:_29a(root,_297)};
for(var key in _299){
if(!_299[key]){
delete _299[key];
}
}
}
var _29b={inherited:_299};
var _29c;
var _29d;
function _29e(_29f){
if(!_29f.inherited){
_29f.inherited={};
var node=_29f.node,_2a0=_29e(_29f.parent);
var _2a1={dir:node.getAttribute("dir")||_2a0.dir,lang:node.getAttribute("lang")||_2a0.lang,textDir:node.getAttribute(_297)||_2a0.textDir};
for(var key in _2a1){
if(_2a1[key]){
_29f.inherited[key]=_2a1[key];
}
}
}
return _29f.inherited;
};
while(true){
if(!node){
if(!_29b||!_29b.node){
break;
}
node=_29b.node.nextSibling;
_29d=false;
_29b=_29b.parent;
_29c=_29b.scripts;
continue;
}
if(node.nodeType!=1){
node=node.nextSibling;
continue;
}
if(_29c&&node.nodeName.toLowerCase()=="script"){
type=node.getAttribute("type");
if(type&&/^dojo\/\w/i.test(type)){
_29c.push(node);
}
node=node.nextSibling;
continue;
}
if(_29d){
node=node.nextSibling;
continue;
}
var type=node.getAttribute(_296)||node.getAttribute(_294);
var _2a2=node.firstChild;
if(!type&&(!_2a2||(_2a2.nodeType==3&&!_2a2.nextSibling))){
node=node.nextSibling;
continue;
}
var _2a3;
var ctor=null;
if(type){
var _2a4=node.getAttribute(_298),_2a5=_2a4?[type].concat(_2a4.split(/\s*,\s*/)):[type];
try{
ctor=_257(_2a5,_292.contextRequire);
}
catch(e){
}
if(!ctor){
_249.forEach(_2a5,function(t){
if(~t.indexOf("/")&&!_293[t]){
_293[t]=true;
mids[mids.length]=t;
}
});
}
var _2a6=ctor&&!ctor.prototype._noScript?[]:null;
_2a3={types:_2a5,ctor:ctor,parent:_29b,node:node,scripts:_2a6};
_2a3.inherited=_29e(_2a3);
list.push(_2a3);
}else{
_2a3={node:node,scripts:_29c,parent:_29b};
}
_29c=_2a6;
_29d=node.stopParser||(ctor&&ctor.prototype.stopParser&&!(_292.template));
_29b=_2a3;
node=_2a2;
}
var d=new _24f();
if(mids.length){
if(has("dojo-debug-messages")){
console.warn("WARNING: Modules being Auto-Required: "+mids.join(", "));
}
var r=_292.contextRequire||_247;
r(mids,function(){
d.resolve(_249.filter(list,function(_2a7){
if(!_2a7.ctor){
try{
_2a7.ctor=_257(_2a7.types,_292.contextRequire);
}
catch(e){
}
}
var _2a8=_2a7.parent;
while(_2a8&&!_2a8.types){
_2a8=_2a8.parent;
}
var _2a9=_2a7.ctor&&_2a7.ctor.prototype;
_2a7.instantiateChildren=!(_2a9&&_2a9.stopParser&&!(_292.template));
_2a7.instantiate=!_2a8||(_2a8.instantiate&&_2a8.instantiateChildren);
return _2a7.instantiate;
}));
});
}else{
d.resolve(list);
}
return d.promise;
},_require:function(_2aa,_2ab){
var hash=_252("{"+_2aa.innerHTML+"}"),vars=[],mids=[],d=new _24f();
var _2ac=(_2ab&&_2ab.contextRequire)||_247;
for(var name in hash){
vars.push(name);
mids.push(hash[name]);
}
_2ac(mids,function(){
for(var i=0;i<vars.length;i++){
_248.setObject(vars[i],arguments[i]);
}
d.resolve(arguments);
});
return d.promise;
},_scanAmd:function(root,_2ad){
var _2ae=new _24f(),_2af=_2ae.promise;
_2ae.resolve(true);
var self=this;
_250("script[type='dojo/require']",root).forEach(function(node){
_2af=_2af.then(function(){
return self._require(node,_2ad);
});
node.parentNode.removeChild(node);
});
return _2af;
},parse:function(_2b0,_2b1){
var root;
if(!_2b1&&_2b0&&_2b0.rootNode){
_2b1=_2b0;
root=_2b1.rootNode;
}else{
if(_2b0&&_248.isObject(_2b0)&&!("nodeType" in _2b0)){
_2b1=_2b0;
}else{
root=_2b0;
}
}
root=root?dom.byId(root):_24b.body();
_2b1=_2b1||{};
var _2b2=_2b1.template?{template:true}:{},_2b3=[],self=this;
var p=this._scanAmd(root,_2b1).then(function(){
return self.scan(root,_2b1);
}).then(function(_2b4){
return self._instantiate(_2b4,_2b2,_2b1,true);
}).then(function(_2b5){
return _2b3=_2b3.concat(_2b5);
}).otherwise(function(e){
console.error("dojo/parser::parse() error",e);
throw e;
});
_248.mixin(_2b3,p);
return _2b3;
}};
if(1){
dojo.parser=_25b;
}
if(_24a.parseOnLoad){
_251(100,_25b,"parse");
}
return _25b;
});
},"dijit/form/ToggleButton":function(){
define(["dojo/_base/declare","dojo/_base/kernel","./Button","./_ToggleButtonMixin"],function(_2b6,_2b7,_2b8,_2b9){
return _2b6("dijit.form.ToggleButton",[_2b8,_2b9],{baseClass:"dijitToggleButton",setChecked:function(_2ba){
_2b7.deprecated("setChecked("+_2ba+") is deprecated. Use set('checked',"+_2ba+") instead.","","2.0");
this.set("checked",_2ba);
}});
});
},"dojo/date/stamp":function(){
define(["../_base/lang","../_base/array"],function(lang,_2bb){
var _2bc={};
lang.setObject("dojo.date.stamp",_2bc);
_2bc.fromISOString=function(_2bd,_2be){
if(!_2bc._isoRegExp){
_2bc._isoRegExp=/^(?:(\d{4})(?:-(\d{2})(?:-(\d{2}))?)?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(.\d+)?)?((?:[+-](\d{2}):(\d{2}))|Z)?)?$/;
}
var _2bf=_2bc._isoRegExp.exec(_2bd),_2c0=null;
if(_2bf){
_2bf.shift();
if(_2bf[1]){
_2bf[1]--;
}
if(_2bf[6]){
_2bf[6]*=1000;
}
if(_2be){
_2be=new Date(_2be);
_2bb.forEach(_2bb.map(["FullYear","Month","Date","Hours","Minutes","Seconds","Milliseconds"],function(prop){
return _2be["get"+prop]();
}),function(_2c1,_2c2){
_2bf[_2c2]=_2bf[_2c2]||_2c1;
});
}
_2c0=new Date(_2bf[0]||1970,_2bf[1]||0,_2bf[2]||1,_2bf[3]||0,_2bf[4]||0,_2bf[5]||0,_2bf[6]||0);
if(_2bf[0]<100){
_2c0.setFullYear(_2bf[0]||1970);
}
var _2c3=0,_2c4=_2bf[7]&&_2bf[7].charAt(0);
if(_2c4!="Z"){
_2c3=((_2bf[8]||0)*60)+(Number(_2bf[9])||0);
if(_2c4!="-"){
_2c3*=-1;
}
}
if(_2c4){
_2c3-=_2c0.getTimezoneOffset();
}
if(_2c3){
_2c0.setTime(_2c0.getTime()+_2c3*60000);
}
}
return _2c0;
};
_2bc.toISOString=function(_2c5,_2c6){
var _2c7=function(n){
return (n<10)?"0"+n:n;
};
_2c6=_2c6||{};
var _2c8=[],_2c9=_2c6.zulu?"getUTC":"get",date="";
if(_2c6.selector!="time"){
var year=_2c5[_2c9+"FullYear"]();
date=["0000".substr((year+"").length)+year,_2c7(_2c5[_2c9+"Month"]()+1),_2c7(_2c5[_2c9+"Date"]())].join("-");
}
_2c8.push(date);
if(_2c6.selector!="date"){
var time=[_2c7(_2c5[_2c9+"Hours"]()),_2c7(_2c5[_2c9+"Minutes"]()),_2c7(_2c5[_2c9+"Seconds"]())].join(":");
var _2ca=_2c5[_2c9+"Milliseconds"]();
if(_2c6.milliseconds){
time+="."+(_2ca<100?"0":"")+_2c7(_2ca);
}
if(_2c6.zulu){
time+="Z";
}else{
if(_2c6.selector!="time"){
var _2cb=_2c5.getTimezoneOffset();
var _2cc=Math.abs(_2cb);
time+=(_2cb>0?"-":"+")+_2c7(Math.floor(_2cc/60))+":"+_2c7(_2cc%60);
}
}
_2c8.push(time);
}
return _2c8.join("T");
};
return _2bc;
});
},"dijit/form/NumberSpinner":function(){
define(["dojo/_base/declare","dojo/keys","./_Spinner","./NumberTextBox"],function(_2cd,keys,_2ce,_2cf){
return _2cd("dijit.form.NumberSpinner",[_2ce,_2cf.Mixin],{baseClass:"dijitTextBox dijitSpinner dijitNumberTextBox",adjust:function(val,_2d0){
var tc=this.constraints,v=isNaN(val),_2d1=!isNaN(tc.max),_2d2=!isNaN(tc.min);
if(v&&_2d0!=0){
val=(_2d0>0)?_2d2?tc.min:_2d1?tc.max:0:_2d1?this.constraints.max:_2d2?tc.min:0;
}
var _2d3=val+_2d0;
if(v||isNaN(_2d3)){
return val;
}
if(_2d1&&(_2d3>tc.max)){
_2d3=tc.max;
}
if(_2d2&&(_2d3<tc.min)){
_2d3=tc.min;
}
return _2d3;
},_onKeyDown:function(e){
if(this.disabled||this.readOnly){
return;
}
if((e.keyCode==keys.HOME||e.keyCode==keys.END)&&!(e.ctrlKey||e.altKey||e.metaKey)&&typeof this.get("value")!="undefined"){
var _2d4=this.constraints[(e.keyCode==keys.HOME?"min":"max")];
if(typeof _2d4=="number"){
this._setValueAttr(_2d4,false);
}
e.stopPropagation();
e.preventDefault();
}
}});
});
},"dojo/Stateful":function(){
define(["./_base/declare","./_base/lang","./_base/array","./when"],function(_2d5,lang,_2d6,when){
return _2d5("dojo.Stateful",null,{_attrPairNames:{},_getAttrNames:function(name){
var apn=this._attrPairNames;
if(apn[name]){
return apn[name];
}
return (apn[name]={s:"_"+name+"Setter",g:"_"+name+"Getter"});
},postscript:function(_2d7){
if(_2d7){
this.set(_2d7);
}
},_get:function(name,_2d8){
return typeof this[_2d8.g]==="function"?this[_2d8.g]():this[name];
},get:function(name){
return this._get(name,this._getAttrNames(name));
},set:function(name,_2d9){
if(typeof name==="object"){
for(var x in name){
if(name.hasOwnProperty(x)&&x!="_watchCallbacks"){
this.set(x,name[x]);
}
}
return this;
}
var _2da=this._getAttrNames(name),_2db=this._get(name,_2da),_2dc=this[_2da.s],_2dd;
if(typeof _2dc==="function"){
_2dd=_2dc.apply(this,Array.prototype.slice.call(arguments,1));
}else{
this[name]=_2d9;
}
if(this._watchCallbacks){
var self=this;
when(_2dd,function(){
self._watchCallbacks(name,_2db,_2d9);
});
}
return this;
},_changeAttrValue:function(name,_2de){
var _2df=this.get(name);
this[name]=_2de;
if(this._watchCallbacks){
this._watchCallbacks(name,_2df,_2de);
}
return this;
},watch:function(name,_2e0){
var _2e1=this._watchCallbacks;
if(!_2e1){
var self=this;
_2e1=this._watchCallbacks=function(name,_2e2,_2e3,_2e4){
var _2e5=function(_2e6){
if(_2e6){
_2e6=_2e6.slice();
for(var i=0,l=_2e6.length;i<l;i++){
_2e6[i].call(self,name,_2e2,_2e3);
}
}
};
_2e5(_2e1["_"+name]);
if(!_2e4){
_2e5(_2e1["*"]);
}
};
}
if(!_2e0&&typeof name==="function"){
_2e0=name;
name="*";
}else{
name="_"+name;
}
var _2e7=_2e1[name];
if(typeof _2e7!=="object"){
_2e7=_2e1[name]=[];
}
_2e7.push(_2e0);
var _2e8={};
_2e8.unwatch=_2e8.remove=function(){
var _2e9=_2d6.indexOf(_2e7,_2e0);
if(_2e9>-1){
_2e7.splice(_2e9,1);
}
};
return _2e8;
}});
});
},"dijit/form/DateTextBox":function(){
define(["dojo/_base/declare","../Calendar","./_DateTimeTextBox"],function(_2ea,_2eb,_2ec){
return _2ea("dijit.form.DateTextBox",_2ec,{baseClass:"dijitTextBox dijitComboBox dijitDateTextBox",popupClass:_2eb,_selector:"date",maxHeight:Infinity,value:new Date("")});
});
},"dijit/layout/AccordionContainer":function(){
define(["require","dojo/_base/array","dojo/_base/declare","dojo/_base/fx","dojo/dom","dojo/dom-attr","dojo/dom-class","dojo/dom-construct","dojo/dom-geometry","dojo/keys","dojo/_base/lang","dojo/sniff","dojo/topic","../focus","../_base/manager","dojo/ready","../_Widget","../_Container","../_TemplatedMixin","../_CssStateMixin","./StackContainer","./ContentPane","dojo/text!./templates/AccordionButton.html","../a11yclick"],function(_2ed,_2ee,_2ef,fx,dom,_2f0,_2f1,_2f2,_2f3,keys,lang,has,_2f4,_2f5,_2f6,_2f7,_2f8,_2f9,_2fa,_2fb,_2fc,_2fd,_2fe){
var _2ff=_2ef("dijit.layout._AccordionButton",[_2f8,_2fa,_2fb],{templateString:_2fe,label:"",_setLabelAttr:{node:"titleTextNode",type:"innerHTML"},title:"",_setTitleAttr:{node:"titleTextNode",type:"attribute",attribute:"title"},iconClassAttr:"",_setIconClassAttr:{node:"iconNode",type:"class"},baseClass:"dijitAccordionTitle",getParent:function(){
return this.parent;
},buildRendering:function(){
this.inherited(arguments);
var _300=this.id.replace(" ","_");
_2f0.set(this.titleTextNode,"id",_300+"_title");
this.focusNode.setAttribute("aria-labelledby",_2f0.get(this.titleTextNode,"id"));
dom.setSelectable(this.domNode,false);
},getTitleHeight:function(){
return _2f3.getMarginSize(this.domNode).h;
},_onTitleClick:function(){
var _301=this.getParent();
_301.selectChild(this.contentWidget,true);
_2f5.focus(this.focusNode);
},_onTitleKeyDown:function(evt){
return this.getParent()._onKeyDown(evt,this.contentWidget);
},_setSelectedAttr:function(_302){
this._set("selected",_302);
this.focusNode.setAttribute("aria-expanded",_302?"true":"false");
this.focusNode.setAttribute("aria-selected",_302?"true":"false");
this.focusNode.setAttribute("tabIndex",_302?"0":"-1");
}});
if(has("dojo-bidi")){
_2ff.extend({_setLabelAttr:function(_303){
this._set("label",_303);
_2f0.set(this.titleTextNode,"innerHTML",_303);
this.applyTextDir(this.titleTextNode);
},_setTitleAttr:function(_304){
this._set("title",_304);
_2f0.set(this.titleTextNode,"title",_304);
this.applyTextDir(this.titleTextNode);
}});
}
var _305=_2ef("dijit.layout._AccordionInnerContainer"+(has("dojo-bidi")?"_NoBidi":""),[_2f8,_2fb],{baseClass:"dijitAccordionInnerContainer",isLayoutContainer:true,buildRendering:function(){
this.domNode=_2f2.place("<div class='"+this.baseClass+"' role='presentation'>",this.contentWidget.domNode,"after");
var _306=this.contentWidget,cls=lang.isString(this.buttonWidget)?lang.getObject(this.buttonWidget):this.buttonWidget;
this.button=_306._buttonWidget=(new cls({contentWidget:_306,label:_306.title,title:_306.tooltip,dir:_306.dir,lang:_306.lang,textDir:_306.textDir||this.textDir,iconClass:_306.iconClass,id:_306.id+"_button",parent:this.parent})).placeAt(this.domNode);
this.containerNode=_2f2.place("<div class='dijitAccordionChildWrapper' role='tabpanel' style='display:none'>",this.domNode);
this.containerNode.setAttribute("aria-labelledby",this.button.id);
_2f2.place(this.contentWidget.domNode,this.containerNode);
},postCreate:function(){
this.inherited(arguments);
var _307=this.button,cw=this.contentWidget;
this._contentWidgetWatches=[cw.watch("title",lang.hitch(this,function(name,_308,_309){
_307.set("label",_309);
})),cw.watch("tooltip",lang.hitch(this,function(name,_30a,_30b){
_307.set("title",_30b);
})),cw.watch("iconClass",lang.hitch(this,function(name,_30c,_30d){
_307.set("iconClass",_30d);
}))];
},_setSelectedAttr:function(_30e){
this._set("selected",_30e);
this.button.set("selected",_30e);
if(_30e){
var cw=this.contentWidget;
if(cw.onSelected){
cw.onSelected();
}
}
},startup:function(){
this.contentWidget.startup();
},destroy:function(){
this.button.destroyRecursive();
_2ee.forEach(this._contentWidgetWatches||[],function(w){
w.unwatch();
});
delete this.contentWidget._buttonWidget;
delete this.contentWidget._wrapperWidget;
this.inherited(arguments);
},destroyDescendants:function(_30f){
this.contentWidget.destroyRecursive(_30f);
}});
if(has("dojo-bidi")){
_305=_2ef("dijit.layout._AccordionInnerContainer",_305,{postCreate:function(){
this.inherited(arguments);
var _310=this.button;
this._contentWidgetWatches.push(this.contentWidget.watch("textDir",function(name,_311,_312){
_310.set("textDir",_312);
}));
}});
}
var _313=_2ef("dijit.layout.AccordionContainer",_2fc,{duration:_2f6.defaultDuration,buttonWidget:_2ff,baseClass:"dijitAccordionContainer",buildRendering:function(){
this.inherited(arguments);
this.domNode.style.overflow="hidden";
this.domNode.setAttribute("role","tablist");
},startup:function(){
if(this._started){
return;
}
this.inherited(arguments);
if(this.selectedChildWidget){
this.selectedChildWidget._wrapperWidget.set("selected",true);
}
},layout:function(){
var _314=this.selectedChildWidget;
if(!_314){
return;
}
var _315=_314._wrapperWidget.domNode,_316=_2f3.getMarginExtents(_315),_317=_2f3.getPadBorderExtents(_315),_318=_314._wrapperWidget.containerNode,_319=_2f3.getMarginExtents(_318),_31a=_2f3.getPadBorderExtents(_318),_31b=this._contentBox;
var _31c=0;
_2ee.forEach(this.getChildren(),function(_31d){
if(_31d!=_314){
_31c+=_2f3.getMarginSize(_31d._wrapperWidget.domNode).h;
}
});
this._verticalSpace=_31b.h-_31c-_316.h-_317.h-_319.h-_31a.h-_314._buttonWidget.getTitleHeight();
this._containerContentBox={h:this._verticalSpace,w:this._contentBox.w-_316.w-_317.w-_319.w-_31a.w};
if(_314){
_314.resize(this._containerContentBox);
}
},_setupChild:function(_31e){
_31e._wrapperWidget=_305({contentWidget:_31e,buttonWidget:this.buttonWidget,id:_31e.id+"_wrapper",dir:_31e.dir,lang:_31e.lang,textDir:_31e.textDir||this.textDir,parent:this});
this.inherited(arguments);
_2f2.place(_31e.domNode,_31e._wrapper,"replace");
},removeChild:function(_31f){
if(_31f._wrapperWidget){
_2f2.place(_31f.domNode,_31f._wrapperWidget.domNode,"after");
_31f._wrapperWidget.destroy();
delete _31f._wrapperWidget;
}
_2f1.remove(_31f.domNode,"dijitHidden");
this.inherited(arguments);
},getChildren:function(){
return _2ee.map(this.inherited(arguments),function(_320){
return _320.declaredClass=="dijit.layout._AccordionInnerContainer"?_320.contentWidget:_320;
},this);
},destroy:function(){
if(this._animation){
this._animation.stop();
}
_2ee.forEach(this.getChildren(),function(_321){
if(_321._wrapperWidget){
_321._wrapperWidget.destroy();
}else{
_321.destroyRecursive();
}
});
this.inherited(arguments);
},_showChild:function(_322){
_322._wrapperWidget.containerNode.style.display="block";
return this.inherited(arguments);
},_hideChild:function(_323){
_323._wrapperWidget.containerNode.style.display="none";
this.inherited(arguments);
},_transition:function(_324,_325,_326){
if(has("ie")<8){
_326=false;
}
if(this._animation){
this._animation.stop(true);
delete this._animation;
}
var self=this;
if(_324){
_324._wrapperWidget.set("selected",true);
var d=this._showChild(_324);
if(this.doLayout&&_324.resize){
_324.resize(this._containerContentBox);
}
}
if(_325){
_325._wrapperWidget.set("selected",false);
if(!_326){
this._hideChild(_325);
}
}
if(_326){
var _327=_324._wrapperWidget.containerNode,_328=_325._wrapperWidget.containerNode;
var _329=_324._wrapperWidget.containerNode,_32a=_2f3.getMarginExtents(_329),_32b=_2f3.getPadBorderExtents(_329),_32c=_32a.h+_32b.h;
_328.style.height=(self._verticalSpace-_32c)+"px";
this._animation=new fx.Animation({node:_327,duration:this.duration,curve:[1,this._verticalSpace-_32c-1],onAnimate:function(_32d){
_32d=Math.floor(_32d);
_327.style.height=_32d+"px";
_328.style.height=(self._verticalSpace-_32c-_32d)+"px";
},onEnd:function(){
delete self._animation;
_327.style.height="auto";
_325._wrapperWidget.containerNode.style.display="none";
_328.style.height="auto";
self._hideChild(_325);
}});
this._animation.onStop=this._animation.onEnd;
this._animation.play();
}
return d;
},_onKeyDown:function(e,_32e){
if(this.disabled||e.altKey||!(_32e||e.ctrlKey)){
return;
}
var c=e.keyCode;
if((_32e&&(c==keys.LEFT_ARROW||c==keys.UP_ARROW))||(e.ctrlKey&&c==keys.PAGE_UP)){
this._adjacent(false)._buttonWidget._onTitleClick();
e.stopPropagation();
e.preventDefault();
}else{
if((_32e&&(c==keys.RIGHT_ARROW||c==keys.DOWN_ARROW))||(e.ctrlKey&&(c==keys.PAGE_DOWN||c==keys.TAB))){
this._adjacent(true)._buttonWidget._onTitleClick();
e.stopPropagation();
e.preventDefault();
}
}
}});
if(has("dijit-legacy-requires")){
_2f7(0,function(){
var _32f=["dijit/layout/AccordionPane"];
_2ed(_32f);
});
}
_313._InnerContainer=_305;
_313._Button=_2ff;
return _313;
});
},"dijit/form/ComboButton":function(){
define(["dojo/_base/declare","dojo/keys","../focus","./DropDownButton","dojo/text!./templates/ComboButton.html"],function(_330,keys,_331,_332,_333){
return _330("dijit.form.ComboButton",_332,{templateString:_333,_setIdAttr:"",_setTabIndexAttr:["focusNode","titleNode"],_setTitleAttr:"titleNode",optionsTitle:"",baseClass:"dijitComboButton",cssStateNodes:{"buttonNode":"dijitButtonNode","titleNode":"dijitButtonContents","_popupStateNode":"dijitDownArrowButton"},_focusedNode:null,_onButtonKeyDown:function(evt){
if(evt.keyCode==keys[this.isLeftToRight()?"RIGHT_ARROW":"LEFT_ARROW"]){
_331.focus(this._popupStateNode);
evt.stopPropagation();
evt.preventDefault();
}
},_onArrowKeyDown:function(evt){
if(evt.keyCode==keys[this.isLeftToRight()?"LEFT_ARROW":"RIGHT_ARROW"]){
_331.focus(this.titleNode);
evt.stopPropagation();
evt.preventDefault();
}
},focus:function(_334){
if(!this.disabled){
_331.focus(_334=="start"?this.titleNode:this._popupStateNode);
}
}});
});
},"dijit/form/_AutoCompleterMixin":function(){
define(["dojo/aspect","dojo/_base/declare","dojo/dom-attr","dojo/keys","dojo/_base/lang","dojo/query","dojo/regexp","dojo/sniff","./DataList","./_TextBoxMixin","./_SearchMixin"],function(_335,_336,_337,keys,lang,_338,_339,has,_33a,_33b,_33c){
var _33d=_336("dijit.form._AutoCompleterMixin",_33c,{item:null,autoComplete:true,highlightMatch:"first",labelAttr:"",labelType:"text",maxHeight:-1,_stopClickEvents:false,_getCaretPos:function(_33e){
var pos=0;
if(typeof (_33e.selectionStart)=="number"){
pos=_33e.selectionStart;
}else{
if(has("ie")){
var tr=_33e.ownerDocument.selection.createRange().duplicate();
var ntr=_33e.createTextRange();
tr.move("character",0);
ntr.move("character",0);
try{
ntr.setEndPoint("EndToEnd",tr);
pos=String(ntr.text).replace(/\r/g,"").length;
}
catch(e){
}
}
}
return pos;
},_setCaretPos:function(_33f,_340){
_340=parseInt(_340);
_33b.selectInputText(_33f,_340,_340);
},_setDisabledAttr:function(_341){
this.inherited(arguments);
this.domNode.setAttribute("aria-disabled",_341?"true":"false");
},_onKey:function(evt){
if(evt.charCode>=32){
return;
}
var key=evt.charCode||evt.keyCode;
if(key==keys.ALT||key==keys.CTRL||key==keys.META||key==keys.SHIFT){
return;
}
var pw=this.dropDown;
var _342=null;
this._abortQuery();
this.inherited(arguments);
if(evt.altKey||evt.ctrlKey||evt.metaKey){
return;
}
if(this._opened){
_342=pw.getHighlightedOption();
}
switch(key){
case keys.PAGE_DOWN:
case keys.DOWN_ARROW:
case keys.PAGE_UP:
case keys.UP_ARROW:
if(this._opened){
this._announceOption(_342);
}
evt.stopPropagation();
evt.preventDefault();
break;
case keys.ENTER:
if(_342){
if(_342==pw.nextButton){
this._nextSearch(1);
evt.stopPropagation();
evt.preventDefault();
break;
}else{
if(_342==pw.previousButton){
this._nextSearch(-1);
evt.stopPropagation();
evt.preventDefault();
break;
}
}
evt.stopPropagation();
evt.preventDefault();
}else{
this._setBlurValue();
this._setCaretPos(this.focusNode,this.focusNode.value.length);
}
case keys.TAB:
var _343=this.get("displayedValue");
if(pw&&(_343==pw._messages["previousMessage"]||_343==pw._messages["nextMessage"])){
break;
}
if(_342){
this._selectOption(_342);
}
case keys.ESCAPE:
if(this._opened){
this._lastQuery=null;
this.closeDropDown();
}
break;
}
},_autoCompleteText:function(text){
var fn=this.focusNode;
_33b.selectInputText(fn,fn.value.length);
var _344=this.ignoreCase?"toLowerCase":"substr";
if(text[_344](0).indexOf(this.focusNode.value[_344](0))==0){
var cpos=this.autoComplete?this._getCaretPos(fn):fn.value.length;
if((cpos+1)>fn.value.length){
fn.value=text;
_33b.selectInputText(fn,cpos);
}
}else{
fn.value=text;
_33b.selectInputText(fn);
}
},_openResultList:function(_345,_346,_347){
var _348=this.dropDown.getHighlightedOption();
this.dropDown.clearResultList();
if(!_345.length&&_347.start==0){
this.closeDropDown();
return;
}
this._nextSearch=this.dropDown.onPage=lang.hitch(this,function(_349){
_345.nextPage(_349!==-1);
this.focus();
});
this.dropDown.createOptions(_345,_347,lang.hitch(this,"_getMenuLabelFromItem"));
this._showResultList();
if("direction" in _347){
if(_347.direction){
this.dropDown.highlightFirstOption();
}else{
if(!_347.direction){
this.dropDown.highlightLastOption();
}
}
if(_348){
this._announceOption(this.dropDown.getHighlightedOption());
}
}else{
if(this.autoComplete&&!this._prev_key_backspace&&!/^[*]+$/.test(_346[this.searchAttr].toString())){
this._announceOption(this.dropDown.containerNode.firstChild.nextSibling);
}
}
},_showResultList:function(){
this.closeDropDown(true);
this.openDropDown();
this.domNode.setAttribute("aria-expanded","true");
},loadDropDown:function(){
this._startSearchAll();
},isLoaded:function(){
return false;
},closeDropDown:function(){
this._abortQuery();
if(this._opened){
this.inherited(arguments);
this.domNode.setAttribute("aria-expanded","false");
}
},_setBlurValue:function(){
var _34a=this.get("displayedValue");
var pw=this.dropDown;
if(pw&&(_34a==pw._messages["previousMessage"]||_34a==pw._messages["nextMessage"])){
this._setValueAttr(this._lastValueReported,true);
}else{
if(typeof this.item=="undefined"){
this.item=null;
this.set("displayedValue",_34a);
}else{
if(this.value!=this._lastValueReported){
this._handleOnChange(this.value,true);
}
this._refreshState();
}
}
this.focusNode.removeAttribute("aria-activedescendant");
},_setItemAttr:function(item,_34b,_34c){
var _34d="";
if(item){
if(!_34c){
_34c=this.store._oldAPI?this.store.getValue(item,this.searchAttr):item[this.searchAttr];
}
_34d=this._getValueField()!=this.searchAttr?this.store.getIdentity(item):_34c;
}
this.set("value",_34d,_34b,_34c,item);
},_announceOption:function(node){
if(!node){
return;
}
var _34e;
if(node==this.dropDown.nextButton||node==this.dropDown.previousButton){
_34e=node.innerHTML;
this.item=undefined;
this.value="";
}else{
var item=this.dropDown.items[node.getAttribute("item")];
_34e=(this.store._oldAPI?this.store.getValue(item,this.searchAttr):item[this.searchAttr]).toString();
this.set("item",item,false,_34e);
}
this.focusNode.value=this.focusNode.value.substring(0,this._lastInput.length);
this.focusNode.setAttribute("aria-activedescendant",_337.get(node,"id"));
this._autoCompleteText(_34e);
},_selectOption:function(_34f){
this.closeDropDown();
if(_34f){
this._announceOption(_34f);
}
this._setCaretPos(this.focusNode,this.focusNode.value.length);
this._handleOnChange(this.value,true);
this.focusNode.removeAttribute("aria-activedescendant");
},_startSearchAll:function(){
this._startSearch("");
},_startSearchFromInput:function(){
this.item=undefined;
this.inherited(arguments);
},_startSearch:function(key){
if(!this.dropDown){
var _350=this.id+"_popup",_351=lang.isString(this.dropDownClass)?lang.getObject(this.dropDownClass,false):this.dropDownClass;
this.dropDown=new _351({onChange:lang.hitch(this,this._selectOption),id:_350,dir:this.dir,textDir:this.textDir});
}
this._lastInput=key;
this.inherited(arguments);
},_getValueField:function(){
return this.searchAttr;
},postMixInProperties:function(){
this.inherited(arguments);
if(!this.store){
var _352=this.srcNodeRef;
this.store=new _33a({},_352);
if(!("value" in this.params)){
var item=(this.item=this.store.fetchSelectedItem());
if(item){
var _353=this._getValueField();
this.value=this.store._oldAPI?this.store.getValue(item,_353):item[_353];
}
}
}
},postCreate:function(){
var _354=_338("label[for=\""+this.id+"\"]");
if(_354.length){
if(!_354[0].id){
_354[0].id=this.id+"_label";
}
this.domNode.setAttribute("aria-labelledby",_354[0].id);
}
this.inherited(arguments);
_335.after(this,"onSearch",lang.hitch(this,"_openResultList"),true);
},_getMenuLabelFromItem:function(item){
var _355=this.labelFunc(item,this.store),_356=this.labelType;
if(this.highlightMatch!="none"&&this.labelType=="text"&&this._lastInput){
_355=this.doHighlight(_355,this._lastInput);
_356="html";
}
return {html:_356=="html",label:_355};
},doHighlight:function(_357,find){
var _358=(this.ignoreCase?"i":"")+(this.highlightMatch=="all"?"g":""),i=this.queryExpr.indexOf("${0}");
find=_339.escapeString(find);
return this._escapeHtml(_357.replace(new RegExp((i==0?"^":"")+"("+find+")"+(i==(this.queryExpr.length-4)?"$":""),_358),"\uffff$1\uffff")).replace(/\uFFFF([^\uFFFF]+)\uFFFF/g,"<span class=\"dijitComboBoxHighlightMatch\">$1</span>");
},_escapeHtml:function(str){
str=String(str).replace(/&/gm,"&amp;").replace(/</gm,"&lt;").replace(/>/gm,"&gt;").replace(/"/gm,"&quot;");
return str;
},reset:function(){
this.item=null;
this.inherited(arguments);
},labelFunc:function(item,_359){
return (_359._oldAPI?_359.getValue(item,this.labelAttr||this.searchAttr):item[this.labelAttr||this.searchAttr]).toString();
},_setValueAttr:function(_35a,_35b,_35c,item){
this._set("item",item||null);
if(_35a==null){
_35a="";
}
this.inherited(arguments);
}});
if(has("dojo-bidi")){
_33d.extend({_setTextDirAttr:function(_35d){
this.inherited(arguments);
if(this.dropDown){
this.dropDown._set("textDir",_35d);
}
}});
}
return _33d;
});
},"dijit/form/MappedTextBox":function(){
define(["dojo/_base/declare","dojo/sniff","dojo/dom-construct","./ValidationTextBox"],function(_35e,has,_35f,_360){
return _35e("dijit.form.MappedTextBox",_360,{postMixInProperties:function(){
this.inherited(arguments);
this.nameAttrSetting="";
},_setNameAttr:"valueNode",serialize:function(val){
return val.toString?val.toString():"";
},toString:function(){
var val=this.filter(this.get("value"));
return val!=null?(typeof val=="string"?val:this.serialize(val,this.constraints)):"";
},validate:function(){
this.valueNode.value=this.toString();
return this.inherited(arguments);
},buildRendering:function(){
this.inherited(arguments);
this.valueNode=_35f.place("<input type='hidden'"+((this.name&&!has("msapp"))?" name=\""+this.name.replace(/"/g,"&quot;")+"\"":"")+"/>",this.textbox,"after");
},reset:function(){
this.valueNode.value="";
this.inherited(arguments);
}});
});
},"dijit/form/ComboBoxMixin":function(){
define(["dojo/_base/declare","dojo/Deferred","dojo/_base/kernel","dojo/_base/lang","dojo/store/util/QueryResults","./_AutoCompleterMixin","./_ComboBoxMenu","../_HasDropDown","dojo/text!./templates/DropDownBox.html"],function(_361,_362,_363,lang,_364,_365,_366,_367,_368){
return _361("dijit.form.ComboBoxMixin",[_367,_365],{dropDownClass:_366,hasDownArrow:true,templateString:_368,baseClass:"dijitTextBox dijitComboBox",cssStateNodes:{"_buttonNode":"dijitDownArrowButton"},_setHasDownArrowAttr:function(val){
this._set("hasDownArrow",val);
this._buttonNode.style.display=val?"":"none";
},_showResultList:function(){
this.displayMessage("");
this.inherited(arguments);
},_setStoreAttr:function(_369){
if(!_369.get){
lang.mixin(_369,{_oldAPI:true,get:function(id){
var _36a=new _362();
this.fetchItemByIdentity({identity:id,onItem:function(_36b){
_36a.resolve(_36b);
},onError:function(_36c){
_36a.reject(_36c);
}});
return _36a.promise;
},query:function(_36d,_36e){
var _36f=new _362(function(){
_370.abort&&_370.abort();
});
_36f.total=new _362();
var _370=this.fetch(lang.mixin({query:_36d,onBegin:function(_371){
_36f.total.resolve(_371);
},onComplete:function(_372){
_36f.resolve(_372);
},onError:function(_373){
_36f.reject(_373);
}},_36e));
return _364(_36f);
}});
}
this._set("store",_369);
},postMixInProperties:function(){
var _374=this.params.store||this.store;
if(_374){
this._setStoreAttr(_374);
}
this.inherited(arguments);
if(!this.params.store&&!this.store._oldAPI){
var _375=this.declaredClass;
lang.mixin(this.store,{getValue:function(item,attr){
_363.deprecated(_375+".store.getValue(item, attr) is deprecated for builtin store.  Use item.attr directly","","2.0");
return item[attr];
},getLabel:function(item){
_363.deprecated(_375+".store.getLabel(item) is deprecated for builtin store.  Use item.label directly","","2.0");
return item.name;
},fetch:function(args){
_363.deprecated(_375+".store.fetch() is deprecated for builtin store.","Use store.query()","2.0");
var shim=["dojo/data/ObjectStore"];
require(shim,lang.hitch(this,function(_376){
new _376({objectStore:this}).fetch(args);
}));
}});
}
}});
});
},"dijit/form/_TextBoxMixin":function(){
define(["dojo/_base/array","dojo/_base/declare","dojo/dom","dojo/has","dojo/keys","dojo/_base/lang","dojo/on","../main"],function(_377,_378,dom,has,keys,lang,on,_379){
var _37a=_378("dijit.form._TextBoxMixin"+(has("dojo-bidi")?"_NoBidi":""),null,{trim:false,uppercase:false,lowercase:false,propercase:false,maxLength:"",selectOnClick:false,placeHolder:"",_getValueAttr:function(){
return this.parse(this.get("displayedValue"),this.constraints);
},_setValueAttr:function(_37b,_37c,_37d){
var _37e;
if(_37b!==undefined){
_37e=this.filter(_37b);
if(typeof _37d!="string"){
if(_37e!==null&&((typeof _37e!="number")||!isNaN(_37e))){
_37d=this.filter(this.format(_37e,this.constraints));
}else{
_37d="";
}
}
}
if(_37d!=null&&((typeof _37d)!="number"||!isNaN(_37d))&&this.textbox.value!=_37d){
this.textbox.value=_37d;
this._set("displayedValue",this.get("displayedValue"));
}
this.inherited(arguments,[_37e,_37c]);
},displayedValue:"",_getDisplayedValueAttr:function(){
return this.filter(this.textbox.value);
},_setDisplayedValueAttr:function(_37f){
if(_37f==null){
_37f="";
}else{
if(typeof _37f!="string"){
_37f=String(_37f);
}
}
this.textbox.value=_37f;
this._setValueAttr(this.get("value"),undefined);
this._set("displayedValue",this.get("displayedValue"));
},format:function(_380){
return _380==null?"":(_380.toString?_380.toString():_380);
},parse:function(_381){
return _381;
},_refreshState:function(){
},onInput:function(){
},__skipInputEvent:false,_onInput:function(evt){
this._processInput(evt);
if(this.intermediateChanges){
this.defer(function(){
this._handleOnChange(this.get("value"),false);
});
}
},_processInput:function(evt){
this._refreshState();
this._set("displayedValue",this.get("displayedValue"));
},postCreate:function(){
this.textbox.setAttribute("value",this.textbox.value);
this.inherited(arguments);
var _382=function(e){
var _383;
if(e.type=="keydown"){
_383=e.keyCode;
switch(_383){
case keys.SHIFT:
case keys.ALT:
case keys.CTRL:
case keys.META:
case keys.CAPS_LOCK:
case keys.NUM_LOCK:
case keys.SCROLL_LOCK:
return;
}
if(!e.ctrlKey&&!e.metaKey&&!e.altKey){
switch(_383){
case keys.NUMPAD_0:
case keys.NUMPAD_1:
case keys.NUMPAD_2:
case keys.NUMPAD_3:
case keys.NUMPAD_4:
case keys.NUMPAD_5:
case keys.NUMPAD_6:
case keys.NUMPAD_7:
case keys.NUMPAD_8:
case keys.NUMPAD_9:
case keys.NUMPAD_MULTIPLY:
case keys.NUMPAD_PLUS:
case keys.NUMPAD_ENTER:
case keys.NUMPAD_MINUS:
case keys.NUMPAD_PERIOD:
case keys.NUMPAD_DIVIDE:
return;
}
if((_383>=65&&_383<=90)||(_383>=48&&_383<=57)||_383==keys.SPACE){
return;
}
var _384=false;
for(var i in keys){
if(keys[i]===e.keyCode){
_384=true;
break;
}
}
if(!_384){
return;
}
}
}
_383=e.charCode>=32?String.fromCharCode(e.charCode):e.charCode;
if(!_383){
_383=(e.keyCode>=65&&e.keyCode<=90)||(e.keyCode>=48&&e.keyCode<=57)||e.keyCode==keys.SPACE?String.fromCharCode(e.keyCode):e.keyCode;
}
if(!_383){
_383=229;
}
if(e.type=="keypress"){
if(typeof _383!="string"){
return;
}
if((_383>="a"&&_383<="z")||(_383>="A"&&_383<="Z")||(_383>="0"&&_383<="9")||(_383===" ")){
if(e.ctrlKey||e.metaKey||e.altKey){
return;
}
}
}
if(e.type=="input"){
if(this.__skipInputEvent){
this.__skipInputEvent=false;
return;
}
}else{
this.__skipInputEvent=true;
}
var faux={faux:true},attr;
for(attr in e){
if(attr!="layerX"&&attr!="layerY"){
var v=e[attr];
if(typeof v!="function"&&typeof v!="undefined"){
faux[attr]=v;
}
}
}
lang.mixin(faux,{charOrCode:_383,_wasConsumed:false,preventDefault:function(){
faux._wasConsumed=true;
e.preventDefault();
},stopPropagation:function(){
e.stopPropagation();
}});
if(this.onInput(faux)===false){
faux.preventDefault();
faux.stopPropagation();
}
if(faux._wasConsumed){
return;
}
this.defer(function(){
this._onInput(faux);
});
if(e.type=="keypress"){
e.stopPropagation();
}
};
this.own(on(this.textbox,"keydown, keypress, paste, cut, input, compositionend",lang.hitch(this,_382)));
},_blankValue:"",filter:function(val){
if(val===null){
return this._blankValue;
}
if(typeof val!="string"){
return val;
}
if(this.trim){
val=lang.trim(val);
}
if(this.uppercase){
val=val.toUpperCase();
}
if(this.lowercase){
val=val.toLowerCase();
}
if(this.propercase){
val=val.replace(/[^\s]+/g,function(word){
return word.substring(0,1).toUpperCase()+word.substring(1);
});
}
return val;
},_setBlurValue:function(){
this._setValueAttr(this.get("value"),true);
},_onBlur:function(e){
if(this.disabled){
return;
}
this._setBlurValue();
this.inherited(arguments);
},_isTextSelected:function(){
return this.textbox.selectionStart!=this.textbox.selectionEnd;
},_onFocus:function(by){
if(this.disabled||this.readOnly){
return;
}
if(this.selectOnClick&&by=="mouse"){
this._selectOnClickHandle=on.once(this.domNode,"mouseup, touchend",lang.hitch(this,function(evt){
if(!this._isTextSelected()){
_37a.selectInputText(this.textbox);
}
}));
this.own(this._selectOnClickHandle);
this.defer(function(){
if(this._selectOnClickHandle){
this._selectOnClickHandle.remove();
this._selectOnClickHandle=null;
}
},500);
}
this.inherited(arguments);
this._refreshState();
},reset:function(){
this.textbox.value="";
this.inherited(arguments);
}});
if(has("dojo-bidi")){
_37a=_378("dijit.form._TextBoxMixin",_37a,{_setValueAttr:function(){
this.inherited(arguments);
this.applyTextDir(this.focusNode);
},_setDisplayedValueAttr:function(){
this.inherited(arguments);
this.applyTextDir(this.focusNode);
},_onInput:function(){
this.applyTextDir(this.focusNode);
this.inherited(arguments);
}});
}
_37a._setSelectionRange=_379._setSelectionRange=function(_385,_386,stop){
if(_385.setSelectionRange){
_385.setSelectionRange(_386,stop);
}
};
_37a.selectInputText=_379.selectInputText=function(_387,_388,stop){
_387=dom.byId(_387);
if(isNaN(_388)){
_388=0;
}
if(isNaN(stop)){
stop=_387.value?_387.value.length:0;
}
try{
_387.focus();
_37a._setSelectionRange(_387,_388,stop);
}
catch(e){
}
};
return _37a;
});
},"dijit/form/SimpleTextarea":function(){
define(["dojo/_base/declare","dojo/dom-class","dojo/sniff","./TextBox"],function(_389,_38a,has,_38b){
return _389("dijit.form.SimpleTextarea",_38b,{baseClass:"dijitTextBox dijitTextArea",rows:"3",cols:"20",templateString:"<textarea ${!nameAttrSetting} data-dojo-attach-point='focusNode,containerNode,textbox' autocomplete='off'></textarea>",postMixInProperties:function(){
if(!this.value&&this.srcNodeRef){
this.value=this.srcNodeRef.value;
}
this.inherited(arguments);
},buildRendering:function(){
this.inherited(arguments);
if(has("ie")&&this.cols){
_38a.add(this.textbox,"dijitTextAreaCols");
}
},filter:function(_38c){
if(_38c){
_38c=_38c.replace(/\r/g,"");
}
return this.inherited(arguments);
},_onInput:function(e){
if(this.maxLength){
var _38d=parseInt(this.maxLength);
var _38e=this.textbox.value.replace(/\r/g,"");
var _38f=_38e.length-_38d;
if(_38f>0){
var _390=this.textbox;
if(_390.selectionStart){
var pos=_390.selectionStart;
var cr=0;
if(has("opera")){
cr=(this.textbox.value.substring(0,pos).match(/\r/g)||[]).length;
}
this.textbox.value=_38e.substring(0,pos-_38f-cr)+_38e.substring(pos-cr);
_390.setSelectionRange(pos-_38f,pos-_38f);
}else{
if(this.ownerDocument.selection){
_390.focus();
var _391=this.ownerDocument.selection.createRange();
_391.moveStart("character",-_38f);
_391.text="";
_391.select();
}
}
}
}
this.inherited(arguments);
}});
});
},"dijit/_base/window":function(){
define(["dojo/window","../main"],function(_392,_393){
_393.getDocumentWindow=function(doc){
return _392.get(doc);
};
});
},"dijit/PopupMenuItem":function(){
define(["dojo/_base/declare","dojo/dom-style","dojo/_base/lang","dojo/query","./popup","./registry","./MenuItem","./hccss"],function(_394,_395,lang,_396,pm,_397,_398){
return _394("dijit.PopupMenuItem",_398,{_fillContent:function(){
if(this.srcNodeRef){
var _399=_396("*",this.srcNodeRef);
this.inherited(arguments,[_399[0]]);
this.dropDownContainer=this.srcNodeRef;
}
},_openPopup:function(_39a,_39b){
var _39c=this.popup;
pm.open(lang.delegate(_39a,{popup:this.popup,around:this.domNode}));
if(_39b&&_39c.focus){
_39c.focus();
}
},_closePopup:function(){
pm.close(this.popup);
this.popup.parentMenu=null;
},startup:function(){
if(this._started){
return;
}
this.inherited(arguments);
if(!this.popup){
var node=_396("[widgetId]",this.dropDownContainer)[0];
this.popup=_397.byNode(node);
}
this.ownerDocumentBody.appendChild(this.popup.domNode);
this.popup.domNode.setAttribute("aria-labelledby",this.containerNode.id);
this.popup.startup();
this.popup.domNode.style.display="none";
if(this.arrowWrapper){
_395.set(this.arrowWrapper,"visibility","");
}
this.focusNode.setAttribute("aria-haspopup","true");
},destroyDescendants:function(_39d){
if(this.popup){
if(!this.popup._destroyed){
this.popup.destroyRecursive(_39d);
}
delete this.popup;
}
this.inherited(arguments);
}});
});
},"dijit/_TimePicker":function(){
define(["dojo/_base/array","dojo/date","dojo/date/locale","dojo/date/stamp","dojo/_base/declare","dojo/dom-class","dojo/dom-construct","dojo/_base/kernel","dojo/keys","dojo/_base/lang","dojo/sniff","dojo/query","dojo/mouse","dojo/on","./_WidgetBase","./form/_ListMouseMixin"],function(_39e,_39f,_3a0,_3a1,_3a2,_3a3,_3a4,_3a5,keys,lang,has,_3a6,_3a7,on,_3a8,_3a9){
var _3aa=_3a2("dijit._TimePicker",[_3a8,_3a9],{baseClass:"dijitTimePicker",clickableIncrement:"T00:15:00",visibleIncrement:"T01:00:00",value:new Date(),_visibleIncrement:2,_clickableIncrement:1,_totalIncrements:10,constraints:{},serialize:_3a1.toISOString,buildRendering:function(){
this.inherited(arguments);
this.containerNode=this.domNode;
this.timeMenu=this.domNode;
},setValue:function(_3ab){
_3a5.deprecated("dijit._TimePicker:setValue() is deprecated.  Use set('value', ...) instead.","","2.0");
this.set("value",_3ab);
},_setValueAttr:function(date){
this._set("value",date);
this._showText();
},_setFilterStringAttr:function(val){
this._set("filterString",val);
this._showText();
},isDisabledDate:function(){
return false;
},_getFilteredNodes:function(_3ac,_3ad,_3ae,_3af){
var _3b0=[];
for(var i=0;i<this._maxIncrement;i++){
var n=this._createOption(i);
if(n){
_3b0.push(n);
}
}
return _3b0;
},_showText:function(){
var _3b1=_3a1.fromISOString;
this.domNode.innerHTML="";
this._clickableIncrementDate=_3b1(this.clickableIncrement);
this._visibleIncrementDate=_3b1(this.visibleIncrement);
var _3b2=function(date){
return date.getHours()*60*60+date.getMinutes()*60+date.getSeconds();
},_3b3=_3b2(this._clickableIncrementDate),_3b4=_3b2(this._visibleIncrementDate),time=(this.value||this.currentFocus).getTime();
this._refDate=_3b1("T00:00:00");
this._refDate.setFullYear(1970,0,1);
this._clickableIncrement=1;
this._visibleIncrement=_3b4/_3b3;
this._maxIncrement=(60*60*24)/_3b3;
var _3b5=this._getFilteredNodes();
_39e.forEach(_3b5,function(n){
this.domNode.appendChild(n);
},this);
if(!_3b5.length&&this.filterString){
this.filterString="";
this._showText();
}
},constructor:function(){
this.constraints={};
},postMixInProperties:function(){
this.inherited(arguments);
this._setConstraintsAttr(this.constraints);
},_setConstraintsAttr:function(_3b6){
for(var key in {clickableIncrement:1,visibleIncrement:1}){
if(key in _3b6){
this[key]=_3b6[key];
}
}
if(!_3b6.locale){
_3b6.locale=this.lang;
}
},_createOption:function(_3b7){
var date=new Date(this._refDate);
var _3b8=this._clickableIncrementDate;
date.setHours(date.getHours()+_3b8.getHours()*_3b7,date.getMinutes()+_3b8.getMinutes()*_3b7,date.getSeconds()+_3b8.getSeconds()*_3b7);
if(this.constraints.selector=="time"){
date.setFullYear(1970,0,1);
}
var _3b9=_3a0.format(date,this.constraints);
if(this.filterString&&_3b9.toLowerCase().indexOf(this.filterString)!==0){
return null;
}
var div=this.ownerDocument.createElement("div");
div.className=this.baseClass+"Item";
div.date=date;
div.idx=_3b7;
_3a4.create("div",{"class":this.baseClass+"ItemInner",innerHTML:_3b9},div);
if(_3b7%this._visibleIncrement<1&&_3b7%this._visibleIncrement>-1){
_3a3.add(div,this.baseClass+"Marker");
}else{
if(!(_3b7%this._clickableIncrement)){
_3a3.add(div,this.baseClass+"Tick");
}
}
if(this.isDisabledDate(date)){
_3a3.add(div,this.baseClass+"ItemDisabled");
}
if(this.value&&!_39f.compare(this.value,date,this.constraints.selector)){
div.selected=true;
_3a3.add(div,this.baseClass+"ItemSelected");
this._selectedDiv=div;
if(_3a3.contains(div,this.baseClass+"Marker")){
_3a3.add(div,this.baseClass+"MarkerSelected");
}else{
_3a3.add(div,this.baseClass+"TickSelected");
}
this._highlightOption(div,true);
}
return div;
},onOpen:function(){
this.inherited(arguments);
this.set("selected",this._selectedDiv);
},_onOptionSelected:function(tgt){
var _3ba=tgt.target.date||tgt.target.parentNode.date;
if(!_3ba||this.isDisabledDate(_3ba)){
return;
}
this._highlighted_option=null;
this.set("value",_3ba);
this.onChange(_3ba);
},onChange:function(){
},_highlightOption:function(node,_3bb){
if(!node){
return;
}
if(_3bb){
if(this._highlighted_option){
this._highlightOption(this._highlighted_option,false);
}
this._highlighted_option=node;
}else{
if(this._highlighted_option!==node){
return;
}else{
this._highlighted_option=null;
}
}
_3a3.toggle(node,this.baseClass+"ItemHover",_3bb);
if(_3a3.contains(node,this.baseClass+"Marker")){
_3a3.toggle(node,this.baseClass+"MarkerHover",_3bb);
}else{
_3a3.toggle(node,this.baseClass+"TickHover",_3bb);
}
},handleKey:function(e){
if(e.keyCode==keys.DOWN_ARROW){
this.selectNextNode();
e.stopPropagation();
e.preventDefault();
return false;
}else{
if(e.keyCode==keys.UP_ARROW){
this.selectPreviousNode();
e.stopPropagation();
e.preventDefault();
return false;
}else{
if(e.keyCode==keys.ENTER||e.keyCode===keys.TAB){
if(!this._keyboardSelected&&e.keyCode===keys.TAB){
return true;
}
if(this._highlighted_option){
this._onOptionSelected({target:this._highlighted_option});
}
return e.keyCode===keys.TAB;
}
}
}
return undefined;
},onHover:function(node){
this._highlightOption(node,true);
},onUnhover:function(node){
this._highlightOption(node,false);
},onSelect:function(node){
this._highlightOption(node,true);
},onDeselect:function(node){
this._highlightOption(node,false);
},onClick:function(node){
this._onOptionSelected({target:node});
}});
return _3aa;
});
},"dijit/_editor/plugins/TextColor":function(){
define(["require","dojo/colors","dojo/_base/declare","dojo/_base/lang","../_Plugin","../../form/DropDownButton"],function(_3bc,_3bd,_3be,lang,_3bf,_3c0){
var _3c1=_3be("dijit._editor.plugins.TextColor",_3bf,{buttonClass:_3c0,useDefaultCommand:false,_initButton:function(){
this.inherited(arguments);
var self=this;
this.button.loadDropDown=function(_3c2){
_3bc(["../../ColorPalette"],lang.hitch(this,function(_3c3){
this.dropDown=new _3c3({dir:self.editor.dir,ownerDocument:self.editor.ownerDocument,value:self.value,onChange:function(_3c4){
self.editor.execCommand(self.command,_3c4);
}});
_3c2();
}));
};
},updateState:function(){
var _3c5=this.editor;
var _3c6=this.command;
if(!_3c5||!_3c5.isLoaded||!_3c6.length){
return;
}
if(this.button){
var _3c7=this.get("disabled");
this.button.set("disabled",_3c7);
if(_3c7){
return;
}
var _3c8;
try{
_3c8=_3c5.queryCommandValue(_3c6)||"";
}
catch(e){
_3c8="";
}
}
if(_3c8==""){
_3c8="#000000";
}
if(_3c8=="transparent"){
_3c8="#ffffff";
}
if(typeof _3c8=="string"){
if(_3c8.indexOf("rgb")>-1){
_3c8=_3bd.fromRgb(_3c8).toHex();
}
}else{
_3c8=((_3c8&255)<<16)|(_3c8&65280)|((_3c8&16711680)>>>16);
_3c8=_3c8.toString(16);
_3c8="#000000".slice(0,7-_3c8.length)+_3c8;
}
this.value=_3c8;
var _3c9=this.button.dropDown;
if(_3c9&&_3c8!==_3c9.get("value")){
_3c9.set("value",_3c8,false);
}
}});
_3bf.registry["foreColor"]=function(){
return new _3c1({command:"foreColor"});
};
_3bf.registry["hiliteColor"]=function(){
return new _3c1({command:"hiliteColor"});
};
return _3c1;
});
},"dojo/hccss":function(){
define(["require","./_base/config","./dom-class","./dom-style","./has","./domReady","./_base/window"],function(_3ca,_3cb,_3cc,_3cd,has,_3ce,win){
has.add("highcontrast",function(){
var div=win.doc.createElement("div");
div.style.cssText="border: 1px solid; border-color:red green; position: absolute; height: 5px; top: -999px;"+"background-image: url("+(_3cb.blankGif||_3ca.toUrl("./resources/blank.gif"))+");";
win.body().appendChild(div);
var cs=_3cd.getComputedStyle(div),_3cf=cs.backgroundImage,hc=(cs.borderTopColor==cs.borderRightColor)||(_3cf&&(_3cf=="none"||_3cf=="url(invalid-url:)"));
if(has("ie")<=8){
div.outerHTML="";
}else{
win.body().removeChild(div);
}
return hc;
});
_3ce(function(){
if(has("highcontrast")){
_3cc.add(win.body(),"dj_a11y");
}
});
return has;
});
},"dijit/form/RadioButton":function(){
define(["dojo/_base/declare","./CheckBox","./_RadioButtonMixin"],function(_3d0,_3d1,_3d2){
return _3d0("dijit.form.RadioButton",[_3d1,_3d2],{baseClass:"dijitRadio"});
});
},"dijit/main":function(){
define(["dojo/_base/kernel"],function(dojo){
return dojo.dijit;
});
},"dijit/_OnDijitClickMixin":function(){
define(["dojo/on","dojo/_base/array","dojo/keys","dojo/_base/declare","dojo/has","./a11yclick"],function(on,_3d3,keys,_3d4,has,_3d5){
var ret=_3d4("dijit._OnDijitClickMixin",null,{connect:function(obj,_3d6,_3d7){
return this.inherited(arguments,[obj,_3d6=="ondijitclick"?_3d5:_3d6,_3d7]);
}});
ret.a11yclick=_3d5;
return ret;
});
},"dojo/dnd/autoscroll":function(){
define(["../_base/lang","../sniff","../_base/window","../dom-geometry","../dom-style","../window"],function(lang,has,win,_3d8,_3d9,_3da){
var _3db={};
lang.setObject("dojo.dnd.autoscroll",_3db);
_3db.getViewport=_3da.getBox;
_3db.V_TRIGGER_AUTOSCROLL=32;
_3db.H_TRIGGER_AUTOSCROLL=32;
_3db.V_AUTOSCROLL_VALUE=16;
_3db.H_AUTOSCROLL_VALUE=16;
var _3dc,doc=win.doc,_3dd=Infinity,_3de=Infinity;
_3db.autoScrollStart=function(d){
doc=d;
_3dc=_3da.getBox(doc);
var html=win.body(doc).parentNode;
_3dd=Math.max(html.scrollHeight-_3dc.h,0);
_3de=Math.max(html.scrollWidth-_3dc.w,0);
};
_3db.autoScroll=function(e){
var v=_3dc||_3da.getBox(doc),html=win.body(doc).parentNode,dx=0,dy=0;
if(e.clientX<_3db.H_TRIGGER_AUTOSCROLL){
dx=-_3db.H_AUTOSCROLL_VALUE;
}else{
if(e.clientX>v.w-_3db.H_TRIGGER_AUTOSCROLL){
dx=Math.min(_3db.H_AUTOSCROLL_VALUE,_3de-html.scrollLeft);
}
}
if(e.clientY<_3db.V_TRIGGER_AUTOSCROLL){
dy=-_3db.V_AUTOSCROLL_VALUE;
}else{
if(e.clientY>v.h-_3db.V_TRIGGER_AUTOSCROLL){
dy=Math.min(_3db.V_AUTOSCROLL_VALUE,_3dd-html.scrollTop);
}
}
window.scrollBy(dx,dy);
};
_3db._validNodes={"div":1,"p":1,"td":1};
_3db._validOverflow={"auto":1,"scroll":1};
_3db.autoScrollNodes=function(e){
var b,t,w,h,rx,ry,dx=0,dy=0,_3df,_3e0;
for(var n=e.target;n;){
if(n.nodeType==1&&(n.tagName.toLowerCase() in _3db._validNodes)){
var s=_3d9.getComputedStyle(n),_3e1=(s.overflow.toLowerCase() in _3db._validOverflow),_3e2=(s.overflowX.toLowerCase() in _3db._validOverflow),_3e3=(s.overflowY.toLowerCase() in _3db._validOverflow);
if(_3e1||_3e2||_3e3){
b=_3d8.getContentBox(n,s);
t=_3d8.position(n,true);
}
if(_3e1||_3e2){
w=Math.min(_3db.H_TRIGGER_AUTOSCROLL,b.w/2);
rx=e.pageX-t.x;
if(has("webkit")||has("opera")){
rx+=win.body().scrollLeft;
}
dx=0;
if(rx>0&&rx<b.w){
if(rx<w){
dx=-w;
}else{
if(rx>b.w-w){
dx=w;
}
}
_3df=n.scrollLeft;
n.scrollLeft=n.scrollLeft+dx;
}
}
if(_3e1||_3e3){
h=Math.min(_3db.V_TRIGGER_AUTOSCROLL,b.h/2);
ry=e.pageY-t.y;
if(has("webkit")||has("opera")){
ry+=win.body().scrollTop;
}
dy=0;
if(ry>0&&ry<b.h){
if(ry<h){
dy=-h;
}else{
if(ry>b.h-h){
dy=h;
}
}
_3e0=n.scrollTop;
n.scrollTop=n.scrollTop+dy;
}
}
if(dx||dy){
return;
}
}
try{
n=n.parentNode;
}
catch(x){
n=null;
}
}
_3db.autoScroll(e);
};
return _3db;
});
},"dijit/form/_RadioButtonMixin":function(){
define(["dojo/_base/array","dojo/_base/declare","dojo/dom-attr","dojo/_base/lang","dojo/query","../registry"],function(_3e4,_3e5,_3e6,lang,_3e7,_3e8){
return _3e5("dijit.form._RadioButtonMixin",null,{type:"radio",_getRelatedWidgets:function(){
var ary=[];
_3e7("input[type=radio]",this.focusNode.form||this.ownerDocument).forEach(lang.hitch(this,function(_3e9){
if(_3e9.name==this.name&&_3e9.form==this.focusNode.form){
var _3ea=_3e8.getEnclosingWidget(_3e9);
if(_3ea){
ary.push(_3ea);
}
}
}));
return ary;
},_setCheckedAttr:function(_3eb){
this.inherited(arguments);
if(!this._created){
return;
}
if(_3eb){
_3e4.forEach(this._getRelatedWidgets(),lang.hitch(this,function(_3ec){
if(_3ec!=this&&_3ec.checked){
_3ec.set("checked",false);
}
}));
}
},_getSubmitValue:function(_3ed){
return _3ed==null?"on":_3ed;
},_onClick:function(e){
if(this.checked||this.disabled){
e.stopPropagation();
e.preventDefault();
return false;
}
if(this.readOnly){
e.stopPropagation();
e.preventDefault();
_3e4.forEach(this._getRelatedWidgets(),lang.hitch(this,function(_3ee){
_3e6.set(this.focusNode||this.domNode,"checked",_3ee.checked);
}));
return false;
}
return this.inherited(arguments);
}});
});
},"dojo/data/ItemFileWriteStore":function(){
define(["../_base/lang","../_base/declare","../_base/array","../_base/json","../_base/kernel","./ItemFileReadStore","../date/stamp"],function(lang,_3ef,_3f0,_3f1,_3f2,_3f3,_3f4){
return _3ef("dojo.data.ItemFileWriteStore",_3f3,{constructor:function(_3f5){
this._features["dojo.data.api.Write"]=true;
this._features["dojo.data.api.Notification"]=true;
this._pending={_newItems:{},_modifiedItems:{},_deletedItems:{}};
if(!this._datatypeMap["Date"].serialize){
this._datatypeMap["Date"].serialize=function(obj){
return _3f4.toISOString(obj,{zulu:true});
};
}
if(_3f5&&(_3f5.referenceIntegrity===false)){
this.referenceIntegrity=false;
}
this._saveInProgress=false;
},referenceIntegrity:true,_assert:function(_3f6){
if(!_3f6){
throw new Error("assertion failed in ItemFileWriteStore");
}
},_getIdentifierAttribute:function(){
return this.getFeatures()["dojo.data.api.Identity"];
},newItem:function(_3f7,_3f8){
this._assert(!this._saveInProgress);
if(!this._loadFinished){
this._forceLoad();
}
if(typeof _3f7!="object"&&typeof _3f7!="undefined"){
throw new Error("newItem() was passed something other than an object");
}
var _3f9=null;
var _3fa=this._getIdentifierAttribute();
if(_3fa===Number){
_3f9=this._arrayOfAllItems.length;
}else{
_3f9=_3f7[_3fa];
if(typeof _3f9==="undefined"){
throw new Error("newItem() was not passed an identity for the new item");
}
if(lang.isArray(_3f9)){
throw new Error("newItem() was not passed an single-valued identity");
}
}
if(this._itemsByIdentity){
this._assert(typeof this._itemsByIdentity[_3f9]==="undefined");
}
this._assert(typeof this._pending._newItems[_3f9]==="undefined");
this._assert(typeof this._pending._deletedItems[_3f9]==="undefined");
var _3fb={};
_3fb[this._storeRefPropName]=this;
_3fb[this._itemNumPropName]=this._arrayOfAllItems.length;
if(this._itemsByIdentity){
this._itemsByIdentity[_3f9]=_3fb;
_3fb[_3fa]=[_3f9];
}
this._arrayOfAllItems.push(_3fb);
var _3fc=null;
if(_3f8&&_3f8.parent&&_3f8.attribute){
_3fc={item:_3f8.parent,attribute:_3f8.attribute,oldValue:undefined};
var _3fd=this.getValues(_3f8.parent,_3f8.attribute);
if(_3fd&&_3fd.length>0){
var _3fe=_3fd.slice(0,_3fd.length);
if(_3fd.length===1){
_3fc.oldValue=_3fd[0];
}else{
_3fc.oldValue=_3fd.slice(0,_3fd.length);
}
_3fe.push(_3fb);
this._setValueOrValues(_3f8.parent,_3f8.attribute,_3fe,false);
_3fc.newValue=this.getValues(_3f8.parent,_3f8.attribute);
}else{
this._setValueOrValues(_3f8.parent,_3f8.attribute,_3fb,false);
_3fc.newValue=_3fb;
}
}else{
_3fb[this._rootItemPropName]=true;
this._arrayOfTopLevelItems.push(_3fb);
}
this._pending._newItems[_3f9]=_3fb;
for(var key in _3f7){
if(key===this._storeRefPropName||key===this._itemNumPropName){
throw new Error("encountered bug in ItemFileWriteStore.newItem");
}
var _3ff=_3f7[key];
if(!lang.isArray(_3ff)){
_3ff=[_3ff];
}
_3fb[key]=_3ff;
if(this.referenceIntegrity){
for(var i=0;i<_3ff.length;i++){
var val=_3ff[i];
if(this.isItem(val)){
this._addReferenceToMap(val,_3fb,key);
}
}
}
}
this.onNew(_3fb,_3fc);
return _3fb;
},_removeArrayElement:function(_400,_401){
var _402=_3f0.indexOf(_400,_401);
if(_402!=-1){
_400.splice(_402,1);
return true;
}
return false;
},deleteItem:function(item){
this._assert(!this._saveInProgress);
this._assertIsItem(item);
var _403=item[this._itemNumPropName];
var _404=this.getIdentity(item);
if(this.referenceIntegrity){
var _405=this.getAttributes(item);
if(item[this._reverseRefMap]){
item["backup_"+this._reverseRefMap]=lang.clone(item[this._reverseRefMap]);
}
_3f0.forEach(_405,function(_406){
_3f0.forEach(this.getValues(item,_406),function(_407){
if(this.isItem(_407)){
if(!item["backupRefs_"+this._reverseRefMap]){
item["backupRefs_"+this._reverseRefMap]=[];
}
item["backupRefs_"+this._reverseRefMap].push({id:this.getIdentity(_407),attr:_406});
this._removeReferenceFromMap(_407,item,_406);
}
},this);
},this);
var _408=item[this._reverseRefMap];
if(_408){
for(var _409 in _408){
var _40a=null;
if(this._itemsByIdentity){
_40a=this._itemsByIdentity[_409];
}else{
_40a=this._arrayOfAllItems[_409];
}
if(_40a){
for(var _40b in _408[_409]){
var _40c=this.getValues(_40a,_40b)||[];
var _40d=_3f0.filter(_40c,function(_40e){
return !(this.isItem(_40e)&&this.getIdentity(_40e)==_404);
},this);
this._removeReferenceFromMap(item,_40a,_40b);
if(_40d.length<_40c.length){
this._setValueOrValues(_40a,_40b,_40d,true);
}
}
}
}
}
}
this._arrayOfAllItems[_403]=null;
item[this._storeRefPropName]=null;
if(this._itemsByIdentity){
delete this._itemsByIdentity[_404];
}
this._pending._deletedItems[_404]=item;
if(item[this._rootItemPropName]){
this._removeArrayElement(this._arrayOfTopLevelItems,item);
}
this.onDelete(item);
return true;
},setValue:function(item,_40f,_410){
return this._setValueOrValues(item,_40f,_410,true);
},setValues:function(item,_411,_412){
return this._setValueOrValues(item,_411,_412,true);
},unsetAttribute:function(item,_413){
return this._setValueOrValues(item,_413,[],true);
},_setValueOrValues:function(item,_414,_415,_416){
this._assert(!this._saveInProgress);
this._assertIsItem(item);
this._assert(lang.isString(_414));
this._assert(typeof _415!=="undefined");
var _417=this._getIdentifierAttribute();
if(_414==_417){
throw new Error("ItemFileWriteStore does not have support for changing the value of an item's identifier.");
}
var _418=this._getValueOrValues(item,_414);
var _419=this.getIdentity(item);
if(!this._pending._modifiedItems[_419]){
var _41a={};
for(var key in item){
if((key===this._storeRefPropName)||(key===this._itemNumPropName)||(key===this._rootItemPropName)){
_41a[key]=item[key];
}else{
if(key===this._reverseRefMap){
_41a[key]=lang.clone(item[key]);
}else{
_41a[key]=item[key].slice(0,item[key].length);
}
}
}
this._pending._modifiedItems[_419]=_41a;
}
var _41b=false;
if(lang.isArray(_415)&&_415.length===0){
_41b=delete item[_414];
_415=undefined;
if(this.referenceIntegrity&&_418){
var _41c=_418;
if(!lang.isArray(_41c)){
_41c=[_41c];
}
for(var i=0;i<_41c.length;i++){
var _41d=_41c[i];
if(this.isItem(_41d)){
this._removeReferenceFromMap(_41d,item,_414);
}
}
}
}else{
var _41e;
if(lang.isArray(_415)){
_41e=_415.slice(0,_415.length);
}else{
_41e=[_415];
}
if(this.referenceIntegrity){
if(_418){
var _41c=_418;
if(!lang.isArray(_41c)){
_41c=[_41c];
}
var map={};
_3f0.forEach(_41c,function(_41f){
if(this.isItem(_41f)){
var id=this.getIdentity(_41f);
map[id.toString()]=true;
}
},this);
_3f0.forEach(_41e,function(_420){
if(this.isItem(_420)){
var id=this.getIdentity(_420);
if(map[id.toString()]){
delete map[id.toString()];
}else{
this._addReferenceToMap(_420,item,_414);
}
}
},this);
for(var rId in map){
var _421;
if(this._itemsByIdentity){
_421=this._itemsByIdentity[rId];
}else{
_421=this._arrayOfAllItems[rId];
}
this._removeReferenceFromMap(_421,item,_414);
}
}else{
for(var i=0;i<_41e.length;i++){
var _41d=_41e[i];
if(this.isItem(_41d)){
this._addReferenceToMap(_41d,item,_414);
}
}
}
}
item[_414]=_41e;
_41b=true;
}
if(_416){
this.onSet(item,_414,_418,_415);
}
return _41b;
},_addReferenceToMap:function(_422,_423,_424){
var _425=this.getIdentity(_423);
var _426=_422[this._reverseRefMap];
if(!_426){
_426=_422[this._reverseRefMap]={};
}
var _427=_426[_425];
if(!_427){
_427=_426[_425]={};
}
_427[_424]=true;
},_removeReferenceFromMap:function(_428,_429,_42a){
var _42b=this.getIdentity(_429);
var _42c=_428[this._reverseRefMap];
var _42d;
if(_42c){
for(_42d in _42c){
if(_42d==_42b){
delete _42c[_42d][_42a];
if(this._isEmpty(_42c[_42d])){
delete _42c[_42d];
}
}
}
if(this._isEmpty(_42c)){
delete _428[this._reverseRefMap];
}
}
},_dumpReferenceMap:function(){
var i;
for(i=0;i<this._arrayOfAllItems.length;i++){
var item=this._arrayOfAllItems[i];
if(item&&item[this._reverseRefMap]){
}
}
},_getValueOrValues:function(item,_42e){
var _42f=undefined;
if(this.hasAttribute(item,_42e)){
var _430=this.getValues(item,_42e);
if(_430.length==1){
_42f=_430[0];
}else{
_42f=_430;
}
}
return _42f;
},_flatten:function(_431){
if(this.isItem(_431)){
return {_reference:this.getIdentity(_431)};
}else{
if(typeof _431==="object"){
for(var type in this._datatypeMap){
var _432=this._datatypeMap[type];
if(lang.isObject(_432)&&!lang.isFunction(_432)){
if(_431 instanceof _432.type){
if(!_432.serialize){
throw new Error("ItemFileWriteStore:  No serializer defined for type mapping: ["+type+"]");
}
return {_type:type,_value:_432.serialize(_431)};
}
}else{
if(_431 instanceof _432){
return {_type:type,_value:_431.toString()};
}
}
}
}
return _431;
}
},_getNewFileContentString:function(){
var _433={};
var _434=this._getIdentifierAttribute();
if(_434!==Number){
_433.identifier=_434;
}
if(this._labelAttr){
_433.label=this._labelAttr;
}
_433.items=[];
for(var i=0;i<this._arrayOfAllItems.length;++i){
var item=this._arrayOfAllItems[i];
if(item!==null){
var _435={};
for(var key in item){
if(key!==this._storeRefPropName&&key!==this._itemNumPropName&&key!==this._reverseRefMap&&key!==this._rootItemPropName){
var _436=this.getValues(item,key);
if(_436.length==1){
_435[key]=this._flatten(_436[0]);
}else{
var _437=[];
for(var j=0;j<_436.length;++j){
_437.push(this._flatten(_436[j]));
_435[key]=_437;
}
}
}
}
_433.items.push(_435);
}
}
var _438=true;
return _3f1.toJson(_433,_438);
},_isEmpty:function(_439){
var _43a=true;
if(lang.isObject(_439)){
var i;
for(i in _439){
_43a=false;
break;
}
}else{
if(lang.isArray(_439)){
if(_439.length>0){
_43a=false;
}
}
}
return _43a;
},save:function(_43b){
this._assert(!this._saveInProgress);
this._saveInProgress=true;
var self=this;
var _43c=function(){
self._pending={_newItems:{},_modifiedItems:{},_deletedItems:{}};
self._saveInProgress=false;
if(_43b&&_43b.onComplete){
var _43d=_43b.scope||_3f2.global;
_43b.onComplete.call(_43d);
}
};
var _43e=function(err){
self._saveInProgress=false;
if(_43b&&_43b.onError){
var _43f=_43b.scope||_3f2.global;
_43b.onError.call(_43f,err);
}
};
if(this._saveEverything){
var _440=this._getNewFileContentString();
this._saveEverything(_43c,_43e,_440);
}
if(this._saveCustom){
this._saveCustom(_43c,_43e);
}
if(!this._saveEverything&&!this._saveCustom){
_43c();
}
},revert:function(){
this._assert(!this._saveInProgress);
var _441;
for(_441 in this._pending._modifiedItems){
var _442=this._pending._modifiedItems[_441];
var _443=null;
if(this._itemsByIdentity){
_443=this._itemsByIdentity[_441];
}else{
_443=this._arrayOfAllItems[_441];
}
_442[this._storeRefPropName]=this;
for(var key in _443){
delete _443[key];
}
lang.mixin(_443,_442);
}
var _444;
for(_441 in this._pending._deletedItems){
_444=this._pending._deletedItems[_441];
_444[this._storeRefPropName]=this;
var _445=_444[this._itemNumPropName];
if(_444["backup_"+this._reverseRefMap]){
_444[this._reverseRefMap]=_444["backup_"+this._reverseRefMap];
delete _444["backup_"+this._reverseRefMap];
}
this._arrayOfAllItems[_445]=_444;
if(this._itemsByIdentity){
this._itemsByIdentity[_441]=_444;
}
if(_444[this._rootItemPropName]){
this._arrayOfTopLevelItems.push(_444);
}
}
for(_441 in this._pending._deletedItems){
_444=this._pending._deletedItems[_441];
if(_444["backupRefs_"+this._reverseRefMap]){
_3f0.forEach(_444["backupRefs_"+this._reverseRefMap],function(_446){
var _447;
if(this._itemsByIdentity){
_447=this._itemsByIdentity[_446.id];
}else{
_447=this._arrayOfAllItems[_446.id];
}
this._addReferenceToMap(_447,_444,_446.attr);
},this);
delete _444["backupRefs_"+this._reverseRefMap];
}
}
for(_441 in this._pending._newItems){
var _448=this._pending._newItems[_441];
_448[this._storeRefPropName]=null;
this._arrayOfAllItems[_448[this._itemNumPropName]]=null;
if(_448[this._rootItemPropName]){
this._removeArrayElement(this._arrayOfTopLevelItems,_448);
}
if(this._itemsByIdentity){
delete this._itemsByIdentity[_441];
}
}
this._pending={_newItems:{},_modifiedItems:{},_deletedItems:{}};
return true;
},isDirty:function(item){
if(item){
var _449=this.getIdentity(item);
return new Boolean(this._pending._newItems[_449]||this._pending._modifiedItems[_449]||this._pending._deletedItems[_449]).valueOf();
}else{
return !this._isEmpty(this._pending._newItems)||!this._isEmpty(this._pending._modifiedItems)||!this._isEmpty(this._pending._deletedItems);
}
},onSet:function(item,_44a,_44b,_44c){
},onNew:function(_44d,_44e){
},onDelete:function(_44f){
},close:function(_450){
if(this.clearOnClose){
if(!this.isDirty()){
this.inherited(arguments);
}else{
throw new Error("dojo.data.ItemFileWriteStore: There are unsaved changes present in the store.  Please save or revert the changes before invoking close.");
}
}
}});
});
},"dojo/dnd/TimedMoveable":function(){
define(["../_base/declare","./Moveable"],function(_451,_452){
var _453=_452.prototype.onMove;
return _451("dojo.dnd.TimedMoveable",_452,{timeout:40,constructor:function(node,_454){
if(!_454){
_454={};
}
if(_454.timeout&&typeof _454.timeout=="number"&&_454.timeout>=0){
this.timeout=_454.timeout;
}
},onMoveStop:function(_455){
if(_455._timer){
clearTimeout(_455._timer);
_453.call(this,_455,_455._leftTop);
}
_452.prototype.onMoveStop.apply(this,arguments);
},onMove:function(_456,_457){
_456._leftTop=_457;
if(!_456._timer){
var _458=this;
_456._timer=setTimeout(function(){
_456._timer=null;
_453.call(_458,_456,_456._leftTop);
},this.timeout);
}
}});
});
},"dojo/data/ObjectStore":function(){
define(["../_base/lang","../Evented","../_base/declare","../_base/Deferred","../_base/array","../_base/connect","../regexp"],function(lang,_459,_45a,_45b,_45c,_45d,_45e){
function _45f(_460){
return _460=="*"?".*":_460=="?"?".":_460;
};
return _45a("dojo.data.ObjectStore",[_459],{objectStore:null,constructor:function(_461){
this._dirtyObjects=[];
if(_461.labelAttribute){
_461.labelProperty=_461.labelAttribute;
}
lang.mixin(this,_461);
},labelProperty:"label",getValue:function(item,_462,_463){
return typeof item.get==="function"?item.get(_462):_462 in item?item[_462]:_463;
},getValues:function(item,_464){
var val=this.getValue(item,_464);
return val instanceof Array?val:val===undefined?[]:[val];
},getAttributes:function(item){
var res=[];
for(var i in item){
if(item.hasOwnProperty(i)&&!(i.charAt(0)=="_"&&i.charAt(1)=="_")){
res.push(i);
}
}
return res;
},hasAttribute:function(item,_465){
return _465 in item;
},containsValue:function(item,_466,_467){
return _45c.indexOf(this.getValues(item,_466),_467)>-1;
},isItem:function(item){
return (typeof item=="object")&&item&&!(item instanceof Date);
},isItemLoaded:function(item){
return item&&typeof item.load!=="function";
},loadItem:function(args){
var item;
if(typeof args.item.load==="function"){
_45b.when(args.item.load(),function(_468){
item=_468;
var func=_468 instanceof Error?args.onError:args.onItem;
if(func){
func.call(args.scope,_468);
}
});
}else{
if(args.onItem){
args.onItem.call(args.scope,args.item);
}
}
return item;
},close:function(_469){
return _469&&_469.abort&&_469.abort();
},fetch:function(args){
args=lang.delegate(args,args&&args.queryOptions);
var self=this;
var _46a=args.scope||self;
var _46b=args.query;
if(typeof _46b=="object"){
_46b=lang.delegate(_46b);
for(var i in _46b){
var _46c=_46b[i];
if(typeof _46c=="string"){
_46b[i]=RegExp("^"+_45e.escapeString(_46c,"*?\\").replace(/\\.|\*|\?/g,_45f)+"$",args.ignoreCase?"mi":"m");
_46b[i].toString=(function(_46d){
return function(){
return _46d;
};
})(_46c);
}
}
}
var _46e=this.objectStore.query(_46b,args);
_45b.when(_46e.total,function(_46f){
_45b.when(_46e,function(_470){
if(args.onBegin){
args.onBegin.call(_46a,_46f||_470.length,args);
}
if(args.onItem){
for(var i=0;i<_470.length;i++){
args.onItem.call(_46a,_470[i],args);
}
}
if(args.onComplete){
args.onComplete.call(_46a,args.onItem?null:_470,args);
}
return _470;
},_471);
},_471);
function _471(_472){
if(args.onError){
args.onError.call(_46a,_472,args);
}
};
args.abort=function(){
if(_46e.cancel){
_46e.cancel();
}
};
if(_46e.observe){
if(this.observing){
this.observing.cancel();
}
this.observing=_46e.observe(function(_473,_474,_475){
if(_45c.indexOf(self._dirtyObjects,_473)==-1){
if(_474==-1){
self.onNew(_473);
}else{
if(_475==-1){
self.onDelete(_473);
}else{
for(var i in _473){
if(i!=self.objectStore.idProperty){
self.onSet(_473,i,null,_473[i]);
}
}
}
}
}
},true);
}
this.onFetch(_46e);
args.store=this;
return args;
},getFeatures:function(){
return {"dojo.data.api.Read":!!this.objectStore.get,"dojo.data.api.Identity":true,"dojo.data.api.Write":!!this.objectStore.put,"dojo.data.api.Notification":true};
},getLabel:function(item){
if(this.isItem(item)){
return this.getValue(item,this.labelProperty);
}
return undefined;
},getLabelAttributes:function(item){
return [this.labelProperty];
},getIdentity:function(item){
return this.objectStore.getIdentity?this.objectStore.getIdentity(item):item[this.objectStore.idProperty||"id"];
},getIdentityAttributes:function(item){
return [this.objectStore.idProperty];
},fetchItemByIdentity:function(args){
var item;
_45b.when(this.objectStore.get(args.identity),function(_476){
item=_476;
args.onItem.call(args.scope,_476);
},function(_477){
args.onError.call(args.scope,_477);
});
return item;
},newItem:function(data,_478){
if(_478){
var _479=this.getValue(_478.parent,_478.attribute,[]);
_479=_479.concat([data]);
data.__parent=_479;
this.setValue(_478.parent,_478.attribute,_479);
}
this._dirtyObjects.push({object:data,save:true});
this.onNew(data);
return data;
},deleteItem:function(item){
this.changing(item,true);
this.onDelete(item);
},setValue:function(item,_47a,_47b){
var old=item[_47a];
this.changing(item);
item[_47a]=_47b;
this.onSet(item,_47a,old,_47b);
},setValues:function(item,_47c,_47d){
if(!lang.isArray(_47d)){
throw new Error("setValues expects to be passed an Array object as its value");
}
this.setValue(item,_47c,_47d);
},unsetAttribute:function(item,_47e){
this.changing(item);
var old=item[_47e];
delete item[_47e];
this.onSet(item,_47e,old,undefined);
},changing:function(_47f,_480){
_47f.__isDirty=true;
for(var i=0;i<this._dirtyObjects.length;i++){
var _481=this._dirtyObjects[i];
if(_47f==_481.object){
if(_480){
_481.object=false;
if(!this._saveNotNeeded){
_481.save=true;
}
}
return;
}
}
var old=_47f instanceof Array?[]:{};
for(i in _47f){
if(_47f.hasOwnProperty(i)){
old[i]=_47f[i];
}
}
this._dirtyObjects.push({object:!_480&&_47f,old:old,save:!this._saveNotNeeded});
},save:function(_482){
_482=_482||{};
var _483,_484=[];
var _485=[];
var self=this;
var _486=this._dirtyObjects;
var left=_486.length;
try{
_45d.connect(_482,"onError",function(){
if(_482.revertOnError!==false){
var _487=_486;
_486=_485;
self.revert();
self._dirtyObjects=_487;
}else{
self._dirtyObjects=_486.concat(_485);
}
});
if(this.objectStore.transaction){
var _488=this.objectStore.transaction();
}
for(var i=0;i<_486.length;i++){
var _489=_486[i];
var _48a=_489.object;
var old=_489.old;
delete _48a.__isDirty;
if(_48a){
_483=this.objectStore.put(_48a,{overwrite:!!old});
}else{
if(typeof old!="undefined"){
_483=this.objectStore.remove(this.getIdentity(old));
}
}
_485.push(_489);
_486.splice(i--,1);
_45b.when(_483,function(_48b){
if(!(--left)){
if(_482.onComplete){
_482.onComplete.call(_482.scope,_484);
}
}
},function(_48c){
left=-1;
_482.onError.call(_482.scope,_48c);
});
}
if(_488){
_488.commit();
}
}
catch(e){
_482.onError.call(_482.scope,value);
}
},revert:function(){
var _48d=this._dirtyObjects;
for(var i=_48d.length;i>0;){
i--;
var _48e=_48d[i];
var _48f=_48e.object;
var old=_48e.old;
if(_48f&&old){
for(var j in old){
if(old.hasOwnProperty(j)&&_48f[j]!==old[j]){
this.onSet(_48f,j,_48f[j],old[j]);
_48f[j]=old[j];
}
}
for(j in _48f){
if(!old.hasOwnProperty(j)){
this.onSet(_48f,j,_48f[j]);
delete _48f[j];
}
}
}else{
if(!old){
this.onDelete(_48f);
}else{
this.onNew(old);
}
}
delete (_48f||old).__isDirty;
_48d.splice(i,1);
}
},isDirty:function(item){
if(!item){
return !!this._dirtyObjects.length;
}
return item.__isDirty;
},onSet:function(){
},onNew:function(){
},onDelete:function(){
},onFetch:function(_490){
}});
});
},"dijit/form/nls/pt/validate":function(){
define(({invalidMessage:"O valor inserido não é válido.",missingMessage:"Este valor é necessário.",rangeMessage:"Este valor está fora do intervalo. "}));
},"dijit/form/_ListMouseMixin":function(){
define(["dojo/_base/declare","dojo/on","dojo/touch","./_ListBase"],function(_491,on,_492,_493){
return _491("dijit.form._ListMouseMixin",_493,{postCreate:function(){
this.inherited(arguments);
this.domNode.dojoClick=true;
this.own(on(this.domNode,"mousedown",function(evt){
evt.preventDefault();
}));
this._listConnect("click","_onClick");
this._listConnect("mousedown","_onMouseDown");
this._listConnect("mouseup","_onMouseUp");
this._listConnect("mouseover","_onMouseOver");
this._listConnect("mouseout","_onMouseOut");
},_onClick:function(evt,_494){
this._setSelectedAttr(_494);
if(this._deferredClick){
this._deferredClick.remove();
}
this._deferredClick=this.defer(function(){
this._deferredClick=null;
this.onClick(_494);
});
},_onMouseDown:function(evt,_495){
if(this._hoveredNode){
this.onUnhover(this._hoveredNode);
this._hoveredNode=null;
}
this._isDragging=true;
this._setSelectedAttr(_495);
},_onMouseUp:function(evt,_496){
this._isDragging=false;
var _497=this.selected;
var _498=this._hoveredNode;
if(_497&&_496==_497){
this.defer(function(){
this._onClick(evt,_497);
});
}else{
if(_498){
this.defer(function(){
this._onClick(evt,_498);
});
}
}
},_onMouseOut:function(evt,_499){
if(this._hoveredNode){
this.onUnhover(this._hoveredNode);
this._hoveredNode=null;
}
if(this._isDragging){
this._cancelDrag=(new Date()).getTime()+1000;
}
},_onMouseOver:function(evt,_49a){
if(this._cancelDrag){
var time=(new Date()).getTime();
if(time>this._cancelDrag){
this._isDragging=false;
}
this._cancelDrag=null;
}
this._hoveredNode=_49a;
this.onHover(_49a);
if(this._isDragging){
this._setSelectedAttr(_49a);
}
}});
});
},"dojo/cldr/monetary":function(){
define(["../_base/kernel","../_base/lang"],function(dojo,lang){
var _49b={};
lang.setObject("dojo.cldr.monetary",_49b);
_49b.getData=function(code){
var _49c={ADP:0,AFN:0,ALL:0,AMD:0,BHD:3,BIF:0,BYR:0,CLF:0,CLP:0,COP:0,CRC:0,DJF:0,ESP:0,GNF:0,GYD:0,HUF:0,IDR:0,IQD:0,IRR:3,ISK:0,ITL:0,JOD:3,JPY:0,KMF:0,KPW:0,KRW:0,KWD:3,LAK:0,LBP:0,LUF:0,LYD:3,MGA:0,MGF:0,MMK:0,MNT:0,MRO:0,MUR:0,OMR:3,PKR:0,PYG:0,RSD:0,RWF:0,SLL:0,SOS:0,STD:0,SYP:0,TMM:0,TND:3,TRL:0,TZS:0,UGX:0,UZS:0,VND:0,VUV:0,XAF:0,XOF:0,XPF:0,YER:0,ZMK:0,ZWD:0};
var _49d={};
var _49e=_49c[code],_49f=_49d[code];
if(typeof _49e=="undefined"){
_49e=2;
}
if(typeof _49f=="undefined"){
_49f=0;
}
return {places:_49e,round:_49f};
};
return _49b;
});
},"dojo/cookie":function(){
define(["./_base/kernel","./regexp"],function(dojo,_4a0){
dojo.cookie=function(name,_4a1,_4a2){
var c=document.cookie,ret;
if(arguments.length==1){
var _4a3=c.match(new RegExp("(?:^|; )"+_4a0.escapeString(name)+"=([^;]*)"));
ret=_4a3?decodeURIComponent(_4a3[1]):undefined;
}else{
_4a2=_4a2||{};
var exp=_4a2.expires;
if(typeof exp=="number"){
var d=new Date();
d.setTime(d.getTime()+exp*24*60*60*1000);
exp=_4a2.expires=d;
}
if(exp&&exp.toUTCString){
_4a2.expires=exp.toUTCString();
}
_4a1=encodeURIComponent(_4a1);
var _4a4=name+"="+_4a1,_4a5;
for(_4a5 in _4a2){
_4a4+="; "+_4a5;
var _4a6=_4a2[_4a5];
if(_4a6!==true){
_4a4+="="+_4a6;
}
}
document.cookie=_4a4;
}
return ret;
};
dojo.cookie.isSupported=function(){
if(!("cookieEnabled" in navigator)){
this("__djCookieTest__","CookiesAllowed");
navigator.cookieEnabled=this("__djCookieTest__")=="CookiesAllowed";
if(navigator.cookieEnabled){
this("__djCookieTest__","",{expires:-1});
}
}
return navigator.cookieEnabled;
};
return dojo.cookie;
});
},"dojo/cache":function(){
define(["./_base/kernel","./text"],function(dojo){
return dojo.cache;
});
},"dijit/_base/popup":function(){
define(["dojo/dom-class","dojo/_base/window","../popup","../BackgroundIframe"],function(_4a7,win,_4a8){
var _4a9=_4a8._createWrapper;
_4a8._createWrapper=function(_4aa){
if(!_4aa.declaredClass){
_4aa={_popupWrapper:(_4aa.parentNode&&_4a7.contains(_4aa.parentNode,"dijitPopup"))?_4aa.parentNode:null,domNode:_4aa,destroy:function(){
},ownerDocument:_4aa.ownerDocument,ownerDocumentBody:win.body(_4aa.ownerDocument)};
}
return _4a9.call(this,_4aa);
};
var _4ab=_4a8.open;
_4a8.open=function(args){
if(args.orient&&typeof args.orient!="string"&&!("length" in args.orient)){
var ary=[];
for(var key in args.orient){
ary.push({aroundCorner:key,corner:args.orient[key]});
}
args.orient=ary;
}
return _4ab.call(this,args);
};
return _4a8;
});
},"dojo/promise/all":function(){
define(["../_base/array","../Deferred","../when"],function(_4ac,_4ad,when){
"use strict";
var some=_4ac.some;
return function all(_4ae){
var _4af,_4ac;
if(_4ae instanceof Array){
_4ac=_4ae;
}else{
if(_4ae&&typeof _4ae==="object"){
_4af=_4ae;
}
}
var _4b0;
var _4b1=[];
if(_4af){
_4ac=[];
for(var key in _4af){
if(Object.hasOwnProperty.call(_4af,key)){
_4b1.push(key);
_4ac.push(_4af[key]);
}
}
_4b0={};
}else{
if(_4ac){
_4b0=[];
}
}
if(!_4ac||!_4ac.length){
return new _4ad().resolve(_4b0);
}
var _4b2=new _4ad();
_4b2.promise.always(function(){
_4b0=_4b1=null;
});
var _4b3=_4ac.length;
some(_4ac,function(_4b4,_4b5){
if(!_4af){
_4b1.push(_4b5);
}
when(_4b4,function(_4b6){
if(!_4b2.isFulfilled()){
_4b0[_4b1[_4b5]]=_4b6;
if(--_4b3===0){
_4b2.resolve(_4b0);
}
}
},_4b2.reject);
return _4b2.isFulfilled();
});
return _4b2.promise;
};
});
},"dijit/form/NumberTextBox":function(){
define(["dojo/_base/declare","dojo/_base/lang","dojo/number","./RangeBoundTextBox"],function(_4b7,lang,_4b8,_4b9){
var _4ba=_4b7("dijit.form.NumberTextBoxMixin",null,{pattern:function(_4bb){
return "("+(this.focused&&this.editOptions?this._regExpGenerator(lang.delegate(_4bb,this.editOptions))+"|":"")+this._regExpGenerator(_4bb)+")";
},value:NaN,editOptions:{pattern:"#.######"},_formatter:_4b8.format,_regExpGenerator:_4b8.regexp,postMixInProperties:function(){
this.inherited(arguments);
this._set("type","text");
},_setConstraintsAttr:function(_4bc){
var _4bd=typeof _4bc.places=="number"?_4bc.places:0;
if(_4bd){
_4bd++;
}
if(typeof _4bc.max!="number"){
_4bc.max=9*Math.pow(10,15-_4bd);
}
if(typeof _4bc.min!="number"){
_4bc.min=-9*Math.pow(10,15-_4bd);
}
this.inherited(arguments,[_4bc]);
if(this.focusNode&&this.focusNode.value&&!isNaN(this.value)){
this.set("value",this.value);
}
},_onFocus:function(){
if(this.disabled||this.readOnly){
return;
}
var val=this.get("value");
if(typeof val=="number"&&!isNaN(val)){
var _4be=this.format(val,this.constraints);
if(_4be!==undefined){
this.textbox.value=_4be;
}
}
this.inherited(arguments);
},format:function(_4bf,_4c0){
var _4c1=String(_4bf);
if(typeof _4bf!="number"){
return _4c1;
}
if(isNaN(_4bf)){
return "";
}
if(!("rangeCheck" in this&&this.rangeCheck(_4bf,_4c0))&&_4c0.exponent!==false&&/\de[-+]?\d/i.test(_4c1)){
return _4c1;
}
if(this.editOptions&&this.focused){
_4c0=lang.mixin({},_4c0,this.editOptions);
}
return this._formatter(_4bf,_4c0);
},_parser:_4b8.parse,parse:function(_4c2,_4c3){
var v=this._parser(_4c2,lang.mixin({},_4c3,(this.editOptions&&this.focused)?this.editOptions:{}));
if(this.editOptions&&this.focused&&isNaN(v)){
v=this._parser(_4c2,_4c3);
}
return v;
},_getDisplayedValueAttr:function(){
var v=this.inherited(arguments);
return isNaN(v)?this.textbox.value:v;
},filter:function(_4c4){
return (_4c4==null||_4c4==="")?NaN:this.inherited(arguments);
},serialize:function(_4c5,_4c6){
return (typeof _4c5!="number"||isNaN(_4c5))?"":this.inherited(arguments);
},_setBlurValue:function(){
var val=lang.hitch(lang.delegate(this,{focused:true}),"get")("value");
this._setValueAttr(val,true);
},_setValueAttr:function(_4c7,_4c8,_4c9){
if(_4c7!==undefined&&_4c9===undefined){
_4c9=String(_4c7);
if(typeof _4c7=="number"){
if(isNaN(_4c7)){
_4c9="";
}else{
if(("rangeCheck" in this&&this.rangeCheck(_4c7,this.constraints))||this.constraints.exponent===false||!/\de[-+]?\d/i.test(_4c9)){
_4c9=undefined;
}
}
}else{
if(!_4c7){
_4c9="";
_4c7=NaN;
}else{
_4c7=undefined;
}
}
}
this.inherited(arguments,[_4c7,_4c8,_4c9]);
},_getValueAttr:function(){
var v=this.inherited(arguments);
if(isNaN(v)&&this.textbox.value!==""){
if(this.constraints.exponent!==false&&/\de[-+]?\d/i.test(this.textbox.value)&&(new RegExp("^"+_4b8._realNumberRegexp(lang.delegate(this.constraints))+"$").test(this.textbox.value))){
var n=Number(this.textbox.value);
return isNaN(n)?undefined:n;
}else{
return undefined;
}
}else{
return v;
}
},isValid:function(_4ca){
if(!this.focused||this._isEmpty(this.textbox.value)){
return this.inherited(arguments);
}else{
var v=this.get("value");
if(!isNaN(v)&&this.rangeCheck(v,this.constraints)){
if(this.constraints.exponent!==false&&/\de[-+]?\d/i.test(this.textbox.value)){
return true;
}else{
return this.inherited(arguments);
}
}else{
return false;
}
}
}});
var _4cb=_4b7("dijit.form.NumberTextBox",[_4b9,_4ba],{baseClass:"dijitTextBox dijitNumberTextBox"});
_4cb.Mixin=_4ba;
return _4cb;
});
},"dijit/form/TimeTextBox":function(){
define(["dojo/_base/declare","dojo/keys","dojo/_base/lang","../_TimePicker","./_DateTimeTextBox"],function(_4cc,keys,lang,_4cd,_4ce){
return _4cc("dijit.form.TimeTextBox",_4ce,{baseClass:"dijitTextBox dijitComboBox dijitTimeTextBox",popupClass:_4cd,_selector:"time",value:new Date(""),maxHeight:-1,_onKey:function(evt){
if(this.disabled||this.readOnly){
return;
}
this.inherited(arguments);
switch(evt.keyCode){
case keys.ENTER:
case keys.TAB:
case keys.ESCAPE:
case keys.DOWN_ARROW:
case keys.UP_ARROW:
break;
default:
this.defer(function(){
var val=this.get("displayedValue");
this.filterString=(val&&!this.parse(val,this.constraints))?val.toLowerCase():"";
if(this._opened){
this.closeDropDown();
}
this.openDropDown();
});
}
}});
});
},"xstyle/has-class":function(){
define(["dojo/has"],function(has){
var _4cf={};
return function(){
var test,args=arguments;
for(var i=0;i<args.length;i++){
var test=args[i];
if(!_4cf[test]){
_4cf[test]=true;
var _4d0=test.match(/^(no-)?(.+?)((-[\d\.]+)(-[\d\.]+)?)?$/),_4d1=has(_4d0[2]),_4d2=-_4d0[4];
if((_4d2>0?_4d2<=_4d1&&(-_4d0[5]||_4d2)>=_4d1:!!_4d1)==!_4d0[1]){
document.documentElement.className+=" has-"+test;
}
}
}
};
});
},"dijit/ColorPalette":function(){
define(["require","dojo/text!./templates/ColorPalette.html","./_Widget","./_TemplatedMixin","./_PaletteMixin","./hccss","dojo/i18n","dojo/_base/Color","dojo/_base/declare","dojo/dom-construct","dojo/string","dojo/i18n!dojo/nls/colors","dojo/colors"],function(_4d3,_4d4,_4d5,_4d6,_4d7,has,i18n,_4d8,_4d9,_4da,_4db){
var _4dc=_4d9("dijit.ColorPalette",[_4d5,_4d6,_4d7],{palette:"7x10",_palettes:{"7x10":[["white","seashell","cornsilk","lemonchiffon","lightyellow","palegreen","paleturquoise","lightcyan","lavender","plum"],["lightgray","pink","bisque","moccasin","khaki","lightgreen","lightseagreen","lightskyblue","cornflowerblue","violet"],["silver","lightcoral","sandybrown","orange","palegoldenrod","chartreuse","mediumturquoise","skyblue","mediumslateblue","orchid"],["gray","red","orangered","darkorange","yellow","limegreen","darkseagreen","royalblue","slateblue","mediumorchid"],["dimgray","crimson","chocolate","coral","gold","forestgreen","seagreen","blue","blueviolet","darkorchid"],["darkslategray","firebrick","saddlebrown","sienna","olive","green","darkcyan","mediumblue","darkslateblue","darkmagenta"],["black","darkred","maroon","brown","darkolivegreen","darkgreen","midnightblue","navy","indigo","purple"]],"3x4":[["white","lime","green","blue"],["silver","yellow","fuchsia","navy"],["gray","red","purple","black"]]},templateString:_4d4,baseClass:"dijitColorPalette",_dyeFactory:function(_4dd,row,col,_4de){
return new this._dyeClass(_4dd,row,col,_4de);
},buildRendering:function(){
this.inherited(arguments);
this._dyeClass=_4d9(_4dc._Color,{palette:this.palette});
this._preparePalette(this._palettes[this.palette],i18n.getLocalization("dojo","colors",this.lang));
}});
_4dc._Color=_4d9("dijit._Color",_4d8,{template:"<span class='dijitInline dijitPaletteImg'>"+"<img src='${blankGif}' alt='${alt}' title='${title}' class='dijitColorPaletteSwatch' style='background-color: ${color}'/>"+"</span>",hcTemplate:"<span class='dijitInline dijitPaletteImg' style='position: relative; overflow: hidden; height: 12px; width: 14px;'>"+"<img src='${image}' alt='${alt}' title='${title}' style='position: absolute; left: ${left}px; top: ${top}px; ${size}'/>"+"</span>",_imagePaths:{"7x10":_4d3.toUrl("./themes/a11y/colors7x10.png"),"3x4":_4d3.toUrl("./themes/a11y/colors3x4.png")},constructor:function(_4df,row,col,_4e0){
this._title=_4e0;
this._row=row;
this._col=col;
this.setColor(_4d8.named[_4df]);
},getValue:function(){
return this.toHex();
},fillCell:function(cell,_4e1){
var html=_4db.substitute(has("highcontrast")?this.hcTemplate:this.template,{color:this.toHex(),blankGif:_4e1,alt:this._title,title:this._title,image:this._imagePaths[this.palette].toString(),left:this._col*-20-5,top:this._row*-20-5,size:this.palette=="7x10"?"height: 145px; width: 206px":"height: 64px; width: 86px"});
_4da.place(html,cell);
}});
return _4dc;
});
},"dijit/form/CurrencyTextBox":function(){
define(["dojo/currency","dojo/_base/declare","dojo/_base/lang","./NumberTextBox"],function(_4e2,_4e3,lang,_4e4){
return _4e3("dijit.form.CurrencyTextBox",_4e4,{currency:"",baseClass:"dijitTextBox dijitCurrencyTextBox",_formatter:_4e2.format,_parser:_4e2.parse,_regExpGenerator:_4e2.regexp,parse:function(_4e5,_4e6){
var v=this.inherited(arguments);
if(isNaN(v)&&/\d+/.test(_4e5)){
v=lang.hitch(lang.delegate(this,{_parser:_4e4.prototype._parser}),"inherited")(arguments);
}
return v;
},_setConstraintsAttr:function(_4e7){
if(!_4e7.currency&&this.currency){
_4e7.currency=this.currency;
}
this.inherited(arguments,[_4e2._mixInDefaults(lang.mixin(_4e7,{exponent:false}))]);
}});
});
},"dojo/_base/url":function(){
define(["./kernel"],function(dojo){
var ore=new RegExp("^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?$"),ire=new RegExp("^((([^\\[:]+):)?([^@]+)@)?(\\[([^\\]]+)\\]|([^\\[:]*))(:([0-9]+))?$"),_4e8=function(){
var n=null,_4e9=arguments,uri=[_4e9[0]];
for(var i=1;i<_4e9.length;i++){
if(!_4e9[i]){
continue;
}
var _4ea=new _4e8(_4e9[i]+""),_4eb=new _4e8(uri[0]+"");
if(_4ea.path==""&&!_4ea.scheme&&!_4ea.authority&&!_4ea.query){
if(_4ea.fragment!=n){
_4eb.fragment=_4ea.fragment;
}
_4ea=_4eb;
}else{
if(!_4ea.scheme){
_4ea.scheme=_4eb.scheme;
if(!_4ea.authority){
_4ea.authority=_4eb.authority;
if(_4ea.path.charAt(0)!="/"){
var path=_4eb.path.substring(0,_4eb.path.lastIndexOf("/")+1)+_4ea.path;
var segs=path.split("/");
for(var j=0;j<segs.length;j++){
if(segs[j]=="."){
if(j==segs.length-1){
segs[j]="";
}else{
segs.splice(j,1);
j--;
}
}else{
if(j>0&&!(j==1&&segs[0]=="")&&segs[j]==".."&&segs[j-1]!=".."){
if(j==(segs.length-1)){
segs.splice(j,1);
segs[j-1]="";
}else{
segs.splice(j-1,2);
j-=2;
}
}
}
}
_4ea.path=segs.join("/");
}
}
}
}
uri=[];
if(_4ea.scheme){
uri.push(_4ea.scheme,":");
}
if(_4ea.authority){
uri.push("//",_4ea.authority);
}
uri.push(_4ea.path);
if(_4ea.query){
uri.push("?",_4ea.query);
}
if(_4ea.fragment){
uri.push("#",_4ea.fragment);
}
}
this.uri=uri.join("");
var r=this.uri.match(ore);
this.scheme=r[2]||(r[1]?"":n);
this.authority=r[4]||(r[3]?"":n);
this.path=r[5];
this.query=r[7]||(r[6]?"":n);
this.fragment=r[9]||(r[8]?"":n);
if(this.authority!=n){
r=this.authority.match(ire);
this.user=r[3]||n;
this.password=r[4]||n;
this.host=r[6]||r[7];
this.port=r[9]||n;
}
};
_4e8.prototype.toString=function(){
return this.uri;
};
return dojo._Url=_4e8;
});
},"dojo/cldr/nls/gregorian":function(){
define({root:{"days-standAlone-short":["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],"months-format-narrow":["1","2","3","4","5","6","7","8","9","10","11","12"],"quarters-standAlone-narrow":["1","2","3","4"],"field-weekday":"Day of the Week","dateFormatItem-yQQQ":"y QQQ","dateFormatItem-yMEd":"y-MM-dd, E","dateFormatItem-GyMMMEd":"G y MMM d, E","dateFormatItem-MMMEd":"MMM d, E","eraNarrow":["BCE","CE"],"days-format-short":["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],"dateTimeFormats-appendItem-Day-Of-Week":"{0} {1}","dateFormat-long":"y MMMM d","months-format-wide":["Month1","Month2","Month3","Month4","Month5","Month6","Month7","Month8","Month9","Month10","Month11","Month12"],"dateTimeFormat-medium":"{1} {0}","dayPeriods-format-wide-pm":"PM","dateFormat-full":"y MMMM d, EEEE","dateFormatItem-Md":"MM-dd","dayPeriods-format-abbr-am":"AM","dateTimeFormats-appendItem-Second":"{0} ({2}: {1})","dateFormatItem-yMd":"y-MM-dd","field-era":"Era","dateFormatItem-yM":"y-MM","months-standAlone-wide":["Month1","Month2","Month3","Month4","Month5","Month6","Month7","Month8","Month9","Month10","Month11","Month12"],"timeFormat-short":"HH:mm","quarters-format-wide":["Q1","Q2","Q3","Q4"],"dateFormatItem-yQQQQ":"y QQQQ","timeFormat-long":"HH:mm:ss z","field-year":"Year","dateFormatItem-yMMM":"y MMM","dateTimeFormats-appendItem-Era":"{1} {0}","field-hour":"Hour","months-format-abbr":["Month1","Month2","Month3","Month4","Month5","Month6","Month7","Month8","Month9","Month10","Month11","Month12"],"timeFormat-full":"HH:mm:ss zzzz","dateTimeFormats-appendItem-Week":"{0} ({2}: {1})","field-day-relative+0":"Today","field-day-relative+1":"Tomorrow","dateFormatItem-GyMMMd":"G y MMM d","dateFormatItem-H":"HH","months-standAlone-abbr":["Month1","Month2","Month3","Month4","Month5","Month6","Month7","Month8","Month9","Month10","Month11","Month12"],"quarters-format-abbr":["Q1","Q2","Q3","Q4"],"quarters-standAlone-wide":["Q1","Q2","Q3","Q4"],"dateFormatItem-Gy":"G y","dateFormatItem-M":"L","days-standAlone-wide":["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],"timeFormat-medium":"HH:mm:ss","dateFormatItem-Hm":"HH:mm","quarters-standAlone-abbr":["Q1","Q2","Q3","Q4"],"eraAbbr":["BCE","CE"],"field-minute":"Minute","field-dayperiod":"Dayperiod","days-standAlone-abbr":["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],"dateFormatItem-d":"d","dateFormatItem-ms":"mm:ss","quarters-format-narrow":["1","2","3","4"],"field-day-relative+-1":"Yesterday","dateFormatItem-h":"h a","dateTimeFormat-long":"{1} {0}","dayPeriods-format-narrow-am":"AM","dateFormatItem-MMMd":"MMM d","dateFormatItem-MEd":"MM-dd, E","dateTimeFormat-full":"{1} {0}","field-day":"Day","days-format-wide":["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],"field-zone":"Zone","dateTimeFormats-appendItem-Day":"{0} ({2}: {1})","dateFormatItem-y":"y","months-standAlone-narrow":["1","2","3","4","5","6","7","8","9","10","11","12"],"dateFormatItem-hm":"h:mm a","dateTimeFormats-appendItem-Year":"{1} {0}","dateTimeFormats-appendItem-Hour":"{0} ({2}: {1})","dayPeriods-format-abbr-pm":"PM","days-format-abbr":["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],"eraNames":["BCE","CE"],"dateFormatItem-yMMMd":"y MMM d","days-format-narrow":["S","M","T","W","T","F","S"],"days-standAlone-narrow":["S","M","T","W","T","F","S"],"dateFormatItem-MMM":"LLL","field-month":"Month","dateTimeFormats-appendItem-Quarter":"{0} ({2}: {1})","dayPeriods-format-wide-am":"AM","dateTimeFormats-appendItem-Month":"{0} ({2}: {1})","dateTimeFormats-appendItem-Minute":"{0} ({2}: {1})","dateFormat-short":"y-MM-dd","field-second":"Second","dateFormatItem-yMMMEd":"y MMM d, E","dateFormatItem-Ed":"d, E","dateTimeFormats-appendItem-Timezone":"{0} {1}","field-week":"Week","dateFormat-medium":"y MMM d","dayPeriods-format-narrow-pm":"PM","dateTimeFormat-short":"{1} {0}","dateFormatItem-Hms":"HH:mm:ss","dateFormatItem-hms":"h:mm:ss a","dateFormatItem-GyMMM":"G y MMM"},"ar":true,"ca":true,"cs":true,"da":true,"de":true,"el":true,"en":true,"en-au":true,"en-gb":true,"es":true,"fi":true,"fr":true,"fr-ch":true,"he":true,"hu":true,"it":true,"ja":true,"ko":true,"nb":true,"nl":true,"pl":true,"pt":true,"pt-pt":true,"ro":true,"ru":true,"sk":true,"sl":true,"sv":true,"th":true,"tr":true,"zh":true,"zh-hant":true,"zh-hk":true,"zh-tw":true});
},"dojo/cldr/nls/en/gregorian":function(){
define({"dateFormatItem-Ehm":"E h:mm a","days-standAlone-short":["Su","Mo","Tu","We","Th","Fr","Sa"],"months-format-narrow":["J","F","M","A","M","J","J","A","S","O","N","D"],"quarters-standAlone-narrow":["1","2","3","4"],"field-weekday":"Day of the Week","dateFormatItem-yQQQ":"QQQ y","dateFormatItem-yMEd":"E, M/d/y","dateFormatItem-GyMMMEd":"E, MMM d, y G","dateFormatItem-MMMEd":"E, MMM d","eraNarrow":["B","A"],"days-format-short":["Su","Mo","Tu","We","Th","Fr","Sa"],"dateTimeFormats-appendItem-Day-Of-Week":"{0} {1}","dateFormat-long":"MMMM d, y","months-format-wide":["January","February","March","April","May","June","July","August","September","October","November","December"],"dateTimeFormat-medium":"{1}, {0}","dayPeriods-format-wide-pm":"PM","dateFormat-full":"EEEE, MMMM d, y","dateFormatItem-Md":"M/d","dateTimeFormats-appendItem-Second":"{0} ({2}: {1})","dayPeriods-format-wide-noon":"noon","dateFormatItem-yMd":"M/d/y","field-era":"Era","dateFormatItem-yM":"M/y","months-standAlone-wide":["January","February","March","April","May","June","July","August","September","October","November","December"],"timeFormat-short":"h:mm a","quarters-format-wide":["1st quarter","2nd quarter","3rd quarter","4th quarter"],"dateFormatItem-yQQQQ":"QQQQ y","timeFormat-long":"h:mm:ss a z","field-year":"Year","dateFormatItem-yMMM":"MMM y","dateTimeFormats-appendItem-Era":"{0} {1}","field-hour":"Hour","months-format-abbr":["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],"timeFormat-full":"h:mm:ss a zzzz","dateTimeFormats-appendItem-Week":"{0} ({2}: {1})","field-day-relative+0":"Today","field-day-relative+1":"Tomorrow","dateFormatItem-GyMMMd":"MMM d, y G","dateFormatItem-H":"HH","months-standAlone-abbr":["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],"quarters-format-abbr":["Q1","Q2","Q3","Q4"],"quarters-standAlone-wide":["1st quarter","2nd quarter","3rd quarter","4th quarter"],"dateFormatItem-Gy":"y G","dateFormatItem-M":"L","days-standAlone-wide":["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],"timeFormat-medium":"h:mm:ss a","dateFormatItem-Hm":"HH:mm","eraAbbr":["BC","AD"],"field-minute":"Minute","field-dayperiod":"AM/PM","dateFormatItem-d":"d","dateFormatItem-ms":"mm:ss","field-day-relative+-1":"Yesterday","dateFormatItem-h":"h a","dateTimeFormat-long":"{1} 'at' {0}","dayPeriods-format-narrow-am":"a","dateFormatItem-MMMd":"MMM d","dateFormatItem-MEd":"E, M/d","dateTimeFormat-full":"{1} 'at' {0}","field-day":"Day","days-format-wide":["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],"field-zone":"Time Zone","dateTimeFormats-appendItem-Day":"{0} ({2}: {1})","dateFormatItem-y":"y","months-standAlone-narrow":["J","F","M","A","M","J","J","A","S","O","N","D"],"field-year-relative+-1":"Last year","field-month-relative+-1":"Last month","dateFormatItem-hm":"h:mm a","dateTimeFormats-appendItem-Year":"{0} {1}","dateTimeFormats-appendItem-Hour":"{0} ({2}: {1})","days-format-abbr":["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],"dateFormatItem-yMMMd":"MMM d, y","eraNames":["Before Christ","Anno Domini"],"days-standAlone-narrow":["S","M","T","W","T","F","S"],"dateFormatItem-MMM":"LLL","field-month":"Month","dateTimeFormats-appendItem-Quarter":"{0} ({2}: {1})","dayPeriods-format-wide-am":"AM","dateTimeFormats-appendItem-Month":"{0} ({2}: {1})","dateTimeFormats-appendItem-Minute":"{0} ({2}: {1})","dateFormatItem-EHm":"E HH:mm","dateFormat-short":"M/d/yy","dateFormatItem-EHms":"E HH:mm:ss","dateFormatItem-Ehms":"E h:mm:ss a","dayPeriods-format-narrow-noon":"n","field-second":"Second","dateFormatItem-yMMMEd":"E, MMM d, y","field-month-relative+0":"This month","field-month-relative+1":"Next month","dateFormatItem-Ed":"d E","dateTimeFormats-appendItem-Timezone":"{0} {1}","field-week":"Week","dateFormat-medium":"MMM d, y","field-year-relative+0":"This year","field-week-relative+-1":"Last week","field-year-relative+1":"Next year","dayPeriods-format-narrow-pm":"p","dateTimeFormat-short":"{1}, {0}","dateFormatItem-Hms":"HH:mm:ss","dateFormatItem-hms":"h:mm:ss a","dateFormatItem-GyMMM":"MMM y G","field-week-relative+0":"This week","field-week-relative+1":"Next week"});
},"dojo/cldr/nls/pt/gregorian":function(){
define({"days-standAlone-short":["dom","seg","ter","qua","qui","sex","sáb"],"months-format-narrow":["J","F","M","A","M","J","J","A","S","O","N","D"],"quarters-standAlone-narrow":["1","2","3","4"],"field-weekday":"Dia da semana","dateFormatItem-yQQQ":"y QQQ","dateFormatItem-yMEd":"E, dd/MM/y","dateFormatItem-GyMMMEd":"E, d 'de' MMM 'de' y G","dateFormatItem-MMMEd":"E, d 'de' MMM","eraNarrow":["a.C.","d.C."],"dateFormatItem-yMM":"MM/y","dayPeriods-format-wide-morning":"manhã","days-format-short":["dom","seg","ter","qua","qui","sex","sáb"],"dateFormat-long":"d 'de' MMMM 'de' y","months-format-wide":["janeiro","fevereiro","março","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro"],"dateTimeFormat-medium":"{1} {0}","dayPeriods-format-wide-pm":"PM","dateFormat-full":"EEEE, d 'de' MMMM 'de' y","dateFormatItem-Md":"d/M","dayPeriods-format-abbr-am":"AM","dayPeriods-format-wide-noon":"meio-dia","dateFormatItem-yMd":"dd/MM/y","field-era":"Era","dateFormatItem-yM":"MM/y","months-standAlone-wide":["janeiro","fevereiro","março","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro"],"timeFormat-short":"HH:mm","quarters-format-wide":["1º trimestre","2º trimestre","3º trimestre","4º trimestre"],"dateFormatItem-yQQQQ":"y QQQQ","timeFormat-long":"HH:mm:ss z","field-year":"Ano","dateFormatItem-yMMM":"MMM 'de' y","field-hour":"Hora","dateFormatItem-MMdd":"dd/MM","months-format-abbr":["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"],"timeFormat-full":"HH:mm:ss zzzz","field-day-relative+0":"Hoje","field-day-relative+1":"Amanhã","dateFormatItem-GyMMMd":"d 'de' MMM 'de' y G","field-day-relative+2":"Depois de amanhã","dateFormatItem-H":"HH","months-standAlone-abbr":["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"],"quarters-format-abbr":["T1","T2","T3","T4"],"quarters-standAlone-wide":["1º trimestre","2º trimestre","3º trimestre","4º trimestre"],"dateFormatItem-Gy":"y G","dateFormatItem-HHmmss":"HH:mm:ss","dateFormatItem-M":"L","days-standAlone-wide":["domingo","segunda-feira","terça-feira","quarta-feira","quinta-feira","sexta-feira","sábado"],"timeFormat-medium":"HH:mm:ss","dateFormatItem-Hm":"HH:mm","quarters-standAlone-abbr":["T1","T2","T3","T4"],"eraAbbr":["a.C.","d.C."],"field-minute":"Minuto","field-dayperiod":"Período do dia","days-standAlone-abbr":["dom","seg","ter","qua","qui","sex","sáb"],"dayPeriods-format-wide-night":"noite","dateFormatItem-d":"d","dateFormatItem-ms":"mm:ss","quarters-format-narrow":["1","2","3","4"],"field-day-relative+-1":"Ontem","dateFormatItem-h":"h a","dateTimeFormat-long":"{1} {0}","dayPeriods-format-narrow-am":"a","field-day-relative+-2":"Anteontem","dateFormatItem-MMMd":"d 'de' MMM","dateFormatItem-MEd":"E, dd/MM","dateTimeFormat-full":"{1} {0}","field-day":"Dia","days-format-wide":["domingo","segunda-feira","terça-feira","quarta-feira","quinta-feira","sexta-feira","sábado"],"field-zone":"Fuso","dateFormatItem-y":"y","months-standAlone-narrow":["J","F","M","A","M","J","J","A","S","O","N","D"],"field-year-relative+-1":"Ano passado","field-month-relative+-1":"Mês passado","dateFormatItem-hm":"h:mm a","dayPeriods-format-abbr-pm":"PM","days-format-abbr":["dom","seg","ter","qua","qui","sex","sáb"],"eraNames":["Antes de Cristo","Ano do Senhor"],"dateFormatItem-yMMMd":"d 'de' MMM 'de' y","days-format-narrow":["D","S","T","Q","Q","S","S"],"days-standAlone-narrow":["D","S","T","Q","Q","S","S"],"dateFormatItem-MMM":"LLL","field-month":"Mês","dateFormatItem-HHmm":"HH:mm","dayPeriods-format-wide-am":"AM","dateFormat-short":"dd/MM/yy","dayPeriods-format-wide-afternoon":"tarde","field-second":"Segundo","dateFormatItem-yMMMEd":"E, d 'de' MMM 'de' y","field-month-relative+0":"Este mês","field-month-relative+1":"Próximo mês","dateFormatItem-Ed":"E, d","field-week":"Semana","dateFormat-medium":"dd/MM/y","field-year-relative+0":"Este ano","field-week-relative+-1":"Semana passada","field-year-relative+1":"Próximo ano","dayPeriods-format-narrow-pm":"p","dateTimeFormat-short":"{1} {0}","dateFormatItem-Hms":"HH:mm:ss","dateFormatItem-hms":"h:mm:ss a","dateFormatItem-GyMMM":"MMM 'de' y G","field-week-relative+0":"Esta semana","field-week-relative+1":"Próxima semana"});
},"dojo/cldr/nls/pt/gregorian":function(){
define({"days-standAlone-short":["dom","seg","ter","qua","qui","sex","sáb"],"months-format-narrow":["J","F","M","A","M","J","J","A","S","O","N","D"],"quarters-standAlone-narrow":["1","2","3","4"],"field-weekday":"Dia da semana","dateFormatItem-yQQQ":"y QQQ","dateFormatItem-yMEd":"E, dd/MM/y","dateFormatItem-GyMMMEd":"E, d 'de' MMM 'de' y G","dateFormatItem-MMMEd":"E, d 'de' MMM","eraNarrow":["a.C.","d.C."],"dateFormatItem-yMM":"MM/y","dayPeriods-format-wide-morning":"manhã","days-format-short":["dom","seg","ter","qua","qui","sex","sáb"],"dateFormat-long":"d 'de' MMMM 'de' y","months-format-wide":["janeiro","fevereiro","março","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro"],"dateTimeFormat-medium":"{1} {0}","dayPeriods-format-wide-pm":"PM","dateFormat-full":"EEEE, d 'de' MMMM 'de' y","dateFormatItem-Md":"d/M","dayPeriods-format-abbr-am":"AM","dayPeriods-format-wide-noon":"meio-dia","dateFormatItem-yMd":"dd/MM/y","field-era":"Era","dateFormatItem-yM":"MM/y","months-standAlone-wide":["janeiro","fevereiro","março","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro"],"timeFormat-short":"HH:mm","quarters-format-wide":["1º trimestre","2º trimestre","3º trimestre","4º trimestre"],"dateFormatItem-yQQQQ":"y QQQQ","timeFormat-long":"HH:mm:ss z","field-year":"Ano","dateFormatItem-yMMM":"MMM 'de' y","field-hour":"Hora","dateFormatItem-MMdd":"dd/MM","months-format-abbr":["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"],"timeFormat-full":"HH:mm:ss zzzz","field-day-relative+0":"Hoje","field-day-relative+1":"Amanhã","dateFormatItem-GyMMMd":"d 'de' MMM 'de' y G","field-day-relative+2":"Depois de amanhã","dateFormatItem-H":"HH","months-standAlone-abbr":["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"],"quarters-format-abbr":["T1","T2","T3","T4"],"quarters-standAlone-wide":["1º trimestre","2º trimestre","3º trimestre","4º trimestre"],"dateFormatItem-Gy":"y G","dateFormatItem-HHmmss":"HH:mm:ss","dateFormatItem-M":"L","days-standAlone-wide":["domingo","segunda-feira","terça-feira","quarta-feira","quinta-feira","sexta-feira","sábado"],"timeFormat-medium":"HH:mm:ss","dateFormatItem-Hm":"HH:mm","quarters-standAlone-abbr":["T1","T2","T3","T4"],"eraAbbr":["a.C.","d.C."],"field-minute":"Minuto","field-dayperiod":"Período do dia","days-standAlone-abbr":["dom","seg","ter","qua","qui","sex","sáb"],"dayPeriods-format-wide-night":"noite","dateFormatItem-d":"d","dateFormatItem-ms":"mm:ss","quarters-format-narrow":["1","2","3","4"],"field-day-relative+-1":"Ontem","dateFormatItem-h":"h a","dateTimeFormat-long":"{1} {0}","dayPeriods-format-narrow-am":"a","field-day-relative+-2":"Anteontem","dateFormatItem-MMMd":"d 'de' MMM","dateFormatItem-MEd":"E, dd/MM","dateTimeFormat-full":"{1} {0}","field-day":"Dia","days-format-wide":["domingo","segunda-feira","terça-feira","quarta-feira","quinta-feira","sexta-feira","sábado"],"field-zone":"Fuso","dateFormatItem-y":"y","months-standAlone-narrow":["J","F","M","A","M","J","J","A","S","O","N","D"],"field-year-relative+-1":"Ano passado","field-month-relative+-1":"Mês passado","dateFormatItem-hm":"h:mm a","dayPeriods-format-abbr-pm":"PM","days-format-abbr":["dom","seg","ter","qua","qui","sex","sáb"],"eraNames":["Antes de Cristo","Ano do Senhor"],"dateFormatItem-yMMMd":"d 'de' MMM 'de' y","days-format-narrow":["D","S","T","Q","Q","S","S"],"days-standAlone-narrow":["D","S","T","Q","Q","S","S"],"dateFormatItem-MMM":"LLL","field-month":"Mês","dateFormatItem-HHmm":"HH:mm","dayPeriods-format-wide-am":"AM","dateFormat-short":"dd/MM/yy","dayPeriods-format-wide-afternoon":"tarde","field-second":"Segundo","dateFormatItem-yMMMEd":"E, d 'de' MMM 'de' y","field-month-relative+0":"Este mês","field-month-relative+1":"Próximo mês","dateFormatItem-Ed":"E, d","field-week":"Semana","dateFormat-medium":"dd/MM/y","field-year-relative+0":"Este ano","field-week-relative+-1":"Semana passada","field-year-relative+1":"Próximo ano","dayPeriods-format-narrow-pm":"p","dateTimeFormat-short":"{1} {0}","dateFormatItem-Hms":"HH:mm:ss","dateFormatItem-hms":"h:mm:ss a","dateFormatItem-GyMMM":"MMM 'de' y G","field-week-relative+0":"Esta semana","field-week-relative+1":"Próxima semana"});
},"dijit/layout/LayoutContainer":function(){
define(["dojo/_base/array","dojo/_base/declare","dojo/dom-class","dojo/dom-style","dojo/_base/lang","../_WidgetBase","./_LayoutWidget","./utils"],function(_4ec,_4ed,_4ee,_4ef,lang,_4f0,_4f1,_4f2){
var _4f3=_4ed("dijit.layout.LayoutContainer",_4f1,{design:"headline",baseClass:"dijitLayoutContainer",startup:function(){
if(this._started){
return;
}
_4ec.forEach(this.getChildren(),this._setupChild,this);
this.inherited(arguments);
},_setupChild:function(_4f4){
this.inherited(arguments);
var _4f5=_4f4.region;
if(_4f5){
_4ee.add(_4f4.domNode,this.baseClass+"Pane");
}
},_getOrderedChildren:function(){
var _4f6=_4ec.map(this.getChildren(),function(_4f7,idx){
return {pane:_4f7,weight:[_4f7.region=="center"?Infinity:0,_4f7.layoutPriority,(this.design=="sidebar"?1:-1)*(/top|bottom/.test(_4f7.region)?1:-1),idx]};
},this);
_4f6.sort(function(a,b){
var aw=a.weight,bw=b.weight;
for(var i=0;i<aw.length;i++){
if(aw[i]!=bw[i]){
return aw[i]-bw[i];
}
}
return 0;
});
return _4ec.map(_4f6,function(w){
return w.pane;
});
},layout:function(){
_4f2.layoutChildren(this.domNode,this._contentBox,this._getOrderedChildren());
},addChild:function(_4f8,_4f9){
this.inherited(arguments);
if(this._started){
this.layout();
}
},removeChild:function(_4fa){
this.inherited(arguments);
if(this._started){
this.layout();
}
_4ee.remove(_4fa.domNode,this.baseClass+"Pane");
_4ef.set(_4fa.domNode,{top:"auto",bottom:"auto",left:"auto",right:"auto",position:"static"});
_4ef.set(_4fa.domNode,/top|bottom/.test(_4fa.region)?"width":"height","auto");
}});
_4f3.ChildWidgetProperties={region:"",layoutAlign:"",layoutPriority:0};
lang.extend(_4f0,_4f3.ChildWidgetProperties);
return _4f3;
});
},"dgrid/util/mouse":function(){
define(["dojo/on","dojo/dom","dojo/query"],function(on,dom){
function _4fb(_4fc,type){
return function(node,_4fd){
return on(node,_4fc+":"+type,function(evt){
if(!dom.isDescendant(evt.relatedTarget,this)){
return _4fd.call(this,evt);
}
});
};
};
return {enterRow:_4fb(".dgrid-content .dgrid-row","mouseover"),enterCell:_4fb(".dgrid-content .dgrid-cell","mouseover"),enterHeaderCell:_4fb(".dgrid-header .dgrid-cell","mouseover"),leaveRow:_4fb(".dgrid-content .dgrid-row","mouseout"),leaveCell:_4fb(".dgrid-content .dgrid-cell","mouseout"),leaveHeaderCell:_4fb(".dgrid-header .dgrid-cell","mouseout"),createDelegatingHandler:_4fb};
});
},"dojo/uacss":function(){
define(["./dom-geometry","./_base/lang","./domReady","./sniff","./_base/window"],function(_4fe,lang,_4ff,has,_500){
var html=_500.doc.documentElement,ie=has("ie"),_501=has("opera"),maj=Math.floor,ff=has("ff"),_502=_4fe.boxModel.replace(/-/,""),_503={"dj_quirks":has("quirks"),"dj_opera":_501,"dj_khtml":has("khtml"),"dj_webkit":has("webkit"),"dj_safari":has("safari"),"dj_chrome":has("chrome"),"dj_gecko":has("mozilla"),"dj_ios":has("ios"),"dj_android":has("android")};
if(ie){
_503["dj_ie"]=true;
_503["dj_ie"+maj(ie)]=true;
_503["dj_iequirks"]=has("quirks");
}
if(ff){
_503["dj_ff"+maj(ff)]=true;
}
_503["dj_"+_502]=true;
var _504="";
for(var clz in _503){
if(_503[clz]){
_504+=clz+" ";
}
}
html.className=lang.trim(html.className+" "+_504);
_4ff(function(){
if(!_4fe.isBodyLtr()){
var _505="dj_rtl dijitRtl "+_504.replace(/ /g,"-rtl ");
html.className=lang.trim(html.className+" "+_505+"dj_rtl dijitRtl "+_504.replace(/ /g,"-rtl "));
}
});
return has;
});
},"dijit/Tooltip":function(){
define(["dojo/_base/array","dojo/_base/declare","dojo/_base/fx","dojo/dom","dojo/dom-class","dojo/dom-geometry","dojo/dom-style","dojo/_base/lang","dojo/mouse","dojo/on","dojo/sniff","./_base/manager","./place","./_Widget","./_TemplatedMixin","./BackgroundIframe","dojo/text!./templates/Tooltip.html","./main"],function(_506,_507,fx,dom,_508,_509,_50a,lang,_50b,on,has,_50c,_50d,_50e,_50f,_510,_511,_512){
var _513=_507("dijit._MasterTooltip",[_50e,_50f],{duration:_50c.defaultDuration,templateString:_511,postCreate:function(){
this.ownerDocumentBody.appendChild(this.domNode);
this.bgIframe=new _510(this.domNode);
this.fadeIn=fx.fadeIn({node:this.domNode,duration:this.duration,onEnd:lang.hitch(this,"_onShow")});
this.fadeOut=fx.fadeOut({node:this.domNode,duration:this.duration,onEnd:lang.hitch(this,"_onHide")});
},show:function(_514,_515,_516,rtl,_517){
if(this.aroundNode&&this.aroundNode===_515&&this.containerNode.innerHTML==_514){
return;
}
if(this.fadeOut.status()=="playing"){
this._onDeck=arguments;
return;
}
this.containerNode.innerHTML=_514;
if(_517){
this.set("textDir",_517);
}
this.containerNode.align=rtl?"right":"left";
var pos=_50d.around(this.domNode,_515,_516&&_516.length?_516:_518.defaultPosition,!rtl,lang.hitch(this,"orient"));
var _519=pos.aroundNodePos;
if(pos.corner.charAt(0)=="M"&&pos.aroundCorner.charAt(0)=="M"){
this.connectorNode.style.top=_519.y+((_519.h-this.connectorNode.offsetHeight)>>1)-pos.y+"px";
this.connectorNode.style.left="";
}else{
if(pos.corner.charAt(1)=="M"&&pos.aroundCorner.charAt(1)=="M"){
this.connectorNode.style.left=_519.x+((_519.w-this.connectorNode.offsetWidth)>>1)-pos.x+"px";
}else{
this.connectorNode.style.left="";
this.connectorNode.style.top="";
}
}
_50a.set(this.domNode,"opacity",0);
this.fadeIn.play();
this.isShowingNow=true;
this.aroundNode=_515;
},orient:function(node,_51a,_51b,_51c,_51d){
this.connectorNode.style.top="";
var _51e=_51c.h,_51f=_51c.w;
node.className="dijitTooltip "+{"MR-ML":"dijitTooltipRight","ML-MR":"dijitTooltipLeft","TM-BM":"dijitTooltipAbove","BM-TM":"dijitTooltipBelow","BL-TL":"dijitTooltipBelow dijitTooltipABLeft","TL-BL":"dijitTooltipAbove dijitTooltipABLeft","BR-TR":"dijitTooltipBelow dijitTooltipABRight","TR-BR":"dijitTooltipAbove dijitTooltipABRight","BR-BL":"dijitTooltipRight","BL-BR":"dijitTooltipLeft"}[_51a+"-"+_51b];
this.domNode.style.width="auto";
var size=_509.position(this.domNode);
if(has("ie")==9){
size.w+=2;
}
var _520=Math.min((Math.max(_51f,1)),size.w);
_509.setMarginBox(this.domNode,{w:_520});
if(_51b.charAt(0)=="B"&&_51a.charAt(0)=="B"){
var bb=_509.position(node);
var _521=this.connectorNode.offsetHeight;
if(bb.h>_51e){
var _522=_51e-((_51d.h+_521)>>1);
this.connectorNode.style.top=_522+"px";
this.connectorNode.style.bottom="";
}else{
this.connectorNode.style.bottom=Math.min(Math.max(_51d.h/2-_521/2,0),bb.h-_521)+"px";
this.connectorNode.style.top="";
}
}else{
this.connectorNode.style.top="";
this.connectorNode.style.bottom="";
}
return Math.max(0,size.w-_51f);
},_onShow:function(){
if(has("ie")){
this.domNode.style.filter="";
}
},hide:function(_523){
if(this._onDeck&&this._onDeck[1]==_523){
this._onDeck=null;
}else{
if(this.aroundNode===_523){
this.fadeIn.stop();
this.isShowingNow=false;
this.aroundNode=null;
this.fadeOut.play();
}else{
}
}
},_onHide:function(){
this.domNode.style.cssText="";
this.containerNode.innerHTML="";
if(this._onDeck){
this.show.apply(this,this._onDeck);
this._onDeck=null;
}
}});
if(has("dojo-bidi")){
_513.extend({_setAutoTextDir:function(node){
this.applyTextDir(node);
_506.forEach(node.children,function(_524){
this._setAutoTextDir(_524);
},this);
},_setTextDirAttr:function(_525){
this._set("textDir",_525);
if(_525=="auto"){
this._setAutoTextDir(this.containerNode);
}else{
this.containerNode.dir=this.textDir;
}
}});
}
_512.showTooltip=function(_526,_527,_528,rtl,_529){
if(_528){
_528=_506.map(_528,function(val){
return {after:"after-centered",before:"before-centered"}[val]||val;
});
}
if(!_518._masterTT){
_512._masterTT=_518._masterTT=new _513();
}
return _518._masterTT.show(_526,_527,_528,rtl,_529);
};
_512.hideTooltip=function(_52a){
return _518._masterTT&&_518._masterTT.hide(_52a);
};
var _518=_507("dijit.Tooltip",_50e,{label:"",showDelay:400,connectId:[],position:[],selector:"",_setConnectIdAttr:function(_52b){
_506.forEach(this._connections||[],function(_52c){
_506.forEach(_52c,function(_52d){
_52d.remove();
});
},this);
this._connectIds=_506.filter(lang.isArrayLike(_52b)?_52b:(_52b?[_52b]:[]),function(id){
return dom.byId(id,this.ownerDocument);
},this);
this._connections=_506.map(this._connectIds,function(id){
var node=dom.byId(id,this.ownerDocument),_52e=this.selector,_52f=_52e?function(_530){
return on.selector(_52e,_530);
}:function(_531){
return _531;
},self=this;
return [on(node,_52f(_50b.enter),function(){
self._onHover(this);
}),on(node,_52f("focusin"),function(){
self._onHover(this);
}),on(node,_52f(_50b.leave),lang.hitch(self,"_onUnHover")),on(node,_52f("focusout"),lang.hitch(self,"_onUnHover"))];
},this);
this._set("connectId",_52b);
},addTarget:function(node){
var id=node.id||node;
if(_506.indexOf(this._connectIds,id)==-1){
this.set("connectId",this._connectIds.concat(id));
}
},removeTarget:function(node){
var id=node.id||node,idx=_506.indexOf(this._connectIds,id);
if(idx>=0){
this._connectIds.splice(idx,1);
this.set("connectId",this._connectIds);
}
},buildRendering:function(){
this.inherited(arguments);
_508.add(this.domNode,"dijitTooltipData");
},startup:function(){
this.inherited(arguments);
var ids=this.connectId;
_506.forEach(lang.isArrayLike(ids)?ids:[ids],this.addTarget,this);
},getContent:function(node){
return this.label||this.domNode.innerHTML;
},_onHover:function(_532){
if(!this._showTimer){
this._showTimer=this.defer(function(){
this.open(_532);
},this.showDelay);
}
},_onUnHover:function(){
if(this._showTimer){
this._showTimer.remove();
delete this._showTimer;
}
this.close();
},open:function(_533){
if(this._showTimer){
this._showTimer.remove();
delete this._showTimer;
}
var _534=this.getContent(_533);
if(!_534){
return;
}
_518.show(_534,_533,this.position,!this.isLeftToRight(),this.textDir);
this._connectNode=_533;
this.onShow(_533,this.position);
},close:function(){
if(this._connectNode){
_518.hide(this._connectNode);
delete this._connectNode;
this.onHide();
}
if(this._showTimer){
this._showTimer.remove();
delete this._showTimer;
}
},onShow:function(){
},onHide:function(){
},destroy:function(){
this.close();
_506.forEach(this._connections||[],function(_535){
_506.forEach(_535,function(_536){
_536.remove();
});
},this);
this.inherited(arguments);
}});
_518._MasterTooltip=_513;
_518.show=_512.showTooltip;
_518.hide=_512.hideTooltip;
_518.defaultPosition=["after-centered","before-centered"];
return _518;
});
},"dojo/string":function(){
define(["./_base/kernel","./_base/lang"],function(_537,lang){
var _538={};
lang.setObject("dojo.string",_538);
_538.rep=function(str,num){
if(num<=0||!str){
return "";
}
var buf=[];
for(;;){
if(num&1){
buf.push(str);
}
if(!(num>>=1)){
break;
}
str+=str;
}
return buf.join("");
};
_538.pad=function(text,size,ch,end){
if(!ch){
ch="0";
}
var out=String(text),pad=_538.rep(ch,Math.ceil((size-out.length)/ch.length));
return end?out+pad:pad+out;
};
_538.substitute=function(_539,map,_53a,_53b){
_53b=_53b||_537.global;
_53a=_53a?lang.hitch(_53b,_53a):function(v){
return v;
};
return _539.replace(/\$\{([^\s\:\}]+)(?:\:([^\s\:\}]+))?\}/g,function(_53c,key,_53d){
var _53e=lang.getObject(key,false,map);
if(_53d){
_53e=lang.getObject(_53d,false,_53b).call(_53b,_53e,key);
}
return _53a(_53e,key).toString();
});
};
_538.trim=String.prototype.trim?lang.trim:function(str){
str=str.replace(/^\s+/,"");
for(var i=str.length-1;i>=0;i--){
if(/\S/.test(str.charAt(i))){
str=str.substring(0,i+1);
break;
}
}
return str;
};
return _538;
});
},"dijit/layout/AccordionPane":function(){
define(["dojo/_base/declare","dojo/_base/kernel","./ContentPane"],function(_53f,_540,_541){
return _53f("dijit.layout.AccordionPane",_541,{constructor:function(){
_540.deprecated("dijit.layout.AccordionPane deprecated, use ContentPane instead","","2.0");
},onSelected:function(){
}});
});
},"dijit/form/DropDownButton":function(){
define(["dojo/_base/declare","dojo/_base/lang","dojo/query","../registry","../popup","./Button","../_Container","../_HasDropDown","dojo/text!./templates/DropDownButton.html"],function(_542,lang,_543,_544,_545,_546,_547,_548,_549){
return _542("dijit.form.DropDownButton",[_546,_547,_548],{baseClass:"dijitDropDownButton",templateString:_549,_fillContent:function(){
if(this.srcNodeRef){
var _54a=_543("*",this.srcNodeRef);
this.inherited(arguments,[_54a[0]]);
this.dropDownContainer=this.srcNodeRef;
}
},startup:function(){
if(this._started){
return;
}
if(!this.dropDown&&this.dropDownContainer){
var _54b=_543("[widgetId]",this.dropDownContainer)[0];
if(_54b){
this.dropDown=_544.byNode(_54b);
}
delete this.dropDownContainer;
}
if(this.dropDown){
_545.hide(this.dropDown);
}
this.inherited(arguments);
},isLoaded:function(){
var _54c=this.dropDown;
return (!!_54c&&(!_54c.href||_54c.isLoaded));
},loadDropDown:function(_54d){
var _54e=this.dropDown;
var _54f=_54e.on("load",lang.hitch(this,function(){
_54f.remove();
_54d();
}));
_54e.refresh();
},isFocusable:function(){
return this.inherited(arguments)&&!this._mouseDown;
}});
});
},"dijit/form/_FormValueMixin":function(){
define(["dojo/_base/declare","dojo/dom-attr","dojo/keys","dojo/_base/lang","dojo/on","dojo/sniff","./_FormWidgetMixin"],function(_550,_551,keys,lang,on,has,_552){
return _550("dijit.form._FormValueMixin",_552,{readOnly:false,_setReadOnlyAttr:function(_553){
_551.set(this.focusNode,"readOnly",_553);
this._set("readOnly",_553);
},postCreate:function(){
this.inherited(arguments);
if(this._resetValue===undefined){
this._lastValueReported=this._resetValue=this.value;
}
},_setValueAttr:function(_554,_555){
this._handleOnChange(_554,_555);
},_handleOnChange:function(_556,_557){
this._set("value",_556);
this.inherited(arguments);
},undo:function(){
this._setValueAttr(this._lastValueReported,false);
},reset:function(){
this._hasBeenBlurred=false;
this._setValueAttr(this._resetValue,true);
}});
});
},"dijit/form/_FormWidgetMixin":function(){
define(["dojo/_base/array","dojo/_base/declare","dojo/dom-attr","dojo/dom-style","dojo/_base/lang","dojo/mouse","dojo/on","dojo/sniff","dojo/window","../a11y"],function(_558,_559,_55a,_55b,lang,_55c,on,has,_55d,a11y){
return _559("dijit.form._FormWidgetMixin",null,{name:"",alt:"",value:"",type:"text","aria-label":"focusNode",tabIndex:"0",_setTabIndexAttr:"focusNode",disabled:false,intermediateChanges:false,scrollOnFocus:true,_setIdAttr:"focusNode",_setDisabledAttr:function(_55e){
this._set("disabled",_55e);
_55a.set(this.focusNode,"disabled",_55e);
if(this.valueNode){
_55a.set(this.valueNode,"disabled",_55e);
}
this.focusNode.setAttribute("aria-disabled",_55e?"true":"false");
if(_55e){
this._set("hovering",false);
this._set("active",false);
var _55f="tabIndex" in this.attributeMap?this.attributeMap.tabIndex:("_setTabIndexAttr" in this)?this._setTabIndexAttr:"focusNode";
_558.forEach(lang.isArray(_55f)?_55f:[_55f],function(_560){
var node=this[_560];
if(has("webkit")||a11y.hasDefaultTabStop(node)){
node.setAttribute("tabIndex","-1");
}else{
node.removeAttribute("tabIndex");
}
},this);
}else{
if(this.tabIndex!=""){
this.set("tabIndex",this.tabIndex);
}
}
},_onFocus:function(by){
if(by=="mouse"&&this.isFocusable()){
var _561=this.own(on(this.focusNode,"focus",function(){
_562.remove();
_561.remove();
}))[0];
var _562=this.own(on(this.ownerDocumentBody,"mouseup, touchend",lang.hitch(this,function(evt){
_562.remove();
_561.remove();
if(this.focused){
if(evt.type=="touchend"){
this.defer("focus");
}else{
this.focus();
}
}
})))[0];
}
if(this.scrollOnFocus){
this.defer(function(){
_55d.scrollIntoView(this.domNode);
});
}
this.inherited(arguments);
},isFocusable:function(){
return !this.disabled&&this.focusNode&&(_55b.get(this.domNode,"display")!="none");
},focus:function(){
if(!this.disabled&&this.focusNode.focus){
try{
this.focusNode.focus();
}
catch(e){
}
}
},compare:function(val1,val2){
if(typeof val1=="number"&&typeof val2=="number"){
return (isNaN(val1)&&isNaN(val2))?0:val1-val2;
}else{
if(val1>val2){
return 1;
}else{
if(val1<val2){
return -1;
}else{
return 0;
}
}
}
},onChange:function(){
},_onChangeActive:false,_handleOnChange:function(_563,_564){
if(this._lastValueReported==undefined&&(_564===null||!this._onChangeActive)){
this._resetValue=this._lastValueReported=_563;
}
this._pendingOnChange=this._pendingOnChange||(typeof _563!=typeof this._lastValueReported)||(this.compare(_563,this._lastValueReported)!=0);
if((this.intermediateChanges||_564||_564===undefined)&&this._pendingOnChange){
this._lastValueReported=_563;
this._pendingOnChange=false;
if(this._onChangeActive){
if(this._onChangeHandle){
this._onChangeHandle.remove();
}
this._onChangeHandle=this.defer(function(){
this._onChangeHandle=null;
this.onChange(_563);
});
}
}
},create:function(){
this.inherited(arguments);
this._onChangeActive=true;
},destroy:function(){
if(this._onChangeHandle){
this._onChangeHandle.remove();
this.onChange(this._lastValueReported);
}
this.inherited(arguments);
}});
});
},"dijit/a11yclick":function(){
define(["dojo/keys","dojo/mouse","dojo/on","dojo/touch"],function(keys,_565,on,_566){
function _567(e){
if((e.keyCode===keys.ENTER||e.keyCode===keys.SPACE)&&!/input|button|textarea/i.test(e.target.nodeName)){
for(var node=e.target;node;node=node.parentNode){
if(node.dojoClick){
return true;
}
}
}
};
var _568;
on(document,"keydown",function(e){
if(_567(e)){
_568=e.target;
e.preventDefault();
}else{
_568=null;
}
});
on(document,"keyup",function(e){
if(_567(e)&&e.target==_568){
_568=null;
on.emit(e.target,"click",{cancelable:true,bubbles:true,ctrlKey:e.ctrlKey,shiftKey:e.shiftKey,metaKey:e.metaKey,altKey:e.altKey,_origType:e.type});
}
});
var _569=function(node,_56a){
node.dojoClick=true;
return on(node,"click",_56a);
};
_569.click=_569;
_569.press=function(node,_56b){
var _56c=on(node,_566.press,function(evt){
if(evt.type=="mousedown"&&!_565.isLeft(evt)){
return;
}
_56b(evt);
}),_56d=on(node,"keydown",function(evt){
if(evt.keyCode===keys.ENTER||evt.keyCode===keys.SPACE){
_56b(evt);
}
});
return {remove:function(){
_56c.remove();
_56d.remove();
}};
};
_569.release=function(node,_56e){
var _56f=on(node,_566.release,function(evt){
if(evt.type=="mouseup"&&!_565.isLeft(evt)){
return;
}
_56e(evt);
}),_570=on(node,"keyup",function(evt){
if(evt.keyCode===keys.ENTER||evt.keyCode===keys.SPACE){
_56e(evt);
}
});
return {remove:function(){
_56f.remove();
_570.remove();
}};
};
_569.move=_566.move;
return _569;
});
},"dojo/date":function(){
define(["./has","./_base/lang"],function(has,lang){
var date={};
date.getDaysInMonth=function(_571){
var _572=_571.getMonth();
var days=[31,28,31,30,31,30,31,31,30,31,30,31];
if(_572==1&&date.isLeapYear(_571)){
return 29;
}
return days[_572];
};
date.isLeapYear=function(_573){
var year=_573.getFullYear();
return !(year%400)||(!(year%4)&&!!(year%100));
};
date.getTimezoneName=function(_574){
var str=_574.toString();
var tz="";
var _575;
var pos=str.indexOf("(");
if(pos>-1){
tz=str.substring(++pos,str.indexOf(")"));
}else{
var pat=/([A-Z\/]+) \d{4}$/;
if((_575=str.match(pat))){
tz=_575[1];
}else{
str=_574.toLocaleString();
pat=/ ([A-Z\/]+)$/;
if((_575=str.match(pat))){
tz=_575[1];
}
}
}
return (tz=="AM"||tz=="PM")?"":tz;
};
date.compare=function(_576,_577,_578){
_576=new Date(+_576);
_577=new Date(+(_577||new Date()));
if(_578=="date"){
_576.setHours(0,0,0,0);
_577.setHours(0,0,0,0);
}else{
if(_578=="time"){
_576.setFullYear(0,0,0);
_577.setFullYear(0,0,0);
}
}
if(_576>_577){
return 1;
}
if(_576<_577){
return -1;
}
return 0;
};
date.add=function(date,_579,_57a){
var sum=new Date(+date);
var _57b=false;
var _57c="Date";
switch(_579){
case "day":
break;
case "weekday":
var days,_57d;
var mod=_57a%5;
if(!mod){
days=(_57a>0)?5:-5;
_57d=(_57a>0)?((_57a-5)/5):((_57a+5)/5);
}else{
days=mod;
_57d=parseInt(_57a/5);
}
var strt=date.getDay();
var adj=0;
if(strt==6&&_57a>0){
adj=1;
}else{
if(strt==0&&_57a<0){
adj=-1;
}
}
var trgt=strt+days;
if(trgt==0||trgt==6){
adj=(_57a>0)?2:-2;
}
_57a=(7*_57d)+days+adj;
break;
case "year":
_57c="FullYear";
_57b=true;
break;
case "week":
_57a*=7;
break;
case "quarter":
_57a*=3;
case "month":
_57b=true;
_57c="Month";
break;
default:
_57c="UTC"+_579.charAt(0).toUpperCase()+_579.substring(1)+"s";
}
if(_57c){
sum["set"+_57c](sum["get"+_57c]()+_57a);
}
if(_57b&&(sum.getDate()<date.getDate())){
sum.setDate(0);
}
return sum;
};
date.difference=function(_57e,_57f,_580){
_57f=_57f||new Date();
_580=_580||"day";
var _581=_57f.getFullYear()-_57e.getFullYear();
var _582=1;
switch(_580){
case "quarter":
var m1=_57e.getMonth();
var m2=_57f.getMonth();
var q1=Math.floor(m1/3)+1;
var q2=Math.floor(m2/3)+1;
q2+=(_581*4);
_582=q2-q1;
break;
case "weekday":
var days=Math.round(date.difference(_57e,_57f,"day"));
var _583=parseInt(date.difference(_57e,_57f,"week"));
var mod=days%7;
if(mod==0){
days=_583*5;
}else{
var adj=0;
var aDay=_57e.getDay();
var bDay=_57f.getDay();
_583=parseInt(days/7);
mod=days%7;
var _584=new Date(_57e);
_584.setDate(_584.getDate()+(_583*7));
var _585=_584.getDay();
if(days>0){
switch(true){
case aDay==6:
adj=-1;
break;
case aDay==0:
adj=0;
break;
case bDay==6:
adj=-1;
break;
case bDay==0:
adj=-2;
break;
case (_585+mod)>5:
adj=-2;
}
}else{
if(days<0){
switch(true){
case aDay==6:
adj=0;
break;
case aDay==0:
adj=1;
break;
case bDay==6:
adj=2;
break;
case bDay==0:
adj=1;
break;
case (_585+mod)<0:
adj=2;
}
}
}
days+=adj;
days-=(_583*2);
}
_582=days;
break;
case "year":
_582=_581;
break;
case "month":
_582=(_57f.getMonth()-_57e.getMonth())+(_581*12);
break;
case "week":
_582=parseInt(date.difference(_57e,_57f,"day")/7);
break;
case "day":
_582/=24;
case "hour":
_582/=60;
case "minute":
_582/=60;
case "second":
_582/=1000;
case "millisecond":
_582*=_57f.getTime()-_57e.getTime();
}
return Math.round(_582);
};
1&&lang.mixin(lang.getObject("dojo.date",true),date);
return date;
});
},"dijit/tree/ObjectStoreModel":function(){
define(["dojo/_base/array","dojo/aspect","dojo/_base/declare","dojo/_base/lang","dojo/when"],function(_586,_587,_588,lang,when){
return _588("dijit.tree.ObjectStoreModel",null,{store:null,labelAttr:"name",labelType:"text",root:null,query:null,constructor:function(args){
lang.mixin(this,args);
this.childrenCache={};
},destroy:function(){
for(var id in this.childrenCache){
this.childrenCache[id].close&&this.childrenCache[id].close();
}
},getRoot:function(_589,_58a){
if(this.root){
_589(this.root);
}else{
var res;
when(res=this.store.query(this.query),lang.hitch(this,function(_58b){
if(_58b.length!=1){
throw new Error("dijit.tree.ObjectStoreModel: root query returned "+_58b.length+" items, but must return exactly one");
}
this.root=_58b[0];
_589(this.root);
if(res.observe){
res.observe(lang.hitch(this,function(obj){
this.onChange(obj);
}),true);
}
}),_58a);
}
},mayHaveChildren:function(){
return true;
},getChildren:function(_58c,_58d,_58e){
var id=this.store.getIdentity(_58c);
if(this.childrenCache[id]){
when(this.childrenCache[id],_58d,_58e);
return;
}
var res=this.childrenCache[id]=this.store.getChildren(_58c);
when(res,_58d,_58e);
if(res.observe){
res.observe(lang.hitch(this,function(obj,_58f,_590){
this.onChange(obj);
if(_58f!=_590){
when(res,lang.hitch(this,"onChildrenChange",_58c));
}
}),true);
}
},isItem:function(){
return true;
},getIdentity:function(item){
return this.store.getIdentity(item);
},getLabel:function(item){
return item[this.labelAttr];
},newItem:function(args,_591,_592,_593){
return this.store.put(args,{parent:_591,before:_593});
},pasteItem:function(_594,_595,_596,_597,_598,_599){
if(!_597){
var _59a=[].concat(this.childrenCache[this.getIdentity(_595)]),_59b=_586.indexOf(_59a,_594);
_59a.splice(_59b,1);
this.onChildrenChange(_595,_59a);
}
return this.store.put(_594,{overwrite:true,parent:_596,before:_599});
},onChange:function(){
},onChildrenChange:function(){
},onDelete:function(){
}});
});
},"dijit/Destroyable":function(){
define(["dojo/_base/array","dojo/aspect","dojo/_base/declare"],function(_59c,_59d,_59e){
return _59e("dijit.Destroyable",null,{destroy:function(_59f){
this._destroyed=true;
},own:function(){
_59c.forEach(arguments,function(_5a0){
var _5a1="destroyRecursive" in _5a0?"destroyRecursive":"destroy" in _5a0?"destroy":"remove";
var odh=_59d.before(this,"destroy",function(_5a2){
_5a0[_5a1](_5a2);
});
var hdh=_59d.after(_5a0,_5a1,function(){
odh.remove();
hdh.remove();
},true);
},this);
return arguments;
}});
});
},"dijit/layout/_ContentPaneResizeMixin":function(){
define(["dojo/_base/array","dojo/_base/declare","dojo/dom-class","dojo/dom-geometry","dojo/dom-style","dojo/_base/lang","dojo/query","dojo/sniff","../registry","../Viewport","./utils"],function(_5a3,_5a4,_5a5,_5a6,_5a7,lang,_5a8,has,_5a9,_5aa,_5ab){
return _5a4("dijit.layout._ContentPaneResizeMixin",null,{doLayout:true,isLayoutContainer:true,startup:function(){
if(this._started){
return;
}
var _5ac=this.getParent();
this._childOfLayoutWidget=_5ac&&_5ac.isLayoutContainer;
this._needLayout=!this._childOfLayoutWidget;
this.inherited(arguments);
if(this._isShown()){
this._onShow();
}
if(!this._childOfLayoutWidget){
this.own(_5aa.on("resize",lang.hitch(this,"resize")));
}
},_checkIfSingleChild:function(){
var _5ad=[],_5ae=false;
_5a8("> *",this.containerNode).some(function(node){
var _5af=_5a9.byNode(node);
if(_5af&&_5af.resize){
_5ad.push(_5af);
}else{
if(!/script|link|style/i.test(node.nodeName)&&node.offsetHeight){
_5ae=true;
}
}
});
this._singleChild=_5ad.length==1&&!_5ae?_5ad[0]:null;
_5a5.toggle(this.containerNode,this.baseClass+"SingleChild",!!this._singleChild);
},resize:function(_5b0,_5b1){
this._resizeCalled=true;
this._scheduleLayout(_5b0,_5b1);
},_scheduleLayout:function(_5b2,_5b3){
if(this._isShown()){
this._layout(_5b2,_5b3);
}else{
this._needLayout=true;
this._changeSize=_5b2;
this._resultSize=_5b3;
}
},_layout:function(_5b4,_5b5){
delete this._needLayout;
if(!this._wasShown&&this.open!==false){
this._onShow();
}
if(_5b4){
_5a6.setMarginBox(this.domNode,_5b4);
}
var cn=this.containerNode;
if(cn===this.domNode){
var mb=_5b5||{};
lang.mixin(mb,_5b4||{});
if(!("h" in mb)||!("w" in mb)){
mb=lang.mixin(_5a6.getMarginBox(cn),mb);
}
this._contentBox=_5ab.marginBox2contentBox(cn,mb);
}else{
this._contentBox=_5a6.getContentBox(cn);
}
this._layoutChildren();
},_layoutChildren:function(){
if(this.doLayout){
this._checkIfSingleChild();
}
if(this._singleChild&&this._singleChild.resize){
var cb=this._contentBox||_5a6.getContentBox(this.containerNode);
this._singleChild.resize({w:cb.w,h:cb.h});
}else{
var _5b6=this.getChildren(),_5b7,i=0;
while(_5b7=_5b6[i++]){
if(_5b7.resize){
_5b7.resize();
}
}
}
},_isShown:function(){
if(this._childOfLayoutWidget){
if(this._resizeCalled&&"open" in this){
return this.open;
}
return this._resizeCalled;
}else{
if("open" in this){
return this.open;
}else{
var node=this.domNode,_5b8=this.domNode.parentNode;
return (node.style.display!="none")&&(node.style.visibility!="hidden")&&!_5a5.contains(node,"dijitHidden")&&_5b8&&_5b8.style&&(_5b8.style.display!="none");
}
}
},_onShow:function(){
this._wasShown=true;
if(this._needLayout){
this._layout(this._changeSize,this._resultSize);
}
this.inherited(arguments);
}});
});
},"dijit/WidgetSet":function(){
define(["dojo/_base/array","dojo/_base/declare","dojo/_base/kernel","./registry"],function(_5b9,_5ba,_5bb,_5bc){
var _5bd=_5ba("dijit.WidgetSet",null,{constructor:function(){
this._hash={};
this.length=0;
},add:function(_5be){
if(this._hash[_5be.id]){
throw new Error("Tried to register widget with id=="+_5be.id+" but that id is already registered");
}
this._hash[_5be.id]=_5be;
this.length++;
},remove:function(id){
if(this._hash[id]){
delete this._hash[id];
this.length--;
}
},forEach:function(func,_5bf){
_5bf=_5bf||_5bb.global;
var i=0,id;
for(id in this._hash){
func.call(_5bf,this._hash[id],i++,this._hash);
}
return this;
},filter:function(_5c0,_5c1){
_5c1=_5c1||_5bb.global;
var res=new _5bd(),i=0,id;
for(id in this._hash){
var w=this._hash[id];
if(_5c0.call(_5c1,w,i++,this._hash)){
res.add(w);
}
}
return res;
},byId:function(id){
return this._hash[id];
},byClass:function(cls){
var res=new _5bd(),id,_5c2;
for(id in this._hash){
_5c2=this._hash[id];
if(_5c2.declaredClass==cls){
res.add(_5c2);
}
}
return res;
},toArray:function(){
var ar=[];
for(var id in this._hash){
ar.push(this._hash[id]);
}
return ar;
},map:function(func,_5c3){
return _5b9.map(this.toArray(),func,_5c3);
},every:function(func,_5c4){
_5c4=_5c4||_5bb.global;
var x=0,i;
for(i in this._hash){
if(!func.call(_5c4,this._hash[i],x++,this._hash)){
return false;
}
}
return true;
},some:function(func,_5c5){
_5c5=_5c5||_5bb.global;
var x=0,i;
for(i in this._hash){
if(func.call(_5c5,this._hash[i],x++,this._hash)){
return true;
}
}
return false;
}});
_5b9.forEach(["forEach","filter","byClass","map","every","some"],function(func){
_5bc[func]=_5bd.prototype[func];
});
return _5bd;
});
},"dijit/form/RangeBoundTextBox":function(){
define(["dojo/_base/declare","dojo/i18n","./MappedTextBox"],function(_5c6,i18n,_5c7){
var _5c8=_5c6("dijit.form.RangeBoundTextBox",_5c7,{rangeMessage:"",rangeCheck:function(_5c9,_5ca){
return ("min" in _5ca?(this.compare(_5c9,_5ca.min)>=0):true)&&("max" in _5ca?(this.compare(_5c9,_5ca.max)<=0):true);
},isInRange:function(){
return this.rangeCheck(this.get("value"),this.constraints);
},_isDefinitelyOutOfRange:function(){
var val=this.get("value");
if(val==null){
return false;
}
var _5cb=false;
if("min" in this.constraints){
var min=this.constraints.min;
_5cb=this.compare(val,((typeof min=="number")&&min>=0&&val!=0)?0:min)<0;
}
if(!_5cb&&("max" in this.constraints)){
var max=this.constraints.max;
_5cb=this.compare(val,((typeof max!="number")||max>0)?max:0)>0;
}
return _5cb;
},_isValidSubset:function(){
return this.inherited(arguments)&&!this._isDefinitelyOutOfRange();
},isValid:function(_5cc){
return this.inherited(arguments)&&((this._isEmpty(this.textbox.value)&&!this.required)||this.isInRange(_5cc));
},getErrorMessage:function(_5cd){
var v=this.get("value");
if(v!=null&&v!==""&&(typeof v!="number"||!isNaN(v))&&!this.isInRange(_5cd)){
return this.rangeMessage;
}
return this.inherited(arguments);
},postMixInProperties:function(){
this.inherited(arguments);
if(!this.rangeMessage){
this.messages=i18n.getLocalization("dijit.form","validate",this.lang);
this.rangeMessage=this.messages.rangeMessage;
}
}});
return _5c8;
});
},"dijit/_editor/RichText":function(){
define(["dojo/_base/array","dojo/_base/config","dojo/_base/declare","dojo/_base/Deferred","dojo/dom","dojo/dom-attr","dojo/dom-class","dojo/dom-construct","dojo/dom-geometry","dojo/dom-style","dojo/_base/kernel","dojo/keys","dojo/_base/lang","dojo/on","dojo/query","dojo/domReady","dojo/sniff","dojo/topic","dojo/_base/unload","dojo/_base/url","dojo/window","../_Widget","../_CssStateMixin","../selection","./range","./html","../focus","../main"],function(_5ce,_5cf,_5d0,_5d1,dom,_5d2,_5d3,_5d4,_5d5,_5d6,_5d7,keys,lang,on,_5d8,_5d9,has,_5da,_5db,_5dc,_5dd,_5de,_5df,_5e0,_5e1,_5e2,_5e3,_5e4){
var _5e5=_5d0("dijit._editor.RichText",[_5de,_5df],{constructor:function(_5e6){
this.contentPreFilters=[];
this.contentPostFilters=[];
this.contentDomPreFilters=[];
this.contentDomPostFilters=[];
this.editingAreaStyleSheets=[];
this.events=[].concat(this.events);
this._keyHandlers={};
if(_5e6&&lang.isString(_5e6.value)){
this.value=_5e6.value;
}
this.onLoadDeferred=new _5d1();
},baseClass:"dijitEditor",inheritWidth:false,focusOnLoad:false,name:"",styleSheets:"",height:"300px",minHeight:"1em",isClosed:true,isLoaded:false,_SEPARATOR:"@@**%%__RICHTEXTBOUNDRY__%%**@@",_NAME_CONTENT_SEP:"@@**%%:%%**@@",onLoadDeferred:null,isTabIndent:false,disableSpellCheck:false,postCreate:function(){
if("textarea"===this.domNode.tagName.toLowerCase()){
console.warn("RichText should not be used with the TEXTAREA tag.  See dijit._editor.RichText docs.");
}
this.contentPreFilters=[lang.hitch(this,"_preFixUrlAttributes")].concat(this.contentPreFilters);
if(has("mozilla")){
this.contentPreFilters=[this._normalizeFontStyle].concat(this.contentPreFilters);
this.contentPostFilters=[this._removeMozBogus].concat(this.contentPostFilters);
}
if(has("webkit")){
this.contentPreFilters=[this._removeWebkitBogus].concat(this.contentPreFilters);
this.contentPostFilters=[this._removeWebkitBogus].concat(this.contentPostFilters);
}
if(has("ie")||has("trident")){
this.contentPostFilters=[this._normalizeFontStyle].concat(this.contentPostFilters);
this.contentDomPostFilters=[lang.hitch(this,"_stripBreakerNodes")].concat(this.contentDomPostFilters);
}
this.contentDomPostFilters=[lang.hitch(this,"_stripTrailingEmptyNodes")].concat(this.contentDomPostFilters);
this.inherited(arguments);
_5da.publish(_5e4._scopeName+"._editor.RichText::init",this);
},startup:function(){
this.inherited(arguments);
this.open();
this.setupDefaultShortcuts();
},setupDefaultShortcuts:function(){
var exec=lang.hitch(this,function(cmd,arg){
return function(){
return !this.execCommand(cmd,arg);
};
});
var _5e7={b:exec("bold"),i:exec("italic"),u:exec("underline"),a:exec("selectall"),s:function(){
this.save(true);
},m:function(){
this.isTabIndent=!this.isTabIndent;
},"1":exec("formatblock","h1"),"2":exec("formatblock","h2"),"3":exec("formatblock","h3"),"4":exec("formatblock","h4"),"\\":exec("insertunorderedlist")};
if(!has("ie")){
_5e7.Z=exec("redo");
}
var key;
for(key in _5e7){
this.addKeyHandler(key,true,false,_5e7[key]);
}
},events:["onKeyDown","onKeyUp"],captureEvents:[],_editorCommandsLocalized:false,_localizeEditorCommands:function(){
if(_5e5._editorCommandsLocalized){
this._local2NativeFormatNames=_5e5._local2NativeFormatNames;
this._native2LocalFormatNames=_5e5._native2LocalFormatNames;
return;
}
_5e5._editorCommandsLocalized=true;
_5e5._local2NativeFormatNames={};
_5e5._native2LocalFormatNames={};
this._local2NativeFormatNames=_5e5._local2NativeFormatNames;
this._native2LocalFormatNames=_5e5._native2LocalFormatNames;
var _5e8=["div","p","pre","h1","h2","h3","h4","h5","h6","ol","ul","address"];
var _5e9="",_5ea,i=0;
while((_5ea=_5e8[i++])){
if(_5ea.charAt(1)!=="l"){
_5e9+="<"+_5ea+"><span>content</span></"+_5ea+"><br/>";
}else{
_5e9+="<"+_5ea+"><li>content</li></"+_5ea+"><br/>";
}
}
var _5eb={position:"absolute",top:"0px",zIndex:10,opacity:0.01};
var div=_5d4.create("div",{style:_5eb,innerHTML:_5e9});
this.ownerDocumentBody.appendChild(div);
var _5ec=lang.hitch(this,function(){
var node=div.firstChild;
while(node){
try{
this.selection.selectElement(node.firstChild);
var _5ed=node.tagName.toLowerCase();
this._local2NativeFormatNames[_5ed]=document.queryCommandValue("formatblock");
this._native2LocalFormatNames[this._local2NativeFormatNames[_5ed]]=_5ed;
node=node.nextSibling.nextSibling;
}
catch(e){
}
}
_5d4.destroy(div);
});
this.defer(_5ec);
},open:function(_5ee){
if(!this.onLoadDeferred||this.onLoadDeferred.fired>=0){
this.onLoadDeferred=new _5d1();
}
if(!this.isClosed){
this.close();
}
_5da.publish(_5e4._scopeName+"._editor.RichText::open",this);
if(arguments.length===1&&_5ee.nodeName){
this.domNode=_5ee;
}
var dn=this.domNode;
var html;
if(lang.isString(this.value)){
html=this.value;
delete this.value;
dn.innerHTML="";
}else{
if(dn.nodeName&&dn.nodeName.toLowerCase()=="textarea"){
var ta=(this.textarea=dn);
this.name=ta.name;
html=ta.value;
dn=this.domNode=this.ownerDocument.createElement("div");
dn.setAttribute("widgetId",this.id);
ta.removeAttribute("widgetId");
dn.cssText=ta.cssText;
dn.className+=" "+ta.className;
_5d4.place(dn,ta,"before");
var _5ef=lang.hitch(this,function(){
_5d6.set(ta,{display:"block",position:"absolute",top:"-1000px"});
if(has("ie")){
var s=ta.style;
this.__overflow=s.overflow;
s.overflow="hidden";
}
});
if(has("ie")){
this.defer(_5ef,10);
}else{
_5ef();
}
if(ta.form){
var _5f0=ta.value;
this.reset=function(){
var _5f1=this.getValue();
if(_5f1!==_5f0){
this.replaceValue(_5f0);
}
};
on(ta.form,"submit",lang.hitch(this,function(){
_5d2.set(ta,"disabled",this.disabled);
ta.value=this.getValue();
}));
}
}else{
html=_5e2.getChildrenHtml(dn);
dn.innerHTML="";
}
}
this.value=html;
if(dn.nodeName&&dn.nodeName==="LI"){
dn.innerHTML=" <br>";
}
this.header=dn.ownerDocument.createElement("div");
dn.appendChild(this.header);
this.editingArea=dn.ownerDocument.createElement("div");
dn.appendChild(this.editingArea);
this.footer=dn.ownerDocument.createElement("div");
dn.appendChild(this.footer);
if(!this.name){
this.name=this.id+"_AUTOGEN";
}
if(this.name!==""&&(!_5cf["useXDomain"]||_5cf["allowXdRichTextSave"])){
var _5f2=dom.byId(_5e4._scopeName+"._editor.RichText.value");
if(_5f2&&_5f2.value!==""){
var _5f3=_5f2.value.split(this._SEPARATOR),i=0,dat;
while((dat=_5f3[i++])){
var data=dat.split(this._NAME_CONTENT_SEP);
if(data[0]===this.name){
html=data[1];
_5f3=_5f3.splice(i,1);
_5f2.value=_5f3.join(this._SEPARATOR);
break;
}
}
}
if(!_5e5._globalSaveHandler){
_5e5._globalSaveHandler={};
_5db.addOnUnload(function(){
var id;
for(id in _5e5._globalSaveHandler){
var f=_5e5._globalSaveHandler[id];
if(lang.isFunction(f)){
f();
}
}
});
}
_5e5._globalSaveHandler[this.id]=lang.hitch(this,"_saveContent");
}
this.isClosed=false;
var ifr=(this.editorObject=this.iframe=this.ownerDocument.createElement("iframe"));
ifr.id=this.id+"_iframe";
ifr.style.border="none";
ifr.style.width="100%";
if(this._layoutMode){
ifr.style.height="100%";
}else{
if(has("ie")>=7){
if(this.height){
ifr.style.height=this.height;
}
if(this.minHeight){
ifr.style.minHeight=this.minHeight;
}
}else{
ifr.style.height=this.height?this.height:this.minHeight;
}
}
ifr.frameBorder=0;
ifr._loadFunc=lang.hitch(this,function(w){
this.window=w;
this.document=w.document;
this.selection=new _5e0.SelectionManager(w);
if(has("ie")){
this._localizeEditorCommands();
}
this.onLoad(html);
});
var src=this._getIframeDocTxt().replace(/\\/g,"\\\\").replace(/'/g,"\\'"),s;
if(has("ie")<11){
s="javascript:document.open();try{parent.window;}catch(e){document.domain=\""+document.domain+"\";}"+"document.write('"+src+"');document.close()";
}else{
s="javascript: '"+src+"'";
}
if(has("ie")==9){
this.editingArea.appendChild(ifr);
ifr.src=s;
}else{
ifr.setAttribute("src",s);
this.editingArea.appendChild(ifr);
}
if(dn.nodeName==="LI"){
dn.lastChild.style.marginTop="-1.2em";
}
_5d3.add(this.domNode,this.baseClass);
},_local2NativeFormatNames:{},_native2LocalFormatNames:{},_getIframeDocTxt:function(){
var _5f4=_5d6.getComputedStyle(this.domNode);
var html="<div id='dijitEditorBody'></div>";
var font=[_5f4.fontWeight,_5f4.fontSize,_5f4.fontFamily].join(" ");
var _5f5=_5f4.lineHeight;
if(_5f5.indexOf("px")>=0){
_5f5=parseFloat(_5f5)/parseFloat(_5f4.fontSize);
}else{
if(_5f5.indexOf("em")>=0){
_5f5=parseFloat(_5f5);
}else{
_5f5="normal";
}
}
var _5f6="";
var self=this;
this.style.replace(/(^|;)\s*(line-|font-?)[^;]+/ig,function(_5f7){
_5f7=_5f7.replace(/^;/ig,"")+";";
var s=_5f7.split(":")[0];
if(s){
s=lang.trim(s);
s=s.toLowerCase();
var i;
var sC="";
for(i=0;i<s.length;i++){
var c=s.charAt(i);
switch(c){
case "-":
i++;
c=s.charAt(i).toUpperCase();
default:
sC+=c;
}
}
_5d6.set(self.domNode,sC,"");
}
_5f6+=_5f7+";";
});
var _5f8=_5d8("label[for=\""+this.id+"\"]");
var _5f9="";
if(_5f8.length){
_5f9=_5f8[0].innerHTML;
}else{
if(this["aria-label"]){
_5f9=this["aria-label"];
}else{
if(this["aria-labelledby"]){
_5f9=dom.byId(this["aria-labelledby"]).innerHTML;
}
}
}
this.iframe.setAttribute("title",_5f9);
return ["<!DOCTYPE html>",this.isLeftToRight()?"<html lang='"+this.lang+"'>\n<head>\n":"<html dir='rtl' lang='"+this.lang+"'>\n<head>\n",_5f9?"<title>"+_5f9+"</title>":"","<meta http-equiv='Content-Type' content='text/html'>\n","<style>\n","\tbody,html {\n","\t\tbackground:transparent;\n","\t\tpadding: 1px 0 0 0;\n","\t\tmargin: -1px 0 0 0;\n","\t}\n","\tbody,html,#dijitEditorBody { outline: none; }","html { height: 100%; width: 100%; overflow: hidden; }\n",this.height?"\tbody,#dijitEditorBody { height: 100%; width: 100%; overflow: auto; }\n":"\tbody,#dijitEditorBody { min-height: "+this.minHeight+"; width: 100%; overflow-x: auto; overflow-y: hidden; }\n","\tbody{\n","\t\ttop:0px;\n","\t\tleft:0px;\n","\t\tright:0px;\n","\t\tfont:",font,";\n",((this.height||has("opera"))?"":"\t\tposition: fixed;\n"),"\t\tline-height:",_5f5,";\n","\t}\n","\tp{ margin: 1em 0; }\n","\tli > ul:-moz-first-node, li > ol:-moz-first-node{ padding-top: 1.2em; }\n",(!has("ie")?"\tli{ min-height:1.2em; }\n":""),"</style>\n",this._applyEditingAreaStyleSheets(),"\n","</head>\n<body role='main' ","onload='frameElement && frameElement._loadFunc(window,document)' ","style='"+_5f6+"'>",html,"</body>\n</html>"].join("");
},_applyEditingAreaStyleSheets:function(){
var _5fa=[];
if(this.styleSheets){
_5fa=this.styleSheets.split(";");
this.styleSheets="";
}
_5fa=_5fa.concat(this.editingAreaStyleSheets);
this.editingAreaStyleSheets=[];
var text="",i=0,url,_5fb=_5dd.get(this.ownerDocument);
while((url=_5fa[i++])){
var _5fc=(new _5dc(_5fb.location,url)).toString();
this.editingAreaStyleSheets.push(_5fc);
text+="<link rel=\"stylesheet\" type=\"text/css\" href=\""+_5fc+"\"/>";
}
return text;
},addStyleSheet:function(uri){
var url=uri.toString(),_5fd=_5dd.get(this.ownerDocument);
if(url.charAt(0)==="."||(url.charAt(0)!=="/"&&!uri.host)){
url=(new _5dc(_5fd.location,url)).toString();
}
if(_5ce.indexOf(this.editingAreaStyleSheets,url)>-1){
return;
}
this.editingAreaStyleSheets.push(url);
this.onLoadDeferred.then(lang.hitch(this,function(){
if(this.document.createStyleSheet){
this.document.createStyleSheet(url);
}else{
var head=this.document.getElementsByTagName("head")[0];
var _5fe=this.document.createElement("link");
_5fe.rel="stylesheet";
_5fe.type="text/css";
_5fe.href=url;
head.appendChild(_5fe);
}
}));
},removeStyleSheet:function(uri){
var url=uri.toString(),_5ff=_5dd.get(this.ownerDocument);
if(url.charAt(0)==="."||(url.charAt(0)!=="/"&&!uri.host)){
url=(new _5dc(_5ff.location,url)).toString();
}
var _600=_5ce.indexOf(this.editingAreaStyleSheets,url);
if(_600===-1){
return;
}
delete this.editingAreaStyleSheets[_600];
_5d8("link[href=\""+url+"\"]",this.window.document).orphan();
},disabled:false,_mozSettingProps:{"styleWithCSS":false},_setDisabledAttr:function(_601){
_601=!!_601;
this._set("disabled",_601);
if(!this.isLoaded){
return;
}
var _602=has("ie")&&(this.isLoaded||!this.focusOnLoad);
if(_602){
this.editNode.unselectable="on";
}
this.editNode.contentEditable=!_601;
this.editNode.tabIndex=_601?"-1":this.tabIndex;
if(_602){
this.defer(function(){
if(this.editNode){
this.editNode.unselectable="off";
}
});
}
if(has("mozilla")&&!_601&&this._mozSettingProps){
var ps=this._mozSettingProps;
var n;
for(n in ps){
if(ps.hasOwnProperty(n)){
try{
this.document.execCommand(n,false,ps[n]);
}
catch(e2){
}
}
}
}
this._disabledOK=true;
},onLoad:function(html){
if(!this.window.__registeredWindow){
this.window.__registeredWindow=true;
this._iframeRegHandle=_5e3.registerIframe(this.iframe);
}
this.editNode=this.document.body.firstChild;
var _603=this;
this.beforeIframeNode=_5d4.place("<div tabIndex=-1></div>",this.iframe,"before");
this.afterIframeNode=_5d4.place("<div tabIndex=-1></div>",this.iframe,"after");
this.iframe.onfocus=this.document.onfocus=function(){
_603.editNode.focus();
};
this.focusNode=this.editNode;
var _604=this.events.concat(this.captureEvents);
var ap=this.iframe?this.document:this.editNode;
this.own(_5ce.map(_604,function(item){
var type=item.toLowerCase().replace(/^on/,"");
on(ap,type,lang.hitch(this,item));
},this));
this.own(on(ap,"mouseup",lang.hitch(this,"onClick")));
if(has("ie")){
this.own(on(this.document,"mousedown",lang.hitch(this,"_onIEMouseDown")));
this.editNode.style.zoom=1;
}else{
this.own(on(this.document,"mousedown",lang.hitch(this,function(){
delete this._cursorToStart;
})));
}
if(has("webkit")){
this._webkitListener=this.own(on(this.document,"mouseup",lang.hitch(this,"onDisplayChanged")))[0];
this.own(on(this.document,"mousedown",lang.hitch(this,function(e){
var t=e.target;
if(t&&(t===this.document.body||t===this.document)){
this.defer("placeCursorAtEnd");
}
})));
}
if(has("ie")){
try{
this.document.execCommand("RespectVisibilityInDesign",true,null);
}
catch(e){
}
}
this.isLoaded=true;
this.set("disabled",this.disabled);
var _605=lang.hitch(this,function(){
this.setValue(html);
if(this.onLoadDeferred){
this.onLoadDeferred.resolve(true);
}
this.onDisplayChanged();
if(this.focusOnLoad){
_5d9(lang.hitch(this,"defer","focus",this.updateInterval));
}
this.value=this.getValue(true);
});
if(this.setValueDeferred){
this.setValueDeferred.then(_605);
}else{
_605();
}
},onKeyDown:function(e){
if(e.keyCode===keys.TAB&&this.isTabIndent){
e.stopPropagation();
e.preventDefault();
if(this.queryCommandEnabled((e.shiftKey?"outdent":"indent"))){
this.execCommand((e.shiftKey?"outdent":"indent"));
}
}
if(e.keyCode==keys.TAB&&!this.isTabIndent){
if(e.shiftKey&&!e.ctrlKey&&!e.altKey){
this.beforeIframeNode.focus();
}else{
if(!e.shiftKey&&!e.ctrlKey&&!e.altKey){
this.afterIframeNode.focus();
}
}
}
if(has("ie")<9&&e.keyCode===keys.BACKSPACE&&this.document.selection.type==="Control"){
e.stopPropagation();
e.preventDefault();
this.execCommand("delete");
}
if(has("ff")){
if(e.keyCode===keys.PAGE_UP||e.keyCode===keys.PAGE_DOWN){
if(this.editNode.clientHeight>=this.editNode.scrollHeight){
e.preventDefault();
}
}
}
var _606=this._keyHandlers[e.keyCode],args=arguments;
if(_606&&!e.altKey){
_5ce.some(_606,function(h){
if(!(h.shift^e.shiftKey)&&!(h.ctrl^(e.ctrlKey||e.metaKey))){
if(!h.handler.apply(this,args)){
e.preventDefault();
}
return true;
}
},this);
}
this.defer("onKeyPressed",1);
return true;
},onKeyUp:function(){
},setDisabled:function(_607){
_5d7.deprecated("dijit.Editor::setDisabled is deprecated","use dijit.Editor::attr(\"disabled\",boolean) instead",2);
this.set("disabled",_607);
},_setValueAttr:function(_608){
this.setValue(_608);
},_setDisableSpellCheckAttr:function(_609){
if(this.document){
_5d2.set(this.document.body,"spellcheck",!_609);
}else{
this.onLoadDeferred.then(lang.hitch(this,function(){
_5d2.set(this.document.body,"spellcheck",!_609);
}));
}
this._set("disableSpellCheck",_609);
},addKeyHandler:function(key,ctrl,_60a,_60b){
if(typeof key=="string"){
key=key.toUpperCase().charCodeAt(0);
}
if(!lang.isArray(this._keyHandlers[key])){
this._keyHandlers[key]=[];
}
this._keyHandlers[key].push({shift:_60a||false,ctrl:ctrl||false,handler:_60b});
},onKeyPressed:function(){
this.onDisplayChanged();
},onClick:function(e){
this.onDisplayChanged(e);
},_onIEMouseDown:function(){
if(!this.focused&&!this.disabled){
this.focus();
}
},_onBlur:function(e){
if(has("ie")>=9){
this.defer(function(){
if(!_5e3.curNode){
this.ownerDocumentBody.focus();
}
});
}
this.inherited(arguments);
var _60c=this.getValue(true);
if(_60c!==this.value){
this.onChange(_60c);
}
this._set("value",_60c);
},_onFocus:function(e){
if(!this.disabled){
if(!this._disabledOK){
this.set("disabled",false);
}
this.inherited(arguments);
}
},blur:function(){
if(!has("ie")&&this.window.document.documentElement&&this.window.document.documentElement.focus){
this.window.document.documentElement.focus();
}else{
if(this.ownerDocumentBody.focus){
this.ownerDocumentBody.focus();
}
}
},focus:function(){
if(!this.isLoaded){
this.focusOnLoad=true;
return;
}
if(this._cursorToStart){
delete this._cursorToStart;
if(this.editNode.childNodes){
this.placeCursorAtStart();
return;
}
}
if(has("ie")<9){
this.iframe.fireEvent("onfocus",document.createEventObject());
}else{
this.editNode.focus();
}
},updateInterval:200,_updateTimer:null,onDisplayChanged:function(){
if(this._updateTimer){
this._updateTimer.remove();
}
this._updateTimer=this.defer("onNormalizedDisplayChanged",this.updateInterval);
},onNormalizedDisplayChanged:function(){
delete this._updateTimer;
},onChange:function(){
},_normalizeCommand:function(cmd,_60d){
var _60e=cmd.toLowerCase();
if(_60e==="formatblock"){
if(has("safari")&&_60d===undefined){
_60e="heading";
}
}else{
if(_60e==="hilitecolor"&&!has("mozilla")){
_60e="backcolor";
}
}
return _60e;
},_qcaCache:{},queryCommandAvailable:function(_60f){
var ca=this._qcaCache[_60f];
if(ca!==undefined){
return ca;
}
return (this._qcaCache[_60f]=this._queryCommandAvailable(_60f));
},_queryCommandAvailable:function(_610){
var ie=1;
var _611=1<<1;
var _612=1<<2;
var _613=1<<3;
function _614(_615){
return {ie:Boolean(_615&ie),mozilla:Boolean(_615&_611),webkit:Boolean(_615&_612),opera:Boolean(_615&_613)};
};
var _616=null;
switch(_610.toLowerCase()){
case "bold":
case "italic":
case "underline":
case "subscript":
case "superscript":
case "fontname":
case "fontsize":
case "forecolor":
case "hilitecolor":
case "justifycenter":
case "justifyfull":
case "justifyleft":
case "justifyright":
case "delete":
case "selectall":
case "toggledir":
_616=_614(_611|ie|_612|_613);
break;
case "createlink":
case "unlink":
case "removeformat":
case "inserthorizontalrule":
case "insertimage":
case "insertorderedlist":
case "insertunorderedlist":
case "indent":
case "outdent":
case "formatblock":
case "inserthtml":
case "undo":
case "redo":
case "strikethrough":
case "tabindent":
_616=_614(_611|ie|_613|_612);
break;
case "blockdirltr":
case "blockdirrtl":
case "dirltr":
case "dirrtl":
case "inlinedirltr":
case "inlinedirrtl":
_616=_614(ie);
break;
case "cut":
case "copy":
case "paste":
_616=_614(ie|_611|_612|_613);
break;
case "inserttable":
_616=_614(_611|ie);
break;
case "insertcell":
case "insertcol":
case "insertrow":
case "deletecells":
case "deletecols":
case "deleterows":
case "mergecells":
case "splitcell":
_616=_614(ie|_611);
break;
default:
return false;
}
return ((has("ie")||has("trident"))&&_616.ie)||(has("mozilla")&&_616.mozilla)||(has("webkit")&&_616.webkit)||(has("opera")&&_616.opera);
},execCommand:function(_617,_618){
var _619;
if(this.focused){
this.focus();
}
_617=this._normalizeCommand(_617,_618);
if(_618!==undefined){
if(_617==="heading"){
throw new Error("unimplemented");
}else{
if(_617==="formatblock"&&(has("ie")||has("trident"))){
_618="<"+_618+">";
}
}
}
var _61a="_"+_617+"Impl";
if(this[_61a]){
_619=this[_61a](_618);
}else{
_618=arguments.length>1?_618:null;
if(_618||_617!=="createlink"){
_619=this.document.execCommand(_617,false,_618);
}
}
this.onDisplayChanged();
return _619;
},queryCommandEnabled:function(_61b){
if(this.disabled||!this._disabledOK){
return false;
}
_61b=this._normalizeCommand(_61b);
var _61c="_"+_61b+"EnabledImpl";
if(this[_61c]){
return this[_61c](_61b);
}else{
return this._browserQueryCommandEnabled(_61b);
}
},queryCommandState:function(_61d){
if(this.disabled||!this._disabledOK){
return false;
}
_61d=this._normalizeCommand(_61d);
try{
return this.document.queryCommandState(_61d);
}
catch(e){
return false;
}
},queryCommandValue:function(_61e){
if(this.disabled||!this._disabledOK){
return false;
}
var r;
_61e=this._normalizeCommand(_61e);
if((has("ie")||has("trident"))&&_61e==="formatblock"){
r=this._native2LocalFormatNames[this.document.queryCommandValue(_61e)];
}else{
if(has("mozilla")&&_61e==="hilitecolor"){
var _61f;
try{
_61f=this.document.queryCommandValue("styleWithCSS");
}
catch(e){
_61f=false;
}
this.document.execCommand("styleWithCSS",false,true);
r=this.document.queryCommandValue(_61e);
this.document.execCommand("styleWithCSS",false,_61f);
}else{
r=this.document.queryCommandValue(_61e);
}
}
return r;
},_sCall:function(name,args){
return this.selection[name].apply(this.selection,args);
},placeCursorAtStart:function(){
this.focus();
var _620=false;
if(has("mozilla")){
var _621=this.editNode.firstChild;
while(_621){
if(_621.nodeType===3){
if(_621.nodeValue.replace(/^\s+|\s+$/g,"").length>0){
_620=true;
this.selection.selectElement(_621);
break;
}
}else{
if(_621.nodeType===1){
_620=true;
var tg=_621.tagName?_621.tagName.toLowerCase():"";
if(/br|input|img|base|meta|area|basefont|hr|link/.test(tg)){
this.selection.selectElement(_621);
}else{
this.selection.selectElementChildren(_621);
}
break;
}
}
_621=_621.nextSibling;
}
}else{
_620=true;
this.selection.selectElementChildren(this.editNode);
}
if(_620){
this.selection.collapse(true);
}
},placeCursorAtEnd:function(){
this.focus();
var _622=false;
if(has("mozilla")){
var last=this.editNode.lastChild;
while(last){
if(last.nodeType===3){
if(last.nodeValue.replace(/^\s+|\s+$/g,"").length>0){
_622=true;
this.selection.selectElement(last);
break;
}
}else{
if(last.nodeType===1){
_622=true;
this.selection.selectElement(last.lastChild||last);
break;
}
}
last=last.previousSibling;
}
}else{
_622=true;
this.selection.selectElementChildren(this.editNode);
}
if(_622){
this.selection.collapse(false);
}
},getValue:function(_623){
if(this.textarea){
if(this.isClosed||!this.isLoaded){
return this.textarea.value;
}
}
return this._postFilterContent(null,_623);
},_getValueAttr:function(){
return this.getValue(true);
},setValue:function(html){
if(!this.isLoaded){
this.onLoadDeferred.then(lang.hitch(this,function(){
this.setValue(html);
}));
return;
}
this._cursorToStart=true;
if(this.textarea&&(this.isClosed||!this.isLoaded)){
this.textarea.value=html;
}else{
html=this._preFilterContent(html);
var node=this.isClosed?this.domNode:this.editNode;
if(!html&&has("webkit")){
html="&#160;";
}
node.innerHTML=html;
this._preDomFilterContent(node);
}
this.onDisplayChanged();
this._set("value",this.getValue(true));
},replaceValue:function(html){
if(this.isClosed){
this.setValue(html);
}else{
if(this.window&&this.window.getSelection&&!has("mozilla")){
this.setValue(html);
}else{
if(this.window&&this.window.getSelection){
html=this._preFilterContent(html);
this.execCommand("selectall");
this.execCommand("inserthtml",html);
this._preDomFilterContent(this.editNode);
}else{
if(this.document&&this.document.selection){
this.setValue(html);
}
}
}
}
this._set("value",this.getValue(true));
},_preFilterContent:function(html){
var ec=html;
_5ce.forEach(this.contentPreFilters,function(ef){
if(ef){
ec=ef(ec);
}
});
return ec;
},_preDomFilterContent:function(dom){
dom=dom||this.editNode;
_5ce.forEach(this.contentDomPreFilters,function(ef){
if(ef&&lang.isFunction(ef)){
ef(dom);
}
},this);
},_postFilterContent:function(dom,_624){
var ec;
if(!lang.isString(dom)){
dom=dom||this.editNode;
if(this.contentDomPostFilters.length){
if(_624){
dom=lang.clone(dom);
}
_5ce.forEach(this.contentDomPostFilters,function(ef){
dom=ef(dom);
});
}
ec=_5e2.getChildrenHtml(dom);
}else{
ec=dom;
}
if(!lang.trim(ec.replace(/^\xA0\xA0*/,"").replace(/\xA0\xA0*$/,"")).length){
ec="";
}
_5ce.forEach(this.contentPostFilters,function(ef){
ec=ef(ec);
});
return ec;
},_saveContent:function(){
var _625=dom.byId(_5e4._scopeName+"._editor.RichText.value");
if(_625){
if(_625.value){
_625.value+=this._SEPARATOR;
}
_625.value+=this.name+this._NAME_CONTENT_SEP+this.getValue(true);
}
},escapeXml:function(str,_626){
str=str.replace(/&/gm,"&amp;").replace(/</gm,"&lt;").replace(/>/gm,"&gt;").replace(/"/gm,"&quot;");
if(!_626){
str=str.replace(/'/gm,"&#39;");
}
return str;
},getNodeHtml:function(node){
_5d7.deprecated("dijit.Editor::getNodeHtml is deprecated","use dijit/_editor/html::getNodeHtml instead",2);
return _5e2.getNodeHtml(node);
},getNodeChildrenHtml:function(dom){
_5d7.deprecated("dijit.Editor::getNodeChildrenHtml is deprecated","use dijit/_editor/html::getChildrenHtml instead",2);
return _5e2.getChildrenHtml(dom);
},close:function(save){
if(this.isClosed){
return;
}
if(!arguments.length){
save=true;
}
if(save){
this._set("value",this.getValue(true));
}
if(this.interval){
clearInterval(this.interval);
}
if(this._webkitListener){
this._webkitListener.remove();
delete this._webkitListener;
}
if(has("ie")){
this.iframe.onfocus=null;
}
this.iframe._loadFunc=null;
if(this._iframeRegHandle){
this._iframeRegHandle.remove();
delete this._iframeRegHandle;
}
if(this.textarea){
var s=this.textarea.style;
s.position="";
s.left=s.top="";
if(has("ie")){
s.overflow=this.__overflow;
this.__overflow=null;
}
this.textarea.value=this.value;
_5d4.destroy(this.domNode);
this.domNode=this.textarea;
}else{
this.domNode.innerHTML=this.value;
}
delete this.iframe;
_5d3.remove(this.domNode,this.baseClass);
this.isClosed=true;
this.isLoaded=false;
delete this.editNode;
delete this.focusNode;
if(this.window&&this.window._frameElement){
this.window._frameElement=null;
}
this.window=null;
this.document=null;
this.editingArea=null;
this.editorObject=null;
},destroy:function(){
if(!this.isClosed){
this.close(false);
}
if(this._updateTimer){
this._updateTimer.remove();
}
this.inherited(arguments);
if(_5e5._globalSaveHandler){
delete _5e5._globalSaveHandler[this.id];
}
},_removeMozBogus:function(html){
return html.replace(/\stype="_moz"/gi,"").replace(/\s_moz_dirty=""/gi,"").replace(/_moz_resizing="(true|false)"/gi,"");
},_removeWebkitBogus:function(html){
html=html.replace(/\sclass="webkit-block-placeholder"/gi,"");
html=html.replace(/\sclass="apple-style-span"/gi,"");
html=html.replace(/<meta charset=\"utf-8\" \/>/gi,"");
return html;
},_normalizeFontStyle:function(html){
return html.replace(/<(\/)?strong([ \>])/gi,"<$1b$2").replace(/<(\/)?em([ \>])/gi,"<$1i$2");
},_preFixUrlAttributes:function(html){
return html.replace(/(?:(<a(?=\s).*?\shref=)("|')(.*?)\2)|(?:(<a\s.*?href=)([^"'][^ >]+))/gi,"$1$4$2$3$5$2 _djrealurl=$2$3$5$2").replace(/(?:(<img(?=\s).*?\ssrc=)("|')(.*?)\2)|(?:(<img\s.*?src=)([^"'][^ >]+))/gi,"$1$4$2$3$5$2 _djrealurl=$2$3$5$2");
},_browserQueryCommandEnabled:function(_627){
if(!_627){
return false;
}
var elem=has("ie")<9?this.document.selection.createRange():this.document;
try{
return elem.queryCommandEnabled(_627);
}
catch(e){
return false;
}
},_createlinkEnabledImpl:function(){
var _628=true;
if(has("opera")){
var sel=this.window.getSelection();
if(sel.isCollapsed){
_628=true;
}else{
_628=this.document.queryCommandEnabled("createlink");
}
}else{
_628=this._browserQueryCommandEnabled("createlink");
}
return _628;
},_unlinkEnabledImpl:function(){
var _629=true;
if(has("mozilla")||has("webkit")){
_629=this.selection.hasAncestorElement("a");
}else{
_629=this._browserQueryCommandEnabled("unlink");
}
return _629;
},_inserttableEnabledImpl:function(){
var _62a=true;
if(has("mozilla")||has("webkit")){
_62a=true;
}else{
_62a=this._browserQueryCommandEnabled("inserttable");
}
return _62a;
},_cutEnabledImpl:function(){
var _62b=true;
if(has("webkit")){
var sel=this.window.getSelection();
if(sel){
sel=sel.toString();
}
_62b=!!sel;
}else{
_62b=this._browserQueryCommandEnabled("cut");
}
return _62b;
},_copyEnabledImpl:function(){
var _62c=true;
if(has("webkit")){
var sel=this.window.getSelection();
if(sel){
sel=sel.toString();
}
_62c=!!sel;
}else{
_62c=this._browserQueryCommandEnabled("copy");
}
return _62c;
},_pasteEnabledImpl:function(){
var _62d=true;
if(has("webkit")){
return true;
}else{
_62d=this._browserQueryCommandEnabled("paste");
}
return _62d;
},_inserthorizontalruleImpl:function(_62e){
if(has("ie")){
return this._inserthtmlImpl("<hr>");
}
return this.document.execCommand("inserthorizontalrule",false,_62e);
},_unlinkImpl:function(_62f){
if((this.queryCommandEnabled("unlink"))&&(has("mozilla")||has("webkit"))){
var a=this.selection.getAncestorElement("a");
this.selection.selectElement(a);
return this.document.execCommand("unlink",false,null);
}
return this.document.execCommand("unlink",false,_62f);
},_hilitecolorImpl:function(_630){
var _631;
var _632=this._handleTextColorOrProperties("hilitecolor",_630);
if(!_632){
if(has("mozilla")){
this.document.execCommand("styleWithCSS",false,true);
_631=this.document.execCommand("hilitecolor",false,_630);
this.document.execCommand("styleWithCSS",false,false);
}else{
_631=this.document.execCommand("hilitecolor",false,_630);
}
}
return _631;
},_backcolorImpl:function(_633){
if(has("ie")){
_633=_633?_633:null;
}
var _634=this._handleTextColorOrProperties("backcolor",_633);
if(!_634){
_634=this.document.execCommand("backcolor",false,_633);
}
return _634;
},_forecolorImpl:function(_635){
if(has("ie")){
_635=_635?_635:null;
}
var _636=false;
_636=this._handleTextColorOrProperties("forecolor",_635);
if(!_636){
_636=this.document.execCommand("forecolor",false,_635);
}
return _636;
},_inserthtmlImpl:function(_637){
_637=this._preFilterContent(_637);
var rv=true;
if(has("ie")<9){
var _638=this.document.selection.createRange();
if(this.document.selection.type.toUpperCase()==="CONTROL"){
var n=_638.item(0);
while(_638.length){
_638.remove(_638.item(0));
}
n.outerHTML=_637;
}else{
_638.pasteHTML(_637);
}
_638.select();
}else{
if(has("trident")<8){
var _638;
var _639=_5e1.getSelection(this.window);
if(_639&&_639.rangeCount&&_639.getRangeAt){
_638=_639.getRangeAt(0);
_638.deleteContents();
var div=_5d4.create("div");
div.innerHTML=_637;
var node,_63a;
var n=this.document.createDocumentFragment();
while((node=div.firstChild)){
_63a=n.appendChild(node);
}
_638.insertNode(n);
if(_63a){
_638=_638.cloneRange();
_638.setStartAfter(_63a);
_638.collapse(false);
_639.removeAllRanges();
_639.addRange(_638);
}
}
}else{
if(has("mozilla")&&!_637.length){
this.selection.remove();
}else{
rv=this.document.execCommand("inserthtml",false,_637);
}
}
}
return rv;
},_boldImpl:function(_63b){
var _63c=false;
if(has("ie")){
this._adaptIESelection();
_63c=this._adaptIEFormatAreaAndExec("bold");
}
if(!_63c){
_63c=this.document.execCommand("bold",false,_63b);
}
return _63c;
},_italicImpl:function(_63d){
var _63e=false;
if(has("ie")){
this._adaptIESelection();
_63e=this._adaptIEFormatAreaAndExec("italic");
}
if(!_63e){
_63e=this.document.execCommand("italic",false,_63d);
}
return _63e;
},_underlineImpl:function(_63f){
var _640=false;
if(has("ie")){
this._adaptIESelection();
_640=this._adaptIEFormatAreaAndExec("underline");
}
if(!_640){
_640=this.document.execCommand("underline",false,_63f);
}
return _640;
},_strikethroughImpl:function(_641){
var _642=false;
if(has("ie")){
this._adaptIESelection();
_642=this._adaptIEFormatAreaAndExec("strikethrough");
}
if(!_642){
_642=this.document.execCommand("strikethrough",false,_641);
}
return _642;
},_superscriptImpl:function(_643){
var _644=false;
if(has("ie")){
this._adaptIESelection();
_644=this._adaptIEFormatAreaAndExec("superscript");
}
if(!_644){
_644=this.document.execCommand("superscript",false,_643);
}
return _644;
},_subscriptImpl:function(_645){
var _646=false;
if(has("ie")){
this._adaptIESelection();
_646=this._adaptIEFormatAreaAndExec("subscript");
}
if(!_646){
_646=this.document.execCommand("subscript",false,_645);
}
return _646;
},_fontnameImpl:function(_647){
var _648;
if(has("ie")){
_648=this._handleTextColorOrProperties("fontname",_647);
}
if(!_648){
_648=this.document.execCommand("fontname",false,_647);
}
return _648;
},_fontsizeImpl:function(_649){
var _64a;
if(has("ie")){
_64a=this._handleTextColorOrProperties("fontsize",_649);
}
if(!_64a){
_64a=this.document.execCommand("fontsize",false,_649);
}
return _64a;
},_insertorderedlistImpl:function(_64b){
var _64c=false;
if(has("ie")){
_64c=this._adaptIEList("insertorderedlist",_64b);
}
if(!_64c){
_64c=this.document.execCommand("insertorderedlist",false,_64b);
}
return _64c;
},_insertunorderedlistImpl:function(_64d){
var _64e=false;
if(has("ie")){
_64e=this._adaptIEList("insertunorderedlist",_64d);
}
if(!_64e){
_64e=this.document.execCommand("insertunorderedlist",false,_64d);
}
return _64e;
},getHeaderHeight:function(){
return this._getNodeChildrenHeight(this.header);
},getFooterHeight:function(){
return this._getNodeChildrenHeight(this.footer);
},_getNodeChildrenHeight:function(node){
var h=0;
if(node&&node.childNodes){
var i;
for(i=0;i<node.childNodes.length;i++){
var size=_5d5.position(node.childNodes[i]);
h+=size.h;
}
}
return h;
},_isNodeEmpty:function(node,_64f){
if(node.nodeType===1){
if(node.childNodes.length>0){
return this._isNodeEmpty(node.childNodes[0],_64f);
}
return true;
}else{
if(node.nodeType===3){
return (node.nodeValue.substring(_64f)==="");
}
}
return false;
},_removeStartingRangeFromRange:function(node,_650){
if(node.nextSibling){
_650.setStart(node.nextSibling,0);
}else{
var _651=node.parentNode;
while(_651&&_651.nextSibling==null){
_651=_651.parentNode;
}
if(_651){
_650.setStart(_651.nextSibling,0);
}
}
return _650;
},_adaptIESelection:function(){
var _652=_5e1.getSelection(this.window);
if(_652&&_652.rangeCount&&!_652.isCollapsed){
var _653=_652.getRangeAt(0);
var _654=_653.startContainer;
var _655=_653.startOffset;
while(_654.nodeType===3&&_655>=_654.length&&_654.nextSibling){
_655=_655-_654.length;
_654=_654.nextSibling;
}
var _656=null;
while(this._isNodeEmpty(_654,_655)&&_654!==_656){
_656=_654;
_653=this._removeStartingRangeFromRange(_654,_653);
_654=_653.startContainer;
_655=0;
}
_652.removeAllRanges();
_652.addRange(_653);
}
},_adaptIEFormatAreaAndExec:function(_657){
var _658=_5e1.getSelection(this.window);
var doc=this.document;
var rs,ret,_659,txt,_65a,_65b,_65c,_65d;
if(_657&&_658&&_658.isCollapsed){
var _65e=this.queryCommandValue(_657);
if(_65e){
var _65f=this._tagNamesForCommand(_657);
_659=_658.getRangeAt(0);
var fs=_659.startContainer;
if(fs.nodeType===3){
var _660=_659.endOffset;
if(fs.length<_660){
ret=this._adjustNodeAndOffset(rs,_660);
fs=ret.node;
_660=ret.offset;
}
}
var _661;
while(fs&&fs!==this.editNode){
var _662=fs.tagName?fs.tagName.toLowerCase():"";
if(_5ce.indexOf(_65f,_662)>-1){
_661=fs;
break;
}
fs=fs.parentNode;
}
if(_661){
rs=_659.startContainer;
var _663=doc.createElement(_661.tagName);
_5d4.place(_663,_661,"after");
if(rs&&rs.nodeType===3){
var _664,_665;
var _666=_659.endOffset;
if(rs.length<_666){
ret=this._adjustNodeAndOffset(rs,_666);
rs=ret.node;
_666=ret.offset;
}
txt=rs.nodeValue;
_65a=doc.createTextNode(txt.substring(0,_666));
var _667=txt.substring(_666,txt.length);
if(_667){
_65b=doc.createTextNode(_667);
}
_5d4.place(_65a,rs,"before");
if(_65b){
_65c=doc.createElement("span");
_65c.className="ieFormatBreakerSpan";
_5d4.place(_65c,rs,"after");
_5d4.place(_65b,_65c,"after");
_65b=_65c;
}
_5d4.destroy(rs);
var _668=_65a.parentNode;
var _669=[];
var _66a;
while(_668!==_661){
var tg=_668.tagName;
_66a={tagName:tg};
_669.push(_66a);
var _66b=doc.createElement(tg);
if(_668.style){
if(_66b.style){
if(_668.style.cssText){
_66b.style.cssText=_668.style.cssText;
_66a.cssText=_668.style.cssText;
}
}
}
if(_668.tagName==="FONT"){
if(_668.color){
_66b.color=_668.color;
_66a.color=_668.color;
}
if(_668.face){
_66b.face=_668.face;
_66a.face=_668.face;
}
if(_668.size){
_66b.size=_668.size;
_66a.size=_668.size;
}
}
if(_668.className){
_66b.className=_668.className;
_66a.className=_668.className;
}
if(_65b){
_664=_65b;
while(_664){
_665=_664.nextSibling;
_66b.appendChild(_664);
_664=_665;
}
}
if(_66b.tagName==_668.tagName){
_65c=doc.createElement("span");
_65c.className="ieFormatBreakerSpan";
_5d4.place(_65c,_668,"after");
_5d4.place(_66b,_65c,"after");
}else{
_5d4.place(_66b,_668,"after");
}
_65a=_668;
_65b=_66b;
_668=_668.parentNode;
}
if(_65b){
_664=_65b;
if(_664.nodeType===1||(_664.nodeType===3&&_664.nodeValue)){
_663.innerHTML="";
}
while(_664){
_665=_664.nextSibling;
_663.appendChild(_664);
_664=_665;
}
}
var _66c;
if(_669.length){
_66a=_669.pop();
var _66d=doc.createElement(_66a.tagName);
if(_66a.cssText&&_66d.style){
_66d.style.cssText=_66a.cssText;
}
if(_66a.className){
_66d.className=_66a.className;
}
if(_66a.tagName==="FONT"){
if(_66a.color){
_66d.color=_66a.color;
}
if(_66a.face){
_66d.face=_66a.face;
}
if(_66a.size){
_66d.size=_66a.size;
}
}
_5d4.place(_66d,_663,"before");
while(_669.length){
_66a=_669.pop();
var _66e=doc.createElement(_66a.tagName);
if(_66a.cssText&&_66e.style){
_66e.style.cssText=_66a.cssText;
}
if(_66a.className){
_66e.className=_66a.className;
}
if(_66a.tagName==="FONT"){
if(_66a.color){
_66e.color=_66a.color;
}
if(_66a.face){
_66e.face=_66a.face;
}
if(_66a.size){
_66e.size=_66a.size;
}
}
_66d.appendChild(_66e);
_66d=_66e;
}
_65d=doc.createTextNode(".");
_65c.appendChild(_65d);
_66d.appendChild(_65d);
_66c=_5e1.create(this.window);
_66c.setStart(_65d,0);
_66c.setEnd(_65d,_65d.length);
_658.removeAllRanges();
_658.addRange(_66c);
this.selection.collapse(false);
_65d.parentNode.innerHTML="";
}else{
_65c=doc.createElement("span");
_65c.className="ieFormatBreakerSpan";
_65d=doc.createTextNode(".");
_65c.appendChild(_65d);
_5d4.place(_65c,_663,"before");
_66c=_5e1.create(this.window);
_66c.setStart(_65d,0);
_66c.setEnd(_65d,_65d.length);
_658.removeAllRanges();
_658.addRange(_66c);
this.selection.collapse(false);
_65d.parentNode.innerHTML="";
}
if(!_663.firstChild){
_5d4.destroy(_663);
}
return true;
}
}
return false;
}else{
_659=_658.getRangeAt(0);
rs=_659.startContainer;
if(rs&&rs.nodeType===3){
var _660=_659.startOffset;
if(rs.length<_660){
ret=this._adjustNodeAndOffset(rs,_660);
rs=ret.node;
_660=ret.offset;
}
txt=rs.nodeValue;
_65a=doc.createTextNode(txt.substring(0,_660));
var _667=txt.substring(_660);
if(_667!==""){
_65b=doc.createTextNode(txt.substring(_660));
}
_65c=doc.createElement("span");
_65d=doc.createTextNode(".");
_65c.appendChild(_65d);
if(_65a.length){
_5d4.place(_65a,rs,"after");
}else{
_65a=rs;
}
_5d4.place(_65c,_65a,"after");
if(_65b){
_5d4.place(_65b,_65c,"after");
}
_5d4.destroy(rs);
var _66c=_5e1.create(this.window);
_66c.setStart(_65d,0);
_66c.setEnd(_65d,_65d.length);
_658.removeAllRanges();
_658.addRange(_66c);
doc.execCommand(_657);
_5d4.place(_65c.firstChild,_65c,"before");
_5d4.destroy(_65c);
_66c.setStart(_65d,0);
_66c.setEnd(_65d,_65d.length);
_658.removeAllRanges();
_658.addRange(_66c);
this.selection.collapse(false);
_65d.parentNode.innerHTML="";
return true;
}
}
}else{
return false;
}
},_adaptIEList:function(_66f){
var _670=_5e1.getSelection(this.window);
if(_670.isCollapsed){
if(_670.rangeCount&&!this.queryCommandValue(_66f)){
var _671=_670.getRangeAt(0);
var sc=_671.startContainer;
if(sc&&sc.nodeType==3){
if(!_671.startOffset){
var _672="ul";
if(_66f==="insertorderedlist"){
_672="ol";
}
var list=this.document.createElement(_672);
var li=_5d4.create("li",null,list);
_5d4.place(list,sc,"before");
li.appendChild(sc);
_5d4.create("br",null,list,"after");
var _673=_5e1.create(this.window);
_673.setStart(sc,0);
_673.setEnd(sc,sc.length);
_670.removeAllRanges();
_670.addRange(_673);
this.selection.collapse(true);
return true;
}
}
}
}
return false;
},_handleTextColorOrProperties:function(_674,_675){
var _676=_5e1.getSelection(this.window);
var doc=this.document;
var rs,ret,_677,txt,_678,_679,_67a,_67b;
_675=_675||null;
if(_674&&_676&&_676.isCollapsed){
if(_676.rangeCount){
_677=_676.getRangeAt(0);
rs=_677.startContainer;
if(rs&&rs.nodeType===3){
var _67c=_677.startOffset;
if(rs.length<_67c){
ret=this._adjustNodeAndOffset(rs,_67c);
rs=ret.node;
_67c=ret.offset;
}
txt=rs.nodeValue;
_678=doc.createTextNode(txt.substring(0,_67c));
var _67d=txt.substring(_67c);
if(_67d!==""){
_679=doc.createTextNode(txt.substring(_67c));
}
_67a=doc.createElement("span");
_67b=doc.createTextNode(".");
_67a.appendChild(_67b);
var _67e=doc.createElement("span");
_67a.appendChild(_67e);
if(_678.length){
_5d4.place(_678,rs,"after");
}else{
_678=rs;
}
_5d4.place(_67a,_678,"after");
if(_679){
_5d4.place(_679,_67a,"after");
}
_5d4.destroy(rs);
var _67f=_5e1.create(this.window);
_67f.setStart(_67b,0);
_67f.setEnd(_67b,_67b.length);
_676.removeAllRanges();
_676.addRange(_67f);
if(has("webkit")){
var _680="color";
if(_674==="hilitecolor"||_674==="backcolor"){
_680="backgroundColor";
}
_5d6.set(_67a,_680,_675);
this.selection.remove();
_5d4.destroy(_67e);
_67a.innerHTML="&#160;";
this.selection.selectElement(_67a);
this.focus();
}else{
this.execCommand(_674,_675);
_5d4.place(_67a.firstChild,_67a,"before");
_5d4.destroy(_67a);
_67f.setStart(_67b,0);
_67f.setEnd(_67b,_67b.length);
_676.removeAllRanges();
_676.addRange(_67f);
this.selection.collapse(false);
_67b.parentNode.removeChild(_67b);
}
return true;
}
}
}
return false;
},_adjustNodeAndOffset:function(node,_681){
while(node.length<_681&&node.nextSibling&&node.nextSibling.nodeType===3){
_681=_681-node.length;
node=node.nextSibling;
}
return {"node":node,"offset":_681};
},_tagNamesForCommand:function(_682){
if(_682==="bold"){
return ["b","strong"];
}else{
if(_682==="italic"){
return ["i","em"];
}else{
if(_682==="strikethrough"){
return ["s","strike"];
}else{
if(_682==="superscript"){
return ["sup"];
}else{
if(_682==="subscript"){
return ["sub"];
}else{
if(_682==="underline"){
return ["u"];
}
}
}
}
}
}
return [];
},_stripBreakerNodes:function(node){
if(!this.isLoaded){
return;
}
_5d8(".ieFormatBreakerSpan",node).forEach(function(b){
while(b.firstChild){
_5d4.place(b.firstChild,b,"before");
}
_5d4.destroy(b);
});
return node;
},_stripTrailingEmptyNodes:function(node){
function _683(node){
return (/^(p|div|br)$/i.test(node.nodeName)&&node.children.length==0&&lang.trim(node.textContent||node.innerText||"")=="")||(node.nodeType===3&&lang.trim(node.nodeValue)=="");
};
while(node.lastChild&&_683(node.lastChild)){
_5d4.destroy(node.lastChild);
}
return node;
}});
return _5e5;
});
},"dijit/nls/loading":function(){
define({root:({loadingState:"Loading...",errorState:"Sorry, an error occurred"}),"zh":true,"zh-tw":true,"uk":true,"tr":true,"th":true,"sv":true,"sl":true,"sk":true,"ru":true,"ro":true,"pt":true,"pt-pt":true,"pl":true,"nl":true,"nb":true,"ko":true,"kk":true,"ja":true,"it":true,"hu":true,"hr":true,"he":true,"fr":true,"fi":true,"es":true,"el":true,"de":true,"da":true,"cs":true,"ca":true,"bg":true,"az":true,"ar":true});
},"dijit/nls/pt/loading":function(){
define(({loadingState:"Carregando...",errorState:"Desculpe, ocorreu um erro"}));
},"dijit/nls/pt/loading":function(){
define(({loadingState:"Carregando...",errorState:"Desculpe, ocorreu um erro"}));
},"dojo/dnd/Moveable":function(){
define(["../_base/array","../_base/declare","../_base/lang","../dom","../dom-class","../Evented","../on","../topic","../touch","./common","./Mover","../_base/window"],function(_684,_685,lang,dom,_686,_687,on,_688,_689,dnd,_68a,win){
var _68b=_685("dojo.dnd.Moveable",[_687],{handle:"",delay:0,skip:false,constructor:function(node,_68c){
this.node=dom.byId(node);
if(!_68c){
_68c={};
}
this.handle=_68c.handle?dom.byId(_68c.handle):null;
if(!this.handle){
this.handle=this.node;
}
this.delay=_68c.delay>0?_68c.delay:0;
this.skip=_68c.skip;
this.mover=_68c.mover?_68c.mover:_68a;
this.events=[on(this.handle,_689.press,lang.hitch(this,"onMouseDown")),on(this.handle,"dragstart",lang.hitch(this,"onSelectStart")),on(this.handle,"selectstart",lang.hitch(this,"onSelectStart"))];
},markupFactory:function(_68d,node,Ctor){
return new Ctor(node,_68d);
},destroy:function(){
_684.forEach(this.events,function(_68e){
_68e.remove();
});
this.events=this.node=this.handle=null;
},onMouseDown:function(e){
if(this.skip&&dnd.isFormElement(e)){
return;
}
if(this.delay){
this.events.push(on(this.handle,_689.move,lang.hitch(this,"onMouseMove")),on(this.handle,_689.release,lang.hitch(this,"onMouseUp")));
this._lastX=e.pageX;
this._lastY=e.pageY;
}else{
this.onDragDetected(e);
}
e.stopPropagation();
e.preventDefault();
},onMouseMove:function(e){
if(Math.abs(e.pageX-this._lastX)>this.delay||Math.abs(e.pageY-this._lastY)>this.delay){
this.onMouseUp(e);
this.onDragDetected(e);
}
e.stopPropagation();
e.preventDefault();
},onMouseUp:function(e){
for(var i=0;i<2;++i){
this.events.pop().remove();
}
e.stopPropagation();
e.preventDefault();
},onSelectStart:function(e){
if(!this.skip||!dnd.isFormElement(e)){
e.stopPropagation();
e.preventDefault();
}
},onDragDetected:function(e){
new this.mover(this.node,e,this);
},onMoveStart:function(_68f){
_688.publish("/dnd/move/start",_68f);
_686.add(win.body(),"dojoMove");
_686.add(this.node,"dojoMoveItem");
},onMoveStop:function(_690){
_688.publish("/dnd/move/stop",_690);
_686.remove(win.body(),"dojoMove");
_686.remove(this.node,"dojoMoveItem");
},onFirstMove:function(){
},onMove:function(_691,_692){
this.onMoving(_691,_692);
var s=_691.node.style;
s.left=_692.l+"px";
s.top=_692.t+"px";
this.onMoved(_691,_692);
},onMoving:function(){
},onMoved:function(){
}});
return _68b;
});
},"dijit/TooltipDialog":function(){
define(["dojo/_base/declare","dojo/dom-class","dojo/has","dojo/keys","dojo/_base/lang","dojo/on","./focus","./layout/ContentPane","./_DialogMixin","./form/_FormMixin","./_TemplatedMixin","dojo/text!./templates/TooltipDialog.html","./main"],function(_693,_694,has,keys,lang,on,_695,_696,_697,_698,_699,_69a,_69b){
var _69c=_693("dijit.TooltipDialog",[_696,_699,_698,_697],{title:"",doLayout:false,autofocus:true,baseClass:"dijitTooltipDialog",_firstFocusItem:null,_lastFocusItem:null,templateString:_69a,_setTitleAttr:"containerNode",postCreate:function(){
this.inherited(arguments);
this.own(on(this.containerNode,"keydown",lang.hitch(this,"_onKey")));
},orient:function(node,_69d,_69e){
var newC={"MR-ML":"dijitTooltipRight","ML-MR":"dijitTooltipLeft","TM-BM":"dijitTooltipAbove","BM-TM":"dijitTooltipBelow","BL-TL":"dijitTooltipBelow dijitTooltipABLeft","TL-BL":"dijitTooltipAbove dijitTooltipABLeft","BR-TR":"dijitTooltipBelow dijitTooltipABRight","TR-BR":"dijitTooltipAbove dijitTooltipABRight","BR-BL":"dijitTooltipRight","BL-BR":"dijitTooltipLeft","BR-TL":"dijitTooltipBelow dijitTooltipABLeft","BL-TR":"dijitTooltipBelow dijitTooltipABRight","TL-BR":"dijitTooltipAbove dijitTooltipABRight","TR-BL":"dijitTooltipAbove dijitTooltipABLeft"}[_69d+"-"+_69e];
_694.replace(this.domNode,newC,this._currentOrientClass||"");
this._currentOrientClass=newC;
},focus:function(){
this._getFocusItems(this.containerNode);
_695.focus(this._firstFocusItem);
},onOpen:function(pos){
this.orient(this.domNode,pos.aroundCorner,pos.corner);
var _69f=pos.aroundNodePos;
if(pos.corner.charAt(0)=="M"&&pos.aroundCorner.charAt(0)=="M"){
this.connectorNode.style.top=_69f.y+((_69f.h-this.connectorNode.offsetHeight)>>1)-pos.y+"px";
this.connectorNode.style.left="";
}else{
if(pos.corner.charAt(1)=="M"&&pos.aroundCorner.charAt(1)=="M"){
this.connectorNode.style.left=_69f.x+((_69f.w-this.connectorNode.offsetWidth)>>1)-pos.x+"px";
}
}
this._onShow();
},onClose:function(){
this.onHide();
},_onKey:function(evt){
if(evt.keyCode==keys.ESCAPE){
this.defer("onCancel");
evt.stopPropagation();
evt.preventDefault();
}else{
if(evt.keyCode==keys.TAB){
var node=evt.target;
this._getFocusItems(this.containerNode);
if(this._firstFocusItem==this._lastFocusItem){
evt.stopPropagation();
evt.preventDefault();
}else{
if(node==this._firstFocusItem&&evt.shiftKey){
_695.focus(this._lastFocusItem);
evt.stopPropagation();
evt.preventDefault();
}else{
if(node==this._lastFocusItem&&!evt.shiftKey){
_695.focus(this._firstFocusItem);
evt.stopPropagation();
evt.preventDefault();
}else{
evt.stopPropagation();
}
}
}
}
}
}});
if(has("dojo-bidi")){
_69c.extend({_setTitleAttr:function(_6a0){
this.containerNode.title=(this.textDir&&this.enforceTextDirWithUcc)?this.enforceTextDirWithUcc(null,_6a0):_6a0;
this._set("title",_6a0);
},_setTextDirAttr:function(_6a1){
if(!this._created||this.textDir!=_6a1){
this._set("textDir",_6a1);
if(this.textDir&&this.title){
this.containerNode.title=this.enforceTextDirWithUcc(null,this.title);
}
}
}});
}
return _69c;
});
},"dgrid/Grid":function(){
define(["dojo/_base/kernel","dojo/_base/declare","dojo/on","dojo/has","put-selector/put","./List","./util/misc","dojo/_base/sniff"],function(_6a2,_6a3,_6a4,has,put,List,_6a5){
var _6a6=has("ie")<8&&!has("quirks");
var _6a7=/[^\._a-zA-Z0-9-]/g;
function _6a8(_6a9,_6aa){
if(_6aa&&_6aa.nodeType){
_6a9.appendChild(_6aa);
}
};
var Grid=_6a3(List,{columns:null,cellNavigation:true,tabableHeader:true,showHeader:true,column:function(_6ab){
if(typeof _6ab=="string"){
return this.columns[_6ab];
}else{
return this.cell(_6ab).column;
}
},listType:"grid",cell:function(_6ac,_6ad){
if(_6ac.column&&_6ac.element){
return _6ac;
}
if(_6ac.target&&_6ac.target.nodeType){
_6ac=_6ac.target;
}
var _6ae;
if(_6ac.nodeType){
var _6af;
do{
if(this._rowIdToObject[_6ac.id]){
break;
}
var _6b0=_6ac.columnId;
if(_6b0){
_6ad=_6b0;
_6ae=_6ac;
break;
}
_6ac=_6ac.parentNode;
}while(_6ac&&_6ac!=this.domNode);
}
if(!_6ae&&typeof _6ad!="undefined"){
var row=this.row(_6ac),_6b1=row.element;
if(_6b1){
var _6b2=_6b1.getElementsByTagName("td");
for(var i=0;i<_6b2.length;i++){
if(_6b2[i].columnId==_6ad){
_6ae=_6b2[i];
break;
}
}
}
}
if(_6ac!=null){
return {row:row||this.row(_6ac),column:_6ad&&this.column(_6ad),element:_6ae};
}
},createRowCells:function(tag,each,_6b3){
var row=put("table.dgrid-row-table[role=presentation]"),_6b4=this.cellNavigation,_6b5=(has("ie")<9||has("quirks"))?put(row,"tbody"):row,tr,si,sl,i,l,_6b6,_6b7,id,_6b8,cell,_6b9,_6ba,_6bb;
_6b3=_6b3||this.subRows;
for(si=0,sl=_6b3.length;si<sl;si++){
_6b6=_6b3[si];
tr=put(_6b5,"tr");
if(_6b6.className){
put(tr,"."+_6b6.className);
}
for(i=0,l=_6b6.length;i<l;i++){
_6b7=_6b6[i];
id=_6b7.id;
_6b8=_6b7.className||(_6b7.field&&"field-"+_6b7.field);
cell=put(tag+(".dgrid-cell.dgrid-cell-padding"+(id?".dgrid-column-"+id:"")+(_6b8?"."+_6b8:"")).replace(_6a7,"-")+"[role="+(tag==="th"?"columnheader":"gridcell")+"]");
cell.columnId=id;
if(_6a6){
_6b9=put(cell,"!dgrid-cell-padding div.dgrid-cell-padding");
cell.contents=_6b9;
}else{
_6b9=cell;
}
_6ba=_6b7.colSpan;
if(_6ba){
cell.colSpan=_6ba;
}
_6bb=_6b7.rowSpan;
if(_6bb){
cell.rowSpan=_6bb;
}
each(_6b9,_6b7);
tr.appendChild(cell);
}
}
return row;
},left:function(cell,_6bc){
if(!cell.element){
cell=this.cell(cell);
}
return this.cell(this._move(cell,-(_6bc||1),"dgrid-cell"));
},right:function(cell,_6bd){
if(!cell.element){
cell=this.cell(cell);
}
return this.cell(this._move(cell,_6bd||1,"dgrid-cell"));
},renderRow:function(_6be,_6bf){
var self=this;
var row=this.createRowCells("td",function(td,_6c0){
var data=_6be;
if(_6c0.get){
data=_6c0.get(_6be);
}else{
if("field" in _6c0&&_6c0.field!="_item"){
data=data[_6c0.field];
}
}
if(_6c0.renderCell){
_6a8(td,_6c0.renderCell(_6be,data,td,_6bf));
}else{
_6c1.call(_6c0,_6be,data,td,_6bf);
}
},_6bf&&_6bf.subRows);
return put("div[role=row]>",row);
},renderHeader:function(){
var grid=this,_6c2=this.columns,_6c3=this.headerNode,i=_6c3.childNodes.length;
_6c3.setAttribute("role","row");
while(i--){
put(_6c3.childNodes[i],"!");
}
var row=this.createRowCells("th",function(th,_6c4){
var _6c5=_6c4.headerNode=th;
if(_6a6){
th=th.parentNode;
}
var _6c6=_6c4.field;
if(_6c6){
th.field=_6c6;
}
if(_6c4.renderHeaderCell){
_6a8(_6c5,_6c4.renderHeaderCell(_6c5));
}else{
if(_6c4.label||_6c4.field){
_6c5.appendChild(document.createTextNode(_6c4.label||_6c4.field));
}
}
if(_6c4.sortable!==false&&_6c6&&_6c6!="_item"){
th.sortable=true;
th.className+=" dgrid-sortable";
}
},this.subRows&&this.subRows.headerRows);
this._rowIdToObject[row.id=this.id+"-header"]=this.columns;
_6c3.appendChild(row);
if(this._sortListener){
this._sortListener.remove();
}
this._sortListener=_6a4(row,"click,keydown",function(_6c7){
if(_6c7.type=="click"||_6c7.keyCode==32||(!has("opera")&&_6c7.keyCode==13)){
var _6c8=_6c7.target,_6c9,sort,_6ca,_6cb;
do{
if(_6c8.sortable){
_6ca=[{attribute:(_6c9=_6c8.field||_6c8.columnId),descending:(sort=grid._sort[0])&&sort.attribute==_6c9&&!sort.descending}];
_6cb={bubbles:true,cancelable:true,grid:grid,parentType:_6c7.type,sort:_6ca};
if(_6a4.emit(_6c7.target,"dgrid-sort",_6cb)){
grid._sortNode=_6c8;
grid.set("sort",_6ca);
}
break;
}
}while((_6c8=_6c8.parentNode)&&_6c8!=_6c3);
}
});
},resize:function(){
var _6cc=this.headerNode.firstChild,_6cd=this.contentNode,_6ce;
this.inherited(arguments);
if(!has("ie")||(has("ie")>7&&!has("quirks"))){
_6cd.style.width="";
if(_6cd&&_6cc){
if((_6ce=_6cc.offsetWidth)!=_6cd.offsetWidth){
_6cd.style.width=_6ce+"px";
}
}
}
},destroy:function(){
this._destroyColumns();
if(this._sortListener){
this._sortListener.remove();
}
this.inherited(arguments);
},_setSort:function(_6cf,_6d0){
this.inherited(arguments);
this.updateSortArrow(this._sort);
},updateSortArrow:function(sort,_6d1){
if(this._lastSortedArrow){
put(this._lastSortedArrow,"<!dgrid-sort-up!dgrid-sort-down");
put(this._lastSortedArrow,"!");
delete this._lastSortedArrow;
}
if(_6d1){
this._sort=sort;
}
if(!sort[0]){
return;
}
var prop=sort[0].attribute,desc=sort[0].descending,_6d2=this._sortNode,_6d3,_6d4,i;
delete this._sortNode;
if(!_6d2){
_6d3=this.columns;
for(i in _6d3){
_6d4=_6d3[i];
if(_6d4.field==prop){
_6d2=_6d4.headerNode;
break;
}
}
}
if(_6d2){
_6d2=_6d2.contents||_6d2;
this._lastSortedArrow=put(_6d2.firstChild,"-div.dgrid-sort-arrow.ui-icon[role=presentation]");
this._lastSortedArrow.innerHTML="&nbsp;";
put(_6d2,desc?".dgrid-sort-down":".dgrid-sort-up");
this.resize();
}
},styleColumn:function(_6d5,css){
return this.addCssRule("#"+_6a5.escapeCssIdentifier(this.domNode.id)+" .dgrid-column-"+_6d5,css);
},_configColumns:function(_6d6,_6d7){
var _6d8=[],_6d9=_6d7 instanceof Array,_6da,_6db;
for(_6da in _6d7){
_6db=_6d7[_6da];
if(typeof _6db=="string"){
_6d7[_6da]=_6db={label:_6db};
}
if(!_6d9&&!_6db.field){
_6db.field=_6da;
}
_6da=_6db.id=_6db.id||(isNaN(_6da)?_6da:(_6d6+_6da));
if(_6d9){
this.columns[_6da]=_6db;
}
if(this._configColumn){
this._configColumn(_6db,_6da,_6d7,_6d6);
}
_6db.grid=this;
if(typeof _6db.init==="function"){
_6db.init();
}
_6d8.push(_6db);
}
return _6d9?_6d7:_6d8;
},_destroyColumns:function(){
var _6dc=this.subRows,_6dd=_6dc&&_6dc.length,i,j,_6de,len;
this.cleanup();
for(i=0;i<_6dd;i++){
for(j=0,len=_6dc[i].length;j<len;j++){
_6de=_6dc[i][j];
if(typeof _6de.destroy==="function"){
_6de.destroy();
}
}
}
},configStructure:function(){
var _6df=this.subRows,_6e0=this._columns=this.columns;
this.columns=!_6e0||_6e0 instanceof Array?{}:_6e0;
if(_6df){
for(var i=0;i<_6df.length;i++){
_6df[i]=this._configColumns(i+"-",_6df[i]);
}
}else{
this.subRows=[this._configColumns("",_6e0)];
}
},_getColumns:function(){
return this._columns||this.columns;
},_setColumns:function(_6e1){
this._destroyColumns();
this.subRows=null;
this.columns=_6e1;
this._updateColumns();
},_setSubRows:function(_6e2){
this._destroyColumns();
this.subRows=_6e2;
this._updateColumns();
},setColumns:function(_6e3){
_6a2.deprecated("setColumns(...)","use set(\"columns\", ...) instead","dgrid 1.0");
this.set("columns",_6e3);
},setSubRows:function(_6e4){
_6a2.deprecated("setSubRows(...)","use set(\"subRows\", ...) instead","dgrid 1.0");
this.set("subRows",_6e4);
},_updateColumns:function(){
this.configStructure();
this.renderHeader();
this.refresh();
this._lastCollection&&this.renderArray(this._lastCollection);
if(this._started){
if(this._sort&&this._sort.length){
this.updateSortArrow(this._sort);
}else{
this.resize();
}
}
}});
function _6c1(_6e5,data,td,_6e6){
if(this.formatter){
var _6e7=this.formatter,_6e8=this.grid.formatterScope;
td.innerHTML=typeof _6e7==="string"&&_6e8?_6e8[_6e7](data,_6e5):_6e7(data,_6e5);
}else{
if(data!=null){
td.appendChild(document.createTextNode(data));
}
}
};
Grid.appendIfNode=_6a8;
Grid.defaultRenderCell=_6c1;
return Grid;
});
},"dojo/nls/colors":function(){
define({root:({aliceblue:"alice blue",antiquewhite:"antique white",aqua:"aqua",aquamarine:"aquamarine",azure:"azure",beige:"beige",bisque:"bisque",black:"black",blanchedalmond:"blanched almond",blue:"blue",blueviolet:"blue-violet",brown:"brown",burlywood:"burlywood",cadetblue:"cadet blue",chartreuse:"chartreuse",chocolate:"chocolate",coral:"coral",cornflowerblue:"cornflower blue",cornsilk:"cornsilk",crimson:"crimson",cyan:"cyan",darkblue:"dark blue",darkcyan:"dark cyan",darkgoldenrod:"dark goldenrod",darkgray:"dark gray",darkgreen:"dark green",darkgrey:"dark gray",darkkhaki:"dark khaki",darkmagenta:"dark magenta",darkolivegreen:"dark olive green",darkorange:"dark orange",darkorchid:"dark orchid",darkred:"dark red",darksalmon:"dark salmon",darkseagreen:"dark sea green",darkslateblue:"dark slate blue",darkslategray:"dark slate gray",darkslategrey:"dark slate gray",darkturquoise:"dark turquoise",darkviolet:"dark violet",deeppink:"deep pink",deepskyblue:"deep sky blue",dimgray:"dim gray",dimgrey:"dim gray",dodgerblue:"dodger blue",firebrick:"fire brick",floralwhite:"floral white",forestgreen:"forest green",fuchsia:"fuchsia",gainsboro:"gainsboro",ghostwhite:"ghost white",gold:"gold",goldenrod:"goldenrod",gray:"gray",green:"green",greenyellow:"green-yellow",grey:"gray",honeydew:"honeydew",hotpink:"hot pink",indianred:"indian red",indigo:"indigo",ivory:"ivory",khaki:"khaki",lavender:"lavender",lavenderblush:"lavender blush",lawngreen:"lawn green",lemonchiffon:"lemon chiffon",lightblue:"light blue",lightcoral:"light coral",lightcyan:"light cyan",lightgoldenrodyellow:"light goldenrod yellow",lightgray:"light gray",lightgreen:"light green",lightgrey:"light gray",lightpink:"light pink",lightsalmon:"light salmon",lightseagreen:"light sea green",lightskyblue:"light sky blue",lightslategray:"light slate gray",lightslategrey:"light slate gray",lightsteelblue:"light steel blue",lightyellow:"light yellow",lime:"lime",limegreen:"lime green",linen:"linen",magenta:"magenta",maroon:"maroon",mediumaquamarine:"medium aquamarine",mediumblue:"medium blue",mediumorchid:"medium orchid",mediumpurple:"medium purple",mediumseagreen:"medium sea green",mediumslateblue:"medium slate blue",mediumspringgreen:"medium spring green",mediumturquoise:"medium turquoise",mediumvioletred:"medium violet-red",midnightblue:"midnight blue",mintcream:"mint cream",mistyrose:"misty rose",moccasin:"moccasin",navajowhite:"navajo white",navy:"navy",oldlace:"old lace",olive:"olive",olivedrab:"olive drab",orange:"orange",orangered:"orange red",orchid:"orchid",palegoldenrod:"pale goldenrod",palegreen:"pale green",paleturquoise:"pale turquoise",palevioletred:"pale violet-red",papayawhip:"papaya whip",peachpuff:"peach puff",peru:"peru",pink:"pink",plum:"plum",powderblue:"powder blue",purple:"purple",red:"red",rosybrown:"rosy brown",royalblue:"royal blue",saddlebrown:"saddle brown",salmon:"salmon",sandybrown:"sandy brown",seagreen:"sea green",seashell:"seashell",sienna:"sienna",silver:"silver",skyblue:"sky blue",slateblue:"slate blue",slategray:"slate gray",slategrey:"slate gray",snow:"snow",springgreen:"spring green",steelblue:"steel blue",tan:"tan",teal:"teal",thistle:"thistle",tomato:"tomato",transparent:"transparent",turquoise:"turquoise",violet:"violet",wheat:"wheat",white:"white",whitesmoke:"white smoke",yellow:"yellow",yellowgreen:"yellow green"}),"zh":true,"zh-tw":true,"uk":true,"tr":true,"th":true,"sv":true,"sl":true,"sk":true,"ru":true,"ro":true,"pt":true,"pt-pt":true,"pl":true,"nl":true,"nb":true,"ko":true,"kk":true,"ja":true,"it":true,"hu":true,"hr":true,"he":true,"fr":true,"fi":true,"es":true,"el":true,"de":true,"da":true,"cs":true,"ca":true,"bg":true,"az":true,"ar":true});
},"dojo/nls/pt/colors":function(){
define(({aliceblue:"azul alice",antiquewhite:"branco antigo",aqua:"aqua",aquamarine:"água marinha",azure:"azul celeste",beige:"bege",bisque:"bisque",black:"preto",blanchedalmond:"amêndoa pelada",blue:"azul",blueviolet:"azul violeta",brown:"marrom",burlywood:"burlywood",cadetblue:"azul cadet",chartreuse:"chartreuse",chocolate:"chocolate",coral:"coral",cornflowerblue:"azul centaurea",cornsilk:"cornsilk",crimson:"carmesim",cyan:"ciano",darkblue:"azul escuro",darkcyan:"ciano escuro",darkgoldenrod:"goldenrod escuro",darkgray:"cinza escuro",darkgreen:"verde escuro",darkgrey:"cinza escuro",darkkhaki:"cáqui escuro",darkmagenta:"magenta escuro",darkolivegreen:"verde oliva escuro",darkorange:"laranja escuro",darkorchid:"orquídea escuro",darkred:"vermelho escuro",darksalmon:"salmão escuro",darkseagreen:"verde marinho escuro",darkslateblue:"azul ardósia escuro",darkslategray:"cinza ardósia escuro",darkslategrey:"cinza ardósia escuro",darkturquoise:"turquesa escuro",darkviolet:"violeta escuro",deeppink:"rosa profundo",deepskyblue:"azul céu intenso",dimgray:"cinza turvo",dimgrey:"cinza turvo",dodgerblue:"azul dodger",firebrick:"firebrick",floralwhite:"branco floral",forestgreen:"verde floresta",fuchsia:"fúcsia",gainsboro:"gainsboro",ghostwhite:"branco ghost",gold:"dourado",goldenrod:"goldenrod",gray:"cinza",green:"verde",greenyellow:"amarelo esverdeado",grey:"cinza",honeydew:"honeydew",hotpink:"rosa quente",indianred:"vermelho indiano",indigo:"índigo",ivory:"marfim",khaki:"cáqui",lavender:"lavanda",lavenderblush:"lavanda avermelhada",lawngreen:"verde grama",lemonchiffon:"limão chiffon",lightblue:"azul claro",lightcoral:"coral claro",lightcyan:"ciano claro",lightgoldenrodyellow:"amarelo goldenrod claro",lightgray:"cinza claro",lightgreen:"verde claro",lightgrey:"cinza claro",lightpink:"rosa claro",lightsalmon:"salmão claro",lightseagreen:"verde marinho claro",lightskyblue:"azul céu claro",lightslategray:"cinza ardósia claro",lightslategrey:"cinza ardósia claro",lightsteelblue:"azul aço claro",lightyellow:"amarelo claro",lime:"lima",limegreen:"verde lima",linen:"linho",magenta:"magenta",maroon:"castanho",mediumaquamarine:"água marinha médio",mediumblue:"azul médio",mediumorchid:"orquídea médio",mediumpurple:"roxo médio",mediumseagreen:"verde marinho médio",mediumslateblue:"azul ardósia médio",mediumspringgreen:"verde primavera médio",mediumturquoise:"turquesa médio",mediumvioletred:"vermelho violeta médio",midnightblue:"azul meia-noite",mintcream:"creme de menta",mistyrose:"rosa enevoado",moccasin:"moccasin",navajowhite:"branco navajo",navy:"marinho",oldlace:"cadarço velho",olive:"oliva",olivedrab:"verde oliva",orange:"laranja",orangered:"vermelho alaranjado",orchid:"orquídea",palegoldenrod:"goldenrod esbranquiçado",palegreen:"verde esbranquiçado",paleturquoise:"turquesa esbranquiçado",palevioletred:"vermelho violeta esbranquiçado",papayawhip:"creme de papaya",peachpuff:"peach puff",peru:"peru",pink:"rosa",plum:"ameixa",powderblue:"azul talco",purple:"roxo",red:"vermelho",rosybrown:"marrom rosado",royalblue:"azul royal",saddlebrown:"marrom saddle",salmon:"salmão",sandybrown:"marrom cor de areia",seagreen:"verde marinho",seashell:"seashell",sienna:"sienna",silver:"prateado",skyblue:"azul céu",slateblue:"azul ardósia",slategray:"cinza ardósia",slategrey:"cinza ardósia",snow:"branco neve",springgreen:"verde primavera",steelblue:"azul aço",tan:"tan",teal:"azul esverdeado",thistle:"thistle",tomato:"tomate",transparent:"transparente",turquoise:"turquesa",violet:"violeta",wheat:"trigo",white:"branco",whitesmoke:"fumaça branca",yellow:"amarelo",yellowgreen:"verde amarelado"}));
},"dojo/nls/pt/colors":function(){
define(({aliceblue:"azul alice",antiquewhite:"branco antigo",aqua:"aqua",aquamarine:"água marinha",azure:"azul celeste",beige:"bege",bisque:"bisque",black:"preto",blanchedalmond:"amêndoa pelada",blue:"azul",blueviolet:"azul violeta",brown:"marrom",burlywood:"burlywood",cadetblue:"azul cadet",chartreuse:"chartreuse",chocolate:"chocolate",coral:"coral",cornflowerblue:"azul centaurea",cornsilk:"cornsilk",crimson:"carmesim",cyan:"ciano",darkblue:"azul escuro",darkcyan:"ciano escuro",darkgoldenrod:"goldenrod escuro",darkgray:"cinza escuro",darkgreen:"verde escuro",darkgrey:"cinza escuro",darkkhaki:"cáqui escuro",darkmagenta:"magenta escuro",darkolivegreen:"verde oliva escuro",darkorange:"laranja escuro",darkorchid:"orquídea escuro",darkred:"vermelho escuro",darksalmon:"salmão escuro",darkseagreen:"verde marinho escuro",darkslateblue:"azul ardósia escuro",darkslategray:"cinza ardósia escuro",darkslategrey:"cinza ardósia escuro",darkturquoise:"turquesa escuro",darkviolet:"violeta escuro",deeppink:"rosa profundo",deepskyblue:"azul céu intenso",dimgray:"cinza turvo",dimgrey:"cinza turvo",dodgerblue:"azul dodger",firebrick:"firebrick",floralwhite:"branco floral",forestgreen:"verde floresta",fuchsia:"fúcsia",gainsboro:"gainsboro",ghostwhite:"branco ghost",gold:"dourado",goldenrod:"goldenrod",gray:"cinza",green:"verde",greenyellow:"amarelo esverdeado",grey:"cinza",honeydew:"honeydew",hotpink:"rosa quente",indianred:"vermelho indiano",indigo:"índigo",ivory:"marfim",khaki:"cáqui",lavender:"lavanda",lavenderblush:"lavanda avermelhada",lawngreen:"verde grama",lemonchiffon:"limão chiffon",lightblue:"azul claro",lightcoral:"coral claro",lightcyan:"ciano claro",lightgoldenrodyellow:"amarelo goldenrod claro",lightgray:"cinza claro",lightgreen:"verde claro",lightgrey:"cinza claro",lightpink:"rosa claro",lightsalmon:"salmão claro",lightseagreen:"verde marinho claro",lightskyblue:"azul céu claro",lightslategray:"cinza ardósia claro",lightslategrey:"cinza ardósia claro",lightsteelblue:"azul aço claro",lightyellow:"amarelo claro",lime:"lima",limegreen:"verde lima",linen:"linho",magenta:"magenta",maroon:"castanho",mediumaquamarine:"água marinha médio",mediumblue:"azul médio",mediumorchid:"orquídea médio",mediumpurple:"roxo médio",mediumseagreen:"verde marinho médio",mediumslateblue:"azul ardósia médio",mediumspringgreen:"verde primavera médio",mediumturquoise:"turquesa médio",mediumvioletred:"vermelho violeta médio",midnightblue:"azul meia-noite",mintcream:"creme de menta",mistyrose:"rosa enevoado",moccasin:"moccasin",navajowhite:"branco navajo",navy:"marinho",oldlace:"cadarço velho",olive:"oliva",olivedrab:"verde oliva",orange:"laranja",orangered:"vermelho alaranjado",orchid:"orquídea",palegoldenrod:"goldenrod esbranquiçado",palegreen:"verde esbranquiçado",paleturquoise:"turquesa esbranquiçado",palevioletred:"vermelho violeta esbranquiçado",papayawhip:"creme de papaya",peachpuff:"peach puff",peru:"peru",pink:"rosa",plum:"ameixa",powderblue:"azul talco",purple:"roxo",red:"vermelho",rosybrown:"marrom rosado",royalblue:"azul royal",saddlebrown:"marrom saddle",salmon:"salmão",sandybrown:"marrom cor de areia",seagreen:"verde marinho",seashell:"seashell",sienna:"sienna",silver:"prateado",skyblue:"azul céu",slateblue:"azul ardósia",slategray:"cinza ardósia",slategrey:"cinza ardósia",snow:"branco neve",springgreen:"verde primavera",steelblue:"azul aço",tan:"tan",teal:"azul esverdeado",thistle:"thistle",tomato:"tomate",transparent:"transparente",turquoise:"turquesa",violet:"violeta",wheat:"trigo",white:"branco",whitesmoke:"fumaça branca",yellow:"amarelo",yellowgreen:"verde amarelado"}));
},"dojo/store/util/SimpleQueryEngine":function(){
define(["../../_base/array"],function(_6e9){
return function(_6ea,_6eb){
switch(typeof _6ea){
default:
throw new Error("Can not query with a "+typeof _6ea);
case "object":
case "undefined":
var _6ec=_6ea;
_6ea=function(_6ed){
for(var key in _6ec){
var _6ee=_6ec[key];
if(_6ee&&_6ee.test){
if(!_6ee.test(_6ed[key],_6ed)){
return false;
}
}else{
if(_6ee!=_6ed[key]){
return false;
}
}
}
return true;
};
break;
case "string":
if(!this[_6ea]){
throw new Error("No filter function "+_6ea+" was found in store");
}
_6ea=this[_6ea];
case "function":
}
function _6ef(_6f0){
var _6f1=_6e9.filter(_6f0,_6ea);
var _6f2=_6eb&&_6eb.sort;
if(_6f2){
_6f1.sort(typeof _6f2=="function"?_6f2:function(a,b){
for(var sort,i=0;sort=_6f2[i];i++){
var _6f3=a[sort.attribute];
var _6f4=b[sort.attribute];
_6f3=_6f3!=null?_6f3.valueOf():_6f3;
_6f4=_6f4!=null?_6f4.valueOf():_6f4;
if(_6f3!=_6f4){
return !!sort.descending==(_6f3==null||_6f3>_6f4)?-1:1;
}
}
return 0;
});
}
if(_6eb&&(_6eb.start||_6eb.count)){
var _6f5=_6f1.length;
_6f1=_6f1.slice(_6eb.start||0,(_6eb.start||0)+(_6eb.count||Infinity));
_6f1.total=_6f5;
}
return _6f1;
};
_6ef.matches=_6ea;
return _6ef;
};
});
},"dojo/cldr/nls/number":function(){
define({root:{"scientificFormat":"#E0","currencySpacing-afterCurrency-currencyMatch":"[:^S:]","infinity":"∞","list":";","percentSign":"%","minusSign":"-","currencySpacing-beforeCurrency-surroundingMatch":"[:digit:]","decimalFormat-short":"000T","currencySpacing-afterCurrency-insertBetween":" ","nan":"NaN","plusSign":"+","currencySpacing-afterCurrency-surroundingMatch":"[:digit:]","currencySpacing-beforeCurrency-currencyMatch":"[:^S:]","currencyFormat":"¤ #,##0.00","perMille":"‰","group":",","percentFormat":"#,##0%","decimalFormat-long":"000T","decimalFormat":"#,##0.###","decimal":".","currencySpacing-beforeCurrency-insertBetween":" ","exponential":"E"},"ar":true,"ca":true,"cs":true,"da":true,"de":true,"el":true,"en":true,"en-gb":true,"es":true,"fi":true,"fr":true,"fr-ch":true,"he":true,"hu":true,"it":true,"ja":true,"ko":true,"nb":true,"nl":true,"pl":true,"pt":true,"pt-pt":true,"ro":true,"ru":true,"sk":true,"sl":true,"sv":true,"th":true,"tr":true,"zh":true,"zh-hant":true,"zh-hk":true,"zh-tw":true});
},"dojo/cldr/nls/en/number":function(){
define({"group":",","percentSign":"%","exponential":"E","scientificFormat":"#E0","percentFormat":"#,##0%","list":";","infinity":"∞","minusSign":"-","decimal":".","nan":"NaN","perMille":"‰","decimalFormat":"#,##0.###","currencyFormat":"¤#,##0.00;(¤#,##0.00)","plusSign":"+","decimalFormat-long":"000 trillion","decimalFormat-short":"000T"});
},"dojo/cldr/nls/pt/number":function(){
define({"group":".","percentSign":"%","exponential":"E","scientificFormat":"#E0","percentFormat":"#,##0%","list":";","infinity":"∞","minusSign":"-","decimal":",","nan":"NaN","perMille":"‰","decimalFormat":"#,##0.###","currencyFormat":"¤#,##0.00;(¤#,##0.00)","plusSign":"+","decimalFormat-long":"000 trilhões","decimalFormat-short":"000 tri"});
},"dojo/cldr/nls/pt/number":function(){
define({"group":".","percentSign":"%","exponential":"E","scientificFormat":"#E0","percentFormat":"#,##0%","list":";","infinity":"∞","minusSign":"-","decimal":",","nan":"NaN","perMille":"‰","decimalFormat":"#,##0.###","currencyFormat":"¤#,##0.00;(¤#,##0.00)","plusSign":"+","decimalFormat-long":"000 trilhões","decimalFormat-short":"000 tri"});
},"dijit/typematic":function(){
define(["dojo/_base/array","dojo/_base/connect","dojo/_base/lang","dojo/on","dojo/sniff","./main"],function(_6f6,_6f7,lang,on,has,_6f8){
var _6f9=(_6f8.typematic={_fireEventAndReload:function(){
this._timer=null;
this._callback(++this._count,this._node,this._evt);
this._currentTimeout=Math.max(this._currentTimeout<0?this._initialDelay:(this._subsequentDelay>1?this._subsequentDelay:Math.round(this._currentTimeout*this._subsequentDelay)),this._minDelay);
this._timer=setTimeout(lang.hitch(this,"_fireEventAndReload"),this._currentTimeout);
},trigger:function(evt,_6fa,node,_6fb,obj,_6fc,_6fd,_6fe){
if(obj!=this._obj){
this.stop();
this._initialDelay=_6fd||500;
this._subsequentDelay=_6fc||0.9;
this._minDelay=_6fe||10;
this._obj=obj;
this._node=node;
this._currentTimeout=-1;
this._count=-1;
this._callback=lang.hitch(_6fa,_6fb);
this._evt={faux:true};
for(var attr in evt){
if(attr!="layerX"&&attr!="layerY"){
var v=evt[attr];
if(typeof v!="function"&&typeof v!="undefined"){
this._evt[attr]=v;
}
}
}
this._fireEventAndReload();
}
},stop:function(){
if(this._timer){
clearTimeout(this._timer);
this._timer=null;
}
if(this._obj){
this._callback(-1,this._node,this._evt);
this._obj=null;
}
},addKeyListener:function(node,_6ff,_700,_701,_702,_703,_704){
var type="keyCode" in _6ff?"keydown":"charCode" in _6ff?"keypress":_6f7._keypress,attr="keyCode" in _6ff?"keyCode":"charCode" in _6ff?"charCode":"charOrCode";
var _705=[on(node,type,lang.hitch(this,function(evt){
if(evt[attr]==_6ff[attr]&&(_6ff.ctrlKey===undefined||_6ff.ctrlKey==evt.ctrlKey)&&(_6ff.altKey===undefined||_6ff.altKey==evt.altKey)&&(_6ff.metaKey===undefined||_6ff.metaKey==(evt.metaKey||false))&&(_6ff.shiftKey===undefined||_6ff.shiftKey==evt.shiftKey)){
evt.stopPropagation();
evt.preventDefault();
_6f9.trigger(evt,_700,node,_701,_6ff,_702,_703,_704);
}else{
if(_6f9._obj==_6ff){
_6f9.stop();
}
}
})),on(node,"keyup",lang.hitch(this,function(){
if(_6f9._obj==_6ff){
_6f9.stop();
}
}))];
return {remove:function(){
_6f6.forEach(_705,function(h){
h.remove();
});
}};
},addMouseListener:function(node,_706,_707,_708,_709,_70a){
var _70b=[on(node,"mousedown",lang.hitch(this,function(evt){
evt.preventDefault();
_6f9.trigger(evt,_706,node,_707,node,_708,_709,_70a);
})),on(node,"mouseup",lang.hitch(this,function(evt){
if(this._obj){
evt.preventDefault();
}
_6f9.stop();
})),on(node,"mouseout",lang.hitch(this,function(evt){
if(this._obj){
evt.preventDefault();
}
_6f9.stop();
})),on(node,"dblclick",lang.hitch(this,function(evt){
evt.preventDefault();
if(has("ie")<9){
_6f9.trigger(evt,_706,node,_707,node,_708,_709,_70a);
setTimeout(lang.hitch(this,_6f9.stop),50);
}
}))];
return {remove:function(){
_6f6.forEach(_70b,function(h){
h.remove();
});
}};
},addListener:function(_70c,_70d,_70e,_70f,_710,_711,_712,_713){
var _714=[this.addKeyListener(_70d,_70e,_70f,_710,_711,_712,_713),this.addMouseListener(_70c,_70f,_710,_711,_712,_713)];
return {remove:function(){
_6f6.forEach(_714,function(h){
h.remove();
});
}};
}});
return _6f9;
});
},"dgrid/util/misc":function(){
define(["put-selector/put"],function(put){
var _715=[],_716,_717,_718,_719=/([^A-Za-z0-9_\u00A0-\uFFFF-])/g;
function _71a(_71b){
var _71c=_715[_71b],i,l;
if(_71c===undefined){
return;
}
_716[_717](_71c);
_715[_71b]=undefined;
for(i=_71b+1,l=_715.length;i<l;i++){
if(_715[i]>_71c){
_715[i]--;
}
}
};
var util={defaultDelay:15,throttle:function(cb,_71d,_71e){
var ran=false;
_71e=_71e||util.defaultDelay;
return function(){
if(ran){
return;
}
ran=true;
cb.apply(_71d,arguments);
setTimeout(function(){
ran=false;
},_71e);
};
},throttleDelayed:function(cb,_71f,_720){
var ran=false;
_720=_720||util.defaultDelay;
return function(){
if(ran){
return;
}
ran=true;
var a=arguments;
setTimeout(function(){
ran=false;
cb.apply(_71f,a);
},_720);
};
},debounce:function(cb,_721,_722){
var _723;
_722=_722||util.defaultDelay;
return function(){
if(_723){
clearTimeout(_723);
_723=null;
}
var a=arguments;
_723=setTimeout(function(){
cb.apply(_721,a);
},_722);
};
},addCssRule:function(_724,css){
if(!_716){
_716=put(document.getElementsByTagName("head")[0],"style");
_716=_716.sheet||_716.styleSheet;
_717=_716.deleteRule?"deleteRule":"removeRule";
_718=_716.cssRules?"cssRules":"rules";
}
var _725=_715.length;
_715[_725]=(_716.cssRules||_716.rules).length;
_716.addRule?_716.addRule(_724,css):_716.insertRule(_724+"{"+css+"}",_715[_725]);
return {get:function(prop){
return _716[_718][_715[_725]].style[prop];
},set:function(prop,_726){
if(typeof _715[_725]!=="undefined"){
_716[_718][_715[_725]].style[prop]=_726;
}
},remove:function(){
_71a(_725);
}};
},escapeCssIdentifier:function(id){
return id.replace(_719,"\\$1");
}};
return util;
});
},"dijit/MenuItem":function(){
define(["dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-class","dojo/_base/kernel","dojo/sniff","dojo/_base/lang","./_Widget","./_TemplatedMixin","./_Contained","./_CssStateMixin","dojo/text!./templates/MenuItem.html"],function(_727,dom,_728,_729,_72a,has,lang,_72b,_72c,_72d,_72e,_72f){
var _730=_727("dijit.MenuItem"+(has("dojo-bidi")?"_NoBidi":""),[_72b,_72c,_72d,_72e],{templateString:_72f,baseClass:"dijitMenuItem",label:"",_setLabelAttr:function(val){
this._set("label",val);
var _731="";
var text;
var ndx=val.search(/{\S}/);
if(ndx>=0){
_731=val.charAt(ndx+1);
var _732=val.substr(0,ndx);
var _733=val.substr(ndx+3);
text=_732+_731+_733;
val=_732+"<span class=\"dijitMenuItemShortcutKey\">"+_731+"</span>"+_733;
}else{
text=val;
}
this.domNode.setAttribute("aria-label",text+" "+this.accelKey);
this.containerNode.innerHTML=val;
this._set("shortcutKey",_731);
},iconClass:"dijitNoIcon",_setIconClassAttr:{node:"iconNode",type:"class"},accelKey:"",disabled:false,_fillContent:function(_734){
if(_734&&!("label" in this.params)){
this._set("label",_734.innerHTML);
}
},buildRendering:function(){
this.inherited(arguments);
var _735=this.id+"_text";
_728.set(this.containerNode,"id",_735);
if(this.accelKeyNode){
_728.set(this.accelKeyNode,"id",this.id+"_accel");
}
dom.setSelectable(this.domNode,false);
},onClick:function(){
},focus:function(){
try{
if(has("ie")==8){
this.containerNode.focus();
}
this.focusNode.focus();
}
catch(e){
}
},_onFocus:function(){
this.getParent()._onItemFocus(this);
this.inherited(arguments);
},_setSelected:function(_736){
_729.toggle(this.domNode,"dijitMenuItemSelected",_736);
},setLabel:function(_737){
_72a.deprecated("dijit.MenuItem.setLabel() is deprecated.  Use set('label', ...) instead.","","2.0");
this.set("label",_737);
},setDisabled:function(_738){
_72a.deprecated("dijit.Menu.setDisabled() is deprecated.  Use set('disabled', bool) instead.","","2.0");
this.set("disabled",_738);
},_setDisabledAttr:function(_739){
this.focusNode.setAttribute("aria-disabled",_739?"true":"false");
this._set("disabled",_739);
},_setAccelKeyAttr:function(_73a){
if(this.accelKeyNode){
this.accelKeyNode.style.display=_73a?"":"none";
this.accelKeyNode.innerHTML=_73a;
_728.set(this.containerNode,"colSpan",_73a?"1":"2");
}
this._set("accelKey",_73a);
}});
if(has("dojo-bidi")){
_730=_727("dijit.MenuItem",_730,{_setLabelAttr:function(val){
this.inherited(arguments);
if(this.textDir==="auto"){
this.applyTextDir(this.textDirNode);
}
}});
}
return _730;
});
},"dijit/MenuBarItem":function(){
define(["dojo/_base/declare","./MenuItem","dojo/text!./templates/MenuBarItem.html"],function(_73b,_73c,_73d){
var _73e=_73b("dijit._MenuBarItemMixin",null,{templateString:_73d,_setIconClassAttr:null});
var _73f=_73b("dijit.MenuBarItem",[_73c,_73e],{});
_73f._MenuBarItemMixin=_73e;
return _73f;
});
},"dijit/layout/TabController":function(){
define(["dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-class","dojo/has","dojo/i18n","dojo/_base/lang","./StackController","../registry","../Menu","../MenuItem","dojo/text!./templates/_TabButton.html","dojo/i18n!../nls/common"],function(_740,dom,_741,_742,has,i18n,lang,_743,_744,Menu,_745,_746){
var _747=_740("dijit.layout._TabButton"+(has("dojo-bidi")?"_NoBidi":""),_743.StackButton,{baseClass:"dijitTab",cssStateNodes:{closeNode:"dijitTabCloseButton"},templateString:_746,_setNameAttr:"focusNode",scrollOnFocus:false,buildRendering:function(){
this.inherited(arguments);
dom.setSelectable(this.containerNode,false);
},startup:function(){
this.inherited(arguments);
var n=this.domNode;
this.defer(function(){
n.className=n.className;
},1);
},_setCloseButtonAttr:function(disp){
this._set("closeButton",disp);
_742.toggle(this.domNode,"dijitClosable",disp);
this.closeNode.style.display=disp?"":"none";
if(disp){
var _748=i18n.getLocalization("dijit","common");
if(this.closeNode){
_741.set(this.closeNode,"title",_748.itemClose);
}
}
},_setDisabledAttr:function(_749){
this.inherited(arguments);
if(this.closeNode){
if(_749){
_741.remove(this.closeNode,"title");
}else{
var _74a=i18n.getLocalization("dijit","common");
_741.set(this.closeNode,"title",_74a.itemClose);
}
}
},_setLabelAttr:function(_74b){
this.inherited(arguments);
if(!this.showLabel&&!this.params.title){
this.iconNode.alt=lang.trim(this.containerNode.innerText||this.containerNode.textContent||"");
}
}});
if(has("dojo-bidi")){
_747=_740("dijit.layout._TabButton",_747,{_setLabelAttr:function(_74c){
this.inherited(arguments);
this.applyTextDir(this.iconNode,this.iconNode.alt);
}});
}
var _74d=_740("dijit.layout.TabController",_743,{baseClass:"dijitTabController",templateString:"<div role='tablist' data-dojo-attach-event='onkeydown:onkeydown'></div>",tabPosition:"top",buttonWidget:_747,buttonWidgetCloseClass:"dijitTabCloseButton",postCreate:function(){
this.inherited(arguments);
var _74e=new Menu({id:this.id+"_Menu",ownerDocument:this.ownerDocument,dir:this.dir,lang:this.lang,textDir:this.textDir,targetNodeIds:[this.domNode],selector:function(node){
return _742.contains(node,"dijitClosable")&&!_742.contains(node,"dijitTabDisabled");
}});
this.own(_74e);
var _74f=i18n.getLocalization("dijit","common"),_750=this;
_74e.addChild(new _745({label:_74f.itemClose,ownerDocument:this.ownerDocument,dir:this.dir,lang:this.lang,textDir:this.textDir,onClick:function(evt){
var _751=_744.byNode(this.getParent().currentTarget);
_750.onCloseButtonClick(_751.page);
}}));
}});
_74d.TabButton=_747;
return _74d;
});
},"dojo/cldr/supplemental":function(){
define(["../_base/lang","../i18n"],function(lang,i18n){
var _752={};
lang.setObject("dojo.cldr.supplemental",_752);
_752.getFirstDayOfWeek=function(_753){
var _754={bd:5,mv:5,ae:6,af:6,bh:6,dj:6,dz:6,eg:6,iq:6,ir:6,jo:6,kw:6,ly:6,ma:6,om:6,qa:6,sa:6,sd:6,sy:6,ye:6,ag:0,ar:0,as:0,au:0,br:0,bs:0,bt:0,bw:0,by:0,bz:0,ca:0,cn:0,co:0,dm:0,"do":0,et:0,gt:0,gu:0,hk:0,hn:0,id:0,ie:0,il:0,"in":0,jm:0,jp:0,ke:0,kh:0,kr:0,la:0,mh:0,mm:0,mo:0,mt:0,mx:0,mz:0,ni:0,np:0,nz:0,pa:0,pe:0,ph:0,pk:0,pr:0,py:0,sg:0,sv:0,th:0,tn:0,tt:0,tw:0,um:0,us:0,ve:0,vi:0,ws:0,za:0,zw:0};
var _755=_752._region(_753);
var dow=_754[_755];
return (dow===undefined)?1:dow;
};
_752._region=function(_756){
_756=i18n.normalizeLocale(_756);
var tags=_756.split("-");
var _757=tags[1];
if(!_757){
_757={aa:"et",ab:"ge",af:"za",ak:"gh",am:"et",ar:"eg",as:"in",av:"ru",ay:"bo",az:"az",ba:"ru",be:"by",bg:"bg",bi:"vu",bm:"ml",bn:"bd",bo:"cn",br:"fr",bs:"ba",ca:"es",ce:"ru",ch:"gu",co:"fr",cr:"ca",cs:"cz",cv:"ru",cy:"gb",da:"dk",de:"de",dv:"mv",dz:"bt",ee:"gh",el:"gr",en:"us",es:"es",et:"ee",eu:"es",fa:"ir",ff:"sn",fi:"fi",fj:"fj",fo:"fo",fr:"fr",fy:"nl",ga:"ie",gd:"gb",gl:"es",gn:"py",gu:"in",gv:"gb",ha:"ng",he:"il",hi:"in",ho:"pg",hr:"hr",ht:"ht",hu:"hu",hy:"am",ia:"fr",id:"id",ig:"ng",ii:"cn",ik:"us","in":"id",is:"is",it:"it",iu:"ca",iw:"il",ja:"jp",ji:"ua",jv:"id",jw:"id",ka:"ge",kg:"cd",ki:"ke",kj:"na",kk:"kz",kl:"gl",km:"kh",kn:"in",ko:"kr",ks:"in",ku:"tr",kv:"ru",kw:"gb",ky:"kg",la:"va",lb:"lu",lg:"ug",li:"nl",ln:"cd",lo:"la",lt:"lt",lu:"cd",lv:"lv",mg:"mg",mh:"mh",mi:"nz",mk:"mk",ml:"in",mn:"mn",mo:"ro",mr:"in",ms:"my",mt:"mt",my:"mm",na:"nr",nb:"no",nd:"zw",ne:"np",ng:"na",nl:"nl",nn:"no",no:"no",nr:"za",nv:"us",ny:"mw",oc:"fr",om:"et",or:"in",os:"ge",pa:"in",pl:"pl",ps:"af",pt:"br",qu:"pe",rm:"ch",rn:"bi",ro:"ro",ru:"ru",rw:"rw",sa:"in",sd:"in",se:"no",sg:"cf",si:"lk",sk:"sk",sl:"si",sm:"ws",sn:"zw",so:"so",sq:"al",sr:"rs",ss:"za",st:"za",su:"id",sv:"se",sw:"tz",ta:"in",te:"in",tg:"tj",th:"th",ti:"et",tk:"tm",tl:"ph",tn:"za",to:"to",tr:"tr",ts:"za",tt:"ru",ty:"pf",ug:"cn",uk:"ua",ur:"pk",uz:"uz",ve:"za",vi:"vn",wa:"be",wo:"sn",xh:"za",yi:"il",yo:"ng",za:"cn",zh:"cn",zu:"za",ace:"id",ady:"ru",agq:"cm",alt:"ru",amo:"ng",asa:"tz",ast:"es",awa:"in",bal:"pk",ban:"id",bas:"cm",bax:"cm",bbc:"id",bem:"zm",bez:"tz",bfq:"in",bft:"pk",bfy:"in",bhb:"in",bho:"in",bik:"ph",bin:"ng",bjj:"in",bku:"ph",bqv:"ci",bra:"in",brx:"in",bss:"cm",btv:"pk",bua:"ru",buc:"yt",bug:"id",bya:"id",byn:"er",cch:"ng",ccp:"in",ceb:"ph",cgg:"ug",chk:"fm",chm:"ru",chp:"ca",chr:"us",cja:"kh",cjm:"vn",ckb:"iq",crk:"ca",csb:"pl",dar:"ru",dav:"ke",den:"ca",dgr:"ca",dje:"ne",doi:"in",dsb:"de",dua:"cm",dyo:"sn",dyu:"bf",ebu:"ke",efi:"ng",ewo:"cm",fan:"gq",fil:"ph",fon:"bj",fur:"it",gaa:"gh",gag:"md",gbm:"in",gcr:"gf",gez:"et",gil:"ki",gon:"in",gor:"id",grt:"in",gsw:"ch",guz:"ke",gwi:"ca",haw:"us",hil:"ph",hne:"in",hnn:"ph",hoc:"in",hoj:"in",ibb:"ng",ilo:"ph",inh:"ru",jgo:"cm",jmc:"tz",kaa:"uz",kab:"dz",kaj:"ng",kam:"ke",kbd:"ru",kcg:"ng",kde:"tz",kdt:"th",kea:"cv",ken:"cm",kfo:"ci",kfr:"in",kha:"in",khb:"cn",khq:"ml",kht:"in",kkj:"cm",kln:"ke",kmb:"ao",koi:"ru",kok:"in",kos:"fm",kpe:"lr",krc:"ru",kri:"sl",krl:"ru",kru:"in",ksb:"tz",ksf:"cm",ksh:"de",kum:"ru",lag:"tz",lah:"pk",lbe:"ru",lcp:"cn",lep:"in",lez:"ru",lif:"np",lis:"cn",lki:"ir",lmn:"in",lol:"cd",lua:"cd",luo:"ke",luy:"ke",lwl:"th",mad:"id",mag:"in",mai:"in",mak:"id",man:"gn",mas:"ke",mdf:"ru",mdh:"ph",mdr:"id",men:"sl",mer:"ke",mfe:"mu",mgh:"mz",mgo:"cm",min:"id",mni:"in",mnk:"gm",mnw:"mm",mos:"bf",mua:"cm",mwr:"in",myv:"ru",nap:"it",naq:"na",nds:"de","new":"np",niu:"nu",nmg:"cm",nnh:"cm",nod:"th",nso:"za",nus:"sd",nym:"tz",nyn:"ug",pag:"ph",pam:"ph",pap:"bq",pau:"pw",pon:"fm",prd:"ir",raj:"in",rcf:"re",rej:"id",rjs:"np",rkt:"in",rof:"tz",rwk:"tz",saf:"gh",sah:"ru",saq:"ke",sas:"id",sat:"in",saz:"in",sbp:"tz",scn:"it",sco:"gb",sdh:"ir",seh:"mz",ses:"ml",shi:"ma",shn:"mm",sid:"et",sma:"se",smj:"se",smn:"fi",sms:"fi",snk:"ml",srn:"sr",srr:"sn",ssy:"er",suk:"tz",sus:"gn",swb:"yt",swc:"cd",syl:"bd",syr:"sy",tbw:"ph",tcy:"in",tdd:"cn",tem:"sl",teo:"ug",tet:"tl",tig:"er",tiv:"ng",tkl:"tk",tmh:"ne",tpi:"pg",trv:"tw",tsg:"ph",tts:"th",tum:"mw",tvl:"tv",twq:"ne",tyv:"ru",tzm:"ma",udm:"ru",uli:"fm",umb:"ao",unr:"in",unx:"in",vai:"lr",vun:"tz",wae:"ch",wal:"et",war:"ph",xog:"ug",xsr:"np",yao:"mz",yap:"fm",yav:"cm",zza:"tr"}[tags[0]];
}else{
if(_757.length==4){
_757=tags[2];
}
}
return _757;
};
_752.getWeekend=function(_758){
var _759={"in":0,af:4,dz:4,ir:4,om:4,sa:4,ye:4,ae:5,bh:5,eg:5,il:5,iq:5,jo:5,kw:5,ly:5,ma:5,qa:5,sd:5,sy:5,tn:5},_75a={af:5,dz:5,ir:5,om:5,sa:5,ye:5,ae:6,bh:5,eg:6,il:6,iq:6,jo:6,kw:6,ly:6,ma:6,qa:6,sd:6,sy:6,tn:6},_75b=_752._region(_758),_75c=_759[_75b],end=_75a[_75b];
if(_75c===undefined){
_75c=6;
}
if(end===undefined){
end=0;
}
return {start:_75c,end:end};
};
return _752;
});
},"dijit/MenuBar":function(){
define(["dojo/_base/declare","dojo/keys","./_MenuBase","dojo/text!./templates/MenuBar.html"],function(_75d,keys,_75e,_75f){
return _75d("dijit.MenuBar",_75e,{templateString:_75f,baseClass:"dijitMenuBar",popupDelay:0,_isMenuBar:true,_orient:["below"],_moveToPopup:function(evt){
if(this.focusedChild&&this.focusedChild.popup&&!this.focusedChild.disabled){
this.onItemClick(this.focusedChild,evt);
}
},focusChild:function(item){
this.inherited(arguments);
if(this.activated&&item.popup&&!item.disabled){
this._openItemPopup(item,true);
}
},_onChildDeselect:function(item){
if(this.currentPopupItem==item){
this.currentPopupItem=null;
item._closePopup();
}
this.inherited(arguments);
},_onLeftArrow:function(){
this.focusPrev();
},_onRightArrow:function(){
this.focusNext();
},_onDownArrow:function(evt){
this._moveToPopup(evt);
},_onUpArrow:function(){
},onItemClick:function(item,evt){
if(item.popup&&item.popup.isShowingNow&&(!/^key/.test(evt.type)||evt.keyCode!==keys.DOWN_ARROW)){
item.focusNode.focus();
this._cleanUp(true);
}else{
this.inherited(arguments);
}
}});
});
},"dijit/ToolbarSeparator":function(){
define(["dojo/_base/declare","dojo/dom","./_Widget","./_TemplatedMixin"],function(_760,dom,_761,_762){
return _760("dijit.ToolbarSeparator",[_761,_762],{templateString:"<div class=\"dijitToolbarSeparator dijitInline\" role=\"presentation\"></div>",buildRendering:function(){
this.inherited(arguments);
dom.setSelectable(this.domNode,false);
},isFocusable:function(){
return false;
}});
});
},"dijit/layout/_LayoutWidget":function(){
define(["dojo/_base/lang","../_Widget","../_Container","../_Contained","../Viewport","dojo/_base/declare","dojo/dom-class","dojo/dom-geometry","dojo/dom-style"],function(lang,_763,_764,_765,_766,_767,_768,_769,_76a){
return _767("dijit.layout._LayoutWidget",[_763,_764,_765],{baseClass:"dijitLayoutContainer",isLayoutContainer:true,buildRendering:function(){
this.inherited(arguments);
_768.add(this.domNode,"dijitContainer");
},startup:function(){
if(this._started){
return;
}
this.inherited(arguments);
var _76b=this.getParent&&this.getParent();
if(!(_76b&&_76b.isLayoutContainer)){
this.resize();
this.own(_766.on("resize",lang.hitch(this,"resize")));
}
},resize:function(_76c,_76d){
var node=this.domNode;
if(_76c){
_769.setMarginBox(node,_76c);
}
var mb=_76d||{};
lang.mixin(mb,_76c||{});
if(!("h" in mb)||!("w" in mb)){
mb=lang.mixin(_769.getMarginBox(node),mb);
}
var cs=_76a.getComputedStyle(node);
var me=_769.getMarginExtents(node,cs);
var be=_769.getBorderExtents(node,cs);
var bb=(this._borderBox={w:mb.w-(me.w+be.w),h:mb.h-(me.h+be.h)});
var pe=_769.getPadExtents(node,cs);
this._contentBox={l:_76a.toPixelValue(node,cs.paddingLeft),t:_76a.toPixelValue(node,cs.paddingTop),w:bb.w-pe.w,h:bb.h-pe.h};
this.layout();
},layout:function(){
},_setupChild:function(_76e){
var cls=this.baseClass+"-child "+(_76e.baseClass?this.baseClass+"-"+_76e.baseClass:"");
_768.add(_76e.domNode,cls);
},addChild:function(_76f,_770){
this.inherited(arguments);
if(this._started){
this._setupChild(_76f);
}
},removeChild:function(_771){
var cls=this.baseClass+"-child"+(_771.baseClass?" "+this.baseClass+"-"+_771.baseClass:"");
_768.remove(_771.domNode,cls);
this.inherited(arguments);
}});
});
},"dijit/popup":function(){
define(["dojo/_base/array","dojo/aspect","dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-construct","dojo/dom-geometry","dojo/dom-style","dojo/has","dojo/keys","dojo/_base/lang","dojo/on","./place","./BackgroundIframe","./Viewport","./main"],function(_772,_773,_774,dom,_775,_776,_777,_778,has,keys,lang,on,_779,_77a,_77b,_77c){
function _77d(){
if(this._popupWrapper){
_776.destroy(this._popupWrapper);
delete this._popupWrapper;
}
};
var _77e=_774(null,{_stack:[],_beginZIndex:1000,_idGen:1,_repositionAll:function(){
if(this._firstAroundNode){
var _77f=this._firstAroundPosition,_780=_777.position(this._firstAroundNode,true),dx=_780.x-_77f.x,dy=_780.y-_77f.y;
if(dx||dy){
this._firstAroundPosition=_780;
for(var i=0;i<this._stack.length;i++){
var _781=this._stack[i].wrapper.style;
_781.top=(parseInt(_781.top,10)+dy)+"px";
if(_781.right=="auto"){
_781.left=(parseInt(_781.left,10)+dx)+"px";
}else{
_781.right=(parseInt(_781.right,10)-dx)+"px";
}
}
}
this._aroundMoveListener=setTimeout(lang.hitch(this,"_repositionAll"),dx||dy?10:50);
}
},_createWrapper:function(_782){
var _783=_782._popupWrapper,node=_782.domNode;
if(!_783){
_783=_776.create("div",{"class":"dijitPopup",style:{display:"none"},role:"region","aria-label":_782["aria-label"]||_782.label||_782.name||_782.id},_782.ownerDocumentBody);
_783.appendChild(node);
var s=node.style;
s.display="";
s.visibility="";
s.position="";
s.top="0px";
_782._popupWrapper=_783;
_773.after(_782,"destroy",_77d,true);
}
return _783;
},moveOffScreen:function(_784){
var _785=this._createWrapper(_784);
var ltr=_777.isBodyLtr(_784.ownerDocument),_786={visibility:"hidden",top:"-9999px",display:""};
_786[ltr?"left":"right"]="-9999px";
_786[ltr?"right":"left"]="auto";
_778.set(_785,_786);
return _785;
},hide:function(_787){
var _788=this._createWrapper(_787);
_778.set(_788,{display:"none",height:"auto",overflow:"visible",border:""});
var node=_787.domNode;
if("_originalStyle" in node){
node.style.cssText=node._originalStyle;
}
},getTopPopup:function(){
var _789=this._stack;
for(var pi=_789.length-1;pi>0&&_789[pi].parent===_789[pi-1].widget;pi--){
}
return _789[pi];
},open:function(args){
var _78a=this._stack,_78b=args.popup,node=_78b.domNode,_78c=args.orient||["below","below-alt","above","above-alt"],ltr=args.parent?args.parent.isLeftToRight():_777.isBodyLtr(_78b.ownerDocument),_78d=args.around,id=(args.around&&args.around.id)?(args.around.id+"_dropdown"):("popup_"+this._idGen++);
while(_78a.length&&(!args.parent||!dom.isDescendant(args.parent.domNode,_78a[_78a.length-1].widget.domNode))){
this.close(_78a[_78a.length-1].widget);
}
var _78e=this.moveOffScreen(_78b);
if(_78b.startup&&!_78b._started){
_78b.startup();
}
var _78f,_790=_777.position(node);
if("maxHeight" in args&&args.maxHeight!=-1){
_78f=args.maxHeight||Infinity;
}else{
var _791=_77b.getEffectiveBox(this.ownerDocument),_792=_78d?_777.position(_78d,false):{y:args.y-(args.padding||0),h:(args.padding||0)*2};
_78f=Math.floor(Math.max(_792.y,_791.h-(_792.y+_792.h)));
}
if(_790.h>_78f){
var cs=_778.getComputedStyle(node),_793=cs.borderLeftWidth+" "+cs.borderLeftStyle+" "+cs.borderLeftColor;
_778.set(_78e,{overflowY:"scroll",height:_78f+"px",border:_793});
node._originalStyle=node.style.cssText;
node.style.border="none";
}
_775.set(_78e,{id:id,style:{zIndex:this._beginZIndex+_78a.length},"class":"dijitPopup "+(_78b.baseClass||_78b["class"]||"").split(" ")[0]+"Popup",dijitPopupParent:args.parent?args.parent.id:""});
if(_78a.length==0&&_78d){
this._firstAroundNode=_78d;
this._firstAroundPosition=_777.position(_78d,true);
this._aroundMoveListener=setTimeout(lang.hitch(this,"_repositionAll"),50);
}
if(has("config-bgIframe")&&!_78b.bgIframe){
_78b.bgIframe=new _77a(_78e);
}
var _794=_78b.orient?lang.hitch(_78b,"orient"):null,best=_78d?_779.around(_78e,_78d,_78c,ltr,_794):_779.at(_78e,args,_78c=="R"?["TR","BR","TL","BL"]:["TL","BL","TR","BR"],args.padding,_794);
_78e.style.visibility="visible";
node.style.visibility="visible";
var _795=[];
_795.push(on(_78e,"keydown",lang.hitch(this,function(evt){
if(evt.keyCode==keys.ESCAPE&&args.onCancel){
evt.stopPropagation();
evt.preventDefault();
args.onCancel();
}else{
if(evt.keyCode==keys.TAB){
evt.stopPropagation();
evt.preventDefault();
var _796=this.getTopPopup();
if(_796&&_796.onCancel){
_796.onCancel();
}
}
}
})));
if(_78b.onCancel&&args.onCancel){
_795.push(_78b.on("cancel",args.onCancel));
}
_795.push(_78b.on(_78b.onExecute?"execute":"change",lang.hitch(this,function(){
var _797=this.getTopPopup();
if(_797&&_797.onExecute){
_797.onExecute();
}
})));
_78a.push({widget:_78b,wrapper:_78e,parent:args.parent,onExecute:args.onExecute,onCancel:args.onCancel,onClose:args.onClose,handlers:_795});
if(_78b.onOpen){
_78b.onOpen(best);
}
return best;
},close:function(_798){
var _799=this._stack;
while((_798&&_772.some(_799,function(elem){
return elem.widget==_798;
}))||(!_798&&_799.length)){
var top=_799.pop(),_79a=top.widget,_79b=top.onClose;
if(_79a.onClose){
_79a.onClose();
}
var h;
while(h=top.handlers.pop()){
h.remove();
}
if(_79a&&_79a.domNode){
this.hide(_79a);
}
if(_79b){
_79b();
}
}
if(_799.length==0&&this._aroundMoveListener){
clearTimeout(this._aroundMoveListener);
this._firstAroundNode=this._firstAroundPosition=this._aroundMoveListener=null;
}
}});
return (_77c.popup=new _77e());
});
},"dijit/_base/manager":function(){
define(["dojo/_base/array","dojo/_base/config","dojo/_base/lang","../registry","../main"],function(_79c,_79d,lang,_79e,_79f){
var _7a0={};
_79c.forEach(["byId","getUniqueId","findWidgets","_destroyAll","byNode","getEnclosingWidget"],function(name){
_7a0[name]=_79e[name];
});
lang.mixin(_7a0,{defaultDuration:_79d["defaultDuration"]||200});
lang.mixin(_79f,_7a0);
return _79f;
});
},"dijit/layout/StackController":function(){
define(["dojo/_base/array","dojo/_base/declare","dojo/dom-class","dojo/dom-construct","dojo/keys","dojo/_base/lang","dojo/on","dojo/topic","../focus","../registry","../_Widget","../_TemplatedMixin","../_Container","../form/ToggleButton","dojo/touch","dojo/i18n!../nls/common"],function(_7a1,_7a2,_7a3,_7a4,keys,lang,on,_7a5,_7a6,_7a7,_7a8,_7a9,_7aa,_7ab){
var _7ac=_7a2("dijit.layout._StackButton",_7ab,{tabIndex:"-1",closeButton:false,_aria_attr:"aria-selected",buildRendering:function(evt){
this.inherited(arguments);
(this.focusNode||this.domNode).setAttribute("role","tab");
}});
var _7ad=_7a2("dijit.layout.StackController",[_7a8,_7a9,_7aa],{baseClass:"dijitStackController",templateString:"<span role='tablist' data-dojo-attach-event='onkeydown'></span>",containerId:"",buttonWidget:_7ac,buttonWidgetCloseClass:"dijitStackCloseButton",pane2button:function(id){
return _7a7.byId(this.id+"_"+id);
},postCreate:function(){
this.inherited(arguments);
this.own(_7a5.subscribe(this.containerId+"-startup",lang.hitch(this,"onStartup")),_7a5.subscribe(this.containerId+"-addChild",lang.hitch(this,"onAddChild")),_7a5.subscribe(this.containerId+"-removeChild",lang.hitch(this,"onRemoveChild")),_7a5.subscribe(this.containerId+"-selectChild",lang.hitch(this,"onSelectChild")),_7a5.subscribe(this.containerId+"-containerKeyDown",lang.hitch(this,"onContainerKeyDown")));
this.containerNode.dojoClick=true;
this.own(on(this.containerNode,"click",lang.hitch(this,function(evt){
var _7ae=_7a7.getEnclosingWidget(evt.target);
if(_7ae!=this.containerNode&&!_7ae.disabled&&_7ae.page){
for(var _7af=evt.target;_7af!==this.containerNode;_7af=_7af.parentNode){
if(_7a3.contains(_7af,this.buttonWidgetCloseClass)){
this.onCloseButtonClick(_7ae.page);
break;
}else{
if(_7af==_7ae.domNode){
this.onButtonClick(_7ae.page);
break;
}
}
}
}
})));
},onStartup:function(info){
this.textDir=info.textDir;
_7a1.forEach(info.children,this.onAddChild,this);
if(info.selected){
this.onSelectChild(info.selected);
}
var _7b0=_7a7.byId(this.containerId).containerNode,_7b1=lang.hitch(this,"pane2button"),_7b2={"title":"label","showtitle":"showLabel","iconclass":"iconClass","closable":"closeButton","tooltip":"title","disabled":"disabled","textdir":"textdir"},_7b3=function(attr,_7b4){
return on(_7b0,"attrmodified-"+attr,function(evt){
var _7b5=_7b1(evt.detail&&evt.detail.widget&&evt.detail.widget.id);
if(_7b5){
_7b5.set(_7b4,evt.detail.newValue);
}
});
};
for(var attr in _7b2){
this.own(_7b3(attr,_7b2[attr]));
}
},destroy:function(_7b6){
this.destroyDescendants(_7b6);
this.inherited(arguments);
},onAddChild:function(page,_7b7){
var Cls=lang.isString(this.buttonWidget)?lang.getObject(this.buttonWidget):this.buttonWidget;
var _7b8=new Cls({id:this.id+"_"+page.id,name:this.id+"_"+page.id,label:page.title,disabled:page.disabled,ownerDocument:this.ownerDocument,dir:page.dir,lang:page.lang,textDir:page.textDir||this.textDir,showLabel:page.showTitle,iconClass:page.iconClass,closeButton:page.closable,title:page.tooltip,page:page});
this.addChild(_7b8,_7b7);
page.controlButton=_7b8;
if(!this._currentChild){
this.onSelectChild(page);
}
var _7b9=page._wrapper.getAttribute("aria-labelledby")?page._wrapper.getAttribute("aria-labelledby")+" "+_7b8.id:_7b8.id;
page._wrapper.removeAttribute("aria-label");
page._wrapper.setAttribute("aria-labelledby",_7b9);
},onRemoveChild:function(page){
if(this._currentChild===page){
this._currentChild=null;
}
var _7ba=this.pane2button(page.id);
if(_7ba){
this.removeChild(_7ba);
_7ba.destroy();
}
delete page.controlButton;
},onSelectChild:function(page){
if(!page){
return;
}
if(this._currentChild){
var _7bb=this.pane2button(this._currentChild.id);
_7bb.set("checked",false);
_7bb.focusNode.setAttribute("tabIndex","-1");
}
var _7bc=this.pane2button(page.id);
_7bc.set("checked",true);
this._currentChild=page;
_7bc.focusNode.setAttribute("tabIndex","0");
var _7bd=_7a7.byId(this.containerId);
},onButtonClick:function(page){
var _7be=this.pane2button(page.id);
_7a6.focus(_7be.focusNode);
if(this._currentChild&&this._currentChild.id===page.id){
_7be.set("checked",true);
}
var _7bf=_7a7.byId(this.containerId);
_7bf.selectChild(page);
},onCloseButtonClick:function(page){
var _7c0=_7a7.byId(this.containerId);
_7c0.closeChild(page);
if(this._currentChild){
var b=this.pane2button(this._currentChild.id);
if(b){
_7a6.focus(b.focusNode||b.domNode);
}
}
},adjacent:function(_7c1){
if(!this.isLeftToRight()&&(!this.tabPosition||/top|bottom/.test(this.tabPosition))){
_7c1=!_7c1;
}
var _7c2=this.getChildren();
var idx=_7a1.indexOf(_7c2,this.pane2button(this._currentChild.id)),_7c3=_7c2[idx];
var _7c4;
do{
idx=(idx+(_7c1?1:_7c2.length-1))%_7c2.length;
_7c4=_7c2[idx];
}while(_7c4.disabled&&_7c4!=_7c3);
return _7c4;
},onkeydown:function(e,_7c5){
if(this.disabled||e.altKey){
return;
}
var _7c6=null;
if(e.ctrlKey||!e._djpage){
switch(e.keyCode){
case keys.LEFT_ARROW:
case keys.UP_ARROW:
if(!e._djpage){
_7c6=false;
}
break;
case keys.PAGE_UP:
if(e.ctrlKey){
_7c6=false;
}
break;
case keys.RIGHT_ARROW:
case keys.DOWN_ARROW:
if(!e._djpage){
_7c6=true;
}
break;
case keys.PAGE_DOWN:
if(e.ctrlKey){
_7c6=true;
}
break;
case keys.HOME:
var _7c7=this.getChildren();
for(var idx=0;idx<_7c7.length;idx++){
var _7c8=_7c7[idx];
if(!_7c8.disabled){
this.onButtonClick(_7c8.page);
break;
}
}
e.stopPropagation();
e.preventDefault();
break;
case keys.END:
var _7c7=this.getChildren();
for(var idx=_7c7.length-1;idx>=0;idx--){
var _7c8=_7c7[idx];
if(!_7c8.disabled){
this.onButtonClick(_7c8.page);
break;
}
}
e.stopPropagation();
e.preventDefault();
break;
case keys.DELETE:
case "W".charCodeAt(0):
if(this._currentChild.closable&&(e.keyCode==keys.DELETE||e.ctrlKey)){
this.onCloseButtonClick(this._currentChild);
e.stopPropagation();
e.preventDefault();
}
break;
case keys.TAB:
if(e.ctrlKey){
this.onButtonClick(this.adjacent(!e.shiftKey).page);
e.stopPropagation();
e.preventDefault();
}
break;
}
if(_7c6!==null){
this.onButtonClick(this.adjacent(_7c6).page);
e.stopPropagation();
e.preventDefault();
}
}
},onContainerKeyDown:function(info){
info.e._djpage=info.page;
this.onkeydown(info.e);
}});
_7ad.StackButton=_7ac;
return _7ad;
});
},"dojo/dnd/Mover":function(){
define(["../_base/array","../_base/declare","../_base/lang","../sniff","../_base/window","../dom","../dom-geometry","../dom-style","../Evented","../on","../touch","./common","./autoscroll"],function(_7c9,_7ca,lang,has,win,dom,_7cb,_7cc,_7cd,on,_7ce,dnd,_7cf){
return _7ca("dojo.dnd.Mover",[_7cd],{constructor:function(node,e,host){
this.node=dom.byId(node);
this.marginBox={l:e.pageX,t:e.pageY};
this.mouseButton=e.button;
var h=(this.host=host),d=node.ownerDocument;
function _7d0(e){
e.preventDefault();
e.stopPropagation();
};
this.events=[on(d,_7ce.move,lang.hitch(this,"onFirstMove")),on(d,_7ce.move,lang.hitch(this,"onMouseMove")),on(d,_7ce.release,lang.hitch(this,"onMouseUp")),on(d,"dragstart",_7d0),on(d.body,"selectstart",_7d0)];
_7cf.autoScrollStart(d);
if(h&&h.onMoveStart){
h.onMoveStart(this);
}
},onMouseMove:function(e){
_7cf.autoScroll(e);
var m=this.marginBox;
this.host.onMove(this,{l:m.l+e.pageX,t:m.t+e.pageY},e);
e.preventDefault();
e.stopPropagation();
},onMouseUp:function(e){
if(has("webkit")&&has("mac")&&this.mouseButton==2?e.button==0:this.mouseButton==e.button){
this.destroy();
}
e.preventDefault();
e.stopPropagation();
},onFirstMove:function(e){
var s=this.node.style,l,t,h=this.host;
switch(s.position){
case "relative":
case "absolute":
l=Math.round(parseFloat(s.left))||0;
t=Math.round(parseFloat(s.top))||0;
break;
default:
s.position="absolute";
var m=_7cb.getMarginBox(this.node);
var b=win.doc.body;
var bs=_7cc.getComputedStyle(b);
var bm=_7cb.getMarginBox(b,bs);
var bc=_7cb.getContentBox(b,bs);
l=m.l-(bc.l-bm.l);
t=m.t-(bc.t-bm.t);
break;
}
this.marginBox.l=l-this.marginBox.l;
this.marginBox.t=t-this.marginBox.t;
if(h&&h.onFirstMove){
h.onFirstMove(this,e);
}
this.events.shift().remove();
},destroy:function(){
_7c9.forEach(this.events,function(_7d1){
_7d1.remove();
});
var h=this.host;
if(h&&h.onMoveStop){
h.onMoveStop(this);
}
this.events=this.node=this.host=null;
}});
});
},"dijit/layout/TabContainer":function(){
define(["dojo/_base/lang","dojo/_base/declare","./_TabContainerBase","./TabController","./ScrollingTabController"],function(lang,_7d2,_7d3,_7d4,_7d5){
return _7d2("dijit.layout.TabContainer",_7d3,{useMenu:true,useSlider:true,controllerWidget:"",_makeController:function(_7d6){
var cls=this.baseClass+"-tabs"+(this.doLayout?"":" dijitTabNoLayout"),_7d4=typeof this.controllerWidget=="string"?lang.getObject(this.controllerWidget):this.controllerWidget;
return new _7d4({id:this.id+"_tablist",ownerDocument:this.ownerDocument,dir:this.dir,lang:this.lang,textDir:this.textDir,tabPosition:this.tabPosition,doLayout:this.doLayout,containerId:this.id,"class":cls,nested:this.nested,useMenu:this.useMenu,useSlider:this.useSlider,tabStripClass:this.tabStrip?this.baseClass+(this.tabStrip?"":"No")+"Strip":null},_7d6);
},postMixInProperties:function(){
this.inherited(arguments);
if(!this.controllerWidget){
this.controllerWidget=(this.tabPosition=="top"||this.tabPosition=="bottom")&&!this.nested?_7d5:_7d4;
}
}});
});
},"dijit/BackgroundIframe":function(){
define(["require","./main","dojo/_base/config","dojo/dom-construct","dojo/dom-style","dojo/_base/lang","dojo/on","dojo/sniff"],function(_7d7,_7d8,_7d9,_7da,_7db,lang,on,has){
has.add("config-bgIframe",!has("touch"));
var _7dc=new function(){
var _7dd=[];
this.pop=function(){
var _7de;
if(_7dd.length){
_7de=_7dd.pop();
_7de.style.display="";
}else{
if(has("ie")<9){
var burl=_7d9["dojoBlankHtmlUrl"]||_7d7.toUrl("dojo/resources/blank.html")||"javascript:\"\"";
var html="<iframe src='"+burl+"' role='presentation'"+" style='position: absolute; left: 0px; top: 0px;"+"z-index: -1; filter:Alpha(Opacity=\"0\");'>";
_7de=document.createElement(html);
}else{
_7de=_7da.create("iframe");
_7de.src="javascript:\"\"";
_7de.className="dijitBackgroundIframe";
_7de.setAttribute("role","presentation");
_7db.set(_7de,"opacity",0.1);
}
_7de.tabIndex=-1;
}
return _7de;
};
this.push=function(_7df){
_7df.style.display="none";
_7dd.push(_7df);
};
}();
_7d8.BackgroundIframe=function(node){
if(!node.id){
throw new Error("no id");
}
if(has("config-bgIframe")){
var _7e0=(this.iframe=_7dc.pop());
node.appendChild(_7e0);
if(has("ie")<7||has("quirks")){
this.resize(node);
this._conn=on(node,"resize",lang.hitch(this,"resize",node));
}else{
_7db.set(_7e0,{width:"100%",height:"100%"});
}
}
};
lang.extend(_7d8.BackgroundIframe,{resize:function(node){
if(this.iframe){
_7db.set(this.iframe,{width:node.offsetWidth+"px",height:node.offsetHeight+"px"});
}
},destroy:function(){
if(this._conn){
this._conn.remove();
this._conn=null;
}
if(this.iframe){
_7dc.push(this.iframe);
delete this.iframe;
}
}});
return _7d8.BackgroundIframe;
});
},"dijit/_editor/nls/FontChoice":function(){
define({root:({fontSize:"Size",fontName:"Font",formatBlock:"Format",serif:"serif","sans-serif":"sans-serif",monospace:"monospace",cursive:"cursive",fantasy:"fantasy",noFormat:"None",p:"Paragraph",h1:"Heading",h2:"Subheading",h3:"Sub-subheading",pre:"Pre-formatted",1:"xx-small",2:"x-small",3:"small",4:"medium",5:"large",6:"x-large",7:"xx-large"}),"zh":true,"zh-tw":true,"uk":true,"tr":true,"th":true,"sv":true,"sl":true,"sk":true,"ru":true,"ro":true,"pt":true,"pt-pt":true,"pl":true,"nl":true,"nb":true,"ko":true,"kk":true,"ja":true,"it":true,"hu":true,"hr":true,"he":true,"fr":true,"fi":true,"es":true,"el":true,"de":true,"da":true,"cs":true,"ca":true,"bg":true,"az":true,"ar":true});
},"dijit/_editor/nls/pt/FontChoice":function(){
define(({fontSize:"Tamanho",fontName:"Fonte",formatBlock:"Formatar",serif:"serif","sans-serif":"sans-serif",monospace:"espaço simples",cursive:"cursiva",fantasy:"fantasy",noFormat:"Nenhum",p:"Parágrafo",h1:"Título",h2:"Subtítulo",h3:"Sub-subtítulo",pre:"Pré-formatado",1:"extra-extra-pequeno",2:"extra-pequeno",3:"pequena",4:"médio",5:"grande",6:"extra-grande",7:"extra-extra-grande"}));
},"dijit/_editor/nls/pt/FontChoice":function(){
define(({fontSize:"Tamanho",fontName:"Fonte",formatBlock:"Formatar",serif:"serif","sans-serif":"sans-serif",monospace:"espaço simples",cursive:"cursiva",fantasy:"fantasy",noFormat:"Nenhum",p:"Parágrafo",h1:"Título",h2:"Subtítulo",h3:"Sub-subtítulo",pre:"Pré-formatado",1:"extra-extra-pequeno",2:"extra-pequeno",3:"pequena",4:"médio",5:"grande",6:"extra-grande",7:"extra-extra-grande"}));
},"dijit/form/_Spinner":function(){
define(["dojo/_base/declare","dojo/keys","dojo/_base/lang","dojo/sniff","dojo/mouse","dojo/on","../typematic","./RangeBoundTextBox","dojo/text!./templates/Spinner.html","./_TextBoxMixin"],function(_7e1,keys,lang,has,_7e2,on,_7e3,_7e4,_7e5,_7e6){
return _7e1("dijit.form._Spinner",_7e4,{defaultTimeout:500,minimumTimeout:10,timeoutChangeRate:0.9,smallDelta:1,largeDelta:10,templateString:_7e5,baseClass:"dijitTextBox dijitSpinner",cssStateNodes:{"upArrowNode":"dijitUpArrowButton","downArrowNode":"dijitDownArrowButton"},adjust:function(val){
return val;
},_arrowPressed:function(_7e7,_7e8,_7e9){
if(this.disabled||this.readOnly){
return;
}
this._setValueAttr(this.adjust(this.get("value"),_7e8*_7e9),false);
_7e6.selectInputText(this.textbox,this.textbox.value.length);
},_arrowReleased:function(){
this._wheelTimer=null;
},_typematicCallback:function(_7ea,node,evt){
var inc=this.smallDelta;
if(node==this.textbox){
var key=evt.keyCode;
inc=(key==keys.PAGE_UP||key==keys.PAGE_DOWN)?this.largeDelta:this.smallDelta;
node=(key==keys.UP_ARROW||key==keys.PAGE_UP)?this.upArrowNode:this.downArrowNode;
}
if(_7ea==-1){
this._arrowReleased(node);
}else{
this._arrowPressed(node,(node==this.upArrowNode)?1:-1,inc);
}
},_wheelTimer:null,_mouseWheeled:function(evt){
evt.stopPropagation();
evt.preventDefault();
var _7eb=evt.wheelDelta/120;
if(Math.floor(_7eb)!=_7eb){
_7eb=evt.wheelDelta>0?1:-1;
}
var _7ec=evt.detail?(evt.detail*-1):_7eb;
if(_7ec!==0){
var node=this[(_7ec>0?"upArrowNode":"downArrowNode")];
this._arrowPressed(node,_7ec,this.smallDelta);
if(this._wheelTimer){
this._wheelTimer.remove();
}
this._wheelTimer=this.defer(function(){
this._arrowReleased(node);
},50);
}
},_setConstraintsAttr:function(_7ed){
this.inherited(arguments);
if(this.focusNode){
if(this.constraints.min!==undefined){
this.focusNode.setAttribute("aria-valuemin",this.constraints.min);
}else{
this.focusNode.removeAttribute("aria-valuemin");
}
if(this.constraints.max!==undefined){
this.focusNode.setAttribute("aria-valuemax",this.constraints.max);
}else{
this.focusNode.removeAttribute("aria-valuemax");
}
}
},_setValueAttr:function(_7ee,_7ef){
this.focusNode.setAttribute("aria-valuenow",_7ee);
this.inherited(arguments);
},postCreate:function(){
this.inherited(arguments);
this.own(on(this.domNode,_7e2.wheel,lang.hitch(this,"_mouseWheeled")),_7e3.addListener(this.upArrowNode,this.textbox,{keyCode:keys.UP_ARROW,ctrlKey:false,altKey:false,shiftKey:false,metaKey:false},this,"_typematicCallback",this.timeoutChangeRate,this.defaultTimeout,this.minimumTimeout),_7e3.addListener(this.downArrowNode,this.textbox,{keyCode:keys.DOWN_ARROW,ctrlKey:false,altKey:false,shiftKey:false,metaKey:false},this,"_typematicCallback",this.timeoutChangeRate,this.defaultTimeout,this.minimumTimeout),_7e3.addListener(this.upArrowNode,this.textbox,{keyCode:keys.PAGE_UP,ctrlKey:false,altKey:false,shiftKey:false,metaKey:false},this,"_typematicCallback",this.timeoutChangeRate,this.defaultTimeout,this.minimumTimeout),_7e3.addListener(this.downArrowNode,this.textbox,{keyCode:keys.PAGE_DOWN,ctrlKey:false,altKey:false,shiftKey:false,metaKey:false},this,"_typematicCallback",this.timeoutChangeRate,this.defaultTimeout,this.minimumTimeout));
}});
});
},"dijit/form/Button":function(){
define(["require","dojo/_base/declare","dojo/dom-class","dojo/has","dojo/_base/kernel","dojo/_base/lang","dojo/ready","./_FormWidget","./_ButtonMixin","dojo/text!./templates/Button.html"],function(_7f0,_7f1,_7f2,has,_7f3,lang,_7f4,_7f5,_7f6,_7f7){
if(has("dijit-legacy-requires")){
_7f4(0,function(){
var _7f8=["dijit/form/DropDownButton","dijit/form/ComboButton","dijit/form/ToggleButton"];
_7f0(_7f8);
});
}
var _7f9=_7f1("dijit.form.Button"+(has("dojo-bidi")?"_NoBidi":""),[_7f5,_7f6],{showLabel:true,iconClass:"dijitNoIcon",_setIconClassAttr:{node:"iconNode",type:"class"},baseClass:"dijitButton",templateString:_7f7,_setValueAttr:"valueNode",_setNameAttr:function(name){
if(this.valueNode){
this.valueNode.setAttribute("name",name);
}
},_fillContent:function(_7fa){
if(_7fa&&(!this.params||!("label" in this.params))){
var _7fb=lang.trim(_7fa.innerHTML);
if(_7fb){
this.label=_7fb;
}
}
},_setShowLabelAttr:function(val){
if(this.containerNode){
_7f2.toggle(this.containerNode,"dijitDisplayNone",!val);
}
this._set("showLabel",val);
},setLabel:function(_7fc){
_7f3.deprecated("dijit.form.Button.setLabel() is deprecated.  Use set('label', ...) instead.","","2.0");
this.set("label",_7fc);
},_setLabelAttr:function(_7fd){
this.inherited(arguments);
if(!this.showLabel&&!("title" in this.params)){
this.titleNode.title=lang.trim(this.containerNode.innerText||this.containerNode.textContent||"");
}
}});
if(has("dojo-bidi")){
_7f9=_7f1("dijit.form.Button",_7f9,{_setLabelAttr:function(_7fe){
this.inherited(arguments);
if(this.titleNode.title){
this.applyTextDir(this.titleNode,this.titleNode.title);
}
},_setTextDirAttr:function(_7ff){
if(this._created&&this.textDir!=_7ff){
this._set("textDir",_7ff);
this._setLabelAttr(this.label);
}
}});
}
return _7f9;
});
},"dijit/_WidgetBase":function(){
define(["require","dojo/_base/array","dojo/aspect","dojo/_base/config","dojo/_base/connect","dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-class","dojo/dom-construct","dojo/dom-geometry","dojo/dom-style","dojo/has","dojo/_base/kernel","dojo/_base/lang","dojo/on","dojo/ready","dojo/Stateful","dojo/topic","dojo/_base/window","./Destroyable","dojo/has!dojo-bidi?./_BidiMixin","./registry"],function(_800,_801,_802,_803,_804,_805,dom,_806,_807,_808,_809,_80a,has,_80b,lang,on,_80c,_80d,_80e,win,_80f,_810,_811){
has.add("dijit-legacy-requires",!_80b.isAsync);
has.add("dojo-bidi",false);
if(has("dijit-legacy-requires")){
_80c(0,function(){
var _812=["dijit/_base/manager"];
_800(_812);
});
}
var _813={};
function _814(obj){
var ret={};
for(var attr in obj){
ret[attr.toLowerCase()]=true;
}
return ret;
};
function _815(attr){
return function(val){
_806[val?"set":"remove"](this.domNode,attr,val);
this._set(attr,val);
};
};
function _816(a,b){
return a===b||(a!==a&&b!==b);
};
var _817=_805("dijit._WidgetBase",[_80d,_80f],{id:"",_setIdAttr:"domNode",lang:"",_setLangAttr:_815("lang"),dir:"",_setDirAttr:_815("dir"),"class":"",_setClassAttr:{node:"domNode",type:"class"},style:"",title:"",tooltip:"",baseClass:"",srcNodeRef:null,domNode:null,containerNode:null,ownerDocument:null,_setOwnerDocumentAttr:function(val){
this._set("ownerDocument",val);
},attributeMap:{},_blankGif:_803.blankGif||_800.toUrl("dojo/resources/blank.gif"),_introspect:function(){
var ctor=this.constructor;
if(!ctor._setterAttrs){
var _818=ctor.prototype,_819=ctor._setterAttrs=[],_81a=(ctor._onMap={});
for(var name in _818.attributeMap){
_819.push(name);
}
for(name in _818){
if(/^on/.test(name)){
_81a[name.substring(2).toLowerCase()]=name;
}
if(/^_set[A-Z](.*)Attr$/.test(name)){
name=name.charAt(4).toLowerCase()+name.substr(5,name.length-9);
if(!_818.attributeMap||!(name in _818.attributeMap)){
_819.push(name);
}
}
}
}
},postscript:function(_81b,_81c){
this.create(_81b,_81c);
},create:function(_81d,_81e){
this._introspect();
this.srcNodeRef=dom.byId(_81e);
this._connects=[];
this._supportingWidgets=[];
if(this.srcNodeRef&&(typeof this.srcNodeRef.id=="string")){
this.id=this.srcNodeRef.id;
}
if(_81d){
this.params=_81d;
lang.mixin(this,_81d);
}
this.postMixInProperties();
if(!this.id){
this.id=_811.getUniqueId(this.declaredClass.replace(/\./g,"_"));
if(this.params){
delete this.params.id;
}
}
this.ownerDocument=this.ownerDocument||(this.srcNodeRef?this.srcNodeRef.ownerDocument:document);
this.ownerDocumentBody=win.body(this.ownerDocument);
_811.add(this);
this.buildRendering();
var _81f;
if(this.domNode){
this._applyAttributes();
var _820=this.srcNodeRef;
if(_820&&_820.parentNode&&this.domNode!==_820){
_820.parentNode.replaceChild(this.domNode,_820);
_81f=true;
}
this.domNode.setAttribute("widgetId",this.id);
}
this.postCreate();
if(_81f){
delete this.srcNodeRef;
}
this._created=true;
},_applyAttributes:function(){
var _821={};
for(var key in this.params||{}){
_821[key]=this._get(key);
}
_801.forEach(this.constructor._setterAttrs,function(key){
if(!(key in _821)){
var val=this._get(key);
if(val){
this.set(key,val);
}
}
},this);
for(key in _821){
this.set(key,_821[key]);
}
},postMixInProperties:function(){
},buildRendering:function(){
if(!this.domNode){
this.domNode=this.srcNodeRef||this.ownerDocument.createElement("div");
}
if(this.baseClass){
var _822=this.baseClass.split(" ");
if(!this.isLeftToRight()){
_822=_822.concat(_801.map(_822,function(name){
return name+"Rtl";
}));
}
_807.add(this.domNode,_822);
}
},postCreate:function(){
},startup:function(){
if(this._started){
return;
}
this._started=true;
_801.forEach(this.getChildren(),function(obj){
if(!obj._started&&!obj._destroyed&&lang.isFunction(obj.startup)){
obj.startup();
obj._started=true;
}
});
},destroyRecursive:function(_823){
this._beingDestroyed=true;
this.destroyDescendants(_823);
this.destroy(_823);
},destroy:function(_824){
this._beingDestroyed=true;
this.uninitialize();
function _825(w){
if(w.destroyRecursive){
w.destroyRecursive(_824);
}else{
if(w.destroy){
w.destroy(_824);
}
}
};
_801.forEach(this._connects,lang.hitch(this,"disconnect"));
_801.forEach(this._supportingWidgets,_825);
if(this.domNode){
_801.forEach(_811.findWidgets(this.domNode,this.containerNode),_825);
}
this.destroyRendering(_824);
_811.remove(this.id);
this._destroyed=true;
},destroyRendering:function(_826){
if(this.bgIframe){
this.bgIframe.destroy(_826);
delete this.bgIframe;
}
if(this.domNode){
if(_826){
_806.remove(this.domNode,"widgetId");
}else{
_808.destroy(this.domNode);
}
delete this.domNode;
}
if(this.srcNodeRef){
if(!_826){
_808.destroy(this.srcNodeRef);
}
delete this.srcNodeRef;
}
},destroyDescendants:function(_827){
_801.forEach(this.getChildren(),function(_828){
if(_828.destroyRecursive){
_828.destroyRecursive(_827);
}
});
},uninitialize:function(){
return false;
},_setStyleAttr:function(_829){
var _82a=this.domNode;
if(lang.isObject(_829)){
_80a.set(_82a,_829);
}else{
if(_82a.style.cssText){
_82a.style.cssText+="; "+_829;
}else{
_82a.style.cssText=_829;
}
}
this._set("style",_829);
},_attrToDom:function(attr,_82b,_82c){
_82c=arguments.length>=3?_82c:this.attributeMap[attr];
_801.forEach(lang.isArray(_82c)?_82c:[_82c],function(_82d){
var _82e=this[_82d.node||_82d||"domNode"];
var type=_82d.type||"attribute";
switch(type){
case "attribute":
if(lang.isFunction(_82b)){
_82b=lang.hitch(this,_82b);
}
var _82f=_82d.attribute?_82d.attribute:(/^on[A-Z][a-zA-Z]*$/.test(attr)?attr.toLowerCase():attr);
if(_82e.tagName){
_806.set(_82e,_82f,_82b);
}else{
_82e.set(_82f,_82b);
}
break;
case "innerText":
_82e.innerHTML="";
_82e.appendChild(this.ownerDocument.createTextNode(_82b));
break;
case "innerHTML":
_82e.innerHTML=_82b;
break;
case "class":
_807.replace(_82e,_82b,this[attr]);
break;
}
},this);
},get:function(name){
var _830=this._getAttrNames(name);
return this[_830.g]?this[_830.g]():this._get(name);
},set:function(name,_831){
if(typeof name==="object"){
for(var x in name){
this.set(x,name[x]);
}
return this;
}
var _832=this._getAttrNames(name),_833=this[_832.s];
if(lang.isFunction(_833)){
var _834=_833.apply(this,Array.prototype.slice.call(arguments,1));
}else{
var _835=this.focusNode&&!lang.isFunction(this.focusNode)?"focusNode":"domNode",tag=this[_835]&&this[_835].tagName,_836=tag&&(_813[tag]||(_813[tag]=_814(this[_835]))),map=name in this.attributeMap?this.attributeMap[name]:_832.s in this?this[_832.s]:((_836&&_832.l in _836&&typeof _831!="function")||/^aria-|^data-|^role$/.test(name))?_835:null;
if(map!=null){
this._attrToDom(name,_831,map);
}
this._set(name,_831);
}
return _834||this;
},_attrPairNames:{},_getAttrNames:function(name){
var apn=this._attrPairNames;
if(apn[name]){
return apn[name];
}
var uc=name.replace(/^[a-z]|-[a-zA-Z]/g,function(c){
return c.charAt(c.length-1).toUpperCase();
});
return (apn[name]={n:name+"Node",s:"_set"+uc+"Attr",g:"_get"+uc+"Attr",l:uc.toLowerCase()});
},_set:function(name,_837){
var _838=this[name];
this[name]=_837;
if(this._created&&!_816(_838,_837)){
if(this._watchCallbacks){
this._watchCallbacks(name,_838,_837);
}
this.emit("attrmodified-"+name,{detail:{prevValue:_838,newValue:_837}});
}
},_get:function(name){
return this[name];
},emit:function(type,_839,_83a){
_839=_839||{};
if(_839.bubbles===undefined){
_839.bubbles=true;
}
if(_839.cancelable===undefined){
_839.cancelable=true;
}
if(!_839.detail){
_839.detail={};
}
_839.detail.widget=this;
var ret,_83b=this["on"+type];
if(_83b){
ret=_83b.apply(this,_83a?_83a:[_839]);
}
if(this._started&&!this._beingDestroyed){
on.emit(this.domNode,type.toLowerCase(),_839);
}
return ret;
},on:function(type,func){
var _83c=this._onMap(type);
if(_83c){
return _802.after(this,_83c,func,true);
}
return this.own(on(this.domNode,type,func))[0];
},_onMap:function(type){
var ctor=this.constructor,map=ctor._onMap;
if(!map){
map=(ctor._onMap={});
for(var attr in ctor.prototype){
if(/^on/.test(attr)){
map[attr.replace(/^on/,"").toLowerCase()]=attr;
}
}
}
return map[typeof type=="string"&&type.toLowerCase()];
},toString:function(){
return "[Widget "+this.declaredClass+", "+(this.id||"NO ID")+"]";
},getChildren:function(){
return this.containerNode?_811.findWidgets(this.containerNode):[];
},getParent:function(){
return _811.getEnclosingWidget(this.domNode.parentNode);
},connect:function(obj,_83d,_83e){
return this.own(_804.connect(obj,_83d,this,_83e))[0];
},disconnect:function(_83f){
_83f.remove();
},subscribe:function(t,_840){
return this.own(_80e.subscribe(t,lang.hitch(this,_840)))[0];
},unsubscribe:function(_841){
_841.remove();
},isLeftToRight:function(){
return this.dir?(this.dir=="ltr"):_809.isBodyLtr(this.ownerDocument);
},isFocusable:function(){
return this.focus&&(_80a.get(this.domNode,"display")!="none");
},placeAt:function(_842,_843){
var _844=!_842.tagName&&_811.byId(_842);
if(_844&&_844.addChild&&(!_843||typeof _843==="number")){
_844.addChild(this,_843);
}else{
var ref=_844?(_844.containerNode&&!/after|before|replace/.test(_843||"")?_844.containerNode:_844.domNode):dom.byId(_842,this.ownerDocument);
_808.place(this.domNode,ref,_843);
if(!this._started&&(this.getParent()||{})._started){
this.startup();
}
}
return this;
},defer:function(fcn,_845){
var _846=setTimeout(lang.hitch(this,function(){
if(!_846){
return;
}
_846=null;
if(!this._destroyed){
lang.hitch(this,fcn)();
}
}),_845||0);
return {remove:function(){
if(_846){
clearTimeout(_846);
_846=null;
}
return null;
}};
}});
if(has("dojo-bidi")){
_817.extend(_810);
}
return _817;
});
},"dijit/layout/_TabContainerBase":function(){
define(["dojo/text!./templates/TabContainer.html","./StackContainer","./utils","../_TemplatedMixin","dojo/_base/declare","dojo/dom-class","dojo/dom-geometry","dojo/dom-style"],function(_847,_848,_849,_84a,_84b,_84c,_84d,_84e){
return _84b("dijit.layout._TabContainerBase",[_848,_84a],{tabPosition:"top",baseClass:"dijitTabContainer",tabStrip:false,nested:false,templateString:_847,postMixInProperties:function(){
this.baseClass+=this.tabPosition.charAt(0).toUpperCase()+this.tabPosition.substr(1).replace(/-.*/,"");
this.srcNodeRef&&_84e.set(this.srcNodeRef,"visibility","hidden");
this.inherited(arguments);
},buildRendering:function(){
this.inherited(arguments);
this.tablist=this._makeController(this.tablistNode);
if(!this.doLayout){
_84c.add(this.domNode,"dijitTabContainerNoLayout");
}
if(this.nested){
_84c.add(this.domNode,"dijitTabContainerNested");
_84c.add(this.tablist.containerNode,"dijitTabContainerTabListNested");
_84c.add(this.tablistSpacer,"dijitTabContainerSpacerNested");
_84c.add(this.containerNode,"dijitTabPaneWrapperNested");
}else{
_84c.add(this.domNode,"tabStrip-"+(this.tabStrip?"enabled":"disabled"));
}
},_setupChild:function(tab){
_84c.add(tab.domNode,"dijitTabPane");
this.inherited(arguments);
},startup:function(){
if(this._started){
return;
}
this.tablist.startup();
this.inherited(arguments);
},layout:function(){
if(!this._contentBox||typeof (this._contentBox.l)=="undefined"){
return;
}
var sc=this.selectedChildWidget;
if(this.doLayout){
var _84f=this.tabPosition.replace(/-h/,"");
this.tablist.region=_84f;
var _850=[this.tablist,{domNode:this.tablistSpacer,region:_84f},{domNode:this.containerNode,region:"center"}];
_849.layoutChildren(this.domNode,this._contentBox,_850);
this._containerContentBox=_849.marginBox2contentBox(this.containerNode,_850[2]);
if(sc&&sc.resize){
sc.resize(this._containerContentBox);
}
}else{
if(this.tablist.resize){
var s=this.tablist.domNode.style;
s.width="0";
var _851=_84d.getContentBox(this.domNode).w;
s.width="";
this.tablist.resize({w:_851});
}
if(sc&&sc.resize){
sc.resize();
}
}
},destroy:function(_852){
if(this.tablist){
this.tablist.destroy(_852);
}
this.inherited(arguments);
}});
});
},"dijit/form/Form":function(){
define(["dojo/_base/declare","dojo/dom-attr","dojo/_base/kernel","dojo/sniff","../_Widget","../_TemplatedMixin","./_FormMixin","../layout/_ContentPaneResizeMixin"],function(_853,_854,_855,has,_856,_857,_858,_859){
return _853("dijit.form.Form",[_856,_857,_858,_859],{name:"",action:"",method:"",encType:"","accept-charset":"",accept:"",target:"",templateString:"<form data-dojo-attach-point='containerNode' data-dojo-attach-event='onreset:_onReset,onsubmit:_onSubmit' ${!nameAttrSetting}></form>",postMixInProperties:function(){
this.nameAttrSetting=this.name?("name='"+this.name+"'"):"";
this.inherited(arguments);
},execute:function(){
},onExecute:function(){
},_setEncTypeAttr:function(_85a){
_854.set(this.domNode,"encType",_85a);
if(has("ie")){
this.domNode.encoding=_85a;
}
this._set("encType",_85a);
},reset:function(e){
var faux={returnValue:true,preventDefault:function(){
this.returnValue=false;
},stopPropagation:function(){
},currentTarget:e?e.target:this.domNode,target:e?e.target:this.domNode};
if(!(this.onReset(faux)===false)&&faux.returnValue){
this.inherited(arguments,[]);
}
},onReset:function(){
return true;
},_onReset:function(e){
this.reset(e);
e.stopPropagation();
e.preventDefault();
return false;
},_onSubmit:function(e){
var fp=this.constructor.prototype;
if(this.execute!=fp.execute||this.onExecute!=fp.onExecute){
_855.deprecated("dijit.form.Form:execute()/onExecute() are deprecated. Use onSubmit() instead.","","2.0");
this.onExecute();
this.execute(this.getValues());
}
if(this.onSubmit(e)===false){
e.stopPropagation();
e.preventDefault();
}
},onSubmit:function(){
return this.isValid();
},submit:function(){
if(!(this.onSubmit()===false)){
this.containerNode.submit();
}
}});
});
},"dojo/store/Memory":function(){
define(["../_base/declare","./util/QueryResults","./util/SimpleQueryEngine"],function(_85b,_85c,_85d){
var base=null;
return _85b("dojo.store.Memory",base,{constructor:function(_85e){
for(var i in _85e){
this[i]=_85e[i];
}
this.setData(this.data||[]);
},data:null,idProperty:"id",index:null,queryEngine:_85d,get:function(id){
return this.data[this.index[id]];
},getIdentity:function(_85f){
return _85f[this.idProperty];
},put:function(_860,_861){
var data=this.data,_862=this.index,_863=this.idProperty;
var id=_860[_863]=(_861&&"id" in _861)?_861.id:_863 in _860?_860[_863]:Math.random();
if(id in _862){
if(_861&&_861.overwrite===false){
throw new Error("Object already exists");
}
data[_862[id]]=_860;
}else{
_862[id]=data.push(_860)-1;
}
return id;
},add:function(_864,_865){
(_865=_865||{}).overwrite=false;
return this.put(_864,_865);
},remove:function(id){
var _866=this.index;
var data=this.data;
if(id in _866){
data.splice(_866[id],1);
this.setData(data);
return true;
}
},query:function(_867,_868){
return _85c(this.queryEngine(_867,_868)(this.data));
},setData:function(data){
if(data.items){
this.idProperty=data.identifier;
data=this.data=data.items;
}else{
this.data=data;
}
this.index={};
for(var i=0,l=data.length;i<l;i++){
this.index[data[i][this.idProperty]]=i;
}
}});
});
},"dojo/cldr/nls/currency":function(){
define({root:{"USD_symbol":"US$","CAD_symbol":"CA$","GBP_symbol":"£","HKD_symbol":"HK$","JPY_symbol":"JP¥","AUD_symbol":"A$","CNY_symbol":"CN¥","EUR_symbol":"€"},"ar":true,"ca":true,"cs":true,"da":true,"de":true,"el":true,"en":true,"en-au":true,"en-ca":true,"en-gb":true,"es":true,"fi":true,"fr":true,"fr-ch":true,"he":true,"hu":true,"it":true,"ja":true,"ko":true,"nb":true,"nl":true,"pl":true,"pt":true,"pt-pt":true,"ro":true,"ru":true,"sk":true,"sl":true,"sv":true,"th":true,"tr":true,"zh":true,"zh-hant":true,"zh-hk":true,"zh-tw":true});
},"dojo/cldr/nls/en/currency":function(){
define({"HKD_displayName":"Hong Kong Dollar","CHF_displayName":"Swiss Franc","JPY_symbol":"¥","CAD_displayName":"Canadian Dollar","CNY_displayName":"Chinese Yuan","USD_symbol":"$","AUD_displayName":"Australian Dollar","JPY_displayName":"Japanese Yen","USD_displayName":"US Dollar","GBP_displayName":"British Pound Sterling","EUR_displayName":"Euro"});
},"dojo/cldr/nls/pt/currency":function(){
define({"HKD_displayName":"Dólar de Hong Kong","CHF_displayName":"Franco suíço","JPY_symbol":"JP¥","CAD_displayName":"Dólar canadense","HKD_symbol":"HK$","CNY_displayName":"Yuan chinês","USD_symbol":"US$","AUD_displayName":"Dólar australiano","JPY_displayName":"Iene japonês","CAD_symbol":"CA$","USD_displayName":"Dólar norte-americano","EUR_symbol":"€","CNY_symbol":"CN¥","GBP_displayName":"Libra esterlina britânica","GBP_symbol":"£","AUD_symbol":"AU$","EUR_displayName":"Euro"});
},"dojo/cldr/nls/pt/currency":function(){
define({"HKD_displayName":"Dólar de Hong Kong","CHF_displayName":"Franco suíço","JPY_symbol":"JP¥","CAD_displayName":"Dólar canadense","HKD_symbol":"HK$","CNY_displayName":"Yuan chinês","USD_symbol":"US$","AUD_displayName":"Dólar australiano","JPY_displayName":"Iene japonês","CAD_symbol":"CA$","USD_displayName":"Dólar norte-americano","EUR_symbol":"€","CNY_symbol":"CN¥","GBP_displayName":"Libra esterlina britânica","GBP_symbol":"£","AUD_symbol":"AU$","EUR_displayName":"Euro"});
},"dijit/_base/sniff":function(){
define(["dojo/uacss"],function(){
});
},"dijit/Editor":function(){
define(["require","dojo/_base/array","dojo/_base/declare","dojo/Deferred","dojo/i18n","dojo/dom-attr","dojo/dom-class","dojo/dom-geometry","dojo/dom-style","dojo/keys","dojo/_base/lang","dojo/sniff","dojo/string","dojo/topic","./_Container","./Toolbar","./ToolbarSeparator","./layout/_LayoutWidget","./form/ToggleButton","./_editor/_Plugin","./_editor/plugins/EnterKeyHandling","./_editor/html","./_editor/range","./_editor/RichText","./main","dojo/i18n!./_editor/nls/commands"],function(_869,_86a,_86b,_86c,i18n,_86d,_86e,_86f,_870,keys,lang,has,_871,_872,_873,_874,_875,_876,_877,_878,_879,html,_87a,_87b,_87c){
var _87d=_86b("dijit.Editor",_87b,{plugins:null,extraPlugins:null,constructor:function(){
if(!lang.isArray(this.plugins)){
this.plugins=["undo","redo","|","cut","copy","paste","|","bold","italic","underline","strikethrough","|","insertOrderedList","insertUnorderedList","indent","outdent","|","justifyLeft","justifyRight","justifyCenter","justifyFull",_879];
}
this._plugins=[];
this._editInterval=this.editActionInterval*1000;
if(has("ie")||has("trident")){
this.events.push("onBeforeDeactivate");
this.events.push("onBeforeActivate");
}
},postMixInProperties:function(){
this.setValueDeferred=new _86c();
this.inherited(arguments);
},postCreate:function(){
this.inherited(arguments);
this._steps=this._steps.slice(0);
this._undoedSteps=this._undoedSteps.slice(0);
if(lang.isArray(this.extraPlugins)){
this.plugins=this.plugins.concat(this.extraPlugins);
}
this.commands=i18n.getLocalization("dijit._editor","commands",this.lang);
if(has("webkit")){
_870.set(this.domNode,"KhtmlUserSelect","none");
}
},startup:function(){
this.inherited(arguments);
if(!this.toolbar){
this.toolbar=new _874({ownerDocument:this.ownerDocument,dir:this.dir,lang:this.lang,"aria-label":this.id});
this.header.appendChild(this.toolbar.domNode);
}
_86a.forEach(this.plugins,this.addPlugin,this);
this.setValueDeferred.resolve(true);
_86e.add(this.iframe.parentNode,"dijitEditorIFrameContainer");
_86e.add(this.iframe,"dijitEditorIFrame");
_86d.set(this.iframe,"allowTransparency",true);
this.toolbar.startup();
this.onNormalizedDisplayChanged();
},destroy:function(){
_86a.forEach(this._plugins,function(p){
if(p&&p.destroy){
p.destroy();
}
});
this._plugins=[];
this.toolbar.destroyRecursive();
delete this.toolbar;
this.inherited(arguments);
},addPlugin:function(_87e,_87f){
var args=lang.isString(_87e)?{name:_87e}:lang.isFunction(_87e)?{ctor:_87e}:_87e;
if(!args.setEditor){
var o={"args":args,"plugin":null,"editor":this};
if(args.name){
if(_878.registry[args.name]){
o.plugin=_878.registry[args.name](args);
}else{
_872.publish(_87c._scopeName+".Editor.getPlugin",o);
}
}
if(!o.plugin){
try{
var pc=args.ctor||lang.getObject(args.name)||_869(args.name);
if(pc){
o.plugin=new pc(args);
}
}
catch(e){
throw new Error(this.id+": cannot find plugin ["+args.name+"]");
}
}
if(!o.plugin){
throw new Error(this.id+": cannot find plugin ["+args.name+"]");
}
_87e=o.plugin;
}
if(arguments.length>1){
this._plugins[_87f]=_87e;
}else{
this._plugins.push(_87e);
}
_87e.setEditor(this);
if(lang.isFunction(_87e.setToolbar)){
_87e.setToolbar(this.toolbar);
}
},resize:function(size){
if(size){
_876.prototype.resize.apply(this,arguments);
}
},layout:function(){
var _880=(this._contentBox.h-(this.getHeaderHeight()+this.getFooterHeight()+_86f.getPadBorderExtents(this.iframe.parentNode).h+_86f.getMarginExtents(this.iframe.parentNode).h));
this.editingArea.style.height=_880+"px";
if(this.iframe){
this.iframe.style.height="100%";
}
this._layoutMode=true;
},_onIEMouseDown:function(e){
var _881;
var b=this.document.body;
var _882=b.clientWidth;
var _883=b.clientHeight;
var _884=b.clientLeft;
var _885=b.offsetWidth;
var _886=b.offsetHeight;
var _887=b.offsetLeft;
if(/^rtl$/i.test(b.dir||"")){
if(_882<_885&&e.x>_882&&e.x<_885){
_881=true;
}
}else{
if(e.x<_884&&e.x>_887){
_881=true;
}
}
if(!_881){
if(_883<_886&&e.y>_883&&e.y<_886){
_881=true;
}
}
if(!_881){
delete this._cursorToStart;
delete this._savedSelection;
if(e.target.tagName=="BODY"){
this.defer("placeCursorAtEnd");
}
this.inherited(arguments);
}
},onBeforeActivate:function(){
this._restoreSelection();
},onBeforeDeactivate:function(e){
if(this.customUndo){
this.endEditing(true);
}
if(e.target.tagName!="BODY"){
this._saveSelection();
}
},customUndo:true,editActionInterval:3,beginEditing:function(cmd){
if(!this._inEditing){
this._inEditing=true;
this._beginEditing(cmd);
}
if(this.editActionInterval>0){
if(this._editTimer){
this._editTimer.remove();
}
this._editTimer=this.defer("endEditing",this._editInterval);
}
},_steps:[],_undoedSteps:[],execCommand:function(cmd){
if(this.customUndo&&(cmd=="undo"||cmd=="redo")){
return this[cmd]();
}else{
if(this.customUndo){
this.endEditing();
this._beginEditing();
}
var r=this.inherited(arguments);
if(this.customUndo){
this._endEditing();
}
return r;
}
},_pasteImpl:function(){
return this._clipboardCommand("paste");
},_cutImpl:function(){
return this._clipboardCommand("cut");
},_copyImpl:function(){
return this._clipboardCommand("copy");
},_clipboardCommand:function(cmd){
var r;
try{
r=this.document.execCommand(cmd,false,null);
if(has("webkit")&&!r){
throw {code:1011};
}
}
catch(e){
if(e.code==1011||(e.code==9&&has("opera"))){
var sub=_871.substitute,_888={cut:"X",copy:"C",paste:"V"};
alert(sub(this.commands.systemShortcut,[this.commands[cmd],sub(this.commands[has("mac")?"appleKey":"ctrlKey"],[_888[cmd]])]));
}
r=false;
}
return r;
},queryCommandEnabled:function(cmd){
if(this.customUndo&&(cmd=="undo"||cmd=="redo")){
return cmd=="undo"?(this._steps.length>1):(this._undoedSteps.length>0);
}else{
return this.inherited(arguments);
}
},_moveToBookmark:function(b){
var _889=b.mark;
var mark=b.mark;
var col=b.isCollapsed;
var r,_88a,_88b,sel;
if(mark){
if(has("ie")<9||(has("ie")===9&&has("quirks"))){
if(lang.isArray(mark)){
_889=[];
_86a.forEach(mark,function(n){
_889.push(_87a.getNode(n,this.editNode));
},this);
this.selection.moveToBookmark({mark:_889,isCollapsed:col});
}else{
if(mark.startContainer&&mark.endContainer){
sel=_87a.getSelection(this.window);
if(sel&&sel.removeAllRanges){
sel.removeAllRanges();
r=_87a.create(this.window);
_88a=_87a.getNode(mark.startContainer,this.editNode);
_88b=_87a.getNode(mark.endContainer,this.editNode);
if(_88a&&_88b){
r.setStart(_88a,mark.startOffset);
r.setEnd(_88b,mark.endOffset);
sel.addRange(r);
}
}
}
}
}else{
sel=_87a.getSelection(this.window);
if(sel&&sel.removeAllRanges){
sel.removeAllRanges();
r=_87a.create(this.window);
_88a=_87a.getNode(mark.startContainer,this.editNode);
_88b=_87a.getNode(mark.endContainer,this.editNode);
if(_88a&&_88b){
r.setStart(_88a,mark.startOffset);
r.setEnd(_88b,mark.endOffset);
sel.addRange(r);
}
}
}
}
},_changeToStep:function(from,to){
this.setValue(to.text);
var b=to.bookmark;
if(!b){
return;
}
this._moveToBookmark(b);
},undo:function(){
var ret=false;
if(!this._undoRedoActive){
this._undoRedoActive=true;
this.endEditing(true);
var s=this._steps.pop();
if(s&&this._steps.length>0){
this.focus();
this._changeToStep(s,this._steps[this._steps.length-1]);
this._undoedSteps.push(s);
this.onDisplayChanged();
delete this._undoRedoActive;
ret=true;
}
delete this._undoRedoActive;
}
return ret;
},redo:function(){
var ret=false;
if(!this._undoRedoActive){
this._undoRedoActive=true;
this.endEditing(true);
var s=this._undoedSteps.pop();
if(s&&this._steps.length>0){
this.focus();
this._changeToStep(this._steps[this._steps.length-1],s);
this._steps.push(s);
this.onDisplayChanged();
ret=true;
}
delete this._undoRedoActive;
}
return ret;
},endEditing:function(_88c){
if(this._editTimer){
this._editTimer=this._editTimer.remove();
}
if(this._inEditing){
this._endEditing(_88c);
this._inEditing=false;
}
},_getBookmark:function(){
var b=this.selection.getBookmark();
var tmp=[];
if(b&&b.mark){
var mark=b.mark;
if(has("ie")<9||(has("ie")===9&&has("quirks"))){
var sel=_87a.getSelection(this.window);
if(!lang.isArray(mark)){
if(sel){
var _88d;
if(sel.rangeCount){
_88d=sel.getRangeAt(0);
}
if(_88d){
b.mark=_88d.cloneRange();
}else{
b.mark=this.selection.getBookmark();
}
}
}else{
_86a.forEach(b.mark,function(n){
tmp.push(_87a.getIndex(n,this.editNode).o);
},this);
b.mark=tmp;
}
}
try{
if(b.mark&&b.mark.startContainer){
tmp=_87a.getIndex(b.mark.startContainer,this.editNode).o;
b.mark={startContainer:tmp,startOffset:b.mark.startOffset,endContainer:b.mark.endContainer===b.mark.startContainer?tmp:_87a.getIndex(b.mark.endContainer,this.editNode).o,endOffset:b.mark.endOffset};
}
}
catch(e){
b.mark=null;
}
}
return b;
},_beginEditing:function(){
if(this._steps.length===0){
this._steps.push({"text":html.getChildrenHtml(this.editNode),"bookmark":this._getBookmark()});
}
},_endEditing:function(){
var v=html.getChildrenHtml(this.editNode);
this._undoedSteps=[];
this._steps.push({text:v,bookmark:this._getBookmark()});
},onKeyDown:function(e){
if(!has("ie")&&!this.iframe&&e.keyCode==keys.TAB&&!this.tabIndent){
this._saveSelection();
}
if(!this.customUndo){
this.inherited(arguments);
return;
}
var k=e.keyCode;
if(e.ctrlKey&&!e.shiftKey&&!e.altKey){
if(k==90||k==122){
e.stopPropagation();
e.preventDefault();
this.undo();
return;
}else{
if(k==89||k==121){
e.stopPropagation();
e.preventDefault();
this.redo();
return;
}
}
}
this.inherited(arguments);
switch(k){
case keys.ENTER:
case keys.BACKSPACE:
case keys.DELETE:
this.beginEditing();
break;
case 88:
case 86:
if(e.ctrlKey&&!e.altKey&&!e.metaKey){
this.endEditing();
if(e.keyCode==88){
this.beginEditing("cut");
}else{
this.beginEditing("paste");
}
this.defer("endEditing",1);
break;
}
default:
if(!e.ctrlKey&&!e.altKey&&!e.metaKey&&(e.keyCode<keys.F1||e.keyCode>keys.F15)){
this.beginEditing();
break;
}
case keys.ALT:
this.endEditing();
break;
case keys.UP_ARROW:
case keys.DOWN_ARROW:
case keys.LEFT_ARROW:
case keys.RIGHT_ARROW:
case keys.HOME:
case keys.END:
case keys.PAGE_UP:
case keys.PAGE_DOWN:
this.endEditing(true);
break;
case keys.CTRL:
case keys.SHIFT:
case keys.TAB:
break;
}
},_onBlur:function(){
this.inherited(arguments);
this.endEditing(true);
},_saveSelection:function(){
try{
this._savedSelection=this._getBookmark();
}
catch(e){
}
},_restoreSelection:function(){
if(this._savedSelection){
delete this._cursorToStart;
if(this.selection.isCollapsed()){
this._moveToBookmark(this._savedSelection);
}
delete this._savedSelection;
}
},onClick:function(){
this.endEditing(true);
this.inherited(arguments);
},replaceValue:function(html){
if(!this.customUndo){
this.inherited(arguments);
}else{
if(this.isClosed){
this.setValue(html);
}else{
this.beginEditing();
if(!html){
html="&#160;";
}
this.setValue(html);
this.endEditing();
}
}
},_setDisabledAttr:function(_88e){
this.setValueDeferred.then(lang.hitch(this,function(){
if((!this.disabled&&_88e)||(!this._buttonEnabledPlugins&&_88e)){
_86a.forEach(this._plugins,function(p){
p.set("disabled",true);
});
}else{
if(this.disabled&&!_88e){
_86a.forEach(this._plugins,function(p){
p.set("disabled",false);
});
}
}
}));
this.inherited(arguments);
},_setStateClass:function(){
try{
this.inherited(arguments);
if(this.document&&this.document.body){
_870.set(this.document.body,"color",_870.get(this.iframe,"color"));
}
}
catch(e){
}
}});
function _88f(args){
return new _878({command:args.name});
};
function _890(args){
return new _878({buttonClass:_877,command:args.name});
};
lang.mixin(_878.registry,{"undo":_88f,"redo":_88f,"cut":_88f,"copy":_88f,"paste":_88f,"insertOrderedList":_88f,"insertUnorderedList":_88f,"indent":_88f,"outdent":_88f,"justifyCenter":_88f,"justifyFull":_88f,"justifyLeft":_88f,"justifyRight":_88f,"delete":_88f,"selectAll":_88f,"removeFormat":_88f,"unlink":_88f,"insertHorizontalRule":_88f,"bold":_890,"italic":_890,"underline":_890,"strikethrough":_890,"subscript":_890,"superscript":_890,"|":function(){
return new _878({setEditor:function(_891){
this.editor=_891;
this.button=new _875({ownerDocument:_891.ownerDocument});
}});
}});
return _87d;
});
},"dijit/Toolbar":function(){
define(["require","dojo/_base/declare","dojo/has","dojo/keys","dojo/ready","./_Widget","./_KeyNavContainer","./_TemplatedMixin"],function(_892,_893,has,keys,_894,_895,_896,_897){
if(has("dijit-legacy-requires")){
_894(0,function(){
var _898=["dijit/ToolbarSeparator"];
_892(_898);
});
}
return _893("dijit.Toolbar",[_895,_897,_896],{templateString:"<div class=\"dijit\" role=\"toolbar\" tabIndex=\"${tabIndex}\" data-dojo-attach-point=\"containerNode\">"+"</div>",baseClass:"dijitToolbar",_onLeftArrow:function(){
this.focusPrev();
},_onRightArrow:function(){
this.focusNext();
}});
});
},"dijit/layout/StackContainer":function(){
define(["dojo/_base/array","dojo/cookie","dojo/_base/declare","dojo/dom-class","dojo/dom-construct","dojo/has","dojo/_base/lang","dojo/on","dojo/ready","dojo/topic","dojo/when","../registry","../_WidgetBase","./_LayoutWidget","dojo/i18n!../nls/common"],function(_899,_89a,_89b,_89c,_89d,has,lang,on,_89e,_89f,when,_8a0,_8a1,_8a2){
if(has("dijit-legacy-requires")){
_89e(0,function(){
var _8a3=["dijit/layout/StackController"];
require(_8a3);
});
}
var _8a4=_89b("dijit.layout.StackContainer",_8a2,{doLayout:true,persist:false,baseClass:"dijitStackContainer",buildRendering:function(){
this.inherited(arguments);
_89c.add(this.domNode,"dijitLayoutContainer");
},postCreate:function(){
this.inherited(arguments);
this.own(on(this.domNode,"keydown",lang.hitch(this,"_onKeyDown")));
},startup:function(){
if(this._started){
return;
}
var _8a5=this.getChildren();
_899.forEach(_8a5,this._setupChild,this);
if(this.persist){
this.selectedChildWidget=_8a0.byId(_89a(this.id+"_selectedChild"));
}else{
_899.some(_8a5,function(_8a6){
if(_8a6.selected){
this.selectedChildWidget=_8a6;
}
return _8a6.selected;
},this);
}
var _8a7=this.selectedChildWidget;
if(!_8a7&&_8a5[0]){
_8a7=this.selectedChildWidget=_8a5[0];
_8a7.selected=true;
}
_89f.publish(this.id+"-startup",{children:_8a5,selected:_8a7,textDir:this.textDir});
this.inherited(arguments);
},resize:function(){
if(!this._hasBeenShown){
this._hasBeenShown=true;
var _8a8=this.selectedChildWidget;
if(_8a8){
this._showChild(_8a8);
}
}
this.inherited(arguments);
},_setupChild:function(_8a9){
var _8aa=_8a9.domNode,_8ab=_89d.place("<div role='tabpanel' class='"+this.baseClass+"ChildWrapper dijitHidden'>",_8a9.domNode,"replace"),_8ac=_8a9["aria-label"]||_8a9.title||_8a9.label;
if(_8ac){
_8ab.setAttribute("aria-label",_8ac);
}
_89d.place(_8aa,_8ab);
_8a9._wrapper=_8ab;
this.inherited(arguments);
if(_8aa.style.display=="none"){
_8aa.style.display="block";
}
_8a9.domNode.title="";
},addChild:function(_8ad,_8ae){
this.inherited(arguments);
if(this._started){
_89f.publish(this.id+"-addChild",_8ad,_8ae);
this.layout();
if(!this.selectedChildWidget){
this.selectChild(_8ad);
}
}
},removeChild:function(page){
var idx=_899.indexOf(this.getChildren(),page);
this.inherited(arguments);
_89d.destroy(page._wrapper);
delete page._wrapper;
if(this._started){
_89f.publish(this.id+"-removeChild",page);
}
if(this._descendantsBeingDestroyed){
return;
}
if(this.selectedChildWidget===page){
this.selectedChildWidget=undefined;
if(this._started){
var _8af=this.getChildren();
if(_8af.length){
this.selectChild(_8af[Math.max(idx-1,0)]);
}
}
}
if(this._started){
this.layout();
}
},selectChild:function(page,_8b0){
var d;
page=_8a0.byId(page);
if(this.selectedChildWidget!=page){
d=this._transition(page,this.selectedChildWidget,_8b0);
this._set("selectedChildWidget",page);
_89f.publish(this.id+"-selectChild",page);
if(this.persist){
_89a(this.id+"_selectedChild",this.selectedChildWidget.id);
}
}
return when(d||true);
},_transition:function(_8b1,_8b2){
if(_8b2){
this._hideChild(_8b2);
}
var d=this._showChild(_8b1);
if(_8b1.resize){
if(this.doLayout){
_8b1.resize(this._containerContentBox||this._contentBox);
}else{
_8b1.resize();
}
}
return d;
},_adjacent:function(_8b3){
var _8b4=this.getChildren();
var _8b5=_899.indexOf(_8b4,this.selectedChildWidget);
_8b5+=_8b3?1:_8b4.length-1;
return _8b4[_8b5%_8b4.length];
},forward:function(){
return this.selectChild(this._adjacent(true),true);
},back:function(){
return this.selectChild(this._adjacent(false),true);
},_onKeyDown:function(e){
_89f.publish(this.id+"-containerKeyDown",{e:e,page:this});
},layout:function(){
var _8b6=this.selectedChildWidget;
if(_8b6&&_8b6.resize){
if(this.doLayout){
_8b6.resize(this._containerContentBox||this._contentBox);
}else{
_8b6.resize();
}
}
},_showChild:function(page){
var _8b7=this.getChildren();
page.isFirstChild=(page==_8b7[0]);
page.isLastChild=(page==_8b7[_8b7.length-1]);
page._set("selected",true);
if(page._wrapper){
_89c.replace(page._wrapper,"dijitVisible","dijitHidden");
}
return (page._onShow&&page._onShow())||true;
},_hideChild:function(page){
page._set("selected",false);
if(page._wrapper){
_89c.replace(page._wrapper,"dijitHidden","dijitVisible");
}
page.onHide&&page.onHide();
},closeChild:function(page){
var _8b8=page.onClose&&page.onClose(this,page);
if(_8b8){
this.removeChild(page);
page.destroyRecursive();
}
},destroyDescendants:function(_8b9){
this._descendantsBeingDestroyed=true;
this.selectedChildWidget=undefined;
_899.forEach(this.getChildren(),function(_8ba){
if(!_8b9){
this.removeChild(_8ba);
}
_8ba.destroyRecursive(_8b9);
},this);
this._descendantsBeingDestroyed=false;
}});
_8a4.ChildWidgetProperties={selected:false,disabled:false,closable:false,iconClass:"dijitNoIcon",showTitle:true};
lang.extend(_8a1,_8a4.ChildWidgetProperties);
return _8a4;
});
},"dojo/regexp":function(){
define(["./_base/kernel","./_base/lang"],function(dojo,lang){
var _8bb={};
lang.setObject("dojo.regexp",_8bb);
_8bb.escapeString=function(str,_8bc){
return str.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g,function(ch){
if(_8bc&&_8bc.indexOf(ch)!=-1){
return ch;
}
return "\\"+ch;
});
};
_8bb.buildGroupRE=function(arr,re,_8bd){
if(!(arr instanceof Array)){
return re(arr);
}
var b=[];
for(var i=0;i<arr.length;i++){
b.push(re(arr[i]));
}
return _8bb.group(b.join("|"),_8bd);
};
_8bb.group=function(_8be,_8bf){
return "("+(_8bf?"?:":"")+_8be+")";
};
return _8bb;
});
},"dijit/form/ComboBox":function(){
define(["dojo/_base/declare","./ValidationTextBox","./ComboBoxMixin"],function(_8c0,_8c1,_8c2){
return _8c0("dijit.form.ComboBox",[_8c1,_8c2],{});
});
},"dijit/DropDownMenu":function(){
define(["dojo/_base/declare","dojo/keys","dojo/text!./templates/Menu.html","./_OnDijitClickMixin","./_MenuBase"],function(_8c3,keys,_8c4,_8c5,_8c6){
return _8c3("dijit.DropDownMenu",[_8c6,_8c5],{templateString:_8c4,baseClass:"dijitMenu",_onUpArrow:function(){
this.focusPrev();
},_onDownArrow:function(){
this.focusNext();
},_onRightArrow:function(evt){
this._moveToPopup(evt);
evt.stopPropagation();
evt.preventDefault();
},_onLeftArrow:function(evt){
if(this.parentMenu){
if(this.parentMenu._isMenuBar){
this.parentMenu.focusPrev();
}else{
this.onCancel(false);
}
}else{
evt.stopPropagation();
evt.preventDefault();
}
}});
});
},"dijit/_AttachMixin":function(){
define(["require","dojo/_base/array","dojo/_base/connect","dojo/_base/declare","dojo/_base/lang","dojo/mouse","dojo/on","dojo/touch","./_WidgetBase"],function(_8c7,_8c8,_8c9,_8ca,lang,_8cb,on,_8cc,_8cd){
var _8ce=lang.delegate(_8cc,{"mouseenter":_8cb.enter,"mouseleave":_8cb.leave,"keypress":_8c9._keypress});
var _8cf;
var _8d0=_8ca("dijit._AttachMixin",null,{constructor:function(){
this._attachPoints=[];
this._attachEvents=[];
},buildRendering:function(){
this.inherited(arguments);
this._attachTemplateNodes(this.domNode);
this._beforeFillContent();
},_beforeFillContent:function(){
},_attachTemplateNodes:function(_8d1){
var node=_8d1;
while(true){
if(node.nodeType==1&&(this._processTemplateNode(node,function(n,p){
return n.getAttribute(p);
},this._attach)||this.searchContainerNode)&&node.firstChild){
node=node.firstChild;
}else{
if(node==_8d1){
return;
}
while(!node.nextSibling){
node=node.parentNode;
if(node==_8d1){
return;
}
}
node=node.nextSibling;
}
}
},_processTemplateNode:function(_8d2,_8d3,_8d4){
var ret=true;
var _8d5=this.attachScope||this,_8d6=_8d3(_8d2,"dojoAttachPoint")||_8d3(_8d2,"data-dojo-attach-point");
if(_8d6){
var _8d7,_8d8=_8d6.split(/\s*,\s*/);
while((_8d7=_8d8.shift())){
if(lang.isArray(_8d5[_8d7])){
_8d5[_8d7].push(_8d2);
}else{
_8d5[_8d7]=_8d2;
}
ret=(_8d7!="containerNode");
this._attachPoints.push(_8d7);
}
}
var _8d9=_8d3(_8d2,"dojoAttachEvent")||_8d3(_8d2,"data-dojo-attach-event");
if(_8d9){
var _8da,_8db=_8d9.split(/\s*,\s*/);
var trim=lang.trim;
while((_8da=_8db.shift())){
if(_8da){
var _8dc=null;
if(_8da.indexOf(":")!=-1){
var _8dd=_8da.split(":");
_8da=trim(_8dd[0]);
_8dc=trim(_8dd[1]);
}else{
_8da=trim(_8da);
}
if(!_8dc){
_8dc=_8da;
}
this._attachEvents.push(_8d4(_8d2,_8da,lang.hitch(_8d5,_8dc)));
}
}
}
return ret;
},_attach:function(node,type,func){
type=type.replace(/^on/,"").toLowerCase();
if(type=="dijitclick"){
type=_8cf||(_8cf=_8c7("./a11yclick"));
}else{
type=_8ce[type]||type;
}
return on(node,type,func);
},_detachTemplateNodes:function(){
var _8de=this.attachScope||this;
_8c8.forEach(this._attachPoints,function(_8df){
delete _8de[_8df];
});
this._attachPoints=[];
_8c8.forEach(this._attachEvents,function(_8e0){
_8e0.remove();
});
this._attachEvents=[];
},destroyRendering:function(){
this._detachTemplateNodes();
this.inherited(arguments);
}});
lang.extend(_8cd,{dojoAttachEvent:"",dojoAttachPoint:""});
return _8d0;
});
},"xstyle/load-css":function(){
define([],function(){
"use strict";
var _8e1="onreadystatechange",_8e2="onload",_8e3="createElement",_8e4=false,doc=document,_8e5=typeof _css_cache=="undefined"?{}:_css_cache,_8e6,_8e7={"event-link-onload":false,"dom-create-style-element":!document.createStyleSheet},head=doc.head||(doc.head=doc.getElementsByTagName("head")[0]);
function has(_8e8){
return _8e7[_8e8];
};
function _8e9(doc,_8ea){
var link=doc[_8e3]("link");
link.rel="stylesheet";
link.type="text/css";
if(_8ea){
link.href=_8ea;
}
return link;
};
function _8eb(name,_8ec){
return name.lastIndexOf(".")<=name.lastIndexOf("/")?name+"."+_8ec:name;
};
function _8ed(name){
var _8ee=name.split("!"),suf,i=1,pair;
while((suf=_8ee[i++])){
pair=suf.split("=",2);
_8ee[pair[0]]=pair.length==2?pair[1]:true;
}
return _8ee;
};
if(!has("bundled-css")){
var _8ef=function(_8f0,cb){
if(require.onError){
require.onError=(function(orig){
return function(){
_8e4=true;
orig.apply(this,arguments);
};
})(require.onError);
}
function _8f1(_8f2,cb){
var link=_8f2.link;
link[_8e1]=link[_8e2]=function(){
if(!link.readyState||link.readyState=="complete"){
_8e7["event-link-onload"]=true;
_8f3(_8f2);
cb();
}
};
};
var _8f4;
function _8f5(){
if(!_8f4){
_8f4=document[_8e3]("div");
_8f4.id="_cssx_load_test";
_8f4.style.cssText="position:absolute;top:-999px;left:-999px;";
doc.body.appendChild(_8f4);
}
return doc.defaultView.getComputedStyle(_8f4,null).marginTop=="-5px";
};
function _8f6(link){
var _8f7,_8f8,_8f9=false;
try{
_8f7=link.sheet||link.styleSheet;
if(_8f7){
_8f8=_8f7.cssRules||_8f7.rules;
_8f9=_8f8?_8f8.length>0:_8f8!==_8e6;
if(_8f9&&navigator.userAgent.indexOf("Chrome")>=0){
_8f7.insertRule("#_cssx_load_test{margin-top:-5px;}",0);
_8f9=_8f5();
_8f7.deleteRule(0);
}
}
}
catch(ex){
_8f9=(ex.code==1000)||(ex.message.match(/security|denied/i));
}
return _8f9;
};
function _8fa(_8fb,cb){
if(_8f6(_8fb.link)){
_8f3(_8fb);
cb();
}else{
if(!_8e4){
setTimeout(function(){
_8fa(_8fb,cb);
},_8fb.wait);
}
}
};
function _8f3(_8fc){
var link=_8fc.link;
link[_8e1]=link[_8e2]=null;
};
var _8fd;
function _8fe(){
if(!_8fd){
_8fd=true;
cb();
}
};
_8f1(_8f0,_8fe);
if(!has("event-link-onload")){
_8fa(_8f0,_8fe);
}
};
}
function _8ff(css){
if(has("dom-create-style-element")){
_900=document.createElement("style");
_900.setAttribute("type","text/css");
_900.appendChild(document.createTextNode(css));
head.insertBefore(_900,head.firstChild);
return _900;
}else{
var _900=document.createStyleSheet();
_900.cssText=css;
return _900.owningElement;
}
};
return function(_901,_902,_903){
var _904=_901.split(","),_905=_904.length,_906=function(){
if(--_905==0){
_902(link.sheet||link.styleSheet);
}
};
for(var i=0,_907;i<_904.length;i++,_907=url){
_901=_904[i];
var _908=_8e5[_901];
if(_908){
link=_8ff(_908);
return _906();
}
var opts=_8ed(_901),name=opts.shift(),url=_8eb(name,"css"),link=_8e9(doc),_909="nowait" in opts?opts.nowait!="false":!!(_903&&_903.cssDeferLoad),_90a={link:link,url:url,wait:_903&&_903.cssWatchPeriod||50};
_8ef(_90a,_906);
if(_909){
_902(link);
}
link.href=url;
head.appendChild(link);
}
};
});
},"dijit/form/_FormMixin":function(){
define(["dojo/_base/array","dojo/_base/declare","dojo/_base/kernel","dojo/_base/lang","dojo/on","dojo/window"],function(_90b,_90c,_90d,lang,on,_90e){
return _90c("dijit.form._FormMixin",null,{state:"",_getDescendantFormWidgets:function(_90f){
var res=[];
_90b.forEach(_90f||this.getChildren(),function(_910){
if("value" in _910){
res.push(_910);
}else{
res=res.concat(this._getDescendantFormWidgets(_910.getChildren()));
}
},this);
return res;
},reset:function(){
_90b.forEach(this._getDescendantFormWidgets(),function(_911){
if(_911.reset){
_911.reset();
}
});
},validate:function(){
var _912=false;
return _90b.every(_90b.map(this._getDescendantFormWidgets(),function(_913){
_913._hasBeenBlurred=true;
var _914=_913.disabled||!_913.validate||_913.validate();
if(!_914&&!_912){
_90e.scrollIntoView(_913.containerNode||_913.domNode);
_913.focus();
_912=true;
}
return _914;
}),function(item){
return item;
});
},setValues:function(val){
_90d.deprecated(this.declaredClass+"::setValues() is deprecated. Use set('value', val) instead.","","2.0");
return this.set("value",val);
},_setValueAttr:function(obj){
var map={};
_90b.forEach(this._getDescendantFormWidgets(),function(_915){
if(!_915.name){
return;
}
var _916=map[_915.name]||(map[_915.name]=[]);
_916.push(_915);
});
for(var name in map){
if(!map.hasOwnProperty(name)){
continue;
}
var _917=map[name],_918=lang.getObject(name,false,obj);
if(_918===undefined){
continue;
}
_918=[].concat(_918);
if(typeof _917[0].checked=="boolean"){
_90b.forEach(_917,function(w){
w.set("value",_90b.indexOf(_918,w._get("value"))!=-1);
});
}else{
if(_917[0].multiple){
_917[0].set("value",_918);
}else{
_90b.forEach(_917,function(w,i){
w.set("value",_918[i]);
});
}
}
}
},getValues:function(){
_90d.deprecated(this.declaredClass+"::getValues() is deprecated. Use get('value') instead.","","2.0");
return this.get("value");
},_getValueAttr:function(){
var obj={};
_90b.forEach(this._getDescendantFormWidgets(),function(_919){
var name=_919.name;
if(!name||_919.disabled){
return;
}
var _91a=_919.get("value");
if(typeof _919.checked=="boolean"){
if(/Radio/.test(_919.declaredClass)){
if(_91a!==false){
lang.setObject(name,_91a,obj);
}else{
_91a=lang.getObject(name,false,obj);
if(_91a===undefined){
lang.setObject(name,null,obj);
}
}
}else{
var ary=lang.getObject(name,false,obj);
if(!ary){
ary=[];
lang.setObject(name,ary,obj);
}
if(_91a!==false){
ary.push(_91a);
}
}
}else{
var prev=lang.getObject(name,false,obj);
if(typeof prev!="undefined"){
if(lang.isArray(prev)){
prev.push(_91a);
}else{
lang.setObject(name,[prev,_91a],obj);
}
}else{
lang.setObject(name,_91a,obj);
}
}
});
return obj;
},isValid:function(){
return this.state=="";
},onValidStateChange:function(){
},_getState:function(){
var _91b=_90b.map(this._descendants,function(w){
return w.get("state")||"";
});
return _90b.indexOf(_91b,"Error")>=0?"Error":_90b.indexOf(_91b,"Incomplete")>=0?"Incomplete":"";
},disconnectChildren:function(){
},connectChildren:function(_91c){
this._descendants=this._getDescendantFormWidgets();
_90b.forEach(this._descendants,function(_91d){
if(!_91d._started){
_91d.startup();
}
});
if(!_91c){
this._onChildChange();
}
},_onChildChange:function(attr){
if(!attr||attr=="state"||attr=="disabled"){
this._set("state",this._getState());
}
if(!attr||attr=="value"||attr=="disabled"||attr=="checked"){
if(this._onChangeDelayTimer){
this._onChangeDelayTimer.remove();
}
this._onChangeDelayTimer=this.defer(function(){
delete this._onChangeDelayTimer;
this._set("value",this.get("value"));
},10);
}
},startup:function(){
this.inherited(arguments);
this._descendants=this._getDescendantFormWidgets();
this.value=this.get("value");
this.state=this._getState();
var self=this;
this.own(on(this.containerNode,"attrmodified-state, attrmodified-disabled, attrmodified-value, attrmodified-checked",function(evt){
if(evt.target==self.domNode){
return;
}
self._onChildChange(evt.type.replace("attrmodified-",""));
}));
this.watch("state",function(attr,_91e,_91f){
this.onValidStateChange(_91f=="");
});
},destroy:function(){
this.inherited(arguments);
}});
});
},"dojo/data/util/simpleFetch":function(){
define(["../../_base/lang","../../_base/kernel","./sorter"],function(lang,_920,_921){
var _922={};
lang.setObject("dojo.data.util.simpleFetch",_922);
_922.errorHandler=function(_923,_924){
if(_924.onError){
var _925=_924.scope||_920.global;
_924.onError.call(_925,_923,_924);
}
};
_922.fetchHandler=function(_926,_927){
var _928=_927.abort||null,_929=false,_92a=_927.start?_927.start:0,_92b=(_927.count&&(_927.count!==Infinity))?(_92a+_927.count):_926.length;
_927.abort=function(){
_929=true;
if(_928){
_928.call(_927);
}
};
var _92c=_927.scope||_920.global;
if(!_927.store){
_927.store=this;
}
if(_927.onBegin){
_927.onBegin.call(_92c,_926.length,_927);
}
if(_927.sort){
_926.sort(_921.createSortFunction(_927.sort,this));
}
if(_927.onItem){
for(var i=_92a;(i<_926.length)&&(i<_92b);++i){
var item=_926[i];
if(!_929){
_927.onItem.call(_92c,item,_927);
}
}
}
if(_927.onComplete&&!_929){
var _92d=null;
if(!_927.onItem){
_92d=_926.slice(_92a,_92b);
}
_927.onComplete.call(_92c,_92d,_927);
}
};
_922.fetch=function(_92e){
_92e=_92e||{};
if(!_92e.store){
_92e.store=this;
}
this._fetchItems(_92e,lang.hitch(this,"fetchHandler"),lang.hitch(this,"errorHandler"));
return _92e;
};
return _922;
});
},"dijit/Menu":function(){
define(["require","dojo/_base/array","dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-geometry","dojo/dom-style","dojo/keys","dojo/_base/lang","dojo/on","dojo/sniff","dojo/_base/window","dojo/window","./popup","./DropDownMenu","dojo/ready"],function(_92f,_930,_931,dom,_932,_933,_934,keys,lang,on,has,win,_935,pm,_936,_937){
if(has("dijit-legacy-requires")){
_937(0,function(){
var _938=["dijit/MenuItem","dijit/PopupMenuItem","dijit/CheckedMenuItem","dijit/MenuSeparator"];
_92f(_938);
});
}
return _931("dijit.Menu",_936,{constructor:function(){
this._bindings=[];
},targetNodeIds:[],selector:"",contextMenuForWindow:false,leftClickToOpen:false,refocus:true,postCreate:function(){
if(this.contextMenuForWindow){
this.bindDomNode(this.ownerDocumentBody);
}else{
_930.forEach(this.targetNodeIds,this.bindDomNode,this);
}
this.inherited(arguments);
},_iframeContentWindow:function(_939){
return _935.get(this._iframeContentDocument(_939))||this._iframeContentDocument(_939)["__parent__"]||(_939.name&&document.frames[_939.name])||null;
},_iframeContentDocument:function(_93a){
return _93a.contentDocument||(_93a.contentWindow&&_93a.contentWindow.document)||(_93a.name&&document.frames[_93a.name]&&document.frames[_93a.name].document)||null;
},bindDomNode:function(node){
node=dom.byId(node,this.ownerDocument);
var cn;
if(node.tagName.toLowerCase()=="iframe"){
var _93b=node,_93c=this._iframeContentWindow(_93b);
cn=win.body(_93c.document);
}else{
cn=(node==win.body(this.ownerDocument)?this.ownerDocument.documentElement:node);
}
var _93d={node:node,iframe:_93b};
_932.set(node,"_dijitMenu"+this.id,this._bindings.push(_93d));
var _93e=lang.hitch(this,function(cn){
var _93f=this.selector,_940=_93f?function(_941){
return on.selector(_93f,_941);
}:function(_942){
return _942;
},self=this;
return [on(cn,_940(this.leftClickToOpen?"click":"contextmenu"),function(evt){
evt.stopPropagation();
evt.preventDefault();
self._scheduleOpen(this,_93b,{x:evt.pageX,y:evt.pageY});
}),on(cn,_940("keydown"),function(evt){
if(evt.shiftKey&&evt.keyCode==keys.F10){
evt.stopPropagation();
evt.preventDefault();
self._scheduleOpen(this,_93b);
}
})];
});
_93d.connects=cn?_93e(cn):[];
if(_93b){
_93d.onloadHandler=lang.hitch(this,function(){
var _943=this._iframeContentWindow(_93b),cn=win.body(_943.document);
_93d.connects=_93e(cn);
});
if(_93b.addEventListener){
_93b.addEventListener("load",_93d.onloadHandler,false);
}else{
_93b.attachEvent("onload",_93d.onloadHandler);
}
}
},unBindDomNode:function(_944){
var node;
try{
node=dom.byId(_944,this.ownerDocument);
}
catch(e){
return;
}
var _945="_dijitMenu"+this.id;
if(node&&_932.has(node,_945)){
var bid=_932.get(node,_945)-1,b=this._bindings[bid],h;
while((h=b.connects.pop())){
h.remove();
}
var _946=b.iframe;
if(_946){
if(_946.removeEventListener){
_946.removeEventListener("load",b.onloadHandler,false);
}else{
_946.detachEvent("onload",b.onloadHandler);
}
}
_932.remove(node,_945);
delete this._bindings[bid];
}
},_scheduleOpen:function(_947,_948,_949){
if(!this._openTimer){
this._openTimer=this.defer(function(){
delete this._openTimer;
this._openMyself({target:_947,iframe:_948,coords:_949});
},1);
}
},_openMyself:function(args){
var _94a=args.target,_94b=args.iframe,_94c=args.coords,_94d=!_94c;
this.currentTarget=_94a;
if(_94c){
if(_94b){
var ifc=_933.position(_94b,true),_94e=this._iframeContentWindow(_94b),_94f=_933.docScroll(_94e.document);
var cs=_934.getComputedStyle(_94b),tp=_934.toPixelValue,left=(has("ie")&&has("quirks")?0:tp(_94b,cs.paddingLeft))+(has("ie")&&has("quirks")?tp(_94b,cs.borderLeftWidth):0),top=(has("ie")&&has("quirks")?0:tp(_94b,cs.paddingTop))+(has("ie")&&has("quirks")?tp(_94b,cs.borderTopWidth):0);
_94c.x+=ifc.x+left-_94f.x;
_94c.y+=ifc.y+top-_94f.y;
}
}else{
_94c=_933.position(_94a,true);
_94c.x+=10;
_94c.y+=10;
}
var self=this;
var _950=this._focusManager.get("prevNode");
var _951=this._focusManager.get("curNode");
var _952=!_951||(dom.isDescendant(_951,this.domNode))?_950:_951;
function _953(){
if(self.refocus&&_952){
_952.focus();
}
pm.close(self);
};
pm.open({popup:this,x:_94c.x,y:_94c.y,onExecute:_953,onCancel:_953,orient:this.isLeftToRight()?"L":"R"});
this.focus();
if(!_94d){
this.defer(function(){
this._cleanUp(true);
});
}
this._onBlur=function(){
this.inherited("_onBlur",arguments);
pm.close(this);
};
},destroy:function(){
_930.forEach(this._bindings,function(b){
if(b){
this.unBindDomNode(b.node);
}
},this);
this.inherited(arguments);
}});
});
},"dijit/form/_CheckBoxMixin":function(){
define(["dojo/_base/declare","dojo/dom-attr"],function(_954,_955){
return _954("dijit.form._CheckBoxMixin",null,{type:"checkbox",value:"on",readOnly:false,_aria_attr:"aria-checked",_setReadOnlyAttr:function(_956){
this._set("readOnly",_956);
_955.set(this.focusNode,"readOnly",_956);
},_setLabelAttr:undefined,_getSubmitValue:function(_957){
return (_957==null||_957==="")?"on":_957;
},_setValueAttr:function(_958){
_958=this._getSubmitValue(_958);
this._set("value",_958);
_955.set(this.focusNode,"value",_958);
},reset:function(){
this.inherited(arguments);
this._set("value",this._getSubmitValue(this.params.value));
_955.set(this.focusNode,"value",this.value);
},_onClick:function(e){
if(this.readOnly){
e.stopPropagation();
e.preventDefault();
return false;
}
return this.inherited(arguments);
}});
});
},"dijit/layout/ContentPane":function(){
define(["dojo/_base/kernel","dojo/_base/lang","../_Widget","../_Container","./_ContentPaneResizeMixin","dojo/string","dojo/html","dojo/i18n!../nls/loading","dojo/_base/array","dojo/_base/declare","dojo/_base/Deferred","dojo/dom","dojo/dom-attr","dojo/dom-construct","dojo/_base/xhr","dojo/i18n","dojo/when"],function(_959,lang,_95a,_95b,_95c,_95d,html,_95e,_95f,_960,_961,dom,_962,_963,xhr,i18n,when){
return _960("dijit.layout.ContentPane",[_95a,_95b,_95c],{href:"",content:"",extractContent:false,parseOnLoad:true,parserScope:_959._scopeName,preventCache:false,preload:false,refreshOnShow:false,loadingMessage:"<span class='dijitContentPaneLoading'><span class='dijitInline dijitIconLoading'></span>${loadingState}</span>",errorMessage:"<span class='dijitContentPaneError'><span class='dijitInline dijitIconError'></span>${errorState}</span>",isLoaded:false,baseClass:"dijitContentPane",ioArgs:{},onLoadDeferred:null,_setTitleAttr:null,stopParser:true,template:false,markupFactory:function(_964,node,ctor){
var self=new ctor(_964,node);
return !self.href&&self._contentSetter&&self._contentSetter.parseDeferred&&!self._contentSetter.parseDeferred.isFulfilled()?self._contentSetter.parseDeferred.then(function(){
return self;
}):self;
},create:function(_965,_966){
if((!_965||!_965.template)&&_966&&!("href" in _965)&&!("content" in _965)){
_966=dom.byId(_966);
var df=_966.ownerDocument.createDocumentFragment();
while(_966.firstChild){
df.appendChild(_966.firstChild);
}
_965=lang.delegate(_965,{content:df});
}
this.inherited(arguments,[_965,_966]);
},postMixInProperties:function(){
this.inherited(arguments);
var _967=i18n.getLocalization("dijit","loading",this.lang);
this.loadingMessage=_95d.substitute(this.loadingMessage,_967);
this.errorMessage=_95d.substitute(this.errorMessage,_967);
},buildRendering:function(){
this.inherited(arguments);
if(!this.containerNode){
this.containerNode=this.domNode;
}
this.domNode.removeAttribute("title");
},startup:function(){
this.inherited(arguments);
if(this._contentSetter){
_95f.forEach(this._contentSetter.parseResults,function(obj){
if(!obj._started&&!obj._destroyed&&lang.isFunction(obj.startup)){
obj.startup();
obj._started=true;
}
},this);
}
},_startChildren:function(){
_95f.forEach(this.getChildren(),function(obj){
if(!obj._started&&!obj._destroyed&&lang.isFunction(obj.startup)){
obj.startup();
obj._started=true;
}
});
if(this._contentSetter){
_95f.forEach(this._contentSetter.parseResults,function(obj){
if(!obj._started&&!obj._destroyed&&lang.isFunction(obj.startup)){
obj.startup();
obj._started=true;
}
},this);
}
},setHref:function(href){
_959.deprecated("dijit.layout.ContentPane.setHref() is deprecated. Use set('href', ...) instead.","","2.0");
return this.set("href",href);
},_setHrefAttr:function(href){
this.cancel();
this.onLoadDeferred=new _961(lang.hitch(this,"cancel"));
this.onLoadDeferred.then(lang.hitch(this,"onLoad"));
this._set("href",href);
if(this.preload||(this._created&&this._isShown())){
this._load();
}else{
this._hrefChanged=true;
}
return this.onLoadDeferred;
},setContent:function(data){
_959.deprecated("dijit.layout.ContentPane.setContent() is deprecated.  Use set('content', ...) instead.","","2.0");
this.set("content",data);
},_setContentAttr:function(data){
this._set("href","");
this.cancel();
this.onLoadDeferred=new _961(lang.hitch(this,"cancel"));
if(this._created){
this.onLoadDeferred.then(lang.hitch(this,"onLoad"));
}
this._setContent(data||"");
this._isDownloaded=false;
return this.onLoadDeferred;
},_getContentAttr:function(){
return this.containerNode.innerHTML;
},cancel:function(){
if(this._xhrDfd&&(this._xhrDfd.fired==-1)){
this._xhrDfd.cancel();
}
delete this._xhrDfd;
this.onLoadDeferred=null;
},destroy:function(){
this.cancel();
this.inherited(arguments);
},destroyRecursive:function(_968){
if(this._beingDestroyed){
return;
}
this.inherited(arguments);
},_onShow:function(){
this.inherited(arguments);
if(this.href){
if(!this._xhrDfd&&(!this.isLoaded||this._hrefChanged||this.refreshOnShow)){
return this.refresh();
}
}
},refresh:function(){
this.cancel();
this.onLoadDeferred=new _961(lang.hitch(this,"cancel"));
this.onLoadDeferred.then(lang.hitch(this,"onLoad"));
this._load();
return this.onLoadDeferred;
},_load:function(){
this._setContent(this.onDownloadStart(),true);
var self=this;
var _969={preventCache:(this.preventCache||this.refreshOnShow),url:this.href,handleAs:"text"};
if(lang.isObject(this.ioArgs)){
lang.mixin(_969,this.ioArgs);
}
var hand=(this._xhrDfd=(this.ioMethod||xhr.get)(_969)),_96a;
hand.then(function(html){
_96a=html;
try{
self._isDownloaded=true;
return self._setContent(html,false);
}
catch(err){
self._onError("Content",err);
}
},function(err){
if(!hand.canceled){
self._onError("Download",err);
}
delete self._xhrDfd;
return err;
}).then(function(){
self.onDownloadEnd();
delete self._xhrDfd;
return _96a;
});
delete this._hrefChanged;
},_onLoadHandler:function(data){
this._set("isLoaded",true);
try{
this.onLoadDeferred.resolve(data);
}
catch(e){
console.error("Error "+this.widgetId+" running custom onLoad code: "+e.message);
}
},_onUnloadHandler:function(){
this._set("isLoaded",false);
try{
this.onUnload();
}
catch(e){
console.error("Error "+this.widgetId+" running custom onUnload code: "+e.message);
}
},destroyDescendants:function(_96b){
if(this.isLoaded){
this._onUnloadHandler();
}
var _96c=this._contentSetter;
_95f.forEach(this.getChildren(),function(_96d){
if(_96d.destroyRecursive){
_96d.destroyRecursive(_96b);
}else{
if(_96d.destroy){
_96d.destroy(_96b);
}
}
_96d._destroyed=true;
});
if(_96c){
_95f.forEach(_96c.parseResults,function(_96e){
if(!_96e._destroyed){
if(_96e.destroyRecursive){
_96e.destroyRecursive(_96b);
}else{
if(_96e.destroy){
_96e.destroy(_96b);
}
}
_96e._destroyed=true;
}
});
delete _96c.parseResults;
}
if(!_96b){
_963.empty(this.containerNode);
}
delete this._singleChild;
},_setContent:function(cont,_96f){
this.destroyDescendants();
var _970=this._contentSetter;
if(!(_970&&_970 instanceof html._ContentSetter)){
_970=this._contentSetter=new html._ContentSetter({node:this.containerNode,_onError:lang.hitch(this,this._onError),onContentError:lang.hitch(this,function(e){
var _971=this.onContentError(e);
try{
this.containerNode.innerHTML=_971;
}
catch(e){
console.error("Fatal "+this.id+" could not change content due to "+e.message,e);
}
})});
}
var _972=lang.mixin({cleanContent:this.cleanContent,extractContent:this.extractContent,parseContent:!cont.domNode&&this.parseOnLoad,parserScope:this.parserScope,startup:false,dir:this.dir,lang:this.lang,textDir:this.textDir},this._contentSetterParams||{});
var p=_970.set((lang.isObject(cont)&&cont.domNode)?cont.domNode:cont,_972);
var self=this;
return when(p&&p.then?p:_970.parseDeferred,function(){
delete self._contentSetterParams;
if(!_96f){
if(self._started){
self._startChildren();
self._scheduleLayout();
}
self._onLoadHandler(cont);
}
});
},_onError:function(type,err,_973){
this.onLoadDeferred.reject(err);
var _974=this["on"+type+"Error"].call(this,err);
if(_973){
console.error(_973,err);
}else{
if(_974){
this._setContent(_974,true);
}
}
},onLoad:function(){
},onUnload:function(){
},onDownloadStart:function(){
return this.loadingMessage;
},onContentError:function(){
},onDownloadError:function(){
return this.errorMessage;
},onDownloadEnd:function(){
}});
});
},"dijit/_KeyNavContainer":function(){
define(["dojo/_base/array","dojo/_base/declare","dojo/dom-attr","dojo/_base/kernel","dojo/keys","dojo/_base/lang","./registry","./_Container","./_FocusMixin","./_KeyNavMixin"],function(_975,_976,_977,_978,keys,lang,_979,_97a,_97b,_97c){
return _976("dijit._KeyNavContainer",[_97b,_97c,_97a],{connectKeyNavHandlers:function(_97d,_97e){
var _97f=(this._keyNavCodes={});
var prev=lang.hitch(this,"focusPrev");
var next=lang.hitch(this,"focusNext");
_975.forEach(_97d,function(code){
_97f[code]=prev;
});
_975.forEach(_97e,function(code){
_97f[code]=next;
});
_97f[keys.HOME]=lang.hitch(this,"focusFirstChild");
_97f[keys.END]=lang.hitch(this,"focusLastChild");
},startupKeyNavChildren:function(){
_978.deprecated("startupKeyNavChildren() call no longer needed","","2.0");
},startup:function(){
this.inherited(arguments);
_975.forEach(this.getChildren(),lang.hitch(this,"_startupChild"));
},addChild:function(_980,_981){
this.inherited(arguments);
this._startupChild(_980);
},_startupChild:function(_982){
_982.set("tabIndex","-1");
},_getFirst:function(){
var _983=this.getChildren();
return _983.length?_983[0]:null;
},_getLast:function(){
var _984=this.getChildren();
return _984.length?_984[_984.length-1]:null;
},focusNext:function(){
this.focusChild(this._getNextFocusableChild(this.focusedChild,1));
},focusPrev:function(){
this.focusChild(this._getNextFocusableChild(this.focusedChild,-1),true);
},childSelector:function(node){
var node=_979.byNode(node);
return node&&node.getParent()==this;
}});
});
},"dijit/layout/utils":function(){
define(["dojo/_base/array","dojo/dom-class","dojo/dom-geometry","dojo/dom-style","dojo/_base/lang"],function(_985,_986,_987,_988,lang){
function _989(word){
return word.substring(0,1).toUpperCase()+word.substring(1);
};
function size(_98a,dim){
var _98b=_98a.resize?_98a.resize(dim):_987.setMarginBox(_98a.domNode,dim);
if(_98b){
lang.mixin(_98a,_98b);
}else{
lang.mixin(_98a,_987.getMarginBox(_98a.domNode));
lang.mixin(_98a,dim);
}
};
var _98c={marginBox2contentBox:function(node,mb){
var cs=_988.getComputedStyle(node);
var me=_987.getMarginExtents(node,cs);
var pb=_987.getPadBorderExtents(node,cs);
return {l:_988.toPixelValue(node,cs.paddingLeft),t:_988.toPixelValue(node,cs.paddingTop),w:mb.w-(me.w+pb.w),h:mb.h-(me.h+pb.h)};
},layoutChildren:function(_98d,dim,_98e,_98f,_990){
dim=lang.mixin({},dim);
_986.add(_98d,"dijitLayoutContainer");
_98e=_985.filter(_98e,function(item){
return item.region!="center"&&item.layoutAlign!="client";
}).concat(_985.filter(_98e,function(item){
return item.region=="center"||item.layoutAlign=="client";
}));
_985.forEach(_98e,function(_991){
var elm=_991.domNode,pos=(_991.region||_991.layoutAlign);
if(!pos){
throw new Error("No region setting for "+_991.id);
}
var _992=elm.style;
_992.left=dim.l+"px";
_992.top=dim.t+"px";
_992.position="absolute";
_986.add(elm,"dijitAlign"+_989(pos));
var _993={};
if(_98f&&_98f==_991.id){
_993[_991.region=="top"||_991.region=="bottom"?"h":"w"]=_990;
}
if(pos=="leading"){
pos=_991.isLeftToRight()?"left":"right";
}
if(pos=="trailing"){
pos=_991.isLeftToRight()?"right":"left";
}
if(pos=="top"||pos=="bottom"){
_993.w=dim.w;
size(_991,_993);
dim.h-=_991.h;
if(pos=="top"){
dim.t+=_991.h;
}else{
_992.top=dim.t+dim.h+"px";
}
}else{
if(pos=="left"||pos=="right"){
_993.h=dim.h;
size(_991,_993);
dim.w-=_991.w;
if(pos=="left"){
dim.l+=_991.w;
}else{
_992.left=dim.l+dim.w+"px";
}
}else{
if(pos=="client"||pos=="center"){
size(_991,dim);
}
}
}
});
}};
lang.setObject("dijit.layout.utils",_98c);
return _98c;
});
},"dijit/_Contained":function(){
define(["dojo/_base/declare","./registry"],function(_994,_995){
return _994("dijit._Contained",null,{_getSibling:function(_996){
var node=this.domNode;
do{
node=node[_996+"Sibling"];
}while(node&&node.nodeType!=1);
return node&&_995.byNode(node);
},getPreviousSibling:function(){
return this._getSibling("previous");
},getNextSibling:function(){
return this._getSibling("next");
},getIndexInParent:function(){
var p=this.getParent();
if(!p||!p.getIndexOfChild){
return -1;
}
return p.getIndexOfChild(this);
}});
});
},"dgrid/List":function(){
define(["dojo/_base/kernel","dojo/_base/declare","dojo/on","dojo/has","./util/misc","dojo/has!touch?./TouchScroll","xstyle/has-class","put-selector/put","dojo/_base/sniff","xstyle/css!./css/dgrid.css"],function(_997,_998,_999,has,_99a,_99b,_99c,put){
_99c("mozilla","opera","webkit","ie","ie-6","ie-6-7","quirks","no-quirks","touch");
var _99d="dgrid-row-odd",_99e="dgrid-row-even",_99f,_9a0;
function byId(id){
return document.getElementById(id);
};
function _9a1(node,_9a2){
var body=document.body,size;
put(body,node,".dgrid-scrollbar-measure");
size=node["offset"+_9a2]-node["client"+_9a2];
put(node,"!dgrid-scrollbar-measure");
body.removeChild(node);
return size;
};
has.add("dom-scrollbar-width",function(_9a3,doc,_9a4){
return _9a1(_9a4,"Width");
});
has.add("dom-scrollbar-height",function(_9a5,doc,_9a6){
return _9a1(_9a6,"Height");
});
var _9a7=0;
function _9a8(){
return "dgrid_"+_9a7++;
};
var _9a9=/ +/g;
function _9aa(cls){
var _9ab=cls?"."+cls.replace(_9a9,"."):"";
if(this._class){
_9ab="!"+this._class.replace(_9a9,"!")+_9ab;
}
put(this.domNode,_9ab);
this._class=cls;
};
function _9ac(){
return this._class;
};
var _9ad=has("ie")<7&&!has("quirks")?function(){
var root,w,h,dims;
if(!this._started){
return;
}
root=document.documentElement;
w=root.clientWidth;
h=root.clientHeight;
dims=this._prevWinDims||[];
if(dims[0]!==w||dims[1]!==h){
this.resize();
this._prevWinDims=[w,h];
}
}:function(){
if(this._started){
this.resize();
}
};
return _998(_99b?_99b:null,{tabableHeader:false,showHeader:false,showFooter:false,maintainOddEven:true,cleanAddedRules:true,postscript:function(_9ae,_9af){
var grid=this;
(this._Row=function(id,_9b0,_9b1){
this.id=id;
this.data=_9b0;
this.element=_9b1;
}).prototype.remove=function(){
grid.removeRow(this.element);
};
if(_9af){
this.srcNodeRef=_9af=_9af.nodeType?_9af:byId(_9af);
}
this.create(_9ae,_9af);
},listType:"list",create:function(_9b2,_9b3){
var _9b4=this.domNode=_9b3||put("div"),cls;
if(_9b2){
this.params=_9b2;
_998.safeMixin(this,_9b2);
cls=_9b2["class"]||_9b2.className||_9b4.className;
this._sort=_9b2.sort||[];
delete this.sort;
}else{
this._sort=[];
}
this.observers=[];
this._listeners=[];
this._rowIdToObject={};
this.postMixInProperties&&this.postMixInProperties();
this.id=_9b4.id=_9b4.id||this.id||_9a8();
this.buildRendering();
if(cls){
_9aa.call(this,cls);
}
this.postCreate&&this.postCreate();
delete this.srcNodeRef;
if(this.domNode.offsetHeight){
this.startup();
}
},buildRendering:function(){
var _9b5=this.domNode,self=this,_9b6,_9b7,_9b8,_9b9,_9ba;
_9ba=this.isRTL=(document.body.dir||document.documentElement.dir||document.body.style.direction).toLowerCase()=="rtl";
_9b5.className="";
put(_9b5,"[role=grid].ui-widget.dgrid.dgrid-"+this.listType);
_9b6=this.headerNode=put(_9b5,"div.dgrid-header.dgrid-header-row.ui-widget-header"+(this.showHeader?"":".dgrid-header-hidden"));
if(has("quirks")||has("ie")<8){
_9b7=put(_9b5,"div.dgrid-spacer");
}
_9b8=this.bodyNode=put(_9b5,"div.dgrid-scroller");
_9b8.tabIndex=-1;
this.headerScrollNode=put(_9b5,"div.dgrid-header-scroll.dgrid-scrollbar-width.ui-widget-header");
_9b9=this.footerNode=put("div.dgrid-footer"+(this.showFooter?"":".dgrid-footer-hidden"));
put(_9b5,_9b9);
if(_9ba){
_9b5.className+=" dgrid-rtl"+(has("webkit")?"":" dgrid-rtl-nonwebkit");
}
_999(_9b8,"scroll",function(_9bb){
if(self.showHeader){
_9b6.scrollLeft=_9bb.scrollLeft||_9b8.scrollLeft;
}
_9bb.stopPropagation();
_999.emit(_9b5,"scroll",{scrollTarget:_9b8});
});
this.configStructure();
this.renderHeader();
this.contentNode=this.touchNode=put(this.bodyNode,"div.dgrid-content.ui-widget-content");
this._listeners.push(this._resizeHandle=_999(window,"resize",_99a.throttleDelayed(_9ad,this)));
},startup:function(){
if(this._started){
return;
}
this.inherited(arguments);
this._started=true;
this.resize();
this.set("sort",this._sort);
},configStructure:function(){
},resize:function(){
var _9bc=this.bodyNode,_9bd=this.headerNode,_9be=this.footerNode,_9bf=_9bd.offsetHeight,_9c0=this.showFooter?_9be.offsetHeight:0,_9c1=has("quirks")||has("ie")<7;
this.headerScrollNode.style.height=_9bc.style.marginTop=_9bf+"px";
_9bc.style.marginBottom=_9c0+"px";
if(_9c1){
_9bc.style.height="";
_9bc.style.height=Math.max((this.domNode.offsetHeight-_9bf-_9c0),0)+"px";
if(_9c0){
_9be.style.bottom="1px";
setTimeout(function(){
_9be.style.bottom="";
},0);
}
}
if(!_99f){
_99f=has("dom-scrollbar-width");
_9a0=has("dom-scrollbar-height");
if(has("ie")){
_99f++;
_9a0++;
}
_99a.addCssRule(".dgrid-scrollbar-width","width: "+_99f+"px");
_99a.addCssRule(".dgrid-scrollbar-height","height: "+_9a0+"px");
if(_99f!=17&&!_9c1){
_99a.addCssRule(".dgrid-header","right: "+_99f+"px");
_99a.addCssRule(".dgrid-rtl-nonwebkit .dgrid-header","left: "+_99f+"px");
}
}
if(_9c1){
_9bd.style.width=_9bc.clientWidth+"px";
setTimeout(function(){
_9bd.scrollLeft=_9bc.scrollLeft;
},0);
}
},addCssRule:function(_9c2,css){
var rule=_99a.addCssRule(_9c2,css);
if(this.cleanAddedRules){
this._listeners.push(rule);
}
return rule;
},on:function(_9c3,_9c4){
var _9c5=_999(this.domNode,_9c3,_9c4);
if(!has("dom-addeventlistener")){
this._listeners.push(_9c5);
}
return _9c5;
},cleanup:function(){
var _9c6=this.observers,i;
for(i in this._rowIdToObject){
if(this._rowIdToObject[i]!=this.columns){
var _9c7=byId(i);
if(_9c7){
this.removeRow(_9c7,true);
}
}
}
for(i=0;i<_9c6.length;i++){
var _9c8=_9c6[i];
_9c8&&_9c8.cancel();
}
this.observers=[];
this.preload=null;
},destroy:function(){
if(this._listeners){
for(var i=this._listeners.length;i--;){
this._listeners[i].remove();
}
delete this._listeners;
}
this.cleanup();
put(this.domNode,"!");
},refresh:function(){
this.cleanup();
this._rowIdToObject={};
this._autoId=0;
this.contentNode.innerHTML="";
this.scrollTo({x:0,y:0});
},newRow:function(_9c9,_9ca,_9cb,i,_9cc){
if(_9ca){
var row=this.insertRow(_9c9,_9ca,_9cb,i,_9cc);
put(row,".ui-state-highlight");
setTimeout(function(){
put(row,"!ui-state-highlight");
},250);
return row;
}
},adjustRowIndices:function(_9cd){
if(this.maintainOddEven){
var next=_9cd;
var _9ce=next.rowIndex;
if(_9ce>-1){
do{
if(next.rowIndex>-1){
if((next.className+" ").indexOf("dgrid-row ")>-1){
put(next,"."+(_9ce%2==1?_99d:_99e)+"!"+(_9ce%2==0?_99d:_99e));
}
next.rowIndex=_9ce++;
}
}while((next=next.nextSibling)&&next.rowIndex!=_9ce&&!next.blockRowIndex);
}
}
},renderArray:function(_9cf,_9d0,_9d1){
_9d1=_9d1||{};
var self=this,_9d2=_9d1.start||0,row,rows,_9d3;
if(!_9d0){
this._lastCollection=_9cf;
}
if(_9cf.observe){
var _9d4=this.observers.push(_9cf.observe(function(_9d5,from,to){
var _9d6,_9d7,_9d8;
if(from>-1&&rows[from]){
row=rows.splice(from,1)[0];
if(row.parentNode==_9d3){
_9d6=row.nextSibling;
if(_9d6){
if(from!=to){
_9d6.rowIndex--;
}
}
self.removeRow(row);
}
if(self._processScroll){
self._processScroll();
}
}
if(to>-1){
_9d7=rows[to];
if(!_9d7){
_9d7=rows[to-1];
if(_9d7){
_9d7=(_9d7.connected||_9d7).nextSibling;
}
}
_9d8=(_9d0&&_9d0.parentNode)||(_9d7&&_9d7.parentNode)||self.contentNode;
row=self.newRow(_9d5,_9d8,_9d7,_9d1.start+to,_9d1);
if(row){
row.observerIndex=_9d4;
rows.splice(to,0,row);
if(!_9d6||to<from){
var _9d9=row.previousSibling;
_9d6=!_9d9||_9d9.rowIndex+1==row.rowIndex||row.rowIndex==0?row:_9d9;
}
}
_9d1.count++;
}
from!=to&&_9d6&&self.adjustRowIndices(_9d6);
self._onNotification(rows,_9d5,from,to);
},true))-1;
}
var _9da=document.createDocumentFragment();
if(_9cf.map){
rows=_9cf.map(_9db,console.error);
if(rows.then){
return rows.then(_9dc);
}
}else{
rows=[];
for(var i=0,l=_9cf.length;i<l;i++){
rows[i]=_9db(_9cf[i]);
}
}
var _9dd;
function _9db(_9de){
_9dd=self.insertRow(_9de,_9da,null,_9d2++,_9d1);
_9dd.observerIndex=_9d4;
return _9dd;
};
function _9dc(_9df){
_9d3=_9d0?_9d0.parentNode:self.contentNode;
if(_9d3){
_9d3.insertBefore(_9da,_9d0||null);
_9dd=_9df[_9df.length-1];
_9dd&&self.adjustRowIndices(_9dd);
}
return (rows=_9df);
};
return _9dc(rows);
},_onNotification:function(rows,_9e0,from,to){
},renderHeader:function(){
},_autoId:0,insertRow:function(_9e1,_9e2,_9e3,i,_9e4){
var _9e5=_9e4.parentId,id=this.id+"-row-"+(_9e5?_9e5+"-":"")+((this.store&&this.store.getIdentity)?this.store.getIdentity(_9e1):this._autoId++),row=byId(id),_9e6=row&&row.previousSibling;
if(row){
this.removeRow(row);
}
row=this.renderRow(_9e1,_9e4);
row.className=(row.className||"")+" ui-state-default dgrid-row "+(i%2==1?_99d:_99e);
this._rowIdToObject[row.id=id]=_9e1;
_9e2.insertBefore(row,_9e3||null);
if(_9e6){
this.adjustRowIndices(_9e6);
}
row.rowIndex=i;
return row;
},renderRow:function(_9e7,_9e8){
return put("div",""+_9e7);
},removeRow:function(_9e9,_9ea){
_9e9=_9e9.element||_9e9;
delete this._rowIdToObject[_9e9.id];
if(!_9ea){
put(_9e9,"!");
}
},row:function(_9eb){
var id;
if(_9eb instanceof this._Row){
return _9eb;
}
if(_9eb.target&&_9eb.target.nodeType){
_9eb=_9eb.target;
}
if(_9eb.nodeType){
var _9ec;
do{
var _9ed=_9eb.id;
if((_9ec=this._rowIdToObject[_9ed])){
return new this._Row(_9ed.substring(this.id.length+5),_9ec,_9eb);
}
_9eb=_9eb.parentNode;
}while(_9eb&&_9eb!=this.domNode);
return;
}
if(typeof _9eb=="object"){
id=this.store.getIdentity(_9eb);
}else{
id=_9eb;
_9eb=this._rowIdToObject[this.id+"-row-"+id];
}
return new this._Row(id,_9eb,byId(this.id+"-row-"+id));
},cell:function(_9ee){
return {row:this.row(_9ee)};
},_move:function(item,_9ef,_9f0,_9f1){
var _9f2,_9f3,_9f4;
_9f4=_9f3=item.element;
_9ef=_9ef||1;
do{
if((_9f2=_9f3[_9ef<0?"previousSibling":"nextSibling"])){
do{
_9f3=_9f2;
if(_9f3&&(_9f3.className+" ").indexOf(_9f0+" ")>-1){
_9f4=_9f3;
_9ef+=_9ef<0?1:-1;
break;
}
}while((_9f2=(!_9f1||!_9f3.hidden)&&_9f3[_9ef<0?"lastChild":"firstChild"]));
}else{
_9f3=_9f3.parentNode;
if(_9f3===this.bodyNode||_9f3===this.headerNode){
break;
}
}
}while(_9ef);
return _9f4;
},up:function(row,_9f5,_9f6){
if(!row.element){
row=this.row(row);
}
return this.row(this._move(row,-(_9f5||1),"dgrid-row",_9f6));
},down:function(row,_9f7,_9f8){
if(!row.element){
row=this.row(row);
}
return this.row(this._move(row,_9f7||1,"dgrid-row",_9f8));
},scrollTo:has("touch")?function(){
return this.inherited(arguments);
}:function(_9f9){
if(typeof _9f9.x!=="undefined"){
this.bodyNode.scrollLeft=_9f9.x;
}
if(typeof _9f9.y!=="undefined"){
this.bodyNode.scrollTop=_9f9.y;
}
},getScrollPosition:has("touch")?function(){
return this.inherited(arguments);
}:function(){
return {x:this.bodyNode.scrollLeft,y:this.bodyNode.scrollTop};
},get:function(name){
var fn="_get"+name.charAt(0).toUpperCase()+name.slice(1);
if(typeof this[fn]==="function"){
return this[fn].apply(this,[].slice.call(arguments,1));
}
if(!1&&typeof this[fn+"Attr"]==="function"){
console.warn("dgrid: Use "+fn+" instead of "+fn+"Attr for getting "+name);
}
return this[name];
},set:function(name,_9fa){
if(typeof name==="object"){
for(var k in name){
this.set(k,name[k]);
}
}else{
var fn="_set"+name.charAt(0).toUpperCase()+name.slice(1);
if(typeof this[fn]==="function"){
this[fn].apply(this,[].slice.call(arguments,1));
}else{
if(!1&&typeof this[fn+"Attr"]==="function"){
console.warn("dgrid: Use "+fn+" instead of "+fn+"Attr for setting "+name);
}
this[name]=_9fa;
}
}
return this;
},_getClass:_9ac,_setClass:_9aa,_getClassName:_9ac,_setClassName:_9aa,_setSort:function(_9fb,_9fc){
this._sort=typeof _9fb!="string"?_9fb:[{attribute:_9fb,descending:_9fc}];
this.refresh();
if(this._lastCollection){
if(_9fb.length){
if(typeof _9fb!="string"){
_9fc=_9fb[0].descending;
_9fb=_9fb[0].attribute;
}
this._lastCollection.sort(function(a,b){
var aVal=a[_9fb],bVal=b[_9fb];
if(aVal===undefined){
aVal="";
}
if(bVal===undefined){
bVal="";
}
return aVal==bVal?0:(aVal>bVal==!_9fc?1:-1);
});
}
this.renderArray(this._lastCollection);
}
},sort:function(_9fd,_9fe){
_997.deprecated("sort(...)","use set(\"sort\", ...) instead","dgrid 1.0");
this.set("sort",_9fd,_9fe);
},_getSort:function(){
return this._sort;
},_setShowHeader:function(show){
var _9ff=this.headerNode;
this.showHeader=show;
put(_9ff,(show?"!":".")+"dgrid-header-hidden");
this.renderHeader();
this.resize();
if(show){
_9ff.scrollLeft=this.getScrollPosition().x;
}
},setShowHeader:function(show){
_997.deprecated("setShowHeader(...)","use set(\"showHeader\", ...) instead","dgrid 1.0");
this.set("showHeader",show);
},_setShowFooter:function(show){
this.showFooter=show;
put(this.footerNode,(show?"!":".")+"dgrid-footer-hidden");
this.resize();
}});
});
},"dijit/form/DataList":function(){
define(["dojo/_base/declare","dojo/dom","dojo/_base/lang","dojo/query","dojo/store/Memory","../registry"],function(_a00,dom,lang,_a01,_a02,_a03){
function _a04(_a05){
return {id:_a05.value,value:_a05.value,name:lang.trim(_a05.innerText||_a05.textContent||"")};
};
return _a00("dijit.form.DataList",_a02,{constructor:function(_a06,_a07){
this.domNode=dom.byId(_a07);
lang.mixin(this,_a06);
if(this.id){
_a03.add(this);
}
this.domNode.style.display="none";
this.inherited(arguments,[{data:_a01("option",this.domNode).map(_a04)}]);
},destroy:function(){
_a03.remove(this.id);
},fetchSelectedItem:function(){
var _a08=_a01("> option[selected]",this.domNode)[0]||_a01("> option",this.domNode)[0];
return _a08&&_a04(_a08);
}});
});
},"dijit/_editor/_Plugin":function(){
define(["dojo/_base/connect","dojo/_base/declare","dojo/_base/lang","../Destroyable","../form/Button"],function(_a09,_a0a,lang,_a0b,_a0c){
var _a0d=_a0a("dijit._editor._Plugin",_a0b,{constructor:function(args){
this.params=args||{};
lang.mixin(this,this.params);
this._attrPairNames={};
},editor:null,iconClassPrefix:"dijitEditorIcon",button:null,command:"",useDefaultCommand:true,buttonClass:_a0c,disabled:false,getLabel:function(key){
return this.editor.commands[key];
},_initButton:function(){
if(this.command.length){
var _a0e=this.getLabel(this.command),_a0f=this.editor,_a10=this.iconClassPrefix+" "+this.iconClassPrefix+this.command.charAt(0).toUpperCase()+this.command.substr(1);
if(!this.button){
var _a11=lang.mixin({label:_a0e,ownerDocument:_a0f.ownerDocument,dir:_a0f.dir,lang:_a0f.lang,showLabel:false,iconClass:_a10,dropDown:this.dropDown,tabIndex:"-1"},this.params||{});
this.button=new this.buttonClass(_a11);
}
}
if(this.get("disabled")&&this.button){
this.button.set("disabled",this.get("disabled"));
}
},destroy:function(){
if(this.dropDown){
this.dropDown.destroyRecursive();
}
this.inherited(arguments);
},connect:function(o,f,tf){
this.own(_a09.connect(o,f,this,tf));
},updateState:function(){
var e=this.editor,c=this.command,_a12,_a13;
if(!e||!e.isLoaded||!c.length){
return;
}
var _a14=this.get("disabled");
if(this.button){
try{
_a13=!_a14&&e.queryCommandEnabled(c);
if(this.enabled!==_a13){
this.enabled=_a13;
this.button.set("disabled",!_a13);
}
if(_a13){
if(typeof this.button.checked=="boolean"){
_a12=e.queryCommandState(c);
if(this.checked!==_a12){
this.checked=_a12;
this.button.set("checked",e.queryCommandState(c));
}
}
}
}
catch(e){
}
}
},setEditor:function(_a15){
this.editor=_a15;
this._initButton();
if(this.button&&this.useDefaultCommand){
if(this.editor.queryCommandAvailable(this.command)){
this.own(this.button.on("click",lang.hitch(this.editor,"execCommand",this.command,this.commandArg)));
}else{
this.button.domNode.style.display="none";
}
}
this.own(this.editor.on("NormalizedDisplayChanged",lang.hitch(this,"updateState")));
},setToolbar:function(_a16){
if(this.button){
_a16.addChild(this.button);
}
},set:function(name,_a17){
if(typeof name==="object"){
for(var x in name){
this.set(x,name[x]);
}
return this;
}
var _a18=this._getAttrNames(name);
if(this[_a18.s]){
var _a19=this[_a18.s].apply(this,Array.prototype.slice.call(arguments,1));
}else{
this._set(name,_a17);
}
return _a19||this;
},get:function(name){
var _a1a=this._getAttrNames(name);
return this[_a1a.g]?this[_a1a.g]():this[name];
},_setDisabledAttr:function(_a1b){
this._set("disabled",_a1b);
this.updateState();
},_getAttrNames:function(name){
var apn=this._attrPairNames;
if(apn[name]){
return apn[name];
}
var uc=name.charAt(0).toUpperCase()+name.substr(1);
return (apn[name]={s:"_set"+uc+"Attr",g:"_get"+uc+"Attr"});
},_set:function(name,_a1c){
this[name]=_a1c;
}});
_a0d.registry={};
return _a0d;
});
},"dijit/form/CheckBox":function(){
define(["require","dojo/_base/declare","dojo/dom-attr","dojo/has","dojo/query","dojo/ready","./ToggleButton","./_CheckBoxMixin","dojo/text!./templates/CheckBox.html","dojo/NodeList-dom","../a11yclick"],function(_a1d,_a1e,_a1f,has,_a20,_a21,_a22,_a23,_a24){
if(has("dijit-legacy-requires")){
_a21(0,function(){
var _a25=["dijit/form/RadioButton"];
_a1d(_a25);
});
}
return _a1e("dijit.form.CheckBox",[_a22,_a23],{templateString:_a24,baseClass:"dijitCheckBox",_setValueAttr:function(_a26,_a27){
if(typeof _a26=="string"){
this.inherited(arguments);
_a26=true;
}
if(this._created){
this.set("checked",_a26,_a27);
}
},_getValueAttr:function(){
return this.checked&&this._get("value");
},_setIconClassAttr:null,_setNameAttr:"focusNode",postMixInProperties:function(){
this.inherited(arguments);
this.checkedAttrSetting="";
},_fillContent:function(){
},_onFocus:function(){
if(this.id){
_a20("label[for='"+this.id+"']").addClass("dijitFocusedLabel");
}
this.inherited(arguments);
},_onBlur:function(){
if(this.id){
_a20("label[for='"+this.id+"']").removeClass("dijitFocusedLabel");
}
this.inherited(arguments);
}});
});
},"dijit/tree/_dndSelector":function(){
define(["dojo/_base/array","dojo/_base/connect","dojo/_base/declare","dojo/_base/kernel","dojo/_base/lang","dojo/dom","dojo/mouse","dojo/on","dojo/touch","../a11yclick","./_dndContainer"],function(_a28,_a29,_a2a,_a2b,lang,dom,_a2c,on,_a2d,_a2e,_a2f){
return _a2a("dijit.tree._dndSelector",_a2f,{constructor:function(){
this.selection={};
this.anchor=null;
this.events.push(on(this.tree.domNode,_a2d.press,lang.hitch(this,"onMouseDown")),on(this.tree.domNode,_a2d.release,lang.hitch(this,"onMouseUp")),on(this.tree.domNode,_a2d.move,lang.hitch(this,"onMouseMove")),on(this.tree.domNode,_a2e.press,lang.hitch(this,"onClickPress")),on(this.tree.domNode,_a2e.release,lang.hitch(this,"onClickRelease")));
},singular:false,getSelectedTreeNodes:function(){
var _a30=[],sel=this.selection;
for(var i in sel){
_a30.push(sel[i]);
}
return _a30;
},selectNone:function(){
this.setSelection([]);
return this;
},destroy:function(){
this.inherited(arguments);
this.selection=this.anchor=null;
},addTreeNode:function(node,_a31){
this.setSelection(this.getSelectedTreeNodes().concat([node]));
if(_a31){
this.anchor=node;
}
return node;
},removeTreeNode:function(node){
var _a32=_a28.filter(this.getSelectedTreeNodes(),function(_a33){
return !dom.isDescendant(_a33.domNode,node.domNode);
});
this.setSelection(_a32);
return node;
},isTreeNodeSelected:function(node){
return node.id&&!!this.selection[node.id];
},setSelection:function(_a34){
var _a35=this.getSelectedTreeNodes();
_a28.forEach(this._setDifference(_a35,_a34),lang.hitch(this,function(node){
node.setSelected(false);
if(this.anchor==node){
delete this.anchor;
}
delete this.selection[node.id];
}));
_a28.forEach(this._setDifference(_a34,_a35),lang.hitch(this,function(node){
node.setSelected(true);
this.selection[node.id]=node;
}));
this._updateSelectionProperties();
},_setDifference:function(xs,ys){
_a28.forEach(ys,function(y){
y.__exclude__=true;
});
var ret=_a28.filter(xs,function(x){
return !x.__exclude__;
});
_a28.forEach(ys,function(y){
delete y["__exclude__"];
});
return ret;
},_updateSelectionProperties:function(){
var _a36=this.getSelectedTreeNodes();
var _a37=[],_a38=[],_a39=[];
_a28.forEach(_a36,function(node){
var ary=node.getTreePath(),_a3a=this.tree.model;
_a38.push(node);
_a37.push(ary);
ary=_a28.map(ary,function(item){
return _a3a.getIdentity(item);
},this);
_a39.push(ary.join("/"));
},this);
var _a3b=_a28.map(_a38,function(node){
return node.item;
});
this.tree._set("paths",_a37);
this.tree._set("path",_a37[0]||[]);
this.tree._set("selectedNodes",_a38);
this.tree._set("selectedNode",_a38[0]||null);
this.tree._set("selectedItems",_a3b);
this.tree._set("selectedItem",_a3b[0]||null);
},onClickPress:function(e){
if(this.current&&this.current.isExpandable&&this.tree.isExpandoNode(e.target,this.current)){
return;
}
if(_a2c.isLeft(e)){
e.preventDefault();
}
var _a3c=e.type=="keydown"?this.tree.focusedChild:this.current;
if(!_a3c){
return;
}
var copy=_a29.isCopyKey(e),id=_a3c.id;
if(!this.singular&&!e.shiftKey&&this.selection[id]){
this._doDeselect=true;
return;
}else{
this._doDeselect=false;
}
this.userSelect(_a3c,copy,e.shiftKey);
},onClickRelease:function(e){
if(!this._doDeselect){
return;
}
this._doDeselect=false;
this.userSelect(e.type=="keyup"?this.tree.focusedChild:this.current,_a29.isCopyKey(e),e.shiftKey);
},onMouseMove:function(){
this._doDeselect=false;
},onMouseDown:function(){
},onMouseUp:function(){
},_compareNodes:function(n1,n2){
if(n1===n2){
return 0;
}
if("sourceIndex" in document.documentElement){
return n1.sourceIndex-n2.sourceIndex;
}else{
if("compareDocumentPosition" in document.documentElement){
return n1.compareDocumentPosition(n2)&2?1:-1;
}else{
if(document.createRange){
var r1=doc.createRange();
r1.setStartBefore(n1);
var r2=doc.createRange();
r2.setStartBefore(n2);
return r1.compareBoundaryPoints(r1.END_TO_END,r2);
}else{
throw Error("dijit.tree._compareNodes don't know how to compare two different nodes in this browser");
}
}
}
},userSelect:function(node,_a3d,_a3e){
if(this.singular){
if(this.anchor==node&&_a3d){
this.selectNone();
}else{
this.setSelection([node]);
this.anchor=node;
}
}else{
if(_a3e&&this.anchor){
var cr=this._compareNodes(this.anchor.rowNode,node.rowNode),_a3f,end,_a40=this.anchor;
if(cr<0){
_a3f=_a40;
end=node;
}else{
_a3f=node;
end=_a40;
}
var _a41=[];
while(_a3f!=end){
_a41.push(_a3f);
_a3f=this.tree._getNext(_a3f);
}
_a41.push(end);
this.setSelection(_a41);
}else{
if(this.selection[node.id]&&_a3d){
this.removeTreeNode(node);
}else{
if(_a3d){
this.addTreeNode(node,true);
}else{
this.setSelection([node]);
this.anchor=node;
}
}
}
}
},getItem:function(key){
var _a42=this.selection[key];
return {data:_a42,type:["treeNode"]};
},forInSelectedItems:function(f,o){
o=o||_a2b.global;
for(var id in this.selection){
f.call(o,this.getItem(id),id,this);
}
}});
});
},"dijit/_Container":function(){
define(["dojo/_base/array","dojo/_base/declare","dojo/dom-construct","dojo/_base/kernel"],function(_a43,_a44,_a45,_a46){
return _a44("dijit._Container",null,{buildRendering:function(){
this.inherited(arguments);
if(!this.containerNode){
this.containerNode=this.domNode;
}
},addChild:function(_a47,_a48){
var _a49=this.containerNode;
if(_a48>0){
_a49=_a49.firstChild;
while(_a48>0){
if(_a49.nodeType==1){
_a48--;
}
_a49=_a49.nextSibling;
}
if(_a49){
_a48="before";
}else{
_a49=this.containerNode;
_a48="last";
}
}
_a45.place(_a47.domNode,_a49,_a48);
if(this._started&&!_a47._started){
_a47.startup();
}
},removeChild:function(_a4a){
if(typeof _a4a=="number"){
_a4a=this.getChildren()[_a4a];
}
if(_a4a){
var node=_a4a.domNode;
if(node&&node.parentNode){
node.parentNode.removeChild(node);
}
}
},hasChildren:function(){
return this.getChildren().length>0;
},_getSiblingOfChild:function(_a4b,dir){
_a46.deprecated(this.declaredClass+"::_getSiblingOfChild() is deprecated. Use _KeyNavMixin::_getNext() instead.","","2.0");
var _a4c=this.getChildren(),idx=_a43.indexOf(_a4c,_a4b);
return _a4c[idx+dir];
},getIndexOfChild:function(_a4d){
return _a43.indexOf(this.getChildren(),_a4d);
}});
});
},"dojo/data/ItemFileReadStore":function(){
define(["../_base/kernel","../_base/lang","../_base/declare","../_base/array","../_base/xhr","../Evented","./util/filter","./util/simpleFetch","../date/stamp"],function(_a4e,lang,_a4f,_a50,xhr,_a51,_a52,_a53,_a54){
var _a55=_a4f("dojo.data.ItemFileReadStore",[_a51],{constructor:function(_a56){
this._arrayOfAllItems=[];
this._arrayOfTopLevelItems=[];
this._loadFinished=false;
this._jsonFileUrl=_a56.url;
this._ccUrl=_a56.url;
this.url=_a56.url;
this._jsonData=_a56.data;
this.data=null;
this._datatypeMap=_a56.typeMap||{};
if(!this._datatypeMap["Date"]){
this._datatypeMap["Date"]={type:Date,deserialize:function(_a57){
return _a54.fromISOString(_a57);
}};
}
this._features={"dojo.data.api.Read":true,"dojo.data.api.Identity":true};
this._itemsByIdentity=null;
this._storeRefPropName="_S";
this._itemNumPropName="_0";
this._rootItemPropName="_RI";
this._reverseRefMap="_RRM";
this._loadInProgress=false;
this._queuedFetches=[];
if(_a56.urlPreventCache!==undefined){
this.urlPreventCache=_a56.urlPreventCache?true:false;
}
if(_a56.hierarchical!==undefined){
this.hierarchical=_a56.hierarchical?true:false;
}
if(_a56.clearOnClose){
this.clearOnClose=true;
}
if("failOk" in _a56){
this.failOk=_a56.failOk?true:false;
}
},url:"",_ccUrl:"",data:null,typeMap:null,clearOnClose:false,urlPreventCache:false,failOk:false,hierarchical:true,_assertIsItem:function(item){
if(!this.isItem(item)){
throw new Error(this.declaredClass+": Invalid item argument.");
}
},_assertIsAttribute:function(_a58){
if(typeof _a58!=="string"){
throw new Error(this.declaredClass+": Invalid attribute argument.");
}
},getValue:function(item,_a59,_a5a){
var _a5b=this.getValues(item,_a59);
return (_a5b.length>0)?_a5b[0]:_a5a;
},getValues:function(item,_a5c){
this._assertIsItem(item);
this._assertIsAttribute(_a5c);
return (item[_a5c]||[]).slice(0);
},getAttributes:function(item){
this._assertIsItem(item);
var _a5d=[];
for(var key in item){
if((key!==this._storeRefPropName)&&(key!==this._itemNumPropName)&&(key!==this._rootItemPropName)&&(key!==this._reverseRefMap)){
_a5d.push(key);
}
}
return _a5d;
},hasAttribute:function(item,_a5e){
this._assertIsItem(item);
this._assertIsAttribute(_a5e);
return (_a5e in item);
},containsValue:function(item,_a5f,_a60){
var _a61=undefined;
if(typeof _a60==="string"){
_a61=_a52.patternToRegExp(_a60,false);
}
return this._containsValue(item,_a5f,_a60,_a61);
},_containsValue:function(item,_a62,_a63,_a64){
return _a50.some(this.getValues(item,_a62),function(_a65){
if(_a65!==null&&!lang.isObject(_a65)&&_a64){
if(_a65.toString().match(_a64)){
return true;
}
}else{
if(_a63===_a65){
return true;
}
}
});
},isItem:function(_a66){
if(_a66&&_a66[this._storeRefPropName]===this){
if(this._arrayOfAllItems[_a66[this._itemNumPropName]]===_a66){
return true;
}
}
return false;
},isItemLoaded:function(_a67){
return this.isItem(_a67);
},loadItem:function(_a68){
this._assertIsItem(_a68.item);
},getFeatures:function(){
return this._features;
},getLabel:function(item){
if(this._labelAttr&&this.isItem(item)){
return this.getValue(item,this._labelAttr);
}
return undefined;
},getLabelAttributes:function(item){
if(this._labelAttr){
return [this._labelAttr];
}
return null;
},filter:function(_a69,_a6a,_a6b){
var _a6c=[],i,key;
if(_a69.query){
var _a6d,_a6e=_a69.queryOptions?_a69.queryOptions.ignoreCase:false;
var _a6f={};
for(key in _a69.query){
_a6d=_a69.query[key];
if(typeof _a6d==="string"){
_a6f[key]=_a52.patternToRegExp(_a6d,_a6e);
}else{
if(_a6d instanceof RegExp){
_a6f[key]=_a6d;
}
}
}
for(i=0;i<_a6a.length;++i){
var _a70=true;
var _a71=_a6a[i];
if(_a71===null){
_a70=false;
}else{
for(key in _a69.query){
_a6d=_a69.query[key];
if(!this._containsValue(_a71,key,_a6d,_a6f[key])){
_a70=false;
}
}
}
if(_a70){
_a6c.push(_a71);
}
}
_a6b(_a6c,_a69);
}else{
for(i=0;i<_a6a.length;++i){
var item=_a6a[i];
if(item!==null){
_a6c.push(item);
}
}
_a6b(_a6c,_a69);
}
},_fetchItems:function(_a72,_a73,_a74){
var self=this;
if(this._loadFinished){
this.filter(_a72,this._getItemsArray(_a72.queryOptions),_a73);
}else{
if(this._jsonFileUrl!==this._ccUrl){
_a4e.deprecated(this.declaredClass+": ","To change the url, set the url property of the store,"+" not _jsonFileUrl.  _jsonFileUrl support will be removed in 2.0");
this._ccUrl=this._jsonFileUrl;
this.url=this._jsonFileUrl;
}else{
if(this.url!==this._ccUrl){
this._jsonFileUrl=this.url;
this._ccUrl=this.url;
}
}
if(this.data!=null){
this._jsonData=this.data;
this.data=null;
}
if(this._jsonFileUrl){
if(this._loadInProgress){
this._queuedFetches.push({args:_a72,filter:lang.hitch(self,"filter"),findCallback:lang.hitch(self,_a73)});
}else{
this._loadInProgress=true;
var _a75={url:self._jsonFileUrl,handleAs:"json-comment-optional",preventCache:this.urlPreventCache,failOk:this.failOk};
var _a76=xhr.get(_a75);
_a76.addCallback(function(data){
try{
self._getItemsFromLoadedData(data);
self._loadFinished=true;
self._loadInProgress=false;
self.filter(_a72,self._getItemsArray(_a72.queryOptions),_a73);
self._handleQueuedFetches();
}
catch(e){
self._loadFinished=true;
self._loadInProgress=false;
_a74(e,_a72);
}
});
_a76.addErrback(function(_a77){
self._loadInProgress=false;
_a74(_a77,_a72);
});
var _a78=null;
if(_a72.abort){
_a78=_a72.abort;
}
_a72.abort=function(){
var df=_a76;
if(df&&df.fired===-1){
df.cancel();
df=null;
}
if(_a78){
_a78.call(_a72);
}
};
}
}else{
if(this._jsonData){
try{
this._loadFinished=true;
this._getItemsFromLoadedData(this._jsonData);
this._jsonData=null;
self.filter(_a72,this._getItemsArray(_a72.queryOptions),_a73);
}
catch(e){
_a74(e,_a72);
}
}else{
_a74(new Error(this.declaredClass+": No JSON source data was provided as either URL or a nested Javascript object."),_a72);
}
}
}
},_handleQueuedFetches:function(){
if(this._queuedFetches.length>0){
for(var i=0;i<this._queuedFetches.length;i++){
var _a79=this._queuedFetches[i],_a7a=_a79.args,_a7b=_a79.filter,_a7c=_a79.findCallback;
if(_a7b){
_a7b(_a7a,this._getItemsArray(_a7a.queryOptions),_a7c);
}else{
this.fetchItemByIdentity(_a7a);
}
}
this._queuedFetches=[];
}
},_getItemsArray:function(_a7d){
if(_a7d&&_a7d.deep){
return this._arrayOfAllItems;
}
return this._arrayOfTopLevelItems;
},close:function(_a7e){
if(this.clearOnClose&&this._loadFinished&&!this._loadInProgress){
if(((this._jsonFileUrl==""||this._jsonFileUrl==null)&&(this.url==""||this.url==null))&&this.data==null){
}
this._arrayOfAllItems=[];
this._arrayOfTopLevelItems=[];
this._loadFinished=false;
this._itemsByIdentity=null;
this._loadInProgress=false;
this._queuedFetches=[];
}
},_getItemsFromLoadedData:function(_a7f){
var _a80=false,self=this;
function _a81(_a82){
return (_a82!==null)&&(typeof _a82==="object")&&(!lang.isArray(_a82)||_a80)&&(!lang.isFunction(_a82))&&(_a82.constructor==Object||lang.isArray(_a82))&&(typeof _a82._reference==="undefined")&&(typeof _a82._type==="undefined")&&(typeof _a82._value==="undefined")&&self.hierarchical;
};
function _a83(_a84){
self._arrayOfAllItems.push(_a84);
for(var _a85 in _a84){
var _a86=_a84[_a85];
if(_a86){
if(lang.isArray(_a86)){
var _a87=_a86;
for(var k=0;k<_a87.length;++k){
var _a88=_a87[k];
if(_a81(_a88)){
_a83(_a88);
}
}
}else{
if(_a81(_a86)){
_a83(_a86);
}
}
}
}
};
this._labelAttr=_a7f.label;
var i,item;
this._arrayOfAllItems=[];
this._arrayOfTopLevelItems=_a7f.items;
for(i=0;i<this._arrayOfTopLevelItems.length;++i){
item=this._arrayOfTopLevelItems[i];
if(lang.isArray(item)){
_a80=true;
}
_a83(item);
item[this._rootItemPropName]=true;
}
var _a89={},key;
for(i=0;i<this._arrayOfAllItems.length;++i){
item=this._arrayOfAllItems[i];
for(key in item){
if(key!==this._rootItemPropName){
var _a8a=item[key];
if(_a8a!==null){
if(!lang.isArray(_a8a)){
item[key]=[_a8a];
}
}else{
item[key]=[null];
}
}
_a89[key]=key;
}
}
while(_a89[this._storeRefPropName]){
this._storeRefPropName+="_";
}
while(_a89[this._itemNumPropName]){
this._itemNumPropName+="_";
}
while(_a89[this._reverseRefMap]){
this._reverseRefMap+="_";
}
var _a8b;
var _a8c=_a7f.identifier;
if(_a8c){
this._itemsByIdentity={};
this._features["dojo.data.api.Identity"]=_a8c;
for(i=0;i<this._arrayOfAllItems.length;++i){
item=this._arrayOfAllItems[i];
_a8b=item[_a8c];
var _a8d=_a8b[0];
if(!Object.hasOwnProperty.call(this._itemsByIdentity,_a8d)){
this._itemsByIdentity[_a8d]=item;
}else{
if(this._jsonFileUrl){
throw new Error(this.declaredClass+":  The json data as specified by: ["+this._jsonFileUrl+"] is malformed.  Items within the list have identifier: ["+_a8c+"].  Value collided: ["+_a8d+"]");
}else{
if(this._jsonData){
throw new Error(this.declaredClass+":  The json data provided by the creation arguments is malformed.  Items within the list have identifier: ["+_a8c+"].  Value collided: ["+_a8d+"]");
}
}
}
}
}else{
this._features["dojo.data.api.Identity"]=Number;
}
for(i=0;i<this._arrayOfAllItems.length;++i){
item=this._arrayOfAllItems[i];
item[this._storeRefPropName]=this;
item[this._itemNumPropName]=i;
}
for(i=0;i<this._arrayOfAllItems.length;++i){
item=this._arrayOfAllItems[i];
for(key in item){
_a8b=item[key];
for(var j=0;j<_a8b.length;++j){
_a8a=_a8b[j];
if(_a8a!==null&&typeof _a8a=="object"){
if(("_type" in _a8a)&&("_value" in _a8a)){
var type=_a8a._type;
var _a8e=this._datatypeMap[type];
if(!_a8e){
throw new Error("dojo.data.ItemFileReadStore: in the typeMap constructor arg, no object class was specified for the datatype '"+type+"'");
}else{
if(lang.isFunction(_a8e)){
_a8b[j]=new _a8e(_a8a._value);
}else{
if(lang.isFunction(_a8e.deserialize)){
_a8b[j]=_a8e.deserialize(_a8a._value);
}else{
throw new Error("dojo.data.ItemFileReadStore: Value provided in typeMap was neither a constructor, nor a an object with a deserialize function");
}
}
}
}
if(_a8a._reference){
var _a8f=_a8a._reference;
if(!lang.isObject(_a8f)){
_a8b[j]=this._getItemByIdentity(_a8f);
}else{
for(var k=0;k<this._arrayOfAllItems.length;++k){
var _a90=this._arrayOfAllItems[k],_a91=true;
for(var _a92 in _a8f){
if(_a90[_a92]!=_a8f[_a92]){
_a91=false;
}
}
if(_a91){
_a8b[j]=_a90;
}
}
}
if(this.referenceIntegrity){
var _a93=_a8b[j];
if(this.isItem(_a93)){
this._addReferenceToMap(_a93,item,key);
}
}
}else{
if(this.isItem(_a8a)){
if(this.referenceIntegrity){
this._addReferenceToMap(_a8a,item,key);
}
}
}
}
}
}
}
},_addReferenceToMap:function(_a94,_a95,_a96){
},getIdentity:function(item){
var _a97=this._features["dojo.data.api.Identity"];
if(_a97===Number){
return item[this._itemNumPropName];
}else{
var _a98=item[_a97];
if(_a98){
return _a98[0];
}
}
return null;
},fetchItemByIdentity:function(_a99){
var item,_a9a;
if(!this._loadFinished){
var self=this;
if(this._jsonFileUrl!==this._ccUrl){
_a4e.deprecated(this.declaredClass+": ","To change the url, set the url property of the store,"+" not _jsonFileUrl.  _jsonFileUrl support will be removed in 2.0");
this._ccUrl=this._jsonFileUrl;
this.url=this._jsonFileUrl;
}else{
if(this.url!==this._ccUrl){
this._jsonFileUrl=this.url;
this._ccUrl=this.url;
}
}
if(this.data!=null&&this._jsonData==null){
this._jsonData=this.data;
this.data=null;
}
if(this._jsonFileUrl){
if(this._loadInProgress){
this._queuedFetches.push({args:_a99});
}else{
this._loadInProgress=true;
var _a9b={url:self._jsonFileUrl,handleAs:"json-comment-optional",preventCache:this.urlPreventCache,failOk:this.failOk};
var _a9c=xhr.get(_a9b);
_a9c.addCallback(function(data){
var _a9d=_a99.scope?_a99.scope:_a4e.global;
try{
self._getItemsFromLoadedData(data);
self._loadFinished=true;
self._loadInProgress=false;
item=self._getItemByIdentity(_a99.identity);
if(_a99.onItem){
_a99.onItem.call(_a9d,item);
}
self._handleQueuedFetches();
}
catch(error){
self._loadInProgress=false;
if(_a99.onError){
_a99.onError.call(_a9d,error);
}
}
});
_a9c.addErrback(function(_a9e){
self._loadInProgress=false;
if(_a99.onError){
var _a9f=_a99.scope?_a99.scope:_a4e.global;
_a99.onError.call(_a9f,_a9e);
}
});
}
}else{
if(this._jsonData){
self._getItemsFromLoadedData(self._jsonData);
self._jsonData=null;
self._loadFinished=true;
item=self._getItemByIdentity(_a99.identity);
if(_a99.onItem){
_a9a=_a99.scope?_a99.scope:_a4e.global;
_a99.onItem.call(_a9a,item);
}
}
}
}else{
item=this._getItemByIdentity(_a99.identity);
if(_a99.onItem){
_a9a=_a99.scope?_a99.scope:_a4e.global;
_a99.onItem.call(_a9a,item);
}
}
},_getItemByIdentity:function(_aa0){
var item=null;
if(this._itemsByIdentity){
if(Object.hasOwnProperty.call(this._itemsByIdentity,_aa0)){
item=this._itemsByIdentity[_aa0];
}
}else{
if(Object.hasOwnProperty.call(this._arrayOfAllItems,_aa0)){
item=this._arrayOfAllItems[_aa0];
}
}
if(item===undefined){
item=null;
}
return item;
},getIdentityAttributes:function(item){
var _aa1=this._features["dojo.data.api.Identity"];
if(_aa1===Number){
return null;
}else{
return [_aa1];
}
},_forceLoad:function(){
var self=this;
if(this._jsonFileUrl!==this._ccUrl){
_a4e.deprecated(this.declaredClass+": ","To change the url, set the url property of the store,"+" not _jsonFileUrl.  _jsonFileUrl support will be removed in 2.0");
this._ccUrl=this._jsonFileUrl;
this.url=this._jsonFileUrl;
}else{
if(this.url!==this._ccUrl){
this._jsonFileUrl=this.url;
this._ccUrl=this.url;
}
}
if(this.data!=null){
this._jsonData=this.data;
this.data=null;
}
if(this._jsonFileUrl){
var _aa2={url:this._jsonFileUrl,handleAs:"json-comment-optional",preventCache:this.urlPreventCache,failOk:this.failOk,sync:true};
var _aa3=xhr.get(_aa2);
_aa3.addCallback(function(data){
try{
if(self._loadInProgress!==true&&!self._loadFinished){
self._getItemsFromLoadedData(data);
self._loadFinished=true;
}else{
if(self._loadInProgress){
throw new Error(this.declaredClass+":  Unable to perform a synchronous load, an async load is in progress.");
}
}
}
catch(e){
throw e;
}
});
_aa3.addErrback(function(_aa4){
throw _aa4;
});
}else{
if(this._jsonData){
self._getItemsFromLoadedData(self._jsonData);
self._jsonData=null;
self._loadFinished=true;
}
}
}});
lang.extend(_a55,_a53);
return _a55;
});
},"dojo/html":function(){
define(["./_base/kernel","./_base/lang","./_base/array","./_base/declare","./dom","./dom-construct","./parser"],function(_aa5,lang,_aa6,_aa7,dom,_aa8,_aa9){
var _aaa=0;
var html={_secureForInnerHtml:function(cont){
return cont.replace(/(?:\s*<!DOCTYPE\s[^>]+>|<title[^>]*>[\s\S]*?<\/title>)/ig,"");
},_emptyNode:_aa8.empty,_setNodeContent:function(node,cont){
_aa8.empty(node);
if(cont){
if(typeof cont=="string"){
cont=_aa8.toDom(cont,node.ownerDocument);
}
if(!cont.nodeType&&lang.isArrayLike(cont)){
for(var _aab=cont.length,i=0;i<cont.length;i=_aab==cont.length?i+1:0){
_aa8.place(cont[i],node,"last");
}
}else{
_aa8.place(cont,node,"last");
}
}
return node;
},_ContentSetter:_aa7("dojo.html._ContentSetter",null,{node:"",content:"",id:"",cleanContent:false,extractContent:false,parseContent:false,parserScope:_aa5._scopeName,startup:true,constructor:function(_aac,node){
lang.mixin(this,_aac||{});
node=this.node=dom.byId(this.node||node);
if(!this.id){
this.id=["Setter",(node)?node.id||node.tagName:"",_aaa++].join("_");
}
},set:function(cont,_aad){
if(undefined!==cont){
this.content=cont;
}
if(_aad){
this._mixin(_aad);
}
this.onBegin();
this.setContent();
var ret=this.onEnd();
if(ret&&ret.then){
return ret;
}else{
return this.node;
}
},setContent:function(){
var node=this.node;
if(!node){
throw new Error(this.declaredClass+": setContent given no node");
}
try{
node=html._setNodeContent(node,this.content);
}
catch(e){
var _aae=this.onContentError(e);
try{
node.innerHTML=_aae;
}
catch(e){
console.error("Fatal "+this.declaredClass+".setContent could not change content due to "+e.message,e);
}
}
this.node=node;
},empty:function(){
if(this.parseDeferred){
if(!this.parseDeferred.isResolved()){
this.parseDeferred.cancel();
}
delete this.parseDeferred;
}
if(this.parseResults&&this.parseResults.length){
_aa6.forEach(this.parseResults,function(w){
if(w.destroy){
w.destroy();
}
});
delete this.parseResults;
}
_aa8.empty(this.node);
},onBegin:function(){
var cont=this.content;
if(lang.isString(cont)){
if(this.cleanContent){
cont=html._secureForInnerHtml(cont);
}
if(this.extractContent){
var _aaf=cont.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
if(_aaf){
cont=_aaf[1];
}
}
}
this.empty();
this.content=cont;
return this.node;
},onEnd:function(){
if(this.parseContent){
this._parse();
}
return this.node;
},tearDown:function(){
delete this.parseResults;
delete this.parseDeferred;
delete this.node;
delete this.content;
},onContentError:function(err){
return "Error occurred setting content: "+err;
},onExecError:function(err){
return "Error occurred executing scripts: "+err;
},_mixin:function(_ab0){
var _ab1={},key;
for(key in _ab0){
if(key in _ab1){
continue;
}
this[key]=_ab0[key];
}
},_parse:function(){
var _ab2=this.node;
try{
var _ab3={};
_aa6.forEach(["dir","lang","textDir"],function(name){
if(this[name]){
_ab3[name]=this[name];
}
},this);
var self=this;
this.parseDeferred=_aa9.parse({rootNode:_ab2,noStart:!this.startup,inherited:_ab3,scope:this.parserScope}).then(function(_ab4){
return self.parseResults=_ab4;
},function(e){
self._onError("Content",e,"Error parsing in _ContentSetter#"+this.id);
});
}
catch(e){
this._onError("Content",e,"Error parsing in _ContentSetter#"+this.id);
}
},_onError:function(type,err,_ab5){
var _ab6=this["on"+type+"Error"].call(this,err);
if(_ab5){
console.error(_ab5,err);
}else{
if(_ab6){
html._setNodeContent(this.node,_ab6,true);
}
}
}}),set:function(node,cont,_ab7){
if(undefined==cont){
console.warn("dojo.html.set: no cont argument provided, using empty string");
cont="";
}
if(!_ab7){
return html._setNodeContent(node,cont,true);
}else{
var op=new html._ContentSetter(lang.mixin(_ab7,{content:cont,node:node}));
return op.set();
}
}};
lang.setObject("dojo.html",html);
return html;
});
},"dijit/_PaletteMixin":function(){
define(["dojo/_base/declare","dojo/dom-attr","dojo/dom-class","dojo/dom-construct","dojo/keys","dojo/_base/lang","dojo/on","./_CssStateMixin","./a11yclick","./focus","./typematic"],function(_ab8,_ab9,_aba,_abb,keys,lang,on,_abc,_abd,_abe,_abf){
var _ac0=_ab8("dijit._PaletteMixin",_abc,{defaultTimeout:500,timeoutChangeRate:0.9,value:"",_selectedCell:-1,tabIndex:"0",cellClass:"dijitPaletteCell",dyeClass:null,_dyeFactory:function(_ac1){
var _ac2=typeof this.dyeClass=="string"?lang.getObject(this.dyeClass):this.dyeClass;
return new _ac2(_ac1);
},_preparePalette:function(_ac3,_ac4){
this._cells=[];
var url=this._blankGif;
this.own(on(this.gridNode,_abd,lang.hitch(this,"_onCellClick")));
for(var row=0;row<_ac3.length;row++){
var _ac5=_abb.create("tr",{tabIndex:"-1",role:"row"},this.gridNode);
for(var col=0;col<_ac3[row].length;col++){
var _ac6=_ac3[row][col];
if(_ac6){
var _ac7=this._dyeFactory(_ac6,row,col,_ac4[_ac6]);
var _ac8=_abb.create("td",{"class":this.cellClass,tabIndex:"-1",title:_ac4[_ac6],role:"gridcell"},_ac5);
_ac7.fillCell(_ac8,url);
_ac8.idx=this._cells.length;
this._cells.push({node:_ac8,dye:_ac7});
}
}
}
this._xDim=_ac3[0].length;
this._yDim=_ac3.length;
var _ac9={UP_ARROW:-this._xDim,DOWN_ARROW:this._xDim,RIGHT_ARROW:this.isLeftToRight()?1:-1,LEFT_ARROW:this.isLeftToRight()?-1:1};
for(var key in _ac9){
this.own(_abf.addKeyListener(this.domNode,{keyCode:keys[key],ctrlKey:false,altKey:false,shiftKey:false},this,function(){
var _aca=_ac9[key];
return function(_acb){
this._navigateByKey(_aca,_acb);
};
}(),this.timeoutChangeRate,this.defaultTimeout));
}
},postCreate:function(){
this.inherited(arguments);
this._setCurrent(this._cells[0].node);
},focus:function(){
_abe.focus(this._currentFocus);
},_onCellClick:function(evt){
var _acc=evt.target;
while(_acc.tagName!="TD"){
if(!_acc.parentNode||_acc==this.gridNode){
return;
}
_acc=_acc.parentNode;
}
var _acd=this._getDye(_acc).getValue();
this._setCurrent(_acc);
_abe.focus(_acc);
this._setValueAttr(_acd,true);
evt.stopPropagation();
evt.preventDefault();
},_setCurrent:function(node){
if("_currentFocus" in this){
_ab9.set(this._currentFocus,"tabIndex","-1");
}
this._currentFocus=node;
if(node){
_ab9.set(node,"tabIndex",this.tabIndex);
}
},_setValueAttr:function(_ace,_acf){
if(this._selectedCell>=0){
_aba.remove(this._cells[this._selectedCell].node,this.cellClass+"Selected");
}
this._selectedCell=-1;
if(_ace){
for(var i=0;i<this._cells.length;i++){
if(_ace==this._cells[i].dye.getValue()){
this._selectedCell=i;
_aba.add(this._cells[i].node,this.cellClass+"Selected");
break;
}
}
}
this._set("value",this._selectedCell>=0?_ace:null);
if(_acf||_acf===undefined){
this.onChange(_ace);
}
},onChange:function(){
},_navigateByKey:function(_ad0,_ad1){
if(_ad1==-1){
return;
}
var _ad2=this._currentFocus.idx+_ad0;
if(_ad2<this._cells.length&&_ad2>-1){
var _ad3=this._cells[_ad2].node;
this._setCurrent(_ad3);
this.defer(lang.hitch(_abe,"focus",_ad3));
}
},_getDye:function(cell){
return this._cells[cell.idx].dye;
}});
return _ac0;
});
},"dijit/form/ValidationTextBox":function(){
define(["dojo/_base/declare","dojo/_base/kernel","dojo/i18n","./TextBox","../Tooltip","dojo/text!./templates/ValidationTextBox.html","dojo/i18n!./nls/validate"],function(_ad4,_ad5,i18n,_ad6,_ad7,_ad8){
var _ad9;
return _ad9=_ad4("dijit.form.ValidationTextBox",_ad6,{templateString:_ad8,required:false,promptMessage:"",invalidMessage:"$_unset_$",missingMessage:"$_unset_$",message:"",constraints:{},pattern:".*",regExp:"",regExpGen:function(){
},state:"",tooltipPosition:[],_deprecateRegExp:function(attr,_ada){
if(_ada!=_ad9.prototype[attr]){
_ad5.deprecated("ValidationTextBox id="+this.id+", set('"+attr+"', ...) is deprecated.  Use set('pattern', ...) instead.","","2.0");
this.set("pattern",_ada);
}
},_setRegExpGenAttr:function(_adb){
this._deprecateRegExp("regExpGen",_adb);
this._set("regExpGen",this._computeRegexp);
},_setRegExpAttr:function(_adc){
this._deprecateRegExp("regExp",_adc);
},_setValueAttr:function(){
this.inherited(arguments);
this._refreshState();
},validator:function(_add,_ade){
return (new RegExp("^(?:"+this._computeRegexp(_ade)+")"+(this.required?"":"?")+"$")).test(_add)&&(!this.required||!this._isEmpty(_add))&&(this._isEmpty(_add)||this.parse(_add,_ade)!==undefined);
},_isValidSubset:function(){
return this.textbox.value.search(this._partialre)==0;
},isValid:function(){
return this.validator(this.textbox.value,this.get("constraints"));
},_isEmpty:function(_adf){
return (this.trim?/^\s*$/:/^$/).test(_adf);
},getErrorMessage:function(){
var _ae0=this.invalidMessage=="$_unset_$"?this.messages.invalidMessage:!this.invalidMessage?this.promptMessage:this.invalidMessage;
var _ae1=this.missingMessage=="$_unset_$"?this.messages.missingMessage:!this.missingMessage?_ae0:this.missingMessage;
return (this.required&&this._isEmpty(this.textbox.value))?_ae1:_ae0;
},getPromptMessage:function(){
return this.promptMessage;
},_maskValidSubsetError:true,validate:function(_ae2){
var _ae3="";
var _ae4=this.disabled||this.isValid(_ae2);
if(_ae4){
this._maskValidSubsetError=true;
}
var _ae5=this._isEmpty(this.textbox.value);
var _ae6=!_ae4&&_ae2&&this._isValidSubset();
this._set("state",_ae4?"":(((((!this._hasBeenBlurred||_ae2)&&_ae5)||_ae6)&&(this._maskValidSubsetError||(_ae6&&!this._hasBeenBlurred&&_ae2)))?"Incomplete":"Error"));
this.focusNode.setAttribute("aria-invalid",_ae4?"false":"true");
if(this.state=="Error"){
this._maskValidSubsetError=_ae2&&_ae6;
_ae3=this.getErrorMessage(_ae2);
}else{
if(this.state=="Incomplete"){
_ae3=this.getPromptMessage(_ae2);
this._maskValidSubsetError=!this._hasBeenBlurred||_ae2;
}else{
if(_ae5){
_ae3=this.getPromptMessage(_ae2);
}
}
}
this.set("message",_ae3);
return _ae4;
},displayMessage:function(_ae7){
if(_ae7&&this.focused){
_ad7.show(_ae7,this.domNode,this.tooltipPosition,!this.isLeftToRight());
}else{
_ad7.hide(this.domNode);
}
},_refreshState:function(){
if(this._created){
this.validate(this.focused);
}
this.inherited(arguments);
},constructor:function(_ae8){
this.constraints={};
this.baseClass+=" dijitValidationTextBox";
},startup:function(){
this.inherited(arguments);
this._refreshState();
},_setConstraintsAttr:function(_ae9){
if(!_ae9.locale&&this.lang){
_ae9.locale=this.lang;
}
this._set("constraints",_ae9);
this._refreshState();
},_setPatternAttr:function(_aea){
this._set("pattern",_aea);
this._refreshState();
},_computeRegexp:function(_aeb){
var p=this.pattern;
if(typeof p=="function"){
p=p.call(this,_aeb);
}
if(p!=this._lastRegExp){
var _aec="";
this._lastRegExp=p;
if(p!=".*"){
p.replace(/\\.|\[\]|\[.*?[^\\]{1}\]|\{.*?\}|\(\?[=:!]|./g,function(re){
switch(re.charAt(0)){
case "{":
case "+":
case "?":
case "*":
case "^":
case "$":
case "|":
case "(":
_aec+=re;
break;
case ")":
_aec+="|$)";
break;
default:
_aec+="(?:"+re+"|$)";
break;
}
});
}
try{
"".search(_aec);
}
catch(e){
_aec=this.pattern;
console.warn("RegExp error in "+this.declaredClass+": "+this.pattern);
}
this._partialre="^(?:"+_aec+")$";
}
return p;
},postMixInProperties:function(){
this.inherited(arguments);
this.messages=i18n.getLocalization("dijit.form","validate",this.lang);
this._setConstraintsAttr(this.constraints);
},_setDisabledAttr:function(_aed){
this.inherited(arguments);
this._refreshState();
},_setRequiredAttr:function(_aee){
this._set("required",_aee);
this.focusNode.setAttribute("aria-required",_aee);
this._refreshState();
},_setMessageAttr:function(_aef){
this._set("message",_aef);
this.displayMessage(_aef);
},reset:function(){
this._maskValidSubsetError=true;
this.inherited(arguments);
},_onBlur:function(){
this.displayMessage("");
this.inherited(arguments);
}});
});
},"dijit/selection":function(){
define(["dojo/_base/array","dojo/dom","dojo/_base/lang","dojo/sniff","dojo/_base/window","dijit/focus"],function(_af0,dom,lang,has,_af1,_af2){
var _af3=function(win){
var doc=win.document;
this.getType=function(){
if(doc.getSelection){
var _af4="text";
var oSel;
try{
oSel=win.getSelection();
}
catch(e){
}
if(oSel&&oSel.rangeCount==1){
var _af5=oSel.getRangeAt(0);
if((_af5.startContainer==_af5.endContainer)&&((_af5.endOffset-_af5.startOffset)==1)&&(_af5.startContainer.nodeType!=3)){
_af4="control";
}
}
return _af4;
}else{
return doc.selection.type.toLowerCase();
}
};
this.getSelectedText=function(){
if(doc.getSelection){
var _af6=win.getSelection();
return _af6?_af6.toString():"";
}else{
if(this.getType()=="control"){
return null;
}
return doc.selection.createRange().text;
}
};
this.getSelectedHtml=function(){
if(doc.getSelection){
var _af7=win.getSelection();
if(_af7&&_af7.rangeCount){
var i;
var html="";
for(i=0;i<_af7.rangeCount;i++){
var frag=_af7.getRangeAt(i).cloneContents();
var div=doc.createElement("div");
div.appendChild(frag);
html+=div.innerHTML;
}
return html;
}
return null;
}else{
if(this.getType()=="control"){
return null;
}
return doc.selection.createRange().htmlText;
}
};
this.getSelectedElement=function(){
if(this.getType()=="control"){
if(doc.getSelection){
var _af8=win.getSelection();
return _af8.anchorNode.childNodes[_af8.anchorOffset];
}else{
var _af9=doc.selection.createRange();
if(_af9&&_af9.item){
return doc.selection.createRange().item(0);
}
}
}
return null;
};
this.getParentElement=function(){
if(this.getType()=="control"){
var p=this.getSelectedElement();
if(p){
return p.parentNode;
}
}else{
if(doc.getSelection){
var _afa=doc.getSelection();
if(_afa){
var node=_afa.anchorNode;
while(node&&(node.nodeType!=1)){
node=node.parentNode;
}
return node;
}
}else{
var r=doc.selection.createRange();
r.collapse(true);
return r.parentElement();
}
}
return null;
};
this.hasAncestorElement=function(_afb){
return this.getAncestorElement.apply(this,arguments)!=null;
};
this.getAncestorElement=function(_afc){
var node=this.getSelectedElement()||this.getParentElement();
return this.getParentOfType(node,arguments);
};
this.isTag=function(node,tags){
if(node&&node.tagName){
var _afd=node.tagName.toLowerCase();
for(var i=0;i<tags.length;i++){
var _afe=String(tags[i]).toLowerCase();
if(_afd==_afe){
return _afe;
}
}
}
return "";
};
this.getParentOfType=function(node,tags){
while(node){
if(this.isTag(node,tags).length){
return node;
}
node=node.parentNode;
}
return null;
};
this.collapse=function(_aff){
if(doc.getSelection){
var _b00=win.getSelection();
if(_b00.removeAllRanges){
if(_aff){
_b00.collapseToStart();
}else{
_b00.collapseToEnd();
}
}else{
_b00.collapse(_aff);
}
}else{
var _b01=doc.selection.createRange();
_b01.collapse(_aff);
_b01.select();
}
};
this.remove=function(){
var sel=doc.selection;
if(doc.getSelection){
sel=win.getSelection();
sel.deleteFromDocument();
return sel;
}else{
if(sel.type.toLowerCase()!="none"){
sel.clear();
}
return sel;
}
};
this.selectElementChildren=function(_b02,_b03){
var _b04;
_b02=dom.byId(_b02);
if(doc.getSelection){
var _b05=win.getSelection();
if(has("opera")){
if(_b05.rangeCount){
_b04=_b05.getRangeAt(0);
}else{
_b04=doc.createRange();
}
_b04.setStart(_b02,0);
_b04.setEnd(_b02,(_b02.nodeType==3)?_b02.length:_b02.childNodes.length);
_b05.addRange(_b04);
}else{
_b05.selectAllChildren(_b02);
}
}else{
_b04=_b02.ownerDocument.body.createTextRange();
_b04.moveToElementText(_b02);
if(!_b03){
try{
_b04.select();
}
catch(e){
}
}
}
};
this.selectElement=function(_b06,_b07){
var _b08;
_b06=dom.byId(_b06);
if(doc.getSelection){
var _b09=doc.getSelection();
_b08=doc.createRange();
if(_b09.removeAllRanges){
if(has("opera")){
if(_b09.getRangeAt(0)){
_b08=_b09.getRangeAt(0);
}
}
_b08.selectNode(_b06);
_b09.removeAllRanges();
_b09.addRange(_b08);
}
}else{
try{
var tg=_b06.tagName?_b06.tagName.toLowerCase():"";
if(tg==="img"||tg==="table"){
_b08=_af1.body(doc).createControlRange();
}else{
_b08=_af1.body(doc).createRange();
}
_b08.addElement(_b06);
if(!_b07){
_b08.select();
}
}
catch(e){
this.selectElementChildren(_b06,_b07);
}
}
};
this.inSelection=function(node){
if(node){
var _b0a;
var _b0b;
if(doc.getSelection){
var sel=win.getSelection();
if(sel&&sel.rangeCount>0){
_b0b=sel.getRangeAt(0);
}
if(_b0b&&_b0b.compareBoundaryPoints&&doc.createRange){
try{
_b0a=doc.createRange();
_b0a.setStart(node,0);
if(_b0b.compareBoundaryPoints(_b0b.START_TO_END,_b0a)===1){
return true;
}
}
catch(e){
}
}
}else{
_b0b=doc.selection.createRange();
try{
_b0a=node.ownerDocument.body.createTextRange();
_b0a.moveToElementText(node);
}
catch(e2){
}
if(_b0b&&_b0a){
if(_b0b.compareEndPoints("EndToStart",_b0a)===1){
return true;
}
}
}
}
return false;
},this.getBookmark=function(){
var bm,rg,tg,sel=doc.selection,cf=_af2.curNode;
if(doc.getSelection){
sel=win.getSelection();
if(sel){
if(sel.isCollapsed){
tg=cf?cf.tagName:"";
if(tg){
tg=tg.toLowerCase();
if(tg=="textarea"||(tg=="input"&&(!cf.type||cf.type.toLowerCase()=="text"))){
sel={start:cf.selectionStart,end:cf.selectionEnd,node:cf,pRange:true};
return {isCollapsed:(sel.end<=sel.start),mark:sel};
}
}
bm={isCollapsed:true};
if(sel.rangeCount){
bm.mark=sel.getRangeAt(0).cloneRange();
}
}else{
rg=sel.getRangeAt(0);
bm={isCollapsed:false,mark:rg.cloneRange()};
}
}
}else{
if(sel){
tg=cf?cf.tagName:"";
tg=tg.toLowerCase();
if(cf&&tg&&(tg=="button"||tg=="textarea"||tg=="input")){
if(sel.type&&sel.type.toLowerCase()=="none"){
return {isCollapsed:true,mark:null};
}else{
rg=sel.createRange();
return {isCollapsed:rg.text&&rg.text.length?false:true,mark:{range:rg,pRange:true}};
}
}
bm={};
try{
rg=sel.createRange();
bm.isCollapsed=!(sel.type=="Text"?rg.htmlText.length:rg.length);
}
catch(e){
bm.isCollapsed=true;
return bm;
}
if(sel.type.toUpperCase()=="CONTROL"){
if(rg.length){
bm.mark=[];
var i=0,len=rg.length;
while(i<len){
bm.mark.push(rg.item(i++));
}
}else{
bm.isCollapsed=true;
bm.mark=null;
}
}else{
bm.mark=rg.getBookmark();
}
}else{
console.warn("No idea how to store the current selection for this browser!");
}
}
return bm;
};
this.moveToBookmark=function(_b0c){
var mark=_b0c.mark;
if(mark){
if(doc.getSelection){
var sel=win.getSelection();
if(sel&&sel.removeAllRanges){
if(mark.pRange){
var n=mark.node;
n.selectionStart=mark.start;
n.selectionEnd=mark.end;
}else{
sel.removeAllRanges();
sel.addRange(mark);
}
}else{
console.warn("No idea how to restore selection for this browser!");
}
}else{
if(doc.selection&&mark){
var rg;
if(mark.pRange){
rg=mark.range;
}else{
if(lang.isArray(mark)){
rg=doc.body.createControlRange();
_af0.forEach(mark,function(n){
rg.addElement(n);
});
}else{
rg=doc.body.createTextRange();
rg.moveToBookmark(mark);
}
}
rg.select();
}
}
}
};
this.isCollapsed=function(){
return this.getBookmark().isCollapsed;
};
};
var _b0d=new _af3(window);
_b0d.SelectionManager=_af3;
return _b0d;
});
},"dijit/_base/typematic":function(){
define(["../typematic"],function(){
});
},"dijit/_base":function(){
define(["./main","./a11y","./WidgetSet","./_base/focus","./_base/manager","./_base/place","./_base/popup","./_base/scroll","./_base/sniff","./_base/typematic","./_base/wai","./_base/window"],function(_b0e){
return _b0e._base;
});
},"dijit/layout/BorderContainer":function(){
define(["dojo/_base/array","dojo/cookie","dojo/_base/declare","dojo/dom-class","dojo/dom-construct","dojo/dom-geometry","dojo/dom-style","dojo/keys","dojo/_base/lang","dojo/on","dojo/touch","../_WidgetBase","../_Widget","../_TemplatedMixin","./LayoutContainer","./utils"],function(_b0f,_b10,_b11,_b12,_b13,_b14,_b15,keys,lang,on,_b16,_b17,_b18,_b19,_b1a,_b1b){
var _b1c=_b11("dijit.layout._Splitter",[_b18,_b19],{live:true,templateString:"<div class=\"dijitSplitter\" data-dojo-attach-event=\"onkeydown:_onKeyDown,press:_startDrag,onmouseenter:_onMouse,onmouseleave:_onMouse\" tabIndex=\"0\" role=\"separator\"><div class=\"dijitSplitterThumb\"></div></div>",constructor:function(){
this._handlers=[];
},postMixInProperties:function(){
this.inherited(arguments);
this.horizontal=/top|bottom/.test(this.region);
this._factor=/top|left/.test(this.region)?1:-1;
this._cookieName=this.container.id+"_"+this.region;
},buildRendering:function(){
this.inherited(arguments);
_b12.add(this.domNode,"dijitSplitter"+(this.horizontal?"H":"V"));
if(this.container.persist){
var _b1d=_b10(this._cookieName);
if(_b1d){
this.child.domNode.style[this.horizontal?"height":"width"]=_b1d;
}
}
},_computeMaxSize:function(){
var dim=this.horizontal?"h":"w",_b1e=_b14.getMarginBox(this.child.domNode)[dim],_b1f=_b0f.filter(this.container.getChildren(),function(_b20){
return _b20.region=="center";
})[0];
var _b21=_b14.getContentBox(_b1f.domNode)[dim]-10;
return Math.min(this.child.maxSize,_b1e+_b21);
},_startDrag:function(e){
if(!this.cover){
this.cover=_b13.place("<div class=dijitSplitterCover></div>",this.child.domNode,"after");
}
_b12.add(this.cover,"dijitSplitterCoverActive");
if(this.fake){
_b13.destroy(this.fake);
}
if(!(this._resize=this.live)){
(this.fake=this.domNode.cloneNode(true)).removeAttribute("id");
_b12.add(this.domNode,"dijitSplitterShadow");
_b13.place(this.fake,this.domNode,"after");
}
_b12.add(this.domNode,"dijitSplitterActive dijitSplitter"+(this.horizontal?"H":"V")+"Active");
if(this.fake){
_b12.remove(this.fake,"dijitSplitterHover dijitSplitter"+(this.horizontal?"H":"V")+"Hover");
}
var _b22=this._factor,_b23=this.horizontal,axis=_b23?"pageY":"pageX",_b24=e[axis],_b25=this.domNode.style,dim=_b23?"h":"w",_b26=_b15.getComputedStyle(this.child.domNode),_b27=_b14.getMarginBox(this.child.domNode,_b26)[dim],max=this._computeMaxSize(),min=Math.max(this.child.minSize,_b14.getPadBorderExtents(this.child.domNode,_b26)[dim]+10),_b28=this.region,_b29=_b28=="top"||_b28=="bottom"?"top":"left",_b2a=parseInt(_b25[_b29],10),_b2b=this._resize,_b2c=lang.hitch(this.container,"_layoutChildren",this.child.id),de=this.ownerDocument;
this._handlers=this._handlers.concat([on(de,_b16.move,this._drag=function(e,_b2d){
var _b2e=e[axis]-_b24,_b2f=_b22*_b2e+_b27,_b30=Math.max(Math.min(_b2f,max),min);
if(_b2b||_b2d){
_b2c(_b30);
}
_b25[_b29]=_b2e+_b2a+_b22*(_b30-_b2f)+"px";
}),on(de,"dragstart",function(e){
e.stopPropagation();
e.preventDefault();
}),on(this.ownerDocumentBody,"selectstart",function(e){
e.stopPropagation();
e.preventDefault();
}),on(de,_b16.release,lang.hitch(this,"_stopDrag"))]);
e.stopPropagation();
e.preventDefault();
},_onMouse:function(e){
var o=(e.type=="mouseover"||e.type=="mouseenter");
_b12.toggle(this.domNode,"dijitSplitterHover",o);
_b12.toggle(this.domNode,"dijitSplitter"+(this.horizontal?"H":"V")+"Hover",o);
},_stopDrag:function(e){
try{
if(this.cover){
_b12.remove(this.cover,"dijitSplitterCoverActive");
}
if(this.fake){
_b13.destroy(this.fake);
}
_b12.remove(this.domNode,"dijitSplitterActive dijitSplitter"+(this.horizontal?"H":"V")+"Active dijitSplitterShadow");
this._drag(e);
this._drag(e,true);
}
finally{
this._cleanupHandlers();
delete this._drag;
}
if(this.container.persist){
_b10(this._cookieName,this.child.domNode.style[this.horizontal?"height":"width"],{expires:365});
}
},_cleanupHandlers:function(){
var h;
while(h=this._handlers.pop()){
h.remove();
}
},_onKeyDown:function(e){
this._resize=true;
var _b31=this.horizontal;
var tick=1;
switch(e.keyCode){
case _b31?keys.UP_ARROW:keys.LEFT_ARROW:
tick*=-1;
case _b31?keys.DOWN_ARROW:keys.RIGHT_ARROW:
break;
default:
return;
}
var _b32=_b14.getMarginSize(this.child.domNode)[_b31?"h":"w"]+this._factor*tick;
this.container._layoutChildren(this.child.id,Math.max(Math.min(_b32,this._computeMaxSize()),this.child.minSize));
e.stopPropagation();
e.preventDefault();
},destroy:function(){
this._cleanupHandlers();
delete this.child;
delete this.container;
delete this.cover;
delete this.fake;
this.inherited(arguments);
}});
var _b33=_b11("dijit.layout._Gutter",[_b18,_b19],{templateString:"<div class=\"dijitGutter\" role=\"presentation\"></div>",postMixInProperties:function(){
this.inherited(arguments);
this.horizontal=/top|bottom/.test(this.region);
},buildRendering:function(){
this.inherited(arguments);
_b12.add(this.domNode,"dijitGutter"+(this.horizontal?"H":"V"));
}});
var _b34=_b11("dijit.layout.BorderContainer",_b1a,{gutters:true,liveSplitters:true,persist:false,baseClass:"dijitBorderContainer",_splitterClass:_b1c,postMixInProperties:function(){
if(!this.gutters){
this.baseClass+="NoGutter";
}
this.inherited(arguments);
},_setupChild:function(_b35){
this.inherited(arguments);
var _b36=_b35.region,ltr=_b35.isLeftToRight();
if(_b36=="leading"){
_b36=ltr?"left":"right";
}
if(_b36=="trailing"){
_b36=ltr?"right":"left";
}
if(_b36){
if(_b36!="center"&&(_b35.splitter||this.gutters)&&!_b35._splitterWidget){
var _b37=_b35.splitter?this._splitterClass:_b33;
if(lang.isString(_b37)){
_b37=lang.getObject(_b37);
}
var _b38=new _b37({id:_b35.id+"_splitter",container:this,child:_b35,region:_b36,live:this.liveSplitters});
_b38.isSplitter=true;
_b35._splitterWidget=_b38;
var _b39=_b36=="bottom"||_b36==(this.isLeftToRight()?"right":"left");
_b13.place(_b38.domNode,_b35.domNode,_b39?"before":"after");
_b38.startup();
}
}
},layout:function(){
this._layoutChildren();
},removeChild:function(_b3a){
var _b3b=_b3a._splitterWidget;
if(_b3b){
_b3b.destroy();
delete _b3a._splitterWidget;
}
this.inherited(arguments);
},getChildren:function(){
return _b0f.filter(this.inherited(arguments),function(_b3c){
return !_b3c.isSplitter;
});
},getSplitter:function(_b3d){
return _b0f.filter(this.getChildren(),function(_b3e){
return _b3e.region==_b3d;
})[0]._splitterWidget;
},resize:function(_b3f,_b40){
if(!this.cs||!this.pe){
var node=this.domNode;
this.cs=_b15.getComputedStyle(node);
this.pe=_b14.getPadExtents(node,this.cs);
this.pe.r=_b15.toPixelValue(node,this.cs.paddingRight);
this.pe.b=_b15.toPixelValue(node,this.cs.paddingBottom);
_b15.set(node,"padding","0px");
}
this.inherited(arguments);
},_layoutChildren:function(_b41,_b42){
if(!this._borderBox||!this._borderBox.h){
return;
}
var _b43=[];
_b0f.forEach(this._getOrderedChildren(),function(pane){
_b43.push(pane);
if(pane._splitterWidget){
_b43.push(pane._splitterWidget);
}
});
var dim={l:this.pe.l,t:this.pe.t,w:this._borderBox.w-this.pe.w,h:this._borderBox.h-this.pe.h};
_b1b.layoutChildren(this.domNode,dim,_b43,_b41,_b42);
},destroyRecursive:function(){
_b0f.forEach(this.getChildren(),function(_b44){
var _b45=_b44._splitterWidget;
if(_b45){
_b45.destroy();
}
delete _b44._splitterWidget;
});
this.inherited(arguments);
}});
_b34.ChildWidgetProperties={splitter:false,minSize:0,maxSize:Infinity};
lang.mixin(_b34.ChildWidgetProperties,_b1a.ChildWidgetProperties);
lang.extend(_b17,_b34.ChildWidgetProperties);
_b34._Splitter=_b1c;
_b34._Gutter=_b33;
return _b34;
});
},"dgrid/OnDemandGrid":function(){
define(["dojo/_base/declare","./Grid","./OnDemandList"],function(_b46,Grid,_b47){
return _b46([Grid,_b47],{});
});
},"dojo/window":function(){
define(["./_base/lang","./sniff","./_base/window","./dom","./dom-geometry","./dom-style","./dom-construct"],function(lang,has,_b48,dom,geom,_b49,_b4a){
has.add("rtl-adjust-position-for-verticalScrollBar",function(win,doc){
var body=_b48.body(doc),_b4b=_b4a.create("div",{style:{overflow:"scroll",overflowX:"visible",direction:"rtl",visibility:"hidden",position:"absolute",left:"0",top:"0",width:"64px",height:"64px"}},body,"last"),div=_b4a.create("div",{style:{overflow:"hidden",direction:"ltr"}},_b4b,"last"),ret=geom.position(div).x!=0;
_b4b.removeChild(div);
body.removeChild(_b4b);
return ret;
});
has.add("position-fixed-support",function(win,doc){
var body=_b48.body(doc),_b4c=_b4a.create("span",{style:{visibility:"hidden",position:"fixed",left:"1px",top:"1px"}},body,"last"),_b4d=_b4a.create("span",{style:{position:"fixed",left:"0",top:"0"}},_b4c,"last"),ret=geom.position(_b4d).x!=geom.position(_b4c).x;
_b4c.removeChild(_b4d);
body.removeChild(_b4c);
return ret;
});
var _b4e={getBox:function(doc){
doc=doc||_b48.doc;
var _b4f=(doc.compatMode=="BackCompat")?_b48.body(doc):doc.documentElement,_b50=geom.docScroll(doc),w,h;
if(has("touch")){
var _b51=_b4e.get(doc);
w=_b51.innerWidth||_b4f.clientWidth;
h=_b51.innerHeight||_b4f.clientHeight;
}else{
w=_b4f.clientWidth;
h=_b4f.clientHeight;
}
return {l:_b50.x,t:_b50.y,w:w,h:h};
},get:function(doc){
if(has("ie")&&_b4e!==document.parentWindow){
doc.parentWindow.execScript("document._parentWindow = window;","Javascript");
var win=doc._parentWindow;
doc._parentWindow=null;
return win;
}
return doc.parentWindow||doc.defaultView;
},scrollIntoView:function(node,pos){
try{
node=dom.byId(node);
var doc=node.ownerDocument||_b48.doc,body=_b48.body(doc),html=doc.documentElement||body.parentNode,isIE=has("ie"),isWK=has("webkit");
if(node==body||node==html){
return;
}
if(!(has("mozilla")||isIE||isWK||has("opera")||has("trident"))&&("scrollIntoView" in node)){
node.scrollIntoView(false);
return;
}
var _b52=doc.compatMode=="BackCompat",_b53=Math.min(body.clientWidth||html.clientWidth,html.clientWidth||body.clientWidth),_b54=Math.min(body.clientHeight||html.clientHeight,html.clientHeight||body.clientHeight),_b55=(isWK||_b52)?body:html,_b56=pos||geom.position(node),el=node.parentNode,_b57=function(el){
return (isIE<=6||(isIE==7&&_b52))?false:(has("position-fixed-support")&&(_b49.get(el,"position").toLowerCase()=="fixed"));
};
if(_b57(node)){
return;
}
while(el){
if(el==body){
el=_b55;
}
var _b58=geom.position(el),_b59=_b57(el),rtl=_b49.getComputedStyle(el).direction.toLowerCase()=="rtl";
if(el==_b55){
_b58.w=_b53;
_b58.h=_b54;
if(_b55==html&&isIE&&rtl){
_b58.x+=_b55.offsetWidth-_b58.w;
}
if(_b58.x<0||!isIE||isIE>=9){
_b58.x=0;
}
if(_b58.y<0||!isIE||isIE>=9){
_b58.y=0;
}
}else{
var pb=geom.getPadBorderExtents(el);
_b58.w-=pb.w;
_b58.h-=pb.h;
_b58.x+=pb.l;
_b58.y+=pb.t;
var _b5a=el.clientWidth,_b5b=_b58.w-_b5a;
if(_b5a>0&&_b5b>0){
if(rtl&&has("rtl-adjust-position-for-verticalScrollBar")){
_b58.x+=_b5b;
}
_b58.w=_b5a;
}
_b5a=el.clientHeight;
_b5b=_b58.h-_b5a;
if(_b5a>0&&_b5b>0){
_b58.h=_b5a;
}
}
if(_b59){
if(_b58.y<0){
_b58.h+=_b58.y;
_b58.y=0;
}
if(_b58.x<0){
_b58.w+=_b58.x;
_b58.x=0;
}
if(_b58.y+_b58.h>_b54){
_b58.h=_b54-_b58.y;
}
if(_b58.x+_b58.w>_b53){
_b58.w=_b53-_b58.x;
}
}
var l=_b56.x-_b58.x,t=_b56.y-_b58.y,r=l+_b56.w-_b58.w,bot=t+_b56.h-_b58.h;
var s,old;
if(r*l>0&&(!!el.scrollLeft||el==_b55||el.scrollWidth>el.offsetHeight)){
s=Math[l<0?"max":"min"](l,r);
if(rtl&&((isIE==8&&!_b52)||isIE>=9)){
s=-s;
}
old=el.scrollLeft;
el.scrollLeft+=s;
s=el.scrollLeft-old;
_b56.x-=s;
}
if(bot*t>0&&(!!el.scrollTop||el==_b55||el.scrollHeight>el.offsetHeight)){
s=Math.ceil(Math[t<0?"max":"min"](t,bot));
old=el.scrollTop;
el.scrollTop+=s;
s=el.scrollTop-old;
_b56.y-=s;
}
el=(el!=_b55)&&!_b59&&el.parentNode;
}
}
catch(error){
console.error("scrollIntoView: "+error);
node.scrollIntoView(false);
}
}};
1&&lang.setObject("dojo.window",_b4e);
return _b4e;
});
},"dojo/number":function(){
define(["./_base/lang","./i18n","./i18n!./cldr/nls/number","./string","./regexp"],function(lang,i18n,_b5c,_b5d,_b5e){
var _b5f={};
lang.setObject("dojo.number",_b5f);
_b5f.format=function(_b60,_b61){
_b61=lang.mixin({},_b61||{});
var _b62=i18n.normalizeLocale(_b61.locale),_b63=i18n.getLocalization("dojo.cldr","number",_b62);
_b61.customs=_b63;
var _b64=_b61.pattern||_b63[(_b61.type||"decimal")+"Format"];
if(isNaN(_b60)||Math.abs(_b60)==Infinity){
return null;
}
return _b5f._applyPattern(_b60,_b64,_b61);
};
_b5f._numberPatternRE=/[#0,]*[#0](?:\.0*#*)?/;
_b5f._applyPattern=function(_b65,_b66,_b67){
_b67=_b67||{};
var _b68=_b67.customs.group,_b69=_b67.customs.decimal,_b6a=_b66.split(";"),_b6b=_b6a[0];
_b66=_b6a[(_b65<0)?1:0]||("-"+_b6b);
if(_b66.indexOf("%")!=-1){
_b65*=100;
}else{
if(_b66.indexOf("‰")!=-1){
_b65*=1000;
}else{
if(_b66.indexOf("¤")!=-1){
_b68=_b67.customs.currencyGroup||_b68;
_b69=_b67.customs.currencyDecimal||_b69;
_b66=_b66.replace(/\u00a4{1,3}/,function(_b6c){
var prop=["symbol","currency","displayName"][_b6c.length-1];
return _b67[prop]||_b67.currency||"";
});
}else{
if(_b66.indexOf("E")!=-1){
throw new Error("exponential notation not supported");
}
}
}
}
var _b6d=_b5f._numberPatternRE;
var _b6e=_b6b.match(_b6d);
if(!_b6e){
throw new Error("unable to find a number expression in pattern: "+_b66);
}
if(_b67.fractional===false){
_b67.places=0;
}
return _b66.replace(_b6d,_b5f._formatAbsolute(_b65,_b6e[0],{decimal:_b69,group:_b68,places:_b67.places,round:_b67.round}));
};
_b5f.round=function(_b6f,_b70,_b71){
var _b72=10/(_b71||10);
return (_b72*+_b6f).toFixed(_b70)/_b72;
};
if((0.9).toFixed()==0){
var _b73=_b5f.round;
_b5f.round=function(v,p,m){
var d=Math.pow(10,-p||0),a=Math.abs(v);
if(!v||a>=d){
d=0;
}else{
a/=d;
if(a<0.5||a>=0.95){
d=0;
}
}
return _b73(v,p,m)+(v>0?d:-d);
};
}
_b5f._formatAbsolute=function(_b74,_b75,_b76){
_b76=_b76||{};
if(_b76.places===true){
_b76.places=0;
}
if(_b76.places===Infinity){
_b76.places=6;
}
var _b77=_b75.split("."),_b78=typeof _b76.places=="string"&&_b76.places.indexOf(","),_b79=_b76.places;
if(_b78){
_b79=_b76.places.substring(_b78+1);
}else{
if(!(_b79>=0)){
_b79=(_b77[1]||[]).length;
}
}
if(!(_b76.round<0)){
_b74=_b5f.round(_b74,_b79,_b76.round);
}
var _b7a=String(Math.abs(_b74)).split("."),_b7b=_b7a[1]||"";
if(_b77[1]||_b76.places){
if(_b78){
_b76.places=_b76.places.substring(0,_b78);
}
var pad=_b76.places!==undefined?_b76.places:(_b77[1]&&_b77[1].lastIndexOf("0")+1);
if(pad>_b7b.length){
_b7a[1]=_b5d.pad(_b7b,pad,"0",true);
}
if(_b79<_b7b.length){
_b7a[1]=_b7b.substr(0,_b79);
}
}else{
if(_b7a[1]){
_b7a.pop();
}
}
var _b7c=_b77[0].replace(",","");
pad=_b7c.indexOf("0");
if(pad!=-1){
pad=_b7c.length-pad;
if(pad>_b7a[0].length){
_b7a[0]=_b5d.pad(_b7a[0],pad);
}
if(_b7c.indexOf("#")==-1){
_b7a[0]=_b7a[0].substr(_b7a[0].length-pad);
}
}
var _b7d=_b77[0].lastIndexOf(","),_b7e,_b7f;
if(_b7d!=-1){
_b7e=_b77[0].length-_b7d-1;
var _b80=_b77[0].substr(0,_b7d);
_b7d=_b80.lastIndexOf(",");
if(_b7d!=-1){
_b7f=_b80.length-_b7d-1;
}
}
var _b81=[];
for(var _b82=_b7a[0];_b82;){
var off=_b82.length-_b7e;
_b81.push((off>0)?_b82.substr(off):_b82);
_b82=(off>0)?_b82.slice(0,off):"";
if(_b7f){
_b7e=_b7f;
delete _b7f;
}
}
_b7a[0]=_b81.reverse().join(_b76.group||",");
return _b7a.join(_b76.decimal||".");
};
_b5f.regexp=function(_b83){
return _b5f._parseInfo(_b83).regexp;
};
_b5f._parseInfo=function(_b84){
_b84=_b84||{};
var _b85=i18n.normalizeLocale(_b84.locale),_b86=i18n.getLocalization("dojo.cldr","number",_b85),_b87=_b84.pattern||_b86[(_b84.type||"decimal")+"Format"],_b88=_b86.group,_b89=_b86.decimal,_b8a=1;
if(_b87.indexOf("%")!=-1){
_b8a/=100;
}else{
if(_b87.indexOf("‰")!=-1){
_b8a/=1000;
}else{
var _b8b=_b87.indexOf("¤")!=-1;
if(_b8b){
_b88=_b86.currencyGroup||_b88;
_b89=_b86.currencyDecimal||_b89;
}
}
}
var _b8c=_b87.split(";");
if(_b8c.length==1){
_b8c.push("-"+_b8c[0]);
}
var re=_b5e.buildGroupRE(_b8c,function(_b8d){
_b8d="(?:"+_b5e.escapeString(_b8d,".")+")";
return _b8d.replace(_b5f._numberPatternRE,function(_b8e){
var _b8f={signed:false,separator:_b84.strict?_b88:[_b88,""],fractional:_b84.fractional,decimal:_b89,exponent:false},_b90=_b8e.split("."),_b91=_b84.places;
if(_b90.length==1&&_b8a!=1){
_b90[1]="###";
}
if(_b90.length==1||_b91===0){
_b8f.fractional=false;
}else{
if(_b91===undefined){
_b91=_b84.pattern?_b90[1].lastIndexOf("0")+1:Infinity;
}
if(_b91&&_b84.fractional==undefined){
_b8f.fractional=true;
}
if(!_b84.places&&(_b91<_b90[1].length)){
_b91+=","+_b90[1].length;
}
_b8f.places=_b91;
}
var _b92=_b90[0].split(",");
if(_b92.length>1){
_b8f.groupSize=_b92.pop().length;
if(_b92.length>1){
_b8f.groupSize2=_b92.pop().length;
}
}
return "("+_b5f._realNumberRegexp(_b8f)+")";
});
},true);
if(_b8b){
re=re.replace(/([\s\xa0]*)(\u00a4{1,3})([\s\xa0]*)/g,function(_b93,_b94,_b95,_b96){
var prop=["symbol","currency","displayName"][_b95.length-1],_b97=_b5e.escapeString(_b84[prop]||_b84.currency||"");
_b94=_b94?"[\\s\\xa0]":"";
_b96=_b96?"[\\s\\xa0]":"";
if(!_b84.strict){
if(_b94){
_b94+="*";
}
if(_b96){
_b96+="*";
}
return "(?:"+_b94+_b97+_b96+")?";
}
return _b94+_b97+_b96;
});
}
return {regexp:re.replace(/[\xa0 ]/g,"[\\s\\xa0]"),group:_b88,decimal:_b89,factor:_b8a};
};
_b5f.parse=function(_b98,_b99){
var info=_b5f._parseInfo(_b99),_b9a=(new RegExp("^"+info.regexp+"$")).exec(_b98);
if(!_b9a){
return NaN;
}
var _b9b=_b9a[1];
if(!_b9a[1]){
if(!_b9a[2]){
return NaN;
}
_b9b=_b9a[2];
info.factor*=-1;
}
_b9b=_b9b.replace(new RegExp("["+info.group+"\\s\\xa0"+"]","g"),"").replace(info.decimal,".");
return _b9b*info.factor;
};
_b5f._realNumberRegexp=function(_b9c){
_b9c=_b9c||{};
if(!("places" in _b9c)){
_b9c.places=Infinity;
}
if(typeof _b9c.decimal!="string"){
_b9c.decimal=".";
}
if(!("fractional" in _b9c)||/^0/.test(_b9c.places)){
_b9c.fractional=[true,false];
}
if(!("exponent" in _b9c)){
_b9c.exponent=[true,false];
}
if(!("eSigned" in _b9c)){
_b9c.eSigned=[true,false];
}
var _b9d=_b5f._integerRegexp(_b9c),_b9e=_b5e.buildGroupRE(_b9c.fractional,function(q){
var re="";
if(q&&(_b9c.places!==0)){
re="\\"+_b9c.decimal;
if(_b9c.places==Infinity){
re="(?:"+re+"\\d+)?";
}else{
re+="\\d{"+_b9c.places+"}";
}
}
return re;
},true);
var _b9f=_b5e.buildGroupRE(_b9c.exponent,function(q){
if(q){
return "([eE]"+_b5f._integerRegexp({signed:_b9c.eSigned})+")";
}
return "";
});
var _ba0=_b9d+_b9e;
if(_b9e){
_ba0="(?:(?:"+_ba0+")|(?:"+_b9e+"))";
}
return _ba0+_b9f;
};
_b5f._integerRegexp=function(_ba1){
_ba1=_ba1||{};
if(!("signed" in _ba1)){
_ba1.signed=[true,false];
}
if(!("separator" in _ba1)){
_ba1.separator="";
}else{
if(!("groupSize" in _ba1)){
_ba1.groupSize=3;
}
}
var _ba2=_b5e.buildGroupRE(_ba1.signed,function(q){
return q?"[-+]":"";
},true);
var _ba3=_b5e.buildGroupRE(_ba1.separator,function(sep){
if(!sep){
return "(?:\\d+)";
}
sep=_b5e.escapeString(sep);
if(sep==" "){
sep="\\s";
}else{
if(sep==" "){
sep="\\s\\xa0";
}
}
var grp=_ba1.groupSize,grp2=_ba1.groupSize2;
if(grp2){
var _ba4="(?:0|[1-9]\\d{0,"+(grp2-1)+"}(?:["+sep+"]\\d{"+grp2+"})*["+sep+"]\\d{"+grp+"})";
return ((grp-grp2)>0)?"(?:"+_ba4+"|(?:0|[1-9]\\d{0,"+(grp-1)+"}))":_ba4;
}
return "(?:0|[1-9]\\d{0,"+(grp-1)+"}(?:["+sep+"]\\d{"+grp+"})*)";
},true);
return _ba2+_ba3;
};
return _b5f;
});
},"dijit/_FocusMixin":function(){
define(["./focus","./_WidgetBase","dojo/_base/declare","dojo/_base/lang"],function(_ba5,_ba6,_ba7,lang){
lang.extend(_ba6,{focused:false,onFocus:function(){
},onBlur:function(){
},_onFocus:function(){
this.onFocus();
},_onBlur:function(){
this.onBlur();
}});
return _ba7("dijit._FocusMixin",null,{_focusManager:_ba5});
});
},"dojo/data/util/filter":function(){
define(["../../_base/lang"],function(lang){
var _ba8={};
lang.setObject("dojo.data.util.filter",_ba8);
_ba8.patternToRegExp=function(_ba9,_baa){
var rxp="^";
var c=null;
for(var i=0;i<_ba9.length;i++){
c=_ba9.charAt(i);
switch(c){
case "\\":
rxp+=c;
i++;
rxp+=_ba9.charAt(i);
break;
case "*":
rxp+=".*";
break;
case "?":
rxp+=".";
break;
case "$":
case "^":
case "/":
case "+":
case ".":
case "|":
case "(":
case ")":
case "{":
case "}":
case "[":
case "]":
rxp+="\\";
default:
rxp+=c;
}
}
rxp+="$";
if(_baa){
return new RegExp(rxp,"mi");
}else{
return new RegExp(rxp,"m");
}
};
return _ba8;
});
},"dijit/_WidgetsInTemplateMixin":function(){
define(["dojo/_base/array","dojo/aspect","dojo/_base/declare","dojo/_base/lang","dojo/parser"],function(_bab,_bac,_bad,lang,_bae){
return _bad("dijit._WidgetsInTemplateMixin",null,{_earlyTemplatedStartup:false,widgetsInTemplate:true,contextRequire:null,_beforeFillContent:function(){
if(this.widgetsInTemplate){
var node=this.domNode;
if(this.containerNode&&!this.searchContainerNode){
this.containerNode.stopParser=true;
}
_bae.parse(node,{noStart:!this._earlyTemplatedStartup,template:true,inherited:{dir:this.dir,lang:this.lang,textDir:this.textDir},propsThis:this,contextRequire:this.contextRequire,scope:"dojo"}).then(lang.hitch(this,function(_baf){
this._startupWidgets=_baf;
for(var i=0;i<_baf.length;i++){
this._processTemplateNode(_baf[i],function(n,p){
return n[p];
},function(_bb0,type,_bb1){
if(type in _bb0){
return _bb0.connect(_bb0,type,_bb1);
}else{
return _bb0.on(type,_bb1,true);
}
});
}
if(this.containerNode&&this.containerNode.stopParser){
delete this.containerNode.stopParser;
}
}));
if(!this._startupWidgets){
throw new Error(this.declaredClass+": parser returned unfilled promise (probably waiting for module auto-load), "+"unsupported by _WidgetsInTemplateMixin.   Must pre-load all supporting widgets before instantiation.");
}
}
},_processTemplateNode:function(_bb2,_bb3,_bb4){
if(_bb3(_bb2,"dojoType")||_bb3(_bb2,"data-dojo-type")){
return true;
}
return this.inherited(arguments);
},startup:function(){
_bab.forEach(this._startupWidgets,function(w){
if(w&&!w._started&&w.startup){
w.startup();
}
});
this._startupWidgets=null;
this.inherited(arguments);
}});
});
},"dojo/fx/Toggler":function(){
define(["../_base/lang","../_base/declare","../_base/fx","../aspect"],function(lang,_bb5,_bb6,_bb7){
return _bb5("dojo.fx.Toggler",null,{node:null,showFunc:_bb6.fadeIn,hideFunc:_bb6.fadeOut,showDuration:200,hideDuration:200,constructor:function(args){
var _bb8=this;
lang.mixin(_bb8,args);
_bb8.node=args.node;
_bb8._showArgs=lang.mixin({},args);
_bb8._showArgs.node=_bb8.node;
_bb8._showArgs.duration=_bb8.showDuration;
_bb8.showAnim=_bb8.showFunc(_bb8._showArgs);
_bb8._hideArgs=lang.mixin({},args);
_bb8._hideArgs.node=_bb8.node;
_bb8._hideArgs.duration=_bb8.hideDuration;
_bb8.hideAnim=_bb8.hideFunc(_bb8._hideArgs);
_bb7.after(_bb8.showAnim,"beforeBegin",lang.hitch(_bb8.hideAnim,"stop",true),true);
_bb7.after(_bb8.hideAnim,"beforeBegin",lang.hitch(_bb8.showAnim,"stop",true),true);
},show:function(_bb9){
return this.showAnim.play(_bb9||0);
},hide:function(_bba){
return this.hideAnim.play(_bba||0);
}});
});
},"dgrid/Selection":function(){
define(["dojo/_base/kernel","dojo/_base/declare","dojo/_base/Deferred","dojo/on","dojo/has","dojo/aspect","./List","dojo/has!touch?./util/touch","put-selector/put","dojo/query","dojo/_base/sniff"],function(_bbb,_bbc,_bbd,on,has,_bbe,List,_bbf,put){
has.add("css-user-select",function(_bc0,doc,_bc1){
var _bc2=_bc1.style,_bc3=["Khtml","O","ms","Moz","Webkit"],i=_bc3.length,name="userSelect";
do{
if(typeof _bc2[name]!=="undefined"){
return name;
}
}while(i--&&(name=_bc3[i]+"UserSelect"));
return false;
});
has.add("dom-selectstart",typeof document.onselectstart!=="undefined");
var _bc4=has("mac")?"metaKey":"ctrlKey",_bc5=has("css-user-select");
function _bc6(node,_bc7){
var _bc8=node.unselectable=_bc7?"on":"",_bc9=node.getElementsByTagName("*"),i=_bc9.length;
while(--i){
if(_bc9[i].tagName==="INPUT"||_bc9[i].tagName==="TEXTAREA"){
continue;
}
_bc9[i].unselectable=_bc8;
}
};
function _bca(grid,_bcb){
var node=grid.bodyNode,_bcc=_bcb?"text":has("ff")<21?"-moz-none":"none";
if(_bc5){
node.style[_bc5]=_bcc;
}else{
if(has("dom-selectstart")){
if(!_bcb&&!grid._selectstartHandle){
grid._selectstartHandle=on(node,"selectstart",function(evt){
var tag=evt.target&&evt.target.tagName;
if(tag!=="INPUT"&&tag!=="TEXTAREA"){
evt.preventDefault();
}
});
}else{
if(_bcb&&grid._selectstartHandle){
grid._selectstartHandle.remove();
delete grid._selectstartHandle;
}
}
}else{
_bc6(node,!_bcb);
if(!_bcb&&!grid._unselectableHandle){
grid._unselectableHandle=_bbe.after(grid,"renderRow",function(row){
_bc6(row,true);
return row;
});
}else{
if(_bcb&&grid._unselectableHandle){
grid._unselectableHandle.remove();
delete grid._unselectableHandle;
}
}
}
}
};
return _bbc(null,{selectionDelegate:".dgrid-row",selectionEvents:"mousedown,mouseup,dgrid-cellfocusin",deselectOnRefresh:true,allowSelectAll:false,selection:{},selectionMode:"extended",allowTextSelection:undefined,create:function(){
this.selection={};
return this.inherited(arguments);
},postCreate:function(){
this.inherited(arguments);
var _bcd=this.selectionMode;
this.selectionMode="";
this._setSelectionMode(_bcd);
this._initSelectionEvents();
},destroy:function(){
this.inherited(arguments);
if(this._selectstartHandle){
this._selectstartHandle.remove();
}
if(this._unselectableHandle){
this._unselectableHandle.remove();
}
},_setSelectionMode:function(mode){
if(mode==this.selectionMode){
return;
}
this.clearSelection();
this.selectionMode=mode;
this._selectionHandlerName="_"+mode+"SelectionHandler";
this._setAllowTextSelection(this.allowTextSelection);
},setSelectionMode:function(mode){
_bbb.deprecated("setSelectionMode(...)","use set(\"selectionMode\", ...) instead","dgrid 1.0");
this.set("selectionMode",mode);
},_setAllowTextSelection:function(_bce){
if(typeof _bce!=="undefined"){
_bca(this,_bce);
}else{
_bca(this,this.selectionMode==="none");
}
this.allowTextSelection=_bce;
},_handleSelect:function(_bcf,_bd0){
if(!this[this._selectionHandlerName]||(_bcf.type=="dgrid-cellfocusin"&&_bcf.parentType=="mousedown")||(_bcf.type=="mouseup"&&_bd0!=this._waitForMouseUp)){
return;
}
this._waitForMouseUp=null;
this._selectionTriggerEvent=_bcf;
if(!_bcf.keyCode||!_bcf.ctrlKey||_bcf.keyCode==32){
if(!_bcf.shiftKey&&_bcf.type=="mousedown"&&this.isSelected(_bd0)){
this._waitForMouseUp=_bd0;
}else{
this[this._selectionHandlerName](_bcf,_bd0);
}
}
this._selectionTriggerEvent=null;
},_singleSelectionHandler:function(_bd1,_bd2){
var _bd3=_bd1.keyCode?_bd1.ctrlKey:_bd1[_bc4];
if(this._lastSelected===_bd2){
this.select(_bd2,null,!_bd3||!this.isSelected(_bd2));
}else{
this.clearSelection();
this.select(_bd2);
this._lastSelected=_bd2;
}
},_multipleSelectionHandler:function(_bd4,_bd5){
var _bd6=this._lastSelected,_bd7=_bd4.keyCode?_bd4.ctrlKey:_bd4[_bc4],_bd8;
if(!_bd4.shiftKey){
_bd8=_bd7?null:true;
_bd6=null;
}
this.select(_bd5,_bd6,_bd8);
if(!_bd6){
this._lastSelected=_bd5;
}
},_extendedSelectionHandler:function(_bd9,_bda){
if(_bd9.button===2?!this.isSelected(_bda):!(_bd9.keyCode?_bd9.ctrlKey:_bd9[_bc4])){
this.clearSelection(null,true);
}
this._multipleSelectionHandler(_bd9,_bda);
},_toggleSelectionHandler:function(_bdb,_bdc){
this.select(_bdc,null,null);
},_initSelectionEvents:function(){
var grid=this,_bdd=this.selectionDelegate;
if(has("touch")){
on(this.contentNode,_bbf.selector(_bdd,_bbf.tap),function(evt){
grid._handleSelect(evt,this);
});
}else{
on(this.contentNode,on.selector(_bdd,this.selectionEvents),function(_bde){
grid._handleSelect(_bde,this);
});
}
if(this.addKeyHandler){
this.addKeyHandler(32,function(_bdf){
grid._handleSelect(_bdf,_bdf.target);
});
}
if(this.allowSelectAll){
this.on("keydown",function(_be0){
if(_be0[_bc4]&&_be0.keyCode==65){
_be0.preventDefault();
grid[grid.allSelected?"clearSelection":"selectAll"]();
}
});
}
_bbe.before(this,"removeRow",function(_be1,_be2){
var row;
if(!_be2){
row=this.row(_be1);
if(row&&(row.id in this.selection)){
this.deselect(_be1);
}
}
});
},allowSelect:function(row){
return true;
},_selectionEventQueue:function(_be3,type){
var grid=this,_be4="dgrid-"+(_be3?"select":"deselect"),rows=this[_be4],_be5=this._selectionTriggerEvent;
if(_be5){
_be5=_be5.type;
}
if(rows){
return rows;
}
setTimeout(this._fireSelectionEvent=function(){
if(!rows){
return;
}
var _be6={bubbles:true,grid:grid};
if(_be5){
_be6.parentType=_be5;
}
_be6[type]=rows;
on.emit(grid.contentNode,_be4,_be6);
rows=null;
delete grid[_be4];
},0);
return (rows=this[_be4]=[]);
},select:function(row,_be7,_be8){
if(_be8===undefined){
_be8=true;
}
if(!row.element){
row=this.row(row);
}
if(!_be8||this.allowSelect(row)){
var _be9=this.selection;
var _bea=_be9[row.id];
if(_be8===null){
_be8=!_bea;
}
var _beb=row.element;
if(!_be8&&!this.allSelected){
delete this.selection[row.id];
}else{
_be9[row.id]=_be8;
}
if(_beb){
if(_be8){
put(_beb,".dgrid-selected.ui-state-active");
}else{
put(_beb,"!dgrid-selected!ui-state-active");
}
}
if(_be8!=_bea&&_beb){
this._selectionEventQueue(_be8,"rows").push(row);
}
if(_be7){
if(!_be7.element){
_be7=this.row(_be7);
}
var _bec=_be7.element;
var _bed=row.element;
var _bee=(_bec&&(_bec.compareDocumentPosition?_bec.compareDocumentPosition(_bed)==2:_bec.sourceIndex>_bed.sourceIndex))?"down":"up";
while(row.element!=_bec&&(row=this[_bee](row))){
this.select(row,null,_be8);
}
}
}
},deselect:function(row,_bef){
this.select(row,_bef,false);
},clearSelection:function(_bf0,_bf1){
this.allSelected=false;
for(var id in this.selection){
if(_bf0!==id){
this.deselect(id);
}
}
if(!_bf1){
this._lastSelected=null;
}
},selectAll:function(){
this.allSelected=true;
this.selection={};
for(var i in this._rowIdToObject){
var row=this.row(this._rowIdToObject[i]);
this.select(row.id);
}
},isSelected:function(_bf2){
if(typeof _bf2==="undefined"||_bf2===null){
return false;
}
if(!_bf2.element){
_bf2=this.row(_bf2);
}
return (_bf2.id in this.selection)?!!this.selection[_bf2.id]:this.allSelected&&(!_bf2.data||this.allowSelect(_bf2));
},refresh:function(){
if(this.deselectOnRefresh){
this.clearSelection();
this._fireSelectionEvent&&this._fireSelectionEvent();
}
this._lastSelected=null;
return this.inherited(arguments);
},renderArray:function(){
var grid=this,rows=this.inherited(arguments);
_bbd.when(rows,function(rows){
var _bf3=grid.selection,i,row,_bf4;
for(i=0;i<rows.length;i++){
row=grid.row(rows[i]);
_bf4=row.id in _bf3?_bf3[row.id]:grid.allSelected;
if(_bf4){
grid.select(row,null,_bf4);
}
}
});
return rows;
}});
});
},"dgrid/_StoreMixin":function(){
define(["dojo/_base/kernel","dojo/_base/declare","dojo/_base/lang","dojo/_base/Deferred","dojo/on","dojo/aspect","put-selector/put"],function(_bf5,_bf6,lang,_bf7,_bf8,_bf9,put){
function noop(_bfa){
return _bfa;
};
function _bfb(err){
if(typeof err!=="object"){
err=new Error(err);
}
err.grid=this;
if(_bf8.emit(this.domNode,"dgrid-error",{grid:this,error:err,cancelable:true,bubbles:true})){
console.error(err);
}
};
return _bf6(null,{store:null,query:null,queryOptions:null,getBeforePut:true,noDataMessage:"",loadingMessage:"",constructor:function(){
this.query={};
this.queryOptions={};
this.dirty={};
this._updating={};
this._columnsWithSet={};
_bf9.before(this,"configStructure",lang.hitch(this,function(){
this._columnsWithSet={};
}));
},_configColumn:function(_bfc){
if(_bfc.set){
this._columnsWithSet[_bfc.field]=_bfc;
}
},_setStore:function(_bfd,_bfe,_bff){
this.store=_bfd;
this.dirty={};
this.set("query",_bfe,_bff);
},_setQuery:function(_c00,_c01){
var sort=_c01&&_c01.sort;
this.query=_c00!==undefined?_c00:this.query;
this.queryOptions=_c01||this.queryOptions;
sort?this.set("sort",sort):this.refresh();
},setStore:function(_c02,_c03,_c04){
_bf5.deprecated("setStore(...)","use set(\"store\", ...) instead","dgrid 1.0");
this.set("store",_c02,_c03,_c04);
},setQuery:function(_c05,_c06){
_bf5.deprecated("setQuery(...)","use set(\"query\", ...) instead","dgrid 1.0");
this.set("query",_c05,_c06);
},_getQueryOptions:function(){
var _c07=lang.delegate(this.queryOptions,{});
if(this._sort.length){
_c07.sort=this._sort;
}
return _c07;
},_getQuery:function(){
var q=this.query;
return typeof q=="object"&&q!=null?lang.delegate(q,{}):q;
},_setSort:function(_c08,_c09){
if(this.store){
this._lastCollection=null;
}
this.inherited(arguments);
},insertRow:function(_c0a,_c0b,_c0c,i,_c0d){
var _c0e=this.store,_c0f=this.dirty,id=_c0e&&_c0e.getIdentity(_c0a),_c10;
if(id in _c0f&&!(id in this._updating)){
_c10=_c0f[id];
}
if(_c10){
_c0a=lang.delegate(_c0a,_c10);
}
return this.inherited(arguments);
},updateDirty:function(id,_c11,_c12){
var _c13=this.dirty,_c14=_c13[id];
if(!_c14){
_c14=_c13[id]={};
}
_c14[_c11]=_c12;
},setDirty:function(id,_c15,_c16){
_bf5.deprecated("setDirty(...)","use updateDirty() instead","dgrid 1.0");
this.updateDirty(id,_c15,_c16);
},save:function(){
var self=this,_c17=this.store,_c18=this.dirty,dfd=new _bf7(),_c19=dfd.promise,_c1a=function(id){
var data;
return (self.getBeforePut||!(data=self.row(id).data))?function(){
return _c17.get(id);
}:function(){
return data;
};
};
function _c1b(id,_c1c){
return function(_c1d){
var _c1e=self._columnsWithSet,_c1f=self._updating,key,data;
if(typeof _c1d.set==="function"){
_c1d.set(_c1c);
}else{
for(key in _c1c){
_c1d[key]=_c1c[key];
}
}
for(key in _c1e){
data=_c1e[key].set(_c1d);
if(data!==undefined){
_c1d[key]=data;
}
}
_c1f[id]=true;
return _bf7.when(_c17.put(_c1d),function(){
delete _c18[id];
delete _c1f[id];
});
};
};
for(var id in _c18){
var put=_c1b(id,_c18[id]);
_c19=_c19.then(_c1a(id)).then(put);
}
dfd.resolve();
return _c19;
},revert:function(){
this.dirty={};
this.refresh();
},_trackError:function(func){
var _c20;
if(typeof func=="string"){
func=lang.hitch(this,func);
}
try{
_c20=func();
}
catch(err){
_bfb.call(this,err);
}
return _bf7.when(_c20,noop,lang.hitch(this,_bfb));
},newRow:function(){
if(this.noDataNode){
put(this.noDataNode,"!");
delete this.noDataNode;
}
return this.inherited(arguments);
},removeRow:function(_c21,_c22){
var row={element:_c21};
if(!_c22&&this.noDataMessage&&(this.up(row).element===_c21)&&(this.down(row).element===_c21)){
this.noDataNode=put(this.contentNode,"div.dgrid-no-data");
this.noDataNode.innerHTML=this.noDataMessage;
}
return this.inherited(arguments);
}});
});
},"dijit/form/FilteringSelect":function(){
define(["dojo/_base/declare","dojo/_base/lang","dojo/when","./MappedTextBox","./ComboBoxMixin"],function(_c23,lang,when,_c24,_c25){
return _c23("dijit.form.FilteringSelect",[_c24,_c25],{required:true,_lastDisplayedValue:"",_isValidSubset:function(){
return this._opened;
},isValid:function(){
return !!this.item||(!this.required&&this.get("displayedValue")=="");
},_refreshState:function(){
if(!this.searchTimer){
this.inherited(arguments);
}
},_callbackSetLabel:function(_c26,_c27,_c28,_c29){
if((_c27&&_c27[this.searchAttr]!==this._lastQuery)||(!_c27&&_c26.length&&this.store.getIdentity(_c26[0])!=this._lastQuery)){
return;
}
if(!_c26.length){
this.set("value","",_c29||(_c29===undefined&&!this.focused),this.textbox.value,null);
}else{
this.set("item",_c26[0],_c29);
}
},_openResultList:function(_c2a,_c2b,_c2c){
if(_c2b[this.searchAttr]!==this._lastQuery){
return;
}
this.inherited(arguments);
if(this.item===undefined){
this.validate(true);
}
},_getValueAttr:function(){
return this.valueNode.value;
},_getValueField:function(){
return "value";
},_setValueAttr:function(_c2d,_c2e,_c2f,item){
if(!this._onChangeActive){
_c2e=null;
}
if(item===undefined){
if(_c2d===null||_c2d===""){
_c2d="";
if(!lang.isString(_c2f)){
this._setDisplayedValueAttr(_c2f||"",_c2e);
return;
}
}
var self=this;
this._lastQuery=_c2d;
when(this.store.get(_c2d),function(item){
self._callbackSetLabel(item?[item]:[],undefined,undefined,_c2e);
});
}else{
this.valueNode.value=_c2d;
this.inherited(arguments);
}
},_setItemAttr:function(item,_c30,_c31){
this.inherited(arguments);
this._lastDisplayedValue=this.textbox.value;
},_getDisplayQueryString:function(text){
return text.replace(/([\\\*\?])/g,"\\$1");
},_setDisplayedValueAttr:function(_c32,_c33){
if(_c32==null){
_c32="";
}
if(!this._created){
if(!("displayedValue" in this.params)){
return;
}
_c33=false;
}
if(this.store){
this.closeDropDown();
var _c34=lang.clone(this.query);
var qs=this._getDisplayQueryString(_c32),q;
if(this.store._oldAPI){
q=qs;
}else{
q=this._patternToRegExp(qs);
q.toString=function(){
return qs;
};
}
this._lastQuery=_c34[this.searchAttr]=q;
this.textbox.value=_c32;
this._lastDisplayedValue=_c32;
this._set("displayedValue",_c32);
var _c35=this;
var _c36={queryOptions:{ignoreCase:this.ignoreCase,deep:true}};
lang.mixin(_c36,this.fetchProperties);
this._fetchHandle=this.store.query(_c34,_c36);
when(this._fetchHandle,function(_c37){
_c35._fetchHandle=null;
_c35._callbackSetLabel(_c37||[],_c34,_c36,_c33);
},function(err){
_c35._fetchHandle=null;
if(!_c35._cancelingQuery){
console.error("dijit.form.FilteringSelect: "+err.toString());
}
});
}
},undo:function(){
this.set("displayedValue",this._lastDisplayedValue);
}});
});
},"dojo/data/util/sorter":function(){
define(["../../_base/lang"],function(lang){
var _c38={};
lang.setObject("dojo.data.util.sorter",_c38);
_c38.basicComparator=function(a,b){
var r=-1;
if(a===null){
a=undefined;
}
if(b===null){
b=undefined;
}
if(a==b){
r=0;
}else{
if(a>b||a==null){
r=1;
}
}
return r;
};
_c38.createSortFunction=function(_c39,_c3a){
var _c3b=[];
function _c3c(attr,dir,comp,s){
return function(_c3d,_c3e){
var a=s.getValue(_c3d,attr);
var b=s.getValue(_c3e,attr);
return dir*comp(a,b);
};
};
var _c3f;
var map=_c3a.comparatorMap;
var bc=_c38.basicComparator;
for(var i=0;i<_c39.length;i++){
_c3f=_c39[i];
var attr=_c3f.attribute;
if(attr){
var dir=(_c3f.descending)?-1:1;
var comp=bc;
if(map){
if(typeof attr!=="string"&&("toString" in attr)){
attr=attr.toString();
}
comp=map[attr]||bc;
}
_c3b.push(_c3c(attr,dir,comp,_c3a));
}
}
return function(rowA,rowB){
var i=0;
while(i<_c3b.length){
var ret=_c3b[i++](rowA,rowB);
if(ret!==0){
return ret;
}
}
return 0;
};
};
return _c38;
});
},"dijit/form/_ButtonMixin":function(){
define(["dojo/_base/declare","dojo/dom","dojo/has","../registry"],function(_c40,dom,has,_c41){
var _c42=_c40("dijit.form._ButtonMixin"+(has("dojo-bidi")?"_NoBidi":""),null,{label:"",type:"button",__onClick:function(e){
e.stopPropagation();
e.preventDefault();
if(!this.disabled){
this.valueNode.click(e);
}
return false;
},_onClick:function(e){
if(this.disabled){
e.stopPropagation();
e.preventDefault();
return false;
}
if(this.onClick(e)===false){
e.preventDefault();
}
var _c43=e.defaultPrevented;
if(!_c43&&this.type=="submit"&&!(this.valueNode||this.focusNode).form){
for(var node=this.domNode;node.parentNode;node=node.parentNode){
var _c44=_c41.byNode(node);
if(_c44&&typeof _c44._onSubmit=="function"){
_c44._onSubmit(e);
e.preventDefault();
_c43=true;
break;
}
}
}
return !_c43;
},postCreate:function(){
this.inherited(arguments);
dom.setSelectable(this.focusNode,false);
},onClick:function(){
return true;
},_setLabelAttr:function(_c45){
this._set("label",_c45);
var _c46=this.containerNode||this.focusNode;
_c46.innerHTML=_c45;
}});
if(has("dojo-bidi")){
_c42=_c40("dijit.form._ButtonMixin",_c42,{_setLabelAttr:function(){
this.inherited(arguments);
var _c47=this.containerNode||this.focusNode;
this.applyTextDir(_c47);
}});
}
return _c42;
});
},"dojo/colors":function(){
define(["./_base/kernel","./_base/lang","./_base/Color","./_base/array"],function(dojo,lang,_c48,_c49){
var _c4a={};
lang.setObject("dojo.colors",_c4a);
var _c4b=function(m1,m2,h){
if(h<0){
++h;
}
if(h>1){
--h;
}
var h6=6*h;
if(h6<1){
return m1+(m2-m1)*h6;
}
if(2*h<1){
return m2;
}
if(3*h<2){
return m1+(m2-m1)*(2/3-h)*6;
}
return m1;
};
dojo.colorFromRgb=_c48.fromRgb=function(_c4c,obj){
var m=_c4c.toLowerCase().match(/^(rgba?|hsla?)\(([\s\.\-,%0-9]+)\)/);
if(m){
var c=m[2].split(/\s*,\s*/),l=c.length,t=m[1],a;
if((t=="rgb"&&l==3)||(t=="rgba"&&l==4)){
var r=c[0];
if(r.charAt(r.length-1)=="%"){
a=_c49.map(c,function(x){
return parseFloat(x)*2.56;
});
if(l==4){
a[3]=c[3];
}
return _c48.fromArray(a,obj);
}
return _c48.fromArray(c,obj);
}
if((t=="hsl"&&l==3)||(t=="hsla"&&l==4)){
var H=((parseFloat(c[0])%360)+360)%360/360,S=parseFloat(c[1])/100,L=parseFloat(c[2])/100,m2=L<=0.5?L*(S+1):L+S-L*S,m1=2*L-m2;
a=[_c4b(m1,m2,H+1/3)*256,_c4b(m1,m2,H)*256,_c4b(m1,m2,H-1/3)*256,1];
if(l==4){
a[3]=c[3];
}
return _c48.fromArray(a,obj);
}
}
return null;
};
var _c4d=function(c,low,high){
c=Number(c);
return isNaN(c)?high:c<low?low:c>high?high:c;
};
_c48.prototype.sanitize=function(){
var t=this;
t.r=Math.round(_c4d(t.r,0,255));
t.g=Math.round(_c4d(t.g,0,255));
t.b=Math.round(_c4d(t.b,0,255));
t.a=_c4d(t.a,0,1);
return this;
};
_c4a.makeGrey=_c48.makeGrey=function(g,a){
return _c48.fromArray([g,g,g,a]);
};
lang.mixin(_c48.named,{"aliceblue":[240,248,255],"antiquewhite":[250,235,215],"aquamarine":[127,255,212],"azure":[240,255,255],"beige":[245,245,220],"bisque":[255,228,196],"blanchedalmond":[255,235,205],"blueviolet":[138,43,226],"brown":[165,42,42],"burlywood":[222,184,135],"cadetblue":[95,158,160],"chartreuse":[127,255,0],"chocolate":[210,105,30],"coral":[255,127,80],"cornflowerblue":[100,149,237],"cornsilk":[255,248,220],"crimson":[220,20,60],"cyan":[0,255,255],"darkblue":[0,0,139],"darkcyan":[0,139,139],"darkgoldenrod":[184,134,11],"darkgray":[169,169,169],"darkgreen":[0,100,0],"darkgrey":[169,169,169],"darkkhaki":[189,183,107],"darkmagenta":[139,0,139],"darkolivegreen":[85,107,47],"darkorange":[255,140,0],"darkorchid":[153,50,204],"darkred":[139,0,0],"darksalmon":[233,150,122],"darkseagreen":[143,188,143],"darkslateblue":[72,61,139],"darkslategray":[47,79,79],"darkslategrey":[47,79,79],"darkturquoise":[0,206,209],"darkviolet":[148,0,211],"deeppink":[255,20,147],"deepskyblue":[0,191,255],"dimgray":[105,105,105],"dimgrey":[105,105,105],"dodgerblue":[30,144,255],"firebrick":[178,34,34],"floralwhite":[255,250,240],"forestgreen":[34,139,34],"gainsboro":[220,220,220],"ghostwhite":[248,248,255],"gold":[255,215,0],"goldenrod":[218,165,32],"greenyellow":[173,255,47],"grey":[128,128,128],"honeydew":[240,255,240],"hotpink":[255,105,180],"indianred":[205,92,92],"indigo":[75,0,130],"ivory":[255,255,240],"khaki":[240,230,140],"lavender":[230,230,250],"lavenderblush":[255,240,245],"lawngreen":[124,252,0],"lemonchiffon":[255,250,205],"lightblue":[173,216,230],"lightcoral":[240,128,128],"lightcyan":[224,255,255],"lightgoldenrodyellow":[250,250,210],"lightgray":[211,211,211],"lightgreen":[144,238,144],"lightgrey":[211,211,211],"lightpink":[255,182,193],"lightsalmon":[255,160,122],"lightseagreen":[32,178,170],"lightskyblue":[135,206,250],"lightslategray":[119,136,153],"lightslategrey":[119,136,153],"lightsteelblue":[176,196,222],"lightyellow":[255,255,224],"limegreen":[50,205,50],"linen":[250,240,230],"magenta":[255,0,255],"mediumaquamarine":[102,205,170],"mediumblue":[0,0,205],"mediumorchid":[186,85,211],"mediumpurple":[147,112,219],"mediumseagreen":[60,179,113],"mediumslateblue":[123,104,238],"mediumspringgreen":[0,250,154],"mediumturquoise":[72,209,204],"mediumvioletred":[199,21,133],"midnightblue":[25,25,112],"mintcream":[245,255,250],"mistyrose":[255,228,225],"moccasin":[255,228,181],"navajowhite":[255,222,173],"oldlace":[253,245,230],"olivedrab":[107,142,35],"orange":[255,165,0],"orangered":[255,69,0],"orchid":[218,112,214],"palegoldenrod":[238,232,170],"palegreen":[152,251,152],"paleturquoise":[175,238,238],"palevioletred":[219,112,147],"papayawhip":[255,239,213],"peachpuff":[255,218,185],"peru":[205,133,63],"pink":[255,192,203],"plum":[221,160,221],"powderblue":[176,224,230],"rosybrown":[188,143,143],"royalblue":[65,105,225],"saddlebrown":[139,69,19],"salmon":[250,128,114],"sandybrown":[244,164,96],"seagreen":[46,139,87],"seashell":[255,245,238],"sienna":[160,82,45],"skyblue":[135,206,235],"slateblue":[106,90,205],"slategray":[112,128,144],"slategrey":[112,128,144],"snow":[255,250,250],"springgreen":[0,255,127],"steelblue":[70,130,180],"tan":[210,180,140],"thistle":[216,191,216],"tomato":[255,99,71],"turquoise":[64,224,208],"violet":[238,130,238],"wheat":[245,222,179],"whitesmoke":[245,245,245],"yellowgreen":[154,205,50]});
return _c48;
});
},"dijit/registry":function(){
define(["dojo/_base/array","dojo/sniff","dojo/_base/window","./main"],function(_c4e,has,win,_c4f){
var _c50={},hash={};
var _c51={length:0,add:function(_c52){
if(hash[_c52.id]){
throw new Error("Tried to register widget with id=="+_c52.id+" but that id is already registered");
}
hash[_c52.id]=_c52;
this.length++;
},remove:function(id){
if(hash[id]){
delete hash[id];
this.length--;
}
},byId:function(id){
return typeof id=="string"?hash[id]:id;
},byNode:function(node){
return hash[node.getAttribute("widgetId")];
},toArray:function(){
var ar=[];
for(var id in hash){
ar.push(hash[id]);
}
return ar;
},getUniqueId:function(_c53){
var id;
do{
id=_c53+"_"+(_c53 in _c50?++_c50[_c53]:_c50[_c53]=0);
}while(hash[id]);
return _c4f._scopeName=="dijit"?id:_c4f._scopeName+"_"+id;
},findWidgets:function(root,_c54){
var _c55=[];
function _c56(root){
for(var node=root.firstChild;node;node=node.nextSibling){
if(node.nodeType==1){
var _c57=node.getAttribute("widgetId");
if(_c57){
var _c58=hash[_c57];
if(_c58){
_c55.push(_c58);
}
}else{
if(node!==_c54){
_c56(node);
}
}
}
}
};
_c56(root);
return _c55;
},_destroyAll:function(){
_c4f._curFocus=null;
_c4f._prevFocus=null;
_c4f._activeStack=[];
_c4e.forEach(_c51.findWidgets(win.body()),function(_c59){
if(!_c59._destroyed){
if(_c59.destroyRecursive){
_c59.destroyRecursive();
}else{
if(_c59.destroy){
_c59.destroy();
}
}
}
});
},getEnclosingWidget:function(node){
while(node){
var id=node.nodeType==1&&node.getAttribute("widgetId");
if(id){
return hash[id];
}
node=node.parentNode;
}
return null;
},_hash:hash};
_c4f.registry=_c51;
return _c51;
});
},"dijit/tree/_dndContainer":function(){
define(["dojo/aspect","dojo/_base/declare","dojo/dom-class","dojo/_base/lang","dojo/on","dojo/touch"],function(_c5a,_c5b,_c5c,lang,on,_c5d){
return _c5b("dijit.tree._dndContainer",null,{constructor:function(tree,_c5e){
this.tree=tree;
this.node=tree.domNode;
lang.mixin(this,_c5e);
this.containerState="";
_c5c.add(this.node,"dojoDndContainer");
this.events=[on(this.node,_c5d.enter,lang.hitch(this,"onOverEvent")),on(this.node,_c5d.leave,lang.hitch(this,"onOutEvent")),_c5a.after(this.tree,"_onNodeMouseEnter",lang.hitch(this,"onMouseOver"),true),_c5a.after(this.tree,"_onNodeMouseLeave",lang.hitch(this,"onMouseOut"),true),on(this.node,"dragstart, selectstart",function(evt){
evt.preventDefault();
})];
},destroy:function(){
var h;
while(h=this.events.pop()){
h.remove();
}
this.node=this.parent=null;
},onMouseOver:function(_c5f){
this.current=_c5f;
},onMouseOut:function(){
this.current=null;
},_changeState:function(type,_c60){
var _c61="dojoDnd"+type;
var _c62=type.toLowerCase()+"State";
_c5c.replace(this.node,_c61+_c60,_c61+this[_c62]);
this[_c62]=_c60;
},_addItemClass:function(node,type){
_c5c.add(node,"dojoDndItem"+type);
},_removeItemClass:function(node,type){
_c5c.remove(node,"dojoDndItem"+type);
},onOverEvent:function(){
this._changeState("Container","Over");
},onOutEvent:function(){
this._changeState("Container","");
}});
});
},"dojo/date/locale":function(){
define(["../_base/lang","../_base/array","../date","../cldr/supplemental","../i18n","../regexp","../string","../i18n!../cldr/nls/gregorian","module"],function(lang,_c63,date,_c64,i18n,_c65,_c66,_c67,_c68){
var _c69={};
lang.setObject(_c68.id.replace(/\//g,"."),_c69);
function _c6a(_c6b,_c6c,_c6d,_c6e){
return _c6e.replace(/([a-z])\1*/ig,function(_c6f){
var s,pad,c=_c6f.charAt(0),l=_c6f.length,_c70=["abbr","wide","narrow"];
switch(c){
case "G":
s=_c6c[(l<4)?"eraAbbr":"eraNames"][_c6b.getFullYear()<0?0:1];
break;
case "y":
s=_c6b.getFullYear();
switch(l){
case 1:
break;
case 2:
if(!_c6d.fullYear){
s=String(s);
s=s.substr(s.length-2);
break;
}
default:
pad=true;
}
break;
case "Q":
case "q":
s=Math.ceil((_c6b.getMonth()+1)/3);
pad=true;
break;
case "M":
case "L":
var m=_c6b.getMonth();
if(l<3){
s=m+1;
pad=true;
}else{
var _c71=["months",c=="L"?"standAlone":"format",_c70[l-3]].join("-");
s=_c6c[_c71][m];
}
break;
case "w":
var _c72=0;
s=_c69._getWeekOfYear(_c6b,_c72);
pad=true;
break;
case "d":
s=_c6b.getDate();
pad=true;
break;
case "D":
s=_c69._getDayOfYear(_c6b);
pad=true;
break;
case "e":
case "c":
var d=_c6b.getDay();
if(l<2){
s=(d-_c64.getFirstDayOfWeek(_c6d.locale)+8)%7;
break;
}
case "E":
d=_c6b.getDay();
if(l<3){
s=d+1;
pad=true;
}else{
var _c73=["days",c=="c"?"standAlone":"format",_c70[l-3]].join("-");
s=_c6c[_c73][d];
}
break;
case "a":
var _c74=_c6b.getHours()<12?"am":"pm";
s=_c6d[_c74]||_c6c["dayPeriods-format-wide-"+_c74];
break;
case "h":
case "H":
case "K":
case "k":
var h=_c6b.getHours();
switch(c){
case "h":
s=(h%12)||12;
break;
case "H":
s=h;
break;
case "K":
s=(h%12);
break;
case "k":
s=h||24;
break;
}
pad=true;
break;
case "m":
s=_c6b.getMinutes();
pad=true;
break;
case "s":
s=_c6b.getSeconds();
pad=true;
break;
case "S":
s=Math.round(_c6b.getMilliseconds()*Math.pow(10,l-3));
pad=true;
break;
case "v":
case "z":
s=_c69._getZone(_c6b,true,_c6d);
if(s){
break;
}
l=4;
case "Z":
var _c75=_c69._getZone(_c6b,false,_c6d);
var tz=[(_c75<=0?"+":"-"),_c66.pad(Math.floor(Math.abs(_c75)/60),2),_c66.pad(Math.abs(_c75)%60,2)];
if(l==4){
tz.splice(0,0,"GMT");
tz.splice(3,0,":");
}
s=tz.join("");
break;
default:
throw new Error("dojo.date.locale.format: invalid pattern char: "+_c6e);
}
if(pad){
s=_c66.pad(s,l);
}
return s;
});
};
_c69._getZone=function(_c76,_c77,_c78){
if(_c77){
return date.getTimezoneName(_c76);
}else{
return _c76.getTimezoneOffset();
}
};
_c69.format=function(_c79,_c7a){
_c7a=_c7a||{};
var _c7b=i18n.normalizeLocale(_c7a.locale),_c7c=_c7a.formatLength||"short",_c7d=_c69._getGregorianBundle(_c7b),str=[],_c7e=lang.hitch(this,_c6a,_c79,_c7d,_c7a);
if(_c7a.selector=="year"){
return _c7f(_c7d["dateFormatItem-yyyy"]||"yyyy",_c7e);
}
var _c80;
if(_c7a.selector!="date"){
_c80=_c7a.timePattern||_c7d["timeFormat-"+_c7c];
if(_c80){
str.push(_c7f(_c80,_c7e));
}
}
if(_c7a.selector!="time"){
_c80=_c7a.datePattern||_c7d["dateFormat-"+_c7c];
if(_c80){
str.push(_c7f(_c80,_c7e));
}
}
return str.length==1?str[0]:_c7d["dateTimeFormat-"+_c7c].replace(/\'/g,"").replace(/\{(\d+)\}/g,function(_c81,key){
return str[key];
});
};
_c69.regexp=function(_c82){
return _c69._parseInfo(_c82).regexp;
};
_c69._parseInfo=function(_c83){
_c83=_c83||{};
var _c84=i18n.normalizeLocale(_c83.locale),_c85=_c69._getGregorianBundle(_c84),_c86=_c83.formatLength||"short",_c87=_c83.datePattern||_c85["dateFormat-"+_c86],_c88=_c83.timePattern||_c85["timeFormat-"+_c86],_c89;
if(_c83.selector=="date"){
_c89=_c87;
}else{
if(_c83.selector=="time"){
_c89=_c88;
}else{
_c89=_c85["dateTimeFormat-"+_c86].replace(/\{(\d+)\}/g,function(_c8a,key){
return [_c88,_c87][key];
});
}
}
var _c8b=[],re=_c7f(_c89,lang.hitch(this,_c8c,_c8b,_c85,_c83));
return {regexp:re,tokens:_c8b,bundle:_c85};
};
_c69.parse=function(_c8d,_c8e){
var _c8f=/[\u200E\u200F\u202A\u202E]/g,info=_c69._parseInfo(_c8e),_c90=info.tokens,_c91=info.bundle,re=new RegExp("^"+info.regexp.replace(_c8f,"")+"$",info.strict?"":"i"),_c92=re.exec(_c8d&&_c8d.replace(_c8f,""));
if(!_c92){
return null;
}
var _c93=["abbr","wide","narrow"],_c94=[1970,0,1,0,0,0,0],amPm="",_c95=_c63.every(_c92,function(v,i){
if(!i){
return true;
}
var _c96=_c90[i-1],l=_c96.length,c=_c96.charAt(0);
switch(c){
case "y":
if(l!=2&&_c8e.strict){
_c94[0]=v;
}else{
if(v<100){
v=Number(v);
var year=""+new Date().getFullYear(),_c97=year.substring(0,2)*100,_c98=Math.min(Number(year.substring(2,4))+20,99);
_c94[0]=(v<_c98)?_c97+v:_c97-100+v;
}else{
if(_c8e.strict){
return false;
}
_c94[0]=v;
}
}
break;
case "M":
case "L":
if(l>2){
var _c99=_c91["months-"+(c=="L"?"standAlone":"format")+"-"+_c93[l-3]].concat();
if(!_c8e.strict){
v=v.replace(".","").toLowerCase();
_c99=_c63.map(_c99,function(s){
return s.replace(".","").toLowerCase();
});
}
v=_c63.indexOf(_c99,v);
if(v==-1){
return false;
}
}else{
v--;
}
_c94[1]=v;
break;
case "E":
case "e":
case "c":
var days=_c91["days-"+(c=="c"?"standAlone":"format")+"-"+_c93[l-3]].concat();
if(!_c8e.strict){
v=v.toLowerCase();
days=_c63.map(days,function(d){
return d.toLowerCase();
});
}
v=_c63.indexOf(days,v);
if(v==-1){
return false;
}
break;
case "D":
_c94[1]=0;
case "d":
_c94[2]=v;
break;
case "a":
var am=_c8e.am||_c91["dayPeriods-format-wide-am"],pm=_c8e.pm||_c91["dayPeriods-format-wide-pm"];
if(!_c8e.strict){
var _c9a=/\./g;
v=v.replace(_c9a,"").toLowerCase();
am=am.replace(_c9a,"").toLowerCase();
pm=pm.replace(_c9a,"").toLowerCase();
}
if(_c8e.strict&&v!=am&&v!=pm){
return false;
}
amPm=(v==pm)?"p":(v==am)?"a":"";
break;
case "K":
if(v==24){
v=0;
}
case "h":
case "H":
case "k":
if(v>23){
return false;
}
_c94[3]=v;
break;
case "m":
_c94[4]=v;
break;
case "s":
_c94[5]=v;
break;
case "S":
_c94[6]=v;
}
return true;
});
var _c9b=+_c94[3];
if(amPm==="p"&&_c9b<12){
_c94[3]=_c9b+12;
}else{
if(amPm==="a"&&_c9b==12){
_c94[3]=0;
}
}
var _c9c=new Date(_c94[0],_c94[1],_c94[2],_c94[3],_c94[4],_c94[5],_c94[6]);
if(_c8e.strict){
_c9c.setFullYear(_c94[0]);
}
var _c9d=_c90.join(""),_c9e=_c9d.indexOf("d")!=-1,_c9f=_c9d.indexOf("M")!=-1;
if(!_c95||(_c9f&&_c9c.getMonth()>_c94[1])||(_c9e&&_c9c.getDate()>_c94[2])){
return null;
}
if((_c9f&&_c9c.getMonth()<_c94[1])||(_c9e&&_c9c.getDate()<_c94[2])){
_c9c=date.add(_c9c,"hour",1);
}
return _c9c;
};
function _c7f(_ca0,_ca1,_ca2,_ca3){
var _ca4=function(x){
return x;
};
_ca1=_ca1||_ca4;
_ca2=_ca2||_ca4;
_ca3=_ca3||_ca4;
var _ca5=_ca0.match(/(''|[^'])+/g),_ca6=_ca0.charAt(0)=="'";
_c63.forEach(_ca5,function(_ca7,i){
if(!_ca7){
_ca5[i]="";
}else{
_ca5[i]=(_ca6?_ca2:_ca1)(_ca7.replace(/''/g,"'"));
_ca6=!_ca6;
}
});
return _ca3(_ca5.join(""));
};
function _c8c(_ca8,_ca9,_caa,_cab){
_cab=_c65.escapeString(_cab);
if(!_caa.strict){
_cab=_cab.replace(" a"," ?a");
}
return _cab.replace(/([a-z])\1*/ig,function(_cac){
var s,c=_cac.charAt(0),l=_cac.length,p2="",p3="";
if(_caa.strict){
if(l>1){
p2="0"+"{"+(l-1)+"}";
}
if(l>2){
p3="0"+"{"+(l-2)+"}";
}
}else{
p2="0?";
p3="0{0,2}";
}
switch(c){
case "y":
s="\\d{2,4}";
break;
case "M":
case "L":
s=(l>2)?"\\S+?":"1[0-2]|"+p2+"[1-9]";
break;
case "D":
s="[12][0-9][0-9]|3[0-5][0-9]|36[0-6]|"+p2+"[1-9][0-9]|"+p3+"[1-9]";
break;
case "d":
s="3[01]|[12]\\d|"+p2+"[1-9]";
break;
case "w":
s="[1-4][0-9]|5[0-3]|"+p2+"[1-9]";
break;
case "E":
case "e":
case "c":
s=".+?";
break;
case "h":
s="1[0-2]|"+p2+"[1-9]";
break;
case "k":
s="1[01]|"+p2+"\\d";
break;
case "H":
s="1\\d|2[0-3]|"+p2+"\\d";
break;
case "K":
s="1\\d|2[0-4]|"+p2+"[1-9]";
break;
case "m":
case "s":
s="[0-5]\\d";
break;
case "S":
s="\\d{"+l+"}";
break;
case "a":
var am=_caa.am||_ca9["dayPeriods-format-wide-am"],pm=_caa.pm||_ca9["dayPeriods-format-wide-pm"];
s=am+"|"+pm;
if(!_caa.strict){
if(am!=am.toLowerCase()){
s+="|"+am.toLowerCase();
}
if(pm!=pm.toLowerCase()){
s+="|"+pm.toLowerCase();
}
if(s.indexOf(".")!=-1){
s+="|"+s.replace(/\./g,"");
}
}
s=s.replace(/\./g,"\\.");
break;
default:
s=".*";
}
if(_ca8){
_ca8.push(_cac);
}
return "("+s+")";
}).replace(/[\xa0 ]/g,"[\\s\\xa0]");
};
var _cad=[];
_c69.addCustomFormats=function(_cae,_caf){
_cad.push({pkg:_cae,name:_caf});
};
_c69._getGregorianBundle=function(_cb0){
var _cb1={};
_c63.forEach(_cad,function(desc){
var _cb2=i18n.getLocalization(desc.pkg,desc.name,_cb0);
_cb1=lang.mixin(_cb1,_cb2);
},this);
return _cb1;
};
_c69.addCustomFormats(_c68.id.replace(/\/date\/locale$/,".cldr"),"gregorian");
_c69.getNames=function(item,type,_cb3,_cb4){
var _cb5,_cb6=_c69._getGregorianBundle(_cb4),_cb7=[item,_cb3,type];
if(_cb3=="standAlone"){
var key=_cb7.join("-");
_cb5=_cb6[key];
if(_cb5[0]==1){
_cb5=undefined;
}
}
_cb7[1]="format";
return (_cb5||_cb6[_cb7.join("-")]).concat();
};
_c69.isWeekend=function(_cb8,_cb9){
var _cba=_c64.getWeekend(_cb9),day=(_cb8||new Date()).getDay();
if(_cba.end<_cba.start){
_cba.end+=7;
if(day<_cba.start){
day+=7;
}
}
return day>=_cba.start&&day<=_cba.end;
};
_c69._getDayOfYear=function(_cbb){
return date.difference(new Date(_cbb.getFullYear(),0,1,_cbb.getHours()),_cbb)+1;
};
_c69._getWeekOfYear=function(_cbc,_cbd){
if(arguments.length==1){
_cbd=0;
}
var _cbe=new Date(_cbc.getFullYear(),0,1).getDay(),adj=(_cbe-_cbd+7)%7,week=Math.floor((_c69._getDayOfYear(_cbc)+adj-1)/7);
if(_cbe==_cbd){
week++;
}
return week;
};
return _c69;
});
},"dijit/_base/wai":function(){
define(["dojo/dom-attr","dojo/_base/lang","../main","../hccss"],function(_cbf,lang,_cc0){
var _cc1={hasWaiRole:function(elem,role){
var _cc2=this.getWaiRole(elem);
return role?(_cc2.indexOf(role)>-1):(_cc2.length>0);
},getWaiRole:function(elem){
return lang.trim((_cbf.get(elem,"role")||"").replace("wairole:",""));
},setWaiRole:function(elem,role){
_cbf.set(elem,"role",role);
},removeWaiRole:function(elem,role){
var _cc3=_cbf.get(elem,"role");
if(!_cc3){
return;
}
if(role){
var t=lang.trim((" "+_cc3+" ").replace(" "+role+" "," "));
_cbf.set(elem,"role",t);
}else{
elem.removeAttribute("role");
}
},hasWaiState:function(elem,_cc4){
return elem.hasAttribute?elem.hasAttribute("aria-"+_cc4):!!elem.getAttribute("aria-"+_cc4);
},getWaiState:function(elem,_cc5){
return elem.getAttribute("aria-"+_cc5)||"";
},setWaiState:function(elem,_cc6,_cc7){
elem.setAttribute("aria-"+_cc6,_cc7);
},removeWaiState:function(elem,_cc8){
elem.removeAttribute("aria-"+_cc8);
}};
lang.mixin(_cc0,_cc1);
return _cc0;
});
},"dijit/form/_FormSelectWidget":function(){
define(["dojo/_base/array","dojo/_base/Deferred","dojo/aspect","dojo/data/util/sorter","dojo/_base/declare","dojo/dom","dojo/dom-class","dojo/_base/kernel","dojo/_base/lang","dojo/query","dojo/when","dojo/store/util/QueryResults","./_FormValueWidget"],function(_cc9,_cca,_ccb,_ccc,_ccd,dom,_cce,_ccf,lang,_cd0,when,_cd1,_cd2){
var _cd3=_ccd("dijit.form._FormSelectWidget",_cd2,{multiple:false,options:null,store:null,query:null,queryOptions:null,labelAttr:"",onFetch:null,sortByLabel:true,loadChildrenOnOpen:false,onLoadDeferred:null,getOptions:function(_cd4){
var opts=this.options||[];
if(_cd4==null){
return opts;
}
if(lang.isArray(_cd4)){
return _cc9.map(_cd4,"return this.getOptions(item);",this);
}
if(lang.isString(_cd4)){
_cd4={value:_cd4};
}
if(lang.isObject(_cd4)){
if(!_cc9.some(opts,function(_cd5,idx){
for(var a in _cd4){
if(!(a in _cd5)||_cd5[a]!=_cd4[a]){
return false;
}
}
_cd4=idx;
return true;
})){
_cd4=-1;
}
}
if(_cd4>=0&&_cd4<opts.length){
return opts[_cd4];
}
return null;
},addOption:function(_cd6){
_cc9.forEach(lang.isArray(_cd6)?_cd6:[_cd6],function(i){
if(i&&lang.isObject(i)){
this.options.push(i);
}
},this);
this._loadChildren();
},removeOption:function(_cd7){
var _cd8=this.getOptions(lang.isArray(_cd7)?_cd7:[_cd7]);
_cc9.forEach(_cd8,function(_cd9){
if(_cd9){
this.options=_cc9.filter(this.options,function(node){
return (node.value!==_cd9.value||node.label!==_cd9.label);
});
this._removeOptionItem(_cd9);
}
},this);
this._loadChildren();
},updateOption:function(_cda){
_cc9.forEach(lang.isArray(_cda)?_cda:[_cda],function(i){
var _cdb=this.getOptions({value:i.value}),k;
if(_cdb){
for(k in i){
_cdb[k]=i[k];
}
}
},this);
this._loadChildren();
},setStore:function(_cdc,_cdd,_cde){
var _cdf=this.store;
_cde=_cde||{};
if(_cdf!==_cdc){
var h;
while((h=this._notifyConnections.pop())){
h.remove();
}
if(!_cdc.get){
lang.mixin(_cdc,{_oldAPI:true,get:function(id){
var _ce0=new _cca();
this.fetchItemByIdentity({identity:id,onItem:function(_ce1){
_ce0.resolve(_ce1);
},onError:function(_ce2){
_ce0.reject(_ce2);
}});
return _ce0.promise;
},query:function(_ce3,_ce4){
var _ce5=new _cca(function(){
if(_ce6.abort){
_ce6.abort();
}
});
_ce5.total=new _cca();
var _ce6=this.fetch(lang.mixin({query:_ce3,onBegin:function(_ce7){
_ce5.total.resolve(_ce7);
},onComplete:function(_ce8){
_ce5.resolve(_ce8);
},onError:function(_ce9){
_ce5.reject(_ce9);
}},_ce4));
return new _cd1(_ce5);
}});
if(_cdc.getFeatures()["dojo.data.api.Notification"]){
this._notifyConnections=[_ccb.after(_cdc,"onNew",lang.hitch(this,"_onNewItem"),true),_ccb.after(_cdc,"onDelete",lang.hitch(this,"_onDeleteItem"),true),_ccb.after(_cdc,"onSet",lang.hitch(this,"_onSetItem"),true)];
}
}
this._set("store",_cdc);
}
if(this.options&&this.options.length){
this.removeOption(this.options);
}
if(this._queryRes&&this._queryRes.close){
this._queryRes.close();
}
if(this._observeHandle&&this._observeHandle.remove){
this._observeHandle.remove();
this._observeHandle=null;
}
if(_cde.query){
this._set("query",_cde.query);
this._set("queryOptions",_cde.queryOptions);
}
if(_cdc){
this._loadingStore=true;
this.onLoadDeferred=new _cca();
this._queryRes=_cdc.query(this.query,this.queryOptions);
when(this._queryRes,lang.hitch(this,function(_cea){
if(this.sortByLabel&&!_cde.sort&&_cea.length){
if(_cdc.getValue){
_cea.sort(_ccc.createSortFunction([{attribute:_cdc.getLabelAttributes(_cea[0])[0]}],_cdc));
}else{
var _ceb=this.labelAttr;
_cea.sort(function(a,b){
return a[_ceb]>b[_ceb]?1:b[_ceb]>a[_ceb]?-1:0;
});
}
}
if(_cde.onFetch){
_cea=_cde.onFetch.call(this,_cea,_cde);
}
_cc9.forEach(_cea,function(i){
this._addOptionForItem(i);
},this);
if(this._queryRes.observe){
this._observeHandle=this._queryRes.observe(lang.hitch(this,function(_cec,_ced,_cee){
if(_ced==_cee){
this._onSetItem(_cec);
}else{
if(_ced!=-1){
this._onDeleteItem(_cec);
}
if(_cee!=-1){
this._onNewItem(_cec);
}
}
}),true);
}
this._loadingStore=false;
this.set("value","_pendingValue" in this?this._pendingValue:_cdd);
delete this._pendingValue;
if(!this.loadChildrenOnOpen){
this._loadChildren();
}else{
this._pseudoLoadChildren(_cea);
}
this.onLoadDeferred.resolve(true);
this.onSetStore();
}),function(err){
console.error("dijit.form.Select: "+err.toString());
this.onLoadDeferred.reject(err);
});
}
return _cdf;
},_setValueAttr:function(_cef,_cf0){
if(!this._onChangeActive){
_cf0=null;
}
if(this._loadingStore){
this._pendingValue=_cef;
return;
}
if(_cef==null){
return;
}
if(lang.isArray(_cef)){
_cef=_cc9.map(_cef,function(_cf1){
return lang.isObject(_cf1)?_cf1:{value:_cf1};
});
}else{
if(lang.isObject(_cef)){
_cef=[_cef];
}else{
_cef=[{value:_cef}];
}
}
_cef=_cc9.filter(this.getOptions(_cef),function(i){
return i&&i.value;
});
var opts=this.getOptions()||[];
if(!this.multiple&&(!_cef[0]||!_cef[0].value)&&!!opts.length){
_cef[0]=opts[0];
}
_cc9.forEach(opts,function(opt){
opt.selected=_cc9.some(_cef,function(v){
return v.value===opt.value;
});
});
var val=_cc9.map(_cef,function(opt){
return opt.value;
});
if(typeof val=="undefined"||typeof val[0]=="undefined"){
return;
}
var disp=_cc9.map(_cef,function(opt){
return opt.label;
});
this._setDisplay(this.multiple?disp:disp[0]);
this.inherited(arguments,[this.multiple?val:val[0],_cf0]);
this._updateSelection();
},_getDisplayedValueAttr:function(){
var ret=_cc9.map([].concat(this.get("selectedOptions")),function(v){
if(v&&"label" in v){
return v.label;
}else{
if(v){
return v.value;
}
}
return null;
},this);
return this.multiple?ret:ret[0];
},_setDisplayedValueAttr:function(_cf2){
this.set("value",this.getOptions(typeof _cf2=="string"?{label:_cf2}:_cf2));
},_loadChildren:function(){
if(this._loadingStore){
return;
}
_cc9.forEach(this._getChildren(),function(_cf3){
_cf3.destroyRecursive();
});
_cc9.forEach(this.options,this._addOptionItem,this);
this._updateSelection();
},_updateSelection:function(){
this.focusedChild=null;
this._set("value",this._getValueFromOpts());
var val=[].concat(this.value);
if(val&&val[0]){
var self=this;
_cc9.forEach(this._getChildren(),function(_cf4){
var _cf5=_cc9.some(val,function(v){
return _cf4.option&&(v===_cf4.option.value);
});
if(_cf5&&!self.multiple){
self.focusedChild=_cf4;
}
_cce.toggle(_cf4.domNode,this.baseClass.replace(/\s+|$/g,"SelectedOption "),_cf5);
_cf4.domNode.setAttribute("aria-selected",_cf5?"true":"false");
},this);
}
},_getValueFromOpts:function(){
var opts=this.getOptions()||[];
if(!this.multiple&&opts.length){
var opt=_cc9.filter(opts,function(i){
return i.selected;
})[0];
if(opt&&opt.value){
return opt.value;
}else{
opts[0].selected=true;
return opts[0].value;
}
}else{
if(this.multiple){
return _cc9.map(_cc9.filter(opts,function(i){
return i.selected;
}),function(i){
return i.value;
})||[];
}
}
return "";
},_onNewItem:function(item,_cf6){
if(!_cf6||!_cf6.parent){
this._addOptionForItem(item);
}
},_onDeleteItem:function(item){
var _cf7=this.store;
this.removeOption({value:_cf7.getIdentity(item)});
},_onSetItem:function(item){
this.updateOption(this._getOptionObjForItem(item));
},_getOptionObjForItem:function(item){
var _cf8=this.store,_cf9=(this.labelAttr&&this.labelAttr in item)?item[this.labelAttr]:_cf8.getLabel(item),_cfa=(_cf9?_cf8.getIdentity(item):null);
return {value:_cfa,label:_cf9,item:item};
},_addOptionForItem:function(item){
var _cfb=this.store;
if(_cfb.isItemLoaded&&!_cfb.isItemLoaded(item)){
_cfb.loadItem({item:item,onItem:function(i){
this._addOptionForItem(i);
},scope:this});
return;
}
var _cfc=this._getOptionObjForItem(item);
this.addOption(_cfc);
},constructor:function(_cfd){
this._oValue=(_cfd||{}).value||null;
this._notifyConnections=[];
},buildRendering:function(){
this.inherited(arguments);
dom.setSelectable(this.focusNode,false);
},_fillContent:function(){
if(!this.options){
this.options=this.srcNodeRef?_cd0("> *",this.srcNodeRef).map(function(node){
if(node.getAttribute("type")==="separator"){
return {value:"",label:"",selected:false,disabled:false};
}
return {value:(node.getAttribute("data-"+_ccf._scopeName+"-value")||node.getAttribute("value")),label:String(node.innerHTML),selected:node.getAttribute("selected")||false,disabled:node.getAttribute("disabled")||false};
},this):[];
}
if(!this.value){
this._set("value",this._getValueFromOpts());
}else{
if(this.multiple&&typeof this.value=="string"){
this._set("value",this.value.split(","));
}
}
},postCreate:function(){
this.inherited(arguments);
_ccb.after(this,"onChange",lang.hitch(this,"_updateSelection"));
var _cfe=this.store;
if(_cfe&&(_cfe.getIdentity||_cfe.getFeatures()["dojo.data.api.Identity"])){
this.store=null;
this.setStore(_cfe,this._oValue);
}
},startup:function(){
this._loadChildren();
this.inherited(arguments);
},destroy:function(){
var h;
while((h=this._notifyConnections.pop())){
h.remove();
}
if(this._queryRes&&this._queryRes.close){
this._queryRes.close();
}
if(this._observeHandle&&this._observeHandle.remove){
this._observeHandle.remove();
this._observeHandle=null;
}
this.inherited(arguments);
},_addOptionItem:function(){
},_removeOptionItem:function(){
},_setDisplay:function(){
},_getChildren:function(){
return [];
},_getSelectedOptionsAttr:function(){
return this.getOptions({selected:true});
},_pseudoLoadChildren:function(){
},onSetStore:function(){
}});
return _cd3;
});
},"dijit/form/Select":function(){
define(["dojo/_base/array","dojo/_base/declare","dojo/dom-attr","dojo/dom-class","dojo/dom-geometry","dojo/i18n","dojo/_base/lang","dojo/on","dojo/sniff","./_FormSelectWidget","../_HasDropDown","../DropDownMenu","../MenuItem","../MenuSeparator","../Tooltip","../_KeyNavMixin","../registry","dojo/text!./templates/Select.html","dojo/i18n!./nls/validate"],function(_cff,_d00,_d01,_d02,_d03,i18n,lang,on,has,_d04,_d05,_d06,_d07,_d08,_d09,_d0a,_d0b,_d0c){
var _d0d=_d00("dijit.form._SelectMenu",_d06,{autoFocus:true,buildRendering:function(){
this.inherited(arguments);
this.domNode.setAttribute("role","listbox");
},postCreate:function(){
this.inherited(arguments);
this.own(on(this.domNode,"selectstart",function(evt){
evt.preventDefault();
evt.stopPropagation();
}));
},focus:function(){
var _d0e=false,val=this.parentWidget.value;
if(lang.isArray(val)){
val=val[val.length-1];
}
if(val){
_cff.forEach(this.parentWidget._getChildren(),function(_d0f){
if(_d0f.option&&(val===_d0f.option.value)){
_d0e=true;
this.focusChild(_d0f,false);
}
},this);
}
if(!_d0e){
this.inherited(arguments);
}
}});
var _d10=_d00("dijit.form.Select"+(has("dojo-bidi")?"_NoBidi":""),[_d04,_d05,_d0a],{baseClass:"dijitSelect dijitValidationTextBox",templateString:_d0c,_buttonInputDisabled:has("ie")?"disabled":"",required:false,state:"",message:"",tooltipPosition:[],emptyLabel:"&#160;",_isLoaded:false,_childrenLoaded:false,_fillContent:function(){
this.inherited(arguments);
if(this.options.length&&!this.value&&this.srcNodeRef){
var si=this.srcNodeRef.selectedIndex||0;
this._set("value",this.options[si>=0?si:0].value);
}
this.dropDown=new _d0d({id:this.id+"_menu",parentWidget:this});
_d02.add(this.dropDown.domNode,this.baseClass.replace(/\s+|$/g,"Menu "));
},_getMenuItemForOption:function(_d11){
if(!_d11.value&&!_d11.label){
return new _d08({ownerDocument:this.ownerDocument});
}else{
var _d12=lang.hitch(this,"_setValueAttr",_d11);
var item=new _d07({option:_d11,label:_d11.label||this.emptyLabel,onClick:_d12,ownerDocument:this.ownerDocument,dir:this.dir,textDir:this.textDir,disabled:_d11.disabled||false});
item.focusNode.setAttribute("role","option");
return item;
}
},_addOptionItem:function(_d13){
if(this.dropDown){
this.dropDown.addChild(this._getMenuItemForOption(_d13));
}
},_getChildren:function(){
if(!this.dropDown){
return [];
}
return this.dropDown.getChildren();
},focus:function(){
if(!this.disabled&&this.focusNode.focus){
try{
this.focusNode.focus();
}
catch(e){
}
}
},focusChild:function(_d14){
if(_d14){
this.set("value",_d14.option);
}
},_getFirst:function(){
var _d15=this._getChildren();
return _d15.length?_d15[0]:null;
},_getLast:function(){
var _d16=this._getChildren();
return _d16.length?_d16[_d16.length-1]:null;
},childSelector:function(node){
var node=_d0b.byNode(node);
return node&&node.getParent()==this.dropDown;
},onKeyboardSearch:function(item,evt,_d17,_d18){
if(item){
this.focusChild(item);
}
},_loadChildren:function(_d19){
if(_d19===true){
if(this.dropDown){
delete this.dropDown.focusedChild;
this.focusedChild=null;
}
if(this.options.length){
this.inherited(arguments);
}else{
_cff.forEach(this._getChildren(),function(_d1a){
_d1a.destroyRecursive();
});
var item=new _d07({ownerDocument:this.ownerDocument,label:this.emptyLabel});
this.dropDown.addChild(item);
}
}else{
this._updateSelection();
}
this._isLoaded=false;
this._childrenLoaded=true;
if(!this._loadingStore){
this._setValueAttr(this.value,false);
}
},_refreshState:function(){
if(this._started){
this.validate(this.focused);
}
},startup:function(){
this.inherited(arguments);
this._refreshState();
},_setValueAttr:function(_d1b){
this.inherited(arguments);
_d01.set(this.valueNode,"value",this.get("value"));
this._refreshState();
},_setNameAttr:"valueNode",_setDisabledAttr:function(_d1c){
this.inherited(arguments);
this._refreshState();
},_setRequiredAttr:function(_d1d){
this._set("required",_d1d);
this.focusNode.setAttribute("aria-required",_d1d);
this._refreshState();
},_setOptionsAttr:function(_d1e){
this._isLoaded=false;
this._set("options",_d1e);
},_setDisplay:function(_d1f){
var lbl=_d1f||this.emptyLabel;
this.containerNode.innerHTML="<span role=\"option\" class=\"dijitReset dijitInline "+this.baseClass.replace(/\s+|$/g,"Label ")+"\">"+lbl+"</span>";
},validate:function(_d20){
var _d21=this.disabled||this.isValid(_d20);
this._set("state",_d21?"":(this._hasBeenBlurred?"Error":"Incomplete"));
this.focusNode.setAttribute("aria-invalid",_d21?"false":"true");
var _d22=_d21?"":this._missingMsg;
if(_d22&&this.focused&&this._hasBeenBlurred){
_d09.show(_d22,this.domNode,this.tooltipPosition,!this.isLeftToRight());
}else{
_d09.hide(this.domNode);
}
this._set("message",_d22);
return _d21;
},isValid:function(){
return (!this.required||this.value===0||!(/^\s*$/.test(this.value||"")));
},reset:function(){
this.inherited(arguments);
_d09.hide(this.domNode);
this._refreshState();
},postMixInProperties:function(){
this.inherited(arguments);
this._missingMsg=i18n.getLocalization("dijit.form","validate",this.lang).missingMessage;
},postCreate:function(){
this.inherited(arguments);
this.own(on(this.domNode,"selectstart",function(evt){
evt.preventDefault();
evt.stopPropagation();
}));
this.domNode.setAttribute("aria-expanded","false");
if(has("ie")<9){
this.defer(function(){
try{
var s=domStyle.getComputedStyle(this.domNode);
if(s){
var ff=s.fontFamily;
if(ff){
var _d23=this.domNode.getElementsByTagName("INPUT");
if(_d23){
for(var i=0;i<_d23.length;i++){
_d23[i].style.fontFamily=ff;
}
}
}
}
}
catch(e){
}
});
}
},_setStyleAttr:function(_d24){
this.inherited(arguments);
_d02.toggle(this.domNode,this.baseClass.replace(/\s+|$/g,"FixedWidth "),!!this.domNode.style.width);
},isLoaded:function(){
return this._isLoaded;
},loadDropDown:function(_d25){
this._loadChildren(true);
this._isLoaded=true;
_d25();
},destroy:function(_d26){
if(this.dropDown&&!this.dropDown._destroyed){
this.dropDown.destroyRecursive(_d26);
delete this.dropDown;
}
this.inherited(arguments);
},_onFocus:function(){
this.validate(true);
},_onBlur:function(){
_d09.hide(this.domNode);
this.inherited(arguments);
this.validate(false);
}});
if(has("dojo-bidi")){
_d10=_d00("dijit.form.Select",_d10,{_setDisplay:function(_d27){
this.inherited(arguments);
this.applyTextDir(this.containerNode);
}});
}
_d10._Menu=_d0d;
function _d28(_d29){
return function(evt){
if(!this._isLoaded){
this.loadDropDown(lang.hitch(this,_d29,evt));
}else{
this.inherited(_d29,arguments);
}
};
};
_d10.prototype._onContainerKeydown=_d28("_onContainerKeydown");
_d10.prototype._onContainerKeypress=_d28("_onContainerKeypress");
return _d10;
});
},"dijit/_editor/range":function(){
define(["dojo/_base/array","dojo/_base/declare","dojo/_base/lang"],function(_d2a,_d2b,lang){
var _d2c={getIndex:function(node,_d2d){
var ret=[],retR=[];
var _d2e=node;
var _d2f,n;
while(node!=_d2d){
var i=0;
_d2f=node.parentNode;
while((n=_d2f.childNodes[i++])){
if(n===node){
--i;
break;
}
}
ret.unshift(i);
retR.unshift(i-_d2f.childNodes.length);
node=_d2f;
}
if(ret.length>0&&_d2e.nodeType==3){
n=_d2e.previousSibling;
while(n&&n.nodeType==3){
ret[ret.length-1]--;
n=n.previousSibling;
}
n=_d2e.nextSibling;
while(n&&n.nodeType==3){
retR[retR.length-1]++;
n=n.nextSibling;
}
}
return {o:ret,r:retR};
},getNode:function(_d30,_d31){
if(!lang.isArray(_d30)||_d30.length==0){
return _d31;
}
var node=_d31;
_d2a.every(_d30,function(i){
if(i>=0&&i<node.childNodes.length){
node=node.childNodes[i];
}else{
node=null;
return false;
}
return true;
});
return node;
},getCommonAncestor:function(n1,n2,root){
root=root||n1.ownerDocument.body;
var _d32=function(n){
var as=[];
while(n){
as.unshift(n);
if(n!==root){
n=n.parentNode;
}else{
break;
}
}
return as;
};
var n1as=_d32(n1);
var n2as=_d32(n2);
var m=Math.min(n1as.length,n2as.length);
var com=n1as[0];
for(var i=1;i<m;i++){
if(n1as[i]===n2as[i]){
com=n1as[i];
}else{
break;
}
}
return com;
},getAncestor:function(node,_d33,root){
root=root||node.ownerDocument.body;
while(node&&node!==root){
var name=node.nodeName.toUpperCase();
if(_d33.test(name)){
return node;
}
node=node.parentNode;
}
return null;
},BlockTagNames:/^(?:P|DIV|H1|H2|H3|H4|H5|H6|ADDRESS|PRE|OL|UL|LI|DT|DE)$/,getBlockAncestor:function(node,_d34,root){
root=root||node.ownerDocument.body;
_d34=_d34||_d2c.BlockTagNames;
var _d35=null,_d36;
while(node&&node!==root){
var name=node.nodeName.toUpperCase();
if(!_d35&&_d34.test(name)){
_d35=node;
}
if(!_d36&&(/^(?:BODY|TD|TH|CAPTION)$/).test(name)){
_d36=node;
}
node=node.parentNode;
}
return {blockNode:_d35,blockContainer:_d36||node.ownerDocument.body};
},atBeginningOfContainer:function(_d37,node,_d38){
var _d39=false;
var _d3a=(_d38==0);
if(!_d3a&&node.nodeType==3){
if(/^[\s\xA0]+$/.test(node.nodeValue.substr(0,_d38))){
_d3a=true;
}
}
if(_d3a){
var _d3b=node;
_d39=true;
while(_d3b&&_d3b!==_d37){
if(_d3b.previousSibling){
_d39=false;
break;
}
_d3b=_d3b.parentNode;
}
}
return _d39;
},atEndOfContainer:function(_d3c,node,_d3d){
var _d3e=false;
var _d3f=(_d3d==(node.length||node.childNodes.length));
if(!_d3f&&node.nodeType==3){
if(/^[\s\xA0]+$/.test(node.nodeValue.substr(_d3d))){
_d3f=true;
}
}
if(_d3f){
var _d40=node;
_d3e=true;
while(_d40&&_d40!==_d3c){
if(_d40.nextSibling){
_d3e=false;
break;
}
_d40=_d40.parentNode;
}
}
return _d3e;
},adjacentNoneTextNode:function(_d41,next){
var node=_d41;
var len=(0-_d41.length)||0;
var prop=next?"nextSibling":"previousSibling";
while(node){
if(node.nodeType!=3){
break;
}
len+=node.length;
node=node[prop];
}
return [node,len];
},create:function(win){
win=win||window;
if(win.getSelection){
return win.document.createRange();
}else{
return new _d42();
}
},getSelection:function(_d43,_d44){
if(_d43.getSelection){
return _d43.getSelection();
}else{
var s=new ie.selection(_d43);
if(!_d44){
s._getCurrentSelection();
}
return s;
}
}};
if(!window.getSelection){
var ie=_d2c.ie={cachedSelection:{},selection:function(_d45){
this._ranges=[];
this.addRange=function(r,_d46){
this._ranges.push(r);
if(!_d46){
r._select();
}
this.rangeCount=this._ranges.length;
};
this.removeAllRanges=function(){
this._ranges=[];
this.rangeCount=0;
};
var _d47=function(){
var r=_d45.document.selection.createRange();
var type=_d45.document.selection.type.toUpperCase();
if(type=="CONTROL"){
return new _d42(ie.decomposeControlRange(r));
}else{
return new _d42(ie.decomposeTextRange(r));
}
};
this.getRangeAt=function(i){
return this._ranges[i];
};
this._getCurrentSelection=function(){
this.removeAllRanges();
var r=_d47();
if(r){
this.addRange(r,true);
this.isCollapsed=r.collapsed;
}else{
this.isCollapsed=true;
}
};
},decomposeControlRange:function(_d48){
var _d49=_d48.item(0),_d4a=_d48.item(_d48.length-1);
var _d4b=_d49.parentNode,_d4c=_d4a.parentNode;
var _d4d=_d2c.getIndex(_d49,_d4b).o[0];
var _d4e=_d2c.getIndex(_d4a,_d4c).o[0]+1;
return [_d4b,_d4d,_d4c,_d4e];
},getEndPoint:function(_d4f,end){
var _d50=_d4f.duplicate();
_d50.collapse(!end);
var _d51="EndTo"+(end?"End":"Start");
var _d52=_d50.parentElement();
var _d53,_d54,_d55;
if(_d52.childNodes.length>0){
_d2a.every(_d52.childNodes,function(node,i){
var _d56;
if(node.nodeType!=3){
_d50.moveToElementText(node);
if(_d50.compareEndPoints(_d51,_d4f)>0){
if(_d55&&_d55.nodeType==3){
_d53=_d55;
_d56=true;
}else{
_d53=_d52;
_d54=i;
return false;
}
}else{
if(i==_d52.childNodes.length-1){
_d53=_d52;
_d54=_d52.childNodes.length;
return false;
}
}
}else{
if(i==_d52.childNodes.length-1){
_d53=node;
_d56=true;
}
}
if(_d56&&_d53){
var _d57=_d2c.adjacentNoneTextNode(_d53)[0];
if(_d57){
_d53=_d57.nextSibling;
}else{
_d53=_d52.firstChild;
}
var _d58=_d2c.adjacentNoneTextNode(_d53);
_d57=_d58[0];
var _d59=_d58[1];
if(_d57){
_d50.moveToElementText(_d57);
_d50.collapse(false);
}else{
_d50.moveToElementText(_d52);
}
_d50.setEndPoint(_d51,_d4f);
_d54=_d50.text.length-_d59;
return false;
}
_d55=node;
return true;
});
}else{
_d53=_d52;
_d54=0;
}
if(!end&&_d53.nodeType==1&&_d54==_d53.childNodes.length){
var _d5a=_d53.nextSibling;
if(_d5a&&_d5a.nodeType==3){
_d53=_d5a;
_d54=0;
}
}
return [_d53,_d54];
},setEndPoint:function(_d5b,_d5c,_d5d){
var _d5e=_d5b.duplicate(),node,len;
if(_d5c.nodeType!=3){
if(_d5d>0){
node=_d5c.childNodes[_d5d-1];
if(node){
if(node.nodeType==3){
_d5c=node;
_d5d=node.length;
}else{
if(node.nextSibling&&node.nextSibling.nodeType==3){
_d5c=node.nextSibling;
_d5d=0;
}else{
_d5e.moveToElementText(node.nextSibling?node:_d5c);
var _d5f=node.parentNode;
var _d60=_d5f.insertBefore(node.ownerDocument.createTextNode(" "),node.nextSibling);
_d5e.collapse(false);
_d5f.removeChild(_d60);
}
}
}
}else{
_d5e.moveToElementText(_d5c);
_d5e.collapse(true);
}
}
if(_d5c.nodeType==3){
var _d61=_d2c.adjacentNoneTextNode(_d5c);
var _d62=_d61[0];
len=_d61[1];
if(_d62){
_d5e.moveToElementText(_d62);
_d5e.collapse(false);
if(_d62.contentEditable!="inherit"){
len++;
}
}else{
_d5e.moveToElementText(_d5c.parentNode);
_d5e.collapse(true);
_d5e.move("character",1);
_d5e.move("character",-1);
}
_d5d+=len;
if(_d5d>0){
if(_d5e.move("character",_d5d)!=_d5d){
console.error("Error when moving!");
}
}
}
return _d5e;
},decomposeTextRange:function(_d63){
var _d64=ie.getEndPoint(_d63);
var _d65=_d64[0],_d66=_d64[1];
var _d67=_d64[0],_d68=_d64[1];
if(_d63.htmlText.length){
if(_d63.htmlText==_d63.text){
_d68=_d66+_d63.text.length;
}else{
_d64=ie.getEndPoint(_d63,true);
_d67=_d64[0],_d68=_d64[1];
}
}
return [_d65,_d66,_d67,_d68];
},setRange:function(_d69,_d6a,_d6b,_d6c,_d6d,_d6e){
var _d6f=ie.setEndPoint(_d69,_d6a,_d6b);
_d69.setEndPoint("StartToStart",_d6f);
if(!_d6e){
var end=ie.setEndPoint(_d69,_d6c,_d6d);
}
_d69.setEndPoint("EndToEnd",end||_d6f);
return _d69;
}};
var _d42=_d2c.W3CRange=_d2b(null,{constructor:function(){
if(arguments.length>0){
this.setStart(arguments[0][0],arguments[0][1]);
this.setEnd(arguments[0][2],arguments[0][3]);
}else{
this.commonAncestorContainer=null;
this.startContainer=null;
this.startOffset=0;
this.endContainer=null;
this.endOffset=0;
this.collapsed=true;
}
},_updateInternal:function(){
if(this.startContainer!==this.endContainer){
this.commonAncestorContainer=_d2c.getCommonAncestor(this.startContainer,this.endContainer);
}else{
this.commonAncestorContainer=this.startContainer;
}
this.collapsed=(this.startContainer===this.endContainer)&&(this.startOffset==this.endOffset);
},setStart:function(node,_d70){
_d70=parseInt(_d70);
if(this.startContainer===node&&this.startOffset==_d70){
return;
}
delete this._cachedBookmark;
this.startContainer=node;
this.startOffset=_d70;
if(!this.endContainer){
this.setEnd(node,_d70);
}else{
this._updateInternal();
}
},setEnd:function(node,_d71){
_d71=parseInt(_d71);
if(this.endContainer===node&&this.endOffset==_d71){
return;
}
delete this._cachedBookmark;
this.endContainer=node;
this.endOffset=_d71;
if(!this.startContainer){
this.setStart(node,_d71);
}else{
this._updateInternal();
}
},setStartAfter:function(node,_d72){
this._setPoint("setStart",node,_d72,1);
},setStartBefore:function(node,_d73){
this._setPoint("setStart",node,_d73,0);
},setEndAfter:function(node,_d74){
this._setPoint("setEnd",node,_d74,1);
},setEndBefore:function(node,_d75){
this._setPoint("setEnd",node,_d75,0);
},_setPoint:function(what,node,_d76,ext){
var _d77=_d2c.getIndex(node,node.parentNode).o;
this[what](node.parentNode,_d77.pop()+ext);
},_getIERange:function(){
var r=(this._body||this.endContainer.ownerDocument.body).createTextRange();
ie.setRange(r,this.startContainer,this.startOffset,this.endContainer,this.endOffset,this.collapsed);
return r;
},getBookmark:function(){
this._getIERange();
return this._cachedBookmark;
},_select:function(){
var r=this._getIERange();
r.select();
},deleteContents:function(){
var s=this.startContainer,r=this._getIERange();
if(s.nodeType===3&&!this.startOffset){
this.setStartBefore(s);
}
r.pasteHTML("");
this.endContainer=this.startContainer;
this.endOffset=this.startOffset;
this.collapsed=true;
},cloneRange:function(){
var r=new _d42([this.startContainer,this.startOffset,this.endContainer,this.endOffset]);
r._body=this._body;
return r;
},detach:function(){
this._body=null;
this.commonAncestorContainer=null;
this.startContainer=null;
this.startOffset=0;
this.endContainer=null;
this.endOffset=0;
this.collapsed=true;
}});
}
lang.setObject("dijit.range",_d2c);
return _d2c;
});
},"dijit/_KeyNavMixin":function(){
define(["dojo/_base/array","dojo/_base/declare","dojo/dom-attr","dojo/keys","dojo/_base/lang","dojo/on","dijit/registry","dijit/_FocusMixin"],function(_d78,_d79,_d7a,keys,lang,on,_d7b,_d7c){
return _d79("dijit._KeyNavMixin",_d7c,{tabIndex:"0",childSelector:null,postCreate:function(){
this.inherited(arguments);
_d7a.set(this.domNode,"tabIndex",this.tabIndex);
if(!this._keyNavCodes){
var _d7d=this._keyNavCodes={};
_d7d[keys.HOME]=lang.hitch(this,"focusFirstChild");
_d7d[keys.END]=lang.hitch(this,"focusLastChild");
_d7d[this.isLeftToRight()?keys.LEFT_ARROW:keys.RIGHT_ARROW]=lang.hitch(this,"_onLeftArrow");
_d7d[this.isLeftToRight()?keys.RIGHT_ARROW:keys.LEFT_ARROW]=lang.hitch(this,"_onRightArrow");
_d7d[keys.UP_ARROW]=lang.hitch(this,"_onUpArrow");
_d7d[keys.DOWN_ARROW]=lang.hitch(this,"_onDownArrow");
}
var self=this,_d7e=typeof this.childSelector=="string"?this.childSelector:lang.hitch(this,"childSelector");
this.own(on(this.domNode,"keypress",lang.hitch(this,"_onContainerKeypress")),on(this.domNode,"keydown",lang.hitch(this,"_onContainerKeydown")),on(this.domNode,"focus",lang.hitch(this,"_onContainerFocus")),on(this.containerNode,on.selector(_d7e,"focusin"),function(evt){
self._onChildFocus(_d7b.getEnclosingWidget(this),evt);
}));
},_onLeftArrow:function(){
},_onRightArrow:function(){
},_onUpArrow:function(){
},_onDownArrow:function(){
},focus:function(){
this.focusFirstChild();
},_getFirstFocusableChild:function(){
return this._getNextFocusableChild(null,1);
},_getLastFocusableChild:function(){
return this._getNextFocusableChild(null,-1);
},focusFirstChild:function(){
this.focusChild(this._getFirstFocusableChild());
},focusLastChild:function(){
this.focusChild(this._getLastFocusableChild());
},focusChild:function(_d7f,last){
if(!_d7f){
return;
}
if(this.focusedChild&&_d7f!==this.focusedChild){
this._onChildBlur(this.focusedChild);
}
_d7f.set("tabIndex",this.tabIndex);
_d7f.focus(last?"end":"start");
},_onContainerFocus:function(evt){
if(evt.target!==this.domNode||this.focusedChild){
return;
}
this.focus();
},_onFocus:function(){
_d7a.set(this.domNode,"tabIndex","-1");
this.inherited(arguments);
},_onBlur:function(evt){
_d7a.set(this.domNode,"tabIndex",this.tabIndex);
if(this.focusedChild){
this.focusedChild.set("tabIndex","-1");
this.lastFocusedChild=this.focusedChild;
this._set("focusedChild",null);
}
this.inherited(arguments);
},_onChildFocus:function(_d80){
if(_d80&&_d80!=this.focusedChild){
if(this.focusedChild&&!this.focusedChild._destroyed){
this.focusedChild.set("tabIndex","-1");
}
_d80.set("tabIndex",this.tabIndex);
this.lastFocused=_d80;
this._set("focusedChild",_d80);
}
},_searchString:"",multiCharSearchDuration:1000,onKeyboardSearch:function(item,evt,_d81,_d82){
if(item){
this.focusChild(item);
}
},_keyboardSearchCompare:function(item,_d83){
var _d84=item.domNode,text=item.label||(_d84.focusNode?_d84.focusNode.label:"")||_d84.innerText||_d84.textContent||"",_d85=text.replace(/^\s+/,"").substr(0,_d83.length).toLowerCase();
return (!!_d83.length&&_d85==_d83)?-1:0;
},_onContainerKeydown:function(evt){
var func=this._keyNavCodes[evt.keyCode];
if(func){
func(evt,this.focusedChild);
evt.stopPropagation();
evt.preventDefault();
this._searchString="";
}else{
if(evt.keyCode==keys.SPACE&&this._searchTimer&&!(evt.ctrlKey||evt.altKey||evt.metaKey)){
evt.stopImmediatePropagation();
evt.preventDefault();
this._keyboardSearch(evt," ");
}
}
},_onContainerKeypress:function(evt){
if(evt.charCode<keys.SPACE||evt.ctrlKey||evt.altKey||evt.metaKey||(evt.charCode==keys.SPACE&&this._searchTimer)){
return;
}
evt.preventDefault();
evt.stopPropagation();
this._keyboardSearch(evt,String.fromCharCode(evt.charCode).toLowerCase());
},_keyboardSearch:function(evt,_d86){
var _d87=null,_d88,_d89=0,_d8a=lang.hitch(this,function(){
if(this._searchTimer){
this._searchTimer.remove();
}
this._searchString+=_d86;
var _d8b=/^(.)\1*$/.test(this._searchString);
var _d8c=_d8b?1:this._searchString.length;
_d88=this._searchString.substr(0,_d8c);
this._searchTimer=this.defer(function(){
this._searchTimer=null;
this._searchString="";
},this.multiCharSearchDuration);
var _d8d=this.focusedChild||null;
if(_d8c==1||!_d8d){
_d8d=this._getNextFocusableChild(_d8d,1);
if(!_d8d){
return;
}
}
var stop=_d8d;
do{
var rc=this._keyboardSearchCompare(_d8d,_d88);
if(!!rc&&_d89++==0){
_d87=_d8d;
}
if(rc==-1){
_d89=-1;
break;
}
_d8d=this._getNextFocusableChild(_d8d,1);
}while(_d8d!=stop);
});
_d8a();
this.onKeyboardSearch(_d87,evt,_d88,_d89);
},_onChildBlur:function(){
},_getNextFocusableChild:function(_d8e,dir){
var _d8f=_d8e;
do{
if(!_d8e){
_d8e=this[dir>0?"_getFirst":"_getLast"]();
if(!_d8e){
break;
}
}else{
_d8e=this._getNext(_d8e,dir);
}
if(_d8e!=null&&_d8e!=_d8f&&_d8e.isFocusable()){
return _d8e;
}
}while(_d8e!=_d8f);
return null;
},_getFirst:function(){
return null;
},_getLast:function(){
return null;
},_getNext:function(_d90,dir){
if(_d90){
_d90=_d90.domNode;
while(_d90){
_d90=_d90[dir<0?"previousSibling":"nextSibling"];
if(_d90&&"getAttribute" in _d90){
var w=_d7b.byNode(_d90);
if(w){
return w;
}
}
}
}
return null;
}});
});
},"dojo/store/util/QueryResults":function(){
define(["../../_base/array","../../_base/lang","../../when"],function(_d91,lang,when){
var _d92=function(_d93){
if(!_d93){
return _d93;
}
if(_d93.then){
_d93=lang.delegate(_d93);
}
function _d94(_d95){
if(!_d93[_d95]){
_d93[_d95]=function(){
var args=arguments;
return when(_d93,function(_d96){
Array.prototype.unshift.call(args,_d96);
return _d92(_d91[_d95].apply(_d91,args));
});
};
}
};
_d94("forEach");
_d94("filter");
_d94("map");
if(!_d93.total){
_d93.total=when(_d93,function(_d97){
return _d97.length;
});
}
return _d93;
};
lang.setObject("dojo.store.util.QueryResults",_d92);
return _d92;
});
},"dijit/form/_ListBase":function(){
define(["dojo/_base/declare","dojo/on","dojo/window"],function(_d98,on,_d99){
return _d98("dijit.form._ListBase",null,{selected:null,_listConnect:function(_d9a,_d9b){
var self=this;
return self.own(on(self.containerNode,on.selector(function(_d9c,_d9d,_d9e){
return _d9c.parentNode==_d9e;
},_d9a),function(evt){
if(!/^touch/.test(evt.type)){
evt.preventDefault();
}
self[_d9b](evt,this);
}));
},selectFirstNode:function(){
var _d9f=this.containerNode.firstChild;
while(_d9f&&_d9f.style.display=="none"){
_d9f=_d9f.nextSibling;
}
this._setSelectedAttr(_d9f);
},selectLastNode:function(){
var last=this.containerNode.lastChild;
while(last&&last.style.display=="none"){
last=last.previousSibling;
}
this._setSelectedAttr(last);
},selectNextNode:function(){
var _da0=this.selected;
if(!_da0){
this.selectFirstNode();
}else{
var next=_da0.nextSibling;
while(next&&next.style.display=="none"){
next=next.nextSibling;
}
if(!next){
this.selectFirstNode();
}else{
this._setSelectedAttr(next);
}
}
},selectPreviousNode:function(){
var _da1=this.selected;
if(!_da1){
this.selectLastNode();
}else{
var prev=_da1.previousSibling;
while(prev&&prev.style.display=="none"){
prev=prev.previousSibling;
}
if(!prev){
this.selectLastNode();
}else{
this._setSelectedAttr(prev);
}
}
},_setSelectedAttr:function(node){
if(this.selected!=node){
var _da2=this.selected;
if(_da2){
this.onDeselect(_da2);
}
if(node){
_d99.scrollIntoView(node);
this.onSelect(node);
}
this._set("selected",node);
}else{
if(node){
this.onSelect(node);
}
}
}});
});
},"dijit/form/_FormWidget":function(){
define(["dojo/_base/declare","dojo/sniff","dojo/_base/kernel","dojo/ready","../_Widget","../_CssStateMixin","../_TemplatedMixin","./_FormWidgetMixin"],function(_da3,has,_da4,_da5,_da6,_da7,_da8,_da9){
if(has("dijit-legacy-requires")){
_da5(0,function(){
var _daa=["dijit/form/_FormValueWidget"];
require(_daa);
});
}
return _da3("dijit.form._FormWidget",[_da6,_da8,_da7,_da9],{setDisabled:function(_dab){
_da4.deprecated("setDisabled("+_dab+") is deprecated. Use set('disabled',"+_dab+") instead.","","2.0");
this.set("disabled",_dab);
},setValue:function(_dac){
_da4.deprecated("dijit.form._FormWidget:setValue("+_dac+") is deprecated.  Use set('value',"+_dac+") instead.","","2.0");
this.set("value",_dac);
},getValue:function(){
_da4.deprecated(this.declaredClass+"::getValue() is deprecated. Use get('value') instead.","","2.0");
return this.get("value");
},postMixInProperties:function(){
this.nameAttrSetting=(this.name&&!has("msapp"))?("name=\""+this.name.replace(/"/g,"&quot;")+"\""):"";
this.inherited(arguments);
},_setTypeAttr:null});
});
},"dojo/dnd/common":function(){
define(["../sniff","../_base/kernel","../_base/lang","../dom"],function(has,_dad,lang,dom){
var _dae=lang.getObject("dojo.dnd",true);
_dae.getCopyKeyState=function(evt){
return evt[has("mac")?"metaKey":"ctrlKey"];
};
_dae._uniqueId=0;
_dae.getUniqueId=function(){
var id;
do{
id=_dad._scopeName+"Unique"+(++_dae._uniqueId);
}while(dom.byId(id));
return id;
};
_dae._empty={};
_dae.isFormElement=function(e){
var t=e.target;
if(t.nodeType==3){
t=t.parentNode;
}
return " a button textarea input select option ".indexOf(" "+t.tagName.toLowerCase()+" ")>=0;
};
return _dae;
});
},"dijit/CalendarLite":function(){
define(["dojo/_base/array","dojo/_base/declare","dojo/cldr/supplemental","dojo/date","dojo/date/locale","dojo/date/stamp","dojo/dom","dojo/dom-class","dojo/_base/lang","dojo/on","dojo/sniff","dojo/string","./_WidgetBase","./_TemplatedMixin","dojo/text!./templates/Calendar.html","./a11yclick","./hccss"],function(_daf,_db0,_db1,date,_db2,_db3,dom,_db4,lang,on,has,_db5,_db6,_db7,_db8){
var _db9=_db0("dijit.CalendarLite",[_db6,_db7],{templateString:_db8,dowTemplateString:"<th class=\"dijitReset dijitCalendarDayLabelTemplate\" role=\"columnheader\" scope=\"col\"><span class=\"dijitCalendarDayLabel\">${d}</span></th>",dateTemplateString:"<td class=\"dijitReset\" role=\"gridcell\" data-dojo-attach-point=\"dateCells\"><span class=\"dijitCalendarDateLabel\" data-dojo-attach-point=\"dateLabels\"></span></td>",weekTemplateString:"<tr class=\"dijitReset dijitCalendarWeekTemplate\" role=\"row\">${d}${d}${d}${d}${d}${d}${d}</tr>",value:new Date(""),datePackage:"",dayWidth:"narrow",tabIndex:"0",currentFocus:new Date(),_setSummaryAttr:"gridNode",baseClass:"dijitCalendar",_isValidDate:function(_dba){
return _dba&&!isNaN(_dba)&&typeof _dba=="object"&&_dba.toString()!=this.constructor.prototype.value.toString();
},_getValueAttr:function(){
var _dbb=this._get("value");
if(_dbb&&!isNaN(_dbb)){
var _dbc=new this.dateClassObj(_dbb);
_dbc.setHours(0,0,0,0);
if(_dbc.getDate()<_dbb.getDate()){
_dbc=this.dateModule.add(_dbc,"hour",1);
}
return _dbc;
}else{
return null;
}
},_setValueAttr:function(_dbd,_dbe){
if(typeof _dbd=="string"){
_dbd=_db3.fromISOString(_dbd);
}
_dbd=this._patchDate(_dbd);
if(this._isValidDate(_dbd)&&!this.isDisabledDate(_dbd,this.lang)){
this._set("value",_dbd);
this.set("currentFocus",_dbd);
this._markSelectedDates([_dbd]);
if(this._created&&(_dbe||typeof _dbe=="undefined")){
this.onChange(this.get("value"));
}
}else{
this._set("value",null);
this._markSelectedDates([]);
}
},_patchDate:function(_dbf){
if(_dbf){
_dbf=new this.dateClassObj(_dbf);
_dbf.setHours(1,0,0,0);
}
return _dbf;
},_setText:function(node,text){
while(node.firstChild){
node.removeChild(node.firstChild);
}
node.appendChild(node.ownerDocument.createTextNode(text));
},_populateGrid:function(){
var _dc0=new this.dateClassObj(this.currentFocus);
_dc0.setDate(1);
var _dc1=_dc0.getDay(),_dc2=this.dateModule.getDaysInMonth(_dc0),_dc3=this.dateModule.getDaysInMonth(this.dateModule.add(_dc0,"month",-1)),_dc4=new this.dateClassObj(),_dc5=_db1.getFirstDayOfWeek(this.lang);
if(_dc5>_dc1){
_dc5-=7;
}
if(!this.summary){
var _dc6=this.dateLocaleModule.getNames("months","wide","standAlone",this.lang,_dc0);
this.gridNode.setAttribute("summary",_dc6[_dc0.getMonth()]);
}
this._date2cell={};
_daf.forEach(this.dateCells,function(_dc7,idx){
var i=idx+_dc5;
var date=new this.dateClassObj(_dc0),_dc8,_dc9="dijitCalendar",adj=0;
if(i<_dc1){
_dc8=_dc3-_dc1+i+1;
adj=-1;
_dc9+="Previous";
}else{
if(i>=(_dc1+_dc2)){
_dc8=i-_dc1-_dc2+1;
adj=1;
_dc9+="Next";
}else{
_dc8=i-_dc1+1;
_dc9+="Current";
}
}
if(adj){
date=this.dateModule.add(date,"month",adj);
}
date.setDate(_dc8);
if(!this.dateModule.compare(date,_dc4,"date")){
_dc9="dijitCalendarCurrentDate "+_dc9;
}
if(this.isDisabledDate(date,this.lang)){
_dc9="dijitCalendarDisabledDate "+_dc9;
_dc7.setAttribute("aria-disabled","true");
}else{
_dc9="dijitCalendarEnabledDate "+_dc9;
_dc7.removeAttribute("aria-disabled");
_dc7.setAttribute("aria-selected","false");
}
var _dca=this.getClassForDate(date,this.lang);
if(_dca){
_dc9=_dca+" "+_dc9;
}
_dc7.className=_dc9+"Month dijitCalendarDateTemplate";
var _dcb=date.valueOf();
this._date2cell[_dcb]=_dc7;
_dc7.dijitDateValue=_dcb;
this._setText(this.dateLabels[idx],date.getDateLocalized?date.getDateLocalized(this.lang):date.getDate());
},this);
},_populateControls:function(){
var _dcc=new this.dateClassObj(this.currentFocus);
_dcc.setDate(1);
this.monthWidget.set("month",_dcc);
var y=_dcc.getFullYear()-1;
var d=new this.dateClassObj();
_daf.forEach(["previous","current","next"],function(name){
d.setFullYear(y++);
this._setText(this[name+"YearLabelNode"],this.dateLocaleModule.format(d,{selector:"year",locale:this.lang}));
},this);
},goToToday:function(){
this.set("value",new this.dateClassObj());
},constructor:function(_dcd){
this.dateModule=_dcd.datePackage?lang.getObject(_dcd.datePackage,false):date;
this.dateClassObj=this.dateModule.Date||Date;
this.dateLocaleModule=_dcd.datePackage?lang.getObject(_dcd.datePackage+".locale",false):_db2;
},_createMonthWidget:function(){
return _db9._MonthWidget({id:this.id+"_mddb",lang:this.lang,dateLocaleModule:this.dateLocaleModule},this.monthNode);
},buildRendering:function(){
var d=this.dowTemplateString,_dce=this.dateLocaleModule.getNames("days",this.dayWidth,"standAlone",this.lang),_dcf=_db1.getFirstDayOfWeek(this.lang);
this.dayCellsHtml=_db5.substitute([d,d,d,d,d,d,d].join(""),{d:""},function(){
return _dce[_dcf++%7];
});
var r=_db5.substitute(this.weekTemplateString,{d:this.dateTemplateString});
this.dateRowsHtml=[r,r,r,r,r,r].join("");
this.dateCells=[];
this.dateLabels=[];
this.inherited(arguments);
dom.setSelectable(this.domNode,false);
var _dd0=new this.dateClassObj(this.currentFocus);
this.monthWidget=this._createMonthWidget();
this.set("currentFocus",_dd0,false);
},postCreate:function(){
this.inherited(arguments);
this._connectControls();
},_connectControls:function(){
var _dd1=lang.hitch(this,function(_dd2,part,_dd3){
return on(this[_dd2],"click",lang.hitch(this,function(){
this._setCurrentFocusAttr(this.dateModule.add(this.currentFocus,part,_dd3));
}));
});
this.own(_dd1("incrementMonth","month",1),_dd1("decrementMonth","month",-1),_dd1("nextYearLabelNode","year",1),_dd1("previousYearLabelNode","year",-1));
},_setCurrentFocusAttr:function(date,_dd4){
var _dd5=this.currentFocus,_dd6=this._getNodeByDate(_dd5);
date=this._patchDate(date);
this._set("currentFocus",date);
if(!this._date2cell||this.dateModule.difference(_dd5,date,"month")!=0){
this._populateGrid();
this._populateControls();
this._markSelectedDates([this.value]);
}
var _dd7=this._getNodeByDate(date);
_dd7.setAttribute("tabIndex",this.tabIndex);
if(this.focused||_dd4){
_dd7.focus();
}
if(_dd6&&_dd6!=_dd7){
if(has("webkit")){
_dd6.setAttribute("tabIndex","-1");
}else{
_dd6.removeAttribute("tabIndex");
}
}
},focus:function(){
this._setCurrentFocusAttr(this.currentFocus,true);
},_onDayClick:function(evt){
evt.stopPropagation();
evt.preventDefault();
for(var node=evt.target;node&&!node.dijitDateValue;node=node.parentNode){
}
if(node&&!_db4.contains(node,"dijitCalendarDisabledDate")){
this.set("value",node.dijitDateValue);
}
},_getNodeByDate:function(_dd8){
_dd8=this._patchDate(_dd8);
return _dd8&&this._date2cell?this._date2cell[_dd8.valueOf()]:null;
},_markSelectedDates:function(_dd9){
function mark(_dda,cell){
_db4.toggle(cell,"dijitCalendarSelectedDate",_dda);
cell.setAttribute("aria-selected",_dda?"true":"false");
};
_daf.forEach(this._selectedCells||[],lang.partial(mark,false));
this._selectedCells=_daf.filter(_daf.map(_dd9,this._getNodeByDate,this),function(n){
return n;
});
_daf.forEach(this._selectedCells,lang.partial(mark,true));
},onChange:function(){
},isDisabledDate:function(){
},getClassForDate:function(){
}});
_db9._MonthWidget=_db0("dijit.CalendarLite._MonthWidget",_db6,{_setMonthAttr:function(_ddb){
var _ddc=this.dateLocaleModule.getNames("months","wide","standAlone",this.lang,_ddb),_ddd=(has("ie")==6?"":"<div class='dijitSpacer'>"+_daf.map(_ddc,function(s){
return "<div>"+s+"</div>";
}).join("")+"</div>");
this.domNode.innerHTML=_ddd+"<div class='dijitCalendarMonthLabel dijitCalendarCurrentMonthLabel'>"+_ddc[_ddb.getMonth()]+"</div>";
}});
return _db9;
});
},"dijit/CheckedMenuItem":function(){
define(["dojo/_base/declare","dojo/dom-class","./MenuItem","dojo/text!./templates/CheckedMenuItem.html","./hccss"],function(_dde,_ddf,_de0,_de1){
return _dde("dijit.CheckedMenuItem",_de0,{baseClass:"dijitMenuItem dijitCheckedMenuItem",templateString:_de1,checked:false,_setCheckedAttr:function(_de2){
this.domNode.setAttribute("aria-checked",_de2?"true":"false");
this._set("checked",_de2);
},iconClass:"",role:"menuitemcheckbox",checkedChar:"&#10003;",onChange:function(){
},_onClick:function(evt){
if(!this.disabled){
this.set("checked",!this.checked);
this.onChange(this.checked);
}
this.onClick(evt);
}});
});
},"dijit/Viewport":function(){
define(["dojo/Evented","dojo/on","dojo/domReady","dojo/sniff","dojo/window"],function(_de3,on,_de4,has,_de5){
var _de6=new _de3();
var _de7;
_de4(function(){
var _de8=_de5.getBox();
_de6._rlh=on(window,"resize",function(){
var _de9=_de5.getBox();
if(_de8.h==_de9.h&&_de8.w==_de9.w){
return;
}
_de8=_de9;
_de6.emit("resize");
});
if(has("ie")==8){
var _dea=screen.deviceXDPI;
setInterval(function(){
if(screen.deviceXDPI!=_dea){
_dea=screen.deviceXDPI;
_de6.emit("resize");
}
},500);
}
if(has("ios")){
on(document,"focusin",function(evt){
_de7=evt.target;
});
on(document,"focusout",function(evt){
_de7=null;
});
}
});
_de6.getEffectiveBox=function(doc){
var box=_de5.getBox(doc);
var tag=_de7&&_de7.tagName&&_de7.tagName.toLowerCase();
if(has("ios")&&_de7&&!_de7.readOnly&&(tag=="textarea"||(tag=="input"&&/^(color|email|number|password|search|tel|text|url)$/.test(_de7.type)))){
box.h*=(orientation==0||orientation==180?0.66:0.4);
var rect=_de7.getBoundingClientRect();
box.h=Math.max(box.h,rect.top+rect.height);
}
return box;
};
return _de6;
});
},"dijit/_base/place":function(){
define(["dojo/_base/array","dojo/_base/lang","dojo/window","../place","../main"],function(_deb,lang,_dec,_ded,_dee){
var _def={};
_def.getViewport=function(){
return _dec.getBox();
};
_def.placeOnScreen=_ded.at;
_def.placeOnScreenAroundElement=function(node,_df0,_df1,_df2){
var _df3;
if(lang.isArray(_df1)){
_df3=_df1;
}else{
_df3=[];
for(var key in _df1){
_df3.push({aroundCorner:key,corner:_df1[key]});
}
}
return _ded.around(node,_df0,_df3,true,_df2);
};
_def.placeOnScreenAroundNode=_def.placeOnScreenAroundElement;
_def.placeOnScreenAroundRectangle=_def.placeOnScreenAroundElement;
_def.getPopupAroundAlignment=function(_df4,_df5){
var _df6={};
_deb.forEach(_df4,function(pos){
var ltr=_df5;
switch(pos){
case "after":
_df6[_df5?"BR":"BL"]=_df5?"BL":"BR";
break;
case "before":
_df6[_df5?"BL":"BR"]=_df5?"BR":"BL";
break;
case "below-alt":
ltr=!ltr;
case "below":
_df6[ltr?"BL":"BR"]=ltr?"TL":"TR";
_df6[ltr?"BR":"BL"]=ltr?"TR":"TL";
break;
case "above-alt":
ltr=!ltr;
case "above":
default:
_df6[ltr?"TL":"TR"]=ltr?"BL":"BR";
_df6[ltr?"TR":"TL"]=ltr?"BR":"BL";
break;
}
});
return _df6;
};
lang.mixin(_dee,_def);
return _dee;
});
},"dijit/MenuSeparator":function(){
define(["dojo/_base/declare","dojo/dom","./_WidgetBase","./_TemplatedMixin","./_Contained","dojo/text!./templates/MenuSeparator.html"],function(_df7,dom,_df8,_df9,_dfa,_dfb){
return _df7("dijit.MenuSeparator",[_df8,_df9,_dfa],{templateString:_dfb,buildRendering:function(){
this.inherited(arguments);
dom.setSelectable(this.domNode,false);
},isFocusable:function(){
return false;
}});
});
},"dijit/form/_ComboBoxMenu":function(){
define(["dojo/_base/declare","dojo/dom-class","dojo/dom-style","dojo/keys","../_WidgetBase","../_TemplatedMixin","./_ComboBoxMenuMixin","./_ListMouseMixin"],function(_dfc,_dfd,_dfe,keys,_dff,_e00,_e01,_e02){
return _dfc("dijit.form._ComboBoxMenu",[_dff,_e00,_e02,_e01],{templateString:"<div class='dijitReset dijitMenu' data-dojo-attach-point='containerNode' style='overflow: auto; overflow-x: hidden;' role='listbox'>"+"<div class='dijitMenuItem dijitMenuPreviousButton' data-dojo-attach-point='previousButton' role='option'></div>"+"<div class='dijitMenuItem dijitMenuNextButton' data-dojo-attach-point='nextButton' role='option'></div>"+"</div>",baseClass:"dijitComboBoxMenu",postCreate:function(){
this.inherited(arguments);
if(!this.isLeftToRight()){
_dfd.add(this.previousButton,"dijitMenuItemRtl");
_dfd.add(this.nextButton,"dijitMenuItemRtl");
}
this.containerNode.setAttribute("role","listbox");
},_createMenuItem:function(){
var item=this.ownerDocument.createElement("div");
item.className="dijitReset dijitMenuItem"+(this.isLeftToRight()?"":" dijitMenuItemRtl");
item.setAttribute("role","option");
return item;
},onHover:function(node){
_dfd.add(node,"dijitMenuItemHover");
},onUnhover:function(node){
_dfd.remove(node,"dijitMenuItemHover");
},onSelect:function(node){
_dfd.add(node,"dijitMenuItemSelected");
},onDeselect:function(node){
_dfd.remove(node,"dijitMenuItemSelected");
},_page:function(up){
var _e03=0;
var _e04=this.domNode.scrollTop;
var _e05=_dfe.get(this.domNode,"height");
if(!this.getHighlightedOption()){
this.selectNextNode();
}
while(_e03<_e05){
var _e06=this.getHighlightedOption();
if(up){
if(!_e06.previousSibling||_e06.previousSibling.style.display=="none"){
break;
}
this.selectPreviousNode();
}else{
if(!_e06.nextSibling||_e06.nextSibling.style.display=="none"){
break;
}
this.selectNextNode();
}
var _e07=this.domNode.scrollTop;
_e03+=(_e07-_e04)*(up?-1:1);
_e04=_e07;
}
},handleKey:function(evt){
switch(evt.keyCode){
case keys.DOWN_ARROW:
this.selectNextNode();
return false;
case keys.PAGE_DOWN:
this._page(false);
return false;
case keys.UP_ARROW:
this.selectPreviousNode();
return false;
case keys.PAGE_UP:
this._page(true);
return false;
default:
return true;
}
}});
});
},"xstyle/css":function(){
define(["require"],function(_e08){
"use strict";
var _e09=window.cssCache||(window.cssCache={});
return {load:function(_e0a,_e0b,_e0c,_e0d){
var url=_e0b.toUrl(_e0a);
if(_e09[url]){
return createStyleSheet(_e09[url]);
}
var _e0e=document.documentElement;
var _e0f=_e0e.insertBefore(document.createElement("div"),_e0e.firstChild);
_e0f.id=_e0b.toAbsMid(_e0a).replace(/\//g,"-").replace(/\..*/,"")+"-loaded";
var _e10=(_e0f.currentStyle||getComputedStyle(_e0f,null)).display;
_e0e.removeChild(_e0f);
if(_e10=="none"){
return _e0c();
}
_e08(["./load-css"],function(load){
load(url,_e0c);
});
},pluginBuilder:"xstyle/css-builder"};
});
},"dijit/Dialog":function(){
define(["require","dojo/_base/array","dojo/aspect","dojo/_base/declare","dojo/Deferred","dojo/dom","dojo/dom-class","dojo/dom-geometry","dojo/dom-style","dojo/_base/fx","dojo/i18n","dojo/keys","dojo/_base/lang","dojo/on","dojo/ready","dojo/sniff","dojo/window","dojo/dnd/Moveable","dojo/dnd/TimedMoveable","./focus","./_base/manager","./_Widget","./_TemplatedMixin","./_CssStateMixin","./form/_FormMixin","./_DialogMixin","./DialogUnderlay","./layout/ContentPane","dojo/text!./templates/Dialog.html","dojo/i18n!./nls/common"],function(_e11,_e12,_e13,_e14,_e15,dom,_e16,_e17,_e18,fx,i18n,keys,lang,on,_e19,has,_e1a,_e1b,_e1c,_e1d,_e1e,_e1f,_e20,_e21,_e22,_e23,_e24,_e25,_e26){
var _e27=_e14("dijit._DialogBase"+(has("dojo-bidi")?"_NoBidi":""),[_e20,_e22,_e23,_e21],{templateString:_e26,baseClass:"dijitDialog",cssStateNodes:{closeButtonNode:"dijitDialogCloseIcon"},_setTitleAttr:{node:"titleNode",type:"innerHTML"},open:false,duration:_e1e.defaultDuration,refocus:true,autofocus:true,_firstFocusItem:null,_lastFocusItem:null,doLayout:false,draggable:true,_setDraggableAttr:function(val){
this._set("draggable",val);
},maxRatio:0.9,closable:true,_setClosableAttr:function(val){
this.closeButtonNode.style.display=val?"":"none";
this._set("closable",val);
},postMixInProperties:function(){
var _e28=i18n.getLocalization("dijit","common");
lang.mixin(this,_e28);
this.inherited(arguments);
},postCreate:function(){
_e18.set(this.domNode,{display:"none",position:"absolute"});
this.ownerDocumentBody.appendChild(this.domNode);
this.inherited(arguments);
_e13.after(this,"onExecute",lang.hitch(this,"hide"),true);
_e13.after(this,"onCancel",lang.hitch(this,"hide"),true);
this._modalconnects=[];
},onLoad:function(){
this._size();
this._position();
if(this.autofocus&&_e29.isTop(this)){
this._getFocusItems(this.domNode);
_e1d.focus(this._firstFocusItem);
}
this.inherited(arguments);
},focus:function(){
this._getFocusItems(this.domNode);
_e1d.focus(this._firstFocusItem);
},_endDrag:function(){
var _e2a=_e17.position(this.domNode),_e2b=_e1a.getBox(this.ownerDocument);
_e2a.y=Math.min(Math.max(_e2a.y,0),(_e2b.h-_e2a.h));
_e2a.x=Math.min(Math.max(_e2a.x,0),(_e2b.w-_e2a.w));
this._relativePosition=_e2a;
this._position();
},_setup:function(){
var node=this.domNode;
if(this.titleBar&&this.draggable){
this._moveable=new ((has("ie")==6)?_e1c:_e1b)(node,{handle:this.titleBar});
_e13.after(this._moveable,"onMoveStop",lang.hitch(this,"_endDrag"),true);
}else{
_e16.add(node,"dijitDialogFixed");
}
this.underlayAttrs={dialogId:this.id,"class":_e12.map(this["class"].split(/\s/),function(s){
return s+"_underlay";
}).join(" "),_onKeyDown:lang.hitch(this,"_onKey"),ownerDocument:this.ownerDocument};
},_size:function(){
this._checkIfSingleChild();
if(this._singleChild){
if(typeof this._singleChildOriginalStyle!="undefined"){
this._singleChild.domNode.style.cssText=this._singleChildOriginalStyle;
delete this._singleChildOriginalStyle;
}
}else{
_e18.set(this.containerNode,{width:"auto",height:"auto"});
}
var bb=_e17.position(this.domNode);
var _e2c=_e1a.getBox(this.ownerDocument);
_e2c.w*=this.maxRatio;
_e2c.h*=this.maxRatio;
if(bb.w>=_e2c.w||bb.h>=_e2c.h){
var _e2d=_e17.position(this.containerNode),w=Math.min(bb.w,_e2c.w)-(bb.w-_e2d.w),h=Math.min(bb.h,_e2c.h)-(bb.h-_e2d.h);
if(this._singleChild&&this._singleChild.resize){
if(typeof this._singleChildOriginalStyle=="undefined"){
this._singleChildOriginalStyle=this._singleChild.domNode.style.cssText;
}
this._singleChild.resize({w:w,h:h});
}else{
_e18.set(this.containerNode,{width:w+"px",height:h+"px",overflow:"auto",position:"relative"});
}
}else{
if(this._singleChild&&this._singleChild.resize){
this._singleChild.resize();
}
}
},_position:function(){
if(!_e16.contains(this.ownerDocumentBody,"dojoMove")){
var node=this.domNode,_e2e=_e1a.getBox(this.ownerDocument),p=this._relativePosition,bb=p?null:_e17.position(node),l=Math.floor(_e2e.l+(p?p.x:(_e2e.w-bb.w)/2)),t=Math.floor(_e2e.t+(p?p.y:(_e2e.h-bb.h)/2));
_e18.set(node,{left:l+"px",top:t+"px"});
}
},_onKey:function(evt){
if(evt.keyCode==keys.TAB){
this._getFocusItems(this.domNode);
var node=evt.target;
if(this._firstFocusItem==this._lastFocusItem){
evt.stopPropagation();
evt.preventDefault();
}else{
if(node==this._firstFocusItem&&evt.shiftKey){
_e1d.focus(this._lastFocusItem);
evt.stopPropagation();
evt.preventDefault();
}else{
if(node==this._lastFocusItem&&!evt.shiftKey){
_e1d.focus(this._firstFocusItem);
evt.stopPropagation();
evt.preventDefault();
}
}
}
}else{
if(this.closable&&evt.keyCode==keys.ESCAPE){
this.onCancel();
evt.stopPropagation();
evt.preventDefault();
}
}
},show:function(){
if(this.open){
return;
}
if(!this._started){
this.startup();
}
if(!this._alreadyInitialized){
this._setup();
this._alreadyInitialized=true;
}
if(this._fadeOutDeferred){
this._fadeOutDeferred.cancel();
_e29.hide(this);
}
var win=_e1a.get(this.ownerDocument);
this._modalconnects.push(on(win,"scroll",lang.hitch(this,"resize")));
this._modalconnects.push(on(this.domNode,"keydown",lang.hitch(this,"_onKey")));
_e18.set(this.domNode,{opacity:0,display:""});
this._set("open",true);
this._onShow();
this._size();
this._position();
var _e2f;
this._fadeInDeferred=new _e15(lang.hitch(this,function(){
_e2f.stop();
delete this._fadeInDeferred;
}));
var _e30=this._fadeInDeferred.promise;
_e2f=fx.fadeIn({node:this.domNode,duration:this.duration,beforeBegin:lang.hitch(this,function(){
_e29.show(this,this.underlayAttrs);
}),onEnd:lang.hitch(this,function(){
if(this.autofocus&&_e29.isTop(this)){
this._getFocusItems(this.domNode);
_e1d.focus(this._firstFocusItem);
}
this._fadeInDeferred.resolve(true);
delete this._fadeInDeferred;
})}).play();
return _e30;
},hide:function(){
if(!this._alreadyInitialized||!this.open){
return;
}
if(this._fadeInDeferred){
this._fadeInDeferred.cancel();
}
var _e31;
this._fadeOutDeferred=new _e15(lang.hitch(this,function(){
_e31.stop();
delete this._fadeOutDeferred;
}));
this._fadeOutDeferred.then(lang.hitch(this,"onHide"));
var _e32=this._fadeOutDeferred.promise;
_e31=fx.fadeOut({node:this.domNode,duration:this.duration,onEnd:lang.hitch(this,function(){
this.domNode.style.display="none";
_e29.hide(this);
this._fadeOutDeferred.resolve(true);
delete this._fadeOutDeferred;
})}).play();
if(this._scrollConnected){
this._scrollConnected=false;
}
var h;
while(h=this._modalconnects.pop()){
h.remove();
}
if(this._relativePosition){
delete this._relativePosition;
}
this._set("open",false);
return _e32;
},resize:function(){
if(this.domNode.style.display!="none"){
this._size();
if(!has("touch")){
this._position();
}
}
},destroy:function(){
if(this._fadeInDeferred){
this._fadeInDeferred.cancel();
}
if(this._fadeOutDeferred){
this._fadeOutDeferred.cancel();
}
if(this._moveable){
this._moveable.destroy();
}
var h;
while(h=this._modalconnects.pop()){
h.remove();
}
_e29.hide(this);
this.inherited(arguments);
}});
if(has("dojo-bidi")){
_e27=_e14("dijit._DialogBase",_e27,{_setTitleAttr:function(_e33){
this._set("title",_e33);
this.titleNode.innerHTML=_e33;
this.applyTextDir(this.titleNode);
},_setTextDirAttr:function(_e34){
if(this._created&&this.textDir!=_e34){
this._set("textDir",_e34);
this.set("title",this.title);
}
}});
}
var _e35=_e14("dijit.Dialog",[_e25,_e27],{});
_e35._DialogBase=_e27;
var _e29=_e35._DialogLevelManager={_beginZIndex:950,show:function(_e36,_e37){
ds[ds.length-1].focus=_e1d.curNode;
var _e38=ds[ds.length-1].dialog?ds[ds.length-1].zIndex+2:_e35._DialogLevelManager._beginZIndex;
_e18.set(_e36.domNode,"zIndex",_e38);
_e24.show(_e37,_e38-1);
ds.push({dialog:_e36,underlayAttrs:_e37,zIndex:_e38});
},hide:function(_e39){
if(ds[ds.length-1].dialog==_e39){
ds.pop();
var pd=ds[ds.length-1];
if(ds.length==1){
_e24.hide();
}else{
_e24.show(pd.underlayAttrs,pd.zIndex-1);
}
if(_e39.refocus){
var _e3a=pd.focus;
if(pd.dialog&&(!_e3a||!dom.isDescendant(_e3a,pd.dialog.domNode))){
pd.dialog._getFocusItems(pd.dialog.domNode);
_e3a=pd.dialog._firstFocusItem;
}
if(_e3a){
try{
_e3a.focus();
}
catch(e){
}
}
}
}else{
var idx=_e12.indexOf(_e12.map(ds,function(elem){
return elem.dialog;
}),_e39);
if(idx!=-1){
ds.splice(idx,1);
}
}
},isTop:function(_e3b){
return ds[ds.length-1].dialog==_e3b;
}};
var ds=_e35._dialogStack=[{dialog:null,focus:null,underlayAttrs:null}];
_e1d.watch("curNode",function(attr,_e3c,node){
var _e3d=ds[ds.length-1].dialog;
if(node&&_e3d&&!_e3d._fadeOutDeferred&&node.ownerDocument==_e3d.ownerDocument){
do{
if(node==_e3d.domNode||_e16.contains(node,"dijitPopup")){
return;
}
}while(node=node.parentNode);
_e3d.focus();
}
});
if(has("dijit-legacy-requires")){
_e19(0,function(){
var _e3e=["dijit/TooltipDialog"];
_e11(_e3e);
});
}
return _e35;
});
},"dijit/form/MultiSelect":function(){
define(["dojo/_base/array","dojo/_base/declare","dojo/dom-geometry","dojo/has","dojo/query","./_FormValueWidget"],function(_e3f,_e40,_e41,has,_e42,_e43){
var _e44=_e40("dijit.form.MultiSelect"+(has("dojo-bidi")?"_NoBidi":""),_e43,{size:7,baseClass:"dijitMultiSelect",templateString:"<select multiple='true' ${!nameAttrSetting} data-dojo-attach-point='containerNode,focusNode' data-dojo-attach-event='onchange: _onChange'></select>",addSelected:function(_e45){
_e45.getSelected().forEach(function(n){
this.containerNode.appendChild(n);
this.domNode.scrollTop=this.domNode.offsetHeight;
var _e46=_e45.domNode.scrollTop;
_e45.domNode.scrollTop=0;
_e45.domNode.scrollTop=_e46;
},this);
this._set("value",this.get("value"));
},getSelected:function(){
return _e42("option",this.containerNode).filter(function(n){
return n.selected;
});
},_getValueAttr:function(){
return _e3f.map(this.getSelected(),function(n){
return n.value;
});
},multiple:true,_setValueAttr:function(_e47,_e48){
_e42("option",this.containerNode).forEach(function(n){
n.selected=(_e3f.indexOf(_e47,n.value)!=-1);
});
this.inherited(arguments);
},invertSelection:function(_e49){
var val=[];
_e42("option",this.containerNode).forEach(function(n){
if(!n.selected){
val.push(n.value);
}
});
this._setValueAttr(val,!(_e49===false||_e49==null));
},_onChange:function(){
this._handleOnChange(this.get("value"),true);
},resize:function(size){
if(size){
_e41.setMarginBox(this.domNode,size);
}
},postCreate:function(){
this._set("value",this.get("value"));
this.inherited(arguments);
}});
if(has("dojo-bidi")){
_e44=_e40("dijit.form.MultiSelect",_e44,{addSelected:function(_e4a){
_e4a.getSelected().forEach(function(n){
n.text=this.enforceTextDirWithUcc(this.restoreOriginalText(n),n.text);
},this);
this.inherited(arguments);
},_setTextDirAttr:function(_e4b){
if((this.textDir!=_e4b||!this._created)&&this.enforceTextDirWithUcc){
this._set("textDir",_e4b);
_e42("option",this.containerNode).forEach(function(_e4c){
if(!this._created&&_e4c.value===_e4c.text){
_e4c.value=_e4c.text;
}
_e4c.text=this.enforceTextDirWithUcc(_e4c,_e4c.originalText||_e4c.text);
},this);
}
}});
}
return _e44;
});
},"dijit/form/_DateTimeTextBox":function(){
define(["dojo/date","dojo/date/locale","dojo/date/stamp","dojo/_base/declare","dojo/_base/lang","./RangeBoundTextBox","../_HasDropDown","dojo/text!./templates/DropDownBox.html"],function(date,_e4d,_e4e,_e4f,lang,_e50,_e51,_e52){
new Date("X");
var _e53=_e4f("dijit.form._DateTimeTextBox",[_e50,_e51],{templateString:_e52,hasDownArrow:true,cssStateNodes:{"_buttonNode":"dijitDownArrowButton"},pattern:_e4d.regexp,datePackage:"",postMixInProperties:function(){
this.inherited(arguments);
this._set("type","text");
},compare:function(val1,val2){
var _e54=this._isInvalidDate(val1);
var _e55=this._isInvalidDate(val2);
return _e54?(_e55?0:-1):(_e55?1:date.compare(val1,val2,this._selector));
},autoWidth:true,format:function(_e56,_e57){
if(!_e56){
return "";
}
return this.dateLocaleModule.format(_e56,_e57);
},"parse":function(_e58,_e59){
return this.dateLocaleModule.parse(_e58,_e59)||(this._isEmpty(_e58)?null:undefined);
},serialize:function(val,_e5a){
if(val.toGregorian){
val=val.toGregorian();
}
return _e4e.toISOString(val,_e5a);
},dropDownDefaultValue:new Date(),value:new Date(""),_blankValue:null,popupClass:"",_selector:"",constructor:function(_e5b){
this.dateModule=_e5b.datePackage?lang.getObject(_e5b.datePackage,false):date;
this.dateClassObj=this.dateModule.Date||Date;
this.dateLocaleModule=_e5b.datePackage?lang.getObject(_e5b.datePackage+".locale",false):_e4d;
this._set("pattern",this.dateLocaleModule.regexp);
this._invalidDate=this.constructor.prototype.value.toString();
},buildRendering:function(){
this.inherited(arguments);
if(!this.hasDownArrow){
this._buttonNode.style.display="none";
}
if(!this.hasDownArrow){
this._buttonNode=this.domNode;
this.baseClass+=" dijitComboBoxOpenOnClick";
}
},_setConstraintsAttr:function(_e5c){
_e5c.selector=this._selector;
_e5c.fullYear=true;
var _e5d=_e4e.fromISOString;
if(typeof _e5c.min=="string"){
_e5c.min=_e5d(_e5c.min);
}
if(typeof _e5c.max=="string"){
_e5c.max=_e5d(_e5c.max);
}
this.inherited(arguments);
},_isInvalidDate:function(_e5e){
return !_e5e||isNaN(_e5e)||typeof _e5e!="object"||_e5e.toString()==this._invalidDate;
},_setValueAttr:function(_e5f,_e60,_e61){
if(_e5f!==undefined){
if(typeof _e5f=="string"){
_e5f=_e4e.fromISOString(_e5f);
}
if(this._isInvalidDate(_e5f)){
_e5f=null;
}
if(_e5f instanceof Date&&!(this.dateClassObj instanceof Date)){
_e5f=new this.dateClassObj(_e5f);
}
}
this.inherited(arguments);
if(this.value instanceof Date){
this.filterString="";
}
if(this.dropDown){
this.dropDown.set("value",_e5f,false);
}
},_set:function(attr,_e62){
var _e63=this._get("value");
if(attr=="value"&&_e63 instanceof Date&&this.compare(_e62,_e63)==0){
return;
}
this.inherited(arguments);
},_setDropDownDefaultValueAttr:function(val){
if(this._isInvalidDate(val)){
val=new this.dateClassObj();
}
this._set("dropDownDefaultValue",val);
},openDropDown:function(_e64){
if(this.dropDown){
this.dropDown.destroy();
}
var _e65=lang.isString(this.popupClass)?lang.getObject(this.popupClass,false):this.popupClass,_e66=this,_e67=this.get("value");
this.dropDown=new _e65({onChange:function(_e68){
_e66.set("value",_e68,true);
},id:this.id+"_popup",dir:_e66.dir,lang:_e66.lang,value:_e67,textDir:_e66.textDir,currentFocus:!this._isInvalidDate(_e67)?_e67:this.dropDownDefaultValue,constraints:_e66.constraints,filterString:_e66.filterString,datePackage:_e66.params.datePackage,isDisabledDate:function(date){
return !_e66.rangeCheck(date,_e66.constraints);
}});
this.inherited(arguments);
},_getDisplayedValueAttr:function(){
return this.textbox.value;
},_setDisplayedValueAttr:function(_e69,_e6a){
this._setValueAttr(this.parse(_e69,this.constraints),_e6a,_e69);
}});
return _e53;
});
},"dijit/_base/focus":function(){
define(["dojo/_base/array","dojo/dom","dojo/_base/lang","dojo/topic","dojo/_base/window","../focus","../selection","../main"],function(_e6b,dom,lang,_e6c,win,_e6d,_e6e,_e6f){
var _e70={_curFocus:null,_prevFocus:null,isCollapsed:function(){
return _e6f.getBookmark().isCollapsed;
},getBookmark:function(){
var sel=win.global==window?_e6e:new _e6e.SelectionManager(win.global);
return sel.getBookmark();
},moveToBookmark:function(_e71){
var sel=win.global==window?_e6e:new _e6e.SelectionManager(win.global);
return sel.moveToBookmark(_e71);
},getFocus:function(menu,_e72){
var node=!_e6d.curNode||(menu&&dom.isDescendant(_e6d.curNode,menu.domNode))?_e6f._prevFocus:_e6d.curNode;
return {node:node,bookmark:node&&(node==_e6d.curNode)&&win.withGlobal(_e72||win.global,_e6f.getBookmark),openedForWindow:_e72};
},_activeStack:[],registerIframe:function(_e73){
return _e6d.registerIframe(_e73);
},unregisterIframe:function(_e74){
_e74&&_e74.remove();
},registerWin:function(_e75,_e76){
return _e6d.registerWin(_e75,_e76);
},unregisterWin:function(_e77){
_e77&&_e77.remove();
}};
_e6d.focus=function(_e78){
if(!_e78){
return;
}
var node="node" in _e78?_e78.node:_e78,_e79=_e78.bookmark,_e7a=_e78.openedForWindow,_e7b=_e79?_e79.isCollapsed:false;
if(node){
var _e7c=(node.tagName.toLowerCase()=="iframe")?node.contentWindow:node;
if(_e7c&&_e7c.focus){
try{
_e7c.focus();
}
catch(e){
}
}
_e6d._onFocusNode(node);
}
if(_e79&&win.withGlobal(_e7a||win.global,_e6f.isCollapsed)&&!_e7b){
if(_e7a){
_e7a.focus();
}
try{
win.withGlobal(_e7a||win.global,_e6f.moveToBookmark,null,[_e79]);
}
catch(e2){
}
}
};
_e6d.watch("curNode",function(name,_e7d,_e7e){
_e6f._curFocus=_e7e;
_e6f._prevFocus=_e7d;
if(_e7e){
_e6c.publish("focusNode",_e7e);
}
});
_e6d.watch("activeStack",function(name,_e7f,_e80){
_e6f._activeStack=_e80;
});
_e6d.on("widget-blur",function(_e81,by){
_e6c.publish("widgetBlur",_e81,by);
});
_e6d.on("widget-focus",function(_e82,by){
_e6c.publish("widgetFocus",_e82,by);
});
lang.mixin(_e6f,_e70);
return _e6f;
});
},"dgrid/OnDemandList":function(){
define(["./List","./_StoreMixin","dojo/_base/declare","dojo/_base/lang","dojo/_base/Deferred","dojo/on","./util/misc","put-selector/put"],function(List,_e83,_e84,lang,_e85,_e86,_e87,put){
return _e84([List,_e83],{minRowsPerPage:25,maxRowsPerPage:250,maxEmptySpace:Infinity,bufferRows:10,farOffRemoval:2000,queryRowsOverlap:1,pagingMethod:"debounce",pagingDelay:_e87.defaultDelay,keepScrollPosition:false,rowHeight:22,postCreate:function(){
this.inherited(arguments);
var self=this;
_e86(this.bodyNode,"scroll",_e87[this.pagingMethod](function(_e88){
self._processScroll(_e88);
},null,this.pagingDelay));
},renderQuery:function(_e89,_e8a,_e8b){
var self=this,_e8c={query:_e89,count:0,node:_e8a,options:_e8b},_e8d=this.preload,_e8e;
if(!_e8a){
var _e8f={node:put(this.contentNode,"div.dgrid-preload",{rowIndex:0}),count:0,query:_e89,next:_e8c,options:_e8b};
_e8f.node.style.height="0";
_e8c.node=_e8a=put(this.contentNode,"div.dgrid-preload");
_e8c.previous=_e8f;
}
_e8a.rowIndex=this.minRowsPerPage;
if(_e8d){
if((_e8c.next=_e8d.next)&&this.bodyNode.scrollTop>=_e8d.node.offsetTop){
_e8c.previous=_e8d;
}else{
_e8c.next=_e8d;
_e8c.previous=_e8d.previous;
}
_e8c.previous.next=_e8c;
_e8c.next.previous=_e8c;
}else{
this.preload=_e8c;
}
var _e90=put(_e8a,"-div.dgrid-loading"),_e91=put(_e90,"div.dgrid-below");
_e91.innerHTML=this.loadingMessage;
function _e92(err){
put(_e90,"!");
if(err){
if(self._refreshDeferred){
self._refreshDeferred.reject(err);
delete self._refreshDeferred;
}
throw err;
}
};
_e8b=lang.mixin(this.get("queryOptions"),_e8b,{start:0,count:this.minRowsPerPage,query:_e89});
this._trackError(function(){
return _e8e=_e89(_e8b);
});
if(typeof _e8e==="undefined"){
_e92();
return;
}
_e85.when(self.renderArray(_e8e,_e8a,_e8b),function(trs){
var _e93=typeof _e8e.total==="undefined"?_e8e.length:_e8e.total;
return _e85.when(_e93,function(_e94){
put(_e90,"!");
var _e95=trs.length;
if(_e94===0){
if(self.noDataNode){
put(self.noDataNode,"!");
delete self.noDataNode;
}
self.noDataNode=put(self.contentNode,"div.dgrid-no-data");
self.noDataNode.innerHTML=self.noDataMessage;
}
var _e96=0;
for(var i=0;i<_e95;i++){
_e96+=self._calcRowHeight(trs[i]);
}
if(_e95&&_e96){
self.rowHeight=_e96/_e95;
}
_e94-=_e95;
_e8c.count=_e94;
_e8a.rowIndex=_e95;
if(_e94){
_e8a.style.height=Math.min(_e94*self.rowHeight,self.maxEmptySpace)+"px";
}else{
_e8a.style.display="none";
}
if(self._previousScrollPosition){
self.scrollTo(self._previousScrollPosition);
delete self._previousScrollPosition;
}
self._processScroll();
if(self._refreshDeferred){
self._refreshDeferred.resolve(_e8e);
delete self._refreshDeferred;
}
return trs;
},_e92);
},_e92);
return _e8e;
},refresh:function(_e97){
var self=this,keep=(_e97&&_e97.keepScrollPosition),dfd,_e98;
if(typeof keep==="undefined"){
keep=this.keepScrollPosition;
}
if(keep){
this._previousScrollPosition=this.getScrollPosition();
}
this.inherited(arguments);
if(this.store){
dfd=this._refreshDeferred=new _e85();
_e98=self.renderQuery(function(_e99){
return self.store.query(self.query,_e99);
});
if(typeof _e98==="undefined"){
dfd.reject();
}
return dfd.then(function(_e9a){
setTimeout(function(){
_e86.emit(self.domNode,"dgrid-refresh-complete",{bubbles:true,cancelable:false,grid:self,results:_e9a});
},0);
delete self._refreshDeferred;
return _e9a;
},function(err){
delete self._refreshDeferred;
throw err;
});
}
},resize:function(){
this.inherited(arguments);
this._processScroll();
},_calcRowHeight:function(_e9b){
var _e9c=_e9b.previousSibling;
return _e9c&&_e9c.offsetTop!=_e9b.offsetTop?_e9b.offsetHeight:0;
},lastScrollTop:0,_processScroll:function(evt){
var grid=this,_e9d=grid.bodyNode,_e9e=(evt&&evt.scrollTop)||this.getScrollPosition().y,_e9f=_e9d.offsetHeight+_e9e,_ea0,_ea1,_ea2=grid.preload,_ea3=grid.lastScrollTop,_ea4=grid.bufferRows*grid.rowHeight,_ea5=_ea4-grid.rowHeight,_ea6,_ea7,_ea8;
var _ea9=1;
grid.lastScrollTop=_e9e;
function _eaa(_eab,_eac,_ead,_eae){
var _eaf=grid.farOffRemoval,_ea1=_eab.node;
if(_eac>2*_eaf){
var row,_eb0=_ea1[_ead];
var _eb1=0;
var _eb2=0;
var _eb3=[];
while((row=_eb0)){
var _eb4=grid._calcRowHeight(row);
if(_eb1+_eb4+_eaf>_eac||(_eb0.className.indexOf("dgrid-row")<0&&_eb0.className.indexOf("dgrid-loading")<0)){
break;
}
var _eb0=row[_ead];
var _eb5,_eb6=row.observerIndex;
if(_eb6!=_eb5&&_eb5>-1){
var _eb7=grid.observers;
var _eb8=_eb7[_eb5];
_eb8&&_eb8.cancel();
_eb7[_eb5]=0;
}
_eb1+=_eb4;
_eb2+=row.count||1;
_eb5=_eb6;
grid.removeRow(row,true);
_eb3.push(row);
}
_eab.count+=_eb2;
if(_eae){
_ea1.rowIndex-=_eb2;
_eb9(_eab);
}else{
_ea1.style.height=(_ea1.offsetHeight+_eb1)+"px";
}
var _eba=put("div",_eb3);
setTimeout(function(){
put(_eba,"!");
},1);
}
};
function _eb9(_ebb,_ebc){
_ebb.node.style.height=Math.min(_ebb.count*grid.rowHeight,_ebc?Infinity:grid.maxEmptySpace)+"px";
};
while(_ea2&&!_ea2.node.offsetWidth){
_ea2=_ea2.previous;
}
while(_ea2&&_ea2!=_ea0){
_ea0=grid.preload;
grid.preload=_ea2;
_ea1=_ea2.node;
var _ebd=_ea1.offsetTop;
var _ebe;
if(_e9f+_ea9+_ea5<_ebd){
do{
_ea2=_ea2.previous;
}while(_ea2&&!_ea2.node.offsetWidth);
}else{
if(_e9e-_ea9-_ea5>(_ebd+(_ebe=_ea1.offsetHeight))){
do{
_ea2=_ea2.next;
}while(_ea2&&!_ea2.node.offsetWidth);
}else{
var _ebf=((_ea1.rowIndex?_e9e-_ea4:_e9f)-_ebd)/grid.rowHeight;
var _ec0=(_e9f-_e9e+2*_ea4)/grid.rowHeight;
var _ec1=Math.max(Math.min((_e9e-_ea3)*grid.rowHeight,grid.maxRowsPerPage/2),grid.maxRowsPerPage/-2);
_ec0+=Math.min(Math.abs(_ec1),10);
if(_ea1.rowIndex==0){
_ebf-=_ec0;
}
_ebf=Math.max(_ebf,0);
if(_ebf<10&&_ebf>0&&_ec0+_ebf<grid.maxRowsPerPage){
_ec0+=Math.max(0,_ebf);
_ebf=0;
}
_ec0=Math.min(Math.max(_ec0,grid.minRowsPerPage),grid.maxRowsPerPage,_ea2.count);
if(_ec0==0){
return;
}
_ec0=Math.ceil(_ec0);
_ebf=Math.min(Math.floor(_ebf),_ea2.count-_ec0);
var _ec2=lang.mixin(grid.get("queryOptions"),_ea2.options);
_ea2.count-=_ec0;
var _ec3=_ea1,_ec4,_ec5=grid.queryRowsOverlap,_ec6=_ea1.rowIndex>0&&_ea2;
if(_ec6){
var _ec7=_ea2.previous;
if(_ec7){
_eaa(_ec7,_e9e-(_ec7.node.offsetTop+_ec7.node.offsetHeight),"nextSibling");
if(_ebf>0&&_ec7.node==_ea1.previousSibling){
_ebf=Math.min(_ea2.count,_ebf);
_ea2.previous.count+=_ebf;
_eb9(_ea2.previous,true);
_ea1.rowIndex+=_ebf;
_ec5=0;
}else{
_ec0+=_ebf;
}
_ea2.count-=_ebf;
}
_ec2.start=_ea1.rowIndex-_ec5;
_ea1.rowIndex+=_ec0;
}else{
if(_ea2.next){
_eaa(_ea2.next,_ea2.next.node.offsetTop-_e9f,"previousSibling",true);
var _ec3=_ea1.nextSibling;
if(_ec3==_ea2.next.node){
_ea2.next.count+=_ea2.count-_ebf;
_ea2.next.node.rowIndex=_ebf+_ec0;
_eb9(_ea2.next);
_ea2.count=_ebf;
_ec5=0;
}else{
_ec4=true;
}
}
_ec2.start=_ea2.count;
}
_ec2.count=Math.min(_ec0+_ec5,grid.maxRowsPerPage);
if(_ec4&&_ec3&&_ec3.offsetWidth){
_ec4=_ec3.offsetTop;
}
_eb9(_ea2);
var _ec8=put(_ec3,"-div.dgrid-loading[style=height:"+_ec0*grid.rowHeight+"px]"),_ec9=put(_ec8,"div.dgrid-"+(_ec6?"below":"above"));
_ec9.innerHTML=grid.loadingMessage;
_ec8.count=_ec0;
_ec8.blockRowIndex=true;
_ec2.query=_ea2.query;
var _eca=_ea2.query(_ec2),_ecb=grid._trackError(function(){
return _eca;
});
if(_ecb===undefined){
put(_ec8,"!");
return;
}
(function(_ecc,_ecd,_ece,_ecf,_ed0){
_ea8=_e85.when(grid.renderArray(_ed0,_ecc,_ec2),function(rows){
_ea7=_ed0;
_ec3=_ecc.nextSibling;
put(_ecc,"!");
if(_ecf&&_ec3&&_ec3.offsetWidth){
var pos=grid.getScrollPosition();
grid.scrollTo({x:pos.x,y:pos.y+_ec3.offsetTop-_ecf,preserveMomentum:true});
}
if(_ece){
_e85.when(_ed0.total||_ed0.length,function(_ed1){
_ece.count=_ed1-_ece.node.rowIndex;
_eb9(_ece);
});
}
grid._processScroll();
return rows;
},function(e){
put(_ecc,"!");
throw e;
});
}).call(this,_ec8,_e9d,_ec6,_ec4,_eca);
_ea2=_ea2.previous;
}
}
}
if(_ea8&&(_ea6=this._refreshDeferred)){
delete this._refreshDeferred;
_e85.when(_ea8,function(){
_ea6.resolve(_ea7);
});
}
}});
});
},"dijit/a11y":function(){
define(["dojo/_base/array","dojo/dom","dojo/dom-attr","dojo/dom-style","dojo/_base/lang","dojo/sniff","./main"],function(_ed2,dom,_ed3,_ed4,lang,has,_ed5){
var _ed6;
var a11y={_isElementShown:function(elem){
var s=_ed4.get(elem);
return (s.visibility!="hidden")&&(s.visibility!="collapsed")&&(s.display!="none")&&(_ed3.get(elem,"type")!="hidden");
},hasDefaultTabStop:function(elem){
switch(elem.nodeName.toLowerCase()){
case "a":
return _ed3.has(elem,"href");
case "area":
case "button":
case "input":
case "object":
case "select":
case "textarea":
return true;
case "iframe":
var body;
try{
var _ed7=elem.contentDocument;
if("designMode" in _ed7&&_ed7.designMode=="on"){
return true;
}
body=_ed7.body;
}
catch(e1){
try{
body=elem.contentWindow.document.body;
}
catch(e2){
return false;
}
}
return body&&(body.contentEditable=="true"||(body.firstChild&&body.firstChild.contentEditable=="true"));
default:
return elem.contentEditable=="true";
}
},effectiveTabIndex:function(elem){
if(_ed3.get(elem,"disabled")){
return _ed6;
}else{
if(_ed3.has(elem,"tabIndex")){
return +_ed3.get(elem,"tabIndex");
}else{
return a11y.hasDefaultTabStop(elem)?0:_ed6;
}
}
},isTabNavigable:function(elem){
return a11y.effectiveTabIndex(elem)>=0;
},isFocusable:function(elem){
return a11y.effectiveTabIndex(elem)>=-1;
},_getTabNavigable:function(root){
var _ed8,last,_ed9,_eda,_edb,_edc,_edd={};
function _ede(node){
return node&&node.tagName.toLowerCase()=="input"&&node.type&&node.type.toLowerCase()=="radio"&&node.name&&node.name.toLowerCase();
};
var _edf=a11y._isElementShown,_ee0=a11y.effectiveTabIndex;
var _ee1=function(_ee2){
for(var _ee3=_ee2.firstChild;_ee3;_ee3=_ee3.nextSibling){
if(_ee3.nodeType!=1||(has("ie")<=9&&_ee3.scopeName!=="HTML")||!_edf(_ee3)){
continue;
}
var _ee4=_ee0(_ee3);
if(_ee4>=0){
if(_ee4==0){
if(!_ed8){
_ed8=_ee3;
}
last=_ee3;
}else{
if(_ee4>0){
if(!_ed9||_ee4<_eda){
_eda=_ee4;
_ed9=_ee3;
}
if(!_edb||_ee4>=_edc){
_edc=_ee4;
_edb=_ee3;
}
}
}
var rn=_ede(_ee3);
if(_ed3.get(_ee3,"checked")&&rn){
_edd[rn]=_ee3;
}
}
if(_ee3.nodeName.toUpperCase()!="SELECT"){
_ee1(_ee3);
}
}
};
if(_edf(root)){
_ee1(root);
}
function rs(node){
return _edd[_ede(node)]||node;
};
return {first:rs(_ed8),last:rs(last),lowest:rs(_ed9),highest:rs(_edb)};
},getFirstInTabbingOrder:function(root,doc){
var _ee5=a11y._getTabNavigable(dom.byId(root,doc));
return _ee5.lowest?_ee5.lowest:_ee5.first;
},getLastInTabbingOrder:function(root,doc){
var _ee6=a11y._getTabNavigable(dom.byId(root,doc));
return _ee6.last?_ee6.last:_ee6.highest;
}};
1&&lang.mixin(_ed5,a11y);
return a11y;
});
},"dijit/form/_ToggleButtonMixin":function(){
define(["dojo/_base/declare","dojo/dom-attr"],function(_ee7,_ee8){
return _ee7("dijit.form._ToggleButtonMixin",null,{checked:false,_aria_attr:"aria-pressed",_onClick:function(evt){
var _ee9=this.checked;
this._set("checked",!_ee9);
var ret=this.inherited(arguments);
this.set("checked",ret?this.checked:_ee9);
return ret;
},_setCheckedAttr:function(_eea,_eeb){
this._set("checked",_eea);
var node=this.focusNode||this.domNode;
if(this._created){
if(_ee8.get(node,"checked")!=!!_eea){
_ee8.set(node,"checked",!!_eea);
}
}
node.setAttribute(this._aria_attr,String(_eea));
this._handleOnChange(_eea,_eeb);
},postCreate:function(){
this.inherited(arguments);
var node=this.focusNode||this.domNode;
if(this.checked){
node.setAttribute("checked","checked");
}
},reset:function(){
this._hasBeenBlurred=false;
this.set("checked",this.params.checked||false);
}});
});
},"dijit/Calendar":function(){
define(["dojo/_base/array","dojo/date","dojo/date/locale","dojo/_base/declare","dojo/dom-attr","dojo/dom-class","dojo/_base/kernel","dojo/keys","dojo/_base/lang","dojo/on","dojo/sniff","./CalendarLite","./_Widget","./_CssStateMixin","./_TemplatedMixin","./form/DropDownButton"],function(_eec,date,_eed,_eee,_eef,_ef0,_ef1,keys,lang,on,has,_ef2,_ef3,_ef4,_ef5,_ef6){
var _ef7=_eee("dijit.Calendar",[_ef2,_ef3,_ef4],{cssStateNodes:{"decrementMonth":"dijitCalendarArrow","incrementMonth":"dijitCalendarArrow","previousYearLabelNode":"dijitCalendarPreviousYear","nextYearLabelNode":"dijitCalendarNextYear"},setValue:function(_ef8){
_ef1.deprecated("dijit.Calendar:setValue() is deprecated.  Use set('value', ...) instead.","","2.0");
this.set("value",_ef8);
},_createMonthWidget:function(){
return new _ef7._MonthDropDownButton({id:this.id+"_mddb",tabIndex:-1,onMonthSelect:lang.hitch(this,"_onMonthSelect"),lang:this.lang,dateLocaleModule:this.dateLocaleModule},this.monthNode);
},postCreate:function(){
this.inherited(arguments);
this.own(on(this.domNode,"keydown",lang.hitch(this,"_onKeyDown")),on(this.dateRowsNode,"mouseover",lang.hitch(this,"_onDayMouseOver")),on(this.dateRowsNode,"mouseout",lang.hitch(this,"_onDayMouseOut")),on(this.dateRowsNode,"mousedown",lang.hitch(this,"_onDayMouseDown")),on(this.dateRowsNode,"mouseup",lang.hitch(this,"_onDayMouseUp")));
},_onMonthSelect:function(_ef9){
var date=new this.dateClassObj(this.currentFocus);
date.setDate(1);
date.setMonth(_ef9);
var _efa=this.dateModule.getDaysInMonth(date);
var _efb=this.currentFocus.getDate();
date.setDate(Math.min(_efb,_efa));
this._setCurrentFocusAttr(date);
},_onDayMouseOver:function(evt){
var node=_ef0.contains(evt.target,"dijitCalendarDateLabel")?evt.target.parentNode:evt.target;
if(node&&((node.dijitDateValue&&!_ef0.contains(node,"dijitCalendarDisabledDate"))||node==this.previousYearLabelNode||node==this.nextYearLabelNode)){
_ef0.add(node,"dijitCalendarHoveredDate");
this._currentNode=node;
}
},_onDayMouseOut:function(evt){
if(!this._currentNode){
return;
}
if(evt.relatedTarget&&evt.relatedTarget.parentNode==this._currentNode){
return;
}
var cls="dijitCalendarHoveredDate";
if(_ef0.contains(this._currentNode,"dijitCalendarActiveDate")){
cls+=" dijitCalendarActiveDate";
}
_ef0.remove(this._currentNode,cls);
this._currentNode=null;
},_onDayMouseDown:function(evt){
var node=evt.target.parentNode;
if(node&&node.dijitDateValue&&!_ef0.contains(node,"dijitCalendarDisabledDate")){
_ef0.add(node,"dijitCalendarActiveDate");
this._currentNode=node;
}
},_onDayMouseUp:function(evt){
var node=evt.target.parentNode;
if(node&&node.dijitDateValue){
_ef0.remove(node,"dijitCalendarActiveDate");
}
},handleKey:function(evt){
var _efc=-1,_efd,_efe=this.currentFocus;
switch(evt.keyCode){
case keys.RIGHT_ARROW:
_efc=1;
case keys.LEFT_ARROW:
_efd="day";
if(!this.isLeftToRight()){
_efc*=-1;
}
break;
case keys.DOWN_ARROW:
_efc=1;
case keys.UP_ARROW:
_efd="week";
break;
case keys.PAGE_DOWN:
_efc=1;
case keys.PAGE_UP:
_efd=evt.ctrlKey||evt.altKey?"year":"month";
break;
case keys.END:
_efe=this.dateModule.add(_efe,"month",1);
_efd="day";
case keys.HOME:
_efe=new this.dateClassObj(_efe);
_efe.setDate(1);
break;
default:
return true;
}
if(_efd){
_efe=this.dateModule.add(_efe,_efd,_efc);
}
this._setCurrentFocusAttr(_efe);
return false;
},_onKeyDown:function(evt){
if(!this.handleKey(evt)){
evt.stopPropagation();
evt.preventDefault();
}
},onValueSelected:function(){
},onChange:function(_eff){
this.onValueSelected(_eff);
},getClassForDate:function(){
}});
_ef7._MonthDropDownButton=_eee("dijit.Calendar._MonthDropDownButton",_ef6,{onMonthSelect:function(){
},postCreate:function(){
this.inherited(arguments);
this.dropDown=new _ef7._MonthDropDown({id:this.id+"_mdd",onChange:this.onMonthSelect});
},_setMonthAttr:function(_f00){
var _f01=this.dateLocaleModule.getNames("months","wide","standAlone",this.lang,_f00);
this.dropDown.set("months",_f01);
this.containerNode.innerHTML=(has("ie")==6?"":"<div class='dijitSpacer'>"+this.dropDown.domNode.innerHTML+"</div>")+"<div class='dijitCalendarMonthLabel dijitCalendarCurrentMonthLabel'>"+_f01[_f00.getMonth()]+"</div>";
}});
_ef7._MonthDropDown=_eee("dijit.Calendar._MonthDropDown",[_ef3,_ef5],{months:[],templateString:"<div class='dijitCalendarMonthMenu dijitMenu' "+"data-dojo-attach-event='onclick:_onClick,onmouseover:_onMenuHover,onmouseout:_onMenuHover'></div>",_setMonthsAttr:function(_f02){
this.domNode.innerHTML=_eec.map(_f02,function(_f03,idx){
return _f03?"<div class='dijitCalendarMonthLabel' month='"+idx+"'>"+_f03+"</div>":"";
}).join("");
},_onClick:function(evt){
this.onChange(_eef.get(evt.target,"month"));
},onChange:function(){
},_onMenuHover:function(evt){
_ef0.toggle(evt.target,"dijitCalendarMonthLabelHover",evt.type=="mouseover");
}});
return _ef7;
});
},"dijit/_Widget":function(){
define(["dojo/aspect","dojo/_base/config","dojo/_base/connect","dojo/_base/declare","dojo/has","dojo/_base/kernel","dojo/_base/lang","dojo/query","dojo/ready","./registry","./_WidgetBase","./_OnDijitClickMixin","./_FocusMixin","dojo/uacss","./hccss"],function(_f04,_f05,_f06,_f07,has,_f08,lang,_f09,_f0a,_f0b,_f0c,_f0d,_f0e){
function _f0f(){
};
function _f10(_f11){
return function(obj,_f12,_f13,_f14){
if(obj&&typeof _f12=="string"&&obj[_f12]==_f0f){
return obj.on(_f12.substring(2).toLowerCase(),lang.hitch(_f13,_f14));
}
return _f11.apply(_f06,arguments);
};
};
_f04.around(_f06,"connect",_f10);
if(_f08.connect){
_f04.around(_f08,"connect",_f10);
}
var _f15=_f07("dijit._Widget",[_f0c,_f0d,_f0e],{onClick:_f0f,onDblClick:_f0f,onKeyDown:_f0f,onKeyPress:_f0f,onKeyUp:_f0f,onMouseDown:_f0f,onMouseMove:_f0f,onMouseOut:_f0f,onMouseOver:_f0f,onMouseLeave:_f0f,onMouseEnter:_f0f,onMouseUp:_f0f,constructor:function(_f16){
this._toConnect={};
for(var name in _f16){
if(this[name]===_f0f){
this._toConnect[name.replace(/^on/,"").toLowerCase()]=_f16[name];
delete _f16[name];
}
}
},postCreate:function(){
this.inherited(arguments);
for(var name in this._toConnect){
this.on(name,this._toConnect[name]);
}
delete this._toConnect;
},on:function(type,func){
if(this[this._onMap(type)]===_f0f){
return _f06.connect(this.domNode,type.toLowerCase(),this,func);
}
return this.inherited(arguments);
},_setFocusedAttr:function(val){
this._focused=val;
this._set("focused",val);
},setAttribute:function(attr,_f17){
_f08.deprecated(this.declaredClass+"::setAttribute(attr, value) is deprecated. Use set() instead.","","2.0");
this.set(attr,_f17);
},attr:function(name,_f18){
var args=arguments.length;
if(args>=2||typeof name==="object"){
return this.set.apply(this,arguments);
}else{
return this.get(name);
}
},getDescendants:function(){
_f08.deprecated(this.declaredClass+"::getDescendants() is deprecated. Use getChildren() instead.","","2.0");
return this.containerNode?_f09("[widgetId]",this.containerNode).map(_f0b.byNode):[];
},_onShow:function(){
this.onShow();
},onShow:function(){
},onHide:function(){
},onClose:function(){
return true;
}});
if(has("dijit-legacy-requires")){
_f0a(0,function(){
var _f19=["dijit/_base"];
require(_f19);
});
}
return _f15;
});
},"dojo/touch":function(){
define(["./_base/kernel","./aspect","./dom","./dom-class","./_base/lang","./on","./has","./mouse","./domReady","./_base/window"],function(dojo,_f1a,dom,_f1b,lang,on,has,_f1c,_f1d,win){
var _f1e=has("touch");
var ios4=has("ios")<5;
var _f1f=navigator.pointerEnabled||navigator.msPointerEnabled,_f20=(function(){
var _f21={};
for(var type in {down:1,move:1,up:1,cancel:1,over:1,out:1}){
_f21[type]=!navigator.pointerEnabled?"MSPointer"+type.charAt(0).toUpperCase()+type.slice(1):"pointer"+type;
}
return _f21;
})();
var _f22,_f23,_f24,_f25,_f26,_f27,_f28,_f29;
var _f2a;
function _f2b(_f2c,_f2d,_f2e){
if(_f1f&&_f2e){
return function(node,_f2f){
return on(node,_f2e,_f2f);
};
}else{
if(_f1e){
return function(node,_f30){
var _f31=on(node,_f2d,_f30),_f32=on(node,_f2c,function(evt){
if(!_f2a||(new Date()).getTime()>_f2a+1000){
_f30.call(this,evt);
}
});
return {remove:function(){
_f31.remove();
_f32.remove();
}};
};
}else{
return function(node,_f33){
return on(node,_f2c,_f33);
};
}
}
};
function _f34(node){
do{
if(node.dojoClick!==undefined){
return node.dojoClick;
}
}while(node=node.parentNode);
};
function _f35(e,_f36,_f37){
_f23=!e.target.disabled&&_f34(e.target);
if(_f23){
_f24=e.target;
_f25=e.touches?e.touches[0].pageX:e.clientX;
_f26=e.touches?e.touches[0].pageY:e.clientY;
_f27=(typeof _f23=="object"?_f23.x:(typeof _f23=="number"?_f23:0))||4;
_f28=(typeof _f23=="object"?_f23.y:(typeof _f23=="number"?_f23:0))||4;
if(!_f22){
_f22=true;
win.doc.addEventListener(_f36,function(e){
_f23=_f23&&e.target==_f24&&Math.abs((e.touches?e.touches[0].pageX:e.clientX)-_f25)<=_f27&&Math.abs((e.touches?e.touches[0].pageY:e.clientY)-_f26)<=_f28;
},true);
win.doc.addEventListener(_f37,function(e){
if(_f23){
_f29=(new Date()).getTime();
var _f38=e.target;
if(_f38.tagName==="LABEL"){
_f38=dom.byId(_f38.getAttribute("for"))||_f38;
}
setTimeout(function(){
on.emit(_f38,"click",{bubbles:true,cancelable:true,_dojo_click:true});
});
}
},true);
function _f39(type){
win.doc.addEventListener(type,function(e){
if(!e._dojo_click&&(new Date()).getTime()<=_f29+1000&&!(e.target.tagName=="INPUT"&&_f1b.contains(e.target,"dijitOffScreen"))){
e.stopPropagation();
e.stopImmediatePropagation&&e.stopImmediatePropagation();
if(type=="click"&&(e.target.tagName!="INPUT"||e.target.type=="radio"||e.target.type=="checkbox")&&e.target.tagName!="TEXTAREA"&&e.target.tagName!="AUDIO"&&e.target.tagName!="VIDEO"){
e.preventDefault();
}
}
},true);
};
_f39("click");
_f39("mousedown");
_f39("mouseup");
}
}
};
var _f3a;
if(_f1e){
if(_f1f){
_f1d(function(){
win.doc.addEventListener(_f20.down,function(evt){
_f35(evt,_f20.move,_f20.up);
},true);
});
}else{
_f1d(function(){
_f3a=win.body();
win.doc.addEventListener("touchstart",function(evt){
_f2a=(new Date()).getTime();
var _f3b=_f3a;
_f3a=evt.target;
on.emit(_f3b,"dojotouchout",{relatedTarget:_f3a,bubbles:true});
on.emit(_f3a,"dojotouchover",{relatedTarget:_f3b,bubbles:true});
_f35(evt,"touchmove","touchend");
},true);
function _f3c(evt){
var _f3d=lang.delegate(evt,{bubbles:true});
if(has("ios")>=6){
_f3d.touches=evt.touches;
_f3d.altKey=evt.altKey;
_f3d.changedTouches=evt.changedTouches;
_f3d.ctrlKey=evt.ctrlKey;
_f3d.metaKey=evt.metaKey;
_f3d.shiftKey=evt.shiftKey;
_f3d.targetTouches=evt.targetTouches;
}
return _f3d;
};
on(win.doc,"touchmove",function(evt){
_f2a=(new Date()).getTime();
var _f3e=win.doc.elementFromPoint(evt.pageX-(ios4?0:win.global.pageXOffset),evt.pageY-(ios4?0:win.global.pageYOffset));
if(_f3e){
if(_f3a!==_f3e){
on.emit(_f3a,"dojotouchout",{relatedTarget:_f3e,bubbles:true});
on.emit(_f3e,"dojotouchover",{relatedTarget:_f3a,bubbles:true});
_f3a=_f3e;
}
if(!on.emit(_f3e,"dojotouchmove",_f3c(evt))){
evt.preventDefault();
}
}
});
on(win.doc,"touchend",function(evt){
_f2a=(new Date()).getTime();
var node=win.doc.elementFromPoint(evt.pageX-(ios4?0:win.global.pageXOffset),evt.pageY-(ios4?0:win.global.pageYOffset))||win.body();
on.emit(node,"dojotouchend",_f3c(evt));
});
});
}
}
var _f3f={press:_f2b("mousedown","touchstart",_f20.down),move:_f2b("mousemove","dojotouchmove",_f20.move),release:_f2b("mouseup","dojotouchend",_f20.up),cancel:_f2b(_f1c.leave,"touchcancel",_f1e?_f20.cancel:null),over:_f2b("mouseover","dojotouchover",_f20.over),out:_f2b("mouseout","dojotouchout",_f20.out),enter:_f1c._eventHandler(_f2b("mouseover","dojotouchover",_f20.over)),leave:_f1c._eventHandler(_f2b("mouseout","dojotouchout",_f20.out))};
1&&(dojo.touch=_f3f);
return _f3f;
});
},"dojo/fx":function(){
define(["./_base/lang","./Evented","./_base/kernel","./_base/array","./aspect","./_base/fx","./dom","./dom-style","./dom-geometry","./ready","require"],function(lang,_f40,dojo,_f41,_f42,_f43,dom,_f44,geom,_f45,_f46){
if(!dojo.isAsync){
_f45(0,function(){
var _f47=["./fx/Toggler"];
_f46(_f47);
});
}
var _f48=dojo.fx={};
var _f49={_fire:function(evt,args){
if(this[evt]){
this[evt].apply(this,args||[]);
}
return this;
}};
var _f4a=function(_f4b){
this._index=-1;
this._animations=_f4b||[];
this._current=this._onAnimateCtx=this._onEndCtx=null;
this.duration=0;
_f41.forEach(this._animations,function(a){
this.duration+=a.duration;
if(a.delay){
this.duration+=a.delay;
}
},this);
};
_f4a.prototype=new _f40();
lang.extend(_f4a,{_onAnimate:function(){
this._fire("onAnimate",arguments);
},_onEnd:function(){
this._onAnimateCtx.remove();
this._onEndCtx.remove();
this._onAnimateCtx=this._onEndCtx=null;
if(this._index+1==this._animations.length){
this._fire("onEnd");
}else{
this._current=this._animations[++this._index];
this._onAnimateCtx=_f42.after(this._current,"onAnimate",lang.hitch(this,"_onAnimate"),true);
this._onEndCtx=_f42.after(this._current,"onEnd",lang.hitch(this,"_onEnd"),true);
this._current.play(0,true);
}
},play:function(_f4c,_f4d){
if(!this._current){
this._current=this._animations[this._index=0];
}
if(!_f4d&&this._current.status()=="playing"){
return this;
}
var _f4e=_f42.after(this._current,"beforeBegin",lang.hitch(this,function(){
this._fire("beforeBegin");
}),true),_f4f=_f42.after(this._current,"onBegin",lang.hitch(this,function(arg){
this._fire("onBegin",arguments);
}),true),_f50=_f42.after(this._current,"onPlay",lang.hitch(this,function(arg){
this._fire("onPlay",arguments);
_f4e.remove();
_f4f.remove();
_f50.remove();
}));
if(this._onAnimateCtx){
this._onAnimateCtx.remove();
}
this._onAnimateCtx=_f42.after(this._current,"onAnimate",lang.hitch(this,"_onAnimate"),true);
if(this._onEndCtx){
this._onEndCtx.remove();
}
this._onEndCtx=_f42.after(this._current,"onEnd",lang.hitch(this,"_onEnd"),true);
this._current.play.apply(this._current,arguments);
return this;
},pause:function(){
if(this._current){
var e=_f42.after(this._current,"onPause",lang.hitch(this,function(arg){
this._fire("onPause",arguments);
e.remove();
}),true);
this._current.pause();
}
return this;
},gotoPercent:function(_f51,_f52){
this.pause();
var _f53=this.duration*_f51;
this._current=null;
_f41.some(this._animations,function(a){
if(a.duration<=_f53){
this._current=a;
return true;
}
_f53-=a.duration;
return false;
});
if(this._current){
this._current.gotoPercent(_f53/this._current.duration,_f52);
}
return this;
},stop:function(_f54){
if(this._current){
if(_f54){
for(;this._index+1<this._animations.length;++this._index){
this._animations[this._index].stop(true);
}
this._current=this._animations[this._index];
}
var e=_f42.after(this._current,"onStop",lang.hitch(this,function(arg){
this._fire("onStop",arguments);
e.remove();
}),true);
this._current.stop();
}
return this;
},status:function(){
return this._current?this._current.status():"stopped";
},destroy:function(){
if(this._onAnimateCtx){
this._onAnimateCtx.remove();
}
if(this._onEndCtx){
this._onEndCtx.remove();
}
}});
lang.extend(_f4a,_f49);
_f48.chain=function(_f55){
return new _f4a(_f55);
};
var _f56=function(_f57){
this._animations=_f57||[];
this._connects=[];
this._finished=0;
this.duration=0;
_f41.forEach(_f57,function(a){
var _f58=a.duration;
if(a.delay){
_f58+=a.delay;
}
if(this.duration<_f58){
this.duration=_f58;
}
this._connects.push(_f42.after(a,"onEnd",lang.hitch(this,"_onEnd"),true));
},this);
this._pseudoAnimation=new _f43.Animation({curve:[0,1],duration:this.duration});
var self=this;
_f41.forEach(["beforeBegin","onBegin","onPlay","onAnimate","onPause","onStop","onEnd"],function(evt){
self._connects.push(_f42.after(self._pseudoAnimation,evt,function(){
self._fire(evt,arguments);
},true));
});
};
lang.extend(_f56,{_doAction:function(_f59,args){
_f41.forEach(this._animations,function(a){
a[_f59].apply(a,args);
});
return this;
},_onEnd:function(){
if(++this._finished>this._animations.length){
this._fire("onEnd");
}
},_call:function(_f5a,args){
var t=this._pseudoAnimation;
t[_f5a].apply(t,args);
},play:function(_f5b,_f5c){
this._finished=0;
this._doAction("play",arguments);
this._call("play",arguments);
return this;
},pause:function(){
this._doAction("pause",arguments);
this._call("pause",arguments);
return this;
},gotoPercent:function(_f5d,_f5e){
var ms=this.duration*_f5d;
_f41.forEach(this._animations,function(a){
a.gotoPercent(a.duration<ms?1:(ms/a.duration),_f5e);
});
this._call("gotoPercent",arguments);
return this;
},stop:function(_f5f){
this._doAction("stop",arguments);
this._call("stop",arguments);
return this;
},status:function(){
return this._pseudoAnimation.status();
},destroy:function(){
_f41.forEach(this._connects,function(_f60){
_f60.remove();
});
}});
lang.extend(_f56,_f49);
_f48.combine=function(_f61){
return new _f56(_f61);
};
_f48.wipeIn=function(args){
var node=args.node=dom.byId(args.node),s=node.style,o;
var anim=_f43.animateProperty(lang.mixin({properties:{height:{start:function(){
o=s.overflow;
s.overflow="hidden";
if(s.visibility=="hidden"||s.display=="none"){
s.height="1px";
s.display="";
s.visibility="";
return 1;
}else{
var _f62=_f44.get(node,"height");
return Math.max(_f62,1);
}
},end:function(){
return node.scrollHeight;
}}}},args));
var fini=function(){
s.height="auto";
s.overflow=o;
};
_f42.after(anim,"onStop",fini,true);
_f42.after(anim,"onEnd",fini,true);
return anim;
};
_f48.wipeOut=function(args){
var node=args.node=dom.byId(args.node),s=node.style,o;
var anim=_f43.animateProperty(lang.mixin({properties:{height:{end:1}}},args));
_f42.after(anim,"beforeBegin",function(){
o=s.overflow;
s.overflow="hidden";
s.display="";
},true);
var fini=function(){
s.overflow=o;
s.height="auto";
s.display="none";
};
_f42.after(anim,"onStop",fini,true);
_f42.after(anim,"onEnd",fini,true);
return anim;
};
_f48.slideTo=function(args){
var node=args.node=dom.byId(args.node),top=null,left=null;
var init=(function(n){
return function(){
var cs=_f44.getComputedStyle(n);
var pos=cs.position;
top=(pos=="absolute"?n.offsetTop:parseInt(cs.top)||0);
left=(pos=="absolute"?n.offsetLeft:parseInt(cs.left)||0);
if(pos!="absolute"&&pos!="relative"){
var ret=geom.position(n,true);
top=ret.y;
left=ret.x;
n.style.position="absolute";
n.style.top=top+"px";
n.style.left=left+"px";
}
};
})(node);
init();
var anim=_f43.animateProperty(lang.mixin({properties:{top:args.top||0,left:args.left||0}},args));
_f42.after(anim,"beforeBegin",init,true);
return anim;
};
return _f48;
});
},"dijit/form/nls/ComboBox":function(){
define({root:({previousMessage:"Previous choices",nextMessage:"More choices"}),"zh":true,"zh-tw":true,"uk":true,"tr":true,"th":true,"sv":true,"sl":true,"sk":true,"ru":true,"ro":true,"pt":true,"pt-pt":true,"pl":true,"nl":true,"nb":true,"ko":true,"kk":true,"ja":true,"it":true,"hu":true,"hr":true,"he":true,"fr":true,"fi":true,"es":true,"el":true,"de":true,"da":true,"cs":true,"ca":true,"bg":true,"az":true,"ar":true});
},"dijit/form/nls/pt/ComboBox":function(){
define(({previousMessage:"Opções anteriores",nextMessage:"Mais opções"}));
},"dijit/form/nls/pt/ComboBox":function(){
define(({previousMessage:"Opções anteriores",nextMessage:"Mais opções"}));
},"dijit/_DialogMixin":function(){
define(["dojo/_base/declare","./a11y"],function(_f63,a11y){
return _f63("dijit._DialogMixin",null,{execute:function(){
},onCancel:function(){
},onExecute:function(){
},_onSubmit:function(){
this.onExecute();
this.execute(this.get("value"));
},_getFocusItems:function(){
var _f64=a11y._getTabNavigable(this.containerNode);
this._firstFocusItem=_f64.lowest||_f64.first||this.closeButtonNode||this.domNode;
this._lastFocusItem=_f64.last||_f64.highest||this._firstFocusItem;
}});
});
},"dijit/nls/common":function(){
define({root:({buttonOk:"OK",buttonCancel:"Cancel",buttonSave:"Save",itemClose:"Close"}),"zh":true,"zh-tw":true,"uk":true,"tr":true,"th":true,"sv":true,"sl":true,"sk":true,"ru":true,"ro":true,"pt":true,"pt-pt":true,"pl":true,"nl":true,"nb":true,"ko":true,"kk":true,"ja":true,"it":true,"hu":true,"hr":true,"he":true,"fr":true,"fi":true,"es":true,"el":true,"de":true,"da":true,"cs":true,"ca":true,"bg":true,"az":true,"ar":true});
},"dijit/nls/pt/common":function(){
define(({buttonOk:"OK",buttonCancel:"Cancelar",buttonSave:"Salvar",itemClose:"Fechar"}));
},"dijit/nls/pt/common":function(){
define(({buttonOk:"OK",buttonCancel:"Cancelar",buttonSave:"Salvar",itemClose:"Fechar"}));
},"dijit/Tree":function(){
define(["dojo/_base/array","dojo/aspect","dojo/_base/connect","dojo/cookie","dojo/_base/declare","dojo/Deferred","dojo/promise/all","dojo/dom","dojo/dom-class","dojo/dom-geometry","dojo/dom-style","dojo/errors/create","dojo/fx","dojo/has","dojo/_base/kernel","dojo/keys","dojo/_base/lang","dojo/on","dojo/topic","dojo/touch","dojo/when","./a11yclick","./focus","./registry","./_base/manager","./_Widget","./_TemplatedMixin","./_Container","./_Contained","./_CssStateMixin","./_KeyNavMixin","dojo/text!./templates/TreeNode.html","dojo/text!./templates/Tree.html","./tree/TreeStoreModel","./tree/ForestStoreModel","./tree/_dndSelector","dojo/query!css2"],function(_f65,_f66,_f67,_f68,_f69,_f6a,all,dom,_f6b,_f6c,_f6d,_f6e,_f6f,has,_f70,keys,lang,on,_f71,_f72,when,_f73,_f74,_f75,_f76,_f77,_f78,_f79,_f7a,_f7b,_f7c,_f7d,_f7e,_f7f,_f80,_f81){
function _f82(d){
return lang.delegate(d.promise||d,{addCallback:function(_f83){
this.then(_f83);
},addErrback:function(_f84){
this.otherwise(_f84);
}});
};
var _f85=_f69("dijit._TreeNode",[_f77,_f78,_f79,_f7a,_f7b],{item:null,isTreeNode:true,label:"",_setLabelAttr:function(val){
this.labelNode[this.labelType=="html"?"innerHTML":"innerText" in this.labelNode?"innerText":"textContent"]=val;
this._set("label",val);
},labelType:"text",isExpandable:null,isExpanded:false,state:"NotLoaded",templateString:_f7d,baseClass:"dijitTreeNode",cssStateNodes:{rowNode:"dijitTreeRow"},_setTooltipAttr:{node:"rowNode",type:"attribute",attribute:"title"},buildRendering:function(){
this.inherited(arguments);
this._setExpando();
this._updateItemClasses(this.item);
if(this.isExpandable){
this.labelNode.setAttribute("aria-expanded",this.isExpanded);
}
this.setSelected(false);
},_setIndentAttr:function(_f86){
var _f87=(Math.max(_f86,0)*this.tree._nodePixelIndent)+"px";
_f6d.set(this.domNode,"backgroundPosition",_f87+" 0px");
_f6d.set(this.rowNode,this.isLeftToRight()?"paddingLeft":"paddingRight",_f87);
_f65.forEach(this.getChildren(),function(_f88){
_f88.set("indent",_f86+1);
});
this._set("indent",_f86);
},markProcessing:function(){
this.state="Loading";
this._setExpando(true);
},unmarkProcessing:function(){
this._setExpando(false);
},_updateItemClasses:function(item){
var tree=this.tree,_f89=tree.model;
if(tree._v10Compat&&item===_f89.root){
item=null;
}
this._applyClassAndStyle(item,"icon","Icon");
this._applyClassAndStyle(item,"label","Label");
this._applyClassAndStyle(item,"row","Row");
this.tree._startPaint(true);
},_applyClassAndStyle:function(item,_f8a,_f8b){
var _f8c="_"+_f8a+"Class";
var _f8d=_f8a+"Node";
var _f8e=this[_f8c];
this[_f8c]=this.tree["get"+_f8b+"Class"](item,this.isExpanded);
_f6b.replace(this[_f8d],this[_f8c]||"",_f8e||"");
_f6d.set(this[_f8d],this.tree["get"+_f8b+"Style"](item,this.isExpanded)||{});
},_updateLayout:function(){
var _f8f=this.getParent();
if(!_f8f||!_f8f.rowNode||_f8f.rowNode.style.display=="none"){
_f6b.add(this.domNode,"dijitTreeIsRoot");
}else{
_f6b.toggle(this.domNode,"dijitTreeIsLast",!this.getNextSibling());
}
},_setExpando:function(_f90){
var _f91=["dijitTreeExpandoLoading","dijitTreeExpandoOpened","dijitTreeExpandoClosed","dijitTreeExpandoLeaf"],_f92=["*","-","+","*"],idx=_f90?0:(this.isExpandable?(this.isExpanded?1:2):3);
_f6b.replace(this.expandoNode,_f91[idx],_f91);
this.expandoNodeText.innerHTML=_f92[idx];
},expand:function(){
if(this._expandDeferred){
return _f82(this._expandDeferred);
}
if(this._collapseDeferred){
this._collapseDeferred.cancel();
delete this._collapseDeferred;
}
this.isExpanded=true;
this.labelNode.setAttribute("aria-expanded","true");
if(this.tree.showRoot||this!==this.tree.rootNode){
this.containerNode.setAttribute("role","group");
}
_f6b.add(this.contentNode,"dijitTreeContentExpanded");
this._setExpando();
this._updateItemClasses(this.item);
if(this==this.tree.rootNode&&this.tree.showRoot){
this.tree.domNode.setAttribute("aria-expanded","true");
}
var _f93=_f6f.wipeIn({node:this.containerNode,duration:_f76.defaultDuration});
var def=(this._expandDeferred=new _f6a(function(){
_f93.stop();
}));
_f66.after(_f93,"onEnd",function(){
def.resolve(true);
},true);
_f93.play();
return _f82(def);
},collapse:function(){
if(this._collapseDeferred){
return _f82(this._collapseDeferred);
}
if(this._expandDeferred){
this._expandDeferred.cancel();
delete this._expandDeferred;
}
this.isExpanded=false;
this.labelNode.setAttribute("aria-expanded","false");
if(this==this.tree.rootNode&&this.tree.showRoot){
this.tree.domNode.setAttribute("aria-expanded","false");
}
_f6b.remove(this.contentNode,"dijitTreeContentExpanded");
this._setExpando();
this._updateItemClasses(this.item);
var _f94=_f6f.wipeOut({node:this.containerNode,duration:_f76.defaultDuration});
var def=(this._collapseDeferred=new _f6a(function(){
_f94.stop();
}));
_f66.after(_f94,"onEnd",function(){
def.resolve(true);
},true);
_f94.play();
return _f82(def);
},indent:0,setChildItems:function(_f95){
var tree=this.tree,_f96=tree.model,defs=[];
var _f97=this.getChildren();
_f65.forEach(_f97,function(_f98){
_f79.prototype.removeChild.call(this,_f98);
},this);
this.defer(function(){
_f65.forEach(_f97,function(node){
if(!node._destroyed&&!node.getParent()){
tree.dndController.removeTreeNode(node);
function _f99(node){
var id=_f96.getIdentity(node.item),ary=tree._itemNodesMap[id];
if(ary.length==1){
delete tree._itemNodesMap[id];
}else{
var _f9a=_f65.indexOf(ary,node);
if(_f9a!=-1){
ary.splice(_f9a,1);
}
}
_f65.forEach(node.getChildren(),_f99);
};
_f99(node);
if(tree.persist){
var _f9b=_f65.map(node.getTreePath(),function(item){
return tree.model.getIdentity(item);
}).join("/");
for(var path in tree._openedNodes){
if(path.substr(0,_f9b.length)==_f9b){
delete tree._openedNodes[path];
}
}
tree._saveExpandedNodes();
}
node.destroyRecursive();
}
});
});
this.state="Loaded";
if(_f95&&_f95.length>0){
this.isExpandable=true;
_f65.forEach(_f95,function(item){
var id=_f96.getIdentity(item),_f9c=tree._itemNodesMap[id],node;
if(_f9c){
for(var i=0;i<_f9c.length;i++){
if(_f9c[i]&&!_f9c[i].getParent()){
node=_f9c[i];
node.set("indent",this.indent+1);
break;
}
}
}
if(!node){
node=this.tree._createTreeNode({item:item,tree:tree,isExpandable:_f96.mayHaveChildren(item),label:tree.getLabel(item),labelType:(tree.model&&tree.model.labelType)||"text",tooltip:tree.getTooltip(item),ownerDocument:tree.ownerDocument,dir:tree.dir,lang:tree.lang,textDir:tree.textDir,indent:this.indent+1});
if(_f9c){
_f9c.push(node);
}else{
tree._itemNodesMap[id]=[node];
}
}
this.addChild(node);
if(this.tree.autoExpand||this.tree._state(node)){
defs.push(tree._expandNode(node));
}
},this);
_f65.forEach(this.getChildren(),function(_f9d){
_f9d._updateLayout();
});
}else{
this.isExpandable=false;
}
if(this._setExpando){
this._setExpando(false);
}
this._updateItemClasses(this.item);
var def=all(defs);
this.tree._startPaint(def);
return _f82(def);
},getTreePath:function(){
var node=this;
var path=[];
while(node&&node!==this.tree.rootNode){
path.unshift(node.item);
node=node.getParent();
}
path.unshift(this.tree.rootNode.item);
return path;
},getIdentity:function(){
return this.tree.model.getIdentity(this.item);
},removeChild:function(node){
this.inherited(arguments);
var _f9e=this.getChildren();
if(_f9e.length==0){
this.isExpandable=false;
this.collapse();
}
_f65.forEach(_f9e,function(_f9f){
_f9f._updateLayout();
});
},makeExpandable:function(){
this.isExpandable=true;
this._setExpando(false);
},setSelected:function(_fa0){
this.labelNode.setAttribute("aria-selected",_fa0?"true":"false");
_f6b.toggle(this.rowNode,"dijitTreeRowSelected",_fa0);
},focus:function(){
_f74.focus(this.focusNode);
}});
if(has("dojo-bidi")){
_f85.extend({_setTextDirAttr:function(_fa1){
if(_fa1&&((this.textDir!=_fa1)||!this._created)){
this._set("textDir",_fa1);
this.applyTextDir(this.labelNode);
_f65.forEach(this.getChildren(),function(_fa2){
_fa2.set("textDir",_fa1);
},this);
}
}});
}
var Tree=_f69("dijit.Tree",[_f77,_f7c,_f78,_f7b],{baseClass:"dijitTree",store:null,model:null,query:null,label:"",showRoot:true,childrenAttr:["children"],paths:[],path:[],selectedItems:null,selectedItem:null,openOnClick:false,openOnDblClick:false,templateString:_f7e,persist:false,autoExpand:false,dndController:_f81,dndParams:["onDndDrop","itemCreator","onDndCancel","checkAcceptance","checkItemAcceptance","dragThreshold","betweenThreshold"],onDndDrop:null,itemCreator:null,onDndCancel:null,checkAcceptance:null,checkItemAcceptance:null,dragThreshold:5,betweenThreshold:0,_nodePixelIndent:19,_publish:function(_fa3,_fa4){
_f71.publish(this.id,lang.mixin({tree:this,event:_fa3},_fa4||{}));
},postMixInProperties:function(){
this.tree=this;
if(this.autoExpand){
this.persist=false;
}
this._itemNodesMap={};
if(!this.cookieName&&this.id){
this.cookieName=this.id+"SaveStateCookie";
}
this.expandChildrenDeferred=new _f6a();
this.pendingCommandsPromise=this.expandChildrenDeferred.promise;
this.inherited(arguments);
},postCreate:function(){
this._initState();
var self=this;
this.own(on(this.containerNode,on.selector(".dijitTreeNode",_f72.enter),function(evt){
self._onNodeMouseEnter(_f75.byNode(this),evt);
}),on(this.containerNode,on.selector(".dijitTreeNode",_f72.leave),function(evt){
self._onNodeMouseLeave(_f75.byNode(this),evt);
}),on(this.containerNode,on.selector(".dijitTreeRow",_f73.press),function(evt){
self._onNodePress(_f75.getEnclosingWidget(this),evt);
}),on(this.containerNode,on.selector(".dijitTreeRow",_f73),function(evt){
self._onClick(_f75.getEnclosingWidget(this),evt);
}),on(this.containerNode,on.selector(".dijitTreeRow","dblclick"),function(evt){
self._onDblClick(_f75.getEnclosingWidget(this),evt);
}));
if(!this.model){
this._store2model();
}
this.own(_f66.after(this.model,"onChange",lang.hitch(this,"_onItemChange"),true),_f66.after(this.model,"onChildrenChange",lang.hitch(this,"_onItemChildrenChange"),true),_f66.after(this.model,"onDelete",lang.hitch(this,"_onItemDelete"),true));
this.inherited(arguments);
if(this.dndController){
if(lang.isString(this.dndController)){
this.dndController=lang.getObject(this.dndController);
}
var _fa5={};
for(var i=0;i<this.dndParams.length;i++){
if(this[this.dndParams[i]]){
_fa5[this.dndParams[i]]=this[this.dndParams[i]];
}
}
this.dndController=new this.dndController(this,_fa5);
}
this._load();
this.onLoadDeferred=_f82(this.pendingCommandsPromise);
this.onLoadDeferred.then(lang.hitch(this,"onLoad"));
},_store2model:function(){
this._v10Compat=true;
_f70.deprecated("Tree: from version 2.0, should specify a model object rather than a store/query");
var _fa6={id:this.id+"_ForestStoreModel",store:this.store,query:this.query,childrenAttrs:this.childrenAttr};
if(this.params.mayHaveChildren){
_fa6.mayHaveChildren=lang.hitch(this,"mayHaveChildren");
}
if(this.params.getItemChildren){
_fa6.getChildren=lang.hitch(this,function(item,_fa7,_fa8){
this.getItemChildren((this._v10Compat&&item===this.model.root)?null:item,_fa7,_fa8);
});
}
this.model=new _f80(_fa6);
this.showRoot=Boolean(this.label);
},onLoad:function(){
},_load:function(){
this.model.getRoot(lang.hitch(this,function(item){
var rn=(this.rootNode=this.tree._createTreeNode({item:item,tree:this,isExpandable:true,label:this.label||this.getLabel(item),labelType:this.model.labelType||"text",textDir:this.textDir,indent:this.showRoot?0:-1}));
if(!this.showRoot){
rn.rowNode.style.display="none";
this.domNode.setAttribute("role","presentation");
this.domNode.removeAttribute("aria-expanded");
this.domNode.removeAttribute("aria-multiselectable");
if(this["aria-label"]){
rn.containerNode.setAttribute("aria-label",this["aria-label"]);
this.domNode.removeAttribute("aria-label");
}else{
if(this["aria-labelledby"]){
rn.containerNode.setAttribute("aria-labelledby",this["aria-labelledby"]);
this.domNode.removeAttribute("aria-labelledby");
}
}
rn.labelNode.setAttribute("role","presentation");
rn.containerNode.setAttribute("role","tree");
rn.containerNode.setAttribute("aria-expanded","true");
rn.containerNode.setAttribute("aria-multiselectable",!this.dndController.singular);
}else{
this.domNode.setAttribute("aria-multiselectable",!this.dndController.singular);
this.rootLoadingIndicator.style.display="none";
}
this.containerNode.appendChild(rn.domNode);
var _fa9=this.model.getIdentity(item);
if(this._itemNodesMap[_fa9]){
this._itemNodesMap[_fa9].push(rn);
}else{
this._itemNodesMap[_fa9]=[rn];
}
rn._updateLayout();
this._expandNode(rn).then(lang.hitch(this,function(){
this.rootLoadingIndicator.style.display="none";
this.expandChildrenDeferred.resolve(true);
}));
}),lang.hitch(this,function(err){
console.error(this,": error loading root: ",err);
}));
},getNodesByItem:function(item){
if(!item){
return [];
}
var _faa=lang.isString(item)?item:this.model.getIdentity(item);
return [].concat(this._itemNodesMap[_faa]);
},_setSelectedItemAttr:function(item){
this.set("selectedItems",[item]);
},_setSelectedItemsAttr:function(_fab){
var tree=this;
return this.pendingCommandsPromise=this.pendingCommandsPromise.always(lang.hitch(this,function(){
var _fac=_f65.map(_fab,function(item){
return (!item||lang.isString(item))?item:tree.model.getIdentity(item);
});
var _fad=[];
_f65.forEach(_fac,function(id){
_fad=_fad.concat(tree._itemNodesMap[id]||[]);
});
this.set("selectedNodes",_fad);
}));
},_setPathAttr:function(path){
if(path.length){
return _f82(this.set("paths",[path]).then(function(_fae){
return _fae[0];
}));
}else{
return _f82(this.set("paths",[]).then(function(_faf){
return _faf[0];
}));
}
},_setPathsAttr:function(_fb0){
var tree=this;
function _fb1(path,_fb2){
var _fb3=path.shift();
var _fb4=_f65.filter(_fb2,function(node){
return node.getIdentity()==_fb3;
})[0];
if(!!_fb4){
if(path.length){
return tree._expandNode(_fb4).then(function(){
return _fb1(path,_fb4.getChildren());
});
}else{
return _fb4;
}
}else{
throw new Tree.PathError("Could not expand path at "+_fb3);
}
};
return _f82(this.pendingCommandsPromise=this.pendingCommandsPromise.always(function(){
return all(_f65.map(_fb0,function(path){
path=_f65.map(path,function(item){
return lang.isString(item)?item:tree.model.getIdentity(item);
});
if(path.length){
return _fb1(path,[tree.rootNode]);
}else{
throw new Tree.PathError("Empty path");
}
}));
}).then(function setNodes(_fb5){
tree.set("selectedNodes",_fb5);
return tree.paths;
}));
},_setSelectedNodeAttr:function(node){
this.set("selectedNodes",[node]);
},_setSelectedNodesAttr:function(_fb6){
this.dndController.setSelection(_fb6);
},expandAll:function(){
var _fb7=this;
function _fb8(node){
return _fb7._expandNode(node).then(function(){
var _fb9=_f65.filter(node.getChildren()||[],function(node){
return node.isExpandable;
});
return all(_f65.map(_fb9,_fb8));
});
};
return _f82(_fb8(this.rootNode));
},collapseAll:function(){
var _fba=this;
function _fbb(node){
var _fbc=_f65.filter(node.getChildren()||[],function(node){
return node.isExpandable;
}),defs=all(_f65.map(_fbc,_fbb));
if(!node.isExpanded||(node==_fba.rootNode&&!_fba.showRoot)){
return defs;
}else{
return defs.then(function(){
return _fba._collapseNode(node);
});
}
};
return _f82(_fbb(this.rootNode));
},mayHaveChildren:function(){
},getItemChildren:function(){
},getLabel:function(item){
return this.model.getLabel(item);
},getIconClass:function(item,_fbd){
return (!item||this.model.mayHaveChildren(item))?(_fbd?"dijitFolderOpened":"dijitFolderClosed"):"dijitLeaf";
},getLabelClass:function(){
},getRowClass:function(){
},getIconStyle:function(){
},getLabelStyle:function(){
},getRowStyle:function(){
},getTooltip:function(){
return "";
},_onDownArrow:function(evt,node){
var _fbe=this._getNext(node);
if(_fbe&&_fbe.isTreeNode){
this.focusNode(_fbe);
}
},_onUpArrow:function(evt,node){
var _fbf=node.getPreviousSibling();
if(_fbf){
node=_fbf;
while(node.isExpandable&&node.isExpanded&&node.hasChildren()){
var _fc0=node.getChildren();
node=_fc0[_fc0.length-1];
}
}else{
var _fc1=node.getParent();
if(!(!this.showRoot&&_fc1===this.rootNode)){
node=_fc1;
}
}
if(node&&node.isTreeNode){
this.focusNode(node);
}
},_onRightArrow:function(evt,node){
if(node.isExpandable&&!node.isExpanded){
this._expandNode(node);
}else{
if(node.hasChildren()){
node=node.getChildren()[0];
if(node&&node.isTreeNode){
this.focusNode(node);
}
}
}
},_onLeftArrow:function(evt,node){
if(node.isExpandable&&node.isExpanded){
this._collapseNode(node);
}else{
var _fc2=node.getParent();
if(_fc2&&_fc2.isTreeNode&&!(!this.showRoot&&_fc2===this.rootNode)){
this.focusNode(_fc2);
}
}
},focusLastChild:function(){
var node=this._getLast();
if(node&&node.isTreeNode){
this.focusNode(node);
}
},_getFirst:function(){
return this.showRoot?this.rootNode:this.rootNode.getChildren()[0];
},_getLast:function(){
var node=this.rootNode;
while(node.isExpanded){
var c=node.getChildren();
if(!c.length){
break;
}
node=c[c.length-1];
}
return node;
},_getNext:function(node){
if(node.isExpandable&&node.isExpanded&&node.hasChildren()){
return node.getChildren()[0];
}else{
while(node&&node.isTreeNode){
var _fc3=node.getNextSibling();
if(_fc3){
return _fc3;
}
node=node.getParent();
}
return null;
}
},childSelector:".dijitTreeRow",isExpandoNode:function(node,_fc4){
return dom.isDescendant(node,_fc4.expandoNode)||dom.isDescendant(node,_fc4.expandoNodeText);
},_onNodePress:function(_fc5,e){
_fc5.focus();
},__click:function(_fc6,e,_fc7,func){
var _fc8=e.target,_fc9=this.isExpandoNode(_fc8,_fc6);
if(_fc6.isExpandable&&(_fc7||_fc9)){
this._onExpandoClick({node:_fc6});
}else{
this._publish("execute",{item:_fc6.item,node:_fc6,evt:e});
this[func](_fc6.item,_fc6,e);
this.focusNode(_fc6);
}
e.stopPropagation();
e.preventDefault();
},_onClick:function(_fca,e){
this.__click(_fca,e,this.openOnClick,"onClick");
},_onDblClick:function(_fcb,e){
this.__click(_fcb,e,this.openOnDblClick,"onDblClick");
},_onExpandoClick:function(_fcc){
var node=_fcc.node;
this.focusNode(node);
if(node.isExpanded){
this._collapseNode(node);
}else{
this._expandNode(node);
}
},onClick:function(){
},onDblClick:function(){
},onOpen:function(){
},onClose:function(){
},_getNextNode:function(node){
_f70.deprecated(this.declaredClass+"::_getNextNode(node) is deprecated. Use _getNext(node) instead.","","2.0");
return this._getNext(node);
},_getRootOrFirstNode:function(){
_f70.deprecated(this.declaredClass+"::_getRootOrFirstNode() is deprecated. Use _getFirst() instead.","","2.0");
return this._getFirst();
},_collapseNode:function(node){
if(node._expandNodeDeferred){
delete node._expandNodeDeferred;
}
if(node.state=="Loading"){
return;
}
if(node.isExpanded){
var ret=node.collapse();
this.onClose(node.item,node);
this._state(node,false);
this._startPaint(ret);
return ret;
}
},_expandNode:function(node){
if(node._expandNodeDeferred){
return node._expandNodeDeferred;
}
var _fcd=this.model,item=node.item,_fce=this;
if(!node._loadDeferred){
node.markProcessing();
node._loadDeferred=new _f6a();
_fcd.getChildren(item,function(_fcf){
node.unmarkProcessing();
node.setChildItems(_fcf).then(function(){
node._loadDeferred.resolve(_fcf);
});
},function(err){
console.error(_fce,": error loading "+node.label+" children: ",err);
node._loadDeferred.reject(err);
});
}
var def=node._loadDeferred.then(lang.hitch(this,function(){
var def2=node.expand();
this.onOpen(node.item,node);
this._state(node,true);
return def2;
}));
this._startPaint(def);
return def;
},focusNode:function(node){
this.focusChild(node);
},_onNodeMouseEnter:function(){
},_onNodeMouseLeave:function(){
},_onItemChange:function(item){
var _fd0=this.model,_fd1=_fd0.getIdentity(item),_fd2=this._itemNodesMap[_fd1];
if(_fd2){
var _fd3=this.getLabel(item),_fd4=this.getTooltip(item);
_f65.forEach(_fd2,function(node){
node.set({item:item,label:_fd3,tooltip:_fd4});
node._updateItemClasses(item);
});
}
},_onItemChildrenChange:function(_fd5,_fd6){
var _fd7=this.model,_fd8=_fd7.getIdentity(_fd5),_fd9=this._itemNodesMap[_fd8];
if(_fd9){
_f65.forEach(_fd9,function(_fda){
_fda.setChildItems(_fd6);
});
}
},_onItemDelete:function(item){
var _fdb=this.model,_fdc=_fdb.getIdentity(item),_fdd=this._itemNodesMap[_fdc];
if(_fdd){
_f65.forEach(_fdd,function(node){
this.dndController.removeTreeNode(node);
var _fde=node.getParent();
if(_fde){
_fde.removeChild(node);
}
node.destroyRecursive();
},this);
delete this._itemNodesMap[_fdc];
}
},_initState:function(){
this._openedNodes={};
if(this.persist&&this.cookieName){
var oreo=_f68(this.cookieName);
if(oreo){
_f65.forEach(oreo.split(","),function(item){
this._openedNodes[item]=true;
},this);
}
}
},_state:function(node,_fdf){
if(!this.persist){
return false;
}
var path=_f65.map(node.getTreePath(),function(item){
return this.model.getIdentity(item);
},this).join("/");
if(arguments.length===1){
return this._openedNodes[path];
}else{
if(_fdf){
this._openedNodes[path]=true;
}else{
delete this._openedNodes[path];
}
this._saveExpandedNodes();
}
},_saveExpandedNodes:function(){
if(this.persist&&this.cookieName){
var ary=[];
for(var id in this._openedNodes){
ary.push(id);
}
_f68(this.cookieName,ary.join(","),{expires:365});
}
},destroy:function(){
if(this._curSearch){
this._curSearch.timer.remove();
delete this._curSearch;
}
if(this.rootNode){
this.rootNode.destroyRecursive();
}
if(this.dndController&&!lang.isString(this.dndController)){
this.dndController.destroy();
}
this.rootNode=null;
this.inherited(arguments);
},destroyRecursive:function(){
this.destroy();
},resize:function(_fe0){
if(_fe0){
_f6c.setMarginBox(this.domNode,_fe0);
}
this._nodePixelIndent=_f6c.position(this.tree.indentDetector).w||this._nodePixelIndent;
this.expandChildrenDeferred.then(lang.hitch(this,function(){
this.rootNode.set("indent",this.showRoot?0:-1);
this._adjustWidths();
}));
},_outstandingPaintOperations:0,_startPaint:function(p){
this._outstandingPaintOperations++;
if(this._adjustWidthsTimer){
this._adjustWidthsTimer.remove();
delete this._adjustWidthsTimer;
}
var oc=lang.hitch(this,function(){
this._outstandingPaintOperations--;
if(this._outstandingPaintOperations<=0&&!this._adjustWidthsTimer&&this._started){
this._adjustWidthsTimer=this.defer("_adjustWidths");
}
});
when(p,oc,oc);
},_adjustWidths:function(){
if(this._adjustWidthsTimer){
this._adjustWidthsTimer.remove();
delete this._adjustWidthsTimer;
}
this.containerNode.style.width="auto";
this.containerNode.style.width=this.domNode.scrollWidth>this.domNode.offsetWidth?"auto":"100%";
},_createTreeNode:function(args){
return new _f85(args);
},focus:function(){
if(this.lastFocusedChild){
this.focusNode(this.lastFocusedChild);
}else{
this.focusFirstChild();
}
}});
if(has("dojo-bidi")){
Tree.extend({_setTextDirAttr:function(_fe1){
if(_fe1&&this.textDir!=_fe1){
this._set("textDir",_fe1);
this.rootNode.set("textDir",_fe1);
}
}});
}
Tree.PathError=_f6e("TreePathError");
Tree._TreeNode=_f85;
return Tree;
});
},"dijit/form/_FormValueWidget":function(){
define(["dojo/_base/declare","dojo/sniff","./_FormWidget","./_FormValueMixin"],function(_fe2,has,_fe3,_fe4){
return _fe2("dijit.form._FormValueWidget",[_fe3,_fe4],{_layoutHackIE7:function(){
if(has("ie")==7){
var _fe5=this.domNode;
var _fe6=_fe5.parentNode;
var _fe7=_fe5.firstChild||_fe5;
var _fe8=_fe7.style.filter;
var _fe9=this;
while(_fe6&&_fe6.clientHeight==0){
(function ping(){
var _fea=_fe9.connect(_fe6,"onscroll",function(){
_fe9.disconnect(_fea);
_fe7.style.filter=(new Date()).getMilliseconds();
_fe9.defer(function(){
_fe7.style.filter=_fe8;
});
});
})();
_fe6=_fe6.parentNode;
}
}
}});
});
},"dgrid/Keyboard":function(){
define(["dojo/_base/declare","dojo/aspect","dojo/on","dojo/_base/lang","dojo/has","put-selector/put","dojo/_base/Deferred","dojo/_base/sniff"],function(_feb,_fec,on,lang,has,put,_fed){
var _fee={checkbox:1,radio:1,button:1},_fef=/\bdgrid-cell\b/,_ff0=/\bdgrid-row\b/;
has.add("dom-contains",function(_ff1,doc,_ff2){
return !!_ff2.contains;
});
function _ff3(_ff4,node){
if(has("dom-contains")){
return _ff4.contains(node);
}else{
return _ff4.compareDocumentPosition(node)&8;
}
};
var _ff5=_feb(null,{pageSkip:10,tabIndex:0,keyMap:null,headerKeyMap:null,postMixInProperties:function(){
this.inherited(arguments);
if(!this.keyMap){
this.keyMap=lang.mixin({},_ff5.defaultKeyMap);
}
if(!this.headerKeyMap){
this.headerKeyMap=lang.mixin({},_ff5.defaultHeaderKeyMap);
}
},postCreate:function(){
this.inherited(arguments);
var grid=this;
function _ff6(_ff7){
var _ff8=_ff7.target;
return _ff8.type&&(!_fee[_ff8.type]||_ff7.keyCode==32);
};
function _ff9(_ffa){
var _ffb=grid.cellNavigation,_ffc=_ffb?_fef:_ff0,_ffd=_ffa===grid.headerNode,_ffe=_ffa;
function _fff(){
grid._focusedHeaderNode=_ffe=_ffb?grid.headerNode.getElementsByTagName("th")[0]:grid.headerNode;
if(_ffe){
_ffe.tabIndex=grid.tabIndex;
}
};
if(_ffd){
_fff();
_fec.after(grid,"renderHeader",_fff,true);
}else{
_fec.after(grid,"renderArray",function(ret){
return _fed.when(ret,function(ret){
var _1000=grid._focusedNode||_ffe;
if(_ffc.test(_1000.className)&&_ff3(_ffa,_1000)){
return ret;
}
for(var i=0,_1001=_ffa.getElementsByTagName("*"),_1002;(_1002=_1001[i]);++i){
if(_ffc.test(_1002.className)){
_1000=grid._focusedNode=_1002;
break;
}
}
_1000.tabIndex=grid.tabIndex;
return ret;
});
});
}
grid._listeners.push(on(_ffa,"mousedown",function(event){
if(!_ff6(event)){
grid._focusOnNode(event.target,_ffd,event);
}
}));
grid._listeners.push(on(_ffa,"keydown",function(event){
if(event.metaKey||event.altKey){
return;
}
var _1003=grid[_ffd?"headerKeyMap":"keyMap"][event.keyCode];
if(_1003&&!_ff6(event)){
_1003.call(grid,event);
}
}));
};
if(this.tabableHeader){
_ff9(this.headerNode);
on(this.headerNode,"dgrid-cellfocusin",function(){
grid.scrollTo({x:this.scrollLeft});
});
}
_ff9(this.contentNode);
},addKeyHandler:function(key,_1004,_1005){
return _fec.after(this[_1005?"headerKeyMap":"keyMap"],key,_1004,true);
},_focusOnNode:function(_1006,_1007,event){
var _1008="_focused"+(_1007?"Header":"")+"Node",_1009=this[_1008],_100a=this.cellNavigation?"cell":"row",cell=this[_100a](_1006),_100b,input,_100c,_100d,i;
_1006=cell&&cell.element;
if(!_1006){
return;
}
if(this.cellNavigation){
_100b=_1006.getElementsByTagName("input");
for(i=0,_100c=_100b.length;i<_100c;i++){
input=_100b[i];
if((input.tabIndex!=-1||"lastValue" in input)&&!input.disabled){
if(has("ie")<8){
input.style.position="relative";
}
input.focus();
if(has("ie")<8){
input.style.position="";
}
_100d=true;
break;
}
}
}
event=lang.mixin({grid:this},event);
if(event.type){
event.parentType=event.type;
}
if(!event.bubbles){
event.bubbles=true;
}
if(_1009){
put(_1009,"!dgrid-focus[!tabIndex]");
if(has("ie")<8){
_1009.style.position="";
}
event[_100a]=this[_100a](_1009);
on.emit(_1006,"dgrid-cellfocusout",event);
}
_1009=this[_1008]=_1006;
event[_100a]=cell;
if(!_100d){
if(has("ie")<8){
_1006.style.position="relative";
}
_1006.tabIndex=this.tabIndex;
_1006.focus();
}
put(_1006,".dgrid-focus");
on.emit(_1009,"dgrid-cellfocusin",event);
},focusHeader:function(_100e){
this._focusOnNode(_100e||this._focusedHeaderNode,true);
},focus:function(_100f){
this._focusOnNode(_100f||this._focusedNode,false);
}});
var _1010=_ff5.moveFocusVertical=function(event,steps){
var _1011=this.cellNavigation,_1012=this[_1011?"cell":"row"](event),_1013=_1011&&_1012.column.id,next=this.down(this._focusedNode,steps,true);
if(_1011){
next=this.cell(next,_1013);
}
this._focusOnNode(next,false,event);
event.preventDefault();
};
var _1014=_ff5.moveFocusUp=function(event){
_1010.call(this,event,-1);
};
var _1015=_ff5.moveFocusDown=function(event){
_1010.call(this,event,1);
};
var _1016=_ff5.moveFocusPageUp=function(event){
_1010.call(this,event,-this.pageSkip);
};
var _1017=_ff5.moveFocusPageDown=function(event){
_1010.call(this,event,this.pageSkip);
};
var _1018=_ff5.moveFocusHorizontal=function(event,steps){
if(!this.cellNavigation){
return;
}
var _1019=!this.row(event),_101a=this["_focused"+(_1019?"Header":"")+"Node"];
this._focusOnNode(this.right(_101a,steps),_1019,event);
event.preventDefault();
};
var _101b=_ff5.moveFocusLeft=function(event){
_1018.call(this,event,-1);
};
var _101c=_ff5.moveFocusRight=function(event){
_1018.call(this,event,1);
};
var _101d=_ff5.moveHeaderFocusEnd=function(event,_101e){
var nodes;
if(this.cellNavigation){
nodes=this.headerNode.getElementsByTagName("th");
this._focusOnNode(nodes[_101e?0:nodes.length-1],true,event);
}
event.preventDefault();
};
var _101f=_ff5.moveHeaderFocusHome=function(event){
_101d.call(this,event,true);
};
var _1020=_ff5.moveFocusEnd=function(event,_1021){
var self=this,_1022=this.cellNavigation,_1023=this.contentNode,_1024=_1021?0:_1023.scrollHeight,_1025=_1023.scrollTop+_1024,_1026=_1023[_1021?"firstChild":"lastChild"],_1027=_1026.className.indexOf("dgrid-preload")>-1,_1028=_1027?_1026[(_1021?"next":"previous")+"Sibling"]:_1026,_1029=_1028.offsetTop+(_1021?0:_1028.offsetHeight),_102a;
if(_1027){
while(_1028&&_1028.className.indexOf("dgrid-row")<0){
_1028=_1028[(_1021?"next":"previous")+"Sibling"];
}
if(!_1028){
return;
}
}
if(!_1027||_1026.offsetHeight<1){
if(_1022){
_1028=this.cell(_1028,this.cell(event).column.id);
}
this._focusOnNode(_1028,false,event);
}else{
if(!has("dom-addeventlistener")){
event=lang.mixin({},event);
}
_102a=_fec.after(this,"renderArray",function(rows){
_102a.remove();
return _fed.when(rows,function(rows){
var _102b=rows[_1021?0:rows.length-1];
if(_1022){
_102b=self.cell(_102b,self.cell(event).column.id);
}
self._focusOnNode(_102b,false,event);
});
});
}
if(_1025===_1029){
event.preventDefault();
}
};
var _102c=_ff5.moveFocusHome=function(event){
_1020.call(this,event,true);
};
function _102d(event){
event.preventDefault();
};
_ff5.defaultKeyMap={32:_102d,33:_1016,34:_1017,35:_1020,36:_102c,37:_101b,38:_1014,39:_101c,40:_1015};
_ff5.defaultHeaderKeyMap={32:_102d,35:_101d,36:_101f,37:_101b,39:_101c};
return _ff5;
});
},"url:dijit/templates/Menu.html":"<table class=\"dijit dijitMenu dijitMenuPassive dijitReset dijitMenuTable\" role=\"menu\" tabIndex=\"${tabIndex}\"\n\t   cellspacing=\"0\">\n\t<tbody class=\"dijitReset\" data-dojo-attach-point=\"containerNode\"></tbody>\n</table>\n","url:dijit/templates/TreeNode.html":"<div class=\"dijitTreeNode\" role=\"presentation\"\n\t><div data-dojo-attach-point=\"rowNode\" class=\"dijitTreeRow\" role=\"presentation\"\n\t\t><span data-dojo-attach-point=\"expandoNode\" class=\"dijitInline dijitTreeExpando\" role=\"presentation\"></span\n\t\t><span data-dojo-attach-point=\"expandoNodeText\" class=\"dijitExpandoText\" role=\"presentation\"></span\n\t\t><span data-dojo-attach-point=\"contentNode\"\n\t\t\tclass=\"dijitTreeContent\" role=\"presentation\">\n\t\t\t<span role=\"presentation\" class=\"dijitInline dijitIcon dijitTreeIcon\" data-dojo-attach-point=\"iconNode\"></span\n\t\t\t><span data-dojo-attach-point=\"labelNode,focusNode\" class=\"dijitTreeLabel\" role=\"treeitem\" tabindex=\"-1\" aria-selected=\"false\"></span>\n\t\t</span\n\t></div>\n\t<div data-dojo-attach-point=\"containerNode\" class=\"dijitTreeNodeContainer\" role=\"presentation\" style=\"display: none;\"></div>\n</div>\n","url:dijit/form/templates/Spinner.html":"<div class=\"dijit dijitReset dijitInline dijitLeft\"\n\tid=\"widget_${id}\" role=\"presentation\"\n\t><div class=\"dijitReset dijitButtonNode dijitSpinnerButtonContainer\"\n\t\t><input class=\"dijitReset dijitInputField dijitSpinnerButtonInner\" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t\t/><div class=\"dijitReset dijitLeft dijitButtonNode dijitArrowButton dijitUpArrowButton\"\n\t\t\tdata-dojo-attach-point=\"upArrowNode\"\n\t\t\t><div class=\"dijitArrowButtonInner\"\n\t\t\t\t><input class=\"dijitReset dijitInputField\" value=\"&#9650; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t\t\t\t\t${_buttonInputDisabled}\n\t\t\t/></div\n\t\t></div\n\t\t><div class=\"dijitReset dijitLeft dijitButtonNode dijitArrowButton dijitDownArrowButton\"\n\t\t\tdata-dojo-attach-point=\"downArrowNode\"\n\t\t\t><div class=\"dijitArrowButtonInner\"\n\t\t\t\t><input class=\"dijitReset dijitInputField\" value=\"&#9660; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t\t\t\t\t${_buttonInputDisabled}\n\t\t\t/></div\n\t\t></div\n\t></div\n\t><div class='dijitReset dijitValidationContainer'\n\t\t><input class=\"dijitReset dijitInputField dijitValidationIcon dijitValidationInner\" value=\"&#935; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t/></div\n\t><div class=\"dijitReset dijitInputField dijitInputContainer\"\n\t\t><input class='dijitReset dijitInputInner' data-dojo-attach-point=\"textbox,focusNode\" type=\"${type}\" data-dojo-attach-event=\"onkeydown:_onKeyDown\"\n\t\t\trole=\"spinbutton\" autocomplete=\"off\" ${!nameAttrSetting}\n\t/></div\n></div>\n","url:dijit/templates/MenuBar.html":"<div class=\"dijitMenuBar dijitMenuPassive\" data-dojo-attach-point=\"containerNode\" role=\"menubar\" tabIndex=\"${tabIndex}\"\n\t ></div>\n","url:dijit/layout/templates/AccordionButton.html":"<div data-dojo-attach-event='ondijitclick:_onTitleClick' class='dijitAccordionTitle' role=\"presentation\">\n\t<div data-dojo-attach-point='titleNode,focusNode' data-dojo-attach-event='onkeydown:_onTitleKeyDown'\n\t\t\tclass='dijitAccordionTitleFocus' role=\"tab\" aria-expanded=\"false\"\n\t\t><span class='dijitInline dijitAccordionArrow' role=\"presentation\"></span\n\t\t><span class='arrowTextUp' role=\"presentation\">+</span\n\t\t><span class='arrowTextDown' role=\"presentation\">-</span\n\t\t><span role=\"presentation\" class=\"dijitInline dijitIcon\" data-dojo-attach-point=\"iconNode\"></span>\n\t\t<span role=\"presentation\" data-dojo-attach-point='titleTextNode, textDirNode' class='dijitAccordionText'></span>\n\t</div>\n</div>\n","url:dijit/templates/MenuSeparator.html":"<tr class=\"dijitMenuSeparator\" role=\"separator\">\n\t<td class=\"dijitMenuSeparatorIconCell\">\n\t\t<div class=\"dijitMenuSeparatorTop\"></div>\n\t\t<div class=\"dijitMenuSeparatorBottom\"></div>\n\t</td>\n\t<td colspan=\"3\" class=\"dijitMenuSeparatorLabelCell\">\n\t\t<div class=\"dijitMenuSeparatorTop dijitMenuSeparatorLabel\"></div>\n\t\t<div class=\"dijitMenuSeparatorBottom\"></div>\n\t</td>\n</tr>\n","url:dijit/form/templates/DropDownButton.html":"<span class=\"dijit dijitReset dijitInline\"\n\t><span class='dijitReset dijitInline dijitButtonNode'\n\t\tdata-dojo-attach-event=\"ondijitclick:__onClick\" data-dojo-attach-point=\"_buttonNode\"\n\t\t><span class=\"dijitReset dijitStretch dijitButtonContents\"\n\t\t\tdata-dojo-attach-point=\"focusNode,titleNode,_arrowWrapperNode,_popupStateNode\"\n\t\t\trole=\"button\" aria-haspopup=\"true\" aria-labelledby=\"${id}_label\"\n\t\t\t><span class=\"dijitReset dijitInline dijitIcon\"\n\t\t\t\tdata-dojo-attach-point=\"iconNode\"\n\t\t\t></span\n\t\t\t><span class=\"dijitReset dijitInline dijitButtonText\"\n\t\t\t\tdata-dojo-attach-point=\"containerNode\"\n\t\t\t\tid=\"${id}_label\"\n\t\t\t></span\n\t\t\t><span class=\"dijitReset dijitInline dijitArrowButtonInner\"></span\n\t\t\t><span class=\"dijitReset dijitInline dijitArrowButtonChar\">&#9660;</span\n\t\t></span\n\t></span\n\t><input ${!nameAttrSetting} type=\"${type}\" value=\"${value}\" class=\"dijitOffScreen\" tabIndex=\"-1\"\n\t\tdata-dojo-attach-event=\"onclick:_onClick\"\n\t\tdata-dojo-attach-point=\"valueNode\" role=\"presentation\"\n/></span>\n","url:dijit/form/templates/DropDownBox.html":"<div class=\"dijit dijitReset dijitInline dijitLeft\"\n\tid=\"widget_${id}\"\n\trole=\"combobox\"\n\taria-haspopup=\"true\"\n\tdata-dojo-attach-point=\"_popupStateNode\"\n\t><div class='dijitReset dijitRight dijitButtonNode dijitArrowButton dijitDownArrowButton dijitArrowButtonContainer'\n\t\tdata-dojo-attach-point=\"_buttonNode\" role=\"presentation\"\n\t\t><input class=\"dijitReset dijitInputField dijitArrowButtonInner\" value=\"&#9660; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"button presentation\" aria-hidden=\"true\"\n\t\t\t${_buttonInputDisabled}\n\t/></div\n\t><div class='dijitReset dijitValidationContainer'\n\t\t><input class=\"dijitReset dijitInputField dijitValidationIcon dijitValidationInner\" value=\"&#935; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t/></div\n\t><div class=\"dijitReset dijitInputField dijitInputContainer\"\n\t\t><input class='dijitReset dijitInputInner' ${!nameAttrSetting} type=\"text\" autocomplete=\"off\"\n\t\t\tdata-dojo-attach-point=\"textbox,focusNode\" role=\"textbox\"\n\t/></div\n></div>\n","url:dijit/templates/CheckedMenuItem.html":"<tr class=\"dijitReset dijitMenuItem\" data-dojo-attach-point=\"focusNode\" role=\"${role}\" tabIndex=\"-1\" aria-checked=\"${checked}\">\n\t<td class=\"dijitReset dijitMenuItemIconCell\" role=\"presentation\">\n\t\t<span class=\"dijitInline dijitIcon dijitMenuItemIcon dijitCheckedMenuItemIcon\" data-dojo-attach-point=\"iconNode\"></span>\n\t\t<span class=\"dijitMenuItemIconChar dijitCheckedMenuItemIconChar\">${checkedChar}</span>\n\t</td>\n\t<td class=\"dijitReset dijitMenuItemLabel\" colspan=\"2\" data-dojo-attach-point=\"containerNode,labelNode,textDirNode\"></td>\n\t<td class=\"dijitReset dijitMenuItemAccelKey\" style=\"display: none\" data-dojo-attach-point=\"accelKeyNode\"></td>\n\t<td class=\"dijitReset dijitMenuArrowCell\" role=\"presentation\">&#160;</td>\n</tr>\n","url:dijit/templates/Tooltip.html":"<div class=\"dijitTooltip dijitTooltipLeft\" id=\"dojoTooltip\"\n\t><div class=\"dijitTooltipConnector\" data-dojo-attach-point=\"connectorNode\"></div\n\t><div class=\"dijitTooltipContainer dijitTooltipContents\" data-dojo-attach-point=\"containerNode\" role='alert'></div\n></div>\n","url:dijit/form/templates/ValidationTextBox.html":"<div class=\"dijit dijitReset dijitInline dijitLeft\"\n\tid=\"widget_${id}\" role=\"presentation\"\n\t><div class='dijitReset dijitValidationContainer'\n\t\t><input class=\"dijitReset dijitInputField dijitValidationIcon dijitValidationInner\" value=\"&#935; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t/></div\n\t><div class=\"dijitReset dijitInputField dijitInputContainer\"\n\t\t><input class=\"dijitReset dijitInputInner\" data-dojo-attach-point='textbox,focusNode' autocomplete=\"off\"\n\t\t\t${!nameAttrSetting} type='${type}'\n\t/></div\n></div>\n","url:dijit/templates/ColorPalette.html":"<div class=\"dijitInline dijitColorPalette\" role=\"grid\">\n\t<table dojoAttachPoint=\"paletteTableNode\" class=\"dijitPaletteTable\" cellSpacing=\"0\" cellPadding=\"0\" role=\"presentation\">\n\t\t<tbody data-dojo-attach-point=\"gridNode\"></tbody>\n\t</table>\n</div>\n","url:dijit/layout/templates/_ScrollingTabControllerButton.html":"<div data-dojo-attach-event=\"ondijitclick:_onClick\" class=\"dijitTabInnerDiv dijitTabContent dijitButtonContents\"  data-dojo-attach-point=\"focusNode\" role=\"button\">\n\t<span role=\"presentation\" class=\"dijitInline dijitTabStripIcon\" data-dojo-attach-point=\"iconNode\"></span>\n\t<span data-dojo-attach-point=\"containerNode,titleNode\" class=\"dijitButtonText\"></span>\n</div>","url:dijit/layout/templates/TabContainer.html":"<div class=\"dijitTabContainer\">\n\t<div class=\"dijitTabListWrapper\" data-dojo-attach-point=\"tablistNode\"></div>\n\t<div data-dojo-attach-point=\"tablistSpacer\" class=\"dijitTabSpacer ${baseClass}-spacer\"></div>\n\t<div class=\"dijitTabPaneWrapper ${baseClass}-container\" data-dojo-attach-point=\"containerNode\"></div>\n</div>\n","url:dijit/form/templates/ComboButton.html":"<table class=\"dijit dijitReset dijitInline dijitLeft\"\n\tcellspacing='0' cellpadding='0' role=\"presentation\"\n\t><tbody role=\"presentation\"><tr role=\"presentation\"\n\t\t><td class=\"dijitReset dijitStretch dijitButtonNode\" data-dojo-attach-point=\"buttonNode\" data-dojo-attach-event=\"ondijitclick:__onClick,onkeydown:_onButtonKeyDown\"\n\t\t><div id=\"${id}_button\" class=\"dijitReset dijitButtonContents\"\n\t\t\tdata-dojo-attach-point=\"titleNode\"\n\t\t\trole=\"button\" aria-labelledby=\"${id}_label\"\n\t\t\t><div class=\"dijitReset dijitInline dijitIcon\" data-dojo-attach-point=\"iconNode\" role=\"presentation\"></div\n\t\t\t><div class=\"dijitReset dijitInline dijitButtonText\" id=\"${id}_label\" data-dojo-attach-point=\"containerNode\" role=\"presentation\"></div\n\t\t></div\n\t\t></td\n\t\t><td id=\"${id}_arrow\" class='dijitReset dijitRight dijitButtonNode dijitArrowButton'\n\t\t\tdata-dojo-attach-point=\"_popupStateNode,focusNode,_buttonNode\"\n\t\t\tdata-dojo-attach-event=\"onkeydown:_onArrowKeyDown\"\n\t\t\ttitle=\"${optionsTitle}\"\n\t\t\trole=\"button\" aria-haspopup=\"true\"\n\t\t\t><div class=\"dijitReset dijitArrowButtonInner\" role=\"presentation\"></div\n\t\t\t><div class=\"dijitReset dijitArrowButtonChar\" role=\"presentation\">&#9660;</div\n\t\t></td\n\t\t><td style=\"display:none !important;\"\n\t\t\t><input ${!nameAttrSetting} type=\"${type}\" value=\"${value}\" data-dojo-attach-point=\"valueNode\" role=\"presentation\"\n\t\t\t\tdata-dojo-attach-event=\"onclick:_onClick\"\n\t\t/></td></tr></tbody\n></table>\n","url:dijit/templates/Tree.html":"<div role=\"tree\">\n\t<div class=\"dijitInline dijitTreeIndent\" style=\"position: absolute; top: -9999px\" data-dojo-attach-point=\"indentDetector\"></div>\n\t<div class=\"dijitTreeExpando dijitTreeExpandoLoading\" data-dojo-attach-point=\"rootLoadingIndicator\"></div>\n\t<div data-dojo-attach-point=\"containerNode\" class=\"dijitTreeContainer\" role=\"presentation\">\n\t</div>\n</div>\n","url:dijit/templates/Dialog.html":"<div class=\"dijitDialog\" role=\"dialog\" aria-labelledby=\"${id}_title\">\n\t<div data-dojo-attach-point=\"titleBar\" class=\"dijitDialogTitleBar\">\n\t\t<span data-dojo-attach-point=\"titleNode\" class=\"dijitDialogTitle\" id=\"${id}_title\"\n\t\t\t\trole=\"heading\" level=\"1\"></span>\n\t\t<span data-dojo-attach-point=\"closeButtonNode\" class=\"dijitDialogCloseIcon\" data-dojo-attach-event=\"ondijitclick: onCancel\" title=\"${buttonCancel}\" role=\"button\" tabindex=\"0\">\n\t\t\t<span data-dojo-attach-point=\"closeText\" class=\"closeText\" title=\"${buttonCancel}\">x</span>\n\t\t</span>\n\t</div>\n\t<div data-dojo-attach-point=\"containerNode\" class=\"dijitDialogPaneContent\"></div>\n</div>\n","url:dijit/form/templates/TextBox.html":"<div class=\"dijit dijitReset dijitInline dijitLeft\" id=\"widget_${id}\" role=\"presentation\"\n\t><div class=\"dijitReset dijitInputField dijitInputContainer\"\n\t\t><input class=\"dijitReset dijitInputInner\" data-dojo-attach-point='textbox,focusNode' autocomplete=\"off\"\n\t\t\t${!nameAttrSetting} type='${type}'\n\t/></div\n></div>\n","url:dijit/form/templates/Select.html":"<table class=\"dijit dijitReset dijitInline dijitLeft\"\n\tdata-dojo-attach-point=\"_buttonNode,tableNode,focusNode,_popupStateNode\" cellspacing='0' cellpadding='0'\n\trole=\"listbox\" aria-haspopup=\"true\"\n\t><tbody role=\"presentation\"><tr role=\"presentation\"\n\t\t><td class=\"dijitReset dijitStretch dijitButtonContents\" role=\"presentation\"\n\t\t\t><div class=\"dijitReset dijitInputField dijitButtonText\"  data-dojo-attach-point=\"containerNode,textDirNode\" role=\"presentation\"></div\n\t\t\t><div class=\"dijitReset dijitValidationContainer\"\n\t\t\t\t><input class=\"dijitReset dijitInputField dijitValidationIcon dijitValidationInner\" value=\"&#935; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t\t\t/></div\n\t\t\t><input type=\"hidden\" ${!nameAttrSetting} data-dojo-attach-point=\"valueNode\" value=\"${value}\" aria-hidden=\"true\"\n\t\t/></td\n\t\t><td class=\"dijitReset dijitRight dijitButtonNode dijitArrowButton dijitDownArrowButton dijitArrowButtonContainer\"\n\t\t\tdata-dojo-attach-point=\"titleNode\" role=\"presentation\"\n\t\t\t><input class=\"dijitReset dijitInputField dijitArrowButtonInner\" value=\"&#9660; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t\t\t\t${_buttonInputDisabled}\n\t\t/></td\n\t></tr></tbody\n></table>\n","url:dijit/templates/MenuItem.html":"<tr class=\"dijitReset dijitMenuItem\" data-dojo-attach-point=\"focusNode\" role=\"menuitem\" tabIndex=\"-1\">\n\t<td class=\"dijitReset dijitMenuItemIconCell\" role=\"presentation\">\n\t\t<span role=\"presentation\" class=\"dijitInline dijitIcon dijitMenuItemIcon\" data-dojo-attach-point=\"iconNode\"></span>\n\t</td>\n\t<td class=\"dijitReset dijitMenuItemLabel\" colspan=\"2\" data-dojo-attach-point=\"containerNode,textDirNode\"></td>\n\t<td class=\"dijitReset dijitMenuItemAccelKey\" style=\"display: none\" data-dojo-attach-point=\"accelKeyNode\"></td>\n\t<td class=\"dijitReset dijitMenuArrowCell\" role=\"presentation\">\n\t\t<span data-dojo-attach-point=\"arrowWrapper\" style=\"visibility: hidden\">\n\t\t\t<span class=\"dijitInline dijitIcon dijitMenuExpand\"></span>\n\t\t\t<span class=\"dijitMenuExpandA11y\">+</span>\n\t\t</span>\n\t</td>\n</tr>\n","url:dijit/templates/MenuBarItem.html":"<div class=\"dijitReset dijitInline dijitMenuItem dijitMenuItemLabel\" data-dojo-attach-point=\"focusNode\"\n\t \trole=\"menuitem\" tabIndex=\"-1\">\n\t<span data-dojo-attach-point=\"containerNode,textDirNode\"></span>\n</div>\n","url:dijit/layout/templates/_TabButton.html":"<div role=\"presentation\" data-dojo-attach-point=\"titleNode,innerDiv,tabContent\" class=\"dijitTabInner dijitTabContent\">\n\t<span role=\"presentation\" class=\"dijitInline dijitIcon dijitTabButtonIcon\" data-dojo-attach-point=\"iconNode\"></span>\n\t<span data-dojo-attach-point='containerNode,focusNode' class='tabLabel'></span>\n\t<span class=\"dijitInline dijitTabCloseButton dijitTabCloseIcon\" data-dojo-attach-point='closeNode'\n\t\t  role=\"presentation\">\n\t\t<span data-dojo-attach-point='closeText' class='dijitTabCloseText'>[x]</span\n\t\t\t\t></span>\n</div>\n","url:dijit/form/templates/CheckBox.html":"<div class=\"dijit dijitReset dijitInline\" role=\"presentation\"\n\t><input\n\t \t${!nameAttrSetting} type=\"${type}\" role=\"${type}\" aria-checked=\"false\" ${checkedAttrSetting}\n\t\tclass=\"dijitReset dijitCheckBoxInput\"\n\t\tdata-dojo-attach-point=\"focusNode\"\n\t \tdata-dojo-attach-event=\"ondijitclick:_onClick\"\n/></div>\n","url:dijit/templates/Calendar.html":"<table cellspacing=\"0\" cellpadding=\"0\" class=\"dijitCalendarContainer\" role=\"grid\" aria-labelledby=\"${id}_mddb ${id}_year\" data-dojo-attach-point=\"gridNode\">\n\t<thead>\n\t\t<tr class=\"dijitReset dijitCalendarMonthContainer\" valign=\"top\">\n\t\t\t<th class='dijitReset dijitCalendarArrow' data-dojo-attach-point=\"decrementMonth\" scope=\"col\">\n\t\t\t\t<span class=\"dijitInline dijitCalendarIncrementControl dijitCalendarDecrease\" role=\"presentation\"></span>\n\t\t\t\t<span data-dojo-attach-point=\"decreaseArrowNode\" class=\"dijitA11ySideArrow\">-</span>\n\t\t\t</th>\n\t\t\t<th class='dijitReset' colspan=\"5\" scope=\"col\">\n\t\t\t\t<div data-dojo-attach-point=\"monthNode\">\n\t\t\t\t</div>\n\t\t\t</th>\n\t\t\t<th class='dijitReset dijitCalendarArrow' scope=\"col\" data-dojo-attach-point=\"incrementMonth\">\n\t\t\t\t<span class=\"dijitInline dijitCalendarIncrementControl dijitCalendarIncrease\" role=\"presentation\"></span>\n\t\t\t\t<span data-dojo-attach-point=\"increaseArrowNode\" class=\"dijitA11ySideArrow\">+</span>\n\t\t\t</th>\n\t\t</tr>\n\t\t<tr role=\"row\">\n\t\t\t${!dayCellsHtml}\n\t\t</tr>\n\t</thead>\n\t<tbody data-dojo-attach-point=\"dateRowsNode\" data-dojo-attach-event=\"ondijitclick: _onDayClick\" class=\"dijitReset dijitCalendarBodyContainer\">\n\t\t\t${!dateRowsHtml}\n\t</tbody>\n\t<tfoot class=\"dijitReset dijitCalendarYearContainer\">\n\t\t<tr>\n\t\t\t<td class='dijitReset' valign=\"top\" colspan=\"7\" role=\"presentation\">\n\t\t\t\t<div class=\"dijitCalendarYearLabel\">\n\t\t\t\t\t<span data-dojo-attach-point=\"previousYearLabelNode\" class=\"dijitInline dijitCalendarPreviousYear\" role=\"button\"></span>\n\t\t\t\t\t<span data-dojo-attach-point=\"currentYearLabelNode\" class=\"dijitInline dijitCalendarSelectedYear\" role=\"button\" id=\"${id}_year\"></span>\n\t\t\t\t\t<span data-dojo-attach-point=\"nextYearLabelNode\" class=\"dijitInline dijitCalendarNextYear\" role=\"button\"></span>\n\t\t\t\t</div>\n\t\t\t</td>\n\t\t</tr>\n\t</tfoot>\n</table>\n","url:dijit/layout/templates/ScrollingTabController.html":"<div class=\"dijitTabListContainer-${tabPosition}\" style=\"visibility:hidden\">\n\t<div data-dojo-type=\"dijit.layout._ScrollingTabControllerMenuButton\"\n\t\t class=\"tabStripButton-${tabPosition}\"\n\t\t id=\"${id}_menuBtn\"\n\t\t data-dojo-props=\"containerId: '${containerId}', iconClass: 'dijitTabStripMenuIcon',\n\t\t\t\t\tdropDownPosition: ['below-alt', 'above-alt']\"\n\t\t data-dojo-attach-point=\"_menuBtn\" showLabel=\"false\" title=\"\">&#9660;</div>\n\t<div data-dojo-type=\"dijit.layout._ScrollingTabControllerButton\"\n\t\t class=\"tabStripButton-${tabPosition}\"\n\t\t id=\"${id}_leftBtn\"\n\t\t data-dojo-props=\"iconClass:'dijitTabStripSlideLeftIcon', showLabel:false, title:''\"\n\t\t data-dojo-attach-point=\"_leftBtn\" data-dojo-attach-event=\"onClick: doSlideLeft\">&#9664;</div>\n\t<div data-dojo-type=\"dijit.layout._ScrollingTabControllerButton\"\n\t\t class=\"tabStripButton-${tabPosition}\"\n\t\t id=\"${id}_rightBtn\"\n\t\t data-dojo-props=\"iconClass:'dijitTabStripSlideRightIcon', showLabel:false, title:''\"\n\t\t data-dojo-attach-point=\"_rightBtn\" data-dojo-attach-event=\"onClick: doSlideRight\">&#9654;</div>\n\t<div class='dijitTabListWrapper' data-dojo-attach-point='tablistWrapper'>\n\t\t<div role='tablist' data-dojo-attach-event='onkeydown:onkeydown'\n\t\t\t data-dojo-attach-point='containerNode' class='nowrapTabStrip'></div>\n\t</div>\n</div>","url:dijit/form/templates/Button.html":"<span class=\"dijit dijitReset dijitInline\" role=\"presentation\"\n\t><span class=\"dijitReset dijitInline dijitButtonNode\"\n\t\tdata-dojo-attach-event=\"ondijitclick:__onClick\" role=\"presentation\"\n\t\t><span class=\"dijitReset dijitStretch dijitButtonContents\"\n\t\t\tdata-dojo-attach-point=\"titleNode,focusNode\"\n\t\t\trole=\"button\" aria-labelledby=\"${id}_label\"\n\t\t\t><span class=\"dijitReset dijitInline dijitIcon\" data-dojo-attach-point=\"iconNode\"></span\n\t\t\t><span class=\"dijitReset dijitToggleButtonIconChar\">&#x25CF;</span\n\t\t\t><span class=\"dijitReset dijitInline dijitButtonText\"\n\t\t\t\tid=\"${id}_label\"\n\t\t\t\tdata-dojo-attach-point=\"containerNode\"\n\t\t\t></span\n\t\t></span\n\t></span\n\t><input ${!nameAttrSetting} type=\"${type}\" value=\"${value}\" class=\"dijitOffScreen\"\n\t\tdata-dojo-attach-event=\"onclick:_onClick\"\n\t\ttabIndex=\"-1\" role=\"presentation\" data-dojo-attach-point=\"valueNode\"\n/></span>\n","url:dijit/templates/TooltipDialog.html":"<div role=\"alertdialog\" tabIndex=\"-1\">\n\t<div class=\"dijitTooltipContainer\" role=\"presentation\">\n\t\t<div class=\"dijitTooltipContents dijitTooltipFocusNode\" data-dojo-attach-point=\"containerNode\"></div>\n\t</div>\n\t<div class=\"dijitTooltipConnector\" role=\"presentation\" data-dojo-attach-point=\"connectorNode\"></div>\n</div>\n","*now":function(r){
r(["dojo/i18n!*preload*manager/nls/dijit*[]"]);
}}});
define("manager/dijit",[],1);
