
module.exports = class {

  constructor ([width, height], lines, samplesCount, rotatingVectorsCount) {
    this.width = width;
    this.height = height;
    this.center = [width / 2, height / 2];
    this.#validateLines(lines);
    this.samples = this.#createSamples(lines, samplesCount);
    this.vactors = this.#computeVectors(this.samples, this.center, 2, rotatingVectorsCount);
  }

  #validateLines(lines) {
    const linesLength = lines.length;
    for (var ix = 0; ix < linesLength; ix++) {
      const next = (ix + 1) % linesLength;
      if (lines[ix].x2 != lines[next].x1 || lines[ix].y2 != lines[next].y1) throw new Error('Image formed is not a continuous line');
      if (0 > lines[ix].x1 || lines[ix].x1 >= this.width || 0 > lines[ix].y1 || lines[ix].y1 >= this.height) throw new Error ('Points aren\'t contained within the image (coordinates out of bound)');
    }
  }
  
  #createSamples(lines, samplesCount) {
    const totalLength = lines.reduce((total, current) => total + current.length, 0);
    samplesCount ||= Math.ceil(totalLength);
    const samples = new Array(samplesCount);
    const gap = totalLength / samplesCount;
    var computedSamples = 0, currentDistance = gap;
    for (const line of lines) {
      if (computedSamples === samplesCount) break;
      var distance = 0;
      while (distance + (gap - currentDistance) <= line.length) {
        distance += gap - currentDistance; currentDistance = 0;
        samples[computedSamples] = line.atDistance(distance);
        if (++computedSamples === samplesCount) break;
      }
      currentDistance += line.length - distance;
    }
    return samples;
  }

  #getAverageVector(samples) {
    const total = samples.reduce((total, point) => { total[0] += point[0]; total[1] += point[1]; return total; }, [0, 0]);
    return total.map(coordinate => coordinate / samples.length);
  }



  #computeVectors(samples, initialPoint, rotatingVectorsCount) {
    const baseVector = this.#getAverageVector(samples).map((coordinate, index) => coordinate - initialPoint[index]);
    const positiveFrequency = new Array(rotatingVectorsCount);
    const negativeFrequency = new Array(rotatingVectorsCount);
    var currentIterationSamples = samples.map(point => [point[0] - baseVector[0], point[1] - baseVector[1]]);
    for (var iteration = 0; iteration < rotatingVectorsCount; iteration++) {
      positiveFrequency[iteration] = this.#getAverageVector(currentIterationSamples);
      
    }
  }

}