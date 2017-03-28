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
        const {coment}  = this.props
        return(
            <View style={styles.container}>
             <Image source={{uri:coment.user.thumb.url}}>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        height:50,
        backgroundColor:'white',
        width:Commom.WINDOW.width
    },
    icon:{

    }

})