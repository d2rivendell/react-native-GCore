/**
 * Created by Leon.Hwa on 17/3/24.
 */
import React,{Component} from 'react'
import {
    WebView,
    PropTypes,
    StyleSheet,
    View,
    Text,
    StatusBar,
    InteractionManager,
    Platform
} from  'react-native'
import {Navigator} from 'react-native-deprecated-custom-components'
import address from '../../channel/address'
import ToolNavigationBar from '../../containers/ToolNavigationBar'
import BanarNavigationBar from '../../containers/BanarNavigationBar'
import  Comment from '../../components/other/Comment'
import  TimeLine from '../other/timeLine/TimeLine'
import  Signin  from '../../components/other/Signin'
import WebViewBridge from 'react-native-webview-bridge'
import NetTool from '../../channel/NetTool'

const unsubscriptUrl = 'http://www.g-cores.com/api/subscriptions/unsubscript'
const subscriptUrl = 'http://www.g-cores.com/api/subscriptions/subscript'

const injectScript = `
  $(function () {
         $("a").click(function(){
           WebViewBridge.send(this.href.toString());
        });
                 if (WebViewBridge) {
                     WebViewBridge.onMessage = function (message) {
                     
                        if (message === "subscript") {
                           $("#j_subscript").hide();
                           $("#j_unsubscript").show();
                        }else if (message === "unsubscript") {
                           $("#j_subscript").show();
                           $("#j_unsubscript").hide();
                        }
                      };
                 }
                
                  });
`;

export default class AirticleDetail extends Component {

// 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
        uri:null
    };
  }


    onShouldStartLoadWithRequest= (e) => {
    return this._responseCunstomUrl(e.url)
   }
   _responseCunstomUrl(url){
       var msg = url.split('://')
       var scheme = msg[0]
       var response = msg[1]
       console.log(scheme + '+ ' + response)

       var subscript_id = null
       var original_id = null
       if(response.search('subscript') >= 0 || response.search('unsubscript') >= 0){
           subscript_id = response.split('/')[1]
           response = response.split('/')[0]
       }else if(response.search('showOriginal') >= 0){
           original_id = response.split('/')[1]
           response = response.split('/')[0]
       }


       if(scheme === 'http' || scheme === 'https'){
           return true
       }else{
           const {id} = this.props
           switch (response){
               case 'showComments':
                   this.gotoComment(id)
                   break;
               case 'playAudio':
                   this.gotoTimeLine(id)
                   break;
               case 'subscript':
                   this._subscript('subscript',subscript_id)
                   break;
               case 'unsubscript':
                   this._subscript('unsubscript',subscript_id)
                   break;
               case 'showOriginal':
                   this.props.navigator.push({
                       component:AirticleDetail,
                       params: {
                           ...this.props,id:original_id,likes_num:0},
                   })
                   break;
               default:
           }
           return false
       }
   }
   _subscript(action,id){
           const {application} = this.props
           var url = null
          if(application.user){
               if(action === 'unsubscript'){
                   url = unsubscriptUrl
               }else {
                   url = subscriptUrl
               }
               var formData = new FormData()
               formData.append('auth_exclusive','dpkynzs2q0wm9o5gi1r83fcabthl4eu')
               formData.append('auth_token',application.user.auth_token)
               formData.append('subscriptable_id',id)
               formData.append('subscriptable_type','category')
              console.log(formData)
              console.log('' + action + id)
               NetTool.POST(url,formData,(res,err)=>{
                   if(!err){
                       this.webView.sendToBridge(action)
                   }else {
                       console.log(err)
                   }
               })
           }else {
              this.props.navigator.push({
                  component:Signin,
                  params:{
                      ...this.props
                  }
              })
          }

   }
    gotoComment(id){
        const {actions} = this.props
            this.props.navigator.push({
                component:Comment,
                params: {
                    id:id,...this.props},
            })
    }

    gotoTimeLine(id){
        const {pageInfo} = this.props
        console.log(pageInfo)
        this.props.navigator.push({
            name:'TimeLine',
            component:TimeLine,
            sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
            params: {
                ...this.props,id:id,likes_num:pageInfo.data.likes_num},
        })
    }

    componentDidMount() {
        const {id,actions} = this.props
        InteractionManager.runAfterInteractions(()=>{
            this.setState({
                uri : address.articleDetail(id)
            })
            actions.getPageInfo(id)
        })

    }

    _onBridgeMessage(msg){
        console.log(msg)
        if(Platform.OS === 'ios'){
            return
        }
        var type =  typeof  msg
        if(type === 'string' && ( msg.search('://') >= 0)){
            this._responseCunstomUrl(msg)
        }
    }


    render() {
        const {likes_num,navigator,id,pageInfo,application} = this.props
        console.log(this.state.uri)
        return (
            <View style={styles.container}>

                <StatusBar
                    animated={false}
                    hidden={true}
                    translucent={true}
                    barStyle={'default'}
                />
                { (likes_num || likes_num === 0) && <ToolNavigationBar
                    alpha = {0.8}
                    navigator = {navigator}
                    likes_num = {likes_num}
                    gotoComment = {this.gotoComment.bind(this,id)}
                    id = {id}
                    pageInfo = {pageInfo.data}
                    application = {application}
                    url = {this.state.uri}
                    type = {'pop'}
                />
                }

                { (this.state.uri && this.state.uri.length > 0 )&&
                <WebViewBridge
                    ref={(c)=>this.webView = c}
                    style={styles.webView}
                    source={{uri: this.state.uri}}
                    automaticallyAdjustContentInsets={false}
                    onBridgeMessage={this._onBridgeMessage.bind(this)}
                    domStorageEnabled={true}
                    javaScriptEnabled={true}
                    injectedJavaScript={injectScript}
                    onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest.bind(this)}

                >
                </WebViewBridge>

                }
                {
                    (!likes_num && likes_num != 0)&&  <BanarNavigationBar
                        alpha = {0.8}
                        navigator = {navigator}
                        likes_num = {pageInfo.data.likes_num}
                        gotoComment = {this.gotoComment.bind(this,id)}
                        url = {this.state.uri}
                    />
                }
            </View>
        );
    }
}


AirticleDetail.propTypes = {
    original:React.PropTypes.object
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    webView: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#c8c8c8',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    }
});