if(!self.define){let s,e={};const i=(i,l)=>(i=new URL(i+".js",l).href,e[i]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=i,s.onload=e,document.head.appendChild(s)}else s=i,importScripts(i),e()})).then((()=>{let s=e[i];if(!s)throw new Error(`Module ${i} didn’t register its module`);return s})));self.define=(l,n)=>{const r=s||("document"in self?document.currentScript.src:"")||location.href;if(e[r])return;let t={};const u=s=>i(s,r),a={module:{uri:r},exports:t,require:u};e[r]=Promise.all(l.map((s=>a[s]||u(s)))).then((s=>(n(...s),t)))}}define(["./workbox-7cfec069"],(function(s){"use strict";self.addEventListener("message",(s=>{s.data&&"SKIP_WAITING"===s.data.type&&self.skipWaiting()})),s.precacheAndRoute([{url:"assets/addExpense-2d8fd801.js",revision:null},{url:"assets/addExpense-e3635228.css",revision:null},{url:"assets/Button-8d32fee1.js",revision:null},{url:"assets/c_header-f47adda6.js",revision:null},{url:"assets/Divider-a7db61d5.js",revision:null},{url:"assets/fade-in-scale-up.cssr-d52b76ed.js",revision:null},{url:"assets/getCache-795c3509.js",revision:null},{url:"assets/index-a9527854.js",revision:null},{url:"assets/index-c0a236e4.css",revision:null},{url:"assets/Input-f4262538.js",revision:null},{url:"assets/itemDetails-89dbd6e7.css",revision:null},{url:"assets/itemDetails-9f06b847.js",revision:null},{url:"assets/main-6e8b590e.css",revision:null},{url:"assets/main-6f27e5c0.js",revision:null},{url:"assets/Scrollbar-9feada8c.js",revision:null},{url:"assets/Select-9f95d0b8.js",revision:null},{url:"assets/Space-e4fcd4c2.js",revision:null},{url:"assets/spendHistory-ab17ce4e.js",revision:null},{url:"assets/spendHistory-da0808d4.css",revision:null},{url:"assets/Statistic-901b5ef1.js",revision:null},{url:"assets/Switch-3d798b87.js",revision:null},{url:"index.html",revision:"ff12a257e963a74b3e3d14ccbc2d6d80"},{url:"registerSW.js",revision:"be4b8e518dee3923c6f25d55d9f5e117"},{url:"manifest.webmanifest",revision:"1968b0432d81f4d26b8bf54aedeaf314"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));
