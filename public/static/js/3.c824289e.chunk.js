(this["webpackJsonpbeancount-web"]=this["webpackJsonpbeancount-web"]||[]).push([[3],{164:function(n,e,t){var i;!function(r){"use strict";var s,o,u,c=9e15,a=1e9,f="0123456789abcdef",l="2.3025850929940456840179914546843642076011014886287729760333279009675726096773524802359972050895982983419677840422862486334095254650828067566662873690987816894829072083255546808437998948262331985283935053089653777326288461633662222876982198867465436674744042432743651550489343149393914796194044002221051017141748003688084012647080685567743216228355220114804663715659121373450747856947683463616792101806445070648000277502684916746550586856935673420670581136429224554405758925724208241314695689016758940256776311356919292033376587141660230105703089634572075440370847469940168269282808481184289314848524948644871927809676271275775397027668605952496716674183485704422507197965004714951050492214776567636938662976979522110718264549734772662425709429322582798502585509785265383207606726317164309505995087807523710333101197857547331541421808427543863591778117054309827482385045648019095610299291824318237525357709750539565187697510374970888692180205189339507238539205144634197265287286965110862571492198849978748873771345686209167058",d="3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989380952572010654858632789",h={precision:20,rounding:4,modulo:1,toExpNeg:-7,toExpPos:21,minE:-c,maxE:c,crypto:!1},p=!0,g="[DecimalError] ",m=g+"Invalid argument: ",w=g+"Precision limit exceeded",v=g+"crypto unavailable",N="[object Decimal]",b=Math.floor,y=Math.pow,x=/^0b([01]+(\.[01]*)?|\.[01]+)(p[+-]?\d+)?$/i,E=/^0x([0-9a-f]+(\.[0-9a-f]*)?|\.[0-9a-f]+)(p[+-]?\d+)?$/i,O=/^0o([0-7]+(\.[0-7]*)?|\.[0-7]+)(p[+-]?\d+)?$/i,M=/^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,q=1e7,S=l.length-1,j=d.length-1,P={toStringTag:N};function k(n){var e,t,i,r=n.length-1,s="",o=n[0];if(r>0){for(s+=o,e=1;e<r;e++)(t=7-(i=n[e]+"").length)&&(s+=L(t)),s+=i;(t=7-(i=(o=n[e])+"").length)&&(s+=L(t))}else if(0===o)return"0";for(;o%10===0;)o/=10;return s+o}function D(n,e,t){if(n!==~~n||n<e||n>t)throw Error(m+n)}function F(n,e,t,i){var r,s,o,u;for(s=n[0];s>=10;s/=10)--e;return--e<0?(e+=7,r=0):(r=Math.ceil((e+1)/7),e%=7),s=y(10,7-e),u=n[r]%s|0,null==i?e<3?(0==e?u=u/100|0:1==e&&(u=u/10|0),o=t<4&&99999==u||t>3&&49999==u||5e4==u||0==u):o=(t<4&&u+1==s||t>3&&u+1==s/2)&&(n[r+1]/s/100|0)==y(10,e-2)-1||(u==s/2||0==u)&&0==(n[r+1]/s/100|0):e<4?(0==e?u=u/1e3|0:1==e?u=u/100|0:2==e&&(u=u/10|0),o=(i||t<4)&&9999==u||!i&&t>3&&4999==u):o=((i||t<4)&&u+1==s||!i&&t>3&&u+1==s/2)&&(n[r+1]/s/1e3|0)==y(10,e-3)-1,o}function T(n,e,t){for(var i,r,s=[0],o=0,u=n.length;o<u;){for(r=s.length;r--;)s[r]*=e;for(s[0]+=f.indexOf(n.charAt(o++)),i=0;i<s.length;i++)s[i]>t-1&&(void 0===s[i+1]&&(s[i+1]=0),s[i+1]+=s[i]/t|0,s[i]%=t)}return s.reverse()}P.absoluteValue=P.abs=function(){var n=new this.constructor(this);return n.s<0&&(n.s=1),U(n)},P.ceil=function(){return U(new this.constructor(this),this.e+1,2)},P.clampedTo=P.clamp=function(n,e){var t=this,i=t.constructor;if(n=new i(n),e=new i(e),!n.s||!e.s)return new i(NaN);if(n.gt(e))throw Error(m+e);return t.cmp(n)<0?n:t.cmp(e)>0?e:new i(t)},P.comparedTo=P.cmp=function(n){var e,t,i,r,s=this,o=s.d,u=(n=new s.constructor(n)).d,c=s.s,a=n.s;if(!o||!u)return c&&a?c!==a?c:o===u?0:!o^c<0?1:-1:NaN;if(!o[0]||!u[0])return o[0]?c:u[0]?-a:0;if(c!==a)return c;if(s.e!==n.e)return s.e>n.e^c<0?1:-1;for(e=0,t=(i=o.length)<(r=u.length)?i:r;e<t;++e)if(o[e]!==u[e])return o[e]>u[e]^c<0?1:-1;return i===r?0:i>r^c<0?1:-1},P.cosine=P.cos=function(){var n,e,t=this,i=t.constructor;return t.d?t.d[0]?(n=i.precision,e=i.rounding,i.precision=n+Math.max(t.e,t.sd())+7,i.rounding=1,t=function(n,e){var t,i,r;if(e.isZero())return e;(i=e.d.length)<32?r=(1/Q(4,t=Math.ceil(i/3))).toString():(t=16,r="2.3283064365386962890625e-10");n.precision+=t,e=K(n,1,e.times(r),new n(1));for(var s=t;s--;){var o=e.times(e);e=o.times(o).minus(o).times(8).plus(1)}return n.precision-=t,e}(i,X(i,t)),i.precision=n,i.rounding=e,U(2==u||3==u?t.neg():t,n,e,!0)):new i(1):new i(NaN)},P.cubeRoot=P.cbrt=function(){var n,e,t,i,r,s,o,u,c,a,f=this,l=f.constructor;if(!f.isFinite()||f.isZero())return new l(f);for(p=!1,(s=f.s*y(f.s*f,1/3))&&Math.abs(s)!=1/0?i=new l(s.toString()):(t=k(f.d),(s=((n=f.e)-t.length+1)%3)&&(t+=1==s||-2==s?"0":"00"),s=y(t,1/3),n=b((n+1)/3)-(n%3==(n<0?-1:2)),(i=new l(t=s==1/0?"5e"+n:(t=s.toExponential()).slice(0,t.indexOf("e")+1)+n)).s=f.s),o=(n=l.precision)+3;;)if(a=(c=(u=i).times(u).times(u)).plus(f),i=A(a.plus(f).times(u),a.plus(c),o+2,1),k(u.d).slice(0,o)===(t=k(i.d)).slice(0,o)){if("9999"!=(t=t.slice(o-3,o+1))&&(r||"4999"!=t)){+t&&(+t.slice(1)||"5"!=t.charAt(0))||(U(i,n+1,1),e=!i.times(i).times(i).eq(f));break}if(!r&&(U(u,n+1,0),u.times(u).times(u).eq(f))){i=u;break}o+=4,r=1}return p=!0,U(i,n,l.rounding,e)},P.decimalPlaces=P.dp=function(){var n,e=this.d,t=NaN;if(e){if(t=7*((n=e.length-1)-b(this.e/7)),n=e[n])for(;n%10==0;n/=10)t--;t<0&&(t=0)}return t},P.dividedBy=P.div=function(n){return A(this,new this.constructor(n))},P.dividedToIntegerBy=P.divToInt=function(n){var e=this.constructor;return U(A(this,new e(n),0,1,1),e.precision,e.rounding)},P.equals=P.eq=function(n){return 0===this.cmp(n)},P.floor=function(){return U(new this.constructor(this),this.e+1,3)},P.greaterThan=P.gt=function(n){return this.cmp(n)>0},P.greaterThanOrEqualTo=P.gte=function(n){var e=this.cmp(n);return 1==e||0===e},P.hyperbolicCosine=P.cosh=function(){var n,e,t,i,r,s=this,o=s.constructor,u=new o(1);if(!s.isFinite())return new o(s.s?1/0:NaN);if(s.isZero())return u;t=o.precision,i=o.rounding,o.precision=t+Math.max(s.e,s.sd())+4,o.rounding=1,(r=s.d.length)<32?e=(1/Q(4,n=Math.ceil(r/3))).toString():(n=16,e="2.3283064365386962890625e-10"),s=K(o,1,s.times(e),new o(1),!0);for(var c,a=n,f=new o(8);a--;)c=s.times(s),s=u.minus(c.times(f.minus(c.times(f))));return U(s,o.precision=t,o.rounding=i,!0)},P.hyperbolicSine=P.sinh=function(){var n,e,t,i,r=this,s=r.constructor;if(!r.isFinite()||r.isZero())return new s(r);if(e=s.precision,t=s.rounding,s.precision=e+Math.max(r.e,r.sd())+4,s.rounding=1,(i=r.d.length)<3)r=K(s,2,r,r,!0);else{n=(n=1.4*Math.sqrt(i))>16?16:0|n,r=K(s,2,r=r.times(1/Q(5,n)),r,!0);for(var o,u=new s(5),c=new s(16),a=new s(20);n--;)o=r.times(r),r=r.times(u.plus(o.times(c.times(o).plus(a))))}return s.precision=e,s.rounding=t,U(r,e,t,!0)},P.hyperbolicTangent=P.tanh=function(){var n,e,t=this,i=t.constructor;return t.isFinite()?t.isZero()?new i(t):(n=i.precision,e=i.rounding,i.precision=n+7,i.rounding=1,A(t.sinh(),t.cosh(),i.precision=n,i.rounding=e)):new i(t.s)},P.inverseCosine=P.acos=function(){var n,e=this,t=e.constructor,i=e.abs().cmp(1),r=t.precision,s=t.rounding;return-1!==i?0===i?e.isNeg()?_(t,r,s):new t(0):new t(NaN):e.isZero()?_(t,r+4,s).times(.5):(t.precision=r+6,t.rounding=1,e=e.asin(),n=_(t,r+4,s).times(.5),t.precision=r,t.rounding=s,n.minus(e))},P.inverseHyperbolicCosine=P.acosh=function(){var n,e,t=this,i=t.constructor;return t.lte(1)?new i(t.eq(1)?0:NaN):t.isFinite()?(n=i.precision,e=i.rounding,i.precision=n+Math.max(Math.abs(t.e),t.sd())+4,i.rounding=1,p=!1,t=t.times(t).minus(1).sqrt().plus(t),p=!0,i.precision=n,i.rounding=e,t.ln()):new i(t)},P.inverseHyperbolicSine=P.asinh=function(){var n,e,t=this,i=t.constructor;return!t.isFinite()||t.isZero()?new i(t):(n=i.precision,e=i.rounding,i.precision=n+2*Math.max(Math.abs(t.e),t.sd())+6,i.rounding=1,p=!1,t=t.times(t).plus(1).sqrt().plus(t),p=!0,i.precision=n,i.rounding=e,t.ln())},P.inverseHyperbolicTangent=P.atanh=function(){var n,e,t,i,r=this,s=r.constructor;return r.isFinite()?r.e>=0?new s(r.abs().eq(1)?r.s/0:r.isZero()?r:NaN):(n=s.precision,e=s.rounding,i=r.sd(),Math.max(i,n)<2*-r.e-1?U(new s(r),n,e,!0):(s.precision=t=i-r.e,r=A(r.plus(1),new s(1).minus(r),t+n,1),s.precision=n+4,s.rounding=1,r=r.ln(),s.precision=n,s.rounding=e,r.times(.5))):new s(NaN)},P.inverseSine=P.asin=function(){var n,e,t,i,r=this,s=r.constructor;return r.isZero()?new s(r):(e=r.abs().cmp(1),t=s.precision,i=s.rounding,-1!==e?0===e?((n=_(s,t+4,i).times(.5)).s=r.s,n):new s(NaN):(s.precision=t+6,s.rounding=1,r=r.div(new s(1).minus(r.times(r)).sqrt().plus(1)).atan(),s.precision=t,s.rounding=i,r.times(2)))},P.inverseTangent=P.atan=function(){var n,e,t,i,r,s,o,u,c,a=this,f=a.constructor,l=f.precision,d=f.rounding;if(a.isFinite()){if(a.isZero())return new f(a);if(a.abs().eq(1)&&l+4<=j)return(o=_(f,l+4,d).times(.25)).s=a.s,o}else{if(!a.s)return new f(NaN);if(l+4<=j)return(o=_(f,l+4,d).times(.5)).s=a.s,o}for(f.precision=u=l+10,f.rounding=1,n=t=Math.min(28,u/7+2|0);n;--n)a=a.div(a.times(a).plus(1).sqrt().plus(1));for(p=!1,e=Math.ceil(u/7),i=1,c=a.times(a),o=new f(a),r=a;-1!==n;)if(r=r.times(c),s=o.minus(r.div(i+=2)),r=r.times(c),void 0!==(o=s.plus(r.div(i+=2))).d[e])for(n=e;o.d[n]===s.d[n]&&n--;);return t&&(o=o.times(2<<t-1)),p=!0,U(o,f.precision=l,f.rounding=d,!0)},P.isFinite=function(){return!!this.d},P.isInteger=P.isInt=function(){return!!this.d&&b(this.e/7)>this.d.length-2},P.isNaN=function(){return!this.s},P.isNegative=P.isNeg=function(){return this.s<0},P.isPositive=P.isPos=function(){return this.s>0},P.isZero=function(){return!!this.d&&0===this.d[0]},P.lessThan=P.lt=function(n){return this.cmp(n)<0},P.lessThanOrEqualTo=P.lte=function(n){return this.cmp(n)<1},P.logarithm=P.log=function(n){var e,t,i,r,s,o,u,c,a=this,f=a.constructor,l=f.precision,d=f.rounding;if(null==n)n=new f(10),e=!0;else{if(t=(n=new f(n)).d,n.s<0||!t||!t[0]||n.eq(1))return new f(NaN);e=n.eq(10)}if(t=a.d,a.s<0||!t||!t[0]||a.eq(1))return new f(t&&!t[0]?-1/0:1!=a.s?NaN:t?0:1/0);if(e)if(t.length>1)s=!0;else{for(r=t[0];r%10===0;)r/=10;s=1!==r}if(p=!1,o=z(a,u=l+5),i=e?C(f,u+10):z(n,u),F((c=A(o,i,u,1)).d,r=l,d))do{if(o=z(a,u+=10),i=e?C(f,u+10):z(n,u),c=A(o,i,u,1),!s){+k(c.d).slice(r+1,r+15)+1==1e14&&(c=U(c,l+1,0));break}}while(F(c.d,r+=10,d));return p=!0,U(c,l,d)},P.minus=P.sub=function(n){var e,t,i,r,s,o,u,c,a,f,l,d,h=this,g=h.constructor;if(n=new g(n),!h.d||!n.d)return h.s&&n.s?h.d?n.s=-n.s:n=new g(n.d||h.s!==n.s?h:NaN):n=new g(NaN),n;if(h.s!=n.s)return n.s=-n.s,h.plus(n);if(a=h.d,d=n.d,u=g.precision,c=g.rounding,!a[0]||!d[0]){if(d[0])n.s=-n.s;else{if(!a[0])return new g(3===c?-0:0);n=new g(h)}return p?U(n,u,c):n}if(t=b(n.e/7),f=b(h.e/7),a=a.slice(),s=f-t){for((l=s<0)?(e=a,s=-s,o=d.length):(e=d,t=f,o=a.length),s>(i=Math.max(Math.ceil(u/7),o)+2)&&(s=i,e.length=1),e.reverse(),i=s;i--;)e.push(0);e.reverse()}else{for((l=(i=a.length)<(o=d.length))&&(o=i),i=0;i<o;i++)if(a[i]!=d[i]){l=a[i]<d[i];break}s=0}for(l&&(e=a,a=d,d=e,n.s=-n.s),o=a.length,i=d.length-o;i>0;--i)a[o++]=0;for(i=d.length;i>s;){if(a[--i]<d[i]){for(r=i;r&&0===a[--r];)a[r]=q-1;--a[r],a[i]+=q}a[i]-=d[i]}for(;0===a[--o];)a.pop();for(;0===a[0];a.shift())--t;return a[0]?(n.d=a,n.e=R(a,t),p?U(n,u,c):n):new g(3===c?-0:0)},P.modulo=P.mod=function(n){var e,t=this,i=t.constructor;return n=new i(n),!t.d||!n.s||n.d&&!n.d[0]?new i(NaN):!n.d||t.d&&!t.d[0]?U(new i(t),i.precision,i.rounding):(p=!1,9==i.modulo?(e=A(t,n.abs(),0,3,1)).s*=n.s:e=A(t,n,0,i.modulo,1),e=e.times(n),p=!0,t.minus(e))},P.naturalExponential=P.exp=function(){return V(this)},P.naturalLogarithm=P.ln=function(){return z(this)},P.negated=P.neg=function(){var n=new this.constructor(this);return n.s=-n.s,U(n)},P.plus=P.add=function(n){var e,t,i,r,s,o,u,c,a,f,l=this,d=l.constructor;if(n=new d(n),!l.d||!n.d)return l.s&&n.s?l.d||(n=new d(n.d||l.s===n.s?l:NaN)):n=new d(NaN),n;if(l.s!=n.s)return n.s=-n.s,l.minus(n);if(a=l.d,f=n.d,u=d.precision,c=d.rounding,!a[0]||!f[0])return f[0]||(n=new d(l)),p?U(n,u,c):n;if(s=b(l.e/7),i=b(n.e/7),a=a.slice(),r=s-i){for(r<0?(t=a,r=-r,o=f.length):(t=f,i=s,o=a.length),r>(o=(s=Math.ceil(u/7))>o?s+1:o+1)&&(r=o,t.length=1),t.reverse();r--;)t.push(0);t.reverse()}for((o=a.length)-(r=f.length)<0&&(r=o,t=f,f=a,a=t),e=0;r;)e=(a[--r]=a[r]+f[r]+e)/q|0,a[r]%=q;for(e&&(a.unshift(e),++i),o=a.length;0==a[--o];)a.pop();return n.d=a,n.e=R(a,i),p?U(n,u,c):n},P.precision=P.sd=function(n){var e,t=this;if(void 0!==n&&n!==!!n&&1!==n&&0!==n)throw Error(m+n);return t.d?(e=I(t.d),n&&t.e+1>e&&(e=t.e+1)):e=NaN,e},P.round=function(){var n=this,e=n.constructor;return U(new e(n),n.e+1,e.rounding)},P.sine=P.sin=function(){var n,e,t=this,i=t.constructor;return t.isFinite()?t.isZero()?new i(t):(n=i.precision,e=i.rounding,i.precision=n+Math.max(t.e,t.sd())+7,i.rounding=1,t=function(n,e){var t,i=e.d.length;if(i<3)return e.isZero()?e:K(n,2,e,e);t=(t=1.4*Math.sqrt(i))>16?16:0|t,e=e.times(1/Q(5,t)),e=K(n,2,e,e);for(var r,s=new n(5),o=new n(16),u=new n(20);t--;)r=e.times(e),e=e.times(s.plus(r.times(o.times(r).minus(u))));return e}(i,X(i,t)),i.precision=n,i.rounding=e,U(u>2?t.neg():t,n,e,!0)):new i(NaN)},P.squareRoot=P.sqrt=function(){var n,e,t,i,r,s,o=this,u=o.d,c=o.e,a=o.s,f=o.constructor;if(1!==a||!u||!u[0])return new f(!a||a<0&&(!u||u[0])?NaN:u?o:1/0);for(p=!1,0==(a=Math.sqrt(+o))||a==1/0?(((e=k(u)).length+c)%2==0&&(e+="0"),a=Math.sqrt(e),c=b((c+1)/2)-(c<0||c%2),i=new f(e=a==1/0?"5e"+c:(e=a.toExponential()).slice(0,e.indexOf("e")+1)+c)):i=new f(a.toString()),t=(c=f.precision)+3;;)if(i=(s=i).plus(A(o,s,t+2,1)).times(.5),k(s.d).slice(0,t)===(e=k(i.d)).slice(0,t)){if("9999"!=(e=e.slice(t-3,t+1))&&(r||"4999"!=e)){+e&&(+e.slice(1)||"5"!=e.charAt(0))||(U(i,c+1,1),n=!i.times(i).eq(o));break}if(!r&&(U(s,c+1,0),s.times(s).eq(o))){i=s;break}t+=4,r=1}return p=!0,U(i,c,f.rounding,n)},P.tangent=P.tan=function(){var n,e,t=this,i=t.constructor;return t.isFinite()?t.isZero()?new i(t):(n=i.precision,e=i.rounding,i.precision=n+10,i.rounding=1,(t=t.sin()).s=1,t=A(t,new i(1).minus(t.times(t)).sqrt(),n+10,0),i.precision=n,i.rounding=e,U(2==u||4==u?t.neg():t,n,e,!0)):new i(NaN)},P.times=P.mul=function(n){var e,t,i,r,s,o,u,c,a,f=this,l=f.constructor,d=f.d,h=(n=new l(n)).d;if(n.s*=f.s,!d||!d[0]||!h||!h[0])return new l(!n.s||d&&!d[0]&&!h||h&&!h[0]&&!d?NaN:d&&h?0*n.s:n.s/0);for(t=b(f.e/7)+b(n.e/7),(c=d.length)<(a=h.length)&&(s=d,d=h,h=s,o=c,c=a,a=o),s=[],i=o=c+a;i--;)s.push(0);for(i=a;--i>=0;){for(e=0,r=c+i;r>i;)u=s[r]+h[i]*d[r-i-1]+e,s[r--]=u%q|0,e=u/q|0;s[r]=(s[r]+e)%q|0}for(;!s[--o];)s.pop();return e?++t:s.shift(),n.d=s,n.e=R(s,t),p?U(n,l.precision,l.rounding):n},P.toBinary=function(n,e){return Y(this,2,n,e)},P.toDecimalPlaces=P.toDP=function(n,e){var t=this,i=t.constructor;return t=new i(t),void 0===n?t:(D(n,0,a),void 0===e?e=i.rounding:D(e,0,8),U(t,n+t.e+1,e))},P.toExponential=function(n,e){var t,i=this,r=i.constructor;return void 0===n?t=Z(i,!0):(D(n,0,a),void 0===e?e=r.rounding:D(e,0,8),t=Z(i=U(new r(i),n+1,e),!0,n+1)),i.isNeg()&&!i.isZero()?"-"+t:t},P.toFixed=function(n,e){var t,i,r=this,s=r.constructor;return void 0===n?t=Z(r):(D(n,0,a),void 0===e?e=s.rounding:D(e,0,8),t=Z(i=U(new s(r),n+r.e+1,e),!1,n+i.e+1)),r.isNeg()&&!r.isZero()?"-"+t:t},P.toFraction=function(n){var e,t,i,r,s,o,u,c,a,f,l,d,h=this,g=h.d,w=h.constructor;if(!g)return new w(h);if(a=t=new w(1),i=c=new w(0),o=(s=(e=new w(i)).e=I(g)-h.e-1)%7,e.d[0]=y(10,o<0?7+o:o),null==n)n=s>0?e:a;else{if(!(u=new w(n)).isInt()||u.lt(a))throw Error(m+u);n=u.gt(e)?s>0?e:a:u}for(p=!1,u=new w(k(g)),f=w.precision,w.precision=s=7*g.length*2;l=A(u,e,0,1,1),1!=(r=t.plus(l.times(i))).cmp(n);)t=i,i=r,r=a,a=c.plus(l.times(r)),c=r,r=e,e=u.minus(l.times(r)),u=r;return r=A(n.minus(t),i,0,1,1),c=c.plus(r.times(a)),t=t.plus(r.times(i)),c.s=a.s=h.s,d=A(a,i,s,1).minus(h).abs().cmp(A(c,t,s,1).minus(h).abs())<1?[a,i]:[c,t],w.precision=f,p=!0,d},P.toHexadecimal=P.toHex=function(n,e){return Y(this,16,n,e)},P.toNearest=function(n,e){var t=this,i=t.constructor;if(t=new i(t),null==n){if(!t.d)return t;n=new i(1),e=i.rounding}else{if(n=new i(n),void 0===e?e=i.rounding:D(e,0,8),!t.d)return n.s?t:n;if(!n.d)return n.s&&(n.s=t.s),n}return n.d[0]?(p=!1,t=A(t,n,0,e,1).times(n),p=!0,U(t)):(n.s=t.s,t=n),t},P.toNumber=function(){return+this},P.toOctal=function(n,e){return Y(this,8,n,e)},P.toPower=P.pow=function(n){var e,t,i,r,s,o,u=this,c=u.constructor,a=+(n=new c(n));if(!u.d||!n.d||!u.d[0]||!n.d[0])return new c(y(+u,a));if((u=new c(u)).eq(1))return u;if(i=c.precision,s=c.rounding,n.eq(1))return U(u,i,s);if((e=b(n.e/7))>=n.d.length-1&&(t=a<0?-a:a)<=9007199254740991)return r=H(c,u,t,i),n.s<0?new c(1).div(r):U(r,i,s);if((o=u.s)<0){if(e<n.d.length-1)return new c(NaN);if(0==(1&n.d[e])&&(o=1),0==u.e&&1==u.d[0]&&1==u.d.length)return u.s=o,u}return(e=0!=(t=y(+u,a))&&isFinite(t)?new c(t+"").e:b(a*(Math.log("0."+k(u.d))/Math.LN10+u.e+1)))>c.maxE+1||e<c.minE-1?new c(e>0?o/0:0):(p=!1,c.rounding=u.s=1,t=Math.min(12,(e+"").length),(r=V(n.times(z(u,i+t)),i)).d&&F((r=U(r,i+5,1)).d,i,s)&&(e=i+10,+k((r=U(V(n.times(z(u,e+t)),e),e+5,1)).d).slice(i+1,i+15)+1==1e14&&(r=U(r,i+1,0))),r.s=o,p=!0,c.rounding=s,U(r,i,s))},P.toPrecision=function(n,e){var t,i=this,r=i.constructor;return void 0===n?t=Z(i,i.e<=r.toExpNeg||i.e>=r.toExpPos):(D(n,1,a),void 0===e?e=r.rounding:D(e,0,8),t=Z(i=U(new r(i),n,e),n<=i.e||i.e<=r.toExpNeg,n)),i.isNeg()&&!i.isZero()?"-"+t:t},P.toSignificantDigits=P.toSD=function(n,e){var t=this.constructor;return void 0===n?(n=t.precision,e=t.rounding):(D(n,1,a),void 0===e?e=t.rounding:D(e,0,8)),U(new t(this),n,e)},P.toString=function(){var n=this,e=n.constructor,t=Z(n,n.e<=e.toExpNeg||n.e>=e.toExpPos);return n.isNeg()&&!n.isZero()?"-"+t:t},P.truncated=P.trunc=function(){return U(new this.constructor(this),this.e+1,1)},P.valueOf=P.toJSON=function(){var n=this,e=n.constructor,t=Z(n,n.e<=e.toExpNeg||n.e>=e.toExpPos);return n.isNeg()?"-"+t:t};var A=function(){function n(n,e,t){var i,r=0,s=n.length;for(n=n.slice();s--;)i=n[s]*e+r,n[s]=i%t|0,r=i/t|0;return r&&n.unshift(r),n}function e(n,e,t,i){var r,s;if(t!=i)s=t>i?1:-1;else for(r=s=0;r<t;r++)if(n[r]!=e[r]){s=n[r]>e[r]?1:-1;break}return s}function t(n,e,t,i){for(var r=0;t--;)n[t]-=r,r=n[t]<e[t]?1:0,n[t]=r*i+n[t]-e[t];for(;!n[0]&&n.length>1;)n.shift()}return function(i,r,s,u,c,a){var f,l,d,h,p,g,m,w,v,N,y,x,E,O,M,S,j,P,k,D,F=i.constructor,T=i.s==r.s?1:-1,A=i.d,Z=r.d;if(!A||!A[0]||!Z||!Z[0])return new F(i.s&&r.s&&(A?!Z||A[0]!=Z[0]:Z)?A&&0==A[0]||!Z?0*T:T/0:NaN);for(a?(p=1,l=i.e-r.e):(a=q,p=7,l=b(i.e/p)-b(r.e/p)),k=Z.length,j=A.length,N=(v=new F(T)).d=[],d=0;Z[d]==(A[d]||0);d++);if(Z[d]>(A[d]||0)&&l--,null==s?(O=s=F.precision,u=F.rounding):O=c?s+(i.e-r.e)+1:s,O<0)N.push(1),g=!0;else{if(O=O/p+2|0,d=0,1==k){for(h=0,Z=Z[0],O++;(d<j||h)&&O--;d++)M=h*a+(A[d]||0),N[d]=M/Z|0,h=M%Z|0;g=h||d<j}else{for((h=a/(Z[0]+1)|0)>1&&(Z=n(Z,h,a),A=n(A,h,a),k=Z.length,j=A.length),S=k,x=(y=A.slice(0,k)).length;x<k;)y[x++]=0;(D=Z.slice()).unshift(0),P=Z[0],Z[1]>=a/2&&++P;do{h=0,(f=e(Z,y,k,x))<0?(E=y[0],k!=x&&(E=E*a+(y[1]||0)),(h=E/P|0)>1?(h>=a&&(h=a-1),1==(f=e(m=n(Z,h,a),y,w=m.length,x=y.length))&&(h--,t(m,k<w?D:Z,w,a))):(0==h&&(f=h=1),m=Z.slice()),(w=m.length)<x&&m.unshift(0),t(y,m,x,a),-1==f&&(f=e(Z,y,k,x=y.length))<1&&(h++,t(y,k<x?D:Z,x,a)),x=y.length):0===f&&(h++,y=[0]),N[d++]=h,f&&y[0]?y[x++]=A[S]||0:(y=[A[S]],x=1)}while((S++<j||void 0!==y[0])&&O--);g=void 0!==y[0]}N[0]||N.shift()}if(1==p)v.e=l,o=g;else{for(d=1,h=N[0];h>=10;h/=10)d++;v.e=d+l*p-1,U(v,c?s+v.e+1:s,u,g)}return v}}();function U(n,e,t,i){var r,s,o,u,c,a,f,l,d,h=n.constructor;n:if(null!=e){if(!(l=n.d))return n;for(r=1,u=l[0];u>=10;u/=10)r++;if((s=e-r)<0)s+=7,o=e,c=(f=l[d=0])/y(10,r-o-1)%10|0;else if((d=Math.ceil((s+1)/7))>=(u=l.length)){if(!i)break n;for(;u++<=d;)l.push(0);f=c=0,r=1,o=(s%=7)-7+1}else{for(f=u=l[d],r=1;u>=10;u/=10)r++;c=(o=(s%=7)-7+r)<0?0:f/y(10,r-o-1)%10|0}if(i=i||e<0||void 0!==l[d+1]||(o<0?f:f%y(10,r-o-1)),a=t<4?(c||i)&&(0==t||t==(n.s<0?3:2)):c>5||5==c&&(4==t||i||6==t&&(s>0?o>0?f/y(10,r-o):0:l[d-1])%10&1||t==(n.s<0?8:7)),e<1||!l[0])return l.length=0,a?(e-=n.e+1,l[0]=y(10,(7-e%7)%7),n.e=-e||0):l[0]=n.e=0,n;if(0==s?(l.length=d,u=1,d--):(l.length=d+1,u=y(10,7-s),l[d]=o>0?(f/y(10,r-o)%y(10,o)|0)*u:0),a)for(;;){if(0==d){for(s=1,o=l[0];o>=10;o/=10)s++;for(o=l[0]+=u,u=1;o>=10;o/=10)u++;s!=u&&(n.e++,l[0]==q&&(l[0]=1));break}if(l[d]+=u,l[d]!=q)break;l[d--]=0,u=1}for(s=l.length;0===l[--s];)l.pop()}return p&&(n.e>h.maxE?(n.d=null,n.e=NaN):n.e<h.minE&&(n.e=0,n.d=[0])),n}function Z(n,e,t){if(!n.isFinite())return W(n);var i,r=n.e,s=k(n.d),o=s.length;return e?(t&&(i=t-o)>0?s=s.charAt(0)+"."+s.slice(1)+L(i):o>1&&(s=s.charAt(0)+"."+s.slice(1)),s=s+(n.e<0?"e":"e+")+n.e):r<0?(s="0."+L(-r-1)+s,t&&(i=t-o)>0&&(s+=L(i))):r>=o?(s+=L(r+1-o),t&&(i=t-r-1)>0&&(s=s+"."+L(i))):((i=r+1)<o&&(s=s.slice(0,i)+"."+s.slice(i)),t&&(i=t-o)>0&&(r+1===o&&(s+="."),s+=L(i))),s}function R(n,e){var t=n[0];for(e*=7;t>=10;t/=10)e++;return e}function C(n,e,t){if(e>S)throw p=!0,t&&(n.precision=t),Error(w);return U(new n(l),e,1,!0)}function _(n,e,t){if(e>j)throw Error(w);return U(new n(d),e,t,!0)}function I(n){var e=n.length-1,t=7*e+1;if(e=n[e]){for(;e%10==0;e/=10)t--;for(e=n[0];e>=10;e/=10)t++}return t}function L(n){for(var e="";n--;)e+="0";return e}function H(n,e,t,i){var r,s=new n(1),o=Math.ceil(i/7+4);for(p=!1;;){if(t%2&&nn((s=s.times(e)).d,o)&&(r=!0),0===(t=b(t/2))){t=s.d.length-1,r&&0===s.d[t]&&++s.d[t];break}nn((e=e.times(e)).d,o)}return p=!0,s}function B(n){return 1&n.d[n.d.length-1]}function $(n,e,t){for(var i,r=new n(e[0]),s=0;++s<e.length;){if(!(i=new n(e[s])).s){r=i;break}r[t](i)&&(r=i)}return r}function V(n,e){var t,i,r,s,o,u,c,a=0,f=0,l=0,d=n.constructor,h=d.rounding,g=d.precision;if(!n.d||!n.d[0]||n.e>17)return new d(n.d?n.d[0]?n.s<0?0:1/0:1:n.s?n.s<0?0:n:NaN);for(null==e?(p=!1,c=g):c=e,u=new d(.03125);n.e>-2;)n=n.times(u),l+=5;for(c+=i=Math.log(y(2,l))/Math.LN10*2+5|0,t=s=o=new d(1),d.precision=c;;){if(s=U(s.times(n),c,1),t=t.times(++f),k((u=o.plus(A(s,t,c,1))).d).slice(0,c)===k(o.d).slice(0,c)){for(r=l;r--;)o=U(o.times(o),c,1);if(null!=e)return d.precision=g,o;if(!(a<3&&F(o.d,c-i,h,a)))return U(o,d.precision=g,h,p=!0);d.precision=c+=10,t=s=u=new d(1),f=0,a++}o=u}}function z(n,e){var t,i,r,s,o,u,c,a,f,l,d,h=1,g=n,m=g.d,w=g.constructor,v=w.rounding,N=w.precision;if(g.s<0||!m||!m[0]||!g.e&&1==m[0]&&1==m.length)return new w(m&&!m[0]?-1/0:1!=g.s?NaN:m?0:g);if(null==e?(p=!1,f=N):f=e,w.precision=f+=10,i=(t=k(m)).charAt(0),!(Math.abs(s=g.e)<15e14))return a=C(w,f+2,N).times(s+""),g=z(new w(i+"."+t.slice(1)),f-10).plus(a),w.precision=N,null==e?U(g,N,v,p=!0):g;for(;i<7&&1!=i||1==i&&t.charAt(1)>3;)i=(t=k((g=g.times(n)).d)).charAt(0),h++;for(s=g.e,i>1?(g=new w("0."+t),s++):g=new w(i+"."+t.slice(1)),l=g,c=o=g=A(g.minus(1),g.plus(1),f,1),d=U(g.times(g),f,1),r=3;;){if(o=U(o.times(d),f,1),k((a=c.plus(A(o,new w(r),f,1))).d).slice(0,f)===k(c.d).slice(0,f)){if(c=c.times(2),0!==s&&(c=c.plus(C(w,f+2,N).times(s+""))),c=A(c,new w(h),f,1),null!=e)return w.precision=N,c;if(!F(c.d,f-10,v,u))return U(c,w.precision=N,v,p=!0);w.precision=f+=10,a=o=g=A(l.minus(1),l.plus(1),f,1),d=U(g.times(g),f,1),r=u=1}c=a,r+=2}}function W(n){return String(n.s*n.s/0)}function J(n,e){var t,i,r;for((t=e.indexOf("."))>-1&&(e=e.replace(".","")),(i=e.search(/e/i))>0?(t<0&&(t=i),t+=+e.slice(i+1),e=e.substring(0,i)):t<0&&(t=e.length),i=0;48===e.charCodeAt(i);i++);for(r=e.length;48===e.charCodeAt(r-1);--r);if(e=e.slice(i,r)){if(r-=i,n.e=t=t-i-1,n.d=[],i=(t+1)%7,t<0&&(i+=7),i<r){for(i&&n.d.push(+e.slice(0,i)),r-=7;i<r;)n.d.push(+e.slice(i,i+=7));i=7-(e=e.slice(i)).length}else i-=r;for(;i--;)e+="0";n.d.push(+e),p&&(n.e>n.constructor.maxE?(n.d=null,n.e=NaN):n.e<n.constructor.minE&&(n.e=0,n.d=[0]))}else n.e=0,n.d=[0];return n}function G(n,e){var t,i,r,o,u,c,a,f,l;if(e.indexOf("_")>-1){if(e=e.replace(/(\d)_(?=\d)/g,"$1"),M.test(e))return J(n,e)}else if("Infinity"===e||"NaN"===e)return+e||(n.s=NaN),n.e=NaN,n.d=null,n;if(E.test(e))t=16,e=e.toLowerCase();else if(x.test(e))t=2;else{if(!O.test(e))throw Error(m+e);t=8}for((o=e.search(/p/i))>0?(a=+e.slice(o+1),e=e.substring(2,o)):e=e.slice(2),u=(o=e.indexOf("."))>=0,i=n.constructor,u&&(o=(c=(e=e.replace(".","")).length)-o,r=H(i,new i(t),o,2*o)),o=l=(f=T(e,t,q)).length-1;0===f[o];--o)f.pop();return o<0?new i(0*n.s):(n.e=R(f,l),n.d=f,p=!1,u&&(n=A(n,r,4*c)),a&&(n=n.times(Math.abs(a)<54?y(2,a):s.pow(2,a))),p=!0,n)}function K(n,e,t,i,r){var s,o,u,c,a=n.precision,f=Math.ceil(a/7);for(p=!1,c=t.times(t),u=new n(i);;){if(o=A(u.times(c),new n(e++*e++),a,1),u=r?i.plus(o):i.minus(o),i=A(o.times(c),new n(e++*e++),a,1),void 0!==(o=u.plus(i)).d[f]){for(s=f;o.d[s]===u.d[s]&&s--;);if(-1==s)break}s=u,u=i,i=o,o=s}return p=!0,o.d.length=f+1,o}function Q(n,e){for(var t=n;--e;)t*=n;return t}function X(n,e){var t,i=e.s<0,r=_(n,n.precision,1),s=r.times(.5);if((e=e.abs()).lte(s))return u=i?4:1,e;if((t=e.divToInt(r)).isZero())u=i?3:2;else{if((e=e.minus(t.times(r))).lte(s))return u=B(t)?i?2:3:i?4:1,e;u=B(t)?i?1:4:i?3:2}return e.minus(r).abs()}function Y(n,e,t,i){var r,s,u,c,l,d,h,p,g,m=n.constructor,w=void 0!==t;if(w?(D(t,1,a),void 0===i?i=m.rounding:D(i,0,8)):(t=m.precision,i=m.rounding),n.isFinite()){for(w?(r=2,16==e?t=4*t-3:8==e&&(t=3*t-2)):r=e,(u=(h=Z(n)).indexOf("."))>=0&&(h=h.replace(".",""),(g=new m(1)).e=h.length-u,g.d=T(Z(g),10,r),g.e=g.d.length),s=l=(p=T(h,10,r)).length;0==p[--l];)p.pop();if(p[0]){if(u<0?s--:((n=new m(n)).d=p,n.e=s,p=(n=A(n,g,t,i,0,r)).d,s=n.e,d=o),u=p[t],c=r/2,d=d||void 0!==p[t+1],d=i<4?(void 0!==u||d)&&(0===i||i===(n.s<0?3:2)):u>c||u===c&&(4===i||d||6===i&&1&p[t-1]||i===(n.s<0?8:7)),p.length=t,d)for(;++p[--t]>r-1;)p[t]=0,t||(++s,p.unshift(1));for(l=p.length;!p[l-1];--l);for(u=0,h="";u<l;u++)h+=f.charAt(p[u]);if(w){if(l>1)if(16==e||8==e){for(u=16==e?4:3,--l;l%u;l++)h+="0";for(l=(p=T(h,r,e)).length;!p[l-1];--l);for(u=1,h="1.";u<l;u++)h+=f.charAt(p[u])}else h=h.charAt(0)+"."+h.slice(1);h=h+(s<0?"p":"p+")+s}else if(s<0){for(;++s;)h="0"+h;h="0."+h}else if(++s>l)for(s-=l;s--;)h+="0";else s<l&&(h=h.slice(0,s)+"."+h.slice(s))}else h=w?"0p+0":"0";h=(16==e?"0x":2==e?"0b":8==e?"0o":"")+h}else h=W(n);return n.s<0?"-"+h:h}function nn(n,e){if(n.length>e)return n.length=e,!0}function en(n){return new this(n).abs()}function tn(n){return new this(n).acos()}function rn(n){return new this(n).acosh()}function sn(n,e){return new this(n).plus(e)}function on(n){return new this(n).asin()}function un(n){return new this(n).asinh()}function cn(n){return new this(n).atan()}function an(n){return new this(n).atanh()}function fn(n,e){n=new this(n),e=new this(e);var t,i=this.precision,r=this.rounding,s=i+4;return n.s&&e.s?n.d||e.d?!e.d||n.isZero()?(t=e.s<0?_(this,i,r):new this(0)).s=n.s:!n.d||e.isZero()?(t=_(this,s,1).times(.5)).s=n.s:e.s<0?(this.precision=s,this.rounding=1,t=this.atan(A(n,e,s,1)),e=_(this,s,1),this.precision=i,this.rounding=r,t=n.s<0?t.minus(e):t.plus(e)):t=this.atan(A(n,e,s,1)):(t=_(this,s,1).times(e.s>0?.25:.75)).s=n.s:t=new this(NaN),t}function ln(n){return new this(n).cbrt()}function dn(n){return U(n=new this(n),n.e+1,2)}function hn(n,e,t){return new this(n).clamp(e,t)}function pn(n){if(!n||"object"!==typeof n)throw Error(g+"Object expected");var e,t,i,r=!0===n.defaults,s=["precision",1,a,"rounding",0,8,"toExpNeg",-c,0,"toExpPos",0,c,"maxE",0,c,"minE",-c,0,"modulo",0,9];for(e=0;e<s.length;e+=3)if(t=s[e],r&&(this[t]=h[t]),void 0!==(i=n[t])){if(!(b(i)===i&&i>=s[e+1]&&i<=s[e+2]))throw Error(m+t+": "+i);this[t]=i}if(t="crypto",r&&(this[t]=h[t]),void 0!==(i=n[t])){if(!0!==i&&!1!==i&&0!==i&&1!==i)throw Error(m+t+": "+i);if(i){if("undefined"==typeof crypto||!crypto||!crypto.getRandomValues&&!crypto.randomBytes)throw Error(v);this[t]=!0}else this[t]=!1}return this}function gn(n){return new this(n).cos()}function mn(n){return new this(n).cosh()}function wn(n,e){return new this(n).div(e)}function vn(n){return new this(n).exp()}function Nn(n){return U(n=new this(n),n.e+1,3)}function bn(){var n,e,t=new this(0);for(p=!1,n=0;n<arguments.length;)if((e=new this(arguments[n++])).d)t.d&&(t=t.plus(e.times(e)));else{if(e.s)return p=!0,new this(1/0);t=e}return p=!0,t.sqrt()}function yn(n){return n instanceof s||n&&n.toStringTag===N||!1}function xn(n){return new this(n).ln()}function En(n,e){return new this(n).log(e)}function On(n){return new this(n).log(2)}function Mn(n){return new this(n).log(10)}function qn(){return $(this,arguments,"lt")}function Sn(){return $(this,arguments,"gt")}function jn(n,e){return new this(n).mod(e)}function Pn(n,e){return new this(n).mul(e)}function kn(n,e){return new this(n).pow(e)}function Dn(n){var e,t,i,r,s=0,o=new this(1),u=[];if(void 0===n?n=this.precision:D(n,1,a),i=Math.ceil(n/7),this.crypto)if(crypto.getRandomValues)for(e=crypto.getRandomValues(new Uint32Array(i));s<i;)(r=e[s])>=429e7?e[s]=crypto.getRandomValues(new Uint32Array(1))[0]:u[s++]=r%1e7;else{if(!crypto.randomBytes)throw Error(v);for(e=crypto.randomBytes(i*=4);s<i;)(r=e[s]+(e[s+1]<<8)+(e[s+2]<<16)+((127&e[s+3])<<24))>=214e7?crypto.randomBytes(4).copy(e,s):(u.push(r%1e7),s+=4);s=i/4}else for(;s<i;)u[s++]=1e7*Math.random()|0;for(n%=7,(i=u[--s])&&n&&(r=y(10,7-n),u[s]=(i/r|0)*r);0===u[s];s--)u.pop();if(s<0)t=0,u=[0];else{for(t=-1;0===u[0];t-=7)u.shift();for(i=1,r=u[0];r>=10;r/=10)i++;i<7&&(t-=7-i)}return o.e=t,o.d=u,o}function Fn(n){return U(n=new this(n),n.e+1,this.rounding)}function Tn(n){return(n=new this(n)).d?n.d[0]?n.s:0*n.s:n.s||NaN}function An(n){return new this(n).sin()}function Un(n){return new this(n).sinh()}function Zn(n){return new this(n).sqrt()}function Rn(n,e){return new this(n).sub(e)}function Cn(){var n=0,e=arguments,t=new this(e[n]);for(p=!1;t.s&&++n<e.length;)t=t.plus(e[n]);return p=!0,U(t,this.precision,this.rounding)}function _n(n){return new this(n).tan()}function In(n){return new this(n).tanh()}function Ln(n){return U(n=new this(n),n.e+1,1)}(s=function n(e){var t,i,r;function s(n){var e,t,i,r=this;if(!(r instanceof s))return new s(n);if(r.constructor=s,yn(n))return r.s=n.s,void(p?!n.d||n.e>s.maxE?(r.e=NaN,r.d=null):n.e<s.minE?(r.e=0,r.d=[0]):(r.e=n.e,r.d=n.d.slice()):(r.e=n.e,r.d=n.d?n.d.slice():n.d));if("number"===(i=typeof n)){if(0===n)return r.s=1/n<0?-1:1,r.e=0,void(r.d=[0]);if(n<0?(n=-n,r.s=-1):r.s=1,n===~~n&&n<1e7){for(e=0,t=n;t>=10;t/=10)e++;return void(p?e>s.maxE?(r.e=NaN,r.d=null):e<s.minE?(r.e=0,r.d=[0]):(r.e=e,r.d=[n]):(r.e=e,r.d=[n]))}return 0*n!==0?(n||(r.s=NaN),r.e=NaN,void(r.d=null)):J(r,n.toString())}if("string"!==i)throw Error(m+n);return 45===(t=n.charCodeAt(0))?(n=n.slice(1),r.s=-1):(43===t&&(n=n.slice(1)),r.s=1),M.test(n)?J(r,n):G(r,n)}if(s.prototype=P,s.ROUND_UP=0,s.ROUND_DOWN=1,s.ROUND_CEIL=2,s.ROUND_FLOOR=3,s.ROUND_HALF_UP=4,s.ROUND_HALF_DOWN=5,s.ROUND_HALF_EVEN=6,s.ROUND_HALF_CEIL=7,s.ROUND_HALF_FLOOR=8,s.EUCLID=9,s.config=s.set=pn,s.clone=n,s.isDecimal=yn,s.abs=en,s.acos=tn,s.acosh=rn,s.add=sn,s.asin=on,s.asinh=un,s.atan=cn,s.atanh=an,s.atan2=fn,s.cbrt=ln,s.ceil=dn,s.clamp=hn,s.cos=gn,s.cosh=mn,s.div=wn,s.exp=vn,s.floor=Nn,s.hypot=bn,s.ln=xn,s.log=En,s.log10=Mn,s.log2=On,s.max=qn,s.min=Sn,s.mod=jn,s.mul=Pn,s.pow=kn,s.random=Dn,s.round=Fn,s.sign=Tn,s.sin=An,s.sinh=Un,s.sqrt=Zn,s.sub=Rn,s.sum=Cn,s.tan=_n,s.tanh=In,s.trunc=Ln,void 0===e&&(e={}),e&&!0!==e.defaults)for(r=["precision","rounding","toExpNeg","toExpPos","maxE","minE","modulo","crypto"],t=0;t<r.length;)e.hasOwnProperty(i=r[t++])||(e[i]=this[i]);return s.config(e),s}(h)).prototype.constructor=s,s.default=s.Decimal=s,l=new s(l),d=new s(d),void 0===(i=function(){return s}.call(e,t,e,n))||(n.exports=i)}()},169:function(n,e,t){var i=t(112),r=t(115);n.exports=function(n){return"symbol"==typeof n||r(n)&&"[object Symbol]"==i(n)}},179:function(n,e,t){var i=t(345),r=t(135),s=t(169),o=/^[-+]0x[0-9a-f]+$/i,u=/^0b[01]+$/i,c=/^0o[0-7]+$/i,a=parseInt;n.exports=function(n){if("number"==typeof n)return n;if(s(n))return NaN;if(r(n)){var e="function"==typeof n.valueOf?n.valueOf():n;n=r(e)?e+"":e}if("string"!=typeof n)return 0===n?n:+n;n=i(n);var t=u.test(n);return t||c.test(n)?a(n.slice(2),t?2:8):o.test(n)?NaN:+n}},221:function(n,e,t){"use strict";var i=t(3),r=t(40),s=t(46),o=t(49),u=t(50),c=t(51),a=t(0),f=t(39),l=t.n(f),d=t(54),h=t(350),p=t.n(h),g=t(128),m=t(68),w=t(59),v=function(n,e){var t={};for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&e.indexOf(i)<0&&(t[i]=n[i]);if(null!=n&&"function"===typeof Object.getOwnPropertySymbols){var r=0;for(i=Object.getOwnPropertySymbols(n);r<i.length;r++)e.indexOf(i[r])<0&&Object.prototype.propertyIsEnumerable.call(n,i[r])&&(t[i[r]]=n[i[r]])}return t},N=(Object(m.a)("small","default","large"),null);var b=function(n){Object(u.a)(t,n);var e=Object(c.a)(t);function t(n){var o;Object(s.a)(this,t),(o=e.call(this,n)).debouncifyUpdateSpinning=function(n){var e=(n||o.props).delay;e&&(o.cancelExistingSpin(),o.updateSpinning=p()(o.originalUpdateSpinning,e))},o.updateSpinning=function(){var n=o.props.spinning;o.state.spinning!==n&&o.setState({spinning:n})},o.renderSpin=function(n){var e,t=n.getPrefixCls,s=n.direction,u=o.props,c=u.prefixCls,f=u.className,h=u.size,p=u.tip,g=u.wrapperClassName,m=u.style,b=v(u,["prefixCls","className","size","tip","wrapperClassName","style"]),y=o.state.spinning,x=t("spin",c),E=l()(x,(e={},Object(r.a)(e,"".concat(x,"-sm"),"small"===h),Object(r.a)(e,"".concat(x,"-lg"),"large"===h),Object(r.a)(e,"".concat(x,"-spinning"),y),Object(r.a)(e,"".concat(x,"-show-text"),!!p),Object(r.a)(e,"".concat(x,"-rtl"),"rtl"===s),e),f),O=Object(d.a)(b,["spinning","delay","indicator"]),M=a.createElement("div",Object(i.a)({},O,{style:m,className:E}),function(n,e){var t=e.indicator,i="".concat(n,"-dot");return null===t?null:Object(w.b)(t)?Object(w.a)(t,{className:l()(t.props.className,i)}):Object(w.b)(N)?Object(w.a)(N,{className:l()(N.props.className,i)}):a.createElement("span",{className:l()(i,"".concat(n,"-dot-spin"))},a.createElement("i",{className:"".concat(n,"-dot-item")}),a.createElement("i",{className:"".concat(n,"-dot-item")}),a.createElement("i",{className:"".concat(n,"-dot-item")}),a.createElement("i",{className:"".concat(n,"-dot-item")}))}(x,o.props),p?a.createElement("div",{className:"".concat(x,"-text")},p):null);if(o.isNestedPattern()){var q=l()("".concat(x,"-container"),Object(r.a)({},"".concat(x,"-blur"),y));return a.createElement("div",Object(i.a)({},O,{className:l()("".concat(x,"-nested-loading"),g)}),y&&a.createElement("div",{key:"loading"},M),a.createElement("div",{className:q,key:"container"},o.props.children))}return M};var u=n.spinning,c=function(n,e){return!!n&&!!e&&!isNaN(Number(e))}(u,n.delay);return o.state={spinning:u&&!c},o.originalUpdateSpinning=o.updateSpinning,o.debouncifyUpdateSpinning(n),o}return Object(o.a)(t,[{key:"componentDidMount",value:function(){this.updateSpinning()}},{key:"componentDidUpdate",value:function(){this.debouncifyUpdateSpinning(),this.updateSpinning()}},{key:"componentWillUnmount",value:function(){this.cancelExistingSpin()}},{key:"cancelExistingSpin",value:function(){var n=this.updateSpinning;n&&n.cancel&&n.cancel()}},{key:"isNestedPattern",value:function(){return!(!this.props||"undefined"===typeof this.props.children)}},{key:"render",value:function(){return a.createElement(g.a,null,this.renderSpin)}}],[{key:"setDefaultIndicator",value:function(n){N=n}}]),t}(a.Component);b.defaultProps={spinning:!0,size:"default",wrapperClassName:""},e.a=b},271:function(n,e,t){"use strict";var i=t(41),r=t(0),s={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"defs",attrs:{},children:[{tag:"style",attrs:{}}]},{tag:"path",attrs:{d:"M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z"}},{tag:"path",attrs:{d:"M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z"}}]},name:"plus",theme:"outlined"},o=t(47),u=function(n,e){return r.createElement(o.a,Object(i.a)(Object(i.a)({},n),{},{ref:e,icon:s}))};u.displayName="PlusOutlined";e.a=r.forwardRef(u)},345:function(n,e,t){var i=t(346),r=/^\s+/;n.exports=function(n){return n?n.slice(0,i(n)+1).replace(r,""):n}},346:function(n,e){var t=/\s/;n.exports=function(n){for(var e=n.length;e--&&t.test(n.charAt(e)););return e}},350:function(n,e,t){var i=t(135),r=t(351),s=t(179),o=Math.max,u=Math.min;n.exports=function(n,e,t){var c,a,f,l,d,h,p=0,g=!1,m=!1,w=!0;if("function"!=typeof n)throw new TypeError("Expected a function");function v(e){var t=c,i=a;return c=a=void 0,p=e,l=n.apply(i,t)}function N(n){return p=n,d=setTimeout(y,e),g?v(n):l}function b(n){var t=n-h;return void 0===h||t>=e||t<0||m&&n-p>=f}function y(){var n=r();if(b(n))return x(n);d=setTimeout(y,function(n){var t=e-(n-h);return m?u(t,f-(n-p)):t}(n))}function x(n){return d=void 0,w&&c?v(n):(c=a=void 0,l)}function E(){var n=r(),t=b(n);if(c=arguments,a=this,h=n,t){if(void 0===d)return N(h);if(m)return clearTimeout(d),d=setTimeout(y,e),v(h)}return void 0===d&&(d=setTimeout(y,e)),l}return e=s(e)||0,i(t)&&(g=!!t.leading,f=(m="maxWait"in t)?o(s(t.maxWait)||0,e):f,w="trailing"in t?!!t.trailing:w),E.cancel=function(){void 0!==d&&clearTimeout(d),p=0,c=h=a=d=void 0},E.flush=function(){return void 0===d?l:x(r())},E}},351:function(n,e,t){var i=t(78);n.exports=function(){return i.Date.now()}}}]);