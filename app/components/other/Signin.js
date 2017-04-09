/**
 * Created by leon on 2017/4/8.
 */
import  React,{Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableHighlight,
    TextInput
}from 'react-native'

export  default  class Signin extends  Component {

    _cancel(){

    }
    _pop(){
        this.props.navigator.pop()
    }
 render(){
     return(
         <View style={styles.container}>
          <TouchableHighlight style={styles.cancelBtn} underlayColor = 'transparent'
                              onPress={this._pop.bind(this)}
          >
          <Text style={styles.cancelText}>取消</Text>
          </TouchableHighlight>
          <Image style={styles.logo} source={require('../../resource/logo-big.png')} resizeMode= 'contain'/>

             <TextInput
                 style={styles.text}
                 editable = {true}
                 maxLength = {20}
                 placeholder = 'ID/Email'
                 multiline={true}
             />
             <TextInput
                 style={styles.text}
                 editable = {true}
                 maxLength = {20}
                 placeholder = 'Password'
                 multiline={true}
             />

             <TouchableHighlight style={styles.singinBtn} underlayColor = 'transparent'
                                 onPress={this._pop.bind(this)}
             >
                 <Text style={styles.singinText}>登陆</Text>
             </TouchableHighlight>
             <Text style={styles.loginText}>注册机核应用</Text>
             <View style={styles.iconContainer}>
                 <Image style={styles.signinLogo} source={require('../../resource/signin-weibo.png')} resizeMode= 'contain'/>
                 <Image style={styles.signinLogo} source={require('../../resource/signin-weixin.png')} resizeMode= 'contain'/>
             </View>
             <Text style={styles.bottomText}>或者用以上方式登陆</Text>
         </View>
     )
 }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        backgroundColor:'#ffffff'
    },
    cancelBtn:{
        width:80,
        height:40,
        alignSelf:'flex-end',
        marginTop:30,
        justifyContent:'center',
    },
    cancelText:{
        color:'#c8c8c8',
        textAlign:'center',

    },
    singinBtn:{

        borderRadius:6,
        width:100,
        height:36,
        marginTop:50,
        justifyContent:'center',
        borderColor:'#777777',
        borderWidth:1
    },
    singinText:{
        color:'#777777',
        textAlign:'center',
    },

    text:{
        alignSelf:'center',
        marginTop:30,
         height: 30,
        borderBottomWidth: 1,
        width:220,
        borderBottomColor:"#e8e8e8"

    },
    logo:{
        width:140,
        marginTop:20
    },
    loginText:{
        color:'#555555',
        marginTop:40
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width:150,
        height:80
    },
    signinLogo:{
        width:40
    },
    bottomText:{
        color:'#555555',
        marginTop:30
    }
})