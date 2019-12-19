import {Howl} from 'howler';
import sound_bg from './sound/bg.mp3';
import sound_gameover from './sound/gameover.mp3';
import {setRequestAnimFrame} from './helper';
import Canvas from './Canvas';
import './css/index.scss';

setRequestAnimFrame();

window.onload = () => {
  let loadingboxDom = document.getElementById('loadingbox');
  loadingboxDom.classList.add('hide');
  rederCanvas();
}

let soundBg = new Howl({
  src: sound_bg,
  loop: true
});
let soundGameover = new Howl({
  src: sound_gameover
});

function rederCanvas () {
  let canvas1 = document.getElementById('canvas');
  let gameoverDom = document.getElementById('gameover');
  let startDom = document.getElementById('start');
  let playagainDom = document.getElementById('playagain');
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
      soundBg.pause();
      soundGameover.play();
    }
  })
  startDom.onclick = () => {
    startDom.parentNode.classList.add("hide");
    canvasObj.init();
    soundBg.play();
  }
  playagainDom.onclick = () => {
    gameoverDom.classList.add("hide");
    canvasObj.init();
    soundGameover.pause();
    soundBg.play();
  }
}
