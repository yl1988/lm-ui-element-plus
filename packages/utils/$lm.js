/**
 * 挂在原型链上的方法
 */
import {formatDate} from "./lm-methods";

export default {
    install(app, options) {
        app.config.globalProperties.$lm = {
            // 控制在一个日期范围内不可见
            dateRangeDisabled(time,range=[],config={}){
                let {startEqual,endEqual,disNow}=config
                /**
                 *startEqual //开始时间是否可以相等
                 *endEqual //结束时间是可否以相等
                 *disNow //今天是否不可见
                 */
                let [start,end]=range
                let startDate=start ? new Date(formatDate(start)).getTime() : NaN
                let endDate=end ? new Date(formatDate(end)).getTime() : NaN
                let date=new Date(formatDate(time)).getTime()

                if(startEqual && (date===startDate)){
                    return false
                }
                if(endEqual && (date===endDate)){
                    return false
                }
                if(startDate && endDate){
                    return  !(date>=startDate && date<=endDate)
                }
                if(startDate){
                    return date<startDate
                }
                if(endDate){
                    return date>endDate
                }
                if(disNow){
                   if(formatDate(time)===formatDate(new Date())){
                       return  true
                   }
                }
                return false
            },
            //根据类型值获取对应的文字，用于从复杂列表中根据类型（通常为value，id等）获取显示值
            getListName(arr,value,config={}){
                let {valueStr='value',nameStr='name'}=config
                let filterData=arr.filter(item=>{
                    let listValue= item[valueStr]
                    if(typeof item[valueStr]==='number'){
                        value=Number(value)
                    }
                    if(typeof item[valueStr]==='string'){
                        if(typeof value==='number'){
                            value=value.toString()
                        }
                    }
                    return listValue===value
                })[0]
                // console.log(filterData)
                return filterData ? filterData[nameStr] : ''
            },
            // 防止连点continueTime为多少秒以内不可以使用
            preventContinuePoint(that, continueTime = 2000) {
                return new Promise((resolve) => {
                    let date = new Date()
                    let time = date.getTime()
                    let {lastTime} = that
                    if (lastTime && ((time - lastTime) < continueTime)) {
                        return
                    }
                    lastTime = time
                    that.lastTime = lastTime
                    let timeOut = setTimeout(() => {
                        clearTimeout(timeOut)
                        that.lastTime = 0
                    }, continueTime)
                    resolve(true)
                })
            },
        }
    }
}
