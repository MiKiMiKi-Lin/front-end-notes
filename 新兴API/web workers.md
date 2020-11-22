---
# 主题列表：juejin, github, smartblue, cyanosis, channing-cyan, fancy, hydrogen, condensed-night-purple, greenwillow
# 贡献主题：https://github.com/xitu/juejin-markdown-themes
theme: channing-cyan
highlight: vs2015
---
**刚开始了解到这个API是源于此**：在做H5与原生进行交互时遇到了一个隐藏的bug，其原因是安卓代码的一段bug导致H5页面受到阻塞，页面卡死无法继续使用，后面与安卓与IOS开发探讨方案时聊到js**多线程**的问题。（当然由于业务复杂度不算很高，最终还暂未使用js的多线程）

过去一直认为js是单线程的，无法实现多线程，但是现在看来这个观念是错误的。因为有了[Web Workers API](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API)。当然js本身还是单线程的，但是浏览器作为宿主环境提供了js多线程运行的环境。

## 概述
Web Worker的全局作用域是**self/this**，是worker对象本身，它无法访问父线程作用域的东西，不共享作用域，无法通过任何方式影响页面的外观。

Web Worker本身是一个最小化的运行环境，功能有限：
1. 最小化的**navigator**对象：onLine、appName、appVersion、userAgent、platform
2. 只读的**location**
3. seTimeout、setInterval、clearTimeout、clearInterval
4. XMLHttpRequest对象

Web Worker 分为**专用线程**和**共享线程**。前者只能被所创建的线程使用，父子线程一对一；而后者可以是多对一，子线程可以被多个父线程共享

## 专用线程

假设父线程为 main.js，子线程为 main.js 的同级目录下的 subWorker.js

### 1. 父线程

main.js

创建worker时，传入一个需要运行的脚本。基本的使用和通信方式都在下方的代码中体现了，请看：

```
let worker = new Worker('./subWorker.js')
```

```
// 向web worker传递消息
worker.postMessage('start') // 消息内容是任何可被序列化的值，如字符串、对象等
```

```
// 接收来自web worker的数据
worker.onmessage = function(event) {
    let { data } = event // 来自worker的数据放在event.data
    //
}
```

```
// 建议使用onerror处理错误
worker.onerror = function(event) {
    console.log(`Error: ${event.filename}(${event.lineno}) ${event.message}`)
}
```

```
// 可使用terminate终止worker
worker.terminate()
 ```
 
子线程的使用与父线程中对worker对象的使用是有所区别的，下面展示了在子线程脚本中的基本使用：

### 2. 子线程 

subWorker.js

```
// 接收来自父线程的数据
self.onmessage = function(event) {
    let { data } = event
    // handle data...
    self.postMessage(data) // 异步方式触发父线程的message事件
}

// 可使用close终止worker
self.close()
```

这里的self指的就是这个子线程本身，这里关系到web worker 全局作用域的问题，请往下看：

#### 全局作用域
worker最顶层的对象不是 **windows** ，而是 [**WorkerGlobalScope**](https://developer.mozilla.org/zh-CN/docs/Web/API/WorkerGlobalScope)，它呢，有一个属性 **self**, 因此我们可以使用 **self** 或者worker对象本身来访问其 **上下文**，你也可以省略。

> 在父线程中使用时，onmessage和postMessage() 必须挂在worker对象上，而在worker中使用时不用这样做。原因是，在worker内部，worker是有效的全局作用域。

#### 最小化的运行环境
前面的概述已经介绍过啦，worker的功能是有限的，并不是所有的在父线程可以用的东西它都可以使用。

注意：
>当一个消息在父线程和worker之间传递时，它被复制或者转移了，而不是共享。

### 3. importScripts 引入外部脚本

importScripts 是一个全局函数，接受0个或者多个URI作为参数来引入资源

```
importScripts();                        /* 什么都不引入 */
importScripts('worker1.js');               
importScripts('worker1.js', 'worker2.js'); 
```
文件引入的过程是**同步**的，按importScripts() 中的文件名顺序进行，直到所有脚本都下载完。但是， **脚本的下载顺序不固定**

## SharedWorker --- 共享worker

共享worker指的是该worker可以被多个脚本所共享，构造函数是 `SharedWorker`

```
let myWorker = new SharedWorker('worker.js')
```

下面介绍下 SharedWorker 与 Worker 的差异：

### 1. 端口对象
在 `SharedWorker` 的使用上, 与worker的明显区别就是通信过程必须通过**端口对象**，[MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API/Using_web_workers)中提到，在专用worker中这一部分是**隐式进行**的。


- 端口需要显示打开，打开方式为**start()方法**或者**onmessage事件处理函数**。
- 从上一描述可以看出，start()方法不是必要的，但是在消息事件被**addEventListener()**方法使用时，必须使用start()

```
// 父线程
myWorker.port.start()

// 子线程
port.start()

```

在**父线程**中其它的postMessage、onmessage等的使用与worker类似，只是需要记住通过**端口对象port**进行使用（这里强调了父线程，因为子线程的处理有稍许差异，看下文）。如
```
myWorker.port.postMessage('Hello')

myWorker.port.onmessage = function (e) {
    const { data } = e
    // do sth
}
```

### 2. onconnect
上面介绍的父线程的通信方式相对来说较为简单，只是端口对象的区别，而在子线程中多了 **onconnect** 事件处理函数来执行相应的代码。

```
onconnect = function(e) {
  let port = e.ports[0] // 使用事件的ports属性来获取端口

  port.onmessage = function(e) {
    let result = 10
    port.postMessage(result)
  }
}
```

在worker线程中设置 onmessage 消息处理函数也会隐式打开与父线程的端口连接，因此对port.start()的调用也是不必要的


## 使用场景
主要是处理耗时的任务，不阻塞用户界面。
- 复杂数据的运算、排序等处理
- 图像、视频、音频的处理，如把彩色图像转换成灰阶图像等
- canvas图形处理
- 加密解密等
- 大数据处理
- ...





参考：
- [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API/Using_web_workers)
- 红宝书
