/**
 * Created by Leon.Hwa on 17/4/10.
 */

import Common from '../common/constants'
import Channel from '../channel'
/**获取轮播图*/
const getVideo = (page =1)=>{
    return(dispatch,store) => {
        dispatch(fetchingVideo(page))
        const  channel = new Channel()
        return channel.getVideo(page)
            .then(data =>{
                return dispatch({
                    type:Common.VIDEO.INFO,
                    data:data
                })
            })
    }

}
const fetchingVideo = (page)=>{
    var  isLoading = false
    var isLoadMore = false
    if(page === 1){
        isLoading = true,
            isLoadMore = false
    }else{
        isLoading = false,
            isLoadMore =true
    }
    console.log('状态')
    return {
        type:Common.VIDEO.INFO,
        isLoading:isLoading,
        isLoadMore:isLoadMore
    }
}
export  default {getVideo}