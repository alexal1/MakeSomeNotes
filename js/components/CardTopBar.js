/**
 * Top bar with controls for CardView.
 *
 * @flow
 */

import React, { PureComponent } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { scale } from "../globals";

type Props = {
    pageTitle: string,
    showCardPopup: () => void,
    finish: () => void
}

export default class CardTopBar extends PureComponent<Props> {

    render () {
        return (
            <View style={styles.bar}>
                <TouchableOpacity onPress={this.props.finish}>
                    <Text style={styles.text}>
                        {this.props.pageTitle}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.props.showCardPopup}>
                    <Text style={styles.button}>
                        •••
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    bar: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginLeft: scale(24),
        marginRight: scale(24),
        marginTop: scale(26),
    },
    text: {
        fontSize: 13,
        lineHeight: 20,
        opacity: 0.4
    },
    button: {
        fontSize: 11,
        opacity: 0.4
    }
});