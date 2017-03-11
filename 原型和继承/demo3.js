(function() {
	console.log(arguments); //{ '0': 1, '1': 2 }
	Array.prototype.push.call(arguments, 3)
	console.log(arguments); //{ '0': 1, '1': 2, '2': 3 }
})(1, 2);