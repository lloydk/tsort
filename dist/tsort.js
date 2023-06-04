function* d(o, s) {
  for (const e of m(o, s))
    if (e.length == 1)
      yield e[0];
    else
      throw new Error("Cycle detected");
}
function* m(o, s) {
  const e = /* @__PURE__ */ new Map(), l = [];
  for (const n of o)
    if (!e.has(n)) {
      const f = h(
        n,
        s,
        e,
        l
      );
      let i = f.next();
      for (; !i.done; )
        yield i.value, i = f.next();
    }
}
function* h(o, s, e, l) {
  let n = e.size;
  const f = e.size, i = l.length;
  e.set(o, e.size), l.push(o);
  for (const c of s(o))
    if (e.has(c)) {
      const t = e.get(c);
      t != null && t < n && (n = t);
    } else {
      const t = h(
        c,
        s,
        e,
        l
      );
      let r = t.next();
      for (; !r.done; )
        yield* [r.value], r = t.next();
      const u = r.value;
      u < n && (n = u);
    }
  if (f == n) {
    const c = l.splice(i);
    for (const t of c)
      e.set(t, null);
    yield c;
  }
  return n;
}
export {
  m as stronglyConnectedComponents,
  d as tsort
};
