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
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            account:null
        };
      }
    _onSelectItem(){
console.log('_onSelectItem')
    }

    componentDidMount() {
        account.loadAccount((account,err)=>{
            if(account){
                this.setState({
                    account:account
                })
            }
        })
    }
    render() {
        return (
            <View style={styles.container}>
             <View  style={styles.avatarContainer}>
                 {this.state.account && <Image style={styles.avatar}
                         resizeMode='contain'
                         source={{uri:this.state.account.user.thumb_url}}/>

                 }
                 {
                     this.state.account &&<Text style={styles.nickname}>{this.state.account.user.nickname}</Text>
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
        backgroundColor:'red',
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