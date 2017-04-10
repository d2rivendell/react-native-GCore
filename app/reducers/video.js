/**
 * Created by Leon.Hwa on 17/4/10.
 */

import createReducer from '../utils/create-reducer'
import  Commom from '../common/constants'
const initialState = {
    data: []
}

const actionHandler = {
    [Commom.VIDEO.INFO]: (state, action) => {
        console.log(action)
        return Object.assign({}, state, {
            data: action.data
        })
    }
}

export default createReducer(initialState, actionHandler)
