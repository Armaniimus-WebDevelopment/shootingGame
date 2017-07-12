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

class Hud extends HudItem{
  /*
  * @param1 {int} canvas width
  * @param2 {int} canvas height
  */
  constructor(x, y, w, h) {
    super(x, y, w, h);
    this.items = {
      
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
