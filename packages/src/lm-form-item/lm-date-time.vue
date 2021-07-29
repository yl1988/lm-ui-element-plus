<!--表单项：时间选择-->
<template>
  <el-col :span="span" class="lm-form-item-col" ref="lmCol">
    <el-form-item :label="label" :prop="prop" :label-width="lmFormLabelWidth" ref="formItemRef" :required="required" :style="{'margin-bottom':marginBottom || (isEdit ? '22px' : '0')}">
      <div v-if="isEdit" class="lmElSelectBox" style="text-align:left;">
        <!--日期选择-->
        <el-date-picker v-if="formType==='dateTime'"
                        :type="dateTimeType"
                        :model-value="lmFormValue"
                        :size="size"
                        :placeholder="lmDateTimePlaceholder"
                        :value-format="lmDateTimeValueFormat"
                        :format="lmDateTimeFormat"
                        :style="{width:lmFormItemWidth}"
                        @update:model-value="lmFormItemChange"
                        :disabled-date="disabledDate"
                        :disabled="disabled"
        ></el-date-picker>
        <!--日期范围选择-->
        <div v-if="formType==='rangeDateTime'">
          <el-date-picker
            :type="dateTimeType"
            :placeholder="lmDateTimePlaceholder[0]"
            :model-value="lmFormMultiValues[0]"
            :value-format="lmDateTimeValueFormat"
            :format="lmDateTimeFormat"
            :style="{width:lmFormItemWidth}"
            @update:model-value="v=>rangeTimeFormItemChange(v,0)"
            :disabled-date="disabledDate"
            :size="size" :disabled="disabled"
          ></el-date-picker>
          <slot name="conection">
            <div class="dateTimeConnection">{{conectionText}}</div>
          </slot>
          <el-date-picker
            :type="dateTimeType"
            :placeholder="lmDateTimePlaceholder[1]"
            :model-value="lmFormMultiValues[1]"
            :value-format="lmDateTimeValueFormat"
            :format="lmDateTimeFormat"
            :style="{width:lmFormItemWidth}"
            @update:model-value="v=>rangeTimeFormItemChange(v,1)"
            :disabled-date="endDisabledDate"
            :size="size" :disabled="disabled"
          ></el-date-picker>
        </div>
      </div>
      <div class="lmTexts" v-else>
        <div v-if="formType==='rangeDateTime'">
          <span>{{lmFormMultiValues[0]}}</span>
          <slot name="conection">
            <div class="dateTimeConnection">{{conectionText}}</div>
          </slot>
          <span>{{lmFormMultiValues[1]}}</span>
        </div>
        <span v-else class="textSpan" :style="{...spanStyle}" >{{value}}</span>
      </div>
    </el-form-item>
  </el-col>
</template>
<script>
import {lmFormItemWatch} from "./util";
import mixin from './mixin'
export default {
  name: 'LmDateTime',
  mixins:[mixin],
  props:{
    formType:{
      type:String,
      default:'dateTime'
    },//表单类型
    modelValue:{
      type:[String,Number,Array,Date]
    },//值
    dateTimeType:{
      type:String,
      default:'date'
    },//时间类型
    dateTimeValueFormat:String,//时间格式
    dateTimeFormat:String,//时间格式
    disabledDate:Function,//日期可见
    endDisabledDate:Function,//日期范围的后面日期可见
    conectionText:{
      type:String,
      default:'-'
    },//时间范围连接符
    placeholder:{
      type:String,
      default:'请选择'
    },//placeholder
  },
  emits: ['update:modelValue','change'],
  data() {
    return {
      lmFormValue:null,//值
      lmFormMultiValues:[],//选择好的多选数据
      startDatePlaceholder:'',//起始日期日期placeholder
      endDatePlaceholder:'',//结束日期日期placeholder
      lmDateTimePlaceholder:'请选择',//时间范围placeholder
      lmDateTimeFormat:'YYYY-MM-DD',//时间显示格式
      lmDateTimeValueFormat:'YYYY-MM-DD',//时间值格式
    }
  },
  created(){
    let {formType,placeholder,dateTimeType,dateTimeValueFormat,dateTimeFormat}=this
    if(formType==='dateTime'){
      placeholder !=='请选择' && (this.lmDateTimePlaceholder=placeholder)
    }else if(formType==='rangeDateTime'){
      placeholder instanceof Array ? (this.lmDateTimePlaceholder=placeholder) : (this.lmDateTimePlaceholder=['请选择','请选择'])
    }
    if(dateTimeType==='datetime'){
      this.lmDateTimeFormat=dateTimeFormat || 'YYYY-MM-DD HH:mm:ss'
      this.lmDateTimeValueFormat=dateTimeValueFormat ||  'YYYY-MM-DD HH:mm:ss'
    }else{
      this.lmDateTimeFormat=dateTimeFormat || 'YYYY-MM-DD'
      this.lmDateTimeValueFormat=dateTimeValueFormat|| 'YYYY-MM-DD'
    }
    console.log(this.lmDateTimeFormat)
  },
  mounted() {
    this.modelValue && ( this.formType==='rangeDateTime' ? (this.lmFormMultiValues=this.modelValue) : ( this.lmFormValue=this.modelValue))
  },
  methods: {
    //选择框，单选框，时间，级联选择等改变
    lmFormItemChange(value){
      this.$emit('update:modelValue',value)
      this.$emit('change',{value})
    },
    //时间范围改变
    rangeTimeFormItemChange(value,type){
      this.lmFormMultiValues[type]=value
      this.$emit('update:modelValue',this.lmFormMultiValues)
      this.$emit('change',this.lmFormMultiValues)
    },
  },
  watch:{
    modelValue:function (v) {
      lmFormItemWatch(v,'rangeDateTime',this)
    },
  },
}
</script>

