// class CanvasRedpacket {
// 	constructor ({el, redImgUrl, timeout, success, gameover}) {
		
// 	}
// 	init () {
		
// 	}
	
// }

let $preLoad = document.getElementById('preLoad');
let $load = document.getElementById('load');
let imgSrcList = [
	'http://www.bizhidaquan.com/d/file/dongwu/mao/2014-12-31/9ac761baf727458ff6f47b0d10773a90.jpg',
	'http://desk.fd.zol-img.com.cn/t_s960x600c5/g5/M00/02/09/ChMkJ1bKzp6IK3zvACU6u8_k1lcAALJMwAcdoEAJTrT440.jpg',
	'http://b-ssl.duitang.com/uploads/item/201703/23/20170323142606_nCvhc.thumb.700_0.jpeg',
	'http://desk.fd.zol-img.com.cn/g5/M00/03/02/ChMkJlbLCw2IMm0TAAGiRq5FBzkAALLgQH10TkAAaJe156.jpg'
];

function loadImg (srcList, callback) {
	let num = 0;
	let len	=	srcList.length;
	srcList.forEach((src) => {
		let img = new Image();
		img.src = src;
		img.onload = () => {
			num++;
			$load.innerHTML = parseInt(num/len*100)+'%';
			if (num === len) {
				callback && callback();
			}
		}
		$preLoad.appendChild(img);
	})
}

loadImg(imgSrcList, () => {
	console.log('加载完成')
});

