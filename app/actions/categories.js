/**
 * Created by leon on 2017/4/17.
 */
import Channel from '../channel'
import Common from '../common/constants'
const  getCategories = () => {
    return(dispatch,store) => {
        const  channel = new Channel()
        return channel.getCategories()
            .then(data =>{
                return dispatch({
                    type:Common.CATEGORIES.INFO,
                    data:data
                })
            })
    }
}
const  getCategorieSubscriptInfo = (id) => {
    return(dispatch,store) => {
        const  channel = new Channel()
        return channel.getCategorieSubscriptInfo(id)
            .then(data =>{
                return dispatch({
                    type:Common.CATEGORIES.SUB,
                    data:data
                })
            })
    }
}

const  getCategorieDetail= (id,page=1) => {
    return(dispatch,store) => {
        const  channel = new Channel()
        return channel.getCategorieDetail(id,page)
            .then(data =>{
                return dispatch({
                    type:Common.CATEGORIES.DETAIL,
                    data:data
                })
            })
    }
}
const clearSubscriptInfo = ()=>{
    return dispatch({
        type:Common.CATEGORIES.CLEAR
    })
}

export  default {getCategories,getCategorieDetail,getCategorieSubscriptInfo,clearSubscriptInfo}