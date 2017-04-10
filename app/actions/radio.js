/**
 * Created by Leon.Hwa on 17/4/10.
 */
import Common from '../common/constants'
import Channel from '../channel'
/**获取轮播图*/
const getRadio = (page =1)=>{
    return(dispatch,store) => {
        const  channel = new Channel()
        return channel.getRadio(page)
            .then(data =>{
                return dispatch({
                    type:Common.RADIO.INFO,
                    data:data
                })
            })
    }

}
export  default {getRadio}