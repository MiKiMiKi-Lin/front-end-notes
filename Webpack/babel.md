### 为什么引入了babel还需要使用polyfill？

babel 默认只转换 js 语法，如箭头函数、class语法糖等；而不转换新的 API，比如 Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise 等全局对象，以及一些定义在全局对象上的方法(比如 Object.assign)都不会转码。因此必须使用 `babel-polyfill`

babel-polyfill 有缺点：
- 打包出来的体积比较大（这个问题可以通过单独使用 `core-js` 的某个类库来解决，core-js 都是分开的）
- 给很多类的原型链做了修改，污染全局变量（如果我们开发的也是一个类库供其他开发者使用，这种情况就会变得非常不可控）

有时候会倾向于使用`babel-plugin-transform-runtime`

但是当代码中包含高版本 js 中类型的实例方法 ，这还是要使用 polyfill。

!! Babel 版本 >= v7.4.0开始 @babel/polyfill 组件库已被弃用，不推荐使用（并不是不能用）
Babel 版本 >= v7.4.0 的用法
```
npm install core-js regenerator-runtime/runtime
```

（关于上面的观点还需验证）
参考：
- https://zhuanlan.zhihu.com/p/43249121
- https://awdr74100.github.io/2020-03-16-webpack-babelloader/