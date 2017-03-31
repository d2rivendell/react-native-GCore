/**
 * Created by leon on 2017/3/31.
 */
import  React,{Component} from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableHighlight,
    Button,
    ListView
}from 'react-native'
import {Player}  from  'react-native-audio-streaming'
export  default  class TimeLine extends  Component {

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            uri:''
        };
      }
    componentDidMount() {
        const {id,actions} = this.props
        actions.getPageInfo(id)
    }

    componentWillReceiveProps(prop) {
        const {pageInfo} = prop
        if(pageInfo.pageInfo.data){
            this.setState({
                uri:pageInfo.pageInfo.data.media.mp3[0]
            })
        }
    }
    render() {

        return (
            <View style={styles.container}>
                <Player url={this.state.uri}/>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    }
});