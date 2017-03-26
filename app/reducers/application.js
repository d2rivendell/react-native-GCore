'use strict'
import  createReducer from '../utils/create-reducer'
import  Commom from  '../common/constants'
const  initialState = {
    tab:'home',
}

const  actionHandle = {
    [Commom.APP.TAB]:(state,action) => {
        tab:action.data
    },
    [Commom.APP.NAVIGATION]: (state, action) => {
        return Object.assign({}, state, {
            navigator: action.data
        })
    }
}

export default createReducer(initialState,actionHandle)