'use strict'
import {
    AsyncStorage
}from 'react-native'
import Storage from 'react-native-storage';

let instance = null;
let storage =new Storage({
    size: 1000,
    storageBackend: AsyncStorage,
    defaultExpires: null,
    enableCache: true
})
export default class MyStorage {

    constructor() {
        if(!instance){
            instance = this
        }
        return instance
    }

    loadAccount(callback){
        storage.load({
            key: 'account',
            id:0,
            // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的sync方法
            autoSync: true,

            // syncInBackground(默认为true)意味着如果数据过期，
            // 在调用sync方法的同时先返回已经过期的数据。
            // 设置为false的话，则始终强制返回sync方法提供的最新数据(当然会需要更多等待时间)。
            syncInBackground: true,
        }).then(result=>{
            if(result){
                this.account = result
                console.log(this.account)
            }
            if(callback){
                callback(result,null)
            }
        }).catch(err => {
            if(callback){
                callback(null,err)
            }
        })
    }
    saveAccount(account){
        if(account){
            this.account = account
        }
        storage.save({
            key:'account',
            id:0,
            rawData:account,
            expires:null
        })
    }
    signout(){
        storage.remove({
            key: 'account'
        });
    }

    saveAudioInfo(timeLine,pageInfo){
                console.log('开始保存')
                storage.save({
                    key:'AudioInfo',
                    id:pageInfo.id,
                    rawData:{
                        timeLine:timeLine,
                        pageInfo:pageInfo
                    },
                    expires: null
                })
    }
    getAudioInfo(id,callback){
        storage.load({
            key: 'AudioInfo',
            id:id,
            autoSync: true,
            syncInBackground: true
        }).then(result=>{
            if(callback){
                callback(result,null)
            }
        }).catch(err => {
            if(callback){
                callback(null,err)
            }
        })
    }
    removeAudioInfo(id){
        storage.remove({
            key: 'AudioInfo',
            id:id
        });
    }
    getAllDataForKey(key,callback){
        // 获取某个key下的所有数据
        storage.getAllDataForKey(key).then(res => {
            if(callback){
                callback(res)
            }
        });
    }

}


