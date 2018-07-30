/**
 * Top bar with controls for CardView.
 *
 * @flow
 */

import React, { PureComponent } from "react";
import { StyleSheet, Text } from "react-native";
import { scale } from "../globals";

type Props = {}

export default class CardTopBar extends PureComponent<Props> {
    render () {
        return (
            <Text style={styles.text}>
                Notes
            </Text>
        )
    }
}

const styles = StyleSheet.create({
    text: {
        marginLeft: scale(24),
        marginTop: scale(26),
        fontSize: 13,
        lineHeight: 20,
        opacity: 0.4
    }
});