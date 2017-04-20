/**
 * Created by Leon.Hwa on 17/4/10.
 */
import createReducer from '../utils/create-reducer'
import  Commom from '../common/constants'
const initialState = {
    data: [],
    isLoading:false,
    isLoadMore:false
}

const actionHandler = {
    [Commom.RADIO.INFO]: (state, action) => {
        //加载状态
        if(action.isLoading || action.isLoadMore){
            console.log('return  状态')
            return Object.assign({}, state, {
                isLoading:action.isLoading,
                isLoadMore:action.isLoadMore
            })
        }

        //加载完成状态
        let radio = null;
        if(action.page !== 1){
            radio = state.data.concat(action.data)
        }else {
            radio = action.data
        }
        return Object.assign({}, state, {
            data: radio,
            isLoading:false,
            isLoadMore:false
        })
    }
}

export default createReducer(initialState, actionHandler)
