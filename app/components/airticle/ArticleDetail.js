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

export default class AirticleDetail extends Component {

    onError(){
        console.log('onError')
    }
    onLoad(){
        console.log('onLoad')
    }
    onLoadEnd(){
        console.log('onLoadEnd')
    }
    onMessage(){
        console.log('onMessage')
    }
    source = (id) => {
        return `http://www.g-cores.com/api/originals/${id}/html_content?auth_exclusive=dpkynzs2q0wm9o5gi1r83fcabthl4eu&auth_token= &quickdownload=1`
    }
    onShouldStartLoadWithRequest= (e) => {
    console.log(e.url)
    var scheme = e.url.split('://')[0]
    if(scheme === 'http' || scheme === 'https'){
    return true
    }
    return false
}
    render() {
        const {original} = this.props.route
        const uri = this.source(original.id)
        console.log(uri)
        return (
            <View style={styles.container}>
               <WebView
                   style={styles.webView}
                   source={{uri: uri}}
                   automaticallyAdjustContentInsets={false}
                   javaScriptEnabled={true}
                   onLoad={this.onLoad}
                   onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
                   onLoadEnd={this.onLoadEnd}
                   onMessage={this.onMessage}
               />
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
        flex: 1,
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
    },
});