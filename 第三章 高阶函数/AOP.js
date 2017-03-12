 Function.prototype.before = function(beforefn) {
 	var _self = this;
 	console.log(_self);
 	return function() {
 		// body...
 		console.log(this);
 		beforefn.apply(null, arguments); //执行新函数，修正this
 		return _self.apply(this, arguments); //执行新函数
 	}
 }
 Function.prototype.after = function(afterfn) {
 	var _self = this;
 	return function() {
 		var ret = _self.apply(this, arguments);
 		afterfn.apply(this, arguments);
 		return ret;
 	}
 }
 var func = function() {
 	console.log(2);
 }
 func = func.before(function() {
 	console.log(1);
 }).after(function() {
 	console.log(3);
 })
 func();
 console.log(typeof func);