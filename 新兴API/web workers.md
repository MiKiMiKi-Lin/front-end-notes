**刚开始了解到这个API是源于此**：在做H5与原生进行交互时遇到了一个隐藏的bug导致客户频频投诉，其原因是安卓代码的一段bug导致H5页面受到阻塞，页面卡死无法继续使用，后面与安卓与IOS开发探讨方案时聊到js**多线程**的问题。（当然由于业务复杂度不算很高，最终还暂未使用js的多线程）

过去一直认为js是单线程的，无法实现多线程，但是现在看来这个观念是错误的。因为有了[Web Workers API](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API)。当然js本身还是单线程的，但是浏览器作为宿主环境提供了js多线程运行的环境，

## 概述
Web Worker的全局作用域是**self/this**，是worker对象本身，它无法访问主线程作用域的东西，不共享作用域，无法通过任何方式影响页面的外观。

Web Worker本身是一个最小化的运行环境，功能有限：
1. 最小化的**navigator**对象：onLine、appName、appVersion、userAgent、platform
2. 只读的location
3. seTimeout、setInterval、clearTimeout、clearInterval
4. XMLHttpRequest对象

## 使用

```
let worker = new Worker('subWorker.js')
// 向web worker传递消息
worker.postMessage('start') // 消息内容是任何可被序列化的值
// 接收来自web worker的数据
worker.onmessage = function(event) {
    let { data } = event // 来自worker的数据放在event.data
    //
}
// 建议使用onerror处理错误
worker.onerror = function(event) {
    console.log(`Error: ${event.filename}(${event.lineno}) ${event.message}`)
}
// 可使用terminate终止worker
worker.terminate()
 ```
subWorker.js
```
// 接收来自主线程的数据
self.onmessage = function(event) {
    let { data } = event
    // handle data...
    self.postMessage(data) // 异步方式触发主线程的message事件
}

// 可使用close终止worker
self.close()
```


## 使用场景
主要是处理耗时的任务，不阻塞用户界面，如复杂数据的排序等处理、把彩色图像转换成灰阶图像、加密解密等。





参考：
- [ Web Worker 初探 -- 掘金](https://juejin.im/post/6844903638431694862#heading-4)
- 红宝书