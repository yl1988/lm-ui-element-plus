import LmCalendar from './src/lm-calendar/index'
import {
    LmInput,
    LmSelect,
    LmDateTime,
    LmCascader
} from './src/lm-form-item/index'
import LmAddress from './src/lm-address'
import {
    LmUpFile,
    LmUpImg
} from './src/lm-up/index'
import LmDialog from './src/lm-dialog'
import LmImgCropper from './src/lm-img-cropper'
// import LmLoading from "./src/lm-loading";


import './lm-ui-element-style/src/index.scss'

const components=[LmCalendar,LmInput,LmSelect,LmDateTime,LmCascader,LmAddress,LmUpFile,LmUpImg,LmDialog,LmImgCropper]
//console.log(components)
const install=function (Vue) {
    if(install.installed){
        return
    }
    components.map(component=>Vue.component(component.name,component))

}
if(typeof window!=='undefined' && window.Vue){
  install(window.Vue)
}
export {
    LmCalendar,LmInput,LmSelect,LmDateTime,LmCascader,LmAddress,LmUpFile,LmUpImg,LmDialog,LmImgCropper
}
export default {
    install,
}
