// 是否对象
const isObject = val => typeof val === 'object' && val !== null

/**
 * 深拷贝实现
 * 深拷贝简单粗暴的方式：JSON.parse(JSON.stringify(obj))，但是会有问题，比如不能拷贝函数等
 */
const deepClone = obj => {
  // 只拷贝对象类型
  if (isObject(obj)) return
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
 * 深拷贝实现2, 用 Reflect.ownKeys
 */
const deepClone = obj => {
  // 只拷贝对象类型
  if (isObject(obj)) return
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
 * 拷贝数组：arr.concat()、arr.slice()，返回一个新数组。但是如果数组嵌套了对象或者数组就会影响原数组（浅拷贝）
 */
const shadowClone = obj => {
  // 只拷贝对象类型
  if (isObject(obj)) return
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
