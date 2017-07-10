class Player extends Entity {
  constructor(img = "img/spriteSheet.png") {
    super(img, 20, 0, 0, 15, 18, 0, 0, 15, 18);
  }
  // moves the player and takes the rotation in to account
  forwards(speed) {
    this.x -= Math.sin(this.rotation / 180 * Math.PI) * speed;
    this.y -= Math.cos(this.rotation / 180 * Math.PI) * speed;
  }
}

class Zombie extends Entity {
  constructor(img = "img/spriteSheet.png") {
    super(img, 10, 0, 0, 15, 18, 16, 0, 15, 15);
  }
}

class Floor extends Sprite {
  constructor(img = "img/spriteSheet.png") {
    super(img, 0, 0, 32, 32, 32, 0, 32, 32);
    this.size.x *= 3;
    this.size.y *= 3;
    this.img.addEventListener("load", () => {
      this.size.x *= 3;
      this.size.y *= 3;
    });
  }
}
