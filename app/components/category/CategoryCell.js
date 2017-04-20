/**
 * Created by Leon.Hwa on 17/4/19.
 */
import React,{Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableHighlight
}from 'react-native'
import  Common from '../../common/constants'


export  default  class  CategoryCell extends  Component {

    _selectRow(){
        const {selectRow,categorie} = this.props
        if(selectRow){
            selectRow(categorie)
        }
    }
    render(){
        const {categorie} = this.props
        return(
            <TouchableHighlight
                onPress={this._selectRow.bind(this)}
                underlayColor={'transparent'}
                style={styles.container}
            >
                <View style={styles.cell}>
                    <Image style={[styles.cellBg,this.props.overStyle]} source={{uri:categorie.background_url}}>
                        <View style={styles.nameContainer}>
                            <Text style={styles.name}>{categorie.name}</Text>
                        </View>
                        <View style={styles.numbersContainer}>
                            <Text style={styles.numText}>文章数 {categorie.originals_num}</Text>
                            <Text style={styles.numText}>订阅数 {categorie.subscriptors_num}</Text>
                        </View>
                    </Image>
                </View>
            </TouchableHighlight>

        )

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#ffffff',
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
})
