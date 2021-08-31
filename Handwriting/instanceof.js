function myInstanceof(left, right) {
  while (left !== null) {
    // 找打了则返回true
    if (left.__proto__ === right.prototype) {
      return true
    }
    // 沿原型链查找
    left = left.__proto__
  }
  return false
}
