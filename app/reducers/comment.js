/**
 * Created by Leon.Hwa on 17/3/28.
 */
import createReducer from '../utils/create-reducer'
import  Commom from '../common/constants'
const initialState = {
    ctype:Commom.COMMENT.HOT,
    data: [],
    isLoading:false,
    isLoadMore:false,
}

const actionHandler = {
    [Commom.COMMENT.HOT]: (state, action) => {
        //加载状态
        if(action.isLoading || action.isLoadMore){
            return Object.assign({}, state, {
                isLoading:action.isLoading,
                isLoadMore:action.isLoadMore,

            })
        }

        //加载完成状态
        let comment = null;
        if(action.page !== 1){
            comment = state.data.concat(action.data)
        }else {
            comment = action.data
        }
        return Object.assign({}, state, {
            type:Commom.COMMENT.HOT,
            data: comment,
            isLoading:false,
            isLoadMore:false
        })

    },

    [Commom.COMMENT.TIME]: (state, action) => {
        //加载状态
        if(action.isLoading || action.isLoadMore){
            return Object.assign({}, state, {
                isLoading:action.isLoading,
                isLoadMore:action.isLoadMore
            })
        }

        //加载完成状态
        let comment = null;
        if(action.page !== 1){
            comment = state.data.concat(action.data)
        }else {
            comment = action.data
        }
        return Object.assign({}, state, {
            type:Commom.COMMENT.TIME,
            data: comment,
            isLoading:false,
            isLoadMore:false
        })
    }
}

export default createReducer(initialState, actionHandler)