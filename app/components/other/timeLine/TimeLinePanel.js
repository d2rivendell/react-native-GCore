/**
 * Created by Leon.Hwa on 17/4/1.
 */
import  React,{Component} from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableHighlight
}from 'react-native'

export  default  class TimeLinePanel extends  Component {
    getTime(timestamp){
        var hour = Math.floor(timestamp/60)
        var sec = timestamp - (hour * 60)
        sec = (Array(2).join(0)+sec).slice(-2)
        return  hour + ":" + sec
    }
    _getLinkView(quote_href){
        console.log(quote_href)
        if(quote_href.length == 0){
            return(<Text style={{color:'#999999',fontSize:10}}>no link</Text>)
        }else {
            return( <Image style={styles.tagImage} source={require('../../../resource/timeline-source~iphone.png')} resizeMode= 'contain'/>)
        }
    }
    render(){
        const {timeLineInfo} = this.props
        // console.log(timeLineInfo)
        return(
            <View style={styles.container}>
                <View style={styles.leftLineView}>
                    <View style={styles.Line}/>
                    <View style={styles.redDot}>

                    </View>
                </View>
                <View style={styles.rightContentView}>
                    <Text style={styles.timestamp}>{this.getTime(timeLineInfo.at)}</Text>
                    <Text style={styles.title}>{timeLineInfo.title}</Text>
                    <Image  style={styles.corver} source={{uri:timeLineInfo.asset_url}} resizeMode= 'contain'/>
                    <Text style={styles.content}>{timeLineInfo.content}</Text>
                    <View style={styles.bottomContainer} >
                        {timeLineInfo.quote_href.length === 0 ?
                            (<Text style={{color:'#999999',fontSize:10}}>no link</Text>):
                            (<Image style={styles.tagImage} source={require('../../../resource/timeline-source~iphone.png')} resizeMode= 'contain'/>)
                        }
                        <Image style={styles.tagImage} source={require('../../../resource/timeline-listen~iphone.png')} resizeMode= 'contain'/>
                    </View>
                </View>

            </View>
        )
    }
}
const  styles = StyleSheet.create({
    container:{
        flex:1,
        paddingLeft:6,
        paddingRight:6,
        flexDirection:'row',
        backgroundColor:'#f4f4f4'
    },
    leftLineView:{
      width:20,
      alignItems:'center'
    },
    Line:{
        flex:1,
        width:0.5,
        backgroundColor:'#444444'
    },
    redDot:{
        marginTop:10,
        width:10,
        height:10,
        borderRadius:5,
        backgroundColor:'red',
        position:'absolute'
    },
    rightContentView:{
        flex:1,
        padding:8,
        marginTop:8,
        backgroundColor:'#ffffff'
    },
    timestamp:{
        color:'#666666'
    },
    title:{
        margin:10,
        fontSize:15
    },
    corver:{
        height:180
    },
    content:{
        margin:6,
        fontSize:12,
        color:'#777777',
        lineHeight:22
    },
    bottomContainer:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-around',
        padding:30,
        alignItems:'center'
    },
    tagImage:{
        width:60
    }
})
