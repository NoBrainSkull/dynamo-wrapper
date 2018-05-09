!function(e){var t={};function r(n){if(t[n])return t[n].exports;var a=t[n]={i:n,l:!1,exports:{}};return e[n].call(a.exports,a,a.exports,r),a.l=!0,a.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:n})},r.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=3)}([function(e,t){e.exports=require("aws-sdk")},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.query=function(e){return new Promise((t,r)=>u.query(e).promise().then(e=>t(e.Items)).catch(e=>r(e)))},t.scan=function(e){return new Promise((t,r)=>u.scan(e).promise().then(e=>t(e.Items)).catch(e=>r(e)))},t.get=function(e){return new Promise((t,r)=>u.get(e).promise().then(e=>t(e.Item)).catch(e=>r(e)))},t.createItem=function(e){return new Promise((t,r)=>u.put(e).promise().then(()=>t(e.Item)).catch(e=>r(e)))},t.updateItem=function(e){return new Promise((t,r)=>u.update(e).promise().then(e=>t(e.Attributes)).catch(e=>r(e)))},t.deleteItem=function(e){return new Promise((t,r)=>u.delete(e).promise().then(e=>t(e.Attributes)).catch(e=>r(e)))};var n,a=r(0);const u=new((n=a)&&n.__esModule?n:{default:n}).default.DynamoDB.DocumentClient},function(e,t){e.exports=require("uuid/v1")},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n,a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},u=r(2),o=(n=u)&&n.__esModule?n:{default:n},s=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t}(r(1));class i{constructor(e){this.name=e}query(e=null){return s.query(a({TableName:this.name},e))}find(e=null){return s.scan(a({TableName:this.name},e))}findById(e,t=null){return s.get(a({TableName:this.name,Key:{id:e}},t))}findByCompositeId(e=null){return s.get(a({TableName:this.name,Key:a({},ids)},e))}add(e,t=null){return s.createItem(a({TableName:this.name,Item:a({},e,{id:(0,o.default)()})},t))}update(e,t=null){return s.updateItem(a({TableName:this.name,Key:{id:e},ReturnValues:"ALL_NEW"},t))}updateWithFormat(e){const{expression:t,formattedValues:r,formattedNames:n}=this.constructor.formatUpdateValues(e);return this.update(e.id,{ExpressionAttributeNames:n,UpdateExpression:`SET ${t.join(", ")}`,ExpressionAttributeValues:r})}remove(e,t=null){return s.deleteItem(a({TableName:this.name,Key:{id:e.id},ReturnValues:"ALL_OLD"},t))}static formatArrayValues(e){return e.reduce((e,t,r)=>a({},e,{[`:value${r}`]:t}),{})}static formatUpdateValues(e){let{id:t}=e,r=function(e,t){var r={};for(var n in e)t.indexOf(n)>=0||Object.prototype.hasOwnProperty.call(e,n)&&(r[n]=e[n]);return r}(e,["id"]);return Object.keys(r).reduce((e,t)=>({expression:e.expression.concat(`#${t} = :${t}`),formattedValues:a({},e.formattedValues,{[`:${t}`]:r[t]}),formattedNames:a({},e.formattedNames,{[`#${t}`]:t})}),{expression:[],formattedValues:{},formattedNames:{}})}static addIdToSubItems(e){return e?Array.isArray(e)?e.map(e=>i.addIdToSubItems(e)):c(e):e}}t.default=i;const c=e=>a({},e,{id:(0,o.default)()})}]);