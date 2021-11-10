/**
 * Event Bus，node各个模块的基石，同时涉及发布-订阅模式
 */
// 1.简易版
class EventEmitter {
  constructor() {
    this.listeners = this.listeners || {} // 存储事件
    // this.maxListeners = this.maxListeners || 20 // 监听上限
  }

  // 注册监听对象
  on(event, cb) {
    const callbacks = this.listeners[event] || []
    // 加入监听该事件的回调
    this.listeners[event] = [...callbacks, cb]
  }

  // 发布事件
  emit(event, ...args) {
    const callbacks = this.listeners[event] || []
    // 逐一执行回调
    callbacks.forEach(cb => cb.apply(args))
  }

  // 监听一次
  once(event, cb) {
    this.on(event, (...args) => {
      cb(...args)
      // 调用后移除该监听
      this.off(event, cb)
    })
  }

  // 移除事件监听
  off(event, cb) {
    const callbacks = this.listeners[event] || []
    const index = callbacks.findIndex(item => item === cb)
    // 删除
    if (index !== -1) {
      this.listeners[event].splice(index, 1)
    }
    // 该事件无其他回调了则删除该事件
    if (callbacks.length === 0) {
      delete this.listeners[event]
    }
  }

  // 移除该事件的所有监听
  offAll(event) {
    this.listeners[event] && delete this.listeners[event]
  }
}

// 2.完善版
class EventEmitter2 {
  constructor() {
    this.listeners = this.listeners || {} // 存储事件
    // this.maxListeners = this.maxListeners || 20 // 监听上限
  }

  // 注册监听对象
  on(event, cb) {
    const callbacks = this.listeners[event]
    // 加入监听该事件的回调
    if (!callbacks) {
      this.listeners[event] = cb
    } else if (callbacks && typeof callbacks === 'function') {
      this.listeners[event] = [callbacks, cb]
    } else {
      this.listeners[event].push(cb)
    }
  }

  // 发布事件
  emit(event, ...args) {
    const callbacks = this.listeners[event]
    // 有多个监听回调时逐一执行
    if (Array.isArray(callbacks)) {
      callbacks.forEach(cb => {
        args.length ? cb.apply(this, args) : cb.apply(this)
      })
    } else {
      args.length ? callbacks.apply(this, args) : callbacks.apply(this)
    }
  }

  // 监听一次
  once(event, cb) {
    this.on(event, (...args) => {
      cb.apply(this, args)
      // 调用后移除该监听
      this.off(event, cb)
    })
  }

  // 移除事件监听
  off(event, cb) {
    const callbacks = this.listeners[event]

    if (!callbacks) return

    // 回调是函数，说明只被监听了一次
    if (typeof callbacks === 'function') {
      delete this.listeners[event]
    } else {
      const index = callbacks.findIndex(item => item === cb)
      // 删除
      if (index !== -1) {
        this.listeners[event].splice(index, 1)
      }
      // 该事件无其他回调了则删除该事件
      if (callbacks.length === 0) {
        delete this.listeners[event]
      }
    }
  }

  // 移除该事件的所有监听
  offAll(event) {
    this.listeners[event] && delete this.listeners[event]
  }
}
