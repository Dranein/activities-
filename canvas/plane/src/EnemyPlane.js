let img_EnemyPlane = [];
for (let i = 1; i < 19; i++) {
  let img = new Image();
  img.src = require('./images/enemyplane_' + i + '.png').default;
  img_EnemyPlane.push(img);
}

import img_boom from './images/boom.png';

class EnemyPlane {
  constructor({ctx}) {
    this.width = 56;
    this.height = 42;
    this.ctx = ctx;
    this.alive = true;
    this.isBooming = false;
    this.boomGapTime = 0;
    this.init();
  }
  init() {
    this.speed = Math.random() * 0.1 + 0.07;
    this.y = -this.height;
    this.x = Math.random() * (this.ctx.canvas.width - this.width) + this.width / 2;
    const INDEX = Math.floor(Math.random() * 18);
    this.img = img_EnemyPlane[INDEX];
  }
  draw() {
    if (!this.alive) return;
    this.ctx.save();
    if (this.isBooming) {
      this.boomGapTime += window.gapTime;
      if (this.boomGapTime > 100) {
        this.ctx.globalAlpha =  1 - this.boomGapTime * 0.001;
      }
      if (this.boomGapTime > 600) {
        this.alive = false;
      }
    } else {
      this.y += window.gapTime * this.speed;
      if (this.y > this.ctx.canvas.height) {
        this.alive = false;
        return false;
      }
    }
    this.ctx.translate(this.x, this.y);
    this.ctx.drawImage(this.img, -this.width / 2, 0, this.width, this.height);
    this.ctx.restore();
  }

  boom() {
    this.isBooming = true;
    let img = new Image();
    img.src = img_boom;
    this.img = img;
  }

  shoot() {

  }
}

export default EnemyPlane;