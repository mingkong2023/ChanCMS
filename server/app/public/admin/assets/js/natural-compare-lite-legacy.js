System.register(["./dayjs-legacy.js"],(function(r,t){"use strict";var e;return{setters:[r=>{e=r.g}],execute:function(){var t={exports:{}},n=function(r,t){var e,n,a=1,i=0,c=0,s=String.alphabet;function u(r,t,n){if(n){for(e=t;(n=u(r,e))<76&&n>65;)++e;return+r.slice(t-1,e)}return(n=s&&s.indexOf(r.charAt(t)))>-1?n+76:(n=r.charCodeAt(t)||0)<45||n>127?n:n<46?65:n<48?n-1:n<58?n+18:n<65?n-11:n<91?n+11:n<97?n-37:n<123?n+5:n-63}if((r+="")!=(t+=""))for(;a;)if(n=u(r,i++),a=u(t,c++),n<76&&a<76&&n>66&&a>66&&(n=u(r,i,i),a=u(t,c,i=e),c=e),n!=a)return n<a?-1:1;return 0};
/*
			 * @version    1.4.0
			 * @date       2015-10-26
			 * @stability  3 - Stable
			 * @author     Lauri Rooden (https://github.com/litejs/natural-compare-lite)
			 * @license    MIT License
			 */try{t.exports=n}catch(i){String.naturalCompare=n}var a=t.exports;r("a",e(a))}}}));
