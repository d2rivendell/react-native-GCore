/**
 * Created by Leon.Hwa on 17/4/1.
 */
import createReducer from '../utils/create-reducer'
import  Commom from '../common/constants'
const initialState = {
    data: []
}

const actionHandler = {
    [Commom.TIMELINE.INFO]: (state, action) => {
        return Object.assign({}, state, {
            data: action.data
        })
    },
    [Commom.TIMELINE.CATEGORY]: (state, action) => {
        return Object.assign({}, state, {
            list_data: action.data
        })
    }
}

export default createReducer(initialState, actionHandler)