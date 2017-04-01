'use strict'
import Channel from '../channel'
import  Commom from '../common/constants'
const  getTimeLine = (id) => {
    return(dispatch,store) => {
        const  channel = new Channel()
        return channel.getTimeLine(id)
            .then(data =>{
                return dispatch({
                    type:Commom.TIMELINE.INFO,
                    data:data
                })
            })
    }
}
const  getTimeLineCategories = (page = 1) => {
    return(dispatch,store) => {
        const  channel = new Channel()
        return channel.getTimeLineCategories(page)
            .then(data =>{
                return dispatch({
                    type:Commom.TIMELINE.CATEGORY,
                    data:data
                })
            })
    }
}

export  default {getTimeLine,getTimeLineCategories}
