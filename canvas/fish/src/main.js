import {imgPreLoad} from './commonFunctions';
import Canvas from './Canvas';

window.requestAnimFrame = (function() {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
    function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
      return window.setTimeout(callback, 1000 / 60);
    };
})();

window.onload = () => {
  imgPreLoad({
    imgList: [
      require('./images/blue.png').default,
      require('./images/fruit.png').default,
      require('./images/big.png').default,
      require('./images/bigEye0.png').default,
      require('./images/bigTail0.png').default
    ],
    progressCallback: progress => {
      console.log(progress);
    },
    sucessCallback: () => {
      let canvas1 = document.getElementById('canvas1');
      let canvas2 = document.getElementById('canvas2');
      this.canvas = new Canvas({
        el1: canvas1,
        el2: canvas2,
        width: window.innerWidth,
        height: window.innerHeight
      })
    }
  });
}

