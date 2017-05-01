/**
 * Created by Leon.Hwa on 17/3/27.
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
    RefreshControl,
    ActivityIndicator,
    InteractionManager
}from 'react-native'
import  CommentNavigationBar from '../../containers/CommentNavigationBar'
import CommentCell from './CommentCell'
import  Common from '../../common/constants'
import Reply from '../../components/other/Reply'
import Loading from '../other/Loading'
export  default  class Comment extends  Component{
   // 构造
     constructor(props) {
       super(props);
       // 初始状态
       this.state = {
           dataSource:new ListView.DataSource({
               rowHasChanged:(row1,row2) => row1 !== row2}),
           commentType:'hot'
       }
         this.page = 1
   }
    componentDidMount() {
        const {id,actions} = this.props
        InteractionManager.runAfterInteractions(()=> {
            actions.getComment(this.state.commentType, 1, id)
        })
    }
    onBack(){
        const  {navigator} =  this.props
        if(navigator){
            navigator.pop()
        }
    }
    _segmentDidSelectIndex(index){
        const {id,actions} = this.props
        this.page = 1
        switch (index){
            case 0:
                this.setState({
                    commentType:'hot'
                })
                actions.getComment('hot',1,id)
                break;
            case 1:
                this.setState({
                    commentType:'time'
                })
                actions.getComment('time',1,id)
                break;
            default:
                break;
        }
    }
    _gotoComment(){
        const {navigator,application,actions,id} = this.props
        if(navigator){
            navigator.push({
                component:Reply,
                sceneConfig: Navigator.SceneConfigs.PushFromRight,
                params:{
                    application:application,
                    actions:actions,
                    id:id
                }
            })
        }
    }
    _onRefresh(){
        const  {id,actions} = this.props
        this.page = 1
        console.log('正在刷新')
        actions.getComment(this.state.commentType,this.page,id)
    }
    _onScrollEndDrag(event){
        const {contentOffset, layoutMeasurement, contentSize} = event.nativeEvent;
        let contentSizeH = contentSize.height;
        //layoutMeasurement.height 是listView的高度(小于 window.height)
        let viewBottomY = contentOffset.y + layoutMeasurement.height;

        console.log(viewBottomY - contentSizeH)
        if((viewBottomY - contentSizeH)>=40){
            const  {id,comment,actions} = this.props
            if(comment.isLoadMore){
                return
            }
            this.page++;
            actions.getComment(this.state.commentType,this.page,id)
        }
    }
    _renderRow(data){
        return (
        <CommentCell comment = {data} onPress={this._toReplay.bind(this)}/>
        )
    }
    _toReplay(father,child){
        const {navigator,application,actions,id} = this.props
        console.log(father)
        console.log(child)
        if(navigator){
            navigator.push({
                component:Reply,
                sceneConfig: Navigator.SceneConfigs.PushFromRight,
                params:{
                    application:application,
                    actions:actions,
                    replay:{father:father,child:child}
                }
            })
        }
    }
    render(){
        const  {comment} =  this.props
        const refreshWord = comment.isLoading ? '正在刷新':'下拉刷新'
        return(
            <View style={styles.container}>
               <CommentNavigationBar
               onBack = {this.onBack.bind(this)}
               segmentDidSelectIndex = {this._segmentDidSelectIndex.bind(this)}
               gotoComment = {this._gotoComment.bind(this)}
               />
               <ListView
               dataSource={this.state.dataSource.cloneWithRows(comment.data)}
               renderRow={this._renderRow.bind(this)}
               enableEmptySections={true}
               scrollEventThrottle={200}
               onScrollEndDrag = {this._onScrollEndDrag.bind(this)}
               refreshControl={
                        <RefreshControl
                            refreshing={comment.isLoading}
                            onRefresh={this._onRefresh.bind(this)}
                            colors={['rgb(217, 51, 58)']}
                            title={refreshWord}
                        />
                    }
               />
                {comment.isLoadMore &&
                <View style={styles.loadingContainer}>
                    <ActivityIndicator />
                    <Text style={{fontSize: 14, marginLeft: 5}}>正在加载更多的数据...</Text>
                </View>
                }
                <Loading isShow={comment.isLoading}/>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'rgba(240,240,240,1)'
    },
    loadingContainer: {
        height:30,
        width:Common.WINDOW.width,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    }
})