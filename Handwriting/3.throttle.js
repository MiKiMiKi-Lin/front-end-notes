/**
 * 节流（多种实现方式）
 * 一定的时间内，只执行一次
 *
 * 应用场景
 * 1. 自动保存草稿，用户一直输入，单位时间内保存一次
 * 2. 监听 resize 或 scroll 事件
 * ...
 */

// 1. 定时器版
function throttle(func, wait) {
  let timer = null

  return (...args) => {
    if (!timer) {
      timer = setTimeout(() => {
        func.apply(this, args)
        timer = null
      }, wait)
    }
  }
}
// 2. 时间戳版
function throttle(func, wait) {
  let start = Date.now() // 开始计时

  return (...args) => {
    const now = Date.now() // 当前时间

    if (now - start >= wait) {
      func.apply(this, args)
      start = Date.now() // 执行完重新计时
    }
  }
}

// 定时器版和时间戳版本的区别
// 时间戳版本一般会立即执行（事件绑定到触发一般大于delay）；而定时器版本只有在等待时长wait后才会第一次执行
// 时间戳版本如果最后一次触发回调与前一次触发回调的时间差小于wait，则最后一次触发事件并不会执行func

// 3. 定时器+时间戳 立即执行版(触发时立即执行 + 结束后仍会执行一次)
function throttle(func, wait) {
  let start = 0 // 开始计时，初始化为0保证触发时立即执行
  let timer = null

  return (...args) => {
    const end = +new Date() // 当前时间
    const remaining = wait - (end - start) // 下次触发剩余的时间

    // 超过了剩余时间
    if (remaining <= 0) {
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
      start = +new Date() // 执行完重新计时
      func.apply(this, args)
    } else if (!timer) {
      timer = setTimeout(() => {
        time = null
        start = +new Date() // 执行完重新计时
        func.apply(this, args)
      }, remaining)
    }
  }
}

// 4. 定时器+时间戳 可配置是否立即执行版
function throttle(
  func,
  wait,
  config = {
    immediate: true, // 是否立即执行
    trailing: true, // 结尾是否执行
  }
) {
  let start = 0 // 开始计时
  let timer = null

  return (...args) => {
    const end = +new Date() // 当前时间
    // 初次进入，且不需要立即执行时，重置开始时间
    if (start === 0 && !config.immediate) {
      start = end
    }
    const remaining = wait - (end - start) // 下次触发剩余的时间

    // 超过了剩余时间
    if (remaining <= 0) {
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
      start = +new Date() // 执行完重新计时
      func.apply(this, args)
    } else if (!timer && config.trailing) {
      timer = setTimeout(() => {
        time = null
        start = config.immediate ? +new Date() : 0 // 执行完重新计时(下次不立即执行时则重置为0)
        func.apply(this, args)
      }, remaining)
    }
  }
}

// 5. 添加取消方法
function throttle(
  func,
  wait,
  config = {
    immediate: true, // 是否立即执行
    trailing: true, // 结尾是否执行
  }
) {
  let start = 0 // 开始计时
  let timer = null

  const throttled = (...args) => {
    const end = +new Date() // 当前时间
    // 初次进入，且不需要立即执行时，重置开始时间
    if (start === 0 && !config.immediate) {
      start = end
    }
    const remaining = wait - (end - start) // 下次触发剩余的时间

    // 超过了剩余时间
    if (remaining <= 0) {
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
      start = +new Date() // 执行完重新计时
      func.apply(this, args)
    } else if (!timer && config.trailing) {
      timer = setTimeout(() => {
        time = null
        start = config.immediate ? +new Date() : 0 // 执行完重新计时(下次不立即执行时则重置为0)
        func.apply(this, args)
      }, remaining)
    }
  }

  // 添加取消方法
  throttled.cancel = () => {
    clearTimeout(timer)
    timer = null
    start = 0
  }

  return throttled
}
