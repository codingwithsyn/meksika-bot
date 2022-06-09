(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [405],
    {
        8581: function(e, n, s) {
            (window.__NEXT_P = window.__NEXT_P || []).push([
                "/",
                function() {
                    return s(4793);
                },
            ]);
        },
        4793: function(e, n, s) {
            "use strict";
            s.r(n),
                s.d(n, {
                    default: function() {
                        return m;
                    },
                });
            var t = s(4051),
                a = s.n(t),
                r = s(5893),
                i = (s(9008), s(7294)),
                c = s(5988),
                o = s.n(c);

            function l() {
                return (0, r.jsxs)("div", {
                    className: "jsx-7ad31802396e81e0 logCh",
                    children: [
                        (0, r.jsx)("span", {
                            className: "jsx-7ad31802396e81e0",
                            children: "Henüz giriş yapılmadı, sayfayı yenileyin!",
                        }),
                        (0, r.jsx)(o(), {
                            id: "7ad31802396e81e0",
                            children: "span.jsx-7ad31802396e81e0{text-align:center;font-size:60px;color:black}",
                        }),
                    ],
                });
            }

            function f() {
                return (0, r.jsxs)("div", {
                    className: "jsx-7ad31802396e81e0 logCh",
                    children: [
                        (0, r.jsx)("span", {
                            className: "jsx-7ad31802396e81e0",
                            children: "Lütfen bekleyin.",
                        }),
                        (0, r.jsx)(o(), {
                            id: "7ad31802396e81e0",
                            children: "span.jsx-7ad31802396e81e0{text-align:center;font-size:60px;color:black}",
                        }),
                    ],
                });
            }

            function d(e, n, s, t, a, r, i) {
                try {
                    var c = e[r](i),
                        o = c.value;
                } catch (l) {
                    return void s(l);
                }
                c.done ? n(o) : Promise.resolve(o).then(t, a);
            }

            function u(e) {
                return function() {
                    var n = this,
                        s = arguments;
                    return new Promise(function(t, a) {
                        var r = e.apply(n, s);

                        function i(e) {
                            d(r, t, a, i, c, "next", e);
                        }

                        function c(e) {
                            d(r, t, a, i, c, "throw", e);
                        }
                        i(void 0);
                    });
                };
            }

            function x() {
                var e = (0, i.useState)(),
                    n = e[0],
                    s = e[1],
                    t = (0, i.useState)(!1),
                    c = t[0],
                    l = t[1];

                function d() {
                    return (d = u(
                        a().mark(function e() {
                            var n;
                            return a().wrap(function(e) {
                                for (;;)
                                    switch ((e.prev = e.next)) {
                                        case 0:
                                            return (e.next = 2), fetch("/getInfo", { method: "GET" });
                                        case 2:
                                            return (n = e.sent), (e.next = 5), n.json();
                                        case 5:
                                            (n = e.sent), s(n.info);
                                        case 7:
                                        case "end":
                                            return e.stop();
                                    }
                            }, e);
                        })
                    )).apply(this, arguments);
                }

                return (
                    (0, i.useEffect)(function() {
                        !(function() {
                            d.apply(this, arguments);
                        })(),
                        setTimeout(function() {
                            document.querySelector(".logs").scrollTop = document.querySelector(".logs").scrollHeight;
                        }, 500);
                    }, []),
                    (0, i.useEffect)(
                        function() {
                            c ||
                                setTimeout(function() {
                                    document.querySelector(".logs").scrollTop = document.querySelector(".logs").scrollHeight;
                                }, 500);
                        }, [c]
                    ),
                    (0, r.jsxs)("div", {
                        className: "jsx-de616710c122f80f container",
                        children: [
                            0 == c &&
                            (0, r.jsxs)("div", {
                                className: "jsx-de616710c122f80f boxContainer",
                                children: [
                                    (0, r.jsx)("div", {
                                        className: "jsx-de616710c122f80f logs logCh",
                                        children: null === n || void 0 === n ?
                                            void 0 : n.logs.map(function(e, n) {
                                                return (0,
                                                    r.jsxs)("span", { className: "jsx-de616710c122f80f log", children: [e, " ", (0, r.jsx)("br", { className: "jsx-de616710c122f80f" })] }, n);
                                            }),
                                    }),
                                ],
                            }),
                            1 == c && (0, r.jsx)(f, {}),
                            (0, r.jsx)(o(), {
                                id: "de616710c122f80f",
                                children: '.container.jsx-de616710c122f80f{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap}.boxContainer.jsx-de616710c122f80f{width:100%;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-justify-content:space-around;justify-content:space-around}.box.jsx-de616710c122f80f{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap;-webkit-justify-content:space-around;justify-content:space-around;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;width:20vw;height:auto;min-height:16vh;text-align:center;border:2px dashed white;margin-top:5vh}.boxText.jsx-de616710c122f80f{color:white;font-family:Impact;font-size:150%}.logs.jsx-de616710c122f80f{margin-top:20vh;text-align:center;font-size:150%;width:80vw;height:25vh;background-color:white;overflow:auto}.switch.jsx-de616710c122f80f{position:relative;display:inline-block;width:60px;height:34px}.switch.jsx-de616710c122f80f input.jsx-de616710c122f80f{opacity:0;width:0;height:0}.slider.jsx-de616710c122f80f{position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background-color:#ccc;-webkit-transition:.4s;-webkit-transition:.4s;-moz-transition:.4s;-o-transition:.4s;transition:.4s}.slider.jsx-de616710c122f80f:before{position:absolute;content:"";height:26px;width:26px;left:4px;bottom:4px;background-color:white;-webkit-transition:.4s;-webkit-transition:.4s;-moz-transition:.4s;-o-transition:.4s;transition:.4s}input.jsx-de616710c122f80f:checked+.slider.jsx-de616710c122f80f{background-color:#2196f3}input.jsx-de616710c122f80f:focus+.slider.jsx-de616710c122f80f{-webkit-box-shadow:0 0 1px#2196f3;-moz-box-shadow:0 0 1px#2196f3;box-shadow:0 0 1px#2196f3}input.jsx-de616710c122f80f:checked+.slider.jsx-de616710c122f80f:before{-webkit-transform:translateX(26px);-ms-transform:translateX(26px);-webkit-transform:translateX(26px);-moz-transform:translateX(26px);-ms-transform:translateX(26px);-o-transform:translateX(26px);transform:translateX(26px)}.slider.round.jsx-de616710c122f80f{-webkit-border-radius:34px;-moz-border-radius:34px;border-radius:34px}.slider.round.jsx-de616710c122f80f:before{-webkit-border-radius:50%;-moz-border-radius:50%;border-radius:50%}',
                            }),
                        ],
                    })
                );
            }

            function p(e, n, s, t, a, r, i) {
                try {
                    var c = e[r](i),
                        o = c.value;
                } catch (l) {
                    return void s(l);
                }
                c.done ? n(o) : Promise.resolve(o).then(t, a);
            }

            function h(e) {
                return function() {
                    var n = this,
                        s = arguments;
                    return new Promise(function(t, a) {
                        var r = e.apply(n, s);

                        function i(e) {
                            p(r, t, a, i, c, "next", e);
                        }

                        function c(e) {
                            p(r, t, a, i, c, "throw", e);
                        }
                        i(void 0);
                    });
                };
            }

            function m(e) {
                var n = e.host;
                console.log(n);
                var s = (0, i.useState)("False"),
                    t = s[0],
                    c = s[1];

                function o() {
                    return (o = h(
                        a().mark(function e() {
                            var n;
                            return a().wrap(function(e) {
                                for (;;)
                                    switch ((e.prev = e.next)) {
                                        case 0:
                                            return (
                                                (e.next = 2), fetch("/isBotLogined", { methot: "GET" })
                                            );
                                        case 2:
                                            return (n = e.sent), (e.next = 5), n.json();
                                        case 5:
                                            (n = e.sent), c(n.status);
                                        case 7:
                                        case "end":
                                            return e.stop();
                                    }
                            }, e);
                        })
                    )).apply(this, arguments);
                }
                return (
                    (0, i.useEffect)(function() {
                        !(function() {
                            o.apply(this, arguments);
                        })();
                    }, []),
                    (0, r.jsxs)("div", {
                        children: [
                            0 == t && (0, r.jsx)(l, {}),
                            1 == t && (0, r.jsx)(x, {}),
                        ],
                    })
                );
            }
        },
    },
    function(e) {
        e.O(0, [12, 774, 888, 179], function() {
            return (n = 8581), e((e.s = n));
            var n;
        });
        var n = e.O();
        _N_E = n;
    },
]);