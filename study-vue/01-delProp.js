// let obj = {}

// 设置响应式属性
function defineReactive(obj, key, val) {
  // 递归
  observe(val)
  // 对传入的obj进行访问拦截
  Object.defineProperty(obj, key, {
    get() {
      console.log('get -> ' + key)
      return val
    },
    set(newVale) {
      if (newVale !== val) {
        console.log(`set -> ${key}:${newVale}`)
        // 如果传入的newVale依然是obj, 需要做响应化处理
        observe(newVale)
        val = newVale
      }
    }
  })
}

// defineReactive(obj, 'foo', 'foo1')
// obj.foo
// obj.foo = 'fooooooooo'

// 遍历对象属性 实现所有属性响应式
function observe(obj) {
  if (typeof obj !== 'object' || typeof obj === null) {
    return
  }
  Object.keys(obj).forEach(key => {
    defineReactive(obj, key, obj[key])
  })
}
// 数据对象
let obj = {
  foo: 'foo',
  bar: 'bar',
  baz: {
    a: 1
  }
}
observe(obj)
// 测试数据
obj.foo
obj.foo = 'foooooooo'
obj.bar
obj.bar = 'barrrrrrr'
obj.baz.a = 2 // 不是响应式数据

obj.baz = { a: 10 }
obj.baz.a = 1000