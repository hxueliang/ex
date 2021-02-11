/**
 * 编译器
 * 递归遍历dom树
 * 判断节点类型，如果是文本，则判断是否是插值绑定
 * 如果是元素，则遍历其属性判断是否是指令或事件，然后递归子元素
 */

class Compiler {
  // 构造函数 el: 宿主元素 vm: AVue实例
  constructor(el, vm) {
    this.$el = document.querySelector(el)
    this.$vm = vm

    if (this.$el) {
      this.compile(this.$el)
    }
  }
  // 编译函数
  compile(el) {
    // 遍历el树
    const childNodes = el.childNodes
    Array.from(childNodes).forEach(node => {
      // 判断类型
      if (this.isElement(node)) {
        // console.log('编译元素：' + node.nodeName)
        this.compileElement(node)
      } else if (this.isInter(node)) {
        // console.log('编译插值绑定：' + node.textContent)
        this.compileText(node)
      }
      // 递归子节点
      if (node.childNodes && node.childNodes.length > 0) {
        this.compile(node)
      }
    })

  }

  // 元素
  isElement(node) {
    return node.nodeType === 1
  }

  // 文本
  isInter(node) {
    // 文本标签 && {{xx}}
    console.log()
    return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
  }

  // 编译文本
  compileText(node) {
    // node.textContent = this.$vm[RegExp.$1]
    this.update(node, RegExp.$1, 'text')
  }

  // 编译元素
  compileElement(node) {
    // 获取所有属性
    const nodeAttrs = node.attributes
    Array.from(nodeAttrs).forEach(attr => {
      // 规定：指令以a-xx="00"定义
      const attrName = attr.name // a-xx
      const exp = attr.value // oo
      if (this.isDirective(attrName)) {
        const dir = attrName.substring(2) // xx
        // 执行指令
        this[dir] && this[dir](node, exp) // this.text(node, exp)
      }
    })
  }

  // 指令
  isDirective(attrName) {
    return attrName.indexOf('a-') === 0
  }

  // 公共的更新函数
  update(node, exp, dir) {
    // 初始化
    // 指令对应的更新函数xxUpdater
    const fn = this[dir + 'Updater']
    fn && fn(node, this.$vm[exp])

    // 更新处理，封装一个更新函数，可以更新对应dom元素
    new Watcher(this.$vm, exp, function (val) {
      fn && fn(node, val)
    })
  }



  // a-text
  text(node, exp) {
    // node.textContent = this.$vm[exp]
    this.update(node, exp, 'text')
  }

  // a-html
  html(node, exp) {
    // node.innerHTML = this.$vm[exp]
    this.update(node, exp, 'html')
  }

  // a-text更新函数
  textUpdater(node, value) {
    node.textContent = value
  }

  // a-html更新函数
  htmlUpdater(node, value) {
    node.innerHTML = value
  }
}