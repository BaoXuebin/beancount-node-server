(this["webpackJsonpbeancount-web"]=this["webpackJsonpbeancount-web"]||[]).push([[10],{103:function(e,t,r){"use strict";r.r(t),r.d(t,"Headers",(function(){return p})),r.d(t,"Request",(function(){return w})),r.d(t,"Response",(function(){return A})),r.d(t,"DOMException",(function(){return T})),r.d(t,"fetch",(function(){return _}));var n="undefined"!==typeof globalThis&&globalThis||"undefined"!==typeof self&&self||"undefined"!==typeof n&&n,o="URLSearchParams"in n,i="Symbol"in n&&"iterator"in Symbol,a="FileReader"in n&&"Blob"in n&&function(){try{return new Blob,!0}catch(e){return!1}}(),s="FormData"in n,c="ArrayBuffer"in n;if(c)var l=["[object Int8Array]","[object Uint8Array]","[object Uint8ClampedArray]","[object Int16Array]","[object Uint16Array]","[object Int32Array]","[object Uint32Array]","[object Float32Array]","[object Float64Array]"],u=ArrayBuffer.isView||function(e){return e&&l.indexOf(Object.prototype.toString.call(e))>-1};function h(e){if("string"!==typeof e&&(e=String(e)),/[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(e)||""===e)throw new TypeError('Invalid character in header field name: "'+e+'"');return e.toLowerCase()}function f(e){return"string"!==typeof e&&(e=String(e)),e}function d(e){var t={next:function(){var t=e.shift();return{done:void 0===t,value:t}}};return i&&(t[Symbol.iterator]=function(){return t}),t}function p(e){this.map={},e instanceof p?e.forEach((function(e,t){this.append(t,e)}),this):Array.isArray(e)?e.forEach((function(e){this.append(e[0],e[1])}),this):e&&Object.getOwnPropertyNames(e).forEach((function(t){this.append(t,e[t])}),this)}function y(e){if(e.bodyUsed)return Promise.reject(new TypeError("Already read"));e.bodyUsed=!0}function b(e){return new Promise((function(t,r){e.onload=function(){t(e.result)},e.onerror=function(){r(e.error)}}))}function m(e){var t=new FileReader,r=b(t);return t.readAsArrayBuffer(e),r}function j(e){if(e.slice)return e.slice(0);var t=new Uint8Array(e.byteLength);return t.set(new Uint8Array(e)),t.buffer}function O(){return this.bodyUsed=!1,this._initBody=function(e){var t;this.bodyUsed=this.bodyUsed,this._bodyInit=e,e?"string"===typeof e?this._bodyText=e:a&&Blob.prototype.isPrototypeOf(e)?this._bodyBlob=e:s&&FormData.prototype.isPrototypeOf(e)?this._bodyFormData=e:o&&URLSearchParams.prototype.isPrototypeOf(e)?this._bodyText=e.toString():c&&a&&((t=e)&&DataView.prototype.isPrototypeOf(t))?(this._bodyArrayBuffer=j(e.buffer),this._bodyInit=new Blob([this._bodyArrayBuffer])):c&&(ArrayBuffer.prototype.isPrototypeOf(e)||u(e))?this._bodyArrayBuffer=j(e):this._bodyText=e=Object.prototype.toString.call(e):this._bodyText="",this.headers.get("content-type")||("string"===typeof e?this.headers.set("content-type","text/plain;charset=UTF-8"):this._bodyBlob&&this._bodyBlob.type?this.headers.set("content-type",this._bodyBlob.type):o&&URLSearchParams.prototype.isPrototypeOf(e)&&this.headers.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"))},a&&(this.blob=function(){var e=y(this);if(e)return e;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(new Blob([this._bodyArrayBuffer]));if(this._bodyFormData)throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){if(this._bodyArrayBuffer){var e=y(this);return e||(ArrayBuffer.isView(this._bodyArrayBuffer)?Promise.resolve(this._bodyArrayBuffer.buffer.slice(this._bodyArrayBuffer.byteOffset,this._bodyArrayBuffer.byteOffset+this._bodyArrayBuffer.byteLength)):Promise.resolve(this._bodyArrayBuffer))}return this.blob().then(m)}),this.text=function(){var e=y(this);if(e)return e;if(this._bodyBlob)return function(e){var t=new FileReader,r=b(t);return t.readAsText(e),r}(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(function(e){for(var t=new Uint8Array(e),r=new Array(t.length),n=0;n<t.length;n++)r[n]=String.fromCharCode(t[n]);return r.join("")}(this._bodyArrayBuffer));if(this._bodyFormData)throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText)},s&&(this.formData=function(){return this.text().then(g)}),this.json=function(){return this.text().then(JSON.parse)},this}p.prototype.append=function(e,t){e=h(e),t=f(t);var r=this.map[e];this.map[e]=r?r+", "+t:t},p.prototype.delete=function(e){delete this.map[h(e)]},p.prototype.get=function(e){return e=h(e),this.has(e)?this.map[e]:null},p.prototype.has=function(e){return this.map.hasOwnProperty(h(e))},p.prototype.set=function(e,t){this.map[h(e)]=f(t)},p.prototype.forEach=function(e,t){for(var r in this.map)this.map.hasOwnProperty(r)&&e.call(t,this.map[r],r,this)},p.prototype.keys=function(){var e=[];return this.forEach((function(t,r){e.push(r)})),d(e)},p.prototype.values=function(){var e=[];return this.forEach((function(t){e.push(t)})),d(e)},p.prototype.entries=function(){var e=[];return this.forEach((function(t,r){e.push([r,t])})),d(e)},i&&(p.prototype[Symbol.iterator]=p.prototype.entries);var v=["DELETE","GET","HEAD","OPTIONS","POST","PUT"];function w(e,t){if(!(this instanceof w))throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');var r=(t=t||{}).body;if(e instanceof w){if(e.bodyUsed)throw new TypeError("Already read");this.url=e.url,this.credentials=e.credentials,t.headers||(this.headers=new p(e.headers)),this.method=e.method,this.mode=e.mode,this.signal=e.signal,r||null==e._bodyInit||(r=e._bodyInit,e.bodyUsed=!0)}else this.url=String(e);if(this.credentials=t.credentials||this.credentials||"same-origin",!t.headers&&this.headers||(this.headers=new p(t.headers)),this.method=function(e){var t=e.toUpperCase();return v.indexOf(t)>-1?t:e}(t.method||this.method||"GET"),this.mode=t.mode||this.mode||null,this.signal=t.signal||this.signal,this.referrer=null,("GET"===this.method||"HEAD"===this.method)&&r)throw new TypeError("Body not allowed for GET or HEAD requests");if(this._initBody(r),("GET"===this.method||"HEAD"===this.method)&&("no-store"===t.cache||"no-cache"===t.cache)){var n=/([?&])_=[^&]*/;if(n.test(this.url))this.url=this.url.replace(n,"$1_="+(new Date).getTime());else{this.url+=(/\?/.test(this.url)?"&":"?")+"_="+(new Date).getTime()}}}function g(e){var t=new FormData;return e.trim().split("&").forEach((function(e){if(e){var r=e.split("="),n=r.shift().replace(/\+/g," "),o=r.join("=").replace(/\+/g," ");t.append(decodeURIComponent(n),decodeURIComponent(o))}})),t}function x(e){var t=new p;return e.replace(/\r?\n[\t ]+/g," ").split("\r").map((function(e){return 0===e.indexOf("\n")?e.substr(1,e.length):e})).forEach((function(e){var r=e.split(":"),n=r.shift().trim();if(n){var o=r.join(":").trim();t.append(n,o)}})),t}function A(e,t){if(!(this instanceof A))throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');t||(t={}),this.type="default",this.status=void 0===t.status?200:t.status,this.ok=this.status>=200&&this.status<300,this.statusText=void 0===t.statusText?"":""+t.statusText,this.headers=new p(t.headers),this.url=t.url||"",this._initBody(e)}w.prototype.clone=function(){return new w(this,{body:this._bodyInit})},O.call(w.prototype),O.call(A.prototype),A.prototype.clone=function(){return new A(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new p(this.headers),url:this.url})},A.error=function(){var e=new A(null,{status:0,statusText:""});return e.type="error",e};var E=[301,302,303,307,308];A.redirect=function(e,t){if(-1===E.indexOf(t))throw new RangeError("Invalid status code");return new A(null,{status:t,headers:{location:e}})};var T=n.DOMException;try{new T}catch(B){(T=function(e,t){this.message=e,this.name=t;var r=Error(e);this.stack=r.stack}).prototype=Object.create(Error.prototype),T.prototype.constructor=T}function _(e,t){return new Promise((function(r,o){var i=new w(e,t);if(i.signal&&i.signal.aborted)return o(new T("Aborted","AbortError"));var s=new XMLHttpRequest;function l(){s.abort()}s.onload=function(){var e={status:s.status,statusText:s.statusText,headers:x(s.getAllResponseHeaders()||"")};e.url="responseURL"in s?s.responseURL:e.headers.get("X-Request-URL");var t="response"in s?s.response:s.responseText;setTimeout((function(){r(new A(t,e))}),0)},s.onerror=function(){setTimeout((function(){o(new TypeError("Network request failed"))}),0)},s.ontimeout=function(){setTimeout((function(){o(new TypeError("Network request failed"))}),0)},s.onabort=function(){setTimeout((function(){o(new T("Aborted","AbortError"))}),0)},s.open(i.method,function(e){try{return""===e&&n.location.href?n.location.href:e}catch(t){return e}}(i.url),!0),"include"===i.credentials?s.withCredentials=!0:"omit"===i.credentials&&(s.withCredentials=!1),"responseType"in s&&(a?s.responseType="blob":c&&i.headers.get("Content-Type")&&-1!==i.headers.get("Content-Type").indexOf("application/octet-stream")&&(s.responseType="arraybuffer")),!t||"object"!==typeof t.headers||t.headers instanceof p?i.headers.forEach((function(e,t){s.setRequestHeader(t,e)})):Object.getOwnPropertyNames(t.headers).forEach((function(e){s.setRequestHeader(e,f(t.headers[e]))})),i.signal&&(i.signal.addEventListener("abort",l),s.onreadystatechange=function(){4===s.readyState&&i.signal.removeEventListener("abort",l)}),s.send("undefined"===typeof i._bodyInit?null:i._bodyInit)}))}_.polyfill=!0,n.fetch||(n.fetch=_,n.Headers=p,n.Request=w,n.Response=A)},255:function(e,t,r){},277:function(e,t,r){"use strict";r.r(t);var n=r(11),o=r(12),i=r(14),a=r(13),s=r(62);function c(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var l=r(0),u=r.n(l),h={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M696 480H328c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h368c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8z"}},{tag:"path",attrs:{d:"M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"}}]},name:"minus-circle",theme:"outlined"},f=r(45),d=function(e,t){return l.createElement(f.a,Object.assign({},e,{ref:t,icon:h}))};d.displayName="MinusCircleOutlined";var p=l.forwardRef(d),y=r(266),b=r(96),m=r(274),j=r(263),O=r(276),v=r(3),w=r(40),g=r(41),x=r(39),A=r.n(x),E=r(60),T=r(97);function _(e){var t=e.className,r=e.direction,n=e.index,o=e.marginDirection,i=e.children,a=e.split,s=e.wrap,c=l.useContext(S),u=c.horizontalSize,h=c.verticalSize,f=c.latestIndex,d={};return c.supportFlexGap||("vertical"===r?n<f&&(d={marginBottom:u/(a?2:1)}):d=Object(v.a)(Object(v.a)({},n<f&&Object(w.a)({},o,u/(a?2:1))),s&&{paddingBottom:h})),null===i||void 0===i?null:l.createElement(l.Fragment,null,l.createElement("div",{className:t,style:d},i),n<f&&a&&l.createElement("span",{className:"".concat(t,"-split"),style:d},a))}var B=r(157),P=function(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var o=0;for(n=Object.getOwnPropertySymbols(e);o<n.length;o++)t.indexOf(n[o])<0&&Object.prototype.propertyIsEnumerable.call(e,n[o])&&(r[n[o]]=e[n[o]])}return r},S=l.createContext({latestIndex:0,horizontalSize:0,verticalSize:0,supportFlexGap:!1}),R={small:8,middle:16,large:24};var C=function(e){var t,r=l.useContext(T.b),n=r.getPrefixCls,o=r.space,i=r.direction,a=e.size,s=void 0===a?(null===o||void 0===o?void 0:o.size)||"small":a,c=e.align,u=e.className,h=e.children,f=e.direction,d=void 0===f?"horizontal":f,p=e.prefixCls,y=e.split,b=e.style,m=e.wrap,j=void 0!==m&&m,O=P(e,["size","align","className","children","direction","prefixCls","split","style","wrap"]),x=Object(B.a)(),C=l.useMemo((function(){return(Array.isArray(s)?s:[s,s]).map((function(e){return function(e){return"string"===typeof e?R[e]:e||0}(e)}))}),[s]),I=Object(g.a)(C,2),F=I[0],D=I[1],U=Object(E.a)(h,{keepEmpty:!0}),k=void 0===c&&"horizontal"===d?"center":c,z=n("space",p),q=A()(z,"".concat(z,"-").concat(d),(t={},Object(w.a)(t,"".concat(z,"-rtl"),"rtl"===i),Object(w.a)(t,"".concat(z,"-align-").concat(k),k),t),u),N="".concat(z,"-item"),L="rtl"===i?"marginLeft":"marginRight",M=0,H=U.map((function(e,t){return null!==e&&void 0!==e&&(M=t),l.createElement(_,{className:N,key:"".concat(N,"-").concat(t),direction:d,index:t,marginDirection:L,split:y,wrap:j},e)})),G=l.useMemo((function(){return{horizontalSize:F,verticalSize:D,latestIndex:M,supportFlexGap:x}}),[F,D,M,x]);if(0===U.length)return null;var V={};return j&&(V.flexWrap="wrap",x||(V.marginBottom=-D)),x&&(V.columnGap=F,V.rowGap=D),l.createElement("div",Object(v.a)({className:q,style:Object(v.a)(Object(v.a)({},V),b)},O),l.createElement(S.Provider,{value:G},H))},I=r(262),F=r(102),D=r.n(F),U=r(77),k=r.n(U),z=r(15),q=r(57),N=(r(255),r(1)),L=["form","initialValue"],M=b.a.Option,H={labelCol:{span:4},wrapperCol:{span:16}},G={required:"${label} \u4e0d\u80fd\u4e3a\u7a7a\uff01"},V=function(e){var t=e.form,r=e.initialValue,n=c(e,L);return u.a.useEffect((function(){t.current.setFields([{name:n.name,value:r}])}),[]),Object(N.jsx)(m.a.List,Object(s.a)({},n))},J=function(e){Object(i.a)(r,e);var t=Object(a.a)(r);function r(){var e;Object(n.a)(this,r);for(var o=arguments.length,i=new Array(o),a=0;a<o;a++)i[a]=arguments[a];return(e=t.call.apply(t,[this].concat(i))).theme=e.context.theme,e.formRef=u.a.createRef(),e.state={loading:!1,accounts:[]},e.queryAllValidAccounts=function(){k()("/api/account/valid").then((function(e){return e.json()})).then((function(t){200===t.code&&e.setState({accounts:t.data})})).catch(console.error)},e.handleResetForm=function(){e.formRef.current.resetFields()},e.handleSubmit=function(t){k()("/api/entry",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}).then((function(e){return e.json()})).then((function(t){200===t.code?(j.b.success("\u6dfb\u52a0\u6210\u529f"),e.handleResetForm()):1001===t.code?j.b.error("\u8d26\u76ee\u4e0d\u5e73\u8861"):j.b.error("\u6dfb\u52a0\u5931\u8d25")})).catch((function(e){j.b.error("\u6dfb\u52a0\u5931\u8d25")}))},e}return Object(o.a)(r,[{key:"componentDidMount",value:function(){this.queryAllValidAccounts(),this.formRef.current.setFieldsValue({date:D()().format("YYYY-MM-DD")})}},{key:"render",value:function(){var e=this;return this.context.theme!==this.theme&&(this.theme=this.context.theme),Object(N.jsx)("div",{className:"add-entry-page page",children:Object(N.jsxs)(m.a,Object(s.a)(Object(s.a)({},H),{},{size:"middle",ref:this.formRef,onFinish:this.handleSubmit,validateMessages:G,children:[Object(N.jsx)(m.a.Item,{name:"date",label:"\u65f6\u95f4",rules:[{required:!0}],children:Object(N.jsx)(O.a,{type:"date",placeholder:"\u65f6\u95f4"})}),Object(N.jsx)(m.a.Item,{name:"payee",label:"\u6536\u6b3e\u4eba",children:Object(N.jsx)(O.a,{placeholder:"\u6536\u6b3e\u4eba"})}),Object(N.jsx)(m.a.Item,{name:"desc",label:"\u63cf\u8ff0",rules:[{required:!0}],children:Object(N.jsx)(O.a,{placeholder:"\u63cf\u8ff0"})}),Object(N.jsx)(m.a.Item,{label:"\u8d26\u76ee\u660e\u7ec6",children:Object(N.jsx)(V,{form:this.formRef,name:"entries",children:function(t,r){var n=r.add,o=r.remove;return Object(N.jsxs)("div",{children:[t.map((function(t){return Object(N.jsxs)(C,{style:{display:"flex",marginBottom:8},align:"start",children:[Object(N.jsx)(m.a.Item,{name:[t.name,"account"],fieldKey:[t.fieldKey,"account"],rules:[{required:!0,message:"\u5fc5\u8f93\u9879"}],children:Object(N.jsx)(b.a,{showSearch:!0,style:{width:240},placeholder:"\u9009\u62e9\u8d26\u6237",optionFilterProp:"children",children:e.state.accounts.map((function(e){return Object(N.jsx)(M,{value:e,children:e})}))})}),Object(N.jsx)(m.a.Item,{name:[t.name,"amount"],fieldKey:[t.fieldKey,"amount"],rules:[{required:!0,message:"\u5fc5\u8f93\u9879"}],children:Object(N.jsx)(O.a,{type:"number",placeholder:"\u91d1\u989d"})}),Object(N.jsx)(p,{onClick:function(){o(t.name)}})]},t.key)})),Object(N.jsx)(m.a.Item,{children:Object(N.jsxs)(I.a,{type:"dashed",onClick:function(){n()},block:!0,children:[Object(N.jsx)(y.a,{})," \u6dfb\u52a0\u8d26\u76ee"]})})]})}})}),Object(N.jsxs)(m.a.Item,{wrapperCol:Object(s.a)(Object(s.a)({},H.wrapperCol),{},{offset:4}),children:[Object(N.jsx)(I.a,{htmlType:"button",disabled:this.state.loading,onClick:this.handleResetForm,children:"\u91cd\u7f6e"}),"\xa0\xa0",Object(N.jsx)(I.a,{type:"primary",htmlType:"submit",loading:this.state.loading,children:"\u63d0\u4ea4"})]})]}))})}}]),r}(l.Component);J.contextType=z.a;t.default=Object(q.a)(J)},57:function(e,t,r){"use strict";var n=r(62),o=r(11),i=r(12),a=r(14),s=r(13),c=r(0),l=r(1);t.a=function(e){return function(t){Object(a.a)(c,t);var r=Object(s.a)(c);function c(){return Object(o.a)(this,c),r.apply(this,arguments)}return Object(i.a)(c,[{key:"render",value:function(){return Object(l.jsx)(e,Object(n.a)({},this.props))}}]),c}(c.Component)}},77:function(e,t,r){r(103),e.exports=self.fetch.bind(self)}}]);