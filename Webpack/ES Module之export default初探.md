---
# 主题列表：juejin, github, smartblue, cyanosis, channing-cyan, fancy, hydrogen, condensed-night-purple, greenwillow, v-green
# 贡献主题：https://github.com/xitu/juejin-markdown-themes
theme: juejin
highlight:
---

## 我的神机妙算
最近在我的vue-cli项目中使用export default时，遇到了一个小问题。大概是这么一个情况，正常情况下，我们是这么使用**export default**的：

```
// a.js
import person from './b'
const { name, age } = person
console.log(name, age)

// b.js
export default {
    name: 'MiKiMiKi',
    age: 18
}
```
此时，灵机一转，想到如下es6解构的用法：
```
// a.js
import { name, age } from './b'
console.log(name, age)
```

这么一看，是不是有点机智，还有点简洁，打包一下，无奈看到了这样的景象：

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8161e4ebe1624e82ba19f7584df2c0f3~tplv-k3u1fbpfcp-watermark.image)

有点慌，报错了，找不到相应的属性，这究竟是怎么回事呢？那就来探索一翻吧。

【说明】：上面的例子为模拟的demo，与实际“案例”相符。

## 探索过程
### webpack项目初始化
新建一个webpack项目，还原一下场景

流程如下：
```
mkdir demo
cd demo
cnpm init
```
此时生成 `package.json`, 接着安装依赖：

```
cnpm webpack webpack-cli -D
cnpm install babel-loader @babel/core @babel/preset-env -D
```
- webpack-cli 是为了使用 webpack 命令
- export default 属于es6的语法，因此需要babel进行编译，解决兼容性问题。
- 使用  babel-loader 还需安装其配套的核心库`@babel/core`与用于语法转换的`@babel/preset-env`

package.json :
```
"devDependencies": {
    "@babel/core": "^7.12.7",
    "@babel/preset-env": "^7.12.7",
    "babel-loader": "^8.2.1",
    "webpack": "^5.6.0",
    "webpack-cli": "^4.2.0"
}
```

新建 webpack.config.js :
```
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
}
```

新建 index.js、utils.js :
```
// index.js
import person from './utils'
const { name, age } = person

console.log(name, age)

// utils.js
export default {
    name: 'MiKiMiKi',
    age: 18
}
```

### none模式下打包
为了使打包后的文件看得更清晰点，打包时指定 mode 为 `none`，命令行执行
```
webpack --mode none
```

打包默认生成 `dist/main.js`，打开这个文件琢磨琢磨：

### 分析打文件main.js

1. 首先看一下该文件的头部：
![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0d9346b72fa84050a4c36be2c4163d99~tplv-k3u1fbpfcp-watermark.image)

这里定义了一个数组，数组里面包含了两个函数，可以清晰的看到这是打包后的两个模块，分别是入口index.js以及其引用的utils.js

2. 省略中间的系列定义，先来到文件的尾部
```
// startup
// Load entry module
__webpack_require__(0);
```
这里其实是加载了入口模块，0 对应的就是上方所定义数组的第一个元素，即 index.js 模块。

好了，我们知道这里是用`__webpack_require__`进行模块的加载的。看一下`__webpack_require__`的定义，它实际上就是一个函数，省略一些与本次分析无关的代码提取关键部分，大致就是这样的：
```
function __webpack_require__(moduleId) {
    // ...
    var module = {
        exports: {}
    };
    
    __webpack_modules__[moduleId](module, module.exports, __webpack_require__)

    return module.exports;
}
```
`__webpack_modules__`其实就是上方提到的定义的模块数组，moduleId是模块的id，这个函数最终返回的是`module.exports`对象，即该模块导出的对象。

3. utils模块

删除注释看一下：
```
((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

  __webpack_require__.r(__webpack_exports__);

  __webpack_require__.d(__webpack_exports__, {
    "default": () => __WEBPACK_DEFAULT_EXPORT__
  });
  const __WEBPACK_DEFAULT_EXPORT__ = ({
    name: 'MiKiMiKi',
    age: 18
  });
})
```
大概可以猜测这里其实就是导出了一个对象，该对象有个属性 `default`。结合下方函数的定义，结合中间 `__webpack_require__.d` 等方法的定义我们可以知道这相当于：
```
"use strict"
_default = {
    name: 'MiKiMiKi',
    age: 18
}
exports.default = _default
module.exports = exports.default
```
这一切似乎是符合预期的，其实我们也知道utils模块大致导出的是一个跟default有关的东西，只是一直不太清楚这里面到底是怎么样的一个东西。

4. index模块

这里`console.log(name, age)`时 name 和 age 被转化为了：
```
var name = _utils__WEBPACK_IMPORTED_MODULE_0__.default.name,
    age = _utils__WEBPACK_IMPORTED_MODULE_0__.default.age
```
它取的是`_utils__WEBPACK_IMPORTED_MODULE_0__.default`对象下面的属性，显然这个 _utils__WEBPACK_IMPORTED_MODULE_0__.default 是该模块用`import person from './utils'`引用的的utils模块所导出的对象。也就是说

`person => _utils__WEBPACK_IMPORTED_MODULE_0__.default`，因此我们可以使用es6语法对person进行解构，这个是没有问题的。


而这里_utils__WEBPACK_IMPORTED_MODULE_0__是什么，它的定义是这样的：
```
var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1)
```
由前面的分析已知`__webpack_require__`是一个用于模块加载的函数，这里的`1`就是utils.js模块的id，最终返回的是utils.js模块导出的对象。

简单总结下，`import person from './utils'`实际上做了两件事：

1).  `__webpack_require__`引入模块`_utils__WEBPACK_IMPORTED_MODULE_0__`     
2).  将`_utils__WEBPACK_IMPORTED_MODULE_0__.default`赋值给 person


此时，是否有些眉目了，回顾一下一开始的用法：
```
import { name, age } from './utils'
```

这不就相当于

1).  `__webpack_require__`引入模块`_utils__WEBPACK_IMPORTED_MODULE_0__`     
2).  直接对`_utils__WEBPACK_IMPORTED_MODULE_0__`进行解构，而我们需要的是`_utils__WEBPACK_IMPORTED_MODULE_0__.default`。

所以这种用法自然无法获取到我们需要的"name"和"age"属性，因为`_utils__WEBPACK_IMPORTED_MODULE_0__`本身就不包含这两个属性，它导出的只有`default`属性！

### 进一步探索`export default`

说到这里，可以猜测到另一种写法
```
import { default as person } from './utils'
```
打包一下，成功了，不报错了！这里的person也是可以直接进行解构从而获取到里面的属性的。

我们知道通过`export { ... }`导出时我们使用`import { ... } from './utils'`这样的方式引用某个模块，而这里可以使用`import { default as person } from './utils'`就说明了`export default`其实是一种语法糖，也就是说下面这两种用法是等效的
```
// 通常的写法
let obj = {}
export default obj

// 等同于
let obj = {}
export { obj as default }
```
事实也证明确实如此，因为用这种方式打包之后是类似的,之所以说是类似的，可以看下方的对比（左图使用**export default**）
![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6527154ae5894925864df72ca1b17041~tplv-k3u1fbpfcp-watermark.image)
唯一的差异就是使用`export default`的时候它又将 obj 赋值给了一个变量，仅此而已。

[注意] 不可以这样写：`import { default: person } from './utils'`， 它不等同于上面使用`default as person`的写法，虽然说 import {} from ''的写法跟es6解构语法很像，但是这不是一回事！！

而如果我们直接使用`export {}`
```
let obj = {}
export { obj }

// 等同于
export let obj = {}
```
打包之后：
![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6de25407d9c34c7cb7b7269fe9c0e3bd~tplv-k3u1fbpfcp-watermark.image)

此时我们理所应当的可以使用`import { obj } from './utils'`引用

使用CommonJS的语法导入也是可以的,`require`是module.exports的“传送门”，后面的内容是什么，require的结果就是什么

```
const person = require('./utils').default
// 或
const { default: person } = require('./utils')
```

## 总结：
1. export default是es6的用法。对`export default`**使用webpack+Babel打包**之后的结果简化一下如下：
```
"use strict"
_default = {
    name: 'MiKiMiKi',
    age: 18
}
exports.default = _default
module.exports = exports.default
```
对于使用export default导出的模块，在另一个文件引用它的时候有如下三种方式：
```
// 1
import person from './utils'
// 2
import { default as person } from './utils'
// 3
const person = require('./utils').default
```

2. `export default obj` 是 `export { obj as default }`的语法糖
3. `export default`用法简单方便，它就只导出一个“东西”，模块一般都相对简单，当我们不想或认为不值得为该模块命名时直接使用它导出我们想要导出的东西就可以了。但是很多时候，我们可能并不推荐使用`export default`，而`export {}`或许更符合预期。有兴趣的话可阅读下面系列文章：
[深入解析ES Module（一）：禁用export default object](https://zhuanlan.zhihu.com/p/40733281)、[深入解析ES Module（二）：禁用export default object](https://zhuanlan.zhihu.com/p/97335917)
简单总结和补充一下：
- 容易出错，esm存在多种导入导出方式，可能会使情况复杂化。
- esm和cjs交互时涉及到default时变得相对复杂。
- 由于不同打包方式的处理方式不一，代码迁移时将增加成本。
- 在动态的 import 中，默认导出会以 default 的名字暴露自己。
- ...

4. `es6 import` 不是我们平时对变量的解构赋值，而是**named imports**，虽然语法上极其相似，但切莫混为一谈。关于import的更多内容可直击[import --MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/import)
5. 说明一下：请注意上文的例子、分析以及结论都是基于 **webpack+Babel7**，当你使用 **rollup** 等其他打包工具得到的结果不一定适用。据相关文章了解babel 6之前对上方“神机妙算”的错误用法是支持的，但是babel 6之后就不能了。
6. 场景很多，复杂多变，无论遇到何种情况，动手实践，或许你会有意外的发现，good luck!

参考：
- [使用 babel-loader 編譯並轉換 ES6+ 代碼](https://awdr74100.github.io/2020-03-16-webpack-babelloader/)
- [babel issues#2047  --github](https://github.com/babel/babel/issues/2047)
- [export default 被认为是有害的](https://jkchao.github.io/typescript-book-chinese/tips/avoidExportDefault.html#%E5%8F%AF%E5%8F%91%E7%8E%B0%E6%80%A7%E5%B7%AE)
