function render(permanentCtx, temporaryCtx, vectors, posX, posY, t) {
  temporaryCtx.strokeStyle = '#0000';
  temporaryCtx.stroke();
  temporaryCtx.beginPath();
  temporaryCtx.moveTo(posX, posY);
  for (const vector of vectors) {
    const add = vector.eval(t * Math.PI * 2);
    temporaryCtx.lineTo(posX += add.u, posY += add.v);
  }
  permanentCtx.fillRect(posX - 1, posY - 1, 2, 2);
  temporaryCtx.strokeStyle = '#000F';
  temporaryCtx.stroke();
}

function animateVectorsOnCanvas(permanentCtx, temporaryCtx, vectors, posX, posY, precision = 50, intervalLength = 100) {
  var t = 0;
  setInterval(() => render(permanentCtx, temporaryCtx, vectors, posX, posY, t++ / precision), intervalLength);
}

module.exports = {
  animateVectorsOnCanvas,
  render
}