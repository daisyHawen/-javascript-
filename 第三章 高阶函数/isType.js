var isString = function(obj) {
	// body...
	return Object.prototype.toString.call(obj) === '[object String]';
}
var isArray = function(obj) {
	// body...
	return Object.prototype.toString.call(obj) === '[object Array]';
}
var isNumer = function(obj) {
	// body...
	return Object.prototype.toString.call(obj) === '[object Number]';
}
console.log(isNumer(1));
var a = 1;
var b = [1, 2]
var c = "x";

var Animal = function(name) {
	this.name = name;
}
Animal.prototype.toString = function() {
	return "animal";
}
var cat = new Animal("cat")
console.log(typeof a);
console.log(typeof b);
console.log(typeof c);
console.log(typeof cat);
console.log(cat instanceof Animal);