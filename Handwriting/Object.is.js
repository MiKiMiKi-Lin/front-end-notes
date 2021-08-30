/**
 * Object.is 与 === 类似，其区别是：
 * 1. NaN在 === 中是不相等的，而在 Object.is 中是相等的
 * 2. +0和-0在 === 中是相等的，而在 Object.is 中是不相等的
 */
Object.is = function (x, y) {
  if (x === y) {
    // 考虑特殊情况+0和-0，应该返回false
    // x不为0时直接返回true，x为0时需要判断 (1/+0 === Infinity 和 1/-0 === -Infinity)
    return x !== 0 || 1 / x === 1 / y
  }
  // x !== y，这里NaN的情况应该返回true
  // x和y同时为NaN，返回true
  return x !== x && y !== y
}
