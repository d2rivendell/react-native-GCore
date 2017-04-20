'use strict'
import  createReducer from '../utils/create-reducer'
import  Commom from  '../common/constants'
const  initialState = {
    tab:'home',
    user:null
}

const  actionHandle = {
    [Commom.APP.TAB]:(state,action) => {
        tab:action.data
    },
    [Commom.APP.NAVIGATION]: (state, action) => {
        return Object.assign({}, state, {
            navigator: action.data
        })
    },
    [Commom.APP.SIGNIN]: (state, action) => {
        return Object.assign({}, state, {
            user: action.user
        })
    },
    [Commom.APP.SIGNOUT]: (state, action) => {
        return Object.assign({}, state, {
            user: action.user
        })
    }
}

export default createReducer(initialState,actionHandle)