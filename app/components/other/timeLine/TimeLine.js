/**
 * Created by leon on 2017/3/31.
 */
import  React,{Component} from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableHighlight,
    Button,
    ListView,
    Navigator,
    InteractionManager,
    Alert
}from 'react-native'
import {Player}  from  'react-native-audio-streaming'
import TimeLinePanel from './TimeLinePanel'
import AudioPlayer from './AudioPlayer'
import TimeLineList from './TimeLineList'
import ToolNavigationBar from '../../../containers/ToolNavigationBar'
import  Comment from '../../../components/other/Comment'
import address from '../../../channel/address'
import MyStorage from '../../../channel/MyStorage'
import DownloadManager from '../../../channel/DownloadManager'
import  RNFS from 'react-native-fs'
export  default  class TimeLine extends  Component {

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            dataSource:new ListView.DataSource({
                rowHasChanged:(row1,row2) => row1 !== row2
            }),
            progress:0,
            playerState:'',
            value:0,
            mode:'timeLine',
            pageInfo:null
        };
        this.rowPositionY = new Array()
        this.rowSeconds = []
        this.recieveTimeLine = false
      }
    componentDidMount() {
        const {id,actions,play,loaclTimeLine} = this.props
        InteractionManager.runAfterInteractions(() => {
            if(!loaclTimeLine){
                actions.getTimeLine(id)
                console.log('请求数据')
            }
            actions.hidden(id)
        }).done(()=>{
            if(play.isPlay === true ){
                if(play.id !== id){
                    this.audioPlayer.pause()
                    actions.play(false)
                    this.audioPlayer.playAudio()
                }
            }else {
                this.audioPlayer.playAudio()
            }
        })
    }
    componentWillUnmount(){
          const {actions,id} = this.props
         console.log(actions)
          switch (this.state.playerState){
              case '播放出错':
                  actions.hidden(id)
                  break;
              case '播放中':
                  actions.show(id,this.state.pageInfo)
                  break;
              case '暂停':
                  actions.hidden(id)
                  break;
              case '加载中':
                  actions.hidden(id)
                  break;

          }

    }

    componentWillReceiveProps(prop) {
        const {pageInfo,timeLine,localPageInfo} = prop
        //初始化时需要 重新在列表选择后不再需要
      if(localPageInfo && this.state.pageInfo === null){
          this.setState({
              pageInfo:localPageInfo
          })
      }else if (pageInfo && this.state.pageInfo === null) {
            let truePageInfo = (pageInfo.data ? pageInfo.data:pageInfo)
          this.setState({
            pageInfo:truePageInfo
         })
      }
    //请求到数据后 把秒数 保存起来
      if(timeLine.data.length){
            if(!this.recieveTimeLine){
                this.recieveTimeLine = true
                for(var i = 0; i < timeLine.data.length;i++){
                    this.rowSeconds[i] = timeLine.data.at
                }
            }
      }
    }
    /**返回cell 的y坐标 保存起来
     * */
    _shouldScroll(rowID,y){
        // console.log('y:  '+y+ 'rowID: ' + rowID)
        let whatSeconds = this.rowSeconds[rowID]
        this.rowPositionY[whatSeconds] = y
    }
    /**
     * 调整播放进度
     * */
    _changeProgress(data){
        this.audioPlayer.seekToTime(data.at)
        if(this.rowPositionY[data.at]){
            this.listView.scrollTo({x: 0, y: this.rowPositionY[data.at]-32, animated: true})
        }
    }

    _renderRow(data, sectionID, rowID, highlightRow){
        this.rowSeconds[rowID] = data.at
          return (<TimeLinePanel
               shouldScroll = {this._shouldScroll.bind(this,rowID)}
               changeProgress = {this._changeProgress.bind(this,data)}
               timeLineInfo = {data}
          />)
    }


    _getTime(timestamp){
        var hour = Math.floor(timestamp/60)
        var sec = timestamp - (hour * 60)
        hour = (Array(2).join(0)+parseInt(hour)).slice(-2)
        sec = (Array(2).join(0)+parseInt(sec)).slice(-2)
        return  hour + ":" + sec
    }
    _renderSectionHeader(sectionData, sectionID){
        return (
             <View style={styles.sectionHeader}>
              <Text style={styles.sectionStatus}>{this.state.playerState}</Text>
              <View style={{flexDirection:'row'}}>
                  <Text style={styles.sectionTime}>{this._getTime(this.state.progress)}/</Text>
                  <Text style={styles.sectionTime}>{this._getTime(this.state.pageInfo.duration)}</Text>
              </View>
             </View>
        )
     }
    _getProgress(status,progress,duration){
        var ss = ''
        switch (status){
            case 'ERROR':
                ss = '播放出错'
                break;
            case 'PLAYING':
                ss = '播放中'
                break;
            case 'PAUSED':
                ss = '暂停'
                break;
            case 'BUFFERING':
                ss = '加载中'
                break;
        }
        for(var key in this.rowPositionY){
            if(parseInt(progress) === parseInt(key)){
                console.log('key = ' + key)
                this.listView.scrollTo({x: 0, y: this.rowPositionY[key]-32, animated: true})
                break
            }
        }
        var value = (progress/this.state.pageInfo.duration) * 100
    this.setState({
        progress:progress,
        playerState:ss,
        value:value
    })
    }
    _onList(){
        var mode = 'timeLine'
        this.state.mode === 'timeLine' ? mode = 'timeLineList':mode = 'timeLine'
        this.setState({
            mode:mode
        })

        console.log(this.state.mode)
    }
    _reLoad(pageInfo){
        //获取id 重新请求数据刷新界面
        const {actions} = this.props
        actions.getTimeLine(pageInfo.id)
        this.setState({
            pageInfo:pageInfo,
            mode:'timeLine',
            value:0
        })
        actions.hidden(pageInfo.id)
        console.log(pageInfo.media.mp3[0])
        this.audioPlayer.play(pageInfo.media.mp3[0])
    }
    _onback(){
        const {navigator} = this.props
        if(navigator){
            navigator.pop()
        }
    }
    gotoComment(id){
        this.props.navigator.push({
            component:Comment,
            sceneConfig: Navigator.SceneConfigs.PushFromRight,
            params: {
                ...this.props},
        })
    }

    _download(){
        const {timeLine,} = this.props
        var localPath = RNFS.DocumentDirectoryPath + '/' + this.state.pageInfo.id + '.mp3'
        let downloadManager = new DownloadManager()

        if(downloadManager.isDownloading ){
            Alert.alert('提示','已有任务在队列中',[{text:'确定',onPress:()=>{console.log('sure')} }])
            return
        }

        console.log(localPath)
        let starage = new MyStorage()
        starage.getAudioInfo(this.state.pageInfo.id,(res)=>{
            if(res){
                Alert.alert('提示','资源已经下载',[{text:'确定',onPress:()=>{console.log('sure')} }])
            }else{
                Alert.alert('提示','开始下载',[{text:'确定',onPress:()=>{console.log('sure')} }])
                downloadManager.downloadFile(this.state.pageInfo.media.mp3[0],localPath,timeLine,this.state.pageInfo)
            }
        })

    }
    render() {
        const {timeLine,navigator,likes_num,id,application,loaclTimeLine} = this.props
        let rTimeLine = loaclTimeLine ? loaclTimeLine:timeLine
        const uri = address.articleDetail(id)
        return (
            <View style={styles.container}>
                <ToolNavigationBar
                    id={id}
                    alpha = {0.8}
                    navigator = {navigator}
                    likes_num = {likes_num}
                    gotoComment = {this.gotoComment.bind(this)}
                    pageInfo = {this.state.pageInfo}
                    application = {application}
                    url = {uri}
                    type = {'dismiss'}
                />

                {this.state.mode === 'timeLine' && this.state.pageInfo !== null &&
                <ListView
                    ref = {(c)=>this.listView = c}
                    dataSource={this.state.dataSource.cloneWithRows(rTimeLine.data)}
                    renderRow={this._renderRow.bind(this)}
                    enableEmptySections={true}
                    renderSectionHeader={this._renderSectionHeader.bind(this)}
                    stickySectionHeadersEnabled={true}
                />
                }
                {
                    this.state.mode === 'timeLineList' && <TimeLineList {...this.props} onPress={this._reLoad.bind(this)}/>
                }

                <AudioPlayer
                    ref = {(c)=>this.audioPlayer = c}
                    pageInfo ={this.state.pageInfo}
                    getProgress = {this._getProgress.bind(this)}
                    value={this.state.value}
                    disabled = {false}
                    maxVallue = {100}
                    onList = {this._onList.bind(this)}
                    actions = {this.props.actions}
                    play = {this.props.play}
                    download = {this._download.bind(this)}
                />
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    sectionHeader:{
        height:32,
        backgroundColor:'#fdfdfd',
        flexDirection:'row',
        justifyContent:'space-between',
        padding:8
    },
    sectionStatus:{
        color:'#999999',
        fontSize:14
    },
    sectionTime:{
        color:'#999999',
        fontSize:14
    }
});