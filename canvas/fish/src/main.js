import {imgPreLoad, setRequestAnimFrame} from './commonFunctions';
import Canvas from './Canvas';
import './css/index.scss';

import img_blue from './images/blue.png';
import img_fruit from './images/fruit.png';
import img_big from './images/big.png';
import img_bigEye0 from './images/bigEye0.png';
import img_bigTail0 from './images/bigTail0.png';

let img_bigTailList = [];
let img_bigBodyList = [];
for (let i = 0; i < 7; i++) {
  img_bigTailList.push(require('./images/bigTail' + i + '.png').default);
}
for (let i = 0; i < 19; i++) {
  img_bigBodyList.push(require('./images/babyFade' + i + '.png').default);
}

setRequestAnimFrame();

window.onload = () => {
  imgPreLoad({
    imgList: [
      img_big,
      img_bigEye0,
      img_bigTail0,
      img_blue,
      img_fruit,
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
  let canvasObj = new Canvas({
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
