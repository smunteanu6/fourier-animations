/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Animations.js":
/*!***************************!*\
  !*** ./src/Animations.js ***!
  \***************************/
/***/ ((module) => {

eval("function render(permanentCtx, temporaryCtx, vectors, posX, posY, t) {\r\n  temporaryCtx.strokeStyle = '#0000';\r\n  temporaryCtx.stroke();\r\n  temporaryCtx.beginPath();\r\n  temporaryCtx.moveTo(posX, posY);\r\n  for (const vector of vectors) {\r\n    const add = vector.eval(t * 2 * Math.PI);\r\n    temporaryCtx.lineTo(posX += add.u, posY += add.v);\r\n  }\r\n  permanentCtx.fillRect(posX - 1, posY - 1, 2, 2);\r\n  temporaryCtx.strokeStyle = '#000F';\r\n  temporaryCtx.stroke();\r\n}\r\n\r\nfunction animateVectorsOnCanvas(permanentCtx, temporaryCtx, vectors, posX, posY, precision = 50, intervalLength = 100) {\r\n  var t = 0;\r\n  setInterval(() => render(permanentCtx, temporaryCtx, vectors, posX, posY, t++ / precision), intervalLength);\r\n}\r\n\r\nmodule.exports = {\r\n  animateVectorsOnCanvas,\r\n  render\r\n}\n\n//# sourceURL=webpack://fourier-animations/./src/Animations.js?");

/***/ }),

/***/ "./src/FourierSeries.js":
/*!******************************!*\
  !*** ./src/FourierSeries.js ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const { RotatingVector } = __webpack_require__(/*! ./Geometry */ \"./src/Geometry.js\");\r\n\r\nfunction validateDrawing(lines) {\r\n  for (const ix in lines) {\r\n    const a = lines[ix], b = lines[(ix + 1) % lines.length];\r\n    if (!(a.x2 === b.x1 && a.y2 === b.y1)) throw new Error('Image formed is not a continuous line');\r\n  }\r\n}\r\n\r\nfunction getSamples(lines, count) {\r\n  const totalLength = lines.reduce((total, current) => total + current.length, 0);\r\n  count ||= Math.ceil(totalLength);\r\n  const samples = new Array(count);\r\n  const gap = totalLength / count;\r\n  var index = 0;\r\n  var sampleDistance = gap;\r\n  var segmentDistance = 0;\r\n  for (const line of lines) {\r\n    if (index === count) break;\r\n    segmentDistance = 0;\r\n    while (segmentDistance + (gap - sampleDistance) <= line.length) {\r\n      segmentDistance += gap - sampleDistance;\r\n      samples[index] = line.atDistance(segmentDistance);\r\n      sampleDistance = 0;\r\n      if (++index === count) break;\r\n    }\r\n    sampleDistance += line.length - segmentDistance;\r\n  }\r\n  return samples;\r\n}\r\n\r\nfunction getAverage(samples, f) {\r\n  const total = [0, 0];\r\n  samples.forEach((sample, sampleIndex) => {\r\n    const t = sampleIndex / samples.length;\r\n    const rotation = new RotatingVector(...sample, -f).eval(t * Math.PI * 2);\r\n    total[0] += rotation.u / samples.length;\r\n    total[1] += rotation.v / samples.length;\r\n  });\r\n  return total;\r\n}\r\n\r\nfunction computeVectors(samples, precision) {\r\n  return [...Array(precision * 2 + 1)].map((value, index) => {\r\n    const f = (index % 2 == 1 ? (index + 1) / 2 :- (index) / 2);\r\n    return new RotatingVector(...getAverage(samples, f), f);\r\n  });\r\n}\r\n\r\nfunction computeApproximation(lines, samplesCount, precision, startX = 0, startY = 0) {\r\n  validateDrawing(lines);\r\n  const samples = getSamples(lines, samplesCount);\r\n  samples.forEach(sample => { sample[0] -= startX; sample[1] -= startY; });\r\n  return computeVectors(samples, precision);\r\n}\r\n\r\nmodule.exports = {\r\n  computeApproximation\r\n}\n\n//# sourceURL=webpack://fourier-animations/./src/FourierSeries.js?");

/***/ }),

/***/ "./src/Geometry.js":
/*!*************************!*\
  !*** ./src/Geometry.js ***!
  \*************************/
/***/ ((module) => {

eval("\r\nclass Vector {\r\n  \r\n  constructor (x1, y1, x2, y2) {\r\n    this.x1 = x1;\r\n    this.y1 = y1;\r\n    this.x2 = x2;\r\n    this.y2 = y2;\r\n    this.m = (y1 - y2) / (x1 - x2);\r\n    this.b = y1 - x1 * this.m;\r\n    this.length = Math.sqrt((this.x1 - this.x2) ** 2 + (this.y1 - this.y2) ** 2);\r\n  }\r\n\r\n  // The point at distance d from (x1, y1), directed to (x2, y2)\r\n  atDistance(d) {\r\n    if (this.x1 == this.x2) return [this.x1, this.y1 + (this.y1 < this.y2 ? d : -d)];\r\n    // w = change in x, h = change in y\r\n    // w^2+h^2=d^2   =>   w^2+(mw)^2-d^2   =   (m^2+1)*w^2-d^2   =   0\r\n    // To solve for w: a = m^2+1, b = 0, c = -d^2\r\n    // In this case, w = (-b+sqrt(b^2-4ac))/2a   =   sqrt(-4ac)/2a   =   sqrt(4ad^2)/2a   =   2d*sqrt(a)/2a   =   d/sqrt(a) =   d/sqrt(m^2+1)\r\n    const x = this.x1 + (d / Math.sqrt(this.m * this.m + 1)) * (this.x1 < this.x2 ? 1 : -1);\r\n    return [x, this.eval(x)];\r\n  }\r\n\r\n  eval(x) {\r\n    return this.m * x + this.b;\r\n  }\r\n\r\n}\r\n\r\nclass RotatingVector {\r\n\r\n  constructor (u, v, f) {\r\n    this.u = u;\r\n    this.v = v;\r\n    this.f = f;\r\n  }\r\n\r\n  eval(t) {\r\n    const cost = Math.cos(t * this.f);\r\n    const sint = Math.sin(t * this.f);\r\n    return new RotatingVector(this.u * cost - this.v * sint, this.u * sint + this.v * cost, this.f);\r\n  }\r\n\r\n}\r\n\r\nmodule.exports = {\r\n  Vector,\r\n  RotatingVector\r\n}\n\n//# sourceURL=webpack://fourier-animations/./src/Geometry.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const Geometry = __webpack_require__(/*! ./Geometry */ \"./src/Geometry.js\");\r\nconst FourierSeries = __webpack_require__(/*! ./FourierSeries */ \"./src/FourierSeries.js\");\r\nconst Animations = __webpack_require__(/*! ./Animations */ \"./src/Animations.js\");\r\n\r\nfunction createContext(canvasId, width, height, options) {\r\n  const canvasDom = document.getElementById(canvasId);\r\n  canvasDom.width = width;\r\n  canvasDom.height = height;\r\n  return canvasDom.getContext('2d', options);\r\n}\r\n\r\nconst main = (async () => {\r\n\r\n  const [width, height] = [600, 600];\r\n  \r\n  const permanentCtx = createContext('permanent-canvas', width, height, { alpha: false });\r\n  const temporaryCtx = createContext('temporary-canvas', width, height, { alpha: true });\r\n  temporaryCtx.globalCompositeOperation = 'copy';\r\n  \r\n  permanentCtx.fillStyle = '#FFF';\r\n  permanentCtx.fillRect(0, 0, width, height);\r\n  permanentCtx.fillStyle = '#F00';\r\n\r\n  temporaryCtx.fillStyle = '#0000';\r\n  temporaryCtx.fillRect(0, 0, width, height);\r\n\r\n  var linesData = [[4, 4, 200, 200], [200, 200, 280, 160], [280, 160, 4, 4]];\r\n  linesData = linesData.map(arr => arr.map(el => el * 2))\r\n\r\n  const lines = linesData.map(data => new Geometry.Vector(data[0], data[1], data[2], data[3]));\r\n\r\n  for (const line of lines) {\r\n    permanentCtx.beginPath();\r\n    permanentCtx.moveTo(line.x1, line.y1);\r\n    permanentCtx.lineTo(line.x2, line.y2);\r\n    permanentCtx.stroke();\r\n  }\r\n  \r\n  const vectors = FourierSeries.computeApproximation(lines, 1000, 5, width / 2, height / 2);\r\n  \r\n  Animations.animateVectorsOnCanvas(permanentCtx, temporaryCtx, vectors, width / 2, height / 2, 500, 50);\r\n\r\n})();\n\n//# sourceURL=webpack://fourier-animations/./src/index.js?");

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
/******/ 			// no module.id needed
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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;