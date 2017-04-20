/**
 * Created by Leon.Hwa on 17/4/18.
 */
import createReducer from '../utils/create-reducer'
import  Commom from '../common/constants'
const initialState = {
    data: [],
    count:0
}

const actionHandler = {
    [Commom.SUBSCRIPT.INFO]: (state, action) => {
        return Object.assign({}, state, {
            data: action.data.originals,
            count:action.data.count,
        })
    }
}

export default createReducer(initialState, actionHandler)