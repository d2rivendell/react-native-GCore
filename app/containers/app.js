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
import timeLineAction from '../actions/timeLine'
import pageInfoAction from '../actions/pageInfo'
import playAction from '../actions/play'
import radioAction from '../actions/radio'
import videoAction from '../actions/video'
    global.Common = Constants;

import MusicTool from '../components/other/MusicTool'
export  class App extends Component{

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            navigator:null
        };
      }
    _configureScene = route => {
        //有这句后后面修改 sceneConfig 才有效 否则不起作用
        if (route.sceneConfig) return route.sceneConfig
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
         <MusicTool pageInfo = {this.props.pageInfo} play = {this.props.play} />
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
        return {
            application: state.application,
            home: {
                application: state.application,
                bannar: state.bannar,
                homeInfo: state.homeInfo,
                pageInfo: state.pageInfo,
                comment:state.comment,
                play:state.play
            },
            article: {
                article: state.article,
            },
            pageInfo: state.pageInfo,
            play:state.play,
            news:{
                news:state.news
            },
            comment:state.comment,
            timeLine:state.timeLine,
            radio:state.radio,
            video:state.video
        }
    },
    dispatch => {
        return {
            ApplicationActions:bindActionCreators(Object.assign({},applicationActions), dispatch),
            homeAction:bindActionCreators(Object.assign({},applicationActions,homeAction,commentAction,pageInfoAction,timeLineAction,playAction), dispatch),
            articleAction:bindActionCreators(Object.assign({},applicationActions,articleAction,commentAction,pageInfoAction,timeLineAction,playAction), dispatch),
            newsAction:bindActionCreators(Object.assign({},applicationActions,newsAction,commentAction,pageInfoAction,timeLineAction,playAction), dispatch),
            radioAction:bindActionCreators(Object.assign({},applicationActions,radioAction,commentAction,pageInfoAction,timeLineAction,playAction), dispatch),
            videoAction:bindActionCreators(Object.assign({},applicationActions,videoAction,commentAction,pageInfoAction,timeLineAction,playAction), dispatch)
       }
    }
)(App)
