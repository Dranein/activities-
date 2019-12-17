class Wave{
  constructor({x, y, ctx, radius=30, color='#fff'}){
    this.x = x;
    this.y = y;
    this.ctx = ctx;
    this.curRadius = 0;
    this.radius = radius;
    this.alive = true;
    this.color = color;
  }
  draw () {
    this.curRadius += window.gapTime * 0.04 + this.radius * 0.005;
    let {x, y, ctx, curRadius, radius, color} = this;
    let alpha = 1 - curRadius / radius;
    if (curRadius > radius) {
      this.alive = false;
      return;
    }
    ctx.save();
    ctx.lineWidth = 2;
    ctx.shadowBlur = 10;
    ctx.shadowColor = color;
    ctx.globalAlpha = alpha;
    ctx.beginPath();
    ctx.arc(x, y,curRadius,0,2*Math.PI);
    ctx.closePath();
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.restore();
  }
}

export default Wave;