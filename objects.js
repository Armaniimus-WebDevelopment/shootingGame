class Player extends Entity {
  constructor() {
    super("img/spriteSheet.png", 20, 0, 0, 15, 18, 0, 0, 15, 18);
  }
  // moves the player and takes the rotation in to account
  forwards(speed) {
    this.x -= Math.sin(this.rotation / 180 * Math.PI) * speed;
    this.y -= Math.cos(this.rotation / 180 * Math.PI) * speed;
  }
}

class Zombie extends Entity {
  constructor() {
    super("img/spriteSheet.png", 10, 0, 0, 15, 18, 16, 0, 15, 15);
  }
}
