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
export  default  class TimeLine extends  Component {

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            uri:'',
            dataSource:new ListView.DataSource({
                rowHasChanged:(row1,row2) => row1 !== row2
            })
        };
      }
    componentDidMount() {
        const {id,actions,pageInfo} = this.props
        console.log(pageInfo)
        if(pageInfo.data){
            this.setState({
                uri:pageInfo.data.media.mp3[0]
            })
        }
        actions.getTimeLine(id)
    }

    componentWillReceiveProps(prop) {
        const {pageInfo} = prop
        // console.log(pageInfo)
        if(pageInfo.data){
            this.setState({
                uri:pageInfo.data.media.mp3[0]
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
        sec = (Array(2).join(0)+sec).slice(-2)
        return  hour + ":" + sec
    }
    _renderSectionHeader(sectionData, sectionID){
        const {pageInfo}  = this.props
        // console.log(pageInfo)
        return (
             <View style={styles.sectionHeader}>
              <Text style={styles.sectionStatus}>停止</Text>
              <Text style={styles.sectionTime}>{this._getTime(pageInfo.data.duration)}</Text>
             </View>
        )
     }
    render() {
        const {timeLine,pageInfo} = this.props
        return (
            <View style={styles.container}>
                <ListView
                dataSource={this.state.dataSource.cloneWithRows(timeLine.data)}
                renderRow={this._renderRow.bind(this)}
                enableEmptySections={true}
                renderSectionHeader={this._renderSectionHeader.bind(this)}
                />
                <AudioPlayer pageInfo={pageInfo}/>
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