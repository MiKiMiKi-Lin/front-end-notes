/**
 * 防抖
 * 触发高频事件后n秒内函数只会执行一次, 若n秒内调用了则重新计时
 *
 * 应用场景：
 * 1. 输入框联想词
 * 2. 输入格式入校验
 * 3. 多次点击按钮防止重复提交
 * ...
 */
// 1. 简化版(事件停止触发后才执行)
function debounce(func, wait) {
  let timer = null
  return (...args) => {
    timer && clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, wait)
  }
}

// 2. 完善版（immediate控制是否立即执行）
function debounce(func, wait, immediate = false) {
  let timer = null
  return (...args) => {
    timer && clearTimeout(timer)
    // 默认不立即执行
    if (!immediate) {
      timer = setTimeout(() => {
        func.apply(this, args)
      }, wait)
    } else {
      // 是否已经开启定时器
      let called = !!timer
      // 等待够时间后清除定时器
      timer = setTimeout(() => (timer = null), wait)
      // 定时器未开启则立即执行
      if (!called) func.apply(this, args)
    }
  }
}

// 3. 添加取消方法
function debounce(func, wait, immediate = false) {
  let timer = null

  const debounced = (...args) => {
    timer && clearTimeout(timer)
    // 默认不立即执行
    if (!immediate) {
      timer = setTimeout(() => {
        func.apply(this, args)
      }, wait)
    } else {
      // 是否已经开启定时器
      let called = !!timer
      // 等待够时间后清除定时器
      timer = setTimeout(() => (timer = null), wait)
      // 定时器未开启则立即执行
      if (!called) func.apply(this, args)
    }
  }
  // 添加取消方法
  debounced.cancel = () => {
    clearTimeout(timer)
    timer = null
  }

  return debounced
}
