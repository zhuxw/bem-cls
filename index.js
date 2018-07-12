(function(root, factory) {
  if (typeof exports === 'object') {
    // CommonJS
    module.exports = factory();
  } else if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory);
  } else {
    // Browser globals
    root.bemcls = factory();
  }
})(this, function() {
  var objToString = Object.prototype.toString;
  var arraySlice = Array.prototype.slice;
  var EXACT_KEY = '__exact';

  function isObject(it) {
    return objToString.apply(it) === '[object Object]';
  }

  function isArray(it) {
    return objToString.apply(it) === '[object Array]';
  }

  function makeExact(it) {
    if (!it[EXACT_KEY]) {
      it = new String(it);
      it[EXACT_KEY] = true;
    }
    return it;
  }

  function normClsName(blockName, elementName, exactMode) {
    if (!elementName) {
      return [];
    } else if (elementName[EXACT_KEY] || exactMode) {
      return [makeExact(elementName)];
    }
    return [blockName + '__' + elementName];
  }

  function getClsFromObj(blockName, obj, exactMode) {
    var clsNames = [];

    for (var key in obj) {
      if (obj.hasOwnProperty(key) && obj[key]) {
        clsNames = clsNames.concat(normClsName(blockName, key, exactMode));
      }
    }

    return clsNames;
  }

  function getClsInner(blockName, arg, exactMode) {
    var clsNames = [];

    if (isObject(arg)) {
      clsNames = clsNames.concat(getClsFromObj(blockName, arg, exactMode));
    } else if (isArray(arg)) {
      arg.forEach(function(item){
        clsNames = clsNames.concat(getClsInner(blockName, item, exactMode));
      });
    } else if (arg) {
      clsNames = clsNames.concat(normClsName(blockName, arg, exactMode));
    }

    return clsNames;
  }

  function getCls(blockName, args, exactMode) {
    var dict = {};
    var clsNames = getClsInner(blockName, args, exactMode).filter(function(name){
      var exist = dict[name];
      dict[name] = true;
      return !exist;
    });

    var ret = clsNames.join(' ');
    return ret && makeExact(ret);
  }

  return function(blockName) {
    function ret() {
      if (arguments.length === 0) {
        return ret.block.toString();
      } else {
        return getCls(blockName, arraySlice.apply(arguments)).toString();
      }
    }

    ret.block = makeExact(blockName);

    ret.exact = function() {
      return getCls(blockName, arraySlice.apply(arguments), true);
    };

    return ret;
  };
});
