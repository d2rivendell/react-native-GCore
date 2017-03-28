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
        const  channel = new Channel()
        return channel.getComment(type,page,id)
            .then(data =>{
                return dispatch({
                    type:requestType,
                    data:data
                })
            })
    }
}

export  default {getComment}
