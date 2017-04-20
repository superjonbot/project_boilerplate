/*! project_boilerplate : libraries.js */
/*! codebase: CB2017 v2.1.4 by Jonathan Robles */
/*! built:04-20-2017 [1:59:37AM] */
/*! -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */

/*! Prerequisite Libraries: none */

/*! -=-=-=-=-=-=-=-Third Party Includes [start]-=-=-=-=-=-=-=- */
/* requireLib */
/*! -=-=-=-=-=-=-=- Third Party Includes [end] -=-=-=-=-=-=-=- */

var requirejs, require, define;

(function(global) {
    var req, s, head, baseElement, dataMain, src, interactiveScript, currentlyAddingScript, mainScript, subPath, version = "2.1.8",
        commentRegExp = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm,
        cjsRequireRegExp = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,
        jsSuffixRegExp = /\.js$/,
        currDirRegExp = /^\.\//,
        op = Object.prototype,
        ostring = op.toString,
        hasOwn = op.hasOwnProperty,
        ap = Array.prototype,
        apsp = ap.splice,
        isBrowser = !!(typeof window !== "undefined" && navigator && window.document),
        isWebWorker = !isBrowser && typeof importScripts !== "undefined",
        readyRegExp = isBrowser && navigator.platform === "PLAYSTATION 3" ? /^complete$/ : /^(complete|loaded)$/,
        defContextName = "_",
        isOpera = typeof opera !== "undefined" && opera.toString() === "[object Opera]",
        contexts = {},
        cfg = {},
        globalDefQueue = [],
        useInteractive = false;

    function isFunction(it) {
        return ostring.call(it) === "[object Function]";
    }

    function isArray(it) {
        return ostring.call(it) === "[object Array]";
    }

    function each(ary, func) {
        if (ary) {
            var i;
            for (i = 0; i < ary.length; i += 1) {
                if (ary[i] && func(ary[i], i, ary)) {
                    break;
                }
            }
        }
    }

    function eachReverse(ary, func) {
        if (ary) {
            var i;
            for (i = ary.length - 1; i > -1; i -= 1) {
                if (ary[i] && func(ary[i], i, ary)) {
                    break;
                }
            }
        }
    }

    function hasProp(obj, prop) {
        return hasOwn.call(obj, prop);
    }

    function getOwn(obj, prop) {
        return hasProp(obj, prop) && obj[prop];
    }

    function eachProp(obj, func) {
        var prop;
        for (prop in obj) {
            if (hasProp(obj, prop)) {
                if (func(obj[prop], prop)) {
                    break;
                }
            }
        }
    }

    function mixin(target, source, force, deepStringMixin) {
        if (source) {
            eachProp(source, function(value, prop) {
                if (force || !hasProp(target, prop)) {
                    if (deepStringMixin && typeof value !== "string") {
                        if (!target[prop]) {
                            target[prop] = {};
                        }
                        mixin(target[prop], value, force, deepStringMixin);
                    } else {
                        target[prop] = value;
                    }
                }
            });
        }
        return target;
    }

    function bind(obj, fn) {
        return function() {
            return fn.apply(obj, arguments);
        };
    }

    function scripts() {
        return document.getElementsByTagName("script");
    }

    function defaultOnError(err) {
        throw err;
    }

    function getGlobal(value) {
        if (!value) {
            return value;
        }
        var g = global;
        each(value.split("."), function(part) {
            g = g[part];
        });
        return g;
    }

    function makeError(id, msg, err, requireModules) {
        var e = new Error(msg + "\nhttp://requirejs.org/docs/errors.html#" + id);
        e.requireType = id;
        e.requireModules = requireModules;
        if (err) {
            e.originalError = err;
        }
        return e;
    }
    if (typeof define !== "undefined") {
        return;
    }
    if (typeof requirejs !== "undefined") {
        if (isFunction(requirejs)) {
            return;
        }
        cfg = requirejs;
        requirejs = undefined;
    }
    if (typeof require !== "undefined" && !isFunction(require)) {
        cfg = require;
        require = undefined;
    }

    function newContext(contextName) {
        var inCheckLoaded, Module, context, handlers, checkLoadedTimeoutId, config = {
                waitSeconds: 7,
                baseUrl: "./",
                paths: {},
                pkgs: {},
                shim: {},
                config: {}
            },
            registry = {},
            enabledRegistry = {},
            undefEvents = {},
            defQueue = [],
            defined = {},
            urlFetched = {},
            requireCounter = 1,
            unnormalizedCounter = 1;

        function trimDots(ary) {
            var i, part;
            for (i = 0; ary[i]; i += 1) {
                part = ary[i];
                if (part === ".") {
                    ary.splice(i, 1);
                    i -= 1;
                } else if (part === "..") {
                    if (i === 1 && (ary[2] === ".." || ary[0] === "..")) {
                        break;
                    } else if (i > 0) {
                        ary.splice(i - 1, 2);
                        i -= 2;
                    }
                }
            }
        }

        function normalize(name, baseName, applyMap) {
            var pkgName, pkgConfig, mapValue, nameParts, i, j, nameSegment, foundMap, foundI, foundStarMap, starI, baseParts = baseName && baseName.split("/"),
                normalizedBaseParts = baseParts,
                map = config.map,
                starMap = map && map["*"];
            if (name && name.charAt(0) === ".") {
                if (baseName) {
                    if (getOwn(config.pkgs, baseName)) {
                        normalizedBaseParts = baseParts = [baseName];
                    } else {
                        normalizedBaseParts = baseParts.slice(0, baseParts.length - 1);
                    }
                    name = normalizedBaseParts.concat(name.split("/"));
                    trimDots(name);
                    pkgConfig = getOwn(config.pkgs, pkgName = name[0]);
                    name = name.join("/");
                    if (pkgConfig && name === pkgName + "/" + pkgConfig.main) {
                        name = pkgName;
                    }
                } else if (name.indexOf("./") === 0) {
                    name = name.substring(2);
                }
            }
            if (applyMap && map && (baseParts || starMap)) {
                nameParts = name.split("/");
                for (i = nameParts.length; i > 0; i -= 1) {
                    nameSegment = nameParts.slice(0, i).join("/");
                    if (baseParts) {
                        for (j = baseParts.length; j > 0; j -= 1) {
                            mapValue = getOwn(map, baseParts.slice(0, j).join("/"));
                            if (mapValue) {
                                mapValue = getOwn(mapValue, nameSegment);
                                if (mapValue) {
                                    foundMap = mapValue;
                                    foundI = i;
                                    break;
                                }
                            }
                        }
                    }
                    if (foundMap) {
                        break;
                    }
                    if (!foundStarMap && starMap && getOwn(starMap, nameSegment)) {
                        foundStarMap = getOwn(starMap, nameSegment);
                        starI = i;
                    }
                }
                if (!foundMap && foundStarMap) {
                    foundMap = foundStarMap;
                    foundI = starI;
                }
                if (foundMap) {
                    nameParts.splice(0, foundI, foundMap);
                    name = nameParts.join("/");
                }
            }
            return name;
        }

        function removeScript(name) {
            if (isBrowser) {
                each(scripts(), function(scriptNode) {
                    if (scriptNode.getAttribute("data-requiremodule") === name && scriptNode.getAttribute("data-requirecontext") === context.contextName) {
                        scriptNode.parentNode.removeChild(scriptNode);
                        return true;
                    }
                });
            }
        }

        function hasPathFallback(id) {
            var pathConfig = getOwn(config.paths, id);
            if (pathConfig && isArray(pathConfig) && pathConfig.length > 1) {
                removeScript(id);
                pathConfig.shift();
                context.require.undef(id);
                context.require([id]);
                return true;
            }
        }

        function splitPrefix(name) {
            var prefix, index = name ? name.indexOf("!") : -1;
            if (index > -1) {
                prefix = name.substring(0, index);
                name = name.substring(index + 1, name.length);
            }
            return [prefix, name];
        }

        function makeModuleMap(name, parentModuleMap, isNormalized, applyMap) {
            var url, pluginModule, suffix, nameParts, prefix = null,
                parentName = parentModuleMap ? parentModuleMap.name : null,
                originalName = name,
                isDefine = true,
                normalizedName = "";
            if (!name) {
                isDefine = false;
                name = "_@r" + (requireCounter += 1);
            }
            nameParts = splitPrefix(name);
            prefix = nameParts[0];
            name = nameParts[1];
            if (prefix) {
                prefix = normalize(prefix, parentName, applyMap);
                pluginModule = getOwn(defined, prefix);
            }
            if (name) {
                if (prefix) {
                    if (pluginModule && pluginModule.normalize) {
                        normalizedName = pluginModule.normalize(name, function(name) {
                            return normalize(name, parentName, applyMap);
                        });
                    } else {
                        normalizedName = normalize(name, parentName, applyMap);
                    }
                } else {
                    normalizedName = normalize(name, parentName, applyMap);
                    nameParts = splitPrefix(normalizedName);
                    prefix = nameParts[0];
                    normalizedName = nameParts[1];
                    isNormalized = true;
                    url = context.nameToUrl(normalizedName);
                }
            }
            suffix = prefix && !pluginModule && !isNormalized ? "_unnormalized" + (unnormalizedCounter += 1) : "";
            return {
                prefix: prefix,
                name: normalizedName,
                parentMap: parentModuleMap,
                unnormalized: !!suffix,
                url: url,
                originalName: originalName,
                isDefine: isDefine,
                id: (prefix ? prefix + "!" + normalizedName : normalizedName) + suffix
            };
        }

        function getModule(depMap) {
            var id = depMap.id,
                mod = getOwn(registry, id);
            if (!mod) {
                mod = registry[id] = new context.Module(depMap);
            }
            return mod;
        }

        function on(depMap, name, fn) {
            var id = depMap.id,
                mod = getOwn(registry, id);
            if (hasProp(defined, id) && (!mod || mod.defineEmitComplete)) {
                if (name === "defined") {
                    fn(defined[id]);
                }
            } else {
                mod = getModule(depMap);
                if (mod.error && name === "error") {
                    fn(mod.error);
                } else {
                    mod.on(name, fn);
                }
            }
        }

        function onError(err, errback) {
            var ids = err.requireModules,
                notified = false;
            if (errback) {
                errback(err);
            } else {
                each(ids, function(id) {
                    var mod = getOwn(registry, id);
                    if (mod) {
                        mod.error = err;
                        if (mod.events.error) {
                            notified = true;
                            mod.emit("error", err);
                        }
                    }
                });
                if (!notified) {
                    req.onError(err);
                }
            }
        }

        function takeGlobalQueue() {
            if (globalDefQueue.length) {
                apsp.apply(defQueue, [defQueue.length - 1, 0].concat(globalDefQueue));
                globalDefQueue = [];
            }
        }
        handlers = {
            require: function(mod) {
                if (mod.require) {
                    return mod.require;
                } else {
                    return mod.require = context.makeRequire(mod.map);
                }
            },
            exports: function(mod) {
                mod.usingExports = true;
                if (mod.map.isDefine) {
                    if (mod.exports) {
                        return mod.exports;
                    } else {
                        return mod.exports = defined[mod.map.id] = {};
                    }
                }
            },
            module: function(mod) {
                if (mod.module) {
                    return mod.module;
                } else {
                    return mod.module = {
                        id: mod.map.id,
                        uri: mod.map.url,
                        config: function() {
                            var c, pkg = getOwn(config.pkgs, mod.map.id);
                            c = pkg ? getOwn(config.config, mod.map.id + "/" + pkg.main) : getOwn(config.config, mod.map.id);
                            return c || {};
                        },
                        exports: defined[mod.map.id]
                    };
                }
            }
        };

        function cleanRegistry(id) {
            delete registry[id];
            delete enabledRegistry[id];
        }

        function breakCycle(mod, traced, processed) {
            var id = mod.map.id;
            if (mod.error) {
                mod.emit("error", mod.error);
            } else {
                traced[id] = true;
                each(mod.depMaps, function(depMap, i) {
                    var depId = depMap.id,
                        dep = getOwn(registry, depId);
                    if (dep && !mod.depMatched[i] && !processed[depId]) {
                        if (getOwn(traced, depId)) {
                            mod.defineDep(i, defined[depId]);
                            mod.check();
                        } else {
                            breakCycle(dep, traced, processed);
                        }
                    }
                });
                processed[id] = true;
            }
        }

        function checkLoaded() {
            var map, modId, err, usingPathFallback, waitInterval = config.waitSeconds * 1e3,
                expired = waitInterval && context.startTime + waitInterval < new Date().getTime(),
                noLoads = [],
                reqCalls = [],
                stillLoading = false,
                needCycleCheck = true;
            if (inCheckLoaded) {
                return;
            }
            inCheckLoaded = true;
            eachProp(enabledRegistry, function(mod) {
                map = mod.map;
                modId = map.id;
                if (!mod.enabled) {
                    return;
                }
                if (!map.isDefine) {
                    reqCalls.push(mod);
                }
                if (!mod.error) {
                    if (!mod.inited && expired) {
                        if (hasPathFallback(modId)) {
                            usingPathFallback = true;
                            stillLoading = true;
                        } else {
                            noLoads.push(modId);
                            removeScript(modId);
                        }
                    } else if (!mod.inited && mod.fetched && map.isDefine) {
                        stillLoading = true;
                        if (!map.prefix) {
                            return needCycleCheck = false;
                        }
                    }
                }
            });
            if (expired && noLoads.length) {
                err = makeError("timeout", "Load timeout for modules: " + noLoads, null, noLoads);
                err.contextName = context.contextName;
                return onError(err);
            }
            if (needCycleCheck) {
                each(reqCalls, function(mod) {
                    breakCycle(mod, {}, {});
                });
            }
            if ((!expired || usingPathFallback) && stillLoading) {
                if ((isBrowser || isWebWorker) && !checkLoadedTimeoutId) {
                    checkLoadedTimeoutId = setTimeout(function() {
                        checkLoadedTimeoutId = 0;
                        checkLoaded();
                    }, 50);
                }
            }
            inCheckLoaded = false;
        }
        Module = function(map) {
            this.events = getOwn(undefEvents, map.id) || {};
            this.map = map;
            this.shim = getOwn(config.shim, map.id);
            this.depExports = [];
            this.depMaps = [];
            this.depMatched = [];
            this.pluginMaps = {};
            this.depCount = 0;
        };
        Module.prototype = {
            init: function(depMaps, factory, errback, options) {
                options = options || {};
                if (this.inited) {
                    return;
                }
                this.factory = factory;
                if (errback) {
                    this.on("error", errback);
                } else if (this.events.error) {
                    errback = bind(this, function(err) {
                        this.emit("error", err);
                    });
                }
                this.depMaps = depMaps && depMaps.slice(0);
                this.errback = errback;
                this.inited = true;
                this.ignore = options.ignore;
                if (options.enabled || this.enabled) {
                    this.enable();
                } else {
                    this.check();
                }
            },
            defineDep: function(i, depExports) {
                if (!this.depMatched[i]) {
                    this.depMatched[i] = true;
                    this.depCount -= 1;
                    this.depExports[i] = depExports;
                }
            },
            fetch: function() {
                if (this.fetched) {
                    return;
                }
                this.fetched = true;
                context.startTime = new Date().getTime();
                var map = this.map;
                if (this.shim) {
                    context.makeRequire(this.map, {
                        enableBuildCallback: true
                    })(this.shim.deps || [], bind(this, function() {
                        return map.prefix ? this.callPlugin() : this.load();
                    }));
                } else {
                    return map.prefix ? this.callPlugin() : this.load();
                }
            },
            load: function() {
                var url = this.map.url;
                if (!urlFetched[url]) {
                    urlFetched[url] = true;
                    context.load(this.map.id, url);
                }
            },
            check: function() {
                if (!this.enabled || this.enabling) {
                    return;
                }
                var err, cjsModule, id = this.map.id,
                    depExports = this.depExports,
                    exports = this.exports,
                    factory = this.factory;
                if (!this.inited) {
                    this.fetch();
                } else if (this.error) {
                    this.emit("error", this.error);
                } else if (!this.defining) {
                    this.defining = true;
                    if (this.depCount < 1 && !this.defined) {
                        if (isFunction(factory)) {
                            if (this.events.error && this.map.isDefine || req.onError !== defaultOnError) {
                                try {
                                    exports = context.execCb(id, factory, depExports, exports);
                                } catch (e) {
                                    err = e;
                                }
                            } else {
                                exports = context.execCb(id, factory, depExports, exports);
                            }
                            if (this.map.isDefine) {
                                cjsModule = this.module;
                                if (cjsModule && cjsModule.exports !== undefined && cjsModule.exports !== this.exports) {
                                    exports = cjsModule.exports;
                                } else if (exports === undefined && this.usingExports) {
                                    exports = this.exports;
                                }
                            }
                            if (err) {
                                err.requireMap = this.map;
                                err.requireModules = this.map.isDefine ? [this.map.id] : null;
                                err.requireType = this.map.isDefine ? "define" : "require";
                                return onError(this.error = err);
                            }
                        } else {
                            exports = factory;
                        }
                        this.exports = exports;
                        if (this.map.isDefine && !this.ignore) {
                            defined[id] = exports;
                            if (req.onResourceLoad) {
                                req.onResourceLoad(context, this.map, this.depMaps);
                            }
                        }
                        cleanRegistry(id);
                        this.defined = true;
                    }
                    this.defining = false;
                    if (this.defined && !this.defineEmitted) {
                        this.defineEmitted = true;
                        this.emit("defined", this.exports);
                        this.defineEmitComplete = true;
                    }
                }
            },
            callPlugin: function() {
                var map = this.map,
                    id = map.id,
                    pluginMap = makeModuleMap(map.prefix);
                this.depMaps.push(pluginMap);
                on(pluginMap, "defined", bind(this, function(plugin) {
                    var load, normalizedMap, normalizedMod, name = this.map.name,
                        parentName = this.map.parentMap ? this.map.parentMap.name : null,
                        localRequire = context.makeRequire(map.parentMap, {
                            enableBuildCallback: true
                        });
                    if (this.map.unnormalized) {
                        if (plugin.normalize) {
                            name = plugin.normalize(name, function(name) {
                                return normalize(name, parentName, true);
                            }) || "";
                        }
                        normalizedMap = makeModuleMap(map.prefix + "!" + name, this.map.parentMap);
                        on(normalizedMap, "defined", bind(this, function(value) {
                            this.init([], function() {
                                return value;
                            }, null, {
                                enabled: true,
                                ignore: true
                            });
                        }));
                        normalizedMod = getOwn(registry, normalizedMap.id);
                        if (normalizedMod) {
                            this.depMaps.push(normalizedMap);
                            if (this.events.error) {
                                normalizedMod.on("error", bind(this, function(err) {
                                    this.emit("error", err);
                                }));
                            }
                            normalizedMod.enable();
                        }
                        return;
                    }
                    load = bind(this, function(value) {
                        this.init([], function() {
                            return value;
                        }, null, {
                            enabled: true
                        });
                    });
                    load.error = bind(this, function(err) {
                        this.inited = true;
                        this.error = err;
                        err.requireModules = [id];
                        eachProp(registry, function(mod) {
                            if (mod.map.id.indexOf(id + "_unnormalized") === 0) {
                                cleanRegistry(mod.map.id);
                            }
                        });
                        onError(err);
                    });
                    load.fromText = bind(this, function(text, textAlt) {
                        var moduleName = map.name,
                            moduleMap = makeModuleMap(moduleName),
                            hasInteractive = useInteractive;
                        if (textAlt) {
                            text = textAlt;
                        }
                        if (hasInteractive) {
                            useInteractive = false;
                        }
                        getModule(moduleMap);
                        if (hasProp(config.config, id)) {
                            config.config[moduleName] = config.config[id];
                        }
                        try {
                            req.exec(text);
                        } catch (e) {
                            return onError(makeError("fromtexteval", "fromText eval for " + id + " failed: " + e, e, [id]));
                        }
                        if (hasInteractive) {
                            useInteractive = true;
                        }
                        this.depMaps.push(moduleMap);
                        context.completeLoad(moduleName);
                        localRequire([moduleName], load);
                    });
                    plugin.load(map.name, localRequire, load, config);
                }));
                context.enable(pluginMap, this);
                this.pluginMaps[pluginMap.id] = pluginMap;
            },
            enable: function() {
                enabledRegistry[this.map.id] = this;
                this.enabled = true;
                this.enabling = true;
                each(this.depMaps, bind(this, function(depMap, i) {
                    var id, mod, handler;
                    if (typeof depMap === "string") {
                        depMap = makeModuleMap(depMap, this.map.isDefine ? this.map : this.map.parentMap, false, !this.skipMap);
                        this.depMaps[i] = depMap;
                        handler = getOwn(handlers, depMap.id);
                        if (handler) {
                            this.depExports[i] = handler(this);
                            return;
                        }
                        this.depCount += 1;
                        on(depMap, "defined", bind(this, function(depExports) {
                            this.defineDep(i, depExports);
                            this.check();
                        }));
                        if (this.errback) {
                            on(depMap, "error", bind(this, this.errback));
                        }
                    }
                    id = depMap.id;
                    mod = registry[id];
                    if (!hasProp(handlers, id) && mod && !mod.enabled) {
                        context.enable(depMap, this);
                    }
                }));
                eachProp(this.pluginMaps, bind(this, function(pluginMap) {
                    var mod = getOwn(registry, pluginMap.id);
                    if (mod && !mod.enabled) {
                        context.enable(pluginMap, this);
                    }
                }));
                this.enabling = false;
                this.check();
            },
            on: function(name, cb) {
                var cbs = this.events[name];
                if (!cbs) {
                    cbs = this.events[name] = [];
                }
                cbs.push(cb);
            },
            emit: function(name, evt) {
                each(this.events[name], function(cb) {
                    cb(evt);
                });
                if (name === "error") {
                    delete this.events[name];
                }
            }
        };

        function callGetModule(args) {
            if (!hasProp(defined, args[0])) {
                getModule(makeModuleMap(args[0], null, true)).init(args[1], args[2]);
            }
        }

        function removeListener(node, func, name, ieName) {
            if (node.detachEvent && !isOpera) {
                if (ieName) {
                    node.detachEvent(ieName, func);
                }
            } else {
                node.removeEventListener(name, func, false);
            }
        }

        function getScriptData(evt) {
            var node = evt.currentTarget || evt.srcElement;
            removeListener(node, context.onScriptLoad, "load", "onreadystatechange");
            removeListener(node, context.onScriptError, "error");
            return {
                node: node,
                id: node && node.getAttribute("data-requiremodule")
            };
        }

        function intakeDefines() {
            var args;
            takeGlobalQueue();
            while (defQueue.length) {
                args = defQueue.shift();
                if (args[0] === null) {
                    return onError(makeError("mismatch", "Mismatched anonymous define() module: " + args[args.length - 1]));
                } else {
                    callGetModule(args);
                }
            }
        }
        context = {
            config: config,
            contextName: contextName,
            registry: registry,
            defined: defined,
            urlFetched: urlFetched,
            defQueue: defQueue,
            Module: Module,
            makeModuleMap: makeModuleMap,
            nextTick: req.nextTick,
            onError: onError,
            configure: function(cfg) {
                if (cfg.baseUrl) {
                    if (cfg.baseUrl.charAt(cfg.baseUrl.length - 1) !== "/") {
                        cfg.baseUrl += "/";
                    }
                }
                var pkgs = config.pkgs,
                    shim = config.shim,
                    objs = {
                        paths: true,
                        config: true,
                        map: true
                    };
                eachProp(cfg, function(value, prop) {
                    if (objs[prop]) {
                        if (prop === "map") {
                            if (!config.map) {
                                config.map = {};
                            }
                            mixin(config[prop], value, true, true);
                        } else {
                            mixin(config[prop], value, true);
                        }
                    } else {
                        config[prop] = value;
                    }
                });
                if (cfg.shim) {
                    eachProp(cfg.shim, function(value, id) {
                        if (isArray(value)) {
                            value = {
                                deps: value
                            };
                        }
                        if ((value.exports || value.init) && !value.exportsFn) {
                            value.exportsFn = context.makeShimExports(value);
                        }
                        shim[id] = value;
                    });
                    config.shim = shim;
                }
                if (cfg.packages) {
                    each(cfg.packages, function(pkgObj) {
                        var location;
                        pkgObj = typeof pkgObj === "string" ? {
                            name: pkgObj
                        } : pkgObj;
                        location = pkgObj.location;
                        pkgs[pkgObj.name] = {
                            name: pkgObj.name,
                            location: location || pkgObj.name,
                            main: (pkgObj.main || "main").replace(currDirRegExp, "").replace(jsSuffixRegExp, "")
                        };
                    });
                    config.pkgs = pkgs;
                }
                eachProp(registry, function(mod, id) {
                    if (!mod.inited && !mod.map.unnormalized) {
                        mod.map = makeModuleMap(id);
                    }
                });
                if (cfg.deps || cfg.callback) {
                    context.require(cfg.deps || [], cfg.callback);
                }
            },
            makeShimExports: function(value) {
                function fn() {
                    var ret;
                    if (value.init) {
                        ret = value.init.apply(global, arguments);
                    }
                    return ret || value.exports && getGlobal(value.exports);
                }
                return fn;
            },
            makeRequire: function(relMap, options) {
                options = options || {};

                function localRequire(deps, callback, errback) {
                    var id, map, requireMod;
                    if (options.enableBuildCallback && callback && isFunction(callback)) {
                        callback.__requireJsBuild = true;
                    }
                    if (typeof deps === "string") {
                        if (isFunction(callback)) {
                            return onError(makeError("requireargs", "Invalid require call"), errback);
                        }
                        if (relMap && hasProp(handlers, deps)) {
                            return handlers[deps](registry[relMap.id]);
                        }
                        if (req.get) {
                            return req.get(context, deps, relMap, localRequire);
                        }
                        map = makeModuleMap(deps, relMap, false, true);
                        id = map.id;
                        if (!hasProp(defined, id)) {
                            return onError(makeError("notloaded", 'Module name "' + id + '" has not been loaded yet for context: ' + contextName + (relMap ? "" : ". Use require([])")));
                        }
                        return defined[id];
                    }
                    intakeDefines();
                    context.nextTick(function() {
                        intakeDefines();
                        requireMod = getModule(makeModuleMap(null, relMap));
                        requireMod.skipMap = options.skipMap;
                        requireMod.init(deps, callback, errback, {
                            enabled: true
                        });
                        checkLoaded();
                    });
                    return localRequire;
                }
                mixin(localRequire, {
                    isBrowser: isBrowser,
                    toUrl: function(moduleNamePlusExt) {
                        var ext, index = moduleNamePlusExt.lastIndexOf("."),
                            segment = moduleNamePlusExt.split("/")[0],
                            isRelative = segment === "." || segment === "..";
                        if (index !== -1 && (!isRelative || index > 1)) {
                            ext = moduleNamePlusExt.substring(index, moduleNamePlusExt.length);
                            moduleNamePlusExt = moduleNamePlusExt.substring(0, index);
                        }
                        return context.nameToUrl(normalize(moduleNamePlusExt, relMap && relMap.id, true), ext, true);
                    },
                    defined: function(id) {
                        return hasProp(defined, makeModuleMap(id, relMap, false, true).id);
                    },
                    specified: function(id) {
                        id = makeModuleMap(id, relMap, false, true).id;
                        return hasProp(defined, id) || hasProp(registry, id);
                    }
                });
                if (!relMap) {
                    localRequire.undef = function(id) {
                        takeGlobalQueue();
                        var map = makeModuleMap(id, relMap, true),
                            mod = getOwn(registry, id);
                        delete defined[id];
                        delete urlFetched[map.url];
                        delete undefEvents[id];
                        if (mod) {
                            if (mod.events.defined) {
                                undefEvents[id] = mod.events;
                            }
                            cleanRegistry(id);
                        }
                    };
                }
                return localRequire;
            },
            enable: function(depMap) {
                var mod = getOwn(registry, depMap.id);
                if (mod) {
                    getModule(depMap).enable();
                }
            },
            completeLoad: function(moduleName) {
                var found, args, mod, shim = getOwn(config.shim, moduleName) || {},
                    shExports = shim.exports;
                takeGlobalQueue();
                while (defQueue.length) {
                    args = defQueue.shift();
                    if (args[0] === null) {
                        args[0] = moduleName;
                        if (found) {
                            break;
                        }
                        found = true;
                    } else if (args[0] === moduleName) {
                        found = true;
                    }
                    callGetModule(args);
                }
                mod = getOwn(registry, moduleName);
                if (!found && !hasProp(defined, moduleName) && mod && !mod.inited) {
                    if (config.enforceDefine && (!shExports || !getGlobal(shExports))) {
                        if (hasPathFallback(moduleName)) {
                            return;
                        } else {
                            return onError(makeError("nodefine", "No define call for " + moduleName, null, [moduleName]));
                        }
                    } else {
                        callGetModule([moduleName, shim.deps || [], shim.exportsFn]);
                    }
                }
                checkLoaded();
            },
            nameToUrl: function(moduleName, ext, skipExt) {
                var paths, pkgs, pkg, pkgPath, syms, i, parentModule, url, parentPath;
                if (req.jsExtRegExp.test(moduleName)) {
                    url = moduleName + (ext || "");
                } else {
                    paths = config.paths;
                    pkgs = config.pkgs;
                    syms = moduleName.split("/");
                    for (i = syms.length; i > 0; i -= 1) {
                        parentModule = syms.slice(0, i).join("/");
                        pkg = getOwn(pkgs, parentModule);
                        parentPath = getOwn(paths, parentModule);
                        if (parentPath) {
                            if (isArray(parentPath)) {
                                parentPath = parentPath[0];
                            }
                            syms.splice(0, i, parentPath);
                            break;
                        } else if (pkg) {
                            if (moduleName === pkg.name) {
                                pkgPath = pkg.location + "/" + pkg.main;
                            } else {
                                pkgPath = pkg.location;
                            }
                            syms.splice(0, i, pkgPath);
                            break;
                        }
                    }
                    url = syms.join("/");
                    url += ext || (/\?/.test(url) || skipExt ? "" : ".js");
                    url = (url.charAt(0) === "/" || url.match(/^[\w\+\.\-]+:/) ? "" : config.baseUrl) + url;
                }
                return config.urlArgs ? url + ((url.indexOf("?") === -1 ? "?" : "&") + config.urlArgs) : url;
            },
            load: function(id, url) {
                req.load(context, id, url);
            },
            execCb: function(name, callback, args, exports) {
                return callback.apply(exports, args);
            },
            onScriptLoad: function(evt) {
                if (evt.type === "load" || readyRegExp.test((evt.currentTarget || evt.srcElement).readyState)) {
                    interactiveScript = null;
                    var data = getScriptData(evt);
                    context.completeLoad(data.id);
                }
            },
            onScriptError: function(evt) {
                var data = getScriptData(evt);
                if (!hasPathFallback(data.id)) {
                    return onError(makeError("scripterror", "Script error for: " + data.id, evt, [data.id]));
                }
            }
        };
        context.require = context.makeRequire();
        return context;
    }
    req = requirejs = function(deps, callback, errback, optional) {
        var context, config, contextName = defContextName;
        if (!isArray(deps) && typeof deps !== "string") {
            config = deps;
            if (isArray(callback)) {
                deps = callback;
                callback = errback;
                errback = optional;
            } else {
                deps = [];
            }
        }
        if (config && config.context) {
            contextName = config.context;
        }
        context = getOwn(contexts, contextName);
        if (!context) {
            context = contexts[contextName] = req.s.newContext(contextName);
        }
        if (config) {
            context.configure(config);
        }
        return context.require(deps, callback, errback);
    };
    req.config = function(config) {
        return req(config);
    };
    req.nextTick = typeof setTimeout !== "undefined" ? function(fn) {
        setTimeout(fn, 4);
    } : function(fn) {
        fn();
    };
    if (!require) {
        require = req;
    }
    req.version = version;
    req.jsExtRegExp = /^\/|:|\?|\.js$/;
    req.isBrowser = isBrowser;
    s = req.s = {
        contexts: contexts,
        newContext: newContext
    };
    req({});
    each(["toUrl", "undef", "defined", "specified"], function(prop) {
        req[prop] = function() {
            var ctx = contexts[defContextName];
            return ctx.require[prop].apply(ctx, arguments);
        };
    });
    if (isBrowser) {
        head = s.head = document.getElementsByTagName("head")[0];
        baseElement = document.getElementsByTagName("base")[0];
        if (baseElement) {
            head = s.head = baseElement.parentNode;
        }
    }
    req.onError = defaultOnError;
    req.createNode = function(config, moduleName, url) {
        var node = config.xhtml ? document.createElementNS("http://www.w3.org/1999/xhtml", "html:script") : document.createElement("script");
        node.type = config.scriptType || "text/javascript";
        node.charset = "utf-8";
        node.async = true;
        return node;
    };
    req.load = function(context, moduleName, url) {
        var config = context && context.config || {},
            node;
        if (isBrowser) {
            node = req.createNode(config, moduleName, url);
            node.setAttribute("data-requirecontext", context.contextName);
            node.setAttribute("data-requiremodule", moduleName);
            if (node.attachEvent && !(node.attachEvent.toString && node.attachEvent.toString().indexOf("[native code") < 0) && !isOpera) {
                useInteractive = true;
                node.attachEvent("onreadystatechange", context.onScriptLoad);
            } else {
                node.addEventListener("load", context.onScriptLoad, false);
                node.addEventListener("error", context.onScriptError, false);
            }
            node.src = url;
            currentlyAddingScript = node;
            if (baseElement) {
                head.insertBefore(node, baseElement);
            } else {
                head.appendChild(node);
            }
            currentlyAddingScript = null;
            return node;
        } else if (isWebWorker) {
            try {
                importScripts(url);
                context.completeLoad(moduleName);
            } catch (e) {
                context.onError(makeError("importscripts", "importScripts failed for " + moduleName + " at " + url, e, [moduleName]));
            }
        }
    };

    function getInteractiveScript() {
        if (interactiveScript && interactiveScript.readyState === "interactive") {
            return interactiveScript;
        }
        eachReverse(scripts(), function(script) {
            if (script.readyState === "interactive") {
                return interactiveScript = script;
            }
        });
        return interactiveScript;
    }
    if (isBrowser) {
        eachReverse(scripts(), function(script) {
            if (!head) {
                head = script.parentNode;
            }
            dataMain = script.getAttribute("data-main");
            if (dataMain) {
                mainScript = dataMain;
                if (!cfg.baseUrl) {
                    src = mainScript.split("/");
                    mainScript = src.pop();
                    subPath = src.length ? src.join("/") + "/" : "./";
                    cfg.baseUrl = subPath;
                }
                mainScript = mainScript.replace(jsSuffixRegExp, "");
                if (req.jsExtRegExp.test(mainScript)) {
                    mainScript = dataMain;
                }
                cfg.deps = cfg.deps ? cfg.deps.concat(mainScript) : [mainScript];
                return true;
            }
        });
    }
    define = function(name, deps, callback) {
        var node, context;
        if (typeof name !== "string") {
            callback = deps;
            deps = name;
            name = null;
        }
        if (!isArray(deps)) {
            callback = deps;
            deps = null;
        }
        if (!deps && isFunction(callback)) {
            deps = [];
            if (callback.length) {
                callback.toString().replace(commentRegExp, "").replace(cjsRequireRegExp, function(match, dep) {
                    deps.push(dep);
                });
                deps = (callback.length === 1 ? ["require"] : ["require", "exports", "module"]).concat(deps);
            }
        }
        if (useInteractive) {
            node = currentlyAddingScript || getInteractiveScript();
            if (node) {
                if (!name) {
                    name = node.getAttribute("data-requiremodule");
                }
                context = contexts[node.getAttribute("data-requirecontext")];
            }
        }
        (context ? context.defQueue : globalDefQueue).push([name, deps, callback]);
    };
    define.amd = {
        jQuery: true
    };
    req.exec = function(text) {
        return eval(text);
    };
    req(cfg);
})(this);

define("requireLib", function() {});

window.Modernizr = function(a, b, c) {
        function B(a) {
            j.cssText = a;
        }

        function C(a, b) {
            return B(m.join(a + ";") + (b || ""));
        }

        function D(a, b) {
            return typeof a === b;
        }

        function E(a, b) {
            return !!~("" + a).indexOf(b);
        }

        function F(a, b) {
            for (var d in a) {
                var e = a[d];
                if (!E(e, "-") && j[e] !== c) return b == "pfx" ? e : !0;
            }
            return !1;
        }

        function G(a, b, d) {
            for (var e in a) {
                var f = b[a[e]];
                if (f !== c) return d === !1 ? a[e] : D(f, "function") ? f.bind(d || b) : f;
            }
            return !1;
        }

        function H(a, b, c) {
            var d = a.charAt(0).toUpperCase() + a.slice(1),
                e = (a + " " + o.join(d + " ") + d).split(" ");
            return D(b, "string") || D(b, "undefined") ? F(e, b) : (e = (a + " " + p.join(d + " ") + d).split(" "),
                G(e, b, c));
        }
        var d = "2.7.1",
            e = {},
            f = !0,
            g = b.documentElement,
            h = "modernizr",
            i = b.createElement(h),
            j = i.style,
            k, l = {}.toString,
            m = " -webkit- -moz- -o- -ms- ".split(" "),
            n = "Webkit Moz O ms",
            o = n.split(" "),
            p = n.toLowerCase().split(" "),
            q = {
                svg: "http://www.w3.org/2000/svg"
            },
            r = {},
            s = {},
            t = {},
            u = [],
            v = u.slice,
            w, x = function(a, c, d, e) {
                var f, i, j, k, l = b.createElement("div"),
                    m = b.body,
                    n = m || b.createElement("body");
                if (parseInt(d, 10))
                    while (d--) j = b.createElement("div"), j.id = e ? e[d] : h + (d + 1),
                        l.appendChild(j);
                return f = ["&#173;", '<style id="s', h, '">', a, "</style>"].join(""), l.id = h,
                    (m ? l : n).innerHTML += f, n.appendChild(l), m || (n.style.background = "", n.style.overflow = "hidden",
                        k = g.style.overflow, g.style.overflow = "hidden", g.appendChild(n)), i = c(l, a),
                    m ? l.parentNode.removeChild(l) : (n.parentNode.removeChild(n), g.style.overflow = k), !!i;
            },
            y = function(b) {
                var c = a.matchMedia || a.msMatchMedia;
                if (c) return c(b).matches;
                var d;
                return x("@media " + b + " { #" + h + " { position: absolute; } }", function(b) {
                    d = (a.getComputedStyle ? getComputedStyle(b, null) : b.currentStyle)["position"] == "absolute";
                }), d;
            },
            z = {}.hasOwnProperty,
            A;
        !D(z, "undefined") && !D(z.call, "undefined") ? A = function(a, b) {
            return z.call(a, b);
        } : A = function(a, b) {
            return b in a && D(a.constructor.prototype[b], "undefined");
        }, Function.prototype.bind || (Function.prototype.bind = function(b) {
            var c = this;
            if (typeof c != "function") throw new TypeError();
            var d = v.call(arguments, 1),
                e = function() {
                    if (this instanceof e) {
                        var a = function() {};
                        a.prototype = c.prototype;
                        var f = new a(),
                            g = c.apply(f, d.concat(v.call(arguments)));
                        return Object(g) === g ? g : f;
                    }
                    return c.apply(b, d.concat(v.call(arguments)));
                };
            return e;
        }), r.canvas = function() {
            var a = b.createElement("canvas");
            return !!a.getContext && !!a.getContext("2d");
        }, r.touch = function() {
            var c;
            return "ontouchstart" in a || a.DocumentTouch && b instanceof DocumentTouch ? c = !0 : x(["@media (", m.join("touch-enabled),("), h, ")", "{#modernizr{top:9px;position:absolute}}"].join(""), function(a) {
                c = a.offsetTop === 9;
            }), c;
        }, r.geolocation = function() {
            return "geolocation" in navigator;
        }, r.cssanimations = function() {
            return H("animationName");
        }, r.csstransforms = function() {
            return !!H("transform");
        }, r.csstransforms3d = function() {
            var a = !!H("perspective");
            return a && "webkitPerspective" in g.style && x("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}", function(b, c) {
                a = b.offsetLeft === 9 && b.offsetHeight === 3;
            }), a;
        }, r.csstransitions = function() {
            return H("transition");
        }, r.fontface = function() {
            var a;
            return x('@font-face {font-family:"font";src:url("https://")}', function(c, d) {
                var e = b.getElementById("smodernizr"),
                    f = e.sheet || e.styleSheet,
                    g = f ? f.cssRules && f.cssRules[0] ? f.cssRules[0].cssText : f.cssText || "" : "";
                a = /src/i.test(g) && g.indexOf(d.split(" ")[0]) === 0;
            }), a;
        }, r.video = function() {
            var a = b.createElement("video"),
                c = !1;
            try {
                if (c = !!a.canPlayType) c = new Boolean(c), c.ogg = a.canPlayType('video/ogg; codecs="theora"').replace(/^no$/, ""),
                    c.h264 = a.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/, ""), c.webm = a.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/, "");
            } catch (d) {}
            return c;
        }, r.audio = function() {
            var a = b.createElement("audio"),
                c = !1;
            try {
                if (c = !!a.canPlayType) c = new Boolean(c), c.ogg = a.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""),
                    c.mp3 = a.canPlayType("audio/mpeg;").replace(/^no$/, ""), c.wav = a.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ""),
                    c.m4a = (a.canPlayType("audio/x-m4a;") || a.canPlayType("audio/aac;")).replace(/^no$/, "");
            } catch (d) {}
            return c;
        }, r.webworkers = function() {
            return !!a.Worker;
        }, r.svg = function() {
            return !!b.createElementNS && !!b.createElementNS(q.svg, "svg").createSVGRect;
        }, r.inlinesvg = function() {
            var a = b.createElement("div");
            return a.innerHTML = "<svg/>", (a.firstChild && a.firstChild.namespaceURI) == q.svg;
        }, r.svgclippaths = function() {
            return !!b.createElementNS && /SVGClipPath/.test(l.call(b.createElementNS(q.svg, "clipPath")));
        };
        for (var I in r) A(r, I) && (w = I.toLowerCase(), e[w] = r[I](), u.push((e[w] ? "" : "no-") + w));
        return e.addTest = function(a, b) {
                if (typeof a == "object")
                    for (var d in a) A(a, d) && e.addTest(d, a[d]);
                else {
                    a = a.toLowerCase();
                    if (e[a] !== c) return e;
                    b = typeof b == "function" ? b() : b, typeof f != "undefined" && f && (g.className += " " + (b ? "" : "no-") + a),
                        e[a] = b;
                }
                return e;
            }, B(""), i = k = null,
            function(a, b) {
                function l(a, b) {
                    var c = a.createElement("p"),
                        d = a.getElementsByTagName("head")[0] || a.documentElement;
                    return c.innerHTML = "x<style>" + b + "</style>", d.insertBefore(c.lastChild, d.firstChild);
                }

                function m() {
                    var a = s.elements;
                    return typeof a == "string" ? a.split(" ") : a;
                }

                function n(a) {
                    var b = j[a[h]];
                    return b || (b = {}, i++, a[h] = i, j[i] = b), b;
                }

                function o(a, c, d) {
                    c || (c = b);
                    if (k) return c.createElement(a);
                    d || (d = n(c));
                    var g;
                    return d.cache[a] ? g = d.cache[a].cloneNode() : f.test(a) ? g = (d.cache[a] = d.createElem(a)).cloneNode() : g = d.createElem(a),
                        g.canHaveChildren && !e.test(a) && !g.tagUrn ? d.frag.appendChild(g) : g;
                }

                function p(a, c) {
                    a || (a = b);
                    if (k) return a.createDocumentFragment();
                    c = c || n(a);
                    var d = c.frag.cloneNode(),
                        e = 0,
                        f = m(),
                        g = f.length;
                    for (; e < g; e++) d.createElement(f[e]);
                    return d;
                }

                function q(a, b) {
                    b.cache || (b.cache = {}, b.createElem = a.createElement, b.createFrag = a.createDocumentFragment,
                        b.frag = b.createFrag()), a.createElement = function(c) {
                        return s.shivMethods ? o(c, a, b) : b.createElem(c);
                    }, a.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + m().join().replace(/[\w\-]+/g, function(a) {
                        return b.createElem(a), b.frag.createElement(a), 'c("' + a + '")';
                    }) + ");return n}")(s, b.frag);
                }

                function r(a) {
                    a || (a = b);
                    var c = n(a);
                    return s.shivCSS && !g && !c.hasCSS && (c.hasCSS = !!l(a, "article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),
                        k || q(a, c), a;
                }
                var c = "3.7.0",
                    d = a.html5 || {},
                    e = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
                    f = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
                    g, h = "_html5shiv",
                    i = 0,
                    j = {},
                    k;
                (function() {
                    try {
                        var a = b.createElement("a");
                        a.innerHTML = "<xyz></xyz>", g = "hidden" in a, k = a.childNodes.length == 1 || function() {
                            b.createElement("a");
                            var a = b.createDocumentFragment();
                            return typeof a.cloneNode == "undefined" || typeof a.createDocumentFragment == "undefined" || typeof a.createElement == "undefined";
                        }();
                    } catch (c) {
                        g = !0, k = !0;
                    }
                })();
                var s = {
                    elements: d.elements || "abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",
                    version: c,
                    shivCSS: d.shivCSS !== !1,
                    supportsUnknownElements: k,
                    shivMethods: d.shivMethods !== !1,
                    type: "default",
                    shivDocument: r,
                    createElement: o,
                    createDocumentFragment: p
                };
                a.html5 = s, r(b);
            }(this, b), e._version = d, e._prefixes = m, e._domPrefixes = p, e._cssomPrefixes = o,
            e.mq = y, e.testProp = function(a) {
                return F([a]);
            }, e.testAllProps = H, e.testStyles = x, g.className = g.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (f ? " js " + u.join(" ") : ""),
            e;
    }(this, this.document),
    function(a, b, c) {
        function d(a) {
            return "[object Function]" == o.call(a);
        }

        function e(a) {
            return "string" == typeof a;
        }

        function f() {}

        function g(a) {
            return !a || "loaded" == a || "complete" == a || "uninitialized" == a;
        }

        function h() {
            var a = p.shift();
            q = 1, a ? a.t ? m(function() {
                ("c" == a.t ? B.injectCss : B.injectJs)(a.s, 0, a.a, a.x, a.e, 1);
            }, 0) : (a(), h()) : q = 0;
        }

        function i(a, c, d, e, f, i, j) {
            function k(b) {
                if (!o && g(l.readyState) && (u.r = o = 1, !q && h(), l.onload = l.onreadystatechange = null,
                        b)) {
                    "img" != a && m(function() {
                        t.removeChild(l);
                    }, 50);
                    for (var d in y[c]) y[c].hasOwnProperty(d) && y[c][d].onload();
                }
            }
            var j = j || B.errorTimeout,
                l = b.createElement(a),
                o = 0,
                r = 0,
                u = {
                    t: d,
                    s: c,
                    e: f,
                    a: i,
                    x: j
                };
            1 === y[c] && (r = 1, y[c] = []), "object" == a ? l.data = c : (l.src = c, l.type = a),
                l.width = l.height = "0", l.onerror = l.onload = l.onreadystatechange = function() {
                    k.call(this, r);
                }, p.splice(e, 0, u), "img" != a && (r || 2 === y[c] ? (t.insertBefore(l, s ? null : n),
                    m(k, j)) : y[c].push(l));
        }

        function j(a, b, c, d, f) {
            return q = 0, b = b || "j", e(a) ? i("c" == b ? v : u, a, b, this.i++, c, d, f) : (p.splice(this.i++, 0, a),
                1 == p.length && h()), this;
        }

        function k() {
            var a = B;
            return a.loader = {
                load: j,
                i: 0
            }, a;
        }
        var l = b.documentElement,
            m = a.setTimeout,
            n = b.getElementsByTagName("script")[0],
            o = {}.toString,
            p = [],
            q = 0,
            r = "MozAppearance" in l.style,
            s = r && !!b.createRange().compareNode,
            t = s ? l : n.parentNode,
            l = a.opera && "[object Opera]" == o.call(a.opera),
            l = !!b.attachEvent && !l,
            u = r ? "object" : l ? "script" : "img",
            v = l ? "script" : u,
            w = Array.isArray || function(a) {
                return "[object Array]" == o.call(a);
            },
            x = [],
            y = {},
            z = {
                timeout: function(a, b) {
                    return b.length && (a.timeout = b[0]), a;
                }
            },
            A, B;
        B = function(a) {
            function b(a) {
                var a = a.split("!"),
                    b = x.length,
                    c = a.pop(),
                    d = a.length,
                    c = {
                        url: c,
                        origUrl: c,
                        prefixes: a
                    },
                    e, f, g;
                for (f = 0; f < d; f++) g = a[f].split("="), (e = z[g.shift()]) && (c = e(c, g));
                for (f = 0; f < b; f++) c = x[f](c);
                return c;
            }

            function g(a, e, f, g, h) {
                var i = b(a),
                    j = i.autoCallback;
                i.url.split(".").pop().split("?").shift(), i.bypass || (e && (e = d(e) ? e : e[a] || e[g] || e[a.split("/").pop().split("?")[0]]),
                    i.instead ? i.instead(a, e, f, g, h) : (y[i.url] ? i.noexec = !0 : y[i.url] = 1,
                        f.load(i.url, i.forceCSS || !i.forceJS && "css" == i.url.split(".").pop().split("?").shift() ? "c" : c, i.noexec, i.attrs, i.timeout),
                        (d(e) || d(j)) && f.load(function() {
                            k(), e && e(i.origUrl, h, g), j && j(i.origUrl, h, g), y[i.url] = 2;
                        })));
            }

            function h(a, b) {
                function c(a, c) {
                    if (a) {
                        if (e(a)) c || (j = function() {
                            var a = [].slice.call(arguments);
                            k.apply(this, a), l();
                        }), g(a, j, b, 0, h);
                        else if (Object(a) === a)
                            for (n in m = function() {
                                    var b = 0,
                                        c;
                                    for (c in a) a.hasOwnProperty(c) && b++;
                                    return b;
                                }(), a) a.hasOwnProperty(n) && (!c && !--m && (d(j) ? j = function() {
                                var a = [].slice.call(arguments);
                                k.apply(this, a), l();
                            } : j[n] = function(a) {
                                return function() {
                                    var b = [].slice.call(arguments);
                                    a && a.apply(this, b), l();
                                };
                            }(k[n])), g(a[n], j, b, n, h));
                    } else !c && l();
                }
                var h = !!a.test,
                    i = a.load || a.both,
                    j = a.callback || f,
                    k = j,
                    l = a.complete || f,
                    m, n;
                c(h ? a.yep : a.nope, !!i), i && c(i);
            }
            var i, j, l = this.yepnope.loader;
            if (e(a)) g(a, 0, l, 0);
            else if (w(a))
                for (i = 0; i < a.length; i++) j = a[i],
                    e(j) ? g(j, 0, l, 0) : w(j) ? B(j) : Object(j) === j && h(j, l);
            else Object(a) === a && h(a, l);
        }, B.addPrefix = function(a, b) {
            z[a] = b;
        }, B.addFilter = function(a) {
            x.push(a);
        }, B.errorTimeout = 1e4, null == b.readyState && b.addEventListener && (b.readyState = "loading",
            b.addEventListener("DOMContentLoaded", A = function() {
                b.removeEventListener("DOMContentLoaded", A, 0), b.readyState = "complete";
            }, 0)), a.yepnope = k(), a.yepnope.executeStack = h, a.yepnope.injectJs = function(a, c, d, e, i, j) {
            var k = b.createElement("script"),
                l, o, e = e || B.errorTimeout;
            k.src = a;
            for (o in d) k.setAttribute(o, d[o]);
            c = j ? h : c || f, k.onreadystatechange = k.onload = function() {
                !l && g(k.readyState) && (l = 1, c(), k.onload = k.onreadystatechange = null);
            }, m(function() {
                l || (l = 1, c(1));
            }, e), i ? k.onload() : n.parentNode.insertBefore(k, n);
        }, a.yepnope.injectCss = function(a, c, d, e, g, i) {
            var e = b.createElement("link"),
                j, c = i ? h : c || f;
            e.href = a, e.rel = "stylesheet", e.type = "text/css";
            for (j in d) e.setAttribute(j, d[j]);
            g || (n.parentNode.insertBefore(e, n), m(c, 0));
        };
    }(this, document), Modernizr.load = function() {
        yepnope.apply(window, [].slice.call(arguments, 0));
    };

define("modernizr", function(global) {
    return function() {
        var ret, fn;
        return ret || global.Modernizr;
    };
}(this));

if (typeof Object.create !== "function") {
    Object.create = function(o) {
        function F() {}
        F.prototype = o;
        return new F();
    };
}

(function() {
    var lastTime = 0;
    var vendors = ["ms", "moz", "webkit", "o"];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + "RequestAnimationFrame"];
        window.cancelAnimationFrame = window[vendors[x] + "CancelAnimationFrame"] || window[vendors[x] + "CancelRequestAnimationFrame"];
    }
    if (!window.requestAnimationFrame) window.requestAnimationFrame = function(callback, element) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function() {
            callback(currTime + timeToCall);
        }, timeToCall);
        lastTime = currTime + timeToCall;
        return id;
    };
    if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
    };
})();

(function() {
    if (!window.console) {
        window.console = {};
    } else {
        console.log("use http://[url]?debug=true for console.logs");
    }
    var m = ["log", "info", "warn", "error", "debug", "trace", "dir", "group", "groupCollapsed", "groupEnd", "time", "timeEnd", "profile", "profileEnd", "dirxml", "assert", "count", "markTimeline", "timeStamp", "clear"];
    for (var i = 0; i < m.length; i++) {
        if (!window.console[m[i]]) {
            window.console[m[i]] = function() {};
        }
    }
})();

_notify = function() {
    var debug = function() {};
    var components = {};
    var broadcast = function(event, args, source) {
        if (!event) {
            return;
        }
        args = args || [];
        for (var c in components) {
            if (typeof components[c]["on" + event] == "function") {
                try {
                    source = source || components[c];
                    components[c]["on" + event].apply(source, args);
                } catch (err) {
                    debug(["Mediator error.", event, args, source, err].join(" "));
                }
            }
        }
    };
    var addComponent = function(name, component, replaceDuplicate) {
        if (name in components) {
            if (replaceDuplicate) {
                removeComponent(name);
            } else {
                throw new Error("The object: " + name + " has already applied listeners");
            }
        }
        components[name] = component;
    };
    var removeComponent = function(name) {
        if (name in components) {
            delete components[name];
        }
    };
    var getComponent = function(name) {
        return components[name];
    };
    var contains = function(name) {
        return name in components;
    };
    return {
        name: "Mediator",
        broadcast: broadcast,
        add: addComponent,
        rem: removeComponent,
        get: getComponent,
        has: contains
    };
}();

_notify.add("global", function() {
    var tracecount = 0;
    var alertcount = 0;
    return {
        onTrace: function(o) {
            tracecount++;
            var datastring = o.data;
            if (typeof datastring == "object") {
                datastring = JSON.stringify(datastring);
            }
            var buildstring = "[" + String(tracecount) + "] (" + o.senderID + ":" + o.sendertype + ":" + o.notifyscope + ") > " + datastring;
            if (_global$.getQuery("debug")) console.log(buildstring);
        },
        onAlert: function(o) {
            alertcount++;
            var datastring = o.data;
            if (typeof datastring == "object") {
                datastring = JSON.stringify(datastring);
            }
            var buildstring = "[" + String(tracecount) + "] (" + o.senderID + ":" + o.sendertype + ":" + o.notifyscope + ") > " + datastring;
            if (_global$.getQuery("debug")) {
                alert(buildstring);
            }
        },
        onInitialize: function(o) {
            if (_global$.getQuery("debug")) console.log("Created Instance #" + o.senderID + " type:" + o.sendertype + " by " + o.data.author + " [notifyscope:" + o.notifyscope + "]");
        },
        onOrientation: function(o) {
            window._global$.addorientationtohtml(o);
        }
    };
}());

function Event_Handler() {
    var parent = this;
    parent.stack = {};
    parent.addEventListener = function(eventType, handler, target) {
        if (target === undefined) {
            target = document;
        }
        if (parent.stack[String(target) + "_" + eventType] === undefined) {
            parent.stack[String(target) + "_" + eventType] = [];
        }
        target.addEventListener(eventType, handler);
        parent.stack[String(target) + "_" + eventType].push({
            target: target,
            handler: handler
        });
    };
    parent.removeEventListeners = function(eventType, target) {
        if (target === undefined) {
            target = document;
        }
        parent.muteEventListeners(eventType, target);
        var stack = parent.stack[String(target) + "_" + eventType];
        stack.length = 0;
    };
    parent.muteEventListeners = function(eventType, target) {
        if (target === undefined) {
            target = document;
        }
        var stack = parent.stack[String(target) + "_" + eventType];
        for (var i = 0; i < stack.length; i++) {
            target.removeEventListener(eventType, stack[i].handler);
        }
    };
    parent.unmuteEventListeners = function(eventType, target) {
        if (target === undefined) {
            target = document;
        }
        parent.muteEventListeners(eventType, target);
        var stack = parent.stack[String(target) + "_" + eventType];
        for (var i = 0; i < stack.length; i++) {
            stack[i].target.addEventListener(eventType, stack[i].handler);
        }
    };
    parent.returnStack = function(eventType, target) {
        if (target === undefined) {
            target = document;
        }
        var stack = parent.stack[String(target) + "_" + eventType];
        return stack;
    };
}

window.eventHandler = new Event_Handler();

require(["modernizr"], function(Modernizr) {
    function Globals() {
        var root = document.documentElement;
        if (arguments.callee._singletonInstance) return arguments.callee._singletonInstance;
        arguments.callee._singletonInstance = this;
        var parent = this;
        var debouncetimeout = 250;
        var scrolltimeout = undefined;
        this.lastscrollpositionX = 0;
        this.lastscrollpositionY = 0;
        this.orientation = "notset";
        this.windowHeight = undefined;
        this.windowWidth = undefined;
        this.documentHeight = undefined;
        this.documentWidth = undefined;
        this.screenHeight = undefined;
        this.screenWidth = undefined;
        this.host = location.host;
        this.path = location.pathname;
        this.getQuery = function(variable) {
            var query = window.location.search.substring(1);
            var vars = query.split("&");
            for (var i = 0; i < vars.length; i++) {
                var pair = vars[i].split("=");
                if (pair[0] == variable) {
                    var returncandidate = pair[1];
                    if (returncandidate == "true" || returncandidate == "yes" || returncandidate == "y" || returncandidate == "t") {
                        returncandidate = true;
                    }
                    if (returncandidate == "false" || returncandidate == "no" || returncandidate == "n" || returncandidate == "f") {
                        returncandidate = false;
                    }
                    return returncandidate;
                }
            }
            return false;
        };
        this.getHash = function(variable) {
            return window.location.hash;
        };
        if (parent.getQuery("debug")) {
            root.classList.add("debug");
        }
        this.addorientationtohtml = function(o) {
            if (o.data == "portrait") {
                root.classList.add("portrait");
                root.classList.remove("landscape");
            } else {
                root.classList.add("landscape");
                root.classList.remove("portrait");
            }
        };
        this.setOrientation = function() {
            var candidate = "portrait";
            parent.setWindowHeight();
            parent.setWindowWidth();
            if (parent.windowWidth > parent.windowHeight) {
                candidate = "landscape";
            }
            parent._isupdated("orientation", candidate, "Orientation");
        };
        this.setWindowHeight = function() {
            this._isupdated("windowHeight", window.innerHeight, "WindowHeight");
        };
        this.setWindowWidth = function() {
            this._isupdated("windowWidth", window.innerWidth, "WindowWidth");
        };
        this.setDocumentHeight = function() {
            this._isupdated("documentHeight", document.body.clientHeight, "DocumentHeight");
        };
        this.setDocumentWidth = function() {
            this._isupdated("documentWidth", document.body.clientWidth, "DocumentWidth");
        };
        this.setScreenHeight = function() {
            this._isupdated("screenHeight", screen.height, "ScreenHeight");
        };
        this.setScreenWidth = function() {
            this._isupdated("screenWidth", screen.width, "ScreenWidth");
        };
        this.setLastScrollposition = function() {
            var newXval = window.scrollX;
            var newYval = window.scrollY;
            if (newYval > parent.lastscrollpositionY) {
                root.classList.add("scrolldown");
                root.classList.remove("scrollup");
            }
            if (newYval < parent.lastscrollpositionY) {
                root.classList.add("scrollup");
                root.classList.remove("scrolldown");
            }
            if (newXval > parent.lastscrollpositionX) {
                root.classList.add("scrollright");
                root.classList.remove("scrollleft");
            }
            if (newXval < parent.lastscrollpositionX) {
                root.classList.add("scrollleft");
                root.classList.remove("scrollright");
            }
            parent._isupdated("lastscrollpositionX", newXval, "LastXscroll");
            parent._isupdated("lastscrollpositionY", newYval, "LastYscroll");
        };
        this.jsonpReturn = function(id, type, notifyscope) {
            return function(data) {
                _notify.broadcast(type, [{
                    senderID: id,
                    sendertype: type,
                    notifyscope: notifyscope,
                    data: data
                }]);
            };
        };
        this._isupdated = function(value, currentVal, notify) {
            if (parent[value] != currentVal) {
                var Oldvalue = parent[value];
                parent[value] = currentVal;
                if (Oldvalue != undefined) {
                    this.notify(notify, parent[value]);
                }
            }
        };
        this.notify = function(type, data) {
            _notify.broadcast(type, [{
                senderID: "global",
                sendertype: "global",
                notifyscope: "global",
                data: data
            }]);
        };
        this.setCookie = function(key, value) {
            var expires = new Date();
            expires.setTime(expires.getTime() + 1 * 24 * 60 * 60 * 1e3);
            document.cookie = key + "=" + value + ";expires=" + expires.toUTCString();
        };
        this.getCookie = function(key) {
            var keyValue = document.cookie.match("(^|;) ?" + key + "=([^;]*)(;|$)");
            return keyValue ? keyValue[2] : null;
        };

        function debounce(func, wait, immediate) {
            var timeout;
            return function() {
                var context = this,
                    args = arguments;
                var later = function() {
                    timeout = null;
                    if (!immediate) func.apply(context, args);
                };
                var callNow = immediate && !timeout;
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
                if (callNow) func.apply(context, args);
            };
        }
        var resizeHandler = debounce(parent.setOrientation, 250);
        var scrollHandler = debounce(parent.setLastScrollposition, 250);
        eventHandler.addEventListener("resize", resizeHandler, window);
        eventHandler.addEventListener("scroll", scrollHandler, window);
    }
    window._global$ = new Globals();
    window._global$.setOrientation();
    window._global$.setDocumentHeight();
    window._global$.setDocumentWidth();
    window._global$.setScreenHeight();
    window._global$.setScreenWidth();
});

define("js_src/libraries/baselibs/required_web_041917.js", function() {});
