/**
 * Created by leon on 2017/4/13.
 */
//'auth_exclusive=dpkynzs2q0wm9o5gi1r83fcabthl4eu&auth_key=2451713064@qq.com&password=fander911&sourceType=app'

const  set_device_token_url = 'http://www.g-cores.com/api/set_device_token'
const  device_token = 'b3be092d57b5710c1a60bd85b876bf502f3849ee6e0c332e659bda63de580c68'
const  defresh_url = 'http://www.g-cores.com/api/users/defresh'
/**
 * auth_exclusive	dpkynzs2q0wm9o5gi1r83fcabthl4eu
 	0VzyZguVbX5nhpeQe6XC8g
 device_token
 	112872
 * */
const NetTool = {

    POST(url, params, callback){
     fetch(url,{
         method:'POST',
         body:params
     })
         .then((response) => (response.json()))
         .then((jsonResponse) => {
           callback(jsonResponse,null)
         })
         .catch((error)=>{
           callback(null,error)
         }).catch(err => {
         console.warn(err.message);
         callback(null,error)
     })
    },

    setDevideToken(auth_token,user_id,callback){
        let fromData =   new FormData
        if(auth_token || user_id){
            fromData.append('auth_token',auth_token)
            fromData.append('user_id',user_id)
        }else {
            fromData.append('user_id',0)
        }
        fromData.append('auth_exclusive','dpkynzs2q0wm9o5gi1r83fcabthl4eu')
        fromData.append('device_token',device_token)
       this.POST(set_device_token_url,fromData,(res,error )=>{
           console.log(res)
           console.log(error)
         if(callback){
             callback(res,error)
         }
     })
    },

    defresh(nickname,auth_token,callback){

        let fromData =   new FormData
        fromData.append('auth_token',auth_token)
        fromData.append('nickname',nickname)
        fromData.append('auth_exclusive','dpkynzs2q0wm9o5gi1r83fcabthl4eu')
        console.log(fromData)
        this.POST(defresh_url,fromData,(res,error )=>{
            console.log(res)
            console.log(error)
            if(callback){
                callback(res,error)
            }
        })
    }
}
export default NetTool