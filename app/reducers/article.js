/**
 * Created by Leon.Hwa on 17/3/22.
 */
import createReducer from '../utils/create-reducer'
import  Commom from '../common/constants'
const initialState = {
    data: []
}

const actionHandler = {
    [Commom.ARTICLE.INFO]: (state, action) => {
        return Object.assign({}, state, {
            data: action.data
        })
    },

    [Commom.ARTICLE.DETAIL]: (state, action) => {
        return Object.assign({}, state, {
            data: action.data
        })
    }
}

export default createReducer(initialState, actionHandler)