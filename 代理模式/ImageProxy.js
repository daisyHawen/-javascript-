/*不使用代理的预加载模式*/
var localPath = '';
var webPath = '';
var MyImage = (function() {
	var imgNode = document.createElement('img');
	document.body.appendChild(imgNode);
	var img = new Image;
	img.onload = function() {
		imgNode.scr = img.src;
	};
	return {
		setSrc: function(src) {
			imgNode.src = localPath;
			img.src = src;
		}
	};
})();

MyImage.setSrc(webPath);