var obj = {
	myName: 'sven',
	getName: function() {
		return this.myName
	}
};
console.log(obj.getName());
var getName2 = obj.getName;
console.log(getName2());