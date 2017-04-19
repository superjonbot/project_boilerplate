/*! project_boilerplate : project.js */
/*! codebase: CB2017 v2.1.4 by Jonathan Robles */
/*! built:04-19-2017 [2:02:38AM] */
/*! -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */

/*! Prerequisite Libraries: none */

/*! -=-=-=-=-=-=-=-Third Party Includes [start]-=-=-=-=-=-=-=- */
/* requireLib */
/*! -=-=-=-=-=-=-=- Third Party Includes [end] -=-=-=-=-=-=-=- */

define("js_src/modules/base/standardmodule", [], function() {
    var _instanceID = 0;
    var _nextInstanceID = function() {
        return ++_instanceID;
    };
    var defaults = [];
    var deepExtend = function(destination, source) {
        for (var property in source) {
            if (source[property] && source[property].constructor && source[property].constructor === Object) {
                destination[property] = destination[property] || {};
                arguments.callee(destination[property], source[property]);
            } else {
                destination[property] = source[property];
            }
        }
        return destination;
    };

    function _thizOBJ_(o) {
        this._instanceID = _nextInstanceID();
        var _parent = this;
        defaults[this._instanceID] = {
            type: "Standard Module Definition",
            author: "Jonathan Robles",
            notifyscope: "global",
            target: undefined,
            file: undefined,
            usenocache: true,
            data: undefined,
            callback: undefined,
            interval: undefined,
            init: function() {
                _notify.broadcast("Initialize", [{
                    senderID: _parent._instanceID,
                    sendertype: this.type,
                    notifyscope: this.notifyscope,
                    data: {
                        author: this.author
                    }
                }]);
            },
            parent: this
        };
        defaults[this._instanceID] = deepExtend(defaults[this._instanceID], o);
        defaults[this._instanceID].init();
        return this;
    }
    _thizOBJ_.prototype = {
        _init: function() {
            this._var().init();
        },
        _showdata: function() {
            return JSON.stringify(defaults[this._instanceID]);
        },
        _id: function() {
            return this._instanceID;
        },
        _var: function(o) {
            if (o != undefined) {
                defaults[this._instanceID] = deepExtend(defaults[this._instanceID], o);
            }
            return defaults[this._instanceID];
        },
        _nocache: function(string) {
            if (typeof string === "string") {
                if (this._var().usenocache) {
                    var addOn = "?";
                    if (string.indexOf("?") != -1) {
                        addOn = "&";
                    }
                    return string + addOn + "nocache=" + Math.floor(Math.random() * 9999);
                } else {
                    return string;
                }
            } else {
                this.notify("Alert", "_nocache needs a string!");
                return;
            }
        },
        notify: function(type, data) {
            _notify.broadcast(type, [{
                senderID: this._id(),
                sendertype: this._var().type,
                notifyscope: this._var().notifyscope,
                data: data
            }]);
        },
        deepExtend: function(destination, source) {
            return deepExtend(destination, source);
        },
        parent: this
    };
    return _thizOBJ_;
});

define("js_src/modules/base/extendedmodule", ["js_src/modules/base/standardmodule"], function(parentModel) {
    function _thizOBJ_(o) {
        var defaults = {
            type: "extendedmodule",
            author: "Jonathan Robles",
            lasteditby: ""
        };
        defaults = this.deepExtend(defaults, o);
        parentModel.call(this, defaults);
        return this;
    }
    _thizOBJ_.prototype = Object.create(parentModel.prototype);
    _thizOBJ_.prototype._startlisteners = function() {};
    _thizOBJ_.prototype.init = function() {
        this.notify("Trace", "init");
        this._startlisteners();
        this.refresh();
    };
    _thizOBJ_.prototype.refresh = function() {
        this.notify("Trace", "refresh");
    };
    _thizOBJ_.prototype.kill = function() {
        this.notify("Trace", "kill");
        _notify.rem(this._id());
    };
    _thizOBJ_.prototype.sayhi = function() {
        this.notify("Trace", "hi there, from object#" + this._id() + " [ " + this._var().type + " by " + this._var().author + " ] ");
    };
    return _thizOBJ_;
});

require(["js_src/modules/base/extendedmodule"], function(Instance) {
    window.myProject = new Instance({});
    window.myProject.init();
});

define("projects/project_boilerplate/js_src/project.js", function() {});
