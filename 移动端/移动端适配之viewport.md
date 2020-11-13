## 前言
  近日重新思考了移动端适配的问题，想起了之前用过的[lib-flexible](https://github.com/amfe/lib-flexible)，不料发现官方说“这个过渡方案已经可以放弃使用”。

  好吧，毕竟了做了有段时间的移动端开发了，关于移动端的适配问题，关于viewport的理解，一直也是懵懵懂懂。勤勤恳恳的google之后， 那就认认真真的记录和总结一下吧。

## viewport
viewport，顾名思义，视窗、视口，即浏览器【用于显示网页的区域】，理论上严格等于浏览器的窗口。注意，它**不等同于**浏览器的【可视区域】，两者的大小不存在一定的联系。

通常，移动设备上**默认的viewport**（layout viewport）会大于浏览器可视区，以便移动设备显示传统专为PC设计的网站，显而易见，由此会不可避免地引发**横向滚动条**的问题。
 
一般在移动设备上浏览器默认将viewport设为980px/1024px, 也可为其它值。


### layout viewport（布局视口）
- 一个固定的存放网页的区域    
- **iphone默认980px**，安卓厂商不一致
- 度量方式: `document.documentElement.clientWidth/Height`
### visual viewport（可视视口）
- 当前窗口的可视区域  
- 默认是屏幕的宽度，用户可通过滑动缩放等操作改变这个可视视口。**用户一旦缩小，屏幕中显示了更多的css像素，可视视口变大，反之，放大时可视视口变小。**       
- 度量方式: `window.innerWidth/Height`

[这里](https://www.yuque.com/yunplane/axviq0/bm6xt8)有个比喻讲得不错，引用一下：
> 打个比方：用放大镜看一张图片，图片的宽度是布局视口，不可变的。放大镜相当于可视视口。我们移动放大镜或者调解远近距离可以改变可视视口，从而查看布局视口的不同内容


  > 关于两者的值是否可变？  
不设置meta width = device-width时**不可变**


![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/71ccde8fce6242e59db7afcc69bd8b20~tplv-k3u1fbpfcp-watermark.image)



### ideal viewport（理想视口）
- 移动设备的理想viewport，一个不需要用户缩放和横向滚动条可以正常查看网站所有内容的viewport。
- 宽度等于移动设备的屏幕宽度


   

## meta标签
通过`mata`标签可以定义视窗的宽度
```
<meta name="viewport" content="width=device-width,initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
```
`width=device-width`使得视窗宽度（**layout viewport**）等于设备的屏幕宽度，即**ideal viewport**  
`initial-scale=1.0`设置页面的初始缩放值，效果跟`width=device-width`的设置是一样的  
`maximum-scale=1.0`用户最大缩放值   
`user-scalable=0` 不允许用户缩放  


> 一个小思考: `initial-scale=1.0` 不就是不进行缩放吗，怎么就跟`width=device-width`一样的效果了？

缩放是相对的，即考虑**相对什么缩放**才有意义。从后往前推导，既然两者效果一样，那么显而易见，它其实是**相对deal viewport**缩放的。 

此外，如果同时设置了width和initial-scale，那么取值哪个？

TODO

> 通常，两个是一起写的，这是因为iPhone、iPad、IE会横竖屏不分。

## 三个像素
对移动端有所了解的都知道，**css的1px !== 设备的1px**，why?  

### 1. 物理像素(physical pixel)
- 又称设备像素（dp，device pixel，单位pt
- **分辨率**即设备屏幕在水平和垂直方向上的物理像素个数
- **像素密度PPI**（pixel per inch），每英寸有多少个物理像素。PPI越高，画质越好。

在视网膜屏幕的概念出现前，并没有设备像素和设备独立像素的区别，两者是一样的，出现了视网膜和更高PPI的屏幕后，屏幕上的像素点多了，1px的css像素不再简单的等同于1个物理像素，因此要区分好两者。

### 2. 设备独立像素 (dip, density-independent pixel, device-independent pixel)
又称密度无关像素、逻辑像素，是由程序使用的虚拟像素（如css像素），然后再由相关系统转化为物理像素。

### 3. CSS像素(css pixel)
又称虚拟像素，是一个抽象单位，用于浏览器，度量web页面的内容，是css样式使用的逻辑像素。

CSS像素 = 设备独立像素 = 虚拟/逻辑像素

那设备像素和设备独立像素之间的关系是什么？

## 设备像素比 (dpr, device pixel ratio)
`window.devicePixelRatio`, 物理像素和设备独立像素的比例    
`window.devicePixelRatio = 物理像素 / dip(s)`

非视网膜屏幕, iphone上，dpr = 320 / 320 = 1   
视网膜屏幕，如iPhone 4s, dpr = 640 / 320 = 2

### 其它概念
#### 像素密度 (PPI)
每英寸长度上有多少个像素, ，又叫像素数目

#### DPI (dots per inch)
指每英寸的点数




## 相关属性
`screen.width`  
对于该属性的取值，不同设备的取值存在差异
- IOS视网膜屏幕：返回dips的宽（设备独立像素）
- 部分安卓，返回物理像素的宽度



&nbsp;
#### 参考链接：
> [Web viewport](https://www.yuque.com/yunplane/axviq0/bm6xt8)  
[使用Flexible实现手淘H5页面的终端适配](https://github.com/amfe/article/issues/17)   
来自ppk（一个对移动设备viewport有着诸多研究的大神）的好文：[A tale of two viewports — part two](https://www.quirksmode.org/mobile/viewports2.html)，也可看其译文[viewports剖析](https://www.w3cplus.com/css/viewports.html)

https://developer.mozilla.org/zh-CN/docs/Mobile/Viewport_meta_tag 
https://www.cnblogs.com/2050/p/3877280.html 
https://www.quirksmode.org/mobile/viewports2.html 
https://www.w3cplus.com/css/viewports.html  
手淘 https://main.m.taobao.com/?sprefer=sypc00