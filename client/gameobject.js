// zombies, players, bullets
class GameObject {
  constructor(x, y, rot, type, name = "unnamed") {
    if (x instanceof Object) {
      this.pos = new Vec(x.pos.x, x.pos.y);
      this.rotation = x.rotation;
      this.name = x.name || "unnamed";
      if (x instanceof Player) {
        this.type = "player";
      } else if (x instanceof Bullet) {
        this.type = "bullet";
      } else if (x instanceof Zombie) {
        this.type = "zombie";
      }
    } else {
      this.pos = new Vec(x, y);
      this.rotation = rot;
      this.name = name;
      this.type = type;
    }
  }
  toPlayer(img) {
    const player = new Player(img, this.name);
    player.pos.x = this.pos.x;
    player.pos.y = this.pos.y;
    player.rotation = this.rotation;
    player.name = this.name;
    return player;
  }
  toZombie(img) {
    const zombie = new Zombie(img);
    zombie.pos.x = this.pos.x;
    zombie.pos.y = this.pos.y;
    zombie.rotation = this.rotation;
    return zombie;
  }
  toBullet(shooter) {
    return new Bullet(this.pos.x, this.pos.y, this.rotation, shooter);
  }
}
