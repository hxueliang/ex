import 'babel-polyfill'

function loadImg(src) {
  var promise = new Promise(function (resolse, reject) {
    var img = document.createElement('img')
    // throw new Error('自定义错误')
    img.onload = function () {
      resolse(img)
    }
    img.onerror = function () {
      reject('图片加载失败')
    }
    img.src = src
  })
  return promise
}

const src1 = 'https://www.baidu.com/img/flexible/logo/pc/result.png'
const src2 = 'https://www.baidu.com/img/flexible/logo/pc/result@2.png'
const fn = async function () {
  const p1 = await loadImg(src1)
  console.log(p1)
  const p2 = await loadImg(src2)
  console.log(p2)
}
fn()