// 方法一： 递归 + reduce
const flatten = arr =>
  arr.reduce(
    (prev, cur) => prev.concat(Array.isArray(cur) ? flatten(cur) : cur),
    []
  )

// 方法二： 递归 + 循环
const flatten2 = arr => {
  let result = []
  arr.forEach(item => {
    if (Array.isArray(item)) {
      result = [...result, ...flatten(item)]
    } else {
      result.push(item)
    }
  })
  return result
}

// 方法三： 扩展运算符 + while循环
// let arr = [1, [2, [3, 4]]]
// console.log([].concat(...arr)); // [1, 2, [3, 4]]
const flatten3 = arr => {
  let result = arr
  while (result.some(item => Array.isArray(item))) {
    result = [].concat(...result)
  }
  return result
}

// 方法四： 都是数字时可以直接用toString
const flatten4 = arr =>
  arr
    .toString()
    .split(',')
    .map(item => +item)

// an example
let arr = [1, [2, [3, 4]]]
console.log(flatten4(arr))
console.log(flatten2(arr))
console.log(flatten3(arr))
console.log(flatten4(arr))
