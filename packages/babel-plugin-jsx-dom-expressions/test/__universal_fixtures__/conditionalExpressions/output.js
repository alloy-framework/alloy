import { createIntrinsic as _$createIntrinsic, memo as _$memo, createComponent as _$createComponent } from "r-custom";
const template1 = _$createIntrinsic("div", {
  children: simple
}, {
  fileName: "unknown",
  lineNumber: 1,
  columnNumber: 19
});
const template2 = _$createIntrinsic("div", {
  get children() {
    return state.dynamic;
  }
}, {
  fileName: "unknown",
  lineNumber: 3,
  columnNumber: 19
});
const template3 = _$createIntrinsic("div", {
  children: simple ? good : bad
}, {
  fileName: "unknown",
  lineNumber: 5,
  columnNumber: 19
});
const template4 = _$createIntrinsic("div", {
  get children() {
    return simple ? good() : bad;
  }
}, {
  fileName: "unknown",
  lineNumber: 7,
  columnNumber: 19
});
const template5 = _$createIntrinsic("div", {
  get children() {
    return _$memo(() => !!state.dynamic)() ? good() : bad;
  }
}, {
  fileName: "unknown",
  lineNumber: 9,
  columnNumber: 19
});
const template6 = _$createIntrinsic("div", {
  get children() {
    return _$memo(() => !!state.dynamic)() && good();
  }
}, {
  fileName: "unknown",
  lineNumber: 11,
  columnNumber: 19
});
const template7 = _$createIntrinsic("div", {
  get children() {
    return _$memo(() => state.count > 5)() ? _$memo(() => !!state.dynamic)() ? best : good() : bad;
  }
}, {
  fileName: "unknown",
  lineNumber: 13,
  columnNumber: 19
});
const template8 = _$createIntrinsic("div", {
  get children() {
    return _$memo(() => !!(state.dynamic && state.something))() && good();
  }
}, {
  fileName: "unknown",
  lineNumber: 15,
  columnNumber: 19
});
const template9 = _$createIntrinsic("div", {
  get children() {
    return _$memo(() => !!state.dynamic)() && good() || bad;
  }
}, {
  fileName: "unknown",
  lineNumber: 17,
  columnNumber: 19
});
const template10 = _$createIntrinsic("div", {
  get children() {
    return state.a ? "a" : state.b ? "b" : state.c ? "c" : "fallback";
  }
}, {
  fileName: "unknown",
  lineNumber: 19,
  columnNumber: 20
});
const template11 = _$createIntrinsic("div", {
  get children() {
    return _$memo(() => !!state.a)() ? a() : _$memo(() => !!state.b)() ? b() : state.c ? "c" : "fallback";
  }
}, {
  fileName: "unknown",
  lineNumber: 21,
  columnNumber: 20
});
const template12 = _$createComponent(Comp, {
  get render() {
    return _$memo(() => !!state.dynamic)() ? good() : bad;
  }
}, {
  fileName: "unknown",
  lineNumber: 23,
  columnNumber: 20
});

// no dynamic predicate
const template13 = _$createComponent(Comp, {
  get render() {
    return state.dynamic ? good : bad;
  }
}, {
  fileName: "unknown",
  lineNumber: 26,
  columnNumber: 20
});
const template14 = _$createComponent(Comp, {
  get render() {
    return _$memo(() => !!state.dynamic)() && good();
  }
}, {
  fileName: "unknown",
  lineNumber: 28,
  columnNumber: 20
});

// no dynamic predicate
const template15 = _$createComponent(Comp, {
  get render() {
    return state.dynamic && good;
  }
}, {
  fileName: "unknown",
  lineNumber: 31,
  columnNumber: 20
});
const template16 = _$createComponent(Comp, {
  get render() {
    return state.dynamic || good();
  }
}, {
  fileName: "unknown",
  lineNumber: 33,
  columnNumber: 20
});
const template17 = _$createComponent(Comp, {
  get render() {
    return _$memo(() => !!state.dynamic)() ? _$createComponent(Comp, {}, {
      fileName: "unknown",
      lineNumber: 35,
      columnNumber: 50
    }) : _$createComponent(Comp, {}, {
      fileName: "unknown",
      lineNumber: 35,
      columnNumber: 61
    });
  }
}, {
  fileName: "unknown",
  lineNumber: 35,
  columnNumber: 20
});
const template18 = _$createComponent(Comp, {
  get children() {
    return _$memo(() => !!state.dynamic)() ? _$createComponent(Comp, {}, {
      fileName: "unknown",
      lineNumber: 37,
      columnNumber: 43
    }) : _$createComponent(Comp, {}, {
      fileName: "unknown",
      lineNumber: 37,
      columnNumber: 54
    });
  }
}, {
  fileName: "unknown",
  lineNumber: 37,
  columnNumber: 20
});
const template19 = _$createIntrinsic("div", {
  get innerHTML() {
    return _$memo(() => !!state.dynamic)() ? _$createComponent(Comp, {}, {
      fileName: "unknown",
      lineNumber: 39,
      columnNumber: 52
    }) : _$createComponent(Comp, {}, {
      fileName: "unknown",
      lineNumber: 39,
      columnNumber: 63
    });
  }
}, {
  fileName: "unknown",
  lineNumber: 39,
  columnNumber: 20
});
const template20 = _$createIntrinsic("div", {
  get children() {
    return _$memo(() => !!state.dynamic)() ? _$createComponent(Comp, {}, {
      fileName: "unknown",
      lineNumber: 41,
      columnNumber: 42
    }) : _$createComponent(Comp, {}, {
      fileName: "unknown",
      lineNumber: 41,
      columnNumber: 53
    });
  }
}, {
  fileName: "unknown",
  lineNumber: 41,
  columnNumber: 20
});
const template21 = _$createComponent(Comp, {
  get render() {
    return state?.dynamic ? "a" : "b";
  }
}, {
  fileName: "unknown",
  lineNumber: 43,
  columnNumber: 20
});
const template22 = _$createComponent(Comp, {
  get children() {
    return state?.dynamic ? "a" : "b";
  }
}, {
  fileName: "unknown",
  lineNumber: 45,
  columnNumber: 20
});
const template23 = _$createIntrinsic("div", {
  get innerHTML() {
    return state?.dynamic ? "a" : "b";
  }
}, {
  fileName: "unknown",
  lineNumber: 47,
  columnNumber: 20
});
const template24 = _$createIntrinsic("div", {
  get children() {
    return state?.dynamic ? "a" : "b";
  }
}, {
  fileName: "unknown",
  lineNumber: 49,
  columnNumber: 20
});
const template25 = _$createComponent(Comp, {
  get render() {
    return state.dynamic ?? _$createComponent(Comp, {}, {
      fileName: "unknown",
      lineNumber: 51,
      columnNumber: 51
    });
  }
}, {
  fileName: "unknown",
  lineNumber: 51,
  columnNumber: 20
});
const template26 = _$createComponent(Comp, {
  get children() {
    return state.dynamic ?? _$createComponent(Comp, {}, {
      fileName: "unknown",
      lineNumber: 53,
      columnNumber: 44
    });
  }
}, {
  fileName: "unknown",
  lineNumber: 53,
  columnNumber: 20
});
const template27 = _$createIntrinsic("div", {
  get innerHTML() {
    return state.dynamic ?? _$createComponent(Comp, {}, {
      fileName: "unknown",
      lineNumber: 55,
      columnNumber: 53
    });
  }
}, {
  fileName: "unknown",
  lineNumber: 55,
  columnNumber: 20
});
const template28 = _$createIntrinsic("div", {
  get children() {
    return state.dynamic ?? _$createComponent(Comp, {}, {
      fileName: "unknown",
      lineNumber: 57,
      columnNumber: 43
    });
  }
}, {
  fileName: "unknown",
  lineNumber: 57,
  columnNumber: 20
});
const template29 = _$createIntrinsic("div", {
  get children() {
    return (_$memo(() => !!thing())() && thing1()) ?? thing2() ?? thing3();
  }
}, {
  fileName: "unknown",
  lineNumber: 59,
  columnNumber: 20
});
const template30 = _$createIntrinsic("div", {
  get children() {
    return thing() || thing1() || thing2();
  }
}, {
  fileName: "unknown",
  lineNumber: 61,
  columnNumber: 20
});
const template31 = _$createComponent(Comp, {
  get value() {
    return _$memo(() => !!count())() ? _$memo(() => !!count())() ? count() : count() : count();
  }
}, {
  fileName: "unknown",
  lineNumber: 63,
  columnNumber: 20
});
const template32 = _$createIntrinsic("div", {
  get children() {
    return something?.();
  }
}, {
  fileName: "unknown",
  lineNumber: 65,
  columnNumber: 20
});
const template33 = _$createComponent(Comp, {
  get children() {
    return something?.();
  }
}, {
  fileName: "unknown",
  lineNumber: 67,
  columnNumber: 20
});
const template34 = [simple ? good : bad];
const template35 = [_$memo(() => simple ? good() : bad, false, "simple ? \u2026")];
const template36 = [_$memo(() => _$memo(() => !!state.dynamic)() ? good() : bad, false, "_$memo(\u2026)(\u2026) ? \u2026")];
const template37 = [_$memo(() => _$memo(() => !!state.dynamic)() && good(), false, "_$memo(\u2026)(\u2026) && \u2026")];
const template38 = [_$memo(() => _$memo(() => state.count > 5)() ? _$memo(() => !!state.dynamic)() ? best : good() : bad, false, "_$memo(\u2026)(\u2026) ? \u2026")];
const template39 = [_$memo(() => _$memo(() => !!(state.dynamic && state.something))() && good(), false, "_$memo(\u2026)(\u2026) && \u2026")];
const template40 = [_$memo(() => _$memo(() => !!state.dynamic)() && good() || bad, false, "_$memo(\u2026)(\u2026) && \u2026 || \u2026")];
const template41 = [_$memo(() => state.a ? "a" : state.b ? "b" : state.c ? "c" : "fallback", false, "state.a ? \u2026")];
const template42 = [_$memo(() => _$memo(() => !!state.a)() ? a() : _$memo(() => !!state.b)() ? b() : state.c ? "c" : "fallback", false, "_$memo(\u2026)(\u2026) ? \u2026")];
const template43 = [_$memo(() => _$memo(() => !!obj1.prop)() ? _$memo(() => !!obj2.prop)() ? _$createIntrinsic("div", {
  children: "Output"
}, {
  fileName: "unknown",
  lineNumber: 87,
  columnNumber: 47
}) : [] : [], false, "_$memo(\u2026)(\u2026) ? \u2026")];