import createReducer from '../utils/create-reducer'
import  Commom from '../common/constants'
const initialState = {
    data: []
}

const actionHandler = {
    [Commom.NEWS.INFO]: (state, action) => {
        return Object.assign({}, state, {
            data: action.data
        })
    },

    [Commom.NEWS.DETAIL]: (state, action) => {
        return Object.assign({}, state, {
            data: action.data
        })
    }
}

export default createReducer(initialState, actionHandler)
