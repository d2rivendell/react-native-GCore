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
    Animated,
    Button
}from 'react-native'
import Common from '../common/constants'
export  default  class ToolNavigationBar extends  Component{
  // 构造
    constructor(props) {
      super(props);
      // 初始状态
      this.state = {
          alpha:new Animated.Value(0.8)
      };
    }

    componentWillReceiveProps(props) {
        const {alpha} = props
        this.state.alpha.setValue(alpha)

    }
    _back() {
        const {onBack} = this.props
        if (onBack) {
            onBack()
        }
    }
    _gotoComment(object){
        const  {gotoComment} = this.props
        if (gotoComment) {
            gotoComment()
        }
    }
    render(){
        const {object} = this.props
        return(
                 <Animated.View style={[styles.container,{opacity:this.state.alpha}]}>
                  <Button
                  onPress={this._back.bind(this)}
                  title ='返回'
                  color = '#c8c8c8'

                  />
                   <View style={styles.ToolView}>
                     <Image style={styles.icon} source={require('../resource/icon-like.png')}/>
                     <Image style={styles.icon} source={require('../resource/icon-mark~iphone.png')}/>
                     <Image style={styles.icon} source={require('../resource/icon-share~iphone.png')}/>
                     <TouchableHighlight onPress={this._gotoComment.bind(this,object)}  underlayColor = 'transparent'>
                     <Image style={styles.icon} source={require('../resource/icon-comment.png')}/>
                     </TouchableHighlight>

                      <Text style={styles.likeText}>{object.likes_num}</Text>
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
     // width:Common.WINDOW.width,
     height:60,
     flexDirection:'row',
     justifyContent:'space-between',
     backgroundColor:'white',
     borderBottomWidth:Common.WINDOW.onePR,
     borderBottomColor: '#d9d9d9',
     alignItems:'center'
    },
    back:{
        paddingLeft:40
    },
    ToolView:{
        flexDirection:'row',
        justifyContent:'space-around',
        paddingRight:26
    },
    icon:{
      marginLeft:20
    },
    likeText:{
        color:'#c8c8c8',
        fontSize:10,
        marginLeft:4
    }
})