'use strict'
import  Constant from '../common/constants'
const  show = (id,pageInfo) => {
    return (dispatch) => {
        console.log('显示')
        return Promise.resolve(
            dispatch({
                type:Common.PLAY.SHOW,
                id:id,
                pageInfo:pageInfo,
                show:true
            }))
    }
}
const hidden = (id) => {
    console.log('隐藏')
    return dispatch => {
        return Promise.resolve(dispatch({
            type:Common.PLAY.HIDDEN,
            id: id,
            show:false
        }))
    }
}
export  default {show,hidden}