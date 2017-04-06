/**
 * Created by Leon.Hwa on 17/4/6.
 */
import  React,{Component} from 'react'
import {
    View,
    Image,
    StyleSheet,
    TouchableHighlight,
    Animated,
    Easing     //引入Easing渐变函数
}from 'react-native'

export  default  class MusicTool extends  Component {
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            rotateValue: new Animated.Value(0)
        };
      }
    componentDidMount() {
        //在初始化渲染执行之后立刻调用动画执行函数
        this.startAnimation();
    }
    startAnimation(){
        this.state.rotateValue.setValue(0);
          Animated.timing(this.state.rotateValue,
              {toValue:1,
               duration:10000,
               easing: Easing.out(Easing.linear),//线性变化，匀速旋转
              }
              ).start(()=>this.startAnimation() )
      }

 render(){
     return(
         <View style={styles.container}>
             <Animated.Image
                 style={[styles.music,{//使用interpolate插值函数,实现了从数值单位的映射转换,上面角度从0到1，这里把它变成0-360的变化
        transform:[{rotate:this.state.rotateValue.interpolate(
            {inputRange: [0,1],
            outputRange: ['0deg', '360deg']}
            ) }]}]}
                 source= {require('../../resource/GGG.jpg')}
             >
             </Animated.Image>
         </View>
     )
 }
}
const styles = StyleSheet.create({

    music:{
        position:'absolute',
        borderRadius:22,
        right:10,
        bottom:60,
        width:44,
        height:44
    }
})