### 思考
最近在我的vue-cli项目中使用export default时，遇到了一个小问题。大概是这么一个情况，正常情况下，我们是这么使用**export default**的：

```
// a.js
import person from './b'
const { name, age } = person
console.log(name, age)

// b.js
export default {
    name: 'MiKiMiKi'
    age: 18
}
```
此时，灵机一转，想到如下es6解构的用法：
```
// a.js
import { name, age } from './b'
console.log(name, age)
```

这么一看，是不是有点机智，运行一下，无奈看到了这样的景象：


### 