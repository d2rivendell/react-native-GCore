'use strict'
import Channel from '../channel'
const  getNews = (page = 1) => {
    return(dispatch,store) => {
        dispatch(fetchingNews(page))
        const  channel = new Channel()
        return channel.getNews(page)
            .then(data =>{
                return dispatch({
                    type:Common.NEWS.INFO,
                    data:data,
                    page:page,
                    isLoading:false,
                    isLoadMore:false
                })
            })
    }
}
const fetchingNews = (page)=>{
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
        type:Common.NEWS.INFO,
        isLoading:isLoading,
        isLoadMore:isLoadMore
    }
}
export  default {getNews}
