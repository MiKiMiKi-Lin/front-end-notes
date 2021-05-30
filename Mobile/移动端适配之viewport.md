近日重新思考了移动端适配的问题，想起了之前用过的阿里高清方案[lib-flexible](https://github.com/amfe/lib-flexible)，不料发现官方说“这个过渡方案已经可以放弃使用”。现在用的是[amefe-flexible](https://github.com/amfe/lib-flexible)，关于这套方案的一些想法和介绍可看[使用Flexible实现手淘H5页面的终端适配](https://github.com/amfe/article/issues/17)。

  好吧，毕竟了做了有段时间的移动端开发了，关于移动端的适配问题，关于viewport的理解，一直也是懵懵懂懂。勤勤恳恳的google之后， 那就认认真真的记录和总结一下吧。

## viewport
viewport，顾名思义，视窗、视口，即浏览器【用于显示网页的区域】。PC上，视口的宽度与浏览器宽度一致；而在移动端可没那么简单，移动端的viewport有layout viewport、visual viewport和ideal viewport。

移动端屏幕小，肉眼能看到的内容极其有限。一般在移动设备上浏览器**默认**将viewport设为980px/1024px, 当然也可为其它值，根据厂商而定的。这个**默认的viewport**（layout viewport，下方介绍）远大于屏幕，以便移动设备显示传统专为PC设计的网站，显而易见，由此会不可避免地引发**横向滚动条**的问题。若要一次性看全，只能通过缩小页面，这极可能使得我们更看不清内容了。


### layout viewport（布局视口）
- 一个固定的存放网页的区域    
- iphone **980px/1024px**，安卓厂商不一致
- 度量方式: `document.documentElement.clientWidth/Height`(不包含滚动条)
- `<html>`元素的宽度继承于layout viewport
### visual viewport（可视视口）
- 当前窗口的可视区域
- 默认是屏幕的宽度，用户可通过滑动缩放等操作改变这个可视视口。**用户一旦缩小，屏幕中显示了更多的css像素，可视视口变大，反之，放大时可视视口变小。** （注意此时的布局视口并没有发生变化）
- 度量方式: `window.innerWidth/Height`(包含滚动条)

[这里](https://www.yuque.com/yunplane/axviq0/bm6xt8)有个比喻讲得比较形象，引用一下：
> 打个比方：用放大镜看一张图片，图片的宽度是布局视口，不可变的。放大镜相当于可视视口。我们移动放大镜或者调解远近距离可以改变可视视口，从而查看布局视口的不同内容



### ideal viewport（理想视口）
- 移动设备的理想viewport，一个不需要用户缩放和横向滚动条可以正常查看网站所有内容的viewport。
- 宽度等于移动设备的屏幕宽度
- 度量方式：`screen.width/height`（meta标签的device-width/height就是使用screen.width/height来做为的判定值的）



## meta标签
通过`mata`标签可以定义视窗的宽度，一个典型的用法：
```
<meta name="viewport" content="width=device-width,initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
```
- `width=device-width`使得视窗宽度（**layout viewport**）等于设备的屏幕宽度，即**ideal viewport**（由此也可看出, **device-width/height**是使用**screen.width/height**来做为判定值的）
- `initial-scale=1.0`设置页面的初始缩放值，效果跟`width=device-width`的设置是一样的。**visual viewport的宽度 = ideal viewport的宽度 / 缩放值**
- `maximum-scale=1.0`用户最大缩放值   
- `user-scalable=0` 不允许用户缩放（设置为no之后有可能会导致有视觉障碍的用户无法通过缩放看清内容）

补充一下，有时候我们可能会设置`viewport-fit`，它是为iphoneX诞生的一个属性，用于限制网页如何在安全区域内展示，关于安全区域的适配可参考[网页适配 iPhoneX，就是这么简单](https://aotu.io/notes/2017/11/27/iphonex/index.html)

--- Q & A ---

Q: 一个小思考: `initial-scale=1.0` 不就是不进行缩放吗，怎么就跟`width=device-width`一样的效果了？

A: 缩放是相对的，即考虑**相对什么缩放**才有意义。从后往前推导，既然两者效果一样，那么它其实是**相对deal viewport**缩放的。 

Q: 此外，如果同时设置了width和initial-scale，那么取值哪个？

A: 浏览器会取两个中较大的那个值

> 通常，两个是一起写的，这是因为iPhone、iPad、IE会横竖屏不分。说白了就是解决兼容性问题


### 设置meta viewport与不设置的对比
宽高均是200的盒子在不设置meta（左图）和设置meta width=device-width（右图）的对比图：
  
 <img width="300" src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/147ae3c46f2d46a4b121ba5104f4fc43~tplv-k3u1fbpfcp-watermark.image" />		
<img width="300" src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/aaf83bf1f56d4ef49fe5164a7a07554d~tplv-k3u1fbpfcp-watermark.image" />

- 左图看起来更小，在不设置meta时，屏幕默认被分成了980份，盒子在视觉上看到的比例是 **200px/980px**（事实上我通过window.innerWidth打印出来的是981，原因未知), 可见此时页面是有被缩放的;　
- 右图将屏幕分成了375份，那么盒子占比 **200px/375px**（通过window.innerWidth打印出来的是375）

将上面右图的 initial-scale 设置为 2 之后：	
<div  align="center"> 
	<img width="500" src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0ff047a957fc4ec8a5caba95e26306ad~tplv-k3u1fbpfcp-watermark.image" />
</div>


### 关于initial-scale的默认缩放值
看一个例子，打开[淘宝官网](https://www.taobao.com/)，F12一下在iPhone的显示效果，可以看到一个缩小版的官网，此时并没有出现横向滚动条, 整个页面被缩放了：

<div  align="center"> 
	<img width="500" src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/39b1c4ff492541dfa8eaa59056341a7b~tplv-k3u1fbpfcp-watermark.image" />
</div>

此时 **initial-scale = ideal viewport / visual viewport = 375px / 980px**

> 在iphone和ipad上，无论你给viewport设的宽的是多少，如果没有指定默认的缩放值，则iphone和ipad会自动计算这个缩放值，以达到当前页面不会出现横向滚动条(或者说viewport的宽度就是屏幕的宽度)的目的。


## 三个像素
对移动端有所了解的都知道，**css的1px !== 设备的1px**，why?  

### 1. 物理像素(physical pixel)
- 又称设备像素，单位pt
- **分辨率**即设备屏幕在水平和垂直方向上的物理像素个数
- **像素密度PPI**（pixel per inch），每英寸有多少个物理像素。PPI越高，画质越好。

在视网膜屏幕的概念出现前，并没有设备像素和设备独立像素的区别，两者是一样的，出现了视网膜和更高PPI的屏幕后，屏幕上的像素点多了，1px的css像素不再简单的等同于1个物理像素，因此要区分好两者。

### 2. 设备独立像素 (dip, density-independent pixel, device-independent pixel)
又称密度无关像素、逻辑像素，是由程序使用的虚拟像素（如css像素），然后再由相关系统转化为物理像素。

### 3. CSS像素(css pixel)
又称虚拟像素，是一个抽象单位，用于浏览器，度量web页面的内容，是css样式使用的逻辑像素。1px怎么显示是取决于设备的，它是一个相对单位！

CSS像素 = 设备独立像素 = 虚拟/逻辑像素

那设备像素和设备独立像素之间的关系是什么？

## 设备像素比 (dpr, device pixel ratio)
`window.devicePixelRatio`, 物理像素和设备独立像素的比例    
`window.devicePixelRatio = 物理像素 / dip`

非视网膜屏幕, iphone3上，dpr = 320 / 320 = 1   
视网膜屏幕，如iPhone 4s, dpr = 640 / 320 = 2

举个例子，在dpr为2的设备上，1px的css像素对应4个物理像素（2 x 2）

### 相关概念
#### 像素密度 (PPI)
每英寸长度上有多少个像素, ，又叫像素数目

#### DPI (dots per inch)
指每英寸的点数



## 相关属性
`screen.width`  
对于该属性的取值，不同设备的取值存在差异
- IOS视网膜屏幕：返回设备独立像素的宽
- 部分安卓，返回物理像素的宽度
`pageX/Y`、`clientX/Y` 、`screenX/Y` （event）
- pageX/Y：**html**原点到事件触发点的css pixels
- clientX/Y: **浏览器窗口**原点到事件出发点的css pixels
- screenX/pageY: **用户显示器窗口**原点到事件出发点的css pixels



---
上面的介绍都是一些基础的理论知识，在此做个整理和记录，后续会继续补充和完善。深入理解和挖掘还有很多知识点和很多细节，包括不同设备、横屏竖屏的表现等等。一切为了移动端页面的自适应方案，让页面舒服的还原出设计稿的样子，并在不同设备有相同或相近的显示。

----
***参考链接***
- [使用Flexible实现手淘H5页面的终端适配](https://github.com/amfe/article/issues/17)
- 来自ppk（一个对移动设备viewport有着诸多研究的大神）的好文：[A tale of two viewports — part two](https://www.quirksmode.org/mobile/viewports2.html)，也可看其译文[viewports剖析](https://www.w3cplus.com/css/viewports.html)
- [移动前端开发之viewport的深入理解](https://www.cnblogs.com/2050/p/3877280.html)
- [Web viewport](https://www.yuque.com/yunplane/axviq0/bm6xt8)  
- [移动web开发之视口viewport](https://www.cnblogs.com/xiaohuochai/p/5496995.html)
