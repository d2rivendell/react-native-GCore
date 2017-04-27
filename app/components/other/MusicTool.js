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
    Easing ,    //引入Easing渐变函数
    DeviceEventEmitter
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
                    isInteraction: false,//加入此参数可解决阻塞InteractionManager.runAfterInteractions，官方文档上无此参数说明
                }
            ).start(()=>this.startAnimation() )
      }

    _onPress(){
        const {play} = this.props
        if(play.show){
            DeviceEventEmitter.emit('timeLine',play)
        }

    }
 render(){
  const {play} = this.props
     // console.log(play)
     return(
         <View style={styles.container}>
             { play.show && <TouchableHighlight
                 onPress={this._onPress.bind(this)}
             >
                 <Animated.Image
                     style={[styles.music,{//使用interpolate插值函数,实现了从数值单位的映射转换,上面角度从0到1，这里把它变成0-360的变化
        transform:[{rotate:this.state.rotateValue.interpolate(
            {inputRange: [0,1],
            outputRange: ['0deg', '360deg']}
            ) }]}]}
                     source={{uri:play.pageInfo.thumb_url}}
                 >
                 </Animated.Image>
             </TouchableHighlight>
             }
         </View>
     )
 }
}
const styles = StyleSheet.create({
    container:{

         },
    music:{
        position:'absolute',
        borderRadius:22,
        right:10,
        bottom:60,
        width:44,
        height:44
    }
})