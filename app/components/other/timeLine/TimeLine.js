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
    ListView
}from 'react-native'
import {Player}  from  'react-native-audio-streaming'
import TimeLinePanel from './TimeLinePanel'
import AudioPlayer from './AudioPlayer'
import TimeLineList from './TimeLineList'
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
        const {id,actions} = this.props
        actions.getTimeLine(id)
    }

    componentWillReceiveProps(prop) {
        const {pageInfo} = prop
        //初始化时需要 重新在列表选择后不再需要
        if (pageInfo && this.state.pageInfo === null) {
            console.log(pageInfo)
        this.setState({
            pageInfo:pageInfo.data
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
     var value = parseInt(progress)
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
    render() {
        const {timeLine} = this.props
        return (
            <View style={styles.container}>
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