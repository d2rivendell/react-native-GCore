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
import { ReactNativeAudioStreaming } from 'react-native-audio-streaming';
export  default  class AudioPlayer extends  Component {
  // 构造
    constructor(props) {
      super(props);
      // 初始状态
      this.play = true
      this.over = false
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
                     })
                 }
                },
             1000)
        }

    }

    componentWillReceiveProps(props) {
        const {timeLineInfo,play} = props
        if(timeLineInfo){
            if(this.over){
                return
            }
            this.over = true
            if(play.id !== timeLineInfo.id){
                ReactNativeAudioStreaming.play(timeLineInfo.media.mp3[0], {showIniOSMediaCenter: true, showInAndroidNotifications: true});
            }

        }

    }
    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

    _play(){
        const {timeLineInfo} = this.props
        console.log(timeLineInfo)
     if(timeLineInfo){
         console.log('will play')
         this.play = !this.play
         if(this.play){
             console.log('play')
             ReactNativeAudioStreaming.play(timeLineInfo.media.mp3[0], {showIniOSMediaCenter: true, showInAndroidNotifications: true});
         }else{
             console.log('stop')
             ReactNativeAudioStreaming.pause();
         }
     }
    }

    _list(){
        const {onList} = this.props
        if(onList){
            onList()
        }
    }
    _onValueChange(v){
        const {timeLineInfo} = this.props
        let value = timeLineInfo.duration * (v/100)
        ReactNativeAudioStreaming.seekToTime(value)
    }
  render(){
      const {timeLineInfo} = this.props
      // console.log(timeLineInfo)
      var icon = this.play ? require('../../../resource/icon-pause~iphone.png'):require('../../../resource/icon-play~iphone.png')
      return(
          <View style={styles.container}>
              { timeLineInfo && <View style={styles.contentView}>
                  <Image style={styles.cover} source={{uri:timeLineInfo.thumb_url}}/>
                  <View style={styles.textView}>
                      <Text numberOfLines={1} style={styles.title}>{timeLineInfo.title}</Text>
                      <Text numberOfLines={1} style={styles.desc}>{timeLineInfo.desc}</Text>
                  </View>
                  <View style={styles.toolView}>
                      <TouchableHighlight
                          underlayColor='transparent'
                          onPress={this._play.bind(this)}
                      >
                          <Image resizeMode='contain' style={styles.icon}
                                 source={icon}/>
                      </TouchableHighlight>
                      <TouchableHighlight
                          underlayColor='transparent'
                          onPress={this._list.bind(this)}
                      >
                          <Image resizeMode='contain' style={styles.icon}
                                 source={require('../../../resource/icon-list~iphone.png')}/>
                      </TouchableHighlight>
                      <Image resizeMode='contain' style={styles.icon}
                             source={require('../../../resource/icon-share~iphone.png')}/>
                  </View>
              </View>
              }
              < Slider
              style={styles.slider}
              maximumValue={this.props.maxVallue}
              disabled={false}
              value={this.props.value}
              thumbImage={require('../../../resource/player-slider-handle~iphone.png')}
              onValueChange = {this._onValueChange.bind(this)}
              />

          </View>
      )
  }
}
const  styles = StyleSheet.create({
    container: {
        // flex: 1,
        height:60,
        backgroundColor:'white',
        width:Common.WINDOW.width,
        padding:10
    },
    slider:{
        height:16,
        position:'absolute',
        top:-8,
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
        width:15,
    },
    textView:{
        flex:5,
        justifyContent: 'center',
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
        paddingRight:10
    }
})