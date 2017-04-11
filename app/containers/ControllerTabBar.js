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
    ScrollView
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
            indicatorPosition: 0
        }
    }
    _onscroll(event){
        const offset = { ...event.nativeEvent.contentOffset };
        const page = Math.floor(offset.x/(Constants.WINDOW.width/3))

    }
_goToPage(index){
        // 0 1 2 3 4
    var seq = 0
    const  len = this.props.tabNames.length
     if(index - 1 > 0 && index < len-1){
         seq = index - 1
         const  offset = (Constants.WINDOW.width/3) * seq
         this.scrollView.scrollTo({ y: 0, x: offset, true })
     }else {
         return
     }

}
    render() {

        return (
            <View style={styles.container}>
            <ScrollView
                ref = {(c) => {this.scrollView = c;}}
                style={styles.scroll}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                pagingEnabled={true}
                onScroll={this._onscroll.bind(this)}
                scrollEventThrottle={200}
                bounces={false}

            >
                {this.props.tabs.map((tab, i) => {
                    let color = this.props.activeTab === i ? 'red' : 'black';
                    return (
                        <TouchableOpacity
                            key={i}
                            activeOpacity={0.8}
                            style={styles.title}
                            onPress={ () => {this.props.goToPage(i); this._goToPage(i) }}
                        >
                            <Text style={{color: color, fontSize: 13}}>
                                {this.props.tabNames[i]}
                            </Text>
                        </TouchableOpacity>
                    )
                })}

            </ScrollView>
            <View style={styles.indicator}/>
            </View>
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
        alignItems:'center'
    },

    indicator: {
        backgroundColor: 'red',
        height: 3,
        width: 50,
        borderRadius: 1.5,
        position:'absolute',
        bottom:0,
        left: ( Constants.WINDOW.width - 50)/2
    }
});