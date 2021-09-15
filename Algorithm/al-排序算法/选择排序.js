import { swap } from '../utils/index'

// 每次选择子序列最小的数放前面
// 时间复杂度 O(n²)

function selectionSort(list) {
  const len = list.length
  // 下标 0 ~ len -1
  for (let i = 0; i < len - 1; i++) {
    // 记子序列第一个数的下标为最小数的下标
    let min = i
    for (let j = i; j < len; j++) {
      // 寻找子序列最小的数
      if (list[j] < list[min]) {
        min = j
      }
    }
    if (min !== i) {
      swap(list, i, min)
    }
  }

  return list
}
