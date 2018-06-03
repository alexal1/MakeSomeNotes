/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';

type Props = {};
export default class App extends Component<Props> {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.small}>
                    We're starting
                </Text>
                <Text style={styles.large}>
                    MakeSomeNotes!
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    large: {
        fontSize: 32,
        textAlign: 'center'
    },
    small: {
        fontSize: 24,
        textAlign: 'center'
    }
});