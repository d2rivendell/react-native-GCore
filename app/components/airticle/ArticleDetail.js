/**
 * Created by Leon.Hwa on 17/3/24.
 */
import React,{Component} from 'react'
import {
    WebView,
    PropTypes,
    StyleSheet,
    View,
    Text
} from  'react-native'

import address from '../../channel/address'
import ToolNavigationBar from '../../containers/ToolNavigationBar'
import  Comment from '../../components/other/Comment'
export default class AirticleDetail extends Component {


    onShouldStartLoadWithRequest= (e) => {

      var scheme = e.url.split('://')[0]
      if(scheme === 'http' || scheme === 'https'){
      return true
      }
      return false
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
    gotoComment(original){
        const {navigator,actions,comments} = this.props
        if(navigator){
            navigator.push({
                name:'Comment',
                component:Comment,
                params: {
                    id:original.id,actions},
            })
        }
    }
    render() {
        const {original,navigator} = this.props
        const uri = address.articleDetail(original.id)
        return (
            <View style={styles.container}>
                <ToolNavigationBar
                    alpha = {0.8}
                    navigator = {navigator}
                    object = {original}
                    onBack = {this.onback.bind(this)}
                    gotoComment = {this.gotoComment.bind(this,original)}
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