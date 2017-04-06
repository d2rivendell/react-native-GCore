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
import  Blank from './Blank'
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

    _onPress(){
        const {timeLine,navigator} = this.props
        console.log(navigator)
        if(navigator){
            navigator.push({
                component:Blank,
                params:{
                    ...this.props
                }
            })
        }
    }
 render(){

     return(
         <View style={styles.container}>
             <TouchableHighlight
                 onPress={this._onPress.bind(this)}
             >
             <Animated.Image
                 style={[styles.music,{//使用interpolate插值函数,实现了从数值单位的映射转换,上面角度从0到1，这里把它变成0-360的变化
        transform:[{rotate:this.state.rotateValue.interpolate(
            {inputRange: [0,1],
            outputRange: ['0deg', '360deg']}
            ) }]}]}
                 source= {require('../../resource/GGG.jpg')}
             >
             </Animated.Image>
             </TouchableHighlight>
         </View>
     )
 }
}
const styles = StyleSheet.create({
    container:{

    },
    music:{
        width:44,
        height:44,
        borderRadius:22
    }
})