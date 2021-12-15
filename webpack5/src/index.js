import { foo, name, log } from './foo'
import '@/style.css'
import '@/inde.scss'
import '@/index.less'
import logo from '~/img/a.jpg'
let ary = [1, 2, 2, 1, 2, 3]
let a = Array.from(new Set(ary))
console.log(a)
log(name, foo)
const img = new Image()
img.src = logo

document.getElementById('imgBox').appendChild(img)

