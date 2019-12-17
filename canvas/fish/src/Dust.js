let img_dustList = [];
for (let i = 0; i < 7; i++) {
  let img = new Image();
  img.src = require('./images/dust' + i + '.png').default;
  img_dustList.push(img);
}

class Dust{
  constructor({ctx}) {
    this.ctx = ctx;
    this.deltaTime = 0;
  }
  init() {
    this.x = Math.random() * this.ctx.canvas.width;
    this.y = Math.random() * this.ctx.canvas.height;
    this.img = img_dustList[Math.floor(Math.random() * 7)];
    this.amplitude = Math.random() * 60 + 10;
  }
  draw(){
    this.deltaTime += 0.01;
    let sin = Math.sin(this.deltaTime);
    let quadraticEndX = this.x + sin * this.amplitude;
    this.ctx.drawImage(this.img, quadraticEndX, this.y);
  }
}
export default Dust;