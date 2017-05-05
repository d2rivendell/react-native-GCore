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
    Navigator,
    InteractionManager
} from  'react-native'

import address from '../../channel/address'
import ToolNavigationBar from '../../containers/ToolNavigationBar'
import BanarNavigationBar from '../../containers/BanarNavigationBar'
import  Comment from '../../components/other/Comment'
import  TimeLine from '../other/timeLine/TimeLine'
import WebViewBridge from 'react-native-webview-bridge'

const injectScript = `
  $(function () {
  
         $("a").click(function(){
           WebViewBridge.send(this.href.toString());
        });
                  });
`;

export default class AirticleDetail extends Component {


    onShouldStartLoadWithRequest= (e) => {
    this._responseCunstomUrl(e.url)
   }
   _responseCunstomUrl(url){
       var msg = url.split('://')
       var scheme = msg[0]
       var response = msg[1]
       console.log(scheme + '+ ' + response)

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
               default:
           }
           return false
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
            actions.getPageInfo(id)
        })

    }

    _onBridgeMessage(msg){
        // console.log(msg)
        var type =  typeof  msg
        if(type === 'string' && ( msg.search('://') >= 0)){
            this._responseCunstomUrl(msg)
        }
    }


    render() {
        const {likes_num,navigator,id,pageInfo,application} = this.props
        const uri = address.articleDetail(id)
        console.log(uri)
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
                    gotoComment = {this.gotoTimeLine.bind(this,id)}
                    id = {id}
                    pageInfo = {pageInfo.data}
                    application = {application}
                    url = {uri}
                />
                }

               <WebViewBridge
                   ref="webviewbridge"
                   style={styles.webView}
                   source={{uri: uri}}
                   automaticallyAdjustContentInsets={false}
                   allowFileAccessFromFileURLs = {true}
                   allowUniversalAccessFromFileURLs = {true}
                   onBridgeMessage={this._onBridgeMessage.bind(this)}
                   domStorageEnabled={true}
                   javaScriptEnabled={true}
                   injectedJavaScript={injectScript}
               >
               </WebViewBridge>
                {
                    (!likes_num && likes_num != 0)&&  <BanarNavigationBar
                        alpha = {0.8}
                        navigator = {navigator}
                        likes_num = {pageInfo.data.likes_num}
                        gotoComment = {this.gotoComment.bind(this,id)}
                        url = {uri}
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
        backgroundColor: '#F5FCFF',
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