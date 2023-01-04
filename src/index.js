const Geometry = require('./Geometry');
const FImage = require('./FImage');
const Canvas = require('./Canvas');
const Animations = require('./Animations');

const main = (async () => {
  
  const dom = {
    animationCanvas: document.getElementById('animation-canvas')
  }

  const size = [300, 300];

  const linesData = [[4, 4, 200, 200], [200, 200, 280, 160], [280, 160, 4, 4]];

  const lines = linesData.map(data => new Geometry.Segment(data[0], data[1], data[2], data[3]));

  const image = new FImage(size, lines);

  const canvas = new Canvas(size, dom.animationCanvas);

  for (const sample of image.samples) {
    canvas.ctx.fillRect(sample[0], sample[1], 1, 1);
  }
  
  canvas.ctx.fillStyle = 'red';
  canvas.ctx.fillRect(149, 149, 3, 3);
  canvas.ctx.fillRect(149 - 11.396, 149 - 47.07, 3, 3);

})();