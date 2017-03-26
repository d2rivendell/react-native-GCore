'use strict'
import Channel from '../channel'
import Common from '../common/constants'
const  getAirticlePage = (page = 1) => {
    return(dispatch,store) => {
        const  channel = new Channel()
        return channel.getArticlePage(page)
            .then(data =>{
                return dispatch({
                    type:Common.ARTICLE.INFO,
                    data:data
                })
            })
    }
}
export  default {getAirticlePage}