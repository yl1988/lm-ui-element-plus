<!--ExampleForm-->
<template>
  <div>
    <div style="padding-top:60px; width: 1000px">
      <el-form ref="form" :model="form" label-width="100px">
        <el-row>
          <lm-input label="姓名：" v-model="form.name" maxlength="50"></lm-input>
          <lm-select label="学历：" v-model="form.stuty" :list="['文盲','小学','初中','高中','中专','大专','本科','硕士','博士']"/>
        </el-row>
        <el-row>
          <lm-select form-type="radio" label="类型：" v-model="form.type " disabled/>
          <lm-date-time  label="开始时间：" v-model="form.startDate " placeholder="请选择开始时间"/>
        </el-row>
        <el-row v-if="form.type===0">
          <lm-input label="姓名：" v-model="form.name"  @update:model-value="lmInputInput"></lm-input>
          <lm-select label="学历：" v-model="form.stuty" :list="['文盲','小学','初中','高中','中专','大专','本科','硕士','博士']"/>
        </el-row>
        <el-row>
          <lm-cascader label="证书：" :options="cascaders"/>
        </el-row>
        <el-row>
          <lm-date-time :span="24" label="时间" form-type="rangeDateTime" v-model="form.rangeDate" placeholder="请选择时间" width="200"
                        :picker-options="[
                            {disabledDate:(time)=>$lm.dateRangeDisabled(time,[0, form.rangeDate ? (form.rangeDate[1] || new Date()) : new Date(),{endEqual:true}])},
                            {disabledDate:(time)=>$lm.dateRangeDisabled(time,[form.rangeDate ? (form.rangeDate[0] || 0) : 0, new Date(),{startEqual:true}])}
                            ]"/>
        </el-row>
        <lm-address label="住址："
                    v-model="form.companyAddress" :required="false"
                    @getLngLatInfo="getLngLatInfo"
                    @addressChange="addressChange"
                    :disabled="[false,false,false,false]"
                    :get-lng-lat="getLngLat"
                    amap-key="75de5ea5e06bf7f25f26495225594885"
        />
        <el-row>
          <lm-input label="经度：" v-model="form.lng" type="number" maxlength="10" to-fixed="4"/>
          <lm-input label="纬度：" v-model="form.lat" type="idcard"/>
        </el-row>
        <el-row>
          <lm-input label="电话：" v-model="form.tess " type="tel" @change="phoneChange"/>
          <lm-input label="身份证：" v-model="form.idcard" type="idcard"/>
        </el-row>
        <lm-up-img :limit="6" action="/admin/sys-file/upload" :other-data="otherData" :file-list="imgList"/>
        <lm-up-file action="/admin/sys-file/upload" :other-data="otherData" :file-list="fileList"/>
      </el-form>
      <div class="rowCenter">
        <el-button type="primary" @click="save" style="width:120px;">保存</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExampleForm',
  data() {
    return {
      otherData:{ bucketName: 'smart-park'},
      form:{},//表单
      cascaders:[
        {
          name:'建筑工程',
          value:'jz',
          children:[
            {
              name:'一级',
              value:'jzc1'
            },
            {
              name:'二级',
              value:'jzc2'
            }
          ]
        },
        {
          name:'水利工程',
          value:'sl',
          children:[
            {
              name:'一级',
              value:'slc1',
              children:[
                {
                  name:'一级AA',
                  value:'slc1aa'
                },
                {
                  name:'一级AB',
                  value:'slc1ab'
                },
                {
                  name:'一级AC',
                  value:'slc1ac'
                },
              ]
            }
          ]
        }
      ],
      fileList:[],//
      imgList:[],
      getLngLat:true,
      isStart:false,//
    }
  },
  computed: {},
  mounted() {
    setTimeout(()=>{
      this.form={
        companyAddress:{cityId:'520100',provinceId:'520000',districtId:'520102',street:'dd',}
      }//保单
    },1000)
  },
  methods: {
    save(){
      console.log(this.form)
      console.log(this.cascaders)
    },
    lmInputInput(value){
      console.log(value)
    },
    getLngLatInfo({lng,lat}){
      this.$set(this.form,'lng',lng)
      this.$set(this.form,'lat',lat)
    },
    addressChange(value){
      console.log(value)
    },
    onkeydown(event){
      console.log(event)
    },
    phoneChange(){
      this.getLngLat=false
    }
  },

}
</script>

<style scoped lang="scss">

</style>
