// let obj = {}

function defineReactive(obj, key, val) {
  Object.defineProperty(obj, key, {
    get() {
      console.log('get -> ' + key)
      return val
    },
    set(newVale) {
      if (newVale !== val) {
        console.log(`set -> ${key}:${newVale}`)
        val = newVale
      }
    }
  })
}

// defineReactive(obj, 'foo', 'foo1')
// obj.foo
// obj.foo = 'fooooooooo'

function observe(obj) {
  if (typeof obj !== 'object' || typeof obj === null) {
    return
  }
  Object.keys(obj).forEach(key => {
    defineReactive(obj, key, obj[key])
  })
}

let obj = {
  foo: 'foo',
  bar: 'bar',
  baz: {
    a: 1
  }
}
observe(obj)
obj.foo
obj.foo = 'foooooooo'
obj.bar
obj.bar = 'barrrrrrr'
obj.baz.a = 1 // 不是响应式数据