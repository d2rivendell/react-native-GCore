/**
 * Created by leon on 2017/4/8.
 */
import  createReducer from '../utils/create-reducer'
import  Commom from  '../common/constants'
const  initialState = {
    show:false,
    pageInfo:null,
    isPlay:false
}

const  actionHandle = {
    [Commom.PLAY.SHOW]:(state,action) => {
        return Object.assign({}, state, {
        id:action.id,
            pageInfo:action.pageInfo,
            show:true
        })
    },
    [Commom.PLAY.HIDDEN]: (state, action) => {
        return Object.assign({}, state, {
            id:action.id,
            show:false
        })
    },
    [Commom.PLAY.PLAY]: (state, action) => {
        return Object.assign({}, state, {
            isPlay:action.isPlay
        })
    }
}

export default createReducer(initialState,actionHandle)