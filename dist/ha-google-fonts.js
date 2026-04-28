function t(t,e,o,s){var i,r=arguments.length,n=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,o):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,o,s);else for(var a=t.length-1;a>=0;a--)(i=t[a])&&(n=(r<3?i(n):r>3?i(e,o,n):i(e,o))||n);return r>3&&n&&Object.defineProperty(e,o,n),n}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,o=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),i=new WeakMap;let r=class{constructor(t,e,o){if(this._$cssResult$=!0,o!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(o&&void 0===t){const o=void 0!==e&&1===e.length;o&&(t=i.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),o&&i.set(e,t))}return t}toString(){return this.cssText}};const n=(t,...e)=>{const o=1===t.length?t[0]:e.reduce((e,o,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+t[s+1],t[0]);return new r(o,t,s)},a=o?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const o of t.cssRules)e+=o.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:l,defineProperty:c,getOwnPropertyDescriptor:h,getOwnPropertyNames:d,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,f=globalThis,y=f.trustedTypes,_=y?y.emptyScript:"",g=f.reactiveElementPolyfillSupport,m=(t,e)=>t,$={toAttribute(t,e){switch(e){case Boolean:t=t?_:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let o=t;switch(e){case Boolean:o=null!==t;break;case Number:o=null===t?null:Number(t);break;case Object:case Array:try{o=JSON.parse(t)}catch(t){o=null}}return o}},v=(t,e)=>!l(t,e),b={attribute:!0,type:String,converter:$,reflect:!1,useDefault:!1,hasChanged:v};Symbol.metadata??=Symbol("metadata"),f.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=b){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const o=Symbol(),s=this.getPropertyDescriptor(t,o,e);void 0!==s&&c(this.prototype,t,s)}}static getPropertyDescriptor(t,e,o){const{get:s,set:i}=h(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const r=s?.call(this);i?.call(this,e),this.requestUpdate(t,r,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??b}static _$Ei(){if(this.hasOwnProperty(m("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(m("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(m("properties"))){const t=this.properties,e=[...d(t),...p(t)];for(const o of e)this.createProperty(o,t[o])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,o]of e)this.elementProperties.set(t,o)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const o=this._$Eu(t,e);void 0!==o&&this._$Eh.set(o,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const o=new Set(t.flat(1/0).reverse());for(const t of o)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const o=e.attribute;return!1===o?void 0:"string"==typeof o?o:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const o of e.keys())this.hasOwnProperty(o)&&(t.set(o,this[o]),delete this[o]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(o)t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const o of s){const s=document.createElement("style"),i=e.litNonce;void 0!==i&&s.setAttribute("nonce",i),s.textContent=o.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,o){this._$AK(t,o)}_$ET(t,e){const o=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,o);if(void 0!==s&&!0===o.reflect){const i=(void 0!==o.converter?.toAttribute?o.converter:$).toAttribute(e,o.type);this._$Em=t,null==i?this.removeAttribute(s):this.setAttribute(s,i),this._$Em=null}}_$AK(t,e){const o=this.constructor,s=o._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=o.getPropertyOptions(s),i="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:$;this._$Em=s;const r=i.fromAttribute(e,t.type);this[s]=r??this._$Ej?.get(s)??r,this._$Em=null}}requestUpdate(t,e,o,s=!1,i){if(void 0!==t){const r=this.constructor;if(!1===s&&(i=this[t]),o??=r.getPropertyOptions(t),!((o.hasChanged??v)(i,e)||o.useDefault&&o.reflect&&i===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,o))))return;this.C(t,e,o)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:o,reflect:s,wrapped:i},r){o&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),!0!==i||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||o||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,o]of t){const{wrapped:t}=o,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,o,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[m("elementProperties")]=new Map,w[m("finalized")]=new Map,g?.({ReactiveElement:w}),(f.reactiveElementVersions??=[]).push("2.1.2");const A=globalThis,x=t=>t,E=A.trustedTypes,S=E?E.createPolicy("lit-html",{createHTML:t=>t}):void 0,C="$lit$",P=`lit$${Math.random().toFixed(9).slice(2)}$`,k="?"+P,O=`<${k}>`,R=document,U=()=>R.createComment(""),M=t=>null===t||"object"!=typeof t&&"function"!=typeof t,H=Array.isArray,I="[ \t\n\f\r]",T=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,N=/-->/g,z=/>/g,L=RegExp(`>|${I}(?:([^\\s"'>=/]+)(${I}*=${I}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),D=/'/g,j=/"/g,q=/^(?:script|style|textarea|title)$/i,F=(t=>(e,...o)=>({_$litType$:t,strings:e,values:o}))(1),B=Symbol.for("lit-noChange"),K=Symbol.for("lit-nothing"),G=new WeakMap,W=R.createTreeWalker(R,129);function V(t,e){if(!H(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}const J=(t,e)=>{const o=t.length-1,s=[];let i,r=2===e?"<svg>":3===e?"<math>":"",n=T;for(let e=0;e<o;e++){const o=t[e];let a,l,c=-1,h=0;for(;h<o.length&&(n.lastIndex=h,l=n.exec(o),null!==l);)h=n.lastIndex,n===T?"!--"===l[1]?n=N:void 0!==l[1]?n=z:void 0!==l[2]?(q.test(l[2])&&(i=RegExp("</"+l[2],"g")),n=L):void 0!==l[3]&&(n=L):n===L?">"===l[0]?(n=i??T,c=-1):void 0===l[1]?c=-2:(c=n.lastIndex-l[2].length,a=l[1],n=void 0===l[3]?L:'"'===l[3]?j:D):n===j||n===D?n=L:n===N||n===z?n=T:(n=L,i=void 0);const d=n===L&&t[e+1].startsWith("/>")?" ":"";r+=n===T?o+O:c>=0?(s.push(a),o.slice(0,c)+C+o.slice(c)+P+d):o+P+(-2===c?e:d)}return[V(t,r+(t[o]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class Z{constructor({strings:t,_$litType$:e},o){let s;this.parts=[];let i=0,r=0;const n=t.length-1,a=this.parts,[l,c]=J(t,e);if(this.el=Z.createElement(l,o),W.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=W.nextNode())&&a.length<n;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(C)){const e=c[r++],o=s.getAttribute(t).split(P),n=/([.?@])?(.*)/.exec(e);a.push({type:1,index:i,name:n[2],strings:o,ctor:"."===n[1]?et:"?"===n[1]?ot:"@"===n[1]?st:tt}),s.removeAttribute(t)}else t.startsWith(P)&&(a.push({type:6,index:i}),s.removeAttribute(t));if(q.test(s.tagName)){const t=s.textContent.split(P),e=t.length-1;if(e>0){s.textContent=E?E.emptyScript:"";for(let o=0;o<e;o++)s.append(t[o],U()),W.nextNode(),a.push({type:2,index:++i});s.append(t[e],U())}}}else if(8===s.nodeType)if(s.data===k)a.push({type:2,index:i});else{let t=-1;for(;-1!==(t=s.data.indexOf(P,t+1));)a.push({type:7,index:i}),t+=P.length-1}i++}}static createElement(t,e){const o=R.createElement("template");return o.innerHTML=t,o}}function Q(t,e,o=t,s){if(e===B)return e;let i=void 0!==s?o._$Co?.[s]:o._$Cl;const r=M(e)?void 0:e._$litDirective$;return i?.constructor!==r&&(i?._$AO?.(!1),void 0===r?i=void 0:(i=new r(t),i._$AT(t,o,s)),void 0!==s?(o._$Co??=[])[s]=i:o._$Cl=i),void 0!==i&&(e=Q(t,i._$AS(t,e.values),i,s)),e}class X{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:o}=this._$AD,s=(t?.creationScope??R).importNode(e,!0);W.currentNode=s;let i=W.nextNode(),r=0,n=0,a=o[0];for(;void 0!==a;){if(r===a.index){let e;2===a.type?e=new Y(i,i.nextSibling,this,t):1===a.type?e=new a.ctor(i,a.name,a.strings,this,t):6===a.type&&(e=new it(i,this,t)),this._$AV.push(e),a=o[++n]}r!==a?.index&&(i=W.nextNode(),r++)}return W.currentNode=R,s}p(t){let e=0;for(const o of this._$AV)void 0!==o&&(void 0!==o.strings?(o._$AI(t,o,e),e+=o.strings.length-2):o._$AI(t[e])),e++}}class Y{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,o,s){this.type=2,this._$AH=K,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=o,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Q(this,t,e),M(t)?t===K||null==t||""===t?(this._$AH!==K&&this._$AR(),this._$AH=K):t!==this._$AH&&t!==B&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>H(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==K&&M(this._$AH)?this._$AA.nextSibling.data=t:this.T(R.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:o}=t,s="number"==typeof o?this._$AC(t):(void 0===o.el&&(o.el=Z.createElement(V(o.h,o.h[0]),this.options)),o);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new X(s,this),o=t.u(this.options);t.p(e),this.T(o),this._$AH=t}}_$AC(t){let e=G.get(t.strings);return void 0===e&&G.set(t.strings,e=new Z(t)),e}k(t){H(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let o,s=0;for(const i of t)s===e.length?e.push(o=new Y(this.O(U()),this.O(U()),this,this.options)):o=e[s],o._$AI(i),s++;s<e.length&&(this._$AR(o&&o._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=x(t).nextSibling;x(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,o,s,i){this.type=1,this._$AH=K,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=i,o.length>2||""!==o[0]||""!==o[1]?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=K}_$AI(t,e=this,o,s){const i=this.strings;let r=!1;if(void 0===i)t=Q(this,t,e,0),r=!M(t)||t!==this._$AH&&t!==B,r&&(this._$AH=t);else{const s=t;let n,a;for(t=i[0],n=0;n<i.length-1;n++)a=Q(this,s[o+n],e,n),a===B&&(a=this._$AH[n]),r||=!M(a)||a!==this._$AH[n],a===K?t=K:t!==K&&(t+=(a??"")+i[n+1]),this._$AH[n]=a}r&&!s&&this.j(t)}j(t){t===K?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===K?void 0:t}}class ot extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==K)}}class st extends tt{constructor(t,e,o,s,i){super(t,e,o,s,i),this.type=5}_$AI(t,e=this){if((t=Q(this,t,e,0)??K)===B)return;const o=this._$AH,s=t===K&&o!==K||t.capture!==o.capture||t.once!==o.once||t.passive!==o.passive,i=t!==K&&(o===K||s);s&&this.element.removeEventListener(this.name,this,o),i&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class it{constructor(t,e,o){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(t){Q(this,t)}}const rt=A.litHtmlPolyfillSupport;rt?.(Z,Y),(A.litHtmlVersions??=[]).push("3.3.2");const nt=globalThis;class at extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,o)=>{const s=o?.renderBefore??e;let i=s._$litPart$;if(void 0===i){const t=o?.renderBefore??null;s._$litPart$=i=new Y(e.insertBefore(U(),t),t,void 0,o??{})}return i._$AI(t),i})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return B}}at._$litElement$=!0,at.finalized=!0,nt.litElementHydrateSupport?.({LitElement:at});const lt=nt.litElementPolyfillSupport;lt?.({LitElement:at}),(nt.litElementVersions??=[]).push("4.2.2");const ct=t=>(e,o)=>{void 0!==o?o.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},ht={attribute:!0,type:String,converter:$,reflect:!1,hasChanged:v},dt=(t=ht,e,o)=>{const{kind:s,metadata:i}=o;let r=globalThis.litPropertyMetadata.get(i);if(void 0===r&&globalThis.litPropertyMetadata.set(i,r=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),r.set(o.name,t),"accessor"===s){const{name:s}=o;return{set(o){const i=e.get.call(this);e.set.call(this,o),this.requestUpdate(s,i,t,!0,o)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=o;return function(o){const i=this[s];e.call(this,o),this.requestUpdate(s,i,t,!0,o)}}throw Error("Unsupported decorator location: "+s)};function pt(t){return(e,o)=>"object"==typeof o?dt(t,e,o):((t,e,o)=>{const s=e.hasOwnProperty(o);return e.constructor.createProperty(o,t),s?Object.getOwnPropertyDescriptor(e,o):void 0})(t,e,o)}function ut(t){return pt({...t,state:!0,attribute:!1})}const ft="ha_google_fonts_catalog",yt=864e5;async function _t(t,e=!1){if(!e){const t=function(){try{const t=localStorage.getItem(ft);if(!t)return null;const e=JSON.parse(t);return Date.now()-e.fetchedAt>yt?null:e}catch{return null}}();if(t)return t.items}const o=`https://www.googleapis.com/webfonts/v1/webfonts?key=${encodeURIComponent(t)}&sort=popularity`,s=await fetch(o);if(!s.ok)throw new Error(`Google Fonts API error ${s.status}: ${await s.text()}`);const i=(await s.json()).items.map(t=>({family:t.family,category:t.category,variants:t.variants,subsets:t.subsets}));return function(t){try{localStorage.setItem(ft,JSON.stringify(t))}catch{}}({fetchedAt:Date.now(),items:i}),i}const gt="ha_google_fonts";async function mt(t){try{return(await t.connection.sendMessagePromise({type:"frontend/get_user_data",key:gt})).value??{}}catch{return{}}}async function $t(t,e){await t.connection.sendMessagePromise({type:"frontend/set_user_data",key:gt,value:e})}const vt="ha-google-fonts-style",bt="ha-google-fonts-link";function wt(t){t?(function(t){const e=`https://fonts.googleapis.com/css2?family=${encodeURIComponent(t)}:wght@300;400;500;600;700&display=swap`;let o=document.getElementById(bt);o||(o=document.createElement("link"),o.id=bt,o.rel="stylesheet",document.head.appendChild(o));o.href!==e&&(o.href=e)}(t),function(t){const e=function(t){const e=`"${t}", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;return`\n    :root, :host {\n      --paper-font-common-base_-_font-family: ${e} !important;\n      --paper-font-body1_-_font-family: ${e} !important;\n      --paper-font-subhead_-_font-family: ${e} !important;\n      --paper-font-headline_-_font-family: ${e} !important;\n      --paper-font-title_-_font-family: ${e} !important;\n      --paper-font-caption_-_font-family: ${e} !important;\n      --primary-font-family: ${e} !important;\n      --mdc-typography-font-family: ${e} !important;\n      --ha-card-header-font-family: ${e} !important;\n    }\n    ha-panel-lovelace, hui-root, hui-view, hui-section,\n    ha-card, .card-header, .card-content,\n    ha-card *, .ha-card *,\n    hui-grid-card, hui-vertical-stack-card, hui-horizontal-stack-card {\n      font-family: ${e} !important;\n    }\n  `}(t);At(document.head,e);for(const t of xt())At(t,e)}(t)):function(){document.getElementById(bt)?.remove(),document.getElementById(vt)?.remove();for(const t of xt())t.getElementById(vt)?.remove()}()}function At(t,e){const o=t,s=o.getElementById?.(vt);if(s)return void(s.textContent!==e&&(s.textContent=e));const i=document.createElement("style");i.id=vt,i.textContent=e,t.appendChild(i)}function xt(){const t=[],e=document.querySelector("home-assistant");if(!e?.shadowRoot)return t;t.push(e.shadowRoot);const o=e.shadowRoot.querySelector("home-assistant-main");if(o?.shadowRoot){t.push(o.shadowRoot);const e=o.shadowRoot.querySelector("partial-panel-resolver"),s=e?.querySelector("ha-panel-lovelace");if(s?.shadowRoot){t.push(s.shadowRoot);const e=s.shadowRoot.querySelector("hui-root");e?.shadowRoot&&t.push(e.shadowRoot)}}return t}let Et=class extends at{constructor(){super(...arguments),this._open=!1,this._prefs={},this._fonts=[],this._query="",this._apiKeyInput="",this._loading=!1,this._previewedFamilies=new Set,this._onOverlayClick=()=>this.close()}async open(){this.hass&&(this._open=!0,this._error=void 0,this._prefs=await mt(this.hass),this._selected=this._prefs.fontFamily,this._apiKeyInput=this._prefs.apiKey??"",this._prefs.apiKey&&await this._fetchCatalog(this._prefs.apiKey))}close(){this._open=!1}render(){return this._open?F`
      <div class="overlay" @click=${this._onOverlayClick}>
        <div class="dialog" @click=${t=>t.stopPropagation()}>
          <header>
            <h2>Dashboard font</h2>
            <button class="icon" @click=${this.close} title="Close">×</button>
          </header>
          ${this._prefs.apiKey?this._renderPicker():this._renderApiKeyGate()}
          ${this._error?F`<div class="error">${this._error}</div>`:K}
        </div>
      </div>
    `:K}_renderApiKeyGate(){return F`
      <section class="gate">
        <p>This plugin uses the free Google Fonts API. Paste your API key to load the font catalog.</p>
        <ol>
          <li>Open <a href="https://console.cloud.google.com/apis/library/webfonts.googleapis.com" target="_blank" rel="noopener">Google Cloud Console → Web Fonts Developer API</a></li>
          <li>Click <strong>Enable</strong></li>
          <li>Go to <a href="https://console.cloud.google.com/apis/credentials" target="_blank" rel="noopener">Credentials</a> → <strong>Create credentials → API key</strong></li>
          <li>Paste it below</li>
        </ol>
        <input
          type="text"
          placeholder="AIzaSy..."
          .value=${this._apiKeyInput}
          @input=${t=>this._apiKeyInput=t.target.value}
        />
        <div class="actions">
          <button class="primary" ?disabled=${this._loading||!this._apiKeyInput} @click=${this._saveApiKey}>
            ${this._loading?"Loading…":"Save & Load Fonts"}
          </button>
        </div>
      </section>
    `}_renderPicker(){const t=function(t,e,o=50){const s=e.trim().toLowerCase();return s?t.filter(t=>t.family.toLowerCase().includes(s)).slice(0,o):t.slice(0,o)}(this._fonts,this._query,80);return F`
      <section class="picker">
        <input
          type="search"
          placeholder="Search ${this._fonts.length||"Google"} fonts…"
          .value=${this._query}
          @input=${t=>this._query=t.target.value}
        />
        <ul class="font-list">
          ${this._loading?F`<li class="muted">Loading catalog…</li>`:0===t.length?F`<li class="muted">No fonts match "${this._query}"</li>`:t.map(t=>this._renderFontRow(t))}
        </ul>
        <div class="actions">
          <button class="ghost" @click=${this._reset}>Reset to default</button>
          <button class="ghost" @click=${this._refreshCatalog} ?disabled=${this._loading}>Refresh catalog</button>
          <button
            class="primary"
            ?disabled=${!this._selected||this._selected===this._prefs.fontFamily}
            @click=${this._apply}
          >
            Apply
          </button>
        </div>
      </section>
    `}_renderFontRow(t){this._ensurePreviewLoaded(t.family);const e=this._selected===t.family;return F`
      <li
        class=${e?"row selected":"row"}
        @click=${()=>this._selected=t.family}
      >
        <div class="row-name" style="font-family: '${t.family}', sans-serif;">${t.family}</div>
        <div class="row-preview" style="font-family: '${t.family}', sans-serif;">${"The quick brown fox 0123"}</div>
      </li>
    `}_ensurePreviewLoaded(t){if(this._previewedFamilies.has(t))return;this._previewedFamilies.add(t);const e=document.createElement("link");e.rel="stylesheet",e.href=`https://fonts.googleapis.com/css2?family=${encodeURIComponent(t)}&display=swap`,e.dataset.haGoogleFontsPreview="1",document.head.appendChild(e)}async _saveApiKey(){if(this.hass){this._loading=!0,this._error=void 0;try{await this._fetchCatalog(this._apiKeyInput),this._prefs={...this._prefs,apiKey:this._apiKeyInput},await $t(this.hass,this._prefs)}catch(t){this._error=t.message}finally{this._loading=!1}}}async _fetchCatalog(t){this._loading=!0;try{this._fonts=await _t(t)}finally{this._loading=!1}}async _refreshCatalog(){if(this._prefs.apiKey){!function(){try{localStorage.removeItem(ft)}catch{}}(),this._error=void 0;try{await this._fetchCatalog(this._prefs.apiKey)}catch(t){this._error=t.message}}}async _apply(){if(!this.hass||!this._selected)return;const t={...this._prefs,fontFamily:this._selected};await $t(this.hass,t),this._prefs=t,wt(this._selected),document.dispatchEvent(new CustomEvent("ha-google-fonts:changed",{detail:this._selected})),this.close()}async _reset(){if(!this.hass)return;const t={...this._prefs,fontFamily:void 0};await $t(this.hass,t),this._prefs=t,this._selected=void 0,wt(void 0),document.dispatchEvent(new CustomEvent("ha-google-fonts:changed",{detail:void 0})),this.close()}};Et.styles=n`
    :host { font-family: var(--primary-font-family, sans-serif); }
    .overlay {
      position: fixed; inset: 0; z-index: 9999;
      background: rgba(0,0,0,0.5);
      display: flex; align-items: center; justify-content: center;
    }
    .dialog {
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color, #000);
      width: min(560px, 92vw); max-height: 86vh;
      border-radius: var(--ha-card-border-radius, 12px);
      box-shadow: 0 12px 40px rgba(0,0,0,0.4);
      display: flex; flex-direction: column; overflow: hidden;
    }
    header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 16px 20px; border-bottom: 1px solid var(--divider-color, #e0e0e0);
    }
    h2 { margin: 0; font-size: 18px; font-weight: 500; }
    .icon {
      background: none; border: none; font-size: 24px; cursor: pointer;
      color: var(--secondary-text-color, #555); padding: 0 4px;
    }
    section { padding: 16px 20px; overflow-y: auto; }
    .gate p { margin: 0 0 12px; color: var(--secondary-text-color, #555); }
    .gate ol { padding-left: 20px; line-height: 1.6; color: var(--secondary-text-color, #555); }
    .gate a { color: var(--primary-color, #03a9f4); }
    input[type="text"], input[type="search"] {
      width: 100%; box-sizing: border-box;
      padding: 10px 12px; font-size: 14px;
      border: 1px solid var(--divider-color, #ccc);
      border-radius: 8px;
      background: var(--secondary-background-color, #f5f5f5);
      color: var(--primary-text-color, #000);
      margin-bottom: 12px;
    }
    .font-list {
      list-style: none; padding: 0; margin: 0 0 12px;
      max-height: 50vh; overflow-y: auto;
      border: 1px solid var(--divider-color, #e0e0e0); border-radius: 8px;
    }
    .row {
      padding: 10px 14px; cursor: pointer;
      border-bottom: 1px solid var(--divider-color, #f0f0f0);
      transition: background 120ms;
    }
    .row:last-child { border-bottom: none; }
    .row:hover { background: var(--secondary-background-color, #f5f5f5); }
    .row.selected { background: color-mix(in srgb, var(--primary-color, #03a9f4) 18%, transparent); }
    .row-name { font-size: 16px; font-weight: 500; }
    .row-preview { font-size: 13px; color: var(--secondary-text-color, #555); margin-top: 2px; }
    .muted { padding: 16px; color: var(--secondary-text-color, #555); text-align: center; }
    .actions {
      display: flex; gap: 8px; justify-content: flex-end;
      padding-top: 4px; flex-wrap: wrap;
    }
    button.primary, button.ghost {
      padding: 8px 16px; border-radius: 8px; cursor: pointer;
      font-size: 14px; font-weight: 500; border: none;
    }
    button.primary {
      background: var(--primary-color, #03a9f4); color: var(--text-primary-color, #fff);
    }
    button.primary:disabled { opacity: 0.5; cursor: not-allowed; }
    button.ghost {
      background: transparent; color: var(--primary-text-color, #000);
      border: 1px solid var(--divider-color, #ccc);
    }
    button.ghost:disabled { opacity: 0.5; cursor: not-allowed; }
    .error {
      margin: 0 20px 16px; padding: 10px 12px;
      background: color-mix(in srgb, var(--error-color, #db4437) 14%, transparent);
      color: var(--error-color, #db4437);
      border-radius: 8px; font-size: 13px;
    }
  `,t([pt({attribute:!1})],Et.prototype,"hass",void 0),t([ut()],Et.prototype,"_open",void 0),t([ut()],Et.prototype,"_prefs",void 0),t([ut()],Et.prototype,"_fonts",void 0),t([ut()],Et.prototype,"_query",void 0),t([ut()],Et.prototype,"_selected",void 0),t([ut()],Et.prototype,"_apiKeyInput",void 0),t([ut()],Et.prototype,"_loading",void 0),t([ut()],Et.prototype,"_error",void 0),Et=t([ct("ha-google-fonts-dialog")],Et);let St=class extends at{render(){return F`
      <button title="Dashboard font" @click=${this._open}>
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
          <path fill="currentColor" d="M9.93 13.5h4.14L12 7.98zM20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-4.05 16.5l-1.14-3H9.17l-1.12 3H5.96l5.11-13h1.86l5.11 13z"/>
        </svg>
      </button>
    `}async _open(){let t=document.querySelector("ha-google-fonts-dialog");t||(t=document.createElement("ha-google-fonts-dialog"),document.body.appendChild(t)),t.hass=this.hass,await t.open()}};St.styles=n`
    :host {
      position: fixed; right: 16px; bottom: 16px;
      z-index: 1000;
    }
    button {
      width: 40px; height: 40px;
      border-radius: 50%;
      border: none; cursor: pointer;
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color, #444);
      box-shadow: 0 2px 6px rgba(0,0,0,0.2);
      display: inline-flex; align-items: center; justify-content: center;
      opacity: 0.65; transition: opacity 150ms, transform 150ms;
    }
    button:hover { opacity: 1; transform: scale(1.05); }
  `,t([pt({attribute:!1})],St.prototype,"hass",void 0),St=t([ct("ha-google-fonts-button")],St);async function Ct(){if(window.__haGoogleFontsBooted)return;window.__haGoogleFontsBooted=!0,console.info("%c HA-GOOGLE-FONTS %c v0.1.0 ","color:#fff;background:#03a9f4;font-weight:700;border-radius:3px 0 0 3px;padding:2px 4px;","color:#03a9f4;background:#fff;border:1px solid #03a9f4;border-radius:0 3px 3px 0;padding:2px 4px;");const t=await async function(t=3e4){const e=Date.now();for(;Date.now()-e<t;){const t=document.querySelector("home-assistant");if(t?.hass?.connection)return t.hass;await new Promise(t=>setTimeout(t,100))}throw new Error("ha-google-fonts: hass not ready after 30s")}(),e=await mt(t);wt(e.fontFamily),function(t){if(document.querySelector("ha-google-fonts-button"))return;const e=document.createElement("ha-google-fonts-button");e.hass=t,document.body.appendChild(e)}(t),function(t){let e=t,o=!1;const s=()=>{o||(o=!0,requestAnimationFrame(()=>{o=!1,e&&wt(e)}))};window.addEventListener("location-changed",s),window.addEventListener("popstate",s);new MutationObserver(s).observe(document.body,{childList:!0,subtree:!0}),document.addEventListener("ha-google-fonts:changed",t=>{e=t.detail})}(e.fontFamily)}"loading"===document.readyState?document.addEventListener("DOMContentLoaded",Ct):Ct();
