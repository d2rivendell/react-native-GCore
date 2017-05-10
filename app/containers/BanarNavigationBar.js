/**
 * Created by leon on 2017/4/6.
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
import * as WeChat from 'react-native-wechat'
export  default  class BanarNavigationBar extends  Component{
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
    _share(){
        try {
            let result =  WeChat.shareToTimeline({
                type: 'text',
                description: '为了打动你来机核。我们把她请来了 '+ this.props.url
            });
        } catch (e) {
            console.error('share text message to time line failed with:', e);
        }
    }
    render(){
        const {likes_num} = this.props

        return(
            <Animated.View style={[styles.container,{opacity:this.state.alpha}]}>
                <TouchableHighlight
                    onPress={this._back.bind(this)}
                    underlayColor={'transparent'}
                >
                    <View style={styles.backContainer}>
                        <Image style={styles.backIcon} resizeMode='contain' source={require('../resource/navigationbar_back@2x.png')}/>
                        <Text style={styles.text}>返回</Text>
                    </View>
                </TouchableHighlight>
                <View style={styles.ToolView}>
                    <TouchableHighlight
                        onPress={this._share.bind(this)}
                        underlayColor = 'transparent'
                       style={{width:50,height:40,justifyContent:'center',padding:10}}
                    >
                    <Image style={styles.icon} source={require('../resource/icon-share~iphone.png')}/>
                    </TouchableHighlight>

                    <TouchableHighlight onPress={this._gotoComment.bind(this)}  underlayColor = 'transparent'>
                        <View style={{ flexDirection:'row'}}>
                            <Image style={styles.icon} source={require('../resource/icon-comment.png')}/>
                            <Text style={styles.likeText}>{likes_num}</Text>
                        </View>

                    </TouchableHighlight>

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
        height:50,
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:'transparent',
        borderBottomColor: '#d9d9d9',
        alignItems:'center',
        position:'absolute',
        padding:10
    },
    ToolView:{
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        paddingRight:26
    },
    icon:{
        marginLeft:20,
        tintColor:'white'
    },
    likeText:{
        color:'#c8c8c8',
        fontSize:10,
        marginLeft:4
    },
    backIcon:{
        height:30,
        tintColor:'white'
    },
    backContainer:{
        flexDirection:'row',
        alignItems:'center'
    },
    text:{
        fontSize:17,
        color:'#fff',
        marginLeft:5
    }
})