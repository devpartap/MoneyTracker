import{A as I,F as C,P as R,r as T,N as M,g as U,K as te,d as L,t as V,a as ne,h as c,U as re,b as oe,e as se}from"./index-1e0e2f7c.js";import{_ as j,a as y,n as d,o as l,m as ie,Q as ae,e as ue,h as F,g as u,K as ce,aD as le,B as de,v as fe}from"./Button-6c271e84.js";let E=[];const _=new WeakMap;function he(){E.forEach(e=>e(..._.get(e))),E=[]}function ze(e,...t){_.set(e,t),!E.includes(e)&&E.push(e)===1&&requestAnimationFrame(he)}function pe(e=8){return Math.random().toString(16).slice(2,2+e)}function Te(e,t){const n=[];if(!t){for(let r=0;r<e;++r)n.push(r);return n}for(let r=0;r<e;++r)n.push(t(r));return n}function ke(e,t="default",n=[]){const o=e.$slots[t];return o===void 0?n:o()}function Be(e,t=[],n){const r={};return t.forEach(o=>{r[o]=e[o]}),Object.assign(r,n)}function k(e,t=!0,n=[]){return e.forEach(r=>{if(r!==null){if(typeof r!="object"){(typeof r=="string"||typeof r=="number")&&n.push(I(String(r)));return}if(Array.isArray(r)){k(r,t,n);return}if(r.type===C){if(r.children===null)return;Array.isArray(r.children)&&k(r.children,t,n)}else{if(r.type===R&&t)return;n.push(r)}}}),n}const Ce=(e,...t)=>typeof e=="function"?e(...t):typeof e=="string"?I(e):typeof e=="number"?I(String(e)):null;function Le(e,t="default",n=void 0){const r=e[t];if(!r)return j("getFirstSlotVNode",`slot[${t}] is empty`),null;const o=k(r(n));return o.length===1?o[0]:(j("getFirstSlotVNode",`slot[${t}] should have exactly one child`),null)}const be=/^(\d|\.)+$/,K=/(\d|\.)+/;function Ze(e,{c:t=1,offset:n=0,attachPx:r=!0}={}){if(typeof e=="number"){const o=(e+n)*t;return o===0?"0":`${o}px`}else if(typeof e=="string")if(be.test(e)){const o=(Number(e)+n)*t;return r?o===0?"0":`${o}px`:`${o}`}else{const o=K.exec(e);return o?e.replace(K,String((Number(o[0])+n)*t)):e}return e}const H=new WeakSet;function Ae(e){H.add(e)}function Me(e){return!H.has(e)}function me(e){const t=T(!!e.value);if(t.value)return M(t);const n=U(e,r=>{r&&(t.value=!0,n())});return M(t)}function je(){return te()!==null}const Ke=typeof window<"u",Pe=y("n-modal-body"),De=y("n-modal-provider"),qe=y("n-modal"),Oe=y("n-drawer-body"),Re=y("n-drawer"),Ue=y("n-popover-body");function P(e,t,n="default"){const r=t[n];if(r===void 0)throw new Error(`[vueuc/${e}]: slot[${n}] is empty.`);return r()}function B(e,t=!0,n=[]){return e.forEach(r=>{if(r!==null){if(typeof r!="object"){(typeof r=="string"||typeof r=="number")&&n.push(I(String(r)));return}if(Array.isArray(r)){B(r,t,n);return}if(r.type===C){if(r.children===null)return;Array.isArray(r.children)&&B(r.children,t,n)}else r.type!==R&&n.push(r)}}),n}function Ve(e,t,n="default"){const r=t[n];if(r===void 0)throw new Error(`[vueuc/${e}]: slot[${n}] is empty.`);const o=B(r());if(o.length===1)return o[0];throw new Error(`[vueuc/${e}]: slot[${n}] should have exactly one child.`)}const p="@@mmoContext",ye={mounted(e,{value:t}){e[p]={handler:void 0},typeof t=="function"&&(e[p].handler=t,d("mousemoveoutside",e,t))},updated(e,{value:t}){const n=e[p];typeof t=="function"?n.handler?n.handler!==t&&(l("mousemoveoutside",e,n.handler),n.handler=t,d("mousemoveoutside",e,t)):(e[p].handler=t,d("mousemoveoutside",e,t)):n.handler&&(l("mousemoveoutside",e,n.handler),n.handler=void 0)},unmounted(e){const{handler:t}=e[p];t&&l("mousemoveoutside",e,t),e[p].handler=void 0}},_e=ye,b="@@coContext",xe={mounted(e,{value:t,modifiers:n}){e[b]={handler:void 0},typeof t=="function"&&(e[b].handler=t,d("clickoutside",e,t,{capture:n.capture}))},updated(e,{value:t,modifiers:n}){const r=e[b];typeof t=="function"?r.handler?r.handler!==t&&(l("clickoutside",e,r.handler,{capture:n.capture}),r.handler=t,d("clickoutside",e,t,{capture:n.capture})):(e[b].handler=t,d("clickoutside",e,t,{capture:n.capture})):r.handler&&(l("clickoutside",e,r.handler,{capture:n.capture}),r.handler=void 0)},unmounted(e,{modifiers:t}){const{handler:n}=e[b];n&&l("clickoutside",e,n,{capture:t.capture}),e[b].handler=void 0}},He=xe;function ge(e,t){console.error(`[vdirs/${e}]: ${t}`)}class ve{constructor(){this.elementZIndex=new Map,this.nextZIndex=2e3}get elementCount(){return this.elementZIndex.size}ensureZIndex(t,n){const{elementZIndex:r}=this;if(n!==void 0){t.style.zIndex=`${n}`,r.delete(t);return}const{nextZIndex:o}=this;r.has(t)&&r.get(t)+1===this.nextZIndex||(t.style.zIndex=`${o}`,r.set(t,o),this.nextZIndex=o+1,this.squashState())}unregister(t,n){const{elementZIndex:r}=this;r.has(t)?r.delete(t):n===void 0&&ge("z-index-manager/unregister-element","Element not found when unregistering."),this.squashState()}squashState(){const{elementCount:t}=this;t||(this.nextZIndex=2e3),this.nextZIndex-t>2500&&this.rearrange()}rearrange(){const t=Array.from(this.elementZIndex.entries());t.sort((n,r)=>n[1]-r[1]),this.nextZIndex=2e3,t.forEach(n=>{const r=n[0],o=this.nextZIndex++;`${o}`!==r.style.zIndex&&(r.style.zIndex=`${o}`)})}}const z=new ve,m="@@ziContext",Ie={mounted(e,t){const{value:n={}}=t,{zIndex:r,enabled:o}=n;e[m]={enabled:!!o,initialized:!1},o&&(z.ensureZIndex(e,r),e[m].initialized=!0)},updated(e,t){const{value:n={}}=t,{zIndex:r,enabled:o}=n,a=e[m].enabled;o&&!a&&(z.ensureZIndex(e,r),e[m].initialized=!0),e[m].enabled=!!o},unmounted(e,t){if(!e[m].initialized)return;const{value:n={}}=t,{zIndex:r}=n;z.unregister(e,r)}},We=Ie;function D(e){return typeof e=="string"?document.querySelector(e):e()}const Xe=L({name:"LazyTeleport",props:{to:{type:[String,Object],default:void 0},disabled:Boolean,show:{type:Boolean,required:!0}},setup(e){return{showTeleport:me(V(e,"show")),mergedTo:ne(()=>{const{to:t}=e;return t??"body"})}},render(){return this.showTeleport?this.disabled?P("lazy-teleport",this.$slots):c(re,{disabled:this.disabled,to:this.mergedTo},P("lazy-teleport",this.$slots)):null}});function W(e){return e instanceof HTMLElement}function X(e){for(let t=0;t<e.childNodes.length;t++){const n=e.childNodes[t];if(W(n)&&(Y(n)||X(n)))return!0}return!1}function Q(e){for(let t=e.childNodes.length-1;t>=0;t--){const n=e.childNodes[t];if(W(n)&&(Y(n)||Q(n)))return!0}return!1}function Y(e){if(!Ee(e))return!1;try{e.focus({preventScroll:!0})}catch{}return document.activeElement===e}function Ee(e){if(e.tabIndex>0||e.tabIndex===0&&e.getAttribute("tabIndex")!==null)return!0;if(e.getAttribute("disabled"))return!1;switch(e.nodeName){case"A":return!!e.href&&e.rel!=="ignore";case"INPUT":return e.type!=="hidden"&&e.type!=="file";case"BUTTON":case"SELECT":case"TEXTAREA":return!0;default:return!1}}let x=[];const Qe=L({name:"FocusTrap",props:{disabled:Boolean,active:Boolean,autoFocus:{type:Boolean,default:!0},onEsc:Function,initialFocusTo:String,finalFocusTo:String,returnFocusOnDeactivated:{type:Boolean,default:!0}},setup(e){const t=pe(),n=T(null),r=T(null);let o=!1,a=!1;const $=typeof document>"u"?null:document.activeElement;function f(){return x[x.length-1]===t}function w(s){var i;s.code==="Escape"&&f()&&((i=e.onEsc)===null||i===void 0||i.call(e,s))}oe(()=>{U(()=>e.active,s=>{s?(G(),d("keydown",document,w)):(l("keydown",document,w),o&&A())},{immediate:!0})}),se(()=>{l("keydown",document,w),o&&A()});function Z(s){if(!a&&f()){const i=S();if(i===null||i.contains(ie(s)))return;h("first")}}function S(){const s=n.value;if(s===null)return null;let i=s;for(;i=i.nextSibling,!(i===null||i instanceof Element&&i.tagName==="DIV"););return i}function G(){var s;if(!e.disabled){if(x.push(t),e.autoFocus){const{initialFocusTo:i}=e;i===void 0?h("first"):(s=D(i))===null||s===void 0||s.focus({preventScroll:!0})}o=!0,document.addEventListener("focus",Z,!0)}}function A(){var s;if(e.disabled||(document.removeEventListener("focus",Z,!0),x=x.filter(g=>g!==t),f()))return;const{finalFocusTo:i}=e;i!==void 0?(s=D(i))===null||s===void 0||s.focus({preventScroll:!0}):e.returnFocusOnDeactivated&&$ instanceof HTMLElement&&(a=!0,$.focus({preventScroll:!0}),a=!1)}function h(s){if(f()&&e.active){const i=n.value,g=r.value;if(i!==null&&g!==null){const v=S();if(v==null||v===g){a=!0,i.focus({preventScroll:!0}),a=!1;return}a=!0;const ee=s==="first"?X(v):Q(v);a=!1,ee||(a=!0,i.focus({preventScroll:!0}),a=!1)}}}function J(s){if(a)return;const i=S();i!==null&&(s.relatedTarget!==null&&i.contains(s.relatedTarget)?h("last"):h("first"))}function N(s){a||(s.relatedTarget!==null&&s.relatedTarget===n.value?h("last"):h("first"))}return{focusableStartRef:n,focusableEndRef:r,focusableStyle:"position: absolute; height: 0; width: 0;",handleStartFocus:J,handleEndFocus:N}},render(){const{default:e}=this.$slots;if(e===void 0)return null;if(this.disabled)return e();const{active:t,focusableStyle:n}=this;return c(C,null,[c("div",{"aria-hidden":"true",tabindex:t?"0":"-1",ref:"focusableStartRef",style:n,onFocus:this.handleStartFocus}),e(),c("div",{"aria-hidden":"true",style:n,ref:"focusableEndRef",tabindex:t?"0":"-1",onFocus:this.handleEndFocus})])}}),$e=ae("close",c("svg",{viewBox:"0 0 12 12",version:"1.1",xmlns:"http://www.w3.org/2000/svg","aria-hidden":!0},c("g",{stroke:"none","stroke-width":"1",fill:"none","fill-rule":"evenodd"},c("g",{fill:"currentColor","fill-rule":"nonzero"},c("path",{d:"M2.08859116,2.2156945 L2.14644661,2.14644661 C2.32001296,1.97288026 2.58943736,1.95359511 2.7843055,2.08859116 L2.85355339,2.14644661 L6,5.293 L9.14644661,2.14644661 C9.34170876,1.95118446 9.65829124,1.95118446 9.85355339,2.14644661 C10.0488155,2.34170876 10.0488155,2.65829124 9.85355339,2.85355339 L6.707,6 L9.85355339,9.14644661 C10.0271197,9.32001296 10.0464049,9.58943736 9.91140884,9.7843055 L9.85355339,9.85355339 C9.67998704,10.0271197 9.41056264,10.0464049 9.2156945,9.91140884 L9.14644661,9.85355339 L6,6.707 L2.85355339,9.85355339 C2.65829124,10.0488155 2.34170876,10.0488155 2.14644661,9.85355339 C1.95118446,9.65829124 1.95118446,9.34170876 2.14644661,9.14644661 L5.293,6 L2.14644661,2.85355339 C1.97288026,2.67998704 1.95359511,2.41056264 2.08859116,2.2156945 L2.14644661,2.14644661 L2.08859116,2.2156945 Z"}))))),we=ue("base-close",`
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
`,[F("absolute",`
 height: var(--n-close-icon-size);
 width: var(--n-close-icon-size);
 `),u("&::before",`
 content: "";
 position: absolute;
 width: var(--n-close-size);
 height: var(--n-close-size);
 left: 50%;
 top: 50%;
 transform: translateY(-50%) translateX(-50%);
 transition: inherit;
 border-radius: inherit;
 `),ce("disabled",[u("&:hover",`
 color: var(--n-close-icon-color-hover);
 `),u("&:hover::before",`
 background-color: var(--n-close-color-hover);
 `),u("&:focus::before",`
 background-color: var(--n-close-color-hover);
 `),u("&:active",`
 color: var(--n-close-icon-color-pressed);
 `),u("&:active::before",`
 background-color: var(--n-close-color-pressed);
 `)]),F("disabled",`
 cursor: not-allowed;
 color: var(--n-close-icon-color-disabled);
 background-color: transparent;
 `),F("round",[u("&::before",`
 border-radius: 50%;
 `)])]),Ye=L({name:"BaseClose",props:{isButtonTag:{type:Boolean,default:!0},clsPrefix:{type:String,required:!0},disabled:{type:Boolean,default:void 0},focusable:{type:Boolean,default:!0},round:Boolean,onClick:Function,absolute:Boolean},setup(e){return le("-base-close",we,V(e,"clsPrefix")),()=>{const{clsPrefix:t,disabled:n,absolute:r,round:o,isButtonTag:a}=e;return c(a?"button":"div",{type:a?"button":void 0,tabindex:n||!e.focusable?-1:0,"aria-disabled":n,"aria-label":"close",role:a?void 0:"button",disabled:n,class:[`${t}-base-close`,r&&`${t}-base-close--absolute`,n&&`${t}-base-close--disabled`,o&&`${t}-base-close--round`],onMousedown:f=>{e.focusable||f.preventDefault()},onClick:e.onClick},c(de,{clsPrefix:t},{default:()=>c($e,null)}))}}}),{cubicBezierEaseIn:q,cubicBezierEaseOut:O}=fe;function Ge({transformOrigin:e="inherit",duration:t=".2s",enterScale:n=".9",originalTransform:r="",originalTransition:o=""}={}){return[u("&.fade-in-scale-up-transition-leave-active",{transformOrigin:e,transition:`opacity ${t} ${q}, transform ${t} ${q} ${o&&","+o}`}),u("&.fade-in-scale-up-transition-enter-active",{transformOrigin:e,transition:`opacity ${t} ${O}, transform ${t} ${O} ${o&&","+o}`}),u("&.fade-in-scale-up-transition-enter-from, &.fade-in-scale-up-transition-leave-to",{opacity:0,transform:`${r} scale(${n})`}),u("&.fade-in-scale-up-transition-leave-from, &.fade-in-scale-up-transition-enter-to",{opacity:1,transform:`${r} scale(1)`})]}export{$e as E,Qe as F,Xe as L,Ye as N,Oe as a,Ze as b,He as c,Re as d,Me as e,k as f,_e as g,ke as h,Te as i,Ke as j,Be as k,ze as l,Pe as m,je as n,pe as o,Ue as p,Ge as q,Ae as r,Ce as s,qe as t,Le as u,De as v,P as w,Ve as x,We as z};
