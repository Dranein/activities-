let preTime = new Date();
let gapTime = 0;

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
    this.bubbleImg1 = new Image();
    this.bubbleImg2 = new Image();
    this.bubbleImg1.src = './img/pao1.png';
    this.bubbleImg2.src = './img/pao2.png';
    this.init();
  }

  init() {
    this.initKelp();
    this.addBubble();
    this.loop();
  }

  loop() {
    this.content1.clearRect(0, 0, this.width, this.height);
    gapTime = new Date() - preTime;
    preTime = new Date();
    this.animate();
    window.requestAnimationFrame(this.loop.bind(this));
  }

  animate() {
    this.kelpList.forEach(item => item.draw());
    this.bubbleList.forEach(item => {
      if (item.y > this.height) {
        item.alive = false;
      }
      item.growUp();
      item.draw();
    });
    this.addBubble();
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

  addBubble() {
    let {content1, bubbleNum, bubbleList, kelpList} = this;
    bubbleList = bubbleList.filter(item => item.alive);
    let poinArr = kelpList.map(item => {
      return {
        x: item.x,
        y: item.height
      }
    });
    if (bubbleList.length < bubbleNum) {
      let len = bubbleNum - bubbleList.length;
      for (let i = 0; i < len; i++) {
        const INDEX = Math.round(Math.random() * (this.kelpNum - 4)) + 2;
        let bubble = new Bubble({
          img: [this.bubbleImg1, this.bubbleImg2][Math.round(Math.random())],
          x: poinArr[INDEX].x,
          y: poinArr[INDEX].y,
          speed: Math.random() * 0.04 + 0.02,
          ctx: content1
        })
        bubbleList.push(bubble);
        bubble.draw();
      }
    }
    this.bubbleList = bubbleList;
  }
}

class Kelp {
  constructor({x, y, height, width = 15, ctx}) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.ctx = ctx;
    this.color = "#401c44";
    this.alpha = 0.7;
  }

  draw() {
    let {x, y, ctx, height, width, color, alpha} = this;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.lineCap = "round";
    ctx.moveTo(x, ctx.canvas.height);
    ctx.lineTo(x, ctx.canvas.height - height);
    ctx.stroke(); // 进行绘制
    ctx.closePath();
    ctx.restore();
  }
}

class Bubble {
  constructor({img, x, y, width = 10, height = 10, alive = true, speed = 0.05, ctx}) {
    this.x = x;
    this.y = y;
    this.curWidth = 0;
    this.curHeight = 0;
    this.width = width;
    this.height = height;
    this.alive = alive;
    this.ctx = ctx;
    this.img = img;
    this.speed = speed;
  }

  draw() {
    let {x, y, ctx, curHeight, curWidth, img} = this;
    ctx.drawImage(img, x - curWidth * 0.5, (ctx.canvas.height - y) - curHeight * 0.5, curWidth, curHeight);
  }

  growUp() {
    let {y, curHeight, curWidth, width, height} = this;
    if (curWidth < width) {
      this.curWidth += 0.02 * gapTime;
      this.curHeight += 0.02 * gapTime;
    } else {
      this.y += this.speed * gapTime;
    }

  }
}
