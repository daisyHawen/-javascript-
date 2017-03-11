console.log(Math.max(1, 2, 5, 4, 3));
var x = Math.max.apply(null, [1, 2, 5, 6, 3, 0]);
console.log(x);