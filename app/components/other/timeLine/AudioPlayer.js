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
    Platform,
    Alert
}from 'react-native'
import Common from '../../../common/constants'
import  RNFS from 'react-native-fs'
import TrackPlayer from 'react-native-track-player'
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
        this.timer = setInterval(this.timeFunc.bind(this),1000)
        // TrackPlayer.eventEmitter.addListener('remote-stop', this.pause.bind(this));
        // TrackPlayer.eventEmitter.addListener('remote-play', this.playAudio.bind(this));
        // TrackPlayer.eventEmitter.addListener('remote-seek', this.seekTo.bind(this));

    }
    seekTo(data){
        TrackPlayer.seekTo(data.position);
    }
    async timeFunc() {
        const {getProgress} = this.props
        if(getProgress ) {
            let state =  await  TrackPlayer.getState()
            let position = await TrackPlayer.getPosition()
            let duration = await TrackPlayer.getDuration();
            getProgress(state,position,duration)
            if(this.props.pageInfo){
                this.setState({
                    value:(position/this.props.pageInfo.duration) * 100
                })
            }
        }
    }


    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

    initializeUrl(){
        const {pageInfo,play} = this.props
        if(pageInfo){
            if(!play.isPlay && pageInfo.media.mp3[0]) {
                var videoUrl = pageInfo.media.mp3[0]
                if(pageInfo.localFile){
                    if(Platform.OS === 'android'){
                        videoUrl = RNFS.ExternalDirectoryPath + '/' + pageInfo.id + '.mp3'
                    }else {
                        videoUrl = RNFS.LibraryDirectoryPath + '/' + pageInfo.id + '.mp3'
                    }
                    console.log('播放本地音乐')
                }
                TrackPlayer.add({
                    id: 'trackId',
                    url:videoUrl,
                    title: pageInfo.title,
                    artist: pageInfo.desc,
                    artwork:pageInfo.thumb_url
                });
            }
        }

    }
    playAction(){
        const {play} = this.props
        if(play.isPlay){
            this.pause()
        }else {
            this.playAudio()
        }
    }
    playAudio(){
        const {actions} = this.props
        TrackPlayer.play()
        actions.play(true)
    }

    pause(){
        const {actions} = this.props
        TrackPlayer.pause()
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
        TrackPlayer.seekTo(progress);
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
                            onPress={this.playAction.bind(this)}
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