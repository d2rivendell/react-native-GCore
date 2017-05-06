/**
 * Created by leon on 2017/5/6.
 */
const  downloadBegin = (pageInfo) => {

    return(dispatch,store) => {
                return dispatch({
                    type:Common.DOWNLOAD.BEGIN,
                    data:pageInfo,
                })
    }
}
const  downloadEnd = () => {

    return(dispatch,store) => {
        return dispatch({
            type:Common.DOWNLOAD.END,
            data:null,
        })
    }
}
export  default {downloadBegin,downloadEnd}
