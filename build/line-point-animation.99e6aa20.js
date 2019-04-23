parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"oYRA":[function(require,module,exports) {
"use strict";function r(r){var e="function"==typeof Symbol&&r[Symbol.iterator],t=0;return e?e.call(r):{next:function(){return r&&t>=r.length&&(r=void 0),{value:r&&r[t++],done:!r}}}}function e(r,e){var t="function"==typeof Symbol&&r[Symbol.iterator];if(!t)return r;var n,o,i=t.call(r),a=[];try{for(;(void 0===e||e-- >0)&&!(n=i.next()).done;)a.push(n.value)}catch(c){o={error:c}}finally{try{n&&!n.done&&(t=i.return)&&t.call(i)}finally{if(o)throw o.error}}return a}function t(){for(var r=[],t=0;t<arguments.length;t++)r=r.concat(e(arguments[t]));return r}function n(r){var e=Object.prototype.toString.call(r).split(" ")[1];return e.slice(0,e.length-1).toLowerCase()}function o(r){return r.trim().split(" ").filter(function(r){return""!==r})}function i(r){var e=n(r);return"array"===e?r.every(function(r){return r instanceof Element}):"nodelist"===e||"htmlcollection"===e}function a(r){var e;if(r.includes("-=")){var t=r.indexOf("-=");e=[r.slice(0,t).trim(),r.slice(t+2).trim(),"-="]}else if(r.includes("+=")){t=r.indexOf("+=");e=[r.slice(0,t).trim(),r.slice(t+2).trim(),"+="]}else if(r.includes("=")){t=r.indexOf("=");e=[r.slice(0,t).trim(),r.slice(t+1).trim(),"="]}if(3!==e.length)throw new Error("options item not match key=val or key-=val or key+=val");return e}function c(r){var e=[];return Object.entries(r).map(function(r){r[0].endsWith("-")?e.push([r[0].slice(0,r[0].length-1),r[1],"-="]):r[0].endsWith("+")?e.push([r[0].slice(0,r[0].length-1),r[1],"+="]):e.push([r[0],r[1],"="])}),e}function l(e){var o,i,l=[];try{for(var u=r(e),s=u.next();!s.done;s=u.next()){var f=s.value;"string"==n(f)?l.push(a(f)):"object"==n(f)&&l.push.apply(l,t(c(f)))}}catch(d){o={error:d}}finally{try{s&&!s.done&&(i=u.return)&&i.call(u)}finally{if(o)throw o.error}}return l}function u(r,e){var t=n(r),o=n(e);if("object"!==t||"object"!==o)throw new TypeError("target and source should both be object, received: target is "+t+", source is "+o);for(var i in e)if(e.hasOwnProperty(i)&&i in r){var a="object"==n(r[i]),c="object"==n(e[i]);c||a?a&&c&&u(r[i],e[i]):r[i]=e[i]}}Object.defineProperty(exports,"__esModule",{value:!0}),exports.cdom=h,exports.ddom=S,exports.getCrudConfig=p,exports.rdom=b,exports.rdoms=x,exports.udom=w,exports.updateCrudConfig=g;var s={doms:{"+=":{beforeScript:!1}},debug:!1},f={};function d(){f.log=function(){},f.warn=function(){},f.error=function(){}}function y(){f.log=function(r,e){console.log("%c[dom-crud:log][%s]\n %c%s","color:#18b7ff;background:rgba(0,0,0,0.02);padding:0.2rem",r,"background:rgba(0,0,0,0.02);padding:0.2rem",e)},f.warn=function(r,e){console.log("%c[dom-crud:warn][%s]\n %c%s","color:orange;background:rgba(0,0,0,0.02);padding:0.2rem",r,"background:rgba(0,0,0,0.02);padding:0.2rem",e)},f.error=function(r,e){console.log("%c[dom-crud:error][%s]\n %c%s","color:red;background:rgba(0,0,0,0.02);padding:0.2rem",r,"background:rgba(0,0,0,0.02);padding:0.2rem",e)}}var m=new Proxy(s,{set:function(r,e,t){return"debug"==e&&(0==t?d():y()),r[e]=t,!0}});function p(){return JSON.parse(JSON.stringify(m))}function g(r){var e=n(r);if("object"!==e)throw new TypeError("config should be an object, received type is "+e);u(m,r)}function v(r){if(r in s&&s.hasOwnProperty(r))return s[r];throw new Error(r+" not exists in global curd config")}function h(r){for(var n=[],i=1;i<arguments.length;i++)n[i-1]=arguments[i];var a=document.createElement(r);return l(n).map(function(r){var n,i=e(r,2),c=i[0],l=i[1];switch(c){case"class":(n=a.classList).add.apply(n,t(o(l.toString())));break;case"style":a.style.cssText=l.toString();break;case"text":a.textContent=l.toString();break;case"html":a.innerHTML+=l.toString();break;case"doms":k(a,l);break;default:a.setAttribute(c,l.toString())}}),a}function b(r){var e=document.querySelector(r);return e?(e.rdom=e.querySelector,e):null}function x(r){return document.querySelectorAll(r)}function w(r){for(var n=[],i=1;i<arguments.length;i++)n[i-1]=arguments[i];return l(n).map(function(n){var i=e(n,3),a=i[0],c=i[1],l=i[2];switch(a){case"class":T(l,function(){var e;r.className="",(e=r.classList).add.apply(e,t(o(c.toString())))},function(){var e;(e=r.classList).add.apply(e,t(o(c.toString())))},function(){var e;(e=r.classList).remove.apply(e,t(o(c.toString())))});break;case"style":T(l,function(){r.style.cssText=c.toString()},function(){r.style.cssText+=c.toString()},function(){c.toString().split(";").map(function(e){r.style.removeProperty(e)})});break;case"text":T(l,function(){r.textContent=c.toString()},function(){r.textContent+=c.toString()},function(){r.textContent=""});break;case"html":T(l,function(){r.innerHTML=c.toString()},function(){r.innerHTML+=c.toString()},function(){r.innerHTML=""});break;case"doms":T(l,function(){r.innerHTML="",k(r,c)},function(){v("doms")["+="].beforeScript?k(r,c,"script"):k(r,c)},function(){L(r,c)});break;default:T(l,function(){r.setAttribute(a,c.toString())},function(){r.setAttribute(a,c.toString())},function(){r.removeAttribute(a)})}}),r}function S(r){return r instanceof Element?(r.remove(),!0):(f.warn("ddom","you passed an invalid parameter(type is "+n(r)+"), ddom removed nothing"),!1)}function k(e,t,n){var o,a,c,l,u,s;if(void 0===n&&(n=""),!i(t))throw new TypeError("when key is 'doms', value should be array/array-like and from one of Element[], HTMLCollection, NodeList");if(n&&"script"===n){var f=e.querySelector("script");try{for(var d=r(t),y=d.next();!y.done;y=d.next()){var m=y.value;e.insertBefore(m,f)}}catch(b){o={error:b}}finally{try{y&&!y.done&&(a=d.return)&&a.call(d)}finally{if(o)throw o.error}}}else if(n&&n instanceof Element)try{for(var p=r(t),g=p.next();!g.done;g=p.next()){m=g.value;e.insertBefore(m,n)}}catch(x){c={error:x}}finally{try{g&&!g.done&&(l=p.return)&&l.call(p)}finally{if(c)throw c.error}}else try{for(var v=r(t),h=v.next();!h.done;h=v.next()){m=h.value;e.appendChild(m)}}catch(w){u={error:w}}finally{try{h&&!h.done&&(s=v.return)&&s.call(v)}finally{if(u)throw u.error}}}function L(e,t){var n,o;if(!i(t))throw new TypeError("when key is 'doms', value should be array/array-like and from one of Element[], HTMLCollection, NodeList");try{for(var a=r(t),c=a.next();!c.done;c=a.next()){var l=c.value;l.parentNode==e?l.remove():f.warn("_removeDoms","encountered a dom that is not a child dom, removing skipped")}}catch(u){n={error:u}}finally{try{c&&!c.done&&(o=a.return)&&o.call(a)}finally{if(n)throw n.error}}}function T(r,e,t,n){"="==r&&e(),"+="==r&&t(),"-="==r&&n()}d();
},{}],"oSoJ":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=require("dom-crud"),i=function(){function t(t){var i=t.canvas,s=t.x,h=t.y;this.fillColor="rgb(211,211,211)",this.x=s,this.y=h,this.canvas=i,this.ctx=i.getContext("2d"),this.ctx.fillStyle=this.fillColor,this.radius=r(1,4),this.dx=r(-.01,.01),this.dy=r(-.01,.01)}return t.prototype.draw=function(){this.ctx.fillStyle=this.fillColor,this.ctx.beginPath(),this.ctx.arc(this.x,this.y,this.radius,0,2*Math.PI),this.ctx.fill(),this.ctx.closePath()},t.prototype.animate=function(){this.x=this.x+this.dx,this.y=this.y+this.dy,(this.x+this.radius>=this.canvas.width||this.x+this.radius<=0)&&(this.dx=-this.dx),(this.y+this.radius>=this.canvas.height||this.y+this.radius<=0)&&(this.dy=-this.dy)},t.prototype.update=function(t,i){this.x=t,this.y=i},t.prototype.connect=function(i){var s=Math.sqrt(Math.pow(this.x-i.x,2)+Math.pow(this.y-i.y,2));s<=t.lineThreshold&&(this.ctx.beginPath(),this.ctx.strokeStyle="rgba(211,211,211, "+(1-s/t.lineThreshold)+")",this.ctx.moveTo(this.x,this.y),this.ctx.lineTo(i.x,i.y),this.ctx.stroke(),this.ctx.closePath())},t.lineThreshold=131,t}(),s=t.rdom("canvas"),h=s.getContext("2d"),e=new i({canvas:s,x:-100,y:-100});s.addEventListener("mousemove",function(t){e.update(t.offsetX,t.offsetY)}),s.addEventListener("mouseleave",function(t){e.update(-100,-100)});var n=new Array(20).fill(0).map(function(t){return new i({canvas:s,x:r(10,380),y:r(10,380),radius:r(3,8)})});function a(){h.clearRect(0,0,400,400),e.draw(),n.map(function(t){t.draw(),t!==e&&t.animate()});for(var t=0;t<n.length-1;t++)for(var i=n[t],s=t+1;s<n.length;s++){var r=n[s];i.connect(r)}requestAnimationFrame(a)}function r(t,i){return Math.random()*(i-t+1)+t}n.push(e),a();
},{"dom-crud":"oYRA"}]},{},["oSoJ"], null)