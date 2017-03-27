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
    render(){
        return(
                 <Animated.View style={[styles.container,{opacity:this.state.alpha}]}>

                </Animated.View>
        )
    }
}

const  styles = StyleSheet.create({
    container:{
     position:'absolute',
        top: 0,
        left: 0,
        right: 0,
     // width:Common.WINDOW.width,
     height:60,
     flexDirection:'row',
     justifyContent:'space-between',
     backgroundColor:'white',
     borderBottomWidth:Common.WINDOW.onePR,
     borderBottomColor: '#d9d9d9'
    }
})