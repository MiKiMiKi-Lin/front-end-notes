### 1. 每隔 1s 分别输出 1、2、3

`Promise + reduce + setTimeout`

```js
const arr = [1, 2, 3]
arr.reduce((p, cur) => {
  return p.then(() => {
    // 返回 Promise, 下一个then等待该Promise1s延迟后resolve后再
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log(cur)
        resolve()
      }, 1000)
    })
  })
}, Promise.resolve())
```

简写版（好像也没有简写到哪去）：

```js
const arr = [1, 2, 3]
arr.reduce(
  (p, cur) =>
    p.then(
      () =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(console.log(cur))
          }, 1000)
        })
    ),
  Promise.resolve()
)
```

### 2. 红绿黄灯交替重复亮

```js
// 亮灯
const lightUpLamp = lamp => {
  console.log(lamp)
}
// 返回亮灯操作完成的Promise
const light = lamp =>
  new Promise(resolve => {
    setTimeout(() => {
      lightUpLamp(lamp)
      resolve()
    }, 1000)
  })
// 交替亮灯
const turnLights = () => {
  Promise.resolve()
    .then(() => {
      return light('red')
    })
    .then(() => {
      return light('green')
    })
    .then(() => {
      return light('yellow')
    })
    .then(() => {
      turnLights()
    })
}

turnLights()
```

### 3. mergePromise 函数

把传进去的数组按顺序先后执行，并且把返回的数据先后放到数组 data 中

```js
const time = timer => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, timer)
  })
}
const ajax1 = () =>
  time(2000).then(() => {
    console.log(1)
    return 1
  })
const ajax2 = () =>
  time(1000).then(() => {
    console.log(2)
    return 2
  })
const ajax3 = () =>
  time(1000).then(() => {
    console.log(3)
    return 3
  })

mergePromise([ajax1, ajax2, ajax3]).then(data => {
  console.log('done')
  console.log(data) // data 为 [1, 2, 3]
})

// 要求分别输出
// 1
// 2
// 3
// done
// [1, 2, 3]
```

```js
const mergePromise = promises => {
  const data = [] //
  return promises.reduce((pre, cur) => {
    console.log(pre)
    // 返回Promise方便继续链式调用
    return pre.then(cur).then(res => {
      data.push(res)
      // 返回结果（ fullfilled 的值）
      return data
    })
  }, Promise.resolve())
}
```

### 4. PromiseA+规范的 Promise

```js

```

### 5. 封装一个异步加载图片的方法

```js
// 返回一个Promise，图片加载成功则 resolve
const loadImg = src =>
  new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      resolve(img)
    }
    img.onerror = () => {
      reject(new Error(`load image fail! src is ${src}`))
    }
    img.src = src
  })
```

### 6. 限制异步操作的并发个数并尽可能快的完成全部（TODO）

- 图片数组 `urls = []`
- 已经有一个函数 `function loadImg`(上题)
- 有一个要求，任何时刻同时下载的链接数量**不可以超过 3 个**

请写一段代码实现这个需求，要求**尽可能快速**地将所有图片下载完成。

```js
// 异步加载图片
function loadImg(src) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      console.log(`加载完成: ${src}`)
      resolve(img)
    }
    img.onerror = () => {
      reject(new Error(`load image fail! src is ${src}`))
    }
    img.src = src
  })
}
// 限制异步操作的并发个数并尽可能快的完成全部
function limitLoad(urls, handler, limit) {
  let sequence = [].concat(urls) // 复制urls
  // 初始化 promises 容器 (只存放limit个)
  let promises = sequence.splice(0, limit).map((url, index) => {
    return handler(url).then(() => {
      // 返回下标是为了知道数组中是哪一项最先完成
      return index
    })
  })
  // 注意这里要将整个变量过程返回，这样得到的就是一个Promise，可以在外面链式调用
  return sequence
    .reduce((pCollect, url) => {
      return pCollect
        .then(() => {
          // 获得先完成的一项
          return Promise.race(promises) // 返回已经完成的下标
        })
        .then(fastestIndex => {
          console.log(`容器内下标为：${fastestIndex}，完成`)
          // 获取到已经完成的下标
          // 替换容器内已完成的项为加载当前url
          promises[fastestIndex] = handler(url).then(() => {
            return fastestIndex // 要继续将这个下标返回，以便下一次变量
          })
        })
        .catch(err => {
          console.error(err)
        })
    }, Promise.resolve())
    .then(() => {
      // 最后三个用.all来调用
      return Promise.all(promises)
    })
}

let urls = [
  'https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting1.png',
  'https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting2.png',
  'https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting3.png',
  'https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting4.png',
  'https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting5.png',
  'https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/bpmn6.png',
  'https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/bpmn7.png',
  'https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/bpmn8.png',
]
limitLoad(urls, loadImg, 3)
  .then(res => {
    console.log('图片全部加载完毕')
    console.log(res)
  })
  .catch(err => {
    console.error(err)
  })
```

### 来源

[1-6 题](https://juejin.cn/post/6844904077537574919#heading-50)
