/*
 * @Author: MiKiMiKi
 * @Date: 2020-11-04 09:40:13
 * @LastEditTime: 2020-12-01 11:24:45
 * @LastEditors: Please set LastEditors
 * @Description: common functions used or asked frequently
 */

/**
 * @description: 弥补typeof的不足，判断数据类型
 * @param {*} x 任意需要判断类型的参数
 * @return {String} 数据类型
 */
function typeOf(x) {
  const toString = Object.prototype.toString
  const map = {
    '[object Number]': 'number',
    '[object Boolean]': 'boolean',
    '[object String]': 'string',
    '[object Object]': 'object',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Function]': 'function'
  }
  return map[toString.call(x)]
}

/**
 * @description: 判断是否是对象
 * @param {*} x 任意需要判断类型的参数
 * @return {Boolean} 是/否对象
 */
function isObject(x) {
  return Object.prototype.toString.call(x) === '[object Object]'
}

/**
 * @description: 深拷贝--平时简单的拷贝数组或对象（不完善版）
 * 完善版可使用lodash[_.cloneDeep](https://www.lodashjs.com/docs/latest#_clonedeepvalue)
 * 好文参考 [深拷贝的终极探索](https://segmentfault.com/a/1190000016672263)
 * @param {*} source 任意需要判断类型的参数
 * @return {Array/Object} 深拷贝结果
 */
function deepClone (source) {
  if (!source || typeof source !== 'object') {
    throw new Error('error arguments')
  }
  const target = source.constructor === 'Array' ? [] : {}
  Object.keys(source).forEach(key => {
    if (typeof source[key] === 'object') {
      target[key] = deepClone(source[key])
    } else {
      target[key] = source[key]
    }
  })
  return target
}

/**
 * @description: 防抖
 * @param {Function} handler 处理函数
 * @param {Number} delay 延迟时间
 * @return {Function} 防抖包装函数
 */
function debounce (handler, delay = 100) {
  let timer = null

  return function (...args) {
      timer & clearTimeout(timer)
      timer = setTimeout(() => {
          handler.apply(this, args)
      }, delay)
  }
}

/**
 * @description: 节流
 * @param {Function} handler 处理函数
 * @param {Number} delay 延迟时间
 * @return {Function} 节流包装函数
 */
function throttle (handler, delay = 100) {
  let timer = null

  return function (...args) {
      if (!timer) {
          timer = setTimeout(() => {
             handler.apply(this, args)
             timer = null
          }, delay)
      }
  }
}

/**
 * @description: 已知函数参数个数的柯里化
 * @param {Function} fn 执行函数
 * @return {Function} 柯里化函数
 */
function curry (fn) {
  let _args = [] // 参数合集
  
  let _curry = function (...args) { // args -> arguments
    // _args = _args.concat(args)
    _args = [..._args, ...args]
    if (_args.length >= fn.length) { // 参数个数已达fn需要的参数个数
      let result = fn.apply(this, _args)
      _args = []
      return result
    } else {
      return _curry
    }
  }
  return _curry
}
