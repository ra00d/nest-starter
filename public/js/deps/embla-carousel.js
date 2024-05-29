!(function (n, t) {
  'object' == typeof exports && 'undefined' != typeof module
    ? (module.exports = t())
    : 'function' == typeof define && define.amd
      ? define(t)
      : ((n =
          'undefined' != typeof globalThis
            ? globalThis
            : n || self).EmblaCarousel = t());
})(this, function () {
  'use strict';
  function n(n) {
    return 'number' == typeof n;
  }
  function t(n) {
    return 'string' == typeof n;
  }
  function e(n) {
    return 'boolean' == typeof n;
  }
  function r(n) {
    return '[object Object]' === Object.prototype.toString.call(n);
  }
  function o(n) {
    return Math.abs(n);
  }
  function i(n) {
    return Math.sign(n);
  }
  function c(n, t) {
    return o(n - t);
  }
  function u(n) {
    return f(n).map(Number);
  }
  function s(n) {
    return n[a(n)];
  }
  function a(n) {
    return Math.max(0, n.length - 1);
  }
  function d(n, t) {
    return t === a(n);
  }
  function l(n, t = 0) {
    return Array.from(Array(n), (n, e) => t + e);
  }
  function f(n) {
    return Object.keys(n);
  }
  function p(n, t) {
    return [n, t].reduce(
      (n, t) => (
        f(t).forEach((e) => {
          const o = n[e],
            i = t[e],
            c = r(o) && r(i);
          n[e] = c ? p(o, i) : i;
        }),
        n
      ),
      {},
    );
  }
  function m(n, t) {
    return void 0 !== t.MouseEvent && n instanceof t.MouseEvent;
  }
  function g() {
    let n = [];
    const t = {
      add: function (e, r, o, i = { passive: !0 }) {
        let c;
        if ('addEventListener' in e)
          e.addEventListener(r, o, i),
            (c = () => e.removeEventListener(r, o, i));
        else {
          const n = e;
          n.addListener(o), (c = () => n.removeListener(o));
        }
        return n.push(c), t;
      },
      clear: function () {
        n = n.filter((n) => n());
      },
    };
    return t;
  }
  function h(n, t, e, r) {
    const i = g(),
      c = 1e3 / 60;
    let u = null,
      s = 0,
      a = 0;
    function d(n) {
      if (!a) return;
      u || (u = n);
      const i = n - u;
      for (u = n, s += i; s >= c; ) e(), (s -= c);
      const l = o(s / c);
      r(l), a && t.requestAnimationFrame(d);
    }
    function l() {
      t.cancelAnimationFrame(a), (u = null), (s = 0), (a = 0);
    }
    return {
      init: function () {
        i.add(n, 'visibilitychange', () => {
          n.hidden && ((u = null), (s = 0));
        });
      },
      destroy: function () {
        l(), i.clear();
      },
      start: function () {
        a || (a = t.requestAnimationFrame(d));
      },
      stop: l,
      update: e,
      render: r,
    };
  }
  function x(n = 0, t = 0) {
    const e = o(n - t);
    function r(t) {
      return t < n;
    }
    function i(n) {
      return n > t;
    }
    function c(n) {
      return r(n) || i(n);
    }
    return {
      length: e,
      max: t,
      min: n,
      constrain: function (e) {
        return c(e) ? (r(e) ? n : t) : e;
      },
      reachedAny: c,
      reachedMax: i,
      reachedMin: r,
      removeOffset: function (n) {
        return e ? n - e * Math.ceil((n - t) / e) : n;
      },
    };
  }
  function y(n, t, e) {
    const { constrain: r } = x(0, n),
      i = n + 1;
    let c = u(t);
    function u(n) {
      return e ? o((i + n) % i) : r(n);
    }
    function s() {
      return c;
    }
    function a() {
      return y(n, s(), e);
    }
    const d = {
      get: s,
      set: function (n) {
        return (c = u(n)), d;
      },
      add: function (n) {
        return a().set(s() + n);
      },
      clone: a,
    };
    return d;
  }
  function v(n, t, r, u, s, a, d, l, f, p, h, y, v, b, S, w, E, L, D) {
    const { cross: I, direction: A } = n,
      M = ['INPUT', 'SELECT', 'TEXTAREA'],
      T = { passive: !1 },
      O = g(),
      F = g(),
      P = x(50, 225).constrain(b.measure(20)),
      z = { mouse: 300, touch: 400 },
      H = { mouse: 500, touch: 600 },
      k = S ? 43 : 25;
    let V = !1,
      B = 0,
      N = 0,
      R = !1,
      C = !1,
      j = !1,
      G = !1;
    function q(n) {
      if (!m(n, u) && n.touches.length >= 2) return U(n);
      const t = a.readPoint(n),
        e = a.readPoint(n, I),
        r = c(t, B),
        o = c(e, N);
      if (!C && !G) {
        if (!n.cancelable) return U(n);
        if (((C = r > o), !C)) return U(n);
      }
      const i = a.pointerMove(n);
      r > w && (j = !0),
        p.useFriction(0.3).useDuration(0.75),
        l.start(),
        s.add(A(i)),
        n.preventDefault();
    }
    function U(n) {
      const t = h.byDistance(0, !1).index !== y.get(),
        e = a.pointerUp(n) * (S ? H : z)[G ? 'mouse' : 'touch'],
        r = (function (n, t) {
          const e = y.add(-1 * i(n)),
            r = h.byDistance(n, !S).distance;
          return S || o(n) < P
            ? r
            : E && t
              ? 0.5 * r
              : h.byIndex(e.get(), 0).distance;
        })(A(e), t),
        u = (function (n, t) {
          if (0 === n || 0 === t) return 0;
          if (o(n) <= o(t)) return 0;
          const e = c(o(n), o(t));
          return o(e / n);
        })(e, r),
        s = k - 10 * u,
        d = L + u / 50;
      (C = !1),
        (R = !1),
        F.clear(),
        p.useDuration(s).useFriction(d),
        f.distance(r, !S),
        (G = !1),
        v.emit('pointerUp');
    }
    function W(n) {
      j && (n.stopPropagation(), n.preventDefault(), (j = !1));
    }
    return {
      init: function (n) {
        if (!D) return;
        function o(o) {
          (e(D) || D(n, o)) &&
            (function (n) {
              const e = m(n, u);
              if (
                ((G = e),
                (j = S && e && !n.buttons && V),
                (V = c(s.get(), d.get()) >= 2),
                e && 0 !== n.button)
              )
                return;
              if (
                (function (n) {
                  const t = n.nodeName || '';
                  return M.includes(t);
                })(n.target)
              )
                return;
              (R = !0),
                a.pointerDown(n),
                p.useFriction(0).useDuration(0),
                s.set(d),
                (function () {
                  const n = G ? r : t;
                  F.add(n, 'touchmove', q, T)
                    .add(n, 'touchend', U)
                    .add(n, 'mousemove', q, T)
                    .add(n, 'mouseup', U);
                })(),
                (B = a.readPoint(n)),
                (N = a.readPoint(n, I)),
                v.emit('pointerDown');
            })(o);
        }
        const i = t;
        O.add(i, 'dragstart', (n) => n.preventDefault(), T)
          .add(i, 'touchmove', () => {}, T)
          .add(i, 'touchend', () => {})
          .add(i, 'touchstart', o)
          .add(i, 'mousedown', o)
          .add(i, 'touchcancel', U)
          .add(i, 'contextmenu', U)
          .add(i, 'click', W, !0);
      },
      destroy: function () {
        O.clear(), F.clear();
      },
      pointerDown: function () {
        return R;
      },
    };
  }
  function b(n, t) {
    let e, r;
    function i(n) {
      return n.timeStamp;
    }
    function c(e, r) {
      const o = 'client' + ('x' === (r || n.scroll) ? 'X' : 'Y');
      return (m(e, t) ? e : e.touches[0])[o];
    }
    return {
      pointerDown: function (n) {
        return (e = n), (r = n), c(n);
      },
      pointerMove: function (n) {
        const t = c(n) - c(r),
          o = i(n) - i(e) > 170;
        return (r = n), o && (e = n), t;
      },
      pointerUp: function (n) {
        if (!e || !r) return 0;
        const t = c(r) - c(e),
          u = i(n) - i(e),
          s = i(n) - i(r) > 170,
          a = t / u;
        return u && !s && o(a) > 0.1 ? a : 0;
      },
      readPoint: c,
    };
  }
  function S(n, t, r, i, c, u, s) {
    let a,
      d,
      l = [],
      f = !1;
    function p(n) {
      return c.measureSize(s.measure(n));
    }
    return {
      init: function (c) {
        if (!u) return;
        (d = p(n)),
          (l = i.map(p)),
          (a = new ResizeObserver((s) => {
            f ||
              ((e(u) || u(c, s)) &&
                (function (e) {
                  for (const u of e) {
                    const e = u.target === n,
                      s = i.indexOf(u.target),
                      a = e ? d : l[s];
                    if (o(p(e ? n : i[s]) - a) >= 0.5) {
                      r.requestAnimationFrame(() => {
                        c.reInit(), t.emit('resize');
                      });
                      break;
                    }
                  }
                })(s));
          })),
          [n].concat(i).forEach((n) => a.observe(n));
      },
      destroy: function () {
        a && a.disconnect(), (f = !0);
      },
    };
  }
  function w(n, t, e, r, i) {
    const c = i.measure(10),
      u = i.measure(50),
      s = x(0.1, 0.99);
    let a = !1;
    return {
      constrain: function (i) {
        if (a || !n.reachedAny(e.get()) || !n.reachedAny(t.get())) return;
        const d = n.reachedMin(t.get()) ? 'min' : 'max',
          l = o(n[d] - t.get()),
          f = e.get() - t.get(),
          p = s.constrain(l / u);
        e.subtract(f * p),
          !i &&
            o(f) < c &&
            (e.set(n.constrain(e.get())), r.useDuration(25).useBaseFriction());
      },
      toggleActive: function (n) {
        a = !n;
      },
    };
  }
  function E(n, t, e, r) {
    const o = t.min + 0.1,
      i = t.max + 0.1,
      { reachedMin: c, reachedMax: u } = x(o, i);
    return {
      loop: function (t) {
        if (
          !(function (n) {
            return 1 === n ? u(e.get()) : -1 === n && c(e.get());
          })(t)
        )
          return;
        const o = n * (-1 * t);
        r.forEach((n) => n.add(o));
      },
    };
  }
  function L(n, t, e, r, c) {
    const { reachedAny: u, removeOffset: a, constrain: d } = r;
    function l(n) {
      return n.concat().sort((n, t) => o(n) - o(t))[0];
    }
    function f(t, r) {
      const o = [t, t + e, t - e];
      if (!n) return t;
      if (!r) return l(o);
      const c = o.filter((n) => i(n) === r);
      return c.length ? l(c) : s(o) - e;
    }
    return {
      byDistance: function (e, r) {
        const i = c.get() + e,
          { index: s, distance: l } = (function (e) {
            const r = n ? a(e) : d(e),
              i = t
                .map((n, t) => ({ diff: f(n - r, 0), index: t }))
                .sort((n, t) => o(n.diff) - o(t.diff)),
              { index: c } = i[0];
            return { index: c, distance: r };
          })(i),
          p = !n && u(i);
        return !r || p
          ? { index: s, distance: e }
          : { index: s, distance: e + f(t[s] - l, 0) };
      },
      byIndex: function (n, e) {
        return { index: n, distance: f(t[n] - c.get(), e) };
      },
      shortcut: f,
    };
  }
  function D(t) {
    let e = t;
    function r(t) {
      return n(t) ? t : t.get();
    }
    return {
      get: function () {
        return e;
      },
      set: function (n) {
        e = r(n);
      },
      add: function (n) {
        e += r(n);
      },
      subtract: function (n) {
        e -= r(n);
      },
    };
  }
  function I(n, t) {
    const e =
        'x' === n.scroll
          ? function (n) {
              return `translate3d(${n}px,0px,0px)`;
            }
          : function (n) {
              return `translate3d(0px,${n}px,0px)`;
            },
      r = t.style;
    let o = !1;
    return {
      clear: function () {
        o ||
          ((r.transform = ''),
          t.getAttribute('style') || t.removeAttribute('style'));
      },
      to: function (t) {
        o || (r.transform = e(n.direction(t)));
      },
      toggleActive: function (n) {
        o = !n;
      },
    };
  }
  function A(n, t, e, r, o, i, c, s, a) {
    const d = 0.5,
      l = u(o),
      f = u(o).reverse(),
      p = (function () {
        const n = c[0];
        return h(g(f, n), e, !1);
      })().concat(
        (function () {
          const n = t - c[0] - 1;
          return h(g(l, n), -e, !0);
        })(),
      );
    function m(n, t) {
      return n.reduce((n, t) => n - o[t], t);
    }
    function g(n, t) {
      return n.reduce((n, e) => (m(n, t) > 0 ? n.concat([e]) : n), []);
    }
    function h(o, c, u) {
      const l = (function (n) {
        return i.map((e, o) => ({
          start: e - r[o] + d + n,
          end: e + t - d + n,
        }));
      })(c);
      return o.map((t) => {
        const r = u ? 0 : -e,
          o = u ? e : 0,
          i = u ? 'end' : 'start',
          c = l[t][i];
        return {
          index: t,
          loopPoint: c,
          slideLocation: D(-1),
          translate: I(n, a[t]),
          target: () => (s.get() > c ? r : o),
        };
      });
    }
    return {
      canLoop: function () {
        return p.every(
          ({ index: n }) =>
            m(
              l.filter((t) => t !== n),
              t,
            ) <= 0.1,
        );
      },
      clear: function () {
        p.forEach((n) => n.translate.clear());
      },
      loop: function () {
        p.forEach((n) => {
          const { target: t, translate: e, slideLocation: r } = n,
            o = t();
          o !== r.get() && (e.to(o), r.set(o));
        });
      },
      loopPoints: p,
    };
  }
  function M(n, t, r) {
    let o,
      i = !1;
    return {
      init: function (c) {
        r &&
          ((o = new MutationObserver((n) => {
            i ||
              ((e(r) || r(c, n)) &&
                (function (n) {
                  for (const e of n)
                    if ('childList' === e.type) {
                      c.reInit(), t.emit('slidesChanged');
                      break;
                    }
                })(n));
          })),
          o.observe(n, { childList: !0 }));
      },
      destroy: function () {
        o && o.disconnect(), (i = !0);
      },
    };
  }
  function T(n, t, e, r) {
    const o = {};
    let i,
      c = null,
      u = null,
      s = !1;
    return {
      init: function () {
        (i = new IntersectionObserver(
          (n) => {
            s ||
              (n.forEach((n) => {
                const e = t.indexOf(n.target);
                o[e] = n;
              }),
              (c = null),
              (u = null),
              e.emit('slidesInView'));
          },
          { root: n.parentElement, threshold: r },
        )),
          t.forEach((n) => i.observe(n));
      },
      destroy: function () {
        i && i.disconnect(), (s = !0);
      },
      get: function (n = !0) {
        if (n && c) return c;
        if (!n && u) return u;
        const t = (function (n) {
          return f(o).reduce((t, e) => {
            const r = parseInt(e),
              { isIntersecting: i } = o[r];
            return ((n && i) || (!n && !i)) && t.push(r), t;
          }, []);
        })(n);
        return n && (c = t), n || (u = t), t;
      },
    };
  }
  function O(t, e, r, i, c, d, l, f, p) {
    const { startEdge: m, endEdge: g, direction: h } = t,
      x = n(r);
    return {
      groupSlides: function (n) {
        return x
          ? (function (n, t) {
              return u(n)
                .filter((n) => n % t == 0)
                .map((e) => n.slice(e, e + t));
            })(n, r)
          : (function (n) {
              return n.length
                ? u(n)
                    .reduce((t, r, u) => {
                      const x = s(t) || 0,
                        y = 0 === x,
                        v = r === a(n),
                        b = c[m] - d[x][m],
                        S = c[m] - d[r][g],
                        w = !i && y ? h(l) : 0,
                        E = o(S - (!i && v ? h(f) : 0) - (b + w));
                      return (
                        u && E > e + p && t.push(r), v && t.push(n.length), t
                      );
                    }, [])
                    .map((t, e, r) => {
                      const o = Math.max(r[e - 1] || 0);
                      return n.slice(o, t);
                    })
                : [];
            })(n);
      },
    };
  }
  function F(e, r, f, p, m, F, P) {
    const {
        align: z,
        axis: H,
        direction: k,
        startIndex: V,
        loop: B,
        duration: N,
        dragFree: R,
        dragThreshold: C,
        inViewThreshold: j,
        slidesToScroll: G,
        skipSnaps: q,
        containScroll: U,
        watchResize: W,
        watchSlides: $,
        watchDrag: Q,
      } = F,
      X = {
        measure: function (n) {
          const {
            offsetTop: t,
            offsetLeft: e,
            offsetWidth: r,
            offsetHeight: o,
          } = n;
          return {
            top: t,
            right: e + r,
            bottom: t + o,
            left: e,
            width: r,
            height: o,
          };
        },
      },
      Y = X.measure(r),
      J = f.map(X.measure),
      K = (function (n, t) {
        const e = 'rtl' === t,
          r = 'y' === n,
          o = !r && e ? -1 : 1;
        return {
          scroll: r ? 'y' : 'x',
          cross: r ? 'x' : 'y',
          startEdge: r ? 'top' : e ? 'right' : 'left',
          endEdge: r ? 'bottom' : e ? 'left' : 'right',
          measureSize: function (n) {
            const { height: t, width: e } = n;
            return r ? t : e;
          },
          direction: function (n) {
            return n * o;
          },
        };
      })(H, k),
      Z = K.measureSize(Y),
      _ = (function (n) {
        return {
          measure: function (t) {
            return n * (t / 100);
          },
        };
      })(Z),
      nn = (function (n, e) {
        const r = {
          start: function () {
            return 0;
          },
          center: function (n) {
            return o(n) / 2;
          },
          end: o,
        };
        function o(n) {
          return e - n;
        }
        return {
          measure: function (o, i) {
            return t(n) ? r[n](o) : n(e, o, i);
          },
        };
      })(z, Z),
      tn = !B && !!U,
      en = B || !!U,
      {
        slideSizes: rn,
        slideSizesWithGaps: on,
        startGap: cn,
        endGap: un,
      } = (function (n, t, e, r, i, c) {
        const { measureSize: u, startEdge: a, endEdge: l } = n,
          f = e[0] && i,
          p = (function () {
            if (!f) return 0;
            const n = e[0];
            return o(t[a] - n[a]);
          })(),
          m = (function () {
            if (!f) return 0;
            const n = c.getComputedStyle(s(r));
            return parseFloat(n.getPropertyValue(`margin-${l}`));
          })(),
          g = e.map(u),
          h = e
            .map((n, t, e) => {
              const r = !t,
                o = d(e, t);
              return r ? g[t] + p : o ? g[t] + m : e[t + 1][a] - n[a];
            })
            .map(o);
        return { slideSizes: g, slideSizesWithGaps: h, startGap: p, endGap: m };
      })(K, Y, J, f, en, m),
      sn = O(K, Z, G, B, Y, J, cn, un, 2),
      { snaps: an, snapsAligned: dn } = (function (n, t, e, r, i) {
        const { startEdge: c, endEdge: u } = n,
          { groupSlides: a } = i,
          d = a(r)
            .map((n) => s(n)[u] - n[0][c])
            .map(o)
            .map(t.measure),
          l = r.map((n) => e[c] - n[c]).map((n) => -o(n)),
          f = a(l)
            .map((n) => n[0])
            .map((n, t) => n + d[t]);
        return { snaps: l, snapsAligned: f };
      })(K, nn, Y, J, sn),
      ln = -s(an) + s(on),
      { snapsContained: fn, scrollContainLimit: pn } = (function (
        n,
        t,
        e,
        r,
        o,
      ) {
        const i = x(-t + n, 0),
          u = e
            .map((n, t) => {
              const { min: r, max: o } = i,
                c = i.constrain(n),
                u = !t,
                s = d(e, t);
              return u ? o : s || l(r, c) ? r : l(o, c) ? o : c;
            })
            .map((n) => parseFloat(n.toFixed(3))),
          a = (function () {
            const n = u[0],
              t = s(u);
            return x(u.lastIndexOf(n), u.indexOf(t) + 1);
          })();
        function l(n, t) {
          return c(n, t) < 1;
        }
        return {
          snapsContained: (function () {
            if (t <= n + o) return [i.max];
            if ('keepSnaps' === r) return u;
            const { min: e, max: c } = a;
            return u.slice(e, c);
          })(),
          scrollContainLimit: a,
        };
      })(Z, ln, dn, U, 2),
      mn = tn ? fn : dn,
      { limit: gn } = (function (n, t, e) {
        const r = t[0];
        return { limit: x(e ? r - n : s(t), r) };
      })(ln, mn, B),
      hn = y(a(mn), V, B),
      xn = hn.clone(),
      yn = u(f),
      vn = h(
        p,
        m,
        () =>
          (({
            dragHandler: n,
            scrollBody: t,
            scrollBounds: e,
            options: { loop: r },
          }) => {
            r || e.constrain(n.pointerDown()), t.seek();
          })(Pn),
        (n) =>
          ((
            {
              scrollBody: n,
              translate: t,
              location: e,
              offsetLocation: r,
              scrollLooper: o,
              slideLooper: i,
              dragHandler: c,
              animation: u,
              eventHandler: s,
              options: { loop: a },
            },
            d,
          ) => {
            const l = n.velocity(),
              f = n.settled();
            f && !c.pointerDown() && (u.stop(), s.emit('settle')),
              f || s.emit('scroll'),
              r.set(e.get() - l + l * d),
              a && (o.loop(n.direction()), i.loop()),
              t.to(r.get());
          })(Pn, n),
      ),
      bn = mn[hn.get()],
      Sn = D(bn),
      wn = D(bn),
      En = D(bn),
      Ln = (function (n, t, e, r, c) {
        let u = 0,
          s = 0,
          a = r,
          d = c,
          l = n.get(),
          f = 0;
        function p(n) {
          return (a = n), g;
        }
        function m(n) {
          return (d = n), g;
        }
        const g = {
          direction: function () {
            return s;
          },
          duration: function () {
            return a;
          },
          velocity: function () {
            return u;
          },
          seek: function () {
            const t = e.get() - n.get();
            let r = 0;
            return (
              a
                ? ((u += t / a), (u *= d), (l += u), n.add(u), (r = l - f))
                : ((u = 0), n.set(e), (r = t)),
              (s = i(r)),
              (f = l),
              g
            );
          },
          settled: function () {
            return o(e.get() - t.get()) < 0.001;
          },
          useBaseFriction: function () {
            return m(c);
          },
          useBaseDuration: function () {
            return p(r);
          },
          useFriction: m,
          useDuration: p,
        };
        return g;
      })(Sn, wn, En, N, 0.68),
      Dn = L(B, mn, ln, gn, En),
      In = (function (n, t, e, r, o, i, c) {
        function u(o) {
          const u = o.distance,
            s = o.index !== t.get();
          i.add(u),
            u &&
              (r.duration()
                ? n.start()
                : (n.update(), n.render(1), n.update())),
            s && (e.set(t.get()), t.set(o.index), c.emit('select'));
        }
        return {
          distance: function (n, t) {
            u(o.byDistance(n, t));
          },
          index: function (n, e) {
            const r = t.clone().set(n);
            u(o.byIndex(r.get(), e));
          },
        };
      })(vn, hn, xn, Ln, Dn, En, P),
      An = (function (n) {
        const { max: t, length: e } = n;
        return {
          get: function (n) {
            return e ? (n - t) / -e : 0;
          },
        };
      })(gn),
      Mn = g(),
      Tn = T(r, f, P, j),
      { slideRegistry: On } = (function (n, t, e, r, o, i) {
        const { groupSlides: c } = o,
          { min: u, max: f } = r;
        return {
          slideRegistry: (function () {
            const r = c(i),
              o = !n || 'keepSnaps' === t;
            return 1 === e.length
              ? [i]
              : o
                ? r
                : r.slice(u, f).map((n, t, e) => {
                    const r = !t,
                      o = d(e, t);
                    return r
                      ? l(s(e[0]) + 1)
                      : o
                        ? l(a(i) - s(e)[0] + 1, s(e)[0])
                        : n;
                  });
          })(),
        };
      })(tn, U, mn, pn, sn, yn),
      Fn = (function (t, e, r, o, i, c, u) {
        let s = 0;
        function a(n) {
          'Tab' === n.code && (s = new Date().getTime());
        }
        function d(a) {
          c.add(
            a,
            'focus',
            () => {
              if (new Date().getTime() - s > 10) return;
              t.scrollLeft = 0;
              const c = e.indexOf(a),
                d = r.findIndex((n) => n.includes(c));
              n(d) && (i.useDuration(0), o.index(d, 0), u.emit('slideFocus'));
            },
            { passive: !0, capture: !0 },
          );
        }
        return {
          init: function () {
            c.add(document, 'keydown', a, !1), e.forEach(d);
          },
        };
      })(e, f, On, In, Ln, Mn, P),
      Pn = {
        ownerDocument: p,
        ownerWindow: m,
        eventHandler: P,
        containerRect: Y,
        slideRects: J,
        animation: vn,
        axis: K,
        dragHandler: v(
          K,
          e,
          p,
          m,
          En,
          b(K, m),
          Sn,
          vn,
          In,
          Ln,
          Dn,
          hn,
          P,
          _,
          R,
          C,
          q,
          0.68,
          Q,
        ),
        eventStore: Mn,
        percentOfView: _,
        index: hn,
        indexPrevious: xn,
        limit: gn,
        location: Sn,
        offsetLocation: wn,
        options: F,
        resizeHandler: S(r, P, m, f, K, W, X),
        scrollBody: Ln,
        scrollBounds: w(gn, wn, En, Ln, _),
        scrollLooper: E(ln, gn, wn, [Sn, wn, En]),
        scrollProgress: An,
        scrollSnapList: mn.map(An.get),
        scrollSnaps: mn,
        scrollTarget: Dn,
        scrollTo: In,
        slideLooper: A(K, Z, ln, rn, on, an, mn, wn, f),
        slideFocus: Fn,
        slidesHandler: M(r, P, $),
        slidesInView: Tn,
        slideIndexes: yn,
        slideRegistry: On,
        slidesToScroll: sn,
        target: En,
        translate: I(K, r),
      };
    return Pn;
  }
  const P = {
    align: 'center',
    axis: 'x',
    container: null,
    slides: null,
    containScroll: 'trimSnaps',
    direction: 'ltr',
    slidesToScroll: 1,
    inViewThreshold: 0,
    breakpoints: {},
    dragFree: !1,
    dragThreshold: 10,
    loop: !1,
    skipSnaps: !1,
    duration: 25,
    startIndex: 0,
    active: !0,
    watchDrag: !0,
    watchResize: !0,
    watchSlides: !0,
  };
  function z(n) {
    function t(n, t) {
      return p(n, t || {});
    }
    const e = {
      mergeOptions: t,
      optionsAtMedia: function (e) {
        const r = e.breakpoints || {},
          o = f(r)
            .filter((t) => n.matchMedia(t).matches)
            .map((n) => r[n])
            .reduce((n, e) => t(n, e), {});
        return t(e, o);
      },
      optionsMediaQueries: function (t) {
        return t
          .map((n) => f(n.breakpoints || {}))
          .reduce((n, t) => n.concat(t), [])
          .map(n.matchMedia);
      },
    };
    return e;
  }
  function H(n, e, r) {
    const o = n.ownerDocument,
      i = o.defaultView,
      c = z(i),
      u = (function (n) {
        let t = [];
        return {
          init: function (e, r) {
            return (
              (t = r.filter(
                ({ options: t }) => !1 !== n.optionsAtMedia(t).active,
              )),
              t.forEach((t) => t.init(e, n)),
              r.reduce((n, t) => Object.assign(n, { [t.name]: t }), {})
            );
          },
          destroy: function () {
            t = t.filter((n) => n.destroy());
          },
        };
      })(c),
      s = g(),
      a = (function () {
        let n,
          t = {};
        function e(n) {
          return t[n] || [];
        }
        const r = {
          init: function (t) {
            n = t;
          },
          emit: function (t) {
            return e(t).forEach((e) => e(n, t)), r;
          },
          off: function (n, o) {
            return (t[n] = e(n).filter((n) => n !== o)), r;
          },
          on: function (n, o) {
            return (t[n] = e(n).concat([o])), r;
          },
          clear: function () {
            t = {};
          },
        };
        return r;
      })(),
      { mergeOptions: d, optionsAtMedia: l, optionsMediaQueries: f } = c,
      { on: p, off: m, emit: h } = a,
      x = M;
    let y,
      v,
      b,
      S,
      w = !1,
      E = d(P, H.globalOptions),
      L = d(E),
      D = [];
    function I(t) {
      const e = F(n, b, S, o, i, t, a);
      if (t.loop && !e.slideLooper.canLoop()) {
        return I(Object.assign({}, t, { loop: !1 }));
      }
      return e;
    }
    function A(e, r) {
      w ||
        ((E = d(E, e)),
        (L = l(E)),
        (D = r || D),
        (function () {
          const { container: e, slides: r } = L,
            o = t(e) ? n.querySelector(e) : e;
          b = o || n.children[0];
          const i = t(r) ? b.querySelectorAll(r) : r;
          S = [].slice.call(i || b.children);
        })(),
        (y = I(L)),
        f([E, ...D.map(({ options: n }) => n)]).forEach((n) =>
          s.add(n, 'change', M),
        ),
        L.active &&
          (y.translate.to(y.location.get()),
          y.animation.init(),
          y.slidesInView.init(),
          y.slideFocus.init(),
          y.eventHandler.init(V),
          y.resizeHandler.init(V),
          y.slidesHandler.init(V),
          y.options.loop && y.slideLooper.loop(),
          b.offsetParent && S.length && y.dragHandler.init(V),
          (v = u.init(V, D))));
    }
    function M(n, t) {
      const e = k();
      T(), A(d({ startIndex: e }, n), t), a.emit('reInit');
    }
    function T() {
      y.dragHandler.destroy(),
        y.eventStore.clear(),
        y.translate.clear(),
        y.slideLooper.clear(),
        y.resizeHandler.destroy(),
        y.slidesHandler.destroy(),
        y.slidesInView.destroy(),
        y.animation.destroy(),
        u.destroy(),
        s.clear();
    }
    function O(n, t, e) {
      L.active &&
        !w &&
        (y.scrollBody.useBaseFriction().useDuration(!0 === t ? 0 : L.duration),
        y.scrollTo.index(n, e || 0));
    }
    function k() {
      return y.index.get();
    }
    const V = {
      canScrollNext: function () {
        return y.index.add(1).get() !== k();
      },
      canScrollPrev: function () {
        return y.index.add(-1).get() !== k();
      },
      containerNode: function () {
        return b;
      },
      internalEngine: function () {
        return y;
      },
      destroy: function () {
        w || ((w = !0), s.clear(), T(), a.emit('destroy'), a.clear());
      },
      off: m,
      on: p,
      emit: h,
      plugins: function () {
        return v;
      },
      previousScrollSnap: function () {
        return y.indexPrevious.get();
      },
      reInit: x,
      rootNode: function () {
        return n;
      },
      scrollNext: function (n) {
        O(y.index.add(1).get(), n, -1);
      },
      scrollPrev: function (n) {
        O(y.index.add(-1).get(), n, 1);
      },
      scrollProgress: function () {
        return y.scrollProgress.get(y.location.get());
      },
      scrollSnapList: function () {
        return y.scrollSnapList;
      },
      scrollTo: O,
      selectedScrollSnap: k,
      slideNodes: function () {
        return S;
      },
      slidesInView: function () {
        return y.slidesInView.get();
      },
      slidesNotInView: function () {
        return y.slidesInView.get(!1);
      },
    };
    return A(e, r), setTimeout(() => a.emit('init'), 0), V;
  }
  return (H.globalOptions = void 0), H;
});
!(function (n, t) {
  'object' == typeof exports && 'undefined' != typeof module
    ? (module.exports = t())
    : 'function' == typeof define && define.amd
      ? define(t)
      : ((n =
          'undefined' != typeof globalThis
            ? globalThis
            : n || self).EmblaCarouselAutoplay = t());
})(this, function () {
  'use strict';
  const n = {
    active: !0,
    breakpoints: {},
    delay: 4e3,
    jump: !1,
    playOnInit: !0,
    stopOnFocusIn: !0,
    stopOnInteraction: !0,
    stopOnMouseEnter: !1,
    stopOnLastSnap: !1,
    rootNode: null,
  };
  function t(o = {}) {
    let e,
      i,
      r,
      a = !1,
      s = !0,
      l = !1,
      u = 0;
    function c() {
      if (r) return;
      if (!s) return;
      a || i.emit('autoplay:play');
      const { ownerWindow: n } = i.internalEngine();
      n.clearInterval(u), (u = n.setInterval(g, e.delay)), (a = !0);
    }
    function p() {
      if (r) return;
      a && i.emit('autoplay:stop');
      const { ownerWindow: n } = i.internalEngine();
      n.clearInterval(u), (u = 0), (a = !1);
    }
    function d() {
      if (f()) return (s = a), p();
      s && c();
    }
    function f() {
      const { ownerDocument: n } = i.internalEngine();
      return 'hidden' === n.visibilityState;
    }
    function y(n) {
      void 0 !== n && (l = n), (s = !0), c();
    }
    function g() {
      const { index: n } = i.internalEngine(),
        t = n.clone().add(1).get(),
        o = i.scrollSnapList().length - 1;
      e.stopOnLastSnap && t === o && p(),
        i.canScrollNext() ? i.scrollNext(l) : i.scrollTo(0, l);
    }
    return {
      name: 'autoplay',
      options: o,
      init: function (a, u) {
        i = a;
        const { mergeOptions: y, optionsAtMedia: g } = u,
          O = y(n, t.globalOptions),
          m = y(O, o);
        if (((e = g(m)), i.scrollSnapList().length <= 1)) return;
        (l = e.jump), (r = !1);
        const { eventStore: I, ownerDocument: v } = i.internalEngine(),
          b = i.rootNode(),
          w = (e.rootNode && e.rootNode(b)) || b,
          E = i.containerNode();
        i.on('pointerDown', p),
          e.stopOnInteraction || i.on('pointerUp', c),
          e.stopOnMouseEnter &&
            (I.add(w, 'mouseenter', () => {
              (s = !1), p();
            }),
            e.stopOnInteraction ||
              I.add(w, 'mouseleave', () => {
                (s = !0), c();
              })),
          e.stopOnFocusIn &&
            (I.add(E, 'focusin', p),
            e.stopOnInteraction || I.add(E, 'focusout', c)),
          I.add(v, 'visibilitychange', d),
          e.playOnInit && !f() && c();
      },
      destroy: function () {
        i.off('pointerDown', p).off('pointerUp', c), p(), (r = !0), (a = !1);
      },
      play: y,
      stop: function () {
        a && p();
      },
      reset: function () {
        a && y();
      },
      isPlaying: function () {
        return a;
      },
    };
  }
  return (t.globalOptions = void 0), t;
});
