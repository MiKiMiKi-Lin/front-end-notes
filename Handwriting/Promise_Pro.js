/**
 * 现代完整版的Promise实现
 * 在原来的基础上加入了catch、finally、all、race、allSettled的实现
 */

class MyPromise {
  constructor(executor) {
    this.status = 'pending' // Promise状态, 初始状态为 pending，成功为fulfilled，失败为rejected
    this.value = undefined // 成功的结果
    this.reason = undefined // 失败的原因

    this.onResolvedCallbacks = [] // 存放成功的回调
    this.onRejectedCallbacks = [] // 存放失败的回调

    // 定义resolve，接收fulfilled的值
    let resolve = data => {
      // 只能从pending变为fulfilled或者rejected状态
      if (this.status === 'pending') {
        this.status = 'fulfilled'
        this.value = data
        // 状态改变后取出回调队列的函数依次调用，同时传入成功的值 value
        this.onResolvedCallbacks.forEach(cb => cb(this.value))
      }
    }
    // 定义reject，接收rejected的值
    let reject = data => {
      // 只能从pending变为fulfilled或者rejected状态
      if (this.status === 'pending') {
        this.status = 'rejected'
        this.reason = data
        // 状态改变后取出回调队列的函数依次调用，同时传入失败的原因 reason
        this.onRejectedCallbacks.forEach(cb => cb(this.reason))
      }
    }
    // 传入的执行函数可能会抛出错误
    try {
      // 将resolve和reject给使用者
      executor(resolve, reject)
    } catch (e) {
      // error注入reject
      reject(e)
    }
  }

  // 定义then方法，将fulfilled或者rejected的结果传入onFulfilled或者onRejected中
  then(onFulfilled, onRejected) {
    // onFulfilled 和 onRejected 作为函数被调用
    // onFulfilled 不是函数时包装成函数，返回传入的值
    onFulfilled =
      typeof onFulfilled === 'function' ? onFulfilled : value => value
    // onRejected 不是函数时需要抛出错误，否则会在后面的链式调用被resolve捕获！！！
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : error => {
            throw error
          }

    // then 方法返回一个新的 Promise 对象
    let promise
    promise = new MyPromise((resolve, reject) => {
      if (this.status === 'fulfilled') {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value)
            resolvePromise(promise, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
      }
      if (this.status === 'rejected') {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason)
            resolvePromise(promise, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
      }
      // 当 Promise还是等待状态，存储回调函数
      if (this.status === 'pending') {
        this.onResolvedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value)
              resolvePromise(promise, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          }, 0)
        })
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason)
              resolvePromise(promise, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          }, 0)
        })
      }
    })
    return promise
  }

  // catch 方法, 其实就是调用 then 方法，传入onRejected
  catch(onRejected) {
    return this.then(null, onRejected)
  }

  // finally 方法，同样返回一个Promise
  // 无论成功失败都执行，且可以继续调用then, 并将前面的结果传递下去
  finally(cb) {
    const p = this.constructor
    // 无论成功失败都执行回调函数，由于cb可能是个异步操作，因此需要使用Promise.resolve，等结果返回再继续执行
    return this.then(
      value => p.resolve(cb()).then(() => value),
      reason =>
        p.resolve(cb()).then(() => {
          throw err
        })
    )
  }
}

// 暴露resolve方法，返回一个resolve的Promise对象
MyPromise.resolve = function (value) {
  return new MyPromise((resolve, reject) => {
    resolve(value)
  })
}

// 暴露reject方法，返回一个reject的Promise对象
MyPromise.reject = function (reason) {
  return new MyPromise((resolve, reject) => {
    reject(reason)
  })
}

// 暴露race方法
MyPromise.race = function (promiseList) {
  return new MyPromise((resolve, reject) => {
    // 只要有一个then接收到了状态改变即可
    for (let p of promiseList) {
      p.then(resolve, reject)
    }
  })
}

// 暴露all方法
// 所有的Promise都成功之后才会resolve，返回所有Promise的返回值组成的数组
MyPromise.all = function (promiseList) {
  let resultList = []
  let count = 0 // 计数，因为 promiseList 里面确定状态的时机可能不一样，不能与下标混用
  return new MyPromise((resolve, reject) => {
    promiseList.forEach((p, index) => {
      p.then(res => {
        resultList[index] = res // 状态先fullfilled的先放入结果集，与index对应
        // 当所有的Promise都执行完, 则直接resolve
        if (++count === promiseList.length) {
          resolve(resultList)
        }
      }, reject) // 一旦有失败的就直接reject
    })
  })
}

// ES2020 新增方法，allSettled不关心Promise数组的结果，只关心是否操作完成
MyPromise.allSettled = function (promiseList) {
  let resultList = []
  const len = promiseList.length
  let count = 0 // 计数， 已操作完成的promise数量

  return new MyPromise((resolve, reject) => {
    promiseList.forEach((p, index) => {
      p.then(
        res => {
          resultList[index] = { status: 'fulfilled', value: res }
          // 所有操作完成，返回结果
          if (++count === len) {
            resolve(resultList)
          }
        },
        err => {
          resultList[index] = { status: 'rejected', reason: err }
          // 所有操作完成，返回结果
          if (++count === len) {
            resolve(resultList)
          }
        }
      )
    })
  })
}

/**
 * 处理then里面onFulfilled或onRejected的返回值
 * @param {Object} promise then方法返回的Promise对象
 * @param {*} x onFulfilled或onRejected的返回值
 * @param {Function} resolve Promise构造函数的resolve方法
 * @param {Function} reject Promise构造函数的reject方法
 */
function resolvePromise(promise, x, resolve, reject) {
  // 避免循环引用, promise 和 x 指向同一引用时抛出TypeError错误（2.3.1）
  if (promise === x) {
    return reject(new TypeError('Promise循环引用啦'))
  }
  // 返回值x 为 Promise（2.3.2）
  // 这一节其实可以省略，因为在下面对then的处理中已经包含了
  // if (x instanceof Promise) {}

  let called = false // 是否 resolve 或者 reject了
  // 返回值x是对象或者函数（2.3.3）包含x为Promise的情况（2.3.2）
  if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
    // try...catch 防止then出现异常
    try {
      let then = x.then // （2.3.3.1）
      if (typeof then === 'function') {
        //  返回值x有then且then是一个函数，则调用它，并将this指向x（2.3.3.3）
        then.call(
          x,
          y => {
            if (called) return // 已经 resolve 或者 reject了， 则忽略(2.3.3.3.3)
            called = true
            // y有可能还是一个Promise，递归处理
            resolvePromise(promise, y, resolve, reject)
          },
          r => {
            if (called) return // 已经 resolve 或者 reject了， 则忽略(2.3.3.3.3)
            called = true
            reject(r)
          }
        )
      } else {
        // 只是一个普通对象或者普通函数，则直接resolve
        resolve(x)
      }
    } catch (e) {
      if (called) return // 已经 resolve 或者 reject了， 则忽略(2.3.3.3.4.1)
      called = true
      reject(e) // (2.3.3.2)(2.3.3.3.4.2)
    }
  } else {
    // 返回值x只是一个普通值（2.3.4）
    resolve(x)
  }
}

// yarn add promises-aplus-tests
// npx promises-aplus-tests Promise.js
// 用于promises-aplus-tests 测试
MyPromise.defer = MyPromise.deferred = function () {
  let defer = {}
  defer.promise = new MyPromise((resolve, reject) => {
    defer.resolve = resolve
    defer.reject = reject
  })
  return defer
}
try {
  module.exports = MyPromise
} catch (e) {}

// 测试一下
// let promise1 = MyPromise.resolve('success')
// let promise2 = new MyPromise((resolve, reject) =>
//   setTimeout(reject, 200, 'error ocurred')
// )
// let promises = [promise2, promise1]

// MyPromise.allSettled(promises)
//   .then(results => console.log('res', results))
//   .catch(err => console.log('err', err))
//   .finally(res => console.log('finally', res))
