(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("dynamo-wrapper", [], factory);
	else if(typeof exports === 'object')
		exports["dynamo-wrapper"] = factory();
	else
		root["dynamo-wrapper"] = factory();
})(global, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/dynamo.js":
/*!***********************!*\
  !*** ./src/dynamo.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.query = query;\nexports.scan = scan;\nexports.get = get;\nexports.createItem = createItem;\nexports.updateItem = updateItem;\nexports.deleteItem = deleteItem;\n\nvar _awsSdk = __webpack_require__(/*! aws-sdk */ \"aws-sdk\");\n\nvar _awsSdk2 = _interopRequireDefault(_awsSdk);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nconst dynamoDb = new _awsSdk2.default.DynamoDB.DocumentClient();\n\nfunction query(params) {\n  return new Promise((resolve, reject) => dynamoDb.query(params).promise().then(data => resolve(data.Items)).catch(err => reject(err)));\n}\n\nfunction scan(params) {\n  return new Promise((resolve, reject) => dynamoDb.scan(params).promise().then(data => resolve(data.Items)).catch(err => reject(err)));\n}\n\nfunction get(params) {\n  return new Promise((resolve, reject) => dynamoDb.get(params).promise().then(data => resolve(data.Item)).catch(err => reject(err)));\n}\n\nfunction createItem(params) {\n  return new Promise((resolve, reject) => dynamoDb.put(params).promise().then(() => resolve(params.Item)).catch(err => reject(err)));\n}\n\nfunction updateItem(params) {\n  return new Promise((resolve, reject) => dynamoDb.update(params).promise().then(data => resolve(data.Attributes)).catch(err => reject(err)));\n}\n\nfunction deleteItem(params) {\n  return new Promise((resolve, reject) => dynamoDb.delete(params).promise().then(data => resolve(data.Attributes)).catch(err => reject(err)));\n}\n\n//# sourceURL=webpack://dynamo-wrapper/./src/dynamo.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\nvar _v = __webpack_require__(/*! uuid/v1 */ \"uuid/v1\");\n\nvar _v2 = _interopRequireDefault(_v);\n\nvar _dynamo = __webpack_require__(/*! ./dynamo */ \"./src/dynamo.js\");\n\nvar db = _interopRequireWildcard(_dynamo);\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }\n\nclass Table {\n  constructor(name) {\n    this.name = name;\n  }\n\n  query(params = null) {\n    return db.query(_extends({\n      TableName: this.name\n    }, params));\n  }\n\n  find(params = null) {\n    return db.scan(_extends({\n      TableName: this.name\n    }, params));\n  }\n\n  findById(id, params = null) {\n    return db.get(_extends({\n      TableName: this.name,\n      Key: { id }\n    }, params));\n  }\n\n  findNotNull({ field }, params = null) {\n    return this.find({\n      ExpressionAttributeNames: { '#field': `${field}` },\n      FilterExpression: 'attribute_exists(#field)'\n    }, params);\n  }\n\n  findNull({ field }, params = null) {\n    return this.find({\n      ExpressionAttributeNames: { '#field': `${field}` },\n      FilterExpression: 'attribute_not_exists(#field)'\n    }, params);\n  }\n\n  findIn({ ids, field }, params = null) {\n    const filters = Table.formatArrayValues(ids);\n    return this.find({\n      ExpressionAttributeNames: { '#field': `${field}` },\n      FilterExpression: `#field IN (${Object.keys(filters)})`,\n      ExpressionAttributeValues: filters\n    }, params);\n  }\n\n  findBy({ value, field }, params = null) {\n    return this.find({\n      ExpressionAttributeNames: { '#field': `${field}` },\n      FilterExpression: `#field = :${field}`,\n      ExpressionAttributeValues: { [`:${field}`]: value }\n    }, params);\n  }\n\n  findContains({ value, field }, params = null) {\n    return this.find({\n      ExpressionAttributeNames: { '#field': `${field}` },\n      FilterExpression: `#field contains :${field}`,\n      ExpressionAttributeValues: { [`:${field}`]: value }\n    }, params);\n  }\n\n  add(args, params = null) {\n    return db.createItem(_extends({\n      TableName: this.name,\n      Item: _extends({\n        id: (0, _v2.default)()\n      }, args)\n    }, params));\n  }\n\n  update(id, params = null) {\n    return db.updateItem(_extends({\n      TableName: this.name,\n      Key: {\n        id\n      },\n      ReturnValues: 'ALL_NEW'\n    }, params));\n  }\n\n  updateWithFormat(args) {\n    const {\n      expression,\n      formattedValues,\n      formattedNames\n    } = this.constructor.formatUpdateValues(args);\n    return this.update(args.id, {\n      ExpressionAttributeNames: formattedNames,\n      UpdateExpression: `SET ${expression.join(', ')}`,\n      ExpressionAttributeValues: formattedValues\n    });\n  }\n\n  remove(args, params = null) {\n    return db.deleteItem(_extends({\n      TableName: this.name,\n      Key: {\n        id: args.id\n      },\n      ReturnValues: 'ALL_OLD'\n    }, params));\n  }\n\n  static formatArrayValues(values) {\n    return values.reduce((acc, x, i) => _extends({}, acc, {\n      [`:value${i}`]: x\n    }), {});\n  }\n\n  static formatUpdateValues(_ref) {\n    let { id } = _ref,\n        val = _objectWithoutProperties(_ref, ['id']);\n\n    return Object.keys(val).reduce((acc, key) => {\n      if (val[key] === undefined) return acc;\n      return {\n        expression: acc.expression.concat(`#${key} = :${key}`),\n        formattedValues: _extends({}, acc.formattedValues, {\n          [`:${key}`]: val[key]\n        }),\n        formattedNames: _extends({}, acc.formattedNames, {\n          [`#${key}`]: key\n        })\n      };\n    }, { expression: [], formattedValues: {}, formattedNames: {} });\n  }\n\n  static addIdToSubItems(val, inc = 0) {\n    if (!val) return val;\n    if (Array.isArray(val)) {\n      const i = inc + 1;\n      return val.map(v => Table.addIdToSubItems(v, i));\n    }\n    return __addIdToSubItems(val, inc);\n  }\n}\n\nexports.default = Table;\nconst __addIdToSubItems = (val, clockseq) => {\n  if (val.id) return val;\n  return _extends({}, val, {\n    id: (0, _v2.default)({ clockseq })\n  });\n};\n\n//# sourceURL=webpack://dynamo-wrapper/./src/index.js?");

/***/ }),

/***/ "aws-sdk":
/*!**************************!*\
  !*** external "aws-sdk" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"aws-sdk\");\n\n//# sourceURL=webpack://dynamo-wrapper/external_%22aws-sdk%22?");

/***/ }),

/***/ "uuid/v1":
/*!**************************!*\
  !*** external "uuid/v1" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"uuid/v1\");\n\n//# sourceURL=webpack://dynamo-wrapper/external_%22uuid/v1%22?");

/***/ })

/******/ });
});