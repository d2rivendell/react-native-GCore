'use strict'
import  React,{Component} from  'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight
} from 'react-native'

export default  class SegmentedControl extends Component{
  // 构造
    constructor(props) {
      super(props);
      // 初始状态
      this.state = {
          selectIndex:0
      };
    }

    onPress = (index) => {
        this.setState({
            selectIndex:index
        })
        const {segmentDidSelectIndex }  = this.props
        if(segmentDidSelectIndex){
            segmentDidSelectIndex(index)
        }

    }
    render(){
        const  {values,itemWidth, height} = this.props

        return(
            <View style={[styles.container,{width:values.length * itemWidth,height:height}]}>

                {values.map((value,index) => {
                      return(
                          <TouchableHighlight
                              key = {index}
                              onPress={this.onPress.bind(this,index)}
                          >
                            <View  style={[styles.itemView,{backgroundColor: this.state.selectIndex === index ? '#f7a37a' :'#ffffff',width:itemWidth}]}>
                              <Text style={[styles.itemText,{color: this.state.selectIndex === index ? '#ffffff' :'#f7a37a',width:itemWidth}]}>{value}</Text>
                           </View>
                          </TouchableHighlight>
                      )
                })
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
     flexDirection:'row',
     borderColor:'#f7a37a',
     borderWidth:1,
     borderRadius:4,
     backgroundColor:'yellow',
     overflow:'hidden',
        alignItems:'center',
        justifyContent:'center',
    },
    itemView:  {
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
    },
    itemText:{
        fontSize:14,
        textAlign:'center'
    }
})

