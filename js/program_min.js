/*! project_boilerplate : program_min.js */
/*! codebase: CB2017 v2.1.4 by Jonathan Robles */
/*! built:04-20-2017 [1:59:38AM] */
/*! -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */

/*! Prerequisite Libraries: none */

/*! -=-=-=-=-=-=-=-Third Party Includes [start]-=-=-=-=-=-=-=- */
/* requireLib */
/*! -=-=-=-=-=-=-=- Third Party Includes [end] -=-=-=-=-=-=-=- */

function Event_Handler(){var a=this;a.stack={},a.addEventListener=function(b,c,d){void 0===d&&(d=document),void 0===a.stack[String(d)+"_"+b]&&(a.stack[String(d)+"_"+b]=[]),d.addEventListener(b,c),a.stack[String(d)+"_"+b].push({target:d,handler:c})},a.removeEventListeners=function(b,c){void 0===c&&(c=document),a.muteEventListeners(b,c);var d=a.stack[String(c)+"_"+b];d.length=0},a.muteEventListeners=function(b,c){void 0===c&&(c=document);for(var d=a.stack[String(c)+"_"+b],e=0;e<d.length;e++)c.removeEventListener(b,d[e].handler)},a.unmuteEventListeners=function(b,c){void 0===c&&(c=document),a.muteEventListeners(b,c);for(var d=a.stack[String(c)+"_"+b],e=0;e<d.length;e++)d[e].target.addEventListener(b,d[e].handler)},a.returnStack=function(b,c){void 0===c&&(c=document);var d=a.stack[String(c)+"_"+b];return d}}var requirejs,require,define;!function(global){function isFunction(a){return"[object Function]"===ostring.call(a)}function isArray(a){return"[object Array]"===ostring.call(a)}function each(a,b){if(a){var c;for(c=0;c<a.length&&(!a[c]||!b(a[c],c,a));c+=1);}}function eachReverse(a,b){if(a){var c;for(c=a.length-1;c>-1&&(!a[c]||!b(a[c],c,a));c-=1);}}function hasProp(a,b){return hasOwn.call(a,b)}function getOwn(a,b){return hasProp(a,b)&&a[b]}function eachProp(a,b){var c;for(c in a)if(hasProp(a,c)&&b(a[c],c))break}function mixin(a,b,c,d){return b&&eachProp(b,function(b,e){!c&&hasProp(a,e)||(d&&"string"!=typeof b?(a[e]||(a[e]={}),mixin(a[e],b,c,d)):a[e]=b)}),a}function bind(a,b){return function(){return b.apply(a,arguments)}}function scripts(){return document.getElementsByTagName("script")}function defaultOnError(a){throw a}function getGlobal(a){if(!a)return a;var b=global;return each(a.split("."),function(a){b=b[a]}),b}function makeError(a,b,c,d){var e=new Error(b+"\nhttp://requirejs.org/docs/errors.html#"+a);return e.requireType=a,e.requireModules=d,c&&(e.originalError=c),e}function newContext(a){function b(a){var b,c;for(b=0;a[b];b+=1)if(c=a[b],"."===c)a.splice(b,1),b-=1;else if(".."===c){if(1===b&&(".."===a[2]||".."===a[0]))break;b>0&&(a.splice(b-1,2),b-=2)}}function c(a,c,d){var e,f,g,h,i,j,k,l,m,n,o,p=c&&c.split("/"),q=p,r=x.map,s=r&&r["*"];if(a&&"."===a.charAt(0)&&(c?(q=getOwn(x.pkgs,c)?p=[c]:p.slice(0,p.length-1),a=q.concat(a.split("/")),b(a),f=getOwn(x.pkgs,e=a[0]),a=a.join("/"),f&&a===e+"/"+f.main&&(a=e)):0===a.indexOf("./")&&(a=a.substring(2))),d&&r&&(p||s)){for(h=a.split("/"),i=h.length;i>0;i-=1){if(k=h.slice(0,i).join("/"),p)for(j=p.length;j>0;j-=1)if(g=getOwn(r,p.slice(0,j).join("/")),g&&(g=getOwn(g,k))){l=g,m=i;break}if(l)break;!n&&s&&getOwn(s,k)&&(n=getOwn(s,k),o=i)}!l&&n&&(l=n,m=o),l&&(h.splice(0,m,l),a=h.join("/"))}return a}function d(a){isBrowser&&each(scripts(),function(b){return b.getAttribute("data-requiremodule")===a&&b.getAttribute("data-requirecontext")===u.contextName?(b.parentNode.removeChild(b),!0):void 0})}function e(a){var b=getOwn(x.paths,a);return b&&isArray(b)&&b.length>1?(d(a),b.shift(),u.require.undef(a),u.require([a]),!0):void 0}function f(a){var b,c=a?a.indexOf("!"):-1;return c>-1&&(b=a.substring(0,c),a=a.substring(c+1,a.length)),[b,a]}function g(a,b,d,e){var g,h,i,j,k=null,l=b?b.name:null,m=a,n=!0,o="";return a||(n=!1,a="_@r"+(E+=1)),j=f(a),k=j[0],a=j[1],k&&(k=c(k,l,e),h=getOwn(C,k)),a&&(k?o=h&&h.normalize?h.normalize(a,function(a){return c(a,l,e)}):c(a,l,e):(o=c(a,l,e),j=f(o),k=j[0],o=j[1],d=!0,g=u.nameToUrl(o))),i=!k||h||d?"":"_unnormalized"+(F+=1),{prefix:k,name:o,parentMap:b,unnormalized:!!i,url:g,originalName:m,isDefine:n,id:(k?k+"!"+o:o)+i}}function h(a){var b=a.id,c=getOwn(y,b);return c||(c=y[b]=new u.Module(a)),c}function i(a,b,c){var d=a.id,e=getOwn(y,d);!hasProp(C,d)||e&&!e.defineEmitComplete?(e=h(a),e.error&&"error"===b?c(e.error):e.on(b,c)):"defined"===b&&c(C[d])}function j(a,b){var c=a.requireModules,d=!1;b?b(a):(each(c,function(b){var c=getOwn(y,b);c&&(c.error=a,c.events.error&&(d=!0,c.emit("error",a)))}),d||req.onError(a))}function k(){globalDefQueue.length&&(apsp.apply(B,[B.length-1,0].concat(globalDefQueue)),globalDefQueue=[])}function l(a){delete y[a],delete z[a]}function m(a,b,c){var d=a.map.id;a.error?a.emit("error",a.error):(b[d]=!0,each(a.depMaps,function(d,e){var f=d.id,g=getOwn(y,f);!g||a.depMatched[e]||c[f]||(getOwn(b,f)?(a.defineDep(e,C[f]),a.check()):m(g,b,c))}),c[d]=!0)}function n(){var a,b,c,f,g=1e3*x.waitSeconds,h=g&&u.startTime+g<(new Date).getTime(),i=[],k=[],l=!1,o=!0;if(!s){if(s=!0,eachProp(z,function(c){if(a=c.map,b=a.id,c.enabled&&(a.isDefine||k.push(c),!c.error))if(!c.inited&&h)e(b)?(f=!0,l=!0):(i.push(b),d(b));else if(!c.inited&&c.fetched&&a.isDefine&&(l=!0,!a.prefix))return o=!1}),h&&i.length)return c=makeError("timeout","Load timeout for modules: "+i,null,i),c.contextName=u.contextName,j(c);o&&each(k,function(a){m(a,{},{})}),h&&!f||!l||!isBrowser&&!isWebWorker||w||(w=setTimeout(function(){w=0,n()},50)),s=!1}}function o(a){hasProp(C,a[0])||h(g(a[0],null,!0)).init(a[1],a[2])}function p(a,b,c,d){a.detachEvent&&!isOpera?d&&a.detachEvent(d,b):a.removeEventListener(c,b,!1)}function q(a){var b=a.currentTarget||a.srcElement;return p(b,u.onScriptLoad,"load","onreadystatechange"),p(b,u.onScriptError,"error"),{node:b,id:b&&b.getAttribute("data-requiremodule")}}function r(){var a;for(k();B.length;){if(a=B.shift(),null===a[0])return j(makeError("mismatch","Mismatched anonymous define() module: "+a[a.length-1]));o(a)}}var s,t,u,v,w,x={waitSeconds:7,baseUrl:"./",paths:{},pkgs:{},shim:{},config:{}},y={},z={},A={},B=[],C={},D={},E=1,F=1;return v={require:function(a){return a.require?a.require:a.require=u.makeRequire(a.map)},exports:function(a){return a.usingExports=!0,a.map.isDefine?a.exports?a.exports:a.exports=C[a.map.id]={}:void 0},module:function(a){return a.module?a.module:a.module={id:a.map.id,uri:a.map.url,config:function(){var b,c=getOwn(x.pkgs,a.map.id);return b=c?getOwn(x.config,a.map.id+"/"+c.main):getOwn(x.config,a.map.id),b||{}},exports:C[a.map.id]}}},t=function(a){this.events=getOwn(A,a.id)||{},this.map=a,this.shim=getOwn(x.shim,a.id),this.depExports=[],this.depMaps=[],this.depMatched=[],this.pluginMaps={},this.depCount=0},t.prototype={init:function(a,b,c,d){d=d||{},this.inited||(this.factory=b,c?this.on("error",c):this.events.error&&(c=bind(this,function(a){this.emit("error",a)})),this.depMaps=a&&a.slice(0),this.errback=c,this.inited=!0,this.ignore=d.ignore,d.enabled||this.enabled?this.enable():this.check())},defineDep:function(a,b){this.depMatched[a]||(this.depMatched[a]=!0,this.depCount-=1,this.depExports[a]=b)},fetch:function(){if(!this.fetched){this.fetched=!0,u.startTime=(new Date).getTime();var a=this.map;return this.shim?void u.makeRequire(this.map,{enableBuildCallback:!0})(this.shim.deps||[],bind(this,function(){return a.prefix?this.callPlugin():this.load()})):a.prefix?this.callPlugin():this.load()}},load:function(){var a=this.map.url;D[a]||(D[a]=!0,u.load(this.map.id,a))},check:function(){if(this.enabled&&!this.enabling){var a,b,c=this.map.id,d=this.depExports,e=this.exports,f=this.factory;if(this.inited){if(this.error)this.emit("error",this.error);else if(!this.defining){if(this.defining=!0,this.depCount<1&&!this.defined){if(isFunction(f)){if(this.events.error&&this.map.isDefine||req.onError!==defaultOnError)try{e=u.execCb(c,f,d,e)}catch(g){a=g}else e=u.execCb(c,f,d,e);if(this.map.isDefine&&(b=this.module,b&&void 0!==b.exports&&b.exports!==this.exports?e=b.exports:void 0===e&&this.usingExports&&(e=this.exports)),a)return a.requireMap=this.map,a.requireModules=this.map.isDefine?[this.map.id]:null,a.requireType=this.map.isDefine?"define":"require",j(this.error=a)}else e=f;this.exports=e,this.map.isDefine&&!this.ignore&&(C[c]=e,req.onResourceLoad&&req.onResourceLoad(u,this.map,this.depMaps)),l(c),this.defined=!0}this.defining=!1,this.defined&&!this.defineEmitted&&(this.defineEmitted=!0,this.emit("defined",this.exports),this.defineEmitComplete=!0)}}else this.fetch()}},callPlugin:function(){var a=this.map,b=a.id,d=g(a.prefix);this.depMaps.push(d),i(d,"defined",bind(this,function(d){var e,f,k,m=this.map.name,n=this.map.parentMap?this.map.parentMap.name:null,o=u.makeRequire(a.parentMap,{enableBuildCallback:!0});return this.map.unnormalized?(d.normalize&&(m=d.normalize(m,function(a){return c(a,n,!0)})||""),f=g(a.prefix+"!"+m,this.map.parentMap),i(f,"defined",bind(this,function(a){this.init([],function(){return a},null,{enabled:!0,ignore:!0})})),k=getOwn(y,f.id),void(k&&(this.depMaps.push(f),this.events.error&&k.on("error",bind(this,function(a){this.emit("error",a)})),k.enable()))):(e=bind(this,function(a){this.init([],function(){return a},null,{enabled:!0})}),e.error=bind(this,function(a){this.inited=!0,this.error=a,a.requireModules=[b],eachProp(y,function(a){0===a.map.id.indexOf(b+"_unnormalized")&&l(a.map.id)}),j(a)}),e.fromText=bind(this,function(c,d){var f=a.name,i=g(f),k=useInteractive;d&&(c=d),k&&(useInteractive=!1),h(i),hasProp(x.config,b)&&(x.config[f]=x.config[b]);try{req.exec(c)}catch(l){return j(makeError("fromtexteval","fromText eval for "+b+" failed: "+l,l,[b]))}k&&(useInteractive=!0),this.depMaps.push(i),u.completeLoad(f),o([f],e)}),void d.load(a.name,o,e,x))})),u.enable(d,this),this.pluginMaps[d.id]=d},enable:function(){z[this.map.id]=this,this.enabled=!0,this.enabling=!0,each(this.depMaps,bind(this,function(a,b){var c,d,e;if("string"==typeof a){if(a=g(a,this.map.isDefine?this.map:this.map.parentMap,!1,!this.skipMap),this.depMaps[b]=a,e=getOwn(v,a.id))return void(this.depExports[b]=e(this));this.depCount+=1,i(a,"defined",bind(this,function(a){this.defineDep(b,a),this.check()})),this.errback&&i(a,"error",bind(this,this.errback))}c=a.id,d=y[c],hasProp(v,c)||!d||d.enabled||u.enable(a,this)})),eachProp(this.pluginMaps,bind(this,function(a){var b=getOwn(y,a.id);b&&!b.enabled&&u.enable(a,this)})),this.enabling=!1,this.check()},on:function(a,b){var c=this.events[a];c||(c=this.events[a]=[]),c.push(b)},emit:function(a,b){each(this.events[a],function(a){a(b)}),"error"===a&&delete this.events[a]}},u={config:x,contextName:a,registry:y,defined:C,urlFetched:D,defQueue:B,Module:t,makeModuleMap:g,nextTick:req.nextTick,onError:j,configure:function(a){a.baseUrl&&"/"!==a.baseUrl.charAt(a.baseUrl.length-1)&&(a.baseUrl+="/");var b=x.pkgs,c=x.shim,d={paths:!0,config:!0,map:!0};eachProp(a,function(a,b){d[b]?"map"===b?(x.map||(x.map={}),mixin(x[b],a,!0,!0)):mixin(x[b],a,!0):x[b]=a}),a.shim&&(eachProp(a.shim,function(a,b){isArray(a)&&(a={deps:a}),!a.exports&&!a.init||a.exportsFn||(a.exportsFn=u.makeShimExports(a)),c[b]=a}),x.shim=c),a.packages&&(each(a.packages,function(a){var c;a="string"==typeof a?{name:a}:a,c=a.location,b[a.name]={name:a.name,location:c||a.name,main:(a.main||"main").replace(currDirRegExp,"").replace(jsSuffixRegExp,"")}}),x.pkgs=b),eachProp(y,function(a,b){a.inited||a.map.unnormalized||(a.map=g(b))}),(a.deps||a.callback)&&u.require(a.deps||[],a.callback)},makeShimExports:function(a){function b(){var b;return a.init&&(b=a.init.apply(global,arguments)),b||a.exports&&getGlobal(a.exports)}return b},makeRequire:function(b,d){function e(c,f,i){var k,l,m;return d.enableBuildCallback&&f&&isFunction(f)&&(f.__requireJsBuild=!0),"string"==typeof c?isFunction(f)?j(makeError("requireargs","Invalid require call"),i):b&&hasProp(v,c)?v[c](y[b.id]):req.get?req.get(u,c,b,e):(l=g(c,b,!1,!0),k=l.id,hasProp(C,k)?C[k]:j(makeError("notloaded",'Module name "'+k+'" has not been loaded yet for context: '+a+(b?"":". Use require([])")))):(r(),u.nextTick(function(){r(),m=h(g(null,b)),m.skipMap=d.skipMap,m.init(c,f,i,{enabled:!0}),n()}),e)}return d=d||{},mixin(e,{isBrowser:isBrowser,toUrl:function(a){var d,e=a.lastIndexOf("."),f=a.split("/")[0],g="."===f||".."===f;return-1!==e&&(!g||e>1)&&(d=a.substring(e,a.length),a=a.substring(0,e)),u.nameToUrl(c(a,b&&b.id,!0),d,!0)},defined:function(a){return hasProp(C,g(a,b,!1,!0).id)},specified:function(a){return a=g(a,b,!1,!0).id,hasProp(C,a)||hasProp(y,a)}}),b||(e.undef=function(a){k();var c=g(a,b,!0),d=getOwn(y,a);delete C[a],delete D[c.url],delete A[a],d&&(d.events.defined&&(A[a]=d.events),l(a))}),e},enable:function(a){var b=getOwn(y,a.id);b&&h(a).enable()},completeLoad:function(a){var b,c,d,f=getOwn(x.shim,a)||{},g=f.exports;for(k();B.length;){if(c=B.shift(),null===c[0]){if(c[0]=a,b)break;b=!0}else c[0]===a&&(b=!0);o(c)}if(d=getOwn(y,a),!b&&!hasProp(C,a)&&d&&!d.inited){if(!(!x.enforceDefine||g&&getGlobal(g)))return e(a)?void 0:j(makeError("nodefine","No define call for "+a,null,[a]));o([a,f.deps||[],f.exportsFn])}n()},nameToUrl:function(a,b,c){var d,e,f,g,h,i,j,k,l;if(req.jsExtRegExp.test(a))k=a+(b||"");else{for(d=x.paths,e=x.pkgs,h=a.split("/"),i=h.length;i>0;i-=1){if(j=h.slice(0,i).join("/"),f=getOwn(e,j),l=getOwn(d,j)){isArray(l)&&(l=l[0]),h.splice(0,i,l);break}if(f){g=a===f.name?f.location+"/"+f.main:f.location,h.splice(0,i,g);break}}k=h.join("/"),k+=b||(/\?/.test(k)||c?"":".js"),k=("/"===k.charAt(0)||k.match(/^[\w\+\.\-]+:/)?"":x.baseUrl)+k}return x.urlArgs?k+((-1===k.indexOf("?")?"?":"&")+x.urlArgs):k},load:function(a,b){req.load(u,a,b)},execCb:function(a,b,c,d){return b.apply(d,c)},onScriptLoad:function(a){if("load"===a.type||readyRegExp.test((a.currentTarget||a.srcElement).readyState)){interactiveScript=null;var b=q(a);u.completeLoad(b.id)}},onScriptError:function(a){var b=q(a);return e(b.id)?void 0:j(makeError("scripterror","Script error for: "+b.id,a,[b.id]))}},u.require=u.makeRequire(),u}function getInteractiveScript(){return interactiveScript&&"interactive"===interactiveScript.readyState?interactiveScript:(eachReverse(scripts(),function(a){return"interactive"===a.readyState?interactiveScript=a:void 0}),interactiveScript)}var req,s,head,baseElement,dataMain,src,interactiveScript,currentlyAddingScript,mainScript,subPath,version="2.1.8",commentRegExp=/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm,cjsRequireRegExp=/[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,jsSuffixRegExp=/\.js$/,currDirRegExp=/^\.\//,op=Object.prototype,ostring=op.toString,hasOwn=op.hasOwnProperty,ap=Array.prototype,apsp=ap.splice,isBrowser=!("undefined"==typeof window||!navigator||!window.document),isWebWorker=!isBrowser&&"undefined"!=typeof importScripts,readyRegExp=isBrowser&&"PLAYSTATION 3"===navigator.platform?/^complete$/:/^(complete|loaded)$/,defContextName="_",isOpera="undefined"!=typeof opera&&"[object Opera]"===opera.toString(),contexts={},cfg={},globalDefQueue=[],useInteractive=!1;if("undefined"==typeof define){if("undefined"!=typeof requirejs){if(isFunction(requirejs))return;cfg=requirejs,requirejs=void 0}"undefined"==typeof require||isFunction(require)||(cfg=require,require=void 0),req=requirejs=function(a,b,c,d){var e,f,g=defContextName;return isArray(a)||"string"==typeof a||(f=a,isArray(b)?(a=b,b=c,c=d):a=[]),f&&f.context&&(g=f.context),e=getOwn(contexts,g),e||(e=contexts[g]=req.s.newContext(g)),f&&e.configure(f),e.require(a,b,c)},req.config=function(a){return req(a)},req.nextTick="undefined"!=typeof setTimeout?function(a){setTimeout(a,4)}:function(a){a()},require||(require=req),req.version=version,req.jsExtRegExp=/^\/|:|\?|\.js$/,req.isBrowser=isBrowser,s=req.s={contexts:contexts,newContext:newContext},req({}),each(["toUrl","undef","defined","specified"],function(a){req[a]=function(){var b=contexts[defContextName];return b.require[a].apply(b,arguments)}}),isBrowser&&(head=s.head=document.getElementsByTagName("head")[0],baseElement=document.getElementsByTagName("base")[0],baseElement&&(head=s.head=baseElement.parentNode)),req.onError=defaultOnError,req.createNode=function(a,b,c){var d=a.xhtml?document.createElementNS("http://www.w3.org/1999/xhtml","html:script"):document.createElement("script");return d.type=a.scriptType||"text/javascript",d.charset="utf-8",d.async=!0,d},req.load=function(a,b,c){var d,e=a&&a.config||{};if(isBrowser)return d=req.createNode(e,b,c),d.setAttribute("data-requirecontext",a.contextName),d.setAttribute("data-requiremodule",b),!d.attachEvent||d.attachEvent.toString&&d.attachEvent.toString().indexOf("[native code")<0||isOpera?(d.addEventListener("load",a.onScriptLoad,!1),d.addEventListener("error",a.onScriptError,!1)):(useInteractive=!0,d.attachEvent("onreadystatechange",a.onScriptLoad)),d.src=c,currentlyAddingScript=d,baseElement?head.insertBefore(d,baseElement):head.appendChild(d),currentlyAddingScript=null,d;if(isWebWorker)try{importScripts(c),a.completeLoad(b)}catch(f){a.onError(makeError("importscripts","importScripts failed for "+b+" at "+c,f,[b]))}},isBrowser&&eachReverse(scripts(),function(a){return head||(head=a.parentNode),dataMain=a.getAttribute("data-main"),dataMain?(mainScript=dataMain,cfg.baseUrl||(src=mainScript.split("/"),mainScript=src.pop(),subPath=src.length?src.join("/")+"/":"./",cfg.baseUrl=subPath),mainScript=mainScript.replace(jsSuffixRegExp,""),req.jsExtRegExp.test(mainScript)&&(mainScript=dataMain),cfg.deps=cfg.deps?cfg.deps.concat(mainScript):[mainScript],!0):void 0}),define=function(a,b,c){var d,e;"string"!=typeof a&&(c=b,b=a,a=null),isArray(b)||(c=b,b=null),!b&&isFunction(c)&&(b=[],c.length&&(c.toString().replace(commentRegExp,"").replace(cjsRequireRegExp,function(a,c){b.push(c)}),b=(1===c.length?["require"]:["require","exports","module"]).concat(b))),useInteractive&&(d=currentlyAddingScript||getInteractiveScript(),d&&(a||(a=d.getAttribute("data-requiremodule")),e=contexts[d.getAttribute("data-requirecontext")])),(e?e.defQueue:globalDefQueue).push([a,b,c])},define.amd={jQuery:!0},req.exec=function(text){return eval(text)},req(cfg)}}(this),define("requireLib",function(){}),window.Modernizr=function(a,b,c){function d(a){s.cssText=a}function e(a,b){return typeof a===b}function f(a,b){return!!~(""+a).indexOf(b)}function g(a,b){for(var d in a){var e=a[d];if(!f(e,"-")&&s[e]!==c)return"pfx"==b?e:!0}return!1}function h(a,b,d){for(var f in a){var g=b[a[f]];if(g!==c)return d===!1?a[f]:e(g,"function")?g.bind(d||b):g}return!1}function i(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),f=(a+" "+w.join(d+" ")+d).split(" ");return e(b,"string")||e(b,"undefined")?g(f,b):(f=(a+" "+x.join(d+" ")+d).split(" "),h(f,b,c))}var j,k,l,m="2.7.1",n={},o=!0,p=b.documentElement,q="modernizr",r=b.createElement(q),s=r.style,t={}.toString,u=" -webkit- -moz- -o- -ms- ".split(" "),v="Webkit Moz O ms",w=v.split(" "),x=v.toLowerCase().split(" "),y={svg:"http://www.w3.org/2000/svg"},z={},A=[],B=A.slice,C=function(a,c,d,e){var f,g,h,i,j=b.createElement("div"),k=b.body,l=k||b.createElement("body");if(parseInt(d,10))for(;d--;)h=b.createElement("div"),h.id=e?e[d]:q+(d+1),j.appendChild(h);return f=["&#173;",'<style id="s',q,'">',a,"</style>"].join(""),j.id=q,(k?j:l).innerHTML+=f,l.appendChild(j),k||(l.style.background="",l.style.overflow="hidden",i=p.style.overflow,p.style.overflow="hidden",p.appendChild(l)),g=c(j,a),k?j.parentNode.removeChild(j):(l.parentNode.removeChild(l),p.style.overflow=i),!!g},D=function(b){var c=a.matchMedia||a.msMatchMedia;if(c)return c(b).matches;var d;return C("@media "+b+" { #"+q+" { position: absolute; } }",function(b){d="absolute"==(a.getComputedStyle?getComputedStyle(b,null):b.currentStyle).position}),d},E={}.hasOwnProperty;l=e(E,"undefined")||e(E.call,"undefined")?function(a,b){return b in a&&e(a.constructor.prototype[b],"undefined")}:function(a,b){return E.call(a,b)},Function.prototype.bind||(Function.prototype.bind=function(a){var b=this;if("function"!=typeof b)throw new TypeError;var c=B.call(arguments,1),d=function(){if(this instanceof d){var e=function(){};e.prototype=b.prototype;var f=new e,g=b.apply(f,c.concat(B.call(arguments)));return Object(g)===g?g:f}return b.apply(a,c.concat(B.call(arguments)))};return d}),z.canvas=function(){var a=b.createElement("canvas");return!!a.getContext&&!!a.getContext("2d")},z.touch=function(){var c;return"ontouchstart"in a||a.DocumentTouch&&b instanceof DocumentTouch?c=!0:C(["@media (",u.join("touch-enabled),("),q,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(a){c=9===a.offsetTop}),c},z.geolocation=function(){return"geolocation"in navigator},z.cssanimations=function(){return i("animationName")},z.csstransforms=function(){return!!i("transform")},z.csstransforms3d=function(){var a=!!i("perspective");return a&&"webkitPerspective"in p.style&&C("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}",function(b,c){a=9===b.offsetLeft&&3===b.offsetHeight}),a},z.csstransitions=function(){return i("transition")},z.fontface=function(){var a;return C('@font-face {font-family:"font";src:url("https://")}',function(c,d){var e=b.getElementById("smodernizr"),f=e.sheet||e.styleSheet,g=f?f.cssRules&&f.cssRules[0]?f.cssRules[0].cssText:f.cssText||"":"";a=/src/i.test(g)&&0===g.indexOf(d.split(" ")[0])}),a},z.video=function(){var a=b.createElement("video"),c=!1;try{(c=!!a.canPlayType)&&(c=new Boolean(c),c.ogg=a.canPlayType('video/ogg; codecs="theora"').replace(/^no$/,""),c.h264=a.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/,""),c.webm=a.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,""))}catch(d){}return c},z.audio=function(){var a=b.createElement("audio"),c=!1;try{(c=!!a.canPlayType)&&(c=new Boolean(c),c.ogg=a.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),c.mp3=a.canPlayType("audio/mpeg;").replace(/^no$/,""),c.wav=a.canPlayType('audio/wav; codecs="1"').replace(/^no$/,""),c.m4a=(a.canPlayType("audio/x-m4a;")||a.canPlayType("audio/aac;")).replace(/^no$/,""))}catch(d){}return c},z.webworkers=function(){return!!a.Worker},z.svg=function(){return!!b.createElementNS&&!!b.createElementNS(y.svg,"svg").createSVGRect},z.inlinesvg=function(){var a=b.createElement("div");return a.innerHTML="<svg/>",(a.firstChild&&a.firstChild.namespaceURI)==y.svg},z.svgclippaths=function(){return!!b.createElementNS&&/SVGClipPath/.test(t.call(b.createElementNS(y.svg,"clipPath")))};for(var F in z)l(z,F)&&(k=F.toLowerCase(),n[k]=z[F](),A.push((n[k]?"":"no-")+k));return n.addTest=function(a,b){if("object"==typeof a)for(var d in a)l(a,d)&&n.addTest(d,a[d]);else{if(a=a.toLowerCase(),n[a]!==c)return n;b="function"==typeof b?b():b,"undefined"!=typeof o&&o&&(p.className+=" "+(b?"":"no-")+a),n[a]=b}return n},d(""),r=j=null,function(a,b){function c(a,b){var c=a.createElement("p"),d=a.getElementsByTagName("head")[0]||a.documentElement;return c.innerHTML="x<style>"+b+"</style>",d.insertBefore(c.lastChild,d.firstChild)}function d(){var a=s.elements;return"string"==typeof a?a.split(" "):a}function e(a){var b=r[a[p]];return b||(b={},q++,a[p]=q,r[q]=b),b}function f(a,c,d){if(c||(c=b),k)return c.createElement(a);d||(d=e(c));var f;return f=d.cache[a]?d.cache[a].cloneNode():o.test(a)?(d.cache[a]=d.createElem(a)).cloneNode():d.createElem(a),!f.canHaveChildren||n.test(a)||f.tagUrn?f:d.frag.appendChild(f)}function g(a,c){if(a||(a=b),k)return a.createDocumentFragment();c=c||e(a);for(var f=c.frag.cloneNode(),g=0,h=d(),i=h.length;i>g;g++)f.createElement(h[g]);return f}function h(a,b){b.cache||(b.cache={},b.createElem=a.createElement,b.createFrag=a.createDocumentFragment,b.frag=b.createFrag()),a.createElement=function(c){return s.shivMethods?f(c,a,b):b.createElem(c)},a.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+d().join().replace(/[\w\-]+/g,function(a){return b.createElem(a),b.frag.createElement(a),'c("'+a+'")'})+");return n}")(s,b.frag)}function i(a){a||(a=b);var d=e(a);return s.shivCSS&&!j&&!d.hasCSS&&(d.hasCSS=!!c(a,"article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),k||h(a,d),a}var j,k,l="3.7.0",m=a.html5||{},n=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,o=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,p="_html5shiv",q=0,r={};!function(){try{var a=b.createElement("a");a.innerHTML="<xyz></xyz>",j="hidden"in a,k=1==a.childNodes.length||function(){b.createElement("a");var a=b.createDocumentFragment();return"undefined"==typeof a.cloneNode||"undefined"==typeof a.createDocumentFragment||"undefined"==typeof a.createElement}()}catch(c){j=!0,k=!0}}();var s={elements:m.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",version:l,shivCSS:m.shivCSS!==!1,supportsUnknownElements:k,shivMethods:m.shivMethods!==!1,type:"default",shivDocument:i,createElement:f,createDocumentFragment:g};a.html5=s,i(b)}(this,b),n._version=m,n._prefixes=u,n._domPrefixes=x,n._cssomPrefixes=w,n.mq=D,n.testProp=function(a){return g([a])},n.testAllProps=i,n.testStyles=C,p.className=p.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(o?" js "+A.join(" "):""),n}(this,this.document),function(a,b,c){function d(a){return"[object Function]"==q.call(a)}function e(a){return"string"==typeof a}function f(){}function g(a){return!a||"loaded"==a||"complete"==a||"uninitialized"==a}function h(){var a=r.shift();s=1,a?a.t?o(function(){("c"==a.t?m.injectCss:m.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),h()):s=0}function i(a,c,d,e,f,i,j){function k(b){if(!n&&g(l.readyState)&&(t.r=n=1,!s&&h(),l.onload=l.onreadystatechange=null,b)){"img"!=a&&o(function(){v.removeChild(l)},50);for(var d in A[c])A[c].hasOwnProperty(d)&&A[c][d].onload()}}var j=j||m.errorTimeout,l=b.createElement(a),n=0,q=0,t={t:d,s:c,e:f,a:i,x:j};1===A[c]&&(q=1,A[c]=[]),"object"==a?l.data=c:(l.src=c,l.type=a),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){k.call(this,q)},r.splice(e,0,t),"img"!=a&&(q||2===A[c]?(v.insertBefore(l,u?null:p),o(k,j)):A[c].push(l))}function j(a,b,c,d,f){return s=0,b=b||"j",e(a)?i("c"==b?x:w,a,b,this.i++,c,d,f):(r.splice(this.i++,0,a),1==r.length&&h()),this}function k(){var a=m;return a.loader={load:j,i:0},a}var l,m,n=b.documentElement,o=a.setTimeout,p=b.getElementsByTagName("script")[0],q={}.toString,r=[],s=0,t="MozAppearance"in n.style,u=t&&!!b.createRange().compareNode,v=u?n:p.parentNode,n=a.opera&&"[object Opera]"==q.call(a.opera),n=!!b.attachEvent&&!n,w=t?"object":n?"script":"img",x=n?"script":w,y=Array.isArray||function(a){return"[object Array]"==q.call(a)},z=[],A={},B={timeout:function(a,b){return b.length&&(a.timeout=b[0]),a}};m=function(a){function b(a){var b,c,d,a=a.split("!"),e=z.length,f=a.pop(),g=a.length,f={url:f,origUrl:f,prefixes:a};for(c=0;g>c;c++)d=a[c].split("="),(b=B[d.shift()])&&(f=b(f,d));for(c=0;e>c;c++)f=z[c](f);return f}function g(a,e,f,g,h){var i=b(a),j=i.autoCallback;i.url.split(".").pop().split("?").shift(),i.bypass||(e&&(e=d(e)?e:e[a]||e[g]||e[a.split("/").pop().split("?")[0]]),i.instead?i.instead(a,e,f,g,h):(A[i.url]?i.noexec=!0:A[i.url]=1,f.load(i.url,i.forceCSS||!i.forceJS&&"css"==i.url.split(".").pop().split("?").shift()?"c":c,i.noexec,i.attrs,i.timeout),(d(e)||d(j))&&f.load(function(){k(),e&&e(i.origUrl,h,g),j&&j(i.origUrl,h,g),A[i.url]=2})))}function h(a,b){function c(a,c){if(a){if(e(a))c||(l=function(){var a=[].slice.call(arguments);m.apply(this,a),n()}),g(a,l,b,0,j);else if(Object(a)===a)for(i in h=function(){var b,c=0;for(b in a)a.hasOwnProperty(b)&&c++;return c}(),a)a.hasOwnProperty(i)&&(!c&&!--h&&(d(l)?l=function(){var a=[].slice.call(arguments);m.apply(this,a),n()}:l[i]=function(a){return function(){var b=[].slice.call(arguments);a&&a.apply(this,b),n()}}(m[i])),g(a[i],l,b,i,j))}else!c&&n()}var h,i,j=!!a.test,k=a.load||a.both,l=a.callback||f,m=l,n=a.complete||f;c(j?a.yep:a.nope,!!k),k&&c(k)}var i,j,l=this.yepnope.loader;if(e(a))g(a,0,l,0);else if(y(a))for(i=0;i<a.length;i++)j=a[i],e(j)?g(j,0,l,0):y(j)?m(j):Object(j)===j&&h(j,l);else Object(a)===a&&h(a,l)},m.addPrefix=function(a,b){B[a]=b},m.addFilter=function(a){z.push(a)},m.errorTimeout=1e4,null==b.readyState&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",l=function(){b.removeEventListener("DOMContentLoaded",l,0),b.readyState="complete"},0)),a.yepnope=k(),a.yepnope.executeStack=h,a.yepnope.injectJs=function(a,c,d,e,i,j){var k,l,n=b.createElement("script"),e=e||m.errorTimeout;n.src=a;for(l in d)n.setAttribute(l,d[l]);c=j?h:c||f,n.onreadystatechange=n.onload=function(){!k&&g(n.readyState)&&(k=1,c(),n.onload=n.onreadystatechange=null)},o(function(){k||(k=1,c(1))},e),i?n.onload():p.parentNode.insertBefore(n,p)},a.yepnope.injectCss=function(a,c,d,e,g,i){var j,e=b.createElement("link"),c=i?h:c||f;e.href=a,e.rel="stylesheet",e.type="text/css";for(j in d)e.setAttribute(j,d[j]);g||(p.parentNode.insertBefore(e,p),o(c,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))},define("modernizr",function(a){return function(){var b;return b||a.Modernizr}}(this)),"function"!=typeof Object.create&&(Object.create=function(a){function b(){}return b.prototype=a,new b}),function(){for(var a=0,b=["ms","moz","webkit","o"],c=0;c<b.length&&!window.requestAnimationFrame;++c)window.requestAnimationFrame=window[b[c]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[b[c]+"CancelAnimationFrame"]||window[b[c]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(b,c){var d=(new Date).getTime(),e=Math.max(0,16-(d-a)),f=window.setTimeout(function(){b(d+e)},e);return a=d+e,f}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(a){clearTimeout(a)})}(),function(){window.console?console.log("use http://[url]?debug=true for console.logs"):window.console={};for(var a=["log","info","warn","error","debug","trace","dir","group","groupCollapsed","groupEnd","time","timeEnd","profile","profileEnd","dirxml","assert","count","markTimeline","timeStamp","clear"],b=0;b<a.length;b++)window.console[a[b]]||(window.console[a[b]]=function(){})}(),_notify=function(){var a=function(){},b={},c=function(c,d,e){if(c){d=d||[];for(var f in b)if("function"==typeof b[f]["on"+c])try{e=e||b[f],b[f]["on"+c].apply(e,d)}catch(g){a(["Mediator error.",c,d,e,g].join(" "))}}},d=function(a,c,d){if(a in b){if(!d)throw new Error("The object: "+a+" has already applied listeners");e(a)}b[a]=c},e=function(a){a in b&&delete b[a]},f=function(a){return b[a]},g=function(a){return a in b};return{name:"Mediator",broadcast:c,add:d,rem:e,get:f,has:g}}(),_notify.add("global",function(){var a=0,b=0;return{onTrace:function(b){a++;var c=b.data;"object"==typeof c&&(c=JSON.stringify(c));var d="["+String(a)+"] ("+b.senderID+":"+b.sendertype+":"+b.notifyscope+") > "+c;_global$.getQuery("debug")&&console.log(d)},onAlert:function(c){b++;var d=c.data;"object"==typeof d&&(d=JSON.stringify(d));var e="["+String(a)+"] ("+c.senderID+":"+c.sendertype+":"+c.notifyscope+") > "+d;_global$.getQuery("debug")&&alert(e)},onInitialize:function(a){_global$.getQuery("debug")&&console.log("Created Instance #"+a.senderID+" type:"+a.sendertype+" by "+a.data.author+" [notifyscope:"+a.notifyscope+"]")},onOrientation:function(a){window._global$.addorientationtohtml(a)}}}()),window.eventHandler=new Event_Handler,require(["modernizr"],function(a){function b(){function a(a,b,c){var d;return function(){var e=this,f=arguments,g=function(){d=null,c||a.apply(e,f)},h=c&&!d;clearTimeout(d),d=setTimeout(g,b),h&&a.apply(e,f)}}var b=document.documentElement;if(arguments.callee._singletonInstance)return arguments.callee._singletonInstance;arguments.callee._singletonInstance=this;var c=this;this.lastscrollpositionX=0,this.lastscrollpositionY=0,this.orientation="notset",this.windowHeight=void 0,this.windowWidth=void 0,this.documentHeight=void 0,this.documentWidth=void 0,this.screenHeight=void 0,this.screenWidth=void 0,this.host=location.host,this.path=location.pathname,this.getQuery=function(a){for(var b=window.location.search.substring(1),c=b.split("&"),d=0;d<c.length;d++){var e=c[d].split("=");if(e[0]==a){var f=e[1];return"true"!=f&&"yes"!=f&&"y"!=f&&"t"!=f||(f=!0),"false"!=f&&"no"!=f&&"n"!=f&&"f"!=f||(f=!1),f}}return!1},this.getHash=function(a){return window.location.hash},c.getQuery("debug")&&b.classList.add("debug"),this.addorientationtohtml=function(a){"portrait"==a.data?(b.classList.add("portrait"),b.classList.remove("landscape")):(b.classList.add("landscape"),
b.classList.remove("portrait"))},this.setOrientation=function(){var a="portrait";c.setWindowHeight(),c.setWindowWidth(),c.windowWidth>c.windowHeight&&(a="landscape"),c._isupdated("orientation",a,"Orientation")},this.setWindowHeight=function(){this._isupdated("windowHeight",window.innerHeight,"WindowHeight")},this.setWindowWidth=function(){this._isupdated("windowWidth",window.innerWidth,"WindowWidth")},this.setDocumentHeight=function(){this._isupdated("documentHeight",document.body.clientHeight,"DocumentHeight")},this.setDocumentWidth=function(){this._isupdated("documentWidth",document.body.clientWidth,"DocumentWidth")},this.setScreenHeight=function(){this._isupdated("screenHeight",screen.height,"ScreenHeight")},this.setScreenWidth=function(){this._isupdated("screenWidth",screen.width,"ScreenWidth")},this.setLastScrollposition=function(){var a=window.scrollX,d=window.scrollY;d>c.lastscrollpositionY&&(b.classList.add("scrolldown"),b.classList.remove("scrollup")),d<c.lastscrollpositionY&&(b.classList.add("scrollup"),b.classList.remove("scrolldown")),a>c.lastscrollpositionX&&(b.classList.add("scrollright"),b.classList.remove("scrollleft")),a<c.lastscrollpositionX&&(b.classList.add("scrollleft"),b.classList.remove("scrollright")),c._isupdated("lastscrollpositionX",a,"LastXscroll"),c._isupdated("lastscrollpositionY",d,"LastYscroll")},this.jsonpReturn=function(a,b,c){return function(d){_notify.broadcast(b,[{senderID:a,sendertype:b,notifyscope:c,data:d}])}},this._isupdated=function(a,b,d){if(c[a]!=b){var e=c[a];c[a]=b,void 0!=e&&this.notify(d,c[a])}},this.notify=function(a,b){_notify.broadcast(a,[{senderID:"global",sendertype:"global",notifyscope:"global",data:b}])},this.setCookie=function(a,b){var c=new Date;c.setTime(c.getTime()+864e5),document.cookie=a+"="+b+";expires="+c.toUTCString()},this.getCookie=function(a){var b=document.cookie.match("(^|;) ?"+a+"=([^;]*)(;|$)");return b?b[2]:null};var d=a(c.setOrientation,250),e=a(c.setLastScrollposition,250);eventHandler.addEventListener("resize",d,window),eventHandler.addEventListener("scroll",e,window)}window._global$=new b,window._global$.setOrientation(),window._global$.setDocumentHeight(),window._global$.setDocumentWidth(),window._global$.setScreenHeight(),window._global$.setScreenWidth()}),define("js_src/libraries/baselibs/required_web_041917.js",function(){}),define("js_src/modules/base/standardmodule",[],function(){function a(a){this._instanceID=c();var b=this;return d[this._instanceID]={type:"Standard Module Definition",author:"Jonathan Robles",notifyscope:"global",target:void 0,file:void 0,usenocache:!0,data:void 0,callback:void 0,interval:void 0,init:function(){_notify.broadcast("Initialize",[{senderID:b._instanceID,sendertype:this.type,notifyscope:this.notifyscope,data:{author:this.author}}])},parent:this},d[this._instanceID]=e(d[this._instanceID],a),d[this._instanceID].init(),this}var b=0,c=function(){return++b},d=[],e=function(a,b){for(var c in b)b[c]&&b[c].constructor&&b[c].constructor===Object?(a[c]=a[c]||{},arguments.callee(a[c],b[c])):a[c]=b[c];return a};return a.prototype={_init:function(){this._var().init()},_showdata:function(){return JSON.stringify(d[this._instanceID])},_id:function(){return this._instanceID},_var:function(a){return void 0!=a&&(d[this._instanceID]=e(d[this._instanceID],a)),d[this._instanceID]},_nocache:function(a){if("string"==typeof a){if(this._var().usenocache){var b="?";return-1!=a.indexOf("?")&&(b="&"),a+b+"nocache="+Math.floor(9999*Math.random())}return a}return void this.notify("Alert","_nocache needs a string!")},notify:function(a,b){_notify.broadcast(a,[{senderID:this._id(),sendertype:this._var().type,notifyscope:this._var().notifyscope,data:b}])},deepExtend:function(a,b){return e(a,b)},parent:this},a}),define("js_src/modules/base/extendedmodule",["js_src/modules/base/standardmodule"],function(a){function b(b){var c={type:"extendedmodule",author:"Jonathan Robles",lasteditby:""};return c=this.deepExtend(c,b),a.call(this,c),this}return b.prototype=Object.create(a.prototype),b.prototype._startlisteners=function(){},b.prototype.init=function(){this.notify("Trace","init"),this._startlisteners(),this.refresh()},b.prototype.refresh=function(){this.notify("Trace","refresh")},b.prototype.kill=function(){this.notify("Trace","kill"),_notify.rem(this._id())},b.prototype.sayhi=function(){this.notify("Trace","hi there, from object#"+this._id()+" [ "+this._var().type+" by "+this._var().author+" ] ")},b}),require(["js_src/modules/base/extendedmodule"],function(a){window.myProject=new a({}),window.myProject.init()}),define("projects/project_boilerplate/js_src/project.js",function(){});