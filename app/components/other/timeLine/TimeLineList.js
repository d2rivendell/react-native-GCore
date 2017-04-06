/**
 * Created by Leon.Hwa on 17/4/6.
 */

import  React,{Component} from 'react'
import {
    View,
    Text,
    ListView,
    StyleSheet,
    TouchableHighlight
}from 'react-native'

export  default  class TimeLineList extends  Component {
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            dataSource:new ListView.DataSource({
                rowHasChanged:(row1,row2) => row1 !== row2
            })
        };
    }

    componentDidMount() {
        const {actions} = this.props
        actions.getTimeLineCategories()
    }
    _renderRow(data){
        return(
                <TimeLineListCell pageInfo = {data} click={this._onPress.bind(this,data)} />
        )
    }
    _onPress(data){
        const {onPress} = this.props
        if(onPress){
            onPress(data)
        }
    }
    render(){
        const {timeLine} = this.props
        return(
            <View style={styles.container}>
                {timeLine.list_data && <ListView
                    dataSource={this.state.dataSource.cloneWithRows(timeLine.list_data)}
                    renderRow={this._renderRow.bind(this)}
                    enableEmptySections={true}
                />}
            </View>
        )
    }
}

export    class TimeLineListCell extends  Component {

    _onPress(){
        const  {click} = this.props
         if(click){
             click()
         }
    }
    render(){
        const {pageInfo} = this.props
        return(
            <TouchableHighlight
                onPress={this._onPress.bind(this)}
            >
            <View style={styles.cell}>
             <Text >{pageInfo.category.name} vol.{pageInfo.vol} {pageInfo.title}</Text>
            </View>
            </TouchableHighlight>
        )
    }
}
const  styles = StyleSheet.create({
    container:{
        flex:1,
        paddingLeft:6,
        paddingRight:6,
        flexDirection:'row',
        backgroundColor:'#f4f4f4'
    },
    cell:{
      paddingLeft:16,
        paddingRight:16,
        height:80,
        backgroundColor:'#ffffff',
        borderBottomColor:'#c8c8c8',
        borderBottomWidth:0.5,
        justifyContent:'center'
    },
    title:{

    }
})
