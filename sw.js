if(!self.define){let s,e={};const i=(i,l)=>(i=new URL(i+".js",l).href,e[i]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=i,s.onload=e,document.head.appendChild(s)}else s=i,importScripts(i),e()})).then((()=>{let s=e[i];if(!s)throw new Error(`Module ${i} didn’t register its module`);return s})));self.define=(l,n)=>{const r=s||("document"in self?document.currentScript.src:"")||location.href;if(e[r])return;let t={};const u=s=>i(s,r),a={module:{uri:r},exports:t,require:u};e[r]=Promise.all(l.map((s=>a[s]||u(s)))).then((s=>(n(...s),t)))}}define(["./workbox-7cfec069"],(function(s){"use strict";self.addEventListener("message",(s=>{s.data&&"SKIP_WAITING"===s.data.type&&self.skipWaiting()})),s.precacheAndRoute([{url:"assets/addExpense-043ddc0f.js",revision:null},{url:"assets/addExpense-7ff39ae9.css",revision:null},{url:"assets/Button-a0cff1bd.js",revision:null},{url:"assets/c_header-5f8d8c6b.js",revision:null},{url:"assets/c_header-6e6dd377.css",revision:null},{url:"assets/Divider-6562a14d.js",revision:null},{url:"assets/fade-in-scale-up.cssr-3ca0f082.js",revision:null},{url:"assets/getCache-678935e0.js",revision:null},{url:"assets/index-91ea4570.css",revision:null},{url:"assets/index-9b4f427a.js",revision:null},{url:"assets/Input-99922ce0.js",revision:null},{url:"assets/itemDetails-0b3b0960.css",revision:null},{url:"assets/itemDetails-c64fcb93.js",revision:null},{url:"assets/main-04cea0d1.css",revision:null},{url:"assets/main-13a77528.js",revision:null},{url:"assets/Scrollbar-c306ca88.js",revision:null},{url:"assets/Select-6e7c4c26.js",revision:null},{url:"assets/Space-5fdb5050.js",revision:null},{url:"assets/spendHistory-1b4ce407.css",revision:null},{url:"assets/spendHistory-9e31c8c2.js",revision:null},{url:"assets/Statistic-de81dff9.js",revision:null},{url:"assets/Switch-2115a644.js",revision:null},{url:"index.html",revision:"1cae930a106a24939f3461902bee49ba"},{url:"registerSW.js",revision:"be4b8e518dee3923c6f25d55d9f5e117"},{url:"manifest.webmanifest",revision:"1968b0432d81f4d26b8bf54aedeaf314"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));
