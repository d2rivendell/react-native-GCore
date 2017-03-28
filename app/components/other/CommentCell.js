/**
 * Created by Leon.Hwa on 17/3/27.
 */
import  React,{Component} from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableHighlight
}from 'react-native'

import Commom from '../../common/constants'

export  default  class CommentCell extends  Component{


    render(){
        const {comment}  = this.props
        return(
            <View style={styles.container}>
             <Image style={styles.icon} source={{uri:comment.user.thumb_url}}/>
             <View  style={styles.content}>
                 <Text  style={styles.nickname}>{comment.user.nickname}</Text>
                 <Text   style={styles.contentText}>{comment.body}</Text>
                 <View   style={styles.desc}>
                   <Text style={styles.time}>{comment.created_at}</Text>
                 </View>
             </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor:'white',
        padding:16,
        paddingBottom:10,
        flexDirection:'row',
        width:375
    },
    icon:{
      width:50,
      height:50,
      borderRadius:25
    },
    content:{
        marginLeft:16,
        marginRight:26
    },
    nickname:{
        fontSize:14,
        color:'red'
    },
    contentText:{
        marginTop:10,
        fontSize:13,
        marginRight:18,
        color:'#333333'
    },
    desc:{
        flexDirection:'row'
    },
    time:{
        marginTop:16,
        fontSize:12,
        color:'#999999'
    }
})