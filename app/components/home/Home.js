
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    PropTypes,
    TouchableHighlight,
    ListView,
    ScrollView,
    Image
} from 'react-native';

import HomeBannar from './HomeBannar'
import Original  from '../airticle/Original'
import NewsScrooll  from './NewsScrooll'
import  Commom from '../../common/constants'

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
     }

    componentWillReceiveProps(props) {
        const {application,bannar,canScroll} = props
        if (application.tab === 'home') {
            // console.log('切换到了home')
        }

    }

    componentDidMount() {
        const  {actions} = this.props
        actions.getHomePage()
    }
    _renderRow(row){
        const type = row.type
        if(type === 'original'){
            return(
                <Original original = {row.data} {...this.props} type = {'default'}/>
            )
        }else if(type === 'news'){
            return(<NewsScrooll homeNews = {row.data} {...this.props}/>)
        }


    }

    _onScroll(event){
        var offset = event.nativeEvent.contentOffset.y
        // console.log(offset)
    }
    render(){
         const {homeInfo} = this.props
        return (
            <View style={styles.container}>
                <ListView
                dataSource={this.state.dataSource.cloneWithRows(homeInfo.data)}
                enableEmptySections={true}
                renderRow={this._renderRow.bind(this)}
                style={styles.listView}
                scrollEnabled={this.state.canScroll}
                onScroll={this._onScroll.bind(this)}
                />
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
        width:Commom.WINDOW.width
    }
});


