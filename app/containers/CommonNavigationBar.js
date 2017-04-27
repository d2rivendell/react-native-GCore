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
        const  {backTitle,title,rightTitle} = this.props
        const leftTitle = backTitle ? backTitle:'返回'
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
                        <Image style={styles.backIcon} resizeMode='contain' source={require('../resource/navigationbar_back@2x.png')}/>
                        <Text style={styles.text}>{leftTitle}</Text>
                    </View>
                </TouchableHighlight>

                {title&&<Text style={styles.title}>{title}</Text>}
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
        width:Common.WINDOW.width,
        height:64,
        flexDirection:'row',
        backgroundColor:'white',
        borderBottomWidth:Common.WINDOW.onePR,
        borderBottomColor: '#d9d9d9',
        alignItems:'center',
        paddingTop:20,
        paddingLeft:10,
        paddingRight:10,
        justifyContent:'space-between'
    },
    backIcon:{
      height:30,

    },
    backContainer:{
        flexDirection:'row',
        alignItems:'center',
    },
    text:{
        fontSize:15,
        color:'#666666',
        marginLeft:4
    },
    title:{
        fontSize:17,
        color:'#666666',
        alignSelf:'center',
        position:'absolute',
        left:(Common.WINDOW.width-100)/2,
        right:(Common.WINDOW.width-100)/2,
        paddingTop:20,
        textAlign:'center',
        width:100
    }

})
