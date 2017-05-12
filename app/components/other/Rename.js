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

export  default  class Rename extends  Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            name:''
        };
    }
    _cancel(){


    }
    _changeName(){
        const {auth_token} = this.props
        if(this.state.name.length === 0){
            Alert.alert('提示','昵称不能为空',[{text:'确定',onPress:()=>{console.log('sure')} }])
            return;
        }
        NetTool.defresh(this.state.name,auth_token,(res,err)=>{
            if(res){
                this.props.navigator.pop()
            }
        })
    }
    render(){
        return(

                    <View style={styles.twoContainView}>
                        <Text style={{fontSize:16,paddingTop:30}}>最后一步</Text>
                        <View style={{borderBottomColor:"#000",borderBottomWidth:Constants.WINDOW.onePR}}>
                            <TextInput  style={{width:Constants.WINDOW.width - 120,marginTop:30,height:30}}
                                        onChangeText={(text) => this.setState({name:text})}
                                        maxLength = {20}
                                        multiline={false}
                                        underlineColorAndroid="transparent"
                            />
                        </View>
                        <Text style={{paddingTop:16}}>请填写你的昵称，以完成注册</Text>
                        <TouchableHighlight style={styles.singinBtn} underlayColor = 'transparent'
                                            onPress={this._changeName.bind(this)}
                        >
                            <Text style={styles.singinText}>完成</Text>
                        </TouchableHighlight>
                    </View>

        )
    }
}


const styles = StyleSheet.create({
    twoContainView:{
        flex:1,
        alignItems:'center',
        backgroundColor:'#ffffff',
justifyContent:'center'
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
    btnText:{
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
    bottomText:{
        color:'#555555',
        marginTop:30
    }
})