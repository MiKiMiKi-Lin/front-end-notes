/**
 * 递归 + 合并 —— 分而治之
 * 数组一分为二，然后递归地排序好每部分，最后合并
 */

function merge(left = [], right = []) {
  const arr = []

  while (left.length && right.length) {
    const p = left[0]
    const q = right[0]
    if (p <= q) {
      arr.push(p)
      left.shift()
    } else {
      arr.push(q)
      right.shift()
    }
  }
  if (left.length) return [...arr, ...left]
  if (right.length) return [...arr, ...right]

  return arr
}

function mergeSort(list) {
  if (list.length < 2) return list
  const mid = Math.floor(list.length / 2)
  const left = mergeSort(list.slice(0, mid))
  const right = mergeSort(list.slice(mid))
  return merge(left, right)
}
