import { swap } from '../utils/index'

// 每次将最大的数往后冒泡
// 时间复杂度 O(n²)

function bubbleSort(list) {
  const len = list.length
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      if (list[j] > list[j + 1]) {
        swap(list, j, j + 1)
      }
    }
  }
  return list
}
