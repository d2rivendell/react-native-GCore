/**
 * Created by Leon.Hwa on 17/3/22.
 */
import createReducer from '../utils/create-reducer'
import  Common from '../common/constants'
const initialState = {
    data: []
}

const actionHandler = {
    [Common.HOME.BANNAR]: (state, action) => {
        return Object.assign({}, state, {
            data: action.data
        })
    },
}

export default createReducer(initialState, actionHandler)
