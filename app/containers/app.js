/**
 * Created by Leon.Hwa on 17/3/20.
 */
import React,{ Component }from 'react'
import {
    Navigator,
    View,
    StyleSheet,
    PropTypes
} from 'react-native'

import {bindActionCreators} from 'redux'
import TabBarView from '../containers/TabBarView'
import {connect} from 'react-redux'
import Constants from '../common/constants';



import applicationActions from '../actions/application'
import homeAction from '../actions/home'
import newsAction from '../actions/news'
import articleAction from '../actions/article'
import commentAction from '../actions/comment'
    global.Common = Constants;


export  class App extends Component{

    _configureScene = route => {
        return {
            ...Navigator.SceneConfigs.PushFromRight,
           // gestures: {}    // 禁用左滑返回手势
        }
    }

    _renderScene = (route, navigator) => {
        let Component = route.component
        return <Component navigator={navigator} {...route.params} {...this.props}/>
    }

    render(){
      const component = TabBarView
      return(
         <View style={{flex:1}}>
             <Navigator
              initialRoute={{name:'TabBarView',component:component}}
              configureScene={this._configureScene}
              renderScene={this._renderScene}
             />
         </View>
      )
    }
}

App.propTypes = {
    home:React.PropTypes.object,
    homeAction:React.PropTypes.object,
    article:React.PropTypes.object,
    news:React.PropTypes.object,

    articleAction:React.PropTypes.object,
    application:React.PropTypes.object,
    ApplicationActions:React.PropTypes.object,
    newsAction:React.PropTypes.object
}


export default connect (
    state => {
        return{
            application:state.application,
            home:{
                application:state.application,
                bannar:state.bannar,
                homeInfo:state.homeInfo,
            },
            article:{
                article:state.article
            },
            news:{
                news:state.news
            },
            comment:{
                comment:state.comment
            }
        }
    },
    dispatch => {
        return {
            ApplicationActions:bindActionCreators(Object.assign({},applicationActions), dispatch),
            homeAction:bindActionCreators(Object.assign({},applicationActions,homeAction,commentAction), dispatch),
            articleAction:bindActionCreators(Object.assign({},applicationActions,articleAction,commentAction), dispatch),
            newsAction:bindActionCreators(Object.assign({},applicationActions,newsAction,commentAction), dispatch),
       }
    }
)(App)

