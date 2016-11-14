var obj1 = new Object();
var obj2 = {};
console.log(Object.getPrototypeOf(obj1) === Object.prototype);
console.log(Object.getPrototypeOf(obj2) === Object.prototype);

function Person(name) {
	this.name = name;
}
Person.prototype.getName = function() {
	return this.name;
}
var a = new Person('seven');
console.log(a.name);
console.log(a.getName());