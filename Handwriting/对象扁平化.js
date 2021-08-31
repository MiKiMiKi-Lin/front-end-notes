// 是否对象
const isObject = val => typeof val === 'object' && val !== null

// 对象扁平化
const flatten = obj => {
  if (!isObject(obj)) return

  const result = {}
  const handler = (target, prefix) => {
    // 是对象则需要递归处理
    if (isObject(target)) {
      // 处理数组
      if (Array.isArray(target)) {
        target.forEach((item, index) => {
          handler(
            item,
            `${prefix}${prefix ? '[' : ''}${index}${prefix ? ']' : ''}`
          )
        })
      } else {
        // 处理对象
        Object.keys(target).forEach((key, index) => {
          handler(target[key], `${prefix}${prefix ? '.' : ''}${key}`)
        })
      }
    } else {
      result[prefix] = target
    }
  }

  handler(obj, '')
  return result
}

// test
const obj = {
  a: {
    b: 1,
    c: 2,
    d: { e: 5 },
  },
  b: [1, 3, { a: 2, b: 3 }],
  c: 3,
}

let newObj = flatten(obj)
console.log(newObj)
// {
//     'a.b': 1,
//     'a.c': 2,
//     'a.d.e': 5,
//     'b[0]': 1,
//     'b[1]': 3,
//     'b[2].a': 2,
//     'b[2].b': 3,
//     c: 3
//   }
newObj = flatten([1, 2, 3])
console.log(newObj) // { '0': 1, '1': 2, '2': 3 }
