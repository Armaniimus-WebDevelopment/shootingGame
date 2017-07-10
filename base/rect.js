class Rect {
  constructor(x = 0, y = 0, w = 0, h = 0) {
    this.pos = new Vec(x, y);
    this.size = new Vec(w, h);
    this.rotation = 0;
  }
  get left() {
    return this.pos.x - this.size.x/2;
  }
  get right() {
    return this.pos.x + this.size.x/2;
  }
  get top() {
    return this.pos.y - this.size.y/2;
  }
  get bottom() {
    return this.pos.y + this.size.y/2;
  }
  get x() {
    return this.pos.x;
  }
  get y() {
    return this.pos.y;
  }
  set x(x) {
    this.pos.x = x;
  }
  set y(y) {
    this.pos.y = y;
  }
  // checks if the given rect collides with it
  collide(rect) {

  }
  move(x, y) {
    this.x = x;
    this.y = y;
  }
  // moves the rect and takes the rotation in to account
  forwards(speed) {
    this.x += Math.sin(this.rotation / 180 * Math.PI) * speed;
    this.y -= Math.cos(this.rotation / 180 * Math.PI) * speed;
  }
  // moves the player and takes the rotation in to account
  backwards(speed) {
    this.forwards(-speed);
  }
}
