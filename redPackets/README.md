# 小游戏之红包雨
原生js，按照面向对象的想法练习的一款h5小游戏；项目中不依赖其他的插件，只在实现功能，没有做太多的样式;

[gitHub地址](https://github.com/Dranein/activities-/tree/master/redPackets)如果觉得还ok的话，点个star吧；

![预览图](https://github.com/Dranein/activities-/blob/master/redPackets/redpack.gif?raw=true)

### 首先先简单的写一下页面并加上样式
```javascript
<body>
  <div class="wrap">
    <div id="redPacketWarp"></div>
  </div>
  <div id="startGameBtn">startGame</div>
  <div id="showTime">得分：0</div>
</body>
```

```css
.wrap {
    position: relative;
    background: rgba(47, 59, 106, 0.3);
    position: absolute;
    left: 20px;
    right: 20px;
    top: 20px;
    bottom: 100px;
    font-size: 0;
    overflow: hidden;
}
#redPacketWarp {
    width: 100%;
    height: 100%;
    font-size: 0;
}
#startGameBtn {
    position: absolute;
    bottom: 20px;
    left: 20px;
    text-align: center;
    background: red;
    height: 50px;
    line-height: 50px;
    width: 60%;
    color: #fff;
    font-size: 20px;
    border-radius: 30px;
    box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.5);
}
```


### 新建一个***GameRedpacket***类,作为整个游戏的框架；
首先我们先定义这个类的一些属性，并定义一个开始游戏的方法startGame();
```javascript
class GameRedpacket {
    constructor({el, redImgUrl, redpacketNum, gameTime, gameScore, gameTimesOut}){
        this.redPacketWarp = document.getElementById(el);
        if (!el || !this.redPacketWarp) return false; //没有框架直接return了
        this.score = 0; //得分
        this.redImgUrl = redImgUrl; //红包图片
        this.callback_gameScore = gameScore; //得分的回调，返回分数
        this.callback_gameTimesOut = gameTimesOut; //超时的回调，返回分数
        this.gameTime = gameTime || 30000; //游戏时间
        this.redpacketNum = redpacketNum || 10; //红包数量
        this.redPacketWarp.width = this.redPacketWarp.offsetWidth;
        this.redPacketWarp.height = this.redPacketWarp.offsetHeight;
        this.isOver = false; //标记游戏是否结束
    }
    startGame () {
        // todo
    }
}
```
GameRedpacket必须传入的参数是el(游戏框架的元素id)
redImgUrl在项目中有默认的图片，也可传入自定义的图片；


### new一个GameRedpacket实例对象
```javascript
window.onload = () => {
    let $startGameBtn = document.getElementById('startGameBtn');
    let $showTime = document.getElementById('showTime');
    let gameRedpacket = new GameRedpacket({
      el: 'redPacketWarp',
      timeout: 40000,
      gameScore: (score) => {
        $showTime.innerHTML = `得分：${score}`;
      },
      gameTimesOut: (score) => {
        console.log(score)
        alert('时间到啦,您的最后得分为:'+score);
      }
    });
    $startGameBtn.onclick = function(){
      gameRedpacket.startGame();
    }
}
```
时间是40s，得到分数的话，就改变showTime里面的分数，如果游戏结束，就弹出最后得分；
gameScore和gameTimesOut是两个回调函数，分别是得分和游戏结束，都返回当前得分；


### 接下里回到GameRedpacket，我们开始编写GameRedpacket类的方法
```javascript
class GameRedpacket {
    //...
    // 开始游戏
    startGame () {
        this.init();
        this.addRedpacketList();
        this.render();
    }
    init() {
        this.score = 0;
        this.isOver = false;
        this.redPacketWarp.innerHTML = '';
        this.redPacketList = [];
    }
    addRedpacketList() {
        // todo
    }
    render() {
        // todo
    }
}
```
startGame()是游戏的入口，
调用了init()初始化，
addRedpacketList()添加红包，
reder()渲染；
为了扩展和灵活调用，我们按照功能细分出来


### 添加红包addRedpacketList()
```javascript
class GameRedpacket {
    //...
    addRedpacketList () {
        let timeout = setInterval(() => {
            if (this.redPacketList.length <= this.redpacketNum) {
                this.redPacketList.push(new RedPacket(this));
            } else {
                clearInterval(timeout);
            }
        }, 1000)
    }
    render () {}
}
class RedPacket {
    constructor (gameRedpacket) {
        this.gameRedpacket = gameRedpacket;
        this.redImgUrl = gameRedpacket.redImgUrl;
        this.width = 50;// 这边我们设置了默认的宽高
        this.height = 50;
        this.hasInit = false; // 是否已经初始化
        this.id = new Date().getTime().toString(); // 这边将时间戳作为id
        this.$img = document.createElement('IMG'); // 红包将用img元素去呈现
        this.$img.src = this.redImgUrl;
        this.$img.setAttribute('data-id', this.id); // 将id存在data-id中，后续使用
        this.hasSelected = false; //标记红包是否已经被选中
        this.y = 0; //y属性用于标记红包下落的距离
        this.speed = Math.random()*2 + 3; //speed是红包下落的速度
    }
}

```
addRedpacketList()所要做的工作是添加红包;
这里的想法是间隔1s新建一个红包对象，等到红包对象与设定的红包数量redpacketNum相等时，就停止添加；而这些红包是可以循环利用的，单红包落到最底部超出屏幕时候，可以让红包再回到上面，这样就可以实现源源不断的红包落下；
为了后面更加清晰和易于扩展，红包将作为一个新的类***RedPacket***；同时我们会将GameRedpacket作为参数传入，这样RedPacket也能拿到GameRedpacket的属性，


### 接下来是render()函数，实现红包的渲染，这里我们主要用到了requestAnimationFrame，实现一个递归，需要了解requestAnimationFrame的，请戳->[window.requestAnimationFrame(callback)](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame)
```javascript
class GameRedpacket {
    //...
    render () {
        if (this.isOver) return false;
        this.renderRedpacket();
        this.requestAnimationFrame = requestAnimationFrame(this.render.bind(this));
    }
    renderRedpacket () {
        this.redPacketList.forEach(redPacket => {
            // 如果红包没有初始化的话，可以先执行初始化并把红包元素加入游戏框中
            if (!redPacket.hasInit) {
                redPacket.init();
                redPacket.hasInit = true;
            }
            // 如果下落高度超出屏幕，就重新初始化
            if (redPacket.y > this.redPacketWarp.height + redPacket.height*2) {
                redPacket.initStart();
            }
            redPacket.move();// 红包动起来
        })
    }
}
class RedPacket {
    //...
    init () {
        this.initStart ();
        this.gameRedpacket.redPacketWarp.appendChild(this.$img);
    }
    initStart () {
        this.hasSelected = false;
        this.y = 0;
        this.speed = Math.random()*2 + 3;
        this.x = (this.gameRedpacket.redPacketWarp.width - this.width) * Math.random();
        this.$img.setAttribute('style', `
            position: absolute;
            left: ${this.x}px;
            top: -${this.height}px;
            width: ${this.width}px;
            height: ${this.height}px;
        `)
    }
    move () {
        if (!this.hasSelected) {
            this.y += this.speed;
            this.$img.style.transform = `translateY(${this.y}px)`;
        }
    }
}
```
红包下落使用了translateY去实现。每次动画都改变红包的y属性，speed是个随机范围数，这样可以实现红包不是一个速度在下落的；



做到这里，点击开始游戏，我们的红包已经可以动起来啦
当然，如果不能点的话，这个游戏还有什么意义，接下来我们来做红包的点击


### 点击红包
红包的点击事件我们委托给了游戏的最外层元素，也就是传入的el；
```javascript
class GameRedpacket {
    //...
    addEvent () {
        // 添加事件
        this.redPacketWarp.addEventListener('touchstart', (e) => {
            if (this.isOver) return; // 如果游戏已经结束，就不做处理了
            let id = e.target.getAttribute('data-id');// 之前我们给每个红包都设置了id，这时候用到了
            let $RedPacket = this.getRedPacketObjById(id);
            if ($RedPacket) {
                this.addScore(); //得到一分
                $RedPacket.selected(); //修改红包选中状态
            }
        })
    }
    getRedPacketObjById (id) {
        // 通过红包id，在红包列表redPacketList中找出该对象
        const INDEX = this.redPacketList.map(o => { return o.id }).indexOf(id);
        return INDEX < 0 ? false : this.redPacketList[INDEX];
    }
    addScore() {
        this.score ++; //得分+1
        this.callback_gameScore && this.callback_gameScore(this.score);
    }
}
class RedPacket {
    //...
    selected () {
        this.hasSelected = true;
        this.$img.setAttribute('style', `
            transition: all 300ms;
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
            if (this.gameRedpacket.isOver) return;
            this.initStart();
        }, 300);
    }
    move() {
        if (!this.hasSelected) {
            this.y += this.speed;
            this.$img.style.transform = `translateY(${this.y}px)`;
        }
    }
}
```
每次得分都会触发我们传入的得分的回调函数，并返回当前分数score
红包被选中的方法很简单，这边需要将红包对象的hasSelected修改为true，这样红包就不会继续继续移动，在这里我用了居中的样式来添加一个选中效果。
红包被选中之后有个300ms的过场动画，动画之后便重新initStart()，恢复初始状态，如果游戏结束了，那就不做处理了；


### 回调函数
游戏时间到了：gameTimesOut，将弹出当前得到的分数
```javascript
class GameRedpacket {
    //...
    startGame () {
        this.timeout_gameTime = setTimeout(() => {
            this.gameTimesOut();
        }, this.gameTime);
    }
    gameTimesOut () {
        this.isOver = true;
        this.callback_gameTimesOut && this.callback_gameTimesOut(this.score);
        this.init();
    }
}
```
在开始游戏的时候，我们就设置了一个定时器，时间是我们设置的时间this.gameTime;
当时间结束时，触发gameTimesOut函数，将isOver设置为true；并执行回调函数，传入得分score这边顺便执行init()把所有的东西都恢复原样；

而得分的回到函数我们在addScore中已经做了
```javascript
class GameRedpacket {
    //...
    addScore() {
        this.score ++; //得分+1
        this.callback_gameScore && this.callback_gameScore(this.score);
    }
}
```

***


到这里我们的红包雨小游戏就完成了，还有蛮多可以优化的点，requestAnimationFramede 兼容问题，图片的预加载等，后续有时间再补充啦。
本着多分享多学习的心态，欢迎交流

dranein@163.com

地址：https://github.com/Dranein/activities-/tree/master/redPackets