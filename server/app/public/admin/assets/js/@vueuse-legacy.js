System.register(["./@vue-legacy.js"],(function(e,t){"use strict";var n,r,o,i,u,a,l,s,c,d,f,v;return{setters:[e=>{n=e.u,r=e.g,o=e.b,i=e.r,u=e.w,a=e.e,l=e.s,s=e.f,c=e.h,d=e.i,f=e.n,v=e.j}],execute:function(){e({a:function(e,t,n={}){const r=n,{window:o=D}=r,i=G(r,["window"]);let a;const l=L((()=>o&&"ResizeObserver"in o)),s=()=>{a&&(a.disconnect(),a=void 0)},c=u((()=>C(e)),(e=>{s(),l.value&&o&&e&&(a=new ResizeObserver(t),a.observe(e,i))}),{immediate:!0,flush:"post"}),d=()=>{s(),c()};return Q(d),{isSupported:l,stop:d}},b:C,c:function(e,t,{window:n=D,initialValue:r=""}={}){const o=i(r),a=v((()=>{var e;return C(t)||(null==(e=null==n?void 0:n.document)?void 0:e.documentElement)}));return u([a,()=>x(e)],(([e,t])=>{var i;if(e&&n){const u=null==(i=n.getComputedStyle(e).getPropertyValue(t))?void 0:i.trim();o.value=u||r}}),{immediate:!0}),u(o,(t=>{var n;(null==(n=a.value)?void 0:n.style)&&a.value.style.setProperty(x(e),t)})),o},d:function(e,t,n={}){const{immediate:r=!0}=n,o=i(!1);let u=null;function l(){u&&(clearTimeout(u),u=null)}function s(){o.value=!1,l()}function c(...n){l(),o.value=!0,u=setTimeout((()=>{o.value=!1,u=null,e(...n)}),x(t))}return r&&(o.value=!0,I&&c()),Q(s),{isPending:a(o),start:c,stop:s}},e:function(e,t=200,n=!1,r=!0,o=!1){return N(function(e,t=!0,n=!0,r=!1){let o,i,u=0,a=!0,l=T;const s=()=>{o&&(clearTimeout(o),o=void 0,l(),l=T)},c=c=>{const d=x(e),f=Date.now()-u,v=()=>i=c();return s(),d<=0?(u=Date.now(),v()):(f>d&&(n||!a)?(u=Date.now(),v()):t&&(i=new Promise(((e,t)=>{l=r?t:e,o=setTimeout((()=>{u=Date.now(),a=!0,e(v()),s()}),Math.max(0,d-f))}))),n||o||(o=setTimeout((()=>a=!0),d)),a=!1,i)};return c}(t,n,r,o),e)},g:function(e,t,n={}){const r=n,{window:o=D}=r,i=q(r,["window"]);let a;const l=L((()=>o&&"MutationObserver"in o)),s=()=>{a&&(a.disconnect(),a=void 0)},c=u((()=>C(e)),(e=>{s(),l.value&&o&&e&&(a=new MutationObserver(t),a.observe(e,i))}),{immediate:!0}),d=()=>{s(),c()};return Q(d),{isSupported:l,stop:d}},h:function({document:e=k}={}){if(!e)return i("visible");const t=i(e.visibilityState);return _(e,"visibilitychange",(()=>{t.value=e.visibilityState})),t},j:function({window:e=D}={}){if(!e)return i(!1);const t=i(e.document.hasFocus());return _(e,"blur",(()=>{t.value=!1})),_(e,"focus",(()=>{t.value=!0})),t},k:function(e,t){const n=l();return s((()=>{n.value=e()}),P(h({},t),{flush:"sync"})),a(n)},l:function(e,t,n,r={}){var o,a,l;const{clone:s=!1,passive:d=!1,eventName:f,deep:p=!1,defaultValue:m}=r,y=c(),O=(null==y?void 0:y.emit)||(null==(o=null==y?void 0:y.$emit)?void 0:o.bind(y))||(null==(l=null==(a=null==y?void 0:y.proxy)?void 0:a.$emit)?void 0:l.bind(null==y?void 0:y.proxy));let b=f;b=f||b||`update:${t.toString()}`;const w=e=>{return s?j(s)?s(e):(t=e,JSON.parse(JSON.stringify(t))):e;var t},g=()=>E(e[t])?w(e[t]):m;if(d){const n=g(),r=i(n);return u((()=>e[t]),(e=>r.value=w(e))),u(r,(n=>{(n!==e[t]||p)&&O(b,n)}),{deep:p}),r}return v({get:()=>g(),set(e){O(b,e)}})},o:function(e,t,n={}){const{window:r=D,ignore:o=[],capture:i=!0,detectIframe:u=!1}=n;if(!r)return;A&&!B&&(B=!0,Array.from(r.document.body.children).forEach((e=>e.addEventListener("click",T))));let a=!0;const l=e=>o.some((t=>{if("string"==typeof t)return Array.from(r.document.querySelectorAll(t)).some((t=>t===e.target||e.composedPath().includes(t)));{const n=C(t);return n&&(e.target===n||e.composedPath().includes(n))}})),s=[_(r,"click",(n=>{const r=C(e);r&&r!==n.target&&!n.composedPath().includes(r)&&(0===n.detail&&(a=!l(n)),a?t(n):a=!0)}),{passive:!0,capture:i}),_(r,"pointerdown",(t=>{const n=C(e);n&&(a=!t.composedPath().includes(n)&&!l(t))}),{passive:!0}),u&&_(r,"blur",(n=>{var o;const i=C(e);"IFRAME"!==(null==(o=r.document.activeElement)?void 0:o.tagName)||(null==i?void 0:i.contains(r.document.activeElement))||t(n)}))].filter(Boolean);return()=>s.forEach((e=>e()))},r:function(e,t=200,n={}){const r=i(e.value),o=function(e,t=200,n={}){return N(function(e,t={}){let n,r,o=T;const i=e=>{clearTimeout(e),o(),o=T},u=u=>{const a=x(e),l=x(t.maxWait);return n&&i(n),a<=0||void 0!==l&&l<=0?(r&&(i(r),r=null),Promise.resolve(u())):new Promise(((e,s)=>{o=t.rejectOnCancel?s:e,l&&!r&&(r=setTimeout((()=>{n&&i(n),r=null,e(u())}),l)),n=setTimeout((()=>{r&&i(r),r=null,e(u())}),a)}))};return u}(t,n),e)}((()=>{r.value=e.value}),t,n);return u(e,(()=>o())),r},t:Q,u:_});var t,p=Object.defineProperty,m=Object.defineProperties,y=Object.getOwnPropertyDescriptors,O=Object.getOwnPropertySymbols,b=Object.prototype.hasOwnProperty,w=Object.prototype.propertyIsEnumerable,g=(e,t,n)=>t in e?p(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,h=(e,t)=>{for(var n in t||(t={}))b.call(t,n)&&g(e,n,t[n]);if(O)for(var n of O(t))w.call(t,n)&&g(e,n,t[n]);return e},P=(e,t)=>m(e,y(t));const I=e("i","undefined"!=typeof window),E=e=>void 0!==e,j=e=>"function"==typeof e,S=e=>"string"==typeof e,T=()=>{},A=e("f",I&&(null==(t=null==window?void 0:window.navigator)?void 0:t.userAgent)&&/iP(ad|hone|od)/.test(window.navigator.userAgent));function x(e){return"function"==typeof e?e():n(e)}function N(e,t){return function(...n){return new Promise(((r,o)=>{Promise.resolve(e((()=>t.apply(this,n)),{fn:t,thisArg:this,args:n})).then(r).catch(o)}))}}function Q(e){return!!r()&&(o(e),!0)}function C(e){var t;const n=x(e);return null!=(t=null==n?void 0:n.$el)?t:n}const D=I?window:void 0,k=I?window.document:void 0;function _(...e){let t,n,r,o;if(S(e[0])||Array.isArray(e[0])?([n,r,o]=e,t=D):[t,n,r,o]=e,!t)return T;Array.isArray(n)||(n=[n]),Array.isArray(r)||(r=[r]);const i=[],a=()=>{i.forEach((e=>e())),i.length=0},l=u((()=>[C(t),x(o)]),(([e,t])=>{a(),e&&i.push(...n.flatMap((n=>r.map((r=>((e,t,n,r)=>(e.addEventListener(t,n,r),()=>e.removeEventListener(t,n,r)))(e,n,r,t))))))}),{immediate:!0,flush:"post"}),s=()=>{l(),a()};return Q(s),s}let B=!1;function L(e,t=!1){const n=i(),r=()=>n.value=Boolean(e());return r(),function(e,t=!0){c()?d(e):t?e():f(e)}(r,t),n}const M="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},R="__vueuse_ssr_handlers__";M[R]=M[R]||{};var F,$,V=Object.getOwnPropertySymbols,W=Object.prototype.hasOwnProperty,z=Object.prototype.propertyIsEnumerable,G=(e,t)=>{var n={};for(var r in e)W.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&V)for(var r of V(e))t.indexOf(r)<0&&z.call(e,r)&&(n[r]=e[r]);return n},H=Object.getOwnPropertySymbols,J=Object.prototype.hasOwnProperty,U=Object.prototype.propertyIsEnumerable,q=(e,t)=>{var n={};for(var r in e)J.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&H)for(var r of H(e))t.indexOf(r)<0&&U.call(e,r)&&(n[r]=e[r]);return n};($=F||(F={})).UP="UP",$.RIGHT="RIGHT",$.DOWN="DOWN",$.LEFT="LEFT",$.NONE="NONE";var K=Object.defineProperty,X=Object.getOwnPropertySymbols,Y=Object.prototype.hasOwnProperty,Z=Object.prototype.propertyIsEnumerable,ee=(e,t,n)=>t in e?K(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;((e,t)=>{for(var n in t||(t={}))Y.call(t,n)&&ee(e,n,t[n]);if(X)for(var n of X(t))Z.call(t,n)&&ee(e,n,t[n])})({linear:function(e){return e}},{easeInSine:[.12,0,.39,0],easeOutSine:[.61,1,.88,1],easeInOutSine:[.37,0,.63,1],easeInQuad:[.11,0,.5,0],easeOutQuad:[.5,1,.89,1],easeInOutQuad:[.45,0,.55,1],easeInCubic:[.32,0,.67,0],easeOutCubic:[.33,1,.68,1],easeInOutCubic:[.65,0,.35,1],easeInQuart:[.5,0,.75,0],easeOutQuart:[.25,1,.5,1],easeInOutQuart:[.76,0,.24,1],easeInQuint:[.64,0,.78,0],easeOutQuint:[.22,1,.36,1],easeInOutQuint:[.83,0,.17,1],easeInExpo:[.7,0,.84,0],easeOutExpo:[.16,1,.3,1],easeInOutExpo:[.87,0,.13,1],easeInCirc:[.55,0,1,.45],easeOutCirc:[0,.55,.45,1],easeInOutCirc:[.85,0,.15,1],easeInBack:[.36,0,.66,-.56],easeOutBack:[.34,1.56,.64,1],easeInOutBack:[.68,-.6,.32,1.6]})}}}));
