/**
 * Created by Leon.Hwa on 17/4/10.
 */

import createReducer from '../utils/create-reducer'
import  Commom from '../common/constants'
const initialState = {
    data: [],
    isLoading:false,
    isLoadMore:false,
}

const actionHandler = {
    [Commom.VIDEO.INFO]: (state, action) => {
        //加载状态
        if(action.isLoading || action.isLoadMore){
            return Object.assign({}, state, {
                isLoading:action.isLoading,
                isLoadMore:action.isLoadMore
            })
        }
        //加载完成状态
        let video = null;
        if(action.page !== 1){
            video = state.data.concat(action.data)
        }else {
            video = action.data
        }
        return Object.assign({}, state, {
            data: video,
            isLoading:false,
            isLoadMore:false
        })
    }
}

export default createReducer(initialState, actionHandler)
