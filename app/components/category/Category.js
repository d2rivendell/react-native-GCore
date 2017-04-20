import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ListView,
    TouchableHighlight,
    InteractionManager
} from 'react-native';
import Common from '../../common/constants'
import CategoryDetail from './CategoryDetail'
import CommonNavigationBar from '../../containers/CommonNavigationBar'
import CategoryCell from './CategoryCell'
export default class Category extends Component {
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
         InteractionManager.runAfterInteractions(() => {
            actions.getCategories()
         })

    }
    _selectRow(data){
        this.props.navigator.push({
                    component:CategoryDetail,
                    params:{
                      ...this.props,
                      id:data.id,
                      specific_type:data.specific_type
                   }
         })
    }
    _renderRow(data,index){
        return(
            <CategoryCell
                categorie = {data}
                selectRow = {this._selectRow.bind(this)}/>
        )
    }
    _onBack(){
        this.props.navigator.pop()
    }
    render() {
        const {categories} = this.props
        return (
            <View style={styles.container}>
                <CommonNavigationBar
                    title = {'栏目分类'}
                    onBack= {this._onBack.bind(this)}
                />
                <ListView
                    dataSource={this.state.dataSource.cloneWithRows(categories.data)}
                    enableEmptySections={true}
                    renderRow={this._renderRow.bind(this)}
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
    cell: {
     flex:1
    },
    cellBg:{
        width:Common.WINDOW.width,
        height:160,
        justifyContent:'center',
        alignItems:'center'
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
    }

});

