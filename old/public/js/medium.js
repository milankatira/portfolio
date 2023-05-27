// medium tho

(function () {
  const h = this;
  function k(a) {
    const b = typeof a;
    if (b == "object") {
      if (a) {
        if (a instanceof Array) {
          return "array";
        }
        if (a instanceof Object) {
          return b;
        }
        const c = Object.prototype.toString.call(a);
        if (c == "[object Window]") {
          return "object";
        }
        if (
          c == "[object Array]" ||
          (typeof a.length === "number" &&
            typeof a.splice !== "undefined" &&
            typeof a.propertyIsEnumerable !== "undefined" &&
            !a.propertyIsEnumerable("splice"))
        ) {
          return "array";
        }
        if (
          c == "[object Function]" ||
          (typeof a.call !== "undefined" &&
            typeof a.propertyIsEnumerable !== "undefined" &&
            !a.propertyIsEnumerable("call"))
        ) {
          return "function";
        }
      } else {
        return "null";
      }
    } else if (b == "function" && typeof a.call === "undefined") {
      return "object";
    }
    return b;
  }
  function l(a) {
    return k(a) == "array";
  }
  function m(a, b, c) {
    return a.call.apply(a.bind, arguments);
  }
  function n(a, b, c) {
    if (!a) {
      throw Error();
    }
    if (arguments.length > 2) {
      const e = Array.prototype.slice.call(arguments, 2);
      return function () {
        const c = Array.prototype.slice.call(arguments);
        Array.prototype.unshift.apply(c, e);
        return a.apply(b, c);
      };
    }
    return function () {
      return a.apply(b, arguments);
    };
  }
  function p(a, b, c) {
    p = Function.prototype.bind && Function.prototype.bind.toString().indexOf("native code") != -1 ? m : n;
    return p.apply(null, arguments);
  }
  const q =
    Date.now ||
    function () {
      return +new Date();
    };
  const r = Array.prototype;
  const s = r.indexOf
    ? function (a, b, c) {
        return r.indexOf.call(a, b, c);
      }
    : function (a, b, c) {
        c = c == null ? 0 : c < 0 ? Math.max(0, a.length + c) : c;
        if (typeof a === "string") {
          return typeof b === "string" && b.length == 1 ? a.indexOf(b, c) : -1;
        }
        for (; c < a.length; c++) {
          if (c in a && a[c] === b) {
            return c;
          }
        }
        return -1;
      };
  const t = r.map
    ? function (a, b, c) {
        return r.map.call(a, b, c);
      }
    : function (a, b, c) {
        for (var e = a.length, d = Array(e), g = typeof a === "string" ? a.split("") : a, f = 0; f < e; f++) {
          f in g && (d[f] = b.call(c, g[f], f, a));
        }
        return d;
      };
  function u(a) {
    const b = [];
    let c = 0;
    let e;
    for (e in a) {
      b[c++] = e;
    }
    return b;
  }
  function v(a) {
    const b = Array.prototype.slice.call(arguments);
    b.unshift(this);
    return p.apply(null, b);
  }
  Function.prototype.bind || (Function.prototype.bind = v);
  function w(a) {
    const b = Array.prototype.slice.call(arguments);
    b.unshift(this);
    return s.apply(null, b);
  }
  Array.prototype.indexOf || (Array.prototype.indexOf = w);
  function x(a) {
    const b = Array.prototype.slice.call(arguments);
    b.unshift(this);
    return t.apply(null, b);
  }
  Array.prototype.map || (Array.prototype.map = x);
  Date.now || (Date.now = q);
  Array.isArray || (Array.isArray = l);
  Object.keys || (Object.keys = u);
  (function () {
    for (var a = 0, b = ["ms", "moz", "webkit", "o"], c = 0; c < b.length && !window.requestAnimationFrame; ++c) {
      (window.requestAnimationFrame = window[`${b[c]}RequestAnimationFrame`]),
        (window.cancelAnimationFrame =
          window[`${b[c]}CancelAnimationFrame`] || window[`${b[c]}CancelRequestAnimationFrame`]);
    }
    window.requestAnimationFrame ||
      (window.requestAnimationFrame = function (b) {
        const c = new Date().getTime();
        const g = Math.max(0, 16 - (c - a));
        const f = window.setTimeout(() => {
          b(NaN);
        }, g);
        a = c + g;
        return f;
      });
    window.cancelAnimationFrame ||
      (window.cancelAnimationFrame = function (a) {
        clearTimeout(a);
      });
  })();
  (function () {
    typeof window.performance === "undefined" && (window.performance = {});
    if (!window.performance.now) {
      let a = Date.now();
      window.performance.timing &&
        window.performance.timing.navigationStart &&
        (a = window.performance.timing.navigationStart);
      window.performance.now = function () {
        return Date.now() - a;
      };
    }
  })();
  window.URL = window.URL || window.webkitURL || window;
  function y(a, b, c) {
    this.l = a;
    this.g = b;
    this.h = null;
    this.i = String(c);
    a = this.g.hostname;
    /hatch.dm|medium.com/.test(a) && (a = `api.${a}`);
    a = `${this.g.protocol}//${a}`;
    this.g.port && this.g.port != "443" && (a += `:${this.g.port}`);
    this.k = a;
  }
  const z = { q: "profile", o: "collection", s: "story" };
  y.prototype.j = function (a) {
    if (a.data && a.data && a.data[6] && a.data[7] && a.data[8]) {
      const b = a.data && a.data;
      b &&
        b[0] == "m" &&
        b[3] == this.i &&
        a.origin == this.k &&
        ((a = "display: block;max-width: 100%;min-width: 220px;padding: 0;position: static;visibility: visible;"),
        this.g.getAttribute("data-border") !== "false" &&
          (a +=
            "border-top-left-radius: 5px;border-top-right-radius: 5px;border-bottom-right-radius: 5px;border-bottom-left-radius: 5px;border-color: #eee #ddd #bbb;border-width: 1px;border-style: solid;box-shadow: rgba(0, 0, 0, 0.15) 0px 1px 3px;"),
        this.h.setAttribute("style", a),
        this.h.setAttribute("height", b[6] + b[7] + b[8]));
    }
  };
  function A() {
    this.n = 0;
  }
  A.prototype.m = function () {
    for (let a in z) {
      a = z[a];
      for (let b = document.querySelectorAll(`.m-${a}`), c = 0, e = b.length; c < e; c++) {
        const d = new y(a, b[c], this.n++);
        d.h = document.createElement("iframe");
        d.h.src = `${d.k}/embed?type\x3d${encodeURIComponent(d.l)}\x26path\x3d${encodeURIComponent(
          d.g.pathname
        )}\x26id\x3d${encodeURIComponent(d.i)}\x26collapsed\x3d${encodeURIComponent(
          d.g.getAttribute("data-collapsed")
        )}`;
        d.h.setAttribute("allowtransparency", !0);
        d.h.setAttribute("frameborder", "0");
        d.h.setAttribute("title", `Embedded ${d.l}`);
        d.h.setAttribute("width", d.g.getAttribute("data-width") || 400);
        d.h.setAttribute("height", 0);
        d.g.parentNode.insertBefore(d.h, d.g);
        d.g.parentNode.removeChild(d.g);
        document.addEventListener
          ? window.addEventListener("message", d.j.bind(d), !1)
          : document.attachEvent && document.attachEvent("onmessage", d.j.bind(d));
      }
    }
  };
  if (window.navigator.appName != "Microsoft Internet Explorer" || document.documentMode > 8) {
    if (window.obv && window.obv.embeds) {
      window.obv.embeds.render();
    } else {
      const B = function () {
        const a = new A();
        const b = a.m.bind(a);
        const c = ["obv", "embeds", "render"];
        let e = h;
        c[0] in e || !e.execScript || e.execScript(`var ${c[0]}`);
        for (var d; c.length && (d = c.shift()); ) {
          c.length || void 0 === b ? (e = e[d] ? e[d] : (e[d] = {})) : (e[d] = b);
        }
        a.m();
      };
      document.readyState === "complete"
        ? setTimeout(B, 1)
        : document.addEventListener
        ? window.addEventListener("load", B, !1)
        : document.attachEvent && window.attachEvent("onload", B);
    }
  }
}.call(this));
