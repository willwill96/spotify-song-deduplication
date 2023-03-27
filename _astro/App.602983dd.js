import{$ as oe,a as sn,g as Vn,b as wt,c as fe,m as Jn,o as Qt,d as Zn,e as K,f as er,u as on,h as ia,i as kt,j as sa,k as Z,s as oa,l as D,n as la,r as Ve,t as Q,p as tr,q as j,v as $,w as He,x as $e,F as ua,y as ln}from"./web.09441124.js";const xt="928713b0001c4592a9910f798369bffb",nr="spotify_code_verifier",rr="spotify_access_token",ar="spotify_refresh_token",ve=()=>window.localStorage,ca=()=>ve().getItem(rr),un=t=>ve().setItem(rr,t),fa=()=>ve().getItem(ar),cn=t=>ve().setItem(ar,t),da=()=>ve().getItem(nr),ha=t=>ve().setItem(nr,t),ma=()=>new URLSearchParams(window.location.search).get("code");function pa(t){let e="";const n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";for(let r=0;r<t;r++)e+=n.charAt(Math.floor(Math.random()*n.length));return e}async function va(t){const e=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(t));return btoa(String.fromCharCode(...new Uint8Array(e))).replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_")}const fn=()=>{window.localStorage.clear(),window.sessionStorage.clear()},dn=()=>{window.location.href=window.location.href.split("?")[0]},ga=async({code:t,codeVerifier:e})=>{const n=await fetch("https://accounts.spotify.com/api/token?"+new URLSearchParams({code:t,redirect_uri:"https://willwill96.github.io",grant_type:"authorization_code",code_verifier:e,client_id:xt}).toString(),{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"}});if(n.status!==200)throw new Error("Bad authorization_code");return n.json()};class ya{loggedIn=!1;tokenAcquisitionPromise=null;onReady;constructor(e={}){const{onReady:n=()=>{}}=e;this.onReady=n;const r=da(),a=ma();r&&a?this.doTokenInitialization({code:a,codeVerifier:r}):this.determineIfLoggedIn()}doTokenInitialization({code:e,codeVerifier:n}){const r=async()=>{try{const a=await ga({code:e,codeVerifier:n});un(a.access_token),cn(a.refresh_token)}catch(a){console.log("Error getting access tokens",a),fn(),dn()}this.loggedIn=!0,this.tokenAcquisitionPromise=null,window.history.replaceState(null,"",window.location.pathname.split("?")[0]),this.onReady(this.loggedIn)};this.tokenAcquisitionPromise=r()}async attemptAccessTokenRefresh(){const e=fa();if(!e)throw new Error("Invalid Refresh Token");const n=await fetch("https://accounts.spotify.com/api/token?"+new URLSearchParams({grant_type:"refresh_token",refresh_token:e,client_id:xt}).toString(),{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"}});if(n.status!==200)throw new Error("Something went wrong in refresh token acquisition");const{access_token:r,refresh_token:a}=await n.json();un(r),a&&cn(a)}async determineIfLoggedIn(){try{await this.fetchSpotifyRoute("https://api.spotify.com/v1/me"),this.loggedIn=!0,this.onReady(this.loggedIn)}catch{this.onReady(!1)}}async fetchSpotifyRoute(e){this.tokenAcquisitionPromise&&await this.tokenAcquisitionPromise;const n=ca();if(!n)throw new Error("No Access Token Found");try{const r=await await fetch(e,{headers:{Authorization:"Bearer "+n,"Content-Type":"application/json"}});if(r.status===200)return r.json();if(r.status===401)return this.tokenAcquisitionPromise?(await this.tokenAcquisitionPromise,this.fetchSpotifyRoute(e)):(this.tokenAcquisitionPromise=this.attemptAccessTokenRefresh(),await this.tokenAcquisitionPromise,this.tokenAcquisitionPromise=null,this.fetchSpotifyRoute(e));throw new Error("Not authenticated")}catch{fn(),dn()}return null}async initiateAuthFlow(){const e=pa(64);ha(e),window.location.href="https://accounts.spotify.com/authorize?"+new URLSearchParams({response_type:"code",client_id:xt,scope:"playlist-read-private playlist-modify-private playlist-modify-public playlist-read-collaborative",redirect_uri:"https://willwill96.github.io/spotify-song-deduplication",code_challenge_method:"S256",code_challenge:await va(e)}).toString()}}class Ee{constructor(){this.listeners=[],this.subscribe=this.subscribe.bind(this)}subscribe(e){return this.listeners.push(e),this.onSubscribe(),()=>{this.listeners=this.listeners.filter(n=>n!==e),this.onUnsubscribe()}}hasListeners(){return this.listeners.length>0}onSubscribe(){}onUnsubscribe(){}}const xe=typeof window>"u"||"Deno"in window;function q(){}function ba(t,e){return typeof t=="function"?t(e):t}function St(t){return typeof t=="number"&&t>=0&&t!==1/0}function ir(t,e){return Math.max(t+(e||0)-Date.now(),0)}function De(t,e,n){return st(t)?typeof e=="function"?{...n,queryKey:t,queryFn:e}:{...e,queryKey:t}:t}function J(t,e,n){return st(t)?[{...e,queryKey:t},n]:[t||{},e]}function hn(t,e){const{type:n="all",exact:r,fetchStatus:a,predicate:i,queryKey:s,stale:o}=t;if(st(s)){if(r){if(e.queryHash!==jt(s,e.options))return!1}else if(!Je(e.queryKey,s))return!1}if(n!=="all"){const l=e.isActive();if(n==="active"&&!l||n==="inactive"&&l)return!1}return!(typeof o=="boolean"&&e.isStale()!==o||typeof a<"u"&&a!==e.state.fetchStatus||i&&!i(e))}function mn(t,e){const{exact:n,fetching:r,predicate:a,mutationKey:i}=t;if(st(i)){if(!e.options.mutationKey)return!1;if(n){if(ae(e.options.mutationKey)!==ae(i))return!1}else if(!Je(e.options.mutationKey,i))return!1}return!(typeof r=="boolean"&&e.state.status==="loading"!==r||a&&!a(e))}function jt(t,e){return(e?.queryKeyHashFn||ae)(t)}function ae(t){return JSON.stringify(t,(e,n)=>Ot(n)?Object.keys(n).sort().reduce((r,a)=>(r[a]=n[a],r),{}):n)}function Je(t,e){return sr(t,e)}function sr(t,e){return t===e?!0:typeof t!=typeof e?!1:t&&e&&typeof t=="object"&&typeof e=="object"?!Object.keys(e).some(n=>!sr(t[n],e[n])):!1}function or(t,e){if(t===e)return t;const n=vn(t)&&vn(e);if(n||Ot(t)&&Ot(e)){const r=n?t.length:Object.keys(t).length,a=n?e:Object.keys(e),i=a.length,s=n?[]:{};let o=0;for(let l=0;l<i;l++){const c=n?l:a[l];s[c]=or(t[c],e[c]),s[c]===t[c]&&o++}return r===i&&o===r?t:s}return e}function pn(t,e){if(t&&!e||e&&!t)return!1;for(const n in t)if(t[n]!==e[n])return!1;return!0}function vn(t){return Array.isArray(t)&&t.length===Object.keys(t).length}function Ot(t){if(!gn(t))return!1;const e=t.constructor;if(typeof e>"u")return!0;const n=e.prototype;return!(!gn(n)||!n.hasOwnProperty("isPrototypeOf"))}function gn(t){return Object.prototype.toString.call(t)==="[object Object]"}function st(t){return Array.isArray(t)}function lr(t){return new Promise(e=>{setTimeout(e,t)})}function yn(t){lr(0).then(t)}function wa(){if(typeof AbortController=="function")return new AbortController}function At(t,e,n){return n.isDataEqual!=null&&n.isDataEqual(t,e)?t:typeof n.structuralSharing=="function"?n.structuralSharing(t,e):n.structuralSharing!==!1?or(t,e):e}class ka extends Ee{constructor(){super(),this.setup=e=>{if(!xe&&window.addEventListener){const n=()=>e();return window.addEventListener("visibilitychange",n,!1),window.addEventListener("focus",n,!1),()=>{window.removeEventListener("visibilitychange",n),window.removeEventListener("focus",n)}}}}onSubscribe(){this.cleanup||this.setEventListener(this.setup)}onUnsubscribe(){if(!this.hasListeners()){var e;(e=this.cleanup)==null||e.call(this),this.cleanup=void 0}}setEventListener(e){var n;this.setup=e,(n=this.cleanup)==null||n.call(this),this.cleanup=e(r=>{typeof r=="boolean"?this.setFocused(r):this.onFocus()})}setFocused(e){this.focused=e,e&&this.onFocus()}onFocus(){this.listeners.forEach(e=>{e()})}isFocused(){return typeof this.focused=="boolean"?this.focused:typeof document>"u"?!0:[void 0,"visible","prerender"].includes(document.visibilityState)}}const Ze=new ka;class xa extends Ee{constructor(){super(),this.setup=e=>{if(!xe&&window.addEventListener){const n=()=>e();return window.addEventListener("online",n,!1),window.addEventListener("offline",n,!1),()=>{window.removeEventListener("online",n),window.removeEventListener("offline",n)}}}}onSubscribe(){this.cleanup||this.setEventListener(this.setup)}onUnsubscribe(){if(!this.hasListeners()){var e;(e=this.cleanup)==null||e.call(this),this.cleanup=void 0}}setEventListener(e){var n;this.setup=e,(n=this.cleanup)==null||n.call(this),this.cleanup=e(r=>{typeof r=="boolean"?this.setOnline(r):this.onOnline()})}setOnline(e){this.online=e,e&&this.onOnline()}onOnline(){this.listeners.forEach(e=>{e()})}isOnline(){return typeof this.online=="boolean"?this.online:typeof navigator>"u"||typeof navigator.onLine>"u"?!0:navigator.onLine}}const et=new xa;function Sa(t){return Math.min(1e3*2**t,3e4)}function ot(t){return(t??"online")==="online"?et.isOnline():!0}class ur{constructor(e){this.revert=e?.revert,this.silent=e?.silent}}function Be(t){return t instanceof ur}function cr(t){let e=!1,n=0,r=!1,a,i,s;const o=new Promise((v,S)=>{i=v,s=S}),l=v=>{r||(h(new ur(v)),t.abort==null||t.abort())},c=()=>{e=!0},u=()=>{e=!1},f=()=>!Ze.isFocused()||t.networkMode!=="always"&&!et.isOnline(),d=v=>{r||(r=!0,t.onSuccess==null||t.onSuccess(v),a?.(),i(v))},h=v=>{r||(r=!0,t.onError==null||t.onError(v),a?.(),s(v))},g=()=>new Promise(v=>{a=S=>{const O=r||!f();return O&&v(S),O},t.onPause==null||t.onPause()}).then(()=>{a=void 0,r||t.onContinue==null||t.onContinue()}),y=()=>{if(r)return;let v;try{v=t.fn()}catch(S){v=Promise.reject(S)}Promise.resolve(v).then(d).catch(S=>{var O,b;if(r)return;const C=(O=t.retry)!=null?O:3,A=(b=t.retryDelay)!=null?b:Sa,k=typeof A=="function"?A(n,S):A,w=C===!0||typeof C=="number"&&n<C||typeof C=="function"&&C(n,S);if(e||!w){h(S);return}n++,t.onFail==null||t.onFail(n,S),lr(k).then(()=>{if(f())return g()}).then(()=>{e?h(S):y()})})};return ot(t.networkMode)?y():g().then(y),{promise:o,cancel:l,continue:()=>a?.()?o:Promise.resolve(),cancelRetry:c,continueRetry:u}}const Ut=console;function Oa(){let t=[],e=0,n=u=>{u()},r=u=>{u()};const a=u=>{let f;e++;try{f=u()}finally{e--,e||o()}return f},i=u=>{e?t.push(u):yn(()=>{n(u)})},s=u=>(...f)=>{i(()=>{u(...f)})},o=()=>{const u=t;t=[],u.length&&yn(()=>{r(()=>{u.forEach(f=>{n(f)})})})};return{batch:a,batchCalls:s,schedule:i,setNotifyFunction:u=>{n=u},setBatchNotifyFunction:u=>{r=u}}}const F=Oa();class fr{destroy(){this.clearGcTimeout()}scheduleGc(){this.clearGcTimeout(),St(this.cacheTime)&&(this.gcTimeout=setTimeout(()=>{this.optionalRemove()},this.cacheTime))}updateCacheTime(e){this.cacheTime=Math.max(this.cacheTime||0,e??(xe?1/0:5*60*1e3))}clearGcTimeout(){this.gcTimeout&&(clearTimeout(this.gcTimeout),this.gcTimeout=void 0)}}class Aa extends fr{constructor(e){super(),this.abortSignalConsumed=!1,this.defaultOptions=e.defaultOptions,this.setOptions(e.options),this.observers=[],this.cache=e.cache,this.logger=e.logger||Ut,this.queryKey=e.queryKey,this.queryHash=e.queryHash,this.initialState=e.state||Ca(this.options),this.state=this.initialState,this.scheduleGc()}get meta(){return this.options.meta}setOptions(e){this.options={...this.defaultOptions,...e},this.updateCacheTime(this.options.cacheTime)}optionalRemove(){!this.observers.length&&this.state.fetchStatus==="idle"&&this.cache.remove(this)}setData(e,n){const r=At(this.state.data,e,this.options);return this.dispatch({data:r,type:"success",dataUpdatedAt:n?.updatedAt,manual:n?.manual}),r}setState(e,n){this.dispatch({type:"setState",state:e,setStateOptions:n})}cancel(e){var n;const r=this.promise;return(n=this.retryer)==null||n.cancel(e),r?r.then(q).catch(q):Promise.resolve()}destroy(){super.destroy(),this.cancel({silent:!0})}reset(){this.destroy(),this.setState(this.initialState)}isActive(){return this.observers.some(e=>e.options.enabled!==!1)}isDisabled(){return this.getObserversCount()>0&&!this.isActive()}isStale(){return this.state.isInvalidated||!this.state.dataUpdatedAt||this.observers.some(e=>e.getCurrentResult().isStale)}isStaleByTime(e=0){return this.state.isInvalidated||!this.state.dataUpdatedAt||!ir(this.state.dataUpdatedAt,e)}onFocus(){var e;const n=this.observers.find(r=>r.shouldFetchOnWindowFocus());n&&n.refetch({cancelRefetch:!1}),(e=this.retryer)==null||e.continue()}onOnline(){var e;const n=this.observers.find(r=>r.shouldFetchOnReconnect());n&&n.refetch({cancelRefetch:!1}),(e=this.retryer)==null||e.continue()}addObserver(e){this.observers.indexOf(e)===-1&&(this.observers.push(e),this.clearGcTimeout(),this.cache.notify({type:"observerAdded",query:this,observer:e}))}removeObserver(e){this.observers.indexOf(e)!==-1&&(this.observers=this.observers.filter(n=>n!==e),this.observers.length||(this.retryer&&(this.abortSignalConsumed?this.retryer.cancel({revert:!0}):this.retryer.cancelRetry()),this.scheduleGc()),this.cache.notify({type:"observerRemoved",query:this,observer:e}))}getObserversCount(){return this.observers.length}invalidate(){this.state.isInvalidated||this.dispatch({type:"invalidate"})}fetch(e,n){var r,a;if(this.state.fetchStatus!=="idle"){if(this.state.dataUpdatedAt&&n!=null&&n.cancelRefetch)this.cancel({silent:!0});else if(this.promise){var i;return(i=this.retryer)==null||i.continueRetry(),this.promise}}if(e&&this.setOptions(e),!this.options.queryFn){const h=this.observers.find(g=>g.options.queryFn);h&&this.setOptions(h.options)}Array.isArray(this.options.queryKey);const s=wa(),o={queryKey:this.queryKey,pageParam:void 0,meta:this.meta},l=h=>{Object.defineProperty(h,"signal",{enumerable:!0,get:()=>{if(s)return this.abortSignalConsumed=!0,s.signal}})};l(o);const c=()=>this.options.queryFn?(this.abortSignalConsumed=!1,this.options.queryFn(o)):Promise.reject("Missing queryFn"),u={fetchOptions:n,options:this.options,queryKey:this.queryKey,state:this.state,fetchFn:c};if(l(u),(r=this.options.behavior)==null||r.onFetch(u),this.revertState=this.state,this.state.fetchStatus==="idle"||this.state.fetchMeta!==((a=u.fetchOptions)==null?void 0:a.meta)){var f;this.dispatch({type:"fetch",meta:(f=u.fetchOptions)==null?void 0:f.meta})}const d=h=>{if(Be(h)&&h.silent||this.dispatch({type:"error",error:h}),!Be(h)){var g,y,v,S;(g=(y=this.cache.config).onError)==null||g.call(y,h,this),(v=(S=this.cache.config).onSettled)==null||v.call(S,this.state.data,h,this)}this.isFetchingOptimistic||this.scheduleGc(),this.isFetchingOptimistic=!1};return this.retryer=cr({fn:u.fetchFn,abort:s?.abort.bind(s),onSuccess:h=>{var g,y,v,S;if(typeof h>"u"){d(new Error("undefined"));return}this.setData(h),(g=(y=this.cache.config).onSuccess)==null||g.call(y,h,this),(v=(S=this.cache.config).onSettled)==null||v.call(S,h,this.state.error,this),this.isFetchingOptimistic||this.scheduleGc(),this.isFetchingOptimistic=!1},onError:d,onFail:(h,g)=>{this.dispatch({type:"failed",failureCount:h,error:g})},onPause:()=>{this.dispatch({type:"pause"})},onContinue:()=>{this.dispatch({type:"continue"})},retry:u.options.retry,retryDelay:u.options.retryDelay,networkMode:u.options.networkMode}),this.promise=this.retryer.promise,this.promise}dispatch(e){const n=r=>{var a,i;switch(e.type){case"failed":return{...r,fetchFailureCount:e.failureCount,fetchFailureReason:e.error};case"pause":return{...r,fetchStatus:"paused"};case"continue":return{...r,fetchStatus:"fetching"};case"fetch":return{...r,fetchFailureCount:0,fetchFailureReason:null,fetchMeta:(a=e.meta)!=null?a:null,fetchStatus:ot(this.options.networkMode)?"fetching":"paused",...!r.dataUpdatedAt&&{error:null,status:"loading"}};case"success":return{...r,data:e.data,dataUpdateCount:r.dataUpdateCount+1,dataUpdatedAt:(i=e.dataUpdatedAt)!=null?i:Date.now(),error:null,isInvalidated:!1,status:"success",...!e.manual&&{fetchStatus:"idle",fetchFailureCount:0,fetchFailureReason:null}};case"error":const s=e.error;return Be(s)&&s.revert&&this.revertState?{...this.revertState}:{...r,error:s,errorUpdateCount:r.errorUpdateCount+1,errorUpdatedAt:Date.now(),fetchFailureCount:r.fetchFailureCount+1,fetchFailureReason:s,fetchStatus:"idle",status:"error"};case"invalidate":return{...r,isInvalidated:!0};case"setState":return{...r,...e.state}}};this.state=n(this.state),F.batch(()=>{this.observers.forEach(r=>{r.onQueryUpdate(e)}),this.cache.notify({query:this,type:"updated",action:e})})}}function Ca(t){const e=typeof t.initialData=="function"?t.initialData():t.initialData,n=typeof e<"u",r=n?typeof t.initialDataUpdatedAt=="function"?t.initialDataUpdatedAt():t.initialDataUpdatedAt:0;return{data:e,dataUpdateCount:0,dataUpdatedAt:n?r??Date.now():0,error:null,errorUpdateCount:0,errorUpdatedAt:0,fetchFailureCount:0,fetchFailureReason:null,fetchMeta:null,isInvalidated:!1,status:n?"success":"loading",fetchStatus:"idle"}}class Pa extends Ee{constructor(e){super(),this.config=e||{},this.queries=[],this.queriesMap={}}build(e,n,r){var a;const i=n.queryKey,s=(a=n.queryHash)!=null?a:jt(i,n);let o=this.get(s);return o||(o=new Aa({cache:this,logger:e.getLogger(),queryKey:i,queryHash:s,options:e.defaultQueryOptions(n),state:r,defaultOptions:e.getQueryDefaults(i)}),this.add(o)),o}add(e){this.queriesMap[e.queryHash]||(this.queriesMap[e.queryHash]=e,this.queries.push(e),this.notify({type:"added",query:e}))}remove(e){const n=this.queriesMap[e.queryHash];n&&(e.destroy(),this.queries=this.queries.filter(r=>r!==e),n===e&&delete this.queriesMap[e.queryHash],this.notify({type:"removed",query:e}))}clear(){F.batch(()=>{this.queries.forEach(e=>{this.remove(e)})})}get(e){return this.queriesMap[e]}getAll(){return this.queries}find(e,n){const[r]=J(e,n);return typeof r.exact>"u"&&(r.exact=!0),this.queries.find(a=>hn(r,a))}findAll(e,n){const[r]=J(e,n);return Object.keys(r).length>0?this.queries.filter(a=>hn(r,a)):this.queries}notify(e){F.batch(()=>{this.listeners.forEach(n=>{n(e)})})}onFocus(){F.batch(()=>{this.queries.forEach(e=>{e.onFocus()})})}onOnline(){F.batch(()=>{this.queries.forEach(e=>{e.onOnline()})})}}class _a extends fr{constructor(e){super(),this.defaultOptions=e.defaultOptions,this.mutationId=e.mutationId,this.mutationCache=e.mutationCache,this.logger=e.logger||Ut,this.observers=[],this.state=e.state||Ea(),this.setOptions(e.options),this.scheduleGc()}setOptions(e){this.options={...this.defaultOptions,...e},this.updateCacheTime(this.options.cacheTime)}get meta(){return this.options.meta}setState(e){this.dispatch({type:"setState",state:e})}addObserver(e){this.observers.indexOf(e)===-1&&(this.observers.push(e),this.clearGcTimeout(),this.mutationCache.notify({type:"observerAdded",mutation:this,observer:e}))}removeObserver(e){this.observers=this.observers.filter(n=>n!==e),this.scheduleGc(),this.mutationCache.notify({type:"observerRemoved",mutation:this,observer:e})}optionalRemove(){this.observers.length||(this.state.status==="loading"?this.scheduleGc():this.mutationCache.remove(this))}continue(){var e,n;return(e=(n=this.retryer)==null?void 0:n.continue())!=null?e:this.execute()}async execute(){const e=()=>{var w;return this.retryer=cr({fn:()=>this.options.mutationFn?this.options.mutationFn(this.state.variables):Promise.reject("No mutationFn found"),onFail:(x,_)=>{this.dispatch({type:"failed",failureCount:x,error:_})},onPause:()=>{this.dispatch({type:"pause"})},onContinue:()=>{this.dispatch({type:"continue"})},retry:(w=this.options.retry)!=null?w:0,retryDelay:this.options.retryDelay,networkMode:this.options.networkMode}),this.retryer.promise},n=this.state.status==="loading";try{var r,a,i,s,o,l,c,u;if(!n){var f,d,h,g;this.dispatch({type:"loading",variables:this.options.variables}),await((f=(d=this.mutationCache.config).onMutate)==null?void 0:f.call(d,this.state.variables,this));const x=await((h=(g=this.options).onMutate)==null?void 0:h.call(g,this.state.variables));x!==this.state.context&&this.dispatch({type:"loading",context:x,variables:this.state.variables})}const w=await e();return await((r=(a=this.mutationCache.config).onSuccess)==null?void 0:r.call(a,w,this.state.variables,this.state.context,this)),await((i=(s=this.options).onSuccess)==null?void 0:i.call(s,w,this.state.variables,this.state.context)),await((o=(l=this.mutationCache.config).onSettled)==null?void 0:o.call(l,w,null,this.state.variables,this.state.context,this)),await((c=(u=this.options).onSettled)==null?void 0:c.call(u,w,null,this.state.variables,this.state.context)),this.dispatch({type:"success",data:w}),w}catch(w){try{var y,v,S,O,b,C,A,k;throw await((y=(v=this.mutationCache.config).onError)==null?void 0:y.call(v,w,this.state.variables,this.state.context,this)),await((S=(O=this.options).onError)==null?void 0:S.call(O,w,this.state.variables,this.state.context)),await((b=(C=this.mutationCache.config).onSettled)==null?void 0:b.call(C,void 0,w,this.state.variables,this.state.context,this)),await((A=(k=this.options).onSettled)==null?void 0:A.call(k,void 0,w,this.state.variables,this.state.context)),w}finally{this.dispatch({type:"error",error:w})}}}dispatch(e){const n=r=>{switch(e.type){case"failed":return{...r,failureCount:e.failureCount,failureReason:e.error};case"pause":return{...r,isPaused:!0};case"continue":return{...r,isPaused:!1};case"loading":return{...r,context:e.context,data:void 0,failureCount:0,failureReason:null,error:null,isPaused:!ot(this.options.networkMode),status:"loading",variables:e.variables};case"success":return{...r,data:e.data,failureCount:0,failureReason:null,error:null,status:"success",isPaused:!1};case"error":return{...r,data:void 0,error:e.error,failureCount:r.failureCount+1,failureReason:e.error,isPaused:!1,status:"error"};case"setState":return{...r,...e.state}}};this.state=n(this.state),F.batch(()=>{this.observers.forEach(r=>{r.onMutationUpdate(e)}),this.mutationCache.notify({mutation:this,type:"updated",action:e})})}}function Ea(){return{context:void 0,data:void 0,error:null,failureCount:0,failureReason:null,isPaused:!1,status:"idle",variables:void 0}}class Ra extends Ee{constructor(e){super(),this.config=e||{},this.mutations=[],this.mutationId=0}build(e,n,r){const a=new _a({mutationCache:this,logger:e.getLogger(),mutationId:++this.mutationId,options:e.defaultMutationOptions(n),state:r,defaultOptions:n.mutationKey?e.getMutationDefaults(n.mutationKey):void 0});return this.add(a),a}add(e){this.mutations.push(e),this.notify({type:"added",mutation:e})}remove(e){this.mutations=this.mutations.filter(n=>n!==e),this.notify({type:"removed",mutation:e})}clear(){F.batch(()=>{this.mutations.forEach(e=>{this.remove(e)})})}getAll(){return this.mutations}find(e){return typeof e.exact>"u"&&(e.exact=!0),this.mutations.find(n=>mn(e,n))}findAll(e){return this.mutations.filter(n=>mn(e,n))}notify(e){F.batch(()=>{this.listeners.forEach(n=>{n(e)})})}resumePausedMutations(){var e;return this.resuming=((e=this.resuming)!=null?e:Promise.resolve()).then(()=>{const n=this.mutations.filter(r=>r.state.isPaused);return F.batch(()=>n.reduce((r,a)=>r.then(()=>a.continue().catch(q)),Promise.resolve()))}).then(()=>{this.resuming=void 0}),this.resuming}}function Ia(){return{onFetch:t=>{t.fetchFn=()=>{var e,n,r,a,i,s;const o=(e=t.fetchOptions)==null||(n=e.meta)==null?void 0:n.refetchPage,l=(r=t.fetchOptions)==null||(a=r.meta)==null?void 0:a.fetchMore,c=l?.pageParam,u=l?.direction==="forward",f=l?.direction==="backward",d=((i=t.state.data)==null?void 0:i.pages)||[],h=((s=t.state.data)==null?void 0:s.pageParams)||[];let g=h,y=!1;const v=k=>{Object.defineProperty(k,"signal",{enumerable:!0,get:()=>{var w;if((w=t.signal)!=null&&w.aborted)y=!0;else{var x;(x=t.signal)==null||x.addEventListener("abort",()=>{y=!0})}return t.signal}})},S=t.options.queryFn||(()=>Promise.reject("Missing queryFn")),O=(k,w,x,_)=>(g=_?[w,...g]:[...g,w],_?[x,...k]:[...k,x]),b=(k,w,x,_)=>{if(y)return Promise.reject("Cancelled");if(typeof x>"u"&&!w&&k.length)return Promise.resolve(k);const M={queryKey:t.queryKey,pageParam:x,meta:t.options.meta};v(M);const ce=S(M);return Promise.resolve(ce).then(ht=>O(k,x,ht,_))};let C;if(!d.length)C=b([]);else if(u){const k=typeof c<"u",w=k?c:bn(t.options,d);C=b(d,k,w)}else if(f){const k=typeof c<"u",w=k?c:Ta(t.options,d);C=b(d,k,w,!0)}else{g=[];const k=typeof t.options.getNextPageParam>"u";C=(o&&d[0]?o(d[0],0,d):!0)?b([],k,h[0]):Promise.resolve(O([],h[0],d[0]));for(let x=1;x<d.length;x++)C=C.then(_=>{if(o&&d[x]?o(d[x],x,d):!0){const ce=k?h[x]:bn(t.options,_);return b(_,k,ce)}return Promise.resolve(O(_,h[x],d[x]))})}return C.then(k=>({pages:k,pageParams:g}))}}}}function bn(t,e){return t.getNextPageParam==null?void 0:t.getNextPageParam(e[e.length-1],e)}function Ta(t,e){return t.getPreviousPageParam==null?void 0:t.getPreviousPageParam(e[0],e)}class Fa{constructor(e={}){this.queryCache=e.queryCache||new Pa,this.mutationCache=e.mutationCache||new Ra,this.logger=e.logger||Ut,this.defaultOptions=e.defaultOptions||{},this.queryDefaults=[],this.mutationDefaults=[],this.mountCount=0}mount(){this.mountCount++,this.mountCount===1&&(this.unsubscribeFocus=Ze.subscribe(()=>{Ze.isFocused()&&(this.resumePausedMutations(),this.queryCache.onFocus())}),this.unsubscribeOnline=et.subscribe(()=>{et.isOnline()&&(this.resumePausedMutations(),this.queryCache.onOnline())}))}unmount(){var e,n;this.mountCount--,this.mountCount===0&&((e=this.unsubscribeFocus)==null||e.call(this),this.unsubscribeFocus=void 0,(n=this.unsubscribeOnline)==null||n.call(this),this.unsubscribeOnline=void 0)}isFetching(e,n){const[r]=J(e,n);return r.fetchStatus="fetching",this.queryCache.findAll(r).length}isMutating(e){return this.mutationCache.findAll({...e,fetching:!0}).length}getQueryData(e,n){var r;return(r=this.queryCache.find(e,n))==null?void 0:r.state.data}ensureQueryData(e,n,r){const a=De(e,n,r),i=this.getQueryData(a.queryKey);return i?Promise.resolve(i):this.fetchQuery(a)}getQueriesData(e){return this.getQueryCache().findAll(e).map(({queryKey:n,state:r})=>{const a=r.data;return[n,a]})}setQueryData(e,n,r){const a=this.queryCache.find(e),i=a?.state.data,s=ba(n,i);if(typeof s>"u")return;const o=De(e),l=this.defaultQueryOptions(o);return this.queryCache.build(this,l).setData(s,{...r,manual:!0})}setQueriesData(e,n,r){return F.batch(()=>this.getQueryCache().findAll(e).map(({queryKey:a})=>[a,this.setQueryData(a,n,r)]))}getQueryState(e,n){var r;return(r=this.queryCache.find(e,n))==null?void 0:r.state}removeQueries(e,n){const[r]=J(e,n),a=this.queryCache;F.batch(()=>{a.findAll(r).forEach(i=>{a.remove(i)})})}resetQueries(e,n,r){const[a,i]=J(e,n,r),s=this.queryCache,o={type:"active",...a};return F.batch(()=>(s.findAll(a).forEach(l=>{l.reset()}),this.refetchQueries(o,i)))}cancelQueries(e,n,r){const[a,i={}]=J(e,n,r);typeof i.revert>"u"&&(i.revert=!0);const s=F.batch(()=>this.queryCache.findAll(a).map(o=>o.cancel(i)));return Promise.all(s).then(q).catch(q)}invalidateQueries(e,n,r){const[a,i]=J(e,n,r);return F.batch(()=>{var s,o;if(this.queryCache.findAll(a).forEach(c=>{c.invalidate()}),a.refetchType==="none")return Promise.resolve();const l={...a,type:(s=(o=a.refetchType)!=null?o:a.type)!=null?s:"active"};return this.refetchQueries(l,i)})}refetchQueries(e,n,r){const[a,i]=J(e,n,r),s=F.batch(()=>this.queryCache.findAll(a).filter(l=>!l.isDisabled()).map(l=>{var c;return l.fetch(void 0,{...i,cancelRefetch:(c=i?.cancelRefetch)!=null?c:!0,meta:{refetchPage:a.refetchPage}})}));let o=Promise.all(s).then(q);return i!=null&&i.throwOnError||(o=o.catch(q)),o}fetchQuery(e,n,r){const a=De(e,n,r),i=this.defaultQueryOptions(a);typeof i.retry>"u"&&(i.retry=!1);const s=this.queryCache.build(this,i);return s.isStaleByTime(i.staleTime)?s.fetch(i):Promise.resolve(s.state.data)}prefetchQuery(e,n,r){return this.fetchQuery(e,n,r).then(q).catch(q)}fetchInfiniteQuery(e,n,r){const a=De(e,n,r);return a.behavior=Ia(),this.fetchQuery(a)}prefetchInfiniteQuery(e,n,r){return this.fetchInfiniteQuery(e,n,r).then(q).catch(q)}resumePausedMutations(){return this.mutationCache.resumePausedMutations()}getQueryCache(){return this.queryCache}getMutationCache(){return this.mutationCache}getLogger(){return this.logger}getDefaultOptions(){return this.defaultOptions}setDefaultOptions(e){this.defaultOptions=e}setQueryDefaults(e,n){const r=this.queryDefaults.find(a=>ae(e)===ae(a.queryKey));r?r.defaultOptions=n:this.queryDefaults.push({queryKey:e,defaultOptions:n})}getQueryDefaults(e){if(!e)return;const n=this.queryDefaults.find(r=>Je(e,r.queryKey));return n?.defaultOptions}setMutationDefaults(e,n){const r=this.mutationDefaults.find(a=>ae(e)===ae(a.mutationKey));r?r.defaultOptions=n:this.mutationDefaults.push({mutationKey:e,defaultOptions:n})}getMutationDefaults(e){if(!e)return;const n=this.mutationDefaults.find(r=>Je(e,r.mutationKey));return n?.defaultOptions}defaultQueryOptions(e){if(e!=null&&e._defaulted)return e;const n={...this.defaultOptions.queries,...this.getQueryDefaults(e?.queryKey),...e,_defaulted:!0};return!n.queryHash&&n.queryKey&&(n.queryHash=jt(n.queryKey,n)),typeof n.refetchOnReconnect>"u"&&(n.refetchOnReconnect=n.networkMode!=="always"),typeof n.useErrorBoundary>"u"&&(n.useErrorBoundary=!!n.suspense),n}defaultMutationOptions(e){return e!=null&&e._defaulted?e:{...this.defaultOptions.mutations,...this.getMutationDefaults(e?.mutationKey),...e,_defaulted:!0}}clear(){this.queryCache.clear(),this.mutationCache.clear()}}class Ma extends Ee{constructor(e,n){super(),this.client=e,this.options=n,this.trackedProps=new Set,this.selectError=null,this.bindMethods(),this.setOptions(n)}bindMethods(){this.remove=this.remove.bind(this),this.refetch=this.refetch.bind(this)}onSubscribe(){this.listeners.length===1&&(this.currentQuery.addObserver(this),wn(this.currentQuery,this.options)&&this.executeFetch(),this.updateTimers())}onUnsubscribe(){this.listeners.length||this.destroy()}shouldFetchOnReconnect(){return Ct(this.currentQuery,this.options,this.options.refetchOnReconnect)}shouldFetchOnWindowFocus(){return Ct(this.currentQuery,this.options,this.options.refetchOnWindowFocus)}destroy(){this.listeners=[],this.clearStaleTimeout(),this.clearRefetchInterval(),this.currentQuery.removeObserver(this)}setOptions(e,n){const r=this.options,a=this.currentQuery;if(this.options=this.client.defaultQueryOptions(e),pn(r,this.options)||this.client.getQueryCache().notify({type:"observerOptionsUpdated",query:this.currentQuery,observer:this}),typeof this.options.enabled<"u"&&typeof this.options.enabled!="boolean")throw new Error("Expected enabled to be a boolean");this.options.queryKey||(this.options.queryKey=r.queryKey),this.updateQuery();const i=this.hasListeners();i&&kn(this.currentQuery,a,this.options,r)&&this.executeFetch(),this.updateResult(n),i&&(this.currentQuery!==a||this.options.enabled!==r.enabled||this.options.staleTime!==r.staleTime)&&this.updateStaleTimeout();const s=this.computeRefetchInterval();i&&(this.currentQuery!==a||this.options.enabled!==r.enabled||s!==this.currentRefetchInterval)&&this.updateRefetchInterval(s)}getOptimisticResult(e){const n=this.client.getQueryCache().build(this.client,e);return this.createResult(n,e)}getCurrentResult(){return this.currentResult}trackResult(e){const n={};return Object.keys(e).forEach(r=>{Object.defineProperty(n,r,{configurable:!1,enumerable:!0,get:()=>(this.trackedProps.add(r),e[r])})}),n}getCurrentQuery(){return this.currentQuery}remove(){this.client.getQueryCache().remove(this.currentQuery)}refetch({refetchPage:e,...n}={}){return this.fetch({...n,meta:{refetchPage:e}})}fetchOptimistic(e){const n=this.client.defaultQueryOptions(e),r=this.client.getQueryCache().build(this.client,n);return r.isFetchingOptimistic=!0,r.fetch().then(()=>this.createResult(r,n))}fetch(e){var n;return this.executeFetch({...e,cancelRefetch:(n=e.cancelRefetch)!=null?n:!0}).then(()=>(this.updateResult(),this.currentResult))}executeFetch(e){this.updateQuery();let n=this.currentQuery.fetch(this.options,e);return e!=null&&e.throwOnError||(n=n.catch(q)),n}updateStaleTimeout(){if(this.clearStaleTimeout(),xe||this.currentResult.isStale||!St(this.options.staleTime))return;const n=ir(this.currentResult.dataUpdatedAt,this.options.staleTime)+1;this.staleTimeoutId=setTimeout(()=>{this.currentResult.isStale||this.updateResult()},n)}computeRefetchInterval(){var e;return typeof this.options.refetchInterval=="function"?this.options.refetchInterval(this.currentResult.data,this.currentQuery):(e=this.options.refetchInterval)!=null?e:!1}updateRefetchInterval(e){this.clearRefetchInterval(),this.currentRefetchInterval=e,!(xe||this.options.enabled===!1||!St(this.currentRefetchInterval)||this.currentRefetchInterval===0)&&(this.refetchIntervalId=setInterval(()=>{(this.options.refetchIntervalInBackground||Ze.isFocused())&&this.executeFetch()},this.currentRefetchInterval))}updateTimers(){this.updateStaleTimeout(),this.updateRefetchInterval(this.computeRefetchInterval())}clearStaleTimeout(){this.staleTimeoutId&&(clearTimeout(this.staleTimeoutId),this.staleTimeoutId=void 0)}clearRefetchInterval(){this.refetchIntervalId&&(clearInterval(this.refetchIntervalId),this.refetchIntervalId=void 0)}createResult(e,n){const r=this.currentQuery,a=this.options,i=this.currentResult,s=this.currentResultState,o=this.currentResultOptions,l=e!==r,c=l?e.state:this.currentQueryInitialState,u=l?this.currentResult:this.previousQueryResult,{state:f}=e;let{dataUpdatedAt:d,error:h,errorUpdatedAt:g,fetchStatus:y,status:v}=f,S=!1,O=!1,b;if(n._optimisticResults){const x=this.hasListeners(),_=!x&&wn(e,n),M=x&&kn(e,r,n,a);(_||M)&&(y=ot(e.options.networkMode)?"fetching":"paused",d||(v="loading")),n._optimisticResults==="isRestoring"&&(y="idle")}if(n.keepPreviousData&&!f.dataUpdatedAt&&u!=null&&u.isSuccess&&v!=="error")b=u.data,d=u.dataUpdatedAt,v=u.status,S=!0;else if(n.select&&typeof f.data<"u")if(i&&f.data===s?.data&&n.select===this.selectFn)b=this.selectResult;else try{this.selectFn=n.select,b=n.select(f.data),b=At(i?.data,b,n),this.selectResult=b,this.selectError=null}catch(x){this.selectError=x}else b=f.data;if(typeof n.placeholderData<"u"&&typeof b>"u"&&v==="loading"){let x;if(i!=null&&i.isPlaceholderData&&n.placeholderData===o?.placeholderData)x=i.data;else if(x=typeof n.placeholderData=="function"?n.placeholderData():n.placeholderData,n.select&&typeof x<"u")try{x=n.select(x),this.selectError=null}catch(_){this.selectError=_}typeof x<"u"&&(v="success",b=At(i?.data,x,n),O=!0)}this.selectError&&(h=this.selectError,b=this.selectResult,g=Date.now(),v="error");const C=y==="fetching",A=v==="loading",k=v==="error";return{status:v,fetchStatus:y,isLoading:A,isSuccess:v==="success",isError:k,isInitialLoading:A&&C,data:b,dataUpdatedAt:d,error:h,errorUpdatedAt:g,failureCount:f.fetchFailureCount,failureReason:f.fetchFailureReason,errorUpdateCount:f.errorUpdateCount,isFetched:f.dataUpdateCount>0||f.errorUpdateCount>0,isFetchedAfterMount:f.dataUpdateCount>c.dataUpdateCount||f.errorUpdateCount>c.errorUpdateCount,isFetching:C,isRefetching:C&&!A,isLoadingError:k&&f.dataUpdatedAt===0,isPaused:y==="paused",isPlaceholderData:O,isPreviousData:S,isRefetchError:k&&f.dataUpdatedAt!==0,isStale:zt(e,n),refetch:this.refetch,remove:this.remove}}updateResult(e){const n=this.currentResult,r=this.createResult(this.currentQuery,this.options);if(this.currentResultState=this.currentQuery.state,this.currentResultOptions=this.options,pn(r,n))return;this.currentResult=r;const a={cache:!0},i=()=>{if(!n)return!0;const{notifyOnChangeProps:s}=this.options;if(s==="all"||!s&&!this.trackedProps.size)return!0;const o=new Set(s??this.trackedProps);return this.options.useErrorBoundary&&o.add("error"),Object.keys(this.currentResult).some(l=>{const c=l;return this.currentResult[c]!==n[c]&&o.has(c)})};e?.listeners!==!1&&i()&&(a.listeners=!0),this.notify({...a,...e})}updateQuery(){const e=this.client.getQueryCache().build(this.client,this.options);if(e===this.currentQuery)return;const n=this.currentQuery;this.currentQuery=e,this.currentQueryInitialState=e.state,this.previousQueryResult=this.currentResult,this.hasListeners()&&(n?.removeObserver(this),e.addObserver(this))}onQueryUpdate(e){const n={};e.type==="success"?n.onSuccess=!e.manual:e.type==="error"&&!Be(e.error)&&(n.onError=!0),this.updateResult(n),this.hasListeners()&&this.updateTimers()}notify(e){F.batch(()=>{if(e.onSuccess){var n,r,a,i;(n=(r=this.options).onSuccess)==null||n.call(r,this.currentResult.data),(a=(i=this.options).onSettled)==null||a.call(i,this.currentResult.data,null)}else if(e.onError){var s,o,l,c;(s=(o=this.options).onError)==null||s.call(o,this.currentResult.error),(l=(c=this.options).onSettled)==null||l.call(c,void 0,this.currentResult.error)}e.listeners&&this.listeners.forEach(u=>{u(this.currentResult)}),e.cache&&this.client.getQueryCache().notify({query:this.currentQuery,type:"observerResultsUpdated"})})}}function $a(t,e){return e.enabled!==!1&&!t.state.dataUpdatedAt&&!(t.state.status==="error"&&e.retryOnMount===!1)}function wn(t,e){return $a(t,e)||t.state.dataUpdatedAt>0&&Ct(t,e,e.refetchOnMount)}function Ct(t,e,n){if(e.enabled!==!1){const r=typeof n=="function"?n(t):n;return r==="always"||r!==!1&&zt(t,e)}return!1}function kn(t,e,n,r){return n.enabled!==!1&&(t!==e||r.enabled===!1)&&(!n.suspense||t.state.status!=="error")&&zt(t,n)}function zt(t,e){return t.isStaleByTime(e.staleTime)}const Pt=Symbol("store-raw"),Se=Symbol("store-node"),Da=Symbol("store-name");function dr(t,e){let n=t[oe];if(!n&&(Object.defineProperty(t,oe,{value:n=new Proxy(t,qa)}),!Array.isArray(t))){const r=Object.keys(t),a=Object.getOwnPropertyDescriptors(t);for(let i=0,s=r.length;i<s;i++){const o=r[i];a[o].get&&Object.defineProperty(t,o,{enumerable:a[o].enumerable,get:a[o].get.bind(n)})}}return n}function tt(t){let e;return t!=null&&typeof t=="object"&&(t[oe]||!(e=Object.getPrototypeOf(t))||e===Object.prototype||Array.isArray(t))}function U(t,e=new Set){let n,r,a,i;if(n=t!=null&&t[Pt])return n;if(!tt(t)||e.has(t))return t;if(Array.isArray(t)){Object.isFrozen(t)?t=t.slice(0):e.add(t);for(let s=0,o=t.length;s<o;s++)a=t[s],(r=U(a,e))!==a&&(t[s]=r)}else{Object.isFrozen(t)?t=Object.assign({},t):e.add(t);const s=Object.keys(t),o=Object.getOwnPropertyDescriptors(t);for(let l=0,c=s.length;l<c;l++)i=s[l],!o[i].get&&(a=t[i],(r=U(a,e))!==a&&(t[i]=r))}return t}function Yt(t){let e=t[Se];return e||Object.defineProperty(t,Se,{value:e={}}),e}function _t(t,e,n){return t[e]||(t[e]=mr(n))}function Na(t,e){const n=Reflect.getOwnPropertyDescriptor(t,e);return!n||n.get||!n.configurable||e===oe||e===Se||e===Da||(delete n.value,delete n.writable,n.get=()=>t[oe][e]),n}function hr(t){if(Vn()){const e=Yt(t);(e._||(e._=mr()))()}}function La(t){return hr(t),Reflect.ownKeys(t)}function mr(t){const[e,n]=fe(t,{equals:!1,internal:!0});return e.$=n,e}const qa={get(t,e,n){if(e===Pt)return t;if(e===oe)return n;if(e===sn)return hr(t),n;const r=Yt(t),a=r.hasOwnProperty(e);let i=a?r[e]():t[e];if(e===Se||e==="__proto__")return i;if(!a){const s=Object.getOwnPropertyDescriptor(t,e);Vn()&&(typeof i!="function"||t.hasOwnProperty(e))&&!(s&&s.get)&&(i=_t(r,e,i)())}return tt(i)?dr(i):i},has(t,e){return e===Pt||e===oe||e===sn||e===Se||e==="__proto__"?!0:(this.get(t,e,t),e in t)},set(){return!0},deleteProperty(){return!0},ownKeys:La,getOwnPropertyDescriptor:Na};function nt(t,e,n,r=!1){if(!r&&t[e]===n)return;const a=t[e],i=t.length;n===void 0?delete t[e]:t[e]=n;let s=Yt(t),o;(o=_t(s,e,a))&&o.$(()=>n),Array.isArray(t)&&t.length!==i&&(o=_t(s,"length",i))&&o.$(t.length),(o=s._)&&o.$()}function pr(t,e){const n=Object.keys(e);for(let r=0;r<n.length;r+=1){const a=n[r];nt(t,a,e[a])}}function Qa(t,e){if(typeof e=="function"&&(e=e(t)),e=U(e),Array.isArray(e)){if(t===e)return;let n=0,r=e.length;for(;n<r;n++){const a=e[n];t[n]!==a&&nt(t,n,a)}nt(t,"length",r)}else pr(t,e)}function ye(t,e,n=[]){let r,a=t;if(e.length>1){r=e.shift();const s=typeof r,o=Array.isArray(t);if(Array.isArray(r)){for(let l=0;l<r.length;l++)ye(t,[r[l]].concat(e),n);return}else if(o&&s==="function"){for(let l=0;l<t.length;l++)r(t[l],l)&&ye(t,[l].concat(e),n);return}else if(o&&s==="object"){const{from:l=0,to:c=t.length-1,by:u=1}=r;for(let f=l;f<=c;f+=u)ye(t,[f].concat(e),n);return}else if(e.length>1){ye(t[r],e,[r].concat(n));return}a=t[r],n=[r].concat(n)}let i=e[0];typeof i=="function"&&(i=i(a,n),i===a)||r===void 0&&i==null||(i=U(i),r===void 0||tt(a)&&tt(i)&&!Array.isArray(i)?pr(a,i):nt(t,r,i))}function vr(...[t,e]){const n=U(t||{}),r=Array.isArray(n),a=dr(n);function i(...s){wt(()=>{r&&s.length===1?Qa(n,s[0]):ye(n,s)})}return[a,i]}function ja(t){return typeof t=="function"}function xn(t,e,n){if(!ja(t)){const{queryKey:r,...a}=t;return r?{...a,queryKey:r()}:t}return typeof e=="function"?{...n,queryKey:t(),queryFn:e}:{...e,queryKey:t()}}function Ua(t,e){return typeof t=="function"?t(...e):!!t}const Sn=er(void 0),gr=er(!1);function yr(t,e){return t||(e&&typeof window<"u"?(window.SolidQueryClientContext||(window.SolidQueryClientContext=Sn),window.SolidQueryClientContext):Sn)}const za=({context:t}={})=>{const e=on(yr(t,on(gr)));if(!e)throw new Error("No QueryClient set, use QueryClientProvider to set one");return e},Ya=t=>{const e=Jn({contextSharing:!1},t);Qt(()=>{e.client.mount()}),Zn(()=>e.client.unmount());const n=yr(e.context,e.contextSharing);return K(gr.Provider,{get value(){return!e.context&&e.contextSharing},get children(){return K(n.Provider,{get value(){return e.client},get children(){return e.children}})}})};function Ka(t,e){const n=za({context:t.context}),r=Symbol("empty"),a=n.defaultQueryOptions(t);a._optimisticResults="optimistic";const i=new e(n,a),[s,o]=vr(i.getOptimisticResult(a)),[l,{refetch:c,mutate:u}]=ia(()=>new Promise(g=>{s.isFetching&&s.isLoading||(U(s.data)===r&&g(void 0),g(U(s.data)))}));wt(()=>{u(()=>U(s.data)),c()});let f=[];const d=i.subscribe(g=>{f.push(()=>{wt(()=>{const y={...U(g)};y.data===void 0&&(y.data=r),o(U(y)),u(()=>U(g.data)),c()})}),queueMicrotask(()=>{const y=f.pop();y&&y(),f=[]})});Zn(()=>d()),Qt(()=>{i.setOptions(a,{listeners:!1})}),kt(()=>{const g=n.defaultQueryOptions(t);i.setOptions(g)}),kt(sa(()=>s.status,()=>{if(s.isError&&!s.isFetching&&Ua(i.options.useErrorBoundary,[s.error,i.getCurrentQuery()]))throw s.error}));const h={get(g,y){return y==="data"?l():Reflect.get(g,y)}};return new Proxy(s,h)}function On(t,e,n){const[r,a]=vr(xn(t,e,n));return kt(()=>{const i=xn(t,e,n);a(i)}),Ka(r,Ma)}const Ha=Q('<svg><path d="M248 8C111.1 8 0 119.1 0 256s111.1 248 248 248 248-111.1 248-248S384.9 8 248 8zm100.7 364.9c-4.2 0-6.8-1.3-10.7-3.6-62.4-37.6-135-39.2-206.7-24.5-3.9 1-9 2.6-11.9 2.6-9.7 0-15.8-7.7-15.8-15.8 0-10.3 6.1-15.2 13.6-16.8 81.9-18.1 165.6-16.5 237 26.2 6.1 3.9 9.7 7.4 9.7 16.5s-7.1 15.4-15.2 15.4zm26.9-65.6c-5.2 0-8.7-2.3-12.3-4.2-62.5-37-155.7-51.9-238.6-29.4-4.8 1.3-7.4 2.6-11.9 2.6-10.7 0-19.4-8.7-19.4-19.4s5.2-17.8 15.5-20.7c27.8-7.8 56.2-13.6 97.8-13.6 64.9 0 127.6 16.1 177 45.5 8.1 4.8 11.3 11 11.3 19.7-.1 10.8-8.5 19.5-19.4 19.5zm31-76.2c-5.2 0-8.4-1.3-12.9-3.9-71.2-42.5-198.5-52.7-280.9-29.7-3.6 1-8.1 2.6-12.9 2.6-13.2 0-23.3-10.3-23.3-23.6 0-13.6 8.4-21.3 17.4-23.9 35.2-10.3 74.6-15.2 117.5-15.2 73 0 149.5 15.2 205.4 47.8 7.8 4.5 12.9 10.7 12.9 22.6 0 13.6-11 23.3-23.2 23.3z"></path></svg>',4),We=t=>[Z(()=>oa()),"<!>",(()=>{const e=D(Ha);return la(e,Jn(t,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 496 512"}),!0,!0),Ve(),e})()],Ba=Q('<div class="relative col-span-12 h-full grid-cols-1 px-6"><!#><!/><!#><!/></div>',6),Wa=Q("<span>Loading your playlists...</span>",2),Ga=Q('<span class="block text-center">Select the playlists you want to search for duplicate songs:</span>',2),Xa=Q('<div class="relative flex flex-col gap-4 py-4" role="group"><div tabindex="0" role="checkbox" class="flex h-24 w-full cursor-pointer items-center rounded-lg border bg-green-100 text-lg font-semibold focus-within:border-4 focus-within:border-green-600 hover:bg-green-300 aria-checked:bg-green-600 aria-checked:text-white"><div class="block aspect-square h-full bg-black p-4 [&amp;>svg]:h-fit [&amp;>svg]:fill-green-600"></div><span class="block flex-grow text-center p-4">All Playlists<!#><!/></span></div><div tabindex="0" role="checkbox" class="flex h-24 w-full cursor-pointer items-center rounded-lg border bg-green-100 text-lg font-semibold focus-within:border-4 focus-within:border-green-600 hover:bg-green-300 aria-checked:bg-green-600 aria-checked:text-white"><div class="block aspect-square h-full bg-black p-4 [&amp;>svg]:h-fit [&amp;>svg]:fill-green-600"></div><span class="block flex-grow text-center p-4">Liked Songs<!#><!/></span></div><!#><!/></div>',20),pt=Q('<span class="float-right"> ✓</span>',2),Va=Q('<div tabindex="0" role="checkbox" class="flex h-24 w-full cursor-pointer items-center rounded-lg border bg-green-100 text-lg font-semibold focus-within:border-4 focus-within:border-green-600 hover:bg-green-300 aria-checked:bg-green-600 aria-checked:text-white"><!#><!/><span class="block flex-grow text-center p-4"><!#><!/><!#><!/></span></div>',10),Ja=Q('<img class="aspect-square h-full">',1),Za=Q('<div class="block aspect-square h-full bg-black p-4 [&amp;>svg]:h-fit [&amp;>svg]:fill-green-600"></div>',2);function ei(t){const e=On(()=>["playlistsData"],()=>t.spotifyClient.fetchSpotifyRoute("https://api.spotify.com/v1/me/playlists")),n=On(()=>["userData"],()=>t.spotifyClient.fetchSpotifyRoute("https://api.spotify.com/v1/me")),[r,a]=fe([]),i=u=>{const f=r();f.find(d=>d.id===u.id)?a(f.filter(d=>d.id!==u.id)):a([...f,u])},s={id:"__liked_songs",name:"Liked Songs"},o=()=>l().length+1===r().length,l=()=>e.data&&e.data.items&&e.data.items.filter(u=>u.collaborative||u.owner.id===n.data.id),c=()=>{o()?a([]):a([s,...l()])};return(()=>{const u=D(Ba),f=u.firstChild,[d,h]=j(f.nextSibling),g=d.nextSibling,[y,v]=j(g.nextSibling);return $(u,()=>e.isLoading||n.isLoading&&D(Wa),d,h),$(u,(()=>{const S=Z(()=>!!l());return()=>S()&&[D(Ga),(()=>{const O=D(Xa),b=O.firstChild,C=b.firstChild,A=C.nextSibling,k=A.firstChild,w=k.nextSibling,[x,_]=j(w.nextSibling),M=b.nextSibling,ce=M.firstChild,dt=ce.nextSibling,ht=dt.firstChild,Br=ht.nextSibling,[Wr,Gr]=j(Br.nextSibling),Xr=M.nextSibling,[Vr,Jr]=j(Xr.nextSibling);return b.$$click=()=>{c()},b.$$keyup=P=>{P.key===" "&&c()},b.$$keydown=P=>{P.key===" "&&P.preventDefault()},$(C,K(We,{})),$(A,(()=>{const P=Z(()=>!!o());return()=>P()&&D(pt)})(),x,_),M.$$click=()=>{i(s)},M.$$keyup=P=>{P.key===" "&&i(s)},M.$$keydown=P=>{P.key===" "&&P.preventDefault()},$(ce,K(We,{})),$(dt,(()=>{const P=Z(()=>!!r().find(({id:L})=>L==="__liked_songs"));return()=>P()&&D(pt)})(),Wr,Gr),$(O,K(ua,{get each(){return l()},children:P=>(()=>{const L=D(Va),Fe=L.firstChild,[Me,Zr]=j(Fe.nextSibling),mt=Me.nextSibling,ea=mt.firstChild,[an,ta]=j(ea.nextSibling),na=an.nextSibling,[ra,aa]=j(na.nextSibling);return L.$$click=()=>{i(P)},L.$$keyup=Y=>{Y.key===" "&&i(P)},L.$$keydown=Y=>{Y.key===" "&&Y.preventDefault()},$(L,(()=>{const Y=Z(()=>!!(P.images&&P.images.length>0));return()=>Y()?(()=>{const re=D(Ja);return He(()=>$e(re,"src",P.images[0].url)),re})():(()=>{const re=D(Za);return $(re,K(We,{})),re})()})(),Me,Zr),$(mt,()=>P.name,an,ta),$(mt,(()=>{const Y=Z(()=>!!r().find(({id:re})=>re===P.id));return()=>Y()&&D(pt)})(),ra,aa),He(()=>$e(L,"aria-checked",!!r().find(({id:Y})=>Y===P.id))),Ve(),L})()}),Vr,Jr),He(P=>{const L=!!o(),Fe=!!r().find(({id:Me})=>Me==="__liked_songs");return L!==P._v$&&$e(b,"aria-checked",P._v$=L),Fe!==P._v$2&&$e(M,"aria-checked",P._v$2=Fe),P},{_v$:void 0,_v$2:void 0}),Ve(),O})()]})(),y,v),u})()}tr(["keydown","keyup","click"]);function An(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter(function(a){return Object.getOwnPropertyDescriptor(t,a).enumerable})),n.push.apply(n,r)}return n}function m(t){for(var e=1;e<arguments.length;e++){var n=arguments[e]!=null?arguments[e]:{};e%2?An(Object(n),!0).forEach(function(r){T(t,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):An(Object(n)).forEach(function(r){Object.defineProperty(t,r,Object.getOwnPropertyDescriptor(n,r))})}return t}function rt(t){return rt=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},rt(t)}function ti(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function Cn(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function ni(t,e,n){return e&&Cn(t.prototype,e),n&&Cn(t,n),Object.defineProperty(t,"prototype",{writable:!1}),t}function T(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function Kt(t,e){return ai(t)||si(t,e)||br(t,e)||li()}function Re(t){return ri(t)||ii(t)||br(t)||oi()}function ri(t){if(Array.isArray(t))return Et(t)}function ai(t){if(Array.isArray(t))return t}function ii(t){if(typeof Symbol<"u"&&t[Symbol.iterator]!=null||t["@@iterator"]!=null)return Array.from(t)}function si(t,e){var n=t==null?null:typeof Symbol<"u"&&t[Symbol.iterator]||t["@@iterator"];if(n!=null){var r=[],a=!0,i=!1,s,o;try{for(n=n.call(t);!(a=(s=n.next()).done)&&(r.push(s.value),!(e&&r.length===e));a=!0);}catch(l){i=!0,o=l}finally{try{!a&&n.return!=null&&n.return()}finally{if(i)throw o}}return r}}function br(t,e){if(t){if(typeof t=="string")return Et(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);if(n==="Object"&&t.constructor&&(n=t.constructor.name),n==="Map"||n==="Set")return Array.from(t);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return Et(t,e)}}function Et(t,e){(e==null||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function oi(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function li(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var Pn=function(){},Ht={},wr={},kr=null,xr={mark:Pn,measure:Pn};try{typeof window<"u"&&(Ht=window),typeof document<"u"&&(wr=document),typeof MutationObserver<"u"&&(kr=MutationObserver),typeof performance<"u"&&(xr=performance)}catch{}var ui=Ht.navigator||{},_n=ui.userAgent,En=_n===void 0?"":_n,ee=Ht,R=wr,Rn=kr,Ne=xr;ee.document;var X=!!R.documentElement&&!!R.head&&typeof R.addEventListener=="function"&&typeof R.createElement=="function",Sr=~En.indexOf("MSIE")||~En.indexOf("Trident/"),Le,qe,Qe,je,Ue,B="___FONT_AWESOME___",Rt=16,Or="fa",Ar="svg-inline--fa",le="data-fa-i2svg",It="data-fa-pseudo-element",ci="data-fa-pseudo-element-pending",Bt="data-prefix",Wt="data-icon",In="fontawesome-i2svg",fi="async",di=["HTML","HEAD","STYLE","SCRIPT"],Cr=function(){try{return!0}catch{return!1}}(),E="classic",I="sharp",Gt=[E,I];function Ie(t){return new Proxy(t,{get:function(n,r){return r in n?n[r]:n[E]}})}var Oe=Ie((Le={},T(Le,E,{fa:"solid",fas:"solid","fa-solid":"solid",far:"regular","fa-regular":"regular",fal:"light","fa-light":"light",fat:"thin","fa-thin":"thin",fad:"duotone","fa-duotone":"duotone",fab:"brands","fa-brands":"brands",fak:"kit","fa-kit":"kit"}),T(Le,I,{fa:"solid",fass:"solid","fa-solid":"solid",fasr:"regular","fa-regular":"regular"}),Le)),Ae=Ie((qe={},T(qe,E,{solid:"fas",regular:"far",light:"fal",thin:"fat",duotone:"fad",brands:"fab",kit:"fak"}),T(qe,I,{solid:"fass",regular:"fasr"}),qe)),Ce=Ie((Qe={},T(Qe,E,{fab:"fa-brands",fad:"fa-duotone",fak:"fa-kit",fal:"fa-light",far:"fa-regular",fas:"fa-solid",fat:"fa-thin"}),T(Qe,I,{fass:"fa-solid",fasr:"fa-regular"}),Qe)),hi=Ie((je={},T(je,E,{"fa-brands":"fab","fa-duotone":"fad","fa-kit":"fak","fa-light":"fal","fa-regular":"far","fa-solid":"fas","fa-thin":"fat"}),T(je,I,{"fa-solid":"fass","fa-regular":"fasr"}),je)),mi=/fa(s|r|l|t|d|b|k|ss|sr)?[\-\ ]/,Pr="fa-layers-text",pi=/Font ?Awesome ?([56 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Sharp|Kit)?.*/i,vi=Ie((Ue={},T(Ue,E,{900:"fas",400:"far",normal:"far",300:"fal",100:"fat"}),T(Ue,I,{900:"fass",400:"fasr"}),Ue)),_r=[1,2,3,4,5,6,7,8,9,10],gi=_r.concat([11,12,13,14,15,16,17,18,19,20]),yi=["class","data-prefix","data-icon","data-fa-transform","data-fa-mask"],ie={GROUP:"duotone-group",SWAP_OPACITY:"swap-opacity",PRIMARY:"primary",SECONDARY:"secondary"},Pe=new Set;Object.keys(Ae[E]).map(Pe.add.bind(Pe));Object.keys(Ae[I]).map(Pe.add.bind(Pe));var bi=[].concat(Gt,Re(Pe),["2xs","xs","sm","lg","xl","2xl","beat","border","fade","beat-fade","bounce","flip-both","flip-horizontal","flip-vertical","flip","fw","inverse","layers-counter","layers-text","layers","li","pull-left","pull-right","pulse","rotate-180","rotate-270","rotate-90","rotate-by","shake","spin-pulse","spin-reverse","spin","stack-1x","stack-2x","stack","ul",ie.GROUP,ie.SWAP_OPACITY,ie.PRIMARY,ie.SECONDARY]).concat(_r.map(function(t){return"".concat(t,"x")})).concat(gi.map(function(t){return"w-".concat(t)})),we=ee.FontAwesomeConfig||{};function wi(t){var e=R.querySelector("script["+t+"]");if(e)return e.getAttribute(t)}function ki(t){return t===""?!0:t==="false"?!1:t==="true"?!0:t}if(R&&typeof R.querySelector=="function"){var xi=[["data-family-prefix","familyPrefix"],["data-css-prefix","cssPrefix"],["data-family-default","familyDefault"],["data-style-default","styleDefault"],["data-replacement-class","replacementClass"],["data-auto-replace-svg","autoReplaceSvg"],["data-auto-add-css","autoAddCss"],["data-auto-a11y","autoA11y"],["data-search-pseudo-elements","searchPseudoElements"],["data-observe-mutations","observeMutations"],["data-mutate-approach","mutateApproach"],["data-keep-original-source","keepOriginalSource"],["data-measure-performance","measurePerformance"],["data-show-missing-icons","showMissingIcons"]];xi.forEach(function(t){var e=Kt(t,2),n=e[0],r=e[1],a=ki(wi(n));a!=null&&(we[r]=a)})}var Er={styleDefault:"solid",familyDefault:"classic",cssPrefix:Or,replacementClass:Ar,autoReplaceSvg:!0,autoAddCss:!0,autoA11y:!0,searchPseudoElements:!1,observeMutations:!0,mutateApproach:"async",keepOriginalSource:!0,measurePerformance:!1,showMissingIcons:!0};we.familyPrefix&&(we.cssPrefix=we.familyPrefix);var pe=m(m({},Er),we);pe.autoReplaceSvg||(pe.observeMutations=!1);var p={};Object.keys(Er).forEach(function(t){Object.defineProperty(p,t,{enumerable:!0,set:function(n){pe[t]=n,ke.forEach(function(r){return r(p)})},get:function(){return pe[t]}})});Object.defineProperty(p,"familyPrefix",{enumerable:!0,set:function(e){pe.cssPrefix=e,ke.forEach(function(n){return n(p)})},get:function(){return pe.cssPrefix}});ee.FontAwesomeConfig=p;var ke=[];function Si(t){return ke.push(t),function(){ke.splice(ke.indexOf(t),1)}}var V=Rt,H={size:16,x:0,y:0,rotate:0,flipX:!1,flipY:!1};function Oi(t){if(!(!t||!X)){var e=R.createElement("style");e.setAttribute("type","text/css"),e.innerHTML=t;for(var n=R.head.childNodes,r=null,a=n.length-1;a>-1;a--){var i=n[a],s=(i.tagName||"").toUpperCase();["STYLE","LINK"].indexOf(s)>-1&&(r=i)}return R.head.insertBefore(e,r),t}}var Ai="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";function _e(){for(var t=12,e="";t-- >0;)e+=Ai[Math.random()*62|0];return e}function ge(t){for(var e=[],n=(t||[]).length>>>0;n--;)e[n]=t[n];return e}function Xt(t){return t.classList?ge(t.classList):(t.getAttribute("class")||"").split(" ").filter(function(e){return e})}function Rr(t){return"".concat(t).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function Ci(t){return Object.keys(t||{}).reduce(function(e,n){return e+"".concat(n,'="').concat(Rr(t[n]),'" ')},"").trim()}function lt(t){return Object.keys(t||{}).reduce(function(e,n){return e+"".concat(n,": ").concat(t[n].trim(),";")},"")}function Vt(t){return t.size!==H.size||t.x!==H.x||t.y!==H.y||t.rotate!==H.rotate||t.flipX||t.flipY}function Pi(t){var e=t.transform,n=t.containerWidth,r=t.iconWidth,a={transform:"translate(".concat(n/2," 256)")},i="translate(".concat(e.x*32,", ").concat(e.y*32,") "),s="scale(".concat(e.size/16*(e.flipX?-1:1),", ").concat(e.size/16*(e.flipY?-1:1),") "),o="rotate(".concat(e.rotate," 0 0)"),l={transform:"".concat(i," ").concat(s," ").concat(o)},c={transform:"translate(".concat(r/2*-1," -256)")};return{outer:a,inner:l,path:c}}function _i(t){var e=t.transform,n=t.width,r=n===void 0?Rt:n,a=t.height,i=a===void 0?Rt:a,s=t.startCentered,o=s===void 0?!1:s,l="";return o&&Sr?l+="translate(".concat(e.x/V-r/2,"em, ").concat(e.y/V-i/2,"em) "):o?l+="translate(calc(-50% + ".concat(e.x/V,"em), calc(-50% + ").concat(e.y/V,"em)) "):l+="translate(".concat(e.x/V,"em, ").concat(e.y/V,"em) "),l+="scale(".concat(e.size/V*(e.flipX?-1:1),", ").concat(e.size/V*(e.flipY?-1:1),") "),l+="rotate(".concat(e.rotate,"deg) "),l}var Ei=`:root, :host {
  --fa-font-solid: normal 900 1em/1 "Font Awesome 6 Solid";
  --fa-font-regular: normal 400 1em/1 "Font Awesome 6 Regular";
  --fa-font-light: normal 300 1em/1 "Font Awesome 6 Light";
  --fa-font-thin: normal 100 1em/1 "Font Awesome 6 Thin";
  --fa-font-duotone: normal 900 1em/1 "Font Awesome 6 Duotone";
  --fa-font-sharp-solid: normal 900 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-regular: normal 400 1em/1 "Font Awesome 6 Sharp";
  --fa-font-brands: normal 400 1em/1 "Font Awesome 6 Brands";
}

svg:not(:root).svg-inline--fa, svg:not(:host).svg-inline--fa {
  overflow: visible;
  box-sizing: content-box;
}

.svg-inline--fa {
  display: var(--fa-display, inline-block);
  height: 1em;
  overflow: visible;
  vertical-align: -0.125em;
}
.svg-inline--fa.fa-2xs {
  vertical-align: 0.1em;
}
.svg-inline--fa.fa-xs {
  vertical-align: 0em;
}
.svg-inline--fa.fa-sm {
  vertical-align: -0.0714285705em;
}
.svg-inline--fa.fa-lg {
  vertical-align: -0.2em;
}
.svg-inline--fa.fa-xl {
  vertical-align: -0.25em;
}
.svg-inline--fa.fa-2xl {
  vertical-align: -0.3125em;
}
.svg-inline--fa.fa-pull-left {
  margin-right: var(--fa-pull-margin, 0.3em);
  width: auto;
}
.svg-inline--fa.fa-pull-right {
  margin-left: var(--fa-pull-margin, 0.3em);
  width: auto;
}
.svg-inline--fa.fa-li {
  width: var(--fa-li-width, 2em);
  top: 0.25em;
}
.svg-inline--fa.fa-fw {
  width: var(--fa-fw-width, 1.25em);
}

.fa-layers svg.svg-inline--fa {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
}

.fa-layers-counter, .fa-layers-text {
  display: inline-block;
  position: absolute;
  text-align: center;
}

.fa-layers {
  display: inline-block;
  height: 1em;
  position: relative;
  text-align: center;
  vertical-align: -0.125em;
  width: 1em;
}
.fa-layers svg.svg-inline--fa {
  -webkit-transform-origin: center center;
          transform-origin: center center;
}

.fa-layers-text {
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
  -webkit-transform-origin: center center;
          transform-origin: center center;
}

.fa-layers-counter {
  background-color: var(--fa-counter-background-color, #ff253a);
  border-radius: var(--fa-counter-border-radius, 1em);
  box-sizing: border-box;
  color: var(--fa-inverse, #fff);
  line-height: var(--fa-counter-line-height, 1);
  max-width: var(--fa-counter-max-width, 5em);
  min-width: var(--fa-counter-min-width, 1.5em);
  overflow: hidden;
  padding: var(--fa-counter-padding, 0.25em 0.5em);
  right: var(--fa-right, 0);
  text-overflow: ellipsis;
  top: var(--fa-top, 0);
  -webkit-transform: scale(var(--fa-counter-scale, 0.25));
          transform: scale(var(--fa-counter-scale, 0.25));
  -webkit-transform-origin: top right;
          transform-origin: top right;
}

.fa-layers-bottom-right {
  bottom: var(--fa-bottom, 0);
  right: var(--fa-right, 0);
  top: auto;
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: bottom right;
          transform-origin: bottom right;
}

.fa-layers-bottom-left {
  bottom: var(--fa-bottom, 0);
  left: var(--fa-left, 0);
  right: auto;
  top: auto;
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: bottom left;
          transform-origin: bottom left;
}

.fa-layers-top-right {
  top: var(--fa-top, 0);
  right: var(--fa-right, 0);
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: top right;
          transform-origin: top right;
}

.fa-layers-top-left {
  left: var(--fa-left, 0);
  right: auto;
  top: var(--fa-top, 0);
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: top left;
          transform-origin: top left;
}

.fa-1x {
  font-size: 1em;
}

.fa-2x {
  font-size: 2em;
}

.fa-3x {
  font-size: 3em;
}

.fa-4x {
  font-size: 4em;
}

.fa-5x {
  font-size: 5em;
}

.fa-6x {
  font-size: 6em;
}

.fa-7x {
  font-size: 7em;
}

.fa-8x {
  font-size: 8em;
}

.fa-9x {
  font-size: 9em;
}

.fa-10x {
  font-size: 10em;
}

.fa-2xs {
  font-size: 0.625em;
  line-height: 0.1em;
  vertical-align: 0.225em;
}

.fa-xs {
  font-size: 0.75em;
  line-height: 0.0833333337em;
  vertical-align: 0.125em;
}

.fa-sm {
  font-size: 0.875em;
  line-height: 0.0714285718em;
  vertical-align: 0.0535714295em;
}

.fa-lg {
  font-size: 1.25em;
  line-height: 0.05em;
  vertical-align: -0.075em;
}

.fa-xl {
  font-size: 1.5em;
  line-height: 0.0416666682em;
  vertical-align: -0.125em;
}

.fa-2xl {
  font-size: 2em;
  line-height: 0.03125em;
  vertical-align: -0.1875em;
}

.fa-fw {
  text-align: center;
  width: 1.25em;
}

.fa-ul {
  list-style-type: none;
  margin-left: var(--fa-li-margin, 2.5em);
  padding-left: 0;
}
.fa-ul > li {
  position: relative;
}

.fa-li {
  left: calc(var(--fa-li-width, 2em) * -1);
  position: absolute;
  text-align: center;
  width: var(--fa-li-width, 2em);
  line-height: inherit;
}

.fa-border {
  border-color: var(--fa-border-color, #eee);
  border-radius: var(--fa-border-radius, 0.1em);
  border-style: var(--fa-border-style, solid);
  border-width: var(--fa-border-width, 0.08em);
  padding: var(--fa-border-padding, 0.2em 0.25em 0.15em);
}

.fa-pull-left {
  float: left;
  margin-right: var(--fa-pull-margin, 0.3em);
}

.fa-pull-right {
  float: right;
  margin-left: var(--fa-pull-margin, 0.3em);
}

.fa-beat {
  -webkit-animation-name: fa-beat;
          animation-name: fa-beat;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, ease-in-out);
          animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-bounce {
  -webkit-animation-name: fa-bounce;
          animation-name: fa-bounce;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
}

.fa-fade {
  -webkit-animation-name: fa-fade;
          animation-name: fa-fade;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-beat-fade {
  -webkit-animation-name: fa-beat-fade;
          animation-name: fa-beat-fade;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-flip {
  -webkit-animation-name: fa-flip;
          animation-name: fa-flip;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, ease-in-out);
          animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-shake {
  -webkit-animation-name: fa-shake;
          animation-name: fa-shake;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, linear);
          animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin {
  -webkit-animation-name: fa-spin;
          animation-name: fa-spin;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 2s);
          animation-duration: var(--fa-animation-duration, 2s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, linear);
          animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin-reverse {
  --fa-animation-direction: reverse;
}

.fa-pulse,
.fa-spin-pulse {
  -webkit-animation-name: fa-spin;
          animation-name: fa-spin;
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, steps(8));
          animation-timing-function: var(--fa-animation-timing, steps(8));
}

@media (prefers-reduced-motion: reduce) {
  .fa-beat,
.fa-bounce,
.fa-fade,
.fa-beat-fade,
.fa-flip,
.fa-pulse,
.fa-shake,
.fa-spin,
.fa-spin-pulse {
    -webkit-animation-delay: -1ms;
            animation-delay: -1ms;
    -webkit-animation-duration: 1ms;
            animation-duration: 1ms;
    -webkit-animation-iteration-count: 1;
            animation-iteration-count: 1;
    -webkit-transition-delay: 0s;
            transition-delay: 0s;
    -webkit-transition-duration: 0s;
            transition-duration: 0s;
  }
}
@-webkit-keyframes fa-beat {
  0%, 90% {
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  45% {
    -webkit-transform: scale(var(--fa-beat-scale, 1.25));
            transform: scale(var(--fa-beat-scale, 1.25));
  }
}
@keyframes fa-beat {
  0%, 90% {
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  45% {
    -webkit-transform: scale(var(--fa-beat-scale, 1.25));
            transform: scale(var(--fa-beat-scale, 1.25));
  }
}
@-webkit-keyframes fa-bounce {
  0% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
  10% {
    -webkit-transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
            transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
  }
  30% {
    -webkit-transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
            transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
  }
  50% {
    -webkit-transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
            transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
  }
  57% {
    -webkit-transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
            transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
  }
  64% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
  100% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
}
@keyframes fa-bounce {
  0% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
  10% {
    -webkit-transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
            transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
  }
  30% {
    -webkit-transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
            transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
  }
  50% {
    -webkit-transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
            transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
  }
  57% {
    -webkit-transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
            transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
  }
  64% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
  100% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
}
@-webkit-keyframes fa-fade {
  50% {
    opacity: var(--fa-fade-opacity, 0.4);
  }
}
@keyframes fa-fade {
  50% {
    opacity: var(--fa-fade-opacity, 0.4);
  }
}
@-webkit-keyframes fa-beat-fade {
  0%, 100% {
    opacity: var(--fa-beat-fade-opacity, 0.4);
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  50% {
    opacity: 1;
    -webkit-transform: scale(var(--fa-beat-fade-scale, 1.125));
            transform: scale(var(--fa-beat-fade-scale, 1.125));
  }
}
@keyframes fa-beat-fade {
  0%, 100% {
    opacity: var(--fa-beat-fade-opacity, 0.4);
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  50% {
    opacity: 1;
    -webkit-transform: scale(var(--fa-beat-fade-scale, 1.125));
            transform: scale(var(--fa-beat-fade-scale, 1.125));
  }
}
@-webkit-keyframes fa-flip {
  50% {
    -webkit-transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
            transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
  }
}
@keyframes fa-flip {
  50% {
    -webkit-transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
            transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
  }
}
@-webkit-keyframes fa-shake {
  0% {
    -webkit-transform: rotate(-15deg);
            transform: rotate(-15deg);
  }
  4% {
    -webkit-transform: rotate(15deg);
            transform: rotate(15deg);
  }
  8%, 24% {
    -webkit-transform: rotate(-18deg);
            transform: rotate(-18deg);
  }
  12%, 28% {
    -webkit-transform: rotate(18deg);
            transform: rotate(18deg);
  }
  16% {
    -webkit-transform: rotate(-22deg);
            transform: rotate(-22deg);
  }
  20% {
    -webkit-transform: rotate(22deg);
            transform: rotate(22deg);
  }
  32% {
    -webkit-transform: rotate(-12deg);
            transform: rotate(-12deg);
  }
  36% {
    -webkit-transform: rotate(12deg);
            transform: rotate(12deg);
  }
  40%, 100% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
}
@keyframes fa-shake {
  0% {
    -webkit-transform: rotate(-15deg);
            transform: rotate(-15deg);
  }
  4% {
    -webkit-transform: rotate(15deg);
            transform: rotate(15deg);
  }
  8%, 24% {
    -webkit-transform: rotate(-18deg);
            transform: rotate(-18deg);
  }
  12%, 28% {
    -webkit-transform: rotate(18deg);
            transform: rotate(18deg);
  }
  16% {
    -webkit-transform: rotate(-22deg);
            transform: rotate(-22deg);
  }
  20% {
    -webkit-transform: rotate(22deg);
            transform: rotate(22deg);
  }
  32% {
    -webkit-transform: rotate(-12deg);
            transform: rotate(-12deg);
  }
  36% {
    -webkit-transform: rotate(12deg);
            transform: rotate(12deg);
  }
  40%, 100% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
}
@-webkit-keyframes fa-spin {
  0% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
  }
}
@keyframes fa-spin {
  0% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
  }
}
.fa-rotate-90 {
  -webkit-transform: rotate(90deg);
          transform: rotate(90deg);
}

.fa-rotate-180 {
  -webkit-transform: rotate(180deg);
          transform: rotate(180deg);
}

.fa-rotate-270 {
  -webkit-transform: rotate(270deg);
          transform: rotate(270deg);
}

.fa-flip-horizontal {
  -webkit-transform: scale(-1, 1);
          transform: scale(-1, 1);
}

.fa-flip-vertical {
  -webkit-transform: scale(1, -1);
          transform: scale(1, -1);
}

.fa-flip-both,
.fa-flip-horizontal.fa-flip-vertical {
  -webkit-transform: scale(-1, -1);
          transform: scale(-1, -1);
}

.fa-rotate-by {
  -webkit-transform: rotate(var(--fa-rotate-angle, none));
          transform: rotate(var(--fa-rotate-angle, none));
}

.fa-stack {
  display: inline-block;
  vertical-align: middle;
  height: 2em;
  position: relative;
  width: 2.5em;
}

.fa-stack-1x,
.fa-stack-2x {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  z-index: var(--fa-stack-z-index, auto);
}

.svg-inline--fa.fa-stack-1x {
  height: 1em;
  width: 1.25em;
}
.svg-inline--fa.fa-stack-2x {
  height: 2em;
  width: 2.5em;
}

.fa-inverse {
  color: var(--fa-inverse, #fff);
}

.sr-only,
.fa-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.sr-only-focusable:not(:focus),
.fa-sr-only-focusable:not(:focus) {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.svg-inline--fa .fa-primary {
  fill: var(--fa-primary-color, currentColor);
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa .fa-secondary {
  fill: var(--fa-secondary-color, currentColor);
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-primary {
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-secondary {
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa mask .fa-primary,
.svg-inline--fa mask .fa-secondary {
  fill: black;
}

.fad.fa-inverse,
.fa-duotone.fa-inverse {
  color: var(--fa-inverse, #fff);
}`;function Ir(){var t=Or,e=Ar,n=p.cssPrefix,r=p.replacementClass,a=Ei;if(n!==t||r!==e){var i=new RegExp("\\.".concat(t,"\\-"),"g"),s=new RegExp("\\--".concat(t,"\\-"),"g"),o=new RegExp("\\.".concat(e),"g");a=a.replace(i,".".concat(n,"-")).replace(s,"--".concat(n,"-")).replace(o,".".concat(r))}return a}var Tn=!1;function vt(){p.autoAddCss&&!Tn&&(Oi(Ir()),Tn=!0)}var Ri={mixout:function(){return{dom:{css:Ir,insertCss:vt}}},hooks:function(){return{beforeDOMElementCreation:function(){vt()},beforeI2svg:function(){vt()}}}},W=ee||{};W[B]||(W[B]={});W[B].styles||(W[B].styles={});W[B].hooks||(W[B].hooks={});W[B].shims||(W[B].shims=[]);var z=W[B],Tr=[],Ii=function t(){R.removeEventListener("DOMContentLoaded",t),at=1,Tr.map(function(e){return e()})},at=!1;X&&(at=(R.documentElement.doScroll?/^loaded|^c/:/^loaded|^i|^c/).test(R.readyState),at||R.addEventListener("DOMContentLoaded",Ii));function Ti(t){X&&(at?setTimeout(t,0):Tr.push(t))}function Te(t){var e=t.tag,n=t.attributes,r=n===void 0?{}:n,a=t.children,i=a===void 0?[]:a;return typeof t=="string"?Rr(t):"<".concat(e," ").concat(Ci(r),">").concat(i.map(Te).join(""),"</").concat(e,">")}function Fn(t,e,n){if(t&&t[e]&&t[e][n])return{prefix:e,iconName:n,icon:t[e][n]}}var Fi=function(e,n){return function(r,a,i,s){return e.call(n,r,a,i,s)}},gt=function(e,n,r,a){var i=Object.keys(e),s=i.length,o=a!==void 0?Fi(n,a):n,l,c,u;for(r===void 0?(l=1,u=e[i[0]]):(l=0,u=r);l<s;l++)c=i[l],u=o(u,e[c],c,e);return u};function Mi(t){for(var e=[],n=0,r=t.length;n<r;){var a=t.charCodeAt(n++);if(a>=55296&&a<=56319&&n<r){var i=t.charCodeAt(n++);(i&64512)==56320?e.push(((a&1023)<<10)+(i&1023)+65536):(e.push(a),n--)}else e.push(a)}return e}function Tt(t){var e=Mi(t);return e.length===1?e[0].toString(16):null}function $i(t,e){var n=t.length,r=t.charCodeAt(e),a;return r>=55296&&r<=56319&&n>e+1&&(a=t.charCodeAt(e+1),a>=56320&&a<=57343)?(r-55296)*1024+a-56320+65536:r}function Mn(t){return Object.keys(t).reduce(function(e,n){var r=t[n],a=!!r.icon;return a?e[r.iconName]=r.icon:e[n]=r,e},{})}function Ft(t,e){var n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},r=n.skipHooks,a=r===void 0?!1:r,i=Mn(e);typeof z.hooks.addPack=="function"&&!a?z.hooks.addPack(t,Mn(e)):z.styles[t]=m(m({},z.styles[t]||{}),i),t==="fas"&&Ft("fa",e)}var ze,Ye,Ke,de=z.styles,Di=z.shims,Ni=(ze={},T(ze,E,Object.values(Ce[E])),T(ze,I,Object.values(Ce[I])),ze),Jt=null,Fr={},Mr={},$r={},Dr={},Nr={},Li=(Ye={},T(Ye,E,Object.keys(Oe[E])),T(Ye,I,Object.keys(Oe[I])),Ye);function qi(t){return~bi.indexOf(t)}function Qi(t,e){var n=e.split("-"),r=n[0],a=n.slice(1).join("-");return r===t&&a!==""&&!qi(a)?a:null}var Lr=function(){var e=function(i){return gt(de,function(s,o,l){return s[l]=gt(o,i,{}),s},{})};Fr=e(function(a,i,s){if(i[3]&&(a[i[3]]=s),i[2]){var o=i[2].filter(function(l){return typeof l=="number"});o.forEach(function(l){a[l.toString(16)]=s})}return a}),Mr=e(function(a,i,s){if(a[s]=s,i[2]){var o=i[2].filter(function(l){return typeof l=="string"});o.forEach(function(l){a[l]=s})}return a}),Nr=e(function(a,i,s){var o=i[2];return a[s]=s,o.forEach(function(l){a[l]=s}),a});var n="far"in de||p.autoFetchSvg,r=gt(Di,function(a,i){var s=i[0],o=i[1],l=i[2];return o==="far"&&!n&&(o="fas"),typeof s=="string"&&(a.names[s]={prefix:o,iconName:l}),typeof s=="number"&&(a.unicodes[s.toString(16)]={prefix:o,iconName:l}),a},{names:{},unicodes:{}});$r=r.names,Dr=r.unicodes,Jt=ut(p.styleDefault,{family:p.familyDefault})};Si(function(t){Jt=ut(t.styleDefault,{family:p.familyDefault})});Lr();function Zt(t,e){return(Fr[t]||{})[e]}function ji(t,e){return(Mr[t]||{})[e]}function se(t,e){return(Nr[t]||{})[e]}function qr(t){return $r[t]||{prefix:null,iconName:null}}function Ui(t){var e=Dr[t],n=Zt("fas",t);return e||(n?{prefix:"fas",iconName:n}:null)||{prefix:null,iconName:null}}function te(){return Jt}var en=function(){return{prefix:null,iconName:null,rest:[]}};function ut(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=e.family,r=n===void 0?E:n,a=Oe[r][t],i=Ae[r][t]||Ae[r][a],s=t in z.styles?t:null;return i||s||null}var $n=(Ke={},T(Ke,E,Object.keys(Ce[E])),T(Ke,I,Object.keys(Ce[I])),Ke);function ct(t){var e,n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=n.skipLookups,a=r===void 0?!1:r,i=(e={},T(e,E,"".concat(p.cssPrefix,"-").concat(E)),T(e,I,"".concat(p.cssPrefix,"-").concat(I)),e),s=null,o=E;(t.includes(i[E])||t.some(function(c){return $n[E].includes(c)}))&&(o=E),(t.includes(i[I])||t.some(function(c){return $n[I].includes(c)}))&&(o=I);var l=t.reduce(function(c,u){var f=Qi(p.cssPrefix,u);if(de[u]?(u=Ni[o].includes(u)?hi[o][u]:u,s=u,c.prefix=u):Li[o].indexOf(u)>-1?(s=u,c.prefix=ut(u,{family:o})):f?c.iconName=f:u!==p.replacementClass&&u!==i[E]&&u!==i[I]&&c.rest.push(u),!a&&c.prefix&&c.iconName){var d=s==="fa"?qr(c.iconName):{},h=se(c.prefix,c.iconName);d.prefix&&(s=null),c.iconName=d.iconName||h||c.iconName,c.prefix=d.prefix||c.prefix,c.prefix==="far"&&!de.far&&de.fas&&!p.autoFetchSvg&&(c.prefix="fas")}return c},en());return(t.includes("fa-brands")||t.includes("fab"))&&(l.prefix="fab"),(t.includes("fa-duotone")||t.includes("fad"))&&(l.prefix="fad"),!l.prefix&&o===I&&(de.fass||p.autoFetchSvg)&&(l.prefix="fass",l.iconName=se(l.prefix,l.iconName)||l.iconName),(l.prefix==="fa"||s==="fa")&&(l.prefix=te()||"fas"),l}var zi=function(){function t(){ti(this,t),this.definitions={}}return ni(t,[{key:"add",value:function(){for(var n=this,r=arguments.length,a=new Array(r),i=0;i<r;i++)a[i]=arguments[i];var s=a.reduce(this._pullDefinitions,{});Object.keys(s).forEach(function(o){n.definitions[o]=m(m({},n.definitions[o]||{}),s[o]),Ft(o,s[o]);var l=Ce[E][o];l&&Ft(l,s[o]),Lr()})}},{key:"reset",value:function(){this.definitions={}}},{key:"_pullDefinitions",value:function(n,r){var a=r.prefix&&r.iconName&&r.icon?{0:r}:r;return Object.keys(a).map(function(i){var s=a[i],o=s.prefix,l=s.iconName,c=s.icon,u=c[2];n[o]||(n[o]={}),u.length>0&&u.forEach(function(f){typeof f=="string"&&(n[o][f]=c)}),n[o][l]=c}),n}}]),t}(),Dn=[],he={},me={},Yi=Object.keys(me);function Ki(t,e){var n=e.mixoutsTo;return Dn=t,he={},Object.keys(me).forEach(function(r){Yi.indexOf(r)===-1&&delete me[r]}),Dn.forEach(function(r){var a=r.mixout?r.mixout():{};if(Object.keys(a).forEach(function(s){typeof a[s]=="function"&&(n[s]=a[s]),rt(a[s])==="object"&&Object.keys(a[s]).forEach(function(o){n[s]||(n[s]={}),n[s][o]=a[s][o]})}),r.hooks){var i=r.hooks();Object.keys(i).forEach(function(s){he[s]||(he[s]=[]),he[s].push(i[s])})}r.provides&&r.provides(me)}),n}function Mt(t,e){for(var n=arguments.length,r=new Array(n>2?n-2:0),a=2;a<n;a++)r[a-2]=arguments[a];var i=he[t]||[];return i.forEach(function(s){e=s.apply(null,[e].concat(r))}),e}function ue(t){for(var e=arguments.length,n=new Array(e>1?e-1:0),r=1;r<e;r++)n[r-1]=arguments[r];var a=he[t]||[];a.forEach(function(i){i.apply(null,n)})}function G(){var t=arguments[0],e=Array.prototype.slice.call(arguments,1);return me[t]?me[t].apply(null,e):void 0}function $t(t){t.prefix==="fa"&&(t.prefix="fas");var e=t.iconName,n=t.prefix||te();if(e)return e=se(n,e)||e,Fn(Qr.definitions,n,e)||Fn(z.styles,n,e)}var Qr=new zi,Hi=function(){p.autoReplaceSvg=!1,p.observeMutations=!1,ue("noAuto")},Bi={i2svg:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};return X?(ue("beforeI2svg",e),G("pseudoElements2svg",e),G("i2svg",e)):Promise.reject("Operation requires a DOM of some kind.")},watch:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},n=e.autoReplaceSvgRoot;p.autoReplaceSvg===!1&&(p.autoReplaceSvg=!0),p.observeMutations=!0,Ti(function(){Gi({autoReplaceSvgRoot:n}),ue("watch",e)})}},Wi={icon:function(e){if(e===null)return null;if(rt(e)==="object"&&e.prefix&&e.iconName)return{prefix:e.prefix,iconName:se(e.prefix,e.iconName)||e.iconName};if(Array.isArray(e)&&e.length===2){var n=e[1].indexOf("fa-")===0?e[1].slice(3):e[1],r=ut(e[0]);return{prefix:r,iconName:se(r,n)||n}}if(typeof e=="string"&&(e.indexOf("".concat(p.cssPrefix,"-"))>-1||e.match(mi))){var a=ct(e.split(" "),{skipLookups:!0});return{prefix:a.prefix||te(),iconName:se(a.prefix,a.iconName)||a.iconName}}if(typeof e=="string"){var i=te();return{prefix:i,iconName:se(i,e)||e}}}},N={noAuto:Hi,config:p,dom:Bi,parse:Wi,library:Qr,findIconDefinition:$t,toHtml:Te},Gi=function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},n=e.autoReplaceSvgRoot,r=n===void 0?R:n;(Object.keys(z.styles).length>0||p.autoFetchSvg)&&X&&p.autoReplaceSvg&&N.dom.i2svg({node:r})};function ft(t,e){return Object.defineProperty(t,"abstract",{get:e}),Object.defineProperty(t,"html",{get:function(){return t.abstract.map(function(r){return Te(r)})}}),Object.defineProperty(t,"node",{get:function(){if(X){var r=R.createElement("div");return r.innerHTML=t.html,r.children}}}),t}function Xi(t){var e=t.children,n=t.main,r=t.mask,a=t.attributes,i=t.styles,s=t.transform;if(Vt(s)&&n.found&&!r.found){var o=n.width,l=n.height,c={x:o/l/2,y:.5};a.style=lt(m(m({},i),{},{"transform-origin":"".concat(c.x+s.x/16,"em ").concat(c.y+s.y/16,"em")}))}return[{tag:"svg",attributes:a,children:e}]}function Vi(t){var e=t.prefix,n=t.iconName,r=t.children,a=t.attributes,i=t.symbol,s=i===!0?"".concat(e,"-").concat(p.cssPrefix,"-").concat(n):i;return[{tag:"svg",attributes:{style:"display: none;"},children:[{tag:"symbol",attributes:m(m({},a),{},{id:s}),children:r}]}]}function tn(t){var e=t.icons,n=e.main,r=e.mask,a=t.prefix,i=t.iconName,s=t.transform,o=t.symbol,l=t.title,c=t.maskId,u=t.titleId,f=t.extra,d=t.watchable,h=d===void 0?!1:d,g=r.found?r:n,y=g.width,v=g.height,S=a==="fak",O=[p.replacementClass,i?"".concat(p.cssPrefix,"-").concat(i):""].filter(function(_){return f.classes.indexOf(_)===-1}).filter(function(_){return _!==""||!!_}).concat(f.classes).join(" "),b={children:[],attributes:m(m({},f.attributes),{},{"data-prefix":a,"data-icon":i,class:O,role:f.attributes.role||"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 ".concat(y," ").concat(v)})},C=S&&!~f.classes.indexOf("fa-fw")?{width:"".concat(y/v*16*.0625,"em")}:{};h&&(b.attributes[le]=""),l&&(b.children.push({tag:"title",attributes:{id:b.attributes["aria-labelledby"]||"title-".concat(u||_e())},children:[l]}),delete b.attributes.title);var A=m(m({},b),{},{prefix:a,iconName:i,main:n,mask:r,maskId:c,transform:s,symbol:o,styles:m(m({},C),f.styles)}),k=r.found&&n.found?G("generateAbstractMask",A)||{children:[],attributes:{}}:G("generateAbstractIcon",A)||{children:[],attributes:{}},w=k.children,x=k.attributes;return A.children=w,A.attributes=x,o?Vi(A):Xi(A)}function Nn(t){var e=t.content,n=t.width,r=t.height,a=t.transform,i=t.title,s=t.extra,o=t.watchable,l=o===void 0?!1:o,c=m(m(m({},s.attributes),i?{title:i}:{}),{},{class:s.classes.join(" ")});l&&(c[le]="");var u=m({},s.styles);Vt(a)&&(u.transform=_i({transform:a,startCentered:!0,width:n,height:r}),u["-webkit-transform"]=u.transform);var f=lt(u);f.length>0&&(c.style=f);var d=[];return d.push({tag:"span",attributes:c,children:[e]}),i&&d.push({tag:"span",attributes:{class:"sr-only"},children:[i]}),d}function Ji(t){var e=t.content,n=t.title,r=t.extra,a=m(m(m({},r.attributes),n?{title:n}:{}),{},{class:r.classes.join(" ")}),i=lt(r.styles);i.length>0&&(a.style=i);var s=[];return s.push({tag:"span",attributes:a,children:[e]}),n&&s.push({tag:"span",attributes:{class:"sr-only"},children:[n]}),s}var yt=z.styles;function Dt(t){var e=t[0],n=t[1],r=t.slice(4),a=Kt(r,1),i=a[0],s=null;return Array.isArray(i)?s={tag:"g",attributes:{class:"".concat(p.cssPrefix,"-").concat(ie.GROUP)},children:[{tag:"path",attributes:{class:"".concat(p.cssPrefix,"-").concat(ie.SECONDARY),fill:"currentColor",d:i[0]}},{tag:"path",attributes:{class:"".concat(p.cssPrefix,"-").concat(ie.PRIMARY),fill:"currentColor",d:i[1]}}]}:s={tag:"path",attributes:{fill:"currentColor",d:i}},{found:!0,width:e,height:n,icon:s}}var Zi={found:!1,width:512,height:512};function es(t,e){!Cr&&!p.showMissingIcons&&t&&console.error('Icon with name "'.concat(t,'" and prefix "').concat(e,'" is missing.'))}function Nt(t,e){var n=e;return e==="fa"&&p.styleDefault!==null&&(e=te()),new Promise(function(r,a){if(G("missingIconAbstract"),n==="fa"){var i=qr(t)||{};t=i.iconName||t,e=i.prefix||e}if(t&&e&&yt[e]&&yt[e][t]){var s=yt[e][t];return r(Dt(s))}es(t,e),r(m(m({},Zi),{},{icon:p.showMissingIcons&&t?G("missingIconAbstract")||{}:{}}))})}var Ln=function(){},Lt=p.measurePerformance&&Ne&&Ne.mark&&Ne.measure?Ne:{mark:Ln,measure:Ln},be='FA "6.3.0"',ts=function(e){return Lt.mark("".concat(be," ").concat(e," begins")),function(){return jr(e)}},jr=function(e){Lt.mark("".concat(be," ").concat(e," ends")),Lt.measure("".concat(be," ").concat(e),"".concat(be," ").concat(e," begins"),"".concat(be," ").concat(e," ends"))},nn={begin:ts,end:jr},Ge=function(){};function qn(t){var e=t.getAttribute?t.getAttribute(le):null;return typeof e=="string"}function ns(t){var e=t.getAttribute?t.getAttribute(Bt):null,n=t.getAttribute?t.getAttribute(Wt):null;return e&&n}function rs(t){return t&&t.classList&&t.classList.contains&&t.classList.contains(p.replacementClass)}function as(){if(p.autoReplaceSvg===!0)return Xe.replace;var t=Xe[p.autoReplaceSvg];return t||Xe.replace}function is(t){return R.createElementNS("http://www.w3.org/2000/svg",t)}function ss(t){return R.createElement(t)}function Ur(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=e.ceFn,r=n===void 0?t.tag==="svg"?is:ss:n;if(typeof t=="string")return R.createTextNode(t);var a=r(t.tag);Object.keys(t.attributes||[]).forEach(function(s){a.setAttribute(s,t.attributes[s])});var i=t.children||[];return i.forEach(function(s){a.appendChild(Ur(s,{ceFn:r}))}),a}function os(t){var e=" ".concat(t.outerHTML," ");return e="".concat(e,"Font Awesome fontawesome.com "),e}var Xe={replace:function(e){var n=e[0];if(n.parentNode)if(e[1].forEach(function(a){n.parentNode.insertBefore(Ur(a),n)}),n.getAttribute(le)===null&&p.keepOriginalSource){var r=R.createComment(os(n));n.parentNode.replaceChild(r,n)}else n.remove()},nest:function(e){var n=e[0],r=e[1];if(~Xt(n).indexOf(p.replacementClass))return Xe.replace(e);var a=new RegExp("".concat(p.cssPrefix,"-.*"));if(delete r[0].attributes.id,r[0].attributes.class){var i=r[0].attributes.class.split(" ").reduce(function(o,l){return l===p.replacementClass||l.match(a)?o.toSvg.push(l):o.toNode.push(l),o},{toNode:[],toSvg:[]});r[0].attributes.class=i.toSvg.join(" "),i.toNode.length===0?n.removeAttribute("class"):n.setAttribute("class",i.toNode.join(" "))}var s=r.map(function(o){return Te(o)}).join(`
`);n.setAttribute(le,""),n.innerHTML=s}};function Qn(t){t()}function zr(t,e){var n=typeof e=="function"?e:Ge;if(t.length===0)n();else{var r=Qn;p.mutateApproach===fi&&(r=ee.requestAnimationFrame||Qn),r(function(){var a=as(),i=nn.begin("mutate");t.map(a),i(),n()})}}var rn=!1;function Yr(){rn=!0}function qt(){rn=!1}var it=null;function jn(t){if(Rn&&p.observeMutations){var e=t.treeCallback,n=e===void 0?Ge:e,r=t.nodeCallback,a=r===void 0?Ge:r,i=t.pseudoElementsCallback,s=i===void 0?Ge:i,o=t.observeMutationsRoot,l=o===void 0?R:o;it=new Rn(function(c){if(!rn){var u=te();ge(c).forEach(function(f){if(f.type==="childList"&&f.addedNodes.length>0&&!qn(f.addedNodes[0])&&(p.searchPseudoElements&&s(f.target),n(f.target)),f.type==="attributes"&&f.target.parentNode&&p.searchPseudoElements&&s(f.target.parentNode),f.type==="attributes"&&qn(f.target)&&~yi.indexOf(f.attributeName))if(f.attributeName==="class"&&ns(f.target)){var d=ct(Xt(f.target)),h=d.prefix,g=d.iconName;f.target.setAttribute(Bt,h||u),g&&f.target.setAttribute(Wt,g)}else rs(f.target)&&a(f.target)})}}),X&&it.observe(l,{childList:!0,attributes:!0,characterData:!0,subtree:!0})}}function ls(){it&&it.disconnect()}function us(t){var e=t.getAttribute("style"),n=[];return e&&(n=e.split(";").reduce(function(r,a){var i=a.split(":"),s=i[0],o=i.slice(1);return s&&o.length>0&&(r[s]=o.join(":").trim()),r},{})),n}function cs(t){var e=t.getAttribute("data-prefix"),n=t.getAttribute("data-icon"),r=t.innerText!==void 0?t.innerText.trim():"",a=ct(Xt(t));return a.prefix||(a.prefix=te()),e&&n&&(a.prefix=e,a.iconName=n),a.iconName&&a.prefix||(a.prefix&&r.length>0&&(a.iconName=ji(a.prefix,t.innerText)||Zt(a.prefix,Tt(t.innerText))),!a.iconName&&p.autoFetchSvg&&t.firstChild&&t.firstChild.nodeType===Node.TEXT_NODE&&(a.iconName=t.firstChild.data)),a}function fs(t){var e=ge(t.attributes).reduce(function(a,i){return a.name!=="class"&&a.name!=="style"&&(a[i.name]=i.value),a},{}),n=t.getAttribute("title"),r=t.getAttribute("data-fa-title-id");return p.autoA11y&&(n?e["aria-labelledby"]="".concat(p.replacementClass,"-title-").concat(r||_e()):(e["aria-hidden"]="true",e.focusable="false")),e}function ds(){return{iconName:null,title:null,titleId:null,prefix:null,transform:H,symbol:!1,mask:{iconName:null,prefix:null,rest:[]},maskId:null,extra:{classes:[],styles:{},attributes:{}}}}function Un(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{styleParser:!0},n=cs(t),r=n.iconName,a=n.prefix,i=n.rest,s=fs(t),o=Mt("parseNodeAttributes",{},t),l=e.styleParser?us(t):[];return m({iconName:r,title:t.getAttribute("title"),titleId:t.getAttribute("data-fa-title-id"),prefix:a,transform:H,mask:{iconName:null,prefix:null,rest:[]},maskId:null,symbol:!1,extra:{classes:i,styles:l,attributes:s}},o)}var hs=z.styles;function Kr(t){var e=p.autoReplaceSvg==="nest"?Un(t,{styleParser:!1}):Un(t);return~e.extra.classes.indexOf(Pr)?G("generateLayersText",t,e):G("generateSvgReplacementMutation",t,e)}var ne=new Set;Gt.map(function(t){ne.add("fa-".concat(t))});Object.keys(Oe[E]).map(ne.add.bind(ne));Object.keys(Oe[I]).map(ne.add.bind(ne));ne=Re(ne);function zn(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;if(!X)return Promise.resolve();var n=R.documentElement.classList,r=function(f){return n.add("".concat(In,"-").concat(f))},a=function(f){return n.remove("".concat(In,"-").concat(f))},i=p.autoFetchSvg?ne:Gt.map(function(u){return"fa-".concat(u)}).concat(Object.keys(hs));i.includes("fa")||i.push("fa");var s=[".".concat(Pr,":not([").concat(le,"])")].concat(i.map(function(u){return".".concat(u,":not([").concat(le,"])")})).join(", ");if(s.length===0)return Promise.resolve();var o=[];try{o=ge(t.querySelectorAll(s))}catch{}if(o.length>0)r("pending"),a("complete");else return Promise.resolve();var l=nn.begin("onTree"),c=o.reduce(function(u,f){try{var d=Kr(f);d&&u.push(d)}catch(h){Cr||h.name==="MissingIcon"&&console.error(h)}return u},[]);return new Promise(function(u,f){Promise.all(c).then(function(d){zr(d,function(){r("active"),r("complete"),a("pending"),typeof e=="function"&&e(),l(),u()})}).catch(function(d){l(),f(d)})})}function ms(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;Kr(t).then(function(n){n&&zr([n],e)})}function ps(t){return function(e){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=(e||{}).icon?e:$t(e||{}),a=n.mask;return a&&(a=(a||{}).icon?a:$t(a||{})),t(r,m(m({},n),{},{mask:a}))}}var vs=function(e){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=n.transform,a=r===void 0?H:r,i=n.symbol,s=i===void 0?!1:i,o=n.mask,l=o===void 0?null:o,c=n.maskId,u=c===void 0?null:c,f=n.title,d=f===void 0?null:f,h=n.titleId,g=h===void 0?null:h,y=n.classes,v=y===void 0?[]:y,S=n.attributes,O=S===void 0?{}:S,b=n.styles,C=b===void 0?{}:b;if(e){var A=e.prefix,k=e.iconName,w=e.icon;return ft(m({type:"icon"},e),function(){return ue("beforeDOMElementCreation",{iconDefinition:e,params:n}),p.autoA11y&&(d?O["aria-labelledby"]="".concat(p.replacementClass,"-title-").concat(g||_e()):(O["aria-hidden"]="true",O.focusable="false")),tn({icons:{main:Dt(w),mask:l?Dt(l.icon):{found:!1,width:null,height:null,icon:{}}},prefix:A,iconName:k,transform:m(m({},H),a),symbol:s,title:d,maskId:u,titleId:g,extra:{attributes:O,styles:C,classes:v}})})}},gs={mixout:function(){return{icon:ps(vs)}},hooks:function(){return{mutationObserverCallbacks:function(n){return n.treeCallback=zn,n.nodeCallback=ms,n}}},provides:function(e){e.i2svg=function(n){var r=n.node,a=r===void 0?R:r,i=n.callback,s=i===void 0?function(){}:i;return zn(a,s)},e.generateSvgReplacementMutation=function(n,r){var a=r.iconName,i=r.title,s=r.titleId,o=r.prefix,l=r.transform,c=r.symbol,u=r.mask,f=r.maskId,d=r.extra;return new Promise(function(h,g){Promise.all([Nt(a,o),u.iconName?Nt(u.iconName,u.prefix):Promise.resolve({found:!1,width:512,height:512,icon:{}})]).then(function(y){var v=Kt(y,2),S=v[0],O=v[1];h([n,tn({icons:{main:S,mask:O},prefix:o,iconName:a,transform:l,symbol:c,maskId:f,title:i,titleId:s,extra:d,watchable:!0})])}).catch(g)})},e.generateAbstractIcon=function(n){var r=n.children,a=n.attributes,i=n.main,s=n.transform,o=n.styles,l=lt(o);l.length>0&&(a.style=l);var c;return Vt(s)&&(c=G("generateAbstractTransformGrouping",{main:i,transform:s,containerWidth:i.width,iconWidth:i.width})),r.push(c||i.icon),{children:r,attributes:a}}}},ys={mixout:function(){return{layer:function(n){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=r.classes,i=a===void 0?[]:a;return ft({type:"layer"},function(){ue("beforeDOMElementCreation",{assembler:n,params:r});var s=[];return n(function(o){Array.isArray(o)?o.map(function(l){s=s.concat(l.abstract)}):s=s.concat(o.abstract)}),[{tag:"span",attributes:{class:["".concat(p.cssPrefix,"-layers")].concat(Re(i)).join(" ")},children:s}]})}}}},bs={mixout:function(){return{counter:function(n){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=r.title,i=a===void 0?null:a,s=r.classes,o=s===void 0?[]:s,l=r.attributes,c=l===void 0?{}:l,u=r.styles,f=u===void 0?{}:u;return ft({type:"counter",content:n},function(){return ue("beforeDOMElementCreation",{content:n,params:r}),Ji({content:n.toString(),title:i,extra:{attributes:c,styles:f,classes:["".concat(p.cssPrefix,"-layers-counter")].concat(Re(o))}})})}}}},ws={mixout:function(){return{text:function(n){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=r.transform,i=a===void 0?H:a,s=r.title,o=s===void 0?null:s,l=r.classes,c=l===void 0?[]:l,u=r.attributes,f=u===void 0?{}:u,d=r.styles,h=d===void 0?{}:d;return ft({type:"text",content:n},function(){return ue("beforeDOMElementCreation",{content:n,params:r}),Nn({content:n,transform:m(m({},H),i),title:o,extra:{attributes:f,styles:h,classes:["".concat(p.cssPrefix,"-layers-text")].concat(Re(c))}})})}}},provides:function(e){e.generateLayersText=function(n,r){var a=r.title,i=r.transform,s=r.extra,o=null,l=null;if(Sr){var c=parseInt(getComputedStyle(n).fontSize,10),u=n.getBoundingClientRect();o=u.width/c,l=u.height/c}return p.autoA11y&&!a&&(s.attributes["aria-hidden"]="true"),Promise.resolve([n,Nn({content:n.innerHTML,width:o,height:l,transform:i,title:a,extra:s,watchable:!0})])}}},ks=new RegExp('"',"ug"),Yn=[1105920,1112319];function xs(t){var e=t.replace(ks,""),n=$i(e,0),r=n>=Yn[0]&&n<=Yn[1],a=e.length===2?e[0]===e[1]:!1;return{value:Tt(a?e[0]:e),isSecondary:r||a}}function Kn(t,e){var n="".concat(ci).concat(e.replace(":","-"));return new Promise(function(r,a){if(t.getAttribute(n)!==null)return r();var i=ge(t.children),s=i.filter(function(w){return w.getAttribute(It)===e})[0],o=ee.getComputedStyle(t,e),l=o.getPropertyValue("font-family").match(pi),c=o.getPropertyValue("font-weight"),u=o.getPropertyValue("content");if(s&&!l)return t.removeChild(s),r();if(l&&u!=="none"&&u!==""){var f=o.getPropertyValue("content"),d=~["Sharp"].indexOf(l[2])?I:E,h=~["Solid","Regular","Light","Thin","Duotone","Brands","Kit"].indexOf(l[2])?Ae[d][l[2].toLowerCase()]:vi[d][c],g=xs(f),y=g.value,v=g.isSecondary,S=l[0].startsWith("FontAwesome"),O=Zt(h,y),b=O;if(S){var C=Ui(y);C.iconName&&C.prefix&&(O=C.iconName,h=C.prefix)}if(O&&!v&&(!s||s.getAttribute(Bt)!==h||s.getAttribute(Wt)!==b)){t.setAttribute(n,b),s&&t.removeChild(s);var A=ds(),k=A.extra;k.attributes[It]=e,Nt(O,h).then(function(w){var x=tn(m(m({},A),{},{icons:{main:w,mask:en()},prefix:h,iconName:b,extra:k,watchable:!0})),_=R.createElement("svg");e==="::before"?t.insertBefore(_,t.firstChild):t.appendChild(_),_.outerHTML=x.map(function(M){return Te(M)}).join(`
`),t.removeAttribute(n),r()}).catch(a)}else r()}else r()})}function Ss(t){return Promise.all([Kn(t,"::before"),Kn(t,"::after")])}function Os(t){return t.parentNode!==document.head&&!~di.indexOf(t.tagName.toUpperCase())&&!t.getAttribute(It)&&(!t.parentNode||t.parentNode.tagName!=="svg")}function Hn(t){if(X)return new Promise(function(e,n){var r=ge(t.querySelectorAll("*")).filter(Os).map(Ss),a=nn.begin("searchPseudoElements");Yr(),Promise.all(r).then(function(){a(),qt(),e()}).catch(function(){a(),qt(),n()})})}var As={hooks:function(){return{mutationObserverCallbacks:function(n){return n.pseudoElementsCallback=Hn,n}}},provides:function(e){e.pseudoElements2svg=function(n){var r=n.node,a=r===void 0?R:r;p.searchPseudoElements&&Hn(a)}}},Bn=!1,Cs={mixout:function(){return{dom:{unwatch:function(){Yr(),Bn=!0}}}},hooks:function(){return{bootstrap:function(){jn(Mt("mutationObserverCallbacks",{}))},noAuto:function(){ls()},watch:function(n){var r=n.observeMutationsRoot;Bn?qt():jn(Mt("mutationObserverCallbacks",{observeMutationsRoot:r}))}}}},Wn=function(e){var n={size:16,x:0,y:0,flipX:!1,flipY:!1,rotate:0};return e.toLowerCase().split(" ").reduce(function(r,a){var i=a.toLowerCase().split("-"),s=i[0],o=i.slice(1).join("-");if(s&&o==="h")return r.flipX=!0,r;if(s&&o==="v")return r.flipY=!0,r;if(o=parseFloat(o),isNaN(o))return r;switch(s){case"grow":r.size=r.size+o;break;case"shrink":r.size=r.size-o;break;case"left":r.x=r.x-o;break;case"right":r.x=r.x+o;break;case"up":r.y=r.y-o;break;case"down":r.y=r.y+o;break;case"rotate":r.rotate=r.rotate+o;break}return r},n)},Ps={mixout:function(){return{parse:{transform:function(n){return Wn(n)}}}},hooks:function(){return{parseNodeAttributes:function(n,r){var a=r.getAttribute("data-fa-transform");return a&&(n.transform=Wn(a)),n}}},provides:function(e){e.generateAbstractTransformGrouping=function(n){var r=n.main,a=n.transform,i=n.containerWidth,s=n.iconWidth,o={transform:"translate(".concat(i/2," 256)")},l="translate(".concat(a.x*32,", ").concat(a.y*32,") "),c="scale(".concat(a.size/16*(a.flipX?-1:1),", ").concat(a.size/16*(a.flipY?-1:1),") "),u="rotate(".concat(a.rotate," 0 0)"),f={transform:"".concat(l," ").concat(c," ").concat(u)},d={transform:"translate(".concat(s/2*-1," -256)")},h={outer:o,inner:f,path:d};return{tag:"g",attributes:m({},h.outer),children:[{tag:"g",attributes:m({},h.inner),children:[{tag:r.icon.tag,children:r.icon.children,attributes:m(m({},r.icon.attributes),h.path)}]}]}}}},bt={x:0,y:0,width:"100%",height:"100%"};function Gn(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;return t.attributes&&(t.attributes.fill||e)&&(t.attributes.fill="black"),t}function _s(t){return t.tag==="g"?t.children:[t]}var Es={hooks:function(){return{parseNodeAttributes:function(n,r){var a=r.getAttribute("data-fa-mask"),i=a?ct(a.split(" ").map(function(s){return s.trim()})):en();return i.prefix||(i.prefix=te()),n.mask=i,n.maskId=r.getAttribute("data-fa-mask-id"),n}}},provides:function(e){e.generateAbstractMask=function(n){var r=n.children,a=n.attributes,i=n.main,s=n.mask,o=n.maskId,l=n.transform,c=i.width,u=i.icon,f=s.width,d=s.icon,h=Pi({transform:l,containerWidth:f,iconWidth:c}),g={tag:"rect",attributes:m(m({},bt),{},{fill:"white"})},y=u.children?{children:u.children.map(Gn)}:{},v={tag:"g",attributes:m({},h.inner),children:[Gn(m({tag:u.tag,attributes:m(m({},u.attributes),h.path)},y))]},S={tag:"g",attributes:m({},h.outer),children:[v]},O="mask-".concat(o||_e()),b="clip-".concat(o||_e()),C={tag:"mask",attributes:m(m({},bt),{},{id:O,maskUnits:"userSpaceOnUse",maskContentUnits:"userSpaceOnUse"}),children:[g,S]},A={tag:"defs",children:[{tag:"clipPath",attributes:{id:b},children:_s(d)},C]};return r.push(A,{tag:"rect",attributes:m({fill:"currentColor","clip-path":"url(#".concat(b,")"),mask:"url(#".concat(O,")")},bt)}),{children:r,attributes:a}}}},Rs={provides:function(e){var n=!1;ee.matchMedia&&(n=ee.matchMedia("(prefers-reduced-motion: reduce)").matches),e.missingIconAbstract=function(){var r=[],a={fill:"currentColor"},i={attributeType:"XML",repeatCount:"indefinite",dur:"2s"};r.push({tag:"path",attributes:m(m({},a),{},{d:"M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z"})});var s=m(m({},i),{},{attributeName:"opacity"}),o={tag:"circle",attributes:m(m({},a),{},{cx:"256",cy:"364",r:"28"}),children:[]};return n||o.children.push({tag:"animate",attributes:m(m({},i),{},{attributeName:"r",values:"28;14;28;28;14;28;"})},{tag:"animate",attributes:m(m({},s),{},{values:"1;0;1;1;0;1;"})}),r.push(o),r.push({tag:"path",attributes:m(m({},a),{},{opacity:"1",d:"M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z"}),children:n?[]:[{tag:"animate",attributes:m(m({},s),{},{values:"1;0;0;0;0;1;"})}]}),n||r.push({tag:"path",attributes:m(m({},a),{},{opacity:"0",d:"M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z"}),children:[{tag:"animate",attributes:m(m({},s),{},{values:"0;0;1;1;0;0;"})}]}),{tag:"g",attributes:{class:"missing"},children:r}}}},Is={hooks:function(){return{parseNodeAttributes:function(n,r){var a=r.getAttribute("data-fa-symbol"),i=a===null?!1:a===""?!0:a;return n.symbol=i,n}}}},Ts=[Ri,gs,ys,bs,ws,As,Cs,Ps,Es,Rs,Is];Ki(Ts,{mixoutsTo:N});N.noAuto;N.config;N.library;N.dom;N.parse;N.findIconDefinition;N.toHtml;N.icon;N.layer;N.text;N.counter;const Fs=Q('<div class="col-span-12 grid auto-rows-min grid-cols-1"><h2 class="text-center text-xl font-semibold">You are currently logged out.</h2><div><p class="py-8 text-center">You must login to this app through Spotify in order to view your duplicate songs</p><div class="flex justify-center"><button class="flex items-center justify-start rounded-lg border-2 border-green-900 bg-green-600 p-2 text-center text-gray-200"><!#><!/>Click here to login through Spotify</button></div></div></div>',14);function Ms(t){return(()=>{const e=D(Fs),n=e.firstChild,r=n.nextSibling,a=r.firstChild,i=a.nextSibling,s=i.firstChild,o=s.firstChild,[l,c]=j(o.nextSibling);return l.nextSibling,s.$$click=()=>{t.spotifyClient&&t.spotifyClient.initiateAuthFlow()},$(s,K(We,{class:"mr-2 w-[1em] fill-[currentColor]"}),l,c),Ve(),e})()}tr(["click"]);function Hr(t){var e,n,r="";if(typeof t=="string"||typeof t=="number")r+=t;else if(typeof t=="object")if(Array.isArray(t))for(e=0;e<t.length;e++)t[e]&&(n=Hr(t[e]))&&(r&&(r+=" "),r+=n);else for(e in t)t[e]&&(r&&(r+=" "),r+=e);return r}function Xn(){for(var t,e,n=0,r="";n<arguments.length;)(t=arguments[n++])&&(e=Hr(t))&&(r&&(r+=" "),r+=e);return r}const $s=Q('<div class="relative flex h-full w-full flex-col"><div class="relative flex-grow overflow-y-clip"><div class="grid h-full grid-cols-12 grid-rows-[auto_auto_1fr] overflow-y-auto"><div id="top-shadow-trigger"></div><div></div><div></div><h1 class="col-span-12 h-fit px-10 py-4 text-center text-4xl font-bold">Spotify Song Deduplicator</h1><!#><!/><!#><!/><div id="bottom-shadow-trigger" class="-mt-1"></div></div></div></div>',20),Ds=Q('<div class="col-span-12 flex justify-center"><div class="h-16 w-16  animate-spin rounded-full border-8 border-solid border-gray-400 border-t-green-300 text-center"></div></div>',4),Ns=new Fa,qs=()=>{const[t,e]=fe(null),[n,r]=fe(!1),[a,i]=fe(!1),[s,o]=fe();return Qt(async()=>{const l=new IntersectionObserver(c=>{console.log("observing");for(const u of c)u.target.id==="top-shadow-trigger"?r(!u.isIntersecting):u.target.id==="bottom-shadow-trigger"&&i(!u.isIntersecting)});l.observe(document.getElementById("top-shadow-trigger")),l.observe(document.getElementById("bottom-shadow-trigger")),o(new ya({onReady:c=>e(c)}))}),K(Ya,{client:Ns,get children(){const l=D($s),c=l.firstChild,u=c.firstChild,f=u.firstChild,d=f.nextSibling,h=d.nextSibling,g=h.nextSibling,y=g.nextSibling,[v,S]=j(y.nextSibling),O=v.nextSibling,[b,C]=j(O.nextSibling);return b.nextSibling,$(u,(()=>{const A=Z(()=>t()===null);return()=>A()&&D(Ds)})(),v,S),$(u,(()=>{const A=Z(()=>t()!==null);return()=>A()&&(t()?K(ei,{get spotifyClient(){return s()}}):K(Ms,{get spotifyClient(){return s()}}))})(),b,C),He(A=>{const k=Xn(a()&&"shadow-[inset_0px_-40px_20px_-20px_rgba(0,0,0,0.3)]","pointer-events-none absolute top-0 z-10 h-full w-full transition-[box-shadow] duration-500 delay-50"),w=Xn(n()&&"shadow-[inset_0_40px_20px_-20px_rgba(0,0,0,0.3)]","pointer-events-none absolute top-0 z-10 h-full w-full transition-[box-shadow] duration-500 delay-50");return k!==A._v$&&ln(d,A._v$=k),w!==A._v$2&&ln(h,A._v$2=w),A},{_v$:void 0,_v$2:void 0}),l}})};export{qs as default};
