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
const getHomePage = (page=1)=>{
    return(dispatch,store) => {
        dispatch(fetchingHomePage(page))
        const  channel = new Channel()
        return channel.getHomePage(page)
            .then(data =>{
                return dispatch({
                    type:Common.HOME.INFO,
                    data:data,
                    page:page,
                    isLoading:false,
                    isLoadMore:false
                })
            })
    }
}

const fetchingHomePage = (page)=>{
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
                    type:Common.HOME.INFO,
                    isLoading:isLoading,
                    isLoadMore:isLoadMore
          }
}

export  default {
    getBanner,
    getHomePage,
    fetchingHomePage
}

