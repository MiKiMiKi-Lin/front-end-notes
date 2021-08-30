/**
 * 实现 call
 */
Function.prototype.myCall = function (context, ...args) {
  // 1. context规范化
  // null 和 undefined 时，上下文为window
  if (context === null || context === undefined) {
    context = window
  } else {
    context = Object(context) // 原始类型的this为其包装对象对应的构造函数，如String、Boolean、Number
  }
  // 2. 为context扩展一个属性，将原函数指向该属性（“借用他人方法”的核心理念）
  // 之所以使用Symbol是为了避免与context的自身属性发生冲突
  const symbol = Symbol('存储 this 的临时属性')
  // 函数的this隐式绑定到 context 上, 存储在 symbol 属性上
  context[symbol] = this
  const result = context[symbol](...args)
  // 拿到结果后删除该临时属性
  delete context[symbol]
  return result
}

// ***** myCall的一些实现细节 *******
// rest参数（...args）存储多余的参数
// 扩展属性使用Symbol避免与context的自身属性发生冲突
// 扩展运算符（...）将数组args转化为逗号隔开的参数传入

/**
 * 实现 Apply
 */
Function.prototype.myApply = function (context) {
  // 1. context规范化
  // null 和 undefined 时，上下文为window
  if (context === null || context === undefined) {
    context = window
  } else {
    context = Object(context) // 原始类型的this为其包装对象对应的构造函数，如String、Boolean、Number
  }

  // 2. 为context扩展一个属性，将原函数指向该属性（“借用他人方法”的核心理念）
  // 之所以使用Symbol是为了避免与context的自身属性发生冲突
  const symbol = Symbol('存储 this 的临时属性')
  // 函数的this隐式绑定到 context 上, 存储在 symbol 属性上
  context[symbol] = this

  const isArrayLike = o =>
    o &&
    typeof o === 'object' && // 是对象
    isFinite(o.length) && // 有限数值
    o.length >= 0 && // 长度
    o.length === Math.floor(o.length) && // 长度非负数
    o.length <= Math.pow(2, 32)

  const args = arguments[1]
  let result = null
  // 与myCall不同的是：需要校验传入是参数是否为数组/类数组，若不是则抛出错误
  if (args) {
    if (!Array.isArray(args) && !isArrayLike(args)) {
      throw new Error('require Array/liked-Array as the 2nd param')
    } else {
      let arg = Array.from(args) // 转为数组
      result = context[symbol](...arg)
    }
  } else {
    result = context[symbol]()
  }

  // 拿到结果后删除该临时属性
  delete context[symbol]
  return result
}

/**
 * 实现 bind
 */
Function.prototype.myBind = function (context, ...args) {
  const _this = this

  let funcToBind = function (...arg) {
    // 判断this是否是funcToBind的实例（是否通过new调用）
    const isCallByNew = this instanceof funcToBind
    // 若通过new调用则直接绑定到this上，否则绑定到传入的context对象上
    const curContext = isCallByNew ? this : Object(context)
    // 通过call/apply调用
    return _this.call(curContext, ...args, ...arg)
  }
  // 使用Object.create复制源函数的prototype
  // 条件判断是考虑没有prototype的情况，如箭头函数
  if (_this.prototype) {
    funcToBind.prototype = Object.create(_this.prototype)
  }
  return funcToBind // 返回拷贝的函数
}

// an example
let person = {
  name: 'MiKi',
  sayHi: function (message) {
    console.log(`${this.name} say ${message}`)
  },
}
person.sayHi('Hi~')

let person2 = {
  name: 'Jacky',
}
// test myCall
person.sayHi.myCall(person2, 'Hello Call')
// test myApply
person.sayHi.myApply(person2, 'Hello Apply')
person.sayHi.myApply(person2, ['Hello Apply'])

// test myBind
let copyFn = person.sayHi.myBind(person2)
copyFn('Hello Bind')

// 参考：https://juejin.cn/post/6844903906279964686#heading-18
