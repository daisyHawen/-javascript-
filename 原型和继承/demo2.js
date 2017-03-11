function myClass() {
	console.log('enter myCLass');
	this.name = 'myCLass';
}
var getName = function() {
	console.log(this.name);
}
var obj1 = {
		name: 'obj1'
	}
	// document.name = "documen";
	// console.log(getName());
getName.call(obj1)
	// getName()
getName.call(myClass)