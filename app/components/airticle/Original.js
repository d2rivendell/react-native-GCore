/**
 * Created by Leon.Hwa on 17/3/23.
 */
import React,{Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    PropTypes,
    TouchableHighlight
}from 'react-native'

import Constants from '../../common/constants'
import ArticleDetail from '../airticle/ArticleDetail'
export default  class  Original extends Component{
    _onPress(original){
      const  {navigator,actions,comment} = this.props
      if(navigator){
          actions.toNavigation('ArticleDetail')
              .then(() =>{
                  navigator.push({
                      name:'ArticleDetail',
                      component:ArticleDetail,
                      params : {...this.props,comment}

                  })
              })

      }

    }
    render() {
        const {original,actions} = this.props
        return(
            <TouchableHighlight
                onPress={this._onPress.bind(this,original)}
                underlayColor = 'transparent'
            >
            <View style={styles.container}>
                <Image style={styles.Poster} source ={{uri: original.thumb_url}}>
                    <View style={styles.userInfo}>
                        <Image style={styles.icon} source ={{uri: original.user.thumb_url}}/>
                        <View style={styles.userContainer}>
                            <Text style={styles.userName}>{original.user.nickname}</Text>
                            <Text style={styles.createDate}>{original.created_at}</Text>
                        </View>
                    </View>
                    <View style={styles.category}>
                       <Text style={styles.categoryName}>{original.category.name}</Text>
                        <View style={styles.likeAndComment}>
                          <Image style={styles.LCIcon} source={require('../../resource/icon-like-w~iphone.png')}/>
                          <Text style={styles.LCNum}>{original.likes_num}</Text>
                          <Image style={styles.LCIcon} source={require('../../resource/icon-comment-w~iphone.png')}/>
                          <Text style={styles.LCNum}>{original.comments_num}</Text>
                        </View>
                    </View>
                </Image>
                <Text style={styles.title}>{original.title}</Text>
                <Text style={styles.desc}>{original.desc}</Text>
            </View>
            </TouchableHighlight>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        width:Constants.WINDOW.width,
        padding:16,
        borderBottomColor:"#e8e8e8",
        borderBottomWidth:0.5
    },
     Poster:{
         marginLeft:0,
         marginRight:0,
         marginTop:0,
         height:160,
         justifyContent:'space-between',
     },
    userInfo:{
        height:50,
        margin:0,
        padding:10,
        flexDirection:'row'
    },
      icon:{
        width:30,
        height:30,
          borderRadius:15,
      },
      userContainer:{
          flex:1,
          justifyContent:'space-around',
          margin:4
      },
      userName:{
          fontSize:8,
          color:'#fff'
      },
      createDate:{
        fontSize:8,
          color:'#fff'
      },
    category:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingLeft:10,
        alignItems:'center'
    },
    categoryName:{
        fontSize:12,
        color:'#fff'
    },
    likeAndComment:{
      height:20,
      width:60,

      flexDirection:'row',
       alignItems:'center',
        justifyContent:'space-around'
    },
    LCIcon:{
      width:10,
      height:10
    },
    LCNum:{
        fontSize:10,
      color:'#fff'
    },
     title:{
         fontSize:16,
         color:'#000',
         marginTop:10
     },
    desc:{
        fontSize:13,
        color:'#888888',
        marginTop:10
    }
})

Original.propTypes = {
    original:React.PropTypes.object,
    actions:React.PropTypes.object
}