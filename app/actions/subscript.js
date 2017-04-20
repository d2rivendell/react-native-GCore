'use strict'
import Channel from '../channel'
import  Commom from '../common/constants'
const  getSubscript= (page) => {
    return(dispatch,store) => {
        const  channel = new Channel()
        return channel.getSubscript(page)
            .then(data =>{
                console.log(data)
                return dispatch({
                    type:Commom.SUBSCRIPT.INFO,
                    data:data
                })
            })
    }
}


export  default {getSubscript}