const Geometry = require('./Geometry');
const FImage = require('./FImage');
const Canvas = require('./Canvas');
const Animations = require('./Animations');

const main = (async () => {

  const dom = {
    animationCanvas: document.getElementById('animation-canvas')
  }

  const size = [500, 500];

  const canvas = new Canvas(size, dom.animationCanvas);

  // const linesData = [[4, 4, 200, 200], [200, 200, 280, 160], [280, 160, 4, 4]];

  // const lines = linesData.map(data => new Geometry.Segment(data[0], data[1], data[2], data[3]));

  // const image = new FImage(size, lines);

  // for (const sample of image.samples) {
  //   canvas.ctx.fillRect(sample[0], sample[1], 1, 1);
  // }
  
  const rng = (min, max) => Math.floor(Math.random() * (max - min)) + min;

  const vectorData = [[50, 1.1], [50, -1.7], [50, 2.2], [50, -2.7]];
  const vectors = vectorData.map(data => new Geometry.RotatingVector(data[0], data[1]));
  canvas.save();

})();