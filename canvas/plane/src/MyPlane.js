import Bullet from "./Bullet";

let img_Plane = [];
for (let i = 1; i < 9; i++) {
  let img = new Image();
  img.src = require('./images/myplane_level' + i + '.png').default;
  img_Plane.push(img);
}

class MyPlane {
  constructor({ctx}) {
    this.width = 70;
    this.height = 50;
    this.ctx = ctx;
    this.y = 0;
    this.level = 0;
    this.bulletList = [];
    this.timeGapShoot = 0;
    this.init();
  }

  init() {
    this.y = this.ctx.canvas.height - this.height - 20;
    this.x = (this.ctx.canvas.width - this.width) / 2;
  }

  draw() {
    this.shoot();
    this.bulletList = this.bulletList.filter(item => {
      item.draw();
      return item.alive;
    })
    this.ctx.save();
    this.ctx.translate(this.x, this.y);
    this.ctx.drawImage(img_Plane[this.level], -this.width / 2, -this.height / 2, this.width, this.height);
    this.ctx.restore();
  }

  shoot() {
    this.timeGapShoot += window.gapTime;
    if (this.timeGapShoot > 200) {
      this.timeGapShoot %= 200;
      this.bulletList.push(new Bullet({
        ctx: this.ctx,
        x: this.x,
        y: this.y
      }))
    }
  }

}


export default MyPlane;