import img_body from "./images/babyFade0.png";

class Babyfish {
  constructor({x = 0, y = 0, ctx}) {
    this.x = x;
    this.y = y;
    this.img_body = new Image();
    this.img_eye = new Image();
    this.tail_width = 12;
    this.tail_height = 15;
    this.eye_width = 5;
    this.eye_height = 5;
    this.width = 22;
    this.height = 24;
    this.ctx = ctx;
    this.angle = 0;
  }

  init() {
    this.img_tailList = [];
    for (let i = 0; i < 7; i++) {
      let img = new Image();
      img.src = require('./images/bigTail' + i + '.png').default;
      this.img_tailList.push(img);
    }

    this.img_eyeList = [];
    this.curEye = 0;
    for (let i = 0; i < 2; i++) {
      let img = new Image();
      img.src = require('./images/babyEye' + i + '.png').default;
      this.img_eyeList.push(img);
    }

    this.curTimeset = 0;
    this.curBigTail = 0;
    this.img_body.src = img_body;
  }

  draw() {
    let {x, y, width, height, ctx, angle, img_body, img_tailList, curBigTail, curEye, tail_width, tail_height, img_eyeList, eye_width, eye_height} = this;
    this.curTimeset += window.gapTime;
    if (this.curTimeset % 100 > 60) {
      this.curBigTail = (this.curBigTail + 1) % 7;
    }

    this.curEye = this.curTimeset % 4000 > 3700 ? 1 : 0;

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.drawImage(img_tailList[curBigTail], -tail_width / 2 + 12, -tail_height / 2, tail_width, tail_height);
    ctx.drawImage(img_body, -width / 2, -height / 2, width, height);
    ctx.drawImage(img_eyeList[curEye], -eye_width / 2, -eye_height / 2, eye_width, eye_height);
    ctx.restore();
  }
}

export default Babyfish;