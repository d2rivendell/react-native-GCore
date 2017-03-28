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
    Button
}from 'react-native'
import  CommentNavigationBar from '../../containers/CommentNavigationBar'

export  default  class Comment extends  Component{

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
        console.log(index)
    }
    _gotoComment(){
        console.log('_gotoComment')
    }
    render(){

        return(
            <View style={styles.container}>
               <CommentNavigationBar
               onBack = {this.onBack.bind(this)}
               segmentDidSelectIndex = {this._segmentDidSelectIndex}
               gotoComment = {this._gotoComment}
               />
               <Text>comment</Text>
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