/**
 * Full screen card.
 *
 * @flow
 */

import React, { PureComponent } from "react";
import { Dimensions, Text, StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

export default class Card extends PureComponent {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    {this.props.text}
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: viewportWidth,
        height: viewportHeight,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 60
    }
});

Card.propTypes = {
    text: PropTypes.string.isRequired
};