'use strict'

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    PropTypes,
    TouchableHighlight,
    ScrollView,
    Image
} from 'react-native';
import  Commom from '../../common/constants'
import  ArticleDetail from '../airticle/ArticleDetail'

export class Page extends Component{
    renderPageCircle(){
        const  {page} = this.props
        var indicators = []
        var style
        for( var i = 0 ; i < page.pageCount; i++){
            style = (i === page.currentPage) ? {color:'#ffffff'} :{color:'rgba(255, 255, 255, 0.4)'}
            indicators.push(
                <Text key={i} style={[{fontSize:35},style]}>&bull; </Text>
            )
        }
        return indicators
    }
   render(){
       return(
           <View style={styles.page}>
                {this.renderPageCircle()}
           </View>
       )
   }

}
Page.propTypes = {
    page:React.PropTypes.object
}

export default class  HomeBannar extends Component{
   // 构造
     constructor(props) {
       super(props);
       // 初始状态
       this.state = {
           currentPage:0
       };
     }
    _onTouchEnd(event){
         var offset = event.nativeEvent.contentOffset.x
         var index = Math.floor(offset/Commom.WINDOW.width)
         this.setState({
             currentPage:index
         })
    }
    _onPress(bannar){
        const {navigator,comment} = this.props
        if(navigator){
            navigator.push({
                name:'BannarDetail',
                component:ArticleDetail,
                params : {...this.props,likes_num:bannar.likes_num,id:bannar.original_id}
            })

        }
    }
    render(){
        const  {bannar} = this.props

        return(
           <View  style={styles.container}>
               <ScrollView
                   horizontal={true}
                   showsHorizontalScrollIndicator={false}
                   style={styles.scrollview}
                   pagingEnabled={true}
                   onMomentumScrollEnd = {this._onTouchEnd.bind(this)}
               >
                   { bannar.data.map( (data,index) => {
                   return (
                       <TouchableHighlight
                           onPress={this._onPress.bind(this,data)}
                           underlayColor = 'transparent'
                           key= {index}
                       >
                       <Image  style={styles.image} source={{uri:data.image}}/>
                       </TouchableHighlight>
                   )
                   })
                   }
               </ScrollView>
               <Page  page = {{pageCount:bannar.data.length,currentPage:this.state.currentPage}} />
           </View>


        )
    }

}

HomeBannar.propTypes = {
    bannar:React.PropTypes.object
}

const styles = StyleSheet.create({
    container: {
        height:220,
        width:Commom.WINDOW.width
    },
    scroolView:{
      flex:1
    },
    image:{
        height:220,
        width:Commom.WINDOW.width
    },
    page:{
        width:Commom.WINDOW.width,
        height:30,
        flexDirection:'row',
        justifyContent:'center',
        position:'absolute',
        bottom:10,
        alignItems:'center',
        backgroundColor:'transparent'
    }
});