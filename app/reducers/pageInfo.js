import createReducer from '../utils/create-reducer'
import  Commom from '../common/constants'
const initialState = {
    data: []
}

const actionHandler = {
    [Commom.PAGEINFO.INFO]: (state, action) => {
        return Object.assign({}, state, {
            data: action.data,
            type:action.type
        })
    }
}

export default createReducer(initialState, actionHandler)
