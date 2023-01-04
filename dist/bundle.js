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

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("class Line {\r\n  \r\n  constructor (x1, y1, x2, y2) {\r\n    this.x1 = x1;\r\n    this.y1 = y1;\r\n    this.x2 = x2;\r\n    this.y2 = y2;\r\n    this.m = (y1 - y2) / (x1 - x2);\r\n    this.b = y1 - x1 * this.m;\r\n    this.length = Math.sqrt((this.x1 - this.x2) ** 2 + (this.y1 - this.y2) ** 2);\r\n  }\r\n\r\n  // The point at distance d from (x1, y1), directed to (x2, y2)\r\n  atDistance(d) {\r\n    if (this.x1 == this.x2) return [this.x1, this.y1 + (this.y1 < this.y2 ? d : -d)];\r\n    // w = change in x, h = change in y\r\n    // w^2+h^2=d^2   =>   w^2+(mw)^2-d^2   =   (m^2+1)*w^2-d^2   =   0\r\n    // To solve for w: a = m^2+1, b = 0, c = -d^2\r\n    // In this case, w = (-b+sqrt(b^2-4ac))/2a   =   sqrt(-4ac)/2a   =   sqrt(4ad^2)/2a   =   2d*sqrt(a)/2a   =   d/sqrt(a) =   d/sqrt(m^2+1)\r\n    const x = this.x1 + (d / Math.sqrt(this.m * this.m + 1)) * (this.x1 < this.x2 ? 1 : -1);\r\n    return [x, this.m * x + this.b];\r\n  }\r\n\r\n}\r\n\r\nclass fImage {\r\n\r\n  constructor ([width, height], lines, samplesCount, rotatingVectorsCount) {\r\n    this.width = width;\r\n    this.height = height;\r\n    this.center = [width / 2, height / 2];\r\n    this.#validateLines(lines);\r\n    this.samples = this.#createSamples(lines, samplesCount);\r\n    this.vactors = this.#computeVectors(this.samples, this.center, 2);\r\n  }\r\n\r\n  #validateLines(lines) {\r\n    const linesLength = lines.length;\r\n    for (var ix = 0; ix < linesLength; ix++) {\r\n      const next = (ix + 1) % linesLength;\r\n      if (lines[ix].x2 != lines[next].x1 || lines[ix].y2 != lines[next].y1) throw new Error('Image formed is not a continuous line');\r\n      if (0 > lines[ix].x1 || lines[ix].x1 >= this.width || 0 > lines[ix].y1 || lines[ix].y1 >= this.height) throw new Error ('Points aren\\'t contained within the image (coordinates out of bound)');\r\n    }\r\n  }\r\n  \r\n  #createSamples(lines, samplesCount) {\r\n    const totalLength = lines.reduce((total, current) => total + current.length, 0);\r\n    samplesCount ||= Math.ceil(totalLength);\r\n    const samples = new Array(samplesCount);\r\n    const gap = totalLength / samplesCount;\r\n    var computedSamples = 0, currentDistance = gap;\r\n    for (const line of lines) {\r\n      if (computedSamples === samplesCount) break;\r\n      var distance = 0;\r\n      while (distance + (gap - currentDistance) <= line.length) {\r\n        distance += gap - currentDistance; currentDistance = 0;\r\n        samples[computedSamples] = line.atDistance(distance);\r\n        if (++computedSamples === samplesCount) break;\r\n      }\r\n      currentDistance += line.length - distance;\r\n    }\r\n    return samples;\r\n  }\r\n\r\n  #getAverageVector(samples) {\r\n    const total = samples.reduce((total, point) => { total[0] += point[0]; total[1] += point[1]; return total; }, [0, 0]);\r\n    return total.map(coordinate => coordinate / samples.length);\r\n  }\r\n\r\n\r\n\r\n  #computeVectors(samples, initialPoint, rotatingVectorsCount) {\r\n    const baseVector = this.#getAverageVector(samples).map((coordinate, index) => coordinate - initialPoint[index]);\r\n    const positiveFrequency = new Array(rotatingVectorsCount);\r\n    const negativeFrequency = new Array(rotatingVectorsCount);\r\n    var currentIterationSamples = samples.map(point => [point[0] - baseVector[0], point[1] - baseVector[1]]);\r\n    for (var iteration = 0; iteration < rotatingVectorsCount; iteration++) {\r\n      positiveFrequency[iteration] = this.#getAverageVector(currentIterationSamples);\r\n      \r\n    }\r\n  }\r\n\r\n}\r\n\r\n\r\nclass fCanvas {\r\n\r\n  constructor ([width, height], canvasElement = new HTMLCanvasElement()) {\r\n    this.dom = canvasElement;\r\n    this.ctx = canvasElement.getContext('2d');\r\n    this.width = this.dom.width = width;\r\n    this.height = this.dom.height = height;\r\n  }\r\n\r\n  setWidth (width) {\r\n    this.width = width;\r\n    this.dom.style.width = width + 'px';\r\n  }\r\n\r\n  setHeight (height) {\r\n    this.height = height;\r\n    this.dom.style.height = height + 'px';\r\n  }\r\n\r\n  setDimensions (width, height) {\r\n    this.setWidth(width);\r\n    this.setHeight(height);\r\n  }\r\n\r\n}\r\n\r\nconst main = (async () => {\r\n  \r\n  const dom = {\r\n    animationCanvas: document.getElementById('animation-canvas')\r\n  }\r\n\r\n  const size = [300, 300];\r\n\r\n  const linesData = [[4, 4, 200, 200], [200, 200, 280, 160], [280, 160, 4, 4]];\r\n\r\n  const lines = linesData.map(data => new Line(data[0], data[1], data[2], data[3]));\r\n\r\n  const image = new fImage(size, lines);\r\n\r\n  const canvas = new fCanvas(size, dom.animationCanvas);\r\n\r\n  \r\n  for (const sample of image.samples) {\r\n    canvas.ctx.fillRect(sample[0], sample[1], 1, 1);\r\n  }\r\n  \r\n  canvas.ctx.fillStyle = 'red';\r\n  canvas.ctx.fillRect(149, 149, 3, 3);\r\n  canvas.ctx.fillRect(149 - 11.396, 149 - 47.07, 3, 3);\r\n\r\n})();\n\n//# sourceURL=webpack://fourier-animations/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;