/**
 * Created by Leon.Hwa on 17/4/18.
 */
/**
 * Created by Leon.Hwa on 17/4/18.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    Alert,
    TouchableHighlight,
    Linking
} from 'react-native';

const  APPURL = 'itms-apps://itunes.apple.com/cn/app/%E6%9C%BA%E6%A0%B8-gamecores-%E4%B8%8D%E6%AD%A2%E6%98%AF%E6%B8%B8%E6%88%8F/id1095283476?mt=8'
import CommonNavigationBar from '../../../containers/CommonNavigationBar'
import  Constants from '../../../common/constants'
import AccountHandle from '../../../channel/AccountHandle'
import Signin from '../../other/Signin'
export default class Me extends Component {



    _onBack(){
        this.props.navigator.pop()
    }
    renderRow(data,index){
        const  type = data.type
        if(type === 'Article' || type === 'Volume'){
            var cell_type = type === 'Article' ? 'default':type
            if(type=='Volume' && data.media.flv){
                cell_type = 'video'
            }
            return(
                <Original  original = {data} {...this.props} type = {cell_type}/>
            )
        }else if(type === 'news'){
            return(
                <NewsCell  newsList = {data} {...this.props}/>
            )
        }
        return(<View/>)
    }
     _siginout(){
         const {actions} = this.props
         Alert.alert('提示','确定要退出吗',[{text:'取消',onPress:()=>{} },{text:'确定',onPress:()=>{
             AccountHandle.signout()
             actions.signout()
          }
         }])
     }
    _signinOrPhoto(){
         const {application} = this.props
         if(application.user){//换头像

         }else {
             this.props.navigator.push({
                 component:Signin,
                 params:{
                     ...this.props
                 }
             })
         }
    }
    _rating(){
        if(Linking.canOpenURL(APPURL)){
            Linking.openURL(APPURL)
        }
    }
    render() {
        const {application,actions} = this.props
        const avatar = application.user ?{uri:application.user.thumb_url}:require('../../../resource/default-avatar~iphone.png')

        return (
            <View style={styles.container}>
                <CommonNavigationBar
                    title = {'用户中心'}
                    onBack= {this._onBack.bind(this)}
                />
                <TouchableHighlight
                    underlayColor={'transparent'}
                    onPress={this._signinOrPhoto.bind(this)}
                >

                <View style={styles.header}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Image style={styles.avatar}
                               resizeMode='contain'
                               source={avatar}/>
                        {application.user && <Text style={{marginLeft:10}}>{application.user.nickname}</Text>}
                        {!application.user && <View style={{justifyContent:'center',paddingLeft:16}}>
                            <Text style={{fontSize:16,marginBottom:5}}>登陆</Text>
                            <Text style={{fontSize:12,color:'#c8c8c8',marginTop:5}}>请先登录，以获得更好的服务</Text>
                        </View>
                        }
                    </View>

                    {application.user &&<Image style={{width:35}} resizeMode='contain'source={require('../../../resource/photo~iphone.png')} />}
                </View>
                </TouchableHighlight>
            <ScrollView>
                <View style={[styles.cell,{marginTop:30,borderTopWidth:1,borderTopColor:'#c8c8c8'}]}>
                    <Text>清理缓存</Text>
                </View>
                <View style={styles.cell}>
                    <Text>反馈</Text>
                </View>

                <TouchableHighlight
                    underlayColor={'transparent'}
                    onPress={this._rating.bind(this)}
                >
                <View style={styles.cell}>
                    <Text>给予评分</Text>
                </View>
                </TouchableHighlight>

                {application.user&&<View style={[styles.cell,{marginTop:30,borderTopWidth:1,borderTopColor:'#c8c8c8'}]}>
                    <Text>账号绑定</Text>
                  </View>

                }

                {application.user&&<View style={[styles.cell,{marginTop:30,borderTopWidth:1,borderTopColor:'#c8c8c8'}]}>
                    <TouchableHighlight
                    underlayColor={'transparent'}
                    onPress={this._siginout.bind(this)}
                    >
                        <Text style={{color:'red'}}>注销</Text>
                    </TouchableHighlight>

                </View>
                }
            </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e8e8e8',
    },
    header:{
        width:Constants.WINDOW.width,
        height:80,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:'#fff',
        borderBottomColor:'#c8c8c8',
        paddingLeft:20,
        paddingRight:20,
        borderBottomWidth:1
    },
    avatar:{
        width:60,
        height:60,
       borderRadius:30
    },
    cell:{
        width:Constants.WINDOW.width,
        height:50,
        borderBottomWidth:1,
        borderBottomColor:'#c8c8c8',
        backgroundColor:'#fff',
        justifyContent:'center',
        padding:20,
    }
});

