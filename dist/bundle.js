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
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\r\nconst Geometry = __webpack_require__(/*! ./Geometry */ \"./src/Geometry.js\");\r\n\r\nfunction render(canvas, vectors, position, t) {\r\n  canvas.ctx.beginPath();\r\n  canvas.ctx.moveTo(...position);\r\n  for (const vector of vectors) {\r\n    position[0] += Math.cos(t * vector.frequency) * vector.magnitude;\r\n    position[1] += Math.sin(t * vector.frequency) * vector.magnitude;\r\n    canvas.ctx.lineTo(...position);\r\n  }\r\n  canvas.drawPoint(...position, 2);\r\n  canvas.reload();\r\n  canvas.ctx.stroke();\r\n}\r\n\r\nfunction animateVectorsOnCanvas(canvas, vectors, precision) {\r\n  \r\n}\r\n\r\nmodule.exports = {\r\n  animateVectorsOnCanvas,\r\n  render\r\n}\n\n//# sourceURL=webpack://fourier-animations/./src/Animations.js?");

/***/ }),

/***/ "./src/Canvas.js":
/*!***********************!*\
  !*** ./src/Canvas.js ***!
  \***********************/
/***/ ((module) => {

eval("\r\n\r\n\r\nmodule.exports = class {\r\n\r\n  constructor ([width, height], canvasElement = new HTMLCanvasElement()) {\r\n    this.dom = canvasElement;\r\n    this.width = this.dom.width = width;\r\n    this.height = this.dom.height = height;\r\n    this.ctx = canvasElement.getContext('2d', { alpha: false, willReadFrequently: true });\r\n    this.permanentImageData = new Uint8ClampedArray(width * height * 4).fill(255);\r\n    this.ctx.putImageData(new ImageData(this.permanentImageData, width, height), 0, 0);\r\n\r\n    function* gen() {\r\n      let i = 0;\r\n      while (true) {\r\n        yield[0,180,0];\r\n        continue;\r\n        yield[Math.sin(i/1000 + 0) * 127 + 128,\r\n        Math.sin(i/1000+ 2) * 127 + 128,\r\n        Math.sin(i/1000 + 4) * 127 + 128];\r\n          i++;\r\n      }\r\n    }\r\n    this.generator = gen();\r\n\r\n  }\r\n\r\n  reload() {\r\n    this.ctx.putImageData(new ImageData(this.permanentImageData, this.width, this.height), 0, 0);\r\n  }\r\n\r\n  save() {\r\n    this.permanentImageData = this.ctx.getImageData(0, 0, this.width, this.height).data;\r\n  }\r\n\r\n  drawPoint(x, y, r) {\r\n\r\n\r\n    const x1 = Math.max(Math.round(x) - r + 1, 0), x2 = Math.min(Math.round(x) + r - 1, this.width);\r\n    const y1 = Math.max(Math.round(y) - r + 1, 0), y2 = Math.min(Math.round(y) + r - 1, this.height);\r\n    for (var i = y1; i <= y2; i++) {\r\n      for (var j = x1; j <= x2; j++) {\r\n        const p = (i * this.width + j) * 4;\r\n        const col = this.generator.next().value;\r\n        for (var k = 0; k < 3; k++) this.permanentImageData[p + k] = col[k];\r\n      }\r\n    }\r\n  }\r\n\r\n  drawLine(x1, y1, x2, y2) {\r\n    this.ctx.beginPath();\r\n    this.ctx.moveTo(x1, y1);\r\n    this.ctx.lineTo(x2, y2);\r\n    this.ctx.stroke();\r\n  }\r\n\r\n  setWidth (width) {\r\n    this.width = width;\r\n    this.dom.style.width = width + 'px';\r\n  }\r\n\r\n  setHeight (height) {\r\n    this.height = height;\r\n    this.dom.style.height = height + 'px';\r\n  }\r\n\r\n  setDimensions (width, height) {\r\n    this.setWidth(width);\r\n    this.setHeight(height);\r\n  }\r\n\r\n}\r\n\r\n\n\n//# sourceURL=webpack://fourier-animations/./src/Canvas.js?");

/***/ }),

/***/ "./src/FImage.js":
/*!***********************!*\
  !*** ./src/FImage.js ***!
  \***********************/
/***/ ((module) => {

eval("\r\nmodule.exports = class {\r\n\r\n  constructor ([width, height], lines, samplesCount, rotatingVectorsCount, precision) {\r\n    this.width = width;\r\n    this.height = height;\r\n    this.center = [width / 2, height / 2];\r\n    this.#validateLines(lines);\r\n    this.samples = this.#createSamples(lines, samplesCount);\r\n    // this.vectors = this.#computeVectors(this.samples, this.center, 2, rotatingVectorsCount, precision);\r\n  }\r\n\r\n  #validateLines(lines) {\r\n    const linesLength = lines.length;\r\n    for (var ix = 0; ix < linesLength; ix++) {\r\n      const next = (ix + 1) % linesLength;\r\n      if (lines[ix].x2 != lines[next].x1 || lines[ix].y2 != lines[next].y1) throw new Error('Image formed is not a continuous line');\r\n      if (0 > lines[ix].x1 || lines[ix].x1 >= this.width || 0 > lines[ix].y1 || lines[ix].y1 >= this.height) throw new Error ('Points aren\\'t contained within the image (coordinates out of bound)');\r\n    }\r\n  }\r\n  \r\n  #createSamples(lines, samplesCount) {\r\n    const totalLength = lines.reduce((total, current) => total + current.length, 0);\r\n    samplesCount ||= Math.ceil(totalLength);\r\n    const samples = new Array(samplesCount);\r\n    const gap = totalLength / samplesCount;\r\n    var computedSamples = 0, currentDistance = gap;\r\n    for (const line of lines) {\r\n      if (computedSamples === samplesCount) break;\r\n      var distance = 0;\r\n      while (distance + (gap - currentDistance) <= line.length) {\r\n        distance += gap - currentDistance; currentDistance = 0;\r\n        samples[computedSamples] = line.atDistance(distance);\r\n        if (++computedSamples === samplesCount) break;\r\n      }\r\n      currentDistance += line.length - distance;\r\n    }\r\n    return samples;\r\n  }\r\n\r\n  #getAverageVector(samples) {\r\n    const total = samples.reduce((total, point) => { total[0] += point[0]; total[1] += point[1]; return total; }, [0, 0]);\r\n    return total.map(coordinate => coordinate / samples.length);\r\n  }\r\n\r\n  #computeVectors(samples, initialPoint, rotatingVectorsCount, precision) {\r\n    const vectors = new Array(rotatingVectorsCount * 2 + 1);\r\n    for (const ix in vectors) vectors[ix] = [0, ix % 2 == 1 ? (ix + 1) / 2 : -ix / 2];\r\n    const baseVector = this.#getAverageVector(samples).map((coordinate, index) => coordinate - initialPoint[index]);\r\n    const rotation = Math.PI * 2 / precision;\r\n    var currentIterationSamples = [...samples];\r\n    for (var iteration = 0; iteration < rotatingVectorsCount; iteration++) {\r\n      const vector = vectors[iteration];\r\n      \r\n    }\r\n  }\r\n\r\n}\n\n//# sourceURL=webpack://fourier-animations/./src/FImage.js?");

/***/ }),

/***/ "./src/Geometry.js":
/*!*************************!*\
  !*** ./src/Geometry.js ***!
  \*************************/
/***/ ((module) => {

eval("\r\nclass Segment {\r\n  \r\n  constructor (x1, y1, x2, y2) {\r\n    this.x1 = x1;\r\n    this.y1 = y1;\r\n    this.x2 = x2;\r\n    this.y2 = y2;\r\n    this.m = (y1 - y2) / (x1 - x2);\r\n    this.b = y1 - x1 * this.m;\r\n    this.length = Math.sqrt((this.x1 - this.x2) ** 2 + (this.y1 - this.y2) ** 2);\r\n  }\r\n\r\n  // The point at distance d from (x1, y1), directed to (x2, y2)\r\n  atDistance(d) {\r\n    if (this.x1 == this.x2) return [this.x1, this.y1 + (this.y1 < this.y2 ? d : -d)];\r\n    // w = change in x, h = change in y\r\n    // w^2+h^2=d^2   =>   w^2+(mw)^2-d^2   =   (m^2+1)*w^2-d^2   =   0\r\n    // To solve for w: a = m^2+1, b = 0, c = -d^2\r\n    // In this case, w = (-b+sqrt(b^2-4ac))/2a   =   sqrt(-4ac)/2a   =   sqrt(4ad^2)/2a   =   2d*sqrt(a)/2a   =   d/sqrt(a) =   d/sqrt(m^2+1)\r\n    const x = this.x1 + (d / Math.sqrt(this.m * this.m + 1)) * (this.x1 < this.x2 ? 1 : -1);\r\n    return [x, this.evalX(x)];\r\n  }\r\n\r\n  evalX(x) {\r\n    return this.m * x + this.b;\r\n  }\r\n\r\n}\r\n\r\nclass RotatingVector {\r\n\r\n  constructor (magnitude, frequency) {\r\n    this.magnitude = magnitude;\r\n    this.frequency = frequency;\r\n  }\r\n\r\n  evalT(t) {\r\n    return [Math.cos(this.frequency * t) * this.magnitude, Math.sin(this.frequency * t) * this.magnitude];\r\n  }\r\n\r\n}\r\n\r\nmodule.exports = {\r\n  Segment,\r\n  RotatingVector\r\n}\n\n//# sourceURL=webpack://fourier-animations/./src/Geometry.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const Geometry = __webpack_require__(/*! ./Geometry */ \"./src/Geometry.js\");\r\nconst FImage = __webpack_require__(/*! ./FImage */ \"./src/FImage.js\");\r\nconst Canvas = __webpack_require__(/*! ./Canvas */ \"./src/Canvas.js\");\r\nconst Animations = __webpack_require__(/*! ./Animations */ \"./src/Animations.js\");\r\n\r\nconst main = (async () => {\r\n\r\n  const dom = {\r\n    animationCanvas: document.getElementById('animation-canvas')\r\n  }\r\n\r\n  const size = [500, 500];\r\n\r\n  const canvas = new Canvas(size, dom.animationCanvas);\r\n\r\n  // const linesData = [[4, 4, 200, 200], [200, 200, 280, 160], [280, 160, 4, 4]];\r\n\r\n  // const lines = linesData.map(data => new Geometry.Segment(data[0], data[1], data[2], data[3]));\r\n\r\n  // const image = new FImage(size, lines);\r\n\r\n  // for (const sample of image.samples) {\r\n  //   canvas.ctx.fillRect(sample[0], sample[1], 1, 1);\r\n  // }\r\n  \r\n  const rng = (min, max) => Math.floor(Math.random() * (max - min)) + min;\r\n\r\n  const vectorData = [[50, 1.1], [50, -1.7], [50, 2.2], [50, -2.7]];\r\n  const vectors = vectorData.map(data => new Geometry.RotatingVector(data[0], data[1]));\r\n  canvas.save();\r\n\r\n})();\n\n//# sourceURL=webpack://fourier-animations/./src/index.js?");

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