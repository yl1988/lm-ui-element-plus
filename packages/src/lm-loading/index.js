import {h,render,createApp} from 'vue'
import LmLoadingConstructor from './lm-loading.vue'
// const LmLoadingConstructor=extend(lmLoading)
let instance
// // const initInstance = () => {
// //   instance = new LmLoadingConstructor({
// //     el: document.createElement('div'),
// //     data(){
// //       return {
// //         visible: false,
// //         color:'',//颜色
// //         size:'',//尺寸
// //       }
// //     }
// //   })
// // }
// const initInstance = () => {
//   const vnode = h(LmLoadingConstructor,{
//     visible: false,
//     color:'',//颜色
//     size:'',//尺寸
//   })
//   const container=document.createElement('div')
//   console.log(container)
//   render(vnode, container)
//   document.body.appendChild(container)
//   return vnode
// }
// vant  源码中是直接用的setup返回的jsx,我这里用的是vue的cdn用法,没有环境支持
const initInstance=function (){
  console.log(LmLoadingConstructor)
  return createApp({
    setup(props) {
      return {
        visible: false,
        color:'',//颜色
        size:'',//尺寸
      }
    },
    render() {
      return h(LmLoadingConstructor)
    }
  })
}

// 提供一个父元素
// const parent = document.createElement('div')
// //mount方法不再像vue2一样支持未挂载的实例，必须得挂载，即必须得给参数
// const instance = app.mount(parent)
// console.log(instance)
// console.log(instance.$el)
const LmLoading=function (){
  if (!instance) {
    // 提供一个父元素
    const parent = document.createElement('div')
    instance=initInstance().mount(parent)
    console.log(instance)
    console.log(instance.$el)
  }
}
LmLoading.show=function (config={}){
  let {timeout,color,size}=config
  return new Promise((resolve,reject)=>{
    console.log(instance.$el)
    document.body.appendChild(instance.$el)
    instance.visible = true
    color && (instance.color=color)
    size && (instance.size=size)
    if(typeof timeout==='number'){
      let timeNum=setTimeout(()=>{
        clearTimeout(timeNum)
        instance.visible=false
      },timeout)
    }
    resolve(true)
  })
}
LmLoading.hidden=function (){
  instance.visible =false
}
export default LmLoading
