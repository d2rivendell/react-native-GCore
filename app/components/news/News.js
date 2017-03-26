import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView
} from 'react-native';
import NewsCell from './NewsCell'

export default class News extends Component {
    // 构造
      constructor(props) {
          super(props);
          // 初始状态
          this.state = {
              dataSource: new ListView.DataSource({
                  rowHasChanged: (row1, row2) => row1 !== row2
              })
          }
      }
    componentDidMount() {
        const  {actions} = this.props
        console.log(actions)
        actions.getNews()
    }

    renderRow(data,index){
        const {news} = this.props
          return(<NewsCell news = {data}/>)
    }
    render() {
          const {news} = this.props
        return (
            <View style={styles.container}>
                <ListView
                dataSource={this.state.dataSource.cloneWithRows(news.data)}
                renderRow={this.renderRow.bind(this)}
                enableEmptySections={true}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

