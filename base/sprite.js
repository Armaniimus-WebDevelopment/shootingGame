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
