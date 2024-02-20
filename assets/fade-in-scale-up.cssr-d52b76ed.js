import{z as K,F as T,P as D,r as z,L as C,a as O,K as N,d as k,t as R,c as ee,h as u,U as te,o as ne,b as re}from"./index-a9527854.js";import{k as y,q as g,o as p,p as oe,M as se,a as ie,b as $,d as c,F as ae,aC as ce,N as ue,y as le}from"./Button-8d32fee1.js";let v=[];const U=new WeakMap;function de(){v.forEach(e=>e(...U.get(e))),v=[]}function $e(e,...t){U.set(e,t),!v.includes(e)&&v.push(e)===1&&requestAnimationFrame(de)}function fe(e=8){return Math.random().toString(16).slice(2,2+e)}function Se(e,t){const r=[];if(!t){for(let n=0;n<e;++n)r.push(n);return r}for(let n=0;n<e;++n)r.push(t(n));return r}function ze(e,t="default",r=[]){const o=e.$slots[t];return o===void 0?r:o()}function Fe(e,t=[],r){const n={};return t.forEach(o=>{n[o]=e[o]}),Object.assign(n,r)}function Z(e,t=!0,r=[]){return e.forEach(n=>{if(n!==null){if(typeof n!="object"){(typeof n=="string"||typeof n=="number")&&r.push(K(String(n)));return}if(Array.isArray(n)){Z(n,t,r);return}if(n.type===T){if(n.children===null)return;Array.isArray(n.children)&&Z(n.children,t,r)}else{if(n.type===D&&t)return;r.push(n)}}}),r}const he=/^(\d|\.)+$/,A=/(\d|\.)+/;function Te(e,{c:t=1,offset:r=0,attachPx:n=!0}={}){if(typeof e=="number"){const o=(e+r)*t;return o===0?"0":`${o}px`}else if(typeof e=="string")if(he.test(e)){const o=(Number(e)+r)*t;return n?o===0?"0":`${o}px`:`${o}`}else{const o=A.exec(e);return o?e.replace(A,String((Number(o[0])+r)*t)):e}return e}const H=new WeakSet;function ke(e){H.add(e)}function Be(e){return!H.has(e)}function be(e){const t=z(!!e.value);if(t.value)return C(t);const r=O(e,n=>{n&&(t.value=!0,r())});return C(t)}function Le(){return N()!==null}const Ce=typeof window<"u",Ze=y("n-modal-body"),Ae=y("n-modal"),Me=y("n-drawer-body"),je=y("n-drawer"),Pe=y("n-popover-body");function M(e,t,r="default"){const n=t[r];if(n===void 0)throw new Error(`[vueuc/${e}]: slot[${r}] is empty.`);return n()}function F(e,t=!0,r=[]){return e.forEach(n=>{if(n!==null){if(typeof n!="object"){(typeof n=="string"||typeof n=="number")&&r.push(K(String(n)));return}if(Array.isArray(n)){F(n,t,r);return}if(n.type===T){if(n.children===null)return;Array.isArray(n.children)&&F(n.children,t,r)}else n.type!==D&&r.push(n)}}),r}function qe(e,t,r="default"){const n=t[r];if(n===void 0)throw new Error(`[vueuc/${e}]: slot[${r}] is empty.`);const o=F(n());if(o.length===1)return o[0];throw new Error(`[vueuc/${e}]: slot[${r}] should have exactly one child.`)}const f="@@coContext",pe={mounted(e,{value:t,modifiers:r}){e[f]={handler:void 0},typeof t=="function"&&(e[f].handler=t,g("clickoutside",e,t,{capture:r.capture}))},updated(e,{value:t,modifiers:r}){const n=e[f];typeof t=="function"?n.handler?n.handler!==t&&(p("clickoutside",e,n.handler,{capture:r.capture}),n.handler=t,g("clickoutside",e,t,{capture:r.capture})):(e[f].handler=t,g("clickoutside",e,t,{capture:r.capture})):n.handler&&(p("clickoutside",e,n.handler,{capture:r.capture}),n.handler=void 0)},unmounted(e,{modifiers:t}){const{handler:r}=e[f];r&&p("clickoutside",e,r,{capture:t.capture}),e[f].handler=void 0}},Ke=pe;function ye(e,t){console.error(`[vdirs/${e}]: ${t}`)}class me{constructor(){this.elementZIndex=new Map,this.nextZIndex=2e3}get elementCount(){return this.elementZIndex.size}ensureZIndex(t,r){const{elementZIndex:n}=this;if(r!==void 0){t.style.zIndex=`${r}`,n.delete(t);return}const{nextZIndex:o}=this;n.has(t)&&n.get(t)+1===this.nextZIndex||(t.style.zIndex=`${o}`,n.set(t,o),this.nextZIndex=o+1,this.squashState())}unregister(t,r){const{elementZIndex:n}=this;n.has(t)?n.delete(t):r===void 0&&ye("z-index-manager/unregister-element","Element not found when unregistering."),this.squashState()}squashState(){const{elementCount:t}=this;t||(this.nextZIndex=2e3),this.nextZIndex-t>2500&&this.rearrange()}rearrange(){const t=Array.from(this.elementZIndex.entries());t.sort((r,n)=>r[1]-n[1]),this.nextZIndex=2e3,t.forEach(r=>{const n=r[0],o=this.nextZIndex++;`${o}`!==n.style.zIndex&&(n.style.zIndex=`${o}`)})}}const S=new me,h="@@ziContext",xe={mounted(e,t){const{value:r={}}=t,{zIndex:n,enabled:o}=r;e[h]={enabled:!!o,initialized:!1},o&&(S.ensureZIndex(e,n),e[h].initialized=!0)},updated(e,t){const{value:r={}}=t,{zIndex:n,enabled:o}=r,a=e[h].enabled;o&&!a&&(S.ensureZIndex(e,n),e[h].initialized=!0),e[h].enabled=!!o},unmounted(e,t){if(!e[h].initialized)return;const{value:r={}}=t,{zIndex:n}=r;S.unregister(e,n)}},De=xe;function j(e){return typeof e=="string"?document.querySelector(e):e()}const Oe=k({name:"LazyTeleport",props:{to:{type:[String,Object],default:void 0},disabled:Boolean,show:{type:Boolean,required:!0}},setup(e){return{showTeleport:be(R(e,"show")),mergedTo:ee(()=>{const{to:t}=e;return t??"body"})}},render(){return this.showTeleport?this.disabled?M("lazy-teleport",this.$slots):u(te,{disabled:this.disabled,to:this.mergedTo},M("lazy-teleport",this.$slots)):null}});function V(e){return e instanceof HTMLElement}function _(e){for(let t=0;t<e.childNodes.length;t++){const r=e.childNodes[t];if(V(r)&&(X(r)||_(r)))return!0}return!1}function W(e){for(let t=e.childNodes.length-1;t>=0;t--){const r=e.childNodes[t];if(V(r)&&(X(r)||W(r)))return!0}return!1}function X(e){if(!ge(e))return!1;try{e.focus({preventScroll:!0})}catch{}return document.activeElement===e}function ge(e){if(e.tabIndex>0||e.tabIndex===0&&e.getAttribute("tabIndex")!==null)return!0;if(e.getAttribute("disabled"))return!1;switch(e.nodeName){case"A":return!!e.href&&e.rel!=="ignore";case"INPUT":return e.type!=="hidden"&&e.type!=="file";case"BUTTON":case"SELECT":case"TEXTAREA":return!0;default:return!1}}let b=[];const Re=k({name:"FocusTrap",props:{disabled:Boolean,active:Boolean,autoFocus:{type:Boolean,default:!0},onEsc:Function,initialFocusTo:String,finalFocusTo:String,returnFocusOnDeactivated:{type:Boolean,default:!0}},setup(e){const t=fe(),r=z(null),n=z(null);let o=!1,a=!1;const I=typeof document>"u"?null:document.activeElement;function l(){return b[b.length-1]===t}function E(s){var i;s.code==="Escape"&&l()&&((i=e.onEsc)===null||i===void 0||i.call(e,s))}ne(()=>{O(()=>e.active,s=>{s?(Y(),g("keydown",document,E)):(p("keydown",document,E),o&&L())},{immediate:!0})}),re(()=>{p("keydown",document,E),o&&L()});function B(s){if(!a&&l()){const i=w();if(i===null||i.contains(oe(s)))return;d("first")}}function w(){const s=r.value;if(s===null)return null;let i=s;for(;i=i.nextSibling,!(i===null||i instanceof Element&&i.tagName==="DIV"););return i}function Y(){var s;if(!e.disabled){if(b.push(t),e.autoFocus){const{initialFocusTo:i}=e;i===void 0?d("first"):(s=j(i))===null||s===void 0||s.focus({preventScroll:!0})}o=!0,document.addEventListener("focus",B,!0)}}function L(){var s;if(e.disabled||(document.removeEventListener("focus",B,!0),b=b.filter(m=>m!==t),l()))return;const{finalFocusTo:i}=e;i!==void 0?(s=j(i))===null||s===void 0||s.focus({preventScroll:!0}):e.returnFocusOnDeactivated&&I instanceof HTMLElement&&(a=!0,I.focus({preventScroll:!0}),a=!1)}function d(s){if(l()&&e.active){const i=r.value,m=n.value;if(i!==null&&m!==null){const x=w();if(x==null||x===m){a=!0,i.focus({preventScroll:!0}),a=!1;return}a=!0;const Q=s==="first"?_(x):W(x);a=!1,Q||(a=!0,i.focus({preventScroll:!0}),a=!1)}}}function G(s){if(a)return;const i=w();i!==null&&(s.relatedTarget!==null&&i.contains(s.relatedTarget)?d("last"):d("first"))}function J(s){a||(s.relatedTarget!==null&&s.relatedTarget===r.value?d("last"):d("first"))}return{focusableStartRef:r,focusableEndRef:n,focusableStyle:"position: absolute; height: 0; width: 0;",handleStartFocus:G,handleEndFocus:J}},render(){const{default:e}=this.$slots;if(e===void 0)return null;if(this.disabled)return e();const{active:t,focusableStyle:r}=this;return u(T,null,[u("div",{"aria-hidden":"true",tabindex:t?"0":"-1",ref:"focusableStartRef",style:r,onFocus:this.handleStartFocus}),e(),u("div",{"aria-hidden":"true",style:r,ref:"focusableEndRef",tabindex:t?"0":"-1",onFocus:this.handleEndFocus})])}}),ve=se("close",u("svg",{viewBox:"0 0 12 12",version:"1.1",xmlns:"http://www.w3.org/2000/svg","aria-hidden":!0},u("g",{stroke:"none","stroke-width":"1",fill:"none","fill-rule":"evenodd"},u("g",{fill:"currentColor","fill-rule":"nonzero"},u("path",{d:"M2.08859116,2.2156945 L2.14644661,2.14644661 C2.32001296,1.97288026 2.58943736,1.95359511 2.7843055,2.08859116 L2.85355339,2.14644661 L6,5.293 L9.14644661,2.14644661 C9.34170876,1.95118446 9.65829124,1.95118446 9.85355339,2.14644661 C10.0488155,2.34170876 10.0488155,2.65829124 9.85355339,2.85355339 L6.707,6 L9.85355339,9.14644661 C10.0271197,9.32001296 10.0464049,9.58943736 9.91140884,9.7843055 L9.85355339,9.85355339 C9.67998704,10.0271197 9.41056264,10.0464049 9.2156945,9.91140884 L9.14644661,9.85355339 L6,6.707 L2.85355339,9.85355339 C2.65829124,10.0488155 2.34170876,10.0488155 2.14644661,9.85355339 C1.95118446,9.65829124 1.95118446,9.34170876 2.14644661,9.14644661 L5.293,6 L2.14644661,2.85355339 C1.97288026,2.67998704 1.95359511,2.41056264 2.08859116,2.2156945 L2.14644661,2.14644661 L2.08859116,2.2156945 Z"}))))),Ie=ie("base-close",`
 display: flex;
 align-items: center;
 justify-content: center;
 cursor: pointer;
 background-color: transparent;
 color: var(--n-close-icon-color);
 border-radius: var(--n-close-border-radius);
 height: var(--n-close-size);
 width: var(--n-close-size);
 font-size: var(--n-close-icon-size);
 outline: none;
 border: none;
 position: relative;
 padding: 0;
`,[$("absolute",`
 height: var(--n-close-icon-size);
 width: var(--n-close-icon-size);
 `),c("&::before",`
 content: "";
 position: absolute;
 width: var(--n-close-size);
 height: var(--n-close-size);
 left: 50%;
 top: 50%;
 transform: translateY(-50%) translateX(-50%);
 transition: inherit;
 border-radius: inherit;
 `),ae("disabled",[c("&:hover",`
 color: var(--n-close-icon-color-hover);
 `),c("&:hover::before",`
 background-color: var(--n-close-color-hover);
 `),c("&:focus::before",`
 background-color: var(--n-close-color-hover);
 `),c("&:active",`
 color: var(--n-close-icon-color-pressed);
 `),c("&:active::before",`
 background-color: var(--n-close-color-pressed);
 `)]),$("disabled",`
 cursor: not-allowed;
 color: var(--n-close-icon-color-disabled);
 background-color: transparent;
 `),$("round",[c("&::before",`
 border-radius: 50%;
 `)])]),Ue=k({name:"BaseClose",props:{isButtonTag:{type:Boolean,default:!0},clsPrefix:{type:String,required:!0},disabled:{type:Boolean,default:void 0},focusable:{type:Boolean,default:!0},round:Boolean,onClick:Function,absolute:Boolean},setup(e){return ce("-base-close",Ie,R(e,"clsPrefix")),()=>{const{clsPrefix:t,disabled:r,absolute:n,round:o,isButtonTag:a}=e;return u(a?"button":"div",{type:a?"button":void 0,tabindex:r||!e.focusable?-1:0,"aria-disabled":r,"aria-label":"close",role:a?void 0:"button",disabled:r,class:[`${t}-base-close`,n&&`${t}-base-close--absolute`,r&&`${t}-base-close--disabled`,o&&`${t}-base-close--round`],onMousedown:l=>{e.focusable||l.preventDefault()},onClick:e.onClick},u(ue,{clsPrefix:t},{default:()=>u(ve,null)}))}}}),{cubicBezierEaseIn:P,cubicBezierEaseOut:q}=le;function He({transformOrigin:e="inherit",duration:t=".2s",enterScale:r=".9",originalTransform:n="",originalTransition:o=""}={}){return[c("&.fade-in-scale-up-transition-leave-active",{transformOrigin:e,transition:`opacity ${t} ${P}, transform ${t} ${P} ${o&&","+o}`}),c("&.fade-in-scale-up-transition-enter-active",{transformOrigin:e,transition:`opacity ${t} ${q}, transform ${t} ${q} ${o&&","+o}`}),c("&.fade-in-scale-up-transition-enter-from, &.fade-in-scale-up-transition-leave-to",{opacity:0,transform:`${n} scale(${r})`}),c("&.fade-in-scale-up-transition-leave-from, &.fade-in-scale-up-transition-enter-to",{opacity:1,transform:`${n} scale(1)`})]}export{Re as F,Oe as L,Ue as N,Te as a,Z as b,Ke as c,je as d,Me as e,He as f,Be as g,ze as h,Se as i,Ce as j,Fe as k,$e as l,Ze as m,Le as n,fe as o,Pe as p,ke as q,Ae as r,M as s,qe as t,De as z};
