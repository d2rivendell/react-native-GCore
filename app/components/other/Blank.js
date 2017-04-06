/**
 * Created by Leon.Hwa on 17/3/27.
 */
import  React,{Component} from 'react'
import {
    View,
    Text,
    StyleSheet
}from 'react-native'

export  default  class Blank extends  Component{

    render(){

        return(
            <View style={styles.container}>
              <Text>blank</Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        width:44,
        height:44,
        backgroundColor:'red'
    }
})