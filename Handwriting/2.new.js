/**
 *
 * @param {function} Con 构造函数
 * @param  {...any} args 参数
 * @returns {object} 实例对象
 */
function myNew(Con, ...args) {
  let obj = {}
  // obj的原型属性指向构造函数Con的原型对象，obj对象需要访问到构造函数原型链上的属性
  obj.__proto__ = Con.prototype //  Object.setPrototypeOf(obj, Con.prototype)
  // 将obj绑定到构造函数上并传参( 绑定 this 实现继承，obj 可以访问到构造函数中的属性)
  let result = Con.apply(obj, args)
  // 如果返回值是对象则直接返回该对象，否则返回新创建的obj
  return result instanceof Object ? result : obj
}

// an example
function Animal(name) {
  this.name = name
}
Animal.prototype.eating = function () {
  console.log(`${this.name} is eating`)
}

const cat = myNew(Animal, 'Cat')
cat.eating()
