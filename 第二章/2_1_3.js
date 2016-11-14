/*
var myClass = function() {
	this.name = 'ave';
}
var obj = new myClass();
//myClass 中的this指向obj
console.log(obj.name);

var myClass = function() {
	this.name = 'svem';
	return {
		name: 'jack'
	}
}
var obj = new myClass();
console.log(obj.name);

var myClass = function() {
	this.name = 'svem';
	return 'jack'
}
var obj = new myClass();
console.log(obj.name);
*/

var obj1 = {
	name: 'sven',
	getName: function() {
		return this.name;
	}
}
var obj2 = {
	name: 'ane'
};
console.log(obj1.getName());
console.log(obj1.getName.call(obj2)); //将this指针指向obj2