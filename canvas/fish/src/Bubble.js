import img_blue from "./images/blue.png";
import img_fruit from "./images/fruit.png";

class Bubble {
  constructor({bubblePointList, ctx}) {
    this.width = 10;
    this.height = 10;
    this.ctx = ctx;
    this.img = new Image();
    this.speed = 0.05;
    this.bubblePointList = bubblePointList;
    this.bubbleIndex = 0;
  }

  init() {
    this.curWidth = 0;
    this.curHeight = 0;
    this.bubbleIndex = Math.round(Math.random() * (this.bubblePointList.length - 4)) + 2;
    this.speed = Math.random() * 0.1 + 0.06;
    this.img.src = [img_fruit, img_blue][Math.round(Math.random())];
    this.alive = true;
  }

  draw() {
    let {x, y, ctx, curHeight, curWidth, img, alive} = this;
    if (!alive) {
      this.init();
      return false;
    }
    if (this.curWidth < this.width) {
      this.growing();
    } else {
      this.y -= this.speed * window.gapTime;
      if (this.y < 0) {
        this.init();
        return false;
      }
    }
    ctx.drawImage(img, this.x - curWidth * 0.5, this.y - curHeight * 0.5, curWidth, curHeight);
  }

  growing() {
    this.curWidth += (0.08 * this.speed) * window.gapTime;
    this.curHeight += (0.08 * this.speed) * window.gapTime;
    this.x = this.bubblePointList[this.bubbleIndex].x;
    this.y = this.bubblePointList[this.bubbleIndex].y;
  }
}

export default Bubble;