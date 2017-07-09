class Vec {
  constructor(x, y) {
    if (x instanceof Vec) {
      this.x = x.x;
      this.y = x.y;
    } else {
      this.x = x;
      this.y = y;
    }
  }
  get len() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  set len(value) {
    const fact = value / this.len;
    this.x *= fact;
    this.y *= fact;
  }
  distance(vec) {
    return new Vec(this.x - vec.x, this.y - vec.y);
  }
}
