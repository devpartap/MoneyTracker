import{_ as f}from"./c_header-5f8d8c6b.js";import{i as v,r as c,l as m,x as p,z as s,s as u,u as o,F as d,B as i,A as _,D as g}from"./index-9b4f427a.js";import{F as N}from"./Button-a0cff1bd.js";import{N as h}from"./Input-99922ce0.js";import{N as x}from"./Scrollbar-c306ca88.js";const b=i("br",null,null,-1),B=i("br",null,null,-1),V={__name:"getCache",setup(y){const l=JSON.stringify(v("$data"));let t=c(`{
    `),a="   ";for(let e=1;e<l.length;e++)l[e]=="["&&l[e+1]=="{"&&(a+="    "),l[e]=="{"?(l[e+1]==","?(t.value+=`
${a}${l[e]}${l[e+1]}
${a}    `,e=e+1):t.value+=`
${a}${l[e]}
${a}    `,a+="    "):l[e]=="}"?(a=a.substring(0,a.length-4),l[e+1]=="]"?(t.value+=`
${a}${l[e]}`,a=a.substring(0,a.length-4),t.value+=`
${a}${l[e+1]}
${a}`,e=e+1):l[e+1]==","?(t.value+=`
${a}${l[e]}${l[e+1]}
${a}`,e=e+1):t.value+=`
${a}${l[e]}
${a}`):l[e]==","?l[e+4]=="]"?t.value+=l[e]:l[e+1]=='"'?(t.value+=`${l[e]}
${a}${l[e+1]}`,e=e+1):l[e+2]=='"'?(t.value+=`${l[e]}${l[e+1]}
${a}${l[e+2]}`,e=e+2):t.value+=l[e]:t.value+=l[e];console.log("done"),console.log(t.value);function $(){let e=t.value;localStorage.setItem("_DATA_",e.replace(/(\r\n|\n|\r)/gm,"")),console.log("saved"),location.reload()}return(e,n)=>(m(),p(d,null,[s(f,{title:"Cache"}),s(o(N),{type:"info",onClick:n[0]||(n[0]=r=>$())},{default:u(()=>[_(" Save ")]),_:1}),b,B,s(o(x),{style:{height:"700px"}},{default:u(()=>[s(o(h),{autosize:!0,value:o(t),"onUpdate:value":n[1]||(n[1]=r=>g(t)?t.value=r:t=r),type:"textarea"},null,8,["value"])]),_:1})],64))}};export{V as default};
