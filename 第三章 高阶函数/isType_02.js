// var isString = function(obj) {
// 	return Object.prototype.toString.call(obj) === '[object String]';
// }
// var isArray = function(obj) {
// 	return Object.prototype.toString.call(obj) === '[object Array]';
// }
// var isNumer = function(obj) {
// 	return Object.prototype.toString.call(obj) === '[object Number]';
// }
var isType = function(type) {
	return function(obj) {
		return Object.prototype.toString.call(obj) === '[object ' + type + ']';
	}
}
var isString = isType('String');
var isArray = isType('Array');
var isNumer = isType('Number');
