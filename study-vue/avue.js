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

// 代理函数，方便用户直接访问$data中的数据
function proxy(vm, sourceKey) {
  // 此处 vm[sourceKey] 就是 vm.$data
  Object.keys(vm[sourceKey]).forEach(key => {
    // 将$data中的key代理到vm属性中
    Object.defineProperty(vm, key, {
      get() {
        return vm[sourceKey][key]
      },
      set(newVal) {
        vm[sourceKey][key] = newVal
      }
    })
  })
}

// 创建AVue构造函数
class AVue {
  constructor(options) {
    // 保存选项
    this.$options = options
    this.$data = options.data

    // 响应化处理
    observe(this.$data)

    // 代理
    proxy(this, '$data')

    // 创建编译器
    new Compiler(options.el, this)
  }
}

// 根据对象类型决定如何做响应化
class Observer {
  constructor(value) {
    // 保存选项
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