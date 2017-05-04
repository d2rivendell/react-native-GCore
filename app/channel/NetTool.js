/**
 * Created by leon on 2017/4/13.
 */
//'auth_exclusive=dpkynzs2q0wm9o5gi1r83fcabthl4eu&auth_key=2451713064@qq.com&password=fander911&sourceType=app'

const NetTool = {

    POST(url, params, callback){
        console.log(url)
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
    }
}
export default NetTool