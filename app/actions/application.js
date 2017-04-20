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

const signin = (account) => {
    return dispatch => {
        return Promise.resolve(dispatch({
            type: Constant.APP.SIGNIN,
            user: account,
        }))
    }
}

const signout = (targetComponent) => {
    return dispatch => {
        return Promise.resolve(dispatch({
            type: Constant.APP.SIGNOUT,
            user: null,
        }))
    }
}
export  default {changeTab,toNavigation,signin,signout}