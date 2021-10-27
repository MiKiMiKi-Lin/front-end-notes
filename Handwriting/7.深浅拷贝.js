// 是否对象
const isObject = val => typeof val === 'object' && val !== null

/**
 * 深拷贝进阶版（考虑循环引用）—— 面试nice版
 * 思路：另外开辟空间存储当前对象和拷贝对象的对应关系
 * 另外，WeakMap 提代 Map 可进一步优化性能，使用Map需要手动清除内存而WeakMap可自动回收，当Map数据量庞大时，会造成额外的消耗
 */
const deepClone = (obj, map = new Map()) => {
  if (!isObject(obj)) return obj
  // 如果Map中已经存在该对象的引用则直接返回
  if (map.get(obj)) return map.get(obj)

  let target = obj instanceof Array ? [] : {}
  // 每次将当前对象放入Map中
  map.set(obj, target) // 存储映射关系

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      const item = obj[key]
      target[key] = isObject(item) ? deepClone(item, map) : item
    }
  }
  return target
}


/**
 * 深拷贝实现（支持拷贝普通对象、数组、日期、正则表达式、DOM节点）
 * 深拷贝简单粗暴的方式：JSON.parse(JSON.stringify(obj))，但是会有问题，比如不能拷贝函数等
 */
const deepClone = obj => {
  // 只拷贝对象类型
  if (!isObject(obj)) return
  // 根据obj类型判断初始化数组or对象
  let target = obj instanceof Array ? [] : {}
  // 拷贝自身属性
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      const item = obj[key]

      if (item instanceof Date) {
        // 日期
        target[key] = new Date(item.getTime())
      } else if (item instanceof RegExp) {
        // 正则
        target[key] = new RegExp(item)
      } else if (isObject(item) && item.nodeType === 1) {
        // DOM 节点
        const ele = document.getElementsByTagName(item.nodeName)[0]
        target[key] = ele.cloneNode(true)
      } else {
        // 如果是对象或数组需要递归处理
        target[key] = isObject(item) ? deepClone(item) : item
      }
    }
  }
  return target
}

// a test
const objA = {
  name: 'miki',
  birthday: new Date(),
  pattern: /miki/g,
  body: document.body,
  others: [666, 'jacky', new Date(), /miki/g],
}

const objB = deepClone(objA)
console.log(objB, objA === objB) // false

/**
 * 深拷贝实现（拷贝普通对象or数组）
 * 深拷贝简单粗暴的方式：JSON.parse(JSON.stringify(obj))，但是会有问题，比如不能拷贝函数等
 */
const deepClone = obj => {
  // 只拷贝对象类型
  if (!isObject(obj)) return
  // 根据obj类型判断初始化数组or对象
  let target = obj instanceof Array ? [] : {}
  // 拷贝自身属性
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      const item = obj[key]
      // 如果是对象或数组需要递归处理
      target[key] = isObject(item) ? deepClone(item) : item
    }
  }
  return target
}

/**
 * 深拷贝实现, 用 Reflect.ownKeys
 */
const deepClone = obj => {
  // 只拷贝对象类型
  if (!isObject(obj)) return
  // 根据obj类型判断初始化数组or对象
  let target = obj instanceof Array ? [] : {}
  // 拷贝自身属性
  Reflect.ownKeys.forEach(key => {
    const item = obj[key]
    // 如果是对象或数组需要递归处理
    target[key] = isObject(item) ? deepClone(item) : item
  })

  return target
}

/**
 * 浅拷贝
 * 拷贝数组：arr.concat()、arr.slice()，返回一个新数组，也可用扩展运算符。但是如果数组嵌套了对象或者数组就会影响原数组（浅拷贝）
 */
const shadowClone = obj => {
  // 只拷贝对象类型
  if (!isObject(obj)) return
  // 根据obj类型判断初始化数组or对象
  let target = obj instanceof Array ? [] : {}
  // 拷贝自身属性
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      target[key] = obj[key]
    }
  }
  return target
}
