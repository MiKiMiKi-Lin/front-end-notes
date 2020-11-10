/**
 * 弥补typeof的不足，判断数据类型
 * @param {*} x 任意需要判断类型的参数
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
 * 判断是否是对象
 * @param {*} x 任意需要判断类型的参数
 */
function isObject(x) {
  return Object.prototype.toString.call(x) === '[object Object]'
}
/**
 * 深拷贝--平时简单的拷贝数组或对象（不完善版）
 * 完善版可使用lodash[_.cloneDeep](https://www.lodashjs.com/docs/latest#_clonedeepvalue)
 * 好文参考 [深拷贝的终极碳素](https://segmentfault.com/a/1190000016672263)
 * @param {*} source 任意需要判断类型的参数
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
