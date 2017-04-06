/**
 * Created by Leon.Hwa on 17/3/27.
 */
import  React,{Component} from 'react'
import {
    View,
    Text,
    Navigator,
    StyleSheet
}from 'react-native'
import  Blank from './Blank'
import  MusicTool from './MusicTool'
export  default  class TLView extends  Component{

    _configureScene = route => {
        //有这句后后面修改 sceneConfig 才有效 否则不起作用
        if (route.sceneConfig) return route.sceneConfig
        return {
            ...Navigator.SceneConfigs.PushFromRight,
            // gestures: {}    // 禁用左滑返回手势
        }
    }

    _renderScene = (route, navigator) => {
        let Component = route.component
        return <Component navigator={navigator} {...route.params} {...this.props}/>
    }

    render(){

        return(
           <View style={styles.container}>
            <Navigator
             initialRoute={{name:'MusicTool',component:MusicTool}}
             configureScene={this._configureScene}
             renderScene={this._renderScene}
            />
           </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        position:'absolute',
        width:44,
        height:44,
        right:20,
        bottom:60,
        borderRadius:22,
    }
})