# canvas小游戏 - 爱心鱼

## 前言
该小游戏是慕课网课程的学习demo，视屏教程戳这里[爱心鱼](https://www.imooc.com/learn/515)
看完了视屏之后觉得挺有意思，里面涉及到了一些做游戏常用的方法和技巧，碰撞，跟随运动，帧动画等；下面分享一下实现的思路；

![预览图](https://github.com/Dranein/activities-/blob/master/fish.gif?raw=true)



### 项目信息
[在线试玩](https://dranein.github.io/fish/) （因为是放在github上，所以loading会就一丢丢，不过他是真的有在load）

源码地址： https://github.com/Dranein/activities-/tree/master/canvas/fish
- `npm install`
- `npm run start`

### 开发前准备
开发前用webpack搭个环境辅助开发，让你的开发效率更高哦，各个库之间支持的版本要注意下；

- `webpack-dev-server`热更新

webpack简单的配置了一下：
- 用`url-loader`和`image-webpack-loader`压缩了下图片，体积小的直接转为base64，减少http请求；
- 配置了`sass`环境
- 用`html-webpack-plugin`实现加入打包后的文件到指定的html模板
- `uglifyjs-webpack-plugin` 代码压缩 (没有分环境，本地调试的时候就不用了，影响编译速度)

### 游戏规则
该游戏也叫大鱼喂小鱼，摆动的海草会长出鱼的食物，一种蓝色的（200分）一种黄色（100分）的，大鱼吃下鱼食，然后去喂小鱼，小鱼才可以存活，并得到分数，大鱼也可以连续吃下多颗食物再去喂养，如果长时间小鱼没有得到喂养，小鱼就死了，这个时间反应在小鱼的颜色上，小鱼颜色随着时间慢慢变浅，最后变为白色就游戏结束；

### 实现思路

#### 目录
- `main.js` 入口文件是`src/main.js`,等待页面渲染完成，将初始化一个Canvas对象，在这里现在整个游戏的逻辑部分；
- helper.js 为一些辅助函数
- `Canvas.js` Canvas类中实现整个游戏逻辑
- 然后就是几个对象类： `Fish.js`（大鱼） `Babyfish.js`（小鱼） `Kelp.js`（海草） `Bubble.js`（鱼食） `Wave.js`（波动） `Dust.js`（漂浮物）

目录出来之后其实整个游戏的逻辑实现就比较清晰了

#### 来看看Canvas中的实现

##### init()
在`init()`中已经把要展示的东西都初始化出来了，并用数组或对象将其保存在Canvas的实例对象中
```javascript
  class Canvas {
    constructor(){
      this.kelpList = [];
      this.kelpNum = 60;
      this.bubbleList = [];
      this.bubbleNum = 15;
      this.bigFish = '';
      this.babyFish = '';
      this.waveList = [];
      this.dustList = [];
      this.dustNum = 30;
      //...
    }
    init() {
      this.initKelp(); // 初始化海草
      this.initBubble();  // 初始化食物
      this.initFish(); // 初始化大鱼
      this.initBabyFish(); // 初始化小鱼
      this.initDust(); // 初始化漂浮物
      this.addEvent(); // 添加事件
      this.gameloop(); // 添加循环
    }
    //...
  }
```

##### gameloop()
`gameloop()`的任务就是把画布擦除干净，然后重新绘制新的画布（大约20ms执行一次），所以我们在初始化的时候需要把各个对象存储起来，就是为了重新绘制的时候还能拿到；在每一次清除画布，重新绘制的过程中，如果我们改变画布中对象的属性，比如坐标，宽高；这样画布中的对象看起来就是在变化的；
```javascript
  gameloop() {
    this.content1.clearRect(0, 0, this.width, this.height);
    window.gapTime = new Date() - window.preTime;
    if (window.gapTime > 40) window.gapTime = 40;
    window.preTime = new Date();
    this.animate();
    window.requestAnimationFrame(this.gameloop.bind(this));
  }

  animate() {
    // 要绘制在画布上的东西
  }
```

#### animate()
`animate()`重新绘制内容到画布上
```javascript
  animate() {
    this.kelpList.forEach(item => {
      item.draw()
    });

    this.waveList = this.waveList.filter(item => {
      item.draw();
    })

    // ...
  }
```
在重新绘制内容到画布的过程中，游戏的逻辑也在这里实现，包括:
 - 大鱼是否吃到食物`fishEatubble()`
 - 大鱼跟随鼠标运动
 - 小鱼跟随大鱼运动
 - 大鱼喂小鱼`fishFeed()`
 - 游戏是否结束

#### 物体碰撞
关于大鱼是否吃到食物和大鱼喂小鱼的判断，都用到物体碰撞的概念，在这里用两点间距离实现，如果两点间距离小于特定值，就判断两个物体接触到了；
```javascript
// 求两个坐标点的距离，结果为平方值；
  function calLength2(x1, y1, x2, y2) {
    return Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2);
  }
```

#### 跟随运动
大鱼跟着鼠标运动，小鱼跟着大鱼运动，如果只是实现点到点的运动，动画看起来十分的生硬；
`lerpDistance`方法可以返回原始数值和目标数值之间的值（ratio取值为0-1），在`gameloop`循环下，两点会越来越接近；

```javascript
  // 距离趋向
  function lerpDistance(aim, cur, ratio) {
    var delta = cur - aim;
    return aim + delta * ratio;
  }
```

除了距离之外，还有角度的趋向
```javascript
  // 距离趋向
  function lerpAngle(aim, cur, ratio) {
    var delta = cur - aim;
    if (delta > Math.PI) delta = delta - 2 * Math.PI;
    if (delta < -Math.PI) delta = delta + 2 * Math.PI;
    return aim + delta * ratio;
  }
```

### Kelp海草
海草是随机生成的竖线，带有一定的透明度，`ctx.lineCap = "round"`实现顶端圆弧；
比较难的点是让海草摆动起来，这里运用了[二次贝塞尔曲线](https://www.runoob.com/tags/canvas-quadraticcurveto.html)`quadraticCurveTo`,曲线的起始点是最底部，控制点在运动过程中不用变，我们只要改变他的结束点就可以实现摆动；

我们让海草结束点之间`x + [-70, +70]`之间来回运动, 这时候你会发现在临界值（也就是 x - 70 和 x + 70）的时候, 海草会立马向反方向运动，运动没有曲线，正常逻辑下应该是个缓冲运动；为了实现这点，我们可以使用`Math`的[正弦函数](https://baike.baidu.com/item/%E6%AD%A3%E5%BC%A6?fromtitle=%E6%AD%A3%E5%BC%A6%E5%87%BD%E6%95%B0&fromid=9601948)；

```javascript
  class Kelp {
    constructor() {
      this.deltaTime = 0;
      this.quadraticEndX = 0;
      this.quadraticEndY = 0;
    }
    //...
    draw() {
      //...
      this.deltaTime += 0.01;
      let sin = Math.sin(this.deltaTime);
      this.quadraticEndX = x + sin * 70;
      this.quadraticEndY = (ctx.canvas.height - height) + Math.abs(sin * 8);
      ctx.moveTo(x, ctx.canvas.height);  // 移动到起始点
      ctx.quadraticCurveTo(x, (ctx.canvas.height - height) * 1.18, this.quadraticEndX, this.quadraticEndY);  // （控制点x, 控制点y, 结束点x, 结束点y）
      // ...
    }
  }
```
`Math.sin()`的返回值是[-1, 1]，this.deltaTime的增加速度影响震动的频率，也就是海草摇摆的速度；




dranein@163.com

地址：https://github.com/Dranein/activities-/tree/master/canvas/fish