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
import categoriesAction from '../actions/categories'
import subscriptAction from '../actions/subscript'
import myMarkAction from '../actions/myMark'
import downloadAction from '../actions/download'

import MusicTool from '../components/other/MusicTool'

import  Drawer from '../Lib/drawer/Drawer'
import  MenuContainer from '../containers/MenuContainer'
import * as WeChat from 'react-native-wechat'
import MyStorage from '../channel/MyStorage'
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

    _menuShow(){
        this.drawer.open()
    }
    _renderScene = (route, navigator) => {

        let Component = route.component
        return <Component
            ref = {c=>this.tabBarView = c}
            navigator={navigator}
            {...route.params}
            {...this.props}
            menuShow = {this._menuShow.bind(this)}/>
    }

    tweenHandler(ratio){
        return tweens.parallax(ratio)
    }

    componentDidMount() {

        const {ApplicationActions} = this.props
       let storage = new MyStorage()
        storage.loadAccount((user,err)=>{
            if(user){
               ApplicationActions.signin(user)
                // console.log(user)
            }
        })
        //org.reactjs.native.example.GCore
        WeChat.registerApp('wx374bb4d5b3dfadcd')
        storage.getAudioInfo(24544,(res,err)=>{
            if(res){
                console.log(res)
            }else {
                console.log(res)
            }
        })

    }
    _selectRow(title){
        this.drawer.close();
        this.tabBarView.push(title)
    }
    render(){

      const component = TabBarView
        var controlPanel = <MenuContainer
            closeDrawer={() => {this.drawer.close();}}
            selectRow = {this._selectRow.bind(this)}
            application = {this.props.application}
            actions = {this.props.ApplicationActions}
        />
      return(
         <View style={{flex:1}}>
           <Drawer
               ref={c => this.drawer = c}
               content={controlPanel}
               type={'displace'}

               openDrawerOffset={100}
               closedDrawerOffset={0}
               panOpenMask={1}
               panCloseMask={.4}//右边 点击收回的 点击范围 40%
               relativeDrag={false}
               panThreshold={.25}

               tweenDuration={250}
               tweenEasing={'linear'}
               acceptDoubleTap={false}
               acceptTap={true}
               acceptPan={false}
               tapToClose={true}
               negotiatePan={false}
               side={'left'}
           >
               <Navigator
                initialRoute={{name:'TabBarView',component:component}}
                configureScene={this._configureScene}
                renderScene={this._renderScene}
              />
              <MusicTool pageInfo = {this.props.pageInfo} play = {this.props.play} />
           </Drawer>
         </View>
      )
    }
}

App.propTypes = {
    home:React.PropTypes.object,
    homeAction:React.PropTypes.object,
    article:React.PropTypes.object,
    news:React.PropTypes.object,
    commonData:React.PropTypes.object,
    articleAction:React.PropTypes.object,
    application:React.PropTypes.object,
    ApplicationActions:React.PropTypes.object,
    newsAction:React.PropTypes.object
}


export default connect (
    state => {
        return {
            application: state.application,

            pageInfo: state.pageInfo,
            comment:state.comment,
            play:state.play,
            timeLine:state.timeLine,

            home: {
                bannar: state.bannar,
                homeInfo: state.homeInfo,
            },

            article: state.article,
            news:state.news,
            radio:state.radio,
            video:state.video,
            categories:state.categories,
            subscript:state.subscript,
            myMark:state.myMark,
            download:state.download
        }
    },
    dispatch => {
        return {
            ApplicationActions:bindActionCreators(Object.assign({},applicationActions), dispatch),
            homeAction:bindActionCreators(Object.assign({},applicationActions,homeAction,commentAction,pageInfoAction,timeLineAction,playAction,categoriesAction,downloadAction), dispatch),
            articleAction:bindActionCreators(Object.assign({},applicationActions,articleAction,commentAction,pageInfoAction,timeLineAction,playAction,downloadAction), dispatch),
            newsAction:bindActionCreators(Object.assign({},applicationActions,newsAction,commentAction,pageInfoAction,timeLineAction,playAction,downloadAction), dispatch),
            radioAction:bindActionCreators(Object.assign({},applicationActions,radioAction,commentAction,pageInfoAction,timeLineAction,playAction,downloadAction), dispatch),
            videoAction:bindActionCreators(Object.assign({},applicationActions,videoAction,commentAction,pageInfoAction,timeLineAction,playAction,downloadAction), dispatch),
            categoriesAction:bindActionCreators(Object.assign({},applicationActions,categoriesAction,commentAction,pageInfoAction,timeLineAction,playAction,downloadAction), dispatch),
            subscriptAction:bindActionCreators(Object.assign({},applicationActions,subscriptAction,commentAction,pageInfoAction,timeLineAction,playAction,downloadAction), dispatch),
            myMarkAction:bindActionCreators(Object.assign({},applicationActions,myMarkAction,commentAction,pageInfoAction,timeLineAction,playAction,downloadAction), dispatch)
        }
    }
)(App)
