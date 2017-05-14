/**
 * Created by Leon.Hwa on 17/4/1.
 */
import  React,{Component} from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableHighlight,
    Slider,
    Platform
}from 'react-native'
import Common from '../../../common/constants'
import  RNFS from 'react-native-fs'
import { ReactNativeAudioStreaming } from 'react-native-audio-streaming';
import RNAudioStreamer from 'react-native-audio-streamer'
export  default  class AudioPlayer extends  Component {
   // 构造
     constructor(props) {
       super(props);
       // 初始状态
       this.state = {
           value:0
       };
     }

    mixins: [TimerMixin]
    componentDidMount() {
        const {getProgress} = this.props
        if(getProgress){
         this.timer = setInterval(
             ()=>{
                 if(Platform.OS === 'ios'){
                     ReactNativeAudioStreaming.getStatus((nu,dict)=>{
                         getProgress(dict.status,dict.progress,dict.duration)
                         if(dict.progress !== null && this.props.pageInfo){
                             this.setState({
                                 value:(dict.progress/this.props.pageInfo.duration) * 100
                             })
                         }
                     })
                 }else{
                     RNAudioStreamer.currentTime((err, currentTime)=>{
                         if(!err && this.props.pageInfo){
                             RNAudioStreamer.status((err, status)=>{
                                 if(!err){
                                     getProgress(status,currentTime,0)
                                     this.setState({
                                         value:(currentTime/this.props.pageInfo.duration) * 100
                                     })
                                 }
                             })
                         }
                     })
                 }
                },
             1000)
        }


    }



    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }


    playAudio(){
        const {pageInfo,play} = this.props
        console.log(pageInfo)
     if(pageInfo){
         if(!play.isPlay && pageInfo.media.mp3[0]){
             if(pageInfo.localFile){
                 var localPath = RNFS.LibraryDirectoryPath + '/' + pageInfo.id + '.mp3'
                 if(Platform.OS === 'android'){
                     localPath = RNFS.ExternalDirectoryPath + '/' + pageInfo.id + '.mp3'
                 }
                 this.play(localPath)
                 console.log('播放本地音乐')
             }else{
                 this.play(pageInfo.media.mp3[0])
             }
         }else{
            this.pause()
         }
     }
    }
    play(url){
        const {actions} = this.props
        if(Platform.OS == 'ios'){
            ReactNativeAudioStreaming.play(url, {showIniOSMediaCenter: true, showInAndroidNotifications: true});
        }else{
            RNAudioStreamer.play()
        }

        actions.play(true)
    }

    setAndroidUrl(){
        RNAudioStreamer.setUrl(this.props.pageInfo.media.mp3[0])
    }
    pause(){
        const {actions} = this.props
        if(Platform.OS === 'ios') {
            ReactNativeAudioStreaming.pause()
        }else {
            RNAudioStreamer.pause()
        }
        actions.play(false)
    }

    _list(){
        const {onList} = this.props
        if(onList){
            onList()
        }
    }
    _onValueChange(v){
        const {pageInfo} = this.props
        let value = pageInfo.duration * (v/100)
        this.seekToTime(value)
    }
    seekToTime(progress){
       if(Platform.OS === 'ios'){
           ReactNativeAudioStreaming.seekToTime(progress)
       }else {
           RNAudioStreamer.seekToTime(progress)
       }
    }
    _download(){
        const {download} = this.props
        if(download){
            download()
        }
    }
    render(){
      const {pageInfo,play} = this.props
      var icon = play.isPlay ? require('../../../resource/icon-pause~iphone.png'):require('../../../resource/icon-play~iphone.png')
        var downloadIcon
       if(pageInfo && pageInfo.localFile){
           downloadIcon =  require('../../../resource/icon-downloaded~iphone.png')
       }else {
           downloadIcon = require('../../../resource/icon-download~iphone.png')
       }

      return(
          <View style={styles.container}>
              {Platform.OS === 'android' &&
              < Slider
                  style={styles.androidSlider}
                  maximumValue={this.props.maxVallue}
                  disabled={false}
                  value={this.state.value}
                  thumbImage={require('../../../resource/player-slider-handle~iphone.png')}
                  onValueChange = {this._onValueChange.bind(this)}
              />
              }
              { pageInfo && <View style={styles.contentView}>
                  <Image style={styles.cover} source={{uri:pageInfo.thumb_url}}/>
                  <View style={styles.textView}>
                      <Text numberOfLines={1} style={styles.title}>{pageInfo.title}</Text>
                      <Text numberOfLines={1} style={styles.desc}>{pageInfo.desc}</Text>
                  </View>
                  <View style={styles.toolView}>
                      <TouchableHighlight
                          underlayColor='transparent'
                          onPress={this.playAudio.bind(this)}
                          style={styles.toolItem}
                      >
                          <Image resizeMode='contain' style={styles.icon}
                                 source={icon}/>
                      </TouchableHighlight>

                      <TouchableHighlight
                          underlayColor='transparent'
                          onPress={this._list.bind(this)}
                          style={styles.toolItem}
                      >

                          <Image resizeMode='contain' style={styles.icon}
                                 source={require('../../../resource/icon-list~iphone.png')}/>
                      </TouchableHighlight>
                      <TouchableHighlight
                          underlayColor='transparent'
                          onPress={this._download.bind(this)}
                          style={styles.toolItem}
                      >
                      <Image resizeMode='contain' style={styles.icon}
                             source={downloadIcon}/>
                      </TouchableHighlight>
                  </View>
              </View>
              }
              {Platform.OS === 'ios' &&
              < Slider
              style={styles.iosSlider}
              maximumValue={this.props.maxVallue}
              disabled={false}
              value={this.state.value}
              thumbImage={require('../../../resource/player-slider-handle~iphone.png')}
              onValueChange = {this._onValueChange.bind(this)}
              />
            }
          </View>
      )
  }
}
const  styles = StyleSheet.create({
    container: {
        // flex: 1,
        height:Platform.OS === 'android'? 68:60,
        backgroundColor:'white',
        width:Common.WINDOW.width,
        overflow:'visible'

    },
    iosSlider:{
        height:16,
        position:'absolute',
        top:-8,
        width:Common.WINDOW.width
    },
    androidSlider:{
        height:16,
        width:Common.WINDOW.width
    },
    contentView:{
        flexDirection:'row',
        backgroundColor:'white',
        width:Common.WINDOW.width,
        flex:1,
        alignItems:'center'
    },
    cover:{
        width:40,
        height:40,
        marginLeft:10
    },
    icon:{
        width:18,
        height:18,
    },
    textView:{
        flex:5,
        justifyContent: 'space-around',
        alignItems:'center',
        paddingLeft:10
},
    title:{
        color:'#999999',
        fontSize:13
    },
    desc:{
        color:'#999999',
        fontSize:10
    },
    toolView:{
        flex:3,
        paddingLeft:10,
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        paddingRight:10,
    },
    toolItem:{
        height:50,
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    }
})