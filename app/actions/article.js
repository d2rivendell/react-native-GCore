'use strict'
import Channel from '../channel'
import Common from '../common/constants'
const  getAirticlePage = (page = 1) => {
    return(dispatch,store) => {
        dispatch(fetchingAirticle(page))
        const  channel = new Channel()
        return channel.getArticlePage(page)
            .then(data =>{
                return dispatch({
                    type:Common.ARTICLE.INFO,
                    data:data,
                    page:page,
                    isLoading:false,
                    isLoadMore:false
                })
            })
    }
}

const fetchingAirticle = (page)=>{
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
        type:Common.ARTICLE.INFO,
        isLoading:isLoading,
        isLoadMore:isLoadMore
    }
}
export  default {getAirticlePage}