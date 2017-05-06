'use strict'
import {
    DeviceEventEmitter
}from 'react-native'
import Storage from 'react-native-storage';
let instance = null;
import MyStorage from '../channel/MyStorage'
import  RNFS from 'react-native-fs'

let starage = new MyStorage()
export default class DownloadManager {

    constructor() {
        if (!instance) {
            instance = this
            this.isDownloading = false
        }
        return instance
    }
    downloadFile(fromUrl,toFile,timeLine,pageInfo){
        this.isDownloading = true
        this.fromUrl = fromUrl
        RNFS.downloadFile({ fromUrl: fromUrl, toFile: toFile ,background:true,
            progress:(res)=>{
                var progress = (res.bytesWritten/res.contentLength)
                if(progress === 1){
                    starage.saveAudioInfo(timeLine,{...pageInfo,contentLength:res.contentLength});
                    this.isDownloading = false
                }
                DeviceEventEmitter.emit('download', {contentLength:res.contentLength,bytesWritten:res.bytesWritten,progress:progress,...pageInfo});
            }
        })
    }

}

