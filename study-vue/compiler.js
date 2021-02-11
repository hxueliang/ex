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
        console.log('编译元素：' + node.nodeName)
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
    node.textContent = this.$vm[RegExp.$1]
  }
}