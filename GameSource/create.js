_N_E = (window.webpackJsonp_N_E = window.webpackJsonp_N_E || []).push([[10], {
    "1MVt": function(e, t, a) {
        "use strict";
        var n = a("q1tI")
          , l = a.n(n).a.createElement;
        t.a = function(e) {
            return l("div", {
                className: e.className,
                style: {
                    backgroundImage: "url(/static/images/subjects/".concat(e.id, ".svg?v=1)")
                }
            }, e.children)
        }
    },
    "R+Of": function(e, t, a) {
        "use strict";
        var n = a("q1tI")
          , l = a.n(n).a.createElement;
        t.a = function(e) {
            return l("span", {
                className: "gTitle"
            }, l("h2", null, e.title))
        }
    },
    YFqc: function(e, t, a) {
        e.exports = a("cTJO")
    },
    aIwK: function(e, t, a) {
        "use strict";
        a.r(t);
        var n = a("o0o1")
          , l = a.n(n)
          , s = a("HaE+")
          , i = a("1OyB")
          , o = a("JX7q")
          , r = a("vuIU")
          , c = a("Ji7U")
          , u = a("md7G")
          , p = a("foSv")
          , d = a("rePB")
          , f = a("q1tI")
          , h = a.n(f)
          , m = a("g4pe")
          , v = a.n(m)
          , g = a("wOhW")
          , b = a("YFqc")
          , N = a.n(b)
          , y = a("20a2")
          , j = a.n(y)
          , k = a("pvp9")
          , O = a("TSYQ")
          , w = a.n(O)
          , T = a("vDqi")
          , C = a.n(T)
          , R = a("rFDI")
          , L = a("5cDc")
          , E = a("1MVt")
          , D = a("R+Of")
          , I = h.a.createElement;
        function _(e) {
            var t = function() {
                if ("undefined" === typeof Reflect || !Reflect.construct)
                    return !1;
                if (Reflect.construct.sham)
                    return !1;
                if ("function" === typeof Proxy)
                    return !0;
                try {
                    return Date.prototype.toString.call(Reflect.construct(Date, [], (function() {}
                    ))),
                    !0
                } catch (e) {
                    return !1
                }
            }();
            return function() {
                var a, n = Object(p.a)(e);
                if (t) {
                    var l = Object(p.a)(this).constructor;
                    a = Reflect.construct(n, arguments, l)
                } else
                    a = n.apply(this, arguments);
                return Object(u.a)(this, a)
            }
        }
        var S = function(e) {
            Object(c.a)(a, e);
            var t = _(a);
            function a(e) {
                var n;
                return Object(i.a)(this, a),
                n = t.call(this, e),
                Object(d.a)(Object(o.a)(n), "handleFilter", (function(e) {
                    var t = e.target.value;
                    n.setState({
                        filter: t
                    })
                }
                )),
                Object(d.a)(Object(o.a)(n), "handleData", (function(e) {
                    var t = e.target
                      , a = t.name
                      , l = t.value;
                    n.props.setData(Object(d.a)({}, a, l))
                }
                )),
                Object(d.a)(Object(o.a)(n), "handleLanguage", (function(e) {
                    var t = e.target.value;
                    n.props.setLang(t)
                }
                )),
                Object(d.a)(Object(o.a)(n), "handleVisible", (function(e) {
                    var t = e.target.checked;
                    n.props.setData({
                        visible: t
                    })
                }
                )),
                Object(d.a)(Object(o.a)(n), "createTheme", (function() {
                    var e = n.props.lang.id;
                    n.props.setData({
                        languageEdit: e,
                        subjectEdit: 0,
                        createTheme: !0,
                        yourSubjects: n.props.subjects[e] || []
                    }),
                    j.a.push("/theme")
                }
                )),
                Object(d.a)(Object(o.a)(n), "create", (function() {
                    var e = n.props.data
                      , t = e.visible
                      , a = e.players
                      , l = e.points
                      , s = e.subject
                      , i = e.created
                      , o = (e.user,
                    n.props)
                      , r = o.lang
                      , c = o.setPopup;
                    r = r.create,
                    t ? (c(R.a.LOADING),
                    C.a.post("/req/createRoom", {
                        players: a,
                        points: l,
                        language: n.props.lang.id,
                        subject: s,
                        created: i
                    }, {
                        responseType: "json"
                    }).then((function(e) {
                        e && e.data && e.data.return ? (n.props.setData({
                            creating: !0
                        }),
                        n.props.joinGame(e.data.return)) : c(R.a.ALERT, {
                            text: "Error"
                        })
                    }
                    ))) : n.props.joinGame(!0)
                }
                )),
                Object(d.a)(Object(o.a)(n), "openThemes", (function() {
                    n.setState((function(e) {
                        return {
                            showThemes: !e.showThemes
                        }
                    }
                    ))
                }
                )),
                n.state = {
                    filter: 1,
                    showThemes: !1
                },
                n
            }
            return Object(r.a)(a, null, [{
                key: "getInitialProps",
                value: function() {
                    var e = Object(s.a)(l.a.mark((function e(t) {
                        var a, n, s, i, o;
                        return l.a.wrap((function(e) {
                            for (; ; )
                                switch (e.prev = e.next) {
                                case 0:
                                    if (a = t.req,
                                    n = t.query,
                                    s = t.data,
                                    i = [],
                                    !a) {
                                        e.next = 6;
                                        break
                                    }
                                    i = n.subjects,
                                    e.next = 11;
                                    break;
                                case 6:
                                    if (!s.user.logado) {
                                        e.next = 11;
                                        break
                                    }
                                    return e.next = 9,
                                    C.a.get("/req/subjects", {
                                        responseType: "json"
                                    });
                                case 9:
                                    o = e.sent,
                                    i = o.data;
                                case 11:
                                    return e.abrupt("return", {
                                        subjects: i
                                    });
                                case 12:
                                case "end":
                                    return e.stop()
                                }
                        }
                        ), e)
                    }
                    )));
                    return function(t) {
                        return e.apply(this, arguments)
                    }
                }()
            }]),
            Object(r.a)(a, [{
                key: "selectTheme",
                value: function(e, t) {
                    this.props.setData({
                        subject: e,
                        created: t
                    }),
                    this.setState({
                        showThemes: !1
                    })
                }
            }, {
                key: "openTheme",
                value: function(e) {
                    var t = this.props.lang.id;
                    this.props.setData({
                        languageEdit: t,
                        subjectEdit: e,
                        createTheme: !1
                    }),
                    j.a.push("/theme")
                }
            }, {
                key: "scroll",
                value: function() {
                    this.setState({
                        filter: 4
                    })
                }
            }, {
                key: "render",
                value: function() {
                    var e = this
                      , t = this.props
                      , a = t.lang
                      , n = t.setPopup
                      , l = this.state
                      , s = l.filter
                      , i = l.showThemes
                      , o = this.props.data
                      , r = o.user
                      , c = o.subjects
                      , u = o.subject
                      , p = o.created
                      , d = o.languages
                      , f = o.players
                      , h = o.points
                      , m = o.visible
                      , b = this.props.subjects && this.props.subjects[a.id] || []
                      , y = this.props.lang.subjects
                      , j = d.find((function(e) {
                        return e.id == a.id
                    }
                    ))
                      , k = r.logado && (2 == s && 0 == b.length || 3 == s && 0 == j.subjects.length)
                      , O = a.social;
                    a = a.create;
                    var T = null;
                    if (!r.logado) {
                        var C = a.textNotLogged.match(/<.+>/)[0]
                          , _ = a.textNotLogged.split(C);
                        T = I("label", {
                            className: "legend"
                        }, _[0], I("a", {
                            onClick: function() {
                                return n(R.a.LOGIN, {
                                    retorno: "create=1"
                                })
                            }
                        }, C.substr(1, C.length - 2)), _[1])
                    }
                    return I(g.a, {
                        fixed: !0
                    }, I(v.a, null, I("title", null, a.pageTitle), I("meta", {
                        name: "description",
                        content: a.description
                    })), I("div", {
                        className: "title"
                    }, I("div", null, I(N.a, {
                        href: "/rooms"
                    }, I("button", {
                        className: "back"
                    }))), I(D.a, {
                        title: a.title
                    }), I("div", null)), I("div", {
                        className: "content bg createRoom"
                    }, I("div", {
                        className: "globalSettings"
                    }, I("div", {
                        className: "global"
                    }, I("h3", null, "1. ", a.globalSettings), I("div", {
                        className: "fieldset numberPlayers"
                    }, I("span", {
                        className: "legend"
                    }, a.players), I("label", {
                        className: "select"
                    }, I("select", {
                        name: "players",
                        value: f || 20,
                        onChange: this.handleData
                    }, I("option", {
                        value: "5"
                    }, "5"), I("option", {
                        value: "6"
                    }, "6"), I("option", {
                        value: "7"
                    }, "7"), I("option", {
                        value: "8"
                    }, "8"), I("option", {
                        value: "9"
                    }, "9"), I("option", {
                        value: "10"
                    }, "10"), I("option", {
                        value: "15"
                    }, "15"), I("option", {
                        value: "20"
                    }, "20"), I("option", {
                        value: "30"
                    }, "30"), I("option", {
                        value: "50"
                    }, "50"), I("option", {
                        value: "255"
                    }, "Max: 255")))), I("div", {
                        className: "fieldset goalPoints"
                    }, I("span", {
                        className: "legend"
                    }, a.points), I("label", {
                        className: "select"
                    }, I("select", {
                        name: "points",
                        value: h || 120,
                        onChange: this.handleData
                    }, I("option", {
                        value: "70"
                    }, "70"), I("option", {
                        value: "100"
                    }, "100"), I("option", {
                        value: "120"
                    }, "120"), I("option", {
                        value: "150"
                    }, "150"), I("option", {
                        value: "180"
                    }, "180"), I("option", {
                        value: "240"
                    }, "240"), I("option", {
                        value: "360"
                    }, "360"), I("option", {
                        value: "480"
                    }, "480"), I("option", {
                        value: "1000000"
                    }, "1000000")))), I("div", {
                        className: "fieldset visibleRoom"
                    }, I("span", {
                        className: "legend"
                    }, a.visibleRoom), I("div", {
                        className: "switchFieldCheck"
                    }, I("input", {
                        type: "checkbox",
                        name: "visible",
                        id: "visibleRoom",
                        defaultChecked: m,
                        onChange: this.handleVisible
                    }), I("label", {
                        htmlFor: "visibleRoom"
                    }))), m && I("div", {
                        className: "legend important"
                    }, I("strong", null, a.important), a.textImportant)), I("h3", null, "2. ", a.language), I("div", {
                        className: "alignLang"
                    }, I("div", {
                        className: "fieldset"
                    }, I("span", {
                        className: "legend visibleMobile"
                    }, a.language), I("label", {
                        className: "select lang"
                    }, I("select", {
                        name: "language",
                        value: this.props.lang.id,
                        onChange: this.handleLanguage
                    }, I("optgroup", {
                        label: a.themesAvailable
                    }, d.filter((function(e) {
                        return e.subjects.length
                    }
                    )).map((function(e) {
                        return I("option", {
                            value: e.id,
                            key: "lang" + e.id
                        }, e.name)
                    }
                    ))), I("optgroup", {
                        label: a.withoutThemes
                    }, d.filter((function(e) {
                        return !e.subjects.length
                    }
                    )).map((function(e) {
                        return I("option", {
                            value: e.id,
                            key: "lang" + e.id
                        }, e.name)
                    }
                    )))))), I("div", {
                        className: "fieldset visibleMobile"
                    }, I("span", {
                        className: "legend"
                    }, a.visibleRoom), I("div", {
                        className: "switchFieldCheck"
                    }, I("input", {
                        type: "checkbox",
                        name: "visible",
                        id: "visibleRoomMobile",
                        defaultChecked: m,
                        onChange: this.handleVisible
                    }), I("label", {
                        htmlFor: "visibleRoomMobile"
                    }))))), I("div", {
                        className: w()("themes", {
                            loginCreate: !r.logado && 0 == j.subjects.length,
                            openThemes: i
                        })
                    }, I("div", {
                        className: w()("subject", {
                            empty: k
                        })
                    }, I("div", {
                        className: "filterThemes"
                    }, I("h3", null, "3. ", a.subject), r.logado ? I("div", {
                        className: "fieldset"
                    }, I("label", {
                        className: "select"
                    }, I("select", {
                        value: s,
                        onChange: this.handleFilter
                    }, I("option", {
                        value: "1"
                    }, a.all), I("option", {
                        value: "2"
                    }, a.yourThemes), I("option", {
                        value: "3"
                    }, a.official), I("option", {
                        value: "4"
                    }, a.suggestions))), b.length < c.length && I("label", {
                        className: "btAdd"
                    }, I("button", {
                        onClick: this.createTheme
                    }, a.createTheme))) : 0 != j.subjects.length && I("div", {
                        className: "fieldset notLogged"
                    }, T)), k && I("div", {
                        className: "emptyResult"
                    }, I("div", {
                        className: "figure"
                    }), I("div", null, I("p", null, a.emptyResult1), I("p", null, a.emptyResult2))), !r.logado && 0 == j.subjects.length && I("div", {
                        className: "loginForCreate"
                    }, I("div", {
                        className: "contentCreate"
                    }, I("div", {
                        className: "icon"
                    }), I("p", null, a.loginCreate1)), I("p", {
                        className: "textLogin"
                    }, a.loginCreate2), I("div", {
                        className: "visibleMobile"
                    }, I("a", {
                        className: "loginMobile",
                        onClick: function() {
                            return n(R.a.LOGIN, {
                                retorno: "create=1"
                            })
                        }
                    }, a.login)), I("div", {
                        className: "loginRedesSociais"
                    }, I("a", {
                        className: "loginTwitter ic-TwHome",
                        href: "/auth/twitter?create=1"
                    }, I("span", null, O.twitter)), I("a", {
                        className: "loginGoogle ic-GoHome",
                        href: "/auth/google?create=1"
                    }, I("span", null, O.google)), I("a", {
                        className: "loginVK ic-VKHome",
                        href: "/auth/vk?create=1"
                    }, I("span", null, O.vk))), I("div", {
                        className: "loginRedesSociais"
                    }, I("a", {
                        className: "loginReddit ic-RDHome",
                        href: "/auth/reddit?create=1"
                    }, I("span", null, O.reddit)), I("a", {
                        className: "loginDiscord ic-DCHome",
                        href: "/auth/discord?create=1"
                    }, I("span", null, O.discord))))), I("div", {
                        className: "selectTheme"
                    }, I("div", {
                        className: "ctt-selectTheme visibleMobile"
                    }, I("p", {
                        className: ""
                    }, a.chooseTheme), I("button", {
                        className: w()({
                            close: i
                        }),
                        onClick: this.openThemes
                    })), I(L.a, {
                        margin: 5,
                        update: function() {
                            return k && e.scroll()
                        }
                    }, I("ul", null, r.logado && (1 == s || 2 == s) && b && b.map((function(t) {
                        return I("li", {
                            key: "c" + t,
                            className: w()("created", {
                                selected: u == t && p
                            }),
                            onClick: function() {
                                return e.selectTheme(t, !0)
                            }
                        }, I(E.a, {
                            className: "figure",
                            id: t
                        }), I("h5", null, y[t]), I("p", null, I("strong", null, a.yourTheme), I("a", {
                            onClick: function() {
                                return e.openTheme(t)
                            }
                        }, a.editTheme)))
                    }
                    )), (1 == s || 3 == s) && c.filter((function(e) {
                        return j.subjects.includes(e.id)
                    }
                    )).map((function(t) {
                        return I("li", {
                            key: t.id,
                            className: w()("official", {
                                selected: u == t.id && !p
                            }),
                            onClick: function() {
                                return e.selectTheme(t.id, !1)
                            }
                        }, I(E.a, {
                            className: "figure",
                            id: t.id
                        }), I("h5", null, y[t.id]), I("p", null, I("strong", null, a.official)))
                    }
                    )), r.logado && (1 == s || 4 == s || k) && c.filter((function(e) {
                        return !b.includes(e.id)
                    }
                    )).map((function(t) {
                        return I("li", {
                            key: t.id,
                            className: "suggestion",
                            onClick: function() {
                                return e.openTheme(t.id)
                            }
                        }, I(E.a, {
                            className: "figure",
                            id: t.id
                        }), I("h5", null, y[t.id]), I("p", null, a.createThis))
                    }
                    )), r.logado && 0 == c.filter((function(e) {
                        return !b.includes(e.id)
                    }
                    )).length && (4 == s || k) && I("li", {
                        className: "emptyList"
                    }, I("div", {
                        className: "icon"
                    }), I("p", null, a.emptyList), I("p", null, a.emptyList2))))))), I("div", {
                        className: "actions mobileActCreate"
                    }, I("button", {
                        className: "btYellowBig ic-config",
                        onClick: this.create,
                        disabled: null == u
                    }, I("strong", null, a.create), I("span", null, a.textDisabled))))
                }
            }]),
            a
        }(h.a.Component);
        t.default = Object(k.a)(S)
    },
    buSk: function(e, t, a) {
        (window.__NEXT_P = window.__NEXT_P || []).push(["/create", function() {
            return a("aIwK")
        }
        ])
    },
    cTJO: function(e, t, a) {
        "use strict";
        var n = a("J4zp")
          , l = a("284h");
        t.__esModule = !0,
        t.default = void 0;
        var s = l(a("q1tI"))
          , i = a("elyg")
          , o = a("nOHt")
          , r = a("vNVm")
          , c = {};
        function u(e, t, a, n) {
            if (e && (0,
            i.isLocalURL)(t)) {
                e.prefetch(t, a, n).catch((function(e) {
                    0
                }
                ));
                var l = n && "undefined" !== typeof n.locale ? n.locale : e && e.locale;
                c[t + "%" + a + (l ? "%" + l : "")] = !0
            }
        }
        var p = function(e) {
            var t = !1 !== e.prefetch
              , a = (0,
            o.useRouter)()
              , l = a && a.asPath || "/"
              , p = s.default.useMemo((function() {
                var t = (0,
                i.resolveHref)(l, e.href, !0)
                  , a = n(t, 2)
                  , s = a[0]
                  , o = a[1];
                return {
                    href: s,
                    as: e.as ? (0,
                    i.resolveHref)(l, e.as) : o || s
                }
            }
            ), [l, e.href, e.as])
              , d = p.href
              , f = p.as
              , h = e.children
              , m = e.replace
              , v = e.shallow
              , g = e.scroll
              , b = e.locale;
            "string" === typeof h && (h = s.default.createElement("a", null, h));
            var N = s.Children.only(h)
              , y = N && "object" === typeof N && N.ref
              , j = (0,
            r.useIntersection)({
                rootMargin: "200px"
            })
              , k = n(j, 2)
              , O = k[0]
              , w = k[1]
              , T = s.default.useCallback((function(e) {
                O(e),
                y && ("function" === typeof y ? y(e) : "object" === typeof y && (y.current = e))
            }
            ), [y, O]);
            (0,
            s.useEffect)((function() {
                var e = w && t && (0,
                i.isLocalURL)(d)
                  , n = "undefined" !== typeof b ? b : a && a.locale
                  , l = c[d + "%" + f + (n ? "%" + n : "")];
                e && !l && u(a, d, f, {
                    locale: n
                })
            }
            ), [f, d, w, b, t, a]);
            var C = {
                ref: T,
                onClick: function(e) {
                    N.props && "function" === typeof N.props.onClick && N.props.onClick(e),
                    e.defaultPrevented || function(e, t, a, n, l, s, o, r) {
                        ("A" !== e.currentTarget.nodeName || !function(e) {
                            var t = e.currentTarget.target;
                            return t && "_self" !== t || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.nativeEvent && 2 === e.nativeEvent.which
                        }(e) && (0,
                        i.isLocalURL)(a)) && (e.preventDefault(),
                        null == o && (o = n.indexOf("#") < 0),
                        t[l ? "replace" : "push"](a, n, {
                            shallow: s,
                            locale: r,
                            scroll: o
                        }))
                    }(e, a, d, f, m, v, g, b)
                },
                onMouseEnter: function(e) {
                    (0,
                    i.isLocalURL)(d) && (N.props && "function" === typeof N.props.onMouseEnter && N.props.onMouseEnter(e),
                    u(a, d, f, {
                        priority: !0
                    }))
                }
            };
            if (e.passHref || "a" === N.type && !("href"in N.props)) {
                var R = "undefined" !== typeof b ? b : a && a.locale
                  , L = a && a.isLocaleDomain && (0,
                i.getDomainLocale)(f, R, a && a.locales, a && a.domainLocales);
                C.href = L || (0,
                i.addBasePath)((0,
                i.addLocale)(f, R, a && a.defaultLocale))
            }
            return s.default.cloneElement(N, C)
        };
        t.default = p
    },
    vNVm: function(e, t, a) {
        "use strict";
        var n = a("J4zp");
        t.__esModule = !0,
        t.useIntersection = function(e) {
            var t = e.rootMargin
              , a = e.disabled || !i
              , r = (0,
            l.useRef)()
              , c = (0,
            l.useState)(!1)
              , u = n(c, 2)
              , p = u[0]
              , d = u[1]
              , f = (0,
            l.useCallback)((function(e) {
                r.current && (r.current(),
                r.current = void 0),
                a || p || e && e.tagName && (r.current = function(e, t, a) {
                    var n = function(e) {
                        var t = e.rootMargin || ""
                          , a = o.get(t);
                        if (a)
                            return a;
                        var n = new Map
                          , l = new IntersectionObserver((function(e) {
                            e.forEach((function(e) {
                                var t = n.get(e.target)
                                  , a = e.isIntersecting || e.intersectionRatio > 0;
                                t && a && t(a)
                            }
                            ))
                        }
                        ),e);
                        return o.set(t, a = {
                            id: t,
                            observer: l,
                            elements: n
                        }),
                        a
                    }(a)
                      , l = n.id
                      , s = n.observer
                      , i = n.elements;
                    return i.set(e, t),
                    s.observe(e),
                    function() {
                        i.delete(e),
                        s.unobserve(e),
                        0 === i.size && (s.disconnect(),
                        o.delete(l))
                    }
                }(e, (function(e) {
                    return e && d(e)
                }
                ), {
                    rootMargin: t
                }))
            }
            ), [a, t, p]);
            return (0,
            l.useEffect)((function() {
                if (!i && !p) {
                    var e = (0,
                    s.requestIdleCallback)((function() {
                        return d(!0)
                    }
                    ));
                    return function() {
                        return (0,
                        s.cancelIdleCallback)(e)
                    }
                }
            }
            ), [p]),
            [f, p]
        }
        ;
        var l = a("q1tI")
          , s = a("0G5g")
          , i = "undefined" !== typeof IntersectionObserver;
        var o = new Map
    },
    wOhW: function(e, t, a) {
        "use strict";
        var n = a("1OyB")
          , l = a("vuIU")
          , s = a("JX7q")
          , i = a("Ji7U")
          , o = a("md7G")
          , r = a("foSv")
          , c = a("rePB")
          , u = a("q1tI")
          , p = a.n(u)
          , d = a("r3VO")
          , f = a("YFqc")
          , h = a.n(f)
          , m = a("i2FJ")
          , v = a("rFDI")
          , g = a("TSYQ")
          , b = a.n(g)
          , N = p.a.createElement;
        var y = Object(d.a)((function(e) {
            var t = e.data
              , a = t.user
              , n = t.news
              , l = e.home
              , s = e.setPopup
              , i = e.lang.header;
            return N("header", {
                className: b()({
                    hide: !l
                })
            }, N("div", {
                className: b()({
                    logged: !l
                })
            }, N("div", {
                className: "getApp"
            }, N("h5", null, i.getApp), N("span", null, N("a", {
                className: "ic-gPlay",
                href: "https://play.google.com/store/apps/details?id=io.gartic.Gartic"
            }, N("p", null, i.android)), N("a", {
                className: "ic-iOS",
                href: "https://itunes.apple.com/us/app/gartic-io/id1270393677?mt=8"
            }, N("p", null, i.ios)))), N("div", {
                className: b()("logo", {
                    internal: !l
                })
            }, N(h.a, {
                href: "/"
            }, N("figure", null)), l && N("span", null, "DRAW, GUESS, WIN")), l ? N("a", {
                href: n.link,
                target: "_blank",
                className: "lastUpdates"
            }, N("h5", null, i.lastUpdates), N("span", null, N("strong", null), N("p", null, n.title))) : N(p.a.Fragment, null, N("div", {
                className: "userLogged"
            }, a.logado ? N(p.a.Fragment, null, N("div", {
                className: "infos"
            }, N("span", null, a.nome), N("a", {
                href: "/logout",
                className: "ic-logout"
            }, N("p", null, i.logout))), N(h.a, {
                href: "/"
            }, N("div", null, N(m.a, {
                url: a.avatar
            })))) : N(p.a.Fragment, null, N("div", {
                className: "infos"
            }, N("span", null, a.nome)), N(h.a, {
                href: "/"
            }, N("div", null, N(m.a, {
                type: a.avatar
            })))))), N("div", {
                className: "mobileActions"
            }, N(h.a, {
                href: "/options"
            }, N("div", {
                className: "options"
            }, N("div", {
                className: "icon"
            }), N("span", null, i.info))), a.logado ? N("a", {
                className: "logout",
                href: "/logout"
            }, N("div", {
                className: "icon"
            }), N("span", null, i.logout)) : N("div", {
                className: "login",
                onClick: function() {
                    return s(v.a.LOGIN, {
                        retorno: "home"
                    })
                }
            }, N("div", {
                className: "icon"
            }), N("span", null, i.login)))))
        }
        ))
          , j = p.a.createElement;
        var k = Object(d.a)((function(e) {
            var t = e.setPopup
              , a = e.lang.footer;
            return j("footer", null, j("a", {
                href: "https://gartic.com/",
                target: "_blank",
                className: "gartic"
            }), j("nav", null, j(h.a, {
                href: "/download"
            }, j("a", {
                href: "/download"
            }, a.download)), j("a", {
                href: "/service.txt",
                target: "_blank"
            }, a.termsService), j("a", {
                href: "/privacy.txt",
                target: "_blank"
            }, a.privacy), j(h.a, {
                href: "/thanks"
            }, j("a", {
                href: "/thanks"
            }, a.specialThanks)), j("a", {
                onClick: function() {
                    return t(v.a.CONTACT)
                }
            }, a.contact)), j("div", {
                className: "follow"
            }, j("a", {
                href: "https://twitter.com/gartic",
                className: "ic-twitter",
                target: "_blank"
            }), j("a", {
                href: "https://youtube.com/gartic",
                className: "ic-youtube",
                target: "_blank"
            }), j("a", {
                href: "https://instagram.com/gartic",
                className: "ic-instagram",
                target: "_blank"
            }), j("a", {
                href: "https://discord.gg/gartic",
                className: "ic-discord",
                target: "_blank"
            })))
        }
        ))
          , O = p.a.createElement;
        function w(e) {
            var t = function() {
                if ("undefined" === typeof Reflect || !Reflect.construct)
                    return !1;
                if (Reflect.construct.sham)
                    return !1;
                if ("function" === typeof Proxy)
                    return !0;
                try {
                    return Date.prototype.toString.call(Reflect.construct(Date, [], (function() {}
                    ))),
                    !0
                } catch (e) {
                    return !1
                }
            }();
            return function() {
                var a, n = Object(r.a)(e);
                if (t) {
                    var l = Object(r.a)(this).constructor;
                    a = Reflect.construct(n, arguments, l)
                } else
                    a = n.apply(this, arguments);
                return Object(o.a)(this, a)
            }
        }
        var T = function(e) {
            Object(i.a)(a, e);
            var t = w(a);
            function a() {
                var e;
                Object(n.a)(this, a);
                for (var l = arguments.length, i = new Array(l), o = 0; o < l; o++)
                    i[o] = arguments[o];
                return e = t.call.apply(t, [this].concat(i)),
                Object(c.a)(Object(s.a)(e), "state", {
                    height: null
                }),
                Object(c.a)(Object(s.a)(e), "resize", (function() {
                    var t = e.state.height
                      , a = window.innerHeight - 50;
                    (!t || a > t) && e.setState({
                        height: a
                    })
                }
                )),
                e
            }
            return Object(l.a)(a, [{
                key: "componentDidMount",
                value: function() {
                    this.props.data.mobile && this.props.fixed && (this.resize(),
                    window.addEventListener("resize", this.resize, !1),
                    this._resizeApplied = !0)
                }
            }, {
                key: "componentWillUnmount",
                value: function() {
                    this._resizeApplied && window.removeEventListener("resize", this.resize, !1)
                }
            }, {
                key: "render",
                value: function() {
                    var e = this.state.height;
                    return O("div", {
                        className: "screenSystem",
                        style: {
                            height: e ? e + "px" : ""
                        }
                    }, O("div", {
                        id: "screens"
                    }, O(y, this.props), O("div", null, this.props.children), O(k, null)))
                }
            }]),
            a
        }(p.a.Component);
        t.a = Object(d.a)(T)
    }
}, [["buSk", 0, 2, 4, 1, 3, 5]]]);
