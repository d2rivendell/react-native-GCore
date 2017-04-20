/**
 * Created by Leon.Hwa on 17/4/18.
 */

import Channel from '../channel'
import  Commom from '../common/constants'
const  getMyMark= (page) => {
    return(dispatch,store) => {
        const  channel = new Channel()
        return channel.getMyMark(page)
            .then(data =>{
                console.log(data)
                return dispatch({
                    type:Commom.MYMARK.INFO,
                    data:data
                })
            })
    }
}


export  default {getMyMark}