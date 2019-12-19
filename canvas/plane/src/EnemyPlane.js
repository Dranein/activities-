import Bullet from "./Bullet";

let img_EnemyPlane = [];
for (let i = 1; i < 19; i++) {
  let img = new Image();
  img.src = require('./images/enemyplane_' + i + '.png').default;
  img_EnemyPlane.push(img);
}

import img_boom from './images/boom.png';

class EnemyPlane {
  constructor({ctx}) {
    this.width = 40;
    this.height = 30;
    this.ctx = ctx;
    this.alive = true;
    this.isBooming = false;
    this.boomGapTime = 0;
    this.timeGapShoot = 0;
    this.bulletList = [];
    this.init();
  }
  init() {
    this.speed = Math.random() * 0.1 + 0.07 + window.gameLevel * 0.01;
    this.y = -this.height;
    this.x = Math.random() * (this.ctx.canvas.width - this.width) + this.width / 2;
    this.imgIndex = Math.floor(Math.random() * (4 + 2 * window.gameLevel));
    this.img = img_EnemyPlane[this.imgIndex];
  }
  draw() {
    if (!this.alive) return;
    this.bulletList = this.bulletList.filter(item => {
      item.draw();
      return item.alive;
    })
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
      this.move();
      if (this.y > this.ctx.canvas.height) {
        this.alive = false;
        return false;
      }
    }
    this.ctx.translate(this.x, this.y);
    this.ctx.drawImage(this.img, -this.width / 2, 0, this.width, this.height);
    this.ctx.restore();
  }

  move() {
    switch (this.imgIndex) {
      case 4:
      case 6:
        this.x += window.gapTime * this.speed / 4;
        break;
      case 5:
      case 7:
      case 12:
        this.x -= window.gapTime * this.speed / 4;
        break;
      case 9:
      case 15:
        this.x -= window.gapTime * this.speed / 1.2;
        break;
      case 12:
      case 16:
        this.x += window.gapTime * this.speed / 1.2;
        break;
      case 17:
        this.y += 6;
        break;
    }
    this.y += window.gapTime * this.speed;
  }

  boom() {
    this.isBooming = true;
    let img = new Image();
    img.src = img_boom;
    this.img = img;
  }
}

export default EnemyPlane;