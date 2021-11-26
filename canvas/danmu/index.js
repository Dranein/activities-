let canvas = document.getElementById('canvas');
let video = document.getElementById('video');
let $txt = document.getElementById('text');
let $btn = document.getElementById('btn');
let $color = document.getElementById('color');
let $range = document.getElementById('range');

let data = [
	{value: '周杰伦的听妈妈的话，让我反复循环再循环', time: 0, color: 'red', speed: 1, fontSize: 22},
	// {value: '想快快长大，才能保护她', time: 4, color: '#00a1f5', speed: 1, fontSize: 30},
	// {value: '听妈妈的话吧，晚点再恋爱吧！爱呢？', time: 2.2},
	// {value: '听妈妈的话吧，晚点再恋爱吧！爱呢？', time: 7.3},
	// {value: '听妈妈的话吧，晚点再恋爱吧！爱呢？', time: 3.2},
	// {value: '听妈妈的话吧，晚点再恋爱吧！爱呢？', time: 1.2},
	// {value: '听妈妈的话吧，晚点再恋爱吧！爱呢？', time: 4},
	// {value: '听妈妈的话吧，晚点再恋爱吧！爱呢？', time: 10},
	// {value: '听妈妈的话吧，晚点再恋爱吧！爱呢？', time: 11},
	// {value: '听妈妈的话吧，晚点再恋爱吧！爱呢？', time: 12}
];

window.onload = () => {
	let canvasBarrage = new CanvasBarrage(canvas, video, {data});
	$btn.addEventListener('click', () => {
		let value = $txt.value;  // 输入的内容
		if(value) {
	    let time = video.currentTime + 1; // 当前视频时间
	    let color = $color.value;   // 选取的颜色值
	    let fontSize = $range.value; // 选取的字号大小
	    let obj = { value, time, color, fontSize };
	    canvasBarrage.add(obj);
    	// $txt.value = '';
		}
	})
}

class CanvasBarrage {
	constructor(canvas, video, opts = {}) {
		if (!canvas || !video) return;
		this.canvas = canvas;
		this.video = video;
		// 设置默认参数，如果没有传就给带上
    let defOpts = {
        color: '#e91e63',
        speed: 1.5,
        opacity: 0.5,
        fontSize: 20,
        data: []
    };
    // 合并对象并全都挂到this实例上
    Object.assign(this, defOpts, opts);
    this.canvas.width = video.width;
    this.canvas.height = video.height;
    this.ctx = canvas.getContext('2d');
  	this.isPaused = true;
  	this.barrages = this.data.map(item => new Barrage(item, this));  
		this.videoMothdes();
	}
	videoMothdes() {
		video.addEventListener('play', () => {
	    this.isPaused = false;
	    this.render();
		});
		video.addEventListener('pause', () => {
	    this.isPaused = true;
		});
		video.addEventListener('seeked', () => {
			this.replay();
		});
	}
	render() {
		this.clear();
		this.renderBarrage();
		if (this.isPaused === false) {
      requestAnimationFrame(this.render.bind(this));
    }
	}
	renderBarrage () {
		let time = this.video.currentTime;
		this.barrages.forEach(barrage => {
			if (!barrage.flag && time >= barrage.time) {
				if (!barrage.isInit) {
					barrage.init();
					barrage.isInit = true;
				}
				barrage.x -= barrage.speed;
	      barrage.render(); // 渲染当前弹幕
	      if (barrage.x < -barrage.width) {
          barrage.flag = true; // 把flag设为true下次就不再渲染
        }
			}
		})
	}
	replay() {
		this.clear();
    let time = this.video.currentTime;
    // 遍历barrages弹幕数组
    this.barrages.forEach(barrage => {
      barrage.flag = false;
      // 并且，当前视频时间小于等于当前弹幕所展现的时间
      if (time <= barrage.time) {
          // 就把isInit重设为false，这样才会重新初始化渲染
          barrage.isInit = false;
      } else { // 其他时间对比不匹配的，flag还是true不用重新渲染
          barrage.flag = true;
      }
    });
	}
	add(obj) {
		this.barrages.push(new Barrage(obj, this));
	}
	clear() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}
}

class Barrage {
	constructor(obj, canvasBarrage) {
		this.value = obj.value;
		this.time = obj.time;
		this.obj = obj;
		this.canvasBarrage = canvasBarrage;
	}	
	init() {
		this.color = this.obj.color || this.canvasBarrage.color;
		this.speed = this.obj.speed || this.canvasBarrage.speed;
		this.opacity = this.obj.opacity || this.canvasBarrage.opacity;
		this.fontSize = this.obj.fontSize || this.canvasBarrage.fontSize;
    let p = document.createElement('p');
    p.style.fontSize = this.fontSize + 'px';
    p.style.whiteSpace = "nowrap";
    p.style.position = "absolute";
    p.innerHTML = this.value;
    document.body.appendChild(p);
    this.width = p.clientWidth;
    document.body.removeChild(p);
    this.x = this.canvasBarrage.canvas.width;
    this.y = this.canvasBarrage.canvas.height * Math.random();
    
    if(this.y < this.fontSize) {
    	this.y = this.fontSize;
    } else if (this.y > this.y - this.fontSize) {
    	this.y = this.y - this.fontSize;
    }
	}
	render() {
		this.canvasBarrage.ctx.font = `${this.fontSize}px Arial`;
		this.canvasBarrage.ctx.fillStyle = this.color;
    this.canvasBarrage.ctx.fillText(this.value, this.x, this.y);
	}
}


