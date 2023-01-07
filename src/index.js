const Geometry = require('./Geometry');
const FourierSeries = require('./FourierSeries');
const Animations = require('./Animations');

function createContext(canvasId, width, height, options) {
  const canvasDom = document.getElementById(canvasId);
  canvasDom.width = width;
  canvasDom.height = height;
  return canvasDom.getContext('2d', options);
}

const main = (async () => {

  const [width, height] = [600, 600];
  
  const permanentCtx = createContext('permanent-canvas', width, height, { alpha: false });
  const temporaryCtx = createContext('temporary-canvas', width, height, { alpha: true });
  temporaryCtx.globalCompositeOperation = 'copy';
  
  permanentCtx.fillStyle = '#FFF';
  permanentCtx.fillRect(0, 0, width, height);
  permanentCtx.fillStyle = '#F00';

  temporaryCtx.fillStyle = '#0000';
  temporaryCtx.fillRect(0, 0, width, height);

  var linesData = [[4, 4, 200, 200], [200, 200, 280, 160], [280, 160, 4, 4]];
  linesData = linesData.map(arr => arr.map(el => el * 2))

  const lines = linesData.map(data => new Geometry.Vector(data[0], data[1], data[2], data[3]));

  for (const line of lines) {
    permanentCtx.beginPath();
    permanentCtx.moveTo(line.x1, line.y1);
    permanentCtx.lineTo(line.x2, line.y2);
    permanentCtx.stroke();
  }
  
  const vectors = FourierSeries.computeApproximation(lines, 1000, 5, width / 2, height / 2);
  
  Animations.animateVectorsOnCanvas(permanentCtx, temporaryCtx, vectors, width / 2, height / 2, 500, 50);

})();