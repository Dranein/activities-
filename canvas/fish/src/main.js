import {imgPreLoad} from './commonFunctions';
import Canvas from './Canvas';
import './css/index.scss';

import img_blue from './images/blue.png';
import img_fruit from './images/fruit.png';
import img_big from './images/big.png';
import img_bigEye0 from './images/bigEye0.png';
import img_bigTail0 from './images/bigTail0.png';


let img_bigTailList = [];
for (let i = 0; i < 7; i++) {
  img_bigTailList.push(require('./images/bigTail' + i + '.png').default);
}

window.requestAnimFrame = (function() {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
    function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
      return window.setTimeout(callback, 1000 / 60);
    };
})();

window.onload = () => {
  imgPreLoad({
    imgList: [
      img_big,
      img_bigEye0,
      img_bigTail0,
      img_blue,
      img_fruit,
      ...img_bigTailList
    ],
    progressCallback: progress => {

    },
    sucessCallback: () => {
      let canvas1 = document.getElementById('canvas1');
      let canvas2 = document.getElementById('canvas2');
      let parentNode = canvas1.parentNode;
      this.canvas = new Canvas({
        el1: canvas1,
        el2: canvas2,
        width: parentNode.offsetWidth,
        height: parentNode.offsetHeight
      })
    }
  });
}

