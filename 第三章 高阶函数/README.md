# 高阶函数
高阶函数是指满足以下条件之一的函数：
- 函数可以作为参数被传递
- 函数可以作为返回值输出

##1.函数作为参数传递
###1.1 回调函数
第一种最熟悉的应用就是ajax里面的callback。
第二种callback这里写下书上的这个例子：

```
<script type="text/javascript">
    var appendDiv=function(){
        for(var i=0;i<10;i++){
            var div=document.createElement('div');
            div.innerHTML=i;
            document.body.appendChild(div)
            div.style.display='none';
        }
    }
    appendDiv()
</script>
```
这段代码的复用性就很差，创建10个节点，但是style固定了== 于是可以用回调函数的方式实现，虽然我觉得也不是很好。

```
    var appendDiv=function(callback){
        for(var i=0;i<10;i++){
            var div=document.createElement('div');
            div.innerHTML=i;
            document.body.appendChild(div)
            if(typeof callback==='function'){
                callback(div)
            }
            // div.style.display='none';
        }
    }
    function setDisplay(node) {
        // body...
        node.style.display='none';
    }
    appendDiv(setDisplay)
```
这样写的好处就是，通过传递函数指定如何设置div的样式；比如说我们还可以传入一个setColor或者setFont的函数，复用性更高。
书中的说法隐藏节点是客户发起的”委托“事件，具体执行逻辑放在appendDiv中。

###1.2Array.prototype.sort
Array.prototype.sort()接受一个函数作为参数，从而可以写函数决定了升序或者降序，很有意思。

##2.函数作为返回值输出
###2.1判断数据类型
可以通过toString来判断函数的类型，例如下面这段代码，但是问题是，其实他们很相似。
```
var isString = function(obj) {
    return Object.prototype.toString.call(obj) === '[object String]';
}
var isArray = function(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
}
var isNumer = function(obj) {
    return Object.prototype.toString.call(obj) === '[object Number]';
}
```
因此，为了避免多余的代码，采用一种函数作为返回值输出的方式

```
var isType = function(type) {
    return function(obj) {
        return Object.prototype.toString.call(obj) === '[object ' + type + ']';
    }
}
var isString = isType('String');
var isArray = isType('Array');
var isNumer = isType('Number');

```
这样代码就减少了冗余，其实我觉得闭包也是一种函数作为返回值输出的形式。

###2.2 getSingle

就是下面的代码这样，我不知道这是什么意思？
```
<script type="text/javascript">
    var getSingle=function (fn) {
        console.log(arguments);
        var ret;
        return function () {
            return ret||(ret=fn.apply(this,arguments))
        }
    }
    var getScript=getSingle(function () {
        return document.createElement('script');
    })
    var script1=getScript();
    var script2=getScript();
    alert(script1===script2);
</script>
```