import axios from 'axios';
import path from 'path';
import crypto from 'crypto';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function (d, b) {
  extendStatics = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (d, b) {
    d.__proto__ = b;
  } || function (d, b) {
    for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
  };
  return extendStatics(d, b);
};
function __extends(d, b) {
  if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
  extendStatics(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var __assign = function () {
  __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};

var isURLSearchParams = function (params) {
    return typeof URLSearchParams !== 'undefined' && params instanceof URLSearchParams;
};
var sortedParamsString = function (params) {
    if (!params)
        return '';
    if (typeof params === 'string') {
        params = new URLSearchParams(params);
    }
    var entries;
    if (isURLSearchParams(params)) {
        entries = Array.from(params.entries());
    }
    else {
        entries = Object.entries(params);
    }
    var obj = Object.fromEntries(entries.sort());
    return JSON.stringify(obj);
};
var sortedDataStringOrBuffer = function (data) {
    if (!data)
        return '';
    if (data instanceof Buffer) {
        return data;
    }
    if (data instanceof ArrayBuffer) {
        return Buffer.from(data);
    }
    var entries = Array.from(new URLSearchParams(data).entries());
    var obj = Object.fromEntries(entries.sort());
    return JSON.stringify(obj);
};

var md5 = function (data) {
    return crypto.createHash('md5').update(data).digest('hex');
};
var HashInitial = /** @class */ (function () {
    function HashInitial(initial) {
        Object.assign(this, __assign({}, initial));
    }
    return HashInitial;
}());
var Hash = /** @class */ (function (_super) {
    __extends(Hash, _super);
    function Hash() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Hash.prototype.getParamsHashCode = function () {
        var sortedString = sortedParamsString(this.params);
        return md5(sortedString);
    };
    Hash.prototype.getDataHashCode = function () {
        var strOrBuf = sortedDataStringOrBuffer(this.data);
        return md5(strOrBuf);
    };
    Hash.prototype.getCode = function () {
        var url = this.url.toLowerCase();
        var method = this.method.toLowerCase();
        var signature = [url, method, this.getParamsHashCode(), this.getDataHashCode(), this.responseType].join();
        return md5(signature);
    };
    return Hash;
}(HashInitial));
var hash = function (config) {
    var baseURL = config.baseURL, url = config.url, method = config.method, params = config.params, data = config.data, responseType = config.responseType;
    var result = new Hash({
        url: path.join(baseURL, url),
        method: method,
        params: params,
        data: data,
        responseType: responseType
    });
    return result.getCode();
};

var Cache = /** @class */ (function () {
    function Cache() {
        var _this = this;
        this.set = function (key, value) {
            var promise = _this.get(key);
            if (promise)
                return;
            _this.map.set(key, value);
            value["finally"](function () {
                _this.map["delete"](key);
            });
        };
        this.get = function (key) {
            return _this.map.get(key);
        };
        this.map = new Map();
    }
    return Cache;
}());
var cache = new Cache();
var cache$1 = {
    set: cache.set,
    get: cache.get
};

var adapter = function (config) {
    var key = hash(config);
    var target = cache$1.get(key);
    if (target)
        return target;
    var request = axios.defaults.adapter(config);
    cache$1.set(key, request);
    return request;
};

export { adapter as default };
