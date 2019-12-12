import img_big from "./images/big.png";
import img_bigTail0 from "./images/bigTail0.png";
import img_bigEye0 from "./images/bigEye0.png";

class Fish {
  constructor({x = 0, y = 0, ctx}) {
    this.x = x;
    this.y = y;
    this.img_body = new Image();
    this.img_tail = new Image();
    this.img_eye = new Image();
    this.tail_width = 20;
    this.tail_height = 25;
    this.eye_width = 5;
    this.eye_height = 5;
    this.width = 30;
    this.height = 34;
    this.ctx = ctx;
    this.angle = 0;
  }

  init() {
    this.img_body.src = img_big;
    this.img_tail.src = img_bigTail0;
    this.img_eye.src = img_bigEye0;
    this.draw();
  }

  draw() {
    let {x, y, width, height, ctx, angle, img_body, img_tail, tail_width, tail_height, img_eye, eye_width, eye_height} = this;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.drawImage(img_body, -this.width / 2, -this.height / 2, width, height);
    ctx.drawImage(img_tail, -tail_width / 2 + 18, -tail_height / 2, tail_width, tail_height);
    ctx.drawImage(img_eye, -eye_width / 2, -eye_height / 2, eye_width, eye_height);
    ctx.restore();
  }
}

export default Fish;