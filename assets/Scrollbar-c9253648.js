import{j as l,N as e}from"./Button-d3be0146.js";import{d as n,r as t,h as a}from"./index-6cf9dede.js";const c=Object.assign(Object.assign({},l.props),{trigger:String,xScrollable:Boolean,onScroll:Function,size:Number}),i=n({name:"Scrollbar",props:c,setup(){const s=t(null);return Object.assign(Object.assign({},{scrollTo:(...r)=>{var o;(o=s.value)===null||o===void 0||o.scrollTo(r[0],r[1])},scrollBy:(...r)=>{var o;(o=s.value)===null||o===void 0||o.scrollBy(r[0],r[1])}}),{scrollbarInstRef:s})},render(){return a(e,Object.assign({ref:"scrollbarInstRef"},this.$props),this.$slots)}}),u=i;export{u as N};
