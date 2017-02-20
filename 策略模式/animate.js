// 缓动算法

var tween = {
	linear: function(t, b, c, d) {
		return c * t / d + b;
	},
	easeIn: function(t, b, c, d) {
		return c * (t /= d) * t + b;
	},
	strongEaseIn: function(t, b, c, d) {
		return c * (t /= d) * t * t * t * t + b;
	},
	strongEaseOut: function(t, b, c, d) {
		return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
	},
	sineaseIn: function(t, b, c, d) {
		return c * (t /= d) * t * t + b;
	},
	sineaseOut: function(t, b, c, d) {
		return c * ((t = t / d - 1) * t * t + 1) + b;
	}
};
// Animate类

var Animate = function(dom) {
	this.dom = dom; //dom name of dom object
	this.startTime = 0; //start time
	this.startPos = 0; //start position of dom 
	this.endPos = 0; //end position of dom
	this.propertyName = null; //the css attribute name of dom
	this.easing = null; //animation algorithm 
	this.duration = null; //duration time of animation
};

//function start 
Animate.prototype.start = function(propertyName, endPos, duration, easing) {
	this.startTime = +new Date;
	this.startPos = this.dom.getBoundingClientRect()[propertyName]; //origin position of dom
	this.propertyName = propertyName;
	this.endPos = endPos;
	this.duration = duration;
	this.easing = tween[easing];

	var self = this;
	var timeId = setInterval(function() {
		if (self.step() === false) {
			clearInterval(timeId);
		}
	}, 19);
};

Animate.prototype.step = function() {
	var t = +new Date;
	if (t >= this.startTime + this.duration) {
		this.update(this.endPos);
		return false;
	}
	var pos = this.easing(t - this.startTime, this.startPos, this.endPos - this.startPos, this.duration);
	this.update(pos); //renew position of dom
}

Animate.prototype.update = function(pos) {
	this.dom.style[this.propertyName] = pos + 'px';
}