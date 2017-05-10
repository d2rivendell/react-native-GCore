/**
 * Created by Leon.Hwa on 17/5/9.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight
} from 'react-native';

export default class MyIcon extends Component {

    render() {

        return (
            <View style={styles.container}>
                <TouchableHighlight
                 underlayColor={'transparent'}
                 onPress={this.props.onPress}
                >
                    <Image
                        {...this.props}
                    />
                </TouchableHighlight>

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

});

