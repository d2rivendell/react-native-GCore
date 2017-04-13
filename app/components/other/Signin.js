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
    TextInput,
    ScrollView
}from 'react-native'
import  Constants from '../../common/constants'
import NetTool from '../../channel/NetTool'

const  registerUrl = 'http://www.g-cores.com/auth/identity/register'
const  siginUrl = 'http://www.g-cores.com/auth/identity/callback'
export  default  class Signin extends  Component {

    _cancel(){

    }
    _pop(){
        this.props.navigator.pop()
    }
    _goto(i){
        this.scrollView.scrollTo({ y: 0, x: (Constants.WINDOW.width - 100)* i, true })
    }
    _register(){

    }
    _sigin(){
        NetTool.POST(siginUrl,{
            auth_exclusive:'dpkynzs2q0wm9o5gi1r83fcabthl4eu',
            auth_key:'2451713064@qq.com',
            password:'fander911',
            sourceType:'app'
        },(response,error)=>{
            if(error){
                console.log(error)
            }else{
                console.log(response)
            }

        })
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
             <ScrollView  scrollEnabled={false} style={styles.scrollView}
             ref = {(c)=>{this.scrollView = c;}}
                          showsHorizontalScrollIndicator={false}
                          horizontal={true}
             >
                 <View style={styles.twoContainView}>
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
                                     onPress={this._sigin.bind(this)}
                 >
                     <Text style={styles.singinText}>登陆</Text>
                 </TouchableHighlight>

                     <TouchableHighlight underlayColor = 'transparent'
                                         onPress={this._goto.bind(this,1)}
                     >
                 <Text style={styles.loginText}>注册机核应用</Text>
                     </TouchableHighlight>
                 <View style={styles.iconContainer}>
                     <Image style={styles.signinLogo} source={require('../../resource/signin-weibo.png')} resizeMode= 'contain'/>
                     <Image style={styles.signinLogo} source={require('../../resource/signin-weixin.png')} resizeMode= 'contain'/>
                 </View>
                 <Text style={styles.bottomText}>或者用以上方式登陆</Text>
                 </View>

                 {/* register */}
                 <View style={styles.twoContainView}>
                     <TextInput
                         style={styles.text}
                         editable = {true}
                         maxLength = {20}
                         placeholder = 'Email'
                         multiline={true}
                     />
                     <TextInput
                         style={styles.text}
                         editable = {true}
                         maxLength = {20}
                         placeholder = 'Password'
                         multiline={true}
                     />
                     <TextInput
                         style={styles.text}
                         editable = {true}
                         maxLength = {20}
                         placeholder = 'Password Confirm'
                         multiline={true}
                     />
                     <TouchableHighlight style={styles.singinBtn} underlayColor = 'transparent'
                                         onPress={this._register.bind(this)}
                     >
                         <Text style={styles.singinText}>注册</Text>
                     </TouchableHighlight>

                     <TouchableHighlight underlayColor = 'transparent'
                                         onPress={this._goto.bind(this,0)}
                     >
                     <Text style={styles.loginText}>登陆机核应用</Text>
                     </TouchableHighlight>

                 </View>
             </ScrollView>
         </View>
     )
 }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        backgroundColor:'#ffffff',

    },
    scrollView:{
        marginTop:20,
        marginLeft:50,
        marginRight:50,
        width:Constants.WINDOW.width - 100,
    },
    twoContainView:{
        width:Constants.WINDOW.width - 100,
        flex:1,
        alignItems:'center',
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
        marginTop:20,
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
        marginTop:26
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width:150,
        height:80,
        marginTop:50
    },
    signinLogo:{
        width:40
    },
    bottomText:{
        color:'#555555',
        marginTop:30
    }
})