import{a as U,L as $,c as Y,d as L,M as z,O as J,V as Z,e as B,f as T,j as W,q as K,k as ee,C as D}from"./Button-4a220aba.js";import{v as q,a as x,r as E,e as te,d as j,i as se,h as v,K as ie,b as ne,p as oe,t as F,m as I,c as O}from"./index-90bb975f.js";import{j as ae,f as re,h as le,l as fe}from"./fade-in-scale-up.cssr-9a48bf76.js";function ue(e){if(typeof e=="number")return{"":e.toString()};const t={};return e.split(/ +/).forEach(o=>{if(o==="")return;const[n,s]=o.split(":");s===void 0?t[""]=n:t[n]=s}),t}function _(e,t){var o;if(e==null)return;const n=ue(e);if(t===void 0)return n[""];if(typeof t=="string")return(o=n[t])!==null&&o!==void 0?o:n[""];if(Array.isArray(t)){for(let s=t.length-1;s>=0;--s){const a=t[s];if(a in n)return n[a]}return n[""]}else{let s,a=-1;return Object.keys(n).forEach(i=>{const r=Number(i);!Number.isNaN(r)&&t>=r&&r>=a&&(a=r,s=n[i])}),s}}function de(e){var t;const o=(t=e.dirs)===null||t===void 0?void 0:t.find(({dir:n})=>n===q);return!!(o&&o.value===!1)}const ce={xs:0,s:640,m:1024,l:1280,xl:1536,"2xl":1920};function ve(e){return`(min-width: ${e}px)`}const G={};function pe(e=ce){if(!ae)return x(()=>[]);if(typeof window.matchMedia!="function")return x(()=>[]);const t=E({}),o=Object.keys(e),n=(s,a)=>{s.matches?t.value[a]=!0:t.value[a]=!1};return o.forEach(s=>{const a=e[s];let i,r;G[a]===void 0?(i=window.matchMedia(ve(a)),i.addEventListener?i.addEventListener("change",u=>{r.forEach(f=>{f(u,s)})}):i.addListener&&i.addListener(u=>{r.forEach(f=>{f(u,s)})}),r=new Set,G[a]={mql:i,cbs:r}):(i=G[a].mql,r=G[a].cbs),r.add(n),i.matches&&r.forEach(u=>{u(i,s)})}),te(()=>{o.forEach(s=>{const{cbs:a}=G[e[s]];a.has(n)&&a.delete(n)})}),x(()=>{const{value:s}=t;return o.filter(a=>s[a])})}const k=1,Q=U("n-grid"),X=1,me={span:{type:[Number,String],default:X},offset:{type:[Number,String],default:0},suffix:Boolean,privateOffset:Number,privateSpan:Number,privateColStart:Number,privateShow:{type:Boolean,default:!0}},$e=j({__GRID_ITEM__:!0,name:"GridItem",alias:["Gi"],props:me,setup(){const{isSsrRef:e,xGapRef:t,itemStyleRef:o,overflowRef:n,layoutShiftDisabledRef:s}=se(Q),a=ie();return{overflow:n,itemStyle:o,layoutShiftDisabled:s,mergedXGap:x(()=>$(t.value||0)),deriveStyle:()=>{e.value;const{privateSpan:i=X,privateShow:r=!0,privateColStart:u=void 0,privateOffset:f=0}=a.vnode.props,{value:R}=t,S=$(R||0);return{display:r?"":"none",gridColumn:`${u??`span ${i}`} / span ${i}`,marginLeft:f?`calc((100% - (${i} - 1) * ${S}) / ${i} * ${f} + ${S} * ${f})`:""}}}},render(){var e,t;if(this.layoutShiftDisabled){const{span:o,offset:n,mergedXGap:s}=this;return v("div",{style:{gridColumn:`span ${o} / span ${o}`,marginLeft:n?`calc((100% - (${o} - 1) * ${s}) / ${o} * ${n} + ${s} * ${n})`:""}},this.$slots)}return v("div",{style:[this.itemStyle,this.deriveStyle()]},(t=(e=this.$slots).default)===null||t===void 0?void 0:t.call(e,{overflow:this.overflow}))}}),he=e=>{const{textColor2:t,textColor3:o,fontSize:n,fontWeight:s}=e;return{labelFontSize:n,labelFontWeight:s,valueFontWeight:s,valueFontSize:"24px",labelTextColor:o,valuePrefixTextColor:t,valueSuffixTextColor:t,valueTextColor:t}},Se={name:"Statistic",common:Y,self:he},be=Se,ge={xs:0,s:640,m:1024,l:1280,xl:1536,xxl:1920},H=24,V="__ssr__",xe={layoutShiftDisabled:Boolean,responsive:{type:[String,Boolean],default:"self"},cols:{type:[Number,String],default:H},itemResponsive:Boolean,collapsed:Boolean,collapsedRows:{type:Number,default:1},itemStyle:[Object,String],xGap:{type:[Number,String],default:0},yGap:{type:[Number,String],default:0}},Ne=j({name:"Grid",inheritAttrs:!1,props:xe,setup(e){const{mergedClsPrefixRef:t,mergedBreakpointsRef:o}=L(e),n=/^\d+$/,s=E(void 0),a=pe((o==null?void 0:o.value)||ge),i=z(()=>!!(e.itemResponsive||!n.test(e.cols.toString())||!n.test(e.xGap.toString())||!n.test(e.yGap.toString()))),r=x(()=>{if(i.value)return e.responsive==="self"?s.value:a.value}),u=z(()=>{var d;return(d=Number(_(e.cols.toString(),r.value)))!==null&&d!==void 0?d:H}),f=z(()=>_(e.xGap.toString(),r.value)),R=z(()=>_(e.yGap.toString(),r.value)),S=d=>{s.value=d.contentRect.width},p=d=>{fe(S,d)},b=E(!1),g=x(()=>{if(e.responsive==="self")return p}),c=E(!1),m=E();return ne(()=>{const{value:d}=m;d&&d.hasAttribute(V)&&(d.removeAttribute(V),c.value=!0)}),oe(Q,{layoutShiftDisabledRef:F(e,"layoutShiftDisabled"),isSsrRef:c,itemStyleRef:F(e,"itemStyle"),xGapRef:f,overflowRef:b}),{isSsr:!J,contentEl:m,mergedClsPrefix:t,style:x(()=>e.layoutShiftDisabled?{width:"100%",display:"grid",gridTemplateColumns:`repeat(${e.cols}, minmax(0, 1fr))`,columnGap:$(e.xGap),rowGap:$(e.yGap)}:{width:"100%",display:"grid",gridTemplateColumns:`repeat(${u.value}, minmax(0, 1fr))`,columnGap:$(f.value),rowGap:$(R.value)}),isResponsive:i,responsiveQuery:r,responsiveCols:u,handleResize:g,overflow:b}},render(){if(this.layoutShiftDisabled)return v("div",I({ref:"contentEl",class:`${this.mergedClsPrefix}-grid`,style:this.style},this.$attrs),this.$slots);const e=()=>{var t,o,n,s,a,i,r;this.overflow=!1;const u=re(le(this)),f=[],{collapsed:R,collapsedRows:S,responsiveCols:p,responsiveQuery:b}=this;u.forEach(l=>{var N,y,h,w,P;if(((N=l==null?void 0:l.type)===null||N===void 0?void 0:N.__GRID_ITEM__)!==!0)return;if(de(l)){const C=O(l);C.props?C.props.privateShow=!1:C.props={privateShow:!1},f.push({child:C,rawChildSpan:0});return}l.dirs=((y=l.dirs)===null||y===void 0?void 0:y.filter(({dir:C})=>C!==q))||null,((h=l.dirs)===null||h===void 0?void 0:h.length)===0&&(l.dirs=null);const A=O(l),M=Number((P=_((w=A.props)===null||w===void 0?void 0:w.span,b))!==null&&P!==void 0?P:k);M!==0&&f.push({child:A,rawChildSpan:M})});let g=0;const c=(t=f[f.length-1])===null||t===void 0?void 0:t.child;if(c!=null&&c.props){const l=(o=c.props)===null||o===void 0?void 0:o.suffix;l!==void 0&&l!==!1&&(g=Number((s=_((n=c.props)===null||n===void 0?void 0:n.span,b))!==null&&s!==void 0?s:k),c.props.privateSpan=g,c.props.privateColStart=p+1-g,c.props.privateShow=(a=c.props.privateShow)!==null&&a!==void 0?a:!0)}let m=0,d=!1;for(const{child:l,rawChildSpan:N}of f){if(d&&(this.overflow=!0),!d){const y=Number((r=_((i=l.props)===null||i===void 0?void 0:i.offset,b))!==null&&r!==void 0?r:0),h=Math.min(N+y,p);if(l.props?(l.props.privateSpan=h,l.props.privateOffset=y):l.props={privateSpan:h,privateOffset:y},R){const w=m%p;h+w>p&&(m+=p-w),h+m+g>S*p?d=!0:m+=h}}d&&(l.props?l.props.privateShow!==!0&&(l.props.privateShow=!1):l.props={privateShow:!1})}return v("div",I({ref:"contentEl",class:`${this.mergedClsPrefix}-grid`,style:this.style,[V]:this.isSsr||void 0},this.$attrs),f.map(({child:l})=>l))};return this.isResponsive&&this.responsive==="self"?v(Z,{onResize:this.handleResize},{default:e}):e()}}),Re=B("statistic",[T("label",`
 font-weight: var(--n-label-font-weight);
 transition: .3s color var(--n-bezier);
 font-size: var(--n-label-font-size);
 color: var(--n-label-text-color);
 `),B("statistic-value",`
 margin-top: 4px;
 font-weight: var(--n-value-font-weight);
 `,[T("prefix",`
 margin: 0 4px 0 0;
 font-size: var(--n-value-font-size);
 transition: .3s color var(--n-bezier);
 color: var(--n-value-prefix-text-color);
 `,[B("icon",{verticalAlign:"-0.125em"})]),T("content",`
 font-size: var(--n-value-font-size);
 transition: .3s color var(--n-bezier);
 color: var(--n-value-text-color);
 `),T("suffix",`
 margin: 0 0 0 4px;
 font-size: var(--n-value-font-size);
 transition: .3s color var(--n-bezier);
 color: var(--n-value-suffix-text-color);
 `,[B("icon",{verticalAlign:"-0.125em"})])])]),ye=Object.assign(Object.assign({},W.props),{tabularNums:Boolean,label:String,value:[String,Number]}),Ge=j({name:"Statistic",props:ye,setup(e){const{mergedClsPrefixRef:t,inlineThemeDisabled:o,mergedRtlRef:n}=L(e),s=W("Statistic","-statistic",Re,be,e,t),a=K("Statistic",n,t),i=x(()=>{const{self:{labelFontWeight:u,valueFontSize:f,valueFontWeight:R,valuePrefixTextColor:S,labelTextColor:p,valueSuffixTextColor:b,valueTextColor:g,labelFontSize:c},common:{cubicBezierEaseInOut:m}}=s.value;return{"--n-bezier":m,"--n-label-font-size":c,"--n-label-font-weight":u,"--n-label-text-color":p,"--n-value-font-weight":R,"--n-value-font-size":f,"--n-value-prefix-text-color":S,"--n-value-suffix-text-color":b,"--n-value-text-color":g}}),r=o?ee("statistic",void 0,i,e):void 0;return{rtlEnabled:a,mergedClsPrefix:t,cssVars:o?void 0:i,themeClass:r==null?void 0:r.themeClass,onRender:r==null?void 0:r.onRender}},render(){var e;const{mergedClsPrefix:t,$slots:{default:o,label:n,prefix:s,suffix:a}}=this;return(e=this.onRender)===null||e===void 0||e.call(this),v("div",{class:[`${t}-statistic`,this.themeClass,this.rtlEnabled&&`${t}-statistic--rtl`],style:this.cssVars},D(n,i=>v("div",{class:`${t}-statistic__label`},this.label||i)),v("div",{class:`${t}-statistic-value`,style:{fontVariantNumeric:this.tabularNums?"tabular-nums":""}},D(s,i=>i&&v("span",{class:`${t}-statistic-value__prefix`},i)),this.value!==void 0?v("span",{class:`${t}-statistic-value__content`},this.value):D(o,i=>i&&v("span",{class:`${t}-statistic-value__content`},i)),D(a,i=>i&&v("span",{class:`${t}-statistic-value__suffix`},i))))}});export{Ge as N,Ne as a,$e as b};
