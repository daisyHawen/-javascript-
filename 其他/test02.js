this.a = 20;
var test = {
	a: 40,
	init: function() {
		// body...
		function go() {
			// body...
			// this.a = 60
			console.log(this.a);
		}
		go.prototype.a = 50;
		return go;
	}
}
var p = test.init();
p();
new(test.init())();