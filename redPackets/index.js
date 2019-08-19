class CanvasRedpacket {
	constructor ({el, redImgUrl, timeout, success, gameover}) {
		this.redPacketWarp = document.getElementById(el);
		if (!el || !this.redPacketWarp) {
			console.log('没有找到父级框架')
			return false;
		}
		this.fn_success = success;
		this.fn_gameover = gameover;
		this.timeout = timeout || 30000;
		this.redImgUrl = redImgUrl || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGIAAABoCAYAAAAKPiVoAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyppVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUuNSAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo0NjE2MjE4MEI3RUUxMUU5QTVBRjgxN0I4RTJDOUQ2NCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo0NjE2MjE4MUI3RUUxMUU5QTVBRjgxN0I4RTJDOUQ2NCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjQ2MTYyMTdFQjdFRTExRTlBNUFGODE3QjhFMkM5RDY0IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjQ2MTYyMTdGQjdFRTExRTlBNUFGODE3QjhFMkM5RDY0Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+VIHx7wAAF+RJREFU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';
		this.redPacketWarp.width = this.redPacketWarp.offsetWidth;
    this.redPacketWarp.height = this.redPacketWarp.offsetHeight;
	}
	init () {
		this.redPacketWarp.innerHTML = '';
    this.redPacketList = [];
    this.isOver = false;
    this.hasSelect = false;
    clearTimeout(this.timeoutFn);
	}
	startGame () {
		this.init();
		this.addEvent();
    this.addRedpacketList();
    this.render();
    this.timeoutFn = setTimeout(() => {
    	this.gameOver();
    }, this.timeout);
	}
	gameOver () {
		if (!this.hasSelect) {
			this.isOver = true;
			this.fn_gameover && this.fn_gameover();
		}
	}
	render () {
		this.renderRedpacket();
    requestAnimationFrame(this.render.bind(this));
	}
	renderRedpacket () {
		this.redPacketList.forEach(redPacket => {
			if (!redPacket.hasInit ) {
				redPacket.init();
				redPacket.hasInit = true;
			}
			redPacket.y += redPacket.speed;
      if (redPacket.y > this.redPacketWarp.height + redPacket.height + redPacket.speed*2) {
    		if (this.isOver || this.hasSelect) {
    			return false;
    		}
    		redPacket.reset();
      }
      redPacket.move();
		})
	}
	addEvent () {
		this.redPacketWarp.addEventListener('touchstart', (e) => {
			if (!this.hasSelect && !this.isOver) {
				let $RedPacket = this.getRedPacketById(e.target.getAttribute('data-id'));
		    if ($RedPacket) {
		    	this.hasSelect = true;
		    	$RedPacket.selected(() => {
    				clearTimeout(this.timeoutFn);
		    		this.fn_success && this.fn_success();
		    	});
		    }
			}
		})
	}
	getRedPacketById (id) {
		let result = false;
		if (id) {
			this.redPacketList.forEach((o) => {
				if (o.id.toString() === id.toString()) {
					result = o;
					return;
				}
			})
		}
		return result;
	}
	addRedpacketList () {
		let num = 0;
		let timeout = setInterval(() => {
			num++;
			if (num > 10) {
				clearInterval(timeout);
				return false;
			}
			this.add();
		}, 1000)
	}
	add () {
		let redPacket = new RedPacket(this, this.redImgUrl);
		this.redPacketList.push(redPacket);
	}
}
class RedPacket {
	constructor (canvasRedpacket, redImgUrl) {
		this.canvasRedpacket = canvasRedpacket;
		this.redImgUrl = redImgUrl;
		this.width = 50;
		this.height = 50;
		this.hasInit = false;
		this.checked = false;
		this.id = new Date().getTime().toString();
	}
	init () {
		this.y = 0;
		this.speed = Math.random()*2 + 3;
		this.x = (this.canvasRedpacket.redPacketWarp.width - this.width) * Math.random();
		this.$img = document.createElement('IMG');
		this.$img.src = this.redImgUrl;
		this.$img.setAttribute('data-id', this.id);
		this.$img.setAttribute('style', `
			position: absolute;
			left: ${this.x}px;
			top: -${this.height}px;
			width: ${this.width}px;
			height: ${this.height}px;
		`)
		this.canvasRedpacket.redPacketWarp.appendChild(this.$img);
	}
	selected (callBack) {
		this.checked = true;
		this.$img.setAttribute('style', `
			transition: all 1000ms;
			position: absolute;
			left: 50%;
			top: 50%;
			margin-left: -${this.width/2}px;
			margin-top: -${this.height/2}px;
			width: ${this.width}px;
			z-index: 10;
			height: ${this.height}px;
			transform: scale(1.5) translateY(0);
		`);
		setTimeout(() => {
			callBack && callBack();
		}, 1000);
	}
	reset () {
		if (!this.checked) {
			this.y = 0;
			this.speed = Math.random()*2 + 3;
			this.x = this.canvasRedpacket.redPacketWarp.width * Math.random();
		}
	}
	move() {
		if (!this.checked) {
			this.$img.style.transform = `translateY(${this.y}px)`;
		}
	}
}



