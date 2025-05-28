/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/index.css":
/*!********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/index.css ***!
  \********************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, `/* Global Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    margin: 0;
    font-family: Arial, sans-serif;
    background: #000;
    overflow: hidden;
  }
  
  /* Canvas Styling */
  canvas {
    display: block;
    background: black;
  }
  
  /* Menu Overlay Styling */
  #menu {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.8);
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 2;
  }
  
  #header {
    width: 100%;
    height: 20vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  #header h1 {
    font-size: 5em;
    margin: 0;
  }
  
  #instructions {
    width: 80%;
    text-align: center;
    margin: 20px 0;
    font-size: 1.2em;
    line-height: 1.5;
  }
  
  #startButton {
    font-size: 2em;
    padding: 10px 20px;
    cursor: pointer;
    border: none;
    background: #333;
    color: white;
    border-radius: 5px;
    transition: background 0.3s ease;
  }
  
  #startButton:hover {
    background: #555;
  }
  
  /* Game Over Menu Styling */
  #gameOverMenu {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.8);
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: -100;
  }
  
  #gameOverMenu h1 {
    font-size: 4em;
    margin-bottom: 20px;
  }
  
  #restartButton {
    font-size: 1.8em;
    padding: 10px 20px;
    cursor: pointer;
    border: none;
    background: #333;
    color: white;
    border-radius: 5px;
    transition: background 0.3s ease;
  }
  
  #restartButton:hover {
    background: #555;
  }
  `, "",{"version":3,"sources":["webpack://./src/styles/index.css"],"names":[],"mappings":"AAAA,kBAAkB;AAClB;IACI,SAAS;IACT,UAAU;IACV,sBAAsB;EACxB;;EAEA;IACE,SAAS;IACT,8BAA8B;IAC9B,gBAAgB;IAChB,gBAAgB;EAClB;;EAEA,mBAAmB;EACnB;IACE,cAAc;IACd,iBAAiB;EACnB;;EAEA,yBAAyB;EACzB;IACE,eAAe;IACf,MAAM;IACN,OAAO;IACP,WAAW;IACX,YAAY;IACZ,2BAA2B;IAC3B,YAAY;IACZ,aAAa;IACb,sBAAsB;IACtB,mBAAmB;IACnB,UAAU;EACZ;;EAEA;IACE,WAAW;IACX,YAAY;IACZ,aAAa;IACb,uBAAuB;IACvB,mBAAmB;EACrB;;EAEA;IACE,cAAc;IACd,SAAS;EACX;;EAEA;IACE,UAAU;IACV,kBAAkB;IAClB,cAAc;IACd,gBAAgB;IAChB,gBAAgB;EAClB;;EAEA;IACE,cAAc;IACd,kBAAkB;IAClB,eAAe;IACf,YAAY;IACZ,gBAAgB;IAChB,YAAY;IACZ,kBAAkB;IAClB,gCAAgC;EAClC;;EAEA;IACE,gBAAgB;EAClB;;EAEA,2BAA2B;EAC3B;IACE,eAAe;IACf,MAAM;IACN,OAAO;IACP,WAAW;IACX,YAAY;IACZ,2BAA2B;IAC3B,YAAY;IACZ,aAAa;IACb,sBAAsB;IACtB,uBAAuB;IACvB,mBAAmB;IACnB,aAAa;EACf;;EAEA;IACE,cAAc;IACd,mBAAmB;EACrB;;EAEA;IACE,gBAAgB;IAChB,kBAAkB;IAClB,eAAe;IACf,YAAY;IACZ,gBAAgB;IAChB,YAAY;IACZ,kBAAkB;IAClB,gCAAgC;EAClC;;EAEA;IACE,gBAAgB;EAClB","sourcesContent":["/* Global Styles */\r\n* {\r\n    margin: 0;\r\n    padding: 0;\r\n    box-sizing: border-box;\r\n  }\r\n  \r\n  body {\r\n    margin: 0;\r\n    font-family: Arial, sans-serif;\r\n    background: #000;\r\n    overflow: hidden;\r\n  }\r\n  \r\n  /* Canvas Styling */\r\n  canvas {\r\n    display: block;\r\n    background: black;\r\n  }\r\n  \r\n  /* Menu Overlay Styling */\r\n  #menu {\r\n    position: fixed;\r\n    top: 0;\r\n    left: 0;\r\n    width: 100%;\r\n    height: 100%;\r\n    background: rgba(0,0,0,0.8);\r\n    color: white;\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n    z-index: 2;\r\n  }\r\n  \r\n  #header {\r\n    width: 100%;\r\n    height: 20vh;\r\n    display: flex;\r\n    justify-content: center;\r\n    align-items: center;\r\n  }\r\n  \r\n  #header h1 {\r\n    font-size: 5em;\r\n    margin: 0;\r\n  }\r\n  \r\n  #instructions {\r\n    width: 80%;\r\n    text-align: center;\r\n    margin: 20px 0;\r\n    font-size: 1.2em;\r\n    line-height: 1.5;\r\n  }\r\n  \r\n  #startButton {\r\n    font-size: 2em;\r\n    padding: 10px 20px;\r\n    cursor: pointer;\r\n    border: none;\r\n    background: #333;\r\n    color: white;\r\n    border-radius: 5px;\r\n    transition: background 0.3s ease;\r\n  }\r\n  \r\n  #startButton:hover {\r\n    background: #555;\r\n  }\r\n  \r\n  /* Game Over Menu Styling */\r\n  #gameOverMenu {\r\n    position: fixed;\r\n    top: 0;\r\n    left: 0;\r\n    width: 100%;\r\n    height: 100%;\r\n    background: rgba(0,0,0,0.8);\r\n    color: white;\r\n    display: flex;\r\n    flex-direction: column;\r\n    justify-content: center;\r\n    align-items: center;\r\n    z-index: -100;\r\n  }\r\n  \r\n  #gameOverMenu h1 {\r\n    font-size: 4em;\r\n    margin-bottom: 20px;\r\n  }\r\n  \r\n  #restartButton {\r\n    font-size: 1.8em;\r\n    padding: 10px 20px;\r\n    cursor: pointer;\r\n    border: none;\r\n    background: #333;\r\n    color: white;\r\n    border-radius: 5px;\r\n    transition: background 0.3s ease;\r\n  }\r\n  \r\n  #restartButton:hover {\r\n    background: #555;\r\n  }\r\n  "],"sourceRoot":""}]);
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

/***/ "./src/assets/BACKGROUNDMUSIC.mp3":
/*!****************************************!*\
  !*** ./src/assets/BACKGROUNDMUSIC.mp3 ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "sounds/BACKGROUNDMUSICf4dd82c65d32ddeb10d4925825d1b564mp3");

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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "sounds/PEWPEWdf05f1595b9cdb762f1065937663a818mp3");

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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "sounds/POWERUP881df9d05db5ceb45921451e2b814a5fmp3");

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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "sounds/TAKINGDAMAGE8899323fe56e1135f2f3a66623387936mp3");

/***/ }),

/***/ "./src/styles/index.css":
/*!******************************!*\
  !*** ./src/styles/index.css ***!
  \******************************/
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
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./index.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles/index.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());
options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


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
/******/ 		scriptUrl = scriptUrl.replace(/^blob:/, "").replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
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
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_index_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../styles/index.css */ "./src/styles/index.css");
/* harmony import */ var _assets_BACKGROUNDMUSIC_mp3__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../assets/BACKGROUNDMUSIC.mp3 */ "./src/assets/BACKGROUNDMUSIC.mp3");
/* harmony import */ var _assets_PEWPEW_mp3__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../assets/PEWPEW.mp3 */ "./src/assets/PEWPEW.mp3");
/* harmony import */ var _assets_TAKINGDAMAGE_mp3__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../assets/TAKINGDAMAGE.mp3 */ "./src/assets/TAKINGDAMAGE.mp3");
/* harmony import */ var _assets_POWERUP_mp3__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../assets/POWERUP.mp3 */ "./src/assets/POWERUP.mp3");






// Get canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions to fill the window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Create Audio objects for sounds
const pewSound = new Audio(_assets_PEWPEW_mp3__WEBPACK_IMPORTED_MODULE_2__["default"]);
const powerupSound = new Audio(_assets_POWERUP_mp3__WEBPACK_IMPORTED_MODULE_4__["default"]);
const backgroundMusic = new Audio(_assets_BACKGROUNDMUSIC_mp3__WEBPACK_IMPORTED_MODULE_1__["default"]);
backgroundMusic.loop = true;
const takingDamageSound = new Audio(_assets_TAKINGDAMAGE_mp3__WEBPACK_IMPORTED_MODULE_3__["default"]);

// Global game variables
let ship, asteroids = [], bullets = [], particles = [], powerUps = [];
let score = 0, scoreMultiplier = 1, gameOver = false;
let lastAsteroidSpawnTime = Date.now();

// Utility function for random numbers
function randomRange(min, max) {
  return Math.random() * (max - min) + min;
}

// Helper function to compute distance between two points
function distance(x1, y1, x2, y2) {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

// Particle class for explosion, smoke, and bullet trails
class Particle {
  constructor(x, y, radius, color = 'white') {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    const angle = randomRange(0, Math.PI * 2);
    const speed = randomRange(1, 3);
    this.vel = {
      x: Math.cos(angle) * speed,
      y: Math.sin(angle) * speed
    };
    this.life = 0;
    this.maxLife = randomRange(30, 50);
  }
  
  update() {
    this.x += this.vel.x;
    this.y += this.vel.y;
    this.life++;
  }
  
  draw() {
    ctx.save();
    const alpha = 1 - (this.life / this.maxLife);
    ctx.globalAlpha = alpha;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

// Function to create an explosion of particles at (x, y)
function createExplosion(x, y, asteroidRadius) {
  const count = Math.floor(randomRange(8, 12)) + Math.floor(asteroidRadius / 10);
  for (let i = 0; i < count; i++) {
    const particleSize = randomRange(1, 3);
    particles.push(new Particle(x, y, particleSize));
  }
}

// PowerUp class definition (four types)
class PowerUp {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type; // 'multi', 'bulletSpeed', 'penetration', or 'reloadSpeed'
    this.radius = 10;
    switch(this.type) {
      case 'multi':
        this.color = 'cyan';
        break;
      case 'bulletSpeed':
        this.color = 'purple';
        break;
      case 'penetration':
        this.color = 'magenta';
        break;
      case 'reloadSpeed':
        this.color = 'pink';
        break;
      default:
        this.color = 'white';
    }
    // Initially, power-ups remain stationary
    this.vel = { x: 0, y: 0 };
  }
  
  update() {
    // If the ship is within 100px, magnetize toward it
    if(distance(ship.x, ship.y, this.x, this.y) < 100) {
      let angle = Math.atan2(ship.y - this.y, ship.x - this.x);
      let magnetSpeed = 5;
      this.vel.x = Math.cos(angle) * magnetSpeed;
      this.vel.y = Math.sin(angle) * magnetSpeed;
    } else {
      this.vel.x = 0;
      this.vel.y = 0;
    }
    this.x += this.vel.x;
    this.y += this.vel.y;
  }
  
  draw() {
    ctx.save();
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    ctx.fillStyle = 'black';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    let text = '';
    switch(this.type) {
      case 'multi':
        text = 'M';
        break;
      case 'bulletSpeed':
        text = 'B';
        break;
      case 'penetration':
        text = 'P';
        break;
      case 'reloadSpeed':
        text = 'R';
        break;
    }
    ctx.fillText(text, this.x, this.y);
  }
}

// Ship class definition
class Ship {
  constructor() {
    this.x = canvas.width / 2;
    this.y = canvas.height / 2;
    this.radius = 15;
    this.angle = 0;
    this.rotation = 0;
    this.thrusting = false;
    this.vel = { x: 0, y: 0 };
    this.friction = 0.99;
    this.acceleration = 0.15;
    this.maxSpeed = 5;
    // New property for bullet speed
    this.bulletSpeed = 5;
    // Power-up properties
    this.bulletCount = 1;
    this.bulletPenetration = 0;
    // Lower initial attack speed (fire rate in ms)
    this.fireRate = 500;
    this.lastShot = 0;
  }

  update() {
    this.angle += this.rotation;
    if (this.thrusting) {
      this.vel.x += Math.cos(this.angle) * this.acceleration;
      this.vel.y += Math.sin(this.angle) * this.acceleration;
    } else {
      this.vel.x *= this.friction;
      this.vel.y *= this.friction;
    }
    let speed = Math.sqrt(this.vel.x ** 2 + this.vel.y ** 2);
    if (speed > this.maxSpeed) {
      this.vel.x = (this.vel.x / speed) * this.maxSpeed;
      this.vel.y = (this.vel.y / speed) * this.maxSpeed;
    }
    this.x += this.vel.x;
    this.y += this.vel.y;
    if (this.x < 0) this.x = canvas.width;
    if (this.x > canvas.width) this.x = 0;
    if (this.y < 0) this.y = canvas.height;
    if (this.y > canvas.height) this.y = canvas.height;
  }

  draw() {
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.beginPath();
    const angle = this.angle;
    const tipX = this.x + Math.cos(angle) * this.radius;
    const tipY = this.y + Math.sin(angle) * this.radius;
    ctx.moveTo(tipX, tipY);
    ctx.lineTo(
      this.x + Math.cos(angle + Math.PI * 2 / 3) * this.radius,
      this.y + Math.sin(angle + Math.PI * 2 / 3) * this.radius
    );
    ctx.lineTo(
      this.x + Math.cos(angle + Math.PI * 4 / 3) * this.radius,
      this.y + Math.sin(angle + Math.PI * 4 / 3) * this.radius
    );
    ctx.closePath();
    ctx.stroke();
  
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(tipX, tipY, 3, 0, Math.PI * 2);
    ctx.fill();
  
    if (this.thrusting) {
      ctx.fillStyle = 'orange';
      ctx.beginPath();
      const flameLength = this.radius + 10 + Math.random() * 10;
      const flameTipX = this.x - Math.cos(angle) * flameLength;
      const flameTipY = this.y - Math.sin(angle) * flameLength;
      const baseLeftX = this.x + Math.cos(angle + Math.PI * 2 / 3) * (this.radius * 0.5);
      const baseLeftY = this.y + Math.sin(angle + Math.PI * 2 / 3) * (this.radius * 0.5);
      const baseRightX = this.x + Math.cos(angle + Math.PI * 4 / 3) * (this.radius * 0.5);
      const baseRightY = this.y + Math.sin(angle + Math.PI * 4 / 3) * (this.radius * 0.5);
      
      ctx.moveTo(baseLeftX, baseLeftY);
      ctx.lineTo(baseRightX, baseRightY);
      ctx.lineTo(flameTipX, flameTipY);
      ctx.closePath();
      ctx.fill();
    }
  }  
}

// Asteroid class definition (splits only once)
class Asteroid {
  constructor(x, y, radius, canSplit = true) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.canSplit = canSplit;
    let dx = ship.x - this.x;
    let dy = ship.y - this.y;
    let baseAngle = Math.atan2(dy, dx);
    let angle = baseAngle + randomRange(-0.2, 0.2);
    let speed = randomRange(1.5, 2.5);
    this.vel = {
      x: Math.cos(angle) * speed,
      y: Math.sin(angle) * speed
    };
    this.offsets = [];
    const points = Math.floor(randomRange(7, 12));
    for (let i = 0; i < points; i++) {
      this.offsets.push(randomRange(-this.radius * 0.4, this.radius * 0.4));
    }
  }

  update() {
    this.x += this.vel.x;
    this.y += this.vel.y;
    if (this.x < 0) this.x = canvas.width;
    if (this.x > canvas.width) this.x = 0;
    if (this.y < 0) this.y = canvas.height;
    if (this.y > canvas.height) this.y = canvas.height;
  }

  draw() {
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.beginPath();
    const points = this.offsets.length;
    for (let i = 0; i < points; i++) {
      const angle = (i / points) * Math.PI * 2;
      const r = this.radius + this.offsets[i];
      const x = this.x + Math.cos(angle) * r;
      const y = this.y + Math.sin(angle) * r;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.stroke();
  }
}

// Bullet class definition
class Bullet {
  constructor(x, y, angle) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.speed = ship.bulletSpeed;
    this.radius = 2;
    this.vel = {
      x: Math.cos(angle) * this.speed,
      y: Math.sin(angle) * this.speed
    };
    this.penetration = ship.bulletPenetration;
  }

  update() {
    this.x += this.vel.x;
    this.y += this.vel.y;
    let trail = new Particle(this.x, this.y, randomRange(0.5, 1.5), 'white');
    trail.vel.x = 0;
    trail.vel.y = 0;
    trail.maxLife = 20;
    particles.push(trail);
  }

  draw() {
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Keyboard input handling
const keys = {};
document.addEventListener('keydown', function(e) {
  keys[e.key] = true;
  if (["ArrowLeft", "ArrowRight", "ArrowUp", " "].includes(e.key)) {
    e.preventDefault();
  }
});
document.addEventListener('keyup', function(e) {
  keys[e.key] = false;
});

// Function to spawn a single asteroid at a random edge
function spawnAsteroid() {
  let x, y;
  if (Math.random() < 0.5) {
    x = Math.random() < 0.5 ? 0 : canvas.width;
    y = randomRange(0, canvas.height);
  } else {
    x = randomRange(0, canvas.width);
    y = Math.random() < 0.5 ? 0 : canvas.height;
  }
  asteroids.push(new Asteroid(x, y, randomRange(30, 50)));
}

// Power-up drop chance when an asteroid is destroyed
function dropPowerUp(x, y) {
  if (Math.random() < 0.4) {
    let types = ['multi', 'bulletSpeed', 'penetration', 'reloadSpeed'];
    let type = types[Math.floor(randomRange(0, types.length))];
    powerUps.push(new PowerUp(x, y, type));
  }
}

// Initialize game state
function init() {
  ship = new Ship();
  ship.bulletCount = 1;
  ship.bulletPenetration = 0;
  ship.bulletSpeed = 5;
  
  bullets = [];
  asteroids = [];
  particles = [];
  powerUps = [];
  score = 0;
  scoreMultiplier = 1;
  gameOver = false;
  
  for (let i = 0; i < 3; i++) {
    spawnAsteroid();
  }
  lastAsteroidSpawnTime = Date.now();
}

// Update game objects
function update() {
  if (gameOver) return;
  
  // Ship rotation and thrust control
  if (keys['ArrowLeft']) {
    ship.rotation = -0.07;
  } else if (keys['ArrowRight']) {
    ship.rotation = 0.07;
  } else {
    ship.rotation = 0;
  }
  ship.thrusting = keys['ArrowUp'];
  ship.update();
  
  // Update power-ups and check for pickup
  for (let i = powerUps.length - 1; i >= 0; i--) {
    let pu = powerUps[i];
    pu.update();
    if (distance(ship.x, ship.y, pu.x, pu.y) < ship.radius + pu.radius) {
      switch(pu.type) {
        case 'multi':
          ship.bulletCount++;
          break;
        case 'bulletSpeed':
          ship.bulletSpeed = Math.min(ship.bulletSpeed + 2, 12);
          break;
        case 'penetration':
          ship.bulletPenetration++;
          break;
        case 'reloadSpeed':
          ship.fireRate = Math.max(ship.fireRate - 50, 100);
          break;
      }
      powerupSound.currentTime = 0;
      powerupSound.play();
      powerUps.splice(i, 1);
    }
  }
  
  // Spawn an orange smoke particle trail when thrusting
  if (ship.thrusting) {
    const rearX = ship.x - Math.cos(ship.angle) * ship.radius;
    const rearY = ship.y - Math.sin(ship.angle) * ship.radius;
    let smoke = new Particle(rearX, rearY, randomRange(1, 2), 'orange');
    smoke.vel.x = randomRange(-0.5, 0.5);
    smoke.vel.y = randomRange(-0.5, 0.5);
    particles.push(smoke);
  }
  
  // Shooting bullets with cooldown
  if (keys[' ']) {
    const now = Date.now();
    if (now - ship.lastShot > ship.fireRate) {
      let baseAngle = ship.angle;
      let spread = 0.1;
      let count = ship.bulletCount;
      for (let i = 0; i < count; i++) {
        let offset = (i - (count - 1) / 2) * spread;
        let bullet = new Bullet(
          ship.x + Math.cos(ship.angle) * ship.radius,
          ship.y + Math.sin(ship.angle) * ship.radius,
          ship.angle + offset
        );
        bullet.penetration = ship.bulletPenetration;
        bullets.push(bullet);
      }
      ship.lastShot = now;
      pewSound.currentTime = 0;
      pewSound.play();
    }
  }
  
  // Update bullets and remove off-screen ones
  for (let i = bullets.length - 1; i >= 0; i--) {
    bullets[i].update();
    if (
      bullets[i].x < 0 || bullets[i].x > canvas.width ||
      bullets[i].y < 0 || bullets[i].y > canvas.height
    ) {
      bullets.splice(i, 1);
    }
  }
  
  // Update asteroids
  asteroids.forEach(asteroid => asteroid.update());
  
  // Dynamic asteroid spawn: adjust interval as score increases
  let nowTime = Date.now();
  let spawnInterval = Math.min(1500 / ((score / 100) + 1), 1500);
  if (nowTime - lastAsteroidSpawnTime > spawnInterval) {
    spawnAsteroid();
    lastAsteroidSpawnTime = nowTime;
  }
  
  // Collision detection: Bullets vs. Asteroids
  for (let i = asteroids.length - 1; i >= 0; i--) {
    const a = asteroids[i];
    for (let j = bullets.length - 1; j >= 0; j--) {
      const b = bullets[j];
      if (distance(a.x, a.y, b.x, b.y) < a.radius) {
        if (b.penetration > 0) {
          b.penetration--;
        } else {
          bullets.splice(j, 1);
        }
        createExplosion(a.x, a.y, a.radius);
        dropPowerUp(a.x, a.y);
        // Play TAKINGDAMAGE sound when an asteroid is destroyed
        takingDamageSound.currentTime = 0;
        takingDamageSound.play();
        if (a.radius > 20 && a.canSplit) {
          let newRadius = a.radius / 2;
          let frag1 = new Asteroid(a.x, a.y, newRadius, false);
          let frag2 = new Asteroid(a.x, a.y, newRadius, false);
          let baseAngle = Math.atan2(a.vel.y, a.vel.x);
          let angle1 = baseAngle + randomRange(-0.5, 0.5);
          let angle2 = baseAngle + randomRange(-0.5, 0.5);
          let speed = Math.sqrt(a.vel.x ** 2 + a.vel.y ** 2);
          frag1.vel = { x: Math.cos(angle1) * speed, y: Math.sin(angle1) * speed };
          frag2.vel = { x: Math.cos(angle2) * speed, y: Math.sin(angle2) * speed };
          asteroids.push(frag1, frag2);
        }
        asteroids.splice(i, 1);
        score += 10 * scoreMultiplier;
        break;
      }
    }
  }
  
  // Collision detection: Ship vs. Asteroids
  for (let i = 0; i < asteroids.length; i++) {
    const a = asteroids[i];
    if (distance(ship.x, ship.y, a.x, a.y) < ship.radius + a.radius) {
      gameOver = true;
    }
  }
  
  // Update particles; remove expired ones
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    if (particles[i].life > particles[i].maxLife) {
      particles.splice(i, 1);
    }
  }
}

// Draw game objects and HUD
function draw() {
  // Overlay a semi-transparent black rectangle
  ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  ship.draw();
  bullets.forEach(bullet => bullet.draw());
  asteroids.forEach(asteroid => asteroid.draw());
  particles.forEach(particle => particle.draw());
  powerUps.forEach(pu => pu.draw());
  
  // Draw HUD fixed at the top left of the screen
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillStyle = 'white';
  ctx.font = '20px Arial';
  ctx.fillText('Score: ' + Math.floor(score), 20, 20);
  
  if (gameOver) {
    document.getElementById('gameOverMenu').style.zIndex = 2;
  } else {
    document.getElementById('gameOverMenu').style.zIndex = "none";
  }
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

window.addEventListener('resize', function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// When the Start button is clicked, hide the menu, start background music, and start the game.
const startButton = document.getElementById('startButton');
startButton.addEventListener('click', () => {
    document.getElementById('menu').style.display = 'none';
    backgroundMusic.play();
    init();
    loop();
});

// When the Restart button is clicked, reload the page.
const restartButton = document.getElementById('restartButton');
restartButton.addEventListener('click', () => {
    window.location.reload();
});

})();

/******/ })()
;
//# sourceMappingURL=index8dbd68c13d966a4efa95.js.map