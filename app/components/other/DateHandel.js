/**
 * Created by Leon.Hwa on 17/4/25.
 */
const parse = (date) =>{
    var d = new Date(date)

    let year = d.getYear()
    let month = d.getMonth()
    let day = d.getDate()
    let hour = d.getHours()
    let min = d.getMinutes()

    let now = new Date()
    // console.log(date + '===>' + day)
    // console.log(now + '===>' + now.getDate())
    if(now.getYear() > year){
        let yeal_del =  now.getYear() - year
        return `${yeal_del}年前`
    }else{
        let month_del =  now.getMonth() - month
        if(month_del > 0){
            return `${month_del}个月前`
        }
        let day_del =  now.getDate() - day
        console.log(day_del)
        if(day_del >= 7){
            let we = parseInt(day_del/7)
            return `${day_del}周前`

        }else if(day_del >= 1 && day_del < 7){

            if(day_del == 1){
                let hour_del =  (24 - hour) + now.getHours()
                return `${hour_del}小时前`
            }
            return `${day_del}天前`
        }else {
            let hour_del =  now.getHours() - hour

            if(hour_del > 1 ){
                return `${hour_del}小时前`
            }else if(hour_del === 1){
               let min_del = (60 - min) + now.getMinutes()
                // console.log('min_del')
                // console.log(min_del)
                if(min_del === 60){
                    return '1小时前'
                }else {
                    return `${min_del}分钟前`
                }
            }else{
                let min_del =  now.getMinutes() - min
                if(min_del >= 1){
                    return `${min_del}分钟前`
                }else{
                    return '刚刚'
                }
            }
        }
    }
}
export default {parse}