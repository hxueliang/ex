let obj = {}

function defineReactive(obj, key, val) {
  Object.defineProperty(obj, key, {
    get() {
      console.log('get -> ' + key)
      return val
    },
    set(newVale) {
      if (newVale !== val) {
        console.log(`set -> ${key}:${val}`)
        val = newVale
      }
    }
  })
}

defineReactive(obj, 'foo', 'foo1')
obj.foo
obj.foo = 'fooooooooo'
