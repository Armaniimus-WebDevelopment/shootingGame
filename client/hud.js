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

class BulletDisplay extends TextField {
  constructor(x, y, w, h) {
    super(x, y, w, h, "8/16");
    this.font = "32px pixel";
    this.amountInGun = 8;
    this.amountOutGun = 16;
    this.update();
  }
  draw() {
    super.draw();
  }
  update() {
    this.text = this.amountInGun + "/" + this.amountOutGun;
  }
  get inGun() {
    return this.amountInGun;
  }
  set inGun(amount) {
    this.amountInGun = amount;
    this.update();
  }
  get outGun() {
    return this.amountOutGun;
  }
  set outGun(amount) {
    this.amountOutGun = amount;
    this.update();
  }

}

class HealthBar extends HudItem {
  constructor(x, y, w, h) {
    super(x, y, w, h);
    this.per = 100;
    this.padding = 3;
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
    super.draw();
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
      "healthBar": new HealthBar(20, 20, 250, 35),
      "bulletDisplay": new BulletDisplay(20, 60, 250, 48)
    };
  }
}
