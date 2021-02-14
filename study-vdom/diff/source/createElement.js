function createElement(vnode) {
  var tag = vnode.tag
  var attrs = vnode.attrs || {}
  var children = vnode.children || []

  // 无tag不执行，如文本节点，注释节点
  if (!tag) {
    return null
  }
  // 创建真实的元素
  var elem = document.createElement(tag)
  // 设置属性
  var attrName
  for (attrName in attrs) {
    if (attrs.hasOwnProperty) {
      elem.setAttribute(attrName, attrs[attrName])
    }
  }
  // 递归子元素
  children.forEach(function (childerNode) {
    if (typeof childerNode === 'string') {
      elem.innerHTML = childerNode
      return
    }
    elem.appendChild(createElement(childerNode))
  })
  return elem
}