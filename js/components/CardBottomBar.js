/**
 * Bottom bar with controls for CardView.
 *
 * @flow
 */

import React, { PureComponent } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { scale } from "../globals";

type Props = {
    onEditTextClick: () => void,
    onAddImageClick: () => void
}

export default class CardBottomBar extends PureComponent<Props> {
    render () {
        return (
            <View style={styles.root}>
                <TouchableOpacity onPress={this.props.onAddImageClick}>
                    <Image
                        style={[styles.icon, styles.iconRight]}
                        source={require('../resources/images/ic_camera_24_black.png')}/>
                </TouchableOpacity>

                <TouchableOpacity onPress={this.props.onEditTextClick}>
                    <Image
                        style={[styles.icon, styles.iconMiddle]}
                        source={require('../resources/images/ic_edit_black.png')}/>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    root: {
        flexDirection: "row-reverse",
        marginLeft: scale(24),
        marginRight: scale(24),
        marginBottom: scale(20)
    },
    icon: {
        opacity: 0.3,
        marginBottom: scale(2)
    },
    iconMiddle: {
        marginLeft: scale(6),
        marginRight: scale(6)
    },
    iconRight: {
        marginLeft: scale(6),
        marginRight: scale(2)
    }
});