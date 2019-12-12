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

export default Kelp;