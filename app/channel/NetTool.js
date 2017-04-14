/**
 * Created by leon on 2017/4/13.
 */
//'auth_exclusive=dpkynzs2q0wm9o5gi1r83fcabthl4eu&auth_key=2451713064@qq.com&password=fander911&sourceType=app'

const NetTool = {

    POST(url, params, callback){
        console.log(url)
     fetch("http://www.g-cores.com/auth/identity/callback",{
         method:'POST',
         headers: {
             'Content-Type': 'application/json;charset=UTF-8',
         },
         body:params
     })
         .then((response) => (response.json()))
         .then((response) => {
            const result =  response['results']
            account.saveAccount(result);
           callback(response,null)
         })
         .catch((error)=>{
           callback(null,error)
         }).catch(err => {
         console.warn(err.message);
         callback(null,error)
     })
    }
}
export default NetTool