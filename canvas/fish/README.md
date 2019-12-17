#canvas小游戏 - 爱心鱼
## 前言
该小游戏是慕课网课程的学习demo，视屏教程戳这里[爱心鱼](https://www.imooc.com/learn/515)
看完了视屏之后觉得挺有意思，里面涉及到了一些做游戏常用的方法和技巧，碰撞，跟随运动，帧动画等；下面分享一下实现的思路；

![预览图](https://user-gold-cdn.xitu.io/2019/12/17/16f137474cd7c636?w=392&h=219&f=gif&s=973136)



## 项目信息
[在线试玩](https://dranein.github.io/fish/) （因为是放在github上，所以loading会就一丢丢，不过他是真的有在load）

源码地址： https://github.com/Dranein/activities-/tree/master/canvas/fish
- `npm install`
- `npm run start`
- `npm run build`

## 游戏规则
该游戏也叫大鱼喂小鱼，摆动的海草会长出鱼的食物，一种蓝色的（200分）一种黄色（100分）的，大鱼吃下鱼食，然后去喂小鱼，小鱼才可以存活，并得到分数，大鱼也可以连续吃下多颗食物再去喂养，如果长时间小鱼没有得到喂养，小鱼就死了，这个时间反应在小鱼的颜色上，小鱼颜色随着时间慢慢变浅，最后变为白色就游戏结束；


## 开发前准备
开发前用webpack搭个环境辅助开发，让你的开发效率更高哦，各个库之间支持的版本要注意下；

- `webpack-dev-server`热更新

webpack简单的配置了一下：
- 用`url-loader`和`image-webpack-loader`压缩了下图片，体积小的直接转为base64，减少http请求；
- 配置了`sass`环境
- 用`html-webpack-plugin`实现加入打包后的文件到指定的html模板
- `uglifyjs-webpack-plugin` 代码压缩 (没有分环境，本地调试的时候就不用了，影响编译速度)

## 实现思路

### 目录
- `main.js` 入口文件是`src/main.js`,等待页面渲染完成，将初始化一个`Canvas`对象，在这里现在整个游戏的逻辑部分；
- `helper.js` 为一些辅助函数
- `Canvas.js` `Canvas`类中实现整个游戏逻辑
- 然后就是几个对象类： `Fish.js`（大鱼） `Babyfish.js`（小鱼） `Kelp.js`（海草） `Bubble.js`（鱼食） `Wave.js`（波动） `Dust.js`（漂浮物）

目录出来之后其实整个游戏的逻辑实现就比较清晰了

### 来看看Canvas中的实现

#### init()
在`init()`中已经把要展示的东西都初始化出来了，并用数组或对象将其保存在`Canvas`的实例对象中
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

#### gameloop()
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

```javascript
  // 鱼吃东西 遍历鱼食的集合和大鱼的位置关系
  fishEatubble(item) {
    if (item.alive) {
      let gap = calLength2(item.x, item.y, this.bigFish.x, this.bigFish.y);
      if (gap < 900) {
        this.bigFish.eatFood(item.type);
        item.die();
        item.init();
      }
    }
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
除了距离之外，还有角度的趋向，就是大鱼会慢慢转向鼠标的方向，小鱼会跟随着大鱼的方向
```javascript
  // 距离趋向
  function lerpAngle(aim, cur, ratio) {
    var delta = cur - aim;
    if (delta > Math.PI) delta = delta - 2 * Math.PI;
    if (delta < -Math.PI) delta = delta + 2 * Math.PI;
    return aim + delta * ratio;
  }
```

#### 让运动更加的平滑
在`gameloop`的时候记录两次刷新的时间间隔`gapTime`,作为运动的系数可以达到让运动更加平滑的效果；
```javascript
  gameloop() {
    this.content1.clearRect(0, 0, this.width, this.height);
    window.gapTime = new Date() - window.preTime;
    if (window.gapTime > 40) window.gapTime = 40;
    window.preTime = new Date();
    this.animate();
    window.requestAnimationFrame(this.gameloop.bind(this));
  }
```
这边`gapTime`加上`window`是为了更好的体现这是个全局变量【狗头.png】


### Kelp海草
海草是随机生成的竖线，带有一定的透明度，`ctx.lineCap = "round"`实现顶端圆弧；
比较难的点是让海草摆动起来，这里运用了 [二次贝塞尔曲线](https://www.runoob.com/tags/canvas-quadraticcurveto.html)`quadraticCurveTo`, 曲线的起始点是最底部，控制点在运动过程中不用变，我们只要改变他的结束点就可以实现摆动；

我们让海草结束点之间`x + [-70, +70]`之间来回运动, 这时候你会发现在临界值（也就是 x - 70 和 x + 70）的时候, 海草会立马向反方向运动，运动没有曲线，正常逻辑下应该是个缓冲运动；为了实现这点，我们可以使用`Math`的  [正弦函数](https://baike.baidu.com/item/%E6%AD%A3%E5%BC%A6?fromtitle=%E6%AD%A3%E5%BC%A6%E5%87%BD%E6%95%B0&fromid=9601948)；

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
`Math.sin()`的返回值是`[-1, 1]`，`deltaTime`的增加速度影响震动的频率，也就是海草摇摆的速度；


### Bubble 鱼食
鱼食有三个状态，一个是慢慢变大的状态`growing()`,当海草初始化的时候，会将海草的宽高设置为0，并在循环中逐渐增大，等到增大到设置值的时候，鱼食就上升，当超出屏幕的时候，鱼食就消失了，这个时候`alive`标记为`false`，并重新初始化；

鱼食是在海草上面长出来的，所以鱼食的坐标是海草的结束点坐标，在初始化鱼食的时候，这边传入了一个海草结束点坐标的集合，鱼食初始化的时候随机生成一个`bubbleIndex`,`[海草的结束点坐标][bubbleIndex]`就拿到了一个随机的海草结束点坐标；因为海草是摆动的，所以这个海草结束点坐标的数组是动态的，我们在每次循环的时候都更新这个集合，这样鱼食也就跟着摆动啦（只有在`growing`的时候才会跟着摆动，上升的时候就不摆动了）；
```javascript
  initBubble() {
    let {content1, bubbleNum, kelpList} = this;
    let bubblePointList = kelpList.map(item => ({
      x: item.x,
      y: item.height
    }));
    for (let i = 0; i < bubbleNum; i++) {
      let bubble = new Bubble({
        bubblePointList,
        ctx: content1
      })
      this.bubbleList.push(bubble);
      bubble.init();
    }
  }
```

```javascript
  animate() {
    let bubblePointList = [];
    this.kelpList.forEach(item => {
      item.draw()
      bubblePointList.push({
        x: item.quadraticEndX,
        y: item.quadraticEndY
      })
    });
    
    this.bubbleList.forEach(item => {
      item.bubblePointList = bubblePointList;
      item.draw();
    });
  }
```

### Fish 大鱼
#### 鱼尾巴摆动
鱼尾巴是一个序列帧`img_tailList`,通过改变`curTail`达到改变当前帧的效果；
```javascript
  class Fish {
    init() {
      this.curTail = 0;
      this.img_tailList = [];
      for (let i = 0; i < 7; i++) {
        let img = new Image();
        img.src = require('./images/bigTail' + i + '.png').default;
        this.img_tailList.push(img);
      }     
    } 
    draw() {
      this.curTimeset += window.gapTime;
      if (this.curTimeset % 100 > 60) {
        this.curTail = (curTail + 1) % 7;
      }
    }
  }
```
`curTimeset`是不断累加的，`this.curTimeset % 100 > 60`就相当于60ms左右刷新一次；

#### 大鱼身体的变化
鱼的眼睛和鱼的身体也是序列帧，而鱼的身体变化是由鱼吃了鱼食导致的变化，鱼食有两种状态，对应的鱼身体也有两种变化，所以鱼身体有两个序列帧，通过`foodType`判断；大鱼最多可以吃7颗食物，也就是说每个序列帧集合都有7帧，我们通过`foodNumber`来判断当前在那一帧；
```javascript
  draw() {
    //...
    ctx.drawImage(img_bodyList[foodNumber], -width / 2, -height / 2, width, height);
  }
  eatFood (type) {
    this.foodNumber ++;
    this.foodType = type;
    if (this.foodNumber > 7) {
      this.foodNumber = 7;
    }
    if (this.foodType === 1) {
      this.img_bodyList = this.img_bodyType2List;
    } else {
      this.img_bodyList = this.img_bodyType1List;
    }
  }
```
`type`为传入的鱼食的类型

大鱼实现了，小鱼也就和大鱼差不多的，这里就不多说了！

### 增加点效果
#### Wave 波动
当大鱼吃到食物的时候，会出现波动效果，一个放大的圈，然后消失，大鱼去喂小鱼的时候也会有一个波动效果，喂养分值为2的食物会有两个double波动；

`this.waveList`存储当前的波动对象，当波动到最大的时候`alive`变为false，并把对象在`waveList`中移除
```javascript
  animate() {
    //...
    this.waveList = this.waveList.filter(item => {
      item.draw();
      return item.alive;
    })  
  }
  
  // 鱼吃东西
  fishEatubble(item) {
    if (item.alive) {
      let gap = calLength2(item.x, item.y, this.bigFish.x, this.bigFish.y);
      if (gap < 900) {
        this.bigFish.eatFood(item.type);
        this.addWave(item.x, item.y);  // 波动效果来一下
        item.die();
        item.init();
      }
    }
  }
```

#### Dust 海底的漂浮物
海底的漂浮物是随机在页面中分布的，和海草一样，会有一个正弦摆动；

## 总结
做完了整个游戏之后，还是感觉蛮好玩的，通过面向对象的思路，整个逻辑实现到后面还是比较清晰的；也对canvas实现一些小游戏有了新的认识；代码已经上传到了github，感兴趣的可以`clone`下来看一下啦,有任何问题也可以评论下面找到我；




dranein@163.com

地址：https://github.com/Dranein/activities-/tree/master/canvas/fish