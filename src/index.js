const Geometry = require('./Geometry');
const FImage = require('./FourierSeries');
const Animations = require('./Animations');

function createContext(canvasId, width, height, options) {
  const canvasDom = document.getElementById(canvasId);
  canvasDom.width = width;
  canvasDom.height = height;
  return canvasDom.getContext('2d', options);
}

const main = (async () => {

  const [width, height] = [500, 500];

  const permanentCtx = createContext('permanent-canvas', width, height, { alpha: false });
  const temporaryCtx = createContext('temporary-canvas', width, height, { alpha: true });
  temporaryCtx.globalCompositeOperation = 'copy';
  
  permanentCtx.fillStyle = '#FFF';
  permanentCtx.fillRect(0, 0, width, height);
  permanentCtx.fillStyle = '#000';

  temporaryCtx.fillStyle = '#0000';
  temporaryCtx.fillRect(0, 0, width, height);

  // const linesData = [[4, 4, 200, 200], [200, 200, 280, 160], [280, 160, 4, 4]];

  // const lines = linesData.map(data => new Geometry.Segment(data[0], data[1], data[2], data[3]));

  // const image = new FImage(size, lines);

  // for (const sample of image.samples) {
  //   canvas.ctx.fillRect(sample[0], sample[1], 1, 1);
  // }
  
  const rng = (min, max) => Math.floor(Math.random() * (max - min)) + min;

  const vectorData = [[100, 3], [30, 17]];
  const vectors = vectorData.map(data => new Geometry.RotatingVector(data[0], data[1]));

  // Animations.animateVectorsOnCanvas(permanentCtx, temporaryCtx, vectors, width / 2, height / 2, 80, 20);

})();