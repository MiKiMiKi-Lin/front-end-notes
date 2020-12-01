#### 函数内部`var`和`let`的申明

``` Javascript
let x = 1

function func() {
  console.log(x) // ?

  var x = 2
}

func()
```

x变量提升，显然答案为`undefined`

``` Javascript
let x = 1

function func() {
  console.log(x) // ?

  let x = 2
}

func()
```
打印出来的是`VM2223:4 Uncaught ReferenceError: Cannot access 'x' before initialization`。

这里有个小陷阱，虽然`let`没有变量提升，但是从程序执行进入代码块/函数的那一刻起，变量就开始进入“未初始化”状态，在程序执行到相应的 let 语句之前都是不可用的。
