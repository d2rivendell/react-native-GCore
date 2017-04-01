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
    StatusBar
} from  'react-native'

import address from '../../channel/address'
import ToolNavigationBar from '../../containers/ToolNavigationBar'
import  Comment from '../../components/other/Comment'
import  TimeLine from '../other/timeLine/TimeLine'
export default class AirticleDetail extends Component {


    onShouldStartLoadWithRequest= (e) => {
      var msg = e.url.split('://')
      var scheme = msg[0]
      var response = msg[1]
      console.log(scheme + ' ' + response)

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
    onScroll(){
        console.log('onScroll~~~~~')
        // console.log(e)
    }
    onPress(e){
        console.log('onPress~~~~~')
        // console.log(e)
    }

    onMomentumScrollEnd(){
        console.log('onContentSizeChange~~~~~')
        // console.log(e)
    }
    onback(){
        const {navigator} = this.props
        if(navigator){
            navigator.pop()
        }
    }
    gotoComment(id){
        const {navigator,actions,comments} = this.props
        if(navigator){
            navigator.push({
                name:'Comment',
                component:Comment,
                params: {
                    id:id,actions},
            })
        }
    }

    gotoTimeLine(id){
        const {navigator,actions,pageInfo,timeLine} = this.props
        if(navigator){
            navigator.push({
                name:'TimeLine',
                component:TimeLine,
                params: {
                    id:id,actions:actions,pageInfo:pageInfo,timeLine:timeLine},
            })
        }
    }

    componentDidMount() {
        const {id,actions} = this.props
        actions.getPageInfo(id)
    }
    componentWillReceiveProps(prop) {
        // const {pageInfo}  = prop
        // if(pageInfo){
        //     console.log(pageInfo)
        // }
    }
    render() {
        const {object,navigator,id} = this.props
        const uri = address.articleDetail(id)
        return (
            <View style={styles.container}>

                <StatusBar
                    animated={true}
                    hidden={true}
                    translucent={true}
                    barStyle={'default'}
                />
                <ToolNavigationBar
                    alpha = {0.8}
                    navigator = {navigator}
                    object = {object}
                    onBack = {this.onback.bind(this)}
                    gotoComment = {this.gotoComment.bind(this,id)}
                    />
               <WebView
                   style={styles.webView}
                   source={{uri: uri}}
                   automaticallyAdjustContentInsets={false}
                   javaScriptEnabled={true}
                   onLoad={this.onLoad}
                   scrollEventThrottle={16}
                   onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
               >
               </WebView>

            </View>
        );
    }
}
// renderError={ (e) => {
//     if (e === 'WebKitErrorDomain') {
//         console.log('happen~~~~~')
//         return
//     }
// }}

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