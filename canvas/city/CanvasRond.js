class MouseRound {
  constructor({x, y, r, content}) {
    this.content = content;
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = '#fff';
  }

  draw() {
    let {content, color, r, x, y} = this;
    content.fillStyle = color;
    content.shadowBlur = r * 5;
    content.shadowColor = '#fff';
    content.beginPath();
    content.arc(x, y, r, 0, 2 * Math.PI, false);
    content.closePath();
    content.fill();
  }

  move() {
    this.r -= 0.2;
    if (this.r < 0) return;
    this.draw();
  }
}

class RounItem {
  constructor({index, x, y, content}) {
    this.content = content;
    this.index = index;
    this.x = x;
    this.y = y;
    this.r = Math.random() * 2 + 1;
    let alpha = (Math.floor(Math.random() * 10) + 1) / 10 / 2;
    this.color = "rgba(255, 255, 255, " + alpha + ")";
  }

  draw() {
    let {content, color, r, x, y} = this;
    content.fillStyle = color;
    content.shadowBlur = r * 2;
    content.beginPath();
    content.arc(x, y, r, 0, 2 * Math.PI, false);
    content.closePath();
    content.fill();
  }

  move() {
    this.y -= 0.15;
    this.draw();
  }
}

class CanvasRond {
  constructor({el, width, height, initRoundPopulation}) {
    this.el = el;
    this.width = width;
    this.height = height;
    this.el.width = this.width;
    this.el.height = this.height;
    this.initRoundPopulation = initRoundPopulation;
    this.content = this.el.getContext('2d');
    this.init();
  }

  init() {
    this.rounds = [];
    let {content, initRoundPopulation, width, height} = this;
    for (let i = 0; i < initRoundPopulation; i++) {
      this.rounds[i] = new RounItem({
        index: i,
        x: Math.random() * width,
        y: Math.random() * height,
        content
      });
      this.rounds[i].draw();
    }
    this.addEventListener();
    this.render();
  }

  render() {
    let {width, height, content} = this;
    content.clearRect(0, 0, width, height);
    this.rounds.forEach(item => {
      item.y < 0 ? (item.y = height) : item.move();
    })
    this.mouseRounds.forEach((item, index) => {
      item.r < 0 ? this.mouseRounds.splice(index, 1) : item.move();
    })
    requestAnimationFrame(this.render.bind(this));
  }

  addEventListener() {
    this.mouseRounds = [];
    let lock = false;
    window.addEventListener('touchmove', e => {
      if (!lock) {
        lock = true;
        this.mouseRounds.push(new MouseRound({
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
          r: 6,
          content: this.content
        }));
        setTimeout(() => {
          lock = false
        }, 30);
      }
    })
  }
}

