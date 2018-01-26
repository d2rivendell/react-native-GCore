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
    Button,
    StatusBar
}from 'react-native'
import Common from '../common/constants'
import SegmentedControl from '../components/custom/SegmentedControl'
export  default  class CommentNavigationBar extends  Component{

    _back(){
        const  {onBack} = this.props
        if(onBack){
            onBack()
        }
    }
    _gotoComment(){
        const  {gotoComment} = this.props
        if(gotoComment){
            gotoComment()
        }
    }
    render(){
        const  {segmentDidSelectIndex,object} = this.props
        return(
            <View style={styles.container}>
                <StatusBar
                    animated={true}
                    hidden={false}
                    translucent={true}
                    barStyle={'default'}
                />
                <TouchableHighlight
                    onPress={this._back.bind(this)}
                    underlayColor={'transparent'}
                >
                    <View style={styles.backContainer}>
                        <Image style={styles.backIcon} resizeMode='contain' source={require('../resource/navigationbar_back.png')}/>
                        <Text style={styles.text}>返回</Text>
                    </View>
                </TouchableHighlight>

                <SegmentedControl
                    values = { ['按热门','按时间'] }
                    height = {26}
                    itemWidth = {60}
                    segmentDidSelectIndex = {segmentDidSelectIndex}
                />
                <TouchableHighlight
                    onPress={this._gotoComment.bind(this)}
                    underlayColor={'transparent'}
                >
                    <Text style={styles.text}>发评论</Text>
                </TouchableHighlight>
            </View>
        )
    }
}

const  styles = StyleSheet.create({
    container:{
        // position:'absolute',
        top: 0,
        left: 0,
        right: 0,
        height:64,
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:'white',
        borderBottomWidth:Common.WINDOW.onePR,
        borderBottomColor: '#d9d9d9',
        alignItems:'center',
        paddingTop:20,
        paddingLeft:10,
        paddingRight:10
    },
    backIcon:{
        height:30,

    },
    backContainer:{
        flexDirection:'row',
        alignItems:'center',
        width:80,
        alignSelf:'center'
    },
    text:{
        fontSize:15,
        color:'#666666',
        marginLeft:4
    }
})