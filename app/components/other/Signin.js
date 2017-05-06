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
    ScrollView,
    Alert
}from 'react-native'
import  Constants from '../../common/constants'
import NetTool from '../../channel/NetTool'
import MyStorage from '../../channel/MyStorage'
const  registerUrl = 'http://www.g-cores.com/auth/identity/register'
const  siginUrl = 'http://www.g-cores.com/auth/identity/callback'
export  default  class Signin extends  Component {

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            signinEmail:'',
            signinPwd:'',

            registerEmail:'',
            registerPwd:'',
            registerConfirmPwd:'',
        };
      }
    _cancel(){


    }
    _pop(){
        this.props.navigator.pop()
    }
    _goto(i){
        this.scrollView.scrollTo({ y: 0, x: (Constants.WINDOW.width - 100)* i, true })
    }
    _register(){
        if(this.state.registerEmail.length === 0 || this.state.registerPwd.length === 0 || this.state.registerConfirmPwd.length === 0){
            Alert.alert('提示','账号密码不能为空',[{text:'确定',onPress:()=>{console.log('sure')} }])
            return;
        }
        if(this.state.registerPwd !== this.state.registerConfirmPwd){
            Alert.alert('提示','两次输入的密码不一致',[{text:'确定',onPress:()=>{console.log('sure')} }])
            return;
        }
        let fromData =   new FormData
        fromData.append('auth_exclusive','dpkynzs2q0wm9o5gi1r83fcabthl4eu');
        fromData.append('bypass_humanizer',true);
        fromData.append('email',this.state.registerEmail);
        fromData.append('password',this.state.registerPwd);
        fromData.append('password_confirmation',this.state.registerConfirmPwd);
        fromData.append('sourceType','app');
        NetTool.POST(registerUrl,fromData,(response,error)=>{
            if(response){
                this.props.navigator.pop()
            }else{
                console.log(error)
            }

        })
    }
    _sigin(){
        const {actions} = this.props
        console.log(actions)
        if(this.state.signinEmail.length === 0 || this.state.signinPwd.length===0){
            Alert.alert('提示','账号密码不能为空',[{text:'确定',onPress:()=>{console.log('sure')} }])
            return;
        }

       let fromData =   new FormData
        fromData.append('auth_exclusive','dpkynzs2q0wm9o5gi1r83fcabthl4eu');
        fromData.append('auth_key',this.state.signinEmail);
        fromData.append('password',this.state.signinPwd);
        fromData.append('sourceType','app');
        NetTool.POST(siginUrl,fromData,(response,error)=>{
            if(response){
                if(response.status === 1){
                  var user = {...response.results.user,auth_token:response.results.auth_token}
                  let storage = new  MyStorage()
                    storage.saveAccount(user);
                    actions.signin(user)
                    this.props.navigator.pop()
                }

            }else{
                console.log(error)
                Alert.alert('提示',error,[{text:'确定',onPress:()=>{console.log('sure')} }])
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
                 <MyTextField
                     placeholder = 'ID/Email'
                     onChangeText={(text) => this.setState({signinEmail:text})}
                     secureTextEntry = {false}
                 />
                 <MyTextField
                     placeholder = 'Password'
                     secureTextEntry={true}
                     onChangeText={(text) => this.setState({signinPwd:text})}
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
                     <MyTextField
                         placeholder = 'Email'
                         secureTextEntry={false}
                         onChangeText={(text) => this.setState({registerEmail:text})}
                     />
                     <MyTextField
                         placeholder = 'Password'
                         secureTextEntry={true}
                         onChangeText={(text) => this.setState({registerPwd:text})}

                     />
                     <MyTextField
                         placeholder = 'Password Confirm'
                         secureTextEntry={true}
                         onChangeText={(text) => this.setState({registerConfirmPwd:text})}

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

class MyTextField extends Component{
    render(){
        return (
            <View style={{borderBottomColor:"#e8e8e8",borderBottomWidth: 1}}>
                <TextInput  style={styles.text}
                            placeholder = {this.props.placeholder}
                            onChangeText = {this.props.onChangeText}
                            secureTextEntry = {this.props.secureTextEntry}
                            maxLength = {20}
                            multiline={false}
                            underlineColorAndroid="transparent"
                />
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
        width:220,
        padding:0
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