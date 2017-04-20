/**
 * Created by Leon.Hwa on 17/4/10.
 */
import Common from '../common/constants'
import Channel from '../channel'
/**获取轮播图*/
const getRadio = (page =1)=>{
    return(dispatch,store) => {
        dispatch(fetchingRadio(page))
        const  channel = new Channel()
        return channel.getRadio(page)
            .then(data =>{
                return dispatch({
                    type:Common.RADIO.INFO,
                    data:data,
                    isLoading:false,
                    isLoadMore:false,
                    page:page
                })
            })
    }

}
const fetchingRadio = (page)=>{
    var  isLoading = false
    var isLoadMore = false
    if(page === 1){
        isLoading = true,
        isLoadMore = false
    }else{
        isLoading = false,
        isLoadMore =true
    }
    return {
        type:Common.RADIO.INFO,
        isLoading:isLoading,
        isLoadMore:isLoadMore
    }
}
export  default {getRadio}