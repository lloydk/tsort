(function(o,c){typeof exports=="object"&&typeof module<"u"?c(exports):typeof define=="function"&&define.amd?define(["exports"],c):(o=typeof globalThis<"u"?globalThis:o||self,c(o["@lloydk/tsort"]={}))})(this,function(o){"use strict";function*c(s,l){for(const e of m(s,l))if(e.length==1)yield e[0];else throw new Error("Cycle detected")}function*m(s,l){const e=new Map,i=[];for(const n of s)if(!e.has(n)){const d=h(n,l,e,i);let u=d.next();for(;!u.done;)yield u.value,u=d.next()}}function*h(s,l,e,i){let n=e.size;const d=e.size,u=i.length;e.set(s,e.size),i.push(s);for(const f of l(s))if(e.has(f)){const t=e.get(f);t!=null&&t<n&&(n=t)}else{const t=h(f,l,e,i);let r=t.next();for(;!r.done;)yield*[r.value],r=t.next();const y=r.value;y<n&&(n=y)}if(d==n){const f=i.splice(u);for(const t of f)e.set(t,null);yield f}return n}o.stronglyConnectedComponents=m,o.tsort=c,Object.defineProperty(o,Symbol.toStringTag,{value:"Module"})});
