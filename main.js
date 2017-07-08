class Vec {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Rect {
  constructor(x, y, w, h) {
    this.pos = new Vec(x, y);
    this.size = new Vec(w, h);
  }
}

class Sprite extends Rect{
  constructor(img, x, y, w, h) {
    super(x, y, w, h);
    if (img instanceof Image) {
      this.img = img;
    } else {
      this.img = document.createElement("img");
      this.img.src = img;
      this.img.onload = () => {
        this.img.width = this.size.x = this.size.x || this.img.naturalWidth;
        this.img.height = this.size.y = this.size.y || this.img.naturalHeight;
      }
    }
  }
}

class Player extends Sprite {
  constructor() {
    super("img/player.png", 0, 0);
  }
}

class Zombie extends Sprite {
  constructor() {
    super("img/zombie.png", 0, 0);
  }
}

class Game {
  constructor(canvas) {
    this._canvas = canvas;
    this._context = this._canvas.getContext("2d");
    this.player = new Player;
    this.zombies = [new Zombie];


    this._accumulator = 0;
    this.step = 1/120;
    let lastTime;
    const timing = (millis) => {
      if (lastTime) {
        // this.update((millis - lastTime) / 1000);
        this.draw();
      }
      lastTime = millis;
      requestAnimationFrame(timing);
    }
    timing();
  }

  draw() {
    this._context.fillStyle = "#eee";
    this._context.fillRect(0, 0, this._canvas.width, this._canvas.height);

    this.drawSprite(this.player);


  }
  simulate(dt) {

  }
  update(dt) {
    this._accumulator += dt;
    while (this._accumulator > this.step) {
      this.simulate(this.step);
      this._accumulator -= this.step;
    }
  }

  drawSprite(sprite) {
    if (sprite.img) {
      this._context.drawImage(sprite.img, sprite.pos.x, sprite.pos.y, sprite.size.x, sprite.size.y);
    }
  }
}

const canvas = document.getElementById("canvas");
const game = new Game(canvas);
