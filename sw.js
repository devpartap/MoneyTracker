if(!self.define){let s,e={};const i=(i,l)=>(i=new URL(i+".js",l).href,e[i]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=i,s.onload=e,document.head.appendChild(s)}else s=i,importScripts(i),e()})).then((()=>{let s=e[i];if(!s)throw new Error(`Module ${i} didn’t register its module`);return s})));self.define=(l,n)=>{const r=s||("document"in self?document.currentScript.src:"")||location.href;if(e[r])return;let t={};const u=s=>i(s,r),a={module:{uri:r},exports:t,require:u};e[r]=Promise.all(l.map((s=>a[s]||u(s)))).then((s=>(n(...s),t)))}}define(["./workbox-7cfec069"],(function(s){"use strict";self.addEventListener("message",(s=>{s.data&&"SKIP_WAITING"===s.data.type&&self.skipWaiting()})),s.precacheAndRoute([{url:"assets/addExpense-0b90f619.js",revision:null},{url:"assets/addExpense-c3f9e149.css",revision:null},{url:"assets/Button-6c271e84.js",revision:null},{url:"assets/c_header-e41fd68f.css",revision:null},{url:"assets/c_header-fa2541e1.js",revision:null},{url:"assets/Divider-33493e42.js",revision:null},{url:"assets/fade-in-scale-up.cssr-7ff6a637.js",revision:null},{url:"assets/getCache-4651e3dc.js",revision:null},{url:"assets/index-1e0e2f7c.js",revision:null},{url:"assets/index-91ea4570.css",revision:null},{url:"assets/Input-4d773fad.js",revision:null},{url:"assets/itemDetails-404aa98f.js",revision:null},{url:"assets/itemDetails-cbb2ccc3.css",revision:null},{url:"assets/main-2a5ebb09.js",revision:null},{url:"assets/main-580b4e1d.css",revision:null},{url:"assets/Scrollbar-0e664a01.js",revision:null},{url:"assets/Select-efd8b0a7.js",revision:null},{url:"assets/Space-161db22d.js",revision:null},{url:"assets/spendHistory-330d6bc5.css",revision:null},{url:"assets/spendHistory-8f258099.js",revision:null},{url:"assets/Statistic-ec64c7c0.js",revision:null},{url:"assets/Switch-3a446029.js",revision:null},{url:"index.html",revision:"99c1fce6c1a5171d15e8f1733d1f28aa"},{url:"registerSW.js",revision:"be4b8e518dee3923c6f25d55d9f5e117"},{url:"manifest.webmanifest",revision:"3a79446cc1dc8e9541a8216d6b07621c"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));