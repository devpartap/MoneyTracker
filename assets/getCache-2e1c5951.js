import{_ as $}from"./c_header-9d9d33cf.js";import{i as f,r as v,l as c,q as m,s as o,u as d,x as u,J as p,F as _,y as r,z as g}from"./index-1bafc52b.js";import{B as N}from"./Button-0fdcb3db.js";import{N as x}from"./Input-572e1945.js";const h=r("br",null,null,-1),B=r("br",null,null,-1),V={__name:"getCache",setup(b){const l=JSON.stringify(f("$data"));let t=v(`{
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
${a}${l[e+2]}`,e=e+2):t.value+=l[e]:t.value+=l[e];console.log("done"),console.log(t.value);function i(){let e=t.value;localStorage.setItem("_DATA_",e.replace(/(\r\n|\n|\r)/gm,"")),console.log("saved"),location.reload()}return(e,n)=>(c(),m(_,null,[o($,{title:"Cache"}),o(u(N),{type:"info",onClick:n[0]||(n[0]=s=>i())},{default:d(()=>[g(" Save ")]),_:1}),h,B,o(u(x),{autosize:!0,value:u(t),"onUpdate:value":n[1]||(n[1]=s=>p(t)?t.value=s:t=s),type:"textarea"},null,8,["value"])],64))}};export{V as default};
