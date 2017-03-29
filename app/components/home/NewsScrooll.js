/**
 * Created by Leon.Hwa on 17/3/23.
 */
import React,{Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    PropTypes,
    ScrollView,
    Image,
    TouchableHighlight,
}from 'react-native'
import Constants from '../../common/constants'
import Commom from '../../common/constants'

import ArticleDetail  from '../airticle/ArticleDetail'

export default  class  NewsScrooll extends Component{
    _onPress(homeNews){
      const {navigator} = this.props
        console.log(homeNews)
      if(navigator){
       navigator.push({
           name:'NewsDetail',
           component:ArticleDetail,
           params:{
               ...this.props,
               object:homeNews,
               id:homeNews.id
           }

       })

      }
    }
    render(){
        const {homeNews} = this.props

        return(

          <View style={styles.container}>
             <Text style={styles.headerTitle} >新闻联播</Text>
             <ScrollView style={styles.scrollContainer}
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
             >
                {homeNews.map((data,index) => {
                    return(
                        <TouchableHighlight
                            onPress={this._onPress.bind(this,data)}
                            underlayColor = 'transparent'
                            key= {index}
                        >
                        <View style={styles.bgView}>
                            <Image  style={styles.bgImage} source={{uri:data.thumb_url}}>

                                <View style={styles.markView}>
                                    <Text style={styles.markTitle}>{data.category.name}</Text>
                                </View>
                                <View style={styles.contentView}>
                                   <Text style={styles.title}>{data.title}</Text>
                                   <View style={styles.parameterView}>
                                        <Text style={styles.createdAt}>{data.created_at}</Text>
                                       <View style={styles.likeAndComment}>
                                           <Image style={styles.LCIcon} source={require('../../resource/icon-like-w~iphone.png')}/>
                                           <Text style={styles.LCNum}>{data.likes_num}</Text>
                                           <Image style={styles.LCIcon} source={require('../../resource/icon-comment-w~iphone.png')}/>
                                           <Text style={styles.LCNum}>{data.comments_num}</Text>
                                       </View>
                                   </View>

                                </View>
                            </Image>
                        </View>
                        </TouchableHighlight>
                    )
                })
                }
            </ScrollView>
        </View>


        )
    }
}

NewsScrooll.propTypes = {
    homeNews:React.PropTypes.array
}



const styles = StyleSheet.create({
    container:{
        width:Constants.WINDOW.width,
        height:180,
        backgroundColor:'#e8e8e8'
    },
    headerTitle:{
        marginLeft:16,
        color:'#b0b0b0',
        textAlignVertical:'center',
        marginTop:10
    },
    scrollContainer:{
        width:Constants.WINDOW.width,
        height:160,
        flexDirection:'row',
    },
    bgView:{
        flex:1,
        height:180
    },
    bgImage:{
        width:Commom.WINDOW.width * 0.7,
        height:130,
        marginLeft:16,
        marginTop:10,
        justifyContent:'space-between'
    },
    markView:{
        padding:6,
        flex:1,
        backgroundColor:'transparent'
    },
    markTitle:{

        fontSize:12,
        color:'#fff',

    },
    contentView:{
     flex:3,
     justifyContent:'flex-end',
     backgroundColor:'transparent',
        padding:6

    },
    title:{
        fontSize:14,
        color:'#fff',
        marginBottom:10
    },
    parameterView:{
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center'
    },
    createdAt:{
        fontSize:10,
        color:'#fff',
        marginBottom:4
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
    }
})

