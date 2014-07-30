/** @namespace */
var ozpIwc=ozpIwc || {};


/**
 * A deferred action, but not in the sense of the Javascript standard.
 * @class
 */
ozpIwc.AsyncAction=function() {
	this.callbacks={};
};

ozpIwc.AsyncAction.prototype.when=function(state,callback,self) {
    self=self || this;
	
	if(this.resolution === state) {
		callback.apply(self,this.value);
	} else {
		this.callbacks[state]=function() { return callback.apply(self,arguments); };
	}
	return this;
};


ozpIwc.AsyncAction.prototype.resolve=function(status) {
	if(this.resolution) {
		throw "Cannot resolve an already resolved AsyncAction";
	}
	var callback=this.callbacks[status];
	this.resolution=status;
	this.value=Array.prototype.slice.call(arguments,1);
	
	if(callback) {
		callback.apply(this,this.value);
	}
	return this;
};

ozpIwc.AsyncAction.prototype.success=function(callback,self) {
	return this.when("success",callback,self);
};

ozpIwc.AsyncAction.prototype.failure=function(callback,self) {
	return this.when("failure",callback,self);
};
/*!
 * https://github.com/es-shims/es5-shim
 * @license es5-shim Copyright 2009-2014 by contributors, MIT License
 * see https://github.com/es-shims/es5-shim/blob/master/LICENSE
 */
(function(e){if(typeof define==="function"){define(e)}else if(typeof YUI==="function"){YUI.add("es5-sham",e)}else{e()}})(function(){var e=Function.prototype.call;var t=Object.prototype;var r=e.bind(t.hasOwnProperty);var n;var o;var i;var c;var f;if(f=r(t,"__defineGetter__")){n=e.bind(t.__defineGetter__);o=e.bind(t.__defineSetter__);i=e.bind(t.__lookupGetter__);c=e.bind(t.__lookupSetter__)}if(!Object.getPrototypeOf){Object.getPrototypeOf=function g(e){var r=e.__proto__;if(r||r===null){return r}else if(e.constructor){return e.constructor.prototype}else{return t}}}function u(e){try{e.sentinel=0;return Object.getOwnPropertyDescriptor(e,"sentinel").value===0}catch(t){}}if(Object.defineProperty){var p=u({});var a=typeof document==="undefined"||u(document.createElement("div"));if(!a||!p){var l=Object.getOwnPropertyDescriptor}}if(!Object.getOwnPropertyDescriptor||l){var b="Object.getOwnPropertyDescriptor called on a non-object: ";Object.getOwnPropertyDescriptor=function E(e,n){if(typeof e!=="object"&&typeof e!=="function"||e===null){throw new TypeError(b+e)}if(l){try{return l.call(Object,e,n)}catch(o){}}if(!r(e,n)){return}var u={enumerable:true,configurable:true};if(f){var p=e.__proto__;var a=e!==t;if(a){e.__proto__=t}var _=i(e,n);var s=c(e,n);if(a){e.__proto__=p}if(_||s){if(_){u.get=_}if(s){u.set=s}return u}}u.value=e[n];u.writable=true;return u}}if(!Object.getOwnPropertyNames){Object.getOwnPropertyNames=function z(e){return Object.keys(e)}}if(!Object.create){var _;var s=!({__proto__:null}instanceof Object);if(s||typeof document==="undefined"){_=function(){return{__proto__:null}}}else{_=function(){var e=document.createElement("iframe");var t=document.body||document.documentElement;e.style.display="none";t.appendChild(e);e.src="javascript:";var r=e.contentWindow.Object.prototype;t.removeChild(e);e=null;delete r.constructor;delete r.hasOwnProperty;delete r.propertyIsEnumerable;delete r.isPrototypeOf;delete r.toLocaleString;delete r.toString;delete r.valueOf;r.__proto__=null;function n(){}n.prototype=r;_=function(){return new n};return new n}}Object.create=function S(e,t){var r;function n(){}if(e===null){r=_()}else{if(typeof e!=="object"&&typeof e!=="function"){throw new TypeError("Object prototype may only be an Object or null")}n.prototype=e;r=new n;r.__proto__=e}if(t!==void 0){Object.defineProperties(r,t)}return r}}function d(e){try{Object.defineProperty(e,"sentinel",{});return"sentinel"in e}catch(t){}}if(Object.defineProperty){var y=d({});var O=typeof document==="undefined"||d(document.createElement("div"));if(!y||!O){var j=Object.defineProperty,v=Object.defineProperties}}if(!Object.defineProperty||j){var w="Property description must be an object: ";var P="Object.defineProperty called on non-object: ";var m="getters & setters can not be defined "+"on this javascript engine";Object.defineProperty=function T(e,u,p){if(typeof e!=="object"&&typeof e!=="function"||e===null){throw new TypeError(P+e)}if(typeof p!=="object"&&typeof p!=="function"||p===null){throw new TypeError(w+p)}if(j){try{return j.call(Object,e,u,p)}catch(a){}}if(r(p,"value")){if(f&&(i(e,u)||c(e,u))){var l=e.__proto__;e.__proto__=t;delete e[u];e[u]=p.value;e.__proto__=l}else{e[u]=p.value}}else{if(!f){throw new TypeError(m)}if(r(p,"get")){n(e,u,p.get)}if(r(p,"set")){o(e,u,p.set)}}return e}}if(!Object.defineProperties||v){Object.defineProperties=function D(e,t){if(v){try{return v.call(Object,e,t)}catch(n){}}for(var o in t){if(r(t,o)&&o!=="__proto__"){Object.defineProperty(e,o,t[o])}}return e}}if(!Object.seal){Object.seal=function x(e){return e}}if(!Object.freeze){Object.freeze=function k(e){return e}}try{Object.freeze(function(){})}catch(h){Object.freeze=function F(e){return function t(r){if(typeof r==="function"){return r}else{return e(r)}}}(Object.freeze)}if(!Object.preventExtensions){Object.preventExtensions=function G(e){return e}}if(!Object.isSealed){Object.isSealed=function I(e){return false}}if(!Object.isFrozen){Object.isFrozen=function C(e){return false}}if(!Object.isExtensible){Object.isExtensible=function N(e){if(Object(e)!==e){throw new TypeError}var t="";while(r(e,t)){t+="?"}e[t]=true;var n=r(e,t);delete e[t];return n}}});
//# sourceMappingURL=es5-sham.map
/*!
 * https://github.com/es-shims/es5-shim
 * @license es5-shim Copyright 2009-2014 by contributors, MIT License
 * see https://github.com/es-shims/es5-shim/blob/master/LICENSE
 */
(function(t,r){if(typeof define==="function"&&define.amd){define(r)}else if(typeof exports==="object"){module.exports=r()}else{t.returnExports=r()}})(this,function(){var t=Function.prototype.call;var r=Array.prototype;var e=Object.prototype;var n=r.slice;var i=Array.prototype.splice;var o=Array.prototype.push;var a=Array.prototype.unshift;var l=e.toString;var u=function(t){return e.toString.call(t)==="[object Function]"};var p=function(t){return e.toString.call(t)==="[object RegExp]"};var s=function W(t){return l.call(t)==="[object Array]"};var f=function tr(t){var r=l.call(t);var e=r==="[object Arguments]";if(!e){e=!s(r)&&t!==null&&typeof t==="object"&&typeof t.length==="number"&&t.length>=0&&u(t.callee)}return e};function c(){}if(!Function.prototype.bind){Function.prototype.bind=function rr(t){var r=this;if(!u(r)){throw new TypeError("Function.prototype.bind called on incompatible "+r)}var e=n.call(arguments,1);var i=function(){if(this instanceof p){var i=r.apply(this,e.concat(n.call(arguments)));if(Object(i)===i){return i}return this}else{return r.apply(t,e.concat(n.call(arguments)))}};var o=Math.max(0,r.length-e.length);var a=[];for(var l=0;l<o;l++){a.push("$"+l)}var p=Function("binder","return function ("+a.join(",")+"){return binder.apply(this,arguments)}")(i);if(r.prototype){c.prototype=r.prototype;p.prototype=new c;c.prototype=null}return p}}var h=t.bind(e.hasOwnProperty);var y;var g;var v;var d;var b;if(b=h(e,"__defineGetter__")){y=t.bind(e.__defineGetter__);g=t.bind(e.__defineSetter__);v=t.bind(e.__lookupGetter__);d=t.bind(e.__lookupSetter__)}var m=function(){var t={};Array.prototype.splice.call(t,0,0,1);return t.length===1}();var w=[1].splice(0).length===0;var S=function(){var t=[1,2];var r=t.splice();return t.length===2&&s(r)&&r.length===0}();if(S){Array.prototype.splice=function er(t,r){if(arguments.length===0){return[]}else{return i.apply(this,arguments)}}}if(!w||!m){Array.prototype.splice=function nr(t,r){if(arguments.length===0){return[]}var e=arguments;this.length=Math.max(q(this.length),0);if(arguments.length>0&&typeof r!=="number"){e=n.call(arguments);if(e.length<2){e.push(q(r))}else{e[1]=q(r)}}return i.apply(this,e)}}if([].unshift(0)!==1){Array.prototype.unshift=function(){a.apply(this,arguments);return this.length}}if(!Array.isArray){Array.isArray=s}var x=Object("a");var A=x[0]!=="a"||!(0 in x);var j=function ir(t){var r=true;var e=true;if(t){t.call("foo",function(t,e,n){if(typeof n!=="object"){r=false}});t.call([1],function(){"use strict";e=typeof this==="string"},"x")}return!!t&&r&&e};if(!Array.prototype.forEach||!j(Array.prototype.forEach)){Array.prototype.forEach=function or(t){var r=Q(this),e=A&&l.call(this)==="[object String]"?this.split(""):r,n=arguments[1],i=-1,o=e.length>>>0;if(!u(t)){throw new TypeError}while(++i<o){if(i in e){t.call(n,e[i],i,r)}}}}if(!Array.prototype.map||!j(Array.prototype.map)){Array.prototype.map=function ar(t){var r=Q(this),e=A&&l.call(this)==="[object String]"?this.split(""):r,n=e.length>>>0,i=Array(n),o=arguments[1];if(!u(t)){throw new TypeError(t+" is not a function")}for(var a=0;a<n;a++){if(a in e){i[a]=t.call(o,e[a],a,r)}}return i}}if(!Array.prototype.filter||!j(Array.prototype.filter)){Array.prototype.filter=function lr(t){var r=Q(this),e=A&&l.call(this)==="[object String]"?this.split(""):r,n=e.length>>>0,i=[],o,a=arguments[1];if(!u(t)){throw new TypeError(t+" is not a function")}for(var p=0;p<n;p++){if(p in e){o=e[p];if(t.call(a,o,p,r)){i.push(o)}}}return i}}if(!Array.prototype.every||!j(Array.prototype.every)){Array.prototype.every=function ur(t){var r=Q(this),e=A&&l.call(this)==="[object String]"?this.split(""):r,n=e.length>>>0,i=arguments[1];if(!u(t)){throw new TypeError(t+" is not a function")}for(var o=0;o<n;o++){if(o in e&&!t.call(i,e[o],o,r)){return false}}return true}}if(!Array.prototype.some||!j(Array.prototype.some)){Array.prototype.some=function pr(t){var r=Q(this),e=A&&l.call(this)==="[object String]"?this.split(""):r,n=e.length>>>0,i=arguments[1];if(!u(t)){throw new TypeError(t+" is not a function")}for(var o=0;o<n;o++){if(o in e&&t.call(i,e[o],o,r)){return true}}return false}}var O=false;if(Array.prototype.reduce){O=typeof Array.prototype.reduce.call("es5",function(t,r,e,n){return n})==="object"}if(!Array.prototype.reduce||!O){Array.prototype.reduce=function sr(t){var r=Q(this),e=A&&l.call(this)==="[object String]"?this.split(""):r,n=e.length>>>0;if(!u(t)){throw new TypeError(t+" is not a function")}if(!n&&arguments.length===1){throw new TypeError("reduce of empty array with no initial value")}var i=0;var o;if(arguments.length>=2){o=arguments[1]}else{do{if(i in e){o=e[i++];break}if(++i>=n){throw new TypeError("reduce of empty array with no initial value")}}while(true)}for(;i<n;i++){if(i in e){o=t.call(void 0,o,e[i],i,r)}}return o}}var E=false;if(Array.prototype.reduceRight){E=typeof Array.prototype.reduceRight.call("es5",function(t,r,e,n){return n})==="object"}if(!Array.prototype.reduceRight||!E){Array.prototype.reduceRight=function fr(t){var r=Q(this),e=A&&l.call(this)==="[object String]"?this.split(""):r,n=e.length>>>0;if(!u(t)){throw new TypeError(t+" is not a function")}if(!n&&arguments.length===1){throw new TypeError("reduceRight of empty array with no initial value")}var i,o=n-1;if(arguments.length>=2){i=arguments[1]}else{do{if(o in e){i=e[o--];break}if(--o<0){throw new TypeError("reduceRight of empty array with no initial value")}}while(true)}if(o<0){return i}do{if(o in e){i=t.call(void 0,i,e[o],o,r)}}while(o--);return i}}if(!Array.prototype.indexOf||[0,1].indexOf(1,2)!==-1){Array.prototype.indexOf=function cr(t){var r=A&&l.call(this)==="[object String]"?this.split(""):Q(this),e=r.length>>>0;if(!e){return-1}var n=0;if(arguments.length>1){n=q(arguments[1])}n=n>=0?n:Math.max(0,e+n);for(;n<e;n++){if(n in r&&r[n]===t){return n}}return-1}}if(!Array.prototype.lastIndexOf||[0,1].lastIndexOf(0,-3)!==-1){Array.prototype.lastIndexOf=function hr(t){var r=A&&l.call(this)==="[object String]"?this.split(""):Q(this),e=r.length>>>0;if(!e){return-1}var n=e-1;if(arguments.length>1){n=Math.min(n,q(arguments[1]))}n=n>=0?n:e-Math.abs(n);for(;n>=0;n--){if(n in r&&t===r[n]){return n}}return-1}}var N=Object.keys&&function(){return Object.keys(arguments).length===2}(1,2);if(!Object.keys){var T=!{toString:null}.propertyIsEnumerable("toString"),I=function(){}.propertyIsEnumerable("prototype"),D=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"],_=D.length;Object.keys=function yr(t){var r=u(t),e=f(t),n=t!==null&&typeof t==="object",i=n&&l.call(t)==="[object String]";if(!n&&!r&&!e){throw new TypeError("Object.keys called on a non-object")}var o=[];var a=I&&r;if(i||e){for(var p=0;p<t.length;++p){o.push(String(p))}}else{for(var s in t){if(!(a&&s==="prototype")&&h(t,s)){o.push(String(s))}}}if(T){var c=t.constructor,y=c&&c.prototype===t;for(var g=0;g<_;g++){var v=D[g];if(!(y&&v==="constructor")&&h(t,v)){o.push(v)}}}return o}}else if(!N){var M=Object.keys;Object.keys=function gr(t){if(f(t)){return M(Array.prototype.slice.call(t))}else{return M(t)}}}var F=-621987552e5,R="-000001";if(!Date.prototype.toISOString||new Date(F).toISOString().indexOf(R)===-1){Date.prototype.toISOString=function vr(){var t,r,e,n,i;if(!isFinite(this)){throw new RangeError("Date.prototype.toISOString called on non-finite value.")}n=this.getUTCFullYear();i=this.getUTCMonth();n+=Math.floor(i/12);i=(i%12+12)%12;t=[i+1,this.getUTCDate(),this.getUTCHours(),this.getUTCMinutes(),this.getUTCSeconds()];n=(n<0?"-":n>9999?"+":"")+("00000"+Math.abs(n)).slice(0<=n&&n<=9999?-4:-6);r=t.length;while(r--){e=t[r];if(e<10){t[r]="0"+e}}return n+"-"+t.slice(0,2).join("-")+"T"+t.slice(2).join(":")+"."+("000"+this.getUTCMilliseconds()).slice(-3)+"Z"}}var k=false;try{k=Date.prototype.toJSON&&new Date(NaN).toJSON()===null&&new Date(F).toJSON().indexOf(R)!==-1&&Date.prototype.toJSON.call({toISOString:function(){return true}})}catch(C){}if(!k){Date.prototype.toJSON=function dr(t){var r=Object(this),e=K(r),n;if(typeof e==="number"&&!isFinite(e)){return null}n=r.toISOString;if(typeof n!=="function"){throw new TypeError("toISOString property is not callable")}return n.call(r)}}var U=Date.parse("+033658-09-27T01:46:40.000Z")===1e15;var Z=!isNaN(Date.parse("2012-04-04T24:00:00.500Z"))||!isNaN(Date.parse("2012-11-31T23:59:59.000Z"));var J=isNaN(Date.parse("2000-01-01T00:00:00.000Z"));if(!Date.parse||J||Z||!U){Date=function(t){function r(e,n,i,o,a,l,u){var p=arguments.length;if(this instanceof t){var s=p===1&&String(e)===e?new t(r.parse(e)):p>=7?new t(e,n,i,o,a,l,u):p>=6?new t(e,n,i,o,a,l):p>=5?new t(e,n,i,o,a):p>=4?new t(e,n,i,o):p>=3?new t(e,n,i):p>=2?new t(e,n):p>=1?new t(e):new t;s.constructor=r;return s}return t.apply(this,arguments)}var e=new RegExp("^"+"(\\d{4}|[+-]\\d{6})"+"(?:-(\\d{2})"+"(?:-(\\d{2})"+"(?:"+"T(\\d{2})"+":(\\d{2})"+"(?:"+":(\\d{2})"+"(?:(\\.\\d{1,}))?"+")?"+"("+"Z|"+"(?:"+"([-+])"+"(\\d{2})"+":(\\d{2})"+")"+")?)?)?)?"+"$");var n=[0,31,59,90,120,151,181,212,243,273,304,334,365];function i(t,r){var e=r>1?1:0;return n[r]+Math.floor((t-1969+e)/4)-Math.floor((t-1901+e)/100)+Math.floor((t-1601+e)/400)+365*(t-1970)}function o(r){return Number(new t(1970,0,1,0,0,0,r))}for(var a in t){r[a]=t[a]}r.now=t.now;r.UTC=t.UTC;r.prototype=t.prototype;r.prototype.constructor=r;r.parse=function l(r){var n=e.exec(r);if(n){var a=Number(n[1]),l=Number(n[2]||1)-1,u=Number(n[3]||1)-1,p=Number(n[4]||0),s=Number(n[5]||0),f=Number(n[6]||0),c=Math.floor(Number(n[7]||0)*1e3),h=Boolean(n[4]&&!n[8]),y=n[9]==="-"?1:-1,g=Number(n[10]||0),v=Number(n[11]||0),d;if(p<(s>0||f>0||c>0?24:25)&&s<60&&f<60&&c<1e3&&l>-1&&l<12&&g<24&&v<60&&u>-1&&u<i(a,l+1)-i(a,l)){d=((i(a,l)+u)*24+p+g*y)*60;d=((d+s+v*y)*60+f)*1e3+c;if(h){d=o(d)}if(-864e13<=d&&d<=864e13){return d}}return NaN}return t.parse.apply(this,arguments)};return r}(Date)}if(!Date.now){Date.now=function br(){return(new Date).getTime()}}if(!Number.prototype.toFixed||8e-5.toFixed(3)!=="0.000"||.9.toFixed(0)==="0"||1.255.toFixed(2)!=="1.25"||0xde0b6b3a7640080.toFixed(0)!=="1000000000000000128"){(function(){var t,r,e,n;t=1e7;r=6;e=[0,0,0,0,0,0];function i(n,i){var o=-1;while(++o<r){i+=n*e[o];e[o]=i%t;i=Math.floor(i/t)}}function o(n){var i=r,o=0;while(--i>=0){o+=e[i];e[i]=Math.floor(o/n);o=o%n*t}}function a(){var t=r;var n="";while(--t>=0){if(n!==""||t===0||e[t]!==0){var i=String(e[t]);if(n===""){n=i}else{n+="0000000".slice(0,7-i.length)+i}}}return n}function l(t,r,e){return r===0?e:r%2===1?l(t,r-1,e*t):l(t*t,r/2,e)}function u(t){var r=0;while(t>=4096){r+=12;t/=4096}while(t>=2){r+=1;t/=2}return r}Number.prototype.toFixed=function p(t){var r,e,n,p,s,f,c,h;r=Number(t);r=r!==r?0:Math.floor(r);if(r<0||r>20){throw new RangeError("Number.toFixed called with invalid number of decimals")}e=Number(this);if(e!==e){return"NaN"}if(e<=-1e21||e>=1e21){return String(e)}n="";if(e<0){n="-";e=-e}p="0";if(e>1e-21){s=u(e*l(2,69,1))-69;f=s<0?e*l(2,-s,1):e/l(2,s,1);f*=4503599627370496;s=52-s;if(s>0){i(0,f);c=r;while(c>=7){i(1e7,0);c-=7}i(l(10,c,1),0);c=s-1;while(c>=23){o(1<<23);c-=23}o(1<<c);i(1,1);o(2);p=a()}else{i(0,f);i(1<<-s,0);p=a()+"0.00000000000000000000".slice(2,2+r)}}if(r>0){h=p.length;if(h<=r){p=n+"0.0000000000000000000".slice(0,r-h+2)+p}else{p=n+p.slice(0,h-r)+"."+p.slice(h-r)}}else{p=n+p}return p}})()}var $=String.prototype.split;if("ab".split(/(?:ab)*/).length!==2||".".split(/(.?)(.?)/).length!==4||"tesst".split(/(s)*/)[1]==="t"||"test".split(/(?:)/,-1).length!==4||"".split(/.?/).length||".".split(/()()/).length>1){(function(){var t=/()??/.exec("")[1]===void 0;String.prototype.split=function(r,e){var n=this;if(r===void 0&&e===0){return[]}if(l.call(r)!=="[object RegExp]"){return $.call(this,r,e)}var i=[],o=(r.ignoreCase?"i":"")+(r.multiline?"m":"")+(r.extended?"x":"")+(r.sticky?"y":""),a=0,u,p,s,f;r=new RegExp(r.source,o+"g");n+="";if(!t){u=new RegExp("^"+r.source+"$(?!\\s)",o)}e=e===void 0?-1>>>0:V(e);while(p=r.exec(n)){s=p.index+p[0].length;if(s>a){i.push(n.slice(a,p.index));if(!t&&p.length>1){p[0].replace(u,function(){for(var t=1;t<arguments.length-2;t++){if(arguments[t]===void 0){p[t]=void 0}}})}if(p.length>1&&p.index<n.length){Array.prototype.push.apply(i,p.slice(1))}f=p[0].length;a=s;if(i.length>=e){break}}if(r.lastIndex===p.index){r.lastIndex++}}if(a===n.length){if(f||!r.test("")){i.push("")}}else{i.push(n.slice(a))}return i.length>e?i.slice(0,e):i}})()}else if("0".split(void 0,0).length){String.prototype.split=function mr(t,r){if(t===void 0&&r===0){return[]}return $.call(this,t,r)}}var G=String.prototype.replace;var P=function(){var t=[];"x".replace(/x(.)?/g,function(r,e){t.push(e)});return t.length===1&&typeof t[0]==="undefined"}();if(!P){String.prototype.replace=function wr(t,r){var e=u(r);var n=p(t)&&/\)[*?]/.test(t.source);if(!e||!n){return G.call(this,t,r)}else{var i=function(e){var n=arguments.length;var i=t.lastIndex;t.lastIndex=0;var o=t.exec(e);t.lastIndex=i;o.push(arguments[n-2],arguments[n-1]);return r.apply(this,o)};return G.call(this,t,i)}}}if("".substr&&"0b".substr(-1)!=="b"){var B=String.prototype.substr;String.prototype.substr=function Sr(t,r){return B.call(this,t<0?(t=this.length+t)<0?0:t:t,r)}}var H="	\n\f\r \xa0\u1680\u180e\u2000\u2001\u2002\u2003"+"\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028"+"\u2029\ufeff";var L="\u200b";if(!String.prototype.trim||H.trim()||!L.trim()){H="["+H+"]";var X=new RegExp("^"+H+H+"*"),Y=new RegExp(H+H+"*$");String.prototype.trim=function xr(){if(this===void 0||this===null){throw new TypeError("can't convert "+this+" to object")}return String(this).replace(X,"").replace(Y,"")}}if(parseInt(H+"08")!==8||parseInt(H+"0x16")!==22){parseInt=function(t){var r=/^0[xX]/;return function e(n,i){n=String(n).trim();if(!Number(i)){i=r.test(n)?16:10}return t(n,i)}}(parseInt)}function q(t){t=+t;if(t!==t){t=0}else if(t!==0&&t!==1/0&&t!==-(1/0)){t=(t>0||-1)*Math.floor(Math.abs(t))}return t}function z(t){var r=typeof t;return t===null||r==="undefined"||r==="boolean"||r==="number"||r==="string"}function K(t){var r,e,n;if(z(t)){return t}e=t.valueOf;if(u(e)){r=e.call(t);if(z(r)){return r}}n=t.toString;if(u(n)){r=n.call(t);if(z(r)){return r}}throw new TypeError}var Q=function(t){if(t==null){throw new TypeError("can't convert "+t+" to object")}return Object(t)};var V=function Ar(t){return t>>>0}});
//# sourceMappingURL=es5-shim.map
/** @namespace */
var ozpIwc=ozpIwc || {};

/**
	* @class
	*/
ozpIwc.Event=function() {
	this.events={};
};

/**
 * Registers a handler for the the event.
 * @param {string} event The name of the event to trigger on
 * @param {function} callback Function to be invoked
 * @param {object} [self] Used as the this pointer when callback is invoked.
 * @returns {object} A handle that can be used to unregister the callback via [off()]{@link ozpIwc.Event#off}
 */
ozpIwc.Event.prototype.on=function(event,callback,self) {
	var wrapped=callback;
	if(self) {
		wrapped=function() {
			callback.apply(self,arguments);
		};
		wrapped.ozpIwcDelegateFor=callback;
	}
	this.events[event]=this.events[event]||[];
	this.events[event].push(wrapped);
	return wrapped;
};

/**
 * Unregisters an event handler previously registered.
 * @param {type} event
 * @param {type} callback
 */
ozpIwc.Event.prototype.off=function(event,callback) {
	this.events[event]=(this.events[event]||[]).filter( function(h) {
		return h!==callback && h.ozpIwcDelegateFor !== callback;
	});
};

/**
 * Fires an event that will be received by all handlers.
 * @param {string} eventName  - Name of the event
 * @param {object} event - Event object to pass to the handers.
 * @returns {object} The event after all handlers have processed it
 */
ozpIwc.Event.prototype.trigger=function(eventName,event) {
	event = event || new ozpIwc.CancelableEvent();
	var handlers=this.events[eventName] || [];

	handlers.forEach(function(h) {
		h(event);
	});
	return event;
};


/**
 * Adds an on() and off() function to the target that delegate to this object
 * @param {object} target Target to receive the on/off functions
 */
ozpIwc.Event.prototype.mixinOnOff=function(target) {
	var self=this;
	target.on=function() { return self.on.apply(self,arguments);};
	target.off=function() { return self.off.apply(self,arguments);};
};

/**
 * Convenient base for events that can be canceled.  Provides and manages
 * the properties canceled and cancelReason, as well as the member function
 * cancel().
 * @class
 * @param {object} data - Data that will be copied into the event
 */
ozpIwc.CancelableEvent=function(data) {
	data = data || {};
	for(var k in data) {
		this[k]=data[k];
	}
	this.canceled=false;
	this.cancelReason=null;
};

/**
 * Marks the event as canceled.
 * @param {type} reason - A text description of why the event was canceled.
 * @returns {ozpIwc.CancelableEvent} Reference to self
 */
ozpIwc.CancelableEvent.prototype.cancel=function(reason) {
	reason= reason || "Unknown";
	this.canceled=true;
	this.cancelReason=reason;
	return this;
};

/** @namespace */
var ozpIwc=ozpIwc || {};

/**
 * @type {object}
 * @property {function} log - Normal log output.
 * @property {function} error - Error output.
 */
ozpIwc.log=ozpIwc.log || {
	log: function() {
		if(window.console && typeof(window.console.log)==="function") {
			window.console.log.apply(window.console,arguments);
		}
	},
	error: function() {
		if(window.console && typeof(window.console.error)==="function") {
			window.console.error.apply(window.console,arguments);
		}
	}
};

/** @namespace */
var ozpIwc=ozpIwc || {};

/** @namespace */
ozpIwc.util=ozpIwc.util || {};

/**
 * Generates a large hexidecimal string to serve as a unique ID.  Not a guid.
 * @returns {String}
 */
ozpIwc.util.generateId=function() {
    return Math.floor(Math.random() * 0xffffffff).toString(16);
};

/**
 * Used to get the current epoch time.  Tests overrides this
 * to allow a fast-forward on time-based actions.
 * @returns {Number}
 */
ozpIwc.util.now=function() {
    return new Date().getTime();
};

/**
 * Create a class with the given parent in it's prototype chain.
 * @param {function} baseClass - the class being derived from
 * @param {function} newConstructor - the new base class
 * @returns {Function} newConstructor with an augmented prototype
 */
ozpIwc.util.extend=function(baseClass,newConstructor) {
    newConstructor.prototype = Object.create(baseClass.prototype);
    newConstructor.prototype.constructor = newConstructor;
    return newConstructor;
};

/**
 * Detect browser support for structured clones.
 * @returns {boolean} - true if structured clones are supported,
 * false otherwise
 */
ozpIwc.util.structuredCloneSupport=function() {
    if (ozpIwc.util.structuredCloneSupport.cache !== undefined) {
        return ozpIwc.util.structuredCloneSupport.cache;
    }
    var onlyStrings = false;
    //If the browser doesn't support structured clones, it will call toString() on the object passed to postMessage.
    //A bug in FF will cause File clone to fail (see https://bugzilla.mozilla.org/show_bug.cgi?id=722126)
    //We detect this using a test Blob
    try {
        window.postMessage({
            toString: function () {
                onlyStrings = true;
            },
            blob: new Blob()
        }, "*");
    } catch (e) {
        onlyStrings=true;
    }
    ozpIwc.util.structuredCloneSupport.cache=!onlyStrings;
    return ozpIwc.util.structuredCloneSupport.cache;
};

ozpIwc.util.structuredCloneSupport.cache=undefined;

/**
 * Does a deep clone of a serializable object.  Note that this will not
 * clone unserializable objects like DOM elements, Date, RegExp, etc.
 * @param {type} value - value to be cloned.
 * @returns {object} - a deep copy of the object
 */
ozpIwc.util.clone=function(value) {
	if(Array.isArray(value) || typeof(value) === 'object') {
		return JSON.parse(JSON.stringify(value));
	} else {
		return value;
	}
};


/**
 * Returns true if every needle is found in the haystack.
 * @param {array} haystack - The array to search.
 * @param {array} needles - All of the values to search.
 * @param {function} [equal] - What constitutes equality.  Defaults to a===b.
 * @returns {boolean}
 */
ozpIwc.util.arrayContainsAll=function(haystack,needles,equal) {
    equal=equal || function(a,b) { return a===b;};
    return needles.every(function(needle) { 
        return haystack.some(function(hay) { 
            return equal(hay,needle);
        });
    });
};


/**
 * Returns true if the value every attribute in needs is equal to 
 * value of the same attribute in haystack.
 * @param {array} haystack - The object that must contain all attributes and values.
 * @param {array} needles - The reference object for the attributes and values.
 * @param {function} [equal] - What constitutes equality.  Defaults to a===b.
 * @returns {boolean}
 */
ozpIwc.util.objectContainsAll=function(haystack,needles,equal) {
    equal=equal || function(a,b) { return a===b;};
    
    for(var attribute in needles) {
        if(!equal(haystack[attribute],needles[attribute])) {
            return false;
        }
    }
    return true;
};

ozpIwc.util.parseQueryParams=function(query) {
    query = query || window.location.search;
    var params={};
	var regex=/\??([^&=]+)=?([^&]*)/g;
	var match;
	while(match=regex.exec(query)) {
		params[match[1]]=decodeURIComponent(match[2]);
	}
    return params;
};
/*
 * The MIT License (MIT) Copyright (c) 2012 Mike Ihbe
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated 
 * documentation files (the "Software"), to deal in the Software without restriction, including without limitation 
 * the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
 * to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all copies or substantial 
 * portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO 
 * THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, 
 * TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

/*
 * Original code owned by Mike Ihbe.  Modifications licensed under same terms.
 */
var ozpIwc=ozpIwc || {};
ozpIwc.metricsStats=ozpIwc.metricsStats || {};

ozpIwc.metricsStats.DEFAULT_POOL_SIZE=1028;

ozpIwc.metricsStats.Sample = function(){
	this.clear();
};

ozpIwc.metricsStats.Sample.prototype.update = function(val){ 
	this.values.push(val); 
};

ozpIwc.metricsStats.Sample.prototype.clear = function(){ 
	this.values = []; 
	this.count = 0; 
};
ozpIwc.metricsStats.Sample.prototype.size = function(){ 
	return this.values.length;
};

ozpIwc.metricsStats.Sample.prototype.getValues = function(){ 
	return this.values; 
};


/**
 *  Take a uniform sample of size size for all values
 *  @class
 *  @param {Number} [size=ozpIwc.metricsStats.DEFAULT_POOL_SIZE] - The size of the sample pool.
 */
ozpIwc.metricsStats.UniformSample=ozpIwc.util.extend(ozpIwc.metricsStats.Sample,function(size) {
	ozpIwc.metricsStats.Sample.apply(this);
  this.limit = size || ozpIwc.metricsStats.DEFAULT_POOL_SIZE;
});

ozpIwc.metricsStats.UniformSample.prototype.update = function(val) {
  this.count++;
  if (this.size() < this.limit) {
    this.values.push(val);
  } else {
    var rand = parseInt(Math.random() * this.count);
    if (rand < this.limit) {
      this.values[rand] = val;
    }
  }
};

// From http://eloquentjavascript.net/appendix2.html, 
// licensed under CCv3.0: http://creativecommons.org/licenses/by/3.0/

var ozpIwc=ozpIwc || {};
ozpIwc.metricsStats=ozpIwc.metricsStats || {};
/**
 * This acts as a ordered binary heap for any serializeable JS object or collection of such objects 
 * <p>Borrowed from https://github.com/mikejihbe/metrics. Originally from from http://eloquentjavascript.net/appendix2.html
 * <p>Licenced under CCv3.0
 * @class
 * @param {type} scoreFunction
 * @returns {BinaryHeap}
 */
ozpIwc.metricsStats.BinaryHeap = function BinaryHeap(scoreFunction){
  this.content = [];
  this.scoreFunction = scoreFunction;
};

ozpIwc.metricsStats.BinaryHeap.prototype = {

  clone: function() {
    var heap = new ozpIwc.metricsStats.BinaryHeap(this.scoreFunction);
    // A little hacky, but effective.
    heap.content = JSON.parse(JSON.stringify(this.content));
    return heap;
  },

  push: function(element) {
    // Add the new element to the end of the array.
    this.content.push(element);
    // Allow it to bubble up.
    this.bubbleUp(this.content.length - 1);
  },

  peek: function() {
    return this.content[0];
  },

  pop: function() {
    // Store the first element so we can return it later.
    var result = this.content[0];
    // Get the element at the end of the array.
    var end = this.content.pop();
    // If there are any elements left, put the end element at the
    // start, and let it sink down.
    if (this.content.length > 0) {
      this.content[0] = end;
      this.sinkDown(0);
    }
    return result;
  },

  remove: function(node) {
    var len = this.content.length;
    // To remove a value, we must search through the array to find
    // it.
    for (var i = 0; i < len; i++) {
      if (this.content[i] == node) {
        // When it is found, the process seen in 'pop' is repeated
        // to fill up the hole.
        var end = this.content.pop();
        if (i != len - 1) {
          this.content[i] = end;
          if (this.scoreFunction(end) < this.scoreFunction(node))
            this.bubbleUp(i);
          else
            this.sinkDown(i);
        }
        return true;
      }
    }
    throw new Error("Node not found.");
  },

  size: function() {
    return this.content.length;
  },

  bubbleUp: function(n) {
    // Fetch the element that has to be moved.
    var element = this.content[n];
    // When at 0, an element can not go up any further.
    while (n > 0) {
      // Compute the parent element's index, and fetch it.
      var parentN = Math.floor((n + 1) / 2) - 1,
          parent = this.content[parentN];
      // Swap the elements if the parent is greater.
      if (this.scoreFunction(element) < this.scoreFunction(parent)) {
        this.content[parentN] = element;
        this.content[n] = parent;
        // Update 'n' to continue at the new position.
        n = parentN;
      }
      // Found a parent that is less, no need to move it further.
      else {
        break;
      }
    }
  },

  sinkDown: function(n) {
    // Look up the target element and its score.
    var length = this.content.length,
        element = this.content[n],
        elemScore = this.scoreFunction(element);

    while(true) {
      // Compute the indices of the child elements.
      var child2N = (n + 1) * 2, child1N = child2N - 1;
      // This is used to store the new position of the element,
      // if any.
      var swap = null;
      // If the first child exists (is inside the array)...
      if (child1N < length) {
        // Look it up and compute its score.
        var child1 = this.content[child1N],
            child1Score = this.scoreFunction(child1);
        // If the score is less than our element's, we need to swap.
        if (child1Score < elemScore)
          swap = child1N;
      }
      // Do the same checks for the other child.
      if (child2N < length) {
        var child2 = this.content[child2N],
            child2Score = this.scoreFunction(child2);
        if (child2Score < (swap == null ? elemScore : child1Score))
          swap = child2N;
      }

      // If the element needs to be moved, swap it, and continue.
      if (swap != null) {
        this.content[n] = this.content[swap];
        this.content[swap] = element;
        n = swap;
      }
      // Otherwise, we are done.
      else {
        break;
      }
    }
  }
};


/*
 * The MIT License (MIT) Copyright (c) 2012 Mike Ihbe
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated 
 * documentation files (the "Software"), to deal in the Software without restriction, including without limitation 
 * the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
 * to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all copies or substantial 
 * portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO 
 * THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, 
 * TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

/*
 * Original code owned by Mike Ihbe.  Modifications licensed under same terms.
 */
var ozpIwc=ozpIwc || {};
ozpIwc.metricsStats=ozpIwc.metricsStats || {};

//  Take an exponentially decaying sample of size size of all values
ozpIwc.metricsStats.DEFAULT_RESCALE_THRESHOLD = 60 * 60 * 1000; // 1 hour in milliseconds
ozpIwc.metricsStats.DEFAULT_DECAY_ALPHA=0.015;
/**
 * This acts as a ordered binary heap for any serializeable JS object or collection of such objects 
 * <p>Borrowed from https://github.com/mikejihbe/metrics. 
 * @class 
	*/
ozpIwc.metricsStats.ExponentiallyDecayingSample=ozpIwc.util.extend(ozpIwc.metricsStats.Sample,function(size, alpha) {
	ozpIwc.metricsStats.Sample.apply(this);
  this.limit = size || ozpIwc.metricsStats.DEFAULT_POOL_SIZE;
  this.alpha = alpha || ozpIwc.metricsStats.DEFAULT_DECAY_ALPHA;
	this.rescaleThreshold = ozpIwc.metricsStats.DEFAULT_RESCALE_THRESHOLD;
});

// This is a relatively expensive operation
ozpIwc.metricsStats.ExponentiallyDecayingSample.prototype.getValues = function() {
  var values = [];
  var heap = this.values.clone();
	var elt;
  while(elt = heap.pop()) {
    values.push(elt.val);
  }
  return values;
};

ozpIwc.metricsStats.ExponentiallyDecayingSample.prototype.size = function() {
  return this.values.size();
};

ozpIwc.metricsStats.ExponentiallyDecayingSample.prototype.newHeap = function() {
  return new ozpIwc.metricsStats.BinaryHeap(function(obj){return obj.priority;});
};

ozpIwc.metricsStats.ExponentiallyDecayingSample.prototype.now = function() {
  return ozpIwc.util.now();
};

ozpIwc.metricsStats.ExponentiallyDecayingSample.prototype.tick = function() {
  return this.now() / 1000;
};

ozpIwc.metricsStats.ExponentiallyDecayingSample.prototype.clear = function() {
  this.values = this.newHeap();
  this.count = 0;
  this.startTime = this.tick();
  this.nextScaleTime = this.now() + this.rescaleThreshold;
};

/*
* timestamp in milliseconds
*/
ozpIwc.metricsStats.ExponentiallyDecayingSample.prototype.update = function(val, timestamp) {
  // Convert timestamp to seconds
  if (timestamp == undefined) {
    timestamp = this.tick();
  } else {
    timestamp = timestamp / 1000;
  }
  var priority = this.weight(timestamp - this.startTime) / Math.random()
    , value = {val: val, priority: priority};
  if (this.count < this.limit) {
    this.count += 1;
    this.values.push(value);
  } else {
    var first = this.values.peek();
    if (first.priority < priority) {
      this.values.push(value);
      this.values.pop();
    }
  }

  if (this.now() > this.nextScaleTime) {
    this.rescale();
  }
};

ozpIwc.metricsStats.ExponentiallyDecayingSample.prototype.weight = function(time) {
  return Math.exp(this.alpha * time);
};

ozpIwc.metricsStats.ExponentiallyDecayingSample.prototype.rescale = function() {
  this.nextScaleTime = this.now() + this.rescaleThreshold;
  var oldContent = this.values.content
    , newContent = []
    , elt
    , oldStartTime = this.startTime;
  this.startTime = this.tick();
  // Downscale every priority by the same factor. Order is unaffected, which is why we're avoiding the cost of popping.
  for(var i = 0; i < oldContent.length; i++) {
    newContent.push({val: oldContent[i].val, priority: oldContent[i].priority * Math.exp(-this.alpha * (this.startTime - oldStartTime))});
  }
  this.values.content = newContent;
};

/*
 * The MIT License (MIT) Copyright (c) 2012 Mike Ihbe
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated 
 * documentation files (the "Software"), to deal in the Software without restriction, including without limitation 
 * the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
 * to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all copies or substantial 
 * portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO 
 * THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, 
 * TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

/*
 * Original code owned by Mike Ihbe.  Modifications licensed under same terms.
 */
var ozpIwc=ozpIwc || {};
ozpIwc.metricsStats=ozpIwc.metricsStats || {};

/*
 *  Exponentially weighted moving average.
 *  Args: 
 *  - alpha:
 *  - interval: time in milliseconds
 */

ozpIwc.metricsStats.M1_ALPHA = 1 - Math.exp(-5/60);
ozpIwc.metricsStats.M5_ALPHA = 1 - Math.exp(-5/60/5);
ozpIwc.metricsStats.M15_ALPHA = 1 - Math.exp(-5/60/15);

ozpIwc.metricsStats.ExponentiallyWeightedMovingAverage=function(alpha, interval) {
  this.alpha = alpha;
  this.interval = interval || 5000;
  this.currentRate = null;
  this.uncounted = 0;
	this.lastTick=ozpIwc.util.now();
};

ozpIwc.metricsStats.ExponentiallyWeightedMovingAverage.prototype.update = function(n) {
  this.uncounted += (n || 1);
	this.tick();
};

/*
 * Update our rate measurements every interval
 */
ozpIwc.metricsStats.ExponentiallyWeightedMovingAverage.prototype.tick = function() {
 	var now=ozpIwc.util.now();
	var age=now-this.lastTick;
	if(age > this.interval) {
		this.lastTick=now - (age % this.interval);
		var requiredTicks=Math.floor(age / this.interval);
		for(var i=0; i < requiredTicks; ++i) {
			var instantRate = this.uncounted / this.interval;
			this.uncounted = 0;
			if(this.currentRate!==null) {
				this.currentRate += this.alpha * (instantRate - this.currentRate);
			} else {
				this.currentRate = instantRate;
			}
		}
	}
};

/*
 * Return the rate per second
 */
ozpIwc.metricsStats.ExponentiallyWeightedMovingAverage.prototype.rate = function() {
  return this.currentRate * 1000;
};

var ozpIwc=ozpIwc || {};
ozpIwc.metricTypes=ozpIwc.metricTypes || {};

/**
 * @typedef {object} ozpIwc.MetricType 
 * @property {function} get - returns the current value of the metric
 */

ozpIwc.metricTypes.BaseMetric=function() {
	this.value=0;
};

ozpIwc.metricTypes.BaseMetric.prototype.get=function() { 
	return this.value; 
};

ozpIwc.metricTypes.BaseMetric.prototype.unit=function(val) { 
	if(val) {
		this.unit=val;
		return this;
	}
	return this.unit; 
};




/**
 * @class
 * @extends ozpIwc.MetricType
 * A counter running total that can be adjusted up or down.
 * Where a meter is set to a known value at each update, a
 * counter is incremented up or down by a known change.
 */
ozpIwc.metricTypes.Counter=ozpIwc.util.extend(ozpIwc.metricTypes.BaseMetric,function() {
	ozpIwc.metricTypes.BaseMetric.apply(this,arguments);
	this.value=0;
});

/**
 * @param {Number} [delta=1] - Increment by this value
 * @returns {Number} - Value of the counter after increment
 */
ozpIwc.metricTypes.Counter.prototype.inc=function(delta) { 
	return this.value+=(delta?delta:1);
};

/**
 * @param {Number} [delta=1] - Decrement by this value
 * @returns {Number} - Value of the counter after decrement
 */
ozpIwc.metricTypes.Counter.prototype.dec=function(delta) { 
	return this.value-=(delta?delta:1);
};

ozpIwc.metricTypes=ozpIwc.metricTypes || {};
/**
 * @callback ozpIwc.metricTypes.Gauge~gaugeCallback
 * @returns {ozpIwc.metricTypes.MetricsTree} 
 */

/**
 * @class
 * @extends ozpIwc.MetricType
 * A gauge is an externally defined set of metrics returned by a callback function
 * @param {ozpIwc.metricTypes.Gauge~gaugeCallback} metricsCallback
 */
ozpIwc.metricTypes.Gauge=function(metricsCallback) {
	this.callback=metricsCallback;
};
/**
 * Set the metrics callback for this gauge.
 * @param {ozpIwc.metricTypes.Gauge~gaugeCallback} metricsCallback
 * @returns {ozpIwc.metricTypes.Gauge} this
 */
ozpIwc.metricTypes.Gauge.prototype.set=function(metricsCallback) { 
	this.callback=metricsCallback;
	return this;
};
/**
 * Executes the callback and returns a metrics tree.
 * @returns {ozpIwc.metricTypes.MetricsTree}
 */
ozpIwc.metricTypes.Gauge.prototype.get=function() {
    if (this.callback) {
        return this.callback();
    }
    return undefined;
};

/**
 * @class
 * @extends ozpIwc.BaseMetric
 */
ozpIwc.metricTypes.Histogram=ozpIwc.util.extend(ozpIwc.metricTypes.BaseMetric,function() {
	ozpIwc.metricTypes.BaseMetric.apply(this,arguments);
	this.sample = new ozpIwc.metricsStats.ExponentiallyDecayingSample();
	this.clear();
});


ozpIwc.metricTypes.Histogram.prototype.clear=function() {
	this.sample.clear();
	this.min=this.max=null;
	this.varianceMean=0;
	this.varianceM2=0;
	this.sum=0;
	this.count=0;	
};

/**
 * @param {Number} [delta=1] - Increment by this value
 * @returns {Number} - Value of the counter after increment
 */
ozpIwc.metricTypes.Histogram.prototype.mark=function(val,timestamp) { 
	timestamp = timestamp || ozpIwc.util.now();
	
	this.sample.update(val,timestamp);
	
	this.max=(this.max===null?val:Math.max(this.max,val));
	this.min=(this.min===null?val:Math.min(this.min,val));
	this.sum+=val;
	this.count++;
	
	var delta=val - this.varianceMean;
	this.varianceMean += delta/this.count;
	this.varianceM2 += delta * (val - this.varianceMean);

	return this.count;
};

ozpIwc.metricTypes.Histogram.prototype.get=function() { 
	var values=this.sample.getValues().map(function(v){
		return parseFloat(v);
	}).sort(function(a,b) { 
		return a-b;
	});
	var percentile=function(p) {
		var pos=p *(values.length);
		if(pos >= values.length) {
			return values[values.length-1];
		}
		pos=Math.max(0,pos);
		pos=Math.min(pos,values.length+1);
		var lower = values[Math.floor(pos)-1];
		var upper = values[Math.floor(pos)];
		return lower+(pos-Math.floor(pos))*(upper-lower);
	};

	return {
		'percentile_10': percentile(0.10),
		'percentile_25': percentile(0.25),				
		'median': percentile(0.50),				
		'percentile_75': percentile(0.75),				
		'percentile_90': percentile(0.90),				
		'percentile_95': percentile(0.95),				
		'percentile_99': percentile(0.99),				
		'percentile_999': percentile(0.999),				
		'variance' : this.count < 1 ? null : this.varianceM2 / (this.count -1),
		'mean' : this.count === 0 ? null : this.varianceMean,
		'stdDev' : this.count < 1 ? null : Math.sqrt(this.varianceM2 / (this.count -1)),
		'count' : this.count,
		'sum' : this.sum,
		'max' : this.max,
		'min' : this.min
	};
};


/**
 * @class
 * @extends ozpIwc.BaseMetric
 */
ozpIwc.metricTypes.Meter=ozpIwc.util.extend(ozpIwc.metricTypes.BaseMetric,function() {
	ozpIwc.metricTypes.BaseMetric.apply(this,arguments);
	this.m1Rate= new ozpIwc.metricsStats.ExponentiallyWeightedMovingAverage(ozpIwc.metricsStats.M1_ALPHA);
	this.m5Rate= new ozpIwc.metricsStats.ExponentiallyWeightedMovingAverage(ozpIwc.metricsStats.M5_ALPHA);
	this.m15Rate= new ozpIwc.metricsStats.ExponentiallyWeightedMovingAverage(ozpIwc.metricsStats.M15_ALPHA);
	this.startTime=ozpIwc.util.now();
	this.value=0;
});

/**
 * @param {Number} [delta=1] - Increment by this value
 * @returns {Number} - Value of the counter after increment
 */
ozpIwc.metricTypes.Meter.prototype.mark=function(delta) { 
	delta=delta || 1;
	this.value+=delta;
	this.m1Rate.update(delta);
	this.m5Rate.update(delta);
	this.m15Rate.update(delta);
	
	return this.value;
};

ozpIwc.metricTypes.Meter.prototype.get=function() { 
	return {
		'rate_1m' : this.m1Rate.rate(),
		'rate_5m' : this.m5Rate.rate(),
		'rate_15m' : this.m15Rate.rate(),
		'rate_mean' : this.value / (ozpIwc.util.now() - this.startTime) * 1000,
		'count' : this.value
	};
};

ozpIwc.metricTypes.Meter.prototype.tick=function() { 
	this.m1Rate.tick();
	this.m5Rate.tick();
	this.m15Rate.tick();
};

ozpIwc.metricTypes.Timer=ozpIwc.util.extend(ozpIwc.metricTypes.BaseMetric,function() {
	ozpIwc.metricTypes.BaseMetric.apply(this,arguments);
	this.meter=new ozpIwc.metricTypes.Meter();
	this.histogram=new ozpIwc.metricTypes.Histogram();
});

ozpIwc.metricTypes.Timer.prototype.mark=function(val,time) {
	this.meter.mark();
	this.histogram.mark(val,time);
};

ozpIwc.metricTypes.Timer.prototype.start=function() {
	var self=this;
	var startTime=ozpIwc.util.now();
	return function() {
		var endTime=ozpIwc.util.now();
		self.mark(endTime-startTime,endTime);
	};
};

ozpIwc.metricTypes.Timer.prototype.time=function(callback) {
	var startTime=ozpIwc.util.now();
	try {
		callback();
	} finally {
		var endTime=ozpIwc.util.now();
		this.mark(endTime-startTime,endTime);
	}
};

ozpIwc.metricTypes.Timer.prototype.get=function() {
	var val=this.histogram.get();
	var meterMetrics=this.meter.get();
	for(var k in meterMetrics) {
		val[k]=meterMetrics[k];
	}
	return val;
};
var ozpIwc=ozpIwc || {};

/**
 * @class
 * A repository of metrics
 */
ozpIwc.MetricsRegistry=function() {
	this.metrics={};
    var self=this;
    this.gauge('registry.metrics').set(function() {
        return {'types':  Object.keys(self.metrics).length};
    });

};

/**
 * 
 * @private
 * @param {string} name - Name of the metric
 * @param {function} type - The constructor of the requested type for this metric.
 * @returns {MetricType} - Null if the metric already exists of a different type.  Otherwise a reference to the metric.
 */
ozpIwc.MetricsRegistry.prototype.findOrCreateMetric=function(name,type) {
	var m= this.metrics[name] = this.metrics[name] || new type();
	if(m instanceof type){
			return m;
	} else {
			return null;
	}			
};

/**
 * Joins the arguments together into a name.
 * @private
 * @param {string[]} args - Array or the argument-like "arguments" value.
 * @returns {string}
 */
ozpIwc.MetricsRegistry.prototype.makeName=function(args) {
	// slice is necessary because "arguments" isn't a real array, and it's what
	// is usually passed in, here.
	return Array.prototype.slice.call(args).join(".");
};

/**
 * @param {...string} name - components of the name
 * @returns {ozpIwc.metricTypes.Counter}
 */
ozpIwc.MetricsRegistry.prototype.counter=function(name) {
	return this.findOrCreateMetric(this.makeName(arguments),ozpIwc.metricTypes.Counter);
};

/**
 * @param {...string} name - components of the name
 * @returns {ozpIwc.metricTypes.Meter}
 */
ozpIwc.MetricsRegistry.prototype.meter=function(name) {
	return this.findOrCreateMetric(this.makeName(arguments),ozpIwc.metricTypes.Meter);
};

/**
 * @param {...string} name - components of the name
 * @returns {ozpIwc.metricTypes.Gauge}
 */
ozpIwc.MetricsRegistry.prototype.gauge=function(name) {
	return this.findOrCreateMetric(this.makeName(arguments),ozpIwc.metricTypes.Gauge);
};

/**
 * @param {...string} name - components of the name
 * @returns {ozpIwc.metricTypes.Gauge}
 */
ozpIwc.MetricsRegistry.prototype.histogram=function(name) {
	return this.findOrCreateMetric(this.makeName(arguments),ozpIwc.metricTypes.Histogram);
};

/**
 * @param {...string} name - components of the name
 * @returns {ozpIwc.metricTypes.Gauge}
 */
ozpIwc.MetricsRegistry.prototype.timer=function(name) {
	return this.findOrCreateMetric(this.makeName(arguments),ozpIwc.metricTypes.Timer);
};

/**
 * @param {...string} name - components of the name
 * @returns {ozpIwc.metricTypes.Gauge}
 */
ozpIwc.MetricsRegistry.prototype.register=function(name,metric) {
	this.metrics[this.makeName(name)]=metric;
	
	return metric;
};

/**
 * 
 * @returns {unresolved}
 */
ozpIwc.MetricsRegistry.prototype.toJson=function() {
	var rv={};
	for(var k in this.metrics) {
		var path=k.split(".");
		var pos=rv;
		while(path.length > 1) {
			var current=path.shift();
			pos = pos[current]=pos[current] || {};
		}
		pos[path[0]]=this.metrics[k].get();
	}
	return rv;
};

ozpIwc.metrics=new ozpIwc.MetricsRegistry();

/*! jQuery v2.1.0 | (c) 2005, 2014 jQuery Foundation, Inc. | jquery.org/license */
!function(a,b){"object"==typeof module&&"object"==typeof module.exports?module.exports=a.document?b(a,!0):function(a){if(!a.document)throw new Error("jQuery requires a window with a document");return b(a)}:b(a)}("undefined"!=typeof window?window:this,function(a,b){var c=[],d=c.slice,e=c.concat,f=c.push,g=c.indexOf,h={},i=h.toString,j=h.hasOwnProperty,k="".trim,l={},m=a.document,n="2.1.0",o=function(a,b){return new o.fn.init(a,b)},p=/^-ms-/,q=/-([\da-z])/gi,r=function(a,b){return b.toUpperCase()};o.fn=o.prototype={jquery:n,constructor:o,selector:"",length:0,toArray:function(){return d.call(this)},get:function(a){return null!=a?0>a?this[a+this.length]:this[a]:d.call(this)},pushStack:function(a){var b=o.merge(this.constructor(),a);return b.prevObject=this,b.context=this.context,b},each:function(a,b){return o.each(this,a,b)},map:function(a){return this.pushStack(o.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return this.pushStack(d.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(a){var b=this.length,c=+a+(0>a?b:0);return this.pushStack(c>=0&&b>c?[this[c]]:[])},end:function(){return this.prevObject||this.constructor(null)},push:f,sort:c.sort,splice:c.splice},o.extend=o.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=!1;for("boolean"==typeof g&&(j=g,g=arguments[h]||{},h++),"object"==typeof g||o.isFunction(g)||(g={}),h===i&&(g=this,h--);i>h;h++)if(null!=(a=arguments[h]))for(b in a)c=g[b],d=a[b],g!==d&&(j&&d&&(o.isPlainObject(d)||(e=o.isArray(d)))?(e?(e=!1,f=c&&o.isArray(c)?c:[]):f=c&&o.isPlainObject(c)?c:{},g[b]=o.extend(j,f,d)):void 0!==d&&(g[b]=d));return g},o.extend({expando:"jQuery"+(n+Math.random()).replace(/\D/g,""),isReady:!0,error:function(a){throw new Error(a)},noop:function(){},isFunction:function(a){return"function"===o.type(a)},isArray:Array.isArray,isWindow:function(a){return null!=a&&a===a.window},isNumeric:function(a){return a-parseFloat(a)>=0},isPlainObject:function(a){if("object"!==o.type(a)||a.nodeType||o.isWindow(a))return!1;try{if(a.constructor&&!j.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(b){return!1}return!0},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?h[i.call(a)]||"object":typeof a},globalEval:function(a){var b,c=eval;a=o.trim(a),a&&(1===a.indexOf("use strict")?(b=m.createElement("script"),b.text=a,m.head.appendChild(b).parentNode.removeChild(b)):c(a))},camelCase:function(a){return a.replace(p,"ms-").replace(q,r)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},each:function(a,b,c){var d,e=0,f=a.length,g=s(a);if(c){if(g){for(;f>e;e++)if(d=b.apply(a[e],c),d===!1)break}else for(e in a)if(d=b.apply(a[e],c),d===!1)break}else if(g){for(;f>e;e++)if(d=b.call(a[e],e,a[e]),d===!1)break}else for(e in a)if(d=b.call(a[e],e,a[e]),d===!1)break;return a},trim:function(a){return null==a?"":k.call(a)},makeArray:function(a,b){var c=b||[];return null!=a&&(s(Object(a))?o.merge(c,"string"==typeof a?[a]:a):f.call(c,a)),c},inArray:function(a,b,c){return null==b?-1:g.call(b,a,c)},merge:function(a,b){for(var c=+b.length,d=0,e=a.length;c>d;d++)a[e++]=b[d];return a.length=e,a},grep:function(a,b,c){for(var d,e=[],f=0,g=a.length,h=!c;g>f;f++)d=!b(a[f],f),d!==h&&e.push(a[f]);return e},map:function(a,b,c){var d,f=0,g=a.length,h=s(a),i=[];if(h)for(;g>f;f++)d=b(a[f],f,c),null!=d&&i.push(d);else for(f in a)d=b(a[f],f,c),null!=d&&i.push(d);return e.apply([],i)},guid:1,proxy:function(a,b){var c,e,f;return"string"==typeof b&&(c=a[b],b=a,a=c),o.isFunction(a)?(e=d.call(arguments,2),f=function(){return a.apply(b||this,e.concat(d.call(arguments)))},f.guid=a.guid=a.guid||o.guid++,f):void 0},now:Date.now,support:l}),o.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(a,b){h["[object "+b+"]"]=b.toLowerCase()});function s(a){var b=a.length,c=o.type(a);return"function"===c||o.isWindow(a)?!1:1===a.nodeType&&b?!0:"array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a}var t=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s="sizzle"+-new Date,t=a.document,u=0,v=0,w=eb(),x=eb(),y=eb(),z=function(a,b){return a===b&&(j=!0),0},A="undefined",B=1<<31,C={}.hasOwnProperty,D=[],E=D.pop,F=D.push,G=D.push,H=D.slice,I=D.indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(this[b]===a)return b;return-1},J="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",K="[\\x20\\t\\r\\n\\f]",L="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",M=L.replace("w","w#"),N="\\["+K+"*("+L+")"+K+"*(?:([*^$|!~]?=)"+K+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+M+")|)|)"+K+"*\\]",O=":("+L+")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|"+N.replace(3,8)+")*)|.*)\\)|)",P=new RegExp("^"+K+"+|((?:^|[^\\\\])(?:\\\\.)*)"+K+"+$","g"),Q=new RegExp("^"+K+"*,"+K+"*"),R=new RegExp("^"+K+"*([>+~]|"+K+")"+K+"*"),S=new RegExp("="+K+"*([^\\]'\"]*?)"+K+"*\\]","g"),T=new RegExp(O),U=new RegExp("^"+M+"$"),V={ID:new RegExp("^#("+L+")"),CLASS:new RegExp("^\\.("+L+")"),TAG:new RegExp("^("+L.replace("w","w*")+")"),ATTR:new RegExp("^"+N),PSEUDO:new RegExp("^"+O),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+K+"*(even|odd|(([+-]|)(\\d*)n|)"+K+"*(?:([+-]|)"+K+"*(\\d+)|))"+K+"*\\)|)","i"),bool:new RegExp("^(?:"+J+")$","i"),needsContext:new RegExp("^"+K+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+K+"*((?:-\\d)?\\d*)"+K+"*\\)|)(?=[^-]|$)","i")},W=/^(?:input|select|textarea|button)$/i,X=/^h\d$/i,Y=/^[^{]+\{\s*\[native \w/,Z=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,$=/[+~]/,_=/'|\\/g,ab=new RegExp("\\\\([\\da-f]{1,6}"+K+"?|("+K+")|.)","ig"),bb=function(a,b,c){var d="0x"+b-65536;return d!==d||c?b:0>d?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)};try{G.apply(D=H.call(t.childNodes),t.childNodes),D[t.childNodes.length].nodeType}catch(cb){G={apply:D.length?function(a,b){F.apply(a,H.call(b))}:function(a,b){var c=a.length,d=0;while(a[c++]=b[d++]);a.length=c-1}}}function db(a,b,d,e){var f,g,h,i,j,m,p,q,u,v;if((b?b.ownerDocument||b:t)!==l&&k(b),b=b||l,d=d||[],!a||"string"!=typeof a)return d;if(1!==(i=b.nodeType)&&9!==i)return[];if(n&&!e){if(f=Z.exec(a))if(h=f[1]){if(9===i){if(g=b.getElementById(h),!g||!g.parentNode)return d;if(g.id===h)return d.push(g),d}else if(b.ownerDocument&&(g=b.ownerDocument.getElementById(h))&&r(b,g)&&g.id===h)return d.push(g),d}else{if(f[2])return G.apply(d,b.getElementsByTagName(a)),d;if((h=f[3])&&c.getElementsByClassName&&b.getElementsByClassName)return G.apply(d,b.getElementsByClassName(h)),d}if(c.qsa&&(!o||!o.test(a))){if(q=p=s,u=b,v=9===i&&a,1===i&&"object"!==b.nodeName.toLowerCase()){m=ob(a),(p=b.getAttribute("id"))?q=p.replace(_,"\\$&"):b.setAttribute("id",q),q="[id='"+q+"'] ",j=m.length;while(j--)m[j]=q+pb(m[j]);u=$.test(a)&&mb(b.parentNode)||b,v=m.join(",")}if(v)try{return G.apply(d,u.querySelectorAll(v)),d}catch(w){}finally{p||b.removeAttribute("id")}}}return xb(a.replace(P,"$1"),b,d,e)}function eb(){var a=[];function b(c,e){return a.push(c+" ")>d.cacheLength&&delete b[a.shift()],b[c+" "]=e}return b}function fb(a){return a[s]=!0,a}function gb(a){var b=l.createElement("div");try{return!!a(b)}catch(c){return!1}finally{b.parentNode&&b.parentNode.removeChild(b),b=null}}function hb(a,b){var c=a.split("|"),e=a.length;while(e--)d.attrHandle[c[e]]=b}function ib(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&(~b.sourceIndex||B)-(~a.sourceIndex||B);if(d)return d;if(c)while(c=c.nextSibling)if(c===b)return-1;return a?1:-1}function jb(a){return function(b){var c=b.nodeName.toLowerCase();return"input"===c&&b.type===a}}function kb(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}function lb(a){return fb(function(b){return b=+b,fb(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function mb(a){return a&&typeof a.getElementsByTagName!==A&&a}c=db.support={},f=db.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return b?"HTML"!==b.nodeName:!1},k=db.setDocument=function(a){var b,e=a?a.ownerDocument||a:t,g=e.defaultView;return e!==l&&9===e.nodeType&&e.documentElement?(l=e,m=e.documentElement,n=!f(e),g&&g!==g.top&&(g.addEventListener?g.addEventListener("unload",function(){k()},!1):g.attachEvent&&g.attachEvent("onunload",function(){k()})),c.attributes=gb(function(a){return a.className="i",!a.getAttribute("className")}),c.getElementsByTagName=gb(function(a){return a.appendChild(e.createComment("")),!a.getElementsByTagName("*").length}),c.getElementsByClassName=Y.test(e.getElementsByClassName)&&gb(function(a){return a.innerHTML="<div class='a'></div><div class='a i'></div>",a.firstChild.className="i",2===a.getElementsByClassName("i").length}),c.getById=gb(function(a){return m.appendChild(a).id=s,!e.getElementsByName||!e.getElementsByName(s).length}),c.getById?(d.find.ID=function(a,b){if(typeof b.getElementById!==A&&n){var c=b.getElementById(a);return c&&c.parentNode?[c]:[]}},d.filter.ID=function(a){var b=a.replace(ab,bb);return function(a){return a.getAttribute("id")===b}}):(delete d.find.ID,d.filter.ID=function(a){var b=a.replace(ab,bb);return function(a){var c=typeof a.getAttributeNode!==A&&a.getAttributeNode("id");return c&&c.value===b}}),d.find.TAG=c.getElementsByTagName?function(a,b){return typeof b.getElementsByTagName!==A?b.getElementsByTagName(a):void 0}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);if("*"===a){while(c=f[e++])1===c.nodeType&&d.push(c);return d}return f},d.find.CLASS=c.getElementsByClassName&&function(a,b){return typeof b.getElementsByClassName!==A&&n?b.getElementsByClassName(a):void 0},p=[],o=[],(c.qsa=Y.test(e.querySelectorAll))&&(gb(function(a){a.innerHTML="<select t=''><option selected=''></option></select>",a.querySelectorAll("[t^='']").length&&o.push("[*^$]="+K+"*(?:''|\"\")"),a.querySelectorAll("[selected]").length||o.push("\\["+K+"*(?:value|"+J+")"),a.querySelectorAll(":checked").length||o.push(":checked")}),gb(function(a){var b=e.createElement("input");b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),a.querySelectorAll("[name=d]").length&&o.push("name"+K+"*[*^$|!~]?="),a.querySelectorAll(":enabled").length||o.push(":enabled",":disabled"),a.querySelectorAll("*,:x"),o.push(",.*:")})),(c.matchesSelector=Y.test(q=m.webkitMatchesSelector||m.mozMatchesSelector||m.oMatchesSelector||m.msMatchesSelector))&&gb(function(a){c.disconnectedMatch=q.call(a,"div"),q.call(a,"[s!='']:x"),p.push("!=",O)}),o=o.length&&new RegExp(o.join("|")),p=p.length&&new RegExp(p.join("|")),b=Y.test(m.compareDocumentPosition),r=b||Y.test(m.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)while(b=b.parentNode)if(b===a)return!0;return!1},z=b?function(a,b){if(a===b)return j=!0,0;var d=!a.compareDocumentPosition-!b.compareDocumentPosition;return d?d:(d=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&d||!c.sortDetached&&b.compareDocumentPosition(a)===d?a===e||a.ownerDocument===t&&r(t,a)?-1:b===e||b.ownerDocument===t&&r(t,b)?1:i?I.call(i,a)-I.call(i,b):0:4&d?-1:1)}:function(a,b){if(a===b)return j=!0,0;var c,d=0,f=a.parentNode,g=b.parentNode,h=[a],k=[b];if(!f||!g)return a===e?-1:b===e?1:f?-1:g?1:i?I.call(i,a)-I.call(i,b):0;if(f===g)return ib(a,b);c=a;while(c=c.parentNode)h.unshift(c);c=b;while(c=c.parentNode)k.unshift(c);while(h[d]===k[d])d++;return d?ib(h[d],k[d]):h[d]===t?-1:k[d]===t?1:0},e):l},db.matches=function(a,b){return db(a,null,null,b)},db.matchesSelector=function(a,b){if((a.ownerDocument||a)!==l&&k(a),b=b.replace(S,"='$1']"),!(!c.matchesSelector||!n||p&&p.test(b)||o&&o.test(b)))try{var d=q.call(a,b);if(d||c.disconnectedMatch||a.document&&11!==a.document.nodeType)return d}catch(e){}return db(b,l,null,[a]).length>0},db.contains=function(a,b){return(a.ownerDocument||a)!==l&&k(a),r(a,b)},db.attr=function(a,b){(a.ownerDocument||a)!==l&&k(a);var e=d.attrHandle[b.toLowerCase()],f=e&&C.call(d.attrHandle,b.toLowerCase())?e(a,b,!n):void 0;return void 0!==f?f:c.attributes||!n?a.getAttribute(b):(f=a.getAttributeNode(b))&&f.specified?f.value:null},db.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},db.uniqueSort=function(a){var b,d=[],e=0,f=0;if(j=!c.detectDuplicates,i=!c.sortStable&&a.slice(0),a.sort(z),j){while(b=a[f++])b===a[f]&&(e=d.push(f));while(e--)a.splice(d[e],1)}return i=null,a},e=db.getText=function(a){var b,c="",d=0,f=a.nodeType;if(f){if(1===f||9===f||11===f){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=e(a)}else if(3===f||4===f)return a.nodeValue}else while(b=a[d++])c+=e(b);return c},d=db.selectors={cacheLength:50,createPseudo:fb,match:V,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(ab,bb),a[3]=(a[4]||a[5]||"").replace(ab,bb),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||db.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&db.error(a[0]),a},PSEUDO:function(a){var b,c=!a[5]&&a[2];return V.CHILD.test(a[0])?null:(a[3]&&void 0!==a[4]?a[2]=a[4]:c&&T.test(c)&&(b=ob(c,!0))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(ab,bb).toLowerCase();return"*"===a?function(){return!0}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=w[a+" "];return b||(b=new RegExp("(^|"+K+")"+a+"("+K+"|$)"))&&w(a,function(a){return b.test("string"==typeof a.className&&a.className||typeof a.getAttribute!==A&&a.getAttribute("class")||"")})},ATTR:function(a,b,c){return function(d){var e=db.attr(d,a);return null==e?"!="===b:b?(e+="","="===b?e===c:"!="===b?e!==c:"^="===b?c&&0===e.indexOf(c):"*="===b?c&&e.indexOf(c)>-1:"$="===b?c&&e.slice(-c.length)===c:"~="===b?(" "+e+" ").indexOf(c)>-1:"|="===b?e===c||e.slice(0,c.length+1)===c+"-":!1):!0}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;return 1===d&&0===e?function(a){return!!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),t=!i&&!h;if(q){if(f){while(p){l=b;while(l=l[p])if(h?l.nodeName.toLowerCase()===r:1===l.nodeType)return!1;o=p="only"===a&&!o&&"nextSibling"}return!0}if(o=[g?q.firstChild:q.lastChild],g&&t){k=q[s]||(q[s]={}),j=k[a]||[],n=j[0]===u&&j[1],m=j[0]===u&&j[2],l=n&&q.childNodes[n];while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if(1===l.nodeType&&++m&&l===b){k[a]=[u,n,m];break}}else if(t&&(j=(b[s]||(b[s]={}))[a])&&j[0]===u)m=j[1];else while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if((h?l.nodeName.toLowerCase()===r:1===l.nodeType)&&++m&&(t&&((l[s]||(l[s]={}))[a]=[u,m]),l===b))break;return m-=e,m===d||m%d===0&&m/d>=0}}},PSEUDO:function(a,b){var c,e=d.pseudos[a]||d.setFilters[a.toLowerCase()]||db.error("unsupported pseudo: "+a);return e[s]?e(b):e.length>1?(c=[a,a,"",b],d.setFilters.hasOwnProperty(a.toLowerCase())?fb(function(a,c){var d,f=e(a,b),g=f.length;while(g--)d=I.call(a,f[g]),a[d]=!(c[d]=f[g])}):function(a){return e(a,0,c)}):e}},pseudos:{not:fb(function(a){var b=[],c=[],d=g(a.replace(P,"$1"));return d[s]?fb(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)(f=g[h])&&(a[h]=!(b[h]=f))}):function(a,e,f){return b[0]=a,d(b,null,f,c),!c.pop()}}),has:fb(function(a){return function(b){return db(a,b).length>0}}),contains:fb(function(a){return function(b){return(b.textContent||b.innerText||e(b)).indexOf(a)>-1}}),lang:fb(function(a){return U.test(a||"")||db.error("unsupported lang: "+a),a=a.replace(ab,bb).toLowerCase(),function(b){var c;do if(c=n?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang"))return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-");while((b=b.parentNode)&&1===b.nodeType);return!1}}),target:function(b){var c=a.location&&a.location.hash;return c&&c.slice(1)===b.id},root:function(a){return a===m},focus:function(a){return a===l.activeElement&&(!l.hasFocus||l.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},enabled:function(a){return a.disabled===!1},disabled:function(a){return a.disabled===!0},checked:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},empty:function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return!1;return!0},parent:function(a){return!d.pseudos.empty(a)},header:function(a){return X.test(a.nodeName)},input:function(a){return W.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&"button"===a.type||"button"===b},text:function(a){var b;return"input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},first:lb(function(){return[0]}),last:lb(function(a,b){return[b-1]}),eq:lb(function(a,b,c){return[0>c?c+b:c]}),even:lb(function(a,b){for(var c=0;b>c;c+=2)a.push(c);return a}),odd:lb(function(a,b){for(var c=1;b>c;c+=2)a.push(c);return a}),lt:lb(function(a,b,c){for(var d=0>c?c+b:c;--d>=0;)a.push(d);return a}),gt:lb(function(a,b,c){for(var d=0>c?c+b:c;++d<b;)a.push(d);return a})}},d.pseudos.nth=d.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})d.pseudos[b]=jb(b);for(b in{submit:!0,reset:!0})d.pseudos[b]=kb(b);function nb(){}nb.prototype=d.filters=d.pseudos,d.setFilters=new nb;function ob(a,b){var c,e,f,g,h,i,j,k=x[a+" "];if(k)return b?0:k.slice(0);h=a,i=[],j=d.preFilter;while(h){(!c||(e=Q.exec(h)))&&(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),c=!1,(e=R.exec(h))&&(c=e.shift(),f.push({value:c,type:e[0].replace(P," ")}),h=h.slice(c.length));for(g in d.filter)!(e=V[g].exec(h))||j[g]&&!(e=j[g](e))||(c=e.shift(),f.push({value:c,type:g,matches:e}),h=h.slice(c.length));if(!c)break}return b?h.length:h?db.error(a):x(a,i).slice(0)}function pb(a){for(var b=0,c=a.length,d="";c>b;b++)d+=a[b].value;return d}function qb(a,b,c){var d=b.dir,e=c&&"parentNode"===d,f=v++;return b.first?function(b,c,f){while(b=b[d])if(1===b.nodeType||e)return a(b,c,f)}:function(b,c,g){var h,i,j=[u,f];if(g){while(b=b[d])if((1===b.nodeType||e)&&a(b,c,g))return!0}else while(b=b[d])if(1===b.nodeType||e){if(i=b[s]||(b[s]={}),(h=i[d])&&h[0]===u&&h[1]===f)return j[2]=h[2];if(i[d]=j,j[2]=a(b,c,g))return!0}}}function rb(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function sb(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;i>h;h++)(f=a[h])&&(!c||c(f,d,e))&&(g.push(f),j&&b.push(h));return g}function tb(a,b,c,d,e,f){return d&&!d[s]&&(d=tb(d)),e&&!e[s]&&(e=tb(e,f)),fb(function(f,g,h,i){var j,k,l,m=[],n=[],o=g.length,p=f||wb(b||"*",h.nodeType?[h]:h,[]),q=!a||!f&&b?p:sb(p,m,a,h,i),r=c?e||(f?a:o||d)?[]:g:q;if(c&&c(q,r,h,i),d){j=sb(r,n),d(j,[],h,i),k=j.length;while(k--)(l=j[k])&&(r[n[k]]=!(q[n[k]]=l))}if(f){if(e||a){if(e){j=[],k=r.length;while(k--)(l=r[k])&&j.push(q[k]=l);e(null,r=[],j,i)}k=r.length;while(k--)(l=r[k])&&(j=e?I.call(f,l):m[k])>-1&&(f[j]=!(g[j]=l))}}else r=sb(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):G.apply(g,r)})}function ub(a){for(var b,c,e,f=a.length,g=d.relative[a[0].type],i=g||d.relative[" "],j=g?1:0,k=qb(function(a){return a===b},i,!0),l=qb(function(a){return I.call(b,a)>-1},i,!0),m=[function(a,c,d){return!g&&(d||c!==h)||((b=c).nodeType?k(a,c,d):l(a,c,d))}];f>j;j++)if(c=d.relative[a[j].type])m=[qb(rb(m),c)];else{if(c=d.filter[a[j].type].apply(null,a[j].matches),c[s]){for(e=++j;f>e;e++)if(d.relative[a[e].type])break;return tb(j>1&&rb(m),j>1&&pb(a.slice(0,j-1).concat({value:" "===a[j-2].type?"*":""})).replace(P,"$1"),c,e>j&&ub(a.slice(j,e)),f>e&&ub(a=a.slice(e)),f>e&&pb(a))}m.push(c)}return rb(m)}function vb(a,b){var c=b.length>0,e=a.length>0,f=function(f,g,i,j,k){var m,n,o,p=0,q="0",r=f&&[],s=[],t=h,v=f||e&&d.find.TAG("*",k),w=u+=null==t?1:Math.random()||.1,x=v.length;for(k&&(h=g!==l&&g);q!==x&&null!=(m=v[q]);q++){if(e&&m){n=0;while(o=a[n++])if(o(m,g,i)){j.push(m);break}k&&(u=w)}c&&((m=!o&&m)&&p--,f&&r.push(m))}if(p+=q,c&&q!==p){n=0;while(o=b[n++])o(r,s,g,i);if(f){if(p>0)while(q--)r[q]||s[q]||(s[q]=E.call(j));s=sb(s)}G.apply(j,s),k&&!f&&s.length>0&&p+b.length>1&&db.uniqueSort(j)}return k&&(u=w,h=t),r};return c?fb(f):f}g=db.compile=function(a,b){var c,d=[],e=[],f=y[a+" "];if(!f){b||(b=ob(a)),c=b.length;while(c--)f=ub(b[c]),f[s]?d.push(f):e.push(f);f=y(a,vb(e,d))}return f};function wb(a,b,c){for(var d=0,e=b.length;e>d;d++)db(a,b[d],c);return c}function xb(a,b,e,f){var h,i,j,k,l,m=ob(a);if(!f&&1===m.length){if(i=m[0]=m[0].slice(0),i.length>2&&"ID"===(j=i[0]).type&&c.getById&&9===b.nodeType&&n&&d.relative[i[1].type]){if(b=(d.find.ID(j.matches[0].replace(ab,bb),b)||[])[0],!b)return e;a=a.slice(i.shift().value.length)}h=V.needsContext.test(a)?0:i.length;while(h--){if(j=i[h],d.relative[k=j.type])break;if((l=d.find[k])&&(f=l(j.matches[0].replace(ab,bb),$.test(i[0].type)&&mb(b.parentNode)||b))){if(i.splice(h,1),a=f.length&&pb(i),!a)return G.apply(e,f),e;break}}}return g(a,m)(f,b,!n,e,$.test(a)&&mb(b.parentNode)||b),e}return c.sortStable=s.split("").sort(z).join("")===s,c.detectDuplicates=!!j,k(),c.sortDetached=gb(function(a){return 1&a.compareDocumentPosition(l.createElement("div"))}),gb(function(a){return a.innerHTML="<a href='#'></a>","#"===a.firstChild.getAttribute("href")})||hb("type|href|height|width",function(a,b,c){return c?void 0:a.getAttribute(b,"type"===b.toLowerCase()?1:2)}),c.attributes&&gb(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")})||hb("value",function(a,b,c){return c||"input"!==a.nodeName.toLowerCase()?void 0:a.defaultValue}),gb(function(a){return null==a.getAttribute("disabled")})||hb(J,function(a,b,c){var d;return c?void 0:a[b]===!0?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null}),db}(a);o.find=t,o.expr=t.selectors,o.expr[":"]=o.expr.pseudos,o.unique=t.uniqueSort,o.text=t.getText,o.isXMLDoc=t.isXML,o.contains=t.contains;var u=o.expr.match.needsContext,v=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,w=/^.[^:#\[\.,]*$/;function x(a,b,c){if(o.isFunction(b))return o.grep(a,function(a,d){return!!b.call(a,d,a)!==c});if(b.nodeType)return o.grep(a,function(a){return a===b!==c});if("string"==typeof b){if(w.test(b))return o.filter(b,a,c);b=o.filter(b,a)}return o.grep(a,function(a){return g.call(b,a)>=0!==c})}o.filter=function(a,b,c){var d=b[0];return c&&(a=":not("+a+")"),1===b.length&&1===d.nodeType?o.find.matchesSelector(d,a)?[d]:[]:o.find.matches(a,o.grep(b,function(a){return 1===a.nodeType}))},o.fn.extend({find:function(a){var b,c=this.length,d=[],e=this;if("string"!=typeof a)return this.pushStack(o(a).filter(function(){for(b=0;c>b;b++)if(o.contains(e[b],this))return!0}));for(b=0;c>b;b++)o.find(a,e[b],d);return d=this.pushStack(c>1?o.unique(d):d),d.selector=this.selector?this.selector+" "+a:a,d},filter:function(a){return this.pushStack(x(this,a||[],!1))},not:function(a){return this.pushStack(x(this,a||[],!0))},is:function(a){return!!x(this,"string"==typeof a&&u.test(a)?o(a):a||[],!1).length}});var y,z=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,A=o.fn.init=function(a,b){var c,d;if(!a)return this;if("string"==typeof a){if(c="<"===a[0]&&">"===a[a.length-1]&&a.length>=3?[null,a,null]:z.exec(a),!c||!c[1]&&b)return!b||b.jquery?(b||y).find(a):this.constructor(b).find(a);if(c[1]){if(b=b instanceof o?b[0]:b,o.merge(this,o.parseHTML(c[1],b&&b.nodeType?b.ownerDocument||b:m,!0)),v.test(c[1])&&o.isPlainObject(b))for(c in b)o.isFunction(this[c])?this[c](b[c]):this.attr(c,b[c]);return this}return d=m.getElementById(c[2]),d&&d.parentNode&&(this.length=1,this[0]=d),this.context=m,this.selector=a,this}return a.nodeType?(this.context=this[0]=a,this.length=1,this):o.isFunction(a)?"undefined"!=typeof y.ready?y.ready(a):a(o):(void 0!==a.selector&&(this.selector=a.selector,this.context=a.context),o.makeArray(a,this))};A.prototype=o.fn,y=o(m);var B=/^(?:parents|prev(?:Until|All))/,C={children:!0,contents:!0,next:!0,prev:!0};o.extend({dir:function(a,b,c){var d=[],e=void 0!==c;while((a=a[b])&&9!==a.nodeType)if(1===a.nodeType){if(e&&o(a).is(c))break;d.push(a)}return d},sibling:function(a,b){for(var c=[];a;a=a.nextSibling)1===a.nodeType&&a!==b&&c.push(a);return c}}),o.fn.extend({has:function(a){var b=o(a,this),c=b.length;return this.filter(function(){for(var a=0;c>a;a++)if(o.contains(this,b[a]))return!0})},closest:function(a,b){for(var c,d=0,e=this.length,f=[],g=u.test(a)||"string"!=typeof a?o(a,b||this.context):0;e>d;d++)for(c=this[d];c&&c!==b;c=c.parentNode)if(c.nodeType<11&&(g?g.index(c)>-1:1===c.nodeType&&o.find.matchesSelector(c,a))){f.push(c);break}return this.pushStack(f.length>1?o.unique(f):f)},index:function(a){return a?"string"==typeof a?g.call(o(a),this[0]):g.call(this,a.jquery?a[0]:a):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(a,b){return this.pushStack(o.unique(o.merge(this.get(),o(a,b))))},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}});function D(a,b){while((a=a[b])&&1!==a.nodeType);return a}o.each({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return o.dir(a,"parentNode")},parentsUntil:function(a,b,c){return o.dir(a,"parentNode",c)},next:function(a){return D(a,"nextSibling")},prev:function(a){return D(a,"previousSibling")},nextAll:function(a){return o.dir(a,"nextSibling")},prevAll:function(a){return o.dir(a,"previousSibling")},nextUntil:function(a,b,c){return o.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return o.dir(a,"previousSibling",c)},siblings:function(a){return o.sibling((a.parentNode||{}).firstChild,a)},children:function(a){return o.sibling(a.firstChild)},contents:function(a){return a.contentDocument||o.merge([],a.childNodes)}},function(a,b){o.fn[a]=function(c,d){var e=o.map(this,b,c);return"Until"!==a.slice(-5)&&(d=c),d&&"string"==typeof d&&(e=o.filter(d,e)),this.length>1&&(C[a]||o.unique(e),B.test(a)&&e.reverse()),this.pushStack(e)}});var E=/\S+/g,F={};function G(a){var b=F[a]={};return o.each(a.match(E)||[],function(a,c){b[c]=!0}),b}o.Callbacks=function(a){a="string"==typeof a?F[a]||G(a):o.extend({},a);var b,c,d,e,f,g,h=[],i=!a.once&&[],j=function(l){for(b=a.memory&&l,c=!0,g=e||0,e=0,f=h.length,d=!0;h&&f>g;g++)if(h[g].apply(l[0],l[1])===!1&&a.stopOnFalse){b=!1;break}d=!1,h&&(i?i.length&&j(i.shift()):b?h=[]:k.disable())},k={add:function(){if(h){var c=h.length;!function g(b){o.each(b,function(b,c){var d=o.type(c);"function"===d?a.unique&&k.has(c)||h.push(c):c&&c.length&&"string"!==d&&g(c)})}(arguments),d?f=h.length:b&&(e=c,j(b))}return this},remove:function(){return h&&o.each(arguments,function(a,b){var c;while((c=o.inArray(b,h,c))>-1)h.splice(c,1),d&&(f>=c&&f--,g>=c&&g--)}),this},has:function(a){return a?o.inArray(a,h)>-1:!(!h||!h.length)},empty:function(){return h=[],f=0,this},disable:function(){return h=i=b=void 0,this},disabled:function(){return!h},lock:function(){return i=void 0,b||k.disable(),this},locked:function(){return!i},fireWith:function(a,b){return!h||c&&!i||(b=b||[],b=[a,b.slice?b.slice():b],d?i.push(b):j(b)),this},fire:function(){return k.fireWith(this,arguments),this},fired:function(){return!!c}};return k},o.extend({Deferred:function(a){var b=[["resolve","done",o.Callbacks("once memory"),"resolved"],["reject","fail",o.Callbacks("once memory"),"rejected"],["notify","progress",o.Callbacks("memory")]],c="pending",d={state:function(){return c},always:function(){return e.done(arguments).fail(arguments),this},then:function(){var a=arguments;return o.Deferred(function(c){o.each(b,function(b,f){var g=o.isFunction(a[b])&&a[b];e[f[1]](function(){var a=g&&g.apply(this,arguments);a&&o.isFunction(a.promise)?a.promise().done(c.resolve).fail(c.reject).progress(c.notify):c[f[0]+"With"](this===d?c.promise():this,g?[a]:arguments)})}),a=null}).promise()},promise:function(a){return null!=a?o.extend(a,d):d}},e={};return d.pipe=d.then,o.each(b,function(a,f){var g=f[2],h=f[3];d[f[1]]=g.add,h&&g.add(function(){c=h},b[1^a][2].disable,b[2][2].lock),e[f[0]]=function(){return e[f[0]+"With"](this===e?d:this,arguments),this},e[f[0]+"With"]=g.fireWith}),d.promise(e),a&&a.call(e,e),e},when:function(a){var b=0,c=d.call(arguments),e=c.length,f=1!==e||a&&o.isFunction(a.promise)?e:0,g=1===f?a:o.Deferred(),h=function(a,b,c){return function(e){b[a]=this,c[a]=arguments.length>1?d.call(arguments):e,c===i?g.notifyWith(b,c):--f||g.resolveWith(b,c)}},i,j,k;if(e>1)for(i=new Array(e),j=new Array(e),k=new Array(e);e>b;b++)c[b]&&o.isFunction(c[b].promise)?c[b].promise().done(h(b,k,c)).fail(g.reject).progress(h(b,j,i)):--f;return f||g.resolveWith(k,c),g.promise()}});var H;o.fn.ready=function(a){return o.ready.promise().done(a),this},o.extend({isReady:!1,readyWait:1,holdReady:function(a){a?o.readyWait++:o.ready(!0)},ready:function(a){(a===!0?--o.readyWait:o.isReady)||(o.isReady=!0,a!==!0&&--o.readyWait>0||(H.resolveWith(m,[o]),o.fn.trigger&&o(m).trigger("ready").off("ready")))}});function I(){m.removeEventListener("DOMContentLoaded",I,!1),a.removeEventListener("load",I,!1),o.ready()}o.ready.promise=function(b){return H||(H=o.Deferred(),"complete"===m.readyState?setTimeout(o.ready):(m.addEventListener("DOMContentLoaded",I,!1),a.addEventListener("load",I,!1))),H.promise(b)},o.ready.promise();var J=o.access=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;if("object"===o.type(c)){e=!0;for(h in c)o.access(a,b,h,c[h],!0,f,g)}else if(void 0!==d&&(e=!0,o.isFunction(d)||(g=!0),j&&(g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(o(a),c)})),b))for(;i>h;h++)b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)));return e?a:j?b.call(a):i?b(a[0],c):f};o.acceptData=function(a){return 1===a.nodeType||9===a.nodeType||!+a.nodeType};function K(){Object.defineProperty(this.cache={},0,{get:function(){return{}}}),this.expando=o.expando+Math.random()}K.uid=1,K.accepts=o.acceptData,K.prototype={key:function(a){if(!K.accepts(a))return 0;var b={},c=a[this.expando];if(!c){c=K.uid++;try{b[this.expando]={value:c},Object.defineProperties(a,b)}catch(d){b[this.expando]=c,o.extend(a,b)}}return this.cache[c]||(this.cache[c]={}),c},set:function(a,b,c){var d,e=this.key(a),f=this.cache[e];if("string"==typeof b)f[b]=c;else if(o.isEmptyObject(f))o.extend(this.cache[e],b);else for(d in b)f[d]=b[d];return f},get:function(a,b){var c=this.cache[this.key(a)];return void 0===b?c:c[b]},access:function(a,b,c){var d;return void 0===b||b&&"string"==typeof b&&void 0===c?(d=this.get(a,b),void 0!==d?d:this.get(a,o.camelCase(b))):(this.set(a,b,c),void 0!==c?c:b)},remove:function(a,b){var c,d,e,f=this.key(a),g=this.cache[f];if(void 0===b)this.cache[f]={};else{o.isArray(b)?d=b.concat(b.map(o.camelCase)):(e=o.camelCase(b),b in g?d=[b,e]:(d=e,d=d in g?[d]:d.match(E)||[])),c=d.length;while(c--)delete g[d[c]]}},hasData:function(a){return!o.isEmptyObject(this.cache[a[this.expando]]||{})},discard:function(a){a[this.expando]&&delete this.cache[a[this.expando]]}};var L=new K,M=new K,N=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,O=/([A-Z])/g;function P(a,b,c){var d;if(void 0===c&&1===a.nodeType)if(d="data-"+b.replace(O,"-$1").toLowerCase(),c=a.getAttribute(d),"string"==typeof c){try{c="true"===c?!0:"false"===c?!1:"null"===c?null:+c+""===c?+c:N.test(c)?o.parseJSON(c):c}catch(e){}M.set(a,b,c)}else c=void 0;return c}o.extend({hasData:function(a){return M.hasData(a)||L.hasData(a)},data:function(a,b,c){return M.access(a,b,c)},removeData:function(a,b){M.remove(a,b)},_data:function(a,b,c){return L.access(a,b,c)},_removeData:function(a,b){L.remove(a,b)}}),o.fn.extend({data:function(a,b){var c,d,e,f=this[0],g=f&&f.attributes;if(void 0===a){if(this.length&&(e=M.get(f),1===f.nodeType&&!L.get(f,"hasDataAttrs"))){c=g.length;
while(c--)d=g[c].name,0===d.indexOf("data-")&&(d=o.camelCase(d.slice(5)),P(f,d,e[d]));L.set(f,"hasDataAttrs",!0)}return e}return"object"==typeof a?this.each(function(){M.set(this,a)}):J(this,function(b){var c,d=o.camelCase(a);if(f&&void 0===b){if(c=M.get(f,a),void 0!==c)return c;if(c=M.get(f,d),void 0!==c)return c;if(c=P(f,d,void 0),void 0!==c)return c}else this.each(function(){var c=M.get(this,d);M.set(this,d,b),-1!==a.indexOf("-")&&void 0!==c&&M.set(this,a,b)})},null,b,arguments.length>1,null,!0)},removeData:function(a){return this.each(function(){M.remove(this,a)})}}),o.extend({queue:function(a,b,c){var d;return a?(b=(b||"fx")+"queue",d=L.get(a,b),c&&(!d||o.isArray(c)?d=L.access(a,b,o.makeArray(c)):d.push(c)),d||[]):void 0},dequeue:function(a,b){b=b||"fx";var c=o.queue(a,b),d=c.length,e=c.shift(),f=o._queueHooks(a,b),g=function(){o.dequeue(a,b)};"inprogress"===e&&(e=c.shift(),d--),e&&("fx"===b&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return L.get(a,c)||L.access(a,c,{empty:o.Callbacks("once memory").add(function(){L.remove(a,[b+"queue",c])})})}}),o.fn.extend({queue:function(a,b){var c=2;return"string"!=typeof a&&(b=a,a="fx",c--),arguments.length<c?o.queue(this[0],a):void 0===b?this:this.each(function(){var c=o.queue(this,a,b);o._queueHooks(this,a),"fx"===a&&"inprogress"!==c[0]&&o.dequeue(this,a)})},dequeue:function(a){return this.each(function(){o.dequeue(this,a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,b){var c,d=1,e=o.Deferred(),f=this,g=this.length,h=function(){--d||e.resolveWith(f,[f])};"string"!=typeof a&&(b=a,a=void 0),a=a||"fx";while(g--)c=L.get(f[g],a+"queueHooks"),c&&c.empty&&(d++,c.empty.add(h));return h(),e.promise(b)}});var Q=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,R=["Top","Right","Bottom","Left"],S=function(a,b){return a=b||a,"none"===o.css(a,"display")||!o.contains(a.ownerDocument,a)},T=/^(?:checkbox|radio)$/i;!function(){var a=m.createDocumentFragment(),b=a.appendChild(m.createElement("div"));b.innerHTML="<input type='radio' checked='checked' name='t'/>",l.checkClone=b.cloneNode(!0).cloneNode(!0).lastChild.checked,b.innerHTML="<textarea>x</textarea>",l.noCloneChecked=!!b.cloneNode(!0).lastChild.defaultValue}();var U="undefined";l.focusinBubbles="onfocusin"in a;var V=/^key/,W=/^(?:mouse|contextmenu)|click/,X=/^(?:focusinfocus|focusoutblur)$/,Y=/^([^.]*)(?:\.(.+)|)$/;function Z(){return!0}function $(){return!1}function _(){try{return m.activeElement}catch(a){}}o.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,n,p,q,r=L.get(a);if(r){c.handler&&(f=c,c=f.handler,e=f.selector),c.guid||(c.guid=o.guid++),(i=r.events)||(i=r.events={}),(g=r.handle)||(g=r.handle=function(b){return typeof o!==U&&o.event.triggered!==b.type?o.event.dispatch.apply(a,arguments):void 0}),b=(b||"").match(E)||[""],j=b.length;while(j--)h=Y.exec(b[j])||[],n=q=h[1],p=(h[2]||"").split(".").sort(),n&&(l=o.event.special[n]||{},n=(e?l.delegateType:l.bindType)||n,l=o.event.special[n]||{},k=o.extend({type:n,origType:q,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&o.expr.match.needsContext.test(e),namespace:p.join(".")},f),(m=i[n])||(m=i[n]=[],m.delegateCount=0,l.setup&&l.setup.call(a,d,p,g)!==!1||a.addEventListener&&a.addEventListener(n,g,!1)),l.add&&(l.add.call(a,k),k.handler.guid||(k.handler.guid=c.guid)),e?m.splice(m.delegateCount++,0,k):m.push(k),o.event.global[n]=!0)}},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,n,p,q,r=L.hasData(a)&&L.get(a);if(r&&(i=r.events)){b=(b||"").match(E)||[""],j=b.length;while(j--)if(h=Y.exec(b[j])||[],n=q=h[1],p=(h[2]||"").split(".").sort(),n){l=o.event.special[n]||{},n=(d?l.delegateType:l.bindType)||n,m=i[n]||[],h=h[2]&&new RegExp("(^|\\.)"+p.join("\\.(?:.*\\.|)")+"(\\.|$)"),g=f=m.length;while(f--)k=m[f],!e&&q!==k.origType||c&&c.guid!==k.guid||h&&!h.test(k.namespace)||d&&d!==k.selector&&("**"!==d||!k.selector)||(m.splice(f,1),k.selector&&m.delegateCount--,l.remove&&l.remove.call(a,k));g&&!m.length&&(l.teardown&&l.teardown.call(a,p,r.handle)!==!1||o.removeEvent(a,n,r.handle),delete i[n])}else for(n in i)o.event.remove(a,n+b[j],c,d,!0);o.isEmptyObject(i)&&(delete r.handle,L.remove(a,"events"))}},trigger:function(b,c,d,e){var f,g,h,i,k,l,n,p=[d||m],q=j.call(b,"type")?b.type:b,r=j.call(b,"namespace")?b.namespace.split("."):[];if(g=h=d=d||m,3!==d.nodeType&&8!==d.nodeType&&!X.test(q+o.event.triggered)&&(q.indexOf(".")>=0&&(r=q.split("."),q=r.shift(),r.sort()),k=q.indexOf(":")<0&&"on"+q,b=b[o.expando]?b:new o.Event(q,"object"==typeof b&&b),b.isTrigger=e?2:3,b.namespace=r.join("."),b.namespace_re=b.namespace?new RegExp("(^|\\.)"+r.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,b.result=void 0,b.target||(b.target=d),c=null==c?[b]:o.makeArray(c,[b]),n=o.event.special[q]||{},e||!n.trigger||n.trigger.apply(d,c)!==!1)){if(!e&&!n.noBubble&&!o.isWindow(d)){for(i=n.delegateType||q,X.test(i+q)||(g=g.parentNode);g;g=g.parentNode)p.push(g),h=g;h===(d.ownerDocument||m)&&p.push(h.defaultView||h.parentWindow||a)}f=0;while((g=p[f++])&&!b.isPropagationStopped())b.type=f>1?i:n.bindType||q,l=(L.get(g,"events")||{})[b.type]&&L.get(g,"handle"),l&&l.apply(g,c),l=k&&g[k],l&&l.apply&&o.acceptData(g)&&(b.result=l.apply(g,c),b.result===!1&&b.preventDefault());return b.type=q,e||b.isDefaultPrevented()||n._default&&n._default.apply(p.pop(),c)!==!1||!o.acceptData(d)||k&&o.isFunction(d[q])&&!o.isWindow(d)&&(h=d[k],h&&(d[k]=null),o.event.triggered=q,d[q](),o.event.triggered=void 0,h&&(d[k]=h)),b.result}},dispatch:function(a){a=o.event.fix(a);var b,c,e,f,g,h=[],i=d.call(arguments),j=(L.get(this,"events")||{})[a.type]||[],k=o.event.special[a.type]||{};if(i[0]=a,a.delegateTarget=this,!k.preDispatch||k.preDispatch.call(this,a)!==!1){h=o.event.handlers.call(this,a,j),b=0;while((f=h[b++])&&!a.isPropagationStopped()){a.currentTarget=f.elem,c=0;while((g=f.handlers[c++])&&!a.isImmediatePropagationStopped())(!a.namespace_re||a.namespace_re.test(g.namespace))&&(a.handleObj=g,a.data=g.data,e=((o.event.special[g.origType]||{}).handle||g.handler).apply(f.elem,i),void 0!==e&&(a.result=e)===!1&&(a.preventDefault(),a.stopPropagation()))}return k.postDispatch&&k.postDispatch.call(this,a),a.result}},handlers:function(a,b){var c,d,e,f,g=[],h=b.delegateCount,i=a.target;if(h&&i.nodeType&&(!a.button||"click"!==a.type))for(;i!==this;i=i.parentNode||this)if(i.disabled!==!0||"click"!==a.type){for(d=[],c=0;h>c;c++)f=b[c],e=f.selector+" ",void 0===d[e]&&(d[e]=f.needsContext?o(e,this).index(i)>=0:o.find(e,this,null,[i]).length),d[e]&&d.push(f);d.length&&g.push({elem:i,handlers:d})}return h<b.length&&g.push({elem:this,handlers:b.slice(h)}),g},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){return null==a.which&&(a.which=null!=b.charCode?b.charCode:b.keyCode),a}},mouseHooks:{props:"button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,b){var c,d,e,f=b.button;return null==a.pageX&&null!=b.clientX&&(c=a.target.ownerDocument||m,d=c.documentElement,e=c.body,a.pageX=b.clientX+(d&&d.scrollLeft||e&&e.scrollLeft||0)-(d&&d.clientLeft||e&&e.clientLeft||0),a.pageY=b.clientY+(d&&d.scrollTop||e&&e.scrollTop||0)-(d&&d.clientTop||e&&e.clientTop||0)),a.which||void 0===f||(a.which=1&f?1:2&f?3:4&f?2:0),a}},fix:function(a){if(a[o.expando])return a;var b,c,d,e=a.type,f=a,g=this.fixHooks[e];g||(this.fixHooks[e]=g=W.test(e)?this.mouseHooks:V.test(e)?this.keyHooks:{}),d=g.props?this.props.concat(g.props):this.props,a=new o.Event(f),b=d.length;while(b--)c=d[b],a[c]=f[c];return a.target||(a.target=m),3===a.target.nodeType&&(a.target=a.target.parentNode),g.filter?g.filter(a,f):a},special:{load:{noBubble:!0},focus:{trigger:function(){return this!==_()&&this.focus?(this.focus(),!1):void 0},delegateType:"focusin"},blur:{trigger:function(){return this===_()&&this.blur?(this.blur(),!1):void 0},delegateType:"focusout"},click:{trigger:function(){return"checkbox"===this.type&&this.click&&o.nodeName(this,"input")?(this.click(),!1):void 0},_default:function(a){return o.nodeName(a.target,"a")}},beforeunload:{postDispatch:function(a){void 0!==a.result&&(a.originalEvent.returnValue=a.result)}}},simulate:function(a,b,c,d){var e=o.extend(new o.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?o.event.trigger(e,null,b):o.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},o.removeEvent=function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)},o.Event=function(a,b){return this instanceof o.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&a.getPreventDefault&&a.getPreventDefault()?Z:$):this.type=a,b&&o.extend(this,b),this.timeStamp=a&&a.timeStamp||o.now(),void(this[o.expando]=!0)):new o.Event(a,b)},o.Event.prototype={isDefaultPrevented:$,isPropagationStopped:$,isImmediatePropagationStopped:$,preventDefault:function(){var a=this.originalEvent;this.isDefaultPrevented=Z,a&&a.preventDefault&&a.preventDefault()},stopPropagation:function(){var a=this.originalEvent;this.isPropagationStopped=Z,a&&a.stopPropagation&&a.stopPropagation()},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=Z,this.stopPropagation()}},o.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(a,b){o.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;return(!e||e!==d&&!o.contains(d,e))&&(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}}}),l.focusinBubbles||o.each({focus:"focusin",blur:"focusout"},function(a,b){var c=function(a){o.event.simulate(b,a.target,o.event.fix(a),!0)};o.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=L.access(d,b);e||d.addEventListener(a,c,!0),L.access(d,b,(e||0)+1)},teardown:function(){var d=this.ownerDocument||this,e=L.access(d,b)-1;e?L.access(d,b,e):(d.removeEventListener(a,c,!0),L.remove(d,b))}}}),o.fn.extend({on:function(a,b,c,d,e){var f,g;if("object"==typeof a){"string"!=typeof b&&(c=c||b,b=void 0);for(g in a)this.on(g,b,c,a[g],e);return this}if(null==c&&null==d?(d=b,c=b=void 0):null==d&&("string"==typeof b?(d=c,c=void 0):(d=c,c=b,b=void 0)),d===!1)d=$;else if(!d)return this;return 1===e&&(f=d,d=function(a){return o().off(a),f.apply(this,arguments)},d.guid=f.guid||(f.guid=o.guid++)),this.each(function(){o.event.add(this,a,d,c,b)})},one:function(a,b,c,d){return this.on(a,b,c,d,1)},off:function(a,b,c){var d,e;if(a&&a.preventDefault&&a.handleObj)return d=a.handleObj,o(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this;if("object"==typeof a){for(e in a)this.off(e,b,a[e]);return this}return(b===!1||"function"==typeof b)&&(c=b,b=void 0),c===!1&&(c=$),this.each(function(){o.event.remove(this,a,c,b)})},trigger:function(a,b){return this.each(function(){o.event.trigger(a,b,this)})},triggerHandler:function(a,b){var c=this[0];return c?o.event.trigger(a,b,c,!0):void 0}});var ab=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,bb=/<([\w:]+)/,cb=/<|&#?\w+;/,db=/<(?:script|style|link)/i,eb=/checked\s*(?:[^=]|=\s*.checked.)/i,fb=/^$|\/(?:java|ecma)script/i,gb=/^true\/(.*)/,hb=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,ib={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};ib.optgroup=ib.option,ib.tbody=ib.tfoot=ib.colgroup=ib.caption=ib.thead,ib.th=ib.td;function jb(a,b){return o.nodeName(a,"table")&&o.nodeName(11!==b.nodeType?b:b.firstChild,"tr")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function kb(a){return a.type=(null!==a.getAttribute("type"))+"/"+a.type,a}function lb(a){var b=gb.exec(a.type);return b?a.type=b[1]:a.removeAttribute("type"),a}function mb(a,b){for(var c=0,d=a.length;d>c;c++)L.set(a[c],"globalEval",!b||L.get(b[c],"globalEval"))}function nb(a,b){var c,d,e,f,g,h,i,j;if(1===b.nodeType){if(L.hasData(a)&&(f=L.access(a),g=L.set(b,f),j=f.events)){delete g.handle,g.events={};for(e in j)for(c=0,d=j[e].length;d>c;c++)o.event.add(b,e,j[e][c])}M.hasData(a)&&(h=M.access(a),i=o.extend({},h),M.set(b,i))}}function ob(a,b){var c=a.getElementsByTagName?a.getElementsByTagName(b||"*"):a.querySelectorAll?a.querySelectorAll(b||"*"):[];return void 0===b||b&&o.nodeName(a,b)?o.merge([a],c):c}function pb(a,b){var c=b.nodeName.toLowerCase();"input"===c&&T.test(a.type)?b.checked=a.checked:("input"===c||"textarea"===c)&&(b.defaultValue=a.defaultValue)}o.extend({clone:function(a,b,c){var d,e,f,g,h=a.cloneNode(!0),i=o.contains(a.ownerDocument,a);if(!(l.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||o.isXMLDoc(a)))for(g=ob(h),f=ob(a),d=0,e=f.length;e>d;d++)pb(f[d],g[d]);if(b)if(c)for(f=f||ob(a),g=g||ob(h),d=0,e=f.length;e>d;d++)nb(f[d],g[d]);else nb(a,h);return g=ob(h,"script"),g.length>0&&mb(g,!i&&ob(a,"script")),h},buildFragment:function(a,b,c,d){for(var e,f,g,h,i,j,k=b.createDocumentFragment(),l=[],m=0,n=a.length;n>m;m++)if(e=a[m],e||0===e)if("object"===o.type(e))o.merge(l,e.nodeType?[e]:e);else if(cb.test(e)){f=f||k.appendChild(b.createElement("div")),g=(bb.exec(e)||["",""])[1].toLowerCase(),h=ib[g]||ib._default,f.innerHTML=h[1]+e.replace(ab,"<$1></$2>")+h[2],j=h[0];while(j--)f=f.lastChild;o.merge(l,f.childNodes),f=k.firstChild,f.textContent=""}else l.push(b.createTextNode(e));k.textContent="",m=0;while(e=l[m++])if((!d||-1===o.inArray(e,d))&&(i=o.contains(e.ownerDocument,e),f=ob(k.appendChild(e),"script"),i&&mb(f),c)){j=0;while(e=f[j++])fb.test(e.type||"")&&c.push(e)}return k},cleanData:function(a){for(var b,c,d,e,f,g,h=o.event.special,i=0;void 0!==(c=a[i]);i++){if(o.acceptData(c)&&(f=c[L.expando],f&&(b=L.cache[f]))){if(d=Object.keys(b.events||{}),d.length)for(g=0;void 0!==(e=d[g]);g++)h[e]?o.event.remove(c,e):o.removeEvent(c,e,b.handle);L.cache[f]&&delete L.cache[f]}delete M.cache[c[M.expando]]}}}),o.fn.extend({text:function(a){return J(this,function(a){return void 0===a?o.text(this):this.empty().each(function(){(1===this.nodeType||11===this.nodeType||9===this.nodeType)&&(this.textContent=a)})},null,a,arguments.length)},append:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=jb(this,a);b.appendChild(a)}})},prepend:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=jb(this,a);b.insertBefore(a,b.firstChild)}})},before:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this)})},after:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling)})},remove:function(a,b){for(var c,d=a?o.filter(a,this):this,e=0;null!=(c=d[e]);e++)b||1!==c.nodeType||o.cleanData(ob(c)),c.parentNode&&(b&&o.contains(c.ownerDocument,c)&&mb(ob(c,"script")),c.parentNode.removeChild(c));return this},empty:function(){for(var a,b=0;null!=(a=this[b]);b++)1===a.nodeType&&(o.cleanData(ob(a,!1)),a.textContent="");return this},clone:function(a,b){return a=null==a?!1:a,b=null==b?a:b,this.map(function(){return o.clone(this,a,b)})},html:function(a){return J(this,function(a){var b=this[0]||{},c=0,d=this.length;if(void 0===a&&1===b.nodeType)return b.innerHTML;if("string"==typeof a&&!db.test(a)&&!ib[(bb.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(ab,"<$1></$2>");try{for(;d>c;c++)b=this[c]||{},1===b.nodeType&&(o.cleanData(ob(b,!1)),b.innerHTML=a);b=0}catch(e){}}b&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(){var a=arguments[0];return this.domManip(arguments,function(b){a=this.parentNode,o.cleanData(ob(this)),a&&a.replaceChild(b,this)}),a&&(a.length||a.nodeType)?this:this.remove()},detach:function(a){return this.remove(a,!0)},domManip:function(a,b){a=e.apply([],a);var c,d,f,g,h,i,j=0,k=this.length,m=this,n=k-1,p=a[0],q=o.isFunction(p);if(q||k>1&&"string"==typeof p&&!l.checkClone&&eb.test(p))return this.each(function(c){var d=m.eq(c);q&&(a[0]=p.call(this,c,d.html())),d.domManip(a,b)});if(k&&(c=o.buildFragment(a,this[0].ownerDocument,!1,this),d=c.firstChild,1===c.childNodes.length&&(c=d),d)){for(f=o.map(ob(c,"script"),kb),g=f.length;k>j;j++)h=c,j!==n&&(h=o.clone(h,!0,!0),g&&o.merge(f,ob(h,"script"))),b.call(this[j],h,j);if(g)for(i=f[f.length-1].ownerDocument,o.map(f,lb),j=0;g>j;j++)h=f[j],fb.test(h.type||"")&&!L.access(h,"globalEval")&&o.contains(i,h)&&(h.src?o._evalUrl&&o._evalUrl(h.src):o.globalEval(h.textContent.replace(hb,"")))}return this}}),o.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){o.fn[a]=function(a){for(var c,d=[],e=o(a),g=e.length-1,h=0;g>=h;h++)c=h===g?this:this.clone(!0),o(e[h])[b](c),f.apply(d,c.get());return this.pushStack(d)}});var qb,rb={};function sb(b,c){var d=o(c.createElement(b)).appendTo(c.body),e=a.getDefaultComputedStyle?a.getDefaultComputedStyle(d[0]).display:o.css(d[0],"display");return d.detach(),e}function tb(a){var b=m,c=rb[a];return c||(c=sb(a,b),"none"!==c&&c||(qb=(qb||o("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement),b=qb[0].contentDocument,b.write(),b.close(),c=sb(a,b),qb.detach()),rb[a]=c),c}var ub=/^margin/,vb=new RegExp("^("+Q+")(?!px)[a-z%]+$","i"),wb=function(a){return a.ownerDocument.defaultView.getComputedStyle(a,null)};function xb(a,b,c){var d,e,f,g,h=a.style;return c=c||wb(a),c&&(g=c.getPropertyValue(b)||c[b]),c&&(""!==g||o.contains(a.ownerDocument,a)||(g=o.style(a,b)),vb.test(g)&&ub.test(b)&&(d=h.width,e=h.minWidth,f=h.maxWidth,h.minWidth=h.maxWidth=h.width=g,g=c.width,h.width=d,h.minWidth=e,h.maxWidth=f)),void 0!==g?g+"":g}function yb(a,b){return{get:function(){return a()?void delete this.get:(this.get=b).apply(this,arguments)}}}!function(){var b,c,d="padding:0;margin:0;border:0;display:block;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box",e=m.documentElement,f=m.createElement("div"),g=m.createElement("div");g.style.backgroundClip="content-box",g.cloneNode(!0).style.backgroundClip="",l.clearCloneStyle="content-box"===g.style.backgroundClip,f.style.cssText="border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px",f.appendChild(g);function h(){g.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%",e.appendChild(f);var d=a.getComputedStyle(g,null);b="1%"!==d.top,c="4px"===d.width,e.removeChild(f)}a.getComputedStyle&&o.extend(l,{pixelPosition:function(){return h(),b},boxSizingReliable:function(){return null==c&&h(),c},reliableMarginRight:function(){var b,c=g.appendChild(m.createElement("div"));return c.style.cssText=g.style.cssText=d,c.style.marginRight=c.style.width="0",g.style.width="1px",e.appendChild(f),b=!parseFloat(a.getComputedStyle(c,null).marginRight),e.removeChild(f),g.innerHTML="",b}})}(),o.swap=function(a,b,c,d){var e,f,g={};for(f in b)g[f]=a.style[f],a.style[f]=b[f];e=c.apply(a,d||[]);for(f in b)a.style[f]=g[f];return e};var zb=/^(none|table(?!-c[ea]).+)/,Ab=new RegExp("^("+Q+")(.*)$","i"),Bb=new RegExp("^([+-])=("+Q+")","i"),Cb={position:"absolute",visibility:"hidden",display:"block"},Db={letterSpacing:0,fontWeight:400},Eb=["Webkit","O","Moz","ms"];function Fb(a,b){if(b in a)return b;var c=b[0].toUpperCase()+b.slice(1),d=b,e=Eb.length;while(e--)if(b=Eb[e]+c,b in a)return b;return d}function Gb(a,b,c){var d=Ab.exec(b);return d?Math.max(0,d[1]-(c||0))+(d[2]||"px"):b}function Hb(a,b,c,d,e){for(var f=c===(d?"border":"content")?4:"width"===b?1:0,g=0;4>f;f+=2)"margin"===c&&(g+=o.css(a,c+R[f],!0,e)),d?("content"===c&&(g-=o.css(a,"padding"+R[f],!0,e)),"margin"!==c&&(g-=o.css(a,"border"+R[f]+"Width",!0,e))):(g+=o.css(a,"padding"+R[f],!0,e),"padding"!==c&&(g+=o.css(a,"border"+R[f]+"Width",!0,e)));return g}function Ib(a,b,c){var d=!0,e="width"===b?a.offsetWidth:a.offsetHeight,f=wb(a),g="border-box"===o.css(a,"boxSizing",!1,f);if(0>=e||null==e){if(e=xb(a,b,f),(0>e||null==e)&&(e=a.style[b]),vb.test(e))return e;d=g&&(l.boxSizingReliable()||e===a.style[b]),e=parseFloat(e)||0}return e+Hb(a,b,c||(g?"border":"content"),d,f)+"px"}function Jb(a,b){for(var c,d,e,f=[],g=0,h=a.length;h>g;g++)d=a[g],d.style&&(f[g]=L.get(d,"olddisplay"),c=d.style.display,b?(f[g]||"none"!==c||(d.style.display=""),""===d.style.display&&S(d)&&(f[g]=L.access(d,"olddisplay",tb(d.nodeName)))):f[g]||(e=S(d),(c&&"none"!==c||!e)&&L.set(d,"olddisplay",e?c:o.css(d,"display"))));for(g=0;h>g;g++)d=a[g],d.style&&(b&&"none"!==d.style.display&&""!==d.style.display||(d.style.display=b?f[g]||"":"none"));return a}o.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=xb(a,"opacity");return""===c?"1":c}}}},cssNumber:{columnCount:!0,fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":"cssFloat"},style:function(a,b,c,d){if(a&&3!==a.nodeType&&8!==a.nodeType&&a.style){var e,f,g,h=o.camelCase(b),i=a.style;return b=o.cssProps[h]||(o.cssProps[h]=Fb(i,h)),g=o.cssHooks[b]||o.cssHooks[h],void 0===c?g&&"get"in g&&void 0!==(e=g.get(a,!1,d))?e:i[b]:(f=typeof c,"string"===f&&(e=Bb.exec(c))&&(c=(e[1]+1)*e[2]+parseFloat(o.css(a,b)),f="number"),null!=c&&c===c&&("number"!==f||o.cssNumber[h]||(c+="px"),l.clearCloneStyle||""!==c||0!==b.indexOf("background")||(i[b]="inherit"),g&&"set"in g&&void 0===(c=g.set(a,c,d))||(i[b]="",i[b]=c)),void 0)}},css:function(a,b,c,d){var e,f,g,h=o.camelCase(b);return b=o.cssProps[h]||(o.cssProps[h]=Fb(a.style,h)),g=o.cssHooks[b]||o.cssHooks[h],g&&"get"in g&&(e=g.get(a,!0,c)),void 0===e&&(e=xb(a,b,d)),"normal"===e&&b in Db&&(e=Db[b]),""===c||c?(f=parseFloat(e),c===!0||o.isNumeric(f)?f||0:e):e}}),o.each(["height","width"],function(a,b){o.cssHooks[b]={get:function(a,c,d){return c?0===a.offsetWidth&&zb.test(o.css(a,"display"))?o.swap(a,Cb,function(){return Ib(a,b,d)}):Ib(a,b,d):void 0},set:function(a,c,d){var e=d&&wb(a);return Gb(a,c,d?Hb(a,b,d,"border-box"===o.css(a,"boxSizing",!1,e),e):0)}}}),o.cssHooks.marginRight=yb(l.reliableMarginRight,function(a,b){return b?o.swap(a,{display:"inline-block"},xb,[a,"marginRight"]):void 0}),o.each({margin:"",padding:"",border:"Width"},function(a,b){o.cssHooks[a+b]={expand:function(c){for(var d=0,e={},f="string"==typeof c?c.split(" "):[c];4>d;d++)e[a+R[d]+b]=f[d]||f[d-2]||f[0];return e}},ub.test(a)||(o.cssHooks[a+b].set=Gb)}),o.fn.extend({css:function(a,b){return J(this,function(a,b,c){var d,e,f={},g=0;if(o.isArray(b)){for(d=wb(a),e=b.length;e>g;g++)f[b[g]]=o.css(a,b[g],!1,d);return f}return void 0!==c?o.style(a,b,c):o.css(a,b)},a,b,arguments.length>1)},show:function(){return Jb(this,!0)},hide:function(){return Jb(this)},toggle:function(a){return"boolean"==typeof a?a?this.show():this.hide():this.each(function(){S(this)?o(this).show():o(this).hide()})}});function Kb(a,b,c,d,e){return new Kb.prototype.init(a,b,c,d,e)}o.Tween=Kb,Kb.prototype={constructor:Kb,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||"swing",this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(o.cssNumber[c]?"":"px")},cur:function(){var a=Kb.propHooks[this.prop];return a&&a.get?a.get(this):Kb.propHooks._default.get(this)},run:function(a){var b,c=Kb.propHooks[this.prop];return this.pos=b=this.options.duration?o.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):Kb.propHooks._default.set(this),this}},Kb.prototype.init.prototype=Kb.prototype,Kb.propHooks={_default:{get:function(a){var b;return null==a.elem[a.prop]||a.elem.style&&null!=a.elem.style[a.prop]?(b=o.css(a.elem,a.prop,""),b&&"auto"!==b?b:0):a.elem[a.prop]},set:function(a){o.fx.step[a.prop]?o.fx.step[a.prop](a):a.elem.style&&(null!=a.elem.style[o.cssProps[a.prop]]||o.cssHooks[a.prop])?o.style(a.elem,a.prop,a.now+a.unit):a.elem[a.prop]=a.now}}},Kb.propHooks.scrollTop=Kb.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},o.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2}},o.fx=Kb.prototype.init,o.fx.step={};var Lb,Mb,Nb=/^(?:toggle|show|hide)$/,Ob=new RegExp("^(?:([+-])=|)("+Q+")([a-z%]*)$","i"),Pb=/queueHooks$/,Qb=[Vb],Rb={"*":[function(a,b){var c=this.createTween(a,b),d=c.cur(),e=Ob.exec(b),f=e&&e[3]||(o.cssNumber[a]?"":"px"),g=(o.cssNumber[a]||"px"!==f&&+d)&&Ob.exec(o.css(c.elem,a)),h=1,i=20;if(g&&g[3]!==f){f=f||g[3],e=e||[],g=+d||1;do h=h||".5",g/=h,o.style(c.elem,a,g+f);while(h!==(h=c.cur()/d)&&1!==h&&--i)}return e&&(g=c.start=+g||+d||0,c.unit=f,c.end=e[1]?g+(e[1]+1)*e[2]:+e[2]),c}]};function Sb(){return setTimeout(function(){Lb=void 0}),Lb=o.now()}function Tb(a,b){var c,d=0,e={height:a};for(b=b?1:0;4>d;d+=2-b)c=R[d],e["margin"+c]=e["padding"+c]=a;return b&&(e.opacity=e.width=a),e}function Ub(a,b,c){for(var d,e=(Rb[b]||[]).concat(Rb["*"]),f=0,g=e.length;g>f;f++)if(d=e[f].call(c,b,a))return d}function Vb(a,b,c){var d,e,f,g,h,i,j,k=this,l={},m=a.style,n=a.nodeType&&S(a),p=L.get(a,"fxshow");c.queue||(h=o._queueHooks(a,"fx"),null==h.unqueued&&(h.unqueued=0,i=h.empty.fire,h.empty.fire=function(){h.unqueued||i()}),h.unqueued++,k.always(function(){k.always(function(){h.unqueued--,o.queue(a,"fx").length||h.empty.fire()})})),1===a.nodeType&&("height"in b||"width"in b)&&(c.overflow=[m.overflow,m.overflowX,m.overflowY],j=o.css(a,"display"),"none"===j&&(j=tb(a.nodeName)),"inline"===j&&"none"===o.css(a,"float")&&(m.display="inline-block")),c.overflow&&(m.overflow="hidden",k.always(function(){m.overflow=c.overflow[0],m.overflowX=c.overflow[1],m.overflowY=c.overflow[2]}));for(d in b)if(e=b[d],Nb.exec(e)){if(delete b[d],f=f||"toggle"===e,e===(n?"hide":"show")){if("show"!==e||!p||void 0===p[d])continue;n=!0}l[d]=p&&p[d]||o.style(a,d)}if(!o.isEmptyObject(l)){p?"hidden"in p&&(n=p.hidden):p=L.access(a,"fxshow",{}),f&&(p.hidden=!n),n?o(a).show():k.done(function(){o(a).hide()}),k.done(function(){var b;L.remove(a,"fxshow");for(b in l)o.style(a,b,l[b])});for(d in l)g=Ub(n?p[d]:0,d,k),d in p||(p[d]=g.start,n&&(g.end=g.start,g.start="width"===d||"height"===d?1:0))}}function Wb(a,b){var c,d,e,f,g;for(c in a)if(d=o.camelCase(c),e=b[d],f=a[c],o.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=o.cssHooks[d],g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}function Xb(a,b,c){var d,e,f=0,g=Qb.length,h=o.Deferred().always(function(){delete i.elem}),i=function(){if(e)return!1;for(var b=Lb||Sb(),c=Math.max(0,j.startTime+j.duration-b),d=c/j.duration||0,f=1-d,g=0,i=j.tweens.length;i>g;g++)j.tweens[g].run(f);return h.notifyWith(a,[j,f,c]),1>f&&i?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:o.extend({},b),opts:o.extend(!0,{specialEasing:{}},c),originalProperties:b,originalOptions:c,startTime:Lb||Sb(),duration:c.duration,tweens:[],createTween:function(b,c){var d=o.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(d),d},stop:function(b){var c=0,d=b?j.tweens.length:0;if(e)return this;for(e=!0;d>c;c++)j.tweens[c].run(1);return b?h.resolveWith(a,[j,b]):h.rejectWith(a,[j,b]),this}}),k=j.props;for(Wb(k,j.opts.specialEasing);g>f;f++)if(d=Qb[f].call(j,a,k,j.opts))return d;return o.map(k,Ub,j),o.isFunction(j.opts.start)&&j.opts.start.call(a,j),o.fx.timer(o.extend(i,{elem:a,anim:j,queue:j.opts.queue})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}o.Animation=o.extend(Xb,{tweener:function(a,b){o.isFunction(a)?(b=a,a=["*"]):a=a.split(" ");for(var c,d=0,e=a.length;e>d;d++)c=a[d],Rb[c]=Rb[c]||[],Rb[c].unshift(b)},prefilter:function(a,b){b?Qb.unshift(a):Qb.push(a)}}),o.speed=function(a,b,c){var d=a&&"object"==typeof a?o.extend({},a):{complete:c||!c&&b||o.isFunction(a)&&a,duration:a,easing:c&&b||b&&!o.isFunction(b)&&b};return d.duration=o.fx.off?0:"number"==typeof d.duration?d.duration:d.duration in o.fx.speeds?o.fx.speeds[d.duration]:o.fx.speeds._default,(null==d.queue||d.queue===!0)&&(d.queue="fx"),d.old=d.complete,d.complete=function(){o.isFunction(d.old)&&d.old.call(this),d.queue&&o.dequeue(this,d.queue)},d},o.fn.extend({fadeTo:function(a,b,c,d){return this.filter(S).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=o.isEmptyObject(a),f=o.speed(b,c,d),g=function(){var b=Xb(this,o.extend({},a),f);(e||L.get(this,"finish"))&&b.stop(!0)};return g.finish=g,e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,b,c){var d=function(a){var b=a.stop;delete a.stop,b(c)};return"string"!=typeof a&&(c=b,b=a,a=void 0),b&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,e=null!=a&&a+"queueHooks",f=o.timers,g=L.get(this);if(e)g[e]&&g[e].stop&&d(g[e]);else for(e in g)g[e]&&g[e].stop&&Pb.test(e)&&d(g[e]);for(e=f.length;e--;)f[e].elem!==this||null!=a&&f[e].queue!==a||(f[e].anim.stop(c),b=!1,f.splice(e,1));(b||!c)&&o.dequeue(this,a)})},finish:function(a){return a!==!1&&(a=a||"fx"),this.each(function(){var b,c=L.get(this),d=c[a+"queue"],e=c[a+"queueHooks"],f=o.timers,g=d?d.length:0;for(c.finish=!0,o.queue(this,a,[]),e&&e.stop&&e.stop.call(this,!0),b=f.length;b--;)f[b].elem===this&&f[b].queue===a&&(f[b].anim.stop(!0),f.splice(b,1));for(b=0;g>b;b++)d[b]&&d[b].finish&&d[b].finish.call(this);delete c.finish})}}),o.each(["toggle","show","hide"],function(a,b){var c=o.fn[b];o.fn[b]=function(a,d,e){return null==a||"boolean"==typeof a?c.apply(this,arguments):this.animate(Tb(b,!0),a,d,e)}}),o.each({slideDown:Tb("show"),slideUp:Tb("hide"),slideToggle:Tb("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){o.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),o.timers=[],o.fx.tick=function(){var a,b=0,c=o.timers;for(Lb=o.now();b<c.length;b++)a=c[b],a()||c[b]!==a||c.splice(b--,1);c.length||o.fx.stop(),Lb=void 0},o.fx.timer=function(a){o.timers.push(a),a()?o.fx.start():o.timers.pop()},o.fx.interval=13,o.fx.start=function(){Mb||(Mb=setInterval(o.fx.tick,o.fx.interval))},o.fx.stop=function(){clearInterval(Mb),Mb=null},o.fx.speeds={slow:600,fast:200,_default:400},o.fn.delay=function(a,b){return a=o.fx?o.fx.speeds[a]||a:a,b=b||"fx",this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},function(){var a=m.createElement("input"),b=m.createElement("select"),c=b.appendChild(m.createElement("option"));a.type="checkbox",l.checkOn=""!==a.value,l.optSelected=c.selected,b.disabled=!0,l.optDisabled=!c.disabled,a=m.createElement("input"),a.value="t",a.type="radio",l.radioValue="t"===a.value}();var Yb,Zb,$b=o.expr.attrHandle;o.fn.extend({attr:function(a,b){return J(this,o.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){o.removeAttr(this,a)})}}),o.extend({attr:function(a,b,c){var d,e,f=a.nodeType;if(a&&3!==f&&8!==f&&2!==f)return typeof a.getAttribute===U?o.prop(a,b,c):(1===f&&o.isXMLDoc(a)||(b=b.toLowerCase(),d=o.attrHooks[b]||(o.expr.match.bool.test(b)?Zb:Yb)),void 0===c?d&&"get"in d&&null!==(e=d.get(a,b))?e:(e=o.find.attr(a,b),null==e?void 0:e):null!==c?d&&"set"in d&&void 0!==(e=d.set(a,c,b))?e:(a.setAttribute(b,c+""),c):void o.removeAttr(a,b))},removeAttr:function(a,b){var c,d,e=0,f=b&&b.match(E);if(f&&1===a.nodeType)while(c=f[e++])d=o.propFix[c]||c,o.expr.match.bool.test(c)&&(a[d]=!1),a.removeAttribute(c)},attrHooks:{type:{set:function(a,b){if(!l.radioValue&&"radio"===b&&o.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}}}}),Zb={set:function(a,b,c){return b===!1?o.removeAttr(a,c):a.setAttribute(c,c),c}},o.each(o.expr.match.bool.source.match(/\w+/g),function(a,b){var c=$b[b]||o.find.attr;$b[b]=function(a,b,d){var e,f;
return d||(f=$b[b],$b[b]=e,e=null!=c(a,b,d)?b.toLowerCase():null,$b[b]=f),e}});var _b=/^(?:input|select|textarea|button)$/i;o.fn.extend({prop:function(a,b){return J(this,o.prop,a,b,arguments.length>1)},removeProp:function(a){return this.each(function(){delete this[o.propFix[a]||a]})}}),o.extend({propFix:{"for":"htmlFor","class":"className"},prop:function(a,b,c){var d,e,f,g=a.nodeType;if(a&&3!==g&&8!==g&&2!==g)return f=1!==g||!o.isXMLDoc(a),f&&(b=o.propFix[b]||b,e=o.propHooks[b]),void 0!==c?e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:a[b]=c:e&&"get"in e&&null!==(d=e.get(a,b))?d:a[b]},propHooks:{tabIndex:{get:function(a){return a.hasAttribute("tabindex")||_b.test(a.nodeName)||a.href?a.tabIndex:-1}}}}),l.optSelected||(o.propHooks.selected={get:function(a){var b=a.parentNode;return b&&b.parentNode&&b.parentNode.selectedIndex,null}}),o.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){o.propFix[this.toLowerCase()]=this});var ac=/[\t\r\n\f]/g;o.fn.extend({addClass:function(a){var b,c,d,e,f,g,h="string"==typeof a&&a,i=0,j=this.length;if(o.isFunction(a))return this.each(function(b){o(this).addClass(a.call(this,b,this.className))});if(h)for(b=(a||"").match(E)||[];j>i;i++)if(c=this[i],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(ac," "):" ")){f=0;while(e=b[f++])d.indexOf(" "+e+" ")<0&&(d+=e+" ");g=o.trim(d),c.className!==g&&(c.className=g)}return this},removeClass:function(a){var b,c,d,e,f,g,h=0===arguments.length||"string"==typeof a&&a,i=0,j=this.length;if(o.isFunction(a))return this.each(function(b){o(this).removeClass(a.call(this,b,this.className))});if(h)for(b=(a||"").match(E)||[];j>i;i++)if(c=this[i],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(ac," "):"")){f=0;while(e=b[f++])while(d.indexOf(" "+e+" ")>=0)d=d.replace(" "+e+" "," ");g=a?o.trim(d):"",c.className!==g&&(c.className=g)}return this},toggleClass:function(a,b){var c=typeof a;return"boolean"==typeof b&&"string"===c?b?this.addClass(a):this.removeClass(a):this.each(o.isFunction(a)?function(c){o(this).toggleClass(a.call(this,c,this.className,b),b)}:function(){if("string"===c){var b,d=0,e=o(this),f=a.match(E)||[];while(b=f[d++])e.hasClass(b)?e.removeClass(b):e.addClass(b)}else(c===U||"boolean"===c)&&(this.className&&L.set(this,"__className__",this.className),this.className=this.className||a===!1?"":L.get(this,"__className__")||"")})},hasClass:function(a){for(var b=" "+a+" ",c=0,d=this.length;d>c;c++)if(1===this[c].nodeType&&(" "+this[c].className+" ").replace(ac," ").indexOf(b)>=0)return!0;return!1}});var bc=/\r/g;o.fn.extend({val:function(a){var b,c,d,e=this[0];{if(arguments.length)return d=o.isFunction(a),this.each(function(c){var e;1===this.nodeType&&(e=d?a.call(this,c,o(this).val()):a,null==e?e="":"number"==typeof e?e+="":o.isArray(e)&&(e=o.map(e,function(a){return null==a?"":a+""})),b=o.valHooks[this.type]||o.valHooks[this.nodeName.toLowerCase()],b&&"set"in b&&void 0!==b.set(this,e,"value")||(this.value=e))});if(e)return b=o.valHooks[e.type]||o.valHooks[e.nodeName.toLowerCase()],b&&"get"in b&&void 0!==(c=b.get(e,"value"))?c:(c=e.value,"string"==typeof c?c.replace(bc,""):null==c?"":c)}}}),o.extend({valHooks:{select:{get:function(a){for(var b,c,d=a.options,e=a.selectedIndex,f="select-one"===a.type||0>e,g=f?null:[],h=f?e+1:d.length,i=0>e?h:f?e:0;h>i;i++)if(c=d[i],!(!c.selected&&i!==e||(l.optDisabled?c.disabled:null!==c.getAttribute("disabled"))||c.parentNode.disabled&&o.nodeName(c.parentNode,"optgroup"))){if(b=o(c).val(),f)return b;g.push(b)}return g},set:function(a,b){var c,d,e=a.options,f=o.makeArray(b),g=e.length;while(g--)d=e[g],(d.selected=o.inArray(o(d).val(),f)>=0)&&(c=!0);return c||(a.selectedIndex=-1),f}}}}),o.each(["radio","checkbox"],function(){o.valHooks[this]={set:function(a,b){return o.isArray(b)?a.checked=o.inArray(o(a).val(),b)>=0:void 0}},l.checkOn||(o.valHooks[this].get=function(a){return null===a.getAttribute("value")?"on":a.value})}),o.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){o.fn[b]=function(a,c){return arguments.length>0?this.on(b,null,a,c):this.trigger(b)}}),o.fn.extend({hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)}});var cc=o.now(),dc=/\?/;o.parseJSON=function(a){return JSON.parse(a+"")},o.parseXML=function(a){var b,c;if(!a||"string"!=typeof a)return null;try{c=new DOMParser,b=c.parseFromString(a,"text/xml")}catch(d){b=void 0}return(!b||b.getElementsByTagName("parsererror").length)&&o.error("Invalid XML: "+a),b};var ec,fc,gc=/#.*$/,hc=/([?&])_=[^&]*/,ic=/^(.*?):[ \t]*([^\r\n]*)$/gm,jc=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,kc=/^(?:GET|HEAD)$/,lc=/^\/\//,mc=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,nc={},oc={},pc="*/".concat("*");try{fc=location.href}catch(qc){fc=m.createElement("a"),fc.href="",fc=fc.href}ec=mc.exec(fc.toLowerCase())||[];function rc(a){return function(b,c){"string"!=typeof b&&(c=b,b="*");var d,e=0,f=b.toLowerCase().match(E)||[];if(o.isFunction(c))while(d=f[e++])"+"===d[0]?(d=d.slice(1)||"*",(a[d]=a[d]||[]).unshift(c)):(a[d]=a[d]||[]).push(c)}}function sc(a,b,c,d){var e={},f=a===oc;function g(h){var i;return e[h]=!0,o.each(a[h]||[],function(a,h){var j=h(b,c,d);return"string"!=typeof j||f||e[j]?f?!(i=j):void 0:(b.dataTypes.unshift(j),g(j),!1)}),i}return g(b.dataTypes[0])||!e["*"]&&g("*")}function tc(a,b){var c,d,e=o.ajaxSettings.flatOptions||{};for(c in b)void 0!==b[c]&&((e[c]?a:d||(d={}))[c]=b[c]);return d&&o.extend(!0,a,d),a}function uc(a,b,c){var d,e,f,g,h=a.contents,i=a.dataTypes;while("*"===i[0])i.shift(),void 0===d&&(d=a.mimeType||b.getResponseHeader("Content-Type"));if(d)for(e in h)if(h[e]&&h[e].test(d)){i.unshift(e);break}if(i[0]in c)f=i[0];else{for(e in c){if(!i[0]||a.converters[e+" "+i[0]]){f=e;break}g||(g=e)}f=f||g}return f?(f!==i[0]&&i.unshift(f),c[f]):void 0}function vc(a,b,c,d){var e,f,g,h,i,j={},k=a.dataTypes.slice();if(k[1])for(g in a.converters)j[g.toLowerCase()]=a.converters[g];f=k.shift();while(f)if(a.responseFields[f]&&(c[a.responseFields[f]]=b),!i&&d&&a.dataFilter&&(b=a.dataFilter(b,a.dataType)),i=f,f=k.shift())if("*"===f)f=i;else if("*"!==i&&i!==f){if(g=j[i+" "+f]||j["* "+f],!g)for(e in j)if(h=e.split(" "),h[1]===f&&(g=j[i+" "+h[0]]||j["* "+h[0]])){g===!0?g=j[e]:j[e]!==!0&&(f=h[0],k.unshift(h[1]));break}if(g!==!0)if(g&&a["throws"])b=g(b);else try{b=g(b)}catch(l){return{state:"parsererror",error:g?l:"No conversion from "+i+" to "+f}}}return{state:"success",data:b}}o.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:fc,type:"GET",isLocal:jc.test(ec[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":pc,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":o.parseJSON,"text xml":o.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(a,b){return b?tc(tc(a,o.ajaxSettings),b):tc(o.ajaxSettings,a)},ajaxPrefilter:rc(nc),ajaxTransport:rc(oc),ajax:function(a,b){"object"==typeof a&&(b=a,a=void 0),b=b||{};var c,d,e,f,g,h,i,j,k=o.ajaxSetup({},b),l=k.context||k,m=k.context&&(l.nodeType||l.jquery)?o(l):o.event,n=o.Deferred(),p=o.Callbacks("once memory"),q=k.statusCode||{},r={},s={},t=0,u="canceled",v={readyState:0,getResponseHeader:function(a){var b;if(2===t){if(!f){f={};while(b=ic.exec(e))f[b[1].toLowerCase()]=b[2]}b=f[a.toLowerCase()]}return null==b?null:b},getAllResponseHeaders:function(){return 2===t?e:null},setRequestHeader:function(a,b){var c=a.toLowerCase();return t||(a=s[c]=s[c]||a,r[a]=b),this},overrideMimeType:function(a){return t||(k.mimeType=a),this},statusCode:function(a){var b;if(a)if(2>t)for(b in a)q[b]=[q[b],a[b]];else v.always(a[v.status]);return this},abort:function(a){var b=a||u;return c&&c.abort(b),x(0,b),this}};if(n.promise(v).complete=p.add,v.success=v.done,v.error=v.fail,k.url=((a||k.url||fc)+"").replace(gc,"").replace(lc,ec[1]+"//"),k.type=b.method||b.type||k.method||k.type,k.dataTypes=o.trim(k.dataType||"*").toLowerCase().match(E)||[""],null==k.crossDomain&&(h=mc.exec(k.url.toLowerCase()),k.crossDomain=!(!h||h[1]===ec[1]&&h[2]===ec[2]&&(h[3]||("http:"===h[1]?"80":"443"))===(ec[3]||("http:"===ec[1]?"80":"443")))),k.data&&k.processData&&"string"!=typeof k.data&&(k.data=o.param(k.data,k.traditional)),sc(nc,k,b,v),2===t)return v;i=k.global,i&&0===o.active++&&o.event.trigger("ajaxStart"),k.type=k.type.toUpperCase(),k.hasContent=!kc.test(k.type),d=k.url,k.hasContent||(k.data&&(d=k.url+=(dc.test(d)?"&":"?")+k.data,delete k.data),k.cache===!1&&(k.url=hc.test(d)?d.replace(hc,"$1_="+cc++):d+(dc.test(d)?"&":"?")+"_="+cc++)),k.ifModified&&(o.lastModified[d]&&v.setRequestHeader("If-Modified-Since",o.lastModified[d]),o.etag[d]&&v.setRequestHeader("If-None-Match",o.etag[d])),(k.data&&k.hasContent&&k.contentType!==!1||b.contentType)&&v.setRequestHeader("Content-Type",k.contentType),v.setRequestHeader("Accept",k.dataTypes[0]&&k.accepts[k.dataTypes[0]]?k.accepts[k.dataTypes[0]]+("*"!==k.dataTypes[0]?", "+pc+"; q=0.01":""):k.accepts["*"]);for(j in k.headers)v.setRequestHeader(j,k.headers[j]);if(k.beforeSend&&(k.beforeSend.call(l,v,k)===!1||2===t))return v.abort();u="abort";for(j in{success:1,error:1,complete:1})v[j](k[j]);if(c=sc(oc,k,b,v)){v.readyState=1,i&&m.trigger("ajaxSend",[v,k]),k.async&&k.timeout>0&&(g=setTimeout(function(){v.abort("timeout")},k.timeout));try{t=1,c.send(r,x)}catch(w){if(!(2>t))throw w;x(-1,w)}}else x(-1,"No Transport");function x(a,b,f,h){var j,r,s,u,w,x=b;2!==t&&(t=2,g&&clearTimeout(g),c=void 0,e=h||"",v.readyState=a>0?4:0,j=a>=200&&300>a||304===a,f&&(u=uc(k,v,f)),u=vc(k,u,v,j),j?(k.ifModified&&(w=v.getResponseHeader("Last-Modified"),w&&(o.lastModified[d]=w),w=v.getResponseHeader("etag"),w&&(o.etag[d]=w)),204===a||"HEAD"===k.type?x="nocontent":304===a?x="notmodified":(x=u.state,r=u.data,s=u.error,j=!s)):(s=x,(a||!x)&&(x="error",0>a&&(a=0))),v.status=a,v.statusText=(b||x)+"",j?n.resolveWith(l,[r,x,v]):n.rejectWith(l,[v,x,s]),v.statusCode(q),q=void 0,i&&m.trigger(j?"ajaxSuccess":"ajaxError",[v,k,j?r:s]),p.fireWith(l,[v,x]),i&&(m.trigger("ajaxComplete",[v,k]),--o.active||o.event.trigger("ajaxStop")))}return v},getJSON:function(a,b,c){return o.get(a,b,c,"json")},getScript:function(a,b){return o.get(a,void 0,b,"script")}}),o.each(["get","post"],function(a,b){o[b]=function(a,c,d,e){return o.isFunction(c)&&(e=e||d,d=c,c=void 0),o.ajax({url:a,type:b,dataType:e,data:c,success:d})}}),o.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(a,b){o.fn[b]=function(a){return this.on(b,a)}}),o._evalUrl=function(a){return o.ajax({url:a,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})},o.fn.extend({wrapAll:function(a){var b;return o.isFunction(a)?this.each(function(b){o(this).wrapAll(a.call(this,b))}):(this[0]&&(b=o(a,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstElementChild)a=a.firstElementChild;return a}).append(this)),this)},wrapInner:function(a){return this.each(o.isFunction(a)?function(b){o(this).wrapInner(a.call(this,b))}:function(){var b=o(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=o.isFunction(a);return this.each(function(c){o(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){o.nodeName(this,"body")||o(this).replaceWith(this.childNodes)}).end()}}),o.expr.filters.hidden=function(a){return a.offsetWidth<=0&&a.offsetHeight<=0},o.expr.filters.visible=function(a){return!o.expr.filters.hidden(a)};var wc=/%20/g,xc=/\[\]$/,yc=/\r?\n/g,zc=/^(?:submit|button|image|reset|file)$/i,Ac=/^(?:input|select|textarea|keygen)/i;function Bc(a,b,c,d){var e;if(o.isArray(b))o.each(b,function(b,e){c||xc.test(a)?d(a,e):Bc(a+"["+("object"==typeof e?b:"")+"]",e,c,d)});else if(c||"object"!==o.type(b))d(a,b);else for(e in b)Bc(a+"["+e+"]",b[e],c,d)}o.param=function(a,b){var c,d=[],e=function(a,b){b=o.isFunction(b)?b():null==b?"":b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};if(void 0===b&&(b=o.ajaxSettings&&o.ajaxSettings.traditional),o.isArray(a)||a.jquery&&!o.isPlainObject(a))o.each(a,function(){e(this.name,this.value)});else for(c in a)Bc(c,a[c],b,e);return d.join("&").replace(wc,"+")},o.fn.extend({serialize:function(){return o.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var a=o.prop(this,"elements");return a?o.makeArray(a):this}).filter(function(){var a=this.type;return this.name&&!o(this).is(":disabled")&&Ac.test(this.nodeName)&&!zc.test(a)&&(this.checked||!T.test(a))}).map(function(a,b){var c=o(this).val();return null==c?null:o.isArray(c)?o.map(c,function(a){return{name:b.name,value:a.replace(yc,"\r\n")}}):{name:b.name,value:c.replace(yc,"\r\n")}}).get()}}),o.ajaxSettings.xhr=function(){try{return new XMLHttpRequest}catch(a){}};var Cc=0,Dc={},Ec={0:200,1223:204},Fc=o.ajaxSettings.xhr();a.ActiveXObject&&o(a).on("unload",function(){for(var a in Dc)Dc[a]()}),l.cors=!!Fc&&"withCredentials"in Fc,l.ajax=Fc=!!Fc,o.ajaxTransport(function(a){var b;return l.cors||Fc&&!a.crossDomain?{send:function(c,d){var e,f=a.xhr(),g=++Cc;if(f.open(a.type,a.url,a.async,a.username,a.password),a.xhrFields)for(e in a.xhrFields)f[e]=a.xhrFields[e];a.mimeType&&f.overrideMimeType&&f.overrideMimeType(a.mimeType),a.crossDomain||c["X-Requested-With"]||(c["X-Requested-With"]="XMLHttpRequest");for(e in c)f.setRequestHeader(e,c[e]);b=function(a){return function(){b&&(delete Dc[g],b=f.onload=f.onerror=null,"abort"===a?f.abort():"error"===a?d(f.status,f.statusText):d(Ec[f.status]||f.status,f.statusText,"string"==typeof f.responseText?{text:f.responseText}:void 0,f.getAllResponseHeaders()))}},f.onload=b(),f.onerror=b("error"),b=Dc[g]=b("abort"),f.send(a.hasContent&&a.data||null)},abort:function(){b&&b()}}:void 0}),o.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(a){return o.globalEval(a),a}}}),o.ajaxPrefilter("script",function(a){void 0===a.cache&&(a.cache=!1),a.crossDomain&&(a.type="GET")}),o.ajaxTransport("script",function(a){if(a.crossDomain){var b,c;return{send:function(d,e){b=o("<script>").prop({async:!0,charset:a.scriptCharset,src:a.url}).on("load error",c=function(a){b.remove(),c=null,a&&e("error"===a.type?404:200,a.type)}),m.head.appendChild(b[0])},abort:function(){c&&c()}}}});var Gc=[],Hc=/(=)\?(?=&|$)|\?\?/;o.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=Gc.pop()||o.expando+"_"+cc++;return this[a]=!0,a}}),o.ajaxPrefilter("json jsonp",function(b,c,d){var e,f,g,h=b.jsonp!==!1&&(Hc.test(b.url)?"url":"string"==typeof b.data&&!(b.contentType||"").indexOf("application/x-www-form-urlencoded")&&Hc.test(b.data)&&"data");return h||"jsonp"===b.dataTypes[0]?(e=b.jsonpCallback=o.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,h?b[h]=b[h].replace(Hc,"$1"+e):b.jsonp!==!1&&(b.url+=(dc.test(b.url)?"&":"?")+b.jsonp+"="+e),b.converters["script json"]=function(){return g||o.error(e+" was not called"),g[0]},b.dataTypes[0]="json",f=a[e],a[e]=function(){g=arguments},d.always(function(){a[e]=f,b[e]&&(b.jsonpCallback=c.jsonpCallback,Gc.push(e)),g&&o.isFunction(f)&&f(g[0]),g=f=void 0}),"script"):void 0}),o.parseHTML=function(a,b,c){if(!a||"string"!=typeof a)return null;"boolean"==typeof b&&(c=b,b=!1),b=b||m;var d=v.exec(a),e=!c&&[];return d?[b.createElement(d[1])]:(d=o.buildFragment([a],b,e),e&&e.length&&o(e).remove(),o.merge([],d.childNodes))};var Ic=o.fn.load;o.fn.load=function(a,b,c){if("string"!=typeof a&&Ic)return Ic.apply(this,arguments);var d,e,f,g=this,h=a.indexOf(" ");return h>=0&&(d=a.slice(h),a=a.slice(0,h)),o.isFunction(b)?(c=b,b=void 0):b&&"object"==typeof b&&(e="POST"),g.length>0&&o.ajax({url:a,type:e,dataType:"html",data:b}).done(function(a){f=arguments,g.html(d?o("<div>").append(o.parseHTML(a)).find(d):a)}).complete(c&&function(a,b){g.each(c,f||[a.responseText,b,a])}),this},o.expr.filters.animated=function(a){return o.grep(o.timers,function(b){return a===b.elem}).length};var Jc=a.document.documentElement;function Kc(a){return o.isWindow(a)?a:9===a.nodeType&&a.defaultView}o.offset={setOffset:function(a,b,c){var d,e,f,g,h,i,j,k=o.css(a,"position"),l=o(a),m={};"static"===k&&(a.style.position="relative"),h=l.offset(),f=o.css(a,"top"),i=o.css(a,"left"),j=("absolute"===k||"fixed"===k)&&(f+i).indexOf("auto")>-1,j?(d=l.position(),g=d.top,e=d.left):(g=parseFloat(f)||0,e=parseFloat(i)||0),o.isFunction(b)&&(b=b.call(a,c,h)),null!=b.top&&(m.top=b.top-h.top+g),null!=b.left&&(m.left=b.left-h.left+e),"using"in b?b.using.call(a,m):l.css(m)}},o.fn.extend({offset:function(a){if(arguments.length)return void 0===a?this:this.each(function(b){o.offset.setOffset(this,a,b)});var b,c,d=this[0],e={top:0,left:0},f=d&&d.ownerDocument;if(f)return b=f.documentElement,o.contains(b,d)?(typeof d.getBoundingClientRect!==U&&(e=d.getBoundingClientRect()),c=Kc(f),{top:e.top+c.pageYOffset-b.clientTop,left:e.left+c.pageXOffset-b.clientLeft}):e},position:function(){if(this[0]){var a,b,c=this[0],d={top:0,left:0};return"fixed"===o.css(c,"position")?b=c.getBoundingClientRect():(a=this.offsetParent(),b=this.offset(),o.nodeName(a[0],"html")||(d=a.offset()),d.top+=o.css(a[0],"borderTopWidth",!0),d.left+=o.css(a[0],"borderLeftWidth",!0)),{top:b.top-d.top-o.css(c,"marginTop",!0),left:b.left-d.left-o.css(c,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||Jc;while(a&&!o.nodeName(a,"html")&&"static"===o.css(a,"position"))a=a.offsetParent;return a||Jc})}}),o.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(b,c){var d="pageYOffset"===c;o.fn[b]=function(e){return J(this,function(b,e,f){var g=Kc(b);return void 0===f?g?g[c]:b[e]:void(g?g.scrollTo(d?a.pageXOffset:f,d?f:a.pageYOffset):b[e]=f)},b,e,arguments.length,null)}}),o.each(["top","left"],function(a,b){o.cssHooks[b]=yb(l.pixelPosition,function(a,c){return c?(c=xb(a,b),vb.test(c)?o(a).position()[b]+"px":c):void 0})}),o.each({Height:"height",Width:"width"},function(a,b){o.each({padding:"inner"+a,content:b,"":"outer"+a},function(c,d){o.fn[d]=function(d,e){var f=arguments.length&&(c||"boolean"!=typeof d),g=c||(d===!0||e===!0?"margin":"border");return J(this,function(b,c,d){var e;return o.isWindow(b)?b.document.documentElement["client"+a]:9===b.nodeType?(e=b.documentElement,Math.max(b.body["scroll"+a],e["scroll"+a],b.body["offset"+a],e["offset"+a],e["client"+a])):void 0===d?o.css(b,c,g):o.style(b,c,d,g)},b,f?d:void 0,f,null)}})}),o.fn.size=function(){return this.length},o.fn.andSelf=o.fn.addBack,"function"==typeof define&&define.amd&&define("jquery",[],function(){return o});var Lc=a.jQuery,Mc=a.$;return o.noConflict=function(b){return a.$===o&&(a.$=Mc),b&&a.jQuery===o&&(a.jQuery=Lc),o},typeof b===U&&(a.jQuery=a.$=o),o});


ozpIwc.abacPolicies={};


ozpIwc.abacPolicies.permitWhenObjectHasNoAttributes=function(request) {
    if(request.object && Object.keys(request.object).length===0) {
        return "permit";
    }
    return "undetermined";
};

ozpIwc.abacPolicies.subjectHasAllObjectAttributes=function(request) {
    // if no object permissions, then it's trivially true
    if(!request.object) {
        return "permit";
    }
    var subject = request.subject || {};
    if(ozpIwc.util.objectContainsAll(subject,request.object,this.implies)) {
        return "permit";
    }
    return "deny";
};

ozpIwc.abacPolicies.permitAll=function() {
    return "permit";
};


var ozpIwc=ozpIwc || {};

/** @typedef {string} ozpIwc.security.Role */

/** @typedef {string} ozpIwc.security.Permission */

/** @typedef { ozpIwc.security.Role[] } ozpIwc.security.Subject */

/** 
 * @typedef {object} ozpIwc.security.Actor 
 * @property {ozpIwc.security.Subject} securityAttributes
 */


/** 
 * @class
 */
ozpIwc.BasicAuthentication=function() {
	this.roles={};
    var self = this;
    ozpIwc.metrics.gauge('security.authentication.roles').set(function() {
        return {'roles': self.getRoleCount()};
    });
};

/**
 * Returns the number of roles currently defined
 * @returns {number} the number of roles defined
 */
ozpIwc.BasicAuthentication.prototype.getRoleCount=function() {
    if (!this.roles || !Object.keys(this.roles)) {
        return 0;
    }
    return Object.keys(this.roles).length;
};

/**
 * Returns the authenticated subject for the given credentials.
 * 
 * <p>The preAuthenticatedSubject allows an existing subject to augment their
 * roles using credentials.  For example, PostMessageParticipants are
 * assigned a role equal to their origin, since the browser authoritatively
 * determines that.  The security module can then add additional roles based
 * upon configuration.
 * 
 * @param {ozpIwc.security.Credentials} credentials
 * @param {ozpIwc.security.Subject} [preAuthenticatedSubject] - The pre-authenticated
 *   subject that is presenting these credentials.   
 * @returns {ozpIwc.AsyncAction} If the credentials are authenticated, the success handler receives
 *     the subject.
 */
ozpIwc.BasicAuthentication.prototype.login=function(credentials,preAuthenticatedSubject) {
	if(!credentials) {
		throw "Must supply credentials for login";
	}
	var action=new ozpIwc.AsyncAction();
	
	preAuthenticatedSubject=preAuthenticatedSubject || [];
	return action.resolve("success",preAuthenticatedSubject);
};


var ozpIwc=ozpIwc || {};

/** @typedef {string} ozpIwc.security.Role */

/** @typedef {string} ozpIwc.security.Permission */

/** @typedef { ozpIwc.security.Role[] } ozpIwc.security.Subject */

/** 
 * @typedef {object} ozpIwc.security.Actor 
 * @property {ozpIwc.security.Subject} securityAttributes
 */


/** 
 * A simple Attribute-Based Access Control implementation
 * @todo Permissions are local to each peer.  Does this need to be synced?
 * 
 * @class
 */
ozpIwc.BasicAuthorization=function(config) {
    config=config || {};
	this.roles={};
    this.policies= config.policies || [
//        ozpIwc.abacPolicies.permitAll
        ozpIwc.abacPolicies.permitWhenObjectHasNoAttributes,
        ozpIwc.abacPolicies.subjectHasAllObjectAttributes
    ];

    var self = this;
    ozpIwc.metrics.gauge('security.authorization.roles').set(function() {
        return {'roles':  self.getRoleCount()};
    });
};
/**
 * Returns the number of roles currently defined
 * @returns {number} the number of roles defined
 */
ozpIwc.BasicAuthorization.prototype.getRoleCount=function() {
    if (!this.roles || !Object.keys(this.roles)) {
        return 0;
    }
    return Object.keys(this.roles).length;
};


ozpIwc.BasicAuthorization.prototype.implies=function(subjectVal,objectVal) {
    // no object value is trivially true
    if(objectVal===undefined || objectVal === null) {
        return true;
    }
    // no subject value when there is an object value is trivially false
    if(subjectVal===undefined || subjectVal === null) {
        return false;
    }
    
    // convert both to arrays, if necessary
    subjectVal=Array.isArray(subjectVal)?subjectVal:[subjectVal];
    objectVal=Array.isArray(objectVal)?objectVal:[objectVal];

    // confirm that every element in objectVal is also in subjectVal
    return ozpIwc.util.arrayContainsAll(subjectVal,objectVal);
};


/**
 * Confirms that the subject has all of the permissions requested.
 * @param {object} request
 * @returns {ozpIwc.AsyncAction}
 */
ozpIwc.BasicAuthorization.prototype.isPermitted=function(request) {
	var action=new ozpIwc.AsyncAction();
	
    var result=this.policies.some(function(policy) {
        return policy.call(this,request)==="permit";
    },this);
    
    
    if(result) {
        return action.resolve("success");
    } else {
		return action.resolve('failure');
    }
};


ozpIwc.authorization=new ozpIwc.BasicAuthorization();
/** @namespace **/
var ozpIwc = ozpIwc || {};

/**
 * <p>This link connects peers using the HTML5 localstorage API.  It is a second generation version of
 * the localStorageLink that bypasses most of the garbage collection issues.
 * 
 * <p> When a packet is sent, this link turns it to a string, creates a key with that value, and
 * immediately deletes it.  This still sends the storage event containing the packet as the key.
 * This completely eliminates the need to garbage collect the localstorage space, with the associated
 * mutex contention and full-buffer issues.
 * 
 * @todo Fragment the packet if it's more than storage can handle.
 * @todo Compress the key
 * 
 * @class
 * @param {Object} [config] - Configuration for this link
 * @param {ozpIwc.Peer} [config.peer=ozpIwc.defaultPeer] - The peer to connect to.
 * @param {string} [config.prefix='ozpIwc'] - Namespace for communicating, must be the same for all peers on the same network.
 * @param {string} [config.selfId] - Unique name within the peer network.  Defaults to the peer id.
 * @param {Number} [config.maxRetries] - Number of times packet transmission will retry if failed. Defaults to 6.
 * @param {Number} [config.queueSize] - Number of packets allowed to be queued at one time. Defaults to 1024.
 */
ozpIwc.KeyBroadcastLocalStorageLink = function(config) {
	config=config || {};

	this.prefix=config.prefix || 'ozpIwc';
	this.peer=config.peer || ozpIwc.defaultPeer;
	this.selfId=config.selfId || this.peer.selfId;
	this.myKeysTimeout = config.myKeysTimeout || 5000; // 5 seconds
	this.otherKeysTimeout = config.otherKeysTimeout || 2*60000; // 2 minutes
	this.maxRetries = config.maxRetries || 6;
	this.queueSize = config.queueSize || 1024;
	this.sendQueue = this.sendQueue || [];

  // Hook into the system
	var self=this;
	var packet;
	var receiveStorageEvent=function(event) {
		try {
			packet=JSON.parse(event.key);
		} catch(e) {
			console.log("Parse error on " + event.key );
			ozpIwc.metrics.counter('links.keyBroadcastLocalStorage.packets.parseError').inc();
			return;
		}
		self.peer.receive(self.linkId,packet);
		ozpIwc.metrics.counter('links.keyBroadcastLocalStorage.packets.received').inc();

	};
	window.addEventListener('storage',receiveStorageEvent , false); 
	
	this.peer.on("send",function(event) { 
		self.send(event.packet); 
	});
	
	this.peer.on("beforeShutdown",function() {
		window.removeEventListener('storage',receiveStorageEvent);
	},this);

};

/**
 * <p>Publishes a packet to other peers.
 * <p>If the sendQueue is full (KeyBroadcastLocalStorageLink.queueSize) send will not occur.
 * 
 * @class
 * @param {ozpIwc.NetworkPacket} - packet
 */
ozpIwc.KeyBroadcastLocalStorageLink.prototype.send = function(packet) { 
  if (this.sendQueue.length < this.queueSize) {
    this.sendQueue = this.sendQueue.concat(packet);
    while (this.sendQueue.length > 0) {
      this.attemptSend(this.sendQueue.shift());
    }
  } else {
    ozpIwc.metrics.counter('links.keyBroadcastLocalStorage.packets.failed').inc();
    ozpIwc.log.error("Failed to write packet(len=" + packet.length + "):" + " Send queue full.");
  }
};

/**
 * <p> Recursively tries sending the packet (KeyBroadcastLocalStorageLink.maxRetries) times
 * The packet is dropped and the send fails after reaching max attempts.
 * 
 * @class
 * @param {ozpIwc.NetworkPacket} - packet  
 * @param {Number} [attemptCount] - number of times attempted to send packet.  
 */
ozpIwc.KeyBroadcastLocalStorageLink.prototype.attemptSend = function(packet, retryCount) {

  var sendStatus = this.sendImpl(packet);  
  if(sendStatus) {
    var self = this;
    retryCount = retryCount || 0;
    var timeOut = Math.max(1, Math.pow(2, (retryCount-1))) - 1;
    
    if (retryCount < self.maxRetries) {
      retryCount++;
      // Call again but back off for an exponential amount of time.
      window.setTimeout(function() {
        self.attemptSend(packet, retryCount);
      }, timeOut);
    } else {
      ozpIwc.metrics.counter('links.keyBroadcastLocalStorage.packets.failed').inc();
      ozpIwc.log.error("Failed to write packet(len=" + packet.length + "):" + sendStatus);
      return sendStatus;
    }       
  }
};

/**
 * <p>Implementation of publishing packets to peers through localStorage.
 * <p>If the localStorage is full or a write collision occurs, the send will not occur.
 * <p>Returns status of localStorage write, null if success.
 * 
 * @todo move counter.inc() out of the impl and handle in attemptSend?
 * 
 * @class
 * @param {ozpIwc.NetworkPacket} - packet  
 */
ozpIwc.KeyBroadcastLocalStorageLink.prototype.sendImpl = function(packet) {
  var sendStatus;
  try {
		var p=JSON.stringify(packet);
    localStorage.setItem(p,"");
    ozpIwc.metrics.counter('links.keyBroadcastLocalStorage.packets.sent').inc();
    localStorage.removeItem(p);
    sendStatus = null;
  }
  catch (e) {
    sendStatus = e;
  }
  finally {
    return sendStatus;
  }
};

/** @namespace **/
var ozpIwc = ozpIwc || {};

/**
 * <p>This link connects peers using the HTML5 localstorage API.  It handles cleaning up
 * the buffer, depduplication of sends, and other trivia.
 * 
 * <p>Individual local storage operations are atomic, but there are no consistency
 * gaurantees between multiple calls.  This means a read, modify, write operation may
 * create race conditions.  The LocalStorageLink addresses the concurrency problem without
 * locks by only allowing creation, read, and delete operations.
 * 
 * <p>Each packet is written to it's own key/value pair in local storage.  The key is the
 * of the form "${prefix}|${selfId}|${timestamp}".  Each LocalStorageLink owns the lifecycle
 * of packets it creates.
 * 
 * For senders:
 * <ol>
 *   <li> Write a new packet.
 *   <li> Wait config.myKeysTimeout milliseconds.
 *   <li> Delete own packets where the timestamp is expired.
 * </ol>
 * 
 * For receivers:
 * <ol>
 *   <li> Receive a "storage" event containing the new key.
 *   <li> Reads the packets from local storage.
 * </ol>
 * 
 * <p>The potential race condition is if the packet is deleted before the receiver
 * can read it.  In this case, the packet is simply considered lost, but no inconsistent
 * data will be read.
 * 
 * <p>Links are responsible for their own packets, but each will clean up other link's packets
 * on a much larger expiration window (config.otherKeysTimeout).  Race conditions between
 * multiple links interleaving the lockless "list keys" and "delete item" sequence generates
 * a consistent postcondition-- the key will not exist.
 * 
 * @class
 * @param {Object} [config] - Configuration for this link
 * @param {ozpIwc.Peer} [config.peer=ozpIwc.defaultPeer] - The peer to connect to.
 * @param {Number} [config.myKeysTimeout=5000] - Milliseconds to wait before deleting this link's keys.
 * @param {Number} [config.otherKeysTimeout=120000] - Milliseconds to wait before cleaning up other link's keys
 * @param {string} [config.prefix='ozpIwc'] - Namespace for communicating, must be the same for all peers on the same network.
 * @param {string} [config.selfId] - Unique name within the peer network.  Defaults to the peer id.
 */
ozpIwc.LocalStorageLink = function(config) {
	config=config || {};

	this.prefix=config.prefix || 'ozpIwc';
	this.peer=config.peer || ozpIwc.defaultPeer;
	this.selfId=config.selfId || this.peer.selfId;
	this.myKeysTimeout = config.myKeysTimeout || 5000; // 5 seconds
	this.otherKeysTimeout = config.otherKeysTimeout || 2*60000; // 2 minutes

  // Hook into the system
	var self=this;
	
	var receiveStorageEvent=function(event) {
		var key=self.splitKey(event.key);
		if(key) {
			var packet=JSON.parse(localStorage.getItem(event.key));

			if(!packet) {
				ozpIwc.metrics.counter('links.localStorage.packets.vanished').inc();
			} else if(typeof(packet) !== "object") {
				ozpIwc.metrics.counter('links.localStorage.packets.notAnObject').inc();
			} else {
				ozpIwc.metrics.counter('links.localStorage.packets.receive').inc();
				self.peer.receive(self.linkId,packet);
			} 
		};
	};
	window.addEventListener('storage',receiveStorageEvent , false); 
	
	this.peer.on("send",function(event) { 
		self.send(event.packet); 
	});
	
	this.peer.on("beforeShutdown",function() {
		self.cleanKeys();
		window.removeEventListener('storage',receiveStorageEvent);
	},this);
	
	window.setInterval(function() {
		self.cleanKeys();
	},250); 


	// METRICS
	ozpIwc.metrics.gauge('links.localStorage.buffer').set(function() {
		var	stats= {
					used: 0,
					max: 5 *1024 * 1024,
					bufferLen: 0,
					peerUsage: {},
					peerPackets: {}
					
		};
		for(var i=0; i < localStorage.length;++i) {
			var k=localStorage.key(i);
			var v=localStorage.getItem(k);
			
			var size=v.length*2;
			var oldKeyTime = ozpIwc.util.now() - this.myKeysTimeout;

			stats.used+=size;
			
			var key=self.splitKey(k);
			if(key) {
				stats.peerUsage[key.id] = stats.peerUsage[key.id]?(stats.peerUsage[key.id]+size):size;
				stats.peerPackets[key.id] = stats.peerPackets[key.id]?(stats.peerPackets[key.id]+1):1;
				stats.bufferLen++;
				if(key.createdAt < oldKeyTime) {
					stats.oldKeysCount++;
					stats.oldKeysSize+=size;
				}
			}
		}
			
		return stats;
	});
};

/**
 * Creates a key for the message in localStorage
 * @todo Is timestamp granular enough that no two packets can come in at the same time?
 * @returns {string} a new key
 */
ozpIwc.LocalStorageLink.prototype.makeKey=function(sequence) { 
	return [this.prefix,this.selfId,ozpIwc.util.now(),sequence].join('|');
};

/**
 * If it's a key for a buffered message, split it into the id of the 
 * link that put it here and the time it was created at.
 * @param {type} k The key to split
 * @returns {object} The id and createdAt for the key if it's valid, otherwise null.
 */
ozpIwc.LocalStorageLink.prototype.splitKey=function(k) { 
	var parts=k.split("|");
	if(parts.length===4 && parts[0]===this.prefix) {
		return { id: parts[1], createdAt: parseInt(parts[2]) };
	}	
	return null;
};

/**
 * Goes through localStorage and looks for expired packets.  Packets owned
 * by this link are removed if they are older than myKeysTimeout.  Other
 * keys are cleaned if they are older than otherKeysTimeout.
 * @todo Coordinate expiration windows.
 * @returns {undefined}
 */
ozpIwc.LocalStorageLink.prototype.cleanKeys=function() {
	var now=ozpIwc.util.now();
	var myKeyExpiration = now - this.myKeysTimeout;
	var otherKeyExpiration = now - this.otherKeysTimeout;

	for(var i=0; i < localStorage.length;++i) {
		var keyName=localStorage.key(i);
		var k=this.splitKey(keyName);
		if(k) {
			if((k.id===this.selfId && k.createdAt <= myKeyExpiration) 
					|| (k.createdAt <= otherKeyExpiration)) {
				localStorage.removeItem(keyName);
			}				
		}
	};


};
/**
 * Publishes a packet to other peers.
 * @todo Handle local storage being full.
 * @param {ozpIwc.NetworkPacket} packet
 */
ozpIwc.LocalStorageLink.prototype.send=function(packet) { 
	localStorage.setItem(this.makeKey(packet.sequence),JSON.stringify(packet));
	ozpIwc.metrics.counter('links.localStorage.packets.sent').inc();
	var self=this;

};


var ozpIwc=ozpIwc || {};

/**
 * @typedef ozpIwc.NetworkPacket
 * @property {string} src_peer - The id of the peer who broadcast this packet.
 * @property {string} sequence - A monotonically increasing, unique identifier for this packet.
 * @property {object} data - The payload of this packet.
 */

/**
 * @event ozpIwc.Peer#receive
 * The peer has received a packet from other peers.
 * @property {ozpIwc.NetworkPacket} packet
 * @property {string} linkId
 */


/**
 * @event ozpIwc.Peer#preSend
 * A cancelable event that allows listeners to override the forwarding of
 * a given packet to other peers.
 * @extends ozpIwc.CancelableEvent
 * @property {ozpIwc.NetworkPacket} packet
 */

/**
 * @event ozpIwc.Peer#send
 * Notifies that a packet is being sent to other peers.  Links should use this
 * event to forward packets to other peers.
 * @property {ozpIwc.NetworkPacket} packet
 */

/**
 * @event ozpIwc.Peer#beforeShutdown
 * Fires when the peer is being explicitly or implicitly shut down.
 */

/**
 * The peer handles low-level broadcast communications between multiple browser contexts.
 * Links do the actual work of moving the packet to other browser contexts.  The links
 * call @{link ozpIwc.Peer#receive} when they need to deliver a packet to this peer and hook
 * the @{link event:ozpIwc.Peer#send} event in order to send packets.
 * @class
 */
ozpIwc.Peer=function() {

    // generate a random 4 byte id
    this.selfId=ozpIwc.util.generateId();

    // unique ids for all packets sent by this peer
    this.sequenceCounter=0;

    // track which packets are seen from each peer
    // key is the name of the peer
    // value is an array that contains the last 50 ids seen
    this.packetsSeen={};

    this.knownPeers={};

    this.events=new ozpIwc.Event();
    this.events.mixinOnOff(this);

    var self=this;

    // Shutdown handling
    this.unloadListener=function() {
        self.shutdown();
    };
    window.addEventListener('beforeunload',this.unloadListener);

};

ozpIwc.Peer.maxSeqIdPerSource=500;

/**
 * Helper to determine if we've seen this packet before
 * @param {ozpIwc.NetworkPacket} packet
 * @returns {boolean}
 */
ozpIwc.Peer.prototype.haveSeen=function(packet) {
    // don't forward our own packets
    if (packet.src_peer === this.selfId) {
        ozpIwc.metrics.counter('network.packets.droppedOwnPacket').inc();
        return true;
    }
    var seen = this.packetsSeen[packet.src_peer];
    if (!seen) {
        seen = this.packetsSeen[packet.src_peer] = [];
    }

    // abort if we've seen the packet before
    if (seen.indexOf(packet.sequence) >= 0) {
        return true;
    }

    //remove oldest array members when truncate needed
    seen.unshift(packet.sequence);
    if (seen.length >= ozpIwc.Peer.maxSeqIdPerSource) {
        seen.length = ozpIwc.Peer.maxSeqIdPerSource;
    }
    return false;
};

/**
 * Used by routers to broadcast a packet to network
 * @fires ozpIwc.Peer#preSend
 * @fires ozpIwc.Peer#send
 * @param {ozpIwc.NetworkPacket} packet
 */
ozpIwc.Peer.prototype.send= function(packet) {
    var networkPacket={
        src_peer: this.selfId,
        sequence: this.sequenceCounter++,
        data: packet
    };

    var preSendEvent=new ozpIwc.CancelableEvent({'packet': networkPacket});

    this.events.trigger("preSend",preSendEvent);
    if(!preSendEvent.canceled) {
        ozpIwc.metrics.counter('network.packets.sent').inc();
        this.events.trigger("send",{'packet':networkPacket});
    } else {
        ozpIwc.metrics.counter('network.packets.sendRejected').inc();
    }
};

/**
 * Called by the links when a new packet is recieved.
 * @fires ozpIwc.Peer#receive
 * @param {string} linkId
 * @param {ozpIwc.NetworkPacket} packet
 * @returns {unresolved}
 */
ozpIwc.Peer.prototype.receive=function(linkId,packet) {
    // drop it if we've seen it before
    if(this.haveSeen(packet)) {
        ozpIwc.metrics.counter('network.packets.dropped').inc();
        return;
    }
    ozpIwc.metrics.counter('network.packets.received').inc();
    this.events.trigger("receive",{'packet':packet,'linkId': linkId});
};

/**
 * Explicitly shuts down the peer.
 * @fires ozpIwc.Peer#send
 */
ozpIwc.Peer.prototype.shutdown=function() {
    this.events.trigger("beforeShutdown");
    window.removeEventListener('beforeunload',this.unloadListener);
};

			
var ozpIwc=ozpIwc || {};

/**
 * @class
 * @mixes ozpIwc.security.Actor
 * @property {string} address - The assigned address to this address.
 * @property {ozpIwc.security.Subject} securityAttributes - The security attributes for this participant.
 */
ozpIwc.Participant=function() {
    this.events=new ozpIwc.Event();
	this.events.mixinOnOff(this);
	this.securityAttributes={};
    this.msgId=0;
};

/**
 * @param {ozpIwc.PacketContext} packetContext
 * @returns {boolean} true if this packet could have additional recipients
 */
ozpIwc.Participant.prototype.receiveFromRouter=function(packetContext) {
    // doesn't really do anything other than return a bool and prevent "unused param" warnings
    return !packetContext;
};

/**
 * @param {ozpIwc.Router} router
 * @param {string} address
 * @returns {boolean} true if this packet could have additional recipients
 */
ozpIwc.Participant.prototype.connectToRouter=function(router,address) {
    this.address=address;
    this.router=router;
    this.securityAttributes.rawAddress=address;
    this.msgId=0;
};

/**
 * Populates fields relevant to this packet if they aren't already set:
 * src, ver, msgId, and time.
 * @param {ozpIwc.TransportPacket} packet
 * @returns {ozpIwc.TransportPacket}
 */
ozpIwc.Participant.prototype.fixPacket=function(packet) {
    // clean up the packet a bit on behalf of the sender
    packet.src=packet.src || this.address;
    packet.ver = packet.ver || 1;

    // if the packet doesn't have a msgId, generate one
    packet.msgId = packet.msgId || this.generateMsgId();

    // might as well be helpful and set the time, too
    packet.time = packet.time || ozpIwc.util.now();
    return packet;
};

/**
 * Sends a packet to this participants router.  Calls fixPacket
 * before doing so.
 * @param {ozpIwc.TransportPacket} packet
 * @returns {ozpIwc.TransportPacket}
 */
ozpIwc.Participant.prototype.send=function(packet) {
    packet=this.fixPacket(packet);
    this.router.send(packet,this);
    return packet;
};


ozpIwc.Participant.prototype.generateMsgId=function() {
    return "i:" + this.msgId++;
};

ozpIwc.Participant.prototype.heartbeatStatus=function() {
    return {
        address: this.address,
        securityAttributes: this.securityAttributes,
        type: this.participantType || this.constructor.name,
        name: this.name
    };
};

ozpIwc.InternalParticipant=ozpIwc.util.extend(ozpIwc.Participant,function(config) {
    config=config || {};
	ozpIwc.Participant.apply(this,arguments);
	this.replyCallbacks={};
	this.participantType="internal";
	this.name=config.name;

    var self = this;
    ozpIwc.metrics.gauge('transport.internal.participants').set(function() {
        return {'callbacks':  self.getCallbackCount()};
    });
});

/**
 * Gets the count of the registered reply callbacks
 * @returns {number} the number of registered callbacks
 */
ozpIwc.InternalParticipant.prototype.getCallbackCount=function() {
    if (!this.replyCallbacks | !Object.keys(this.replyCallbacks)) {
        return 0;
    }
    return Object.keys(this.replyCallbacks).length;
};

/**
 * @param {ozpIwc.PacketContext} packetContext
 * @returns {boolean} true if this packet could have additional recipients
 */
ozpIwc.InternalParticipant.prototype.receiveFromRouter=function(packetContext) { 
	var packet=packetContext.packet;
	if(packet.replyTo && this.replyCallbacks[packet.replyTo]) {
		if (!this.replyCallbacks[packet.replyTo](packet)) {
            this.cancelCallback(msgId);
        }
	} else {
		this.events.trigger("receive",packet);
	}
};


ozpIwc.InternalParticipant.prototype.send=function(packet,callback) {
	var packet=this.fixPacket(packet);
	if(callback) {
		this.replyCallbacks[packet.msgId]=callback;
	}
	ozpIwc.Participant.prototype.send.apply(this,arguments);

	return packet;
};

ozpIwc.InternalParticipant.prototype.cancelCallback=function(msgId) {
    var success=false;
    if (msgId) {
        delete this.replyCallbacks[msgId];
        success=true;
    }
    return success;
};

var ozpIwc=ozpIwc || {};

/**
 * @typedef ozpIwc.TransportPacket
 * @property {string} src - The participant address that sent this packet
 * @property {string} dst - The intended recipient of this packet
 * @property {Number} ver - Protocol Version.  Should be 1
 * @property {Number} msgId - A unique id for this packet.
 * @property {object} entity - The payload of this packet.
 * @property {object} [permissions] - Permissions required to see the payload of this packet.
 * @property {Number} [time] - The time in milliseconds since epoch that this packet was created.
 * @property {Number} [replyTo] - Reference to the msgId that this is in reply to.
 * @property {string} [action] - Action to be performed.
 * @property {string} [resource] - Resource to perform the action upon.
 * @property {boolean} [test] - Marker for test packets.
 */

/**
 * @class 
 * @param {object} config
 * @param {ozpIwc.TransportPacket} config.packet
 * @param {ozpIwc.Router} config.router
 * @param {ozpIwc.Participant} [config.srcParticpant]
 * @param {ozpIwc.Participant} [config.dstParticpant]
 * @property {ozpIwc.TransportPacket} packet
 * @property {ozpIwc.Router} router
 * @property {ozpIwc.Participant} [srcParticpant]
 * @property {ozpIwc.Participant} [dstParticpant]
 */
ozpIwc.TransportPacketContext=function(config) {
	for(var i in config) {
		this[i]=config[i];
	}
};

/**
 * 
 * @param {ozpIwc.TransportPacket} response
 * @returns {ozpIwc.TransportPacket} the packet that was sent
 */
ozpIwc.TransportPacketContext.prototype.replyTo=function(response) {
	var now=new Date().getTime();
	response.ver = response.ver || 1;
	response.time = response.time || now;
	// TODO: track the last used timestamp and make sure we don't send a duplicate messageId
	// default the msgId to the current timestamp
	response.msgId = response.msgId || now;
	response.replyTo=response.replyTo || this.packet.msgId;
	response.src=response.src || this.packet.dst;
	response.dst=response.dst || this.packet.src;
	this.router.send(response);
	return response;
};

/**
 * @event ozpIwc.Router#preRegisterParticipant
 * @mixes ozpIwc.CancelableEvent
 * @property {ozpIwc.TransportPacket} [packet] - The packet to be delivered
 * @property {object} registration - Information provided by the participant about it's registration
 * @property {ozpIwc.Participant} participant - The participant that will receive the packet
 */

/**
 * @event ozpIwc.Router#preSend
 * @mixes ozpIwc.CancelableEvent
 * @property {ozpIwc.TransportPacket} packet - The packet to be sent
 * @property {ozpIwc.Participant} participant - The participant that sent the packet
 */

/**
 * @event ozpIwc.Router#preDeliver
 * @mixes ozpIwc.CancelableEvent
 * @property {ozpIwc.TransportPacket} packet - The packet to be delivered
 * @property {ozpIwc.Participant} participant - The participant that will receive the packet
 */

/**
 * @event ozpIwc.Router#send
 * @property {ozpIwc.TransportPacket} packet - The packet to be delivered
 */

/**
 * @event ozpIwc.Router#prePeerReceive
 * @mixes ozpIwc.CancelableEvent
 * @property {ozpIwc.TransportPacket} packet
 * @property {ozpIwc.NetworkPacket} rawPacket
 */
/**
 * @class
 */
ozpIwc.RouterWatchdog=ozpIwc.util.extend(ozpIwc.InternalParticipant,function(config) {
	ozpIwc.InternalParticipant.apply(this,arguments);
	
	this.participantType="routerWatchdog";
	this.on("connected",function() {
		this.name=this.router.self_id;
	},this);
	
	this.heartbeatFrequency=config.heartbeatFrequency || 10000;
	var self=this;
	
	this.timer=window.setInterval(function() {
		var heartbeat={
			dst: "names.api",
			action: "set",
			resource: "/router/" + self.router.self_id,
			entity: { participants: {} }
		};
		for(var k in self.router.participants) {
			heartbeat.entity.participants[k]=self.router.participants[k].heartbeatStatus();
		}
		self.send(heartbeat);
	},this.heartbeatFrequency);
});

ozpIwc.RouterWatchdog.prototype.connectToRouter=function(router,address) {
	ozpIwc.Participant.prototype.connectToRouter.apply(this,arguments);
	this.name=router.self_id;
};

ozpIwc.RouterWatchdog.prototype.shutdown=function() {
	window.clearInterval(this.timer);
};

/**
 * @class
 * @param {object} [config]
 * @param {ozpIwc.Peer} [config.peer=ozpIwc.defaultPeer]
 */
ozpIwc.Router=function(config) {
	config=config || {};
	this.peer=config.peer || ozpIwc.defaultPeer;

//	this.nobodyAddress="$nobody";
//	this.routerControlAddress='$transport';
	var self=this;	

	this.self_id=ozpIwc.util.generateId();
	
	// Stores all local addresses
	this.participants={};
	
	ozpIwc.metrics.gauge("transport.participants").set(function() {
		return Object.keys(self.participants).length;
	});

	this.events=new ozpIwc.Event();
	this.events.mixinOnOff(this);
	
	// Wire up to the peer
	this.peer.on("receive",function(event) {
		self.receiveFromPeer(event.packet);
	});
	
	var checkFormat=function(event) {
		var message=event.packet;
		if(message.ver !== 1) {
			event.cancel("badVersion");
		}
		if(!message.src) {
			event.cancel("nullSource");
		}
		if(!message.dst) {
			event.cancel("nullDestination");
		}
		if(event.canceled) {
			ozpIwc.metrics.counter("transport.packets.invalidFormat").inc();
		}
	};
	this.events.on("preSend",checkFormat);
	this.watchdog=new ozpIwc.RouterWatchdog({router: this});
	this.registerParticipant(this.watchdog);

    ozpIwc.metrics.gauge('transport.router.participants').set(function() {
        return {'participants':  self.getParticipantCount()};
    });
};

/**
 * gets the count of participants who have registered with the router
 * @returns {number} the number of registered participants
 */
ozpIwc.Router.prototype.getParticipantCount=function() {
    if (!this.participants || !Object.keys(this.participants)) {
        return 0;
    }
    return Object.keys(this.participants).length;
};

ozpIwc.Router.prototype.shutdown=function() {
    this.watchdog.shutdown();
}

/**
 * Allows a listener to add a new participant.  
 * @fires ozpIwc.Router#registerParticipant
 * @param {object} participant the participant object that contains a send() function.
 * @param {object} packet The handshake requesting registration.
 * @returns {string} returns participant id
 */
ozpIwc.Router.prototype.registerParticipant=function(participant,packet) {
	packet = packet || {};
	var address;
	do {
			address=ozpIwc.util.generateId() + "." + this.self_id;
	} while(this.participants.hasOwnProperty(address));

	var registerEvent=new ozpIwc.CancelableEvent({
		'packet': packet,
		'registration': packet.entity,
		'participant': participant
	});
	this.events.trigger("preRegisterParticipant",registerEvent);

	if(registerEvent.canceled){
		// someone vetoed this participant
		ozpIwc.log.log("registeredParticipant[DENIED] origin:"+participant.origin+ 
						" because " + registerEvent.cancelReason);
		return null;
	}
        this.participants[address] = participant;
	participant.connectToRouter(this,address);
	
//	ozpIwc.log.log("registeredParticipant["+participant_id+"] origin:"+participant.origin);
	return address;
};

/**
 * @fires ozpIwc.Router#preSend
 * @param {ozpIwc.TransportPacket} packet
 * @param {ozpIwc.Participant} sendingParticipant
 */
ozpIwc.Router.prototype.deliverLocal=function(packet,sendingParticipant) {
	if(!packet) {
		throw "Cannot deliver a null packet!";
	}
	var localParticipant=this.participants[packet.dst];
	if(!localParticipant) {
		return;
	}
	var packetContext=new ozpIwc.TransportPacketContext({
		'packet':packet,
		'router': this,
		'srcParticipant': sendingParticipant,
		'dstParticipant': localParticipant
	});

	var preDeliverEvent=new ozpIwc.CancelableEvent({
		'packet': packet,
		'dstParticipant': localParticipant,
		'srcParticipant': sendingParticipant			
	});

	if(this.events.trigger("preDeliver",preDeliverEvent).canceled) {
		ozpIwc.metrics.counter("transport.packets.rejected").inc();
		return;
	}

	ozpIwc.authorization.isPermitted({
        'subject':localParticipant.securityAttributes,
        'object': packet.permissions,
        'action': {'action': 'receive'}
    })
		.success(function() {
			ozpIwc.metrics.counter("transport.packets.delivered").inc();
			localParticipant.receiveFromRouter(packetContext);
		})
		.failure(function() {
			/** @todo do we send a "denied" message to the destination?  drop?  who knows? */
			ozpIwc.metrics.counter("transport.packets.forbidden").inc();
		});
	
};


/**
 * Registers a participant for a multicast group
 * @param {ozpIwc.Participant} participant
 * @param {String[]} multicastGroups
 */
ozpIwc.Router.prototype.registerMulticast=function(participant,multicastGroups) {
	var self=this;
	multicastGroups.forEach(function(groupName) {
		var g=self.participants[groupName];
		if(!g) {
			g=self.participants[groupName]=new ozpIwc.MulticastParticipant(groupName);
		}
		g.addMember(participant);
	});
	return multicastGroups;
};

/**
 * Used by participant listeners to route a message to other participants.
 * @fires ozpIwc.Router#preSend
 * @fires ozpIwc.Router#send
 * @param {ozpIwc.TransportPacket} packet The packet to route.
 * @param {ozpIwc.Participant} sendingParticipant Information about the participant that is attempting to send
 *   the packet.
 * @returns {undefined}
 */
ozpIwc.Router.prototype.send=function(packet,sendingParticipant) {

	var preSendEvent=new ozpIwc.CancelableEvent({
		'packet': packet,
		'participant': sendingParticipant
	});
	this.events.trigger("preSend",preSendEvent);

	if(preSendEvent.canceled) {
		ozpIwc.metrics.counter("transport.packets.sendCanceled");
		return;
	} 
	ozpIwc.metrics.counter("transport.packets.sent").inc();
	this.deliverLocal(packet,sendingParticipant);
	this.events.trigger("send",{'packet': packet});
	this.peer.send(packet);
};

/**
 * Receive a packet from the peer
 * @fires ozpIwc.Router#peerReceive
 * @param packet {ozpIwc.TransportPacket} the packet to receive
 */
ozpIwc.Router.prototype.receiveFromPeer=function(packet) {
	ozpIwc.metrics.counter("transport.packets.receivedFromPeer").inc();
	var peerReceiveEvent=new ozpIwc.CancelableEvent({
		'packet' : packet.data,
		'rawPacket' : packet
	});
	this.events.trigger("prePeerReceive",peerReceiveEvent);

	if(!peerReceiveEvent.canceled){
		this.deliverLocal(packet.data);
	}
};


var ozpIwc=ozpIwc || {};

/**
 * Baseclass for APIs that need leader election.  Uses the Bully algorithm for leader election.
 * @class
 * @param {object} config
 * @param {String} config.name 
 *        The name of this API.
 * @param {string} [config.electionAddress=config.name+".election"] 
 *        The multicast channel for running elections.  
 *        The leader will register to receive multicast on this channel.
 * @param {number} [config.priority=Math.Random] 
 *        How strongly this node feels it should be leader.
 * @param {function} [config.priorityLessThan] 
 *        Function that provides a strict total ordering on the priority.  Default is "<".
 * @param {number} [config.electionTimeout=250] 
 *        Number of milliseconds to wait before declaring victory on an election. 
 
 */
ozpIwc.LeaderGroupParticipant=ozpIwc.util.extend(ozpIwc.Participant,function(config) {
	ozpIwc.Participant.apply(this,arguments);

	if(!config.name) {
		throw "Config must contain a name value";
	}
	
	// Networking info
	this.name=config.name;
	
	this.electionAddress=config.electionAddress || (this.name + ".election");

	// Election times and how to score them
	this.priority = config.priority || ozpIwc.defaultLeaderPriority || Math.random();
	this.priorityLessThan = config.priorityLessThan || function(l,r) { return l < r; };
	this.electionTimeout=config.electionTimeout || 250; // quarter second
	this.leaderState="connecting";
	this.electionQueue=[];
	
	// tracking the current leader
	this.leader=null;
	this.leaderPriority=null;

	this.participantType="leaderGroupMember";
	this.name=config.name;
	
	this.on("startElection",function() {
			this.electionQueue=[];
	},this);
	
	this.on("becameLeader",function() {
		this.electionQueue.forEach(function(p) {
			this.forwardToTarget(p);
		},this);
		this.electionQueue=[];
	},this);

	this.on("newLeader",function() {
		this.electionQueue=[];
	},this);
	var self=this;
	
	// handoff when we shut down
	window.addEventListener("beforeunload",function() {
		self.leaderPriority=0;
		self.startElection();
		
	});

    ozpIwc.metrics.gauge('transport.leaderGroup.election').set(function() {
        var queue = self.getElectionQueue();
        return {'queue': queue ? queue.length : 0};
    });
	
});

/**
 * Retrieve the election queue. Called by closures which need access to the
 * queue as it grows
 * @returns {Array} the election queue
 */
ozpIwc.LeaderGroupParticipant.prototype.getElectionQueue=function() {
    return this.electionQueue;
}

/**
 * Override from the participant in order to register our multicast addresses
 * and start an election.
 * @param {type} router
 * @param {type} address
 * @returns {undefined}
 */
ozpIwc.LeaderGroupParticipant.prototype.connectToRouter=function(router,address) {
	ozpIwc.Participant.prototype.connectToRouter.apply(this,arguments);
	this.router.registerMulticast(this,[this.electionAddress,this.name]);
	this.startElection();
};

/**
 * Override fixPacket to default the source address to the name of this
 * leadership group.
 * @param {type} packet
 * @returns {unresolved}
 */
ozpIwc.LeaderGroupParticipant.prototype.fixPacket=function(packet) {
	packet.src = packet.src || this.name;
	
	return ozpIwc.Participant.prototype.fixPacket.apply(this,arguments);
};


/**
 * Checks to see if the leadership group is in an election
 * @returns {Boolean} True if in an election state, otherwise false
 */
ozpIwc.LeaderGroupParticipant.prototype.inElection=function() {
	return !!this.electionTimer;
};

/**
 * Checks to see if this instance is the leader of it's group.
 * @returns {Boolean}
 */
ozpIwc.LeaderGroupParticipant.prototype.isLeader=function() {
	return this.leader === this.address;
};

/**
 * Sends a message to the leadership group.
 * @private
 * @param {string} type - the type of message-- "election" or "victory"
 */
ozpIwc.LeaderGroupParticipant.prototype.sendElectionMessage=function(type) {
	this.send({
		'src': this.address,
		'dst': this.electionAddress,
		'action': type,
		'entity': {
			'priority': this.priority
		}
	});
};

/**
 * Attempt to start a new election.
 * @protected
 * @returns {undefined}
 * @fire ozpIwc.LeaderGroupParticipant#startElection
 * @fire ozpIwc.LeaderGroupParticipant#becameLeader
 */
ozpIwc.LeaderGroupParticipant.prototype.startElection=function() {
	// don't start a new election if we are in one
	if(this.inElection()) {
		return;
	}
	this.leaderState="election";
	this.events.trigger("startElection");
	
	var self=this;
	// if no one overrules us, declare victory
	this.electionTimer=window.setTimeout(function() {
		self.cancelElection();
		self.leader=self.address;
		self.leaderPriority=self.priority;
		self.leaderState="leader";
		self.sendElectionMessage("victory");	
		self.events.trigger("becameLeader");
	},this.electionTimeout);

	this.sendElectionMessage("election");
};

/**
 * Cancels an in-progress election that we started.
 * @protected
 * @fire ozpIwc.LeaderGroupParticipant#endElection
 */
ozpIwc.LeaderGroupParticipant.prototype.cancelElection=function() {
	if(this.electionTimer) {	
		window.clearTimeout(this.electionTimer);
		this.electionTimer=null;
		this.events.trigger("endElection");
	}
};

/**
 * Receives a packet on the election control group or forwards it to the target implementation
 * that of this leadership group.
 * @param {ozpIwc.TransportPacket} packet
 * @returns {boolean}
 */
ozpIwc.LeaderGroupParticipant.prototype.receiveFromRouter=function(packetContext) {
	var packet=packetContext.packet;
	packetContext.leaderState=this.leaderState;
	// forward non-election packets to the current state
	if(packet.dst !== this.electionAddress) {
		this.forwardToTarget(packetContext);
	} else {
		if(packet.src === this.address) {
			// even if we see our own messages, we shouldn't act upon them
			return;
		}else if(packet.action === "election") {
			this.handleElectionMessage(packet);
		} else if(packet.action === "victory") {
			this.handleVictoryMessage(packet);
		}
	}
};
/**
 * Convention based routing.  Routes to a functions in order of
 * <ol>
 *   <li>handle${action}As${leaderState}</li>
 *   <li>handle${action}</li>
 *   <li>defaultHandlerAs${leaderState}</li>
 *   <li>defaultHandler</li>
 * </ol>
 * The variable action is the packet's action and leaderstate is the current leadership state.
 * If there's no packet action, then the handle* functions will not be invoked.
 * @param {ozpIwc.TransportPacketContext} packetContext
 */
ozpIwc.LeaderGroupParticipant.prototype.forwardToTarget=function(packetContext) {
	if(this.leaderState === "election" || this.leaderState === "connecting") {
		this.electionQueue.push(packetContext);
		return;
	}
	packetContext.leaderState=this.leaderState;
	this.events.trigger("receive",packetContext);
};
	
	
/**
 * Respond to someone else starting an election.
 * @private
 * @param {ozpIwc.TransportPacket} electionMessage
 * @returns {undefined}
 */
ozpIwc.LeaderGroupParticipant.prototype.handleElectionMessage=function(electionMessage) {

	// is the new election lower priority than us?
	if(this.priorityLessThan(electionMessage.entity.priority,this.priority)) {
		// Quell the rebellion!
		this.startElection();
	} else {
		// Abandon dreams of leadership
		this.cancelElection();
	}
};

/**
 * Handle someone else declaring victory.
 * @fire ozpIwc.LeaderGroupParticipant#newLeader
 * @param {ozpIwc.TransportPacket} victoryMessage
 */
ozpIwc.LeaderGroupParticipant.prototype.handleVictoryMessage=function(victoryMessage) {
	if(this.priorityLessThan(victoryMessage.entity.priority,this.priority)) {
		// someone usurped our leadership! start an election!
		this.startElection();
	} else {
		// submit to the bully
		this.leader=victoryMessage.src;
		this.leaderPriority=victoryMessage.entity.priority;
		this.cancelElection();
		this.leaderState="member";
		this.events.trigger("newLeader");
	}
};


ozpIwc.LeaderGroupParticipant.prototype.heartbeatStatus=function() {
	var status= ozpIwc.Participant.prototype.heartbeatStatus.apply(this,arguments);
	status.leaderState=this.leaderState;
	status.leaderPriority=this.priority;
	return status;
};
var ozpIwc=ozpIwc || {};

/**
 * @class
 * @extends ozpIwc.Participant
 * @param {string} name
 */
ozpIwc.MulticastParticipant=ozpIwc.util.extend(ozpIwc.Participant,function(name) {
	ozpIwc.Participant.apply(this,arguments);
	this.name=name;
	this.participantType="multicast";
	this.members=[];
});

/**
 * Receives a packet on behalf of the multicast group.
 * @param {ozpIwc.TransportPacket} packet
 * @returns {Boolean}
 */
ozpIwc.MulticastParticipant.prototype.receiveFromRouter=function(packet) {
	this.members.forEach(function(m) { m.receiveFromRouter(packet);});
	return false;
};

/**
 * 
 * @param {ozpIwc.Participant} participant
 */
ozpIwc.MulticastParticipant.prototype.addMember=function(participant) {
	this.members.push(participant);
};

ozpIwc.MulticastParticipant.prototype.heartbeatStatus=function() {
	var status= ozpIwc.Participant.prototype.heartbeatStatus.apply(this,arguments);
	status.members=this.members.map(function(m) { return m.address;});
	return status;
};
/** @namespace */
var ozpIwc=ozpIwc || {};

/**
 * @class ozpIwc.PostMessageParticipant
 * @extends ozpIwc.Participant
 * @param {object} config
 * @param {string} config.origin
 * @param {object} config.sourceWindow
 * @param {object} config.credentials
 */
ozpIwc.PostMessageParticipant=ozpIwc.util.extend(ozpIwc.Participant,function(config) {
	ozpIwc.Participant.apply(this,arguments);
	this.origin=this.name=config.origin;
	this.sourceWindow=config.sourceWindow;
	this.credentials=config.credentials;
	this.participantType="postMessageProxy";
	this.securityAttributes.origin=this.origin;
});

/**
 * Receives a packet on behalf of this participant and forwards it via PostMessage.
 * @param {ozpIwc.TransportPacketContext} packetContext
 */
ozpIwc.PostMessageParticipant.prototype.receiveFromRouter=function(packetContext) {
	this.sendToRecipient(packetContext.packet);
	return true;
};

/**
 * Sends a message to the other end of our connection.  Wraps any string mangling
 * necessary by the postMessage implementation of the browser.
 * @param {ozpIwc.TransportPacket} packet
 * @todo Only IE requires the packet to be stringified before sending, should use feature detection?
 * @returns {undefined}
 */
ozpIwc.PostMessageParticipant.prototype.sendToRecipient=function(packet) {
    var data=packet;
    if (!ozpIwc.util.structuredCloneSupport()) {
         data=JSON.stringify(packet);
    }
	this.sourceWindow.postMessage(data,this.origin);
};

/**
 * The participant hijacks anything addressed to "$transport" and serves it
 * directly.  This isolates basic connection checking from the router, itself.
 * @param {object} packet
 * @returns {undefined}
 */
ozpIwc.PostMessageParticipant.prototype.handleTransportPacket=function(packet) {
	var reply={
		'ver': 1,
		'dst': this.address,
		'src': '$transport',
		'replyTo': packet.msgId,
		'msgId': this.generateMsgId(),
		'entity': {
			"address": this.address
		}
	};
	this.sendToRecipient(reply);
};


/**
 *
 * @todo track the last used timestamp and make sure we don't send a duplicate messageId
 * @param {ozpIwc.TransportPacket} packet
 * @param {type} event
 * @returns {undefined}
 */
ozpIwc.PostMessageParticipant.prototype.forwardFromPostMessage=function(packet,event) {
	if(typeof(packet) !== "object") {
		ozpIwc.log.error("Unknown packet received: " + JSON.stringify(packet));
		return;
	}
	if(event.origin !== this.origin) {
		/** @todo participant changing origins should set off more alarms, probably */
		ozpIwc.metrics.counter("transport."+this.address+".invalidSenderOrigin").inc();
		return;
	}

	packet=this.fixPacket(packet);

	// if it's addressed to $transport, hijack it
	if(packet.dst === "$transport") {
		this.handleTransportPacket(packet);
	} else {
		this.router.send(packet,this);
	}
};


/**
 * @class
 * @param {object} config
 * @param {ozpIwc.Router} config.router
 */
ozpIwc.PostMessageParticipantListener=function(config) {
	config = config || {};
	this.participants=[];
	this.router=config.router || ozpIwc.defaultRouter;

	var self=this;

	window.addEventListener("message", function(event) {
		self.receiveFromPostMessage(event);
	}, false);

    ozpIwc.metrics.gauge('transport.postMessageListener.participants').set(function() {
        return {'participants': self.getParticipantCount()};
    });
};

/**
 * gets the count of known participants
 * @returns {number} the number of known participants
 */
ozpIwc.PostMessageParticipantListener.prototype.getParticipantCount=function() {
    if (!this.participants) {
        return 0;
    }
    return this.participants.length;
};

/**
 * Finds the participant associated with the given window.  Unfortunately, this is an
 * o(n) algorithm, since there doesn't seem to be any way to hash, order, or any other way to
 * compare windows other than equality.
 * @param {object} sourceWindow - the participant window handle from message's event.source
 */
ozpIwc.PostMessageParticipantListener.prototype.findParticipant=function(sourceWindow) {
	for(var i=0; i< this.participants.length; ++i) {
		if(this.participants[i].sourceWindow === sourceWindow) {
			return this.participants[i];
		}
	};
};

/**
 * Process a post message that is received from a peer
 * @param {object} event - The event received from the "message" event handler
 * @param {string} event.origin
 * @param {object} event.source
 * @param {ozpIwc.TransportPacket} event.data
 */
ozpIwc.PostMessageParticipantListener.prototype.receiveFromPostMessage=function(event) {
	var participant=this.findParticipant(event.source);
	var packet=event.data;

	if(typeof(event.data)==="string") {
		packet=JSON.parse(event.data);
	}

	// if this is a window who hasn't talked to us before, sign them up
	if(!participant) {
		participant=new ozpIwc.PostMessageParticipant({
			'origin': event.origin,
			'sourceWindow': event.source,
			'credentials': packet.entity
		});
		this.router.registerParticipant(participant,packet);
		this.participants.push(participant);
	}
	participant.forwardFromPostMessage(packet,event);
};

/**
 * The Common API Base implements the API Common Conventions.  It is intended to be subclassed by
 * the specific API implementations.
 * @class
 */
ozpIwc.CommonApiBase = function(config) {
	config = config || {};
	this.participant=config.participant;
	
	this.participant.on("receive",ozpIwc.CommonApiBase.prototype.routePacket,this);

	this.events = new ozpIwc.Event();
    this.events.mixinOnOff(this);

	this.data={};
};
/**
 * Creates a new value for the given packet's request.  Subclasses must override this
 * function to return the proper value based upon the packet's resource, content type, or
 * other parameters.
 * 
 * @abstract
 * @param {ozpIwc.TransportPacket} packet
 * @returns {ozpIwc.CommonApiValue} an object implementing the commonApiValue interfaces
 */
ozpIwc.CommonApiBase.prototype.makeValue=function(packet) {
	throw new Error("Subclasses of CommonApiBase must implement the makeValue(packet) function.");
};

/**
 * Determines whether the action implied by the packet is permitted to occur on
 * node in question.
 * @todo the refactoring of security to allow action-level permissions
 * @todo make the packetContext have the srcSubject inside of it
 * @param {ozpIwc.CommonApiValue} node
 * @param {ozpIwc.TransportPacketContext} packetContext
 * @returns {ozpIwc.AsyncAction}
 */
ozpIwc.CommonApiBase.prototype.isPermitted=function(node,packetContext) {
	var subject=packetContext.srcSubject || {
        'rawAddress':packetContext.packet.src
    };

	return ozpIwc.authorization.isPermitted({
        'subject': subject,
        'object': node.permissions,
        'action': {'action':packetContext.action}
    });
};


/** 
 * Turn an event into a list of change packets to be sent to the watchers.
 * @param {object} evt
 * @param {object} evt.node - The node being changed.
 */
ozpIwc.CommonApiBase.prototype.notifyWatchers=function(node,changes) {
	node.eachWatcher(function(watcher) {
		// @TODO check that the recipient has permission to both the new and old values
		var reply={
			'dst'   : watcher.src,
		    'replyTo' : watcher.msgId,
			'action': 'changed',
			'resource': node.resource,
			'permissions': node.permissions,
			'entity': changes
		};
        
		this.participant.send(reply);
	},this);
};

/**
 * For a given packet, return the value if it already exists, otherwise create the value
 * using makeValue()
 * @protected
 * @param {ozpIwc.TransportPacket} packet
 */
ozpIwc.CommonApiBase.prototype.findOrMakeValue=function(packet) {
	var node=this.data[packet.resource];
	
	if(!node) {
		node=this.data[packet.resource]=this.makeValue(packet);
	}
	return node;
};

/**
 * 
 * Determines if the given resource exists.
 * @param {string} resource
 * @returns {boolean}
 */
ozpIwc.CommonApiBase.prototype.hasKey=function(resource) {
	return resource in this.data;
};

/**
 * Generates a keyname that does not already exist and starts
 * with a given prefix.
 * @param {String} prefix
 * @returns {String}
 */
ozpIwc.CommonApiBase.prototype.createKey=function(prefix) {
	prefix=prefix || "";
	var key;
	do {
		key=prefix + ozpIwc.util.generateId();
	} while(this.hasKey(key));
	return key;
};

/**
 * Accept a packet and do all of the pre/post routing checks.  This include
 * <ul>
 * <li> Pre-routing checks	<ul>
 *		<li> Permission check</li>
 *		<li> ACL Checks (todo)</li>
 *		<li> Precondition checks</li>
 * </ul></li>
 * <li> Post-routing actions <ul>
 *		<li> Reply to requester </li>
 *		<li> If node version changed, notify all watchers </li>
 * </ul></li>
 * @param {ozpIwc.TransportPacketContext} packetContext
 * @returns {undefined}
 */
ozpIwc.CommonApiBase.prototype.routePacket=function(packetContext) {
	var packet=packetContext.packet;

	if(packetContext.leaderState !== 'leader')	{
		// if not leader, just drop it.
		return;
	}	
	var handler;
	if(packet.action) {
		handler="handle" + packet.action.charAt(0).toUpperCase() + packet.action.slice(1).toLowerCase();
	}
	if(!handler || typeof(this[handler]) !== 'function') {
		packetContext.replyTo({
			'action': 'badAction',
			'entity': packet.action
		});
        return;
	}

    this.events.trigger("receive",packetContext);

	var node=this.findOrMakeValue(packetContext.packet);
	this.invokeHandler(node,packetContext,this[handler]);
	
};
ozpIwc.CommonApiBase.prototype.validateResource=function(node,packetContext) {
	return packetContext.packet.resource;
};

ozpIwc.CommonApiBase.prototype.validatePreconditions=function(node,packetContext) {
	return !packetContext.packet.ifTag || packetContext.packet.ifTag===node.version;
};

/**
 * Invoke the proper handler for the packet after determining that
 * they handler has permission to perform this action.
 * @param {ozpIwc.CommonApiValue} node
 * @param {ozpIwc.TransportPacketContext} packetContext
 * @param {function} handler
 * @returns {undefined}
 */
ozpIwc.CommonApiBase.prototype.invokeHandler=function(node,packetContext,handler) {
	this.isPermitted(node,packetContext)
		.failure(function() {
			packetContext.replyTo({'action':'noPerm'});				
		})
		.success(function() {
			if(!this.validateResource(node,packetContext)) {
				packetContext.replyTo({'action': 'badResource'});
				return;
			}
			if(!this.validatePreconditions(node,packetContext)) {
				packetContext.replyTo({'action': 'noMatch'});
				return;
			}

			var snapshot=node.snapshot();
			handler.call(this,node,packetContext);
			var changes=node.changesSince(snapshot);
			
			if(changes)	{
				this.notifyWatchers(node,changes);
			}	
		},this);	
};


/**
 * @param {ozpIwc.CommonApiValue} node
 * @param {ozpIwc.TransportPacketContext} packetContext
 */
ozpIwc.CommonApiBase.prototype.handleGet=function(node,packetContext) {
	packetContext.replyTo(node.toPacket({'action': 'ok'}));
};

/**
 * @param {ozpIwc.CommonApiValue} node
 * @param {ozpIwc.TransportPacketContext} packetContext
 */
ozpIwc.CommonApiBase.prototype.handleSet=function(node,packetContext) {
	node.set(packetContext.packet);
	packetContext.replyTo({'action':'ok'});
};

/**
 * @param {ozpIwc.CommonApiValue} node
 * @param {ozpIwc.TransportPacketContext} packetContext
 */
ozpIwc.CommonApiBase.prototype.handleDelete=function(node,packetContext) {
	node.deleteData();
	packetContext.replyTo({'action':'ok'});
};

/**
 * @param {ozpIwc.CommonApiValue} node
 * @param {ozpIwc.TransportPacketContext} packetContext
 */
ozpIwc.CommonApiBase.prototype.handleWatch=function(node,packetContext) {
	node.watch(packetContext.packet);
	
	// @TODO: Reply with the entity? Immediately send a change notice to the new watcher?  
	packetContext.replyTo({'action': 'ok'});
};

/**
 * @param {ozpIwc.CommonApiValue} node
 * @param {ozpIwc.TransportPacketContext} packetContext
 */
ozpIwc.CommonApiBase.prototype.handleUnwatch=function(node,packetContext) {
	node.unwatch(packetContext.packet);
	
	packetContext.replyTo({'action':'ok'});
};


/**
 * The base class for values in the various APIs.  Designed to be extended with API-specific
 * concerns and validation.
 * @class
 * @param {object} config
 * @param {string} config.name - the name of this resource
 */
ozpIwc.CommonApiValue = function(config) {
	config = config || {};
	this.watchers=[];
	this.resource=config.resource;
    
  this.entity=config.entity;
	this.contentType=config.contentType;
	this.permissions=config.permissions || {};
	this.version=config.version || 0;
};

/**
 * Sets a data based upon the content of the packet.  Automatically updates the content type,
 * permissions, entity, and updates the version.
 * 
 * @param {ozpIwc.TransportPacket} packet
 * @returns {undefined}
 */
ozpIwc.CommonApiValue.prototype.set=function(packet) {
	if(this.isValidContentType(packet.contentType)) {
		this.permissions=packet.permissions || this.permissions;
		this.contentType=packet.contentType;
		this.entity=packet.entity;
		this.version++;
	}
};
/**
 * Adds a new watcher based upon the contents of the packet.
 * @param {ozpIwc.TransportPacket} packet
 * @returns {undefined}
 */
ozpIwc.CommonApiValue.prototype.watch=function(packet) {
	this.watchers.push({
		src: packet.src,
		msgId: packet.msgId
	});
};

/**
 * Removes a previously registered watcher.  An unwatch on
 * someone who isn't actually watching is not an error-- 
 * the post condition is satisfied.
 * 
 * @param {ozpIwc.TransportPacket} packet
 * @returns {undefined}
 */
ozpIwc.CommonApiValue.prototype.unwatch=function(packet) {
	this.watchers=this.watchers.filter(function(w) {
		return packet.replyTo !== w.msgId && packet.src !==w.src;
	});
};

/**
 * Invokes the callback on each watcher.
 * @param {function} callback
 * @param {object} [self] - Used as 'this' for the callback.  Defaults to the Value object.
 * @returns {undefined}
 */
ozpIwc.CommonApiValue.prototype.eachWatcher=function(callback,self) {
	self=self || this;
	return this.watchers.map(callback,self);
};

/**
 * Resets the data to an empy state-- undefined entity and contentType, no permissions,
 * and version of 0.  It does NOT remove watchers.  This allows for watches on values
 * that do not exist yet, or will be created in the future.
 * 
 * @returns {undefined}
 */
ozpIwc.CommonApiValue.prototype.deleteData=function() {
	this.entity=undefined;
	this.contentType=undefined;
	this.permissions=[];
	this.version=0;
};

/**
 * Turns this value into a packet.
 * 
 * @param {ozpIwc.TransportPacket} base - Fields to be merged into the packet.
 * @returns {ozpIwc.TransportPacket}
 */
ozpIwc.CommonApiValue.prototype.toPacket=function(base) {
	base = base || {};
	base.entity=ozpIwc.util.clone(this.entity);
	base.contentType=this.contentType;
	base.permissions=ozpIwc.util.clone(this.permissions);
	base.eTag=this.version;
	base.resource=this.resource;
	return base;
};

/**
 * Determines if the contentType is acceptible to this value.  Intended to be
 * overriden by subclasses.
 * @param {string} contentType
 * @returns {Boolean}
 */
ozpIwc.CommonApiValue.prototype.isValidContentType=function(contentType) {
	return true;
};

/**
 * Generates a point-in-time snapshot of this value that can later be sent to
 * {@link ozpIwc.CommonApiValue#changesSince} to determine the changes made to the value.
 * This value should be considered opaque to consumers.
 * 
 * <p> For API subclasses, the default behavior is to simply call toPacket().  Subclasses
 * can override this, but should likely override {@link ozpIwc.CommonApiValue#changesSince}
 * as well.
 * 
 * @returns {object}
 */
ozpIwc.CommonApiValue.prototype.snapshot=function() {
	return this.toPacket();
};

/**
 * From a given snapshot, create a change notifications.  This is not a delta, rather it's
 * change structure.
 * <p> API subclasses can override if there are additional change notifications (e.g. children in DataApi).

 * @param {object} snapshot
 * @returns {ozpIwc.CommonApiValue.prototype.changesSince.Anonym$1}
 */
ozpIwc.CommonApiValue.prototype.changesSince=function(snapshot) {
	if(snapshot.eTag === this.version) {
        return null;
    }
	return {
			'newValue': ozpIwc.util.clone(this.entity),
			'oldValue': snapshot.entity
	};
};
var ozpIwc=ozpIwc || {};

ozpIwc.DataApi = ozpIwc.util.extend(ozpIwc.CommonApiBase,function() {
	ozpIwc.CommonApiBase.apply(this,arguments);
});

ozpIwc.DataApi.prototype.makeValue = function(packet){
    return new ozpIwc.DataApiValue({resource: packet.resource});
};

ozpIwc.DataApi.prototype.createChild=function(node,packetContext) {
	var key=this.createKey(node.resource+"/");

	// save the new child
	var childNode=this.findOrMakeValue({'resource':key});
	childNode.set(packetContext.packet);
	return childNode;
};

ozpIwc.DataApi.prototype.handleList=function(node,packetContext) {
	packetContext.replyTo({
        'action': 'ok',
        'entity': node.listChildren()
    });
};

/**
 * @param {ozpIwc.CommonApiValue} node
 * @param {ozpIwc.TransportPacketContext} packetContext
 */
ozpIwc.DataApi.prototype.handleAddchild=function(node,packetContext) {
	var childNode=this.createChild(node,packetContext);

	node.addChild(childNode.resource);
	
	packetContext.replyTo({
        'action':'ok',
        'entity' : {
            'resource': childNode.resource
        }
    });
};

/**
 * @param {ozpIwc.CommonApiValue} node
 * @param {ozpIwc.TransportPacketContext} packetContext
 */
ozpIwc.DataApi.prototype.handleRemovechild=function(node,packetContext) {
    node.removeChild(packetContext.packet.entity.resource);
	// delegate to the handleGet call
	packetContext.replyTo({
        'action':'ok'
    });
};

ozpIwc.DataApiValue = ozpIwc.util.extend(ozpIwc.CommonApiValue,function(config) {
	ozpIwc.CommonApiValue.apply(this,arguments);
    config = config || {};
	this.children=config.children || [];
});

/**
 * 
 * @param {string} child - name of the child record of this
 * @returns {undefined}
 */
ozpIwc.DataApiValue.prototype.addChild=function(child) {
    if(this.children.indexOf(child) < 0) {
        this.children.push(child);
    	this.version++;
    }
};

/**
 * 
 * @param {string} child - name of the child record of this
 * @returns {undefined}
 */
ozpIwc.DataApiValue.prototype.removeChild=function(child) {
    var originalLen=this.children.length;
    this.children=this.children.filter(function(c) {
        return c !== child;
    });
    if(originalLen !== this.children.length) {
     	this.version++;
    }
};

/**
 * 
 * @param {string} child - name of the child record of this
 * @returns {undefined}
 */
ozpIwc.DataApiValue.prototype.listChildren=function() {
    return ozpIwc.util.clone(this.children);
};

/**
 * 
 * @param {string} child - name of the child record of this
 * @returns {undefined}
 */
ozpIwc.DataApiValue.prototype.toPacket=function() {
	var packet=ozpIwc.CommonApiValue.prototype.toPacket.apply(this,arguments);
	packet.links=packet.links || {};
	packet.links.children=this.listChildren();
	return packet;
};

ozpIwc.DataApiValue.prototype.changesSince=function(snapshot) {
    var changes=ozpIwc.CommonApiValue.prototype.changesSince.apply(this,arguments);
	if(changes) {
        changes.removedChildren=snapshot.links.children.filter(function(f) {
            return this.indexOf(f) < 0;
        },this.children);
        changes.addedChildren=this.children.filter(function(f) {
            return this.indexOf(f) < 0;
        },snapshot.links.children);
	};
    return changes;
};
/**
 * The Intents API. Subclasses The Common Api Base.
 * @class
 */
ozpIwc.IntentsApi = ozpIwc.util.extend(ozpIwc.CommonApiBase, function () {
    ozpIwc.CommonApiBase.apply(this, arguments);
    this.events.on("receive", ozpIwc.IntentsApi.prototype.parseResource, this);
});

/**
 * Internal method, not intended for API use. Used for handling resource path parsing.
 * @param  {string} resource - the resource path to be evaluated.
 * @returns {object} parsedResource
 * @returns {string} parsedResource.type - the type of the resource
 * @returns {string} parsedResource.subtype - the subtype of the resource
 * @returns {string} parsedResource.verb - the verb (action) of the resource
 * @returns {string} parsedResource.handler - the handler of the resource
 * @returns {string} parsedResource.capabilityRes - the resource path of this resource's capability
 * @returns {string} parsedResource.definitionRes - the resource path of this resource's definition
 * @returns {string} parsedResource.handlerRes - the resource path of this resource's handler
 * @returns {string} parsedResource.intentValueType - returns the value type given the resource path (capability, definition, handler)
 */
ozpIwc.IntentsApi.prototype.parseResource = function (packetContext) {
    var resourceSplit = packetContext.packet.resource.split('/');
    var result = {
        type: resourceSplit[1],
        subtype: resourceSplit[2],
        verb: resourceSplit[3],
        handler: resourceSplit[4]
    };
    if (result.type && result.subtype) {
        if (result.verb) {
            if (result.handler) {
                result.intentValueType = 'handler';
                result.handlerRes = '/' + resourceSplit[1] + '/' + resourceSplit[2] + '/' + resourceSplit[3] + '/' + resourceSplit[4];
                result.definitionRes = '/' + resourceSplit[1] + '/' + resourceSplit[2] + '/' + resourceSplit[3];
                result.capabilityRes = '/' + resourceSplit[1] + '/' + resourceSplit[2];
            } else {
                result.intentValueType = 'definition';
                result.definitionRes = '/' + resourceSplit[1] + '/' + resourceSplit[2] + '/' + resourceSplit[3];
                result.capabilityRes = '/' + resourceSplit[1] + '/' + resourceSplit[2];
            }
        } else {
            result.intentValueType = 'capabilities';
            result.capabilityRes = '/' + resourceSplit[1] + '/' + resourceSplit[2];
        }
        packetContext.packet.parsedResource = result;
    }
};

/**
 * Takes the resource of the given packet and creates an empty value in the IntentsApi. Chaining of creation is
 * accounted for (A handler requires a definition, which requires a capability).
 * @param {object} packet
 * @returns {IntentsApiHandlerValue|IntentsAPiDefinitionValue|IntentsApiCapabilityValue}
 */
ozpIwc.IntentsApi.prototype.makeValue = function (packet) {
    switch (packet.parsedResource.intentValueType) {
        case 'handler':
            return this.getHandler(packet);
        case 'definition':
            return this.getDefinition(packet);
        case 'capabilities':
            return this.getCapability(packet);
        default:
            return null;
    }
};

/**
 * Internal method, not intended for API use. Uses constructor parameter to determine what is constructed if the
 * resource does not exist.
 * @param {string} resource - the resource path of the desired value.
 * @param {Function} constructor - constructor function to be used if value does not exist.
 * @returns {IntentsApiHandlerValue|IntentsAPiDefinitionValue|IntentsApiCapabilityValue} node - node has only the resource parameter initialized.
 */
ozpIwc.IntentsApi.prototype.getGeneric = function (resource, constructor) {
    var node = this.data[resource];
    if (!node) {
        node = this.data[resource] = new constructor({resource: resource});
    }
    return node;
};

/**
 * Returns the given capability in the IntentsApi. Constructs a new one if it does not exist.
 * @param {object} parsedResource - the  parsed resource of the desired value. Created from parsedResource().
 * @returns {IntentsApiCapabilityValue} value - the capability value requested.
 */
ozpIwc.IntentsApi.prototype.getCapability = function (packet) {
    return this.getGeneric(packet.parsedResource.capabilityRes, ozpIwc.IntentsApiCapabilityValue);
};

/**
 * Returns the given definition in the IntentsApi. Constructs a new one if it does not exist. Constructs a capability
 * if necessary.
 * @param {object} parsedResource - the  parsed resource of the desired value. Created from parsedResource().
 * @returns {IntentsAPiDefinitionValue} value - the definition value requested.
 */
ozpIwc.IntentsApi.prototype.getDefinition = function (packet) {
    var capability = this.getCapability(packet);
    capability.entity = capability.entity || {};
    capability.entity.definitions = capability.entity.definitions || [];

    var definitionIndex = capability.entity.definitions.indexOf(packet.parsedResource.definitionRes);
    if (definitionIndex === -1) {
        capability.pushDefinition(packet.parsedResource.definitionRes);
    }

    return this.getGeneric(packet.parsedResource.definitionRes, ozpIwc.IntentsApiDefinitionValue);
};

/**
 * Returns the given handler in the IntentsApi. Constructs a new one if it does not exist. Constructs a definition
 * and capability if necessary.
 * @param {object} parsedResource - the  parsed resource of the desired value. Created from parsedResource().
 * @returns {IntentsApiHandlerValue} value - the handler value requested.
 */
ozpIwc.IntentsApi.prototype.getHandler = function (packet) {
    var definition = this.getDefinition(packet);
    definition.entity = definition.entity || {};
    definition.entity.handlers = definition.entity.handlers || [];

    var handlerIndex = definition.entity.handlers.indexOf(packet.parsedResource.handlerRes);
    if (handlerIndex === -1) {
        definition.pushHandler(packet.parsedResource.handlerRes);
    }

    return this.getGeneric(packet.parsedResource.handlerRes, ozpIwc.IntentsApiHandlerValue);
};

/**
 * Creates and registers a handler to the given definition resource path.
 * @param {object} node - the handler value to register, or the definition value the handler will register to
 * (handler will receive a generated key if definition value is provided).
 * @param {ozpIwc.TransportPacketContext} packetContext - the packet received by the router.
 */
ozpIwc.IntentsApi.prototype.handleRegister = function (node, packetContext) {
    if (packetContext.packet.parsedResource.intentValueType === 'definition') {
        packetContext.packet.parsedResource.handlerRes = this.createKey(packetContext.packet.resource + '/');
    } else if (packetContext.packet.parsedResource.intentValueType !== 'handler') {
        packetContext.replyTo({
            'action': 'badResource'
        });
        return null;
    }

    var handler = this.getHandler(packetContext.packet);
    handler.set(packetContext);

    packetContext.replyTo({
        'action': 'ok',
        'entity': handler.resource
    });
};

/**
 * Unregisters and destroys the handler assigned to the given handler resource path.
 * @param {object} node - the handler value to unregister from its definition.
 * @param {ozpIwc.TransportPacketContext} packetContext - the packet received by the router.
 */
ozpIwc.IntentsApi.prototype.handleUnregister = function (node, packetContext) {
    var definitionPath = packetContext.packet.parsedResource.definitionRes;
    var handlerPath = packetContext.packet.parsedResource.handlerRes;

    var index = this.data[definitionPath].entity.handlers.indexOf(handlerPath);

    if (index > -1) {
        this.data[definitionPath].entity.handlers.splice(index, 1);
    }
    delete this.data[handlerPath];
    packetContext.replyTo({'action': 'ok'});
};

/**
 * Invokes the appropriate handler for the intent from one of the following methods:
 *  <li> user preference specifies which handler to use. </li>
 *  <li> by prompting the user to select which handler to use. </li>
 *  <li> by receiving a handler resource instead of a definition resource </li>
 *  @todo <li> user preference specifies which handler to use. </li>
 *  @todo <li> by prompting the user to select which handler to use. </li>
 * @param {object} node - the definition or handler value used to invoke the intent.
 * @param {ozpIwc.TransportPacketContext} packetContext - the packet received by the router.
 */
ozpIwc.IntentsApi.prototype.handleInvoke = function (node, packetContext) {
    switch (packetContext.packet.parsedResource.intentValueType) {
        case 'handler':
            node.invoke(packetContext.packet);
            break;

        case 'definition':
            //TODO get user preference of which handler to use?
            var handlerPreference = 0;
            if (node.handlers.length > 0) {
                var handler = node.handlers[handlerPreference];
                this.data[handler].invoke(packet);
            } else {
                packetContext.replyTo({'action': 'badResource'});
            }
            break;

        default:
            packetContext.replyTo({'action': 'badResource'});
            break;
    }
};

/**
 * Listen for broadcast intents.
 * @todo unimplemented
 * @param {object} node - ?
 * @param {ozpIwc.TransportPacketContext} packetContext - the packet received by the router.
 */
ozpIwc.IntentsApi.prototype.handleListen = function (node, packetContext) {
    //TODO handleListen()
//    var parse = this.parseResource(packetContext.packet.resource);
//    if (parse.intentValueType !== 'definition') {
//        return packetContext.replyTo({
//            'action': 'badResource'
//        });
//    }
};

/**
 * Handle a broadcast intent.
 * @todo unimplemented
 * @param {object} node - ?
 * @param {ozpIwc.TransportPacketContext} packetContext - the packet received by the router.
 */
ozpIwc.IntentsApi.prototype.handleBroadcast = function (node, packetContext) {
    //TODO handleBroadcast()
//    var parse = this.parseResource(packetContext.packet.resource);
//    if (parse.intentValueType !== 'definition') {
//        return packetContext.replyTo({
//            'action': 'badResource'
//        });
//    }
//    for (var i in node.handlers) {
//        this.data[node.handlers[i]].invoke(packetContext.packet);
//    }
};

/**
 * The capability value for an intent. adheres to the ozp-intents-type-capabilities-v1+json content type.
 * @class
 * @param {object} config
 *@param {object} config.entity
 * @param {string} config.entity.definitions - the list of definitions in this intent capability.
 */
ozpIwc.IntentsApiCapabilityValue = ozpIwc.util.extend(ozpIwc.CommonApiValue, function (config) {
    ozpIwc.CommonApiValue.apply(this, arguments);
});

/**
 * Adds a definition to the end of the capability's list of definitions.
 * @param {string} definition - name of the definition added to this capability.
 */
ozpIwc.IntentsApiCapabilityValue.prototype.pushDefinition = function (definition) {
    this.entity.definitions = this.entity.definitions || [];
    this.entity.definitions.push(definition);
    this.version++;
};

/**
 * Adds a definition to the beginning of the capability's list of definitions.
 * @param {string} definition - name of the definition added to this capability.
 */
ozpIwc.IntentsApiCapabilityValue.prototype.unshiftDefinition = function (definition) {
    this.entity.definitions = this.entity.definitions || [];
    this.entity.definitions.unshift(definition);
    this.version++;
};

/**
 * Removes a definition from the end of the capability's list of definitions.
 * @returns {string} definition - name of the definition removed from this capability.
 */
ozpIwc.IntentsApiCapabilityValue.prototype.popDefinition = function () {
    if (this.entity.definitions && this.entity.definitions.length > 0) {
        this.version++;
        return this.entity.definitions.pop();
    }
};

/**
 * Removes a definition from the beginning of the capability's list of definitions.
 * @returns {string} definition - name of the definition removed from this capability.
 */
ozpIwc.IntentsApiCapabilityValue.prototype.shiftDefinition = function () {
    if (this.entity.definitions && this.entity.definitions.length > 0) {
        this.version++;
        return this.entity.definitions.shift();
    }
};

/**
 * Lists all definitions of the given capability.
 * @returns {Array} definitions - list of definitions in this capability.
 */
ozpIwc.IntentsApiCapabilityValue.prototype.listDefinitions = function () {
    return this.entity.definitions;
};
/**
 * The definition value for an intent. adheres to the ozp-intents-definition-v1+json content type.
 * @class
 * @param {object} config
 * @param {object} config.entity
 * @param {string} config.entity.type - the type of this intent definition.
 * @param {string} config.entity.action - the action of this intent definition.
 * @param {string} config.entity.icon - the icon for this intent definition.
 * @param {string} config.entity.label - the label for this intent definition.
 * @param {string} config.entity.handlers - the list of handlers for the definition.
 */
ozpIwc.IntentsApiDefinitionValue = ozpIwc.util.extend(ozpIwc.CommonApiValue, function (config) {
    ozpIwc.CommonApiValue.apply(this, arguments);
});

/**
 *
 * Adds a handler to the end of the definition's list of handler.
 * @param {string} definition - name of the handler added to this definition.
 */
ozpIwc.IntentsApiDefinitionValue.prototype.pushHandler = function (handler) {
    this.entity.handlers = this.entity.handlers || [];
    this.entity.handlers.push(handler);
    this.version++;
};

/**
 * Adds a handler to the beginning of the definition's list of handler.
 * @param {string} definition - name of the handler added to this definition.
 */
ozpIwc.IntentsApiDefinitionValue.prototype.unshiftHandler = function (handler) {
    this.entity.handlers = this.entity.handlers || [];
    this.entity.handlers.unshift(handler);
    this.version++;
};

/**
 * Removes a handler from the end of the definition's list of handlers.
 * @returns {string} handler - name of the handler removed from this definition.
 */
ozpIwc.IntentsApiDefinitionValue.prototype.popHandler = function () {
    if (this.entity.handlers && this.entity.handlers.length > 0) {
        this.version++;
        return this.entity.handlers.pop();
    }
};

/**
 * Removes a handler from the beginning of the definition's list of handlers.
 * @returns {string} handler - name of the handler removed from this definition.
 */
ozpIwc.IntentsApiDefinitionValue.prototype.shiftHandler = function () {
    if (this.entity.handlers && this.entity.handlers.length > 0) {
        this.version++;
        return this.entity.handlers.shift();
    }
};

/**
 * Lists all handlers of the given intent definition.
 * @returns {Array} handlers - list of handlers in this capability.
 */
ozpIwc.IntentsApiDefinitionValue.prototype.listHandlers = function () {
    return this.entity.handlers;
};
/**
 * The handler value for an intent. adheres to the ozp-intents-handler-v1+json content type.
 * @class
 * @param {object} config
 * @param {object} config.entity
 * @param {string} config.entity.type - the type of this intent handler.
 * @param {string} config.entity.action - the action of this intent handler.
 * @param {string} config.entity.icon - the icon for this intent handler.
 * @param {string} config.entity.label - the label for this intent handler.
 * @param {string} config.entity.invokeIntent - the resource that will be called when handling an invoked intent.
 */
ozpIwc.IntentsApiHandlerValue = ozpIwc.util.extend(ozpIwc.CommonApiValue, function (config) {
    ozpIwc.CommonApiValue.apply(this, arguments);
});

/**
 * Invokes the handler with the given packet information.
 * @param {object} packet - information passed to the activity receiving the intent.
 */
ozpIwc.IntentsApiHandlerValue.prototype.invoke = function (packet) {
    console.error('Invoking of intents.api handlers is not implemented.' +
        'Override ozpIwc.IntentsApiHandlerValue.invoke to implement');
};

var ozpIwc=ozpIwc || {};

ozpIwc.NamesApi = ozpIwc.util.extend(ozpIwc.CommonApiBase,function() {
	ozpIwc.CommonApiBase.apply(this,arguments);
});

var ozpIwc=ozpIwc || {};

ozpIwc.SystemApi = ozpIwc.util.extend(ozpIwc.CommonApiBase,function() {
	ozpIwc.CommonApiBase.apply(this,arguments);
});
