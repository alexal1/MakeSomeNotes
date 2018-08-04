/**
 * Image to display inside a card.
 *
 * @flow
 */

import React, { PureComponent } from "react";
import { Image, StyleSheet, View, TouchableOpacity } from "react-native";
import Globals, { scale } from "../globals";

type Props = {
    base64: string,
    showImagePopup: () => void
}

export default class ImageView extends PureComponent<Props> {

    static PADDING = scale(24);
    static obtainImageWidth() {
        return Globals.SCREEN_WIDTH - ImageView.PADDING * 2
    }

    render() {
        return (
            <View style={styles.root}>
                <Image
                    style={styles.image}
                    resizeMode={'cover'}
                    source={{uri: 'data:image/jpeg;base64,' + this.props.base64}}/>
                <TouchableOpacity
                    style={styles.popupButton}
                    onPress={this.props.showImagePopup}>
                    <Image source={require('./img/ic_more_white.png')}/>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    root: {
        flexDirection: "row-reverse",
        width: ImageView.obtainImageWidth(),
        height: ImageView.obtainImageWidth(),
        marginLeft: ImageView.PADDING,
        marginRight: ImageView.PADDING
    },
    image: {
        flex: 1,
        borderRadius: 8,
    },
    popupButton: {
        position: "absolute",
        width: scale(24),
        height: scale(24),
        justifyContent: "center",
        alignItems: "center"
    }
});