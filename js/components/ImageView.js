/**
 * Image to display inside a card.
 *
 * @flow
 */

import React, { PureComponent } from "react";
import { Image, StyleSheet } from "react-native";
import Globals from "../globals";

type Props = {
    base64: string
}

export default class ImageView extends PureComponent<Props> {
    static PADDING = 24;
    static obtainImageWidth() {
        return Globals.SCREEN_WIDTH - ImageView.PADDING * 2
    }

    render() {
        return (
            <Image
                style={styles.image}
                resizeMode={'cover'}
                source={{uri: 'data:image/jpeg;base64,' + this.props.base64}}/>
        )
    }
}

const styles = StyleSheet.create({
    image: {
        width: ImageView.obtainImageWidth(),
        height: ImageView.obtainImageWidth(),
        borderRadius: 8,
        marginLeft: ImageView.PADDING,
        marginRight: ImageView.PADDING
    }
});