import{$ as re,a as Vt,g as Un,b as lt,c as se,m as zn,o as It,d as Yn,e as q,f as Kn,u as Jt,h as qr,i as ut,j as Qr,k as ce,s as jr,l as D,n as Ur,r as Tt,t as L,p as Hn,q as j,v as N,F as zr,w as ct,x as Zt,y as ft}from"./web.09441124.js";const dt="928713b0001c4592a9910f798369bffb",Bn="spotify_code_verifier",Wn="spotify_access_token",Gn="spotify_refresh_token",de=()=>window.localStorage,Yr=()=>de().getItem(Wn),en=t=>de().setItem(Wn,t),Kr=()=>de().getItem(Gn),tn=t=>de().setItem(Gn,t),Hr=()=>de().getItem(Bn),Br=t=>de().setItem(Bn,t),Wr=()=>new URLSearchParams(window.location.search).get("code");function Gr(t){let e="";const n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";for(let r=0;r<t;r++)e+=n.charAt(Math.floor(Math.random()*n.length));return e}async function Xr(t){const e=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(t));return btoa(String.fromCharCode(...new Uint8Array(e))).replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_")}const nn=()=>{window.localStorage.clear(),window.sessionStorage.clear()},rn=()=>{window.location.href=window.location.href.split("?")[0]},Vr=async({code:t,codeVerifier:e})=>{const n=await fetch("https://accounts.spotify.com/api/token?"+new URLSearchParams({code:t,redirect_uri:"https://willwill96.github.io/spotify-song-deduplication",grant_type:"authorization_code",code_verifier:e,client_id:dt}).toString(),{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"}});if(n.status!==200)throw new Error("Bad authorization_code");return n.json()};class Jr{loggedIn=!1;tokenAcquisitionPromise=null;onReady;constructor(e={}){const{onReady:n=()=>{}}=e;this.onReady=n;const r=Hr(),a=Wr();r&&a?this.doTokenInitialization({code:a,codeVerifier:r}):this.determineIfLoggedIn()}doTokenInitialization({code:e,codeVerifier:n}){const r=async()=>{try{const a=await Vr({code:e,codeVerifier:n});en(a.access_token),tn(a.refresh_token)}catch(a){console.log("Error getting access tokens",a),nn(),rn()}this.loggedIn=!0,this.tokenAcquisitionPromise=null,window.history.replaceState(null,"",window.location.pathname.split("?")[0]),this.onReady(this.loggedIn)};this.tokenAcquisitionPromise=r()}async attemptAccessTokenRefresh(){const e=Kr();if(!e)throw new Error("Invalid Refresh Token");const n=await fetch("https://accounts.spotify.com/api/token?"+new URLSearchParams({grant_type:"refresh_token",refresh_token:e,client_id:dt}).toString(),{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"}});if(n.status!==200)throw new Error("Something went wrong in refresh token acquisition");const{access_token:r,refresh_token:a}=await n.json();en(r),a&&tn(a)}async determineIfLoggedIn(){try{await this.fetchSpotifyRoute("https://api.spotify.com/v1/me"),this.loggedIn=!0,this.onReady(this.loggedIn)}catch{this.onReady(!1)}}async fetchSpotifyRoute(e){this.tokenAcquisitionPromise&&await this.tokenAcquisitionPromise;const n=Yr();if(!n)throw new Error("No Access Token Found");try{const r=await await fetch(e,{headers:{Authorization:"Bearer "+n,"Content-Type":"application/json"}});if(r.status===200)return r.json();if(r.status===401)return this.tokenAcquisitionPromise?(await this.tokenAcquisitionPromise,this.fetchSpotifyRoute(e)):(this.tokenAcquisitionPromise=this.attemptAccessTokenRefresh(),await this.tokenAcquisitionPromise,this.tokenAcquisitionPromise=null,this.fetchSpotifyRoute(e));throw new Error("Not authenticated")}catch{nn(),rn()}return null}async initiateAuthFlow(){const e=Gr(64);Br(e),window.location.href="https://accounts.spotify.com/authorize?"+new URLSearchParams({response_type:"code",client_id:dt,scope:"playlist-read-private playlist-modify-private playlist-modify-public playlist-read-collaborative",redirect_uri:"https://willwill96.github.io/spotify-song-deduplication",code_challenge_method:"S256",code_challenge:await Xr(e)}).toString()}}class Ce{constructor(){this.listeners=[],this.subscribe=this.subscribe.bind(this)}subscribe(e){return this.listeners.push(e),this.onSubscribe(),()=>{this.listeners=this.listeners.filter(n=>n!==e),this.onUnsubscribe()}}hasListeners(){return this.listeners.length>0}onSubscribe(){}onUnsubscribe(){}}const be=typeof window>"u"||"Deno"in window;function M(){}function Zr(t,e){return typeof t=="function"?t(e):t}function ht(t){return typeof t=="number"&&t>=0&&t!==1/0}function Xn(t,e){return Math.max(t+(e||0)-Date.now(),0)}function Re(t,e,n){return Ve(t)?typeof e=="function"?{...n,queryKey:t,queryFn:e}:{...e,queryKey:t}:t}function X(t,e,n){return Ve(t)?[{...e,queryKey:t},n]:[t||{},e]}function an(t,e){const{type:n="all",exact:r,fetchStatus:a,predicate:i,queryKey:s,stale:o}=t;if(Ve(s)){if(r){if(e.queryHash!==Ft(s,e.options))return!1}else if(!ze(e.queryKey,s))return!1}if(n!=="all"){const l=e.isActive();if(n==="active"&&!l||n==="inactive"&&l)return!1}return!(typeof o=="boolean"&&e.isStale()!==o||typeof a<"u"&&a!==e.state.fetchStatus||i&&!i(e))}function sn(t,e){const{exact:n,fetching:r,predicate:a,mutationKey:i}=t;if(Ve(i)){if(!e.options.mutationKey)return!1;if(n){if(ee(e.options.mutationKey)!==ee(i))return!1}else if(!ze(e.options.mutationKey,i))return!1}return!(typeof r=="boolean"&&e.state.status==="loading"!==r||a&&!a(e))}function Ft(t,e){return(e?.queryKeyHashFn||ee)(t)}function ee(t){return JSON.stringify(t,(e,n)=>mt(n)?Object.keys(n).sort().reduce((r,a)=>(r[a]=n[a],r),{}):n)}function ze(t,e){return Vn(t,e)}function Vn(t,e){return t===e?!0:typeof t!=typeof e?!1:t&&e&&typeof t=="object"&&typeof e=="object"?!Object.keys(e).some(n=>!Vn(t[n],e[n])):!1}function Jn(t,e){if(t===e)return t;const n=ln(t)&&ln(e);if(n||mt(t)&&mt(e)){const r=n?t.length:Object.keys(t).length,a=n?e:Object.keys(e),i=a.length,s=n?[]:{};let o=0;for(let l=0;l<i;l++){const f=n?l:a[l];s[f]=Jn(t[f],e[f]),s[f]===t[f]&&o++}return r===i&&o===r?t:s}return e}function on(t,e){if(t&&!e||e&&!t)return!1;for(const n in t)if(t[n]!==e[n])return!1;return!0}function ln(t){return Array.isArray(t)&&t.length===Object.keys(t).length}function mt(t){if(!un(t))return!1;const e=t.constructor;if(typeof e>"u")return!0;const n=e.prototype;return!(!un(n)||!n.hasOwnProperty("isPrototypeOf"))}function un(t){return Object.prototype.toString.call(t)==="[object Object]"}function Ve(t){return Array.isArray(t)}function Zn(t){return new Promise(e=>{setTimeout(e,t)})}function cn(t){Zn(0).then(t)}function ea(){if(typeof AbortController=="function")return new AbortController}function vt(t,e,n){return n.isDataEqual!=null&&n.isDataEqual(t,e)?t:typeof n.structuralSharing=="function"?n.structuralSharing(t,e):n.structuralSharing!==!1?Jn(t,e):e}class ta extends Ce{constructor(){super(),this.setup=e=>{if(!be&&window.addEventListener){const n=()=>e();return window.addEventListener("visibilitychange",n,!1),window.addEventListener("focus",n,!1),()=>{window.removeEventListener("visibilitychange",n),window.removeEventListener("focus",n)}}}}onSubscribe(){this.cleanup||this.setEventListener(this.setup)}onUnsubscribe(){if(!this.hasListeners()){var e;(e=this.cleanup)==null||e.call(this),this.cleanup=void 0}}setEventListener(e){var n;this.setup=e,(n=this.cleanup)==null||n.call(this),this.cleanup=e(r=>{typeof r=="boolean"?this.setFocused(r):this.onFocus()})}setFocused(e){this.focused=e,e&&this.onFocus()}onFocus(){this.listeners.forEach(e=>{e()})}isFocused(){return typeof this.focused=="boolean"?this.focused:typeof document>"u"?!0:[void 0,"visible","prerender"].includes(document.visibilityState)}}const Ye=new ta;class na extends Ce{constructor(){super(),this.setup=e=>{if(!be&&window.addEventListener){const n=()=>e();return window.addEventListener("online",n,!1),window.addEventListener("offline",n,!1),()=>{window.removeEventListener("online",n),window.removeEventListener("offline",n)}}}}onSubscribe(){this.cleanup||this.setEventListener(this.setup)}onUnsubscribe(){if(!this.hasListeners()){var e;(e=this.cleanup)==null||e.call(this),this.cleanup=void 0}}setEventListener(e){var n;this.setup=e,(n=this.cleanup)==null||n.call(this),this.cleanup=e(r=>{typeof r=="boolean"?this.setOnline(r):this.onOnline()})}setOnline(e){this.online=e,e&&this.onOnline()}onOnline(){this.listeners.forEach(e=>{e()})}isOnline(){return typeof this.online=="boolean"?this.online:typeof navigator>"u"||typeof navigator.onLine>"u"?!0:navigator.onLine}}const Ke=new na;function ra(t){return Math.min(1e3*2**t,3e4)}function Je(t){return(t??"online")==="online"?Ke.isOnline():!0}class er{constructor(e){this.revert=e?.revert,this.silent=e?.silent}}function Qe(t){return t instanceof er}function tr(t){let e=!1,n=0,r=!1,a,i,s;const o=new Promise((p,S)=>{i=p,s=S}),l=p=>{r||(h(new er(p)),t.abort==null||t.abort())},f=()=>{e=!0},u=()=>{e=!1},c=()=>!Ye.isFocused()||t.networkMode!=="always"&&!Ke.isOnline(),d=p=>{r||(r=!0,t.onSuccess==null||t.onSuccess(p),a?.(),i(p))},h=p=>{r||(r=!0,t.onError==null||t.onError(p),a?.(),s(p))},g=()=>new Promise(p=>{a=S=>{const A=r||!c();return A&&p(S),A},t.onPause==null||t.onPause()}).then(()=>{a=void 0,r||t.onContinue==null||t.onContinue()}),y=()=>{if(r)return;let p;try{p=t.fn()}catch(S){p=Promise.reject(S)}Promise.resolve(p).then(d).catch(S=>{var A,b;if(r)return;const C=(A=t.retry)!=null?A:3,O=(b=t.retryDelay)!=null?b:ra,x=typeof O=="function"?O(n,S):O,w=C===!0||typeof C=="number"&&n<C||typeof C=="function"&&C(n,S);if(e||!w){h(S);return}n++,t.onFail==null||t.onFail(n,S),Zn(x).then(()=>{if(c())return g()}).then(()=>{e?h(S):y()})})};return Je(t.networkMode)?y():g().then(y),{promise:o,cancel:l,continue:()=>a?.()?o:Promise.resolve(),cancelRetry:f,continueRetry:u}}const Mt=console;function aa(){let t=[],e=0,n=u=>{u()},r=u=>{u()};const a=u=>{let c;e++;try{c=u()}finally{e--,e||o()}return c},i=u=>{e?t.push(u):cn(()=>{n(u)})},s=u=>(...c)=>{i(()=>{u(...c)})},o=()=>{const u=t;t=[],u.length&&cn(()=>{r(()=>{u.forEach(c=>{n(c)})})})};return{batch:a,batchCalls:s,schedule:i,setNotifyFunction:u=>{n=u},setBatchNotifyFunction:u=>{r=u}}}const T=aa();class nr{destroy(){this.clearGcTimeout()}scheduleGc(){this.clearGcTimeout(),ht(this.cacheTime)&&(this.gcTimeout=setTimeout(()=>{this.optionalRemove()},this.cacheTime))}updateCacheTime(e){this.cacheTime=Math.max(this.cacheTime||0,e??(be?1/0:5*60*1e3))}clearGcTimeout(){this.gcTimeout&&(clearTimeout(this.gcTimeout),this.gcTimeout=void 0)}}class ia extends nr{constructor(e){super(),this.abortSignalConsumed=!1,this.defaultOptions=e.defaultOptions,this.setOptions(e.options),this.observers=[],this.cache=e.cache,this.logger=e.logger||Mt,this.queryKey=e.queryKey,this.queryHash=e.queryHash,this.initialState=e.state||sa(this.options),this.state=this.initialState,this.scheduleGc()}get meta(){return this.options.meta}setOptions(e){this.options={...this.defaultOptions,...e},this.updateCacheTime(this.options.cacheTime)}optionalRemove(){!this.observers.length&&this.state.fetchStatus==="idle"&&this.cache.remove(this)}setData(e,n){const r=vt(this.state.data,e,this.options);return this.dispatch({data:r,type:"success",dataUpdatedAt:n?.updatedAt,manual:n?.manual}),r}setState(e,n){this.dispatch({type:"setState",state:e,setStateOptions:n})}cancel(e){var n;const r=this.promise;return(n=this.retryer)==null||n.cancel(e),r?r.then(M).catch(M):Promise.resolve()}destroy(){super.destroy(),this.cancel({silent:!0})}reset(){this.destroy(),this.setState(this.initialState)}isActive(){return this.observers.some(e=>e.options.enabled!==!1)}isDisabled(){return this.getObserversCount()>0&&!this.isActive()}isStale(){return this.state.isInvalidated||!this.state.dataUpdatedAt||this.observers.some(e=>e.getCurrentResult().isStale)}isStaleByTime(e=0){return this.state.isInvalidated||!this.state.dataUpdatedAt||!Xn(this.state.dataUpdatedAt,e)}onFocus(){var e;const n=this.observers.find(r=>r.shouldFetchOnWindowFocus());n&&n.refetch({cancelRefetch:!1}),(e=this.retryer)==null||e.continue()}onOnline(){var e;const n=this.observers.find(r=>r.shouldFetchOnReconnect());n&&n.refetch({cancelRefetch:!1}),(e=this.retryer)==null||e.continue()}addObserver(e){this.observers.indexOf(e)===-1&&(this.observers.push(e),this.clearGcTimeout(),this.cache.notify({type:"observerAdded",query:this,observer:e}))}removeObserver(e){this.observers.indexOf(e)!==-1&&(this.observers=this.observers.filter(n=>n!==e),this.observers.length||(this.retryer&&(this.abortSignalConsumed?this.retryer.cancel({revert:!0}):this.retryer.cancelRetry()),this.scheduleGc()),this.cache.notify({type:"observerRemoved",query:this,observer:e}))}getObserversCount(){return this.observers.length}invalidate(){this.state.isInvalidated||this.dispatch({type:"invalidate"})}fetch(e,n){var r,a;if(this.state.fetchStatus!=="idle"){if(this.state.dataUpdatedAt&&n!=null&&n.cancelRefetch)this.cancel({silent:!0});else if(this.promise){var i;return(i=this.retryer)==null||i.continueRetry(),this.promise}}if(e&&this.setOptions(e),!this.options.queryFn){const h=this.observers.find(g=>g.options.queryFn);h&&this.setOptions(h.options)}Array.isArray(this.options.queryKey);const s=ea(),o={queryKey:this.queryKey,pageParam:void 0,meta:this.meta},l=h=>{Object.defineProperty(h,"signal",{enumerable:!0,get:()=>{if(s)return this.abortSignalConsumed=!0,s.signal}})};l(o);const f=()=>this.options.queryFn?(this.abortSignalConsumed=!1,this.options.queryFn(o)):Promise.reject("Missing queryFn"),u={fetchOptions:n,options:this.options,queryKey:this.queryKey,state:this.state,fetchFn:f};if(l(u),(r=this.options.behavior)==null||r.onFetch(u),this.revertState=this.state,this.state.fetchStatus==="idle"||this.state.fetchMeta!==((a=u.fetchOptions)==null?void 0:a.meta)){var c;this.dispatch({type:"fetch",meta:(c=u.fetchOptions)==null?void 0:c.meta})}const d=h=>{if(Qe(h)&&h.silent||this.dispatch({type:"error",error:h}),!Qe(h)){var g,y,p,S;(g=(y=this.cache.config).onError)==null||g.call(y,h,this),(p=(S=this.cache.config).onSettled)==null||p.call(S,this.state.data,h,this)}this.isFetchingOptimistic||this.scheduleGc(),this.isFetchingOptimistic=!1};return this.retryer=tr({fn:u.fetchFn,abort:s?.abort.bind(s),onSuccess:h=>{var g,y,p,S;if(typeof h>"u"){d(new Error("undefined"));return}this.setData(h),(g=(y=this.cache.config).onSuccess)==null||g.call(y,h,this),(p=(S=this.cache.config).onSettled)==null||p.call(S,h,this.state.error,this),this.isFetchingOptimistic||this.scheduleGc(),this.isFetchingOptimistic=!1},onError:d,onFail:(h,g)=>{this.dispatch({type:"failed",failureCount:h,error:g})},onPause:()=>{this.dispatch({type:"pause"})},onContinue:()=>{this.dispatch({type:"continue"})},retry:u.options.retry,retryDelay:u.options.retryDelay,networkMode:u.options.networkMode}),this.promise=this.retryer.promise,this.promise}dispatch(e){const n=r=>{var a,i;switch(e.type){case"failed":return{...r,fetchFailureCount:e.failureCount,fetchFailureReason:e.error};case"pause":return{...r,fetchStatus:"paused"};case"continue":return{...r,fetchStatus:"fetching"};case"fetch":return{...r,fetchFailureCount:0,fetchFailureReason:null,fetchMeta:(a=e.meta)!=null?a:null,fetchStatus:Je(this.options.networkMode)?"fetching":"paused",...!r.dataUpdatedAt&&{error:null,status:"loading"}};case"success":return{...r,data:e.data,dataUpdateCount:r.dataUpdateCount+1,dataUpdatedAt:(i=e.dataUpdatedAt)!=null?i:Date.now(),error:null,isInvalidated:!1,status:"success",...!e.manual&&{fetchStatus:"idle",fetchFailureCount:0,fetchFailureReason:null}};case"error":const s=e.error;return Qe(s)&&s.revert&&this.revertState?{...this.revertState}:{...r,error:s,errorUpdateCount:r.errorUpdateCount+1,errorUpdatedAt:Date.now(),fetchFailureCount:r.fetchFailureCount+1,fetchFailureReason:s,fetchStatus:"idle",status:"error"};case"invalidate":return{...r,isInvalidated:!0};case"setState":return{...r,...e.state}}};this.state=n(this.state),T.batch(()=>{this.observers.forEach(r=>{r.onQueryUpdate(e)}),this.cache.notify({query:this,type:"updated",action:e})})}}function sa(t){const e=typeof t.initialData=="function"?t.initialData():t.initialData,n=typeof e<"u",r=n?typeof t.initialDataUpdatedAt=="function"?t.initialDataUpdatedAt():t.initialDataUpdatedAt:0;return{data:e,dataUpdateCount:0,dataUpdatedAt:n?r??Date.now():0,error:null,errorUpdateCount:0,errorUpdatedAt:0,fetchFailureCount:0,fetchFailureReason:null,fetchMeta:null,isInvalidated:!1,status:n?"success":"loading",fetchStatus:"idle"}}class oa extends Ce{constructor(e){super(),this.config=e||{},this.queries=[],this.queriesMap={}}build(e,n,r){var a;const i=n.queryKey,s=(a=n.queryHash)!=null?a:Ft(i,n);let o=this.get(s);return o||(o=new ia({cache:this,logger:e.getLogger(),queryKey:i,queryHash:s,options:e.defaultQueryOptions(n),state:r,defaultOptions:e.getQueryDefaults(i)}),this.add(o)),o}add(e){this.queriesMap[e.queryHash]||(this.queriesMap[e.queryHash]=e,this.queries.push(e),this.notify({type:"added",query:e}))}remove(e){const n=this.queriesMap[e.queryHash];n&&(e.destroy(),this.queries=this.queries.filter(r=>r!==e),n===e&&delete this.queriesMap[e.queryHash],this.notify({type:"removed",query:e}))}clear(){T.batch(()=>{this.queries.forEach(e=>{this.remove(e)})})}get(e){return this.queriesMap[e]}getAll(){return this.queries}find(e,n){const[r]=X(e,n);return typeof r.exact>"u"&&(r.exact=!0),this.queries.find(a=>an(r,a))}findAll(e,n){const[r]=X(e,n);return Object.keys(r).length>0?this.queries.filter(a=>an(r,a)):this.queries}notify(e){T.batch(()=>{this.listeners.forEach(n=>{n(e)})})}onFocus(){T.batch(()=>{this.queries.forEach(e=>{e.onFocus()})})}onOnline(){T.batch(()=>{this.queries.forEach(e=>{e.onOnline()})})}}class la extends nr{constructor(e){super(),this.defaultOptions=e.defaultOptions,this.mutationId=e.mutationId,this.mutationCache=e.mutationCache,this.logger=e.logger||Mt,this.observers=[],this.state=e.state||ua(),this.setOptions(e.options),this.scheduleGc()}setOptions(e){this.options={...this.defaultOptions,...e},this.updateCacheTime(this.options.cacheTime)}get meta(){return this.options.meta}setState(e){this.dispatch({type:"setState",state:e})}addObserver(e){this.observers.indexOf(e)===-1&&(this.observers.push(e),this.clearGcTimeout(),this.mutationCache.notify({type:"observerAdded",mutation:this,observer:e}))}removeObserver(e){this.observers=this.observers.filter(n=>n!==e),this.scheduleGc(),this.mutationCache.notify({type:"observerRemoved",mutation:this,observer:e})}optionalRemove(){this.observers.length||(this.state.status==="loading"?this.scheduleGc():this.mutationCache.remove(this))}continue(){var e,n;return(e=(n=this.retryer)==null?void 0:n.continue())!=null?e:this.execute()}async execute(){const e=()=>{var w;return this.retryer=tr({fn:()=>this.options.mutationFn?this.options.mutationFn(this.state.variables):Promise.reject("No mutationFn found"),onFail:(k,P)=>{this.dispatch({type:"failed",failureCount:k,error:P})},onPause:()=>{this.dispatch({type:"pause"})},onContinue:()=>{this.dispatch({type:"continue"})},retry:(w=this.options.retry)!=null?w:0,retryDelay:this.options.retryDelay,networkMode:this.options.networkMode}),this.retryer.promise},n=this.state.status==="loading";try{var r,a,i,s,o,l,f,u;if(!n){var c,d,h,g;this.dispatch({type:"loading",variables:this.options.variables}),await((c=(d=this.mutationCache.config).onMutate)==null?void 0:c.call(d,this.state.variables,this));const k=await((h=(g=this.options).onMutate)==null?void 0:h.call(g,this.state.variables));k!==this.state.context&&this.dispatch({type:"loading",context:k,variables:this.state.variables})}const w=await e();return await((r=(a=this.mutationCache.config).onSuccess)==null?void 0:r.call(a,w,this.state.variables,this.state.context,this)),await((i=(s=this.options).onSuccess)==null?void 0:i.call(s,w,this.state.variables,this.state.context)),await((o=(l=this.mutationCache.config).onSettled)==null?void 0:o.call(l,w,null,this.state.variables,this.state.context,this)),await((f=(u=this.options).onSettled)==null?void 0:f.call(u,w,null,this.state.variables,this.state.context)),this.dispatch({type:"success",data:w}),w}catch(w){try{var y,p,S,A,b,C,O,x;throw await((y=(p=this.mutationCache.config).onError)==null?void 0:y.call(p,w,this.state.variables,this.state.context,this)),await((S=(A=this.options).onError)==null?void 0:S.call(A,w,this.state.variables,this.state.context)),await((b=(C=this.mutationCache.config).onSettled)==null?void 0:b.call(C,void 0,w,this.state.variables,this.state.context,this)),await((O=(x=this.options).onSettled)==null?void 0:O.call(x,void 0,w,this.state.variables,this.state.context)),w}finally{this.dispatch({type:"error",error:w})}}}dispatch(e){const n=r=>{switch(e.type){case"failed":return{...r,failureCount:e.failureCount,failureReason:e.error};case"pause":return{...r,isPaused:!0};case"continue":return{...r,isPaused:!1};case"loading":return{...r,context:e.context,data:void 0,failureCount:0,failureReason:null,error:null,isPaused:!Je(this.options.networkMode),status:"loading",variables:e.variables};case"success":return{...r,data:e.data,failureCount:0,failureReason:null,error:null,status:"success",isPaused:!1};case"error":return{...r,data:void 0,error:e.error,failureCount:r.failureCount+1,failureReason:e.error,isPaused:!1,status:"error"};case"setState":return{...r,...e.state}}};this.state=n(this.state),T.batch(()=>{this.observers.forEach(r=>{r.onMutationUpdate(e)}),this.mutationCache.notify({mutation:this,type:"updated",action:e})})}}function ua(){return{context:void 0,data:void 0,error:null,failureCount:0,failureReason:null,isPaused:!1,status:"idle",variables:void 0}}class ca extends Ce{constructor(e){super(),this.config=e||{},this.mutations=[],this.mutationId=0}build(e,n,r){const a=new la({mutationCache:this,logger:e.getLogger(),mutationId:++this.mutationId,options:e.defaultMutationOptions(n),state:r,defaultOptions:n.mutationKey?e.getMutationDefaults(n.mutationKey):void 0});return this.add(a),a}add(e){this.mutations.push(e),this.notify({type:"added",mutation:e})}remove(e){this.mutations=this.mutations.filter(n=>n!==e),this.notify({type:"removed",mutation:e})}clear(){T.batch(()=>{this.mutations.forEach(e=>{this.remove(e)})})}getAll(){return this.mutations}find(e){return typeof e.exact>"u"&&(e.exact=!0),this.mutations.find(n=>sn(e,n))}findAll(e){return this.mutations.filter(n=>sn(e,n))}notify(e){T.batch(()=>{this.listeners.forEach(n=>{n(e)})})}resumePausedMutations(){var e;return this.resuming=((e=this.resuming)!=null?e:Promise.resolve()).then(()=>{const n=this.mutations.filter(r=>r.state.isPaused);return T.batch(()=>n.reduce((r,a)=>r.then(()=>a.continue().catch(M)),Promise.resolve()))}).then(()=>{this.resuming=void 0}),this.resuming}}function fa(){return{onFetch:t=>{t.fetchFn=()=>{var e,n,r,a,i,s;const o=(e=t.fetchOptions)==null||(n=e.meta)==null?void 0:n.refetchPage,l=(r=t.fetchOptions)==null||(a=r.meta)==null?void 0:a.fetchMore,f=l?.pageParam,u=l?.direction==="forward",c=l?.direction==="backward",d=((i=t.state.data)==null?void 0:i.pages)||[],h=((s=t.state.data)==null?void 0:s.pageParams)||[];let g=h,y=!1;const p=x=>{Object.defineProperty(x,"signal",{enumerable:!0,get:()=>{var w;if((w=t.signal)!=null&&w.aborted)y=!0;else{var k;(k=t.signal)==null||k.addEventListener("abort",()=>{y=!0})}return t.signal}})},S=t.options.queryFn||(()=>Promise.reject("Missing queryFn")),A=(x,w,k,P)=>(g=P?[w,...g]:[...g,w],P?[k,...x]:[...x,k]),b=(x,w,k,P)=>{if(y)return Promise.reject("Cancelled");if(typeof k>"u"&&!w&&x.length)return Promise.resolve(x);const z={queryKey:t.queryKey,pageParam:k,meta:t.options.meta};p(z);const me=S(z);return Promise.resolve(me).then(W=>A(x,k,W,P))};let C;if(!d.length)C=b([]);else if(u){const x=typeof f<"u",w=x?f:fn(t.options,d);C=b(d,x,w)}else if(c){const x=typeof f<"u",w=x?f:da(t.options,d);C=b(d,x,w,!0)}else{g=[];const x=typeof t.options.getNextPageParam>"u";C=(o&&d[0]?o(d[0],0,d):!0)?b([],x,h[0]):Promise.resolve(A([],h[0],d[0]));for(let k=1;k<d.length;k++)C=C.then(P=>{if(o&&d[k]?o(d[k],k,d):!0){const me=x?h[k]:fn(t.options,P);return b(P,x,me)}return Promise.resolve(A(P,h[k],d[k]))})}return C.then(x=>({pages:x,pageParams:g}))}}}}function fn(t,e){return t.getNextPageParam==null?void 0:t.getNextPageParam(e[e.length-1],e)}function da(t,e){return t.getPreviousPageParam==null?void 0:t.getPreviousPageParam(e[0],e)}class ha{constructor(e={}){this.queryCache=e.queryCache||new oa,this.mutationCache=e.mutationCache||new ca,this.logger=e.logger||Mt,this.defaultOptions=e.defaultOptions||{},this.queryDefaults=[],this.mutationDefaults=[],this.mountCount=0}mount(){this.mountCount++,this.mountCount===1&&(this.unsubscribeFocus=Ye.subscribe(()=>{Ye.isFocused()&&(this.resumePausedMutations(),this.queryCache.onFocus())}),this.unsubscribeOnline=Ke.subscribe(()=>{Ke.isOnline()&&(this.resumePausedMutations(),this.queryCache.onOnline())}))}unmount(){var e,n;this.mountCount--,this.mountCount===0&&((e=this.unsubscribeFocus)==null||e.call(this),this.unsubscribeFocus=void 0,(n=this.unsubscribeOnline)==null||n.call(this),this.unsubscribeOnline=void 0)}isFetching(e,n){const[r]=X(e,n);return r.fetchStatus="fetching",this.queryCache.findAll(r).length}isMutating(e){return this.mutationCache.findAll({...e,fetching:!0}).length}getQueryData(e,n){var r;return(r=this.queryCache.find(e,n))==null?void 0:r.state.data}ensureQueryData(e,n,r){const a=Re(e,n,r),i=this.getQueryData(a.queryKey);return i?Promise.resolve(i):this.fetchQuery(a)}getQueriesData(e){return this.getQueryCache().findAll(e).map(({queryKey:n,state:r})=>{const a=r.data;return[n,a]})}setQueryData(e,n,r){const a=this.queryCache.find(e),i=a?.state.data,s=Zr(n,i);if(typeof s>"u")return;const o=Re(e),l=this.defaultQueryOptions(o);return this.queryCache.build(this,l).setData(s,{...r,manual:!0})}setQueriesData(e,n,r){return T.batch(()=>this.getQueryCache().findAll(e).map(({queryKey:a})=>[a,this.setQueryData(a,n,r)]))}getQueryState(e,n){var r;return(r=this.queryCache.find(e,n))==null?void 0:r.state}removeQueries(e,n){const[r]=X(e,n),a=this.queryCache;T.batch(()=>{a.findAll(r).forEach(i=>{a.remove(i)})})}resetQueries(e,n,r){const[a,i]=X(e,n,r),s=this.queryCache,o={type:"active",...a};return T.batch(()=>(s.findAll(a).forEach(l=>{l.reset()}),this.refetchQueries(o,i)))}cancelQueries(e,n,r){const[a,i={}]=X(e,n,r);typeof i.revert>"u"&&(i.revert=!0);const s=T.batch(()=>this.queryCache.findAll(a).map(o=>o.cancel(i)));return Promise.all(s).then(M).catch(M)}invalidateQueries(e,n,r){const[a,i]=X(e,n,r);return T.batch(()=>{var s,o;if(this.queryCache.findAll(a).forEach(f=>{f.invalidate()}),a.refetchType==="none")return Promise.resolve();const l={...a,type:(s=(o=a.refetchType)!=null?o:a.type)!=null?s:"active"};return this.refetchQueries(l,i)})}refetchQueries(e,n,r){const[a,i]=X(e,n,r),s=T.batch(()=>this.queryCache.findAll(a).filter(l=>!l.isDisabled()).map(l=>{var f;return l.fetch(void 0,{...i,cancelRefetch:(f=i?.cancelRefetch)!=null?f:!0,meta:{refetchPage:a.refetchPage}})}));let o=Promise.all(s).then(M);return i!=null&&i.throwOnError||(o=o.catch(M)),o}fetchQuery(e,n,r){const a=Re(e,n,r),i=this.defaultQueryOptions(a);typeof i.retry>"u"&&(i.retry=!1);const s=this.queryCache.build(this,i);return s.isStaleByTime(i.staleTime)?s.fetch(i):Promise.resolve(s.state.data)}prefetchQuery(e,n,r){return this.fetchQuery(e,n,r).then(M).catch(M)}fetchInfiniteQuery(e,n,r){const a=Re(e,n,r);return a.behavior=fa(),this.fetchQuery(a)}prefetchInfiniteQuery(e,n,r){return this.fetchInfiniteQuery(e,n,r).then(M).catch(M)}resumePausedMutations(){return this.mutationCache.resumePausedMutations()}getQueryCache(){return this.queryCache}getMutationCache(){return this.mutationCache}getLogger(){return this.logger}getDefaultOptions(){return this.defaultOptions}setDefaultOptions(e){this.defaultOptions=e}setQueryDefaults(e,n){const r=this.queryDefaults.find(a=>ee(e)===ee(a.queryKey));r?r.defaultOptions=n:this.queryDefaults.push({queryKey:e,defaultOptions:n})}getQueryDefaults(e){if(!e)return;const n=this.queryDefaults.find(r=>ze(e,r.queryKey));return n?.defaultOptions}setMutationDefaults(e,n){const r=this.mutationDefaults.find(a=>ee(e)===ee(a.mutationKey));r?r.defaultOptions=n:this.mutationDefaults.push({mutationKey:e,defaultOptions:n})}getMutationDefaults(e){if(!e)return;const n=this.mutationDefaults.find(r=>ze(e,r.mutationKey));return n?.defaultOptions}defaultQueryOptions(e){if(e!=null&&e._defaulted)return e;const n={...this.defaultOptions.queries,...this.getQueryDefaults(e?.queryKey),...e,_defaulted:!0};return!n.queryHash&&n.queryKey&&(n.queryHash=Ft(n.queryKey,n)),typeof n.refetchOnReconnect>"u"&&(n.refetchOnReconnect=n.networkMode!=="always"),typeof n.useErrorBoundary>"u"&&(n.useErrorBoundary=!!n.suspense),n}defaultMutationOptions(e){return e!=null&&e._defaulted?e:{...this.defaultOptions.mutations,...this.getMutationDefaults(e?.mutationKey),...e,_defaulted:!0}}clear(){this.queryCache.clear(),this.mutationCache.clear()}}class ma extends Ce{constructor(e,n){super(),this.client=e,this.options=n,this.trackedProps=new Set,this.selectError=null,this.bindMethods(),this.setOptions(n)}bindMethods(){this.remove=this.remove.bind(this),this.refetch=this.refetch.bind(this)}onSubscribe(){this.listeners.length===1&&(this.currentQuery.addObserver(this),dn(this.currentQuery,this.options)&&this.executeFetch(),this.updateTimers())}onUnsubscribe(){this.listeners.length||this.destroy()}shouldFetchOnReconnect(){return pt(this.currentQuery,this.options,this.options.refetchOnReconnect)}shouldFetchOnWindowFocus(){return pt(this.currentQuery,this.options,this.options.refetchOnWindowFocus)}destroy(){this.listeners=[],this.clearStaleTimeout(),this.clearRefetchInterval(),this.currentQuery.removeObserver(this)}setOptions(e,n){const r=this.options,a=this.currentQuery;if(this.options=this.client.defaultQueryOptions(e),on(r,this.options)||this.client.getQueryCache().notify({type:"observerOptionsUpdated",query:this.currentQuery,observer:this}),typeof this.options.enabled<"u"&&typeof this.options.enabled!="boolean")throw new Error("Expected enabled to be a boolean");this.options.queryKey||(this.options.queryKey=r.queryKey),this.updateQuery();const i=this.hasListeners();i&&hn(this.currentQuery,a,this.options,r)&&this.executeFetch(),this.updateResult(n),i&&(this.currentQuery!==a||this.options.enabled!==r.enabled||this.options.staleTime!==r.staleTime)&&this.updateStaleTimeout();const s=this.computeRefetchInterval();i&&(this.currentQuery!==a||this.options.enabled!==r.enabled||s!==this.currentRefetchInterval)&&this.updateRefetchInterval(s)}getOptimisticResult(e){const n=this.client.getQueryCache().build(this.client,e);return this.createResult(n,e)}getCurrentResult(){return this.currentResult}trackResult(e){const n={};return Object.keys(e).forEach(r=>{Object.defineProperty(n,r,{configurable:!1,enumerable:!0,get:()=>(this.trackedProps.add(r),e[r])})}),n}getCurrentQuery(){return this.currentQuery}remove(){this.client.getQueryCache().remove(this.currentQuery)}refetch({refetchPage:e,...n}={}){return this.fetch({...n,meta:{refetchPage:e}})}fetchOptimistic(e){const n=this.client.defaultQueryOptions(e),r=this.client.getQueryCache().build(this.client,n);return r.isFetchingOptimistic=!0,r.fetch().then(()=>this.createResult(r,n))}fetch(e){var n;return this.executeFetch({...e,cancelRefetch:(n=e.cancelRefetch)!=null?n:!0}).then(()=>(this.updateResult(),this.currentResult))}executeFetch(e){this.updateQuery();let n=this.currentQuery.fetch(this.options,e);return e!=null&&e.throwOnError||(n=n.catch(M)),n}updateStaleTimeout(){if(this.clearStaleTimeout(),be||this.currentResult.isStale||!ht(this.options.staleTime))return;const n=Xn(this.currentResult.dataUpdatedAt,this.options.staleTime)+1;this.staleTimeoutId=setTimeout(()=>{this.currentResult.isStale||this.updateResult()},n)}computeRefetchInterval(){var e;return typeof this.options.refetchInterval=="function"?this.options.refetchInterval(this.currentResult.data,this.currentQuery):(e=this.options.refetchInterval)!=null?e:!1}updateRefetchInterval(e){this.clearRefetchInterval(),this.currentRefetchInterval=e,!(be||this.options.enabled===!1||!ht(this.currentRefetchInterval)||this.currentRefetchInterval===0)&&(this.refetchIntervalId=setInterval(()=>{(this.options.refetchIntervalInBackground||Ye.isFocused())&&this.executeFetch()},this.currentRefetchInterval))}updateTimers(){this.updateStaleTimeout(),this.updateRefetchInterval(this.computeRefetchInterval())}clearStaleTimeout(){this.staleTimeoutId&&(clearTimeout(this.staleTimeoutId),this.staleTimeoutId=void 0)}clearRefetchInterval(){this.refetchIntervalId&&(clearInterval(this.refetchIntervalId),this.refetchIntervalId=void 0)}createResult(e,n){const r=this.currentQuery,a=this.options,i=this.currentResult,s=this.currentResultState,o=this.currentResultOptions,l=e!==r,f=l?e.state:this.currentQueryInitialState,u=l?this.currentResult:this.previousQueryResult,{state:c}=e;let{dataUpdatedAt:d,error:h,errorUpdatedAt:g,fetchStatus:y,status:p}=c,S=!1,A=!1,b;if(n._optimisticResults){const k=this.hasListeners(),P=!k&&dn(e,n),z=k&&hn(e,r,n,a);(P||z)&&(y=Je(e.options.networkMode)?"fetching":"paused",d||(p="loading")),n._optimisticResults==="isRestoring"&&(y="idle")}if(n.keepPreviousData&&!c.dataUpdatedAt&&u!=null&&u.isSuccess&&p!=="error")b=u.data,d=u.dataUpdatedAt,p=u.status,S=!0;else if(n.select&&typeof c.data<"u")if(i&&c.data===s?.data&&n.select===this.selectFn)b=this.selectResult;else try{this.selectFn=n.select,b=n.select(c.data),b=vt(i?.data,b,n),this.selectResult=b,this.selectError=null}catch(k){this.selectError=k}else b=c.data;if(typeof n.placeholderData<"u"&&typeof b>"u"&&p==="loading"){let k;if(i!=null&&i.isPlaceholderData&&n.placeholderData===o?.placeholderData)k=i.data;else if(k=typeof n.placeholderData=="function"?n.placeholderData():n.placeholderData,n.select&&typeof k<"u")try{k=n.select(k),this.selectError=null}catch(P){this.selectError=P}typeof k<"u"&&(p="success",b=vt(i?.data,k,n),A=!0)}this.selectError&&(h=this.selectError,b=this.selectResult,g=Date.now(),p="error");const C=y==="fetching",O=p==="loading",x=p==="error";return{status:p,fetchStatus:y,isLoading:O,isSuccess:p==="success",isError:x,isInitialLoading:O&&C,data:b,dataUpdatedAt:d,error:h,errorUpdatedAt:g,failureCount:c.fetchFailureCount,failureReason:c.fetchFailureReason,errorUpdateCount:c.errorUpdateCount,isFetched:c.dataUpdateCount>0||c.errorUpdateCount>0,isFetchedAfterMount:c.dataUpdateCount>f.dataUpdateCount||c.errorUpdateCount>f.errorUpdateCount,isFetching:C,isRefetching:C&&!O,isLoadingError:x&&c.dataUpdatedAt===0,isPaused:y==="paused",isPlaceholderData:A,isPreviousData:S,isRefetchError:x&&c.dataUpdatedAt!==0,isStale:Nt(e,n),refetch:this.refetch,remove:this.remove}}updateResult(e){const n=this.currentResult,r=this.createResult(this.currentQuery,this.options);if(this.currentResultState=this.currentQuery.state,this.currentResultOptions=this.options,on(r,n))return;this.currentResult=r;const a={cache:!0},i=()=>{if(!n)return!0;const{notifyOnChangeProps:s}=this.options;if(s==="all"||!s&&!this.trackedProps.size)return!0;const o=new Set(s??this.trackedProps);return this.options.useErrorBoundary&&o.add("error"),Object.keys(this.currentResult).some(l=>{const f=l;return this.currentResult[f]!==n[f]&&o.has(f)})};e?.listeners!==!1&&i()&&(a.listeners=!0),this.notify({...a,...e})}updateQuery(){const e=this.client.getQueryCache().build(this.client,this.options);if(e===this.currentQuery)return;const n=this.currentQuery;this.currentQuery=e,this.currentQueryInitialState=e.state,this.previousQueryResult=this.currentResult,this.hasListeners()&&(n?.removeObserver(this),e.addObserver(this))}onQueryUpdate(e){const n={};e.type==="success"?n.onSuccess=!e.manual:e.type==="error"&&!Qe(e.error)&&(n.onError=!0),this.updateResult(n),this.hasListeners()&&this.updateTimers()}notify(e){T.batch(()=>{if(e.onSuccess){var n,r,a,i;(n=(r=this.options).onSuccess)==null||n.call(r,this.currentResult.data),(a=(i=this.options).onSettled)==null||a.call(i,this.currentResult.data,null)}else if(e.onError){var s,o,l,f;(s=(o=this.options).onError)==null||s.call(o,this.currentResult.error),(l=(f=this.options).onSettled)==null||l.call(f,void 0,this.currentResult.error)}e.listeners&&this.listeners.forEach(u=>{u(this.currentResult)}),e.cache&&this.client.getQueryCache().notify({query:this.currentQuery,type:"observerResultsUpdated"})})}}function va(t,e){return e.enabled!==!1&&!t.state.dataUpdatedAt&&!(t.state.status==="error"&&e.retryOnMount===!1)}function dn(t,e){return va(t,e)||t.state.dataUpdatedAt>0&&pt(t,e,e.refetchOnMount)}function pt(t,e,n){if(e.enabled!==!1){const r=typeof n=="function"?n(t):n;return r==="always"||r!==!1&&Nt(t,e)}return!1}function hn(t,e,n,r){return n.enabled!==!1&&(t!==e||r.enabled===!1)&&(!n.suspense||t.state.status!=="error")&&Nt(t,n)}function Nt(t,e){return t.isStaleByTime(e.staleTime)}const gt=Symbol("store-raw"),we=Symbol("store-node"),pa=Symbol("store-name");function rr(t,e){let n=t[re];if(!n&&(Object.defineProperty(t,re,{value:n=new Proxy(t,ba)}),!Array.isArray(t))){const r=Object.keys(t),a=Object.getOwnPropertyDescriptors(t);for(let i=0,s=r.length;i<s;i++){const o=r[i];a[o].get&&Object.defineProperty(t,o,{enumerable:a[o].enumerable,get:a[o].get.bind(n)})}}return n}function He(t){let e;return t!=null&&typeof t=="object"&&(t[re]||!(e=Object.getPrototypeOf(t))||e===Object.prototype||Array.isArray(t))}function $(t,e=new Set){let n,r,a,i;if(n=t!=null&&t[gt])return n;if(!He(t)||e.has(t))return t;if(Array.isArray(t)){Object.isFrozen(t)?t=t.slice(0):e.add(t);for(let s=0,o=t.length;s<o;s++)a=t[s],(r=$(a,e))!==a&&(t[s]=r)}else{Object.isFrozen(t)?t=Object.assign({},t):e.add(t);const s=Object.keys(t),o=Object.getOwnPropertyDescriptors(t);for(let l=0,f=s.length;l<f;l++)i=s[l],!o[i].get&&(a=t[i],(r=$(a,e))!==a&&(t[i]=r))}return t}function Dt(t){let e=t[we];return e||Object.defineProperty(t,we,{value:e={}}),e}function yt(t,e,n){return t[e]||(t[e]=ir(n))}function ga(t,e){const n=Reflect.getOwnPropertyDescriptor(t,e);return!n||n.get||!n.configurable||e===re||e===we||e===pa||(delete n.value,delete n.writable,n.get=()=>t[re][e]),n}function ar(t){if(Un()){const e=Dt(t);(e._||(e._=ir()))()}}function ya(t){return ar(t),Reflect.ownKeys(t)}function ir(t){const[e,n]=se(t,{equals:!1,internal:!0});return e.$=n,e}const ba={get(t,e,n){if(e===gt)return t;if(e===re)return n;if(e===Vt)return ar(t),n;const r=Dt(t),a=r.hasOwnProperty(e);let i=a?r[e]():t[e];if(e===we||e==="__proto__")return i;if(!a){const s=Object.getOwnPropertyDescriptor(t,e);Un()&&(typeof i!="function"||t.hasOwnProperty(e))&&!(s&&s.get)&&(i=yt(r,e,i)())}return He(i)?rr(i):i},has(t,e){return e===gt||e===re||e===Vt||e===we||e==="__proto__"?!0:(this.get(t,e,t),e in t)},set(){return!0},deleteProperty(){return!0},ownKeys:ya,getOwnPropertyDescriptor:ga};function Be(t,e,n,r=!1){if(!r&&t[e]===n)return;const a=t[e],i=t.length;n===void 0?delete t[e]:t[e]=n;let s=Dt(t),o;(o=yt(s,e,a))&&o.$(()=>n),Array.isArray(t)&&t.length!==i&&(o=yt(s,"length",i))&&o.$(t.length),(o=s._)&&o.$()}function sr(t,e){const n=Object.keys(e);for(let r=0;r<n.length;r+=1){const a=n[r];Be(t,a,e[a])}}function wa(t,e){if(typeof e=="function"&&(e=e(t)),e=$(e),Array.isArray(e)){if(t===e)return;let n=0,r=e.length;for(;n<r;n++){const a=e[n];t[n]!==a&&Be(t,n,a)}Be(t,"length",r)}else sr(t,e)}function ve(t,e,n=[]){let r,a=t;if(e.length>1){r=e.shift();const s=typeof r,o=Array.isArray(t);if(Array.isArray(r)){for(let l=0;l<r.length;l++)ve(t,[r[l]].concat(e),n);return}else if(o&&s==="function"){for(let l=0;l<t.length;l++)r(t[l],l)&&ve(t,[l].concat(e),n);return}else if(o&&s==="object"){const{from:l=0,to:f=t.length-1,by:u=1}=r;for(let c=l;c<=f;c+=u)ve(t,[c].concat(e),n);return}else if(e.length>1){ve(t[r],e,[r].concat(n));return}a=t[r],n=[r].concat(n)}let i=e[0];typeof i=="function"&&(i=i(a,n),i===a)||r===void 0&&i==null||(i=$(i),r===void 0||He(a)&&He(i)&&!Array.isArray(i)?sr(a,i):Be(t,r,i))}function or(...[t,e]){const n=$(t||{}),r=Array.isArray(n),a=rr(n);function i(...s){lt(()=>{r&&s.length===1?wa(n,s[0]):ve(n,s)})}return[a,i]}function ka(t){return typeof t=="function"}function mn(t,e,n){if(!ka(t)){const{queryKey:r,...a}=t;return r?{...a,queryKey:r()}:t}return typeof e=="function"?{...n,queryKey:t(),queryFn:e}:{...e,queryKey:t()}}function xa(t,e){return typeof t=="function"?t(...e):!!t}const vn=Kn(void 0),lr=Kn(!1);function ur(t,e){return t||(e&&typeof window<"u"?(window.SolidQueryClientContext||(window.SolidQueryClientContext=vn),window.SolidQueryClientContext):vn)}const Sa=({context:t}={})=>{const e=Jt(ur(t,Jt(lr)));if(!e)throw new Error("No QueryClient set, use QueryClientProvider to set one");return e},Oa=t=>{const e=zn({contextSharing:!1},t);It(()=>{e.client.mount()}),Yn(()=>e.client.unmount());const n=ur(e.context,e.contextSharing);return q(lr.Provider,{get value(){return!e.context&&e.contextSharing},get children(){return q(n.Provider,{get value(){return e.client},get children(){return e.children}})}})};function Aa(t,e){const n=Sa({context:t.context}),r=Symbol("empty"),a=n.defaultQueryOptions(t);a._optimisticResults="optimistic";const i=new e(n,a),[s,o]=or(i.getOptimisticResult(a)),[l,{refetch:f,mutate:u}]=qr(()=>new Promise(g=>{s.isFetching&&s.isLoading||($(s.data)===r&&g(void 0),g($(s.data)))}));lt(()=>{u(()=>$(s.data)),f()});let c=[];const d=i.subscribe(g=>{c.push(()=>{lt(()=>{const y={...$(g)};y.data===void 0&&(y.data=r),o($(y)),u(()=>$(g.data)),f()})}),queueMicrotask(()=>{const y=c.pop();y&&y(),c=[]})});Yn(()=>d()),It(()=>{i.setOptions(a,{listeners:!1})}),ut(()=>{const g=n.defaultQueryOptions(t);i.setOptions(g)}),ut(Qr(()=>s.status,()=>{if(s.isError&&!s.isFetching&&xa(i.options.useErrorBoundary,[s.error,i.getCurrentQuery()]))throw s.error}));const h={get(g,y){return y==="data"?l():Reflect.get(g,y)}};return new Proxy(s,h)}function pn(t,e,n){const[r,a]=or(mn(t,e,n));return ut(()=>{const i=mn(t,e,n);a(i)}),Aa(r,ma)}function cr(t){var e,n,r="";if(typeof t=="string"||typeof t=="number")r+=t;else if(typeof t=="object")if(Array.isArray(t))for(e=0;e<t.length;e++)t[e]&&(n=cr(t[e]))&&(r&&(r+=" "),r+=n);else for(e in t)t[e]&&(r&&(r+=" "),r+=e);return r}function bt(){for(var t,e,n=0,r="";n<arguments.length;)(t=arguments[n++])&&(e=cr(t))&&(r&&(r+=" "),r+=e);return r}const Ca=L('<svg><path d="M248 8C111.1 8 0 119.1 0 256s111.1 248 248 248 248-111.1 248-248S384.9 8 248 8zm100.7 364.9c-4.2 0-6.8-1.3-10.7-3.6-62.4-37.6-135-39.2-206.7-24.5-3.9 1-9 2.6-11.9 2.6-9.7 0-15.8-7.7-15.8-15.8 0-10.3 6.1-15.2 13.6-16.8 81.9-18.1 165.6-16.5 237 26.2 6.1 3.9 9.7 7.4 9.7 16.5s-7.1 15.4-15.2 15.4zm26.9-65.6c-5.2 0-8.7-2.3-12.3-4.2-62.5-37-155.7-51.9-238.6-29.4-4.8 1.3-7.4 2.6-11.9 2.6-10.7 0-19.4-8.7-19.4-19.4s5.2-17.8 15.5-20.7c27.8-7.8 56.2-13.6 97.8-13.6 64.9 0 127.6 16.1 177 45.5 8.1 4.8 11.3 11 11.3 19.7-.1 10.8-8.5 19.5-19.4 19.5zm31-76.2c-5.2 0-8.4-1.3-12.9-3.9-71.2-42.5-198.5-52.7-280.9-29.7-3.6 1-8.1 2.6-12.9 2.6-13.2 0-23.3-10.3-23.3-23.6 0-13.6 8.4-21.3 17.4-23.9 35.2-10.3 74.6-15.2 117.5-15.2 73 0 149.5 15.2 205.4 47.8 7.8 4.5 12.9 10.7 12.9 22.6 0 13.6-11 23.3-23.2 23.3z"></path></svg>',4),fr=t=>[ce(()=>jr()),"<!>",(()=>{const e=D(Ca);return Ur(e,zn(t,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 496 512"}),!0,!0),Tt(),e})()],Pa=L('<div tabindex="0" role="checkbox"><div class="block aspect-square h-full rounded-l-lg bg-black p-4 [&amp;>svg]:h-fit [&amp;>svg]:fill-green-600"></div><span class="block flex-grow p-4 text-center"><!#><!/><!#><!/></span></div>',10),_a=L('<img class="aspect-square h-full">',1),Ea=L('<div class="block aspect-square h-full bg-black p-4 [&amp;>svg]:h-fit [&amp;>svg]:fill-green-600"></div>',2),Ra=L('<span class="float-right"> ✓</span>',2),Ia=L('<div class="relative col-span-12 h-full grid-cols-1 px-6"><!#><!/><!#><!/></div>',6),Ta=L("<span>Loading your playlists...</span>",2),Fa=L('<span class="block text-center">Select the playlists you want to search for duplicate songs:</span>',2),Ma=L('<div class="relative grid gap-4 py-4 lg:grid-cols-2 xl:grid-cols-4" role="group"><!#><!/><!#><!/><!#><!/></div>',8),rt=t=>(()=>{const e=D(Pa),n=e.firstChild,r=n.nextSibling,a=r.firstChild,[i,s]=j(a.nextSibling),o=i.nextSibling,[l,f]=j(o.nextSibling);return e.$$click=()=>{t.onSelect()},e.$$keyup=u=>{u.key===" "&&t.onSelect()},e.$$keydown=u=>{u.key===" "&&u.preventDefault()},N(n,(()=>{const u=ce(()=>!!t.imageUrl);return()=>u()?(()=>{const c=D(_a);return ct(()=>Zt(c,"src",t.imageUrl)),c})():(()=>{const c=D(Ea);return N(c,q(fr,{})),c})()})()),N(r,()=>t.label,i,s),N(r,(()=>{const u=ce(()=>!!t.checked);return()=>u()&&D(Ra)})(),l,f),ct(u=>{const c=t.checked,d=bt(t.class,"flex h-24 w-full cursor-pointer items-center rounded-lg border-2 border-gray-500 bg-green-100 text-lg font-semibold focus-within:bg-green-300 focus-within:shadow-[0_1px_0px_5px_black,1px_0_0px_5px_black,0_-1px_0_5px_black,-1px_0_0_5px_black] hover:bg-green-300 aria-checked:bg-green-600 aria-checked:text-white");return c!==u._v$&&Zt(e,"aria-checked",u._v$=c),d!==u._v$2&&ft(e,u._v$2=d),u},{_v$:void 0,_v$2:void 0}),Tt(),e})();function Na(t){const e=pn(()=>["playlistsData"],()=>t.spotifyClient.fetchSpotifyRoute("https://api.spotify.com/v1/me/playlists")),n=pn(()=>["userData"],()=>t.spotifyClient.fetchSpotifyRoute("https://api.spotify.com/v1/me")),[r,a]=se([]),i=c=>{const d=r();d.find(h=>h.id===c.id)?a(d.filter(h=>h.id!==c.id)):a([...d,c])},s={id:"__liked_songs",name:"Liked Songs",owner:{id:n.data&&n.data.id||""},collaborative:!1},o=()=>l().length+1===r().length,l=()=>e.data&&e.data.items&&e.data.items.filter(c=>c.collaborative||c.owner.id===n.data.id),f=()=>{o()?a([]):a([s,...l()])},u=c=>!!r().find(({id:d})=>c.id===d);return(()=>{const c=D(Ia),d=c.firstChild,[h,g]=j(d.nextSibling),y=h.nextSibling,[p,S]=j(y.nextSibling);return N(c,()=>e.isLoading||n.isLoading&&D(Ta),h,g),N(c,(()=>{const A=ce(()=>!!l());return()=>A()&&[D(Fa),(()=>{const b=D(Ma),C=b.firstChild,[O,x]=j(C.nextSibling),w=O.nextSibling,[k,P]=j(w.nextSibling),z=k.nextSibling,[me,Xt]=j(z.nextSibling);return N(b,q(rt,{class:"lg:col-span-2 xl:col-span-4",get checked(){return o()},onSelect:()=>{f()},label:"Search All Playlists for duplicates"}),O,x),N(b,q(rt,{get checked(){return u(s)},onSelect:()=>{i(s)},label:"Liked Songs"}),k,P),N(b,q(zr,{get each(){return l()},children:W=>q(rt,{get checked(){return u(W)},onSelect:()=>{i(W)},get label(){return W.name},get imageUrl(){return W.images&&W.images.length>0&&W.images[0].url}})}),me,Xt),b})()]})(),p,S),c})()}Hn(["keydown","keyup","click"]);function gn(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter(function(a){return Object.getOwnPropertyDescriptor(t,a).enumerable})),n.push.apply(n,r)}return n}function m(t){for(var e=1;e<arguments.length;e++){var n=arguments[e]!=null?arguments[e]:{};e%2?gn(Object(n),!0).forEach(function(r){I(t,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):gn(Object(n)).forEach(function(r){Object.defineProperty(t,r,Object.getOwnPropertyDescriptor(n,r))})}return t}function We(t){return We=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},We(t)}function Da(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function yn(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function La(t,e,n){return e&&yn(t.prototype,e),n&&yn(t,n),Object.defineProperty(t,"prototype",{writable:!1}),t}function I(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function Lt(t,e){return qa(t)||ja(t,e)||dr(t,e)||za()}function Pe(t){return $a(t)||Qa(t)||dr(t)||Ua()}function $a(t){if(Array.isArray(t))return wt(t)}function qa(t){if(Array.isArray(t))return t}function Qa(t){if(typeof Symbol<"u"&&t[Symbol.iterator]!=null||t["@@iterator"]!=null)return Array.from(t)}function ja(t,e){var n=t==null?null:typeof Symbol<"u"&&t[Symbol.iterator]||t["@@iterator"];if(n!=null){var r=[],a=!0,i=!1,s,o;try{for(n=n.call(t);!(a=(s=n.next()).done)&&(r.push(s.value),!(e&&r.length===e));a=!0);}catch(l){i=!0,o=l}finally{try{!a&&n.return!=null&&n.return()}finally{if(i)throw o}}return r}}function dr(t,e){if(t){if(typeof t=="string")return wt(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);if(n==="Object"&&t.constructor&&(n=t.constructor.name),n==="Map"||n==="Set")return Array.from(t);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return wt(t,e)}}function wt(t,e){(e==null||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function Ua(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function za(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var bn=function(){},$t={},hr={},mr=null,vr={mark:bn,measure:bn};try{typeof window<"u"&&($t=window),typeof document<"u"&&(hr=document),typeof MutationObserver<"u"&&(mr=MutationObserver),typeof performance<"u"&&(vr=performance)}catch{}var Ya=$t.navigator||{},wn=Ya.userAgent,kn=wn===void 0?"":wn,V=$t,E=hr,xn=mr,Ie=vr;V.document;var B=!!E.documentElement&&!!E.head&&typeof E.addEventListener=="function"&&typeof E.createElement=="function",pr=~kn.indexOf("MSIE")||~kn.indexOf("Trident/"),Te,Fe,Me,Ne,De,Y="___FONT_AWESOME___",kt=16,gr="fa",yr="svg-inline--fa",ae="data-fa-i2svg",xt="data-fa-pseudo-element",Ka="data-fa-pseudo-element-pending",qt="data-prefix",Qt="data-icon",Sn="fontawesome-i2svg",Ha="async",Ba=["HTML","HEAD","STYLE","SCRIPT"],br=function(){try{return!0}catch{return!1}}(),_="classic",R="sharp",jt=[_,R];function _e(t){return new Proxy(t,{get:function(n,r){return r in n?n[r]:n[_]}})}var ke=_e((Te={},I(Te,_,{fa:"solid",fas:"solid","fa-solid":"solid",far:"regular","fa-regular":"regular",fal:"light","fa-light":"light",fat:"thin","fa-thin":"thin",fad:"duotone","fa-duotone":"duotone",fab:"brands","fa-brands":"brands",fak:"kit","fa-kit":"kit"}),I(Te,R,{fa:"solid",fass:"solid","fa-solid":"solid",fasr:"regular","fa-regular":"regular"}),Te)),xe=_e((Fe={},I(Fe,_,{solid:"fas",regular:"far",light:"fal",thin:"fat",duotone:"fad",brands:"fab",kit:"fak"}),I(Fe,R,{solid:"fass",regular:"fasr"}),Fe)),Se=_e((Me={},I(Me,_,{fab:"fa-brands",fad:"fa-duotone",fak:"fa-kit",fal:"fa-light",far:"fa-regular",fas:"fa-solid",fat:"fa-thin"}),I(Me,R,{fass:"fa-solid",fasr:"fa-regular"}),Me)),Wa=_e((Ne={},I(Ne,_,{"fa-brands":"fab","fa-duotone":"fad","fa-kit":"fak","fa-light":"fal","fa-regular":"far","fa-solid":"fas","fa-thin":"fat"}),I(Ne,R,{"fa-solid":"fass","fa-regular":"fasr"}),Ne)),Ga=/fa(s|r|l|t|d|b|k|ss|sr)?[\-\ ]/,wr="fa-layers-text",Xa=/Font ?Awesome ?([56 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Sharp|Kit)?.*/i,Va=_e((De={},I(De,_,{900:"fas",400:"far",normal:"far",300:"fal",100:"fat"}),I(De,R,{900:"fass",400:"fasr"}),De)),kr=[1,2,3,4,5,6,7,8,9,10],Ja=kr.concat([11,12,13,14,15,16,17,18,19,20]),Za=["class","data-prefix","data-icon","data-fa-transform","data-fa-mask"],te={GROUP:"duotone-group",SWAP_OPACITY:"swap-opacity",PRIMARY:"primary",SECONDARY:"secondary"},Oe=new Set;Object.keys(xe[_]).map(Oe.add.bind(Oe));Object.keys(xe[R]).map(Oe.add.bind(Oe));var ei=[].concat(jt,Pe(Oe),["2xs","xs","sm","lg","xl","2xl","beat","border","fade","beat-fade","bounce","flip-both","flip-horizontal","flip-vertical","flip","fw","inverse","layers-counter","layers-text","layers","li","pull-left","pull-right","pulse","rotate-180","rotate-270","rotate-90","rotate-by","shake","spin-pulse","spin-reverse","spin","stack-1x","stack-2x","stack","ul",te.GROUP,te.SWAP_OPACITY,te.PRIMARY,te.SECONDARY]).concat(kr.map(function(t){return"".concat(t,"x")})).concat(Ja.map(function(t){return"w-".concat(t)})),ge=V.FontAwesomeConfig||{};function ti(t){var e=E.querySelector("script["+t+"]");if(e)return e.getAttribute(t)}function ni(t){return t===""?!0:t==="false"?!1:t==="true"?!0:t}if(E&&typeof E.querySelector=="function"){var ri=[["data-family-prefix","familyPrefix"],["data-css-prefix","cssPrefix"],["data-family-default","familyDefault"],["data-style-default","styleDefault"],["data-replacement-class","replacementClass"],["data-auto-replace-svg","autoReplaceSvg"],["data-auto-add-css","autoAddCss"],["data-auto-a11y","autoA11y"],["data-search-pseudo-elements","searchPseudoElements"],["data-observe-mutations","observeMutations"],["data-mutate-approach","mutateApproach"],["data-keep-original-source","keepOriginalSource"],["data-measure-performance","measurePerformance"],["data-show-missing-icons","showMissingIcons"]];ri.forEach(function(t){var e=Lt(t,2),n=e[0],r=e[1],a=ni(ti(n));a!=null&&(ge[r]=a)})}var xr={styleDefault:"solid",familyDefault:"classic",cssPrefix:gr,replacementClass:yr,autoReplaceSvg:!0,autoAddCss:!0,autoA11y:!0,searchPseudoElements:!1,observeMutations:!0,mutateApproach:"async",keepOriginalSource:!0,measurePerformance:!1,showMissingIcons:!0};ge.familyPrefix&&(ge.cssPrefix=ge.familyPrefix);var fe=m(m({},xr),ge);fe.autoReplaceSvg||(fe.observeMutations=!1);var v={};Object.keys(xr).forEach(function(t){Object.defineProperty(v,t,{enumerable:!0,set:function(n){fe[t]=n,ye.forEach(function(r){return r(v)})},get:function(){return fe[t]}})});Object.defineProperty(v,"familyPrefix",{enumerable:!0,set:function(e){fe.cssPrefix=e,ye.forEach(function(n){return n(v)})},get:function(){return fe.cssPrefix}});V.FontAwesomeConfig=v;var ye=[];function ai(t){return ye.push(t),function(){ye.splice(ye.indexOf(t),1)}}var G=kt,U={size:16,x:0,y:0,rotate:0,flipX:!1,flipY:!1};function ii(t){if(!(!t||!B)){var e=E.createElement("style");e.setAttribute("type","text/css"),e.innerHTML=t;for(var n=E.head.childNodes,r=null,a=n.length-1;a>-1;a--){var i=n[a],s=(i.tagName||"").toUpperCase();["STYLE","LINK"].indexOf(s)>-1&&(r=i)}return E.head.insertBefore(e,r),t}}var si="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";function Ae(){for(var t=12,e="";t-- >0;)e+=si[Math.random()*62|0];return e}function he(t){for(var e=[],n=(t||[]).length>>>0;n--;)e[n]=t[n];return e}function Ut(t){return t.classList?he(t.classList):(t.getAttribute("class")||"").split(" ").filter(function(e){return e})}function Sr(t){return"".concat(t).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function oi(t){return Object.keys(t||{}).reduce(function(e,n){return e+"".concat(n,'="').concat(Sr(t[n]),'" ')},"").trim()}function Ze(t){return Object.keys(t||{}).reduce(function(e,n){return e+"".concat(n,": ").concat(t[n].trim(),";")},"")}function zt(t){return t.size!==U.size||t.x!==U.x||t.y!==U.y||t.rotate!==U.rotate||t.flipX||t.flipY}function li(t){var e=t.transform,n=t.containerWidth,r=t.iconWidth,a={transform:"translate(".concat(n/2," 256)")},i="translate(".concat(e.x*32,", ").concat(e.y*32,") "),s="scale(".concat(e.size/16*(e.flipX?-1:1),", ").concat(e.size/16*(e.flipY?-1:1),") "),o="rotate(".concat(e.rotate," 0 0)"),l={transform:"".concat(i," ").concat(s," ").concat(o)},f={transform:"translate(".concat(r/2*-1," -256)")};return{outer:a,inner:l,path:f}}function ui(t){var e=t.transform,n=t.width,r=n===void 0?kt:n,a=t.height,i=a===void 0?kt:a,s=t.startCentered,o=s===void 0?!1:s,l="";return o&&pr?l+="translate(".concat(e.x/G-r/2,"em, ").concat(e.y/G-i/2,"em) "):o?l+="translate(calc(-50% + ".concat(e.x/G,"em), calc(-50% + ").concat(e.y/G,"em)) "):l+="translate(".concat(e.x/G,"em, ").concat(e.y/G,"em) "),l+="scale(".concat(e.size/G*(e.flipX?-1:1),", ").concat(e.size/G*(e.flipY?-1:1),") "),l+="rotate(".concat(e.rotate,"deg) "),l}var ci=`:root, :host {
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
}`;function Or(){var t=gr,e=yr,n=v.cssPrefix,r=v.replacementClass,a=ci;if(n!==t||r!==e){var i=new RegExp("\\.".concat(t,"\\-"),"g"),s=new RegExp("\\--".concat(t,"\\-"),"g"),o=new RegExp("\\.".concat(e),"g");a=a.replace(i,".".concat(n,"-")).replace(s,"--".concat(n,"-")).replace(o,".".concat(r))}return a}var On=!1;function at(){v.autoAddCss&&!On&&(ii(Or()),On=!0)}var fi={mixout:function(){return{dom:{css:Or,insertCss:at}}},hooks:function(){return{beforeDOMElementCreation:function(){at()},beforeI2svg:function(){at()}}}},K=V||{};K[Y]||(K[Y]={});K[Y].styles||(K[Y].styles={});K[Y].hooks||(K[Y].hooks={});K[Y].shims||(K[Y].shims=[]);var Q=K[Y],Ar=[],di=function t(){E.removeEventListener("DOMContentLoaded",t),Ge=1,Ar.map(function(e){return e()})},Ge=!1;B&&(Ge=(E.documentElement.doScroll?/^loaded|^c/:/^loaded|^i|^c/).test(E.readyState),Ge||E.addEventListener("DOMContentLoaded",di));function hi(t){B&&(Ge?setTimeout(t,0):Ar.push(t))}function Ee(t){var e=t.tag,n=t.attributes,r=n===void 0?{}:n,a=t.children,i=a===void 0?[]:a;return typeof t=="string"?Sr(t):"<".concat(e," ").concat(oi(r),">").concat(i.map(Ee).join(""),"</").concat(e,">")}function An(t,e,n){if(t&&t[e]&&t[e][n])return{prefix:e,iconName:n,icon:t[e][n]}}var mi=function(e,n){return function(r,a,i,s){return e.call(n,r,a,i,s)}},it=function(e,n,r,a){var i=Object.keys(e),s=i.length,o=a!==void 0?mi(n,a):n,l,f,u;for(r===void 0?(l=1,u=e[i[0]]):(l=0,u=r);l<s;l++)f=i[l],u=o(u,e[f],f,e);return u};function vi(t){for(var e=[],n=0,r=t.length;n<r;){var a=t.charCodeAt(n++);if(a>=55296&&a<=56319&&n<r){var i=t.charCodeAt(n++);(i&64512)==56320?e.push(((a&1023)<<10)+(i&1023)+65536):(e.push(a),n--)}else e.push(a)}return e}function St(t){var e=vi(t);return e.length===1?e[0].toString(16):null}function pi(t,e){var n=t.length,r=t.charCodeAt(e),a;return r>=55296&&r<=56319&&n>e+1&&(a=t.charCodeAt(e+1),a>=56320&&a<=57343)?(r-55296)*1024+a-56320+65536:r}function Cn(t){return Object.keys(t).reduce(function(e,n){var r=t[n],a=!!r.icon;return a?e[r.iconName]=r.icon:e[n]=r,e},{})}function Ot(t,e){var n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},r=n.skipHooks,a=r===void 0?!1:r,i=Cn(e);typeof Q.hooks.addPack=="function"&&!a?Q.hooks.addPack(t,Cn(e)):Q.styles[t]=m(m({},Q.styles[t]||{}),i),t==="fas"&&Ot("fa",e)}var Le,$e,qe,oe=Q.styles,gi=Q.shims,yi=(Le={},I(Le,_,Object.values(Se[_])),I(Le,R,Object.values(Se[R])),Le),Yt=null,Cr={},Pr={},_r={},Er={},Rr={},bi=($e={},I($e,_,Object.keys(ke[_])),I($e,R,Object.keys(ke[R])),$e);function wi(t){return~ei.indexOf(t)}function ki(t,e){var n=e.split("-"),r=n[0],a=n.slice(1).join("-");return r===t&&a!==""&&!wi(a)?a:null}var Ir=function(){var e=function(i){return it(oe,function(s,o,l){return s[l]=it(o,i,{}),s},{})};Cr=e(function(a,i,s){if(i[3]&&(a[i[3]]=s),i[2]){var o=i[2].filter(function(l){return typeof l=="number"});o.forEach(function(l){a[l.toString(16)]=s})}return a}),Pr=e(function(a,i,s){if(a[s]=s,i[2]){var o=i[2].filter(function(l){return typeof l=="string"});o.forEach(function(l){a[l]=s})}return a}),Rr=e(function(a,i,s){var o=i[2];return a[s]=s,o.forEach(function(l){a[l]=s}),a});var n="far"in oe||v.autoFetchSvg,r=it(gi,function(a,i){var s=i[0],o=i[1],l=i[2];return o==="far"&&!n&&(o="fas"),typeof s=="string"&&(a.names[s]={prefix:o,iconName:l}),typeof s=="number"&&(a.unicodes[s.toString(16)]={prefix:o,iconName:l}),a},{names:{},unicodes:{}});_r=r.names,Er=r.unicodes,Yt=et(v.styleDefault,{family:v.familyDefault})};ai(function(t){Yt=et(t.styleDefault,{family:v.familyDefault})});Ir();function Kt(t,e){return(Cr[t]||{})[e]}function xi(t,e){return(Pr[t]||{})[e]}function ne(t,e){return(Rr[t]||{})[e]}function Tr(t){return _r[t]||{prefix:null,iconName:null}}function Si(t){var e=Er[t],n=Kt("fas",t);return e||(n?{prefix:"fas",iconName:n}:null)||{prefix:null,iconName:null}}function J(){return Yt}var Ht=function(){return{prefix:null,iconName:null,rest:[]}};function et(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=e.family,r=n===void 0?_:n,a=ke[r][t],i=xe[r][t]||xe[r][a],s=t in Q.styles?t:null;return i||s||null}var Pn=(qe={},I(qe,_,Object.keys(Se[_])),I(qe,R,Object.keys(Se[R])),qe);function tt(t){var e,n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=n.skipLookups,a=r===void 0?!1:r,i=(e={},I(e,_,"".concat(v.cssPrefix,"-").concat(_)),I(e,R,"".concat(v.cssPrefix,"-").concat(R)),e),s=null,o=_;(t.includes(i[_])||t.some(function(f){return Pn[_].includes(f)}))&&(o=_),(t.includes(i[R])||t.some(function(f){return Pn[R].includes(f)}))&&(o=R);var l=t.reduce(function(f,u){var c=ki(v.cssPrefix,u);if(oe[u]?(u=yi[o].includes(u)?Wa[o][u]:u,s=u,f.prefix=u):bi[o].indexOf(u)>-1?(s=u,f.prefix=et(u,{family:o})):c?f.iconName=c:u!==v.replacementClass&&u!==i[_]&&u!==i[R]&&f.rest.push(u),!a&&f.prefix&&f.iconName){var d=s==="fa"?Tr(f.iconName):{},h=ne(f.prefix,f.iconName);d.prefix&&(s=null),f.iconName=d.iconName||h||f.iconName,f.prefix=d.prefix||f.prefix,f.prefix==="far"&&!oe.far&&oe.fas&&!v.autoFetchSvg&&(f.prefix="fas")}return f},Ht());return(t.includes("fa-brands")||t.includes("fab"))&&(l.prefix="fab"),(t.includes("fa-duotone")||t.includes("fad"))&&(l.prefix="fad"),!l.prefix&&o===R&&(oe.fass||v.autoFetchSvg)&&(l.prefix="fass",l.iconName=ne(l.prefix,l.iconName)||l.iconName),(l.prefix==="fa"||s==="fa")&&(l.prefix=J()||"fas"),l}var Oi=function(){function t(){Da(this,t),this.definitions={}}return La(t,[{key:"add",value:function(){for(var n=this,r=arguments.length,a=new Array(r),i=0;i<r;i++)a[i]=arguments[i];var s=a.reduce(this._pullDefinitions,{});Object.keys(s).forEach(function(o){n.definitions[o]=m(m({},n.definitions[o]||{}),s[o]),Ot(o,s[o]);var l=Se[_][o];l&&Ot(l,s[o]),Ir()})}},{key:"reset",value:function(){this.definitions={}}},{key:"_pullDefinitions",value:function(n,r){var a=r.prefix&&r.iconName&&r.icon?{0:r}:r;return Object.keys(a).map(function(i){var s=a[i],o=s.prefix,l=s.iconName,f=s.icon,u=f[2];n[o]||(n[o]={}),u.length>0&&u.forEach(function(c){typeof c=="string"&&(n[o][c]=f)}),n[o][l]=f}),n}}]),t}(),_n=[],le={},ue={},Ai=Object.keys(ue);function Ci(t,e){var n=e.mixoutsTo;return _n=t,le={},Object.keys(ue).forEach(function(r){Ai.indexOf(r)===-1&&delete ue[r]}),_n.forEach(function(r){var a=r.mixout?r.mixout():{};if(Object.keys(a).forEach(function(s){typeof a[s]=="function"&&(n[s]=a[s]),We(a[s])==="object"&&Object.keys(a[s]).forEach(function(o){n[s]||(n[s]={}),n[s][o]=a[s][o]})}),r.hooks){var i=r.hooks();Object.keys(i).forEach(function(s){le[s]||(le[s]=[]),le[s].push(i[s])})}r.provides&&r.provides(ue)}),n}function At(t,e){for(var n=arguments.length,r=new Array(n>2?n-2:0),a=2;a<n;a++)r[a-2]=arguments[a];var i=le[t]||[];return i.forEach(function(s){e=s.apply(null,[e].concat(r))}),e}function ie(t){for(var e=arguments.length,n=new Array(e>1?e-1:0),r=1;r<e;r++)n[r-1]=arguments[r];var a=le[t]||[];a.forEach(function(i){i.apply(null,n)})}function H(){var t=arguments[0],e=Array.prototype.slice.call(arguments,1);return ue[t]?ue[t].apply(null,e):void 0}function Ct(t){t.prefix==="fa"&&(t.prefix="fas");var e=t.iconName,n=t.prefix||J();if(e)return e=ne(n,e)||e,An(Fr.definitions,n,e)||An(Q.styles,n,e)}var Fr=new Oi,Pi=function(){v.autoReplaceSvg=!1,v.observeMutations=!1,ie("noAuto")},_i={i2svg:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};return B?(ie("beforeI2svg",e),H("pseudoElements2svg",e),H("i2svg",e)):Promise.reject("Operation requires a DOM of some kind.")},watch:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},n=e.autoReplaceSvgRoot;v.autoReplaceSvg===!1&&(v.autoReplaceSvg=!0),v.observeMutations=!0,hi(function(){Ri({autoReplaceSvgRoot:n}),ie("watch",e)})}},Ei={icon:function(e){if(e===null)return null;if(We(e)==="object"&&e.prefix&&e.iconName)return{prefix:e.prefix,iconName:ne(e.prefix,e.iconName)||e.iconName};if(Array.isArray(e)&&e.length===2){var n=e[1].indexOf("fa-")===0?e[1].slice(3):e[1],r=et(e[0]);return{prefix:r,iconName:ne(r,n)||n}}if(typeof e=="string"&&(e.indexOf("".concat(v.cssPrefix,"-"))>-1||e.match(Ga))){var a=tt(e.split(" "),{skipLookups:!0});return{prefix:a.prefix||J(),iconName:ne(a.prefix,a.iconName)||a.iconName}}if(typeof e=="string"){var i=J();return{prefix:i,iconName:ne(i,e)||e}}}},F={noAuto:Pi,config:v,dom:_i,parse:Ei,library:Fr,findIconDefinition:Ct,toHtml:Ee},Ri=function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},n=e.autoReplaceSvgRoot,r=n===void 0?E:n;(Object.keys(Q.styles).length>0||v.autoFetchSvg)&&B&&v.autoReplaceSvg&&F.dom.i2svg({node:r})};function nt(t,e){return Object.defineProperty(t,"abstract",{get:e}),Object.defineProperty(t,"html",{get:function(){return t.abstract.map(function(r){return Ee(r)})}}),Object.defineProperty(t,"node",{get:function(){if(B){var r=E.createElement("div");return r.innerHTML=t.html,r.children}}}),t}function Ii(t){var e=t.children,n=t.main,r=t.mask,a=t.attributes,i=t.styles,s=t.transform;if(zt(s)&&n.found&&!r.found){var o=n.width,l=n.height,f={x:o/l/2,y:.5};a.style=Ze(m(m({},i),{},{"transform-origin":"".concat(f.x+s.x/16,"em ").concat(f.y+s.y/16,"em")}))}return[{tag:"svg",attributes:a,children:e}]}function Ti(t){var e=t.prefix,n=t.iconName,r=t.children,a=t.attributes,i=t.symbol,s=i===!0?"".concat(e,"-").concat(v.cssPrefix,"-").concat(n):i;return[{tag:"svg",attributes:{style:"display: none;"},children:[{tag:"symbol",attributes:m(m({},a),{},{id:s}),children:r}]}]}function Bt(t){var e=t.icons,n=e.main,r=e.mask,a=t.prefix,i=t.iconName,s=t.transform,o=t.symbol,l=t.title,f=t.maskId,u=t.titleId,c=t.extra,d=t.watchable,h=d===void 0?!1:d,g=r.found?r:n,y=g.width,p=g.height,S=a==="fak",A=[v.replacementClass,i?"".concat(v.cssPrefix,"-").concat(i):""].filter(function(P){return c.classes.indexOf(P)===-1}).filter(function(P){return P!==""||!!P}).concat(c.classes).join(" "),b={children:[],attributes:m(m({},c.attributes),{},{"data-prefix":a,"data-icon":i,class:A,role:c.attributes.role||"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 ".concat(y," ").concat(p)})},C=S&&!~c.classes.indexOf("fa-fw")?{width:"".concat(y/p*16*.0625,"em")}:{};h&&(b.attributes[ae]=""),l&&(b.children.push({tag:"title",attributes:{id:b.attributes["aria-labelledby"]||"title-".concat(u||Ae())},children:[l]}),delete b.attributes.title);var O=m(m({},b),{},{prefix:a,iconName:i,main:n,mask:r,maskId:f,transform:s,symbol:o,styles:m(m({},C),c.styles)}),x=r.found&&n.found?H("generateAbstractMask",O)||{children:[],attributes:{}}:H("generateAbstractIcon",O)||{children:[],attributes:{}},w=x.children,k=x.attributes;return O.children=w,O.attributes=k,o?Ti(O):Ii(O)}function En(t){var e=t.content,n=t.width,r=t.height,a=t.transform,i=t.title,s=t.extra,o=t.watchable,l=o===void 0?!1:o,f=m(m(m({},s.attributes),i?{title:i}:{}),{},{class:s.classes.join(" ")});l&&(f[ae]="");var u=m({},s.styles);zt(a)&&(u.transform=ui({transform:a,startCentered:!0,width:n,height:r}),u["-webkit-transform"]=u.transform);var c=Ze(u);c.length>0&&(f.style=c);var d=[];return d.push({tag:"span",attributes:f,children:[e]}),i&&d.push({tag:"span",attributes:{class:"sr-only"},children:[i]}),d}function Fi(t){var e=t.content,n=t.title,r=t.extra,a=m(m(m({},r.attributes),n?{title:n}:{}),{},{class:r.classes.join(" ")}),i=Ze(r.styles);i.length>0&&(a.style=i);var s=[];return s.push({tag:"span",attributes:a,children:[e]}),n&&s.push({tag:"span",attributes:{class:"sr-only"},children:[n]}),s}var st=Q.styles;function Pt(t){var e=t[0],n=t[1],r=t.slice(4),a=Lt(r,1),i=a[0],s=null;return Array.isArray(i)?s={tag:"g",attributes:{class:"".concat(v.cssPrefix,"-").concat(te.GROUP)},children:[{tag:"path",attributes:{class:"".concat(v.cssPrefix,"-").concat(te.SECONDARY),fill:"currentColor",d:i[0]}},{tag:"path",attributes:{class:"".concat(v.cssPrefix,"-").concat(te.PRIMARY),fill:"currentColor",d:i[1]}}]}:s={tag:"path",attributes:{fill:"currentColor",d:i}},{found:!0,width:e,height:n,icon:s}}var Mi={found:!1,width:512,height:512};function Ni(t,e){!br&&!v.showMissingIcons&&t&&console.error('Icon with name "'.concat(t,'" and prefix "').concat(e,'" is missing.'))}function _t(t,e){var n=e;return e==="fa"&&v.styleDefault!==null&&(e=J()),new Promise(function(r,a){if(H("missingIconAbstract"),n==="fa"){var i=Tr(t)||{};t=i.iconName||t,e=i.prefix||e}if(t&&e&&st[e]&&st[e][t]){var s=st[e][t];return r(Pt(s))}Ni(t,e),r(m(m({},Mi),{},{icon:v.showMissingIcons&&t?H("missingIconAbstract")||{}:{}}))})}var Rn=function(){},Et=v.measurePerformance&&Ie&&Ie.mark&&Ie.measure?Ie:{mark:Rn,measure:Rn},pe='FA "6.3.0"',Di=function(e){return Et.mark("".concat(pe," ").concat(e," begins")),function(){return Mr(e)}},Mr=function(e){Et.mark("".concat(pe," ").concat(e," ends")),Et.measure("".concat(pe," ").concat(e),"".concat(pe," ").concat(e," begins"),"".concat(pe," ").concat(e," ends"))},Wt={begin:Di,end:Mr},je=function(){};function In(t){var e=t.getAttribute?t.getAttribute(ae):null;return typeof e=="string"}function Li(t){var e=t.getAttribute?t.getAttribute(qt):null,n=t.getAttribute?t.getAttribute(Qt):null;return e&&n}function $i(t){return t&&t.classList&&t.classList.contains&&t.classList.contains(v.replacementClass)}function qi(){if(v.autoReplaceSvg===!0)return Ue.replace;var t=Ue[v.autoReplaceSvg];return t||Ue.replace}function Qi(t){return E.createElementNS("http://www.w3.org/2000/svg",t)}function ji(t){return E.createElement(t)}function Nr(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=e.ceFn,r=n===void 0?t.tag==="svg"?Qi:ji:n;if(typeof t=="string")return E.createTextNode(t);var a=r(t.tag);Object.keys(t.attributes||[]).forEach(function(s){a.setAttribute(s,t.attributes[s])});var i=t.children||[];return i.forEach(function(s){a.appendChild(Nr(s,{ceFn:r}))}),a}function Ui(t){var e=" ".concat(t.outerHTML," ");return e="".concat(e,"Font Awesome fontawesome.com "),e}var Ue={replace:function(e){var n=e[0];if(n.parentNode)if(e[1].forEach(function(a){n.parentNode.insertBefore(Nr(a),n)}),n.getAttribute(ae)===null&&v.keepOriginalSource){var r=E.createComment(Ui(n));n.parentNode.replaceChild(r,n)}else n.remove()},nest:function(e){var n=e[0],r=e[1];if(~Ut(n).indexOf(v.replacementClass))return Ue.replace(e);var a=new RegExp("".concat(v.cssPrefix,"-.*"));if(delete r[0].attributes.id,r[0].attributes.class){var i=r[0].attributes.class.split(" ").reduce(function(o,l){return l===v.replacementClass||l.match(a)?o.toSvg.push(l):o.toNode.push(l),o},{toNode:[],toSvg:[]});r[0].attributes.class=i.toSvg.join(" "),i.toNode.length===0?n.removeAttribute("class"):n.setAttribute("class",i.toNode.join(" "))}var s=r.map(function(o){return Ee(o)}).join(`
`);n.setAttribute(ae,""),n.innerHTML=s}};function Tn(t){t()}function Dr(t,e){var n=typeof e=="function"?e:je;if(t.length===0)n();else{var r=Tn;v.mutateApproach===Ha&&(r=V.requestAnimationFrame||Tn),r(function(){var a=qi(),i=Wt.begin("mutate");t.map(a),i(),n()})}}var Gt=!1;function Lr(){Gt=!0}function Rt(){Gt=!1}var Xe=null;function Fn(t){if(xn&&v.observeMutations){var e=t.treeCallback,n=e===void 0?je:e,r=t.nodeCallback,a=r===void 0?je:r,i=t.pseudoElementsCallback,s=i===void 0?je:i,o=t.observeMutationsRoot,l=o===void 0?E:o;Xe=new xn(function(f){if(!Gt){var u=J();he(f).forEach(function(c){if(c.type==="childList"&&c.addedNodes.length>0&&!In(c.addedNodes[0])&&(v.searchPseudoElements&&s(c.target),n(c.target)),c.type==="attributes"&&c.target.parentNode&&v.searchPseudoElements&&s(c.target.parentNode),c.type==="attributes"&&In(c.target)&&~Za.indexOf(c.attributeName))if(c.attributeName==="class"&&Li(c.target)){var d=tt(Ut(c.target)),h=d.prefix,g=d.iconName;c.target.setAttribute(qt,h||u),g&&c.target.setAttribute(Qt,g)}else $i(c.target)&&a(c.target)})}}),B&&Xe.observe(l,{childList:!0,attributes:!0,characterData:!0,subtree:!0})}}function zi(){Xe&&Xe.disconnect()}function Yi(t){var e=t.getAttribute("style"),n=[];return e&&(n=e.split(";").reduce(function(r,a){var i=a.split(":"),s=i[0],o=i.slice(1);return s&&o.length>0&&(r[s]=o.join(":").trim()),r},{})),n}function Ki(t){var e=t.getAttribute("data-prefix"),n=t.getAttribute("data-icon"),r=t.innerText!==void 0?t.innerText.trim():"",a=tt(Ut(t));return a.prefix||(a.prefix=J()),e&&n&&(a.prefix=e,a.iconName=n),a.iconName&&a.prefix||(a.prefix&&r.length>0&&(a.iconName=xi(a.prefix,t.innerText)||Kt(a.prefix,St(t.innerText))),!a.iconName&&v.autoFetchSvg&&t.firstChild&&t.firstChild.nodeType===Node.TEXT_NODE&&(a.iconName=t.firstChild.data)),a}function Hi(t){var e=he(t.attributes).reduce(function(a,i){return a.name!=="class"&&a.name!=="style"&&(a[i.name]=i.value),a},{}),n=t.getAttribute("title"),r=t.getAttribute("data-fa-title-id");return v.autoA11y&&(n?e["aria-labelledby"]="".concat(v.replacementClass,"-title-").concat(r||Ae()):(e["aria-hidden"]="true",e.focusable="false")),e}function Bi(){return{iconName:null,title:null,titleId:null,prefix:null,transform:U,symbol:!1,mask:{iconName:null,prefix:null,rest:[]},maskId:null,extra:{classes:[],styles:{},attributes:{}}}}function Mn(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{styleParser:!0},n=Ki(t),r=n.iconName,a=n.prefix,i=n.rest,s=Hi(t),o=At("parseNodeAttributes",{},t),l=e.styleParser?Yi(t):[];return m({iconName:r,title:t.getAttribute("title"),titleId:t.getAttribute("data-fa-title-id"),prefix:a,transform:U,mask:{iconName:null,prefix:null,rest:[]},maskId:null,symbol:!1,extra:{classes:i,styles:l,attributes:s}},o)}var Wi=Q.styles;function $r(t){var e=v.autoReplaceSvg==="nest"?Mn(t,{styleParser:!1}):Mn(t);return~e.extra.classes.indexOf(wr)?H("generateLayersText",t,e):H("generateSvgReplacementMutation",t,e)}var Z=new Set;jt.map(function(t){Z.add("fa-".concat(t))});Object.keys(ke[_]).map(Z.add.bind(Z));Object.keys(ke[R]).map(Z.add.bind(Z));Z=Pe(Z);function Nn(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;if(!B)return Promise.resolve();var n=E.documentElement.classList,r=function(c){return n.add("".concat(Sn,"-").concat(c))},a=function(c){return n.remove("".concat(Sn,"-").concat(c))},i=v.autoFetchSvg?Z:jt.map(function(u){return"fa-".concat(u)}).concat(Object.keys(Wi));i.includes("fa")||i.push("fa");var s=[".".concat(wr,":not([").concat(ae,"])")].concat(i.map(function(u){return".".concat(u,":not([").concat(ae,"])")})).join(", ");if(s.length===0)return Promise.resolve();var o=[];try{o=he(t.querySelectorAll(s))}catch{}if(o.length>0)r("pending"),a("complete");else return Promise.resolve();var l=Wt.begin("onTree"),f=o.reduce(function(u,c){try{var d=$r(c);d&&u.push(d)}catch(h){br||h.name==="MissingIcon"&&console.error(h)}return u},[]);return new Promise(function(u,c){Promise.all(f).then(function(d){Dr(d,function(){r("active"),r("complete"),a("pending"),typeof e=="function"&&e(),l(),u()})}).catch(function(d){l(),c(d)})})}function Gi(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;$r(t).then(function(n){n&&Dr([n],e)})}function Xi(t){return function(e){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=(e||{}).icon?e:Ct(e||{}),a=n.mask;return a&&(a=(a||{}).icon?a:Ct(a||{})),t(r,m(m({},n),{},{mask:a}))}}var Vi=function(e){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=n.transform,a=r===void 0?U:r,i=n.symbol,s=i===void 0?!1:i,o=n.mask,l=o===void 0?null:o,f=n.maskId,u=f===void 0?null:f,c=n.title,d=c===void 0?null:c,h=n.titleId,g=h===void 0?null:h,y=n.classes,p=y===void 0?[]:y,S=n.attributes,A=S===void 0?{}:S,b=n.styles,C=b===void 0?{}:b;if(e){var O=e.prefix,x=e.iconName,w=e.icon;return nt(m({type:"icon"},e),function(){return ie("beforeDOMElementCreation",{iconDefinition:e,params:n}),v.autoA11y&&(d?A["aria-labelledby"]="".concat(v.replacementClass,"-title-").concat(g||Ae()):(A["aria-hidden"]="true",A.focusable="false")),Bt({icons:{main:Pt(w),mask:l?Pt(l.icon):{found:!1,width:null,height:null,icon:{}}},prefix:O,iconName:x,transform:m(m({},U),a),symbol:s,title:d,maskId:u,titleId:g,extra:{attributes:A,styles:C,classes:p}})})}},Ji={mixout:function(){return{icon:Xi(Vi)}},hooks:function(){return{mutationObserverCallbacks:function(n){return n.treeCallback=Nn,n.nodeCallback=Gi,n}}},provides:function(e){e.i2svg=function(n){var r=n.node,a=r===void 0?E:r,i=n.callback,s=i===void 0?function(){}:i;return Nn(a,s)},e.generateSvgReplacementMutation=function(n,r){var a=r.iconName,i=r.title,s=r.titleId,o=r.prefix,l=r.transform,f=r.symbol,u=r.mask,c=r.maskId,d=r.extra;return new Promise(function(h,g){Promise.all([_t(a,o),u.iconName?_t(u.iconName,u.prefix):Promise.resolve({found:!1,width:512,height:512,icon:{}})]).then(function(y){var p=Lt(y,2),S=p[0],A=p[1];h([n,Bt({icons:{main:S,mask:A},prefix:o,iconName:a,transform:l,symbol:f,maskId:c,title:i,titleId:s,extra:d,watchable:!0})])}).catch(g)})},e.generateAbstractIcon=function(n){var r=n.children,a=n.attributes,i=n.main,s=n.transform,o=n.styles,l=Ze(o);l.length>0&&(a.style=l);var f;return zt(s)&&(f=H("generateAbstractTransformGrouping",{main:i,transform:s,containerWidth:i.width,iconWidth:i.width})),r.push(f||i.icon),{children:r,attributes:a}}}},Zi={mixout:function(){return{layer:function(n){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=r.classes,i=a===void 0?[]:a;return nt({type:"layer"},function(){ie("beforeDOMElementCreation",{assembler:n,params:r});var s=[];return n(function(o){Array.isArray(o)?o.map(function(l){s=s.concat(l.abstract)}):s=s.concat(o.abstract)}),[{tag:"span",attributes:{class:["".concat(v.cssPrefix,"-layers")].concat(Pe(i)).join(" ")},children:s}]})}}}},es={mixout:function(){return{counter:function(n){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=r.title,i=a===void 0?null:a,s=r.classes,o=s===void 0?[]:s,l=r.attributes,f=l===void 0?{}:l,u=r.styles,c=u===void 0?{}:u;return nt({type:"counter",content:n},function(){return ie("beforeDOMElementCreation",{content:n,params:r}),Fi({content:n.toString(),title:i,extra:{attributes:f,styles:c,classes:["".concat(v.cssPrefix,"-layers-counter")].concat(Pe(o))}})})}}}},ts={mixout:function(){return{text:function(n){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=r.transform,i=a===void 0?U:a,s=r.title,o=s===void 0?null:s,l=r.classes,f=l===void 0?[]:l,u=r.attributes,c=u===void 0?{}:u,d=r.styles,h=d===void 0?{}:d;return nt({type:"text",content:n},function(){return ie("beforeDOMElementCreation",{content:n,params:r}),En({content:n,transform:m(m({},U),i),title:o,extra:{attributes:c,styles:h,classes:["".concat(v.cssPrefix,"-layers-text")].concat(Pe(f))}})})}}},provides:function(e){e.generateLayersText=function(n,r){var a=r.title,i=r.transform,s=r.extra,o=null,l=null;if(pr){var f=parseInt(getComputedStyle(n).fontSize,10),u=n.getBoundingClientRect();o=u.width/f,l=u.height/f}return v.autoA11y&&!a&&(s.attributes["aria-hidden"]="true"),Promise.resolve([n,En({content:n.innerHTML,width:o,height:l,transform:i,title:a,extra:s,watchable:!0})])}}},ns=new RegExp('"',"ug"),Dn=[1105920,1112319];function rs(t){var e=t.replace(ns,""),n=pi(e,0),r=n>=Dn[0]&&n<=Dn[1],a=e.length===2?e[0]===e[1]:!1;return{value:St(a?e[0]:e),isSecondary:r||a}}function Ln(t,e){var n="".concat(Ka).concat(e.replace(":","-"));return new Promise(function(r,a){if(t.getAttribute(n)!==null)return r();var i=he(t.children),s=i.filter(function(w){return w.getAttribute(xt)===e})[0],o=V.getComputedStyle(t,e),l=o.getPropertyValue("font-family").match(Xa),f=o.getPropertyValue("font-weight"),u=o.getPropertyValue("content");if(s&&!l)return t.removeChild(s),r();if(l&&u!=="none"&&u!==""){var c=o.getPropertyValue("content"),d=~["Sharp"].indexOf(l[2])?R:_,h=~["Solid","Regular","Light","Thin","Duotone","Brands","Kit"].indexOf(l[2])?xe[d][l[2].toLowerCase()]:Va[d][f],g=rs(c),y=g.value,p=g.isSecondary,S=l[0].startsWith("FontAwesome"),A=Kt(h,y),b=A;if(S){var C=Si(y);C.iconName&&C.prefix&&(A=C.iconName,h=C.prefix)}if(A&&!p&&(!s||s.getAttribute(qt)!==h||s.getAttribute(Qt)!==b)){t.setAttribute(n,b),s&&t.removeChild(s);var O=Bi(),x=O.extra;x.attributes[xt]=e,_t(A,h).then(function(w){var k=Bt(m(m({},O),{},{icons:{main:w,mask:Ht()},prefix:h,iconName:b,extra:x,watchable:!0})),P=E.createElement("svg");e==="::before"?t.insertBefore(P,t.firstChild):t.appendChild(P),P.outerHTML=k.map(function(z){return Ee(z)}).join(`
`),t.removeAttribute(n),r()}).catch(a)}else r()}else r()})}function as(t){return Promise.all([Ln(t,"::before"),Ln(t,"::after")])}function is(t){return t.parentNode!==document.head&&!~Ba.indexOf(t.tagName.toUpperCase())&&!t.getAttribute(xt)&&(!t.parentNode||t.parentNode.tagName!=="svg")}function $n(t){if(B)return new Promise(function(e,n){var r=he(t.querySelectorAll("*")).filter(is).map(as),a=Wt.begin("searchPseudoElements");Lr(),Promise.all(r).then(function(){a(),Rt(),e()}).catch(function(){a(),Rt(),n()})})}var ss={hooks:function(){return{mutationObserverCallbacks:function(n){return n.pseudoElementsCallback=$n,n}}},provides:function(e){e.pseudoElements2svg=function(n){var r=n.node,a=r===void 0?E:r;v.searchPseudoElements&&$n(a)}}},qn=!1,os={mixout:function(){return{dom:{unwatch:function(){Lr(),qn=!0}}}},hooks:function(){return{bootstrap:function(){Fn(At("mutationObserverCallbacks",{}))},noAuto:function(){zi()},watch:function(n){var r=n.observeMutationsRoot;qn?Rt():Fn(At("mutationObserverCallbacks",{observeMutationsRoot:r}))}}}},Qn=function(e){var n={size:16,x:0,y:0,flipX:!1,flipY:!1,rotate:0};return e.toLowerCase().split(" ").reduce(function(r,a){var i=a.toLowerCase().split("-"),s=i[0],o=i.slice(1).join("-");if(s&&o==="h")return r.flipX=!0,r;if(s&&o==="v")return r.flipY=!0,r;if(o=parseFloat(o),isNaN(o))return r;switch(s){case"grow":r.size=r.size+o;break;case"shrink":r.size=r.size-o;break;case"left":r.x=r.x-o;break;case"right":r.x=r.x+o;break;case"up":r.y=r.y-o;break;case"down":r.y=r.y+o;break;case"rotate":r.rotate=r.rotate+o;break}return r},n)},ls={mixout:function(){return{parse:{transform:function(n){return Qn(n)}}}},hooks:function(){return{parseNodeAttributes:function(n,r){var a=r.getAttribute("data-fa-transform");return a&&(n.transform=Qn(a)),n}}},provides:function(e){e.generateAbstractTransformGrouping=function(n){var r=n.main,a=n.transform,i=n.containerWidth,s=n.iconWidth,o={transform:"translate(".concat(i/2," 256)")},l="translate(".concat(a.x*32,", ").concat(a.y*32,") "),f="scale(".concat(a.size/16*(a.flipX?-1:1),", ").concat(a.size/16*(a.flipY?-1:1),") "),u="rotate(".concat(a.rotate," 0 0)"),c={transform:"".concat(l," ").concat(f," ").concat(u)},d={transform:"translate(".concat(s/2*-1," -256)")},h={outer:o,inner:c,path:d};return{tag:"g",attributes:m({},h.outer),children:[{tag:"g",attributes:m({},h.inner),children:[{tag:r.icon.tag,children:r.icon.children,attributes:m(m({},r.icon.attributes),h.path)}]}]}}}},ot={x:0,y:0,width:"100%",height:"100%"};function jn(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;return t.attributes&&(t.attributes.fill||e)&&(t.attributes.fill="black"),t}function us(t){return t.tag==="g"?t.children:[t]}var cs={hooks:function(){return{parseNodeAttributes:function(n,r){var a=r.getAttribute("data-fa-mask"),i=a?tt(a.split(" ").map(function(s){return s.trim()})):Ht();return i.prefix||(i.prefix=J()),n.mask=i,n.maskId=r.getAttribute("data-fa-mask-id"),n}}},provides:function(e){e.generateAbstractMask=function(n){var r=n.children,a=n.attributes,i=n.main,s=n.mask,o=n.maskId,l=n.transform,f=i.width,u=i.icon,c=s.width,d=s.icon,h=li({transform:l,containerWidth:c,iconWidth:f}),g={tag:"rect",attributes:m(m({},ot),{},{fill:"white"})},y=u.children?{children:u.children.map(jn)}:{},p={tag:"g",attributes:m({},h.inner),children:[jn(m({tag:u.tag,attributes:m(m({},u.attributes),h.path)},y))]},S={tag:"g",attributes:m({},h.outer),children:[p]},A="mask-".concat(o||Ae()),b="clip-".concat(o||Ae()),C={tag:"mask",attributes:m(m({},ot),{},{id:A,maskUnits:"userSpaceOnUse",maskContentUnits:"userSpaceOnUse"}),children:[g,S]},O={tag:"defs",children:[{tag:"clipPath",attributes:{id:b},children:us(d)},C]};return r.push(O,{tag:"rect",attributes:m({fill:"currentColor","clip-path":"url(#".concat(b,")"),mask:"url(#".concat(A,")")},ot)}),{children:r,attributes:a}}}},fs={provides:function(e){var n=!1;V.matchMedia&&(n=V.matchMedia("(prefers-reduced-motion: reduce)").matches),e.missingIconAbstract=function(){var r=[],a={fill:"currentColor"},i={attributeType:"XML",repeatCount:"indefinite",dur:"2s"};r.push({tag:"path",attributes:m(m({},a),{},{d:"M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z"})});var s=m(m({},i),{},{attributeName:"opacity"}),o={tag:"circle",attributes:m(m({},a),{},{cx:"256",cy:"364",r:"28"}),children:[]};return n||o.children.push({tag:"animate",attributes:m(m({},i),{},{attributeName:"r",values:"28;14;28;28;14;28;"})},{tag:"animate",attributes:m(m({},s),{},{values:"1;0;1;1;0;1;"})}),r.push(o),r.push({tag:"path",attributes:m(m({},a),{},{opacity:"1",d:"M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z"}),children:n?[]:[{tag:"animate",attributes:m(m({},s),{},{values:"1;0;0;0;0;1;"})}]}),n||r.push({tag:"path",attributes:m(m({},a),{},{opacity:"0",d:"M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z"}),children:[{tag:"animate",attributes:m(m({},s),{},{values:"0;0;1;1;0;0;"})}]}),{tag:"g",attributes:{class:"missing"},children:r}}}},ds={hooks:function(){return{parseNodeAttributes:function(n,r){var a=r.getAttribute("data-fa-symbol"),i=a===null?!1:a===""?!0:a;return n.symbol=i,n}}}},hs=[fi,Ji,Zi,es,ts,ss,os,ls,cs,fs,ds];Ci(hs,{mixoutsTo:F});F.noAuto;F.config;F.library;F.dom;F.parse;F.findIconDefinition;F.toHtml;F.icon;F.layer;F.text;F.counter;const ms=L('<div class="col-span-12 grid auto-rows-min grid-cols-1"><h2 class="text-center text-xl font-semibold">You are currently logged out.</h2><div><p class="py-8 text-center">You must login to this app through Spotify in order to view your duplicate songs</p><div class="flex justify-center"><button class="flex items-center justify-start rounded-lg border-2 border-green-900 bg-green-600 p-2 text-center text-gray-200"><!#><!/>Click here to login through Spotify</button></div></div></div>',14);function vs(t){return(()=>{const e=D(ms),n=e.firstChild,r=n.nextSibling,a=r.firstChild,i=a.nextSibling,s=i.firstChild,o=s.firstChild,[l,f]=j(o.nextSibling);return l.nextSibling,s.$$click=()=>{t.spotifyClient&&t.spotifyClient.initiateAuthFlow()},N(s,q(fr,{class:"mr-2 w-[1em] fill-[currentColor]"}),l,f),Tt(),e})()}Hn(["click"]);const ps=L('<div class="relative flex h-full w-full flex-col"><div class="relative flex-grow overflow-y-clip"><div class="grid h-full grid-cols-12 grid-rows-[auto_auto_1fr] overflow-y-auto"><div id="top-shadow-trigger"></div><div></div><div></div><h1 class="col-span-12 h-fit px-10 py-4 text-center text-4xl font-bold">Spotify Song Deduplicator</h1><!#><!/><!#><!/><div id="bottom-shadow-trigger" class="-mt-1"></div></div></div></div>',20),gs=L('<div class="col-span-12 flex justify-center"><div class="h-16 w-16  animate-spin rounded-full border-8 border-solid border-gray-400 border-t-green-300 text-center"></div></div>',4),ys=new ha,ws=()=>{const[t,e]=se(null),[n,r]=se(!1),[a,i]=se(!1),[s,o]=se();return It(async()=>{const l=new IntersectionObserver(f=>{for(const u of f)u.target.id==="top-shadow-trigger"?r(!u.isIntersecting):u.target.id==="bottom-shadow-trigger"&&i(!u.isIntersecting)});l.observe(document.getElementById("top-shadow-trigger")),l.observe(document.getElementById("bottom-shadow-trigger")),o(new Jr({onReady:f=>e(f)}))}),q(Oa,{client:ys,get children(){const l=D(ps),f=l.firstChild,u=f.firstChild,c=u.firstChild,d=c.nextSibling,h=d.nextSibling,g=h.nextSibling,y=g.nextSibling,[p,S]=j(y.nextSibling),A=p.nextSibling,[b,C]=j(A.nextSibling);return b.nextSibling,N(u,(()=>{const O=ce(()=>t()===null);return()=>O()&&D(gs)})(),p,S),N(u,(()=>{const O=ce(()=>t()!==null);return()=>O()&&(t()?q(Na,{get spotifyClient(){return s()}}):q(vs,{get spotifyClient(){return s()}}))})(),b,C),ct(O=>{const x=bt(a()&&"shadow-[inset_0px_-40px_20px_-20px_rgba(0,0,0,0.3)]","delay-50 pointer-events-none absolute top-0 z-10 h-full w-full transition-[box-shadow] duration-500"),w=bt(n()&&"shadow-[inset_0_40px_20px_-20px_rgba(0,0,0,0.3)]","delay-50 pointer-events-none absolute top-0 z-10 h-full w-full transition-[box-shadow] duration-500");return x!==O._v$&&ft(d,O._v$=x),w!==O._v$2&&ft(h,O._v$2=w),O},{_v$:void 0,_v$2:void 0}),l}})};export{ws as default};
