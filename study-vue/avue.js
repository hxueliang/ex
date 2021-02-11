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

// 遍历对象属性 实现所有属性响应式
function observe(obj) {
  if (typeof obj !== 'object' || typeof obj === null) {
    return
  }
  // 响应化处理
  new Observer(obj)
}

class AVue {
  constructor(options) {
    // 保存选项
    this.$options = options
    this.$data = options.data

    // 响应化处理
    observe(this.$data)
  }
}

class Observer {
  constructor(value) {
    this.value = value

    if (typeof value === 'object') {
      this.walk(value)
    }
  }

  // 对象数据响应化
  walk(obj) {
    Object.keys(obj).forEach(key => {
      defineReactive(obj, key, obj[key])
    })
  }
}