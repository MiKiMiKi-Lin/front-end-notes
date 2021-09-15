// 时间复杂度O(n²)

function insertionSort(list) {
  const len = list.length
  for (let i = 1; i < len; i++) {
    const target = list[i]
    let j = i
    while (j > 0 && list[j - 1] > target) {
      list[j] = list[j - 1]
      j--
    }
    // 插入适合的位置
    list[j] = target
  }
  return list
}
