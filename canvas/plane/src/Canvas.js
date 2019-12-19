import {Howl} from 'howler';
import {lerpDistance, calLength2} from './helper';
import sound_boom from './sound/boom.mp3';

import EnemyPlane from "./EnemyPlane";
import MyPlane from "./MyPlane";
import sound_upgrade from "./sound/upgrade.mp3";

window.preTime = new Date();
window.gapTime = 0;
window.gameLevel = 0;

let mouseX = 0;
let mouseY = 0;

let soundBom = new Howl({
  src: sound_boom,
  volume: 0.2
});
let soundUpgrade = new Howl({
  src: sound_upgrade,
  volume: 0.8
});


class Canvas {
  constructor({el1, width, height, scoreFn, gameOverFn}) {
    this.el1 = el1;
    this.width = width;
    this.height = height;
    this.el1.width = this.width;
    this.el1.height = this.height;
    this.content1 = this.el1.getContext('2d');
    this.scoreFn = scoreFn;
    this.gameOverFn = gameOverFn;
  }

  init() {
    window.gameLevel = 0;
    this.score = 0;
    this.myPlane = '';
    this.enemyPlaneList = [];
    this.timeGapToAddEnemyPlane = 0;
    this.isGameOver = false;
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
    if (this.isGameOver) return;
    window.gapTime = new Date() - window.preTime;
    if (window.gapTime > 40) window.gapTime = 40;
    window.preTime = new Date();
    this.animate();
    window.requestAnimationFrame(this.gameloop.bind(this));
  }

  animate() {
    this.myPlane.x = lerpDistance(mouseX, this.myPlane.x, 0.85);
    this.myPlane.y = lerpDistance(mouseY, this.myPlane.y, 0.85);
    this.myPlane.draw();

    this.enemyPlaneList = this.enemyPlaneList.filter(item => {
      item.draw();
      return item.alive;
    })

    this.timeGapToAddEnemyPlane += window.gapTime;
    let timer = 2000 - window.gameLevel * 220;
    if (this.timeGapToAddEnemyPlane > Math.random() * 100  + (timer - 100)) {
      this.timeGapToAddEnemyPlane %= timer;
      this.addEnemyPlane();
    }

    this.hit();
    this.checkGameStatus();

    // let babyBetaAngle = Math.atan2(this.babyFish.y - this.bigFish.y, this.babyFish.x - this.bigFish.x);
    // this.babyFish.angle = lerpAngle(babyBetaAngle, this.babyFish.angle, 0.8);
    // this.babyFish.x = lerpDistance(this.bigFish.x, this.babyFish.x, 0.98);
    // this.babyFish.y = lerpDistance(this.bigFish.y, this.babyFish.y, 0.98);
    // this.babyFish.draw();
  }

  checkGameStatus() {
    if (!this.myPlane.alive) {
      this.isGameOver = true;
      this.gameOverFn && this.gameOverFn(this.score);
    }
  }

  checkLevel() {
    // let arr = [2000, 8000, 15000, 20000, 50000, 100000, 200000];
    let arr = [1000, 2000, 3000, 4000, 5000, 6000, 7000];
    if (arr.indexOf(this.score) > -1) {
      this.myPlane.upgrade();
      soundUpgrade.play();
      window.gameLevel++;
    }
  }

  hit() {
    this.enemyPlaneList.forEach(enemyPlaneItem => {
      let MyPlaneGap = calLength2(enemyPlaneItem.x, enemyPlaneItem.y, this.myPlane.x, this.myPlane.y);
      if (MyPlaneGap < 3500 && !enemyPlaneItem.isBooming) {
        this.myPlane.boom();
        return false;
      }
      this.myPlane.bulletList.forEach(bullet => {
        let gap = calLength2(enemyPlaneItem.x, enemyPlaneItem.y, bullet.x, bullet.y);
        if (gap < 1600 && !enemyPlaneItem.isBooming) {
          enemyPlaneItem.boom();
          soundBom.play();
          bullet.alive = false;
          this.score += 100;
          this.scoreFn && this.scoreFn(this.score);
          this.checkLevel();
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
    e.preventDefault();
    e.stopPropagation();
    mouseX = e.touches[0].pageX;
    mouseY = e.touches[0].pageY;
  }
}

export default Canvas;