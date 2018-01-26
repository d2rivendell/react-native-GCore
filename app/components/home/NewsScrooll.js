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
    ImageBackground
}from 'react-native'
import Constants from '../../common/constants'
import Commom from '../../common/constants'

import ArticleDetail  from '../airticle/ArticleDetail'
import CategoryCell from '../category/CategoryCell'

import CategoryDetail from '../category/CategoryDetail'

export default  class  NewsScrooll extends Component{
    _onPress(data){
        const {type} = this.props
         if(type==='news'){
            this.props.navigator.push({
           name:'NewsDetail',
           component:ArticleDetail,
           params:{
               ...this.props,
               likes_num:data.likes_num,
               id:data.id
           }

         })
        }else if(type==='categories'){
             this.props.navigator.push({
                 component:CategoryDetail,
                 params:{
                     ...this.props,
                     id:data.id,
                     specific_type:data.specific_type
                 }
             })
         }

    }
    render(){
        const {homeNews,type} = this.props
        var title = ''
        var  Component = null
        if(type==='news'){
            title = '新闻联播'
            Component = HomeNews
        }else  if(type === 'categories'){
            title = '精彩栏目推荐'
            Component = CategoryCell
        }
        return(

          <View style={styles.container}>
             <Text style={styles.headerTitle} >{title}</Text>
             <ScrollView style={styles.scrollContainer}
                        horizontal={true}
             >
                {homeNews.map((data,index) => {
                    if(type==='news'){
                        return(
                            <Component key ={index} data = {data} onPress={this._onPress.bind(this,data)}/>
                        )
                    }else  if(type === 'categories'){
                        return(
                            <Component key ={index} categorie = {data}
                                       selectRow = {this._onPress.bind(this,data)}
                                       overStyle = {{
                                           width:Commom.WINDOW.width * 0.7,
                                           height:130,
                                           marginLeft:16,
                                           marginTop:10}}
                            />
                        )
                    }
                  return (<View/>)
                })
                }
            </ScrollView>
        </View>


        )
    }
}

const HomeNews = ({data,onPress})=>{
        return(
    <TouchableHighlight
       onPress={onPress}
       underlayColor = 'transparent'
    >
    <View style={styles.bgView}>
        <ImageBackground  style={styles.bgImage} source={{uri:data.thumb_url}}>

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
        </ImageBackground>
    </View>
    </TouchableHighlight>
)
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

