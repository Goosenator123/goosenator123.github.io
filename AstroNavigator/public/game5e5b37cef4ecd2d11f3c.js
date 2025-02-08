/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/game.css":
/*!*******************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/game.css ***!
  \*******************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

canvas {
    background-color: black;
    position: fixed;
}`, "",{"version":3,"sources":["webpack://./src/styles/game.css"],"names":[],"mappings":"AAAA;IACI,SAAS;IACT,UAAU;IACV,sBAAsB;AAC1B;;AAEA;IACI,uBAAuB;IACvB,eAAe;AACnB","sourcesContent":["* {\r\n    margin: 0;\r\n    padding: 0;\r\n    box-sizing: border-box;\r\n}\r\n\r\ncanvas {\r\n    background-color: black;\r\n    position: fixed;\r\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/assets/BACKGROUNDMUSIC.mp3":
/*!****************************************!*\
  !*** ./src/assets/BACKGROUNDMUSIC.mp3 ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "assets/BACKGROUNDMUSIC.f4dd82c65d32ddeb10d4925825d1b564.mp3");

/***/ }),

/***/ "./src/assets/PEWPEW.mp3":
/*!*******************************!*\
  !*** ./src/assets/PEWPEW.mp3 ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "assets/PEWPEW.df05f1595b9cdb762f1065937663a818.mp3");

/***/ }),

/***/ "./src/assets/POWERUP.mp3":
/*!********************************!*\
  !*** ./src/assets/POWERUP.mp3 ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "assets/POWERUP.881df9d05db5ceb45921451e2b814a5f.mp3");

/***/ }),

/***/ "./src/assets/TAKINGDAMAGE.mp3":
/*!*************************************!*\
  !*** ./src/assets/TAKINGDAMAGE.mp3 ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "assets/TAKINGDAMAGE.8899323fe56e1135f2f3a66623387936.mp3");

/***/ }),

/***/ "./src/styles/game.css":
/*!*****************************!*\
  !*** ./src/styles/game.css ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_game_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./game.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles/game.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());
options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_game_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_game_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_game_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_game_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),

/***/ "./src/assets/ASTEROID.png":
/*!*********************************!*\
  !*** ./src/assets/ASTEROID.png ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/ASTEROIDa6737bd42f9bca4cdb42.png";

/***/ }),

/***/ "./src/assets/SPACESHIP.png":
/*!**********************************!*\
  !*** ./src/assets/SPACESHIP.png ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/SPACESHIP69cad88bc73b464b2020.png";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript && document.currentScript.tagName.toUpperCase() === 'SCRIPT')
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!************************!*\
  !*** ./src/js/game.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_game_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../styles/game.css */ "./src/styles/game.css");
/* harmony import */ var _assets_SPACESHIP_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../assets/SPACESHIP.png */ "./src/assets/SPACESHIP.png");
/* harmony import */ var _assets_ASTEROID_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../assets/ASTEROID.png */ "./src/assets/ASTEROID.png");
/* harmony import */ var _assets_BACKGROUNDMUSIC_mp3__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../assets/BACKGROUNDMUSIC.mp3 */ "./src/assets/BACKGROUNDMUSIC.mp3");
/* harmony import */ var _assets_PEWPEW_mp3__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../assets/PEWPEW.mp3 */ "./src/assets/PEWPEW.mp3");
/* harmony import */ var _assets_TAKINGDAMAGE_mp3__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../assets/TAKINGDAMAGE.mp3 */ "./src/assets/TAKINGDAMAGE.mp3");
/* harmony import */ var _assets_POWERUP_mp3__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../assets/POWERUP.mp3 */ "./src/assets/POWERUP.mp3");
// ================================ Imports ================================








// ============================ Canvas Variables ===========================
const canvas = document.getElementById('main-canvas');
const ctx = canvas.getContext('2d');

// Function to set the canvas size dynamically
function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
setCanvasSize();

// ============================ Game Variables =============================
let rectangle;
const rectWidth = 60;
const rectHeight = 75;
let projectiles = [];
let particles = [];
let projectileSpeed = -5;
let elapsedTime = 0;
let isGameOver = false;
let upgradeInterval = 10000;
let animationId;
let miliseconds = 0;
let obstacleArray = [];
let lastUpgradeTime = Date.now();
let gamePaused = false;

const directionPressed = {
    'w': false,
    'a': false,
    's': false,
    'd': false,
};

const upgrades = [
    { description: '+20% Attack Speed', apply: (rect) => (rect.atkSpeed = Math.max(50, rect.atkSpeed * 0.8)) },
    { description: '+15% Attack Power', apply: (rect) => (rect.atk = Math.round(rect.atk * 1.15)) },
    { description: '+15 HP', apply: (rect) => {rect.hp += 15; rect.maxHp += 15; drawHPBar(rectangle)} },
    { description: '+20% Projectile Speed', apply: () => {projectileSpeed *= 1.2} },
    { description: '+1 Movement Speed', apply: (rect) => (rect.speed = (rect.speed || 5) + 1) },
];

// =========================== Music Variables ==============================
const bgMusic = new Audio(_assets_BACKGROUNDMUSIC_mp3__WEBPACK_IMPORTED_MODULE_3__["default"]);
bgMusic.loop = true;
const pewSound = new Audio(_assets_PEWPEW_mp3__WEBPACK_IMPORTED_MODULE_4__["default"]);
const takingDmg = new Audio(_assets_TAKINGDAMAGE_mp3__WEBPACK_IMPORTED_MODULE_5__["default"]);
const powerUp = new Audio(_assets_POWERUP_mp3__WEBPACK_IMPORTED_MODULE_6__["default"]);

// =========================== Utility Functions ============================
function clearCanvas() {
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.closePath();
}

function getRandomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function checkCollision(player, obstacle) {
    const distX = Math.abs(player.x + player.width / 2 - obstacle.x);
    const distY = Math.abs(player.y + player.height / 2 - obstacle.y);
    const distance = Math.sqrt(distX * distX + distY * distY);
    return distance < obstacle.radius + player.width / 2;
}

// ========================= Drawing Functions ==============================
function drawProgressBar() {
    if (gamePaused) return;

    const barWidth = canvas.width * 0.8;
    const barHeight = 30;
    const x = (canvas.width - barWidth) / 2;
    const y = 20;

    const currentTime = Date.now();
    const elapsedTimeSinceLastUpgrade = currentTime - lastUpgradeTime;
    const progressRatio = Math.min(elapsedTimeSinceLastUpgrade / upgradeInterval, 1);

    ctx.fillStyle = 'black';
    ctx.fillRect(x, y, barWidth, barHeight);

    ctx.fillStyle = 'yellow';
    ctx.fillRect(x, y, barWidth * progressRatio, barHeight);

    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, barWidth, barHeight);
}

function drawHPBar(rectangle) {
    const barWidth = 400;
    const barHeight = 40;
    const x = 10;
    const y = canvas.height - 10 - barHeight;

    const hpRatio = Math.max(rectangle.hp / rectangle.maxHp, 0);

    ctx.fillStyle = 'red';
    ctx.fillRect(x, y, barWidth, barHeight);

    ctx.fillStyle = 'green';
    ctx.fillRect(x, y, barWidth * hpRatio, barHeight);

    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, barWidth, barHeight);

    ctx.fillStyle = 'white';
    ctx.font = 'bold 20px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`HP: ${rectangle.hp}`, x + barWidth / 2, y + barHeight / 1.5);
}

function drawTime() {
    ctx.fillStyle = 'white';
    ctx.font = 'bold 20px Arial';

    // Define text and its position
    const text = `Time: ${miliseconds}ms`;
    const x = 100;
    const y = 40;

    // Measure the text width
    const textWidth = ctx.measureText(text).width;

    // Adjust the position if the text would go out of bounds
    const adjustedX = Math.min(x, canvas.width - textWidth - 10); // Keep 10px padding from the right edge
    const adjustedY = Math.min(y, canvas.height - 10); // Keep 10px padding from the bottom edge

    ctx.fillText(text, adjustedX, adjustedY);
}

// ========================= Classes and Entities ===========================
const spaceshipImage = new Image();
spaceshipImage.src = _assets_SPACESHIP_png__WEBPACK_IMPORTED_MODULE_1__;

class Rectangle {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.hp = 100;
        this.maxHp = 100;
        this.atk = 15;
        this.atkSpeed = 1000;
        this.lastProjectileTime = 0;
        this.speed = 2;
    }

    draw() {
        ctx.drawImage(spaceshipImage, this.x, this.y, this.width, this.height);
    }

    update() {
        if (directionPressed['a'] && this.x > 0) this.x -= this.speed;
        if (directionPressed['d'] && this.x + this.width < canvas.width) this.x += this.speed;
        if (directionPressed['w'] && this.y > 0) this.y -= this.speed;
        if (directionPressed['s'] && this.y + this.height < canvas.height) this.y += this.speed;

        if (Date.now() - this.lastProjectileTime > this.atkSpeed) {
            projectiles.push(new Projectile(this.x + this.width / 2, this.y));
            pewSound.play();
            this.lastProjectileTime = Date.now();
        }

        this.draw();
    }
}

class Projectile {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 5;
        this.speed = projectileSpeed;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = 'yellow';
        ctx.fill();
        ctx.closePath();
    }

    update() {
        this.y += this.speed;
        this.draw();
    }
}

const asteroidImage = new Image();
asteroidImage.src = _assets_ASTEROID_png__WEBPACK_IMPORTED_MODULE_2__;

class Obstacle {
    constructor(x, y, dx, dy, radius) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.hp = Math.ceil(radius);
        this.angle = 0;
        this.rotationSpeed = Math.random() * 0.05 + 0.02;
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.drawImage(asteroidImage, -this.radius, -this.radius, this.radius * 2, this.radius * 2);
        ctx.restore();
    }

    update() {
        this.y += this.dy;
        this.x += this.dx;
        this.angle += this.rotationSpeed;
        if (this.angle > Math.PI * 2) this.angle -= Math.PI * 2;
        this.draw();
    }
}

class Particle {
    constructor(x, y, size, speed) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speed = speed;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.closePath();
    }

    update() {
        this.y += this.speed;
        if (this.y > canvas.height) {
            this.y = -this.size;
            this.x = Math.random() * canvas.width;
        }
        this.draw();
    }
}

// =========================== Initialization ===============================
function initParticles(count) {
    particles = [];
    for (let i = 0; i < count; i++) {
        const size = Math.random() * 2 + 1;
        const speed = Math.random() * 2 + 1;
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        particles.push(new Particle(x, y, size, speed));
    }
}

function setRectangle() {
    const x = canvas.width / 2 - rectWidth;
    const y = canvas.height - rectHeight - 50;
    rectangle = new Rectangle(x, y, rectWidth, rectHeight);
}

// ============================== Game Loop ==================================
function animate(timestamp) {
    if (isGameOver) {
        localStorage.setItem('survivalTime', (elapsedTime / 1000).toFixed(2));
        window.location.href = 'gameOver.html';
        return;
    }
    const deltaTime = timestamp - elapsedTime;
    elapsedTime += deltaTime;

    clearCanvas();

    particles.forEach((particle) => particle.update());
    rectangle.update();

    projectiles.forEach((p, index) => {
        p.update();
        if (p.y < 0) projectiles.splice(index, 1);
    });

    obstacleArray.forEach((obstacle, i) => {
        obstacle.update();
        if (checkCollision(rectangle, obstacle)) {
            rectangle.hp -= 10;
            takingDmg.play();
            obstacleArray.splice(i, 1);
            if (rectangle.hp <= 0) isGameOver = true;
        } else {
            projectiles.forEach((projectile, j) => {
                if (
                    projectile.x > obstacle.x - obstacle.radius &&
                    projectile.x < obstacle.x + obstacle.radius &&
                    projectile.y > obstacle.y - obstacle.radius &&
                    projectile.y < obstacle.y + obstacle.radius
                ) {
                    obstacle.hp -= rectangle.atk;
                    projectiles.splice(j, 1);
                    if (obstacle.hp <= 0) obstacleArray.splice(i, 1);
                }
            });
        }
    });

    drawHPBar(rectangle);
    drawProgressBar();

    drawTime();


    animationId = requestAnimationFrame(animate);
}

// ============================ Game Start/Setup ============================
function startGame() {
    setInterval(() => {
        if (!gamePaused) miliseconds += 1;
    }, 10);
    setInterval(() => {
        if (!gamePaused) createObstacle();
    }, 100);
    startUpgradeTimer();
    setRectangle();
    initParticles(100);
    animate(0);
}

function startUpgradeTimer() {
    lastUpgradeTime = Date.now();
    setTimeout(() => {
        upgradeInterval += 2000;
        displayUpgrades();
        lastUpgradeTime = Date.now();
    }, upgradeInterval);
}

function createObstacle() {
    const y = -10;
    const dy = 3;

    const baseRadius = 20;
    const maxRadius = 100;
    const radiusGrowthFactor = 0.003;
    const radius = Math.min(baseRadius + miliseconds / 100 * radiusGrowthFactor * maxRadius, maxRadius);

    const x = getRandomIntFromRange(0, canvas.width);
    const dx = getRandomIntFromRange(-0.2, 0.2);
    obstacleArray.push(new Obstacle(x, y, dx, dy, radius));
}

// ============================ Upgrade System ==============================
function displayUpgrades() {
    cancelAnimationFrame(animationId);
    gamePaused = true;

    const selectedUpgrades = [];
    while (selectedUpgrades.length < 3) {
        const randomUpgrade = upgrades[Math.floor(Math.random() * upgrades.length)];
        if (!selectedUpgrades.includes(randomUpgrade)) selectedUpgrades.push(randomUpgrade);
    }

    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const boxWidth = 400;
    const boxHeight = 200;
    const spacing = 50;
    const startX = (canvas.width - (3 * boxWidth + 2 * spacing)) / 2;
    const startY = canvas.height / 2 - boxHeight / 2;

    selectedUpgrades.forEach((upgrade, index) => {
        const x = startX + index * (boxWidth + spacing);
        ctx.fillStyle = 'black';
        ctx.fillRect(x, startY, boxWidth, boxHeight);
        ctx.strokeStyle = "#0074ff";
        ctx.strokeRect(x, startY, boxWidth, boxHeight);

        ctx.fillStyle = '#00d4ff';
        ctx.font = '24px Arial';
        ctx.textAlign = 'center';

        ctx.fillText(upgrade.description, x + boxWidth / 2, startY + boxHeight / 2 - 20);
        ctx.fillText(`Press ${index + 1}`, x + boxWidth / 2, startY + boxHeight / 2 + 20);
    });

    const upgradeHandler = (event) => {
        if (['1', '2', '3'].includes(event.key)) {
            const choice = parseInt(event.key) - 1;
            selectedUpgrades[choice].apply(rectangle);
            window.removeEventListener('keydown', upgradeHandler);
            powerUp.play();
            startUpgradeTimer();
            requestAnimationFrame(animate);
            gamePaused = false;
        }
    };

    window.addEventListener('keydown', upgradeHandler);
}

// ============================== Event Listeners ===========================
window.onload = () => {
    startGame();
};

let initialPlayMusic = true;
window.addEventListener('keydown', () => {
    if (initialPlayMusic)  bgMusic.play();
    initialPlayMusic = false;
})

window.addEventListener('keydown', (event) => {
    if (['w', 'a', 's', 'd'].includes(event.key)) directionPressed[event.key] = true;
});

window.addEventListener('keyup', (event) => {
    if (['w', 'a', 's', 'd'].includes(event.key)) directionPressed[event.key] = false;
});

window.addEventListener('resize', () => {
    setCanvasSize();
    setRectangle();
});

})();

/******/ })()
;
//# sourceMappingURL=game5e5b37cef4ecd2d11f3c.js.map