import{_ as De,J as Se,i as Ce,r as i,l as R,x as ze,z as o,s as d,u as v,B as S,j as b,v as M,F as $e,q as W,A as P,C as L,y as oe,G as Ie,H as Fe}from"./index-4a3d7389.js";import{_ as Be}from"./c_header-222a7569.js";import{N as G,a as re,b as I,c as Te}from"./Space-dba79be4.js";import{N as te}from"./Input-0b0e9e0f.js";import{N as ie}from"./Select-a106661c.js";import{N as ue}from"./Divider-68412be2.js";import{b as Ee,N as de,d as Oe}from"./Switch-a2b39395.js";import{F as U}from"./Button-223497ea.js";import"./fade-in-scale-up.cssr-750f9aa2.js";const fe=j=>(Ie("data-v-3d0cf6e2"),j=j(),Fe(),j),Ue={style:{"margin-left":"20px","margin-right":"20px"}},Ve={class:"optionsStyle"},Ae=fe(()=>S("div",null,"Input New Value",-1)),Ye={style:{width:"100%",display:"flex","flex-direction":"column"}},Je=fe(()=>S("br",null,null,-1)),Re={style:{width:"100%","text-align":"center","margin-top":"10px"}},Ge={__name:"addExpense",setup(j){const pe=Se(),e=Ce("$data"),u=i(""),a=i(""),f=i(""),n=i(null),se=i(!0),c=i(!0),F=i(!1),B=i(!1),r=i([!1,!1,!1,!1]),N=i([!1,!1,!1]),Z=i(!0),V=i([null,null]),H=i([]),K=i(!1),y=i(""),h=i(""),Q=i(!1),g=i(!1),ve=i(!1),T=i(),X=i(!1);let ne="",x=new Date,he=`${x.getDate()}-${x.getMonth()+1}-${x.getFullYear()}`;const ce=["Jan","Feb","Mar","Aprl","May","June","July","Aug","Sept","Oct","Nov","Dec"],ye=[{label:"Base",value:"base",style:"font-family: 'roboto-medium';color: rgb(77,77,77);font-size:16px;"},{label:"Required",value:"required",style:"font-family: 'roboto-medium';color: rgb(77,77,77);font-size:16px;"},{label:"Needs",value:"needs",style:"font-family: 'roboto-medium';color: rgb(77,77,77);font-size:16px;"},{label:"Wants",value:"wants",style:"font-family: 'roboto-medium';color: rgb(77,77,77);font-size:16px;"}];let E=[];function C(l){r.value[0]=l===1,r.value[1]=l===2,r.value[2]=l===3,r.value[3]=l===4}function k(l){N.value[0]=l===1,N.value[1]=l===2,N.value[2]=l===3}function ge(){if(E=[],se.value=!1,B.value=!1,F.value=!1,c.value=!0,Q.value=!1,g.value=!1,a.value="",C(5),u.value!="base"){for(let l=0;l+1<=e[u.value].length;l++){let t=0;e[u.value][l].enteriesPerMonth.forEach(s=>{t+=s}),t=q(t),E.push({label:e[u.value][l].name,value:l+2,style:"font-family: 'roboto-regular';color: rgb(77,77,77);font-size:15px;",totalenty:t})}E.sort((l,t)=>t.totalenty-l.totalenty)}E.push({label:"New Category",value:1,style:"font-family: 'roboto-medium';color: rgb(77,77,77);font-size:15px;"}),console.log(E)}function me(){c.value=!0,a.value==1?(B.value=!0,F.value=!0,u.value=="base"?C(1):u.value=="required"?(ve.value=!0,C(2)):u.value=="needs"?C(3):C(4)):(F.value=!1,B.value=!1,ve.value=!1,C(0),k(0),u.value=="needs"&&(B.value=!0,F.value=!1,C(3)),u.value=="wants"&&(B.value=!0,F.value=!1,C(4))),Q.value=!0,z(!0)}function z(l){l&&(u.value=="base"?(console.log(V.value),f.value!=""&&V.value[0]!=null?(c.value=!1,k(1)):(c.value=!0,k(0))):u.value=="required"?(console.log(f.value),a.value==1?f.value!=""?(c.value=!1,k(2)):(c.value=!0,k(0)):a.value!=0?(console.log(a.value),c.value=!1,k(2)):(c.value=!0,k(0))):y.value!=""&&h.value!=""?a.value==1?f.value!=""?(c.value=!1,k(3)):(c.value=!0,k(0)):(c.value=!1,k(3)):(c.value=!0,k(0)),g.value&&(T.value||(c.value=!0)))}function be(l){l.length>=7?K.value=!0:(H.value=l,z(r.value[1]))}function Me(){let l=!1,t={};console.log(N.value);let s=he,$=[1];n.value=q(n.value);let Y=[n.value],_=x,D=null,le=!1;if(g.value&&(_=new Date(T.value),s=`${_.getDate()}-${_.getMonth()+1}-${_.getFullYear()}`),!N.value[0]){let m,O=0;if(a.value!=1){m=e[u.value][a.value-2+(a.value===1)].track[e[u.value][a.value-2+(a.value===1)].track.length-1].date.split("-"),O=(_.getFullYear()-parseInt(m[2]))*12+(_.getMonth()-parseInt(m[1])+1);for(let p=0;p<O;p++)e[u.value][a.value-2].valuePerMonth.push(0),e[u.value][a.value-2].enteriesPerMonth.push(0)}else f.value[f.value.length-1]==" "&&(f.value=f.value.slice(0,f.value.length-1));if(g.value){for(let w=1;w<=-O;w++)$.push(0),Y.push(0);if(a.value!=1){let w=e[u.value][a.value-2].track.length-1;for(;w>=0;w--)if(!(_.valueOf()<A(e[u.value][a.value-2].track[w].date))){N.value[1]?e.required[a.value-2].track.splice(w+1,0,{date:s,value:n.value}):e[u.value][a.value-2].track.splice(w+1,0,{name:y.value,value:n.value,date:s,mode:h.value});break}for(w==-1&&(N.value[1]?e[u.value][a.value-2].track.splice(0,0,{date:s,value:n.value}):e[u.value][a.value-2].track.splice(0,0,{name:y.value,value:n.value,date:s,mode:h.value}));e[u.value][a.value-2].enteriesPerMonth.length<$.length;)e[u.value][a.value-2].enteriesPerMonth.splice(0,0,0),e[u.value][a.value-2].valuePerMonth.splice(0,0,0);for(;e[u.value][a.value-2].enteriesPerMonth.length>$.length;)$.splice(0,0,0),Y.splice(0,0,0);console.log(e[u.value][a.value-2].enteriesPerMonth),console.log($),e[u.value][a.value-2].enteriesPerMonth=$.map((J,ae)=>J+e[u.value][a.value-2].enteriesPerMonth[ae]),e[u.value][a.value-2].valuePerMonth=Y.map((J,ae)=>J+e[u.value][a.value-2].valuePerMonth[ae]),_.valueOf()<A(e[u.value][a.value-2].init)&&(e[u.value][a.value-2].init=s),le=!0}let p=[n.value,0,0,0,0];for(u.value=="required"?(p[1]+=n.value,p[1]=q(p[1])):u.value=="needs"?(p[2]+=n.value,p[2]=q(p[2])):(p[3]+=n.value,p[3]=q(p[3])),D=e.history.day.length-1;D>=0&&!(_.valueOf()>=A(e.history.day[D].date));D--);D==-1?e.history.day.splice(0,0,{date:s,spend:p}):e.history.day[D].date==s?e.history.day[D].spend=e.history.day[D].spend.map((w,J)=>w+p[J]):e.history.day.splice(D+1,0,{date:s,spend:p})}}if(N.value[0]){if(t[e.base.length]={name:f.value,value:n.value,spantill:[V.value[0],V.value[1]],init:s},g.value){let m=e.history.day.findLastIndex(p=>A(p.date)<=_.valueOf()),O=1;m==-1&&(m=0,O=0),A(e.history.day[m].date)==_.valueOf()?(e.history.day[m].spend[4]+=n.value,e.history.day[m].spend[4]=q(e.history.day[m].spend[4])):e.history.day.splice(m+O,0,{date:s,spend:[0,0,0,0,n.value]})}else e.history.day[e.history.day.length-1].spend[4]=n.value;e.base.length=e.base.length+1,l=!0}else if(N.value[1]){if(a.value==1)t[e.required.length]={name:f.value,value:n.value,totalspend:n.value,valuePerMonth:Y,enteriesPerMonth:$,homelog:Z.value,init:s,excludes:H.value.sort(),track:[{date:s,value:n.value}]},e.required.length=e.required.length+1,l=!0,console.log(t);else if(e.required[a.value-2].totalspend=e.required[a.value-2].totalspend+n.value,!le){e.required[a.value-2].track.push({date:s,value:n.value});let m=e.required[a.value-2].track[e.required[a.value-2].track.length-2].date;xe(m,2)<=x.getMonth()?(e.required[a.value-2].valuePerMonth.push(n.value),e.required[a.value-2].enteriesPerMonth.push(1)):(e.required[a.value-2].valuePerMonth[e.required[a.value-2].valuePerMonth.length-1]+=n.value,e.required[a.value-2].valuePerMonth[e.required[a.value-2].valuePerMonth.length-1]=q(e.required[a.value-2].valuePerMonth[e.required[a.value-2].valuePerMonth.length-1]),e.required[a.value-2].enteriesPerMonth[e.required[a.value-2].enteriesPerMonth.length-1]+=1)}g.value||ee(1,n.value)}else y.value[y.value.length-1]==" "&&(y.value=y.value.slice(0,y.value.length-1)),h.value[h.value.length-1]==" "&&(h.value=h.value.slice(0,h.value.length-1)),a.value==1?(t[e[u.value].length]={name:f.value,totalspend:n.value,init:s,valuePerMonth:Y,enteriesPerMonth:$,track:[{name:y.value,value:n.value,date:s,mode:h.value}]},e[u.value].length=e[u.value].length+1,l=!0):(e[u.value][a.value-2].totalspend=e[u.value][a.value-2].totalspend+n.value,le||(e[u.value][a.value-2].track.push({name:y.value,value:n.value,date:s,mode:h.value}),e[u.value][a.value-2].valuePerMonth[e[u.value][a.value-2].valuePerMonth.length-1]+=n.value,e[u.value][a.value-2].valuePerMonth[e[u.value][a.value-2].valuePerMonth.length-1]=q(e[u.value][a.value-2].valuePerMonth[e[u.value][a.value-2].valuePerMonth.length-1]),e[u.value][a.value-2].enteriesPerMonth[e[u.value][a.value-2].enteriesPerMonth.length-1]+=1)),g.value||(u.value=="needs"?ee(2,n.value):ee(3,n.value));l&&(Object.assign(e[u.value],t),console.log(t)),localStorage.setItem("_DATA_",JSON.stringify(e)),pe.go(-1)}function Pe(l){return l>=x.valueOf()}function A(l){let t=l.split("-");return Date.parse(`${t[2]}/${t[1]}/${t[0]}`)}function xe(l,t){const s=l.split("-");return parseInt(s[t-1])}function ee(l,t){e.history.day[e.history.day.length-1].spend[l]+=t,e.history.day[e.history.day.length-1].spend[0]+=t,e.history.day[e.history.day.length-1].spend[l]=q(e.history.day[e.history.day.length-1].spend[l]),e.history.day[e.history.day.length-1].spend[0]=q(e.history.day[e.history.day.length-1].spend[0])}function ke(){let l=new Date;return l.setDate(x.getDate()-1),l.valueOf()}function _e(l){l.length>1?l[l.length-1]==" "&&l[l.length-2]==" "||(f.value=l):l[0]!=" "&&(f.value=l),z(F.value)}function we(){let l=f.value.replaceAll(" ","");for(let t=0;t<e[u.value].length;t++)l==e[u.value][t].name&&(ne="Catagory with this name already exists!",X.value=!0,f.value="")}function qe(l){l.length>1?l[l.length-1]==" "&&l[l.length-2]==" "||(y.value=l):l[0]!=" "&&(y.value=l),z(r.value[2]||r.value[3])}function Ne(l){h.value=l.replace("  "," "),z(r.value[2]||r.value[3])}function q(l){return Math.round(l*100)/100}return(l,t)=>(R(),ze($e,null,[o(Be,{title:"Add Expense"}),o(v(G),{vertical:"",size:"large",style:{"margin-left":"7px","margin-right":"7px"}},{default:d(()=>[o(v(ie),{value:u.value,"onUpdate:value":[t[0]||(t[0]=s=>u.value=s),t[1]||(t[1]=s=>ge())],options:ye,size:"large",id:"selectFeildTemplate",placeholder:"Please Select Template"},null,8,["value"]),o(v(ie),{value:a.value,"onUpdate:value":[t[2]||(t[2]=s=>a.value=s),t[3]||(t[3]=s=>me())],disabled:se.value,size:"large",id:"selectFeildSvalue",placeholder:"Please Select Category",options:v(E)},null,8,["value","disabled","options"])]),_:1}),S("div",Ue,[o(v(G),{vertical:""},{default:d(()=>[B.value?(R(),W(v(ue),{key:0,class:"dividerStyle"},{default:d(()=>[P(" Parameters")]),_:1})):L("",!0),b(o(v(te),{value:f.value,type:"text",maxlength:"100",size:"large",class:"inputFeild",placeholder:"Input New Category Name","on-input":_e,"on-blur":we},null,8,["value"]),[[M,F.value]]),b(o(v(re),{class:"inputFeild","on-update:value":s=>{V.value=s,z(r.value[0])},"update-value-on-close":!0,size:"large",type:"daterange",format:"dd-MMM-yyyy"},null,8,["on-update:value"]),[[M,r.value[0]]]),b(S("div",Ve,[P("Enable Homepage Viewing "),o(v(Ee),{value:Z.value,"onUpdate:value":t[4]||(t[4]=s=>Z.value=s),style:{float:"right","margin-top":"3px"}},null,8,["value"])],512),[[M,r.value[1]]])]),_:1}),o(v(G),{vertical:""},{default:d(()=>[o(v(de),{show:K.value,"onUpdate:show":t[5]||(t[5]=s=>K.value=s),preset:"dialog",title:"Dialog"},{header:d(()=>[Ae]),_:1},8,["show"]),b(o(v(te),{value:y.value,type:"text",maxlength:"100",size:"large",class:"inputFeild",placeholder:"Input Spend Name","on-input":qe},null,8,["value"]),[[M,r.value[2]||r.value[3]]]),S("div",Ye,[b(o(v(te),{value:h.value,type:"text",maxlength:"100",size:"large",class:"inputFeild",placeholder:"Input Payment Method ","on-input":Ne},null,8,["value"]),[[M,r.value[2]||r.value[3]]]),S("div",null,[b(o(v(U),{class:"modeButton",onClick:t[6]||(t[6]=s=>h.value="Card"),circle:"",secondary:"",type:"primary",size:"small"},{default:d(()=>[P("Card")]),_:1},512),[[M,r.value[2]||r.value[3]]]),b(o(v(U),{class:"modeButton",onClick:t[7]||(t[7]=s=>h.value="Cash"),circle:"",secondary:"",type:"primary",size:"small"},{default:d(()=>[P("Cash")]),_:1},512),[[M,r.value[2]||r.value[3]]]),b(o(v(U),{class:"modeButton",onClick:t[8]||(t[8]=s=>h.value="UPI"),circle:"",secondary:"",type:"primary",size:"small"},{default:d(()=>[P("UPI")]),_:1},512),[[M,r.value[2]||r.value[3]]])])]),Je,b(o(v(I),{checked:g.value,"onUpdate:checked":t[9]||(t[9]=s=>g.value=s),class:"optionsStyle","on-update:value":z(!0)},{default:d(()=>[P(" Add to a Past Date ")]),_:1},8,["checked","on-update:value"]),[[M,Q.value]]),r.value[1]?(R(),W(v(ue),{key:0,class:"dividerStyle"},{default:d(()=>[P(" Exception Days")]),_:1})):L("",!0)]),_:1}),b(o(v(Te),{value:H.value,"onUpdate:value":t[10]||(t[10]=s=>H.value=s),class:"optionsStyle","on-update:value":be},{default:d(()=>[o(v(G),{"item-style":"display: flex;"},{default:d(()=>[o(v(I),{value:"1",label:"Mon"}),o(v(I),{value:"2",label:"Tue"}),o(v(I),{value:"3",label:"Wed"}),o(v(I),{value:"4",label:"Thu"}),o(v(I),{value:"5",label:"Fri"}),o(v(I),{value:"6",label:"Sat"}),o(v(I),{value:"0",label:"Sun"})]),_:1})]),_:1},8,["value"]),[[M,r.value[1]]]),o(v(G),{vertical:""},{default:d(()=>[g.value?(R(),W(v(ue),{key:0,class:"dividerStyle"},{default:d(()=>[P(" Past Date ")]),_:1})):L("",!0),b(o(v(re),{value:T.value,"onUpdate:value":t[11]||(t[11]=s=>T.value=s),type:"date",size:"large",class:"inputFeild","is-date-disabled":Pe,"on-confirm":z(g.value),format:"dd-MMM-yyyy",actions:["clear"]},null,8,["value","on-confirm"]),[[M,g.value]]),b(S("div",null,[o(v(U),{class:"modeButton",onClick:t[12]||(t[12]=s=>T.value=ke()),circle:"",secondary:"",type:"primary",size:"small"},{default:d(()=>[P("Yesterday")]),_:1}),v(x).getDate()!=1?(R(),W(v(U),{key:0,class:"modeButton",onClick:t[13]||(t[13]=s=>T.value=Date.parse(`${v(x).getFullYear()}-${v(x).getMonth()+1}-01`)),circle:"",secondary:"",type:"primary",size:"small"},{default:d(()=>[P("1st "+oe(ce[v(x).getMonth()]),1)]),_:1})):L("",!0)],512),[[M,g.value&&(r.value[2]||r.value[3])]]),o(v(Oe),{disabled:c.value,id:"inp_num",value:n.value,"onUpdate:value":t[14]||(t[14]=s=>n.value=s),placeholder:"O",min:0,"show-button":!1,size:"large",class:"moneyInputStyle"},{prefix:d(()=>[P(" ₹ ")]),_:1},8,["disabled","value"]),S("div",Re,[b(o(v(U),{class:"createButton",onClick:t[15]||(t[15]=s=>Me()),type:"primary",size:"large"},{default:d(()=>[P(" Create Value ")]),_:1},512),[[M,n.value]])])]),_:1})]),o(v(de),{show:X.value,"onUpdate:show":t[16]||(t[16]=s=>X.value=s),preset:"dialog",title:"Dialog"},{header:d(()=>[S("div",null,oe(v(ne)),1)]),_:1},8,["show"])],64))}},ll=De(Ge,[["__scopeId","data-v-3d0cf6e2"]]);export{ll as default};
