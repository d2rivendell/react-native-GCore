'use strict'
import Channel from '../channel'
import  Commom from '../common/constants'
const  getPageInfo = (id) => {
    return(dispatch,store) => {
        const  channel = new Channel()
        return channel.getPageInfo(id)
            .then(data =>{
                return dispatch({
                    type:Commom.PAGEINFO.INFO,
                    data:data
                })
            })
    }
}
export  default {getPageInfo}
