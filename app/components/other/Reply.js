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

const  replyUrl = 'http://www.g-cores.com/api/comments'
//http://www.g-cores.com/api/subscriptions/subscript
//http://www.g-cores.com/api/subscriptions/unsubscript


// auth_exclusive	dpkynzs2q0wm9o5gi1r83fcabthl4eu
// auth_token	0VzyZguVbX5nhpeQe6XC8g
// subscriptable_id	2
// subscriptable_type	category

//check   http://www.g-cores.com/api/categories/2?auth_exclusive=dpkynzs2q0wm9o5gi1r83fcabthl4eu&auth_token=0VzyZguVbX5nhpeQe6XC8g
//detail http://www.g-cores.com/api/categories/2/originals?page=1&auth_exclusive=dpkynzs2q0wm9o5gi1r83fcabthl4eu&auth_token=0VzyZguVbX5nhpeQe6XC8g
/**
 * 回复主题
 * http://www.g-cores.com/api/comments
 * auth_exclusive	dpkynzs2q0wm9o5gi1r83fcabthl4eu
 auth_token	0VzyZguVbX5nhpeQe6XC8g
 body	点个赞 先！
 commentable_id	24496
 commentable_type	original
 parent_id	0
 * */

/**回复 某人
 * http://www.g-cores.com/api/comments
 * auth_exclusive	dpkynzs2q0wm9o5gi1r83fcabthl4eu
 auth_token	0VzyZguVbX5nhpeQe6XC8g
 body	同留
 commentable_id	24496
 commentable_type	original
 parent_id	436181
 * */
import CommonNavigationBar from '../../containers/CommonNavigationBar'
import Signin from '../../components/other/Signin'
import NetTool from '../../channel/NetTool'

export  default  class Reply extends  Component {
    // 构造
      // 构造
        constructor(props) {
          super(props);
          // 初始状态
          this.state = {
              text:null
          };
        }
    _onBack(){
        this.props.navigator.pop()
    }
    _publish(){
       const {actions,application} =  this.props
        console.log(actions)
        if(application.user === null){
            this.props.navigator.push({
                component:Signin,
                sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
                params:{
                    ...this.props
                }
            })
        }else{
            const {id,replay} = this.props
            if(this.state.text.length === 0 ){
                Alert.alert('提示','内容不能为空',[{text:'确定',onPress:null }])
                return;
            }

            let fromData =   new FormData
            fromData.append('auth_exclusive','dpkynzs2q0wm9o5gi1r83fcabthl4eu');
            fromData.append('auth_token',application.user.auth_token);
            fromData.append('body',this.state.text);
            fromData.append('commentable_id',id);
            fromData.append('commentable_type','original');
            if(replay){
                if(replay.father){
                    fromData.append('parent_id',replay.father.id);
                }else if(replay.child){
                    fromData.append('parent_id',replay.child.id);
                }
            }else {
                fromData.append('parent_id',0);
            }
            NetTool.POST(replyUrl,fromData,(response,error)=>{
                if(response.status === 1){
                    // Alert.alert('提示',response,[{text:'确定',onPress:()=>{console.log(response)} }])
                    this.props.navigator.pop()
                }else{
                    Alert.alert('提示',error,[{text:'确定',onPress:null }])
                }

            })

        }

    }
    render(){
        const {id,replay} = this.props
        var title
        if(id){
            title = '留言'
        }else if(replay){
            if(replay.father){
                title = '回复给 '+replay.father.user.nickname
            }else if(replay.child){
                title = '回复给 '+replay.child.user.nickname
            }
        }
        return(
            <View style={styles.container}>
                <CommonNavigationBar
                    title= {title}
                    rightTitle = {'发布'}
                    onBack = {this._onBack.bind(this)}
                    rightClick= {this._publish.bind(this)}/>
                <TextInput multiline={true}
                           style={styles.text}
                           onChangeText={(text) => this.setState({text:text})}
                />

            </View>
        )
    }
}
const styles = StyleSheet.create({
  text:{
      fontSize:16,
      flex:1,
      padding:6,
      textAlignVertical:'top'
  },
    container:{
        flex:1,
        backgroundColor:'#fff'
    }
})