import createReducer from '../utils/create-reducer'
import  Commom from '../common/constants'
const initialState = {
    data: [],
    isLoading:false,
    isLoadMore:false,
}

const actionHandler = {
    [Commom.NEWS.INFO]: (state, action) => {
        //加载状态
        if(action.isLoading || action.isLoadMore){
            return Object.assign({}, state, {
                isLoading:action.isLoading,
                isLoadMore:action.isLoadMore
            })
        }

        //加载完成状态
        let news = null;
        if(action.page !== 1){
            news = state.data.concat(action.data)
        }else {
            news = action.data
        }
        return Object.assign({}, state, {
            data: news,
            isLoading:false,
            isLoadMore:false
        })
    },

    [Commom.NEWS.DETAIL]: (state, action) => {
        return Object.assign({}, state, {
            data: action.data
        })
    }
}

export default createReducer(initialState, actionHandler)
