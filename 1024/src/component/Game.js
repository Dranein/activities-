import React from 'react';
import Hammer from 'hammerjs';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.successScore = 2048;
    this.state = {
      step: 0,
      score: 0,
      backPreClick: '', // 用来记录上一次操作，如果下次操作一样的就不产生随机数
      list: [
        [0, 2, 0, 0],
        [0, 0, 4, 0],
        [0, 0, 0, 2],
        [2, 2, 4, 0]
      ]
    }
  }

  componentDidMount() {
    let hammer = new Hammer(this.refs['game']);
    hammer.get('swipe').set({
      direction: Hammer.DIRECTION_ALL
    });
    hammer.on('swipeleft swiperight swipeup swipedown', (ev) => {
      switch (ev.type) {
        case 'swipeleft':
          this.handleLeft();
          break;
        case 'swiperight':
          this.handleRight();
          break;
        case 'swipeup':
          this.handleTop();
          break;
        case 'swipedown':
          this.handleBottom();
          break;
        default:
          break;
      }
    });
  }

  render() {
    let {list, score, step} = this.state;
    return <div className='wrapper'>
      <div className='game_head'>
        <div className='game_head-box'>
          <p>步数:</p>
          <p>{step}</p>
        </div>
        <div className='game_head-box'>
          <p>得分:</p>
          <p>{score}</p>
        </div>
      </div>
      <div className='game_content' ref='game'>
        {
          list.map((item, index) => (
            <div key={index} className='game_row'>
              {
                item.map((itemC, indexC) => (
                  <div key={'c' + indexC} className={'game_col game_col' + itemC}>{itemC}</div>
                ))
              }
            </div>
          ))
        }
      </div>
      {
        /*<div className='btn_ground'>
          <div onClick={this.handleLeft.bind(this)}>左</div>
          <div onClick={this.handleRight.bind(this)}>右</div>
          <div onClick={this.handleTop.bind(this)}>上</div>
          <div onClick={this.handleBottom.bind(this)}>下</div>
        </div>*/
      }
    </div>;
  }

  handleLeft() {
    let list = this.merge(this.state.list);
    this.toSetDate(list, 'left');
  }

  handleRight() {
    let {list} = this.state;
    list = list.map(item => item.reverse());
    list = this.merge(list);
    list = list.map(item => item.reverse());
    this.toSetDate(list, 'right');
  }

  handleTop() {
    let list = this.rotate(this.state.list);
    list = this.merge(list);
    list = this.rotate(list, true);
    this.toSetDate(list, 'top');
  }

  handleBottom() {
    let list = this.rotate(this.state.list, true);
    list = this.merge(list);
    list = this.rotate(list);
    this.toSetDate(list, 'bottom');
  }

  // 相加合并
  merge(list) {
    let arr = list;
    let newArr = [];
    let score = 0;
    for (let i = 0; i < arr.length; i++) {
      newArr[i] = [];
      let arrCutZero = arr[i].filter(item => item !== 0);
      for (let k = 0; k < arrCutZero.length; k++) {
        if (arrCutZero[k + 1] && arrCutZero[k + 1] === arrCutZero[k]) {
          newArr[i][k] = arrCutZero[k] * 2;
          arrCutZero[k + 1] = 0;
          score += newArr[i][k];
        } else {
          newArr[i][k] = arrCutZero[k];
        }
      }
      let num = list[0].length - newArr[i].length;
      if (num > 0) {
        newArr[i].splice(newArr[i].length, 0, ...Array(num).fill(0));
      }
    }
    this.setState({
      score: this.state.score + score
    })
    return newArr;
  }

  // 旋转数组，clockwise的话是顺时针
  rotate(list, clockwise) {
    let newArr = [];
    let len = list.length;
    for (let i = 0; i < len; i++) {
      newArr[i] = [];
      for (let j = 0; j < len; j++) {
        if (clockwise) {
          newArr[i][j] = list[len - 1 - j][i];
        } else {
          newArr[i][j] = list[j][len - 1 - i];
        }
      }
    }
    return newArr;
  }

  // 更新数据
  toSetDate(list, type) {
    const click = this.state.backPreClick;
    this.setState({
      backPreClick: click === type ? click : type,
      list
    }, () => {
      this.updateStateAfter(click === type);
    })
  }

  // 相加合并之后执行的判断函数，是否赢了，是否游戏结束，不然就给空格随机加个2或者4
  updateStateAfter(isSameClick) {
    let {list} = this.state;
    this.setState({
      step: this.state.step + 1
    })
    if (this.isWin(list)) {
      alert('恭喜你成功了！');
    } else {
      if (!isSameClick) this.addRandom();
      if (this.isGameOver(list)) {
        alert('游戏结束！');
      }
    }
  }

  // 判断是否赢了
  isWin(list) {
    let arr = [].concat(...list);
    return arr.some(val => val === this.successScore);
  }

  // 判断是否已经没有操作空间了
  isGameOver(list) {
    let result = true;
    let isFull = this.isFull(list);
    if (!isFull) return false; // 还没填满，游戏继续
    let len = this.state.list.length;
    let myList = this.state.list;
    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len; j++) {
        let curItem = myList[i][j];
        // 判断上面是否有相等的；
        if (i !== 0 && curItem === myList[i - 1][j]) {
          result = false;
          break;
        }
        // 判断下面面是否有相等的；
        if (i !== len - 1 && curItem === myList[i + 1][j]) {
          result = false;
          break;
        }
        // 判断左边是否有相等的；
        if (j !== 0 && curItem === myList[i][j - 1]) {
          result = false;
          break;
        }
        // 判断右边是否有相等的；
        if (j !== len - 1 && curItem === myList[i][j + 1]) {
          result = false;
          break;
        }
      }
    }
    return result;
  }

  // 判断是否是满格的
  isFull(list) {
    let arr = [].concat(...list);
    return !arr.some(val => val === 0);
  }

  // 随机添加0,2或4
  addRandom() {
    let isFull = this.isFull(this.state.list);
    if (isFull) return;
    const RANDOM = [0, 2, 4][Math.round(Math.random() * 2)];
    if (RANDOM === 0) return;
    let arr = this.state.list;
    let len = arr.length;
    let arrZero = [];
    for(let i = 0; i < len; i++) {
      for(let j = 0; j < len; j++) {
        if (arr[i][j] === 0) arrZero.push({x: i, y: j});
      }
    }
    const INDEX = Math.round(Math.random() * (arrZero.length - 1));
    arr[arrZero[INDEX].x][arrZero[INDEX].y] = RANDOM;
    this.setState({
      list: arr
    })
  }
}


export default Game;
