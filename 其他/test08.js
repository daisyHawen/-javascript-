function Cat(name, color) {
	this.name = name;
	this.color = color;
	this.type = "猫科动物";
	this.eat = function() {
		console.log("吃老鼠")
	}
}
var cat1 = new Cat("大毛", "黄色");
console.log(cat1.type);
var cat2 = new Cat("小黑", "黑色");
console.log(cat1.eat() == cat2.eat());