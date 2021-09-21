/**
 * 基于Proxy的高性能深拷贝版本（TODO）
 *
 * 传统方式的问题
 * - JSON.parse(JSON.stringify(a)) ： 局限性
 * - 递归实现：性能不好
 *
 * 优化点：只有当属性修改以后才对这部分数据做深拷贝 —— Proxy 实现（参考 Immer.js）
 *
 * 参考：https://juejin.cn/post/6844904021627502599
 */

// proxy 对象的标识属性
const PROXY_FLAG = Symbol('proxy-flag')

// 检查value是否为普通对象
const isPlainObject = value => {
  if (
    !value ||
    typeof value !== 'object' ||
    {}.toString.call(value) != '[object Object]'
  ) {
    return false
  }
  var proto = Object.getPrototypeOf(value)
  if (proto === null) {
    return true
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor
  return (
    typeof Ctor == 'function' &&
    Ctor instanceof Ctor &&
    Function.prototype.toString.call(Ctor) ===
      Function.prototype.toString.call(Object)
  )
}

// 检查是否Proxy对象
const isProxy = value => !!value && !!value[PROXY_FLAG]

/**
 * 高性能深拷贝函数
 * @param {*} obj 源对象
 * @param {*} handler 对对象的处理和修改函数
 */
function produce(obj, handler) {
  const proxies = new Map() // 存放Proxy对象
  const copies = new Map() // 存放浅拷贝对象

  // proxy对象的属性
  const traps = {
    get(target, key) {
      if (key === PROXY_FLAG) return target
      const data = copies.get(target) || target
      return getProxy(data[key])
    },
    set(target, key, value) {
      const copy = getCopy(target)
      const newValue = getProxy(value)
      copy[key] = isProxy(newValue) ? newValue[PROXY_FLAG] : newValue
    },
  }

  // 生成 Proxy 对象
  const getProxy = data => {
    if (isProxy(data)) return data

    if (isPlainObject(data) || Array.isArray(data)) {
      if (proxies.has(data)) return proxies.get(data)

      const proxy = new Proxy(data, traps)
      proxies.set(data, proxy)
      return proxy
    }

    return data
  }

  // 获取浅拷贝对象
  const getCopy = data => {
    if (copies.has(data)) return copies.get(data)

    const copy = Array.isArray(data) ? [...data] : { ...data }
    copies.set(data, copy)
    return copy
  }

  // 判断传入的参数是否被修改过
  const hasChange = data => proxies.has(data) || copies.has(data)

  // 获取最终结果
  const finalize = data => {
    if (isPlainObject(data) || Array.isArray(data)) {
      // 1. 没有被修改过直接返回
      if (!hasChange(data)) return data

      // 2. 修改了则从copy取值并递归
      const copy = getCopy(data)
      Object.keys(copy).forEach(key => {
        copy[key] = finalize(copy[key])
      })
      return copy
    }

    return data
  }

  const proxy = getProxy(obj)
  handler(proxy) // 修改源对象(修改了后会触发set)
  return finalize(obj)
}

// a test
const objA = {
  name: 'miki',
  birthday: new Date(),
  pattern: /miki/g,
  body: document.body,
  others: [666, 'jacky', new Date(), /miki/g],
}

const objB = produce(objA, draft => {
  draft.birthday = '1996-10-1'
  draft.job = 'developer'
  draft.others[0] = 999
})

console.log(objB, objA)
console.log(objB === objA)
