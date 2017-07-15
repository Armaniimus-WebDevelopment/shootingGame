class HudItem extends Rect{
  constructor(x, y, w, h) {
    super(x, y, w, h)
    this._canvas = document.createElement("canvas");
    this._canvas.width = this.size.x;
    this._canvas.height = this.size.y;
    this._context = this._canvas.getContext("2d");
  }
  draw() {
    this._context.clearRect(0, 0, this.size.x, this.size.y);
  }
  get canvas() {
    return this._canvas;
  }
}

class TextField extends HudItem {
  constructor(x, y, w, h, text = "sample text") {
    super(x, y, w, h);
    this._text = text;
    this._font = "32px serif";
    this._context.font = this.font;
    this._context.textBaseline = 'middle';
  }
  draw() {
    super.draw();
    this._context.fillText(this.text, 0, this.size.y/2);
  }
  set text(text) {
    this._text = text;
  }
  get text() {
    return this._text;
  }
  set font(font) {
    this._font = font;
    this._context.font = this.font;
  }
  get font() {
    return this._font;
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
        this._context.clearRect(this.items[item].x, this.items[item].y, this.items[item].size.x, this.items[item].size.y);
        this.items[item].draw();
        this._context.drawImage(this.items[item].canvas, this.items[item].x, this.items[item].y, this.items[item].size.x, this.items[item].size.y);
      }
    }
  }
}
