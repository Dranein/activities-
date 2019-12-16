window.preTime = new Date();
window.gapTime = 0;

import {lerpDistance, lerpAngle, calLength2} from './commonFunctions';
import Bubble from "./Bubble";
import Kelp from "./Kelp";
import Fish from "./Fish";
import Babyfish from "./Babyfish";

let mouseX = 0;
let mouseY = 0;

class Canvas {
  constructor({el1, width, height, scoreFn, gameOverFn}) {
    this.el1 = el1;
    this.width = width;
    this.height = height;
    this.el1.width  = this.width;
    this.el1.height  = this.height;
    this.content1 = this.el1.getContext('2d');
    this.score = 0;
    this.scoreFn = scoreFn;
    this.gameOverFn = gameOverFn;

    this.kelpList = [];
    this.kelpNum = 60;
    this.bubbleList = [];
    this.bubbleNum = 20;
    this.bigFish = '';
    this.babyFish = '';
    this.isGameOver = false;
  }

  init() {
    this.initKelp();
    this.initBubble();
    this.initFish();
    this.initBabyFish();
    this.gameloop();
    this.addEvent();
  }

  initKelp() {
    let {content1, kelpNum, kelpList, height} = this;
    let gap = -50;
    for (let i = 0; i < kelpNum; i++) {
      let x = gap + (Math.random() * 1.2 + 0.3) * 15;
      let kelp = new Kelp({
        x,
        y: height,
        height: 120 + Math.random() * 100,
        ctx: content1
      })
      gap = x;
      kelpList.push(kelp);
      kelp.draw();
    }
  }

  initBubble() {
    let {content1, bubbleNum, kelpList} = this;
    let bubblePointList = kelpList.map(item => ({
      x: item.x,
      y: item.height
    }));
    for (let i = 0; i < bubbleNum; i++) {
      let bubble = new Bubble({
        bubblePointList,
        ctx: content1
      })
      this.bubbleList.push(bubble);
      bubble.init();
    }
  }

  initFish() {
    this.bigFish = new Fish({
      x: this.width / 2,
      y: this.height / 2,
      ctx: this.content1
    })
    mouseX = this.width / 2;
    mouseY = this.height / 2;
    this.bigFish.init();
  }

  initBabyFish() {
    this.babyFish = new Babyfish({
      x: this.width / 2 + 50,
      y: this.height / 2 + 50,
      ctx: this.content1
    })
    this.babyFish.init();
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
    let bubblePointList = [];
    this.kelpList.forEach(item => {
      item.draw()
      bubblePointList.push({
        x: item.quadraticEndX,
        y: item.quadraticEndY
      })
    });

    this.bubbleList.forEach(item => {
      item.bubblePointList = bubblePointList;
      item.draw();
      this.fishEatubble(item);
    });

    let babyBetaAngle = Math.atan2(this.babyFish.y - this.bigFish.y, this.babyFish.x - this.bigFish.x);
    this.babyFish.angle = lerpAngle(babyBetaAngle, this.babyFish.angle, 0.8);
    this.babyFish.x = lerpDistance(this.bigFish.x, this.babyFish.x, 0.98);
    this.babyFish.y = lerpDistance(this.bigFish.y, this.babyFish.y, 0.98);
    this.babyFish.draw();

    let betaAngle = Math.atan2(this.bigFish.y - mouseY, this.bigFish.x - mouseX);
    this.bigFish.angle = lerpAngle(betaAngle, this.bigFish.angle, 0.6);
    this.bigFish.x = lerpDistance(mouseX, this.bigFish.x, 0.9);
    this.bigFish.y = lerpDistance(mouseY, this.bigFish.y, 0.9);
    this.bigFish.draw();

    if (this.isGameOver) return;
    if (!this.babyFish.alive) {
      this.isGameOver = true;
      this.el1.removeEventListener ('mousemove', this.handleMousemove, false);
      this.el1.removeEventListener ('touchmove', this.handleTouchmove, false);
      this.gameOverFn && this.gameOverFn(this.score);
      return false;
    }
    this.fishFeed();
  }

  // 鱼吃东西
  fishEatubble(item) {
    if (item.alive) {
      let gap = calLength2(item.x, item.y, this.bigFish.x, this.bigFish.y);
      if (gap < 900) {
        this.bigFish.eatFood(item.type);
        item.die();
        item.init();
      }
    }
  }

  fishFeed() {
    if (this.bigFish.foodNumber > 0) {
      let gap = calLength2(this.babyFish.x, this.babyFish.y, this.bigFish.x, this.bigFish.y);
      if (gap < 900) {
        this.babyFish.eatFood();
        this.score += parseInt(this.bigFish.foodType === 1 ? 200 : 100) * this.bigFish.foodNumber;
        this.scoreFn && this.scoreFn(this.score);
        this.bigFish.foodNumber = 0;
      }
    }
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