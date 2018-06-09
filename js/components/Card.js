/**
 * Full screen card.
 *
 * @flow
 */

import React, { PureComponent } from "react";
import { Text, StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import Globals from "../globals"

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
        width: Globals.SCREEN_WIDTH,
        height: Globals.SCREEN_HEIGHT,
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