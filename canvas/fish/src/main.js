import {setRequestAnimFrame} from './helper';
import Canvas from './Canvas';
import './css/index.scss';

setRequestAnimFrame();

window.onload = () => {
  let loadingboxDom = document.getElementById('loadingbox');
  loadingboxDom.classList.add('hide');
  rederCanvas();
}


function rederCanvas () {
  let canvas1 = document.getElementById('canvas');
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
