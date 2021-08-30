// 方法一：Set
const uniq = arr => [...new Set(arr)]

// 方法二：reduce
const uniq = arr =>
  arr.reduce((prev, cur) => (!prev.includes(cur) ? [...prev, cur] : prev), [])

// 方法三：for 循环
const uniq = arr => {
  let result = []
  for (let item of arr) {
    if (!result.includes(item)) {
      result.push(item)
    }
  }
  return result
}

// 方法四：Map
const uniq = arr => {
  let resultMap = new Map()
  for (let item of arr) {
    if (!resultMap.has(item)) {
      resultMap.set(item, true)
    }
  }
  // Array.from执行Map对象后返回一个二维数组，数组元素是map的键值数组，长度为2
  // return Array.from(resultMap).map(item => item[0])
  return Array.from(resultMap.keys())
}
