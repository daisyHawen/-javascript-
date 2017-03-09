+ function() {
	// body...
	var a = 5;

	function a() {
		// body...
	}
	console.log(a);

	function b() {
		// body...
	}
	var b = 6;

	console.log(b);
	var c = d = b;
}()
console.log(d);
console.log(c);