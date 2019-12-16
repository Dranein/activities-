/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 16);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./bigTail0.png": 5,
	"./bigTail1.png": 21,
	"./bigTail2.png": 22,
	"./bigTail3.png": 23,
	"./bigTail4.png": 24,
	"./bigTail5.png": 25,
	"./bigTail6.png": 26,
	"./bigTail7.png": 27
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 0;

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return imgPreLoad; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return setRequestAnimFrame; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return calLength2; });
/* unused harmony export randomColor */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return lerpAngle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return lerpDistance; });
/* unused harmony export inOboundary */
/* unused harmony export rgbColor */
/* unused harmony export rgbNum */
/* unused harmony export rnd */
/* unused harmony export rateRandom */
/* unused harmony export distance */
/* unused harmony export AABBbox */
/* unused harmony export dis2 */
/* unused harmony export rndi2 */
function setRequestAnimFrame() {
	window.requestAnimFrame = (function() {
		return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
			function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
				return window.setTimeout(callback, 1000 / 60);
			};
	})();
}

function imgPreLoad({imgList, progressCallback, sucessCallback}) {
	const len = imgList.length;
	let num = 0;
	if (imgList.length < 0) {
		sucessCallback && sucessCallback();
		return false;
	}
	for(let i = 0; i < len; i++){
		let imgSrc = imgList[i];
		let img = new Image();
		img.src = imgSrc;
		img.onload = () => {
			num ++;
			progressCallback && progressCallback(num / len);
			if (num === len) {
				sucessCallback && sucessCallback();
			}
		}
	}
}

// 求两个坐标点的距离，结果为平方值；
function calLength2(x1, y1, x2, y2) {
	return Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2);
}

// 角度趋向
function lerpAngle(a, b, t) {
	var d = b - a;
	if (d > Math.PI) d = d - 2 * Math.PI;
	if (d < -Math.PI) d = d + 2 * Math.PI;
	return a + d * t;
}

// 距离趋向
function lerpDistance(aim, cur, ratio) {
	var delta = cur - aim;
	return aim + delta * ratio;
}

function randomColor() {
	var col = [0, 1, 2];
	col[0] = Math.random() * 100 + 155;
	col[0] = col[0].toFixed();
	col[1] = Math.random() * 100 + 155;
	col[1] = col[1].toFixed();
	col[2] = Math.random() * 100 + 155;
	col[2] = col[2].toFixed();
	var num = Math.floor(Math.random() * 3);
	col[num] = 0;
	return "rgba(" + col[0] + "," + col[1] + "," + col[2] + ",";
}

function inOboundary(arrX, arrY, l, r, t, b) { //在l r t b范围内的检测
	return arrX > l && arrX < r && arrY > t && arrY < b;
}

function rgbColor(r, g, b) {
	r = Math.round(r * 256);
	g = Math.round(g * 256);
	b = Math.round(b * 256);
	return "rgba(" + r + "," + g + "," + b + ",1)";
}

function rgbNum(r, g, b) {
	r = Math.round(r * 256);
	g = Math.round(g * 256);
	b = Math.round(b * 256);
	return "rgba(" + r + "," + g + "," + b;
}

function rnd(m) {
	var n = m || 1;
	return Math.random() * n;
}

function rateRandom(m, n) {
	var sum = 0;
	for (var i = 1; i < (n - m); i++) {
		sum += i;

	}

	var ran = Math.random() * sum;

	for (var i = 1; i < (n - m); i++) {
		ran -= i;
		if (ran < 0) {
			return i - 1 + m;
		}
	}
}

function distance(x1, y1, x2, y2, l) {
	var x = Math.abs(x1 - x2);
	var y = Math.abs(y1 - y2);
	if (x < l && y < l) {
		return true;
	}
	return false;
}

function AABBbox(object1, w1, h1, object2, w2, h2, overlap) {
	A1 = object1.x + overlap;
	B1 = object1.x + w1 - overlap;
	C1 = object1.y + overlap;
	D1 = object1.y + h1 - overlap;

	A2 = object2.x + overlap;
	B2 = object2.x + w2 - overlap;
	C2 = object2.y + overlap;
	D2 = object2.y + h2 - overlap;

	if (A1 > B2 || B1 < A2 || C1 > D2 || D1 < C2) return false;
	else return true;
}

function dis2(x, y, x0, y0) {
	var dx = x - x0;
	var dy = y - y0;
	return dx * dx + dy * dy;
}

function rndi2(m, n) {
	var a = Math.random() * (n - m) + m;
	return Math.floor(a);
}



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ("./img/blue.png");

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ("./img/fruit.png");

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ("./img/big.png");

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = ("./img/bigTail0.png");

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = ("./img/bigEye0.png");

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = ("./img/bigSwimBlue0.png");

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = ("./img/bigSwimBlue1.png");

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = ("./img/bigSwimBlue2.png");

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = ("./img/bigSwimBlue3.png");

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = ("./img/bigSwimBlue4.png");

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = ("./img/bigSwimBlue5.png");

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = ("./img/bigSwimBlue6.png");

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = ("./img/bigSwimBlue7.png");

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./babyFade0.png": 41,
	"./babyFade1.png": 42,
	"./babyFade10.png": 43,
	"./babyFade11.png": 44,
	"./babyFade12.png": 45,
	"./babyFade13.png": 46,
	"./babyFade14.png": 47,
	"./babyFade15.png": 48,
	"./babyFade16.png": 49,
	"./babyFade17.png": 50,
	"./babyFade18.png": 51,
	"./babyFade19.png": 52,
	"./babyFade2.png": 53,
	"./babyFade3.png": 54,
	"./babyFade4.png": 55,
	"./babyFade5.png": 56,
	"./babyFade6.png": 57,
	"./babyFade7.png": 58,
	"./babyFade8.png": 59,
	"./babyFade9.png": 60
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 15;

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__commonFunctions__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Canvas__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__css_index_scss__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__css_index_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__css_index_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__images_blue_png__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__images_fruit_png__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__images_big_png__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__images_bigEye0_png__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__images_bigTail0_png__ = __webpack_require__(5);










let img_bigTailList = [];
let img_bigBodyList = [];
for (let i = 0; i < 7; i++) {
  img_bigTailList.push(__webpack_require__(0)("./bigTail" + i + '.png').default);
}
for (let i = 0; i < 19; i++) {
  img_bigBodyList.push(__webpack_require__(15)("./babyFade" + i + '.png').default);
}

Object(__WEBPACK_IMPORTED_MODULE_0__commonFunctions__["e" /* setRequestAnimFrame */])();

window.onload = () => {
  Object(__WEBPACK_IMPORTED_MODULE_0__commonFunctions__["b" /* imgPreLoad */])({
    imgList: [
      __WEBPACK_IMPORTED_MODULE_5__images_big_png__["a" /* default */],
      __WEBPACK_IMPORTED_MODULE_6__images_bigEye0_png__["default"],
      __WEBPACK_IMPORTED_MODULE_7__images_bigTail0_png__["default"],
      __WEBPACK_IMPORTED_MODULE_3__images_blue_png__["a" /* default */],
      __WEBPACK_IMPORTED_MODULE_4__images_fruit_png__["a" /* default */],
      ...img_bigTailList,
      ...img_bigBodyList
    ],
    progressCallback: progress => {

    },
    sucessCallback: () => {
      rederCanvas();
    }
  });
}

function rederCanvas () {
  let canvas1 = document.getElementById('canvas1');
  let gameoverDom = document.getElementById('gameover');
  let startDom = document.getElementById('start');
  let scoreDomList = document.getElementsByClassName('score');
  let parentNode = canvas1.parentNode;
  let canvasObj = new __WEBPACK_IMPORTED_MODULE_1__Canvas__["a" /* default */]({
    el1: canvas1,
    width: parentNode.offsetWidth,
    height: parentNode.offsetHeight,
    scoreFn: score => {
      if (scoreDomList && scoreDomList.length > 0) {
        for (let i = 0; i < scoreDomList.length; i++) {
          scoreDomList[i].innerHTML = score;
        }
      }
    },
    gameOverFn: score => {
      gameoverDom.classList.remove("hide");
    }
  })
  startDom.onclick = () => {
    startDom.parentNode.classList.add("hide");
    canvasObj.init();
  }
}


/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__commonFunctions__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Bubble__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Kelp__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Fish__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Babyfish__ = __webpack_require__(40);
window.preTime = new Date();
window.gapTime = 0;







let mouseX = 0;
let mouseY = 0;

class Canvas {
  constructor({el1, width, height, scoreFn, gameOverFn}) {
    this.el1 = el1;
    this.width = width;
    this.height = height;
    this.el1.width  = this.width;
    this.el1.height  = this.height;
    this.content1 = this.el1.getContext('2d');
    this.score = 0;
    this.scoreFn = scoreFn;
    this.gameOverFn = gameOverFn;

    this.kelpList = [];
    this.kelpNum = 60;
    this.bubbleList = [];
    this.bubbleNum = 20;
    this.bigFish = '';
    this.babyFish = '';
    this.isGameOver = false;
  }

  init() {
    this.initKelp();
    this.initBubble();
    this.initFish();
    this.initBabyFish();
    this.gameloop();
    this.addEvent();
  }

  initKelp() {
    let {content1, kelpNum, kelpList, height} = this;
    let gap = -50;
    for (let i = 0; i < kelpNum; i++) {
      let x = gap + (Math.random() * 1.2 + 0.3) * 15;
      let kelp = new __WEBPACK_IMPORTED_MODULE_2__Kelp__["a" /* default */]({
        x,
        y: height,
        height: 120 + Math.random() * 100,
        ctx: content1
      })
      gap = x;
      kelpList.push(kelp);
      kelp.draw();
    }
  }

  initBubble() {
    let {content1, bubbleNum, kelpList} = this;
    let bubblePointList = kelpList.map(item => ({
      x: item.x,
      y: item.height
    }));
    for (let i = 0; i < bubbleNum; i++) {
      let bubble = new __WEBPACK_IMPORTED_MODULE_1__Bubble__["a" /* default */]({
        bubblePointList,
        ctx: content1
      })
      this.bubbleList.push(bubble);
      bubble.init();
    }
  }

  initFish() {
    this.bigFish = new __WEBPACK_IMPORTED_MODULE_3__Fish__["a" /* default */]({
      x: this.width / 2,
      y: this.height / 2,
      ctx: this.content1
    })
    mouseX = this.width / 2;
    mouseY = this.height / 2;
    this.bigFish.init();
  }

  initBabyFish() {
    this.babyFish = new __WEBPACK_IMPORTED_MODULE_4__Babyfish__["a" /* default */]({
      x: this.width / 2 + 50,
      y: this.height / 2 + 50,
      ctx: this.content1
    })
    this.babyFish.init();
  }

  gameloop() {
    this.content1.clearRect(0, 0, this.width, this.height);
    window.gapTime = new Date() - window.preTime;
    if (window.gapTime > 40) window.gapTime = 40;
    window.preTime = new Date();
    this.animate();
    window.requestAnimationFrame(this.gameloop.bind(this));
  }

  animate() {
    let bubblePointList = [];
    this.kelpList.forEach(item => {
      item.draw()
      bubblePointList.push({
        x: item.quadraticEndX,
        y: item.quadraticEndY
      })
    });

    this.bubbleList.forEach(item => {
      item.bubblePointList = bubblePointList;
      item.draw();
      this.fishEatubble(item);
    });

    let babyBetaAngle = Math.atan2(this.babyFish.y - this.bigFish.y, this.babyFish.x - this.bigFish.x);
    this.babyFish.angle = Object(__WEBPACK_IMPORTED_MODULE_0__commonFunctions__["c" /* lerpAngle */])(babyBetaAngle, this.babyFish.angle, 0.8);
    this.babyFish.x = Object(__WEBPACK_IMPORTED_MODULE_0__commonFunctions__["d" /* lerpDistance */])(this.bigFish.x, this.babyFish.x, 0.98);
    this.babyFish.y = Object(__WEBPACK_IMPORTED_MODULE_0__commonFunctions__["d" /* lerpDistance */])(this.bigFish.y, this.babyFish.y, 0.98);
    this.babyFish.draw();

    let betaAngle = Math.atan2(this.bigFish.y - mouseY, this.bigFish.x - mouseX);
    this.bigFish.angle = Object(__WEBPACK_IMPORTED_MODULE_0__commonFunctions__["c" /* lerpAngle */])(betaAngle, this.bigFish.angle, 0.6);
    this.bigFish.x = Object(__WEBPACK_IMPORTED_MODULE_0__commonFunctions__["d" /* lerpDistance */])(mouseX, this.bigFish.x, 0.9);
    this.bigFish.y = Object(__WEBPACK_IMPORTED_MODULE_0__commonFunctions__["d" /* lerpDistance */])(mouseY, this.bigFish.y, 0.9);
    this.bigFish.draw();

    if (this.isGameOver) return;
    if (!this.babyFish.alive) {
      this.isGameOver = true;
      this.el1.removeEventListener ('mousemove', this.handleMousemove, false);
      this.el1.removeEventListener ('touchmove', this.handleTouchmove, false);
      this.gameOverFn && this.gameOverFn(this.score);
      return false;
    }
    this.fishFeed();
  }

  // 鱼吃东西
  fishEatubble(item) {
    if (item.alive) {
      let gap = Object(__WEBPACK_IMPORTED_MODULE_0__commonFunctions__["a" /* calLength2 */])(item.x, item.y, this.bigFish.x, this.bigFish.y);
      if (gap < 900) {
        this.bigFish.eatFood(item.type);
        item.die();
        item.init();
      }
    }
  }

  fishFeed() {
    if (this.bigFish.foodNumber > 0) {
      let gap = Object(__WEBPACK_IMPORTED_MODULE_0__commonFunctions__["a" /* calLength2 */])(this.babyFish.x, this.babyFish.y, this.bigFish.x, this.bigFish.y);
      if (gap < 900) {
        this.babyFish.eatFood();
        this.score += parseInt(this.bigFish.foodType === 1 ? 200 : 100) * this.bigFish.foodNumber;
        this.scoreFn && this.scoreFn(this.score);
        this.bigFish.foodNumber = 0;
      }
    }
  }

  addEvent() {
    this.el1.addEventListener('mousemove', this.handleMousemove, false);
    this.el1.addEventListener('touchmove', this.handleTouchmove, false);
  }

  handleMousemove(e) {
    mouseX = e.offsetX;
    mouseY = e.offsetY;
  }

  handleTouchmove(e) {
    mouseX = e.touches[0].pageX;
    mouseY = e.touches[0].pageY;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Canvas);

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__images_blue_png__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__images_fruit_png__ = __webpack_require__(3);



class Bubble {
  constructor({bubblePointList, ctx}) {
    this.width = 10;
    this.height = 10;
    this.ctx = ctx;
    this.img = new Image();
    this.speed = 0.05;
    this.bubblePointList = bubblePointList;
    this.bubbleIndex = 0;
    this.type = 0;
  }

  init() {
    this.curWidth = 0;
    this.curHeight = 0;
    this.bubbleIndex = Math.round(Math.random() * (this.bubblePointList.length - 4)) + 2;
    this.speed = Math.random() * 0.1 + 0.06;
    this.type = Math.round(Math.random());
    this.img.src = [__WEBPACK_IMPORTED_MODULE_1__images_fruit_png__["a" /* default */], __WEBPACK_IMPORTED_MODULE_0__images_blue_png__["a" /* default */]][this.type];
    this.alive = true;
  }

  draw() {
    let {y, ctx, curHeight, curWidth, img} = this;
    if (this.curWidth < this.width) {
      this.growing();
    } else {
      this.y -= this.speed * window.gapTime;
      if (y < 0) {
        this.init();
        return false;
      }
    }
    ctx.drawImage(img, this.x - curWidth * 0.5, this.y - curHeight * 0.5, curWidth, curHeight);
  }

  die() {
    this.alive = false;
    this.curWidth = 0;
    this.curHeight = 0;
  }

  growing() {
    this.curWidth += (0.08 * this.speed) * window.gapTime;
    this.curHeight += (0.08 * this.speed) * window.gapTime;
    this.x = this.bubblePointList[this.bubbleIndex].x;
    this.y = this.bubblePointList[this.bubbleIndex].y;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Bubble);

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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

/* harmony default export */ __webpack_exports__["a"] = (Kelp);

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__images_big_png__ = __webpack_require__(4);


class Fish {
  constructor({x = 0, y = 0, ctx}) {
    this.x = x;
    this.y = y;
    this.tail_width = 20;
    this.tail_height = 25;
    this.eye_width = 7;
    this.eye_height = 7;
    this.width = 30;
    this.height = 34;
    this.ctx = ctx;
    this.angle = 0;
    this.foodType = 0;
    this.foodNumber = 0;
  }

  init() {
    this.img_tailList = [];
    for (let i = 0; i < 7; i++) {
      let img = new Image();
      img.src = __webpack_require__(0)("./bigTail" + i + '.png').default;
      this.img_tailList.push(img);
    }

    this.img_eyeList = [];
    for (let i = 0; i < 2; i++) {
      let img = new Image();
      img.src = __webpack_require__(28)("./bigEye" + i + '.png').default;
      this.img_eyeList.push(img);
    }

    let imgBody = new Image();
    imgBody.src = __WEBPACK_IMPORTED_MODULE_0__images_big_png__["a" /* default */];
    this.img_bodyType1List = [imgBody];
    this.img_bodyType2List = [imgBody];
    for (let i = 0; i < 7; i++) {
      let img = new Image();
      img.src = __webpack_require__(30)("./bigSwim" + i + '.png').default;
      this.img_bodyType1List.push(img);
    }
    for (let i = 0; i < 7; i++) {
      let img = new Image();
      img.src = __webpack_require__(39)("./bigSwimBlue" + i + '.png').default;
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
    ctx.drawImage(img_tailList[curTail], -tail_width / 2 + 18, -tail_height / 2, tail_width, tail_height);
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

/* harmony default export */ __webpack_exports__["a"] = (Fish);

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = ("./img/bigTail1.png");

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = ("./img/bigTail2.png");

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = ("./img/bigTail3.png");

/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = ("./img/bigTail4.png");

/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = ("./img/bigTail5.png");

/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = ("./img/bigTail6.png");

/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = ("./img/bigTail7.png");

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./bigEye0.png": 6,
	"./bigEye1.png": 29
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 28;

/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = ("./img/bigEye1.png");

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./bigSwim0.png": 31,
	"./bigSwim1.png": 32,
	"./bigSwim2.png": 33,
	"./bigSwim3.png": 34,
	"./bigSwim4.png": 35,
	"./bigSwim5.png": 36,
	"./bigSwim6.png": 37,
	"./bigSwim7.png": 38,
	"./bigSwimBlue0.png": 7,
	"./bigSwimBlue1.png": 8,
	"./bigSwimBlue2.png": 9,
	"./bigSwimBlue3.png": 10,
	"./bigSwimBlue4.png": 11,
	"./bigSwimBlue5.png": 12,
	"./bigSwimBlue6.png": 13,
	"./bigSwimBlue7.png": 14
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 30;

/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = ("./img/bigSwim0.png");

/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = ("./img/bigSwim1.png");

/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = ("./img/bigSwim2.png");

/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = ("./img/bigSwim3.png");

/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = ("./img/bigSwim4.png");

/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = ("./img/bigSwim5.png");

/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = ("./img/bigSwim6.png");

/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = ("./img/bigSwim7.png");

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./bigSwimBlue0.png": 7,
	"./bigSwimBlue1.png": 8,
	"./bigSwimBlue2.png": 9,
	"./bigSwimBlue3.png": 10,
	"./bigSwimBlue4.png": 11,
	"./bigSwimBlue5.png": 12,
	"./bigSwimBlue6.png": 13,
	"./bigSwimBlue7.png": 14
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 39;

/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Babyfish {
  constructor({x = 0, y = 0, ctx}) {
    this.x = x;
    this.y = y;
    this.tail_width = 12;
    this.tail_height = 15;
    this.eye_width = 5;
    this.eye_height = 5;
    this.width = 22;
    this.height = 24;
    this.ctx = ctx;
    this.angle = 0;
    this.alive = true;
  }

  init() {
    this.img_bodyList = [];
    this.curBody = 0;
    this.timeGap_body = 0;
    for (let i = 0; i < 19; i++) {
      let img = new Image();
      img.src = __webpack_require__(15)("./babyFade" + i + '.png').default;
      this.img_bodyList.push(img);
    }

    this.img_tailList = [];
    this.curBigTail = 0;
    for (let i = 0; i < 7; i++) {
      let img = new Image();
      img.src = __webpack_require__(0)("./bigTail" + i + '.png').default;
      this.img_tailList.push(img);
    }

    this.img_eyeList = [];
    this.curTimeset = 0;
    this.curEye = 0;
    for (let i = 0; i < 2; i++) {
      let img = new Image();
      img.src = __webpack_require__(61)("./babyEye" + i + '.png').default;
      this.img_eyeList.push(img);
    }
  }

  draw() {
    let {x, y, width, height, ctx, angle, img_bodyList, curBody, img_tailList, curBigTail, curEye, tail_width, tail_height, img_eyeList, eye_width, eye_height} = this;
    this.curTimeset += window.gapTime;
    if (this.curTimeset % 100 > 60) {
      this.curBigTail = (this.curBigTail + 1) % 7;
    }

    this.curEye = this.curTimeset % 4000 > 3700 ? 1 : 0;

    this.timeGap_body += window.gapTime;
    if (this.timeGap_body > 300) {
      if (this.curBody >= img_bodyList.length - 1) {
        this.curBody = img_bodyList.length - 1;
        this.alive = false;
      } else {
        this.curBody = (this.curBody + 1) % img_bodyList.length;
      }
      this.timeGap_body %= 300;
    }

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.drawImage(img_tailList[curBigTail], -tail_width / 2 + 12, -tail_height / 2, tail_width, tail_height);
    ctx.drawImage(img_bodyList[curBody], -width / 2, -height / 2, width, height);
    ctx.drawImage(img_eyeList[curEye], -eye_width / 2, -eye_height / 2, eye_width, eye_height);
    ctx.restore();
  }

  eatFood() {
    this.curBody = 0;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Babyfish);

/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = ("./img/babyFade0.png");

/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = ("./img/babyFade1.png");

/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = ("./img/babyFade10.png");

/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = ("./img/babyFade11.png");

/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = ("./img/babyFade12.png");

/***/ }),
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = ("./img/babyFade13.png");

/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = ("./img/babyFade14.png");

/***/ }),
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = ("./img/babyFade15.png");

/***/ }),
/* 49 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = ("./img/babyFade16.png");

/***/ }),
/* 50 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = ("./img/babyFade17.png");

/***/ }),
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = ("./img/babyFade18.png");

/***/ }),
/* 52 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = ("./img/babyFade19.png");

/***/ }),
/* 53 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = ("./img/babyFade2.png");

/***/ }),
/* 54 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = ("./img/babyFade3.png");

/***/ }),
/* 55 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = ("./img/babyFade4.png");

/***/ }),
/* 56 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = ("./img/babyFade5.png");

/***/ }),
/* 57 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = ("./img/babyFade6.png");

/***/ }),
/* 58 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = ("./img/babyFade7.png");

/***/ }),
/* 59 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = ("./img/babyFade8.png");

/***/ }),
/* 60 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = ("./img/babyFade9.png");

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./babyEye0.png": 62,
	"./babyEye1.png": 63
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 61;

/***/ }),
/* 62 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = ("./img/babyEye0.png");

/***/ }),
/* 63 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = ("./img/babyEye1.png");

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(65);

if (typeof content === 'string') {
  content = [[module.i, content, '']];
}

var options = {}

options.insert = "head";
options.singleton = false;

var update = __webpack_require__(70)(content, options);

if (content.locals) {
  module.exports = content.locals;
}


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(66)(false);
// Imports
var ___CSS_LOADER_GET_URL_IMPORT___ = __webpack_require__(67);
var ___CSS_LOADER_URL_PURE_IMPORT_0___ = __webpack_require__(68);
var ___CSS_LOADER_URL_PURE_IMPORT_1___ = __webpack_require__(69);
var ___CSS_LOADER_URL_IMPORT_0___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_PURE_IMPORT_0___);
var ___CSS_LOADER_URL_IMPORT_1___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_PURE_IMPORT_1___);
// Module
exports.push([module.i, "body,html{padding:0;margin:0}.wrapper{font-size:0;position:relative;height:100vh;overflow:hidden;max-width:665px;margin:0 auto;background:url(" + ___CSS_LOADER_URL_IMPORT_0___ + ") no-repeat center;background-size:cover}.wrapper_bg{position:absolute;left:0;right:0;bottom:0;top:0;background-size:cover}#canvas1{position:absolute;left:0;top:0;z-index:20}#gameover{position:absolute;z-index:100;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.3);font-size:30px;color:#fff;display:flex;align-items:center;justify-content:center;flex-direction:column}#gameover.hide{display:none}.gameFooter{position:absolute;z-index:50;left:10px;bottom:10px;font-size:16px;color:#fff}.gameStart{position:absolute;z-index:100;top:0;left:0;right:0;bottom:0;background:url(" + ___CSS_LOADER_URL_IMPORT_1___ + ") no-repeat center;background-size:cover}.gameStart_btn{position:absolute;bottom:20%;left:50%;font-size:20px;background:#fff;color:#d42e2e;font-weight:bold;padding:10px 30px;border-radius:5px;transform:translateX(-50%);box-shadow:0 0 8px rgba(41,18,18,0.5)}.gameStart.hide{display:none}\n", ""]);


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], "{").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    for (var i = 0; i < this.length; i++) {
      // eslint-disable-next-line prefer-destructuring
      var id = this[i][0];

      if (id != null) {
        alreadyImportedModules[id] = true;
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = modules[_i]; // skip already imported module
      // this implementation is not 100% perfect for weird media query combinations
      // when a module is imported multiple times with different media queries.
      // I hope this will never occur (Hey this way we have smaller bundles)

      if (item[0] == null || !alreadyImportedModules[item[0]]) {
        if (mediaQuery && !item[2]) {
          item[2] = mediaQuery;
        } else if (mediaQuery) {
          item[2] = "(".concat(item[2], ") and (").concat(mediaQuery, ")");
        }

        list.push(item);
      }
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot).concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (url, options) {
  if (!options) {
    // eslint-disable-next-line no-param-reassign
    options = {};
  } // eslint-disable-next-line no-underscore-dangle, no-param-reassign


  url = url && url.__esModule ? url.default : url;

  if (typeof url !== 'string') {
    return url;
  } // If url is already wrapped in quotes, remove them


  if (/^['"].*['"]$/.test(url)) {
    // eslint-disable-next-line no-param-reassign
    url = url.slice(1, -1);
  }

  if (options.hash) {
    // eslint-disable-next-line no-param-reassign
    url += options.hash;
  } // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls


  if (/["'() \t\n]/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, '\\n'), "\"");
  }

  return url;
};

/***/ }),
/* 68 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = ("./img/background2.jpg");

/***/ }),
/* 69 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = ("./img/cover.png");

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var stylesInDom = {};

var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

function listToStyles(list, options) {
  var styles = [];
  var newStyles = {};

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var css = item[1];
    var media = item[2];
    var sourceMap = item[3];
    var part = {
      css: css,
      media: media,
      sourceMap: sourceMap
    };

    if (!newStyles[id]) {
      styles.push(newStyles[id] = {
        id: id,
        parts: [part]
      });
    } else {
      newStyles[id].parts.push(part);
    }
  }

  return styles;
}

function addStylesToDom(styles, options) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i];
    var domStyle = stylesInDom[item.id];
    var j = 0;

    if (domStyle) {
      domStyle.refs++;

      for (; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j]);
      }

      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j], options));
      }
    } else {
      var parts = [];

      for (; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j], options));
      }

      stylesInDom[item.id] = {
        id: item.id,
        refs: 1,
        parts: parts
      };
    }
  }
}

function insertStyleElement(options) {
  var style = document.createElement('style');

  if (typeof options.attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : null;

    if (nonce) {
      options.attributes.nonce = nonce;
    }
  }

  Object.keys(options.attributes).forEach(function (key) {
    style.setAttribute(key, options.attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  }

  if (sourceMap && btoa) {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {};
  options.attributes = typeof options.attributes === 'object' ? options.attributes : {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  var styles = listToStyles(list, options);
  addStylesToDom(styles, options);
  return function update(newList) {
    var mayRemove = [];

    for (var i = 0; i < styles.length; i++) {
      var item = styles[i];
      var domStyle = stylesInDom[item.id];

      if (domStyle) {
        domStyle.refs--;
        mayRemove.push(domStyle);
      }
    }

    if (newList) {
      var newStyles = listToStyles(newList, options);
      addStylesToDom(newStyles, options);
    }

    for (var _i = 0; _i < mayRemove.length; _i++) {
      var _domStyle = mayRemove[_i];

      if (_domStyle.refs === 0) {
        for (var j = 0; j < _domStyle.parts.length; j++) {
          _domStyle.parts[j]();
        }

        delete stylesInDom[_domStyle.id];
      }
    }
  };
};

/***/ })
/******/ ]);