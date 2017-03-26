/**
 * Created by Leon.Hwa on 17/3/21.
 */
import Channel from '../channel'
import Common from '../common/constants'
/**获取轮播图*/
const getBanner = ()=>{
    return(dispatch,store) => {
     const  channel = new Channel()
     return channel.getBanner()
         .then(data =>{
             return dispatch({
                 type:Common.HOME.BANNAR,
                 data:data
             })
         })
    }

}
/**获取首页信息*/
const getHomePage = ()=>{
    return(dispatch,store) => {
        const  channel = new Channel()
        return channel.getHomePage()
            .then(data =>{
                return dispatch({
                    type:Common.HOME.INFO,
                    data:data
                })
            })
    }

}
export  default {
    getBanner,
    getHomePage
}

