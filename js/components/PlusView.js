/**
 * Card with "plus" button to create one more card.
 *
 * @flow
 */

import React, { PureComponent } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import Globals from "../globals"

type Props = {
    createCard: () => void
}

export default class PlusView extends PureComponent<Props> {

    render() {
        return (
            <View
                style={styles.root}>
                <TouchableOpacity
                    onPress={this.props.createCard}>
                    <Text
                        style={styles.text}>
                        +
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Globals.STATUS_BAR_HEIGHT()
    },
    text: {
        fontSize: 128,
        fontWeight: "100"
    }
});