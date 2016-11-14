var str1 = "abc",
	str2 = new String("abc");
console.log(typeof(str1));
console.log(typeof(str2));
console.log(str2 instanceof String);

function typeAndValue(x) {
	if (x == null) return ""; //Null和undefined没有构造函数
	switch (x.constructor) {
		case Number:
			return "Number:" + x
			break;
		case String:
			return "String:" + x
			break;
		case Date:
			return "Date:" + x
			break;
		case RegExp:
			return "RegExp:" + x
			break;
	}
}
console.log(typeAndValue(str1));
console.log(typeAndValue(str2));

function type(o) {
	var t, c, n; //type,class,name
	if (o === null) {
		return "null";
	}
	//NAN和它自身不等
	if (o !== o) {
		return "NAN";
	}
	//如果不是object的话，就使用它:number,boolean,undefined,string
	if ((t = typeof o) !== "object") return t;
	//返回对象名
	if ((c = classof(o) != "Object")) return c;
	//如果构造函数名存在的话，就返回构造函数名
	if (o.constructor && typeof o.constructor === "function" && (n = o.constructor.getName())) return n;
	return "object";
}
//这个构造函数没有名字
var Complex = function(x, y) {
	this.r = x;
	this.i = y
};
// 这个构造函数有名字
var Range = function Range(f, t) {
	this.form = f;
	this.to = t
}
console.log(type(Complex));
console.log(type(Range));