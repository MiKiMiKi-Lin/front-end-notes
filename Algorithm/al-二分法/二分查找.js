/**
 * 二分查找
 * 方法一：递归
 * @param {Array} list 有序数组, 必须有序！
 * @param {Number} low 起始下标
 * @param {Number} high 结束下标的
 */
function binarySearch(target, list, low, high) {
  if (high <= low) {
    return -1
  }
  const mid = Math.floor((low + high) / 2)
  if (list[mid] === target) {
    return mid
  } else if (target > list[mid]) {
    return binarySearch(target, list, mid + 1, high)
  } else {
    return binarySearch(target, list, low, mid - 1)
  }
}

/**
 * 二分查找
 * 方法二：迭代
 * @param {Array} list 有序数组, 必须有序！
 * @param {Number} low 起始下标
 * @param {Number} high 结束下标的
 */
function binarySearch(target, list) {
  let low = 0
  let high = list.length - 1
  while (low <= high) {
    const mid = Math.floor((low + high) / 2)
    if (list[mid] === target) {
      return mid
    } else if (target > list[mid]) {
      low = mid + 1
    } else {
      high = mid - 1
    }
  }
  return -1
}
