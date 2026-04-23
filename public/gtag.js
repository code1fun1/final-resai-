/* eslint-disable */
!(function () {
  var t,
    e = {
      resource: { version: '1', macros: [], tags: [], predicates: [], rules: [] },
      runtime: [],
      blob: { 1: '1' }
    },
    n = function (t) {
      var e = 0;
      return function () {
        return e < t.length ? { done: !1, value: t[e++] } : { done: !0 };
      };
    },
    r =
      'function' == typeof Object.defineProperties
        ? Object.defineProperty
        : function (t, e, n) {
            return (t == Array.prototype || t == Object.prototype || (t[e] = n.value), t);
          },
    i = (function (t) {
      for (
        var e = [
            'object' == typeof globalThis && globalThis,
            t,
            'object' == typeof window && window,
            'object' == typeof self && self,
            'object' == typeof global && global
          ],
          n = 0;
        n < e.length;
        ++n
      ) {
        var r = e[n];
        if (r && r.Math == Math) return r;
      }
      throw Error('Cannot find global object');
    })(this),
    a = function (t, e) {
      if (e)
        t: {
          for (var n = i, a = t.split('.'), o = 0; o < a.length - 1; o++) {
            var s = a[o];
            if (!(s in n)) break t;
            n = n[s];
          }
          var c = a[a.length - 1],
            u = n[c],
            l = e(u);
          l != u && null != l && r(n, c, { configurable: !0, writable: !0, value: l });
        }
    };
  a('Symbol', function (t) {
    if (t) return t;
    var e = function (t, e) {
      ((this.F = t), r(this, 'description', { configurable: !0, writable: !0, value: e }));
    };
    e.prototype.toString = function () {
      return this.F;
    };
    var n = 'jscomp_symbol_' + ((1e9 * Math.random()) >>> 0) + '_',
      i = 0,
      a = function (t) {
        if (this instanceof a) throw new TypeError('Symbol is not a constructor');
        return new e(n + (t || '') + '_' + i++, t);
      };
    return a;
  });
  var o,
    s =
      'function' == typeof Object.create
        ? Object.create
        : function (t) {
            var e = function () {};
            return ((e.prototype = t), new e());
          };
  if ('function' == typeof Object.setPrototypeOf) o = Object.setPrototypeOf;
  else {
    var c;
    t: {
      var u = {};
      try {
        ((u.__proto__ = { a: !0 }), (c = u.a));
        break t;
      } catch (t) {}
      c = !1;
    }
    o = c
      ? function (t, e) {
          if (((t.__proto__ = e), t.__proto__ !== e)) throw new TypeError(t + ' is not extensible');
          return t;
        }
      : null;
  }
  var l = o,
    f = function (t, e) {
      if (((t.prototype = s(e.prototype)), (t.prototype.constructor = t), l)) l(t, e);
      else
        for (var n in e)
          if ('prototype' != n)
            if (Object.defineProperties) {
              var r = Object.getOwnPropertyDescriptor(e, n);
              r && Object.defineProperty(t, n, r);
            } else t[n] = e[n];
      t.Mo = e.prototype;
    },
    d = function (t) {
      var e = 'undefined' != typeof Symbol && Symbol.iterator && t[Symbol.iterator];
      if (e) return e.call(t);
      if ('number' == typeof t.length) return { next: n(t) };
      throw Error(String(t) + ' is not an iterable or ArrayLike');
    },
    v = function (t) {
      for (var e, n = []; !(e = t.next()).done; ) n.push(e.value);
      return n;
    },
    p = function (t) {
      return t instanceof Array ? t : v(d(t));
    },
    g =
      'function' == typeof Object.assign
        ? Object.assign
        : function (t, e) {
            for (var n = 1; n < arguments.length; n++) {
              var r = arguments[n];
              if (r) for (var i in r) Object.prototype.hasOwnProperty.call(r, i) && (t[i] = r[i]);
            }
            return t;
          };
  a('Object.assign', function (t) {
    return t || g;
  });
  var h,
    m,
    _ = function () {
      for (var t = Number(this), e = [], n = t; n < arguments.length; n++) e[n - t] = arguments[n];
      return e;
    },
    y = this || self,
    b = function (t, e) {
      function n() {}
      ((n.prototype = e.prototype),
        (t.Mo = e.prototype),
        (t.prototype = new n()),
        (t.prototype.constructor = t),
        (t.Kp = function (t, n, r) {
          for (var i = Array(arguments.length - 2), a = 2; a < arguments.length; a++)
            i[a - 2] = arguments[a];
          return e.prototype[n].apply(t, i);
        }));
    };
  function E() {
    for (var t = h, e = {}, n = 0; n < t.length; ++n) e[t[n]] = n;
    return e;
  }
  function S() {
    var t = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return (t += t.toLowerCase() + '0123456789-_') + '.';
  }
  function I(t) {
    ((h = h || S()), (m = m || E()));
    for (var e = [], n = 0; n < t.length; n += 3) {
      var r = n + 1 < t.length,
        i = n + 2 < t.length,
        a = t.charCodeAt(n),
        o = r ? t.charCodeAt(n + 1) : 0,
        s = i ? t.charCodeAt(n + 2) : 0,
        c = a >> 2,
        u = ((3 & a) << 4) | (o >> 4),
        l = ((15 & o) << 2) | (s >> 6),
        f = 63 & s;
      (i || ((f = 64), r || (l = 64)), e.push(h[c], h[u], h[l], h[f]));
    }
    return e.join('');
  }
  function w(t) {
    function e(e) {
      for (; r < t.length; ) {
        var n = t.charAt(r++),
          i = m[n];
        if (null != i) return i;
        if (!/^[\s\xa0]*$/.test(n)) throw Error('Unknown base64 encoding at char: ' + n);
      }
      return e;
    }
    ((h = h || S()), (m = m || E()));
    for (var n = '', r = 0; ; ) {
      var i = e(-1),
        a = e(0),
        o = e(64),
        s = e(64);
      if (64 === s && -1 === i) return n;
      ((n += String.fromCharCode((i << 2) | (a >> 4))),
        64 !== o &&
          ((n += String.fromCharCode(((a << 4) & 240) | (o >> 2))),
          64 !== s && (n += String.fromCharCode(((o << 6) & 192) | s))));
    }
  }
  var x = {};
  function O(t, e) {
    ((x[t] = x[t] || []), (x[t][e] = !0));
  }
  function T(t) {
    var e = x[t];
    if (!e || 0 === e.length) return '';
    for (var n = [], r = 0, i = 0; i < e.length; i++)
      (i % 8 == 0 && i > 0 && (n.push(String.fromCharCode(r)), (r = 0)),
        e[i] && (r |= 1 << (i % 8)));
    return (r > 0 && n.push(String.fromCharCode(r)), I(n.join('')).replace(/\.+$/, ''));
  }
  function A(t) {
    return 'function' == typeof t;
  }
  function C(t) {
    return 'string' == typeof t;
  }
  function N(t) {
    return 'number' == typeof t && !isNaN(t);
  }
  function j(t, e) {
    if (t && Array.isArray(t)) for (var n = 0; n < t.length; n++) if (t[n] && e(t[n])) return t[n];
  }
  function k(t, e) {
    return (
      (!N(t) || !N(e) || t > e) && ((t = 0), (e = 2147483647)),
      Math.floor(Math.random() * (e - t + 1) + t)
    );
  }
  function M(t, e) {
    for (var n = new D(), r = 0; r < t.length; r++) n.set(t[r], !0);
    for (var i = 0; i < e.length; i++) if (n.get(e[i])) return !0;
    return !1;
  }
  function F(t, e) {
    for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && e(n, t[n]);
  }
  function P(t) {
    return (
      !!t &&
      ('[object Arguments]' === Object.prototype.toString.call(t) ||
        Object.prototype.hasOwnProperty.call(t, 'callee'))
    );
  }
  function G(t) {
    return 'false' !== String(t).toLowerCase() && !!t;
  }
  function L(t) {
    var e = [];
    if (Array.isArray(t)) for (var n = 0; n < t.length; n++) e.push(String(t[n]));
    return e;
  }
  function R() {
    return new Date(Date.now()).getTime();
  }
  var D = function () {
    ((this.prefix = 'gtm.'), (this.values = {}));
  };
  function U(t) {
    var e = t;
    return function () {
      if (e) {
        var t = e;
        e = void 0;
        try {
          t();
        } catch (t) {}
      }
    };
  }
  function K(t, e) {
    for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
  }
  function q(t, e) {
    for (var n = [], r = 0; r < t.length; r++) (n.push(t[r]), n.push.apply(n, e[t[r]] || []));
    return n;
  }
  function z(t, e) {
    return t.length >= e.length && t.substring(0, e.length) === e;
  }
  function V(t, e) {
    for (var n = {}, r = n, i = t.split('.'), a = 0; a < i.length - 1; a++) r = r[i[a]] = {};
    return ((r[i[i.length - 1]] = e), n);
  }
  ((D.prototype.set = function (t, e) {
    this.values[this.prefix + t] = e;
  }),
    (D.prototype.get = function (t) {
      return this.values[this.prefix + t];
    }),
    (D.prototype.contains = function (t) {
      return void 0 !== this.get(t);
    }));
  var B,
    W = globalThis.trustedTypes;
  function H() {
    return (
      void 0 === B &&
        (B = (function () {
          var t = null;
          if (!W) return t;
          try {
            var e = function (t) {
              return t;
            };
            t = W.createPolicy('goog#html', { createHTML: e, createScript: e, createScriptURL: e });
          } catch (t) {}
          return t;
        })()),
      B
    );
  }
  var Z = function (t) {
    this.F = t;
  };
  Z.prototype.toString = function () {
    return this.F + '';
  };
  function Y(t, e) {
    throw Error(void 0 === e ? 'unexpected value ' + t + '!' : e);
  }
  var X = Array.prototype.indexOf
    ? function (t, e) {
        return Array.prototype.indexOf.call(t, e, void 0);
      }
    : function (t, e) {
        if ('string' == typeof t)
          return 'string' != typeof e || 1 != e.length ? -1 : t.indexOf(e, 0);
        for (var n = 0; n < t.length; n++) if (n in t && t[n] === e) return n;
        return -1;
      };
  var J = window,
    Q = document,
    $ = navigator;
  var tt = Q.currentScript,
    et = tt && tt.src;
  function nt(t, e) {
    var n = J[t];
    return ((J[t] = void 0 === n ? e : n), J[t]);
  }
  var rt = { async: 1, nonce: 1, onerror: 1, onload: 1, src: 1, type: 1 },
    it = { onload: 1, src: 1, width: 1, height: 1, style: 1 };
  function at(t, e, n) {
    e &&
      F(e, function (e, r) {
        ((e = e.toLowerCase()), n.hasOwnProperty(e) || t.setAttribute(e, r));
      });
  }
  function ot(t, e, n, r, i) {
    var a = Q.createElement('script');
    (at(a, r, rt), (a.type = 'text/javascript'), (a.async = !r || !1 !== r.async));
    var o,
      s,
      c = (function (t) {
        return null === t ? 'null' : void 0 === t ? 'undefined' : t;
      })(t),
      u = H(),
      l = u ? u.createScriptURL(c) : c;
    if (!((o = new Z(l)) instanceof Z)) throw Error('');
    ((s = o.F), (a.src = s));
    var f,
      d,
      v,
      p = a.ownerDocument,
      g =
        null == (v = (d = p = void 0 === p ? document : p).querySelector)
          ? void 0
          : v.call(d, 'script[nonce]');
    if (
      ((f = null == g ? '' : g.nonce || g.getAttribute('nonce') || '') &&
        a.setAttribute('nonce', f),
      e && (a.onload = e),
      n && (a.onerror = n),
      i)
    )
      i.appendChild(a);
    else {
      var h = Q.getElementsByTagName('script')[0] || Q.body || Q.head;
      h.parentNode.insertBefore(a, h);
    }
    return a;
  }
  function st(t, e, n, r, i, a) {
    a = void 0 === a || a;
    var o = i,
      s = !1;
    if (
      (o || ((o = Q.createElement('iframe')), (s = !0)),
      at(o, n, it),
      r &&
        F(r, function (t, e) {
          o.dataset[t] = e;
        }),
      a &&
        ((o.height = '0'),
        (o.width = '0'),
        (o.style.display = 'none'),
        (o.style.visibility = 'hidden')),
      void 0 !== t && (o.src = t),
      s)
    ) {
      var c = (Q.body && Q.body.lastChild) || Q.body || Q.head;
      c.parentNode.insertBefore(o, c);
    }
    return (e && (o.onload = e), o);
  }
  function ct(t, e, n, r) {
    return mt(t, e, n, r);
  }
  function ut(t, e, n, r) {
    t.addEventListener && t.addEventListener(e, n, !!r);
  }
  function lt(t) {
    J.setTimeout(t, 0);
  }
  function ft(t, e, n) {
    var r;
    try {
      r = $.sendBeacon && $.sendBeacon(t);
    } catch (t) {
      O('TAGGING', 15);
    }
    r ? null == e || e() : mt(t, e, n);
  }
  function dt(t, e) {
    try {
      return $.sendBeacon(t, e);
    } catch (t) {
      O('TAGGING', 15);
    }
    return !1;
  }
  var vt = {
    cache: 'no-store',
    credentials: 'include',
    keepalive: !0,
    method: 'POST',
    mode: 'no-cors',
    redirect: 'follow'
  };
  function pt(t, e, n, r, i) {
    if ('function' == typeof J.fetch) {
      var a = Object.assign({}, vt);
      (e && (a.body = e),
        n &&
          (n.attributionReporting && (a.attributionReporting = n.attributionReporting),
          n.browsingTopics && (a.browsingTopics = n.browsingTopics),
          n.credentials && (a.credentials = n.credentials),
          n.mode && (a.mode = n.mode),
          n.method && (a.method = n.method)));
      try {
        var o = J.fetch(t, a);
        if (o)
          return (
            o
              .then(function (t) {
                t && (t.ok || 0 === t.status) ? null == r || r() : null == i || i();
              })
              .catch(function () {
                null == i || i();
              }),
            !0
          );
      } catch (t) {}
    }
    if (n && n.Bi) return (null == i || i(), !1);
    if (e) {
      var s = dt(t, e);
      return (s ? null == r || r() : null == i || i(), s);
    }
    return (_t(t, r, i), !0);
  }
  function gt() {
    return J.performance || void 0;
  }
  function ht() {
    var t = J.webPixelsManager;
    return !!t && void 0 !== t.createShopifyExtend;
  }
  var mt = function (t, e, n, r) {
      var i = new Image(1, 1);
      return (
        at(i, r, {}),
        (i.onload = function () {
          ((i.onload = null), e && e());
        }),
        (i.onerror = function () {
          ((i.onerror = null), n && n());
        }),
        (i.src = t),
        i
      );
    },
    _t = ft,
    yt = /\[object (Boolean|Number|String|Function|Array|Date|RegExp)\]/,
    bt = function (t) {
      if (null == t) return String(t);
      var e = yt.exec(Object.prototype.toString.call(Object(t)));
      return e ? e[1].toLowerCase() : 'object';
    },
    Et = function (t, e) {
      return Object.prototype.hasOwnProperty.call(Object(t), e);
    },
    St = function (t) {
      if (!t || 'object' != bt(t) || t.nodeType || t == t.window) return !1;
      try {
        if (t.constructor && !Et(t, 'constructor') && !Et(t.constructor.prototype, 'isPrototypeOf'))
          return !1;
      } catch (t) {
        return !1;
      }
      for (var e in t);
      return void 0 === e || Et(t, e);
    },
    It = function (t, e) {
      var n,
        r = e || ('array' == bt(t) ? [] : {});
      for (n in t)
        if (Et(t, n)) {
          var i = t[n];
          'array' == bt(i)
            ? ('array' != bt(r[n]) && (r[n] = []), (r[n] = It(i, r[n])))
            : St(i)
              ? (St(r[n]) || (r[n] = {}), (r[n] = It(i, r[n])))
              : (r[n] = i);
        }
      return r;
    },
    wt = function (t) {
      this.message = t;
    };
  function xt(t) {
    var e = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_'[t];
    return void 0 === e
      ? new wt('Value ' + t + ' can not be encoded in web-safe base64 dictionary.')
      : e;
  }
  var Ot = /^[1-9a-zA-Z_-][1-9a-c][1-9a-v]\d$/;
  function Tt(t, e) {
    for (var n = '', r = !0; t > 7; ) {
      var i = 31 & t;
      ((t >>= 5), r ? (r = !1) : (i |= 32), (n = '' + xt(i) + n));
    }
    return ((t <<= 2), r || (t |= 32), '' + xt(t | e) + n);
  }
  var At,
    Ct,
    Nt,
    jt,
    kt = (function () {
      function t(t) {
        return {
          toString: function () {
            return t;
          }
        };
      }
      return {
        Al: t('consent'),
        Xi: t('convert_case_to'),
        Yi: t('convert_false_to'),
        Zi: t('convert_null_to'),
        aj: t('convert_true_to'),
        bj: t('convert_undefined_to'),
        Zo: t('debug_mode_metadata'),
        Fa: t('function'),
        Gh: t('instance_name'),
        Im: t('live_only'),
        Jm: t('malware_disabled'),
        METADATA: t('metadata'),
        Mm: t('original_activity_id'),
        up: t('original_vendor_template_id'),
        tp: t('once_on_load'),
        Lm: t('once_per_event'),
        rk: t('once_per_load'),
        vp: t('priority_override'),
        zp: t('respected_consent_types'),
        Bk: t('setup_tags'),
        yg: t('tag_id'),
        Hk: t('teardown_tags')
      };
    })(),
    Mt = [],
    Ft = [],
    Pt = [],
    Gt = [],
    Lt = [];
  var Rt,
    Dt = [],
    Ut = [];
  function Kt(t, e, n) {
    try {
      return Nt(zt(t, e, n));
    } catch (e) {
      JSON.stringify(t);
    }
    return 2;
  }
  function qt(t) {
    var e = t[kt.Fa];
    if (!e) throw Error('Error: No function name given for function call.');
    return !!Ct[e];
  }
  var zt = function (t, e, n) {
      n = n || [];
      var r,
        i = {};
      for (r in t) t.hasOwnProperty(r) && (i[r] = Vt(t[r], e, n));
      return i;
    },
    Vt = function (t, e, n) {
      var r;
      if (Array.isArray(t))
        switch (t[0]) {
          case 'function_id':
            return t[1];
          case 'list':
            r = [];
            for (var i = 1; i < t.length; i++) r.push(Vt(t[i], e, n));
            return r;
          case 'macro':
            var a = t[1];
            if (n[a]) return;
            var o = Mt[a];
            if (!o || e.isBlocked(o)) return;
            n[a] = !0;
            var s = String(o[kt.Gh]);
            try {
              var c = zt(o, e, n);
              ((c.vtp_gtmEventId = e.id),
                e.priorityId && (c.vtp_gtmPriorityId = e.priorityId),
                (r = Bt(c, { event: e, index: a, type: 2, name: s })),
                Rt && (r = Rt.nn(r, c)));
            } catch (t) {
              (e.logMacroError && e.logMacroError(t, Number(a), s), (r = !1));
            }
            return ((n[a] = !1), r);
          case 'map':
            r = {};
            for (var u = 1; u < t.length; u += 2) r[Vt(t[u], e, n)] = Vt(t[u + 1], e, n);
            return r;
          case 'template':
            r = [];
            for (var l = !1, f = 1; f < t.length; f++) {
              var d = Vt(t[f], e, n);
              (jt && (l = l || jt.eo(d)), r.push(d));
            }
            return jt && l ? jt.sn(r) : r.join('');
          case 'escape':
            if (
              ((r = Vt(t[1], e, n)), jt && Array.isArray(t[1]) && 'macro' === t[1][0] && jt.fo(t))
            )
              return jt.vo(r);
            r = String(r);
            for (var v = 2; v < t.length; v++) wc[t[v]] && (r = wc[t[v]](r));
            return r;
          case 'tag':
            var p = t[1];
            if (!Gt[p]) throw Error('Unable to resolve tag reference ' + p + '.');
            return { Rk: t[2], index: p };
          case 'zb':
            var g = { arg0: t[2], arg1: t[3], ignore_case: t[5] };
            g[kt.Fa] = t[1];
            var h = Kt(g, e, n),
              m = !!t[4];
            return m || 2 !== h ? m !== (1 === h) : null;
          default:
            throw Error('Attempting to expand unknown Value type: ' + t[0] + '.');
        }
      return t;
    },
    Bt = function (t, e) {
      var n = t[kt.Fa],
        r = e && e.event;
      if (!n) throw Error('Error: No function name given for function call.');
      var i,
        a,
        o,
        s,
        c = Ct[n],
        u =
          e &&
          2 === e.type &&
          (null == r ? void 0 : r.reportMacroDiscrepancy) &&
          c &&
          -1 !== Dt.indexOf(n),
        l = {};
      for (i in t) t.hasOwnProperty(i) && z(i, 'vtp_') && c && (l[i] = t[i]);
      if ((c && r && r.cachedModelValues && (l.vtp_gtmCachedValues = r.cachedModelValues), e)) {
        if (null == e.name) {
          var f;
          t: {
            var d = e.type,
              v = e.index;
            if (null == v) f = '';
            else {
              var p;
              switch (d) {
                case 2:
                  p = Mt[v];
                  break;
                case 1:
                  p = Gt[v];
                  break;
                default:
                  f = '';
                  break t;
              }
              var g = p && p[kt.Gh];
              f = g ? String(g) : '';
            }
          }
          e.name = f;
        }
        c && ((l.vtp_gtmEntityIndex = e.index), (l.vtp_gtmEntityName = e.name));
      }
      if (u && -1 === Ut.indexOf(n)) {
        Ut.push(n);
        var h = R();
        a = c(l);
        var m = R() - h,
          _ = R();
        ((o = At(n, e)), (s = m - (R() - _)));
      } else (c && (a = c(l)), (!c || u) && (o = At(n, e)));
      if (u && r) {
        var y;
        r.reportMacroDiscrepancy(r.id, n, void 0, !0);
        t: {
          var b = a;
          if (null == b || Array.isArray(b) || St(b)) y = !0;
          else {
            switch (typeof b) {
              case 'boolean':
              case 'number':
              case 'string':
              case 'function':
                y = !0;
                break t;
            }
            y = !1;
          }
        }
        (y
          ? (Array.isArray(a)
              ? Array.isArray(o)
              : St(a)
                ? St(o)
                : 'function' == typeof a
                  ? 'function' == typeof o
                  : a === o) || r.reportMacroDiscrepancy(r.id, n)
          : a !== o && r.reportMacroDiscrepancy(r.id, n),
          void 0 !== s && r.reportMacroDiscrepancy(r.id, n, s));
      }
      return c ? a : o;
    },
    Wt = function (t, e, n) {
      var r;
      ((r = Error.call(this, n)),
        (this.message = r.message),
        'stack' in r && (this.stack = r.stack),
        (this.permissionId = t),
        (this.parameters = e),
        (this.name = 'PermissionError'));
    };
  function Ht(t) {
    function e(t) {
      for (var e = 0; e < t.length; e++) r[t[e]] = !0;
    }
    for (
      var n = [],
        r = [],
        i = (function (t) {
          var e = [];
          return function (n) {
            return (void 0 === e[n] && (e[n] = Kt(Pt[n], t)), e[n]);
          };
        })(t),
        a = 0;
      a < Ft.length;
      a++
    ) {
      var o = Ft[a],
        s = Zt(o, i);
      if (s) {
        for (var c = o.add || [], u = 0; u < c.length; u++) n[c[u]] = !0;
        e(o.block || []);
      } else null === s && e(o.block || []);
    }
    for (var l = [], f = 0; f < Gt.length; f++) n[f] && !r[f] && (l[f] = !0);
    return l;
  }
  function Zt(t, e) {
    for (var n = t.if || [], r = 0; r < n.length; r++) {
      var i = e(n[r]);
      if (0 === i) return !1;
      if (2 === i) return null;
    }
    for (var a = t.unless || [], o = 0; o < a.length; o++) {
      var s = e(a[o]);
      if (2 === s) return null;
      if (1 === s) return !1;
    }
    return !0;
  }
  function Yt(t, e) {
    return (
      e[kt.Xi] && 'string' == typeof t && (t = 1 === e[kt.Xi] ? t.toLowerCase() : t.toUpperCase()),
      e.hasOwnProperty(kt.Zi) && null === t && (t = e[kt.Zi]),
      e.hasOwnProperty(kt.bj) && void 0 === t && (t = e[kt.bj]),
      e.hasOwnProperty(kt.aj) && !0 === t && (t = e[kt.aj]),
      e.hasOwnProperty(kt.Yi) && !1 === t && (t = e[kt.Yi]),
      t
    );
  }
  function Xt(t, e, n, r) {
    if (t)
      for (var i = 0; i < t.length; i++) {
        var a = void 0,
          o = 'A policy function denied the permission request';
        try {
          ((a = t[i](e, n, r)), (o += '.'));
        } catch (t) {
          o =
            'string' == typeof t
              ? o + ': ' + t
              : t instanceof Error
                ? o + ': ' + t.message
                : o + '.';
        }
        if (!a) throw new Wt(n, r, o);
      }
  }
  function Jt(t, e) {
    var n = (void 0).Pp();
    return function (r) {
      var i = _.apply(1, arguments);
      if (r) {
        var a = n.F(r),
          o = n.F('all');
        if (a || o) {
          var s = e.apply(void 0, [r].concat(p(i)));
          (Xt(a, t, r, s), Xt(o, t, r, s));
        }
      }
    };
  }
  function Qt(t, e) {
    if ('' === t) return e;
    var n = Number(t);
    return isNaN(n) ? e : n;
  }
  (f(Wt, Error),
    (Wt.prototype.getMessage = function () {
      return this.message;
    }));
  var $t = [],
    te = {};
  function ee(t) {
    return void 0 !== $t[t] && $t[t];
  }
  var ne = [];
  function re(t, e) {
    ne[t] = e;
    var n = (function (t) {
      switch (t) {
        case 1:
          return 0;
        case 38:
          return 13;
        case 50:
          return 10;
        case 51:
          return 11;
        case 53:
          return 1;
        case 54:
          return 2;
        case 52:
          return 7;
        case 75:
          return 3;
        case 103:
          return 14;
        case 114:
          return 12;
        case 115:
          return 4;
        case 116:
          return 5;
        case 135:
          return 9;
        case 136:
          return 6;
      }
    })(t);
    void 0 !== n && ($t[n] = e);
  }
  function ie(t) {
    re(t, !0);
  }
  function ae(t) {
    return !!ne[t];
  }
  (ie(39),
    ie(34),
    ie(35),
    ie(36),
    ie(56),
    ie(145),
    ie(18),
    ie(153),
    ie(144),
    ie(74),
    ie(120),
    ie(58),
    ie(5),
    ie(111),
    ie(139),
    ie(87),
    ie(92),
    ie(117),
    ie(159),
    ie(132),
    ie(20),
    ie(72),
    ie(113),
    ie(154),
    ie(116),
    re(23, !1),
    ie(24),
    (te[1] = Qt('1', 6e4)),
    (te[3] = Qt('10', 1)),
    (te[2] = Qt('', 50)),
    ie(29),
    (function (t, e) {
      for (var n = !1, r = !1, i = 0; n === r; )
        if (
          ((n = 0 == (1 & ((4294967296 * Math.random()) | 0))),
          (r = 0 == (1 & ((4294967296 * Math.random()) | 0))),
          ++i > 30)
        )
          return;
      ie(n ? e : t);
    })(26, 25),
    ie(9),
    ie(91),
    ie(140),
    ie(123),
    ie(157),
    ie(136),
    ie(127),
    ie(27),
    ie(69),
    ie(135),
    ie(51),
    ie(50),
    ie(95),
    ie(86),
    ie(103),
    ie(112),
    ie(63),
    ie(152),
    ie(101),
    ie(108),
    ie(134),
    ie(115),
    ie(96),
    ie(31),
    ie(22),
    ie(151),
    ie(97),
    ie(15),
    ie(19),
    ie(99),
    ie(105),
    ie(99),
    ie(124),
    ie(12),
    ie(76),
    ie(77),
    ie(81),
    ie(79),
    ie(28),
    ie(80),
    ie(90),
    ie(118),
    ie(13));
  var oe = {},
    se =
      ((oe.uaa = !0),
      (oe.uab = !0),
      (oe.uafvl = !0),
      (oe.uamb = !0),
      (oe.uam = !0),
      (oe.uap = !0),
      (oe.uapv = !0),
      (oe.uaw = !0),
      [
        'matches',
        'webkitMatchesSelector',
        'mozMatchesSelector',
        'msMatchesSelector',
        'oMatchesSelector'
      ]),
    ce = new D(),
    ue = {
      m: {
        Ea: 'ad_personalization',
        T: 'ad_storage',
        U: 'ad_user_data',
        Z: 'analytics_storage',
        Pd: 'region',
        aa: 'consent_updated',
        Pg: 'wait_for_update',
        El: 'app_remove',
        Fl: 'app_store_refund',
        Gl: 'app_store_subscription_cancel',
        Hl: 'app_store_subscription_convert',
        Il: 'app_store_subscription_renew',
        Jl: 'consent_update',
        gj: 'add_payment_info',
        ij: 'add_shipping_info',
        dd: 'add_to_cart',
        ed: 'remove_from_cart',
        jj: 'view_cart',
        uc: 'begin_checkout',
        fd: 'select_item',
        Hb: 'view_item_list',
        ac: 'select_promotion',
        Ib: 'view_promotion',
        cb: 'purchase',
        gd: 'refund',
        lb: 'view_item',
        kj: 'add_to_wishlist',
        Kl: 'exception',
        Ll: 'first_open',
        Ml: 'first_visit',
        la: 'gtag.config',
        qb: 'gtag.get',
        Nl: 'in_app_purchase',
        vc: 'page_view',
        Ol: 'screen_view',
        Pl: 'session_start',
        Ql: 'source_update',
        Rl: 'timing_complete',
        Sl: 'track_social',
        hd: 'user_engagement',
        Tl: 'user_id_update',
        Sd: 'gclid_link_decoration_source',
        Td: 'gclid_storage_source',
        Jb: 'gclgb',
        eb: 'gclid',
        lj: 'gclid_len',
        jd: 'gclgs',
        kd: 'gcllp',
        ld: 'gclst',
        qa: 'ads_data_redaction',
        Ud: 'gad_source',
        Vd: 'gad_source_src',
        wc: 'gclid_url',
        mj: 'gclsrc',
        Wd: 'gbraid',
        md: 'wbraid',
        ya: 'allow_ad_personalization_signals',
        yf: 'allow_custom_scripts',
        Xd: 'allow_direct_google_requests',
        zf: 'allow_display_features',
        Af: 'allow_enhanced_conversions',
        rb: 'allow_google_signals',
        Xa: 'allow_interest_groups',
        Ul: 'app_id',
        Vl: 'app_installer_id',
        Wl: 'app_name',
        Xl: 'app_version',
        xb: 'auid',
        Yl: 'auto_detection_enabled',
        xc: 'aw_remarketing',
        Xg: 'aw_remarketing_only',
        Bf: 'discount',
        Cf: 'aw_feed_country',
        Df: 'aw_feed_language',
        na: 'items',
        Ef: 'aw_merchant_id',
        nj: 'aw_basket_type',
        Yd: 'campaign_content',
        Zd: 'campaign_id',
        ae: 'campaign_medium',
        be: 'campaign_name',
        ce: 'campaign',
        de: 'campaign_source',
        ee: 'campaign_term',
        yb: 'client_id',
        oj: 'rnd',
        Yg: 'consent_update_type',
        Zl: 'content_group',
        am: 'content_type',
        zb: 'conversion_cookie_prefix',
        fe: 'conversion_id',
        Ja: 'conversion_linker',
        Zg: 'conversion_linker_disabled',
        yc: 'conversion_api',
        Ff: 'cookie_deprecation',
        fb: 'cookie_domain',
        hb: 'cookie_expires',
        mb: 'cookie_flags',
        zc: 'cookie_name',
        Ab: 'cookie_path',
        Ya: 'cookie_prefix',
        bc: 'cookie_update',
        nd: 'country',
        Oa: 'currency',
        ah: 'customer_buyer_stage',
        he: 'customer_lifetime_value',
        bh: 'customer_loyalty',
        eh: 'customer_ltv_bucket',
        ie: 'custom_map',
        fh: 'gcldc',
        Ac: 'dclid',
        bm: 'debug_mode',
        oa: 'developer_id',
        dm: 'disable_merchant_reported_purchases',
        Bc: 'dc_custom_params',
        fm: 'dc_natural_search',
        pj: 'dynamic_event_settings',
        qj: 'affiliation',
        Gf: 'checkout_option',
        gh: 'checkout_step',
        rj: 'coupon',
        je: 'item_list_name',
        hh: 'list_name',
        gm: 'promotions',
        ke: 'shipping',
        ih: 'tax',
        Hf: 'engagement_time_msec',
        If: 'enhanced_client_id',
        Jf: 'enhanced_conversions',
        sj: 'enhanced_conversions_automatic_settings',
        Kf: 'estimated_delivery_date',
        jh: 'euid_logged_in_state',
        me: 'event_callback',
        hm: 'event_category',
        Lb: 'event_developer_id_string',
        im: 'event_label',
        Cc: 'event',
        Lf: 'event_settings',
        Mf: 'event_timeout',
        jm: 'description',
        km: 'fatal',
        lm: 'experiments',
        kh: 'firebase_id',
        od: 'first_party_collection',
        Nf: '_x_20',
        Mb: '_x_19',
        tj: 'fledge_drop_reason',
        uj: 'fledge',
        vj: 'flight_error_code',
        wj: 'flight_error_message',
        xj: 'fl_activity_category',
        yj: 'fl_activity_group',
        mh: 'fl_advertiser_id',
        zj: 'fl_ar_dedupe',
        ne: 'match_id',
        Aj: 'fl_random_number',
        Bj: 'tran',
        Cj: 'u',
        Of: 'gac_gclid',
        pd: 'gac_wbraid',
        Dj: 'gac_wbraid_multiple_conversions',
        Ej: 'ga_restrict_domain',
        Fj: 'ga_temp_client_id',
        om: 'ga_temp_ecid',
        qd: 'gdpr_applies',
        Gj: 'geo_granularity',
        fc: 'value_callback',
        Nb: 'value_key',
        Pb: 'google_analysis_params',
        rd: '_google_ng',
        sd: 'google_signals',
        Hj: 'google_tld',
        Pf: 'gpp_sid',
        Qf: 'gpp_string',
        Rf: 'groups',
        Ij: 'gsa_experiment_id',
        oe: 'gtag_event_feature_usage',
        Jj: 'gtm_up',
        hc: 'iframe_state',
        pe: 'ignore_referrer',
        nh: 'internal_traffic_results',
        jc: 'is_legacy_converted',
        kc: 'is_legacy_loaded',
        Sf: 'is_passthrough',
        Dc: '_lps',
        nb: 'language',
        Tf: 'legacy_developer_id_string',
        Ka: 'linker',
        ud: 'accept_incoming',
        Qb: 'decorate_forms',
        da: 'domains',
        mc: 'url_position',
        Uf: 'merchant_feed_label',
        Vf: 'merchant_feed_language',
        Wf: 'merchant_id',
        Kj: 'method',
        qm: 'name',
        Lj: 'navigation_type',
        qe: 'new_customer',
        Xf: 'non_interaction',
        rm: 'optimize_id',
        Mj: 'page_hostname',
        se: 'page_path',
        Pa: 'page_referrer',
        sb: 'page_title',
        Nj: 'passengers',
        Oj: 'phone_conversion_callback',
        sm: 'phone_conversion_country_code',
        Pj: 'phone_conversion_css_class',
        tm: 'phone_conversion_ids',
        Qj: 'phone_conversion_number',
        Rj: 'phone_conversion_options',
        vm: '_platinum_request_status',
        oh: '_protected_audience_enabled',
        te: 'quantity',
        Yf: 'redact_device_info',
        ph: 'referral_exclusion_definition',
        cp: '_request_start_time',
        Bb: 'restricted_data_processing',
        wm: 'retoken',
        xm: 'sample_rate',
        qh: 'screen_name',
        nc: 'screen_resolution',
        Sj: '_script_source',
        ym: 'search_term',
        ib: 'send_page_view',
        Ec: 'send_to',
        Fc: 'server_container_url',
        ue: 'session_duration',
        Zf: 'session_engaged',
        rh: 'session_engaged_time',
        Rb: 'session_id',
        cg: 'session_number',
        ve: '_shared_user_id',
        we: 'delivery_postal_code',
        ep: '_tag_firing_delay',
        fp: '_tag_firing_time',
        hp: 'temporary_client_id',
        sh: '_timezone',
        th: 'topmost_url',
        zm: 'tracking_id',
        uh: 'traffic_type',
        Qa: 'transaction_id',
        Sb: 'transport_url',
        Tj: 'trip_type',
        Gc: 'update',
        tb: 'url_passthrough',
        Uj: 'uptgs',
        xe: '_user_agent_architecture',
        ye: '_user_agent_bitness',
        ze: '_user_agent_full_version_list',
        Ae: '_user_agent_mobile',
        Be: '_user_agent_model',
        Ce: '_user_agent_platform',
        De: '_user_agent_platform_version',
        Ee: '_user_agent_wow64',
        Ra: 'user_data',
        wh: 'user_data_auto_latency',
        xh: 'user_data_auto_meta',
        yh: 'user_data_auto_multi',
        zh: 'user_data_auto_selectors',
        Ah: 'user_data_auto_status',
        Cb: 'user_data_mode',
        dg: 'user_data_settings',
        La: 'user_id',
        Db: 'user_properties',
        Vj: '_user_region',
        eg: 'us_privacy_string',
        za: 'value',
        Wj: 'wbraid_multiple_conversions',
        wd: '_fpm_parameters',
        Eh: '_host_name',
        hk: '_in_page_command',
        ik: '_ip_override',
        lk: '_is_passthrough_cid',
        Tb: 'non_personalized_ads',
        Ph: '_sst_parameters',
        Kb: 'conversion_label',
        xa: 'page_location',
        Ob: 'global_developer_id_string',
        vd: 'tc_privacy_string'
      }
    },
    le = {};
  Object.freeze(
    ((le[ue.m.ya] = 1),
    (le[ue.m.zf] = 1),
    (le[ue.m.Af] = 1),
    (le[ue.m.rb] = 1),
    (le[ue.m.na] = 1),
    (le[ue.m.fb] = 1),
    (le[ue.m.hb] = 1),
    (le[ue.m.mb] = 1),
    (le[ue.m.zc] = 1),
    (le[ue.m.Ab] = 1),
    (le[ue.m.Ya] = 1),
    (le[ue.m.bc] = 1),
    (le[ue.m.ie] = 1),
    (le[ue.m.oa] = 1),
    (le[ue.m.pj] = 1),
    (le[ue.m.me] = 1),
    (le[ue.m.Lf] = 1),
    (le[ue.m.Mf] = 1),
    (le[ue.m.od] = 1),
    (le[ue.m.Ej] = 1),
    (le[ue.m.Pb] = 1),
    (le[ue.m.sd] = 1),
    (le[ue.m.Hj] = 1),
    (le[ue.m.Rf] = 1),
    (le[ue.m.nh] = 1),
    (le[ue.m.jc] = 1),
    (le[ue.m.kc] = 1),
    (le[ue.m.Ka] = 1),
    (le[ue.m.ph] = 1),
    (le[ue.m.Bb] = 1),
    (le[ue.m.ib] = 1),
    (le[ue.m.Ec] = 1),
    (le[ue.m.Fc] = 1),
    (le[ue.m.ue] = 1),
    (le[ue.m.rh] = 1),
    (le[ue.m.we] = 1),
    (le[ue.m.Sb] = 1),
    (le[ue.m.Gc] = 1),
    (le[ue.m.dg] = 1),
    (le[ue.m.Db] = 1),
    (le[ue.m.Ph] = 1),
    le)
  );
  Object.freeze([ue.m.xa, ue.m.Pa, ue.m.sb, ue.m.nb, ue.m.qh, ue.m.La, ue.m.kh, ue.m.Zl]);
  var fe = {},
    de =
      (Object.freeze(
        ((fe[ue.m.El] = 1),
        (fe[ue.m.Fl] = 1),
        (fe[ue.m.Gl] = 1),
        (fe[ue.m.Hl] = 1),
        (fe[ue.m.Il] = 1),
        (fe[ue.m.Ll] = 1),
        (fe[ue.m.Ml] = 1),
        (fe[ue.m.Nl] = 1),
        (fe[ue.m.Pl] = 1),
        (fe[ue.m.hd] = 1),
        fe)
      ),
      {}),
    ve =
      (Object.freeze(
        ((de[ue.m.gj] = 1),
        (de[ue.m.ij] = 1),
        (de[ue.m.dd] = 1),
        (de[ue.m.ed] = 1),
        (de[ue.m.jj] = 1),
        (de[ue.m.uc] = 1),
        (de[ue.m.fd] = 1),
        (de[ue.m.Hb] = 1),
        (de[ue.m.ac] = 1),
        (de[ue.m.Ib] = 1),
        (de[ue.m.cb] = 1),
        (de[ue.m.gd] = 1),
        (de[ue.m.lb] = 1),
        (de[ue.m.kj] = 1),
        de)
      ),
      Object.freeze([ue.m.ya, ue.m.Xd, ue.m.rb, ue.m.bc, ue.m.od, ue.m.pe, ue.m.ib, ue.m.Gc])),
    pe =
      (Object.freeze([].concat(p(ve))),
      Object.freeze([ue.m.hb, ue.m.Mf, ue.m.ue, ue.m.rh, ue.m.Hf])),
    ge = (Object.freeze([].concat(p(pe))), {}),
    he = ((ge[ue.m.T] = '1'), (ge[ue.m.Z] = '2'), (ge[ue.m.U] = '3'), (ge[ue.m.Ea] = '4'), {});
  Object.freeze(
    ((he.search = 's'),
    (he.youtube = 'y'),
    (he.playstore = 'p'),
    (he.shopping = 'h'),
    (he.ads = 'a'),
    (he.maps = 'm'),
    he)
  );
  Object.freeze(ue.m);
  var me = {};
  ((me[ue.m.aa] = 'gcu'),
    (me[ue.m.Jb] = 'gclgb'),
    (me[ue.m.eb] = 'gclaw'),
    (me[ue.m.lj] = 'gclid_len'),
    (me[ue.m.jd] = 'gclgs'),
    (me[ue.m.kd] = 'gcllp'),
    (me[ue.m.ld] = 'gclst'),
    (me[ue.m.xb] = 'auid'),
    (me[ue.m.Bf] = 'dscnt'),
    (me[ue.m.Cf] = 'fcntr'),
    (me[ue.m.Df] = 'flng'),
    (me[ue.m.Ef] = 'mid'),
    (me[ue.m.nj] = 'bttype'),
    (me[ue.m.yb] = 'gacid'),
    (me[ue.m.Kb] = 'label'),
    (me[ue.m.yc] = 'capi'),
    (me[ue.m.Ff] = 'pscdl'),
    (me[ue.m.Oa] = 'currency_code'),
    (me[ue.m.ah] = 'clobs'),
    (me[ue.m.he] = 'vdltv'),
    (me[ue.m.bh] = 'clolo'),
    (me[ue.m.eh] = 'clolb'),
    (me[ue.m.bm] = '_dbg'),
    (me[ue.m.Kf] = 'oedeld'),
    (me[ue.m.Lb] = 'edid'),
    (me[ue.m.tj] = 'fdr'),
    (me[ue.m.uj] = 'fledge'),
    (me[ue.m.Of] = 'gac'),
    (me[ue.m.pd] = 'gacgb'),
    (me[ue.m.Dj] = 'gacmcov'),
    (me[ue.m.qd] = 'gdpr'),
    (me[ue.m.Ob] = 'gdid'),
    (me[ue.m.rd] = '_ng'),
    (me[ue.m.Pf] = 'gpp_sid'),
    (me[ue.m.Qf] = 'gpp'),
    (me[ue.m.Ij] = 'gsaexp'),
    (me[ue.m.oe] = '_tu'),
    (me[ue.m.hc] = 'frm'),
    (me[ue.m.Sf] = 'gtm_up'),
    (me[ue.m.Dc] = 'lps'),
    (me[ue.m.Tf] = 'did'),
    (me[ue.m.Uf] = 'fcntr'),
    (me[ue.m.Vf] = 'flng'),
    (me[ue.m.Wf] = 'mid'),
    (me[ue.m.qe] = void 0),
    (me[ue.m.sb] = 'tiba'),
    (me[ue.m.Bb] = 'rdp'),
    (me[ue.m.Rb] = 'ecsid'),
    (me[ue.m.ve] = 'ga_uid'),
    (me[ue.m.we] = 'delopc'),
    (me[ue.m.vd] = 'gdpr_consent'),
    (me[ue.m.Qa] = 'oid'),
    (me[ue.m.Uj] = 'uptgs'),
    (me[ue.m.xe] = 'uaa'),
    (me[ue.m.ye] = 'uab'),
    (me[ue.m.ze] = 'uafvl'),
    (me[ue.m.Ae] = 'uamb'),
    (me[ue.m.Be] = 'uam'),
    (me[ue.m.Ce] = 'uap'),
    (me[ue.m.De] = 'uapv'),
    (me[ue.m.Ee] = 'uaw'),
    (me[ue.m.wh] = 'ec_lat'),
    (me[ue.m.xh] = 'ec_meta'),
    (me[ue.m.yh] = 'ec_m'),
    (me[ue.m.zh] = 'ec_sel'),
    (me[ue.m.Ah] = 'ec_s'),
    (me[ue.m.Cb] = 'ec_mode'),
    (me[ue.m.La] = 'userId'),
    (me[ue.m.eg] = 'us_privacy'),
    (me[ue.m.za] = 'value'),
    (me[ue.m.Wj] = 'mcov'),
    (me[ue.m.Eh] = 'hn'),
    (me[ue.m.hk] = 'gtm_ee'),
    (me[ue.m.Tb] = 'npa'),
    (me[ue.m.fe] = null),
    (me[ue.m.nc] = null),
    (me[ue.m.nb] = null),
    (me[ue.m.na] = null),
    (me[ue.m.xa] = null),
    (me[ue.m.Pa] = null),
    (me[ue.m.th] = null),
    (me[ue.m.wd] = null),
    (me[ue.m.Sd] = null),
    (me[ue.m.Td] = null),
    (me[ue.m.Pb] = null));
  if (Q.querySelectorAll)
    try {
      var _e = Q.querySelectorAll(':root');
      _e && 1 == _e.length && _e[0] == Q.documentElement && !0;
    } catch (t) {}
  function ye(t, e) {
    ((this.blockSize = -1),
      (this.blockSize = 64),
      (this.N = y.Uint8Array ? new Uint8Array(this.blockSize) : Array(this.blockSize)),
      (this.O = this.K = 0),
      (this.F = []),
      (this.ba = t),
      (this.P = e),
      (this.fa = y.Int32Array ? new Int32Array(64) : Array(64)),
      void 0 === Ie && (Ie = y.Int32Array ? new Int32Array(we) : we),
      this.reset());
  }
  b(ye, function () {
    this.blockSize = -1;
  });
  for (var be = [], Ee = 0; Ee < 63; Ee++) be[Ee] = 0;
  [].concat(128, be);
  ye.prototype.reset = function () {
    var t;
    if (((this.O = this.K = 0), y.Int32Array)) t = new Int32Array(this.P);
    else {
      var e = this.P,
        n = e.length;
      if (n > 0) {
        for (var r = Array(n), i = 0; i < n; i++) r[i] = e[i];
        t = r;
      } else t = [];
    }
    this.F = t;
  };
  var Se = function (t) {
    for (var e = t.N, n = t.fa, r = 0, i = 0; i < e.length; )
      ((n[r++] = (e[i] << 24) | (e[i + 1] << 16) | (e[i + 2] << 8) | e[i + 3]), (i = 4 * r));
    for (var a = 16; a < 64; a++) {
      var o = 0 | n[a - 15],
        s = 0 | n[a - 2];
      n[a] =
        ((((0 | n[a - 16]) + (((o >>> 7) | (o << 25)) ^ ((o >>> 18) | (o << 14)) ^ (o >>> 3))) |
          0) +
          (((0 | n[a - 7]) + (((s >>> 17) | (s << 15)) ^ ((s >>> 19) | (s << 13)) ^ (s >>> 10))) |
            0)) |
        0;
    }
    for (
      var c = 0 | t.F[0],
        u = 0 | t.F[1],
        l = 0 | t.F[2],
        f = 0 | t.F[3],
        d = 0 | t.F[4],
        v = 0 | t.F[5],
        p = 0 | t.F[6],
        g = 0 | t.F[7],
        h = 0;
      h < 64;
      h++
    ) {
      var m =
          ((((c >>> 2) | (c << 30)) ^ ((c >>> 13) | (c << 19)) ^ ((c >>> 22) | (c << 10))) +
            ((c & u) ^ (c & l) ^ (u & l))) |
          0,
        _ =
          (((g + (((d >>> 6) | (d << 26)) ^ ((d >>> 11) | (d << 21)) ^ ((d >>> 25) | (d << 7)))) |
            0) +
            ((((((d & v) ^ (~d & p)) + (0 | Ie[h])) | 0) + (0 | n[h])) | 0)) |
          0;
      ((g = p), (p = v), (v = d), (d = (f + _) | 0), (f = l), (l = u), (u = c), (c = (_ + m) | 0));
    }
    ((t.F[0] = (t.F[0] + c) | 0),
      (t.F[1] = (t.F[1] + u) | 0),
      (t.F[2] = (t.F[2] + l) | 0),
      (t.F[3] = (t.F[3] + f) | 0),
      (t.F[4] = (t.F[4] + d) | 0),
      (t.F[5] = (t.F[5] + v) | 0),
      (t.F[6] = (t.F[6] + p) | 0),
      (t.F[7] = (t.F[7] + g) | 0));
  };
  ye.prototype.update = function (t, e) {
    void 0 === e && (e = t.length);
    var n = 0,
      r = this.K;
    if ('string' == typeof t)
      for (; n < e; )
        ((this.N[r++] = t.charCodeAt(n++)), r == this.blockSize && (Se(this), (r = 0)));
    else {
      var i,
        a = typeof t;
      if (
        'array' != (i = 'object' != a ? a : t ? (Array.isArray(t) ? 'array' : a) : 'null') &&
        ('object' != i || 'number' != typeof t.length)
      )
        throw Error('message must be string or array');
      for (; n < e; ) {
        var o = t[n++];
        if (!('number' == typeof o && 0 <= o && 255 >= o && o == (0 | o)))
          throw Error('message must be a byte array');
        ((this.N[r++] = o), r == this.blockSize && (Se(this), (r = 0)));
      }
    }
    ((this.K = r), (this.O += e));
  };
  var Ie,
    we = [
      1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221,
      3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580,
      3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986,
      2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895,
      666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037,
      2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344,
      430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779,
      1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298
    ];
  b(function () {
    ye.call(this, 8, xe);
  }, ye);
  var xe = [
    1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225
  ];
  var Oe = '1000',
    Te =
      '101509157~103116025~103130498~103130500~103136993~103136995~103200001~103207802~103233427~103252644~103252646~103263073~103301114~103301116',
    Ae = { gi: Number('10') || 0, zn: Number(Oe) || 0, Uo: Te };
  function Ce(t) {
    O('GTM', t);
  }
  var Ne = {},
    je =
      ((Ne[ue.m.Xa] = 1),
      (Ne[ue.m.Fc] = 2),
      (Ne[ue.m.Sb] = 2),
      (Ne[ue.m.qa] = 3),
      (Ne[ue.m.he] = 4),
      (Ne[ue.m.yf] = 5),
      (Ne[ue.m.bc] = 6),
      (Ne[ue.m.Ya] = 6),
      (Ne[ue.m.fb] = 6),
      (Ne[ue.m.zc] = 6),
      (Ne[ue.m.Ab] = 6),
      (Ne[ue.m.mb] = 6),
      (Ne[ue.m.hb] = 7),
      (Ne[ue.m.Bb] = 9),
      (Ne[ue.m.zf] = 10),
      (Ne[ue.m.rb] = 11),
      Ne),
    ke = {},
    Me =
      ((ke.unknown = 13),
      (ke.standard = 14),
      (ke.unique = 15),
      (ke.per_session = 16),
      (ke.transactions = 17),
      (ke.items_sold = 18),
      []);
  function Fe(t, e) {
    e = void 0 !== e && e;
    for (var n = Object.keys(t), r = d(Object.keys(je)), i = r.next(); !i.done; i = r.next()) {
      var a = i.value;
      if (n.includes(a)) {
        var o = je[a],
          s = e;
        ((s = void 0 !== s && s), O('GTAG_EVENT_FEATURE_CHANNEL', o), s && (Me[o] = !0));
      }
    }
  }
  var Pe = function () {
      this.F = new Set();
    },
    Ge = function (t) {
      var e = Je.Ga;
      return ((t = void 0 === t ? [] : t), Array.from(e.F).concat(t));
    },
    Le = function () {
      var t = Je.Ga,
        e = Ae.Uo;
      if (((t.F = new Set()), '' !== e))
        for (var n = d(e.split('~')), r = n.next(); !r.done; r = n.next()) {
          var i = Number(r.value);
          isNaN(i) || t.F.add(i);
        }
    },
    Re = { Nh: '55g2' };
  ((Re.Mh = Number('0') || 0),
    (Re.Zb = 'dataLayer'),
    (Re.Yo = 'ChAI8K2rwQYQmanQibjdyYIfEhkA9nwmkX2Jbe8K9t8Du1kxjj0ad2GR4mx1GgKd+A=='));
  var De,
    Ue = {
      __cl: 1,
      __ecl: 1,
      __ehl: 1,
      __evl: 1,
      __fal: 1,
      __fil: 1,
      __fsl: 1,
      __hl: 1,
      __jel: 1,
      __lcl: 1,
      __sdl: 1,
      __tl: 1,
      __ytl: 1
    },
    Ke = { __paused: 1, __tg: 1 };
  for (De in Ue) Ue.hasOwnProperty(De) && (Ke[De] = 1);
  var qe,
    ze = G('');
  qe = true;
  var Ve;
  Ve = !1;
  var Be;
  ((Be = !1), (Re.xf = 'www.googletagmanager.com'));
  var We = Re.xf + (qe ? '/gtag/js' : '/gtm.js'),
    He = null,
    Ze = null,
    Ye = {},
    Xe = {};
  Re.Bl = '';
  Re.Qh = '';
  var Je = new (function () {
    ((this.Ga = new Pe()),
      (this.F = !1),
      (this.K = 0),
      (this.ba = this.fa = this.jb = this.O = ''),
      (this.P = this.N = !1));
  })();
  function Qe() {
    var t;
    return Ge((t = void 0 === t ? [] : t)).join('~');
  }
  function $e() {
    var t = Je.O.length;
    return '/' === Je.O[t - 1] ? Je.O.substring(0, t - 1) : Je.O;
  }
  function tn() {
    return !!Je.F && (ae(84) ? 0 === Je.K : 1 !== Je.K);
  }
  function en(t) {
    for (var e = {}, n = d(t.split('|')), r = n.next(); !r.done; r = n.next()) e[r.value] = !0;
    return e;
  }
  var nn = new D(),
    rn = {},
    an = {},
    on = {
      name: Re.Zb,
      set: function (t, e) {
        (It(V(t, e), rn), ln());
      },
      get: function (t) {
        return sn(t, 2);
      },
      reset: function () {
        ((nn = new D()), (rn = {}), ln());
      }
    };
  function sn(t, e) {
    return 2 != e ? nn.get(t) : cn(t);
  }
  function cn(t) {
    var e,
      n = t.split('.');
    e = e || [];
    for (var r = rn, i = 0; i < n.length; i++) {
      if (null === r) return !1;
      if (void 0 === r) break;
      if (((r = r[n[i]]), -1 !== e.indexOf(r))) return;
    }
    return r;
  }
  function un(t, e) {
    an.hasOwnProperty(t) || (nn.set(t, e), It(V(t, e), rn), ln());
  }
  function ln(t) {
    F(an, function (e, n) {
      (nn.set(e, n), It(V(e), rn), It(V(e, n), rn), t && delete an[e]);
    });
  }
  function fn(t, e) {
    var n = 1 !== (void 0 === e ? 2 : e) ? cn(t) : nn.get(t);
    return 'array' === bt(n) || 'object' === bt(n) ? It(n, null) : n;
  }
  var dn = /:[0-9]+$/;
  function vn(t, e, n) {
    for (var r = d(t.split('&')), i = r.next(); !i.done; i = r.next()) {
      var a = d(i.value.split('=')),
        o = a.next().value,
        s = v(a);
      if (decodeURIComponent(o.replace(/\+/g, ' ')) === e) {
        var c = s.join('=');
        return n ? c : decodeURIComponent(c.replace(/\+/g, ' '));
      }
    }
  }
  function pn(t, e, n, r, i) {
    return (
      e && (e = String(e).toLowerCase()),
      ('protocol' !== e && 'port' !== e) ||
        (t.protocol = hn(t.protocol) || hn(J.location.protocol)),
      'port' === e
        ? (t.port = String(
            Number(t.hostname ? t.port : J.location.port) ||
              ('http' === t.protocol ? 80 : 'https' === t.protocol ? 443 : '')
          ))
        : 'host' === e &&
          (t.hostname = (t.hostname || J.location.hostname).replace(dn, '').toLowerCase()),
      gn(t, e, n, r, i)
    );
  }
  function gn(t, e, n, r, i) {
    var a,
      o = hn(t.protocol);
    switch ((e && (e = String(e).toLowerCase()), e)) {
      case 'url_no_fragment':
        a = (function (t) {
          var e = '';
          if (t && t.href) {
            var n = t.href.indexOf('#');
            e = n < 0 ? t.href : t.href.substring(0, n);
          }
          return e;
        })(t);
        break;
      case 'protocol':
        a = o;
        break;
      case 'host':
        if (((a = t.hostname.replace(dn, '').toLowerCase()), n)) {
          var s = /^www\d*\./.exec(a);
          s && s[0] && (a = a.substring(s[0].length));
        }
        break;
      case 'port':
        a = String(Number(t.port) || ('http' === o ? 80 : 'https' === o ? 443 : ''));
        break;
      case 'path':
        t.pathname || t.hostname || O('TAGGING', 1);
        var c = (a = '/' === t.pathname.substring(0, 1) ? t.pathname : '/' + t.pathname).split('/');
        ((r || []).indexOf(c[c.length - 1]) >= 0 && (c[c.length - 1] = ''), (a = c.join('/')));
        break;
      case 'query':
        ((a = t.search.replace('?', '')), i && (a = vn(a, i)));
        break;
      case 'extension':
        var u = t.pathname.split('.');
        a = (a = u.length > 1 ? u[u.length - 1] : '').split('/')[0];
        break;
      case 'fragment':
        a = t.hash.replace('#', '');
        break;
      default:
        a = t && t.href;
    }
    return a;
  }
  function hn(t) {
    return t ? t.replace(':', '').toLowerCase() : '';
  }
  var mn = {},
    _n = 0;
  function yn(t) {
    var e = mn[t];
    if (!e) {
      var n = Q.createElement('a');
      t && (n.href = t);
      var r = n.pathname;
      '/' !== r[0] && (t || O('TAGGING', 1), (r = '/' + r));
      var i = n.hostname.replace(dn, '');
      ((e = {
        href: n.href,
        protocol: n.protocol,
        host: n.host,
        hostname: i,
        pathname: r,
        search: n.search,
        hash: n.hash,
        port: n.port
      }),
        _n < 5 && ((mn[t] = e), _n++));
    }
    return e;
  }
  var bn = {
    'https://www.google.com': '/g',
    'https://www.googleadservices.com': '/as',
    'https://pagead2.googlesyndication.com': '/gs'
  };
  function En(t, e) {
    if (tn() || Ve)
      return (function (t, e) {
        if (t) {
          var n = '' + t;
          return (
            0 !== n.indexOf('http://') && 0 !== n.indexOf('https://') && (n = 'https://' + n),
            '/' === n[n.length - 1] && (n = n.substring(0, n.length - 1)),
            yn('' + n + e).href
          );
        }
      })(t, e);
  }
  function Sn() {
    return !!Re.Qh && 'SGTM_TOKEN' !== Re.Qh.split('@@').join('');
  }
  function In(t, e, n) {
    if (((n = void 0 === n ? '' : n), !tn())) return t;
    var r = (e && bn[t]) || '';
    return ('/gs' === r && (n = ''), '' + $e() + r + n);
  }
  var wn =
      J.location.search.indexOf('?gtm_latency=') >= 0 ||
      J.location.search.indexOf('&gtm_latency=') >= 0,
    xn = '0.005000',
    On = '0.01',
    Tn = '';
  function An() {
    return Number(xn);
  }
  var Cn,
    Nn = Math.random(),
    jn = wn || Nn < An(),
    kn = 1 === An() || (null == et ? void 0 : et.includes('gtm_debug=d')) || wn;
  Cn = ae(163) ? wn || Nn >= 1 - Number(Tn) : kn || Nn >= 1 - Number(On);
  var Mn = function (t) {
    return (Mn[' '](t), t);
  };
  Mn[' '] = function () {};
  var Fn = function (t) {
      var e = t;
      return function () {
        if (e) {
          var t = e;
          ((e = null), t());
        }
      };
    },
    Pn = function (t) {
      try {
        var e;
        if ((e = !!t && null != t.location.href))
          t: {
            try {
              (Mn(t.foo), (e = !0));
              break t;
            } catch (t) {}
            e = !1;
          }
        return e;
      } catch (t) {
        return !1;
      }
    },
    Gn = function (t, e) {
      for (var n = t, r = 0; r < 50; ++r) {
        var i, a;
        try {
          i = !(!n.frames || !n.frames[e]);
        } catch (t) {
          i = !1;
        }
        if (i) return n;
        t: {
          try {
            var o = n.parent;
            if (o && o != n) {
              a = o;
              break t;
            }
          } catch (t) {}
          a = null;
        }
        if (!(n = a)) break;
      }
      return null;
    },
    Ln = function (t) {
      if (J.top == J) return 0;
      if (void 0 !== t && t) {
        var e = J.location.ancestorOrigins;
        if (e) return e[e.length - 1] == J.location.origin ? 1 : 2;
      }
      return Pn(J.top) ? 1 : 2;
    },
    Rn = function (t) {
      return (t = void 0 === t ? document : t).createElement('img');
    };
  var Dn = {},
    Un = ((Dn[1] = {}), (Dn[2] = {}), (Dn[3] = {}), (Dn[4] = {}), Dn);
  function Kn(t, e, n) {
    var r = qn(e, n);
    if (r) {
      var i = Un[e][r];
      (i || (i = Un[e][r] = []), i.push(Object.assign({}, t)));
    }
  }
  function qn(t, e) {
    var n,
      r = e;
    '/' === e[0] && (r = (null == (n = J.location) ? void 0 : n.origin) + e);
    try {
      var i = new URL(r);
      return 4 === t ? i.origin : i.origin + i.pathname;
    } catch (t) {}
  }
  function zn(t) {
    var e = _.apply(1, arguments);
    (Cn && Kn(t, 3, e[0]), ct.apply(null, p(e)));
  }
  function Vn(t) {
    var e = _.apply(1, arguments);
    (Cn && Kn(t, 1, e[0]), ot.apply(null, p(e)));
  }
  var Bn = /gtag[.\/]js/,
    Wn = /gtm[.\/]js/,
    Hn = !1;
  function Zn(t) {
    var e = Jn();
    (e.pending || (e.pending = []),
      j(e.pending, function (e) {
        return e.target.ctid === t.ctid && e.target.isDestination === t.isDestination;
      }) || e.pending.push({ target: t, onLoad: void 0 }));
  }
  function Yn() {
    var t = J.google_tags_first_party;
    Array.isArray(t) || (t = []);
    for (var e = {}, n = d(t), r = n.next(); !r.done; r = n.next()) e[r.value] = !0;
    return Object.freeze(e);
  }
  var Xn = function () {
    ((this.container = {}),
      (this.destination = {}),
      (this.canonical = {}),
      (this.pending = []),
      (this.siloed = []),
      (this.injectedFirstPartyContainers = {}),
      (this.injectedFirstPartyContainers = Yn()));
  };
  function Jn() {
    var t = nt('google_tag_data', {}),
      e = t.tidr;
    (e && 'object' == typeof e) || ((e = new Xn()), (t.tidr = e));
    var n = e;
    return (
      n.container || (n.container = {}),
      n.destination || (n.destination = {}),
      n.canonical || (n.canonical = {}),
      n.pending || (n.pending = []),
      n.siloed || (n.siloed = []),
      n.injectedFirstPartyContainers || (n.injectedFirstPartyContainers = Yn()),
      n
    );
  }
  var Qn = {},
    $n = !1,
    tr = void 0,
    er = { ctid: '', canonicalContainerId: '', bl: '', fl: '' };
  function nr() {
    return (
      Qn.Me &&
      ur().some(function (t) {
        return t === er.ctid;
      })
    );
  }
  function rr() {
    var t = cr();
    return $n ? t.map(vr) : t;
  }
  function ir() {
    var t = ur();
    return $n ? t.map(vr) : t;
  }
  function ar() {
    var t = ir();
    if (!$n)
      for (var e = d([].concat(p(t))), n = e.next(); !n.done; n = e.next()) {
        var r = vr(n.value),
          i = Jn().destination[r];
        (i && 0 !== i.state) || t.push(r);
      }
    return t;
  }
  function or() {
    return dr(er.ctid);
  }
  function sr() {
    return dr(er.canonicalContainerId || '_' + er.ctid);
  }
  function cr() {
    return er.bl ? er.bl.split('|') : [er.ctid];
  }
  function ur() {
    return er.fl
      ? er.fl.split('|').filter(function (t) {
          return !ae(108) || 0 !== t.indexOf('GTM-');
        })
      : [];
  }
  function lr() {
    var t = fr(hr()),
      e = t && t.parent;
    if (e) return fr(e);
  }
  function fr(t) {
    var e = Jn();
    return t.isDestination ? e.destination[t.ctid] : e.container[t.ctid];
  }
  function dr(t) {
    return $n ? vr(t) : t;
  }
  function vr(t) {
    return 'siloed_' + t;
  }
  function pr(t) {
    return z((t = String(t)), 'siloed_') ? t.substring(7) : t;
  }
  function gr() {
    var t = er.ctid,
      e = rr(),
      n = ar();
    tr = n;
    for (
      var r = function (r, a) {
          var o = {
            canonicalContainerId: er.canonicalContainerId,
            scriptContainerId: t,
            state: 2,
            containers: e.slice(),
            destinations: n.slice()
          };
          if ((tt && (o.scriptElement = tt), et && (o.scriptSource = et), void 0 === lr())) {
            var s;
            t: {
              if ((o.scriptContainerId || '').indexOf('GTM-') >= 0) {
                var c;
                e: {
                  var u,
                    l = null == (u = o.scriptElement) ? void 0 : u.src;
                  if (l) {
                    for (
                      var f = Je.F,
                        d = yn(l),
                        v = f ? d.pathname : '' + d.hostname + d.pathname,
                        p = Q.scripts,
                        g = '',
                        h = 0;
                      h < p.length;
                      ++h
                    ) {
                      var m = p[h];
                      if (
                        !(
                          0 === m.innerHTML.length ||
                          (!f &&
                            m.innerHTML.indexOf(o.scriptContainerId || 'SHOULD_NOT_BE_SET') < 0) ||
                          m.innerHTML.indexOf(v) < 0
                        )
                      ) {
                        if (m.innerHTML.indexOf('(function(w,d,s,l,i)') >= 0) {
                          c = String(h);
                          break e;
                        }
                        g = String(h);
                      }
                    }
                    if (g) {
                      c = g;
                      break e;
                    }
                  }
                  c = void 0;
                }
                if (c) {
                  ((Hn = !0), (s = c));
                  break t;
                }
              }
              var _ = [].slice.call(Q.scripts);
              s = o.scriptElement ? String(_.indexOf(o.scriptElement)) : '-1';
            }
            ((o.htmlLoadOrder = s),
              (o.loadScriptType = (function (t) {
                if (Hn) return '1';
                var e,
                  n = null == (e = t.scriptElement) ? void 0 : e.src;
                if (n) {
                  if (Bn.test(n)) return '3';
                  if (Wn.test(n)) return '2';
                }
                return '0';
              })(o)));
          }
          var y = a ? i.destination : i.container,
            b = y[r];
          b ? (a && 0 === b.state && Ce(93), Object.assign(b, o)) : (y[r] = o);
        },
        i = Jn(),
        a = d(e),
        o = a.next();
      !o.done;
      o = a.next()
    )
      r(o.value, !1);
    for (var s = d(n), c = s.next(); !c.done; c = s.next()) r(c.value, !0);
    ((i.canonical[sr()] = {}),
      (function () {
        var t = Jn();
        if (t.pending) {
          for (
            var e, n = [], r = !1, i = rr(), a = tr || ar(), o = {}, s = 0;
            s < t.pending.length;
            o = { kf: void 0 }, s++
          )
            ((o.kf = t.pending[s]),
              j(
                o.kf.target.isDestination ? a : i,
                (function (t) {
                  return function (e) {
                    return e === t.kf.target.ctid;
                  };
                })(o)
              )
                ? r || ((e = o.kf.onLoad), (r = !0))
                : n.push(o.kf));
          if (((t.pending = n), e))
            try {
              e(sr());
            } catch (t) {}
        }
      })());
  }
  function hr() {
    return { ctid: or(), isDestination: Qn.Me };
  }
  function mr(t) {
    var e = Jn();
    (e.siloed = e.siloed || []).push(t);
  }
  function _r() {
    var t,
      e = Jn().container;
    for (t in e) if (e.hasOwnProperty(t) && 1 === e[t].state) return !0;
    return !1;
  }
  Qn.Me = G('');
  var yr = { Ta: { Fe: 0, Le: 1, qk: 2 } };
  ((yr.Ta[yr.Ta.Fe] = 'FULL_TRANSMISSION'),
    (yr.Ta[yr.Ta.Le] = 'LIMITED_TRANSMISSION'),
    (yr.Ta[yr.Ta.qk] = 'NO_TRANSMISSION'));
  var br = { W: { Lc: 0, Wa: 1, Zc: 2, Kc: 3 } };
  function Er() {
    var t = nt('google_tag_data', {});
    return (t.ics = t.ics || new Sr());
  }
  ((br.W[br.W.Lc] = 'NO_QUEUE'),
    (br.W[br.W.Wa] = 'ADS'),
    (br.W[br.W.Zc] = 'ANALYTICS'),
    (br.W[br.W.Kc] = 'MONITORING'));
  var Sr = function () {
    ((this.entries = {}),
      (this.waitPeriodTimedOut =
        this.wasSetLate =
        this.accessedAny =
        this.accessedDefault =
        this.usedImplicit =
        this.usedUpdate =
        this.usedDefault =
        this.usedDeclare =
        this.active =
          !1),
      (this.F = []));
  };
  ((Sr.prototype.default = function (t, e, n, r, i, a, o) {
    (this.usedDefault ||
      this.usedDeclare ||
      (!this.accessedDefault && !this.accessedAny) ||
      (this.wasSetLate = !0),
      (this.usedDefault = this.active = !0),
      O('TAGGING', 19),
      null == e ? O('TAGGING', 18) : Ir(this, t, 'granted' === e, n, r, i, a, o));
  }),
    (Sr.prototype.waitForUpdate = function (t, e, n) {
      for (var r = 0; r < t.length; r++) Ir(this, t[r], void 0, void 0, '', '', e, n);
    }));
  var Ir = function (t, e, n, r, i, a, o, s) {
    var c = t.entries,
      u = c[e] || {},
      l = u.region,
      f = r && C(r) ? r.toUpperCase() : void 0;
    if (
      ((i = i.toUpperCase()),
      (a = a.toUpperCase()),
      '' === i || f === a || (f === i ? l !== a : !f && !l))
    ) {
      var d = !!(o && o > 0 && void 0 === u.update),
        v = {
          region: f,
          declare_region: u.declare_region,
          implicit: u.implicit,
          default: void 0 !== n ? n : u.default,
          declare: u.declare,
          update: u.update,
          quiet: d
        };
      (('' === i && !1 === u.default) || (c[e] = v),
        d &&
          J.setTimeout(function () {
            c[e] === v &&
              v.quiet &&
              (O('TAGGING', 2),
              (t.waitPeriodTimedOut = !0),
              t.clearTimeout(e, void 0, s),
              t.notifyListeners());
          }, o));
    }
  };
  (((t = Sr.prototype).clearTimeout = function (t, e, n) {
    var r,
      i = [t],
      a = n.delegatedConsentTypes;
    for (r in a) a.hasOwnProperty(r) && a[r] === t && i.push(r);
    var o = this.entries[t] || {},
      s = this.getConsentState(t, n);
    if (o.quiet) {
      o.quiet = !1;
      for (var c = d(i), u = c.next(); !u.done; u = c.next()) wr(this, u.value);
    } else if (void 0 !== e && s !== e)
      for (var l = d(i), f = l.next(); !f.done; f = l.next()) wr(this, f.value);
  }),
    (t.update = function (t, e, n) {
      if (
        (this.usedDefault ||
          this.usedDeclare ||
          this.usedUpdate ||
          !this.accessedAny ||
          (this.wasSetLate = !0),
        (this.usedUpdate = this.active = !0),
        null != e)
      ) {
        var r = this.getConsentState(t, n),
          i = this.entries;
        (((i[t] = i[t] || {}).update = 'granted' === e), this.clearTimeout(t, r, n));
      }
    }),
    (t.declare = function (t, e, n, r, i) {
      this.usedDeclare = this.active = !0;
      var a = this.entries,
        o = a[t] || {},
        s = o.declare_region,
        c = n && C(n) ? n.toUpperCase() : void 0;
      if (
        ((r = r.toUpperCase()),
        (i = i.toUpperCase()),
        '' === r || c === i || (c === r ? s !== i : !c && !s))
      ) {
        var u = {
          region: o.region,
          declare_region: c,
          declare: 'granted' === e,
          implicit: o.implicit,
          default: o.default,
          update: o.update,
          quiet: o.quiet
        };
        ('' === r && !1 === o.declare) || (a[t] = u);
      }
    }),
    (t.implicit = function (t, e) {
      this.usedImplicit = !0;
      var n = this.entries,
        r = (n[t] = n[t] || {});
      !1 !== r.implicit && (r.implicit = 'granted' === e);
    }),
    (t.getConsentState = function (t, e) {
      var n = this.entries,
        r = n[t] || {},
        i = r.update;
      if (void 0 !== i) return i ? 1 : 2;
      if (e.usedContainerScopedDefaults) {
        var a = e.containerScopedDefaults[t];
        if (3 === a) return 1;
        if (2 === a) return 2;
      } else if (void 0 !== (i = r.default)) return i ? 1 : 2;
      if (null != e && e.delegatedConsentTypes.hasOwnProperty(t)) {
        var o = e.delegatedConsentTypes[t],
          s = n[o] || {};
        if (void 0 !== (i = s.update)) return i ? 1 : 2;
        if (e.usedContainerScopedDefaults) {
          var c = e.containerScopedDefaults[o];
          if (3 === c) return 1;
          if (2 === c) return 2;
        } else if (void 0 !== (i = s.default)) return i ? 1 : 2;
      }
      return void 0 !== (i = r.declare)
        ? i
          ? 1
          : 2
        : void 0 !== (i = r.implicit)
          ? i
            ? 3
            : 4
          : 0;
    }),
    (t.addListener = function (t, e) {
      this.F.push({ consentTypes: t, Dn: e });
    }));
  var wr = function (t, e) {
    for (var n = 0; n < t.F.length; ++n) {
      var r = t.F[n];
      Array.isArray(r.consentTypes) && -1 !== r.consentTypes.indexOf(e) && (r.il = !0);
    }
  };
  Sr.prototype.notifyListeners = function (t, e) {
    for (var n = 0; n < this.F.length; ++n) {
      var r = this.F[n];
      if (r.il) {
        r.il = !1;
        try {
          r.Dn({ consentEventId: t, consentPriorityId: e });
        } catch (t) {}
      }
    }
  };
  var xr = !1,
    Or = !1,
    Tr = {},
    Ar = {
      delegatedConsentTypes: {},
      corePlatformServices: {},
      usedCorePlatformServices: !1,
      selectedAllCorePlatformServices: !1,
      containerScopedDefaults:
        ((Tr.ad_storage = 1),
        (Tr.analytics_storage = 1),
        (Tr.ad_user_data = 1),
        (Tr.ad_personalization = 1),
        Tr),
      usedContainerScopedDefaults: !1
    };
  function Cr(t) {
    var e = Er();
    return (
      (e.accessedAny = !0),
      (C(t) ? [t] : t).every(function (t) {
        switch (e.getConsentState(t, Ar)) {
          case 1:
          case 3:
          default:
            return !0;
          case 2:
          case 4:
            return !1;
        }
      })
    );
  }
  function Nr(t) {
    var e = Er();
    return ((e.accessedAny = !0), !(e.entries[t] || {}).quiet);
  }
  function jr(t, e) {
    Er().addListener(t, e);
  }
  function kr(t, e) {
    Er().notifyListeners(t, e);
  }
  var Mr = {},
    Fr =
      ((Mr[br.W.Lc] = yr.Ta.Fe),
      (Mr[br.W.Wa] = yr.Ta.Fe),
      (Mr[br.W.Zc] = yr.Ta.Fe),
      (Mr[br.W.Kc] = yr.Ta.Fe),
      Mr),
    Pr = function (t, e) {
      ((this.F = t), (this.consentTypes = e));
    };
  Pr.prototype.isConsentGranted = function () {
    switch (this.F) {
      case 0:
        return this.consentTypes.every(function (t) {
          return Cr(t);
        });
      case 1:
        return this.consentTypes.some(function (t) {
          return Cr(t);
        });
      default:
        Y(this.F, 'consentsRequired had an unknown type');
    }
  };
  var Gr = {},
    Lr =
      ((Gr[br.W.Lc] = new Pr(0, [])),
      (Gr[br.W.Wa] = new Pr(0, ['ad_storage'])),
      (Gr[br.W.Zc] = new Pr(0, ['analytics_storage'])),
      (Gr[br.W.Kc] = new Pr(1, ['ad_storage', 'analytics_storage'])),
      Gr),
    Rr = function (t) {
      var e = this;
      ((this.type = t),
        (this.F = []),
        jr(Lr[t].consentTypes, function () {
          Dr(e) || e.flush();
        }));
    };
  Rr.prototype.flush = function () {
    for (var t = d(this.F), e = t.next(); !e.done; e = t.next()) {
      (0, e.value)();
    }
    this.F = [];
  };
  var Dr = function (t) {
      return Fr[t.type] === yr.Ta.qk && !Lr[t.type].isConsentGranted();
    },
    Ur = function (t, e) {
      Dr(t) ? t.F.push(e) : e();
    },
    Kr = new Map();
  function qr(t) {
    return (Kr.has(t) || Kr.set(t, new Rr(t)), Kr.get(t));
  }
  var zr = '/td?id=' + er.ctid,
    Vr = 'v t pid dl tdp exp'.split(' '),
    Br = ['mcc'],
    Wr = {},
    Hr = {},
    Zr = !1;
  function Yr(t, e, n) {
    ((Hr[t] = e), (void 0 === n || n) && Xr(t));
  }
  function Xr(t, e) {
    (void 0 === Wr[t] || (void 0 !== e && e)) && (Wr[t] = !0);
  }
  function Jr(t) {
    if (((t = void 0 !== t && t), Je.P && Cn && er.ctid)) {
      var e = qr(br.W.Kc);
      if (Dr(e)) Zr || ((Zr = !0), Ur(e, Jr));
      else {
        var n = (function (t) {
            t = void 0 !== t && t;
            var e = Object.keys(Wr)
              .filter(function (e) {
                return !0 === Wr[e] && void 0 !== Hr[e] && (t || !Br.includes(e));
              })
              .map(function (t) {
                var e = Hr[t];
                return ('function' == typeof e && (e = e()), e ? '&' + t + '=' + e : '');
              })
              .join('');
            return '' + In('https://www.googletagmanager.com') + zr + e + '&z=0';
          })(t),
          r = { destinationId: er.ctid, endpoint: 56 };
        (ae(171) && Wr.csp && ot(n + '&script=1'),
          t
            ? (function (t) {
                var e = _.apply(1, arguments),
                  n = e[0];
                (Cn && (Kn(t, 2, n), Kn(t, 3, n)), pt.apply(null, p(e)));
              })(r, n)
            : zn(r, n),
          Object.keys(Wr).forEach(function (t) {
            Vr.indexOf(t) < 0 && (Wr[t] = !1);
          }),
          (Zr = !1));
      }
    }
  }
  var Qr = {};
  function $r() {
    Object.keys(Wr).filter(function (t) {
      return Wr[t] && !Vr.includes(t);
    }).length > 0 && Jr(!0);
  }
  var ti = k();
  function ei() {
    ti = k();
  }
  var ni = ['ad_storage', 'analytics_storage', 'ad_user_data', 'ad_personalization'],
    ri = [ue.m.Fc, ue.m.Sb, ue.m.od, ue.m.yb, ue.m.Rb, ue.m.La, ue.m.Ka, ue.m.Ya, ue.m.fb, ue.m.Ab],
    ii = !1,
    ai = !1,
    oi = {},
    si = {};
  function ci() {
    (!ai &&
      ii &&
      (ni.some(function (t) {
        return 1 !== Ar.containerScopedDefaults[t];
      }) ||
        ui('mbc')),
      (ai = !0));
  }
  function ui(t) {
    Cn && (Yr(t, '1'), Jr());
  }
  function li(t, e) {
    if (!oi[e] && ((oi[e] = !0), si[e]))
      for (var n = d(ri), r = n.next(); !r.done; r = n.next())
        if (t.hasOwnProperty(r.value)) {
          ui('erc');
          break;
        }
  }
  function fi(t) {
    O('HEALTH', t);
  }
  var di,
    vi = {
      Ak: 'service_worker_endpoint',
      Ck: 'shared_user_id',
      Dk: 'shared_user_id_requested',
      wg: 'shared_user_id_source',
      Sg: 'cookie_deprecation_label',
      yl: 'aw_user_data_cache',
      Cm: 'ga4_user_data_cache',
      Am: 'fl_user_data_cache',
      tk: 'pt_listener_set',
      Pe: 'pt_data',
      pk: 'nb_data',
      Hh: 'ip_geo_fetch_in_progress',
      He: 'ip_geo_data_cache'
    };
  function pi(t, e) {
    if (
      ((e = void 0 !== e && e),
      (function (t) {
        if (!di) {
          di = {};
          for (var e = d(Object.keys(vi)), n = e.next(); !n.done; n = e.next())
            di[vi[n.value]] = !0;
        }
        return !!di[t];
      })(t))
    ) {
      var n,
        r,
        i = null != (r = (n = nt('google_tag_data', {})).xcd) ? r : (n.xcd = {});
      if (i[t]) return i[t];
      if (e) {
        var a = void 0,
          o = 1,
          s = {},
          c = {
            set: function (t) {
              ((a = t), c.notify());
            },
            get: function () {
              return a;
            },
            subscribe: function (t) {
              return ((s[String(o)] = t), o++);
            },
            unsubscribe: function (t) {
              var e = String(t);
              return !!s.hasOwnProperty(e) && (delete s[e], !0);
            },
            notify: function () {
              for (var e = d(Object.keys(s)), n = e.next(); !n.done; n = e.next()) {
                var r = n.value;
                try {
                  s[r](t, a);
                } catch (t) {}
              }
            }
          };
        return (i[t] = c);
      }
    }
  }
  function gi(t, e) {
    var n = pi(t, !0);
    n && n.set(e);
  }
  function hi(t) {
    var e;
    return null == (e = pi(t)) ? void 0 : e.get();
  }
  var mi = {
      Jn: 'eyIwIjoiSU4iLCIxIjoiSU4tTVAiLCIyIjpmYWxzZSwiMyI6Imdvb2dsZS5jby5pbiIsIjQiOiIiLCI1Ijp0cnVlLCI2IjpmYWxzZSwiNyI6ImFkX3N0b3JhZ2V8YW5hbHl0aWNzX3N0b3JhZ2V8YWRfdXNlcl9kYXRhfGFkX3BlcnNvbmFsaXphdGlvbiJ9'
    },
    _i = {},
    yi = !1;
  function bi() {
    function t() {
      void 0 !== n &&
        (function (t, e) {
          var n = pi(t);
          n && n.unsubscribe(e);
        })(vi.He, n);
      try {
        var t = hi(vi.He);
        _i = JSON.parse(t);
      } catch (t) {
        (Ce(123), fi(2), (_i = {}));
      }
      ((yi = !0), e());
    }
    var e = Xu,
      n = void 0,
      r = hi(vi.He);
    r
      ? t()
      : ((n = (function (t, e) {
          var n;
          if ('function' == typeof e) return null == (n = pi(t, !0)) ? void 0 : n.subscribe(e);
        })(vi.He, t)),
        (function () {
          function t(t) {
            (gi(vi.He, t || '{}'), gi(vi.Hh, !1));
          }
          if (!hi(vi.Hh)) {
            gi(vi.Hh, !0);
            var e = '';
            try {
              J.fetch(e, {
                method: 'GET',
                cache: 'no-store',
                mode: 'cors',
                credentials: 'omit'
              }).then(
                function (e) {
                  e.ok
                    ? e.text().then(
                        function (e) {
                          t(e);
                        },
                        function () {
                          t();
                        }
                      )
                    : t();
                },
                function () {
                  t();
                }
              );
            } catch (e) {
              t();
            }
          }
        })());
  }
  function Ei() {
    var t = mi.Jn;
    try {
      return JSON.parse(w(t));
    } catch (t) {
      return (Ce(123), fi(2), {});
    }
  }
  function Si() {
    return _i[1] || '';
  }
  function Ii(t) {
    return null == t ? '' : 'object' == typeof t ? t.toString() : String(t);
  }
  function wi(t) {
    if (null != t) return Ii(t);
  }
  function xi(t) {
    return !(!t || 0 !== t.indexOf('pending:')) && Oi(t.substr(8));
  }
  function Oi(t) {
    if (null == t || 0 === t.length) return !1;
    var e = Number(t),
      n = R();
    return e < n + 3e5 && e > n - 9e5;
  }
  var Ti = !1,
    Ai = !1,
    Ci = !1,
    Ni = 0,
    ji = !1,
    ki = [];
  function Mi(t) {
    if (0 === Ni) ji && ki && (ki.length >= 100 && ki.shift(), ki.push(t));
    else if (Li()) {
      var e = nt('google.tagmanager.ta.prodqueue', []);
      (e.length >= 50 && e.shift(), e.push(t));
    }
  }
  function Fi() {
    (Pi(), Q.removeEventListener && Q.removeEventListener('TAProdDebugSignal', Fi, !1));
  }
  function Pi() {
    if (!Ai) {
      ((Ai = !0), Gi());
      var t = ki;
      ((ki = void 0),
        null == t ||
          t.forEach(function (t) {
            Mi(t);
          }));
    }
  }
  function Gi() {
    var t = Q.documentElement.getAttribute('data-tag-assistant-prod-present');
    Oi(t)
      ? (Ni = 1)
      : !xi(t) || Ti || Ci
        ? (Ni = 2)
        : ((Ci = !0),
          ut(Q, 'TAProdDebugSignal', Fi, !1),
          J.setTimeout(function () {
            (Pi(), (Ti = !0));
          }, 200));
  }
  function Li() {
    if (!ji) return !1;
    switch (Ni) {
      case 1:
      case 0:
        return !0;
      default:
        return !1;
    }
  }
  var Ri = !1;
  function Di(t, e) {
    (e = void 0 === e ? {} : e).groupId = Ui;
    var n,
      r = e,
      i = { publicId: Ki };
    return (
      null != r.eventId && (i.eventId = r.eventId),
      null != r.priorityId && (i.priorityId = r.priorityId),
      r.eventName && (i.eventName = r.eventName),
      r.groupId && (i.groupId = r.groupId),
      r.tagName && (i.tagName = r.tagName),
      ((n = { containerProduct: 'GTM', key: i, version: '1', messageType: t }).containerProduct = Ri
        ? 'OGT'
        : 'GTM'),
      (n.key.targetRef = qi),
      n
    );
  }
  var Ui,
    Ki = '',
    qi = { ctid: '', isDestination: !1 };
  var zi,
    Vi,
    Bi = [ue.m.T, ue.m.Z, ue.m.U, ue.m.Ea];
  function Wi(t, e) {
    (ci(),
      (zi = !0),
      F(t, function (t, e) {
        var n = Ii(e);
        ((xr = !0), Or && O('TAGGING', 20), Er().update(t, n, Ar));
      }),
      kr(e.eventId, e.priorityId));
  }
  function Hi(t) {
    return (
      Array.isArray(t) || (t = [t]),
      t.every(function (t) {
        return Cr(t);
      })
    );
  }
  function Zi(t) {
    for (var e = d(t), n = e.next(); !n.done; n = e.next()) {
      var r = n.value;
      Er().clearTimeout(r, void 0, Ar);
    }
    kr();
  }
  var Yi = !1,
    Xi = [];
  var Ji = (J.google_tag_manager = J.google_tag_manager || {});
  function Qi(t, e) {
    return (Ji[t] = Ji[t] || e());
  }
  function $i() {
    var t = Ji.sequence || 1;
    return ((Ji.sequence = t + 1), t);
  }
  var ta = 0;
  function ea() {
    Cn && (1 === ta && (Wr.mcc = !1), (ta = 2));
  }
  function na(t) {
    Cn && void 0 === t && 0 === ta && (Yr('mcc', '1'), (ta = 1));
  }
  var ra = /^(?:siloed_)?(?:AW|DC|G|GF|GT|HA|MC|UA)$/,
    ia = /\s/;
  function aa(t, e) {
    if (C(t)) {
      var n = (t = (function (t) {
        return t ? t.replace(/^\s+|\s+$/g, '') : '';
      })(t)).indexOf('-');
      if (!(n < 0)) {
        var r = t.substring(0, n);
        if (ra.test(r)) {
          var i,
            a = t.substring(n + 1);
          if (e) {
            var o = function (t) {
              var e = t.indexOf('/');
              return e < 0 ? [t] : [t.substring(0, e), t.substring(e + 1)];
            };
            if (((i = o(a)), 'DC' === r && 2 === i.length)) {
              var s = o(i[1]);
              2 === s.length && ((i[1] = s[0]), i.push(s[1]));
            }
          } else {
            i = a.split('/');
            for (var c = 0; c < i.length; c++)
              if (!i[c] || (ia.test(i[c]) && ('AW' !== r || 1 !== c))) return;
          }
          return { id: t, prefix: r, destinationId: r + '-' + i[0], ids: i };
        }
      }
    }
  }
  function oa(t, e) {
    for (var n = {}, r = 0; r < t.length; ++r) {
      var i = aa(t[r], e);
      i && (n[i.id] = i);
    }
    var a,
      o = [];
    for (a in n)
      if (n.hasOwnProperty(a)) {
        var s = n[a];
        'AW' === s.prefix && s.ids[ca[1]] && o.push(s.destinationId);
      }
    for (var c = 0; c < o.length; ++c) delete n[o[c]];
    for (var u = [], l = d(Object.keys(n)), f = l.next(); !f.done; f = l.next()) u.push(n[f.value]);
    return u;
  }
  var sa = {},
    ca =
      ((sa[0] = 0),
      (sa[1] = 1),
      (sa[2] = 2),
      (sa[3] = 0),
      (sa[4] = 1),
      (sa[5] = 0),
      (sa[6] = 0),
      (sa[7] = 0),
      sa),
    ua = Number('') || 500,
    la = {},
    fa = {},
    da = { initialized: 11, complete: 12, interactive: 13 },
    va = {},
    pa = Object.freeze(((va[ue.m.ib] = !0), va)),
    ga = void 0;
  function ha(t, e, n, r) {
    if (((n = void 0 === n ? {} : n), (r = void 0 === r ? '' : r), t === e)) return [];
    var i,
      a = function (t, e) {
        var n;
        return (('object' === bt(e) || 'array' === bt(e)) && (n = e[t]), void 0 === n ? pa[t] : n);
      },
      o = (function (t, e) {
        var n,
          r = {};
        for (n in e) e.hasOwnProperty(n) && (r[n] = !0);
        for (var i in t) t.hasOwnProperty(i) && (r[i] = !0);
        return r;
      })(t, e);
    for (i in o)
      if (o.hasOwnProperty(i)) {
        var s = (r ? r + '.' : '') + i,
          c = a(i, t),
          u = a(i, e),
          l = 'object' === bt(c) || 'array' === bt(c),
          f = 'object' === bt(u) || 'array' === bt(u);
        l && f ? ha(c, u, n, s) : (l || f || c !== u) && (n[s] = !0);
      }
    return Object.keys(n);
  }
  var ma = function (t, e, n, r, i, a, o, s, c, u, l) {
      ((this.eventId = t),
        (this.priorityId = e),
        (this.F = n),
        (this.P = r),
        (this.N = i),
        (this.O = a),
        (this.K = o),
        (this.eventMetadata = s),
        (this.onSuccess = c),
        (this.onFailure = u),
        (this.isGtmEvent = l));
    },
    _a = function (t, e) {
      ((this.eventId = t),
        (this.priorityId = e),
        (this.K = {}),
        (this.P = {}),
        (this.F = {}),
        (this.N = {}),
        (this.ba = {}),
        (this.O = {}),
        (this.eventMetadata = {}),
        (this.isGtmEvent = !1),
        (this.onSuccess = function () {}),
        (this.onFailure = function () {}));
    },
    ya = {
      C: {
        Oi: 'accept_by_default',
        tf: 'add_tag_timing',
        uf: 'allow_ad_personalization',
        Qi: 'batch_on_navigation',
        Si: 'client_id_source',
        Nd: 'consent_event_id',
        Od: 'consent_priority_id',
        Xo: 'consent_state',
        aa: 'consent_updated',
        sc: 'conversion_linker_enabled',
        sa: 'cookie_options',
        wf: 'create_dc_join',
        Tg: 'create_fpm_join',
        Qd: 'create_google_join',
        bd: 'em_event',
        bp: 'endpoint_for_debug',
        fj: 'enhanced_client_id_source',
        Wg: 'enhanced_match_result',
        Hc: 'euid_mode_enabled',
        Za: 'event_start_timestamp_ms',
        bk: 'event_usage',
        gg: 'extra_tag_experiment_ids',
        lp: 'add_parameter',
        Ch: 'attribution_reporting_experiment',
        Dh: 'counting_method',
        ig: 'send_as_iframe',
        mp: 'parameter_order',
        jg: 'parsed_target',
        Bm: 'ga4_collection_subdomain',
        fk: 'gbraid_cookie_marked',
        X: 'hit_type',
        Ic: 'hit_type_override',
        Em: 'is_config_command',
        kg: 'is_consent_update',
        Ie: 'is_conversion',
        jk: 'is_ecommerce',
        Jc: 'is_external_event',
        Ih: 'is_fallback_aw_conversion_ping_allowed',
        Je: 'is_first_visit',
        kk: 'is_first_visit_conversion',
        lg: 'is_fl_fallback_conversion_flow_allowed',
        mg: 'is_fpm_encryption',
        xd: 'is_fpm_split',
        yd: 'is_gcp_conversion',
        Jh: 'is_google_signals_allowed',
        zd: 'is_merchant_center',
        ng: 'is_new_to_site',
        og: 'is_server_side_destination',
        Bd: 'is_session_start',
        mk: 'is_session_start_conversion',
        pp: 'is_sgtm_ga_ads_conversion_study_control_group',
        qp: 'is_sgtm_prehit',
        nk: 'is_sgtm_service_worker',
        Kh: 'is_split_conversion',
        Fm: 'is_syn',
        pg: 'join_id',
        Ke: 'join_timer_sec',
        Cd: 'tunnel_updated',
        wp: 'promises',
        xp: 'record_aw_latency',
        Ub: 'redact_ads_data',
        Dd: 'redact_click_ids',
        Om: 'remarketing_only',
        yk: 'send_ccm_parallel_ping',
        vg: 'send_fledge_experiment',
        Ap: 'send_ccm_parallel_test_ping',
        Qe: 'send_to_destinations',
        Oh: 'send_to_targets',
        zk: 'send_user_data_hit',
        Sa: 'source_canonical_id',
        Ba: 'speculative',
        Ek: 'speculative_in_message',
        Fk: 'suppress_script_load',
        Sm: 'syn_or_mod',
        Wh: 'transient_ecsid',
        Re: 'transmission_type',
        Ha: 'user_data',
        Ep: 'user_data_from_automatic',
        Fp: 'user_data_from_automatic_getter',
        Fd: 'user_data_from_code',
        zg: 'user_data_from_manual',
        Jk: 'user_data_mode',
        Se: 'user_id_updated'
      }
    },
    ba = { wl: Number('5'), Zp: Number('') },
    Ea = [],
    Sa = !1;
  function Ia(t) {
    Ea.push(t);
  }
  var wa = '?id=' + er.ctid,
    xa = void 0,
    Oa = {},
    Ta = void 0,
    Aa = new (function () {
      var t = 5;
      (ba.wl > 0 && (t = ba.wl), (this.K = t), (this.F = 0), (this.N = []));
    })(),
    Ca = 1e3;
  function Na(t, e) {
    var n = xa;
    if (void 0 === n) {
      if (!e) return '';
      n = $i();
    }
    for (
      var r = [In('https://www.googletagmanager.com'), '/a', wa], i = d(Ea), a = i.next();
      !a.done;
      a = i.next()
    )
      for (
        var o = (0, a.value)({ eventId: n, Yc: !!t }), s = d(o), c = s.next();
        !c.done;
        c = s.next()
      ) {
        var u = d(c.value),
          l = u.next().value,
          f = u.next().value;
        r.push('&' + l + '=' + f);
      }
    return (r.push('&z=0'), r.join(''));
  }
  function ja() {
    if (Je.P && (Ta && (J.clearTimeout(Ta), (Ta = void 0)), void 0 !== xa && ka)) {
      var t = qr(br.W.Kc);
      if (Dr(t)) Sa || ((Sa = !0), Ur(t, ja));
      else {
        var e;
        if (!(e = Oa[xa])) {
          var n = Aa;
          e = !(n.F < n.K) && R() - n.N[n.F % n.K] < 1e3;
        }
        if (e || Ca-- <= 0) (Ce(1), (Oa[xa] = !0));
        else {
          var r = Aa,
            i = r.F++ % r.K;
          r.N[i] = R();
          var a = Na(!0);
          (zn({ destinationId: er.ctid, endpoint: 56, eventId: xa }, a), (Sa = ka = !1));
        }
      }
    }
  }
  var ka = !1;
  function Ma(t) {
    Oa[t] ||
      (t !== xa && (ja(), (xa = t)),
      (ka = !0),
      Ta || (Ta = J.setTimeout(ja, 500)),
      Na().length >= 2022 && ja());
  }
  var Fa = k();
  function Pa() {
    Fa = k();
  }
  function Ga() {
    return [
      ['v', '3'],
      ['t', 't'],
      ['pid', String(Fa)]
    ];
  }
  var La = {};
  function Ra(t, e, n) {
    jn && void 0 !== t && ((La[t] = La[t] || []), La[t].push(n + e), Ma(t));
  }
  function Da(t) {
    var e = t.eventId,
      n = t.Yc,
      r = [],
      i = La[e] || [];
    return (i.length && r.push(['epr', i.join('.')]), n && delete La[e], r);
  }
  function Ua(t, e, n, r) {
    var i = aa(n, r.isGtmEvent);
    i && Ha.push('event', [e, t], i, r);
  }
  var Ka = function () {
      ((this.O = {}),
        (this.N = {}),
        (this.P = {}),
        (this.ba = null),
        (this.K = {}),
        (this.F = !1),
        (this.status = 1));
    },
    qa = function (t, e, n, r) {
      ((this.K = R()), (this.F = e), (this.args = n), (this.messageContext = r), (this.type = t));
    },
    za = function () {
      ((this.destinations = {}), (this.F = {}), (this.commands = []));
    },
    Va = function (t, e) {
      var n = e.destinationId;
      return ($n || (n = pr(n)), (t.destinations[n] = t.destinations[n] || new Ka()));
    },
    Ba = function (t, e, n, r) {
      if (r.F) {
        var i = Va(t, r.F),
          a = i.ba;
        if (a) {
          var o = r.F.id;
          $n || (o = pr(o));
          var s = It(n, null),
            c = It(i.O[o], null),
            u = It(i.K, null),
            l = It(i.N, null),
            f = It(t.F, null),
            d = {};
          if (jn)
            try {
              d = It(rn, null);
            } catch (t) {
              Ce(72);
            }
          var v = r.F.prefix,
            g = function (t) {
              Ra(r.messageContext.eventId, v, t);
            },
            h = (function (t) {
              return new ma(
                t.eventId,
                t.priorityId,
                t.K,
                t.P,
                t.F,
                t.N,
                t.O,
                t.eventMetadata,
                t.onSuccess,
                t.onFailure,
                t.isGtmEvent
              );
            })(
              (function (t, e) {
                return ((t.isGtmEvent = e), t);
              })(
                (function (t, e) {
                  return ((t.onFailure = e), t);
                })(
                  (function (t, e) {
                    return ((t.onSuccess = e), t);
                  })(
                    (function (t, e) {
                      return ((t.eventMetadata = e || {}), t);
                    })(
                      (function (t, e) {
                        return ((t.ba = e), t);
                      })(
                        (function (t, e) {
                          return ((t.N = e), t);
                        })(
                          (function (t, e) {
                            return ((t.O = e), t);
                          })(
                            (function (t, e) {
                              return ((t.F = e), t);
                            })(
                              (function (t, e) {
                                return ((t.P = e), t);
                              })(
                                (function (t, e) {
                                  return ((t.K = e), t);
                                })(
                                  new _a(r.messageContext.eventId, r.messageContext.priorityId),
                                  s
                                ),
                                c
                              ),
                              u
                            ),
                            l
                          ),
                          f
                        ),
                        d
                      ),
                      r.messageContext.eventMetadata
                    ),
                    function () {
                      if (g) {
                        var t = g;
                        ((g = void 0),
                          t('2'),
                          r.messageContext.onSuccess && r.messageContext.onSuccess());
                      }
                    }
                  ),
                  function () {
                    if (g) {
                      var t = g;
                      ((g = void 0),
                        t('3'),
                        r.messageContext.onFailure && r.messageContext.onFailure());
                    }
                  }
                ),
                !!r.messageContext.isGtmEvent
              )
            ),
            m = function () {
              try {
                Ra(r.messageContext.eventId, v, '1');
                var t = r.type,
                  n = r.F.id;
                if (Cn && 'config' === t) {
                  var i,
                    o = null == (i = aa(n)) ? void 0 : i.ids;
                  if (!(o && o.length > 1)) {
                    var s,
                      c = nt('google_tag_data', {});
                    (c.td || (c.td = {}), (s = c.td));
                    var u = It(h.O);
                    It(h.F, u);
                    var l,
                      f = [];
                    for (l in s) s.hasOwnProperty(l) && ha(s[l], u).length && f.push(l);
                    (f.length &&
                      ((function (t, e) {
                        if (e.length && Cn) {
                          var n;
                          (null != (n = la)[t] || (n[t] = []), null != fa[t] || (fa[t] = []));
                          var r = e.filter(function (e) {
                            return !fa[t].includes(e);
                          });
                          (la[t].push.apply(la[t], p(r)),
                            fa[t].push.apply(fa[t], p(r)),
                            !ga &&
                              r.length > 0 &&
                              (Xr('tdc', !0),
                              (ga = J.setTimeout(function () {
                                (Jr(), (la = {}), (ga = void 0));
                              }, ua))));
                        }
                      })(n, f),
                      O('TAGGING', da[Q.readyState] || 14)),
                      (s[n] = u));
                  }
                }
                a(r.F.id, e, r.K, h);
              } catch (t) {
                Ra(r.messageContext.eventId, v, '4');
              }
            };
          'gtag.get' === e ? m() : Ur(i.fa, m);
        }
      }
    };
  ((za.prototype.register = function (t, e, n) {
    var r = Va(this, t);
    3 !== r.status && ((r.ba = e), (r.status = 3), (r.fa = qr(n)), this.flush());
  }),
    (za.prototype.push = function (t, e, n, r) {
      (void 0 !== n &&
        (1 === Va(this, n).status && ((Va(this, n).status = 2), this.push('require', [{}], n, {})),
        Va(this, n).F && (r.deferrable = !1),
        r.eventMetadata || (r.eventMetadata = {}),
        r.eventMetadata[ya.C.Qe] || (r.eventMetadata[ya.C.Qe] = [n.destinationId]),
        r.eventMetadata[ya.C.Oh] || (r.eventMetadata[ya.C.Oh] = [n.id])),
        this.commands.push(new qa(t, n, e, r)),
        r.deferrable || this.flush());
    }),
    (za.prototype.flush = function (t) {
      for (
        var e = this, n = [], r = !1, i = {};
        this.commands.length;
        i = { Vb: void 0, Dg: void 0 }
      ) {
        var a = this.commands[0],
          o = a.F;
        if (a.messageContext.deferrable)
          (!o || Va(this, o).F
            ? ((a.messageContext.deferrable = !1), this.commands.push(a))
            : n.push(a),
            this.commands.shift());
        else {
          switch (a.type) {
            case 'require':
              if (3 !== Va(this, o).status && !t)
                return void this.commands.push.apply(this.commands, n);
              break;
            case 'set':
              var s = a.args[0];
              (F(s, function (t, n) {
                It(V(t, n), e.F);
              }),
                Fe(s, !0));
              break;
            case 'config':
              var c = Va(this, o);
              ((i.Vb = {}),
                F(
                  a.args[0],
                  (function (t) {
                    return function (e, n) {
                      It(V(e, n), t.Vb);
                    };
                  })(i)
                ));
              var u = !!i.Vb[ue.m.Gc];
              delete i.Vb[ue.m.Gc];
              var l = o.destinationId === o.id;
              (Fe(i.Vb, !0),
                u || (l ? (c.K = {}) : (c.O[o.id] = {})),
                (c.F && u) || Ba(this, ue.m.la, i.Vb, a),
                (c.F = !0),
                l ? It(i.Vb, c.K) : (It(i.Vb, c.O[o.id]), Ce(70)),
                (r = !0),
                ae(166) || (li(i.Vb, o.id), (ii = !0)));
              break;
            case 'event':
              if (
                ((i.Dg = {}),
                F(
                  a.args[0],
                  (function (t) {
                    return function (e, n) {
                      It(V(e, n), t.Dg);
                    };
                  })(i)
                ),
                Fe(i.Dg),
                Ba(this, a.args[1], i.Dg, a),
                !ae(166))
              ) {
                var f = void 0;
                (!a.F ||
                  (null != (f = a.messageContext.eventMetadata) && f[ya.C.bd]) ||
                  (si[a.F.id] = !0),
                  (ii = !0));
              }
              break;
            case 'get':
              var d = {},
                v = ((d[ue.m.Nb] = a.args[0]), (d[ue.m.fc] = a.args[1]), d);
              (Ba(this, ue.m.qb, v, a), ae(166) || (ii = !0));
          }
          (this.commands.shift(), Wa(this, a));
        }
      }
      (this.commands.push.apply(this.commands, n), r && this.flush());
    }));
  var Wa = function (t, e) {
      if ('require' !== e.type)
        if (e.F) for (var n = Va(t, e.F).P[e.type] || [], r = 0; r < n.length; r++) n[r]();
        else
          for (var i in t.destinations)
            if (t.destinations.hasOwnProperty(i)) {
              var a = t.destinations[i];
              if (a && a.P) for (var o = a.P[e.type] || [], s = 0; s < o.length; s++) o[s]();
            }
    },
    Ha = new za();
  function Za(t, e, n) {
    return 'function' == typeof t.addEventListener && (t.addEventListener(e, n, !1), !0);
  }
  function Ya(t, e, n) {
    'function' == typeof t.removeEventListener && t.removeEventListener(e, n, !1);
  }
  function Xa(t) {
    var e;
    e = void 0 !== e && e;
    var n = 'https://pagead2.googlesyndication.com/pagead/gen_204?id=tcfe';
    (!(function (t, e) {
      if (t) for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && e(t[n], n, t);
    })(t, function (t, e) {
      (t || 0 === t) && (n += '&' + e + '=' + encodeURIComponent(String(t)));
    }),
      (function (t, e) {
        var n,
          r = window;
        if (((e = void 0 !== e && e), (n = void 0 !== n && n), r.fetch)) {
          var i = {
            keepalive: !0,
            credentials: 'include',
            redirect: 'follow',
            method: 'get',
            mode: 'no-cors'
          };
          (n &&
            ((i.mode = 'cors'),
            'setAttributionReporting' in XMLHttpRequest.prototype
              ? (i.attributionReporting = { eventSourceEligible: 'true', triggerEligible: 'false' })
              : (i.headers = { 'Attribution-Reporting-Eligible': 'event-source' })),
            r.fetch(t, i));
        } else
          !(function (t, e, n, r) {
            ((r = void 0 !== r && r), t.google_image_requests || (t.google_image_requests = []));
            var i = Rn(t.document);
            if (n) {
              var a = function () {
                if (n) {
                  var e = t.google_image_requests,
                    r = X(e, i);
                  r >= 0 && Array.prototype.splice.call(e, r, 1);
                }
                (Ya(i, 'load', a), Ya(i, 'error', a));
              };
              (Za(i, 'load', a), Za(i, 'error', a));
            }
            (r && (i.attributionSrc = ''), (i.src = e), t.google_image_requests.push(i));
          })(r, t, void 0 !== e && e, void 0 !== n && n);
      })(n, e));
  }
  var Ja = function () {
    ((this.ba = this.ba), (this.O = this.O));
  };
  function Qa(t) {
    return (
      void 0 !== t.addtlConsent && 'string' != typeof t.addtlConsent && (t.addtlConsent = void 0),
      void 0 !== t.gdprApplies && 'boolean' != typeof t.gdprApplies && (t.gdprApplies = void 0),
      (void 0 !== t.tcString && 'string' != typeof t.tcString) ||
      (void 0 !== t.listenerId && 'number' != typeof t.listenerId)
        ? 2
        : t.cmpStatus && 'error' !== t.cmpStatus
          ? 0
          : 3
    );
  }
  ((Ja.prototype.ba = !1),
    (Ja.prototype.dispose = function () {
      this.ba || ((this.ba = !0), this.N());
    }),
    (Ja.prototype[Symbol.dispose] = function () {
      this.dispose();
    }),
    (Ja.prototype.addOnDisposeCallback = function (t, e) {
      this.ba
        ? void 0 !== e
          ? t.call(e)
          : t()
        : (this.O || (this.O = []), e && (t = t.bind(e)), this.O.push(t));
    }),
    (Ja.prototype.N = function () {
      if (this.O) for (; this.O.length; ) this.O.shift()();
    }));
  var $a = function (t, e) {
    var n, r;
    ((e = void 0 === e ? {} : e),
      Ja.call(this),
      (this.F = null),
      (this.fa = {}),
      (this.oc = 0),
      (this.P = null),
      (this.K = t),
      (this.jb = null != (n = e.timeoutMs) ? n : 500),
      (this.Ga = null != (r = e.Lp) && r));
  };
  (f($a, Ja),
    ($a.prototype.N = function () {
      ((this.fa = {}),
        this.P && (Ya(this.K, 'message', this.P), delete this.P),
        delete this.fa,
        delete this.K,
        delete this.F,
        Ja.prototype.N.call(this));
    }));
  var to = function (t) {
    return 'function' == typeof t.K.__tcfapi || null != io(t);
  };
  (($a.prototype.addEventListener = function (t) {
    var e = this,
      n = { internalBlockOnErrors: this.Ga },
      r = Fn(function () {
        return t(n);
      }),
      i = 0;
    -1 !== this.jb &&
      (i = setTimeout(function () {
        ((n.tcString = 'tcunavailable'), (n.internalErrorState = 1), r());
      }, this.jb));
    try {
      ro(this, 'addEventListener', function (r, a) {
        (clearTimeout(i),
          r
            ? (((n = r).internalErrorState = Qa(n)),
              (n.internalBlockOnErrors = e.Ga),
              (a && 0 === n.internalErrorState) ||
                ((n.tcString = 'tcunavailable'), a || (n.internalErrorState = 3)))
            : ((n.tcString = 'tcunavailable'), (n.internalErrorState = 3)),
          t(n));
      });
    } catch (t) {
      ((n.tcString = 'tcunavailable'),
        (n.internalErrorState = 3),
        i && (clearTimeout(i), (i = 0)),
        r());
    }
  }),
    ($a.prototype.removeEventListener = function (t) {
      t && t.listenerId && ro(this, 'removeEventListener', null, t.listenerId);
    }));
  var eo = function (t, e, n) {
      var r, i;
      r = void 0 === r ? '755' : r;
      t: {
        if (t.publisher && t.publisher.restrictions) {
          var a = t.publisher.restrictions[e];
          if (void 0 !== a) {
            i = a[void 0 === r ? '755' : r];
            break t;
          }
        }
        i = void 0;
      }
      if (0 === i) return !1;
      var o,
        s = n;
      if (
        (2 === n ? ((s = 0), 2 === i && (s = 1)) : 3 === n && ((s = 1), 1 === i && (s = 0)),
        0 === s)
      )
        if (t.purpose && t.vendor) {
          var c = no(t.vendor.consents, void 0 === r ? '755' : r);
          o =
            !(!c || '1' !== e || !t.purposeOneTreatment || 'CH' !== t.publisherCC) ||
            (c && no(t.purpose.consents, e));
        } else o = !0;
      else
        o =
          1 !== s ||
          !t.purpose ||
          !t.vendor ||
          (no(t.purpose.legitimateInterests, e) &&
            no(t.vendor.legitimateInterests, void 0 === r ? '755' : r));
      return o;
    },
    no = function (t, e) {
      return !(!t || !t[e]);
    },
    ro = function (t, e, n, r) {
      n || (n = function () {});
      var i = t.K;
      if ('function' == typeof i.__tcfapi) (0, i.__tcfapi)(e, 2, n, r);
      else if (io(t)) {
        ao(t);
        var a = ++t.oc;
        if (((t.fa[a] = n), t.F)) {
          var o = {};
          t.F.postMessage(
            ((o.__tcfapiCall = { command: e, version: 2, callId: a, parameter: r }), o),
            '*'
          );
        }
      } else n({}, !1);
    },
    io = function (t) {
      return (t.F || (t.F = Gn(t.K, '__tcfapiLocator')), t.F);
    },
    ao = function (t) {
      if (!t.P) {
        var e = function (e) {
          try {
            var n;
            ((n = ('string' == typeof e.data ? JSON.parse(e.data) : e.data).__tcfapiReturn),
              t.fa[n.callId](n.returnValue, n.success));
          } catch (t) {}
        };
        ((t.P = e), Za(t.K, 'message', e));
      }
    },
    oo = function (t) {
      return (
        !1 === t.gdprApplies ||
        (void 0 === t.internalErrorState && (t.internalErrorState = Qa(t)),
        'error' === t.cmpStatus || 0 !== t.internalErrorState
          ? !t.internalBlockOnErrors || (Xa({ e: String(t.internalErrorState) }), !1)
          : 'loaded' === t.cmpStatus &&
            ('tcloaded' === t.eventStatus || 'useractioncomplete' === t.eventStatus))
      );
    },
    so = { 1: 0, 3: 0, 4: 0, 7: 3, 9: 3, 10: 3 };
  function co() {
    return Qi('tcf', function () {
      return {};
    });
  }
  var uo = function () {
    return new $a(J, { timeoutMs: -1 });
  };
  function lo() {
    var t = co(),
      e = uo();
    if ((to(e) && !po() && !go() && Ce(124), !t.active && to(e))) {
      (po() &&
        ((t.active = !0),
        (t.purposes = {}),
        (t.cmpId = 0),
        (t.tcfPolicyVersion = 0),
        (Er().active = !0),
        (t.tcString = 'tcunavailable')),
        (function () {
          var t = [ue.m.T, ue.m.Ea, ue.m.U];
          Er().waitForUpdate(t, 500, Ar);
        })());
      try {
        e.addEventListener(function (n) {
          if (0 !== n.internalErrorState)
            (fo(t), Zi([ue.m.T, ue.m.Ea, ue.m.U]), (Er().active = !0));
          else if (
            ((t.gdprApplies = n.gdprApplies),
            (t.cmpId = n.cmpId),
            (t.enableAdvertiserConsentMode = n.enableAdvertiserConsentMode),
            go() && (t.active = !0),
            !vo(n) || po() || go())
          ) {
            var r;
            if (((t.tcfPolicyVersion = n.tcfPolicyVersion), !1 === n.gdprApplies)) {
              var i,
                a = {};
              for (i in so) so.hasOwnProperty(i) && (a[i] = !0);
              ((r = a), e.removeEventListener(n));
            } else if (vo(n)) {
              var o,
                s = {};
              for (o in so)
                if (so.hasOwnProperty(o))
                  if ('1' === o) {
                    var c,
                      u = n,
                      l = { In: !0 };
                    ((l = void 0 === l ? {} : l),
                      (c =
                        !!oo(u) &&
                        (!1 === u.gdprApplies ||
                          ('tcunavailable' === u.tcString
                            ? !l.idpcApplies
                            : (!l.idpcApplies && void 0 === u.gdprApplies && !l.In) ||
                              !(
                                l.idpcApplies ||
                                ('string' == typeof u.tcString && u.tcString.length)
                              ) ||
                              eo(u, '1', 0)))),
                      (s[1] = c));
                  } else s[o] = eo(n, o, so[o]);
              r = s;
            }
            if (r) {
              ((t.tcString = n.tcString || 'tcempty'), (t.purposes = r));
              var f = {},
                d = ((f[ue.m.T] = t.purposes[1] ? 'granted' : 'denied'), f);
              !0 !== t.gdprApplies
                ? (Zi([ue.m.T, ue.m.Ea, ue.m.U]), (Er().active = !0))
                : ((d[ue.m.Ea] = t.purposes[3] && t.purposes[4] ? 'granted' : 'denied'),
                  'number' == typeof t.tcfPolicyVersion && t.tcfPolicyVersion >= 4
                    ? (d[ue.m.U] = t.purposes[1] && t.purposes[7] ? 'granted' : 'denied')
                    : Zi([ue.m.U]),
                  Wi(d, { eventId: 0 }, (t && t.gdprApplies, ho())));
            }
          } else Zi([ue.m.T, ue.m.Ea, ue.m.U]);
        });
      } catch (e) {
        (fo(t), Zi([ue.m.T, ue.m.Ea, ue.m.U]), (Er().active = !0));
      }
    }
  }
  function fo(t) {
    ((t.type = 'e'), (t.tcString = 'tcunavailable'));
  }
  function vo(t) {
    return (
      'tcloaded' === t.eventStatus ||
      'useractioncomplete' === t.eventStatus ||
      'cmpuishown' === t.eventStatus
    );
  }
  function po() {
    return !0 === J.gtag_enable_tcf_support;
  }
  function go() {
    return !0 === co().enableAdvertiserConsentMode;
  }
  function ho() {
    var t = co();
    if (t.active) return t.tcString;
  }
  (ue.m.T, ue.m.Z, ue.m.U, ue.m.Ea);
  var mo = {};
  ((mo[ue.m.T] = 1), (mo[ue.m.Z] = 2));
  var _o = {};
  ((_o[ue.m.T] = 0), (_o[ue.m.Z] = 1), (_o[ue.m.U] = 2), (_o[ue.m.Ea] = 3));
  var yo = { UA: 1, AW: 2, DC: 3, G: 4, GF: 5, GT: 12, GTM: 14, HA: 6, MC: 7 };
  function bo(t) {
    t = void 0 === t ? {} : t;
    var e = er.ctid.split('-')[0].toUpperCase(),
      n = {
        ctid: er.ctid,
        Co: Re.Mh,
        Fo: Re.Nh,
        io: Qn.Me ? 2 : 1,
        Lo: t.ql,
        Nk: er.canonicalContainerId
      };
    n.Nk !== t.Na && (n.Na = t.Na);
    var r = lr();
    ((n.no = r ? r.canonicalContainerId : void 0),
      qe ? ((n.Ng = yo[e]), n.Ng || (n.Ng = 0)) : (n.Ng = Be ? 13 : 10),
      Je.F ? ((n.Lg = 0), (n.fn = 2)) : (n.Lg = Ve ? 1 : 3));
    var i = {};
    if (((i[6] = $n), 2 === Je.K ? (i[7] = !0) : 1 === Je.K && (i[2] = !0), et)) {
      var a = pn(yn(et), 'host');
      a && (i[8] = null === a.match(/^(www\.)?googletagmanager\.com$/));
    }
    n.mn = i;
    var o,
      s = t.Yh,
      c = n.Ng,
      u = n.Lg;
    void 0 === c ? (o = '') : (u || (u = 0), (o = '' + Tt(1, 1) + xt((c << 2) | u)));
    var l,
      f = n.fn,
      v = '4' + o + (f ? '' + Tt(2, 1) + xt(f) : ''),
      p = n.Fo;
    l = p && Ot.test(p) ? '' + Tt(3, 2) + p : '';
    var g,
      h,
      m = n.Co;
    g = m ? '' + Tt(4, 1) + xt(m) : '';
    var _ = n.ctid;
    if (_ && s) {
      var y = _.split('-'),
        b = y[0].toUpperCase();
      if ('GTM' !== b && 'OPT' !== b) h = '';
      else {
        var E = y[1];
        h = '' + Tt(5, 3) + xt(1 + E.length) + (n.io || 0) + E;
      }
    } else h = '';
    var S,
      I = n.Lo,
      w = n.Nk,
      x = n.Na,
      O = n.Xp,
      T =
        v +
        l +
        g +
        h +
        (I ? '' + Tt(6, 1) + xt(I) : '') +
        (w ? '' + Tt(7, 3) + xt(w.length) + w : '') +
        (x ? '' + Tt(8, 3) + xt(x.length) + x : '') +
        (O ? '' + Tt(9, 3) + xt(O.length) + O : ''),
      A = n.mn;
    A = void 0 === A ? {} : A;
    for (var C = [], N = d(Object.keys(A)), j = N.next(); !j.done; j = N.next()) {
      var k = j.value;
      C[Number(k)] = A[k];
    }
    if (C.length) {
      var M,
        F = Tt(10, 3);
      if (0 === C.length) M = xt(0);
      else {
        for (var P = [], G = 0, L = !1, R = 0; R < C.length; R++) {
          L = !0;
          var D = R % 6;
          (C[R] && (G |= 1 << D), 5 === D && (P.push(xt(G)), (G = 0), (L = !1)));
        }
        (L && P.push(xt(G)), (M = P.join('')));
      }
      var U = M;
      S = '' + F + xt(U.length) + U;
    } else S = '';
    var K = n.no;
    return T + S + (K ? '' + Tt(11, 3) + xt(K.length) + K : '');
  }
  var Eo = {
    M: {
      Pm: 0,
      Pi: 1,
      vf: 2,
      Vi: 3,
      Qg: 4,
      Ti: 5,
      Ui: 6,
      Wi: 7,
      Rg: 8,
      Yj: 9,
      Xj: 10,
      Bh: 11,
      Zj: 12,
      fg: 13,
      ek: 14,
      Oe: 15,
      Nm: 16,
      Ed: 17,
      Sh: 18,
      Th: 19,
      Uh: 20,
      Gk: 21,
      Vh: 22,
      Ug: 23,
      ej: 24
    }
  };
  ((Eo.M[Eo.M.Pm] = 'RESERVED_ZERO'),
    (Eo.M[Eo.M.Pi] = 'ADS_CONVERSION_HIT'),
    (Eo.M[Eo.M.vf] = 'CONTAINER_EXECUTE_START'),
    (Eo.M[Eo.M.Vi] = 'CONTAINER_SETUP_END'),
    (Eo.M[Eo.M.Qg] = 'CONTAINER_SETUP_START'),
    (Eo.M[Eo.M.Ti] = 'CONTAINER_BLOCKING_END'),
    (Eo.M[Eo.M.Ui] = 'CONTAINER_EXECUTE_END'),
    (Eo.M[Eo.M.Wi] = 'CONTAINER_YIELD_END'),
    (Eo.M[Eo.M.Rg] = 'CONTAINER_YIELD_START'),
    (Eo.M[Eo.M.Yj] = 'EVENT_EXECUTE_END'),
    (Eo.M[Eo.M.Xj] = 'EVENT_EVALUATION_END'),
    (Eo.M[Eo.M.Bh] = 'EVENT_EVALUATION_START'),
    (Eo.M[Eo.M.Zj] = 'EVENT_SETUP_END'),
    (Eo.M[Eo.M.fg] = 'EVENT_SETUP_START'),
    (Eo.M[Eo.M.ek] = 'GA4_CONVERSION_HIT'),
    (Eo.M[Eo.M.Oe] = 'PAGE_LOAD'),
    (Eo.M[Eo.M.Nm] = 'PAGEVIEW'),
    (Eo.M[Eo.M.Ed] = 'SNIPPET_LOAD'),
    (Eo.M[Eo.M.Sh] = 'TAG_CALLBACK_ERROR'),
    (Eo.M[Eo.M.Th] = 'TAG_CALLBACK_FAILURE'),
    (Eo.M[Eo.M.Uh] = 'TAG_CALLBACK_SUCCESS'),
    (Eo.M[Eo.M.Gk] = 'TAG_EXECUTE_END'),
    (Eo.M[Eo.M.Vh] = 'TAG_EXECUTE_START'),
    (Eo.M[Eo.M.Ug] = 'CUSTOM_PERFORMANCE_START'),
    (Eo.M[Eo.M.ej] = 'CUSTOM_PERFORMANCE_END'));
  var So = [],
    Io = {},
    wo = {};
  function xo(t) {
    return 'null' !== t.origin;
  }
  function Oo(t, e, n, r) {
    if (!Ao(r)) return [];
    var i;
    So.includes('1') && (null == (i = gt()) || i.mark('1-' + Eo.M.Ug + '-' + (wo[1] || 0)));
    var a = (function (t, e, n) {
      for (
        var r = [],
          i = e.split(';'),
          a = function (t) {
            return ee(12) ? t.trim() : t.replace(/^\s*|\s*$/g, '');
          },
          o = 0;
        o < i.length;
        o++
      ) {
        var s = i[o].split('='),
          c = a(s[0]);
        if (c && c === t) {
          var u = a(s.slice(1).join('='));
          (u && n && (u = decodeURIComponent(u)), r.push(u));
        }
      }
      return r;
    })(t, String(e || To()), n);
    if (So.includes('1')) {
      var o,
        s = '1-' + Eo.M.ej + '-' + (wo[1] || 0),
        c = { start: '1-' + Eo.M.Ug + '-' + (wo[1] || 0), end: s };
      null == (o = gt()) || o.mark(s);
      var u,
        l,
        f = null == (l = null == (u = gt()) ? void 0 : u.measure(s, c)) ? void 0 : l.duration;
      void 0 !== f && ((wo[1] = (wo[1] || 0) + 1), (Io[1] = f + (Io[1] || 0)));
    }
    return a;
  }
  var To = function () {
      return xo(window) ? window.document.cookie : '';
    },
    Ao = function (t) {
      return (
        !t ||
        !ee(8) ||
        (Array.isArray(t) ? t : [t]).every(function (t) {
          return Nr(t) && Cr(t);
        })
      );
    };
  var Co = {},
    No =
      ((Co.k = { ma: /^[\w-]+$/ }),
      (Co.b = { ma: /^[\w-]+$/, Ji: !0 }),
      (Co.i = { ma: /^[1-9]\d*$/ }),
      (Co.h = { ma: /^\d+$/ }),
      (Co.t = { ma: /^[1-9]\d*$/ }),
      (Co.d = { ma: /^[A-Za-z0-9_-]+$/ }),
      (Co.j = { ma: /^\d+$/ }),
      (Co.u = { ma: /^[1-9]\d*$/ }),
      (Co.l = { ma: /^[01]$/ }),
      (Co.o = { ma: /^[1-9]\d*$/ }),
      (Co.g = { ma: /^[01]$/ }),
      (Co.s = { ma: /^.+$/ }),
      Co),
    jo = {},
    ko =
      ((jo[5] = { Og: { 2: Mo }, yi: '2', Ag: ['k', 'i', 'b', 'u'] }),
      (jo[4] = {
        Og: {
          2: Mo,
          GCL: function (t) {
            var e = t.split('.');
            e.shift();
            var n = e.shift(),
              r = e.shift(),
              i = {};
            return ((i.k = r), (i.i = n), (i.b = e), i);
          }
        },
        yi: '2',
        Ag: ['k', 'i', 'b']
      }),
      (jo[2] = {
        Og: {
          GS2: Mo,
          GS1: function (t) {
            var e = t.split('.').slice(2);
            if (!(e.length < 5 || e.length > 7)) {
              var n = {};
              return (
                (n.s = e[0]),
                (n.o = e[1]),
                (n.g = e[2]),
                (n.t = e[3]),
                (n.j = e[4]),
                (n.l = e[5]),
                (n.h = e[6]),
                n
              );
            }
          }
        },
        yi: 'GS2',
        Ag: 'sogtjlhd'.split('')
      }),
      jo);
  function Mo(t, e) {
    var n = t.split('.');
    if (3 === n.length) {
      var r = n[2];
      if (-1 === r.indexOf('$') && -1 !== r.indexOf('%24'))
        try {
          r = decodeURIComponent(r);
        } catch (t) {}
      var i = {},
        a = ko[e];
      if (a) {
        for (var o = a.Ag, s = d(r.split('$')), c = s.next(); !c.done; c = s.next()) {
          var u = c.value,
            l = u[0];
          if (-1 !== o.indexOf(l))
            try {
              var f = decodeURIComponent(u.substring(1)),
                v = No[l];
              v && (v.Ji ? ((i[l] = i[l] || []), i[l].push(f)) : (i[l] = f));
            } catch (t) {}
        }
        return i;
      }
    }
  }
  new Map([
    [5, 'ad_storage'],
    [4, ['ad_storage', 'ad_user_data']],
    [2, 'analytics_storage']
  ]);
  var Fo = function () {
    this.value = 0;
  };
  Fo.prototype.set = function (t) {
    return (this.value |= 1 << t);
  };
  ((Fo.prototype.get = function () {
    return this.value;
  }),
    (Fo.prototype.clear = function (t) {
      this.value &= ~(1 << t);
    }),
    (Fo.prototype.clearAll = function () {
      this.value = 0;
    }),
    (Fo.prototype.equals = function (t) {
      return this.value === t.value;
    }));
  var Po = {};
  ((Po.aw = '_aw'),
    (Po.dc = '_dc'),
    (Po.gf = '_gf'),
    (Po.gp = '_gp'),
    (Po.gs = '_gs'),
    (Po.ha = '_ha'),
    (Po.ag = '_ag'),
    (Po.gb = '_gb'));
  var Go = function () {
    this.F = this.gppString = void 0;
  };
  Go.prototype.reset = function () {
    this.F = this.gppString = void 0;
  };
  var Lo = new Go();
  RegExp('^UA-\\d+-\\d+%3A[\\w-]+(?:%2C[\\w-]+)*(?:%3BUA-\\d+-\\d+%3A[\\w-]+(?:%2C[\\w-]+)*)*$');
  function Ro(t, e, n, r) {
    var i,
      a = (function () {
        if (et) {
          var t = et.toLowerCase();
          if (0 === t.indexOf('https://')) return 2;
          if (0 === t.indexOf('http://')) return 3;
        }
        return 1;
      })();
    if (1 === a)
      t: {
        for (
          var o = We,
            s = 'https://' + (o = o.toLowerCase()),
            c = 'http://' + o,
            u = 1,
            l = Q.getElementsByTagName('script'),
            f = 0;
          f < l.length && f < 100;
          f++
        ) {
          var d = l[f].src;
          if (d) {
            if (0 === (d = d.toLowerCase()).indexOf(c)) {
              i = 3;
              break t;
            }
            1 === u && 0 === d.indexOf(s) && (u = 2);
          }
        }
        i = u;
      }
    else i = a;
    return (2 === i || r || 'http:' !== J.location.protocol ? t : e) + n;
  }
  function Do() {
    return arguments;
  }
  var Uo = function () {
    ((this.messages = []), (this.F = []));
  };
  function Ko(t, e, n) {
    ((n.eventMetadata = n.eventMetadata || {}),
      (n.eventMetadata[ya.C.Sa] = er.canonicalContainerId),
      qo().enqueue(t, e, n));
  }
  function qo() {
    return Qi('mb', function () {
      return new Uo();
    });
  }
  ((Uo.prototype.enqueue = function (t, e, n) {
    var r = this.messages.length + 1;
    ((t['gtm.uniqueEventId'] = e), (t['gtm.priorityId'] = r));
    var i = {
      message: t,
      notBeforeEventId: e,
      priorityId: r,
      messageContext: Object.assign({}, n, {
        eventId: e,
        priorityId: r,
        fromContainerExecution: !0
      })
    };
    this.messages.push(i);
    for (var a = 0; a < this.F.length; a++)
      try {
        this.F[a](i);
      } catch (t) {}
  }),
    (Uo.prototype.listen = function (t) {
      this.F.push(t);
    }),
    (Uo.prototype.get = function () {
      for (var t = {}, e = 0; e < this.messages.length; e++) {
        var n = this.messages[e],
          r = t[n.notBeforeEventId];
        (r || ((r = []), (t[n.notBeforeEventId] = r)), r.push(n));
      }
      return t;
    }),
    (Uo.prototype.prune = function (t) {
      for (var e = [], n = [], r = 0; r < this.messages.length; r++) {
        var i = this.messages[r];
        i.notBeforeEventId === t ? e.push(i) : n.push(i);
      }
      return ((this.messages = n), e);
    }));
  var zo = Number('') || 5,
    Vo = Number('') || 50,
    Bo = k(),
    Wo = function (t, e) {
      t &&
        (Ho('sid', t.targetId, e),
        Ho('cc', t.clientCount, e),
        Ho('tl', t.totalLifeMs, e),
        Ho('hc', t.heartbeatCount, e),
        Ho('cl', t.clientLifeMs, e));
    },
    Ho = function (t, e, n) {
      null != e && n.push(t + '=' + e);
    },
    Zo = function () {
      var t,
        e = Q.referrer;
      return e ? (pn(yn(e), 'host') === (null == (t = J.location) ? void 0 : t.host) ? 1 : 2) : 0;
    },
    Yo = function () {
      ((this.P = es), (this.N = 0));
    };
  ((Yo.prototype.K = function (t, e, n, r) {
    var i,
      a = Zo(),
      o = [];
    ((i =
      J === J.top && 0 !== a && e
        ? (null == e ? void 0 : e.clientCount) > 1
          ? 2 === a
            ? 1
            : 2
          : 2 === a
            ? 0
            : 3
        : 4),
      t && Ho('si', t.df, o),
      Ho('m', 0, o),
      Ho('iss', i, o),
      Ho('if', n, o),
      Wo(e, o),
      r && Ho('fm', encodeURIComponent(r.substring(0, Vo)), o),
      this.O(o));
  }),
    (Yo.prototype.F = function (t, e, n, r, i) {
      var a = [];
      (Ho('m', 1, a),
        Ho('s', t, a),
        Ho('po', Zo(), a),
        e && (Ho('st', e.state, a), Ho('si', e.df, a), Ho('sm', e.nf, a)),
        Wo(n, a),
        Ho('c', r, a),
        i && Ho('fm', encodeURIComponent(i.substring(0, Vo)), a),
        this.O(a));
    }),
    (Yo.prototype.O = function (t) {
      ((t = void 0 === t ? [] : t),
        !jn ||
          this.N >= zo ||
          (Ho('pid', Bo, t),
          Ho('bc', ++this.N, t),
          t.unshift('ctid=' + er.ctid + '&t=s'),
          this.P('https://www.googletagmanager.com/a?' + t.join('&'))));
    }));
  var Xo = Number('') || 500,
    Jo = Number('') || 5e3,
    Qo = Number('20') || 10,
    $o = Number('') || 5e3;
  function ts(t) {
    return (t.performance && t.performance.now()) || Date.now();
  }
  var es = function (t) {
      Ur(qr(br.W.Kc), function () {
        mt(t);
      });
    },
    ns = function (t, e, n, r, i) {
      var a = this;
      ((this.K = r),
        (this.P = this.O = !1),
        (this.ba = null),
        (this.initTime = n),
        (this.F = 15),
        (this.N = this.rn(t)),
        J.setTimeout(function () {
          a.initialize();
        }, 1e3),
        lt(function () {
          a.ao(t, e, i);
        }));
    };
  (((t = ns.prototype).delegate = function (t, e, n) {
    2 !== this.getState()
      ? (this.K.F(
          this.F,
          { state: this.getState(), df: this.initTime, nf: Math.round(R()) - this.initTime },
          void 0,
          t.commandType
        ),
        n({ failureType: this.F }))
      : this.N.bn(t, e, n);
  }),
    (t.getState = function () {
      return this.N.getState().state;
    }),
    (t.ao = function (t, e, n) {
      var r = J.location.origin,
        i = this,
        a = st();
      try {
        var o,
          s = a.contentDocument.createElement('iframe'),
          c = t.pathname,
          u = '/' === c[c.length - 1] ? t.toString() : t.toString() + '/',
          l = e
            ? (function (t) {
                var e = t.substring(0, t.indexOf('/_/service_worker'));
                return '&1p=1' + (e ? '&path=' + encodeURIComponent(e) : '');
              })(c)
            : '';
        (ae(133) && (o = { sandbox: 'allow-same-origin allow-scripts' }),
          st(
            u + 'sw_iframe.html?origin=' + encodeURIComponent(r) + l + (n ? '&e=1' : ''),
            void 0,
            o,
            void 0,
            s
          ));
        var f = function () {
          (a.contentDocument.body.appendChild(s),
            s.addEventListener('load', function () {
              ((i.ba = s.contentWindow),
                a.contentWindow.addEventListener('message', function (e) {
                  e.origin === t.origin && i.N.Rn(e.data);
                }),
                i.initialize());
            }));
        };
        'complete' === a.contentDocument.readyState
          ? f()
          : a.contentWindow.addEventListener('load', function () {
              f();
            });
      } catch (t) {
        (a.parentElement.removeChild(a),
          (this.F = 11),
          this.K.K(void 0, void 0, this.F, t.toString()));
      }
    }),
    (t.rn = function (t) {
      var e = this,
        n = (function (t, e) {
          var n = function (t, e, n) {
            ((n =
              void 0 === n
                ? {
                    Yk: function () {},
                    Zk: function () {},
                    Xk: function () {},
                    onFailure: function () {}
                  }
                : n),
              (this.Wm = t),
              (this.F = e),
              (this.N = n),
              (this.ba = this.fa = this.heartbeatCount = this.Vm = 0),
              (this.ug = !1),
              (this.K = {}),
              (this.id = String(Math.floor(Number.MAX_SAFE_INTEGER * Math.random()))),
              (this.state = 0),
              (this.df = ts(this.F)),
              (this.nf = ts(this.F)),
              (this.P = 10));
          };
          return (
            (n.prototype.init = function () {
              (this.O(1), this.Ga());
            }),
            (n.prototype.getState = function () {
              return {
                state: this.state,
                df: Math.round(ts(this.F) - this.df),
                nf: Math.round(ts(this.F) - this.nf)
              };
            }),
            (n.prototype.O = function (t) {
              this.state !== t && ((this.state = t), (this.nf = ts(this.F)));
            }),
            (n.prototype.Ik = function () {
              return String(this.Vm++);
            }),
            (n.prototype.Ga = function () {
              var t = this;
              (this.heartbeatCount++,
                this.jb(
                  { type: 0, clientId: this.id, requestId: this.Ik(), maxDelay: this.xg() },
                  function (e) {
                    var n;
                    if (0 === e.type)
                      if (null != (null == (n = e.failure) ? void 0 : n.failureType))
                        if ((e.stats && (t.stats = e.stats), t.ba++, e.isDead || t.ba > Qo)) {
                          var r,
                            i,
                            a = e.isDead && e.failure.failureType;
                          ((t.P = a || 10),
                            t.O(4),
                            t.Tm(),
                            null == (i = (r = t.N).Xk) ||
                              i.call(r, { failureType: a || 10, data: e.failure.data }));
                        } else (t.O(3), t.Kk());
                      else {
                        var o, s;
                        (t.heartbeatCount > e.stats.heartbeatCount + Qo &&
                          ((t.heartbeatCount = e.stats.heartbeatCount),
                          null == (s = (o = t.N).onFailure) || s.call(o, { failureType: 13 })),
                          (t.stats = e.stats));
                        var c = t.state;
                        if ((t.O(2), 2 !== c))
                          if (t.ug) {
                            var u, l;
                            null == (l = (u = t.N).Zk) || l.call(u);
                          } else {
                            var f, d;
                            ((t.ug = !0), null == (d = (f = t.N).Yk) || d.call(f));
                          }
                        ((t.ba = 0), t.Xm(), t.Kk());
                      }
                  }
                ));
            }),
            (n.prototype.xg = function () {
              return 2 === this.state ? Jo : Xo;
            }),
            (n.prototype.Kk = function () {
              var t = this;
              this.F.setTimeout(
                function () {
                  t.Ga();
                },
                Math.max(0, this.xg() - (ts(this.F) - this.fa))
              );
            }),
            (n.prototype.bn = function (t, e, n) {
              var r = this;
              this.jb(
                { type: 1, clientId: this.id, requestId: this.Ik(), command: t },
                function (t) {
                  if (1 === t.type)
                    if (t.result) e(t.result);
                    else {
                      var i,
                        a,
                        o,
                        s,
                        c,
                        u = {
                          failureType:
                            null != (o = null == (i = t.failure) ? void 0 : i.failureType) ? o : 12,
                          data: null == (a = t.failure) ? void 0 : a.data
                        };
                      (null == (c = (s = r.N).onFailure) || c.call(s, u), n(u));
                    }
                }
              );
            }),
            (n.prototype.jb = function (t, e) {
              var n = this;
              if (4 === this.state) ((t.failure = { failureType: this.P }), e(t));
              else {
                var r,
                  i = 2 !== this.state && 0 !== t.type,
                  a = t.requestId,
                  o = {
                    request: t,
                    ol: e,
                    jl: i,
                    ko: this.F.setTimeout(
                      function () {
                        var t = n.K[a];
                        t && n.Ne(t, 7);
                      },
                      null != (r = t.maxDelay) ? r : $o
                    )
                  };
                ((this.K[a] = o), i || this.sendRequest(o));
              }
            }),
            (n.prototype.sendRequest = function (t) {
              ((this.fa = ts(this.F)), (t.jl = !1), this.Wm(t.request));
            }),
            (n.prototype.Xm = function () {
              for (var t = d(Object.keys(this.K)), e = t.next(); !e.done; e = t.next()) {
                var n = this.K[e.value];
                n.jl && this.sendRequest(n);
              }
            }),
            (n.prototype.Tm = function () {
              for (var t = d(Object.keys(this.K)), e = t.next(); !e.done; e = t.next())
                this.Ne(this.K[e.value], this.P);
            }),
            (n.prototype.Ne = function (t, e) {
              this.oc(t);
              var n = t.request;
              ((n.failure = { failureType: e }), t.ol(n));
            }),
            (n.prototype.oc = function (t) {
              (delete this.K[t.request.requestId], this.F.clearTimeout(t.ko));
            }),
            (n.prototype.Rn = function (t) {
              this.fa = ts(this.F);
              var e,
                n,
                r = this.K[t.requestId];
              r
                ? (this.oc(r), r.ol(t))
                : null == (n = (e = this.N).onFailure) || n.call(e, { failureType: 14 });
            }),
            new n(t, J, e)
          );
        })(
          function (n) {
            var r;
            null == (r = e.ba) || r.postMessage(n, t.origin);
          },
          {
            Yk: function () {
              ((e.O = !0), e.K.K(n.getState(), n.stats));
            },
            Zk: function () {},
            Xk: function (t) {
              e.O
                ? ((e.F = (null == t ? void 0 : t.failureType) || 10),
                  e.K.F(e.F, n.getState(), n.stats, void 0, null == t ? void 0 : t.data))
                : ((e.F = (null == t ? void 0 : t.failureType) || 4),
                  e.K.K(n.getState(), n.stats, e.F, null == t ? void 0 : t.data));
            },
            onFailure: function (t) {
              ((e.F = t.failureType), e.K.F(e.F, n.getState(), n.stats, t.command, t.data));
            }
          }
        );
      return n;
    }),
    (t.initialize = function () {
      (this.P || this.N.init(), (this.P = !0));
    }));
  'platform platformVersion architecture model uaFullVersion bitness fullVersionList wow64'.split(
    ' '
  );
  var rs = {};
  rs.M = Eo.M;
  var is = {};
  ((is[rs.M.Th] = '6'), (is[rs.M.Uh] = '5'), (is[rs.M.Sh] = '7'));
  function as() {
    function t(t, n) {
      var r = T(n);
      r && e.push([t, r]);
    }
    var e = [];
    return (t('u', 'GTM'), t('ut', 'TAGGING'), t('h', 'HEALTH'), e);
  }
  Object.freeze({
    cache: 'no-store',
    credentials: 'include',
    method: 'GET',
    keepalive: !0,
    redirect: 'follow'
  });
  function os(t, n) {
    if (e.entities) {
      var r = e.entities[t];
      if (r) return r[n];
    }
  }
  function ss(t) {
    var e,
      n = sr();
    ((e = void 0 !== e && e), ls().addRestriction(0, n, t, e));
  }
  var cs = function () {
      ((this.container = {}), (this.F = {}));
    },
    us = function (t, e) {
      var n = t.container[e];
      return (
        n ||
          ((n = {
            _entity: { internal: [], external: [] },
            _event: { internal: [], external: [] }
          }),
          (t.container[e] = n)),
        n
      );
    };
  function ls() {
    return Qi('r', function () {
      return new cs();
    });
  }
  ((cs.prototype.addRestriction = function (t, e, n, r) {
    if (!(r = void 0 !== r && r) || !this.F[e]) {
      var i = us(this, e);
      0 === t
        ? r
          ? i._entity.external.push(n)
          : i._entity.internal.push(n)
        : 1 === t && (r ? i._event.external.push(n) : i._event.internal.push(n));
    }
  }),
    (cs.prototype.getRestrictions = function (t, e) {
      var n,
        r,
        i,
        a,
        o = us(this, e);
      return 0 === t
        ? [].concat(
            p((null == o || null == (n = o._entity) ? void 0 : n.internal) || []),
            p((null == o || null == (r = o._entity) ? void 0 : r.external) || [])
          )
        : 1 === t
          ? [].concat(
              p((null == o || null == (i = o._event) ? void 0 : i.internal) || []),
              p((null == o || null == (a = o._event) ? void 0 : a.external) || [])
            )
          : [];
    }),
    (cs.prototype.getExternalRestrictions = function (t, e) {
      var n,
        r,
        i = us(this, e);
      return 0 === t
        ? (null == i || null == (n = i._entity) ? void 0 : n.external) || []
        : (null == i || null == (r = i._event) ? void 0 : r.external) || [];
    }),
    (cs.prototype.removeExternalRestrictions = function (t) {
      var e = us(this, t);
      (e._event && (e._event.external = []),
        e._entity && (e._entity.external = []),
        (this.F[t] = !0));
    }));
  var fs = new RegExp(/^(.*\.)?(google|youtube|blogger|withgoogle)(\.com?)?(\.[a-z]{2})?\.?$/),
    ds = {
      cl: ['ecl'],
      customPixels: ['nonGooglePixels'],
      ecl: ['cl'],
      ehl: ['hl'],
      gaawc: ['googtag'],
      hl: ['ehl'],
      html: [
        'customScripts',
        'customPixels',
        'nonGooglePixels',
        'nonGoogleScripts',
        'nonGoogleIframes'
      ],
      customScripts: [
        'html',
        'customPixels',
        'nonGooglePixels',
        'nonGoogleScripts',
        'nonGoogleIframes'
      ],
      nonGooglePixels: [],
      nonGoogleScripts: ['nonGooglePixels'],
      nonGoogleIframes: ['nonGooglePixels']
    },
    vs = {
      cl: ['ecl'],
      customPixels: ['customScripts', 'html'],
      ecl: ['cl'],
      ehl: ['hl'],
      gaawc: ['googtag'],
      hl: ['ehl'],
      html: ['customScripts'],
      customScripts: ['html'],
      nonGooglePixels: [
        'customPixels',
        'customScripts',
        'html',
        'nonGoogleScripts',
        'nonGoogleIframes'
      ],
      nonGoogleScripts: ['customScripts', 'html'],
      nonGoogleIframes: ['customScripts', 'html', 'nonGoogleScripts']
    },
    ps =
      'google customPixels customScripts html nonGooglePixels nonGoogleScripts nonGoogleIframes'.split(
        ' '
      );
  function gs() {
    var t = sn('gtm.allowlist') || sn('gtm.whitelist');
    (t && Ce(9),
      qe && ((t = ['google', 'gtagfl', 'lcl', 'zone']), ae(48) && t.push('cmpPartners')),
      fs.test(J.location && J.location.hostname) &&
        (qe
          ? Ce(116)
          : (Ce(117),
            hs &&
              ((t = []),
              window.console &&
                window.console.log &&
                window.console.log('GTM blocked. See go/13687728.')))));
    var e = t && q(L(t), ds),
      n = sn('gtm.blocklist') || sn('gtm.blacklist');
    (n || ((n = sn('tagTypeBlacklist')) && Ce(3)),
      n ? Ce(8) : (n = []),
      fs.test(J.location && J.location.hostname) &&
        (n = L(n)).push('nonGooglePixels', 'nonGoogleScripts', 'sandboxedScripts'),
      L(n).indexOf('google') >= 0 && Ce(2));
    var r = n && q(L(n), vs),
      i = {};
    return function (a) {
      var o = a && a[kt.Fa];
      if (!o || 'string' != typeof o) return !0;
      if (((o = o.replace(/^_*/, '')), void 0 !== i[o])) return i[o];
      var s = Xe[o] || [],
        c = !0;
      if (t) {
        var u;
        if ((u = c))
          t: {
            if (e.indexOf(o) < 0) {
              if (ae(48) && qe && s.indexOf('cmpPartners') >= 0) {
                u = !0;
                break t;
              }
              if (!(s && s.length > 0)) {
                u = !1;
                break t;
              }
              for (var l = 0; l < s.length; l++)
                if (e.indexOf(s[l]) < 0) {
                  (Ce(11), (u = !1));
                  break t;
                }
            }
            u = !0;
          }
        c = u;
      }
      var f = !1;
      if (n) {
        var d = r.indexOf(o) >= 0;
        if (d) f = d;
        else {
          var v = M(r, s || []);
          (v && Ce(10), (f = v));
        }
      }
      var p = !c || f;
      return (
        !p &&
          -1 !== s.indexOf('sandboxedScripts') &&
          (ae(48) && qe && s.indexOf('cmpPartners') >= 0
            ? !(function () {
                var t = Jt(or(), function () {
                  return {};
                });
                try {
                  return (t('inject_cmp_banner'), !0);
                } catch (t) {
                  return !1;
                }
              })()
            : (!e || -1 === e.indexOf('sandboxedScripts')) && M(r, ps)) &&
          (p = !0),
        (i[o] = p)
      );
    };
  }
  var hs = !1;
  function ms(t, e, n, r) {
    if (!Es()) {
      var i = r.siloed ? vr(t) : t;
      if (!Jn().container[i]) {
        ((r.loadExperiments = Ge()),
          (function (t, e) {
            e.siloed && mr({ ctid: t, isDestination: !1 });
            var n = hr();
            ((Jn().container[t] = { state: 1, context: e, parent: n }),
              Zn({ ctid: t, isDestination: !1 }));
          })(i, r));
        var a = bs(t),
          o = function () {
            (Jn().container[i] && (Jn().container[i].state = 3), _s());
          },
          s = { destinationId: i, endpoint: 0 };
        if (tn()) Vn(s, $e() + '/' + a, void 0, o);
        else {
          var c = z(t, 'GTM-'),
            u = Sn(),
            l = n ? '/gtag/js' : '/gtm.js',
            f = En(e, l + a);
          if (!f) {
            var d = Re.xf + l;
            (u && et && c && (d = et.replace(/^(?:https?:\/\/)?/i, '').split(/[?#]/)[0]),
              (f = Ro('https://', 'http://', d + a)));
          }
          Vn(s, f, void 0, o);
        }
      }
    }
  }
  function _s() {
    var t;
    _r() ||
      F(
        ((t = {}),
        F(Jn().destination, function (e, n) {
          0 === n.state && (t[pr(e)] = n);
        }),
        t),
        function (t, e) {
          (ys(t, e.transportUrl, e.context), Ce(92));
        }
      );
  }
  function ys(t, e, n) {
    if (!Es()) {
      var r = n.siloed ? vr(t) : t,
        i = Jn().destination[r];
      if (!i || !i.state)
        if ((n.loadExperiments || (n.loadExperiments = Ge()), _r())) {
          var a;
          (null != (a = Jn().destination)[r] ||
            (a[r] = { state: 0, transportUrl: e, context: n, parent: hr() }),
            (Jn().destination[r].state = 0),
            Zn({ ctid: r, isDestination: !0 }),
            Ce(91));
        } else {
          var o;
          (n.siloed && mr({ ctid: r, isDestination: !0 }),
            null != (o = Jn().destination)[r] || (o[r] = { context: n, state: 1, parent: hr() }),
            (Jn().destination[r].state = 1),
            Zn({ ctid: r, isDestination: !0 }));
          var s = { destinationId: r, endpoint: 0 };
          if (tn()) Vn(s, $e() + '/gtd' + bs(t, !0));
          else {
            var c = '/gtag/destination' + bs(t, !0),
              u = En(e, c);
            (u || (u = Ro('https://', 'http://', Re.xf + c)), Vn(s, u));
          }
        }
    }
  }
  function bs(t, e) {
    e = void 0 !== e && e;
    var n = '?id=' + encodeURIComponent(t);
    ((ae(124) && 'dataLayer' === Re.Zb) || (n += '&l=' + Re.Zb),
      (z(t, 'GTM-') && !e) || (n = ae(130) ? n + (tn() ? '&sc=1' : '&cx=c') : n + '&cx=c'),
      (n += '&gtm=' + bo()),
      Sn() && (n += '&sign=' + Re.Qh));
    var r = Je.K;
    return (
      1 === r ? (n += '&fps=fc') : 2 === r && (n += '&fps=fe'),
      Qe() && (n += '&tag_exp=' + Qe()),
      n
    );
  }
  function Es() {
    return !1;
  }
  hs = !0;
  var Ss = function () {
    ((this.K = 0), (this.F = {}));
  };
  ((Ss.prototype.addListener = function (t, e, n) {
    var r = ++this.K;
    return ((this.F[t] = this.F[t] || {}), (this.F[t][String(r)] = { listener: e, Ld: n }), r);
  }),
    (Ss.prototype.removeListener = function (t, e) {
      var n = this.F[t],
        r = String(e);
      return !(!n || !n[r]) && (delete n[r], !0);
    }));
  var Is = function (t, e) {
    var n = [];
    return (
      F(tc.F[t], function (t, r) {
        n.indexOf(r.listener) < 0 &&
          (void 0 === r.Ld || e.indexOf(r.Ld) >= 0) &&
          n.push(r.listener);
      }),
      n
    );
  };
  var ws = function (t, e) {
      ((this.F = !1),
        (this.O = []),
        (this.eventData = { tags: [] }),
        (this.P = !1),
        (this.K = this.N = 0),
        As(this, t, e));
    },
    xs = function (t, e, n, r) {
      if (Ke.hasOwnProperty(e) || '__zone' === e) return -1;
      var i = {};
      return (
        St(r) && (i = It(r, i)),
        (i.id = n),
        (i.status = 'timeout'),
        t.eventData.tags.push(i) - 1
      );
    },
    Os = function (t, e, n, r) {
      var i = t.eventData.tags[e];
      i && ((i.status = n), (i.executionTime = r));
    },
    Ts = function (t) {
      if (!t.F) {
        for (var e = t.O, n = 0; n < e.length; n++) e[n]();
        ((t.F = !0), (t.O.length = 0));
      }
    },
    As = function (t, e, n) {
      (void 0 !== e && Cs(t, e),
        n &&
          J.setTimeout(function () {
            Ts(t);
          }, Number(n)));
    },
    Cs = function (t, e) {
      var n = U(function () {
        lt(function () {
          e(or(), t.eventData);
        });
      });
      t.F ? n() : t.O.push(n);
    },
    Ns = function (t) {
      return (
        t.N++,
        U(function () {
          (t.K++, t.P && t.K >= t.N && Ts(t));
        })
      );
    },
    js = function (t) {
      ((t.P = !0), t.K >= t.N && Ts(t));
    };
  var ks = ['es', '1'],
    Ms = {},
    Fs = {};
  function Ps(t, e) {
    var n;
    jn &&
      ((n = e.match(/^(gtm|gtag)\./) ? encodeURIComponent(e) : '*'),
      (Ms[t] = [
        ['e', n],
        ['eid', t]
      ]),
      Ma(t));
  }
  function Gs(t) {
    var e = t.eventId,
      n = t.Yc;
    if (!Ms[e]) return [];
    var r = [];
    return (Fs[e] || r.push(ks), r.push.apply(r, p(Ms[e])), n && (Fs[e] = !0), r);
  }
  var Ls = {},
    Rs = {},
    Ds = {};
  function Us(t, e, n, r) {
    jn &&
      ae(120) &&
      (void 0 !== r && r
        ? ((Ds[e] = Ds[e] || 0), ++Ds[e])
        : void 0 !== n
          ? ((Rs[t] = Rs[t] || {}), (Rs[t][e] = Math.round(n)))
          : ((Ls[t] = Ls[t] || {}), (Ls[t][e] = (Ls[t][e] || 0) + 1)));
  }
  function Ks(t) {
    var e,
      n = t.eventId,
      r = t.Yc,
      i = Ls[n] || {},
      a = [];
    for (e in i) i.hasOwnProperty(e) && a.push('' + e + i[e]);
    return (r && delete Ls[n], a.length ? [['md', a.join('.')]] : []);
  }
  function qs(t) {
    var e,
      n = t.eventId,
      r = t.Yc,
      i = Rs[n] || {},
      a = [];
    for (e in i) i.hasOwnProperty(e) && a.push('' + e + i[e]);
    return (r && delete Rs[n], a.length ? [['mtd', a.join('.')]] : []);
  }
  function zs() {
    for (var t = [], e = d(Object.keys(Ds)), n = e.next(); !n.done; n = e.next()) {
      var r = n.value;
      t.push('' + r + Ds[r]);
    }
    return t.length ? [['mec', t.join('.')]] : [];
  }
  var Vs = {},
    Bs = {};
  function Ws(t, e, n) {
    if (jn && e) {
      var r = (function (t) {
        var e = String(t[kt.Fa] || '').replace(/_/g, '');
        return z(e, 'cvt') ? 'cvt' : e;
      })(e);
      ((Vs[t] = Vs[t] || []), Vs[t].push(n + r));
      var i = (qt(e) ? '1' : '2') + r;
      ((Bs[t] = Bs[t] || []), Bs[t].push(i), Ma(t));
    }
  }
  function Hs(t) {
    var e = t.eventId,
      n = t.Yc,
      r = [],
      i = Vs[e] || [];
    i.length && r.push(['tr', i.join('.')]);
    var a = Bs[e] || [];
    return (a.length && r.push(['ti', a.join('.')]), n && (delete Vs[e], delete Bs[e]), r);
  }
  function Zs(t, e, n, r) {
    var i = Gt[t],
      a = (function (t, e, n, r) {
        function i() {
          function e() {
            fi(3);
            var t = R() - f;
            (Ws(n.id, a, '7'),
              Os(n.Mc, u, 'exception', t),
              ae(109) && rs.M.Sh,
              l || ((l = !0), s()));
          }
          if (a[kt.Jm]) s();
          else {
            var r = zt(a, n, []),
              i = r[kt.Al];
            if (null != i) for (var c = 0; c < i.length; c++) if (!Hi(i[c])) return void s();
            var u = xs(n.Mc, String(a[kt.Fa]), Number(a[kt.yg]), r[kt.METADATA]),
              l = !1;
            ((r.vtp_gtmOnSuccess = function () {
              if (!l) {
                l = !0;
                var e = R() - f;
                (Ws(n.id, Gt[t], '5'), Os(n.Mc, u, 'success', e), ae(109) && rs.M.Uh, o());
              }
            }),
              (r.vtp_gtmOnFailure = function () {
                if (!l) {
                  l = !0;
                  var e = R() - f;
                  (Ws(n.id, Gt[t], '6'), Os(n.Mc, u, 'failure', e), ae(109) && rs.M.Th, s());
                }
              }),
              (r.vtp_gtmTagId = a.tag_id),
              (r.vtp_gtmEventId = n.id),
              n.priorityId && (r.vtp_gtmPriorityId = n.priorityId),
              Ws(n.id, a, '1'),
              ae(109));
            var f = R();
            try {
              Bt(r, { event: n, index: t, type: 1 });
            } catch (t) {
              e(t);
            }
            ae(109) && rs.M.Gk;
          }
        }
        var a = Gt[t],
          o = e.onSuccess,
          s = e.onFailure,
          c = e.terminate;
        if (n.isBlocked(a)) return null;
        var u = Vt(a[kt.Hk], n, []);
        if (u && u.length) {
          var l = u[0],
            f = Zs(l.index, { onSuccess: o, onFailure: s, terminate: c }, n, r);
          if (!f) return null;
          ((o = f), (s = 2 === l.Rk ? c : f));
        }
        if (a[kt.rk] || a[kt.Lm]) {
          var d = a[kt.rk] ? Lt : n.No,
            v = o,
            p = s;
          if (!d[t]) {
            var g = (function (t, e, n) {
              var r = [],
                i = [];
              return (
                (e[t] = (function (t, e, n) {
                  return function (r, i) {
                    (t.push(r), e.push(i), n());
                  };
                })(r, i, n)),
                {
                  onSuccess: function () {
                    e[t] = Ys;
                    for (var n = 0; n < r.length; n++) r[n]();
                  },
                  onFailure: function () {
                    e[t] = Xs;
                    for (var n = 0; n < i.length; n++) i[n]();
                  }
                }
              );
            })(t, d, U(i));
            ((o = g.onSuccess), (s = g.onFailure));
          }
          return function () {
            d[t](v, p);
          };
        }
        return i;
      })(t, e, n, r);
    if (!a) return null;
    var o = Vt(i[kt.Bk], n, []);
    if (o && o.length) {
      var s = o[0];
      a = Zs(
        s.index,
        { onSuccess: a, onFailure: 1 === s.Rk ? e.terminate : a, terminate: e.terminate },
        n,
        r
      );
    }
    return a;
  }
  function Ys(t) {
    t();
  }
  function Xs(t, e) {
    e();
  }
  var Js = function (t, e) {
    for (var n = [], r = 0; r < Gt.length; r++)
      if (t[r]) {
        var i = Gt[r],
          a = Ns(e.Mc);
        try {
          var o = Zs(r, { onSuccess: a, onFailure: a, terminate: a }, e, r);
          if (o) {
            var s = i[kt.Fa];
            if (!s) throw Error('Error: No function name given for function call.');
            var c = Ct[s];
            n.push({
              rl: r,
              priorityOverride: (c && c.priorityOverride) || os(i[kt.Fa], 1) || 0,
              execute: o
            });
          } else ($s(r, e), a());
        } catch (t) {
          a();
        }
      }
    n.sort(Qs);
    for (var u = 0; u < n.length; u++) n[u].execute();
    return n.length > 0;
  };
  function Qs(t, e) {
    var n,
      r,
      i = e.priorityOverride,
      a = t.priorityOverride;
    if (0 !== (n = i > a ? 1 : i < a ? -1 : 0)) r = n;
    else {
      var o = t.rl,
        s = e.rl;
      r = o > s ? 1 : o < s ? -1 : 0;
    }
    return r;
  }
  function $s(t, e) {
    if (jn) {
      var n = function (t) {
        var r = e.isBlocked(Gt[t]) ? '3' : '4',
          i = Vt(Gt[t][kt.Bk], e, []);
        (i && i.length && n(i[0].index), Ws(e.id, Gt[t], r));
        var a = Vt(Gt[t][kt.Hk], e, []);
        a && a.length && n(a[0].index);
      };
      n(t);
    }
  }
  var tc,
    ec = !1;
  function nc(t) {
    var e = t['gtm.uniqueEventId'],
      n = t['gtm.priorityId'],
      r = t.event;
    if ((ae(109), 'gtm.js' === r)) {
      if (ec) return !1;
      ec = !0;
    }
    var i = !1,
      a = (function () {
        var t = sr();
        return ls().getRestrictions(1, t);
      })(),
      o = It(t, null);
    if (
      !a.every(function (t) {
        return t({ originalEventData: o });
      })
    ) {
      if ('gtm.js' !== r && 'gtm.init' !== r && 'gtm.init_consent' !== r) return !1;
      i = !0;
    }
    Ps(e, r);
    var s = t.eventCallback,
      c = t.eventTimeout,
      u = {
        id: e,
        priorityId: n,
        name: r,
        isBlocked: ic(o, i),
        No: [],
        logMacroError: function () {
          (Ce(6), fi(0));
        },
        cachedModelValues: rc(),
        Mc: new ws(function () {
          (ae(109), s && s.apply(s, Array.prototype.slice.call(arguments, 0)));
        }, c),
        originalEventData: o
      };
    (ae(120) && jn && (u.reportMacroDiscrepancy = Us), ae(109) && u.id);
    var l = Ht(u);
    (ae(109) && u.id,
      i &&
        (l = (function (t) {
          for (var e = [], n = 0; n < t.length; n++)
            if (t[n]) {
              var r = String(Gt[n][kt.Fa]);
              (Ue[r] || void 0 !== Gt[n][kt.Mm] || os(r, 2)) && (e[n] = !0);
            }
          return e;
        })(l)),
      ae(109));
    var f = Js(l, u),
      d = (function (t, e) {
        if (!tc) return !1;
        var n = t['gtm.triggers'] && String(t['gtm.triggers']),
          r = Is(t.event, n ? String(n).split(',') : []);
        if (!r.length) return !1;
        for (var i = 0; i < r.length; ++i) {
          var a = Ns(e);
          try {
            r[i](t, a);
          } catch (t) {
            a();
          }
        }
        return !0;
      })(t, u.Mc);
    return (
      js(u.Mc),
      ('gtm.js' !== r && 'gtm.sync' !== r) || or(),
      (function (t, e) {
        if (!e) return e;
        for (var n = 0; n < t.length; n++)
          if (t[n] && Gt[n] && !Ke[String(Gt[n][kt.Fa])]) return !0;
        return !1;
      })(l, f) || d
    );
  }
  function rc() {
    var t = {};
    return (
      (t.event = fn('event', 1)),
      (t.ecommerce = fn('ecommerce', 1)),
      (t.gtm = fn('gtm')),
      (t.eventModel = fn('eventModel')),
      t
    );
  }
  function ic(t, e) {
    var n = gs();
    return function (r) {
      if (n(r)) return !0;
      var i = r && r[kt.Fa];
      if (!i || 'string' != typeof i) return !0;
      i = i.replace(/^_*/, '');
      var a,
        o = sr();
      a = ls().getRestrictions(0, o);
      var s = t;
      e && ((s = It(t, null))['gtm.uniqueEventId'] = Number.MAX_SAFE_INTEGER);
      for (var c = Xe[i] || [], u = d(a), l = u.next(); !l.done; l = u.next()) {
        var f = l.value;
        try {
          if (!f({ entityId: i, securityGroups: c, originalEventData: s })) return !0;
        } catch (t) {
          return !0;
        }
      }
      return !1;
    };
  }
  var ac = !1,
    oc = 0,
    sc = [];
  function cc(t) {
    if (!ac) {
      var e = Q.createEventObject,
        n = 'complete' === Q.readyState,
        r = 'interactive' === Q.readyState;
      if (!t || 'readystatechange' !== t.type || n || (!e && r)) {
        ac = !0;
        for (var i = 0; i < sc.length; i++) lt(sc[i]);
      }
      sc.push = function () {
        for (var t = _.apply(0, arguments), e = 0; e < t.length; e++) lt(t[e]);
        return 0;
      };
    }
  }
  function uc() {
    if (!ac && oc < 140) {
      oc++;
      try {
        var t, e;
        (null == (e = (t = Q.documentElement).doScroll) || e.call(t, 'left'), cc());
      } catch (t) {
        J.setTimeout(uc, 50);
      }
    }
  }
  var lc = {},
    fc = {};
  var dc = !1,
    vc = !1;
  function pc(t, e) {
    return (
      t.hasOwnProperty('gtm.uniqueEventId') ||
        Object.defineProperty(t, 'gtm.uniqueEventId', { value: $i() }),
      (e.eventId = t['gtm.uniqueEventId']),
      (e.priorityId = t['gtm.priorityId']),
      { eventId: e.eventId, priorityId: e.priorityId }
    );
  }
  function gc(t, e) {
    var n = t && t[ue.m.Ec];
    if (
      (void 0 === n && void 0 === (n = sn(ue.m.Ec, 2)) && (n = 'default'), C(n) || Array.isArray(n))
    ) {
      var r = (function (t, e) {
          for (
            var n = [], r = [], i = {}, a = 0;
            a < t.length;
            i = { Hi: void 0, mi: void 0 }, a++
          ) {
            var o = t[a];
            if (o.indexOf('-') >= 0)
              ((i.Hi = aa(o, e)),
                i.Hi &&
                  (j(
                    tr || ar(),
                    (function (t) {
                      return function (e) {
                        return t.Hi.destinationId === e;
                      };
                    })(i)
                  )
                    ? n.push(o)
                    : r.push(o)));
            else {
              var s = lc[o] || [];
              ((i.mi = {}),
                s.forEach(
                  (function (t) {
                    return function (e) {
                      t.mi[e] = !0;
                    };
                  })(i)
                ));
              for (var c = rr(), u = 0; u < c.length; u++)
                if (i.mi[c[u]]) {
                  n = n.concat(ir());
                  break;
                }
              var l = fc[o] || [];
              l.length && (n = n.concat(l));
            }
          }
          return { Ai: n, lo: r };
        })(
          e.isGtmEvent ? (C(n) ? [n] : n) : n.toString().replace(/\s+/g, '').split(','),
          e.isGtmEvent
        ),
        i = r.Ai,
        a = r.lo;
      if (a.length)
        for (var o = yc(t), s = 0; s < a.length; s++) {
          var c = aa(a[s], e.isGtmEvent);
          if (c) {
            var u,
              l = c.destinationId;
            if (!(u = z(l, 'siloed_'))) {
              var f = c.destinationId,
                d = Jn().destination[f];
              u = !!d && 0 === d.state;
            }
            u || ys(l, o, { source: 3, fromContainerExecution: e.fromContainerExecution });
          }
        }
      var v = i.concat(a);
      return { Ai: oa(i, e.isGtmEvent), dn: oa(v, e.isGtmEvent) };
    }
  }
  var hc = void 0,
    mc = void 0;
  function _c(t, e, n) {
    var r = It(t, null);
    ((r.eventId = void 0),
      (r.inheritParentConfig = void 0),
      Object.keys(e).some(function (t) {
        return void 0 !== e[t];
      }) && Ce(136));
    var i = It(e, null);
    (It(n, i),
      Ko(
        (function (t, e) {
          return 1 === arguments.length ? Do('config', t) : Do('config', t, e);
        })(rr()[0], i),
        t.eventId,
        r
      ));
  }
  function yc(t) {
    for (var e = d([ue.m.Fc, ue.m.Sb]), n = e.next(); !n.done; n = e.next()) {
      var r = n.value,
        i = (t && t[r]) || Ha.F[r];
      if (i) return i;
    }
  }
  var bc = {
      config: function (t, e) {
        var n = pc(t, e);
        if (!(t.length < 2) && C(t[1])) {
          var r = {};
          if (t.length > 2) {
            if ((void 0 !== t[2] && !St(t[2])) || t.length > 3) return;
            r = t[2];
          }
          var i = aa(t[1], e.isGtmEvent);
          if (i) {
            var a, o, s;
            t: {
              if (!Qn.Me) {
                var c = fr(hr());
                if (
                  (function (t) {
                    return !!(
                      t &&
                      t.parent &&
                      t.context &&
                      1 === t.context.source &&
                      0 !== t.parent.ctid.indexOf('GTM-')
                    );
                  })(c)
                ) {
                  var u = c.parent,
                    l = u.isDestination;
                  s = { oo: fr(u), jo: l };
                  break t;
                }
              }
              s = void 0;
            }
            var f = s;
            (f && ((a = f.oo), (o = f.jo)), Ps(n.eventId, 'gtag.config'));
            var d = i.destinationId,
              v = i.id !== d;
            if (v ? -1 === ir().indexOf(d) : -1 === rr().indexOf(d)) {
              if (!e.inheritParentConfig && !r[ue.m.kc]) {
                var p = yc(r);
                if (v) ys(d, p, { source: 2, fromContainerExecution: e.fromContainerExecution });
                else if (void 0 !== a && -1 !== a.containers.indexOf(d)) {
                  var g = r;
                  hc ? _c(e, g, hc) : mc || (mc = It(g, null));
                } else
                  ms(d, p, !0, { source: 2, fromContainerExecution: e.fromContainerExecution });
              }
            } else {
              if (a && (Ce(128), o && Ce(130), e.inheritParentConfig)) {
                var h = r;
                return void (mc ? _c(e, mc, h) : (!h[ue.m.Gc] && ze && hc) || (hc = It(h, null)));
              }
              if ((ae(166) || ea(), ze && !v && !r[ue.m.Gc])) {
                var m = vc;
                if (((vc = !0), m)) return;
              }
              if ((dc || Ce(43), !e.noTargetGroup))
                if (v) {
                  !(function (t) {
                    F(fc, function (e, n) {
                      var r = n.indexOf(t);
                      r >= 0 && n.splice(r, 1);
                    });
                  })(i.id);
                  var _ = i.id,
                    y = r[ue.m.Rf] || 'default';
                  y = String(y).split(',');
                  for (var b = 0; b < y.length; b++) {
                    var E = fc[y[b]] || [];
                    ((fc[y[b]] = E), E.indexOf(_) < 0 && E.push(_));
                  }
                } else {
                  !(function (t) {
                    F(lc, function (e, n) {
                      var r = n.indexOf(t);
                      r >= 0 && n.splice(r, 1);
                    });
                  })(i.id);
                  var S = i.id,
                    I = r[ue.m.Rf] || 'default';
                  I = I.toString().split(',');
                  for (var w = 0; w < I.length; w++) {
                    var x = lc[I[w]] || [];
                    ((lc[I[w]] = x), x.indexOf(S) < 0 && x.push(S));
                  }
                }
              delete r[ue.m.Rf];
              var O = e.eventMetadata || {};
              (O.hasOwnProperty(ya.C.Jc) || (O[ya.C.Jc] = !e.fromContainerExecution),
                (e.eventMetadata = O),
                delete r[ue.m.me]);
              for (var T = v ? [i.id] : ir(), A = 0; A < T.length; A++) {
                var N = r,
                  j = T[A],
                  k = It(e, null),
                  M = aa(j, k.isGtmEvent);
                M && Ha.push('config', [N], M, k);
              }
            }
          }
        }
      },
      consent: function (t, e) {
        if (3 === t.length) {
          Ce(39);
          var n,
            r = pc(t, e),
            i = t[1],
            a = {},
            o = (function (t) {
              return 'object' != typeof t || null === t ? {} : t;
            })(t[2]);
          for (n in o)
            if (o.hasOwnProperty(n)) {
              var s = o[n];
              a[n] =
                n === ue.m.Pg
                  ? Array.isArray(s)
                    ? NaN
                    : Number(s)
                  : n === ue.m.Pd
                    ? (Array.isArray(s) ? s : [s]).map(Ii)
                    : wi(s);
            }
          (e.fromContainerExecution || (a[ue.m.U] && Ce(139), a[ue.m.Ea] && Ce(140)),
            'default' === i
              ? (function (t) {
                  (ci(), !Vi && zi && ui('crc'), (Vi = !0));
                  var e = t[ue.m.Pg];
                  e && Ce(41);
                  var n = t[ue.m.Pd];
                  n ? Ce(40) : (n = ['']);
                  for (var r = { Ze: 0 }; r.Ze < n.length; ++(r = { Ze: r.Ze }).Ze)
                    F(
                      t,
                      (function (t) {
                        return function (r, i) {
                          if (r !== ue.m.Pd && r !== ue.m.Pg) {
                            var a = wi(i),
                              o = n[t.Ze],
                              s = Number(e),
                              c = _i[0] || '',
                              u = Si();
                            ((s = void 0 === s ? 0 : s),
                              (xr = !0),
                              Or && O('TAGGING', 20),
                              Er().default(r, a, o, c, u, s, Ar));
                          }
                        };
                      })(r)
                    );
                })(a)
              : 'update' === i
                ? Wi(a, r)
                : 'declare' === i &&
                  e.fromContainerExecution &&
                  (function (t) {
                    var e = t[ue.m.Pd];
                    e || (e = ['']);
                    for (var n = { Ye: 0 }; n.Ye < e.length; ++(n = { Ye: n.Ye }).Ye)
                      F(
                        t,
                        (function (t) {
                          return function (n, r) {
                            if (n !== ue.m.Pd) {
                              var i = Ii(r),
                                a = e[t.Ye],
                                o = _i[0] || '',
                                s = Si();
                              ((Or = !0), xr && O('TAGGING', 20), Er().declare(n, i, a, o, s));
                            }
                          };
                        })(n)
                      );
                  })(a));
        }
      },
      event: function (t, e) {
        var n = t[1];
        if (!(t.length < 2) && C(n)) {
          var r = void 0;
          if (t.length > 2) {
            if ((!St(t[2]) && void 0 !== t[2]) || t.length > 3) return;
            r = t[2];
          }
          var i = (function (t, e) {
              var n = {},
                r = ((n.event = t), n);
              return (
                e &&
                  ((r.eventModel = It(e, null)),
                  e[ue.m.me] && (r.eventCallback = e[ue.m.me]),
                  e[ue.m.Mf] && (r.eventTimeout = e[ue.m.Mf])),
                r
              );
            })(n, r),
            a = pc(t, e),
            o = a.eventId,
            s = a.priorityId;
          if (
            ((i['gtm.uniqueEventId'] = o),
            s && (i['gtm.priorityId'] = s),
            'optimize.callback' === n)
          )
            return ((i.eventModel = i.eventModel || {}), i);
          var c = gc(r, e);
          if (c) {
            var u,
              l,
              f,
              v = c.Ai,
              p = c.dn;
            if (!$n && ae(108)) {
              ((u = p.map(function (t) {
                return t.id;
              })),
                (l = p.map(function (t) {
                  return t.destinationId;
                })),
                (f = v.map(function (t) {
                  return t.id;
                })));
              for (var g = d(tr || ar()), h = g.next(); !h.done; h = g.next()) {
                var m = h.value;
                !z(m, 'siloed_') && l.indexOf(m) < 0 && l.indexOf(vr(m)) < 0 && f.push(m);
              }
            } else
              ((u = v.map(function (t) {
                return t.id;
              })),
                (l = v.map(function (t) {
                  return t.destinationId;
                })),
                (f = u));
            Ps(o, n);
            for (var _ = d(f), y = _.next(); !y.done; y = _.next()) {
              var b = y.value,
                E = It(e, null),
                S = It(r, null);
              delete S[ue.m.me];
              var I = E.eventMetadata || {};
              (I.hasOwnProperty(ya.C.Jc) || (I[ya.C.Jc] = !E.fromContainerExecution),
                (I[ya.C.Oh] = u.slice()),
                (I[ya.C.Qe] = l.slice()),
                (E.eventMetadata = I),
                Ua(n, S, b, E),
                ae(166) || na(I[ya.C.Sa]));
            }
            return (
              (i.eventModel = i.eventModel || {}),
              u.length > 0 ? (i.eventModel[ue.m.Ec] = u.join(',')) : delete i.eventModel[ue.m.Ec],
              dc || Ce(43),
              void 0 === e.noGtmEvent &&
                e.eventMetadata &&
                e.eventMetadata[ya.C.Sm] &&
                (e.noGtmEvent = !0),
              i.eventModel[ue.m.jc] && (e.noGtmEvent = !0),
              e.noGtmEvent ? void 0 : i
            );
          }
        }
      },
      get: function (t, e) {
        if ((Ce(53), 4 === t.length && C(t[1]) && C(t[2]) && A(t[3]))) {
          var n = aa(t[1], e.isGtmEvent),
            r = String(t[2]),
            i = t[3];
          if (n) {
            dc || Ce(43);
            var a = yc();
            if (
              j(ir(), function (t) {
                return n.destinationId === t;
              })
            ) {
              pc(t, e);
              var o = {};
              (It(((o[ue.m.Nb] = r), (o[ue.m.fc] = i), o), null),
                (function (t, e, n, r) {
                  var i = aa(n, r.isGtmEvent);
                  i && Ha.push('get', [t, e], i, r);
                })(
                  r,
                  function (t) {
                    lt(function () {
                      i(t);
                    });
                  },
                  n.id,
                  e
                ));
            } else
              ys(n.destinationId, a, {
                source: 4,
                fromContainerExecution: e.fromContainerExecution
              });
          }
        }
      },
      js: function (t, e) {
        if (2 === t.length && t[1].getTime) {
          dc = !0;
          var n = pc(t, e),
            r = n.eventId,
            i = n.priorityId,
            a = { event: 'gtm.js' };
          return (
            (a['gtm.start'] = t[1].getTime()),
            (a['gtm.uniqueEventId'] = r),
            (a['gtm.priorityId'] = i),
            a
          );
        }
      },
      policy: function () {},
      set: function (t, e) {
        var n = void 0;
        if (
          (2 === t.length && St(t[1])
            ? (n = It(t[1], null))
            : 3 === t.length &&
              C(t[1]) &&
              ((n = {}),
              St(t[2]) || Array.isArray(t[2]) ? (n[t[1]] = It(t[2], null)) : (n[t[1]] = t[2])),
          n)
        ) {
          var r = pc(t, e),
            i = r.eventId,
            a = r.priorityId;
          It(n, null);
          var o = It(n, null);
          return (
            Ha.push('set', [o], void 0, e),
            (n['gtm.uniqueEventId'] = i),
            a && (n['gtm.priorityId'] = a),
            delete n.event,
            (e.overwriteModelFields = !0),
            n
          );
        }
      }
    },
    Ec = { policy: !0 },
    Sc = function (t) {
      if (Ic(t)) return t;
      this.value = t;
    };
  Sc.prototype.getUntrustedMessageValue = function () {
    return this.value;
  };
  var Ic = function (t) {
    return !(!t || 'object' !== bt(t) || St(t)) && 'getUntrustedMessageValue' in t;
  };
  Sc.prototype.getUntrustedMessageValue = Sc.prototype.getUntrustedMessageValue;
  var xc = !1,
    Oc = [];
  function Tc() {
    if (!xc) {
      xc = !0;
      for (var t = 0; t < Oc.length; t++) lt(Oc[t]);
    }
  }
  var Ac = 0,
    Cc = {},
    Nc = [],
    jc = [],
    kc = !1,
    Mc = !1;
  function Fc(t, e) {
    return (
      t.messageContext.eventId - e.messageContext.eventId ||
      t.messageContext.priorityId - e.messageContext.priorityId
    );
  }
  function Pc(t, e) {
    var n = t._clear || e.overwriteModelFields;
    (F(t, function (t, e) {
      '_clear' !== t && (n && un(t), un(t, e));
    }),
      He || (He = t['gtm.start']));
    var r = t['gtm.uniqueEventId'];
    return (
      !!t.event &&
      ('number' != typeof r &&
        ((r = $i()), (t['gtm.uniqueEventId'] = r), un('gtm.uniqueEventId', r)),
      nc(t))
    );
  }
  function Gc() {
    var t, e;
    if (jc.length) t = jc.shift();
    else {
      if (!Nc.length) return;
      t = Nc.shift();
    }
    var n = t;
    if (
      kc ||
      !(function (t) {
        if (null == t || 'object' != typeof t) return !1;
        if (t.event) return !0;
        if (P(t)) {
          var e = t[0];
          if ('config' === e || 'event' === e || 'js' === e || 'get' === e) return !0;
        }
        return !1;
      })(n.message)
    )
      e = n;
    else {
      kc = !0;
      var r,
        i,
        a = n.message['gtm.uniqueEventId'];
      'number' == typeof a
        ? ((r = a - 2), (i = a - 1))
        : ((r = $i()), (i = $i()), (n.message['gtm.uniqueEventId'] = $i()));
      var o = {},
        s = {
          message: ((o.event = 'gtm.init_consent'), (o['gtm.uniqueEventId'] = r), o),
          messageContext: { eventId: r }
        },
        c = {},
        u = {
          message: ((c.event = 'gtm.init'), (c['gtm.uniqueEventId'] = i), c),
          messageContext: { eventId: i }
        };
      (Nc.unshift(u, n), (e = s));
    }
    return e;
  }
  function Lc() {
    for (var t, e = !1; !Mc && (t = Gc()); ) {
      ((Mc = !0), delete rn.eventModel, ln());
      var n = t,
        r = n.message,
        i = n.messageContext;
      if (null == r) Mc = !1;
      else {
        if (i.fromContainerExecution)
          for (
            var a = [
                'gtm.allowlist',
                'gtm.blocklist',
                'gtm.whitelist',
                'gtm.blacklist',
                'tagTypeBlacklist'
              ],
              o = 0;
            o < a.length;
            o++
          ) {
            var s = a[o],
              c = sn(s, 1);
            ((Array.isArray(c) || St(c)) && (c = It(c, null)), (an[s] = c));
          }
        try {
          if (A(r))
            try {
              r.call(on);
            } catch (t) {}
          else if (Array.isArray(r)) {
            if (C(r[0])) {
              var u = r[0].split('.'),
                l = u.pop(),
                f = r.slice(1),
                d = sn(u.join('.'), 2);
              if (null != d)
                try {
                  d[l].apply(d, f);
                } catch (t) {}
            }
          } else {
            var v = void 0;
            if (P(r))
              t: {
                if (r.length && C(r[0])) {
                  var p = bc[r[0]];
                  if (p && (!i.fromContainerExecution || !Ec[r[0]])) {
                    v = p(r, i);
                    break t;
                  }
                }
                v = void 0;
              }
            else v = r;
            v && (e = Pc(v, i) || e);
          }
        } finally {
          i.fromContainerExecution && ln(!0);
          var g = r['gtm.uniqueEventId'];
          if ('number' == typeof g) {
            for (var h = Cc[String(g)] || [], m = 0; m < h.length; m++) jc.push(Uc(h[m]));
            (h.length && jc.sort(Fc), delete Cc[String(g)], g > Ac && (Ac = g));
          }
          Mc = !1;
        }
      }
    }
    return !e;
  }
  function Rc() {
    if (ae(109)) Je.N;
    var t = Lc();
    ae(109);
    try {
      var e = or(),
        n = J[Re.Zb].hide;
      if (n && void 0 !== n[e] && n.end) {
        n[e] = !1;
        var r,
          i = !0;
        for (r in n)
          if (n.hasOwnProperty(r) && !0 === n[r]) {
            i = !1;
            break;
          }
        i && (n.end(), (n.end = null));
      }
    } catch (t) {}
    return t;
  }
  function Dc(t) {
    if (Ac < t.notBeforeEventId) {
      var e = String(t.notBeforeEventId);
      ((Cc[e] = Cc[e] || []), Cc[e].push(t));
    } else
      (jc.push(Uc(t)),
        jc.sort(Fc),
        lt(function () {
          Mc || Lc();
        }));
  }
  function Uc(t) {
    return { message: t.message, messageContext: t.messageContext };
  }
  function Kc() {
    function t(t) {
      var e = {};
      if (Ic(t)) {
        var n = t;
        ((t = Ic(n) ? n.getUntrustedMessageValue() : void 0), (e.fromContainerExecution = !0));
      }
      return { message: t, messageContext: e };
    }
    var e = nt(Re.Zb, []),
      n = (function () {
        var t = Re.Zb;
        return (Ji[t] = Ji[t] || {});
      })();
    (!0 === n.pruned && Ce(83),
      (Cc = qo().get()),
      (function () {
        var t = Dc;
        qo().listen(t);
      })(),
      (function (t) {
        ac ? t() : sc.push(t);
      })(function () {
        if (!n.gtmDom) {
          n.gtmDom = !0;
          var t = {};
          e.push(((t.event = 'gtm.dom'), t));
        }
      }),
      (function (t) {
        xc ? lt(t) : Oc.push(t);
      })(function () {
        if (!n.gtmLoad) {
          n.gtmLoad = !0;
          var t = {};
          e.push(((t.event = 'gtm.load'), t));
        }
      }),
      (n.subscribers = (n.subscribers || 0) + 1));
    var r = e.push;
    e.push = function () {
      var i;
      if (Ji.SANDBOXED_JS_SEMAPHORE > 0) {
        i = [];
        for (var a = 0; a < arguments.length; a++) i[a] = new Sc(arguments[a]);
      } else i = [].slice.call(arguments, 0);
      var o = i.map(function (e) {
        return t(e);
      });
      Nc.push.apply(Nc, o);
      var s = r.apply(e, i),
        c = Math.max(100, Number('1000') || 300);
      if (this.length > c) for (Ce(4), n.pruned = !0; this.length > c; ) this.shift();
      var u = 'boolean' != typeof s || s;
      return Lc() && u;
    };
    var i = e.slice(0).map(function (e) {
      return t(e);
    });
    (Nc.push.apply(Nc, i), Je.N || (ae(109), lt(Rc)));
  }
  function qc() {
    Cn &&
      J.addEventListener('securitypolicyviolation', function (t) {
        if ('enforce' === t.disposition) {
          var e = (function (t) {
            switch (t) {
              case 'script-src':
              case 'script-src-elem':
                return 1;
              case 'frame-src':
                return 4;
              case 'connect-src':
                return 2;
              case 'img-src':
                return 3;
            }
          })(t.effectiveDirective);
          if (e) {
            var n,
              r,
              i = qn(e, t.blockedURI);
            if ((r = n = i ? Un[e][i] : void 0))
              t: {
                try {
                  var a = new URL(t.blockedURI),
                    o = a.pathname.indexOf(';');
                  r = o >= 0 ? a.origin + a.pathname.substring(0, o) : a.origin + a.pathname;
                  break t;
                } catch (t) {}
                r = void 0;
              }
            if (r) {
              for (var s = d(n), c = s.next(); !c.done; c = s.next()) {
                var u = c.value;
                if (!u.nl) {
                  u.nl = !0;
                  var l = String(u.endpoint);
                  Qr.hasOwnProperty(l) || ((Qr[l] = !0), Yr('csp', Object.keys(Qr).join('~')));
                }
              }
              !(function (t, e) {
                var n = qn(t, e);
                if (n) {
                  var r = Un[t][n];
                  r &&
                    (Un[t][n] = r.filter(function (t) {
                      return !t.nl;
                    }));
                }
              })(e, t.blockedURI);
            }
          }
        }
      });
  }
  var zc = /^(https?:)?\/\//;
  var Vc = function () {};
  Vc.prototype.toString = function () {
    return 'undefined';
  };
  new Vc();
  function Bc(t) {
    return (function (t) {
      var e = t.arg0,
        n = t.arg1;
      if (t.any_of && Array.isArray(n)) {
        for (var r = 0; r < n.length; r++) {
          var i = It(t, {});
          if ((It({ arg1: n[r], any_of: void 0 }, i), Bc(i))) return !0;
        }
        return !1;
      }
      switch (t.function) {
        case '_cn':
          return String(e).indexOf(String(n)) >= 0;
        case '_css':
          var a;
          t: {
            if (e)
              try {
                for (var o = 0; o < se.length; o++) {
                  var s = se[o];
                  if (null != e[s]) {
                    a = e[s](n);
                    break t;
                  }
                }
              } catch (t) {}
            a = !1;
          }
          return a;
        case '_ew':
          var c = String(e),
            u = String(n),
            l = c.length - u.length;
          return l >= 0 && c.indexOf(u, l) === l;
        case '_eq':
          return String(e) === String(n);
        case '_ge':
          return Number(e) >= Number(n);
        case '_gt':
          return Number(e) > Number(n);
        case '_lc':
          return String(e).split(',').indexOf(String(n)) >= 0;
        case '_le':
          return Number(e) <= Number(n);
        case '_lt':
          return Number(e) < Number(n);
        case '_re':
          var f;
          t: {
            var d = t.ignore_case ? 'i' : void 0;
            try {
              var v = String(n) + String(d),
                p = ce.get(v);
              (p || ((p = new RegExp(n, d)), ce.set(v, p)), (f = p.test(e)));
              break t;
            } catch (t) {
              f = !1;
              break t;
            }
          }
          return f;
        case '_sw':
          return z(String(e), String(n));
        case '_um':
          return (function (t, e) {
            function n(t) {
              var e = yn(t),
                n = pn(e, 'protocol'),
                r = pn(e, 'host', !0),
                i = pn(e, 'port');
              return (
                (void 0 === n || ('http' === n && '80' === i) || ('https' === n && '443' === i)) &&
                  ((n = 'web'), (i = 'default')),
                [n, r, i, pn(e, 'path').toLowerCase().replace(/\/$/, '')]
              );
            }
            for (var r = n(String(t)), i = n(String(e)), a = 0; a < r.length; a++)
              if (r[a] !== i[a]) return !1;
            return !0;
          })(e, n);
      }
      return !1;
    })(t)
      ? 1
      : 0;
  }
  ([2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2].reduce(function (t, e) {
    return t + e;
  }),
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2].reduce(function (t, e) {
      return t + e;
    }),
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2].reduce(function (t, e) {
      return t + e;
    }),
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2].reduce(function (t, e) {
      return t + e;
    }),
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2].reduce(
      function (t, e) {
        return t + e;
      }
    ),
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2].reduce(function (t, e) {
      return t + e;
    }));
  var Wc = function (t, e, n, r) {
    (Ja.call(this),
      (this.ug = e),
      (this.Ne = n),
      (this.oc = r),
      (this.jb = new Map()),
      (this.xg = 0),
      (this.fa = new Map()),
      (this.Ga = new Map()),
      (this.P = void 0),
      (this.K = t));
  };
  (f(Wc, Ja),
    (Wc.prototype.N = function () {
      (delete this.F,
        this.jb.clear(),
        this.fa.clear(),
        this.Ga.clear(),
        this.P && (Ya(this.K, 'message', this.P), delete this.P),
        delete this.K,
        delete this.oc,
        Ja.prototype.N.call(this));
    }));
  var Hc = function (t) {
      return t.F
        ? t.F
        : (t.Ne && t.Ne(t.K) ? (t.F = t.K) : (t.F = Gn(t.K, t.ug)), null != (e = t.F) ? e : null);
      var e;
    },
    Zc = function (t, e, n) {
      if (Hc(t))
        if (t.F === t.K) {
          var r = t.jb.get(e);
          r && r(t.F, n);
        } else {
          var i = t.fa.get(e);
          if (i && i.zi) {
            Yc(t);
            var a = ++t.xg;
            (t.Ga.set(a, { Mg: i.Mg, vn: i.Vk(n), persistent: 'addEventListener' === e }),
              t.F.postMessage(i.zi(n, a), '*'));
          }
        }
    },
    Yc = function (t) {
      t.P ||
        ((t.P = function (e) {
          try {
            var n;
            if ((n = t.oc ? t.oc(e) : void 0)) {
              var r,
                i = n.ro,
                a = t.Ga.get(i);
              if (a)
                (a.persistent || t.Ga.delete(i), null == (r = a.Mg) || r.call(a, a.vn, n.payload));
            }
          } catch (t) {}
        }),
        Za(t.K, 'message', t.P));
    },
    Xc = function (t, e) {
      var n = e.listener,
        r = (0, t.__gpp)('addEventListener', n);
      r && n(r, !0);
    },
    Jc = function (t, e) {
      (0, t.__gpp)('removeEventListener', e.listener, e.listenerId);
    },
    Qc = {
      Vk: function (t) {
        return t.listener;
      },
      zi: function (t, e) {
        var n = {};
        return ((n.__gppCall = { callId: e, command: 'addEventListener', version: '1.1' }), n);
      },
      Mg: function (t, e) {
        var n = e.__gppReturn;
        t(n.returnValue, n.success);
      }
    },
    $c = {
      Vk: function (t) {
        return t.listener;
      },
      zi: function (t, e) {
        var n = {};
        return (
          (n.__gppCall = {
            callId: e,
            command: 'removeEventListener',
            version: '1.1',
            parameter: t.listenerId
          }),
          n
        );
      },
      Mg: function (t, e) {
        var n = e.__gppReturn,
          r = n.returnValue.data;
        null == t || t(r, n.success);
      }
    };
  function tu(t) {
    var e = {};
    return {
      payload: (e = 'string' == typeof t.data ? JSON.parse(t.data) : t.data),
      ro: e.__gppReturn.callId
    };
  }
  var eu = function (t, e) {
    var n;
    ((n = (void 0 === e ? {} : e).timeoutMs),
      Ja.call(this),
      (this.caller = new Wc(
        t,
        '__gppLocator',
        function (t) {
          return 'function' == typeof t.__gpp;
        },
        tu
      )),
      this.caller.jb.set('addEventListener', Xc),
      this.caller.fa.set('addEventListener', Qc),
      this.caller.jb.set('removeEventListener', Jc),
      this.caller.fa.set('removeEventListener', $c),
      (this.timeoutMs = null != n ? n : 500));
  };
  (f(eu, Ja),
    (eu.prototype.N = function () {
      (this.caller.dispose(), Ja.prototype.N.call(this));
    }),
    (eu.prototype.addEventListener = function (t) {
      var e = this,
        n = Fn(function () {
          t(ru, !0);
        }),
        r =
          -1 === this.timeoutMs
            ? void 0
            : setTimeout(function () {
                n();
              }, this.timeoutMs);
      Zc(this.caller, 'addEventListener', {
        listener: function (n, i) {
          clearTimeout(r);
          try {
            var a, o;
            (void 0 === (null == (o = n.pingData) ? void 0 : o.gppVersion) ||
            '1' === n.pingData.gppVersion ||
            '1.0' === n.pingData.gppVersion
              ? (e.removeEventListener(n.listenerId),
                (a = {
                  eventName: 'signalStatus',
                  data: 'ready',
                  pingData: {
                    internalErrorState: 1,
                    gppString: 'GPP_ERROR_STRING_IS_DEPRECATED_SPEC',
                    applicableSections: [-1]
                  }
                }))
              : Array.isArray(n.pingData.applicableSections)
                ? (a = n)
                : (e.removeEventListener(n.listenerId),
                  (a = {
                    eventName: 'signalStatus',
                    data: 'ready',
                    pingData: {
                      internalErrorState: 2,
                      gppString: 'GPP_ERROR_STRING_EXPECTED_APPLICATION_SECTION_ARRAY',
                      applicableSections: [-1]
                    }
                  })),
              t(a, i));
          } catch (r) {
            if (null != n && n.listenerId)
              try {
                e.removeEventListener(n.listenerId);
              } catch (e) {
                return void t(iu, !0);
              }
            t(nu, !0);
          }
        }
      });
    }),
    (eu.prototype.removeEventListener = function (t) {
      Zc(this.caller, 'removeEventListener', { listener: function () {}, listenerId: t });
    }));
  var nu = {
      eventName: 'signalStatus',
      data: 'ready',
      pingData: {
        internalErrorState: 2,
        gppString: 'GPP_ERROR_STRING_UNAVAILABLE',
        applicableSections: [-1]
      },
      listenerId: -1
    },
    ru = {
      eventName: 'signalStatus',
      data: 'ready',
      pingData: {
        gppString: 'GPP_ERROR_STRING_LISTENER_REGISTRATION_TIMEOUT',
        internalErrorState: 2,
        applicableSections: [-1]
      },
      listenerId: -1
    },
    iu = {
      eventName: 'signalStatus',
      data: 'ready',
      pingData: {
        gppString: 'GPP_ERROR_STRING_REMOVE_EVENT_LISTENER_ERROR',
        internalErrorState: 2,
        applicableSections: [-1]
      },
      listenerId: -1
    };
  function au(t) {
    var e;
    if (!(e = 'ready' === t.pingData.signalStatus)) {
      var n = t.pingData.applicableSections;
      e = !n || (1 === n.length && -1 === n[0]);
    }
    e && ((Lo.gppString = t.pingData.gppString), (Lo.F = t.pingData.applicableSections.join(',')));
  }
  function ou() {
    var t, n, r;
    return (
      (t = void 0 === t ? '' : t),
      null != (n = e) && null != (r = n.blob) && r.hasOwnProperty(1) ? String(e.blob[1]) : t
    );
  }
  function su() {
    var t = [
      ['cv', ae(140) ? ou() : '1'],
      ['rv', Re.Nh],
      [
        'tc',
        Gt.filter(function (t) {
          return t;
        }).length
      ]
    ];
    return (Re.Mh && t.push(['x', Re.Mh]), Qe() && t.push(['tag_exp', Qe()]), t);
  }
  var cu = {},
    uu = {};
  function lu(t) {
    var e = t.eventId,
      n = t.Yc,
      r = [],
      i = cu[e] || [];
    i.length && r.push(['hf', i.join('.')]);
    var a = uu[e] || [];
    return (a.length && r.push(['ht', a.join('.')]), n && (delete cu[e], delete uu[e]), r);
  }
  function fu() {
    var t, e, n;
    ((t = function (t) {
      var e = t.originalEventData['gtm.uniqueEventId'],
        n = Ji.zones;
      return !n || n.isActive(rr(), e);
    }),
      (n = sr()),
      (e = void 0 !== e && e),
      ls().addRestriction(1, n, t, e),
      ss(function (t) {
        var e, n;
        return (
          (e = t.entityId),
          (n = t.securityGroups),
          (function (t) {
            var e = Ji.zones;
            return e
              ? e.getIsAllowedFn(rr(), t)
              : function () {
                  return !0;
                };
          })(Number(t.originalEventData['gtm.uniqueEventId']))(e, n)
        );
      }));
  }
  var du = function (t) {
      return t === br.W.Wa && Fr[t] === yr.Ta.Le && !Hi(ue.m.T);
    },
    vu = function () {
      return '0';
    },
    pu = function (t) {
      if ('string' != typeof t) return '';
      var e = ['gclid', 'dclid', 'wbraid', '_gl'];
      return (
        ae(102) && e.push('gbraid'),
        (function (t, e) {
          return (function (t, e) {
            function n(e) {
              var n = e.split('=')[0];
              return t.indexOf(n) < 0 ? e : n + '=0';
            }
            function r(t) {
              return t
                .split('&')
                .map(n)
                .filter(function (t) {
                  return void 0 !== t;
                })
                .join('&');
            }
            var i = e.href.split(/[?#]/)[0],
              a = e.search,
              o = e.hash;
            ('?' === a[0] && (a = a.substring(1)),
              '#' === o[0] && (o = o.substring(1)),
              '' !== (a = r(a)) && (a = '?' + a),
              '' !== (o = r(o)) && (o = '#' + o));
            var s = '' + i + a + o;
            return ('/' === s[s.length - 1] && (s = s.substring(0, s.length - 1)), s);
          })(e, yn(t));
        })(t, e)
      );
    },
    gu = {},
    hu = {},
    mu = {},
    _u = {},
    yu = {},
    bu = {},
    Eu = {},
    Su = {},
    Iu = {},
    wu = {},
    xu = {},
    Ou = {},
    Tu = {},
    Au = {},
    Cu = {},
    Nu = {},
    ju = {},
    ku = {},
    Mu = {},
    Fu = {},
    Pu = {},
    Gu = {},
    Lu = {},
    Ru = {},
    Du = {},
    Uu = {},
    Ku =
      ((Uu[ue.m.La] = ((gu[2] = [du]), gu)),
      (Uu[ue.m.ve] = ((hu[2] = [du]), hu)),
      (Uu[ue.m.ne] = ((mu[2] = [du]), mu)),
      (Uu[ue.m.wh] = ((_u[2] = [du]), _u)),
      (Uu[ue.m.xh] = ((yu[2] = [du]), yu)),
      (Uu[ue.m.yh] = ((bu[2] = [du]), bu)),
      (Uu[ue.m.zh] = ((Eu[2] = [du]), Eu)),
      (Uu[ue.m.Ah] = ((Su[2] = [du]), Su)),
      (Uu[ue.m.Cb] = ((Iu[2] = [du]), Iu)),
      (Uu[ue.m.xe] = ((wu[2] = [du]), wu)),
      (Uu[ue.m.ye] = ((xu[2] = [du]), xu)),
      (Uu[ue.m.ze] = ((Ou[2] = [du]), Ou)),
      (Uu[ue.m.Ae] = ((Tu[2] = [du]), Tu)),
      (Uu[ue.m.Be] = ((Au[2] = [du]), Au)),
      (Uu[ue.m.Ce] = ((Cu[2] = [du]), Cu)),
      (Uu[ue.m.De] = ((Nu[2] = [du]), Nu)),
      (Uu[ue.m.Ee] = ((ju[2] = [du]), ju)),
      (Uu[ue.m.eb] = ((ku[1] = [du]), ku)),
      (Uu[ue.m.wc] = ((Mu[1] = [du]), Mu)),
      (Uu[ue.m.Ac] = ((Fu[1] = [du]), Fu)),
      (Uu[ue.m.md] = ((Pu[1] = [du]), Pu)),
      (Uu[ue.m.Wd] =
        ((Gu[1] = [
          function (t) {
            return ae(102) && du(t);
          }
        ]),
        Gu)),
      (Uu[ue.m.Bc] = ((Lu[1] = [du]), Lu)),
      (Uu[ue.m.xa] = ((Ru[1] = [du]), Ru)),
      (Uu[ue.m.Pa] = ((Du[1] = [du]), Du)),
      {}),
    qu =
      ((Ku[ue.m.eb] = vu),
      (Ku[ue.m.wc] = vu),
      (Ku[ue.m.Ac] = vu),
      (Ku[ue.m.md] = vu),
      (Ku[ue.m.Wd] = vu),
      (Ku[ue.m.Bc] = function (t) {
        if (!St(t)) return {};
        var e = It(t, null);
        return (delete e.match_id, e);
      }),
      (Ku[ue.m.xa] = pu),
      (Ku[ue.m.Pa] = pu),
      {}),
    zu = {},
    Vu =
      ((zu[ya.C.Ha] = ((qu[2] = [du]), qu)),
      function (t, e, n, r) {
        ((this.F = t), (this.N = e), (this.O = n), (this.P = r));
      });
  ((Vu.prototype.getValue = function (t) {
    if (
      ((t = void 0 === t ? br.W.Lc : t),
      !this.N.some(function (e) {
        return e(t);
      }))
    )
      return this.O.some(function (e) {
        return e(t);
      })
        ? this.P(this.F)
        : this.F;
  }),
    (Vu.prototype.K = function () {
      return 'array' === bt(this.F) || St(this.F) ? It(this.F, null) : this.F;
    }));
  (vi.yl, vi.Cm, vi.Am);
  (window, document);
  function Bu(t) {
    Ko(
      (function (t, e) {
        return 1 === arguments.length ? Do('set', t) : Do('set', t, e);
      })('developer_id.' + t, !0),
      0,
      {}
    );
  }
  Array.isArray;
  (J.clearTimeout, J.setTimeout);
  var Wu = { securityGroups: {} };
  ((Wu.securityGroups.v = ['google']),
    (Wu.__v = function (t) {
      var e = t.vtp_name;
      if (!e || !e.replace) return !1;
      var n = (function (t, e) {
        return sn(t, e || 2);
      })(e.replace(/\\\./g, '.'), t.vtp_dataLayerVersion || 1);
      return void 0 !== n ? n : t.vtp_defaultValue;
    }),
    (Wu.__v.H = 'v'),
    (Wu.__v.isVendorTemplate = !0),
    (Wu.__v.priorityOverride = 0),
    (Wu.__v.isInfrastructure = !0),
    (Wu.__v.runInSiloedMode = !1),
    (Wu.securityGroups.get = ['google']),
    (Wu.__get = function (t) {
      var e = t.vtp_settings,
        n = e.eventParameters || {},
        r = String(t.vtp_eventName),
        i = {};
      ((i.eventId = t.vtp_gtmEventId),
        (i.priorityId = t.vtp_gtmPriorityId),
        t.vtp_deferrable && (i.deferrable = !0));
      var a = (function (t, e, n) {
        return (((n = n || {})[ue.m.Ec] = t), Do('event', e, n));
      })(String(e.streamId), r, n);
      (Ko(a, i.eventId, i), t.vtp_gtmOnSuccess());
    }),
    (Wu.__get.H = 'get'),
    (Wu.__get.isVendorTemplate = !0),
    (Wu.__get.priorityOverride = 0),
    (Wu.__get.isInfrastructure = !1),
    (Wu.__get.runInSiloedMode = !1));
  var Hu = {
    dataLayer: on,
    callback: function (t) {
      (Ye.hasOwnProperty(t) && A(Ye[t]) && Ye[t](), delete Ye[t]);
    },
    bootstrap: 0
  };
  function Zu() {
    (!(function () {
      var t = or(),
        e = Hu;
      Ji[t] = Ji[t] || e;
    })(),
      gr(),
      _s(),
      K(Xe, Wu.securityGroups));
    var t,
      e = fr(hr()),
      n = null == e || null == (t = e.context) ? void 0 : t.source;
    (!(function (t, e) {
      var n = cr(),
        r = ur();
      if (Li()) {
        var i = Di('INIT');
        ((i.containerLoadSource = null != t ? t : 0),
          e && (i.parentTargetReference = e),
          (i.aliases = n),
          (i.destinations = r),
          Mi(i));
      }
    })(n, null == e ? void 0 : e.parent),
      (2 !== n && 4 !== n && 3 !== n) || Ce(142),
      (Rt = { nn: Yt }));
  }
  var Yu = !1;
  function Xu() {
    try {
      if (
        Yu ||
        !(function () {
          for (var t = Jn(), e = d(rr()), n = e.next(); !n.done; n = e.next())
            if (t.injectedFirstPartyContainers[n.value]) return !0;
          return !1;
        })()
      )
        (Le(),
          (Je.O = ''),
          (Je.jb = 'ad_storage|analytics_storage|ad_user_data|ad_personalization'),
          (Je.fa = 'ad_storage|analytics_storage|ad_user_data'),
          (Je.ba = '5570'),
          (Je.ba = '5570'),
          (function () {
            if (Je.N) {
              var t = Jn();
              if (t.siloed) {
                for (
                  var e = [], n = cr().map(vr), r = ur().map(vr), i = {}, a = 0;
                  a < t.siloed.length;
                  i = { Cg: void 0 }, a++
                )
                  ((i.Cg = t.siloed[a]),
                    !$n &&
                    j(
                      i.Cg.isDestination ? r : n,
                      (function (t) {
                        return function (e) {
                          return e === t.Cg.ctid;
                        };
                      })(i)
                    )
                      ? ($n = !0)
                      : e.push(i.Cg));
                t.siloed = e;
              }
            }
          })(),
          ae(109),
          ($t[8] = !0),
          !(function (t) {
            var e = er.ctid,
              n = nr();
            ((Ni = 0),
              (ji = !0),
              Gi(),
              (Ui = t),
              (Ki = e),
              (Ri = qe),
              (qi = { ctid: e, isDestination: n }));
          })(
            Qi('debugGroupId', function () {
              return String(Math.floor(Number.MAX_SAFE_INTEGER * Math.random()));
            })
          ),
          (function () {
            if (!Yi) {
              Yi = !0;
              for (var t = Xi.length - 1; t >= 0; t--) Xi[t]();
              Xi = [];
            }
          })(),
          (function () {
            try {
              var t = new eu(J, { timeoutMs: -1 });
              Hc(t.caller) && t.addEventListener(au);
            } catch (t) {}
          })(),
          lo(),
          (function () {
            if (void 0 !== Ji.pscdl) void 0 === hi(vi.Sg) && gi(vi.Sg, Ji.pscdl);
            else {
              var t = function (t) {
                  ((Ji.pscdl = t), gi(vi.Sg, t));
                },
                e = function () {
                  t('error');
                };
              try {
                $.cookieDeprecationLabel
                  ? (t('pending'), $.cookieDeprecationLabel.getValue().then(t).catch(e))
                  : t('noapi');
              } catch (t) {
                e();
              }
            }
          })(),
          !(function () {
            var t = sr();
            return !!Jn().canonical[t];
          })()
            ? ($n &&
                ss(function (t) {
                  var e,
                    n = {};
                  for (var r in void (n[kt.Fa] = '__' + t.entityId))
                    (void 0).hasOwnProperty(r) && (n['vtp_' + r] = (void 0)[r]);
                  if (qt(n)) {
                    var i = n[kt.Fa];
                    if (!i) throw Error('Error: No function name given for function call.');
                    var a = Ct[i];
                    e = !!a && !!a.runInSiloedMode;
                  } else e = !!os(n[kt.Fa], 4);
                  return e;
                }),
              (function () {
                for (var t = e.resource || {}, n = t.macros || [], r = 0; r < n.length; r++)
                  Mt.push(n[r]);
                for (var i = t.tags || [], a = 0; a < i.length; a++) Gt.push(i[a]);
                for (var o = t.predicates || [], s = 0; s < o.length; s++) Pt.push(o[s]);
                for (var c = t.rules || [], u = 0; u < c.length; u++) {
                  for (var l = c[u], f = {}, d = 0; d < l.length; d++) {
                    var v = l[d][0];
                    ((f[v] = Array.prototype.slice.call(l[d], 1)),
                      ('if' !== v && 'unless' !== v) || f[v]);
                  }
                  Ft.push(f);
                }
              })(),
              (Ct = Wu),
              (Nt = Bc),
              Zu(),
              yi || (_i = Ei()),
              (function () {
                if (!Be)
                  for (var t = !1 !== _i[6] ? en(Je.fa) : en(Je.jb), e = 0; e < Bi.length; e++) {
                    var n = Bi[e],
                      r = n,
                      i = t[n] ? 'granted' : 'denied';
                    Er().implicit(r, i);
                  }
              })(),
              Kc(),
              (function () {
                if (
                  ((ac = !1),
                  (oc = 0),
                  ('interactive' === Q.readyState && !Q.createEventObject) ||
                    'complete' === Q.readyState)
                )
                  cc();
                else {
                  if (
                    (ut(Q, 'DOMContentLoaded', cc),
                    ut(Q, 'readystatechange', cc),
                    Q.createEventObject && Q.documentElement.doScroll)
                  ) {
                    var t = !0;
                    try {
                      t = !J.frameElement;
                    } catch (t) {}
                    t && uc();
                  }
                  ut(J, 'load', cc);
                }
              })(),
              (xc = !1),
              'complete' === Q.readyState ? Tc() : ut(J, 'load', Tc),
              tc || (tc = new Ss()),
              tc.addListener('gtm.init', function (t, e) {
                ((Je.P = !0), Jr(), e());
              }),
              jn &&
                (Ia(Ga),
                J.setInterval(Pa, 864e5),
                Ia(su),
                Ia(Gs),
                Ia(as),
                Ia(Da),
                Ia(lu),
                Ia(Hs),
                ae(120) && (Ia(Ks), Ia(qs), Ia(zs))),
              Cn &&
                (Yr('v', '3'),
                Yr('t', 't'),
                Yr('pid', function () {
                  return String(ti);
                }),
                Yr('exp', Qe()),
                ut(J, 'pagehide', $r),
                J.setInterval(ei, 864e5),
                Yr(
                  'tdc',
                  function () {
                    ga && (J.clearTimeout(ga), (ga = void 0));
                    var t,
                      e = [];
                    for (t in la) la.hasOwnProperty(t) && e.push(t + '*' + la[t].join('.'));
                    return e.length ? e.join('!') : void 0;
                  },
                  !1
                ),
                (function () {
                  var t,
                    e,
                    n = yn(J.location.href);
                  (t = n.hostname + n.pathname) && Yr('dl', encodeURIComponent(t));
                  var r = er.ctid;
                  if (r) {
                    var i,
                      a = Qn.Me ? 1 : 0,
                      o = fr(hr());
                    ((i = o && o.context),
                      (e =
                        r +
                        ';' +
                        er.canonicalContainerId +
                        ';' +
                        (i && i.fromContainerExecution ? 1 : 0) +
                        ';' +
                        ((i && i.source) || 0) +
                        ';' +
                        a));
                  } else e = void 0;
                  e && Yr('tdp', e);
                  var s = Ln(!0);
                  void 0 !== s && Yr('frm', String(s));
                })(),
                (function () {
                  var t,
                    e = fr(hr());
                  if (e) {
                    for (; e.parent; ) {
                      var n = fr(e.parent);
                      if (!n) break;
                      e = n;
                    }
                    t = e;
                  } else t = void 0;
                  var r = t;
                  if (r) {
                    var i;
                    t: {
                      var a,
                        o = null == (a = r.scriptElement) ? void 0 : a.src;
                      if (o) {
                        var s;
                        try {
                          var c;
                          s = null == (c = gt()) ? void 0 : c.getEntriesByType('resource');
                        } catch (t) {}
                        if (s) {
                          for (var u = -1, l = d(s), f = l.next(); !f.done; f = l.next()) {
                            var v = f.value;
                            if (
                              'script' === v.initiatorType &&
                              ((u += 1), v.name.replace(zc, '') === o.replace(zc, ''))
                            ) {
                              i = u;
                              break t;
                            }
                          }
                          Ce(146);
                        } else Ce(145);
                      }
                      i = void 0;
                    }
                    var p = i;
                    void 0 !== p &&
                      (r.canonicalContainerId && Yr('rtg', String(r.canonicalContainerId)),
                      Yr('slo', String(p)),
                      Yr('hlo', r.htmlLoadOrder || '-1'),
                      Yr('lst', String(r.loadScriptType || '0')));
                  } else Ce(144);
                })(),
                (function () {
                  var t,
                    e = lr();
                  if (e)
                    if (e.canonicalContainerId) t = e.canonicalContainerId;
                    else {
                      var n,
                        r = e.scriptContainerId || (null == (n = e.destinations) ? void 0 : n[0]);
                      t = r ? '_' + r : void 0;
                    }
                  else t = void 0;
                  t && Yr('pcid', t);
                })(),
                Yr('bt', String(Je.F ? 2 : Ve ? 1 : 0)),
                Yr('ct', String(Je.F ? 0 : Ve ? 1 : 3)),
                qc()),
              fi(1),
              fu(),
              (Ze = R()),
              (Hu.bootstrap = Ze),
              Je.N && Rc(),
              ae(109),
              ae(134) &&
                ('string' == typeof J.name && z(J.name, 'web-pixel-sandbox-CUSTOM') && ht()
                  ? Bu('dMDg0Yz')
                  : J.Shopify && (Bu('dN2ZkMj'), ht() && Bu('dNTU0Yz'))))
            : (!(function () {
                var t = Ji.zones;
                t && t.unregisterChild(rr());
              })(),
              ls().removeExternalRestrictions(sr())));
    } catch (t) {
      (fi(4),
        (function () {
          if (jn && Je.P) {
            var t = Na(!0, !0);
            zn({ destinationId: er.ctid, endpoint: 56, eventId: xa }, t);
          }
        })());
    }
  }
  !(function (t) {
    function e() {
      Oi((c = Q.documentElement.getAttribute('data-tag-assistant-present'))) && (s = o.dk);
    }
    function n() {
      s && et ? a(s) : t();
    }
    if (!J.__TAGGY_INSTALLED) {
      var r = !1;
      if (Q.referrer) r = 'cct.google' === gn(yn(Q.referrer), 'host');
      if (!r) {
        var i = Oo('googTaggyReferrer');
        r = !(!i.length || !i[0].length);
      }
      r && ((J.__TAGGY_INSTALLED = !0), ot('https://cct.google/taggy/agent.js'));
    }
    var a = function (e) {
        var n = 'GTM',
          r = 'GTM';
        qe && ((n = 'OGT'), (r = 'GTAG'));
        var i = J['google.tagmanager.debugui2.queue'];
        i ||
          ((i = []),
          (J['google.tagmanager.debugui2.queue'] = i),
          ot(
            'https://' +
              Re.xf +
              '/debug/bootstrap?id=' +
              er.ctid +
              '&src=' +
              r +
              '&cond=' +
              e +
              '&gtm=' +
              bo()
          ));
        var a = {
          messageType: 'CONTAINER_STARTING',
          data: {
            scriptSource: et,
            containerProduct: n,
            debug: !1,
            id: er.ctid,
            targetRef: { ctid: er.ctid, isDestination: nr() },
            aliases: cr(),
            destinations: ur()
          }
        };
        ((a.data.resume = function () {
          t();
        }),
          Re.Bl && (a.data.initialPublish = !0),
          i.push(a));
      },
      o = { Dm: 1, gk: 2, wk: 3, cj: 4, dk: 5 };
    ((o[o.Dm] = 'GTM_DEBUG_LEGACY_PARAM'),
      (o[o.gk] = 'GTM_DEBUG_PARAM'),
      (o[o.wk] = 'REFERRER'),
      (o[o.cj] = 'COOKIE'),
      (o[o.dk] = 'EXTENSION_PARAM'));
    var s = void 0,
      c = void 0;
    (Oi(pn(J.location, 'query', !1, void 0, 'gtm_debug')) && (s = o.gk), !s && Q.referrer) &&
      'tagassistant.google.com' === gn(yn(Q.referrer), 'host') &&
      (s = o.wk);
    if (!s) {
      var u = Oo('__TAG_ASSISTANT');
      u.length && u[0].length && (s = o.cj);
    }
    if ((s || e(), !s && xi(c))) {
      var l = !1;
      (ut(
        Q,
        'TADebugSignal',
        function () {
          l || ((l = !0), e(), n());
        },
        !1
      ),
        J.setTimeout(function () {
          l || ((l = !0), e(), n());
        }, 200));
    } else n();
  })(function () {
    ae(83) && Yu && !Ei()[0] ? bi() : Xu();
  });
})();
/* eslint-enable */
