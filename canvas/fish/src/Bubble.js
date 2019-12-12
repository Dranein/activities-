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
  }

  init() {
    this.alive = true;
    this.curWidth = 0;
    this.curHeight = 0;
    const INDEX = Math.round(Math.random() * (this.bubblePointList.length - 4)) + 2;
    this.x = this.bubblePointList[INDEX].x;
    this.y = this.ctx.canvas.height - this.bubblePointList[INDEX].y;
    this.speed = Math.random() * 0.04 + 0.02;
    this.img.src = [img_blue, img_fruit][Math.round(Math.random())];
    this.draw();
  }

  draw() {
    let {x, y, ctx, curHeight, curWidth, img, alive} = this;
    if (!alive) this.init();
    if (this.curWidth < this.width) {
      this.curWidth += (0.12 * this.speed) * window.gapTime;
      this.curHeight += (0.12 * this.speed) * window.gapTime;
    } else {
      this.y -= this.speed * window.gapTime;
      if (this.y < 0) this.init();
    }
    ctx.drawImage(img, x - curWidth * 0.5, y - curHeight * 0.5, curWidth, curHeight);
  }
}

export default Bubble;