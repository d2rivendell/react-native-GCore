/**
 * Created by Leon.Hwa on 17/3/20.
 */

import  React,{Component} from 'react'
import {
    View,
    Text,
    PropTypes
} from 'react-native'

import  ScrollableTabView from 'react-native-scrollable-tab-view'
import  Article from '../components/airticle/Article'
import  Home from '../components/home/Home'
import  News from '../components/news/News'

import TabBar from '../containers/TabBar'
const tabTitles = ['首页', '新闻', '文章']
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
    render(){
        const {home,news,article,comment,pageInfo,timeLine,homeAction,newsAction,articleAction,navigator} = this.props
        return(
            <ScrollableTabView
                renderTabBar={() =>
                    <TabBar
                        tabNames={tabTitles}
                        tabIconNames={tabIcons}
                        selectedTabIconNames={tabSelectedIcon}
                    />
                }
            tabBarPosition= 'bottom'
            locked
            scrollWithoutAnimation
            onChangeTab={this._onChangeTab}
            >
                 <Home  {...home} {...pageInfo} {...comment} {...timeLine} actions={homeAction} navigator = {navigator}/>
                 <News {...news} {...pageInfo} {...comment} {...timeLine} actions = {newsAction}  navigator = {navigator}/>
                 <Article  {...article} {...pageInfo}  {...comment} {...timeLine} actions = {articleAction} navigator = {navigator}/>
            </ScrollableTabView>
        )

    }

}
TabBarView.propTypes = {
    home:React.PropTypes.object,
    homeAction:React.PropTypes.object,
    article:React.PropTypes.object,
    ApplicationActions:React.PropTypes.object
}