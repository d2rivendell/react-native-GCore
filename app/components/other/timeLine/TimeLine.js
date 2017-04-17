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
    Navigator
}from 'react-native'
import {Player}  from  'react-native-audio-streaming'
import TimeLinePanel from './TimeLinePanel'
import AudioPlayer from './AudioPlayer'
import TimeLineList from './TimeLineList'
import ToolNavigationBar from '../../../containers/ToolNavigationBar'
import  Comment from '../../../components/other/Comment'
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
      }
    componentDidMount() {
        const {id,actions,timeLine} = this.props
        actions.getTimeLine(id)
            .then(()=>{
            console.log('then finish')
            })
        actions.hidden(id)
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
        const {pageInfo} = prop
        //初始化时需要 重新在列表选择后不再需要
        if (pageInfo && this.state.pageInfo === null) {
            let truePageInfo = (pageInfo.data ? pageInfo.data:pageInfo)
        this.setState({
            pageInfo:truePageInfo
        })
      }
    }
    _renderRow(data){
          // console.log(data)
          return (<TimeLinePanel timeLineInfo = {data}/>)
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
       console.log(this.state.pageInfo)
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
    render() {
        const {timeLine,navigator,likes_num,id} = this.props
        return (
            <View style={styles.container}>
                <ToolNavigationBar
                    id={id}
                    alpha = {0.8}
                    navigator = {navigator}
                    likes_num = {likes_num}
                    gotoComment = {this.gotoComment.bind(this)}
                    pageInfo = {this.state.pageInfo}
                />

                {this.state.mode === 'timeLine' && this.state.pageInfo !== null &&
                <ListView
                    dataSource={this.state.dataSource.cloneWithRows(timeLine.data)}
                    renderRow={this._renderRow.bind(this)}
                    enableEmptySections={true}
                    renderSectionHeader={this._renderSectionHeader.bind(this)}
                />
                }
                {
                    this.state.mode === 'timeLineList' && <TimeLineList {...this.props} onPress={this._reLoad.bind(this)}/>
                }

                <AudioPlayer
                    timeLineInfo ={this.state.pageInfo}
                    getProgress = {this._getProgress.bind(this)}
                    value={this.state.value}
                    disabled = {false}
                    maxVallue = {100}
                    onList = {this._onList.bind(this)}
                    {...this.props}
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