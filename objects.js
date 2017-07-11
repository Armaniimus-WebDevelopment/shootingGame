class Player extends Entity {
  constructor(img = "img/spriteSheet.png") {
    super(img, 20, 0, 0, 15, 18, 0, 0, 15, 18);
    this.attachments.push(new Sprite(img, 0, 0, 23, 32, 65, 0, 23, 32, 0, -30)); // push in the arms
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
    this.attachments.push(new Sprite(img, 0, 0, 21, 24, 89, 0, 21, 24, 0, -30)); // push in the arms
  }
}

class Floor extends Sprite {
  constructor(img = "img/spriteSheet.png") {
    super(img, 0, 0, 32, 32, 32, 0, 32, 32);
  }
}
