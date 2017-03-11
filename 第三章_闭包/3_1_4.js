// var mult = function() {
// 	var a = 1;
// 	for (var i = 0, l = arguments.length; i < l; i++) {
// 		a = a * arguments[i];
// 	}
// 	return a;
// };
// mult(1, 2, 3)
/*
var cache = {};
var mult = function() {
	var args = Array.prototype.join.call(arguments, ',');
	if (cache[args]) {
		return cache[args];
	}
	var a = 1;
	for (var i = 0, l = arguments.length; i < l; i++) {
		a = a * arguments[i];
	}
	return cache[args] = a;
}
console.log(cache); //{}
console.log(mult(1, 2, 3))//6
console.log(cache);//{ '1,2,3': 6 }

var mult = (function() {
	// body...
	var cache = {};
	return function() {
		var args = Array.prototype.join.call(arguments, ',');
		console.log("cache");
		console.log(cache);

		if (args in cache) {
			return cache[args]
		}
		var a = 1;
		for (var i = 0, l = arguments.length; i < l; i++) {
			a = a * arguments[i];
		}
		return cache[args] = a;
	}
})()
*/

var mult = (function() {
	// body...
	var cache = {};
	var calculate = function() {
		var a = 1;
		for (var i = 0, l = arguments.length; i < l; i++) {
			a = a * arguments[i];
		}
		return a;
	}
	return function() {
		var args = Array.prototype.join.call(arguments, ',');
		console.log("cache");
		console.log(cache);
		if (args in cache) {
			return cache[args]
		}
		return cache[args] = calculate.apply(null, arguments);
	}
})()
console.log(mult(1, 2, 3));
console.log(mult(1, 2, 3));