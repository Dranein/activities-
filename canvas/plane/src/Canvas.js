window.preTime = new Date();
window.gapTime = 0;

import {lerpDistance, lerpAngle, calLength2} from './helper';

import EnemyPlane from "./EnemyPlane";
import MyPlane from "./MyPlane";

let mouseX = 0;
let mouseY = 0;

class Canvas {
  constructor({el1, width, height, scoreFn, gameOverFn}) {
    this.el1 = el1;
    this.width = width;
    this.height = height;
    this.el1.width = this.width;
    this.el1.height = this.height;
    this.content1 = this.el1.getContext('2d');
    this.score = 0;
    this.scoreFn = scoreFn;
    this.gameOverFn = gameOverFn;

    this.myPlane = '';
    this.enemyPlaneList = [];
    this.timeGapToAddEnemyPlane = 0;

    this.isGameOver = false;
  }

  init() {
    this.initMyPlane();
    this.addEnemyPlane();

    this.addEvent();
    this.gameloop();
  }

  initMyPlane() {
    this.myPlane = new MyPlane({
      ctx: this.content1
    })
    mouseX = (this.width - this.myPlane.width) / 2;
    mouseY = this.height - this.myPlane.height - 20;
  }

  addEnemyPlane() {
    this.enemyPlaneList.push(new EnemyPlane({
      ctx: this.content1
    }))
  }

  gameloop() {
    this.content1.clearRect(0, 0, this.width, this.height);
    window.gapTime = new Date() - window.preTime;
    if (window.gapTime > 40) window.gapTime = 40;
    window.preTime = new Date();
    this.animate();
    window.requestAnimationFrame(this.gameloop.bind(this));
  }

  animate() {
    if (this.isGameOver) return;

    this.myPlane.x = lerpDistance(mouseX, this.myPlane.x, 0.85);
    this.myPlane.y = lerpDistance(mouseY, this.myPlane.y, 0.85);
    this.myPlane.draw();

    this.enemyPlaneList = this.enemyPlaneList.filter(item => {
      item.draw();
      return item.alive;
    })

    this.timeGapToAddEnemyPlane += window.gapTime;
    if (this.timeGapToAddEnemyPlane > Math.random() * 100 + 1900) {
      this.timeGapToAddEnemyPlane %= 2000;
      this.addEnemyPlane();
    }

    this.hit();

    this.checkLevel();

    // let babyBetaAngle = Math.atan2(this.babyFish.y - this.bigFish.y, this.babyFish.x - this.bigFish.x);
    // this.babyFish.angle = lerpAngle(babyBetaAngle, this.babyFish.angle, 0.8);
    // this.babyFish.x = lerpDistance(this.bigFish.x, this.babyFish.x, 0.98);
    // this.babyFish.y = lerpDistance(this.bigFish.y, this.babyFish.y, 0.98);
    // this.babyFish.draw();

  }

  checkLevel() {
    if (this.score > 200 && this.score <= 8000) {
      this.myPlane.level = 1;
    } else if (this.score > 8000 && this.score <= 15000) {
      this.myPlane.level = 2;
    } else if (this.score > 15000 && this.score <= 20000) {
      this.myPlane.level = 3;
    } else if (this.score > 20000 && this.score <= 30000) {
      this.myPlane.level = 4;
    } else if (this.score > 30000 && this.score <= 50000) {
      this.myPlane.level = 5;
    } else if (this.score > 50000 && this.score <= 100000) {
      this.myPlane.level = 6;
    } else if (this.score > 100000) {
      this.myPlane.level = 7;
    }
  }

  hit() {
    this.enemyPlaneList.forEach(enemyPlaneItem => {
      this.myPlane.bulletList.forEach(bullet => {
        let gap = calLength2(enemyPlaneItem.x, enemyPlaneItem.y, bullet.x, bullet.y);
        if (gap < 2000 && !enemyPlaneItem.isBooming) {
          enemyPlaneItem.boom();
          bullet.alive = false;
          this.score += 100;
          this.scoreFn && this.scoreFn(this.score);
        }
      })
    })
  }

  addEvent() {
    this.el1.addEventListener('mousemove', this.handleMousemove, false);
    this.el1.addEventListener('touchmove', this.handleTouchmove, false);
  }

  handleMousemove(e) {
    mouseX = e.offsetX;
    mouseY = e.offsetY;
  }

  handleTouchmove(e) {
    mouseX = e.touches[0].pageX;
    mouseY = e.touches[0].pageY;
  }
}

export default Canvas;