if(!self.define){let s,e={};const i=(i,l)=>(i=new URL(i+".js",l).href,e[i]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=i,s.onload=e,document.head.appendChild(s)}else s=i,importScripts(i),e()})).then((()=>{let s=e[i];if(!s)throw new Error(`Module ${i} didn’t register its module`);return s})));self.define=(l,n)=>{const r=s||("document"in self?document.currentScript.src:"")||location.href;if(e[r])return;let t={};const u=s=>i(s,r),c={module:{uri:r},exports:t,require:u};e[r]=Promise.all(l.map((s=>c[s]||u(s)))).then((s=>(n(...s),t)))}}define(["./workbox-7cfec069"],(function(s){"use strict";self.addEventListener("message",(s=>{s.data&&"SKIP_WAITING"===s.data.type&&self.skipWaiting()})),s.precacheAndRoute([{url:"assets/addExpense-d75c04eb.css",revision:null},{url:"assets/addExpense-d767331c.js",revision:null},{url:"assets/Button-4c15b35c.js",revision:null},{url:"assets/c_header-5e798f4d.js",revision:null},{url:"assets/c_header-e41fd68f.css",revision:null},{url:"assets/Divider-40a5a849.js",revision:null},{url:"assets/fade-in-scale-up.cssr-bd45e362.js",revision:null},{url:"assets/getCache-b7c5d296.js",revision:null},{url:"assets/index-089b5700.js",revision:null},{url:"assets/index-91ea4570.css",revision:null},{url:"assets/Input-9c43f1c7.js",revision:null},{url:"assets/itemDetails-3fbfa7c5.css",revision:null},{url:"assets/itemDetails-dedd186c.js",revision:null},{url:"assets/main-11260d56.js",revision:null},{url:"assets/main-be5bd808.css",revision:null},{url:"assets/Scrollbar-bbf780ff.js",revision:null},{url:"assets/Select-e627d914.js",revision:null},{url:"assets/Space-73d0370e.js",revision:null},{url:"assets/spendHistory-35e3da84.js",revision:null},{url:"assets/spendHistory-cb7cece2.css",revision:null},{url:"assets/Statistic-ad42a781.js",revision:null},{url:"assets/Switch-55c32c95.js",revision:null},{url:"index.html",revision:"b2edc98e218b85373dd704ad66734a0c"},{url:"registerSW.js",revision:"be4b8e518dee3923c6f25d55d9f5e117"},{url:"manifest.webmanifest",revision:"3a79446cc1dc8e9541a8216d6b07621c"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));
