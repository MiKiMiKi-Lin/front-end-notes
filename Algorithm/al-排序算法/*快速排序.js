import { swap } from '../utils/index'
/**
 * 快速排序 —— 分而治之的思想
 * 时间复杂度 O(nlogn)
 */

// 子序列划分
function partition(list, start, end) {
  const pivot = list[end] // 以最后一个数为枢纽

  let j = start // 从start开始

  for (let i = start; i <= end; i++) {
    // 寻找小于枢纽的数往前换
    if (list[i] <= pivot) {
      swap(list, i, j++)
    }
  }
  return j - 1
}

/**
 *
 * 快排递归函数 —— 常规版
 */
function quickSort(list, start = 0, end = list.length - 1) {
  if (end - start <= 0) return list

  // 1. 寻找枢纽下标
  let pivotIndex = partition(list, start, end)
  // 递归
  quickSort(list, start, pivotIndex - 1) // 2. 对枢纽左边递归排序
  quickSort(list, pivotIndex + 1, end) // 3. 对枢纽右边递归排序

  return list
}

/**
 * 简易版，利用es6
 */
function quickSort(list) {
  const len = list.length
  if (len < 2) return list
  const pivot = list[len - 1]
  // 注意这里也要过滤到pivot
  const leftList = list.filter(
    (item, index) => item <= pivot && index < len - 1
  )
  const rightList = list.filter(item => item > pivot)
  console.log(leftList, rightList)

  return [...quickSort(leftList), pivot, ...quickSort(rightList)]
}
