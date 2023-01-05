
function render(canvas, vectors, position, t) {
  canvas.ctx.beginPath();
  canvas.ctx.moveTo(...position);
  for (const vector of vectors) {
    position[0] += Math.cos(t * vector.frequency) * vector.magnitude;
    position[1] += Math.sin(t * vector.frequency) * vector.magnitude;
    canvas.ctx.lineTo(...position);
  }
  canvas.drawPoint(...position, 2);
  canvas.reload();
  canvas.ctx.stroke();
}

function animateVectorsOnCanvas(canvas, vectors, precision) {
  
}

module.exports = {
  animateVectorsOnCanvas,
  render
}