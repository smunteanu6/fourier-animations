
class Segment {
  
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
    if (this.x1 == this.x2) return [this.x1, this.y1 + (this.y1 < this.y2 ? d : -d)];
    // w = change in x, h = change in y
    // w^2+h^2=d^2   =>   w^2+(mw)^2-d^2   =   (m^2+1)*w^2-d^2   =   0
    // To solve for w: a = m^2+1, b = 0, c = -d^2
    // In this case, w = (-b+sqrt(b^2-4ac))/2a   =   sqrt(-4ac)/2a   =   sqrt(4ad^2)/2a   =   2d*sqrt(a)/2a   =   d/sqrt(a) =   d/sqrt(m^2+1)
    const x = this.x1 + (d / Math.sqrt(this.m * this.m + 1)) * (this.x1 < this.x2 ? 1 : -1);
    return [x, evalX(x)];
  }

  evalX(x) {
    return this.m * x + this.b;
  }

}

module.exports = {
  Segment
}