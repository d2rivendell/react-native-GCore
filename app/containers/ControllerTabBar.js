/**
 * Created by Leon.Hwa on 17/4/10.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    LayoutAnimation,
    ScrollView,
    Animated,
    Easing
} from 'react-native';
import Constants from '../common/constants';

const IndicatorAnimation = {
    duration: 100,
    create: {
        type: LayoutAnimation.Types.linear,
        property: LayoutAnimation.Properties.left
    },
    update: {
        type: LayoutAnimation.Types.easeInEaseOut
    }
}

export default class ControllerTabBar extends Component {
    static propType = {
        goToPage: React.PropTypes.func,
        activeTab: React.PropTypes.number,
        tabs: React.PropTypes.array,

        tabNames: React.PropTypes.array
    };

    constructor(props) {
        super(props);

        this.state = {
            indicatorPosition: 0,
            translateValue: new Animated.Value(0),
            activeTab:0
        }
    }
    _onMomentumScrollEnd(event){
        const offset = { ...event.nativeEvent.contentOffset };
        var page = Math.floor(offset.x/(Constants.WINDOW.width/3))
        this._goToPage(page + 1);
    }

    setupIndicatorValue(index){
        var  value = 0.5

        switch (index){
            case 0:
                value = 0
                break;
            case this.props.tabs.length - 1:
                value = 1
                break;
            default:
                value = 0.5
                break;
        }
        // console.log('page = ' + index +'value = ' + value)
        Animated.timing(this.state.translateValue,
            {toValue:value,
                duration:200,
                easing: Easing.out(Easing.linear),//线性变化，匀速旋转
                isInteraction: false,//加入此参数可解决阻塞InteractionManager.runAfterInteractions，官方文档上无此参数说明
            }
        ).start()
    }

    _goToPage(index){
        this.props.goToPage(index);
       this.setupPageUI(index)
    }

    setupPageUI(index){
         this.setupIndicatorValue(index)
         this.setState({
             activeTab:index
         })
         var seq = 0
         const  len = this.props.tabNames.length
         if(index - 1 > 0 && index < len-1){
             seq = index - 1
             const  offset = (Constants.WINDOW.width/3) * seq
             this.scrollView.scrollTo({ y: 0, x: offset, true })
         }else if(index- 1 <= 0){
             this.scrollView.scrollTo({ y: 0, x: 0, true })
         }else if(index === len-1){
             const  offset = (Constants.WINDOW.width/3) * (index - 2)
             this.scrollView.scrollTo({ y: 0, x: offset, true })
         }
     }
    render() {
        return (
            <Animated.View style={styles.container}>
            <ScrollView
                ref = {(c) => {this.scrollView = c;}}
                style={styles.scroll}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                pagingEnabled={true}
                onScrollEndDrag ={this._onMomentumScrollEnd.bind(this)}
                scrollEventThrottle={200}
                bounces={false}

            >
                {this.props.tabs.map((tab, i) => {
                    let color = this.state.activeTab === i ? 'red' : 'black';
                    return (
                        <TouchableOpacity
                            key={i}
                            activeOpacity={0.8}
                            style={styles.title}
                            onPress={ this._goToPage.bind(this,i) }
                        >
                            <Text style={{color: color, fontSize: 13}}>
                                {this.props.tabNames[i]}
                            </Text>
                        </TouchableOpacity>
                    )
                })}

            </ScrollView>
            <Animated.View style={[styles.indicator,{
            transform:[{
                      translateX:this.state.translateValue.interpolate(
                                 {inputRange: [0,1],
                                 outputRange: [(Constants.WINDOW.width/6)-25, (Constants.WINDOW.width/6) * 5-25]
                                 })
                       }]
            }]}/>
            </Animated.View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height:36,
        width:Constants.WINDOW.width
    },
    scroll: {
        flex:1
    },
    title: {
        flex:1,
        width: Constants.WINDOW.width/3,
        justifyContent:'center',
        alignItems:'center',
        height:36,
        width:Constants.WINDOW.width/3
    },

    indicator: {
        backgroundColor: 'red',
        height: 3,
        width: 50,
        borderRadius: 1.5,
        position:'absolute',
        bottom:0,
        // left: ( Constants.WINDOW.width - 50)/2,

    }
});