import{_ as be}from"./c_header-04a75c71.js";import{d as ke,a as xe,h as $e,_ as we,i as se,r as z,l as $,x as D,z as N,B as c,s as S,u as o,F as j,A as T,E as K,I as De,y as d,q as Q,C as R,G as Ne,H as Be}from"./index-1b249620.js";import{d as Fe,j as fe,q as Se,G as qe,H as Me,J as ie,F as G}from"./Button-0269824d.js";import{f as Ce,h as ze}from"./fade-in-scale-up.cssr-8360d36f.js";import{N as ue}from"./Select-f4136871.js";import{N as X}from"./Divider-934dc452.js";import{N as Re}from"./Scrollbar-4e4d1278.js";const Pe={gapSmall:"4px 8px",gapMedium:"8px 12px",gapLarge:"12px 16px"},Ye=()=>Pe,Ee={name:"Flex",self:Ye},Ie=Ee,je=Object.assign(Object.assign({},fe.props),{align:String,justify:{type:String,default:"start"},inline:Boolean,vertical:Boolean,reverse:Boolean,size:{type:[String,Number,Array],default:"medium"},wrap:{type:Boolean,default:!0}}),de=ke({name:"Flex",props:je,setup(x){const{mergedClsPrefixRef:k,mergedRtlRef:n}=Fe(x),g=fe("Flex","-flex",void 0,Ie,x,k);return{rtlEnabled:Se("Flex",n,k),mergedClsPrefix:k,margin:xe(()=>{const{size:e}=x;if(Array.isArray(e))return{horizontal:e[0],vertical:e[1]};if(typeof e=="number")return{horizontal:e,vertical:e};const{self:{[qe("gap",e)]:_}}=g.value,{row:p,col:u}=Me(_);return{horizontal:ie(u),vertical:ie(p)}})}},render(){const{vertical:x,reverse:k,align:n,inline:g,justify:i,margin:e,wrap:_,mergedClsPrefix:p,rtlEnabled:u}=this,B=Ce(ze(this),!1);return B.length?$e("div",{role:"none",class:[`${p}-flex`,u&&`${p}-flex--rtl`],style:{display:g?"inline-flex":"flex",flexDirection:(()=>x&&!k?"column":x&&k?"column-reverse":!x&&k?"row-reverse":"row")(),justifyContent:i,flexWrap:!_||x?"nowrap":"wrap",alignItems:n,gap:`${e.vertical}px ${e.horizontal}px`}},B):null}});const O=x=>(Ne("data-v-fb28c55d"),x=x(),Be(),x),Te=O(()=>c("span",{class:"dropdownTitle"},"View: ",-1)),Ge={style:{width:"30%","margin-top":"10px","padding-bottom":"10px"}},Oe=O(()=>c("span",{class:"dropdownTitle"},"Group By: ",-1)),Ve={style:{width:"27%","margin-top":"10px","padding-bottom":"10px"}},We=["onClick"],He={id:"itm_id"},Ae={id:"itm_name"},Le={id:"itm_cls"},Je={id:"itm_amt"},Ue={id:"itm_dte"},Ke={key:1},Qe=O(()=>c("h2",{style:{"text-align":"center",color:"gray"}},"NO SPENDING FOUND",-1)),Xe=[Qe],Ze={id:"itm_id"},et={id:"itm_name"},tt={id:"itm_cls"},at={id:"itm_amt"},lt={id:"itm_dte"},rt={id:"itm_id"},nt={id:"itm_name"},ot={id:"itm_cls"},st={id:"itm_amt"},it={style:{display:"none"}},ut={key:1},dt=O(()=>c("h2",{style:{"text-align":"center",color:"gray"}},"NO SPENDING FOUND",-1)),ft=[dt],ct={__name:"spendHistory",setup(x){const k=se("$globaldata"),n=se("$data");let g=0,i=[],e=[[],[],[]],_=[],p=[],u=[0,0,0],B=[0,0,0],q=0,Z=0,ee=0,v=z(0),m=z(k.groupBy_opt),y=z(k.view_opt),f=z(k.catagory_actv),P=z(["#444444","#01700c"]),s=new Date(Date.now()),V=0,W=0,H=0,A=0;const Y=["Jan","Feb","Mar","Aprl","May","June","July","Aug","Sept","Oct","Nov","Dec"],ce=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];e[0][0]=n.required.length,e[1][0]=n.needs.length,e[2][0]=n.wants.length;let te=n.base.length;for(let l=0;l<=e[0][0]-1;l++)e[0].push(n.required[l].track.length);for(let l=0;l<=e[1][0]-1;l++)e[1].push(n.needs[l].track.length);for(let l=0;l<=e[2][0]-1;l++)e[2].push(n.wants[l].track.length);function E(l){let t=!1,a=!1,h=!1,w=!1,b=!1;console.log("rendering");let M=n.history.day[0].date.split("-"),C=Date.parse(`${M[2]}/${M[1]}/${M[0]}`);for(;t!=!0;){if(H!=e[2][0]&&w==!1)for(let r=0;r<=e[2][0]-1;r++)for(;;){if(e[2][e[2][0]-r]<=0){e[2][e[2][0]-r]==0&&(H=H+1,e[2][e[2][0]-r]=-1);break}else if(console.log(`${s.getDate()}-${s.getMonth()+1}-${s.getFullYear()}`),n.wants[e[2][0]-1-r].track[e[2][e[2][0]-r]-1].date==`${s.getDate()}-${s.getMonth()+1}-${s.getFullYear()}`){if(i.push({id:g,ref:e[2][0]-1-r,name:n.wants[e[2][0]-1-r].track[e[2][e[2][0]-r]-1].name,date:{day:s.getDate(),month:s.getMonth(),year:s.getFullYear()},value:n.wants[e[2][0]-1-r].track[e[2][e[2][0]-r]-1].value,class:"Wants > "+n.wants[e[2][0]-1-r].name,catagory:"Wants>"+n.wants[e[2][0]-1-r].name,num_cat:3}),g=g+1,e[2][e[2][0]-r]=e[2][e[2][0]-r]-1,g>=l*(u[0]+1)){t=!0,u[0]=u[0]+1;break}}else break;if(t)break}else w=!0;if(t==!0)break;if(W!=e[1][0]&&h==!1)for(let r=0;r<=e[1][0]-1;r++)for(;;){if(e[1][e[1][0]-r]<=0){e[1][e[1][0]-r]==0&&(W=W+1,e[1][e[1][0]-r]=-1);break}else if(n.needs[e[1][0]-1-r].track[e[1][e[1][0]-r]-1].date==`${s.getDate()}-${s.getMonth()+1}-${s.getFullYear()}`){if(i.push({id:g,ref:e[1][0]-1-r,name:n.needs[e[1][0]-1-r].track[e[1][e[1][0]-r]-1].name,date:{day:s.getDate(),month:s.getMonth(),year:s.getFullYear()},value:n.needs[e[1][0]-1-r].track[e[1][e[1][0]-r]-1].value,class:"Needs > "+n.needs[e[1][0]-1-r].name,catagory:"Needs>"+n.needs[e[1][0]-1-r].name,num_cat:2}),g=g+1,e[1][e[1][0]-r]=e[1][e[1][0]-r]-1,g>=l*(u[0]+1)){t=!0,u[0]=u[0]+1;break}}else break;if(t)break}else h=!0;if(t==!0)break;if(V!=e[0][0]&&a==!1)for(let r=0;r<=e[0][0]-1;r++)for(;;){if(e[0][e[0][0]-r]<=0){e[0][e[0][0]-r]==0&&(V=V+1,e[0][e[0][0]-r]=-1);break}else if(console.log(`${s.getDate()}-${s.getMonth()+1}-${s.getFullYear()}`),n.required[e[0][0]-1-r].track[e[0][e[0][0]-r]-1].date==`${s.getDate()}-${s.getMonth()+1}-${s.getFullYear()}`){if(i.push({id:g,ref:e[0][0]-1-r,name:n.required[e[0][0]-1-r].name,date:{day:s.getDate(),month:s.getMonth(),year:s.getFullYear()},value:n.required[e[0][0]-1-r].track[e[0][e[0][0]-r]-1].value,class:"Required",catagory:"Required",num_cat:1}),g=g+1,e[0][e[0][0]-r]=e[0][e[0][0]-r]-1,g>=l*(u[0]+1)){t=!0,u[0]=u[0]+1;break}}else break;if(t)break}else a=!0;if(t==!0)break;if(A!=te&&b==!1){for(let r=te-1;r>=0;r--)if(console.log(`${s.getDate()}-${s.getMonth()+1}-${s.getFullYear()}`),n.base[r].init==`${s.getDate()}-${s.getMonth()+1}-${s.getFullYear()}`&&(i.push({id:g,ref:r,name:n.base[r].name,date:{day:s.getDate(),month:s.getMonth(),year:s.getFullYear()},value:n.base[r].value,class:"Base",catagory:"Base",num_cat:0}),g=g+1,A=A+1,g>=l*(u[0]+1))){t=!0,u[0]=u[0]+1;break}}else b=!0;if(s.valueOf()<C){B[0]=!0,console.log("explict break!");break}if(a&&h&&w&&b){B[0]=!0,console.log("out of gas");break}s.setDate(s.getDate()-1)}v.value=v.value+1}function L(l){for(let t=u[1]*l+ee;_.length<(u[1]+1)*l;t++){if(t>n.history.day.length-1){B[1]=!0,console.log("out of gas!!");break}if(n.history.day[n.history.day.length-t-1].spend[0]==0&&n.history.day[n.history.day.length-t-1].spend[4]==0){ee+=1;continue}_.push({day_id:_.length,date:n.history.day[n.history.day.length-t-1].date.split("-"),catagory_spend:n.history.day[n.history.day.length-t-1].spend.slice(1)})}u[1]+=1,v.value=v.value+1}function J(l){let t,a,h=0,w=!1,b=u[2]*l;for(let M=0;p.length<(u[2]+1)*l;M++){let C=[0,0,0,0];if(b+h>=n.history.day.length-1){w||p.push({month_id:p.length,date:n.history.day[0].date.split("-").slice(1),catagory_spend:n.history.day[0].spend.slice(1)}),B[2]=!0,console.log("out of gas!!");break}for(;;){if(C.forEach((r,oe)=>{C[oe]+=n.history.day[n.history.day.length-1-b-h].spend[oe+1]}),b+h>n.history.day.length-2){w=!0;break}if(t=n.history.day[n.history.day.length-1-b-h].date.split("-"),a=n.history.day[n.history.day.length-2-b-h].date.split("-"),h+=1,a[1]!=t[1]||a[2]!=a[2]){w=!1;break}}p.push({month_id:p.length,date:n.history.day[n.history.day.length-b-h].date.split("-").slice(1),catagory_spend:C})}u[2]+=1,v.value=v.value+1}function F(l){let t="₹ ";if(l){const a=l.toString();let h=!1,w=a.length-1;w%2!=0&&(t=t+a.substring(0,1)+",",w-=1,h=!0);for(let b=0;b<w;b+=2)t=t+a.substring(b+h,b+h+2)+",";return t=t.slice(0,t.length-1),t+=a.substring(a.length-1,a.length-0),t}else return t+="0",t}function I(l){if(f.value[l]==1){let t=0;if(f.value.forEach(a=>{a==1&&(t+=1)}),t<=1)return!1;f.value[l]=0}else f.value[l]=1;v.value=v.value+1,U()}function ge(l){m.value=l,v.value=v.value+1,U()}function ye(l){y.value=l,l==1&&i.length==0&&E(15),l==2&&_.length==0&&(m.value<2&&(m.value=2),L(15)),l==3&&p.length==0&&(m.value<3&&(m.value=3),J(15)),v.value=v.value+1,U()}function ae(l){let t="[ ";return f.value[0]==1&&(t+="B: "+F(l[3])+" | "),f.value[1]==1&&(t+="R: "+F(l[0])+" | "),f.value[2]==1&&(t+="N: "+F(l[1])+" | "),f.value[3]==1&&(t+="W: "+F(l[2])+" | "),t=t.slice(0,t.length-2),t+="]",t}function le(l){let t=0;return f.value[0]==1&&(t+=l[3]),f.value[1]==1&&(t+=l[0]),f.value[2]==1&&(t+=l[1]),f.value[3]==1&&(t+=l[2]),t}function he(l){return v.value!=Z&&(Z=v.value,q=0),f.value[l]&&(q+=1),!!f.value[l]}function U(){k.groupBy_opt=m.value,k.catagory_actv=f.value,k.view_opt=y.value}function _e(l){if(l==i.length-1)return!1;if(m.value==1)return!0;let t=l;if(!f.value[i[t].num_cat])return!1;let a=t+1;for(;!f.value[i[a].num_cat];)if(a+=1,a==i.length)return!1;if(m.value==2)return i[t].date.day!=i[a].date.day||i[t].date.month!=i[a].date.month?!0:i[t].date.year!=i[a].date.year;if(m.value==3)return i[t].date.month!=i[a].date.month?!0:i[t].date.year!=i[a].date.year;if(m.value==4)return i[t].date.year!=i[a].date.year}function pe(l){if(l==_.length-1)return!1;if(m.value==2)return!0;if(m.value==3)return _[l].date[1]!=_[l+1].date[1]?!0:_[l].date[2]!=_[l+1].date[2];if(m.value==4)return _[l].date[2]!=_[l+1].date[2]}function me(l){if(l==p.length-1)return!1;if(m.value==3)return!0;if(m.value==4)return p[l].date[1]!=p[l+1].date[1]}function re(l,t){return l.length>=t?l.slice(0,t-3)+"...":l}function ve(){q<14*u[0]&&B[0]!=!0&&(console.log("RecallingMore"),E(15),u[0]-=1)}function ne(l,t,a){let h=new Date(l,t,a);return ce[h.getDay()]}return y.value==1?E(15):y.value==2?L(15):y.value==3&&J(15),(l,t)=>($(),D(j,null,[N(be,{title:"Spend History"}),c("div",null,[N(o(de),{justify:"space-around",style:{"font-family":"'roboto-medium'"}},{default:S(()=>[N(o(G),{quaternary:"",type:"primary",round:"",secondary:"",color:o(P)[o(f)[1]],onClick:t[0]||(t[0]=a=>I(1)),size:"small"},{default:S(()=>[T(" Required ")]),_:1},8,["color"]),N(o(G),{quaternary:"",type:"primary",round:"",secondary:"",color:o(P)[o(f)[2]],onClick:t[1]||(t[1]=a=>I(2)),size:"small"},{default:S(()=>[T(" Needs ")]),_:1},8,["color"]),N(o(G),{quaternary:"",type:"primary",round:"",secondary:"",color:o(P)[o(f)[3]],onClick:t[2]||(t[2]=a=>I(3)),size:"small"},{default:S(()=>[T(" Wants ")]),_:1},8,["color"]),N(o(G),{quaternary:"",type:"primary",round:"",secondary:"",color:o(P)[o(f)[0]],onClick:t[3]||(t[3]=a=>I(0)),size:"small"},{default:S(()=>[T(" Base ")]),_:1},8,["color"])]),_:1}),N(o(de),{justify:"end","align-items":"center"},{default:S(()=>[Te,c("div",Ge,[N(o(ue),{value:o(y),size:"small","on-update:value":ye,options:[{label:"Per Item",value:1},{label:"Per Day",value:2},{label:"Per Month",value:3}]},null,8,["value"])]),Oe,c("div",Ve,[N(o(ue),{value:o(m),size:"small","on-update:value":ge,options:[{label:"Item",value:1,disabled:o(y)>1},{label:"Day",value:2,disabled:o(y)>2},{label:"Month",value:3,disabled:o(y)>3},{label:"Year",value:4,disabled:o(y)>4}]},null,8,["value","options"])])]),_:1})]),N(o(Re),{style:{"max-height":"46em"},trigger:l.hover,"on-scroll":a=>{a.target.scrollTop>=300+(o(u)[o(y)-1]-1)*860&&!o(B)[o(y)-1]&&(o(y)==1?E(15):o(y)==2?L(15):o(y)==3&&J(15))}},{default:S(()=>[o(i).length>0||o(_).length>0||o(p).length>0?($(),D("div",{key:o(v)},[o(y)==1?($(!0),D(j,{key:0},K(o(i),a=>($(),D("div",{key:a.id,class:De({itm_contain:he(a.num_cat),itm_contain_emty:!o(f)[a.num_cat]}),onClick:h=>l.$router.push({name:"itemDetails",params:{_name:a.name,_catagory:a.catagory+a.ref}})},[c("div",He,d(o(q)),1),c("div",Ae,d(re(a.name,25)),1),c("div",Le,d(re(a.class,45)),1),c("div",Je,d(F(a.value)),1),c("div",Ue,d(a.date.day)+"-"+d(Y[a.date.month])+"-"+d(a.date.year)+" ("+d(ne(a.date.year,a.date.month,a.date.day))+")",1),_e(a.id)?($(),Q(o(X),{key:0,id:"ndiv"})):R("",!0)],10,We))),128)):R("",!0),o(y)==1&&o(q)==0?($(),D("div",Ke,Xe)):o(y)==2?($(!0),D(j,{key:2},K(o(_),a=>($(),D("div",{key:a.day_id,class:"itm_contain"},[c("div",Ze,d(a.day_id+1),1),c("div",et,d(a.date[0])+" "+d(Y[a.date[1]-1]),1),c("div",tt,d(ae(a.catagory_spend)),1),c("div",at,d(F(le(a.catagory_spend))),1),c("div",lt,d(a.date[0])+"-"+d(Y[a.date[1]-1])+"-"+d(a.date[2])+" ("+d(ne(a.date[2],a.date[1]-1,a.date[0]))+")",1),pe(a.day_id)?($(),Q(o(X),{key:0,id:"ndiv"})):R("",!0)]))),128)):o(y)==3?($(!0),D(j,{key:3},K(o(p),a=>($(),D("div",{key:a.month_id,class:"itm_contain"},[c("div",rt,d(a.month_id+1),1),c("div",nt,d(Y[a.date[0]-1])+" "+d(a.date[1]),1),c("div",ot,d(ae(a.catagory_spend)),1),c("div",st,d(F(le(a.catagory_spend))),1),me(a.month_id)?($(),Q(o(X),{key:0,id:"ndiv"})):R("",!0)]))),128)):R("",!0),c("span",it,d(ve()),1)])):($(),D("div",ut,ft))]),_:1},8,["trigger","on-scroll"])],64))}},bt=we(ct,[["__scopeId","data-v-fb28c55d"]]);export{bt as default};