import React,{Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableHighlight
}from 'react-native'
import  Common from '../../common/constants'
export  default  class  NewsCell extends  Component {

    onPress(){

    }
    render(){
        const {news} = this.props
        return(
            <TouchableHighlight
                onPress={this.onPress}
                underlayColor = 'transparent'
            >
                <View style={styles.container}>
                    <View style={styles.leftZone}>
                        <Image style={styles.image} source={{uri:news.thumb_url}}/>
                    </View>
                    <View style={styles.rightZone}>
                        <Text style={styles.title}>{news.title}</Text>
                        <Text style={styles.desc}>{news.desc}</Text>
                        <View style={styles.bottomView}>
                            <Text style={styles.category}>{news.category.name}</Text>
                            <Image style={styles.LCIcon} source={require('../../resource/icon-like.png')}/>
                            <Text style={styles.LCNum}>{news.likes_num}</Text>
                            <Image style={styles.LCIcon} source={require('../../resource/icon-comment.png')}/>
                            <Text style={styles.LCNum}>{news.comments_num}</Text>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>

        )

    }
}

const styles = StyleSheet.create({
    container: {
        width: Common.WINDOW.width,
        height: 106,
        flexDirection: 'row',
        borderBottomColor:'#c8c8c8',
        borderBottomWidth:0.5
    },
    image:{
      flex:1,
      marginBottom:6
    },
    leftZone: {
        flex: 1,
        paddingLeft:11,
        paddingTop:10,
        paddingBottom:17,
        paddingRight:7
    },

    rightZone: {
        flex: 2,
        justifyContent:'space-around',
        paddingLeft:5,
        paddingRight:20,
        paddingTop:3,
        paddingBottom:5
    },
    title:{
        fontSize:15,
        color:'#444444'
    },
    desc:{
        fontSize:11,
        color:'#888888'
    },
    bottomView:{
        // height:20,
        flexDirection:'row',
        alignItems:'center'
    },
    category:{
        fontSize:12,
        color:'#888888'
    },
    LCIcon:{
        marginLeft:6,
        width:12,
        height:11
    },
    LCNum:{
        marginLeft:6,
        fontSize:10,
        color:'#888888'
    }
})