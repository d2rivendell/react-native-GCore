'use strict'
import  Constant from '../common/constants'
const  changeTab = (tab) => {
    return (dispatch) => {
       return Promise.resolve(
           dispatch({
               type:Constant.APP.TAB,
               tab:tab
           }))
    }
}
const toNavigation = (targetComponent) => {
    return dispatch => {
        return Promise.resolve(dispatch({
            type: Constant.APP.NAVIGATION,
            data: targetComponent
        }))
    }
}
export  default {changeTab,toNavigation}