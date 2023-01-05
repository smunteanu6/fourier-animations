
function* rainbowGenerator() {
  var t = 0;
  while (true) {
    yield [Math.sin(t) * 127 + 128, Math.sin(t + 2) * 127 + 128, Math.sin(t + 4) * 127 + 128];
    t += 1 / 1000;
  }
}

module.exports = class {

  constructor ([width, height], canvasElement = new HTMLCanvasElement()) {
    this.dom = canvasElement;
    this.width = this.dom.width = width;
    this.height = this.dom.height = height;
    this.ctx = canvasElement.getContext('2d', { alpha: false, willReadFrequently: true });
    this.permanentImageData = new Uint8ClampedArray(width * height * 4).fill(255);
    this.ctx.putImageData(new ImageData(this.permanentImageData, width, height), 0, 0);
  }

  reload() {
    this.ctx.putImageData(new ImageData(this.permanentImageData, this.width, this.height), 0, 0);
  }

  save() {
    this.permanentImageData = this.ctx.getImageData(0, 0, this.width, this.height).data;
  }

  drawPoint(x, y, r) {
    const x1 = Math.max(Math.round(x) - r + 1, 0), x2 = Math.min(Math.round(x) + r - 1, this.width);
    const y1 = Math.max(Math.round(y) - r + 1, 0), y2 = Math.min(Math.round(y) + r - 1, this.height);
    for (var i = y1; i <= y2; i++) {
      for (var j = x1; j <= x2; j++) {
        const p = (i * this.width + j) * 4;
        const col = this.generator.next().value;
        for (var k = 0; k < 3; k++) this.permanentImageData[p + k] = col[k];
      }
    }
  }

  drawLine(x1, y1, x2, y2) {
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.stroke();
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

