import{$ as rt,a as Ge,g as Un,b as le,c as st,m as zn,o as _e,d as Yn,e as q,f as Kn,u as Xe,h as qr,i as ue,j as Qr,k as ct,s as jr,l as D,n as Ur,r as Re,t as L,p as Hn,q as j,v as N,F as zr,w as ce,x as Ve,y as Je}from"./web.09441124.js";const fe="928713b0001c4592a9910f798369bffb",Bn="spotify_code_verifier",Wn="spotify_access_token",Gn="spotify_refresh_token",dt=()=>window.localStorage,Yr=()=>dt().getItem(Wn),Ze=e=>dt().setItem(Wn,e),Kr=()=>dt().getItem(Gn),tn=e=>dt().setItem(Gn,e),Hr=()=>dt().getItem(Bn),Br=e=>dt().setItem(Bn,e),Wr=()=>new URLSearchParams(window.location.search).get("code");function Gr(e){let t="";const n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";for(let r=0;r<e;r++)t+=n.charAt(Math.floor(Math.random()*n.length));return t}async function Xr(e){const t=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(e));return btoa(String.fromCharCode(...new Uint8Array(t))).replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_")}const en=()=>{window.localStorage.clear(),window.sessionStorage.clear()},nn=()=>{window.location.href=window.location.href.split("?")[0]},Vr=async({code:e,codeVerifier:t})=>{const n=await fetch("https://accounts.spotify.com/api/token?"+new URLSearchParams({code:e,redirect_uri:"https://willwill96.github.io/spotify-song-deduplication",grant_type:"authorization_code",code_verifier:t,client_id:fe}).toString(),{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"}});if(n.status!==200)throw new Error("Bad authorization_code");return n.json()};class Jr{loggedIn=!1;tokenAcquisitionPromise=null;onReady;constructor(t={}){const{onReady:n=()=>{}}=t;this.onReady=n;const r=Hr(),a=Wr();r&&a?this.doTokenInitialization({code:a,codeVerifier:r}):this.determineIfLoggedIn()}doTokenInitialization({code:t,codeVerifier:n}){const r=async()=>{try{const a=await Vr({code:t,codeVerifier:n});Ze(a.access_token),tn(a.refresh_token)}catch(a){console.log("Error getting access tokens",a),en(),nn()}this.loggedIn=!0,this.tokenAcquisitionPromise=null,window.history.replaceState(null,"",window.location.pathname.split("?")[0]),this.onReady(this.loggedIn)};this.tokenAcquisitionPromise=r()}async attemptAccessTokenRefresh(){const t=Kr();if(!t)throw new Error("Invalid Refresh Token");const n=await fetch("https://accounts.spotify.com/api/token?"+new URLSearchParams({grant_type:"refresh_token",refresh_token:t,client_id:fe}).toString(),{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"}});if(n.status!==200)throw new Error("Something went wrong in refresh token acquisition");const{access_token:r,refresh_token:a}=await n.json();Ze(r),a&&tn(a)}async determineIfLoggedIn(){try{await this.fetchSpotifyRoute("https://api.spotify.com/v1/me"),this.loggedIn=!0,this.onReady(this.loggedIn)}catch{this.onReady(!1)}}async fetchSpotifyRoute(t){this.tokenAcquisitionPromise&&await this.tokenAcquisitionPromise;const n=Yr();if(!n)throw new Error("No Access Token Found");try{const r=await await fetch(t,{headers:{Authorization:"Bearer "+n,"Content-Type":"application/json"}});if(r.status===200)return r.json();if(r.status===401)return this.tokenAcquisitionPromise?(await this.tokenAcquisitionPromise,this.fetchSpotifyRoute(t)):(this.tokenAcquisitionPromise=this.attemptAccessTokenRefresh(),await this.tokenAcquisitionPromise,this.tokenAcquisitionPromise=null,this.fetchSpotifyRoute(t));throw new Error("Not authenticated")}catch{en(),nn()}return null}async initiateAuthFlow(){const t=Gr(64);Br(t),window.location.href="https://accounts.spotify.com/authorize?"+new URLSearchParams({response_type:"code",client_id:fe,scope:"playlist-read-private playlist-modify-private playlist-modify-public playlist-read-collaborative",redirect_uri:"https://willwill96.github.io/spotify-song-deduplication",code_challenge_method:"S256",code_challenge:await Xr(t)}).toString()}}class Ct{constructor(){this.listeners=[],this.subscribe=this.subscribe.bind(this)}subscribe(t){return this.listeners.push(t),this.onSubscribe(),()=>{this.listeners=this.listeners.filter(n=>n!==t),this.onUnsubscribe()}}hasListeners(){return this.listeners.length>0}onSubscribe(){}onUnsubscribe(){}}const bt=typeof window>"u"||"Deno"in window;function M(){}function Zr(e,t){return typeof e=="function"?e(t):e}function de(e){return typeof e=="number"&&e>=0&&e!==1/0}function Xn(e,t){return Math.max(e+(t||0)-Date.now(),0)}function Rt(e,t,n){return Vt(e)?typeof t=="function"?{...n,queryKey:e,queryFn:t}:{...t,queryKey:e}:e}function X(e,t,n){return Vt(e)?[{...t,queryKey:e},n]:[e||{},t]}function rn(e,t){const{type:n="all",exact:r,fetchStatus:a,predicate:i,queryKey:s,stale:o}=e;if(Vt(s)){if(r){if(t.queryHash!==Ie(s,t.options))return!1}else if(!zt(t.queryKey,s))return!1}if(n!=="all"){const l=t.isActive();if(n==="active"&&!l||n==="inactive"&&l)return!1}return!(typeof o=="boolean"&&t.isStale()!==o||typeof a<"u"&&a!==t.state.fetchStatus||i&&!i(t))}function an(e,t){const{exact:n,fetching:r,predicate:a,mutationKey:i}=e;if(Vt(i)){if(!t.options.mutationKey)return!1;if(n){if(tt(t.options.mutationKey)!==tt(i))return!1}else if(!zt(t.options.mutationKey,i))return!1}return!(typeof r=="boolean"&&t.state.status==="loading"!==r||a&&!a(t))}function Ie(e,t){return(t?.queryKeyHashFn||tt)(e)}function tt(e){return JSON.stringify(e,(t,n)=>he(n)?Object.keys(n).sort().reduce((r,a)=>(r[a]=n[a],r),{}):n)}function zt(e,t){return Vn(e,t)}function Vn(e,t){return e===t?!0:typeof e!=typeof t?!1:e&&t&&typeof e=="object"&&typeof t=="object"?!Object.keys(t).some(n=>!Vn(e[n],t[n])):!1}function Jn(e,t){if(e===t)return e;const n=on(e)&&on(t);if(n||he(e)&&he(t)){const r=n?e.length:Object.keys(e).length,a=n?t:Object.keys(t),i=a.length,s=n?[]:{};let o=0;for(let l=0;l<i;l++){const f=n?l:a[l];s[f]=Jn(e[f],t[f]),s[f]===e[f]&&o++}return r===i&&o===r?e:s}return t}function sn(e,t){if(e&&!t||t&&!e)return!1;for(const n in e)if(e[n]!==t[n])return!1;return!0}function on(e){return Array.isArray(e)&&e.length===Object.keys(e).length}function he(e){if(!ln(e))return!1;const t=e.constructor;if(typeof t>"u")return!0;const n=t.prototype;return!(!ln(n)||!n.hasOwnProperty("isPrototypeOf"))}function ln(e){return Object.prototype.toString.call(e)==="[object Object]"}function Vt(e){return Array.isArray(e)}function Zn(e){return new Promise(t=>{setTimeout(t,e)})}function un(e){Zn(0).then(e)}function ta(){if(typeof AbortController=="function")return new AbortController}function me(e,t,n){return n.isDataEqual!=null&&n.isDataEqual(e,t)?e:typeof n.structuralSharing=="function"?n.structuralSharing(e,t):n.structuralSharing!==!1?Jn(e,t):t}class ea extends Ct{constructor(){super(),this.setup=t=>{if(!bt&&window.addEventListener){const n=()=>t();return window.addEventListener("visibilitychange",n,!1),window.addEventListener("focus",n,!1),()=>{window.removeEventListener("visibilitychange",n),window.removeEventListener("focus",n)}}}}onSubscribe(){this.cleanup||this.setEventListener(this.setup)}onUnsubscribe(){if(!this.hasListeners()){var t;(t=this.cleanup)==null||t.call(this),this.cleanup=void 0}}setEventListener(t){var n;this.setup=t,(n=this.cleanup)==null||n.call(this),this.cleanup=t(r=>{typeof r=="boolean"?this.setFocused(r):this.onFocus()})}setFocused(t){this.focused=t,t&&this.onFocus()}onFocus(){this.listeners.forEach(t=>{t()})}isFocused(){return typeof this.focused=="boolean"?this.focused:typeof document>"u"?!0:[void 0,"visible","prerender"].includes(document.visibilityState)}}const Yt=new ea;class na extends Ct{constructor(){super(),this.setup=t=>{if(!bt&&window.addEventListener){const n=()=>t();return window.addEventListener("online",n,!1),window.addEventListener("offline",n,!1),()=>{window.removeEventListener("online",n),window.removeEventListener("offline",n)}}}}onSubscribe(){this.cleanup||this.setEventListener(this.setup)}onUnsubscribe(){if(!this.hasListeners()){var t;(t=this.cleanup)==null||t.call(this),this.cleanup=void 0}}setEventListener(t){var n;this.setup=t,(n=this.cleanup)==null||n.call(this),this.cleanup=t(r=>{typeof r=="boolean"?this.setOnline(r):this.onOnline()})}setOnline(t){this.online=t,t&&this.onOnline()}onOnline(){this.listeners.forEach(t=>{t()})}isOnline(){return typeof this.online=="boolean"?this.online:typeof navigator>"u"||typeof navigator.onLine>"u"?!0:navigator.onLine}}const Kt=new na;function ra(e){return Math.min(1e3*2**e,3e4)}function Jt(e){return(e??"online")==="online"?Kt.isOnline():!0}class tr{constructor(t){this.revert=t?.revert,this.silent=t?.silent}}function Qt(e){return e instanceof tr}function er(e){let t=!1,n=0,r=!1,a,i,s;const o=new Promise((v,S)=>{i=v,s=S}),l=v=>{r||(d(new tr(v)),e.abort==null||e.abort())},f=()=>{t=!0},u=()=>{t=!1},c=()=>!Yt.isFocused()||e.networkMode!=="always"&&!Kt.isOnline(),h=v=>{r||(r=!0,e.onSuccess==null||e.onSuccess(v),a?.(),i(v))},d=v=>{r||(r=!0,e.onError==null||e.onError(v),a?.(),s(v))},g=()=>new Promise(v=>{a=S=>{const A=r||!c();return A&&v(S),A},e.onPause==null||e.onPause()}).then(()=>{a=void 0,r||e.onContinue==null||e.onContinue()}),y=()=>{if(r)return;let v;try{v=e.fn()}catch(S){v=Promise.reject(S)}Promise.resolve(v).then(h).catch(S=>{var A,b;if(r)return;const C=(A=e.retry)!=null?A:3,O=(b=e.retryDelay)!=null?b:ra,x=typeof O=="function"?O(n,S):O,w=C===!0||typeof C=="number"&&n<C||typeof C=="function"&&C(n,S);if(t||!w){d(S);return}n++,e.onFail==null||e.onFail(n,S),Zn(x).then(()=>{if(c())return g()}).then(()=>{t?d(S):y()})})};return Jt(e.networkMode)?y():g().then(y),{promise:o,cancel:l,continue:()=>a?.()?o:Promise.resolve(),cancelRetry:f,continueRetry:u}}const Te=console;function aa(){let e=[],t=0,n=u=>{u()},r=u=>{u()};const a=u=>{let c;t++;try{c=u()}finally{t--,t||o()}return c},i=u=>{t?e.push(u):un(()=>{n(u)})},s=u=>(...c)=>{i(()=>{u(...c)})},o=()=>{const u=e;e=[],u.length&&un(()=>{r(()=>{u.forEach(c=>{n(c)})})})};return{batch:a,batchCalls:s,schedule:i,setNotifyFunction:u=>{n=u},setBatchNotifyFunction:u=>{r=u}}}const T=aa();class nr{destroy(){this.clearGcTimeout()}scheduleGc(){this.clearGcTimeout(),de(this.cacheTime)&&(this.gcTimeout=setTimeout(()=>{this.optionalRemove()},this.cacheTime))}updateCacheTime(t){this.cacheTime=Math.max(this.cacheTime||0,t??(bt?1/0:5*60*1e3))}clearGcTimeout(){this.gcTimeout&&(clearTimeout(this.gcTimeout),this.gcTimeout=void 0)}}class ia extends nr{constructor(t){super(),this.abortSignalConsumed=!1,this.defaultOptions=t.defaultOptions,this.setOptions(t.options),this.observers=[],this.cache=t.cache,this.logger=t.logger||Te,this.queryKey=t.queryKey,this.queryHash=t.queryHash,this.initialState=t.state||sa(this.options),this.state=this.initialState,this.scheduleGc()}get meta(){return this.options.meta}setOptions(t){this.options={...this.defaultOptions,...t},this.updateCacheTime(this.options.cacheTime)}optionalRemove(){!this.observers.length&&this.state.fetchStatus==="idle"&&this.cache.remove(this)}setData(t,n){const r=me(this.state.data,t,this.options);return this.dispatch({data:r,type:"success",dataUpdatedAt:n?.updatedAt,manual:n?.manual}),r}setState(t,n){this.dispatch({type:"setState",state:t,setStateOptions:n})}cancel(t){var n;const r=this.promise;return(n=this.retryer)==null||n.cancel(t),r?r.then(M).catch(M):Promise.resolve()}destroy(){super.destroy(),this.cancel({silent:!0})}reset(){this.destroy(),this.setState(this.initialState)}isActive(){return this.observers.some(t=>t.options.enabled!==!1)}isDisabled(){return this.getObserversCount()>0&&!this.isActive()}isStale(){return this.state.isInvalidated||!this.state.dataUpdatedAt||this.observers.some(t=>t.getCurrentResult().isStale)}isStaleByTime(t=0){return this.state.isInvalidated||!this.state.dataUpdatedAt||!Xn(this.state.dataUpdatedAt,t)}onFocus(){var t;const n=this.observers.find(r=>r.shouldFetchOnWindowFocus());n&&n.refetch({cancelRefetch:!1}),(t=this.retryer)==null||t.continue()}onOnline(){var t;const n=this.observers.find(r=>r.shouldFetchOnReconnect());n&&n.refetch({cancelRefetch:!1}),(t=this.retryer)==null||t.continue()}addObserver(t){this.observers.indexOf(t)===-1&&(this.observers.push(t),this.clearGcTimeout(),this.cache.notify({type:"observerAdded",query:this,observer:t}))}removeObserver(t){this.observers.indexOf(t)!==-1&&(this.observers=this.observers.filter(n=>n!==t),this.observers.length||(this.retryer&&(this.abortSignalConsumed?this.retryer.cancel({revert:!0}):this.retryer.cancelRetry()),this.scheduleGc()),this.cache.notify({type:"observerRemoved",query:this,observer:t}))}getObserversCount(){return this.observers.length}invalidate(){this.state.isInvalidated||this.dispatch({type:"invalidate"})}fetch(t,n){var r,a;if(this.state.fetchStatus!=="idle"){if(this.state.dataUpdatedAt&&n!=null&&n.cancelRefetch)this.cancel({silent:!0});else if(this.promise){var i;return(i=this.retryer)==null||i.continueRetry(),this.promise}}if(t&&this.setOptions(t),!this.options.queryFn){const d=this.observers.find(g=>g.options.queryFn);d&&this.setOptions(d.options)}Array.isArray(this.options.queryKey);const s=ta(),o={queryKey:this.queryKey,pageParam:void 0,meta:this.meta},l=d=>{Object.defineProperty(d,"signal",{enumerable:!0,get:()=>{if(s)return this.abortSignalConsumed=!0,s.signal}})};l(o);const f=()=>this.options.queryFn?(this.abortSignalConsumed=!1,this.options.queryFn(o)):Promise.reject("Missing queryFn"),u={fetchOptions:n,options:this.options,queryKey:this.queryKey,state:this.state,fetchFn:f};if(l(u),(r=this.options.behavior)==null||r.onFetch(u),this.revertState=this.state,this.state.fetchStatus==="idle"||this.state.fetchMeta!==((a=u.fetchOptions)==null?void 0:a.meta)){var c;this.dispatch({type:"fetch",meta:(c=u.fetchOptions)==null?void 0:c.meta})}const h=d=>{if(Qt(d)&&d.silent||this.dispatch({type:"error",error:d}),!Qt(d)){var g,y,v,S;(g=(y=this.cache.config).onError)==null||g.call(y,d,this),(v=(S=this.cache.config).onSettled)==null||v.call(S,this.state.data,d,this)}this.isFetchingOptimistic||this.scheduleGc(),this.isFetchingOptimistic=!1};return this.retryer=er({fn:u.fetchFn,abort:s?.abort.bind(s),onSuccess:d=>{var g,y,v,S;if(typeof d>"u"){h(new Error("undefined"));return}this.setData(d),(g=(y=this.cache.config).onSuccess)==null||g.call(y,d,this),(v=(S=this.cache.config).onSettled)==null||v.call(S,d,this.state.error,this),this.isFetchingOptimistic||this.scheduleGc(),this.isFetchingOptimistic=!1},onError:h,onFail:(d,g)=>{this.dispatch({type:"failed",failureCount:d,error:g})},onPause:()=>{this.dispatch({type:"pause"})},onContinue:()=>{this.dispatch({type:"continue"})},retry:u.options.retry,retryDelay:u.options.retryDelay,networkMode:u.options.networkMode}),this.promise=this.retryer.promise,this.promise}dispatch(t){const n=r=>{var a,i;switch(t.type){case"failed":return{...r,fetchFailureCount:t.failureCount,fetchFailureReason:t.error};case"pause":return{...r,fetchStatus:"paused"};case"continue":return{...r,fetchStatus:"fetching"};case"fetch":return{...r,fetchFailureCount:0,fetchFailureReason:null,fetchMeta:(a=t.meta)!=null?a:null,fetchStatus:Jt(this.options.networkMode)?"fetching":"paused",...!r.dataUpdatedAt&&{error:null,status:"loading"}};case"success":return{...r,data:t.data,dataUpdateCount:r.dataUpdateCount+1,dataUpdatedAt:(i=t.dataUpdatedAt)!=null?i:Date.now(),error:null,isInvalidated:!1,status:"success",...!t.manual&&{fetchStatus:"idle",fetchFailureCount:0,fetchFailureReason:null}};case"error":const s=t.error;return Qt(s)&&s.revert&&this.revertState?{...this.revertState}:{...r,error:s,errorUpdateCount:r.errorUpdateCount+1,errorUpdatedAt:Date.now(),fetchFailureCount:r.fetchFailureCount+1,fetchFailureReason:s,fetchStatus:"idle",status:"error"};case"invalidate":return{...r,isInvalidated:!0};case"setState":return{...r,...t.state}}};this.state=n(this.state),T.batch(()=>{this.observers.forEach(r=>{r.onQueryUpdate(t)}),this.cache.notify({query:this,type:"updated",action:t})})}}function sa(e){const t=typeof e.initialData=="function"?e.initialData():e.initialData,n=typeof t<"u",r=n?typeof e.initialDataUpdatedAt=="function"?e.initialDataUpdatedAt():e.initialDataUpdatedAt:0;return{data:t,dataUpdateCount:0,dataUpdatedAt:n?r??Date.now():0,error:null,errorUpdateCount:0,errorUpdatedAt:0,fetchFailureCount:0,fetchFailureReason:null,fetchMeta:null,isInvalidated:!1,status:n?"success":"loading",fetchStatus:"idle"}}class oa extends Ct{constructor(t){super(),this.config=t||{},this.queries=[],this.queriesMap={}}build(t,n,r){var a;const i=n.queryKey,s=(a=n.queryHash)!=null?a:Ie(i,n);let o=this.get(s);return o||(o=new ia({cache:this,logger:t.getLogger(),queryKey:i,queryHash:s,options:t.defaultQueryOptions(n),state:r,defaultOptions:t.getQueryDefaults(i)}),this.add(o)),o}add(t){this.queriesMap[t.queryHash]||(this.queriesMap[t.queryHash]=t,this.queries.push(t),this.notify({type:"added",query:t}))}remove(t){const n=this.queriesMap[t.queryHash];n&&(t.destroy(),this.queries=this.queries.filter(r=>r!==t),n===t&&delete this.queriesMap[t.queryHash],this.notify({type:"removed",query:t}))}clear(){T.batch(()=>{this.queries.forEach(t=>{this.remove(t)})})}get(t){return this.queriesMap[t]}getAll(){return this.queries}find(t,n){const[r]=X(t,n);return typeof r.exact>"u"&&(r.exact=!0),this.queries.find(a=>rn(r,a))}findAll(t,n){const[r]=X(t,n);return Object.keys(r).length>0?this.queries.filter(a=>rn(r,a)):this.queries}notify(t){T.batch(()=>{this.listeners.forEach(n=>{n(t)})})}onFocus(){T.batch(()=>{this.queries.forEach(t=>{t.onFocus()})})}onOnline(){T.batch(()=>{this.queries.forEach(t=>{t.onOnline()})})}}class la extends nr{constructor(t){super(),this.defaultOptions=t.defaultOptions,this.mutationId=t.mutationId,this.mutationCache=t.mutationCache,this.logger=t.logger||Te,this.observers=[],this.state=t.state||ua(),this.setOptions(t.options),this.scheduleGc()}setOptions(t){this.options={...this.defaultOptions,...t},this.updateCacheTime(this.options.cacheTime)}get meta(){return this.options.meta}setState(t){this.dispatch({type:"setState",state:t})}addObserver(t){this.observers.indexOf(t)===-1&&(this.observers.push(t),this.clearGcTimeout(),this.mutationCache.notify({type:"observerAdded",mutation:this,observer:t}))}removeObserver(t){this.observers=this.observers.filter(n=>n!==t),this.scheduleGc(),this.mutationCache.notify({type:"observerRemoved",mutation:this,observer:t})}optionalRemove(){this.observers.length||(this.state.status==="loading"?this.scheduleGc():this.mutationCache.remove(this))}continue(){var t,n;return(t=(n=this.retryer)==null?void 0:n.continue())!=null?t:this.execute()}async execute(){const t=()=>{var w;return this.retryer=er({fn:()=>this.options.mutationFn?this.options.mutationFn(this.state.variables):Promise.reject("No mutationFn found"),onFail:(k,P)=>{this.dispatch({type:"failed",failureCount:k,error:P})},onPause:()=>{this.dispatch({type:"pause"})},onContinue:()=>{this.dispatch({type:"continue"})},retry:(w=this.options.retry)!=null?w:0,retryDelay:this.options.retryDelay,networkMode:this.options.networkMode}),this.retryer.promise},n=this.state.status==="loading";try{var r,a,i,s,o,l,f,u;if(!n){var c,h,d,g;this.dispatch({type:"loading",variables:this.options.variables}),await((c=(h=this.mutationCache.config).onMutate)==null?void 0:c.call(h,this.state.variables,this));const k=await((d=(g=this.options).onMutate)==null?void 0:d.call(g,this.state.variables));k!==this.state.context&&this.dispatch({type:"loading",context:k,variables:this.state.variables})}const w=await t();return await((r=(a=this.mutationCache.config).onSuccess)==null?void 0:r.call(a,w,this.state.variables,this.state.context,this)),await((i=(s=this.options).onSuccess)==null?void 0:i.call(s,w,this.state.variables,this.state.context)),await((o=(l=this.mutationCache.config).onSettled)==null?void 0:o.call(l,w,null,this.state.variables,this.state.context,this)),await((f=(u=this.options).onSettled)==null?void 0:f.call(u,w,null,this.state.variables,this.state.context)),this.dispatch({type:"success",data:w}),w}catch(w){try{var y,v,S,A,b,C,O,x;throw await((y=(v=this.mutationCache.config).onError)==null?void 0:y.call(v,w,this.state.variables,this.state.context,this)),await((S=(A=this.options).onError)==null?void 0:S.call(A,w,this.state.variables,this.state.context)),await((b=(C=this.mutationCache.config).onSettled)==null?void 0:b.call(C,void 0,w,this.state.variables,this.state.context,this)),await((O=(x=this.options).onSettled)==null?void 0:O.call(x,void 0,w,this.state.variables,this.state.context)),w}finally{this.dispatch({type:"error",error:w})}}}dispatch(t){const n=r=>{switch(t.type){case"failed":return{...r,failureCount:t.failureCount,failureReason:t.error};case"pause":return{...r,isPaused:!0};case"continue":return{...r,isPaused:!1};case"loading":return{...r,context:t.context,data:void 0,failureCount:0,failureReason:null,error:null,isPaused:!Jt(this.options.networkMode),status:"loading",variables:t.variables};case"success":return{...r,data:t.data,failureCount:0,failureReason:null,error:null,status:"success",isPaused:!1};case"error":return{...r,data:void 0,error:t.error,failureCount:r.failureCount+1,failureReason:t.error,isPaused:!1,status:"error"};case"setState":return{...r,...t.state}}};this.state=n(this.state),T.batch(()=>{this.observers.forEach(r=>{r.onMutationUpdate(t)}),this.mutationCache.notify({mutation:this,type:"updated",action:t})})}}function ua(){return{context:void 0,data:void 0,error:null,failureCount:0,failureReason:null,isPaused:!1,status:"idle",variables:void 0}}class ca extends Ct{constructor(t){super(),this.config=t||{},this.mutations=[],this.mutationId=0}build(t,n,r){const a=new la({mutationCache:this,logger:t.getLogger(),mutationId:++this.mutationId,options:t.defaultMutationOptions(n),state:r,defaultOptions:n.mutationKey?t.getMutationDefaults(n.mutationKey):void 0});return this.add(a),a}add(t){this.mutations.push(t),this.notify({type:"added",mutation:t})}remove(t){this.mutations=this.mutations.filter(n=>n!==t),this.notify({type:"removed",mutation:t})}clear(){T.batch(()=>{this.mutations.forEach(t=>{this.remove(t)})})}getAll(){return this.mutations}find(t){return typeof t.exact>"u"&&(t.exact=!0),this.mutations.find(n=>an(t,n))}findAll(t){return this.mutations.filter(n=>an(t,n))}notify(t){T.batch(()=>{this.listeners.forEach(n=>{n(t)})})}resumePausedMutations(){var t;return this.resuming=((t=this.resuming)!=null?t:Promise.resolve()).then(()=>{const n=this.mutations.filter(r=>r.state.isPaused);return T.batch(()=>n.reduce((r,a)=>r.then(()=>a.continue().catch(M)),Promise.resolve()))}).then(()=>{this.resuming=void 0}),this.resuming}}function fa(){return{onFetch:e=>{e.fetchFn=()=>{var t,n,r,a,i,s;const o=(t=e.fetchOptions)==null||(n=t.meta)==null?void 0:n.refetchPage,l=(r=e.fetchOptions)==null||(a=r.meta)==null?void 0:a.fetchMore,f=l?.pageParam,u=l?.direction==="forward",c=l?.direction==="backward",h=((i=e.state.data)==null?void 0:i.pages)||[],d=((s=e.state.data)==null?void 0:s.pageParams)||[];let g=d,y=!1;const v=x=>{Object.defineProperty(x,"signal",{enumerable:!0,get:()=>{var w;if((w=e.signal)!=null&&w.aborted)y=!0;else{var k;(k=e.signal)==null||k.addEventListener("abort",()=>{y=!0})}return e.signal}})},S=e.options.queryFn||(()=>Promise.reject("Missing queryFn")),A=(x,w,k,P)=>(g=P?[w,...g]:[...g,w],P?[k,...x]:[...x,k]),b=(x,w,k,P)=>{if(y)return Promise.reject("Cancelled");if(typeof k>"u"&&!w&&x.length)return Promise.resolve(x);const z={queryKey:e.queryKey,pageParam:k,meta:e.options.meta};v(z);const mt=S(z);return Promise.resolve(mt).then(W=>A(x,k,W,P))};let C;if(!h.length)C=b([]);else if(u){const x=typeof f<"u",w=x?f:cn(e.options,h);C=b(h,x,w)}else if(c){const x=typeof f<"u",w=x?f:da(e.options,h);C=b(h,x,w,!0)}else{g=[];const x=typeof e.options.getNextPageParam>"u";C=(o&&h[0]?o(h[0],0,h):!0)?b([],x,d[0]):Promise.resolve(A([],d[0],h[0]));for(let k=1;k<h.length;k++)C=C.then(P=>{if(o&&h[k]?o(h[k],k,h):!0){const mt=x?d[k]:cn(e.options,P);return b(P,x,mt)}return Promise.resolve(A(P,d[k],h[k]))})}return C.then(x=>({pages:x,pageParams:g}))}}}}function cn(e,t){return e.getNextPageParam==null?void 0:e.getNextPageParam(t[t.length-1],t)}function da(e,t){return e.getPreviousPageParam==null?void 0:e.getPreviousPageParam(t[0],t)}class ha{constructor(t={}){this.queryCache=t.queryCache||new oa,this.mutationCache=t.mutationCache||new ca,this.logger=t.logger||Te,this.defaultOptions=t.defaultOptions||{},this.queryDefaults=[],this.mutationDefaults=[],this.mountCount=0}mount(){this.mountCount++,this.mountCount===1&&(this.unsubscribeFocus=Yt.subscribe(()=>{Yt.isFocused()&&(this.resumePausedMutations(),this.queryCache.onFocus())}),this.unsubscribeOnline=Kt.subscribe(()=>{Kt.isOnline()&&(this.resumePausedMutations(),this.queryCache.onOnline())}))}unmount(){var t,n;this.mountCount--,this.mountCount===0&&((t=this.unsubscribeFocus)==null||t.call(this),this.unsubscribeFocus=void 0,(n=this.unsubscribeOnline)==null||n.call(this),this.unsubscribeOnline=void 0)}isFetching(t,n){const[r]=X(t,n);return r.fetchStatus="fetching",this.queryCache.findAll(r).length}isMutating(t){return this.mutationCache.findAll({...t,fetching:!0}).length}getQueryData(t,n){var r;return(r=this.queryCache.find(t,n))==null?void 0:r.state.data}ensureQueryData(t,n,r){const a=Rt(t,n,r),i=this.getQueryData(a.queryKey);return i?Promise.resolve(i):this.fetchQuery(a)}getQueriesData(t){return this.getQueryCache().findAll(t).map(({queryKey:n,state:r})=>{const a=r.data;return[n,a]})}setQueryData(t,n,r){const a=this.queryCache.find(t),i=a?.state.data,s=Zr(n,i);if(typeof s>"u")return;const o=Rt(t),l=this.defaultQueryOptions(o);return this.queryCache.build(this,l).setData(s,{...r,manual:!0})}setQueriesData(t,n,r){return T.batch(()=>this.getQueryCache().findAll(t).map(({queryKey:a})=>[a,this.setQueryData(a,n,r)]))}getQueryState(t,n){var r;return(r=this.queryCache.find(t,n))==null?void 0:r.state}removeQueries(t,n){const[r]=X(t,n),a=this.queryCache;T.batch(()=>{a.findAll(r).forEach(i=>{a.remove(i)})})}resetQueries(t,n,r){const[a,i]=X(t,n,r),s=this.queryCache,o={type:"active",...a};return T.batch(()=>(s.findAll(a).forEach(l=>{l.reset()}),this.refetchQueries(o,i)))}cancelQueries(t,n,r){const[a,i={}]=X(t,n,r);typeof i.revert>"u"&&(i.revert=!0);const s=T.batch(()=>this.queryCache.findAll(a).map(o=>o.cancel(i)));return Promise.all(s).then(M).catch(M)}invalidateQueries(t,n,r){const[a,i]=X(t,n,r);return T.batch(()=>{var s,o;if(this.queryCache.findAll(a).forEach(f=>{f.invalidate()}),a.refetchType==="none")return Promise.resolve();const l={...a,type:(s=(o=a.refetchType)!=null?o:a.type)!=null?s:"active"};return this.refetchQueries(l,i)})}refetchQueries(t,n,r){const[a,i]=X(t,n,r),s=T.batch(()=>this.queryCache.findAll(a).filter(l=>!l.isDisabled()).map(l=>{var f;return l.fetch(void 0,{...i,cancelRefetch:(f=i?.cancelRefetch)!=null?f:!0,meta:{refetchPage:a.refetchPage}})}));let o=Promise.all(s).then(M);return i!=null&&i.throwOnError||(o=o.catch(M)),o}fetchQuery(t,n,r){const a=Rt(t,n,r),i=this.defaultQueryOptions(a);typeof i.retry>"u"&&(i.retry=!1);const s=this.queryCache.build(this,i);return s.isStaleByTime(i.staleTime)?s.fetch(i):Promise.resolve(s.state.data)}prefetchQuery(t,n,r){return this.fetchQuery(t,n,r).then(M).catch(M)}fetchInfiniteQuery(t,n,r){const a=Rt(t,n,r);return a.behavior=fa(),this.fetchQuery(a)}prefetchInfiniteQuery(t,n,r){return this.fetchInfiniteQuery(t,n,r).then(M).catch(M)}resumePausedMutations(){return this.mutationCache.resumePausedMutations()}getQueryCache(){return this.queryCache}getMutationCache(){return this.mutationCache}getLogger(){return this.logger}getDefaultOptions(){return this.defaultOptions}setDefaultOptions(t){this.defaultOptions=t}setQueryDefaults(t,n){const r=this.queryDefaults.find(a=>tt(t)===tt(a.queryKey));r?r.defaultOptions=n:this.queryDefaults.push({queryKey:t,defaultOptions:n})}getQueryDefaults(t){if(!t)return;const n=this.queryDefaults.find(r=>zt(t,r.queryKey));return n?.defaultOptions}setMutationDefaults(t,n){const r=this.mutationDefaults.find(a=>tt(t)===tt(a.mutationKey));r?r.defaultOptions=n:this.mutationDefaults.push({mutationKey:t,defaultOptions:n})}getMutationDefaults(t){if(!t)return;const n=this.mutationDefaults.find(r=>zt(t,r.mutationKey));return n?.defaultOptions}defaultQueryOptions(t){if(t!=null&&t._defaulted)return t;const n={...this.defaultOptions.queries,...this.getQueryDefaults(t?.queryKey),...t,_defaulted:!0};return!n.queryHash&&n.queryKey&&(n.queryHash=Ie(n.queryKey,n)),typeof n.refetchOnReconnect>"u"&&(n.refetchOnReconnect=n.networkMode!=="always"),typeof n.useErrorBoundary>"u"&&(n.useErrorBoundary=!!n.suspense),n}defaultMutationOptions(t){return t!=null&&t._defaulted?t:{...this.defaultOptions.mutations,...this.getMutationDefaults(t?.mutationKey),...t,_defaulted:!0}}clear(){this.queryCache.clear(),this.mutationCache.clear()}}class ma extends Ct{constructor(t,n){super(),this.client=t,this.options=n,this.trackedProps=new Set,this.selectError=null,this.bindMethods(),this.setOptions(n)}bindMethods(){this.remove=this.remove.bind(this),this.refetch=this.refetch.bind(this)}onSubscribe(){this.listeners.length===1&&(this.currentQuery.addObserver(this),fn(this.currentQuery,this.options)&&this.executeFetch(),this.updateTimers())}onUnsubscribe(){this.listeners.length||this.destroy()}shouldFetchOnReconnect(){return pe(this.currentQuery,this.options,this.options.refetchOnReconnect)}shouldFetchOnWindowFocus(){return pe(this.currentQuery,this.options,this.options.refetchOnWindowFocus)}destroy(){this.listeners=[],this.clearStaleTimeout(),this.clearRefetchInterval(),this.currentQuery.removeObserver(this)}setOptions(t,n){const r=this.options,a=this.currentQuery;if(this.options=this.client.defaultQueryOptions(t),sn(r,this.options)||this.client.getQueryCache().notify({type:"observerOptionsUpdated",query:this.currentQuery,observer:this}),typeof this.options.enabled<"u"&&typeof this.options.enabled!="boolean")throw new Error("Expected enabled to be a boolean");this.options.queryKey||(this.options.queryKey=r.queryKey),this.updateQuery();const i=this.hasListeners();i&&dn(this.currentQuery,a,this.options,r)&&this.executeFetch(),this.updateResult(n),i&&(this.currentQuery!==a||this.options.enabled!==r.enabled||this.options.staleTime!==r.staleTime)&&this.updateStaleTimeout();const s=this.computeRefetchInterval();i&&(this.currentQuery!==a||this.options.enabled!==r.enabled||s!==this.currentRefetchInterval)&&this.updateRefetchInterval(s)}getOptimisticResult(t){const n=this.client.getQueryCache().build(this.client,t);return this.createResult(n,t)}getCurrentResult(){return this.currentResult}trackResult(t){const n={};return Object.keys(t).forEach(r=>{Object.defineProperty(n,r,{configurable:!1,enumerable:!0,get:()=>(this.trackedProps.add(r),t[r])})}),n}getCurrentQuery(){return this.currentQuery}remove(){this.client.getQueryCache().remove(this.currentQuery)}refetch({refetchPage:t,...n}={}){return this.fetch({...n,meta:{refetchPage:t}})}fetchOptimistic(t){const n=this.client.defaultQueryOptions(t),r=this.client.getQueryCache().build(this.client,n);return r.isFetchingOptimistic=!0,r.fetch().then(()=>this.createResult(r,n))}fetch(t){var n;return this.executeFetch({...t,cancelRefetch:(n=t.cancelRefetch)!=null?n:!0}).then(()=>(this.updateResult(),this.currentResult))}executeFetch(t){this.updateQuery();let n=this.currentQuery.fetch(this.options,t);return t!=null&&t.throwOnError||(n=n.catch(M)),n}updateStaleTimeout(){if(this.clearStaleTimeout(),bt||this.currentResult.isStale||!de(this.options.staleTime))return;const n=Xn(this.currentResult.dataUpdatedAt,this.options.staleTime)+1;this.staleTimeoutId=setTimeout(()=>{this.currentResult.isStale||this.updateResult()},n)}computeRefetchInterval(){var t;return typeof this.options.refetchInterval=="function"?this.options.refetchInterval(this.currentResult.data,this.currentQuery):(t=this.options.refetchInterval)!=null?t:!1}updateRefetchInterval(t){this.clearRefetchInterval(),this.currentRefetchInterval=t,!(bt||this.options.enabled===!1||!de(this.currentRefetchInterval)||this.currentRefetchInterval===0)&&(this.refetchIntervalId=setInterval(()=>{(this.options.refetchIntervalInBackground||Yt.isFocused())&&this.executeFetch()},this.currentRefetchInterval))}updateTimers(){this.updateStaleTimeout(),this.updateRefetchInterval(this.computeRefetchInterval())}clearStaleTimeout(){this.staleTimeoutId&&(clearTimeout(this.staleTimeoutId),this.staleTimeoutId=void 0)}clearRefetchInterval(){this.refetchIntervalId&&(clearInterval(this.refetchIntervalId),this.refetchIntervalId=void 0)}createResult(t,n){const r=this.currentQuery,a=this.options,i=this.currentResult,s=this.currentResultState,o=this.currentResultOptions,l=t!==r,f=l?t.state:this.currentQueryInitialState,u=l?this.currentResult:this.previousQueryResult,{state:c}=t;let{dataUpdatedAt:h,error:d,errorUpdatedAt:g,fetchStatus:y,status:v}=c,S=!1,A=!1,b;if(n._optimisticResults){const k=this.hasListeners(),P=!k&&fn(t,n),z=k&&dn(t,r,n,a);(P||z)&&(y=Jt(t.options.networkMode)?"fetching":"paused",h||(v="loading")),n._optimisticResults==="isRestoring"&&(y="idle")}if(n.keepPreviousData&&!c.dataUpdatedAt&&u!=null&&u.isSuccess&&v!=="error")b=u.data,h=u.dataUpdatedAt,v=u.status,S=!0;else if(n.select&&typeof c.data<"u")if(i&&c.data===s?.data&&n.select===this.selectFn)b=this.selectResult;else try{this.selectFn=n.select,b=n.select(c.data),b=me(i?.data,b,n),this.selectResult=b,this.selectError=null}catch(k){this.selectError=k}else b=c.data;if(typeof n.placeholderData<"u"&&typeof b>"u"&&v==="loading"){let k;if(i!=null&&i.isPlaceholderData&&n.placeholderData===o?.placeholderData)k=i.data;else if(k=typeof n.placeholderData=="function"?n.placeholderData():n.placeholderData,n.select&&typeof k<"u")try{k=n.select(k),this.selectError=null}catch(P){this.selectError=P}typeof k<"u"&&(v="success",b=me(i?.data,k,n),A=!0)}this.selectError&&(d=this.selectError,b=this.selectResult,g=Date.now(),v="error");const C=y==="fetching",O=v==="loading",x=v==="error";return{status:v,fetchStatus:y,isLoading:O,isSuccess:v==="success",isError:x,isInitialLoading:O&&C,data:b,dataUpdatedAt:h,error:d,errorUpdatedAt:g,failureCount:c.fetchFailureCount,failureReason:c.fetchFailureReason,errorUpdateCount:c.errorUpdateCount,isFetched:c.dataUpdateCount>0||c.errorUpdateCount>0,isFetchedAfterMount:c.dataUpdateCount>f.dataUpdateCount||c.errorUpdateCount>f.errorUpdateCount,isFetching:C,isRefetching:C&&!O,isLoadingError:x&&c.dataUpdatedAt===0,isPaused:y==="paused",isPlaceholderData:A,isPreviousData:S,isRefetchError:x&&c.dataUpdatedAt!==0,isStale:Fe(t,n),refetch:this.refetch,remove:this.remove}}updateResult(t){const n=this.currentResult,r=this.createResult(this.currentQuery,this.options);if(this.currentResultState=this.currentQuery.state,this.currentResultOptions=this.options,sn(r,n))return;this.currentResult=r;const a={cache:!0},i=()=>{if(!n)return!0;const{notifyOnChangeProps:s}=this.options;if(s==="all"||!s&&!this.trackedProps.size)return!0;const o=new Set(s??this.trackedProps);return this.options.useErrorBoundary&&o.add("error"),Object.keys(this.currentResult).some(l=>{const f=l;return this.currentResult[f]!==n[f]&&o.has(f)})};t?.listeners!==!1&&i()&&(a.listeners=!0),this.notify({...a,...t})}updateQuery(){const t=this.client.getQueryCache().build(this.client,this.options);if(t===this.currentQuery)return;const n=this.currentQuery;this.currentQuery=t,this.currentQueryInitialState=t.state,this.previousQueryResult=this.currentResult,this.hasListeners()&&(n?.removeObserver(this),t.addObserver(this))}onQueryUpdate(t){const n={};t.type==="success"?n.onSuccess=!t.manual:t.type==="error"&&!Qt(t.error)&&(n.onError=!0),this.updateResult(n),this.hasListeners()&&this.updateTimers()}notify(t){T.batch(()=>{if(t.onSuccess){var n,r,a,i;(n=(r=this.options).onSuccess)==null||n.call(r,this.currentResult.data),(a=(i=this.options).onSettled)==null||a.call(i,this.currentResult.data,null)}else if(t.onError){var s,o,l,f;(s=(o=this.options).onError)==null||s.call(o,this.currentResult.error),(l=(f=this.options).onSettled)==null||l.call(f,void 0,this.currentResult.error)}t.listeners&&this.listeners.forEach(u=>{u(this.currentResult)}),t.cache&&this.client.getQueryCache().notify({query:this.currentQuery,type:"observerResultsUpdated"})})}}function pa(e,t){return t.enabled!==!1&&!e.state.dataUpdatedAt&&!(e.state.status==="error"&&t.retryOnMount===!1)}function fn(e,t){return pa(e,t)||e.state.dataUpdatedAt>0&&pe(e,t,t.refetchOnMount)}function pe(e,t,n){if(t.enabled!==!1){const r=typeof n=="function"?n(e):n;return r==="always"||r!==!1&&Fe(e,t)}return!1}function dn(e,t,n,r){return n.enabled!==!1&&(e!==t||r.enabled===!1)&&(!n.suspense||e.state.status!=="error")&&Fe(e,n)}function Fe(e,t){return e.isStaleByTime(t.staleTime)}const ve=Symbol("store-raw"),wt=Symbol("store-node"),va=Symbol("store-name");function rr(e,t){let n=e[rt];if(!n&&(Object.defineProperty(e,rt,{value:n=new Proxy(e,ba)}),!Array.isArray(e))){const r=Object.keys(e),a=Object.getOwnPropertyDescriptors(e);for(let i=0,s=r.length;i<s;i++){const o=r[i];a[o].get&&Object.defineProperty(e,o,{enumerable:a[o].enumerable,get:a[o].get.bind(n)})}}return n}function Ht(e){let t;return e!=null&&typeof e=="object"&&(e[rt]||!(t=Object.getPrototypeOf(e))||t===Object.prototype||Array.isArray(e))}function $(e,t=new Set){let n,r,a,i;if(n=e!=null&&e[ve])return n;if(!Ht(e)||t.has(e))return e;if(Array.isArray(e)){Object.isFrozen(e)?e=e.slice(0):t.add(e);for(let s=0,o=e.length;s<o;s++)a=e[s],(r=$(a,t))!==a&&(e[s]=r)}else{Object.isFrozen(e)?e=Object.assign({},e):t.add(e);const s=Object.keys(e),o=Object.getOwnPropertyDescriptors(e);for(let l=0,f=s.length;l<f;l++)i=s[l],!o[i].get&&(a=e[i],(r=$(a,t))!==a&&(e[i]=r))}return e}function Me(e){let t=e[wt];return t||Object.defineProperty(e,wt,{value:t={}}),t}function ge(e,t,n){return e[t]||(e[t]=ir(n))}function ga(e,t){const n=Reflect.getOwnPropertyDescriptor(e,t);return!n||n.get||!n.configurable||t===rt||t===wt||t===va||(delete n.value,delete n.writable,n.get=()=>e[rt][t]),n}function ar(e){if(Un()){const t=Me(e);(t._||(t._=ir()))()}}function ya(e){return ar(e),Reflect.ownKeys(e)}function ir(e){const[t,n]=st(e,{equals:!1,internal:!0});return t.$=n,t}const ba={get(e,t,n){if(t===ve)return e;if(t===rt)return n;if(t===Ge)return ar(e),n;const r=Me(e),a=r.hasOwnProperty(t);let i=a?r[t]():e[t];if(t===wt||t==="__proto__")return i;if(!a){const s=Object.getOwnPropertyDescriptor(e,t);Un()&&(typeof i!="function"||e.hasOwnProperty(t))&&!(s&&s.get)&&(i=ge(r,t,i)())}return Ht(i)?rr(i):i},has(e,t){return t===ve||t===rt||t===Ge||t===wt||t==="__proto__"?!0:(this.get(e,t,e),t in e)},set(){return!0},deleteProperty(){return!0},ownKeys:ya,getOwnPropertyDescriptor:ga};function Bt(e,t,n,r=!1){if(!r&&e[t]===n)return;const a=e[t],i=e.length;n===void 0?delete e[t]:e[t]=n;let s=Me(e),o;(o=ge(s,t,a))&&o.$(()=>n),Array.isArray(e)&&e.length!==i&&(o=ge(s,"length",i))&&o.$(e.length),(o=s._)&&o.$()}function sr(e,t){const n=Object.keys(t);for(let r=0;r<n.length;r+=1){const a=n[r];Bt(e,a,t[a])}}function wa(e,t){if(typeof t=="function"&&(t=t(e)),t=$(t),Array.isArray(t)){if(e===t)return;let n=0,r=t.length;for(;n<r;n++){const a=t[n];e[n]!==a&&Bt(e,n,a)}Bt(e,"length",r)}else sr(e,t)}function pt(e,t,n=[]){let r,a=e;if(t.length>1){r=t.shift();const s=typeof r,o=Array.isArray(e);if(Array.isArray(r)){for(let l=0;l<r.length;l++)pt(e,[r[l]].concat(t),n);return}else if(o&&s==="function"){for(let l=0;l<e.length;l++)r(e[l],l)&&pt(e,[l].concat(t),n);return}else if(o&&s==="object"){const{from:l=0,to:f=e.length-1,by:u=1}=r;for(let c=l;c<=f;c+=u)pt(e,[c].concat(t),n);return}else if(t.length>1){pt(e[r],t,[r].concat(n));return}a=e[r],n=[r].concat(n)}let i=t[0];typeof i=="function"&&(i=i(a,n),i===a)||r===void 0&&i==null||(i=$(i),r===void 0||Ht(a)&&Ht(i)&&!Array.isArray(i)?sr(a,i):Bt(e,r,i))}function or(...[e,t]){const n=$(e||{}),r=Array.isArray(n),a=rr(n);function i(...s){le(()=>{r&&s.length===1?wa(n,s[0]):pt(n,s)})}return[a,i]}function ka(e){return typeof e=="function"}function hn(e,t,n){if(!ka(e)){const{queryKey:r,...a}=e;return r?{...a,queryKey:r()}:e}return typeof t=="function"?{...n,queryKey:e(),queryFn:t}:{...t,queryKey:e()}}function xa(e,t){return typeof e=="function"?e(...t):!!e}const mn=Kn(void 0),lr=Kn(!1);function ur(e,t){return e||(t&&typeof window<"u"?(window.SolidQueryClientContext||(window.SolidQueryClientContext=mn),window.SolidQueryClientContext):mn)}const Sa=({context:e}={})=>{const t=Xe(ur(e,Xe(lr)));if(!t)throw new Error("No QueryClient set, use QueryClientProvider to set one");return t},Oa=e=>{const t=zn({contextSharing:!1},e);_e(()=>{t.client.mount()}),Yn(()=>t.client.unmount());const n=ur(t.context,t.contextSharing);return q(lr.Provider,{get value(){return!t.context&&t.contextSharing},get children(){return q(n.Provider,{get value(){return t.client},get children(){return t.children}})}})};function Aa(e,t){const n=Sa({context:e.context}),r=Symbol("empty"),a=n.defaultQueryOptions(e);a._optimisticResults="optimistic";const i=new t(n,a),[s,o]=or(i.getOptimisticResult(a)),[l,{refetch:f,mutate:u}]=qr(()=>new Promise(g=>{s.isFetching&&s.isLoading||($(s.data)===r&&g(void 0),g($(s.data)))}));le(()=>{u(()=>$(s.data)),f()});let c=[];const h=i.subscribe(g=>{c.push(()=>{le(()=>{const y={...$(g)};y.data===void 0&&(y.data=r),o($(y)),u(()=>$(g.data)),f()})}),queueMicrotask(()=>{const y=c.pop();y&&y(),c=[]})});Yn(()=>h()),_e(()=>{i.setOptions(a,{listeners:!1})}),ue(()=>{const g=n.defaultQueryOptions(e);i.setOptions(g)}),ue(Qr(()=>s.status,()=>{if(s.isError&&!s.isFetching&&xa(i.options.useErrorBoundary,[s.error,i.getCurrentQuery()]))throw s.error}));const d={get(g,y){return y==="data"?l():Reflect.get(g,y)}};return new Proxy(s,d)}function pn(e,t,n){const[r,a]=or(hn(e,t,n));return ue(()=>{const i=hn(e,t,n);a(i)}),Aa(r,ma)}const Ca=L('<svg><path d="M248 8C111.1 8 0 119.1 0 256s111.1 248 248 248 248-111.1 248-248S384.9 8 248 8zm100.7 364.9c-4.2 0-6.8-1.3-10.7-3.6-62.4-37.6-135-39.2-206.7-24.5-3.9 1-9 2.6-11.9 2.6-9.7 0-15.8-7.7-15.8-15.8 0-10.3 6.1-15.2 13.6-16.8 81.9-18.1 165.6-16.5 237 26.2 6.1 3.9 9.7 7.4 9.7 16.5s-7.1 15.4-15.2 15.4zm26.9-65.6c-5.2 0-8.7-2.3-12.3-4.2-62.5-37-155.7-51.9-238.6-29.4-4.8 1.3-7.4 2.6-11.9 2.6-10.7 0-19.4-8.7-19.4-19.4s5.2-17.8 15.5-20.7c27.8-7.8 56.2-13.6 97.8-13.6 64.9 0 127.6 16.1 177 45.5 8.1 4.8 11.3 11 11.3 19.7-.1 10.8-8.5 19.5-19.4 19.5zm31-76.2c-5.2 0-8.4-1.3-12.9-3.9-71.2-42.5-198.5-52.7-280.9-29.7-3.6 1-8.1 2.6-12.9 2.6-13.2 0-23.3-10.3-23.3-23.6 0-13.6 8.4-21.3 17.4-23.9 35.2-10.3 74.6-15.2 117.5-15.2 73 0 149.5 15.2 205.4 47.8 7.8 4.5 12.9 10.7 12.9 22.6 0 13.6-11 23.3-23.2 23.3z"></path></svg>',4),cr=e=>[ct(()=>jr()),"<!>",(()=>{const t=D(Ca);return Ur(t,zn(e,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 496 512"}),!0,!0),Re(),t})()],Pa=L('<div tabindex="0" role="checkbox" class="flex h-24 w-full cursor-pointer items-center rounded-lg border bg-green-100 text-lg font-semibold focus-within:border-4 focus-within:border-green-600 hover:bg-green-300 aria-checked:bg-green-600 aria-checked:text-white"><div class="block aspect-square h-full bg-black p-4 [&amp;>svg]:h-fit [&amp;>svg]:fill-green-600"></div><span class="block flex-grow p-4 text-center"><!#><!/><!#><!/></span></div>',10),Ea=L('<img class="aspect-square h-full">',1),_a=L('<div class="block aspect-square h-full bg-black p-4 [&amp;>svg]:h-fit [&amp;>svg]:fill-green-600"></div>',2),Ra=L('<span class="float-right"> ✓</span>',2),Ia=L('<div class="relative col-span-12 h-full grid-cols-1 px-6"><!#><!/><!#><!/></div>',6),Ta=L("<span>Loading your playlists...</span>",2),Fa=L('<span class="block text-center">Select the playlists you want to search for duplicate songs:</span>',2),Ma=L('<div class="relative flex flex-col gap-4 py-4" role="group"><!#><!/><!#><!/><!#><!/></div>',8),re=e=>(()=>{const t=D(Pa),n=t.firstChild,r=n.nextSibling,a=r.firstChild,[i,s]=j(a.nextSibling),o=i.nextSibling,[l,f]=j(o.nextSibling);return t.$$click=()=>{e.onSelect()},t.$$keyup=u=>{u.key===" "&&e.onSelect()},t.$$keydown=u=>{u.key===" "&&u.preventDefault()},N(n,(()=>{const u=ct(()=>!!e.imageUrl);return()=>u()?(()=>{const c=D(Ea);return ce(()=>Ve(c,"src",e.imageUrl)),c})():(()=>{const c=D(_a);return N(c,q(cr,{})),c})()})()),N(r,()=>e.label,i,s),N(r,(()=>{const u=ct(()=>!!e.checked);return()=>u()&&D(Ra)})(),l,f),ce(()=>Ve(t,"aria-checked",e.checked)),Re(),t})();function Na(e){const t=pn(()=>["playlistsData"],()=>e.spotifyClient.fetchSpotifyRoute("https://api.spotify.com/v1/me/playlists")),n=pn(()=>["userData"],()=>e.spotifyClient.fetchSpotifyRoute("https://api.spotify.com/v1/me")),[r,a]=st([]),i=c=>{const h=r();h.find(d=>d.id===c.id)?a(h.filter(d=>d.id!==c.id)):a([...h,c])},s={id:"__liked_songs",name:"Liked Songs",owner:{id:n.data&&n.data.id||""},collaborative:!1},o=()=>l().length+1===r().length,l=()=>t.data&&t.data.items&&t.data.items.filter(c=>c.collaborative||c.owner.id===n.data.id),f=()=>{o()?a([]):a([s,...l()])},u=c=>!!r().find(({id:h})=>c.id===h);return(()=>{const c=D(Ia),h=c.firstChild,[d,g]=j(h.nextSibling),y=d.nextSibling,[v,S]=j(y.nextSibling);return N(c,()=>t.isLoading||n.isLoading&&D(Ta),d,g),N(c,(()=>{const A=ct(()=>!!l());return()=>A()&&[D(Fa),(()=>{const b=D(Ma),C=b.firstChild,[O,x]=j(C.nextSibling),w=O.nextSibling,[k,P]=j(w.nextSibling),z=k.nextSibling,[mt,We]=j(z.nextSibling);return N(b,q(re,{get checked(){return o()},onSelect:()=>{f()},label:"All Playlists"}),O,x),N(b,q(re,{get checked(){return u(s)},onSelect:()=>{i(s)},label:"Liked Songs"}),k,P),N(b,q(zr,{get each(){return l()},children:W=>q(re,{get checked(){return u(W)},onSelect:()=>{i(W)},get label(){return W.name},get imageUrl(){return W.images&&W.images.length>0&&W.images[0].url}})}),mt,We),b})()]})(),v,S),c})()}Hn(["keydown","keyup","click"]);function vn(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable})),n.push.apply(n,r)}return n}function m(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?vn(Object(n),!0).forEach(function(r){I(e,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):vn(Object(n)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))})}return e}function Wt(e){return Wt=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Wt(e)}function Da(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function gn(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function La(e,t,n){return t&&gn(e.prototype,t),n&&gn(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}function I(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function Ne(e,t){return qa(e)||ja(e,t)||fr(e,t)||za()}function Pt(e){return $a(e)||Qa(e)||fr(e)||Ua()}function $a(e){if(Array.isArray(e))return ye(e)}function qa(e){if(Array.isArray(e))return e}function Qa(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function ja(e,t){var n=e==null?null:typeof Symbol<"u"&&e[Symbol.iterator]||e["@@iterator"];if(n!=null){var r=[],a=!0,i=!1,s,o;try{for(n=n.call(e);!(a=(s=n.next()).done)&&(r.push(s.value),!(t&&r.length===t));a=!0);}catch(l){i=!0,o=l}finally{try{!a&&n.return!=null&&n.return()}finally{if(i)throw o}}return r}}function fr(e,t){if(e){if(typeof e=="string")return ye(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);if(n==="Object"&&e.constructor&&(n=e.constructor.name),n==="Map"||n==="Set")return Array.from(e);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return ye(e,t)}}function ye(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function Ua(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function za(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var yn=function(){},De={},dr={},hr=null,mr={mark:yn,measure:yn};try{typeof window<"u"&&(De=window),typeof document<"u"&&(dr=document),typeof MutationObserver<"u"&&(hr=MutationObserver),typeof performance<"u"&&(mr=performance)}catch{}var Ya=De.navigator||{},bn=Ya.userAgent,wn=bn===void 0?"":bn,V=De,_=dr,kn=hr,It=mr;V.document;var B=!!_.documentElement&&!!_.head&&typeof _.addEventListener=="function"&&typeof _.createElement=="function",pr=~wn.indexOf("MSIE")||~wn.indexOf("Trident/"),Tt,Ft,Mt,Nt,Dt,Y="___FONT_AWESOME___",be=16,vr="fa",gr="svg-inline--fa",at="data-fa-i2svg",we="data-fa-pseudo-element",Ka="data-fa-pseudo-element-pending",Le="data-prefix",$e="data-icon",xn="fontawesome-i2svg",Ha="async",Ba=["HTML","HEAD","STYLE","SCRIPT"],yr=function(){try{return!0}catch{return!1}}(),E="classic",R="sharp",qe=[E,R];function Et(e){return new Proxy(e,{get:function(n,r){return r in n?n[r]:n[E]}})}var kt=Et((Tt={},I(Tt,E,{fa:"solid",fas:"solid","fa-solid":"solid",far:"regular","fa-regular":"regular",fal:"light","fa-light":"light",fat:"thin","fa-thin":"thin",fad:"duotone","fa-duotone":"duotone",fab:"brands","fa-brands":"brands",fak:"kit","fa-kit":"kit"}),I(Tt,R,{fa:"solid",fass:"solid","fa-solid":"solid",fasr:"regular","fa-regular":"regular"}),Tt)),xt=Et((Ft={},I(Ft,E,{solid:"fas",regular:"far",light:"fal",thin:"fat",duotone:"fad",brands:"fab",kit:"fak"}),I(Ft,R,{solid:"fass",regular:"fasr"}),Ft)),St=Et((Mt={},I(Mt,E,{fab:"fa-brands",fad:"fa-duotone",fak:"fa-kit",fal:"fa-light",far:"fa-regular",fas:"fa-solid",fat:"fa-thin"}),I(Mt,R,{fass:"fa-solid",fasr:"fa-regular"}),Mt)),Wa=Et((Nt={},I(Nt,E,{"fa-brands":"fab","fa-duotone":"fad","fa-kit":"fak","fa-light":"fal","fa-regular":"far","fa-solid":"fas","fa-thin":"fat"}),I(Nt,R,{"fa-solid":"fass","fa-regular":"fasr"}),Nt)),Ga=/fa(s|r|l|t|d|b|k|ss|sr)?[\-\ ]/,br="fa-layers-text",Xa=/Font ?Awesome ?([56 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Sharp|Kit)?.*/i,Va=Et((Dt={},I(Dt,E,{900:"fas",400:"far",normal:"far",300:"fal",100:"fat"}),I(Dt,R,{900:"fass",400:"fasr"}),Dt)),wr=[1,2,3,4,5,6,7,8,9,10],Ja=wr.concat([11,12,13,14,15,16,17,18,19,20]),Za=["class","data-prefix","data-icon","data-fa-transform","data-fa-mask"],et={GROUP:"duotone-group",SWAP_OPACITY:"swap-opacity",PRIMARY:"primary",SECONDARY:"secondary"},Ot=new Set;Object.keys(xt[E]).map(Ot.add.bind(Ot));Object.keys(xt[R]).map(Ot.add.bind(Ot));var ti=[].concat(qe,Pt(Ot),["2xs","xs","sm","lg","xl","2xl","beat","border","fade","beat-fade","bounce","flip-both","flip-horizontal","flip-vertical","flip","fw","inverse","layers-counter","layers-text","layers","li","pull-left","pull-right","pulse","rotate-180","rotate-270","rotate-90","rotate-by","shake","spin-pulse","spin-reverse","spin","stack-1x","stack-2x","stack","ul",et.GROUP,et.SWAP_OPACITY,et.PRIMARY,et.SECONDARY]).concat(wr.map(function(e){return"".concat(e,"x")})).concat(Ja.map(function(e){return"w-".concat(e)})),gt=V.FontAwesomeConfig||{};function ei(e){var t=_.querySelector("script["+e+"]");if(t)return t.getAttribute(e)}function ni(e){return e===""?!0:e==="false"?!1:e==="true"?!0:e}if(_&&typeof _.querySelector=="function"){var ri=[["data-family-prefix","familyPrefix"],["data-css-prefix","cssPrefix"],["data-family-default","familyDefault"],["data-style-default","styleDefault"],["data-replacement-class","replacementClass"],["data-auto-replace-svg","autoReplaceSvg"],["data-auto-add-css","autoAddCss"],["data-auto-a11y","autoA11y"],["data-search-pseudo-elements","searchPseudoElements"],["data-observe-mutations","observeMutations"],["data-mutate-approach","mutateApproach"],["data-keep-original-source","keepOriginalSource"],["data-measure-performance","measurePerformance"],["data-show-missing-icons","showMissingIcons"]];ri.forEach(function(e){var t=Ne(e,2),n=t[0],r=t[1],a=ni(ei(n));a!=null&&(gt[r]=a)})}var kr={styleDefault:"solid",familyDefault:"classic",cssPrefix:vr,replacementClass:gr,autoReplaceSvg:!0,autoAddCss:!0,autoA11y:!0,searchPseudoElements:!1,observeMutations:!0,mutateApproach:"async",keepOriginalSource:!0,measurePerformance:!1,showMissingIcons:!0};gt.familyPrefix&&(gt.cssPrefix=gt.familyPrefix);var ft=m(m({},kr),gt);ft.autoReplaceSvg||(ft.observeMutations=!1);var p={};Object.keys(kr).forEach(function(e){Object.defineProperty(p,e,{enumerable:!0,set:function(n){ft[e]=n,yt.forEach(function(r){return r(p)})},get:function(){return ft[e]}})});Object.defineProperty(p,"familyPrefix",{enumerable:!0,set:function(t){ft.cssPrefix=t,yt.forEach(function(n){return n(p)})},get:function(){return ft.cssPrefix}});V.FontAwesomeConfig=p;var yt=[];function ai(e){return yt.push(e),function(){yt.splice(yt.indexOf(e),1)}}var G=be,U={size:16,x:0,y:0,rotate:0,flipX:!1,flipY:!1};function ii(e){if(!(!e||!B)){var t=_.createElement("style");t.setAttribute("type","text/css"),t.innerHTML=e;for(var n=_.head.childNodes,r=null,a=n.length-1;a>-1;a--){var i=n[a],s=(i.tagName||"").toUpperCase();["STYLE","LINK"].indexOf(s)>-1&&(r=i)}return _.head.insertBefore(t,r),e}}var si="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";function At(){for(var e=12,t="";e-- >0;)t+=si[Math.random()*62|0];return t}function ht(e){for(var t=[],n=(e||[]).length>>>0;n--;)t[n]=e[n];return t}function Qe(e){return e.classList?ht(e.classList):(e.getAttribute("class")||"").split(" ").filter(function(t){return t})}function xr(e){return"".concat(e).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function oi(e){return Object.keys(e||{}).reduce(function(t,n){return t+"".concat(n,'="').concat(xr(e[n]),'" ')},"").trim()}function Zt(e){return Object.keys(e||{}).reduce(function(t,n){return t+"".concat(n,": ").concat(e[n].trim(),";")},"")}function je(e){return e.size!==U.size||e.x!==U.x||e.y!==U.y||e.rotate!==U.rotate||e.flipX||e.flipY}function li(e){var t=e.transform,n=e.containerWidth,r=e.iconWidth,a={transform:"translate(".concat(n/2," 256)")},i="translate(".concat(t.x*32,", ").concat(t.y*32,") "),s="scale(".concat(t.size/16*(t.flipX?-1:1),", ").concat(t.size/16*(t.flipY?-1:1),") "),o="rotate(".concat(t.rotate," 0 0)"),l={transform:"".concat(i," ").concat(s," ").concat(o)},f={transform:"translate(".concat(r/2*-1," -256)")};return{outer:a,inner:l,path:f}}function ui(e){var t=e.transform,n=e.width,r=n===void 0?be:n,a=e.height,i=a===void 0?be:a,s=e.startCentered,o=s===void 0?!1:s,l="";return o&&pr?l+="translate(".concat(t.x/G-r/2,"em, ").concat(t.y/G-i/2,"em) "):o?l+="translate(calc(-50% + ".concat(t.x/G,"em), calc(-50% + ").concat(t.y/G,"em)) "):l+="translate(".concat(t.x/G,"em, ").concat(t.y/G,"em) "),l+="scale(".concat(t.size/G*(t.flipX?-1:1),", ").concat(t.size/G*(t.flipY?-1:1),") "),l+="rotate(".concat(t.rotate,"deg) "),l}var ci=`:root, :host {
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
}`;function Sr(){var e=vr,t=gr,n=p.cssPrefix,r=p.replacementClass,a=ci;if(n!==e||r!==t){var i=new RegExp("\\.".concat(e,"\\-"),"g"),s=new RegExp("\\--".concat(e,"\\-"),"g"),o=new RegExp("\\.".concat(t),"g");a=a.replace(i,".".concat(n,"-")).replace(s,"--".concat(n,"-")).replace(o,".".concat(r))}return a}var Sn=!1;function ae(){p.autoAddCss&&!Sn&&(ii(Sr()),Sn=!0)}var fi={mixout:function(){return{dom:{css:Sr,insertCss:ae}}},hooks:function(){return{beforeDOMElementCreation:function(){ae()},beforeI2svg:function(){ae()}}}},K=V||{};K[Y]||(K[Y]={});K[Y].styles||(K[Y].styles={});K[Y].hooks||(K[Y].hooks={});K[Y].shims||(K[Y].shims=[]);var Q=K[Y],Or=[],di=function e(){_.removeEventListener("DOMContentLoaded",e),Gt=1,Or.map(function(t){return t()})},Gt=!1;B&&(Gt=(_.documentElement.doScroll?/^loaded|^c/:/^loaded|^i|^c/).test(_.readyState),Gt||_.addEventListener("DOMContentLoaded",di));function hi(e){B&&(Gt?setTimeout(e,0):Or.push(e))}function _t(e){var t=e.tag,n=e.attributes,r=n===void 0?{}:n,a=e.children,i=a===void 0?[]:a;return typeof e=="string"?xr(e):"<".concat(t," ").concat(oi(r),">").concat(i.map(_t).join(""),"</").concat(t,">")}function On(e,t,n){if(e&&e[t]&&e[t][n])return{prefix:t,iconName:n,icon:e[t][n]}}var mi=function(t,n){return function(r,a,i,s){return t.call(n,r,a,i,s)}},ie=function(t,n,r,a){var i=Object.keys(t),s=i.length,o=a!==void 0?mi(n,a):n,l,f,u;for(r===void 0?(l=1,u=t[i[0]]):(l=0,u=r);l<s;l++)f=i[l],u=o(u,t[f],f,t);return u};function pi(e){for(var t=[],n=0,r=e.length;n<r;){var a=e.charCodeAt(n++);if(a>=55296&&a<=56319&&n<r){var i=e.charCodeAt(n++);(i&64512)==56320?t.push(((a&1023)<<10)+(i&1023)+65536):(t.push(a),n--)}else t.push(a)}return t}function ke(e){var t=pi(e);return t.length===1?t[0].toString(16):null}function vi(e,t){var n=e.length,r=e.charCodeAt(t),a;return r>=55296&&r<=56319&&n>t+1&&(a=e.charCodeAt(t+1),a>=56320&&a<=57343)?(r-55296)*1024+a-56320+65536:r}function An(e){return Object.keys(e).reduce(function(t,n){var r=e[n],a=!!r.icon;return a?t[r.iconName]=r.icon:t[n]=r,t},{})}function xe(e,t){var n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},r=n.skipHooks,a=r===void 0?!1:r,i=An(t);typeof Q.hooks.addPack=="function"&&!a?Q.hooks.addPack(e,An(t)):Q.styles[e]=m(m({},Q.styles[e]||{}),i),e==="fas"&&xe("fa",t)}var Lt,$t,qt,ot=Q.styles,gi=Q.shims,yi=(Lt={},I(Lt,E,Object.values(St[E])),I(Lt,R,Object.values(St[R])),Lt),Ue=null,Ar={},Cr={},Pr={},Er={},_r={},bi=($t={},I($t,E,Object.keys(kt[E])),I($t,R,Object.keys(kt[R])),$t);function wi(e){return~ti.indexOf(e)}function ki(e,t){var n=t.split("-"),r=n[0],a=n.slice(1).join("-");return r===e&&a!==""&&!wi(a)?a:null}var Rr=function(){var t=function(i){return ie(ot,function(s,o,l){return s[l]=ie(o,i,{}),s},{})};Ar=t(function(a,i,s){if(i[3]&&(a[i[3]]=s),i[2]){var o=i[2].filter(function(l){return typeof l=="number"});o.forEach(function(l){a[l.toString(16)]=s})}return a}),Cr=t(function(a,i,s){if(a[s]=s,i[2]){var o=i[2].filter(function(l){return typeof l=="string"});o.forEach(function(l){a[l]=s})}return a}),_r=t(function(a,i,s){var o=i[2];return a[s]=s,o.forEach(function(l){a[l]=s}),a});var n="far"in ot||p.autoFetchSvg,r=ie(gi,function(a,i){var s=i[0],o=i[1],l=i[2];return o==="far"&&!n&&(o="fas"),typeof s=="string"&&(a.names[s]={prefix:o,iconName:l}),typeof s=="number"&&(a.unicodes[s.toString(16)]={prefix:o,iconName:l}),a},{names:{},unicodes:{}});Pr=r.names,Er=r.unicodes,Ue=te(p.styleDefault,{family:p.familyDefault})};ai(function(e){Ue=te(e.styleDefault,{family:p.familyDefault})});Rr();function ze(e,t){return(Ar[e]||{})[t]}function xi(e,t){return(Cr[e]||{})[t]}function nt(e,t){return(_r[e]||{})[t]}function Ir(e){return Pr[e]||{prefix:null,iconName:null}}function Si(e){var t=Er[e],n=ze("fas",e);return t||(n?{prefix:"fas",iconName:n}:null)||{prefix:null,iconName:null}}function J(){return Ue}var Ye=function(){return{prefix:null,iconName:null,rest:[]}};function te(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=t.family,r=n===void 0?E:n,a=kt[r][e],i=xt[r][e]||xt[r][a],s=e in Q.styles?e:null;return i||s||null}var Cn=(qt={},I(qt,E,Object.keys(St[E])),I(qt,R,Object.keys(St[R])),qt);function ee(e){var t,n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=n.skipLookups,a=r===void 0?!1:r,i=(t={},I(t,E,"".concat(p.cssPrefix,"-").concat(E)),I(t,R,"".concat(p.cssPrefix,"-").concat(R)),t),s=null,o=E;(e.includes(i[E])||e.some(function(f){return Cn[E].includes(f)}))&&(o=E),(e.includes(i[R])||e.some(function(f){return Cn[R].includes(f)}))&&(o=R);var l=e.reduce(function(f,u){var c=ki(p.cssPrefix,u);if(ot[u]?(u=yi[o].includes(u)?Wa[o][u]:u,s=u,f.prefix=u):bi[o].indexOf(u)>-1?(s=u,f.prefix=te(u,{family:o})):c?f.iconName=c:u!==p.replacementClass&&u!==i[E]&&u!==i[R]&&f.rest.push(u),!a&&f.prefix&&f.iconName){var h=s==="fa"?Ir(f.iconName):{},d=nt(f.prefix,f.iconName);h.prefix&&(s=null),f.iconName=h.iconName||d||f.iconName,f.prefix=h.prefix||f.prefix,f.prefix==="far"&&!ot.far&&ot.fas&&!p.autoFetchSvg&&(f.prefix="fas")}return f},Ye());return(e.includes("fa-brands")||e.includes("fab"))&&(l.prefix="fab"),(e.includes("fa-duotone")||e.includes("fad"))&&(l.prefix="fad"),!l.prefix&&o===R&&(ot.fass||p.autoFetchSvg)&&(l.prefix="fass",l.iconName=nt(l.prefix,l.iconName)||l.iconName),(l.prefix==="fa"||s==="fa")&&(l.prefix=J()||"fas"),l}var Oi=function(){function e(){Da(this,e),this.definitions={}}return La(e,[{key:"add",value:function(){for(var n=this,r=arguments.length,a=new Array(r),i=0;i<r;i++)a[i]=arguments[i];var s=a.reduce(this._pullDefinitions,{});Object.keys(s).forEach(function(o){n.definitions[o]=m(m({},n.definitions[o]||{}),s[o]),xe(o,s[o]);var l=St[E][o];l&&xe(l,s[o]),Rr()})}},{key:"reset",value:function(){this.definitions={}}},{key:"_pullDefinitions",value:function(n,r){var a=r.prefix&&r.iconName&&r.icon?{0:r}:r;return Object.keys(a).map(function(i){var s=a[i],o=s.prefix,l=s.iconName,f=s.icon,u=f[2];n[o]||(n[o]={}),u.length>0&&u.forEach(function(c){typeof c=="string"&&(n[o][c]=f)}),n[o][l]=f}),n}}]),e}(),Pn=[],lt={},ut={},Ai=Object.keys(ut);function Ci(e,t){var n=t.mixoutsTo;return Pn=e,lt={},Object.keys(ut).forEach(function(r){Ai.indexOf(r)===-1&&delete ut[r]}),Pn.forEach(function(r){var a=r.mixout?r.mixout():{};if(Object.keys(a).forEach(function(s){typeof a[s]=="function"&&(n[s]=a[s]),Wt(a[s])==="object"&&Object.keys(a[s]).forEach(function(o){n[s]||(n[s]={}),n[s][o]=a[s][o]})}),r.hooks){var i=r.hooks();Object.keys(i).forEach(function(s){lt[s]||(lt[s]=[]),lt[s].push(i[s])})}r.provides&&r.provides(ut)}),n}function Se(e,t){for(var n=arguments.length,r=new Array(n>2?n-2:0),a=2;a<n;a++)r[a-2]=arguments[a];var i=lt[e]||[];return i.forEach(function(s){t=s.apply(null,[t].concat(r))}),t}function it(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];var a=lt[e]||[];a.forEach(function(i){i.apply(null,n)})}function H(){var e=arguments[0],t=Array.prototype.slice.call(arguments,1);return ut[e]?ut[e].apply(null,t):void 0}function Oe(e){e.prefix==="fa"&&(e.prefix="fas");var t=e.iconName,n=e.prefix||J();if(t)return t=nt(n,t)||t,On(Tr.definitions,n,t)||On(Q.styles,n,t)}var Tr=new Oi,Pi=function(){p.autoReplaceSvg=!1,p.observeMutations=!1,it("noAuto")},Ei={i2svg:function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};return B?(it("beforeI2svg",t),H("pseudoElements2svg",t),H("i2svg",t)):Promise.reject("Operation requires a DOM of some kind.")},watch:function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},n=t.autoReplaceSvgRoot;p.autoReplaceSvg===!1&&(p.autoReplaceSvg=!0),p.observeMutations=!0,hi(function(){Ri({autoReplaceSvgRoot:n}),it("watch",t)})}},_i={icon:function(t){if(t===null)return null;if(Wt(t)==="object"&&t.prefix&&t.iconName)return{prefix:t.prefix,iconName:nt(t.prefix,t.iconName)||t.iconName};if(Array.isArray(t)&&t.length===2){var n=t[1].indexOf("fa-")===0?t[1].slice(3):t[1],r=te(t[0]);return{prefix:r,iconName:nt(r,n)||n}}if(typeof t=="string"&&(t.indexOf("".concat(p.cssPrefix,"-"))>-1||t.match(Ga))){var a=ee(t.split(" "),{skipLookups:!0});return{prefix:a.prefix||J(),iconName:nt(a.prefix,a.iconName)||a.iconName}}if(typeof t=="string"){var i=J();return{prefix:i,iconName:nt(i,t)||t}}}},F={noAuto:Pi,config:p,dom:Ei,parse:_i,library:Tr,findIconDefinition:Oe,toHtml:_t},Ri=function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},n=t.autoReplaceSvgRoot,r=n===void 0?_:n;(Object.keys(Q.styles).length>0||p.autoFetchSvg)&&B&&p.autoReplaceSvg&&F.dom.i2svg({node:r})};function ne(e,t){return Object.defineProperty(e,"abstract",{get:t}),Object.defineProperty(e,"html",{get:function(){return e.abstract.map(function(r){return _t(r)})}}),Object.defineProperty(e,"node",{get:function(){if(B){var r=_.createElement("div");return r.innerHTML=e.html,r.children}}}),e}function Ii(e){var t=e.children,n=e.main,r=e.mask,a=e.attributes,i=e.styles,s=e.transform;if(je(s)&&n.found&&!r.found){var o=n.width,l=n.height,f={x:o/l/2,y:.5};a.style=Zt(m(m({},i),{},{"transform-origin":"".concat(f.x+s.x/16,"em ").concat(f.y+s.y/16,"em")}))}return[{tag:"svg",attributes:a,children:t}]}function Ti(e){var t=e.prefix,n=e.iconName,r=e.children,a=e.attributes,i=e.symbol,s=i===!0?"".concat(t,"-").concat(p.cssPrefix,"-").concat(n):i;return[{tag:"svg",attributes:{style:"display: none;"},children:[{tag:"symbol",attributes:m(m({},a),{},{id:s}),children:r}]}]}function Ke(e){var t=e.icons,n=t.main,r=t.mask,a=e.prefix,i=e.iconName,s=e.transform,o=e.symbol,l=e.title,f=e.maskId,u=e.titleId,c=e.extra,h=e.watchable,d=h===void 0?!1:h,g=r.found?r:n,y=g.width,v=g.height,S=a==="fak",A=[p.replacementClass,i?"".concat(p.cssPrefix,"-").concat(i):""].filter(function(P){return c.classes.indexOf(P)===-1}).filter(function(P){return P!==""||!!P}).concat(c.classes).join(" "),b={children:[],attributes:m(m({},c.attributes),{},{"data-prefix":a,"data-icon":i,class:A,role:c.attributes.role||"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 ".concat(y," ").concat(v)})},C=S&&!~c.classes.indexOf("fa-fw")?{width:"".concat(y/v*16*.0625,"em")}:{};d&&(b.attributes[at]=""),l&&(b.children.push({tag:"title",attributes:{id:b.attributes["aria-labelledby"]||"title-".concat(u||At())},children:[l]}),delete b.attributes.title);var O=m(m({},b),{},{prefix:a,iconName:i,main:n,mask:r,maskId:f,transform:s,symbol:o,styles:m(m({},C),c.styles)}),x=r.found&&n.found?H("generateAbstractMask",O)||{children:[],attributes:{}}:H("generateAbstractIcon",O)||{children:[],attributes:{}},w=x.children,k=x.attributes;return O.children=w,O.attributes=k,o?Ti(O):Ii(O)}function En(e){var t=e.content,n=e.width,r=e.height,a=e.transform,i=e.title,s=e.extra,o=e.watchable,l=o===void 0?!1:o,f=m(m(m({},s.attributes),i?{title:i}:{}),{},{class:s.classes.join(" ")});l&&(f[at]="");var u=m({},s.styles);je(a)&&(u.transform=ui({transform:a,startCentered:!0,width:n,height:r}),u["-webkit-transform"]=u.transform);var c=Zt(u);c.length>0&&(f.style=c);var h=[];return h.push({tag:"span",attributes:f,children:[t]}),i&&h.push({tag:"span",attributes:{class:"sr-only"},children:[i]}),h}function Fi(e){var t=e.content,n=e.title,r=e.extra,a=m(m(m({},r.attributes),n?{title:n}:{}),{},{class:r.classes.join(" ")}),i=Zt(r.styles);i.length>0&&(a.style=i);var s=[];return s.push({tag:"span",attributes:a,children:[t]}),n&&s.push({tag:"span",attributes:{class:"sr-only"},children:[n]}),s}var se=Q.styles;function Ae(e){var t=e[0],n=e[1],r=e.slice(4),a=Ne(r,1),i=a[0],s=null;return Array.isArray(i)?s={tag:"g",attributes:{class:"".concat(p.cssPrefix,"-").concat(et.GROUP)},children:[{tag:"path",attributes:{class:"".concat(p.cssPrefix,"-").concat(et.SECONDARY),fill:"currentColor",d:i[0]}},{tag:"path",attributes:{class:"".concat(p.cssPrefix,"-").concat(et.PRIMARY),fill:"currentColor",d:i[1]}}]}:s={tag:"path",attributes:{fill:"currentColor",d:i}},{found:!0,width:t,height:n,icon:s}}var Mi={found:!1,width:512,height:512};function Ni(e,t){!yr&&!p.showMissingIcons&&e&&console.error('Icon with name "'.concat(e,'" and prefix "').concat(t,'" is missing.'))}function Ce(e,t){var n=t;return t==="fa"&&p.styleDefault!==null&&(t=J()),new Promise(function(r,a){if(H("missingIconAbstract"),n==="fa"){var i=Ir(e)||{};e=i.iconName||e,t=i.prefix||t}if(e&&t&&se[t]&&se[t][e]){var s=se[t][e];return r(Ae(s))}Ni(e,t),r(m(m({},Mi),{},{icon:p.showMissingIcons&&e?H("missingIconAbstract")||{}:{}}))})}var _n=function(){},Pe=p.measurePerformance&&It&&It.mark&&It.measure?It:{mark:_n,measure:_n},vt='FA "6.3.0"',Di=function(t){return Pe.mark("".concat(vt," ").concat(t," begins")),function(){return Fr(t)}},Fr=function(t){Pe.mark("".concat(vt," ").concat(t," ends")),Pe.measure("".concat(vt," ").concat(t),"".concat(vt," ").concat(t," begins"),"".concat(vt," ").concat(t," ends"))},He={begin:Di,end:Fr},jt=function(){};function Rn(e){var t=e.getAttribute?e.getAttribute(at):null;return typeof t=="string"}function Li(e){var t=e.getAttribute?e.getAttribute(Le):null,n=e.getAttribute?e.getAttribute($e):null;return t&&n}function $i(e){return e&&e.classList&&e.classList.contains&&e.classList.contains(p.replacementClass)}function qi(){if(p.autoReplaceSvg===!0)return Ut.replace;var e=Ut[p.autoReplaceSvg];return e||Ut.replace}function Qi(e){return _.createElementNS("http://www.w3.org/2000/svg",e)}function ji(e){return _.createElement(e)}function Mr(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=t.ceFn,r=n===void 0?e.tag==="svg"?Qi:ji:n;if(typeof e=="string")return _.createTextNode(e);var a=r(e.tag);Object.keys(e.attributes||[]).forEach(function(s){a.setAttribute(s,e.attributes[s])});var i=e.children||[];return i.forEach(function(s){a.appendChild(Mr(s,{ceFn:r}))}),a}function Ui(e){var t=" ".concat(e.outerHTML," ");return t="".concat(t,"Font Awesome fontawesome.com "),t}var Ut={replace:function(t){var n=t[0];if(n.parentNode)if(t[1].forEach(function(a){n.parentNode.insertBefore(Mr(a),n)}),n.getAttribute(at)===null&&p.keepOriginalSource){var r=_.createComment(Ui(n));n.parentNode.replaceChild(r,n)}else n.remove()},nest:function(t){var n=t[0],r=t[1];if(~Qe(n).indexOf(p.replacementClass))return Ut.replace(t);var a=new RegExp("".concat(p.cssPrefix,"-.*"));if(delete r[0].attributes.id,r[0].attributes.class){var i=r[0].attributes.class.split(" ").reduce(function(o,l){return l===p.replacementClass||l.match(a)?o.toSvg.push(l):o.toNode.push(l),o},{toNode:[],toSvg:[]});r[0].attributes.class=i.toSvg.join(" "),i.toNode.length===0?n.removeAttribute("class"):n.setAttribute("class",i.toNode.join(" "))}var s=r.map(function(o){return _t(o)}).join(`
`);n.setAttribute(at,""),n.innerHTML=s}};function In(e){e()}function Nr(e,t){var n=typeof t=="function"?t:jt;if(e.length===0)n();else{var r=In;p.mutateApproach===Ha&&(r=V.requestAnimationFrame||In),r(function(){var a=qi(),i=He.begin("mutate");e.map(a),i(),n()})}}var Be=!1;function Dr(){Be=!0}function Ee(){Be=!1}var Xt=null;function Tn(e){if(kn&&p.observeMutations){var t=e.treeCallback,n=t===void 0?jt:t,r=e.nodeCallback,a=r===void 0?jt:r,i=e.pseudoElementsCallback,s=i===void 0?jt:i,o=e.observeMutationsRoot,l=o===void 0?_:o;Xt=new kn(function(f){if(!Be){var u=J();ht(f).forEach(function(c){if(c.type==="childList"&&c.addedNodes.length>0&&!Rn(c.addedNodes[0])&&(p.searchPseudoElements&&s(c.target),n(c.target)),c.type==="attributes"&&c.target.parentNode&&p.searchPseudoElements&&s(c.target.parentNode),c.type==="attributes"&&Rn(c.target)&&~Za.indexOf(c.attributeName))if(c.attributeName==="class"&&Li(c.target)){var h=ee(Qe(c.target)),d=h.prefix,g=h.iconName;c.target.setAttribute(Le,d||u),g&&c.target.setAttribute($e,g)}else $i(c.target)&&a(c.target)})}}),B&&Xt.observe(l,{childList:!0,attributes:!0,characterData:!0,subtree:!0})}}function zi(){Xt&&Xt.disconnect()}function Yi(e){var t=e.getAttribute("style"),n=[];return t&&(n=t.split(";").reduce(function(r,a){var i=a.split(":"),s=i[0],o=i.slice(1);return s&&o.length>0&&(r[s]=o.join(":").trim()),r},{})),n}function Ki(e){var t=e.getAttribute("data-prefix"),n=e.getAttribute("data-icon"),r=e.innerText!==void 0?e.innerText.trim():"",a=ee(Qe(e));return a.prefix||(a.prefix=J()),t&&n&&(a.prefix=t,a.iconName=n),a.iconName&&a.prefix||(a.prefix&&r.length>0&&(a.iconName=xi(a.prefix,e.innerText)||ze(a.prefix,ke(e.innerText))),!a.iconName&&p.autoFetchSvg&&e.firstChild&&e.firstChild.nodeType===Node.TEXT_NODE&&(a.iconName=e.firstChild.data)),a}function Hi(e){var t=ht(e.attributes).reduce(function(a,i){return a.name!=="class"&&a.name!=="style"&&(a[i.name]=i.value),a},{}),n=e.getAttribute("title"),r=e.getAttribute("data-fa-title-id");return p.autoA11y&&(n?t["aria-labelledby"]="".concat(p.replacementClass,"-title-").concat(r||At()):(t["aria-hidden"]="true",t.focusable="false")),t}function Bi(){return{iconName:null,title:null,titleId:null,prefix:null,transform:U,symbol:!1,mask:{iconName:null,prefix:null,rest:[]},maskId:null,extra:{classes:[],styles:{},attributes:{}}}}function Fn(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{styleParser:!0},n=Ki(e),r=n.iconName,a=n.prefix,i=n.rest,s=Hi(e),o=Se("parseNodeAttributes",{},e),l=t.styleParser?Yi(e):[];return m({iconName:r,title:e.getAttribute("title"),titleId:e.getAttribute("data-fa-title-id"),prefix:a,transform:U,mask:{iconName:null,prefix:null,rest:[]},maskId:null,symbol:!1,extra:{classes:i,styles:l,attributes:s}},o)}var Wi=Q.styles;function Lr(e){var t=p.autoReplaceSvg==="nest"?Fn(e,{styleParser:!1}):Fn(e);return~t.extra.classes.indexOf(br)?H("generateLayersText",e,t):H("generateSvgReplacementMutation",e,t)}var Z=new Set;qe.map(function(e){Z.add("fa-".concat(e))});Object.keys(kt[E]).map(Z.add.bind(Z));Object.keys(kt[R]).map(Z.add.bind(Z));Z=Pt(Z);function Mn(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;if(!B)return Promise.resolve();var n=_.documentElement.classList,r=function(c){return n.add("".concat(xn,"-").concat(c))},a=function(c){return n.remove("".concat(xn,"-").concat(c))},i=p.autoFetchSvg?Z:qe.map(function(u){return"fa-".concat(u)}).concat(Object.keys(Wi));i.includes("fa")||i.push("fa");var s=[".".concat(br,":not([").concat(at,"])")].concat(i.map(function(u){return".".concat(u,":not([").concat(at,"])")})).join(", ");if(s.length===0)return Promise.resolve();var o=[];try{o=ht(e.querySelectorAll(s))}catch{}if(o.length>0)r("pending"),a("complete");else return Promise.resolve();var l=He.begin("onTree"),f=o.reduce(function(u,c){try{var h=Lr(c);h&&u.push(h)}catch(d){yr||d.name==="MissingIcon"&&console.error(d)}return u},[]);return new Promise(function(u,c){Promise.all(f).then(function(h){Nr(h,function(){r("active"),r("complete"),a("pending"),typeof t=="function"&&t(),l(),u()})}).catch(function(h){l(),c(h)})})}function Gi(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;Lr(e).then(function(n){n&&Nr([n],t)})}function Xi(e){return function(t){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=(t||{}).icon?t:Oe(t||{}),a=n.mask;return a&&(a=(a||{}).icon?a:Oe(a||{})),e(r,m(m({},n),{},{mask:a}))}}var Vi=function(t){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=n.transform,a=r===void 0?U:r,i=n.symbol,s=i===void 0?!1:i,o=n.mask,l=o===void 0?null:o,f=n.maskId,u=f===void 0?null:f,c=n.title,h=c===void 0?null:c,d=n.titleId,g=d===void 0?null:d,y=n.classes,v=y===void 0?[]:y,S=n.attributes,A=S===void 0?{}:S,b=n.styles,C=b===void 0?{}:b;if(t){var O=t.prefix,x=t.iconName,w=t.icon;return ne(m({type:"icon"},t),function(){return it("beforeDOMElementCreation",{iconDefinition:t,params:n}),p.autoA11y&&(h?A["aria-labelledby"]="".concat(p.replacementClass,"-title-").concat(g||At()):(A["aria-hidden"]="true",A.focusable="false")),Ke({icons:{main:Ae(w),mask:l?Ae(l.icon):{found:!1,width:null,height:null,icon:{}}},prefix:O,iconName:x,transform:m(m({},U),a),symbol:s,title:h,maskId:u,titleId:g,extra:{attributes:A,styles:C,classes:v}})})}},Ji={mixout:function(){return{icon:Xi(Vi)}},hooks:function(){return{mutationObserverCallbacks:function(n){return n.treeCallback=Mn,n.nodeCallback=Gi,n}}},provides:function(t){t.i2svg=function(n){var r=n.node,a=r===void 0?_:r,i=n.callback,s=i===void 0?function(){}:i;return Mn(a,s)},t.generateSvgReplacementMutation=function(n,r){var a=r.iconName,i=r.title,s=r.titleId,o=r.prefix,l=r.transform,f=r.symbol,u=r.mask,c=r.maskId,h=r.extra;return new Promise(function(d,g){Promise.all([Ce(a,o),u.iconName?Ce(u.iconName,u.prefix):Promise.resolve({found:!1,width:512,height:512,icon:{}})]).then(function(y){var v=Ne(y,2),S=v[0],A=v[1];d([n,Ke({icons:{main:S,mask:A},prefix:o,iconName:a,transform:l,symbol:f,maskId:c,title:i,titleId:s,extra:h,watchable:!0})])}).catch(g)})},t.generateAbstractIcon=function(n){var r=n.children,a=n.attributes,i=n.main,s=n.transform,o=n.styles,l=Zt(o);l.length>0&&(a.style=l);var f;return je(s)&&(f=H("generateAbstractTransformGrouping",{main:i,transform:s,containerWidth:i.width,iconWidth:i.width})),r.push(f||i.icon),{children:r,attributes:a}}}},Zi={mixout:function(){return{layer:function(n){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=r.classes,i=a===void 0?[]:a;return ne({type:"layer"},function(){it("beforeDOMElementCreation",{assembler:n,params:r});var s=[];return n(function(o){Array.isArray(o)?o.map(function(l){s=s.concat(l.abstract)}):s=s.concat(o.abstract)}),[{tag:"span",attributes:{class:["".concat(p.cssPrefix,"-layers")].concat(Pt(i)).join(" ")},children:s}]})}}}},ts={mixout:function(){return{counter:function(n){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=r.title,i=a===void 0?null:a,s=r.classes,o=s===void 0?[]:s,l=r.attributes,f=l===void 0?{}:l,u=r.styles,c=u===void 0?{}:u;return ne({type:"counter",content:n},function(){return it("beforeDOMElementCreation",{content:n,params:r}),Fi({content:n.toString(),title:i,extra:{attributes:f,styles:c,classes:["".concat(p.cssPrefix,"-layers-counter")].concat(Pt(o))}})})}}}},es={mixout:function(){return{text:function(n){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=r.transform,i=a===void 0?U:a,s=r.title,o=s===void 0?null:s,l=r.classes,f=l===void 0?[]:l,u=r.attributes,c=u===void 0?{}:u,h=r.styles,d=h===void 0?{}:h;return ne({type:"text",content:n},function(){return it("beforeDOMElementCreation",{content:n,params:r}),En({content:n,transform:m(m({},U),i),title:o,extra:{attributes:c,styles:d,classes:["".concat(p.cssPrefix,"-layers-text")].concat(Pt(f))}})})}}},provides:function(t){t.generateLayersText=function(n,r){var a=r.title,i=r.transform,s=r.extra,o=null,l=null;if(pr){var f=parseInt(getComputedStyle(n).fontSize,10),u=n.getBoundingClientRect();o=u.width/f,l=u.height/f}return p.autoA11y&&!a&&(s.attributes["aria-hidden"]="true"),Promise.resolve([n,En({content:n.innerHTML,width:o,height:l,transform:i,title:a,extra:s,watchable:!0})])}}},ns=new RegExp('"',"ug"),Nn=[1105920,1112319];function rs(e){var t=e.replace(ns,""),n=vi(t,0),r=n>=Nn[0]&&n<=Nn[1],a=t.length===2?t[0]===t[1]:!1;return{value:ke(a?t[0]:t),isSecondary:r||a}}function Dn(e,t){var n="".concat(Ka).concat(t.replace(":","-"));return new Promise(function(r,a){if(e.getAttribute(n)!==null)return r();var i=ht(e.children),s=i.filter(function(w){return w.getAttribute(we)===t})[0],o=V.getComputedStyle(e,t),l=o.getPropertyValue("font-family").match(Xa),f=o.getPropertyValue("font-weight"),u=o.getPropertyValue("content");if(s&&!l)return e.removeChild(s),r();if(l&&u!=="none"&&u!==""){var c=o.getPropertyValue("content"),h=~["Sharp"].indexOf(l[2])?R:E,d=~["Solid","Regular","Light","Thin","Duotone","Brands","Kit"].indexOf(l[2])?xt[h][l[2].toLowerCase()]:Va[h][f],g=rs(c),y=g.value,v=g.isSecondary,S=l[0].startsWith("FontAwesome"),A=ze(d,y),b=A;if(S){var C=Si(y);C.iconName&&C.prefix&&(A=C.iconName,d=C.prefix)}if(A&&!v&&(!s||s.getAttribute(Le)!==d||s.getAttribute($e)!==b)){e.setAttribute(n,b),s&&e.removeChild(s);var O=Bi(),x=O.extra;x.attributes[we]=t,Ce(A,d).then(function(w){var k=Ke(m(m({},O),{},{icons:{main:w,mask:Ye()},prefix:d,iconName:b,extra:x,watchable:!0})),P=_.createElement("svg");t==="::before"?e.insertBefore(P,e.firstChild):e.appendChild(P),P.outerHTML=k.map(function(z){return _t(z)}).join(`
`),e.removeAttribute(n),r()}).catch(a)}else r()}else r()})}function as(e){return Promise.all([Dn(e,"::before"),Dn(e,"::after")])}function is(e){return e.parentNode!==document.head&&!~Ba.indexOf(e.tagName.toUpperCase())&&!e.getAttribute(we)&&(!e.parentNode||e.parentNode.tagName!=="svg")}function Ln(e){if(B)return new Promise(function(t,n){var r=ht(e.querySelectorAll("*")).filter(is).map(as),a=He.begin("searchPseudoElements");Dr(),Promise.all(r).then(function(){a(),Ee(),t()}).catch(function(){a(),Ee(),n()})})}var ss={hooks:function(){return{mutationObserverCallbacks:function(n){return n.pseudoElementsCallback=Ln,n}}},provides:function(t){t.pseudoElements2svg=function(n){var r=n.node,a=r===void 0?_:r;p.searchPseudoElements&&Ln(a)}}},$n=!1,os={mixout:function(){return{dom:{unwatch:function(){Dr(),$n=!0}}}},hooks:function(){return{bootstrap:function(){Tn(Se("mutationObserverCallbacks",{}))},noAuto:function(){zi()},watch:function(n){var r=n.observeMutationsRoot;$n?Ee():Tn(Se("mutationObserverCallbacks",{observeMutationsRoot:r}))}}}},qn=function(t){var n={size:16,x:0,y:0,flipX:!1,flipY:!1,rotate:0};return t.toLowerCase().split(" ").reduce(function(r,a){var i=a.toLowerCase().split("-"),s=i[0],o=i.slice(1).join("-");if(s&&o==="h")return r.flipX=!0,r;if(s&&o==="v")return r.flipY=!0,r;if(o=parseFloat(o),isNaN(o))return r;switch(s){case"grow":r.size=r.size+o;break;case"shrink":r.size=r.size-o;break;case"left":r.x=r.x-o;break;case"right":r.x=r.x+o;break;case"up":r.y=r.y-o;break;case"down":r.y=r.y+o;break;case"rotate":r.rotate=r.rotate+o;break}return r},n)},ls={mixout:function(){return{parse:{transform:function(n){return qn(n)}}}},hooks:function(){return{parseNodeAttributes:function(n,r){var a=r.getAttribute("data-fa-transform");return a&&(n.transform=qn(a)),n}}},provides:function(t){t.generateAbstractTransformGrouping=function(n){var r=n.main,a=n.transform,i=n.containerWidth,s=n.iconWidth,o={transform:"translate(".concat(i/2," 256)")},l="translate(".concat(a.x*32,", ").concat(a.y*32,") "),f="scale(".concat(a.size/16*(a.flipX?-1:1),", ").concat(a.size/16*(a.flipY?-1:1),") "),u="rotate(".concat(a.rotate," 0 0)"),c={transform:"".concat(l," ").concat(f," ").concat(u)},h={transform:"translate(".concat(s/2*-1," -256)")},d={outer:o,inner:c,path:h};return{tag:"g",attributes:m({},d.outer),children:[{tag:"g",attributes:m({},d.inner),children:[{tag:r.icon.tag,children:r.icon.children,attributes:m(m({},r.icon.attributes),d.path)}]}]}}}},oe={x:0,y:0,width:"100%",height:"100%"};function Qn(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;return e.attributes&&(e.attributes.fill||t)&&(e.attributes.fill="black"),e}function us(e){return e.tag==="g"?e.children:[e]}var cs={hooks:function(){return{parseNodeAttributes:function(n,r){var a=r.getAttribute("data-fa-mask"),i=a?ee(a.split(" ").map(function(s){return s.trim()})):Ye();return i.prefix||(i.prefix=J()),n.mask=i,n.maskId=r.getAttribute("data-fa-mask-id"),n}}},provides:function(t){t.generateAbstractMask=function(n){var r=n.children,a=n.attributes,i=n.main,s=n.mask,o=n.maskId,l=n.transform,f=i.width,u=i.icon,c=s.width,h=s.icon,d=li({transform:l,containerWidth:c,iconWidth:f}),g={tag:"rect",attributes:m(m({},oe),{},{fill:"white"})},y=u.children?{children:u.children.map(Qn)}:{},v={tag:"g",attributes:m({},d.inner),children:[Qn(m({tag:u.tag,attributes:m(m({},u.attributes),d.path)},y))]},S={tag:"g",attributes:m({},d.outer),children:[v]},A="mask-".concat(o||At()),b="clip-".concat(o||At()),C={tag:"mask",attributes:m(m({},oe),{},{id:A,maskUnits:"userSpaceOnUse",maskContentUnits:"userSpaceOnUse"}),children:[g,S]},O={tag:"defs",children:[{tag:"clipPath",attributes:{id:b},children:us(h)},C]};return r.push(O,{tag:"rect",attributes:m({fill:"currentColor","clip-path":"url(#".concat(b,")"),mask:"url(#".concat(A,")")},oe)}),{children:r,attributes:a}}}},fs={provides:function(t){var n=!1;V.matchMedia&&(n=V.matchMedia("(prefers-reduced-motion: reduce)").matches),t.missingIconAbstract=function(){var r=[],a={fill:"currentColor"},i={attributeType:"XML",repeatCount:"indefinite",dur:"2s"};r.push({tag:"path",attributes:m(m({},a),{},{d:"M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z"})});var s=m(m({},i),{},{attributeName:"opacity"}),o={tag:"circle",attributes:m(m({},a),{},{cx:"256",cy:"364",r:"28"}),children:[]};return n||o.children.push({tag:"animate",attributes:m(m({},i),{},{attributeName:"r",values:"28;14;28;28;14;28;"})},{tag:"animate",attributes:m(m({},s),{},{values:"1;0;1;1;0;1;"})}),r.push(o),r.push({tag:"path",attributes:m(m({},a),{},{opacity:"1",d:"M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z"}),children:n?[]:[{tag:"animate",attributes:m(m({},s),{},{values:"1;0;0;0;0;1;"})}]}),n||r.push({tag:"path",attributes:m(m({},a),{},{opacity:"0",d:"M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z"}),children:[{tag:"animate",attributes:m(m({},s),{},{values:"0;0;1;1;0;0;"})}]}),{tag:"g",attributes:{class:"missing"},children:r}}}},ds={hooks:function(){return{parseNodeAttributes:function(n,r){var a=r.getAttribute("data-fa-symbol"),i=a===null?!1:a===""?!0:a;return n.symbol=i,n}}}},hs=[fi,Ji,Zi,ts,es,ss,os,ls,cs,fs,ds];Ci(hs,{mixoutsTo:F});F.noAuto;F.config;F.library;F.dom;F.parse;F.findIconDefinition;F.toHtml;F.icon;F.layer;F.text;F.counter;const ms=L('<div class="col-span-12 grid auto-rows-min grid-cols-1"><h2 class="text-center text-xl font-semibold">You are currently logged out.</h2><div><p class="py-8 text-center">You must login to this app through Spotify in order to view your duplicate songs</p><div class="flex justify-center"><button class="flex items-center justify-start rounded-lg border-2 border-green-900 bg-green-600 p-2 text-center text-gray-200"><!#><!/>Click here to login through Spotify</button></div></div></div>',14);function ps(e){return(()=>{const t=D(ms),n=t.firstChild,r=n.nextSibling,a=r.firstChild,i=a.nextSibling,s=i.firstChild,o=s.firstChild,[l,f]=j(o.nextSibling);return l.nextSibling,s.$$click=()=>{e.spotifyClient&&e.spotifyClient.initiateAuthFlow()},N(s,q(cr,{class:"mr-2 w-[1em] fill-[currentColor]"}),l,f),Re(),t})()}Hn(["click"]);function $r(e){var t,n,r="";if(typeof e=="string"||typeof e=="number")r+=e;else if(typeof e=="object")if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(n=$r(e[t]))&&(r&&(r+=" "),r+=n);else for(t in e)e[t]&&(r&&(r+=" "),r+=t);return r}function jn(){for(var e,t,n=0,r="";n<arguments.length;)(e=arguments[n++])&&(t=$r(e))&&(r&&(r+=" "),r+=t);return r}const vs=L('<div class="relative flex h-full w-full flex-col"><div class="relative flex-grow overflow-y-clip"><div class="grid h-full grid-cols-12 grid-rows-[auto_auto_1fr] overflow-y-auto"><div id="top-shadow-trigger"></div><div></div><div></div><h1 class="col-span-12 h-fit px-10 py-4 text-center text-4xl font-bold">Spotify Song Deduplicator</h1><!#><!/><!#><!/><div id="bottom-shadow-trigger" class="-mt-1"></div></div></div></div>',20),gs=L('<div class="col-span-12 flex justify-center"><div class="h-16 w-16  animate-spin rounded-full border-8 border-solid border-gray-400 border-t-green-300 text-center"></div></div>',4),ys=new ha,ws=()=>{const[e,t]=st(null),[n,r]=st(!1),[a,i]=st(!1),[s,o]=st();return _e(async()=>{const l=new IntersectionObserver(f=>{for(const u of f)u.target.id==="top-shadow-trigger"?r(!u.isIntersecting):u.target.id==="bottom-shadow-trigger"&&i(!u.isIntersecting)});l.observe(document.getElementById("top-shadow-trigger")),l.observe(document.getElementById("bottom-shadow-trigger")),o(new Jr({onReady:f=>t(f)}))}),q(Oa,{client:ys,get children(){const l=D(vs),f=l.firstChild,u=f.firstChild,c=u.firstChild,h=c.nextSibling,d=h.nextSibling,g=d.nextSibling,y=g.nextSibling,[v,S]=j(y.nextSibling),A=v.nextSibling,[b,C]=j(A.nextSibling);return b.nextSibling,N(u,(()=>{const O=ct(()=>e()===null);return()=>O()&&D(gs)})(),v,S),N(u,(()=>{const O=ct(()=>e()!==null);return()=>O()&&(e()?q(Na,{get spotifyClient(){return s()}}):q(ps,{get spotifyClient(){return s()}}))})(),b,C),ce(O=>{const x=jn(a()&&"shadow-[inset_0px_-40px_20px_-20px_rgba(0,0,0,0.3)]","delay-50 pointer-events-none absolute top-0 z-10 h-full w-full transition-[box-shadow] duration-500"),w=jn(n()&&"shadow-[inset_0_40px_20px_-20px_rgba(0,0,0,0.3)]","delay-50 pointer-events-none absolute top-0 z-10 h-full w-full transition-[box-shadow] duration-500");return x!==O._v$&&Je(h,O._v$=x),w!==O._v$2&&Je(d,O._v$2=w),O},{_v$:void 0,_v$2:void 0}),l}})};export{ws as default};
