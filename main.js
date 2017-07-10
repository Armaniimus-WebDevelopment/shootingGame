class Game extends Engine {
  constructor(canvas) {
    super(canvas);
    this.loaded = false;
    this.camAngle = 0;
    this.spriteSheet = document.createElement("img");
    this.spriteSheet.src = "img/spriteSheet.png";
    this.spriteSheet.addEventListener("load", () => {
      this.players = [new Player(this.spriteSheet), new Player(this.spriteSheet)];
      this.players[0].x, this.players[0].y = -250;
      this.players[1].x, this.players[1].y = -500;
      this.zombies = [];
      for (var i = 0; i < 25; i++) {
        const zombie = new Zombie(this.spriteSheet);
        zombie.pos.x = Math.random() * 1000 + 500;
        zombie.pos.y = Math.random() * 1000 + 500;
        this.zombies.push(zombie);
      }
      this.map = [];
      for (var x = 0; x < 25; x++) {
        for (var y = 0; y < 25; y++) {
          const sprite = new Floor(this.spriteSheet);
          sprite.pos.x = x * sprite.size.x;
          sprite.pos.y = y * sprite.size.y;
          this.map.push(sprite);
        }
      }
      this.loaded = true;
    });
  }

  draw() {
    if (!this.loaded) {
      return;
    }
    // clear the screen
    this._context.fillStyle = "#eee";
    this._context.fillRect(0, 0, this._canvas.width, this._canvas.height);

    this._context.save();

    // moves everything relative to the player
    this._context.translate(this._canvas.width/2,  this._canvas.height/2);
    this._context.rotate(this.camAngle / 180 * Math.PI); // rotate everything except the player

    this.map.forEach(object => {
      this.drawSprite(object);
    });

    this.zombies.forEach(zombie => {
      this.drawSprite(zombie); // draw each zombie
    });

    this.players.forEach((player, index) => {
      if (index != 0) {
        this.drawSprite(player); // draw each player except the first one
      }
    });

    this._context.restore();

    this._context.save();
    this._context.translate(this._canvas.width/2,  this._canvas.height/2);
    this.drawPlayer(this.players[0]);
    this._context.rotate(this.camAngle / 180 * Math.PI); // rotate everything except the player
    this._context.restore();

  }

  drawPlayer(player) {
    this._context.save();

    // collider of the player
    // this._context.fillStyle = "#000";
    // this._context.fillRect(0 - player.size.x/2, 0 - player.size.y/2, player.size.x, player.size.y);

    this._context.rotate((this.camAngle - player.rotation) / 180 * Math.PI);
    this._context.drawImage(player.img, player.spritePos.x, player.spritePos.y, player.spriteSize.x, player.spriteSize.y, 0 - this.players[0].size.x/2, 0 - this.players[0].size.y/2, player.size.x, player.size.y); // draws from the center
    this._context.restore();
  }

  drawSprite(sprite) {
    this._context.save();
    this._context.translate(sprite.pos.x - this.players[0].pos.x, sprite.pos.y - this.players[0].pos.y);
    // collider of the zombie
    // this._context.fillStyle = "#000";
    // this._context.fillRect(0 - sprite.size.x/2, 0 - sprite.size.y/2, sprite.size.x, sprite.size.y);

    this._context.rotate(sprite.rotation / 180 * Math.PI);
    // guide line to see where the sprite is "looking"
    // this._context.beginPath();
    // this._context.moveTo(0,0);
    // this._context.lineTo(0,-300);
    // this._context.stroke();
    // this._context.closePath();
    this._context.drawImage(sprite.img, sprite.spritePos.x, sprite.spritePos.y, sprite.spriteSize.x, sprite.spriteSize.y, 0 - sprite.size.x/2, 0 - sprite.size.y/2, sprite.size.x, sprite.size.y); // draws from the center
    this._context.restore();
  }

  simulate(dt) {
    if (!this.loaded) {
      return;
    }
    this.camAngle += (this.players[0].rotation - this.camAngle) * 15 * dt; // adds an smooth rotation

    this.zombies.forEach(zombie => {
      // get the distances
      const len = this.players.map((player) => {
        return zombie.pos.distance(player.pos);
      }).map((dist) => {
        return dist.len;
      });

      // get the closest player from the array
      let closest = 0;
      for (var i = 0; i < len.length; i++) {
        if (len[i] < len[closest]) {
          closest = i;
        }
      }
      // rotate to the closest person
      zombie.lookAt(this.players[closest], 1 * dt);
      // move towards the player
      zombie.forwards(100 * dt);
    });

    // do stuff with the input
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
canvas.width = document.body.clientWidth; // sets the canvas width to full body width
canvas.height = document.body.clientHeight; // sets the canvas height to full body width
const game = new Game(canvas);
