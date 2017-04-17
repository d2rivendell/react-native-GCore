/**
 * Created by leon on 2017/4/17.
 */
import createReducer from '../utils/create-reducer'
import  Commom from '../common/constants'
const initialState = {
    data: [],
    detail:[]
}

const actionHandler = {
    [Commom.CATEGORIES.INFO]: (state, action) => {
        return Object.assign({}, state, {
            data: action.data,
        })
    },
    [Commom.CATEGORIES.DETAIL]: (state, action) => {
        return Object.assign({}, state, {
            detail: action.data,
        })
    },
    [Commom.CATEGORIES.SUB]: (state, action) => {
        return Object.assign({}, state, {
            sub: action.data,
        })
    },
    [Commom.CATEGORIES.CLEAR]: (state, action) => {
        return Object.assign({}, state, {
            sub: null,
        })
    }
}


export default createReducer(initialState, actionHandler)
