
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    PropTypes,
    TouchableHighlight,
    ListView,
    ScrollView,
    Image,
    RefreshControl,
    ActivityIndicator
} from 'react-native';

import HomeBannar from './HomeBannar'
import Original  from '../airticle/Original'
import NewsScrooll  from './NewsScrooll'


import  Common from '../../common/constants'

import ArticleDetail from '../airticle/ArticleDetail'

export default class Home extends Component {
   // 构造
     constructor(props) {
       super(props);
       // 初始状态
       this.state = {
           dataSource:new ListView.DataSource({
               rowHasChanged:(row1,row2) => row1 !== row2
           }),
           canScroll:true
       };
       this.page = 1
     }

    componentWillReceiveProps(props) {
        const {application,bannar,canScroll} = props
        if (application.tab === 'home') {
            // console.log('切换到了home')
        }

    }

    componentDidMount() {
        const  {actions} = this.props
        actions.getHomePage(this.page)
    }
    _renderRow(row){
        const type = row.type
        if(type === 'original'){
            return(
                <Original original = {row.data} {...this.props} type = {'default'}/>
            )
        }else if(type === 'news'){
            return(<NewsScrooll homeNews = {row.data} {...this.props} type = {'news'}/>)
        } else if(type === 'categories'){
            return(<NewsScrooll homeNews = {row.data} {...this.props} type = {'categories'}/>)
        }

       return(<View/>)
    }

    _onRefresh(){
        const  {actions} = this.props
        this.page = 1
        console.log('正在刷新')
        actions.getHomePage(this.page)
    }
    _onScrollEndDrag(event){
        const {contentOffset, layoutMeasurement, contentSize} = event.nativeEvent;
        let contentSizeH = contentSize.height;
        //layoutMeasurement.height 是listView的高度(小于 window.height)
        let viewBottomY = contentOffset.y + layoutMeasurement.height;

        console.log(viewBottomY - contentSizeH)
        if((viewBottomY - contentSizeH)>=40){
                 this.page++;
                 const  {actions} = this.props
                 actions.getHomePage(this.page )
        }
    }
    render(){
         const {homeInfo} = this.props
        console.log(homeInfo)
        const refreshWord = homeInfo.isLoading ? '正在刷新':'下拉刷新'
        return (
            <View style={styles.container}>
                {homeInfo&& <ListView
                dataSource={this.state.dataSource.cloneWithRows(homeInfo.data)}
                enableEmptySections={true}
                renderRow={this._renderRow.bind(this)}
                style={styles.listView}
                scrollEventThrottle={200}
                onScrollEndDrag = {this._onScrollEndDrag.bind(this)}
                refreshControl={
                        <RefreshControl
                            refreshing={homeInfo.isLoading}
                            onRefresh={this._onRefresh.bind(this)}
                            colors={['rgb(217, 51, 58)']}
                            title={refreshWord}
                        />
                    }
                />
                }
                {homeInfo.isLoadMore &&
                <View style={styles.loadingContainer}>
                    <ActivityIndicator />
                    <Text style={{fontSize: 14, marginLeft: 5}}>正在加载更多的数据...</Text>
                </View>
                }

            </View>
        );
    }
}
Home.propTypes = {
    application:React.PropTypes.object,
    bannar:React.PropTypes.object,
    homeInfo:React.PropTypes.object,
    actions:React.PropTypes.object
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    listView: {
        flex:1
    },
    bannar:{
        height:250,
        width:Common.WINDOW.width
    },
    loadingContainer: {
        height:30,
        width:Common.WINDOW.width,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    }
});


