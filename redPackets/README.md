# 小游戏之红包雨
原生js，按照面向对象的想法练习的一款h5小游戏；项目中不依赖其他的插件，只在实现功能，没有做太多的样式;

###首先我们新建一个***GameRedpacket***类,作为整个游戏的框架；
这个类的主要属性和方法有：
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
    }
    init () {
        // 初始化
    }
    startGame () {
        // 开始游戏
    }
    gameTimesOut () {
        // 游戏时间到了
    }
    render () {

    }
}
```
GameRedpacket必须传入的参数是el(游戏框架的元素id)
这里我们简单的写一下页面
```javascript
<body>
  <div class="wrap">
    <div id="redPacketWarp"></div>
  </div>
  <div id="startGameBtn">startGame</div>
  <div id="showTime">得分：0</div>
</body>
```
redImgUrl在项目中有默认的图片，也可传入自定义的图片；

之后我们可以生成一个GameRedpacket类了，
```javascript
window.onload = () => {
    let $startGameBtn = document.getElementById('startGameBtn');
    let $showTime = document.getElementById('showTime');
    let gameRedpacket = new GameRedpacket({
      el: 'redPacketWarp',
      timeout: 40000,
      gameScore: (date) => {
        $showTime.innerHTML = `得分：${date}`;
      },
      gameTimesOut: (date) => {
        console.log(date)
        alert('时间到啦,您的最后得分为:'+date);
      }
    });
    $startGameBtn.onclick = function(){
      gameRedpacket.startGame();
    }
}
```









