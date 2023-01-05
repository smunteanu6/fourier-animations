
async function render(permanentCtx, temporaryCtx, vectors, posX, posY, t) {
  temporaryCtx.strokeStyle = '#0000';
  temporaryCtx.stroke();
  temporaryCtx.beginPath();
  temporaryCtx.moveTo(posX, posY);
  for (const vector of vectors) {
    posX += Math.cos(t * vector.frequency) * vector.magnitude;
    posY += Math.sin(t * vector.frequency) * vector.magnitude;
    temporaryCtx.lineTo(posX, posY);
  }
  permanentCtx.fillRect(posX - 1, posY - 1, 3, 3);
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