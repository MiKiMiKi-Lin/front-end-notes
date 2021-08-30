/**
 *
 * 柯里化：把接收多个参数的函数转化为接收一个单一参数的函数，并且返回接收余下参数且返回结果的新函数的技术
 */

/**
 * 第一种情况：参数定长
 */
const curry = (fn) => {
  const generator = (...args) =>
    // 判断当前累积的参数是否跟fn的参数个数一样
    fn.length === args.length
      ? // 参数个数满足则直接调用
        fn(...args)
      : // 參數个数不满足则继续搜集参数
        (...arg) => generator(...args, ...arg)

  return generator
}

const add = (a, b, c) => a + b + c

const curryAdd = curry(add)
console.log(curryAdd(1)(2)(3)) // 6
console.log(curryAdd(1, 2)(3)) // 6
console.log(curryAdd(1)(2, 3)) // 6

/**
 * 第二种情况：参数不不定长
 */
const curry2 = (fn) => {
  let argsArr = [] // 存放参数
  const generator = (...args) => {
    // 是否还有参数，若有则继续柯里化接收参数，否则执行fn
    if (args.length) {
      argsArr = [...argsArr, ...args]
      return generator
    } else {
      const result = fn(...argsArr)
      argsArr = []
      return result
    }
  }

  return generator
}

const add2 = (...args) => args.reduce((pre, cur) => pre + cur, 0)

const curryAdd2 = curry2(add2)
console.log(curryAdd2(1)(2)(3)()) // 6
console.log(curryAdd2(1, 2)()) // 3
console.log(curryAdd2(1)(2, 3)(4, 5)()) // 15
