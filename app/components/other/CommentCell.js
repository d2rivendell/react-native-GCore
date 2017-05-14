/**
 * Created by Leon.Hwa on 17/3/27.
 */
import  React,{Component} from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableHighlight,
    ListView
}from 'react-native'

import Common from '../../common/constants'
import DateHandel from './DateHandel'
export  default  class CommentCell extends  Component{
    constructor(props) {
        super(props);
        this.state = {
            dataSource:new ListView.DataSource({
                rowHasChanged:(row1,row2) => row1 !== row2}),
        canFold:false
        }
    }
    _renderChilden(data,index){
        return(
            <CommentChild child = {data} onPress={this._childPress.bind(this)}/>
        )
    }
    _childPress(child){
        const {onPress} = this.props
        if(onPress){
            onPress(null,child)
        }
    }


      componentWillReceiveProps(props) {
        const {comment}  = props
        const {dataSource} = this.state

        if(comment.children){
            if(comment.children.length >= 3){
                rows =  comment.children.slice(0,3)
                this.setState({
                    dataSource:dataSource.cloneWithRows(rows),
                    canFold:true
                })
            }else{
                var rows = comment.children
                this.setState({
                    dataSource:dataSource.cloneWithRows(rows),
                    canFold:false
                })
            }
            console.log(rows.length)
        }
    }

    _fold(){
        const {dataSource} = this.state
        this.setState({
            canFold:false,
            dataSource:dataSource.cloneWithRows(this.props.comment.children),
        })
    }
    _renderFooter(){
        if(this.state.canFold){
            return (
                <TouchableHighlight
                    onPress={this._fold.bind(this)}
                    underlayColor={'transparent'}
                >
                    <View style={styles.foldContainer}>
                        <Text style={{fontSize:14}}>展开全部</Text>
                    </View>
                </TouchableHighlight>
            )

        }else {
            return (
                <View>

               </View>)
        }
    }
    _response(){
      const {onPress,comment} = this.props
      if(onPress){
          onPress(comment,null)
      }
    }
    render(){
        const {comment}  = this.props
        return(
            <View style={{flex:1}}>
                <TouchableHighlight
                    underlayColor={'transparent'}
                    onPress={this._response.bind(this)}
                >
                <View style={styles.container}>
                    <Image style={styles.icon} source={{uri:comment.user.thumb_url}}/>
                    <View  style={styles.content}>
                        <Text  style={styles.nickname}>{comment.user.nickname}</Text>
                        <Text   style={styles.contentText}>{comment.body}</Text>
                        <View   style={styles.desc}>
                            <Text style={styles.time}>{DateHandel.parse(comment.created_at)}</Text>
                        </View>
                    </View>
                </View>
                </TouchableHighlight>
                {comment.children &&
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this._renderChilden.bind(this)}
                    enableEmptySections={true}
                    renderFooter={this._renderFooter.bind(this)}
                />
                }
            </View>

        )
    }
}

const CommentChild = ({onPress,child})=>{
    _onPress=()=>{
        onPress(child)
    }
    return(
        <TouchableHighlight
            onPress={this._onPress}
            underlayColor={'transparent'}

        >
            <View style={styles.childrenContainer}>
                <Image style={styles.childrenIcon} source={{uri:child.user.thumb_url}}/>
                <View  style={styles.content}>
                    <Text  style={styles.childrenNickname}>{child.user.nickname}</Text>
                    <View style={{flexDirection:'row',marginTop:10,alignItems:'center'}}>
                        <Image style={{width:10,tintColor:'#999999'}} resizeMode='contain' source={require('../../resource/icon-comment-wo~iphone.png')}/>
                        <Text style={{color:'#cc0000',fontSize:10,marginLeft:8}}>{child.to_user.nickname}</Text>
                    </View>
                    <Text   style={styles.contentText}>{child.body}</Text>
                    <View   style={styles.desc}>
                        <Text style={styles.time}>{DateHandel.parse(child.created_at)}</Text>
                    </View>
                </View>
            </View>
        </TouchableHighlight>
       )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor:'rgba(240,240,240,1)',
        padding:16,
        paddingBottom:10,
        flexDirection:'row',
        width:Common.WINDOW.width
    },
    icon:{
      width:50,
      height:50,
      borderRadius:25
    },
    content:{
        marginLeft:16,
        marginRight:26
    },
    nickname:{
        fontSize:14,
        color:'#cc0000'
    },
    contentText:{
        marginTop:10,
        fontSize:13,
        marginRight:18,
        color:'#333333'
    },
    desc:{
        flexDirection:'row'
    },
    time:{
        marginTop:16,
        fontSize:12,
        color:'#999999'
    },

    //children
    childrenContainer: {
        padding:16,
        paddingBottom:10,
        flexDirection:'row',
        width:Common.WINDOW.width,
        paddingLeft:66
    },
    childrenIcon:{
        width:36,
        height:36,
        borderRadius:18
    },
    childrenNickname:{
        fontSize:13,
        color:'#cc0000'
    },
    foldContainer:{
        flex:1,
        marginLeft:66+56,
        height:30,
        marginRight:20,
        justifyContent:'center',
        alignItems:'center',
        borderColor:'#c8c8c8',
        borderWidth:Common.WINDOW.onePR
    }
})