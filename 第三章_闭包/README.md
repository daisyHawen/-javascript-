# 闭包问题

## 变量的作用域
## 变量的生存周期
对于全局变量来说，生存周期是永久的；对于局部变量而言，一旦退出函数，局部变量就会被销毁。
下面看一段代码，代码示例3_1_2.html

```
<script type="text/javascript">
    var func=function(){
        var a=1;
        return function(){
            a++;
            alert(a);
        }
    }
    var f=func();
    f();//2
    f();//3
    f();//4
</script>
```
很有意思，a并没有被销毁。原因是f返回了一个匿名函数，而这个匿名函数访问了a，局部变量一直在匿名函数的环境里。这里测试了一下，确实f是一个匿名函数。也就是说f没有被销毁，那么a就不会被销毁咯？

![这里写图片描述](http://img.blog.csdn.net/20170309160431781?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc2luYXRfMjUxMjcwNDc=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

## 闭包的经典应用
先上代码，3_1_3.html

```
<html>
<head>
    <title></title>
</head>
<body>
<div>1</div>
<div>2</div>
<div>3</div>
<div>4</div>
<div>5</div>
</body>
<script type="text/javascript">
    var nodes=document.getElementsByTagName('div');
    for (var i = 0 ; i < nodes.length; i++) {
        nodes[i].onclick=function(){
            alert(i);
        }
    }
</script>
</html>
```

无论点击1、2、3、4、5都是显示5。
这是为什么呢？我们读一下代码，我们是为每一个node添加的onclick事件啊？为什么会这么怪异呢？

原因是onclick事件是异步触发的，当事件被触发时，for循环早就结束。
另外，说一下i的作用域是全局作用域，js里面不存在块级作用域。
### 解决方案1
做一点小改动，将var 变成let，就可以解决。这里理解一下为什么可以解决：因为let是块级作用域，也就是i的生存周期只在for循环中，就不存在alert(i)的i是全局中的i了。
```
<script type="text/javascript">
    var nodes=document.getElementsByTagName('div');
    for (let i = 0 ; i < nodes.length; i++) {
        nodes[i].onclick=function(){
            alert(i);
        }
    }
</script>
```
### 解决方案2
结合上面的思想，我们只需要把i的作用域包裹在一个局部作用域中，就能解决这个问题。我们采用闭包的方式来看一下呢：

```
    var nodes=document.getElementsByTagName('div');
    for (var i = 0 ; i < nodes.length; i++) {
        (function(i){
            nodes[i].onclick=function(){
                alert(i);
            }
        })(i)
    }
```
像这样，我们把i放在一个函数里面，那么在作用域链上面就会先查找该函数内部的i，再找到全局的i，这样的i就不是5了。

### 解决方案3，通过this

## 闭包的其他应用

### 1.封装变量
例如一个mult函数（计算乘积的函数）

```
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
```
因为担心mult一旦作用结束，那么cache就被销毁了，但是通过闭包可以把cache封装在mult函数中，同时随着mult()函数调用结束，cache也不会消失；

```
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
console.log(mult(1, 2, 3));
console.log(mult(1, 2, 3));
```
这样在外部访问不到cache，但是cache却存在着，真的是太神奇了。mult(1, 2, 3)这个函数返回的是一个匿名函数的引用，而并不是一个简单的对象或者是一个基本类型，这个函数可以访问到mult内的cache。所以cache的生命得以延续下来了。很有意思。
![这里写图片描述](http://img.blog.csdn.net/20170311153449898?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc2luYXRfMjUxMjcwNDc=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

再看一下下面这种写法，将计算部分提出去了，使得代码更加优雅。
```
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
```
calculate.apply(null, arguments);中的null表示this指向宿主对象。


### 2.延续局部变量的作用域

## 闭包和面向对象设计
先看由前面引申而来的一个包含闭包的函数，这个返回的是一个call，call是一个函数，却是在extent内部的函数，因此它可以访问value；
```
var extent = function() {
    var value = 0;
    return {
        call: function() {
            value++;
            console.log(value);
        }
    }
}
var e = extent();
e.call()
e.call()
e.call()
```
单例模式的实现：
其实以前都不知道单例模式运用到了闭包，确实，这就是闭包啊。call可以访问extent内部的变量，value可以被call改变。这是一个简单的单例模式，并没有设置私有变量。
```
var extent = {
    value: 0,
    call: function() {
        this.value++;
        console.log(this.value);
    }
}
console.log(extent.value); //0
extent.call(); //1
extent.call(); //2
extent.call(); //3
console.log(extent.value); //3
```

一个具有私有属性的单例模式的实现，这里就不能通过extent._value访问到value了，但是通过call可以。

```
var extent = (function() {
    var _value = 0;
    return {
        call: function() {
            _value++;
            console.log(_value);
        }
    }
}())

extent.call() //1
extent.call() //2
extent.call() //3
console.log(extent._value); //undefined
```

## 闭包实现命令模式
原始的例子：

```
<body>
<button id="execute">点我执行命令</button>
<button id="undo">点我执行命令</button>

</body>
<script type="text/javascript">
    var Tv={
        open:function(){
            console.log('打开电视机');
        },
        close:function () {
            console.log('关闭电视机');
        }
    }
    var OpenTvCommand=function(receiver){
        this.receiver=receiver;
    }
    OpenTvCommand.prototype.execute=function(){
        this.receiver.open();
    }
    OpenTvCommand.prototype.undo=function(){
        this.receiver.close();
    }
    var setCommand=function(command){
        document.getElementById('execute').onclick=function(){
            command.execute();
        }
        document.getElementById('undo').onclick=function(){
            command.undo();
        }
    }
    setCommand(new OpenTvCommand(Tv))
</script>
</html>
```

采用闭包后

```
var Tv = {
    open: function() {
        console.log('打开电视机');
    },
    close: function() {
        console.log('关闭电视机');
    }
}
var createCommand = function(receiver) {
    var execute = function() {
        return receiver.open()
    }
    var undo = function() {
        return receiver.close()
    }
    return {
        execute: execute,
        undo: undo
    }
};
var setCommand = function(command) {
    document.getElementById('execute').onclick = function() {
        command.execute();
    }
    document.getElementById('undo').onclick = function() {
        command.undo();
    }
}
setCommand(createCommand(Tv));
```
说实话我不知道有什么区别，大概就是createCommand采用了一种单例模式的方法？将execute和undo方法定义在了内部。之前是通过原型的方式实现的，就需要new 创建一个对象。

## 闭包与内存管理
局部变量本来应该在函数退出的时候就解除引用，但是由于被封闭在闭包形成的环境中，那么这个局部变量就能一直生存下去。闭包会存在一些数据无法被及时销毁的，但是如果将来需要回收这些变量，可以手动设置这些变量为null。
跟闭包和内存泄露有关的是会出现循环引用，如果闭包的作用域链中保存着一些DOM节点，那么就有可能造成内存泄露。但是这不是闭包的问题，也不是javascript的问题，而是由于BOM和DOM的对象是使用C++以COM对象的方式实现的，而COM对象的垃圾收集机制采用的是引用技术策略。

