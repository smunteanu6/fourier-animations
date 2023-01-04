
class Line {
  
  constructor (x1, y1, x2, y2) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.m = (y1 - y2) / (x1 - x2);
    this.b = y1 - x1 * this.m;
    this.length = Math.sqrt((this.x1 - this.x2) ** 2 + (this.y1 - this.y2) ** 2);
  }

  // The point at distance d from (x1, y1), directed to (x2, y2)
  atDistance(d) {
    if (this.x1 == this.x2) return [this.x1, this.y1 + d];
    // w = change in x, h = change in y
    // w^2+h^2=d^2   =>   w^2+(mw)^2-d^2   =   (m^2+1)*w^2-d^2   =   0
    // To solve the quadratic: a = m^2+1, b = 0, c = -d^2
    // In this case, w = (-b+sqrt(b^2-4ac))/2a   =   sqrt(-4ac)/2a   =   sqrt(4ad^2)/2a   =   2d*sqrt(a)/2a   =   d/sqrt(a) =   d/sqrt(m^2+1)
    const x = this.x1 + (d / Math.sqrt(this.m * this.m + 1)) * (this.x1 < this.x2 ? 1 : -1);
    return [x, this.m * x + this.b];
  }

}

class fImage {

  constructor (width, height, lines, samplesCount) {
    
    this.width = width;
    this.height = height;
    this.#validateLines(lines);
    this.samples = this.#createSamples(lines, samplesCount);
  }

  #validateLines (lines) {
    const linesLength = lines.length;
    for (let ix = 0; ix < linesLength; ix++) {
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
}

class fCanvas {

  constructor (DOMElement) {
    this.dom = DOMElement;
    this.width = DOMElement.clientWidth;
    this.height = DOMElement.clientHeight;
    this.components = new Array();
  }

  setWidth (width) {
    this.width = width;
    this.dom.style.width = width + 'px';
  }

  setHeight (height) {
    this.height = height;
    this.dom.style.height = height + 'px';
  }

  setDimensions (width, height) {
    this.setWidth(width);
    this.setHeight(height);
  }

}


const main = (async () => {

  const linesData = [[1, 1, 50, 50], [50, 50, 70, 40], [70, 40, 1, 1]];

  const lines = linesData.map(data => new Line(data[0], data[1], data[2], data[3]));

  const image = new fImage(200, 200, lines, 1);

})();