var re=Object.defineProperty,ie=Object.defineProperties;var oe=Object.getOwnPropertyDescriptors;var P=Object.getOwnPropertySymbols;var ce=Object.prototype.hasOwnProperty,se=Object.prototype.propertyIsEnumerable;var z=(e,t,o)=>t in e?re(e,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[t]=o,G=(e,t)=>{for(var o in t||(t={}))ce.call(t,o)&&z(e,o,t[o]);if(P)for(var o of P(t))se.call(t,o)&&z(e,o,t[o]);return e},K=(e,t)=>ie(e,oe(t));import{l as h,A as j,j as ae,a as le,F as ue,y as J,T as de,S as fe}from"./vendor.ebb5b330.js";const he=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function o(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerpolicy&&(r.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?r.credentials="include":n.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(n){if(n.ep)return;n.ep=!0;const r=o(n);fetch(n.href,r)}};he();const V="https://raw.githubusercontent.com/igorsaux/icons-atlas/master",be="https://github.com/ChaoticOnyx/OnyxBay/blob/dev";function Y(e){const{url:t,onDone:o}=e,[s,n]=h(),[r,c]=h(!1),[a,d]=h(0),[A,ne]=h(0),[D,T]=h([]),te=j(()=>{fetch(t).then(N=>{var $;ne(parseInt(N.headers.get("Content-Length")||"0")),n(($=N.body)==null?void 0:$.getReader())})},[]);return s&&s.read().then(N=>{const{done:$,value:O}=N;if($){const W=new Uint8Array(A);let Q=0;for(const H of D)W.set(H,Q),Q+=H.length;o(W),n(void 0),c(!0);return}O!==void 0&&(T(D===void 0?[O]:[...D,O]),d(a+O.length))}),{total:A,received:a,isDone:r,start:te}}let l;const b=new Array(32).fill(void 0);b.push(void 0,null,!0,!1);function u(e){return b[e]}let v=b.length;function ge(e){e<36||(b[e]=v,v=e)}function M(e){const t=u(e);return ge(e),t}let X=new TextDecoder("utf-8",{ignoreBOM:!0,fatal:!0});X.decode();let R=null;function x(){return(R===null||R.buffer!==l.memory.buffer)&&(R=new Uint8Array(l.memory.buffer)),R}function I(e,t){return X.decode(x().subarray(e,e+t))}function g(e){v===b.length&&b.push(b.length+1);const t=v;return v=b[t],b[t]=e,t}function U(e){return e==null}let k=null;function _e(){return(k===null||k.buffer!==l.memory.buffer)&&(k=new Float64Array(l.memory.buffer)),k}let L=null;function p(){return(L===null||L.buffer!==l.memory.buffer)&&(L=new Int32Array(l.memory.buffer)),L}let y=0,B=new TextEncoder("utf-8");const pe=typeof B.encodeInto=="function"?function(e,t){return B.encodeInto(e,t)}:function(e,t){const o=B.encode(e);return t.set(o),{read:e.length,written:o.length}};function S(e,t,o){if(o===void 0){const a=B.encode(e),d=t(a.length);return x().subarray(d,d+a.length).set(a),y=a.length,d}let s=e.length,n=t(s);const r=x();let c=0;for(;c<s;c++){const a=e.charCodeAt(c);if(a>127)break;r[n+c]=a}if(c!==s){c!==0&&(e=e.slice(c)),n=o(n,s,s=c+e.length*3);const a=x().subarray(n+c,n+s);c+=pe(e,a).written}return y=c,n}function q(e){const t=typeof e;if(t=="number"||t=="boolean"||e==null)return`${e}`;if(t=="string")return`"${e}"`;if(t=="symbol"){const n=e.description;return n==null?"Symbol":`Symbol(${n})`}if(t=="function"){const n=e.name;return typeof n=="string"&&n.length>0?`Function(${n})`:"Function"}if(Array.isArray(e)){const n=e.length;let r="[";n>0&&(r+=q(e[0]));for(let c=1;c<n;c++)r+=", "+q(e[c]);return r+="]",r}const o=/\[object ([^\]]+)\]/.exec(toString.call(e));let s;if(o.length>1)s=o[1];else return toString.call(e);if(s=="Object")try{return"Object("+JSON.stringify(e)+")"}catch{return"Object"}return e instanceof Error?`${e.name}: ${e.message}
${e.stack}`:s}function ye(){l.setup_hook()}function me(e){l.load_icons(g(e))}function we(e){l.load_database(g(e))}function ve(e){var t=S(e,l.__wbindgen_malloc,l.__wbindgen_realloc),o=y,s=l.pick_icon(t,o);return M(s)}function Ie(e,t){var o=S(e,l.__wbindgen_malloc,l.__wbindgen_realloc),s=y,n=l.query(o,s,t);return M(n)}async function Se(e,t){if(typeof Response=="function"&&e instanceof Response){if(typeof WebAssembly.instantiateStreaming=="function")try{return await WebAssembly.instantiateStreaming(e,t)}catch(s){if(e.headers.get("Content-Type")!="application/wasm")console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n",s);else throw s}const o=await e.arrayBuffer();return await WebAssembly.instantiate(o,t)}else{const o=await WebAssembly.instantiate(e,t);return o instanceof WebAssembly.Instance?{instance:o,module:e}:o}}async function Z(e){typeof e=="undefined"&&(e=new URL("/icons-atlas/assets/icons_atlas_bg.8bef6ecc.wasm",self.location));const t={};t.wbg={},t.wbg.__wbindgen_object_drop_ref=function(n){M(n)},t.wbg.__wbg_debug_11404194b6887195=function(n,r){console.debug(I(n,r))},t.wbg.__wbindgen_json_parse=function(n,r){var c=JSON.parse(I(n,r));return g(c)},t.wbg.__wbindgen_is_null=function(n){var r=u(n)===null;return r},t.wbg.__wbindgen_is_undefined=function(n){var r=u(n)===void 0;return r},t.wbg.__wbindgen_boolean_get=function(n){const r=u(n);var c=typeof r=="boolean"?r?1:0:2;return c},t.wbg.__wbindgen_number_get=function(n,r){const c=u(r);var a=typeof c=="number"?c:void 0;_e()[n/8+1]=U(a)?0:a,p()[n/4+0]=!U(a)},t.wbg.__wbindgen_string_get=function(n,r){const c=u(r);var a=typeof c=="string"?c:void 0,d=U(a)?0:S(a,l.__wbindgen_malloc,l.__wbindgen_realloc),A=y;p()[n/4+1]=A,p()[n/4+0]=d},t.wbg.__wbg_new_693216e109162396=function(){var n=new Error;return g(n)},t.wbg.__wbg_stack_0ddaca5d1abfb52f=function(n,r){var c=u(r).stack,a=S(c,l.__wbindgen_malloc,l.__wbindgen_realloc),d=y;p()[n/4+1]=d,p()[n/4+0]=a},t.wbg.__wbg_error_09919627ac0992f5=function(n,r){try{console.error(I(n,r))}finally{l.__wbindgen_free(n,r)}},t.wbg.__wbg_instanceof_ArrayBuffer_649f53c967aec9b3=function(n){var r=u(n)instanceof ArrayBuffer;return r},t.wbg.__wbg_new_55259b13834a484c=function(n,r){var c=new Error(I(n,r));return g(c)},t.wbg.__wbg_buffer_5e74a88a1424a2e0=function(n){var r=u(n).buffer;return g(r)},t.wbg.__wbg_new_e3b800e570795b3c=function(n){var r=new Uint8Array(u(n));return g(r)},t.wbg.__wbg_set_5b8081e9d002f0df=function(n,r,c){u(n).set(u(r),c>>>0)},t.wbg.__wbg_length_30803400a8f15c59=function(n){var r=u(n).length;return r},t.wbg.__wbg_instanceof_Uint8Array_8a8537f46e056474=function(n){var r=u(n)instanceof Uint8Array;return r},t.wbg.__wbindgen_debug_string=function(n,r){var c=q(u(r)),a=S(c,l.__wbindgen_malloc,l.__wbindgen_realloc),d=y;p()[n/4+1]=d,p()[n/4+0]=a},t.wbg.__wbindgen_throw=function(n,r){throw new Error(I(n,r))},t.wbg.__wbindgen_memory=function(){var n=l.memory;return g(n)},(typeof e=="string"||typeof Request=="function"&&e instanceof Request||typeof URL=="function"&&e instanceof URL)&&(e=fetch(e));const{instance:o,module:s}=await Se(await e,t);return l=o.exports,Z.__wbindgen_wasm_module=s,l}const i=ae,f=le,Ae=ue;function ee(e,t,o){const s=t/1e6,n=o/1e6,r=t/o*100;return`Loading ${e} ${s.toFixed(2)} MB / ${n.toFixed(2)} MB (${r.toFixed(0)}%)`}function Ne(e){const t=Y({url:`${V}/database.bin`,onDone:r=>{we(r)}}),o=Y({url:`${V}/icons.bin`,onDone:r=>{me(r)}});let s="";J(()=>{t.start()},[]),J(()=>{t.isDone&&o.start()},[t.isDone]);let n=0;if(t.isDone)if(o.isDone)e.onLoaded();else{const{received:r,total:c}=o;s=ee('"icons.bin"',r,c),n=r/c*100}else{const{received:r,total:c}=t;s=ee('"database.bin"',r,c),n=r/c*100}return f("div",{className:"Loading",children:[i("h2",{children:"Loading Resources"}),i("pre",{children:s}),i("progress",{max:100,value:n})]})}function $e(e){const{onQueryChange:t,isInvalid:o}=e;return i("input",{onInput:s=>{var n;return t((n=s.target)==null?void 0:n.value)},type:"text",placeholder:"Search",autoComplete:"on",class:`SearchInput ${o?"Invalid":""}`})}function Oe(e,t){return Ie(e,t).map(s=>{const n=JSON.parse(s.fields);return n.path=n.path[0],n.state=n.state[0],n.id=n.id[0],K(G({},s),{fields:n})})}function Re(e){return ve(e)}function xe(e){const t=Re(e.id),o=[];for(const s in t)o.push(t[s]);return i("div",{className:"ByondIcon",children:o.map(s=>i("img",{class:"Dir",src:`data:image/png;base64,${s}`}))})}function ke(e){const t=e.replaceAll("\\","/");return`${be}/${t}`}function Le(e){const{queryResult:t}=e;return f("div",{className:"SearchEntry",children:[f("div",{className:"Content",children:[i("a",{title:"Open on GitHub",className:"GithubMark",target:"_blank",href:ke(t.fields.path),children:i("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 16 16",width:"18",height:"18",children:i("path",{fill:"white","fill-rule":"evenodd",d:"M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"})})}),f("div",{className:"IconState",children:[i("b",{children:"State:"})," ",t.fields.state]}),f("div",{className:"IconPath",children:[i("b",{children:"Path:"})," ",t.fields.path]})]}),i("hr",{}),i(xe,{id:t.fields.id})]})}function _(e){return i("span",{className:"Keyword",children:e.children})}function m(e){return i("span",{className:"String",children:e.children})}function E(e){return i("span",{className:"Boolean",children:e.children})}function F(e){return i("span",{className:"Operator",children:e.children})}function C(e){return i("pre",{className:"Code",children:e.children})}function w(e){return i("pre",{className:"CodeInline",children:e.children})}function Be(){return f(Ae,{children:[i("h3",{children:"Prefixes"}),"Use prefix"," ",i(w,{children:i(_,{children:"state:"})})," ","to search across icon state names:",f(C,{children:[i(_,{children:"state:"}),i(m,{children:'"engine"'})]}),"Use prefix"," ",i(w,{children:i(_,{children:"path:"})})," ","to search across icon paths:",f(C,{children:[i(_,{children:"path:"}),i(m,{children:'"actions.dmi"'})]}),i("h3",{children:"Booleans"}),"Use boolean operators"," ",i(w,{children:i(E,{children:"OR"})}),","," ",i(w,{children:i(E,{children:"AND"})})," ","to combine queries:",f(C,{children:[i(_,{children:"state:"}),i(m,{children:'"emp"'})," ",i(E,{children:"AND"})," ",i(_,{children:"path:"}),i(m,{children:'"actions.dmi"'})]}),i("h3",{children:"Misc"}),"Also, you can use"," ",i(w,{children:i(F,{children:"-"})})," ","to exclude a query and"," ",i(w,{children:i(F,{children:"+"})})," ","to require some query:",f(C,{children:[i(_,{children:"state:"}),i(m,{children:'"emp"'})," ",i(E,{children:"AND"})," ",i(F,{children:"-"}),i(_,{children:"path:"}),i(m,{children:'"actions.dmi"'})]}),"See"," ",i("a",{target:"_blank",href:"https://docs.rs/tantivy/latest/tantivy/query/struct.QueryParser.html",children:"details"}),"."]})}function Ee(){return i(de,{content:i(Be,{}),interactive:!0,interactiveBorder:20,theme:"dark",children:i("span",{className:"Help",children:"?"})})}function Ce(e,t){return e.score>t.score?-1:e.score===t.score?0:1}function De(){const[e,t]=h(!1),[o,s]=h([]),[n,r]=h(""),c=j(a=>{r(a);try{s(Oe(a,500)),t(!1)}catch{t(!0)}},[n]);return f("div",{className:"SearchEngine",children:[f("div",{className:"TopBar",children:[i($e,{onQueryChange:c,isInvalid:e}),i(Ee,{})]}),i("div",{class:"SearchResults",children:o.sort(Ce).map(a=>i(Le,{queryResult:a}))})]})}function je(){const[e,t]=h(!1),o=j(()=>{t(!0)},[]);return i("div",{className:`App ${e?"":"Center"}`,children:e?i(De,{}):i(Ne,{onLoaded:o})})}async function Me(){console.group("Initialization"),console.debug("Initializing wasm..."),await Z(),console.debug("Initialized."),console.debug("Setup hooks."),ye(),console.groupEnd()}async function Ue(){await Me(),fe(i(je,{}),document.body)}Ue();
