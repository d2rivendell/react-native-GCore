/**
 * Created by Leon.Hwa on 17/3/22.
 */
import createReducer from '../utils/create-reducer'
import  Commom from '../common/constants'
const initialState = {
    data: [],
    isLoading:false,
    isLoadMore:false
}

const actionHandler = {
    [Commom.HOME.INFO]: (state, action) => {

        //加载状态
        if(action.isLoading || action.isLoadMore){
            console.log('return  状态')
            return Object.assign({}, state, {
                isLoading:action.isLoading,
                isLoadMore:action.isLoadMore
            })
        }

        //加载完成状态
        let home = null;
        if(action.page !== 1){
            home = state.data.concat(action.data)
        }else {
            home = action.data
        }
        return Object.assign({}, state, {
            data: home,
            isLoading:false,
            isLoadMore:false
        })
    },

    [Commom.HOME.DETAIL]: (state, action) => {
        return Object.assign({}, state, {
            data: action.data
        })
    }
}

export default createReducer(initialState, actionHandler)