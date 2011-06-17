var createTypeChecker = (function () {

    var create = function () {
        var _isInteger = function (val) {
            return (typeof val == "number") && (val % 1 == 0);
        };

        var _IntegerRange = function (start_, end_, step_) {
            this.start = start_;
            this.end = end_;
            this.step = step_;

            this.contains = function (x) {
                if (!_isInteger(x))
                    return false;
                if (this.start !== undefined && x < this.start)
                    return false;
                if (this.end !== undefined && x > this.end)
                    return false;
                var step_ = this.step || 1;
                if (this.start !== undefined)
                    return ((x - this.start) % step_ == 0);
                else if (this.end !== undefined)
                    return ((this.end - x) % step_ == 0);
                else
                    return (x % step_ == 0);
            }
        };

        var _toIntegerRange = function (type) {
            var start, end, step;

            var splitted = type.split("%");
            if (splitted.length > 2)
                return null;
            if (splitted.length == 2) {
                try {
                    step = JSON.parse(splitted[1]);
                } catch (e) {
                    return null;
                }
                if (!_isInteger(step) || step <= 0)
                    return null;
            }

            var splitted2 = splitted[0].split("..");
            if (splitted2.length > 2)
                return null;
            if (splitted2.length == 2) {
                if (splitted2[0]) {
                    try {
                        start = JSON.parse(splitted2[0]);
                    } catch (e) {
                        return null;
                    }
                    if (!_isInteger(start))
                        return null;
                }
                if (splitted2[1]) {
                    try {
                        end = JSON.parse(splitted2[1]);
                    } catch (e) {
                        return null;
                    }
                    if (!_isInteger(end))
                        return null;
                }
                if (splitted2[0] && splitted2[1])
                    if (start > end)
                        return null;
            }

            if (splitted.length == 2 || splitted2.length == 2)
                return new _IntegerRange(start, end, step);
            else
                return null;
        };

        var _check;

        var _checkArray = function (vals, type) {
            var len = vals.length;
            for (var i = 0; i < len; i++) {
                if (!_check(vals[i], type)) {
                    return false;
                }
            }
            return true;
        };

        var _checkAll = function (val, types) {
            var len = types.length;
            for (var i = 0; i < len; i++) {
                if (_check(val, types[i])) {
                    return true;
                }
            }
            return false;
        };

        _check = function (val, type) {
            if (arguments.length == 0) {
                return true;
            } else if (arguments.length == 1) {
                return _check(val, "true");
            } else if (typeof type == "string") {
                if (type == "undefined" ||
                        type == "boolean" ||
                        type == "number" ||
                        type == "string" ||
                        type == "function" ||
                        type == "object") {
                    return (typeof val == type);
                } else if (type == "null") {
                    return val === null;
                } else if (type == "integer") {
                    return _isInteger(val);
                } else if (type == "int32") {
                    return _isInteger(val) && val >= -2147483648 && val < 2147483648;
                } else if (type == "uint32") {
                    return _isInteger(val) && val >= 0 && val < 4294967296;
                } else if (type == "odd") {
                    return _isInteger(val) && val % 2 == 1;
                } else if (type == "even") {
                    return _isInteger(val) && val % 2 == 0;
                } else if (type == "true") {
                    return val ? true : false;
                } else if (type == "false") {
                    return val ? false : true;
                } else if (type == "array") {
                    return val instanceof Array;
                } else if (type.length > 1 && type.charAt(type.length - 1) == "*") {
                    return val instanceof Array && _checkArray(val, type.substr(0, type.length - 1));
                } else if (type.length > 2 && type.charAt(0) == "[" && type.charAt(type.length - 1) == "]") {
                    try {
                        return _check(val, JSON.parse(type));
                    } catch (e) {
                        throw "invalid type specifier: " + type;
                    }
                } else {
                    var range = _toIntegerRange(type);
                    if (range)
                        return range.contains(val);
                    else
                        throw "invalid type specifier: " + type;
                }
            } else if (typeof type == "function") {
                return val instanceof type;
            } else if (type instanceof Array) {
                return _checkAll(val, type);
            } else {
                throw new TypeError("invalid type specifier: " + type);
            }
        };

        var _assert = function (val, type) {
            if (arguments.length == 0) {
                // do nothing
            } else if (arguments.length == 1) {
                if (!_check(val))
                    throw new TypeError(JSON.stringify([val, "true"]));
            } else {
                if (!_check(val, type))
                    throw new TypeError(JSON.stringify([val, type]));
            }
        };

        var that = {};

        that.check = _check;

        that.assert = _assert;

        return that;
    };

    var checker = create();

    return function () {
        return checker;
    }

})();

exports.getInstance = createTypeChecker;
