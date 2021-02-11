// 设置响应式属性
function defineReactive(obj, key, val) {
  // 递归
  observe(val)
  // 创建一个Dep和当前的key一一对应
  const dep = new Dep()
  // 对传入的obj进行访问拦截
  Object.defineProperty(obj, key, {
    get() {
      console.log('get -> ' + key)
      // 依赖收集在这里
      Dep.target && dep.addDep(Dep.target)
      return val
    },
    set(newVale) {
      if (newVale !== val) {
        console.log(`set -> ${key}:${newVale}`)
        // 如果传入的newVale依然是obj, 需要做响应化处理
        observe(newVale)
        val = newVale

        // 执行更新函数，没实现dep，只要一个值变化就是执行所有更新函数
        // watchers.forEach(w => w.update())
        // 通知更新
        dep.notify()
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

// 观察者：保存更新函数，值发生变化调用更新函数
// const watchers = [] // 临时使用，将来会被dep取代
class Watcher {
  constructor(vm, key, updateFn) {
    this.vm = vm
    this.key = key
    this.updateFn = updateFn

    // watchers.push(this)

    // Dep.target表态属性上设置为当前watcher实例
    Dep.target = this
    this.vm[this.key] // 读取触发了getter，即defineReactive里的get()
    Dep.target = null // 触发完getter，收集完就立即置空
  }

  update() {
    this.updateFn.call(this.vm, this.vm[this.key])
  }
}

// Dep：依赖，管理某个key相关的，所有Watcher实例
class Dep {
  constructor() {
    this.deps = []
  }

  // 提供给外界添加依赖
  addDep(dep) { // dep: 将来就是watcher实例
    this.deps.push(dep)
  }

  // 通知方法
  notify() {
    this.deps.forEach(dep => dep.update())
  }
}
