class Player extends Entity {
  constructor(img = "img/spriteSheet.png", name = "unnamed") {
    super(img, 20, 0, 0, 15, 18, 0, 0, 15, 18, 0, 2);
    this.dmg = 0;
    this.name = name;
    this.attachments.push(new Sprite(img, 0, 0, 23, 32, 65, 0, 23, 32, 0, -30)); // push in the arms
    this.guns = [new Gun()];
    this.selectedGun = 0;
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

class Gun {
  constructor() {
    this.bulletsInGun = 8;
    this.inGunMax = 8;
    this.bulletsOutGun = 64;
    this.dmg = 5;
  }
  reload() {
    const reloadAmount = Math.min(this.inGunMax - this.bulletsInGun, this.bulletsOutGun);
    this.bulletsInGun += reloadAmount;
    this.bulletsOutGun -= reloadAmount;
  }
}

class Bullet extends Rect {
  constructor(x, y, rotation, shooter) {
    super(x, y, 3, 9);
    this.color = "#FFD700";
    this.shooter = shooter;
    this.rotation = rotation;
    this.creationTime = new Date();
  }
  get dmg() {
    return this.shooter.guns[this.shooter.selectedGun].dmg + this.shooter.dmg;
  }
}
