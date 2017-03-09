function Cat(name, color) {
	this.name = name;
	this.color = color;
	this.type = "猫科动物";
	this.eat = function() {
		console.log("吃老鼠")
	}
}
Cat.prototype.eat = function() {
	console.log("吃老鼠");
	// body...
};
Cat.prototype.type = "猫科动物";
Cat.prototype.getColor = function() {
	console.log('color' + this.color);
	// body...
};
var cat1 = new Cat("大毛", "黄色");
console.log(cat1.getColor()); //黄色
var cat2 = new Cat("小黑", "黑色");
console.log(cat1.eat() == cat2.eat()); //true