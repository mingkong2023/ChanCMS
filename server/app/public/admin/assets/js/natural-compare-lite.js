import{g as r}from"./dayjs.js";var t={exports:{}},a=function(r,t){var a,e,n=1,o=0,i=0,f=String.alphabet;function s(r,t,e){if(e){for(a=t;(e=s(r,a))<76&&e>65;)++a;return+r.slice(t-1,a)}return(e=f&&f.indexOf(r.charAt(t)))>-1?e+76:(e=r.charCodeAt(t)||0)<45||e>127?e:e<46?65:e<48?e-1:e<58?e+18:e<65?e-11:e<91?e+11:e<97?e-37:e<123?e+5:e-63}if((r+="")!=(t+=""))for(;n;)if(e=s(r,o++),n=s(t,i++),e<76&&n<76&&e>66&&n>66&&(e=s(r,o,o),n=s(t,i,o=a),i=a),e!=n)return e<n?-1:1;return 0};
/*
 * @version    1.4.0
 * @date       2015-10-26
 * @stability  3 - Stable
 * @author     Lauri Rooden (https://github.com/litejs/natural-compare-lite)
 * @license    MIT License
 */try{t.exports=a}catch(n){String.naturalCompare=a}const e=r(t.exports);export{e as a};
