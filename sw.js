if(!self.define){let s,e={};const i=(i,l)=>(i=new URL(i+".js",l).href,e[i]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=i,s.onload=e,document.head.appendChild(s)}else s=i,importScripts(i),e()})).then((()=>{let s=e[i];if(!s)throw new Error(`Module ${i} didn’t register its module`);return s})));self.define=(l,n)=>{const r=s||("document"in self?document.currentScript.src:"")||location.href;if(e[r])return;let t={};const u=s=>i(s,r),a={module:{uri:r},exports:t,require:u};e[r]=Promise.all(l.map((s=>a[s]||u(s)))).then((s=>(n(...s),t)))}}define(["./workbox-7cfec069"],(function(s){"use strict";self.addEventListener("message",(s=>{s.data&&"SKIP_WAITING"===s.data.type&&self.skipWaiting()})),s.precacheAndRoute([{url:"assets/addExpense-2a75b27c.js",revision:null},{url:"assets/addExpense-846cf2a0.css",revision:null},{url:"assets/Button-3f7cf783.js",revision:null},{url:"assets/c_header-66e0b60c.js",revision:null},{url:"assets/c_header-6e6dd377.css",revision:null},{url:"assets/Divider-c138320a.js",revision:null},{url:"assets/fade-in-scale-up.cssr-436bb415.js",revision:null},{url:"assets/getCache-78047eff.js",revision:null},{url:"assets/index-74a9a88b.js",revision:null},{url:"assets/index-91ea4570.css",revision:null},{url:"assets/Input-69c4d5cf.js",revision:null},{url:"assets/itemDetails-133ac214.js",revision:null},{url:"assets/itemDetails-eed8611f.css",revision:null},{url:"assets/main-04cea0d1.css",revision:null},{url:"assets/main-0a690f79.js",revision:null},{url:"assets/Scrollbar-d3d499b7.js",revision:null},{url:"assets/Select-40482e71.js",revision:null},{url:"assets/Space-1279de57.js",revision:null},{url:"assets/spendHistory-1b4ce407.css",revision:null},{url:"assets/spendHistory-e2efc006.js",revision:null},{url:"assets/Statistic-ecc869dd.js",revision:null},{url:"assets/Switch-d40d45bf.js",revision:null},{url:"index.html",revision:"bbf7600ba4beb9e14f565ec8d27f83b9"},{url:"registerSW.js",revision:"be4b8e518dee3923c6f25d55d9f5e117"},{url:"manifest.webmanifest",revision:"1968b0432d81f4d26b8bf54aedeaf314"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));
