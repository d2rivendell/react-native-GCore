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
    Navigator
}from 'react-native'
import  CommentNavigationBar from '../../containers/CommentNavigationBar'
import CommentCell from './CommentCell'
import Signin from '../../components/other/Signin'
export  default  class Comment extends  Component{
   // 构造
     constructor(props) {
       super(props);
       // 初始状态
       this.state = {
           dataSource:new ListView.DataSource({
               rowHasChanged:(row1,row2) => row1 !== row2})
       }
   }
    componentDidMount() {
        const {id,actions} = this.props
        actions.getComment('hot',1,id)
    }
    onBack(){
        const  {navigator} =  this.props
        if(navigator){
            navigator.pop()
        }
    }
    _segmentDidSelectIndex(index){
        const {id,actions} = this.props
        switch (index){
            case 0:
                actions.getComment('hot',1,id)
            case 1:
                actions.getComment('time',1,id)
        }
    }
    _gotoComment(){
        const {navigator} = this.props
        if(navigator){
            navigator.push({
                component:Signin,
                sceneConfig: Navigator.SceneConfigs.FloatFromBottom
            })
        }
    }
    _renderRow(data){
        return (
        <CommentCell comment = {data}/>
        )
    }
    render(){
        const  {comment} =  this.props
        console.log(comment)
        return(
            <View style={styles.container}>
               <CommentNavigationBar
               onBack = {this.onBack.bind(this)}
               segmentDidSelectIndex = {this._segmentDidSelectIndex.bind(this)}
               gotoComment = {this._gotoComment.bind(this)}
               />
               <ListView
               dataSource={this.state.dataSource.cloneWithRows(comment.data)}
               renderRow={this._renderRow}
               enableEmptySections={true}
               />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white'
    }
})