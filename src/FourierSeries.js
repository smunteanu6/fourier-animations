const { RotatingVector } = require('./Geometry');

function validateDrawing(lines, width, height, startX, startY) {
  if (!(0 <= startX && startX < width && 0 <= startY && startY <= height)) throw new Error('Starting point coordinates out of bound');
  for (const ix in lines) {
    const a = lines[ix], b = lines[(ix + 1) % lines.length];
    if (!(a.x2 === b.x1 && a.y2 === b.y1)) throw new Error('Image formed is not a continuous line');
    if (!(0 <= a.x1 && a.x1 < width && 0 <= a.y1 && a.y1 <= height)) throw new Error ('Segment coordinates out of bound');
  }
}

function getSamples(lines, count) {
  const totalLength = lines.reduce((total, current) => total + current.length, 0);
  count ||= Math.ceil(totalLength);
  const samples = new Array(count);
  const gap = totalLength / count;
  var index = 0;
  var sampleDistance = gap;
  var segmentDistance = 0;
  for (const line of lines) {
    if (index === count) break;
    segmentDistance = 0;
    while (segmentDistance + (gap - sampleDistance) <= line.length) {
      segmentDistance += gap - sampleDistance;
      samples[index] = line.atDistance(segmentDistance);
      sampleDistance = 0;
      if (++index === count) break;
    }
    sampleDistance += line.length - segmentDistance;
  }
  return samples;
}

function getAverage(samples, f) {
  const total = [0, 0];
  samples.forEach((sample, sampleIndex) => {
    const t = sampleIndex / samples.length;
    rotate(sample, t * -f * (Math.PI * 2)).forEach((value, index) => {
      total[index] += value / samples.length;
    });
  });
  return total;
}

function computeVectors(samples, precision) {
  return [...Array(precision * 2 + 1)].map((value, index) => {
    const f = (index % 2 == 1 ? (index + 1) / 2 :- (index) / 2);
    return new RotatingVector(...getAverage(samples, f), f);
  });
}

function computeApproximation(lines, samplesCount, precision, width, height, startX = width / 2, startY = height / 2) {
  validateDrawing(lines, width, height, startX, startY);
  const samples = getSamples(lines, samplesCount);
  samples.forEach(sample => { sample[0] -= startX; sample[1] -= startY; });
  return computeVectors(samples, precision);
}

module.exports = {
  computeApproximation
}