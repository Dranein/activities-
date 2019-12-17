class Babyfish {
  constructor({x = 0, y = 0, ctx}) {
    this.x = x;
    this.y = y;
    this.width = 30;
    this.height = 34;
    this.tail_width = 20;
    this.tail_height = 22;
    this.eye_width = 6;
    this.eye_height = 6;
    this.ctx = ctx;
    this.angle = 0;
    this.alive = true;
  }

  init() {
    this.img_bodyList = [];
    this.curBody = 0;
    this.timeGap_body = 0;
    for (let i = 0; i < 19; i++) {
      let img = new Image();
      img.src = require('./images/babyFade' + i + '.png').default;
      this.img_bodyList.push(img);
    }

    this.img_tailList = [];
    this.curBigTail = 0;
    for (let i = 0; i < 7; i++) {
      let img = new Image();
      img.src = require('./images/bigTail' + i + '.png').default;
      this.img_tailList.push(img);
    }

    this.img_eyeList = [];
    this.curTimeset = 0;
    this.curEye = 0;
    for (let i = 0; i < 2; i++) {
      let img = new Image();
      img.src = require('./images/babyEye' + i + '.png').default;
      this.img_eyeList.push(img);
    }
  }

  draw() {
    let {x, y, width, height, ctx, angle, img_bodyList, curBody, img_tailList, curBigTail, curEye, tail_width, tail_height, img_eyeList, eye_width, eye_height} = this;
    this.curTimeset += window.gapTime;
    if (this.curTimeset % 100 > 60) {
      this.curBigTail = (this.curBigTail + 1) % 7;
    }

    this.curEye = this.curTimeset % 4000 > 3700 ? 1 : 0;

    this.timeGap_body += window.gapTime;
    if (this.timeGap_body > 200) {
      if (this.curBody >= img_bodyList.length - 1) {
        this.curBody = img_bodyList.length - 1;
        this.alive = false;
      } else {
        this.curBody = (this.curBody + 1) % img_bodyList.length;
      }
      this.timeGap_body %= 200;
    }

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.drawImage(img_tailList[curBigTail], -tail_width / 2 + 16, -tail_height / 2, tail_width, tail_height);
    ctx.drawImage(img_bodyList[curBody], -width / 2, -height / 2, width, height);
    ctx.drawImage(img_eyeList[curEye], -eye_width / 2, -eye_height / 2, eye_width, eye_height);
    ctx.restore();
  }

  eatFood() {
    this.curBody = 0;
  }
}

export default Babyfish;