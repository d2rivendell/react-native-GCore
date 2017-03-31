import createReducer from '../utils/create-reducer'
import  Commom from '../common/constants'
const initialState = {
    data: []
}

const actionHandler = {
    [Commom.PAGEINFO.INFO]: (state, action) => {
        console.log(Commom.PAGEINFO.INFO +'收到' + action.data)
        console.log(action.data)
        return Object.assign({}, state, {
            data: action.data
        })
    }
}

export default createReducer(initialState, actionHandler)
