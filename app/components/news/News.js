import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    RefreshControl,
    ActivityIndicator
} from 'react-native';
import NewsCell from './NewsCell'
import  Common from  '../../common/constants'
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
          this.page = 1
      }
    componentDidMount() {
        const  {actions} = this.props
        console.log(actions)
        actions.getNews(this.page)
    }

    renderRow(data,index){

          return(<NewsCell newsList = {data} {...this.props}/>)
    }

    _onRefresh(){
        const  {actions} = this.props
        this.page = 1
        console.log('正在刷新')
        actions.getNews(this.page)
    }
    _onScrollEndDrag(event){
        const {contentOffset, layoutMeasurement, contentSize} = event.nativeEvent;
        let contentSizeH = contentSize.height;
        let viewBottomY = contentOffset.y + layoutMeasurement.height;

        console.log(viewBottomY - contentSizeH)
        if((viewBottomY - contentSizeH)>=40){
            const  {news,actions} = this.props
            if(news.isLoadMore){
                return
            }
            this.page++;
            actions.getNews(this.page )
        }
    }
    render() {
          const {news} = this.props
        const refreshWord = news.isLoading ? '正在刷新':'下拉刷新'
        return (
            <View style={styles.container}>
                <ListView
                dataSource={this.state.dataSource.cloneWithRows(news.data)}
                renderRow={this.renderRow.bind(this)}
                enableEmptySections={true}
                scrollEventThrottle={200}
                onScrollEndDrag = {this._onScrollEndDrag.bind(this)}
                refreshControl={
                        <RefreshControl
                            refreshing={news.isLoading}
                            onRefresh={this._onRefresh.bind(this)}
                            colors={['rgb(217, 51, 58)']}
                            title={refreshWord}
                        />
                    }
                />
                {news.isLoadMore &&
                <View style={styles.loadingContainer}>
                    <ActivityIndicator />
                    <Text style={{fontSize: 14, marginLeft: 5}}>正在加载更多的数据...</Text>
                </View>
                }
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
    loadingContainer: {
        height:30,
        width:Common.WINDOW.width,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    }
});

