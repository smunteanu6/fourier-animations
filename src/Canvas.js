
module.exports = class {

  constructor ([width, height], canvasElement = new HTMLCanvasElement()) {
    this.dom = canvasElement;
    this.ctx = canvasElement.getContext('2d');
    this.width = this.dom.width = width;
    this.height = this.dom.height = height;
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