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
    ScrollView,
    Image,
    TouchableHighlight,

} from 'react-native'

import  ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view'
import  Article from '../components/airticle/Article'
import  Home from '../components/home/Home'
import  News from '../components/news/News'
import  Radio from '../components/radio/Radio'
import  Video from '../components/video/Video'
import  Category from '../components/category/Category'
import TimeLine from '../components/other/timeLine/TimeLine'

import Subscript from '../components/other/me/Subscript'
import MyMark from '../components/other/me/MyMark'
import Me from '../components/other/me/Me'
import Signin from '../components/other/Signin'
// import TabBar from '../containers/TabBar'
import ControllerTabBar from '../containers/ControllerTabBar'

import HomeBannar from '../components/home/HomeBannar'
import Constants from '../common/constants';

import ArticleDetail from '../components/airticle/ArticleDetail'
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

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            alpha:0,
            canScroll:true
        }
        this.scrolling = false
      }
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
        // const {homeAction} = this.props
        // homeAction.getBanner()

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
                play: play,
                shortcut:true
            })
        }

    componentWillUnmount() {
        this.subscription.remove();
    }

    _category(){
        const {pageInfo,comment,play,timeLine,categories,categoriesAction,application} = this.props
        const commonData = {pageInfo,comment,play,timeLine,application}
      this.props.navigator.push({
         component:Category,
         params:{
        ...commonData,
             categories:categories,
             actions:categoriesAction
         }
     })
    }
    _menuShow(){
        const {menuShow} = this.props
        if(menuShow){
            menuShow()
        }
    }
    push(title){
        if(account.user === null){
            this.props.navigator.push({
                component:Signin
            })
            return;
        }
        const {pageInfo,comment,play,timeLine,application,subscript,myMark,subscriptAction,myMarkAction,ApplicationActions,homeAction} = this.props
        const commonData = {pageInfo,comment,play,timeLine,application}
        switch (title){
            case '订阅':
                this.props.navigator.push({
                    component:Subscript,
                    params:{
                        ...commonData,
                        subscript:subscript,
                        actions:subscriptAction
                    }
                })
                break;
            case '消息':
                break;
            case '收藏':
                this.props.navigator.push({
                    component:MyMark,
                    params:{
                        ...commonData,
                        myMark:myMark,
                        actions:myMarkAction
                    }
                })
                break;
            case '下载':
                break;
            case '投稿':
                this.props.navigator.push({
                    name:'BannarDetail',
                    component:ArticleDetail,
                    params : {
                        ...this.props,
                        id:18293,
                        ...commonData,
                        actions:homeAction
                    }
                })
                break;
            case '我':
                this.props.navigator.push({
                    component:Me,
                    params:{
                        ...commonData,
                        actions:ApplicationActions
                    }
                })
                break;

        }
    }
    render(){
        const {pageInfo,comment,play,timeLine,application,home,news,article,radio,video,homeAction,newsAction,articleAction,radioAction,videoAction,navigator} = this.props
        const commonData = {pageInfo,comment,play,timeLine,application}
        const  color = 'rgba(255,255,255,' + this.state.alpha + ')'
        return(
            <View style={{flex:1}}>
                <MainNavigator color={color} onCategory = {this._category.bind(this)} menuShow={this._menuShow.bind(this)}/>
            <ScrollableTabView
            renderTabBar={() => <ControllerTabBar tabNames={tabTitles}/>}
            tabBarPosition= 'top'
            locked
            scrollWithoutAnimation
            onChangeTab={this._onChangeTab}
            style={{height:Common.WINDOW.height-64}}
            scrollEnabled={false}
            >
                 <Home  ref={(c)=>this.Home = c} {...home} {...commonData} actions={homeAction}  navigator = {navigator} />
                 <News news ={news} {...commonData}   actions = {newsAction}  navigator = {navigator}/>
                 <Article  article ={article} {...commonData}  actions = {articleAction} navigator = {navigator}/>
                 <Radio    radio={radio} {...commonData}   actions = {radioAction} navigator = {navigator}/>
                <Video    video={video} {...commonData}   actions = {videoAction} navigator = {navigator}/>
            </ScrollableTabView >

            </View>

        )

    }

}

class MainNavigator extends Component{

    _onCategory(){
        const  {onCategory} = this.props
        if(onCategory){
            onCategory()
        }
    }
    _menuShow(){
        const {menuShow} = this.props
        if(menuShow){
            menuShow()
        }
    }
    render(){

        return(
            <View style={[styles.mainNavigator,{backgroundColor:this.props.color}]}>
                <TouchableHighlight
                    onPress={this._menuShow.bind(this)}
                    underlayColor='transparent'
                >
              <Image resizeMode='contain' style={styles.icon}
                     source={require('../resource/icon-menu~iphone.png')}/>

                </TouchableHighlight>

                <Image  resizeMode='contain' style={styles.logo}
                        source={require('../resource/logo-big.png')}/>
                <TouchableHighlight
                    onPress={this._onCategory.bind(this)}
                    underlayColor='transparent'
                >
                    <Image  resizeMode='contain' style={styles.icon}
                            source={require('../resource/icon-category~iphone.png')}/>
                </TouchableHighlight>

            </View>
        )
    }
}
TabBarView.propTypes = {
    home:React.PropTypes.object,
    homeAction:React.PropTypes.object,
    article:React.PropTypes.object,
    ApplicationActions:React.PropTypes.object
}

const styles = StyleSheet.create({
    mainNavigator:{
        width:Constants.WINDOW.width,
        height:60,
        paddingTop:20,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingLeft:20,
        paddingRight:20,
    },
    icon:{
        width:18,
        height:18
    },
    logo:{
        height:15
    }
})

