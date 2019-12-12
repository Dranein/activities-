window.preTime = new Date();
window.gapTime = 0;

import {lerpDistance, lerpAngle, calLength2} from './commonFunctions';
import Bubble from "./Bubble";
import Kelp from "./Kelp";
import Fish from "./Fish";

let mouseX = 0;
let mouseY = 0;

class Canvas {
  constructor({el1, el2, width, height}) {
    this.el1 = el1;
    this.el2 = el2;
    this.width = width;
    this.height = height;
    this.el1.width = this.el2.width = this.width;
    this.el1.height = this.el2.height = this.height;
    this.content1 = this.el1.getContext('2d');
    this.content2 = this.el2.getContext('2d');

    this.kelpList = [];
    this.kelpNum = 50;
    this.bubbleList = [];
    this.bubbleNum = 15;
    this.bigFish = '';
    this.init();
  }

  init() {
    this.initKelp();
    this.initBubble();
    this.initFish();
    this.gameloop();
    this.addEvent();
  }

  initKelp() {
    let {content1, kelpNum, kelpList, height} = this;
    let gap = -10;
    for (let i = 0; i < kelpNum; i++) {
      let x = gap + (Math.random() * 1.2 + 0.3) * 15;
      let kelp = new Kelp({
        x,
        y: height,
        height: 80 + Math.random() * 50,
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

  gameloop() {
    this.content1.clearRect(0, 0, this.width, this.height);
    window.gapTime = new Date() - window.preTime;
    window.preTime = new Date();
    this.animate();
    window.requestAnimationFrame(this.gameloop.bind(this));
  }

  animate() {
    this.kelpList.forEach(item => item.draw());

    this.bubbleList.forEach(item => {
      item.draw();
      if (item.alive) {
        let gap = calLength2(item.x, item.y, this.bigFish.x, this.bigFish.y);
        if (gap < 900) item.alive = false;
      }
    });

    let betaAngle = Math.atan2(this.bigFish.y - mouseY, this.bigFish.x - mouseX);
    this.bigFish.angle = lerpAngle(betaAngle, this.bigFish.angle, 0.6);
    this.bigFish.x = lerpDistance(mouseX, this.bigFish.x, 0.9);
    this.bigFish.y = lerpDistance(mouseY, this.bigFish.y, 0.9);
    this.bigFish.draw();
  }

  addEvent() {
    this.el1.addEventListener('mousemove', e => {
      mouseX = e.offsetX;
      mouseY = e.offsetY;
    }, false)
  }
}

export default Canvas;