/**
 * Created by Leon.Hwa on 17/4/18.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView
} from 'react-native';

import Original from '../../airticle/Original'
import NewsCell from '../../news/NewsCell'
import CommonNavigationBar from '../../../containers/CommonNavigationBar'
export default class MyMark extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            })
        }
    }
    componentDidMount() {
        const  {actions} = this.props
        console.log(actions)
        actions.getMyMark(1)
    }
    _onBack(){
        this.props.navigator.pop()
    }
    renderRow(data,index){
        const  type = data.type
        if(type === 'Article' || type === 'Volume'){
            var cell_type = type === 'Article' ? 'default':type
            if(type=='Volume' && data.media.flv){
                cell_type = 'video'
            }
            return(
                <Original  original = {data} {...this.props} type = {cell_type}/>
            )
        }else if(type === 'news'){
            return(
                <NewsCell  newsList = {data} {...this.props}/>
            )
        }
        return(<View/>)
    }
    render() {
        const {myMark} = this.props
        return (
            <View style={styles.container}>

                <CommonNavigationBar
                    title = {'我的收藏'}
                    onBack= {this._onBack.bind(this)}
                />
                <ListView
                    dataSource={this.state.dataSource.cloneWithRows(myMark.data)}
                    renderRow={this.renderRow.bind(this)}
                    enableEmptySections={true}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    }
});

