(this["webpackJsonpbeancount-web"]=this["webpackJsonpbeancount-web"]||[]).push([[14],{466:function(e,t,r){"use strict";r.r(t);var n=r(11),a=r(12),c=r(14),o=r(13),i=r(458),s=r(326),l=r(472),d=r(327),h=r(0),u=r.n(h),m=r(15),b=r(80),j=r(1),p={required:"${label} \u4e0d\u80fd\u4e3a\u7a7a\uff01"},f=function(e){Object(c.a)(r,e);var t=Object(o.a)(r);function r(){var e;Object(n.a)(this,r);for(var a=arguments.length,c=new Array(a),o=0;o<a;o++)c[o]=arguments[o];return(e=t.call.apply(t,[this].concat(c))).theme=e.context.theme,e.formRef=u.a.createRef(),e.state={loading:!1},e.handleCreateLedger=function(t){e.setState({loading:!0}),fetch("/api/ledger",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}).then((function(e){return e.json()})).then((function(t){200===t.code?(window.localStorage.setItem("ledgerId",t.data),e.props.history.replace("/")):1010===t.code?i.b.error("\u65e0\u6548\u8d26\u6237"):1006===t.code&&i.b.error("\u5bc6\u7801\u9519\u8bef")})).catch((function(e){i.b.error("\u8bf7\u6c42\u5931\u8d25"),console.error(e)})).finally((function(){e.setState({loading:!1})}))},e}return Object(a.a)(r,[{key:"render",value:function(){return this.context.theme!==this.theme&&(this.theme=this.context.theme),Object(j.jsx)("div",{className:"ledger-page",children:Object(j.jsx)("div",{children:Object(j.jsxs)(s.a,{name:"add-account-form",size:"middle",ref:this.formRef,onFinish:this.handleCreateLedger,validateMessages:p,children:[Object(j.jsx)(s.a.Item,{name:"mail",label:"\u7528\u6237",rules:[{required:!0}],children:Object(j.jsx)(l.a,{placeholder:"\u4f5c\u4e3a\u8d26\u672c\u7684\u552f\u4e00\u6807\u8bc6\uff0c\u4e00\u4e2a\u7528\u6237\u53ea\u5141\u8bb8\u521b\u5efa\u4e00\u4e2a\u8d26\u672c\uff0c\u63a8\u8350\u4f7f\u7528\u90ae\u7bb1"})}),Object(j.jsx)(s.a.Item,{name:"secret",label:"\u5bc6\u7801",rules:[{required:!0}],children:Object(j.jsx)(l.a,{type:"password",placeholder:"\u8d26\u672c\u5bc6\u7801"})}),Object(j.jsx)(s.a.Item,{children:Object(j.jsx)(d.a,{type:"primary",htmlType:"submit",children:"\u521b\u5efa/\u8fdb\u5165\u4e2a\u4eba\u8d26\u672c"})})]})})})}}]),r}(h.Component);f.contextType=m.a,t.default=Object(b.a)(f)},80:function(e,t,r){"use strict";var n=r(62),a=r(11),c=r(12),o=r(14),i=r(13),s=r(0),l=r(1);t.a=function(e){return function(t){Object(o.a)(s,t);var r=Object(i.a)(s);function s(){var e;Object(a.a)(this,s);for(var t=arguments.length,n=new Array(t),c=0;c<t;c++)n[c]=arguments[c];return(e=r.call.apply(r,[this].concat(n))).defaultCommodity={val:"CNY",symbol:"\uffe5"},e.currentCommodity=window.localStorage.getItem("commodity"),e}return Object(c.a)(s,[{key:"render",value:function(){return Object(l.jsx)(e,Object(n.a)(Object(n.a)({},this.props),{},{commodity:this.currentCommodity?JSON.parse(this.currentCommodity):this.defaultCommodity}))}}]),s}(s.Component)}}}]);