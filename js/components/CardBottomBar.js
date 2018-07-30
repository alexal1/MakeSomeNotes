/**
 * Bottom bar with controls for CardView.
 *
 * @flow
 */

import React, { PureComponent } from "react";
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { scale } from "../globals";

type Props = {
    onEditTextClick: () => void
}

export default class CardBottomBar extends PureComponent<Props> {
    render () {
        return (
            <TouchableOpacity onPress={this.props.onEditTextClick}>
                <Text style={styles.text}>
                    Edit note
                </Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    text: {
        marginLeft: scale(20),
        marginBottom: scale(28),
        fontSize: 14,
        fontWeight: "500",
        lineHeight: 16,
        opacity: 0.4
    }
});