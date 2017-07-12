class HealthBar extends HudItem {
  constructor(x, y, w, h) {
    super(x, y, w, h);
    this.per = 100;
    this.padding = 1;
    this.colors = {
      "bg": "#000",
      "green": "#0f0",
      "red": "#f00",
      "orange": "#f39c12"
    }
  }
  set percentage(per) {
    this.per = per;
    this.draw();
  }
  get percentage() {
    return this.per;
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

class PlayerHud extends Hud {
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
}
