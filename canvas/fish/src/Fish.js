import img_body from "./images/big.png";

class Fish {
  constructor({x = 0, y = 0, ctx}) {
    this.x = x;
    this.y = y;
    this.tail_width = 25;
    this.tail_height = 28;
    this.eye_width = 7;
    this.eye_height = 7;
    this.width = 40;
    this.height = 44;
    this.ctx = ctx;
    this.angle = 0;
    this.foodType = 0;
    this.foodNumber = 0;
  }

  init() {
    this.img_tailList = [];
    for (let i = 0; i < 7; i++) {
      let img = new Image();
      img.src = require('./images/bigTail' + i + '.png').default;
      this.img_tailList.push(img);
    }

    this.img_eyeList = [];
    for (let i = 0; i < 2; i++) {
      let img = new Image();
      img.src = require('./images/bigEye' + i + '.png').default;
      this.img_eyeList.push(img);
    }

    let imgBody = new Image();
    imgBody.src = img_body;
    this.img_bodyType1List = [imgBody];
    this.img_bodyType2List = [imgBody];
    for (let i = 0; i < 7; i++) {
      let img = new Image();
      img.src = require('./images/bigSwim' + i + '.png').default;
      this.img_bodyType1List.push(img);
    }
    for (let i = 0; i < 7; i++) {
      let img = new Image();
      img.src = require('./images/bigSwimBlue' + i + '.png').default;
      this.img_bodyType2List.push(img);
    }
    this.img_bodyList = this.img_bodyType1List;

    this.curTimeset = 0;
    this.curTail = 0;
    this.curEye = 0;
  }

  draw() {
    let {x, y, width, height, ctx, angle, foodNumber, img_bodyList, img_tailList, curTail, curEye, tail_width, tail_height, img_eyeList, eye_width, eye_height} = this;
    this.curTimeset += window.gapTime;
    if (this.curTimeset % 100 > 60) {
      this.curTail = (curTail + 1) % 7;
    }
    this.curEye = this.curTimeset % 3000 < 200 ? 1 : 0;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.drawImage(img_tailList[curTail], -tail_width / 2 + 22, -tail_height / 2, tail_width, tail_height);
    ctx.drawImage(img_bodyList[foodNumber], -width / 2, -height / 2, width, height);
    ctx.drawImage(img_eyeList[curEye], -eye_width / 2, -eye_height / 2, eye_width, eye_height);
    ctx.restore();
  }

  eatFood (type) {
    this.foodNumber ++;
    this.foodType = type;
    if (this.foodNumber > 7) {
      this.foodNumber = 7;
    }
    if (this.foodType === 1) {
      this.img_bodyList = this.img_bodyType2List;
    } else {
      this.img_bodyList = this.img_bodyType1List;
    }
  }
}

export default Fish;