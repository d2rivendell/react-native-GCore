/**
 * Created by leon on 2017/4/15.
 */
import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
    Image,
    ScrollView,
    TouchableHighlight
} from 'react-native';

const items = ['订阅', '消息', '收藏','下载','投稿']

export default class ControlPanel extends Component {

     _onSelectItem(title){
      const {selectRow} = this.props
      if(selectRow){
          selectRow(title)
      }
    }

    render() {
         const {actions,application} = this.props
        // console.log(application.user)
         const avatar = application.user ? {uri:application.user.thumb_url}:require('../resource/default-avatar~iphone.png')
        return (
            <View style={styles.container}>
             <View  style={styles.avatarContainer}>
                <TouchableHighlight
                     onPress={this._onSelectItem.bind(this,'我')}
                     underlayColor = 'transparent'
                 >
                     <Image style={styles.avatar}
                            resizeMode='contain'
                            source={avatar}/>
                 </TouchableHighlight>

                 {
                     application.user ?<Text style={styles.nickname}>{application.user.nickname}</Text>:
                         <Text style={styles.nickname}>未登录</Text>
                 }
             </View>
            <ScrollView
            horizontal={false}
            style={styles.scrollContainer}
            >
            {items.map((title,index)=>{
              return(
                  <TouchableHighlight
                  onPress={this._onSelectItem.bind(this,title)}
                  underlayColor = 'transparent'
                  key= {index}
                  style={styles.items}
              >
                  <Text style={styles.title}>{title}</Text>
              </TouchableHighlight>)
                })
            }
            </ScrollView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
        alignItems:'center',
        padding:40
    },
    avatarContainer:{
        alignItems:'center',
       borderBottomColor:'#999999',
        borderBottomWidth:0.5,
        paddingBottom:50
    },
    avatar:{
        width:80,
        height:80,
        borderRadius:40
    },
    nickname:{
        marginTop:10
    },
    scrollContainer:{
        width:120,
        height:200
    },
    items:{
        width:120,
        padding:20,
        alignItems:'center'
    },
    title:{
        color:'#666666',
        fontSize:18
    }
})