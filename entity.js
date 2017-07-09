class Player extends Entity {
  constructor() {
    super("img/player.png");
  }
  // moves the player and takes the rotation in to account
  forwards(speed) {
    this.x -= Math.sin(this.rotation / 180 * Math.PI) * speed;
    this.y -= Math.cos(this.rotation / 180 * Math.PI) * speed;
  }
}

class Zombie extends Entity {
  constructor() {
    super("img/zombie.png", 10);
  }
}
