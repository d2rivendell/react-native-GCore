/**
 * Created by leon on 2017/5/6.
 */
import  createReducer from '../utils/create-reducer'
import  Commom from  '../common/constants'
const  initialState = {
   data:null,
   type:'undownloding'
}
const  actionHandle = {

    [Commom.DOWNLOAD.BEGIN]:(state,action) => {
        console.log(action)
        return Object.assign({}, state, {
            data:action.data,
        })
    },
    [Commom.DOWNLOAD.END]:(state,action) => {
        return Object.assign({}, state, {
            data:action.data
        })
    }
}

export default createReducer(initialState,actionHandle)