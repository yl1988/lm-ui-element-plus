import LmInput from './lm-input.vue'
import LmSelect from './lm-select.vue'
import LmCascader from './lm-cascader.vue'
import LmDateTime from './lm-date-time.vue'
LmInput.install=function (Vue) {
    Vue.component(LmInput.name,LmInput)
}
LmSelect.install=function (Vue) {
    Vue.component(LmSelect.name,LmSelect)
}
LmCascader.install=function (Vue) {
    Vue.component(LmCascader.name,LmCascader)
}
LmDateTime.install=function (Vue) {
    Vue.component(LmDateTime.name,LmDateTime)
}
export {
    LmInput,
    LmSelect,
    LmDateTime,
    LmCascader
}
