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
                <Button
                    onPress={this._back.bind(this)}
                    title ='返回'
                    color = '#c8c8c8'
                    style={styles.back}

                />
                <SegmentedControl
                    values = { ['按热门','按时间'] }
                    height = {26}
                    itemWidth = {60}
                    segmentDidSelectIndex = {segmentDidSelectIndex}
                />
                <Button
                    onPress={this._gotoComment.bind(this)}
                    title ='评论'
                    color = '#c8c8c8'
                    style={{fontSize:14}}
                />
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
        paddingLeft:40,
        fontSize:14
    }

})