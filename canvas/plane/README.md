# canvas小游戏 - 飞机大战

## 前言
canvas小游戏系列之手摸手实现飞机大战；

![预览图](https://github.com/Dranein/activities-/blob/master/plane.gif?raw=true)


### 项目信息
[在线试玩](https://dranein.github.io/plane/)

 · 加了丢丢音效，建议打开声音

 · 因为放在github上，所以loading会久一丢丢，不过他是真的有在load

源码地址： https://github.com/Dranein/activities-/tree/master/canvas/plane
- `git clone https://github.com/Dranein/activities-.git`
- `cd canvas/plane`
- `npm install`
- `npm run start`
- `npm run build`

### 游戏规则
· 整个游戏有7个level,根据得分的情况升级，相对的设置了8架飞机，每次达到升级分数，你的飞机就会升级；

· 敌方的飞机也根据游戏的等级，会出现越来越多种类的飞机，其中一些飞机也有着自己的特性，这边是设置了斜飞，加速度；

· 敌方飞机被子弹打中的话就会爆炸，游戏累加100分；

· 当我方飞机被敌机触碰时，游戏结束；



### 实现思路
音效方面用了 [howler](https://www.npmjs.com/package/howler)，实现起来也十分方便;

直接拿了上一个小游戏的框架直接做的，也可顺便去瞧瞧 [canvas小游戏 - 爱心鱼](https://juejin.im/post/5df8b14bf265da33c84a52f6);

动画的技巧和实现在做爱心鱼的时候已经印象很深刻了，这里主要记录一下一些可扩展的点:

#### checkLevel()
根据当前的分数`this.score`去检查等级，当达到指定等级的时候，飞机就会升级，执行`upgrade()`，并且有一个升级的音效`soundUpgrade.play()`，
```javascript
  // Canvas.js
  checkLevel() {
    // let arr = [2000, 8000, 15000, 20000, 50000, 100000, 200000];
    let arr = [1000, 2000, 3000, 4000, 5000, 6000, 7000];
    if (arr.indexOf(this.score) > -1) {
      this.myPlane.upgrade();
      soundUpgrade.play();
      window.gameLevel++;
    }
  }
```

#### upgrade()
飞机的upgrade()实现飞机升级的变化，这边是处理了飞机的模型，子弹的速度`shootSpeed`和加了一个波动的效果`waveList`，后续根据需求，也可以替换子弹的`img`或者子弹发射的数量，实现也就是在子弹执行`draw()`的时候做文章；但有一点要注意的是，如果子弹宽高改变了，碰撞系数就要重新计算修改；

```javascript
// MyPlane.js
  upgrade() {
    this.level++;
    this.shootSpeed += 1;
    if (this.level > img_Plane.length) this.level = img_Plane.length - 1;
    this.img = img_Plane[this.level];
    this.waveList.push(new Wave({
      x: 0,
      y: 0,
      radius: 100,
      ctx: this.ctx
    }))
  }
```



dranein@163.com

地址：https://github.com/Dranein/activities-/tree/master/canvas/plane