'use strict'
import Channel from '../channel'
const  getNews = (page = 1) => {
    return(dispatch,store) => {
        const  channel = new Channel()
        return channel.getNews(page)
            .then(data =>{
                return dispatch({
                    type:Common.NEWS.INFO,
                    data:data
                })
            })
    }
}
export  default {getNews}
