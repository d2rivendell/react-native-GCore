import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    Image,
    Slider,
    DeviceEventEmitter,
    InteractionManager,
    TouchableOpacity,
    Alert
} from 'react-native';
import MyStorage from '../../channel/MyStorage'
import CommonNavigationBar from '../../containers/CommonNavigationBar'
import * as Progress from 'react-native-progress'
import { SwipeListView,SwipeRow } from 'react-native-swipe-list-view'
import Constants from '../../common/constants'
import  RNFS from 'react-native-fs'
import DownloadManager from '../../channel/DownloadManager'
let storage = new MyStorage()
let downloadManager = new  DownloadManager()
export default class DownloadList extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            }),
            AudioInfo:[],
            downloading:false
        }
        this.page = 1
    }
    componentDidMount() {
        InteractionManager.runAfterInteractions(()=>{
            this.getData()
            this.subscription = DeviceEventEmitter.addListener('download',this.downloadProgress.bind(this))
        })

    }
    downloadProgress(info){
        this.setState({
            dataSource:this.state.dataSource.cloneWithRows(this.state.AudioInfo.concat(info)),
            downloading: downloadManager.isDownloading
        })
    }

    componentWillUnmount() {
        this.subscription.remove();
    }
   getData(){
       storage.getAllDataForKey('AudioInfo',(res)=>{
           if(res){
               this.setState({
                   dataSource:this.state.dataSource.cloneWithRows(res),
                   AudioInfo:res
               })
           }
       })
   }
   getM(length){
     let M = length/(1024*1024)
      return M.toFixed(2)
   }
    getPercent(bytesWritten,contentLength){
        let p = (bytesWritten/contentLength) * 100
        return '下载中 ' + parseInt(p) + '%'
    }
    renderRow(data,index){
     // console.log(data)
       var rawData = null
       if(data.progress){
           rawData = data
       }else {
           rawData = data.pageInfo
       }
           return(
               <View style={styles.CellContainer}>
                   <Image  style={styles.cover} source={{uri:rawData.thumb_url}}/>
                   <View style={styles.rightContent}>
                       <Text numberOfLines={1} style={{ width:Constants.WINDOW.width - 80 - 30}}>{rawData.title}</Text>
                       {rawData.progress&&<View >
                       <Progress.Bar progress={rawData.progress} width={Common.WINDOW.width - 80 -30} height={2} color="rgba(255,0,0,1)"/>
                       </View>
                           }
                       {rawData.progress? <Text style={[{fontSize:13},styles.textWidth]}>{this.getPercent(rawData.bytesWritten,rawData.contentLength)}</Text>: <Text style={[{fontSize:13},styles.textWidth]}>{rawData.category.name}</Text>
                       }

                       <View style={{flexDirection:'row',alignSelf:'flex-end',marginRight:20}}>
                           {rawData.progress && <Text style={{fontSize:11}}>{this.getM(rawData.bytesWritten)}MB/</Text>
                           }
                           <Text style={{fontSize:11,color:'#c8c8c8'}}>{this.getM(rawData.contentLength)}MB</Text>
                        </View>

                   </View>
               </View>
           )
    }
    _onBack(){
        this.props.navigator.pop()
    }
    _deleteRow(rowId,id){
       var path =  RNFS.DocumentDirectoryPath + '/' + id + '.mp3'
        Alert.alert('提示',path,[{text:'确定',onPress:()=>{
            storage.removeAudioInfo(id)
            RNFS.unlink(path)
                .then(() => {
                    this.getData()
                })
                .catch((err) => {
                    console.log(err.message);
                });
        } }])

    }
    _renderHiddenRow(data, secId, rowId, rowMap){
        var rawData = null
        if(data.progress){
            rawData = data
        }else {
            rawData = data.pageInfo
        }
        return(
                    <View style={styles.rowBack}>
                        <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnRight]} onPress={this._deleteRow.bind(this, rowId, rawData.id)}>
                            <Text style={styles.backTextWhite}>删除</Text>
                        </TouchableOpacity>
                    </View>
        )
    }
    render() {
       var method = !this.state.downloading ? this._renderHiddenRow.bind(this):null
        return (
            <View style={styles.container}>
                <CommonNavigationBar
                    title = {'下载列表'}
                    onBack= {this._onBack.bind(this)}
                />
                <SwipeListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow.bind(this)}
                    enableEmptySections={true}
                    rightOpenValue={-75}
                    renderHiddenRow = {method}
                />


            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    CellContainer:{
        flexDirection:'row',
        padding:10,
        borderBottomColor:'#c8c8c8',
        borderBottomWidth:1,
        backgroundColor: '#ffffff',
    },
    cover:{
        width:80,
        height:80
    },
    rightContent:{
        marginLeft:10,
        marginRight:10,
        justifyContent:'space-around',
        width:Constants.WINDOW.width - 80 - 10
    },
    textWidth:{
        width:Constants.WINDOW.width - 80 - 30
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#DDD',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75
    },
    backRightBtnLeft: {
        backgroundColor: 'blue',
        right: 75
    },
    backRightBtnRight: {
        backgroundColor: '#ff0000',
        right: 0
    },
    backTextWhite: {
        color: '#FFF'
    },
});

