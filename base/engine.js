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
    this._context.drawImage(sprite.img, sprite.pos.x - sprite.size.x/2, sprite.pos.y - sprite.size.y/2, sprite.size.x, sprite.size.y, sprite.sx, sprite.sy, sprite.sw, sprite.sh); // draws from the center
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

    this.eventListeners = [];

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
    const funcs = this.eventListeners.filter(x => x.key === this.keys[e.keyCode] && x.up === false);
    for (var i = 0; i < funcs.length; i++) {
      funcs[i].function(e);
    }
  }
  keyUp(e) {
    this.down.splice(this.down.indexOf(this.keys[e.keyCode]), 1);
    const funcs = this.eventListeners.filter(x => x.key === this.keys[e.keyCode] && x.up === true);
    for (var i = 0; i < funcs.length; i++) {
      funcs[i].function(e);
    }
  }
  /*
  * @param 1 {string} key you want to listen for in text example: "space"
  * @param 2 {boolean} if you want to listen for key up, true or false, if false you will get keyDown
  * @param 3 {function} the callback
  */
  on(key, up, func) {
    this.eventListeners.push({key: key, up: up, function: func});
  }
}
