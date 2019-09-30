# 小游戏之红包雨
原生js，按照面向对象的想法练习的一款h5小游戏；
项目中不依赖其他的插件，只在实现功能，没有做太多的样式
*****

首先我们新建一个GameRedpacket类；作为整个游戏的框架；

这个类的主要属性和方法有：
`
class GameRedpacket {
    constructor{
        this.redPacketWarp = document.getElementById(el);
        if (!el || !this.redPacketWarp) return false; //没有框架直接return了
        this.score = 0; //得分
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
}
`








