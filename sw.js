if(!self.define){let s,e={};const i=(i,l)=>(i=new URL(i+".js",l).href,e[i]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=i,s.onload=e,document.head.appendChild(s)}else s=i,importScripts(i),e()})).then((()=>{let s=e[i];if(!s)throw new Error(`Module ${i} didn’t register its module`);return s})));self.define=(l,n)=>{const r=s||("document"in self?document.currentScript.src:"")||location.href;if(e[r])return;let t={};const u=s=>i(s,r),a={module:{uri:r},exports:t,require:u};e[r]=Promise.all(l.map((s=>a[s]||u(s)))).then((s=>(n(...s),t)))}}define(["./workbox-7cfec069"],(function(s){"use strict";self.addEventListener("message",(s=>{s.data&&"SKIP_WAITING"===s.data.type&&self.skipWaiting()})),s.precacheAndRoute([{url:"assets/addExpense-0b055500.js",revision:null},{url:"assets/addExpense-d7f3b975.css",revision:null},{url:"assets/Button-4a220aba.js",revision:null},{url:"assets/c_header-26893478.js",revision:null},{url:"assets/c_header-e41fd68f.css",revision:null},{url:"assets/Divider-9a94fdd0.js",revision:null},{url:"assets/fade-in-scale-up.cssr-9a48bf76.js",revision:null},{url:"assets/getCache-9e3c85e1.js",revision:null},{url:"assets/index-90bb975f.js",revision:null},{url:"assets/index-91ea4570.css",revision:null},{url:"assets/Input-8efe85e8.js",revision:null},{url:"assets/itemDetails-cd82ed78.css",revision:null},{url:"assets/itemDetails-db8ceb51.js",revision:null},{url:"assets/main-6cfb1ae8.js",revision:null},{url:"assets/main-85572ce7.css",revision:null},{url:"assets/Scrollbar-ecdc08ae.js",revision:null},{url:"assets/Select-e4f2c8fa.js",revision:null},{url:"assets/Space-8609c215.js",revision:null},{url:"assets/spendHistory-1753cc5c.js",revision:null},{url:"assets/spendHistory-45f9972e.css",revision:null},{url:"assets/Statistic-45d250ca.js",revision:null},{url:"assets/Switch-75d23cfc.js",revision:null},{url:"index.html",revision:"6aa4d5009674e6e9272c827b22d75bc8"},{url:"registerSW.js",revision:"be4b8e518dee3923c6f25d55d9f5e117"},{url:"manifest.webmanifest",revision:"3a79446cc1dc8e9541a8216d6b07621c"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));
