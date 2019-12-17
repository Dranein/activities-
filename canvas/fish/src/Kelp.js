class Kelp {
  constructor({x, y, height, width = 15, ctx}) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.ctx = ctx;
    this.color = '#37524b';
    this.alpha = 0.7;
    this.deltaTime = 0;
    this.quadraticEndX = 0;
    this.quadraticEndY = 0;
  }

  draw() {
    let {x, ctx, height, width, color, alpha} = this;
    this.deltaTime += 0.01;
    let sin = Math.sin(this.deltaTime);
    this.quadraticEndX = x + sin * 70;
    this.quadraticEndY = (ctx.canvas.height - height) + Math.abs(sin * 8);
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(x, ctx.canvas.height);
    ctx.quadraticCurveTo(x, (ctx.canvas.height - height) * 1.18, this.quadraticEndX, this.quadraticEndY);
    ctx.stroke(); // 进行绘制
    ctx.closePath();
    ctx.restore();
  }
}

export default Kelp;