// var extent = function() {
// 	var value = 0;
// 	return {
// 		call: function() {
// 			value++;
// 			console.log(value);
// 		}
// 	}
// }
// var e = extent();
// e.call()
// e.call()
// e.call()

//一个简单单例模式--通过对象实现
// var extent = {
// 	value: 0,
// 	call: function() {
// 		this.value++;
// 		console.log(this.value);
// 	}
// }
// console.log(extent.value);
// extent.call();
// extent.call();
// extent.call();
// console.log(extent.value);
/*
var extent = (function() {
	var _value = 0;
	return {
		call: function() {
			_value++;
			console.log(_value);
		}
	}
}())

extent.call() //1
extent.call() //2
extent.call() //3
console.log(extent._value); //undefined
*/
// 构造器模式采用的也是闭包
var Extent = function() {
	this.value = 0;
}
Extent.prototype.call = function() {
	this.value++;
	console.log(this.value);
}
var extent = new Extent();
console.log(extent);
extent.call();
extent.call();
extent.call();
//反正遇到函数内部的变量不曾消失，那么就是用了闭包