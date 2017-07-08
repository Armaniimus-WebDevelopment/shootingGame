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
}

class Rect {
  constructor(x = 0, y = 0, w = 0, h = 0) {
    this.pos = new Vec(x, y);
    this.size = new Vec(w, h);
  }
}

class Sprite extends Rect{
  constructor(img, x, y, w, h) {
    super(x, y, w, h);
    this.rotation = 0;
    if (img instanceof Image) {
      this.img = img;
    } else {
      this.img = document.createElement("img");
      this.img.src = img;
      this.img.width = this.size.x;
      this.img.height = this.size.y;
      this.img.addEventListener("load", () => {
        this.img.width = this.size.x = this.size.x || this.img.naturalWidth;
        this.img.height = this.size.y = this.size.y || this.img.naturalHeight;
      });
    }
  }
}

class Player extends Sprite {
  constructor() {
    super("img/player.png");

    // scale it a bit
    this.img.addEventListener("load", () => {
      this.size.x *= 3;
      this.size.y *= 3;
    });
  }
}

class Zombie extends Sprite {
  constructor() {
    super("img/zombie.png");

    // scale it a bit
    this.img.addEventListener("load", () => {
      this.size.x *= 3;
      this.size.y *= 3;
    });
  }
}

class Engine {
  constructor(canvas) {
    this._canvas = canvas;
    this._context = this._canvas.getContext("2d");
    this._context.imageSmoothingEnabled = false;

    this._accumulator = 0;
    this.step = 1/120;
    let lastTime;
    const timing = (millis) => {
      if (lastTime) {
        this.update((millis - lastTime) / 1000);
        this.draw();
      }
      lastTime = millis;
      requestAnimationFrame(timing);
    }
    timing();
  }

  draw() {

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
      this._context.drawImage(sprite.img, sprite.pos.x - sprite.size.x/2, sprite.pos.y - sprite.size.y/2, sprite.size.x, sprite.size.y); // draws from the center
    }
  }

}

class Game extends Engine{
  constructor(canvas) {
    super(canvas);
    this.player = new Player;
    this.zombies = [new Zombie];
  }

  draw() {
    this._context.fillStyle = "#eee";
    this._context.fillRect(0, 0, this._canvas.width, this._canvas.height);

    this.drawPlayer(this.player);

  }
  simulate(dt) {
    this.player.rotation += 90 * dt; // rotate 90 degrees per second
  }

  drawPlayer(player) {
    this._context.save();
    this._context.translate(this._canvas.width/2, this._canvas.height/2);
    this._context.rotate(player.rotation / 360 * Math.PI);
    this._context.drawImage(player.img, 0 - player.size.x/2, 0 - player.size.y/2, player.size.x, player.size.y); // draws from the center
    this._context.restore();
  }
}

const canvas = document.getElementById("canvas");
const game = new Game(canvas);
