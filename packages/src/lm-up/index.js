import LmUpFile from './lm-up-file.vue'
import LmUpImg from './lm-up-img.vue'
LmUpFile.install=function (Vue) {
  Vue.component(LmUpFile.name,LmUpFile)
}
LmUpImg.install=function (Vue) {
  Vue.component(LmUpImg.name,LmUpImg)
}
export {
  LmUpFile,
  LmUpImg
}
