话不多说，先上个图：
![预览图](https://user-gold-cdn.xitu.io/2019/12/5/16ed648efc1e8586?w=268&h=488&f=gif&s=279172)

### 前言
因为最近在学习react，就直接拿create-react-app的脚架做了，其实大可不必的哈，就是顺手拿了；[狗头.png]

[项目地址](https://github.com/Dranein/activities-/tree/master/1024)
- `https://github.com/Dranein/activities-/tree/master/1024`
- `npm install`
- `npm start`

浏览器打开：[http://localhost:3000](http://localhost:3000)

打包好的文件在build中，浏览器打开里面的index.html也可以玩

### 项目中用到的东西
- `react`  （项目中利用数据绑定，操纵数组的方式实现游戏的逻辑；）
- `hammerjs` [官网](http://hammerjs.github.io/) （hammerjs是移动端的手势库，实现监听用户的滑动操作）

### 具体实现

#### -核心数据
```javascript
  constructor(props) {
    super(props);
    this.successScore = 2048; // 设置的win的数值
    this.state = {
      step: 0, // 当前步数
      score: 0, // 当前得分
      backPreClick: '', // 用来记录上一次操作，如果下次操作一样的就不产生随机数
      list: [ // 视图绑定的数组，0为空格
        [0, 2, 0, 0],
        [0, 0, 4, 0],
        [0, 0, 0, 2],
        [2, 2, 4, 0]
      ]
    }
  }
```
#### -页面布局
```javascript
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
    </div>;
  }
```
#### -样式
- 动态的`className`
```javascript
className={'game_col game_col' + itemC}>{itemC}
```
```css
    .game_col {
      width: 23%;
      margin: 0 1%;
      height: 100%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: rgba(189, 174, 141, 0.55);
      font-size: 30px;
      border-radius: 5px;
      font-weight: bold;
      &.game_col0 { font-size: 0; }
      &.game_col2 { background: #f5c277; }
      &.game_col4 { background: #f7b24c; }
      // ...
    }
```
#### 逻辑代码
主要的函数
- `merge(list)` // 相加合并
- `handleLeft()` // 左移
- `handleRight()` // 右移
- `handleTop()` // 上移
- `handleBottom()` // 下移
- `toSetDate(list, type)` // 更新状态
- `rotate(arr, clockwise)` // 旋转数组
- `updateStateAfter(isSameClick)` // 数据更新之后的函数，做游戏状态的判断
- `isWin(list)` // 判断是否赢了
- `isGameOver(list)` // 判断是否已经没有操作空间了，gameover
- `addRandom()` // 在随机空格随机添加0,2或4
- `isFull(list)` // 辅助函数，是否满格

###### `merge(list)`
- 主要的函数，所有方向的合并相加都是以向左相加为基础，通过旋转数组来变成向左相加，然后再旋转回去；
- 新建一个空数组`newArr`，用于存放合并相加的项
- 遍历数组中的每一行，并过滤0；
   1. 将当前项和下一项做对比，如果相等的话就相加并添加到新数组中，这时候下一项就要置0了，因为接下来下一项还要和他的下一项做对比；
   2. 如果不相等的话，就直接放入新数组中；
- 遍历之后我们得到了一个合并相加的新数组，但是是过滤了0的，我们需要给每一行补全0；
- 更新`score`，合并之后是得分，得分为合并的数值；
```javascript
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
```
###### `handleLeft()`
- 左相加，直接执行合并相加，并更新数据；
```javascript
  handleLeft() {
    let list = this.merge(this.state.list);
    this.toSetDate(list, 'left');
  }
```
###### `handleTop()`
- 上相加，逆时针旋转数组，变成可以左相加，合并相加再旋转回来；
```javascript
  handleTop() {
    let list = this.rotate(this.state.list);
    list = this.merge(list);
    list = this.rotate(list, true);
    this.toSetDate(list, 'top');
  }
```
###### `handleRight()`
- 右相加，实际上就是颠倒每一行的数组，然后执行左相加，再颠倒回来，就实现了右相加；
- 也可以通过旋转两次数组，左相加，再旋转回来，但显然上面的步骤会更方便点；
```javascript
  handleRight() {
    let {list} = this.state;
    list = list.map(item => item.reverse());
    list = this.merge(list);
    list = list.map(item => item.reverse());
    this.toSetDate(list, 'right');
  }
```
###### `handleBottom()`
- 下相加，顺时针旋转数组，变成可以左相加，合并相加再旋转回来；
```javascript
  handleBottom() {
    let list = this.rotate(this.state.list, true);
    list = this.merge(list);
    list = this.rotate(list);
    this.toSetDate(list, 'bottom');
  }
```
###### `toSetDate(list, type)`
- 参数`type`为滑动的方向，用于判断上一步和当前是否是同个方向；并更新`backPreClick`
- 更新数组，更新视图数据
- 在更新数组的回调中判断游戏的状态，执行`updateStateAfter`函数；
```javascript
  toSetDate(list, type) {
    const click = this.state.backPreClick;
    this.setState({
      backPreClick: click === type ? click : type,
      list
    }, () => {
      this.updateStateAfter(click === type);
    })
  }
```
###### `rotate(arr, clockwise)`
参数`clockwise`表示数组是按顺时针旋转还是按照逆时针旋转；`true`为顺时针；当我们旋转了数组，并做了合并相加之后，还需要把数组旋转回来；
```javascript
// 以下是逆时针旋转数组的效果
[1, 2, 3]  [3, 6, 9]
[4, 5, 6]  [2, 5, 8]
[7, 8, 9]  [1, 4, 7]
```
```javascript
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
  ```
###### `updateStateAfter(isSameClick)`
- 参数`isSameClick`记录是否和上一步是同个方向，如果同个方向的话是不产生随机数的，增加游戏难度；
- 数据更新了需要记录一个步数；`step++`；
- 然后判断是否达到预设数值，达到就赢了，游戏结束；
- 判断是否和上一步同个方向，不是的话就在空格新增随机数；
- 然后判断是否游戏结束gameover；
```javascript
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
```
###### `isWin(list)`
如果数组中有成员=我们设置的成功值，就win了；
```javascript
  isWin(list) {
    let arr = [].concat(...list);
    return arr.some(val => val === this.successScore);
  }
```
###### `isGameOver(list)`
- 判断是否是满格的，如果还没满格，那肯定还没结束，直接return;
- 遍历数组，如果数组中的成员上下左右都没有相同项可以合并，那就gameover了；
```javascript
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
```
###### `addRandom()`
- 先判断是否已经满格了，如果满格那就直接`return`了；
- 如果是随机到`0`，那也可以直接`return`了；
- 随机位置：找到空格的位置，也就是数组中为`0`的坐标；
```javascript
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
```
###### `isFull(list)`
如果数组中没有`0`了，说明已经满格了；
```javascript
  isFull(list) {
    let arr = [].concat(...list);
    return !arr.some(val => val === 0);
  }
```


#### 滑动监听 hammerjs
- 实例化`Hammer`传入节点对象(这边通过设置了ref，可以直接过去节点)；
- `Hammer`默认不开启垂直方向的滑动，可手动开启

### 具体实现
```javascript
  componentDidMount() {
    let hammer = new Hammer(this.refs['game']);
    // 开启垂直方向滑动
    hammer.get('swipe').set({
      direction: Hammer.DIRECTION_ALL
    });
    // 绑定滑动事件
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
```
#### 扩展
- 可以做键盘按键的监听，绑定 ↑ ← ↓ → 执行 `handleTop()`, `handleLeft()`...即可

#### todo
- 添加动画，因为是用数据驱动去做的，感觉添加动画有点无从下手，大神们看到这里如果有头绪可以指导一下；
- 级别设置，可以通过格子的个数和过关所需要达到的分数做等级区分

本着多分享多学习的心态，欢迎交流

dranein@163.com

地址：https://github.com/Dranein/activities-/tree/master/1024