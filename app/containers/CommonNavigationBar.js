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
    StatusBar
}from 'react-native'
import Common from '../common/constants'

export  default  class CommonNavigationBar extends  Component{

    _back(){
        const  {onBack} = this.props
        if(onBack){
            onBack()
        }
    }
    _rightClick(){
        const  {rightClick} = this.props
        if(rightClick){
            rightClick()
        }
    }
    render(){
        const  {title,rightTitle} = this.props
        return(
            <View style={styles.container}>
                <StatusBar
                    animated={false}
                    hidden={false}
                    translucent={true}
                    barStyle={'default'}
                />
                <TouchableHighlight
                    onPress={this._back.bind(this)}
                    underlayColor={'transparent'}
                >
                    <View style={styles.backContainer}>
                        <Image style={styles.backIcon} resizeMode='contain' source={require('../resource/navigationbar_back@2x.png')}/>
                        <Text style={styles.text}>返回</Text>
                    </View>
                </TouchableHighlight>

                {title&&<Text style={styles.text}>{title}</Text>}
                {rightTitle &&<TouchableHighlight
                    onPress={this._rightClick.bind(this)}
                    underlayColor={'transparent'}
                >
                    <Text style={styles.text}>{rightTitle}</Text>
                </TouchableHighlight>
                }
            </View>
        )
    }
}

const  styles = StyleSheet.create({
    container:{
        position:'absolute',
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
        alignItems:'center'
    },
    text:{
        fontSize:17,
        color:'#666666'
    }

})
