(this["webpackJsonpbeancount-web"]=this["webpackJsonpbeancount-web"]||[]).push([[5],{15:function(e,t,n){"use strict";var c=n(0),a=n.n(c).a.createContext({theme:"light",toggleTheme:function(){}});t.a=a},29:function(e,t,n){},30:function(e,t,n){},31:function(e,t,n){},37:function(e,t,n){},38:function(e,t,n){"use strict";n.r(t);var c=n(0),a=n.n(c),r=n(20),o=n.n(r),i=(n(29),n(11)),s=n(12),l=n(14),h=n(13),d=n(7),j=(n(30),n(15)),b="\u6211\u7684\u8d26\u672c",u="https://github.com/BaoXuebin/beancount-node-server",m=(n(31),n(1)),x=function(e){Object(l.a)(n,e);var t=Object(h.a)(n);function n(){return Object(i.a)(this,n),t.apply(this,arguments)}return Object(s.a)(n,[{key:"render",value:function(){var e=this.context.theme;return Object(m.jsx)("div",{className:"".concat(e,"-theme"),children:Object(m.jsxs)("div",{className:"wrapper",children:[Object(m.jsx)("header",{children:Object(m.jsx)("nav",{className:"navbar",children:Object(m.jsxs)("div",{className:"container",children:[Object(m.jsx)("div",{className:"navbar-header header-logo",to:"/",children:Object(m.jsx)(d.b,{to:"/",children:b})}),Object(m.jsxs)("div",{className:"menu navbar-right",children:[Object(m.jsx)(d.b,{to:"/addEntry",children:"\u8bb0\u8d26"}),Object(m.jsx)(d.b,{to:"/account",children:"\u8d26\u6237"}),Object(m.jsx)(d.b,{to:"/stats",children:"\u7edf\u8ba1"}),Object(m.jsx)("a",{href:u,children:Object(m.jsx)("img",{src:"https://img.shields.io/github/stars/BaoXuebin/beancount-node-server?style=social"})})]})]})})}),Object(m.jsx)("div",{className:"main",children:Object(m.jsx)("div",{className:"main-wrap",children:this.props.children})}),Object(m.jsx)("footer",{className:"footer",children:Object(m.jsx)("div",{className:"copyright",children:"\xa9 2021\xa0\xa0"})})]})})}}]),n}(c.Component);x.contextType=j.a;var O=x,p=n(8),g=n.n(p),v=n(2),f=(n(37),function(){return Object(m.jsx)("div",{style:{width:"100%"},className:"lds-rolling",children:Object(m.jsx)("div",{})})}),w=g()({loader:function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(3),n.e(14)]).then(n.bind(null,270))},loading:f}),y=g()({loader:function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(4),n.e(9)]).then(n.bind(null,281))},loading:f}),N=g()({loader:function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(3),n.e(8)]).then(n.bind(null,276))},loading:f}),P=g()({loader:function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(3),n.e(10)]).then(n.bind(null,280))},loading:f}),k=g()({loader:function(){return n.e(13).then(n.bind(null,273))},loading:f}),T=g()({loader:function(){return Promise.all([n.e(0),n.e(1),n.e(4),n.e(12)]).then(n.bind(null,274))},loading:f}),B=g()({loader:function(){return Promise.all([n.e(0),n.e(4),n.e(11)]).then(n.bind(null,275))},loading:f}),C=function(){return Object(m.jsx)(a.a.Fragment,{children:Object(m.jsxs)(v.c,{children:[Object(m.jsx)(v.a,{exact:!0,path:"/",component:y}),Object(m.jsx)(v.a,{exact:!0,path:"/ledger",component:w}),Object(m.jsx)(v.a,{exact:!0,path:"/account",component:N}),Object(m.jsx)(v.a,{exact:!0,path:"/addEntry",component:P}),Object(m.jsx)(v.a,{exact:!0,path:"/about",component:k}),Object(m.jsx)(v.a,{exact:!0,path:"/stats",component:T}),Object(m.jsx)(v.a,{exact:!0,path:"/stats/assets",component:B})]})})},E=function(e){Object(l.a)(n,e);var t=Object(h.a)(n);function n(){var e;Object(i.a)(this,n);for(var c=arguments.length,a=new Array(c),r=0;r<c;r++)a[r]=arguments[r];return(e=t.call.apply(t,[this].concat(a))).state={theme:localStorage.getItem("theme")||"light"},e.toggleTheme=function(t){e.setState({theme:t})},e}return Object(s.a)(n,[{key:"render",value:function(){return Object(m.jsx)("div",{className:"App",children:Object(m.jsx)(j.a.Provider,{value:{theme:this.state.theme,toggleTheme:this.toggleTheme},children:Object(m.jsx)(d.a,{children:Object(m.jsx)(O,{children:Object(m.jsx)(C,{})})})})})}}]),n}(c.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(Object(m.jsx)(a.a.StrictMode,{children:Object(m.jsx)(E,{})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[38,6,7]]]);