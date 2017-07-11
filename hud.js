class HudItem extends Rect{
  constructor(x, y, w, h) {
    super(x, y, w, h)
    this._canvas = document.createElement("canvas");
    this._canvas.width = this.size.x;
    this._canvas.height = this.size.y;
    this._context = this._canvas.getContext("2d");
  }
  draw() {

  }
  get canvas() {
    return this._canvas;
  }
}

class HealthBar extends HudItem {
  constructor(x, y, w, h) {
    super(x, y, w, h);
    this.percentage = 100;
    this.padding = 1;
    this.colors = {
      "bg": "#000",
      "green": "#0f0",
      "red": "#f00",
      "orange": "#f39c12"
    }
  }
  set(per) {
    this.percentage = per;
    this.draw();
  }
  draw() {
    this._context.fillStyle = this.colors.bg;
    this._context.fillRect(0, 0, this.size.x, this.size.y);
    if (this.percentage < 35) {
      this._context.fillStyle = this.colors.red;
    } else if (this.percentage < 65) {
      this._context.fillStyle = this.colors.orange;
    } else {
      this._context.fillStyle = this.colors.green;
    }
    this._context.fillRect(this.padding, this.padding, this.size.x * (this.percentage/100) - this.padding*2, this.size.y-this.padding*2);
  }
}

class Hud extends HudItem{
  /*
  * @param1 {int} canvas width
  * @param2 {int} canvas height
  */
  constructor(x, y, w, h) {
    super(x, y, w, h);
    this.items = {
      "healthBar": new HealthBar(20, 20, 250, 35)
    };
  }
  draw() {
    for (var item in this.items) {
      if (this.items.hasOwnProperty(item)) {
        this.items[item].draw();
        this._context.drawImage(this.items[item].canvas, this.items[item].x, this.items[item].y, this.items[item].size.x, this.items[item].size.y);
      }
    }
  }
}
