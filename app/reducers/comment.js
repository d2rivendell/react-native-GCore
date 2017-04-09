/**
 * Created by Leon.Hwa on 17/3/28.
 */
import createReducer from '../utils/create-reducer'
import  Commom from '../common/constants'
const initialState = {
    ctype:Commom.COMMENT.HOT,
    data: []
}

const actionHandler = {
    [Commom.COMMENT.HOT]: (state, action) => {
        return Object.assign({}, state, {
            type:Commom.COMMENT.HOT,
            data: action.data
        })
    },

    [Commom.COMMENT.TIME]: (state, action) => {
        return Object.assign({}, state, {
            type:Commom.COMMENT.TIME,
            data: action.data
        })
    }
}

export default createReducer(initialState, actionHandler)