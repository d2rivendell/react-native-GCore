/**
 * Created by Leon.Hwa on 17/3/20.
 */

import  React,{Component} from 'react'
import {
    View,
    Text,
    PropTypes,
    StyleSheet,
    DeviceEventEmitter,
    Navigator,
    ScrollView
} from 'react-native'

import  ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view'
import  Article from '../components/airticle/Article'
import  Home from '../components/home/Home'
import  News from '../components/news/News'
import  Radio from '../components/radio/Radio'
import  Video from '../components/video/Video'

import TimeLine from '../components/other/timeLine/TimeLine'
// import TabBar from '../containers/TabBar'
import ControllerTabBar from '../containers/ControllerTabBar'

import HomeBannar from '../components/home/HomeBannar'

const tabTitles = ['首页', '新闻', '文章','电台','视频']
const tabIcons = [
    require('../resource/ic_tab_search.png'),
    require('../resource/ic_tab_homepage.png'),
    require('../resource/ic_tab_my.png')
];
const tabSelectedIcon = [
    require('../resource/ic_tab_search_select.png'),
    require('../resource/ic_tab_homepage_select.png'),
    require('../resource/ic_tab_my_select.png')
];
export default  class TabBarView extends  Component {


     _onChangeTab = ({i}) => {
        console.log(i) ;
        const {ApplicationActions} = this.props
        switch (i){
            case 0:
                ApplicationActions.changeTab('home')
               break
            case  1:
                ApplicationActions.changeTab('news')
                break;
            case 2:
                ApplicationActions.changeTab('article')
                break
        }
     };

    componentDidMount() {
        DeviceEventEmitter.addListener('timeLine',this._gotoTimeLine.bind(this))
        const {homeAction} = this.props
        homeAction.getBanner()
    }
    _gotoTimeLine(play){
        const {homeAction} =  this.props
        this.props.navigator.push({
            name:'TimeLine',
            component:TimeLine,
            sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
            params: {
                actions:homeAction,
                id:play.pageInfo.id,
                likes_num:play.pageInfo.likes_num},
                play:play
            })
        }

    componentWillUnmount() {
        this.subscription.remove();
    }
    render(){
        const {home,news,article,radio,video,comment,pageInfo,timeLine,homeAction,newsAction,articleAction,radioAction,videoAction,navigator} = this.props
        return(
            <ScrollView
            bounces={false}
            showsVerticalScrollIndicator={false}
            >
            <HomeBannar  {...home} {...pageInfo} {...timeLine} actions={homeAction} navigator = {navigator}/>

            <ScrollableTabView
                renderTabBar={() => <ControllerTabBar tabNames={tabTitles}/>}
            tabBarPosition= 'top'
            locked
            scrollWithoutAnimation
            onChangeTab={this._onChangeTab}
                style={{height:Common.WINDOW.height}}

            >
                 <Home  {...home} {...pageInfo} {...timeLine} actions={homeAction} navigator = {navigator}/>
                 <News {...news} {...pageInfo} {...comment} {...timeLine} actions = {newsAction}  navigator = {navigator}/>
                 <Article  {...article} {...pageInfo}  {...comment} {...timeLine} actions = {articleAction} navigator = {navigator}/>
                 <Radio    radio={radio} {...pageInfo}  {...comment} {...timeLine} actions = {radioAction} navigator = {navigator}/>
                <Video    video={video} {...pageInfo}  {...comment} {...timeLine} actions = {videoAction} navigator = {navigator}/>
            </ScrollableTabView>
            </ScrollView>
        )

    }

}
TabBarView.propTypes = {
    home:React.PropTypes.object,
    homeAction:React.PropTypes.object,
    article:React.PropTypes.object,
    ApplicationActions:React.PropTypes.object
}


