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
  move(x, y) {
    this.x = x;
    this.y = y;
  }
  // moves the player and takes the rotation in to account
  forwards(speed) {
    this.x -= Math.sin(this.rotation / 180 * Math.PI) * speed;
    this.y -= Math.cos(this.rotation / 180 * Math.PI) * speed;
  }
  // moves the player and takes the rotation in to account
  backwards(speed) {
    this.forwards(-speed);
  }
}

class Sprite extends Rect {
  constructor(img, x, y, w, h, middleX, middleY) {
    super(x, y, w, h);
    this.middle = new Vec(middleX, middleY); // TODO: render it differently with this, use as offset in drawing
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

class Entity extends Sprite {
  constructor(img, health = 20) {
    super(img);
    this.health = health;

    // scale it a bit
    this.img.addEventListener("load", () => {
      this.size.x *= 3;
      this.size.y *= 3;
    });
  }
  lookAt(entity, dt = 1/120, speed) {
    const dist = this.pos.distance(entity.pos);
    const targetRotation = (Math.atan2(dist.y, dist.x) * 180 / Math.PI - 90);
    this.rotation += (targetRotation - this.rotation) * dt * speed;
  }
}

class Player extends Entity {
  constructor() {
    super("img/player.png");
  }
}

class Zombie extends Entity {
  constructor() {
    super("img/zombie.png", 10);
  }
}

class Engine {
  constructor(canvas) {
    this._canvas = canvas;
    this._context = this._canvas.getContext("2d");
    this._context.imageSmoothingEnabled = false;
    this.inputHandler = new InputHandler();

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
    this._context.drawImage(sprite.img, sprite.pos.x - sprite.size.x/2, sprite.pos.y - sprite.size.y/2, sprite.size.x, sprite.size.y); // draws from the center
  }

}

class InputHandler {
  constructor() {

    this.keys = {
      83: "down",
      40: "down",
      87: "up",
      38: "up",
      65: "left",
      37: "left",
      68: "right",
      39: "right",
      32: "space"
    };

    this.down = []; // stores the keys that are down(pressed)

    document.addEventListener("keydown", e => {
      this.keyDown(e);
    });
    document.addEventListener("keyup", e => {
      this.keyUp(e);
    });
  }
  keyDown(e) {
    const key = this.keys[e.keyCode];
    if (this.down.indexOf(key) === -1 && key) {
      this.down.push(key);
    }
  }
  keyUp(e) {
    this.down.splice(this.down.indexOf(this.keys[e.keyCode]), 1);
  }
}

class Game extends Engine {
  constructor(canvas) {
    super(canvas);
    this.camAngle = 0;
    this.players = [new Player];
    this.zombies = [new Zombie];
  }

  draw() {
    // clear the screen
    this._context.fillStyle = "#eee";
    this._context.fillRect(0, 0, this._canvas.width, this._canvas.height);

    this._context.save();

    // moves everything relative to the player
    this._context.translate(this._canvas.width/2,  this._canvas.height/2);
    this.drawPlayer(this.players[0]);
    this._context.rotate(this.camAngle / 180 * Math.PI); // rotate everything except the player

    this.players.forEach((player, index) => {
      if (index != 0) {
        this.drawSprite(player); // draw each player except the first one
      }
    });

    this.zombies.forEach(zombie => {
      this.drawSprite(zombie); // draw each zombie
    });

    this._context.restore();
  }

  drawPlayer(player) {
    this._context.save();
    this._context.rotate((this.camAngle - player.rotation) / 180 * Math.PI);
    this._context.drawImage(player.img, 0 - this.players[0].size.x/2, 0 - this.players[0].size.y/2, player.size.x, player.size.y); // draws from the center
    this._context.restore();
  }

  drawSprite(sprite) {
    this._context.save();
    this._context.translate(sprite.pos.x - this.players[0].pos.x, sprite.pos.y - this.players[0].pos.y);
    this._context.beginPath();
    this._context.moveTo(0,0);
    this._context.lineTo(0,-150);
    this._context.stroke();
    this._context.closePath();
    this._context.rotate(sprite.rotation / 180 * Math.PI);
    this._context.beginPath();
    this._context.moveTo(0,0);
    this._context.lineTo(0,-300);
    this._context.stroke();
    this._context.closePath();
    this._context.drawImage(sprite.img, 0 - sprite.size.x/2, 0 - sprite.size.y/2, sprite.size.x, sprite.size.y); // draws from the center
    this._context.restore();
  }

  simulate(dt) {
    this.camAngle += (this.players[0].rotation - this.camAngle) * 15 * dt; // adds an smooth rotation

    this.zombies.forEach(zombie => {
      zombie.lookAt(this.players[0], dt, 1);
      // zombie.forwards(50 * dt);
    });

    if (this.inputHandler.down.indexOf("down") != -1) {
      this.players[0].backwards(150 * dt);
    }
    if (this.inputHandler.down.indexOf("up") != -1) {
      this.players[0].forwards(150 * dt);
    }
    if (this.inputHandler.down.indexOf("left") != -1) {
      this.players[0].rotation += 180 * dt;
    }
    if (this.inputHandler.down.indexOf("right") != -1) {
      this.players[0].rotation -= 180 * dt;
    }
  }

}

const canvas = document.getElementById("canvas");
canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight - 5;
const game = new Game(canvas);
