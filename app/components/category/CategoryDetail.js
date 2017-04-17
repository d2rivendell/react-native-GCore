/**
 * Created by leon on 2017/4/17.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ListView,
    TouchableHighlight
} from 'react-native';
import Common from '../../common/constants'
import CommonNavigationBar from '../../containers/CommonNavigationBar'
import Original from '../airticle/Original'
import NewsCell from '../news/NewsCell'
export default class CategoryDetail extends Component {
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
        const  {actions,id} = this.props
        actions.getCategorieDetail(id)
        actions.getCategorieSubscriptInfo(id)
    }
    _selectRow(){

    }
    _renderRow(data,index){
        const {specific_type} = this.props
        if(specific_type === 'article' || specific_type === 'audio' || specific_type === 'video'){
            const type = specific_type === 'article' ? 'default':specific_type
            return(
                <Original  original = {data} {...this.props} type = {type}/>
            )
        }else if(specific_type === 'news'){
            return(
                <NewsCell  newsList = {data} {...this.props}/>
            )
        }
        return(
            <TouchableHighlight
                onPress={this._selectRow.bind(this)}
                underlayColor={'transparent'}
            >
            <View style={{width:375,height:60,backgroundColor:'yellow'}}>

            </View>
            </TouchableHighlight>
        )
    }
    _renderHeader(){
        const {categories} = this.props
        var  subIcon = null
        if(categories.sub){
            if(categories.sub.is_subscript){
                subIcon = require('../../resource/unsubscript.png')
            }else{
                subIcon = require('../../resource/subscript.png')
            }
        }
        return(
            <View style={styles.Header}>
                { categories.sub && <Image style={styles.HeaderBg} source={{uri:categories.sub.background_url}}>
                    <View style={styles.nameContainer}>
                        <Text style={styles.name}>{categories.sub.name}</Text>
                    </View>
                    <View style={styles.numbersContainer}>
                        <Text style={styles.numText}>文章数 {categories.sub.originals_num}</Text>
                        <Text style={styles.numText}>订阅数 {categories.sub.subscriptors_num}</Text>
                    </View>

                    <TouchableHighlight
                    underlayColor={'transparent'}
                    onPress={this._subscript.bind(this)}
                    style={styles.subContainer}
                    >
                        <Image style={styles.subIcon} resizeMode='contain' source={subIcon} />
                    </TouchableHighlight>

                </Image>
                }

            </View>
        )
    }
    _subscript(){

    }
    _onBack(){
        this.props.navigator.pop()
    }
    render() {
        const {categories} = this.props
        console.log(categories)
        return (
            <View style={styles.container}>
                <CommonNavigationBar
                    backTitle = {'栏目分类'}
                    onBack= {this._onBack.bind(this)}
                />
                <ListView
                    dataSource={this.state.dataSource.cloneWithRows(categories.detail)}
                    enableEmptySections={true}
                    renderRow={this._renderRow.bind(this)}
                    renderHeader={this._renderHeader.bind(this)}
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
    },
    Header: {
        flex:1
    },
    HeaderBg:{
        width:Common.WINDOW.width,
        height:280,
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'column'
    },
    nameContainer:{
        width:200,
        height:32,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'rgba(255,255,255,0.2)',
        borderColor:'#fff',
        borderWidth:1
    },
    name:{
        color:'#fff',
        fontSize:18,
        lineHeight:30
    },
    numbersContainer:{
        flexDirection:'row',
        backgroundColor:'transparent',
    },
    numText:{
        color:'#fff',
        fontSize:12,
        margin:6
    },
    subContainer:{
        position:'absolute',
        alignSelf:'flex-end'
    },
    subIcon:{
        height:32,
    }

});

