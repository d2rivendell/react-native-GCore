/**
 * Created by leon on 2017/4/15.
 */
import  React,{Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
    Alert,
    TextInput,
    Navigator
}from 'react-native'
import CommonNavigationBar from '../../containers/CommonNavigationBar'
import Signin from '../../components/other/Signin'
export  default  class Reply extends  Component {
    _onBack(){
        this.props.navigator.pop()
    }
    _gotoComment(){
        account.loadAccount((result,err)=>{
            if(result){
            console.log(result)
            }else{
                this.props.navigator.push({
                    component:Signin,
                    sceneConfig: Navigator.SceneConfigs.FloatFromBottom
                })
            }
        })

    }
    render(){
        return(
            <View style={styles.container}>

                <TextInput multiline={true} style={styles.text}/>
                <CommonNavigationBar
                    title= {'回复'}
                    rightTitle = {'评论'}
                    onBack = {this._onBack.bind(this)}
                    rightClick= {this._gotoComment.bind(this)}/>
            </View>
        )
    }
}
const styles = StyleSheet.create({
  text:{
      fontSize:16,
      flex:1,
  },
    container:{
        flex:1,
        backgroundColor:'#fff'
    }
})