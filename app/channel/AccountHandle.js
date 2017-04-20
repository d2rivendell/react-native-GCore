/**
 * Created by Leon.Hwa on 17/4/14.
 */
const  AccountHandle = {

    loadAccount(callback){
        storage.load({
            key: 'account',

            // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的sync方法
            autoSync: true,

            // syncInBackground(默认为true)意味着如果数据过期，
            // 在调用sync方法的同时先返回已经过期的数据。
            // 设置为false的话，则始终强制返回sync方法提供的最新数据(当然会需要更多等待时间)。
            syncInBackground: true,
        }).then(result=>{
            if(result){
                this.user = result
            }
            if(callback){
                callback(result,null)
            }
        }).catch(err => {
            if(callback){
                callback(null,err)
            }
        })
    },
    saveAccount(account){
       if(account){
           this.user = account
       }
        storage.save({
            key:'account',
            rawData:account,
            expires:null
        })
    },
    signout(){
        storage.remove({
            key: 'account'
        });
    }
}

export  default AccountHandle