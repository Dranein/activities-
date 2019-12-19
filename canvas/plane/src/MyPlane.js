import Bullet from "./Bullet";
import Wave from "./Wave";
import img_boom from "./images/boom.png";

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
    this.alive = true;
    this.bulletList = [];
    this.waveList = [];
    this.timeGapShoot = 0;
    this.isBooming = false;
    this.boomGapTime = 0;
    this.shootSpeed = 8;
    this.init();
  }

  init() {
    this.y = this.ctx.canvas.height - this.height - 20;
    this.x = (this.ctx.canvas.width - this.width) / 2;
    this.img = img_Plane[this.level];
  }

  draw() {
    if (!this.isBooming) this.shoot();
    this.bulletList = this.bulletList.filter(item => {
      item.draw();
      return item.alive;
    })
    this.ctx.save();
    this.ctx.translate(this.x, this.y);
    this.waveList.forEach(item => item.draw());
    if (this.isBooming) {
      this.boomGapTime += window.gapTime;
      if (this.boomGapTime > 100) {
        this.ctx.globalAlpha =  1 - this.boomGapTime * 0.001;
      }
      if (this.boomGapTime > 600) {
        this.alive = false;
      }
    }
    this.ctx.drawImage(this.img, -this.width / 2, -this.height / 2, this.width, this.height);
    this.ctx.restore();
  }

  shoot() {
    this.timeGapShoot += window.gapTime;
    if (this.timeGapShoot > 200 - this.shootSpeed * 5) {
      this.timeGapShoot %= 200 - this.shootSpeed * 5;
      this.bulletList.push(new Bullet({
        ctx: this.ctx,
        x: this.x,
        y: this.y,
        speed: this.shootSpeed
      }))
    }
  }

  upgrade() {
    this.level++;
    this.shootSpeed += 1;
    if (this.level > img_Plane.length) this.level = img_Plane.length - 1;
    this.img = img_Plane[this.level];
    this.waveList.push(new Wave({
      x: 0,
      y: 0,
      radius: 100,
      ctx: this.ctx
    }))
  }

  boom() {
    this.isBooming = true;
    let img = new Image();
    img.src = img_boom;
    this.img = img;
  }
}


export default MyPlane;