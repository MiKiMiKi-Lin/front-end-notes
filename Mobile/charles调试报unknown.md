### charles
macOS抓包的工具，类似Windows的**Fiddler**，关于Chales或Fiddler的用途用法等在此不再赘述，网上教程很多。在此记录一下某次抓包公司正式环境的请求时出现乱码的解决方案，仅供参考。

### 报`<unknown>`且都是乱码
抓包时遇到了https的链接时就出现了如下场景：

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fb1bce76b9e645b3a2947637a71784d1~tplv-k3u1fbpfcp-watermark.image)

https是加密的，因此需要配置证书

### 解决方案
#### 1. 电脑端安装证书

如图进行设置：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a213e0b496ec427ca87ec0069aa967ee~tplv-k3u1fbpfcp-watermark.image)

安装完该证书是不被信任的，需要双击设置，选择“始终信任”即可。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2a322995a83d40f6bf491e3c3a7abc72~tplv-k3u1fbpfcp-watermark.image)

#### 2. 手机端安装证书

如图：

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9b3454cfa5d241539a0e4367cc7436f2~tplv-k3u1fbpfcp-watermark.image)

手机wifi配置代理之后就可以手机浏览器输入 `chls.pro/ssl`下载证书，下载完需要对证书进行安装。

我用的iPhone，下载之后直接在设置里面选择刚下载的证书进行安装即可。安卓的可能有些差异，可参考[这篇文章](https://www.jianshu.com/p/4635aa405568)

#### 3. 设置Charles

完成了上述两个步骤但是还是只能看到乱码，此时可以看到下述提示：

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/341047a9ac23421295cf0216ec16b740~tplv-k3u1fbpfcp-watermark.image)

之后进行如下的设置：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dfc6ee381fc94fe6b127091e77dcf39e~tplv-k3u1fbpfcp-watermark.image)

tips：需要在下方设置允许访问的https链接白名单，如`juejin.cn`

参考：
https://www.jianshu.com/p/4635aa405568