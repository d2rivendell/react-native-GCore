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
    Animated
}from 'react-native'
import Common from '../common/constants'
import NetTool from '../channel/NetTool'
const likeUrl = 'http://www.g-cores.com/api/like'
const  markUrl = 'http://www.g-cores.com/api/mark'

export  default  class ToolNavigationBar extends  Component{
  // 构造
    constructor(props) {
      super(props);
      // 初始状态
      this.state = {
          alpha:new Animated.Value(0.8),
          like:false,
          mark:false
      };
    }

    componentWillReceiveProps(props) {
        const {alpha,pageInfo} = props
        this.state.alpha.setValue(alpha)

        if(pageInfo){
         this.setState({
             like:pageInfo.is_like
         })
        }
    }
    _back() {
        const {navigator} = this.props
        if (navigator) {
            navigator.pop()
        }
    }
    _gotoComment(){
        const  {gotoComment} = this.props
        if (gotoComment) {
            gotoComment()
        }
    }

    _doSomething(op){
        if(!account.user){

            return;
        }
        var method = null
        var url = null
        if (op === 'like'){
            method = this.state.like ? 'cancel_like':'like'
            url = likeUrl
        }else if (op === 'mark'){
            method = this.state.mark ? 'cancel_mark':'mark'
            url = markUrl
        }
        console.log(account.user)
        const {id,pageInfo} = this.props

        let fromData =   new FormData
        fromData.append('auth_exclusive','dpkynzs2q0wm9o5gi1r83fcabthl4eu');
        fromData.append('auth_token',account.user.auth_token);
        fromData.append('id',id);
        fromData.append('method',method);
        fromData.append('resource','original');
        NetTool.POST(url,fromData,(res,err)=>{
            if(res){
                console.log(res)

                if (op === 'like'){
                    this.setState({
                        like:res.is_like
                    })
                }else if (op === 'mark'){
                    this.setState({
                        mark:res.is_mark
                    })
                }
            }else{
                console.log(err)
            }
        })
   }

    render(){
        const {likes_num,pageInfo} = this.props
       const likeStyle = this.state.like ? {tintColor:'#dd0000'}:{tintColor:'#777777'}
        const markStyle = this.state.mark ? {tintColor:'#dd0000'}:{}
        return(
                 <Animated.View style={[styles.container,{opacity:this.state.alpha}]}>
                     <TouchableHighlight
                         onPress={this._back.bind(this)}
                         underlayColor={'transparent'}
                     >
                         <View style={styles.backContainer}>
                             <Image style={styles.backIcon} resizeMode='contain' source={require('../resource/icon-close-down.png')}/>
                         </View>
                     </TouchableHighlight>
                   <View style={styles.ToolView}>
                       <TouchableHighlight
                           underlayColor={'transparent'}
                           onPress={this._doSomething.bind(this,'like')}
                       >
                           <Image style={[styles.icon ,likeStyle]} source={require('../resource/icon-like-r.png')}/>
                       </TouchableHighlight>
                       <TouchableHighlight
                           underlayColor={'transparent'}
                           onPress={this._doSomething.bind(this,'mark')}
                       >
                           <Image style={[styles.icon ,markStyle]} source={ require('../resource/icon-mark~iphone.png')}/>
                       </TouchableHighlight>
                       <TouchableHighlight
                           underlayColor={'transparent'}
                           onPress={this._doSomething.bind(this)}
                       >
                           <Image style={styles.icon} source={require('../resource/icon-share~iphone.png')}/>
                       </TouchableHighlight>

                     <TouchableHighlight onPress={this._gotoComment.bind(this)}  underlayColor = 'transparent'>
                     <Image style={styles.icon} source={require('../resource/icon-comment.png')}/>
                     </TouchableHighlight>

                      <Text style={styles.likeText}>{likes_num}</Text>
                   </View>
                </Animated.View>
        )
    }
}

const  styles = StyleSheet.create({
    container:{
     // position:'absolute',
        top: 0,
        left: 0,
        right: 0,
     height:44,
     flexDirection:'row',
     justifyContent:'space-between',
     backgroundColor:'white',
     borderBottomWidth:Common.WINDOW.onePR,
     borderBottomColor: '#d9d9d9',
     alignItems:'center',
     paddingLeft:10,
     paddingRight:10
    },
    backContainer:{
        flexDirection:'row',
        alignItems:'center'
    },
    ToolView:{
        flexDirection:'row',
        justifyContent:'space-around',
        paddingRight:26
    },
    icon:{
      marginLeft:20,
    },
    likeText:{
        color:'#c8c8c8',
        fontSize:10,
        marginLeft:4
    }
})