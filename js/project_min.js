/*! project_boilerplate : project_min.js */
/*! codebase: CB2017 v2.1.4 by Jonathan Robles */
/*! built:04-19-2017 [2:01:16AM] */
/*! -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */

/*! Prerequisite Libraries: none */

/*! -=-=-=-=-=-=-=-Third Party Includes [start]-=-=-=-=-=-=-=- */
/* requireLib */
/*! -=-=-=-=-=-=-=- Third Party Includes [end] -=-=-=-=-=-=-=- */

define("js_src/modules/base/standardmodule",[],function(){function a(a){this._instanceID=c();var b=this;return d[this._instanceID]={type:"Standard Module Definition",author:"Jonathan Robles",notifyscope:"global",target:void 0,file:void 0,usenocache:!0,data:void 0,callback:void 0,interval:void 0,init:function(){_notify.broadcast("Initialize",[{senderID:b._instanceID,sendertype:this.type,notifyscope:this.notifyscope,data:{author:this.author}}])},parent:this},d[this._instanceID]=e(d[this._instanceID],a),d[this._instanceID].init(),this}var b=0,c=function(){return++b},d=[],e=function(a,b){for(var c in b)b[c]&&b[c].constructor&&b[c].constructor===Object?(a[c]=a[c]||{},arguments.callee(a[c],b[c])):a[c]=b[c];return a};return a.prototype={_init:function(){this._var().init()},_showdata:function(){return JSON.stringify(d[this._instanceID])},_id:function(){return this._instanceID},_var:function(a){return void 0!=a&&(d[this._instanceID]=e(d[this._instanceID],a)),d[this._instanceID]},_nocache:function(a){if("string"==typeof a){if(this._var().usenocache){var b="?";return-1!=a.indexOf("?")&&(b="&"),a+b+"nocache="+Math.floor(9999*Math.random())}return a}return void this.notify("Alert","_nocache needs a string!")},notify:function(a,b){_notify.broadcast(a,[{senderID:this._id(),sendertype:this._var().type,notifyscope:this._var().notifyscope,data:b}])},deepExtend:function(a,b){return e(a,b)},parent:this},a}),define("js_src/modules/base/extendedmodule",["js_src/modules/base/standardmodule"],function(a){function b(b){var c={type:"extendedmodule",author:"Jonathan Robles",lasteditby:""};return c=this.deepExtend(c,b),a.call(this,c),this}return b.prototype=Object.create(a.prototype),b.prototype._startlisteners=function(){},b.prototype.init=function(){this.notify("Trace","init"),this._startlisteners(),this.refresh()},b.prototype.refresh=function(){this.notify("Trace","refresh")},b.prototype.kill=function(){this.notify("Trace","kill"),_notify.rem(this._id())},b.prototype.sayhi=function(){this.notify("Trace","hi there, from object#"+this._id()+" [ "+this._var().type+" by "+this._var().author+" ] ")},b}),require(["js_src/modules/base/extendedmodule"],function(a){window.myProject=new a({}),window.myProject.init()}),define("projects/project_boilerplate/js_src/project.js",function(){});