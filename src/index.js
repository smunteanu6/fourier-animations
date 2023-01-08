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

  const [width, height] = [900, 900];
  
  const permanentCtx = createContext('permanent-canvas', width, height, { alpha: false });
  const temporaryCtx = createContext('temporary-canvas', width, height, { alpha: true });
  temporaryCtx.globalCompositeOperation = 'copy';
  
  permanentCtx.fillStyle = '#FFF';
  permanentCtx.fillRect(0, 0, width, height);
  permanentCtx.fillStyle = '#F00';

  temporaryCtx.fillStyle = '#0000';
  temporaryCtx.fillRect(0, 0, width, height);


  const linesData = [[45, 131, 64, 137],[64, 137, 138, 315],[138, 315, 133, 139],[133, 139, 154, 141],[154, 141, 169, 378],[169, 378, 204, 369],[204, 369, 197, 169],[197, 169, 221, 148],[221, 148, 267, 141],[267, 141, 294, 155],[294, 155, 307, 204],[307, 204, 306, 231],[306, 231, 308, 278],[308, 278, 307, 322],[307, 322, 276, 361],[276, 361, 231, 349],[231, 349, 231, 337],[231, 337, 275, 340],[275, 340, 296, 314],[296, 314, 293, 223],[293, 223, 279, 177],[279, 177, 257, 163],[257, 163, 228, 179],[228, 179, 222, 211],[222, 211, 225, 278],[225, 278, 226, 334],[226, 334, 226, 359],[226, 359, 286, 389],[286, 389, 325, 350],[325, 350, 328, 142],[328, 142, 395, 151],[395, 151, 422, 219],[422, 219, 417, 307],[417, 307, 371, 370],[371, 370, 368, 358],[368, 358, 406, 302],[406, 302, 404, 223],[404, 223, 378, 173],[378, 173, 358, 174],[358, 174, 357, 389],[357, 389, 433, 382],[433, 382, 444, 157],[444, 157, 509, 156],[509, 156, 507, 175],[507, 175, 462, 173],[462, 173, 459, 252],[459, 252, 499, 250],[499, 250, 495, 270],[495, 270, 465, 269],[465, 269, 462, 350],[462, 350, 464, 370],[464, 370, 513, 369],[513, 369, 536, 165],[536, 165, 583, 165],[583, 165, 588, 372],[588, 372, 574, 373],[574, 373, 573, 242],[573, 242, 552, 242],[552, 242, 553, 231],[553, 231, 569, 230],[569, 230, 570, 196],[570, 196, 554, 194],[554, 194, 541, 372],[541, 372, 512, 395],[512, 395, 150, 403],[150, 403, 77, 200],[77, 200, 84, 389],[84, 389, 75, 376],[75, 376, 56, 369],[56,369,45,131]].map(data => data.map(el => el * 1.5));

  document.addEventListener('dblclick', () => {

    const lines = linesData.map(data => new Geometry.Vector(data[0], data[1], data[2], data[3]));

    const vectors = FourierSeries.computeApproximation(lines, 1000, 400, width / 2, height / 2);
    Animations.animateVectorsOnCanvas(permanentCtx, temporaryCtx, vectors, width / 2, height / 2, 400, 0);
  });


})();