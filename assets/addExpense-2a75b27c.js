import{_ as we,J as xe,i as Ne,r as i,l as H,x as Se,z as r,s as p,u as s,B as D,j as m,v as b,F as qe,q as ee,A as w,C as le,y as Ce,G as De,H as Ie}from"./index-74a9a88b.js";import{_ as $e}from"./c_header-66e0b60c.js";import{N as A,a as re,b as C,c as Fe}from"./Space-1279de57.js";import{N as ae}from"./Input-69c4d5cf.js";import{N as oe}from"./Select-40482e71.js";import{N as ue}from"./Divider-c138320a.js";import{b as ze,N as ie,d as Be}from"./Switch-d40d45bf.js";import{F as W}from"./Button-3f7cf783.js";import"./fade-in-scale-up.cssr-436bb415.js";const de=R=>(De("data-v-ae93301b"),R=R(),Ie(),R),Te={style:{"margin-left":"20px","margin-right":"20px"}},Ue={class:"optionsStyle"},Ee=de(()=>D("div",null,"Input New Value",-1)),Oe={style:{width:"100%",display:"flex","flex-direction":"column"}},Ve=de(()=>D("br",null,null,-1)),Ae={style:{width:"100%","text-align":"center","margin-top":"10px"}},Re={__name:"addExpense",setup(R){const pe=xe(),e=Ne("$data"),u=i(""),l=i(""),d=i(""),n=i(null),te=i(!0),c=i(!0),I=i(!1),z=i(!1),o=i([!1,!1,!1,!1]),x=i([!1,!1,!1]),Y=i(!0),T=i([null,null]),G=i([]),J=i(!1),h=i(""),f=i(""),L=i(!1),y=i(!1),ve=i(!1),j=i(),Z=i(!1);let se="",$=new Date,fe=`${$.getDate()}-${$.getMonth()+1}-${$.getFullYear()}`;const ce=[{label:"Base",value:"base"},{label:"Required",value:"required"},{label:"Needs",value:"needs"},{label:"Wants",value:"wants"}];let U=[];function S(a){o.value[0]=a===1,o.value[1]=a===2,o.value[2]=a===3,o.value[3]=a===4}function M(a){x.value[0]=a===1,x.value[1]=a===2,x.value[2]=a===3}function he(){if(U=[],te.value=!1,z.value=!1,I.value=!1,c.value=!0,L.value=!1,y.value=!1,l.value="",S(5),u.value!="base")for(let a=0;a+1<=e[u.value].length;a++)console.log(e[u.value][a].name),U.push({label:e[u.value][a].name,value:a+2});U.push({label:"New Category",value:1}),console.log(U)}function ge(){c.value=!0,l.value==1?(z.value=!0,I.value=!0,u.value=="base"?S(1):u.value=="required"?(ve.value=!0,S(2)):u.value=="needs"?S(3):S(4)):(I.value=!1,z.value=!1,ve.value=!1,S(0),M(0),u.value=="needs"&&(z.value=!0,I.value=!1,S(3)),u.value=="wants"&&(z.value=!0,I.value=!1,S(4))),L.value=!0,q(!0)}function q(a){a&&(u.value=="base"?(console.log(T.value),d.value!=""&&T.value?(c.value=!1,M(1)):(c.value=!0,M(0))):u.value=="required"?(console.log(d.value),l.value==1?d.value!=""?(c.value=!1,M(2)):(c.value=!0,M(0)):l.value!=0?(console.log(l.value),c.value=!1,M(2)):(c.value=!0,M(0))):h.value!=""&&f.value!=""?l.value==1?d.value!=""?(c.value=!1,M(3)):(c.value=!0,M(0)):(c.value=!1,M(3)):(c.value=!0,M(0)),y.value&&(j.value||(c.value=!0)))}function ye(a){a.length>=7?J.value=!0:(G.value=a,q(o.value[1]))}function me(){let a=!1,t={};console.log(x.value);let v=fe,F=[1],O=[n.value],P=$,N=null,Q=!1;if(y.value&&(P=new Date(j.value),v=`${P.getDate()}-${P.getMonth()+1}-${P.getFullYear()}`),!x.value[0]){let g,B=0;if(l.value!=1){g=e[u.value][l.value-2+(l.value===1)].track[e[u.value][l.value-2+(l.value===1)].track.length-1].date.split("-"),B=(P.getFullYear()-parseInt(g[2]))*12+(P.getMonth()-parseInt(g[1])+1);for(let _=0;_<B;_++)e[u.value][l.value-2].valuePerMonth.push(0),e[u.value][l.value-2].enteriesPerMonth.push(0)}else d.value[d.value.length-1]==" "&&(d.value=d.value.slice(0,d.value.length-1));if(y.value){for(let k=1;k<=-B;k++)F.push(0),O.push(0);if(l.value!=1){let k=e[u.value][l.value-2].track.length-1;for(;k>=0;k--)if(!(P.valueOf()<E(e[u.value][l.value-2].track[k].date))){x.value[1]?e.required[l.value-2].track.splice(k+1,0,{date:v,value:n.value}):e[u.value][l.value-2].track.splice(k+1,0,{name:h.value,value:n.value,date:v,mode:f.value});break}for(k==-1&&(x.value[1]?e[u.value][l.value-2].track.splice(0,0,{date:v,value:n.value}):e[u.value][l.value-2].track.splice(0,0,{name:h.value,value:n.value,date:v,mode:f.value}));e[u.value][l.value-2].enteriesPerMonth.length<F.length;)e[u.value][l.value-2].enteriesPerMonth.splice(0,0,0),e[u.value][l.value-2].valuePerMonth.splice(0,0,0);for(;e[u.value][l.value-2].enteriesPerMonth.length>F.length;)F.splice(0,0,0),O.splice(0,0,0);e[u.value][l.value-2].enteriesPerMonth=F.map((V,X)=>V+e[u.value][l.value-2].enteriesPerMonth[X]),e[u.value][l.value-2].valuePerMonth=O.map((V,X)=>V+e[u.value][l.value-2].valuePerMonth[X]),P.valueOf()<E(e[u.value][l.value-2].init)&&(e[u.value][l.value-2].init=v),Q=!0}let _=[n.value,0,0,0,0];for(u.value=="required"?_[1]+=n.value:u.value=="needs"?_[2]+=n.value:_[3]+=n.value,N=e.history.day.length-1;N>=0&&!(P.valueOf()>=E(e.history.day[N].date));N--);N==-1?e.history.day.splice(0,0,{date:v,spend:_}):e.history.day[N].date==v?e.history.day[N].spend=e.history.day[N].spend.map((k,V)=>k+_[V]):e.history.day.splice(N+1,0,{date:v,spend:_})}}if(x.value[0]){if(t[e.base.length]={name:d.value,value:n.value,spantill:[T.value[0],T.value[1]],init:v},y.value){let g=e.history.day.findLastIndex(_=>E(_.date)<=P.valueOf()),B=1;g==-1&&(g=0,B=0),E(e.history.day[g].date)==P.valueOf()?e.history.day[g].spend[4]+=n.value:e.history.day.splice(g+B,0,{date:v,spend:[0,0,0,0,n.value]})}else e.history.day[e.history.day.length-1].spend[4]=n.value;e.base.length=e.base.length+1,a=!0}else if(x.value[1]){if(l.value==1)t[e.required.length]={name:d.value,value:n.value,totalspend:n.value,valuePerMonth:O,enteriesPerMonth:F,homelog:Y.value,init:v,excludes:G.value.sort(),track:[{date:v,value:n.value}]},e.required.length=e.required.length+1,a=!0,console.log(t);else if(e.required[l.value-2].totalspend=e.required[l.value-2].totalspend+n.value,!Q){e.required[l.value-2].track.push({date:v,value:n.value});let g=e.required[l.value-2].track[e.required[l.value-2].track.length-2].date;ne(g,2)<=$.getMonth()?(e.required[l.value-2].valuePerMonth.push(n.value),e.required[l.value-2].enteriesPerMonth.push(1)):(e.required[l.value-2].valuePerMonth[e.required[l.value-2].valuePerMonth.length-1]+=n.value,e.required[l.value-2].enteriesPerMonth[e.required[l.value-2].enteriesPerMonth.length-1]+=1)}y.value||K(1,n.value)}else{if(h.value[h.value.length-1]==" "&&(h.value=h.value.slice(0,h.value.length-1)),f.value[f.value.length-1]==" "&&(f.value=f.value.slice(0,f.value.length-1)),l.value==1)t[e[u.value].length]={name:d.value,totalspend:n.value,init:v,valuePerMonth:O,enteriesPerMonth:F,track:[{name:h.value,value:n.value,date:v,mode:f.value}]},e[u.value].length=e[u.value].length+1,a=!0;else if(e[u.value][l.value-2].totalspend=e[u.value][l.value-2].totalspend+n.value,!Q){e[u.value][l.value-2].track.push({name:h.value,value:n.value,date:v,mode:f.value});let g=e[u.value][l.value-2].track[e[u.value][l.value-2].track.length-2].date;ne(g,2)<=$.getMonth()?(e[u.value][l.value-2].valuePerMonth.push(n.value),e[u.value][l.value-2].enteriesPerMonth.push(1)):(e[u.value][l.value-2].valuePerMonth[e[u.value][l.value-2].valuePerMonth.length-1]+=n.value,e[u.value][l.value-2].enteriesPerMonth[e[u.value][l.value-2].enteriesPerMonth.length-1]+=1)}y.value||(u.value=="needs"?K(2,n.value):K(3,n.value))}a&&(Object.assign(e[u.value],t),console.log(t)),localStorage.setItem("_DATA_",JSON.stringify(e)),pe.go(-1)}function be(a){return a>=$.valueOf()}function E(a){let t=a.split("-");return Date.parse(`${t[2]}/${t[1]}/${t[0]}`)}function ne(a,t){const v=a.split("-");return parseInt(v[t-1])}function K(a,t){e.history.day[e.history.day.length-1].spend[a]+=t,e.history.day[e.history.day.length-1].spend[0]+=t}function Me(a){a.length>1?a[a.length-1]==" "&&a[a.length-2]==" "||(d.value=a):a[0]!=" "&&(d.value=a),q(I.value)}function Pe(){let a=d.value.replaceAll(" ","");for(let t=0;t<e[u.value].length;t++)a==e[u.value][t].name&&(se="Catagory with this name already exists!",Z.value=!0,d.value="")}function _e(a){a.length>1?a[a.length-1]==" "&&a[a.length-2]==" "||(h.value=a):a[0]!=" "&&(h.value=a),q(o.value[2]||o.value[3])}function ke(a){f.value=a.replace("  "," "),q(o.value[2]||o.value[3])}return(a,t)=>(H(),Se(qe,null,[r($e,{title:"Add Expense"}),r(s(A),{vertical:"",size:"large",style:{"margin-left":"7px","margin-right":"7px"}},{default:p(()=>[r(s(oe),{value:u.value,"onUpdate:value":[t[0]||(t[0]=v=>u.value=v),t[1]||(t[1]=v=>he())],options:ce,size:"large",class:"inputFeild",placeholder:"Please Select Template"},null,8,["value"]),r(s(oe),{value:l.value,"onUpdate:value":[t[2]||(t[2]=v=>l.value=v),t[3]||(t[3]=v=>ge())],disabled:te.value,size:"large",class:"inputFeild",placeholder:"Please Select Category",options:s(U)},null,8,["value","disabled","options"])]),_:1}),D("div",Te,[r(s(A),{vertical:""},{default:p(()=>[z.value?(H(),ee(s(ue),{key:0,class:"dividerStyle"},{default:p(()=>[w(" Parameters")]),_:1})):le("",!0),m(r(s(ae),{value:d.value,type:"text",maxlength:"20",size:"large",class:"inputFeild",placeholder:"Input New Category Name","on-input":Me,"on-blur":Pe},null,8,["value"]),[[b,I.value]]),m(r(s(re),{class:"inputFeild","on-update:value":v=>{T.value=v,q(o.value[0])},"update-value-on-close":!0,size:"large",type:"daterange",format:"dd-MMM-yyyy"},null,8,["on-update:value"]),[[b,o.value[0]]]),m(D("div",Ue,[w("Enable Homepage Viewing "),r(s(ze),{value:Y.value,"onUpdate:value":t[4]||(t[4]=v=>Y.value=v),style:{float:"right","margin-top":"3px"}},null,8,["value"])],512),[[b,o.value[1]]])]),_:1}),r(s(A),{vertical:""},{default:p(()=>[r(s(ie),{show:J.value,"onUpdate:show":t[5]||(t[5]=v=>J.value=v),preset:"dialog",title:"Dialog"},{header:p(()=>[Ee]),_:1},8,["show"]),m(r(s(ae),{value:h.value,type:"text",maxlength:"20",size:"large",class:"inputFeild",placeholder:"Input Spend Name","on-input":_e},null,8,["value"]),[[b,o.value[2]||o.value[3]]]),D("div",Oe,[m(r(s(ae),{value:f.value,type:"text",maxlength:"20",size:"large",class:"inputFeild",placeholder:"Input Payment Method ","on-input":ke},null,8,["value"]),[[b,o.value[2]||o.value[3]]]),D("div",null,[m(r(s(W),{class:"modeButton",onClick:t[6]||(t[6]=v=>f.value="Card"),circle:"",secondary:"",type:"primary",size:"small"},{default:p(()=>[w("Card")]),_:1},512),[[b,o.value[2]||o.value[3]]]),m(r(s(W),{class:"modeButton",onClick:t[7]||(t[7]=v=>f.value="Cash"),circle:"",secondary:"",type:"primary",size:"small"},{default:p(()=>[w("Cash")]),_:1},512),[[b,o.value[2]||o.value[3]]]),m(r(s(W),{class:"modeButton",onClick:t[8]||(t[8]=v=>f.value="UPI"),circle:"",secondary:"",type:"primary",size:"small"},{default:p(()=>[w("UPI")]),_:1},512),[[b,o.value[2]||o.value[3]]])])]),Ve,m(r(s(C),{checked:y.value,"onUpdate:checked":t[9]||(t[9]=v=>y.value=v),class:"optionsStyle","on-update:value":q(!0)},{default:p(()=>[w(" Add to a Past Date ")]),_:1},8,["checked","on-update:value"]),[[b,L.value]]),o.value[1]?(H(),ee(s(ue),{key:0,class:"dividerStyle"},{default:p(()=>[w(" Exception Days")]),_:1})):le("",!0)]),_:1}),m(r(s(Fe),{value:G.value,"onUpdate:value":t[10]||(t[10]=v=>G.value=v),class:"optionsStyle","on-update:value":ye},{default:p(()=>[r(s(A),{"item-style":"display: flex;"},{default:p(()=>[r(s(C),{value:"1",label:"Mon"}),r(s(C),{value:"2",label:"Tue"}),r(s(C),{value:"3",label:"Wed"}),r(s(C),{value:"4",label:"Thu"}),r(s(C),{value:"5",label:"Fri"}),r(s(C),{value:"6",label:"Sat"}),r(s(C),{value:"0",label:"Sun"})]),_:1})]),_:1},8,["value"]),[[b,o.value[1]]]),r(s(A),{vertical:""},{default:p(()=>[y.value?(H(),ee(s(ue),{key:0,class:"dividerStyle"},{default:p(()=>[w(" Past Date ")]),_:1})):le("",!0),m(r(s(re),{value:j.value,"onUpdate:value":t[11]||(t[11]=v=>j.value=v),type:"date",size:"large",class:"inputFeild","is-date-disabled":be,"on-confirm":q(y.value),format:"dd-MMM-yyyy",actions:["clear"]},null,8,["value","on-confirm"]),[[b,y.value]]),r(s(Be),{disabled:c.value,id:"inp_num",value:n.value,"onUpdate:value":t[12]||(t[12]=v=>n.value=v),placeholder:"O",min:0,"show-button":!1,size:"large",class:"moneyInputStyle"},{prefix:p(()=>[w(" ₹ ")]),_:1},8,["disabled","value"]),D("div",Ae,[m(r(s(W),{class:"createButton",onClick:t[13]||(t[13]=v=>me()),type:"primary",size:"large"},{default:p(()=>[w(" Create Value ")]),_:1},512),[[b,n.value]])])]),_:1})]),r(s(ie),{show:Z.value,"onUpdate:show":t[14]||(t[14]=v=>Z.value=v),preset:"dialog",title:"Dialog"},{header:p(()=>[D("div",null,Ce(s(se)),1)]),_:1},8,["show"])],64))}},Qe=we(Re,[["__scopeId","data-v-ae93301b"]]);export{Qe as default};