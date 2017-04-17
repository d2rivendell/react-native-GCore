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

//http://www.g-cores.com/api/subscriptions/subscript
//http://www.g-cores.com/api/subscriptions/unsubscript


// auth_exclusive	dpkynzs2q0wm9o5gi1r83fcabthl4eu
// auth_token	0VzyZguVbX5nhpeQe6XC8g
// subscriptable_id	2
// subscriptable_type	category

//check   http://www.g-cores.com/api/categories/2?auth_exclusive=dpkynzs2q0wm9o5gi1r83fcabthl4eu&auth_token=0VzyZguVbX5nhpeQe6XC8g
//detail http://www.g-cores.com/api/categories/2/originals?page=1&auth_exclusive=dpkynzs2q0wm9o5gi1r83fcabthl4eu&auth_token=0VzyZguVbX5nhpeQe6XC8g
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
                <CommonNavigationBar
                    title= {'回复'}
                    rightTitle = {'评论'}
                    onBack = {this._onBack.bind(this)}
                    rightClick= {this._gotoComment.bind(this)}/>
                <TextInput multiline={true} style={styles.text}/>

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