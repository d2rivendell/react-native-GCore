'use strict'
import Channel from '../channel'
const  getComment = (type = 'hot',page = 1,id) => {

    var requestType = ''
    if(type === 'hot'){
        requestType = Common.COMMENT.HOT
    }else{
        requestType = Common.COMMENT.TIME
    }
    return(dispatch,store) => {
        dispatch(fetchingComment(page,requestType))
        const  channel = new Channel()
        return channel.getComment(type,page,id)
            .then(data =>{
                console.log('dispatch' + requestType)
                return dispatch({
                    type:requestType,
                    data:data,
                    isLoading:false,
                    isLoadMore:false,
                    page:page
                })
            })
    }
}
const fetchingComment = (page,requestType)=>{
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
        type:requestType,
        isLoading:isLoading,
        isLoadMore:isLoadMore
    }
}
export  default {getComment}
