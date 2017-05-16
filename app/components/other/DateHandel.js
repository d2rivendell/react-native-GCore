/**
 * Created by Leon.Hwa on 17/4/25.
 */

//2017-05-11 09:48:33
 function parseDate(date) {
    var isoExp, parts;
    isoExp = /^\s*(\d{4})-(\d\d)-(\d\d)\s(\d\d):(\d\d):(\d\d)\s*$/;
    try {
        parts = isoExp.exec(date);
    } catch(e) {
        return null;
    }
    if (parts) {
        date = new Date(parts[1], parts[2] - 1, parts[3], parts[4], parts[5], parts[6]);
    } else {
        return null;
    }
    return date;
}

/**
 * 由于浏览器内核不一样 直接 new Date(date)  在safari 和 firfox  得到的是invalid
 * */
const parse = (date) =>{
    // console.log(date)
    var d = parseDate(date)

    let year = d.getYear()
    let month = d.getMonth()
    let day = d.getDate()
    let hour = d.getHours()
    let min = d.getMinutes()


    let now = new Date()

    let yeal_del =  now.getYear() - year
    let month_del =  now.getMonth() - month
    var day_del =  now.getDate() - day
    let hour_del =  now.getHours() - hour
    let min_del =  now.getMinutes() - min

    if(now.getYear() > year){
        if(yeal_del === 1){
            month_del = 12 - month + now.getMonth()
            return `${month_del}个月前`
        }
        return `${yeal_del}年前`
    }else{//月
         if(month_del > 1){
             return `${month_del}个月前`
         }else if(month_del === 1){
             day_del = 30 - day + now.getDate()
         }
        
        if(day_del >= 7){
            let we = parseInt(day_del/7)
            return `${we}周前`

        }else if(day_del >= 1 && day_del < 7 ){
            if(day_del == 1){
                let hour_del =  (24 - hour) + now.getHours()
                if(hour_del > 24){
                    return `昨天`
                }
                return `${hour_del}小时前`
            }
            return `${day_del}天前`


        }else {//小时

            if(hour_del > 1 ){
                return `${hour_del}小时前`
            }else if(hour_del === 1){
               let min_del = (60 - min) + now.getMinutes()

                if(min_del === 60){
                    return '1小时前'
                }else {
                    return `${min_del}分钟前`
                }
            }else if(hour_del === 0){

                if(min_del >= 1){
                    return `${min_del}分钟前`
                }else if(min_del === 0){
                    console.log(date + '===>' + day)
                    console.log(now + '===>' + now.getDate())
                    return '刚刚'
                }else{
                    let day_del =  now.getDate() - day
                    console.log(day_del)
                    return date
                }
            }else{
                let day_del =  now.getDate() - day
                console.log(day_del)
                return date
            }
        }
    }
}
export default {parse}