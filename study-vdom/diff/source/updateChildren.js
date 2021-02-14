// 简单实现
// 假设节点数量和类型都不变，只改变元素内容

function updateChildren(vnode, newVnode) {
  var children = vnode.children || []
  var newChildren = newChildren.children || []

  children.forEach((childVnode, index) => {
    var newChildVnode = newChildren[index]
    if (childVnode.tag === newChildVnode.tag) {
      // 递归
      updateChildren(childVnode, newChildVnode)
    } else {
      // 替换
      replaceNode(childVnode, newChildVnode)
    }
  })
}

function replaceNode(vnode, newVnode) {
  var elem = vnode.elem
  var newElem = createElement(newVnode)

  // 替换

}
