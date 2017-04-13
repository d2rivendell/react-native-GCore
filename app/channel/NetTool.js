/**
 * Created by leon on 2017/4/13.
 */
//'auth_exclusive=dpkynzs2q0wm9o5gi1r83fcabthl4eu&auth_key=2451713064@qq.com&password=fander911&sourceType=app'

const NetTool = {

    toQueryString(obj) {
        return obj ? Object.keys(obj).sort().map(function (key) {
            var val = obj[key];
            if (Array.isArray(val)) {
                return val.sort().map(function (val2) {
                    return encodeURIComponent(key) + '=' + encodeURIComponent(val2);
                }).join('&');
            }

            return encodeURIComponent(key) + '=' + encodeURIComponent(val);
        }).join('&') : '';
    },
    POST(url, params, callback){
        console.log(url)
     fetch("http://www.g-cores.com/auth/identity/callback?auth_exclusive=dpkynzs2q0wm9o5gi1r83fcabthl4eu&auth_key=2451713064@qq.com&password=fander911&sourceType=app",{
         method:'POST',
         headers: {
             'Content-Type': 'application/json;charset=UTF-8',
         },

     })
         .then((response) => (response.json()))
         .then((response) => {
           callback(response,null)
         })
         .catch((error)=>{
           callback(null,error)
         })
    }
}
export default NetTool