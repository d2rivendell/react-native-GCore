/**
 * Created by Leon.Hwa on 17/3/22.
 */
import createReducer from '../utils/create-reducer'
import  Commom from '../common/constants'
const initialState = {
    data: [],
    isLoading:false,
    isLoadMore:false,
}

const actionHandler = {
    [Commom.ARTICLE.INFO]: (state, action) => {

        //加载状态
        if(action.isLoading || action.isLoadMore){
            return Object.assign({}, state, {
                isLoading:action.isLoading,
                isLoadMore:action.isLoadMore
            })
        }

        //加载完成状态
        let airticle = null;
        if(action.page !== 1){
            airticle = state.data.concat(action.data)
        }else {
            airticle = action.data
        }
        return Object.assign({}, state, {
            data: airticle,
            isLoading:false,
            isLoadMore:false
        })

    },

    [Commom.ARTICLE.DETAIL]: (state, action) => {
        return Object.assign({}, state, {
            data: action.data
        })
    }
}

export default createReducer(initialState, actionHandler)