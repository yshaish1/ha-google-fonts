function t(t,e,s,o){var i,n=arguments.length,r=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,s):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,s,o);else for(var a=t.length-1;a>=0;a--)(i=t[a])&&(r=(n<3?i(r):n>3?i(e,s,r):i(e,s))||r);return n>3&&r&&Object.defineProperty(e,s,r),r}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,s=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,o=Symbol(),i=new WeakMap;let n=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==o)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(s&&void 0===t){const s=void 0!==e&&1===e.length;s&&(t=i.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&i.set(e,t))}return t}toString(){return this.cssText}};const r=(t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,s,o)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[o+1],t[0]);return new n(s,t,o)},a=s?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,o))(e)})(t):t,{is:l,defineProperty:c,getOwnPropertyDescriptor:h,getOwnPropertyNames:d,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,f=globalThis,y=f.trustedTypes,_=y?y.emptyScript:"",g=f.reactiveElementPolyfillSupport,m=(t,e)=>t,$={toAttribute(t,e){switch(e){case Boolean:t=t?_:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},v=(t,e)=>!l(t,e),b={attribute:!0,type:String,converter:$,reflect:!1,useDefault:!1,hasChanged:v};Symbol.metadata??=Symbol("metadata"),f.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=b){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),o=this.getPropertyDescriptor(t,s,e);void 0!==o&&c(this.prototype,t,o)}}static getPropertyDescriptor(t,e,s){const{get:o,set:i}=h(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:o,set(e){const n=o?.call(this);i?.call(this,e),this.requestUpdate(t,n,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??b}static _$Ei(){if(this.hasOwnProperty(m("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(m("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(m("properties"))){const t=this.properties,e=[...d(t),...p(t)];for(const s of e)this.createProperty(s,t[s])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,s]of e)this.elementProperties.set(t,s)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const s=this._$Eu(t,e);void 0!==s&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,o)=>{if(s)t.adoptedStyleSheets=o.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const s of o){const o=document.createElement("style"),i=e.litNonce;void 0!==i&&o.setAttribute("nonce",i),o.textContent=s.cssText,t.appendChild(o)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){const s=this.constructor.elementProperties.get(t),o=this.constructor._$Eu(t,s);if(void 0!==o&&!0===s.reflect){const i=(void 0!==s.converter?.toAttribute?s.converter:$).toAttribute(e,s.type);this._$Em=t,null==i?this.removeAttribute(o):this.setAttribute(o,i),this._$Em=null}}_$AK(t,e){const s=this.constructor,o=s._$Eh.get(t);if(void 0!==o&&this._$Em!==o){const t=s.getPropertyOptions(o),i="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:$;this._$Em=o;const n=i.fromAttribute(e,t.type);this[o]=n??this._$Ej?.get(o)??n,this._$Em=null}}requestUpdate(t,e,s,o=!1,i){if(void 0!==t){const n=this.constructor;if(!1===o&&(i=this[t]),s??=n.getPropertyOptions(t),!((s.hasChanged??v)(i,e)||s.useDefault&&s.reflect&&i===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,s))))return;this.C(t,e,s)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:o,wrapped:i},n){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),!0!==i||void 0!==n)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),!0===o&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,s]of t){const{wrapped:t}=s,o=this[e];!0!==t||this._$AL.has(e)||void 0===o||this.C(e,void 0,s,o)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[m("elementProperties")]=new Map,w[m("finalized")]=new Map,g?.({ReactiveElement:w}),(f.reactiveElementVersions??=[]).push("2.1.2");const A=globalThis,x=t=>t,E=A.trustedTypes,S=E?E.createPolicy("lit-html",{createHTML:t=>t}):void 0,C="$lit$",P=`lit$${Math.random().toFixed(9).slice(2)}$`,k="?"+P,O=`<${k}>`,U=document,R=()=>U.createComment(""),M=t=>null===t||"object"!=typeof t&&"function"!=typeof t,H=Array.isArray,I="[ \t\n\f\r]",T=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,N=/-->/g,z=/>/g,L=RegExp(`>|${I}(?:([^\\s"'>=/]+)(${I}*=${I}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),D=/'/g,j=/"/g,F=/^(?:script|style|textarea|title)$/i,B=(t=>(e,...s)=>({_$litType$:t,strings:e,values:s}))(1),K=Symbol.for("lit-noChange"),q=Symbol.for("lit-nothing"),G=new WeakMap,W=U.createTreeWalker(U,129);function V(t,e){if(!H(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}const J=(t,e)=>{const s=t.length-1,o=[];let i,n=2===e?"<svg>":3===e?"<math>":"",r=T;for(let e=0;e<s;e++){const s=t[e];let a,l,c=-1,h=0;for(;h<s.length&&(r.lastIndex=h,l=r.exec(s),null!==l);)h=r.lastIndex,r===T?"!--"===l[1]?r=N:void 0!==l[1]?r=z:void 0!==l[2]?(F.test(l[2])&&(i=RegExp("</"+l[2],"g")),r=L):void 0!==l[3]&&(r=L):r===L?">"===l[0]?(r=i??T,c=-1):void 0===l[1]?c=-2:(c=r.lastIndex-l[2].length,a=l[1],r=void 0===l[3]?L:'"'===l[3]?j:D):r===j||r===D?r=L:r===N||r===z?r=T:(r=L,i=void 0);const d=r===L&&t[e+1].startsWith("/>")?" ":"";n+=r===T?s+O:c>=0?(o.push(a),s.slice(0,c)+C+s.slice(c)+P+d):s+P+(-2===c?e:d)}return[V(t,n+(t[s]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),o]};class Z{constructor({strings:t,_$litType$:e},s){let o;this.parts=[];let i=0,n=0;const r=t.length-1,a=this.parts,[l,c]=J(t,e);if(this.el=Z.createElement(l,s),W.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(o=W.nextNode())&&a.length<r;){if(1===o.nodeType){if(o.hasAttributes())for(const t of o.getAttributeNames())if(t.endsWith(C)){const e=c[n++],s=o.getAttribute(t).split(P),r=/([.?@])?(.*)/.exec(e);a.push({type:1,index:i,name:r[2],strings:s,ctor:"."===r[1]?et:"?"===r[1]?st:"@"===r[1]?ot:tt}),o.removeAttribute(t)}else t.startsWith(P)&&(a.push({type:6,index:i}),o.removeAttribute(t));if(F.test(o.tagName)){const t=o.textContent.split(P),e=t.length-1;if(e>0){o.textContent=E?E.emptyScript:"";for(let s=0;s<e;s++)o.append(t[s],R()),W.nextNode(),a.push({type:2,index:++i});o.append(t[e],R())}}}else if(8===o.nodeType)if(o.data===k)a.push({type:2,index:i});else{let t=-1;for(;-1!==(t=o.data.indexOf(P,t+1));)a.push({type:7,index:i}),t+=P.length-1}i++}}static createElement(t,e){const s=U.createElement("template");return s.innerHTML=t,s}}function Q(t,e,s=t,o){if(e===K)return e;let i=void 0!==o?s._$Co?.[o]:s._$Cl;const n=M(e)?void 0:e._$litDirective$;return i?.constructor!==n&&(i?._$AO?.(!1),void 0===n?i=void 0:(i=new n(t),i._$AT(t,s,o)),void 0!==o?(s._$Co??=[])[o]=i:s._$Cl=i),void 0!==i&&(e=Q(t,i._$AS(t,e.values),i,o)),e}class X{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,o=(t?.creationScope??U).importNode(e,!0);W.currentNode=o;let i=W.nextNode(),n=0,r=0,a=s[0];for(;void 0!==a;){if(n===a.index){let e;2===a.type?e=new Y(i,i.nextSibling,this,t):1===a.type?e=new a.ctor(i,a.name,a.strings,this,t):6===a.type&&(e=new it(i,this,t)),this._$AV.push(e),a=s[++r]}n!==a?.index&&(i=W.nextNode(),n++)}return W.currentNode=U,o}p(t){let e=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class Y{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,o){this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Q(this,t,e),M(t)?t===q||null==t||""===t?(this._$AH!==q&&this._$AR(),this._$AH=q):t!==this._$AH&&t!==K&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>H(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==q&&M(this._$AH)?this._$AA.nextSibling.data=t:this.T(U.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:s}=t,o="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=Z.createElement(V(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===o)this._$AH.p(e);else{const t=new X(o,this),s=t.u(this.options);t.p(e),this.T(s),this._$AH=t}}_$AC(t){let e=G.get(t.strings);return void 0===e&&G.set(t.strings,e=new Z(t)),e}k(t){H(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,o=0;for(const i of t)o===e.length?e.push(s=new Y(this.O(R()),this.O(R()),this,this.options)):s=e[o],s._$AI(i),o++;o<e.length&&(this._$AR(s&&s._$AB.nextSibling,o),e.length=o)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=x(t).nextSibling;x(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,o,i){this.type=1,this._$AH=q,this._$AN=void 0,this.element=t,this.name=e,this._$AM=o,this.options=i,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=q}_$AI(t,e=this,s,o){const i=this.strings;let n=!1;if(void 0===i)t=Q(this,t,e,0),n=!M(t)||t!==this._$AH&&t!==K,n&&(this._$AH=t);else{const o=t;let r,a;for(t=i[0],r=0;r<i.length-1;r++)a=Q(this,o[s+r],e,r),a===K&&(a=this._$AH[r]),n||=!M(a)||a!==this._$AH[r],a===q?t=q:t!==q&&(t+=(a??"")+i[r+1]),this._$AH[r]=a}n&&!o&&this.j(t)}j(t){t===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===q?void 0:t}}class st extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==q)}}class ot extends tt{constructor(t,e,s,o,i){super(t,e,s,o,i),this.type=5}_$AI(t,e=this){if((t=Q(this,t,e,0)??q)===K)return;const s=this._$AH,o=t===q&&s!==q||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,i=t!==q&&(s===q||o);o&&this.element.removeEventListener(this.name,this,s),i&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class it{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){Q(this,t)}}const nt=A.litHtmlPolyfillSupport;nt?.(Z,Y),(A.litHtmlVersions??=[]).push("3.3.2");const rt=globalThis;class at extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,s)=>{const o=s?.renderBefore??e;let i=o._$litPart$;if(void 0===i){const t=s?.renderBefore??null;o._$litPart$=i=new Y(e.insertBefore(R(),t),t,void 0,s??{})}return i._$AI(t),i})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return K}}at._$litElement$=!0,at.finalized=!0,rt.litElementHydrateSupport?.({LitElement:at});const lt=rt.litElementPolyfillSupport;lt?.({LitElement:at}),(rt.litElementVersions??=[]).push("4.2.2");const ct=t=>(e,s)=>{void 0!==s?s.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},ht={attribute:!0,type:String,converter:$,reflect:!1,hasChanged:v},dt=(t=ht,e,s)=>{const{kind:o,metadata:i}=s;let n=globalThis.litPropertyMetadata.get(i);if(void 0===n&&globalThis.litPropertyMetadata.set(i,n=new Map),"setter"===o&&((t=Object.create(t)).wrapped=!0),n.set(s.name,t),"accessor"===o){const{name:o}=s;return{set(s){const i=e.get.call(this);e.set.call(this,s),this.requestUpdate(o,i,t,!0,s)},init(e){return void 0!==e&&this.C(o,void 0,t,e),e}}}if("setter"===o){const{name:o}=s;return function(s){const i=this[o];e.call(this,s),this.requestUpdate(o,i,t,!0,s)}}throw Error("Unsupported decorator location: "+o)};function pt(t){return(e,s)=>"object"==typeof s?dt(t,e,s):((t,e,s)=>{const o=e.hasOwnProperty(s);return e.constructor.createProperty(s,t),o?Object.getOwnPropertyDescriptor(e,s):void 0})(t,e,s)}function ut(t){return pt({...t,state:!0,attribute:!1})}const ft="ha_google_fonts_catalog",yt=864e5;async function _t(t,e=!1){if(!e){const t=function(){try{const t=localStorage.getItem(ft);if(!t)return null;const e=JSON.parse(t);return Date.now()-e.fetchedAt>yt?null:e}catch{return null}}();if(t)return t.items}const s=`https://www.googleapis.com/webfonts/v1/webfonts?key=${encodeURIComponent(t)}&sort=popularity`,o=await fetch(s);if(!o.ok)throw new Error(`Google Fonts API error ${o.status}: ${await o.text()}`);const i=(await o.json()).items.map(t=>({family:t.family,category:t.category,variants:t.variants,subsets:t.subsets}));return function(t){try{localStorage.setItem(ft,JSON.stringify(t))}catch{}}({fetchedAt:Date.now(),items:i}),i}const gt="ha_google_fonts";async function mt(t){try{return(await t.connection.sendMessagePromise({type:"frontend/get_user_data",key:gt})).value??{}}catch{return{}}}async function $t(t,e){await t.connection.sendMessagePromise({type:"frontend/set_user_data",key:gt,value:e})}const vt="ha-google-fonts-style",bt="ha-google-fonts-link";let wt,At=null;function xt(t){if(wt=t,!t)return document.getElementById(bt)?.remove(),document.getElementById(vt)?.remove(),void(At&&(St(t=>{t.adoptedStyleSheets=t.adoptedStyleSheets.filter(t=>t!==At)}),At=null));!function(t){const e=`https://fonts.googleapis.com/css2?family=${encodeURIComponent(t)}:wght@300;400;500;600;700&display=swap`;let s=document.getElementById(bt);s||(s=document.createElement("link"),s.id=bt,s.rel="stylesheet",document.head.appendChild(s));s.href!==e&&(s.href=e)}(t),Et(t)}function Et(t){const e=function(t){const e=`"${t}", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;return`\n    :root, :host {\n      --paper-font-common-base_-_font-family: ${e} !important;\n      --paper-font-body1_-_font-family: ${e} !important;\n      --paper-font-subhead_-_font-family: ${e} !important;\n      --paper-font-headline_-_font-family: ${e} !important;\n      --paper-font-title_-_font-family: ${e} !important;\n      --paper-font-caption_-_font-family: ${e} !important;\n      --primary-font-family: ${e} !important;\n      --mdc-typography-font-family: ${e} !important;\n      --ha-card-header-font-family: ${e} !important;\n    }\n    * { font-family: ${e} !important; }\n  `}(t);At||"adoptedStyleSheets"in Document.prototype&&(At=new CSSStyleSheet),At&&At.replaceSync(e),function(t){let e=document.getElementById(vt);e||(e=document.createElement("style"),e.id=vt,document.head.appendChild(e));e.textContent!==t&&(e.textContent=t)}(e),St(t=>{At&&!t.adoptedStyleSheets.includes(At)?t.adoptedStyleSheets=[...t.adoptedStyleSheets,At]:At||function(t,e){let s=t.getElementById(vt);s||(s=document.createElement("style"),s.id=vt,t.appendChild(s));s.textContent!==e&&(s.textContent=e)}(t,e)})}function St(t){const e=new WeakSet,s=o=>{o instanceof Element&&o.shadowRoot&&!e.has(o.shadowRoot)&&(e.add(o.shadowRoot),t(o.shadowRoot),s(o.shadowRoot));const i=o.children;if(i)for(const t of Array.from(i))s(t)};s(document.documentElement)}let Ct=class extends at{constructor(){super(...arguments),this._open=!1,this._prefs={},this._fonts=[],this._query="",this._apiKeyInput="",this._loading=!1,this._previewedFamilies=new Set,this._onOverlayClick=()=>this.close()}async open(){this.hass&&(this._open=!0,this._error=void 0,this._prefs=await mt(this.hass),this._selected=this._prefs.fontFamily,this._apiKeyInput=this._prefs.apiKey??"",this._prefs.apiKey&&await this._fetchCatalog(this._prefs.apiKey))}close(){this._open=!1}render(){return this._open?B`
      <div class="overlay" @click=${this._onOverlayClick}>
        <div class="dialog" @click=${t=>t.stopPropagation()}>
          <header>
            <h2>Dashboard font</h2>
            <button class="icon" @click=${this.close} title="Close">×</button>
          </header>
          ${this._prefs.apiKey?this._renderPicker():this._renderApiKeyGate()}
          ${this._error?B`<div class="error">${this._error}</div>`:q}
        </div>
      </div>
    `:q}_renderApiKeyGate(){return B`
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
    `}_renderPicker(){const t=function(t,e,s=50){const o=e.trim().toLowerCase();return o?t.filter(t=>t.family.toLowerCase().includes(o)).slice(0,s):t.slice(0,s)}(this._fonts,this._query,80);return B`
      <section class="picker">
        <input
          type="search"
          placeholder="Search ${this._fonts.length||"Google"} fonts…"
          .value=${this._query}
          @input=${t=>this._query=t.target.value}
        />
        <ul class="font-list">
          ${this._loading?B`<li class="muted">Loading catalog…</li>`:0===t.length?B`<li class="muted">No fonts match "${this._query}"</li>`:t.map(t=>this._renderFontRow(t))}
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
    `}_renderFontRow(t){this._ensurePreviewLoaded(t.family);const e=this._selected===t.family;return B`
      <li
        class=${e?"row selected":"row"}
        @click=${()=>this._selected=t.family}
      >
        <div class="row-name" style="font-family: '${t.family}', sans-serif;">${t.family}</div>
        <div class="row-preview" style="font-family: '${t.family}', sans-serif;">${"The quick brown fox 0123"}</div>
      </li>
    `}_ensurePreviewLoaded(t){if(this._previewedFamilies.has(t))return;this._previewedFamilies.add(t);const e=document.createElement("link");e.rel="stylesheet",e.href=`https://fonts.googleapis.com/css2?family=${encodeURIComponent(t)}&display=swap`,e.dataset.haGoogleFontsPreview="1",document.head.appendChild(e)}async _saveApiKey(){if(this.hass){this._loading=!0,this._error=void 0;try{await this._fetchCatalog(this._apiKeyInput),this._prefs={...this._prefs,apiKey:this._apiKeyInput},await $t(this.hass,this._prefs)}catch(t){this._error=t.message}finally{this._loading=!1}}}async _fetchCatalog(t){this._loading=!0;try{this._fonts=await _t(t)}finally{this._loading=!1}}async _refreshCatalog(){if(this._prefs.apiKey){!function(){try{localStorage.removeItem(ft)}catch{}}(),this._error=void 0;try{await this._fetchCatalog(this._prefs.apiKey)}catch(t){this._error=t.message}}}async _apply(){if(!this.hass||!this._selected)return;const t={...this._prefs,fontFamily:this._selected};await $t(this.hass,t),this._prefs=t,xt(this._selected),document.dispatchEvent(new CustomEvent("ha-google-fonts:changed",{detail:this._selected})),this.close()}async _reset(){if(!this.hass)return;const t={...this._prefs,fontFamily:void 0};await $t(this.hass,t),this._prefs=t,this._selected=void 0,xt(void 0),document.dispatchEvent(new CustomEvent("ha-google-fonts:changed",{detail:void 0})),this.close()}};Ct.styles=r`
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
  `,t([pt({attribute:!1})],Ct.prototype,"hass",void 0),t([ut()],Ct.prototype,"_open",void 0),t([ut()],Ct.prototype,"_prefs",void 0),t([ut()],Ct.prototype,"_fonts",void 0),t([ut()],Ct.prototype,"_query",void 0),t([ut()],Ct.prototype,"_selected",void 0),t([ut()],Ct.prototype,"_apiKeyInput",void 0),t([ut()],Ct.prototype,"_loading",void 0),t([ut()],Ct.prototype,"_error",void 0),Ct=t([ct("ha-google-fonts-dialog")],Ct);let Pt=class extends at{render(){return B`
      <button title="Dashboard font" @click=${this._open}>
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
          <path fill="currentColor" d="M9.93 13.5h4.14L12 7.98zM20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-4.05 16.5l-1.14-3H9.17l-1.12 3H5.96l5.11-13h1.86l5.11 13z"/>
        </svg>
      </button>
    `}async _open(){let t=document.querySelector("ha-google-fonts-dialog");t||(t=document.createElement("ha-google-fonts-dialog"),document.body.appendChild(t)),t.hass=this.hass,await t.open()}};Pt.styles=r`
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
  `,t([pt({attribute:!1})],Pt.prototype,"hass",void 0),Pt=t([ct("ha-google-fonts-button")],Pt);async function kt(){if(window.__haGoogleFontsBooted)return;window.__haGoogleFontsBooted=!0,console.info("%c HA-GOOGLE-FONTS %c v0.1.1 ","color:#fff;background:#03a9f4;font-weight:700;border-radius:3px 0 0 3px;padding:2px 4px;","color:#03a9f4;background:#fff;border:1px solid #03a9f4;border-radius:0 3px 3px 0;padding:2px 4px;");const t=await async function(t=3e4){const e=Date.now();for(;Date.now()-e<t;){const t=document.querySelector("home-assistant");if(t?.hass?.connection)return t.hass;await new Promise(t=>setTimeout(t,100))}throw new Error("ha-google-fonts: hass not ready after 30s")}(),e=await mt(t);xt(e.fontFamily),function(t){if(document.querySelector("ha-google-fonts-button"))return;const e=document.createElement("ha-google-fonts-button");e.hass=t,document.body.appendChild(e)}(t),function(){let t=!1;const e=()=>{t||(t=!0,requestAnimationFrame(()=>{t=!1,wt&&Et(wt)}))};window.addEventListener("location-changed",e),window.addEventListener("popstate",e);new MutationObserver(e).observe(document.body,{childList:!0,subtree:!0})}(e.fontFamily)}"loading"===document.readyState?document.addEventListener("DOMContentLoaded",kt):kt();
